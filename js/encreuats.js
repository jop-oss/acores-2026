// js/encreuats.js
// Mots Encreuats · Açores 2026
// localStorage: encreuats_estat_Nom
// Puntuació: 150/100/50 pts · màx 2 intents de validació

// ══════════════════════════════════════════════════════════════
//  CONSTANTS
// ══════════════════════════════════════════════════════════════

const ENC_COLOR_MARO = '#8B5E3C';   // terra (PPCC)
const ENC_COLOR_BLAU = '#3B9BE8';   // mar (PPCC)
const ENC_COLOR_JUGA = '#0f2235';   // casella jugable (fons fosc del tema)
const ENC_COLOR_NEGRA = '#000';     // casella negra (10x10)

// ══════════════════════════════════════════════════════════════
//  ESTAT
// ══════════════════════════════════════════════════════════════

let encPuzzle    = null;   // puzzle actiu
let encUserGrid  = [];     // graella de l'usuari [r][c] = lletra o ''
let encIntents   = 0;      // validacions fallides (0, 1, 2)
let encCompletada = false;
let encCelActiva = null;   // {r, c}
let encDireccio  = 'H';    // 'H' | 'V'

// ══════════════════════════════════════════════════════════════
//  ENTRADA
// ══════════════════════════════════════════════════════════════

function iniciarEncreuats() {
  encCarregarEstat();
  mostraScreen('encreuats-selector');
  encRenderSelector();
}

// ══════════════════════════════════════════════════════════════
//  PERSISTÈNCIA
// ══════════════════════════════════════════════════════════════

function encClau(nom) { return `encreuats_estat_${nom || jugadorActiu}`; }

function encCarregarEstat() {
  const raw = localStorage.getItem(encClau());
  return raw ? JSON.parse(raw) : { puzzles: {} };
}

function encGuardarProgres() {
  const estat = encCarregarEstat();
  if (!encPuzzle || encCompletada) return;
  estat.puzzles[encPuzzle.id] = {
    completada: false,
    intents: encIntents,
    grid: encUserGrid,
  };
  localStorage.setItem(encClau(), JSON.stringify(estat));
}

function encGuardarCompletada(pts) {
  const estat = encCarregarEstat();
  estat.puzzles[encPuzzle.id] = {
    completada: true,
    pts,
    intents: encIntents,
  };
  localStorage.setItem(encClau(), JSON.stringify(estat));
}

function encGetPuntsTotals(nom) {
  const raw = localStorage.getItem(encClau(nom));
  if (!raw) return 0;
  try {
    const estat = JSON.parse(raw);
    return Object.values(estat.puzzles || {})
      .filter(p => p.completada)
      .reduce((s, p) => s + (p.pts || 0), 0);
  } catch { return 0; }
}

// ══════════════════════════════════════════════════════════════
//  PANTALLA SELECTOR
// ══════════════════════════════════════════════════════════════

