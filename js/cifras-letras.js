// ══════════════════════════════════════════════════════════════
//  CIFRAS Y LETRAS — Joc individual amb puntuació
// ══════════════════════════════════════════════════════════════

// ── CONSTANTS ─────────────────────────────────────────────────
const CL_NUMS_GRANS  = [25, 50, 75, 100];
const CL_NUMS_PETITS = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
const CL_N_GRANS     = 2;
const CL_N_PETITS    = 4;
const CL_TEMPS_SEG   = 60;
const CL_N_LLETRES   = 5;   // proves de lletres
const CL_N_XIFRES    = 10;  // proves de xifres

// Puntuació lletres
const CL_PTS_LLETRA  = 10;  // per lletra
const CL_PTS_BONUS   = 30;  // bonus paraula màxima

// Puntuació xifres
const CL_PTS_XIFRES = [
  { max: 0,   pts: 100 }, // exacte
  { max: 5,   pts: 70  },
  { max: 10,  pts: 50  },
  { max: 25,  pts: 30  },
  { max: 50,  pts: 10  },
  { max: Infinity, pts: 0 },
];

// ── ESTAT LOCAL ────────────────────────────────────────────────
let clPartida      = null;  // { provesLletres, provesXifres, provaActual, tipus, respostes, punts }
let clTimerInterval = null;
let clTempsRestant  = CL_TEMPS_SEG;

// Pissarra xifres
let clPissarra = [];        // [{tipus:'num'|'op'|'par', val, id}]
let clResultat  = null;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarCifrasLetras() {
  if (!jugadorActiu) { mostraScreen('joc-selector'); return; }
  const clau = `cl_estat_${jugadorActiu}`;
  const raw  = localStorage.getItem(clau);
  if (raw) {
    clPartida = JSON.parse(raw);
  } else {
    clPartida = clGenerarPartida();
    clGuardarPartida();
  }
  mostraScreen('cl-inici');
  clRenderInici();
}

// ── GENERAR PARTIDA ───────────────────────────────────────────
function clGenerarPartida() {
  // Assigna 5 combinacions de lletres aleatòries (sense repetir)
  const idxLletres = clBarrejar([...Array(CL_LLETRES.length).keys()])
    .slice(0, CL_N_LLETRES);

  // Genera 10 proves de xifres
  const provesXifres = Array.from({ length: CL_N_XIFRES }, () => clGenerarProvaXifres());

  return {
    provesLletres: idxLletres.map(i => ({
      idx:      i,
      lletres:  CL_LLETRES[i].lletres,
      maxLen:   CL_LLETRES[i].maxLen,
      paraules: CL_LLETRES[i].paraules,
    })),
    provesXifres,
    respostes: [],   // { tipus, prova, resposta, pts }
    punts: 0,
    provaActual: 0,  // 0-14 (0-4 lletres, 5-14 xifres)
    acabada: false,
  };
}

function clGenerarProvaXifres() {
  const grans  = clBarrejar([...CL_NUMS_GRANS]).slice(0, CL_N_GRANS);
  const petits = clBarrejar([...CL_NUMS_PETITS]).slice(0, CL_N_PETITS);
  const nums   = clBarrejar([...grans, ...petits]);
  const objectiu = Math.floor(Math.random() * 900) + 100; // 100-999
  return { nums, objectiu };
}

