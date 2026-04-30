// ══════════════════════════════════════════════════════════════
//  SNAKE — Açores 2026
// ══════════════════════════════════════════════════════════════

// ── CONSTANTS ─────────────────────────────────────────────────
const SNAKE_STORAGE_KEY = 'snake_estat_';
const SNAKE_COLS = 20;
const SNAKE_ROWS = 20;
const SNAKE_SPEED_INIT = 180;   // ms per tick inicial
const SNAKE_SPEED_MIN  = 60;    // ms per tick mínim
const SNAKE_SPEED_STEP = 8;     // ms menys per cada poma
const SNAKE_PTS_POM    = 10;    // punts base per poma
const SNAKE_BONUS_SPEED = 2;    // punts extra per nivell de velocitat

// ── ESTAT ─────────────────────────────────────────────────────
let snakeLoop = null;
let snakeDir = { x: 1, y: 0 };
let snakeDirNext = { x: 1, y: 0 };
let snakeBody = [];
let snakePoma = null;
let snakePunts = 0;
let snakeMillor = 0;
let snakeActiu = false;
let snakeSpeed = SNAKE_SPEED_INIT;
let snakePomes = 0;
let snakeCanvas = null;
let snakeCtx = null;
let snakeCellSize = 0;
let snakeTouchStart = null;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarSnake() {
  mostraScreen('snake-inici');
  snakeMillor = snakeGetMillorJugador(jugadorActiu);
  snakeRenderInici();
}

