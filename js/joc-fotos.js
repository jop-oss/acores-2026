// js/joc-fotos.js
// Joc de Fotos — Açores 2026
// localStorage: jocfotos_estat_Nom

// ══════════════════════════════════════════════════════════════
//  CONSTANTS
// ══════════════════════════════════════════════════════════════

const JF_ZOOM_NIVELLS = 5;        // 5 passos de zoom (100→75→50→25→10 pts)
// Escala CSS: zoom 1 = molt a prop, zoom 5 = foto sencera
const JF_ZOOM_ESCALES = [3.5, 2.8, 2.0, 1.4, 1.0];
const JF_CARPETA      = 'img/joc_fotos/';

// ══════════════════════════════════════════════════════════════
//  ESTAT
// ══════════════════════════════════════════════════════════════

let jfLlista     = [];   // fotos barrejades per a aquest jugador/sessió
let jfIndex      = 0;    // índex de la foto actual
let jfFoto       = null; // objecte foto actual
let jfZoom       = 0;    // nivell de zoom actual (0 = màxim zoom)
let jfPistaUsada = false;
let jfResolta    = false;
let jfPtsFoto    = 0;
let jfPtsTotal   = 0;
let jfFotoRespostes = 0; // fotos respostes correctament
// Posició aleatòria del zoom (canvia per cada foto)
let jfZoomX      = 50;   // % horitzontal del focus
let jfZoomY      = 50;   // % vertical del focus

// ══════════════════════════════════════════════════════════════
//  ENTRADA
// ══════════════════════════════════════════════════════════════

function iniciarJocFotos() {
  jfCarregarEstat();
  mostraScreen('jocfotos-joc');
  jfIniciarPartida();
}

// ══════════════════════════════════════════════════════════════
//  PERSISTÈNCIA
// ══════════════════════════════════════════════════════════════

function jfClauEstat(nom) { return `jocfotos_estat_${nom || jugadorActiu}`; }

function jfCarregarEstat() {
  // Carreguem l'ordre de les fotos per a aquest jugador (persistent entre sessions)
  const raw = localStorage.getItem(jfClauEstat());
  const estat = raw ? JSON.parse(raw) : null;

  if (estat && estat.ordre && estat.ordre.length === JF_FOTOS.length) {
    // Restaurar ordre i progrés
    jfLlista = estat.ordre.map(idx => JF_FOTOS[idx]);
    jfIndex  = estat.index || 0;
    jfPtsTotal = estat.ptsTotal || 0;
    jfFotoRespostes = estat.fotoRespostes || 0;
  } else {
    // Primera vegada: barrejar i guardar
    const indices = JF_FOTOS.map((_, i) => i);
    jfBarrejarArray(indices);
    jfLlista = indices.map(i => JF_FOTOS[i]);
    jfIndex  = 0;
    jfPtsTotal = 0;
    jfFotoRespostes = 0;
    jfGuardarEstat();
  }
}

function jfGuardarEstat() {
  const ordre = jfLlista.map(fo => JF_FOTOS.indexOf(fo));
  localStorage.setItem(jfClauEstat(), JSON.stringify({
    ordre, index: jfIndex, ptsTotal: jfPtsTotal, fotoRespostes: jfFotoRespostes
  }));
}

function jfGetPuntsTotals(nom) {
  const raw = localStorage.getItem(jfClauEstat(nom));
  if (!raw) return 0;
  try { return JSON.parse(raw).ptsTotal || 0; } catch { return 0; }
}

// ══════════════════════════════════════════════════════════════
//  PARTIDA
// ══════════════════════════════════════════════════════════════

function jfIniciarPartida() {
  jfFoto       = jfLlista[jfIndex];
  jfZoom       = 0;
  jfPistaUsada = false;
  jfResolta    = false;
  jfPtsFoto    = 0;
  // Posició aleatòria del zoom (diferent per cada foto)
  jfZoomX = 20 + Math.random() * 60;
  jfZoomY = 20 + Math.random() * 60;
  jfRenderJoc();
}

