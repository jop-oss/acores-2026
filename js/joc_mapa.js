/* =============================================
   JOC MAPA · On és això? · Açores 2026
   ============================================= */

// ── CONSTANTS ─────────────────────────────────────────────────
const MAPA_STORAGE_KEY = 'joc_mapa_estat_';
const TOTAL_LLOCS = LLOCS_MAPA.length;
const PUNTS_MAX = LLOCS_MAPA.length * 10;

// Bounds de les Açores per centrar el mapa
const AZORES_CENTER = [38.5, -27.8];
const AZORES_ZOOM = 7;

// ── ESTAT ─────────────────────────────────────────────────────
let jugadorActiu = null;
let jocActiu = null;        // { jugador, ordre, idx, punts, stats, completat }
let mapaLeaflet = null;     // instància Leaflet pantalla joc
let mapaResultat = null;    // instància Leaflet pantalla resultat
let markerJugador = null;   // marker clicat pel jugador
let clickLat = null;
let clickLon = null;

// ── JUGADORS (reutilitzem de jocs-data.js si existeix, o definim aquí) ──
const MAPA_JUGADORS = typeof JUGADORS_VALIDS !== 'undefined' ? JUGADORS_VALIDS : ['Jordi','Anna','Laia','Mons','Xu','Joa'];
const MAPA_IMGS = typeof IMGS !== 'undefined' ? IMGS : {};

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderJugadorsGrid();
  mostraScreen('select');
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });
});

// ── GRID JUGADORS ─────────────────────────────────────────────
function renderJugadorsGrid() {
  const grid = document.getElementById('jugadors-grid');
  grid.innerHTML = MAPA_JUGADORS.map(nom => {
    const estat = carregarEstat(nom);
    const pts = estat ? estat.punts : 0;
    const prog = estat && estat.completat ? 'Completat ✓' : estat && estat.idx > 0 ? `${estat.idx}/${TOTAL_LLOCS}` : 'Nou joc';
    return `
      <button class="jugador-btn" data-nom="${nom}" onclick="seleccionarJugador('${nom}')">
        <img class="jugador-avatar" src="${MAPA_IMGS[nom] || ''}" alt="${nom}">
        <span class="jugador-nom-btn">${nom}</span>
        <span class="jugador-pts">${pts} pts · ${prog}</span>
      </button>`;
  }).join('');
}

function seleccionarJugador(nom) {
  jugadorActiu = nom;
  renderStartScreen();
  mostraScreen('start');
}

// ── PANTALLA INICI ────────────────────────────────────────────
function renderStartScreen() {
  const nom = jugadorActiu;
  const estat = carregarEstat(nom);

  document.getElementById('jugador-actiu-avatar').src = MAPA_IMGS[nom] || '';
  document.getElementById('jugador-actiu-nom').textContent = nom;

  const progWrap = document.getElementById('progres-wrap');
  const btnReinici = document.getElementById('btn-reiniciar');
  const btnStart = document.getElementById('btn-start-joc');

  if (estat && !estat.completat && estat.idx > 0) {
    progWrap.style.display = 'block';
    document.getElementById('progres-fill').style.width = `${(estat.idx / TOTAL_LLOCS) * 100}%`;
    document.getElementById('progres-text').textContent = `${estat.idx} de ${TOTAL_LLOCS} llocs`;
    document.getElementById('progres-punts-text').textContent = `${estat.punts} pts`;
    document.getElementById('progres-badge').textContent = 'Repren on ho vas deixar →';
    btnStart.textContent = 'Continuar el joc ▶';
    btnReinici.style.display = 'block';
    document.getElementById('jugador-actiu-sub').textContent = `${estat.punts} punts · en curs`;
  } else if (estat && estat.completat) {
    progWrap.style.display = 'none';
    btnStart.textContent = 'Veure resultat 🏆';
    btnReinici.style.display = 'block';
    document.getElementById('jugador-actiu-sub').textContent = `${estat.punts} punts · completat`;
  } else {
    progWrap.style.display = 'none';
    btnStart.textContent = 'Comença el joc 🗺️';
    btnReinici.style.display = 'none';
    document.getElementById('jugador-actiu-sub').textContent = 'Nou joc · 0 punts';
  }

  renderRanking();
}

