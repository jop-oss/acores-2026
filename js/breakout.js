// ══════════════════════════════════════════════════════════════
//  BREAKOUT — Açores 2026
// ══════════════════════════════════════════════════════════════


// ── NIVELLS (patrons de blocs) ────────────────────────────────
// Cada nivell: matriu de files. Cada valor = color (0 = buit).
// Colors: 1=vermell(3pts) 2=taronja(2pts) 3=groc(2pts) 4=verd(1pt) 5=blau(1pt)
const BK_NIVELLS = [
  { nom: 'Vulcà',   blocs: [
    [1,1,1,1,1,1,1,1,1,1],
    [2,2,2,2,2,2,2,2,2,2],
    [3,3,3,3,3,3,3,3,3,3],
    [4,4,4,4,4,4,4,4,4,4],
    [5,5,5,5,5,5,5,5,5,5],
  ]},
  { nom: 'Caldera', blocs: [
    [0,1,1,1,1,1,1,1,1,0],
    [1,2,2,2,2,2,2,2,2,1],
    [1,2,3,3,3,3,3,3,2,1],
    [1,2,3,4,4,4,4,3,2,1],
    [0,1,2,3,4,5,4,3,2,1],
    [0,0,1,2,3,4,3,2,1,0],
  ]},
  { nom: 'Açores',  blocs: [
    [1,0,1,0,1,0,1,0,1,0],
    [0,2,0,2,0,2,0,2,0,2],
    [3,0,3,0,3,0,3,0,3,0],
    [0,4,0,4,0,4,0,4,0,4],
    [5,5,5,5,5,5,5,5,5,5],
    [4,4,4,4,4,4,4,4,4,4],
  ]},
  { nom: 'Tsunami', blocs: [
    [1,1,0,0,1,1,0,0,1,1],
    [2,2,2,0,2,2,2,0,2,2],
    [3,3,3,3,3,3,3,3,3,3],
    [4,0,4,0,4,0,4,0,4,0],
    [5,5,0,0,5,5,0,0,5,5],
    [1,2,3,4,5,5,4,3,2,1],
  ]},
  { nom: 'Infern',  blocs: [
    [1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,1],
    [1,2,3,3,3,3,3,3,2,1],
    [1,2,3,4,4,4,4,3,2,1],
    [1,2,3,4,5,5,4,3,2,1],
    [1,2,3,4,5,5,4,3,2,1],
    [1,2,3,4,4,4,4,3,2,1],
  ]},
];

const BK_COLORS = {
  0: null,
  1: '#e53e3e',
  2: '#ed8936',
  3: '#ecc94b',
  4: '#6aab7a',
  5: '#63b3ed',
};
const BK_PTS = { 1:3, 2:2, 3:2, 4:1, 5:1 };

// Power-ups
const BK_POWERUP_CHANCE = 0.18; // 18% per bloc destruït
const BK_POWERUPS = ['pala-ampla','pilota-gran','multiball','lent'];
const BK_PU_COLORS = {
  'pala-ampla':  '#ecc94b',
  'pilota-gran': '#ed8936',
  'multiball':   '#63b3ed',
  'lent':        '#b794f4',
};
const BK_PU_ICONES = {
  'pala-ampla':  '↔',
  'pilota-gran': '⬤',
  'multiball':   '✦',
  'lent':        '❄',
};
const BK_PU_DURADA = 8000; // ms

// ── ESTAT GLOBAL ──────────────────────────────────────────────
let bkCanvas, bkCtx;
let bkW, bkH, bkScala;
let bkLoop = null;
let bkActiu = false;
let bkPausa = false;

let bkNivell, bkVides, bkPunts, bkBlocs;
let bkPala, bkPilotes, bkPowerups, bkPuActius;
let bkTouchX = null;
let bkLastTime = 0;
let bkNivellActual = 0;

// Mides lògiques (unitats independents de px)
const BK_LW = 400, BK_LH = 500;
const BK_PALA_H = 10, BK_PALA_W_BASE = 70;
const BK_PILOTA_R_BASE = 6;
const BK_BLOC_COLS = 10, BK_BLOC_H = 18, BK_BLOC_GAP = 3;
const BK_BLOC_TOP = 50;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
async function iniciarBreakout() {
  mostraScreen('breakout-inici');
  document.getElementById('breakout-inici-cont').innerHTML = '<div class="joc-carregant">Carregant…</div>';
  await jocFsCarregarTots(BREAKOUT_COL, JUGADORS_VALIDS);
  bkRenderInici();
}