function jfRenderJoc() {
  const cont = document.getElementById('jocfotos-joc-cont');
  const num  = jfIndex + 1;
  const total = jfLlista.length;
  const fo   = jfFoto;

  cont.innerHTML = `
    <div class="jf-wrap">
      <!-- Header -->
      <div class="joc-header-fila">
        <button class="mapa-back-btn" onclick="jfSortir()">← Tornar</button>
        <span class="jf-comptador">${num} / ${total}</span>
        <span class="jf-pts-total">${jfPtsTotal} pts</span>
      </div>

      <div class="joc-titol-fila" style="align-items:center;text-align:center;width:100%">
        <span class="joc-titol-emoji">📸</span>
        <span class="joc-titol-text">Joc de Fotos</span>
      </div>

      <!-- Foto amb zoom -->
      <div class="jf-foto-outer" id="jf-foto-outer">
        <div class="jf-foto-inner" id="jf-foto-inner">
          <img src="${JF_CARPETA}${fo.fitxer}" class="jf-img" id="jf-img" alt="Foto">
        </div>
      </div>

      <!-- Info nivell -->
      <div class="jf-nivell-bar" id="jf-nivell-bar">
        ${jfHtmlNivellBar()}
      </div>

      <!-- Pista (oculta fins que es demani) -->
      <div class="jf-pista-wrap" id="jf-pista-wrap" style="display:none">
        <span class="jf-pista-icon">💡</span>
        <span class="jf-pista-text" id="jf-pista-text"></span>
      </div>

      <!-- Input resposta -->
      <div class="jf-resposta-wrap" id="jf-resposta-wrap">
        <input type="text" class="jf-input" id="jf-input"
          placeholder="Qui és? On és?"
          onkeydown="if(event.key==='Enter') jfComprovarResposta()">
        <button class="jf-btn-ok" onclick="jfComprovarResposta()">✓</button>
      </div>

      <!-- Botons d'acció -->
      <div class="jf-accions" id="jf-accions">
        ${jfHtmlAccions()}
      </div>

      <!-- Resultat foto (ocult fins que s'encerta/rendeix) -->
      <div class="jf-resultat" id="jf-resultat" style="display:none"></div>
    </div>
  `;

  jfAplicarZoom();

  // Focus a l'input
  setTimeout(() => {
    const inp = document.getElementById('jf-input');
    if (inp) inp.focus();
  }, 100);
}

function jfHtmlNivellBar() {
  const pts = jfPtsActuals();
  const dots = Array.from({ length: JF_ZOOM_NIVELLS }, (_, i) => {
    const actiu = i === jfZoom ? 'jf-dot--actiu' : i < jfZoom ? 'jf-dot--passat' : '';
    return `<span class="jf-dot ${actiu}"></span>`;
  }).join('');
  return `<span class="jf-pts-label">${pts} pts si encertes ara</span>${dots}`;
}

function jfHtmlAccions() {
  const btnZoom = jfZoom < JF_ZOOM_NIVELLS - 1
    ? `<button class="jf-btn-zoom" onclick="jfZoomOut()">🔍 Veure més</button>`
    : '';

  const btnPista = !jfPistaUsada && jfFoto.pista && jfZoom >= 2
    ? `<button class="jf-btn-pista" onclick="jfDemanarPista()">💡 Pista</button>`
    : '';

  const btnRendir = !jfResolta
    ? `<button class="jf-btn-rendirse" onclick="jfRendirse()">👁 Revelar</button>`
    : '';

  return btnZoom + btnPista + btnRendir;
}

function jfPtsActuals() {
  if (jfResolta) return jfPtsFoto;
  // Si ha usat la pista al nivell 2, retorna 40
  if (jfPistaUsada && jfZoom === 2) return JF_PTS_PISTA;
  return JF_PTS_FOTO[Math.min(jfZoom, JF_PTS_FOTO.length - 1)];
}

// ══════════════════════════════════════════════════════════════
//  ZOOM
// ══════════════════════════════════════════════════════════════

