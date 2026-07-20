// ══════════════════════════════════════════════════════════════
//  LLANÇA BOMBES — Açores 2026
//  Llança bombes 💣 contra animals marins amb trajectòria
// ══════════════════════════════════════════════════════════════


// ── CONSTANTS ─────────────────────────────────────────────────
const LB_GRAVETAT   = 0.35;   // px/frame²
const LB_MAX_BOMBES = 5;      // bombes per torn (es recarreguen)
const LB_TEMPS_BASE = 45;     // segons per nivell

// Objectius per nivell: quants cal eliminar
const LB_OBJECTIUS = [3,4,5,6,7,8,9,10,12,15];  // nivells 1-10

// Config objectius
const LB_TIPUS = [
  { emoji: '🦀', nom: 'Cranc',   punts: 10, vida: 1, mida: 52, vel: 1.2 },
  { emoji: '🐙', nom: 'Pop',     punts: 20, vida: 2, mida: 60, vel: 0.9 },
  { emoji: '🦈', nom: 'Tauró',   punts: 50, vida: 1, mida: 68, vel: 2.2 },
];

// Zones de fons per nivell (colors d'onada)
const LB_FONS = [
  ['#0a1628','#0d2137'],['#0a1628','#0e2240'],['#091525','#0c1e38'],
  ['#080f1e','#0b1a30'],['#060d1a','#091628'],['#050c18','#081422'],
  ['#040a15','#071220'],['#03080f','#060f1a'],['#020609','#050c14'],
  ['#010406','#03080d'],
];

// ── ESTAT ─────────────────────────────────────────────────────
let lbNivell      = 1;
let lbPunts       = 0;
let lbVides       = 3;
let lbActiu       = false;
let lbPausa       = false;
let lbSegons      = LB_TEMPS_BASE;
let lbTimerUI     = null;
let lbAnimId      = null;
let lbLastTime    = 0;

// Estat del torn
let lbBombesRestants = LB_MAX_BOMBES;
let lbEliminats      = 0;
let lbObjectiuNivell = 0;

// Objectius actius
let lbObjectius = [];   // { x, y, vx, vy, tipus, vida, maxVida, id, hit, hitTimer }

// Bomba en vol
let lbBomba = null;    // { x, y, vx, vy, activa, explotant, exTimer, radi }

// Efectes visuals
let lbParticules = []; // { x, y, vx, vy, alpha, color, mida }
let lbMissatges  = []; // { text, x, y, timer, color }

// Canvas
let lbCanvas = null;
let lbCtx    = null;
let lbW      = 0;
let lbH      = 0;

// Llançament (input)
let lbArrossegant = false;
let lbArrossegaInici = null;  // { x, y }
let lbArrossegaActual = null; // { x, y }
let lbPosLlancament = null;   // { x, y } — base de llançament

let lbObjectiuId = 0;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
async function iniciarLlancaBombes() {
  mostraScreen('llancabombes-inici');
  document.getElementById('llancabombes-inici-cont').innerHTML = '<div class="joc-carregant">Carregant…</div>';
  await jocFsCarregarTots(LB_COL, JUGADORS_VALIDS);
  lbRenderInici();
}

