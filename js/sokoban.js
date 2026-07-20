// ══════════════════════════════════════════════════════════════
//  SOKOBAN AÇORES — Motor del joc
// ══════════════════════════════════════════════════════════════

const SK_STORAGE_KEY = 'sokoban_estat_';

// ── CONSTANTS VISUALS ─────────────────────────────────────────
const SK_CELL = 52; // mida base cel·la (s'escala)

// Caràcters del mapa
const SK_CH = {
  BUIT:    ' ',
  PARET:   '#',
  JUGADOR: '@',
  CAIXA:   '$',
  OBJECTIU:'.',
  CAIXA_OK:'*',
  JUG_OK:  '+',
};

// Colors temàtics
const SK_COLORS = {
  terra:      '#1a3020',
  terraAlt:   '#1e3824',
  paret:      '#2d1810',
  paretBord:  '#4a2a18',
  objectiu:   '#6aab7a',
  caixa:      '#8B4513',
  caixaBord:  '#c47a3a',
  caixaOK:    '#2d5a3d',
  caixaOKBord:'#6aab7a',
  jugador:    '#63b3ed',
  jugOK:      '#63b3ed',
};

// ── ESTAT ─────────────────────────────────────────────────────
let skNivellActual = 0;   // índex 0-based
let skTauler       = [];  // array 2D de caràcters (estat actual)
let skJugador      = { x: 0, y: 0 };
let skMoviments    = 0;
let skActiu        = false;
let skAnimant      = false;

// Historial per desfer
let skHistorial    = []; // [{tauler, jugador, moviments}]

// Canvas
let skCanvas  = null;
let skCtx     = null;
let skEscala  = 1;
let skCellPx  = SK_CELL;
let skAnimId  = null;

// Touch
let skTouchInici = null;

// Animació de moviment
let skAnim = null; // { jugadorInici, jugadorFi, caixaInici, caixaFi, progres }

// ── PUNT D'ENTRADA ────────────────────────────────────────────
async function iniciarSokoban() {
  mostraScreen('sokoban-inici');
  document.getElementById('sokoban-inici-cont').innerHTML = '<div class="joc-carregant">Carregant…</div>';
  await jocFsCarregarTots(SK_COL, JUGADORS_VALIDS);
  skRenderInici();
}

