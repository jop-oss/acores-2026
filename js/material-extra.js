/* ============================================================
   MATERIAL-EXTRA.JS  ·  Açores 2026  ·  Secció: +INFO
   ============================================================ */

/* ── Constants ── */
const ME_CATS = [
  { id: 'Tots',          emoji: '🗺️',  label: 'Tots' },
  { id: 'Miradors',      emoji: '🏔️',  label: 'Miradors' },
  { id: 'Platges',       emoji: '🏖️',  label: 'Platges' },
  { id: 'Piscines',      emoji: '🏊',  label: 'Piscines' },
  { id: 'Naturalesa',    emoji: '🌿',  label: 'Naturalesa' },
  { id: 'Aigues Termals',emoji: '♨️',  label: 'Aigues Termals' },
  { id: 'Jardi Botanic', emoji: '🌺',  label: 'Jardí Botànic' },
  { id: 'Pobles',        emoji: '🏘️',  label: 'Pobles' },
  { id: 'Fars',          emoji: '🔦',  label: 'Fars' },
  { id: 'Coves',         emoji: '🦇',  label: 'Coves' },
  { id: 'Altres',        emoji: '⭐',  label: 'Altres' },
];

const ME_SUBCATS = [
  { id: 'Tots',            label: 'Totes' },
  { id: 'Paisatge',        label: 'Paisatge' },
  { id: 'Llacs',           label: 'Llacs' },
  { id: 'Geologia',        label: 'Geologia' },
  { id: "Salts d'aigua",   label: "Salts d'aigua" },
];

const ME_ILLES = [
  { id: 'Totes', emoji: '🏝️', label: 'Totes' },
  { id: 'Sao Miguel', emoji: '🌋', label: 'São Miguel' },
  { id: 'Pico', emoji: '⛰️', label: 'Pico' },
  { id: 'Sao Jorge', emoji: '🐉', label: 'São Jorge' },
  { id: 'Faial', emoji: '💙', label: 'Faial' },
];

const ME_CAT_EMOJI = {
  'Miradors': '🏔️', 'Platges': '🏖️', 'Piscines': '🏊',
  'Naturalesa': '🌿', 'Aigues Termals': '♨️', 'Jardi Botanic': '🌺',
  'Pobles': '🏘️', 'Fars': '🔦', 'Coves': '🦇', 'Altres': '⭐',
};

const ME_CAT_LABEL = {
  'Miradors': 'Mirador', 'Platges': 'Platja', 'Piscines': 'Piscina natural',
  'Naturalesa': 'Naturalesa', 'Aigues Termals': 'Aigues Termals',
  'Jardi Botanic': 'Jardí Botànic', 'Pobles': 'Poble/Ciutat',
  'Fars': 'Far', 'Coves': 'Cova', 'Altres': 'Altres',
};

const ME_ILLA_LABEL = {
  'Sao Miguel': 'São Miguel', 'Pico': 'Pico',
  'Sao Jorge': 'São Jorge', 'Faial': 'Faial',
};

const ME_CAT_PLACEHOLDER = {
  'Miradors': '🏔️', 'Platges': '🏖️', 'Piscines': '🌊',
  'Naturalesa': '🌿', 'Aigues Termals': '♨️', 'Jardi Botanic': '🌸',
  'Pobles': '🏘️', 'Fars': '🔦', 'Coves': '🦇', 'Altres': '⭐',
};

/* ── Estat ── */
const ME = {
  illa: 'Totes',
  cat: 'Tots',
  subcat: 'Tots',
  destacat: false,
  zona: '',
};

/* ── Inici ── */
document.addEventListener('DOMContentLoaded', () => {
  renderIlles();
  renderCats();
  renderSubcats();
  renderExtres();
  render();
});

/* ── Render filtres ── */
function renderIlles() {
  const wrap = document.getElementById('meIlles');
  wrap.innerHTML = ME_ILLES.map(ill =>
    `<button class="me-filtre-illa${ME.illa === ill.id ? ' actiu' : ''}"
      onclick="meSetIlla('${ill.id}')">
      ${ill.emoji} ${ill.label}
    </button>`
  ).join('');
}

