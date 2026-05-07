const MSG_OK = [
  "🎉 Excel·lent!",
  "⭐ Correcte!",
  "🔥 Molt bé!",
  "💪 Eso es!",
  "🌋 Boom!",
];
const MSG_ERR = [
  "😅 Ups...",
  "💀 Fallada!",
  "😢 Oh no...",
  "🤦 Ai ai ai...",
  "😤 Mala sort!",
];

// ── ESTAT GLOBAL ──────────────────────────────────────────────
let jugadorActiu = null;
let jocActiu = null;
let respost = false;

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Sincronitza jugadorActiu amb la identificació global
  const nomGuardat = localStorage.getItem("app_jugador");
  if (nomGuardat && JUGADORS_VALIDS.includes(nomGuardat)) {
    jugadorActiu = nomGuardat;
  }

  // Escolta canvis d'identificació des de la nav
  document.addEventListener("app:jugador-canviat", (e) => {
    jugadorActiu = e.detail.nom;
    if (jugadorActiu) {
      localStorage.setItem("app_jugador", jugadorActiu);
      document
        .querySelectorAll(".joc-selector-btn")
        .forEach((b) => b.classList.remove("disabled-id"));
      document
        .getElementById("modal-identificacio")
        ?.classList.remove("visible");
      entrarJoc();
    } else {
      localStorage.removeItem("app_jugador");
      document.getElementById("joc-selector-avatar").src = "";
      document.getElementById("joc-selector-nom").textContent = "";
      document.querySelector(".joc-selector-jugador").style.display = "none";
      document
        .querySelectorAll(".joc-selector-btn")
        .forEach((b) => b.classList.add("disabled-id"));
      jocsRenderModalIdentificacio();
      document.getElementById("modal-identificacio")?.classList.add("visible");
    }
  });

  mostraScreen("joc-selector");

  if (jugadorActiu) {
    entrarJoc();
    // Si ve del banner del trivial o scrabble, entrar directament
    const params = new URLSearchParams(window.location.search);
    const trivialParam = params.get("trivial");
    if (trivialParam === "individual" || trivialParam === "equips") {
      setTimeout(() => iniciarTrivial(), 100);
    }
    const scrabbleParam = params.get("scrabble");
    if (scrabbleParam === "individual" || scrabbleParam === "equips") {
      // Neteja el paràmetre de la URL per evitar re-entrades
      history.replaceState(null, '', window.location.pathname);
      setTimeout(() => iniciarScrabble(), 300);
    }
    const yahtzeeParam = params.get("yahtzee");
    if (yahtzeeParam === YH_DOC_A || yahtzeeParam === YH_DOC_B) {
      history.replaceState(null, '', window.location.pathname);
      setTimeout(() => iniciarYahtzee(), 300);
    }
  } else {
    document.querySelector(".joc-selector-jugador").style.display = "none";
    jocsRenderModalIdentificacio();
    document.getElementById("modal-identificacio")?.classList.add("visible");
    document
      .querySelectorAll(".joc-selector-btn")
      .forEach((b) => b.classList.add("disabled-id"));
  }
});

// ── GRID DE JUGADORS ──────────────────────────────────────────
function renderJugadorsGrid() {
  const grid = document.getElementById("jugadors-grid");

  // Render immediat amb dades locals (Quiz, Mapa, Paraula, Bingo)
  const ptsParcials = {};
  JUGADORS_VALIDS.forEach((nom) => {
    const estatQuiz = carregarEstatJugador(nom);
    const estatMapa = mapaCarregarEstat(nom);
    const estatParaula = paCarregarEstat(nom);
    const rawBingo = localStorage.getItem(`bingo_punts_${nom}`);
    const estatBingo = rawBingo ? JSON.parse(rawBingo) : null;

    const ptsQuiz = estatQuiz ? estatQuiz.punts : 0;
    const ptsMapa = estatMapa ? estatMapa.punts : 0;
    const ptsParaula = estatParaula
      ? Object.values(estatParaula.punts || {}).reduce((a, b) => a + b, 0)
      : 0;
    const ptsBingo = estatBingo ? estatBingo.punts : 0;

    ptsParcials[nom] = ptsQuiz + ptsMapa + ptsParaula + ptsBingo;
  });

  const renderGrid = (ptsTotals) => {
    grid.innerHTML = JUGADORS_VALIDS.map((nom) => {
      const pts = ptsTotals[nom] || 0;
      return `
        <button class="jugador-btn" data-nom="${nom}" onclick="seleccionarJugador('${nom}')">
          <img class="jugador-avatar" src="${IMGS[nom]}" alt="${nom}">
          <span class="jugador-nom-btn">${nom}</span>
          <span class="jugador-pts">${pts} pts totals</span>
        </button>`;
    }).join("");
  };

  // Render inicial amb dades locals
  renderGrid(ptsParcials);

  // Actualitza amb punts del Trivial (Firebase)
  trivialGetPuntsGlobals()
    .then((ptsTrivial) => {
      const ptsFinals = { ...ptsParcials };
      JUGADORS_VALIDS.forEach((nom) => {
        ptsFinals[nom] = (ptsFinals[nom] || 0) + (ptsTrivial[nom] || 0);
      });
      // Actualitza també amb punts del Sudoku (Firebase)
      sudokuGetPuntsGlobals()
        .then((ptsSudoku) => {
          JUGADORS_VALIDS.forEach((nom) => {
            ptsFinals[nom] = (ptsFinals[nom] || 0) + (ptsSudoku[nom] || 0);
          });
          renderGrid(ptsFinals);
        })
        .catch(() => renderGrid(ptsFinals));
    })
    .catch(() => {});
}

// Llegeix els punts del Trivial (individual + equips) de Firebase
async function trivialGetPuntsGlobals() {
  const pts = {};
  JUGADORS_VALIDS.forEach((nom) => {
    pts[nom] = 0;
  });

  try {
    const db = trivialGetDb();
    const [snapInd, snapEq] = await Promise.all([
      db.collection("trivial_partides").doc("individual").get(),
      db.collection("trivial_partides").doc("equips").get(),
    ]);

    // Individual: punts directes per jugador
    if (snapInd.exists) {
      const p = snapInd.data();
      (p.jugadors || []).forEach((j) => {
        if (pts[j.nom] !== undefined) pts[j.nom] += j.punts || 0;
      });
    }

    // Equips: punts repartits per membre (ptsMembres)
    if (snapEq.exists) {
      const p = snapEq.data();
      (p.jugadors || []).forEach((j) => {
        if (j.ptsMembres) {
          Object.entries(j.ptsMembres).forEach(([nom, p]) => {
            if (pts[nom] !== undefined) pts[nom] += p;
          });
        }
      });
    }
  } catch (e) {
    console.error("Error llegint punts trivial:", e);
  }

  return pts;
}

// ── RÀNQUING GLOBAL ───────────────────────────────────────────
let _rankingDades = null; // cache de totes les dades
let _rankingFiltreJoc = "tots";

async function rankingCarregar() {
  // Dades locals
  const dades = {};
  JUGADORS_VALIDS.forEach((nom) => {
    const estatQuiz = carregarEstatJugador(nom);
    const estatMapa = mapaCarregarEstat(nom);
    const estatParaula = paCarregarEstat(nom);
    const rawBingo = localStorage.getItem(`bingo_punts_${nom}`);
    const estatBingo = rawBingo ? JSON.parse(rawBingo) : null;
    dades[nom] = {
      quiz: estatQuiz ? estatQuiz.punts : 0,
      mapa: estatMapa ? estatMapa.punts : 0,
      paraula: estatParaula
        ? Object.values(estatParaula.punts || {}).reduce((a, b) => a + b, 0)
        : 0,
      bingo: estatBingo ? estatBingo.punts : 0,
      trivial: 0,
      sudoku: 0,
      cifras: 0,
      penjat: 0,
      snake: 0,
      breakout: 0,
      corre: 0,
      asteroid: 0,
      correu: 0,
      flappy: 0,
      pescamines: 0,
      mahjong: 0,
      bomberman: 0,
      llancabombes: 0,
      sokoban: 0,
      scrabble: 0,
      diferencies: 0,
      ginrummy: 0,
      yahtzee: 0,
      batallanaval: 0,
      triangles: 0,
    };
  });

  // Trivial Firebase
  try {
    const ptsTrivial = await trivialGetPuntsGlobals();
    JUGADORS_VALIDS.forEach((nom) => {
      dades[nom].trivial = ptsTrivial[nom] || 0;
    });
  } catch (e) {}

  // Sudoku Firebase
  try {
    const ptsSudoku = await sudokuGetPuntsGlobals();
    JUGADORS_VALIDS.forEach((nom) => {
      dades[nom].sudoku = ptsSudoku[nom] || 0;
    });
  } catch (e) {}

  // Cifras y Lletres (localStorage)
  if (typeof clGetPuntsGlobals === 'function') {
    const ptsCifras = clGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].cifras = ptsCifras[nom] || 0; });
  }

  // El Penjat (localStorage)
  if (typeof pjGetPuntsGlobals === 'function') {
    const ptsPenjat = pjGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].penjat = ptsPenjat[nom] || 0; });
  }

  // Snake (localStorage)
  if (typeof snakeGetPuntsGlobals === 'function') {
    const ptsSnake = snakeGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].snake = ptsSnake[nom] || 0; });
  }

  // Breakout (localStorage)
  if (typeof breakoutGetPuntsGlobals === 'function') {
    const ptsBreakout = breakoutGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].breakout = ptsBreakout[nom] || 0; });
  }

  // Corre per les Açores (localStorage)
  if (typeof correGetPuntsGlobals === 'function') {
    const ptsCorre = correGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].corre = ptsCorre[nom] || 0; });
  }

  // Asteroid Shooter (localStorage)
  if (typeof asteroidGetPuntsGlobals === 'function') {
    const ptsAst = asteroidGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].asteroid = ptsAst[nom] || 0; });
  }

  // Correu de les Açores (localStorage)
  if (typeof correuGetPuntsGlobals === 'function') {
    const ptsCorreu = correuGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].correu = ptsCorreu[nom] || 0; });
  }

  // Flappy Açores (localStorage)
  if (typeof flappyGetPuntsGlobals === 'function') {
    const ptsFlappy = flappyGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].flappy = ptsFlappy[nom] || 0; });
  }

  // Pescamines (localStorage)
  if (typeof pescaminesGetPuntsGlobals === 'function') {
    const ptsPm = pescaminesGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].pescamines = ptsPm[nom] || 0; });
  }

  // Mahjong (localStorage)
  if (typeof mahjongGetPuntsGlobals === 'function') {
    const ptsMj = mahjongGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].mahjong = ptsMj[nom] || 0; });
  }

  // Bomberman (localStorage)
  if (typeof bombermanGetPuntsGlobals === 'function') {
    const ptsBm = bombermanGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].bomberman = ptsBm[nom] || 0; });
  }

  // Llança Bombes (localStorage)
  if (typeof llancabombesGetPuntsGlobals === 'function') {
    const ptsLb = llancabombesGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].llancabombes = ptsLb[nom] || 0; });
  }

  // Sokoban (localStorage)
  if (typeof sokobanGetPuntsGlobals === 'function') {
    const ptsSk = sokobanGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].sokoban = ptsSk[nom] || 0; });
  }

  // Scrabble (Firebase)
  try {
    const ptsScrabble = await scrabbleGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].scrabble = ptsScrabble[nom] || 0; });
  } catch(e) {}

  // Busca les Diferències (localStorage)
  if (typeof diferGetPuntsGlobals === 'function') {
    const ptsDifer = diferGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].diferencies = ptsDifer[nom] || 0; });
  }

  // Gin Rummy (localStorage, usa mitjana)
  if (typeof ginRummyGetPuntsGlobals === 'function') {
    const ptsGr = ginRummyGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].ginrummy = ptsGr[nom] || 0; });
  }

  // Yahtzee (localStorage, usa mitjana)
  if (typeof yhGetPuntsGlobals === 'function') {
    const ptsYh = yhGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].yahtzee = ptsYh[nom] || 0; });
  }

  // Batalla Naval (localStorage, usa % victòries)
  if (typeof batallaNavalGetPuntsGlobals === 'function') {
    const ptsBN = batallaNavalGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].batallanaval = ptsBN[nom] || 0; });
  }

  // Triangles (localStorage, usa % victòries)
  if (typeof trianglesGetPuntsGlobals === 'function') {
    const ptsTR = trianglesGetPuntsGlobals();
    JUGADORS_VALIDS.forEach(nom => { dades[nom].triangles = ptsTR[nom] || 0; });
  }

  _rankingDades = dades;
  rankingRenderLlista();
}

