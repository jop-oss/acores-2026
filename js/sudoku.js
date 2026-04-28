// ══════════════════════════════════════════════════════════════
//  SUDOKU AÇORES — Joc individual amb Firebase
// ══════════════════════════════════════════════════════════════

// ── CONSTANTS ─────────────────────────────────────────────────
const SUDOKU_COL       = 'sudoku_partides';
const SUDOKU_ASSIGNATS = { facil: 5, mitja: 4, dificil: 3 };
const SUDOKU_PUNTS     = { facil: 50, mitja: 100, dificil: 200 };
const SUDOKU_MAX_PISTES = { facil: 1, mitja: 3, dificil: 5 };
const SUDOKU_COST_PISTA = { facil: 5, mitja: 10, dificil: 15 };
const SUDOKU_MAX_REINTENTS = { facil: 1, mitja: 2, dificil: 3 };
const SUDOKU_COST_REINTENT = { facil: 10, mitja: 15, dificil: 20 };
const SUDOKU_DIF_LABEL = { facil: 'Fàcil', mitja: 'Mitjà', dificil: 'Difícil' };
const SUDOKU_DIF_EMOJI = { facil: '🟢', mitja: '🟡', dificil: '🔴' };

// ── ESTAT LOCAL ────────────────────────────────────────────────
let sudokuPartida      = null;  // document Firebase del jugador
let sudokuActual       = null;  // { id, dif, puzzle, solution }
let sudokuEstatActual  = null;  // estat d'aquest sudoku concret
let sudokuGrid         = null;  // array 9x9 de valors actuals (0=buit)
let sudokuCellaSelec   = null;  // { row, col }

// ── FIREBASE ──────────────────────────────────────────────────
function sudokuGetDb() {
  if (!firebase.apps.length) firebase.initializeApp(CONFIG.FIREBASE);
  return firebase.firestore();
}

// ── PUNT D'ENTRADA ────────────────────────────────────────────
async function iniciarSudoku() {
  if (!jugadorActiu) { mostraScreen('joc-selector'); return; }
  mostraScreen('sudoku-selector');
  await sudokuCarregarOCrearPartida();
  sudokuRenderSelector();
}

// ── CARREGA O CREA PARTIDA ────────────────────────────────────
async function sudokuCarregarOCrearPartida() {
  const db  = sudokuGetDb();
  const ref = db.collection(SUDOKU_COL).doc(jugadorActiu);
  const snap = await ref.get();

  if (snap.exists) {
    sudokuPartida = snap.data();
    return;
  }

  // Primera vegada: assigna sudokus aleatòriament
  const assignats = [];
  for (const [dif, count] of Object.entries(SUDOKU_ASSIGNATS)) {
    const pool = SUDOKU_PUZZLES.filter(s => s.dif === dif);
    const seleccionats = sudokuBarrejar(pool).slice(0, count);
    seleccionats.forEach(s => {
      assignats.push({
        puzzleId: s.id,
        dif:      s.dif,
        estat:    'pendent',  // 'pendent' | 'completat' | 'fallit'
        punts:    0,
        pistesUsades:   0,
        reintentsUsats: 0,
        gridActual:     null,  // estat tauler guardat
      });
    });
  }

  sudokuPartida = { jugador: jugadorActiu, sudokus: assignats };
  await ref.set(sudokuPartida);
}

// ── MINI TAULER SVG ───────────────────────────────────────────
function sudokuMiniTauler(puzzle) {
  const size = 108;
  const cell = size / 9;
  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;

  // Fons
  svg += `<rect width="${size}" height="${size}" fill="var(--bg)" rx="4"/>`;

  // Números
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = puzzle[r][c];
      if (val) {
        const x = c * cell + cell / 2;
        const y = r * cell + cell / 2 + 3.5;
        svg += `<text x="${x}" y="${y}" text-anchor="middle" font-size="8" font-family="monospace" font-weight="700" fill="var(--text)" opacity="0.85">${val}</text>`;
      }
    }
  }

  // Línies fines (separadors de cel·la)
  for (let i = 1; i < 9; i++) {
    const pos = i * cell;
    const thick = i % 3 === 0;
    const stroke = thick ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)';
    const sw = thick ? 1.2 : 0.5;
    svg += `<line x1="${pos}" y1="0" x2="${pos}" y2="${size}" stroke="${stroke}" stroke-width="${sw}"/>`;
    svg += `<line x1="0" y1="${pos}" x2="${size}" y2="${pos}" stroke="${stroke}" stroke-width="${sw}"/>`;
  }

  // Vora exterior
  svg += `<rect width="${size}" height="${size}" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" rx="4"/>`;

  svg += '</svg>';
  return svg;
}

