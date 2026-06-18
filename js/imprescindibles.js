/* ============================================================
   IMPRESCINDIBLES.JS  ·  Açores 2026
   v2 — Nova arquitectura POI (v19)
   Llegeix IMPRESCINDIBLES (keyed object) de imprescindibles-data.js
   Llegeix coordenades de POI_DATA (poi-data.js)
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────
   CONFIG D'ILLES
   (desplaçat del data file; claus = valors illa sense accent)
   ────────────────────────────────────────────────────────── */
const ILLES_ORDRE = ['Sao Miguel', 'Sao Jorge', 'Pico', 'Faial'];

const ILLES_CONFIG = {
  'Sao Miguel': {
    label: 'São Miguel', emoji: '🌋',
    color: '#e74c3c',
    colorSuau: 'rgba(231,76,60,0.12)', colorBorde: 'rgba(231,76,60,0.3)',
    coords: [37.785, -25.499], zoom: 10,
  },
  'Sao Jorge': {
    label: 'São Jorge', emoji: '🏔️',
    color: '#27ae60',
    colorSuau: 'rgba(39,174,96,0.12)', colorBorde: 'rgba(39,174,96,0.3)',
    coords: [38.668, -28.070], zoom: 11,
  },
  'Pico': {
    label: 'Pico', emoji: '⛰️',
    color: '#8e44ad',
    colorSuau: 'rgba(142,68,173,0.12)', colorBorde: 'rgba(142,68,173,0.3)',
    coords: [38.490, -28.330], zoom: 11,
  },
  'Faial': {
    label: 'Faial', emoji: '⚓',
    color: '#2980b9',
    colorSuau: 'rgba(41,128,185,0.12)', colorBorde: 'rgba(41,128,185,0.3)',
    coords: [38.565, -28.720], zoom: 11,
  },
};

/* ──────────────────────────────────────────────────────────
   DADES COMPLEMENTÀRIES (no al nou Excel/data file)
   ────────────────────────────────────────────────────────── */

/* Emojis per ID */
const IMP_EMOJI = {
  'imp-smi-01': '🌊', 'imp-smi-02': '♨️', 'imp-smi-03': '🔥',
  'imp-smi-04': '🌅', 'imp-smi-05': '🌿', 'imp-smi-06': '💧',
  'imp-smi-07': '🏛️', 'imp-smi-08': '🌳', 'imp-smi-09': '🏝️',
  'imp-smi-10': '🕳️', 'imp-smi-11': '💙', 'imp-smi-12': '🌋',
  'imp-sjo-01': '🦪', 'imp-sjo-02': '🏊', 'imp-sjo-03': '🌲',
  'imp-pic-01': '⛰️', 'imp-pic-02': '🍇', 'imp-pic-03': '🏞️',
  'imp-pic-04': '🌊', 'imp-pic-05': '🐋',
  'imp-fai-01': '🌋', 'imp-fai-02': '🌑', 'imp-fai-03': '⚓', 'imp-fai-04': '🔭',
};