function rankingTotal(nom, filtre) {
  const d = _rankingDades[nom];
  if (!d) return 0;
  if (filtre === "tots")
    return d.quiz + d.mapa + d.paraula + d.bingo + d.trivial + (d.sudoku||0) + (d.cifras||0) + (d.penjat||0) + (d.snake||0) + (d.breakout||0) + (d.corre||0) + (d.asteroid||0) + (d.correu||0) + (d.flappy||0) + (d.pescamines||0) + (d.mahjong||0) + (d.bomberman||0) + (d.llancabombes||0) + (d.sokoban||0) + (d.scrabble||0) + (d.diferencies||0) + (d.ginrummy||0) + (d.yahtzee||0) + (d.batallanaval||0) + (d.triangles||0);
  return d[filtre] || 0;
}

function rankingFiltrarJoc(filtre, btn) {
  _rankingFiltreJoc = filtre;
  document
    .querySelectorAll(".rfj-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  if (_rankingDades) rankingRenderLlista();
}

function rankingRenderLlista() {
  const el = document.getElementById("ranking-llista");
  const detall = document.getElementById("ranking-detall");
  if (!el) return;
  detall.style.display = "none";
  el.style.display = "block";

  if (!_rankingDades) {
    el.innerHTML = '<div class="ranking-loading">Carregant…</div>';
    return;
  }

  const ordenats = [...JUGADORS_VALIDS].sort(
    (a, b) =>
      rankingTotal(b, _rankingFiltreJoc) - rankingTotal(a, _rankingFiltreJoc),
  );
  const maxPts = rankingTotal(ordenats[0], _rankingFiltreJoc) || 1;

  const medalles = ["🥇", "🥈", "🥉"];
  const posClasses = ["gold", "silver", "bronze"];

  el.innerHTML = ordenats
    .map((nom, i) => {
      const pts = rankingTotal(nom, _rankingFiltreJoc);
      const pct = Math.round((pts / maxPts) * 100);
      const pos =
        i < 3
          ? `<span class="ranking-pos ${posClasses[i]}">${medalles[i]}</span>`
          : `<span class="ranking-pos">${i + 1}</span>`;
      return `<div class="ranking-fila" onclick="rankingMostrarDetall('${nom}')">
      ${pos}
      <img class="ranking-avatar" src="${IMGS[nom]}" alt="${nom}">
      <div class="ranking-info">
        <span class="ranking-nom">${nom}</span>
        <span class="ranking-pts-total">${pts} pts</span>
        <div class="ranking-barra-wrap">
          <div class="ranking-barra" style="width:${pct}%"></div>
        </div>
      </div>
    </div>`;
    })
    .join("");
}

function rankingMostrarDetall(nom) {
  const el = document.getElementById("ranking-llista");
  const detall = document.getElementById("ranking-detall");
  const cos = document.getElementById("ranking-detall-cos");
  if (!detall || !_rankingDades) return;
  el.style.display = "none";
  detall.style.display = "block";

  const d = _rankingDades[nom];
  const total =
    d.quiz + d.mapa + d.paraula + d.bingo + d.trivial + (d.sudoku||0) + (d.cifras||0) + (d.penjat||0) + (d.snake||0) + (d.breakout||0) + (d.corre||0) + (d.asteroid||0) + (d.correu||0) + (d.flappy||0) + (d.pescamines||0) + (d.mahjong||0) + (d.bomberman||0) + (d.llancabombes||0) + (d.sokoban||0) + (d.scrabble||0) + (d.diferencies||0) + (d.ginrummy||0) + (d.yahtzee||0) + (d.batallanaval||0) + (d.triangles||0);
  const jocs = [
    { icon: "🌋", nom: "Quiz Açores", key: "quiz" },
    { icon: "📍", nom: "On és això?", key: "mapa" },
    { icon: "🔤", nom: "La Paraula", key: "paraula" },
    { icon: "🎯", nom: "Bingo", key: "bingo" },
    { icon: "🎲", nom: "Trivial", key: "trivial" },
    { icon: "🔢", nom: "Sudoku", key: "sudoku" },
    { icon: "📝", nom: "Xifres i Lletres", key: "cifras" },
    { icon: "🪢", nom: "El Penjat", key: "penjat" },
    { icon: "🐍", nom: "Snake", key: "snake" },
    { icon: "🧱", nom: "Breakout", key: "breakout" },
    { icon: "🏃", nom: "Corre per les Açores", key: "corre" },
    { icon: "🚀", nom: "Asteroid Shooter", key: "asteroid" },
    { icon: "📬", nom: "Correu de les Açores", key: "correu" },
    { icon: "🐦", nom: "Flappy Açores", key: "flappy" },
    { icon: "💣", nom: "Pescamines", key: "pescamines" },
    { icon: "🀄", nom: "Mahjong", key: "mahjong" },
    { icon: "💥", nom: "Bomberman", key: "bomberman" },
    { icon: "🎯", nom: "Llança Bombes", key: "llancabombes" },
    { icon: "🪨", nom: "Sokoban", key: "sokoban" },
    { icon: "📝", nom: "Scrabble", key: "scrabble" },
    { icon: "🔍", nom: "Diferències", key: "diferencies" },
    { icon: "🃏", nom: "Gin Rummy", key: "ginrummy" },
    { icon: "🎲", nom: "Yahtzee", key: "yahtzee" },
    { icon: "⚓", nom: "Batalla Naval", key: "batallanaval" },
    { icon: "🔺", nom: "Triangles", key: "triangles" },
  ];

  cos.innerHTML = `
    <div class="ranking-detall-jugador">
      <img class="ranking-detall-avatar" src="${IMGS[nom]}" alt="${nom}">
      <div>
        <div class="ranking-detall-nom">${nom}</div>
        <div class="ranking-detall-total">${total} pts totals</div>
      </div>
    </div>
    ${jocs
      .map(
        (j) => `
      <div class="ranking-joc-fila">
        <span class="ranking-joc-nom">${j.icon} ${j.nom}</span>
        <span class="ranking-joc-pts">${d[j.key] || 0} pts</span>
      </div>`,
      )
      .join("")}`;
}

function rankingTancarDetall() {
  document.getElementById("ranking-detall").style.display = "none";
  document.getElementById("ranking-llista").style.display = "block";
}

function seleccionarJugador(nom) {
  jugadorActiu = nom;
  document.querySelectorAll(".jugador-btn").forEach((b) => {
    b.classList.toggle("selected", b.dataset.nom === nom);
  });
  entrarJoc();
}

function entrarJoc() {
  if (!jugadorActiu) return;
  document.getElementById("joc-selector-avatar").src = IMGS[jugadorActiu] || "";
  document.getElementById("joc-selector-nom").textContent = jugadorActiu;
  document.querySelector(".joc-selector-jugador").style.display = "flex";
  mostraScreen("joc-selector");
  // Inicialitza rànquing
  _rankingDades = null;
  rankingCarregar();
}

// ── SELECCIÓ MODE JOC ─────────────────────────────────────────
function jocsActualitzarJugadorActiu() {
  entrarJoc();
}

function jocsRenderModalIdentificacio() {
  const llista = document.getElementById("modal-id-jugadors");
  if (!llista) return;
  const estilBtn = `display:flex;align-items:center;gap:.75rem;background:rgba(255,255,255,.04);border:1px solid var(--border);
             border-radius:10px;padding:.5rem .75rem;cursor:pointer;width:100%;transition:all .15s;
             font-family:'DM Sans',sans-serif;color:var(--text);text-align:left`;
  llista.innerHTML =
    JUGADORS_VALIDS.map(
      (nom) => `
    <button onclick="jocsIdentificar('${nom}')" style="${estilBtn}">
      <img src="${IMGS[nom]}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;object-position:top;flex-shrink:0">
      <span style="font-weight:600">${nom}</span>
    </button>`,
    ).join("") +
    `
  <div style="height:1px;background:rgba(106,171,122,.2);margin:.35rem .25rem"></div>
  <button onclick="jocsDesidentificar()" style="${estilBtn};opacity:.8">
    <img src="img/avatars/convidat.png" style="width:36px;height:36px;border-radius:50%;object-fit:cover;flex-shrink:0">
    <span style="font-weight:600">Convidat</span>
    <span style="margin-left:auto;font-size:.75rem;color:var(--text2)">sense punts</span>
  </button>`;
}

function jocsIdentificar(nom) {
  jugadorActiu = nom;
  localStorage.setItem("app_jugador", nom);
  localStorage.setItem("trivial_jugador_actiu", nom);
  if (typeof appSeleccionarJugador === "function") appSeleccionarJugador(nom);
  document.getElementById("modal-identificacio")?.classList.remove("visible");
  document
    .querySelectorAll(".joc-selector-btn")
    .forEach((b) => b.classList.remove("disabled-id"));
  entrarJoc();
}

function jocsDesidentificar() {
  jugadorActiu = null;
  localStorage.removeItem("app_jugador");
  localStorage.removeItem("trivial_jugador_actiu");
  if (typeof appDesidentificar === "function") appDesidentificar();
  document.getElementById("modal-identificacio")?.classList.remove("visible");
  document.querySelector(".joc-selector-jugador").style.display = "none";
  document
    .querySelectorAll(".joc-selector-btn")
    .forEach((b) => b.classList.add("disabled-id"));
}

function jocsModalIdentificacioTancar() {
  document.getElementById("modal-identificacio")?.classList.remove("visible");
}

function seleccionarModeJoc(mode) {
  if (mode === "quiz") {
    mostraScreen("start");
    renderStartScreen();
  } else if (mode === "qui-que") {
    iniciarQuiQueSoc();
  } else if (mode === "mapa") {
    mapaIniciarPantalla();
  } else if (mode === "paraula") {
    iniciarParaulaAmagada();
  } else if (mode === "bingo") {
    iniciarBingo();
  } else if (mode === "reptes") {
    iniciarReptes();
  } else if (mode === "trivial") {
    iniciarTrivial();
  } else if (mode === "sudoku") {
    iniciarSudoku();
  } else if (mode === "cifras") {
    iniciarCifrasLetras();
  } else if (mode === "penjat") {
    iniciarPenjat();
  } else if (mode === "snake") {
    iniciarSnake();
  } else if (mode === "breakout") {
    iniciarBreakout();
  } else if (mode === "corre") {
    iniciarCorre();
  } else if (mode === "asteroid") {
    iniciarAsteroid();
  } else if (mode === "correu") {
    iniciarCorreu();
  } else if (mode === "flappy") {
    iniciarFlappy();
  } else if (mode === "pescamines") {
    iniciarPescamines();
  } else if (mode === "mahjong") {
    iniciarMahjong();
  } else if (mode === "bomberman") {
    iniciarBomberman();
  } else if (mode === "llancabombes") {
    iniciarLlancaBombes();
  } else if (mode === "sokoban") {
    iniciarSokoban();
  } else if (mode === "scrabble") {
    iniciarScrabble();
  } else if (mode === "diferencies") {
    iniciarDiferencies();
  } else if (mode === "ginrummy") {
    iniciarGinRummy();
  } else if (mode === "yahtzee") {
    iniciarYahtzee();
  } else if (mode === "batallanaval") {
    iniciarBatallaNaval();
  } else if (mode === "triangles") {
    iniciarTriangles();
  } else if (mode === "jocmusical") {
    iniciarJocMusical();
  } else if (mode === "nonogram") {
    iniciarNonogram();
  }
}

// ══════════════════════════════════════════════════════════════
//  QUIZ
// ══════════════════════════════════════════════════════════════

function renderStartScreen() {
  const nom = jugadorActiu;
  const estat = carregarEstatJugador(nom);

  document.getElementById("jugador-actiu-avatar").src = IMGS[nom];
  document.getElementById("jugador-actiu-nom").textContent = nom;

  const progWrap = document.getElementById("progres-wrap");
  const btnStart = document.getElementById("btn-start-joc");

  if (estat && !estat.completat && estat.idx > 0) {
    progWrap.style.display = "block";
    const pct = (estat.idx / PREGUNTES.length) * 100;
    document.getElementById("progres-fill").style.width = pct + "%";
    document.getElementById("progres-text").textContent =
      `${estat.idx} de ${PREGUNTES.length} preguntes`;
    document.getElementById("progres-punts-text").textContent =
      `${estat.punts} pts`;
    document.getElementById("progres-badge").textContent =
      `Repren on ho vas deixar →`;
    btnStart.textContent = "Continuar el Quiz ▶";
    document.getElementById("jugador-actiu-sub").textContent =
      `${estat.punts} punts · en curs`;
  } else if (estat && estat.completat) {
    progWrap.style.display = "none";
    btnStart.textContent = "Veure resultat 🏆";
    document.getElementById("jugador-actiu-sub").textContent =
      `${estat.punts} punts · completat`;
  } else {
    progWrap.style.display = "none";
    btnStart.textContent = "Comença el Quiz 🚀";
    document.getElementById("jugador-actiu-sub").textContent =
      "Nou joc · 0 punts";
  }
  renderRanking();
}

function renderRanking() {
  const llista = JUGADORS_VALIDS.map((nom) => {
    const estat = carregarEstatJugador(nom);
    return {
      nom,
      punts: estat ? estat.punts : 0,
      completat: estat ? estat.completat : false,
      idx: estat ? estat.idx : 0,
    };
  }).sort((a, b) => b.punts - a.punts);

  const posEmoji = ["🥇", "🥈", "🥉"];
  document.getElementById("ranking-list-home").innerHTML = llista
    .map(
      (r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? "actiu" : ""}">
      <div class="ranking-pos ${i < 3 ? "p" + (i + 1) : "other"}">${i < 3 ? posEmoji[i] : i + 1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom]}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div class="rank-barra-wrap"><div class="rank-barra" style="width:${(r.punts / 1000) * 100}%"></div></div>
      </div>
      <div style="text-align:right">
        <div class="rank-punts">${r.punts}</div>
        <span class="rank-partides">${r.completat ? "Completat ✓" : r.idx > 0 ? r.idx + "/100" : "No iniciat"}</span>
      </div>
    </div>`,
    )
    .join("");
}

function iniciarJoc() {
  const estat = carregarEstatJugador(jugadorActiu);
  if (estat && estat.completat) {
    mostrarResultat(estat);
    return;
  }
  if (estat && estat.idx > 0 && !estat.completat) {
    jocActiu = estat;
  } else {
    const ordre = [...PREGUNTES]
      .map((p) => p.id)
      .sort(() => Math.random() - 0.5);
    jocActiu = {
      jugador: jugadorActiu,
      ordre,
      idx: 0,
      punts: 0,
      encerts: 0,
      completat: false,
    };
    guardarEstatJugador(jugadorActiu, jocActiu);
  }
  mostraScreen("quiz");
  mostrarPregunta();
}

function mostrarPregunta() {
  respost = false;
  const idPregunta = jocActiu.ordre[jocActiu.idx];
  const p = PREGUNTES.find((x) => x.id === idPregunta);
  if (!p) return;

  const total = jocActiu.ordre.length;
  document.getElementById("prog-text").textContent =
    `Pregunta ${jocActiu.idx + 1} de ${total}`;
  document.getElementById("prog-cat").textContent = p.categoria;
  document.getElementById("prog-fill").style.width =
    `${(jocActiu.idx / total) * 100}%`;
  document.getElementById("score-live").textContent = jocActiu.punts;
  document.getElementById("q-cat").textContent = p.categoria;
  document.getElementById("q-dif").textContent = DIF_LABEL[p.dificultat];
  document.getElementById("q-dif").className = `q-dif ${p.dificultat}`;
  document.getElementById("q-pts").textContent = `+${PUNTS[p.dificultat]} pts`;
  document.getElementById("q-text").textContent = p.pregunta;

  const lletres = ["A", "B", "C", "D", "E"];
  document.getElementById("opcions").innerHTML = p.opcions
    .map(
      (op, i) => `
    <button class="opcio" onclick="respondre(${i})" data-idx="${i}">
      <span class="opcio-lletra">${lletres[i]}</span><span>${op}</span>
    </button>`,
    )
    .join("");

  document.getElementById("explicacio").style.display = "none";
  document.getElementById("btn-seguent").classList.remove("visible");

  const card = document.getElementById("question-card");
  card.style.animation = "none";
  requestAnimationFrame(() => {
    card.style.animation = "slideIn .3s ease";
  });
}

function respondre(idx) {
  if (respost) return;
  respost = true;

  const idPregunta = jocActiu.ordre[jocActiu.idx];
  const p = PREGUNTES.find((x) => x.id === idPregunta);
  const encertat = idx === p.correcta;

  document
    .querySelectorAll(".opcio")
    .forEach((o) => o.classList.add("disabled"));
  document
    .querySelectorAll(".opcio")
    [idx].classList.add(encertat ? "correcta" : "incorrecta");
  if (!encertat)
    document.querySelectorAll(".opcio")[p.correcta].classList.add("correcta");

  if (encertat) {
    jocActiu.punts += PUNTS[p.dificultat];
    jocActiu.encerts++;
    document.getElementById("score-live").textContent = jocActiu.punts;
  }

  const exp = document.getElementById("explicacio");
  exp.textContent = p.explicacio;
  exp.style.display = "block";

  mostrarReaccio(encertat);
  guardarEstatJugador(jugadorActiu, jocActiu);

  const btnSeg = document.getElementById("btn-seguent");
  btnSeg.textContent = "⏭ Saltar vídeo";
  btnSeg.classList.add("visible");
  btnSeg.onclick = () => {
    tancarReaccioActiva();
    reaccioCallback = null;
    seguent();
  };

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
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity .25s";
    setTimeout(() => overlay.remove(), 250);
  }
}

function mostrarReaccio(encertat, callback) {
  tancarReaccioActiva();
  reaccioCallback = callback;
  const msgs = encertat ? MSG_OK : MSG_ERR;
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  const tipus = encertat ? "ok" : "ko";
  const videoSrc = `img/personatges/${jugadorActiu.toLowerCase()}_${tipus}.mp4`;
  const borderColor = encertat ? "#6aab7a" : "#e05555";
  const glowColor = encertat ? "rgba(106,171,122,.6)" : "rgba(224,85,85,.6)";

  const overlay = document.createElement("div");
  overlay.className = "reaccio-overlay";
  overlay.style.cursor = "pointer";
  overlay.innerHTML = `
    <div class="reaccio-wrap">
      <div style="width:200px;height:200px;border-radius:50%;overflow:hidden;border:4px solid ${borderColor};box-shadow:0 0 50px ${glowColor};flex-shrink:0;">
        <video autoplay muted playsinline style="width:100%;height:100%;object-fit:cover;display:block;">
          <source src="${videoSrc}" type="video/mp4">
        </video>
      </div>
      <div class="reaccio-text ${encertat ? "ok" : "error"}">${msg}</div>
    </div>`;

  document.body.appendChild(overlay);
  reaccioOverlayActiu = overlay;

  const tancar = () => {
    if (!reaccioOverlayActiu) return;
    tancarReaccioActiva();
    setTimeout(() => {
      const cb = reaccioCallback;
      reaccioCallback = null;
      if (cb) cb();
    }, 280);
  };

  overlay.querySelector("video").addEventListener("ended", tancar);
  overlay.addEventListener("click", tancar);
  setTimeout(() => {
    if (reaccioOverlayActiu === overlay) tancar();
  }, 5000);
}

function mostrarResultat(estat) {
  const pct = Math.round((estat.encerts / PREGUNTES.length) * 100);
  let titol;
  if (estat.punts >= 900) titol = "🏆 Expert en Açores!";
  else if (estat.punts >= 700) titol = "🌋 Excel·lent!";
  else if (estat.punts >= 500) titol = "🐋 Molt bé!";
  else if (estat.punts >= 300) titol = "🌊 No està malament!";
  else titol = "🦈 Continua practicant!";

  document.getElementById("result-avatar").src = IMGS[jugadorActiu];
  document.getElementById("result-title").textContent = titol;
  document.getElementById("result-score").textContent = estat.punts;
  document.getElementById("stat-encerts").textContent = estat.encerts;
  document.getElementById("stat-errors").textContent =
    PREGUNTES.length - estat.encerts;
  document.getElementById("stat-pct").textContent = `${pct}%`;

  if (estat.punts >= 700) llençaConfetti();
  mostraScreen("result");
}

function tornarInici() {
  mostraScreen("joc-selector");
}

function demanarSortir() {
  document.getElementById("modal-sortir").classList.add("visible");
}

function confirmarSortir() {
  tancarReaccioActiva();
  document.getElementById("modal-sortir").classList.remove("visible");
  guardarEstatJugador(jugadorActiu, jocActiu);
  mostraScreen("joc-selector");
}

function guardarEstatJugador(nom, estat) {
  localStorage.setItem(`quiz_estat_${nom}`, JSON.stringify(estat));
}
function carregarEstatJugador(nom) {
  try {
    const raw = localStorage.getItem(`quiz_estat_${nom}`);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

// ── CONFETTI ──────────────────────────────────────────────────
function llençaConfetti() {
  const wrap = document.getElementById("confetti");
  const colors = [
    "#6aab7a",
    "#f0b429",
    "#a8d8b0",
    "#ffd166",
    "#2d5a3d",
    "#ffffff",
  ];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    el.style.cssText = `left:${Math.random() * 100}%;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:${Math.random() > 0.5 ? "50%" : "2px"};animation:confetti-fall ${1.5 + Math.random() * 2}s ${Math.random() * 0.5}s ease-in forwards`;
    wrap.appendChild(el);
  }
  setTimeout(() => (wrap.innerHTML = ""), 4000);
}

// ── UTILS ─────────────────────────────────────────────────────
function mostraScreen(nom) {
  const totes = [
    "joc-selector",
    "start",
    "quiz",
    "result",
    "qqs",
    "mapa-start",
    "mapa-joc",
    "mapa-resultat",
    "mapa-result-final",
    "paraula-start",
    "paraula-joc",
    "paraula-resultat",
    "paraula-final",
    "bingo-escollir",
    "bingo-joc",
    "reptes",
    "trivial-inici",
    "trivial-torn",
    "trivial-veure",
    "trivial-config-individual",
    "trivial-config-equips",
    "trivial-prova-final",
    "sudoku-selector",
    "sudoku-joc",
    "sudoku-resultat",
    "cl-intro",
    "cl-inici",
    "cl-lletres",
    "cl-xifres",
    "cl-resultat",
    "penjat-inici",
    "penjat-intro",
    "penjat-joc",
    "penjat-resultat-prova",
    "penjat-resultat-final",
    "snake-inici",
    "snake-joc",
    "breakout-inici",
    "breakout-joc",
    "corre-inici",
    "corre-joc",
    "asteroid-inici",
    "asteroid-joc",
    "correu-inici",
    "correu-joc",
    "flappy-inici",
    "flappy-joc",
    "pescamines-inici",
    "pescamines-joc",
    "mahjong-inici",
    "mahjong-joc",
    "bomberman-inici",
    "bomberman-joc",
    "llancabombes-inici",
    "llancabombes-joc",
    "sokoban-inici",
    "sokoban-joc",
    "scrabble-inici",
    "scrabble-config-individual",
    "scrabble-config-equips",
    "scrabble-torn",
    "scrabble-validar",
    "scrabble-veure",
    "difer-inici",
    "difer-joc",
    "ginrummy-inici",
    "ginrummy-joc",
    "yahtzee-inici",
    "yahtzee-config",
    "yahtzee-joc",
    "yahtzee-veure",
    "batallanaval-inici",
    "batallanaval-col",
    "batallanaval-joc",
    "triangles-inici",
    "triangles-joc",
    "joc-musical-inici",
    "joc-musical-joc",
    "nonogram-selector",
    "nonogram-joc",
  ];
  totes.forEach((s) => {
    const el = document.getElementById(`screen-${s}`);
    if (!el) return;
    const isFlex = [
      "result",
      "mapa-resultat",
      "mapa-result-final",
      "paraula-resultat",
      "paraula-final",
      "trivial-torn",
      "trivial-prova-final",
      "sudoku-resultat",
      "penjat-resultat-prova",
    ].includes(s);
    el.style.display = nom === s ? (isFlex ? "flex" : "block") : "none";
  });
  window.scrollTo(0, 0);

  // Recarrega el rànquing global cada cop que es torna al selector de jocs
  if (nom === "joc-selector" && typeof rankingCarregar === "function") {
    rankingCarregar();
  }
}

const cfStyle = document.createElement("style");
cfStyle.textContent = `@keyframes confetti-fall{0%{opacity:1;top:-10px;transform:rotate(0)}100%{opacity:0;top:100vh;transform:rotate(720deg)}}`;
document.head.appendChild(cfStyle);

// ══════════════════════════════════════════════════════════════
//  QUI / QUÈ SÓC?
// ══════════════════════════════════════════════════════════════

const QQS_API_KEY = CONFIG.ANTHROPIC_API_KEY;

const QQS_CATEGORIES = [
  { id: "familiars", emoji: "👨‍👩‍👧‍👦", nom: "Familiars i amics", ia: false },
  { id: "famosos", emoji: "🌟", nom: "Persones famoses", ia: true },
  { id: "geografia", emoji: "🌍", nom: "Geografia", ia: true },
  { id: "musica", emoji: "🎵", nom: "Música", ia: true },
  { id: "animals", emoji: "🐾", nom: "Animals", ia: true },
  { id: "menjar", emoji: "🍽️", nom: "Menjar i begudes", ia: true },
  { id: "objectes", emoji: "📦", nom: "Objectes", ia: true },
  { id: "esports", emoji: "⚽", nom: "Esports", ia: true },
  { id: "aleatori", emoji: "🎲", nom: "Aleatori", ia: true },
];

const QQS_FAMILIARS = [
  "Iaia",
  "Avi",
  "Tieta Mercè",
  "Tiet Miquel",
  "Míriam",
  "Marta",
  "Iris",
  "Rubèn",
  "Sea",
  "Joel",
  "Aina",
  "Martina Alinque",
  "Marta Ortega",
  "Mònica Casajuana",
  "Tieta Bernardina",
  "Tieta Ino",
  "Tieta Pili",
  "Tieta Antònia",
  "Tieta Isabel",
  "Xu",
  "Joa",
  "Jordi",
  "Mons",
  "Laia",
  "Anna",
];

let qqsCategoria = null;
let qqsParaula = null;
let qqsPistes = [];
let qqsPistaIdx = 0;

function iniciarQuiQueSoc() {
  qqsCategoria = null;
  qqsParaula = null;
  qqsPistes = [];
  qqsPistaIdx = 0;
  document.getElementById("qqs-jugador-avatar").src = IMGS[jugadorActiu] || "";
  document.getElementById("qqs-jugador-nom").textContent = jugadorActiu;
  document.getElementById("qqs-selector").style.display = "block";
  document.getElementById("qqs-resultat").style.display = "none";
  renderQQSCategoriesGrid();
  qqsActualitzarBotoGenerar();
  mostraScreen("qqs");
}

function renderQQSCategoriesGrid() {
  document.getElementById("qqs-categories-grid").innerHTML = QQS_CATEGORIES.map(
    (c) => `
    <button class="qqs-cat-btn ${qqsCategoria === c.id ? "selected" : ""}"
            data-id="${c.id}" onclick="qqsSeleccionarCategoria('${c.id}')">
      <span class="qqs-cat-emoji">${c.emoji}</span>
      <span class="qqs-cat-nom">${c.nom}</span>
    </button>`,
  ).join("");
}

function qqsSeleccionarCategoria(id) {
  qqsCategoria = id;
  document
    .querySelectorAll(".qqs-cat-btn")
    .forEach((b) => b.classList.toggle("selected", b.dataset.id === id));
  qqsActualitzarBotoGenerar();
}

function qqsActualitzarBotoGenerar() {
  const btn = document.getElementById("qqs-btn-generar");
  if (btn) btn.disabled = !qqsCategoria;
}

async function qqsGenerar() {
  if (!qqsCategoria) return;
  const cat = QQS_CATEGORIES.find((c) => c.id === qqsCategoria);
  qqsPistes = [];
  qqsPistaIdx = 0;
  document.getElementById("qqs-pistes-list").innerHTML = "";
  document.getElementById("qqs-pistes-wrap").style.display = "none";
  document.getElementById("qqs-categoria-badge").textContent =
    `${cat.emoji} ${cat.nom}`;
  document.getElementById("qqs-selector").style.display = "none";
  document.getElementById("qqs-resultat").style.display = "block";
  document.getElementById("qqs-loading").style.display = "flex";
  document.getElementById("qqs-joc-content").style.display = "none";

  try {
    if (!cat.ia) {
      qqsParaula =
        QQS_FAMILIARS[Math.floor(Math.random() * QQS_FAMILIARS.length)];
      qqsPistes = [];
    } else {
      const fn = cat.id === "aleatori" ? qqsGetParaulaAleatoria : qqsGetParaula;
      const entrada =
        cat.id === "aleatori"
          ? qqsGetParaulaAleatoria()
          : qqsGetParaula(cat.id);
      if (!entrada) {
        // Fallback a IA si s'esgota el banc
        const res = await qqsGenerarAmbIA(cat.nom);
        qqsParaula = res.paraula;
        qqsPistes = res.pistes || [];
      } else {
        qqsParaula = entrada.paraula;
        qqsPistes = entrada.pistes;
      }
    }
    document.getElementById("qqs-paraula-text").textContent = qqsParaula;
    qqsActualitzarBotoPista();
    document.getElementById("qqs-loading").style.display = "none";
    document.getElementById("qqs-joc-content").style.display = "block";
  } catch (e) {
    console.error("Error API QQS:", e);
    document.getElementById("qqs-loading").innerHTML =
      '<div style="color:var(--error);text-align:center;padding:2rem;width:100%">⚠️ Error generant la paraula.<br><small>Comprova la connexió i torna-ho a intentar.</small><br><br><button onclick="qqsNovaPartida()" style="margin-top:.5rem;background:none;border:1px solid rgba(106,171,122,.3);border-radius:8px;padding:.4rem 1rem;color:#9bbfaa;cursor:pointer;font-family:\'DM Sans\',sans-serif">← Tornar</button></div>';
  }
}

async function qqsGenerarAmbIA(categoriaNom) {
  const esAleatori = qqsCategoria === "aleatori";
  const categoriaPrompt = esAleatori
    ? "qualsevol categoria (persones famoses, geografia, música, animals, menjar i begudes, objectes o esports)"
    : categoriaNom;
  const prompt = `Genera una paraula o concepte per al joc "Qui sóc?".
Categoria: ${categoriaNom}
La paraula ha de ser prou coneguda per a una família catalana que viatja a les Açores el juliol de 2026.

Respon ÚNICAMENT amb un JSON vàlid, sense cap text addicional ni marques de codi:
{
  "paraula": "...",
  "pistes": ["pista 1 creativa", "pista 2 creativa", "pista 3 creativa"]
}

Les pistes han de ser creatives i indirectes. No han de contenir la paraula ni parts d'ella.`;

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": QQS_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!resp.ok) throw new Error(`API error ${resp.status}`);
  const data = await resp.json();
  const text = data.content[0].text.trim();
  const clean = text
    .replace(/^```json\s*/, "")
    .replace(/```\s*$/, "")
    .trim();
  return JSON.parse(clean);
}

async function qqsCanviarParaula() {
  await qqsGenerar();
}

function qqsMostrarPista() {
  const wrap = document.getElementById("qqs-pistes-wrap");
  const list = document.getElementById("qqs-pistes-list");

  if (qqsPistaIdx < qqsPistes.length) {
    const div = document.createElement("div");
    div.className = "qqs-pista-item";
    div.innerHTML = `<span class="qqs-pista-num">${qqsPistaIdx + 1}</span>${qqsPistes[qqsPistaIdx]}`;
    list.appendChild(div);
    wrap.style.display = "block";
    qqsPistaIdx++;
  } else {
    const div = document.createElement("div");
    div.className = "qqs-pista-item qqs-pista-extra";
    div.innerHTML = `<span class="qqs-pista-num">💡</span>Pensa en tots els sentits: forma, color, mida, ús, origen…`;
    list.appendChild(div);
    qqsPistaIdx++;
  }
  qqsActualitzarBotoPista();
}

function qqsActualitzarBotoPista() {
  const btn = document.getElementById("qqs-btn-pista");
  const comptador = document.getElementById("qqs-pista-comptador");
  const cat = QQS_CATEGORIES.find((c) => c.id === qqsCategoria);

  if (!cat || !cat.ia) {
    if (btn) btn.style.display = "none";
    return;
  }
  if (!btn) return;
  btn.style.display = "flex";

  if (qqsPistaIdx >= qqsPistes.length + 1) {
    btn.disabled = true;
    btn.style.opacity = "0.4";
    if (comptador) comptador.textContent = "(exhaurides)";
  } else {
    btn.disabled = false;
    btn.style.opacity = "1";
    if (qqsPistaIdx < qqsPistes.length) {
      if (comptador)
        comptador.textContent = `(${qqsPistaIdx + 1}/${qqsPistes.length})`;
    } else {
      if (comptador) comptador.textContent = "(extra)";
    }
  }
}

function qqsNovaPartida() {
  qqsCategoria = null;
  qqsParaula = null;
  qqsPistes = [];
  qqsPistaIdx = 0;
  document.getElementById("qqs-resultat").style.display = "none";
  document.getElementById("qqs-selector").style.display = "block";
  document.getElementById("qqs-loading").innerHTML = `
    <div class="qqs-spinner"></div>
    <div class="qqs-loading-text">Generant paraula secreta…</div>`;
  renderQQSCategoriesGrid();
  qqsActualitzarBotoGenerar();
}

// ══════════════════════════════════════════════════════════════
//  ON ÉS AIXÒ? — MAPA
// ══════════════════════════════════════════════════════════════

const MAPA_STORAGE_KEY = "joc_mapa_estat_";
const MAPA_TOTAL = typeof LLOCS_MAPA !== "undefined" ? LLOCS_MAPA.length : 50;
const MAPA_PUNTS_MAX = MAPA_TOTAL * 10;
const AZORES_CENTER = [38.5, -27.8];
const AZORES_ZOOM = 7;

let mapaJocActiu = null;
let mapaLeaflet = null;
let mapaResultatMap = null;
let mapaMarker = null;
let mapaClickLat = null;
let mapaClickLon = null;

function mapaIniciarPantalla() {
  mapaRenderStartScreen();
  mostraScreen("mapa-start");
}

function mapaRenderStartScreen() {
  const nom = jugadorActiu;
  const estat = mapaCarregarEstat(nom);

  document.getElementById("mapa-jugador-avatar").src = IMGS[nom] || "";
  document.getElementById("mapa-jugador-nom").textContent = nom;

  const progWrap = document.getElementById("mapa-progres-wrap");
  const btnStart = document.getElementById("mapa-btn-start");

  if (estat && !estat.completat && estat.idx > 0) {
    progWrap.style.display = "block";
    document.getElementById("mapa-progres-fill").style.width =
      `${(estat.idx / MAPA_TOTAL) * 100}%`;
    document.getElementById("mapa-progres-text").textContent =
      `${estat.idx} de ${MAPA_TOTAL} llocs`;
    document.getElementById("mapa-progres-punts-text").textContent =
      `${estat.punts} pts`;
    document.getElementById("mapa-progres-badge").textContent =
      "Repren on ho vas deixar →";
    btnStart.textContent = "Continuar el joc ▶";
    document.getElementById("mapa-jugador-sub").textContent =
      `${estat.punts} punts · en curs`;
  } else if (estat && estat.completat) {
    progWrap.style.display = "none";
    btnStart.textContent = "Veure resultat 🏆";
    document.getElementById("mapa-jugador-sub").textContent =
      `${estat.punts} punts · completat`;
  } else {
    progWrap.style.display = "none";
    btnStart.textContent = "Comença el joc 🗺️";
    document.getElementById("mapa-jugador-sub").textContent =
      "Nou joc · 0 punts";
  }
  mapaRenderRanking();
}

function mapaRenderRanking() {
  const llista = JUGADORS_VALIDS.map((nom) => {
    const estat = mapaCarregarEstat(nom);
    return {
      nom,
      punts: estat ? estat.punts : 0,
      completat: estat ? estat.completat : false,
      idx: estat ? estat.idx : 0,
    };
  }).sort((a, b) => b.punts - a.punts);

  const posEmoji = ["🥇", "🥈", "🥉"];
  document.getElementById("mapa-ranking-list").innerHTML = llista
    .map(
      (r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? "actiu" : ""}">
      <div class="ranking-pos ${i < 3 ? "p" + (i + 1) : "other"}">${i < 3 ? posEmoji[i] : i + 1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom] || ""}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div class="rank-barra-wrap"><div class="rank-barra" style="width:${(r.punts / MAPA_PUNTS_MAX) * 100}%"></div></div>
      </div>
      <div style="text-align:right">
        <div class="rank-punts">${r.punts}</div>
        <span class="rank-partides">${r.completat ? "Completat ✓" : r.idx > 0 ? `${r.idx}/${MAPA_TOTAL}` : "No iniciat"}</span>
      </div>
    </div>`,
    )
    .join("");
}

function mapaIniciarJoc() {
  const estat = mapaCarregarEstat(jugadorActiu);
  if (estat && estat.completat) {
    mapaMostrarResultatFinal(estat);
    return;
  }
  if (estat && estat.idx > 0 && !estat.completat) {
    mapaJocActiu = estat;
  } else {
    const ordre = [...LLOCS_MAPA]
      .map((l) => l.id)
      .sort(() => Math.random() - 0.5);
    mapaJocActiu = {
      jugador: jugadorActiu,
      ordre,
      idx: 0,
      punts: 0,
      stats: { perfectes: 0, bons: 0, approx: 0, errors: 0 },
      completat: false,
    };
    mapaGuardarEstat(jugadorActiu, mapaJocActiu);
  }
  mostraScreen("mapa-joc");
  mapaInicialitzar();
  mapaMostrarLloc();
}

function mapaInicialitzar() {
  if (mapaLeaflet) {
    mapaLeaflet.remove();
    mapaLeaflet = null;
  }
  mapaLeaflet = L.map("mapa-leaflet", {
    center: AZORES_CENTER,
    zoom: AZORES_ZOOM,
  });
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
    {
      attribution: "© CartoDB",
      subdomains: "abcd",
      maxZoom: 18,
    },
  ).addTo(mapaLeaflet);
  mapaMarker = null;
  mapaClickLat = null;
  mapaClickLon = null;
  mapaLeaflet.on("click", mapaOnClick);
}

function mapaOnClick(e) {
  mapaClickLat = e.latlng.lat;
  mapaClickLon = e.latlng.lng;
  if (mapaMarker) mapaLeaflet.removeLayer(mapaMarker);
  mapaMarker = L.marker([mapaClickLat, mapaClickLon], {
    icon: L.divIcon({
      className: "",
      html: '<div class="marker-jugador">📍</div>',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    }),
  }).addTo(mapaLeaflet);
  document.getElementById("mapa-btn-confirmar").style.display = "block";
  document.getElementById("mapa-hint").style.display = "none";
}

function mapaMostrarLloc() {
  mapaClickLat = null;
  mapaClickLon = null;
  if (mapaMarker && mapaLeaflet) {
    mapaLeaflet.removeLayer(mapaMarker);
    mapaMarker = null;
  }
  document.getElementById("mapa-btn-confirmar").style.display = "none";
  document.getElementById("mapa-hint").style.display = "block";

  const lloc = LLOCS_MAPA.find(
    (l) => l.id === mapaJocActiu.ordre[mapaJocActiu.idx],
  );
  const total = mapaJocActiu.ordre.length;

  document.getElementById("mapa-prog-text").textContent =
    `Lloc ${mapaJocActiu.idx + 1} de ${total}`;
  document.getElementById("mapa-prog-fill").style.width =
    `${(mapaJocActiu.idx / total) * 100}%`;
  document.getElementById("mapa-score-live").textContent = mapaJocActiu.punts;
  document.getElementById("mapa-q-cat").textContent =
    `${CAT_EMOJI[lloc.categoria]} ${CAT_LABEL[lloc.categoria]}`;

  const illaEl = document.getElementById("mapa-q-illa");
  if (lloc.trampa) {
    illaEl.textContent = "🎭 Sorpresa!";
    illaEl.style.display = "inline-block";
  } else {
    illaEl.style.display = "none";
  }
  document.getElementById("mapa-pregunta-nom").textContent = lloc.nom;

  const card = document.getElementById("mapa-pregunta-card");
  card.style.animation = "none";
  requestAnimationFrame(() => {
    card.style.animation = "slideIn .3s ease";
  });
  const fotoWrap = document.getElementById("mapa-foto-wrap");
  const fotoImg = document.getElementById("mapa-foto");
  if (lloc.foto) {
    fotoImg.src = lloc.foto;
    fotoWrap.style.display = "block";
  } else {
    fotoWrap.style.display = "none";
  }
  mapaLeaflet.setView(AZORES_CENTER, AZORES_ZOOM);
}

function mapaConfirmarResposta() {
  if (mapaClickLat === null) return;
  const lloc = LLOCS_MAPA.find(
    (l) => l.id === mapaJocActiu.ordre[mapaJocActiu.idx],
  );
  const dist = distanciaKm(mapaClickLat, mapaClickLon, lloc.lat, lloc.lon);
  const pts = puntsPerDistancia(dist);

  if (pts === 10) mapaJocActiu.stats.perfectes++;
  else if (pts === 5) mapaJocActiu.stats.bons++;
  else if (pts === 2) mapaJocActiu.stats.approx++;
  else mapaJocActiu.stats.errors++;

  mapaJocActiu.punts += pts;
  mapaGuardarEstat(jugadorActiu, mapaJocActiu);
  mapaMostrarResultatLloc(lloc, dist, pts);
}

function mapaMostrarResultatLloc(lloc, dist, pts) {
  const badge = document.getElementById("mapa-res-pts-badge");
  badge.textContent = pts > 0 ? `+${pts} pts` : "0 pts";
  badge.className =
    "resultat-pts-badge " +
    (pts === 10
      ? "perfecte"
      : pts === 5
        ? "bo"
        : pts === 2
          ? "approx"
          : "error");

  document.getElementById("mapa-res-nom").textContent = lloc.nom;
  document.getElementById("mapa-res-dist").textContent =
    `📏 ${dist < 1 ? "<1" : Math.round(dist)} km de distància`;
  document.getElementById("mapa-res-desc").textContent = lloc.desc;
  document.getElementById("mapa-res-trampa").style.display = lloc.trampa
    ? "block"
    : "none";

  mostraScreen("mapa-resultat");

  setTimeout(() => {
    if (mapaResultatMap) {
      mapaResultatMap.remove();
      mapaResultatMap = null;
    }
    mapaResultatMap = L.map("mapa-resultat-map", {
      center: [lloc.lat, lloc.lon],
      zoom: 9,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
    });
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
      {
        attribution: "© CartoDB",
        subdomains: "abcd",
      },
    ).addTo(mapaResultatMap);

    L.marker([mapaClickLat, mapaClickLon], {
      icon: L.divIcon({
        className: "",
        html: '<div class="marker-jugador">📍</div>',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      }),
    })
      .addTo(mapaResultatMap)
      .bindPopup("La teva resposta")
      .openPopup();

    L.marker([lloc.lat, lloc.lon], {
      icon: L.divIcon({
        className: "",
        html: '<div class="marker-real">✅</div>',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      }),
    })
      .addTo(mapaResultatMap)
      .bindPopup(lloc.nom);

    L.polyline(
      [
        [mapaClickLat, mapaClickLon],
        [lloc.lat, lloc.lon],
      ],
      {
        color: "#6aab7a",
        weight: 2,
        dashArray: "6,6",
        opacity: 0.8,
      },
    ).addTo(mapaResultatMap);

    mapaResultatMap.fitBounds(
      L.latLngBounds([
        [mapaClickLat, mapaClickLon],
        [lloc.lat, lloc.lon],
      ]),
      { padding: [40, 40] },
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
    mostraScreen("mapa-joc");
    mapaMostrarLloc();
  }
}

function mapaMostrarResultatFinal(estat) {
  let titol;
  if (estat.punts >= 450) titol = "🗺️ Navegant expert!";
  else if (estat.punts >= 350) titol = "📍 Excel·lent!";
  else if (estat.punts >= 200) titol = "🏝️ Bon orientador!";
  else if (estat.punts >= 100) titol = "🌊 Segueix practicant!";
  else titol = "🧭 Necessites un GPS!";

  document.getElementById("mapa-result-avatar").src = IMGS[jugadorActiu] || "";
  document.getElementById("mapa-result-title").textContent = titol;
  document.getElementById("mapa-result-score").textContent = estat.punts;
  document.getElementById("mapa-stat-perfectes").textContent =
    estat.stats?.perfectes || 0;
  document.getElementById("mapa-stat-bons").textContent =
    estat.stats?.bons || 0;
  document.getElementById("mapa-stat-approx").textContent =
    estat.stats?.approx || 0;
  document.getElementById("mapa-stat-errors").textContent =
    estat.stats?.errors || 0;
  mostraScreen("mapa-result-final");
}

function mapaTornarInici() {
  mapaRenderStartScreen();
  mostraScreen("mapa-start");
}

function mapaDemanarSortir() {
  document.getElementById("modal-sortir-mapa").classList.add("visible");
}
function mapaConfirmarSortir() {
  document.getElementById("modal-sortir-mapa").classList.remove("visible");
  mapaGuardarEstat(jugadorActiu, mapaJocActiu);
  mapaRenderStartScreen();
  mostraScreen("mapa-start");
}

function mapaGuardarEstat(nom, estat) {
  localStorage.setItem(MAPA_STORAGE_KEY + nom, JSON.stringify(estat));
}
function mapaCarregarEstat(nom) {
  try {
    const raw = localStorage.getItem(MAPA_STORAGE_KEY + nom);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

// ══════════════════════════════════════════════════════════════
//  LA PARAULA AMAGADA
// ══════════════════════════════════════════════════════════════

// ── ESTAT ─────────────────────────────────────────────────────
let paNivell = null; // 'facil' | 'mitja' | 'expert'
let paPartida = null; // { jugador, nivell, paraules[], idx, punts, encerts, errors, pistesTotals, completat }
let paParaulaActual = null; // objecte paraula actual { paraula, desc, nivell }
let paIntentActual = 1; // intent actual (1-based)
let paIntentMax = 5; // total intents per paraula
let paFilaActual = 0; // fila activa a la graella (0-based)
let paColActual = 0; // columna activa
let paPistesUsades = 0; // pistes usades en la paraula actual
let paLletresIntro = []; // matriu [fila][col] de lletres introduïdes
let paEstatFiles = []; // matriu [fila] d'estats ('pendent'|'confirmada')
let paTeclatEstat = {}; // { lletra: 'correcta'|'present'|'absent' }

const PA_TECLAT_FILES = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

// ── INICI ─────────────────────────────────────────────────────
function iniciarParaulaAmagada() {
  paNivell = null;
  paPartida = null;
  document.getElementById("pa-jugador-avatar").src = IMGS[jugadorActiu] || "";
  document.getElementById("pa-jugador-nom").textContent = jugadorActiu;
  paRenderNivells();
  paRenderRanking();
  paActualitzarBotoStart();
  mostraScreen("paraula-start");
}

// ── NIVELLS ───────────────────────────────────────────────────
function paRenderNivells() {
  const grid = document.getElementById("pa-nivells-grid");
  grid.innerHTML = ["facil", "mitja", "expert"]
    .map((n) => {
      const estat = paCarregarEstat(jugadorActiu);
      const partidesJugades = estat ? estat.partides[n] || 0 : 0;
      const ptsTotal = estat ? estat.punts[n] || 0 : 0;
      const esgotada = partidesJugades >= PA_MAX_PARTIDES;
      return `
      <button class="pa-nivell-btn ${paNivell === n ? "selected" : ""} ${esgotada ? "esgotada" : ""}"
              data-nivell="${n}" onclick="paSeleccionarNivell('${n}')">
        <span class="pa-nivell-icon">${n === "facil" ? "🟢" : n === "mitja" ? "🟡" : "🔴"}</span>
        <span class="pa-nivell-nom">${PA_NIVELL_LABEL[n]}</span>
        <span class="pa-nivell-desc">${PA_NIVELL_DESC[n]}</span>
        <span class="pa-nivell-stats">${partidesJugades}/${PA_MAX_PARTIDES} partides · ${ptsTotal} pts</span>
        ${esgotada ? '<span class="pa-nivell-esgotada">Màxim assolit</span>' : ""}
      </button>`;
    })
    .join("");
}

function paSeleccionarNivell(n) {
  const estat = paCarregarEstat(jugadorActiu);
  const partidesJugades = estat ? estat.partides[n] || 0 : 0;
  if (partidesJugades >= PA_MAX_PARTIDES) return;
  paNivell = n;
  document
    .querySelectorAll(".pa-nivell-btn")
    .forEach((b) => b.classList.toggle("selected", b.dataset.nivell === n));
  paActualitzarBotoStart();
}

function paActualitzarBotoStart() {
  const btn = document.getElementById("pa-btn-start");
  if (!btn) return;
  const estat = paCarregarEstat(jugadorActiu);
  const partidesJugades = estat && paNivell ? estat.partides[paNivell] || 0 : 0;
  btn.disabled = !paNivell || partidesJugades >= PA_MAX_PARTIDES;
}

// ── INICIAR PARTIDA ───────────────────────────────────────────
function paIniciarPartida() {
  if (!paNivell) return;
  const paraules = triarParaules(paNivell, PA_PARAULES_PARTIDA);
  paPartida = {
    jugador: jugadorActiu,
    nivell: paNivell,
    paraules: paraules.map((p) => normalitzar(p.paraula)),
    descs: paraules.map((p) => p.desc),
    idx: 0,
    punts: 0,
    encerts: 0,
    errors: 0,
    pistesTotals: 0,
  };
  document.getElementById("pa-joc-nivell-badge").textContent =
    PA_NIVELL_LABEL[paNivell];
  document.getElementById("pa-joc-nivell-badge").className =
    `pa-joc-nivell pa-nivell-${paNivell}`;
  paCarregarParaula();
  mostraScreen("paraula-joc");
}

// ── CARREGAR PARAULA ──────────────────────────────────────────
function paCarregarParaula() {
  const paraula = paPartida.paraules[paPartida.idx];
  const desc = paPartida.descs[paPartida.idx];
  paParaulaActual = { paraula, desc };
  paIntentMax = numIntents(paraula);
  paIntentActual = 1;
  paFilaActual = 0;
  paColActual = 0;
  paPistesUsades = 0;
  paLletresIntro = Array.from({ length: paIntentMax }, () =>
    Array(paraula.length).fill(""),
  );
  paEstatFiles = Array(paIntentMax).fill("pendent");
  paTeclatEstat = {};

  document.getElementById("pa-joc-prog").textContent =
    `Paraula ${paPartida.idx + 1}/${PA_PARAULES_PARTIDA}`;
  document.getElementById("pa-score-live").textContent = paPartida.punts;
  document.getElementById("pa-pistes-restants").textContent = `(3)`;
  document.getElementById("pa-btn-pista").disabled = false;
  document.getElementById("pa-btn-pista").style.opacity = "1";

  const pistaZona = document.getElementById("pa-pista-zona");
  pistaZona.style.display = "none";

  paRenderGraella();
  paRenderTeclat();
  paActualitzarIntentsInfo();
}

// ── GRAELLA ───────────────────────────────────────────────────
function paRenderGraella() {
  const graella = document.getElementById("pa-graella");
  const n = paParaulaActual.paraula.length;
  graella.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  graella.innerHTML = "";

  for (let f = 0; f < paIntentMax; f++) {
    for (let c = 0; c < n; c++) {
      const cel = document.createElement("div");
      cel.className = "pa-cel";
      cel.id = `pa-cel-${f}-${c}`;
      cel.textContent = paLletresIntro[f][c];
      if (
        f === paFilaActual &&
        c === paColActual &&
        paEstatFiles[f] === "pendent"
      ) {
        cel.classList.add("activa");
      }
      graella.appendChild(cel);
    }
  }
  paActualitzarCelActiva();
}

function paActualitzarCelActiva() {
  document
    .querySelectorAll(".pa-cel")
    .forEach((c) => c.classList.remove("activa"));
  const n = paParaulaActual.paraula.length;
  if (paFilaActual < paIntentMax && paEstatFiles[paFilaActual] === "pendent") {
    // Marca la primera cel·la buida de la fila activa
    const primeraBuilda = paLletresIntro[paFilaActual].findIndex(
      (l) => l === "",
    );
    const col = primeraBuilda === -1 ? n - 1 : primeraBuilda;
    const cel = document.getElementById(`pa-cel-${paFilaActual}-${col}`);
    if (cel) cel.classList.add("activa");
  }
}

function paActualitzarFila() {
  const n = paParaulaActual.paraula.length;
  for (let c = 0; c < n; c++) {
    const cel = document.getElementById(`pa-cel-${paFilaActual}-${c}`);
    if (cel) {
      cel.textContent = paLletresIntro[paFilaActual][c];
      cel.classList.remove("activa", "te-lletra");
      if (paLletresIntro[paFilaActual][c]) cel.classList.add("te-lletra");
    }
  }
  paActualitzarCelActiva();
}

// ── TECLAT ────────────────────────────────────────────────────
function paRenderTeclat() {
  const teclat = document.getElementById("pa-teclat");
  teclat.innerHTML = PA_TECLAT_FILES.map(
    (fila) => `
    <div class="pa-teclat-fila">
      ${fila
        .map(
          (l) => `
        <button class="pa-tecla ${paTeclatEstat[l] || ""}" onclick="paIntroduirLletra('${l}')">${l}</button>
      `,
        )
        .join("")}
    </div>`,
  ).join("");
}

function paActualitzarTeclatEstat() {
  document.querySelectorAll(".pa-tecla").forEach((btn) => {
    const l = btn.textContent;
    btn.className = `pa-tecla ${paTeclatEstat[l] || ""}`;
  });
}

// ── INPUT ─────────────────────────────────────────────────────
function paIntroduirLletra(lletra) {
  if (paFilaActual >= paIntentMax) return;
  if (paEstatFiles[paFilaActual] !== "pendent") return;
  const n = paParaulaActual.paraula.length;
  const primeraBuilda = paLletresIntro[paFilaActual].findIndex((l) => l === "");
  if (primeraBuilda === -1) return; // fila plena
  paLletresIntro[paFilaActual][primeraBuilda] = lletra;
  paActualitzarFila();
}

function paEsborrar() {
  if (paFilaActual >= paIntentMax) return;
  if (paEstatFiles[paFilaActual] !== "pendent") return;
  // Troba l'última lletra introduïda
  const n = paParaulaActual.paraula.length;
  let ultima = -1;
  for (let c = n - 1; c >= 0; c--) {
    if (paLletresIntro[paFilaActual][c] !== "") {
      ultima = c;
      break;
    }
  }
  if (ultima !== -1) {
    paLletresIntro[paFilaActual][ultima] = "";
    paActualitzarFila();
  }
}

// ── CONFIRMAR INTENT ──────────────────────────────────────────
function paConfirmar() {
  if (paFilaActual >= paIntentMax) return;
  const n = paParaulaActual.paraula.length;
  const fila = paLletresIntro[paFilaActual];
  if (fila.some((l) => l === "")) return; // fila incompleta

  const paraula = paParaulaActual.paraula;
  const resultat = paAvaluarIntent(fila, paraula);

  // Anima i acoloreix la fila
  paAplicarResultatFila(paFilaActual, resultat);
  paEstatFiles[paFilaActual] = "confirmada";

  // Actualitza teclat
  resultat.forEach(({ lletra, estat }) => {
    const prioritat = { correcta: 3, present: 2, absent: 1 };
    if ((prioritat[estat] || 0) > (prioritat[paTeclatEstat[lletra]] || 0)) {
      paTeclatEstat[lletra] = estat;
    }
  });
  setTimeout(() => paActualitzarTeclatEstat(), 400);

  const encert = resultat.every((r) => r.estat === "correcta");

  if (encert) {
    const pts = calcularPunts(
      paNivell,
      paIntentActual,
      paIntentMax,
      paPistesUsades,
    );
    paPartida.punts += pts;
    paPartida.encerts++;
    document.getElementById("pa-score-live").textContent = paPartida.punts;
    setTimeout(() => paMostrarResultatParaula(true, pts), 600);
  } else {
    paFilaActual++;
    paIntentActual++;
    if (paFilaActual >= paIntentMax) {
      // S'han esgotat els intents
      paPartida.errors++;
      setTimeout(() => paMostrarResultatParaula(false, 0), 600);
    } else {
      paActualitzarIntentsInfo();
      paActualitzarCelActiva();
    }
  }
}

function paAvaluarIntent(fila, paraula) {
  const n = paraula.length;
  const resultat = Array(n)
    .fill(null)
    .map((_, i) => ({ lletra: fila[i], estat: "absent" }));
  const disponibles = paraula.split("");

  // Primera passada: correctes
  for (let i = 0; i < n; i++) {
    if (fila[i] === paraula[i]) {
      resultat[i].estat = "correcta";
      disponibles[i] = null;
    }
  }
  // Segona passada: presents
  for (let i = 0; i < n; i++) {
    if (resultat[i].estat === "correcta") continue;
    const idx = disponibles.indexOf(fila[i]);
    if (idx !== -1) {
      resultat[i].estat = "present";
      disponibles[idx] = null;
    }
  }
  return resultat;
}

function paAplicarResultatFila(fila, resultat) {
  const n = resultat.length;
  resultat.forEach(({ lletra, estat }, c) => {
    const cel = document.getElementById(`pa-cel-${fila}-${c}`);
    if (!cel) return;
    setTimeout(() => {
      cel.classList.remove("te-lletra", "activa");
      cel.classList.add(estat, "animat");
    }, c * 80);
  });
}

// ── PISTES ────────────────────────────────────────────────────
function paDemanarPista() {
  if (paPistesUsades >= 3) return;
  const paraula = paParaulaActual.paraula;
  const n = paraula.length;

  // Troba posicions no revelades correctament a la fila actual
  const revelades = new Set();
  for (let f = 0; f < paFilaActual; f++) {
    const fila = paLletresIntro[f];
    const res = paAvaluarIntent(fila, paraula);
    res.forEach(({ estat }, c) => {
      if (estat === "correcta") revelades.add(c);
    });
  }

  const posDisponibles = [];
  for (let c = 0; c < n; c++) {
    if (!revelades.has(c)) posDisponibles.push(c);
  }

  if (posDisponibles.length === 0) return;

  // Revela una posició aleatòria
  const pos = posDisponibles[Math.floor(Math.random() * posDisponibles.length)];
  const lletra = paraula[pos];
  paPistesUsades++;

  const pistaZona = document.getElementById("pa-pista-zona");
  const pistaText = document.getElementById("pa-pista-text");
  pistaText.innerHTML = `💡 Pista: la lletra <strong>${lletra}</strong> és a la posició <strong>${pos + 1}</strong>`;
  pistaZona.style.display = "block";

  // Fica la lletra a la cel·la actual
  paLletresIntro[paFilaActual][pos] = lletra;
  paActualitzarFila();

  // Actualitza el comptador
  const restants = 3 - paPistesUsades;
  document.getElementById("pa-pistes-restants").textContent = `(${restants})`;
  if (paPistesUsades >= 3) {
    document.getElementById("pa-btn-pista").disabled = true;
    document.getElementById("pa-btn-pista").style.opacity = "0.4";
  }

  paPartida.pistesTotals++;
}

// ── RESULTAT PARAULA ──────────────────────────────────────────
function paMostrarResultatParaula(encert, pts) {
  const badge = document.getElementById("pa-res-badge");
  if (encert) {
    badge.textContent = pts > 0 ? `+${pts} pts` : "Encert!";
    badge.className = "pa-res-badge encert";
  } else {
    badge.textContent = "0 pts";
    badge.className = "pa-res-badge error";
  }

  document.getElementById("pa-res-paraula").textContent =
    paParaulaActual.paraula;
  document.getElementById("pa-res-desc").textContent = paParaulaActual.desc;
  document.getElementById("pa-res-intents").textContent = encert
    ? `${paIntentActual}/${paIntentMax}`
    : "—";
  document.getElementById("pa-res-pts").textContent = pts;
  document.getElementById("pa-res-pistes-usades").textContent = paPistesUsades;

  const btnSeguent = document.getElementById("pa-btn-seguent");
  const esUltima = paPartida.idx >= PA_PARAULES_PARTIDA - 1;
  btnSeguent.textContent = esUltima
    ? "Veure resultat final 🏆"
    : "Paraula següent →";

  mostraScreen("paraula-resultat");
}

// ── SEGÜENT PARAULA ───────────────────────────────────────────
function paSeguent() {
  paPartida.idx++;
  if (paPartida.idx >= PA_PARAULES_PARTIDA) {
    paFinalitzarPartida();
  } else {
    paCarregarParaula();
    mostraScreen("paraula-joc");
  }
}

// ── FINALITZAR PARTIDA ────────────────────────────────────────
function paFinalitzarPartida() {
  // Guarda l'estat
  let estat = paCarregarEstat(jugadorActiu);
  if (!estat) {
    estat = {
      punts: { facil: 0, mitja: 0, expert: 0 },
      partides: { facil: 0, mitja: 0, expert: 0 },
    };
  }
  estat.punts[paNivell] = (estat.punts[paNivell] || 0) + paPartida.punts;
  estat.partides[paNivell] = (estat.partides[paNivell] || 0) + 1;
  paGuardarEstat(jugadorActiu, estat);

  // Mostra resultat final
  let titol;
  const ptsMax =
    PA_PARAULES_PARTIDA *
    (paNivell === "facil" ? 8 : paNivell === "mitja" ? 10 : 20);
  const pct = paPartida.punts / ptsMax;
  if (pct >= 0.9) titol = "🌋 Mestre de les Açores!";
  else if (pct >= 0.7) titol = "⭐ Excel·lent!";
  else if (pct >= 0.5) titol = "🏝️ Molt bé!";
  else if (pct >= 0.3) titol = "🌊 No estava malament!";
  else titol = "🔤 Practica més!";

  document.getElementById("pa-final-avatar").src = IMGS[jugadorActiu] || "";
  document.getElementById("pa-final-titol").textContent = titol;
  document.getElementById("pa-final-score").textContent = paPartida.punts;
  document.getElementById("pa-final-encerts").textContent = paPartida.encerts;
  document.getElementById("pa-final-errors").textContent = paPartida.errors;
  document.getElementById("pa-final-pistes").textContent =
    paPartida.pistesTotals;

  const estat2 = paCarregarEstat(jugadorActiu);
  const partidesJugades = estat2.partides[paNivell];
  document.getElementById("pa-final-partides").textContent =
    `${partidesJugades}/${PA_MAX_PARTIDES} partides jugades en nivell ${PA_NIVELL_LABEL[paNivell]}`;

  const btnNova = document.getElementById("pa-btn-nova-partida");
  btnNova.style.display = partidesJugades < PA_MAX_PARTIDES ? "block" : "none";

  if (paPartida.encerts >= 4) llençaConfetti();
  mostraScreen("paraula-final");
}

function paNovaPartida() {
  paIniciarPartida();
}

function paTornarInici() {
  mostraScreen("paraula-start");
  paRenderNivells();
  paRenderRanking();
  paActualitzarBotoStart();
}

// ── SORTIR ────────────────────────────────────────────────────
function paDemanarSortir() {
  document.getElementById("modal-sortir-paraula").classList.add("visible");
}

function paConfirmarSortir() {
  document.getElementById("modal-sortir-paraula").classList.remove("visible");
  // Guarda punts parcials
  if (paPartida && paPartida.punts > 0) {
    let estat = paCarregarEstat(jugadorActiu);
    if (!estat)
      estat = {
        punts: { facil: 0, mitja: 0, expert: 0 },
        partides: { facil: 0, mitja: 0, expert: 0 },
      };
    estat.punts[paNivell] = (estat.punts[paNivell] || 0) + paPartida.punts;
    estat.partides[paNivell] = (estat.partides[paNivell] || 0) + 1;
    paGuardarEstat(jugadorActiu, estat);
  }
  paTornarInici();
}

// ── RÀNQUING ──────────────────────────────────────────────────
function paRenderRanking() {
  const llista = JUGADORS_VALIDS.map((nom) => {
    const estat = paCarregarEstat(nom);
    const total = estat
      ? Object.values(estat.punts).reduce((a, b) => a + b, 0)
      : 0;
    return { nom, total };
  }).sort((a, b) => b.total - a.total);

  const posEmoji = ["🥇", "🥈", "🥉"];
  document.getElementById("pa-ranking-list").innerHTML = llista
    .map(
      (r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? "actiu" : ""}">
      <div class="ranking-pos ${i < 3 ? "p" + (i + 1) : "other"}">${i < 3 ? posEmoji[i] : i + 1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom] || ""}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div class="rank-barra-wrap"><div class="rank-barra" style="width:${Math.min((r.total / 500) * 100, 100)}%"></div></div>
      </div>
      <div class="rank-punts">${r.total}</div>
    </div>`,
    )
    .join("");
}

