const MSG_OK   = ['🎉 Excel·lent!','⭐ Correcte!','🔥 Molt bé!','💪 Eso es!','🌋 Boom!'];
const MSG_ERR  = ['😅 Ups...','💀 Fallada!','😢 Oh no...','🤦 Ai ai ai...','😤 Mala sort!'];

// ── ESTAT GLOBAL ──────────────────────────────────────────────
let jugadorActiu = null;
let jocActiu = null;
let respost = false;

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderJugadorsGrid();
  mostraScreen('select');
});

// ── GRID DE JUGADORS ──────────────────────────────────────────
function renderJugadorsGrid() {
  const grid = document.getElementById('jugadors-grid');
  grid.innerHTML = JUGADORS_VALIDS.map(nom => {
    const estat = carregarEstatJugador(nom);
    const pts = estat ? estat.punts : 0;
    const prog = estat && !estat.completat ? `${estat.idx}/${PREGUNTES.length} preg.` : (estat && estat.completat ? 'Completat ✓' : 'Nou joc');
    return `
      <button class="jugador-btn" data-nom="${nom}" onclick="seleccionarJugador('${nom}')">
        <img class="jugador-avatar" src="${IMGS[nom]}" alt="${nom}">
        <span class="jugador-nom-btn">${nom}</span>
        <span class="jugador-pts">${pts} pts · ${prog}</span>
      </button>`;
  }).join('');
}

function seleccionarJugador(nom) {
  jugadorActiu = nom;
  document.querySelectorAll('.jugador-btn').forEach(b => {
    b.classList.toggle('selected', b.dataset.nom === nom);
  });
  entrarJoc();
}

function entrarJoc() {
  if (!jugadorActiu) return;
  document.getElementById('joc-selector-avatar').src = IMGS[jugadorActiu] || '';
  document.getElementById('joc-selector-nom').textContent = jugadorActiu;
  mostraScreen('joc-selector');
}

// ── SELECCIÓ MODE JOC ─────────────────────────────────────────
function seleccionarModeJoc(mode) {
  if (mode === 'quiz') {
    mostraScreen('start');
    renderStartScreen();
  } else if (mode === 'qui-que') {
    iniciarQuiQueSoc();
  } else if (mode === 'mapa') {
    mapaIniciarPantalla();
  }
}

// ══════════════════════════════════════════════════════════════
//  QUIZ
// ══════════════════════════════════════════════════════════════

function renderStartScreen() {
  const nom = jugadorActiu;
  const estat = carregarEstatJugador(nom);

  document.getElementById('jugador-actiu-avatar').src = IMGS[nom];
  document.getElementById('jugador-actiu-nom').textContent = nom;

  const progWrap = document.getElementById('progres-wrap');
  const btnReinici = document.getElementById('btn-reiniciar');
  const btnStart = document.getElementById('btn-start-joc');

  if (estat && !estat.completat && estat.idx > 0) {
    progWrap.style.display = 'block';
    const pct = (estat.idx / PREGUNTES.length) * 100;
    document.getElementById('progres-fill').style.width = pct + '%';
    document.getElementById('progres-text').textContent = `${estat.idx} de ${PREGUNTES.length} preguntes`;
    document.getElementById('progres-punts-text').textContent = `${estat.punts} pts`;
    document.getElementById('progres-badge').textContent = `Repren on ho vas deixar →`;
    btnStart.textContent = 'Continuar el Quiz ▶';
    btnReinici.style.display = 'block';
    document.getElementById('jugador-actiu-sub').textContent = `${estat.punts} punts · en curs`;
  } else if (estat && estat.completat) {
    progWrap.style.display = 'none';
    btnStart.textContent = 'Veure resultat 🏆';
    btnReinici.style.display = 'block';
    document.getElementById('jugador-actiu-sub').textContent = `${estat.punts} punts · completat`;
  } else {
    progWrap.style.display = 'none';
    btnStart.textContent = 'Comença el Quiz 🚀';
    btnReinici.style.display = 'none';
    document.getElementById('jugador-actiu-sub').textContent = 'Nou joc · 0 punts';
  }
  renderRanking();
}

