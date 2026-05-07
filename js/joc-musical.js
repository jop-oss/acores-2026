// js/joc-musical.js
// Joc Musical — Rock Català · Açores 2026
// Dues modalitats: Intro (àudio) i Lletra (estrofes)

// ══════════════════════════════════════════════════════════════
//  CONSTANTS I ESTAT
// ══════════════════════════════════════════════════════════════

const JM_MODE_INTRO  = 'intro';
const JM_MODE_LLETRA = 'lletra';

let jmMode        = null;   // 'intro' | 'lletra'
let jmLlista      = [];     // cançons barrejades per aquesta sessió
let jmIndex       = 0;      // índex actual dins jmLlista
let jmCanco       = null;   // cançó actual
let jmAudio       = null;   // objecte Audio actiu
let jmEstrofaActual = 0;    // per al mode lletra
let jmSolucioVista = false; // s'ha mostrat la solució?
let jmIntroFase   = 1;      // 1 = 5s, 2 = 10s

// ══════════════════════════════════════════════════════════════
//  ENTRADA AL JOC
// ══════════════════════════════════════════════════════════════

function iniciarJocMusical() {
  jmAturarAudio();
  mostraScreen('joc-musical-inici');
  jmRenderInici();
}

function jmRenderInici() {
  const cont = document.getElementById('joc-musical-inici-cont');
  cont.innerHTML = `
    <div class="jm-inici-wrap">
      <div class="joc-header-fila">
        <button class="mapa-back-btn" onclick="jmSortir()">← Tornar</button>
      </div>

      <div class="joc-titol-fila" style="align-items:center;text-align:center;width:100%">
        <span class="joc-titol-emoji">🎸</span>
        <span class="joc-titol-text">Joc Musical</span>
      </div>

      <p class="jm-subtitol">150 cançons de rock català · Endevina-les!</p>

      <div class="jm-modes-grid">
        <button class="jm-mode-btn" onclick="jmSeleccionarMode('${JM_MODE_INTRO}')">
          <span class="jm-mode-emoji">🎵</span>
          <span class="jm-mode-nom">Per la intro</span>
          <span class="jm-mode-desc">Escolta els primers segons<br>i endevina la cançó</span>
          <span class="jm-mode-badge">150 cançons</span>
        </button>
        <button class="jm-mode-btn" onclick="jmSeleccionarMode('${JM_MODE_LLETRA}')">
          <span class="jm-mode-emoji">📝</span>
          <span class="jm-mode-nom">Per la lletra</span>
          <span class="jm-mode-desc">Apareix estrofa a estrofa<br>fins que l'endevinis</span>
          <span class="jm-mode-badge">50 cançons</span>
        </button>
      </div>
    </div>
  `;
}

function jmSeleccionarMode(mode) {
  jmMode = mode;
  const font = mode === JM_MODE_INTRO ? JM_CANCONS : JM_AMB_LLETRA;
  jmLlista = jmBarrejar([...font]);
  jmIndex  = 0;
  jmCarregarCanco();
}

// ══════════════════════════════════════════════════════════════
//  JOC PRINCIPAL
// ══════════════════════════════════════════════════════════════

function jmCarregarCanco() {
  jmAturarAudio();
  jmCanco        = jmLlista[jmIndex];
  jmEstrofaActual = 0;
  jmSolucioVista  = false;
  jmIntroFase     = 1;
  mostraScreen('joc-musical-joc');
  jmRenderJoc();
}

function jmRenderJoc() {
  const cont = document.getElementById('joc-musical-joc-cont');
  const num  = jmIndex + 1;
  const total = jmLlista.length;

  if (jmMode === JM_MODE_INTRO) {
    cont.innerHTML = jmHtmlIntro(num, total);
  } else {
    cont.innerHTML = jmHtmlLletra(num, total);
  }
}

// ── MODE INTRO ────────────────────────────────────────────────

