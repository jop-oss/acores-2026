/* ============================================================
   MAPES.JS · Açores 2026 · v3
   Millores: varis amb subcategories, senderisme tracks GPX,
   zoom automàtic per illa, favorits, mostra/treu tot
   ============================================================ */
'use strict';

/* ══════════════════════════════════════════════════════════════
   1. CONSTANTS VISUALS
══════════════════════════════════════════════════════════════ */
const MP_ILLA_COLOR = { sm:'#6abf70', pi:'#a8a8a8', sj:'#c4895a', fa:'#5fa8e8' };
const MP_ILLA_NOM   = { sm:'São Miguel', pi:'Pico', sj:'São Jorge', fa:'Faial' };
const MP_ILLA_EMO   = { sm:'🌋', pi:'⛰️', sj:'🏔️', fa:'⚓' };

/* Bounding boxes per fer zoom automàtic a cada illa */
const MP_ILLA_BOUNDS = {
  sm: [[37.64, -25.88], [37.90, -25.08]],
  pi: [[38.37, -28.58], [38.58, -28.01]],
  sj: [[38.58, -28.30], [38.79, -27.77]],
  fa: [[38.50, -28.90], [38.66, -28.51]],
};

const MP_TILES = {
  voyager:  () => L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',         { attribution:'© OpenStreetMap © CARTO', maxZoom:19 }),
  clar:     () => L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',                   { attribution:'© OpenStreetMap © CARTO', maxZoom:19 }),
  topo:     () => L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',                              { attribution:'© OpenStreetMap © OpenTopoMap', maxZoom:17 }),
  satellit: () => L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution:'© Esri', maxZoom:19 }),
};

/* ══════════════════════════════════════════════════════════════
   2. MAPATGES DE CAPES
══════════════════════════════════════════════════════════════ */

/* cat/sub exactes de llocs-data.js */
const LLOC_FILTERS = {
  miradors:  { cat:'Miradors',      sub: null                },
  bany_pis:  { cat:'Zona de bany',  sub:'Piscines Naturals'  },
  bany_pla:  { cat:'Zona de bany',  sub:'Platges'            },
  bany_ter:  { cat:'Zona de bany',  sub:'Aigüe\u0073 termals'},
  nat_pai:   { cat:'Naturalesa',    sub:'Paisatge'           },
  nat_lla:   { cat:'Naturalesa',    sub:'Llacs'              },
  nat_geo:   { cat:'Naturalesa',    sub:'Geologia'           },
  nat_sal:   { cat:'Naturalesa',    sub:"Salts d'aigua"      },
  nat_cov:   { cat:'Naturalesa',    sub:'Coves'              },
  nat_jar:   { cat:'Naturalesa',    sub:"Jard\u00ed bot\u00e0nic" },
  pobles:    { cat:'Poble/Ciutat',  sub: null                },
  varis_far: { cat:'Varis',         sub:'Fars'               },
  varis_pla: { cat:'Varis',         sub:'Plantacions'        },
  varis_cur: { cat:'Varis',         sub:'Curiositats'        },
  varis_mol: { cat:'Varis',         sub:'Molins'             },
  varis_alt: { cat:'Varis',         sub:'Altres'             },
};

/* sub de AVENTURA per cada layer id */
const AVENT_LAYER_TO_SUB = {
  avent_barranquisme: 'Barranquisme',
  avent_snorkel:      'Snorkel',
  avent_bici:         'Bici',
  avent_kayak:        'Kayak o Paddle Surf',
  avent_busseig:      'Busseig',
  avent_coasteering:  'Coasteering',
  avent_dofins:       'Nedar amb dofins',
  avent_escalada:     'Escalada',
  avent_surf:         'Surf',
  avent_moto:         'Moto aqu\u00e0tica',
};

/* Bandes de puntuacio global (punt_p) per als filtres de Restaurants */
const REST_BAND_FILTERS = {
  rest_45:   { min: 4.5,        max: Infinity },
  rest_40:   { min: 4.0,        max: 4.4999   },
  rest_lt40: { min: -Infinity,  max: 3.9999   },
};

