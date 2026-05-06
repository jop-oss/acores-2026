// ══════════════════════════════════════════════════════════════
//  BATALLA NAVAL — Açores 2026
//  1 jugador vs IA · 3 dificultats (×1/×1.5/×2)
//  Tauler 10×10 · 8 vaixells (5+4+3+2+2+1+1+1)
//  Rànquing: % victòries ponderat per dificultat
//  localStorage: batallanaval_estat_Nom
// ══════════════════════════════════════════════════════════════

const BN_STORAGE_KEY = 'batallanaval_estat_';
const BN_MIDA = 10;

// ── VAIXELLS ─────────────────────────────────────────────────
const BN_VAIXELLS = [
  { id: 'portaavions', nom: 'Portaavions', mida: 5, emoji: '🛳️' },
  { id: 'cuirassat',   nom: 'Cuirassat',   mida: 4, emoji: '⚓' },
  { id: 'creuer',      nom: 'Creuer',       mida: 3, emoji: '🚢' },
  { id: 'destructor1', nom: 'Destructor',   mida: 2, emoji: '🛥️' },
  { id: 'destructor2', nom: 'Destructor',   mida: 2, emoji: '🛥️' },
  { id: 'subm1',       nom: 'Submarí',      mida: 1, emoji: '🤿' },
  { id: 'subm2',       nom: 'Submarí',      mida: 1, emoji: '🤿' },
  { id: 'subm3',       nom: 'Submarí',      mida: 1, emoji: '🤿' },
];

const BN_CONFIG = {
  facil:   { label: 'Fàcil',   emoji: '😊', multiplicador: 1.0,
             desc: 'La IA dispara aleatòriament' },
  mitja:   { label: 'Mitjà',   emoji: '🧠', multiplicador: 1.5,
             desc: 'La IA busca i enfonsa vaixells tocats' },
  dificil: { label: 'Difícil', emoji: '🔥', multiplicador: 2.0,
             desc: "La IA usa estratègia de paritat" },
};

// ── ESTAT ────────────────────────────────────────────────────
let bnDificultat   = 'facil';
let bnFase         = 'inici';   // 'inici'|'col·locacio'|'joc'|'acabat'
let bnTaulerJugador = [];       // {vaixell, tocat, enfonsat}
let bnTaulerIA      = [];       // {vaixell, tocat, enfonsat}
let bnVaixellSelec  = null;     // idx a BN_VAIXELLS
let bnOrientacio    = 'H';      // 'H'|'V'
let bnCol·locats    = [];       // ids de vaixells col·locats
let bnVaixellsJug   = [];       // [{id,cel·les:[]}]
let bnVaixellsIA    = [];
let bnIaHunt        = [];       // caselles pendents per buscar (IA Mitjà/Difícil)
let bnIaTocat       = null;     // primera casella tocada actual
let bnIaDireccio    = null;     // direcció de cerca
let bnTorn          = 'jugador';// 'jugador'|'ia'
let bnActiu         = false;
let bnPreview       = [];       // cel·les en preview al hover

// ── PUNT D'ENTRADA ───────────────────────────────────────────
function iniciarBatallaNaval() {
  bnFase = 'inici';
  bnActiu = false;
  mostraScreen('batallanaval-inici');
  bnRenderInici();
}