// ── PANTALLA SELECTOR ─────────────────────────────────────────
function sudokuRenderSelector() {
  const cont = document.getElementById('sudoku-selector-cont');
  if (!cont || !sudokuPartida) return;

  const ESTAT_LABEL = {
    pendent:   { text: 'No iniciat', cls: 'estat-pendent' },
    en_curs:   { text: 'En curs',    cls: 'estat-en-curs' },
    completat: { text: 'Completat',  cls: 'estat-completat' },
    fallit:    { text: 'Fallit',     cls: 'estat-fallit' },
  };

  const grups = ['facil', 'mitja', 'dificil'].map(dif => {
    const qs = sudokuPartida.sudokus.filter(s => s.dif === dif);
    const completats = qs.filter(s => s.estat === 'completat').length;
    const ptsTotal   = qs.reduce((a, s) => a + (s.punts || 0), 0);

    const cards = qs.map((s, i) => {
      // Determina estat real (pendent amb grid = en_curs)
      const estatReal = s.estat !== 'pendent' ? s.estat
                      : s.gridActual ? 'en_curs' : 'pendent';
      const blocat = s.estat === 'completat' || s.estat === 'fallit';
      const puzzle = SUDOKU_PUZZLES.find(p => p.id === s.puzzleId)?.puzzle;
      const click  = blocat ? '' : `onclick="sudokuJugar(${s.puzzleId})"`;
      const { text: estatText, cls: estatCls } = ESTAT_LABEL[estatReal];

      const contingut = puzzle
        ? sudokuMiniTauler(puzzle)
        : `<div class="sudoku-card-num">#${i + 1}</div>`;

      return `
        <div class="sudoku-card ${s.estat} ${blocat ? 'blocat' : ''}" ${click}>
          <div class="sudoku-card-preview">${contingut}</div>
          <div class="sudoku-card-estat ${estatCls}">${estatText}</div>
          ${s.estat === 'completat' ? `<div class="sudoku-card-pts">+${s.punts} pts</div>` : ''}
        </div>`;
    }).join('');

    return `
      <div class="sudoku-grup">
        <div class="sudoku-grup-header">
          <span>${SUDOKU_DIF_EMOJI[dif]} ${SUDOKU_DIF_LABEL[dif]}</span>
          <span class="sudoku-grup-prog">${completats}/${qs.length} · ${ptsTotal} pts</span>
        </div>
        <div class="sudoku-cards-fila">${cards}</div>
      </div>`;
  }).join('');

  const total = sudokuPartida.sudokus.reduce((a, s) => a + (s.punts || 0), 0);

  cont.innerHTML = `
    <div class="sudoku-selector-layout">
      <div class="sudoku-selector-main">
        <div class="sudoku-selector-titol-wrap">
          <span class="sudoku-selector-titol-emoji">🔢</span>
          <span class="sudoku-selector-titol-inline">Sudoku</span>
        </div>
        <div class="sudoku-selector-grup-area">
          <div class="sudoku-total-pts">
            <img src="${IMGS[jugadorActiu] || ''}" alt="${jugadorActiu}">
            <span>${jugadorActiu} · Total acumulat: <strong>${total} pts</strong></span>
          </div>
          ${grups}
        </div>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏆 Rànquing Sudoku</div>
        <div class="ranking-list-home" id="sudoku-ranking-list">
          <div class="ranking-loading">Carregant…</div>
        </div>
      </div>
    </div>`;

  // Carrega rànquing async
  sudokuRenderRankingGlobal();
}

