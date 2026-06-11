/* ============================================================
   MAPES.JS · Açores 2026
   ============================================================ */
'use strict';

/* ══════════════════════════════════════════════════════════════
   1. CONSTANTS
══════════════════════════════════════════════════════════════ */
const MP_ILLA_COLOR = { sm: '#6abf70', pi: '#a8a8a8', sj: '#c4895a', fa: '#5fa8e8' };
const MP_ILLA_NOM   = { sm: 'São Miguel', pi: 'Pico', sj: 'São Jorge', fa: 'Faial' };
const MP_ILLA_EMO   = { sm: '🌋', pi: '⛰️', sj: '🏔️', fa: '⚓' };

/* ── Tile layers ── */
const MP_TILES = {
  voyager:  () => L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',         { attribution:'© OpenStreetMap © CARTO', maxZoom:19 }),
  clar:     () => L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',                   { attribution:'© OpenStreetMap © CARTO', maxZoom:19 }),
  topo:     () => L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',                              { attribution:'© OpenStreetMap © OpenTopoMap', maxZoom:17 }),
  satellit: () => L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution:'© Esri', maxZoom:19 }),
};

/* ══════════════════════════════════════════════════════════════
   2. HARDCODED COORDS (no coords in source data)
══════════════════════════════════════════════════════════════ */
const MP_ALLOTJAMENTS_DATA = [
  { nom: 'Santo Cristo House',             illa:'sm', coords:[37.74239,-25.67375], localitat:'Ponta Delgada',       tipus:'Casa sencera', entrada:'22 jul', sortida:'24 jul',  url:'allotjament.html' },
  { nom: 'Casa Cherimoya — Retreat by the Sea', illa:'sm', coords:[37.71835,-25.40934], localitat:'Ribeira das Tainhas', tipus:'Casa sencera', entrada:'24 jul', sortida:'28 jul',  url:'allotjament.html' },
  { nom: 'Prainha Apartments',             illa:'pi', coords:[38.46080,-28.19204], localitat:'São Roque do Pico',  tipus:'Apartament',   entrada:'28 jul', sortida:'31 jul',  url:'allotjament.html' },
  { nom: 'Refúgio',                        illa:'fa', coords:[38.52492,-28.68057], localitat:'Horta (Feteira)',    tipus:'Casa sencera', entrada:'31 jul', sortida:'2 ago',   url:'allotjament.html' },
];

const MP_RESERVES_COORDS = {
  'Montanha do Pico':              { illa:'pi', coords:[38.4699, -28.4020] },
  'Gruta do Carvão':               { illa:'sm', coords:[37.7494, -25.6733] },
  'Gruta das Torres':              { illa:'pi', coords:[38.4726, -28.4214] },
  'Caldeira Velha':                { illa:'sm', coords:[37.7845, -25.5010] },
  'Poça da Dona Beija':            { illa:'sm', coords:[37.7720, -25.3940] },
  'Parque Terra Nostra':           { illa:'sm', coords:[37.7726, -25.3156] },
  'Ilhéu de Vila Franca do Campo': { illa:'sm', coords:[37.7062, -25.4289] },
  'Lagoa do Fogo':                 { illa:'sm', coords:[37.7626, -25.4743] },
};

const MP_EXC_CETACIS_COORDS = {
  'Ponta Delgada':       { illa:'sm', coords:[37.7422, -25.6686] },
  'Vila Franca do Campo':{ illa:'sm', coords:[37.7171, -25.4328] },
  'Rabo de Peixe':       { illa:'sm', coords:[37.7884, -25.5575] },
  'Lajes do Pico':       { illa:'pi', coords:[38.3975, -28.2542] },
  'Madalena':            { illa:'pi', coords:[38.5358, -28.5278] },
  'Horta':               { illa:'fa', coords:[38.5313, -28.6253] },
};

