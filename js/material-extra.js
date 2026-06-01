/* ============================================================
   MATERIAL-EXTRA.JS  ·  Açores 2026  ·  Secció: +INFO
   ============================================================ */

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
  { id: 'Tots',          label: 'Totes' },
  { id: 'Paisatge',      label: 'Paisatge' },
  { id: 'Llacs',         label: 'Llacs' },
  { id: 'Geologia',      label: 'Geologia' },
  { id: "Salts d'aigua", label: "Salts d'aigua" },
];

const ME_ILLES = [
  { id: 'Totes',     emoji: '🏝️', label: 'Totes' },
  { id: 'Sao Miguel',emoji: '🌋', label: 'São Miguel' },
  { id: 'Pico',      emoji: '⛰️', label: 'Pico' },
  { id: 'Sao Jorge', emoji: '🐉', label: 'São Jorge' },
  { id: 'Faial',     emoji: '💙', label: 'Faial' },
];

const ME_CAT_EMOJI  = { Miradors:'🏔️', Platges:'🏖️', Piscines:'🏊', Naturalesa:'🌿', 'Aigues Termals':'♨️', 'Jardi Botanic':'🌺', Pobles:'🏘️', Fars:'🔦', Coves:'🦇', Altres:'⭐' };
const ME_CAT_LABEL  = { Miradors:'Mirador', Platges:'Platja', Piscines:'Piscina natural', Naturalesa:'Naturalesa', 'Aigues Termals':'Aigues Termals', 'Jardi Botanic':'Jardí Botànic', Pobles:'Poble/Ciutat', Fars:'Far', Coves:'Cova', Altres:'Altres' };
const ME_ILLA_LABEL = { 'Sao Miguel':'São Miguel', Pico:'Pico', 'Sao Jorge':'São Jorge', Faial:'Faial' };
const ME_CAT_PLCHLD = { Miradors:'🏔️', Platges:'🏖️', Piscines:'🌊', Naturalesa:'🌿', 'Aigues Termals':'♨️', 'Jardi Botanic':'🌸', Pobles:'🏘️', Fars:'🔦', Coves:'🦇', Altres:'⭐' };

/* ── Estat ── */
const ME = { illa:'Totes', cat:'Tots', subcat:'Tots', destacat:false, zona:'' };
let _linksTabIlla = 'General';
let _linksTabCat  = null;

/* ── Inici ── */
document.addEventListener('DOMContentLoaded', () => {
  renderIlles(); renderCats(); renderSubcats(); renderExtres(); render();
});

/* ── Filtres ── */
function renderIlles() {
  document.getElementById('meIlles').innerHTML = ME_ILLES.map(ill =>
    `<button class="me-filtre-illa${ME.illa===ill.id?' actiu':''}" onclick="meSetIlla('${ill.id}')">
      ${ill.emoji} ${ill.label}
    </button>`
  ).join('');
}

function renderCats() {
  document.getElementById('meCats').innerHTML = ME_CATS.map(c => {
    const count = ME_LLOCS.filter(l =>
      (ME.illa==='Totes'||l.illa===ME.illa) && (c.id==='Tots'||l.categoria===c.id)
    ).length;
    if (count===0 && c.id!=='Tots') return '';
    return `<button class="me-filtre-cat${ME.cat===c.id?' actiu':''}" onclick="meSetCat('${c.id}')">
      ${c.emoji} ${c.label} <span class="me-filtre-num">${count}</span>
    </button>`;
  }).join('');
}

function renderSubcats() {
  const wrap = document.getElementById('meSubcats');
  const fila = document.getElementById('meSubcatsFila');
  const show = ME.cat==='Naturalesa';
  wrap.classList.toggle('hidden', !show);
  if (fila) fila.classList.toggle('visible', show);
  if (!show) return;
  wrap.innerHTML = ME_SUBCATS.map(s => {
    const count = ME_LLOCS.filter(l =>
      l.categoria==='Naturalesa' &&
      (ME.illa==='Totes'||l.illa===ME.illa) &&
      (s.id==='Tots'||l.subcat===s.id)
    ).length;
    return `<button class="me-filtre-subcat${ME.subcat===s.id?' actiu':''}" onclick="meSetSubcat('${s.id}')">
      ${s.label} <span class="me-filtre-num">${count}</span>
    </button>`;
  }).join('');
}