// ── PANTALLA D'INICI ─────────────────────────────────────────
function lbRenderInici() {
  const millors = lbGetMillors(jugadorActiu);
  const ranking  = lbRenderRankingHTML();

  document.getElementById('llancabombes-inici-cont').innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">💣</span>
          <span class="joc-titol-text">Llança Bombes</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">Millor: ${millors.punts} pts · Nivell ${millors.nivell}</div>
          </div>
        </div>
        <div class="snake-instruccions">
          <p>Elimina els animals marins de les Açores amb les teves bombes!</p>
          <ul class="snake-controls-llista">
            <li>👆 <strong>Arrossega</strong> des de la bomba per apuntar</li>
            <li>🚀 <strong>Allibera</strong> el dit per llançar</li>
            <li>⌨️ Arrossega amb el ratolí per escriptori</li>
            <li>💥 L'explosió té radi — encerta diversos alhora!</li>
            <li>🎯 Elimina els objectius del nivell abans que s'acabi el temps</li>
          </ul>
          <div class="lb-tipus-llegenda">
            ${LB_TIPUS.map(t => `<span>${t.emoji} ${t.nom} <strong>+${t.punts}</strong></span>`).join('')}
          </div>
        </div>
        <button class="snake-btn-start" onclick="lbIniciarNivell(1)">Comença 🌊</button>
        ${millors.nivell > 1 ? `<button class="pm-btn-sortir" style="margin-top:.5rem" onclick="lbIniciarNivell(${millors.nivell})">Continuar (Nivell ${millors.nivell}) →</button>` : ''}
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Llança Bombes</div>
        <div class="ranking-list-home" id="lb-ranking-list">${ranking}</div>
      </div>
    </div>`;
}

// ── INICIAR NIVELL ────────────────────────────────────────────
function lbIniciarNivell(n) {
  lbNivell = n;
  if (n === 1) { lbPunts = 0; lbVides = 3; }

  mostraScreen('llancabombes-joc');

  document.getElementById('llancabombes-joc-cont').innerHTML = `
    <div class="lb-game-wrap">
      <div class="pm-topbar">
        <button class="snake-btn-back" onclick="lbSortir()">← Tornar</button>
        <div class="pm-stats">
          <div class="pm-stat-bloc"><span class="pm-stat-label">❤️</span><span class="pm-stat-val" id="lb-vides">${lbVides}</span></div>
          <div class="pm-stat-bloc"><span class="pm-stat-label">🌊</span><span class="pm-stat-val" id="lb-nivell">${lbNivell}/10</span></div>
          <div class="pm-stat-bloc pm-stat-centre"><span class="pm-stat-val" id="lb-temps">${LB_TEMPS_BASE}s</span></div>
          <div class="pm-stat-bloc"><span class="pm-stat-label">🏆</span><span class="pm-stat-val" id="lb-punts">${lbPunts}</span></div>
        </div>
      </div>
      <div class="lb-canvas-wrap" id="lb-canvas-wrap">
        <canvas id="lb-canvas"></canvas>
      </div>
      <div class="lb-info-bar">
        <div class="lb-bombes-wrap" id="lb-bombes-wrap"></div>
        <div class="lb-objectiu-wrap">
          <span id="lb-eliminats">0</span>/<span id="lb-objectiu-total">—</span>
          <span style="color:var(--text2);font-size:.8rem"> objectius</span>
        </div>
      </div>
    </div>`;

  lbCanvas = document.getElementById('lb-canvas');
  lbCtx    = lbCanvas.getContext('2d');
  lbAjustarCanvas();
  lbInicialitzarEstat();
  lbAfegirControls();

  lbActiu   = true;
  lbPausa   = false;
  lbSegons  = LB_TEMPS_BASE + Math.floor((n - 1) * 3); // +3s per nivell
  lbIniciarTimerUI();
  lbLastTime = performance.now();
  lbLoop(lbLastTime);
}

function lbAjustarCanvas() {
  const wrap = document.getElementById('lb-canvas-wrap');
  if (!wrap) return;
  lbW = Math.min(wrap.clientWidth, 500);
  lbH = Math.round(lbW * 0.85);  // menys alt → més espai per trajectòries
  lbCanvas.width  = lbW;
  lbCanvas.height = lbH;
  lbPosLlancament = { x: lbW / 2, y: lbH - 40 };
}

// ── INICIALITZAR ESTAT DEL NIVELL ─────────────────────────────
function lbInicialitzarEstat() {
  lbObjectiuNivell = LB_OBJECTIUS[Math.min(lbNivell - 1, 9)];
  lbEliminats      = 0;
  lbBombesRestants = LB_MAX_BOMBES;
  lbBomba          = null;
  lbObjectius      = [];
  lbParticules     = [];
  lbMissatges      = [];
  lbArrossegant    = false;

  // Genera primers objectius
  for (let i = 0; i < Math.min(3 + lbNivell, 6); i++) {
    lbAfegirObjectiu();
  }

  lbActualitzarUI();
}

function lbAfegirObjectiu() {
  const velMult = 1 + (lbNivell - 1) * 0.12;
  // Tria tipus segons nivell: crancs sempre, pops des niv 3, taurons des niv 5
  const disponibles = LB_TIPUS.filter((_, i) =>
    i === 0 || (i === 1 && lbNivell >= 3) || (i === 2 && lbNivell >= 5)
  );
  const tipus = disponibles[Math.floor(Math.random() * disponibles.length)];

  const marge = tipus.mida / 2 + 10;
  const x = marge + Math.random() * (lbW - marge * 2);
  // Apareix a la meitat superior
  const y = marge + Math.random() * (lbH * 0.55);

  // Velocitat i direcció aleatòria
  const angle = Math.random() * Math.PI * 2;
  const speed = tipus.vel * velMult * (0.8 + Math.random() * 0.4);

  lbObjectius.push({
    id: lbObjectiuId++,
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed * 0.5, // menys moviment vertical
    tipus,
    vida: tipus.vida,
    maxVida: tipus.vida,
    hit: false,
    hitTimer: 0,
    escala: 1,
    pulsTimer: Math.random() * Math.PI * 2,
  });
}

// ── GAME LOOP ─────────────────────────────────────────────────
function lbLoop(now) {
  if (!lbActiu) return;
  lbAnimId = requestAnimationFrame(lbLoop);
  const dt = Math.min(now - lbLastTime, 50);
  lbLastTime = now;
  if (!lbPausa) lbActualitzarLogica(dt);
  lbDibuixar();
}

// ── LÒGICA ────────────────────────────────────────────────────
function lbActualitzarLogica(dt) {
  const dtF = dt / 16.67; // normalitzat a 60fps

  // Actualitza bomba
  if (lbBomba) {
    if (lbBomba.explotant) {
      lbBomba.exTimer -= dt;
      lbBomba.radi += dtF * 4;
      if (lbBomba.exTimer <= 0) lbBomba = null;
    } else {
      lbBomba.x  += lbBomba.vx * dtF;
      lbBomba.vy += LB_GRAVETAT * dtF;
      lbBomba.y  += lbBomba.vy * dtF;
      lbBomba.rot = (lbBomba.rot || 0) + 0.08 * dtF;

      // Rebota a les parets
      if (lbBomba.x < 12)        { lbBomba.x = 12;       lbBomba.vx *= -0.7; }
      if (lbBomba.x > lbW - 12)  { lbBomba.x = lbW - 12; lbBomba.vx *= -0.7; }

      // Comprova impacte amb objectius
      lbObjectius.forEach(obj => {
        if (obj.vida <= 0) return;
        const dx = lbBomba.x - obj.x;
        const dy = lbBomba.y - obj.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < obj.tipus.mida / 2 + 14) {
          lbExplotar(lbBomba.x, lbBomba.y);
        }
      });

      // Cau fora de pantalla (terra)
      if (lbBomba.y > lbH + 20) {
        lbExplotar(lbBomba.x, lbH - 30);
      }
    }
  }

  // Comprova explosió contra objectius
  if (lbBomba?.explotant) {
    const radi = lbBomba.radi;
    lbObjectius.forEach(obj => {
      if (obj.vida <= 0) return;
      const dx = lbBomba.x - obj.x;
      const dy = lbBomba.y - obj.y;
      if (Math.sqrt(dx * dx + dy * dy) < radi + obj.tipus.mida / 2) {
        obj.vida--;
        obj.hit = true;
        obj.hitTimer = 300;
        if (obj.vida <= 0) {
          lbEliminatObjectiu(obj);
        }
      }
    });
  }

  // Actualitza objectius
  lbObjectius.forEach(obj => {
    if (obj.vida <= 0) return;
    obj.x += obj.vx * dtF;
    obj.y += obj.vy * dtF;
    obj.pulsTimer += 0.04 * dtF;
    if (obj.hit) {
      obj.hitTimer -= dt;
      if (obj.hitTimer <= 0) obj.hit = false;
    }
    // Rebota a les vores
    const marge = obj.tipus.mida / 2;
    if (obj.x < marge)        { obj.x = marge;       obj.vx *= -1; }
    if (obj.x > lbW - marge)  { obj.x = lbW - marge; obj.vx *= -1; }
    if (obj.y < marge)        { obj.y = marge;       obj.vy *= -1; }
    if (obj.y > lbH * 0.82)   { obj.y = lbH * 0.82; obj.vy *= -1; }
  });

  // Elimina objectius morts
  lbObjectius = lbObjectius.filter(obj => obj.vida > 0);

  // Afegeix nous objectius si en calen més
  const vius = lbObjectius.length;
  const maxActius = Math.min(3 + lbNivell, 7);
  const faltaEliminar = lbObjectiuNivell - lbEliminats;
  if (vius < maxActius && faltaEliminar > vius) {
    lbAfegirObjectiu();
  }

  // Actualitza partícules
  lbParticules.forEach(p => {
    p.x += p.vx * dtF;
    p.y += p.vy * dtF;
    p.vy += 0.1 * dtF;
    p.alpha -= 0.025 * dtF;
  });
  lbParticules = lbParticules.filter(p => p.alpha > 0);

  // Actualitza missatges flotants
  lbMissatges.forEach(m => {
    m.y -= 0.8 * dtF;
    m.timer -= dt;
  });
  lbMissatges = lbMissatges.filter(m => m.timer > 0);

  // Sense bombes i sense bomba en vol → recàrrega automàtica
  if (lbBombesRestants <= 0 && !lbBomba) {
    lbBombesRestants = LB_MAX_BOMBES;
    lbAfegirMissatge('🔄 Recàrrega!', lbW / 2, lbH / 2, '#ecc94b', 1200);
    lbActualitzarUI();
  }
}

function lbEliminatObjectiu(obj) {
  lbEliminats++;
  const bonus = lbNivell > 1 ? Math.floor(obj.tipus.punts * (1 + lbNivell * 0.1)) : obj.tipus.punts;
  lbPunts += bonus;

  // Partícules
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 * i) / 12;
    lbParticules.push({
      x: obj.x, y: obj.y,
      vx: Math.cos(angle) * (2 + Math.random() * 3),
      vy: Math.sin(angle) * (2 + Math.random() * 3) - 2,
      alpha: 1,
      color: ['#f6ad55','#fc8181','#68d391','#63b3ed'][Math.floor(Math.random() * 4)],
      mida: 4 + Math.random() * 5,
    });
  }

  lbAfegirMissatge(`+${bonus}`, obj.x, obj.y - 20, '#ecc94b', 800);
  lbActualitzarUI();

  // Comprova victòria
  if (lbEliminats >= lbObjectiuNivell) {
    setTimeout(lbNivellSuperat, 400);
  }
}

function lbExplotar(x, y) {
  if (!lbBomba || lbBomba.explotant) return;
  lbBomba.explotant = true;
  lbBomba.exTimer   = 500;
  lbBomba.x = x;
  lbBomba.y = y;
  lbBomba.radi = 20;

  lbBombesRestants--;
  lbActualitzarUI();

  // Partícules d'explosió
  for (let i = 0; i < 20; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 5;
    lbParticules.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      alpha: 1,
      color: ['#fff3cd','#f6ad55','#fc8181','#e53e3e'][Math.floor(Math.random() * 4)],
      mida: 3 + Math.random() * 6,
    });
  }
}

function lbAfegirMissatge(text, x, y, color, durada) {
  lbMissatges.push({ text, x, y, color, timer: durada });
}

// ── DIBUIX ────────────────────────────────────────────────────
function lbDibuixar() {
  if (!lbCtx) return;
  const ctx = lbCtx;
  const fons = LB_FONS[Math.min(lbNivell - 1, 9)];

  // Fons oceà gradient
  const gradFons = ctx.createLinearGradient(0, 0, 0, lbH);
  gradFons.addColorStop(0, fons[0]);
  gradFons.addColorStop(1, fons[1]);
  ctx.fillStyle = gradFons;
  ctx.fillRect(0, 0, lbW, lbH);

  // Ondes decoratives de fons
  lbDibuixarOndes(ctx);

  // Objectius
  lbObjectius.forEach(obj => {
    if (obj.vida <= 0) return;
    ctx.save();
    ctx.translate(obj.x, obj.y);

    // Pulsació suau
    const pulse = 1 + Math.sin(obj.pulsTimer) * 0.04;
    ctx.scale(pulse, pulse);

    // Flash de cop
    ctx.globalAlpha = obj.hit ? 0.5 : 1;

    // Fons semitransparent perquè l'emoji destaqui
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath();
    ctx.arc(0, 0, obj.tipus.mida / 2, 0, Math.PI * 2);
    ctx.fill();

    // Emoji — SENSE shadowColor (els capgira/enfosqueix en canvas)
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur  = 0;
    const s = obj.tipus.mida;
    ctx.font = `${s}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white'; // no afecta emojis però evita artefactes
    ctx.fillText(obj.tipus.emoji, 0, 2);

    // Barra de vida si té més d'1 HP
    if (obj.maxVida > 1) {
      const bw = s * 0.8, bh = 5;
      const bx = -bw / 2, by = s / 2 + 6;
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(bx, by, bw, bh);
      ctx.fillStyle = obj.vida === obj.maxVida ? '#68d391' : '#f6ad55';
      ctx.fillRect(bx, by, bw * (obj.vida / obj.maxVida), bh);
    }

    ctx.restore();
  });

  // Partícules
  lbParticules.forEach(p => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.fillStyle   = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.mida / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // Bomba en vol
  if (lbBomba) {
    ctx.save();
    ctx.translate(lbBomba.x, lbBomba.y);
    if (!lbBomba.explotant) {
      ctx.rotate(lbBomba.rot || 0);
      ctx.font = '28px serif';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('💣', 0, 0);
    } else {
      // Cercle d'explosió
      const alpha = Math.max(0, lbBomba.exTimer / 500);
      const grad  = ctx.createRadialGradient(0, 0, 0, 0, 0, lbBomba.radi);
      grad.addColorStop(0,   `rgba(255,243,205,${alpha})`);
      grad.addColorStop(0.4, `rgba(246,173,85,${alpha * 0.8})`);
      grad.addColorStop(1,   `rgba(229,62,62,0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, lbBomba.radi, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Línia d'apuntat
  if (lbArrossegant && lbArrossegaInici && lbArrossegaActual && !lbBomba) {
    lbDibuixarTrajectoria(ctx);
  }

  // Base de llançament
  lbDibuixarBase(ctx);

  // Missatges flotants
  lbMissatges.forEach(m => {
    const alpha = Math.min(1, m.timer / 300);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font        = 'bold 18px DM Sans, sans-serif';
    ctx.textAlign   = 'center';
    ctx.fillStyle   = m.color;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur  = 4;
    ctx.fillText(m.text, m.x, m.y);
    ctx.restore();
  });

  // Overlay pausa
  if (lbPausa) {
    ctx.fillStyle = 'rgba(10,22,40,0.75)';
    ctx.fillRect(0, 0, lbW, lbH);
    ctx.fillStyle   = '#fff';
    ctx.font        = 'bold 28px DM Sans';
    ctx.textAlign   = 'center';
    ctx.fillText('⏸ PAUSA', lbW / 2, lbH / 2);
    ctx.font        = '16px DM Sans';
    ctx.fillStyle   = 'rgba(255,255,255,0.6)';
    ctx.fillText('Toca per continuar', lbW / 2, lbH / 2 + 36);
  }
}

function lbDibuixarOndes(ctx) {
  const t = Date.now() / 1200;
  for (let capa = 0; capa < 3; capa++) {
    const yBase = lbH * (0.78 + capa * 0.07);
    const amp   = 8 - capa * 2;
    const freq  = 0.015 + capa * 0.005;
    const alpha = 0.06 - capa * 0.015;
    ctx.beginPath();
    ctx.moveTo(0, yBase);
    for (let x = 0; x <= lbW; x += 4) {
      ctx.lineTo(x, yBase + Math.sin(x * freq + t + capa) * amp);
    }
    ctx.lineTo(lbW, lbH);
    ctx.lineTo(0, lbH);
    ctx.closePath();
    ctx.fillStyle = `rgba(106,171,122,${alpha})`;
    ctx.fill();
  }
}

function lbDibuixarBase(ctx) {
  const { x, y } = lbPosLlancament;
  const nBombes  = lbBombesRestants;
  const mida     = 22;    // px per bomba
  const espai    = 26;    // separació entre bombes
  const totalW   = Math.max(70, nBombes * espai + 16);

  // Plataforma ampliada per encabir totes les bombes
  ctx.fillStyle = 'rgba(45,90,61,0.75)';
  ctx.beginPath();
  ctx.roundRect(x - totalW / 2, y - 14, totalW, 28, 8);
  ctx.fill();
  ctx.strokeStyle = 'rgba(106,171,122,0.55)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Bombes centrades
  if (nBombes > 0) {
    const startX = x - ((nBombes - 1) * espai) / 2;
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur  = 0;
    ctx.font = `${mida}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < nBombes; i++) {
      ctx.fillText('💣', startX + i * espai, y + 1);
    }
  } else {
    // Sense bombes: mostra recàrrega
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '12px DM Sans, sans-serif';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('recàrrega...', x, y + 1);
  }
}

function lbDibuixarTrajectoria(ctx) {
  const dx = lbArrossegaInici.x - lbArrossegaActual.x;
  const dy = lbArrossegaInici.y - lbArrossegaActual.y;
  const distDrag = Math.sqrt(dx * dx + dy * dy);
  if (distDrag < 5) return;

  const potencia = Math.min(distDrag, 150) / 150;
  const velMax   = 18;
  let vx = (dx / distDrag) * potencia * velMax;
  let vy = (dy / distDrag) * potencia * velMax;

  // Simula trajectòria
  let px = lbPosLlancament.x;
  let py = lbPosLlancament.y;

  ctx.save();
  ctx.setLineDash([5, 6]);
  ctx.strokeStyle = 'rgba(255,255,255,0.45)';
  ctx.lineWidth   = 2;
  ctx.beginPath();
  ctx.moveTo(px, py);

  for (let i = 0; i < 50; i++) {
    vx *= 0.995;
    vy += LB_GRAVETAT;
    px += vx;
    py += vy;
    if (px < 0 || px > lbW || py > lbH + 20) break;
    ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Indicador de potència a la base (no al punt d'arrossegament que pot ser fora)
  const pctColor = potencia < 0.4 ? '#68d391' : potencia < 0.7 ? '#f6ad55' : '#fc8181';
  ctx.setLineDash([]);
  ctx.strokeStyle = pctColor;
  ctx.lineWidth   = 3;
  // Fletxa indicadora de direcció des de la base
  const baseX = lbPosLlancament.x;
  const baseY = lbPosLlancament.y;
  const arrowLen = Math.min(distDrag * 0.4, 55);
  const arrowX = baseX + (dx / distDrag) * arrowLen;
  const arrowY = baseY + (dy / distDrag) * arrowLen;
  ctx.beginPath();
  ctx.moveTo(baseX, baseY);
  ctx.lineTo(arrowX, arrowY);
  ctx.stroke();

  // Punt de potència
  ctx.fillStyle = pctColor;
  ctx.beginPath();
  ctx.arc(baseX, baseY - 18, 6, 0, Math.PI * 2);
  ctx.fill();
  // Barra de potència
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(baseX - 30, baseY - 26, 60, 8);
  ctx.fillStyle = pctColor;
  ctx.fillRect(baseX - 30, baseY - 26, 60 * potencia, 8);

  ctx.restore();
}

// ── FI DE PARTIDA ─────────────────────────────────────────────
function lbNivellSuperat() {
  lbActiu = false;
  cancelAnimationFrame(lbAnimId);
  clearInterval(lbTimerUI);

  const bonus = lbSegons * 5 * lbNivell;
  lbPunts += bonus;
  lbGuardarEstat(jugadorActiu, lbPunts, lbNivell);

  if (lbNivell >= 10) {
    lbMostrarModal('🏆', 'Mestre dels mars!', `Has completat tots els nivells!<br>Puntuació final: <strong>${lbPunts} pts</strong>`, true, true);
  } else {
    lbMostrarModal('🎉', `Nivell ${lbNivell} superat!`,
      `+${bonus} bonus temps · ${lbPunts} pts totals`, false, false,
      () => lbIniciarNivell(lbNivell + 1));
  }
}

function lbTempsEsgotat() {
  lbActiu = false;
  cancelAnimationFrame(lbAnimId);
  clearInterval(lbTimerUI);
  lbVides--;
  lbGuardarEstat(jugadorActiu, lbPunts, lbNivell);

  if (lbVides <= 0) {
    lbMostrarModal('💀', 'Temps esgotat!', `Nivell ${lbNivell} · ${lbPunts} pts`, true, false);
  } else {
    lbMostrarModal('⏱️', 'Temps esgotat!',
      `Et queden ${lbVides} ❤️ · ${lbEliminats}/${lbObjectiuNivell} eliminats`,
      false, false, () => lbIniciarNivell(lbNivell));
  }
}

function lbMostrarModal(icon, titol, sub, mostrarTornar, fi, cbContinuar = null) {
  const wrap = document.getElementById('llancabombes-joc-cont');
  const ov   = document.createElement('div');
  ov.className = 'pm-overlay-final';
  ov.innerHTML = `
    <div class="pm-modal">
      <div class="pm-modal-icon">${icon}</div>
      <div class="pm-modal-titol">${titol}</div>
      <div class="pm-modal-info" style="text-align:center">${sub}</div>
      <div class="pm-modal-btns">
        ${cbContinuar ? `<button class="snake-btn-start" onclick="document.querySelector('.pm-overlay-final').remove();(${cbContinuar.toString()})()">Nivell ${lbNivell + 1} →</button>` : ''}
        ${fi ? `<button class="snake-btn-start" onclick="lbReiniciar()">Torna a jugar 🔄</button>` : ''}
        <button class="pm-btn-sortir" onclick="lbSortir()">← Tornar</button>
      </div>
    </div>`;
  wrap.appendChild(ov);
}

// ── TIMER ─────────────────────────────────────────────────────
function lbIniciarTimerUI() {
  clearInterval(lbTimerUI);
  lbTimerUI = setInterval(() => {
    if (!lbActiu || lbPausa) return;
    lbSegons--;
    const el = document.getElementById('lb-temps');
    if (el) {
      el.textContent = lbSegons + 's';
      el.style.color = lbSegons <= 10 ? '#fc8181' : '';
    }
    if (lbSegons <= 0) lbTempsEsgotat();
  }, 1000);
}

function lbActualitzarUI() {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('lb-vides',         lbVides);
  set('lb-nivell',        `${lbNivell}/10`);
  set('lb-punts',         lbPunts);
  set('lb-eliminats',     lbEliminats);
  set('lb-objectiu-total', lbObjectiuNivell);
}

// ── CONTROLS ─────────────────────────────────────────────────
function lbAfegirControls() {
  // L'inici de l'arrossegament es detecta al canvas
  const wrap = document.getElementById('lb-canvas-wrap');
  if (wrap) {
    wrap.addEventListener('mousedown',  lbOnMouseDown);
    wrap.addEventListener('touchstart', lbOnTouchStart, { passive: false });
  }
  // Moviment i alliberament es detecten a tot el document
  // (permet arrossegar fora del canvas cap avall)
  document.addEventListener('mousemove',  lbOnMouseMove);
  document.addEventListener('mouseup',    lbOnMouseUp);
  document.addEventListener('touchmove',  lbOnTouchMove,  { passive: false });
  document.addEventListener('touchend',   lbOnTouchEnd,   { passive: false });
  document.addEventListener('keydown', lbOnKey);
  window.addEventListener('resize', lbAjustarCanvas);
}

function lbEliminarControls() {
  const wrap = document.getElementById('lb-canvas-wrap');
  if (wrap) {
    wrap.removeEventListener('mousedown',  lbOnMouseDown);
    wrap.removeEventListener('touchstart', lbOnTouchStart);
  }
  document.removeEventListener('mousemove',  lbOnMouseMove);
  document.removeEventListener('mouseup',    lbOnMouseUp);
  document.removeEventListener('touchmove',  lbOnTouchMove);
  document.removeEventListener('touchend',   lbOnTouchEnd);
  document.removeEventListener('keydown', lbOnKey);
  window.removeEventListener('resize', lbAjustarCanvas);
}

function lbOnKey(e) {
  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') lbTogglePausa();
}

function lbTogglePausa() {
  if (!lbActiu) return;
  lbPausa = !lbPausa;
}

// Coordenades relatives al canvas (permet valors fora dels límits per calcular vectors)
function lbCoordCanvas(clientX, clientY) {
  const rect = lbCanvas.getBoundingClientRect();
  const scaleX = lbW / rect.width;
  const scaleY = lbH / rect.height;
  return {
    x: (clientX - rect.left)  * scaleX,
    y: (clientY - rect.top)   * scaleY,
  };
}

function lbIniciarArrossegament(cx, cy) {
  if (!lbActiu || lbPausa || lbBomba || lbBombesRestants <= 0) return;
  lbArrossegant     = true;
  lbArrossegaInici  = { x: lbPosLlancament.x, y: lbPosLlancament.y };
  lbArrossegaActual = { x: cx, y: cy };
}

function lbMoureArrossegament(cx, cy) {
  if (!lbArrossegant) return;
  lbArrossegaActual = { x: cx, y: cy };
}

function lbAlliberarArrossegament(cx, cy) {
  if (!lbArrossegant) return;
  lbArrossegant = false;

  const dx = lbArrossegaInici.x - cx;
  const dy = lbArrossegaInici.y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 8) { lbArrossegaInici = null; lbArrossegaActual = null; return; }

  const potencia = Math.min(dist, 150) / 150;
  const velMax   = 18;
  const vx = (dx / dist) * potencia * velMax;
  const vy = (dy / dist) * potencia * velMax;

  lbBomba = {
    x: lbPosLlancament.x,
    y: lbPosLlancament.y,
    vx, vy,
    rot: 0,
    explotant: false,
    exTimer: 0,
    radi: 0,
  };

  lbArrossegaInici  = null;
  lbArrossegaActual = null;
}

// Mouse
function lbOnMouseDown(e) { const c = lbCoordCanvas(e.clientX, e.clientY); lbIniciarArrossegament(c.x, c.y); }
function lbOnMouseMove(e) { const c = lbCoordCanvas(e.clientX, e.clientY); lbMoureArrossegament(c.x, c.y); }
function lbOnMouseUp(e)   { const c = lbCoordCanvas(e.clientX, e.clientY); lbAlliberarArrossegament(c.x, c.y); }

// Touch
function lbOnTouchStart(e) { e.preventDefault(); const t = e.touches[0]; const c = lbCoordCanvas(t.clientX, t.clientY); lbIniciarArrossegament(c.x, c.y); }
function lbOnTouchMove(e)  { e.preventDefault(); const t = e.touches[0]; const c = lbCoordCanvas(t.clientX, t.clientY); lbMoureArrossegament(c.x, c.y); }
function lbOnTouchEnd(e)   { e.preventDefault(); const t = e.changedTouches[0]; const c = lbCoordCanvas(t.clientX, t.clientY); lbAlliberarArrossegament(c.x, c.y); }

// ── NAVEGACIÓ ─────────────────────────────────────────────────
function lbReiniciar() {
  lbEliminarControls();
  lbPunts = 0; lbVides = 3;
  lbIniciarNivell(1);
}

function lbSortir() {
  lbActiu = false;
  cancelAnimationFrame(lbAnimId);
  clearInterval(lbTimerUI);
  lbEliminarControls();
  mostraScreen('llancabombes-inici');
  lbRenderInici();
}

// ── RÀNQUING ─────────────────────────────────────────────────
function lbRenderRankingHTML() {
  const llista = JUGADORS_VALIDS.map(nom => ({
    nom, ...lbGetMillors(nom),
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
const LB_COL = 'llancabombes_punts';

function lbGetMillors(nom) {
  const d = jocFsCacheGet(LB_COL, nom);
  return d || { punts: 0, nivell: 1 };
}

function lbGuardarEstat(nom, punts, nivell) {
  const actual = lbGetMillors(nom);
  jocFsDesar(LB_COL, nom, {
    punts:  Math.max(actual.punts, punts),
    nivell: Math.max(actual.nivell, nivell),
  });
}

// Funció global per al rànquing de jocs.js
async function llancabombesGetPuntsGlobals() {
  const dades = await jocFsCarregarTots(LB_COL, JUGADORS_VALIDS);
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => { pts[nom] = (dades[nom] && dades[nom].punts) || 0; });
  return pts;
}