const MP_EXC_BARCO_LLOCS = [
  { nom:'Vila Franca do Campo', illa:'sm', coords:[37.7171,-25.4328], desc:'Principal centre de passejos amb barco. Accés a l\'illot volcànic, barco de fons de vidre i passejos al capvespre.' },
  { nom:'Rabo de Peixe',        illa:'sm', coords:[37.7884,-25.5575], desc:'Port de pescadors amb sortides per la costa nord cap a Porto Formoso.' },
  { nom:'Porto Formoso',        illa:'sm', coords:[37.8003,-25.4799], desc:'Excursions en speedboat per la badia. Passejos per penya-segats de la costa nord.' },
];

const MP_EXC_ESTRELLES_COORDS = {
  'Lagoa do Fogo':                       { illa:'sm', coords:[37.7626, -25.4743] },
  'Miradouro del Pico do Carvão':        { illa:'sm', coords:[37.8047, -25.5230] },
  'Nordeste — Pico do Bartolomeu':       { illa:'sm', coords:[37.8196, -25.1719] },
  'Casa da Montanha':                    { illa:'pi', coords:[38.4699, -28.4020] },
  'Planalto Central — Lagoa do Capitão': { illa:'pi', coords:[38.4715, -28.3620] },
  'Miradouro da Caldeira':               { illa:'fa', coords:[38.5820, -28.7060] },
  'Vulcão dos Capelinhos':               { illa:'fa', coords:[38.6020, -28.8317] },
};

/* ── ME_ACTIVITATS.tipus → layer id ── */
const AVENT_TIPUS_ID = {
  'Barranquisme':      'avent_barranquisme',
  'Snorkel':           'avent_snorkel',
  'Bici':              'avent_bici',
  'Kayak o Paddle Surf':'avent_kayak',
  'Busseig':           'avent_busseig',
  'Coasteering':       'avent_coasteering',
  'Nedar amb dofins':  'avent_dofins',
  'Escalada':          'avent_escalada',
  'Surf':              'avent_surf',
  'Moto aquàtica':     'avent_moto',
};

/* ── Category emoji map ── */
const CAT_EMOJI = {
  miradors:'🔭', piscines:'🏊', platges:'🏖️',
  nat_paisatge:'🏞️', nat_llacs:'💧', nat_geologia:'🌋', nat_salts:'💦',
  aigues_termals:'♨️', coves:'🕳️', fars:'🗼', jardins:'🌺', pobles:'🏘️', altres_llocs:'📌',
};