/* Descripcions per ID */
const IMP_DESCS = {
  'imp-smi-01': 'El símbol de São Miguel: dos llacs volcànics units per un pont, un de verd i un de blau. El mirador Vista do Rei ofereix la postal més icònica dels Açores. La llegenda diu que els llacs van néixer de les llàgrimes d\'un pastor i una princesa.',
  'imp-smi-02': 'La vall geotèrmica més espectacular dels Açores. Fumaroles, llot bullent i la famosa cozido das Furnas: un guisat cuit durant hores enterrat al terra volcànic. Un paisatge que sembla d\'un altre planeta, envoltat de jardins exuberants.',
  'imp-smi-03': 'El llac més salvatge i pur de São Miguel, encaixat al cràter del volcà Água de Pau. Sense infraestructura turística, amb platges de sorra volcànica i aigües cristal·lines. Quan no hi ha boira, la vista des del mirador és absolutament esplèndida.',
  'imp-smi-04': 'L\'extrem est de São Miguel, famós per ser un dels primers llocs d\'Europa on surt el sol. Penya-segats imponents sobre l\'oceà, vegetació exuberant i una solitud absoluta. Ideal per veure l\'alba amb vistes a l\'Atlàntic obert.',
  'imp-smi-05': 'Un dels jardins botànics més antics i bonics de l\'hemisferi nord, fundat al segle XVIII a Furnas. La seva atracció principal és la piscina termal natural de color ferruginós daurat, envoltada de sequoies centenàries, helechos tropicals i camèlies.',
  'imp-smi-06': 'Un racó màgic al cor del bosc laurisilva: cascades que cauen sobre piscines naturals termals d\'aigües verdoses. La temperatura de l\'aigua ronda els 38°C tot l\'any. Un bany aquí, envoltat de falgueres gegants i llum filtrada pels arbres, és una experiència inoblidable.',
  'imp-smi-07': 'La capital dels Açores és una ciutat barroca encantadora. Les Portes da Cidade, símbol de l\'arxipèlag, la imponent església de Sant Sebastià, el mercat de la Graça ple de productes locals i el port on arriben transatlàntics. Una tarda passejar-hi és imprescindible.',
  'imp-smi-08': 'Un dels parcs naturals més espectaculars de São Miguel, al nord de l\'illa. Una sèrie de cascades successives cau enmig d\'una vegetació subtropical exuberant. Molins d\'aigua restaurats, ponts de pedra i una ruta senzilla que segueix el curs del riu entre helechos gegants.',
  'imp-smi-09': 'Un illot volcànic a 1 km de la costa, format per un cràter submergit que crea una laguna natural circular d\'aigües turqueses protegides. L\'accés és per barca des de Vila Franca do Campo. L\'entrada és limitada i cal reservar; és un dels banys de mar més singulars dels Açores.',
  'imp-smi-10': 'El túnel de lava més llarg accessible dels Açores, al cor de Ponta Delgada. Formada fa uns 1.000 anys per colades de lava, té més de 2 km de llargada total. Les visites guiades mostren formacions geològiques úniques: estalagmites de lava, parets vidrioses i galeries de diferents alçades.',
  'imp-smi-11': 'Una piscina natural d\'aigües d\'un blau intens, formada a l\'interior d\'un bosc exuberant al nord de São Miguel. L\'accés requereix una caminada breu per un sender forestal. Quan el sol entra a plom, l\'aigua brilla d\'un color turquesa irreal que justifica plenament el nom.',
  'imp-smi-12': 'A l\'extrem oest de São Miguel, on l\'oceà es barreja amb aigües termals volcàniques. Unes piscines naturals formades per lava es mantenen calentes gràcies a les emanacions del subsòl. La temperatura de l\'aigua canvia amb la marea: quan la mar puja, l\'aigua es refresca.',
  'imp-sjo-01': 'Dues de les fajãs més emblemàtiques dels Açores, connectades per un sender costaner espectacular. La Fajã dos Cubres acull una llacuna tranquil·la ideal per observar aus. La Fajã da Caldeira de Santo Cristo és l\'única del món on creixen les cloïsses dos Açores, un mol·lusc exclusiu. Un petit paradís aïllat, amb cases de pescadors i una llacuna singular.',
  'imp-sjo-02': 'Una fajã de gran bellesa a la costa nord de São Jorge, accessible per un sender que baixa pels penya-segats. Al seu peu hi ha les piscines naturals de Simão Dias, excavades a la roca volcànica i banyades per l\'Atlàntic. Les vistes des de dalt, amb els penya-segats i l\'oceà, són impressionants.',
  'imp-sjo-03': 'Un bosc frondós a les altituds de São Jorge, creuat per set fonts d\'aigüa natural. Rutes de senderisme tranquil·les entre criptomèries japoneses, helechos gegants i hortènsies blaves. Un espai de pau i frescor que contrasta amb la rudesa dels penya-segats de la costa.',
  'imp-pic-01': 'El cim més alt de Portugal i de tot l\'Atlàntic nord: 2.351 metres sobre el mar. L\'ascensió dura entre 3 i 5 hores anada, requereix guia obligatori i reserva prèvia. Des del cràter, en dies clars, es veuen totes les illes del grup Central. Una experiència física i visual única.',
  'imp-pic-02': 'Patrimoni de la Humanitat per la UNESCO. Un paisatge únic format per milers de murs de pedra volcànica negra (currais) que protegeixen les vinyes del vent atlàntic. El vi de Pico, el Verdelho, és un dels vins d\'illa més antics i apreciats del món. La millor hora per fotografiar-lo: la posta de sol.',
  'imp-pic-03': 'Un llac de muntanya tranquil i poc visitat, envoltat de bosc i amb vistes al volcà. Ideal per fer una caminada tranquil·la allunyada del turisme. La seva situació en altitud garanteix temperatures fresques fins i tot a l\'estiu i unes vistes privilegiades sobre el paisatge de Pico.',
  'imp-pic-04': 'Les piscines naturals més ben condicionades de Pico, formades per la lava que s\'ha endinsat al mar creant badies naturals protegides. Aigües netes i transparents amb fons de roca volcànica. Un entorn pur, sense artificialitat, on nedar amb vistes directes a l\'oceà obert.',
  'imp-pic-05': 'Els Açores són un dels millors llocs del món per veure balenes i dofins en llibertat. Des de Pico, antics vigies de baleines localitzen els animals i guien les embarcacions. És possible veure fins a 20 espècies, incloent el catxalot, el rorqual comú i diverses espècies de dofins. Cal reservar amb antelació.',
  'imp-fai-01': 'Un cràter volcànic gegant de 2 km de diàmetre i 400 metres de profunditat, cobert de bosc de criptomèries. La ruta circular pel vora del cràter (5 km) és una de les millors caminades dels Açores, amb vistes sobre tota l\'illa i, en dies clars, sobre el Pico al fons.',
  'imp-fai-02': 'El lloc més singular de Faial: un volcà que va erupcionar entre 1957 i 1958 enmig de l\'oceà, creant nova terra i sepultant el far de Capelinhos fins a la meitat. El paisatge resultant és absolutament lunar: cendres, lava i el far mig enterrat. El museu adjacent, soterrani, és excel·lent.',
  'imp-fai-03': 'La marina de Horta és la més famosa de l\'Atlàntic nord, escala obligatòria dels veliers transocèanics. Per tradició, cada tripulació pinta el seu emblema a les parets i el moll: milers de murals colorits cobreixen cada centímetre de les superfícies. El Café Sport, obert des del 1918, és la seva ànima.',
  'imp-fai-04': 'Un con volcànic al sud de Horta que forma una península natural. La pujada a peu dura uns 20 minuts i recompensa amb una vista panoràmica de 360°: Horta als peus, el Pico dominant l\'horitzó al davant, i São Jorge i Graciosa a la llunyania. El millor mirador de Faial, especialment al capvespre.',
};

