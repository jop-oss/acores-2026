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
  if (id === 'aventura'    && !_avInit)    initAventura();
  if (id === 'excursions'  && !_excInit)   initExcursions();
  if (id === 'gastronomia' && !_gastInit)  initGastronomia();
  if (id === 'maleta'      && !_maletaInit) initMaleta();
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

/* ══════════════════════════════════════════════
   SECCIÓ: GASTRONOMIA
   ══════════════════════════════════════════════ */
let _gastInit = false;

function initGastronomia() {
  _gastInit = true;
  renderGastronomia();
}

function gFoto(fitxer, peu) {
  return `<figure class="gast-fig">
    <img class="gast-fig-img" src="img/material-extra/${fitxer}.webp" alt="${escHtml(peu)}" loading="lazy">
    <figcaption class="gast-fig-peu">${escHtml(peu)}</figcaption>
  </figure>`;
}

function gTitol(emoji, text, id) {
  return `<h3 class="gast-seccio-titol" id="gast-${id}">${emoji} ${text}</h3>`;
}

function renderGastronomia() {
  const wrap = document.getElementById('gastContingut');
  if (!wrap) return;

  /* ── Àncores ── */
  const SECCIONS = [
    {id:'entrants', emoji:'🥗', label:'Entrants'},
    {id:'sopes',    emoji:'🍲', label:'Sopes'},
    {id:'peix',     emoji:'🐟', label:'Peix i Marisc'},
    {id:'carns',    emoji:'🥩', label:'Carns'},
    {id:'postres',  emoji:'🍮', label:'Postres'},
    {id:'formatges',emoji:'🧀', label:'Formatges'},
    {id:'embotits', emoji:'🌭', label:'Embotits'},
    {id:'begudes',  emoji:'🍷', label:'Begudes'},
    {id:'altres',   emoji:'🌿', label:'Altres productes'},
    {id:'plats',    emoji:'🍽️', label:'Plats típics'},
  ];
  const ancores = `<div class="gast-filtres-wrap"><div class="gast-filtres">
    ${SECCIONS.map(s=>`<a class="gast-filtre-btn" href="#gast-${s.id}" onclick="gastScrollTo('${s.id}',event)">${s.emoji} ${s.label}</a>`).join('')}
  </div></div>`;

  /* ── Plats típics (cards) ── */
  const PLATS = [
    {n:1,  nom:'Morcela com Ananás',                foto:'morcela_com_ananas',       desc:'Rodanxes de morcilla negra amb pinya brasejada. Sorprenent barreja present a gairebé totes les cartes dels restaurants açorians.'},
    {n:2,  nom:'Lapas Grelhadas',                   foto:'lapas-grelhadas',           desc:'Pegellides (una espècie de petxines) a la planxa adobades i cuinades en la seva pròpia closca. Perfectes com aperitiu.'},
    {n:3,  nom:'Polvo Guisat',                      foto:'polvo-guisado',            desc:'Pop condimentat amb vi aromàtic, pebre i xile, acompanyat de patates o arròs. L\'estil varia d\'una illa a una altra.'},
    {n:4,  nom:'Bolos Lêvedos',                     foto:'bolos-levedos',             desc:'Panet lleugerament dolç tradicional de la Vall de Furnas, fet amb ous, farina, sucre, mantega i llevat. Des de 1935 a l\'Hotel Terra Nostra.'},
    {n:5,  nom:'Alcatra',                           foto:'alcatra',                   desc:'El plat estrella de Terceira: guisat de vedella molt tenda cuit a foc lent en olla de fang amb vi negre, cansalada, all i espècies.'},
    {n:6,  nom:'Bife à Regional',                   foto:'bife-a-regional',           desc:'Bistec de vedella sucosa amb salsa de mantega, all i pebrots, o servit amb el formatge de São Jorge.'},
    {n:7,  nom:'Cozido das Furnas',                 foto:'cozido-as-furnas',          desc:'Cuit 7 hores enterrat a les calderes volcàniques de Furnas. Carns, xoriço, morcilla, col, pastanaga i patates. No es serveix amb caldo.'},
    {n:8,  nom:'Cracas',                            foto:'cracas',                    desc:'Un percebe únic de les Açores, adherit a roques volcàniques. Intens sabor marí, salat i salvatge. Com beure un xarrup del mateix oceà.'},
    {n:9,  nom:'Bacallà',                           foto:'bacalhau-a-margarida-da-praca', desc:'365 maneres de cuinar-lo: à Brás, à Margarida da Praça, à Transmontana, à Boca Gil Eanes... Un per a cada dia de l\'any.'},
    {n:10, nom:'Chicharros Fritos com Molho de Vilão', foto:'chicharros-fritos',      desc:'Sorell fregit cruixent amb salsa de pebrots, all i oli. Senzill però deliciós, especialment a São Miguel.'},
    {n:11, nom:'Pinya i fruites tropicals',         foto:'ananas',                    desc:'Plantacions sota hivernacles de vidre encalat a São Miguel, úniques al món. També maracujà i guaiaba peruana.'},
    {n:12, nom:'Queijadas da Vila',                 foto:'queijadas-da-vila',         desc:'Petits pastissos de formatge icònics de São Miguel. Suaus, lleugerament dolços i cruixents. Ideals amb cafè o te.'},
    {n:13, nom:'Fofas da Povoação',                 foto:'fofas-da-povoacao',         desc:'Éclair farcit de mantega, vainilla o llimona i recobert de xocolata. Originari de Povoação, São Miguel.'},
    {n:14, nom:'Queijo Branco com Pimenta da Terra',foto:'queijo-branco-com-pimenta-da-terra', desc:'Formatge fresc suau amb bitxo local mòlt. L\'aperitiu imprescindible de São Miguel. Servit amb pa, és perfecte.'},
    {n:15, nom:'Boca Negra Grelhada',               foto:'boca-nega-grelhada',        desc:'Gallineta a la brasa. Carn blanca, humida i saborosa. El peix estrella de São Miguel, sempre fresc.'},
    {n:16, nom:'Amêijoas de São Jorge',             foto:'ameijoas-sao-jorge',        desc:'Cloïsses úniques al món de la Fajã da Caldeira do Santo Cristo. Extremadament rares, només es cullen durant un curt període a l\'any.'},
  ];

  const platsHtml = PLATS.map((p, i) => {
    const imgHtml = p.foto
      ? `<div class="gast-plat-img-wrap"><img class="gast-plat-img" src="img/material-extra/${p.foto}.webp" alt="${escHtml(p.nom)}" loading="lazy" onerror="this.closest('.gast-plat-img-wrap').style.display='none'"></div>`
      : `<div class="gast-plat-ico">🍽️</div>`;
    return `<article class="gast-plat-card" style="animation-delay:${i*30}ms">
      ${imgHtml}
      <div class="gast-plat-cos">
        <span class="gast-plat-num">${p.n}</span>
        <h4 class="gast-plat-nom">${escHtml(p.nom)}</h4>
        <p class="gast-plat-desc">${escHtml(p.desc)}</p>
      </div>
    </article>`;
  }).join('');

  /* ── HTML complet ── */
  wrap.innerHTML = ancores + `<div class="gast-article">

  <p class="gast-intro-text">La gastronomia de les Açores està estretament lligada a la seva naturalesa volcànica i a la seva tradició pesquera. Els ingredients frescos, com el peix i el marisc, juntament amb una excel·lent carn local i les tècniques de cuinat tradicionals, ofereixen uns plats que han anat de generació en generació. Tot això acompanyat per tota classe de fruites i verdures de primera qualitat cultivades als sòls volcànics especialment fèrtils, i sense oblidar la gran varietat de formatges i vins locals.</p>

  ${gTitol('🥗','Entrants','entrants')}
  <p>Hi ha una gran varietat que sovint inclou la <em>Salada de Polvo</em> (amanida de pop), els <em>Pasteis de Bacalhau</em> (crestes de bacallà), les <em>Lapas</em> (crues o a la planxa amb all i llimona), les <em>Cracas</em> (una espècie de percebes) i el <em>Presunto</em> (pernil salat).</p>

  ${gTitol('🍲','Sopes','sopes')}
  <p>L'arxipèlag de les Açores —com la resta de Portugal— és conegut per les seves delicioses sopes que sovint tenen una consistència d'estofat i poden omplir molt. Les que podem trobar a la majoria de menús són el <em>Caldo Verde</em> (una sopa de col amb patates i salsitxa fumada), la <em>Sopa de Legumes</em> (sopa de llegums), la <em>Sopa Hortalicias</em> (sopa de verdures), la <em>Sopa de Peixe</em> (caldo de peix), la <em>Sopa de Mariscos</em>, el <em>Caldo Azedo</em> (caldo agra) o el <em>Caldo de Nabos</em> (sopa de naps).</p>
  <p>Més contundents són els diversos guisats que es solen oferir com a primer plat. Les <em>Caldeiradas</em>, que contenen carn de vedella, peix o pollastre.</p>
  ${gFoto('caldo-verde','Caldo Verde')}

  ${gTitol('🐟','Peix i Marisc','peix')}
  <p>Lògicament, el peix forma part de la dieta habitual dels illencs. La majoria de plats de peix estan preparats a la brasa (<em>na brasa</em>) o fregits. Els peixos que podem trobar més habitualment en els menús són: <em>Atum</em> (tonyina), <em>Espadarte</em> (peix espasa), <em>Espada Preto</em> (peix sable negre), <em>Cherne</em> (mero de fons), <em>Chicharro</em> (un sorell de més qualitat), <em>Pescada</em> (llucet), <em>Pargo</em> (pagre), <em>Cavala</em> (cavalla), <em>Congro</em> (congre), <em>Garoupa</em> (mero), <em>Lulas</em> (calamars), <em>Polvo</em> (pop) i, per descomptat, les <em>Sardinhas</em> (sardines) i el <em>Bacalhau</em> (bacallà), importat i preparat de varies maneres diferents.</p>
  <p>Respecte al marisc, destaquen les <em>Lapas</em> (pegellides), molt típiques de la regió. També trobarem <em>camarao</em> (gambes), <em>lagosta</em> (llagosta), <em>lagostinho</em> (llagostins), <em>cavaco</em> (semblant a una llagosta petita) i <em>santola</em> ("centollo"). Una especialitat especial és l'arròs de marisc, una colorida barreja de diferents mariscs cuinats amb arròs.</p>
  ${gFoto('cavaco','Cavaco — semblant a una llagosta petita, especialitat local')}

  ${gTitol('🥩','Carns','carns')}
  <p>No és una sorpresa la gran varietat de plats de carn que trobem a l'arxipèlag, especialment de carn de vedella. Per començar tenim els <em>Bifes</em> (bistecs de tot tipus), el <em>Bitoque</em> (bistecs petits amb un ou ferrat a sobre), l'<em>Entrecosto</em> (entrecot), les <em>costilles</em> (costelles), la <em>Caçoila</em> (estofat de porc), la <em>Carne do porco</em> (carn de porc), la <em>Carne de Molha</em> (plat de carn amb una deliciosa salsa típica de Faial), el <em>Coelho</em> (conill), el <em>Frango</em> (pollastre)… i moltes altres!</p>

  ${gTitol('🍮','Postres','postres')}
  <p>Els postres són molt bons, però també molt dolços. Sempre hi ha disponibles <em>bolos</em> (pastissos), puddings i pinya fresca. La <em>Massa Sovada</em> i l'<em>arroz doce</em> (un dolç arròs amb llet i canela) són alguns dels postres típics.</p>
  ${gFoto('massa-sovada','Massa Sovada — pa dolç i esponjós tradicional')}

  ${gTitol('🧀','Formatges','formatges')}
  <p>A les Açores, on s'elabora aproximadament la meitat dels formatges que es consumeixen a Portugal, el mite de les quatre estacions en un mateix dia és una realitat. Pluges generoses que amb el mateix ímpetu donen pas a un sol radiant i que afavoreixen una vegetació que frega el concepte de verger. Un paradís perfecte per al bestiar, que retoza feliç entre la frescor. Entre les 9 illes hi ha una infinitat de formatges artesanals, que en alguns casos mantenen els mètodes d'elaboració dels primers colons.</p>
  <p>El més famós de tots és el <em>Queijo de São Jorge</em>, un formatge picant i semidur, elaborat des del segle XV amb llet crua de vaca, reconegut amb DOP. Ha aconseguit que São Jorge sigui coneguda com l'Illa del Formatge. Es pot visitar la fàbrica <a class="gast-link" href="https://www.uniqueijo.pt/" target="_blank" rel="noopener">Uniqueijo</a> en aquesta illa.</p>
  ${gFoto('queijo-sao-jorge','Queijo de São Jorge — DOP, elaborat des del segle XV')}
  <p>El <em>Queijo Vaquinha</em>, cremós i suau com la mantega, és un dels emblemes de l'illa Terceira. A São Miguel n'hi ha varis, com el <em>Queijo do Vale</em>, que procedeix de la Vall de la Lagoa Seca. A l'illa de Pico destaca el <em>Queijo do Pico</em> (o queijo de São João), amb DOP Europea des del 1998. També a Pico podem trobar el formatge <em>Ilha dos Mistérios</em>, on els camps de lava basàltica són claus per a la seva elaboració. Un formatge diferent que es destaca pel color blanc, la cremositat i el sabor únic.</p>
  ${gFoto('queijo-ilha-dos-misterios','Queijo Ilha dos Mistérios — elaborat als prats volcànics de Pico')}

  ${gTitol('🌭','Embotits','embotits')}
  <p>Els embotits de les illes Açores es caracteritzen pel seu sabor rústic, intens i fumat. Destaquen la <em>morcela</em>, la <em>linguiça</em> i el tradicional <em>chouriço</em>. Aquests productes combinen a la perfecció amb els famosos formatges de la regió.</p>
  <p>La <em>morcela</em> és una botifarra negra dolça que conté espècies i un toc de sucre, i se serveix tradicionalment cuita o fregida acompanyada de rodanxes de pinya fresca de l'illa. La <em>linguiça</em> i el <em>chouriço</em> són embotits de porc adobats amb molt d'all, pebrot vermell dolç i vi local. Es diferencien dels continentals per un curat més llarg i un perfil més fumat. Són un ingredient estrella de l'emblemàtic <em>Cozido das Furnas</em>.</p>
  <p>També destaquen els <em>torresmos</em> (torreznos), típics a tota la regió. Se serveixen fregits i cruixents, sovint acompanyats amb inhame (un tubercle local).</p>
  ${gFoto('linguica','Linguiça — embotit de porc fumat, ingredient del Cozido das Furnas')}
  ${gFoto('torresmos','Torresmos — fregits i cruixents, acompanyats d\'inhame')}

  ${gTitol('🍷','Begudes','begudes')}
  <p>Una de les begudes més populars de les illes és la cervesa. Hi ha una marca local: <em>Especial</em>. És bona i bastant barata. El cafè també és imprescindible. Durant el dia, la gent prefereix el <em>Galão</em>, que es serveix en un vas amb abundant llet. Per la nit se sol prendre un cafè, comparable al expresso.</p>
  <p>Per descomptat, també elaboren vi d'excel·lent qualitat. Entre les marques més conegudes destaquen <em>Terras de Lava</em> (blanc) i <em>Basalto</em> (negre) de Pico, i <em>Terra do Conde</em> (blanc i negre) de Graciosa. El <em>Verdelho</em> (de Pico i la Graciosa) és el vi de postres més famós de les Açores.</p>
  <p>El <em>Chá dos Açores</em> és un dels productes més exclusius de la regió. Les Açores són una de les poques zones d'Europa on es cultiva te, i São Miguel és la illa principal productora. Té un sabor suau i característic degut a les condicions climàtiques i volcàniques de l'arxipèlag.</p>
  <p>El refresc escumós estrella de les Açores, <em>Kima</em>, està aromatitzat amb la deliciosa maracujà o fruita de la passió de l'illa. Se serveix normalment amb gel a l'estiu. Hi ha una mica de polpa, ja que s'utilitza fruita real, i tot i que té menys sucre que altres refrescos, Kima encara és força dolça amb un gust àcid.</p>
  ${gFoto('kima','Kima — el refresc estrella de les Açores, amb maracujà real')}

  ${gTitol('🌿','Altres productes típics','altres')}
  <p><strong>Inhame dos Açores</strong> — Els 'inhames' (nyams) són tubercles amb mides que oscil·len entre els 5 i els 10 cm de diàmetre. Té un sabor i textura similar al moniato. A les Açores és molt habitualment usat com a guarnició, en substitució de les patates.</p>
  ${gFoto('Inhame','Inhame dos Açores — tubercle local, substitut habitual de les patates')}
  <p><strong>Pimenta da terra</strong> — Pebrot vermell picant de São Miguel utilitzat en pràcticament tot. Normalment es conserva en sal i de vegades en vinagre. Sovint es mol fins a formar una pasta. Gairebé tots els plats utilitzen <em>pimenta da terra</em> d'alguna manera. És un dels ingredients més específics i populars de São Miguel.</p>

  ${gTitol('🍽️','Plats típics','plats')}
  <p class="gast-plats-intro">Una selecció dels plats que no us podeu perdre a les Açores:</p>
  <div class="gast-plats-grid">${platsHtml}</div>

  </div>`;
}

