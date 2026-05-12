// ══════════════════════════════════════════════════════════════
//  FLAPPY AÇORES — Açores 2026
// ══════════════════════════════════════════════════════════════

const FLAPPY_STORAGE_KEY = 'flappy_estat_';

// ── DIMENSIONS LÒGIQUES ───────────────────────────────────────
const FL_LW = 320, FL_LH = 480;

// Ocell
const FL_OC_X     = 70;
const FL_OC_R     = 14;     // radi hitbox
const FL_GRAVETAT = 1400;   // px/s²
const FL_FLAP_VY  = -480;   // velocitat cap amunt en tap

// Columnes
const FL_COL_W      = 52;
const FL_COL_GAP    = 145;   // forat entre columnes
const FL_COL_VEL    = 160;   // px/s (creix amb nivell)
const FL_COL_VEL_MAX = 280;
const FL_COL_ESPAI  = 210;   // px entre columnes consecutives
const FL_COL_VEL_ACCEL = 3;  // px/s per punt

// ── ESTAT ─────────────────────────────────────────────────────
let flCanvas, flCtx, flScala, flW, flH;
let flLoop = null, flActiu = false, flLastTime = 0, flFrameT = 0;

let flOcY, flOcVY, flOcRot;
let flColumnes;
let flPunts, flMillorSessio;
let flFase;   // 'espera' | 'joc' | 'mort'
let flFonsX;  // scroll fons
let flParticules;
let flColVel;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarFlappy() {
  mostraScreen('flappy-inici');
  flRenderInici();
}