// ── RÀNQUING GLOBAL SUDOKU ────────────────────────────────────
async function sudokuRenderRankingGlobal() {
  const el = document.getElementById('sudoku-ranking-list');
  if (!el) return;
  try {
    const pts = await sudokuGetPuntsGlobals();
    const llista = JUGADORS_VALIDS
      .map(nom => ({ nom, punts: pts[nom] || 0 }))
      .sort((a, b) => b.punts - a.punts);

    const maxPts = llista[0]?.punts || 1;
    const posEmoji = ['🥇', '🥈', '🥉'];

    el.innerHTML = llista.map((r, i) => `
      <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
        <div class="ranking-pos ${i < 3 ? 'p' + (i + 1) : 'other'}">${i < 3 ? posEmoji[i] : i + 1}</div>
        <img class="rank-avatar" src="${IMGS[r.nom] || ''}" alt="${r.nom}">
        <div class="rank-info">
          <div class="rank-nom">${r.nom}</div>
          <div class="rank-barra-wrap"><div class="rank-barra" style="width:${Math.round((r.punts / maxPts) * 100)}%"></div></div>
        </div>
        <div class="rank-punts">${r.punts}</div>
      </div>`).join('');
  } catch(e) {
    const el2 = document.getElementById('sudoku-ranking-list');
    if (el2) el2.innerHTML = '<div class="ranking-loading">Error carregant…</div>';
  }
}

// ── JUGAR UN SUDOKU ───────────────────────────────────────────
async function sudokuJugar(puzzleId) {
  sudokuActual      = SUDOKU_PUZZLES.find(s => s.id === puzzleId);
  sudokuEstatActual = sudokuPartida.sudokus.find(s => s.puzzleId === puzzleId);
  if (!sudokuActual || !sudokuEstatActual) return;

  // Restaura o inicialitza el grid
  if (sudokuEstatActual.gridActual) {
    sudokuGrid = sudokuEstatActual.gridActual.map(r => [...r]);
  } else {
    sudokuGrid = sudokuActual.puzzle.map(r => [...r]);
  }

  sudokuCellaSelec = null;
  mostraScreen('sudoku-joc');
  sudokuRenderJoc();
}

// ── RENDER PANTALLA JOC ───────────────────────────────────────
function sudokuRenderJoc() {
  if (!sudokuActual) return;
  const dif   = sudokuActual.dif;
  const estat = sudokuEstatActual;

  const pistesMax  = SUDOKU_MAX_PISTES[dif];
  const pistesLeft = pistesMax - estat.pistesUsades;
  const reintMax   = SUDOKU_MAX_REINTENTS[dif];
  const reintLeft  = reintMax - estat.reintentsUsats;
  const penalTot   = estat.pistesUsades * SUDOKU_COST_PISTA[dif]
                   + estat.reintentsUsats * SUDOKU_COST_REINTENT[dif];
  const ptsPrevistos = Math.max(0, SUDOKU_PUNTS[dif] - penalTot);
  const buidsTotal   = sudokuComptaBuits();
  const hiHaEditats  = sudokuHiHaEditats();

  const joc = document.getElementById('sudoku-joc-cont');
  if (!joc) return;

  joc.innerHTML = `
    <div class="sdj-layout">

      <!-- ── Columna esquerra: tauler ── -->
      <div class="sdj-esquerra">
        <div class="sdj-info-bar">
          <div class="sdj-dif">${SUDOKU_DIF_EMOJI[dif]} Sudoku ${SUDOKU_DIF_LABEL[dif]}</div>
          <div class="sdj-pts-wrap">
            <span class="sdj-pts-num">${ptsPrevistos}</span>
            <span class="sdj-pts-label">pts</span>
          </div>
          <div class="sdj-reintents">
            <span class="sdj-reintents-label">Reintents:</span>
            ${'●'.repeat(reintLeft)}${'○'.repeat(reintMax - reintLeft)}
          </div>
        </div>
        <div class="sdj-tauler" id="sudoku-tauler"></div>
      </div>

      <!-- ── Columna dreta: controls ── -->
      <div class="sdj-dreta">

        <!-- Pista + Validar -->
        <div class="sdj-ctrl-grid">
          <button class="sdj-btn-pista ${pistesLeft <= 0 ? 'disabled' : ''}"
            id="sudoku-btn-pista"
            onclick="sudokuDemanasPista()"
            ${pistesLeft <= 0 ? 'disabled' : ''}>
            <span class="sdj-pista-icon">💡</span>
            <span class="sdj-pista-badge">${pistesLeft}</span>
          </button>
          <button class="sdj-btn-validar ${buidsTotal > 0 ? 'disabled' : ''}"
            id="sudoku-btn-validar"
            onclick="sudokuValidar()"
            ${buidsTotal > 0 ? 'disabled' : ''}>
            ✓ Validar
          </button>
        </div>

        <!-- Teclat 3×3 -->
        <div class="sdj-teclat" id="sudoku-teclat"></div>

        <!-- Esborrar + Reiniciar -->
        <div class="sdj-ctrl-grid">
          <button class="sdj-btn-esborrar" onclick="sudokuIntroduirNum(0)">⌫</button>
          <button class="sdj-btn-reiniciar ${!hiHaEditats ? 'disabled' : ''}"
            id="sudoku-btn-reiniciar"
            onclick="sudokuDemanarReinici()"
            ${!hiHaEditats ? 'disabled' : ''}>↺</button>
        </div>

      </div>
    </div>`;

  sudokuRenderTauler();
  sudokuRenderTeclat();
}