function encRenderSelector() {
  const cont = document.getElementById('encreuats-selector-cont');
  const estat = encCarregarEstat();
  const ptsTotals = encGetPuntsTotals();

  const rankingHtml = JUGADORS_VALIDS.map(nom => {
    const pts = encGetPuntsTotals(nom);
    return { nom, pts };
  }).sort((a, b) => b.pts - a.pts).map((d, i) => `
    <div class="ranking-item ${d.nom === jugadorActiu ? 'ranking-item--actiu' : ''}">
      <span class="ranking-pos">${i + 1}</span>
      <img src="${IMGS[d.nom]}" class="ranking-avatar" alt="${d.nom}">
      <span class="ranking-nom">${d.nom}</span>
      <span class="ranking-pts">${d.pts} pts</span>
    </div>`).join('');

  const cardsHtml = ENC_PUZZLES.map(p => {
    const pEstat = estat.puzzles[p.id];
    const completada = pEstat?.completada;
    const enCurs = pEstat && !pEstat.completada;
    const pts = completada ? pEstat.pts : 0;
    const tipusBadge = p.tipus === 'ppcc' ? '🗺️ PP.CC.' : '10×10';

    return `
      <button class="enc-card ${completada ? 'enc-card--completada' : ''} ${enCurs ? 'enc-card--encurs' : ''}"
        onclick="encSeleccionar(${p.id})" ${completada ? 'disabled' : ''}>
        <span class="enc-card-num">#${p.id}</span>
        <span class="enc-card-tipus">${tipusBadge}</span>
        ${completada ? `<span class="enc-card-pts">✓ ${pts} pts 🔒</span>` : ''}
        ${enCurs ? `<span class="enc-card-encurs">En curs…</span>` : ''}
      </button>`;
  }).join('');

  cont.innerHTML = `
    <div class="enc-sel-layout">
      <div class="enc-sel-left">
        <div class="joc-header-fila">
          <button class="mapa-back-btn" onclick="mostraScreen('joc-selector')">← Tornar</button>
        </div>
        <div class="joc-titol-fila" style="align-items:center;text-align:center;width:100%">
          <span class="joc-titol-emoji">📝</span>
          <span class="joc-titol-text">Mots Encreuats</span>
        </div>
        <div class="enc-jugador-wrap">
          <img src="${IMGS[jugadorActiu]}" class="nono-jugador-avatar" alt="${jugadorActiu}">
          <div>
            <div class="nono-jugador-nom">${jugadorActiu}</div>
            <div class="nono-jugador-pts">${ptsTotals} punts acumulats</div>
          </div>
        </div>
        <div class="enc-cards-grid">${cardsHtml}</div>
        <div class="enc-info-pts">
          💡 <strong>150 pts</strong> al primer intent · <strong>100 pts</strong> al segon intent · <strong>50 pts</strong> al tercer intent
        </div>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏆 Rànquing</div>
        <div class="ranking-list-home">${rankingHtml}</div>
      </div>
    </div>`;
}

// ══════════════════════════════════════════════════════════════
//  CARREGAR PUZZLE
// ══════════════════════════════════════════════════════════════

function encSeleccionar(id) {
  encPuzzle = ENC_PUZZLES.find(p => p.id === id);
  encIntents = 0;
  encCompletada = false;
  encCelActiva = null;
  encDireccio = 'H';

  const estat = encCarregarEstat();
  const pEstat = estat.puzzles[id];
  if (pEstat && !pEstat.completada && pEstat.grid) {
    encUserGrid = pEstat.grid.map(r => [...r]);
    encIntents = pEstat.intents || 0;
  } else {
    const rows = encPuzzle.tipus === 'ppcc' ? encPuzzle.rows : encPuzzle.mida;
    const cols = encPuzzle.tipus === 'ppcc' ? encPuzzle.cols : encPuzzle.mida;
    encUserGrid = Array.from({ length: rows }, () => Array(cols).fill(''));
  }

  mostraScreen('encreuats-joc');
  encRenderJoc();
}

// ══════════════════════════════════════════════════════════════
//  RENDERITZAR JOC
// ══════════════════════════════════════════════════════════════

function encRenderJoc() {
  const cont = document.getElementById('encreuats-joc-cont');
  const p = encPuzzle;
  const nom = p.tipus === 'ppcc' ? `PP.CC. #${p.id}` : `Encreuat #${p.id}`;
  const ptsRestants = ENC_PTS[encIntents] || 50;

  cont.innerHTML = `
    <div class="enc-joc-wrap">
      <div class="joc-header-fila">
        <button class="mapa-back-btn" onclick="encGuardarITornar()">← Tornar</button>
        <span class="enc-joc-nom">${nom}</span>
        <span class="enc-joc-pts">${ptsRestants} pts disponibles</span>
      </div>

      <div class="enc-joc-body">
        <!-- Graella -->
        <div class="enc-graella-wrap">
          ${encHtmlGraella()}
        </div>

        <!-- Definicions -->
        <div class="enc-defs-wrap" id="enc-defs-wrap">
          <div class="enc-defs-panel" id="enc-defs-panel">
            <div class="enc-defs-clue" id="enc-defs-clue">Selecciona una casella</div>
          </div>
          <div class="enc-defs-cols">
            <div class="enc-defs-col">
              <div class="enc-defs-title">↔ Horitzontals</div>
              <div class="enc-defs-list" id="enc-hdef-list">
                ${p.hdef.map((d, i) => `<div class="enc-def-item" data-idx="${i}" onclick="encClickDef('H',${i})">${d}</div>`).join('')}
              </div>
            </div>
            <div class="enc-defs-col">
              <div class="enc-defs-title">↕ Verticals</div>
              <div class="enc-def-list" id="enc-vdef-list">
                ${p.vdef.map((d, i) => `<div class="enc-def-item" data-idx="${i}" onclick="encClickDef('V',${i})">${d}</div>`).join('')}
              </div>
            </div>
          </div>
          <div class="enc-accions">
            <button class="enc-btn-validar" onclick="encValidar()">✓ Validar</button>
            <button class="mapa-back-btn" onclick="encEsborrarCel()">⌫ Esborrar</button>
          </div>
        </div>
      </div>
    </div>`;

  encAfegirListeners();
}