function flRenderInici() {
  const millor = flGetMillor(jugadorActiu);
  document.getElementById('flappy-inici-cont').innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">🐦</span>
          <span class="joc-titol-text">Flappy Açores</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">Millor: ${millor} pts</div>
          </div>
        </div>
        <div class="snake-instruccions">
          <p>Vola per les Açores esquivant les roques volcàniques!</p>
          <p>Prem per aletear. <strong>Cada columna passada = 1 punt.</strong></p>
          <p>La velocitat augmenta amb la puntuació.</p>
          <ul class="snake-controls-llista">
            <li>⌨️ Espai / Enter / clic per aletear</li>
            <li>📱 Tap a la pantalla</li>
          </ul>
        </div>
        <button class="snake-btn-start" onclick="flComençar()">Comença 🚀</button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Flappy</div>
        <div class="ranking-list-home">${flRenderRankingHTML()}</div>
      </div>
    </div>`;
}

// ── PANTALLA DE JOC ───────────────────────────────────────────
function flComençar() {
  mostraScreen('flappy-joc');
  document.getElementById('flappy-joc-cont').innerHTML = `
    <div class="snake-game-wrap">
      <div class="snake-topbar" style="max-width:${FL_LW}px">
        <button class="snake-btn-back" onclick="flSortir()">← Tornar</button>
        <div class="snake-scores">
          <div class="snake-score-bloc">
            <span class="snake-score-label">Punts</span>
            <span class="snake-score-val" id="fl-pts">0</span>
          </div>
          <div class="snake-score-bloc snake-score-bloc-personal">
            <span class="snake-score-label">Teu</span>
            <span class="snake-score-val" id="fl-millor-personal">${flGetMillor(jugadorActiu)}</span>
          </div>
          <div class="snake-score-bloc snake-score-bloc-record">
            <span class="snake-score-label">🏆 Rec.</span>
            <span class="snake-score-val" id="fl-millor">${flGetMillorGlobal()}</span>
          </div>
        </div>
      </div>
      <div class="snake-canvas-wrap" id="fl-canvas-wrap"
           style="width:min(${FL_LW}px, calc(100vw - 2rem))">
        <canvas id="fl-canvas"></canvas>
      </div>
    </div>`;

  flCanvas = document.getElementById('fl-canvas');
  flCtx    = flCanvas.getContext('2d');
  flAjustarCanvas();
  flIniciarPartida();

  document.addEventListener('keydown', flOnKey);
  flCanvas.addEventListener('pointerdown', flTap);
  window.addEventListener('resize', flAjustarCanvas);
}

function flAjustarCanvas() {
  if (!flCanvas) return;
  const wrap = document.getElementById('fl-canvas-wrap');
  if (!wrap) return;
  const w = wrap.clientWidth;
  flScala = w / FL_LW;
  flCanvas.width  = w;
  flCanvas.height = Math.round(FL_LH * flScala);
  flW = flCanvas.width; flH = flCanvas.height;
  if (flFase) flDibuixar();
}

// ── INICIALITZAR ──────────────────────────────────────────────
function flIniciarPartida() {
  flOcY     = FL_LH / 2;
  flOcVY    = 0;
  flOcRot   = 0;
  flColumnes = [];
  flPunts   = 0;
  flMillorSessio = flGetMillor(jugadorActiu);
  flFase    = 'espera';
  flFonsX   = 0;
  flParticules = [];
  flColVel  = FL_COL_VEL;
  flFrameT  = 0;

  // Primera columna una mica allunyada
  flAfegirColumna(FL_LW + 60);
  flActualitzarMarcadors();
  flDibuixar();
}

function flAfegirColumna(x) {
  const minY = 80;
  const maxY = FL_LH - 80 - FL_COL_GAP;
  const topH = minY + Math.random() * (maxY - minY);
  flColumnes.push({ x, topH, puntuat: false });
}

// ── GAME LOOP ─────────────────────────────────────────────────
function flTick(ts) {
  if (!flActiu) return;
  const dt = Math.min((ts - flLastTime) / 1000, 0.05);
  flLastTime = ts;
  flFrameT += dt;

  if (flFase === 'joc') {
    flTickJoc(dt);
  } else if (flFase === 'mort') {
    // Animació mort: l'ocell cau
    flOcVY += FL_GRAVETAT * dt;
    flOcY  += flOcVY * dt;
    flOcRot = Math.min(Math.PI / 2, flOcRot + 6 * dt);
    if (flOcY > FL_LH + 30) {
      flActiu = false;
      cancelAnimationFrame(flLoop);
      flMostrarGameOver();
      return;
    }
  }

  flMourParticules(dt);
  flDibuixar();
  flLoop = requestAnimationFrame(flTick);
}

function flTickJoc(dt) {
  // Fons scroll
  flFonsX = (flFonsX - flColVel * 0.3 * dt) % FL_LW;

  // Física ocell
  flOcVY += FL_GRAVETAT * dt;
  flOcY  += flOcVY * dt;
  flOcRot = Math.max(-0.4, Math.min(Math.PI / 2, flOcVY / 600));

  // Columnes
  flColVel = Math.min(FL_COL_VEL_MAX, FL_COL_VEL + flPunts * FL_COL_VEL_ACCEL);
  flColumnes.forEach(c => { c.x -= flColVel * dt; });

  // Afegir nova columna
  const ultima = flColumnes[flColumnes.length - 1];
  if (ultima && ultima.x < FL_LW - FL_COL_ESPAI) {
    flAfegirColumna(FL_LW + FL_COL_W);
  }
  flColumnes = flColumnes.filter(c => c.x + FL_COL_W > -10);

  // Puntuació
  flColumnes.forEach(c => {
    if (!c.puntuat && c.x + FL_COL_W < FL_OC_X) {
      c.puntuat = true;
      flPunts++;
      flExplosio(FL_OC_X, flOcY, '#ecc94b', 6, 60);
      flActualitzarMarcadors();
    }
  });

  // Col·lisions
  if (flOcY - FL_OC_R < 0 || flOcY + FL_OC_R > FL_LH) {
    flMorir();
    return;
  }
  for (const c of flColumnes) {
    if (FL_OC_X + FL_OC_R - 4 > c.x && FL_OC_X - FL_OC_R + 4 < c.x + FL_COL_W) {
      if (flOcY - FL_OC_R < c.topH || flOcY + FL_OC_R > c.topH + FL_COL_GAP) {
        flMorir();
        return;
      }
    }
  }
}

// ── ACCIONS ───────────────────────────────────────────────────
function flTap(e) {
  e.preventDefault();
  flAccio();
}

function flOnKey(e) {
  if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowUp') {
    e.preventDefault();
    flAccio();
  }
  if (e.key === 'Escape') flSortir();
}

function flAccio() {
  if (flFase === 'espera') {
    flFase = 'joc';
    flOcVY = FL_FLAP_VY;
    flActiu = true;
    flLastTime = performance.now();
    flLoop = requestAnimationFrame(flTick);
    return;
  }
  if (flFase === 'joc') {
    flOcVY = FL_FLAP_VY;
    flExplosio(FL_OC_X, flOcY, '#a8d8b0', 4, 50);
    return;
  }
  if (flFase === 'gameOver') {
    flIniciarPartida();
  }
}

function flMorir() {
  flFase = 'mort';
  flOcVY = -200;
  flExplosio(FL_OC_X, flOcY, '#e53e3e', 14, 120);

  const millor = flGetMillor(jugadorActiu);
  if (flPunts > millor) {
    flGuardarEstat(jugadorActiu, flPunts);
    flMillorSessio = flPunts;
    const elM = document.getElementById('fl-millor');
    if (elM) elM.textContent = flPunts;
  }
}

function flMostrarGameOver() {
  flFase = 'gameOver';
  flDibuixar(); // dibuixa estat final

  // Overlay manual sobre canvas
  const s = flScala;
  const ctx = flCtx;

  ctx.fillStyle = 'rgba(10,22,40,0.75)';
  ctx.fillRect(0, 0, flW, flH);

  const millor = flGetMillor(jugadorActiu);
  const nouRec = flPunts >= millor && flPunts > 0;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Títol
  ctx.font = `bold ${22*s}px 'Playfair Display', serif`;
  ctx.fillStyle = nouRec ? '#ecc94b' : '#a8d8b0';
  ctx.fillText(nouRec ? '🏆 Nou rècord!' : '💀 Game Over', flW/2, flH*0.38);

  // Punts
  ctx.font = `bold ${16*s}px 'DM Sans', sans-serif`;
  ctx.fillStyle = '#fff';
  ctx.fillText(`${flPunts} punts`, flW/2, flH*0.48);

  // Millor
  ctx.font = `${11*s}px 'DM Sans', sans-serif`;
  ctx.fillStyle = '#9bbfaa';
  ctx.fillText(`Millor: ${Math.max(flPunts, millor)} pts`, flW/2, flH*0.56);

  // Instrucció
  ctx.font = `${10*s}px 'DM Sans', sans-serif`;
  ctx.fillStyle = 'rgba(168,216,176,0.6)';
  ctx.fillText('Tap / Espai per tornar a jugar', flW/2, flH*0.65);
}

function flSortir() {
  flActiu = false;
  cancelAnimationFrame(flLoop);
  document.removeEventListener('keydown', flOnKey);
  if (flCanvas) flCanvas.removeEventListener('pointerdown', flTap);
  window.removeEventListener('resize', flAjustarCanvas);
  mostraScreen('flappy-inici');
  flRenderInici();
}

// ── PARTÍCULES ────────────────────────────────────────────────
function flExplosio(x, y, color, n, speed) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = speed * (0.5 + Math.random() * 0.5);
    const vida = 0.3 + Math.random() * 0.35;
    flParticules.push({ x, y, vx: Math.cos(a)*v, vy: Math.sin(a)*v, vida, vidaMax: vida, color, r: 2+Math.random()*2 });
  }
}
function flMourParticules(dt) {
  flParticules.forEach(p => { p.x+=p.vx*dt; p.y+=p.vy*dt; p.vida-=dt; });
  flParticules = flParticules.filter(p => p.vida > 0);
}

// ── DIBUIX ────────────────────────────────────────────────────
function flDibuixar() {
  if (!flCtx) return;
  const ctx = flCtx, s = flScala;

  // Cel gradient (canvia lleugerament amb la velocitat)
  const t = Math.min(1, flPunts / 30);
  const r1 = Math.round(26  + t * (6  - 26));
  const g1 = Math.round(90  + t * (13 - 90));
  const b1 = Math.round(138 + t * (26 - 138));
  const celGrad = ctx.createLinearGradient(0, 0, 0, flH);
  celGrad.addColorStop(0, `rgb(${r1},${g1},${b1})`);
  celGrad.addColorStop(1, `rgb(${Math.round(r1*0.5)},${Math.round(g1*0.5)},${Math.round(b1*0.6)})`);
  ctx.fillStyle = celGrad;
  ctx.fillRect(0, 0, flW, flH);

  // Núvols / estrelles (scroll)
  if (flPunts < 20) {
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    for (let i = 0; i < 6; i++) {
      const nx = ((i * 60 + flFonsX * 0.4 + FL_LW) % (FL_LW + 80) - 40) * s;
      const ny = (30 + (i * 53) % 120) * s;
      ctx.beginPath(); ctx.ellipse(nx, ny, 22*s, 10*s, 0, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(nx-14*s, ny+2*s, 13*s, 8*s, 0, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(nx+14*s, ny+2*s, 13*s, 8*s, 0, 0, Math.PI*2); ctx.fill();
    }
  } else {
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    for (let i = 0; i < 40; i++) {
      const sx = ((i * 137) % FL_LW) * s;
      const sy = ((i * 73)  % (FL_LH * 0.7)) * s;
      ctx.beginPath(); ctx.arc(sx, sy, (i%3===0?1.3:0.7)*s, 0, Math.PI*2); ctx.fill();
    }
  }

  // Muntanyes de fons (parallax)
  ctx.fillStyle = 'rgba(45,90,61,0.4)';
  for (let i = 0; i < 5; i++) {
    const mx = ((i * 90 + flFonsX * 0.2 + FL_LW) % (FL_LW + 100) - 50) * s;
    const mh = (60 + (i*37)%50) * s;
    ctx.beginPath();
    ctx.moveTo(mx - 50*s, flH);
    ctx.lineTo(mx, flH - mh);
    ctx.lineTo(mx + 50*s, flH);
    ctx.closePath(); ctx.fill();
  }

  // Terra
  const terraY = (FL_LH - 50) * s;
  ctx.fillStyle = '#2d5a3d';
  ctx.fillRect(0, terraY, flW, flH - terraY);
  ctx.fillStyle = '#6aab7a';
  ctx.fillRect(0, terraY, flW, 3*s);
  // Gespa scroll
  ctx.fillStyle = '#3d7a50';
  for (let i = 0; i < 16; i++) {
    const gx = ((i * 24 + flFonsX * 0.8 + FL_LW) % (FL_LW + 24) - 12) * s;
    ctx.fillRect(gx, terraY + 4*s, 3*s, 6*s);
  }

  // Columnes (roques volcàniques)
  flColumnes.forEach(c => flDibuixarColumna(ctx, s, c));

  // Partícules
  flParticules.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.vida / p.vidaMax;
    ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x*s, p.y*s, p.r*s, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  });

  // Ocell
  flDibuixarOcell(ctx, s);

  // Punts sobre canvas
  if (flFase === 'joc' || flFase === 'mort') {
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${20*s}px 'DM Sans', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.shadowBlur = 4*s; ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.fillText(flPunts, flW/2, 10*s);
    ctx.shadowBlur = 0;
  }

  // Missatge d'espera
  if (flFase === 'espera') {
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.font = `${11*s}px 'DM Sans', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Tap o Espai per començar', flW/2, flH * 0.72);
  }
}

