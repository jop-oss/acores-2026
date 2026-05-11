// ══════════════════════════════════════════════════════════════
//  COLOR FILL (Flood It) · js/colorfill.js
// ══════════════════════════════════════════════════════════════
//
//  3 nivells:
//    petit  → 12×12, 5 colors, 3 taulers, límit 22 moviments
//    mitjà  → 14×14, 6 colors, 4 taulers, límit 25 moviments
//    gran   → 16×16, 7 colors, 3 taulers, límit 28 moviments
//
//  Puntuació: 100 per tauler resolt + 25 pts per moviment no usat
//  Rànquing: suma 3 millors (petit+gran), 4 millors (mitjà)
//  localStorage: colorfill_estat_Nom

// ── CONSTANTS ─────────────────────────────────────────────────
const CF_NIVELLS = {
  petit: {
    mida: 12,
    colors: 5,
    taulers: 3,
    limit: 22,
    pts_base: 100,
    pts_mov: 25,
    top: 3,
  },
  mitja: {
    mida: 14,
    colors: 6,
    taulers: 4,
    limit: 25,
    pts_base: 100,
    pts_mov: 25,
    top: 4,
  },
  gran: {
    mida: 16,
    colors: 7,
    taulers: 3,
    limit: 28,
    pts_base: 100,
    pts_mov: 25,
    top: 3,
  },
};

// Paleta volcànica per a cada nivell de colors
const CF_COLORS = [
  "#e63946", // vermell volcànic
  "#f4a261", // taronja lava
  "#2a9d8f", // verd oceà
  "#457b9d", // blau Atlàntic
  "#a8d8b0", // verd clar açorià
  "#9b5de5", // violeta
  "#ffd166", // groc
];

// ── ESTAT ─────────────────────────────────────────────────────
let cfEstat = null; // estat persistent (localStorage)
let cfJoc = null; // estat de la partida actual

