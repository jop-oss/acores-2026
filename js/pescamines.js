// ══════════════════════════════════════════════════════════════
//  PESCAMINES — Açores 2026
// ══════════════════════════════════════════════════════════════

// ── CONSTANTS ─────────────────────────────────────────────────

const PM_CONFIG = {
  facil:  { files: 9,  cols: 9,  mines: 10, puntsBase: 200, label: 'Fàcil',  emoji: '🐟' },
  mitja:  { files: 16, cols: 16, mines: 40, puntsBase: 400, label: 'Mitjà',  emoji: '🐠' },
  dificil:{ files: 16, cols: 30, mines: 99, puntsBase: 800, label: 'Difícil', emoji: '🦈' },
};

// Bonus per temps (punts extra si s'acaba ràpid)
const PM_TEMPS_BONUS = { facil: 120, mitja: 300, dificil: 600 }; // segons màxims per bonus

// ── ESTAT ─────────────────────────────────────────────────────
let pmDificultat = 'facil';
let pmTauler = [];       // array pla de cel·les
let pmFiles = 0;
let pmCols = 0;
let pmMines = 0;
let pmRevelades = 0;
let pmMarcades = 0;
let pmPrimerClic = true;
let pmActiu = false;
let pmGuanyat = false;
let pmTimer = null;
let pmSegons = 0;
let pmPunts = 0;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
async function iniciarPescamines() {
  mostraScreen('pescamines-inici');
  document.getElementById('pescamines-inici-cont').innerHTML = '<div class="joc-carregant">Carregant…</div>';
  await jocFsCarregarTots(PM_COL, JUGADORS_VALIDS);
  pmRenderInici();
}