function renderExtres() {
  document.getElementById('meToggleDestacat').classList.toggle('actiu', ME.destacat);
  const sel = document.getElementById('meZonaSelect');
  sel.disabled = ME.illa==='Totes';
  const zones = ME.illa==='Totes' ? [] :
    [...new Set(ME_LLOCS.filter(l=>l.illa===ME.illa&&l.zona).map(l=>l.zona))].sort();
  sel.innerHTML = `<option value="">Totes les zones</option>` +
    zones.map(z=>`<option value="${z}"${ME.zona===z?' selected':''}>${z}</option>`).join('');
}

/* ── Accions ── */
function meSetIlla(illa) {
  ME.illa=illa; ME.zona='';
  _linksTabIlla = illa==='Totes' ? 'General' : ME_ILLA_LABEL[illa]||illa;
  renderIlles(); renderCats(); renderSubcats(); renderExtres(); render();
}
function meSetCat(cat) {
  ME.cat=cat; if(cat!=='Naturalesa') ME.subcat='Tots';
  renderCats(); renderSubcats(); render();
}
function meSetSubcat(sub) { ME.subcat=sub; renderSubcats(); render(); }
function meToggleDestacat() { ME.destacat=!ME.destacat; renderExtres(); render(); }
function meSetZona() { ME.zona=document.getElementById('meZonaSelect').value; render(); }

/* ── Filtratge ── */
function filtrarLlocs() {
  return ME_LLOCS.filter(l => {
    if (ME.illa!=='Totes' && l.illa!==ME.illa) return false;
    if (ME.cat!=='Tots' && l.categoria!==ME.cat) return false;
    if (ME.cat==='Naturalesa' && ME.subcat!=='Tots' && l.subcat!==ME.subcat) return false;
    if (ME.destacat && !l.destacat) return false;
    if (ME.zona && l.zona!==ME.zona) return false;
    return true;
  });
}

/* ── Render principal ── */
function render() {
  const llocs = filtrarLlocs();
  const grid  = document.getElementById('meGrid');
  const buit  = document.getElementById('meBuit');
  const comp  = document.getElementById('meComptador');

  comp.innerHTML = `<span>${llocs.length}</span> lloc${llocs.length!==1?'s':''}`;

  if (llocs.length===0) {
    grid.innerHTML=''; buit.classList.add('visible');
    renderLinks(); return;
  }
  buit.classList.remove('visible');
  grid.innerHTML = llocs.map((l,i) => renderCard(l,i)).join('');
  renderLinks();
}

function renderCard(l, i) {
  const fotoSrc = l.foto ? `img/material-extra/${l.foto}.webp` : null;
  const ill_lbl = ME_ILLA_LABEL[l.illa]||l.illa;
  const cat_lbl = ME_CAT_LABEL[l.categoria]||l.categoria;
  const ph      = ME_CAT_PLCHLD[l.categoria]||'📍';
  const delay   = Math.min(i*25,300);

  const fotoHtml = fotoSrc
    ? `<img class="me-card-foto" src="${fotoSrc}" alt="${escHtml(l.nom)}" loading="lazy"
         onerror="this.parentNode.innerHTML='<div class=\\'me-card-foto-placeholder\\'>${ph}</div>'">`
    : `<div class="me-card-foto-placeholder">${ph}</div>`;

  const linksHtml = l.links&&l.links.length
    ? `<div class="me-card-footer">${l.links.slice(0,3).map((lk,li)=>
        `<a class="me-card-link" href="${escHtml(lk)}" target="_blank" rel="noopener">Més info${l.links.length>1?' '+(li+1):''}</a>`
      ).join('')}</div>`
    : '';

  const desc    = l.desc||'';
  const descLng = desc.length>160;

  return `
  <article class="me-card${l.destacat?' destacada':''}" style="animation-delay:${delay}ms">
    <div class="me-card-foto-wrap">
      ${fotoHtml}
      ${l.destacat?`<span class="me-badge-destacat">⭐ Destacat</span>`:''}
      <span class="me-badge-illa">${ill_lbl}</span>
    </div>
    <div class="me-card-cos">
      <div class="me-card-meta">
        <span class="me-card-cat-badge">${ph} ${cat_lbl}</span>
        ${l.zona?`<span class="me-card-zona">${escHtml(l.zona)}</span>`:''}
      </div>
      <h3 class="me-card-nom">${escHtml(l.nom)}</h3>
      ${desc?`<div class="me-card-desc">
        <div class="me-card-desc-text" id="desc-${l.id}">${escHtml(desc)}</div>
        ${descLng?`<button class="me-card-llegir-mes" onclick="meExpandDesc(${l.id},this)">Llegir més ▾</button>`:''}
      </div>`:''}
    </div>
    ${linksHtml}
  </article>`;
}

