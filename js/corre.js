// ══════════════════════════════════════════════════════════════
//  CORRE PER LES AÇORES — Açores 2026
// ══════════════════════════════════════════════════════════════


// ── DIMENSIONS LÒGIQUES ───────────────────────────────────────
const CR_LW = 480, CR_LH = 260;
const CR_TERRA     = CR_LH - 50;   // y on toca terra el peu
const CR_GRAVETAT  = 1900;
const CR_SALT_VY   = -640;
const CR_LLISCAR_DUR = 0.55;

const CR_VEL_INICI = 280;
const CR_VEL_MAX   = 640;
const CR_VEL_ACCEL = 18;

const CR_GAP_INICI = 1.3;
const CR_GAP_MIN   = 0.48;

const CR_PJ_X      = 85;
const CR_PJ_W      = 22;
const CR_PJ_H_DRET = 46;
const CR_PJ_H_LLSC = 24;

// ── TIPUS D'OBSTACLES ─────────────────────────────────────────
// tipus 'terra'  → a terra, cal SALTAR
// tipus 'aire'   → suspès, cal LLISCAR (ajupir-se)
const CR_OBS_DEFS = [
  { id:'tronc',  tipus:'terra', w:26, h:38, color:'#8B5E3C', color2:'#5c3a1e' },
  { id:'roca',   tipus:'terra', w:40, h:30, color:'#8a7a6a', color2:'#5a4a3a' },
  { id:'forat',  tipus:'terra', w:55, h:14, color:'#040d1a', color2:'#0a1628' },
  { id:'cactus', tipus:'terra', w:20, h:52, color:'#2d5a3d', color2:'#1a3a25' },
  { id:'branca', tipus:'aire',  w:80, h:16, yRel:0.76, color:'#7a5a3a', color2:'#4a3a20' },
  { id:'lava',   tipus:'aire',  w:60, h:18, yRel:0.73, color:'#c0392b', color2:'#7b241c' },
  { id:'fum',    tipus:'aire',  w:70, h:20, yRel:0.78, color:'#4a5a6a', color2:'#2a3a4a' },
];

const CR_MUNTANYES = [
  {x:0,w:120,h:80},{x:160,w:90,h:60},{x:280,w:110,h:75},
  {x:400,w:80,h:55},{x:520,w:130,h:85},{x:660,w:100,h:65},
];