function encHtmlGraella() {
  const p = encPuzzle;
  if (p.tipus === 'ppcc') return encHtmlGraellaPPCC();

  // 10×10 — números de fila (esquerra) i columna (dalt)
  const N = p.mida;
  let html = '<table class="enc-taula" id="enc-taula">';

  // Fila de capçalera amb números de columna
  html += '<tr><td class="enc-cap-buit"></td>';
  for (let c = 0; c < N; c++) {
    html += `<td class="enc-cap-num">${c + 1}</td>`;
  }
  html += '</tr>';

  for (let r = 0; r < N; r++) {
    html += `<tr><td class="enc-cap-num">${r + 1}</td>`;
    for (let c = 0; c < N; c++) {
      const lletra = encPuzzle.grid[r][c];
      if (lletra === null) {
        html += `<td class="enc-cel enc-cel--negra"></td>`;
      } else {
        const userLl = encUserGrid[r]?.[c] || '';
        html += `<td class="enc-cel enc-cel--juga" data-r="${r}" data-c="${c}">
          <span class="enc-lletra">${userLl}</span>
        </td>`;
      }
    }
    html += '</tr>';
  }
  html += '</table>';
  return html;
}

function encHtmlGraellaPPCC() {
  const p = encPuzzle;
  let html = '<table class="enc-taula enc-taula--ppcc" id="enc-taula">';
  for (let r = 0; r < p.rows; r++) {
    html += '<tr>';
    for (let c = 0; c < p.cols; c++) {
      const t = p.grid_tipus[r][c];
      const num = p.grid_nums[r][c];
      if (t === 'M') {
        html += `<td class="enc-cel enc-cel--maro"></td>`;
      } else if (t === 'B') {
        html += `<td class="enc-cel enc-cel--blau"></td>`;
      } else {
        const userLl = encUserGrid[r]?.[c] || '';
        html += `<td class="enc-cel enc-cel--juga" data-r="${r}" data-c="${c}">
          ${num ? `<span class="enc-num">${num}</span>` : ''}
          <span class="enc-lletra">${userLl}</span>
        </td>`;
      }
    }
    html += '</tr>';
  }
  html += '</table>';
  return html;
}

function encNumCel(r, c) {
  // Per a graelles 10x10: la numeració va correlativa per les caselles
  // que inicien un mot (primera casella d'una paraula H o V)
  const p = encPuzzle;
  if (p.tipus === 'ppcc') return p.grid_nums[r][c];

  const N = p.mida;
  const esCasella = (rr, cc) => rr >= 0 && rr < N && cc >= 0 && cc < N && p.grid[rr][cc] !== null;

  // Inicia H si el de l'esquerra és negre/fora i el de la dreta és jugable
  const iniciH = esCasella(r, c) && !esCasella(r, c - 1) && esCasella(r, c + 1);
  // Inicia V si el de dalt és negre/fora i el de baix és jugable
  const iniciV = esCasella(r, c) && !esCasella(r - 1, c) && esCasella(r + 1, c);

  if (!iniciH && !iniciV) return null;

  // Calcular número ordinal (caselles que comencen un mot, en ordre)
  let n = 0;
  for (let rr = 0; rr < N; rr++) {
    for (let cc = 0; cc < N; cc++) {
      if (!esCasella(rr, cc)) continue;
      const iH = !esCasella(rr, cc - 1) && esCasella(rr, cc + 1);
      const iV = !esCasella(rr - 1, cc) && esCasella(rr + 1, cc);
      if (iH || iV) {
        n++;
        if (rr === r && cc === c) return n;
      }
    }
  }
  return null;
}