/* ══════════════════════════════════════════════════════════════
   3. LAYER CONFIGURATION
══════════════════════════════════════════════════════════════ */
const LAYER_CFG = [
  { grup:'⭐ Essencials', open:true, items:[
    { id:'imprescindibles', label:'Imprescindibles',   emoji:'🏆', n:24,  on:true },
    { id:'restaurants',     label:'Restaurants',       emoji:'🍽️', n:113 },
    { id:'allotjaments',    label:'Allotjaments',      emoji:'🏠', n:4,   on:true },
  ]},
  { grup:'📍 Llocs d\'interès', open:false, items:[
    { id:'miradors',      label:'Miradors',            emoji:'🔭', n:91 },
    { id:'piscines',      label:'Piscines naturals',   emoji:'🏊', n:39 },
    { id:'platges',       label:'Platges',             emoji:'🏖️', n:21 },
    { id:'naturalesa',    label:'Naturalesa',          emoji:'🌿', n:84, type:'parent', children:['nat_paisatge','nat_llacs','nat_geologia','nat_salts'] },
    { id:'nat_paisatge',  label:'— Paisatge',          emoji:'🏞️', n:47, indent:true },
    { id:'nat_llacs',     label:'— Llacs',             emoji:'💧', n:15, indent:true },
    { id:'nat_geologia',  label:'— Geologia',          emoji:'🌋', n:13, indent:true },
    { id:'nat_salts',     label:'— Salts d\'aigua',    emoji:'💦', n:9,  indent:true },
    { id:'aigues_termals',label:'Aigues Termals',      emoji:'♨️', n:5  },
    { id:'coves',         label:'Coves',               emoji:'🕳️', n:3  },
    { id:'fars',          label:'Fars',                emoji:'🗼', n:6  },
    { id:'jardins',       label:'Jardins Botànics',    emoji:'🌺', n:7  },
    { id:'pobles',        label:'Pobles',              emoji:'🏘️', n:30 },
    { id:'altres_llocs',  label:'Altres llocs',        emoji:'📌', n:19 },
  ]},
  { grup:'🧗 Aventura', open:false, items:[
    { id:'avent_barranquisme', label:'Barranquisme',       emoji:'🏞️' },
    { id:'avent_snorkel',      label:'Snorkel',            emoji:'🤿' },
    { id:'avent_bici',         label:'Bici de muntanya',   emoji:'🚴' },
    { id:'avent_kayak',        label:'Kayak / Paddle Surf',emoji:'🚣' },
    { id:'avent_busseig',      label:'Busseig',            emoji:'🤿' },
    { id:'avent_coasteering',  label:'Coasteering',        emoji:'🌊' },
    { id:'avent_dofins',       label:'Nedar amb dofins',   emoji:'🐬' },
    { id:'avent_escalada',     label:'Escalada',           emoji:'🧗' },
    { id:'avent_surf',         label:'Surf',               emoji:'🏄' },
    { id:'avent_moto',         label:'Moto aquàtica',      emoji:'🚤' },
  ]},
  { grup:'⛵ Excursions', open:false, items:[
    { id:'exc_cetacis',   label:'Avistament Cetacis',    emoji:'🐋' },
    { id:'exc_barco',     label:'Passeig amb Barco',     emoji:'⛵' },
    { id:'exc_estrelles', label:'Observació Estrelles',  emoji:'🌟' },
  ]},
  { grup:'🗂️ Més', open:false, items:[
    { id:'senderisme', label:'Senderisme (inici rutes)', emoji:'🥾', n:32 },
    { id:'reserves',   label:'Reserves obligatòries',   emoji:'🎯', n:8  },
  ]},
];

/* ══════════════════════════════════════════════════════════════
   4. STATE
══════════════════════════════════════════════════════════════ */
let mpMap       = null;
let mpTileLayer = null;
let mpState     = { illa: null };       // null = all islands
let mpActive    = new Set();            // active layer IDs
let LGROUPS     = {};                   // id → L.layerGroup()
let MDATA       = {};                   // id → { inited, markers:[{illa,lat,lng,marker}] }

/* ══════════════════════════════════════════════════════════════
   5. HELPERS
══════════════════════════════════════════════════════════════ */
function normalIlla(s) {
  if (!s) return null;
  const l = String(s).toLowerCase().trim();
  if (l === 'sm' || l.includes('miguel')) return 'sm';
  if (l === 'sj' || l.includes('jorge'))  return 'sj';
  if (l === 'pi' || l === 'pico')         return 'pi';
  if (l === 'fa' || l.includes('faial'))  return 'fa';
  return null;
}

function parseCoordsStr(s) {
  const parts = String(s).split(',').map(parseFloat);
  return [parts[0], parts[1]];
}