// ── PANTALLA INICI ────────────────────────────────────────────
function clRenderInici() {
  if (!clPartida) return;
  const cont = document.getElementById('cl-inici-cont');
  if (!cont) return;

  const totalProves = CL_N_LLETRES + CL_N_XIFRES;
  const fetes = clPartida.respostes.length;

  if (clPartida.acabada) {
    cont.innerHTML = `
      <div class="cl-inici-layout">
        <div class="cl-inici-main">
          <div class="joc-titol-fila" style="align-items:center">
            <span class="joc-titol-emoji">📝</span>
            <span class="joc-titol-text">Xifres i Lletres</span>
          </div>
          <div class="cl-inici-acabat">
            <div class="cl-inici-emoji">🏆</div>
            <div class="cl-inici-titol">Partida completada!</div>
            <div class="cl-inici-pts">${clPartida.punts} pts</div>
            <div class="cl-inici-sub">${fetes} proves completades</div>
          </div>
        </div>
        <div class="ranking-wrap">
          <div class="ranking-title">🏆 Rànquing</div>
          <div class="ranking-list-home" id="cl-ranking-list"><div class="ranking-loading">Carregant…</div></div>
        </div>
      </div>`;
    clRenderRanquingGlobal();
    return;
  }

  const jugadorAvatar = IMGS[jugadorActiu] || '';
  const progres = fetes > 0 ? `
    <div class="cl-progres">
      <div class="cl-progres-bar" style="width:${Math.round(fetes/totalProves*100)}%"></div>
    </div>
    <div class="cl-progres-txt">${fetes}/${totalProves} proves</div>
  ` : '';

  cont.innerHTML = `
    <div class="cl-inici-layout">
      <div class="cl-inici-main">
        <div class="joc-titol-fila" style="align-items:center">
          <span class="joc-titol-emoji">📝</span>
          <span class="joc-titol-text">Xifres i Lletres</span>
        </div>
        <div class="cl-inici-jugador">
          <img src="${jugadorAvatar}" alt="${jugadorActiu}">
          <div class="cl-inici-jugador-info">
            <span class="cl-inici-jugador-nom">${jugadorActiu}</span>
            <span class="cl-inici-jugador-pts">${clPartida.punts} pts</span>
          </div>
        </div>
        <div class="cl-inici-info">
          <div class="cl-inici-bloc">
            <div class="cl-inici-bloc-icon">🔤</div>
            <div class="cl-inici-bloc-nom">Lletres</div>
            <div class="cl-inici-bloc-desc">${CL_N_LLETRES} proves · 8 lletres · 1 minut</div>
          </div>
          <div class="cl-inici-bloc">
            <div class="cl-inici-bloc-icon">🔢</div>
            <div class="cl-inici-bloc-nom">Xifres</div>
            <div class="cl-inici-bloc-desc">${CL_N_XIFRES} proves · 6 números · 1 minut</div>
          </div>
        </div>
        ${progres}
        <button class="cl-btn-primari" onclick="clComençar()">
          ${fetes > 0 ? 'Continuar' : 'Començar'}
        </button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏆 Rànquing</div>
        <div class="ranking-list-home" id="cl-ranking-list"><div class="ranking-loading">Carregant…</div></div>
      </div>
    </div>`;

  clRenderRanquingGlobal();
}