// ── PANTALLA D'INICI ──────────────────────────────────────────
function pmRenderInici() {
  const millors = pmGetMillorsJugador(jugadorActiu);
  const ranking = pmRenderRankingHTML();

  document.getElementById('pescamines-inici-cont').innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">💣</span>
          <span class="joc-titol-text">Pescamines</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">Millor: ${pmMillorTotal(millors)} pts</div>
          </div>
        </div>

        <div class="pm-dif-selector">
          ${Object.entries(PM_CONFIG).map(([key, cfg]) => `
            <button class="pm-dif-btn ${pmDificultat === key ? 'actiu' : ''}"
                    onclick="pmTriarDificultat('${key}', this)">
              <span class="pm-dif-emoji">${cfg.emoji}</span>
              <span class="pm-dif-label">${cfg.label}</span>
              <span class="pm-dif-info">${cfg.files}×${cfg.cols} · ${cfg.mines} mines</span>
              <span class="pm-dif-millor">Millor: ${millors[key] ? millors[key].punts + ' pts' : '—'}</span>
            </button>`).join('')}
        </div>

        <div class="snake-instruccions">
          <p>Descobreix totes les caselles sense tocar cap <strong>mina 💣</strong>.</p>
          <ul class="snake-controls-llista">
            <li>🖱️ <strong>Clic esquerre</strong> per revelar una casella</li>
            <li>🖱️ <strong>Clic dret</strong> (o <strong>mantén premut</strong> al mòbil) per marcar 🚩</li>
            <li>🔢 El número indica quantes mines hi ha al voltant</li>
            <li>🏁 Primer clic mai explota!</li>
          </ul>
        </div>
        <button class="snake-btn-start" onclick="pmComençar()">Comença 🚀</button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Pescamines</div>
        <div class="ranking-list-home" id="pm-ranking-list">${ranking}</div>
      </div>
    </div>`;
}

function pmTriarDificultat(key, btn) {
  pmDificultat = key;
  document.querySelectorAll('.pm-dif-btn').forEach(b => b.classList.remove('actiu'));
  btn.classList.add('actiu');
}

// ── PANTALLA DE JOC ───────────────────────────────────────────
function pmComençar() {
  mostraScreen('pescamines-joc');
  const cfg = PM_CONFIG[pmDificultat];
  pmFiles = cfg.files;
  pmCols  = cfg.cols;
  pmMines = cfg.mines;

  document.getElementById('pescamines-joc-cont').innerHTML = `
    <div class="pm-game-wrap">
      <div class="pm-topbar">
        <button class="snake-btn-back" onclick="pmSortir()">← Tornar</button>
        <div class="pm-stats">
          <div class="pm-stat-bloc">
            <span class="pm-stat-label">🚩</span>
            <span class="pm-stat-val" id="pm-mines-rest">${pmMines}</span>
          </div>
          <div class="pm-stat-bloc pm-stat-centre">
            <span class="pm-stat-val" id="pm-temps">0s</span>
          </div>
          <div class="pm-stat-bloc">
            <span class="pm-stat-label">🏆</span>
            <span class="pm-stat-val" id="pm-punts-live">0</span>
          </div>
        </div>
      </div>
      <div class="pm-tauler-cont">
        <div class="pm-tauler" id="pm-tauler"></div>
      </div>
    </div>`;

  pmInicialitzarTauler();
}

// ── TAULER ────────────────────────────────────────────────────
function pmInicialitzarTauler() {
  pmTauler = [];
  pmRevelades = 0;
  pmMarcades = 0;
  pmPrimerClic = true;
  pmActiu = true;
  pmGuanyat = false;
  pmSegons = 0;
  pmPunts = 0;
  clearInterval(pmTimer);

  // Crea cel·les buides
  for (let i = 0; i < pmFiles * pmCols; i++) {
    pmTauler.push({ mina: false, revelada: false, marcada: false, veins: 0 });
  }

  pmRenderTauler();
}

function pmIdx(f, c) { return f * pmCols + c; }

function pmPosarMines(filaPrimerClic, colPrimerClic) {
  // Zona segura al voltant del primer clic (3×3)
  const segures = new Set();
  for (let df = -1; df <= 1; df++) {
    for (let dc = -1; dc <= 1; dc++) {
      const f = filaPrimerClic + df;
      const c = colPrimerClic + dc;
      if (f >= 0 && f < pmFiles && c >= 0 && c < pmCols) {
        segures.add(pmIdx(f, c));
      }
    }
  }

  let minesPositades = 0;
  while (minesPositades < pmMines) {
    const idx = Math.floor(Math.random() * pmFiles * pmCols);
    if (!pmTauler[idx].mina && !segures.has(idx)) {
      pmTauler[idx].mina = true;
      minesPositades++;
    }
  }

  // Calcula veïns
  for (let f = 0; f < pmFiles; f++) {
    for (let c = 0; c < pmCols; c++) {
      if (!pmTauler[pmIdx(f, c)].mina) {
        pmTauler[pmIdx(f, c)].veins = pmComptarVeins(f, c);
      }
    }
  }
}

function pmComptarVeins(f, c) {
  let count = 0;
  for (let df = -1; df <= 1; df++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (df === 0 && dc === 0) continue;
      const nf = f + df, nc = c + dc;
      if (nf >= 0 && nf < pmFiles && nc >= 0 && nc < pmCols) {
        if (pmTauler[pmIdx(nf, nc)].mina) count++;
      }
    }
  }
  return count;
}

// ── RENDER DEL TAULER ─────────────────────────────────────────
function pmRenderTauler() {
  const el = document.getElementById('pm-tauler');
  if (!el) return;
  el.style.setProperty('--pm-cols', pmCols);

  el.innerHTML = pmTauler.map((cel, idx) => {
    const f = Math.floor(idx / pmCols);
    const c = idx % pmCols;
    return `<div class="pm-cel ${pmCelClasse(cel)}"
                 data-idx="${idx}"
                 oncontextmenu="pmMarcar(event,${idx}); return false;"
                 onclick="pmRevelar(${f},${c})"></div>`;
  }).join('');

  // Long-press per mòbil
  pmAfegirLongPress();
}

function pmCelClasse(cel) {
  if (cel.marcada)   return 'marcada';
  if (!cel.revelada) return 'tapada';
  if (cel.mina)      return 'mina explotada';
  if (cel.veins > 0) return `revelada n${cel.veins}`;
  return 'revelada buida';
}

function pmActualitzarCel(idx) {
  const el = document.querySelector(`[data-idx="${idx}"]`);
  if (!el) return;
  const cel = pmTauler[idx];
  el.className = `pm-cel ${pmCelClasse(cel)}`;
  if (cel.revelada && !cel.mina && cel.veins > 0) {
    el.textContent = cel.veins;
  } else {
    el.textContent = '';
  }
}

// ── LÒGICA DE JOC ────────────────────────────────────────────
function pmRevelar(f, c) {
  if (!pmActiu) return;
  const cel = pmTauler[pmIdx(f, c)];
  if (cel.revelada || cel.marcada) return;

  // Primer clic: posa mines i inicia timer
  if (pmPrimerClic) {
    pmPrimerClic = false;
    pmPosarMines(f, c);
    pmIniciarTimer();
    // Re-calcula la cel·la amb les mines reals
  }

  // Recull la cel·la actualitzada (mines ja posades)
  const celActual = pmTauler[pmIdx(f, c)];

  if (celActual.mina) {
    pmExplotar(f, c);
    return;
  }

  pmRevelarCel(f, c);
  pmActualitzarComptadors();

  if (pmRevelades === pmFiles * pmCols - pmMines) {
    pmGuanyar();
  }
}

function pmRevelarCel(f, c) {
  const idx = pmIdx(f, c);
  const cel = pmTauler[idx];
  if (cel.revelada || cel.marcada || cel.mina) return;

  cel.revelada = true;
  pmRevelades++;
  pmActualitzarCel(idx);

  // Flood fill si és buida
  if (cel.veins === 0) {
    for (let df = -1; df <= 1; df++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (df === 0 && dc === 0) continue;
        const nf = f + df, nc = c + dc;
        if (nf >= 0 && nf < pmFiles && nc >= 0 && nc < pmCols) {
          pmRevelarCel(nf, nc);
        }
      }
    }
  }
}

function pmMarcar(e, idx) {
  e.preventDefault();
  if (!pmActiu) return;
  const cel = pmTauler[idx];
  if (cel.revelada) return;

  cel.marcada = !cel.marcada;
  pmMarcades += cel.marcada ? 1 : -1;
  pmActualitzarCel(idx);
  pmActualitzarComptadors();
}

function pmExplotar(fClic, cClic) {
  pmActiu = false;
  clearInterval(pmTimer);

  // Mostra totes les mines
  pmTauler.forEach((cel, idx) => {
    if (cel.mina) {
      cel.revelada = true;
      const el = document.querySelector(`[data-idx="${idx}"]`);
      if (el) {
        const f = Math.floor(idx / pmCols);
        const c = idx % pmCols;
        el.className = `pm-cel mina${(f === fClic && c === cClic) ? ' explotada' : ''}`;
        el.textContent = '💣';
      }
    }
    // Marca incorrectes
    if (cel.marcada && !cel.mina) {
      const el = document.querySelector(`[data-idx="${idx}"]`);
      if (el) { el.className = 'pm-cel marcada-error'; el.textContent = '❌'; }
    }
  });

  setTimeout(() => {
    pmMostrarModal(false);
  }, 600);
}

function pmGuanyar() {
  pmActiu = false;
  clearInterval(pmTimer);
  pmGuanyat = true;

  // Marca totes les mines no marcades
  pmTauler.forEach((cel, idx) => {
    if (cel.mina && !cel.marcada) {
      const el = document.querySelector(`[data-idx="${idx}"]`);
      if (el) { el.className = 'pm-cel marcada'; el.textContent = '🚩'; }
    }
  });

  // Calcula punts
  const cfg = PM_CONFIG[pmDificultat];
  const tempsBonus = Math.max(0, PM_TEMPS_BONUS[pmDificultat] - pmSegons);
  const pctBonus = tempsBonus / PM_TEMPS_BONUS[pmDificultat];
  pmPunts = Math.round(cfg.puntsBase + cfg.puntsBase * pctBonus * 0.5);

  // Guarda
  pmGuardarEstat(jugadorActiu, pmDificultat, pmPunts, pmSegons);

  setTimeout(() => {
    pmMostrarModal(true);
  }, 400);
}

function pmMostrarModal(guanyat) {
  const cfg = PM_CONFIG[pmDificultat];
  const millors = pmGetMillorsJugador(jugadorActiu);
  const esRecord = guanyat && (!millors[pmDificultat] || pmPunts > millors[pmDificultat].punts);

  const wrap = document.getElementById('pescamines-joc-cont');
  const overlay = document.createElement('div');
  overlay.className = 'pm-overlay-final';
  overlay.innerHTML = `
    <div class="pm-modal">
      <div class="pm-modal-icon">${guanyat ? (esRecord ? '🏆' : '🎉') : '💥'}</div>
      <div class="pm-modal-titol">${guanyat ? (esRecord ? 'Nou rècord!' : 'Has guanyat!') : 'Has explotat!'}</div>
      ${guanyat ? `
        <div class="pm-modal-info">${cfg.label} · ${pmFormatTemps(pmSegons)} · <strong>${pmPunts} pts</strong></div>
        ${esRecord ? '<div class="pm-modal-record">🌟 Millor puntuació a '+ cfg.label +'!</div>' : ''}
      ` : `
        <div class="pm-modal-info">${cfg.label} · ${pmFormatTemps(pmSegons)}</div>
      `}
      <div class="pm-modal-btns">
        <button class="snake-btn-start" onclick="pmRepetir()">Torna a jugar 🔄</button>
        <button class="pm-btn-sortir" onclick="pmSortir()">← Tornar</button>
      </div>
    </div>`;
  wrap.appendChild(overlay);
}

// ── TIMER ─────────────────────────────────────────────────────
function pmIniciarTimer() {
  pmSegons = 0;
  clearInterval(pmTimer);
  pmTimer = setInterval(() => {
    pmSegons++;
    const el = document.getElementById('pm-temps');
    if (el) el.textContent = pmFormatTemps(pmSegons);
  }, 1000);
}

function pmFormatTemps(s) {
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m${s % 60}s`;
}

