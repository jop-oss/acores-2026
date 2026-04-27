// ══════════════════════════════════════════════════════════════
//  TRIVIAL AÇORES — amb Firebase Firestore
// ══════════════════════════════════════════════════════════════

// ── FIREBASE ──────────────────────────────────────────────────
let _trivialDb = null;
function trivialGetDb() {
  if (_trivialDb) return _trivialDb;
  if (!firebase.apps.length) firebase.initializeApp(CONFIG.FIREBASE);
  _trivialDb = firebase.firestore();
  return _trivialDb;
}

const TRIVIAL_COL = "trivial_partides";
const TRIVIAL_IND_DOC = "individual";
const TRIVIAL_EQ_DOC = "equips";

// ── CONSTANTS ─────────────────────────────────────────────────
const TRIVIAL_ORDRE_JUGADORS = ["Anna", "Jordi", "Mons", "Xu", "Laia", "Joa"];
const TRIVIAL_CATS = [
  "esports",
  "geografia",
  "ciencies",
  "historia",
  "cultura",
  "acores",
];
const TRIVIAL_PUNTS_CATEGORIA = 50; // 3 encerts d'una categoria
const TRIVIAL_PUNTS_FINAL_OK = 100; // supera la prova final
const TRIVIAL_PUNTS_FINAL_PT = 5; // per encert a la prova final si no la supera
const TRIVIAL_ENCERTS_BLOQUEIG = 3; // encerts per bloquejar categoria
const TRIVIAL_FINAL_PREGUNTES = 12; // 7 mitjanes + 5 altes
const TRIVIAL_FINAL_MIN_ENCERTS = 8; // mínim per superar la prova final
const TRIVIAL_MAX_ENCERTS_TORN = 3; // màxim encerts seguits en un torn
const TRIVIAL_CRONOME_SEGS = 120; // 2 minuts per torn
const TRIVIAL_ANIMALS = [
  "guineu",
  "girafa",
  "elefant",
  "lleo",
  "dofin",
  "pingui",
  "pop",
  "panda",
];

// ── ESTAT LOCAL ───────────────────────────────────────────────
let trivialPartida = null; // estat complet de la partida
let trivialModalitat = null; // 'individual' | 'equips'
let trivialUnsubscribe = null;
let trivialCronometreInterval = null;
let trivialPreguntaActual = null;
let trivialRespost = false;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarTrivial() {
  trivialModalitat = null;
  trivialPartida = null;
  mostraScreen("trivial-inici");
  trivialCarregarInici();
}

async function trivialCarregarInici() {
  // Carrega l'estat de les dues partides possibles
  try {
    const db = trivialGetDb();
    const [snapInd, snapEq] = await Promise.all([
      db.collection(TRIVIAL_COL).doc(TRIVIAL_IND_DOC).get(),
      db.collection(TRIVIAL_COL).doc(TRIVIAL_EQ_DOC).get(),
    ]);

    trivialRenderInici(
      snapInd.exists ? snapInd.data() : null,
      snapEq.exists ? snapEq.data() : null,
    );
  } catch (e) {
    console.error("Error carregant trivial:", e);
  }
}

// ── PANTALLA INICI ────────────────────────────────────────────
function trivialRenderInici(partidaInd, partidaEq) {
  const cont = document.getElementById("trivial-inici-cont");
  if (!cont) return;

  const renderPartida = (p, modalitat) => {
    if (!p || !p.activa) {
      return `
        <div class="trivial-partida-card inactiva">
          <div class="trivial-partida-icon">${modalitat === "individual" ? "👤" : "👥"}</div>
          <div class="trivial-partida-nom">${modalitat === "individual" ? "Individual" : "Per equips"}</div>
          <div class="trivial-partida-estat">Cap partida activa</div>
          <button class="trivial-btn-nova" onclick="trivialNovaPartida('${modalitat}')">
            Nova partida
          </button>
        </div>`;
    }

    const jugadorActualNom = trivialGetJugadorActualNom(p);
    const esTocaJugadorActiu =
      modalitat === "individual"
        ? trivialEsTocaJugadorActiu(p)
        : trivialEsTocaJugadorActiuEquips(p);

    return `
      <div class="trivial-partida-card activa ${esTocaJugadorActiu ? "es-torn" : ""}">
        <div class="trivial-partida-icon">${modalitat === "individual" ? "👤" : "👥"}</div>
        <div class="trivial-partida-nom">${modalitat === "individual" ? "Individual" : "Per equips"}</div>
        ${esTocaJugadorActiu ? `<div class="trivial-torn-badge">🎯 És el teu torn!</div>` : ""}
        <div class="trivial-partida-torn">Torn de: <strong>${jugadorActualNom}</strong></div>
        <div class="trivial-partida-ronda">Ronda ${p.ronda || 1}</div>
        <div class="trivial-torn-temps" id="trivial-torn-temps-${modalitat}"></div>
        <div class="trivial-ranking-mini" id="trivial-rank-${modalitat}"></div>
        <div class="trivial-partida-btns">
          ${
            esTocaJugadorActiu
              ? `
            <button class="trivial-btn-jugar" onclick="trivialEntrarPartida('${modalitat}')">
              Jugar el meu torn →
            </button>`
              : `
            <button class="trivial-btn-veure" onclick="trivialVeurePartida('${modalitat}')">
              Veure partida
            </button>`
          }
          <button class="trivial-btn-admin" onclick="trivialAdminPartida('${modalitat}')">⚙️</button>
        </div>
      </div>`;
  };

  cont.innerHTML = `
    <div class="trivial-inici-layout">
      <div class="trivial-inici-cards-wrap">
        <div class="trivial-inici-titol-inline">🎲 Trivial Açores</div>
        <div class="trivial-partides-grid">
          ${renderPartida(partidaInd, "individual")}
          ${renderPartida(partidaEq, "equips")}
        </div>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏆 Rànquing Trivial</div>
        <div class="ranking-list-home" id="trivial-ranking-global-list">
          <div class="ranking-loading">Carregant…</div>
        </div>
      </div>
    </div>`;

  // Render rankings mini (a les cards de partida)
  if (partidaInd && partidaInd.activa)
    trivialRenderRankingMini(partidaInd, "individual");
  if (partidaEq && partidaEq.activa)
    trivialRenderRankingMini(partidaEq, "equips");

  trivialIniciarComptadorsTorn(partidaInd, "individual");
  trivialIniciarComptadorsTorn(partidaEq, "equips");

  // Rànquing global (Firebase async)
  trivialRenderRankingGlobal();
}

let _trivialComptadorIntervals = {};

