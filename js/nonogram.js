// js/nonogram.js
// Nonogram Açores 2026
// localStorage: nonogram_estat_Nom
// Puntuació: 20/50/100 pts · -10% per error · màx 3 errors · 4t error = 0 pts

// ══════════════════════════════════════════════════════════════
//  ESTAT
// ══════════════════════════════════════════════════════════════

let nonoEstat       = null;   // estat global del jugador (tots els puzzles)
let nonoPuzzle      = null;   // puzzle actiu
let nonoUserGrid    = [];     // graella de l'usuari: 0=buit, 1=omplert, -1=marcat X
let nonoErrors      = 0;      // errors en el puzzle actual
let nonoCompletada  = false;
let nonoModoMarca   = false;  // true = mode marcar X (clic dret o toggle)

// ══════════════════════════════════════════════════════════════
//  ENTRADA
// ══════════════════════════════════════════════════════════════

async function iniciarNonogram() {
  mostraScreen('nonogram-selector');
  const c = document.getElementById('nonogram-selector-cont');
  if (c) c.innerHTML = '<div class="joc-carregant">Carregant…</div>';
  await nonoCarregarEstat();
  nonoRenderSelector();
}

// ══════════════════════════════════════════════════════════════
//  PERSISTÈNCIA
// ══════════════════════════════════════════════════════════════

const NONO_COL = 'nonogram_punts';

async function nonoCarregarEstat() {
  const nom = jugadorActiu;
  if (!nom) { nonoEstat = { puzzles: {} }; return; }
  const d = await jocFsCarregar(NONO_COL, nom);
  nonoEstat = d || { puzzles: {} };
  if (!nonoEstat.puzzles) nonoEstat.puzzles = {};
}

function nonoGuardarEstat() {
  const nom = jugadorActiu;
  if (!nom) return;
  jocFsDesar(NONO_COL, nom, nonoEstat);
}

function nonoGetPuzzleEstat(id) {
  return nonoEstat.puzzles[id] || null;
}

function nonoSetPuzzleEstat(id, data) {
  nonoEstat.puzzles[id] = data;
  nonoGuardarEstat();
}

// Punts totals del jugador (per rànquing)
function nonoGetPuntsTotals(nom) {
  const estat = jocFsCacheGet(NONO_COL, nom || jugadorActiu);
  if (!estat) return 0;
  return Object.values(estat.puzzles || {})
    .filter(p => p.completat)
    .reduce((s, p) => s + (p.punts || 0), 0);
}

// ══════════════════════════════════════════════════════════════
//  PANTALLA SELECTOR
// ══════════════════════════════════════════════════════════════

function nonoRenderSelector() {
  const cont = document.getElementById('nonogram-selector-cont');

  const nivells = [
    { id: 'facil',   emoji: '🟢', label: 'Fàcil',  mida: '6×6',   pts: 20  },
    { id: 'mitja',   emoji: '🟡', label: 'Mitjà',  mida: '9×9',   pts: 50  },
    { id: 'dificil', emoji: '🔴', label: 'Difícil', mida: '12×12', pts: 100 },
  ];

  const ptsTotals = nonoGetPuntsTotals();

  const rankingHtml = nonoRenderRankingHtml();

  cont.innerHTML = `
    <div class="nono-sel-wrap">
      <div class="joc-header-fila">
        <button class="mapa-back-btn" onclick="mostraScreen('joc-selector')">← Tornar</button>
      </div>
      <div class="joc-titol-fila" style="align-items:center;text-align:center;width:100%">
        <span class="joc-titol-emoji">🧩</span>
        <span class="joc-titol-text">Nonogram</span>
      </div>

      <div class="nono-sel-layout">
        <!-- Esquerra: nivells + puzzles -->
        <div class="nono-sel-left">
          <div class="nono-jugador-wrap">
            <img src="${IMGS[jugadorActiu]}" class="nono-jugador-avatar" alt="${jugadorActiu}">
            <div>
              <div class="nono-jugador-nom">${jugadorActiu}</div>
              <div class="nono-jugador-pts">${ptsTotals} punts acumulats</div>
            </div>
          </div>

          ${nivells.map(n => nonoRenderNivellBlock(n)).join('')}
        </div>

        <!-- Dreta: rànquing -->
        <div class="ranking-wrap">
          <div class="ranking-title">🏆 Rànquing</div>
          <div class="ranking-list-home">${rankingHtml}</div>
        </div>
      </div>
    </div>
  `;
}

