// ══════════════════════════════════════════════════════════════
//  LA FRASE ESBOJARRADA · js/frase-esbojarrada.js
//  Firebase: frase_esbojarrada / frase_1 … frase_6
// ══════════════════════════════════════════════════════════════

// ── CONSTANTS ─────────────────────────────────────────────────
const FE_FRASES_INICIALS = [
  "Hi havia una vegada...",
  "Aquest matí...",
  "Un dia vaig anar a...",
  "Jo sóc...",
  "Vaig veure...",
  "He somiat que...",
];

const FE_COLORS_JUGADORS = {
  Jordi: '#e74c3c',   // vermell
  Anna:  '#e67e22',   // taronja
  Laia:  '#27ae60',   // verd
  Mons:  '#8e44ad',   // violeta
  Xu:    '#2980b9',   // blau
  Joa:   '#f39c12',   // groc daurat
};
const FE_COLOR_AUTO = '#6b7280'; // gris per paraules automàtiques

const FE_HORA_INICI = 8;
const FE_HORA_FI = 22;
const FE_MINUTS_TORN = 120; // 2 hores

// ID docs Firebase
const FE_DOCS = ['frase_1','frase_2','frase_3','frase_4','frase_5','frase_6'];

// ── ESTAT LOCAL ───────────────────────────────────────────────
let feDb = null;
let feJugador = null;
let fePartides = {}; // { frase_N: dadoc }
let fePinPropietari = null; // PIN introduït pel propietari en aquesta sessió
let feUnsubscribes = []; // listeners actius
// Paraules afegides en el torn actual (abans de passar el torn)
// { docId: [{text, color}] }  — es buida quan es passa el torn
let feTornEnCurs = {};

// ── FIREBASE ──────────────────────────────────────────────────
function feGetDb() {
  if (feDb) return feDb;
  try {
    if (typeof getFirebaseDb === 'function') {
      feDb = getFirebaseDb();
    } else if (typeof firebase !== 'undefined' && firebase.apps.length) {
      feDb = firebase.firestore();
    }
  } catch(e) {}
  return feDb;
}

// ── HORA ACTIVA (només afecta el comptador, no el joc) ────────
// De 8h a 22h: el comptador de 2h corra normalment.
// De 22h a 8h: el comptador es pausa. Es pot jugar igualment.
function feEsHoraActiva() {
  const h = new Date().getHours();
  return h >= FE_HORA_INICI && h < FE_HORA_FI;
}

// Calcula quants SEGONS "actius" (dins 8h-22h) han transcorregut
// des d'un timestamp fins ara. La nit no compta.
function feSegonsActiusDesde(tsMillis) {
  if (!tsMillis) return 0;
  const ara = Date.now();
  if (tsMillis >= ara) return 0;

  const HORA_INICI_MS = FE_HORA_INICI * 3600 * 1000;
  const HORA_FI_MS    = FE_HORA_FI    * 3600 * 1000;
  const DIA_MS = 24 * 3600 * 1000;

  let segonsActius = 0;
  let cursor = tsMillis;

  while (cursor < ara) {
    const iniciDia = cursor - (cursor % DIA_MS);
    const franjaIniciAvui = iniciDia + HORA_INICI_MS;
    const franjaFiAvui    = iniciDia + HORA_FI_MS;

    if (cursor < franjaIniciAvui) {
      // Abans de les 8h: saltem fins a les 8h
      cursor = franjaIniciAvui;
    } else if (cursor >= franjaFiAvui) {
      // Despres de les 22h: saltem fins a les 8h de l'endema
      cursor = franjaIniciAvui + DIA_MS;
    } else {
      // Dins la franja activa: acumulem fins al fi del segment
      const fiSegment = Math.min(ara, franjaFiAvui);
      segonsActius += Math.floor((fiSegment - cursor) / 1000);
      cursor = franjaFiAvui;
    }
  }
  return segonsActius;
}

// ── HASH PIN (simple, no criptogràfic — és un joc!) ───────────
async function feHashPin(pin) {
  const enc = new TextEncoder().encode('fe_salt_acores_' + pin);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('').slice(0,16);
}