// ── UTILS ─────────────────────────────────────────────────────
function paActualitzarIntentsInfo() {
  document.getElementById("pa-intents-info").textContent =
    `Intent ${paIntentActual} de ${paIntentMax}`;
}

function paGuardarEstat(nom, estat) {
  localStorage.setItem(PA_STORAGE_KEY + nom, JSON.stringify(estat));
}

function paCarregarEstat(nom) {
  try {
    const raw = localStorage.getItem(PA_STORAGE_KEY + nom);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

// Teclat físic
document.addEventListener("keydown", (e) => {
  const screen = document.getElementById("screen-paraula-joc");
  if (!screen || screen.style.display === "none") return;
  if (e.key === "Enter") {
    paConfirmar();
    return;
  }
  if (e.key === "Backspace") {
    paEsborrar();
    return;
  }
  const l = normalitzar(e.key);
  if (/^[A-Z]$/.test(l)) paIntroduirLletra(l);
});

// ══════════════════════════════════════════════════════════════
//  BINGO AÇORES — amb Firebase Firestore
// ══════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
//  BINGO AÇORES — amb Firebase Firestore
// ══════════════════════════════════════════════════════════════

// ── FIREBASE ──────────────────────────────────────────────────
let _bingoDb = null;
function bingoGetDb() {
  if (_bingoDb) return _bingoDb;
  if (!firebase.apps.length) firebase.initializeApp(CONFIG.FIREBASE);
  _bingoDb = firebase.firestore();
  return _bingoDb;
}

const BINGO_COL = "bingo_partides";
const BINGO_DOC = "activa";

// ── ESTAT LOCAL ───────────────────────────────────────────────
let bingoCartroActual = null;
let bingoUnsubscribe = null;
let bingoLiniesGlobal = [];
let bingoBingoFet = false;
let bingoCartroPreview = null;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarBingo() {
  window._bingoLiniesDetall = [];
  bingoLiniesGlobal = [];
  bingoBingoFet = false;

  bingoEscoltarPartida();

  let cartroLocal = bingoCarregarCartroLocal();

  // Format antic (array directe) → invàlid, forçar nou cartró
  if (cartroLocal && Array.isArray(cartroLocal)) {
    cartroLocal = null;
    localStorage.removeItem(BINGO_STORAGE_KEY + jugadorActiu);
  }

  // Cartró amb mida incorrecta → invàlid, forçar nou cartró
  if (
    cartroLocal &&
    cartroLocal.caselles &&
    cartroLocal.caselles.length !== BINGO_TOTAL
  ) {
    cartroLocal = null;
    localStorage.removeItem(BINGO_STORAGE_KEY + jugadorActiu);
  }

  if (cartroLocal) {
    bingoCartroActual = cartroLocal;
    bingoMostrarJoc();
  } else {
    bingoCartroPreview = null;
    bingoMostrarEscollir();
  }
}

// ── PANTALLA ESCOLLIR CARTRÓ ──────────────────────────────────
async function bingoMostrarEscollir() {
  document.getElementById("bingo-esc-avatar").src = IMGS[jugadorActiu] || "";
  document.getElementById("bingo-esc-nom").textContent = jugadorActiu;

  const cartrosExistents = await bingoCarregarCartrosExistents();
  bingoCartroPreview = bingoCreaCartro(cartrosExistents);
  bingoRenderCartroPreview();
  mostraScreen("bingo-escollir");
}

function bingoRenderCartroPreview() {
  const wrap = document.getElementById("bingo-prev-cartro");
  wrap.style.gridTemplateColumns = `repeat(${BINGO_COLS}, 1fr)`;
  wrap.innerHTML = bingoCartroPreview.caselles
    .map(
      (c) => `
    <div class="bingo-casella ${c.estrella ? "estrella" : ""}">
      ${
        c.estrella
          ? '<span class="bingo-estrella-icon">⭐</span>'
          : `<span class="bingo-casella-text">${c.text}</span>`
      }
    </div>`,
    )
    .join("");
}

async function bingoRegenerarCartro() {
  const cartrosExistents = await bingoCarregarCartrosExistents();
  bingoCartroPreview = bingoCreaCartro(cartrosExistents);
  bingoRenderCartroPreview();
}

async function bingoAcceptarCartro() {
  if (!bingoCartroPreview) return;
  try {
    const db = bingoGetDb();
    await db
      .collection(BINGO_COL)
      .doc(BINGO_DOC)
      .set(
        {
          [`cartro_${jugadorActiu}`]: bingoCartroPreview.ids,
        },
        { merge: true },
      );
  } catch (e) {
    console.error("Error guardant cartró a Firebase:", e);
  }

  bingoCartroActual = bingoCartroPreview;
  bingoGuardarCartroLocal(bingoCartroActual);
  bingoCartroPreview = null;
  bingoMostrarJoc();
}

async function bingoCarregarCartrosExistents() {
  try {
    const db = bingoGetDb();
    const snap = await db.collection(BINGO_COL).doc(BINGO_DOC).get();
    if (!snap.exists) return [];
    const data = snap.data();
    return JUGADORS_VALIDS.map((nom) => data[`cartro_${nom}`]).filter(Boolean);
  } catch (e) {
    return [];
  }
}

// ── PANTALLA JOC ──────────────────────────────────────────────
function bingoMostrarJoc() {
  document.getElementById("bingo-joc-avatar").src = IMGS[jugadorActiu] || "";
  document.getElementById("bingo-joc-nom").textContent = jugadorActiu;
  bingoRenderCartro();
  bingoRenderRanking();
  bingoActualitzarBotosCant();
  mostraScreen("bingo-joc");
}

// ── RENDER CARTRÓ ─────────────────────────────────────────────
function bingoRenderCartro() {
  if (!bingoCartroActual) return;
  const wrap = document.getElementById("bingo-cartro");
  wrap.style.gridTemplateColumns = `repeat(${BINGO_COLS}, 1fr)`;
  wrap.innerHTML = "";

  bingoCartroActual.caselles.forEach((casella, idx) => {
    const div = document.createElement("div");
    div.className = `bingo-casella ${casella.estrella ? "estrella" : ""} ${casella.marcada ? "marcada" : ""}`;
    div.innerHTML = casella.estrella
      ? '<span class="bingo-estrella-icon">⭐</span>'
      : `<span class="bingo-casella-text">${casella.text}</span>`;
    if (!casella.estrella) div.onclick = () => bingoMarcarCasella(idx);
    wrap.appendChild(div);
  });

  // Ressalta files cantades pel jugador actiu
  if (window._bingoLiniesDetall) {
    window._bingoLiniesDetall
      .filter((l) => l.jugador === jugadorActiu)
      .forEach((l) => {
        for (let c = 0; c < BINGO_COLS; c++) {
          const cel = wrap.children[l.fila * BINGO_COLS + c];
          if (cel) cel.classList.add("linia-cantada");
        }
      });
  }

  bingoRenderAvisos();
  const estat = bingoCarregarEstatLocal();
  document.getElementById("bingo-score").textContent = estat ? estat.punts : 0;
}

function bingoMarcarCasella(idx) {
  if (!bingoCartroActual) return;
  const casella = bingoCartroActual.caselles[idx];
  if (casella.estrella) return;
  casella.marcada = !casella.marcada;
  bingoGuardarCartroLocal(bingoCartroActual);
  bingoRenderCartro();
  bingoActualitzarBotosCant();
}

// ── AVISOS LÍNIES ─────────────────────────────────────────────
function bingoRenderAvisos() {
  const wrap = document.getElementById("bingo-avisos-wrap");
  const avisBingo = document.getElementById("bingo-acabat-avis");

  if (bingoBingoFet) {
    const bingoData = window._bingoBingoData;
    avisBingo.style.display = "block";
    avisBingo.textContent = `🏆 ${bingoData?.jugador || "Algú"} ha fet BINGO! La partida ha acabat.`;
  } else {
    avisBingo.style.display = "none";
  }

  if (!wrap) return;
  if (bingoLiniesGlobal.length === 0) {
    wrap.innerHTML = "";
    return;
  }
  wrap.innerHTML = bingoLiniesGlobal
    .map(
      (l, i) => `
    <div class="bingo-linia-avis">
      🎉 <strong>${l.jugador}</strong> ha cantat la ${i + 1}a línia
      <span class="bingo-linia-pts">+${BINGO_PUNTS_LINIA[i] || 0} pts</span>
    </div>`,
    )
    .join("");
}

// ── BOTONS CANTAR ─────────────────────────────────────────────
function bingoActualitzarBotosCant() {
  const btnLinia = document.getElementById("bingo-btn-linia");
  const btnBingo = document.getElementById("bingo-btn-bingo");
  if (!btnLinia || !btnBingo || !bingoCartroActual) return;

  const liniesPropi = (window._bingoLiniesDetall || [])
    .filter((l) => l.jugador === jugadorActiu)
    .map((l) => l.fila);

  const liniaNova = bingoTrobarLiniaNova(
    bingoCartroActual.caselles,
    liniesPropi,
  );
  const maxAssolit = bingoLiniesGlobal.length >= BINGO_MAX_LINIES;
  const complet = bingoEsComplet(bingoCartroActual.caselles);

  btnLinia.style.display =
    liniaNova !== -1 && !maxAssolit && !bingoBingoFet && !complet
      ? "block"
      : "none";
  btnBingo.style.display = complet && !bingoBingoFet ? "block" : "none";
}

// ── CANTAR LÍNIA ──────────────────────────────────────────────
async function bingoCantarLinia() {
  if (!bingoCartroActual) return;
  const liniesPropi = (window._bingoLiniesDetall || [])
    .filter((l) => l.jugador === jugadorActiu)
    .map((l) => l.fila);
  const filaIdx = bingoTrobarLiniaNova(bingoCartroActual.caselles, liniesPropi);
  if (filaIdx === -1) return;

  try {
    const db = bingoGetDb();
    const ref = db.collection(BINGO_COL).doc(BINGO_DOC);
    const snap = await ref.get();
    const data = snap.exists ? snap.data() : {};
    const linies = data.linies || [];

    if (linies.length >= BINGO_MAX_LINIES) {
      alert("Ja s'han cantat totes les línies possibles!");
      return;
    }

    const ordre = linies.length + 1;
    const novaLinia = {
      jugador: jugadorActiu,
      fila: filaIdx,
      ts: Date.now(),
      ordre,
    };
    await ref.set({ linies: [...linies, novaLinia] }, { merge: true });

    const pts = BINGO_PUNTS_LINIA[linies.length] || 0;
    bingoSumarPunts(pts);
    bingoMostrarModal("🎉", `Línia ${ordre}!`, `Has guanyat ${pts} punts!`);
  } catch (e) {
    console.error("Error cantar línia:", e);
    alert("Error de connexió.");
  }
}

// ── CANTAR BINGO ──────────────────────────────────────────────
async function bingoCantarBingo() {
  if (!bingoEsComplet(bingoCartroActual.caselles)) return;
  try {
    const db = bingoGetDb();
    const ref = db.collection(BINGO_COL).doc(BINGO_DOC);
    const snap = await ref.get();
    const data = snap.exists ? snap.data() : {};

    if (data.bingo) {
      alert(`El Bingo ja l'ha cantat ${data.bingo.jugador}!`);
      return;
    }

    await ref.set(
      {
        bingo: { jugador: jugadorActiu, ts: Date.now() },
        acabada: true,
      },
      { merge: true },
    );

    bingoSumarPunts(BINGO_PUNTS_BINGO_TOTAL);
    bingoMostrarModal(
      "🏆",
      "BINGO!",
      `Has completat el cartró i guanyes ${BINGO_PUNTS_BINGO_TOTAL} punts!`,
    );
  } catch (e) {
    console.error("Error cantar bingo:", e);
    alert("Error de connexió.");
  }
}

// ── LISTENER TEMPS REAL ───────────────────────────────────────
function bingoEscoltarPartida() {
  if (bingoUnsubscribe) bingoUnsubscribe();
  try {
    const db = bingoGetDb();
    bingoUnsubscribe = db
      .collection(BINGO_COL)
      .doc(BINGO_DOC)
      .onSnapshot(
        (snap) => {
          if (!snap.exists) {
            window._bingoLiniesDetall = [];
            window._bingoBingoData = null;
            bingoLiniesGlobal = [];
            bingoBingoFet = false;
            return;
          }
          const data = snap.data();
          window._bingoLiniesDetall = data.linies || [];
          window._bingoBingoData = data.bingo || null;
          bingoLiniesGlobal = data.linies || [];
          bingoBingoFet = !!data.acabada;

          const screenJoc = document.getElementById("screen-bingo-joc");
          if (screenJoc && screenJoc.style.display !== "none") {
            bingoRenderCartro();
            bingoActualitzarBotosCant();
            bingoRenderRanking();
          }
        },
        (err) => console.error("Firestore error:", err),
      );
  } catch (e) {
    console.error("Error iniciant listener:", e);
  }
}

// ── RÀNQUING ──────────────────────────────────────────────────
function bingoRenderRanking() {
  const llista = JUGADORS_VALIDS.map((nom) => {
    const estat = bingoCarregarEstatLocal(nom);
    return { nom, punts: estat ? estat.punts : 0 };
  }).sort((a, b) => b.punts - a.punts);

  const posEmoji = ["🥇", "🥈", "🥉"];
  const el = document.getElementById("bingo-ranking-list");
  if (!el) return;
  el.innerHTML = llista
    .map(
      (r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? "actiu" : ""}">
      <div class="ranking-pos ${i < 3 ? "p" + (i + 1) : "other"}">${i < 3 ? posEmoji[i] : i + 1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom] || ""}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div class="rank-barra-wrap"><div class="rank-barra" style="width:${Math.min((r.punts / 1000) * 100, 100)}%"></div></div>
      </div>
      <div class="rank-punts">${r.punts}</div>
    </div>`,
    )
    .join("");
}

// ── PERSISTÈNCIA LOCAL ────────────────────────────────────────
function bingoGuardarCartroLocal(cartro) {
  localStorage.setItem(
    BINGO_STORAGE_KEY + jugadorActiu,
    JSON.stringify(cartro),
  );
}

function bingoCarregarCartroLocal() {
  try {
    const raw = localStorage.getItem(BINGO_STORAGE_KEY + jugadorActiu);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function bingoCarregarEstatLocal(nom) {
  nom = nom || jugadorActiu;
  try {
    const raw = localStorage.getItem(BINGO_PUNTS_STORAGE_KEY + nom);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function bingoSumarPunts(pts) {
  const estat = bingoCarregarEstatLocal() || { punts: 0 };
  estat.punts += pts;
  localStorage.setItem(
    BINGO_PUNTS_STORAGE_KEY + jugadorActiu,
    JSON.stringify(estat),
  );
  const el = document.getElementById("bingo-score");
  if (el) el.textContent = estat.punts;
  bingoRenderRanking();
}

// ── MODAL ─────────────────────────────────────────────────────
function bingoMostrarModal(icon, titol, text) {
  document.getElementById("modal-bingo-icon").textContent = icon;
  document.getElementById("modal-bingo-title").textContent = titol;
  document.getElementById("modal-bingo-text").textContent = text;
  document.getElementById("modal-bingo-event").classList.add("visible");
}

// ══════════════════════════════════════════════════════════════
//  REPTES DEL VIATGE — amb Firebase Firestore
// ══════════════════════════════════════════════════════════════

// ── FIREBASE ──────────────────────────────────────────────────
let _reptesDb = null;
function reptesGetDb() {
  if (_reptesDb) return _reptesDb;
  if (!firebase.apps.length) firebase.initializeApp(CONFIG.FIREBASE);
  _reptesDb = firebase.firestore();
  return _reptesDb;
}

// ── ESTAT ─────────────────────────────────────────────────────
let reptesUnsubscribe = null;
let reptesData = null; // { reptes: [{id, text}], marcatges: { NOM: [id1, id2, ...] } }

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarReptes() {
  mostraScreen("reptes");
  document.getElementById("reptes-loading").style.display = "flex";
  document.getElementById("reptes-taula-wrap").style.display = "none";
  reptesEscoltarPartida();
}

// ── LISTENER TEMPS REAL ───────────────────────────────────────
function reptesEscoltarPartida() {
  if (reptesUnsubscribe) reptesUnsubscribe();
  try {
    const db = reptesGetDb();
    reptesUnsubscribe = db
      .collection(REPTES_COL)
      .doc(REPTES_DOC)
      .onSnapshot(
        async (snap) => {
          if (!snap.exists) {
            // Primera vegada: inicialitza amb els reptes inicials
            await reptesInicialitzar();
            return;
          }
          reptesData = snap.data();
          reptesRenderTaula();
        },
        (err) => console.error("Firestore reptes error:", err),
      );
  } catch (e) {
    console.error("Error iniciant listener reptes:", e);
  }
}

// ── INICIALITZAR (primera vegada) ─────────────────────────────
async function reptesInicialitzar() {
  try {
    const db = reptesGetDb();
    const reptes = REPTES_INICIALS.map((text, i) => ({ id: i + 1, text }));
    const marcatges = {};
    JUGADORS_VALIDS.forEach((nom) => {
      marcatges[nom] = [];
    });

    await db.collection(REPTES_COL).doc(REPTES_DOC).set({ reptes, marcatges });
  } catch (e) {
    console.error("Error inicialitzant reptes:", e);
  }
}

// ── RENDER TAULA ──────────────────────────────────────────────
function reptesRenderTaula() {
  if (!reptesData) return;

  document.getElementById("reptes-loading").style.display = "none";
  document.getElementById("reptes-taula-wrap").style.display = "block";

  const { reptes, marcatges } = reptesData;
  const jugadors = JUGADORS_VALIDS;

  // Calcula quants reptes ha fet cada jugador
  const totals = {};
  jugadors.forEach((nom) => {
    totals[nom] = (marcatges[nom] || []).length;
  });

  // Ordena jugadors per nombre de reptes (per les medalles)
  const ranking = [...jugadors].sort((a, b) => totals[b] - totals[a]);
  const medalles = {
    [ranking[0]]: "🥇",
    [ranking[1]]: "🥈",
    [ranking[2]]: "🥉",
  };

  // ── Capçalera ──
  const thead = document.getElementById("reptes-thead");
  thead.innerHTML = `
    <tr>
      <th class="reptes-th reptes-th-repte">Repte</th>
      ${jugadors
        .map((nom) => {
          const total = totals[nom];
          const medalla = total > 0 && medalles[nom] ? medalles[nom] : "";
          const esActiu = nom === jugadorActiu;
          return `<th class="reptes-th reptes-th-jugador ${esActiu ? "actiu" : ""}">
          <div class="reptes-th-nom">${medalla} ${nom}</div>
          <div class="reptes-th-total">${total}/${reptes.length}</div>
        </th>`;
        })
        .join("")}
    </tr>`;

  // ── Files ──
  const tbody = document.getElementById("reptes-tbody");
  tbody.innerHTML = reptes
    .map(
      (repte) => `
    <tr class="reptes-fila">
      <td class="reptes-td reptes-td-text">${repte.text}</td>
      ${jugadors
        .map((nom) => {
          const fet = (marcatges[nom] || []).includes(repte.id);
          const esActiu = nom === jugadorActiu;
          return `<td class="reptes-td reptes-td-check ${esActiu ? "actiu" : ""} ${fet ? "fet" : ""}">
          <button class="reptes-check ${fet ? "marcat" : ""} ${esActiu ? "" : "disabled"}"
                  onclick="${esActiu ? `reptesToggle(${repte.id})` : ""}"
                  ${esActiu ? "" : "disabled"}>
            ${fet ? "✅" : "⬜"}
          </button>
        </td>`;
        })
        .join("")}
    </tr>`,
    )
    .join("");
}

// ── TOGGLE REPTE ──────────────────────────────────────────────
async function reptesToggle(idRepte) {
  if (!reptesData) return;
  try {
    const db = reptesGetDb();
    const marcatgesActuals = reptesData.marcatges[jugadorActiu] || [];
    let nousMarcatges;

    if (marcatgesActuals.includes(idRepte)) {
      nousMarcatges = marcatgesActuals.filter((id) => id !== idRepte);
    } else {
      nousMarcatges = [...marcatgesActuals, idRepte];
    }

    await db
      .collection(REPTES_COL)
      .doc(REPTES_DOC)
      .update({
        [`marcatges.${jugadorActiu}`]: nousMarcatges,
      });
  } catch (e) {
    console.error("Error togglejant repte:", e);
    alert("Error de connexió.");
  }
}

// ── AFEGIR REPTE NOU (amb PIN) ────────────────────────────────
async function reptesAfegirRepte() {
  const pin = prompt("PIN d'administrador:");
  if (pin !== REPTES_PIN) {
    if (pin !== null) alert("PIN incorrecte.");
    return;
  }

  const text = prompt("Escriu el nou repte:");
  if (!text || !text.trim()) return;

  try {
    const db = reptesGetDb();
    const reptes = reptesData.reptes || [];
    const nouId = Math.max(...reptes.map((r) => r.id), 0) + 1;
    const nouRepte = { id: nouId, text: text.trim() };

    await db
      .collection(REPTES_COL)
      .doc(REPTES_DOC)
      .update({
        reptes: [...reptes, nouRepte],
      });
  } catch (e) {
    console.error("Error afegint repte:", e);
    alert("Error de connexió.");
  }
}