function sudokuComptaBuits() {
  if (!sudokuGrid) return 0;
  let n = 0;
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 9; c++)
      if (sudokuGrid[r][c] === 0) n++;
  return n;
}

function sudokuHiHaEditats() {
  if (!sudokuGrid || !sudokuActual) return false;
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 9; c++)
      if (sudokuActual.puzzle[r][c] === 0 && sudokuGrid[r][c] !== 0) return true;
  return false;
}

function sudokuRenderTauler() {
  const tauler = document.getElementById('sudoku-tauler');
  if (!tauler) return;

  // Número seleccionat (de la cella activa)
  const numSelec = sudokuCellaSelec
    ? sudokuGrid[sudokuCellaSelec.row][sudokuCellaSelec.col]
    : null;

  tauler.innerHTML = '';
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val      = sudokuGrid[r][c];
      const original = sudokuActual.puzzle[r][c] !== 0;
      const selec    = sudokuCellaSelec && sudokuCellaSelec.row === r && sudokuCellaSelec.col === c;

      const mateixaFila  = sudokuCellaSelec && sudokuCellaSelec.row === r;
      const mateixaCol   = sudokuCellaSelec && sudokuCellaSelec.col === c;
      const mateixaCaixa = sudokuCellaSelec &&
        Math.floor(sudokuCellaSelec.row / 3) === Math.floor(r / 3) &&
        Math.floor(sudokuCellaSelec.col / 3) === Math.floor(c / 3);
      const relacionada  = (mateixaFila || mateixaCol || mateixaCaixa) && !selec;

      // Mateix número que el seleccionat (ressaltat fort)
      const mateixNum = numSelec && numSelec !== 0 && val === numSelec && !selec;

      // Conflicte: número editat que ja existeix a la mateixa fila/col/caixa
      let conflicte = false;
      if (val !== 0 && !original) {
        // Comprova fila
        for (let cc = 0; cc < 9; cc++) {
          if (cc !== c && sudokuGrid[r][cc] === val) { conflicte = true; break; }
        }
        if (!conflicte) {
          // Comprova columna
          for (let rr = 0; rr < 9; rr++) {
            if (rr !== r && sudokuGrid[rr][c] === val) { conflicte = true; break; }
          }
        }
        if (!conflicte) {
          // Comprova caixa 3x3
          const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
          outer: for (let rr = br; rr < br + 3; rr++)
            for (let cc = bc; cc < bc + 3; cc++)
              if ((rr !== r || cc !== c) && sudokuGrid[rr][cc] === val) { conflicte = true; break outer; }
        }
      }

      const cls = [
        'sudoku-cel',
        original   ? 'original' : 'editable',
        selec      ? 'seleccionada' : '',
        relacionada && !mateixNum ? 'relacionada' : '',
        mateixNum  ? 'mateix-num' : '',
        conflicte  ? 'conflicte' : '',
        c === 2 || c === 5 ? 'border-r' : '',
        r === 2 || r === 5 ? 'border-b' : '',
      ].filter(Boolean).join(' ');

      const cel = document.createElement('div');
      cel.className = cls;
      cel.textContent = val || '';
      // Tant originals com editables es poden seleccionar (per veure ressaltat)
      cel.addEventListener('click', () => sudokuSeleccionarCella(r, c));
      tauler.appendChild(cel);
    }
  }
  sudokuRenderTeclat();
  sudokuActualitzarBotonsJoc();
}

