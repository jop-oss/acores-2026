// ══════════════════════════════════════════════════════════════
//  BOMBERMAN AÇORES — Açores 2026
// ══════════════════════════════════════════════════════════════

const BM_STORAGE_KEY = 'bomberman_estat_';

// ── CONSTANTS VISUALS ─────────────────────────────────────────
const BM_CELL   = 40;   // mida base cel·la px (s'escala)
const BM_COLS   = 13;
const BM_ROWS   = 11;

// Tipus de cel·la
const BM_BUIT   = 0;
const BM_PARET  = 1;  // paret fixa (roca sòlida)
const BM_BLOC   = 2;  // bloc destructible (canya/bambú)
const BM_FOC    = 3;  // flama temporal

// Estat enemics
const BM_DIR = [
  { dx: 0, dy: -1 }, // amunt
  { dx: 1, dy:  0 }, // dreta
  { dx: 0, dy:  1 }, // avall
  { dx: -1, dy: 0 }, // esquerra
];

// Power-ups
const BM_PU = {
  FLAMES:   '🔥', // +1 radi explosió
  BOMBS:    '💣', // +1 bomba simultània
  SPEED:    '⚡', // +1 velocitat jugador
  SHIELD:   '🛡️', // 1 hit gratis
};

// Enemics per nivell (crancs, pops, tiburons, volcans petits)
const BM_ENEMICS_TIPUS = ['🦀','🐙','🦈','🌋'];

// ── CONFIG PER NIVELL ─────────────────────────────────────────
// nEnemics, velEnemic(ms/pas), nBlocs%, tempsLimit(s)
function bmNivellCfg(n) {
  // n: 1-10
  const vel = Math.max(300, 900 - (n - 1) * 60);   // ms per pas enemic
  const enemics = 2 + Math.floor((n - 1) * 0.8);    // 2→9
  const blocs = 0.35 + (n - 1) * 0.015;             // 35%→48% de cel·les lliures
  const temps = Math.max(60, 180 - (n - 1) * 12);   // 180s→60s
  const tipusEnemic = BM_ENEMICS_TIPUS[Math.min(3, Math.floor((n - 1) / 3))];
  return { vel, enemics, blocs, temps, tipusEnemic };
}

// ── ESTAT GLOBAL ──────────────────────────────────────────────
let bmTauler    = [];   // BM_ROWS × BM_COLS
let bmJugador   = { x: 1, y: 1, viu: true, flames: 2, maxBombes: 1, speed: 3, shield: false };
let bmEnemics   = [];   // { x, y, dir, viu, tipus, tick }
let bmBombes    = [];   // { x, y, timer, radi, id }
let bmFocs      = [];   // { x, y, timer }
let bmPowerUps  = [];   // { x, y, tipus }
let bmNivell    = 1;
let bmPunts     = 0;
let bmVides     = 3;
let bmActiu     = false;
let bmPausa     = false;
let bmSegons    = 0;
let bmTimerUI   = null;
let bmLoopId    = null;
let bmLastTime  = 0;
let bmBombaId   = 0;
let bmSortida   = null;  // { x, y } — apareix quan tots els enemics morts
let bmTouchStart = null;
let bmEscala    = 1;
let bmCanvas    = null;
let bmCtx       = null;
let bmAnimId    = null;

// Acumuladors de temps per lògica
let bmAccJugador  = 0;
let bmAccEnemics  = [];

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarBomberman() {
  mostraScreen('bomberman-inici');
  bmRenderInici();
}

