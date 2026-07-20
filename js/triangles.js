// ══════════════════════════════════════════════════════════════
//  TRIANGLES — Açores 2026
//  Punts distribuïts aleatòriament (com cardgames.io)
//  Una línia és vàlida si no creua cap línia ja traçada
//  Un triangle es forma quan 3 punts estan connectats pels
//  3 costats I no hi ha cap altre punt dins del triangle
//  1 jugador vs IA · 3 dificultats (×1/×1.5/×2)
//  localStorage: triangles_estat_Nom
// ══════════════════════════════════════════════════════════════

const TR_NPUNTS = 20; // nombre de punts (cardgames.io usa ~20)

const TR_CONFIG = {
  facil:   { label: 'Fàcil',   emoji: '😊', multiplicador: 1.0,
             desc: 'La IA tria línies aleatòriament' },
  mitja:   { label: 'Mitjà',   emoji: '🧠', multiplicador: 1.5,
             desc: 'La IA tanca triangles quan pot' },
  dificil: { label: 'Difícil', emoji: '🔥', multiplicador: 2.0,
             desc: 'La IA evita donar triangles al rival' },
};

// ── ESTAT GLOBAL ──────────────────────────────────────────────
let trDificultat = 'facil';
let trPunts      = [];   // [{x, y}] en coordenades canvas [0..1]
let trLinies     = [];   // [{a, b}] índexs de punts
let trTriangles  = [];   // [{a, b, c, jugador}]
let trTorn       = 'jugador';
let trActiu      = false;
let trCanvas     = null;
let trCtx        = null;
let trMida       = 0;
let trPuntInici  = null;
let trPuntHover  = -1;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
async function iniciarTriangles() {
  trActiu = false;
  mostraScreen('triangles-inici');
  const c = document.getElementById('triangles-inici-cont');
  if (c) c.innerHTML = '<div class="joc-carregant">Carregant…</div>';
  await jocFsCarregarTots(TR_COL, JUGADORS_VALIDS);
  trRenderInici();
}

