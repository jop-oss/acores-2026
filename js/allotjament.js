/* ============================================================
   ALLOTJAMENT.JS  ·  Açores 2026
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────
   DADES DELS ALLOTJAMENTS
   ────────────────────────────────────────────────────────── */
const ALLOTJAMENTS = [
  {
    id: 'santacristo',
    nom: 'Santo Cristo House',
    illa: 'São Miguel',
    localitat: 'Ponta Delgada',
    tipus: 'Casa sencera',
    adreca: 'Rua São Francisco Xavier nº 8, 9500-243',
    telefon: '+351 969 359 139',
    puntuacio: 8.8,
    entrada: '22 jul 2026',
    sortida: '24 jul 2026',
    nits: 2,
    horaArribada: '21:30 h',
    horaSortida: 'Abans de les 12 h',
    costTotal: 374,
    costNit: 187,
    coordenades: [37.74239172034, -25.6737514624388],
    habitacions: 3,
    llits: '2 dobles + 2 individuals',
    banys: 3,
    reserva: '6927405020',
    pin: '9024',
    cancelacio: 'No reemborsable',
    pagament: '22 abr 2026',
    idiomes: 'PT · EN',
    booking: 'https://www.booking.com/hotel/pt/santo-cristo-house.ca.html',
    fotos: { prefix: 'SantoCristo', total: 12 },
    equipament: ['Terrassa', 'Aire condicionat', 'Cuina', 'Nevera', 'Rentadora', 'TV', 'Wifi', 'Cafetera', 'Microones', 'Planxa', 'Assecador', 'Mobles exterior', 'Barbacoa', 'Piscina', 'Jocs de taula', 'Estacionament'],
    distancies: [
      { nom: 'Caldeira Velha', emoji: '♨️', km: 4.5, lat: 37.7690, lng: -25.5920 },
      { nom: 'Lagoa das Sete Cidades', emoji: '🌊', km: 15, lat: 37.8365, lng: -25.7816 },
      { nom: 'Lagoa do Fogo', emoji: '🔥', km: 28, lat: 37.7392, lng: -25.4697 },
      { nom: 'Furnas', emoji: '🌋', km: 38, lat: 37.7740, lng: -25.3265 },
      { nom: 'Ponta da Ferraria', emoji: '🌊', km: 22, lat: 37.8491, lng: -25.8499 },
      { nom: 'Nordeste (mirador)', emoji: '🏔️', km: 56, lat: 37.8396, lng: -25.1734 },
      { nom: 'Aeroport de Ponta Delgada', emoji: '✈️', km: 3, lat: 37.7412, lng: -25.6979 },
    ]
  },
  {
    id: 'cherimoya',
    nom: 'Casa Cherimoya — Retreat by the Sea',
    illa: 'São Miguel',
    localitat: 'Ribeira das Tainhas',
    tipus: 'Casa sencera',
    adreca: 'Rua Outeiro dos Álamos Brancos 26, 9680-512',
    telefon: '+351 964 737 851',
    puntuacio: null,
    entrada: '24 jul 2026',
    sortida: '28 jul 2026',
    nits: 4,
    horaArribada: 'A partir de les 17 h',
    horaSortida: '5:30 h',
    costTotal: 916.80,
    costNit: 229.20,
    coordenades: [37.7183503862364, -25.4093447361334],
    habitacions: 3,
    llits: '2 dobles grans + 2 dobles + sofà llit',
    banys: 2,
    reserva: '5834821478',
    pin: '7232',
    cancelacio: 'Gratuïta fins 23 jun 2026',
    pagament: '22 jun 2026',
    idiomes: 'PT · EN',
    booking: 'https://www.booking.com/hotel/pt/casa-cherimoya-your-retreat-by-the-sea.ca.html',
    fotos: { prefix: 'Cherimoya', total: 14 },
    equipament: ['Balcó', 'Vistes al mar', 'Aire condicionat', 'Cuina', 'Rentadora', 'Assecadora', 'TV', 'Wifi', 'Cafetera', 'Barbacoa', 'Rentaplats', 'Forn', 'Zona d\'estar', 'Entrada privada', 'Piscina privada', 'Sofà llit'],
    distancies: [
      { nom: 'Ribeira Grande (centre)', emoji: '🏘️', km: 8, lat: 37.8306, lng: -25.5147 },
      { nom: 'Lagoa do Fogo', emoji: '🔥', km: 12, lat: 37.7392, lng: -25.4697 },
      { nom: 'Caldeira Velha', emoji: '♨️', km: 14, lat: 37.7690, lng: -25.5920 },
      { nom: 'Poça da Beija', emoji: '🏊', km: 18, lat: 37.7720, lng: -25.3940 },
      { nom: 'Furnas (termes)', emoji: '🌋', km: 20, lat: 37.7740, lng: -25.3265 },
      { nom: 'Farol da Ferraria', emoji: '💡', km: 32, lat: 37.8491, lng: -25.8499 },
      { nom: 'Ponta Delgada centre', emoji: '🏙️', km: 28, lat: 37.7412, lng: -25.6698 },
    ]
  },
  {
    id: 'prainha',
    nom: 'Prainha Apartments',
    illa: 'Pico',
    localitat: 'São Roque do Pico',
    tipus: 'Apartament (2 unitats)',
    adreca: '9940 Canto da Areia',
    telefon: '+351 919 300 677',
    puntuacio: 7.7,
    entrada: '28 jul 2026',
    sortida: '31 jul 2026',
    nits: 3,
    horaArribada: '22:30 h',
    horaSortida: 'Abans de les 12 h',
    costTotal: 852,
    costNit: 284,
    coordenades: [38.460796725219, -28.192040476331],
    habitacions: 1,
    llits: '3 individuals',
    banys: 1,
    reserva: '6179234145',
    pin: '5053',
    cancelacio: 'Gratuïta fins 27 jun 2026',
    pagament: '26 jun 2026',
    idiomes: 'PT · EN · ES',
    booking: 'https://www.booking.com/hotel/pt/prainha-apartments.ca.html',
    fotos: { prefix: 'Prainha', total: 10 },
    equipament: ['Pati', 'Cuina', 'Nevera', 'Rentadora', 'TV', 'Wifi', 'Cafetera', 'Planxa', 'Assecador', 'Fogons', 'Dutxa', 'Entrada privada', 'Planta baixa', 'Zona de menjador', 'Bullidor elèctric', 'Roba de llit'],
    distancies: [
      { nom: 'Muntanya do Pico (cim, 2351m)', emoji: '🏔️', km: 16, lat: 38.4699, lng: -28.4020 },
      { nom: 'Madalena (port)', emoji: '⛴️', km: 9, lat: 38.5334, lng: -28.5295 },
      { nom: 'Lajes do Pico', emoji: '🐋', km: 26, lat: 38.3953, lng: -28.2528 },
      { nom: 'Lagoa do Capitão', emoji: '🌿', km: 20, lat: 38.4720, lng: -28.3620 },
      { nom: 'Mirador Pico Gordo', emoji: '👁️', km: 12, lat: 38.4815, lng: -28.3140 },
      { nom: 'Ferry Madalena–Horta (Faial)', emoji: '🚢', km: 9, lat: 38.5334, lng: -28.5295 },
      { nom: 'São Roque — passeig marítim', emoji: '🌊', km: 1, lat: 38.4622, lng: -28.1860 },
    ]
  },
  {
    id: 'refugio',
    nom: 'Refúgio',
    illa: 'Faial',
    localitat: 'Horta (Feteira)',
    tipus: 'Casa sencera',
    adreca: 'Quinhões nº 19, Feteira, 9900-361',
    telefon: '+351 969 134 555',
    puntuacio: 9.1,
    entrada: '31 jul 2026',
    sortida: '2 ago 2026',
    nits: 2,
    horaArribada: 'A partir de les 15 h',
    horaSortida: '9 h',
    costTotal: 470,
    costNit: 235,
    coordenades: [38.5249233992718, -28.6805700305922],
    habitacions: 4,
    llits: '3 dobles + 2 individuals',
    banys: 2,
    reserva: '5907923608',
    pin: '1971',
    cancelacio: 'No reemborsable',
    pagament: '22 abr 2026',
    idiomes: 'PT · EN',
    booking: 'https://www.booking.com/hotel/pt/refugio.ca.html',
    fotos: { prefix: 'Refugio', total: 16 },
    equipament: ['Piscina privada', 'Pati', 'Barbacoa', 'Cuina', 'Nevera', 'Rentadora', 'TV', 'Wifi', 'Cafetera', 'Microones', 'Forn', 'Zona exterior', 'Mobles exterior', 'Dutxa', 'Assecador', 'Entrada privada'],
    distancies: [
      { nom: 'Horta (centre)', emoji: '🏘️', km: 4, lat: 38.5322, lng: -28.6277 },
      { nom: 'Caldeira do Faial', emoji: '🌋', km: 8, lat: 38.5836, lng: -28.7041 },
      { nom: 'Capelinhos (vulcà submarí)', emoji: '🏝️', km: 18, lat: 38.5975, lng: -28.8337 },
      { nom: 'Marina Horta (port esportiu)', emoji: '⛵', km: 5, lat: 38.5278, lng: -28.6224 },
      { nom: 'Mirador da Espalamaca', emoji: '👁️', km: 6, lat: 38.5430, lng: -28.6650 },
      { nom: 'Praia do Porto Pim', emoji: '🏖️', km: 5, lat: 38.5240, lng: -28.6260 },
      { nom: 'Ferry Horta–Madalena (Pico)', emoji: '🚢', km: 4, lat: 38.5289, lng: -28.6280 },
    ]
  }
];