// ── PANTALLA D'INICI ─────────────────────────────────────────
function bmRenderInici() {
  const millors = bmGetMillors(jugadorActiu);
  const ranking  = bmRenderRankingHTML();

  document.getElementById('bomberman-inici-cont').innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">💥</span>
          <span class="joc-titol-text">Bomberman Açores</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">Millor: ${millors.punts} pts · Nivell ${millors.nivell}</div>
          </div>
        </div>
        <div class="snake-instruccions">
          <p>Elimina tots els enemics de les Açores amb les teves bombes volcàniques!</p>
          <ul class="snake-controls-llista">
            <li>👆 <strong>Llisca</strong> per moure't pel tauler</li>
            <li>💥 <strong>Tap</strong> per posar una bomba</li>
            <li>⌨️ Cursor/WASD + Espai per escriptori</li>
            <li>🔥 Elimina tots els enemics per avançar de nivell</li>
            <li>🚪 Troba la sortida quan tots els enemics caiguin</li>
          </ul>
          <div class="bm-power-llegenda">
            <span>${BM_PU.FLAMES} Flama</span>
            <span>${BM_PU.BOMBS} +Bomba</span>
            <span>${BM_PU.SPEED} Velocitat</span>
            <span>${BM_PU.SHIELD} Escut</span>
          </div>
        </div>
        <button class="snake-btn-start" onclick="bmIniciarNivell(1)">Comença 🌋</button>
        ${millors.nivell > 1 ? `<button class="pm-btn-sortir" style="margin-top:.5rem" onclick="bmIniciarNivell(${millors.nivell})">Continuar (Nivell ${millors.nivell}) →</button>` : ''}
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Bomberman</div>
        <div class="ranking-list-home" id="bm-ranking-list">${ranking}</div>
      </div>
    </div>`;
}

// ── INICIAR NIVELL ────────────────────────────────────────────
function bmIniciarNivell(n) {
  bmNivell = n;
  if (n === 1) { bmPunts = 0; bmVides = 3; }

  mostraScreen('bomberman-joc');

  document.getElementById('bomberman-joc-cont').innerHTML = `
    <div class="bm-game-wrap">
      <div class="pm-topbar">
        <button class="snake-btn-back" onclick="bmSortir()">← Tornar</button>
        <div class="pm-stats">
          <div class="pm-stat-bloc"><span class="pm-stat-label">❤️</span><span class="pm-stat-val" id="bm-vides">${bmVides}</span></div>
          <div class="pm-stat-bloc"><span class="pm-stat-label">🌋</span><span class="pm-stat-val" id="bm-nivell">${bmNivell}/10</span></div>
          <div class="pm-stat-bloc"><span class="pm-stat-label">⏱️</span><span class="pm-stat-val" id="bm-temps">${bmSegons}s</span></div>
          <div class="pm-stat-bloc"><span class="pm-stat-label">🏆</span><span class="pm-stat-val" id="bm-punts">${bmPunts}</span></div>
        </div>
      </div>
      <div class="bm-canvas-wrap" id="bm-canvas-wrap">
        <canvas id="bm-canvas"></canvas>
      </div>
      <div class="bm-power-bar" id="bm-power-bar">
        <span id="bm-pu-flames">🔥×${bmJugador.flames}</span>
        <span id="bm-pu-bombs">💣×${bmJugador.maxBombes}</span>
        <span id="bm-pu-speed">⚡×${bmJugador.speed}</span>
        <span id="bm-pu-shield" style="opacity:${bmJugador.shield?1:.3}">🛡️</span>
      </div>
    </div>`;

  bmCanvas = document.getElementById('bm-canvas');
  bmCtx    = bmCanvas.getContext('2d');
  bmAjustarCanvas();

  bmInicialitzarEstat();
  bmAfegirControls();

  bmActiu  = true;
  bmPausa  = false;
  bmSegons = bmNivellCfg(bmNivell).temps;
  bmIniciarTimerUI();
  bmLastTime = performance.now();
  bmLoop(bmLastTime);
}

function bmAjustarCanvas() {
  const wrap = document.getElementById('bm-canvas-wrap');
  if (!wrap) return;
  const maxW = Math.min(wrap.clientWidth, window.innerHeight * 0.62);
  bmEscala = maxW / (BM_COLS * BM_CELL);
  bmCanvas.width  = BM_COLS * BM_CELL * bmEscala;
  bmCanvas.height = BM_ROWS * BM_CELL * bmEscala;
}

// ── INICIALITZAR ESTAT ────────────────────────────────────────
function bmInicialitzarEstat() {
  const cfg = bmNivellCfg(bmNivell);

  // Jugador (conserva power-ups entre nivells)
  if (bmNivell === 1) {
    bmJugador = { x: 1, y: 1, viu: true, flames: 2, maxBombes: 1, speed: 3, shield: false };
  } else {
    bmJugador.x = 1; bmJugador.y = 1; bmJugador.viu = true;
  }

  bmBombes   = [];
  bmFocs     = [];
  bmEnemics  = [];
  bmPowerUps = [];
  bmSortida  = null;
  bmAccJugador = 0;
  bmAccEnemics = [];

  // Genera tauler
  bmTauler = [];
  for (let r = 0; r < BM_ROWS; r++) {
    bmTauler[r] = [];
    for (let c = 0; c < BM_COLS; c++) {
      if (r === 0 || r === BM_ROWS - 1 || c === 0 || c === BM_COLS - 1) {
        bmTauler[r][c] = BM_PARET;
      } else if (r % 2 === 0 && c % 2 === 0) {
        bmTauler[r][c] = BM_PARET; // pilars interiors
      } else {
        bmTauler[r][c] = BM_BUIT;
      }
    }
  }

  // Zona segura al voltant del jugador (3×3 al cantó)
  const segures = new Set(['1,1','1,2','2,1','1,3','3,1']);

  // Col·loca blocs destructibles
  for (let r = 1; r < BM_ROWS - 1; r++) {
    for (let c = 1; c < BM_COLS - 1; c++) {
      if (bmTauler[r][c] === BM_BUIT && !segures.has(`${r},${c}`)) {
        if (Math.random() < cfg.blocs) bmTauler[r][c] = BM_BLOC;
      }
    }
  }

  // Amaga sortida sota un bloc aleatori (lluny del jugador)
  const blocs = [];
  for (let r = 1; r < BM_ROWS - 1; r++)
    for (let c = 1; c < BM_COLS - 1; c++)
      if (bmTauler[r][c] === BM_BLOC && (r > 4 || c > 4)) blocs.push({ r, c });
  if (blocs.length) {
    const b = blocs[Math.floor(Math.random() * blocs.length)];
    bmSortida = { x: b.c, y: b.r, visible: false };
  }

  // Col·loca power-ups sota blocs aleatoris
  const puTipus = Object.keys(BM_PU);
  const nPU = Math.min(4, Math.floor(cfg.enemics / 2) + 1);
  const blocsPU = blocs.filter(b => !(bmSortida && b.r === bmSortida.y && b.c === bmSortida.x));
  bmBarrejar(blocsPU);
  for (let i = 0; i < Math.min(nPU, blocsPU.length); i++) {
    const b = blocsPU[i];
    bmPowerUps.push({ x: b.c, y: b.r, tipus: puTipus[i % puTipus.length], visible: false });
  }

  // Genera enemics en posicions aleatòries lliures (lluny del jugador)
  const lliures = [];
  for (let r = 1; r < BM_ROWS - 1; r++)
    for (let c = 1; c < BM_COLS - 1; c++)
      if (bmTauler[r][c] === BM_BUIT && (r > 4 || c > 4)) lliures.push({ r, c });
  bmBarrejar(lliures);
  for (let i = 0; i < Math.min(cfg.enemics, lliures.length); i++) {
    const p = lliures[i];
    bmEnemics.push({ x: p.c, y: p.r, viu: true, dir: Math.floor(Math.random() * 4),
                     tipus: cfg.tipusEnemic, acc: 0 });
  }
  bmAccEnemics = bmEnemics.map(() => 0);

  bmActualitzarPowerBar();
}

function bmBarrejar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── GAME LOOP ─────────────────────────────────────────────────
function bmLoop(now) {
  if (!bmActiu) return;
  bmAnimId = requestAnimationFrame(bmLoop);

  const dt = Math.min(now - bmLastTime, 100); // cap a 100ms per evitar salts
  bmLastTime = now;

  if (!bmPausa) {
    bmActualitzarLogica(dt);
  }
  bmDibuixar();
}

function bmActualitzarLogica(dt) {
  const cfg = bmNivellCfg(bmNivell);

  // Mou jugador
  bmAccJugador += dt;
  const velJugador = Math.max(80, 240 - bmJugador.speed * 20);
  if (bmAccJugador >= velJugador) {
    bmAccJugador = 0;
    bmMourePendentJugador();
  }

  // Mou enemics
  bmEnemics.forEach((e, i) => {
    if (!e.viu) return;
    e.acc += dt;
    if (e.acc >= cfg.vel) {
      e.acc = 0;
      bmMoureEnemic(e);
    }
  });

  // Actualitza bombes
  bmBombes.forEach(b => { b.timer -= dt; });
  const explodides = bmBombes.filter(b => b.timer <= 0);
  explodides.forEach(b => bmExplotar(b));
  bmBombes = bmBombes.filter(b => b.timer > 0);

  // Actualitza focs
  bmFocs.forEach(f => { f.timer -= dt; });
  bmFocs = bmFocs.filter(f => f.timer > 0);

  // Comprova col·lisions jugador amb foc/enemic
  if (bmJugador.viu) {
    const jx = bmJugador.x, jy = bmJugador.y;
    const enFoc = bmFocs.some(f => f.x === jx && f.y === jy);
    const enEnemic = bmEnemics.some(e => e.viu && e.x === jx && e.y === jy);
    if (enFoc || enEnemic) bmJugadorMort();
  }

  // Comprova recollida power-ups
  bmPowerUps.forEach(pu => {
    if (pu.visible && pu.x === bmJugador.x && pu.y === bmJugador.y) {
      bmAplicarPowerUp(pu.tipus);
      pu.visible = false;
      pu.recollit = true;
    }
  });
  bmPowerUps = bmPowerUps.filter(pu => !pu.recollit);

  // Comprova sortida
  if (bmSortida?.visible && bmJugador.x === bmSortida.x && bmJugador.y === bmSortida.y) {
    bmNivellSuperat();
  }
}

// ── MOVIMENT JUGADOR ─────────────────────────────────────────
let bmDirPendent = null;
let bmMoventCap  = null; // { dx, dy } moviment continu teclat

function bmMourePendentJugador() {
  const dir = bmDirPendent || bmMoventCap;
  if (!dir || !bmJugador.viu) return;
  const nx = bmJugador.x + dir.dx;
  const ny = bmJugador.y + dir.dy;
  if (bmPotMovre(nx, ny)) {
    bmJugador.x = nx;
    bmJugador.y = ny;
  }
  bmDirPendent = null;
}

function bmPotMovre(x, y) {
  if (x < 0 || x >= BM_COLS || y < 0 || y >= BM_ROWS) return false;
  const cel = bmTauler[y][x];
  if (cel === BM_PARET || cel === BM_BLOC) return false;
  if (bmBombes.some(b => b.x === x && b.y === y)) return false;
  return true;
}

// ── MOVIMENT ENEMICS ─────────────────────────────────────────
function bmMoureEnemic(e) {
  // Intentar avançar en la direcció actual; si no pot, girar aleatòriament
  const d = BM_DIR[e.dir];
  const nx = e.x + d.dx;
  const ny = e.y + d.dy;

  if (bmPotMoureEnemic(nx, ny)) {
    e.x = nx;
    e.y = ny;
    // 20% probabilitat de girar aleatòriament (moviment més imprevisible)
    if (Math.random() < 0.2) e.dir = Math.floor(Math.random() * 4);
  } else {
    // Tria una nova direcció aleatòria
    const dirs = [0, 1, 2, 3].filter(d => {
      const dd = BM_DIR[d];
      return bmPotMoureEnemic(e.x + dd.dx, e.y + dd.dy);
    });
    if (dirs.length) e.dir = dirs[Math.floor(Math.random() * dirs.length)];
  }
}

function bmPotMoureEnemic(x, y) {
  if (x < 0 || x >= BM_COLS || y < 0 || y >= BM_ROWS) return false;
  return bmTauler[y][x] === BM_BUIT;
}

// ── BOMBES ────────────────────────────────────────────────────
function bmPosarBomba() {
  if (!bmActiu || bmPausa || !bmJugador.viu) return;
  const bx = bmJugador.x, by = bmJugador.y;
  if (bmBombes.some(b => b.x === bx && b.y === by)) return;
  if (bmBombes.length >= bmJugador.maxBombes) return;

  bmBombes.push({ x: bx, y: by, timer: 2500, radi: bmJugador.flames, id: bmBombaId++ });
}

function bmExplotar(bomba) {
  const { x, y, radi } = bomba;

  const afegirFoc = (fx, fy) => {
    bmFocs.push({ x: fx, y: fy, timer: 600 });

    // Destrueix blocs
    if (bmTauler[fy][fx] === BM_BLOC) {
      bmTauler[fy][fx] = BM_BUIT;
      bmPunts += 5;
      // Revela power-ups/sortida amagats
      bmPowerUps.forEach(pu => { if (pu.x === fx && pu.y === fy) pu.visible = true; });
      if (bmSortida && bmSortida.x === fx && bmSortida.y === fy) bmSortida.visible = true;
    }

    // Mata enemics
    bmEnemics.forEach(e => {
      if (e.viu && e.x === fx && e.y === fy) {
        e.viu = false;
        bmPunts += 100 * bmNivell;
        bmActualitzarUI();
        // Comprova si tots morts
        if (bmEnemics.every(e => !e.viu)) {
          if (bmSortida) bmSortida.visible = true;
        }
      }
    });
  };

  // Centre
  afegirFoc(x, y);

  // 4 direccions
  for (const dir of BM_DIR) {
    for (let i = 1; i <= radi; i++) {
      const fx = x + dir.dx * i;
      const fy = y + dir.dy * i;
      if (fx < 0 || fx >= BM_COLS || fy < 0 || fy >= BM_ROWS) break;
      if (bmTauler[fy][fx] === BM_PARET) break;
      afegirFoc(fx, fy);
      if (bmTauler[fy][fx] === BM_BLOC) break; // s'atura al primer bloc (ja destruït)

      // Cadena: explota bombes al foc
      const bombaEnFoc = bmBombes.find(b => b.x === fx && b.y === fy && b.id !== bomba.id);
      if (bombaEnFoc) { bombaEnFoc.timer = 0; }
    }
  }
}

// ── MORT JUGADOR ─────────────────────────────────────────────
function bmJugadorMort() {
  if (bmJugador.shield) {
    bmJugador.shield = false;
    bmActualitzarPowerBar();
    return;
  }
  bmJugador.viu = false;
  bmVides--;
  bmActualitzarUI();

  setTimeout(() => {
    if (bmVides <= 0) {
      bmGameOver();
    } else {
      // Reinicia nivell conservant punts i power-ups
      bmIniciarNivell(bmNivell);
    }
  }, 1200);
}

// ── POWER-UPS ─────────────────────────────────────────────────
function bmAplicarPowerUp(tipus) {
  switch (tipus) {
    case 'FLAMES': bmJugador.flames = Math.min(6, bmJugador.flames + 1); break;
    case 'BOMBS':  bmJugador.maxBombes = Math.min(5, bmJugador.maxBombes + 1); break;
    case 'SPEED':  bmJugador.speed = Math.min(6, bmJugador.speed + 1); break;
    case 'SHIELD': bmJugador.shield = true; break;
  }
  bmPunts += 50;
  bmActualitzarPowerBar();
  bmActualitzarUI();
}

// ── NIVELL SUPERAT ────────────────────────────────────────────
function bmNivellSuperat() {
  bmActiu = false;
  cancelAnimationFrame(bmAnimId);
  clearInterval(bmTimerUI);

  const bonusTemps = bmSegons * 10;
  bmPunts += bonusTemps + 500 * bmNivell;
  bmActualitzarUI();
  bmGuardarEstat(jugadorActiu, bmPunts, bmNivell);

  if (bmNivell >= 10) {
    bmMostrarModal('🏆', 'Has completat tots els nivells!', `Puntuació final: ${bmPunts} pts`, true, true);
  } else {
    bmMostrarModal('🎉', `Nivell ${bmNivell} superat!`, `+${bonusTemps} bonus temps · ${bmPunts} pts totals`, false, false, () => bmIniciarNivell(bmNivell + 1));
  }
}

// ── GAME OVER ─────────────────────────────────────────────────
function bmGameOver() {
  bmActiu = false;
  cancelAnimationFrame(bmAnimId);
  clearInterval(bmTimerUI);
  bmGuardarEstat(jugadorActiu, bmPunts, bmNivell);
  bmMostrarModal('💀', 'Game Over', `Nivell ${bmNivell} · ${bmPunts} pts`, true, false);
}

function bmMostrarModal(icon, titol, sub, mostrarTornar, fi, cbContinuar = null) {
  const wrap = document.getElementById('bomberman-joc-cont');
  const ov = document.createElement('div');
  ov.className = 'pm-overlay-final';
  ov.innerHTML = `
    <div class="pm-modal">
      <div class="pm-modal-icon">${icon}</div>
      <div class="pm-modal-titol">${titol}</div>
      <div class="pm-modal-info">${sub}</div>
      <div class="pm-modal-btns">
        ${cbContinuar ? `<button class="snake-btn-start" onclick="document.querySelector('.pm-overlay-final').remove(); (${cbContinuar.toString()})()">Nivell ${bmNivell + 1} →</button>` : ''}
        ${fi ? `<button class="snake-btn-start" onclick="bmReiniciar()">Torna a jugar 🔄</button>` : ''}
        ${mostrarTornar || fi ? `<button class="pm-btn-sortir" onclick="bmSortir()">← Tornar</button>` : ''}
      </div>
    </div>`;
  wrap.appendChild(ov);
}

// ── TIMER UI ──────────────────────────────────────────────────
function bmIniciarTimerUI() {
  clearInterval(bmTimerUI);
  bmTimerUI = setInterval(() => {
    if (!bmActiu || bmPausa) return;
    bmSegons--;
    const el = document.getElementById('bm-temps');
    if (el) {
      el.textContent = bmSegons + 's';
      el.style.color = bmSegons <= 10 ? '#fc8181' : '';
    }
    if (bmSegons <= 0) bmGameOver();
  }, 1000);
}

function bmActualitzarUI() {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('bm-vides',  bmVides);
  set('bm-nivell', `${bmNivell}/10`);
  set('bm-punts',  bmPunts);
}

function bmActualitzarPowerBar() {
  const set = (id, val, op) => {
    const el = document.getElementById(id);
    if (el) { el.textContent = val; if (op !== undefined) el.style.opacity = op; }
  };
  set('bm-pu-flames', `🔥×${bmJugador.flames}`);
  set('bm-pu-bombs',  `💣×${bmJugador.maxBombes}`);
  set('bm-pu-speed',  `⚡×${bmJugador.speed}`);
  set('bm-pu-shield', '🛡️', bmJugador.shield ? 1 : 0.3);
}

// ── DIBUIX ────────────────────────────────────────────────────
function bmDibuixar() {
  if (!bmCtx) return;
  const ctx = bmCtx;
  const cs  = BM_CELL * bmEscala;
  const W   = bmCanvas.width;
  const H   = bmCanvas.height;

  // Fons
  ctx.fillStyle = '#0a1628';
  ctx.fillRect(0, 0, W, H);

  // Cel·les
  for (let r = 0; r < BM_ROWS; r++) {
    for (let c = 0; c < BM_COLS; c++) {
      const x = c * cs, y = r * cs;
      const cel = bmTauler[r][c];
      if (cel === BM_PARET) {
        // Roca sòlida: gradient fosc
        ctx.fillStyle = '#1a3020';
        ctx.fillRect(x, y, cs, cs);
        ctx.fillStyle = '#0d1e14';
        ctx.fillRect(x + 2, y + 2, cs - 4, cs - 4);
        // Textura volcànica
        ctx.fillStyle = '#2d5a3d';
        ctx.fillRect(x + cs * 0.15, y + cs * 0.15, cs * 0.25, cs * 0.12);
        ctx.fillRect(x + cs * 0.55, y + cs * 0.6, cs * 0.2, cs * 0.12);
      } else if (cel === BM_BLOC) {
        // Bloc destructible: bambú/canya
        ctx.fillStyle = '#1e3a18';
        ctx.fillRect(x, y, cs, cs);
        ctx.strokeStyle = '#2d5a3d';
        ctx.lineWidth = 1 * bmEscala;
        ctx.strokeRect(x + 2, y + 2, cs - 4, cs - 4);
        // Diagonals de canya
        ctx.beginPath();
        ctx.moveTo(x + cs * 0.2, y + cs * 0.2);
        ctx.lineTo(x + cs * 0.8, y + cs * 0.8);
        ctx.strokeStyle = 'rgba(106,171,122,0.25)';
        ctx.stroke();
      } else {
        // Buit: terra volcànic
        ctx.fillStyle = (r + c) % 2 === 0 ? '#0f2018' : '#0d1c16';
        ctx.fillRect(x, y, cs, cs);
      }
    }
  }

  // Focs
  bmFocs.forEach(f => {
    const x = f.x * cs, y = f.y * cs;
    const alpha = Math.min(1, f.timer / 200);
    ctx.save();
    ctx.globalAlpha = alpha;
    // Gradient de foc
    const grad = ctx.createRadialGradient(x + cs/2, y + cs/2, 0, x + cs/2, y + cs/2, cs/2);
    grad.addColorStop(0, '#fff3cd');
    grad.addColorStop(0.4, '#f6ad55');
    grad.addColorStop(1, 'rgba(229,62,62,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, cs, cs);
    ctx.restore();
  });

  // Sortida
  if (bmSortida?.visible) {
    const x = bmSortida.x * cs + cs * 0.1;
    const y = bmSortida.y * cs + cs * 0.1;
    const s = cs * 0.8;
    ctx.fillStyle = '#2d5a3d';
    ctx.fillRect(bmSortida.x * cs, bmSortida.y * cs, cs, cs);
    bmDibuixarEmoji(ctx, '🚪', x, y, s);
  }

  // Power-ups
  bmPowerUps.forEach(pu => {
    if (!pu.visible) return;
    const x = pu.x * cs + cs * 0.1;
    const y = pu.y * cs + cs * 0.1;
    // Fons brillant
    ctx.fillStyle = 'rgba(236,201,75,0.25)';
    ctx.beginPath();
    ctx.arc(pu.x * cs + cs/2, pu.y * cs + cs/2, cs * 0.38, 0, Math.PI * 2);
    ctx.fill();
    bmDibuixarEmoji(ctx, BM_PU[pu.tipus], x, y, cs * 0.8);
  });

  // Bombes
  bmBombes.forEach(b => {
    const x = b.x * cs + cs / 2;
    const y = b.y * cs + cs / 2;
    const pulse = 0.85 + 0.15 * Math.sin(b.timer / 150);
    const r = cs * 0.38 * pulse;
    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#e53e3e'; ctx.lineWidth = 2 * bmEscala;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
    // Metxa
    ctx.strokeStyle = '#ecc94b'; ctx.lineWidth = 1.5 * bmEscala;
    ctx.beginPath();
    ctx.moveTo(x + r * 0.5, y - r * 0.7);
    ctx.quadraticCurveTo(x + r * 0.9, y - r * 1.2, x + r * 0.6, y - r * 1.5);
    ctx.stroke();
    // Espurna
    if (b.timer < 1000) {
      ctx.fillStyle = '#ecc94b';
      ctx.beginPath(); ctx.arc(x + r * 0.6, y - r * 1.5, 2 * bmEscala, 0, Math.PI * 2); ctx.fill();
    }
  });

  // Enemics
  bmEnemics.forEach(e => {
    if (!e.viu) return;
    bmDibuixarEmoji(ctx, e.tipus, e.x * cs + cs * 0.05, e.y * cs + cs * 0.05, cs * 0.9);
  });

  // Jugador
  if (bmJugador.viu) {
    const jx = bmJugador.x * cs + cs * 0.1;
    const jy = bmJugador.y * cs + cs * 0.05;
    // Escut visual
    if (bmJugador.shield) {
      ctx.strokeStyle = 'rgba(99,179,237,0.6)';
      ctx.lineWidth = 2.5 * bmEscala;
      ctx.beginPath();
      ctx.arc(bmJugador.x * cs + cs/2, bmJugador.y * cs + cs/2, cs * 0.45, 0, Math.PI * 2);
      ctx.stroke();
    }
    bmDibuixarEmoji(ctx, '🧑‍🚀', jx, jy, cs * 0.85);
  }

  // Overlay pausa
  if (bmPausa) {
    ctx.fillStyle = 'rgba(10,22,40,0.7)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${cs}px DM Sans`;
    ctx.textAlign = 'center';
    ctx.fillText('⏸ PAUSA', W / 2, H / 2);
  }
}

