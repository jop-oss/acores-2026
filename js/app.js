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
  const btn = document.getElementById('nav-id-btn');
  if (!btn) return;
  if (appJugadorActiu) {
    btn.innerHTML = `<img src="${AVATARS_APP[appJugadorActiu]}" alt="${appJugadorActiu}" class="nav-id-avatar">`;
    btn.title = appJugadorActiu;
    btn.classList.remove('nav-id-no-id');
  } else {
    btn.innerHTML = `<span class="nav-id-text">Identifica't</span>`;
    btn.title = "Identifica't";
    btn.classList.add('nav-id-no-id');
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
    <span class="nav-id-convidat-icon">👤</span>
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

function appSeleccionarJugador(nom) {
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
