// ══════════════════════════════════════════════════════════════
//  MAHJONG SOLITARI — Açores 2026
// ══════════════════════════════════════════════════════════════

// ── FITXES TEMÀTIQUES ─────────────────────────────────────────
// 36 símbols únics × 4 còpies = 144 fitxes (layout tortuga)
// Per layouts més petits s'agafen els primers N símbols
const MJ_SIMBOLS = [
  // Natura i volcans
  '🌋','🏝️','🌊','💧','🌿','🍃','🌺','🌸',
  // Fauna marina
  '🐋','🐬','🐙','🦑','🐠','🐟','🦈','🐢',
  // Gastronomia
  '🍵','🍷','🧀','🍍','🥚','🍋','🌶️','🫐',
  // Activitats i turisme
  '⛵','🤿','🧗','🥾','📷','🗺️','⛺','🔭',
  // Clima i meteorologia
  '☀️','🌧️','🌈','🌬️',
];
// 36 símbols → 4 còpies = 144 fitxes

// ── LAYOUTS ───────────────────────────────────────────────────
// Cada fitxa: [capa, fila, col] — capa 0 = base
// La tortuga clàssica (144 fitxes), Piràmide (84), Creu (60)

// Generador de layout: retorna array de [z, r, c]
function mjLayoutTortuga() {
  // 144 fitxes = 36 símbols × 4. Verificat: sense duplicats, múltiple de 4.
  const fitxes = [];
  // Capa 0: 8 files × 10 cols = 80
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 10; c++)
      fitxes.push([0, r * 2, c * 2]);
  // Capa 1: 5 files × 8 cols = 40
  for (let r = 1; r < 6; r++)
    for (let c = 1; c < 9; c++)
      fitxes.push([1, r * 2, c * 2]);
  // Capa 2: 3 files × 6 cols = 18
  for (let r = 2; r < 5; r++)
    for (let c = 2; c < 8; c++)
      fitxes.push([2, r * 2, c * 2]);
  // Capa 3: 1 fila × 4 cols = 4
  for (let c = 3; c < 7; c++)
    fitxes.push([3, 14, c * 2]);
  // Capa 4: 1 fila × 2 cols = 2
  fitxes.push([4, 14, 8]);
  fitxes.push([4, 14, 10]);
  return fitxes; // 80+40+18+4+2 = 144 ✓
}

function mjLayoutPiramide() {
  // 84 fitxes = 21 símbols × 4. Verificat: sense duplicats, múltiple de 4.
  const fitxes = [];
  // Capa 0: 6 files × 8 cols = 48
  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 8; c++)
      fitxes.push([0, r * 2, c * 2]);
  // Capa 1: 4 files × 6 cols = 24 (centrada: offset fila +1, col +1)
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 6; c++)
      fitxes.push([1, (r + 1) * 2, (c + 1) * 2]);
  // Capa 2: 2 files × 4 cols = 8 (centrada: offset fila +2, col +2)
  for (let r = 0; r < 2; r++)
    for (let c = 0; c < 4; c++)
      fitxes.push([2, (r + 2) * 2, (c + 2) * 2]);
  // Capa 3: 1 fila × 4 cols = 4
  for (let c = 0; c < 4; c++)
    fitxes.push([3, 6, (c + 2) * 2]);
  return fitxes; // 48+24+8+4 = 84 ✓
}

function mjLayoutCreu() {
  // 64 fitxes = 16 símbols × 4. Verificat: sense duplicats, múltiple de 4.
  const pos = new Set();
  const add = (r, c) => pos.add(`${r},${c}`);
  // Braç horitzontal: 4 files × 10 cols
  for (let r = 3; r <= 6; r++)
    for (let c = 0; c <= 9; c++)
      add(r * 2, c * 2);
  // Braç vertical: 10 files × 4 cols
  for (let r = 0; r <= 9; r++)
    for (let c = 3; c <= 6; c++)
      add(r * 2, c * 2);
  return [...pos].map(k => {
    const [r, c] = k.split(',').map(Number);
    return [0, r, c];
  }); // 64 ✓
}