/* ══════════════════════════════════════════════════════════════
   3. CONFIGURACIO DE CAPES
══════════════════════════════════════════════════════════════ */
const LAYER_CFG = [
  { grup:'Essencials', open:true, items:[
    { id:'imprescindibles', label:'Imprescindibles', emoji:'🏆', n:24, on:true },
    { id:'allotjaments',    label:'Allotjaments',     emoji:'🏠', n:4,  on:true },
  ]},
  { grup:"Llocs d'interès", open:false, items:[
    { id:'miradors',    label:'Miradors',            emoji:'🔭', n:92 },
    { id:'bany',        label:'Zones de bany',       emoji:'🏊', n:65,  type:'parent', children:['bany_pis','bany_pla','bany_ter'] },
    { id:'bany_pis',    label:'— Piscines naturals', emoji:'🏊', n:39,  indent:true },
    { id:'bany_pla',    label:'— Platges',           emoji:'🏖️', n:21,  indent:true },
    { id:'bany_ter',    label:'— Aigües termals',    emoji:'♨️', n:5,   indent:true },
    { id:'naturalesa',  label:'Naturalesa',          emoji:'🌿', n:103, type:'parent', children:['nat_pai','nat_lla','nat_geo','nat_sal','nat_cov','nat_jar'] },
    { id:'nat_pai',     label:'— Paisatge',          emoji:'⛰️', n:49,  indent:true },
    { id:'nat_lla',     label:'— Llacs',             emoji:'🏞️', n:19,  indent:true },
    { id:'nat_geo',     label:'— Geologia',          emoji:'🌋', n:14,  indent:true },
    { id:'nat_sal',     label:"— Salts d'aigua",     emoji:'💦', n:9,   indent:true },
    { id:'nat_cov',     label:'— Coves',             emoji:'🕳️', n:3,   indent:true },
    { id:'nat_jar',     label:'— Jardí botànic',     emoji:'🌺', n:9,   indent:true },
    { id:'pobles',      label:'Pobles i ciutats',    emoji:'🏘️', n:31 },
    { id:'varis',       label:'Varis',               emoji:'📍', n:25,  type:'parent', children:['varis_far','varis_pla','varis_cur','varis_mol','varis_alt'] },
    { id:'varis_far',   label:'— Fars',              emoji:'🔦', n:7,   indent:true },
    { id:'varis_pla',   label:'— Plantacions',       emoji:'🌳', n:4,   indent:true },
    { id:'varis_cur',   label:'— Curiositats',       emoji:'🤔', n:5,   indent:true },
    { id:'varis_mol',   label:'— Molins',            emoji:'⚙️', n:3,   indent:true },
    { id:'varis_alt',   label:'— Altres',            emoji:'🌀', n:6,   indent:true },
  ]},
  { grup:'Excursions', open:false, items:[
    { id:'exc_cetacis',   label:'Avistament de cetacis',     emoji:'🐋' },
    { id:'exc_barco',     label:'Passeig amb vaixell/llanxa', emoji:'⛵' },
    { id:'exc_estrelles', label:"Observació d'estrelles",     emoji:'✨' },
    /* Senderisme: item especial amb radio buttons inici/track */
    { id:'senderisme', label:'Senderisme', emoji:'🥾', n:32, type:'senderisme' },
  ]},
  { grup:'Aventura', open:false, items:[
    { id:'avent_barranquisme', label:'Barranquisme',        emoji:'🦘' },
    { id:'avent_snorkel',      label:'Snorkel',             emoji:'🤿' },
    { id:'avent_bici',         label:'Bici de muntanya',    emoji:'🚴' },
    { id:'avent_kayak',        label:'Kayak / Paddle Surf', emoji:'🚣' },
    { id:'avent_busseig',      label:'Busseig',             emoji:'🥽' },
    { id:'avent_coasteering',  label:'Coasteering',         emoji:'🌊' },
    { id:'avent_dofins',       label:'Nedar amb dofins',    emoji:'🐬' },
    { id:'avent_escalada',     label:'Escalada',            emoji:'🧗' },
    { id:'avent_surf',         label:'Surf',                emoji:'🏄' },
    { id:'avent_moto',         label:'Moto aqu\u00e0tica',  emoji:'🚤' },
  ]},
  { grup:'Restaurants', open:false, items:[
    { id:'rest_45',   label:'4,5 o més',    emoji:'🍽️', n:56 },
    { id:'rest_40',   label:'4,0 – 4,4',    emoji:'🍽️', n:61 },
    { id:'rest_lt40', label:'Menys de 4,0', emoji:'🍽️', n:10 },
  ]},
];

const ALL_LAYER_ITEMS = LAYER_CFG.flatMap(function(g) { return g.items; });
function layerItem(id) { return ALL_LAYER_ITEMS.find(function(i) { return i.id === id; }) || {}; }

/* Identificadors de capa real (Leaflet layer) per a cada grup principal —
   exclou els items de tipus 'parent', que nomes son metadades de UI */
function grupLeafIds(grup) {
  return grup.items.filter(function(it) { return it.type !== 'parent'; }).map(function(it) { return it.id; });
}
const LEAF_TO_GRUPIDX = {};
LAYER_CFG.forEach(function(grup, gi) {
  grupLeafIds(grup).forEach(function(id) { LEAF_TO_GRUPIDX[id] = gi; });
});

/* ══════════════════════════════════════════════════════════════
   4. POI_DATA LOOKUP
══════════════════════════════════════════════════════════════ */
const MP_POI = {};
if (typeof POI_DATA !== 'undefined') {
  POI_DATA.forEach(function(p) { if (p.id) MP_POI[p.id] = p; });
}

/* ══════════════════════════════════════════════════════════════
   5. ESTAT
══════════════════════════════════════════════════════════════ */
var mpMap         = null;
var mpTileLayer   = null;
var mpState       = { illa: null };
var mpActive      = new Set();
var LGROUPS       = {};
var MDATA         = {};
var mpFavoritsOnly = false;
var mpSendMode    = 'inici';    /* 'inici' | 'track' */
var SEND_TRACKS   = {};         /* key -> L.polyline (cache) */

/* ══════════════════════════════════════════════════════════════
   6. HELPERS
══════════════════════════════════════════════════════════════ */
function normalIlla(s) {
  if (!s) return null;
  var l = String(s).toLowerCase().trim();
  if (l === 'sm' || l.includes('miguel')) return 'sm';
  if (l === 'sj' || l.includes('jorge'))  return 'sj';
  if (l === 'pi' || l === 'pico')         return 'pi';
  if (l === 'fa' || l.includes('faial'))  return 'fa';
  return null;
}

