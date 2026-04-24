const MSG_OK   = ['🎉 Excel·lent!','⭐ Correcte!','🔥 Molt bé!','💪 Eso es!','🌋 Boom!'];
const MSG_ERR  = ['😅 Ups...','💀 Fallada!','😢 Oh no...','🤦 Ai ai ai...','😤 Mala sort!'];

// ── ESTAT ─────────────────────────────────────────────────────────────
let jugadorActiu = null; // nom del jugador seleccionat

// Estat del joc per jugador: guardat a localStorage
// Clau: quiz_estat_NOM
// { preguntes: [...ids], idx: N, punts: N, encerts: N, completat: bool }

let jocActiu = null; // estat en memòria del joc en curs
let respost = false;

// ── INIT ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderJugadorsGrid();
  mostraScreen('select');
});

// ── GRID DE JUGADORS ──────────────────────────────────────────────────
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
  const avatarEl = document.getElementById('joc-selector-avatar');
  const nomEl = document.getElementById('joc-selector-nom');
  if (avatarEl) avatarEl.src = IMGS[jugadorActiu] || '';
  if (nomEl) nomEl.textContent = jugadorActiu;
  mostraScreen('joc-selector');
}

// ── SELECCIÓ MODE JOC ─────────────────────────────────────────────────
function seleccionarModeJoc(mode) {
  if (mode === 'quiz') {
    mostraScreen('start');
    renderStartScreen();
  } else if (mode === 'qui-que') {
    // Pendent d’implementar
    alert('Properament: Qui/Què sóc?');
  }
}

