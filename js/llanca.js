// ══════════════════════════════════════════════════════════════
//  LLANÇA'T! — Açores 2026
// ══════════════════════════════════════════════════════════════

const LLANCA_STORAGE_KEY = 'llanca_estat_';

// ── CONSTANTS ─────────────────────────────────────────────────
const LL_LW = 400, LL_LH = 300;

// Liana
const LL_PIVOT_X   = 80;   // punt d'ancoratge X (lògic)
const LL_PIVOT_Y   = 20;   // punt d'ancoratge Y
const LL_LIANA_L   = 110;  // longitud liana
const LL_SWING_SPD = 1.8;  // rad/s oscil·lació
const LL_SWING_AMP = 1.15; // amplitud (rad) — va de -amp a +amp

// Física vol
const LL_GRAVETAT  = 420;  // px/s²
const LL_VEL_BASE  = 520;  // velocitat màxima de llançament px/s
const LL_TERRA_Y   = 230;  // y lògica terra (on aterra el personatge)

// Lliscament
const LL_FREC      = 0.85; // factor fricció per segon (^dt)

// Zones de fons (en metres)
const LL_ZONES = [
  { fins:  80, id:'prat',   cel1:'#1a5a8a', cel2:'#2d8abf', terra:'#2d5a3d', text:'Prat' },
  { fins: 200, id:'cel',    cel1:'#0a3a6a', cel2:'#1a6aaa', terra:'#1a3a2a', text:'Cel' },
  { fins: 400, id:'nuvols', cel1:'#060d1a', cel2:'#0a2a4a', terra:'#0d1f14', text:'Estratosfera' },
  { fins: 700, id:'espai',  cel1:'#020508', cel2:'#060d1a', terra:'#050e0a', text:'Espai' },
  { fins:Infinity, id:'ovnis', cel1:'#000203', cel2:'#020508', terra:'#020805', text:'Més enllà!' },
];

const LL_INTENTS = 3;

// ── ESTAT ─────────────────────────────────────────────────────
let llCanvas, llCtx, llScala, llW, llH;
let llLoop = null, llActiu = false, llLastTime = 0, llFrameT = 0;

// Màquina d'estats: 'balanceig' | 'vol' | 'lliscament' | 'resultat'
let llFase = 'balanceig';

// Liana
let llSwingAngle = 0;   // angle actual (rad), 0 = vertical cap avall
let llSwingDir   = 1;   // 1 o -1

// Personatge
let llPjX, llPjY;       // posició lògica
let llVX,  llVY;        // velocitat px/s
let llRot  = 0;         // rotació personatge (rad)
let llRotV = 0;         // velocitat rotació

// Resultat
let llDistancia  = 0;   // metres actuals
let llMillorIntent = 0; // metres del millor intent
let llIntent     = 0;   // intent actual (0-indexed)
let llMillorTotal = 0;  // millor dels 3 intents

// Càmera: offset X lògic (el món es desplaça cap a l'esquerra)
let llCamX = 0;

// Partícules
let llParticules = [];

// Elements decoratius (estàtics dins del món)
let llDecorats = [];

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarLlanca() {
  mostraScreen('llanca-inici');
  llRenderInici();
}