function renderCats() {
  const wrap = document.getElementById('meCats');
  const rows = ME_CATS.map(c => {
    const count = ME_LLOCS.filter(l =>
      (ME.illa === 'Totes' || l.illa === ME.illa) &&
      (c.id === 'Tots' || l.categoria === c.id)
    ).length;
    if (count === 0 && c.id !== 'Tots') return '';
    return `<button class="me-filtre-cat${ME.cat === c.id ? ' actiu' : ''}"
      onclick="meSetCat('${c.id}')">
      ${c.emoji} ${c.label}
      <span style="opacity:0.5;font-size:0.68rem;margin-left:2px">${count}</span>
    </button>`;
  }).join('');
  wrap.innerHTML = rows;
}

function renderSubcats() {
  const wrap = document.getElementById('meSubcats');
  const show = ME.cat === 'Naturalesa';
  wrap.classList.toggle('hidden', !show);
  if (!show) return;
  wrap.innerHTML = ME_SUBCATS.map(s => {
    const count = ME_LLOCS.filter(l =>
      l.categoria === 'Naturalesa' &&
      (ME.illa === 'Totes' || l.illa === ME.illa) &&
      (s.id === 'Tots' || l.subcat === s.id)
    ).length;
    return `<button class="me-filtre-subcat${ME.subcat === s.id ? ' actiu' : ''}"
      onclick="meSetSubcat('${s.id}')">
      ${s.label} <span style="opacity:0.5;font-size:0.68rem">${count}</span>
    </button>`;
  }).join('');
}

function renderExtres() {
  // Destacat toggle
  const btn = document.getElementById('meToggleDestacat');
  btn.classList.toggle('actiu', ME.destacat);
  btn.querySelector('.me-toggle-txt').textContent = ME.destacat ? 'Destacats' : 'Destacats';

  // Zona
  const sel = document.getElementById('meZonaSelect');
  sel.disabled = ME.illa === 'Totes';
  const zonesActuals = ME.illa === 'Totes' ? [] :
    [...new Set(ME_LLOCS
      .filter(l => l.illa === ME.illa && l.zona)
      .map(l => l.zona)
    )].sort();

  sel.innerHTML = `<option value="">Totes les zones</option>` +
    zonesActuals.map(z => `<option value="${z}"${ME.zona === z ? ' selected' : ''}>${z}</option>`).join('');
}

/* ── Accions filtres ── */
function meSetIlla(illa) {
  ME.illa = illa;
  ME.zona = '';
  renderIlles();
  renderCats();
  renderSubcats();
  renderExtres();
  render();
}

function meSetCat(cat) {
  ME.cat = cat;
  if (cat !== 'Naturalesa') ME.subcat = 'Tots';
  renderCats();
  renderSubcats();
  render();
}

function meSetSubcat(sub) {
  ME.subcat = sub;
  renderSubcats();
  render();
}

function meToggleDestacat() {
  ME.destacat = !ME.destacat;
  renderExtres();
  render();
}

function meSetZona() {
  ME.zona = document.getElementById('meZonaSelect').value;
  render();
}

/* ── Filtratge ── */
function filtrarLlocs() {
  return ME_LLOCS.filter(l => {
    if (ME.illa !== 'Totes' && l.illa !== ME.illa) return false;
    if (ME.cat !== 'Tots' && l.categoria !== ME.cat) return false;
    if (ME.cat === 'Naturalesa' && ME.subcat !== 'Tots' && l.subcat !== ME.subcat) return false;
    if (ME.destacat && !l.destacat) return false;
    if (ME.zona && l.zona !== ME.zona) return false;
    return true;
  });
}

/* ── Render principal ── */
function render() {
  const llocs = filtrarLlocs();
  const grid = document.getElementById('meGrid');
  const buit = document.getElementById('meBuit');
  const comp = document.getElementById('meComptador');

  // Comptador
  comp.innerHTML = `<span>${llocs.length}</span> lloc${llocs.length !== 1 ? 's' : ''}`;

  if (llocs.length === 0) {
    grid.innerHTML = '';
    buit.classList.add('visible');
    renderLinks([]);
    return;
  }
  buit.classList.remove('visible');

  grid.innerHTML = llocs.map((l, i) => renderCard(l, i)).join('');
  renderLinks(llocs);
}