function trivialIniciarComptadorsTorn(p, modalitat) {
  if (_trivialComptadorIntervals[modalitat]) {
    clearInterval(_trivialComptadorIntervals[modalitat]);
    delete _trivialComptadorIntervals[modalitat];
  }
  if (!p || !p.activa || !p.tornTs) return;
  const actualitzar = () => {
    const el = document.getElementById("trivial-torn-temps-" + modalitat);
    if (!el) {
      clearInterval(_trivialComptadorIntervals[modalitat]);
      return;
    }
    const segs = Math.floor((Date.now() - p.tornTs) / 1000);
    const min = Math.floor(segs / 60);
    const seg = segs % 60;
    const txt = min > 0 ? min + "min " + seg + "s" : seg + "s";
    const urgent = segs > 3600;
    el.textContent = "\u23f1 Fa " + txt;
    el.style.color = urgent ? "var(--error)" : "var(--text2)";
    el.style.fontSize = ".75rem";
  };
  actualitzar();
  _trivialComptadorIntervals[modalitat] = setInterval(actualitzar, 1000);
}

function trivialRenderRankingMini(p, modalitat) {
  const el = document.getElementById(`trivial-rank-${modalitat}`);
  if (!el) return;
  const jugadors = p.jugadors || [];
  const sorted = [...jugadors].sort((a, b) => b.punts - a.punts);
  el.innerHTML = sorted
    .slice(0, 3)
    .map(
      (j, i) => `
  <div class="trivial-rank-mini-item">
    <span>${["🥇", "🥈", "🥉"][i]}</span>
    <span>${j.nom}${j.membres ? ` (${j.membres.join(", ")})` : ""}</span>
    <span>${j.punts} pts</span>
  </div>`,
    )
    .join("");
}

// ── RÀNQUING GLOBAL TRIVIAL (individual + equips) ─────────────
async function trivialRenderRankingGlobal() {
  const el = document.getElementById("trivial-ranking-global-list");
  if (!el) return;

  try {
    const pts = await trivialGetPuntsGlobals();
    const llista = TRIVIAL_ORDRE_JUGADORS
      .map(nom => ({ nom, punts: pts[nom] || 0 }))
      .sort((a, b) => b.punts - a.punts);

    const maxPts = llista[0]?.punts || 1;
    const posEmoji = ["🥇", "🥈", "🥉"];

    el.innerHTML = llista.map((r, i) => `
      <div class="ranking-item ${r.nom === jugadorActiu ? "actiu" : ""}">
        <div class="ranking-pos ${i < 3 ? "p" + (i + 1) : "other"}">${i < 3 ? posEmoji[i] : i + 1}</div>
        <img class="rank-avatar" src="${IMGS[r.nom] || ""}" alt="${r.nom}">
        <div class="rank-info">
          <div class="rank-nom">${r.nom}</div>
          <div class="rank-barra-wrap"><div class="rank-barra" style="width:${Math.round((r.punts / maxPts) * 100)}%"></div></div>
        </div>
        <div class="rank-punts">${r.punts}</div>
      </div>`).join('');
  } catch(e) {
    const el2 = document.getElementById("trivial-ranking-global-list");
    if (el2) el2.innerHTML = '<div class="ranking-loading">Error carregant…</div>';
  }
}

// ── NOVA PARTIDA ──────────────────────────────────────────────
let trivialJugadorsSeleccionats = new Set(TRIVIAL_ORDRE_JUGADORS); // per defecte tots

function trivialNovaPartida(modalitat) {
  trivialModalitat = modalitat;
  trivialJugadorsSeleccionats = new Set(TRIVIAL_ORDRE_JUGADORS);
  if (modalitat === "individual") {
    mostraScreen("trivial-config-individual");
    trivialRenderConfigIndividual();
  } else {
    mostraScreen("trivial-config-equips");
    trivialRenderConfigEquips();
  }
}

function trivialRenderConfigIndividual() {
  const cont = document.getElementById("trivial-config-individual-cont");
  if (!cont) return;

  cont.innerHTML = `
    <p style="font-size:.85rem;color:var(--text2);margin-bottom:1rem">
      Selecciona els jugadors que participen en aquesta partida:
    </p>
    <div style="display:flex;flex-direction:column;gap:.5rem;margin-bottom:1.25rem">
      ${TRIVIAL_ORDRE_JUGADORS.map((nom) => {
        const sel = trivialJugadorsSeleccionats.has(nom);
        return `
          <div onclick="trivialToggleJugador('${nom}')"
               style="display:flex;align-items:center;gap:.75rem;background:${sel ? "rgba(106,171,122,.1)" : "var(--bg2)"};
                      border:2px solid ${sel ? "var(--verd2)" : "var(--border)"};border-radius:10px;
                      padding:.55rem .75rem;cursor:pointer;transition:all .15s">
            <img src="${IMGS[nom] || ""}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid ${sel ? "var(--verd2)" : "var(--border)"}">
            <span style="flex:1;font-weight:600">${nom}</span>
            <span style="font-size:1.2rem">${sel ? "✅" : "⬜"}</span>
          </div>`;
      }).join("")}
    </div>
    <div style="font-size:.78rem;color:var(--text2);margin-bottom:1rem">
      ${trivialJugadorsSeleccionats.size} jugador${trivialJugadorsSeleccionats.size !== 1 ? "s" : ""} seleccionat${trivialJugadorsSeleccionats.size !== 1 ? "s" : ""}
    </div>
    <button class="trivial-btn-iniciar" onclick="trivialIniciarPartidaIndividual()">
      Iniciar partida individual
    </button>`;
}

function trivialToggleJugador(nom) {
  if (trivialJugadorsSeleccionats.has(nom)) {
    if (trivialJugadorsSeleccionats.size <= 2) {
      alert("Mínim 2 jugadors.");
      return;
    }
    trivialJugadorsSeleccionats.delete(nom);
  } else {
    trivialJugadorsSeleccionats.add(nom);
  }
  trivialRenderConfigIndividual();
}

async function trivialIniciarPartidaIndividual() {
  const pin = prompt("PIN d'administrador per iniciar partida:");
  if (pin !== "2468") {
    if (pin !== null) alert("PIN incorrecte.");
    return;
  }

  // Manté l'ordre original filtrant només els seleccionats
  const jugadorsOrdenats = TRIVIAL_ORDRE_JUGADORS.filter((nom) =>
    trivialJugadorsSeleccionats.has(nom),
  );
  const idxInici = Math.floor(Math.random() * jugadorsOrdenats.length);
  const ordre = [
    ...jugadorsOrdenats.slice(idxInici),
    ...jugadorsOrdenats.slice(0, idxInici),
  ];

  const jugadors = jugadorsOrdenats.map((nom) => ({
    nom,
    punts: 0,
    categories: {
      esports: 0,
      geografia: 0,
      ciencies: 0,
      historia: 0,
      cultura: 0,
      acores: 0,
    },
    categoriesBloquejades: [],
    preguntesVistes: [],
    tornActual: null,
  }));

  const partida = {
    activa: true,
    modalitat: "individual",
    ordre,
    tornIdx: 0,
    ronda: 1,
    jugadors,
    acabada: false,
    ts: Date.now(),
  };

  try {
    await trivialGetDb()
      .collection(TRIVIAL_COL)
      .doc(TRIVIAL_IND_DOC)
      .set(partida);
    mostraScreen("trivial-inici");
    trivialCarregarInici();
  } catch (e) {
    console.error("Error creant partida:", e);
    alert("Error de connexió.");
  }
}