function sudokuRenderTeclat() {
  const teclat = document.getElementById('sudoku-teclat');
  if (!teclat) return;

  // Compta quants de cada número hi ha al grid
  const comptes = Array(10).fill(0);
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 9; c++)
      if (sudokuGrid[r][c] > 0) comptes[sudokuGrid[r][c]]++;

  const numSelec = sudokuCellaSelec
    ? sudokuGrid[sudokuCellaSelec.row][sudokuCellaSelec.col]
    : null;

  teclat.innerHTML = [7,8,9,4,5,6,1,2,3].map(n => {
    const complet = comptes[n] >= 9;
    const actiu   = numSelec === n;
    return `
      <button class="sdj-tecla ${complet ? 'complet' : ''} ${actiu ? 'actiu' : ''}"
        onclick="sudokuIntroduirNum(${n})"
        ${complet ? 'disabled' : ''}>
        <span class="sdj-tecla-num">${n}</span>
        <span class="sdj-tecla-comp">${comptes[n]}/9</span>
      </button>`;
  }).join('');
}

function sudokuActualitzarBotonsJoc() {
  const buits      = sudokuComptaBuits();
  const hiHaEditats = sudokuHiHaEditats();
  const btnValidar  = document.getElementById('sudoku-btn-validar');
  const btnReiniciar = document.getElementById('sudoku-btn-reiniciar');
  if (btnValidar) {
    btnValidar.disabled = buits > 0;
    btnValidar.classList.toggle('disabled', buits > 0);
  }
  if (btnReiniciar) {
    btnReiniciar.disabled = !hiHaEditats;
    btnReiniciar.classList.toggle('disabled', !hiHaEditats);
  }
}

function sudokuDemanarReinici() {
  if (!sudokuHiHaEditats()) return;
  const modal = document.getElementById('sudoku-modal');
  modal.innerHTML = `
    <div class="sudoku-modal-box">
      <div class="sudoku-modal-icon">↺</div>
      <div class="sudoku-modal-titol">Reiniciar sudoku?</div>
      <div class="sudoku-modal-text">
        S'esborraran tots els números que has introduït.<br>
        Les pistes usades i els reintents <strong>no es recuperen</strong>.
      </div>
      <div class="sudoku-modal-btns">
        <button class="sudoku-btn-reintent" onclick="sudokuConfirmarReinici()">Sí, reiniciar</button>
        <button class="sudoku-btn-tornar" onclick="document.getElementById('sudoku-modal').style.display='none'">Cancel·lar</button>
      </div>
    </div>`;
  modal.style.display = 'flex';
}

function sudokuConfirmarReinici() {
  document.getElementById('sudoku-modal').style.display = 'none';
  // Esborra només les caselles editables
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 9; c++)
      if (sudokuActual.puzzle[r][c] === 0) sudokuGrid[r][c] = 0;
  sudokuCellaSelec = null;
  sudokuGuardarProgres();
  sudokuRenderTauler();
}

function sudokuSeleccionarCella(row, col) {
  sudokuCellaSelec = { row, col };
  sudokuRenderTauler();
}

function sudokuIntroduirNum(num) {
  if (!sudokuCellaSelec) return;
  const { row, col } = sudokuCellaSelec;
  if (sudokuActual.puzzle[row][col] !== 0) return;
  sudokuGrid[row][col] = num;
  sudokuRenderTauler();
  sudokuGuardarProgres();
}

// ── GUARDAR PROGRÉS ───────────────────────────────────────────
async function sudokuGuardarProgres() {
  if (!jugadorActiu || !sudokuActual) return;
  const db  = sudokuGetDb();
  const ref = db.collection(SUDOKU_COL).doc(jugadorActiu);

  const idx = sudokuPartida.sudokus.findIndex(s => s.puzzleId === sudokuActual.id);
  if (idx === -1) return;

  sudokuPartida.sudokus[idx].gridActual = sudokuGrid.map(r => [...r]);
  await ref.update({ sudokus: sudokuPartida.sudokus });
}