function jfAplicarZoom() {
  const inner = document.getElementById('jf-foto-inner');
  if (!inner) return;
  const escala = JF_ZOOM_ESCALES[jfZoom];
  // Desplacem la imatge perquè el focus sigui al punt aleatori
  // transform-origin al punt de focus, escala
  inner.style.transform       = `scale(${escala})`;
  inner.style.transformOrigin = `${jfZoomX}% ${jfZoomY}%`;
}

function jfZoomOut() {
  if (jfZoom >= JF_ZOOM_NIVELLS - 1) return;
  jfZoom++;
  jfAplicarZoom();
  document.getElementById('jf-nivell-bar').innerHTML = jfHtmlNivellBar();
  document.getElementById('jf-accions').innerHTML    = jfHtmlAccions();
}

// ══════════════════════════════════════════════════════════════
//  PISTA
// ══════════════════════════════════════════════════════════════

function jfDemanarPista() {
  jfPistaUsada = true;
  const wrap = document.getElementById('jf-pista-wrap');
  const txt  = document.getElementById('jf-pista-text');
  if (wrap && txt) {
    txt.textContent = jfFoto.pista;
    wrap.style.display = 'flex';
  }
  document.getElementById('jf-accions').innerHTML = jfHtmlAccions();
  document.getElementById('jf-nivell-bar').innerHTML = jfHtmlNivellBar();
}

// ══════════════════════════════════════════════════════════════
//  RESPOSTA
// ══════════════════════════════════════════════════════════════

function jfNormalitzar(s) {
  s = s.toLowerCase().trim();
  // Treure accents
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return s;
}

function jfComprovarResposta() {
  const inp = document.getElementById('jf-input');
  if (!inp) return;
  const resposta = jfNormalitzar(inp.value);
  if (!resposta) return;

  const correcta = jfFoto.respostes.includes(resposta);

  if (correcta) {
    jfPtsFoto = jfPtsActuals();
    jfResolta = true;
    jfMostrarEncert();
  } else {
    // Feedback error
    inp.classList.add('jf-input--error');
    inp.value = '';
    inp.placeholder = 'No és correcte, torna-ho a intentar…';
    setTimeout(() => {
      inp.classList.remove('jf-input--error');
      inp.placeholder = 'Qui és? On és?';
    }, 1000);
  }
}

function jfRendirse() {
  jfPtsFoto  = 0;
  jfResolta  = true;
  jfMostrarEncert(true); // revelat sense punts
}

// ══════════════════════════════════════════════════════════════
//  ENCERT / REVELACIÓ
// ══════════════════════════════════════════════════════════════

function jfMostrarEncert(rendida = false) {
  // Mostrar foto sencera
  jfZoom = JF_ZOOM_NIVELLS - 1;
  jfAplicarZoom();

  // Amagar input i accions
  const respWrap = document.getElementById('jf-resposta-wrap');
  const accions  = document.getElementById('jf-accions');
  if (respWrap) respWrap.style.display = 'none';
  if (accions)  accions.style.display  = 'none';

  // Mostrar resultat
  const res = document.getElementById('jf-resultat');
  if (!res) return;
  res.style.display = 'block';

  const respCorrectes = jfFoto.respostes[0]; // primera = la principal
  const icon = rendida ? '😅' : '🎉';
  const msg  = rendida
    ? `Era: <strong>${jfFoto.respostes[jfFoto.respostes.length > 1 ? jfFoto.respostes.findIndex(r => !r.includes(' i ') && !['avis','iaia','avi'].includes(r)) : 0]}</strong>`
    : `✓ Correcte! <strong>${jfPtsFoto} pts</strong>`;

  // Si ha encertat, preguntar l'any
  const htmlAny = !rendida ? `
    <div class="jf-any-wrap" id="jf-any-wrap">
      <p class="jf-any-pregunta">De quin any creus que és?</p>
      <div class="jf-any-input-wrap">
        <input type="number" class="jf-input jf-input-any" id="jf-input-any"
          placeholder="Any" min="1990" max="2025"
          onkeydown="if(event.key==='Enter') jfComprovarAny()">
        <button class="jf-btn-ok" onclick="jfComprovarAny()">✓</button>
      </div>
    </div>` : '';

  res.innerHTML = `
    <div class="jf-res-icon">${icon}</div>
    <div class="jf-res-msg">${msg}</div>
    ${htmlAny}
    <div id="jf-any-resultat"></div>
    <button class="jm-btn-seguent" id="jf-btn-seguent" onclick="jfSeguent()"
      style="${!rendida ? 'display:none' : ''}">
      Foto següent →
    </button>
  `;

  if (rendida) {
    // Actualitzar punts i guardar (0 pts)
    jfPtsTotal += 0;
    jfGuardarEstat();
  }
}