// ── CONFIG EQUIPS ─────────────────────────────────────────────
// Estat local de la configuració d'equips
const trivialAssignacions = {}; // { Anna: 1, Jordi: 2, ... } — 0 = sense assignar
let trivialNumEquips = 3;

function trivialRenderConfigEquips() {
  const cont = document.getElementById("trivial-config-equips-cont");
  if (!cont) return;

  TRIVIAL_ORDRE_JUGADORS.forEach((nom) => {
    if (!trivialAssignacions[nom]) trivialAssignacions[nom] = 0;
  });

  trivialRenderConfigEquipsHTML();
}

function trivialRenderConfigEquipsHTML() {
  const cont = document.getElementById("trivial-config-equips-cont");
  if (!cont) return;

  const colors = ["#4169E1", "#228B22", "#FF8C00"];

  cont.innerHTML = `
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;flex-wrap:wrap">
      <span style="font-size:.85rem;color:var(--text2)">Nombre d'equips:</span>
      <div style="display:flex;gap:.4rem">
        ${[2, 3]
          .map(
            (n) => `
          <button onclick="trivialCanviarNumEquips(${n})"
            style="padding:.35rem .9rem;border-radius:8px;border:2px solid ${trivialNumEquips === n ? "var(--verd2)" : "var(--border)"};
                   background:${trivialNumEquips === n ? "rgba(106,171,122,.15)" : "var(--bg2)"};
                   color:${trivialNumEquips === n ? "var(--verd2)" : "var(--text2)"};
                   font-family:\'DM Sans\',sans-serif;font-weight:600;cursor:pointer">
            ${n} equips
          </button>`,
          )
          .join("")}
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:.5rem;margin-bottom:1rem">
      ${TRIVIAL_ORDRE_JUGADORS.map((nom) => {
        const assignat = trivialAssignacions[nom] || 0;
        return `
          <div style="display:flex;align-items:center;gap:.75rem;background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:.5rem .75rem">
            <img src="${IMGS[nom] || ""}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;border:2px solid var(--border)">
            <span style="flex:1;font-weight:600;font-size:.9rem">${nom}</span>
            <div style="display:flex;gap:.35rem">
              <button onclick="trivialAssignarEquip('${nom}',0)"
                style="padding:.3rem .65rem;border-radius:6px;border:1px solid ${assignat === 0 ? "var(--error)" : "var(--border)"};
                       background:${assignat === 0 ? "rgba(224,85,85,.12)" : "var(--bg)"};
                       color:${assignat === 0 ? "#ff8a8a" : "var(--text2)"};font-size:.75rem;cursor:pointer;font-family:'DM Sans',sans-serif">
                No juga
              </button>
              ${Array.from({ length: trivialNumEquips }, (_, i) => i + 1)
                .map(
                  (n) => `
                <button onclick="trivialAssignarEquip('${nom}',${n})"
                  style="padding:.3rem .65rem;border-radius:6px;
                         border:2px solid ${assignat === n ? colors[n - 1] : "var(--border)"};
                         background:${assignat === n ? colors[n - 1] + "25" : "var(--bg)"};
                         color:${assignat === n ? colors[n - 1] : "var(--text2)"};
                         font-size:.75rem;font-weight:700;cursor:pointer;font-family:\'DM Sans\',sans-serif">
                  E${n}
                </button>`,
                )
                .join("")}
            </div>
          </div>`;
      }).join("")}
    </div>

    <div style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:.75rem;margin-bottom:1rem">
      <div style="font-size:.72rem;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem">Resum</div>
      ${Array.from({ length: trivialNumEquips }, (_, i) => i + 1)
        .map((n) => {
          const membres = TRIVIAL_ORDRE_JUGADORS.filter(
            (nom) => trivialAssignacions[nom] === n,
          );
          return `<div style="font-size:.82rem;color:var(--text);padding:2px 0">
          <span style="color:${colors[n - 1]};font-weight:700">Equip ${n}:</span>
          ${membres.length ? membres.join(", ") : '<span style="color:var(--text2)">sense membres</span>'}
        </div>`;
        })
        .join("")}
      ${
        TRIVIAL_ORDRE_JUGADORS.filter((nom) => !trivialAssignacions[nom]).length
          ? `<div style="font-size:.82rem;color:#ff8a8a;padding:2px 0">Sense assignar: ${TRIVIAL_ORDRE_JUGADORS.filter((nom) => !trivialAssignacions[nom]).join(", ")}</div>`
          : ""
      }
    </div>

    <button class="trivial-btn-iniciar" onclick="trivialCrearPartidaEquips()">
      Iniciar partida per equips
    </button>`;
}

function trivialCanviarNumEquips(n) {
  trivialNumEquips = n;
  // Reseteja assignacions que superin el nou nombre d'equips
  TRIVIAL_ORDRE_JUGADORS.forEach((nom) => {
    if (trivialAssignacions[nom] > n) trivialAssignacions[nom] = 0;
  });
  trivialRenderConfigEquipsHTML();
}

function trivialAssignarEquip(nom, equip) {
  trivialAssignacions[nom] = equip;
  trivialRenderConfigEquipsHTML();
}