// ── PANTALLA D'INICI ─────────────────────────────────────────
function skRenderInici() {
  const progres = skGetProgres(jugadorActiu);
  const ranking = skRenderRankingHTML();

  document.getElementById('sokoban-inici-cont').innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">🪨</span>
          <span class="joc-titol-text">Sokoban Açores</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">${progres.completats}/${SK_NIVELLS.length} nivells · ${progres.totalMoviments} moviments</div>
          </div>
        </div>
        <div class="snake-instruccions">
          <p>Empeny les roques volcàniques fins a les marques de flors!</p>
          <ul class="snake-controls-llista">
            <li>👆 <strong>Llisca</strong> per moure el personatge</li>
            <li>⌨️ <strong>Cursors / WASD</strong> per escriptori</li>
            <li>↩️ <strong>U / Z</strong> per desfer l'últim moviment</li>
            <li>🔄 <strong>R</strong> per reiniciar el nivell</li>
            <li>🌺 Col·loca totes les roques sobre les flors per passar</li>
          </ul>
        </div>
        <div class="sk-selector-nivells" id="sk-selector-nivells">
          ${skRenderSelectorNivells(progres)}
        </div>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Sokoban</div>
        <div class="ranking-list-home">${ranking}</div>
      </div>
    </div>`;
}

function skRenderSelectorNivells(progres) {
  return `
    <div class="sk-nivells-grid">
      ${SK_NIVELLS.map((niv, i) => {
        const estat = progres.nivells[i];
        const completat = estat?.completat;
        const moviments = estat?.moviments;
        const cls = completat ? 'completat' : (i === 0 || progres.nivells[i-1]?.completat ? 'disponible' : 'bloquejat');
        return `<button class="sk-niv-btn ${cls}" onclick="skIniciarNivell(${i})" ${cls === 'bloquejat' ? 'disabled' : ''}>
          <span class="sk-niv-num">${i + 1}</span>
          ${completat ? `<span class="sk-niv-check">✓</span>` : ''}
          ${moviments ? `<span class="sk-niv-mov">${moviments}</span>` : ''}
        </button>`;
      }).join('')}
    </div>
    <button class="snake-btn-start" onclick="skIniciarNivell(${skProperNivell(progres)})">
      ${skProperNivell(progres) === 0 ? 'Comença 🌋' : `Continua (Niv. ${skProperNivell(progres) + 1}) →`}
    </button>`;
}

function skProperNivell(progres) {
  for (let i = 0; i < SK_NIVELLS.length; i++) {
    if (!progres.nivells[i]?.completat) return i;
  }
  return 0;
}

// ── INICIAR NIVELL ────────────────────────────────────────────
function skIniciarNivell(idx) {
  skNivellActual = idx;
  mostraScreen('sokoban-joc');

  document.getElementById('sokoban-joc-cont').innerHTML = `
    <div class="sk-game-wrap">
      <div class="pm-topbar">
        <button class="snake-btn-back" onclick="skSortir()">← Tornar</button>
        <div class="pm-stats">
          <div class="pm-stat-bloc">
            <span class="pm-stat-label">🌋</span>
            <span class="pm-stat-val" id="sk-nivell-num">${idx + 1}/${SK_NIVELLS.length}</span>
          </div>
          <div class="pm-stat-bloc">
            <span class="pm-stat-label">👣</span>
            <span class="pm-stat-val" id="sk-moviments">0</span>
          </div>
          <div class="pm-stat-bloc">
            <span class="pm-stat-label">🏆</span>
            <span class="pm-stat-val" id="sk-millor">—</span>
          </div>
        </div>
      </div>
      <div class="sk-nom-nivell" id="sk-nom-nivell">${SK_NIVELLS[idx].nom}</div>
      <div class="sk-canvas-wrap" id="sk-canvas-wrap">
        <canvas id="sk-canvas"></canvas>
      </div>
      <div class="sk-botons-accio">
        <button class="mj-btn-accio" onclick="skDesfer()">↩️ Desfer <kbd>U</kbd></button>
        <button class="mj-btn-accio" onclick="skReiniciarNivell()">🔄 Reinicia <kbd>R</kbd></button>
        <button class="mj-btn-accio" id="sk-btn-prev" onclick="skNivellAnterior()" ${idx === 0 ? 'disabled' : ''}>‹ Anterior</button>
        <button class="mj-btn-accio" id="sk-btn-next" onclick="skNivellSeguent()" ${idx === SK_NIVELLS.length - 1 ? 'disabled' : ''}>Següent ›</button>
      </div>
    </div>`;

  skCanvas = document.getElementById('sk-canvas');
  skCtx    = skCanvas.getContext('2d');

  skCarregarNivell(idx);
  skAjustarCanvas();
  skAfegirControls();
  skActiu = true;

  // Mostra millor marcat
  const progres = skGetProgres(jugadorActiu);
  const millor = progres.nivells[idx]?.moviments;
  const elMillor = document.getElementById('sk-millor');
  if (elMillor) elMillor.textContent = millor ? millor + '👣' : '—';

  skDibuixar();
}

// ── CARREGAR NIVELL ───────────────────────────────────────────
function skCarregarNivell(idx) {
  const nivell = SK_NIVELLS[idx];
  skTauler     = nivell.mapa.map(fila => fila.split(''));
  skMoviments  = 0;
  skHistorial  = [];
  skAnim       = null;

  // Troba jugador
  for (let y = 0; y < skTauler.length; y++) {
    for (let x = 0; x < skTauler[y].length; x++) {
      const ch = skTauler[y][x];
      if (ch === SK_CH.JUGADOR || ch === SK_CH.JUG_OK) {
        skJugador = { x, y };
      }
    }
  }

  skActualitzarUI();
}

function skAjustarCanvas() {
  const wrap = document.getElementById('sk-canvas-wrap');
  if (!wrap || !skTauler.length) return;

  const maxCols = Math.max(...skTauler.map(f => f.length));
  const maxRows = skTauler.length;
  const maxW = Math.min(wrap.clientWidth, window.innerHeight * 0.55);
  const maxH = Math.min(window.innerHeight * 0.55, 480);

  skCellPx = Math.floor(Math.min(maxW / maxCols, maxH / maxRows));
  skCellPx = Math.max(28, Math.min(skCellPx, 56));

  skCanvas.width  = maxCols * skCellPx;
  skCanvas.height = maxRows * skCellPx;
}

// ── LÒGICA DE MOVIMENT ────────────────────────────────────────
function skMoure(dx, dy) {
  if (!skActiu || skAnimant) return;

  const { x: jx, y: jy } = skJugador;
  const nx = jx + dx;
  const ny = jy + dy;

  if (!skEsDinsLímits(nx, ny)) return;

  const celDest = skTauler[ny][nx];

  // Paret → no es pot moure
  if (celDest === SK_CH.PARET) return;

  let mouentCaixa = false;
  let caixaDest   = null;

  // Hi ha una caixa → intenta empènyer-la
  if (celDest === SK_CH.CAIXA || celDest === SK_CH.CAIXA_OK) {
    const cx = nx + dx;
    const cy = ny + dy;
    if (!skEsDinsLímits(cx, cy)) return;
    const celCaixa = skTauler[cy][cx];
    if (celCaixa === SK_CH.PARET || celCaixa === SK_CH.CAIXA || celCaixa === SK_CH.CAIXA_OK) return;
    mouentCaixa = true;
    caixaDest   = { x: cx, y: cy };
  }

  // Desa estat per desfer
  skHistorial.push({
    tauler:    skTauler.map(f => [...f]),
    jugador:   { ...skJugador },
    moviments: skMoviments,
  });
  if (skHistorial.length > 200) skHistorial.shift();

  // Aplica moviment
  // Allibera cel·la del jugador
  skTauler[jy][jx] = (skTauler[jy][jx] === SK_CH.JUG_OK) ? SK_CH.OBJECTIU : SK_CH.BUIT;

  if (mouentCaixa) {
    // Allibera cel·la de la caixa
    skTauler[ny][nx] = (celDest === SK_CH.CAIXA_OK) ? SK_CH.OBJECTIU : SK_CH.BUIT;
    // Col·loca caixa nova posició
    const { x: cx, y: cy } = caixaDest;
    skTauler[cy][cx] = (skTauler[cy][cx] === SK_CH.OBJECTIU) ? SK_CH.CAIXA_OK : SK_CH.CAIXA;
  }

  // Col·loca jugador
  skTauler[ny][nx] = (skTauler[ny][nx] === SK_CH.OBJECTIU) ? SK_CH.JUG_OK : SK_CH.JUGADOR;
  skJugador = { x: nx, y: ny };
  skMoviments++;
  skActualitzarUI();
  skDibuixar();

  // Comprova victòria
  if (skEsComplet()) {
    setTimeout(skNivellSuperat, 300);
  }
}

function skEsDinsLímits(x, y) {
  return y >= 0 && y < skTauler.length && x >= 0 && x < (skTauler[y]?.length || 0);
}

function skEsComplet() {
  for (const fila of skTauler) {
    for (const cel of fila) {
      if (cel === SK_CH.CAIXA) return false; // caixa fora d'objectiu
    }
  }
  return true;
}

// ── DESFER ────────────────────────────────────────────────────
function skDesfer() {
  if (!skHistorial.length || !skActiu) return;
  const estat = skHistorial.pop();
  skTauler    = estat.tauler;
  skJugador   = estat.jugador;
  skMoviments = estat.moviments;
  skActualitzarUI();
  skDibuixar();
}

// ── REINICIAR ─────────────────────────────────────────────────
function skReiniciarNivell() {
  skCarregarNivell(skNivellActual);
  skDibuixar();
}

// ── NIVELL SUPERAT ────────────────────────────────────────────
function skNivellSuperat() {
  skActiu = false;

  // Guarda progrés
  const progres = skGetProgres(jugadorActiu);
  const anterior = progres.nivells[skNivellActual]?.moviments;
  const esRecord = !anterior || skMoviments < anterior;
  progres.nivells[skNivellActual] = {
    completat: true,
    moviments: esRecord ? skMoviments : anterior,
  };
  progres.completats = progres.nivells.filter(n => n?.completat).length;
  progres.totalMoviments = progres.nivells.reduce((s, n) => s + (n?.moviments || 0), 0);
  skGuardarProgres(jugadorActiu, progres);

  const ultimNivell = skNivellActual >= SK_NIVELLS.length - 1;

  const wrap = document.getElementById('sokoban-joc-cont');
  const ov   = document.createElement('div');
  ov.className = 'pm-overlay-final';
  ov.innerHTML = `
    <div class="pm-modal">
      <div class="pm-modal-icon">${ultimNivell ? '🏆' : '🌺'}</div>
      <div class="pm-modal-titol">${ultimNivell ? 'Joc completat!' : 'Nivell superat!'}</div>
      <div class="pm-modal-info">
        ${SK_NIVELLS[skNivellActual].nom}<br>
        ${skMoviments} moviments
        ${esRecord ? '<br><span style="color:#ecc94b">⭐ Nou rècord!</span>' : `<br><span style="color:var(--text2)">Millor: ${anterior} moviments</span>`}
      </div>
      <div class="pm-modal-btns">
        ${!ultimNivell ? `<button class="snake-btn-start" onclick="document.querySelector('.pm-overlay-final').remove(); skIniciarNivell(${skNivellActual + 1})">Nivell ${skNivellActual + 2} →</button>` : ''}
        <button class="mj-btn-accio" onclick="document.querySelector('.pm-overlay-final').remove(); skReiniciarNivellFresh()">🔄 Repetir</button>
        <button class="pm-btn-sortir" onclick="skSortir()">← Tornar</button>
      </div>
    </div>`;
  wrap.appendChild(ov);
}

function skReiniciarNivellFresh() {
  skActiu = true;
  skCarregarNivell(skNivellActual);
  skDibuixar();
}

// ── NAVEGACIÓ ENTRE NIVELLS ───────────────────────────────────
function skNivellAnterior() {
  if (skNivellActual > 0) skIniciarNivell(skNivellActual - 1);
}

function skNivellSeguent() {
  if (skNivellActual < SK_NIVELLS.length - 1) skIniciarNivell(skNivellActual + 1);
}

function skSortir() {
  skActiu = false;
  skEliminarControls();
  mostraScreen('sokoban-inici');
  skRenderInici();
}

// ── DIBUIX ────────────────────────────────────────────────────
function skDibuixar() {
  if (!skCtx || !skTauler.length) return;
  const ctx  = skCtx;
  const cs   = skCellPx;
  const W    = skCanvas.width;
  const H    = skCanvas.height;

  ctx.clearRect(0, 0, W, H);

  for (let y = 0; y < skTauler.length; y++) {
    for (let x = 0; x < skTauler[y].length; x++) {
      const ch  = skTauler[y][x];
      const px  = x * cs;
      const py  = y * cs;

      skDibuixarCel(ctx, ch, px, py, cs);
    }
  }
}

function skDibuixarCel(ctx, ch, px, py, cs) {
  const pad = 1;

  // Terra base
  const esParet = ch === SK_CH.PARET;
  const esBuit  = ch === SK_CH.BUIT || ch === SK_CH.JUGADOR || ch === SK_CH.OBJECTIU ||
                  ch === SK_CH.CAIXA || ch === SK_CH.CAIXA_OK || ch === SK_CH.JUG_OK;

  if (esParet) {
    // Roca basàltica — gradient fosc
    const grad = ctx.createLinearGradient(px, py, px + cs, py + cs);
    grad.addColorStop(0, '#3a1a0a');
    grad.addColorStop(1, '#1a0a04');
    ctx.fillStyle = grad;
    ctx.fillRect(px, py, cs, cs);
    // Textura de pedra
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(px + 3, py + 3, cs - 6, 3);
    ctx.fillRect(px + cs - 6, py + 8, 3, cs - 12);
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(px, py + cs - 3, cs, 3);
    ctx.fillRect(px + cs - 3, py, 3, cs);
    return;
  }

  if (ch === ' ' || ch === undefined) return; // fora del mapa (espai buit fora del nivell)

  // Terra
  const colorTerra = ((Math.floor(px / cs) + Math.floor(py / cs)) % 2 === 0)
    ? SK_COLORS.terra : SK_COLORS.terraAlt;
  ctx.fillStyle = colorTerra;
  ctx.fillRect(px, py, cs, cs);

  // Objectiu (marca de flor)
  if (ch === SK_CH.OBJECTIU || ch === SK_CH.JUG_OK) {
    skDibuixarObjectiu(ctx, px, py, cs);
  }

  // Caixa
  if (ch === SK_CH.CAIXA || ch === SK_CH.CAIXA_OK) {
    const ok = ch === SK_CH.CAIXA_OK;
    skDibuixarCaixa(ctx, px, py, cs, ok);
  }

  // Jugador
  if (ch === SK_CH.JUGADOR || ch === SK_CH.JUG_OK) {
    skDibuixarJugador(ctx, px, py, cs);
  }
}

function skDibuixarObjectiu(ctx, px, py, cs) {
  const cx = px + cs / 2;
  const cy = py + cs / 2;
  const r  = cs * 0.28;

  // Cercle de flor
  ctx.strokeStyle = SK_COLORS.objectiu;
  ctx.lineWidth   = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // Pètals
  ctx.fillStyle = SK_COLORS.objectiu + '55';
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(angle) * r * 0.7, cy + Math.sin(angle) * r * 0.7, r * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = SK_COLORS.objectiu + '88';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.25, 0, Math.PI * 2);
  ctx.fill();
}

function skDibuixarCaixa(ctx, px, py, cs, ok) {
  const pad = 3;
  const bx  = px + pad;
  const by  = py + pad;
  const bs  = cs - pad * 2;

  // Cos principal
  const grad = ctx.createLinearGradient(bx, by, bx + bs, by + bs);
  if (ok) {
    grad.addColorStop(0, '#3a7a4a');
    grad.addColorStop(1, '#1e4a2a');
  } else {
    grad.addColorStop(0, '#a0522d');
    grad.addColorStop(1, '#6b3318');
  }
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(bx, by, bs, bs, 4);
  ctx.fill();

  // Vora
  ctx.strokeStyle = ok ? SK_COLORS.caixaOKBord : SK_COLORS.caixaBord;
  ctx.lineWidth   = 2;
  ctx.beginPath();
  ctx.roundRect(bx, by, bs, bs, 4);
  ctx.stroke();

  // Detall interior — creu de roca
  ctx.strokeStyle = ok ? 'rgba(106,171,122,0.4)' : 'rgba(196,122,58,0.35)';
  ctx.lineWidth   = 1.5;
  const inner = bs * 0.25;
  ctx.beginPath();
  ctx.moveTo(bx + inner, by + bs / 2);
  ctx.lineTo(bx + bs - inner, by + bs / 2);
  ctx.moveTo(bx + bs / 2, by + inner);
  ctx.lineTo(bx + bs / 2, by + bs - inner);
  ctx.stroke();

  // Emoji roca si hi cap
  if (cs >= 36) {
    ctx.font = `${Math.round(cs * 0.45)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor  = 'transparent';
    ctx.fillText(ok ? '🌺' : '🪨', px + cs / 2, py + cs / 2 + 1);
  }
}