/* ──────────────────────────────────────────────────────────
   GENERACIÓ DE CARDS
   ────────────────────────────────────────────────────────── */
function generaCards() {
  const container = document.getElementById('allotCards');
  ALLOTJAMENTS.forEach((a, idx) => {
    const card = document.createElement('div');
    card.className = 'allot-card';
    card.id = `card-${a.id}`;
    card.innerHTML = buildCardHTML(a, idx);
    container.appendChild(card);
    initCarrusel(card, a);
    initMinimapa(card, a);
  });
}

function buildCardHTML(a) {
  const cancelClass = a.cancelacio.startsWith('Gratuïta') ? 'gratuita' : 'no-refund';
  const cancelText  = a.cancelacio.startsWith('Gratuïta') ? `✓ ${a.cancelacio}` : `✗ ${a.cancelacio}`;

  const equipTop = a.equipament.slice(0, 10);
  const equipRest = a.equipament.slice(10);
  const equipPills = equipTop.map(e => `<span class="allot-equip-pill">${e}</span>`).join('');
  const equipMore = equipRest.length
    ? `<button class="allot-equip-more" onclick="this.previousElementSibling.innerHTML+='${equipRest.map(e=>`<span class=\\'allot-equip-pill\\'>${e}</span>`).join('')}'; this.remove()">+${equipRest.length} més…</button>`
    : '';

  const distHTML = a.distancies.map(d => {
    const url = `https://www.google.com/maps/dir/${a.coordenades[0]},${a.coordenades[1]}/${d.lat},${d.lng}`;
    return `
      <div class="allot-dist-item">
        <span class="allot-dist-nom"><span>${d.emoji}</span>${d.nom}</span>
        <span class="allot-dist-km">~${d.km} km</span>
        <a href="${url}" target="_blank" class="allot-dist-link" title="Ruta a Google Maps">🗺 Ruta</a>
      </div>`;
  }).join('');

  const mapsURL = `https://www.google.com/maps?q=${a.coordenades[0]},${a.coordenades[1]}`;
  const rating = a.puntuacio ? `<div class="allot-rating-badge">★ ${a.puntuacio}</div>` : `<div class="allot-rating-badge" style="color:#8ca89a">Sense puntuació</div>`;

  return `
    <!-- Carrusel fotos -->
    <div class="allot-fotos" id="fotos-${a.id}">
      <div class="allot-fotos-track" id="track-${a.id}"></div>
      <button class="allot-fotos-prev" data-id="${a.id}">‹</button>
      <button class="allot-fotos-next" data-id="${a.id}">›</button>
      <div class="allot-fotos-dots" id="dots-${a.id}"></div>
      <button class="allot-fotos-expand" data-id="${a.id}" data-idx="0">⤢ Ampliar</button>
      <div class="allot-fotos-badge" id="fbadge-${a.id}">1 / ${a.fotos.total}</div>
      ${rating}
    </div>

    <!-- Cos -->
    <div class="allot-body">

      <!-- Capçalera -->
      <div class="allot-card-header">
        <div class="allot-card-titles">
          <h2 class="allot-card-nom">${a.nom}</h2>
          <span class="allot-card-illa">🏝 ${a.illa} · ${a.localitat}</span>
          <div class="allot-card-tipus">${a.tipus}</div>
        </div>
        <div class="allot-card-booking">
          <a href="${a.booking}" target="_blank">📋 Booking</a>
        </div>
      </div>

      <!-- Adreça -->
      <div class="allot-adresa-row">
        <span class="allot-adresa-icon">📍</span>
        <div class="allot-adresa-text">
          <a href="${mapsURL}" target="_blank">${a.adreca}</a><br/>
          <a href="tel:${a.telefon}">${a.telefon}</a>
        </div>
      </div>

      <!-- Grid info -->
      <div class="allot-info-grid">
        <div class="allot-info-item">
          <div class="allot-info-label">Check-in</div>
          <div class="allot-info-val highlight">${a.entrada}</div>
        </div>
        <div class="allot-info-item">
          <div class="allot-info-label">Check-out</div>
          <div class="allot-info-val highlight">${a.sortida}</div>
        </div>
        <div class="allot-info-item">
          <div class="allot-info-label">Nits</div>
          <div class="allot-info-val">${a.nits}</div>
        </div>
        <div class="allot-info-item">
          <div class="allot-info-label">Hora arribada</div>
          <div class="allot-info-val">🕒 ${a.horaArribada}</div>
        </div>
        <div class="allot-info-item">
          <div class="allot-info-label">Hora sortida</div>
          <div class="allot-info-val">🕐 ${a.horaSortida}</div>
        </div>
        <div class="allot-info-item">
          <div class="allot-info-label">Cost total</div>
          <div class="allot-info-val cost">${a.costTotal.toFixed(2)} €</div>
        </div>
        <div class="allot-info-item">
          <div class="allot-info-label">Cost per nit</div>
          <div class="allot-info-val">${a.costNit.toFixed(2)} €/nit</div>
        </div>
        <div class="allot-info-item">
          <div class="allot-info-label">Habitacions · Banys</div>
          <div class="allot-info-val">${a.habitacions} hab · ${a.banys} banys</div>
        </div>
        <div class="allot-info-item">
          <div class="allot-info-label">Llits</div>
          <div class="allot-info-val" style="font-size:0.8rem">${a.llits}</div>
        </div>
        <div class="allot-info-item">
          <div class="allot-info-label">Idiomes</div>
          <div class="allot-info-val">${a.idiomes}</div>
        </div>
        <div class="allot-info-item">
          <div class="allot-info-label">Coordenades</div>
          <div class="allot-info-val" style="font-size:0.78rem;font-family:monospace;color:var(--allot-muted)">${a.coordenades[0].toFixed(5)}, ${a.coordenades[1].toFixed(5)}</div>
        </div>
      </div>

      <!-- Strip reserva -->
      <div class="allot-reserva-strip">
        <span class="allot-reserva-item">🔖 Reserva <strong>${a.reserva}</strong></span>
        <span class="allot-reserva-item">🔑 PIN <strong>${a.pin}</strong></span>
        <span class="allot-reserva-item">💳 Pagat <strong>${a.pagament}</strong></span>
        <span class="allot-cancel ${cancelClass}">${cancelText}</span>
      </div>

      <!-- Equipament -->
      <div class="allot-equipament">
        <div class="allot-equip-title">Equipament destacat</div>
        <div class="allot-equip-pills">${equipPills}</div>
        ${equipMore}
      </div>

      <!-- Mini mapa -->
      <div class="allot-map-wrap">
        <div class="allot-map-mini" id="mapa-${a.id}"></div>
        <button class="allot-map-overlay-btn" data-id="${a.id}">⤢ Ampliar mapa</button>
      </div>

      <!-- Distàncies -->
      <div class="allot-distancies">
        <div class="allot-dist-title">📏 Distàncies als punts d'interès</div>
        <div class="allot-dist-list">${distHTML}</div>
      </div>

      <!-- Accions -->
      <div class="allot-actions">
        <a href="${mapsURL}" target="_blank" class="btn-allot btn-allot-primary">
          🗺 Obrir a Google Maps
        </a>
        <button class="btn-allot btn-allot-secondary" data-open-map="${a.id}">
          🔍 Calcular ruta
        </button>
        <a href="${a.booking}" target="_blank" class="btn-allot btn-allot-secondary">
          📋 Veure a Booking
        </a>
      </div>

    </div>
  `;
}

