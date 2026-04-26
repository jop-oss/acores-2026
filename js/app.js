// Popup personatges — clic sobre el nom o la zona
document.querySelectorAll(".person").forEach((person) => {
  person.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = person.classList.contains("active");
    // Tanca tots
    document
      .querySelectorAll(".person")
      .forEach((p) => p.classList.remove("active"));
    // Obre aquest si no estava obert
    if (!isActive) person.classList.add("active");
  });
});

// Tanca en clicar fora
document.addEventListener("click", () => {
  document
    .querySelectorAll(".person")
    .forEach((p) => p.classList.remove("active"));
});

// Flip cards — tap en mòbil
document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// Mode clar/fosc
const toggle = document.getElementById("themeToggle");
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

// ── IDENTIFICACIÓ GLOBAL ──────────────────────────────────────
const JUGADORS_APP = ['Anna','Jordi','Laia','Mons','Xu','Joa'];
const AVATARS_APP  = {
  Anna: 'img/avatars/Anna.jpeg', Jordi: 'img/avatars/Jordi.jpeg',
  Laia: 'img/avatars/Laia.jpeg', Mons:  'img/avatars/Mons.jpeg',
  Xu:   'img/avatars/Xu.jpeg',   Joa:   'img/avatars/Joa.jpeg',
};

let appJugadorActiu = localStorage.getItem('app_jugador') || null;

function appInicialitzarNav() {
  const btn = document.getElementById('nav-id-btn');
  if (!btn) return;
  appActualitzarBotoNav();

  // Tanca el menú en clicar fora
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
  } else {
    btn.innerHTML = `<span class="nav-id-text">Identifica't</span>`;
    btn.title = 'Identifica't';
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
      ${nom === appJugadorActiu ? '<span class="nav-id-check">✓</span>' : ''}
    </button>`).join('');
}

function appSeleccionarJugador(nom) {
  appJugadorActiu = nom;
  localStorage.setItem('app_jugador', nom);
  localStorage.setItem('trivial_jugador_actiu', nom);
  appActualitzarBotoNav();
  document.getElementById('nav-id-menu')?.classList.remove('visible');

  // Notifica altres mòduls si cal
  document.dispatchEvent(new CustomEvent('app:jugador-canviat', { detail: { nom } }));
}

// Inicia en carregar
document.addEventListener('DOMContentLoaded', appInicialitzarNav);
