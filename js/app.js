// Popup personatges — clic sobre el nom o la zona
document.querySelectorAll(".person").forEach((person) => {
  person.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = person.classList.contains("active");
    document.querySelectorAll(".person").forEach((p) => p.classList.remove("active"));
    if (!isActive) person.classList.add("active");
  });
});

// Tanca en clicar fora
document.addEventListener("click", () => {
  document.querySelectorAll(".person").forEach((p) => p.classList.remove("active"));
});

// Flip cards — tap en mobil
document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// ── MODE CLAR/FOSC ────────────────────────────────────────────
function appInicialitzarTema() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;
  const savedTheme = localStorage.getItem("tema");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    toggle.textContent = "☀️";
  }
  toggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    toggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("tema", isLight ? "light" : "dark");
  });
}

// ── IDENTIFICACIO GLOBAL ──────────────────────────────────────
const JUGADORS_APP = ['Anna','Jordi','Laia','Mons','Xu','Joa'];
const AVATARS_APP  = {
  Anna: 'img/avatars/Anna.jpeg', Jordi: 'img/avatars/Jordi.jpeg',
  Laia: 'img/avatars/Laia.jpeg', Mons:  'img/avatars/Mons.jpeg',
  Xu:   'img/avatars/Xu.jpeg',   Joa:   'img/avatars/Joa.jpeg',
  Convidat: 'img/avatars/convidat.png',
};

let appJugadorActiu = localStorage.getItem('app_jugador') || null;

function appInicialitzarNav() {
  appInicialitzarTema();
  const btn = document.getElementById('nav-id-btn');
  if (!btn) return;
  appActualitzarBotoNav();

  // Tanca el menu en clicar fora
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('nav-id-menu');
    if (menu && !menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('visible');
    }
  });
}

function appActualitzarBotoNav() {
  const wrap = document.getElementById('nav-id-wrap');
  const btn = document.getElementById('nav-id-btn');
  if (!btn) return;

  // Botó d'accés a l'administració (només index.html, i només per en Jordi)
  const adminBtn = document.getElementById('adminAccessBtn');
  if (adminBtn) {
    adminBtn.style.display = appJugadorActiu === 'Jordi' ? 'flex' : 'none';
  }

  // Pàgines amb identificació obligatòria mostren l'avís
  const ambAvis = document.body.hasAttribute('data-requereix-id');
  if (appJugadorActiu) {
    btn.innerHTML = `<img src="${AVATARS_APP[appJugadorActiu]}" alt="${appJugadorActiu}" class="nav-id-avatar">`;
    btn.title = appJugadorActiu;
    document.getElementById('nav-id-avis')?.remove();
  } else {
    btn.innerHTML = `<img src="${AVATARS_APP['Convidat']}" alt="Convidat" class="nav-id-avatar">`;
    btn.title = 'Convidat';
    if (ambAvis && wrap && !document.getElementById('nav-id-avis')) {
      const avis = document.createElement('span');
      avis.id = 'nav-id-avis';
      avis.className = 'nav-id-avis';
      avis.textContent = "Identifica't";
      wrap.insertBefore(avis, btn);
    }
  }
}

function appToggleMenu() {
  const menu = document.getElementById('nav-id-menu');
  if (!menu) return;
  menu.classList.toggle('visible');
  if (menu.classList.contains('visible')) appRenderMenu();
}

function appRenderMenu() {
  const menu = document.getElementById('nav-id-menu');
  if (!menu) return;
  menu.innerHTML = JUGADORS_APP.map(nom => `
    <button class="nav-id-menu-item ${nom === appJugadorActiu ? 'actiu' : ''}"
            onclick="appSeleccionarJugador('${nom}')">
      <img src="${AVATARS_APP[nom]}" alt="${nom}">
      <span>${nom}</span>
      ${nom === appJugadorActiu ? '<span class="nav-id-check">&#10003;</span>' : ''}
    </button>`).join('') + `
  <div class="nav-id-menu-sep"></div>
  <button class="nav-id-menu-item nav-id-convidat ${!appJugadorActiu ? 'actiu' : ''}"
          onclick="appDesidentificar()">
    <img src="${AVATARS_APP['Convidat']}" alt="Convidat">
    <span>Convidat</span>
    ${!appJugadorActiu ? '<span class="nav-id-check">&#10003;</span>' : ''}
  </button>`;
}