function skDibuixarJugador(ctx, px, py, cs) {
  const cx = px + cs / 2;
  const cy = py + cs / 2;

  // Ombra
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + cs * 0.3, cs * 0.25, cs * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cos
  ctx.fillStyle = SK_COLORS.jugador;
  ctx.beginPath();
  ctx.arc(cx, cy + cs * 0.05, cs * 0.28, 0, Math.PI * 2);
  ctx.fill();

  // Cap
  ctx.fillStyle = '#fbd38d';
  ctx.beginPath();
  ctx.arc(cx, cy - cs * 0.18, cs * 0.18, 0, Math.PI * 2);
  ctx.fill();

  // Emoji pagès
  if (cs >= 40) {
    ctx.font = `${Math.round(cs * 0.65)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor  = 'transparent';
    ctx.fillText('🧑‍🌾', cx, cy + 2);
  }
}

// ── CONTROLS ─────────────────────────────────────────────────
function skAfegirControls() {
  document.addEventListener('keydown', skOnKey);
  const wrap = document.getElementById('sk-canvas-wrap');
  if (wrap) {
    wrap.addEventListener('touchstart', skOnTouchStart, { passive: true });
    wrap.addEventListener('touchend',   skOnTouchEnd,   { passive: true });
  }
  window.addEventListener('resize', skOnResize);
}

function skEliminarControls() {
  document.removeEventListener('keydown', skOnKey);
  window.removeEventListener('resize', skOnResize);
}

function skOnKey(e) {
  if (!skActiu) return;
  switch (e.key) {
    case 'ArrowUp':    case 'w': case 'W': e.preventDefault(); skMoure(0, -1); break;
    case 'ArrowDown':  case 's': case 'S': e.preventDefault(); skMoure(0,  1); break;
    case 'ArrowLeft':  case 'a': case 'A': e.preventDefault(); skMoure(-1, 0); break;
    case 'ArrowRight': case 'd': case 'D': e.preventDefault(); skMoure( 1, 0); break;
    case 'u': case 'U': case 'z': case 'Z': skDesfer(); break;
    case 'r': case 'R': skReiniciarNivell(); break;
    case 'ArrowLeft':
      if (e.ctrlKey || e.metaKey) { e.preventDefault(); skNivellAnterior(); }
      break;
    case 'ArrowRight':
      if (e.ctrlKey || e.metaKey) { e.preventDefault(); skNivellSeguent(); }
      break;
  }
}

function skOnTouchStart(e) {
  const t = e.touches[0];
  skTouchInici = { x: t.clientX, y: t.clientY };
}

function skOnTouchEnd(e) {
  if (!skTouchInici) return;
  const t  = e.changedTouches[0];
  const dx = t.clientX - skTouchInici.x;
  const dy = t.clientY - skTouchInici.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  skTouchInici = null;
  if (dist < 10) return;
  if (Math.abs(dx) > Math.abs(dy)) {
    skMoure(dx > 0 ? 1 : -1, 0);
  } else {
    skMoure(0, dy > 0 ? 1 : -1);
  }
}

function skOnResize() {
  skAjustarCanvas();
  skDibuixar();
}

// ── UI ────────────────────────────────────────────────────────
function skActualitzarUI() {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('sk-moviments', skMoviments);
}

// ── RÀNQUING ─────────────────────────────────────────────────
function skRenderRankingHTML() {
  const llista = JUGADORS_VALIDS.map(nom => {
    const p = skGetProgres(nom);
    return { nom, completats: p.completats, moviments: p.totalMoviments };
  }).sort((a, b) => b.completats - a.completats || a.moviments - b.moviments);

  const posEmoji = ['🥇','🥈','🥉'];
  const maxComp  = llista[0]?.completats || 1;

  return llista.map((r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
      <div class="ranking-pos ${i < 3 ? 'p' + (i + 1) : 'other'}">${i < 3 ? posEmoji[i] : i + 1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom] || ''}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div class="rank-barra-wrap"><div class="rank-barra" style="width:${Math.min((r.completats / SK_NIVELLS.length) * 100, 100)}%"></div></div>
      </div>
      <div class="rank-punts" style="align-self:center;flex-shrink:0">${r.completats}/${SK_NIVELLS.length}</div>
    </div>`).join('');
}

// ── PERSISTÈNCIA ─────────────────────────────────────────────
const SK_COL = 'sokoban_punts';

function skGetProgres(nom) {
  const d = jocFsCacheGet(SK_COL, nom);
  return d || { completats: 0, totalMoviments: 0, nivells: [] };
}

function skGuardarProgres(nom, progres) {
  jocFsDesar(SK_COL, nom, progres);
}

// Funció global per al rànquing de jocs.js
async function sokobanGetPuntsGlobals() {
  const dades = await jocFsCarregarTots(SK_COL, JUGADORS_VALIDS);
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => {
    pts[nom] = (dades[nom] && dades[nom].completats) || 0;
  });
  return pts;
}