async function trivialCrearPartidaEquips() {
  const pin = prompt("PIN d'administrador:");
  if (pin !== "2468") {
    if (pin !== null) alert("PIN incorrecte.");
    return;
  }

  // Valida que cada equip tingui com a mínim 1 membre
  const equipsValidats = Array.from({ length: trivialNumEquips }, (_, i) =>
    TRIVIAL_ORDRE_JUGADORS.filter((nom) => trivialAssignacions[nom] === i + 1),
  );
  const equipsBuits = equipsValidats
    .map((m, i) => (m.length === 0 ? `Equip ${i + 1}` : null))
    .filter(Boolean);
  if (equipsBuits.length > 0) {
    alert(`${equipsBuits.join(" i ")} no té cap membre.`);
    return;
  }
  const totalJugadors = equipsValidats.flat().length;
  if (totalJugadors < 2) {
    alert("Mínim 2 jugadors en total.");
    return;
  }

  // Construeix els equips a partir de les assignacions
  const animalsBarrejats = [...TRIVIAL_ANIMALS].sort(() => Math.random() - 0.5);
  const equips = Array.from({ length: trivialNumEquips }, (_, i) => ({
    nom: `Equip ${i + 1}`,
    membres: TRIVIAL_ORDRE_JUGADORS.filter(
      (nom) => trivialAssignacions[nom] === i + 1,
    ),
    animal: animalsBarrejats[i],
  })).filter((e) => e.membres.length > 0);

  const idxInici = Math.floor(Math.random() * equips.length);
  const ordre = [...equips.slice(idxInici), ...equips.slice(0, idxInici)].map(
    (e) => e.nom,
  );

  const jugadors = equips.map((eq) => ({
    nom: eq.nom,
    membres: eq.membres,
    animal: eq.animal,
    punts: 0,
    categories: {
      esports: 0,
      geografia: 0,
      ciencies: 0,
      historia: 0,
      cultura: 0,
      acores: 0,
    },
    categoriesBloquejades: [],
    preguntesVistes: [],
    tornActual: null,
  }));

  const partida = {
    activa: true,
    modalitat: "equips",
    equips,
    ordre,
    tornIdx: 0,
    ronda: 1,
    jugadors,
    acabada: false,
    ts: Date.now(),
  };

  try {
    await trivialGetDb()
      .collection(TRIVIAL_COL)
      .doc(TRIVIAL_EQ_DOC)
      .set(partida);
    mostraScreen("trivial-inici");
    trivialCarregarInici();
  } catch (e) {
    console.error("Error creant partida equips:", e);
    alert("Error de connexió.");
  }
}

// ── ENTRAR A LA PARTIDA (torn del jugador actiu) ───────────────
async function trivialEntrarPartida(modalitat) {
  trivialModalitat = modalitat;
  const docId = modalitat === "individual" ? TRIVIAL_IND_DOC : TRIVIAL_EQ_DOC;

  try {
    const snap = await trivialGetDb().collection(TRIVIAL_COL).doc(docId).get();
    if (!snap.exists) return;
    trivialPartida = snap.data();

    // Inicia listener temps real
    trivialEscoltarPartida(modalitat);

    mostraScreen("trivial-torn");
    trivialRenderTorn();
  } catch (e) {
    console.error("Error entrant partida:", e);
  }
}

async function trivialVeurePartida(modalitat) {
  trivialModalitat = modalitat;
  const docId = modalitat === "individual" ? TRIVIAL_IND_DOC : TRIVIAL_EQ_DOC;
  try {
    const snap = await trivialGetDb().collection(TRIVIAL_COL).doc(docId).get();
    if (!snap.exists) return;
    trivialPartida = snap.data();
    trivialEscoltarPartida(modalitat);
    mostraScreen("trivial-veure");
    trivialRenderVeure();
  } catch (e) {
    console.error(e);
  }
}

// ── LISTENER ──────────────────────────────────────────────────
function trivialEscoltarPartida(modalitat) {
  if (trivialUnsubscribe) trivialUnsubscribe();
  const docId = modalitat === "individual" ? TRIVIAL_IND_DOC : TRIVIAL_EQ_DOC;
  trivialUnsubscribe = trivialGetDb()
    .collection(TRIVIAL_COL)
    .doc(docId)
    .onSnapshot((snap) => {
      if (!snap.exists) return;
      trivialPartida = snap.data();
      const screen = document.querySelector(
        '[id^="screen-trivial-"]:not([style*="none"])',
      );
      if (!screen) return;
      const screenId = screen.id.replace("screen-", "");
      if (screenId === "trivial-torn") trivialRenderTorn();
      if (screenId === "trivial-veure") trivialRenderVeure();
    });
}

// ── PANTALLA TORN ─────────────────────────────────────────────
function trivialRenderTorn() {
  if (!trivialPartida) return;

  const jugadorActualNom = trivialGetJugadorActualNom(trivialPartida);
  const jugadorData = trivialGetJugadorData(trivialPartida, jugadorActualNom);
  const tornActual = jugadorData?.tornActual;

  // Header
  const header = document.getElementById("trivial-torn-header");
  if (header) {
    const isEquips = trivialModalitat === "equips";
    const imgSrc = isEquips
      ? jugadorData?.animal
        ? `img/animals/${jugadorData.animal}.svg`
        : ""
      : IMGS[jugadorActualNom] || "";
    const imgStyle = isEquips
      ? "width:36px;height:36px;border-radius:50%;object-fit:contain;background:#e8f4ec;padding:2px;border:2px solid var(--verd2)"
      : "width:36px;height:36px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid var(--verd2)";
    header.innerHTML = `
      <button class="mapa-back-btn" onclick="trivialSortir()">\u2190 Sortir</button>
      <div class="trivial-torn-jugador">
        <img src="${imgSrc}" alt="${jugadorActualNom}" style="${imgStyle}">
        <span>${jugadorActualNom}</span>
      </div>`;
  }

  // Si no hi ha torn actiu (o esperant), però totes les categories estan bloquejades → prova final pendent
  if (!tornActual || tornActual.estat === "esperant") {
    const categoriesBloquejades = jugadorData?.categoriesBloquejades || [];
    if (categoriesBloquejades.length >= TRIVIAL_CATS.length) {
      trivialIniciarProvaFinal();
      return;
    }
    trivialRenderSeleccioCategoria(jugadorData);
    return;
  }

  // Si hi ha pregunta activa
  if (tornActual.estat === "pregunta") {
    trivialRenderPregunta(tornActual, jugadorData);
    return;
  }

  // Si el torn ha acabat
  if (tornActual.estat === "acabat") {
    trivialRenderFinalTorn(tornActual, jugadorData);
    return;
  }
}

function trivialRenderSeleccioCategoria(jugadorData, missatgeBonus) {
  const cont = document.getElementById("trivial-torn-cont");
  if (!cont) return;

  const encertsTorn = jugadorData?.tornActual?.encerts || 0;
  const categoriesUsadesTorn = jugadorData?.tornActual?.categoriesUsades || [];
  const categoriesBloquejades = jugadorData?.categoriesBloquejades || [];

  cont.innerHTML = `
    <div class="trivial-selcat-wrap">
      ${missatgeBonus ? `<div class="trivial-final-torn-bonus" style="margin-bottom:.75rem;text-align:center">${missatgeBonus}</div>` : ""}
      <div class="trivial-selcat-info">
        ${
          encertsTorn > 0
            ? `<div class="trivial-encerts-torn">✅ ${encertsTorn} encert${encertsTorn > 1 ? "s" : ""} en aquest torn</div>`
            : '<div class="trivial-selcat-hint">Escull una categoria per la teva pregunta</div>'
        }
      </div>
      <div class="trivial-cats-grid">
        ${TRIVIAL_CATS.map((cat) => {
          const info = TRIVIAL_CATEGORIES[cat];
          const encerts = jugadorData?.categories[cat] || 0;
          const bloquejada = categoriesBloquejades.includes(cat);
          const usadaTorn = categoriesUsadesTorn.includes(cat);
          const disabled = bloquejada || usadaTorn;
          return `
            <button class="trivial-cat-btn ${disabled ? "disabled" : ""} ${bloquejada ? "bloquejada" : ""}"
                    style="--cat-color: ${info.color}"
                    onclick="${disabled ? "" : `trivialEscollirCategoria('${cat}')`}"
                    ${disabled ? "disabled" : ""}>
              <span class="trivial-cat-emoji">${info.emoji}</span>
              <span class="trivial-cat-nom">${info.label}</span>
              <div class="trivial-cat-encerts">
                ${[0, 1, 2].map((i) => `<span class="trivial-enc-dot ${i < encerts ? "ple" : ""}" style="background:${i < encerts ? info.color : "transparent"}"></span>`).join("")}
              </div>
              ${bloquejada ? '<span class="trivial-cat-bloq">✓ Completada</span>' : ""}
              ${usadaTorn ? '<span class="trivial-cat-usada">Ja usada</span>' : ""}
            </button>`;
        }).join("")}
      </div>
    </div>`;

  trivialIniciarCronometre();
}