function pmActualitzarComptadors() {
  const elMines = document.getElementById('pm-mines-rest');
  const elPunts = document.getElementById('pm-punts-live');
  if (elMines) elMines.textContent = pmMines - pmMarcades;
  if (elPunts) elPunts.textContent = pmPunts;
}

// ── LONG PRESS (mòbil) ────────────────────────────────────────
function pmAfegirLongPress() {
  const tauler = document.getElementById('pm-tauler');
  if (!tauler) return;
  let pressTimer = null;
  let pressIdx = null;

  tauler.addEventListener('touchstart', (e) => {
    const cel = e.target.closest('.pm-cel');
    if (!cel) return;
    e.preventDefault();
    pressIdx = parseInt(cel.dataset.idx);
    pressTimer = setTimeout(() => {
      pmMarcar(e, pressIdx);
      pressTimer = null;
    }, 400);
  }, { passive: false });

  tauler.addEventListener('touchend', () => {
    if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
  });

  tauler.addEventListener('touchmove', () => {
    if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
  }, { passive: true });
}

// ── NAVEGACIÓ ────────────────────────────────────────────────
function pmRepetir() {
  clearInterval(pmTimer);
  pmComençar();
}

function pmSortir() {
  clearInterval(pmTimer);
  pmActiu = false;
  mostraScreen('pescamines-inici');
  pmRenderInici();
}