// ── INICIAR JOC ───────────────────────────────────────────────
function iniciarFraseEsbojarrada() {
  feJugador = jugadorActiu;
  fePinPropietari = null;
  feTornEnCurs = {};
  // Desactivem listeners antics
  feUnsubscribes.forEach(u => u && u());
  feUnsubscribes = [];

  mostraScreen('frase-esbojarrada-inici');
  feRenderInici();
  feCarregarPartides();
}

// ── CARREGAR PARTIDES (amb listener real-time) ─────────────────
function feCarregarPartides() {
  const db = feGetDb();
  if (!db) {
    feRenderError('No es pot connectar a Firebase.');
    return;
  }
  fePartides = {};
  let carregades = 0;

  FE_DOCS.forEach(docId => {
    const unsub = db.collection('frase_esbojarrada').doc(docId)
      .onSnapshot(snap => {
        if (snap.exists) {
          fePartides[docId] = { id: docId, ...snap.data() };
        } else {
          fePartides[docId] = null;
        }
        carregades++;
        // Actualitzem la UI quan tenim totes
        if (carregades >= FE_DOCS.length || Object.keys(fePartides).length > 0) {
          feActualitzarUI();
        }
      }, err => {
        console.error('FE listener error:', docId, err);
      });
    feUnsubscribes.push(unsub);
  });
}

function feActualitzarUI() {
  const screenActiva = document.querySelector('[id^="screen-frase"]:not([style*="display: none"]):not([style*="display:none"])');
  const nomScreen = screenActiva?.id?.replace('screen-', '');

  if (nomScreen === 'frase-esbojarrada-inici') {
    feRenderInici();
  } else if (nomScreen === 'frase-esbojarrada-meva') {
    feRenderMeva();
  } else if (nomScreen === 'frase-esbojarrada-torn') {
    feRenderTorn();
  }
}

// ── PANTALLA INICI ────────────────────────────────────────────
function feRenderInici() {
  const cont = document.getElementById('frase-esbojarrada-inici-cont');
  if (!cont) return;

  const inicialitzades = FE_DOCS.filter(id => fePartides[id]).length;
  const noInicialitzades = inicialitzades === 0;

  // Detectem si el jugador té propietat assignada
  const mevaFrase = FE_DOCS.find(id => fePartides[id]?.propietari === feJugador);
  const mevaPartida = mevaFrase ? fePartides[mevaFrase] : null;

  // Torns pendents (frases on és el torn del jugador)
  const tornsPendents = FE_DOCS.filter(id => {
    const p = fePartides[id];
    if (!p || p.propietari === feJugador) return false;
    return feTornActual(p) === feJugador;
  });

  cont.innerHTML = `
    <div class="fe-inici-wrap">
      <div class="joc-header-fila">
        <button class="mapa-back-btn" onclick="feSortir()">← Tornar</button>
      </div>
      <div class="joc-titol-fila">
        <span class="joc-titol-emoji">✍️</span>
        <span class="joc-titol-text gradient-text">La Frase Esbojarrada</span>
      </div>

      <div class="fe-jugador-pill" style="border-color:${FE_COLORS_JUGADORS[feJugador]}44">
        <img src="${IMGS[feJugador]}" class="fe-mini-avatar">
        <span style="font-weight:700">${feJugador}</span>
        <span class="fe-color-dot" style="background:${FE_COLORS_JUGADORS[feJugador]}"></span>
      </div>

      ${noInicialitzades ? `
        <div class="fe-avís-buit">
          <div class="fe-avis-emoji">⏳</div>
          <div class="fe-avis-text">Les partides encara no s'han inicialitzat.<br>
            L'administrador les activarà el primer dia del viatge.</div>
        </div>
      ` : `
        ${tornsPendents.length > 0 ? `
          <div class="fe-torn-avis">
            🖊️ És el teu torn a <strong>${tornsPendents.length}</strong> frase${tornsPendents.length > 1 ? 's' : ''}!
          </div>
        ` : ''}

        <div class="fe-botons-principals">
          ${mevaPartida ? `
            <button class="fe-btn-meva" onclick="feAnarMeva()">
              🔒 La meva frase <span class="fe-btn-sub">(propietari)</span>
            </button>
          ` : ''}
          <button class="fe-btn-jugar" onclick="feAnarTorn()">
            ✍️ Afegir paraules
            ${!feEsHoraActiva() ? '<span class="fe-btn-sub">⏸ Comptador pausat (nit)</span>' : ''}
          </button>
        </div>

        <div class="fe-frases-resum">
          ${FE_DOCS.map(id => feRenderResumFrase(id)).join('')}
        </div>
      `}
    </div>
  `;
}