function renderRanking() {
  const llista = JUGADORS_VALIDS.map(nom => {
    const estat = carregarEstatJugador(nom);
    return { nom, punts: estat ? estat.punts : 0, completat: estat ? estat.completat : false, idx: estat ? estat.idx : 0 };
  }).sort((a,b) => b.punts - a.punts);

  const posEmoji = ['🥇','🥈','🥉'];
  document.getElementById('ranking-list-home').innerHTML = llista.map((r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
      <div class="ranking-pos ${i<3?'p'+(i+1):'other'}">${i<3?posEmoji[i]:i+1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom]}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div class="rank-barra-wrap"><div class="rank-barra" style="width:${(r.punts/1000)*100}%"></div></div>
      </div>
      <div style="text-align:right">
        <div class="rank-punts">${r.punts}</div>
        <span class="rank-partides">${r.completat ? 'Completat ✓' : r.idx > 0 ? r.idx+'/100' : 'No iniciat'}</span>
      </div>
    </div>`).join('');
}

function iniciarJoc() {
  const estat = carregarEstatJugador(jugadorActiu);
  if (estat && estat.completat) { mostrarResultat(estat); return; }
  if (estat && estat.idx > 0 && !estat.completat) {
    jocActiu = estat;
  } else {
    const ordre = [...PREGUNTES].map(p => p.id).sort(() => Math.random() - 0.5);
    jocActiu = { jugador: jugadorActiu, ordre, idx: 0, punts: 0, encerts: 0, completat: false };
    guardarEstatJugador(jugadorActiu, jocActiu);
  }
  mostraScreen('quiz');
  mostrarPregunta();
}

function mostrarPregunta() {
  respost = false;
  const idPregunta = jocActiu.ordre[jocActiu.idx];
  const p = PREGUNTES.find(x => x.id === idPregunta);
  if (!p) return;

  const total = jocActiu.ordre.length;
  document.getElementById('prog-text').textContent = `Pregunta ${jocActiu.idx + 1} de ${total}`;
  document.getElementById('prog-cat').textContent = p.categoria;
  document.getElementById('prog-fill').style.width = `${(jocActiu.idx / total) * 100}%`;
  document.getElementById('score-live').textContent = jocActiu.punts;
  document.getElementById('q-cat').textContent = p.categoria;
  document.getElementById('q-dif').textContent = DIF_LABEL[p.dificultat];
  document.getElementById('q-dif').className = `q-dif ${p.dificultat}`;
  document.getElementById('q-pts').textContent = `+${PUNTS[p.dificultat]} pts`;
  document.getElementById('q-text').textContent = p.pregunta;

  const lletres = ['A','B','C','D','E'];
  document.getElementById('opcions').innerHTML = p.opcions.map((op, i) => `
    <button class="opcio" onclick="respondre(${i})" data-idx="${i}">
      <span class="opcio-lletra">${lletres[i]}</span><span>${op}</span>
    </button>`).join('');

  document.getElementById('explicacio').style.display = 'none';
  document.getElementById('btn-seguent').classList.remove('visible');

  const card = document.getElementById('question-card');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = 'slideIn .3s ease'; });
}

function respondre(idx) {
  if (respost) return;
  respost = true;

  const idPregunta = jocActiu.ordre[jocActiu.idx];
  const p = PREGUNTES.find(x => x.id === idPregunta);
  const encertat = idx === p.correcta;

  document.querySelectorAll('.opcio').forEach(o => o.classList.add('disabled'));
  document.querySelectorAll('.opcio')[idx].classList.add(encertat ? 'correcta' : 'incorrecta');
  if (!encertat) document.querySelectorAll('.opcio')[p.correcta].classList.add('correcta');

  if (encertat) {
    jocActiu.punts += PUNTS[p.dificultat];
    jocActiu.encerts++;
    document.getElementById('score-live').textContent = jocActiu.punts;
  }

  const exp = document.getElementById('explicacio');
  exp.textContent = p.explicacio;
  exp.style.display = 'block';

  mostrarReaccio(encertat);
  guardarEstatJugador(jugadorActiu, jocActiu);

  const btnSeg = document.getElementById('btn-seguent');
  btnSeg.textContent = '⏭ Saltar vídeo';
  btnSeg.classList.add('visible');
  btnSeg.onclick = () => { tancarReaccioActiva(); reaccioCallback = null; seguent(); };

  mostrarReaccio(encertat, () => seguent());
}

function seguent() {
  tancarReaccioActiva();
  jocActiu.idx++;
  guardarEstatJugador(jugadorActiu, jocActiu);
  if (jocActiu.idx >= jocActiu.ordre.length) {
    jocActiu.completat = true;
    guardarEstatJugador(jugadorActiu, jocActiu);
    mostrarResultat(jocActiu);
  } else {
    mostrarPregunta();
  }
}

// ── ANIMACIÓ PERSONATGE ───────────────────────────────────────
let reaccioOverlayActiu = null;
let reaccioCallback = null;

function tancarReaccioActiva() {
  if (reaccioOverlayActiu) {
    const overlay = reaccioOverlayActiu;
    reaccioOverlayActiu = null;
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity .25s';
    setTimeout(() => overlay.remove(), 250);
  }
}

function mostrarReaccio(encertat, callback) {
  tancarReaccioActiva();
  reaccioCallback = callback;
  const msgs = encertat ? MSG_OK : MSG_ERR;
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  const tipus = encertat ? 'ok' : 'ko';
  const videoSrc = `img/personatges/${jugadorActiu.toLowerCase()}_${tipus}.mp4`;
  const borderColor = encertat ? '#6aab7a' : '#e05555';
  const glowColor = encertat ? 'rgba(106,171,122,.6)' : 'rgba(224,85,85,.6)';

  const overlay = document.createElement('div');
  overlay.className = 'reaccio-overlay';
  overlay.style.cursor = 'pointer';
  overlay.innerHTML = `
    <div class="reaccio-wrap">
      <div style="width:200px;height:200px;border-radius:50%;overflow:hidden;border:4px solid ${borderColor};box-shadow:0 0 50px ${glowColor};flex-shrink:0;">
        <video autoplay muted playsinline style="width:100%;height:100%;object-fit:cover;display:block;">
          <source src="${videoSrc}" type="video/mp4">
        </video>
      </div>
      <div class="reaccio-text ${encertat ? 'ok' : 'error'}">${msg}</div>
    </div>`;

  document.body.appendChild(overlay);
  reaccioOverlayActiu = overlay;

  const tancar = () => {
    if (!reaccioOverlayActiu) return;
    tancarReaccioActiva();
    setTimeout(() => { const cb = reaccioCallback; reaccioCallback = null; if (cb) cb(); }, 280);
  };

  overlay.querySelector('video').addEventListener('ended', tancar);
  overlay.addEventListener('click', tancar);
  setTimeout(() => { if (reaccioOverlayActiu === overlay) tancar(); }, 5000);
}

function mostrarResultat(estat) {
  const pct = Math.round((estat.encerts / PREGUNTES.length) * 100);
  let titol;
  if (estat.punts >= 900)      titol = '🏆 Expert en Açores!';
  else if (estat.punts >= 700) titol = '🌋 Excel·lent!';
  else if (estat.punts >= 500) titol = '🐋 Molt bé!';
  else if (estat.punts >= 300) titol = '🌊 No està malament!';
  else                          titol = '🦈 Continua practicant!';

  document.getElementById('result-avatar').src = IMGS[jugadorActiu];
  document.getElementById('result-title').textContent = titol;
  document.getElementById('result-score').textContent = estat.punts;
  document.getElementById('stat-encerts').textContent = estat.encerts;
  document.getElementById('stat-errors').textContent = PREGUNTES.length - estat.encerts;
  document.getElementById('stat-pct').textContent = `${pct}%`;

  if (estat.punts >= 700) llençaConfetti();
  mostraScreen('result');
}

function tornarInici() { mostraScreen('joc-selector'); }

function demanarSortir() { document.getElementById('modal-sortir').classList.add('visible'); }

function confirmarSortir() {
  tancarReaccioActiva();
  document.getElementById('modal-sortir').classList.remove('visible');
  guardarEstatJugador(jugadorActiu, jocActiu);
  mostraScreen('joc-selector');
}

function demanarReinici() {
  const sensePenal = SENSE_PENALITZACIO.includes(jugadorActiu);
  const text = sensePenal
    ? "Perdràs tot el progrés actual i es reiniciarà el joc des de zero."
    : "Perdràs tot el progrés actual i se t'aplicarà una <strong>penalització de 100 punts</strong> al rànquing.";
  document.getElementById('modal-reinici-text').innerHTML = text;
  document.getElementById('modal-reinici').classList.add('visible');
}

function tancarModal() { document.getElementById('modal-reinici').classList.remove('visible'); }

function confirmarReinici() {
  tancarModal();
  const sensePenal = SENSE_PENALITZACIO.includes(jugadorActiu);
  const estatActual = carregarEstatJugador(jugadorActiu);
  localStorage.removeItem(`quiz_estat_${jugadorActiu}`);
  if (!sensePenal && estatActual && estatActual.punts > 0) {
    guardarEstatJugador(jugadorActiu, { jugador: jugadorActiu, ordre: [], idx: 0, punts: -100, encerts: 0, completat: false, penalitzat: true });
  }
  renderStartScreen();
  renderJugadorsGrid();
}

function guardarEstatJugador(nom, estat) { localStorage.setItem(`quiz_estat_${nom}`, JSON.stringify(estat)); }
function carregarEstatJugador(nom) {
  try { const raw = localStorage.getItem(`quiz_estat_${nom}`); return raw ? JSON.parse(raw) : null; }
  catch(e) { return null; }
}

// ── CONFETTI ──────────────────────────────────────────────────
function llençaConfetti() {
  const wrap = document.getElementById('confetti');
  const colors = ['#6aab7a','#f0b429','#a8d8b0','#ffd166','#2d5a3d','#ffffff'];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'2px'};animation:confetti-fall ${1.5+Math.random()*2}s ${Math.random()*.5}s ease-in forwards`;
    wrap.appendChild(el);
  }
  setTimeout(() => wrap.innerHTML = '', 4000);
}