function gastScrollTo(id, ev) {
  if (ev) ev.preventDefault();
  const el = document.getElementById('gast-' + id);
  if (!el) return;
  const offset = 52 + 49 + 46;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ══════════════════════════════════════════════
   SECCIÓ: LA MALETA
   ══════════════════════════════════════════════ */
let _maletaInit = false;

function initMaleta() {
  _maletaInit = true;
  const wrap = document.getElementById('maletaContingut');
  if (!wrap) return;

  wrap.innerHTML = `<div class="mal-article">

  <p class="mal-intro">Per viatjar a les Açores, fes les maletes pensant que <em>"viuràs les quatre estacions en un sol dia"</em>. És possible despertar amb molta boira —que en realitat amaga el sol i el cel blau— i acabar el dia amb molta pluja i vent. La temperatura a l'agost va dels 19 als 25 graus. En ser un lloc amb humitat constant i molt de vent, podries sentir més fred o calor del que indica el termòmetre.</p>

  <section class="mal-seccio">
    <h3 class="mal-titol">👟 Roba i calçat tècnic</h3>
    <p>Opta per roba pràctica i fresca. La <strong>roba esportiva</strong> és molt recomanada tant pel seu confort com pel fet que s'asseca ràpidament en cas de pluja. Porta <strong>pantalons còmodes</strong> per caminar.</p>
    <p>Independentment de l'estació, una <strong>jaqueta paravents impermeable i amb caputxa</strong> és altament recomanada — potser sigui la peça més important de la maleta. No només et protegirà de les pluges que poden arribar en qualsevol moment, sinó també del vent fred molt comú a la regió.</p>
    <p>Porta <strong>calçat impermeable</strong>, ja siguin botes o bambes de trekking. Hi ha molts senders i camins que hauràs de recórrer per veure certs paisatges, i molts passen per llocs amb fang i relliscosos. El calçat còmode i antilliscant és ideal per a aquest viatge.</p>
  </section>

  <section class="mal-seccio">
    <h3 class="mal-titol">🩱 Roba i calçat de bany</h3>
    <p>Les famoses aigües termals ferruginoses (com les de Furnas) <strong>taquen la roba de bany clara de color taronja</strong>. Porta un <strong>banyador fosc o vell</strong> per a les termals, a més d'un altre per als banys a platges i piscines naturals.</p>
    <p>Porta <strong>escarpins o sandàlies d'aigua</strong> — a les Açores hi ha molts tolls i gorgs naturals de pedra volcànica i platges de pedres. Una <strong>tovallola de microfibra</strong> d'assecat ràpid també serà necessària per visitar les platges i piscines naturals.</p>
  </section>

  <section class="mal-seccio">
    <h3 class="mal-titol">🎒 Accessoris</h3>
    <ul class="mal-llista">
      <li><strong>Motxilla impermeable</strong> per portar aigua, l'impermeable, roba de recanvi i menjar per les excursions. Una ampolla reutilitzable o cantimplora és la millor opció per portar aigua.</li>
      <li><strong>Gorra o barret, protector solar i ulleres de sol</strong> — l'índex UV pot ser alt fins i tot en dies ennuvolats.</li>
      <li><strong>Prismàtics</strong> — un o dos per grup, de gran ajuda per les excursions d'avistament de cetacis.</li>
      <li>Fundes de plàstic hermètiques per protegir el mòbil els dies de pluja.</li>
      <li><strong>Kit de snorkel</strong> (màscara i tub) i càmera aquàtica — imprescindible si vols contemplar el fons marí.</li>
      <li><strong>Bateria portàtil</strong> si el teu mòbil es descarrega ràpid. Mínim 10.000 mAh, recomanable 20.000 mAh.</li>
    </ul>
  </section>

  <section class="mal-seccio">
    <h3 class="mal-titol">💊 Mini farmaciola bàsica</h3>
    <ul class="mal-llista">
      <li>Tirites i apòsits per a butllofes (<strong>Compeed</strong>)</li>
      <li>Analgèsics: <strong>paracetamol</strong> i <strong>ibuprofè</strong></li>
      <li>Crema per a cops (<strong>Thrombocid</strong>)</li>
      <li><strong>Pastilles per al mareig</strong> (<em>Biodramina</em> o similar) — imprescindible. Les carreteres de les illes fan moltes corbes i els trajectes amb barco poden ser molt moguts.</li>
      <li>Bon <strong>repel·lent de mosquits</strong></li>
    </ul>
  </section>

  </div>`;
}