function mpLinkText(url) {
  try {
    var host = new URL(url).hostname.replace(/^www\./, '');
    return host.split('.')[0].replace(/-/g, ' ')
      .replace(/\b\w/g, function(c) { return c.toUpperCase(); });
  } catch(e) { return 'Mes info'; }
}

function mkDivIcon(emoji, color, size, star) {
  size = size || 26;
  var cls = star ? 'mp-mkr mp-mkr-star' : 'mp-mkr';
  return L.divIcon({
    html: '<div class="' + cls + '" style="--c:' + color + ';--s:' + size + 'px">' + emoji + '</div>',
    className: '',
    iconSize:   [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor:[0, -(size / 2 + 4)],
  });
}

/* dest = true si el lloc és destacat/favorit */
function addMkr(id, coords, illa, emoji, info, size, star, dest) {
  size = size || 24;
  if (!coords || isNaN(coords[0]) || isNaN(coords[1])) return;
  var color = MP_ILLA_COLOR[illa] || '#888';
  var m = L.marker(coords, { icon: mkDivIcon(emoji, color, size, star) });
  m.bindPopup(
    '<div class="mp-popup-nom">' + emoji + ' ' + info.title + '</div>' +
    (info.sub ? '<div class="mp-popup-sub">' + info.sub + '</div>' : ''),
    { closeButton: false, offset: [0, -4] }
  );
  m.on('click',     function() { showInfo(info); mpMap.closePopup(); });
  m.on('mouseover', function() { this.openPopup(); });
  m.on('mouseout',  function() { this.closePopup(); });
  if (!MDATA[id]) MDATA[id] = { inited: false, markers: [] };
  MDATA[id].markers.push({ illa: illa, lat: coords[0], lng: coords[1], marker: m, dest: dest || false, info: info, gpx: info.gpx || null, sendKey: info.sendKey || null });
}

/* ══════════════════════════════════════════════════════════════
   7. LAYER BUILDERS
══════════════════════════════════════════════════════════════ */
function buildLayer(id) {
  if (!MDATA[id]) MDATA[id] = { inited: false, markers: [] };
  if (MDATA[id].inited) return;
  MDATA[id].inited = true;

  /* Imprescindibles */
  if (id === 'imprescindibles') {
    Object.entries(IMPRESCINDIBLES || {}).forEach(function(entry) {
      var key = entry[0], it = entry[1];
      var poi = MP_POI[key];
      if (!poi) return;
      var illa = normalIlla(it.illa);
      addMkr(id, [poi.lat, poi.lng], illa, '🏆', {
        title: it.lloc, sub: MP_ILLA_NOM[illa] || '',
        capa:'Imprescindibles', capaEmoji:'🏆', illa: illa,
        links: (it.links || []).map(function(url) { return { text: mpLinkText(url), url: url }; }),
        url:'imprescindibles.html'
      }, 30, true, true);  /* tots els imprescindibles son favorites */
    });
    return;
  }

  /* Restaurants — per bandes de puntuacio global (punt_p) */
  if (REST_BAND_FILTERS[id]) {
    var band = REST_BAND_FILTERS[id];
    var restItem = layerItem(id);
    Object.entries(RESTAURANTS || {}).forEach(function(entry) {
      var key = entry[0], r = entry[1];
      if (r.punt_p == null || r.punt_p < band.min || r.punt_p > band.max) return;
      var poi = MP_POI[key];
      if (!poi) return;
      var illa = normalIlla(r.illa);
      var links = [
        r.gmaps && { text:'Google Maps', url: r.gmaps },
        r.web   && { text:'Web',         url: r.web   },
        r.ta    && { text:'TripAdvisor', url: r.ta    },
      ].filter(Boolean);
      var dest = r.top10 === true || r.editor != null || poi.d === true;
      addMkr(id, [poi.lat, poi.lng], illa, '🍽️', {
        title: r.nom, sub: (r.localitat || '') + (r.punt_p ? ' · ⭐ ' + r.punt_p : ''),
        capa: restItem.label ? ('Restaurants \u00b7 ' + restItem.label) : 'Restaurants',
        capaEmoji:'🍽️', illa: illa,
        desc: (r.cuina || '') + (r.horari ? '\n' + r.horari : ''),
        links: links, url:'restaurants.html'
      }, 22, false, dest);
    });
    return;
  }

  /* Allotjaments */
  if (id === 'allotjaments') {
    Object.entries(ALLOTJAMENTS || {}).forEach(function(entry) {
      var key = entry[0], a = entry[1];
      var poi = MP_POI[key];
      if (!poi) return;
      var illa = normalIlla(a.illa);
      var ent  = a.entrada ? a.entrada.slice(5).replace('-', '/') : '';
      var sor  = a.sortida ? a.sortida.slice(5).replace('-', '/') : '';
      addMkr(id, [poi.lat, poi.lng], illa, '🏠', {
        title: a.nom, sub: (MP_ILLA_NOM[illa] || '') + ' · ' + a.localitat,
        capa:'Allotjaments', capaEmoji:'🏠', illa: illa,
        desc: a.tipus + ' · ' + ent + ' \u2192 ' + sor + ' (' + a.nits + ' nits)',
        links: [{ text:'Detalls', url:'allotjament.html' }],
        url:'allotjament.html'
      }, 28, false, true);  /* allotjaments sempre favorits */
    });
    return;
  }

  /* Llocs d'interes (LLOCS) */
  if (LLOC_FILTERS[id]) {
    var filter = LLOC_FILTERS[id];
    var cat = filter.cat, subFilter = filter.sub;
    var item = layerItem(id);
    var emo = item.emoji || '📌';
    var capaLabel = item.label || cat;
    Object.entries(LLOCS || {}).forEach(function(entry) {
      var key = entry[0], loc = entry[1];
      if (loc.cat !== cat) return;
      if (subFilter !== null && loc.sub !== subFilter) return;
      var poi = MP_POI[key];
      if (!poi) return;
      var illa = normalIlla(loc.illa);
      var links = (loc.links || []).map(function(url) { return { text: mpLinkText(url), url: url }; });
      addMkr(id, [poi.lat, poi.lng], illa, emo, {
        title: loc.nom,
        sub:   (MP_ILLA_NOM[illa] || '') + ' \u00b7 ' + (loc.zona || ''),
        capa:   capaLabel, capaEmoji: emo, illa: illa, zona: loc.zona,
        desc:   loc.desc, links: links,
        url:   'material-extra.html'
      }, 24, false, loc.destacat === true || poi.d === true);
    });
    return;
  }

  /* Senderisme: sempre construeix markers d'inici */
  if (id === 'senderisme') {
    Object.entries(SENDERISME || {}).forEach(function(entry) {
      var key = entry[0], r = entry[1];
      var poi = MP_POI[key];
      if (!poi) return;
      var illa = normalIlla(r.illa);
      var links = [
        r.wikiloc && { text:'Wikiloc',   url: r.wikiloc },
        r.fullet  && { text:'PDF',       url: r.fullet  },
        r.trails  && { text:'AllTrails', url: r.trails  },
      ].filter(Boolean);
      addMkr(id, [poi.lat, poi.lng], illa, '🥾', {
        title: r.nom,
        sub:   r.codi + ' \u00b7 ' + r.km + ' km \u00b7 ' + r.dificultat,
        capa:'Senderisme', capaEmoji:'🥾', illa: illa,
        desc:  r.km + ' km \u00b7 D+ ' + (r.dp || 0) + 'm \u00b7 ' + r.dificultat + ' \u00b7 ' + (r.temps_cam || ''),
        links: links, url:'material-extra.html',
        gpx: r.gpx, sendKey: key
      }, 24, false, poi.d === true || (r.prioritat && r.prioritat >= 4));
    });
    return;
  }

  /* Excursions */
  if (id === 'exc_cetacis' || id === 'exc_barco' || id === 'exc_estrelles') {
    var subF  = { exc_cetacis:'cetacis', exc_barco:'barco', exc_estrelles:'estrelles' }[id];
    var excEm = { exc_cetacis:'🐋',      exc_barco:'⛵',     exc_estrelles:'✨'        }[id];
    var excCa = { exc_cetacis:'Avistament Cetacis', exc_barco:'Passeig amb Barco', exc_estrelles:'Observacio Estrelles' }[id];
    Object.entries(EXCURSIONS || {}).forEach(function(entry) {
      var key = entry[0], ex = entry[1];
      if (ex.sub !== subF) return;
      var poi = MP_POI['exc' + key.slice(2)];
      if (!poi) return;
      var illa = normalIlla(ex.illa);
      var links = ex.empresa ? [{ text:'Reservar', url: ex.empresa }] : [];
      var desc = '';
      if (ex.info) desc += ex.info;
      if (ex.durada) desc += (desc ? ' \u00b7 ' : '') + ex.durada;
      if (ex.preu && ex.preu !== 'n/d') desc += (desc ? ' \u00b7 ' : '') + ex.preu + '\u20ac';
      if (ex.sortides) desc += (desc ? '\n' : '') + 'Sortides: ' + ex.sortides;
      addMkr(id, [poi.lat, poi.lng], illa, excEm, {
        title: ex.nom, sub: (MP_ILLA_NOM[illa] || '') + ' \u00b7 ' + (ex.zona || ''),
        capa: excCa, capaEmoji: excEm, illa: illa, zona: ex.zona,
        desc: desc, links: links, url:'material-extra.html'
      }, 26, false, ex.destacat === true || poi.d === true);
    });
    return;
  }

  /* Aventura */
  if (id.startsWith('avent_')) {
    var subName = AVENT_LAYER_TO_SUB[id];
    if (!subName) return;
    var avItem  = layerItem(id);
    var avEmo   = avItem.emoji || '🧗';
    var avLabel = avItem.label || subName;
    Object.entries(AVENTURA || {}).forEach(function(entry) {
      var key = entry[0], a = entry[1];
      if (a.sub !== subName) return;
      var poi = MP_POI[key];
      if (!poi) return;
      var illa = normalIlla(a.illa);
      addMkr(id, [poi.lat, poi.lng], illa, avEmo, {
        title: a.lloc, sub: avLabel + ' \u00b7 ' + (MP_ILLA_NOM[illa] || ''),
        capa: avLabel, capaEmoji: avEmo, illa: illa,
        desc: 'Zona ' + a.zona,
        links:[{ text:'Veure activitats', url:'material-extra.html' }],
        url:'material-extra.html'
      }, 24, false, poi.d === true);
    });
    return;
  }
}

/* ══════════════════════════════════════════════════════════════
   8. SENDERISME TRACKS GPX
══════════════════════════════════════════════════════════════ */
function parseGPXtoLatLng(xmlText) {
  try {
    var parser = new DOMParser();
    var doc = parser.parseFromString(xmlText, 'application/xml');
    var pts = doc.querySelectorAll('trkpt');
    var coords = [];
    pts.forEach(function(pt) {
      var lat = parseFloat(pt.getAttribute('lat'));
      var lon = parseFloat(pt.getAttribute('lon'));
      if (!isNaN(lat) && !isNaN(lon)) coords.push([lat, lon]);
    });
    return coords;
  } catch(e) { return []; }
}

function mpShowSendTracks() {
  var grp = LGROUPS['senderisme'];
  if (!grp) return;
  var data = MDATA['senderisme'];
  if (!data) return;

  data.markers.forEach(function(item) {
    /* Amagar marker d'inici quan estem en mode track */
    grp.removeLayer(item.marker);
    /* Filtrar per illa i favorits */
    if (mpState.illa && item.illa !== mpState.illa) return;
    if (mpFavoritsOnly && !item.dest) return;

    var info     = item.info || {};
    var sendKey  = item.sendKey;
    var gpxUrl   = item.gpx;
    var illaColor = MP_ILLA_COLOR[item.illa] || '#6abf70';

    /* Mostrar track si ja el tenim cached */
    if (SEND_TRACKS[sendKey]) {
      SEND_TRACKS[sendKey].addTo(grp);
      return;
    }
    /* Fetch GPX si hi ha URL */
    if (!gpxUrl) {
      /* Sense GPX: mostrar igualment el marker */
      grp.addLayer(item.marker);
      return;
    }
    /* Construir URL: si ja té http, usar tal qual; si no, buscar a carpeta gpx/ local */
    var fetchUrl = (gpxUrl && gpxUrl.startsWith('http')) ? gpxUrl : 'gpx/' + gpxUrl + '.gpx';
    fetch(fetchUrl)
      .then(function(res) { if (!res.ok) throw new Error('GPX ' + res.status); return res.text(); })
      .then(function(txt) {
        var coords = parseGPXtoLatLng(txt);
        if (coords.length < 2) {
          /* GPX buit o error: fallback al marker */
          if (mpSendMode === 'track' && mpActive.has('senderisme')) grp.addLayer(item.marker);
          return;
        }
        var poly = L.polyline(coords, {
          color: illaColor, weight: 3, opacity: 0.85,
        });
        /* Popup al clicar el track */
        var r = (SENDERISME || {})[sendKey] || {};
        poly.bindPopup('<div class="mp-popup-nom">🥾 ' + (r.nom || sendKey) + '</div><div class="mp-popup-sub">' + (r.codi || '') + ' \u00b7 ' + (r.km || '') + ' km</div>');
        poly.on('click', function() { showInfo(info); mpMap.closePopup(); });
        SEND_TRACKS[sendKey] = poly;
        /* Afegir al mapa si el mode segueix actiu */
        if (mpSendMode === 'track' && mpActive.has('senderisme')) poly.addTo(grp);
      })
      .catch(function() {
        /* GPX no disponible (404 o CORS): mostrar marker d'inici com a fallback */
        if (mpSendMode === 'track' && mpActive.has('senderisme')) {
          if (mpState.illa && item.illa !== mpState.illa) return;
          if (mpFavoritsOnly && !item.dest) return;
          grp.addLayer(item.marker);
        }
      });
  });
}

function mpClearSendTracks() {
  var grp = LGROUPS['senderisme'];
  if (!grp) return;
  Object.values(SEND_TRACKS).forEach(function(poly) { grp.removeLayer(poly); });
}

function mpSetSendMode(mode) {
  mpSendMode = mode;
  /* Actualitzar radio buttons */
  ['inici','track'].forEach(function(m) {
    var rb = document.getElementById('send-mode-' + m);
    if (rb) rb.checked = (m === mode);
  });
  if (!mpActive.has('senderisme')) return;
  /* Reconstruir visualització */
  mpClearSendTracks();
  if (mode === 'track') {
    mpShowSendTracks();
  } else {
    /* Mode inici: mostrar markers normals */
    mpRefreshLayer('senderisme');
  }
}

/* ══════════════════════════════════════════════════════════════
   9. TOGGLE, FILTRE D'ILLA I FAVORITS
══════════════════════════════════════════════════════════════ */
function mpRefreshLayer(id) {
  var grp  = LGROUPS[id];
  var data = MDATA[id];
  if (!grp || !data) return;

  /* Senderisme en mode track: delegar */
  if (id === 'senderisme' && mpSendMode === 'track') {
    mpShowSendTracks();
    return;
  }

  grp.clearLayers();
  if (id === 'senderisme') mpClearSendTracks();

  data.markers.forEach(function(item) {
    if (mpState.illa && item.illa !== mpState.illa) return;
    if (mpFavoritsOnly && !item.dest) return;
    grp.addLayer(item.marker);
  });
}

function mpToggleLayer(id, on) {
  var grp = LGROUPS[id];
  if (on) {
    mpActive.add(id);
    buildLayer(id);
    /* info ja guardada a MDATA per mpShowSendTracks */
    mpRefreshLayer(id);
    if (!mpMap.hasLayer(grp)) mpMap.addLayer(grp);
  } else {
    mpActive.delete(id);
    if (id === 'senderisme') mpClearSendTracks();
    if (mpMap.hasLayer(grp)) mpMap.removeLayer(grp);
  }
}

function mpSetIlla(code) {
  mpState.illa = code || null;
  document.querySelectorAll('.mp-illa-btn').forEach(function(b) {
    b.classList.toggle('active', (b.dataset.illa || '') === (code || ''));
  });
  mpActive.forEach(function(id) { mpRefreshLayer(id); });
  /* Zoom automàtic a la illa */
  if (code && MP_ILLA_BOUNDS[code]) {
    mpMap.fitBounds(MP_ILLA_BOUNDS[code], { padding:[20,20] });
  } else if (!code) {
    mpFitAll();
  }
}

function mpToggleFavorits() {
  mpFavoritsOnly = !mpFavoritsOnly;
  var btn = document.getElementById('mp-btn-favorits');
  if (btn) {
    btn.classList.toggle('active', mpFavoritsOnly);
    btn.textContent = mpFavoritsOnly ? '⭐ Nomes favorits ✓' : '⭐ Nomes favorits';
    btn.title = mpFavoritsOnly ? 'Mostrant nomes favorits — clic per desactivar' : 'Mostrar nomes favorits';
  }
  mpActive.forEach(function(id) { mpRefreshLayer(id); });
}

function mpShowAll() {
  ALL_LAYER_ITEMS.forEach(function(it) {
    if (it.type === 'parent') return;
    var cb = document.getElementById('cb-' + it.id);
    if (cb && !cb.checked) {
      cb.checked = true;
      mpToggleLayer(it.id, true);
    }
  });
  /* Actualitzar parents i grups */
  LAYER_CFG.forEach(function(g) {
    g.items.forEach(function(it) {
      if (it.type === 'parent') mpUpdateParent(it.id);
    });
  });
  mpUpdateAllGroupCheckboxes();
}

function mpClearAll() {
  ALL_LAYER_ITEMS.forEach(function(it) {
    if (it.type === 'parent') return;
    var cb = document.getElementById('cb-' + it.id);
    if (cb && cb.checked) {
      cb.checked = false;
      mpToggleLayer(it.id, false);
    }
  });
  LAYER_CFG.forEach(function(g) {
    g.items.forEach(function(it) {
      if (it.type === 'parent') mpUpdateParent(it.id);
    });
  });
  mpUpdateAllGroupCheckboxes();
}

/* ══════════════════════════════════════════════════════════════
   10. INFO PANEL
══════════════════════════════════════════════════════════════ */
function showInfo(info) {
  var panel = document.getElementById('mp-info');
  var head  = document.getElementById('mp-info-head-capa');
  var body  = document.getElementById('mp-info-body');
  if (!panel || !info || !info.title) return;

  var illaColor = MP_ILLA_COLOR[info.illa] || '#6aab7a';
  var illaNom   = info.illa ? MP_ILLA_NOM[info.illa] : '';
  var illaEmo   = info.illa ? MP_ILLA_EMO[info.illa] : '';

  head.textContent = (info.capaEmoji || '') + ' ' + (info.capa || '');

  var badgesHtml = '';
  if (illaNom) badgesHtml += '<span class="mp-badge" style="background:' + illaColor + '25;color:' + illaColor + ';border-color:' + illaColor + '50">' + illaEmo + ' ' + illaNom + '</span>';
  if (info.zona) badgesHtml += '<span class="mp-badge-zona">' + info.zona + '</span>';
  else if (info.sub) badgesHtml += '<span class="mp-badge-zona">' + info.sub + '</span>';

  var linksHtml = '';
  if (info.links && info.links.length) {
    linksHtml = '<div class="mp-info-links">' +
      info.links.map(function(l) { return '<a href="' + l.url + '" target="_blank" rel="noopener" class="mp-info-link">' + l.text + '</a>'; }).join('') +
      '</div>';
  }

  body.innerHTML =
    '<h3 class="mp-info-nom">' + (info.emoji || '') + ' ' + info.title + '</h3>' +
    '<div class="mp-info-badges">' + badgesHtml + '</div>' +
    (info.desc ? '<p class="mp-info-desc">' + info.desc.replace(/\n/g,'<br>') + '</p>' : '') +
    '<div class="mp-info-actions">' +
    (info.url ? '<a href="' + info.url + '" class="mp-info-btn-main">Veure detalls \u2192</a>' : '') +
    '</div>' + linksHtml;

  panel.classList.add('open');
}

function hideInfo() {
  var el = document.getElementById('mp-info');
  if (el) el.classList.remove('open');
}

/* ══════════════════════════════════════════════════════════════
   11. PANEL DE CAPES
══════════════════════════════════════════════════════════════ */
function buildPanel() {
  var body = document.getElementById('mp-panel-body');
  if (!body) return;
  var html = '';

  /* Botons globals: Nomes favorits / Mostrar tot / Netejar filtres */
  html += '<div class="mp-panel-btns">' +
    '<button id="mp-btn-favorits"  class="mp-global-btn" onclick="mpToggleFavorits()" title="Mostrar nomes els llocs destacats">⭐ Nomes favorits</button>' +
    '<button id="mp-btn-showall"   class="mp-global-btn" onclick="mpShowAll()"        title="Activa totes les capes">☑ Mostrar tot</button>' +
    '<button id="mp-btn-clearall"  class="mp-global-btn" onclick="mpClearAll()"       title="Desactiva totes les capes">✕ Netejar filtres</button>' +
    '</div>';

  LAYER_CFG.forEach(function(grup, gi) {
    var openClass = grup.open ? 'open' : '';
    html += '<div class="mp-grup ' + openClass + '">';
    html += '<div class="mp-grup-title">' +
      '<input type="checkbox" class="mp-grup-cb" id="cb-grup-' + gi + '" onchange="mpToggleGroup(' + gi + ', this.checked)" title="Marcar/desmarcar tota la categoria">' +
      '<button class="mp-grup-toggle-btn mp-grup-toggle"><span class="mp-grup-lbl">' + grup.grup + '</span><span class="mp-grup-arrow">▼</span></button>' +
      '</div>';
    html += '<div class="mp-grup-items"' + (grup.open ? '' : ' style="display:none"') + '>';

    grup.items.forEach(function(it) {
      if (it.type === 'parent') {
        html += '<label class="mp-layer-item mp-layer-parent">' +
          '<input type="checkbox" id="cb-' + it.id + '" data-parent-id="' + it.id + '" data-children="' + it.children.join(',') + '" onchange="mpOnParentChange(this)">' +
          '<span class="mp-layer-emo">' + it.emoji + '</span>' +
          '<span class="mp-layer-nom">' + it.label + '</span>' +
          (it.n ? '<span class="mp-layer-n">' + it.n + '</span>' : '') +
          '</label>';
        return;
      }

      var indent = it.indent ? 'mp-layer-indent' : '';
      html += '<label class="mp-layer-item ' + indent + '">' +
        '<input type="checkbox" id="cb-' + it.id + '" data-id="' + it.id + '"' + (it.on ? ' checked' : '') + ' onchange="mpOnLayerChange(this)">' +
        '<span class="mp-layer-emo">' + it.emoji + '</span>' +
        '<span class="mp-layer-nom">' + it.label + '</span>' +
        (it.n ? '<span class="mp-layer-n">' + it.n + '</span>' : '') +
        '</label>';

      /* Senderisme: item especial amb radio buttons inici/track, just sota la seva fila */
      if (it.type === 'senderisme') {
        html += '<div class="mp-send-modes">' +
          '<label class="mp-radio-lbl"><input type="radio" id="send-mode-inici" name="send-mode" value="inici" checked onchange="mpSetSendMode(\'inici\')"> Inici rutes</label>' +
          '<label class="mp-radio-lbl"><input type="radio" id="send-mode-track" name="send-mode" value="track"       onchange="mpSetSendMode(\'track\')"> Track rutes</label>' +
          '</div>';
      }
    });

    html += '</div></div>';
  });

  body.innerHTML = html;

  body.querySelectorAll('.mp-grup-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var g  = btn.closest('.mp-grup');
      var items = g.querySelector('.mp-grup-items');
      var open  = g.classList.toggle('open');
      items.style.display = open ? '' : 'none';
    });
  });
}