// ── UTILS ─────────────────────────────────────────────────────
function mostraScreen(nom) {
  const totes = ['select','joc-selector','start','quiz','result','qqs',
                 'mapa-start','mapa-joc','mapa-resultat','mapa-result-final'];
  totes.forEach(s => {
    const el = document.getElementById(`screen-${s}`);
    if (!el) return;
    const isFlex = ['result','mapa-resultat','mapa-result-final'].includes(s);
    el.style.display = nom === s ? (isFlex ? 'flex' : 'block') : 'none';
  });
  window.scrollTo(0,0);
  if (nom === 'select') renderJugadorsGrid();
}

const cfStyle = document.createElement('style');
cfStyle.textContent = `@keyframes confetti-fall{0%{opacity:1;top:-10px;transform:rotate(0)}100%{opacity:0;top:100vh;transform:rotate(720deg)}}`;
document.head.appendChild(cfStyle);


// ══════════════════════════════════════════════════════════════
//  QUI / QUÈ SÓC?
// ══════════════════════════════════════════════════════════════

const QQS_API_KEY = CONFIG.ANTHROPIC_API_KEY;

const QQS_CATEGORIES = [
  { id: 'familiars', emoji: '👨‍👩‍👧‍👦', nom: 'Familiars i amics', ia: false },
  { id: 'famosos',   emoji: '🌟', nom: 'Persones famoses',   ia: true  },
  { id: 'geografia', emoji: '🌍', nom: 'Geografia',          ia: true  },
  { id: 'cançons',   emoji: '🎵', nom: 'Cançons',            ia: true  },
  { id: 'animals',   emoji: '🐾', nom: 'Animals',            ia: true  },
  { id: 'menjar',    emoji: '🍽️', nom: 'Menjar i begudes',   ia: true  },
  { id: 'objectes',  emoji: '📦', nom: 'Objectes',           ia: true  },
];

