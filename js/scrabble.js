// ══════════════════════════════════════════════════════════════
//  SCRABBLE AÇORES — Motor del joc · Firebase Firestore
// ══════════════════════════════════════════════════════════════

// ── FIREBASE ──────────────────────────────────────────────────
let _scrabbleDb = null;
function scrabbleGetDb() {
  if (_scrabbleDb) return _scrabbleDb;
  if (!firebase.apps.length) firebase.initializeApp(CONFIG.FIREBASE);
  _scrabbleDb = firebase.firestore();
  return _scrabbleDb;
}

const SC_COL = "scrabble_partides";
const SC_IND_DOC = "individual";
const SC_EQ_DOC = "equips";
const SC_STORAGE = "scrabble_ma_"; // + nom → fitxes a la mà (localStorage, privat)

// ── CONSTANTS ─────────────────────────────────────────────────
const SC_ORDRE_JUGADORS = ["Anna", "Jordi", "Mons", "Xu", "Laia", "Joa"];
const SC_MIDA = 15; // tauler 15×15
const SC_MA_FITXES = 7; // fitxes a la mà

// Caselles especials del tauler clàssic
// TP=triple paraula, DP=doble paraula, TL=triple lletra, DL=doble lletra, CE=centre
const SC_CASELLES = (() => {
  const m = {};
  const set = (r, c, t) => {
    m[`${r},${c}`] = t;
  };

  // Triple paraula (TP) — cantonades i centres dels costats
  [
    [0, 0],
    [0, 7],
    [0, 14],
    [7, 0],
    [7, 14],
    [14, 0],
    [14, 7],
    [14, 14],
  ].forEach(([r, c]) => set(r, c, "TP"));

  // Doble paraula (DP) — diagonals interiors
  [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [10, 10],
    [11, 11],
    [12, 12],
    [13, 13],
    [1, 13],
    [2, 12],
    [3, 11],
    [4, 10],
    [10, 4],
    [11, 3],
    [12, 2],
    [13, 1],
    [7, 7],
  ].forEach(([r, c]) => set(r, c, "DP"));

  // Triple lletra (TL)
  [
    [1, 5],
    [1, 9],
    [5, 1],
    [5, 5],
    [5, 9],
    [5, 13],
    [9, 1],
    [9, 5],
    [9, 9],
    [9, 13],
    [13, 5],
    [13, 9],
  ].forEach(([r, c]) => set(r, c, "TL"));

  // Doble lletra (DL)
  [
    [0, 3],
    [0, 11],
    [2, 6],
    [2, 8],
    [3, 0],
    [3, 7],
    [3, 14],
    [6, 2],
    [6, 6],
    [6, 8],
    [6, 12],
    [7, 3],
    [7, 11],
    [8, 2],
    [8, 6],
    [8, 8],
    [8, 12],
    [11, 0],
    [11, 7],
    [11, 14],
    [12, 6],
    [12, 8],
    [14, 3],
    [14, 11],
  ].forEach(([r, c]) => set(r, c, "DL"));

  return m;
})();

// Colors per a les caselles
const SC_COLORS = {
  TP: { bg: "#7b1d1d", text: "#ffaaaa", label: "3×P" },
  DP: { bg: "#5a1a3a", text: "#ffaacc", label: "2×P" },
  TL: { bg: "#1a3a5a", text: "#aaccff", label: "3×L" },
  DL: { bg: "#1a4a2a", text: "#aaffcc", label: "2×L" },
};

// ── ESTAT LOCAL ───────────────────────────────────────────────
let scPartida = null;
let scModalitat = null; // 'individual' | 'equips'
let scUnsubscribe = null;

// Estat del torn actiu (UI)
let scFitxesJugades = []; // [{r,c,lletra,punts,comodin}] — jugades actuals
let scFitxaSeleccionada = null; // {lletra,punts,comodin,idx} — fitxa seleccionada de la mà
let scMaActual = []; // array de {lletra,punts,comodin} — mà del jugador actiu
let scFitxesCanvi = []; // fitxes marcades per canviar

// Validació pendent
let scValidacioPendent = null; // {paraules, punts, torn} — esperant confirmació adversari

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarScrabble() {
  scModalitat = null;
  scPartida = null;
  mostraScreen("scrabble-inici");
  scCarregarInici();
}

// Normalitza les dades llegides de Firestore (converteix tauler pla → array 2D)
function scNormalitzarPartida(data) {
  if (!data) return null;
  return { ...data, tauler: scTaulerFromFirestore(data.tauler) };
}

async function scCarregarInici() {
  const cont = document.getElementById("scrabble-inici-cont");
  if (cont)
    cont.innerHTML =
      '<div style="padding:2rem;text-align:center;color:var(--text2)">Carregant…</div>';
  try {
    const db = scrabbleGetDb();
    const [snapInd, snapEq] = await Promise.all([
      db.collection(SC_COL).doc(SC_IND_DOC).get(),
      db.collection(SC_COL).doc(SC_EQ_DOC).get(),
    ]);
    scRenderInici(
      snapInd.exists ? scNormalitzarPartida(snapInd.data()) : null,
      snapEq.exists ? scNormalitzarPartida(snapEq.data()) : null,
    );
  } catch (e) {
    console.error("Error carregant Scrabble:", e);
    if (cont)
      cont.innerHTML = `<div style="padding:2rem;text-align:center;color:var(--error)">Error de connexió: ${e.message}</div>`;
  }
}

// ── PANTALLA INICI ────────────────────────────────────────────
function scRenderInici(partidaInd, partidaEq) {
  const cont = document.getElementById("scrabble-inici-cont");
  if (!cont) return;

  const renderCard = (p, modalitat) => {
    if (!p || !p.activa) {
      return `
        <div class="trivial-partida-card inactiva">
          <div class="trivial-partida-icon">${modalitat === "individual" ? "👤" : "👥"}</div>
          <div class="trivial-partida-nom">${modalitat === "individual" ? "Individual" : "Per equips"}</div>
          <div class="trivial-partida-estat">Cap partida activa</div>
          <button class="trivial-btn-nova" onclick="scNovaPartida('${modalitat}')">Nova partida</button>
        </div>`;
    }

    const jugadorNom = scGetJugadorActualNom(p);
    const esMeuTorn = scEsTocaJugadorActiu(p, modalitat);
    const validPendent = p.validacioPendent && scEsValidador(p, modalitat);

    return `
      <div class="trivial-partida-card activa ${esMeuTorn || validPendent ? "es-torn" : ""}">
        <div class="trivial-partida-icon">${modalitat === "individual" ? "👤" : "👥"}</div>
        <div class="trivial-partida-nom">${modalitat === "individual" ? "Individual" : "Per equips"}</div>
        ${esMeuTorn ? `<div class="trivial-torn-badge">🎯 És el teu torn!</div>` : ""}
        ${validPendent ? `<div class="trivial-torn-badge" style="background:rgba(224,85,85,.15);border-color:var(--error);color:#ff8a8a">⚖️ Cal validar una jugada!</div>` : ""}
        <div class="trivial-partida-torn">Torn de: <strong>${jugadorNom}</strong></div>
        <div class="trivial-partida-ronda">Ronda ${p.ronda || 1}</div>
        <div class="trivial-ranking-mini" id="sc-rank-${modalitat}"></div>
        <div class="trivial-partida-btns">
          ${
            esMeuTorn || validPendent
              ? `<button class="trivial-btn-jugar" onclick="scEntrarPartida('${modalitat}')">
                ${validPendent ? "Validar jugada →" : "Jugar el meu torn →"}
               </button>`
              : `<button class="trivial-btn-veure" onclick="scVeurePartida('${modalitat}')">Veure partida</button>`
          }
          <button class="trivial-btn-admin" onclick="scAdminPartida('${modalitat}')">⚙️</button>
        </div>
      </div>`;
  };

  cont.innerHTML = `
    <div class="trivial-inici-layout">
      <div class="trivial-inici-cards-wrap">
        <div class="trivial-inici-titol-wrap">
          <span class="trivial-inici-titol-emoji">⌛</span>
          <span class="trivial-inici-titol-inline">Scrabble Açores</span>
        </div>
        <div class="trivial-partides-grid">
          ${renderCard(partidaInd, "individual")}
          ${renderCard(partidaEq, "equips")}
        </div>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏆 Rànquing Scrabble</div>
        <div class="ranking-list-home" id="sc-ranking-global-list">
          <div class="ranking-loading">Carregant…</div>
        </div>
      </div>
    </div>`;

  if (partidaInd?.activa) scRenderRankingMini(partidaInd, "individual");
  if (partidaEq?.activa) scRenderRankingMini(partidaEq, "equips");
  scRenderRankingGlobal();
}