// ── PANTALLA INICI ───────────────────────────────────────────
function bnRenderInici() {
  const estat = bnGetEstat(jugadorActiu);
  const cont = document.getElementById('batallanaval-inici-cont');
  if (!cont) return;

  cont.innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-header-fila">
          <button class="mapa-back-btn" onclick="mostraScreen('joc-selector')">← Tornar</button>
        </div>
        <div class="joc-titol-fila" style="align-items:center;width:100%;text-align:center;">
          <span class="joc-titol-emoji">⚓</span>
          <span class="joc-titol-text">Batalla Naval</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">
              ${estat.partides > 0
                ? `${estat.partides} partides · ${bnPctVictories(estat)}% victòries`
                : 'Cap partida jugada encara'}
            </div>
          </div>
        </div>

        <div class="pm-dif-selector">
          ${Object.entries(BN_CONFIG).map(([key, cfg]) => `
            <button class="pm-dif-btn ${bnDificultat === key ? 'actiu' : ''}"
                    onclick="bnTriarDificultat('${key}', this)">
              <span class="pm-dif-emoji">${cfg.emoji}</span>
              <span class="pm-dif-label">${cfg.label}
                <span style="opacity:.6;font-size:.75rem;margin-left:.3rem">×${cfg.multiplicador}</span>
              </span>
              <span class="pm-dif-info">${cfg.desc}</span>
              <span class="pm-dif-millor">
                ${estat.difs[key]
                  ? `${estat.difs[key].partides} partides · ${Math.round((estat.difs[key].victòries||0)/estat.difs[key].partides*100)}% vic.`
                  : '—'}
              </span>
            </button>`).join('')}
        </div>

        <div class="snake-instruccions">
          <p>Col·loca els teus vaixells i enfonsa la flota enemiga.</p>
          <ul class="snake-controls-llista">
            <li>🛳️ <strong>8 vaixells</strong>: portaavions, cuirassat, creuer, 2 destructors, 3 submarins</li>
            <li>🎯 <strong>Toca</strong> una casella del tauler enemic per disparar</li>
            <li>💥 <strong>Vermell</strong> = tocat · ⬜ <strong>Blanc</strong> = aigua</li>
            <li>🏆 Primer a enfonsar tota la flota enemiga guanya</li>
          </ul>
        </div>
        <button class="snake-btn-start" onclick="bnIniciarCollocacio()">Col·loca els vaixells ⚓</button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Batalla Naval</div>
        <div class="ranking-list-home" id="bn-ranking-list">${bnRenderRankingHTML()}</div>
      </div>
    </div>`;
}

function bnTriarDificultat(key, btn) {
  bnDificultat = key;
  document.querySelectorAll('.pm-dif-btn').forEach(b => b.classList.remove('actiu'));
  btn.classList.add('actiu');
}

// ── COL·LOCACIÓ DE VAIXELLS ──────────────────────────────────
function bnIniciarCollocacio() {
  bnTaulerJugador = Array(BN_MIDA * BN_MIDA).fill(null);
  bnTaulerIA      = Array(BN_MIDA * BN_MIDA).fill(null);
  bnCol·locats    = [];
  bnVaixellsJug   = [];
  bnVaixellsIA    = [];
  bnVaixellSelec  = 0;
  bnOrientacio    = 'H';
  bnPreview       = [];
  mostraScreen('batallanaval-col');
  bnRenderCollocacio();
}

function bnRenderCollocacio() {
  const cont = document.getElementById('batallanaval-col-cont');
  if (!cont) return;

  const vActual = bnVaixellSelec !== null && bnVaixellSelec < BN_VAIXELLS.length
    ? BN_VAIXELLS[bnVaixellSelec] : null;

  cont.innerHTML = `
    <div class="bn-col-wrap">
      <div class="bn-col-header">
        <button class="mapa-back-btn" onclick="bnTornarInici()">← Tornar</button>
        <div class="bn-col-titol">Col·loca els teus vaixells</div>
        <button class="bn-btn-rotar" onclick="bnRotar()">
          ${bnOrientacio === 'H' ? '↔️ Horitzontal' : '↕️ Vertical'}
        </button>
      </div>

      <div class="bn-col-main">
        <!-- Tauler -->
        <div class="bn-tauler-zona">
          <div class="bn-coordenades-wrap">
            <div class="bn-coordenades-col">
              ${[...Array(BN_MIDA)].map((_,i) => `<div class="bn-coord">${String.fromCharCode(65+i)}</div>`).join('')}
            </div>
            <div>
              <div class="bn-coordenades-fila">
                ${[...Array(BN_MIDA)].map((_,i) => `<div class="bn-coord">${i+1}</div>`).join('')}
              </div>
              <div class="bn-tauler" id="bn-tauler-col">
                ${bnRenderTaulerCollocacio()}
              </div>
            </div>
          </div>
        </div>

        <!-- Llista vaixells -->
        <div class="bn-vaixells-llista">
          <div class="bn-vaixells-titol">Flota</div>
          ${BN_VAIXELLS.map((v, i) => {
            const col = bnCol·locats.includes(v.id);
            const sel = bnVaixellSelec === i;
            return `
              <div class="bn-vaixell-item ${col ? 'col·locat' : ''} ${sel ? 'selec' : ''}"
                   onclick="${!col ? 'bnSeleccionarVaixell(' + i + ')' : ''}">
                <span class="bn-vaixell-emoji">${v.emoji}</span>
                <span class="bn-vaixell-nom">${v.nom}</span>
                <div class="bn-vaixell-mida">
                  ${[...Array(v.mida)].map(() => '<span class="bn-mida-cel"></span>').join('')}
                </div>
                ${col ? '<span class="bn-col-ok">✓</span>' : ''}
              </div>`;
          }).join('')}
          <button class="bn-btn-aleatori" onclick="bnCollocarAleatori()">🎲 Col·locació aleatòria</button>
          ${bnCol·locats.length === BN_VAIXELLS.length
            ? `<button class="snake-btn-start" style="margin-top:.5rem" onclick="bnComençarPartida()">Jugar! ⚓</button>`
            : `<div class="bn-col-pendent">Queden ${BN_VAIXELLS.length - bnCol·locats.length} vaixells per col·locar</div>`}
        </div>
      </div>
    </div>`;

  // Afegir events al tauler
  bnAfegirEventsTaulerCol();
}

function bnRenderTaulerCollocacio() {
  return [...Array(BN_MIDA * BN_MIDA)].map((_, idx) => {
    const v = bnTaulerJugador[idx];
    const enPreview = bnPreview.includes(idx);
    const previewValid = bnPreview.length > 0 && bnPreviewValid;
    return `<div class="bn-cel ${v ? 'bn-cel-vaixell' : ''} ${enPreview ? (previewValid ? 'bn-cel-preview-ok' : 'bn-cel-preview-err') : ''}"
                 data-idx="${idx}"></div>`;
  }).join('');
}

let bnPreviewValid = true;

function bnAfegirEventsTaulerCol() {
  const tauler = document.getElementById('bn-tauler-col');
  if (!tauler) return;

  tauler.addEventListener('mouseover', e => {
    const cel = e.target.closest('[data-idx]');
    if (!cel || bnVaixellSelec === null) return;
    const idx = parseInt(cel.dataset.idx);
    bnActualitzarPreview(idx);
  });

  tauler.addEventListener('mouseleave', () => {
    bnPreview = [];
    bnActualitzarTaulerCol();
  });

  tauler.addEventListener('click', e => {
    const cel = e.target.closest('[data-idx]');
    if (!cel || bnVaixellSelec === null || bnVaixellSelec >= BN_VAIXELLS.length) return;
    const idx = parseInt(cel.dataset.idx);
    bnCollocarVaixell(idx);
  });
}

function bnActualitzarPreview(idx) {
  if (bnVaixellSelec === null || bnVaixellSelec >= BN_VAIXELLS.length) return;
  const v = BN_VAIXELLS[bnVaixellSelec];
  if (bnCol·locats.includes(v.id)) return;

  const cels = bnGetCel·les(idx, v.mida, bnOrientacio);
  bnPreview = cels;
  bnPreviewValid = cels.length === v.mida && bnPreviewEsValid(cels);
  bnActualitzarTaulerCol();
}

function bnActualitzarTaulerCol() {
  const tauler = document.getElementById('bn-tauler-col');
  if (!tauler) return;
  tauler.querySelectorAll('[data-idx]').forEach(cel => {
    const idx = parseInt(cel.dataset.idx);
    const v = bnTaulerJugador[idx];
    const enPreview = bnPreview.includes(idx);
    cel.className = 'bn-cel' +
      (v ? ' bn-cel-vaixell' : '') +
      (enPreview ? (bnPreviewValid ? ' bn-cel-preview-ok' : ' bn-cel-preview-err') : '');
  });
}

function bnGetCel·les(idx, mida, orientacio) {
  const fila = Math.floor(idx / BN_MIDA);
  const col  = idx % BN_MIDA;
  const cels = [];
  for (let i = 0; i < mida; i++) {
    if (orientacio === 'H') {
      if (col + i >= BN_MIDA) return [];
      cels.push(fila * BN_MIDA + col + i);
    } else {
      if (fila + i >= BN_MIDA) return [];
      cels.push((fila + i) * BN_MIDA + col);
    }
  }
  return cels;
}

function bnPreviewEsValid(cels) {
  if (cels.length === 0) return false;
  // Cap cel·la ocupada, ni cap adjacent (incloses cantonades)
  return cels.every(idx => {
    if (bnTaulerJugador[idx]) return false;
    const fila = Math.floor(idx / BN_MIDA);
    const col  = idx % BN_MIDA;
    for (let df = -1; df <= 1; df++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (df === 0 && dc === 0) continue;
        const f2 = fila + df, c2 = col + dc;
        if (f2 < 0 || f2 >= BN_MIDA || c2 < 0 || c2 >= BN_MIDA) continue;
        const idx2 = f2 * BN_MIDA + c2;
        // Només compte si la cel·la adjacent no forma part del mateix vaixell en preview
        if (bnTaulerJugador[idx2] && !cels.includes(idx2)) return false;
      }
    }
    return true;
  });
}

function bnCollocarVaixell(idx) {
  if (bnVaixellSelec === null || bnVaixellSelec >= BN_VAIXELLS.length) return;
  const v = BN_VAIXELLS[bnVaixellSelec];
  if (bnCol·locats.includes(v.id)) return;

  const cels = bnGetCel·les(idx, v.mida, bnOrientacio);
  if (cels.length !== v.mida || !bnPreviewEsValid(cels)) return;

  cels.forEach(c => { bnTaulerJugador[c] = v.id; });
  bnVaixellsJug.push({ id: v.id, cel·les: cels, enfonsat: false });
  bnCol·locats.push(v.id);
  bnPreview = [];

  // Seleccionar el següent vaixell no col·locat
  const seg = BN_VAIXELLS.findIndex((w, i) => i > bnVaixellSelec && !bnCol·locats.includes(w.id));
  bnVaixellSelec = seg >= 0 ? seg : null;

  bnRenderCollocacio();
}

function bnSeleccionarVaixell(i) {
  bnVaixellSelec = i;
  bnPreview = [];
  bnRenderCollocacio();
}

function bnRotar() {
  bnOrientacio = bnOrientacio === 'H' ? 'V' : 'H';
  bnPreview = [];
  bnRenderCollocacio();
}

function bnCollocarAleatori() {
  bnTaulerJugador = Array(BN_MIDA * BN_MIDA).fill(null);
  bnCol·locats    = [];
  bnVaixellsJug   = [];

  BN_VAIXELLS.forEach(v => {
    let col·locat = false;
    let intents = 0;
    while (!col·locat && intents < 1000) {
      intents++;
      const orientacio = Math.random() < 0.5 ? 'H' : 'V';
      const idx = Math.floor(Math.random() * BN_MIDA * BN_MIDA);
      const cels = bnGetCel·les(idx, v.mida, orientacio);
      if (cels.length === v.mida && bnPreviewEsValidTauler(cels, bnTaulerJugador)) {
        cels.forEach(c => { bnTaulerJugador[c] = v.id; });
        bnVaixellsJug.push({ id: v.id, cel·les: cels, enfonsat: false });
        bnCol·locats.push(v.id);
        col·locat = true;
      }
    }
  });

  bnVaixellSelec = null;
  bnRenderCollocacio();
}

// Validació genèrica per qualsevol tauler (usada per col·locació aleatòria)
function bnPreviewEsValidTauler(cels, tauler) {
  if (cels.length === 0) return false;
  return cels.every(idx => {
    if (tauler[idx]) return false;
    const fila = Math.floor(idx / BN_MIDA);
    const col  = idx % BN_MIDA;
    for (let df = -1; df <= 1; df++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (df === 0 && dc === 0) continue;
        const f2 = fila + df, c2 = col + dc;
        if (f2 < 0 || f2 >= BN_MIDA || c2 < 0 || c2 >= BN_MIDA) continue;
        const idx2 = f2 * BN_MIDA + c2;
        if (tauler[idx2] && !cels.includes(idx2)) return false;
      }
    }
    return true;
  });
}

// ── INICI PARTIDA ─────────────────────────────────────────────
function bnComençarPartida() {
  if (bnCol·locats.length !== BN_VAIXELLS.length) return;

  // Col·locar vaixells de la IA
  bnTaulerIA   = Array(BN_MIDA * BN_MIDA).fill(null);
  bnVaixellsIA = [];
  BN_VAIXELLS.forEach(v => {
    let col·locat = false;
    let intents = 0;
    while (!col·locat && intents < 1000) {
      intents++;
      const ori = Math.random() < 0.5 ? 'H' : 'V';
      const idx = Math.floor(Math.random() * BN_MIDA * BN_MIDA);
      const cels = bnGetCel·les(idx, v.mida, ori);
      if (cels.length === v.mida && bnPreviewEsValidTauler(cels, bnTaulerIA)) {
        cels.forEach(c => { bnTaulerIA[c] = v.id; });
        bnVaixellsIA.push({ id: v.id, cel·les: cels, enfonsat: false });
        col·locat = true;
      }
    }
  });

  // Estat de trets
  bnTaulerJugadorTrets = Array(BN_MIDA * BN_MIDA).fill(null); // null|'aigua'|'tocat'
  bnTaulerIATrets      = Array(BN_MIDA * BN_MIDA).fill(null);
  bnIaHunt             = [];
  bnIaTocat            = null;
  bnIaDireccio         = null;
  bnTorn               = 'jugador';
  bnActiu              = true;
  bnFase               = 'joc';

  mostraScreen('batallanaval-joc');
  bnRenderJoc();
}

// ── ESTAT TRETS ───────────────────────────────────────────────
let bnTaulerJugadorTrets = [];
let bnTaulerIATrets      = [];

// ── PANTALLA JOC ──────────────────────────────────────────────
function bnRenderJoc() {
  const cont = document.getElementById('batallanaval-joc-cont');
  if (!cont) return;

  cont.innerHTML = `
    <div class="bn-joc-wrap">
      <div class="bn-joc-header">
        <button class="mapa-back-btn" onclick="bnSortir()">← Sortir</button>
        <div class="bn-torn-badge" id="bn-torn-badge">
          ${bnTorn === 'jugador' ? '🎯 Dispara!' : '🤖 La IA dispara…'}
        </div>
        <div class="bn-stats">
          <span title="Vaixells enemics enfonsats">💥 ${bnVaixellsIA.filter(v=>v.enfonsat).length}/${bnVaixellsIA.length}</span>
        </div>
      </div>

      <div class="bn-joc-main">
        <!-- Tauler IA (on dispara el jugador) -->
        <div class="bn-tauler-bloc">
          <div class="bn-tauler-titol">🎯 Flota enemiga</div>
          <div class="bn-coordenades-wrap">
            <div class="bn-coordenades-col">
              ${[...Array(BN_MIDA)].map((_,i) => `<div class="bn-coord">${String.fromCharCode(65+i)}</div>`).join('')}
            </div>
            <div>
              <div class="bn-coordenades-fila">
                ${[...Array(BN_MIDA)].map((_,i) => `<div class="bn-coord">${i+1}</div>`).join('')}
              </div>
              <div class="bn-tauler" id="bn-tauler-ia">
                ${bnRenderTaulerAtac()}
              </div>
            </div>
          </div>
          <!-- Icones flota enemiga sota el tauler IA -->
          <div class="bn-vaixells-status bn-vaixells-status-ia">
            ${bnRenderVaixellsStatusIA()}
          </div>
        </div>

        <!-- Tauler jugador (defensa) + llegenda en columna -->
        <div class="bn-tauler-bloc">
          <div class="bn-tauler-titol">⚓ La teva flota</div>
          <div class="bn-defensa-wrap">
            <div class="bn-coordenades-wrap">
              <div class="bn-coordenades-col">
                ${[...Array(BN_MIDA)].map((_,i) => `<div class="bn-coord">${String.fromCharCode(65+i)}</div>`).join('')}
              </div>
              <div>
                <div class="bn-coordenades-fila">
                  ${[...Array(BN_MIDA)].map((_,i) => `<div class="bn-coord">${i+1}</div>`).join('')}
                </div>
                <div class="bn-tauler bn-tauler-defensa">
                  ${bnRenderTaulerDefensa()}
                </div>
              </div>
            </div>
            <!-- Llegenda en columna a la dreta -->
            <div class="bn-llegenda-col">
              <div class="bn-llegenda-item"><span class="bn-leg-icon bn-leg-tocat">🚢</span><span>Tocat</span></div>
              <div class="bn-llegenda-item"><span class="bn-leg-icon bn-leg-enfonsat">💥</span><span>Enfonsat</span></div>
              <div class="bn-llegenda-item"><span class="bn-leg-icon bn-leg-aigua">💦</span><span>Aigua</span></div>
              <div class="bn-llegenda-sep"></div>
              ${bnRenderVaixellsStatusLlegenda()}
            </div>
          </div>
          <!-- Icones flota jugador sota el tauler -->
          <div class="bn-vaixells-status">
            ${bnRenderVaixellsStatus()}
          </div>
        </div>
      </div>

      <div class="bn-missatge" id="bn-missatge"></div>
    </div>`;

  if (bnTorn === 'jugador') {
    bnAfegirEventsTaulerAtac();
  }
}

function bnRenderTaulerAtac() {
  return [...Array(BN_MIDA * BN_MIDA)].map((_, idx) => {
    const tret = bnTaulerIATrets[idx];
    const vaixellEnfonsat = tret === 'tocat' && bnCellaEnfonsada(idx, bnVaixellsIA, bnTaulerIA);
    let cls = 'bn-cel';
    if (tret === 'tocat')  cls += vaixellEnfonsat ? ' bn-cel-enfonsat' : ' bn-cel-tocat';
    if (tret === 'aigua')  cls += ' bn-cel-aigua';
    const clicable = !tret && bnTorn === 'jugador' && bnActiu;
    if (clicable) cls += ' bn-cel-clicable';
    // 🚢 = tocat (vaixell parcialment visible), 💥 = enfonsat (explosió)
    const contingut = tret === 'tocat' ? (vaixellEnfonsat ? '💥' : '🚢') : tret === 'aigua' ? '💦' : '';
    return `<div class="${cls}" data-idx="${idx}">${contingut}</div>`;
  }).join('');
}

function bnRenderTaulerDefensa() {
  return [...Array(BN_MIDA * BN_MIDA)].map((_, idx) => {
    const vaixell = bnTaulerJugador[idx];
    const tret    = bnTaulerJugadorTrets[idx];
    const enfonsat = tret === 'tocat' && bnCellaEnfonsada(idx, bnVaixellsJug, bnTaulerJugador);
    let cls = 'bn-cel';
    if (vaixell && !tret)  cls += ' bn-cel-vaixell';
    if (tret === 'tocat')  cls += enfonsat ? ' bn-cel-enfonsat' : ' bn-cel-tocat';
    if (tret === 'aigua')  cls += ' bn-cel-aigua';
    const contingut = tret === 'tocat' ? (enfonsat ? '💥' : '🚢') : tret === 'aigua' ? '💦' : '';
    return `<div class="${cls}">${contingut}</div>`;
  }).join('');
}

function bnCellaEnfonsada(idx, vaixells, tauler) {
  const vid = tauler[idx];
  if (!vid) return false;
  const v = vaixells.find(w => w.id === vid);
  if (!v) return false;
  return v.enfonsat;
}

// Icones flota IA sota el tauler enemic
function bnRenderVaixellsStatusIA() {
  return bnVaixellsIA.map(v => {
    const info = BN_VAIXELLS.find(w => w.id === v.id);
    return `<span class="bn-v-status ${v.enfonsat ? 'enfonsat' : ''}" title="${info?.nom}${v.enfonsat ? ' (enfonsat)' : ''}">${info?.emoji}</span>`;
  }).join('');
}

// Icones flota jugador a la llegenda lateral
function bnRenderVaixellsStatusLlegenda() {
  return bnVaixellsJug.map(v => {
    const info = BN_VAIXELLS.find(w => w.id === v.id);
    return `<div class="bn-llegenda-item">
      <span class="bn-leg-icon ${v.enfonsat ? 'bn-leg-enfonsat-v' : ''}">${info?.emoji}</span>
      <span style="${v.enfonsat ? 'text-decoration:line-through;opacity:.5' : ''}">${info?.nom}</span>
    </div>`;
  }).join('');
}

function bnRenderVaixellsStatus() {
  return bnVaixellsJug.map(v => {
    const info = BN_VAIXELLS.find(w => w.id === v.id);
    return `<span class="bn-v-status ${v.enfonsat ? 'enfonsat' : ''}" title="${info?.nom}">${info?.emoji}</span>`;
  }).join('');
}

function bnAfegirEventsTaulerAtac() {
  const tauler = document.getElementById('bn-tauler-ia');
  if (!tauler) return;
  tauler.addEventListener('click', e => {
    const cel = e.target.closest('[data-idx]');
    if (!cel || !bnActiu || bnTorn !== 'jugador') return;
    const idx = parseInt(cel.dataset.idx);
    if (bnTaulerIATrets[idx]) return;
    bnDisparaJugador(idx);
  });
}

// ── LÒGICA DE JOC ────────────────────────────────────────────
function bnDisparaJugador(idx) {
  if (!bnActiu || bnTorn !== 'jugador') return;

  const encert = !!bnTaulerIA[idx];
  bnTaulerIATrets[idx] = encert ? 'tocat' : 'aigua';
  let enfonsat = false;

  if (encert) {
    const vid = bnTaulerIA[idx];
    const v = bnVaixellsIA.find(w => w.id === vid);
    if (v && v.cel·les.every(c => bnTaulerIATrets[c] === 'tocat')) {
      v.enfonsat = true;
      enfonsat = true;
      bnMarcarAiguaVoltant(v.cel·les, bnTaulerIATrets);
    }
  }

  // Comprovar victòria
  if (bnVaixellsIA.every(v => v.enfonsat)) {
    bnFinalitzar('jugador');
    return;
  }

  if (encert) {
    // Encert: el jugador continua disparant
    bnRenderJoc();
    bnMostrarMissatge(enfonsat ? '💥 Enfonsat! Torna a disparar!' : '🚢 Tocat! Torna a disparar!');
  } else {
    // Fallada: passa el torn a la IA
    bnTorn = 'ia';
    bnRenderJoc();
    bnMostrarMissatge('💦 Aigua! Ara dispara la IA…');
    setTimeout(() => bnDisparaIA(), 1200);
  }
}

function bnDisparaIA() {
  if (!bnActiu) return;

  const idx = bnTriarDisparIA();
  bnTaulerJugadorTrets[idx] = bnTaulerJugador[idx] ? 'tocat' : 'aigua';
  const encert = bnTaulerJugadorTrets[idx] === 'tocat';
  let enfonsat = false;

  if (encert) {
    const vid = bnTaulerJugador[idx];
    const v = bnVaixellsJug.find(w => w.id === vid);
    if (v) {
      if (v.cel·les.every(c => bnTaulerJugadorTrets[c] === 'tocat')) {
        v.enfonsat = true;
        enfonsat = true;
        bnMarcarAiguaVoltant(v.cel·les, bnTaulerJugadorTrets);
        bnIaHunt = [];
        bnIaTocat = null;
        bnIaDireccio = null;
      } else {
        if (bnDificultat !== 'facil') {
          if (bnIaTocat === null) bnIaTocat = idx;
          bnActualitzarIAHunt(idx);
        }
      }
    }
  } else if (bnDificultat !== 'facil' && bnIaDireccio && bnIaHunt.length === 0) {
    bnIaDireccio = null;
    if (bnIaTocat !== null) bnActualitzarIAHunt(bnIaTocat);
  }

  // Comprovar derrota
  if (bnVaixellsJug.every(v => v.enfonsat)) {
    bnRenderJoc();
    setTimeout(() => bnFinalitzar('ia'), 400);
    return;
  }

  const fila = String.fromCharCode(65 + Math.floor(idx / BN_MIDA));
  const col  = (idx % BN_MIDA) + 1;

  if (encert) {
    // IA encerta: continua disparant
    bnRenderJoc();
    bnMostrarMissatge(enfonsat
      ? `💥 La IA ha enfonsat a ${fila}${col}! Torna a disparar…`
      : `🚢 La IA ha tocat a ${fila}${col}! Torna a disparar…`);
    setTimeout(() => bnDisparaIA(), 1400);
  } else {
    // IA falla: passa el torn al jugador
    bnTorn = 'jugador';
    bnRenderJoc();
    bnMostrarMissatge(`💦 La IA ha fallat a ${fila}${col}. Dispara tu!`);
  }
}

function bnMarcarAiguaVoltant(cel·les, trets) {
  cel·les.forEach(idx => {
    const fila = Math.floor(idx / BN_MIDA);
    const col  = idx % BN_MIDA;
    for (let df = -1; df <= 1; df++) {
      for (let dc = -1; dc <= 1; dc++) {
        const f2 = fila + df, c2 = col + dc;
        if (f2 < 0 || f2 >= BN_MIDA || c2 < 0 || c2 >= BN_MIDA) continue;
        const idx2 = f2 * BN_MIDA + c2;
        if (!trets[idx2]) trets[idx2] = 'aigua';
      }
    }
  });
}

function bnTriarDisparIA() {
  const lliures = [...Array(BN_MIDA * BN_MIDA)]
    .map((_, i) => i)
    .filter(i => !bnTaulerJugadorTrets[i]);

  if (bnDificultat === 'facil' || bnIaHunt.length === 0) {
    if (bnDificultat === 'dificil') {
      // Paritat: dispara en patró de tauler d'escacs (caselles parells)
      const paritat = lliures.filter(i => (Math.floor(i/BN_MIDA) + i%BN_MIDA) % 2 === 0);
      const candidates = paritat.length > 0 ? paritat : lliures;
      return candidates[Math.floor(Math.random() * candidates.length)];
    }
    return lliures[Math.floor(Math.random() * lliures.length)];
  }

  // Hunt mode: dispara adjacents al tocat
  const valid = bnIaHunt.filter(i => !bnTaulerJugadorTrets[i]);
  if (valid.length === 0) {
    bnIaHunt = [];
    bnIaTocat = null;
    bnIaDireccio = null;
    return lliures[Math.floor(Math.random() * lliures.length)];
  }
  return valid[Math.floor(Math.random() * valid.length)];
}

function bnActualitzarIAHunt(idx) {
  const fila = Math.floor(idx / BN_MIDA);
  const col  = idx % BN_MIDA;
  const adjacents = [];
  if (fila > 0)           adjacents.push((fila-1)*BN_MIDA + col);
  if (fila < BN_MIDA-1)   adjacents.push((fila+1)*BN_MIDA + col);
  if (col > 0)            adjacents.push(fila*BN_MIDA + (col-1));
  if (col < BN_MIDA-1)    adjacents.push(fila*BN_MIDA + (col+1));

  adjacents.forEach(a => {
    if (!bnTaulerJugadorTrets[a] && !bnIaHunt.includes(a)) {
      bnIaHunt.push(a);
    }
  });
}

function bnMostrarMissatge(text) {
  const el = document.getElementById('bn-missatge');
  if (el) {
    el.textContent = text;
    el.style.opacity = '1';
    clearTimeout(window._bnMsgTimeout);
    window._bnMsgTimeout = setTimeout(() => { el.style.opacity = '0'; }, 2500);
  }
}

// ── FINAL PARTIDA ─────────────────────────────────────────────
function bnFinalitzar(guanyador) {
  bnActiu = false;
  const guanyat = guanyador === 'jugador';
  const punts = bnCalcularPunts(guanyat);
  bnGuardarPartida(jugadorActiu, bnDificultat, guanyat, punts);

  const cont = document.getElementById('batallanaval-joc-cont');
  if (!cont) return;

  const overlay = document.createElement('div');
  overlay.className = 'pm-overlay-final';
  overlay.innerHTML = `
    <div class="pm-modal">
      <div class="pm-modal-icon">${guanyat ? '🏆' : '💀'}</div>
      <div class="pm-modal-titol">${guanyat ? 'Has guanyat!' : 'Has perdut!'}</div>
      <div class="pm-modal-info">
        ${guanyat
          ? `Has enfonsat tota la flota enemiga!`
          : `La IA ha enfonsat tota la teva flota.`}
      </div>
      ${guanyat ? `<div class="gr-punts-resum">
        <span class="gr-punts-base">${Math.round(punts/BN_CONFIG[bnDificultat].multiplicador)} pts base</span>
        ${BN_CONFIG[bnDificultat].multiplicador > 1 ? `<span class="gr-mult">× ${BN_CONFIG[bnDificultat].multiplicador}</span>` : ''}
        <span class="gr-punts-total">${punts} pts</span>
      </div>` : ''}
      <div class="pm-modal-btns">
        <button class="snake-btn-start" onclick="bnRepetir()">Torna a jugar ⚓</button>
        <button class="pm-btn-sortir" onclick="bnSortir()">← Tornar</button>
      </div>
    </div>`;
  cont.appendChild(overlay);
}

function bnCalcularPunts(guanyat) {
  if (!guanyat) return 0;
  // Punts base: 100 + bonus per trets mínims (menys trets = més punts)
  const trets = bnTaulerIATrets.filter(t => t !== null).length;
  const mínims = 19; // total caselles vaixells IA
  const bonus = Math.max(0, 50 - (trets - mínims) * 2);
  const base = 100 + bonus;
  return Math.round(base * BN_CONFIG[bnDificultat].multiplicador);
}

// ── NAVEGACIÓ ─────────────────────────────────────────────────
function bnRepetir() {
  bnIniciarCollocacio();
}

function bnSortir() {
  bnActiu = false;
  mostraScreen('batallanaval-inici');
  bnRenderInici();
}

function bnTornarInici() {
  mostraScreen('batallanaval-inici');
  bnRenderInici();
}

// ── RÀNQUING ──────────────────────────────────────────────────
function bnRenderRankingHTML() {
  const posEmoji = ['🥇','🥈','🥉'];
  const llista = JUGADORS_VALIDS.map(nom => {
    const e = bnGetEstat(nom);
    return { nom, pct: bnPctVictories(e), partides: e.partides };
  }).sort((a, b) => b.pct - a.pct);
  const maxPct = llista[0]?.pct || 1;

  return llista.map((r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
      <div class="ranking-pos ${i < 3 ? 'p'+(i+1) : 'other'}">${i < 3 ? posEmoji[i] : i+1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom] || ''}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div style="font-size:.7rem;color:var(--text2);margin-bottom:2px">${r.partides} partides</div>
        <div class="rank-barra-wrap">
          <div class="rank-barra" style="width:${Math.min(maxPct > 0 ? (r.pct/maxPct)*100 : 0, 100)}%"></div>
        </div>
      </div>
      <div class="rank-punts" style="align-self:center;flex-shrink:0">${r.pct}%</div>
    </div>`).join('');
}