/* Labels de dominis per als links (URL-string → text visible) */
const IMP_DOMAIN_LABELS = {
  'futurismo.pt':                 'Futurismo',
  'byacores.com':                 'By Açores',
  'saomiguelguide.com':           'São Miguel Guide',
  'lagavetavoladora.com':         'La Gaveta Voladora',
  'turismoazores.es':             'Turismo Azores',
  'visitportugal.com':            'Visit Portugal',
  'azoresgetaways.com':           'Azores Getaways',
  'saltaconmigo.com':             'Salta Conmigo',
  'parqueterranostra.com':        'Terra Nostra',
  'lagranescapada.com':           'La Gran Escapada',
  'viajamosjuntos.net':           'Viajamos Juntos',
  'aventurateaviajar.com':        'Aventura te a Viajar',
  'mifamiliaviajera.com':         'Mi Familia Viajera',
  'parquesnaturais.azores.gov.pt':'Parques Naturais',
  'turismo.azores.gov.pt':        'Turismo Azores',
  'gataconbotas.com':             'Gata con Botas',
  'granadinoerrante.com':         'Granadino Errante',
  'nuncasinviaje.com':            'Nunca Sin Viaje',
  'randomtrip.es':                'Random Trip',
  'revigorate.com':               'Revigorate',
  'azoren-online.info':           'Azoren Online',
  'wikiloc.com':                  'Wikiloc',
  'ca.wikiloc.com':               'Wikiloc',
  'es.wikiloc.com':               'Wikiloc',
  'mendikat.net':                 'Mendikat',
  'visitazores.com':              'Visit Azores',
  'vaiver.com':                   'Vaiver',
  'es.vaiver.com':                'Vaiver',
  'explorepicoisland.com':        'Explore Pico Island',
  'nadiuviatges.com':             'Nadi Uiatges',
  'conpequessepuede.com':         'Con Peques se Puede',
  'viveportugalweb.com':          'Vive Portugal',
  'iugs-geoheritage.org':         'IUGS Geoheritage',
  'agers.es':                     'AGERS',
  'minube.com':                   'Minube',
  'turismoenportugal.org':        'Turisme en Portugal',
  'guiadacidade.pt':              'Guia da Cidade',
  '20minutos.es':                 '20 Minutos',
  'travelguide.fun-activities.net':'Travel Guide',
  'wircky.com':                   'Wircky',
};