const QQS_FAMILIARS = [
  'Iaia','Avi','Tieta Mercè','Tiet Miquel','Míriam','Marta',
  'Iris','Rubèn','Sea','Joel','Aina','Martina Alinque',
  'Marta Ortega','Mònica Casajuana','Tieta Bernardina',
  'Tieta Ino','Tieta Pili','Tieta Antònia','Tieta Isabel',
  'Xu','Joa','Jordi','Mons','Laia','Anna'
];

let qqsCategoria = null;
let qqsParaula   = null;
let qqsPistes    = [];
let qqsPistaIdx  = 0;

function iniciarQuiQueSoc() {
  qqsCategoria = null;
  qqsParaula   = null;
  qqsPistes    = [];
  qqsPistaIdx  = 0;
  document.getElementById('qqs-jugador-avatar').src = IMGS[jugadorActiu] || '';
  document.getElementById('qqs-jugador-nom').textContent = jugadorActiu;
  document.getElementById('qqs-selector').style.display = 'block';
  document.getElementById('qqs-resultat').style.display = 'none';
  renderQQSCategoriesGrid();
  qqsActualitzarBotoGenerar();
  mostraScreen('qqs');
}

function renderQQSCategoriesGrid() {
  document.getElementById('qqs-categories-grid').innerHTML = QQS_CATEGORIES.map(c => `
    <button class="qqs-cat-btn ${qqsCategoria === c.id ? 'selected' : ''}"
            data-id="${c.id}" onclick="qqsSeleccionarCategoria('${c.id}')">
      <span class="qqs-cat-emoji">${c.emoji}</span>
      <span class="qqs-cat-nom">${c.nom}</span>
    </button>`).join('');
}

function qqsSeleccionarCategoria(id) {
  qqsCategoria = id;
  document.querySelectorAll('.qqs-cat-btn').forEach(b => b.classList.toggle('selected', b.dataset.id === id));
  qqsActualitzarBotoGenerar();
}