// ── PISTA ─────────────────────────────────────────────────────
async function sudokuDemanasPista() {
  if (!sudokuActual || !sudokuEstatActual) return;
  const dif = sudokuActual.dif;
  if (sudokuEstatActual.pistesUsades >= SUDOKU_MAX_PISTES[dif]) return;

  // Troba una cella buida aleatòria
  const buides = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (sudokuGrid[r][c] === 0) buides.push({ r, c });
    }
  }
  if (!buides.length) return;

  const { r, c } = buides[Math.floor(Math.random() * buides.length)];
  sudokuGrid[r][c] = sudokuActual.solution[r][c];

  // Actualitza estat
  const idx = sudokuPartida.sudokus.findIndex(s => s.puzzleId === sudokuActual.id);
  sudokuPartida.sudokus[idx].pistesUsades++;
  sudokuEstatActual = sudokuPartida.sudokus[idx];

  const db = sudokuGetDb();
  await db.collection(SUDOKU_COL).doc(jugadorActiu).update({
    sudokus: sudokuPartida.sudokus
  });

  sudokuCellaSelec = { row: r, col: c };
  sudokuRenderJoc();
}

// ── VALIDACIÓ FINAL ───────────────────────────────────────────
async function sudokuValidar() {
  if (!sudokuActual || !sudokuEstatActual) return;

  // Comprova que tot el tauler estigui ple
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (sudokuGrid[r][c] === 0) {
        sudokuMostraToast('Omple totes les caselles abans de validar!');
        return;
      }
    }
  }

  // Compara amb la solució
  let correcte = true;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (sudokuGrid[r][c] !== sudokuActual.solution[r][c]) {
        correcte = false;
        break;
      }
    }
    if (!correcte) break;
  }

  const dif = sudokuActual.dif;
  const idx = sudokuPartida.sudokus.findIndex(s => s.puzzleId === sudokuActual.id);

  if (correcte) {
    // Calcula punts finals
    const penalPistes   = sudokuEstatActual.pistesUsades   * SUDOKU_COST_PISTA[dif];
    const penalReintents = sudokuEstatActual.reintentsUsats * SUDOKU_COST_REINTENT[dif];
    const pts = Math.max(0, SUDOKU_PUNTS[dif] - penalPistes - penalReintents);

    sudokuPartida.sudokus[idx].estat      = 'completat';
    sudokuPartida.sudokus[idx].punts      = pts;
    sudokuPartida.sudokus[idx].gridActual = null;

    const db = sudokuGetDb();
    await db.collection(SUDOKU_COL).doc(jugadorActiu).update({
      sudokus: sudokuPartida.sudokus
    });

    sudokuEstatActual = sudokuPartida.sudokus[idx];
    sudokuMostraResultat(true, pts);
  } else {
    // Incorrecte
    const reintMax  = SUDOKU_MAX_REINTENTS[dif];
    const reintLeft = reintMax - sudokuEstatActual.reintentsUsats;

    if (reintLeft <= 0) {
      // Sense reintents → fallit
      sudokuPartida.sudokus[idx].estat      = 'fallit';
      sudokuPartida.sudokus[idx].punts      = 0;
      sudokuPartida.sudokus[idx].gridActual = null;

      const db = sudokuGetDb();
      await db.collection(SUDOKU_COL).doc(jugadorActiu).update({
        sudokus: sudokuPartida.sudokus
      });

      sudokuEstatActual = sudokuPartida.sudokus[idx];
      sudokuMostraResultat(false, 0, true);
    } else {
      // Queden reintents
      sudokuPartida.sudokus[idx].reintentsUsats++;
      sudokuEstatActual = sudokuPartida.sudokus[idx];

      const db = sudokuGetDb();
      await db.collection(SUDOKU_COL).doc(jugadorActiu).update({
        sudokus: sudokuPartida.sudokus
      });

      const reintNou = reintMax - sudokuEstatActual.reintentsUsats;
      sudokuMostraDialegReintent(reintNou, dif);
    }
  }
}