function flDibuixarColumna(ctx, s, c) {
  const x = c.x * s;
  const topH = c.topH * s;
  const botY = (c.topH + FL_COL_GAP) * s;
  const w = FL_COL_W * s;
  const terraY = (FL_LH - 50) * s;

  // Gradient roca volcànica
  const grad1 = ctx.createLinearGradient(x, 0, x + w, 0);
  grad1.addColorStop(0, '#3a2a1a');
  grad1.addColorStop(0.4, '#6a4a2a');
  grad1.addColorStop(1, '#2a1a0a');

  // Columna superior
  ctx.fillStyle = grad1;
  flRRc(ctx, x, -4*s, w, topH + 4*s, 0); ctx.fill();
  // Cap inferior (forma de roca irregular)
  ctx.fillStyle = '#8a5a3a';
  flRRc(ctx, x - 3*s, topH - 14*s, w + 6*s, 18*s, 5*s); ctx.fill();
  // Detall: vetes
  ctx.strokeStyle = 'rgba(0,0,0,0.2)'; ctx.lineWidth = s;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x + (w/4)*i, 0);
    ctx.lineTo(x + (w/4)*i, topH);
    ctx.stroke();
  }

  // Columna inferior
  const grad2 = ctx.createLinearGradient(x, 0, x + w, 0);
  grad2.addColorStop(0, '#3a2a1a');
  grad2.addColorStop(0.4, '#6a4a2a');
  grad2.addColorStop(1, '#2a1a0a');
  ctx.fillStyle = grad2;
  flRRc(ctx, x, botY, w, terraY - botY + 4*s, 0); ctx.fill();
  // Cap superior
  ctx.fillStyle = '#8a5a3a';
  flRRc(ctx, x - 3*s, botY - 4*s, w + 6*s, 18*s, 5*s); ctx.fill();
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x + (w/4)*i, botY);
    ctx.lineTo(x + (w/4)*i, terraY);
    ctx.stroke();
  }

  // Lava/brillantor als caps
  ctx.fillStyle = 'rgba(255,80,0,0.15)';
  ctx.beginPath(); ctx.ellipse(x+w/2, topH, w*0.4, 6*s, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(x+w/2, botY, w*0.4, 6*s, 0, 0, Math.PI*2); ctx.fill();
}