// ── CONFIG DIFICULTATS ────────────────────────────────────────
const MJ_CONFIG = {
  facil:   { label: 'Fàcil',   emoji: '🌺', layout: 'creu',    puntsBase: 300,  tempsMax: 600  },
  mitja:   { label: 'Mitjà',   emoji: '🌋', layout: 'piramide',puntsBase: 500,  tempsMax: 900  },
  dificil: { label: 'Difícil', emoji: '🦈', layout: 'tortuga', puntsBase: 1000, tempsMax: 1800 },
};


// ── ESTAT ─────────────────────────────────────────────────────
let mjFitxes      = [];   // { id, z, r, c, simbol, eliminada, seleccionada }
let mjSeleccionada = null; // id de la fitxa seleccionada
let mjActiu       = false;
let mjDificultat  = 'facil';
let mjSegons      = 0;
let mjTimer       = null;
let mjPunts       = 0;
let mjParelles    = 0;
let mjTotalParelles = 0;
let mjHistorial   = []; // per desfer

// ── PUNT D'ENTRADA ────────────────────────────────────────────
async function iniciarMahjong() {
  mostraScreen('mahjong-inici');
  document.getElementById('mahjong-inici-cont').innerHTML = '<div class="joc-carregant">Carregant…</div>';
  await jocFsCarregarTots(MJ_COL, JUGADORS_VALIDS);
  mjRenderInici();
}