function feRenderResumFrase(docId) {
  const p = fePartides[docId];
  if (!p) return `<div class="fe-resum-frase buit"><span class="fe-resum-num">${docId.replace('_',' ')}</span><span class="fe-resum-estat">No inicialitzada</span></div>`;

  const esPropietari = p.propietari === feJugador;
  const esTornMeu = feTornActual(p) === feJugador && !esPropietari;
  const numParaules = (p.paraules || []).length;
  const propColor = FE_COLORS_JUGADORS[p.propietari] || '#888';

  return `
    <div class="fe-resum-frase ${esTornMeu ? 'torn-meu' : ''} ${esPropietari ? 'propietari' : ''}">
      <div class="fe-resum-header">
        <span class="fe-resum-propietari" style="color:${propColor}">
          <img src="${IMGS[p.propietari]}" class="fe-micro-avatar">
          ${p.propietari}
        </span>
        ${esPropietari ? '<span class="fe-badge-prop">La teva frase 🔒</span>' : ''}
        ${esTornMeu ? '<span class="fe-badge-torn">✏️ Torn teu!</span>' : ''}
      </div>
      <div class="fe-resum-inici">"${p.text_inicial}"</div>
      <div class="fe-resum-stats">${numParaules} paraules · torn: ${feTornActual(p) || '—'}</div>
    </div>
  `;
}

// ── PANTALLA "LA MEVA FRASE" (propietari) ─────────────────────
function feAnarMeva() {
  mostraScreen('frase-esbojarrada-meva');
  feRenderMeva();
}

function feRenderMeva() {
  const cont = document.getElementById('frase-esbojarrada-meva-cont');
  if (!cont) return;

  const mevaFrase = FE_DOCS.find(id => fePartides[id]?.propietari === feJugador);
  const p = mevaFrase ? fePartides[mevaFrase] : null;

  if (!p) {
    cont.innerHTML = `<div class="fe-error">No tens cap frase assignada.</div>`;
    return;
  }

  // Si no tenim el PIN en sessió, demanem-lo
  if (!fePinPropietari) {
    feRenderDemanarPin(cont, p);
    return;
  }

  // Tenim el PIN — mostrem la frase sencera
  feRenderFraseSencera(cont, p);
}

function feRenderDemanarPin(cont, p) {
  const tePinAssignat = !!p.pin_hash;
  cont.innerHTML = `
    <div class="fe-pin-wrap">
      <div class="joc-header-fila">
        <button class="mapa-back-btn" onclick="mostraScreen('frase-esbojarrada-inici');feRenderInici()">← Tornar</button>
      </div>
      <div class="fe-pin-emoji">🔒</div>
      <div class="fe-pin-titol">La teva frase secreta</div>
      <div class="fe-pin-desc">
        ${tePinAssignat
          ? 'Introdueix el teu PIN per veure la frase sencera.'
          : 'Crea un PIN per protegir la teva frase. Recorda\'l bé!'}
      </div>
      <div class="fe-pin-input-wrap">
        <input type="password" inputmode="numeric" maxlength="6"
          id="fe-pin-input" class="fe-pin-input" placeholder="••••"
          onkeydown="if(event.key==='Enter') feValidarPin('${p.id}', ${!tePinAssignat})">
        <div class="fe-pin-error" id="fe-pin-error" style="display:none">PIN incorrecte. Torna-ho a intentar.</div>
      </div>
      <button class="fe-btn-pin" onclick="feValidarPin('${p.id}', ${!tePinAssignat})">
        ${tePinAssignat ? 'Accedir 🔓' : 'Crear PIN ✓'}
      </button>
    </div>
  `;
  setTimeout(() => document.getElementById('fe-pin-input')?.focus(), 100);
}