/* ──────────────────────────────────────────────────────────
   CARRUSEL DE FOTOS
   ────────────────────────────────────────────────────────── */
function initCarrusel(card, a) {
  const track  = card.querySelector(`#track-${a.id}`);
  const dots   = card.querySelector(`#dots-${a.id}`);
  const badge  = card.querySelector(`#fbadge-${a.id}`);
  let current  = 0;

  // Genera les imatges amb lazy load
  for (let i = 1; i <= a.fotos.total; i++) {
    const img = document.createElement('img');
    const num = String(i).padStart(2, '0');
    img.src = `img/allotjaments/${a.fotos.prefix}${num}.jpg`;
    img.alt = `${a.nom} — foto ${i}`;
    img.loading = 'lazy';
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => obreGaleria(a, i - 1));
    track.appendChild(img);

    const dot = document.createElement('div');
    dot.className = 'allot-fotos-dot' + (i === 1 ? ' actiu' : '');
    dots.appendChild(dot);
  }

  function ves(idx) {
    current = (idx + a.fotos.total) % a.fotos.total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.querySelectorAll('.allot-fotos-dot').forEach((d, i) => d.classList.toggle('actiu', i === current));
    badge.textContent = `${current + 1} / ${a.fotos.total}`;
  }

  card.querySelector(`.allot-fotos-prev`).addEventListener('click', e => { e.stopPropagation(); ves(current - 1); });
  card.querySelector(`.allot-fotos-next`).addEventListener('click', e => { e.stopPropagation(); ves(current + 1); });
  card.querySelector(`.allot-fotos-expand`).addEventListener('click', () => obreGaleria(a, current));

  // Swipe tàctil
  let touchX = null;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) ves(dx < 0 ? current + 1 : current - 1);
    touchX = null;
  });
}