function flDibuixarOcell(ctx, s) {
  const x = FL_OC_X * s;
  const y = flOcY * s;
  const r = FL_OC_R * s;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(flOcRot);

  // Ombra
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.ellipse(0, r*0.9, r*0.8, r*0.25, 0, 0, Math.PI*2); ctx.fill();
  ctx.restore();

  // Cos (blob verd)
  const grad = ctx.createRadialGradient(-r*0.2, -r*0.2, r*0.1, 0, 0, r);
  grad.addColorStop(0, '#a8d8b0');
  grad.addColorStop(1, '#2d5a3d');
  ctx.fillStyle = grad;
  ctx.beginPath(); ctx.ellipse(0, 0, r, r*0.85, 0, 0, Math.PI*2); ctx.fill();

  // Ala (oscil·la)
  const wingA = Math.sin(flFrameT * 18) * 0.4;
  ctx.fillStyle = '#6aab7a';
  ctx.save();
  ctx.rotate(wingA);
  ctx.beginPath(); ctx.ellipse(-r*0.1, r*0.1, r*0.65, r*0.3, -0.4, 0, Math.PI*2); ctx.fill();
  ctx.restore();

  // Ull
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(r*0.35, -r*0.15, r*0.3, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#0a1628';
  ctx.beginPath(); ctx.arc(r*0.42, -r*0.12, r*0.17, 0, Math.PI*2); ctx.fill();
  // Brillantor ull
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(r*0.46, -r*0.18, r*0.07, 0, Math.PI*2); ctx.fill();

  // Bec
  ctx.fillStyle = '#ed8936';
  ctx.beginPath();
  ctx.moveTo(r*0.65, -r*0.05);
  ctx.lineTo(r*1.1, r*0.08);
  ctx.lineTo(r*0.65, r*0.2);
  ctx.closePath(); ctx.fill();

  ctx.restore();
}

function flRRc(ctx, x, y, w, h, r) {
  r = Math.min(r, w/2, h/2);
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h); ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}