// ── RÀNQUING ──────────────────────────────────────────────────
function renderRanking() {
  const llista = MAPA_JUGADORS.map(nom => {
    const estat = carregarEstat(nom);
    return { nom, punts: estat ? estat.punts : 0, completat: estat ? estat.completat : false, idx: estat ? estat.idx : 0 };
  }).sort((a, b) => b.punts - a.punts);

  const posEmoji = ['🥇','🥈','🥉'];
  document.getElementById('ranking-list-home').innerHTML = llista.map((r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
      <div class="ranking-pos ${i<3?'p'+(i+1):'other'}">${i<3?posEmoji[i]:i+1}</div>
      <img class="rank-avatar" src="${MAPA_IMGS[r.nom] || ''}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div class="rank-barra-wrap"><div class="rank-barra" style="width:${(r.punts/PUNTS_MAX)*100}%"></div></div>
      </div>
      <div style="text-align:right">
        <div class="rank-punts">${r.punts}</div>
        <span class="rank-partides">${r.completat ? 'Completat ✓' : r.idx > 0 ? `${r.idx}/${TOTAL_LLOCS}` : 'No iniciat'}</span>
      </div>
    </div>`).join('');
}

// ── INICIAR JOC ───────────────────────────────────────────────
function iniciarJoc() {
  const estat = carregarEstat(jugadorActiu);

  if (estat && estat.completat) {
    mostrarResultatFinal(estat);
    return;
  }

  if (estat && estat.idx > 0 && !estat.completat) {
    jocActiu = estat;
  } else {
    const ordre = [...LLOCS_MAPA].map(l => l.id).sort(() => Math.random() - 0.5);
    jocActiu = {
      jugador: jugadorActiu,
      ordre,
      idx: 0,
      punts: 0,
      stats: { perfectes: 0, bons: 0, approx: 0, errors: 0 },
      completat: false
    };
    guardarEstat(jugadorActiu, jocActiu);
  }

  mostraScreen('joc');
  inicialitzaMapa();
  mostrarLloc();
}

// ── MAPA LEAFLET ──────────────────────────────────────────────
function inicialitzaMapa() {
  // Destrueix el mapa anterior si existeix
  if (mapaLeaflet) {
    mapaLeaflet.remove();
    mapaLeaflet = null;
  }

  mapaLeaflet = L.map('mapa-leaflet', {
    center: AZORES_CENTER,
    zoom: AZORES_ZOOM,
    zoomControl: true,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© CartoDB',
    subdomains: 'abcd',
    maxZoom: 18
  }).addTo(mapaLeaflet);

  markerJugador = null;
  clickLat = null;
  clickLon = null;

  mapaLeaflet.on('click', onMapaClick);
}

function onMapaClick(e) {
  clickLat = e.latlng.lat;
  clickLon = e.latlng.lng;

  // Elimina marker anterior
  if (markerJugador) mapaLeaflet.removeLayer(markerJugador);

  // Marker personalitzat
  const icon = L.divIcon({
    className: '',
    html: '<div class="marker-jugador">📍</div>',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  markerJugador = L.marker([clickLat, clickLon], { icon }).addTo(mapaLeaflet);

  // Mostra botó confirmar
  document.getElementById('btn-confirmar').style.display = 'block';
  document.getElementById('mapa-hint').style.display = 'none';
}

// ── MOSTRAR LLOC ──────────────────────────────────────────────
function mostrarLloc() {
  clickLat = null;
  clickLon = null;
  if (markerJugador && mapaLeaflet) {
    mapaLeaflet.removeLayer(markerJugador);
    markerJugador = null;
  }

  document.getElementById('btn-confirmar').style.display = 'none';
  document.getElementById('mapa-hint').style.display = 'block';

  const idLloc = jocActiu.ordre[jocActiu.idx];
  const lloc = LLOCS_MAPA.find(l => l.id === idLloc);

  const total = jocActiu.ordre.length;
  document.getElementById('prog-text').textContent = `Lloc ${jocActiu.idx + 1} de ${total}`;
  document.getElementById('prog-fill').style.width = `${(jocActiu.idx / total) * 100}%`;
  document.getElementById('score-live').textContent = jocActiu.punts;

  document.getElementById('q-cat-badge').textContent = `${CAT_EMOJI[lloc.categoria]} ${CAT_LABEL[lloc.categoria]}`;
  document.getElementById('q-illa-badge').textContent = lloc.trampa ? '🎭 Sorpresa!' : `🏝️ ${lloc.illa}`;
  document.getElementById('q-illa-badge').style.display = lloc.trampa ? 'inline-block' : 'none';
  document.getElementById('pregunta-nom').textContent = lloc.nom;
  document.getElementById('pregunta-instruccio').textContent = 'Clica al mapa on creus que és';

  // Animació card
  const card = document.getElementById('pregunta-card');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = 'slideIn .3s ease'; });

  // Reset mapa al centre de les Açores
  mapaLeaflet.setView(AZORES_CENTER, AZORES_ZOOM);
}

// ── CONFIRMAR RESPOSTA ────────────────────────────────────────
function confirmarResposta() {
  if (clickLat === null) return;

  const idLloc = jocActiu.ordre[jocActiu.idx];
  const lloc = LLOCS_MAPA.find(l => l.id === idLloc);

  const dist = distanciaKm(clickLat, clickLon, lloc.lat, lloc.lon);
  const pts = puntsPerDistancia(dist);

  // Actualitza stats
  if (pts === 10) jocActiu.stats.perfectes++;
  else if (pts === 5) jocActiu.stats.bons++;
  else if (pts === 2) jocActiu.stats.approx++;
  else jocActiu.stats.errors++;

  jocActiu.punts += pts;
  guardarEstat(jugadorActiu, jocActiu);

  mostrarResultatLloc(lloc, dist, pts);
}

// ── RESULTAT LLOC ─────────────────────────────────────────────
function mostrarResultatLloc(lloc, dist, pts) {
  // Badge punts
  const badge = document.getElementById('res-pts-badge');
  badge.textContent = pts > 0 ? `+${pts} pts` : '0 pts';
  badge.className = 'resultat-pts-badge ' + (pts === 10 ? 'perfecte' : pts === 5 ? 'bo' : pts === 2 ? 'approx' : 'error');

  document.getElementById('res-nom').textContent = lloc.nom;
  document.getElementById('res-dist').textContent = `📏 ${dist < 1 ? '<1' : Math.round(dist)} km de distància`;
  document.getElementById('res-desc').textContent = lloc.desc;

  const trampaAvis = document.getElementById('res-trampa-avis');
  trampaAvis.style.display = lloc.trampa ? 'block' : 'none';

  mostraScreen('resultat-lloc');

  // Mini mapa resultat
  setTimeout(() => {
    if (mapaResultat) { mapaResultat.remove(); mapaResultat = null; }

    mapaResultat = L.map('mapa-resultat', {
      center: [lloc.lat, lloc.lon],
      zoom: 9,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© CartoDB',
      subdomains: 'abcd',
    }).addTo(mapaResultat);

    // Marker resposta jugador
    const iconJugador = L.divIcon({
      className: '',
      html: '<div class="marker-jugador">📍</div>',
      iconSize: [32, 32], iconAnchor: [16, 32],
    });
    L.marker([clickLat, clickLon], { icon: iconJugador }).addTo(mapaResultat)
      .bindPopup('La teva resposta').openPopup();

    // Marker ubicació real
    const iconReal = L.divIcon({
      className: '',
      html: '<div class="marker-real">✅</div>',
      iconSize: [32, 32], iconAnchor: [16, 32],
    });
    L.marker([lloc.lat, lloc.lon], { icon: iconReal }).addTo(mapaResultat)
      .bindPopup(lloc.nom);

    // Línia recta entre els dos punts
    L.polyline([[clickLat, clickLon], [lloc.lat, lloc.lon]], {
      color: '#6aab7a',
      weight: 2,
      dashArray: '6,6',
      opacity: 0.8,
    }).addTo(mapaResultat);

    // Ajusta bounds per mostrar els dos punts
    const bounds = L.latLngBounds([[clickLat, clickLon], [lloc.lat, lloc.lon]]);
    mapaResultat.fitBounds(bounds, { padding: [40, 40] });
  }, 100);
}

// ── SEGUENT ───────────────────────────────────────────────────
function seguent() {
  jocActiu.idx++;
  guardarEstat(jugadorActiu, jocActiu);

  if (jocActiu.idx >= jocActiu.ordre.length) {
    jocActiu.completat = true;
    guardarEstat(jugadorActiu, jocActiu);
    mostrarResultatFinal(jocActiu);
  } else {
    mostraScreen('joc');
    mostrarLloc();
  }
}

// ── RESULTAT FINAL ────────────────────────────────────────────
function mostrarResultatFinal(estat) {
  let titol;
  if (estat.punts >= 450)     titol = '🗺️ Navegant expert!';
  else if (estat.punts >= 350) titol = '📍 Excel·lent!';
  else if (estat.punts >= 200) titol = '🏝️ Bon orientador!';
  else if (estat.punts >= 100) titol = '🌊 Segueix practicant!';
  else                          titol = '🧭 Necessites un GPS!';

  document.getElementById('result-avatar').src = MAPA_IMGS[jugadorActiu] || '';
  document.getElementById('result-title').textContent = titol;
  document.getElementById('result-score').textContent = estat.punts;
  document.getElementById('stat-perfectes').textContent = estat.stats?.perfectes || 0;
  document.getElementById('stat-bons').textContent = estat.stats?.bons || 0;
  document.getElementById('stat-approx').textContent = estat.stats?.approx || 0;
  document.getElementById('stat-errors').textContent = estat.stats?.errors || 0;

  mostraScreen('result');
}

function tornarInici() {
  mostraScreen('start');
  renderStartScreen();
}

// ── SORTIR / REINICI ──────────────────────────────────────────
function demanarSortir() {
  document.getElementById('modal-sortir').classList.add('visible');
}

function confirmarSortir() {
  document.getElementById('modal-sortir').classList.remove('visible');
  guardarEstat(jugadorActiu, jocActiu);
  mostraScreen('start');
  renderStartScreen();
}

function demanarReinici() {
  document.getElementById('modal-reinici').classList.add('visible');
}

function confirmarReinici() {
  document.getElementById('modal-reinici').classList.remove('visible');
  localStorage.removeItem(MAPA_STORAGE_KEY + jugadorActiu);
  renderStartScreen();
  renderJugadorsGrid();
}

// ── PERSISTÈNCIA ──────────────────────────────────────────────
function guardarEstat(nom, estat) {
  localStorage.setItem(MAPA_STORAGE_KEY + nom, JSON.stringify(estat));
}

function carregarEstat(nom) {
  try {
    const raw = localStorage.getItem(MAPA_STORAGE_KEY + nom);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

// ── UTILS ─────────────────────────────────────────────────────
function mostraScreen(nom) {
  ['select','start','joc','resultat-lloc','result'].forEach(s => {
    const el = document.getElementById(`screen-${s}`);
    if (!el) return;
    const isFlex = ['result', 'resultat-lloc'].includes(s);
    el.style.display = nom === s ? (isFlex ? 'flex' : 'block') : 'none';
  });
  window.scrollTo(0, 0);
  if (nom === 'select') renderJugadorsGrid();
}