function clRenderRanquingGlobal() {
  const el = document.getElementById('cl-ranking-list');
  if (!el) return;
  const pts = clGetPuntsGlobals();
  const llista = JUGADORS_VALIDS
    .map(nom => ({ nom, punts: pts[nom] || 0 }))
    .sort((a, b) => b.punts - a.punts);
  const maxPts = llista[0]?.punts || 1;
  const posEmoji = ['🥇', '🥈', '🥉'];
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

function clComençar() {
  clSeguent();
}

// ── NAVEGACIÓ ENTRE PROVES ────────────────────────────────────
function clSeguent() {
  const idx = clPartida.provaActual;
  const total = CL_N_LLETRES + CL_N_XIFRES;

  if (idx >= total) {
    clFinalitzar();
    return;
  }

  if (idx < CL_N_LLETRES) {
    clIniciarProvaLletres(idx);
  } else {
    clIniciarProvaXifres(idx - CL_N_LLETRES);
  }
}

// ── PROVA DE LLETRES ──────────────────────────────────────────
function clIniciarProvaLletres(idx) {
  const prova = clPartida.provesLletres[idx];
  mostraScreen('cl-lletres');

  document.getElementById('cl-lletres-num').textContent =
    `Prova ${idx + 1} de ${CL_N_LLETRES}`;
  document.getElementById('cl-lletres-maxpts').textContent =
    `Màx: ${prova.maxLen * CL_PTS_LLETRA + CL_PTS_BONUS} pts`;

  // Renderitza lletres disponibles
  clRenderLletres(prova.lletres.map((l, i) => ({ lletra: l, id: i, usada: false })));
  document.getElementById('cl-resposta').innerHTML = '';
  document.getElementById('cl-lletres-feedback').innerHTML = '';
  document.getElementById('cl-btn-enviar-lletres').disabled = true;

  clIniciarTimer('cl-lletres-timer', () => clEnviarLletres(true));
}

let clLletresDisp = [];

function clRenderLletres(lletres) {
  clLletresDisp = lletres;
  const cont = document.getElementById('cl-lletres-disp');
  cont.innerHTML = lletres.map(l => `
    <button class="cl-lletra ${l.usada ? 'usada' : ''}"
      onclick="clUsarLletra(${l.id})"
      ${l.usada ? 'disabled' : ''}>
      ${l.lletra}
    </button>`).join('');

  const resposta = document.getElementById('cl-resposta');
  const usades = lletres.filter(l => l.usada).map(l => l.lletra);
  resposta.innerHTML = usades.map((l, i) => `
    <button class="cl-lletra-resp" onclick="clRetornarLletra(${lletres.filter(l=>l.usada)[i].id})">
      ${l}
    </button>`).join('');

  document.getElementById('cl-btn-enviar-lletres').disabled = usades.length === 0;
}

function clUsarLletra(id) {
  const l = clLletresDisp.find(l => l.id === id);
  if (!l || l.usada) return;
  l.usada = true;
  clRenderLletres(clLletresDisp);
}

function clRetornarLletra(id) {
  const l = clLletresDisp.find(l => l.id === id);
  if (!l) return;
  l.usada = false;
  clRenderLletres(clLletresDisp);
}

function clEnviarLletres(timeout = false) {
  clAturarTimer();
  const idx = clPartida.provaActual;
  const prova = clPartida.provesLletres[idx];
  const paraula = clLletresDisp.filter(l => l.usada).map(l => l.lletra).join('');

  let pts = 0;
  let feedback = '';

  if (!paraula || timeout && !paraula) {
    feedback = `<div class="cl-feedback-error">Temps esgotat! 0 pts</div>`;
  } else {
    const valid = prova.paraules.includes(paraula.toUpperCase());
    if (!valid) {
      feedback = `<div class="cl-feedback-error">"${paraula}" no és vàlida. 0 pts</div>`;
    } else {
      pts = paraula.length * CL_PTS_LLETRA;
      const esMaxima = paraula.length === prova.maxLen;
      if (esMaxima) pts += CL_PTS_BONUS;
      feedback = `
        <div class="cl-feedback-ok">
          ✓ "${paraula}" · ${paraula.length} lletres · <strong>+${pts} pts</strong>
          ${esMaxima ? '<span class="cl-bonus">+30 bonus màxima!</span>' : ''}
        </div>`;
    }
  }

  // Mostra la paraula màxima si no l'ha trobat
  const maxima = prova.paraules.filter(p => p.length === prova.maxLen)[0];
  if (paraula.length < prova.maxLen) {
    feedback += `<div class="cl-feedback-hint">Paraula màxima: <strong>${maxima}</strong> (${prova.maxLen} lletres)</div>`;
  }

  document.getElementById('cl-lletres-feedback').innerHTML = feedback;
  document.getElementById('cl-btn-enviar-lletres').disabled = true;

  clPartida.respostes.push({ tipus: 'lletres', prova: idx, resposta: paraula, pts });
  clPartida.punts += pts;
  clPartida.provaActual++;
  clGuardarPartida();

  setTimeout(() => clSeguent(), 2500);
}

// ── PROVA DE XIFRES ───────────────────────────────────────────
function clIniciarProvaXifres(idx) {
  const prova = clPartida.provesXifres[idx];
  const provaGlobal = idx + CL_N_LLETRES;

  mostraScreen('cl-xifres');

  document.getElementById('cl-xifres-num').textContent =
    `Prova ${idx + 1} de ${CL_N_XIFRES}`;
  document.getElementById('cl-xifres-objectiu').textContent = prova.objectiu;

  clPissarra = [];
  clResultat = null;
  clRenderPissarra();
  clRenderNumsDisp(prova.nums.map((n, i) => ({ val: n, id: i, usada: false })));

  document.getElementById('cl-xifres-feedback').innerHTML = '';

  clIniciarTimer('cl-xifres-timer', () => clEnviarXifres(true));
}

let clNumsDisp = [];

function clRenderNumsDisp(nums) {
  clNumsDisp = nums;
  const cont = document.getElementById('cl-nums-disp');
  cont.innerHTML = nums.map(n => `
    <button class="cl-num-btn ${n.usada ? 'usada' : ''}"
      onclick="clUsarNum(${n.id})"
      ${n.usada ? 'disabled' : ''}>
      ${n.val}
    </button>`).join('');
}

function clUsarNum(id) {
  const n = clNumsDisp.find(n => n.id === id);
  if (!n || n.usada) return;
  n.usada = true;
  clPissarra.push({ tipus: 'num', val: n.val, id: `n${id}` });
  clRenderNumsDisp(clNumsDisp);
  clRenderPissarra();
}

function clUsarOp(op) {
  clPissarra.push({ tipus: 'op', val: op, id: `op${Date.now()}` });
  clRenderPissarra();
}

function clUsarPar(par) {
  clPissarra.push({ tipus: 'par', val: par, id: `par${Date.now()}` });
  clRenderPissarra();
}

function clEsborrarUltim() {
  if (!clPissarra.length) return;
  const ultim = clPissarra[clPissarra.length - 1];
  // Si era un número, allibera'l
  if (ultim.tipus === 'num') {
    const id = parseInt(ultim.id.replace('n', ''));
    const n = clNumsDisp.find(n => n.id === id);
    if (n) n.usada = false;
    clRenderNumsDisp(clNumsDisp);
  }
  clPissarra.pop();
  clRenderPissarra();
}

function clNetejaPissarra() {
  clPissarra = [];
  clResultat = null;
  clNumsDisp.forEach(n => n.usada = false);
  clRenderNumsDisp(clNumsDisp);
  clRenderPissarra();
}

function clRenderPissarra() {
  const cont = document.getElementById('cl-pissarra');
  if (!clPissarra.length) {
    cont.innerHTML = '<span class="cl-pissarra-buit">Arrossega números i operadors aquí</span>';
  } else {
    cont.innerHTML = clPissarra.map(t => `
      <span class="cl-token cl-token-${t.tipus}">${t.val}</span>`).join('');
  }

  // Mostra el resultat actual
  const res = clCalcular();
  const resCont = document.getElementById('cl-resultat-actual');
  if (res !== null) {
    resCont.textContent = `= ${res}`;
    resCont.className = 'cl-resultat-actual visible';
    clResultat = res;
  } else {
    resCont.textContent = '';
    resCont.className = 'cl-resultat-actual';
    clResultat = null;
  }
}

function clCalcular() {
  if (!clPissarra.length) return null;
  try {
    const expr = clPissarra.map(t => {
      if (t.tipus === 'op') {
        if (t.val === '×') return '*';
        if (t.val === '÷') return '/';
        if (t.val === '=') return ';'; // separador intermedi
        return t.val;
      }
      return t.val;
    }).join(' ');

    // Agafa l'últim segment (després de l'últim =)
    const segments = expr.split(';');
    const ultim = segments[segments.length - 1].trim();

    if (!ultim) return null;
    // Avalua de forma segura
    const resultat = Function('"use strict"; return (' + ultim + ')')();
    if (!Number.isFinite(resultat) || !Number.isInteger(resultat)) return null;
    return resultat;
  } catch {
    return null;
  }
}

function clEnviarXifres(timeout = false) {
  clAturarTimer();
  const idx = clPartida.provaActual - CL_N_LLETRES;
  const prova = clPartida.provesXifres[idx];

  let pts = 0;
  let feedback = '';

  if (clResultat === null || timeout && clResultat === null) {
    feedback = `<div class="cl-feedback-error">Cap resultat vàlid. 0 pts</div>`;
  } else {
    const diff = Math.abs(clResultat - prova.objectiu);
    for (const { max, pts: p } of CL_PTS_XIFRES) {
      if (diff <= max) { pts = p; break; }
    }
    const exact = diff === 0;
    feedback = `
      <div class="${exact ? 'cl-feedback-ok' : diff <= 25 ? 'cl-feedback-warn' : 'cl-feedback-error'}">
        ${exact ? '🎯 Exacte!' : `Resultat: ${clResultat} · Diferència: ${diff}`}
        · <strong>+${pts} pts</strong>
      </div>
      <div class="cl-feedback-hint">Objectiu: ${prova.objectiu}</div>`;
  }

  document.getElementById('cl-xifres-feedback').innerHTML = feedback;

  clPartida.respostes.push({
    tipus: 'xifres', prova: idx,
    resposta: clResultat, pts
  });
  clPartida.punts += pts;
  clPartida.provaActual++;
  clGuardarPartida();

  setTimeout(() => clSeguent(), 2500);
}

// ── FINALITZAR PARTIDA ────────────────────────────────────────
function clFinalitzar() {
  clPartida.acabada = true;
  clGuardarPartida();
  mostraScreen('cl-resultat');

  const cont = document.getElementById('cl-resultat-cont');
  const maxPts = CL_N_LLETRES * (8 * CL_PTS_LLETRA + CL_PTS_BONUS)
               + CL_N_XIFRES  * 100;

  const detallLletres = clPartida.respostes
    .filter(r => r.tipus === 'lletres')
    .map((r, i) => {
      const p = clPartida.provesLletres[i];
      return `<tr>
        <td>Lletres ${i+1}</td>
        <td>${p.lletres.join('')}</td>
        <td>${r.resposta || '—'}</td>
        <td class="${r.pts > 0 ? 'cl-pts-ok' : 'cl-pts-zero'}">${r.pts} pts</td>
      </tr>`;
    }).join('');

  const detallXifres = clPartida.respostes
    .filter(r => r.tipus === 'xifres')
    .map((r, i) => {
      const p = clPartida.provesXifres[i];
      return `<tr>
        <td>Xifres ${i+1}</td>
        <td>${p.objectiu}</td>
        <td>${r.resposta ?? '—'}</td>
        <td class="${r.pts > 0 ? 'cl-pts-ok' : 'cl-pts-zero'}">${r.pts} pts</td>
      </tr>`;
    }).join('');

  cont.innerHTML = `
    <div class="cl-resultat-total">
      <div class="cl-resultat-num">${clPartida.punts}</div>
      <div class="cl-resultat-sub">pts de ${maxPts} màxims</div>
    </div>
    <table class="cl-taula-detall">
      <thead><tr><th>Prova</th><th>Dades</th><th>Resposta</th><th>Punts</th></tr></thead>
      <tbody>${detallLletres}${detallXifres}</tbody>
    </table>
    <button class="cl-btn-primari" onclick="mostraScreen('joc-selector')">Tornar als jocs</button>`;
}

// ── TIMER ──────────────────────────────────────────────────────
function clIniciarTimer(elId, onExpira) {
  clAturarTimer();
  clTempsRestant = CL_TEMPS_SEG;
  const el = document.getElementById(elId);
  const actualitzar = () => {
    if (!el) return;
    el.textContent = clTempsRestant + 's';
    el.className = 'cl-timer' + (clTempsRestant <= 10 ? ' urgent' : '');
  };
  actualitzar();
  clTimerInterval = setInterval(() => {
    clTempsRestant--;
    actualitzar();
    if (clTempsRestant <= 0) {
      clAturarTimer();
      onExpira();
    }
  }, 1000);
}

function clAturarTimer() {
  if (clTimerInterval) { clearInterval(clTimerInterval); clTimerInterval = null; }
}

// ── PERSISTÈNCIA ──────────────────────────────────────────────
function clGuardarPartida() {
  localStorage.setItem(`cl_estat_${jugadorActiu}`, JSON.stringify(clPartida));
}

// ── PUNTS GLOBALS (per al rànquing) ───────────────────────────
function clGetPuntsGlobals() {
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => {
    const raw = localStorage.getItem(`cl_estat_${nom}`);
    pts[nom] = raw ? (JSON.parse(raw).punts || 0) : 0;
  });
  return pts;
}

// ── UTILS ──────────────────────────────────────────────────────
function clBarrejar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