function mkDivIcon(emoji, color, size = 26, star = false) {
  const cls = star ? 'mp-mkr mp-mkr-star' : 'mp-mkr';
  return L.divIcon({
    html: `<div class="${cls}" style="--c:${color};--s:${size}px">${emoji}</div>`,
    className: '',
    iconSize:   [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor:[0, -(size / 2 + 4)],
  });
}

function addMkr(id, coords, illa, emoji, info, size = 24, star = false) {
  if (!coords || isNaN(coords[0]) || isNaN(coords[1])) return;
  const color = MP_ILLA_COLOR[illa] || '#888';
  const m = L.marker(coords, { icon: mkDivIcon(emoji, color, size, star) });
  m.bindPopup(
    `<div class="mp-popup-nom">${emoji} ${info.title}</div>` +
    (info.sub ? `<div class="mp-popup-sub">${info.sub}</div>` : ''),
    { closeButton: false, offset: [0, -4] }
  );
  m.on('click', () => { showInfo(info); mpMap.closePopup(); });
  m.on('mouseover', function() { this.openPopup(); });
  m.on('mouseout', function() { this.closePopup(); });
  if (!MDATA[id]) MDATA[id] = { inited: false, markers: [] };
  MDATA[id].markers.push({ illa, lat: coords[0], lng: coords[1], marker: m });
}

/* ══════════════════════════════════════════════════════════════
   6. LAYER BUILDERS
══════════════════════════════════════════════════════════════ */
function buildLayer(id) {
  if (!MDATA[id]) MDATA[id] = { inited: false, markers: [] };
  if (MDATA[id].inited) return;
  MDATA[id].inited = true;

  if (id === 'imprescindibles') {
    for (const it of (IMPRESCINDIBLES || [])) {
      const illa = normalIlla(it.illa);
      addMkr(id, it.coords, illa, it.emoji || '🏆',
        { title: it.nom, sub: MP_ILLA_NOM[illa] || '', capa:'Imprescindibles', capaEmoji:'🏆', illa,
          desc: it.desc, links: (it.links||[]).map(l=>({text:l.text,url:l.url})),
          url:'imprescindibles.html' },
        30, true);
    }
    return;
  }

  if (id === 'restaurants') {
    const RMAP = { faial:'fa', pico:'pi', sj:'sj', sm:'sm' };
    for (const r of (RESTAURANTS || [])) {
      if (!r.lat || !r.lon) continue;
      const illa = RMAP[r.illa] || null;
      const links = [
        r.google_maps && { text:'Google Maps', url:r.google_maps },
        r.web          && { text:'Web',         url:r.web },
        r.tripadvisor  && { text:'TripAdvisor', url:r.tripadvisor },
      ].filter(Boolean);
      addMkr(id, [r.lat, r.lon], illa, '🍽️',
        { title: r.nom, sub: (r.localitat || '') + (r.preu_google ? ` · ${r.preu_google}` : ''),
          capa:'Restaurants', capaEmoji:'🍽️', illa,
          desc: (r.cuines||[]).join(', ') + (r.horari ? `\n${r.horari}` : ''),
          links, url:'restaurants.html' },
        22);
    }
    return;
  }

  if (id === 'allotjaments') {
    for (const a of MP_ALLOTJAMENTS_DATA) {
      addMkr(id, a.coords, a.illa, '🏠',
        { title: a.nom, sub: `${MP_ILLA_NOM[a.illa]||''} · ${a.localitat}`,
          capa:'Allotjaments', capaEmoji:'🏠', illa:a.illa,
          desc: `${a.tipus} · ${a.entrada} → ${a.sortida}`,
          links: [], url: a.url },
        28);
    }
    return;
  }

  // ME_LLOCS categories
  const ME_CAT_MAP = {
    miradors:     { cat:'Miradors',      sub:null },
    piscines:     { cat:'Piscines',      sub:null },
    platges:      { cat:'Platges',       sub:null },
    nat_paisatge: { cat:'Naturalesa',    sub:'Paisatge' },
    nat_llacs:    { cat:'Naturalesa',    sub:'Llacs' },
    nat_geologia: { cat:'Naturalesa',    sub:'Geologia' },
    nat_salts:    { cat:'Naturalesa',    sub:"Salts d'aigua" },
    aigues_termals:{ cat:'Aigues Termals', sub:null },
    coves:        { cat:'Coves',         sub:null },
    fars:         { cat:'Fars',          sub:null },
    jardins:      { cat:'Jardi Botanic', sub:null },
    pobles:       { cat:'Pobles',        sub:null },
    altres_llocs: { cat:'Altres',        sub:null },
  };
  if (ME_CAT_MAP[id]) {
    const { cat, sub } = ME_CAT_MAP[id];
    const emo = CAT_EMOJI[id] || '📌';
    for (const loc of (ME_LLOCS || [])) {
      if (loc.categoria !== cat) continue;
      if (sub && loc.subcat !== sub) continue;
      const coords = parseCoordsStr(loc.coords);
      const illa = normalIlla(loc.illa);
      const links = (loc.links||[]).map(url => ({ text:'Més info', url }));
      addMkr(id, coords, illa, emo,
        { title:loc.nom, sub: `${MP_ILLA_NOM[illa]||''} · ${loc.zona||''}`,
          capa: sub ? `Naturalesa – ${sub}` : cat, capaEmoji: emo, illa, zona:loc.zona,
          desc: loc.desc, links, url:'material-extra.html' });
    }
    return;
  }

  if (id === 'reserves') {
    for (const r of (ME_RESERVES || [])) {
      const cd = MP_RESERVES_COORDS[r.nom];
      if (!cd) continue;
      addMkr(id, cd.coords, cd.illa, '🎯',
        { title:r.nom, sub: MP_ILLA_NOM[cd.illa]||'',
          capa:'Reserves', capaEmoji:'🎯', illa:cd.illa,
          desc: r.desc.length > 220 ? r.desc.substring(0,220)+'…' : r.desc,
          links: (r.links||[]).map(url=>({text:'Reserva',url})),
          url: r.anchor ? `material-extra.html#${r.anchor}` : 'material-extra.html' },
        28);
    }
    return;
  }

  if (id === 'senderisme') {
    const SILLA = { 'Faial':'fa', 'Pico':'pi', 'Sao Jorge':'sj', 'Sao Miguel':'sm' };
    for (const r of (ME_RUTES_SENDERISME || [])) {
      const coords = r.coords_inici || r.start;
      if (!coords) continue;
      const illa = SILLA[r.illa] || normalIlla(r.illa);
      const links = [
        r.visitazores && { text:'VisitAzores', url:r.visitazores },
        r.wikiloc     && { text:'Wikiloc',     url:r.wikiloc },
        r.fullet      && { text:'PDF',         url:r.fullet },
      ].filter(Boolean);
      addMkr(id, coords, illa, '🥾',
        { title:r.nom, sub:`${r.codi} · ${r.km} km · ${r.dificultat}`,
          capa:'Senderisme', capaEmoji:'🥾', illa,
          desc:`${r.km} km · D+ ${r.dp||0}m · ${r.dificultat} · ${r.temps||''}`,
          links, url:'material-extra.html' });
    }
    return;
  }

  if (id === 'exc_cetacis') {
    for (const lloc of ((ME_EXCURSIONS||{}).cetacis||{}).llocs||[]) {
      const cd = MP_EXC_CETACIS_COORDS[lloc.nom];
      if (!cd) continue;
      addMkr(id, cd.coords, cd.illa, '🐋',
        { title:lloc.nom, sub: MP_ILLA_NOM[cd.illa]||'',
          capa:'Avistament Cetacis', capaEmoji:'🐋', illa:cd.illa,
          desc: lloc.desc, links:(lloc.links||[]).map(url=>({text:'Empresa',url})),
          url:'material-extra.html' },
        28);
    }
    return;
  }

  if (id === 'exc_barco') {
    for (const lloc of MP_EXC_BARCO_LLOCS) {
      addMkr(id, lloc.coords, lloc.illa, '⛵',
        { title:lloc.nom, sub: MP_ILLA_NOM[lloc.illa]||'',
          capa:'Passeig amb Barco', capaEmoji:'⛵', illa:lloc.illa,
          desc: lloc.desc, links:[{text:'Veure activitats',url:'material-extra.html'}],
          url:'material-extra.html' },
        26);
    }
    return;
  }

  if (id === 'exc_estrelles') {
    for (const lloc of ((ME_EXCURSIONS||{}).estrelles||{}).llocs||[]) {
      const cd = MP_EXC_ESTRELLES_COORDS[lloc.nom];
      if (!cd) continue;
      addMkr(id, cd.coords, cd.illa, '🌟',
        { title:lloc.nom, sub: MP_ILLA_NOM[cd.illa]||'',
          capa:'Observació Estrelles', capaEmoji:'🌟', illa:cd.illa,
          desc: lloc.desc || '', links:[],
          url:'material-extra.html' },
        26);
    }
    return;
  }

  // Aventura
  if (id.startsWith('avent_')) {
    const tipus = Object.entries(AVENT_TIPUS_ID).find(([,v])=>v===id)?.[0];
    if (!tipus) return;
    const act = (ME_ACTIVITATS||[]).find(a=>a.tipus===tipus);
    if (!act) return;
    for (const lloc of (act.llocs||[])) {
      const coords = parseCoordsStr(lloc.coords);
      const illa = normalIlla(lloc.illa);
      addMkr(id, coords, illa, act.emoji || '🧗',
        { title: lloc.lloc, sub:`${act.tipus} · ${MP_ILLA_NOM[illa]||''}`,
          capa: act.tipus, capaEmoji: act.emoji||'🧗', illa,
          desc:`Zona d'aventura: ${act.tipus}`,
          links:[{text:'Veure activitats',url:'material-extra.html'}],
          url:'material-extra.html' },
        24);
    }
  }
}

/* ══════════════════════════════════════════════════════════════
   7. LAYER TOGGLE & ISLAND FILTER
══════════════════════════════════════════════════════════════ */
function mpRefreshLayer(id) {
  const grp = LGROUPS[id];
  const data = MDATA[id];
  if (!grp || !data) return;
  grp.clearLayers();
  for (const { illa, marker } of data.markers) {
    if (!mpState.illa || illa === mpState.illa) {
      grp.addLayer(marker);
    }
  }
}

function mpToggleLayer(id, on) {
  const grp = LGROUPS[id];
  if (on) {
    mpActive.add(id);
    buildLayer(id);
    mpRefreshLayer(id);
    if (!mpMap.hasLayer(grp)) mpMap.addLayer(grp);
  } else {
    mpActive.delete(id);
    if (mpMap.hasLayer(grp)) mpMap.removeLayer(grp);
  }
}

function mpSetIlla(code) {
  mpState.illa = code || null;
  document.querySelectorAll('.mp-illa-btn').forEach(b => {
    b.classList.toggle('active', (b.dataset.illa || '') === (code || ''));
  });
  mpActive.forEach(id => mpRefreshLayer(id));
}

/* ══════════════════════════════════════════════════════════════
   8. INFO PANEL
══════════════════════════════════════════════════════════════ */
function showInfo(info) {
  const panel = document.getElementById('mp-info');
  const head  = document.getElementById('mp-info-head-capa');
  const body  = document.getElementById('mp-info-body');
  if (!panel) return;

  const illaColor = MP_ILLA_COLOR[info.illa] || '#6aab7a';
  const illaNom   = info.illa ? MP_ILLA_NOM[info.illa]   : '';
  const illaEmo   = info.illa ? MP_ILLA_EMO[info.illa]   : '';

  head.textContent = `${info.capaEmoji || ''} ${info.capa || ''}`;

  body.innerHTML = `
    <h3 class="mp-info-nom">${info.emoji||''} ${info.title}</h3>
    <div class="mp-info-badges">
      ${illaNom ? `<span class="mp-badge" style="background:${illaColor}25;color:${illaColor};border-color:${illaColor}50">${illaEmo} ${illaNom}</span>` : ''}
      ${info.zona ? `<span class="mp-badge-zona">${info.zona}</span>` : ''}
      ${info.sub && !info.zona ? `<span class="mp-badge-zona">${info.sub}</span>` : ''}
    </div>
    ${info.desc ? `<p class="mp-info-desc">${info.desc.replace(/\n/g,'<br>')}</p>` : ''}
    <div class="mp-info-actions">
      ${info.url ? `<a href="${info.url}" class="mp-info-btn-main">Veure detalls →</a>` : ''}
    </div>
    ${(info.links||[]).length ? `
      <div class="mp-info-links">
        ${info.links.map(l=>`<a href="${l.url}" target="_blank" rel="noopener" class="mp-info-link">${l.text}</a>`).join('')}
      </div>` : ''}
  `;

  panel.classList.add('open');
}

function hideInfo() {
  document.getElementById('mp-info')?.classList.remove('open');
}

/* ══════════════════════════════════════════════════════════════
   9. PANEL BUILD
══════════════════════════════════════════════════════════════ */
function buildPanel() {
  const body = document.getElementById('mp-panel-body');
  if (!body) return;
  let html = '';

  for (const grup of LAYER_CFG) {
    const openClass = grup.open ? 'open' : '';
    html += `<div class="mp-grup ${openClass}">`;
    html += `<button class="mp-grup-title mp-grup-toggle">
               <span class="mp-grup-lbl">${grup.grup}</span>
               <span class="mp-grup-arrow">▼</span>
             </button>`;
    html += `<div class="mp-grup-items" ${grup.open ? '' : 'style="display:none"'}>`;

    for (const it of grup.items) {
      if (it.type === 'parent') {
        // Parent checkbox (naturalesa) with tri-state
        html += `
          <label class="mp-layer-item mp-layer-parent" data-parent="${it.id}">
            <input type="checkbox" id="cb-${it.id}" data-parent-id="${it.id}" data-children="${it.children.join(',')}" onchange="mpOnParentChange(this)">
            <span class="mp-layer-emo">${it.emoji}</span>
            <span class="mp-layer-nom">${it.label}</span>
            ${it.n ? `<span class="mp-layer-n">${it.n}</span>` : ''}
          </label>`;
        continue;
      }
      const indent = it.indent ? 'mp-layer-indent' : '';
      html += `
        <label class="mp-layer-item ${indent}">
          <input type="checkbox" id="cb-${it.id}" data-id="${it.id}" ${it.on ? 'checked' : ''} onchange="mpOnLayerChange(this)">
          <span class="mp-layer-emo">${it.emoji}</span>
          <span class="mp-layer-nom">${it.label}</span>
          ${it.n ? `<span class="mp-layer-n">${it.n}</span>` : ''}
        </label>`;
    }

    html += `</div></div>`;
  }

  body.innerHTML = html;

  // Group toggle click
  body.querySelectorAll('.mp-grup-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const grup = btn.closest('.mp-grup');
      const items = grup.querySelector('.mp-grup-items');
      const open  = grup.classList.toggle('open');
      items.style.display = open ? '' : 'none';
    });
  });
}

