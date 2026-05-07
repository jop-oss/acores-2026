// ══════════════════════════════════════════════════════════════
//  TRIANGLES — Açores 2026
//  Graella triangular clàssica 7×7 punts
//  1 jugador vs IA · 3 dificultats (×1/×1.5/×2)
//  Rànquing: % de victòries
//  localStorage: triangles_estat_Nom
// ══════════════════════════════════════════════════════════════

// ── CONSTANTS ─────────────────────────────────────────────────
const TR_STORAGE_KEY = 'triangles_estat_';
const TR_FILES  = 7;   // files de punts
const TR_COLS   = 7;   // columnes de punts (per fila parella)
// La graella triangular té files de punts alternant longitud
// Files senars (0,2,4,6): TR_COLS punts
// Files parelles (1,3,5): TR_COLS-1 punts (desplaçades mig pas)
// Triangles possibles: (TR_FILES-1) * (TR_COLS-1) * 2 = 72

const TR_CONFIG = {
  facil:   { label: 'Fàcil',   emoji: '😊', multiplicador: 1.0,
             desc: 'La IA tria línies aleatòriament' },
  mitja:   { label: 'Mitjà',   emoji: '🧠', multiplicador: 1.5,
             desc: 'La IA tanca triangles quan pot' },
  dificil: { label: 'Difícil', emoji: '🔥', multiplicador: 2.0,
             desc: "La IA evita donar triangles al rival" },
};

// Colors dels jugadors
const TR_COLOR_JUG = '#6aab7a';  // verd
const TR_COLOR_IA  = '#e07070';  // vermell suau
const TR_COLOR_BG  = 'rgba(14,40,70,.6)';

// ── ESTAT ─────────────────────────────────────────────────────
let trDificultat = 'facil';
let trLinies     = new Set(); // Set de strings "p1_p2" (p1<p2)
let trTriangles  = [];        // [{p1,p2,p3,jugador}]
let trTorn       = 'jugador'; // 'jugador'|'ia'
let trActiu      = false;
let trCanvas     = null;
let trCtx        = null;
let trPunts      = [];        // [{x,y,fila,col}] coordenades canvas

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarTriangles() {
  trActiu = false;
  mostraScreen('triangles-inici');
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
            <li>✅ Si tanques un triangle, <strong>és teu i continues el torn</strong></li>
            <li>🏆 Guanya qui té <strong>més triangles</strong> quan no queden línies</li>
          </ul>
        </div>
        <button class="snake-btn-start" onclick="trComençar()">Jugar 🔺</button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Triangles</div>
        <div class="ranking-list-home" id="tr-ranking-list">${trRenderRankingHTML()}</div>
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
  trLinies    = new Set();
  trTriangles = [];
  trTorn      = 'jugador';
  trActiu     = true;
  mostraScreen('triangles-joc');
  trIniciarCanvas();
}

// ── CANVAS I GEOMETRIA ────────────────────────────────────────
function trIniciarCanvas() {
  const cont = document.getElementById('triangles-joc-cont');
  if (!cont) return;

  cont.innerHTML = `
    <div class="tr-wrap">
      <div class="tr-header">
        <button class="mapa-back-btn" onclick="trSortir()">← Sortir</button>
        <div class="tr-torn-badge" id="tr-torn-badge">🔺 El teu torn</div>
        <div class="tr-marcador" id="tr-marcador">
          <span class="tr-marc-jug" id="tr-marc-jug">Tu: 0</span>
          <span class="tr-marc-sep">·</span>
          <span class="tr-marc-ia" id="tr-marc-ia">IA: 0</span>
        </div>
      </div>
      <div class="tr-canvas-wrap">
        <canvas id="tr-canvas"></canvas>
      </div>
      <div class="tr-missatge" id="tr-missatge"></div>
    </div>`;

  trCanvas = document.getElementById('tr-canvas');
  trCtx    = trCanvas.getContext('2d');

  trCalcularPunts();
  trDibuixar();
  trAfegirEvents();
}