/* ──────────────────────────────────────────────────────────
   ESTAT
   ────────────────────────────────────────────────────────── */
let impFiltreIlla = null;   // null = totes
let impMapes      = {};     // { 'Sao Miguel': leafletMap, ... }
let impMapesInit  = {};     // { mapId: bool }

/* ── Lookup POI_DATA indexat per ID d'imprescindible ── */
const IMP_POI = {};
if (typeof POI_DATA !== 'undefined') {
  POI_DATA.forEach(p => {
    if (p.id && p.id.startsWith('imp-')) IMP_POI[p.id] = p;
  });
}

/* ──────────────────────────────────────────────────────────
   HELPERS
   ────────────────────────────────────────────────────────── */

/** Retorna [lat, lng] des de POI_DATA, o null si no trobat */
function impGetCoords(id) {
  const p = IMP_POI[id];
  return p ? [p.lat, p.lng] : null;
}

/** Retorna URL de Google Maps des de POI_DATA */
function impGetMapsUrl(id) {
  const p = IMP_POI[id];
  return p ? `https://maps.google.com/?q=${p.lat},${p.lng}` : '#';
}

/** Extreu un label llegible de la URL (hostname → taula o fallback) */
function impLinkLabel(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (IMP_DOMAIN_LABELS[host]) return IMP_DOMAIN_LABELS[host];
    // Fallback: primera part del host, capitalitzada, guions → espais
    return host.split('.')[0]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  } catch {
    return 'Més info';
  }
}

/**
 * Construeix la ruta de la foto.
 * El camp `fotos` del nou format és un prefix com "sete-cidades-0x".
 * Substituint 'x' per l'índex (1-based) s'obté el nom de fitxer: "sete-cidades-01".
 */
function impFotoSrc(fotosPrefix, i) {
  return `img/imprescindibles/${fotosPrefix.replace('x', i + 1)}.webp`;
}

/* ──────────────────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  impRenderFiltres();
  impRenderSeccions();
});

/* ──────────────────────────────────────────────────────────
   FILTRES PER ILLA
   ────────────────────────────────────────────────────────── */
function impRenderFiltres() {
  const wrap = document.getElementById('impFiltres');
  if (!wrap) return;

  wrap.innerHTML = `
    <button class="imp-filtre-btn ${impFiltreIlla === null ? 'actiu' : ''}"
            onclick="impSetFiltre(null)">
      🗺️ Totes les illes
    </button>
    ${ILLES_ORDRE.map(illa => {
      const cfg   = ILLES_CONFIG[illa];
      const actiu = impFiltreIlla === illa;
      return `
        <button class="imp-filtre-btn ${actiu ? 'actiu' : ''}"
                onclick="impSetFiltre('${illa}')"
                style="${actiu ? `background:${cfg.colorSuau};border-color:${cfg.color};color:${cfg.color}` : ''}">
          ${cfg.emoji} ${cfg.label}
        </button>`;
    }).join('')}
  `;
}