function llRenderInici() {
  const millor = llGetMillor(jugadorActiu);
  document.getElementById('llanca-inici-cont').innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">🌿</span>
          <span class="joc-titol-text">Llança't!</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">Millor: ${millor} m</div>
          </div>
        </div>
        <div class="snake-instruccions">
          <p>Et balances d'una liana. Prem en el moment just per llançar-te el més lluny possible!</p>
          <p><strong>${LL_INTENTS} intents</strong> · Es guarda el millor dels tres</p>
          <ul class="snake-controls-llista">
            <li>⌨️ Espai / Enter per llançar-te</li>
            <li>📱 Tap a la pantalla</li>
            <li>⚠️ Si prems massa aviat, pots anar enrere!</li>
          </ul>
          <div class="ll-zones-prev">
            ${LL_ZONES.map(z => `<span class="ll-zona-chip">${z.text}</span>`).join('→')}
          </div>
        </div>
        <button class="snake-btn-start" onclick="llComençar()">Comença 🚀</button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Llança't</div>
        <div class="ranking-list-home">${llRenderRankingHTML()}</div>
      </div>
    </div>`;
}

// ── PANTALLA DE JOC ───────────────────────────────────────────
function llComençar() {
  mostraScreen('llanca-joc');
  document.getElementById('llanca-joc-cont').innerHTML = `
    <div class="snake-game-wrap">
      <div class="snake-topbar" style="max-width:${LL_LW}px">
        <button class="snake-btn-back" onclick="llSortir()">← Tornar</button>
        <div class="snake-scores">
          <div class="snake-score-bloc">
            <span class="snake-score-label">Distància</span>
            <span class="snake-score-val" id="ll-dist">0 m</span>
          </div>
          <div class="snake-score-bloc">
            <span class="snake-score-label">Millor</span>
            <span class="snake-score-val" id="ll-millor">0 m</span>
          </div>
          <div class="snake-score-bloc">
            <span class="snake-score-label">Intent</span>
            <span class="snake-score-val" id="ll-intent">1 / ${LL_INTENTS}</span>
          </div>
        </div>
      </div>
      <div class="snake-canvas-wrap" id="ll-canvas-wrap"
           style="width:min(${LL_LW}px, calc(100vw - 2rem))">
        <canvas id="ll-canvas"></canvas>
        <div class="snake-overlay" id="ll-overlay">
          <div class="snake-overlay-titol" id="ll-overlay-titol">Preparat?</div>
          <div class="snake-overlay-sub" id="ll-overlay-sub"></div>
          <button class="snake-btn-play" id="ll-btn-play" onclick="llAccio()">▶</button>
        </div>
      </div>
      <div id="ll-indicador" class="ll-indicador"></div>
      <button class="ll-btn-llanca" id="ll-btn-llanca" onclick="llAccio()">
        🌿 LLANÇA'T!
      </button>
    </div>`;

  llCanvas = document.getElementById('ll-canvas');
  llCtx    = llCanvas.getContext('2d');
  llAjustarCanvas();
  llIniciarPartida();

  document.addEventListener('keydown', llOnKey);
  llCanvas.addEventListener('click', llAccio);
  window.addEventListener('resize', llAjustarCanvas);
}

function llAjustarCanvas() {
  if (!llCanvas) return;
  const wrap = document.getElementById('ll-canvas-wrap');
  if (!wrap) return;
  llScala = wrap.clientWidth / LL_LW;
  llCanvas.width  = wrap.clientWidth;
  llCanvas.height = Math.round(LL_LH * llScala);
  llW = llCanvas.width; llH = llCanvas.height;
  if (llFase) llDibuixar();
}

// ── INICIALITZAR PARTIDA ──────────────────────────────────────
function llIniciarPartida() {
  llIntent      = 0;
  llMillorTotal = 0;
  llDecorats    = llGenerarDecorats();
  llIniciarIntent();
  llMostrarOverlay('Preparat?', 'Prem per llançar-te!', '▶', false);
}

function llIniciarIntent() {
  llFase      = 'balanceig';
  llSwingAngle = -LL_SWING_AMP * 0.8; // comença mig enrere
  llSwingDir  = 1;
  llDistancia = 0;
  llCamX      = 0;
  llFrameT    = 0;
  llParticules = [];
  llRot       = 0;
  llRotV      = 0;
  llActualitzarMarcadors();
  llActualitzarIndicador();
}

function llGenerarDecorats() {
  const dec = [];
  // Arbres, núvols, planetes, ovnis distribuïts pel món
  for (let i = 0; i < 40; i++) {
    const mx = 30 + i * 120 + Math.random() * 80;
    dec.push({ tipus: 'arbre', mx, y: LL_TERRA_Y - 18, h: 25 + Math.random()*20 });
  }
  for (let i = 0; i < 20; i++) {
    const mx = 60 + i * 200 + Math.random() * 100;
    dec.push({ tipus: 'nuvol', mx, y: 60 + Math.random()*50 });
  }
  for (let i = 0; i < 8; i++) {
    const mx = 1500 + i * 400 + Math.random() * 200;
    dec.push({ tipus: 'planeta', mx, y: 40 + Math.random()*100, r: 20 + Math.random()*30, col: ['#c0392b','#e67e22','#8e44ad','#2980b9'][i%4] });
  }
  for (let i = 0; i < 6; i++) {
    const mx = 2500 + i * 500 + Math.random() * 200;
    dec.push({ tipus: 'ovni', mx, y: 50 + Math.random()*80 });
  }
  return dec;
}

// ── GAME LOOP ─────────────────────────────────────────────────
function llTick(ts) {
  if (!llActiu) return;
  const dt = Math.min((ts - llLastTime) / 1000, 0.05);
  llLastTime = ts;
  llFrameT += dt;

  if (llFase === 'balanceig') {
    llTickBalanceig(dt);
  } else if (llFase === 'vol') {
    llTickVol(dt);
  } else if (llFase === 'lliscament') {
    llTickLliscament(dt);
  }

  llMourParticules(dt);
  llActualitzarMarcadors();
  llDibuixar();
  llLoop = requestAnimationFrame(llTick);
}

// ── FASE 1: BALANCEIG ─────────────────────────────────────────
function llTickBalanceig(dt) {
  // Pèndol simple
  llSwingAngle += llSwingDir * LL_SWING_SPD * dt;
  if (llSwingAngle >= LL_SWING_AMP) {
    llSwingAngle = LL_SWING_AMP;
    llSwingDir = -1;
  }
  if (llSwingAngle <= -LL_SWING_AMP) {
    llSwingAngle = -LL_SWING_AMP;
    llSwingDir = 1;
  }
  // Posició personatge = extrem de la liana
  const px = LL_PIVOT_X + Math.sin(llSwingAngle) * LL_LIANA_L;
  const py = LL_PIVOT_Y + Math.cos(llSwingAngle) * LL_LIANA_L;
  llPjX = px; llPjY = py;
  llActualitzarIndicador();
}

// ── LLANÇAMENT ────────────────────────────────────────────────
function llLlançar() {
  // L'angle de llançament és tangent al moviment de la liana
  // Si swingAngle > 0 (davant), angle positiu (endavant i amunt)
  // Si swingAngle < 0 (enrere), pot anar enrere
  const tangentAngle = llSwingAngle - Math.PI / 2; // perpendicular a la liana
  // Velocitat: màxima quan swingAngle ≈ 0 (posició baixa, màxima vel.)
  // però ajustem per angle útil: millor llançament cap al 35-45°
  const velFactor = Math.cos(llSwingAngle); // 1 al centre, 0 als extrems
  const vel = LL_VEL_BASE * Math.max(0.1, velFactor);

  // Velocitat de la liana al punt d'extrem (v = ω * L)
  const omega = llSwingDir * LL_SWING_SPD; // rad/s
  const vTangX = Math.cos(llSwingAngle) * omega * LL_LIANA_L;
  const vTangY = -Math.sin(llSwingAngle) * omega * LL_LIANA_L;

  llVX = vTangX;
  llVY = vTangY - 60; // petit boost cap amunt
  llRotV = llSwingDir * 4; // velocitat de rotació tombarelles
  llFase = 'vol';

  llExplosio(llPjX, llPjY, '#a8d8b0', 8, 80);
}

// ── FASE 2: VOL ───────────────────────────────────────────────
function llTickVol(dt) {
  llVY += LL_GRAVETAT * dt;
  llPjX += llVX * dt;
  llPjY += llVY * dt;
  llRot += llRotV * dt;

  // Càmera segueix el personatge
  const targetCamX = llPjX - 80;
  llCamX = Math.max(llCamX, targetCamX);

  // Distància en metres (1 px lògic = 0.15 m)
  llDistancia = Math.max(0, (llPjX - LL_PIVOT_X) * 0.15);

  // Aterra?
  if (llPjY >= LL_TERRA_Y) {
    llPjY = LL_TERRA_Y;
    llVY  = 0;
    llRotV = llVX > 0 ? 2 : -2;
    llFase = 'lliscament';
    llExplosio(llPjX, llPjY, '#ecc94b', 12, 60);
  }
}

// ── FASE 3: LLISCAMENT ────────────────────────────────────────
function llTickLliscament(dt) {
  llVX *= Math.pow(LL_FREC, dt * 60);
  llPjX += llVX * dt;
  llRot += llRotV * dt * 0.4;
  llRotV *= 0.92;

  const targetCamX = llPjX - 80;
  llCamX = Math.max(llCamX, targetCamX);
  llDistancia = Math.max(0, (llPjX - LL_PIVOT_X) * 0.15);

  if (Math.abs(llVX) < 3) {
    llFase = 'resultat';
    llActiu = false;
    cancelAnimationFrame(llLoop);
    llFinalIntent();
  }
}

// ── FINAL D'INTENT ────────────────────────────────────────────
function llFinalIntent() {
  const metres = Math.floor(llDistancia);
  if (metres > llMillorTotal) llMillorTotal = metres;
  llIntent++;

  const elM = document.getElementById('ll-millor');
  if (elM) elM.textContent = llMillorTotal + ' m';

  if (llIntent >= LL_INTENTS) {
    // Partida acabada
    setTimeout(() => llFinalPartida(), 800);
  } else {
    // Pròxim intent
    setTimeout(() => {
      llMostrarOverlay(
        `Intent ${llIntent} · ${metres} m`,
        `Millor fins ara: ${llMillorTotal} m`,
        '▶', false
      );
      llIniciarIntent();
    }, 1000);
  }
}

function llFinalPartida() {
  const millor = llGetMillor(jugadorActiu);
  const nouRec = llMillorTotal > millor;
  llGuardarEstat(jugadorActiu, llMillorTotal);

  document.removeEventListener('keydown', llOnKey);
  window.removeEventListener('resize', llAjustarCanvas);

  llMostrarOverlay(
    nouRec ? '🏆 Nou rècord!' : '🌿 Partida acabada',
    `Millor: ${llMillorTotal} m${nouRec ? ' · Nova marca!' : ''}`,
    '🔄', true
  );
}

// ── CONTROLS ──────────────────────────────────────────────────
function llOnKey(e) {
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); llAccio(); }
  if (e.key === 'Escape') llSortir();
}

function llAccio() {
  const overlay = document.getElementById('ll-overlay');
  if (overlay && overlay.style.display !== 'none') {
    // Si hi ha overlay és un inici/reprendre
    const btn = document.getElementById('ll-btn-play');
    if (btn) btn.click();
    return;
  }
  if (llFase === 'balanceig' && llActiu) {
    llLlançar();
  }
}

function llTogglePausa() {
  if (!llActiu) {
    llActiu = true;
    document.getElementById('ll-overlay').style.display = 'none';
    llLastTime = performance.now();
    llLoop = requestAnimationFrame(llTick);
  }
}

function llMostrarOverlay(titol, sub, icona, gameOver) {
  const el = document.getElementById('ll-overlay');
  if (!el) return;
  el.style.display = 'flex';
  document.getElementById('ll-overlay-titol').textContent = titol;
  document.getElementById('ll-overlay-sub').textContent = sub;
  const btn = document.getElementById('ll-btn-play');
  btn.textContent = icona;
  btn.onclick = gameOver ? llReiniciar : llTogglePausa;
}

function llReiniciar() {
  document.addEventListener('keydown', llOnKey);
  llIniciarPartida();
  llTogglePausa();
}

function llSortir() {
  llActiu = false;
  cancelAnimationFrame(llLoop);
  document.removeEventListener('keydown', llOnKey);
  window.removeEventListener('resize', llAjustarCanvas);
  mostraScreen('llanca-inici');
  llRenderInici();
}

// ── INDICADOR D'ANGLE ─────────────────────────────────────────
function llActualitzarIndicador() {
  const el = document.getElementById('ll-indicador');
  if (!el) return;
  // Qualitat del moment: cos(angle) → 1 = perfecte, 0 = malament
  const q = Math.cos(llSwingAngle);
  const pct = Math.round(q * 100);
  const col = q > 0.6 ? '#6aab7a' : q > 0.2 ? '#ecc94b' : '#e53e3e';
  el.innerHTML = `<div class="ll-ind-barra-wrap">
    <div class="ll-ind-barra" style="width:${Math.max(0,pct)}%;background:${col}"></div>
  </div>
  <span class="ll-ind-text" style="color:${col}">${q > 0.7 ? '🟢 ARA!' : q > 0.3 ? '🟡 Aviat...' : llSwingAngle < 0 ? '🔴 Enrere!' : '🟠 Espera'}</span>`;
}

// ── PARTÍCULES ────────────────────────────────────────────────
function llExplosio(x, y, color, n, speed) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = speed * (0.4 + Math.random() * 0.6);
    const vida = 0.5 + Math.random() * 0.5;
    llParticules.push({ x, y, vx: Math.cos(a)*v, vy: Math.sin(a)*v, vida, vidaMax: vida, alpha: 1, color, r: 2 + Math.random()*2.5 });
  }
}
function llMourParticules(dt) {
  llParticules.forEach(p => { p.x += p.vx*dt; p.y += p.vy*dt; p.vy += 80*dt; p.vida -= dt; p.alpha = p.vida/p.vidaMax; });
  llParticules = llParticules.filter(p => p.vida > 0);
}

// ── ZONA ACTUAL ───────────────────────────────────────────────
function llZonaActual() {
  const m = llDistancia;
  return LL_ZONES.find(z => m < z.fins) || LL_ZONES[LL_ZONES.length-1];
}

// ── DIBUIX ────────────────────────────────────────────────────
function llDibuixar() {
  if (!llCtx) return;
  const ctx = llCtx, s = llScala;
  const cam = llCamX; // offset lògic càmera

  const zona = llZonaActual();

  // ── Cel gradient ──
  const celGrad = ctx.createLinearGradient(0, 0, 0, llH);
  celGrad.addColorStop(0, zona.cel1);
  celGrad.addColorStop(1, zona.cel2);
  ctx.fillStyle = celGrad;
  ctx.fillRect(0, 0, llW, llH);

  // ── Estrelles (a partir de cel) ──
  if (zona.id === 'espai' || zona.id === 'ovnis' || zona.id === 'nuvols') {
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    for (let i = 0; i < 60; i++) {
      const sx = ((i * 137 - cam * 0.1) % LL_LW + LL_LW) % LL_LW * s;
      const sy = ((i * 73) % (LL_LH * 0.8)) * s;
      ctx.beginPath(); ctx.arc(sx, sy, (i%3===0?1.3:0.7)*s, 0, Math.PI*2); ctx.fill();
    }
  }

  // ── Decorats (arbres, núvols, planetes, ovnis) ──
  llDecorats.forEach(d => {
    const dx = (d.mx - cam) * s;
    if (dx < -60*s || dx > llW + 60*s) return;
    const dy = d.y * s;

    if (d.tipus === 'arbre' && (zona.id === 'prat' || zona.id === 'cel')) {
      ctx.fillStyle = '#5c3a1e';
      ctx.fillRect(dx - 2*s, dy, 4*s, d.h*s);
      ctx.fillStyle = '#2d5a3d';
      ctx.beginPath(); ctx.arc(dx, dy - d.h*0.3*s, d.h*0.55*s, 0, Math.PI*2); ctx.fill();
    }
    if (d.tipus === 'nuvol' && (zona.id === 'prat' || zona.id === 'cel' || zona.id === 'nuvols')) {
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.beginPath(); ctx.ellipse(dx, dy, 22*s, 12*s, 0, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(dx-14*s, dy+2*s, 14*s, 9*s, 0, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(dx+14*s, dy+2*s, 14*s, 9*s, 0, 0, Math.PI*2); ctx.fill();
    }
    if (d.tipus === 'planeta' && (zona.id === 'espai' || zona.id === 'ovnis' || zona.id === 'nuvols')) {
      ctx.fillStyle = d.col;
      ctx.shadowBlur = 10*s; ctx.shadowColor = d.col;
      ctx.beginPath(); ctx.arc(dx, dy, d.r*s, 0, Math.PI*2); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = d.col + '60';
      ctx.beginPath(); ctx.ellipse(dx, dy, d.r*1.5*s, d.r*0.4*s, 0.3, 0, Math.PI*2); ctx.fill();
    }
    if (d.tipus === 'ovni' && zona.id === 'ovnis') {
      llDibuixarOvni(ctx, s, dx, dy);
    }
  });

  // ── Terra ──
  const terraY = LL_TERRA_Y * s;
  const terraGrad = ctx.createLinearGradient(0, terraY, 0, llH);
  terraGrad.addColorStop(0, zona.terra);
  terraGrad.addColorStop(1, '#050e08');
  ctx.fillStyle = terraGrad;
  ctx.fillRect(0, terraY, llW, llH - terraY);
  ctx.fillStyle = zona.id === 'prat' ? '#6aab7a' : '#1a3a20';
  ctx.fillRect(0, terraY, llW, 2*s);

  // ── Linia de distància (en fase balanceig, petit text indicador) ──
  // ── Liana ──
  if (llFase === 'balanceig' || (llFase === 'vol' && llCamX < 5)) {
    const pivX = (LL_PIVOT_X - cam) * s;
    const pivY = LL_PIVOT_Y * s;
    const extX = llPjX * s - cam * s; // ajust càmera
    const extY = llPjY * s;

    // Ancoratge
    ctx.fillStyle = '#5c3a1e';
    ctx.beginPath(); ctx.arc(pivX, pivY, 5*s, 0, Math.PI*2); ctx.fill();

    // Liana (corba lleugerament)
    ctx.strokeStyle = '#8B5E3C';
    ctx.lineWidth = 2.5 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(pivX, pivY);
    ctx.quadraticCurveTo(
      pivX + (extX - pivX) * 0.3, pivY + (extY - pivY) * 0.6,
      extX, extY
    );
    ctx.stroke();
  }

  // ── Personatge ──
  llDibuixarPersonatge(ctx, s, cam);

  // ── Partícules ──
  llParticules.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc((p.x - cam)*s, p.y*s, p.r*s, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  });

  // ── Text zona ──
  if (llFase === 'vol' || llFase === 'lliscament') {
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = `bold ${9*s}px 'DM Sans', sans-serif`;
    ctx.textAlign = 'right'; ctx.textBaseline = 'top';
    ctx.fillText(zona.text.toUpperCase(), llW - 8*s, 8*s);
  }

  // ── Distància en pantalla ──
  if (llFase === 'vol' || llFase === 'lliscament') {
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${11*s}px 'DM Sans', sans-serif`;
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText(`${Math.floor(llDistancia)} m`, 8*s, 8*s);
  }
}

