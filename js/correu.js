// ══════════════════════════════════════════════════════════════
//  CORREU DE LES AÇORES — Açores 2026
// ══════════════════════════════════════════════════════════════


// ── DIMENSIONS LÒGIQUES ───────────────────────────────────────
const CO_LW = 480, CO_LH = 300;
const CO_CARRILS = 5;
const CO_CARRIL_H = CO_LH / CO_CARRILS;   // 60px per carril
const CO_COTXE_X = 70;                     // x fixa del cotxe
const CO_COTXE_W = 44, CO_COTXE_H = 28;   // mides cotxe

// Velocitat base i acceleració
const CO_VEL_INICI  = 200;  // px/s
const CO_VEL_MAX    = 520;
const CO_VEL_ACCEL  = 12;   // px/s per segon

// Canvi de carril: animació ràpida
const CO_CARRIL_DUR = 0.13; // s

// Items que venen de dreta a esquerra
const CO_ITEM_GAP_MIN  = 0.55; // s entre items (decreix amb velocitat)
const CO_ITEM_GAP_MAX  = 1.4;
const CO_ITEM_GAP_FLOOR = 0.3;

// Puntuació
const CO_PTS_CARTA     = 15;   // per recollir carta
const CO_PTS_LLIURAMENT = 50; // per lliurar carta a la bústia correcta
const CO_PTS_DIST      = 1;   // per cada 20px recorreguts

// Colors de cartes i bústies (5, un per carril)
const CO_COLORS = ['#e53e3e','#ed8936','#ecc94b','#6aab7a','#63b3ed'];
const CO_COLOR_NOMS = ['vermell','taronja','groc','verd','blau'];

// Obstacles
const CO_OBS_DEFS = [
  { id:'pedra',  w:28, h:24, color:'#8a7a6a', color2:'#5a4a3a' },
  { id:'arbre',  w:22, h:38, color:'#2d5a3d', color2:'#1a3a25' },
  { id:'vaca',   w:36, h:26, color:'#e8d5b0', color2:'#c4a882' },
  { id:'barril', w:22, h:28, color:'#8B5E3C', color2:'#5c3a1e' },
];

// ── ESTAT ─────────────────────────────────────────────────────
let coCanvas, coCtx, coScala, coW, coH;
let coLoop = null, coActiu = false, coLastTime = 0, coFrameT = 0;

let coCotxe;        // { carril, y, yTarget, animT }
let coItems;        // cartes, bústies, obstacles
let coVides, coPunts, coMetres, coVelocitat;
let coCartesAl;     // cartes que porta el cotxe [{color}]
let coNextItemTimer;
let coParpadeja, coParpadejaTmr;
let coDistAcum;     // acumulador de distància per punts

// ── PUNT D'ENTRADA ────────────────────────────────────────────
async function iniciarCorreu() {
  mostraScreen('correu-inici');
  document.getElementById('correu-inici-cont').innerHTML = '<div class="joc-carregant">Carregant…</div>';
  await jocFsCarregarTots(CORREU_COL, JUGADORS_VALIDS);
  coRenderInici();
}