function nonoRenderNivellBlock(n) {
  const puzzles = NONO_PUZZLES.filter(p => p.nivell === n.id);
  const cards = puzzles.map(p => {
    const pEstat = nonoGetPuzzleEstat(p.id);
    const completat = pEstat && pEstat.completat;
    const enCurs   = pEstat && !pEstat.completat && pEstat.grid;
    const pts      = completat ? pEstat.punts : 0;

    let estat = '';
    let clsExtra = '';
    if (completat) {
      estat = `<span class="nono-card-pts">✓ ${pts} pts</span>`;
      clsExtra = 'nono-card--completat';
    } else if (enCurs) {
      estat = `<span class="nono-card-encurs">En curs…</span>`;
      clsExtra = 'nono-card--encurs';
    }

    return `
      <button class="nono-card ${clsExtra}" onclick="nonoSeleccionarPuzzle(${p.id})" ${completat ? 'disabled' : ''}>
        <span class="nono-card-num">#${p.id}</span>
        ${estat}
        ${completat ? '<span class="nono-card-blocat">🔒</span>' : ''}
      </button>`;
  }).join('');

  const completats = puzzles.filter(p => { const e = nonoGetPuzzleEstat(p.id); return e && e.completat; }).length;

  return `
    <div class="nono-nivell-bloc">
      <div class="nono-nivell-header">
        <span>${n.emoji} ${n.label}</span>
        <span class="nono-nivell-mida">${n.mida} · ${n.pts} pts · ${completats}/${puzzles.length} completats</span>
      </div>
      <div class="nono-cards-grid">${cards}</div>
    </div>
  `;
}

function nonoRenderRankingHtml() {
  const dades = JUGADORS_VALIDS.map(nom => ({
    nom,
    pts: nonoGetPuntsTotals(nom),
  })).sort((a, b) => b.pts - a.pts);

  return dades.map((d, i) => `
    <div class="ranking-item ${d.nom === jugadorActiu ? 'ranking-item--actiu' : ''}">
      <span class="ranking-pos">${i + 1}</span>
      <img src="${IMGS[d.nom]}" class="ranking-avatar" alt="${d.nom}">
      <span class="ranking-nom">${d.nom}</span>
      <span class="ranking-pts">${d.pts} pts</span>
    </div>
  `).join('');
}

// ══════════════════════════════════════════════════════════════
//  JOC
// ══════════════════════════════════════════════════════════════

function nonoSeleccionarPuzzle(id) {
  nonoPuzzle    = NONO_PUZZLES.find(p => p.id === id);
  nonoErrors    = 0;
  nonoCompletada = false;
  nonoModoMarca = false;

  // Carregar progrés si n'hi ha
  const pEstat = nonoGetPuzzleEstat(id);
  if (pEstat && pEstat.grid && !pEstat.completat) {
    nonoUserGrid = pEstat.grid.map(r => [...r]);
    nonoErrors   = pEstat.errors || 0;
  } else {
    nonoUserGrid = Array.from({ length: nonoPuzzle.mida }, () =>
      Array(nonoPuzzle.mida).fill(0)
    );
  }

  mostraScreen('nonogram-joc');
  nonoRenderJoc();
}