// ══════════════════════════════════════════════════════════════
//  INTERACCIÓ
// ══════════════════════════════════════════════════════════════

function encAfegirListeners() {
  const taula = document.getElementById('enc-taula');
  if (!taula) return;

  taula.addEventListener('click', e => {
    const cel = e.target.closest('[data-r]');
    if (!cel) return;
    const r = +cel.dataset.r;
    const c = +cel.dataset.c;

    if (encCelActiva && encCelActiva.r === r && encCelActiva.c === c) {
      // Clic a la mateixa cel·la: canviar direcció
      encDireccio = encDireccio === 'H' ? 'V' : 'H';
    } else {
      encCelActiva = { r, c };
    }
    encActualitzarActiva();
    encMostrarClue();
  });

  // Teclat
  document.addEventListener('keydown', encOnKey);
}

function encOnKey(e) {
  if (!encCelActiva || encCompletada) return;
  const { r, c } = encCelActiva;

  if (e.key === 'Backspace' || e.key === 'Delete') {
    encUserGrid[r][c] = '';
    encActualitzarCel(r, c);
    encGuardarProgres();
    return;
  }

  if (e.key === 'ArrowRight') { encMoureCursor(0, 1); return; }
  if (e.key === 'ArrowLeft')  { encMoureCursor(0, -1); return; }
  if (e.key === 'ArrowDown')  { encMoureCursor(1, 0); return; }
  if (e.key === 'ArrowUp')    { encMoureCursor(-1, 0); return; }
  if (e.key === 'Tab') { e.preventDefault(); encMoureCursor(encDireccio==='H'?0:1, encDireccio==='H'?1:0); return; }

  // Lletra
  const ll = e.key.toUpperCase();
  if (/^[A-ZÀ-ÿ·L·L]$/.test(ll) || ll === '·') {
    encUserGrid[r][c] = ll;
    encActualitzarCel(r, c);
    encGuardarProgres();
    // Avançar automàticament
    if (encDireccio === 'H') encMoureCursor(0, 1);
    else encMoureCursor(1, 0);
  }
}

function encMoureCursor(dr, dc) {
  if (!encCelActiva) return;
  const { r, c } = encCelActiva;
  const nr = r + dr;
  const nc = c + dc;
  const cel = document.querySelector(`[data-r="${nr}"][data-c="${nc}"]`);
  if (cel) {
    encCelActiva = { r: nr, c: nc };
    encActualitzarActiva();
    encMostrarClue();
  }
}

function encActualitzarActiva() {
  document.querySelectorAll('.enc-cel--activa, .enc-cel--mot').forEach(el => {
    el.classList.remove('enc-cel--activa', 'enc-cel--mot');
  });
  if (!encCelActiva) return;
  const { r, c } = encCelActiva;
  const cel = document.querySelector(`[data-r="${r}"][data-c="${c}"]`);
  if (cel) cel.classList.add('enc-cel--activa');

  // Ressaltar el mot complet
  const mot = encGetMotActiu();
  if (mot) {
    mot.cels.forEach(([rr, cc]) => {
      const el = document.querySelector(`[data-r="${rr}"][data-c="${cc}"]`);
      if (el) el.classList.add('enc-cel--mot');
    });
  }
}

function encGetMotActiu() {
  if (!encCelActiva) return null;
  const { r, c } = encCelActiva;
  const p = encPuzzle;

  function esJuga(rr, cc) {
    if (p.tipus === 'ppcc') {
      return rr >= 0 && rr < p.rows && cc >= 0 && cc < p.cols && p.grid_tipus[rr][cc] === 'P';
    }
    return rr >= 0 && rr < p.mida && cc >= 0 && cc < p.mida && p.grid[rr][cc] !== null;
  }

  if (encDireccio === 'H') {
    // Trobar inici
    let cc = c;
    while (esJuga(r, cc - 1)) cc--;
    const cels = [];
    while (esJuga(r, cc)) { cels.push([r, cc]); cc++; }
    return { cels };
  } else {
    let rr = r;
    while (esJuga(rr - 1, c)) rr--;
    const cels = [];
    while (esJuga(rr, c)) { cels.push([rr, c]); rr++; }
    return { cels };
  }
}