// ── PANTALLA D'INICI ──────────────────────────────────────────
function bkRenderInici() {
  const millor = bkGetMillor(jugadorActiu);
  document.getElementById('breakout-inici-cont').innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">🧱</span>
          <span class="joc-titol-text">Breakout</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">Millor: ${millor} pts</div>
          </div>
        </div>
        <div class="snake-instruccions">
          <p>Destrueix tots els blocs de cada nivell amb la pilota.</p>
          <p><strong>3 vides · ${BK_NIVELLS.length} nivells</strong> · Power-ups aleatoris</p>
          <ul class="snake-controls-llista">
            <li>🖱️ Ratolí / tàctil per moure la pala</li>
            <li>⌨️ ← → o A D per escriptori</li>
            <li>▶ Prem el botó central o espai per llançar</li>
          </ul>
          <div class="bk-pu-llegenda">
            ${Object.entries(BK_PU_ICONES).map(([k,v]) => `
              <span class="bk-pu-chip" style="background:${BK_PU_COLORS[k]}22;border-color:${BK_PU_COLORS[k]}66;color:${BK_PU_COLORS[k]}">
                ${v} ${k.replace('-',' ')}
              </span>`).join('')}
          </div>
        </div>
        <button class="snake-btn-start" onclick="bkComençar()">Comença 🚀</button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Breakout</div>
        <div class="ranking-list-home" id="bk-ranking-list">${bkRenderRankingHTML()}</div>
      </div>
    </div>`;
}

// ── PANTALLA DE JOC ───────────────────────────────────────────
function bkComençar() {
  mostraScreen('breakout-joc');

  document.getElementById('breakout-joc-cont').innerHTML = `
    <div class="snake-game-wrap">
      <div class="snake-topbar" style="max-width:${BK_LW}px">
        <button class="snake-btn-back" onclick="bkSortir()">← Tornar</button>
        <div class="snake-scores">
          <div class="snake-score-bloc">
            <span class="snake-score-label">Punts</span>
            <span class="snake-score-val" id="bk-pts">0</span>
          </div>
          <div class="snake-score-bloc snake-score-bloc-personal">
            <span class="snake-score-label">Teu</span>
            <span class="snake-score-val" id="bk-millor-personal">${bkGetMillor(jugadorActiu)}</span>
          </div>
          <div class="snake-score-bloc snake-score-bloc-record">
            <span class="snake-score-label">🏆 Rec.</span>
            <span class="snake-score-val" id="bk-millor">${bkGetMillorGlobal()}</span>
          </div>
          <div class="snake-score-bloc">
            <span class="snake-score-label">Nivell</span>
            <span class="snake-score-val" id="bk-nivell">1</span>
          </div>
          <div class="snake-score-bloc">
            <span class="snake-score-label">Vides</span>
            <span class="snake-score-val" id="bk-vides">❤️❤️❤️</span>
          </div>
        </div>
      </div>
      <div class="snake-canvas-wrap" id="bk-canvas-wrap" style="width:min(${BK_LW}px, calc(100vw - 2rem))">
        <canvas id="bk-canvas"></canvas>
        <div class="snake-overlay" id="bk-overlay">
          <div class="snake-overlay-titol" id="bk-overlay-titol">Preparat?</div>
          <div class="snake-overlay-sub" id="bk-overlay-sub"></div>
          <button class="snake-btn-play" id="bk-btn-play" onclick="bkTogglePausa()">▶</button>
        </div>
      </div>
      <div id="bk-pu-actius" class="bk-pu-actius-bar"></div>
    </div>`;

  bkCanvas = document.getElementById('bk-canvas');
  bkCtx = bkCanvas.getContext('2d');
  bkAjustarCanvas();

  bkIniciarPartida();

  document.addEventListener('keydown', bkOnKey);
  document.addEventListener('keyup', bkOnKeyUp);
  bkCanvas.addEventListener('mousemove', bkOnMouse);
  bkCanvas.addEventListener('touchmove', bkOnTouch, { passive: true });
  bkCanvas.addEventListener('touchstart', bkOnTouchStart, { passive: true });
  window.addEventListener('resize', bkAjustarCanvas);
}

function bkAjustarCanvas() {
  if (!bkCanvas) return;
  const wrap = document.getElementById('bk-canvas-wrap');
  if (!wrap) return;
  const cssW = wrap.clientWidth;
  bkScala = cssW / BK_LW;
  bkCanvas.width  = cssW;
  bkCanvas.height = Math.round(BK_LH * bkScala);
  bkW = bkCanvas.width;
  bkH = bkCanvas.height;
  if (bkBlocs) bkDibuixar();
}

// ── INICIALITZAR ──────────────────────────────────────────────
function bkIniciarPartida() {
  bkNivellActual = 0;
  bkVides = 3;
  bkPunts = 0;
  bkActiu = false;
  bkPausa = false;
  bkPowerups = [];
  bkPuActius = {};
  bkCarregarNivell(0);
  bkMostrarOverlay('Preparat?', 'Prem ▶ per llançar la pilota', '▶', false);
}

function bkCarregarNivell(idx) {
  bkNivellActual = idx;
  const def = BK_NIVELLS[idx % BK_NIVELLS.length];
  bkNivell = def;

  // Construeix blocs
  const blocW = (BK_LW - (BK_BLOC_COLS + 1) * BK_BLOC_GAP) / BK_BLOC_COLS;
  bkBlocs = [];
  def.blocs.forEach((fila, fi) => {
    fila.forEach((color, ci) => {
      if (!color) return;
      const x = BK_BLOC_GAP + ci * (blocW + BK_BLOC_GAP);
      const y = BK_BLOC_TOP + fi * (BK_BLOC_H + BK_BLOC_GAP);
      bkBlocs.push({ x, y, w: blocW, h: BK_BLOC_H, color, viu: true });
    });
  });

  // Pala
  const palaW = bkGetPalaW();
  bkPala = { x: BK_LW / 2 - palaW / 2, y: BK_LH - 30, w: palaW, h: BK_PALA_H, vx: 0 };

  // Pilota inicial (enganxada a la pala)
  bkPilotes = [bkNovaPilota()];
  bkPowerups = [];

  bkActualitzarMarcadors();
  bkDibuixar();
}

function bkNovaPilota(lliure = false) {
  const r = bkGetPilotaR();
  const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;
  const speed = bkGetSpeed();
  return {
    x: bkPala.x + bkPala.w / 2,
    y: bkPala.y - r - 1,
    r,
    vx: lliure ? Math.cos(angle) * speed : 0,
    vy: lliure ? Math.sin(angle) * speed : 0,
    enganxada: !lliure,
  };
}

function bkGetSpeed() {
  return 220 + bkNivellActual * 20; // unitats lògiques/s
}
function bkGetPalaW() {
  return bkPuActius['pala-ampla'] ? BK_PALA_W_BASE * 1.7 : BK_PALA_W_BASE;
}
function bkGetPilotaR() {
  return bkPuActius['pilota-gran'] ? BK_PILOTA_R_BASE * 1.6 : BK_PILOTA_R_BASE;
}

// ── GAME LOOP ─────────────────────────────────────────────────
function bkTick(ts) {
  if (!bkActiu) return;
  const dt = Math.min((ts - bkLastTime) / 1000, 0.05);
  bkLastTime = ts;

  bkTeclatMourePala(dt);
  bkMourePilotes(dt);
  bkMourePowerups(dt);
  bkDibuixar();
  bkLoop = requestAnimationFrame(bkTick);
}

// ── MOVIMENT PALA (teclat) ────────────────────────────────────
const bkTecles = {};
function bkOnKey(e) {
  bkTecles[e.key] = true;
  if (e.key === ' ' || e.key === 'ArrowUp') {
    e.preventDefault();
    if (bkActiu) {
      bkLlançarPilotaEnganxada();
    } else {
      bkTogglePausa();
    }
  }
}
function bkOnKeyUp(e) { bkTecles[e.key] = false; }

function bkTeclatMourePala(dt) {
  const speed = 320;
  if (bkTecles['ArrowLeft'] || bkTecles['a'] || bkTecles['A']) {
    bkPala.x -= speed * dt;
  }
  if (bkTecles['ArrowRight'] || bkTecles['d'] || bkTecles['D']) {
    bkPala.x += speed * dt;
  }
  bkPala.x = Math.max(0, Math.min(BK_LW - bkPala.w, bkPala.x));

  // Pilotes enganxades segueixen la pala
  bkPilotes.forEach(p => {
    if (p.enganxada) p.x = bkPala.x + bkPala.w / 2;
  });
}

function bkOnMouse(e) {
  const rect = bkCanvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / bkScala;
  bkPala.x = mx - bkPala.w / 2;
  bkPala.x = Math.max(0, Math.min(BK_LW - bkPala.w, bkPala.x));
  bkPilotes.forEach(p => { if (p.enganxada) p.x = bkPala.x + bkPala.w / 2; });
}

function bkOnTouchStart(e) {
  const rect = bkCanvas.getBoundingClientRect();
  bkTouchX = (e.touches[0].clientX - rect.left) / bkScala;
}
function bkOnTouch(e) {
  if (!e.touches.length) return;
  const rect = bkCanvas.getBoundingClientRect();
  const mx = (e.touches[0].clientX - rect.left) / bkScala;
  const dx = mx - (bkTouchX ?? mx);
  bkTouchX = mx;
  bkPala.x += dx;
  bkPala.x = Math.max(0, Math.min(BK_LW - bkPala.w, bkPala.x));
  bkPilotes.forEach(p => { if (p.enganxada) p.x = bkPala.x + bkPala.w / 2; });
}

// ── MOVIMENT PILOTES ──────────────────────────────────────────
function bkMourePilotes(dt) {
  const lent = bkPuActius['lent'] ? 0.55 : 1;

  bkPilotes.forEach(p => {
    if (p.enganxada) return;

    p.x += p.vx * dt * lent;
    p.y += p.vy * dt * lent;

    // Parets laterals
    if (p.x - p.r < 0)        { p.x = p.r;          p.vx = Math.abs(p.vx); }
    if (p.x + p.r > BK_LW)    { p.x = BK_LW - p.r;  p.vx = -Math.abs(p.vx); }
    // Paret superior
    if (p.y - p.r < 0)        { p.y = p.r;           p.vy = Math.abs(p.vy); }

    // Pilota perduda
    if (p.y - p.r > BK_LH) {
      p.morta = true;
      return;
    }

    // Col·lisió pala
    if (
      p.vy > 0 &&
      p.y + p.r >= bkPala.y &&
      p.y - p.r <= bkPala.y + bkPala.h &&
      p.x >= bkPala.x - p.r &&
      p.x <= bkPala.x + bkPala.w + p.r
    ) {
      p.y = bkPala.y - p.r;
      // Angle de rebot basat en posició relativa a la pala
      const rel = (p.x - (bkPala.x + bkPala.w / 2)) / (bkPala.w / 2);
      const angle = rel * (Math.PI / 3); // màx 60°
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      p.vx = Math.sin(angle) * speed;
      p.vy = -Math.cos(angle) * speed;
    }

    // Col·lisió blocs
    bkBlocs.forEach(b => {
      if (!b.viu) return;
      if (
        p.x + p.r > b.x && p.x - p.r < b.x + b.w &&
        p.y + p.r > b.y && p.y - p.r < b.y + b.h
      ) {
        // Determina eix de col·lisió
        const overlapX = Math.min(p.x + p.r - b.x, b.x + b.w - (p.x - p.r));
        const overlapY = Math.min(p.y + p.r - b.y, b.y + b.h - (p.y - p.r));
        if (overlapX < overlapY) p.vx *= -1;
        else p.vy *= -1;

        b.viu = false;
        bkPunts += BK_PTS[b.color] || 1;
        bkActualitzarMarcadors();

        // Power-up?
        if (Math.random() < BK_POWERUP_CHANCE) {
          const tipus = BK_POWERUPS[Math.floor(Math.random() * BK_POWERUPS.length)];
          bkPowerups.push({
            x: b.x + b.w / 2, y: b.y + b.h / 2,
            vy: 90, tipus, r: 10,
          });
        }
      }
    });
  });

  // Elimina pilotes mortes
  const mortes = bkPilotes.filter(p => p.morta).length;
  bkPilotes = bkPilotes.filter(p => !p.morta);

  if (mortes > 0 && bkPilotes.length === 0) {
    bkPerdreVida();
    return;
  }

  // Nivell completat?
  if (bkBlocs.every(b => !b.viu)) {
    bkNivellComplet();
  }
}

function bkPerdreVida() {
  bkVides--;
  bkActualitzarMarcadors();
  if (bkVides <= 0) {
    bkGameOver();
  } else {
    bkActiu = false;
    cancelAnimationFrame(bkLoop);
    // Reinicia pilota i pala (sense reiniciar blocs)
    const palaW = bkGetPalaW();
    bkPala.x = BK_LW / 2 - palaW / 2;
    bkPala.w = palaW;
    bkPilotes = [bkNovaPilota(false)];
    bkDibuixar();
    bkMostrarOverlay('💔 Vida perduda', `Et queden ${bkVides} vida${bkVides > 1 ? 's' : ''}`, '▶', false);
  }
}

function bkNivellComplet() {
  bkActiu = false;
  cancelAnimationFrame(bkLoop);
  // Bonus de nivell
  const bonus = 50 * (bkNivellActual + 1);
  bkPunts += bonus;
  bkActualitzarMarcadors();

  const segNivell = bkNivellActual + 1;
  if (segNivell >= BK_NIVELLS.length) {
    // Joc completat!
    bkFinalPartida(true);
  } else {
    // Passa al nivell següent
    Object.keys(bkPuActius).forEach(k => {
      clearTimeout(bkPuActius[k]);
      delete bkPuActius[k];
    });
    bkPuActius = {};
    bkMostrarOverlay(
      `✅ ${bkNivell.nom} completat!`,
      `+${bonus} pts bonus · Nivell ${segNivell + 1}: ${BK_NIVELLS[segNivell].nom}`,
      '▶', false, () => {
        bkCarregarNivell(segNivell);
        bkMostrarOverlay(`Nivell ${segNivell + 1}: ${BK_NIVELLS[segNivell].nom}`, 'Prem ▶ per llançar', '▶', false);
      }
    );
  }
}

function bkGameOver() {
  cancelAnimationFrame(bkLoop);
  bkActiu = false;
  document.removeEventListener('keydown', bkOnKey);
  document.removeEventListener('keyup', bkOnKeyUp);

  const millor = bkGetMillor(jugadorActiu);
  const nouRecord = bkPunts > millor;
  bkGuardarEstat(jugadorActiu, bkPunts);

  const titol = nouRecord ? '🏆 Nou rècord!' : '💀 Game Over';
  const sub = `${bkPunts} pts · Nivell ${bkNivellActual + 1}${nouRecord ? ' · Millor puntuació!' : ''}`;
  bkMostrarOverlay(titol, sub, '🔄', true);
}

function bkFinalPartida(completat) {
  cancelAnimationFrame(bkLoop);
  bkActiu = false;
  document.removeEventListener('keydown', bkOnKey);
  document.removeEventListener('keyup', bkOnKeyUp);

  const millor = bkGetMillor(jugadorActiu);
  const nouRecord = bkPunts > millor;
  bkGuardarEstat(jugadorActiu, bkPunts);

  const titol = completat ? '🎉 Has completat tots els nivells!' : '💀 Game Over';
  const sub = `${bkPunts} pts${nouRecord ? ' · Nou rècord!' : ''}`;
  bkMostrarOverlay(titol, sub, '🔄', true);
}

// ── POWER-UPS ─────────────────────────────────────────────────
function bkMourePowerups(dt) {
  bkPowerups.forEach(pu => {
    pu.y += pu.vy * dt;

    // Col·lisió pala
    if (
      pu.y + pu.r >= bkPala.y &&
      pu.y - pu.r <= bkPala.y + bkPala.h &&
      pu.x >= bkPala.x &&
      pu.x <= bkPala.x + bkPala.w
    ) {
      pu.recollit = true;
      bkActivarPowerup(pu.tipus);
    }

    if (pu.y - pu.r > BK_LH) pu.recollit = true;
  });
  bkPowerups = bkPowerups.filter(pu => !pu.recollit);
}

function bkActivarPowerup(tipus) {
  // Cancel·la timer anterior si ja actiu
  if (bkPuActius[tipus]) clearTimeout(bkPuActius[tipus]);

  if (tipus === 'pala-ampla') {
    bkPala.w = BK_PALA_W_BASE * 1.7;
  } else if (tipus === 'pilota-gran') {
    bkPilotes.forEach(p => { p.r = BK_PILOTA_R_BASE * 1.6; });
  } else if (tipus === 'multiball') {
    // Afegeix 2 pilotes extra a partir de les existents
    const noves = [];
    bkPilotes.filter(p => !p.enganxada).slice(0, 1).forEach(p => {
      [-0.4, 0.4].forEach(offset => {
        const angle = Math.atan2(p.vy, p.vx) + offset;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        noves.push({
          x: p.x, y: p.y,
          r: p.r,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          enganxada: false,
        });
      });
    });
    bkPilotes.push(...noves);
  }
  // 'lent' es gestiona al moviment via bkPuActius['lent']

  bkPuActius[tipus] = setTimeout(() => {
    delete bkPuActius[tipus];
    // Reverteix
    if (tipus === 'pala-ampla')   bkPala.w = BK_PALA_W_BASE;
    if (tipus === 'pilota-gran')  bkPilotes.forEach(p => { p.r = BK_PILOTA_R_BASE; });
    bkRenderPuActius();
  }, BK_PU_DURADA);

  bkRenderPuActius();
}

function bkRenderPuActius() {
  const el = document.getElementById('bk-pu-actius');
  if (!el) return;
  const actius = Object.keys(bkPuActius);
  el.innerHTML = actius.map(k => `
    <span class="bk-pu-chip" style="background:${BK_PU_COLORS[k]}33;border-color:${BK_PU_COLORS[k]};color:${BK_PU_COLORS[k]}">
      ${BK_PU_ICONES[k]} ${k.replace('-',' ')}
    </span>`).join('');
}

// ── LLANÇAR PILOTA ENGANXADA ──────────────────────────────────
function bkLlançarPilotaEnganxada() {
  const p = bkPilotes.find(p => p.enganxada);
  if (!p) return;
  const speed = bkGetSpeed();
  const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.3;
  p.vx = Math.cos(angle) * speed;
  p.vy = Math.sin(angle) * speed;
  p.enganxada = false;
}

// ── PAUSA / PLAY ──────────────────────────────────────────────
let _bkOverlayCallback = null;
function bkTogglePausa() {
  if (_bkOverlayCallback) {
    const cb = _bkOverlayCallback;
    _bkOverlayCallback = null;
    document.getElementById('bk-overlay').style.display = 'none';
    cb();
    return;
  }
  if (!bkActiu) {
    // Inicia o reprèn
    bkActiu = true;
    document.getElementById('bk-overlay').style.display = 'none';
    // Si totes les pilotes enganxades, llança
    if (bkPilotes.every(p => p.enganxada)) bkLlançarPilotaEnganxada();
    bkLastTime = performance.now();
    bkLoop = requestAnimationFrame(bkTick);
  } else {
    // Pausa
    bkActiu = false;
    cancelAnimationFrame(bkLoop);
    bkMostrarOverlay('⏸ Pausa', 'Prem ▶ per continuar', '▶', false);
  }
}

function bkMostrarOverlay(titol, sub, icona, gameOver = false, callback = null) {
  const el = document.getElementById('bk-overlay');
  if (!el) return;
  el.style.display = 'flex';
  document.getElementById('bk-overlay-titol').textContent = titol;
  document.getElementById('bk-overlay-sub').textContent = sub;
  const btn = document.getElementById('bk-btn-play');
  btn.textContent = icona;
  _bkOverlayCallback = null;
  if (gameOver) {
    btn.onclick = bkReiniciar;
  } else if (callback) {
    _bkOverlayCallback = callback;
    btn.onclick = bkTogglePausa;
  } else {
    btn.onclick = bkTogglePausa;
  }
}

function bkReiniciar() {
  document.addEventListener('keydown', bkOnKey);
  document.addEventListener('keyup', bkOnKeyUp);
  bkIniciarPartida();
}

function bkSortir() {
  cancelAnimationFrame(bkLoop);
  bkActiu = false;
  document.removeEventListener('keydown', bkOnKey);
  document.removeEventListener('keyup', bkOnKeyUp);
  window.removeEventListener('resize', bkAjustarCanvas);
  mostraScreen('breakout-inici');
  bkRenderInici();
}

// ── DIBUIX ────────────────────────────────────────────────────
function bkDibuixar() {
  if (!bkCtx) return;
  const ctx = bkCtx;
  const s = bkScala;

  // Fons
  ctx.fillStyle = '#0a1628';
  ctx.fillRect(0, 0, bkW, bkH);

  // Línies de quadrícula subtils
  ctx.strokeStyle = 'rgba(45,90,61,0.1)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < BK_LW; x += 20) {
    ctx.beginPath(); ctx.moveTo(x * s, 0); ctx.lineTo(x * s, bkH); ctx.stroke();
  }
  for (let y = 0; y < BK_LH; y += 20) {
    ctx.beginPath(); ctx.moveTo(0, y * s); ctx.lineTo(bkW, y * s); ctx.stroke();
  }

  // Blocs
  bkBlocs.forEach(b => {
    if (!b.viu) return;
    const x = b.x * s, y = b.y * s, w = b.w * s, h = b.h * s;
    ctx.fillStyle = BK_COLORS[b.color];
    bkRoundRect(ctx, x + 1, y + 1, w - 2, h - 2, 3 * s);
    ctx.fill();
    // Brillantor superior
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    bkRoundRect(ctx, x + 2, y + 1, w - 4, h * 0.4, 2 * s);
    ctx.fill();
  });

  // Power-ups caients
  bkPowerups.forEach(pu => {
    const x = pu.x * s, y = pu.y * s, r = pu.r * s;
    ctx.fillStyle = BK_PU_COLORS[pu.tipus];
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${r * 1.1}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(BK_PU_ICONES[pu.tipus], x, y);
  });

  // Pala
  const px = bkPala.x * s, py = bkPala.y * s;
  const pw = bkPala.w * s, ph = bkPala.h * s;
  const grad = ctx.createLinearGradient(px, py, px, py + ph);
  grad.addColorStop(0, '#6aab7a');
  grad.addColorStop(1, '#2d5a3d');
  ctx.fillStyle = grad;
  bkRoundRect(ctx, px, py, pw, ph, 5 * s);
  ctx.fill();

  // Pilotes
  bkPilotes.forEach(p => {
    const x = p.x * s, y = p.y * s, r = p.r * s;
    const gr = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
    gr.addColorStop(0, '#ffffff');
    gr.addColorStop(0.5, '#a8d8b0');
    gr.addColorStop(1, '#2d5a3d');
    ctx.fillStyle = gr;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  });
}

function bkRoundRect(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ── MARCADORS ─────────────────────────────────────────────────
function bkActualitzarMarcadors() {
  const vEls = ['❤️', '❤️', '❤️'];
  const videsText = vEls.slice(0, bkVides).join('') || '💀';
  const elPts    = document.getElementById('bk-pts');
  const elNivell = document.getElementById('bk-nivell');
  const elVides  = document.getElementById('bk-vides');
  if (elPts)    elPts.textContent    = bkPunts;
  if (elNivell) elNivell.textContent = bkNivellActual + 1;
  if (elVides)  elVides.textContent  = videsText;
}

// ── RÀNQUING ──────────────────────────────────────────────────
function bkRenderRankingHTML() {
  const llista = JUGADORS_VALIDS.map(nom => ({
    nom, punts: bkGetMillor(nom),
  })).sort((a, b) => b.punts - a.punts);
  const posEmoji = ['🥇', '🥈', '🥉'];
  const maxPts = llista[0]?.punts || 1;
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

// ── PERSISTÈNCIA ──────────────────────────────────────────────
const BREAKOUT_COL = 'breakout_punts';

function bkGetMillorGlobal() {
  return Math.max(0, ...JUGADORS_VALIDS.map(n => bkGetMillor(n)));
}

function bkGetMillor(nom) {
  const d = jocFsCacheGet(BREAKOUT_COL, nom);
  return (d && d.millor) || 0;
}

function bkGuardarEstat(nom, punts) {
  const millor = Math.max(bkGetMillor(nom), punts);
  jocFsDesar(BREAKOUT_COL, nom, { millor });
}

// Funció global per al rànquing de jocs.js
async function breakoutGetPuntsGlobals() {
  const dades = await jocFsCarregarTots(BREAKOUT_COL, JUGADORS_VALIDS);
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => { pts[nom] = (dades[nom] && dades[nom].millor) || 0; });
  return pts;
}