function jmHtmlIntro(num, total) {
  return `
    <div class="jm-joc-wrap">
      <div class="joc-header-fila">
        <button class="mapa-back-btn" onclick="jmTornarInici()">← Tornar</button>
        <span class="jm-comptador">${num} / ${total}</span>
      </div>

      <div class="joc-titol-fila" style="align-items:center;text-align:center;width:100%">
        <span class="joc-titol-emoji">🎵</span>
        <span class="joc-titol-text">Per la intro</span>
      </div>

      <div class="jm-pregunta-card" id="jm-pregunta-card">
        <div class="jm-pregunta-icon">🎸</div>
        <p class="jm-pregunta-text">De quina cançó és aquesta intro?</p>

        <div class="jm-audio-controls" id="jm-audio-controls">
          <button class="jm-btn-play" id="jm-btn-play" onclick="jmReproduir5()">
            ▶ Reproduir intro (5s)
          </button>
          <div class="jm-ona-wrap" id="jm-ona-wrap" style="display:none">
            <div class="jm-ona-bar"></div><div class="jm-ona-bar"></div>
            <div class="jm-ona-bar"></div><div class="jm-ona-bar"></div>
            <div class="jm-ona-bar"></div>
          </div>
        </div>

        <div class="jm-accions" id="jm-accions-intro">
          <button class="jm-btn-solucio" onclick="jmMostrarSolucio()" id="jm-btn-sol">
            👁 Veure solució
          </button>
        </div>
      </div>

      <div class="jm-solucio-card" id="jm-solucio-card" style="display:none">
        <div class="jm-solucio-canco" id="jm-sol-canco"></div>
        <div class="jm-solucio-artista" id="jm-sol-artista"></div>
        <a class="jm-btn-youtube" id="jm-sol-yt" href="#" target="_blank" rel="noopener">
          ▶ Escoltar a YouTube
        </a>
        <div class="jm-solucio-accions">
          <button class="jm-btn-seguent" onclick="jmSeguent()">Cançó següent →</button>
        </div>
      </div>
    </div>
  `;
}

function jmReproduir5() {
  jmAturarAudio();
  jmIntroFase = 1;
  jmReproduirSegments(5);

  const btn = document.getElementById('jm-btn-play');
  if (btn) btn.textContent = '▶ Reproduint 5s…';

  setTimeout(() => {
    jmAturarAudio();
    const btn2 = document.getElementById('jm-btn-play');
    if (btn2) {
      btn2.textContent = '▶ Repetir intro (5s)';
      btn2.onclick = jmReproduir5;
    }
    // Mostrar botó per sentir els 10s complets
    const ctrl = document.getElementById('jm-audio-controls');
    if (ctrl && !document.getElementById('jm-btn-10s')) {
      const b = document.createElement('button');
      b.id        = 'jm-btn-10s';
      b.className = 'jm-btn-play jm-btn-play--secondary';
      b.textContent = '▶ Sentir fragment complet (10s)';
      b.onclick   = jmReproduir10;
      ctrl.appendChild(b);
    }
    jmOnaStop();
  }, 5100);

  jmOnaStart();
}

function jmReproduir10() {
  jmAturarAudio();
  jmIntroFase = 2;
  jmReproduirSegments(10);

  const btn = document.getElementById('jm-btn-10s');
  if (btn) btn.textContent = '▶ Reproduint 10s…';

  setTimeout(() => {
    jmAturarAudio();
    const btn2 = document.getElementById('jm-btn-10s');
    if (btn2) btn2.textContent = '▶ Repetir fragment (10s)';
    jmOnaStop();
  }, 10100);

  jmOnaStart();
}

function jmReproduirSegments(segons) {
  const fitxer = `audio/${jmCanco.fitxer}`;
  jmAudio = new Audio(fitxer);
  jmAudio.play().catch(() => {});
  setTimeout(() => jmAturarAudio(), segons * 1000);
}

// ── MODE LLETRA ───────────────────────────────────────────────

function jmHtmlLletra(num, total) {
  return `
    <div class="jm-joc-wrap">
      <div class="joc-header-fila">
        <button class="mapa-back-btn" onclick="jmTornarInici()">← Tornar</button>
        <span class="jm-comptador">${num} / ${total}</span>
      </div>

      <div class="joc-titol-fila" style="align-items:center;text-align:center;width:100%">
        <span class="joc-titol-emoji">📝</span>
        <span class="joc-titol-text">Per la lletra</span>
      </div>

      <div class="jm-pregunta-card" id="jm-pregunta-card">
        <div class="jm-pregunta-icon">🎤</div>
        <p class="jm-pregunta-text">De quina cançó és aquesta lletra?</p>

        <div class="jm-estrofes-wrap" id="jm-estrofes-wrap"></div>

        <div class="jm-accions">
          <button class="jm-btn-pista" id="jm-btn-pista" onclick="jmMostrarEstrofa()">
            + Mostrar estrofa
          </button>
          <button class="jm-btn-solucio" onclick="jmMostrarSolucio()">
            👁 Veure solució
          </button>
        </div>
      </div>

      <div class="jm-solucio-card" id="jm-solucio-card" style="display:none">
        <div class="jm-solucio-canco" id="jm-sol-canco"></div>
        <div class="jm-solucio-artista" id="jm-sol-artista"></div>
        <a class="jm-btn-youtube" id="jm-sol-yt" href="#" target="_blank" rel="noopener">
          ▶ Escoltar a YouTube
        </a>
        <div class="jm-solucio-accions">
          <button class="jm-btn-seguent" onclick="jmSeguent()">Cançó següent →</button>
        </div>
      </div>
    </div>
  `;
  // Nota: la primera estrofa s'afegeix just després via jmMostrarEstrofa()
}