function encActualitzarCel(r, c) {
  const cel = document.querySelector(`[data-r="${r}"][data-c="${c}"]`);
  if (!cel) return;
  const ll = cel.querySelector('.enc-lletra');
  if (ll) ll.textContent = encUserGrid[r]?.[c] || '';
  cel.classList.remove('enc-cel--error', 'enc-cel--ok');
}

function encMostrarClue() {
  if (!encCelActiva) return;
  const clue = document.getElementById('enc-defs-clue');
  if (!clue) return;

  const mot = encGetMotActiu();
  if (!mot || mot.cels.length < 2) { clue.textContent = 'Selecciona una casella'; return; }

  const p = encPuzzle;
  let numDef = null;

  if (p.tipus === 'ppcc') {
    // PPCC: usem grid_nums
    const [r0, c0] = mot.cels[0];
    numDef = p.grid_nums[r0][c0];
  } else {
    // 10x10: el número de definició és l'ordre del mot en la graella
    // Comptem quants mots hi ha abans del mot actiu
    const [r0, c0] = mot.cels[0];
    numDef = encOrdreMotHV(r0, c0, encDireccio);
  }

  if (!numDef) { clue.textContent = '—'; return; }

  const defs = encDireccio === 'H' ? p.hdef : p.vdef;
  const def = defs.find(d => {
    const n = parseInt(d);
    return n === numDef;
  });
  clue.textContent = def || '—';

  // Ressaltar
  document.querySelectorAll('.enc-def-item--actiu').forEach(el => el.classList.remove('enc-def-item--actiu'));
  const listId = encDireccio === 'H' ? 'enc-hdef-list' : 'enc-vdef-list';
  const list = document.getElementById(listId);
  if (list) {
    list.querySelectorAll('.enc-def-item').forEach(item => {
      if (parseInt(item.textContent) === numDef) {
        item.classList.add('enc-def-item--actiu');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
}

function encOrdreMotHV(r0, c0, dir) {
  // Per graelles 10x10: les definicions es numeren per fila (H) i per columna (V)
  // H1 = fila 1, H5 = fila 5, V3 = columna 3, etc.
  // Retornem simplement r0+1 (H) o c0+1 (V), però hem de trobar la fila/columna
  // on COMENÇA el mot (pot ser que la cel·la activa no sigui l'inici)
  if (dir === 'H') return r0 + 1;
  return c0 + 1;
}

function encNumCelAny(r, c) {
  if (encPuzzle.tipus === 'ppcc') return encPuzzle.grid_nums[r][c];
  return encNumCel(r, c);
}

function encClickDef(dir, idx) {
  encDireccio = dir;
  const def = (dir === 'H' ? encPuzzle.hdef : encPuzzle.vdef)[idx];
  const num = parseInt(def);
  if (!num) return;

  const p = encPuzzle;
  if (p.tipus === 'ppcc') {
    for (let r = 0; r < p.rows; r++) {
      for (let c = 0; c < p.cols; c++) {
        if (p.grid_nums[r][c] === num) {
          encCelActiva = { r, c };
          encActualitzarActiva();
          encMostrarClue();
          return;
        }
      }
    }
  } else {
    // 10x10: num = número de fila (H) o columna (V)
    const N = p.mida;
    if (dir === 'H') {
      // Trobar primera casella jugable de la fila num-1
      const r = num - 1;
      for (let c = 0; c < N; c++) {
        if (p.grid[r][c] !== null) {
          encCelActiva = { r, c };
          encActualitzarActiva();
          encMostrarClue();
          return;
        }
      }
    } else {
      // Trobar primera casella jugable de la columna num-1
      const c = num - 1;
      for (let r = 0; r < N; r++) {
        if (p.grid[r][c] !== null) {
          encCelActiva = { r, c };
          encActualitzarActiva();
          encMostrarClue();
          return;
        }
      }
    }
  }
}

function encEsborrarCel() {
  if (!encCelActiva) return;
  const { r, c } = encCelActiva;
  encUserGrid[r][c] = '';
  encActualitzarCel(r, c);
  encGuardarProgres();
}

// ══════════════════════════════════════════════════════════════
//  VALIDACIÓ
// ══════════════════════════════════════════════════════════════

function encValidar() {
  if (encCompletada) return;

  const p = encPuzzle;
  let errorsN = 0;
  let totals = 0;
  let correctes = 0;

  function solucio(r, c) {
    if (p.tipus === 'ppcc') return p.grid_sol[r][c];
    return p.grid[r][c];
  }

  function esJuga(r, c) {
    if (p.tipus === 'ppcc') return p.grid_tipus[r][c] === 'P' && p.grid_sol[r][c] !== null;
    return p.grid[r][c] !== null;
  }

  const rows = p.tipus === 'ppcc' ? p.rows : p.mida;
  const cols = p.tipus === 'ppcc' ? p.cols : p.mida;

  // Netejar marques anteriors
  document.querySelectorAll('.enc-cel--error, .enc-cel--ok').forEach(el =>
    el.classList.remove('enc-cel--error', 'enc-cel--ok')
  );

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!esJuga(r, c)) continue;
      totals++;
      const sol = solucio(r, c);
      if (!sol) continue; // casella sense solució definida (PPCC pendents)
      const user = (encUserGrid[r]?.[c] || '').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const solN = sol.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const cel = document.querySelector(`[data-r="${r}"][data-c="${c}"]`);
      if (user === solN) {
        correctes++;
        if (cel) cel.classList.add('enc-cel--ok');
      } else {
        errorsN++;
        if (cel) cel.classList.add('enc-cel--error');
      }
    }
  }

  if (errorsN === 0) {
    // Completada!
    encCompletada = true;
    const pts = ENC_PTS[encIntents] || 50;
    encGuardarCompletada(pts);
    encMostrarFinal(pts);
  } else {
    encIntents++;
    if (encIntents >= 3) {
      // 3 intents esgotats: revelar solució, 0 pts
      encCompletada = true;
      encGuardarCompletada(0);
      encRevelarSolucio();
      encMostrarFinal(0);
    } else {
      encGuardarProgres();
      // Feedback errors
      const panel = document.getElementById('enc-defs-panel');
      if (panel) {
        const missatge = document.createElement('div');
        missatge.className = 'enc-error-msg';
        missatge.textContent = `${errorsN} error${errorsN > 1 ? 's' : ''} detectat${errorsN > 1 ? 's' : ''}. ${encIntents < 2 ? `Et queda ${2 - encIntents + 1} intents.` : 'Últim intent!'}`;
        panel.appendChild(missatge);
        setTimeout(() => missatge.remove(), 3000);
      }
    }
  }
}

function encRevelarSolucio() {
  const p = encPuzzle;
  const rows = p.tipus === 'ppcc' ? p.rows : p.mida;
  const cols = p.tipus === 'ppcc' ? p.cols : p.mida;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const sol = p.tipus === 'ppcc' ? p.grid_sol?.[r]?.[c] : p.grid?.[r]?.[c];
      if (sol) {
        encUserGrid[r][c] = sol;
        encActualitzarCel(r, c);
      }
    }
  }
}

