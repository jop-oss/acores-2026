// ══════════════════════════════════════════════════════════════
//  EL PENJAT — Joc individual amb puntuació
// ══════════════════════════════════════════════════════════════

// ── CONSTANTS ─────────────────────────────────────────────────
const PJ_MAX_ERRORS  = 6;
const PJ_PTS_OK      = 50;
const PJ_PTS_PISTA   = 10;   // penalització si s'usa pista
const PJ_TEMPS_SEG   = 120;
const PJ_N_PROVES    = 15;

// Lletres del teclat català (sense Ñ)
const PJ_LLETRES = [
  'A','B','C','Ç','D','E','F','G','H','I',
  'J','K','L','M','N','O','P','Q','R',
  'S','T','U','V','W','X','Y','Z'
];

// Signes que es mostren directament (no cal endevinar)
const PJ_SIGNES = new Set([' ', "'", '-', '.', ',', '!', '?', '·', '/', '(', ')']);

// ── ESTAT LOCAL ────────────────────────────────────────────────
let pjPartida      = null;
let pjTimerInterval = null;
let pjTempsRestant = PJ_TEMPS_SEG;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
async function iniciarPenjat() {
  if (!jugadorActiu) { mostraScreen('joc-selector'); return; }
  mostraScreen('penjat-inici');
  const contInicial = document.getElementById('penjat-inici-cont');
  if (contInicial) contInicial.innerHTML = '<div class="joc-carregant">Carregant…</div>';
  const dades = await jocFsCarregar(PJ_COL, jugadorActiu);
  if (dades) {
    pjPartida = dades;
  } else {
    pjPartida = pjGenerarPartida();
    pjGuardarPartida();
  }
  pjRenderInici();
}

// ── GENERAR PARTIDA ───────────────────────────────────────────
function pjGenerarPartida() {
  const assignades = [];
  for (const [cat, n] of Object.entries(PENJAT_DIST)) {
    const pool = pjBarrejar(PENJAT_PARAULES.filter(p => p.categoria === cat));
    pool.slice(0, n).forEach(p => assignades.push(p));
  }
  return {
    proves: pjBarrejar(assignades),  // ordre aleatori
    respostes: [],
    punts: 0,
    provaActual: 0,
    acabada: false,
  };
}

// ── PANTALLA INICI ────────────────────────────────────────────
function pjRenderInici() {
  const cont = document.getElementById('penjat-inici-cont');
  if (!cont) return;

  const fetes   = pjPartida.respostes.length;
  const pendent = PJ_N_PROVES - fetes;

  if (pjPartida.acabada) {
    cont.innerHTML = `
      <div class="cl-inici-layout">
        <div class="cl-inici-main">
          <div class="joc-titol-fila" style="align-items:center">
            <span class="joc-titol-emoji">🪢</span>
            <span class="joc-titol-text">El Penjat</span>
          </div>
          <div class="cl-inici-acabat">
            <div class="cl-inici-emoji">🏆</div>
            <div class="cl-inici-titol">Partida completada!</div>
            <div class="cl-inici-pts">${pjPartida.punts} pts</div>
            <div class="cl-inici-sub">${fetes} proves completades</div>
          </div>
        </div>
        <div class="ranking-wrap">
          <div class="ranking-title">🏆 Rànquing</div>
          <div class="ranking-list-home" id="penjat-ranking-list"><div class="ranking-loading">Carregant…</div></div>
        </div>
      </div>`;
    pjRenderRanquing();
    return;
  }

  const progres = fetes > 0 ? `
    <div class="cl-progres"><div class="cl-progres-bar" style="width:${Math.round(fetes/PJ_N_PROVES*100)}%"></div></div>
    <div class="cl-progres-txt">${fetes}/${PJ_N_PROVES} proves · ${pjPartida.punts} pts</div>` : '';

  cont.innerHTML = `
    <div class="cl-inici-layout">
      <div class="cl-inici-main">
        <div class="joc-titol-fila" style="align-items:center">
          <span class="joc-titol-emoji">🪢</span>
          <span class="joc-titol-text">El Penjat</span>
        </div>
        <div class="cl-inici-jugador">
          <img src="${IMGS[jugadorActiu] || ''}" alt="${jugadorActiu}">
          <div class="cl-inici-jugador-info">
            <span class="cl-inici-jugador-nom">${jugadorActiu}</span>
            <span class="cl-inici-jugador-pts">${pjPartida.punts} pts</span>
          </div>
        </div>
        <div class="cl-inici-bloc" style="width:100%;text-align:center">
          <div class="cl-inici-bloc-icon">🪢</div>
          <div class="cl-inici-bloc-nom">El Penjat</div>
          <div class="cl-inici-bloc-desc">${PJ_N_PROVES} paraules/frases · ${PJ_MAX_ERRORS} errors màxim · 2 minuts</div>
        </div>
        ${progres}
        <button class="cl-btn-primari" onclick="pjComençar()">
          ${fetes > 0 ? 'Continuar' : 'Començar'}
        </button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏆 Rànquing</div>
        <div class="ranking-list-home" id="penjat-ranking-list"><div class="ranking-loading">Carregant…</div></div>
      </div>
    </div>`;
  pjRenderRanquing();
}