function renderCard(l, i) {
  const fotoSrc = l.foto ? `img/material-extra/${l.foto}.webp` : null;
  const illa_label = ME_ILLA_LABEL[l.illa] || l.illa;
  const cat_label = ME_CAT_LABEL[l.categoria] || l.categoria;
  const placeholder = ME_CAT_PLACEHOLDER[l.categoria] || '📍';
  const delay = Math.min(i * 30, 300);

  const fotoHtml = fotoSrc
    ? `<img class="me-card-foto" src="${fotoSrc}" alt="${escHtml(l.nom)}" loading="lazy"
        onerror="this.parentNode.innerHTML='<div class=\\'me-card-foto-placeholder\\'>${placeholder}</div>'">`
    : `<div class="me-card-foto-placeholder">${placeholder}</div>`;

  const linksHtml = l.links && l.links.length
    ? `<div class="me-card-footer">${l.links.slice(0, 3).map((lk, li) =>
        `<a class="me-card-link" href="${escHtml(lk)}" target="_blank" rel="noopener">Més info ${l.links.length > 1 ? li + 1 : ''}</a>`
      ).join('')}</div>`
    : '';

  const descText = l.desc || '';
  const descCurt = descText.length > 160;

  return `
  <article class="me-card${l.destacat ? ' destacada' : ''}" style="animation-delay:${delay}ms">
    <div class="me-card-foto-wrap">
      ${fotoHtml}
      ${l.destacat ? `<span class="me-badge-destacat">⭐ Destacat</span>` : ''}
      <span class="me-badge-illa">${illa_label}</span>
    </div>
    <div class="me-card-cos">
      <div class="me-card-meta">
        <span class="me-card-cat-badge">${placeholder} ${cat_label}</span>
        ${l.zona ? `<span class="me-card-zona">${escHtml(l.zona)}</span>` : ''}
      </div>
      <h3 class="me-card-nom">${escHtml(l.nom)}</h3>
      ${descText ? `
      <div class="me-card-desc">
        <div class="me-card-desc-text" id="desc-${l.id}">${escHtml(descText)}</div>
        ${descCurt ? `<button class="me-card-llegir-mes" onclick="meExpandDesc(${l.id}, this)">Llegir més ▾</button>` : ''}
      </div>` : ''}
    </div>
    ${linksHtml}
  </article>`;
}

function meExpandDesc(id, btn) {
  const el = document.getElementById(`desc-${id}`);
  const expanded = el.classList.toggle('expandit');
  btn.textContent = expanded ? 'Llegir menys ▴' : 'Llegir més ▾';
}

/* ── Secció de links ── */
function renderLinks(llocsVisibles) {
  const wrap = document.getElementById('meLinksWrap');

  // Recopilar links
  const linkSet = new Set();

  // Links dels llocs visibles
  llocsVisibles.forEach(l => {
    if (l.links) l.links.forEach(lk => linkSet.add(lk));
  });

  // Links MPP per categoria
  if (ME.cat === 'Tots' || ME.cat === 'Miradors') {
    (ME_MPP_LINKS['Miradors'] || []).forEach(lk => linkSet.add(lk));
  }
  if (ME.cat === 'Tots' || ME.cat === 'Platges') {
    (ME_MPP_LINKS['Platges'] || []).forEach(lk => linkSet.add(lk));
  }
  if (ME.cat === 'Tots' || ME.cat === 'Piscines') {
    (ME_MPP_LINKS['Piscines'] || []).forEach(lk => linkSet.add(lk));
  }

  // Links per illa
  if (ME.illa !== 'Totes') {
    (ME_LINKS_PER_ILLA[ME.illa] || []).forEach(lk => linkSet.add(lk));
  } else {
    Object.values(ME_LINKS_PER_ILLA).forEach(arr => arr.forEach(lk => linkSet.add(lk)));
  }

  // Links generals sempre
  ME_LINKS_GENERALS.forEach(lk => linkSet.add(lk));

  const links = [...linkSet];
  if (links.length === 0) {
    wrap.style.display = 'none';
    return;
  }
  wrap.style.display = 'block';

  const cos = document.getElementById('meLinksCos');
  const count = document.getElementById('meLinksCount');
  count.textContent = `${links.length} recursos`;

  cos.innerHTML = links.map(lk => {
    const host = linkHostname(lk);
    return `<a class="me-link-item" href="${escHtml(lk)}" target="_blank" rel="noopener">${escHtml(host)}</a>`;
  }).join('');
}

function meToggleLinks() {
  const cos = document.getElementById('meLinksCos');
  const ico = document.getElementById('meLinksIco');
  const open = cos.classList.toggle('obert');
  ico.classList.toggle('obert', open);
}

/* ── Utils ── */
function escHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function linkHostname(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace('www.', '');
  } catch { return url; }
}