function appDesidentificar() {
  appJugadorActiu = null;
  localStorage.removeItem('app_jugador');
  localStorage.removeItem('trivial_jugador_actiu');
  appActualitzarBotoNav();
  document.getElementById('nav-id-menu')?.classList.remove('visible');
  document.dispatchEvent(new CustomEvent('app:jugador-canviat', { detail: { nom: null } }));
}

// ── PINS D'IDENTIFICACIÓ (evitar que algú s'identifiqui com un altre) ──
// Mateix projecte Firebase que la resta de l'app
const APP_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBp7lMa2opgXrljNMLykfjxAJl2Y8f5oa8",
  authDomain: "acores-2026.firebaseapp.com",
  projectId: "acores-2026",
  storageBucket: "acores-2026.firebasestorage.app",
  messagingSenderId: "749343671546",
  appId: "1:749343671546:web:aa2e3d6043de9b8c89f543",
};
const ADMIN_MASTER_PIN = '2468'; // permet a en Jordi identificar-se com qualsevol
const INITIAL_PINS_APP = { Anna: '1111', Jordi: '2222', Mons: '3333', Xu: '4444', Laia: '5555', Joa: '6666' };

function appGetDb() {
  if (typeof firebase === 'undefined') return null;
  try {
    if (!firebase.apps.length) firebase.initializeApp(APP_FIREBASE_CONFIG);
    return firebase.firestore();
  } catch (e) { return null; }
}

async function appGetPinsDoc() {
  const db = appGetDb();
  if (!db) return null;
  try {
    const snap = await db.collection('identitats').doc('pins').get();
    return snap.exists ? (snap.data() || {}) : {};
  } catch (e) { return null; }
}

async function appDesarPinPersonal(nom, pin) {
  const db = appGetDb();
  if (!db) return false;
  try {
    await db.collection('identitats').doc('pins').set({ [nom]: pin }, { merge: true });
    return true;
  } catch (e) { return false; }
}

async function appSeleccionarJugador(nom) {
  // Ja ets tu: no cal tornar a demanar res
  if (nom === appJugadorActiu) {
    document.getElementById('nav-id-menu')?.classList.remove('visible');
    return;
  }

  const pins = await appGetPinsDoc();
  if (pins === null) {
    alert('No es pot verificar el PIN ara mateix (sense connexió). Torna-ho a provar.');
    return;
  }

  const pinDesat = pins[nom];

  if (pinDesat) {
    // Ja té un PIN personal definit
    const intent = prompt(`PIN de ${nom}:`);
    if (intent === null) return;
    if (intent !== pinDesat && intent !== ADMIN_MASTER_PIN) {
      alert('PIN incorrecte.');
      return;
    }
  } else {
    // Primer cop que algú s'identifica com aquesta persona: cal el PIN
    // inicial (el que ha repartit en Jordi) i triar-ne un de propi.
    const inicial = prompt(`Primera vegada que t'identifiques com a ${nom}.\nIntrodueix el PIN inicial que et van donar:`);
    if (inicial === null) return;
    if (inicial !== INITIAL_PINS_APP[nom] && inicial !== ADMIN_MASTER_PIN) {
      alert('PIN incorrecte.');
      return;
    }
    let nouPin = null;
    for (;;) {
      nouPin = prompt('Defineix ara un PIN personal de 4 xifres (el faràs servir a partir d\'ara per identificar-te):');
      if (nouPin === null) return;
      if (!/^\d{4}$/.test(nouPin)) { alert('Ha de ser de 4 xifres.'); continue; }
      const confirmacio = prompt('Torna a escriure\'l per confirmar-lo:');
      if (confirmacio === nouPin) break;
      alert('Els dos PIN no coincideixen, torna-ho a provar.');
    }
    const desat = await appDesarPinPersonal(nom, nouPin);
    if (!desat) {
      alert('No s\'ha pogut desar el PIN (sense connexió). Torna-ho a provar.');
      return;
    }
  }

  appJugadorActiu = nom;
  localStorage.setItem('app_jugador', nom);
  localStorage.setItem('trivial_jugador_actiu', nom);
  appActualitzarBotoNav();
  document.getElementById('nav-id-menu')?.classList.remove('visible');
  document.dispatchEvent(new CustomEvent('app:jugador-canviat', { detail: { nom } }));
}

// Inicia quan el DOM estigui llest
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', appInicialitzarNav);
} else {
  appInicialitzarNav();
}