async function feValidarPin(docId, esNou) {
  const input = document.getElementById('fe-pin-input');
  const pin = input?.value?.trim();
  if (!pin || pin.length < 3) {
    document.getElementById('fe-pin-error').textContent = 'El PIN ha de tenir almenys 3 caràcters.';
    document.getElementById('fe-pin-error').style.display = 'block';
    return;
  }

  const hash = await feHashPin(pin);
  const p = fePartides[docId];

  if (esNou) {
    // Guardem el nou PIN
    try {
      await feGetDb().collection('frase_esbojarrada').doc(docId).update({ pin_hash: hash });
      fePinPropietari = pin;
      feRenderMeva();
    } catch(e) {
      document.getElementById('fe-pin-error').textContent = 'Error guardant el PIN. Torna-ho a intentar.';
      document.getElementById('fe-pin-error').style.display = 'block';
    }
  } else {
    if (hash === p.pin_hash) {
      fePinPropietari = pin;
      feRenderMeva();
    } else {
      const err = document.getElementById('fe-pin-error');
      err.textContent = 'PIN incorrecte. Torna-ho a intentar.';
      err.style.display = 'block';
      input.value = '';
      input.focus();
    }
  }
}

function feRenderFraseSencera(cont, p) {
  const paraules = p.paraules || [];
  cont.innerHTML = `
    <div class="fe-meva-wrap">
      <div class="joc-header-fila">
        <button class="mapa-back-btn" onclick="mostraScreen('frase-esbojarrada-inici');feRenderInici()">← Tornar</button>
      </div>
      <div class="joc-titol-fila">
        <span class="joc-titol-emoji">🔒</span>
        <span class="joc-titol-text">La meva frase</span>
      </div>

      <div class="fe-frase-sencera-wrap">
        <div class="fe-frase-text">
          <span class="fe-text-inicial">${p.text_inicial || ''}</span>
          ${feRenderParaules(paraules, true)}
        </div>
        <div class="fe-frase-stats">
          ${paraules.length} paraules · Torn actual: <strong>${feTornActual(p) || 'Esperant...'}</strong>
        </div>
      </div>

      <div class="fe-llegenda">
        ${Object.entries(FE_COLORS_JUGADORS).map(([nom, color]) => `
          <span class="fe-llegenda-item">
            <span class="fe-llegenda-dot" style="background:${color}"></span>${nom}
          </span>
        `).join('')}
        <span class="fe-llegenda-item">
          <span class="fe-llegenda-dot" style="background:${FE_COLOR_AUTO}"></span>Automàtica
        </span>
      </div>
    </div>
  `;
}

// ── PANTALLA TORN (afegir paraula) ────────────────────────────
function feAnarTorn() {
  mostraScreen('frase-esbojarrada-torn');
  feRenderTorn();
}