function mpOnParentChange(cb) {
  cb.dataset.children.split(',').forEach(function(cid) {
    var child = document.getElementById('cb-' + cid);
    if (child) { child.checked = cb.checked; mpToggleLayer(cid, cb.checked); }
  });
  var gi = LEAF_TO_GRUPIDX[cb.dataset.children.split(',')[0]];
  if (gi != null) mpUpdateGroupCheckbox(gi);
}

function mpUpdateParent(parentId) {
  var cb = document.getElementById('cb-' + parentId);
  if (!cb || !cb.dataset.children) return;
  var children = cb.dataset.children.split(',');
  var checked = children.filter(function(cid) {
    var el = document.getElementById('cb-' + cid);
    return el && el.checked;
  }).length;
  cb.indeterminate = checked > 0 && checked < children.length;
  cb.checked = checked === children.length;
}

function mpOnLayerChange(cb) {
  var id = cb.dataset.id;
  mpToggleLayer(id, cb.checked);
  var parent = document.querySelector('input[data-children*="' + id + '"]');
  if (parent) mpUpdateParent(parent.dataset.parentId);
  var gi = LEAF_TO_GRUPIDX[id];
  if (gi != null) mpUpdateGroupCheckbox(gi);
}

/* ── Checkbox mestre per categoria principal (Essencials, Llocs d'interes...) ── */
function mpToggleGroup(grupIdx, checked) {
  var grup = LAYER_CFG[grupIdx];
  if (!grup) return;
  grupLeafIds(grup).forEach(function(id) {
    var cb = document.getElementById('cb-' + id);
    if (cb) cb.checked = checked;
    mpToggleLayer(id, checked);
  });
  /* Actualitzar els checkboxes de subgrup (bany/naturalesa/varis) dins d'aquest grup */
  grup.items.forEach(function(it) {
    if (it.type === 'parent') mpUpdateParent(it.id);
  });
  mpUpdateGroupCheckbox(grupIdx);
}