function coRenderInici() {
  const millor = coGetMillor(jugadorActiu);
  document.getElementById('correu-inici-cont').innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">📬</span>
          <span class="joc-titol-text">Correu de les Açores</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">Millor: ${millor} pts</div>
          </div>
        </div>
        <div class="snake-instruccions">
          <p>Condueix per les Açores recollint cartes 📩 i lliurant-les a les bústies 📮 del mateix color.</p>
          <p><strong>3 vides</strong> · Esquiva els obstacles · La velocitat augmenta</p>
          <div class="co-llegenda">
            <div class="co-ll-row">
              <span class="co-chip co-carta">📩 carta</span> recollir: <strong>+${CO_PTS_CARTA} pts</strong>
            </div>
            <div class="co-ll-row">
              <span class="co-chip co-bustia">📮 bústia</span> lliurar: <strong>+${CO_PTS_LLIURAMENT} pts</strong>
            </div>
            <div class="co-ll-row">
              <span class="co-chip co-obstacle">⛔ obstacle</span> xocar: <strong>−1 vida</strong>
            </div>
          </div>
          <ul class="snake-controls-llista" style="margin-top:.5rem">
            <li>⌨️ ↑ ↓ canviar de carril</li>
            <li>📱 Botons ▲ ▼ a la pantalla</li>
          </ul>
        </div>
        <button class="snake-btn-start" onclick="coComençar()">Comença 🚀</button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Correu</div>
        <div class="ranking-list-home">${coRenderRankingHTML()}</div>
      </div>
    </div>`;
}

// ── PANTALLA DE JOC ───────────────────────────────────────────
function coComençar() {
  mostraScreen('correu-joc');
  document.getElementById('correu-joc-cont').innerHTML = `
    <div class="snake-game-wrap">
      <div class="snake-topbar" style="max-width:${CO_LW}px">
        <button class="snake-btn-back" onclick="coSortir()">← Tornar</button>
        <div class="snake-scores">
          <div class="snake-score-bloc">
            <span class="snake-score-label">Punts</span>
            <span class="snake-score-val" id="co-pts">0</span>
          </div>
          <div class="snake-score-bloc snake-score-bloc-personal">
            <span class="snake-score-label">Teu</span>
            <span class="snake-score-val" id="co-millor-personal">${coGetMillor(jugadorActiu)}</span>
          </div>
          <div class="snake-score-bloc snake-score-bloc-record">
            <span class="snake-score-label">🏆 Rec.</span>
            <span class="snake-score-val" id="co-millor">${coGetMillorGlobal()}</span>
          </div>
          <div class="snake-score-bloc">
            <span class="snake-score-label">Distància</span>
            <span class="snake-score-val" id="co-metres">0 m</span>
          </div>
          <div class="snake-score-bloc">
            <span class="snake-score-label">Vides</span>
            <span class="snake-score-val" id="co-vides">❤️❤️❤️</span>
          </div>
        </div>
      </div>
      <div class="snake-canvas-wrap" id="co-canvas-wrap"
           style="width:min(${CO_LW}px, calc(100vw - 2rem))">
        <canvas id="co-canvas"></canvas>
        <div class="snake-overlay" id="co-overlay">
          <div class="snake-overlay-titol" id="co-overlay-titol">Preparat?</div>
          <div class="snake-overlay-sub" id="co-overlay-sub"></div>
          <button class="snake-btn-play" id="co-btn-play" onclick="coTogglePausa()">▶</button>
        </div>
      </div>
      <div id="co-cartes-bar" class="co-cartes-bar"></div>
      <div class="cr-botons-accio">
        <button class="cr-btn-accio cr-btn-lliscar" onpointerdown="coAccio('avall')">
          ▼<span>Avall</span>
        </button>
        <button class="cr-btn-accio cr-btn-salt" onpointerdown="coAccio('amunt')">
          ▲<span>Amunt</span>
        </button>
      </div>
    </div>`;

  coCanvas = document.getElementById('co-canvas');
  coCtx    = coCanvas.getContext('2d');
  coAjustarCanvas();
  coIniciarPartida();
  document.addEventListener('keydown', coOnKey);
  window.addEventListener('resize', coAjustarCanvas);
}

function coAjustarCanvas() {
  if (!coCanvas) return;
  const wrap = document.getElementById('co-canvas-wrap');
  if (!wrap) return;
  coScala = wrap.clientWidth / CO_LW;
  coCanvas.width  = wrap.clientWidth;
  coCanvas.height = Math.round(CO_LH * coScala);
  coW = coCanvas.width; coH = coCanvas.height;
  if (coItems) coDibuixar();
}

// ── INICIALITZAR ──────────────────────────────────────────────
function coIniciarPartida() {
  coCotxe = { carril: 2, y: coCarrilY(2), yTarget: coCarrilY(2), animT: 0 };
  coItems  = [];
  coVides  = 3;
  coPunts  = 0;
  coMetres = 0;
  coVelocitat = CO_VEL_INICI;
  coCartesAl  = [];
  coNextItemTimer = 1.0;
  coParpadeja = false; coParpadejaTmr = 0;
  coDistAcum  = 0;
  coFrameT    = 0;
  coActiu     = false;
  coActualitzarMarcadors();
  coDibuixar();
  coMostrarOverlay('Preparat?', '', '▶', false);
}

function coCarrilY(carril) {
  return CO_CARRIL_H * carril + CO_CARRIL_H / 2;
}

// ── GAME LOOP ─────────────────────────────────────────────────
function coTick(ts) {
  if (!coActiu) return;
  const dt = Math.min((ts - coLastTime) / 1000, 0.05);
  coLastTime = ts;
  coFrameT += dt;

  // Velocitat i distància
  coVelocitat = Math.min(CO_VEL_MAX, coVelocitat + CO_VEL_ACCEL * dt);
  const dxFrame = coVelocitat * dt;
  coMetres += dxFrame / 10;
  coDistAcum += dxFrame;
  if (coDistAcum >= 20) {
    coPunts += CO_PTS_DIST;
    coDistAcum -= 20;
  }

  // Animació carril
  if (coCotxe.animT > 0) {
    coCotxe.animT = Math.max(0, coCotxe.animT - dt);
    const t = 1 - coCotxe.animT / CO_CARRIL_DUR;
    coCotxe.y = coCotxe.yPrev + (coCotxe.yTarget - coCotxe.yPrev) * coEase(t);
  } else {
    coCotxe.y = coCotxe.yTarget;
  }

  // Invulnerabilitat
  if (coParpadeja) { coParpadejaTmr -= dt; if (coParpadejaTmr <= 0) coParpadeja = false; }

  // Genera items
  coNextItemTimer -= dt;
  if (coNextItemTimer <= 0) {
    coGenerarItem();
    const pct = (coVelocitat - CO_VEL_INICI) / (CO_VEL_MAX - CO_VEL_INICI);
    const gap = CO_ITEM_GAP_MAX - pct * (CO_ITEM_GAP_MAX - CO_ITEM_GAP_FLOOR);
    coNextItemTimer = Math.max(CO_ITEM_GAP_FLOOR, gap * (0.7 + Math.random() * 0.6));
  }

  // Mou items
  coItems.forEach(it => { it.x -= dxFrame; });
  coItems = coItems.filter(it => it.x > -60);

  // Col·lisions
  coColisions();

  coActualitzarMarcadors();
  coDibuixar();
  coLoop = requestAnimationFrame(coTick);
}

function coEase(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ── GENERAR ITEMS ─────────────────────────────────────────────
function coGenerarItem() {
  // Tria carril aleatori
  const carril = Math.floor(Math.random() * CO_CARRILS);
  const y = coCarrilY(carril);
  const x = CO_LW + 40;
  const r = Math.random();

  if (r < 0.38) {
    // Carta
    const colorIdx = Math.floor(Math.random() * CO_COLORS.length);
    coItems.push({ tipus: 'carta', carril, x, y, color: CO_COLORS[colorIdx], colorIdx, w: 26, h: 18 });
  } else if (r < 0.60 && coCartesAl.length > 0) {
    // Bústia (del color d'una carta que portem)
    const carta = coCartesAl[Math.floor(Math.random() * coCartesAl.length)];
    coItems.push({ tipus: 'bustia', carril, x, y, color: carta.color, colorIdx: carta.colorIdx, w: 24, h: 32 });
  } else {
    // Obstacle
    const def = CO_OBS_DEFS[Math.floor(Math.random() * CO_OBS_DEFS.length)];
    coItems.push({ tipus: 'obstacle', carril, x, y, ...def });
  }
}

// ── COL·LISIONS ───────────────────────────────────────────────
function coColisions() {
  const cotxeCarril = coCotxe.carril;
  const cx = CO_COTXE_X;
  const cy = coCotxe.y;
  const marge = 14; // tolerància hitbox

  for (let i = coItems.length - 1; i >= 0; i--) {
    const it = coItems[i];
    if (it.carril !== cotxeCarril) continue;

    const itW = (it.w || 24) / 2 + marge;
    const dx = Math.abs(it.x - cx);
    if (dx > itW) continue;

    if (it.tipus === 'carta') {
      coItems.splice(i, 1);
      coCartesAl.push({ color: it.color, colorIdx: it.colorIdx });
      coPunts += CO_PTS_CARTA;
      coRenderCartesBar();

    } else if (it.tipus === 'bustia') {
      // Comprova si portem carta del mateix color
      const idxCarta = coCartesAl.findIndex(c => c.colorIdx === it.colorIdx);
      if (idxCarta !== -1) {
        coItems.splice(i, 1);
        coCartesAl.splice(idxCarta, 1);
        coPunts += CO_PTS_LLIURAMENT;
        coRenderCartesBar();
        // Efecte visual: bústia brillant (marcar com recollida)
      }
      // Si no portem carta d'aquest color, la bústia passa de llarg

    } else if (it.tipus === 'obstacle') {
      if (!coParpadeja) {
        coItems.splice(i, 1);
        coPerdreVida();
        return;
      }
    }
  }
}

// ── VIDA ──────────────────────────────────────────────────────
function coPerdreVida() {
  coVides--;
  coActualitzarMarcadors();
  if (coVides <= 0) { coGameOver(); return; }
  coParpadeja = true;
  coParpadejaTmr = 2.0;
}

function coGameOver() {
  coActiu = false;
  cancelAnimationFrame(coLoop);
  document.removeEventListener('keydown', coOnKey);
  window.removeEventListener('resize', coAjustarCanvas);

  const punts = Math.floor(coPunts);
  const millor = coGetMillor(jugadorActiu);
  const nouRec = punts > millor;
  coGuardarEstat(jugadorActiu, punts);

  coMostrarOverlay(
    nouRec ? '🏆 Nou rècord!' : '📭 Joc acabat!',
    `${punts} pts · ${Math.floor(coMetres)} m recorreguts${nouRec ? ' · Nova marca!' : ''}`,
    '🔄', true
  );
}

// ── CONTROLS ──────────────────────────────────────────────────
function coOnKey(e) {
  if (e.key === 'ArrowUp'   || e.key === 'w' || e.key === 'W') { e.preventDefault(); coAccio('amunt'); }
  if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') { e.preventDefault(); coAccio('avall'); }
  if (e.key === 'p' || e.key === 'Escape') coTogglePausa();
  if (e.key === ' ' && !coActiu) coTogglePausa();
}

function coAccio(dir) {
  if (!coActiu) { coTogglePausa(); return; }
  const nou = coCotxe.carril + (dir === 'amunt' ? -1 : 1);
  if (nou < 0 || nou >= CO_CARRILS) return;
  coCotxe.yPrev  = coCotxe.y;
  coCotxe.carril = nou;
  coCotxe.yTarget = coCarrilY(nou);
  coCotxe.animT  = CO_CARRIL_DUR;
}

function coTogglePausa() {
  if (!coActiu) {
    coActiu = true;
    document.getElementById('co-overlay').style.display = 'none';
    coLastTime = performance.now();
    coLoop = requestAnimationFrame(coTick);
  } else {
    coActiu = false;
    cancelAnimationFrame(coLoop);
    coMostrarOverlay('⏸ Pausa', 'Prem ▶ per continuar', '▶', false);
  }
}

function coMostrarOverlay(titol, sub, icona, gameOver) {
  const el = document.getElementById('co-overlay');
  if (!el) return;
  el.style.display = 'flex';
  document.getElementById('co-overlay-titol').textContent = titol;
  document.getElementById('co-overlay-sub').textContent = sub;
  const btn = document.getElementById('co-btn-play');
  btn.textContent = icona;
  btn.onclick = gameOver ? coReiniciar : coTogglePausa;
}

function coReiniciar() {
  document.addEventListener('keydown', coOnKey);
  coIniciarPartida();
}

function coSortir() {
  coActiu = false;
  cancelAnimationFrame(coLoop);
  document.removeEventListener('keydown', coOnKey);
  window.removeEventListener('resize', coAjustarCanvas);
  mostraScreen('correu-inici');
  coRenderInici();
}

// ── CARTES BAR ────────────────────────────────────────────────
function coRenderCartesBar() {
  const el = document.getElementById('co-cartes-bar');
  if (!el) return;
  if (coCartesAl.length === 0) {
    el.innerHTML = '<span class="co-cartes-buit">Cap carta al cotxe</span>';
    return;
  }
  el.innerHTML = coCartesAl.map(c =>
    `<span class="co-carta-chip" style="background:${c.color}33;border-color:${c.color};color:${c.color}">📩</span>`
  ).join('');
}

// ── DIBUIX ────────────────────────────────────────────────────
function coDibuixar() {
  if (!coCtx) return;
  const ctx = coCtx, s = coScala;

  // Fons: cel
  const celGrad = ctx.createLinearGradient(0, 0, 0, coH * 0.35);
  celGrad.addColorStop(0, '#1a3a5a');
  celGrad.addColorStop(1, '#2d6a8a');
  ctx.fillStyle = celGrad;
  ctx.fillRect(0, 0, coW, coH * 0.35);

  // Carrils (carretera)
  const carrilColors = ['#3a5a4a','#2d4a3a','#3a5a4a','#2d4a3a','#3a5a4a'];
  for (let c = 0; c < CO_CARRILS; c++) {
    const cy = c * CO_CARRIL_H * s;
    const ch = CO_CARRIL_H * s;
    ctx.fillStyle = carrilColors[c];
    ctx.fillRect(0, cy, coW, ch);
    // Línia divisòria
    if (c < CO_CARRILS - 1) {
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = s;
      ctx.setLineDash([12*s, 8*s]);
      ctx.beginPath();
      ctx.moveTo(0, cy + ch);
      ctx.lineTo(coW, cy + ch);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    // Color lateral de carril
    ctx.fillStyle = CO_COLORS[c] + '18';
    ctx.fillRect(0, cy, 6*s, ch);
    ctx.fillStyle = CO_COLORS[c];
    ctx.fillRect(0, cy, 3*s, ch);
  }

  // Arbres de fons (parallax)
  ctx.fillStyle = '#1a4a2a';
  for (let i = 0; i < 8; i++) {
    const tx = ((i * 70 - coFrameT * coVelocitat * 0.15) % (CO_LW + 30) + CO_LW + 30) % (CO_LW + 30);
    ctx.beginPath();
    ctx.moveTo((tx-10)*s, -2*s);
    ctx.lineTo((tx+10)*s, -2*s);
    ctx.lineTo(tx*s, -22*s);
    ctx.closePath(); ctx.fill();
  }

  // Línies de carretera (scroll)
  ctx.strokeStyle = 'rgba(255,255,200,0.15)';
  ctx.lineWidth = 1.5*s;
  for (let i = 0; i < 12; i++) {
    const lx = ((i * 48 - coFrameT * coVelocitat * 0.8) % (CO_LW + 48) + CO_LW + 48) % (CO_LW + 48);
    ctx.beginPath();
    ctx.moveTo(lx*s, 0);
    ctx.lineTo(lx*s, coH);
    ctx.stroke();
  }

  // Items
  coItems.forEach(it => coDibuixarItem(ctx, s, it));

  // Cotxe
  const nauVis = !coParpadeja || Math.floor(coFrameT * 8) % 2 === 0;
  if (nauVis) coDibuixarCotxe(ctx, s);

  // Vides
  for (let i = 0; i < 3; i++) {
    ctx.font = `${11*s}px sans-serif`;
    ctx.globalAlpha = i < coVides ? 1 : 0.15;
    ctx.fillText('❤️', (CO_LW - 16 - i*17)*s, 14*s);
  }
  ctx.globalAlpha = 1;
}

function coDibuixarCotxe(ctx, s) {
  const cx = CO_COTXE_X * s;
  const cy = coCotxe.y * s;
  const w = CO_COTXE_W * s, h = CO_COTXE_H * s;

  // Ombra
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(cx, cy + h*0.45, w*0.4, h*0.18, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();

  // Carrosseria principal
  const grad = ctx.createLinearGradient(cx - w/2, cy - h/2, cx - w/2, cy + h/2);
  grad.addColorStop(0, '#6aab7a');
  grad.addColorStop(1, '#2d5a3d');
  ctx.fillStyle = grad;
  coRRc(ctx, cx - w/2, cy - h/2, w, h, 5*s);
  ctx.fill();

  // Cabina
  ctx.fillStyle = '#a8d8b0';
  coRRc(ctx, cx - w*0.28, cy - h*0.48, w*0.5, h*0.45, 4*s);
  ctx.fill();

  // Finestres
  ctx.fillStyle = '#c8ecd0';
  ctx.globalAlpha = 0.7;
  coRRc(ctx, cx - w*0.22, cy - h*0.42, w*0.18, h*0.3, 2*s); ctx.fill();
  coRRc(ctx, cx - w*0.00, cy - h*0.42, w*0.18, h*0.3, 2*s); ctx.fill();
  ctx.globalAlpha = 1;

  // Rodes
  ctx.fillStyle = '#1a1a1a';
  [[-0.32, 0.42], [0.28, 0.42]].forEach(([rx, ry]) => {
    ctx.beginPath();
    ctx.ellipse(cx + rx*w, cy + ry*h, w*0.14, h*0.22, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.ellipse(cx + rx*w, cy + ry*h, w*0.07, h*0.11, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#1a1a1a';
  });

  // Cartes al sostre (visual)
  if (coCartesAl.length > 0) {
    coCartesAl.slice(0, 4).forEach((c, i) => {
      ctx.fillStyle = c.color;
      ctx.globalAlpha = 0.9;
      coRRc(ctx, cx - w*0.1 + i*6*s, cy - h*0.55, 14*s, 9*s, 2*s);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  // Llums davanteres
  ctx.fillStyle = '#ffffaa';
  ctx.shadowBlur = 6*s; ctx.shadowColor = '#ffff88';
  ctx.beginPath(); ctx.ellipse(cx + w*0.47, cy - h*0.1, 3*s, 4*s, 0, 0, Math.PI*2); ctx.fill();
  ctx.shadowBlur = 0;
}

function coDibuixarItem(ctx, s, it) {
  const x = it.x * s;
  const y = it.y * s;

  if (it.tipus === 'carta') {
    // Sobre de carta
    ctx.fillStyle = '#fff8f0';
    coRRc(ctx, x - 13*s, y - 9*s, 26*s, 18*s, 2*s); ctx.fill();
    ctx.strokeStyle = it.color; ctx.lineWidth = 1.5*s;
    coRRc(ctx, x - 13*s, y - 9*s, 26*s, 18*s, 2*s); ctx.stroke();
    // Triangle del sobre
    ctx.fillStyle = it.color + '80';
    ctx.beginPath();
    ctx.moveTo((it.x-13)*s, (it.y-9)*s);
    ctx.lineTo(it.x*s, (it.y+1)*s);
    ctx.lineTo((it.x+13)*s, (it.y-9)*s);
    ctx.closePath(); ctx.fill();
    // Emoji
    ctx.font = `${10*s}px sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('📩', x, y + 3*s);
    return;
  }

  if (it.tipus === 'bustia') {
    // Halo de color (pols brillant)
    ctx.save();
    ctx.shadowBlur = 18 * s;
    ctx.shadowColor = it.color;
    ctx.globalAlpha = 0.45 + Math.sin(coFrameT * 4 + it.x * 0.05) * 0.2;
    ctx.fillStyle = it.color;
    ctx.beginPath(); ctx.arc(x, y - 5*s, 20*s, 0, Math.PI*2); ctx.fill();
    ctx.restore();

    // Cos bústia
    ctx.fillStyle = it.color;
    ctx.shadowBlur = 6*s; ctx.shadowColor = it.color;
    coRRc(ctx, x - 13*s, y - 18*s, 26*s, 26*s, 4*s); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = it.color + 'cc';
    coRRc(ctx, x - 13*s, y + 8*s, 26*s, 9*s, 2*s); ctx.fill();

    // Ranura
    ctx.fillStyle = '#00000050';
    ctx.fillRect(x - 8*s, y - 15*s, 16*s, 3*s);

    // Emoji gran
    ctx.font = `${15*s}px sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('📮', x, y - 4*s);

    // Text AÇORES
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${5.5*s}px sans-serif`;
    ctx.fillText('AÇORES', x, y + 12*s);

    // Fletxa ← de color sobre la bústia
    ctx.fillStyle = it.color;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1*s;
    const ay = (y - 28)*s;
    ctx.beginPath();
    ctx.moveTo(x*s,        ay - 5*s);
    ctx.lineTo((x-7)*s,   ay);
    ctx.lineTo(x*s,        ay + 5*s);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Punt de color sobre la fletxa (reforça el color)
    ctx.fillStyle = it.color;
    ctx.shadowBlur = 4*s; ctx.shadowColor = it.color;
    ctx.beginPath(); ctx.arc(x*s + 5*s, ay, 4*s, 0, Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;
    return;
  }

  // Obstacle
  if (it.id === 'pedra') {
    ctx.fillStyle = it.color;
    ctx.beginPath();
    ctx.moveTo(x - 14*s, y + 12*s);
    ctx.lineTo(x - 10*s, y - 12*s);
    ctx.lineTo(x + 6*s,  y - 12*s);
    ctx.lineTo(x + 14*s, y + 12*s);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath();
    ctx.moveTo(x - 8*s, y - 10*s);
    ctx.lineTo(x + 4*s, y - 10*s);
    ctx.lineTo(x + 2*s, y);
    ctx.closePath(); ctx.fill();
    return;
  }
  if (it.id === 'arbre') {
    // Tronc
    ctx.fillStyle = it.color2;
    ctx.fillRect(x - 3*s, y + 2*s, 6*s, 14*s);
    // Copa
    ctx.fillStyle = it.color;
    ctx.beginPath(); ctx.arc(x, y - 6*s, 13*s, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#1a4a25';
    ctx.beginPath(); ctx.arc(x - 4*s, y - 10*s, 8*s, 0, Math.PI*2); ctx.fill();
    return;
  }
  if (it.id === 'vaca') {
    // Cos
    ctx.fillStyle = it.color;
    coRRc(ctx, x - 18*s, y - 13*s, 36*s, 26*s, 6*s); ctx.fill();
    // Taques
    ctx.fillStyle = '#8a6a40';
    ctx.beginPath(); ctx.ellipse(x - 5*s, y - 5*s, 6*s, 5*s, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x + 8*s, y + 2*s, 5*s, 4*s, 0.3, 0, Math.PI*2); ctx.fill();
    // Cap
    ctx.fillStyle = it.color;
    coRRc(ctx, x + 14*s, y - 10*s, 14*s, 14*s, 4*s); ctx.fill();
    // Ull
    ctx.fillStyle = '#333';
    ctx.beginPath(); ctx.arc(x + 22*s, y - 5*s, 2*s, 0, Math.PI*2); ctx.fill();
    // Potes
    ctx.fillStyle = it.color2;
    [[-12,-1],[-2,-1],[7,-1],[17,-1]].forEach(([px]) => {
      ctx.fillRect((it.x + px - 2)*s, (it.y + 12)*s, 4*s, 8*s);
    });
    return;
  }
  if (it.id === 'barril') {
    ctx.fillStyle = it.color;
    coRRc(ctx, x - 11*s, y - 14*s, 22*s, 28*s, 4*s); ctx.fill();
    ctx.strokeStyle = it.color2; ctx.lineWidth = 2*s;
    [y - 8, y, y + 8].forEach(ly => {
      ctx.beginPath(); ctx.moveTo(x - 11*s, ly*s); ctx.lineTo(x + 11*s, ly*s); ctx.stroke();
    });
  }
}

function coRRc(ctx, x, y, w, h, r) {
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
function coActualitzarMarcadors() {
  const elP = document.getElementById('co-pts');
  const elM = document.getElementById('co-metres');
  const elV = document.getElementById('co-vides');
  if (elP) elP.textContent = Math.floor(coPunts);
  if (elM) elM.textContent = Math.floor(coMetres) + ' m';
  if (elV) elV.textContent = ['❤️','❤️','❤️'].slice(0, coVides).join('') || '💀';
  coRenderCartesBar();
}

// ── RÀNQUING ──────────────────────────────────────────────────
function coRenderRankingHTML() {
  const llista = JUGADORS_VALIDS.map(nom => ({
    nom, punts: coGetMillor(nom),
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
const CORREU_COL = 'correu_punts';

function coGetMillorGlobal() {
  return Math.max(0, ...JUGADORS_VALIDS.map(n => coGetMillor(n)));
}

function coGetMillor(nom) {
  const d = jocFsCacheGet(CORREU_COL, nom);
  return (d && d.millor) || 0;
}
function coGuardarEstat(nom, punts) {
  const millor = Math.max(coGetMillor(nom), punts);
  jocFsDesar(CORREU_COL, nom, { millor });
}
async function correuGetPuntsGlobals() {
  const dades = await jocFsCarregarTots(CORREU_COL, JUGADORS_VALIDS);
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => { pts[nom] = (dades[nom] && dades[nom].millor) || 0; });
  return pts;
}