function feRenderTorn() {
  const cont = document.getElementById('frase-esbojarrada-torn-cont');
  if (!cont) return;

  // Frases on es el torn del jugador
  const frasesTorns = FE_DOCS
    .map(id => fePartides[id])
    .filter(p => p && p.propietari !== feJugador && feTornActual(p) === feJugador);

  if (frasesTorns.length === 0) {
    cont.innerHTML = `
      <div class="fe-torn-wrap">
        <div class="joc-header-fila">
          <button class="mapa-back-btn" onclick="mostraScreen('frase-esbojarrada-inici');feRenderInici()">← Tornar</button>
        </div>
        <div class="fe-sense-torns">
          <div class="fe-fo-emoji">✅</div>
          <div class="fe-fo-titol">Ja has jugat tots els torns!</div>
          <div class="fe-fo-desc">Ara has d'esperar que els altres afegeixin les seves paraules.</div>
        </div>
      </div>`;
    return;
  }

  // Mostrem totes les frases amb torn pendent
  cont.innerHTML = `
    <div class="fe-torn-wrap">
      <div class="joc-header-fila">
        <button class="mapa-back-btn" onclick="mostraScreen('frase-esbojarrada-inici');feRenderInici()">← Tornar</button>
      </div>
      <div class="joc-titol-fila">
        <span class="joc-titol-emoji">✍️</span>
        <span class="joc-titol-text">El teu torn</span>
      </div>
      <div class="fe-torns-llista">
        ${frasesTorns.map(p => feRenderTornFrase(p)).join('')}
      </div>
    </div>
  `;
}

function feRenderTornFrase(p) {
  const paraules = p.paraules || [];
  // Paraules acumulades en aquest torn (sessió local, abans de passar el torn)
  const acumulades = feTornEnCurs[p.id] || [];
  const lletresAcumulades = acumulades.reduce((s, pw) => s + feLletres(pw.text), 0);
  const tornComplet = lletresAcumulades >= 4;

  // Últimes 5 paraules de Firebase (el jugador NO veu tota la frase)
  // Si hi ha paraules acumulades localment, les mostrem en lloc de les de Firebase
  const ultimesFirebase = paraules.slice(-5);
  const hiHaMes = paraules.length > 5;
  const textInicial = p.text_inicial || '';
  const propColor = FE_COLORS_JUGADORS[p.propietari] || '#888';

  // Temps restant per aquest torn
  const tempsTorn = feTempsRestantTorn(p);

  // Última paraula de Firebase per a la revisió
  const darreraParaula = paraules.length > 0 ? paraules[paraules.length - 1] : null;
  const potDemanarRevisio = darreraParaula && !darreraParaula.revisio_demanada && acumulades.length === 0;

  // Preview: ultimes Firebase + acumulades locals
  const totesPreview = [...ultimesFirebase, ...acumulades];
  const ultimes5Preview = totesPreview.slice(-5);
  const hiHaMesPreview = (paraules.length + acumulades.length) > 5;

  return `
    <div class="fe-torn-frase-card" id="fe-torn-${p.id}">
      <div class="fe-torn-cap">
        <div class="fe-torn-prop">
          <img src="${IMGS[p.propietari]}" class="fe-micro-avatar">
          <span style="color:${propColor};font-weight:700">${p.propietari}</span>
          <span class="fe-torn-prop-label">propietari</span>
        </div>
        <div class="fe-torn-timer ${tempsTorn < 30 ? 'urgent' : ''}" id="fe-timer-${p.id}">
          ⏱ ${feFormatarTemps(tempsTorn)}
        </div>
      </div>

      <div class="fe-torn-frase-preview">
        ${!hiHaMesPreview ? `<span class="fe-text-inicial">${textInicial}</span>` : '<span class="fe-punts-suspensius">…</span>'}
        ${ultimes5Preview.length > 0 ? feRenderParaules(ultimes5Preview, false) : ''}
      </div>

      ${acumulades.length > 0 ? `
        <div class="fe-lletres-progres">
          <div class="fe-lletres-bar-wrap">
            <div class="fe-lletres-bar" style="width:${Math.min(100, lletresAcumulades / 4 * 100)}%"></div>
          </div>
          <span class="fe-lletres-comptador ${tornComplet ? 'complet' : ''}">${lletresAcumulades}/4 lletres</span>
        </div>
      ` : ''}

      ${!tornComplet ? `
        <div class="fe-torn-input-area">
          <input type="text" class="fe-paraula-input" id="fe-input-${p.id}"
            placeholder="Escriu una paraula..."
            maxlength="40"
            onkeydown="if(event.key==='Enter') feEnviarParaula('${p.id}')">
          <button class="fe-btn-enviar" onclick="feEnviarParaula('${p.id}')">
            Afegir →
          </button>
        </div>
        <div class="fe-input-hint">
          Les paraules amb apòstrof o guionet compten com una sola (d'ell, vesteix-te…)
        </div>
      ` : `
        <div class="fe-torn-complet-wrap">
          <div class="fe-torn-complet-text">
            ✅ ${acumulades.map(pw => pw.text).join(' + ')} · ${lletresAcumulades} lletres
          </div>
          <button class="fe-btn-confirmar-torn" onclick="feConfirmarTorn('${p.id}')">
            Confirmar i passar torn →
          </button>
          <button class="fe-btn-afegir-mes" onclick="feAfegirMes('${p.id}')">
            + Afegir una paraula més
          </button>
        </div>
      `}

      ${potDemanarRevisio ? `
        <div class="fe-revisio-wrap">
          <button class="fe-btn-revisio" onclick="feDemanarRevisio('${p.id}', '${darreraParaula.text.replace(/'/g,"\\'")}')">
            🔍 Demanar revisió de "${darreraParaula.text}"
          </button>
        </div>
      ` : darreraParaula?.revisio_demanada && acumulades.length === 0 ? `
        <div class="fe-revisio-demanada">⏳ Revisió demanada per "${darreraParaula.text}"</div>
      ` : ''}

      <div class="fe-torn-error" id="fe-err-${p.id}" style="display:none"></div>
    </div>
  `;
}