// ── PANTALLA D'INICI ──────────────────────────────────────────
function snakeRenderInici() {
  const millor = snakeGetMillorJugador(jugadorActiu);
  const ranking = snakeRenderRankingHTML();

  document.getElementById('snake-inici-cont').innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">🐍</span>
          <span class="joc-titol-text">Snake</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">Millor: ${millor} pts</div>
          </div>
        </div>
        <div class="snake-instruccions">
          <p>Menja les 🔴 pomes per créixer i sumar punts.</p>
          <p>La serp <strong>accelera</strong> a cada poma. No xoquis amb les parets ni amb tu mateix!</p>
          <ul class="snake-controls-llista">
            <li>⌨️ Cursor / WASD per escriptori</li>
            <li>👆 Botó central per pausar / reprendre</li>
            <li>📱 Botons tàctils o llisca el dit al mòbil</li>
          </ul>
        </div>
        <button class="snake-btn-start" onclick="snakeComençar()">Comença 🚀</button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Snake</div>
        <div class="ranking-list-home" id="snake-ranking-list">${ranking}</div>
      </div>
    </div>`;
}

// ── PANTALLA DE JOC ───────────────────────────────────────────
function snakeComençar() {
  mostraScreen('snake-joc');

  document.getElementById('snake-joc-cont').innerHTML = `
    <div class="snake-game-wrap">
      <div class="snake-topbar">
        <button class="snake-btn-back" onclick="snakeSortir()">← Tornar</button>
        <div class="snake-scores">
          <div class="snake-score-bloc">
            <span class="snake-score-label">Punts</span>
            <span class="snake-score-val" id="snake-pts">0</span>
          </div>
          <div class="snake-score-bloc">
            <span class="snake-score-label">Millor</span>
            <span class="snake-score-val" id="snake-millor">${snakeGetMillorJugador(jugadorActiu)}</span>
          </div>
          <div class="snake-score-bloc">
            <span class="snake-score-label">Pomes</span>
            <span class="snake-score-val" id="snake-pomes">0</span>
          </div>
        </div>
      </div>
      <div class="snake-canvas-wrap">
        <canvas id="snake-canvas"></canvas>
        <div class="snake-overlay" id="snake-overlay">
          <div class="snake-overlay-titol" id="snake-overlay-titol">Preparat?</div>
          <div class="snake-overlay-sub" id="snake-overlay-sub">Prem el botó central per començar</div>
          <button class="snake-btn-play" id="snake-btn-play" onclick="snakeTogglePausa()">▶</button>
        </div>
      </div>
      <div class="snake-dpad" id="snake-dpad">
        <div class="snake-dpad-row">
          <button class="snake-dpad-btn" onclick="snakeDirInput(0,-1)">▲</button>
        </div>
        <div class="snake-dpad-row">
          <button class="snake-dpad-btn" onclick="snakeDirInput(-1,0)">◀</button>
          <button class="snake-dpad-btn centre" onclick="snakeTogglePausa()">⏸</button>
          <button class="snake-dpad-btn" onclick="snakeDirInput(1,0)">▶</button>
        </div>
        <div class="snake-dpad-row">
          <button class="snake-dpad-btn" onclick="snakeDirInput(0,1)">▼</button>
        </div>
      </div>
    </div>`;

  // Configura canvas
  snakeCanvas = document.getElementById('snake-canvas');
  snakeCtx = snakeCanvas.getContext('2d');
  snakeAjustarCanvas();

  // Inicialitza partida
  snakeReset();

  // Escolta teclat
  document.addEventListener('keydown', snakeOnKey);

  // Swipe mòbil al canvas
  snakeCanvas.addEventListener('touchstart', snakeOnTouchStart, { passive: true });
  snakeCanvas.addEventListener('touchend', snakeOnTouchEnd, { passive: true });

  window.addEventListener('resize', snakeAjustarCanvas);
}

function snakeAjustarCanvas() {
  if (!snakeCanvas) return;
  const wrap = snakeCanvas.parentElement;
  const maxW = Math.min(wrap.clientWidth - 4, 480);
  snakeCellSize = Math.floor(maxW / SNAKE_COLS);
  snakeCanvas.width  = snakeCellSize * SNAKE_COLS;
  snakeCanvas.height = snakeCellSize * SNAKE_ROWS;
  if (snakeActiu || snakeBody.length) snakeDibuixar();
}

// ── LÒGICA ────────────────────────────────────────────────────
function snakeReset() {
  snakePunts = 0;
  snakePomes = 0;
  snakeSpeed = SNAKE_SPEED_INIT;
  snakeDir = { x: 1, y: 0 };
  snakeDirNext = { x: 1, y: 0 };
  snakeActiu = false;

  const midX = Math.floor(SNAKE_COLS / 2);
  const midY = Math.floor(SNAKE_ROWS / 2);
  snakeBody = [
    { x: midX,     y: midY },
    { x: midX - 1, y: midY },
    { x: midX - 2, y: midY },
  ];
  snakePoma = snakeNovaPoma();

  snakeActualitzarMarcadors();
  snakeDibuixar();

  // Mostra overlay inicial
  snakeMostrarOverlay('Preparat?', 'Prem ▶ per començar', '▶');
}

function snakeNovaPoma() {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * SNAKE_COLS),
      y: Math.floor(Math.random() * SNAKE_ROWS),
    };
  } while (snakeBody.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

function snakeTogglePausa() {
  if (!snakeActiu) {
    snakeActiu = true;
    document.getElementById('snake-overlay').style.display = 'none';
    // Actualitza botó dpad
    const btnPausa = document.querySelector('.snake-dpad-btn.centre');
    if (btnPausa) btnPausa.textContent = '⏸';
    snakeLoop = setTimeout(snakeTick, snakeSpeed);
  } else {
    snakeActiu = false;
    clearTimeout(snakeLoop);
    snakeMostrarOverlay('⏸ Pausat', 'Prem ▶ per continuar', '▶');
    const btnPausa = document.querySelector('.snake-dpad-btn.centre');
    if (btnPausa) btnPausa.textContent = '▶';
  }
}

function snakeTick() {
  if (!snakeActiu) return;

  snakeDir = { ...snakeDirNext };

  const cap = {
    x: (snakeBody[0].x + snakeDir.x + SNAKE_COLS) % SNAKE_COLS,
    y: (snakeBody[0].y + snakeDir.y + SNAKE_ROWS) % SNAKE_ROWS,
  };

  // Xoca amb parets (sense wrap: mort)
  const xocParet = (
    snakeBody[0].x + snakeDir.x < 0 ||
    snakeBody[0].x + snakeDir.x >= SNAKE_COLS ||
    snakeBody[0].y + snakeDir.y < 0 ||
    snakeBody[0].y + snakeDir.y >= SNAKE_ROWS
  );
  const xocCos = snakeBody.some(s => s.x === cap.x && s.y === cap.y);

  if (xocParet || xocCos) {
    snakeGameOver();
    return;
  }

  snakeBody.unshift(cap);

  if (cap.x === snakePoma.x && cap.y === snakePoma.y) {
    // Menja poma
    snakePomes++;
    const bonus = Math.floor((SNAKE_SPEED_INIT - snakeSpeed) / SNAKE_SPEED_STEP) * SNAKE_BONUS_SPEED;
    snakePunts += SNAKE_PTS_POM + bonus;
    snakePoma = snakeNovaPoma();
    snakeSpeed = Math.max(SNAKE_SPEED_MIN, snakeSpeed - SNAKE_SPEED_STEP);
    snakeActualitzarMarcadors();
  } else {
    snakeBody.pop();
  }

  snakeDibuixar();
  snakeLoop = setTimeout(snakeTick, snakeSpeed);
}

function snakeGameOver() {
  snakeActiu = false;
  clearTimeout(snakeLoop);
  document.removeEventListener('keydown', snakeOnKey);

  // Desa puntuació
  const millor = snakeGetMillorJugador(jugadorActiu);
  const nouRecord = snakePunts > millor;
  snakeGuardarEstat(jugadorActiu, snakePunts);

  // Actualitza marcador millor
  document.getElementById('snake-millor').textContent = Math.max(snakePunts, millor);

  const titol = nouRecord ? '🏆 Nou rècord!' : '💀 Game Over';
  const sub = `${snakePunts} pts · ${snakePomes} pomes${nouRecord ? ' · Millor puntuació!' : ''}`;
  snakeMostrarOverlay(titol, sub, '🔄', true);
}

function snakeMostrarOverlay(titol, sub, iconaBtn, gameOver = false) {
  const el = document.getElementById('snake-overlay');
  if (!el) return;
  el.style.display = 'flex';
  document.getElementById('snake-overlay-titol').textContent = titol;
  document.getElementById('snake-overlay-sub').textContent = sub;
  const btn = document.getElementById('snake-btn-play');
  btn.textContent = iconaBtn;
  if (gameOver) {
    btn.onclick = snakeReiniciar;
  } else {
    btn.onclick = snakeTogglePausa;
  }
}

function snakeReiniciar() {
  document.addEventListener('keydown', snakeOnKey);
  snakeReset();
}

function snakeSortir() {
  clearTimeout(snakeLoop);
  snakeActiu = false;
  document.removeEventListener('keydown', snakeOnKey);
  window.removeEventListener('resize', snakeAjustarCanvas);
  mostraScreen('snake-inici');
  snakeRenderInici();
}

// ── DIBUIX ────────────────────────────────────────────────────
function snakeDibuixar() {
  if (!snakeCtx) return;
  const ctx = snakeCtx;
  const cs = snakeCellSize;
  const w = snakeCanvas.width;
  const h = snakeCanvas.height;

  // Fons
  ctx.fillStyle = '#0a1628';
  ctx.fillRect(0, 0, w, h);

  // Quadrícula subtil
  ctx.strokeStyle = 'rgba(45,90,61,0.15)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= SNAKE_COLS; x++) {
    ctx.beginPath(); ctx.moveTo(x * cs, 0); ctx.lineTo(x * cs, h); ctx.stroke();
  }
  for (let y = 0; y <= SNAKE_ROWS; y++) {
    ctx.beginPath(); ctx.moveTo(0, y * cs); ctx.lineTo(w, y * cs); ctx.stroke();
  }

  // Cos de la serp
  snakeBody.forEach((seg, i) => {
    const pct = i / snakeBody.length;
    // Gradient del cap (verd clar) a la cua (verd fosc)
    const r = Math.round(45  + (168 - 45)  * (1 - pct));
    const g = Math.round(90  + (216 - 90)  * (1 - pct));
    const b = Math.round(61  + (176 - 61)  * (1 - pct));
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    const padding = i === 0 ? 1 : 2;
    const size = cs - padding * 2;
    const radius = i === 0 ? cs * 0.3 : cs * 0.2;
    snakeRoundRect(ctx, seg.x * cs + padding, seg.y * cs + padding, size, size, radius);
    ctx.fill();
  });

  // Ulls al cap
  if (snakeBody.length > 0) {
    const cap = snakeBody[0];
    ctx.fillStyle = '#0a1628';
    const ox = snakeDir.x;
    const oy = snakeDir.y;
    const cx = cap.x * cs + cs / 2;
    const cy = cap.y * cs + cs / 2;
    const r  = cs * 0.09;
    const d  = cs * 0.22;
    // Perpendicular als ulls
    const px = -oy, py = ox;
    ctx.beginPath();
    ctx.arc(cx + ox * d + px * d * 0.6, cy + oy * d + py * d * 0.6, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + ox * d - px * d * 0.6, cy + oy * d - py * d * 0.6, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Poma
  if (snakePoma) {
    const px = snakePoma.x * cs + cs / 2;
    const py = snakePoma.y * cs + cs / 2;
    const rad = cs * 0.35;
    ctx.fillStyle = '#e53e3e';
    ctx.beginPath();
    ctx.arc(px, py, rad, 0, Math.PI * 2);
    ctx.fill();
    // Branca
    ctx.strokeStyle = '#2d5a3d';
    ctx.lineWidth = cs * 0.07;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(px, py - rad * 0.8);
    ctx.lineTo(px + rad * 0.4, py - rad * 1.3);
    ctx.stroke();
  }
}

function snakeRoundRect(ctx, x, y, w, h, r) {
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

// ── CONTROLS ──────────────────────────────────────────────────
function snakeDirInput(dx, dy) {
  // Evita girar 180°
  if (dx !== 0 && snakeDir.x !== 0) return;
  if (dy !== 0 && snakeDir.y !== 0) return;
  snakeDirNext = { x: dx, y: dy };
  if (!snakeActiu) snakeTogglePausa();
}

function snakeOnKey(e) {
  const mapa = {
    ArrowUp:    { x:  0, y: -1 },
    ArrowDown:  { x:  0, y:  1 },
    ArrowLeft:  { x: -1, y:  0 },
    ArrowRight: { x:  1, y:  0 },
    w: { x:  0, y: -1 },
    s: { x:  0, y:  1 },
    a: { x: -1, y:  0 },
    d: { x:  1, y:  0 },
  };
  if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
    snakeTogglePausa(); return;
  }
  const dir = mapa[e.key];
  if (!dir) return;
  e.preventDefault();
  snakeDirInput(dir.x, dir.y);
}

function snakeOnTouchStart(e) {
  const t = e.touches[0];
  snakeTouchStart = { x: t.clientX, y: t.clientY };
}

function snakeOnTouchEnd(e) {
  if (!snakeTouchStart) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - snakeTouchStart.x;
  const dy = t.clientY - snakeTouchStart.y;
  snakeTouchStart = null;

  if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
    snakeTogglePausa(); return;
  }
  if (Math.abs(dx) > Math.abs(dy)) {
    snakeDirInput(dx > 0 ? 1 : -1, 0);
  } else {
    snakeDirInput(0, dy > 0 ? 1 : -1);
  }
}

// ── MARCADORS ─────────────────────────────────────────────────
function snakeActualitzarMarcadors() {
  const elPts   = document.getElementById('snake-pts');
  const elPomes = document.getElementById('snake-pomes');
  if (elPts)   elPts.textContent   = snakePunts;
  if (elPomes) elPomes.textContent = snakePomes;
}

// ── RÀNQUING ──────────────────────────────────────────────────
function snakeRenderRankingHTML() {
  const llista = JUGADORS_VALIDS.map(nom => ({
    nom,
    punts: snakeGetMillorJugador(nom),
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
function snakeGetMillorJugador(nom) {
  try {
    const raw = localStorage.getItem(SNAKE_STORAGE_KEY + nom);
    if (!raw) return 0;
    const d = JSON.parse(raw);
    return d.millor || 0;
  } catch (e) { return 0; }
}

function snakeGuardarEstat(nom, punts) {
  const millor = Math.max(snakeGetMillorJugador(nom), punts);
  localStorage.setItem(SNAKE_STORAGE_KEY + nom, JSON.stringify({ millor }));
}

// Funció global per al rànquing de jocs.js
function snakeGetPuntsGlobals() {
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => {
    pts[nom] = snakeGetMillorJugador(nom);
  });
  return pts;
}