function trCalcularPunts() {
  const wrap   = document.querySelector('.tr-canvas-wrap');
  const mida   = Math.min(wrap.clientWidth || 340, 400);
  const margeX = mida * 0.08;
  const margeY = mida * 0.08;
  const ampleJoc = mida - margeX * 2;
  const altJoc   = mida - margeY * 2;

  // Pas horitzontal entre columnes (files senars)
  const pasX = ampleJoc / (TR_COLS - 1);
  // Pas vertical entre files
  const pasY = altJoc / (TR_FILES - 1);

  trCanvas.width  = mida;
  trCanvas.height = mida;
  trCanvas.style.width  = mida + 'px';
  trCanvas.style.height = mida + 'px';

  trPunts = [];
  for (let f = 0; f < TR_FILES; f++) {
    const nCols = (f % 2 === 0) ? TR_COLS : TR_COLS - 1;
    const despl = (f % 2 === 0) ? 0 : pasX / 2;
    for (let c = 0; c < nCols; c++) {
      trPunts.push({
        x:    margeX + despl + c * pasX,
        y:    margeY + f * pasY,
        fila: f,
        col:  c,
      });
    }
  }
}

function trIdPunt(fila, col) {
  // Retorna l'índex a trPunts
  let idx = 0;
  for (let f = 0; f < fila; f++) {
    idx += (f % 2 === 0) ? TR_COLS : TR_COLS - 1;
  }
  return idx + col;
}

function trClauLinia(i1, i2) {
  return Math.min(i1, i2) + '_' + Math.max(i1, i2);
}

// ── DIBUIX ────────────────────────────────────────────────────
function trDibuixar() {
  if (!trCtx) return;
  const ctx = trCtx;
  ctx.clearRect(0, 0, trCanvas.width, trCanvas.height);

  // Dibuixar triangles omplerts
  trTriangles.forEach(t => {
    const p1 = trPunts[t.p1], p2 = trPunts[t.p2], p3 = trPunts[t.p3];
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.fillStyle = t.jugador === 'jugador'
      ? 'rgba(106,171,122,.25)'
      : 'rgba(220,100,100,.25)';
    ctx.fill();
  });

  // Dibuixar línies traçades
  trLinies.forEach(clau => {
    const [i1, i2] = clau.split('_').map(Number);
    const p1 = trPunts[i1], p2 = trPunts[i2];
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = 'rgba(200,220,255,.75)';
    ctx.lineWidth   = 2.5;
    ctx.lineCap     = 'round';
    ctx.stroke();
  });

  // Dibuixar punts
  trPunts.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#a8d8b0';
    ctx.fill();
    ctx.strokeStyle = '#2d5a3d';
    ctx.lineWidth   = 1.5;
    ctx.stroke();
  });
}

// ── EVENTS ────────────────────────────────────────────────────
let trPuntInici = null;
let trPuntHover = null;

function trAfegirEvents() {
  if (!trCanvas) return;

  const getIdx = (e) => {
    const rect = trCanvas.getBoundingClientRect();
    const scaleX = trCanvas.width / rect.width;
    const scaleY = trCanvas.height / rect.height;
    const cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    const x = cx * scaleX;
    const y = cy * scaleY;
    // Trobar el punt més proper
    let minD = Infinity, minIdx = -1;
    trPunts.forEach((p, i) => {
      const d = Math.hypot(p.x - x, p.y - y);
      if (d < minD) { minD = d; minIdx = i; }
    });
    return minD < 28 ? minIdx : -1;
  };

  // Mouse
  trCanvas.addEventListener('mousedown', e => {
    if (!trActiu || trTorn !== 'jugador') return;
    const idx = getIdx(e);
    if (idx >= 0) trPuntInici = idx;
  });

  trCanvas.addEventListener('mousemove', e => {
    if (!trActiu || trTorn !== 'jugador') return;
    const idx = getIdx(e);
    trPuntHover = idx;
    trDibuixarAmbPreview(trPuntInici, idx);
  });

  trCanvas.addEventListener('mouseup', e => {
    if (!trActiu || trTorn !== 'jugador') return;
    const idx = getIdx(e);
    if (trPuntInici >= 0 && idx >= 0 && idx !== trPuntInici) {
      trIntentarLinia(trPuntInici, idx);
    }
    trPuntInici = null;
    trDibuixar();
  });

  trCanvas.addEventListener('mouseleave', () => {
    trPuntInici = null;
    trPuntHover = null;
    trDibuixar();
  });

  // Touch
  trCanvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (!trActiu || trTorn !== 'jugador') return;
    const idx = getIdx(e);
    if (idx >= 0) trPuntInici = idx;
  }, { passive: false });

  trCanvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!trActiu || trTorn !== 'jugador') return;
    const idx = getIdx(e);
    trDibuixarAmbPreview(trPuntInici, idx);
  }, { passive: false });

  trCanvas.addEventListener('touchend', e => {
    e.preventDefault();
    if (!trActiu || trTorn !== 'jugador') return;
    const touch = e.changedTouches[0];
    const rect  = trCanvas.getBoundingClientRect();
    const scaleX = trCanvas.width / rect.width;
    const scaleY = trCanvas.height / rect.height;
    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top)  * scaleY;
    let minD = Infinity, minIdx = -1;
    trPunts.forEach((p, i) => {
      const d = Math.hypot(p.x - x, p.y - y);
      if (d < minD) { minD = d; minIdx = i; }
    });
    const idx = minD < 28 ? minIdx : -1;
    if (trPuntInici >= 0 && idx >= 0 && idx !== trPuntInici) {
      trIntentarLinia(trPuntInici, idx);
    }
    trPuntInici = null;
    trDibuixar();
  }, { passive: false });
}