function encMostrarFinal(pts) {
  const cont = document.getElementById('encreuats-joc-cont');
  const nom = encPuzzle.tipus === 'ppcc' ? `PP.CC. #${encPuzzle.id}` : `Encreuat #${encPuzzle.id}`;
  const icon = pts === 0 ? '😅' : pts === 150 ? '🎉' : '✅';
  const msg = pts === 0 ? 'Solució revelada · 0 punts' : `${pts} punts!`;

  // Afegir targeta de resultat al final
  const res = document.createElement('div');
  res.className = 'enc-resultat';
  res.innerHTML = `
    <div class="nono-res-icon">${icon}</div>
    <div class="nono-res-msg">${msg}</div>
    <div class="nono-res-sub">${nom} completat${encIntents > 0 ? ` · ${encIntents} validació${encIntents > 1 ? 'ns' : ''} fallida${encIntents > 1 ? 'es' : ''}` : ''}</div>
    <button class="jm-btn-seguent" onclick="encGuardarITornar()">← Tornar als encreuats</button>
  `;
  const wrap = cont.querySelector('.enc-joc-wrap');
  if (wrap) wrap.appendChild(res);
}

// ══════════════════════════════════════════════════════════════
//  NAVEGACIÓ
// ══════════════════════════════════════════════════════════════

function encGuardarITornar() {
  document.removeEventListener('keydown', encOnKey);
  encGuardarProgres();
  encCarregarEstat();
  mostraScreen('encreuats-selector');
  encRenderSelector();
}