function mpUpdateGroupCheckbox(grupIdx) {
  var grup = LAYER_CFG[grupIdx];
  if (!grup) return;
  var cb = document.getElementById('cb-grup-' + grupIdx);
  if (!cb) return;
  var leafIds = grupLeafIds(grup);
  if (!leafIds.length) return;
  var checkedCount = leafIds.filter(function(id) { return mpActive.has(id); }).length;
  cb.indeterminate = checkedCount > 0 && checkedCount < leafIds.length;
  cb.checked = checkedCount === leafIds.length;
}

function mpUpdateAllGroupCheckboxes() {
  LAYER_CFG.forEach(function(grup, gi) { mpUpdateGroupCheckbox(gi); });
}

/* ══════════════════════════════════════════════════════════════
   12. CONTROLS DEL MAPA
══════════════════════════════════════════════════════════════ */
function mpFitAll() {
  var bounds = [];
  mpActive.forEach(function(id) {
    var d = MDATA[id];
    if (!d) return;
    d.markers.forEach(function(m) {
      if (!mpState.illa || m.illa === mpState.illa) bounds.push([m.lat, m.lng]);
    });
  });
  if (bounds.length) mpMap.fitBounds(L.latLngBounds(bounds), { padding:[30,30], maxZoom:14 });
  else if (mpState.illa && MP_ILLA_BOUNDS[mpState.illa]) mpMap.fitBounds(MP_ILLA_BOUNDS[mpState.illa]);
  else               mpMap.setView([38.2, -27.0], 8);
}