/* ── Parent checkbox (naturalesa) ── */
function mpOnParentChange(cb) {
  const children = cb.dataset.children.split(',');
  children.forEach(cid => {
    const child = document.getElementById(`cb-${cid}`);
    if (child) {
      child.checked = cb.checked;
      mpToggleLayer(cid, cb.checked);
    }
  });
}

function mpUpdateParent(parentId) {
  const cb = document.getElementById(`cb-${parentId}`);
  if (!cb) return;
  const children = cb.dataset.children.split(',');
  const checked  = children.filter(cid => document.getElementById(`cb-${cid}`)?.checked).length;
  cb.indeterminate = checked > 0 && checked < children.length;
  cb.checked = checked === children.length;
}

/* ── Layer checkbox ── */
function mpOnLayerChange(cb) {
  const id = cb.dataset.id;
  mpToggleLayer(id, cb.checked);
  // Update parent if it's a naturalesa child
  const parent = document.querySelector(`input[data-children*="${id}"]`);
  if (parent) mpUpdateParent(parent.dataset.parentId);
}

/* ══════════════════════════════════════════════════════════════
   10. MAP CONTROLS
══════════════════════════════════════════════════════════════ */
function mpFitAll() {
  const bounds = [];
  mpActive.forEach(id => {
    (MDATA[id]?.markers || []).forEach(({ illa, lat, lng }) => {
      if (!mpState.illa || illa === mpState.illa) bounds.push([lat, lng]);
    });
  });
  if (bounds.length) {
    mpMap.fitBounds(L.latLngBounds(bounds), { padding: [30, 30], maxZoom: 14 });
  } else {
    mpMap.setView([38.2, -27.0], 8);
  }
}