function qqsActualitzarBotoGenerar() {
  const btn = document.getElementById('qqs-btn-generar');
  if (btn) btn.disabled = !qqsCategoria;
}

async function qqsGenerar() {
  if (!qqsCategoria) return;
  const cat = QQS_CATEGORIES.find(c => c.id === qqsCategoria);
  qqsPistes = []; qqsPistaIdx = 0;
  document.getElementById('qqs-pistes-list').innerHTML = '';
  document.getElementById('qqs-pistes-wrap').style.display = 'none';
  document.getElementById('qqs-categoria-badge').textContent = `${cat.emoji} ${cat.nom}`;
  document.getElementById('qqs-selector').style.display = 'none';
  document.getElementById('qqs-resultat').style.display = 'block';
  document.getElementById('qqs-loading').style.display = 'flex';
  document.getElementById('qqs-joc-content').style.display = 'none';

  try {
    if (!cat.ia) {
      qqsParaula = QQS_FAMILIARS[Math.floor(Math.random() * QQS_FAMILIARS.length)];
      qqsPistes  = [];
    } else {
      const res = await qqsGenerarAmbIA(cat.nom);
      qqsParaula = res.paraula;
      qqsPistes  = res.pistes || [];
    }
    document.getElementById('qqs-paraula-text').textContent = qqsParaula;
    qqsActualitzarBotoPista();
    document.getElementById('qqs-loading').style.display = 'none';
    document.getElementById('qqs-joc-content').style.display = 'block';
  } catch (e) {
    console.error('Error API QQS:', e);
    document.getElementById('qqs-loading').innerHTML =
      '<div style="color:var(--error);text-align:center;padding:2rem;width:100%">⚠️ Error generant la paraula.<br><small>Comprova la connexió i torna-ho a intentar.</small><br><br><button onclick="qqsNovaPartida()" style="margin-top:.5rem;background:none;border:1px solid rgba(106,171,122,.3);border-radius:8px;padding:.4rem 1rem;color:#9bbfaa;cursor:pointer;font-family:\'DM Sans\',sans-serif">← Tornar</button></div>';
  }
}

async function qqsGenerarAmbIA(categoriaNom) {
  const prompt = `Genera una paraula o concepte per al joc "Qui sóc?".
Categoria: ${categoriaNom}
La paraula ha de ser prou coneguda per a una família catalana que viatja a les Açores el juliol de 2026.

Respon ÚNICAMENT amb un JSON vàlid, sense cap text addicional ni marques de codi:
{
  "paraula": "...",
  "pistes": ["pista 1 creativa", "pista 2 creativa", "pista 3 creativa"]
}

Les pistes han de ser creatives i indirectes. No han de contenir la paraula ni parts d'ella.`;

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': QQS_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!resp.ok) throw new Error(`API error ${resp.status}`);
  const data = await resp.json();
  const text = data.content[0].text.trim();
  const clean = text.replace(/^```json\s*/,'').replace(/```\s*$/,'').trim();
  return JSON.parse(clean);
}

async function qqsCanviarParaula() { await qqsGenerar(); }

function qqsMostrarPista() {
  const wrap = document.getElementById('qqs-pistes-wrap');
  const list = document.getElementById('qqs-pistes-list');

  if (qqsPistaIdx < qqsPistes.length) {
    const div = document.createElement('div');
    div.className = 'qqs-pista-item';
    div.innerHTML = `<span class="qqs-pista-num">${qqsPistaIdx + 1}</span>${qqsPistes[qqsPistaIdx]}`;
    list.appendChild(div);
    wrap.style.display = 'block';
    qqsPistaIdx++;
  } else {
    const div = document.createElement('div');
    div.className = 'qqs-pista-item qqs-pista-extra';
    div.innerHTML = `<span class="qqs-pista-num">💡</span>Pensa en tots els sentits: forma, color, mida, ús, origen…`;
    list.appendChild(div);
    qqsPistaIdx++;
  }
  qqsActualitzarBotoPista();
}

function qqsActualitzarBotoPista() {
  const btn = document.getElementById('qqs-btn-pista');
  const comptador = document.getElementById('qqs-pista-comptador');
  const cat = QQS_CATEGORIES.find(c => c.id === qqsCategoria);

  if (!cat || !cat.ia) { if (btn) btn.style.display = 'none'; return; }
  if (!btn) return;
  btn.style.display = 'flex';

  if (qqsPistaIdx >= qqsPistes.length + 1) {
    btn.disabled = true; btn.style.opacity = '0.4';
    if (comptador) comptador.textContent = '(exhaurides)';
  } else {
    btn.disabled = false; btn.style.opacity = '1';
    if (qqsPistaIdx < qqsPistes.length) {
      if (comptador) comptador.textContent = `(${qqsPistaIdx + 1}/${qqsPistes.length})`;
    } else {
      if (comptador) comptador.textContent = '(extra)';
    }
  }
}