function nonoRenderJoc() {
  const cont = document.getElementById('nonogram-joc-cont');
  const p    = nonoPuzzle;
  const pts  = NONO_PTS[p.nivell];

  cont.innerHTML = `
    <div class="nono-joc-wrap">
      <!-- Header -->
      <div class="joc-header-fila nono-joc-header">
        <button class="mapa-back-btn" onclick="nonoGuardarITornar()">← Tornar</button>
        <div class="nono-joc-info">
          <span class="nono-joc-nom">Puzzle #${p.id}</span>
          <span class="nono-mida-badge">${p.mida}×${p.mida}</span>
        </div>
        <div class="nono-errors-wrap" id="nono-errors-wrap"></div>
      </div>

      <!-- Instrucció + mode marca -->
      <div class="nono-controls-bar">
        <span class="nono-pts-label">${pts} pts base · −10% per error · màx ${NONO_MAX_ERR} errors</span>
        <button class="nono-btn-marca ${nonoModoMarca ? 'actiu' : ''}" id="nono-btn-marca" onclick="nonoToggleMarca()">
          ✕ Mode marca
        </button>
      </div>

      <!-- Graella -->
      <div class="nono-graella-outer" id="nono-graella-outer">
        ${nonoHtmlGraella()}
      </div>

      <!-- Resultat (ocult fins que s'acaba) -->
      <div class="nono-resultat" id="nono-resultat" style="display:none"></div>
    </div>
  `;

  nonoRenderErrors();
  nonoAfegirListeners();
}

function nonoHtmlGraella() {
  const p   = nonoPuzzle;
  const N   = p.mida;
  const pf  = p.pistes.files;
  const pc  = p.pistes.cols;
  const maxPistesFiles = Math.max(...pf.map(f => f.length));
  const maxPistesCols  = Math.max(...pc.map(c => c.length));

  let html = `<table class="nono-taula" id="nono-taula">`;

  // Files capçalera de columnes
  for (let h = 0; h < maxPistesCols; h++) {
    html += '<tr>';
    // cel·les buides a la cantonada
    for (let i = 0; i < maxPistesFiles; i++) html += '<td class="nono-corner"></td>';
    // pistes de columnes
    for (let c = 0; c < N; c++) {
      const pista = pc[c];
      const idx   = h - (maxPistesCols - pista.length);
      const val   = idx >= 0 ? pista[idx] : '';
      const cls   = nonoColCompleta(c) ? 'nono-pista-col nono-pista--ok' : 'nono-pista-col';
      html += `<td class="${cls}" data-col="${c}" data-hidx="${h}">${val === 0 ? '' : val}</td>`;
    }
    html += '</tr>';
  }

  // Files de dades
  for (let r = 0; r < N; r++) {
    html += '<tr>';
    // pistes de fila
    const pista = pf[r];
    for (let i = 0; i < maxPistesFiles; i++) {
      const idx = i - (maxPistesFiles - pista.length);
      const val = idx >= 0 ? pista[idx] : '';
      const cls = nonoFilaCompleta(r) ? 'nono-pista-fila nono-pista--ok' : 'nono-pista-fila';
      html += `<td class="${cls}" data-fila="${r}">${val === 0 ? '' : val}</td>`;
    }
    // cel·les de la graella — afegim classe separador cada 3 files/cols
    for (let c = 0; c < N; c++) {
      const val = nonoUserGrid[r][c];
      // Separadors visuals cada 3: marca la cel·la que és múltiple de 3 (excepte el límit)
      const sepDreta  = (c + 1) % 3 === 0 && c < N - 1 ? ' nono-sep-dreta'  : '';
      const sepBaix   = (r + 1) % 3 === 0 && r < N - 1 ? ' nono-sep-baix'   : '';
      html += `<td class="nono-cel ${nonoClsCel(val)}${sepDreta}${sepBaix}" data-r="${r}" data-c="${c}"></td>`;
    }
    html += '</tr>';
  }

  html += '</table>';
  return html;
}