function mpGeolocate() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(pos => {
    const ll = [pos.coords.latitude, pos.coords.longitude];
    L.circleMarker(ll, { radius:8, color:'#fff', weight:2, fillColor:'#3b82f6', fillOpacity:1 })
      .addTo(mpMap)
      .bindPopup('📍 La teva posició')
      .openPopup();
    mpMap.setView(ll, 13);
  }, () => alert('No s\'ha pogut obtenir la ubicació.'));
}

function mpSetBasemap(key) {
  if (mpTileLayer) mpMap.removeLayer(mpTileLayer);
  mpTileLayer = MP_TILES[key]();
  mpTileLayer.addTo(mpMap);
  mpTileLayer.bringToBack();
}

/* ══════════════════════════════════════════════════════════════
   11. PANEL TOGGLE
══════════════════════════════════════════════════════════════ */
function mpTogglePanel() {
  const panel   = document.getElementById('mp-panel');
  const togBtn  = document.getElementById('mp-panel-toggle');
  if (!panel) return;
  const hidden = panel.classList.toggle('hidden');
  togBtn.style.display = hidden ? 'flex' : 'none';
}

/* ══════════════════════════════════════════════════════════════
   12. INIT
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  /* ── Map ── */
  mpMap = L.map('mp-map', {
    center: [38.2, -27.0],
    zoom: 8,
    zoomControl: true,
  });
  mpTileLayer = MP_TILES.voyager();
  mpTileLayer.addTo(mpMap);

  /* ── Layer groups ── */
  LAYER_CFG.forEach(g => g.items.forEach(it => {
    if (it.type !== 'parent') LGROUPS[it.id] = L.layerGroup();
  }));

  /* ── Build panel ── */
  buildPanel();

  /* ── Default layers ── */
  LAYER_CFG.forEach(g => g.items.forEach(it => {
    if (it.on) mpToggleLayer(it.id, true);
  }));

  /* ── Island filter pills ── */
  document.querySelectorAll('.mp-illa-btn').forEach(btn => {
    btn.addEventListener('click', () => mpSetIlla(btn.dataset.illa));
  });

  /* ── Panel toggle ── */
  document.getElementById('mp-panel-toggle')?.addEventListener('click', mpTogglePanel);
  document.getElementById('mp-panel-close')?.addEventListener('click', mpTogglePanel);

  /* ── Info close ── */
  document.getElementById('mp-info-close')?.addEventListener('click', hideInfo);
  document.getElementById('mp-map')?.addEventListener('click', e => {
    if (e.target.id === 'mp-map' || e.target.classList.contains('leaflet-container')) hideInfo();
  });

  /* ── Controls ── */
  document.getElementById('mp-fit')?.addEventListener('click', mpFitAll);
  document.getElementById('mp-geo')?.addEventListener('click', mpGeolocate);
  document.getElementById('mp-basemap')?.addEventListener('change', e => mpSetBasemap(e.target.value));

  /* ── Hide loading ── */
  const loading = document.getElementById('mp-loading');
  if (loading) { loading.classList.add('hidden'); setTimeout(()=>loading.remove(), 500); }

  /* ── Fit default layers ── */
  setTimeout(mpFitAll, 200);
});
