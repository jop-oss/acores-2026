// ══════════════════════════════════════════════════════════════
//  ASTEROID SHOOTER — Açores 2026
// ══════════════════════════════════════════════════════════════

const AST_STORAGE_KEY = 'asteroid_estat_';

// ── DIMENSIONS LÒGIQUES ───────────────────────────────────────
const AST_LW = 400, AST_LH = 400;

// Nau
const AST_NAU_VEL  = 220;  // px/s
const AST_NAU_R    = 14;   // radi hitbox
const AST_NAU_Y    = AST_LH - 40; // y base de la nau (pot pujar fins a LH/2)
const AST_NAU_Y_MIN = AST_LH * 0.45; // no pot pujar per sobre de la meitat

// Bales (auto-fire cap amunt)
const AST_BALA_VEL   = 420;
const AST_BALA_VIDA  = 1.3;
const AST_BALA_R     = 6;
const AST_BALA_DELAY = 0.30;
const AST_BALA_DELAY_RPD = 0.14;

// Asteroides
const AST_MIDES = {
  gran:  { r: 28, pts: 20,  vYMin: 50,  vYMax: 85,  fills: 'mitja', nFills: 2 },
  mitja: { r: 16, pts: 50,  vYMin: 75,  vYMax: 115, fills: 'petit', nFills: 2 },
  petit: { r: 8,  pts: 100, vYMin: 100, vYMax: 150, fills: null,    nFills: 0 },
};

// Power-ups
const AST_PU_CHANCE = 0.28;
const AST_PU_TIPUS  = ['doble','triple','rapid','gran','escut'];
const AST_PU_COLORS = { doble:'#ecc94b', triple:'#ed8936', rapid:'#63b3ed', gran:'#e53e3e', escut:'#b794f4' };
const AST_PU_ICONES = { doble:'2×', triple:'3×', rapid:'⚡', gran:'●', escut:'🛡' };
const AST_PU_DUR    = 8000;

// Invulnerabilitat respawn
const AST_INVUL_DUR = 2.5;

// ── ESTAT ─────────────────────────────────────────────────────
let astCanvas, astCtx, astScala, astW, astH;
let astLoop = null, astActiu = false, astLastTime = 0, astFrameT = 0;
let astNau, astBales, astAsteroides, astPowerups, astParticules;
let astVides, astPunts, astNivell;
let astInvul, astInvulTmr, astBalaTimer;
let astPuActius = {};
let astMortTimer = null;

const astTecles = {};
let astJoyVec = { x: 0, y: 0 };
let astJoyOrigin = null, astJoyId = null;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarAsteroid() {
  mostraScreen('asteroid-inici');
  astRenderInici();
}