function jfComprovarAny() {
  const inp = document.getElementById('jf-input-any');
  if (!inp || !inp.value) return;
  const anyUsuari = parseInt(inp.value);
  const anyReal   = parseInt(jfFoto.any);
  const diff      = Math.abs(anyUsuari - anyReal);

  let ptsAny = 0;
  let msgAny = '';
  if (diff === 0) {
    ptsAny = JF_PTS_ANY[0];
    msgAny = `🎯 Exacte! +${ptsAny} pts`;
  } else if (diff === 1) {
    ptsAny = JF_PTS_ANY[1];
    msgAny = `📅 Quasi! Era el ${anyReal}. +${ptsAny} pts`;
  } else if (diff === 2) {
    ptsAny = JF_PTS_ANY[2];
    msgAny = `📅 Proper. Era el ${anyReal}. +${ptsAny} pts`;
  } else {
    msgAny = `📅 Era el ${anyReal}. +0 pts`;
  }

  // Amagar l'input d'any
  const anyWrap = document.getElementById('jf-any-wrap');
  if (anyWrap) anyWrap.style.display = 'none';

  // Mostrar resultat any
  const anyRes = document.getElementById('jf-any-resultat');
  if (anyRes) {
    anyRes.innerHTML = `<div class="jf-any-res">${msgAny}</div>`;
  }

  // Actualitzar punts totals
  jfPtsTotal += jfPtsFoto + ptsAny;
  jfFotoRespostes++;
  jfGuardarEstat();

  // Mostrar botó seguent
  const btn = document.getElementById('jf-btn-seguent');
  if (btn) btn.style.display = 'block';

  // Actualitzar el comptador de pts total al header
  const ptsEl = document.querySelector('.jf-pts-total');
  if (ptsEl) ptsEl.textContent = `${jfPtsTotal} pts`;
}

// ══════════════════════════════════════════════════════════════
//  NAVEGACIÓ
// ══════════════════════════════════════════════════════════════

function jfSeguent() {
  jfIndex++;
  if (jfIndex >= jfLlista.length) {
    // Totes les fotos vistes: mostrar resum final
    jfMostrarFinal();
    return;
  }
  jfGuardarEstat();
  jfIniciarPartida();
}

function jfMostrarFinal() {
  const cont = document.getElementById('jocfotos-joc-cont');
  cont.innerHTML = `
    <div class="jf-wrap">
      <div class="joc-header-fila">
        <button class="mapa-back-btn" onclick="jfSortir()">← Tornar</button>
      </div>
      <div class="joc-titol-fila" style="align-items:center;text-align:center;width:100%">
        <span class="joc-titol-emoji">📸</span>
        <span class="joc-titol-text">Joc de Fotos</span>
      </div>
      <div class="jf-final-card">
        <div class="jf-final-icon">🏆</div>
        <div class="jf-final-pts">${jfPtsTotal} pts</div>
        <div class="jf-final-sub">${jfFotoRespostes} de ${jfLlista.length} fotos encertades</div>
        <button class="jm-btn-seguent" onclick="jfSortir()">← Tornar als jocs</button>
      </div>
    </div>
  `;
}

function jfSortir() {
  mostraScreen('joc-selector');
}

// ══════════════════════════════════════════════════════════════
//  UTILITATS
// ══════════════════════════════════════════════════════════════

function jfBarrejarArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