function sudokuMostraDialegReintent(reintLeft, dif) {
  const cost = SUDOKU_COST_REINTENT[dif];
  const modal = document.getElementById('sudoku-modal');
  modal.innerHTML = `
    <div class="sudoku-modal-box">
      <div class="sudoku-modal-icon">❌</div>
      <div class="sudoku-modal-titol">Hi ha errors!</div>
      <div class="sudoku-modal-text">
        Pots reintentar-ho, però et costarà <strong>−${cost} pts</strong>.<br>
        Et queden <strong>${reintLeft}</strong> reintent${reintLeft !== 1 ? 's' : ''}.
      </div>
      <div class="sudoku-modal-btns">
        <button class="sudoku-btn-reintent" onclick="sudokuReintenta()">Reintentar (−${cost} pts)</button>
        <button class="sudoku-btn-tornar"   onclick="sudokuTornarSelector()">Tornar</button>
      </div>
    </div>`;
  modal.style.display = 'flex';
}

function sudokuReintenta() {
  document.getElementById('sudoku-modal').style.display = 'none';
  // Restaura les caselles editables que no coincideixen amb la solució
  // (deixa les correctes, esborra les incorrectes)
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (sudokuActual.puzzle[r][c] === 0 &&
          sudokuGrid[r][c] !== sudokuActual.solution[r][c]) {
        sudokuGrid[r][c] = 0;
      }
    }
  }
  sudokuCellaSelec = null;
  sudokuGuardarProgres();
  sudokuRenderJoc();
}

function sudokuMostraResultat(correcte, pts, fallit = false) {
  mostraScreen('sudoku-resultat');
  const cont = document.getElementById('sudoku-resultat-cont');
  if (!cont) return;

  if (fallit) {
    cont.innerHTML = `
      <div class="sudoku-resultat-icon">💀</div>
      <div class="sudoku-resultat-titol">Sudoku fallat</div>
      <div class="sudoku-resultat-text">Has esgotat els reintents sense resoldre'l.</div>
      <div class="sudoku-resultat-pts zero">0 pts</div>
      <button class="sudoku-btn-tornar" onclick="sudokuTornarSelector()">Tornar als sudokus</button>`;
  } else {
    const base = SUDOKU_PUNTS[sudokuActual.dif];
    const penal = base - pts;
    cont.innerHTML = `
      <div class="sudoku-resultat-icon">🎉</div>
      <div class="sudoku-resultat-titol">Resolt!</div>
      <div class="sudoku-resultat-pts">+${pts} pts</div>
      ${penal > 0 ? `<div class="sudoku-resultat-penal">(${base} base − ${penal} penalització)</div>` : ''}
      <button class="sudoku-btn-tornar" onclick="sudokuTornarSelector()">Tornar als sudokus</button>`;
  }
}

function sudokuSortir() {
  // Sempre guarda l'estat actual abans de sortir
  sudokuGuardarProgres().finally(() => {
    sudokuTornarSelector();
  });
}

function sudokuTornarSelector() {
  const modal = document.getElementById('sudoku-modal');
  if (modal) modal.style.display = 'none';
  sudokuActual      = null;
  sudokuEstatActual = null;
  sudokuGrid        = null;
  sudokuCellaSelec  = null;
  mostraScreen('sudoku-selector');
  sudokuRenderSelector();
}

// ── PUNTS GLOBALS (per al rànquing) ───────────────────────────
async function sudokuGetPuntsGlobals() {
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => { pts[nom] = 0; });
  try {
    const db   = sudokuGetDb();
    const snaps = await Promise.all(
      JUGADORS_VALIDS.map(nom => db.collection(SUDOKU_COL).doc(nom).get())
    );
    snaps.forEach((snap, i) => {
      if (!snap.exists) return;
      const nom = JUGADORS_VALIDS[i];
      snap.data().sudokus.forEach(s => { pts[nom] += s.punts || 0; });
    });
  } catch(e) {
    console.error('Error llegint punts sudoku:', e);
  }
  return pts;
}

// ── UTILS ──────────────────────────────────────────────────────
function sudokuBarrejar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sudokuMostraToast(msg) {
  let toast = document.getElementById('sudoku-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sudoku-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2500);
}