function astRenderInici() {
  const millor = astGetMillor(jugadorActiu);
  document.getElementById('asteroid-inici-cont').innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">🚀</span>
          <span class="joc-titol-text">Asteroid Shooter</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">Millor: ${millor} pts</div>
          </div>
        </div>
        <div class="snake-instruccions">
          <p>Destrueix tots els asteroides que cauen. La nau <strong>dispara sola</strong>!</p>
          <p><strong>3 vides</strong> · Els asteroides es trenquen en fragments</p>
          <div class="ast-llegenda">
            <div class="ast-ll-item"><span class="ast-chip gran">gran</span>&nbsp;20 pts → 2 mitjans</div>
            <div class="ast-ll-item"><span class="ast-chip mitja">mitjà</span>&nbsp;50 pts → 2 petits</div>
            <div class="ast-ll-item"><span class="ast-chip petit">petit</span>&nbsp;100 pts</div>
          </div>
          <div class="ast-llegenda" style="margin-top:.4rem;flex-direction:row;flex-wrap:wrap;gap:.3rem">
            ${AST_PU_TIPUS.map(k=>`
              <span class="ast-pu-chip" style="background:${AST_PU_COLORS[k]}22;border-color:${AST_PU_COLORS[k]}88;color:${AST_PU_COLORS[k]}">
                ${AST_PU_ICONES[k]} ${k}
              </span>`).join('')}
          </div>
          <ul class="snake-controls-llista" style="margin-top:.5rem">
            <li>⌨️ ← → ↑ ↓ moure la nau</li>
            <li>📱 Joystick per moure la nau</li>
          </ul>
        </div>
        <button class="snake-btn-start" onclick="astComençar()">Comença 🚀</button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Asteroids</div>
        <div class="ranking-list-home">${astRenderRankingHTML()}</div>
      </div>
    </div>`;
}

// ── PANTALLA DE JOC ───────────────────────────────────────────
function astComençar() {
  mostraScreen('asteroid-joc');
  document.getElementById('asteroid-joc-cont').innerHTML = `
    <div class="snake-game-wrap">
      <div class="snake-topbar" style="max-width:${AST_LW}px">
        <button class="snake-btn-back" onclick="astSortir()">← Tornar</button>
        <div class="snake-scores">
          <div class="snake-score-bloc">
            <span class="snake-score-label">Punts</span>
            <span class="snake-score-val" id="ast-pts">0</span>
          </div>
          <div class="snake-score-bloc snake-score-bloc-personal">
            <span class="snake-score-label">Teu</span>
            <span class="snake-score-val" id="ast-millor-personal">${astGetMillor(jugadorActiu)}</span>
          </div>
          <div class="snake-score-bloc snake-score-bloc-record">
            <span class="snake-score-label">🏆 Rec.</span>
            <span class="snake-score-val" id="ast-millor">${astGetMillorGlobal()}</span>
          </div>
          <div class="snake-score-bloc">
            <span class="snake-score-label">Nivell</span>
            <span class="snake-score-val" id="ast-nivell">1</span>
          </div>
          <div class="snake-score-bloc">
            <span class="snake-score-label">Vides</span>
            <span class="snake-score-val" id="ast-vides">❤️❤️❤️</span>
          </div>
        </div>
      </div>
      <div class="snake-canvas-wrap" id="ast-canvas-wrap"
           style="width:min(${AST_LW}px, calc(100vw - 2rem))">
        <canvas id="ast-canvas"></canvas>
        <div class="snake-overlay" id="ast-overlay">
          <div class="snake-overlay-titol" id="ast-overlay-titol">Preparat?</div>
          <div class="snake-overlay-sub" id="ast-overlay-sub"></div>
          <button class="snake-btn-play" id="ast-btn-play" onclick="astTogglePausa()">▶</button>
        </div>
      </div>
      <div id="ast-pu-bar" class="bk-pu-actius-bar" style="min-height:24px"></div>
      <div class="ast-joy-area" id="ast-joy-area">
        <div class="ast-joy-base" id="ast-joy-base">
          <div class="ast-joy-stick" id="ast-joy-stick"></div>
        </div>
        <div class="ast-joy-hint">mou la nau</div>
      </div>
    </div>`;

  astCanvas = document.getElementById('ast-canvas');
  astCtx    = astCanvas.getContext('2d');
  astAjustarCanvas();
  astIniciarPartida();
  document.addEventListener('keydown', astOnKey);
  document.addEventListener('keyup',   astOnKeyUp);
  astIniciarJoystick();
  window.addEventListener('resize', astAjustarCanvas);
}

function astAjustarCanvas() {
  if (!astCanvas) return;
  const wrap = document.getElementById('ast-canvas-wrap');
  if (!wrap) return;
  const side = wrap.clientWidth;
  astScala = side / AST_LW;
  astCanvas.width  = side;
  astCanvas.height = side;
  astW = astH = side;
  if (astNau) astDibuixar();
}

// ── INICIALITZAR ──────────────────────────────────────────────
function astIniciarPartida() {
  astVides   = 3;
  astPunts   = 0;
  astNivell  = 1;
  astFrameT  = 0;
  astBalaTimer = 0;
  astBales   = [];
  astParticules = [];
  astPuActius = {};
  astPowerups = [];
  astMortTimer = null;
  astRespawnarNau();
  astAsteroides = astGenerarAsteroides(astNivell);
  astActualitzarMarcadors();
  astDibuixar();
  astMostrarOverlay('Preparat?', '', '▶', false);
}

function astRespawnarNau() {
  astNau = { x: AST_LW / 2, y: AST_NAU_Y };
  astInvul    = true;
  astInvulTmr = AST_INVUL_DUR;
  astBalaTimer = AST_BALA_DELAY;
}

function astGenerarAsteroides(nivell) {
  const n = 3 + (nivell - 1);
  return Array.from({ length: n }, () => astNouAsteroide('gran'));
}

function astNouAsteroide(mida, x, y, parentVx) {
  const def = AST_MIDES[mida];

  if (x === undefined) {
    // Surt de dalt o pels costats (però no des de baix)
    const zona = Math.random();
    if (zona < 0.6) {
      // Des de dalt
      x = def.r + Math.random() * (AST_LW - def.r * 2);
      y = -def.r;
    } else if (zona < 0.8) {
      // Costat esquerre
      x = -def.r;
      y = Math.random() * AST_LH * 0.6; // màxim 60% de l'alçada
    } else {
      // Costat dret
      x = AST_LW + def.r;
      y = Math.random() * AST_LH * 0.6;
    }
  }

  const vY = def.vYMin + Math.random() * (def.vYMax - def.vYMin);
  // Velocitat X: si és fill hereda una mica la del pare, sinó lleugera deriva
  const vX = parentVx !== undefined
    ? parentVx * 0.6 + (Math.random() - 0.5) * 40
    : (Math.random() - 0.5) * 50;

  // Forma irregular
  const nVerts = 9;
  const verts = Array.from({ length: nVerts }, (_, i) => ({
    a: (i / nVerts) * Math.PI * 2,
    r: def.r * (0.70 + Math.random() * 0.50),
  }));

  return { x, y, vx: vX, vy: vY, rot: (Math.random() - 0.5) * 1.8, angle: Math.random() * Math.PI * 2, mida, r: def.r, verts };
}

// ── GAME LOOP ─────────────────────────────────────────────────
function astTick(ts) {
  if (!astActiu) return;
  const dt = Math.min((ts - astLastTime) / 1000, 0.05);
  astLastTime = ts;
  astFrameT += dt;

  astMourNau(dt);
  astAutoFire(dt);
  astMourBales(dt);
  astMourAsteroides(dt);
  astMourPowerups(dt);
  astMourParticules(dt);
  astColisions(dt);
  astActualitzarMarcadors();
  astDibuixar();
  astLoop = requestAnimationFrame(astTick);
}

// ── NAU ───────────────────────────────────────────────────────
function astMourNau(dt) {
  const n = astNau;
  const vel = AST_NAU_VEL * dt;

  if (astTecles['ArrowLeft']  || astTecles['a'] || astTecles['A'] || astJoyVec.x < -0.2)
    n.x -= vel * (astJoyVec.x < -0.2 ? Math.abs(astJoyVec.x) : 1);
  if (astTecles['ArrowRight'] || astTecles['d'] || astTecles['D'] || astJoyVec.x > 0.2)
    n.x += vel * (astJoyVec.x > 0.2 ? astJoyVec.x : 1);
  if (astTecles['ArrowUp']    || astTecles['w'] || astTecles['W'] || astJoyVec.y < -0.2)
    n.y -= vel * (astJoyVec.y < -0.2 ? Math.abs(astJoyVec.y) : 1);
  if (astTecles['ArrowDown']  || astTecles['s'] || astTecles['S'] || astJoyVec.y > 0.2)
    n.y += vel * (astJoyVec.y > 0.2 ? astJoyVec.y : 1);

  // Límits
  n.x = Math.max(AST_NAU_R, Math.min(AST_LW - AST_NAU_R, n.x));
  n.y = Math.max(AST_NAU_Y_MIN, Math.min(AST_LH - AST_NAU_R, n.y));

  if (astInvul) {
    astInvulTmr -= dt;
    if (astInvulTmr <= 0) astInvul = false;
  }
}

// ── AUTO-FIRE ─────────────────────────────────────────────────
function astAutoFire(dt) {
  if (astAsteroides.length === 0) return;
  astBalaTimer -= dt;
  if (astBalaTimer > 0) return;

  const delay = astPuActius['rapid'] ? AST_BALA_DELAY_RPD : AST_BALA_DELAY;
  astBalaTimer = delay;

  const n = astNau;
  const r = astPuActius['gran'] ? AST_BALA_R * 1.8 : AST_BALA_R;
  const col = astPuActius['gran'] ? '#ff6060' : '#a8d8b0';

  if (astPuActius['triple']) {
    [{ dx: -10, dy: 0 }, { dx: 0, dy: 0 }, { dx: 10, dy: 0 }].forEach(o => {
      astBales.push({ x: n.x + o.dx, y: n.y - AST_NAU_R, vy: -AST_BALA_VEL, vida: AST_BALA_VIDA, r, col });
    });
  } else if (astPuActius['doble']) {
    [-8, 8].forEach(dx => {
      astBales.push({ x: n.x + dx, y: n.y - AST_NAU_R, vy: -AST_BALA_VEL, vida: AST_BALA_VIDA, r, col });
    });
  } else {
    astBales.push({ x: n.x, y: n.y - AST_NAU_R, vy: -AST_BALA_VEL, vida: AST_BALA_VIDA, r, col });
  }
}

// ── BALES ─────────────────────────────────────────────────────
function astMourBales(dt) {
  astBales.forEach(b => { b.y += b.vy * dt; b.vida -= dt; });
  astBales = astBales.filter(b => b.vida > 0 && b.y > -20);
}

// ── ASTEROIDES ────────────────────────────────────────────────
function astMourAsteroides(dt) {
  astAsteroides.forEach(a => {
    a.x += a.vx * dt;
    a.y += a.vy * dt;
    a.angle += a.rot * dt;
    // Wrap horitzontal
    if (a.x < -a.r * 2) a.x = AST_LW + a.r;
    if (a.x > AST_LW + a.r * 2) a.x = -a.r;
  });
  // Elimina els que surten per baix
  astAsteroides = astAsteroides.filter(a => a.y < AST_LH + a.r * 2);
}

// ── POWER-UPS ─────────────────────────────────────────────────
function astMourPowerups(dt) {
  astPowerups.forEach(pu => { pu.y += pu.vy * dt; });
  astPowerups = astPowerups.filter(pu => pu.y < AST_LH + 20);
}

// ── PARTÍCULES ────────────────────────────────────────────────
function astMourParticules(dt) {
  astParticules.forEach(p => { p.x += p.vx*dt; p.y += p.vy*dt; p.vida -= dt; p.alpha = p.vida/p.vidaMax; });
  astParticules = astParticules.filter(p => p.vida > 0);
}

function astExplosio(x, y, color, n, speed) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = speed * (0.4 + Math.random() * 0.6);
    const vida = 0.4 + Math.random() * 0.5;
    astParticules.push({ x, y, vx: Math.cos(a)*v, vy: Math.sin(a)*v, vida, vidaMax: vida, alpha: 1, color, r: 2 + Math.random() * 2.5 });
  }
}

// ── COL·LISIONS ───────────────────────────────────────────────
function astColisions(dt) {
  // Bales vs asteroides
  for (let bi = astBales.length - 1; bi >= 0; bi--) {
    const b = astBales[bi];
    for (let ai = astAsteroides.length - 1; ai >= 0; ai--) {
      const a = astAsteroides[ai];
      if (astDist(b.x, b.y, a.x, a.y) < a.r + b.r) {
        astBales.splice(bi, 1);
        astAsteroides.splice(ai, 1);
        astPunts += AST_MIDES[a.mida].pts;

        const def = AST_MIDES[a.mida];
        if (def.fills) {
          for (let f = 0; f < def.nFills; f++) {
            astAsteroides.push(astNouAsteroide(def.fills, a.x, a.y, a.vx));
          }
        }

        // Power-up?
        if (a.mida !== 'petit' && Math.random() < AST_PU_CHANCE) {
          const tipus = AST_PU_TIPUS[Math.floor(Math.random() * AST_PU_TIPUS.length)];
          astPowerups.push({ x: a.x, y: a.y, vy: 55 + Math.random() * 30, tipus, r: 11 });
        }

        const col = a.mida === 'gran' ? '#8a7a6a' : a.mida === 'mitja' ? '#aaa090' : '#c8b8a8';
        astExplosio(a.x, a.y, col, a.mida === 'gran' ? 14 : 8, a.mida === 'gran' ? 90 : 55);
        break;
      }
    }
  }

  // Nau vs asteroides
  if (!astInvul) {
    for (const a of astAsteroides) {
      if (astDist(astNau.x, astNau.y, a.x, a.y) < a.r + AST_NAU_R - 4) {
        if (astPuActius['escut']) {
          clearTimeout(astPuActius['escut']);
          delete astPuActius['escut'];
          astRenderPuActius();
          astExplosio(astNau.x, astNau.y, '#b794f4', 12, 80);
        } else {
          astPerdreVida();
        }
        break;
      }
    }
  }

  // Nau vs power-ups
  for (let pi = astPowerups.length - 1; pi >= 0; pi--) {
    const pu = astPowerups[pi];
    if (astDist(astNau.x, astNau.y, pu.x, pu.y) < AST_NAU_R + pu.r) {
      astPowerups.splice(pi, 1);
      astActivarPU(pu.tipus);
    }
  }

  // Nivell completat
  if (astAsteroides.length === 0 && astMortTimer === null) {
    astNivell++;
    astBales = [];
    astActiu = false;
    cancelAnimationFrame(astLoop);
    astMortTimer = setTimeout(() => {
      astMortTimer = null;
      astPowerups = [];
      astAsteroides = astGenerarAsteroides(astNivell);
      astRespawnarNau();
      astActualitzarMarcadors();
      astActiu = true;
      astLastTime = performance.now();
      astLoop = requestAnimationFrame(astTick);
    }, 1000);
  }
}

// ── POWER-UPS ACTIVATS ────────────────────────────────────────
function astActivarPU(tipus) {
  if (astPuActius[tipus]) clearTimeout(astPuActius[tipus]);
  astPuActius[tipus] = setTimeout(() => { delete astPuActius[tipus]; astRenderPuActius(); }, AST_PU_DUR);
  astRenderPuActius();
}

function astRenderPuActius() {
  const el = document.getElementById('ast-pu-bar');
  if (!el) return;
  el.innerHTML = Object.keys(astPuActius).map(k => `
    <span class="bk-pu-chip" style="background:${AST_PU_COLORS[k]}22;border-color:${AST_PU_COLORS[k]};color:${AST_PU_COLORS[k]}">
      ${AST_PU_ICONES[k]} ${k}
    </span>`).join('');
}

// ── VIDA ──────────────────────────────────────────────────────
function astPerdreVida() {
  astExplosio(astNau.x, astNau.y, '#ff6060', 18, 110);
  astVides--;
  astActualitzarMarcadors();
  Object.keys(astPuActius).forEach(k => clearTimeout(astPuActius[k]));
  astPuActius = {};
  astRenderPuActius();

  if (astVides <= 0) { astFinalPartida(); return; }

  astActiu = false;
  cancelAnimationFrame(astLoop);
  astMortTimer = setTimeout(() => {
    astMortTimer = null;
    astRespawnarNau();
    astActiu = true;
    astLastTime = performance.now();
    astLoop = requestAnimationFrame(astTick);
  }, 1200);
}

function astFinalPartida() {
  astActiu = false;
  cancelAnimationFrame(astLoop);
  if (astMortTimer) clearTimeout(astMortTimer);
  document.removeEventListener('keydown', astOnKey);
  document.removeEventListener('keyup',   astOnKeyUp);
  window.removeEventListener('resize', astAjustarCanvas);

  const millor = astGetMillor(jugadorActiu);
  const nouRec = astPunts > millor;
  astGuardarEstat(jugadorActiu, astPunts);

  astMostrarOverlay(
    nouRec ? '🏆 Nou rècord!' : '💥 Game Over',
    `${astPunts} pts · Nivell ${astNivell}${nouRec ? ' · Nova marca!' : ''}`,
    '🔄', true
  );
}

// ── PAUSA ─────────────────────────────────────────────────────
function astTogglePausa() {
  if (!astActiu) {
    astActiu = true;
    document.getElementById('ast-overlay').style.display = 'none';
    astLastTime = performance.now();
    astLoop = requestAnimationFrame(astTick);
  } else {
    astActiu = false;
    cancelAnimationFrame(astLoop);
    astMostrarOverlay('⏸ Pausa', 'Prem ▶ per continuar', '▶', false);
  }
}

function astMostrarOverlay(titol, sub, icona, gameOver) {
  const el = document.getElementById('ast-overlay');
  if (!el) return;
  el.style.display = 'flex';
  document.getElementById('ast-overlay-titol').textContent = titol;
  document.getElementById('ast-overlay-sub').textContent = sub;
  const btn = document.getElementById('ast-btn-play');
  btn.textContent = icona;
  btn.onclick = gameOver ? astReiniciar : astTogglePausa;
}

function astReiniciar() {
  document.addEventListener('keydown', astOnKey);
  document.addEventListener('keyup',   astOnKeyUp);
  astIniciarPartida();
}

function astSortir() {
  astActiu = false;
  cancelAnimationFrame(astLoop);
  if (astMortTimer) clearTimeout(astMortTimer);
  Object.keys(astPuActius || {}).forEach(k => clearTimeout(astPuActius[k]));
  document.removeEventListener('keydown', astOnKey);
  document.removeEventListener('keyup',   astOnKeyUp);
  window.removeEventListener('resize', astAjustarCanvas);
  mostraScreen('asteroid-inici');
  astRenderInici();
}

// ── CONTROLS ──────────────────────────────────────────────────
function astOnKey(e) {
  astTecles[e.key] = true;
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) e.preventDefault();
  if (e.key === 'p' || e.key === 'Escape') astTogglePausa();
  if (e.key === ' ' && !astActiu) astTogglePausa();
}
function astOnKeyUp(e) { delete astTecles[e.key]; }

// ── JOYSTICK ──────────────────────────────────────────────────
function astIniciarJoystick() {
  const area  = document.getElementById('ast-joy-area');
  const base  = document.getElementById('ast-joy-base');
  const stick = document.getElementById('ast-joy-stick');
  if (!area) return;
  const maxR = 34;

  area.addEventListener('touchstart', e => {
    e.preventDefault();
    const t = e.changedTouches[0];
    const rect = base.getBoundingClientRect();
    astJoyOrigin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    astJoyId = t.identifier;
    if (!astActiu) astTogglePausa();
  }, { passive: false });

  area.addEventListener('touchmove', e => {
    e.preventDefault();
    for (const t of e.changedTouches) {
      if (t.identifier !== astJoyId) continue;
      const dx = t.clientX - astJoyOrigin.x;
      const dy = t.clientY - astJoyOrigin.y;
      const dist = Math.min(Math.hypot(dx, dy), maxR);
      const ang = Math.atan2(dy, dx);
      const nx = dist / maxR;
      astJoyVec = { x: Math.cos(ang) * nx, y: Math.sin(ang) * nx };
      stick.style.transform = `translate(${Math.cos(ang)*dist}px,${Math.sin(ang)*dist}px)`;
    }
  }, { passive: false });

  const endJoy = () => {
    astJoyVec = { x: 0, y: 0 };
    astJoyId = null;
    if (stick) stick.style.transform = '';
  };
  area.addEventListener('touchend', endJoy);
  area.addEventListener('touchcancel', endJoy);
}

// ── DIBUIX ────────────────────────────────────────────────────
function astDibuixar() {
  if (!astCtx) return;
  const ctx = astCtx, s = astScala;

  // Fons
  ctx.fillStyle = '#060d1a';
  ctx.fillRect(0, 0, astW, astH);

  // Estrelles fixes
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  for (let i = 0; i < 55; i++) {
    const sx = ((i * 137.5) % AST_LW) * s;
    const sy = ((i * 97.3)  % AST_LH) * s;
    ctx.beginPath();
    ctx.arc(sx, sy, (i % 3 === 0 ? 1.4 : 0.8) * s, 0, Math.PI * 2);
    ctx.fill();
  }

  // Partícules
  astParticules.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x*s, p.y*s, p.r*s, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  });

  // Power-ups caients
  astPowerups.forEach(pu => {
    const px = pu.x*s, py = pu.y*s, pr = pu.r*s;
    ctx.save();
    ctx.fillStyle = AST_PU_COLORS[pu.tipus];
    ctx.shadowBlur = 8*s; ctx.shadowColor = AST_PU_COLORS[pu.tipus];
    ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${pr * 1.1}px sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(AST_PU_ICONES[pu.tipus], px, py);
    ctx.restore();
  });

  // Asteroides
  astAsteroides.forEach(a => {
    ctx.save();
    ctx.translate(a.x*s, a.y*s);
    ctx.rotate(a.angle);
    const col = a.mida === 'gran' ? '#7a6a5a' : a.mida === 'mitja' ? '#9a8a7a' : '#baa898';
    ctx.fillStyle = col;
    ctx.strokeStyle = a.mida === 'gran' ? '#aaa080' : '#c0b090';
    ctx.lineWidth = 1.5 * s;
    ctx.beginPath();
    a.verts.forEach((v, i) => {
      const px = Math.cos(v.a) * v.r * s;
      const py = Math.sin(v.a) * v.r * s;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.closePath(); ctx.fill(); ctx.stroke();
    if (a.mida !== 'petit') {
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath(); ctx.arc(-a.r*0.28*s, -a.r*0.18*s, a.r*0.22*s, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc( a.r*0.22*s,  a.r*0.28*s, a.r*0.14*s, 0, Math.PI*2); ctx.fill();
    }
    ctx.restore();
  });

  // Bales
  astBales.forEach(b => {
    ctx.save();
    ctx.fillStyle = b.col;
    ctx.shadowBlur = b.r > AST_BALA_R ? 10*s : 5*s;
    ctx.shadowColor = b.col;
    ctx.beginPath(); ctx.arc(b.x*s, b.y*s, b.r*s, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  });

  // Nau
  const nauVis = !astInvul || Math.floor(astFrameT * 8) % 2 === 0;
  if (nauVis) {
    const nx = astNau.x * s, ny = astNau.y * s;
    ctx.save();
    ctx.translate(nx, ny);

    // Flames baix (sempre visibles, la nau "flota")
    ctx.save();
    ctx.globalAlpha = 0.5 + Math.sin(astFrameT * 18) * 0.3;
    ctx.fillStyle = '#ed8936';
    ctx.beginPath();
    ctx.moveTo(-6*s, 8*s);
    ctx.lineTo(0, (14 + Math.random()*8)*s);
    ctx.lineTo(6*s, 8*s);
    ctx.closePath(); ctx.fill();
    ctx.restore();

    // Cos nau (apunta sempre cap amunt)
    const grad = ctx.createLinearGradient(0, -AST_NAU_R*s, 0, AST_NAU_R*s);
    grad.addColorStop(0, '#6aab7a');
    grad.addColorStop(1, '#2d5a3d');
    ctx.fillStyle = grad;
    ctx.strokeStyle = '#a8d8b0';
    ctx.lineWidth = 1.5 * s;
    ctx.beginPath();
    ctx.moveTo(0, -AST_NAU_R*s);
    ctx.lineTo(-9*s, AST_NAU_R*s);
    ctx.lineTo(-4*s, 7*s);
    ctx.lineTo(0, 9*s);
    ctx.lineTo(4*s, 7*s);
    ctx.lineTo(9*s, AST_NAU_R*s);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Cabina
    ctx.fillStyle = '#c8ecd0';
    ctx.beginPath();
    ctx.ellipse(0, -3*s, 4*s, 5*s, 0, 0, Math.PI*2);
    ctx.fill();

    // Escut
    if (astPuActius['escut']) {
      ctx.save();
      ctx.globalAlpha = 0.3 + Math.sin(astFrameT*6)*0.15;
      ctx.strokeStyle = '#b794f4';
      ctx.lineWidth = 2.5*s;
      ctx.beginPath(); ctx.arc(0, 0, (AST_NAU_R+7)*s, 0, Math.PI*2); ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }

  // Vides sobre canvas
  for (let i = 0; i < 3; i++) {
    ctx.font = `${11*s}px sans-serif`;
    ctx.globalAlpha = i < astVides ? 1 : 0.15;
    ctx.fillText('❤️', (5 + i*15)*s, 14*s);
  }
  ctx.globalAlpha = 1;
}

// ── MARCADORS ─────────────────────────────────────────────────
function astActualitzarMarcadors() {
  const elP = document.getElementById('ast-pts');
  const elN = document.getElementById('ast-nivell');
  const elV = document.getElementById('ast-vides');
  if (elP) elP.textContent = astPunts;
  if (elN) elN.textContent = astNivell;
  if (elV) elV.textContent = ['❤️','❤️','❤️'].slice(0, astVides).join('') || '💀';
}

// ── UTILITATS ─────────────────────────────────────────────────
function astDist(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

// ── RÀNQUING ──────────────────────────────────────────────────
function astRenderRankingHTML() {
  const llista = JUGADORS_VALIDS.map(nom => ({
    nom, punts: astGetMillor(nom),
  })).sort((a, b) => b.punts - a.punts);
  const posEmoji = ['🥇','🥈','🥉'];
  const maxPts = llista[0]?.punts || 1;
  return llista.map((r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
      <div class="ranking-pos ${i < 3 ? 'p'+(i+1) : 'other'}">${i < 3 ? posEmoji[i] : i+1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom]||''}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div class="rank-barra-wrap"><div class="rank-barra" style="width:${Math.min((r.punts/maxPts)*100,100)}%"></div></div>
      </div>
      <div class="rank-punts" style="align-self:center;flex-shrink:0">${r.punts}</div>
    </div>`).join('');
}

// ── PERSISTÈNCIA ──────────────────────────────────────────────
function astGetMillorGlobal() {
  return Math.max(0, ...['Jordi','Anna','Laia','Mons','Xu','Joa'].map(n => astGetMillor(n)));
}

function astGetMillor(nom) {
  try {
    const raw = localStorage.getItem(AST_STORAGE_KEY + nom);
    return raw ? (JSON.parse(raw).millor || 0) : 0;
  } catch(e) { return 0; }
}
function astGuardarEstat(nom, punts) {
  const millor = Math.max(astGetMillor(nom), punts);
  localStorage.setItem(AST_STORAGE_KEY + nom, JSON.stringify({ millor }));
}
function asteroidGetPuntsGlobals() {
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => { pts[nom] = astGetMillor(nom); });
  return pts;
}