function trivialRenderPregunta(tornActual, jugadorData) {
  const cont = document.getElementById("trivial-torn-cont");
  if (!cont || !trivialPreguntaActual) return;

  const p = trivialPreguntaActual;
  const info = TRIVIAL_CATEGORIES[tornActual.categoriaActual];

  cont.innerHTML = `
    <div class="trivial-pregunta-wrap">
      <div class="trivial-pregunta-cat" style="background:${info.color}20;border-color:${info.color}">
        ${info.emoji} ${info.label}
      </div>
      <div class="trivial-pregunta-text">${p.p}</div>
      <div class="trivial-opcions" id="trivial-opcions">
        ${p.o
          .map(
            (opcio, i) => `
          <button class="trivial-opcio" id="trivial-opcio-${i}" onclick="trivialRespondr(${i})">
            <span class="trivial-opcio-lletra">${["A", "B", "C", "D"][i]}</span>
            <span>${opcio}</span>
          </button>`,
          )
          .join("")}
      </div>
    </div>`;

  trivialRespost = false;
}

function trivialRenderFinalTorn(tornActual, jugadorData) {
  const cont = document.getElementById("trivial-torn-cont");
  if (!cont) return;

  const encerts = tornActual.encerts || 0;
  const bonus50 = tornActual.bonus50 || false;
  cont.innerHTML = `
    <div class="trivial-final-torn">
      <div class="trivial-final-torn-icon">${bonus50 ? "🏅" : encerts === 3 ? "🏆" : encerts > 0 ? "👍" : "😅"}</div>
      <div class="trivial-final-torn-text">
        ${bonus50 ? "Categoria completada!" : encerts === 3 ? "Excel·lent! 3 encerts seguits!" : encerts > 0 ? `${encerts} encert${encerts > 1 ? "s" : ""} en aquest torn` : "Cap encert en aquest torn"}
      </div>
      ${bonus50 ? '<div class="trivial-final-torn-bonus">+50 pts per completar la categoria! 🏅</div>' : ""}
      ${encerts === 3 && !bonus50 ? '<div class="trivial-final-torn-bonus">+10 pts bonus per 3 encerts seguits! 🎯</div>' : ""}
      <button class="trivial-btn-jugar" onclick="trivialPassarTorn()">Passar torn →</button>
    </div>`;
}

// ── ESCOLLIR CATEGORIA ────────────────────────────────────────
async function trivialEscollirCategoria(cat) {
  if (!trivialPartida) return;

  const docId =
    trivialModalitat === "individual" ? TRIVIAL_IND_DOC : TRIVIAL_EQ_DOC;
  const jugadorNom = trivialGetJugadorActualNom(trivialPartida);
  const jugadorData = trivialGetJugadorData(trivialPartida, jugadorNom);

  // Selecciona pregunta aleatòria de la categoria
  const excloses = jugadorData.preguntesVistes || [];
  const preguntes = trivialGetPreguntes(cat, "mitjana", excloses);
  if (!preguntes.length) return;

  trivialPreguntaActual = preguntes[0];
  trivialAturarCronometre();

  // Actualitza estat
  const nouTorn = {
    estat: "pregunta",
    categoriaActual: cat,
    categoriesUsades: [
      ...(jugadorData.tornActual?.categoriesUsades || []),
      cat,
    ],
    encerts: jugadorData.tornActual?.encerts || 0,
    preguntaId: trivialPreguntaActual.id,
    ts: Date.now(),
  };

  try {
    await trivialGetDb()
      .collection(TRIVIAL_COL)
      .doc(docId)
      .update({
        [`jugadors`]: trivialPartida.jugadors.map((j) =>
          j.nom === jugadorNom ? { ...j, tornActual: nouTorn } : j,
        ),
      });
    trivialRenderPregunta(nouTorn, jugadorData);
  } catch (e) {
    console.error("Error escollint categoria:", e);
  }
}