function meExpandDesc(id, btn) {
  const el = document.getElementById(`desc-${id}`);
  const ex = el.classList.toggle('expandit');
  btn.textContent = ex ? 'Llegir menys ▴' : 'Llegir més ▾';
}

/* ══════════════════════════════════════════════
   SECCIÓ DE LINKS — filtres per categoria, illa i favorits
   ══════════════════════════════════════════════ */

const ME_LINK_CATS  = ['General', 'Miradors', 'Platges', 'Piscines'];
const ME_LINK_ILLES = ['Totes', 'Sao Miguel', 'Pico', 'Sao Jorge', 'Faial'];
const ME_LINK_CAT_EMOJI  = { General:'🌐', Miradors:'🏔️', Platges:'🏖️', Piscines:'🏊' };
const ME_LINK_ILLA_EMOJI = { Totes:'🏝️', 'Sao Miguel':'🌋', Pico:'⛰️', 'Sao Jorge':'🐉', Faial:'💙' };
const ME_LINK_ILLA_LBL   = { Totes:'Totes', 'Sao Miguel':'São Miguel', Pico:'Pico', 'Sao Jorge':'São Jorge', Faial:'Faial' };

// Estat inicial: cap filtre seleccionat, favorits activats
let _lnkCat     = null;
let _lnkIlla    = null;
let _lnkFavorit = true;   // per defecte mostra favorits
let _linksOpen  = false;

function _filtrarLinks() {
  return ME_LINKS.filter(l =>
    (_lnkCat     === null  || l.cat  === _lnkCat) &&
    (_lnkIlla    === null  || _lnkIlla === 'Totes' || l.illa === _lnkIlla || l.illa === 'Totes') &&
    (!_lnkFavorit || l.favorit)
  );
}