function trDibuixarAmbPreview(idxInici, idxFi) {
  trDibuixar();
  if (idxInici === null || idxInici < 0 || idxFi < 0 || idxInici === idxFi) return;
  const p1 = trPunts[idxInici], p2 = trPunts[idxFi];
  const valid = trEsAdjacent(idxInici, idxFi) && !trLinies.has(trClauLinia(idxInici, idxFi));
  const ctx = trCtx;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = valid ? 'rgba(106,171,122,.8)' : 'rgba(220,100,100,.5)';
  ctx.lineWidth   = 3;
  ctx.setLineDash([6, 4]);
  ctx.stroke();
  ctx.setLineDash([]);
  // Ressaltar punt inicial
  ctx.beginPath();
  ctx.arc(p1.x, p1.y, 7, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(106,171,122,.6)';
  ctx.fill();
}

// ── ADJACÈNCIA ────────────────────────────────────────────────
// En una graella triangular, dos punts són adjacents si formen
// el costat d'algun triangle possible
function trEsAdjacent(i1, i2) {
  return trGetTrianglesCompartits(i1, i2).length > 0 ||
         trSonCostatsDirectes(i1, i2);
}

function trSonCostatsDirectes(i1, i2) {
  const p1 = trPunts[i1], p2 = trPunts[i2];
  if (!p1 || !p2) return false;
  const df = Math.abs(p1.fila - p2.fila);
  const dx = Math.abs(p1.x - p2.x);
  const dy = Math.abs(p1.y - p2.y);
  const wrap = document.querySelector('.tr-canvas-wrap');
  const mida = Math.min(wrap ? (wrap.clientWidth || 340) : 340, 400);
  const pasX = (mida * 0.84) / (TR_COLS - 1);
  const pasY = (mida * 0.84) / (TR_FILES - 1);
  const tol = 4;

  // Mateixa fila: punt consecutiu horitzontal
  if (df === 0 && Math.abs(p1.col - p2.col) === 1) return true;
  // Files consecutives: diagonal
  if (df === 1 && dx < pasX + tol && dy < pasY + tol) return true;
  return false;
}

// ── TRIANGLES ─────────────────────────────────────────────────
// Genera tots els triangles possibles de la graella
function trGetTotsElsTriangles() {
  const triangles = [];
  // Per cada parella de files consecutives
  for (let f = 0; f < TR_FILES - 1; f++) {
    const nSup = (f % 2 === 0) ? TR_COLS : TR_COLS - 1;
    const nInf = (f % 2 === 0) ? TR_COLS - 1 : TR_COLS;
    // Triangles apuntant avall (base a dalt)
    for (let c = 0; c < Math.min(nSup - 1, nInf); c++) {
      const supE = trIdPunt(f, c);
      const supD = trIdPunt(f, c + 1);
      const inf  = trIdPunt(f + 1, c);
      if (supE >= 0 && supD >= 0 && inf >= 0 &&
          trPunts[supE] && trPunts[supD] && trPunts[inf]) {
        triangles.push([supE, supD, inf]);
      }
    }
    // Triangles apuntant amunt (base a baix)
    for (let c = 0; c < Math.min(nSup, nInf - 1); c++) {
      const infE = trIdPunt(f + 1, c);
      const infD = trIdPunt(f + 1, c + 1);
      const sup  = trIdPunt(f, c);
      if (infE >= 0 && infD >= 0 && sup >= 0 &&
          trPunts[infE] && trPunts[infD] && trPunts[sup]) {
        triangles.push([infE, infD, sup]);
      }
    }
  }
  return triangles;
}

// Comprova quants costats té traçats un triangle i si s'ha tancat
function trCostatsTriangle(tri) {
  const [p1, p2, p3] = tri;
  const c1 = trLinies.has(trClauLinia(p1, p2));
  const c2 = trLinies.has(trClauLinia(p2, p3));
  const c3 = trLinies.has(trClauLinia(p1, p3));
  return [c1, c2, c3].filter(Boolean).length;
}

function trGetTrianglesCompartits(i1, i2) {
  return trGetTotsElsTriangles().filter(tri =>
    tri.includes(i1) && tri.includes(i2)
  );
}

// ── ACCIÓ: TRAÇAR LÍNIA ───────────────────────────────────────
function trIntentarLinia(i1, i2) {
  if (!trEsAdjacent(i1, i2)) return false;
  const clau = trClauLinia(i1, i2);
  if (trLinies.has(clau)) return false;

  trLinies.add(clau);

  // Comprovar si es tanquen triangles
  const triTancats = trGetTotsElsTriangles().filter(tri => {
    if (!tri.includes(i1) || !tri.includes(i2)) return false;
    const [p1, p2, p3] = tri;
    return trLinies.has(trClauLinia(p1, p2)) &&
           trLinies.has(trClauLinia(p2, p3)) &&
           trLinies.has(trClauLinia(p1, p3)) &&
           !trTriangles.find(t =>
             [t.p1, t.p2, t.p3].sort().join() === [...tri].sort().join()
           );
  });

  triTancats.forEach(tri => {
    trTriangles.push({ p1: tri[0], p2: tri[1], p3: tri[2], jugador: trTorn });
  });

  return triTancats.length; // nombre de triangles tancats
}

// ── TORN DEL JUGADOR ──────────────────────────────────────────
function trJugadorTira(i1, i2) {
  const tancats = trIntentarLinia(i1, i2);
  if (tancats === false) return;

  trActualitzarMarcador();
  trDibuixar();

  if (trPartidaAcabada()) {
    trFinalitzar();
    return;
  }

  if (tancats > 0) {
    trMostrarMissatge(`🔺 +${tancats} triangle${tancats > 1 ? 's' : ''}! Continua!`);
    // Jugador continua (ha tancat triangles)
  } else {
    trMostrarMissatge('🤖 Torn de la IA…');
    trTorn = 'ia';
    trActualitzarTornUI();
    setTimeout(() => trTornIA(), 900);
  }
}

// ── TORN DE LA IA ─────────────────────────────────────────────
function trTornIA() {
  if (!trActiu) return;

  const moviment = trTriarMovimentIA();
  if (!moviment) {
    trFinalitzar();
    return;
  }

  const [i1, i2] = moviment;
  const tancats  = trIntentarLinia(i1, i2);

  trActualitzarMarcador();
  trDibuixar();

  if (trPartidaAcabada()) {
    trFinalitzar();
    return;
  }

  if (tancats > 0) {
    trMostrarMissatge(`🤖 La IA fa +${tancats} triangle${tancats > 1 ? 's' : ''}!`);
    setTimeout(() => trTornIA(), 700);
  } else {
    trTorn = 'jugador';
    trActualitzarTornUI();
    trMostrarMissatge('🔺 El teu torn!');
  }
}

function trTriarMovimentIA() {
  const disponibles = trGetLiniesDisponibles();
  if (disponibles.length === 0) return null;

  if (trDificultat === 'facil') {
    return disponibles[Math.floor(Math.random() * disponibles.length)];
  }

  // Mitjà i Difícil: prioritza línies que tanquen triangles
  const tanquen = disponibles.filter(([i1, i2]) => {
    trLinies.add(trClauLinia(i1, i2));
    const n = trGetTotsElsTriangles().filter(tri => {
      if (!tri.includes(i1) || !tri.includes(i2)) return false;
      const [p1, p2, p3] = tri;
      return trLinies.has(trClauLinia(p1, p2)) &&
             trLinies.has(trClauLinia(p2, p3)) &&
             trLinies.has(trClauLinia(p1, p3)) &&
             !trTriangles.find(t =>
               [t.p1, t.p2, t.p3].sort().join() === [...tri].sort().join()
             );
    }).length;
    trLinies.delete(trClauLinia(i1, i2));
    return n > 0;
  });

  if (tanquen.length > 0) {
    // Escull la que tanca més triangles
    return tanquen.reduce((millor, mov) => {
      trLinies.add(trClauLinia(mov[0], mov[1]));
      const nMov = trGetTotsElsTriangles().filter(tri => {
        if (!tri.includes(mov[0]) || !tri.includes(mov[1])) return false;
        const [p1,p2,p3] = tri;
        return trLinies.has(trClauLinia(p1,p2)) &&
               trLinies.has(trClauLinia(p2,p3)) &&
               trLinies.has(trClauLinia(p1,p3)) &&
               !trTriangles.find(t => [t.p1,t.p2,t.p3].sort().join() === [...tri].sort().join());
      }).length;
      trLinies.delete(trClauLinia(mov[0], mov[1]));
      trLinies.add(trClauLinia(millor[0], millor[1]));
      const nMillor = trGetTotsElsTriangles().filter(tri => {
        if (!tri.includes(millor[0]) || !tri.includes(millor[1])) return false;
        const [p1,p2,p3] = tri;
        return trLinies.has(trClauLinia(p1,p2)) &&
               trLinies.has(trClauLinia(p2,p3)) &&
               trLinies.has(trClauLinia(p1,p3)) &&
               !trTriangles.find(t => [t.p1,t.p2,t.p3].sort().join() === [...tri].sort().join());
      }).length;
      trLinies.delete(trClauLinia(millor[0], millor[1]));
      return nMov > nMillor ? mov : millor;
    });
  }

  if (trDificultat === 'dificil') {
    // Evita deixar triangles amb 2 costats al rival
    const segures = disponibles.filter(([i1, i2]) => {
      trLinies.add(trClauLinia(i1, i2));
      const deixa = trGetTotsElsTriangles().some(tri => {
        if (trTriangles.find(t => [t.p1,t.p2,t.p3].sort().join() === [...tri].sort().join())) return false;
        return trCostatsTriangle(tri) === 2;
      });
      trLinies.delete(trClauLinia(i1, i2));
      return !deixa;
    });
    const pool = segures.length > 0 ? segures : disponibles;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  return disponibles[Math.floor(Math.random() * disponibles.length)];
}

function trGetLiniesDisponibles() {
  const result = [];
  trGetTotsElsTriangles().forEach(tri => {
    for (let a = 0; a < 3; a++) {
      for (let b = a + 1; b < 3; b++) {
        const i1 = tri[a], i2 = tri[b];
        const clau = trClauLinia(i1, i2);
        if (!trLinies.has(clau)) {
          if (!result.find(([x, y]) => trClauLinia(x,y) === clau)) {
            result.push([i1, i2]);
          }
        }
      }
    }
  });
  return result;
}

// ── UTILITATS ─────────────────────────────────────────────────
function trPartidaAcabada() {
  return trGetLiniesDisponibles().length === 0;
}

function trComptarTriangles(jugador) {
  return trTriangles.filter(t => t.jugador === jugador).length;
}

function trActualitzarMarcador() {
  const elJ = document.getElementById('tr-marc-jug');
  const elI = document.getElementById('tr-marc-ia');
  if (elJ) elJ.textContent = `Tu: ${trComptarTriangles('jugador')}`;
  if (elI) elI.textContent = `IA: ${trComptarTriangles('ia')}`;
}

function trActualitzarTornUI() {
  const el = document.getElementById('tr-torn-badge');
  if (el) el.textContent = trTorn === 'jugador' ? '🔺 El teu torn' : '🤖 Torn de la IA…';
}

function trMostrarMissatge(text) {
  const el = document.getElementById('tr-missatge');
  if (el) {
    el.textContent = text;
    el.style.opacity = '1';
    clearTimeout(window._trMsgTimeout);
    window._trMsgTimeout = setTimeout(() => { el.style.opacity = '0'; }, 2500);
  }
}

// ── INTEGRAR EVENTS AMB TORN ──────────────────────────────────
// Sobreescrivim la funció d'intents per usar trJugadorTira
(function() {
  const originalAfegirEvents = trAfegirEvents;
})();

// Redefinim trIntentarLinia perquè el jugador passi per trJugadorTira
function trAfegirEventsJoc() {
  if (!trCanvas) return;

  const getIdx = (e) => {
    const rect   = trCanvas.getBoundingClientRect();
    const scaleX = trCanvas.width  / rect.width;
    const scaleY = trCanvas.height / rect.height;
    const cx = ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) * scaleX;
    const cy = ((e.touches ? e.touches[0].clientY : e.clientY) - rect.top)  * scaleY;
    let minD = Infinity, minIdx = -1;
    trPunts.forEach((p, i) => {
      const d = Math.hypot(p.x - cx, p.y - cy);
      if (d < minD) { minD = d; minIdx = i; }
    });
    return minD < 28 ? minIdx : -1;
  };

  trCanvas.addEventListener('mousedown', e => {
    if (!trActiu || trTorn !== 'jugador') return;
    const idx = getIdx(e);
    if (idx >= 0) trPuntInici = idx;
  });

  trCanvas.addEventListener('mousemove', e => {
    if (!trActiu || trTorn !== 'jugador') return;
    trDibuixarAmbPreview(trPuntInici, getIdx(e));
  });

  trCanvas.addEventListener('mouseup', e => {
    if (!trActiu || trTorn !== 'jugador') return;
    const idx = getIdx(e);
    if (trPuntInici >= 0 && idx >= 0 && idx !== trPuntInici) {
      trJugadorTira(trPuntInici, idx);
    }
    trPuntInici = null;
    trDibuixar();
  });

  trCanvas.addEventListener('mouseleave', () => {
    trPuntInici = null;
    trDibuixar();
  });

  trCanvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (!trActiu || trTorn !== 'jugador') return;
    const idx = getIdx(e);
    if (idx >= 0) trPuntInici = idx;
  }, { passive: false });

  trCanvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!trActiu || trTorn !== 'jugador') return;
    trDibuixarAmbPreview(trPuntInici, getIdx(e));
  }, { passive: false });

  trCanvas.addEventListener('touchend', e => {
    e.preventDefault();
    if (!trActiu || trTorn !== 'jugador') return;
    const touch  = e.changedTouches[0];
    const rect   = trCanvas.getBoundingClientRect();
    const scaleX = trCanvas.width  / rect.width;
    const scaleY = trCanvas.height / rect.height;
    const cx = (touch.clientX - rect.left) * scaleX;
    const cy = (touch.clientY - rect.top)  * scaleY;
    let minD = Infinity, minIdx = -1;
    trPunts.forEach((p, i) => {
      const d = Math.hypot(p.x - cx, p.y - cy);
      if (d < minD) { minD = d; minIdx = i; }
    });
    const idx = minD < 28 ? minIdx : -1;
    if (trPuntInici >= 0 && idx >= 0 && idx !== trPuntInici) {
      trJugadorTira(trPuntInici, idx);
    }
    trPuntInici = null;
    trDibuixar();
  }, { passive: false });
}