// ── RÀNQUING ──────────────────────────────────────────────────
function pmRenderRankingHTML() {
  const llista = JUGADORS_VALIDS.map(nom => ({
    nom,
    punts: pmMillorTotal(pmGetMillorsJugador(nom)),
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

function pmMillorTotal(millors) {
  return Object.values(millors).reduce((sum, d) => sum + (d ? d.punts : 0), 0);
}

// ── PERSISTÈNCIA ─────────────────────────────────────────────
const PM_COL = 'pescamines_punts';

function pmGetMillorsJugador(nom) {
  const d = jocFsCacheGet(PM_COL, nom);
  return d || { facil: null, mitja: null, dificil: null };
}

function pmGuardarEstat(nom, dif, punts, temps) {
  const millors = pmGetMillorsJugador(nom);
  if (!millors[dif] || punts > millors[dif].punts) {
    millors[dif] = { punts, temps };
  }
  jocFsDesar(PM_COL, nom, millors);
}

// Funció global per al rànquing de jocs.js
async function pescaminesGetPuntsGlobals() {
  const dades = await jocFsCarregarTots(PM_COL, JUGADORS_VALIDS);
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => {
    pts[nom] = pmMillorTotal(dades[nom] || { facil: null, mitja: null, dificil: null });
  });
  return pts;
}