// ── RESPONDRE ─────────────────────────────────────────────────
async function trivialRespondr(idx) {
  if (trivialRespost || !trivialPreguntaActual || !trivialPartida) return;
  trivialRespost = true;

  const correcta = trivialPreguntaActual.c;
  const encertat = idx === correcta;

  // Anima les opcions
  document
    .querySelectorAll(".trivial-opcio")
    .forEach((b) => b.classList.add("disabled"));
  document
    .getElementById(`trivial-opcio-${idx}`)
    ?.classList.add(encertat ? "correcta" : "incorrecta");
  if (!encertat)
    document
      .getElementById(`trivial-opcio-${correcta}`)
      ?.classList.add("correcta");

  await new Promise((r) => setTimeout(r, 1200));

  const docId =
    trivialModalitat === "individual" ? TRIVIAL_IND_DOC : TRIVIAL_EQ_DOC;
  const jugadorNom = trivialGetJugadorActualNom(trivialPartida);
  const jugadorIdx = trivialPartida.jugadors.findIndex(
    (j) => j.nom === jugadorNom,
  );
  const jugadorData = { ...trivialPartida.jugadors[jugadorIdx] };

  // Afegeix pregunta a vistes
  jugadorData.preguntesVistes = [
    ...(jugadorData.preguntesVistes || []),
    trivialPreguntaActual.id,
  ];

  const tornActual = { ...jugadorData.tornActual };

  if (encertat) {
    tornActual.encerts = (tornActual.encerts || 0) + 1;
    jugadorData.categories = { ...jugadorData.categories };
    jugadorData.categories[tornActual.categoriaActual] =
      (jugadorData.categories[tornActual.categoriaActual] || 0) + 1;

    // ── CAS 1: Bloqueig de categoria (3 encerts acumulats en aquesta categoria) ──
    if (
      jugadorData.categories[tornActual.categoriaActual] >=
      TRIVIAL_ENCERTS_BLOQUEIG
    ) {
      // Afegeix la categoria a la llista de bloquejades i suma 50 pts
      jugadorData.categoriesBloquejades = [
        ...(jugadorData.categoriesBloquejades || []),
        tornActual.categoriaActual,
      ];
      const nousjugadors50 = trivialSumarPuntsEquip(
        [...trivialPartida.jugadors],
        jugadorIdx,
        TRIVIAL_PUNTS_CATEGORIA,
      );
      jugadorData.punts = nousjugadors50[jugadorIdx].punts;
      if (nousjugadors50[jugadorIdx].ptsMembres !== undefined)
        jugadorData.ptsMembres = nousjugadors50[jugadorIdx].ptsMembres;

      // Subcas 1a: totes les categories bloquejades → prova final
      // (independentment de si era la pregunta 1, 2 o 3 del torn)
      if (jugadorData.categoriesBloquejades.length >= TRIVIAL_CATS.length) {
        tornActual.estat = "prova-final";
        jugadorData.tornActual = tornActual;
        const nousjugadors = trivialPartida.jugadors.map((j, i) =>
          i === jugadorIdx ? jugadorData : j,
        );
        await trivialGetDb()
          .collection(TRIVIAL_COL)
          .doc(docId)
          .update({ jugadors: nousjugadors });
        trivialIniciarProvaFinal();
        return;
      }

      // Subcas 1b: no és prova final → continua si encara queden preguntes al torn,
      // acaba si ja era la pregunta 3
      if (tornActual.encerts >= TRIVIAL_MAX_ENCERTS_TORN) {
        tornActual.estat = "acabat";
        tornActual.bonus50 = true;
      } else {
        tornActual.estat = "esperant";
      }
      jugadorData.tornActual = tornActual;
      const nousjugadorsBloc = trivialPartida.jugadors.map((j, i) =>
        i === jugadorIdx ? jugadorData : j,
      );
      try {
        await trivialGetDb()
          .collection(TRIVIAL_COL)
          .doc(docId)
          .update({ jugadors: nousjugadorsBloc });
        if (tornActual.estat === "esperant") {
          trivialRenderSeleccioCategoria(jugadorData, "🏅 Categoria completada! +50 pts");
        } else {
          trivialRenderFinalTorn(tornActual, jugadorData);
        }
      } catch (e) {
        console.error("Error bloquejant categoria:", e);
      }
      return;
    }

    // ── CAS 2: 3 encerts seguits al torn (sense bloqueig de categoria) → +10 pts bonus ──
    if (tornActual.encerts >= TRIVIAL_MAX_ENCERTS_TORN) {
      const nousjugadors10 = trivialSumarPuntsEquip(
        [...trivialPartida.jugadors],
        jugadorIdx,
        10,
      );
      jugadorData.punts = nousjugadors10[jugadorIdx].punts;
      if (nousjugadors10[jugadorIdx].ptsMembres !== undefined)
        jugadorData.ptsMembres = nousjugadors10[jugadorIdx].ptsMembres;
      tornActual.estat = "acabat";
      jugadorData.tornActual = tornActual;
      const nousjugadors = trivialPartida.jugadors.map((j, i) =>
        i === jugadorIdx ? jugadorData : j,
      );
      await trivialGetDb()
        .collection(TRIVIAL_COL)
        .doc(docId)
        .update({ jugadors: nousjugadors });
      trivialRenderFinalTorn(tornActual, jugadorData);
      return;
    }

    // ── CAS 3: Encert normal, continua el torn ──
    tornActual.estat = "esperant";
    jugadorData.tornActual = tornActual;
  } else {
    // Falla → torn acaba
    tornActual.estat = "acabat";
    jugadorData.tornActual = tornActual;
  }

  const nousjugadors = trivialPartida.jugadors.map((j, i) =>
    i === jugadorIdx ? jugadorData : j,
  );
  try {
    await trivialGetDb()
      .collection(TRIVIAL_COL)
      .doc(docId)
      .update({ jugadors: nousjugadors });
    if (tornActual.estat === "esperant") {
      trivialRenderSeleccioCategoria(jugadorData);
    } else {
      trivialRenderFinalTorn(tornActual, jugadorData);
    }
  } catch (e) {
    console.error("Error responent:", e);
  }
}

// ── PASSAR TORN ───────────────────────────────────────────────
async function trivialPassarTorn() {
  if (!trivialPartida) return;

  const docId =
    trivialModalitat === "individual" ? TRIVIAL_IND_DOC : TRIVIAL_EQ_DOC;
  const jugadorNom = trivialGetJugadorActualNom(trivialPartida);
  const jugadorIdx = trivialPartida.jugadors.findIndex(
    (j) => j.nom === jugadorNom,
  );

  // Reset torn del jugador actual
  const jugadorData = {
    ...trivialPartida.jugadors[jugadorIdx],
    tornActual: null,
  };

  // Avança torn
  const nouTornIdx = (trivialPartida.tornIdx + 1) % trivialPartida.ordre.length;
  const novaRonda =
    nouTornIdx === 0 ? (trivialPartida.ronda || 1) + 1 : trivialPartida.ronda;

  const nousjugadors = trivialPartida.jugadors.map((j, i) =>
    i === jugadorIdx ? jugadorData : j,
  );

  try {
    await trivialGetDb().collection(TRIVIAL_COL).doc(docId).update({
      jugadors: nousjugadors,
      tornIdx: nouTornIdx,
      ronda: novaRonda,
      tornTs: Date.now(),
    });
    trivialAturarCronometre();
    mostraScreen("trivial-inici");
    trivialCarregarInici();
  } catch (e) {
    console.error("Error passant torn:", e);
  }
}

// ── PROVA FINAL ───────────────────────────────────────────────
function trivialIniciarProvaFinal() {
  const jugadorNom = trivialGetJugadorActualNom(trivialPartida);
  const jugadorData = trivialGetJugadorData(trivialPartida, jugadorNom);
  const excloses = jugadorData.preguntesVistes || [];

  // Genera 7 mitjanes + 5 altes
  const preguntes = trivialGetPreguntaFinal(excloses);

  mostraScreen("trivial-prova-final");
  trivialRenderProvaFinal(preguntes, jugadorNom);
}