// Sobreescrivim trAfegirEvents per usar la versió correcta
function trAfegirEvents() {
  trAfegirEventsJoc();
}

// ── FINAL PARTIDA ─────────────────────────────────────────────
function trFinalitzar() {
  trActiu = false;
  const ptsJug = trComptarTriangles('jugador');
  const ptsIA  = trComptarTriangles('ia');
  const guanyat = ptsJug > ptsIA;
  const empat   = ptsJug === ptsIA;

  const mult   = TR_CONFIG[trDificultat].multiplicador;
  const punts  = guanyat ? Math.round(ptsJug * 10 * mult) : 0;

  trGuardarPartida(jugadorActiu, trDificultat, guanyat && !empat, punts);

  // Redibuixar amb tots els triangles visibles
  trDibuixar();

  const cont = document.getElementById('triangles-joc-cont');
  if (!cont) return;

  const overlay = document.createElement('div');
  overlay.className = 'pm-overlay-final';
  overlay.innerHTML = `
    <div class="pm-modal">
      <div class="pm-modal-icon">${empat ? '🤝' : guanyat ? '🏆' : '😢'}</div>
      <div class="pm-modal-titol">${empat ? 'Empat!' : guanyat ? 'Has guanyat!' : 'Ha guanyat la IA!'}</div>
      <div class="pm-modal-info">
        Tu: <strong>${ptsJug}</strong> triangles · IA: <strong>${ptsIA}</strong> triangles
      </div>
      ${guanyat && !empat ? `
        <div class="gr-punts-resum">
          <span class="gr-punts-base">${Math.round(punts/mult)} pts base</span>
          ${mult > 1 ? `<span class="gr-mult">× ${mult}</span>` : ''}
          <span class="gr-punts-total">${punts} pts</span>
        </div>` : ''}
      <div class="pm-modal-btns">
        <button class="snake-btn-start" onclick="trRepetir()">Torna a jugar 🔺</button>
        <button class="pm-btn-sortir" onclick="trSortir()">← Tornar</button>
      </div>
    </div>`;
  cont.appendChild(overlay);
}

