/* ============================================================
   IMPRESCINDIBLES.JS  ·  Açores 2026
   ============================================================ */

'use strict';

/* ── ESTAT ── */
let impFiltreIlla = null;   // null = totes
let impMapes      = {};     // { 'São Miguel': leafletMap, ... }
let impMapesInit  = {};     // { id: bool } — mapes ja inicialitzats

/* ── INIT ── */
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
      const cfg = ILLES_CONFIG[illa];
      return `
        <button class="imp-filtre-btn ${impFiltreIlla === illa ? 'actiu' : ''}"
                onclick="impSetFiltre('${illa}')"
                style="${impFiltreIlla === illa ? `background:${cfg.colorSuau};border-color:${cfg.color};color:${cfg.color}` : ''}">
          ${cfg.emoji} ${illa}
        </button>`;
    }).join('')}
  `;
}

function impSetFiltre(illa) {
  impFiltreIlla = illa;
  impRenderFiltres();
  impRenderSeccions();

  // Scroll suau fins a la primera secció visible
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
  Object.values(impMapes).forEach(m => { try { m.remove(); } catch(e) {} });
  impMapes = {};
  impMapesInit = {};

  const illesAMostrar = impFiltreIlla
    ? [impFiltreIlla]
    : ILLES_ORDRE;

  wrap.innerHTML = illesAMostrar.map((illa, idx) => {
    const cfg    = ILLES_CONFIG[illa];
    const llocs  = IMPRESCINDIBLES.filter(l => l.illa === illa);
    const mapId  = `imp-map-${illa.replace(/\s/g, '-')}`;

    return `
      <section class="imp-seccio" style="animation-delay:${idx * 0.1}s" data-illa="${illa}">

        <!-- Capçalera d'illa -->
        <div class="imp-seccio-header" style="border-color:${cfg.colorBorde}">
          <span class="imp-seccio-emoji">${cfg.emoji}</span>
          <h2 class="imp-seccio-titol">${illa}</h2>
          <span class="imp-seccio-count" style="background:${cfg.colorSuau};border-color:${cfg.colorBorde};color:${cfg.color}">
            ${llocs.length} llocs
          </span>
        </div>

        <!-- Mapa Leaflet -->
        <div class="imp-mapa-wrap">
          <div id="${mapId}" class="imp-mapa"></div>
        </div>

        <!-- Grid de cards -->
        <div class="imp-grid">
          ${llocs.map((lloc, li) => impRenderCard(lloc, cfg, li)).join('')}
        </div>

      </section>`;
  }).join('');

  // Inicialitza mapes amb IntersectionObserver (lazy)
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
function impRenderCard(lloc, cfg, idx) {
  const teFotos = lloc.fotos > 0;

  // Genera els botons del carrusel
  const fotosDots = teFotos
    ? `<div class="imp-carr-dots" id="dots-${lloc.id}">
        ${Array.from({length: lloc.fotos}, (_, i) =>
          `<span class="imp-carr-dot ${i === 0 ? 'actiu' : ''}" onclick="impCarrDot('${lloc.id}',${i},event)"></span>`
        ).join('')}
       </div>`
    : '';

  const fotosHTML = teFotos
    ? `<div class="imp-carr" id="carr-${lloc.id}">
        <div class="imp-carr-track" id="track-${lloc.id}">
          ${Array.from({length: lloc.fotos}, (_, i) =>
            `<div class="imp-carr-slide">
               <img class="imp-carr-img" src="img/imprescindibles/${lloc.prefix}-${String(i+1).padStart(2,'0')}.webp"
                    alt="${lloc.nom}" loading="lazy" onerror="this.parentElement.style.display='none'">
             </div>`
          ).join('')}
        </div>
        ${lloc.fotos > 1 ? `
          <button class="imp-carr-btn prev" onclick="impCarrPrev('${lloc.id}',event)">‹</button>
          <button class="imp-carr-btn next" onclick="impCarrNext('${lloc.id}',event)">›</button>
        ` : ''}
        ${fotosDots}
       </div>`
    : `<div class="imp-carr imp-carr-buit">
        <span class="imp-carr-buit-icon">${lloc.emoji}</span>
       </div>`;

  const linksHTML = lloc.links?.length
    ? `<div class="imp-card-links">
        <span class="imp-card-links-lbl">Més informació:</span>
        ${lloc.links.map(l =>
          `<a class="imp-card-link" href="${l.url}" target="_blank" rel="noopener">${l.text}</a>`
        ).join('')}
       </div>`
    : '';

  return `
    <article class="imp-card" style="animation-delay:${idx * 0.06}s" data-id="${lloc.id}">
      ${fotosHTML}
      <div class="imp-card-cos">
        <div class="imp-card-header">
          <span class="imp-card-emoji">${lloc.emoji}</span>
          <h3 class="imp-card-nom">${lloc.nom}</h3>
        </div>
        <p class="imp-card-desc">${lloc.desc}</p>
        <a class="imp-card-maps-btn" href="${lloc.maps}" target="_blank" rel="noopener"
           style="background:${cfg.colorSuau};border-color:${cfg.colorBorde};color:${cfg.color}">
          📍 Obrir a Google Maps
        </a>
        ${linksHTML}
      </div>
    </article>`;
}

/* ──────────────────────────────────────────────────────────
   CARRUSEL
   ────────────────────────────────────────────────────────── */
const impCarrIdx = {}; // { id: índex actual }

function impCarrActualitza(id) {
  const track = document.getElementById(`track-${id}`);
  const dots  = document.getElementById(`dots-${id}`);
  if (!track) return;
  const idx = impCarrIdx[id] || 0;
  track.style.transform = `translateX(-${idx * 100}%)`;
  if (dots) {
    dots.querySelectorAll('.imp-carr-dot').forEach((d, i) => {
      d.classList.toggle('actiu', i === idx);
    });
  }
}

function impCarrPrev(id, e) {
  e?.stopPropagation();
  const lloc = IMPRESCINDIBLES.find(l => l.id === id);
  if (!lloc) return;
  impCarrIdx[id] = ((impCarrIdx[id] || 0) - 1 + lloc.fotos) % lloc.fotos;
  impCarrActualitza(id);
}

function impCarrNext(id, e) {
  e?.stopPropagation();
  const lloc = IMPRESCINDIBLES.find(l => l.id === id);
  if (!lloc) return;
  impCarrIdx[id] = ((impCarrIdx[id] || 0) + 1) % lloc.fotos;
  impCarrActualitza(id);
}

function impCarrDot(id, idx, e) {
  e?.stopPropagation();
  impCarrIdx[id] = idx;
  impCarrActualitza(id);
}

/* Swipe tàctil al carrusel */
(function() {
  let startX = 0;
  document.addEventListener('touchstart', e => {
    const carr = e.target.closest('.imp-carr');
    if (carr) startX = e.touches[0].clientX;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const carr = e.target.closest('.imp-carr');
    if (!carr) return;
    const card = carr.closest('.imp-card');
    if (!card) return;
    const id = card.dataset.id;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? impCarrNext(id) : impCarrPrev(id);
    }
  }, { passive: true });
})();

/* ──────────────────────────────────────────────────────────
   MAPA LEAFLET
   ────────────────────────────────────────────────────────── */
function impInicialitzaMapa(mapId, illa) {
  const cfg   = ILLES_CONFIG[illa];
  const llocs = IMPRESCINDIBLES.filter(l => l.illa === illa);

  const map = L.map(mapId, {
    center: cfg.coords,
    zoom:   cfg.zoom,
    zoomControl: true,
    scrollWheelZoom: false,
  });

  impMapes[illa] = map;

  // Capa CartoDB Voyager
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
    { attribution: '© OpenStreetMap © CARTO', maxZoom: 18 }
  ).addTo(map);

  // Marcadors
  llocs.forEach(lloc => {
    const icon = L.divIcon({
      className: '',
      html: `<div class="imp-marker" style="background:${cfg.color}">
               <span class="imp-marker-emoji">${lloc.emoji}</span>
             </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
    });

    const marker = L.marker(lloc.coords, { icon }).addTo(map);
    marker.bindPopup(`
      <div class="imp-popup">
        <div class="imp-popup-nom">${lloc.nom}</div>
        <div class="imp-popup-desc">${lloc.desc.slice(0, 100)}…</div>
        <a href="${lloc.maps}" target="_blank" class="imp-popup-link">📍 Google Maps</a>
      </div>
    `, { maxWidth: 240 });

    // Clic al marcador: scroll fins a la card corresponent
    marker.on('click', () => {
      const card = document.querySelector(`[data-id="${lloc.id}"]`);
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}