// ── PANTALLA INICI ────────────────────────────────────────────
function trRenderInici() {
  const estat = trGetEstat(jugadorActiu);
  const cont  = document.getElementById('triangles-inici-cont');
  if (!cont) return;
  cont.innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-header-fila">
          <button class="mapa-back-btn" onclick="mostraScreen('joc-selector')">← Tornar</button>
        </div>
        <div class="joc-titol-fila" style="align-items:center;width:100%;text-align:center;">
          <span class="joc-titol-emoji">🔺</span>
          <span class="joc-titol-text">Triangles</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">
              ${estat.partides > 0
                ? `${estat.partides} partides · ${trPctVictories(estat)}% victòries`
                : 'Cap partida jugada encara'}
            </div>
          </div>
        </div>
        <div class="pm-dif-selector">
          ${Object.entries(TR_CONFIG).map(([key, cfg]) => `
            <button class="pm-dif-btn ${trDificultat === key ? 'actiu' : ''}"
                    onclick="trTriarDificultat('${key}', this)">
              <span class="pm-dif-emoji">${cfg.emoji}</span>
              <span class="pm-dif-label">${cfg.label}
                <span style="opacity:.6;font-size:.75rem;margin-left:.3rem">×${cfg.multiplicador}</span>
              </span>
              <span class="pm-dif-info">${cfg.desc}</span>
              <span class="pm-dif-millor">
                ${estat.difs[key]
                  ? `${estat.difs[key].partides} partides · ${Math.round((estat.difs[key].victòries||0)/estat.difs[key].partides*100)}% vic.`
                  : '—'}
              </span>
            </button>`).join('')}
        </div>
        <div class="snake-instruccions">
          <p>Connecta punts per formar <strong>triangles</strong> i guanya'ls.</p>
          <ul class="snake-controls-llista">
            <li>🔺 Toca un punt i arrossega fins a un altre per dibuixar una línia</li>
            <li>⚠️ Les línies <strong>no es poden creuar</strong></li>
            <li>✅ Si tanques un triangle sense punts dins, <strong>és teu</strong></li>
            <li>🔄 Els torns sempre <strong>s'alternen</strong></li>
            <li>🏆 Guanya qui té <strong>més triangles</strong> quan no queden línies vàlides</li>
          </ul>
        </div>
        <button class="snake-btn-start" onclick="trComençar()">Jugar 🔺</button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Triangles</div>
        <div class="ranking-list-home">${trRenderRankingHTML()}</div>
      </div>
    </div>`;
}

function trTriarDificultat(key, btn) {
  trDificultat = key;
  document.querySelectorAll('.pm-dif-btn').forEach(b => b.classList.remove('actiu'));
  btn.classList.add('actiu');
}

// ── INICI PARTIDA ─────────────────────────────────────────────
function trComençar() {
  trLinies    = [];
  trTriangles = [];
  trTorn      = 'jugador';
  trActiu     = true;
  trPuntInici = null;
  trPuntHover = -1;
  trGenerarPunts();
  mostraScreen('triangles-joc');
  setTimeout(() => trIniciarCanvas(), 50);
}

// ── GENERACIÓ DE PUNTS ALEATORIS ─────────────────────────────
// Distribuïm punts aleatòriament evitant que quedin massa junts
function trGenerarPunts() {
  const marge   = 0.10;
  const zona    = 1 - marge * 2;
  const minDist = 0.17;
  const minAngle = 22; // graus mínims entre 3 punts propers per evitar alineació

  function anglesOk(nou) {
    const propers = trPunts.filter(p => Math.hypot(p.x - nou.x, p.y - nou.y) < 0.42);
    for (let i = 0; i < propers.length; i++) {
      for (let j = i + 1; j < propers.length; j++) {
        const ax = propers[i].x - nou.x, ay = propers[i].y - nou.y;
        const bx = propers[j].x - nou.x, by = propers[j].y - nou.y;
        const dot = ax*bx + ay*by;
        const mag = Math.hypot(ax,ay) * Math.hypot(bx,by);
        if (mag < 1e-10) continue;
        const angle = Math.acos(Math.max(-1, Math.min(1, dot/mag))) * 180 / Math.PI;
        if (angle < minAngle) return false;
      }
    }
    return true;
  }

  trPunts = [];
  let intents = 0;
  while (trPunts.length < TR_NPUNTS && intents < 10000) {
    intents++;
    const x = marge + Math.random() * zona;
    const y = marge + Math.random() * zona;
    const p = { x, y };
    if (trPunts.every(q => Math.hypot(q.x - x, q.y - y) >= minDist) && anglesOk(p)) {
      trPunts.push(p);
    }
  }
}

// ── CANVAS ────────────────────────────────────────────────────
function trIniciarCanvas() {
  const cont = document.getElementById('triangles-joc-cont');
  if (!cont) return;
  cont.innerHTML = `
    <div class="tr-wrap">
      <div class="tr-header">
        <button class="mapa-back-btn" onclick="trSortir()">← Sortir</button>
        <div class="tr-torn-badge" id="tr-torn-badge">🔺 El teu torn</div>
        <div class="tr-marcador">
          <span class="tr-marc-jug" id="tr-marc-jug">Tu: 0</span>
          <span class="tr-marc-sep">·</span>
          <span class="tr-marc-ia"  id="tr-marc-ia">IA: 0</span>
        </div>
      </div>
      <div class="tr-canvas-wrap">
        <canvas id="tr-canvas"></canvas>
      </div>
      <div class="tr-missatge" id="tr-missatge"></div>
    </div>`;

  trCanvas = document.getElementById('tr-canvas');
  trCtx    = trCanvas.getContext('2d');

  const wrap = document.querySelector('.tr-canvas-wrap');
  trMida = Math.min((wrap ? wrap.clientWidth : 340) - 16, 460);
  trCanvas.width  = trMida;
  trCanvas.height = trMida;
  trCanvas.style.width  = trMida + 'px';
  trCanvas.style.height = trMida + 'px';

  trDibuixar();
  trAfegirEvents();
}

// ── COORDENADES CANVAS ────────────────────────────────────────
function trPX(p) { return p.x * trMida; }
function trPY(p) { return p.y * trMida; }

// ── DIBUIX ────────────────────────────────────────────────────
function trDibuixar(prevFi) {
  if (!trCtx) return;
  const ctx = trCtx;
  ctx.clearRect(0, 0, trMida, trMida);

  // 1. Omplir triangles guanyats
  trTriangles.forEach(t => {
    const pa = trPunts[t.a], pb = trPunts[t.b], pc = trPunts[t.c];
    ctx.beginPath();
    ctx.moveTo(trPX(pa), trPY(pa));
    ctx.lineTo(trPX(pb), trPY(pb));
    ctx.lineTo(trPX(pc), trPY(pc));
    ctx.closePath();
    ctx.fillStyle = t.jugador === 'jugador'
      ? 'rgba(106,171,122,.35)' : 'rgba(220,100,100,.35)';
    ctx.fill();
  });

  // 2. Línies traçades
  trLinies.forEach(l => {
    const pa = trPunts[l.a], pb = trPunts[l.b];
    ctx.beginPath();
    ctx.moveTo(trPX(pa), trPY(pa));
    ctx.lineTo(trPX(pb), trPY(pb));
    ctx.strokeStyle = 'rgba(180,210,255,.85)';
    ctx.lineWidth   = 2.5; ctx.lineCap = 'round';
    ctx.stroke();
  });

  // 3. Preview mentre arrossegues
  if (trPuntInici !== null && prevFi !== undefined && prevFi >= 0 && prevFi !== trPuntInici) {
    const pa = trPunts[trPuntInici], pb = trPunts[prevFi];
    const valid = trEsLiniaValida(trPuntInici, prevFi);
    ctx.beginPath();
    ctx.moveTo(trPX(pa), trPY(pa));
    ctx.lineTo(trPX(pb), trPY(pb));
    ctx.strokeStyle = valid ? 'rgba(106,171,122,.9)' : 'rgba(220,80,80,.6)';
    ctx.lineWidth   = 3; ctx.setLineDash([8, 5]); ctx.stroke();
    ctx.setLineDash([]);
  }

  // 4. Punts
  trPunts.forEach((p, i) => {
    const radi = i === trPuntInici ? 9 : 6;
    ctx.beginPath();
    ctx.arc(trPX(p), trPY(p), radi, 0, Math.PI * 2);
    ctx.fillStyle = i === trPuntInici
      ? '#6aab7a'
      : trPuntHover === i ? '#c8f0d0' : '#a8d8b0';
    ctx.fill();
    ctx.strokeStyle = '#2d5a3d'; ctx.lineWidth = 1.5;
    ctx.stroke();
  });
}

// ── GEOMETRIA: INTERSECCIÓ DE SEGMENTS ───────────────────────
// Retorna true si els segments (p1,p2) i (p3,p4) es creuen
// (sense contar els extrems)
function trSegmentsCruen(p1, p2, p3, p4) {
  const d1x = p2.x - p1.x, d1y = p2.y - p1.y;
  const d2x = p4.x - p3.x, d2y = p4.y - p3.y;
  const cross = d1x * d2y - d1y * d2x;
  if (Math.abs(cross) < 1e-10) return false; // paral·lels
  const dx = p3.x - p1.x, dy = p3.y - p1.y;
  const t = (dx * d2y - dy * d2x) / cross;
  const u = (dx * d1y - dy * d1x) / cross;
  const eps = 1e-9;
  return t > eps && t < 1 - eps && u > eps && u < 1 - eps;
}

// Retorna true si el punt p és interior al triangle (pa,pb,pc)
function trPuntDinsTriangle(p, pa, pb, pc) {
  const sign = (ax, ay, bx, by, cx, cy) =>
    (ax - cx) * (by - cy) - (bx - cx) * (ay - cy);
  const d1 = sign(p.x, p.y, pa.x, pa.y, pb.x, pb.y);
  const d2 = sign(p.x, p.y, pb.x, pb.y, pc.x, pc.y);
  const d3 = sign(p.x, p.y, pc.x, pc.y, pa.x, pa.y);
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNeg && hasPos);
}

// ── VALIDACIÓ DE LÍNIA ────────────────────────────────────────
function trEsLiniaValida(a, b) {
  if (a === b) return false;
  // Ja existeix?
  if (trLinies.some(l => (l.a===a&&l.b===b)||(l.a===b&&l.b===a))) return false;
  const pa = trPunts[a], pb = trPunts[b];
  // Creua alguna línia existent?
  for (const l of trLinies) {
    const pc = trPunts[l.a], pd = trPunts[l.b];
    if (trSegmentsCruen(pa, pb, pc, pd)) return false;
  }
  return true;
}

// ── DETECCIÓ DE TRIANGLES NOUS ────────────────────────────────
// Quan s'afegeix la línia (a,b), comprova si es forma un triangle
// amb algun punt c tal que existeixin (a,c) i (b,c)
// i el triangle (a,b,c) no contingui cap altre punt interior
function trAfegirLinia(a, b) {
  trLinies.push({ a, b });

  const nous = [];
  trPunts.forEach((_, c) => {
    if (c === a || c === b) return;
    // Calen les 3 arestes
    const teAC = trLinies.some(l => (l.a===a&&l.b===c)||(l.a===c&&l.b===a));
    const teBC = trLinies.some(l => (l.a===b&&l.b===c)||(l.a===c&&l.b===b));
    if (!teAC || !teBC) return;
    // Triangle ja registrat?
    const key = [a,b,c].sort().join('_');
    if (trTriangles.some(t => [t.a,t.b,t.c].sort().join('_') === key)) return;
    // Cap punt interior
    const pa = trPunts[a], pb = trPunts[b], pc = trPunts[c];
    const hiHaPuntDins = trPunts.some((p, i) => {
      if (i===a || i===b || i===c) return false;
      return trPuntDinsTriangle(p, pa, pb, pc);
    });
    if (!hiHaPuntDins) nous.push({ a, b, c });
  });

  nous.forEach(t => trTriangles.push({ ...t, jugador: trTorn }));
  return nous.length;
}

// ── LÍNIES DISPONIBLES ────────────────────────────────────────
// Totes les parelles (a,b) que no creuen línies existents i no existeixen ja
function trLiniesDisponibles() {
  const result = [];
  for (let a = 0; a < trPunts.length; a++) {
    for (let b = a + 1; b < trPunts.length; b++) {
      if (trEsLiniaValida(a, b)) result.push([a, b]);
    }
  }
  return result;
}

function trPartidaAcabada() { return trLiniesDisponibles().length === 0; }

// ── DETECCIÓ DEL PUNT MÉS PROPER ─────────────────────────────
function trPuntProper(cx, cy) {
  const radi = trMida * 0.055;
  let minD = Infinity, minI = -1;
  trPunts.forEach((p, i) => {
    const d = Math.hypot(trPX(p) - cx, trPY(p) - cy);
    if (d < minD) { minD = d; minI = i; }
  });
  return minD < radi ? minI : -1;
}

function trXY(e) {
  const rect = trCanvas.getBoundingClientRect();
  const sx = trCanvas.width  / rect.width;
  const sy = trCanvas.height / rect.height;
  const src = e.touches ? e.touches[0] : (e.changedTouches ? e.changedTouches[0] : e);
  return { x: (src.clientX - rect.left) * sx, y: (src.clientY - rect.top) * sy };
}

// ── EVENTS ────────────────────────────────────────────────────
function trAfegirEvents() {
  if (!trCanvas) return;

  trCanvas.addEventListener('mousedown', e => {
    if (!trActiu || trTorn !== 'jugador') return;
    const {x, y} = trXY(e);
    const i = trPuntProper(x, y);
    if (i >= 0) trPuntInici = i;
    trDibuixar();
  });

  trCanvas.addEventListener('mousemove', e => {
    if (!trActiu || trTorn !== 'jugador') return;
    const {x, y} = trXY(e);
    const i = trPuntProper(x, y);
    trPuntHover = i;
    if (trPuntInici !== null) trDibuixar(i);
    else trDibuixar();
  });

  trCanvas.addEventListener('mouseup', e => {
    if (!trActiu || trTorn !== 'jugador') return;
    const {x, y} = trXY(e);
    const i = trPuntProper(x, y);
    if (trPuntInici !== null && i >= 0 && i !== trPuntInici) {
      trJugadorTira(trPuntInici, i);
    }
    trPuntInici = null;
    trDibuixar();
  });

  trCanvas.addEventListener('mouseleave', () => {
    trPuntInici = null; trPuntHover = -1; trDibuixar();
  });

  trCanvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (!trActiu || trTorn !== 'jugador') return;
    const {x, y} = trXY(e);
    const i = trPuntProper(x, y);
    if (i >= 0) trPuntInici = i;
    trDibuixar();
  }, { passive: false });

  trCanvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!trActiu || trTorn !== 'jugador' || trPuntInici === null) return;
    const {x, y} = trXY(e);
    const i = trPuntProper(x, y);
    trDibuixar(i >= 0 ? i : undefined);
  }, { passive: false });

  trCanvas.addEventListener('touchend', e => {
    e.preventDefault();
    if (!trActiu || trTorn !== 'jugador') return;
    const {x, y} = trXY(e);
    const i = trPuntProper(x, y);
    if (trPuntInici !== null && i >= 0 && i !== trPuntInici) {
      trJugadorTira(trPuntInici, i);
    }
    trPuntInici = null; trDibuixar();
  }, { passive: false });
}

// ── TORN DEL JUGADOR ──────────────────────────────────────────
function trJugadorTira(a, b) {
  if (!trEsLiniaValida(a, b)) return;
  const tancats = trAfegirLinia(a, b);
  trActualitzarMarcador(); trDibuixar();
  if (trPartidaAcabada()) { trFinalitzar(); return; }
  if (tancats > 0) trMostrarMissatge(`🔺 +${tancats} triangle${tancats > 1 ? 's' : ''}!`);
  trTorn = 'ia'; trActualitzarTornUI();
  setTimeout(() => {
    trMostrarMissatge('🤖 Torn de la IA…');
    setTimeout(() => trTornIA(), 1300);
  }, tancats > 0 ? 900 : 200);
}

// ── TORN DE LA IA ─────────────────────────────────────────────
function trTornIA() {
  if (!trActiu) return;
  const mov = trTriarMovIA();
  if (!mov) { trFinalitzar(); return; }
  const tancats = trAfegirLinia(mov[0], mov[1]);
  trActualitzarMarcador(); trDibuixar();
  if (trPartidaAcabada()) { trFinalitzar(); return; }
  if (tancats > 0) trMostrarMissatge(`🤖 IA +${tancats} triangle${tancats > 1 ? 's' : ''}!`);
  trTorn = 'jugador'; trActualitzarTornUI();
  setTimeout(() => trMostrarMissatge('🔺 El teu torn!'), tancats > 0 ? 900 : 400);
}

function trTriarMovIA() {
  const disp = trLiniesDisponibles();
  if (!disp.length) return null;

  const comptaTancats = ([a, b]) => {
    trLinies.push({ a, b });
    let n = 0;
    trPunts.forEach((_, c) => {
      if (c===a||c===b) return;
      const teAC = trLinies.some(l=>(l.a===a&&l.b===c)||(l.a===c&&l.b===a));
      const teBC = trLinies.some(l=>(l.a===b&&l.b===c)||(l.a===c&&l.b===b));
      if (!teAC||!teBC) return;
      const key = [a,b,c].sort().join('_');
      if (trTriangles.some(t=>[t.a,t.b,t.c].sort().join('_')===key)) return;
      const pa=trPunts[a],pb=trPunts[b],pc=trPunts[c];
      if (!trPunts.some((p,i)=>{if(i===a||i===b||i===c)return false;return trPuntDinsTriangle(p,pa,pb,pc);})) n++;
    });
    trLinies.pop();
    return n;
  };

  // FÀCIL: completament aleatòria, no busca triangles
  if (trDificultat === 'facil') {
    return disp[Math.floor(Math.random() * disp.length)];
  }

  // MITJÀ i DIFÍCIL: tanca triangles si pot (escull la que en tanca més)
  const ambTancats = disp.filter(m => comptaTancats(m) > 0);
  if (ambTancats.length > 0) {
    return ambTancats.reduce((best, m) => comptaTancats(m) > comptaTancats(best) ? m : best);
  }

  // DIFÍCIL: evita donar triangles al rival
  if (trDificultat === 'dificil') {
    const deixaRegal = ([a, b]) => {
      trLinies.push({ a, b });
      let deixa = false;
      outer: for (let x = 0; x < trPunts.length; x++) {
        for (let y = x+1; y < trPunts.length; y++) {
          if (trEsLiniaValida(x, y) && comptaTancats([x,y]) > 0) { deixa = true; break outer; }
        }
      }
      trLinies.pop(); return deixa;
    };
    const segures = disp.filter(m => !deixaRegal(m));
    const pool = segures.length > 0 ? segures : disp;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // MITJÀ: aleatòria quan no pot tancar
  return disp[Math.floor(Math.random() * disp.length)];
}

// ── UI ────────────────────────────────────────────────────────
function trActualitzarMarcador() {
  const nJ = trTriangles.filter(t => t.jugador==='jugador').length;
  const nI = trTriangles.filter(t => t.jugador==='ia').length;
  const eJ = document.getElementById('tr-marc-jug');
  const eI = document.getElementById('tr-marc-ia');
  if (eJ) eJ.textContent = `Tu: ${nJ}`;
  if (eI) eI.textContent = `IA: ${nI}`;
}

function trActualitzarTornUI() {
  const el = document.getElementById('tr-torn-badge');
  if (el) el.textContent = trTorn==='jugador' ? '🔺 El teu torn' : '🤖 Torn de la IA…';
}

function trMostrarMissatge(text) {
  const el = document.getElementById('tr-missatge');
  if (!el) return;
  el.textContent = text; el.style.opacity = '1';
  clearTimeout(window._trMsgT);
  window._trMsgT = setTimeout(() => { el.style.opacity = '0'; }, 2500);
}

// ── FINAL PARTIDA ─────────────────────────────────────────────
function trFinalitzar() {
  trActiu = false;
  const nJ = trTriangles.filter(t=>t.jugador==='jugador').length;
  const nI = trTriangles.filter(t=>t.jugador==='ia').length;
  const guanyat = nJ > nI, empat = nJ === nI;
  const mult = TR_CONFIG[trDificultat].multiplicador;
  const punts = guanyat ? Math.round(nJ * 10 * mult) : 0;
  trGuardarPartida(jugadorActiu, trDificultat, guanyat && !empat, punts);
  trDibuixar();
  const cont = document.getElementById('triangles-joc-cont');
  if (!cont) return;
  const overlay = document.createElement('div');
  overlay.className = 'pm-overlay-final';
  overlay.innerHTML = `
    <div class="pm-modal">
      <div class="pm-modal-icon">${empat?'🤝':guanyat?'🏆':'😢'}</div>
      <div class="pm-modal-titol">${empat?'Empat!':guanyat?'Has guanyat!':'Ha guanyat la IA!'}</div>
      <div class="pm-modal-info">Tu: <strong>${nJ}</strong> triangles · IA: <strong>${nI}</strong> triangles</div>
      ${guanyat && !empat ? `
        <div class="gr-punts-resum">
          <span class="gr-punts-base">${Math.round(punts/mult)} pts base</span>
          ${mult>1?`<span class="gr-mult">× ${mult}</span>`:''}
          <span class="gr-punts-total">${punts} pts</span>
        </div>` : ''}
      <div class="pm-modal-btns">
        <button class="snake-btn-start" onclick="trRepetir()">Torna a jugar 🔺</button>
        <button class="pm-btn-sortir"   onclick="trSortir()">← Tornar</button>
      </div>
    </div>`;
  cont.appendChild(overlay);
}

function trRepetir() { trComençar(); }
function trSortir()  { trActiu=false; mostraScreen('triangles-inici'); trRenderInici(); }

// ── RÀNQUING ──────────────────────────────────────────────────
function trRenderRankingHTML() {
  const posEmoji = ['🥇','🥈','🥉'];
  const llista = JUGADORS_VALIDS.map(nom => {
    const e = trGetEstat(nom);
    return { nom, pct: trPctVictories(e), partides: e.partides };
  }).sort((a,b) => b.pct-a.pct);
  const maxPct = llista[0]?.pct || 1;
  return llista.map((r, i) => `
    <div class="ranking-item ${r.nom===jugadorActiu?'actiu':''}">
      <div class="ranking-pos ${i<3?'p'+(i+1):'other'}">${i<3?posEmoji[i]:i+1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom]||''}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div style="font-size:.7rem;color:var(--text2);margin-bottom:2px">${r.partides} partides</div>
        <div class="rank-barra-wrap">
          <div class="rank-barra" style="width:${Math.min(maxPct>0?(r.pct/maxPct)*100:0,100)}%"></div>
        </div>
      </div>
      <div class="rank-punts" style="align-self:center;flex-shrink:0">${r.pct}%</div>
    </div>`).join('');
}

function trPctVictories(estat) {
  if (!estat || estat.partides===0) return 0;
  return Math.round((estat.victòries||0)/estat.partides*100);
}

// ── PERSISTÈNCIA ──────────────────────────────────────────────
const TR_COL = 'triangles_punts';

function trGetEstat(nom) {
  const d = jocFsCacheGet(TR_COL, nom);
  return d || {partides:0,victòries:0,puntsTotals:0,difs:{facil:null,mitja:null,dificil:null}};
}

function trGuardarPartida(nom, dif, guanyat, punts) {
  const estat = trGetEstat(nom);
  estat.partides++;
  if (guanyat) estat.victòries=(estat.victòries||0)+1;
  estat.puntsTotals=(estat.puntsTotals||0)+punts;
  if (!estat.difs[dif]) estat.difs[dif]={partides:0,victòries:0};
  estat.difs[dif].partides++;
  if (guanyat) estat.difs[dif].victòries=(estat.difs[dif].victòries||0)+1;
  jocFsDesar(TR_COL, nom, estat);
}

async function trianglesGetPuntsGlobals() {
  const dades = await jocFsCarregarTots(TR_COL, JUGADORS_VALIDS);
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => { pts[nom] = trPctVictories(dades[nom]); });
  return pts;
}