/* ──────────────────────────────────────────────────────────
   MODAL GALERIA FOTOS
   ────────────────────────────────────────────────────────── */
let galeria = { allot: null, idx: 0 };

function obreGaleria(a, idx) {
  galeria = { allot: a, idx };
  actualitzaGaleria();
  document.getElementById('fotoModal').classList.add('open');
  document.getElementById('fotoModalOverlay').classList.add('open');
}

function actualitzaGaleria() {
  const { allot: a, idx } = galeria;
  const num = String(idx + 1).padStart(2, '0');
  document.getElementById('fotoModalImg').src = `img/allotjaments/${a.fotos.prefix}${num}.jpg`;
  document.getElementById('fotoCounter').textContent = `${idx + 1} / ${a.fotos.total}`;
}

function tancaGaleria() {
  document.getElementById('fotoModal').classList.remove('open');
  document.getElementById('fotoModalOverlay').classList.remove('open');
}

document.getElementById('fotoModalClose').addEventListener('click', tancaGaleria);
document.getElementById('fotoModalOverlay').addEventListener('click', tancaGaleria);
document.getElementById('fotoPrev').addEventListener('click', () => {
  galeria.idx = (galeria.idx - 1 + galeria.allot.fotos.total) % galeria.allot.fotos.total;
  actualitzaGaleria();
});
document.getElementById('fotoNext').addEventListener('click', () => {
  galeria.idx = (galeria.idx + 1) % galeria.allot.fotos.total;
  actualitzaGaleria();
});
document.addEventListener('keydown', e => {
  if (!document.getElementById('fotoModal').classList.contains('open')) return;
  if (e.key === 'ArrowLeft') document.getElementById('fotoPrev').click();
  if (e.key === 'ArrowRight') document.getElementById('fotoNext').click();
  if (e.key === 'Escape') tancaGaleria();
});