// ── CORREDOR ANIMAT — SILUETA BLOB ───────────────────────────
function crDibuixarCorredor(ctx, s, pjX, pjY, lliscant, parpadeja, frameT) {
  const visible = !parpadeja || Math.floor(frameT * 9) % 2 === 0;
  if (!visible) return;

  ctx.save();

  const x  = pjX * s;
  const yT = pjY * s;           // y terra (peu)
  const col  = '#3d8b5a';       // verd mig — silueta
  const col2 = '#a8d8b0';       // verd clar — detall

  if (lliscant) {
    // ── BLOB LLISCANT: el·lipse horitzontal amb cap endavant ──
    const bW = 38 * s, bH = 16 * s;
    const bX = x - 4 * s, bY = yT - bH - 2 * s;

    // Cos principal
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.ellipse(bX, bY + bH / 2, bW / 2, bH / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cap (davant = dreta)
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.ellipse(bX + bW / 2 - 2 * s, bY - 2 * s, 9 * s, 9 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ull
    ctx.fillStyle = col2;
    ctx.beginPath();
    ctx.ellipse(bX + bW / 2 + 2 * s, bY - 3 * s, 2.5 * s, 2 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cames darrere (petites protuberàncies)
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.ellipse(bX - bW / 2 + 8 * s, bY + bH / 2 + 4 * s, 6 * s, 5 * s, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(bX - bW / 2 + 18 * s, bY + bH / 2 + 4 * s, 6 * s, 5 * s, 0.1, 0, Math.PI * 2);
    ctx.fill();

  } else {
    // ── BLOB CORRENT: cos vertical que oscil·la ──
    const t = frameT * 10;
    const legSwing = Math.sin(t);        // -1..1
    const bodyBob  = Math.abs(Math.sin(t)) * 2 * s; // cos puja/baixa lleugerament

    // Ombra terra
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(x, yT + 2 * s, 13 * s, 3.5 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ── Cama posterior (dibuixada primer, sota el cos) ──
    const legH = 16 * s;
    const kneeOffset = legSwing * 8 * s;   // genoll endavant/enrere
    const footOffset = legSwing * 10 * s;

    ctx.fillStyle = col;
    // cama posterior = contrària a la davantera
    crBlobCama(ctx, s,
      x - 3 * s, yT - bodyBob - legH,     // inici (maluc posterior)
      x - 3 * s - kneeOffset, yT - bodyBob - legH / 2,  // genoll
      x - 3 * s - footOffset, yT,         // peu
      col, 5 * s
    );

    // ── Cos (tors + cap com a bloc únic) ──
    const torsoW = 18 * s, torsoH = 22 * s;
    const torsoY = yT - bodyBob - legH - torsoH + 4 * s;
    ctx.fillStyle = col;
    ctx.beginPath();
    // Tors lleugerament inclinat cap endavant
    crBlobTors(ctx, s, x, torsoY, torsoW, torsoH, legSwing * 0.08);
    ctx.fill();

    // Cap
    const capR = 9 * s;
    const capX = x + legSwing * 1.5 * s;
    const capY = torsoY - capR + 2 * s;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.ellipse(capX, capY, capR, capR * 0.95, legSwing * 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Ull
    ctx.fillStyle = col2;
    ctx.beginPath();
    ctx.ellipse(capX + 3.5 * s, capY - 1.5 * s, 2.5 * s, 2 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Casc/visera
    ctx.fillStyle = '#2d5a3d';
    ctx.beginPath();
    ctx.ellipse(capX, capY - 1 * s, capR, capR * 0.6, legSwing * 0.05, Math.PI, 0);
    ctx.fill();

    // ── Braç posterior ──
    const armLen = 12 * s;
    ctx.fillStyle = col;
    crBlobBrac(ctx, s,
      x - 5 * s, torsoY + torsoH * 0.2,
      x - 5 * s + kneeOffset * 0.8, torsoY + torsoH * 0.2 + armLen,
      col, 4 * s
    );

    // ── Cama davantera (sobre el cos) ──
    crBlobCama(ctx, s,
      x + 3 * s, yT - bodyBob - legH,
      x + 3 * s + kneeOffset, yT - bodyBob - legH / 2,
      x + 3 * s + footOffset, yT,
      col, 5 * s
    );

    // ── Braç davanter ──
    crBlobBrac(ctx, s,
      x + 5 * s, torsoY + torsoH * 0.2,
      x + 5 * s - kneeOffset * 0.8, torsoY + torsoH * 0.2 + armLen,
      col, 4 * s
    );
  }

  ctx.restore();
}

function crBlobCama(ctx, s, x1, y1, xK, yK, x2, y2, col, r) {
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(xK, yK, x2, y2);
  ctx.quadraticCurveTo(x2 + r, y2, x2 + r, y2 - r / 2);
  ctx.quadraticCurveTo(xK + r, yK, x1 + r, y1);
  ctx.closePath();
  ctx.fill();
}

function crBlobBrac(ctx, s, x1, y1, x2, y2, col, r) {
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(x1 - r / 2, y1);
  ctx.lineTo(x2 - r / 2, y2);
  ctx.lineTo(x2 + r / 2, y2);
  ctx.lineTo(x1 + r / 2, y1);
  ctx.closePath();
  ctx.fill();
}

function crBlobTors(ctx, s, cx, ty, tw, th, incl) {
  // Quadrilàter lleugerament inclinat
  const sl = incl * th; // offset horitzontal per inclinació
  ctx.moveTo(cx - tw / 2 + sl, ty);
  ctx.lineTo(cx + tw / 2 + sl, ty);
  ctx.quadraticCurveTo(cx + tw / 2 + tw * 0.1, ty + th / 2, cx + tw / 2, ty + th);
  ctx.lineTo(cx - tw / 2, ty + th);
  ctx.quadraticCurveTo(cx - tw / 2 - tw * 0.1, ty + th / 2, cx - tw / 2 + sl, ty);
  ctx.closePath();
}

// ── ESTAT ─────────────────────────────────────────────────────
let crCanvas, crCtx, crScala, crW, crH;
let crLoop = null, crActiu = false, crLastTime = 0, crFrameT = 0;
let crPjY, crVY, crEnTerra, crLliscant, crLliscarTimer;
let crVides, crMetres, crVelocitat;
let crObstacles, crFonsX, crTerraX;
let crParpadeja, crParpadejaTmr;
let crNextObsTimer;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
async function iniciarCorre() {
  mostraScreen('corre-inici');
  document.getElementById('corre-inici-cont').innerHTML = '<div class="joc-carregant">Carregant…</div>';
  await jocFsCarregarTots(CORRE_COL, JUGADORS_VALIDS);
  crRenderInici();
}

function crRenderInici() {
  const millor = crGetMillor(jugadorActiu);
  document.getElementById('corre-inici-cont').innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">🏃</span>
          <span class="joc-titol-text">Corre per les Açores</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">Millor: ${millor} m</div>
          </div>
        </div>
        <div class="snake-instruccions">
          <p>Corre per un paisatge volcànic i esquiva els obstacles!</p>
          <p><strong>3 vides</strong> · La velocitat augmenta amb la distància</p>
          <div class="cr-obs-llegenda">
            <div class="cr-obs-item">
              <span class="cr-obs-chip cr-obs-terra">obstacles a terra</span>
              → <strong>▲ Salta</strong>
            </div>
            <div class="cr-obs-item">
              <span class="cr-obs-chip cr-obs-aire">obstacles suspesos</span>
              → <strong>▼ Llisca</strong>
            </div>
          </div>
          <ul class="snake-controls-llista" style="margin-top:.5rem">
            <li>⌨️ ↑ / Espai per saltar · ↓ per lliscar</li>
            <li>📱 Botons ▲ ▼ a la pantalla</li>
          </ul>
        </div>
        <button class="snake-btn-start" onclick="crComençar()">Comença 🚀</button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Corre</div>
        <div class="ranking-list-home">${crRenderRankingHTML()}</div>
      </div>
    </div>`;
}

function crComençar() {
  mostraScreen('corre-joc');
  document.getElementById('corre-joc-cont').innerHTML = `
    <div class="snake-game-wrap">
      <div class="snake-topbar" style="max-width:${CR_LW}px">
        <button class="snake-btn-back" onclick="crSortir()">← Tornar</button>
        <div class="snake-scores">
          <div class="snake-score-bloc">
            <span class="snake-score-label">Distància</span>
            <span class="snake-score-val" id="cr-metres">0 m</span>
          </div>
          <div class="snake-score-bloc snake-score-bloc-personal">
            <span class="snake-score-label">Teu</span>
            <span class="snake-score-val" id="cr-millor-personal">${crGetMillor(jugadorActiu)} m</span>
          </div>
          <div class="snake-score-bloc snake-score-bloc-record">
            <span class="snake-score-label">🏆 Rec.</span>
            <span class="snake-score-val" id="cr-millor">${crGetMillorGlobal()} m</span>
          </div>
          <div class="snake-score-bloc">
            <span class="snake-score-label">Vides</span>
            <span class="snake-score-val" id="cr-vides">❤️❤️❤️</span>
          </div>
        </div>
      </div>
      <div class="snake-canvas-wrap" id="cr-canvas-wrap" style="width:min(${CR_LW}px, calc(100vw - 2rem))">
        <canvas id="cr-canvas"></canvas>
        <div class="snake-overlay" id="cr-overlay">
          <div class="snake-overlay-titol" id="cr-overlay-titol">Preparat?</div>
          <div class="snake-overlay-sub" id="cr-overlay-sub"></div>
          <button class="snake-btn-play" id="cr-btn-play" onclick="crTogglePausa()">▶</button>
        </div>
      </div>
      <div class="cr-botons-accio">
        <button class="cr-btn-accio cr-btn-lliscar"
          onpointerdown="crAccio('lliscar')"
          ontouchstart="crAccio('lliscar');event.preventDefault()">
          ▼<span>Llisca</span>
        </button>
        <button class="cr-btn-accio cr-btn-salt"
          onpointerdown="crAccio('salt')"
          ontouchstart="crAccio('salt');event.preventDefault()">
          ▲<span>Salta</span>
        </button>
      </div>
    </div>`;

  crCanvas = document.getElementById('cr-canvas');
  crCtx = crCanvas.getContext('2d');
  crAjustarCanvas();
  crIniciarPartida();
  document.addEventListener('keydown', crOnKey);
  window.addEventListener('resize', crAjustarCanvas);
}

function crAjustarCanvas() {
  if (!crCanvas) return;
  const wrap = document.getElementById('cr-canvas-wrap');
  if (!wrap) return;
  crScala = wrap.clientWidth / CR_LW;
  crCanvas.width  = wrap.clientWidth;
  crCanvas.height = Math.round(CR_LH * crScala);
  crW = crCanvas.width; crH = crCanvas.height;
  if (crObstacles) crDibuixar();
}

function crIniciarPartida() {
  crPjY = CR_TERRA; crVY = 0; crEnTerra = true;
  crLliscant = false; crLliscarTimer = 0;
  crVides = 3; crMetres = 0; crVelocitat = CR_VEL_INICI;
  crObstacles = []; crFonsX = 0; crTerraX = 0;
  crNextObsTimer = 1.4;
  crParpadeja = false; crParpadejaTmr = 0;
  crFrameT = 0; crActiu = false;
  crActualitzarMarcadors();
  crDibuixar();
  crMostrarOverlay('Preparat?', '', '▶', false);
}

// ── GAME LOOP ─────────────────────────────────────────────────
function crTick(ts) {
  if (!crActiu) return;
  const dt = Math.min((ts - crLastTime) / 1000, 0.05);
  crLastTime = ts;
  crFrameT += dt;

  crVelocitat = Math.min(CR_VEL_MAX, crVelocitat + CR_VEL_ACCEL * dt);
  crMetres   += crVelocitat * dt / 10;
  crFonsX    -= crVelocitat * 0.28 * dt;
  crTerraX   -= crVelocitat * dt;

  // Física
  if (!crEnTerra) {
    crVY  += CR_GRAVETAT * dt;
    crPjY += crVY * dt;
    if (crPjY >= CR_TERRA) { crPjY = CR_TERRA; crVY = 0; crEnTerra = true; }
  }
  if (crLliscant) { crLliscarTimer -= dt; if (crLliscarTimer <= 0) crLliscant = false; }
  if (crParpadeja) { crParpadejaTmr -= dt; if (crParpadejaTmr <= 0) crParpadeja = false; }

  // Obstacles
  crNextObsTimer -= dt;
  if (crNextObsTimer <= 0) {
    const def = CR_OBS_DEFS[Math.floor(Math.random() * CR_OBS_DEFS.length)];
    crObstacles.push({ ...def, x: CR_LW + 20 });
    const pct = (crVelocitat - CR_VEL_INICI) / (CR_VEL_MAX - CR_VEL_INICI);
    crNextObsTimer = CR_GAP_INICI - pct * (CR_GAP_INICI - CR_GAP_MIN) + Math.random() * 0.4;
  }
  crObstacles.forEach(o => { o.x -= crVelocitat * dt; });
  crObstacles = crObstacles.filter(o => o.x + o.w > -20);

  if (!crParpadeja) {
    for (const o of crObstacles) {
      if (crColisiona(o)) { crPerdreVida(); break; }
    }
  }

  crActualitzarMarcadors();
  crDibuixar();
  crLoop = requestAnimationFrame(crTick);
}

// ── COL·LISIÓ ─────────────────────────────────────────────────
function crColisiona(o) {
  let pX1 = CR_PJ_X - CR_PJ_W / 2;
  let pX2 = CR_PJ_X + CR_PJ_W / 2;
  let pY1, pY2;

  if (crLliscant) {
    pX1 -= 6; pX2 += 6;
    pY1 = CR_TERRA - CR_PJ_H_LLSC;
    pY2 = CR_TERRA;
  } else {
    pY1 = crPjY - CR_PJ_H_DRET;
    pY2 = crPjY;
  }

  const oX1 = o.x + 3, oX2 = o.x + o.w - 3;
  let oY1, oY2;

  if (o.tipus === 'terra') {
    if (o.id === 'forat') { oY1 = CR_TERRA; oY2 = CR_TERRA + o.h; }
    else { oY1 = CR_TERRA - o.h; oY2 = CR_TERRA; }
  } else {
    const oMidY = CR_TERRA * o.yRel;
    oY1 = oMidY - o.h / 2;
    oY2 = oMidY + o.h / 2;
  }

  return pX1 < oX2 && pX2 > oX1 && pY1 < oY2 && pY2 > oY1;
}

// ── VIDA ──────────────────────────────────────────────────────
function crPerdreVida() {
  crVides--;
  crActualitzarMarcadors();
  if (crVides <= 0) { crGameOver(); return; }
  crParpadeja = true; crParpadejaTmr = 2.2;
}

function crGameOver() {
  crActiu = false;
  cancelAnimationFrame(crLoop);
  document.removeEventListener('keydown', crOnKey);
  window.removeEventListener('resize', crAjustarCanvas);
  const m = Math.floor(crMetres);
  const millor = crGetMillor(jugadorActiu);
  const nouRec = m > millor;
  crGuardarEstat(jugadorActiu, m);
  const elM = document.getElementById('cr-millor');
  if (elM) elM.textContent = Math.max(m, millor) + ' m';
  crMostrarOverlay(
    nouRec ? '🏆 Nou rècord!' : '💀 Has caigut!',
    `${m} metres recorreguts${nouRec ? ' · Nova marca!' : ''}`,
    '🔄', true
  );
}

// ── CONTROLS ──────────────────────────────────────────────────
function crOnKey(e) {
  if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w' || e.key === 'W') {
    e.preventDefault(); crAccio('salt');
  } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
    e.preventDefault(); crAccio('lliscar');
  } else if (e.key === 'p' || e.key === 'Escape') {
    if (crActiu) crTogglePausa();
  }
}

function crAccio(accio) {
  if (!crActiu) { crTogglePausa(); return; }
  if (accio === 'salt' && crEnTerra) {
    crVY = CR_SALT_VY; crEnTerra = false; crLliscant = false;
  }
  if (accio === 'lliscar' && crEnTerra) {
    crLliscant = true; crLliscarTimer = CR_LLISCAR_DUR;
  }
}

function crTogglePausa() {
  if (!crActiu) {
    crActiu = true;
    document.getElementById('cr-overlay').style.display = 'none';
    crLastTime = performance.now();
    crLoop = requestAnimationFrame(crTick);
  } else {
    crActiu = false;
    cancelAnimationFrame(crLoop);
    crMostrarOverlay('⏸ Pausa', 'Prem ▶ per continuar', '▶', false);
  }
}

function crMostrarOverlay(titol, sub, icona, gameOver) {
  const el = document.getElementById('cr-overlay');
  if (!el) return;
  el.style.display = 'flex';
  document.getElementById('cr-overlay-titol').textContent = titol;
  document.getElementById('cr-overlay-sub').textContent = sub;
  const btn = document.getElementById('cr-btn-play');
  btn.textContent = icona;
  btn.onclick = gameOver ? crReiniciar : crTogglePausa;
}

function crReiniciar() {
  document.addEventListener('keydown', crOnKey);
  crIniciarPartida();
}

function crSortir() {
  cancelAnimationFrame(crLoop);
  crActiu = false;
  document.removeEventListener('keydown', crOnKey);
  window.removeEventListener('resize', crAjustarCanvas);
  mostraScreen('corre-inici');
  crRenderInici();
}

// ── DIBUIX ────────────────────────────────────────────────────
function crDibuixar() {
  if (!crCtx) return;
  const ctx = crCtx, s = crScala;

  const celGrad = ctx.createLinearGradient(0, 0, 0, crH);
  celGrad.addColorStop(0, '#0a1628');
  celGrad.addColorStop(1, '#1a3a5a');
  ctx.fillStyle = celGrad;
  ctx.fillRect(0, 0, crW, crH);

  // Estrelles
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  for (let i = 0; i < 28; i++) {
    const ex = ((i * 137 + crFonsX * 0.04) % CR_LW) * s;
    const ey = ((i * 53) % (CR_TERRA * 0.55)) * s;
    ctx.fillRect(ex, ey, s * 1.3, s * 1.3);
  }

  // Muntanyes
  ctx.fillStyle = '#1a3a2a';
  CR_MUNTANYES.forEach(m => {
    const mx = ((m.x + crFonsX * 0.14) % (CR_LW + 150) - 75) * s;
    const my = (CR_TERRA - m.h) * s;
    ctx.beginPath();
    ctx.moveTo(mx, my + m.h * s);
    ctx.lineTo(mx + m.w * s / 2, my);
    ctx.lineTo(mx + m.w * s, my + m.h * s);
    ctx.closePath(); ctx.fill();
  });

  // Terra
  const ty = CR_TERRA * s;
  ctx.fillStyle = '#2d5a3d';
  ctx.fillRect(0, ty, crW, crH - ty);
  ctx.fillStyle = '#6aab7a';
  ctx.fillRect(0, ty, crW, 2 * s);
  ctx.fillStyle = '#3d7a50';
  for (let i = 0; i < 22; i++) {
    const tx2 = ((i * 26 + crTerraX) % CR_LW) * s;
    ctx.fillRect(tx2, ty + 3 * s, 3 * s, 5 * s);
  }

  // Obstacles
  crObstacles.forEach(o => crDibuixarObstacle(ctx, s, o));

  // Corredor
  crDibuixarCorredor(ctx, s, CR_PJ_X, crPjY, crLliscant, crParpadeja, crFrameT);

  // Cors sobre canvas
  for (let i = 0; i < 3; i++) {
    ctx.font = `${13 * s}px sans-serif`;
    ctx.globalAlpha = i < crVides ? 1 : 0.18;
    ctx.fillText('❤️', (CR_LW - 20 - i * 19) * s, 17 * s);
  }
  ctx.globalAlpha = 1;
}

function crDibuixarObstacle(ctx, s, o) {
  const tx = o.x * s;
  const terY = CR_TERRA * s;

  if (o.tipus === 'terra') {
    if (o.id === 'forat') {
      ctx.fillStyle = o.color;
      ctx.fillRect(tx, terY - 3 * s, o.w * s, 14 * s);
      ctx.fillStyle = o.color2;
      ctx.fillRect(tx, terY - 5 * s, 6 * s, 5 * s);
      ctx.fillRect(tx + o.w * s - 6 * s, terY - 5 * s, 6 * s, 5 * s);
      return;
    }
    if (o.id === 'tronc') {
      const ty2 = terY - o.h * s;
      ctx.fillStyle = o.color;
      crRRc(ctx, tx, ty2, o.w * s, o.h * s, 4 * s); ctx.fill();
      ctx.strokeStyle = o.color2; ctx.lineWidth = s;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(tx + 3 * s, ty2 + (o.h * s / 4) * i);
        ctx.lineTo(tx + o.w * s - 3 * s, ty2 + (o.h * s / 4) * i);
        ctx.stroke();
      }
      return;
    }
    if (o.id === 'cactus') {
      const cx2 = (o.x + o.w / 2) * s;
      const ty2 = terY - o.h * s, th = o.h * s;
      ctx.fillStyle = o.color;
      crRRc(ctx, cx2 - 5 * s, ty2, 10 * s, th, 4 * s); ctx.fill();
      crRRc(ctx, cx2 - 14 * s, ty2 + th * 0.3, 14 * s, 7 * s, 3 * s); ctx.fill();
      crRRc(ctx, cx2, ty2 + th * 0.45, 14 * s, 7 * s, 3 * s); ctx.fill();
      crRRc(ctx, cx2 - 14 * s, ty2 + th * 0.15, 7 * s, th * 0.2, 3 * s); ctx.fill();
      crRRc(ctx, cx2 + 7 * s, ty2 + th * 0.3, 7 * s, th * 0.2, 3 * s); ctx.fill();
      return;
    }
    // roca
    const ry = terY - o.h * s, rw = o.w * s, rh = o.h * s;
    ctx.fillStyle = o.color;
    ctx.beginPath();
    ctx.moveTo(tx + rw * 0.2, ry + rh); ctx.lineTo(tx, ry + rh * 0.5);
    ctx.lineTo(tx + rw * 0.15, ry);     ctx.lineTo(tx + rw * 0.6, ry);
    ctx.lineTo(tx + rw, ry + rh * 0.4); ctx.lineTo(tx + rw * 0.8, ry + rh);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.moveTo(tx + rw * 0.15, ry); ctx.lineTo(tx + rw * 0.6, ry);
    ctx.lineTo(tx + rw * 0.45, ry + rh * 0.35);
    ctx.closePath(); ctx.fill();
    return;
  }

  // ── OBSTACLE D'AIRE ──
  const oMidY = CR_TERRA * o.yRel * s;
  const ow = o.w * s, oh = o.h * s;
  const oy = oMidY - oh / 2;

  if (o.id === 'branca') {
    ctx.fillStyle = o.color;
    crRRc(ctx, tx, oy, ow, oh * 0.55, 3 * s); ctx.fill();
    ctx.fillStyle = o.color2;
    for (let i = 0; i < 4; i++) {
      const gx = tx + (i + 0.5) * (ow / 4);
      ctx.fillRect(gx - s, oy + oh * 0.45, 2 * s, oh * 0.65);
    }
    ctx.strokeStyle = o.color2; ctx.lineWidth = s * 1.5;
    ctx.setLineDash([3 * s, 3 * s]);
    ctx.beginPath(); ctx.moveTo(tx + ow * 0.25, oy); ctx.lineTo(tx + ow * 0.25, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(tx + ow * 0.75, oy); ctx.lineTo(tx + ow * 0.75, 0); ctx.stroke();
    ctx.setLineDash([]);
    return;
  }
  if (o.id === 'lava') {
    ctx.fillStyle = '#3a1a0a';
    crRRc(ctx, tx, oy, ow, oh, 5 * s); ctx.fill();
    ctx.fillStyle = o.color;
    for (let i = 0; i < 4; i++) {
      const gx = tx + (i * 0.25 + 0.1) * ow;
      const gh = (0.4 + Math.sin(i * 2.3 + crFrameT * 3) * 0.15) * oh;
      ctx.beginPath();
      ctx.arc(gx, oy + oh + gh * 0.6, oh * 0.18, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(gx - oh * 0.12, oy + oh * 0.8, oh * 0.24, gh * 0.7);
    }
    ctx.fillStyle = 'rgba(255,100,0,0.25)';
    crRRc(ctx, tx + 3 * s, oy + 2 * s, ow * 0.5, oh * 0.35, 3 * s); ctx.fill();
    ctx.strokeStyle = '#5a3a2a'; ctx.lineWidth = s * 1.5;
    ctx.setLineDash([3 * s, 3 * s]);
    ctx.beginPath(); ctx.moveTo(tx + ow * 0.3, oy); ctx.lineTo(tx + ow * 0.3, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(tx + ow * 0.7, oy); ctx.lineTo(tx + ow * 0.7, 0); ctx.stroke();
    ctx.setLineDash([]);
    return;
  }
  // fum
  ctx.globalAlpha = 0.82;
  ctx.fillStyle = o.color;
  crRRc(ctx, tx, oy, ow, oh, 8 * s); ctx.fill();
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = '#aaccaa';
  crRRc(ctx, tx + 4 * s, oy + 3 * s, ow * 0.55, oh * 0.4, 5 * s); ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#ffcc00';
  ctx.font = `bold ${10 * s}px sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('☠', (o.x + o.w / 2) * s, oMidY);
}

function crRRc(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ── MARCADORS ─────────────────────────────────────────────────
function crActualitzarMarcadors() {
  const m = Math.floor(crMetres);
  const el = document.getElementById('cr-metres');
  if (el) el.textContent = m + ' m';
  const elV = document.getElementById('cr-vides');
  if (elV) elV.textContent = ['❤️','❤️','❤️'].slice(0, crVides).join('') || '💀';
}

// ── RÀNQUING ──────────────────────────────────────────────────
function crRenderRankingHTML() {
  const llista = JUGADORS_VALIDS.map(nom => ({
    nom, punts: crGetMillor(nom),
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
      <div class="rank-punts" style="align-self:center;flex-shrink:0">${r.punts} m</div>
    </div>`).join('');
}

// ── PERSISTÈNCIA ──────────────────────────────────────────────
const CORRE_COL = 'corre_punts';

function crGetMillorGlobal() {
  return Math.max(0, ...JUGADORS_VALIDS.map(n => crGetMillor(n)));
}

function crGetMillor(nom) {
  const d = jocFsCacheGet(CORRE_COL, nom);
  return (d && d.millor) || 0;
}
function crGuardarEstat(nom, metres) {
  const millor = Math.max(crGetMillor(nom), metres);
  jocFsDesar(CORRE_COL, nom, { millor });
}
async function correGetPuntsGlobals() {
  const dades = await jocFsCarregarTots(CORRE_COL, JUGADORS_VALIDS);
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => { pts[nom] = (dades[nom] && dades[nom].millor) || 0; });
  return pts;
}