function qqsNovaPartida() {
  qqsCategoria = null; qqsParaula = null; qqsPistes = []; qqsPistaIdx = 0;
  document.getElementById('qqs-resultat').style.display = 'none';
  document.getElementById('qqs-selector').style.display = 'block';
  document.getElementById('qqs-loading').innerHTML = `
    <div class="qqs-spinner"></div>
    <div class="qqs-loading-text">Generant paraula secreta…</div>`;
  renderQQSCategoriesGrid();
  qqsActualitzarBotoGenerar();
}


// ══════════════════════════════════════════════════════════════
//  ON ÉS AIXÒ? — MAPA
// ══════════════════════════════════════════════════════════════

const MAPA_STORAGE_KEY = 'joc_mapa_estat_';
const MAPA_TOTAL = typeof LLOCS_MAPA !== 'undefined' ? LLOCS_MAPA.length : 50;
const MAPA_PUNTS_MAX = MAPA_TOTAL * 10;
const AZORES_CENTER = [38.5, -27.8];
const AZORES_ZOOM = 7;

let mapaJocActiu    = null;
let mapaLeaflet     = null;
let mapaResultatMap = null;
let mapaMarker      = null;
let mapaClickLat    = null;
let mapaClickLon    = null;

function mapaIniciarPantalla() {
  mapaRenderStartScreen();
  mostraScreen('mapa-start');
}

function mapaRenderStartScreen() {
  const nom = jugadorActiu;
  const estat = mapaCarregarEstat(nom);

  document.getElementById('mapa-jugador-avatar').src = IMGS[nom] || '';
  document.getElementById('mapa-jugador-nom').textContent = nom;

  const progWrap  = document.getElementById('mapa-progres-wrap');
  const btnReinici = document.getElementById('mapa-btn-reiniciar');
  const btnStart   = document.getElementById('mapa-btn-start');

  if (estat && !estat.completat && estat.idx > 0) {
    progWrap.style.display = 'block';
    document.getElementById('mapa-progres-fill').style.width = `${(estat.idx / MAPA_TOTAL) * 100}%`;
    document.getElementById('mapa-progres-text').textContent = `${estat.idx} de ${MAPA_TOTAL} llocs`;
    document.getElementById('mapa-progres-punts-text').textContent = `${estat.punts} pts`;
    document.getElementById('mapa-progres-badge').textContent = 'Repren on ho vas deixar →';
    btnStart.textContent = 'Continuar el joc ▶';
    btnReinici.style.display = 'block';
    document.getElementById('mapa-jugador-sub').textContent = `${estat.punts} punts · en curs`;
  } else if (estat && estat.completat) {
    progWrap.style.display = 'none';
    btnStart.textContent = 'Veure resultat 🏆';
    btnReinici.style.display = 'block';
    document.getElementById('mapa-jugador-sub').textContent = `${estat.punts} punts · completat`;
  } else {
    progWrap.style.display = 'none';
    btnStart.textContent = 'Comença el joc 🗺️';
    btnReinici.style.display = 'none';
    document.getElementById('mapa-jugador-sub').textContent = 'Nou joc · 0 punts';
  }
  mapaRenderRanking();
}