/* ──────────────────────────────────────────────────────────
   MINIMAPES LEAFLET
   ────────────────────────────────────────────────────────── */
const mapesIniciats = {};

function initMinimapa(card, a) {
  const div = card.querySelector(`#mapa-${a.id}`);
  if (!div || mapesIniciats[a.id]) return;

  // Inicialitzem el mapa quan sigui visible (IntersectionObserver)
  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    creaMinimapa(a);
  }, { threshold: 0.1 });
  observer.observe(div);
}

function creaMinimapa(a) {
  if (mapesIniciats[a.id]) return;
  mapesIniciats[a.id] = true;

  const map = L.map(`mapa-${a.id}`, {
    center: a.coordenades,
    zoom: 13,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: false,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);

  // Marcador allotjament
  const icon = L.divIcon({
    html: '<div style="background:#6aab7a;width:18px;height:18px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.5);"></div>',
    iconSize: [18, 18], iconAnchor: [9, 9], className: ''
  });
  L.marker(a.coordenades, { icon })
    .addTo(map)
    .bindPopup(`<b>${a.nom}</b><br>${a.localitat}`)
    .openPopup();

  // Marcadors de punts d'interès (petits)
  const iconPOI = L.divIcon({
    html: '<div style="background:#f5c842;width:10px;height:10px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>',
    iconSize: [10, 10], iconAnchor: [5, 5], className: ''
  });
  a.distancies.forEach(d => {
    L.marker([d.lat, d.lng], { icon: iconPOI })
      .addTo(map)
      .bindPopup(`${d.emoji} ${d.nom}`);
  });

  // Click al mapa → calcula ruta fins aquell punt
  let marcadorRuta = null;
  let routingControl = null;

  map.on('click', async (e) => {
    const dest = e.latlng;

    // Treu el marcador anterior
    if (marcadorRuta) map.removeLayer(marcadorRuta);

    const iconDest = L.divIcon({
      html: '<div style="background:#e74c3c;width:14px;height:14px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.5);"></div>',
      iconSize: [14, 14], iconAnchor: [7, 7], className: ''
    });
    marcadorRuta = L.marker(dest, { icon: iconDest }).addTo(map);

    // Dibuixa línia directa mentre calcula
    if (routingControl) map.removeLayer(routingControl);
    routingControl = L.polyline([a.coordenades, [dest.lat, dest.lng]], {
      color: '#6aab7a', weight: 3, opacity: 0.7, dashArray: '6,4'
    }).addTo(map);

    // Crida OpenRouteService per ruta real
    try {
      const orsUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248a60de2eb7a3d49fb9e45d82fa98fb8c2&start=${a.coordenades[1]},${a.coordenades[0]}&end=${dest.lng},${dest.lat}`;
      const resp = await fetch(orsUrl);
      const data = await resp.json();
      const props = data.features[0].properties.segments[0];
      const coords = data.features[0].geometry.coordinates.map(c => [c[1], c[0]]);

      map.removeLayer(routingControl);
      routingControl = L.polyline(coords, { color: '#6aab7a', weight: 4, opacity: 0.9 }).addTo(map);

      const km = (props.distance / 1000).toFixed(1);
      const min = Math.round(props.duration / 60);
      const h = Math.floor(min / 60), m = min % 60;
      const temps = h > 0 ? `${h}h ${m}min` : `${m} min`;
      marcadorRuta.bindPopup(`📍 Distància: <b>${km} km</b><br>⏱ Temps: <b>${temps}</b>`).openPopup();
    } catch {
      // Fallback: distància aproximada en línia recta
      const d = map.distance(L.latLng(a.coordenades), dest);
      marcadorRuta.bindPopup(`📍 ~${(d / 1000).toFixed(1)} km (línia recta)`).openPopup();
    }
  });

  mapesIniciats[a.id + '_map'] = map;
}

/* ──────────────────────────────────────────────────────────
   MODAL MAPA GRAN (per al botó "Calcular ruta")
   ────────────────────────────────────────────────────────── */
let modalMap = null;

function obreModalMapa(id) {
  const a = ALLOTJAMENTS.find(x => x.id === id);
  if (!a) return;

  document.getElementById('mapModalTitle').textContent = `${a.nom} — ${a.localitat}`;
  document.getElementById('mapModal').classList.add('open');
  document.getElementById('mapModalOverlay').classList.add('open');
  document.getElementById('mapRouteInfo').style.display = 'none';

  setTimeout(() => {
    if (modalMap) {
      modalMap.remove();
      modalMap = null;
    }
    modalMap = L.map('mapModalMap', {
      center: a.coordenades,
      zoom: 13,
      zoomControl: true,
      attributionControl: false,
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(modalMap);

    const icon = L.divIcon({
      html: '<div style="background:#6aab7a;width:20px;height:20px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,0.5);"></div>',
      iconSize: [20, 20], iconAnchor: [10, 10], className: ''
    });
    L.marker(a.coordenades, { icon })
      .addTo(modalMap)
      .bindPopup(`<b>${a.nom}</b><br>${a.adreca}`)
      .openPopup();

    // Marcadors POI
    const iconPOI = L.divIcon({
      html: '<div style="background:#f5c842;width:12px;height:12px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,0.4);"></div>',
      iconSize: [12, 12], iconAnchor: [6, 6], className: ''
    });
    a.distancies.forEach(d => {
      L.marker([d.lat, d.lng], { icon: iconPOI }).addTo(modalMap)
        .bindPopup(`${d.emoji} <b>${d.nom}</b><br>~${d.km} km`);
    });

    let marcadorRuta = null, polyRuta = null;

    modalMap.on('click', async (e) => {
      const dest = e.latlng;
      if (marcadorRuta) modalMap.removeLayer(marcadorRuta);
      if (polyRuta)     modalMap.removeLayer(polyRuta);

      const iconD = L.divIcon({
        html: '<div style="background:#e74c3c;width:16px;height:16px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.5);"></div>',
        iconSize: [16, 16], iconAnchor: [8, 8], className: ''
      });
      marcadorRuta = L.marker(dest, { icon: iconD }).addTo(modalMap);

      polyRuta = L.polyline([a.coordenades, [dest.lat, dest.lng]], {
        color: '#6aab7a', weight: 3, dashArray: '6,4', opacity: 0.6
      }).addTo(modalMap);

      const gmUrl = `https://www.google.com/maps/dir/${a.coordenades[0]},${a.coordenades[1]}/${dest.lat},${dest.lng}`;
      document.getElementById('routeExternal').href = gmUrl;

      try {
        const orsUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248a60de2eb7a3d49fb9e45d82fa98fb8c2&start=${a.coordenades[1]},${a.coordenades[0]}&end=${dest.lng},${dest.lat}`;
        const resp = await fetch(orsUrl);
        const data = await resp.json();
        const props = data.features[0].properties.segments[0];
        const coords = data.features[0].geometry.coordinates.map(c => [c[1], c[0]]);

        modalMap.removeLayer(polyRuta);
        polyRuta = L.polyline(coords, { color: '#6aab7a', weight: 4, opacity: 0.9 }).addTo(modalMap);
        modalMap.fitBounds(polyRuta.getBounds(), { padding: [30, 30] });

        const km = (props.distance / 1000).toFixed(1);
        const min = Math.round(props.duration / 60);
        const h = Math.floor(min / 60), m = min % 60;
        const temps = h > 0 ? `${h}h ${m}min` : `${m} min`;

        document.getElementById('routeDistance').textContent = `📍 ${km} km`;
        document.getElementById('routeDuration').textContent = `⏱ ${temps}`;
        document.getElementById('mapRouteInfo').style.display = 'flex';
        marcadorRuta.bindPopup(`<b>${km} km · ${temps}</b>`).openPopup();
      } catch {
        const d = modalMap.distance(L.latLng(a.coordenades), dest);
        document.getElementById('routeDistance').textContent = `📍 ~${(d / 1000).toFixed(1)} km (línia recta)`;
        document.getElementById('routeDuration').textContent = '';
        document.getElementById('mapRouteInfo').style.display = 'flex';
      }
    });
  }, 100);
}

document.getElementById('mapModalClose').addEventListener('click', tancaModalMapa);
document.getElementById('mapModalOverlay').addEventListener('click', tancaModalMapa);

function tancaModalMapa() {
  document.getElementById('mapModal').classList.remove('open');
  document.getElementById('mapModalOverlay').classList.remove('open');
  if (modalMap) { modalMap.remove(); modalMap = null; }
}

/* ──────────────────────────────────────────────────────────
   EVENTS DELEGATS (botons dins les cards)
   ────────────────────────────────────────────────────────── */
document.addEventListener('click', e => {
  const btnMap = e.target.closest('[data-open-map]');
  if (btnMap) obreModalMapa(btnMap.dataset.openMap);

  const btnAmp = e.target.closest('.allot-map-overlay-btn');
  if (btnAmp) obreModalMapa(btnAmp.dataset.id);
});

/* ──────────────────────────────────────────────────────────
   TIMELINE — scroll fins a la card corresponent
   ────────────────────────────────────────────────────────── */
document.querySelectorAll('.tl-item').forEach((item, i) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.tl-item').forEach(x => x.classList.remove('tl-active'));
    item.classList.add('tl-active');
    const card = document.getElementById(`card-${ALLOTJAMENTS[i].id}`);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ──────────────────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', generaCards);