function scRenderRankingMini(p, modalitat) {
  const el = document.getElementById(`sc-rank-${modalitat}`);
  if (!el) return;
  const jugadors = [...(p.jugadors || [])].sort((a, b) => b.punts - a.punts);
  el.innerHTML = jugadors
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

async function scRenderRankingGlobal() {
  const el = document.getElementById("sc-ranking-global-list");
  if (!el) return;
  try {
    const pts = await scGetPuntsGlobals();
    const llista = SC_ORDRE_JUGADORS.map((nom) => ({
      nom,
      punts: pts[nom] || 0,
    })).sort((a, b) => b.punts - a.punts);
    const maxPts = llista[0]?.punts || 1;
    const posEmoji = ["🥇", "🥈", "🥉"];
    el.innerHTML = llista
      .map(
        (r, i) => `
      <div class="ranking-item ${r.nom === jugadorActiu ? "actiu" : ""}">
        <div class="ranking-pos ${i < 3 ? "p" + (i + 1) : "other"}">${i < 3 ? posEmoji[i] : i + 1}</div>
        <img class="rank-avatar" src="${IMGS[r.nom] || ""}" alt="${r.nom}">
        <div class="rank-info">
          <div class="rank-nom">${r.nom}</div>
          <div class="rank-barra-wrap"><div class="rank-barra" style="width:${Math.round((r.punts / maxPts) * 100)}%"></div></div>
        </div>
        <div class="rank-punts">${r.punts}</div>
      </div>`,
      )
      .join("");
  } catch (e) {
    if (el)
      el.innerHTML = '<div class="ranking-loading">Error carregant…</div>';
  }
}

// Funció global per al rànquing de jocs.js (Firebase)
async function scrabbleGetPuntsGlobals() {
  return scGetPuntsGlobals();
}

async function scGetPuntsGlobals() {
  const pts = {};
  SC_ORDRE_JUGADORS.forEach((nom) => {
    pts[nom] = 0;
  });
  try {
    const db = scrabbleGetDb();
    const [snapInd, snapEq] = await Promise.all([
      db.collection(SC_COL).doc(SC_IND_DOC).get(),
      db.collection(SC_COL).doc(SC_EQ_DOC).get(),
    ]);
    // Suma punts de partides acabades guardades a historial
    const sumarHistorial = (snap) => {
      if (!snap.exists) return;
      const d = snap.data();
      (d.historialPunts || []).forEach((entrada) => {
        if (pts[entrada.nom] !== undefined) pts[entrada.nom] += entrada.punts;
      });
      // Partida activa actual
      (d.jugadors || []).forEach((j) => {
        const noms = j.membres || [j.nom];
        noms.forEach((nom) => {
          if (pts[nom] !== undefined) pts[nom] += j.punts || 0;
        });
      });
    };
    sumarHistorial(snapInd);
    sumarHistorial(snapEq);
  } catch (e) {}
  return pts;
}

// ── NOVA PARTIDA ──────────────────────────────────────────────
let scJugadorsSeleccionats = new Set(SC_ORDRE_JUGADORS);

function scNovaPartida(modalitat) {
  scModalitat = modalitat;
  scJugadorsSeleccionats = new Set(SC_ORDRE_JUGADORS);
  if (modalitat === "individual") {
    mostraScreen("scrabble-config-individual");
    scRenderConfigIndividual();
  } else {
    mostraScreen("scrabble-config-equips");
    scRenderConfigEquips();
  }
}

function scRenderConfigIndividual() {
  const cont = document.getElementById("scrabble-config-individual-cont");
  if (!cont) return;
  cont.innerHTML = `
    <p style="font-size:.85rem;color:var(--text2);margin-bottom:1rem">
      Selecciona els jugadors que participen:
    </p>
    <div style="display:flex;flex-direction:column;gap:.5rem;margin-bottom:1.25rem">
      ${SC_ORDRE_JUGADORS.map((nom) => {
        const sel = scJugadorsSeleccionats.has(nom);
        return `
          <div onclick="scToggleJugador('${nom}')"
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
      ${scJugadorsSeleccionats.size} jugador${scJugadorsSeleccionats.size !== 1 ? "s" : ""} seleccionat${scJugadorsSeleccionats.size !== 1 ? "s" : ""}
    </div>
    <button class="trivial-btn-iniciar" onclick="scIniciarPartidaIndividual()">
      Iniciar partida individual
    </button>`;
}

function scToggleJugador(nom) {
  if (scJugadorsSeleccionats.has(nom)) {
    if (scJugadorsSeleccionats.size <= 2) {
      alert("Mínim 2 jugadors.");
      return;
    }
    scJugadorsSeleccionats.delete(nom);
  } else {
    scJugadorsSeleccionats.add(nom);
  }
  scRenderConfigIndividual();
}

async function scIniciarPartidaIndividual() {
  const pin = prompt("PIN d'administrador per iniciar partida:");
  if (pin !== "2468") {
    if (pin !== null) alert("PIN incorrecte.");
    return;
  }

  const jugadorsOrdenats = SC_ORDRE_JUGADORS.filter((nom) =>
    scJugadorsSeleccionats.has(nom),
  );
  if (jugadorsOrdenats.length < 2) {
    alert("Mínim 2 jugadors.");
    return;
  }

  const idxInici = Math.floor(Math.random() * jugadorsOrdenats.length);
  const ordre = [
    ...jugadorsOrdenats.slice(idxInici),
    ...jugadorsOrdenats.slice(0, idxInici),
  ];

  const sac = scGenerarSac();
  const jugadors = jugadorsOrdenats.map((nom) => {
    const ma = sac.splice(0, SC_MA_FITXES);
    return {
      nom,
      punts: 0,
      maEncriptada: scEncriptarMa(nom, ma),
      tornsPassats: 0,
    };
  });

  const partida = {
    activa: true,
    modalitat: "individual",
    ordre,
    tornIdx: 0,
    ronda: 1,
    tauler: scTaulerToFirestore(scTaulerBuit()),
    sac,
    jugadors,
    acabada: false,
    ts: Date.now(),
    validacioPendent: null,
    historialJugades: [],
    historialPunts: [],
  };

  try {
    await scrabbleGetDb().collection(SC_COL).doc(SC_IND_DOC).set(partida);
    mostraScreen("scrabble-inici");
    scCarregarInici();
  } catch (e) {
    console.error(e);
    alert("Error de connexió.");
  }
}

// ── CONFIG EQUIPS ─────────────────────────────────────────────
const scAssignacions = {};
let scNumEquips = 2;

function scRenderConfigEquips() {
  const cont = document.getElementById("scrabble-config-equips-cont");
  if (!cont) return;
  SC_ORDRE_JUGADORS.forEach((nom) => {
    if (!scAssignacions[nom]) scAssignacions[nom] = 0;
  });
  scRenderConfigEquipsHTML();
}

function scRenderConfigEquipsHTML() {
  const cont = document.getElementById("scrabble-config-equips-cont");
  if (!cont) return;
  const colors = ["#4169E1", "#228B22", "#FF8C00"];
  cont.innerHTML = `
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;flex-wrap:wrap">
      <span style="font-size:.85rem;color:var(--text2)">Nombre d'equips:</span>
      <div style="display:flex;gap:.4rem">
        ${[2, 3]
          .map(
            (n) => `
          <button onclick="scCanviarNumEquips(${n})"
            style="padding:.35rem .9rem;border-radius:8px;border:2px solid ${scNumEquips === n ? "var(--verd2)" : "var(--border)"};
                   background:${scNumEquips === n ? "rgba(106,171,122,.15)" : "var(--bg2)"};
                   color:${scNumEquips === n ? "var(--verd2)" : "var(--text2)"};
                   font-family:'DM Sans',sans-serif;font-weight:600;cursor:pointer">
            ${n} equips
          </button>`,
          )
          .join("")}
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:.5rem;margin-bottom:1rem">
      ${SC_ORDRE_JUGADORS.map((nom) => {
        const assignat = scAssignacions[nom] || 0;
        return `
          <div style="display:flex;align-items:center;gap:.75rem;background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:.5rem .75rem">
            <img src="${IMGS[nom] || ""}" style="width:32px;height:32px;border-radius:50%;object-fit:cover">
            <span style="flex:1;font-weight:600;font-size:.9rem">${nom}</span>
            <div style="display:flex;gap:.35rem">
              <button onclick="scAssignarEquip('${nom}',0)"
                style="padding:.3rem .65rem;border-radius:6px;border:1px solid ${assignat === 0 ? "var(--error)" : "var(--border)"};
                       background:${assignat === 0 ? "rgba(224,85,85,.12)" : "var(--bg)"};
                       color:${assignat === 0 ? "#ff8a8a" : "var(--text2)"};font-size:.75rem;cursor:pointer;font-family:'DM Sans',sans-serif">
                No juga
              </button>
              ${Array.from({ length: scNumEquips }, (_, i) => i + 1)
                .map(
                  (n) => `
                <button onclick="scAssignarEquip('${nom}',${n})"
                  style="padding:.3rem .65rem;border-radius:6px;
                         border:2px solid ${assignat === n ? colors[n - 1] : "var(--border)"};
                         background:${assignat === n ? colors[n - 1] + "25" : "var(--bg)"};
                         color:${assignat === n ? colors[n - 1] : "var(--text2)"};
                         font-size:.75rem;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif">
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
      ${Array.from({ length: scNumEquips }, (_, i) => i + 1)
        .map((n) => {
          const membres = SC_ORDRE_JUGADORS.filter(
            (nom) => scAssignacions[nom] === n,
          );
          return `<div style="font-size:.82rem;color:var(--text);padding:2px 0">
          <span style="color:${colors[n - 1]};font-weight:700">Equip ${n}:</span>
          ${membres.length ? membres.join(", ") : '<span style="color:var(--text2)">Buit</span>'}
        </div>`;
        })
        .join("")}
    </div>
    <button class="trivial-btn-iniciar" onclick="scIniciarPartidaEquips()">
      Iniciar partida per equips
    </button>`;
}

function scCanviarNumEquips(n) {
  scNumEquips = n;
  scRenderConfigEquipsHTML();
}

function scAssignarEquip(nom, n) {
  scAssignacions[nom] = n;
  scRenderConfigEquipsHTML();
}

async function scIniciarPartidaEquips() {
  const pin = prompt("PIN d'administrador per iniciar partida:");
  if (pin !== "2468") {
    if (pin !== null) alert("PIN incorrecte.");
    return;
  }

  const equips = Array.from({ length: scNumEquips }, (_, i) => ({
    nom: `Equip ${i + 1}`,
    membres: SC_ORDRE_JUGADORS.filter((nom) => scAssignacions[nom] === i + 1),
  })).filter((e) => e.membres.length > 0);

  if (equips.length < 2) {
    alert("Mínim 2 equips amb jugadors.");
    return;
  }

  const totalJugadors = equips.reduce((s, e) => s + e.membres.length, 0);
  if (totalJugadors < 2) {
    alert("Mínim 2 jugadors en total.");
    return;
  }

  const idxInici = Math.floor(Math.random() * equips.length);
  const ordre = [...equips.slice(idxInici), ...equips.slice(0, idxInici)].map(
    (e) => e.nom,
  );

  const sac = scGenerarSac();
  const jugadors = equips.map((eq) => {
    const ma = sac.splice(0, SC_MA_FITXES);
    // Per equips: la mà s'encripta amb el nom de l'equip però accessible a tots els membres
    return {
      nom: eq.nom,
      membres: eq.membres,
      punts: 0,
      maEncriptada: scEncriptarMa(eq.nom, ma),
      tornsPassats: 0,
    };
  });

  const partida = {
    activa: true,
    modalitat: "equips",
    equips,
    ordre,
    tornIdx: 0,
    ronda: 1,
    tauler: scTaulerToFirestore(scTaulerBuit()),
    sac,
    jugadors,
    acabada: false,
    ts: Date.now(),
    validacioPendent: null,
    historialJugades: [],
    historialPunts: [],
  };

  try {
    await scrabbleGetDb().collection(SC_COL).doc(SC_EQ_DOC).set(partida);
    mostraScreen("scrabble-inici");
    scCarregarInici();
  } catch (e) {
    console.error(e);
    alert("Error de connexió.");
  }
}

// ── ENTRAR A LA PARTIDA ───────────────────────────────────────
async function scEntrarPartida(modalitat) {
  scModalitat = modalitat;
  const docId = modalitat === "individual" ? SC_IND_DOC : SC_EQ_DOC;
  try {
    const snap = await scrabbleGetDb().collection(SC_COL).doc(docId).get();
    if (!snap.exists) return;
    scPartida = scNormalitzarPartida(snap.data());
    scEscoltarPartida(modalitat);
    scMostrarTorn();
  } catch (e) {
    console.error(e);
  }
}

async function scVeurePartida(modalitat) {
  scModalitat = modalitat;
  const docId = modalitat === "individual" ? SC_IND_DOC : SC_EQ_DOC;
  try {
    const snap = await scrabbleGetDb().collection(SC_COL).doc(docId).get();
    if (!snap.exists) return;
    scPartida = scNormalitzarPartida(snap.data());
    scEscoltarPartida(modalitat);
    mostraScreen("scrabble-veure");
    scRenderVeure();
  } catch (e) {
    console.error(e);
  }
}

function scEscoltarPartida(modalitat) {
  if (scUnsubscribe) scUnsubscribe();
  const docId = modalitat === "individual" ? SC_IND_DOC : SC_EQ_DOC;
  scUnsubscribe = scrabbleGetDb()
    .collection(SC_COL)
    .doc(docId)
    .onSnapshot((snap) => {
      if (!snap.exists) return;
      scPartida = scNormalitzarPartida(snap.data());
      const screenActiva = document.querySelector(
        '[id^="screen-scrabble-"]:not([style*="none"])',
      );
      if (!screenActiva) return;
      const sid = screenActiva.id.replace("screen-", "");
      if (sid === "scrabble-torn") scRenderTorn();
      if (sid === "scrabble-veure") scRenderVeure();
      if (sid === "scrabble-validar") scRenderValidar();
    });
}

function scMostrarTorn() {
  // Comprova si cal validar primer
  if (scPartida?.validacioPendent && scEsValidador(scPartida, scModalitat)) {
    mostraScreen("scrabble-validar");
    scRenderValidar();
  } else {
    mostraScreen("scrabble-torn");
    scRenderTorn();
  }
}

// ── PANTALLA TORN ─────────────────────────────────────────────
function scRenderTorn() {
  if (!scPartida) return;

  scFitxesJugades = [];
  scFitxaSeleccionada = null;
  scFitxesCanvi = [];

  const jugadorNom = scGetJugadorActualNom(scPartida);
  const jugadorData = scGetJugadorData(scPartida, jugadorNom);
  scMaActual = scDesencriptarMa(jugadorNom, jugadorData?.maEncriptada || "");

  const cont = document.getElementById("scrabble-torn-cont");
  if (!cont) return;

  cont.innerHTML = `
    <div class="sc-torn-wrap">
      <div class="sc-torn-header">
        <button class="snake-btn-back" onclick="scSortir()">← Sortir</button>
        <div class="sc-torn-info">
          <img src="${IMGS[jugadorNom] || ""}" alt="${jugadorNom}" class="sc-torn-avatar">
          <div>
            <div class="sc-torn-nom">${jugadorNom}</div>
            <div class="sc-torn-ronda">Ronda ${scPartida.ronda || 1} · Sac: ${scPartida.sac?.length || 0} fitxes</div>
          </div>
        </div>
        <div class="sc-torn-accions">
          <button class="mj-btn-accio" id="sc-btn-confirmar" onclick="scConfirmarJugada()" disabled>✓ Jugar</button>
          <button class="mj-btn-accio" onclick="scMostraCanvi()">🔄 Canviar</button>
          <button class="mj-btn-accio" onclick="scPassarTorn()">⏭ Passar</button>
        </div>
      </div>

      <div class="sc-tauler-wrap">
        <div class="sc-tauler" id="sc-tauler"></div>
      </div>

      <div class="sc-punts-torn" id="sc-punts-torn" style="display:none">
        Jugada: <span id="sc-punts-val">0</span> pts
      </div>

      <div class="sc-ma-wrap">
        <div class="sc-ma-label">La teva mà &nbsp;<span id="sc-ma-hint" style="font-size:.72rem;font-style:italic">Clica una fitxa per seleccionar-la</span></div>
        <div class="sc-ma" id="sc-ma"></div>
      </div>

      <div class="sc-ranking-lateral">
        ${scRenderRankingLateralHTML()}
      </div>
    </div>`;

  scRenderTauler();
  scRenderMa();
}

function scRenderRankingLateralHTML() {
  if (!scPartida) return "";
  const jugadors = [...(scPartida.jugadors || [])].sort(
    (a, b) => b.punts - a.punts,
  );
  return `<div class="sc-rank-lateral">
    <div class="sc-rank-lateral-titol">Puntuació</div>
    ${jugadors
      .map(
        (j, i) => `
      <div class="sc-rank-lateral-item">
        <span>${["🥇", "🥈", "🥉"][i] || ""}</span>
        <img src="${IMGS[j.membres?.[0] || j.nom] || ""}" alt="${j.nom}" style="width:24px;height:24px;border-radius:50%;object-fit:cover">
        <span class="sc-rank-lateral-nom">${j.nom}</span>
        <span class="sc-rank-lateral-pts">${j.punts}</span>
      </div>`,
      )
      .join("")}
  </div>`;
}

// ── TAULER ────────────────────────────────────────────────────
function scRenderTauler() {
  const el = document.getElementById("sc-tauler");
  if (!el || !scPartida) return;

  el.innerHTML = "";
  const tauler = scPartida.tauler;

  for (let r = 0; r < SC_MIDA; r++) {
    for (let c = 0; c < SC_MIDA; c++) {
      const cel = document.createElement("div");
      cel.className = "sc-cel";
      cel.dataset.r = r;
      cel.dataset.c = c;

      const key = `${r},${c}`;
      const tipusCasella = SC_CASELLES[key];
      const fitxaTauler = tauler[r]?.[c];
      const fitxaJugada = scFitxesJugades.find((f) => f.r === r && f.c === c);

      if (fitxaTauler) {
        cel.classList.add("sc-cel-fitxa", "sc-cel-fixe");
        cel.dataset.accio = "fixe";
        cel.innerHTML = `<span class="sc-fitxa-lletra">${fitxaTauler.lletra}</span><span class="sc-fitxa-pts">${fitxaTauler.comodin ? "" : fitxaTauler.punts}</span>`;
      } else if (fitxaJugada) {
        cel.classList.add("sc-cel-fitxa", "sc-cel-nova");
        cel.dataset.accio = "retirar";
        cel.innerHTML = `<span class="sc-fitxa-lletra">${fitxaJugada.lletra}</span><span class="sc-fitxa-pts">${fitxaJugada.comodin ? "" : fitxaJugada.punts}</span>`;
      } else {
        cel.dataset.accio = "collocar";
        if (tipusCasella) {
          cel.classList.add(`sc-cel-${tipusCasella.toLowerCase()}`);
          cel.innerHTML = `<span class="sc-cel-label">${SC_COLORS[tipusCasella].label}</span>`;
        } else if (r === 7 && c === 7) {
          cel.classList.add("sc-cel-centre");
          cel.innerHTML = '<span class="sc-cel-label">★</span>';
        }
      }

      el.appendChild(cel);
    }
  }

  // Event delegation: un sol listener al contenidor
  el._scListener && el.removeEventListener("click", el._scListener);
  el._scListener = (e) => {
    const cel = e.target.closest(".sc-cel");
    if (!cel) return;
    const r = parseInt(cel.dataset.r);
    const c = parseInt(cel.dataset.c);
    const accio = cel.dataset.accio;
    if (accio === "collocar") scCollocarFitxa(r, c);
    else if (accio === "retirar") scRetirarFitxa(r, c);
  };
  el.addEventListener("click", el._scListener);
}

function scRenderMa() {
  const el = document.getElementById("sc-ma");
  if (!el) return;

  el.innerHTML = scMaActual
    .map((fitxa, idx) => {
      if (!fitxa) return "";
      const seleccionada = scFitxaSeleccionada?.idx === idx;
      const enCanvi = scFitxesCanvi.includes(idx);
      return `
      <div class="sc-fitxa-ma ${seleccionada ? "seleccionada" : ""} ${enCanvi ? "en-canvi" : ""}"
           onclick="scSeleccionarFitxa(${idx})">
        <span class="sc-fitxa-lletra">${fitxa.lletra === "#" ? "🃏" : fitxa.lletra}</span>
        <span class="sc-fitxa-pts">${fitxa.punts || ""}</span>
      </div>`;
    })
    .join("");

  // Instrucció contextual
  const hint = document.getElementById("sc-ma-hint");
  if (hint) {
    hint.textContent = scFitxaSeleccionada
      ? `Clica una casella del tauler per col·locar la "${scFitxaSeleccionada.lletra}"`
      : "Clica una fitxa per seleccionar-la";
    hint.style.color = scFitxaSeleccionada ? "var(--gold)" : "var(--text2)";
  }
}

// ── COL·LOCAR / RETIRAR FITXES ────────────────────────────────
function scSeleccionarFitxa(idx) {
  const fitxa = scMaActual[idx];
  if (!fitxa) return;

  // Si és la mateixa, deselecciona
  if (scFitxaSeleccionada?.idx === idx) {
    scFitxaSeleccionada = null;
    scRenderMa();
    scActualitzarResssaltatTauler();
    return;
  }

  // Mode canvi: marca/desmarca per canviar
  const canviWrap = document.getElementById("sc-canvi-wrap");
  if (canviWrap && canviWrap.style.display !== "none") {
    const pos = scFitxesCanvi.indexOf(idx);
    if (pos >= 0) scFitxesCanvi.splice(pos, 1);
    else scFitxesCanvi.push(idx);
    scRenderMa();
    return;
  }

  scFitxaSeleccionada = { ...fitxa, idx };
  scRenderMa();
  scActualitzarResssaltatTauler();
}

function scActualitzarResssaltatTauler() {
  document.querySelectorAll("#sc-tauler .sc-cel").forEach((cel) => {
    const r = parseInt(cel.dataset.r);
    const c = parseInt(cel.dataset.c);
    const ocupada =
      scPartida?.tauler[r]?.[c] ||
      scFitxesJugades.find((f) => f.r === r && f.c === c);
    if (scFitxaSeleccionada && !ocupada) {
      cel.classList.add("sc-cel-disponible");
    } else {
      cel.classList.remove("sc-cel-disponible");
    }
  });
}

function scCollocarFitxa(r, c) {
  if (!scFitxaSeleccionada) return;
  if (scPartida.tauler[r]?.[c]) return; // casella ocupada
  if (scFitxesJugades.find((f) => f.r === r && f.c === c)) return;

  let lletra = scFitxaSeleccionada.lletra;
  let comodin = scFitxaSeleccionada.comodin || lletra === "#";

  // Si és comodí, demanar lletra
  if (comodin || lletra === "#") {
    const lletresDisp = "ABCDEFGHIJLMNOPQRSTUVXYZÇ";
    let input = prompt(`Comodí: quina lletra vols que sigui? (${lletresDisp})`);
    if (!input) return;
    input = input.toUpperCase().trim();
    if (!lletresDisp.includes(input)) {
      alert("Lletra no vàlida.");
      return;
    }
    lletra = input;
    comodin = true;
  }

  scFitxesJugades.push({
    r,
    c,
    lletra,
    punts: scFitxaSeleccionada.punts,
    comodin,
  });

  // Elimina de la mà (marca com null)
  scMaActual[scFitxaSeleccionada.idx] = null;
  scFitxaSeleccionada = null;

  scRenderTauler();
  scRenderMa();
  scActualitzarPuntsTorn();
}

function scRetirarFitxa(r, c) {
  const idx = scFitxesJugades.findIndex((f) => f.r === r && f.c === c);
  if (idx < 0) return;
  const fitxa = scFitxesJugades[idx];
  scFitxesJugades.splice(idx, 1);

  // Retorna a la mà (busca el primer null)
  const buit = scMaActual.findIndex((f) => f === null);
  if (buit >= 0) {
    scMaActual[buit] = {
      lletra: fitxa.comodin ? "#" : fitxa.lletra,
      punts: fitxa.punts,
      comodin: fitxa.comodin,
    };
  } else {
    scMaActual.push({
      lletra: fitxa.comodin ? "#" : fitxa.lletra,
      punts: fitxa.punts,
    });
  }

  scFitxaSeleccionada = null;
  scRenderTauler();
  scRenderMa();
  scActualitzarPuntsTorn();
}

// ── CALCUL DE PUNTS ───────────────────────────────────────────
function scActualitzarPuntsTorn() {
  const btnConfirmar = document.getElementById("sc-btn-confirmar");
  const puntsEl = document.getElementById("sc-punts-torn");
  const puntsVal = document.getElementById("sc-punts-val");

  if (!scFitxesJugades.length) {
    if (btnConfirmar) btnConfirmar.disabled = true;
    if (puntsEl) puntsEl.style.display = "none";
    return;
  }

  const resultat = scCalcularPunts(scPartida.tauler, scFitxesJugades);
  if (puntsEl) puntsEl.style.display = "block";
  if (puntsVal) puntsVal.textContent = resultat.total;
  if (btnConfirmar) btnConfirmar.disabled = !resultat.valid;
}

function scCalcularPunts(tauler, fitxesNoves) {
  if (!fitxesNoves.length) return { total: 0, paraules: [], valid: false };

  // Comprova que les fitxes estiguin en línia (mateixa fila o columna)
  const files = [...new Set(fitxesNoves.map((f) => f.r))];
  const cols = [...new Set(fitxesNoves.map((f) => f.c))];
  const enLinia = files.length === 1 || cols.length === 1;
  if (!enLinia) return { total: 0, paraules: [], valid: false };

  // Primera jugada ha de passar pel centre (7,7)
  const taulerBuit = !tauler.some((fila) => fila.some((c) => c));
  if (taulerBuit) {
    const passaCentre = fitxesNoves.some((f) => f.r === 7 && f.c === 7);
    if (!passaCentre)
      return {
        total: 0,
        paraules: [],
        valid: false,
        missatge: "La primera jugada ha de passar per la casella central!",
      };
  }

  // Comprova connectivitat (les fitxes noves han de connectar amb les existents o ser la primera jugada)
  if (!taulerBuit) {
    const connecta = fitxesNoves.some((f) =>
      scTeVeiTauler(tauler, f.r, f.c, fitxesNoves),
    );
    if (!connecta)
      return {
        total: 0,
        paraules: [],
        valid: false,
        missatge: "Les fitxes han de connectar amb les ja col·locades!",
      };
  }

  // Construeix el tauler temporal
  const taulerTemp = tauler.map((fila) => [...fila]);
  fitxesNoves.forEach((f) => {
    taulerTemp[f.r][f.c] = {
      lletra: f.lletra,
      punts: f.punts,
      comodin: f.comodin,
    };
  });

  // Troba totes les paraules formades
  const paraules = [];
  let total = 0;

  // Paraula principal (en la direcció de les fitxes noves)
  const horitzontal = files.length === 1;
  const paraulaPrincipal = horitzontal
    ? scExtreurePararaulaH(taulerTemp, files[0], Math.min(...cols), fitxesNoves)
    : scExtreurePararaulaV(
        taulerTemp,
        Math.min(...files),
        cols[0],
        fitxesNoves,
      );

  if (paraulaPrincipal && paraulaPrincipal.paraula.length >= 2) {
    paraules.push(paraulaPrincipal);
    total += paraulaPrincipal.punts;
  }

  // Paraules creuades (fitxes noves que formen paraules en la direcció perpendicular)
  fitxesNoves.forEach((f) => {
    const creuada = horitzontal
      ? scExtreurePararaulaV(taulerTemp, f.r, f.c, fitxesNoves, true)
      : scExtreurePararaulaH(taulerTemp, f.r, f.c, fitxesNoves, true);
    if (creuada && creuada.paraula.length >= 2) {
      paraules.push(creuada);
      total += creuada.punts;
    }
  });

  // Bonus Scrabble (7 fitxes d'una vegada)
  if (fitxesNoves.length === SC_MA_FITXES) total += 50;

  if (!paraules.length) return { total: 0, paraules: [], valid: false };
  return { total, paraules, valid: true };
}

function scTeVeiTauler(tauler, r, c, fitxesNoves) {
  const veins = [
    [r - 1, c],
    [r + 1, c],
    [r, c - 1],
    [r, c + 1],
  ];
  return veins.some(([vr, vc]) => {
    if (vr < 0 || vr >= SC_MIDA || vc < 0 || vc >= SC_MIDA) return false;
    if (tauler[vr]?.[vc]) return true;
    return fitxesNoves.some((f) => f.r === vr && f.c === vc);
  });
}

function scExtreurePararaulaH(
  tauler,
  r,
  cInici,
  fitxesNoves,
  soloCreuada = false,
) {
  // Busca inici de la paraula cap a l'esquerra
  let c = cInici;
  while (c > 0 && tauler[r]?.[c - 1]) c--;

  let paraula = "";
  let punts = 0;
  let multiplicadorParaula = 1;
  let c2 = c;
  let teFitxaNova = false;

  while (c2 < SC_MIDA && tauler[r]?.[c2]) {
    const cel = tauler[r][c2];
    const esNova = fitxesNoves.some((f) => f.r === r && f.c === c2);
    const key = `${r},${c2}`;
    const tipusCasella = SC_CASELLES[key];

    let ptsCel = cel.comodin ? 0 : cel.punts || 0;
    if (esNova) {
      teFitxaNova = true;
      if (tipusCasella === "DL") ptsCel *= 2;
      else if (tipusCasella === "TL") ptsCel *= 3;
      else if (tipusCasella === "DP") multiplicadorParaula *= 2;
      else if (tipusCasella === "TP") multiplicadorParaula *= 3;
      else if (r === 7 && c2 === 7 && !tauler[r][c2].fixe)
        multiplicadorParaula *= 2;
    }

    paraula += cel.lletra;
    punts += ptsCel;
    c2++;
  }

  if (!teFitxaNova || paraula.length < 2) return null;
  return { paraula, punts: punts * multiplicadorParaula, horitzontal: true };
}

function scExtreurePararaulaV(
  tauler,
  rInici,
  c,
  fitxesNoves,
  soloCreuada = false,
) {
  let r = rInici;
  while (r > 0 && tauler[r - 1]?.[c]) r--;

  let paraula = "";
  let punts = 0;
  let multiplicadorParaula = 1;
  let r2 = r;
  let teFitxaNova = false;

  while (r2 < SC_MIDA && tauler[r2]?.[c]) {
    const cel = tauler[r2][c];
    const esNova = fitxesNoves.some((f) => f.r === r2 && f.c === c);
    const key = `${r2},${c}`;
    const tipusCasella = SC_CASELLES[key];

    let ptsCel = cel.comodin ? 0 : cel.punts || 0;
    if (esNova) {
      teFitxaNova = true;
      if (tipusCasella === "DL") ptsCel *= 2;
      else if (tipusCasella === "TL") ptsCel *= 3;
      else if (tipusCasella === "DP") multiplicadorParaula *= 2;
      else if (tipusCasella === "TP") multiplicadorParaula *= 3;
      else if (r2 === 7 && c === 7 && !tauler[r2][c].fixe)
        multiplicadorParaula *= 2;
    }

    paraula += cel.lletra;
    punts += ptsCel;
    r2++;
  }

  if (!teFitxaNova || paraula.length < 2) return null;
  return { paraula, punts: punts * multiplicadorParaula, horitzontal: false };
}

// ── CONFIRMAR JUGADA ──────────────────────────────────────────
async function scConfirmarJugada() {
  if (!scFitxesJugades.length) return;
  const resultat = scCalcularPunts(scPartida.tauler, scFitxesJugades);
  if (!resultat.valid) {
    alert(resultat.missatge || "Jugada no vàlida.");
    return;
  }

  // Comprova paraules al diccionari
  const paraulesDes = resultat.paraules.map((p) => p.paraula);
  const noTrobades = paraulesDes.filter((p) => !SCRABBLE_DICCIONARI.has(p));

  if (noTrobades.length === 0) {
    // Totes vàlides → aplica directament
    await scAplicarJugada(resultat, false);
  } else {
    // Hi ha paraules no trobades → preguntar si vol modificar o enviar a validar
    const opcio = await scDialegValidacio(noTrobades);
    if (opcio === "modificar") {
      // Torna al joc sense fer res (les fitxes ja estan al tauler visualment)
      return;
    } else if (opcio === "validar") {
      await scDemanarValidacio(resultat, noTrobades);
    }
    // Si opcio === null (cancel·lat) no fem res
  }
}

async function scAplicarJugada(
  resultat,
  eraValidacio,
  jugadorNomOverride = null,
) {
  if (!scPartida) return;
  const docId = scModalitat === "individual" ? SC_IND_DOC : SC_EQ_DOC;
  const jugadorNom = jugadorNomOverride || scGetJugadorActualNom(scPartida);
  const jugadorIdx = scPartida.jugadors.findIndex((j) => j.nom === jugadorNom);

  // Actualitza tauler
  const nouTauler = scPartida.tauler.map((fila) => [...fila]);
  scFitxesJugades.forEach((f) => {
    nouTauler[f.r][f.c] = {
      lletra: f.lletra,
      punts: f.punts,
      comodin: f.comodin || false,
    };
  });

  // Actualitza mà: elimina fitxes col·locades, agafa del sac
  const maNova = scMaActual.filter((f) => f !== null);
  const sacNou = [...scPartida.sac];
  while (maNova.length < SC_MA_FITXES && sacNou.length > 0) {
    maNova.push(sacNou.shift());
  }

  // Actualitza jugador
  const jugadors = scPartida.jugadors.map((j, i) => {
    if (i !== jugadorIdx) return j;
    return {
      ...j,
      punts: j.punts + resultat.total,
      maEncriptada: scEncriptarMa(jugadorNom, maNova),
      tornsPassats: 0,
    };
  });

  // Historial jugades
  const historialJugades = [
    ...(scPartida.historialJugades || []),
    {
      nom: jugadorNom,
      paraules: resultat.paraules.map((p) => p.paraula),
      punts: resultat.total,
      ts: Date.now(),
    },
  ];

  // Comprova fi de partida (sac buit i mà buida)
  const acabada = sacNou.length === 0 && maNova.length === 0;

  // Si era validació, el torn ja apunta al validador → el mantenim (ell juga ara)
  // Si era jugada normal, avancem al jugador següent
  const nouTornIdx = eraValidacio
    ? scPartida.tornIdx
    : (scPartida.tornIdx + 1) % scPartida.ordre.length;
  const novaRonda =
    nouTornIdx === 0 ? (scPartida.ronda || 1) + 1 : scPartida.ronda;

  const update = {
    tauler: scTaulerToFirestore(nouTauler),
    sac: sacNou,
    jugadors,
    tornIdx: nouTornIdx,
    ronda: novaRonda,
    tornTs: Date.now(),
    validacioPendent: null,
    historialJugades,
    acabada,
  };

  if (acabada) {
    // Guarda historial de punts finals
    const historialPunts = [...(scPartida.historialPunts || [])];
    jugadors.forEach((j) => {
      const noms = j.membres || [j.nom];
      noms.forEach((nom) => historialPunts.push({ nom, punts: j.punts }));
    });
    update.historialPunts = historialPunts;
  }

  try {
    await scrabbleGetDb().collection(SC_COL).doc(docId).update(update);
    if (acabada) {
      scMostrarFiPartida(jugadors);
    } else {
      mostraScreen("scrabble-inici");
      scCarregarInici();
    }
  } catch (e) {
    console.error(e);
    alert("Error guardant la jugada.");
  }
}

function scDialegValidacio(noTrobades) {
  return new Promise((resolve) => {
    // Crea un modal inline en lloc d'un alert
    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem";
    overlay.innerHTML = `
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:1.5rem;max-width:400px;width:100%">
        <div style="font-size:1.1rem;font-weight:700;margin-bottom:.75rem">⚠️ Paraules no trobades</div>
        <p style="font-size:.88rem;color:var(--text2);margin-bottom:.75rem">
          Les paraules <strong style="color:var(--gold)">${noTrobades.join(", ")}</strong> no estan al diccionari.
        </p>
        <p style="font-size:.85rem;color:var(--text);margin-bottom:1.25rem">Què vols fer?</p>
        <div style="display:flex;flex-direction:column;gap:.6rem">
          <button id="sc-dial-modificar" style="background:rgba(106,171,122,.15);border:1px solid var(--verd);border-radius:10px;padding:.7rem;color:var(--verd2);font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:600;cursor:pointer">
            ✏️ Modificar la jugada
          </button>
          <button id="sc-dial-validar" style="background:linear-gradient(135deg,var(--verd),var(--verd2));border:none;border-radius:10px;padding:.7rem;color:#fff;font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:600;cursor:pointer">
            📨 Enviar al jugador següent per validar
          </button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector("#sc-dial-modificar").onclick = () => {
      document.body.removeChild(overlay);
      resolve("modificar");
    };
    overlay.querySelector("#sc-dial-validar").onclick = () => {
      document.body.removeChild(overlay);
      resolve("validar");
    };
  });
}

async function scDemanarValidacio(resultat, noTrobades) {
  if (!scPartida) return;
  const docId = scModalitat === "individual" ? SC_IND_DOC : SC_EQ_DOC;
  const jugadorNom = scGetJugadorActualNom(scPartida);

  // Guardem el tornIdx del jugador que ha jugat per poder tornar-li si es rebutja
  const tornIdxJugador = scPartida.tornIdx;

  // Avancem el torn al jugador SEGÜENT (que serà qui validi)
  const nouTornIdx = (scPartida.tornIdx + 1) % scPartida.ordre.length;
  const novaRonda =
    nouTornIdx === 0 ? (scPartida.ronda || 1) + 1 : scPartida.ronda;

  const validacioPendent = {
    jugadorNom,
    tornIdxJugador, // per tornar el torn si es rebutja
    paraules: resultat.paraules.map((p) => p.paraula),
    noTrobades,
    punts: resultat.total,
    fitxesCol·locades: scFitxesJugades,
    ts: Date.now(),
  };

  try {
    await scrabbleGetDb().collection(SC_COL).doc(docId).update({
      validacioPendent,
      tornIdx: nouTornIdx,
      ronda: novaRonda,
      tornTs: Date.now(),
    });
    alert(
      `Les paraules ${noTrobades.join(", ")} no estan al diccionari.\nEl jugador següent haurà de validar la jugada.`,
    );
    mostraScreen("scrabble-inici");
    scCarregarInici();
  } catch (e) {
    console.error(e);
    alert("Error guardant la validació.");
  }
}

// ── VALIDACIÓ PEL JUGADOR SEGÜENT ─────────────────────────────
function scRenderValidar() {
  if (!scPartida?.validacioPendent) return;
  const cont = document.getElementById("scrabble-validar-cont");
  if (!cont) return;

  const v = scPartida.validacioPendent;
  cont.innerHTML = `
    <div class="sc-validar-wrap">
      <div class="sc-validar-header">
        <button class="snake-btn-back" onclick="scSortir()">← Sortir</button>
        <h2 class="sc-validar-titol">⚖️ Validar jugada</h2>
      </div>

      <div class="sc-validar-info">
        <p><strong>${v.jugadorNom}</strong> ha jugat les paraules:</p>
        <div class="sc-validar-paraules">
          ${v.paraules
            .map((p) => {
              const alDic = SCRABBLE_DICCIONARI.has(p);
              return `<span class="sc-validar-paraula ${alDic ? "valida" : "dubte"}">${p} ${alDic ? "✓" : "?"}</span>`;
            })
            .join("")}
        </div>
        <p style="color:var(--error);margin-top:.5rem">
          Paraules no trobades al diccionari: <strong>${v.noTrobades.join(", ")}</strong>
        </p>
        <p style="color:var(--text2);font-size:.85rem;margin-top:.5rem">Punts de la jugada: <strong>${v.punts}</strong></p>
      </div>

      <div class="sc-validar-tauler-wrap">
        <div class="sc-tauler" id="sc-tauler-validar"></div>
      </div>

      <div class="sc-validar-btns">
        <button class="trivial-btn-jugar" onclick="scAcceptarJugada()">✅ Acceptar jugada</button>
        <button class="trivial-btn-nova" style="background:rgba(224,85,85,.15);color:#ff8a8a;border-color:var(--error)" onclick="scRebutjarJugada()">❌ Rebutjar jugada</button>
      </div>
    </div>`;

  // Renderitza tauler amb les fitxes pendents
  scRenderTaulerValidar();
}

function scRenderTaulerValidar() {
  const el = document.getElementById("sc-tauler-validar");
  if (!el || !scPartida?.validacioPendent) return;

  const tauler = scPartida.tauler;
  const fitxesPend = scPartida.validacioPendent.fitxesCol·locades || [];

  el.innerHTML = "";
  for (let r = 0; r < SC_MIDA; r++) {
    for (let c = 0; c < SC_MIDA; c++) {
      const cel = document.createElement("div");
      cel.className = "sc-cel";

      const fitxaTauler = tauler[r]?.[c];
      const fitxaPend = fitxesPend.find((f) => f.r === r && f.c === c);
      const key = `${r},${c}`;
      const tipusCasella = SC_CASELLES[key];

      if (fitxaTauler) {
        cel.classList.add("sc-cel-fitxa", "sc-cel-fixe");
        cel.innerHTML = `<span class="sc-fitxa-lletra">${fitxaTauler.lletra}</span><span class="sc-fitxa-pts">${fitxaTauler.comodin ? "" : fitxaTauler.punts}</span>`;
      } else if (fitxaPend) {
        cel.classList.add("sc-cel-fitxa", "sc-cel-pendent");
        cel.innerHTML = `<span class="sc-fitxa-lletra">${fitxaPend.lletra}</span><span class="sc-fitxa-pts">${fitxaPend.comodin ? "" : fitxaPend.punts}</span>`;
      } else if (tipusCasella) {
        const info = SC_COLORS[tipusCasella];
        cel.classList.add(`sc-cel-${tipusCasella.toLowerCase()}`);
        cel.innerHTML = `<span class="sc-cel-label">${info.label}</span>`;
      } else if (r === 7 && c === 7) {
        cel.classList.add("sc-cel-centre");
        cel.innerHTML = '<span class="sc-cel-label">★</span>';
      }

      el.appendChild(cel);
    }
  }
}

async function scAcceptarJugada() {
  if (!scPartida?.validacioPendent) return;
  const v = scPartida.validacioPendent;

  // Recupera la mà original del jugador que va jugar
  const jugadorData = scGetJugadorData(scPartida, v.jugadorNom);
  scMaActual = scDesencriptarMa(v.jugadorNom, jugadorData?.maEncriptada || "");
  scFitxesJugades = v.fitxesCol·locades;

  // Elimina les fitxes col·locades de la mà (una per una, les primeres no-null)
  v.fitxesCol·locades.forEach(() => {
    const idx = scMaActual.findIndex((f) => f !== null);
    if (idx >= 0) scMaActual[idx] = null;
  });

  const resultat = {
    total: v.punts,
    paraules: v.paraules.map((p) => ({ paraula: p })),
    valid: true,
  };
  // Passem el nom del jugador original per no confondre'l amb el validador
  await scAplicarJugada(resultat, true, v.jugadorNom);
}

async function scRebutjarJugada() {
  if (!scPartida?.validacioPendent) return;
  const docId = scModalitat === "individual" ? SC_IND_DOC : SC_EQ_DOC;
  const v = scPartida.validacioPendent;

  // Torna el torn al jugador que va fer la jugada invàlida
  const tornIdxOriginal = v.tornIdxJugador ?? scPartida.tornIdx;

  try {
    await scrabbleGetDb().collection(SC_COL).doc(docId).update({
      validacioPendent: null,
      tornIdx: tornIdxOriginal,
      tornTs: Date.now(),
    });
    alert(`Jugada de ${v.jugadorNom} rebutjada. Li torna el torn per repetir.`);
    mostraScreen("scrabble-inici");
    scCarregarInici();
  } catch (e) {
    console.error(e);
  }
}

// ── CANVIAR FITXES ────────────────────────────────────────────
function scMostraCanvi() {
  scFitxesCanvi = [];
  scFitxaSeleccionada = null;

  // Mostra/amaga el panell de canvi
  let wrap = document.getElementById("sc-canvi-wrap");
  if (!wrap) {
    const maWrap = document.querySelector(".sc-ma-wrap");
    if (!maWrap) return;
    wrap = document.createElement("div");
    wrap.id = "sc-canvi-wrap";
    wrap.className = "sc-canvi-wrap";
    wrap.innerHTML = `
      <p style="font-size:.82rem;color:var(--text2);margin-bottom:.5rem">Selecciona les fitxes que vols canviar:</p>
      <div style="display:flex;gap:.5rem;margin-top:.5rem">
        <button class="trivial-btn-jugar" style="flex:1" onclick="scConfirmarCanvi()">Canviar seleccionades</button>
        <button class="mj-btn-accio" onclick="scCancellarCanvi()">Cancel·lar</button>
      </div>`;
    maWrap.after(wrap);
  }
  wrap.style.display = wrap.style.display === "none" ? "block" : "none";
  scRenderMa();
}

async function scConfirmarCanvi() {
  if (!scFitxesCanvi.length) {
    alert("Selecciona almenys una fitxa.");
    return;
  }
  if (scPartida.sac.length < scFitxesCanvi.length) {
    alert("No hi ha prou fitxes al sac.");
    return;
  }
  if (scFitxesJugades.length) {
    alert("Retira primer les fitxes que has col·locat.");
    return;
  }

  const docId = scModalitat === "individual" ? SC_IND_DOC : SC_EQ_DOC;
  const jugadorNom = scGetJugadorActualNom(scPartida);
  const jugadorIdx = scPartida.jugadors.findIndex((j) => j.nom === jugadorNom);

  const sacNou = [...scPartida.sac];
  const maNova = [...scMaActual];

  // Canvia les fitxes seleccionades
  scFitxesCanvi.forEach((idx) => {
    const fitxa = maNova[idx];
    if (fitxa) {
      sacNou.push(fitxa);
      maNova[idx] = null;
    }
  });

  // Barreja el sac i agafa fitxes noves
  for (let i = sacNou.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sacNou[i], sacNou[j]] = [sacNou[j], sacNou[i]];
  }

  scFitxesCanvi.forEach((idx) => {
    maNova[idx] = sacNou.shift();
  });

  const jugadors = scPartida.jugadors.map((j, i) => {
    if (i !== jugadorIdx) return j;
    return {
      ...j,
      maEncriptada: scEncriptarMa(jugadorNom, maNova.filter(Boolean)),
    };
  });

  const nouTornIdx = (scPartida.tornIdx + 1) % scPartida.ordre.length;
  const novaRonda =
    nouTornIdx === 0 ? (scPartida.ronda || 1) + 1 : scPartida.ronda;

  try {
    await scrabbleGetDb().collection(SC_COL).doc(docId).update({
      sac: sacNou,
      jugadors,
      tornIdx: nouTornIdx,
      ronda: novaRonda,
      tornTs: Date.now(),
    });
    mostraScreen("scrabble-inici");
    scCarregarInici();
  } catch (e) {
    console.error(e);
  }
}

function scCancellarCanvi() {
  scFitxesCanvi = [];
  const wrap = document.getElementById("sc-canvi-wrap");
  if (wrap) wrap.style.display = "none";
  scRenderMa();
}

// ── PASSAR TORN ───────────────────────────────────────────────
async function scPassarTorn() {
  if (scFitxesJugades.length) {
    if (!confirm("Tens fitxes col·locades. Vols retirar-les i passar torn?"))
      return;
    // Retorna fitxes a la mà
    scFitxesJugades.forEach((f) => {
      const buit = scMaActual.findIndex((x) => x === null);
      if (buit >= 0)
        scMaActual[buit] = {
          lletra: f.comodin ? "#" : f.lletra,
          punts: f.punts,
        };
      else
        scMaActual.push({ lletra: f.comodin ? "#" : f.lletra, punts: f.punts });
    });
    scFitxesJugades = [];
  }

  const docId = scModalitat === "individual" ? SC_IND_DOC : SC_EQ_DOC;
  const jugadorNom = scGetJugadorActualNom(scPartida);
  const jugadorIdx = scPartida.jugadors.findIndex((j) => j.nom === jugadorNom);

  const jugadors = scPartida.jugadors.map((j, i) => {
    if (i !== jugadorIdx) return j;
    return { ...j, tornsPassats: (j.tornsPassats || 0) + 1 };
  });

  // Si tots els jugadors passen 2 cops seguits, la partida acaba
  const totsHanPassat = jugadors.every((j) => (j.tornsPassats || 0) >= 2);

  const nouTornIdx = (scPartida.tornIdx + 1) % scPartida.ordre.length;
  const novaRonda =
    nouTornIdx === 0 ? (scPartida.ronda || 1) + 1 : scPartida.ronda;

  try {
    await scrabbleGetDb().collection(SC_COL).doc(docId).update({
      jugadors,
      tornIdx: nouTornIdx,
      ronda: novaRonda,
      tornTs: Date.now(),
      acabada: totsHanPassat,
    });
    if (totsHanPassat) {
      scMostrarFiPartida(jugadors);
    } else {
      mostraScreen("scrabble-inici");
      scCarregarInici();
    }
  } catch (e) {
    console.error(e);
  }
}

// ── FI DE PARTIDA ─────────────────────────────────────────────
function scMostrarFiPartida(jugadors) {
  const ordenats = [...jugadors].sort((a, b) => b.punts - a.punts);
  const guanyador = ordenats[0];
  const cont = document.getElementById("scrabble-inici-cont");
  if (!cont) return;
  mostraScreen("scrabble-inici");
  cont.innerHTML = `
    <div class="sc-fi-partida">
      <div class="sc-fi-icon">🏆</div>
      <div class="sc-fi-titol">Partida acabada!</div>
      <div class="sc-fi-guanyador">Guanyador: <strong>${guanyador.nom}</strong> amb ${guanyador.punts} punts</div>
      <div class="sc-fi-resultats">
        ${ordenats
          .map(
            (j, i) => `
          <div class="sc-fi-jugador">
            <span>${["🥇", "🥈", "🥉"][i] || i + 1 + "è"}</span>
            <img src="${IMGS[j.membres?.[0] || j.nom] || ""}" style="width:32px;height:32px;border-radius:50%">
            <span>${j.nom}</span>
            <span style="color:var(--gold);font-weight:700">${j.punts} pts</span>
          </div>`,
          )
          .join("")}
      </div>
      <button class="trivial-btn-nova" onclick="scCarregarInici()" style="margin-top:1rem">← Tornar a l'inici</button>
    </div>`;
}

// ── VEURE PARTIDA ─────────────────────────────────────────────
function scRenderVeure() {
  if (!scPartida) return;
  const cont = document.getElementById("scrabble-veure-cont");
  if (!cont) return;

  const jugadorNom = scGetJugadorActualNom(scPartida);
  const jugadors = [...(scPartida.jugadors || [])].sort(
    (a, b) => b.punts - a.punts,
  );

  cont.innerHTML = `
    <div style="padding:1rem;max-width:700px;margin:0 auto">
      <div style="margin-bottom:1rem;font-size:.9rem;color:var(--text2)">Torn de: <strong style="color:var(--text)">${jugadorNom}</strong> · Ronda ${scPartida.ronda || 1}</div>
      <div class="sc-tauler-wrap" style="margin-bottom:1rem">
        <div class="sc-tauler" id="sc-tauler-veure"></div>
      </div>
      <div class="trivial-ranking-complet">
        ${jugadors
          .map(
            (j, i) => `
          <div class="trivial-rank-item ${j.nom === jugadorNom ? "actiu" : ""}">
            <span class="trivial-rank-pos">${["🥇", "🥈", "🥉"][i] || i + 1}</span>
            <img src="${IMGS[j.membres?.[0] || j.nom] || ""}" alt="${j.nom}">
            <div class="trivial-rank-info">
              <div class="trivial-rank-nom">${j.nom}</div>
            </div>
            <div class="trivial-rank-punts">${j.punts} pts</div>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;

  // Renderitza tauler de visualització
  const elTauler = document.getElementById("sc-tauler-veure");
  if (elTauler) {
    elTauler.innerHTML = "";
    for (let r = 0; r < SC_MIDA; r++) {
      for (let c = 0; c < SC_MIDA; c++) {
        const cel = document.createElement("div");
        cel.className = "sc-cel";
        const fitxa = scPartida.tauler[r]?.[c];
        const key = `${r},${c}`;
        const tipusCasella = SC_CASELLES[key];
        if (fitxa) {
          cel.classList.add("sc-cel-fitxa", "sc-cel-fixe");
          cel.innerHTML = `<span class="sc-fitxa-lletra">${fitxa.lletra}</span><span class="sc-fitxa-pts">${fitxa.comodin ? "" : fitxa.punts}</span>`;
        } else if (tipusCasella) {
          cel.classList.add(`sc-cel-${tipusCasella.toLowerCase()}`);
          cel.innerHTML = `<span class="sc-cel-label">${SC_COLORS[tipusCasella].label}</span>`;
        } else if (r === 7 && c === 7) {
          cel.classList.add("sc-cel-centre");
          cel.innerHTML = '<span class="sc-cel-label">★</span>';
        }
        elTauler.appendChild(cel);
      }
    }
  }
}

// ── ADMINISTRACIÓ ─────────────────────────────────────────────
async function scAdminPartida(modalitat) {
  const pin = prompt("PIN d'administrador:");
  if (pin !== "2468") {
    if (pin !== null) alert("PIN incorrecte.");
    return;
  }

  const opcio = prompt(
    "Opcions:\n1 - Passar torn\n2 - Reiniciar partida\nEscriu 1 o 2:",
  );
  if (opcio === "1") {
    const docId = modalitat === "individual" ? SC_IND_DOC : SC_EQ_DOC;
    const snap = await scrabbleGetDb().collection(SC_COL).doc(docId).get();
    if (!snap.exists) return;
    const p = snap.data();
    const nouTornIdx = (p.tornIdx + 1) % p.ordre.length;
    await scrabbleGetDb()
      .collection(SC_COL)
      .doc(docId)
      .update({ tornIdx: nouTornIdx, tornTs: Date.now() });
    alert("Torn passat.");
    scCarregarInici();
  } else if (opcio === "2") {
    if (confirm("Segur que vols reiniciar la partida?")) {
      const docId = modalitat === "individual" ? SC_IND_DOC : SC_EQ_DOC;
      await scrabbleGetDb().collection(SC_COL).doc(docId).delete();
      scCarregarInici();
    }
  }
}

// ── BANNER LANDING PAGE ───────────────────────────────────────
async function scrabbleComprovarTornIndex() {
  if (!jugadorActiu) return;
  try {
    const db = scrabbleGetDb();
    const [snapInd, snapEq] = await Promise.all([
      db.collection(SC_COL).doc(SC_IND_DOC).get(),
      db.collection(SC_COL).doc(SC_EQ_DOC).get(),
    ]);

    let missatge = null;
    let modalitat = null;

    // Comprova individual
    if (snapInd.exists) {
      const p = snapInd.data();
      if (p.activa && !p.acabada) {
        const tornActual = scGetJugadorActualNom(p);
        const esValidacio = !!p.validacioPendent;
        if (tornActual === jugadorActiu) {
          missatge = esValidacio
            ? "Has de validar una jugada al Scrabble Individual!"
            : "És el teu torn al Scrabble Individual!";
          modalitat = "individual";
        } else if (esValidacio) {
          // Comprova si és membre d'un equip amb torn (modalitat equips)
        }
      }
    }
    // Comprova equips
    if (!missatge && snapEq.exists) {
      const p = snapEq.data();
      if (p.activa && !p.acabada) {
        const tornActual = scGetJugadorActualNom(p);
        const equip = p.equips?.find((e) => e.nom === tornActual);
        const esMembre = equip?.membres?.includes(jugadorActiu);
        const esValidacio = !!p.validacioPendent;
        if (esMembre) {
          missatge = esValidacio
            ? "Has de validar una jugada al Scrabble per Equips!"
            : "És el teu torn al Scrabble per Equips!";
          modalitat = "equips";
        }
      }
    }

    const banner = document.getElementById("scrabble-torn-banner");
    if (banner) {
      if (missatge) {
        banner.style.display = "flex";
        banner.querySelector(".trivial-banner-text").textContent = missatge;
        banner.querySelector(".trivial-banner-btn").onclick = () => {
          window.location.href = `jocs.html?scrabble=${modalitat}`;
        };
      } else {
        banner.style.display = "none";
      }
    }
  } catch (e) {
    console.error("Error comprovant torn Scrabble:", e);
  }
}

// ── SORTIR ────────────────────────────────────────────────────
function scSortir() {
  if (scUnsubscribe) {
    scUnsubscribe();
    scUnsubscribe = null;
  }
  scFitxesJugades = [];
  scFitxaSeleccionada = null;
  mostraScreen("scrabble-inici");
  scCarregarInici();
}

// ── UTILS ─────────────────────────────────────────────────────
function scGetJugadorActualNom(p) {
  if (!p || !p.ordre) return "";
  return p.ordre[p.tornIdx % p.ordre.length];
}

function scGetJugadorData(p, nom) {
  return p?.jugadors?.find((j) => j.nom === nom) || null;
}

function scEsTocaJugadorActiu(p, modalitat) {
  if (!p || !jugadorActiu) return false;
  const nomActual = scGetJugadorActualNom(p);
  if (modalitat === "individual") return nomActual === jugadorActiu;
  // Equips: comprova si el jugador actiu és membre de l'equip amb el torn
  const equip = p.equips?.find((e) => e.nom === nomActual);
  return equip?.membres?.includes(jugadorActiu) || false;
}

function scEsValidador(p, modalitat) {
  if (!p?.validacioPendent || !jugadorActiu) return false;
  // El validador és el jugador amb el torn ACTUAL (que ve després del que va jugar)
  return scEsTocaJugadorActiu(p, modalitat);
}

function scTaulerBuit() {
  return Array.from({ length: SC_MIDA }, () => Array(SC_MIDA).fill(null));
}

// Firestore no suporta arrays niats → serialitzem el tauler com a objecte pla
// Format: { "r_c": { lletra, punts, comodin } } — caselles buides no s'emmagatzemen
function scTaulerToFirestore(tauler) {
  const obj = {};
  for (let r = 0; r < SC_MIDA; r++) {
    for (let c = 0; c < SC_MIDA; c++) {
      if (tauler[r]?.[c]) obj[`${r}_${c}`] = tauler[r][c];
    }
  }
  return obj;
}

function scTaulerFromFirestore(obj) {
  const tauler = scTaulerBuit();
  if (!obj) return tauler;
  Object.entries(obj).forEach(([key, val]) => {
    const [r, c] = key.split("_").map(Number);
    if (r >= 0 && r < SC_MIDA && c >= 0 && c < SC_MIDA) tauler[r][c] = val;
  });
  return tauler;
}

function scGenerarSac() {
  const sac = [];
  SCRABBLE_FITXES.forEach(([lletra, quantitat, punts]) => {
    for (let i = 0; i < quantitat; i++) {
      sac.push({ lletra, punts, comodin: lletra === "#" });
    }
  });
  // Barreja
  for (let i = sac.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sac[i], sac[j]] = [sac[j], sac[i]];
  }
  return sac;
}

// Encriptació simple de la mà (evita que altres vegin les fitxes inspeccionant Firebase)
// Usem una codificació base64 amb un salt basat en el nom del jugador
function scEncriptarMa(nom, ma) {
  try {
    const json = JSON.stringify(ma);
    return btoa(encodeURIComponent(json + "|" + nom));
  } catch (e) {
    return "";
  }
}

function scDesencriptarMa(nom, enc) {
  try {
    if (!enc) return [];
    const json = decodeURIComponent(atob(enc));
    const parts = json.split("|" + nom);
    return JSON.parse(parts[0]);
  } catch (e) {
    return [];
  }
}