function llDibuixarPersonatge(ctx, s, cam) {
  const px = (llPjX - cam) * s;
  const py = llPjY * s;

  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(llRot);

  const r = 11 * s;

  // Ombra (quan és a terra)
  if (llFase === 'lliscament' || (llFase === 'balanceig')) {
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(0, (LL_TERRA_Y - llPjY) * s + r, r*1.2, r*0.3, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  // Cos blob
  const col = '#3d8b5a';
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.ellipse(0, 0, r, r*1.1, 0, 0, Math.PI*2); ctx.fill();

  // Cap
  ctx.fillStyle = '#c8ecd0';
  ctx.beginPath(); ctx.arc(0, -r*0.7, r*0.55, 0, Math.PI*2); ctx.fill();

  // Ull
  ctx.fillStyle = '#0a1628';
  ctx.beginPath(); ctx.arc(r*0.18, -r*0.75, r*0.12, 0, Math.PI*2); ctx.fill();

  // Cames (fase balanceig: penjant; vol/lliscament: obertes)
  ctx.fillStyle = col;
  if (llFase === 'balanceig') {
    ctx.beginPath(); ctx.ellipse(-r*0.3, r*0.7, r*0.2, r*0.4, 0.2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( r*0.3, r*0.7, r*0.2, r*0.4, -0.2, 0, Math.PI*2); ctx.fill();
  } else {
    const legA = llFase === 'lliscament' ? 0.3 : 0.6;
    ctx.beginPath(); ctx.ellipse(-r*0.35, r*0.65, r*0.2, r*0.4, -legA, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse( r*0.35, r*0.65, r*0.2, r*0.4,  legA, 0, Math.PI*2); ctx.fill();
  }

  ctx.restore();
}

function llDibuixarOvni(ctx, s, dx, dy) {
  // Cos
  ctx.fillStyle = '#4a6a8a';
  ctx.save();
  ctx.shadowBlur = 15*s; ctx.shadowColor = '#63b3ed';
  ctx.beginPath(); ctx.ellipse(dx, dy, 30*s, 10*s, 0, 0, Math.PI*2); ctx.fill();
  // Cpula
  ctx.fillStyle = '#6aaabf';
  ctx.beginPath(); ctx.ellipse(dx, dy - 4*s, 15*s, 12*s, 0, Math.PI, 0); ctx.fill();
  ctx.shadowBlur = 0;
  // Llums
  ['#ff6060','#60ff60','#6060ff'].forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.arc(dx + (i-1)*10*s, dy + 7*s, 3*s, 0, Math.PI*2); ctx.fill();
  });
  ctx.restore();
}

// ── MARCADORS ─────────────────────────────────────────────────
function llActualitzarMarcadors() {
  const elD = document.getElementById('ll-dist');
  const elM = document.getElementById('ll-millor');
  const elI = document.getElementById('ll-intent');
  if (elD) elD.textContent = Math.floor(llDistancia) + ' m';
  if (elM) elM.textContent = llMillorTotal + ' m';
  if (elI) elI.textContent = `${llIntent + 1} / ${LL_INTENTS}`;
  llActualitzarIndicador();
}

// ── RÀNQUING ──────────────────────────────────────────────────
function llRenderRankingHTML() {
  const llista = JUGADORS_VALIDS.map(nom => ({
    nom, punts: llGetMillor(nom),
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
function llGetMillor(nom) {
  try {
    const raw = localStorage.getItem(LLANCA_STORAGE_KEY + nom);
    return raw ? (JSON.parse(raw).millor || 0) : 0;
  } catch(e) { return 0; }
}
function llGuardarEstat(nom, metres) {
  const millor = Math.max(llGetMillor(nom), metres);
  localStorage.setItem(LLANCA_STORAGE_KEY + nom, JSON.stringify({ millor }));
}
function llancaGetPuntsGlobals() {
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => { pts[nom] = llGetMillor(nom); });
  return pts;
}