function impSetFiltre(illa) {
  impFiltreIlla = illa;
  impRenderFiltres();
  impRenderSeccions();

  setTimeout(() => {
    const primera = document.querySelector('.imp-seccio');
    if (primera) primera.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

/* ──────────────────────────────────────────────────────────
   RENDER SECCIONS PER ILLA
   ────────────────────────────────────────────────────────── */
function impRenderSeccions() {
  const wrap = document.getElementById('impSeccions');
  if (!wrap) return;

  // Destrueix mapes anteriors per evitar conflictes Leaflet
  Object.values(impMapes).forEach(m => { try { m.remove(); } catch (e) {} });
  impMapes    = {};
  impMapesInit = {};

  // Agrupa les entrades per illa
  const perIlla = {};
  Object.entries(IMPRESCINDIBLES).forEach(([id, dades]) => {
    const illa = dades.illa;
    if (!perIlla[illa]) perIlla[illa] = [];
    perIlla[illa].push({ id, ...dades });
  });

  const illesAMostrar = impFiltreIlla ? [impFiltreIlla] : ILLES_ORDRE;

  wrap.innerHTML = illesAMostrar.map((illa, idx) => {
    const cfg   = ILLES_CONFIG[illa];
    const items = perIlla[illa] || [];
    const mapId = `imp-map-${illa.replace(/\s/g, '-')}`;

    return `
      <section class="imp-seccio" style="animation-delay:${idx * 0.1}s" data-illa="${illa}">

        <!-- Capçalera d'illa -->
        <div class="imp-seccio-header" style="border-color:${cfg.colorBorde}">
          <span class="imp-seccio-emoji">${cfg.emoji}</span>
          <h2 class="imp-seccio-titol">${cfg.label}</h2>
          <span class="imp-seccio-count"
                style="background:${cfg.colorSuau};border-color:${cfg.colorBorde};color:${cfg.color}">
            ${items.length} llocs
          </span>
        </div>

        <!-- Mapa Leaflet -->
        <div class="imp-mapa-wrap">
          <div id="${mapId}" class="imp-mapa"></div>
        </div>

        <!-- Grid de cards -->
        <div class="imp-grid">
          ${items.map((item, li) => impRenderCard(item, cfg, li)).join('')}
        </div>

      </section>`;
  }).join('');

  // Inicialitza mapes lazy amb IntersectionObserver
  illesAMostrar.forEach(illa => {
    const mapId = `imp-map-${illa.replace(/\s/g, '-')}`;
    const el    = document.getElementById(mapId);
    if (!el) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !impMapesInit[mapId]) {
          impMapesInit[mapId] = true;
          impInicialitzaMapa(mapId, illa);
          observer.disconnect();
        }
      });
    }, { rootMargin: '200px' });

    observer.observe(el);
  });
}

/* ──────────────────────────────────────────────────────────
   RENDER CARD
   ────────────────────────────────────────────────────────── */
function impRenderCard(item, cfg, idx) {
  const id      = item.id;
  const emoji   = IMP_EMOJI[id]  || '📍';
  const desc    = IMP_DESCS[id]  || '';
  const mapsUrl = impGetMapsUrl(id);
  const nfotos  = item.nfotos   || 0;
  const teFotos = nfotos > 0;

  /* ── Carrusel ── */
  const slides = teFotos
    ? Array.from({ length: nfotos }, (_, i) =>
        `<div class="imp-carr-slide${i === 0 ? ' actiu' : ''}">
           <img class="imp-carr-img"
                src="${impFotoSrc(item.fotos, i)}"
                alt="${item.lloc}" loading="lazy">
         </div>`
      ).join('')
    : '';

  const dots = teFotos && nfotos > 1
    ? `<div class="imp-carr-dots" id="dots-${id}">
        ${Array.from({ length: nfotos }, (_, i) =>
          `<span class="imp-carr-dot${i === 0 ? ' actiu' : ''}"
                 onclick="impCarrDot('${id}',${i},event)"></span>`
        ).join('')}
       </div>`
    : '';

  const fotosHTML = teFotos
    ? `<div class="imp-carr" id="carr-${id}">
        <div class="imp-carr-track" id="track-${id}">${slides}</div>
        ${nfotos > 1 ? `
          <button class="imp-carr-btn prev" onclick="impCarrPrev('${id}',event)">‹</button>
          <button class="imp-carr-btn next" onclick="impCarrNext('${id}',event)">›</button>` : ''}
        ${dots}
       </div>`
    : `<div class="imp-carr imp-carr-buit">
        <span class="imp-carr-buit-icon">${emoji}</span>
       </div>`;

  /* ── Links ── */
  const linksHTML = item.links?.length
    ? `<div class="imp-card-links">
        <span class="imp-card-links-lbl">Més informació:</span>
        ${item.links.map(url =>
          `<a class="imp-card-link" href="${url}" target="_blank" rel="noopener">${impLinkLabel(url)}</a>`
        ).join('')}
       </div>`
    : '';

  return `
    <article class="imp-card" style="animation-delay:${idx * 0.06}s" data-id="${id}">
      ${fotosHTML}
      <div class="imp-card-cos">
        <div class="imp-card-header">
          <span class="imp-card-emoji">${emoji}</span>
          <h3 class="imp-card-nom">${item.lloc}</h3>
        </div>
        ${desc ? `<p class="imp-card-desc">${desc}</p>` : ''}
        <a class="imp-card-maps-btn" href="${mapsUrl}" target="_blank" rel="noopener"
           style="background:${cfg.colorSuau};border-color:${cfg.colorBorde};color:${cfg.color}">
          📍 Obrir a Google Maps
        </a>
        ${linksHTML}
      </div>
    </article>`;
}