function trivialRenderProvaFinal(preguntes, jugadorNom) {
  const cont = document.getElementById("trivial-prova-final-cont");
  if (!cont) return;

  let preguntaIdx = 0;
  let encertsFinal = 0;
  const respostes = [];

  const renderPreguntaFinal = () => {
    if (preguntaIdx >= preguntes.length) {
      trivialFinalitzarProvaFinal(encertsFinal, respostes);
      return;
    }

    const p = preguntes[preguntaIdx];
    const info = TRIVIAL_CATEGORIES[p.cat];
    const esDificil = p.dif === "alta";

    cont.innerHTML = `
      <div class="trivial-final-header">
        <div class="trivial-final-prog">${preguntaIdx + 1} / ${preguntes.length}</div>
        <div class="trivial-final-encerts">✅ ${encertsFinal} encerts</div>
        ${esDificil ? '<div class="trivial-final-difbadge">🔥 Difícil</div>' : ""}
      </div>
      <div class="trivial-pregunta-cat" style="background:${info.color}20;border-color:${info.color}">
        ${info.emoji} ${info.label}
      </div>
      <div class="trivial-pregunta-text">${p.p}</div>
      <div class="trivial-opcions" id="trivial-opcions-final">
        ${p.o
          .map(
            (opcio, i) => `
          <button class="trivial-opcio" id="trivial-opcio-f-${i}" onclick="trivialRespondreProvaFinal(${i}, ${p.c}, ${preguntaIdx})">
            <span class="trivial-opcio-lletra">${["A", "B", "C", "D"][i]}</span>
            <span>${opcio}</span>
          </button>`,
          )
          .join("")}
      </div>`;

    // Posa les funcions al scope
    window.trivialRespondreProvaFinal = async (idx, correcta, pIdx) => {
      const encertat = idx === correcta;
      document
        .querySelectorAll(".trivial-opcio")
        .forEach((b) => b.classList.add("disabled"));
      document
        .getElementById(`trivial-opcio-f-${idx}`)
        ?.classList.add(encertat ? "correcta" : "incorrecta");
      if (!encertat)
        document
          .getElementById(`trivial-opcio-f-${correcta}`)
          ?.classList.add("correcta");
      if (encertat) encertsFinal++;
      respostes.push({ id: p.id, encertat });
      await new Promise((r) => setTimeout(r, 800));
      preguntaIdx++;
      renderPreguntaFinal();
    };
  };

  renderPreguntaFinal();
}

// ── SUMAR PUNTS (reparteix entre membres si equips) ───────────
function trivialSumarPuntsEquip(jugadors, jugadorIdx, pts) {
  const jugadorData = jugadors[jugadorIdx];
  const membres = jugadorData.membres;
  if (!membres || membres.length === 0) {
    // Individual: punts directes
    jugadors[jugadorIdx] = {
      ...jugadorData,
      punts: (jugadorData.punts || 0) + pts,
    };
  } else {
    // Equips: reparteix entre membres (arrodonit a l'enter)
    const ptsMembre = Math.round(pts / membres.length);
    jugadors[jugadorIdx] = {
      ...jugadorData,
      punts: (jugadorData.punts || 0) + pts,
    };
    // Guarda també els punts individuals per al rànquing global
    const ptsMembres = jugadorData.ptsMembres || {};
    membres.forEach((nom) => {
      ptsMembres[nom] = (ptsMembres[nom] || 0) + ptsMembre;
    });
    jugadors[jugadorIdx] = { ...jugadors[jugadorIdx], ptsMembres };
  }
  return jugadors;
}

async function trivialFinalitzarProvaFinal(encerts, respostes) {
  const docId =
    trivialModalitat === "individual" ? TRIVIAL_IND_DOC : TRIVIAL_EQ_DOC;
  const jugadorNom = trivialGetJugadorActualNom(trivialPartida);
  const jugadorIdx = trivialPartida.jugadors.findIndex(
    (j) => j.nom === jugadorNom,
  );
  const jugadorData = { ...trivialPartida.jugadors[jugadorIdx] };

  const superat = encerts >= TRIVIAL_FINAL_MIN_ENCERTS;
  let ptsGuanyats = 0;

  if (superat) {
    ptsGuanyats = TRIVIAL_PUNTS_FINAL_OK;
  } else {
    ptsGuanyats = encerts * TRIVIAL_PUNTS_FINAL_PT;
  }
  const nousjugadorsFinal = trivialSumarPuntsEquip(
    [...trivialPartida.jugadors],
    jugadorIdx,
    ptsGuanyats,
  );
  jugadorData.punts = nousjugadorsFinal[jugadorIdx].punts;
  if (nousjugadorsFinal[jugadorIdx].ptsMembres !== undefined)
    jugadorData.ptsMembres = nousjugadorsFinal[jugadorIdx].ptsMembres;

  jugadorData.preguntesVistes = [
    ...(jugadorData.preguntesVistes || []),
    ...respostes.map((r) => r.id),
  ];
  jugadorData.tornActual = null;

  const nousjugadors = trivialPartida.jugadors.map((j, i) =>
    i === jugadorIdx ? jugadorData : j,
  );

  const update = {
    jugadors: nousjugadors,
    tornIdx: (trivialPartida.tornIdx + 1) % trivialPartida.ordre.length,
  };

  if (superat) {
    update.acabada = true;
    update.guanyador = jugadorNom;
  }

  try {
    await trivialGetDb().collection(TRIVIAL_COL).doc(docId).update(update);

    // Mostra resultat prova final
    trivialRenderResultatFinal(encerts, ptsGuanyats, superat, jugadorNom);
  } catch (e) {
    console.error("Error finalitzant prova final:", e);
  }
}

function trivialRenderResultatFinal(encerts, pts, superat, jugadorNom) {
  const cont = document.getElementById("trivial-prova-final-cont");
  if (!cont) return;

  cont.innerHTML = `
    <div class="trivial-resultat-final">
      <div class="trivial-resultat-icon">${superat ? "🏆" : "😅"}</div>
      <div class="trivial-resultat-titol">
        ${superat ? "¡TRIVIAL GUANYAT!" : "Bona prova!"}
      </div>
      <div class="trivial-resultat-encerts">${encerts}/${TRIVIAL_FINAL_PREGUNTES} encerts</div>
      <div class="trivial-resultat-pts">+${pts} punts</div>
      ${
        superat
          ? `<div class="trivial-resultat-msg">${jugadorNom} ha guanyat la partida!</div>`
          : `<div class="trivial-resultat-msg">Necessitaves ${TRIVIAL_FINAL_MIN_ENCERTS} encerts. La partida continua!</div>`
      }
      <button class="trivial-btn-jugar" onclick="trivialTornarInici()">Tornar a l'inici</button>
    </div>`;
}