function nonoClsCel(val) {
  if (val === 1)  return 'nono-cel--plena';
  if (val === -1) return 'nono-cel--marca';
  return '';
}

function nonoAfegirListeners() {
  const taula = document.getElementById('nono-taula');
  if (!taula) return;

  // Evitar menú contextual
  taula.addEventListener('contextmenu', e => e.preventDefault());

  taula.addEventListener('pointerdown', e => {
    const cel = e.target.closest('[data-r]');
    if (!cel || nonoCompletada) return;
    const r = +cel.dataset.r;
    const c = +cel.dataset.c;

    if (e.button === 2 || nonoModoMarca) {
      // Clic dret o mode marca: togglejar marca X
      nonoUserGrid[r][c] = nonoUserGrid[r][c] === -1 ? 0 : -1;
    } else {
      // Clic esquerre: omple/buida
      if (nonoUserGrid[r][c] === -1) return; // no sobreescriure marca
      nonoUserGrid[r][c] = nonoUserGrid[r][c] === 1 ? 0 : 1;

      // Validar immediatament si es posa a 1
      if (nonoUserGrid[r][c] === 1) {
        nonoValidarCel(r, c);
      }
    }

    nonoActualitzarGraella();
    nonoGuardarProgres();
  });
}

function nonoValidarCel(r, c) {
  const correcta = nonoPuzzle.grid[r][c] === 1;
  if (!correcta) {
    nonoErrors++;
    nonoUserGrid[r][c] = 0; // revertir
    nonoRenderErrors();

    if (nonoErrors > NONO_MAX_ERR) {
      nonoAcabar(true); // 4t error: 0 pts
      return;
    }

    // Flash error visual
    const cel = document.querySelector(`[data-r="${r}"][data-c="${c}"]`);
    if (cel) {
      cel.classList.add('nono-cel--error');
      setTimeout(() => cel.classList.remove('nono-cel--error'), 600);
    }
  }

  // Comprovar si s'ha completat
  nonoComprovarCompletada();
}

function nonoComprovarCompletada() {
  const p = nonoPuzzle;
  for (let r = 0; r < p.mida; r++) {
    for (let c = 0; c < p.mida; c++) {
      if (p.grid[r][c] === 1 && nonoUserGrid[r][c] !== 1) return;
    }
  }
  nonoAcabar(false);
}

function nonoAcabar(fourthError) {
  nonoCompletada = true;
  const ptsBruts = NONO_PTS[nonoPuzzle.nivell];
  const pts = fourthError
    ? 0
    : Math.round(ptsBruts * Math.pow(1 - NONO_PENAL, Math.min(nonoErrors, NONO_MAX_ERR)));

  // Guardar estat completat
  nonoSetPuzzleEstat(nonoPuzzle.id, {
    completat: true,
    punts: pts,
    errors: nonoErrors,
    grid: nonoUserGrid.map(r => [...r]),
  });

  // Revelar solució completa
  nonoPuzzle.grid.forEach((fila, r) =>
    fila.forEach((val, c) => { if (val === 1) nonoUserGrid[r][c] = 1; })
  );
  nonoActualitzarGraella();

  // Mostrar resultat
  const res = document.getElementById('nono-resultat');
  if (res) {
    res.style.display = 'flex';
    const icon  = fourthError ? '💥' : pts === NONO_PTS[nonoPuzzle.nivell] ? '🎉' : '✅';
    const msg   = fourthError ? 'Massa errors — 0 punts' : `${pts} punts!`;
    const errTxt = nonoErrors > 0 ? `${nonoErrors} error${nonoErrors > 1 ? 's' : ''} · ` : '';
    res.innerHTML = `
      <div class="nono-res-icon">${icon}</div>
      <div class="nono-res-msg">${msg}</div>
      <div class="nono-res-sub">${errTxt}Puzzle #${nonoPuzzle.id} completat</div>
      <button class="jm-btn-seguent" onclick="nonoTornarSelector()">← Tornar als puzzles</button>
    `;
  }
}