function mpGeolocate() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(function(pos) {
    var ll = [pos.coords.latitude, pos.coords.longitude];
    L.circleMarker(ll, { radius:8, color:'#fff', weight:2, fillColor:'#3b82f6', fillOpacity:1 })
      .addTo(mpMap).bindPopup('📍 La teva posicio').openPopup();
    mpMap.setView(ll, 13);
  }, function() { alert("No s'ha pogut obtenir la ubicacio."); });
}

function mpSetBasemap(key) {
  if (mpTileLayer) mpMap.removeLayer(mpTileLayer);
  mpTileLayer = MP_TILES[key]();
  mpTileLayer.addTo(mpMap);
  mpTileLayer.bringToBack();
}

/* ══════════════════════════════════════════════════════════════
   13. PANEL TOGGLE
══════════════════════════════════════════════════════════════ */
function mpTogglePanel() {
  var panel  = document.getElementById('mp-panel');
  var togBtn = document.getElementById('mp-panel-toggle');
  if (!panel) return;
  var hidden = panel.classList.toggle('hidden');
  togBtn.style.display = hidden ? 'flex' : 'none';
}

/* ══════════════════════════════════════════════════════════════
   14. INIT
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  /* Estils inline per als botons del panel (mp-global-btn) */
  var s = document.createElement('style');
  s.textContent = [
    '.mp-panel-btns{display:flex;gap:4px;padding:6px 8px 6px;border-bottom:1px solid rgba(106,171,122,.2);flex-wrap:wrap;}',
    '.mp-global-btn{flex:1 1 auto;min-width:74px;padding:4px 5px;font-size:.68rem;font-weight:600;border:1px solid rgba(106,171,122,.35);border-radius:5px;background:rgba(45,90,61,.45);color:#a8d8b0;cursor:pointer;letter-spacing:.01em;transition:background .15s,border-color .15s;white-space:nowrap;text-align:center;}',
    '.mp-global-btn:hover{background:rgba(45,90,61,.75);border-color:rgba(106,171,122,.6);}',
    '.mp-global-btn.active{background:#2d5a3d;border-color:#6aab7a;color:#d4f0dc;}',
    '.mp-send-modes{display:flex;gap:12px;padding:4px 10px 6px 28px;font-size:.78rem;color:#a8d8b0;}',
    '.mp-radio-lbl{cursor:pointer;display:flex;align-items:center;gap:4px;}',
  ].join('');
  document.head.appendChild(s);
  mpMap = L.map('mp-map', { center:[38.2, -27.0], zoom:8, zoomControl:false });
  L.control.zoom({ position:'topright' }).addTo(mpMap);
  mpTileLayer = MP_TILES.voyager();
  mpTileLayer.addTo(mpMap);

  /* Crear layer groups (excloent parents) */
  LAYER_CFG.forEach(function(g) {
    g.items.forEach(function(it) {
      if (it.type !== 'parent') LGROUPS[it.id] = L.layerGroup();
    });
  });

  buildPanel();

  /* Capes per defecte (on:true) */
  LAYER_CFG.forEach(function(g) {
    g.items.forEach(function(it) {
      if (it.on) mpToggleLayer(it.id, true);
    });
  });
  mpUpdateAllGroupCheckboxes();

  /* Filtre d'illes */
  document.querySelectorAll('.mp-illa-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { mpSetIlla(btn.dataset.illa); });
  });

  /* Panel toggle */
  var togBtn = document.getElementById('mp-panel-toggle');
  var clsBtn = document.getElementById('mp-panel-close');
  if (togBtn) togBtn.addEventListener('click', mpTogglePanel);
  if (clsBtn) clsBtn.addEventListener('click', mpTogglePanel);

  /* Info close */
  var infClose = document.getElementById('mp-info-close');
  if (infClose) infClose.addEventListener('click', hideInfo);
  var mpMapEl = document.getElementById('mp-map');
  if (mpMapEl) mpMapEl.addEventListener('click', function(e) {
    if (e.target.id === 'mp-map' || e.target.classList.contains('leaflet-container')) hideInfo();
  });

  /* Controls */
  var fitBtn  = document.getElementById('mp-fit');
  var geoBtn  = document.getElementById('mp-geo');
  var baseSel = document.getElementById('mp-basemap');
  if (fitBtn)  fitBtn.addEventListener('click', mpFitAll);
  if (geoBtn)  geoBtn.addEventListener('click', mpGeolocate);
  if (baseSel) baseSel.addEventListener('change', function(e) { mpSetBasemap(e.target.value); });

  /* Loading */
  var loading = document.getElementById('mp-loading');
  if (loading) { loading.classList.add('hidden'); setTimeout(function() { loading.remove(); }, 500); }

  setTimeout(mpFitAll, 200);
});