function bmDibuixarEmoji(ctx, emoji, x, y, size) {
  ctx.font = `${size}px serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(emoji, x, y);
}

// ── CONTROLS ─────────────────────────────────────────────────
function bmAfegirControls() {
  // Teclat
  document.addEventListener('keydown', bmOnKey);
  document.addEventListener('keyup',  bmOnKeyUp);

  // Touch
  const wrap = document.getElementById('bm-canvas-wrap');
  if (wrap) {
    wrap.addEventListener('touchstart', bmOnTouchStart, { passive: true });
    wrap.addEventListener('touchend',   bmOnTouchEnd,   { passive: false });
  }

  // Redimensió
  window.addEventListener('resize', bmAjustarCanvas);
}

function bmEliminarControls() {
  document.removeEventListener('keydown', bmOnKey);
  document.removeEventListener('keyup',  bmOnKeyUp);
  window.removeEventListener('resize', bmAjustarCanvas);
}

const bmTeclesMov = {
  ArrowUp:    { dx: 0, dy: -1 }, ArrowDown:  { dx: 0, dy: 1 },
  ArrowLeft:  { dx: -1, dy: 0 }, ArrowRight: { dx: 1, dy: 0 },
  w: { dx: 0, dy: -1 }, s: { dx: 0, dy: 1 },
  a: { dx: -1, dy: 0 }, d: { dx: 1, dy: 0 },
};

function bmOnKey(e) {
  if (!bmActiu && e.key !== 'Escape') return;
  const dir = bmTeclesMov[e.key];
  if (dir) { e.preventDefault(); bmMoventCap = dir; bmDirPendent = dir; }
  if (e.key === ' ') { e.preventDefault(); bmPosarBomba(); }
  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') bmTogglePausa();
}

function bmOnKeyUp(e) {
  const dir = bmTeclesMov[e.key];
  if (dir && bmMoventCap?.dx === dir.dx && bmMoventCap?.dy === dir.dy) {
    bmMoventCap = null;
  }
}

function bmOnTouchStart(e) {
  const t = e.touches[0];
  bmTouchStart = { x: t.clientX, y: t.clientY, time: Date.now() };
}

function bmOnTouchEnd(e) {
  if (!bmTouchStart) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - bmTouchStart.x;
  const dy = t.clientY - bmTouchStart.y;
  const dt = Date.now() - bmTouchStart.time;
  const dist = Math.sqrt(dx * dx + dy * dy);
  bmTouchStart = null;

  if (dist < 12 && dt < 300) {
    // Tap → bomba
    bmPosarBomba();
  } else if (dist >= 12) {
    // Swipe → moviment
    e.preventDefault();
    if (Math.abs(dx) > Math.abs(dy)) {
      bmDirPendent = dx > 0 ? { dx: 1, dy: 0 } : { dx: -1, dy: 0 };
    } else {
      bmDirPendent = dy > 0 ? { dx: 0, dy: 1 } : { dx: 0, dy: -1 };
    }
  }
}

function bmTogglePausa() {
  if (!bmActiu) return;
  bmPausa = !bmPausa;
}

// ── REANUDACIÓ / SORTIDA ──────────────────────────────────────
function bmReiniciar() {
  bmEliminarControls();
  bmPunts = 0; bmVides = 3;
  bmIniciarNivell(1);
}

function bmSortir() {
  bmActiu = false;
  cancelAnimationFrame(bmAnimId);
  clearInterval(bmTimerUI);
  bmEliminarControls();
  mostraScreen('bomberman-inici');
  bmRenderInici();
}

// ── RÀNQUING ─────────────────────────────────────────────────
function bmRenderRankingHTML() {
  const llista = JUGADORS_VALIDS.map(nom => ({
    nom, ...bmGetMillors(nom),
  })).sort((a, b) => b.punts - a.punts);

  const posEmoji = ['🥇','🥈','🥉'];
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

// ── PERSISTÈNCIA ─────────────────────────────────────────────
function bmGetMillors(nom) {
  try {
    const raw = localStorage.getItem(BM_STORAGE_KEY + nom);
    if (!raw) return { punts: 0, nivell: 1 };
    return JSON.parse(raw);
  } catch (e) { return { punts: 0, nivell: 1 }; }
}

function bmGuardarEstat(nom, punts, nivell) {
  const actual = bmGetMillors(nom);
  const nou = {
    punts:  Math.max(actual.punts, punts),
    nivell: Math.max(actual.nivell, nivell),
  };
  localStorage.setItem(BM_STORAGE_KEY + nom, JSON.stringify(nou));
}

// Funció global per al rànquing de jocs.js
function bombermanGetPuntsGlobals() {
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => { pts[nom] = bmGetMillors(nom).punts; });
  return pts;
}