// ── VEURE PARTIDA (observador) ─────────────────────────────────
function trivialRenderVeure() {
  if (!trivialPartida) return;
  const cont = document.getElementById("trivial-veure-cont");
  if (!cont) return;

  const jugadors = trivialPartida.jugadors || [];
  const jugadorActualNom = trivialGetJugadorActualNom(trivialPartida);

  cont.innerHTML = `
    <div class="trivial-veure-torn">
      Torn de: <strong>${jugadorActualNom}</strong>
      <div class="trivial-cronome-veure" id="trivial-cronome-veure"></div>
    </div>
    <div class="trivial-ranking-complet">
      ${[...jugadors]
        .sort((a, b) => b.punts - a.punts)
        .map((j, i) => {
          const catsHtml = TRIVIAL_CATS.map(cat => {
            const info = TRIVIAL_CATEGORIES[cat];
            const encerts = j.categories?.[cat] || 0;
            const bloq = (j.categoriesBloquejades || []).includes(cat);
            const dots = [0, 1, 2].map(n => {
              const ple = n < encerts;
              return `<span class="trivial-enc-dot ${ple ? 'ple' : ''}" style="${ple ? `background:${info.color}` : `border:1.5px solid ${info.color}40`}"></span>`;
            }).join('');
            return `
              <div class="trivial-cat-bloc">
                <span class="trivial-cat-icona ${bloq ? 'bloq' : ''}" style="background:${bloq ? info.color : info.color + '25'}" title="${info.label}">${info.emoji}</span>
                <div class="trivial-enc-dots">${dots}</div>
              </div>`;
          }).join('');

          return `
        <div class="trivial-rank-item ${j.nom === jugadorActualNom ? "actiu" : ""}">
          <span class="trivial-rank-pos">${["🥇", "🥈", "🥉"][i] || i + 1}</span>
          <img src="${j.animal ? `img/animals/${j.animal}.svg` : IMGS[j.nom] || ""}" alt="${j.nom}">
          <div class="trivial-rank-info">
            <div class="trivial-rank-nom">${j.nom}${j.membres ? `<span style="font-size:.72rem;color:var(--text2);font-weight:400"> · ${j.membres.join(", ")}</span>` : ""}</div>
            <div class="trivial-rank-cats-blocs">${catsHtml}</div>
          </div>
          <div class="trivial-rank-punts">${j.punts} pts</div>
        </div>`;
        })
        .join("")}
    </div>`;
}

// ── ADMINISTRACIÓ ─────────────────────────────────────────────
async function trivialAdminPartida(modalitat) {
  const pin = prompt("PIN d'administrador:");
  if (pin !== "2468") {
    if (pin !== null) alert("PIN incorrecte.");
    return;
  }

  const opcio = prompt(
    "Opcions:\n1 - Fer perdre el torn al jugador actual\n2 - Reiniciar partida\nEscriu 1 o 2:",
  );
  if (opcio === "1") {
    trivialModalitat = modalitat;
    const docId = modalitat === "individual" ? TRIVIAL_IND_DOC : TRIVIAL_EQ_DOC;
    const snap = await trivialGetDb().collection(TRIVIAL_COL).doc(docId).get();
    if (!snap.exists) return;
    trivialPartida = snap.data();
    await trivialPassarTorn();
    alert("Torn passat.");
  } else if (opcio === "2") {
    if (confirm("Segur que vols reiniciar la partida?")) {
      const docId =
        modalitat === "individual" ? TRIVIAL_IND_DOC : TRIVIAL_EQ_DOC;
      await trivialGetDb().collection(TRIVIAL_COL).doc(docId).delete();
      trivialCarregarInici();
    }
  }
}

// ── CRONÒMETRE ────────────────────────────────────────────────
let trivialCronometreSegs = TRIVIAL_CRONOME_SEGS;

function trivialIniciarCronometre() {
  trivialAturarCronometre();
  trivialCronometreSegs = TRIVIAL_CRONOME_SEGS;
  trivialCronometreInterval = setInterval(() => {
    trivialCronometreSegs--;
    const min = Math.floor(trivialCronometreSegs / 60);
    const seg = trivialCronometreSegs % 60;
    const txt = `${min}:${seg.toString().padStart(2, "0")}`;
    const el = document.getElementById("trivial-cronome");
    if (el) {
      el.textContent = txt;
      el.className = `trivial-cronome ${trivialCronometreSegs < 30 ? "urgent" : ""}`;
    }
    if (trivialCronometreSegs <= 0) trivialAturarCronometre();
  }, 1000);
}

function trivialAturarCronometre() {
  if (trivialCronometreInterval) {
    clearInterval(trivialCronometreInterval);
    trivialCronometreInterval = null;
  }
}

// ── BANNER TORN A INDEX.HTML ──────────────────────────────────
async function trivialComprovarTornIndex() {
  if (!jugadorActiu) return;
  try {
    const db = trivialGetDb();
    const [snapInd, snapEq] = await Promise.all([
      db.collection(TRIVIAL_COL).doc(TRIVIAL_IND_DOC).get(),
      db.collection(TRIVIAL_COL).doc(TRIVIAL_EQ_DOC).get(),
    ]);

    let missatge = null;
    let modalitat = null;

    if (snapInd.exists) {
      const p = snapInd.data();
      if (p.activa && !p.acabada && trivialEsTocaJugadorActiu(p)) {
        missatge = "És el teu torn al Trivial Individual!";
        modalitat = "individual";
      }
    }
    if (!missatge && snapEq.exists) {
      const p = snapEq.data();
      if (p.activa && !p.acabada && trivialEsTocaJugadorActiuEquips(p)) {
        missatge = "És el teu torn al Trivial per Equips!";
        modalitat = "equips";
      }
    }

    const banner = document.getElementById("trivial-torn-banner");
    if (banner) {
      if (missatge) {
        banner.style.display = "flex";
        banner.querySelector(".trivial-banner-text").textContent = missatge;
        banner.querySelector(".trivial-banner-btn").onclick = () => {
          window.location.href = `jocs.html?trivial=${modalitat}`;
        };
      } else {
        banner.style.display = "none";
      }
    }
  } catch (e) {
    console.error("Error comprovant torn:", e);
  }
}

// ── UTILS ─────────────────────────────────────────────────────
function trivialGetJugadorActualNom(p) {
  if (!p || !p.ordre) return "";
  return p.ordre[p.tornIdx % p.ordre.length];
}

function trivialGetJugadorData(p, nom) {
  return p?.jugadors?.find((j) => j.nom === nom) || null;
}

function trivialEsTocaJugadorActiu(p) {
  if (!p || !jugadorActiu) return false;
  return trivialGetJugadorActualNom(p) === jugadorActiu;
}

function trivialEsTocaJugadorActiuEquips(p) {
  if (!p || !jugadorActiu) return false;
  const nomEquip = trivialGetJugadorActualNom(p);
  const equip = p.equips?.find((e) => e.nom === nomEquip);
  return equip?.membres?.includes(jugadorActiu) || false;
}

function trivialSortir() {
  trivialAturarCronometre();
  if (trivialUnsubscribe) {
    trivialUnsubscribe();
    trivialUnsubscribe = null;
  }
  mostraScreen("trivial-inici");
  trivialCarregarInici();
}

function trivialTornarInici() {
  trivialAturarCronometre();
  if (trivialUnsubscribe) {
    trivialUnsubscribe();
    trivialUnsubscribe = null;
  }
  mostraScreen("joc-selector");
}