function renderLinks() {
  const wrap = document.getElementById('meLinksWrap');
  wrap.style.display = 'block';

  // Comptadors
  function cntCat(c) {
    return ME_LINKS.filter(l =>
      (c === null || l.cat === c) &&
      (_lnkIlla === null || _lnkIlla === 'Totes' || l.illa === _lnkIlla || l.illa === 'Totes') &&
      (!_lnkFavorit || l.favorit)
    ).length;
  }
  function cntIlla(ill) {
    return ME_LINKS.filter(l =>
      (_lnkCat === null || l.cat === _lnkCat) &&
      (ill === null || ill === 'Totes' || l.illa === ill || l.illa === 'Totes') &&
      (!_lnkFavorit || l.favorit)
    ).length;
  }

  const llocs  = _filtrarLinks();
  const total  = ME_LINKS.length;
  const favCnt = ME_LINKS.filter(l => l.favorit).length;

  // Pestanyes categoria
  const catTabs = ME_LINK_CATS.map(c => {
    const cnt = cntCat(c);
    if (cnt === 0) return '';
    return `<button class="me-links-tab${_lnkCat===c?' actiu':''}" onclick="meLnkSetCat('${c}')">
      ${ME_LINK_CAT_EMOJI[c]} ${c} <span class="me-filtre-num">${cnt}</span>
    </button>`;
  }).join('');

  // Pestanyes illa
  const illaTabs = ME_LINK_ILLES.map(ill => {
    const cnt = cntIlla(ill);
    if (cnt === 0) return '';
    return `<button class="me-links-tab${_lnkIlla===ill?' actiu':''}" onclick="meLnkSetIlla('${ill}')">
      ${ME_LINK_ILLA_EMOJI[ill]} ${ME_LINK_ILLA_LBL[ill]} <span class="me-filtre-num">${cnt}</span>
    </button>`;
  }).join('');

  // Grid de links
  const gridHtml = llocs.length
    ? llocs.map(l => `
      <a class="me-link-item${l.favorit?' favorit':''}" href="${escHtml(l.url)}" target="_blank" rel="noopener">
        ${l.favorit ? '<span class="me-link-star">⭐</span>' : ''}
        <span class="me-link-url">${escHtml(l.url)}</span>
      </a>`).join('')
    : `<p class="me-links-buit">Cap recurs per a aquesta combinació</p>`;

  wrap.innerHTML = `
  <div class="me-links-header" onclick="meToggleLinks()">
    <h3 class="me-links-titol">🔗 Recursos i enllaços</h3>
    <span class="me-links-count">${total} recursos</span>
    <span class="me-links-toggle${_linksOpen?' obert':''}" id="meLinksIco">▼</span>
  </div>
  <div class="me-links-cos${_linksOpen?' obert':''}" id="meLinksCos">

    <div class="me-links-filtres-wrap">

      <div class="me-links-fila">
        <span class="me-links-filtre-lbl">Categoria</span>
        <div class="me-links-tabs">${catTabs || '<span class="me-links-buit-tabs">Cap opció disponible</span>'}</div>
      </div>

      <div class="me-links-fila">
        <span class="me-links-filtre-lbl">Illa</span>
        <div class="me-links-tabs">${illaTabs}</div>
      </div>

      <div class="me-links-fila me-links-fila-extra">
        <button class="me-toggle-destacat${_lnkFavorit?' actiu':''}" onclick="meLnkToggleFavorit()">
          <span class="me-toggle-ico">⭐</span>
          <span>Favorits <span class="me-filtre-num">${favCnt}</span></span>
        </button>
        ${(_lnkCat||_lnkIlla||_lnkFavorit)
          ? `<button class="me-links-reset" onclick="meLnkReset()">✕ Netejar filtres</button>`
          : ''}
        <span class="me-comptador" style="margin-left:auto">
          <span>${llocs.length}</span> de ${total}
        </span>
      </div>

    </div>

    <div class="me-links-grid">${gridHtml}</div>

  </div>`;
}

let _linksOpen_flag = false;

function meToggleLinks() {
  _linksOpen = !_linksOpen;
  document.getElementById('meLinksCos')?.classList.toggle('obert', _linksOpen);
  document.getElementById('meLinksIco')?.classList.toggle('obert', _linksOpen);
}

function meLnkSetCat(c) {
  _lnkCat = (_lnkCat === c) ? null : c;
  renderLinks();
  if (_linksOpen) document.getElementById('meLinksCos')?.classList.add('obert');
}
function meLnkSetIlla(ill) {
  _lnkIlla = (_lnkIlla === ill) ? null : ill;
  renderLinks();
  if (_linksOpen) document.getElementById('meLinksCos')?.classList.add('obert');
}
function meLnkToggleFavorit() {
  _lnkFavorit = !_lnkFavorit;
  renderLinks();
  if (_linksOpen) document.getElementById('meLinksCos')?.classList.add('obert');
}
function meLnkReset() {
  _lnkCat = null; _lnkIlla = null; _lnkFavorit = false;
  renderLinks();
  if (_linksOpen) document.getElementById('meLinksCos')?.classList.add('obert');
}

/* ── Utils ── */
function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function linkHostname(url) {
  try { return new URL(url).hostname.replace('www.',''); } catch { return url; }
}