// ── PANTALLA INICI ────────────────────────────────────────────────────
function renderStartScreen() {
  const nom = jugadorActiu;
  const estat = carregarEstatJugador(nom);

  // Jugador actiu
  document.getElementById('jugador-actiu-avatar').src = IMGS[nom];
  document.getElementById('jugador-actiu-nom').textContent = nom;

  // Progrés
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

// ── RÀNQUING ──────────────────────────────────────────────────────────
function renderRanking() {
  const llista = JUGADORS_VALIDS.map(nom => {
    const estat = carregarEstatJugador(nom);
    return { nom, punts: estat ? estat.punts : 0, completat: estat ? estat.completat : false, idx: estat ? estat.idx : 0 };
  }).sort((a,b) => b.punts - a.punts);

  const posEmoji = ['🥇','🥈','🥉'];
  const el = document.getElementById('ranking-list-home');
  el.innerHTML = llista.map((r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
      <div class="ranking-pos ${i<3?'p'+(i+1):'other'}">${i<3?posEmoji[i]:i+1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom]}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div class="rank-barra-wrap">
          <div class="rank-barra" style="width:${(r.punts/1000)*100}%"></div>
        </div>
      </div>
      <div style="text-align:right">
        <div class="rank-punts">${r.punts}</div>
        <span class="rank-partides">${r.completat ? 'Completat ✓' : r.idx > 0 ? r.idx+'/100' : 'No iniciat'}</span>
      </div>
    </div>
  `).join('');
}

// ── JOC ───────────────────────────────────────────────────────────────
function iniciarJoc() {
  const estat = carregarEstatJugador(jugadorActiu);

  if (estat && estat.completat) {
    // Mostra resultat final
    mostrarResultat(estat);
    return;
  }

  if (estat && estat.idx > 0 && !estat.completat) {
    // Reprèn joc existent
    jocActiu = estat;
  } else {
    // Nou joc
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

  // Capçalera
  const total = jocActiu.ordre.length;
  const actual = jocActiu.idx + 1;
  document.getElementById('prog-text').textContent = `Pregunta ${actual} de ${total}`;
  document.getElementById('prog-cat').textContent = p.categoria;
  document.getElementById('prog-fill').style.width = `${(jocActiu.idx / total) * 100}%`;
  document.getElementById('score-live').textContent = jocActiu.punts;

  // Pregunta
  document.getElementById('q-cat').textContent = p.categoria;
  document.getElementById('q-dif').textContent = DIF_LABEL[p.dificultat];
  document.getElementById('q-dif').className = `q-dif ${p.dificultat}`;
  document.getElementById('q-pts').textContent = `+${PUNTS[p.dificultat]} pts`;
  document.getElementById('q-text').textContent = p.pregunta;

  // Opcions
  const lletres = ['A','B','C','D','E'];
  document.getElementById('opcions').innerHTML = p.opcions.map((op, i) => `
    <button class="opcio" onclick="respondre(${i})" data-idx="${i}">
      <span class="opcio-lletra">${lletres[i]}</span>
      <span>${op}</span>
    </button>`).join('');

  document.getElementById('explicacio').style.display = 'none';
  document.getElementById('btn-seguent').classList.remove('visible');

  // Animació card
  const card = document.getElementById('question-card');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = 'slideIn .3s ease'; });
}

function respondre(idx) {
  if (respost) return;
  respost = true;

  const idPregunta = jocActiu.ordre[jocActiu.idx];
  const p = PREGUNTES.find(x => x.id === idPregunta);
  const correcta = p.correcta;
  const encertat = idx === correcta;

  // Marca opcions
  document.querySelectorAll('.opcio').forEach(o => o.classList.add('disabled'));
  document.querySelectorAll('.opcio')[idx].classList.add(encertat ? 'correcta' : 'incorrecta');
  if (!encertat) document.querySelectorAll('.opcio')[correcta].classList.add('correcta');

  // Actualitza puntuació
  if (encertat) {
    jocActiu.punts += PUNTS[p.dificultat];
    jocActiu.encerts++;
    document.getElementById('score-live').textContent = jocActiu.punts;
  }

  // Mostra explicació
  const exp = document.getElementById('explicacio');
  exp.textContent = p.explicacio;
  exp.style.display = 'block';

  // Animació personatge
  mostrarReaccio(encertat);

  // Guarda progrés (idx s'incrementa quan es prem Següent)
  guardarEstatJugador(jugadorActiu, jocActiu);

  // Botó per saltar el vídeo manualment
  const btnSeg = document.getElementById('btn-seguent');
  btnSeg.textContent = '⏭ Saltar vídeo';
  btnSeg.classList.add('visible');
  btnSeg.onclick = () => {
    tancarReaccioActiva();
    reaccioCallback = null;
    seguent();
  };

  // Passa automàticament quan acaba el vídeo
  mostrarReaccio(encertat, () => seguent());
}

function seguent() {
  tancarReaccioActiva(); // Tanca el vídeo si encara és actiu
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

// ── ANIMACIÓ PERSONATGE ───────────────────────────────────────────────
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
  const msg  = msgs[Math.floor(Math.random() * msgs.length)];
  const tipus = encertat ? 'ok' : 'ko';
  const videoSrc = `img/personatges/${jugadorActiu.toLowerCase()}_${tipus}.mp4`;
  const borderColor = encertat ? '#6aab7a' : '#e05555';
  const glowColor   = encertat ? 'rgba(106,171,122,.6)' : 'rgba(224,85,85,.6)';

  const overlay = document.createElement('div');
  overlay.className = 'reaccio-overlay';
  overlay.style.cursor = 'pointer';

  // Usem un div contenidor quadrat per fer el clip circular correctament
  overlay.innerHTML = `
    <div class="reaccio-wrap">
      <div style="width:200px;height:200px;border-radius:50%;overflow:hidden;border:4px solid ${borderColor};box-shadow:0 0 50px ${glowColor};flex-shrink:0;">
        <video id="reaccio-video" autoplay muted playsinline
               style="width:100%;height:100%;object-fit:cover;display:block;">
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
    // Executa el callback (passar a la seg. pregunta) un cop tancat
    setTimeout(() => {
      const cb = reaccioCallback;
      reaccioCallback = null;
      if (cb) cb();
    }, 280);
  };

  const video = overlay.querySelector('video');

  // Quan acaba el vídeo, tanca i passa a la següent
  video.addEventListener('ended', tancar);

  // Clic sobre l'overlay per saltar
  overlay.addEventListener('click', tancar);

  // Fallback: màxim 5s
  setTimeout(() => { if (reaccioOverlayActiu === overlay) tancar(); }, 5000);
}

// ── RESULTAT FINAL ────────────────────────────────────────────────────
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

function tornarInici() {
  mostraScreen('joc-selector');
}

// ── SORTIR ────────────────────────────────────────────────────────────
function demanarSortir() {
  document.getElementById('modal-sortir').classList.add('visible');
}

function confirmarSortir() {
  tancarReaccioActiva();
  document.getElementById('modal-sortir').classList.remove('visible');
  guardarEstatJugador(jugadorActiu, jocActiu);
  mostraScreen('joc-selector');
}

// ── REINICI ───────────────────────────────────────────────────────────
function demanarReinici() {
  const sensePenal = SENSE_PENALITZACIO.includes(jugadorActiu);
  const text = sensePenal
    ? "Perdràs tot el progrés actual i es reiniciarà el joc des de zero."
    : "Perdràs tot el progrés actual i se t'aplicarà una <strong>penalització de 100 punts</strong> al rànquing.";
  document.getElementById('modal-reinici-text').innerHTML = text;
  document.getElementById('modal-reinici').classList.add('visible');
}

function tancarModal() {
  document.getElementById('modal-reinici').classList.remove('visible');
}

function confirmarReinici() {
  tancarModal();
  const sensePenal = SENSE_PENALITZACIO.includes(jugadorActiu);
  const estatActual = carregarEstatJugador(jugadorActiu);
  const ptsPenal = (sensePenal || !estatActual) ? 0 : Math.max(0, (estatActual.punts || 0) - 100);

  // Esborra l'estat i crea un de nou (amb pts penalitzats si escau)
  localStorage.removeItem(`quiz_estat_${jugadorActiu}`);

  if (!sensePenal && ptsPenal > 0) {
    // Guardem la penalització al nou estat
    const nouEstat = { jugador: jugadorActiu, ordre: [], idx: 0, punts: -100, encerts: 0, completat: false, penalitzat: true };
    guardarEstatJugador(jugadorActiu, nouEstat);
  }

  renderStartScreen();
  renderJugadorsGrid();
}

// ── PERSISTÈNCIA ──────────────────────────────────────────────────────
function guardarEstatJugador(nom, estat) {
  localStorage.setItem(`quiz_estat_${nom}`, JSON.stringify(estat));
}

function carregarEstatJugador(nom) {
  try {
    const raw = localStorage.getItem(`quiz_estat_${nom}`);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

// ── CONFETTI ──────────────────────────────────────────────────────────
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

// ── UTILS ─────────────────────────────────────────────────────────────
function mostraScreen(nom) {
  ['select','joc-selector','start','quiz','result'].forEach(s => {
    const el = document.getElementById(`screen-${s}`);
    if (!el) return;
    if (s === 'result') el.style.display = nom === s ? 'flex' : 'none';
    else el.style.display = nom === s ? 'block' : 'none';
  });
  window.scrollTo(0,0);
  if (nom === 'select') renderJugadorsGrid();
}

const cfStyle = document.createElement('style');
cfStyle.textContent = `@keyframes confetti-fall{0%{opacity:1;top:-10px;transform:rotate(0)}100%{opacity:0;top:100vh;transform:rotate(720deg)}}`;
document.head.appendChild(cfStyle);