function bnPctVictories(estat) {
  if (!estat || estat.partides === 0) return 0;
  return Math.round((estat.victòries || 0) / estat.partides * 100);
}

// ── PERSISTÈNCIA ──────────────────────────────────────────────
function bnGetEstat(nom) {
  try {
    const raw = localStorage.getItem(BN_STORAGE_KEY + nom);
    if (!raw) return { partides: 0, victòries: 0, puntsTotals: 0, difs: { facil: null, mitja: null, dificil: null } };
    return JSON.parse(raw);
  } catch(e) {
    return { partides: 0, victòries: 0, puntsTotals: 0, difs: { facil: null, mitja: null, dificil: null } };
  }
}

function bnGuardarPartida(nom, dif, guanyat, punts) {
  const estat = bnGetEstat(nom);
  estat.partides++;
  if (guanyat) estat.victòries = (estat.victòries || 0) + 1;
  estat.puntsTotals = (estat.puntsTotals || 0) + punts;
  if (!estat.difs[dif]) estat.difs[dif] = { partides: 0, victòries: 0 };
  estat.difs[dif].partides++;
  if (guanyat) estat.difs[dif].victòries = (estat.difs[dif].victòries || 0) + 1;
  localStorage.setItem(BN_STORAGE_KEY + nom, JSON.stringify(estat));
}

// Funció global per al rànquing de jocs.js (usa % victòries)
function batallaNavalGetPuntsGlobals() {
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => {
    const e = bnGetEstat(nom);
    pts[nom] = bnPctVictories(e);
  });
  return pts;
}
