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

/* ══════════════════════════════════════════════
   NAVEGACIÓ DE SECCIONS
   ══════════════════════════════════════════════ */
let _seccioActiva = 'llocs';

function meSetSeccio(id) {
  _seccioActiva = id;
  // Amaga totes les seccions
  document.querySelectorAll('.me-seccio').forEach(s => s.classList.add('hidden'));
  document.querySelectorAll('.me-sec-btn').forEach(b => b.classList.remove('actiu'));
  // Mostra la seleccionada
  const sec = document.getElementById('sec-' + id);
  if (sec) sec.classList.remove('hidden');
  // Marca el botó
  const btn = [...document.querySelectorAll('.me-sec-btn')].find(b => b.getAttribute('onclick')?.includes("'" + id + "'"));
  if (btn) btn.classList.add('actiu');
  // Scroll al top del contingut
  document.querySelector('.me-sec-nav-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  // Init aventura si cal
  if (id === 'aventura'   && !_avInit)   initAventura();
  if (id === 'excursions' && !_excInit)  initExcursions();
}

/* ══════════════════════════════════════════════
   SECCIÓ: AVENTURA
   ══════════════════════════════════════════════ */
let _avInit   = false;
let _avTipus  = null;
let _avIlla   = null;

const AV_ILLA_EMOJI = { 'Sao Miguel':'🌋', 'Pico':'⛰️', 'Sao Jorge':'🐉', 'Faial':'💙' };
const AV_ILLA_LBL   = { 'Sao Miguel':'São Miguel', 'Pico':'Pico', 'Sao Jorge':'São Jorge', 'Faial':'Faial' };

function initAventura() {
  _avInit = true;
  renderAvCards();
  renderAvLinks();
}

/* ── Cards d'activitat ── */
function renderAvCards() {
  const grid = document.getElementById('avGrid');
  if (!grid) return;
  grid.innerHTML = ME_ACTIVITATS.map((act, i) => renderAvCard(act, i)).join('');
}

function renderAvCard(act, i) {
  const imgSrc = `img/material-extra/fons-${act.img}.webp`;
  const delay  = i * 50;

  // Agrupar llocs per illa
  const perIlla = {};
  act.llocs.forEach(l => {
    if (!perIlla[l.illa]) perIlla[l.illa] = [];
    perIlla[l.illa].push(l.lloc);
  });

  const total = act.llocs.length;
  const illes = Object.keys(perIlla);

  const llocsHtml = illes.map(ill => {
    const emoji = AV_ILLA_EMOJI[ill] || '🏝️';
    const lbl   = AV_ILLA_LBL[ill]   || ill;
    const llocs = perIlla[ill];
    return `<div class="av-card-illa-grup">
      <span class="av-card-illa-lbl">${emoji} ${lbl}</span>
      <div class="av-card-llocs">
        ${llocs.map(l => `<span class="av-card-lloc">📍 ${escHtml(l)}</span>`).join('')}
      </div>
    </div>`;
  }).join('');

  return `
  <article class="av-card" style="animation-delay:${delay}ms"
    onclick="avCardClick(this, '${escHtml(act.tipus)}')">
    <div class="av-card-foto" style="background-image:url('${imgSrc}')">
      <div class="av-card-overlay"></div>
      <div class="av-card-header">
        <span class="av-card-emoji">${act.emoji}</span>
        <h3 class="av-card-nom">${escHtml(act.tipus)}</h3>
        <span class="av-card-count">${total} lloc${total !== 1 ? 's' : ''}</span>
      </div>
    </div>
    <div class="av-card-cos">${llocsHtml}</div>
  </article>`;
}

function avCardClick(el, tipus) {
  // Expandeix/col·lapsa la card
  el.classList.toggle('expandida');
}

/* ── Links aventura ── */
function renderAvLinks() {
  const wrap = document.getElementById('avLinksWrap');
  if (!wrap) return;
  wrap.style.display = 'block';

  const tipus_list = ['Barranquisme','Snorkel','Bici','Kayak o Paddle Surf',
    'Busseig','Coasteering','Nedar amb dofins','Escalada','Surf','Moto aquàtica'];
  const illa_list  = ['Totes','Sao Miguel','Pico','Faial'];

  // Posts (sempre visibles)
  const postsHtml = ME_AVENT_POSTS.map(p =>
    `<a class="me-link-item" href="${escHtml(p)}" target="_blank" rel="noopener">
      <span class="me-link-url">${escHtml(p)}</span>
    </a>`
  ).join('');

  // Empreses filtrades i desduplicades
  function getEmpreses() {
    let emp = ME_AVENT_EMPRESES.filter(e =>
      (_avTipus === null || e.tipus === _avTipus) &&
      (_avIlla  === null || _avIlla === 'Totes' || e.illa === _avIlla.toLowerCase() ||
       e.illa === _avIlla || normalIlla(e.illa) === _avIlla)
    );
    // Deduplicar per URL quan no hi ha filtre de tipus
    if (_avTipus === null) {
      const seen = new Set();
      emp = emp.filter(e => { if (seen.has(e.url)) return false; seen.add(e.url); return true; });
    }
    return emp;
  }

  function cntTipus(t) {
    let emp = ME_AVENT_EMPRESES.filter(e =>
      (t === null || e.tipus === t) &&
      (_avIlla === null || _avIlla === 'Totes' || normalIlla(e.illa) === _avIlla)
    );
    if (t === null) { const s = new Set(); emp = emp.filter(e => { if(s.has(e.url)) return false; s.add(e.url); return true; }); }
    return emp.length;
  }
  function cntIlla(ill) {
    let emp = ME_AVENT_EMPRESES.filter(e =>
      (_avTipus === null || e.tipus === _avTipus) &&
      (ill === 'Totes' || normalIlla(e.illa) === ill)
    );
    if (_avTipus === null) { const s = new Set(); emp = emp.filter(e => { if(s.has(e.url)) return false; s.add(e.url); return true; }); }
    return emp.length;
  }

  const empreses = getEmpreses();

  // Tabs tipus
  const tipusTabs = [['Tots',null], ...tipus_list.map(t=>[t,t])].map(([lbl,val]) => {
    const cnt = cntTipus(val);
    if (cnt === 0 && val !== null) return '';
    const actiu = _avTipus === val;
    const vlbl  = val === null ? 'Tots' : lbl;
    const vesc  = val ? escHtml(val) : 'null';
    return `<button class="me-links-tab${actiu?' actiu':''}"
      onclick="avSetTipus(${val?`'${vesc}'`:'null'})">${vlbl} <span class="me-filtre-num">${cnt}</span></button>`;
  }).join('');

  // Tabs illa
  const illaTabs = illa_list.map(ill => {
    const cnt = cntIlla(ill);
    if (cnt === 0) return '';
    const actiu = _avIlla === ill || (_avIlla === null && ill === 'Totes');
    const emoji = ill === 'Totes' ? '🏝️' : (AV_ILLA_EMOJI[ill]||'');
    const lbl   = ill === 'Totes' ? 'Totes' : (AV_ILLA_LBL[ill]||ill);
    return `<button class="me-links-tab${actiu?' actiu':''}"
      onclick="avSetIlla('${ill}')">${emoji} ${lbl} <span class="me-filtre-num">${cnt}</span></button>`;
  }).join('');

  const empresesHtml = empreses.length
    ? empreses.map(e => `<a class="me-link-item" href="${escHtml(e.url)}" target="_blank" rel="noopener">
        <span class="me-link-url">${escHtml(e.url)}</span>
      </a>`).join('')
    : `<p class="me-links-buit">Cap empresa per a aquesta combinació</p>`;

  const totalEmp = ME_AVENT_EMPRESES.filter((e,i,a)=>a.findIndex(x=>x.url===e.url)===i).length;

  wrap.innerHTML = `
  <div class="me-links-header" onclick="avToggleLinks()">
    <h3 class="me-links-titol">🔗 Posts i empreses d'aventura</h3>
    <span class="me-links-count">${totalEmp} empreses · ${ME_AVENT_POSTS.length} posts</span>
    <span class="me-links-toggle${_avLinksOpen?' obert':''}" id="avLinksIco">▼</span>
  </div>
  <div class="me-links-cos${_avLinksOpen?' obert':''}" id="avLinksCos">

    <div class="av-links-posts-bloc">
      <div class="me-links-bloc-titol">📰 Posts recomanats</div>
      <div class="me-links-grid">${postsHtml}</div>
    </div>

    <div class="av-links-emp-bloc">
      <div class="me-links-bloc-titol" style="margin-top:20px">🏢 Empreses</div>
      <div class="me-links-filtres-wrap" style="margin-bottom:12px">
        <div class="me-links-fila">
          <span class="me-links-filtre-lbl">Activitat</span>
          <div class="me-links-tabs">${tipusTabs}</div>
        </div>
        <div class="me-links-fila">
          <span class="me-links-filtre-lbl">Illa</span>
          <div class="me-links-tabs">${illaTabs}</div>
        </div>
        <div class="me-links-fila me-links-fila-extra">
          <span class="me-comptador"><span>${empreses.length}</span> empreses</span>
        </div>
      </div>
      <div class="me-links-grid">${empresesHtml}</div>
    </div>

  </div>`;
}

let _avLinksOpen = false;
function avToggleLinks() {
  _avLinksOpen = !_avLinksOpen;
  document.getElementById('avLinksCos')?.classList.toggle('obert', _avLinksOpen);
  document.getElementById('avLinksIco')?.classList.toggle('obert', _avLinksOpen);
}
function avSetTipus(t) {
  _avTipus = t === 'null' ? null : t;
  renderAvLinks();
  if (_avLinksOpen) document.getElementById('avLinksCos')?.classList.add('obert');
}
function avSetIlla(ill) {
  _avIlla = (ill === 'Totes') ? null : ill;
  renderAvLinks();
  if (_avLinksOpen) document.getElementById('avLinksCos')?.classList.add('obert');
}
function normalIlla(s) {
  if (!s) return '';
  const m = {'sao miguel':'Sao Miguel','pico':'Pico','faial':'Faial','sao jorge':'Sao Jorge'};
  return m[s.toLowerCase()] || s;
}

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

/* ══════════════════════════════════════════════
   SECCIÓ: EXCURSIONS
   ══════════════════════════════════════════════ */
let _excTab  = 'cetacis';
let _excInit = false;

const EXC_TABS = [
  { id:'cetacis',  emoji:'🐋', label:'Avistament de Cetacis' },
  { id:'barco',    emoji:'⛵', label:'Passeig amb Barco' },
  { id:'estrelles',emoji:'🔭', label:"Observació d'Estrelles" },
];
const EXC_ILLA_EMOJI = {'Sao Miguel':'🌋','Pico':'⛰️','Faial':'💙','Sao Jorge':'🐉'};
const EXC_ILLA_LBL   = {'Sao Miguel':'São Miguel','Pico':'Pico','Faial':'Faial','Sao Jorge':'São Jorge'};

function initExcursions() {
  _excInit = true;
  renderExcNav();
  renderExcContingut();
}

function renderExcNav() {
  const nav = document.getElementById('excNav');
  if (!nav) return;
  nav.innerHTML = EXC_TABS.map(t =>
    `<button class="exc-tab${_excTab===t.id?' actiu':''}" onclick="excSetTab('${t.id}')">
      ${t.emoji} ${t.label}
    </button>`
  ).join('');
}

function excSetTab(id) {
  _excTab = id;
  renderExcNav();
  renderExcContingut();
}

function renderExcContingut() {
  const wrap = document.getElementById('excContingut');
  if (!wrap) return;
  if (_excTab === 'cetacis')   wrap.innerHTML = renderCetacis();
  if (_excTab === 'barco')     wrap.innerHTML = renderBarco();
  if (_excTab === 'estrelles') wrap.innerHTML = renderEstrelles();
}

/* ── CETACIS ── */
function renderCetacis() {
  const d = ME_EXCURSIONS.cetacis;

  const especies = d.especies.map(e =>
    `<div class="exc-especie">
      <span class="exc-especie-nom">${escHtml(e.nom)}</span>
      <span class="exc-especie-det">${escHtml(e.detall)}</span>
    </div>`
  ).join('');

  const llocsPerIlla = {};
  d.llocs.forEach(l => {
    if (!llocsPerIlla[l.illa]) llocsPerIlla[l.illa] = [];
    llocsPerIlla[l.illa].push(l);
  });

  const llocsHtml = Object.entries(llocsPerIlla).map(([illa, llocs]) => `
    <div class="exc-illa-bloc">
      <h3 class="exc-illa-titol">${EXC_ILLA_EMOJI[illa]||'🏝️'} ${EXC_ILLA_LBL[illa]||illa}</h3>
      <div class="exc-llocs-grid">
        ${llocs.map(l => `
          <div class="exc-lloc-card">
            <div class="exc-lloc-nom">📍 ${escHtml(l.nom)}</div>
            <p class="exc-lloc-desc">${escHtml(l.desc)}</p>
            ${l.links.length ? `<div class="exc-lloc-links">
              ${l.links.map(lk=>`<a class="exc-link-btn" href="${escHtml(lk)}" target="_blank" rel="noopener">${escHtml(linkHostname(lk))}</a>`).join('')}
            </div>` : ''}
          </div>`
        ).join('')}
      </div>
    </div>`
  ).join('');

  const consells = d.consells.map(c =>
    `<div class="exc-consell"><span class="exc-consell-ico">${c.ico}</span><span>${escHtml(c.text)}</span></div>`
  ).join('');

  const linkGen = d.links_generals.map(lk =>
    `<a class="me-link-item" href="${escHtml(lk)}" target="_blank" rel="noopener"><span class="me-link-url">${escHtml(lk)}</span></a>`
  ).join('');

  return `
  <div class="exc-hero exc-hero-cetacis">
    <div class="exc-hero-overlay"></div>
    <div class="exc-hero-content">
      <div class="exc-hero-eyebrow">Açores 2026 · Excursions</div>
      <h2 class="exc-hero-titol">🐋 Avistament de Cetacis</h2>
      <p class="exc-hero-sub">Un dels millors llocs del món per observar balenes i dofins en llibertat</p>
    </div>
  </div>

  <div class="exc-cos">
    <div class="exc-intro-grid">
      <div class="exc-intro-text">
        ${d.intro.split('\n\n').map(p=>`<p>${escHtml(p)}</p>`).join('')}
      </div>
      <div class="exc-especies-wrap">
        <div class="exc-especies-titol">🐠 Espècies habituals</div>
        ${especies}
      </div>
    </div>

    <div class="exc-seccio-sep"><h3 class="exc-seccio-titol">📍 On fer-ho · per porta d'embarcament</h3></div>
    ${llocsHtml}

    <div class="exc-seccio-sep"><h3 class="exc-seccio-titol">💡 Consells</h3></div>
    <div class="exc-consells">${consells}</div>

    <div class="exc-seccio-sep"><h3 class="exc-seccio-titol">🔗 Més informació</h3></div>
    <div class="me-links-grid">${linkGen}</div>
  </div>`;
}

/* ── BARCO ── */
function renderBarco() {
  const d = ME_EXCURSIONS.barco;

  const genLinks = d.links_generals.map(l =>
    `<a class="exc-gen-link" href="${escHtml(l.url)}" target="_blank" rel="noopener">
      <span class="exc-gen-link-ico">${l.url.includes('manawa')?'🛒':'⭐'}</span>
      <span class="exc-gen-link-nom">${escHtml(l.nom)}</span>
      <span class="exc-gen-link-arr">→</span>
    </a>`
  ).join('');

  const manawa = d.activitats.filter(a => a.font === 'manawa');
  const tripad = d.activitats.filter(a => a.font === 'tripadvisor');

  const actCard = (a, i) => `
    <a class="exc-act-card" href="${escHtml(a.url)}" target="_blank" rel="noopener"
       style="animation-delay:${i*40}ms">
      <div class="exc-act-top">
        <span class="exc-act-font exc-act-font-${a.font}">${a.font==='manawa'?'Manawa':'TripAdvisor'}</span>
        <span class="exc-act-durada">⏱ ${a.durada}</span>
      </div>
      <div class="exc-act-nom">${escHtml(a.nom)}</div>
      ${a.empresa?`<div class="exc-act-empresa">🏢 ${escHtml(a.empresa)}</div>`:''}
    </a>`;

  return `
  <div class="exc-hero exc-hero-barco">
    <div class="exc-hero-overlay"></div>
    <div class="exc-hero-content">
      <div class="exc-hero-eyebrow">Açores 2026 · Excursions</div>
      <h2 class="exc-hero-titol">⛵ Passeig amb Barco</h2>
      <p class="exc-hero-sub">Explora les costes volcàniques des del mar · São Miguel</p>
    </div>
  </div>

  <div class="exc-cos">
    <div class="exc-seccio-sep"><h3 class="exc-seccio-titol">🌐 Plataformes de reserva</h3></div>
    <div class="exc-gen-links">${genLinks}</div>

    <div class="exc-seccio-sep" style="margin-top:32px">
      <h3 class="exc-seccio-titol">🛒 Activitats a Manawa <span class="exc-count">${manawa.length}</span></h3>
    </div>
    <div class="exc-act-grid">${manawa.map(actCard).join('')}</div>

    <div class="exc-seccio-sep" style="margin-top:32px">
      <h3 class="exc-seccio-titol">⭐ Activitats a TripAdvisor <span class="exc-count">${tripad.length}</span></h3>
    </div>
    <div class="exc-act-grid">${tripad.map((a,i)=>actCard(a,i+manawa.length)).join('')}</div>
  </div>`;
}

/* ── ESTRELLES ── */
function renderEstrelles() {
  const d = ME_EXCURSIONS.estrelles;

  const llocsPerIlla = {};
  d.llocs.forEach(l => {
    if (!llocsPerIlla[l.illa]) llocsPerIlla[l.illa] = [];
    llocsPerIlla[l.illa].push(l);
  });

  const llocsHtml = Object.entries(llocsPerIlla).map(([illa, llocs]) => `
    <div class="exc-illa-bloc">
      <h3 class="exc-illa-titol">${EXC_ILLA_EMOJI[illa]||'🏝️'} ${EXC_ILLA_LBL[illa]||illa}</h3>
      <div class="exc-llocs-grid exc-llocs-grid-estrelles">
        ${llocs.map((l,i) => `
          <div class="exc-lloc-card exc-lloc-card-estrelles" style="animation-delay:${i*60}ms">
            <div class="exc-lloc-ico">${l.ico}</div>
            <div class="exc-lloc-nom">${escHtml(l.nom)}</div>
            <p class="exc-lloc-desc">${escHtml(l.desc)}</p>
          </div>`
        ).join('')}
      </div>
    </div>`
  ).join('');

  const consells = d.consells.map(c =>
    `<div class="exc-consell exc-consell-nit">
      <span class="exc-consell-ico">${c.ico}</span>
      <span>${escHtml(c.text)}</span>
    </div>`
  ).join('');

  return `
  <div class="exc-hero exc-hero-estrelles">
    <div class="exc-hero-overlay"></div>
    <div class="exc-hero-content">
      <div class="exc-hero-eyebrow">Açores 2026 · Excursions</div>
      <h2 class="exc-hero-titol">🔭 Observació d'Estrelles</h2>
      <p class="exc-hero-sub">Cel fosc, poc contaminació lumínica · els millors punts per illa</p>
    </div>
  </div>

  <div class="exc-cos">
    ${llocsHtml}
    <div class="exc-seccio-sep"><h3 class="exc-seccio-titol">🚗 Consells de conducció nocturna</h3></div>
    <div class="exc-consells">${consells}</div>
  </div>`;
}