function pjRenderRanquing() {
  const el = document.getElementById('penjat-ranking-list');
  if (!el) return;
  const pts = pjGetPuntsGlobals();
  const llista = JUGADORS_VALIDS.map(nom => ({ nom, punts: pts[nom] || 0 })).sort((a,b) => b.punts - a.punts);
  const maxPts = llista[0]?.punts || 1;
  const posEmoji = ['🥇','🥈','🥉'];
  el.innerHTML = llista.map((r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
      <div class="ranking-pos ${i < 3 ? 'p'+(i+1) : 'other'}">${i < 3 ? posEmoji[i] : i+1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom] || ''}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div class="rank-barra-wrap"><div class="rank-barra" style="width:${Math.round((r.punts/maxPts)*100)}%"></div></div>
      </div>
      <div class="rank-punts">${r.punts}</div>
    </div>`).join('');
}

function pjComençar() {
  pjIniciarProva(pjPartida.provaActual);
}

// ── NAVEGACIÓ ENTRE PROVES ────────────────────────────────────
function pjSeguent() {
  const idx = pjPartida.provaActual;
  if (idx >= PJ_N_PROVES) { pjFinalitzar(); return; }
  pjMostraResultatIntermi(idx);
}

function pjMostraResultatIntermi(idx) {
  // Pantalla intermèdia entre proves (amb botó sortir)
  mostraScreen('penjat-intro');
  const cont = document.getElementById('penjat-intro-cont');
  if (!cont) return;
  cont.innerHTML = `
    <button class="cl-btn-tancar" onclick="pjTancar()">✕</button>
    <div class="cl-intro-num">Prova ${idx + 1} de ${PJ_N_PROVES}</div>
    <div class="cl-intro-tipus">🪢 El Penjat</div>
    <div class="cl-intro-desc">Endevina la paraula o frase lletra a lletra</div>
    <button class="cl-btn-primari" onclick="pjIniciarProva(${idx})">Començar</button>`;
}

function pjTancar() {
  pjAturarTimer();
  pjGuardarPartida();
  mostraScreen('joc-selector');
}

// ── PROVA ─────────────────────────────────────────────────────
function pjIniciarProva(idx) {
  const prova = pjPartida.proves[idx];
  mostraScreen('penjat-joc');

  document.getElementById('pj-num-prova').textContent = `Prova ${idx + 1} de ${PJ_N_PROVES}`;

  // Estat de la prova (en memòria durant la prova)
  window._pjEstat = {
    paraula:      prova.paraula,
    categoria:    prova.categoria,
    errors:       0,
    lletresUsades: new Set(),
    pistaUsada:   false,
  };

  pjRenderJoc();
  pjAturarTimer();
  pjIniciarTimer(() => pjAcabarProva(false, true));
}

function pjRenderJoc() {
  const estat = window._pjEstat;
  if (!estat) return;

  // ── Gallows SVG ──────────────────────────────────────────
  const parts = [
    // cap
    `<circle cx="75" cy="38" r="10" stroke="var(--error)" stroke-width="2.5" fill="none"/>`,
    // cos
    `<line x1="75" y1="48" x2="75" y2="85" stroke="var(--error)" stroke-width="2.5" stroke-linecap="round"/>`,
    // braç esquerre
    `<line x1="75" y1="60" x2="55" y2="75" stroke="var(--error)" stroke-width="2.5" stroke-linecap="round"/>`,
    // braç dret
    `<line x1="75" y1="60" x2="95" y2="75" stroke="var(--error)" stroke-width="2.5" stroke-linecap="round"/>`,
    // cama esquerra
    `<line x1="75" y1="85" x2="58" y2="108" stroke="var(--error)" stroke-width="2.5" stroke-linecap="round"/>`,
    // cama dreta
    `<line x1="75" y1="85" x2="92" y2="108" stroke="var(--error)" stroke-width="2.5" stroke-linecap="round"/>`,
  ];

  const figuraParts = parts.slice(0, estat.errors).join('');

  document.getElementById('pj-gallows').innerHTML = `
    <svg width="130" height="150" viewBox="0 0 130 150" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="140" x2="120" y2="140" stroke="var(--text2)" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="30" y1="140" x2="30" y2="10"  stroke="var(--text2)" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="30" y1="10"  x2="75" y2="10"  stroke="var(--text2)" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="75" y1="10"  x2="75" y2="28"  stroke="var(--text2)" stroke-width="2"   stroke-linecap="round"/>
      ${figuraParts}
    </svg>`;

  // ── Paraula ───────────────────────────────────────────────
  const paraula = estat.paraula;
  // Normalitza per comparar (sense accents)
  const celSVG = [...paraula].map(ch => {
    if (PJ_SIGNES.has(ch)) {
      // Signe visible sempre
      return `<div class="pj-lletra-wrap pj-signe"><span class="pj-lletra-char">${ch === ' ' ? '&nbsp;' : ch}</span></div>`;
    }
    const normalCh = pjNormalitza(ch);
    const encertada = estat.lletresUsades.has(normalCh);
    return `<div class="pj-lletra-wrap">
      <span class="pj-lletra-char">${encertada ? ch : '&nbsp;'}</span>
      <div class="pj-lletra-linia"></div>
    </div>`;
  }).join('');
  document.getElementById('pj-paraula').innerHTML = celSVG;

  // ── Comptador errors ──────────────────────────────────────
  document.getElementById('pj-errors').textContent = `${estat.errors} / ${PJ_MAX_ERRORS} errors`;

  // ── Teclat ────────────────────────────────────────────────
  document.getElementById('pj-teclat').innerHTML = PJ_LLETRES.map(l => {
    const norm = pjNormalitza(l);
    const usada = estat.lletresUsades.has(norm);
    // Encertada o fallada?
    let cls = 'pj-tecla';
    if (usada) {
      const encert = [...paraula].some(ch => pjNormalitza(ch) === norm);
      cls += encert ? ' pj-tecla-ok' : ' pj-tecla-err';
    }
    return `<button class="${cls}" onclick="pjPremerLletra('${l}')" ${usada ? 'disabled' : ''}>${l}</button>`;
  }).join('');

  // ── Botó pista ────────────────────────────────────────────
  const mostrarPista = estat.errors >= PJ_MAX_ERRORS - 1 && !estat.pistaUsada;
  document.getElementById('pj-btn-pista').style.display = mostrarPista ? 'inline-flex' : 'none';
}

function pjPremerLletra(lletra) {
  const estat = window._pjEstat;
  if (!estat) return;
  const norm = pjNormalitza(lletra);
  if (estat.lletresUsades.has(norm)) return;

  estat.lletresUsades.add(norm);

  // Comprova si la lletra és a la paraula
  const encert = [...estat.paraula].some(ch => !PJ_SIGNES.has(ch) && pjNormalitza(ch) === norm);
  if (!encert) estat.errors++;

  // Comprova victòria
  const guanyat = [...estat.paraula].every(ch => PJ_SIGNES.has(ch) || estat.lletresUsades.has(pjNormalitza(ch)));
  const perdut  = estat.errors >= PJ_MAX_ERRORS;

  pjRenderJoc();

  if (guanyat || perdut) {
    pjAturarTimer();
    setTimeout(() => pjAcabarProva(guanyat, false), 600);
  }
}

function pjUsarPista() {
  const estat = window._pjEstat;
  if (!estat || estat.pistaUsada) return;
  estat.pistaUsada = true;
  document.getElementById('pj-btn-pista').style.display = 'none';
  document.getElementById('pj-pista-text').textContent = `Pista: ${estat.categoria}`;
  document.getElementById('pj-pista-text').style.display = 'block';
}

function pjAcabarProva(guanyat, timeout) {
  pjAturarTimer();
  const estat = window._pjEstat;
  if (!estat) return;

  let pts = 0;
  if (guanyat) {
    pts = PJ_PTS_OK - (estat.pistaUsada ? PJ_PTS_PISTA : 0);
  }

  pjPartida.respostes.push({
    idx: pjPartida.provaActual,
    paraula: estat.paraula,
    guanyat,
    timeout,
    pistaUsada: estat.pistaUsada,
    pts,
  });
  pjPartida.punts += pts;
  pjPartida.provaActual++;
  pjGuardarPartida();

  // Pantalla intermèdia
  pjMostraResultatProva(guanyat, timeout, estat.paraula, pts, estat.categoria);
}

function pjMostraResultatProva(guanyat, timeout, paraula, pts, categoria) {
  mostraScreen('penjat-resultat-prova');
  const cont = document.getElementById('penjat-resultat-prova-cont');
  const idx   = pjPartida.provaActual;
  const total = PJ_N_PROVES;

  let icona, titol, cls;
  if (guanyat) {
    icona = '🎉'; titol = 'Encertat!'; cls = 'cl-feedback-ok';
  } else if (timeout) {
    icona = '⏱'; titol = 'Temps esgotat!'; cls = 'cl-feedback-warn';
  } else {
    icona = '💀'; titol = 'Penjat!'; cls = 'cl-feedback-error';
  }

  const restaProves = total - idx;

  cont.innerHTML = `
    <button class="cl-btn-tancar cl-btn-tancar-abs" onclick="pjTancar()">✕</button>
    <div class="pj-resultat-icon">${icona}</div>
    <div class="pj-resultat-titol ${cls}">${titol}</div>
    <div class="pj-resultat-paraula">${paraula}</div>
    <div class="pj-resultat-pts">${pts > 0 ? '+' + pts + ' pts' : '0 pts'}</div>
    ${!guanyat ? `<div class="cl-feedback-hint">Categoria: <strong>${categoria}</strong></div>` : ''}
    ${restaProves > 0
      ? `<button class="cl-btn-primari" onclick="pjIniciarProva(${idx})">Prova ${idx + 1} →</button>`
      : `<button class="cl-btn-primari" onclick="pjFinalitzar()">Veure resultats finals</button>`
    }`;
}

// ── FINALITZAR ────────────────────────────────────────────────
function pjFinalitzar() {
  pjPartida.acabada = true;
  pjGuardarPartida();
  mostraScreen('penjat-resultat-final');

  const cont = document.getElementById('penjat-resultat-final-cont');
  const maxPts = PJ_N_PROVES * PJ_PTS_OK;

  const detall = pjPartida.respostes.map((r, i) => `
    <tr>
      <td>Prova ${i+1}</td>
      <td style="max-width:280px;overflow:hidden;text-overflow:ellipsis">${r.paraula}</td>
      <td>${r.guanyat ? '✅' : r.timeout ? '⏱' : '❌'}${r.pistaUsada ? ' 💡' : ''}</td>
      <td class="${r.pts > 0 ? 'cl-pts-ok' : 'cl-pts-zero'}">${r.pts} pts</td>
    </tr>`).join('');

  cont.innerHTML = `
    <div class="cl-resultat-total">
      <div class="cl-resultat-num">${pjPartida.punts}</div>
      <div class="cl-resultat-sub">pts de ${maxPts} màxims</div>
    </div>
    <table class="cl-taula-detall">
      <thead><tr><th>#</th><th>Paraula/Frase</th><th>Resultat</th><th>Punts</th></tr></thead>
      <tbody>${detall}</tbody>
    </table>
    <button class="cl-btn-primari" onclick="mostraScreen('joc-selector')">Tornar als jocs</button>`;
}

// ── TIMER ──────────────────────────────────────────────────────
function pjIniciarTimer(onExpira) {
  pjTempsRestant = PJ_TEMPS_SEG;
  const el = document.getElementById('pj-timer');
  const actualitzar = () => {
    if (!el) return;
    const m = Math.floor(pjTempsRestant / 60);
    const s = pjTempsRestant % 60;
    el.textContent = m > 0 ? `${m}:${s.toString().padStart(2,'0')}` : `${s}s`;
    el.className = 'cl-timer' + (pjTempsRestant <= 10 ? ' urgent' : '');
  };
  actualitzar();
  pjTimerInterval = setInterval(() => {
    pjTempsRestant--;
    actualitzar();
    if (pjTempsRestant <= 0) { pjAturarTimer(); onExpira(); }
  }, 1000);
}

function pjAturarTimer() {
  if (pjTimerInterval) { clearInterval(pjTimerInterval); pjTimerInterval = null; }
}

// ── PERSISTÈNCIA ──────────────────────────────────────────────
const PJ_COL = 'penjat_punts';

function pjGuardarPartida() {
  jocFsDesar(PJ_COL, jugadorActiu, pjPartida);
}

async function pjGetPuntsGlobals() {
  const dades = await jocFsCarregarTots(PJ_COL, JUGADORS_VALIDS);
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => {
    pts[nom] = (dades[nom] && dades[nom].punts) || 0;
  });
  return pts;
}

// ── UTILS ──────────────────────────────────────────────────────
function pjNormalitza(ch) {
  return ch.toUpperCase()
    .replace(/[ÀÁÂÄ]/g, 'A')
    .replace(/[ÈÉÊË]/g, 'E')
    .replace(/[ÌÍÎÏ]/g, 'I')
    .replace(/[ÒÓÔÖ]/g, 'O')
    .replace(/[ÙÚÛÜ]/g, 'U')
    .replace(/[·L]/g, 'L');  // l·l → L
  // Ç es manté com a Ç (lletra pròpia del teclat)
}

function pjBarrejar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