/* ──────────────────────────────────────────────────────────
   CARRUSEL (basat en opacity + classe actiu)
   ────────────────────────────────────────────────────────── */
const impCarrIdx = {};

function impCarrActualitza(id) {
  const track = document.getElementById(`track-${id}`);
  const dots  = document.getElementById(`dots-${id}`);
  if (!track) return;
  const idx = impCarrIdx[id] || 0;

  track.querySelectorAll('.imp-carr-slide').forEach((slide, i) => {
    slide.classList.toggle('actiu', i === idx);
  });
  if (dots) {
    dots.querySelectorAll('.imp-carr-dot').forEach((d, i) => {
      d.classList.toggle('actiu', i === idx);
    });
  }
}

function impCarrPrev(id, e) {
  e?.stopPropagation();
  const dades = IMPRESCINDIBLES[id];
  if (!dades) return;
  const n = dades.nfotos || 0;
  impCarrIdx[id] = ((impCarrIdx[id] || 0) - 1 + n) % n;
  impCarrActualitza(id);
}

function impCarrNext(id, e) {
  e?.stopPropagation();
  const dades = IMPRESCINDIBLES[id];
  if (!dades) return;
  const n = dades.nfotos || 0;
  impCarrIdx[id] = ((impCarrIdx[id] || 0) + 1) % n;
  impCarrActualitza(id);
}

function impCarrDot(id, idx, e) {
  e?.stopPropagation();
  impCarrIdx[id] = idx;
  impCarrActualitza(id);
}

/* Swipe tàctil */
(function () {
  let startX = 0;
  document.addEventListener('touchstart', e => {
    if (e.target.closest('.imp-carr')) startX = e.touches[0].clientX;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const carr = e.target.closest('.imp-carr');
    if (!carr) return;
    const card = carr.closest('.imp-card');
    if (!card) return;
    const id = card.dataset.id;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) dx < 0 ? impCarrNext(id) : impCarrPrev(id);
  }, { passive: true });
})();

/* ──────────────────────────────────────────────────────────
   MAPA LEAFLET
   ────────────────────────────────────────────────────────── */
function impInicialitzaMapa(mapId, illa) {
  const cfg   = ILLES_CONFIG[illa];
  const items = Object.entries(IMPRESCINDIBLES)
    .filter(([, d]) => d.illa === illa)
    .map(([id, d]) => ({ id, ...d }));

  const map = L.map(mapId, {
    center: cfg.coords,
    zoom: cfg.zoom,
    zoomControl: true,
    scrollWheelZoom: false,
  });
  impMapes[illa] = map;

  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
    { attribution: '© OpenStreetMap © CARTO', maxZoom: 18 }
  ).addTo(map);

  items.forEach(item => {
    const coords = impGetCoords(item.id);
    if (!coords) return;   // POI_DATA no carregat o ID no trobat

    const emoji   = IMP_EMOJI[item.id] || '📍';
    const desc    = IMP_DESCS[item.id] || '';
    const mapsUrl = impGetMapsUrl(item.id);

    const icon = L.divIcon({
      className: '',
      html: `<div class="imp-marker" style="background:${cfg.color}">
               <span class="imp-marker-emoji">${emoji}</span>
             </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
    });

    const marker = L.marker(coords, { icon }).addTo(map);
    marker.bindPopup(`
      <div class="imp-popup">
        <div class="imp-popup-nom">${item.lloc}</div>
        ${desc ? `<div class="imp-popup-desc">${desc.slice(0, 100)}…</div>` : ''}
        <a href="${mapsUrl}" target="_blank" class="imp-popup-link">📍 Google Maps</a>
      </div>
    `, { maxWidth: 240 });

    // Clic al marcador → scroll fins a la card
    marker.on('click', () => {
      const card = document.querySelector(`[data-id="${item.id}"]`);
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}