// ── TEMPS RESTANT ─────────────────────────────────────────────
// Compte nomes els segons dins la franja 8h-22h.
// De nit el comptador es pausa.
function feTempsRestantTorn(p) {
  const limitSegons = FE_MINUTS_TORN * 60;
  if (!p.ultima_paraula_ts) return limitSegons;
  const ultima = p.ultima_paraula_ts.toMillis ? p.ultima_paraula_ts.toMillis() : p.ultima_paraula_ts;
  const segonsActius = feSegonsActiusDesde(ultima);
  return Math.max(0, limitSegons - segonsActius);
}

function feFormatarTemps(segons) {
  if (segons <= 0) return '0:00';
  const h = Math.floor(segons / 3600);
  const m = Math.floor((segons % 3600) / 60);
  const s = segons % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}:${s.toString().padStart(2,'0')}`;
}

// ── UTILS LLETRES ─────────────────────────────────────────────
// Compta les lletres d'una paraula (sense espais ni puntuació)
function feLletres(text) {
  return (text || '').replace(/[^a-zA-ZàáâãäåæçèéêëìíîïðñòóôõöùúûüýÿÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖÙÚÛÜÝ]/g, '').length;
}

// ── ENVIAR PARAULA ────────────────────────────────────────────
// Acumula localment fins a tenir >= 4 lletres. Llavors es pot confirmar el torn.
async function feEnviarParaula(docId) {
  const input = document.getElementById(`fe-input-${docId}`);
  const errDiv = document.getElementById(`fe-err-${docId}`);
  const paraula = input?.value?.trim();

  errDiv.style.display = 'none';

  if (!paraula) {
    errDiv.textContent = "Escriu una paraula abans d'enviar.";
    errDiv.style.display = 'block';
    return;
  }

  // Validació: una sola paraula (pot tenir apòstrof o guionet)
  if (!/^[a-zA-ZàáâãäåæçèéêëìíîïðñòóôõöùúûüýÿÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖÙÚÛÜÝ'''\-·\.!?,;:]+$/.test(paraula)) {
    errDiv.textContent = "Només s'accepten lletres, apòstrofs, guions i puntuació bàsica.";
    errDiv.style.display = 'block';
    return;
  }

  const p = fePartides[docId];
  if (!p || feTornActual(p) !== feJugador) {
    errDiv.textContent = 'No és el teu torn en aquesta frase.';
    errDiv.style.display = 'block';
    return;
  }

  // Acumulem localment
  if (!feTornEnCurs[docId]) feTornEnCurs[docId] = [];
  feTornEnCurs[docId].push({ text: paraula, color: FE_COLORS_JUGADORS[feJugador] });

  input.value = '';
  // Re-render la targeta (sense re-renderitzar tota la pantalla per no perdre focus)
  feRenderTorn();
  // Focus a l'input si encara cal escriure
  const lletres = feTornEnCurs[docId].reduce((s, pw) => s + feLletres(pw.text), 0);
  if (lletres < 4) {
    setTimeout(() => document.getElementById(`fe-input-${docId}`)?.focus(), 50);
  }
}

// ── CONFIRMAR TORN ─────────────────────────────────────────────
// Envia totes les paraules acumulades a Firebase i passa el torn.
async function feConfirmarTorn(docId) {
  const acumulades = feTornEnCurs[docId] || [];
  if (acumulades.length === 0) return;

  const p = fePartides[docId];
  if (!p || feTornActual(p) !== feJugador) return;

  const botoConf = document.querySelector(`#fe-torn-${docId} .fe-btn-confirmar-torn`);
  if (botoConf) { botoConf.disabled = true; botoConf.textContent = '…'; }

  try {
    const db = feGetDb();
    const paraules = [...(p.paraules || [])];
    acumulades.forEach(pw => {
      paraules.push({
        text: pw.text,
        autor: feJugador,
        color: pw.color,
        automatica: false,
        ts: Date.now(),
      });
    });

    const ordre = p.ordre || [];
    const tornActualIdx = ordre.indexOf(feTornActual(p));
    const nouTornIdx = (tornActualIdx + 1) % ordre.length;

    await db.collection('frase_esbojarrada').doc(docId).update({
      paraules,
      torn_actual_idx: nouTornIdx,
      ultima_paraula_ts: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Netegem les acumulades d'aquesta frase
    delete feTornEnCurs[docId];
    feRenderTorn();
  } catch(e) {
    const errDiv = document.getElementById(`fe-err-${docId}`);
    if (errDiv) { errDiv.textContent = 'Error en guardar. Torna-ho a intentar.'; errDiv.style.display = 'block'; }
    if (botoConf) { botoConf.disabled = false; botoConf.textContent = 'Confirmar i passar torn →'; }
  }
}



// Usada per paraules automàtiques (timeout) i internament
async function feAfegirParaula(docId, text, autor, color, esAutomatica) {
  const db = feGetDb();
  const p = fePartides[docId];
  const paraules = [...(p.paraules || [])];

  paraules.push({ text, autor, color, automatica: esAutomatica, ts: Date.now() });

  const ordre = p.ordre || [];
  const tornActualIdx = ordre.indexOf(feTornActual(p));
  const nouTornIdx = (tornActualIdx + 1) % ordre.length;

  await db.collection('frase_esbojarrada').doc(docId).update({
    paraules,
    torn_actual_idx: nouTornIdx,
    ultima_paraula_ts: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

// ── DEMANAR REVISIÓ ───────────────────────────────────────────
// Marca l'última paraula com a revisió pendent. El torn NO passa:
// el jugador ha d'esperar la resolució de l'admin abans de jugar.
async function feDemanarRevisio(docId) {
  const p = fePartides[docId];
  if (!p) return;
  const paraules = [...(p.paraules || [])];
  if (paraules.length === 0) return;

  paraules[paraules.length - 1] = {
    ...paraules[paraules.length - 1],
    revisio_demanada: true,
    revisio_qui: feJugador,
    revisio_ts: Date.now(),
  };

  // No canviem torn_actual_idx: el torn segueix sent del jugador que ha demanat revisió
  await feGetDb().collection('frase_esbojarrada').doc(docId).update({ paraules });
  feRenderTorn();
}

// ── TORN ACTUAL ───────────────────────────────────────────────
function feTornActual(p) {
  if (!p || !p.ordre || p.ordre.length === 0) return null;
  const idx = p.torn_actual_idx || 0;
  return p.ordre[idx % p.ordre.length];
}

// ── RENDER PARAULES AMB COLOR ──────────────────────────────────
function feRenderParaules(paraules, mostrarTotes) {
  if (!paraules || paraules.length === 0) return '<span class="fe-frase-buida">(sense paraules encara)</span>';
  return paraules.map(pw => {
    const color = pw.color || FE_COLOR_AUTO;
    const esAuto = pw.automatica;
    return `<span class="fe-paraula-chip ${esAuto ? 'automatica' : ''}"
      style="--chip-color:${color};border-color:${color}44;color:${color}"
      title="${pw.autor}${esAuto ? ' (automàtica)' : ''}"
    >${pw.text}</span>`;
  }).join(' ');
}

// ── COMPROVAR TORN PER BANNER INDEX.HTML ───────────────────────
async function fraseEsbojarradaComprovarTorn() {
  const nom = localStorage.getItem('app_jugador');
  if (!nom) return;

  const banner = document.getElementById('frase-esbojarrada-banner');
  if (!banner) return;

  try {
    const db = feGetDb();
    if (!db) return;

    const snaps = await Promise.all(FE_DOCS.map(id =>
      db.collection('frase_esbojarrada').doc(id).get()
    ));

    const tornsPendents = snaps.filter(snap => {
      if (!snap.exists) return false;
      const p = snap.data();
      if (p.propietari === nom) return false;
      const ordre = p.ordre || [];
      const idx = p.torn_actual_idx || 0;
      return ordre[idx % ordre.length] === nom;
    }).length;

    if (tornsPendents > 0) {
      banner.style.display = 'flex';
      const txt = banner.querySelector('.fe-banner-text');
      if (txt) txt.textContent = `És el teu torn a ${tornsPendents} frase${tornsPendents > 1 ? 's' : ''} esbojarrada${tornsPendents > 1 ? 's' : ''}!`;
    } else {
      banner.style.display = 'none';
    }
  } catch(e) {}
}

// ── SORTIR ────────────────────────────────────────────────────
function feSortir() {
  feUnsubscribes.forEach(u => u && u());
  feUnsubscribes = [];
  fePartides = {};
  mostraScreen('joc-selector');
}

// ── ADMIN: INICIALITZAR PARTIDES ──────────────────────────────
async function feAdminInicialitzar() {
  const db = feGetDb();
  if (!db) { alert('No Firebase'); return; }

  const jugadors = ['Jordi','Anna','Laia','Mons','Xu','Joa'];
  // Assignació aleatòria de propietaris
  const propietarisMesclats = [...jugadors].sort(() => Math.random() - 0.5);

  const batch = db.batch();
  FE_DOCS.forEach((docId, i) => {
    const propietari = propietarisMesclats[i];
    // Ordre de torns: tots els jugadors excepte el propietari, en ordre aleatori
    const ordre = jugadors.filter(j => j !== propietari).sort(() => Math.random() - 0.5);

    const ref = db.collection('frase_esbojarrada').doc(docId);
    batch.set(ref, {
      text_inicial: FE_FRASES_INICIALS[i],
      propietari,
      pin_hash: '',
      ordre,
      torn_actual_idx: 0,
      paraules: [],
      ultima_paraula_ts: null,
      actiu: true,
    });
  });

  await batch.commit();
  return propietarisMesclats; // per mostrar assignació a l'admin
}

async function feAdminReiniciar() {
  return feAdminInicialitzar();
}

async function feAdminEditarParaula(docId, idxParaula, nouText) {
  const db = feGetDb();
  const snap = await db.collection('frase_esbojarrada').doc(docId).get();
  if (!snap.exists) return;
  const paraules = snap.data().paraules || [];
  if (idxParaula < 0 || idxParaula >= paraules.length) return;
  paraules[idxParaula].text = nouText;
  paraules[idxParaula].editada_admin = true;
  await db.collection('frase_esbojarrada').doc(docId).update({ paraules });
}

// ── ERROR UI ──────────────────────────────────────────────────
function feRenderError(msg) {
  const cont = document.getElementById('frase-esbojarrada-inici-cont');
  if (cont) cont.innerHTML = `<div class="fe-error">${msg}</div>`;
}