// Afegeix la primera estrofa automàticament quan es renderitza el mode lletra
// S'invoca des de mostraScreen via MutationObserver — millor fer-ho directament:
const _jmOriginalMostraScreen = typeof mostraScreen !== 'undefined' ? mostraScreen : null;

function jmMostrarEstrofa() {
  const estrofes = jmCanco.estrofes;
  if (!estrofes) return;
  if (jmEstrofaActual >= estrofes.length) return;

  const wrap = document.getElementById('jm-estrofes-wrap');
  if (!wrap) return;

  const div = document.createElement('div');
  div.className = 'jm-estrofa jm-estrofa--nova';
  div.textContent = estrofes[jmEstrofaActual];
  wrap.appendChild(div);
  jmEstrofaActual++;

  // Si hem mostrat totes les estrofes, amagam el botó pista
  const btn = document.getElementById('jm-btn-pista');
  if (btn && jmEstrofaActual >= estrofes.length) {
    btn.style.display = 'none';
  }
}

// ── SOLUCIÓ ───────────────────────────────────────────────────

function jmMostrarSolucio() {
  jmSolucioVista = true;

  // Si és mode lletra, mostrar totes les estrofes restants
  if (jmMode === JM_MODE_LLETRA) {
    const estrofes = jmCanco.estrofes || [];
    while (jmEstrofaActual < estrofes.length) {
      jmMostrarEstrofa();
    }
    const btn = document.getElementById('jm-btn-pista');
    if (btn) btn.style.display = 'none';
  }

  // Amagar el botó de veure solució
  const btnSol = document.getElementById('jm-btn-sol');
  if (btnSol) btnSol.style.display = 'none';

  // Mostrar la targeta de solució
  const card = document.getElementById('jm-solucio-card');
  const solCanco   = document.getElementById('jm-sol-canco');
  const solArtista = document.getElementById('jm-sol-artista');
  const solYt      = document.getElementById('jm-sol-yt');

  if (card) {
    solCanco.textContent   = jmCanco.canco;
    solArtista.textContent = jmCanco.artista;
    solYt.href             = jmCanco.youtube;
    card.style.display     = 'block';
    card.classList.add('jm-solucio--apareix');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ── NAVEGACIÓ ─────────────────────────────────────────────────

function jmSeguent() {
  jmAturarAudio();
  jmIndex++;
  if (jmIndex >= jmLlista.length) {
    // Hem acabat totes les cançons: barrejar de nou i tornar al principi
    jmLlista = jmBarrejar([...jmLlista]);
    jmIndex  = 0;
  }
  jmCarregarCanco();

  // Si és mode lletra, mostrar la primera estrofa automàticament
  if (jmMode === JM_MODE_LLETRA) {
    // Petita espera perquè el DOM es renderitzi
    setTimeout(() => jmMostrarEstrofa(), 50);
  }
}

function jmTornarInici() {
  jmAturarAudio();
  iniciarJocMusical();
}

function jmSortir() {
  jmAturarAudio();
  mostraScreen('joc-selector');
}

// ── UTILITATS ─────────────────────────────────────────────────

function jmAturarAudio() {
  if (jmAudio) {
    jmAudio.pause();
    jmAudio.currentTime = 0;
    jmAudio = null;
  }
  jmOnaStop();
}

function jmBarrejar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── ANIMACIÓ ONA ──────────────────────────────────────────────

let _jmOnaInterval = null;

function jmOnaStart() {
  const wrap = document.getElementById('jm-ona-wrap');
  if (!wrap) return;
  wrap.style.display = 'flex';
  const bars = wrap.querySelectorAll('.jm-ona-bar');
  _jmOnaInterval = setInterval(() => {
    bars.forEach(b => {
      const h = 8 + Math.random() * 24;
      b.style.height = `${h}px`;
    });
  }, 120);
}

function jmOnaStop() {
  if (_jmOnaInterval) {
    clearInterval(_jmOnaInterval);
    _jmOnaInterval = null;
  }
  const wrap = document.getElementById('jm-ona-wrap');
  if (wrap) wrap.style.display = 'none';
}

// ══════════════════════════════════════════════════════════════
//  HOOK: quan canviem a pantalla joc-musical-joc en mode
//  lletra, mostrar automàticament la primera estrofa
// ══════════════════════════════════════════════════════════════

// Fem patch de mostraScreen per interceptar l'entrada al joc musical
(function() {
  const _orig = window.mostraScreen;
  window.mostraScreen = function(nom) {
    _orig(nom);
    if (nom === 'joc-musical-joc' && jmMode === JM_MODE_LLETRA) {
      setTimeout(() => jmMostrarEstrofa(), 60);
    }
  };
})();