// ── MARCADORS ─────────────────────────────────────────────────
function flActualitzarMarcadors() {
  const elP = document.getElementById('fl-pts');
  const elM = document.getElementById('fl-millor');
  if (elP) elP.textContent = flPunts;
  if (elM) elM.textContent = Math.max(flPunts, flMillorSessio);
}

// ── RÀNQUING ──────────────────────────────────────────────────
function flRenderRankingHTML() {
  const llista = JUGADORS_VALIDS.map(nom => ({
    nom, punts: flGetMillor(nom),
  })).sort((a, b) => b.punts - a.punts);
  const posEmoji = ['🥇','🥈','🥉'];
  const maxPts = llista[0]?.punts || 1;
  return llista.map((r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
      <div class="ranking-pos ${i<3?'p'+(i+1):'other'}">${i<3?posEmoji[i]:i+1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom]||''}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div class="rank-barra-wrap"><div class="rank-barra" style="width:${Math.min((r.punts/maxPts)*100,100)}%"></div></div>
      </div>
      <div class="rank-punts" style="align-self:center;flex-shrink:0">${r.punts}</div>
    </div>`).join('');
}

// ── PERSISTÈNCIA ──────────────────────────────────────────────
function flGetMillorGlobal() {
  return Math.max(0, ...['Jordi','Anna','Laia','Mons','Xu','Joa'].map(n => flGetMillor(n)));
}

function flGetMillor(nom) {
  try {
    const raw = localStorage.getItem(FLAPPY_STORAGE_KEY + nom);
    return raw ? (JSON.parse(raw).millor || 0) : 0;
  } catch(e) { return 0; }
}
function flGuardarEstat(nom, punts) {
  const millor = Math.max(flGetMillor(nom), punts);
  localStorage.setItem(FLAPPY_STORAGE_KEY + nom, JSON.stringify({ millor }));
}
function flappyGetPuntsGlobals() {
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => { pts[nom] = flGetMillor(nom); });
  return pts;
}