// ── UTILITATS GRAELLA ─────────────────────────────────────────

function nonoFilaCompleta(r) {
  const p = nonoPuzzle;
  for (let c = 0; c < p.mida; c++) {
    if (p.grid[r][c] === 1 && nonoUserGrid[r][c] !== 1) return false;
    if (p.grid[r][c] === 0 && nonoUserGrid[r][c] === 1) return false;
  }
  return true;
}

function nonoColCompleta(c) {
  const p = nonoPuzzle;
  for (let r = 0; r < p.mida; r++) {
    if (p.grid[r][c] === 1 && nonoUserGrid[r][c] !== 1) return false;
    if (p.grid[r][c] === 0 && nonoUserGrid[r][c] === 1) return false;
  }
  return true;
}

function nonoActualitzarGraella() {
  const p = nonoPuzzle;
  const N = p.mida;

  // Cel·les
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const cel = document.querySelector(`[data-r="${r}"][data-c="${c}"]`);
      if (!cel) continue;
      const sepDreta = (c + 1) % 3 === 0 && c < N - 1 ? ' nono-sep-dreta' : '';
      const sepBaix  = (r + 1) % 3 === 0 && r < N - 1 ? ' nono-sep-baix'  : '';
      cel.className = `nono-cel ${nonoClsCel(nonoUserGrid[r][c])}${sepDreta}${sepBaix}`;
    }
  }

  // Pistes de files
  for (let r = 0; r < N; r++) {
    const ok = nonoFilaCompleta(r);
    document.querySelectorAll(`[data-fila="${r}"]`).forEach(el => {
      el.className = ok ? 'nono-pista-fila nono-pista--ok' : 'nono-pista-fila';
    });
  }

  // Pistes de columnes
  for (let c = 0; c < N; c++) {
    const ok = nonoColCompleta(c);
    document.querySelectorAll(`[data-col="${c}"]`).forEach(el => {
      el.className = ok ? 'nono-pista-col nono-pista--ok' : 'nono-pista-col';
    });
  }
}

function nonoRenderErrors() {
  const wrap = document.getElementById('nono-errors-wrap');
  if (!wrap) return;
  const icones = Array.from({ length: NONO_MAX_ERR }, (_, i) =>
    `<span class="nono-error-dot ${i < nonoErrors ? 'nono-error-dot--actiu' : ''}">✕</span>`
  ).join('');
  wrap.innerHTML = `<span class="nono-errors-label">Errors:</span>${icones}`;
}

function nonoToggleMarca() {
  nonoModoMarca = !nonoModoMarca;
  const btn = document.getElementById('nono-btn-marca');
  if (btn) btn.classList.toggle('actiu', nonoModoMarca);
}

// ── GUARDAR I NAVEGAR ─────────────────────────────────────────

function nonoGuardarProgres() {
  if (nonoCompletada) return;
  nonoSetPuzzleEstat(nonoPuzzle.id, {
    completat: false,
    punts: 0,
    errors: nonoErrors,
    grid: nonoUserGrid.map(r => [...r]),
  });
}

function nonoGuardarITornar() {
  nonoGuardarProgres();
  nonoTornarSelector();
}

function nonoTornarSelector() {
  mostraScreen('nonogram-selector');
  nonoRenderSelector();
}

// ══════════════════════════════════════════════════════════════
//  RÀNQUING (per jocs.js rankingCarregar)
// ══════════════════════════════════════════════════════════════

async function nonoCarregarPuntsRanking() {
  // Retorna objecte { Jordi: 120, Anna: 50, ... }
  await jocFsCarregarTots(NONO_COL, JUGADORS_VALIDS);
  const res = {};
  JUGADORS_VALIDS.forEach(nom => {
    res[nom] = nonoGetPuntsTotals(nom);
  });
  return res;
}