// ── LOCALSTORAGE ──────────────────────────────────────────────
function cfCarregarEstat(nom) {
  try {
    const raw = localStorage.getItem(`colorfill_estat_${nom}`);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function cfGuardarEstat(nom, estat) {
  try {
    localStorage.setItem(`colorfill_estat_${nom}`, JSON.stringify(estat));
  } catch (e) {}
}

function cfEstatBuit() {
  return {
    petit: { partides: [] }, // [{punts, movsFets, movsLimit, completat}]
    mitja: { partides: [] },
    gran: { partides: [] },
  };
}

// ── PUNTS GLOBALS (per rànquing) ──────────────────────────────
function colorfillGetPuntsGlobals() {
  const res = {};
  (
    window.JUGADORS_VALIDS || ["Jordi", "Anna", "Laia", "Mons", "Xu", "Joa"]
  ).forEach((nom) => {
    res[nom] = cfCalcularPuntsTotal(cfCarregarEstat(nom));
  });
  return res;
}

function cfCalcularPuntsTotal(estat) {
  if (!estat) return 0;
  let total = 0;
  Object.entries(CF_NIVELLS).forEach(([key, cfg]) => {
    const partides = (estat[key]?.partides || [])
      .filter((p) => p.completat)
      .map((p) => p.punts)
      .sort((a, b) => b - a)
      .slice(0, cfg.top);
    total += partides.reduce((s, p) => s + p, 0);
  });
  return total;
}

// ── INICIAR JOC ───────────────────────────────────────────────
function iniciarColorFill() {
  if (!jugadorActiu) return;
  cfEstat = cfCarregarEstat(jugadorActiu) || cfEstatBuit();
  cfJoc = null;
  mostraScreen("colorfill-selector");
  cfRenderSelector();
}

// ── PANTALLA SELECTOR ─────────────────────────────────────────
function cfRenderSelector() {
  const cont = document.getElementById("colorfill-selector-cont");
  if (!cont) return;

  const total = cfCalcularPuntsTotal(cfEstat);

  const html = `
    <div class="cf-selector-wrap">
      <div class="joc-header-fila">
        <button class="mapa-back-btn" onclick="mostraScreen('joc-selector')">← Tornar</button>
      </div>
      <div class="joc-titol-fila">
        <span class="joc-titol-emoji">🎨</span>
        <span class="joc-titol-text gradient-text">Color Fill</span>
      </div>
      <div class="cf-jugador-wrap">
        <img src="${IMGS[jugadorActiu]}" class="cf-jugador-avatar" alt="${jugadorActiu}">
        <div>
          <div class="cf-jugador-nom">${jugadorActiu}</div>
          <div class="cf-jugador-pts">${total} pts totals</div>
        </div>
      </div>
      <p class="cf-desc">Omple tot el tauler d'un sol color.<br>
        Comences des de la cantonada superior esquerra.<br>
        Cada clic al color expande la teva regió.</p>
      <div class="cf-nivells-grid">
        ${Object.entries(CF_NIVELLS)
          .map(([key, cfg]) => cfRenderNivellCard(key, cfg))
          .join("")}
      </div>
    </div>
  `;
  cont.innerHTML = html;
}

function cfRenderNivellCard(key, cfg) {
  const partides = cfEstat[key]?.partides || [];
  const nomNivell = { petit: "Petit", mitja: "Mitjà", gran: "Gran" }[key];
  const emoji = { petit: "🟢", mitja: "🟡", gran: "🔴" }[key];

  const completades = partides.filter((p) => p.completat).length;
  const totalPts = partides
    .filter((p) => p.completat)
    .map((p) => p.punts)
    .sort((a, b) => b - a)
    .slice(0, cfg.top)
    .reduce((s, p) => s + p, 0);

  // Mini preview de les partides
  const previewPartides = Array.from({ length: cfg.taulers }, (_, i) => {
    const p = partides[i];
    if (!p) return `<div class="cf-partida-slot buida">—</div>`;
    const cls = p.completat ? "completada" : "fallada";
    return `<div class="cf-partida-slot ${cls}">${p.punts} pts</div>`;
  }).join("");

  return `
    <div class="cf-nivell-card" onclick="cfIniciarNivell('${key}')">
      <div class="cf-nivell-header">
        <span class="cf-nivell-emoji">${emoji}</span>
        <span class="cf-nivell-nom">${nomNivell}</span>
      </div>
      <div class="cf-nivell-info">
        <span>${cfg.mida}×${cfg.mida}</span>
        <span>${cfg.colors} colors</span>
        <span>Límit: ${cfg.limit} movs</span>
      </div>
      <div class="cf-nivell-partides-preview">
        ${previewPartides}
      </div>
      <div class="cf-nivell-stats">
        <span>${completades}/${cfg.taulers} completats</span>
        <span class="cf-nivell-pts">${totalPts} pts (top ${cfg.top})</span>
      </div>
      <button class="cf-btn-jugar">Jugar →</button>
    </div>
  `;
}

// ── INICIAR NIVELL ────────────────────────────────────────────
function cfIniciarNivell(nivellKey) {
  const cfg = CF_NIVELLS[nivellKey];
  const tauler = cfGenerarTauler(cfg.mida, cfg.colors);

  cfJoc = {
    nivellKey,
    cfg,
    tauler,
    taulerInicial: tauler.map((r) => [...r]), // còpia per restart
    movsRestants: cfg.limit,
    movsFets: 0,
    acabat: false,
    guanyat: false,
    colorActual: tauler[0][0],
  };

  mostraScreen("colorfill-joc");
  cfRenderJoc();
}

// ── GENERAR TAULER ────────────────────────────────────────────
function cfGenerarTauler(mida, numColors) {
  // Generem un tauler aleatori que sempre sigui solucionable
  // (qualsevol tauler aleatori és solucionable; la dificultat és fer-ho en menys moviments)
  const tauler = [];
  for (let r = 0; r < mida; r++) {
    const fila = [];
    for (let c = 0; c < mida; c++) {
      // Evitem 3 del mateix color en línia (tauler una mica més interessant)
      let color;
      do {
        color = Math.floor(Math.random() * numColors);
      } while (
        (c >= 2 && fila[c - 1] === color && fila[c - 2] === color) ||
        (r >= 2 && tauler[r - 1][c] === color && tauler[r - 2][c] === color)
      );
      fila.push(color);
    }
    tauler.push(fila);
  }
  return tauler;
}

// ── RENDER JOC ────────────────────────────────────────────────
function cfRenderJoc() {
  const cont = document.getElementById("colorfill-joc-cont");
  if (!cont || !cfJoc) return;
  const {
    cfg,
    nivellKey,
    tauler,
    movsRestants,
    movsFets,
    acabat,
    guanyat,
    colorActual,
  } = cfJoc;
  const nomNivell = { petit: "Petit", mitja: "Mitjà", gran: "Gran" }[nivellKey];
  const cellSize = cfg.mida === 12 ? 28 : cfg.mida === 14 ? 24 : 21;

  // Calcul percentatge completat
  const regio = cfCalcularRegio(tauler);
  const pct = Math.round((regio.size / (cfg.mida * cfg.mida)) * 100);

  // Bottons de colors
  const botoColors = Array.from({ length: cfg.colors }, (_, i) => {
    const actiu = i === colorActual ? "actiu" : "";
    const desactivat = i === colorActual ? "desactivat" : "";
    return `<button class="cf-color-btn ${actiu} ${desactivat}"
      style="background:${CF_COLORS[i]};border-color:${CF_COLORS[i]}"
      onclick="cfFerMoviment(${i})"
      ${i === colorActual ? "disabled" : ""}
    ></button>`;
  }).join("");

  // Tauler SVG per rendiment
  const cw = cfg.mida * cellSize;
  const cells = [];
  for (let r = 0; r < cfg.mida; r++) {
    for (let c = 0; c < cfg.mida; c++) {
      const color = CF_COLORS[tauler[r][c]];
      const isRegio = regio.has(`${r},${c}`);
      const stroke = isRegio ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.1)";
      const strokeW = isRegio ? 1.5 : 0.5;
      cells.push(`<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}"
        fill="${color}" stroke="${stroke}" stroke-width="${strokeW}" rx="1"/>`);
    }
  }
  // Marca cantonada activa
  cells.push(`<rect x="0" y="0" width="${cellSize}" height="${cellSize}"
    fill="none" stroke="white" stroke-width="2.5" rx="2"/>`);

  const movsColor =
    movsRestants <= 3 ? "#e63946" : movsRestants <= 6 ? "#f4a261" : "#a8d8b0";

  cont.innerHTML = `
    <div class="cf-joc-wrap">
      <div class="cf-joc-header">
        <button class="mapa-back-btn" onclick="cfSortir()">← Tornar</button>
        <div class="cf-joc-info">
          <span class="cf-joc-nivell">${nomNivell} · ${cfg.mida}×${cfg.mida}</span>
        </div>
        <div class="cf-joc-movs" style="color:${movsColor}">
          <span class="cf-movs-num">${movsRestants}</span>
          <span class="cf-movs-label">moviments</span>
        </div>
      </div>

      <div class="cf-progres-wrap">
        <div class="cf-progres-bar">
          <div class="cf-progres-fill" style="width:${pct}%"></div>
        </div>
        <span class="cf-progres-pct">${pct}%</span>
      </div>

      <div class="cf-tauler-wrap">
        <svg class="cf-tauler-svg" width="${cw}" height="${cw}" viewBox="0 0 ${cw} ${cw}">
          ${cells.join("")}
        </svg>
      </div>

      <div class="cf-colors-wrap">
        ${botoColors}
      </div>

      <div class="cf-joc-accions">
        <button class="cf-btn-reiniciar" onclick="cfReiniciarPartida()">↺ Reiniciar</button>
      </div>
    </div>
  `;

  // Afegir event listeners als botons de color (per evitar problemes amb onclick inline)
  // Ja s'han definit amb onclick directament
}

// ── CALCULAR REGIÓ (BFS des de [0,0]) ─────────────────────────
function cfCalcularRegio(tauler) {
  const mida = tauler.length;
  const colorRegio = tauler[0][0];
  const visitat = new Set();
  const cua = [[0, 0]];
  visitat.add("0,0");
  while (cua.length > 0) {
    const [r, c] = cua.shift();
    for (const [dr, dc] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const nr = r + dr,
        nc = c + dc;
      if (
        nr >= 0 &&
        nr < mida &&
        nc >= 0 &&
        nc < mida &&
        !visitat.has(`${nr},${nc}`) &&
        tauler[nr][nc] === colorRegio
      ) {
        visitat.add(`${nr},${nc}`);
        cua.push([nr, nc]);
      }
    }
  }
  return visitat;
}

// ── FER MOVIMENT ──────────────────────────────────────────────
function cfFerMoviment(nouColor) {
  if (!cfJoc || cfJoc.acabat) return;
  if (nouColor === cfJoc.colorActual) return;

  const { tauler, cfg } = cfJoc;
  const mida = cfg.mida;

  // Flood fill: expandir la regió actual al nou color
  const regio = cfCalcularRegio(tauler);

  // Canviem el color de tota la regió actual al nou color
  regio.forEach((key) => {
    const [r, c] = key.split(",").map(Number);
    tauler[r][c] = nouColor;
  });

  // Ara expandim: afegim als veïns del nou color que toquen la nostra regió expandida
  // (ja que estan ara del mateix color, es fusionen automàticament en el pròxim render)
  // El flood fill recursiu s'encarregarà en el pròxim moviment

  cfJoc.colorActual = nouColor;
  cfJoc.movsRestants--;
  cfJoc.movsFets++;

  // Comprovar victòria
  const regioNova = cfCalcularRegio(tauler);
  const total = mida * mida;

  if (regioNova.size === total) {
    // Guanyat!
    cfJoc.guanyat = true;
    cfJoc.acabat = true;
    const pts = cfg.pts_base + cfJoc.movsRestants * cfg.pts_mov;
    cfGuardarResultat(true, pts);
    setTimeout(() => cfMostrarFinal(true, pts), 300);
  } else if (cfJoc.movsRestants <= 0) {
    // Perdut
    cfJoc.guanyat = false;
    cfJoc.acabat = true;
    cfGuardarResultat(false, 0);
    setTimeout(() => cfMostrarFinal(false, 0), 300);
  } else {
    cfRenderJoc();
  }
}

// ── GUARDAR RESULTAT ──────────────────────────────────────────
function cfGuardarResultat(guanyat, pts) {
  if (!jugadorActiu) return;
  const estat = cfCarregarEstat(jugadorActiu) || cfEstatBuit();
  const key = cfJoc.nivellKey;
  if (!estat[key]) estat[key] = { partides: [] };
  estat[key].partides.push({
    punts: pts,
    movsFets: cfJoc.movsFets,
    movsLimit: cfJoc.cfg.limit,
    completat: guanyat,
    data: Date.now(),
  });
  cfEstat = estat;
  cfGuardarEstat(jugadorActiu, estat);
}

// ── PANTALLA FINAL ────────────────────────────────────────────
function cfMostrarFinal(guanyat, pts) {
  const cont = document.getElementById("colorfill-joc-cont");
  if (!cont) return;
  const { cfg, nivellKey, movsFets } = cfJoc;
  const nomNivell = { petit: "Petit", mitja: "Mitjà", gran: "Gran" }[nivellKey];
  const total = cfCalcularPuntsTotal(cfEstat);

  const bonus = guanyat ? cfJoc.movsRestants * cfg.pts_mov : 0;

  if (guanyat) llançarConfetti();

  cont.innerHTML = `
    <div class="cf-final-wrap">
      <img src="${IMGS[jugadorActiu]}" class="cf-final-avatar" alt="${jugadorActiu}">
      <div class="cf-final-emoji">${guanyat ? "🎉" : "😞"}</div>
      <div class="cf-final-titol">${guanyat ? "¡Tauler omplert!" : "Sense moviments"}</div>
      ${
        guanyat
          ? `
        <div class="cf-final-pts">${pts}</div>
        <div class="cf-final-sub">punts en aquesta partida</div>
        <div class="cf-final-detall">
          <div class="cf-final-stat"><span>Base</span><strong>100 pts</strong></div>
          <div class="cf-final-stat"><span>Bonus (${cfJoc.movsRestants} movs restants × ${cfg.pts_mov})</span><strong>+${bonus} pts</strong></div>
          <div class="cf-final-stat"><span>Moviments fets</span><strong>${movsFets} / ${cfg.limit}</strong></div>
        </div>
      `
          : `
        <div class="cf-final-pts zero">0</div>
        <div class="cf-final-sub">Exhaurit el límit de ${cfg.limit} moviments</div>
      `
      }
      <div class="cf-final-total">Total ${jugadorActiu}: ${total} pts</div>
      <div class="cf-final-btns">
        <button class="cf-btn-nova" onclick="cfIniciarNivell('${nivellKey}')">Nova partida ↺</button>
        <button class="cf-btn-selector" onclick="cfTornarSelector()">Canviar nivell</button>
        <button class="cf-btn-inici" onclick="mostraScreen('joc-selector')">Inici 🏠</button>
      </div>
    </div>
  `;
}

// ── REINICIAR PARTIDA ─────────────────────────────────────────
function cfReiniciarPartida() {
  if (!cfJoc) return;
  // Restaurem el tauler inicial
  cfJoc.tauler = cfJoc.taulerInicial.map((r) => [...r]);
  cfJoc.movsRestants = cfJoc.cfg.limit;
  cfJoc.movsFets = 0;
  cfJoc.acabat = false;
  cfJoc.guanyat = false;
  cfJoc.colorActual = cfJoc.tauler[0][0];
  cfRenderJoc();
}

// ── SORTIR ────────────────────────────────────────────────────
function cfSortir() {
  cfJoc = null;
  cfTornarSelector();
}

function cfTornarSelector() {
  mostraScreen("colorfill-selector");
  cfRenderSelector();
}

// ── CONFETTI ──────────────────────────────────────────────────
function llançarConfetti() {
  const wrap = document.getElementById("confetti");
  if (!wrap) return;
  const colors = CF_COLORS;
  for (let i = 0; i < 60; i++) {
    const el = document.createElement("div");
    el.style.cssText = `
      position:fixed; width:8px; height:8px; border-radius:2px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${Math.random() * 100}vw; top:-10px;
      animation:confetti-fall ${1.5 + Math.random()}s linear forwards;
      animation-delay:${Math.random() * 0.5}s;
      z-index:9999; pointer-events:none;
    `;
    wrap.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
}

// ── ADMIN: REINICI ────────────────────────────────────────────
function cfAdminReset(nom) {
  localStorage.removeItem(`colorfill_estat_${nom}`);
}

function cfAdminResetTot() {
  (
    window.JUGADORS_VALIDS || ["Jordi", "Anna", "Laia", "Mons", "Xu", "Joa"]
  ).forEach((nom) => {
    localStorage.removeItem(`colorfill_estat_${nom}`);
  });
}