// ── PANTALLA D'INICI ─────────────────────────────────────────
function mjRenderInici() {
  const millors = mjGetMillorsJugador(jugadorActiu);
  const ranking  = mjRenderRankingHTML();

  document.getElementById('mahjong-inici-cont').innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">🀄</span>
          <span class="joc-titol-text">Mahjong Açores</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">Millor: ${mjMillorTotal(millors)} pts</div>
          </div>
        </div>

        <div class="pm-dif-selector">
          ${Object.entries(MJ_CONFIG).map(([key, cfg]) => `
            <button class="pm-dif-btn ${mjDificultat === key ? 'actiu' : ''}"
                    onclick="mjTriarDificultat('${key}', this)">
              <span class="pm-dif-emoji">${cfg.emoji}</span>
              <span class="pm-dif-label">${cfg.label}</span>
              <span class="pm-dif-info">${mjNomLayout(cfg.layout)}</span>
              <span class="pm-dif-millor">Millor: ${millors[key] ? millors[key].punts + ' pts' : '—'}</span>
            </button>`).join('')}
        </div>

        <div class="snake-instruccions">
          <p>Elimina totes les fitxes en parelles iguals.</p>
          <ul class="snake-controls-llista">
            <li>👆 Toca dues fitxes iguals i <strong>lliures</strong> per eliminar-les</li>
            <li>🔓 Una fitxa és lliure si no té cap fitxa a sobre ni bloquejada per ambdós costats</li>
            <li>↩️ Botó <strong>Desfer</strong> per recuperar l'última parella</li>
            <li>🔀 Botó <strong>Barrejar</strong> si t'encalles (−50 pts)</li>
          </ul>
        </div>
        <button class="snake-btn-start" onclick="mjComençar()">Comença 🚀</button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Mahjong</div>
        <div class="ranking-list-home" id="mj-ranking-list">${ranking}</div>
      </div>
    </div>`;
}

function mjNomLayout(l) {
  return { tortuga: 'Tortuga · 144 fitxes', piramide: 'Piràmide · 84 fitxes', creu: 'Creu · 64 fitxes' }[l];
}

function mjTriarDificultat(key, btn) {
  mjDificultat = key;
  document.querySelectorAll('.pm-dif-btn').forEach(b => b.classList.remove('actiu'));
  btn.classList.add('actiu');
}

// ── PANTALLA DE JOC ───────────────────────────────────────────
function mjComençar() {
  mostraScreen('mahjong-joc');

  document.getElementById('mahjong-joc-cont').innerHTML = `
    <div class="mj-game-wrap">
      <div class="pm-topbar">
        <button class="snake-btn-back" onclick="mjSortir()">← Tornar</button>
        <div class="pm-stats">
          <div class="pm-stat-bloc">
            <span class="pm-stat-label">⏱️</span>
            <span class="pm-stat-val" id="mj-temps">0s</span>
          </div>
          <div class="pm-stat-bloc">
            <span class="pm-stat-label">🀄</span>
            <span class="pm-stat-val" id="mj-restants">—</span>
          </div>
          <div class="pm-stat-bloc">
            <span class="pm-stat-label">🏆</span>
            <span class="pm-stat-val" id="mj-punts">0</span>
          </div>
        </div>
      </div>
      <div class="mj-accions">
        <button class="mj-btn-accio" id="mj-btn-desfer" onclick="mjDesfer()" disabled>↩️ Desfer</button>
        <button class="mj-btn-accio" onclick="mjBarrejar()">🔀 Barrejar <span class="mj-cost">−50</span></button>
        <button class="mj-btn-accio" onclick="mjPista()">💡 Pista <span class="mj-cost">−30</span></button>
      </div>
      <div class="mj-tauler-scroll">
        <div class="mj-tauler" id="mj-tauler"></div>
      </div>
    </div>`;

  mjInicialitzarPartida();
}

// ── INICIALITZAR PARTIDA ──────────────────────────────────────
function mjInicialitzarPartida() {
  const cfg    = MJ_CONFIG[mjDificultat];
  const layout = mjObtenirLayout(cfg.layout);

  mjFitxes      = [];
  mjSeleccionada = null;
  mjActiu       = true;
  mjSegons      = 0;
  mjPunts       = 0;
  mjParelles    = 0;
  mjHistorial   = [];
  clearInterval(mjTimer);

  // Assigna símbols: cada símbol apareix 4 vegades (parelles × 2)
  const nFitxes   = layout.length;
  const nSimbolsN = nFitxes / 4;
  const simbolsDisponibles = MJ_SIMBOLS.slice(0, nSimbolsN);
  let pool = [];
  simbolsDisponibles.forEach(s => { pool.push(s, s, s, s); });

  // Barreja aleatòria garantint solució: assigna parelles a posicions aleatòries
  pool = mjBarrejarArray(pool);

  layout.forEach(([z, r, c], i) => {
    mjFitxes.push({ id: i, z, r, c, simbol: pool[i], eliminada: false, seleccionada: false });
  });

  mjTotalParelles = nFitxes / 2;

  mjRenderTauler();
  mjIniciarTimer();
  mjActualitzarUI();
}

function mjObtenirLayout(nom) {
  if (nom === 'tortuga')  return mjLayoutTortuga();
  if (nom === 'piramide') return mjLayoutPiramide();
  return mjLayoutCreu();
}

function mjBarrejarArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── RENDER DEL TAULER ─────────────────────────────────────────
function mjRenderTauler() {
  const el = document.getElementById('mj-tauler');
  if (!el) return;

  // Calcula dimensions del tauler
  const vives = mjFitxes.filter(f => !f.eliminada);
  if (vives.length === 0) { el.innerHTML = ''; return; }

  const maxZ = Math.max(...vives.map(f => f.z));
  const maxR = Math.max(...vives.map(f => f.r));
  const maxC = Math.max(...vives.map(f => f.c));
  const minR = Math.min(...vives.map(f => f.r));
  const minC = Math.min(...vives.map(f => f.c));

  // Mida de cel·la base (responsive)
  const scrollWrap = document.querySelector('.mj-tauler-scroll');
  const dispW = scrollWrap ? scrollWrap.clientWidth : 340;
  const nCols = Math.ceil((maxC - minC) / 2) + 1;
  const CELL = Math.max(36, Math.min(52, Math.floor((dispW - 32) / nCols)));
  const OFFSET_Z = Math.round(CELL * 0.12); // desplaçament per capa

  const taulerW = (Math.ceil((maxC - minC) / 2) + 1) * CELL + maxZ * OFFSET_Z + CELL;
  const taulerH = (Math.ceil((maxR - minR) / 2) + 1) * CELL + maxZ * OFFSET_Z + CELL;

  el.style.width  = taulerW + 'px';
  el.style.height = taulerH + 'px';
  el.style.position = 'relative';

  // Ordena per z (les capes altes es dibuixen al damunt)
  const ordenades = [...mjFitxes].sort((a, b) => a.z - b.z || a.r - b.r || a.c - b.c);

  el.innerHTML = ordenades
    .filter(f => !f.eliminada)
    .map(f => {
      const lliure = mjEsLliure(f);
      const sel    = f.seleccionada;
      const col = Math.ceil((f.c - minC) / 2);
      const row = Math.ceil((f.r - minR) / 2);
      const x   = col * CELL + f.z * OFFSET_Z;
      const y   = row * CELL - f.z * OFFSET_Z;

      return `<div class="mj-fitxa ${lliure ? 'lliure' : 'bloquejada'} ${sel ? 'sel' : ''}"
                   data-id="${f.id}"
                   style="left:${x}px;top:${y}px;width:${CELL - 2}px;height:${CELL - 2}px;z-index:${f.z * 100 + 10};font-size:${Math.round(CELL * 0.48)}px"
                   onclick="mjClicar(${f.id})">
                <span class="mj-fitxa-simbol">${f.simbol}</span>
              </div>`;
    }).join('');
}

// ── LÒGICA DE LLIURE ─────────────────────────────────────────
function mjEsLliure(fitxa) {
  if (fitxa.eliminada) return false;

  // 1. No ha de tenir cap fitxa a sobre (mateixa posició o solapada, capa superior)
  const teLaDalt = mjFitxes.some(f =>
    !f.eliminada && f.id !== fitxa.id &&
    f.z === fitxa.z + 1 &&
    Math.abs(f.r - fitxa.r) < 2 &&
    Math.abs(f.c - fitxa.c) < 2
  );
  if (teLaDalt) return false;

  // 2. No ha d'estar bloquejada per ambdós costats (esquerra I dreta)
  const teEsquerra = mjFitxes.some(f =>
    !f.eliminada && f.id !== fitxa.id &&
    f.z === fitxa.z &&
    f.r === fitxa.r &&
    f.c === fitxa.c - 2
  );
  const teDreta = mjFitxes.some(f =>
    !f.eliminada && f.id !== fitxa.id &&
    f.z === fitxa.z &&
    f.r === fitxa.r &&
    f.c === fitxa.c + 2
  );
  if (teEsquerra && teDreta) return false;

  return true;
}

// ── INTERACCIÓ ───────────────────────────────────────────────
function mjClicar(id) {
  if (!mjActiu) return;
  const fitxa = mjFitxes.find(f => f.id === id);
  if (!fitxa || fitxa.eliminada || !mjEsLliure(fitxa)) return;

  if (mjSeleccionada === null) {
    // Primera selecció
    fitxa.seleccionada = true;
    mjSeleccionada = id;
    mjActualitzarFitxa(id);
  } else if (mjSeleccionada === id) {
    // Deseleccionar
    fitxa.seleccionada = false;
    mjSeleccionada = null;
    mjActualitzarFitxa(id);
  } else {
    const anterior = mjFitxes.find(f => f.id === mjSeleccionada);
    if (fitxa.simbol === anterior.simbol) {
      // Parella correcta!
      mjHistorial.push([mjSeleccionada, id]);
      anterior.eliminada = true;
      fitxa.eliminada    = true;
      anterior.seleccionada = false;
      fitxa.seleccionada    = false;
      mjSeleccionada = null;
      mjParelles++;
      mjPunts += mjPuntsParella();
      mjActualitzarUI();
      mjRenderTauler();
      document.getElementById('mj-btn-desfer').disabled = false;

      // Comprova victòria
      if (mjParelles === mjTotalParelles) {
        setTimeout(mjGuanyar, 300);
      } else if (!mjHiHaMoviments()) {
        setTimeout(mjSenseMoviments, 400);
      }
    } else {
      // Parella incorrecta: tremola i deselecciona
      anterior.seleccionada = false;
      fitxa.seleccionada    = true;
      mjSeleccionada = id;
      mjActualitzarFitxa(anterior.id);
      mjActualitzarFitxa(id);
      const elAnt = document.querySelector(`[data-id="${anterior.id}"]`);
      if (elAnt) { elAnt.classList.add('error'); setTimeout(() => elAnt.classList.remove('error'), 500); }
    }
  }
}

function mjPuntsParella() {
  const cfg = MJ_CONFIG[mjDificultat];
  // Punts decreixents amb el temps
  const factor = Math.max(0.3, 1 - mjSegons / cfg.tempsMax);
  return Math.round((cfg.puntsBase / mjTotalParelles) * factor * 2);
}

function mjActualitzarFitxa(id) {
  const f  = mjFitxes.find(f => f.id === id);
  if (!f) return;
  const el = document.querySelector(`[data-id="${id}"]`);
  if (!el) return;
  el.classList.toggle('sel', f.seleccionada);
  el.classList.toggle('lliure', mjEsLliure(f));
  el.classList.toggle('bloquejada', !mjEsLliure(f));
}

function mjActualitzarUI() {
  const restants = mjFitxes.filter(f => !f.eliminada).length;
  const elR = document.getElementById('mj-restants');
  const elP = document.getElementById('mj-punts');
  if (elR) elR.textContent = restants;
  if (elP) elP.textContent = mjPunts;
}

// ── DESFER ───────────────────────────────────────────────────
function mjDesfer() {
  if (!mjHistorial.length) return;
  const [id1, id2] = mjHistorial.pop();
  const f1 = mjFitxes.find(f => f.id === id1);
  const f2 = mjFitxes.find(f => f.id === id2);
  f1.eliminada = false; f1.seleccionada = false;
  f2.eliminada = false; f2.seleccionada = false;
  mjParelles--;
  mjPunts = Math.max(0, mjPunts - mjPuntsParella());
  mjSeleccionada = null;
  mjActualitzarUI();
  mjRenderTauler();
  document.getElementById('mj-btn-desfer').disabled = !mjHistorial.length;
}

// ── BARREJAR ─────────────────────────────────────────────────
function mjBarrejar() {
  if (!mjActiu) return;
  mjPunts = Math.max(0, mjPunts - 50);
  mjSeleccionada = null;

  // Barreja els símbols de les fitxes vives
  const vives = mjFitxes.filter(f => !f.eliminada);
  const simbols = mjBarrejarArray(vives.map(f => f.simbol));
  vives.forEach((f, i) => { f.simbol = simbols[i]; f.seleccionada = false; });

  mjActualitzarUI();
  mjRenderTauler();
}

// ── PISTA ─────────────────────────────────────────────────────
function mjPista() {
  if (!mjActiu) return;
  const parella = mjTrobarParellaLliure();
  if (!parella) return;
  mjPunts = Math.max(0, mjPunts - 30);
  mjActualitzarUI();

  // Ressalta les fitxes
  parella.forEach(id => {
    const el = document.querySelector(`[data-id="${id}"]`);
    if (el) {
      el.classList.add('pista');
      setTimeout(() => el.classList.remove('pista'), 1800);
    }
  });
}

function mjTrobarParellaLliure() {
  const lliures = mjFitxes.filter(f => !f.eliminada && mjEsLliure(f));
  for (let i = 0; i < lliures.length; i++) {
    for (let j = i + 1; j < lliures.length; j++) {
      if (lliures[i].simbol === lliures[j].simbol) {
        return [lliures[i].id, lliures[j].id];
      }
    }
  }
  return null;
}

function mjHiHaMoviments() {
  return mjTrobarParellaLliure() !== null;
}

// ── TIMER ─────────────────────────────────────────────────────
function mjIniciarTimer() {
  mjSegons = 0;
  clearInterval(mjTimer);
  mjTimer = setInterval(() => {
    mjSegons++;
    const el = document.getElementById('mj-temps');
    if (el) el.textContent = mjFormatTemps(mjSegons);
  }, 1000);
}

function mjFormatTemps(s) {
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

// ── FI DE PARTIDA ─────────────────────────────────────────────
function mjGuanyar() {
  mjActiu = false;
  clearInterval(mjTimer);

  // Bonus de temps
  const cfg = MJ_CONFIG[mjDificultat];
  const tempsBonus = Math.max(0, cfg.tempsMax - mjSegons);
  const bonus = Math.round(tempsBonus / cfg.tempsMax * cfg.puntsBase * 0.3);
  mjPunts += bonus;

  mjGuardarEstat(jugadorActiu, mjDificultat, mjPunts, mjSegons);
  const millors = mjGetMillorsJugador(jugadorActiu);
  const esRecord = !millors[mjDificultat] || mjPunts >= millors[mjDificultat].punts;

  mjMostrarModal(true, esRecord, bonus);
}

function mjSenseMoviments() {
  mjActiu = false;
  clearInterval(mjTimer);
  mjMostrarModal(false, false, 0);
}

function mjMostrarModal(guanyat, esRecord, bonus) {
  const cfg  = MJ_CONFIG[mjDificultat];
  const wrap = document.getElementById('mahjong-joc-cont');
  const overlay = document.createElement('div');
  overlay.className = 'pm-overlay-final';
  overlay.innerHTML = `
    <div class="pm-modal">
      <div class="pm-modal-icon">${guanyat ? (esRecord ? '🏆' : '🎉') : '😔'}</div>
      <div class="pm-modal-titol">${guanyat ? (esRecord ? 'Nou rècord!' : 'Has guanyat!') : 'Sense moviments!'}</div>
      ${guanyat ? `
        <div class="pm-modal-info">
          ${cfg.label} · ${mjFormatTemps(mjSegons)}<br>
          Parelles: <strong>${mjParelles}</strong> · Bonus temps: <strong>+${bonus}</strong><br>
          Total: <strong>${mjPunts} pts</strong>
        </div>
        ${esRecord ? `<div class="pm-modal-record">🌟 Millor puntuació a ${cfg.label}!</div>` : ''}
      ` : `
        <div class="pm-modal-info">
          ${cfg.label} · ${mjParelles} parelles eliminades<br>
          No queden moviments possibles.
        </div>
      `}
      <div class="pm-modal-btns">
        <button class="snake-btn-start" onclick="mjRepetir()">Torna a jugar 🔄</button>
        <button class="pm-btn-sortir" onclick="mjSortir()">← Tornar</button>
      </div>
    </div>`;
  wrap.appendChild(overlay);
}

// ── NAVEGACIÓ ────────────────────────────────────────────────
function mjRepetir() {
  clearInterval(mjTimer);
  mjComençar();
}

function mjSortir() {
  clearInterval(mjTimer);
  mjActiu = false;
  mjSeleccionada = null;
  mostraScreen('mahjong-inici');
  mjRenderInici();
}

// ── RÀNQUING ─────────────────────────────────────────────────
function mjRenderRankingHTML() {
  const llista = JUGADORS_VALIDS.map(nom => ({
    nom,
    punts: mjMillorTotal(mjGetMillorsJugador(nom)),
  })).sort((a, b) => b.punts - a.punts);

  const posEmoji = ['🥇', '🥈', '🥉'];
  const maxPts   = llista[0]?.punts || 1;

  return llista.map((r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
      <div class="ranking-pos ${i < 3 ? 'p' + (i + 1) : 'other'}">${i < 3 ? posEmoji[i] : i + 1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom] || ''}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div class="rank-barra-wrap"><div class="rank-barra" style="width:${Math.min((r.punts / maxPts) * 100, 100)}%"></div></div>
      </div>
      <div class="rank-punts" style="align-self:center;flex-shrink:0">${r.punts}</div>
    </div>`).join('');
}

function mjMillorTotal(millors) {
  return Object.values(millors).reduce((s, d) => s + (d ? d.punts : 0), 0);
}

// ── PERSISTÈNCIA ─────────────────────────────────────────────
const MJ_COL = 'mahjong_punts';

function mjGetMillorsJugador(nom) {
  const d = jocFsCacheGet(MJ_COL, nom);
  return d || { facil: null, mitja: null, dificil: null };
}

function mjGuardarEstat(nom, dif, punts, temps) {
  const millors = mjGetMillorsJugador(nom);
  if (!millors[dif] || punts > millors[dif].punts) {
    millors[dif] = { punts, temps };
  }
  jocFsDesar(MJ_COL, nom, millors);
}

// Funció global per al rànquing de jocs.js
async function mahjongGetPuntsGlobals() {
  const dades = await jocFsCarregarTots(MJ_COL, JUGADORS_VALIDS);
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => {
    pts[nom] = mjMillorTotal(dades[nom] || { facil: null, mitja: null, dificil: null });
  });
  return pts;
}