// ── NAVEGACIÓ ─────────────────────────────────────────────────
function trRepetir() {
  trComençar();
}

function trSortir() {
  trActiu = false;
  mostraScreen('triangles-inici');
  trRenderInici();
}

// ── RÀNQUING ──────────────────────────────────────────────────
function trRenderRankingHTML() {
  const posEmoji = ['🥇','🥈','🥉'];
  const llista = JUGADORS_VALIDS.map(nom => {
    const e = trGetEstat(nom);
    return { nom, pct: trPctVictories(e), partides: e.partides };
  }).sort((a, b) => b.pct - a.pct);
  const maxPct = llista[0]?.pct || 1;

  return llista.map((r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
      <div class="ranking-pos ${i < 3 ? 'p'+(i+1) : 'other'}">${i < 3 ? posEmoji[i] : i+1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom] || ''}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div style="font-size:.7rem;color:var(--text2);margin-bottom:2px">${r.partides} partides</div>
        <div class="rank-barra-wrap">
          <div class="rank-barra" style="width:${Math.min(maxPct > 0 ? (r.pct/maxPct)*100 : 0, 100)}%"></div>
        </div>
      </div>
      <div class="rank-punts" style="align-self:center;flex-shrink:0">${r.pct}%</div>
    </div>`).join('');
}

function trPctVictories(estat) {
  if (!estat || estat.partides === 0) return 0;
  return Math.round((estat.victòries || 0) / estat.partides * 100);
}

// ── PERSISTÈNCIA ──────────────────────────────────────────────
function trGetEstat(nom) {
  try {
    const raw = localStorage.getItem(TR_STORAGE_KEY + nom);
    if (!raw) return { partides: 0, victòries: 0, puntsTotals: 0,
                       difs: { facil: null, mitja: null, dificil: null } };
    return JSON.parse(raw);
  } catch(e) {
    return { partides: 0, victòries: 0, puntsTotals: 0,
             difs: { facil: null, mitja: null, dificil: null } };
  }
}

function trGuardarPartida(nom, dif, guanyat, punts) {
  const estat = trGetEstat(nom);
  estat.partides++;
  if (guanyat) estat.victòries = (estat.victòries || 0) + 1;
  estat.puntsTotals = (estat.puntsTotals || 0) + punts;
  if (!estat.difs[dif]) estat.difs[dif] = { partides: 0, victòries: 0 };
  estat.difs[dif].partides++;
  if (guanyat) estat.difs[dif].victòries = (estat.difs[dif].victòries || 0) + 1;
  localStorage.setItem(TR_STORAGE_KEY + nom, JSON.stringify(estat));
}

function trianglesGetPuntsGlobals() {
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => {
    pts[nom] = trPctVictories(trGetEstat(nom));
  });
  return pts;
}