function mapaRenderRanking() {
  const llista = JUGADORS_VALIDS.map(nom => {
    const estat = mapaCarregarEstat(nom);
    return { nom, punts: estat ? estat.punts : 0, completat: estat ? estat.completat : false, idx: estat ? estat.idx : 0 };
  }).sort((a,b) => b.punts - a.punts);

  const posEmoji = ['🥇','🥈','🥉'];
  document.getElementById('mapa-ranking-list').innerHTML = llista.map((r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
      <div class="ranking-pos ${i<3?'p'+(i+1):'other'}">${i<3?posEmoji[i]:i+1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom] || ''}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div class="rank-barra-wrap"><div class="rank-barra" style="width:${(r.punts/MAPA_PUNTS_MAX)*100}%"></div></div>
      </div>
      <div style="text-align:right">
        <div class="rank-punts">${r.punts}</div>
        <span class="rank-partides">${r.completat ? 'Completat ✓' : r.idx > 0 ? `${r.idx}/${MAPA_TOTAL}` : 'No iniciat'}</span>
      </div>
    </div>`).join('');
}

function mapaIniciarJoc() {
  const estat = mapaCarregarEstat(jugadorActiu);
  if (estat && estat.completat) { mapaMostrarResultatFinal(estat); return; }
  if (estat && estat.idx > 0 && !estat.completat) {
    mapaJocActiu = estat;
  } else {
    const ordre = [...LLOCS_MAPA].map(l => l.id).sort(() => Math.random() - 0.5);
    mapaJocActiu = { jugador: jugadorActiu, ordre, idx: 0, punts: 0, stats: { perfectes:0, bons:0, approx:0, errors:0 }, completat: false };
    mapaGuardarEstat(jugadorActiu, mapaJocActiu);
  }
  mostraScreen('mapa-joc');
  mapaInicialitzar();
  mapaMostrarLloc();
}

function mapaInicialitzar() {
  if (mapaLeaflet) { mapaLeaflet.remove(); mapaLeaflet = null; }
  mapaLeaflet = L.map('mapa-leaflet', { center: AZORES_CENTER, zoom: AZORES_ZOOM });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '© CartoDB', subdomains: 'abcd', maxZoom: 18
  }).addTo(mapaLeaflet);
  mapaMarker = null; mapaClickLat = null; mapaClickLon = null;
  mapaLeaflet.on('click', mapaOnClick);
}

function mapaOnClick(e) {
  mapaClickLat = e.latlng.lat;
  mapaClickLon = e.latlng.lng;
  if (mapaMarker) mapaLeaflet.removeLayer(mapaMarker);
  mapaMarker = L.marker([mapaClickLat, mapaClickLon], {
    icon: L.divIcon({ className: '', html: '<div class="marker-jugador">📍</div>', iconSize: [32,32], iconAnchor: [16,32] })
  }).addTo(mapaLeaflet);
  document.getElementById('mapa-btn-confirmar').style.display = 'block';
  document.getElementById('mapa-hint').style.display = 'none';
}

function mapaMostrarLloc() {
  mapaClickLat = null; mapaClickLon = null;
  if (mapaMarker && mapaLeaflet) { mapaLeaflet.removeLayer(mapaMarker); mapaMarker = null; }
  document.getElementById('mapa-btn-confirmar').style.display = 'none';
  document.getElementById('mapa-hint').style.display = 'block';

  const lloc = LLOCS_MAPA.find(l => l.id === mapaJocActiu.ordre[mapaJocActiu.idx]);
  const total = mapaJocActiu.ordre.length;

  document.getElementById('mapa-prog-text').textContent = `Lloc ${mapaJocActiu.idx + 1} de ${total}`;
  document.getElementById('mapa-prog-fill').style.width = `${(mapaJocActiu.idx / total) * 100}%`;
  document.getElementById('mapa-score-live').textContent = mapaJocActiu.punts;
  document.getElementById('mapa-q-cat').textContent = `${CAT_EMOJI[lloc.categoria]} ${CAT_LABEL[lloc.categoria]}`;

  const illaEl = document.getElementById('mapa-q-illa');
  if (lloc.trampa) {
    illaEl.textContent = '🎭 Sorpresa!';
    illaEl.style.display = 'inline-block';
  } else {
    illaEl.style.display = 'none';
  }
  document.getElementById('mapa-pregunta-nom').textContent = lloc.nom;

  const card = document.getElementById('mapa-pregunta-card');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = 'slideIn .3s ease'; });
  mapaLeaflet.setView(AZORES_CENTER, AZORES_ZOOM);
}

function mapaConfirmarResposta() {
  if (mapaClickLat === null) return;
  const lloc = LLOCS_MAPA.find(l => l.id === mapaJocActiu.ordre[mapaJocActiu.idx]);
  const dist = distanciaKm(mapaClickLat, mapaClickLon, lloc.lat, lloc.lon);
  const pts  = puntsPerDistancia(dist);

  if (pts === 10) mapaJocActiu.stats.perfectes++;
  else if (pts === 5) mapaJocActiu.stats.bons++;
  else if (pts === 2) mapaJocActiu.stats.approx++;
  else mapaJocActiu.stats.errors++;

  mapaJocActiu.punts += pts;
  mapaGuardarEstat(jugadorActiu, mapaJocActiu);
  mapaMostrarResultatLloc(lloc, dist, pts);
}

function mapaMostrarResultatLloc(lloc, dist, pts) {
  const badge = document.getElementById('mapa-res-pts-badge');
  badge.textContent = pts > 0 ? `+${pts} pts` : '0 pts';
  badge.className = 'resultat-pts-badge ' + (pts===10?'perfecte':pts===5?'bo':pts===2?'approx':'error');

  document.getElementById('mapa-res-nom').textContent = lloc.nom;
  document.getElementById('mapa-res-dist').textContent = `📏 ${dist < 1 ? '<1' : Math.round(dist)} km de distància`;
  document.getElementById('mapa-res-desc').textContent = lloc.desc;
  document.getElementById('mapa-res-trampa').style.display = lloc.trampa ? 'block' : 'none';

  mostraScreen('mapa-resultat');

  setTimeout(() => {
    if (mapaResultatMap) { mapaResultatMap.remove(); mapaResultatMap = null; }
    mapaResultatMap = L.map('mapa-resultat-map', {
      center: [lloc.lat, lloc.lon], zoom: 9,
      zoomControl: false, dragging: false,
      scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false,
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '© CartoDB', subdomains: 'abcd'
    }).addTo(mapaResultatMap);

    L.marker([mapaClickLat, mapaClickLon], {
      icon: L.divIcon({ className: '', html: '<div class="marker-jugador">📍</div>', iconSize:[32,32], iconAnchor:[16,32] })
    }).addTo(mapaResultatMap).bindPopup('La teva resposta').openPopup();

    L.marker([lloc.lat, lloc.lon], {
      icon: L.divIcon({ className: '', html: '<div class="marker-real">✅</div>', iconSize:[32,32], iconAnchor:[16,32] })
    }).addTo(mapaResultatMap).bindPopup(lloc.nom);

    L.polyline([[mapaClickLat, mapaClickLon],[lloc.lat, lloc.lon]], {
      color: '#6aab7a', weight: 2, dashArray: '6,6', opacity: 0.8
    }).addTo(mapaResultatMap);

    mapaResultatMap.fitBounds(
      L.latLngBounds([[mapaClickLat, mapaClickLon],[lloc.lat, lloc.lon]]),
      { padding: [40,40] }
    );
  }, 100);
}

function mapaSeguent() {
  mapaJocActiu.idx++;
  mapaGuardarEstat(jugadorActiu, mapaJocActiu);
  if (mapaJocActiu.idx >= mapaJocActiu.ordre.length) {
    mapaJocActiu.completat = true;
    mapaGuardarEstat(jugadorActiu, mapaJocActiu);
    mapaMostrarResultatFinal(mapaJocActiu);
  } else {
    mostraScreen('mapa-joc');
    mapaMostrarLloc();
  }
}

function mapaMostrarResultatFinal(estat) {
  let titol;
  if (estat.punts >= 450)      titol = '🗺️ Navegant expert!';
  else if (estat.punts >= 350) titol = '📍 Excel·lent!';
  else if (estat.punts >= 200) titol = '🏝️ Bon orientador!';
  else if (estat.punts >= 100) titol = '🌊 Segueix practicant!';
  else                          titol = '🧭 Necessites un GPS!';

  document.getElementById('mapa-result-avatar').src = IMGS[jugadorActiu] || '';
  document.getElementById('mapa-result-title').textContent = titol;
  document.getElementById('mapa-result-score').textContent = estat.punts;
  document.getElementById('mapa-stat-perfectes').textContent = estat.stats?.perfectes || 0;
  document.getElementById('mapa-stat-bons').textContent = estat.stats?.bons || 0;
  document.getElementById('mapa-stat-approx').textContent = estat.stats?.approx || 0;
  document.getElementById('mapa-stat-errors').textContent = estat.stats?.errors || 0;
  mostraScreen('mapa-result-final');
}

function mapaTornarInici() {
  mapaRenderStartScreen();
  mostraScreen('mapa-start');
}

function mapaDemanarSortir() { document.getElementById('modal-sortir-mapa').classList.add('visible'); }
function mapaConfirmarSortir() {
  document.getElementById('modal-sortir-mapa').classList.remove('visible');
  mapaGuardarEstat(jugadorActiu, mapaJocActiu);
  mapaRenderStartScreen();
  mostraScreen('mapa-start');
}

function mapaDemanarReinici() { document.getElementById('modal-reinici-mapa').classList.add('visible'); }
function mapaConfirmarReinici() {
  document.getElementById('modal-reinici-mapa').classList.remove('visible');
  localStorage.removeItem(MAPA_STORAGE_KEY + jugadorActiu);
  mapaRenderStartScreen();
}

function mapaGuardarEstat(nom, estat) { localStorage.setItem(MAPA_STORAGE_KEY + nom, JSON.stringify(estat)); }
function mapaCarregarEstat(nom) {
  try { const raw = localStorage.getItem(MAPA_STORAGE_KEY + nom); return raw ? JSON.parse(raw) : null; }
  catch(e) { return null; }
}
