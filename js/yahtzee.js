// ══════════════════════════════════════════════════════════════
//  YAHTZEE AÇORES — Firebase Firestore
//  2 partides simultànies (A i B) · cada jugador al seu mòbil
//  13 rondes · 5 daus · 3 llançaments per torn
//  Rànquing: mitjana de partides (localStorage: yahtzee_punts_Nom)
// ══════════════════════════════════════════════════════════════

// ── FIREBASE ──────────────────────────────────────────────────
let _yahtzeeDb = null;
function yhGetDb() {
  if (_yahtzeeDb) return _yahtzeeDb;
  if (!firebase.apps.length) firebase.initializeApp(CONFIG.FIREBASE);
  _yahtzeeDb = firebase.firestore();
  return _yahtzeeDb;
}

const YH_COL   = 'yahtzee_partides';
const YH_DOC_A = 'partida_a';
const YH_DOC_B = 'partida_b';
const YH_ORDRE = ['Anna', 'Jordi', 'Mons', 'Xu', 'Laia', 'Joa'];
const YH_LS_KEY = 'yahtzee_punts_';

// ── CATEGORIES ────────────────────────────────────────────────
const YH_CATS_SUP = [
  { id: 'uns',     label: 'Uns',     emoji: '1️⃣', desc: 'Suma de tots els 1' },
  { id: 'dos',     label: 'Dosos',   emoji: '2️⃣', desc: 'Suma de tots els 2' },
  { id: 'tres',    label: 'Tresos',  emoji: '3️⃣', desc: 'Suma de tots els 3' },
  { id: 'quatres', label: 'Quatres', emoji: '4️⃣', desc: 'Suma de tots els 4' },
  { id: 'cincs',   label: 'Cincs',   emoji: '5️⃣', desc: 'Suma de tots els 5' },
  { id: 'sises',   label: 'Sisos',   emoji: '6️⃣', desc: 'Suma de tots els 6' },
];
const YH_CATS_INF = [
  { id: 'trio',     label: 'Trio',          emoji: '🎲', desc: '3 daus iguals → suma tots els daus' },
  { id: 'poker',    label: 'Pòquer',        emoji: '🎰', desc: '4 daus iguals → suma tots els daus' },
  { id: 'full',     label: 'Full',          emoji: '🏠', desc: '3 iguals + 2 iguals → 25 pts' },
  { id: 'escala4',  label: 'Escala petita', emoji: '📈', desc: '4 consecutius → 30 pts' },
  { id: 'escala5',  label: 'Escala gran',   emoji: '📊', desc: '5 consecutius → 40 pts' },
  { id: 'yahtzee',  label: 'Yahtzee!',      emoji: '🎯', desc: '5 daus iguals → 50 pts' },
  { id: 'atzar',    label: 'Atzar',         emoji: '🌀', desc: 'Qualsevol combinació → suma tots els daus' },
];
const YH_BONUS_SUP = 35; // bonus si secció superior >= 63
const YH_BONUS_YAHTZEE_EXTRA = 100; // per cada Yahtzee addicional

// ── ESTAT LOCAL ───────────────────────────────────────────────
let yhPartida     = null;
let yhDocId       = null;
let yhUnsubscribe = null;
let yhDaus        = [0, 0, 0, 0, 0];  // valors actuals
let yhBlocat      = [false,false,false,false,false]; // daus fixats
let yhLlançaments = 0; // 0=no ha llançat, 1,2,3
let yhSelCateg    = null; // categoria preseleccionada

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarYahtzee() {
  yhPartida = null;
  yhDocId   = null;
  if (yhUnsubscribe) { yhUnsubscribe(); yhUnsubscribe = null; }
  mostraScreen('yahtzee-inici');
  yhCarregarInici();
}

// ── PANTALLA D'INICI ──────────────────────────────────────────
async function yhCarregarInici() {
  try {
    const db = yhGetDb();
    const [snapA, snapB] = await Promise.all([
      db.collection(YH_COL).doc(YH_DOC_A).get(),
      db.collection(YH_COL).doc(YH_DOC_B).get(),
    ]);
    yhRenderInici(
      snapA.exists ? snapA.data() : null,
      snapB.exists ? snapB.data() : null,
    );
  } catch(e) {
    console.error('Error carregant Yahtzee:', e);
  }
}

function yhRenderInici(pA, pB) {
  const cont = document.getElementById('yahtzee-inici-cont');
  if (!cont) return;

  const renderCard = (p, docId) => {
    const lletra = docId === YH_DOC_A ? 'A' : 'B';
    if (!p || !p.activa) {
      return `
        <div class="trivial-partida-card inactiva">
          <div class="trivial-partida-icon">🎲</div>
          <div class="trivial-partida-nom">Partida ${lletra}</div>
          <div class="trivial-partida-estat">Cap partida activa</div>
          <button class="trivial-btn-nova" onclick="yhNovaPartida('${docId}')">Nova partida</button>
        </div>`;
    }

    const tornNom = yhGetTornActualNom(p);
    const esMeuTorn = tornNom === jugadorActiu;
    const ronda = (p.ronda || 1);
    const rondesTotal = p.jugadors ? p.jugadors[0]?.marcador ? 13 : 13 : 13;

    return `
      <div class="trivial-partida-card activa ${esMeuTorn ? 'es-torn' : ''}">
        <div class="trivial-partida-icon">🎲</div>
        <div class="trivial-partida-nom">Partida ${lletra}</div>
        ${esMeuTorn ? '<div class="trivial-torn-badge">🎯 És el teu torn!</div>' : ''}
        <div class="trivial-partida-torn">Torn de: <strong>${tornNom}</strong></div>
        <div class="trivial-partida-ronda">Ronda ${ronda}/13</div>
        <div class="trivial-ranking-mini" id="yh-rank-${docId}"></div>
        <div class="trivial-partida-btns">
          ${esMeuTorn
            ? `<button class="trivial-btn-jugar" onclick="yhEntrarPartida('${docId}')">Jugar el meu torn →</button>`
            : `<button class="trivial-btn-veure" onclick="yhVeurePartida('${docId}')">Veure partida</button>`}
          <button class="trivial-btn-admin" onclick="yhAdminPartida('${docId}')">⚙️</button>
        </div>
      </div>`;
  };

  cont.innerHTML = `
    <div class="trivial-inici-layout">
      <div class="trivial-inici-cards-wrap">
        <div class="trivial-inici-titol-wrap">
          <div class="joc-header-fila">
            <button class="mapa-back-btn" onclick="mostraScreen('joc-selector')">← Tornar</button>
          </div>
          <div class="joc-titol-fila" style="align-items:center;width:100%;text-align:center;">
            <span class="joc-titol-emoji">🎲</span>
            <span class="joc-titol-text">Yahtzee</span>
          </div>
          <button class="yh-btn-regles" onclick="yhMostrarRegles()">📖 Regles i puntuació</button>
        </div>
        <div class="trivial-partides-grid">
          ${renderCard(pA, YH_DOC_A)}
          ${renderCard(pB, YH_DOC_B)}
        </div>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Rànquing Yahtzee</div>
        <div class="ranking-list-home" id="yh-ranking-global-list">
          <div class="ranking-loading">Carregant…</div>
        </div>
      </div>
    </div>`;

  if (pA?.activa) yhRenderRankingMini(pA, YH_DOC_A);
  if (pB?.activa) yhRenderRankingMini(pB, YH_DOC_B);
  yhRenderRankingGlobal();
}

function yhRenderRankingMini(p, docId) {
  const el = document.getElementById('yh-rank-' + docId);
  if (!el) return;
  const sorted = [...(p.jugadors || [])].sort((a, b) => yhTotalMarcador(b) - yhTotalMarcador(a));
  el.innerHTML = sorted.slice(0, 3).map((j, i) => `
    <div class="trivial-rank-mini-item">
      <span>${['🥇','🥈','🥉'][i]}</span>
      <span>${j.nom}</span>
      <span>${yhTotalMarcador(j)} pts</span>
    </div>`).join('');
}

async function yhRenderRankingGlobal() {
  const el = document.getElementById('yh-ranking-global-list');
  if (!el) return;
  const pts = yhGetPuntsGlobals();
  const llista = YH_ORDRE.map(nom => ({ nom, mitjana: pts[nom] || 0 }))
    .sort((a, b) => b.mitjana - a.mitjana);
  const maxPts = llista[0]?.mitjana || 1;
  const posEmoji = ['🥇','🥈','🥉'];
  el.innerHTML = llista.map((r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
      <div class="ranking-pos ${i < 3 ? 'p'+(i+1) : 'other'}">${i < 3 ? posEmoji[i] : i+1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom] || ''}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div style="font-size:.7rem;color:var(--text2);margin-bottom:2px">mitjana</div>
        <div class="rank-barra-wrap"><div class="rank-barra" style="width:${Math.min(maxPts > 0 ? (r.mitjana/maxPts)*100 : 0, 100)}%"></div></div>
      </div>
      <div class="rank-punts" style="align-self:center;flex-shrink:0">${r.mitjana}</div>
    </div>`).join('');
}

// ── NOVA PARTIDA ──────────────────────────────────────────────
let yhJugadorsSeleccionats = new Set(YH_ORDRE);

function yhNovaPartida(docId) {
  yhDocId = docId;
  yhJugadorsSeleccionats = new Set(YH_ORDRE);
  mostraScreen('yahtzee-config');
  yhRenderConfig();
}

function yhRenderConfig() {
  const cont = document.getElementById('yahtzee-config-cont');
  if (!cont) return;
  const lletra = yhDocId === YH_DOC_A ? 'A' : 'B';
  cont.innerHTML = `
    <div class="trivial-config-wrap">
      <div class="joc-header-fila">
        <button class="mapa-back-btn" onclick="yhTornarInici()">← Tornar</button>
      </div>
      <div class="joc-titol-fila" style="align-items:center;width:100%;text-align:center;margin-bottom:1rem">
        <span class="joc-titol-emoji">🎲</span>
        <span class="joc-titol-text">Nova Partida ${lletra}</span>
      </div>
      <p style="font-size:.85rem;color:var(--text2);margin-bottom:1rem">
        Selecciona els jugadors que participen:
      </p>
      <div style="display:flex;flex-direction:column;gap:.5rem;margin-bottom:1.25rem">
        ${YH_ORDRE.map(nom => {
          const sel = yhJugadorsSeleccionats.has(nom);
          return `
            <div onclick="yhToggleJugador('${nom}')"
                 style="display:flex;align-items:center;gap:.75rem;
                        background:${sel ? 'rgba(106,171,122,.1)' : 'var(--bg2)'};
                        border:2px solid ${sel ? 'var(--verd2)' : 'var(--border)'};
                        border-radius:10px;padding:.55rem .75rem;cursor:pointer;transition:all .15s">
              <img src="${IMGS[nom] || ''}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid ${sel ? 'var(--verd2)' : 'var(--border)'}">
              <span style="flex:1;font-weight:600">${nom}</span>
              <span style="font-size:1.2rem">${sel ? '✅' : '⬜'}</span>
            </div>`;
        }).join('')}
      </div>
      <div style="font-size:.78rem;color:var(--text2);margin-bottom:1rem">
        ${yhJugadorsSeleccionats.size} jugador${yhJugadorsSeleccionats.size !== 1 ? 's' : ''} seleccionat${yhJugadorsSeleccionats.size !== 1 ? 's' : ''}
        (mínim 2)
      </div>
      <button class="trivial-btn-iniciar" onclick="yhIniciarPartida()">
        Iniciar partida 🎲
      </button>
    </div>`;
}

function yhToggleJugador(nom) {
  if (yhJugadorsSeleccionats.has(nom)) {
    if (yhJugadorsSeleccionats.size <= 2) { alert('Mínim 2 jugadors.'); return; }
    yhJugadorsSeleccionats.delete(nom);
  } else {
    yhJugadorsSeleccionats.add(nom);
  }
  yhRenderConfig();
}

async function yhIniciarPartida() {
  const pin = prompt("PIN d'administrador per iniciar partida:");
  if (pin !== '2468') { if (pin !== null) alert('PIN incorrecte.'); return; }

  if (yhJugadorsSeleccionats.size < 2) { alert('Mínim 2 jugadors.'); return; }

  const jugadorsOrdenats = YH_ORDRE.filter(nom => yhJugadorsSeleccionats.has(nom));
  const idxInici = Math.floor(Math.random() * jugadorsOrdenats.length);
  const ordre = [...jugadorsOrdenats.slice(idxInici), ...jugadorsOrdenats.slice(0, idxInici)];

  const jugadors = jugadorsOrdenats.map(nom => ({
    nom,
    marcador: yhMarcadorBuit(),
    tornActual: null,
  }));

  const partida = {
    activa: true,
    ordre,
    tornIdx: 0,
    ronda: 1,
    jugadors,
    acabada: false,
    ts: Date.now(),
  };

  try {
    await yhGetDb().collection(YH_COL).doc(yhDocId).set(partida);
    yhTornarInici();
  } catch(e) {
    console.error('Error creant partida Yahtzee:', e);
    alert('Error de connexió.');
  }
}

function yhMarcadorBuit() {
  const marc = {};
  [...YH_CATS_SUP, ...YH_CATS_INF].forEach(c => { marc[c.id] = null; });
  marc.yahtzeeExtra = 0; // comptador de Yahtzees addicionals
  return marc;
}

// ── ENTRAR / VEURE ────────────────────────────────────────────
async function yhEntrarPartida(docId) {
  yhDocId = docId;
  try {
    const snap = await yhGetDb().collection(YH_COL).doc(docId).get();
    if (!snap.exists) return;
    yhPartida = snap.data();
    yhEscoltarPartida();
    yhResetTorn();
    mostraScreen('yahtzee-joc');
    yhRenderJoc();
  } catch(e) { console.error(e); }
}

async function yhVeurePartida(docId) {
  yhDocId = docId;
  try {
    const snap = await yhGetDb().collection(YH_COL).doc(docId).get();
    if (!snap.exists) return;
    yhPartida = snap.data();
    yhEscoltarPartida();
    mostraScreen('yahtzee-veure');
    yhRenderVeure();
  } catch(e) { console.error(e); }
}

function yhEscoltarPartida() {
  if (yhUnsubscribe) yhUnsubscribe();
  yhUnsubscribe = yhGetDb().collection(YH_COL).doc(yhDocId).onSnapshot(snap => {
    if (!snap.exists) return;
    yhPartida = snap.data();
    const screen = document.querySelector('[id^="screen-yahtzee-"]:not([style*="none"])');
    if (!screen) return;
    const sid = screen.id.replace('screen-', '');
    if (sid === 'yahtzee-joc')   yhRenderJoc();
    if (sid === 'yahtzee-veure') yhRenderVeure();
  });
}

// ── RESET TORN LOCAL ──────────────────────────────────────────
function yhResetTorn() {
  yhDaus        = [0,0,0,0,0];
  yhBlocat      = [false,false,false,false,false];
  yhLlançaments = 0;
  yhSelCateg    = null;
}

// ── PANTALLA JOC ──────────────────────────────────────────────
function yhRenderJoc() {
  if (!yhPartida) return;
  const tornNom = yhGetTornActualNom(yhPartida);
  const esMeuTorn = tornNom === jugadorActiu;
  const jugData   = yhGetJugadorData(yhPartida, jugadorActiu);
  const tornData  = yhGetJugadorData(yhPartida, tornNom);
  const lletra    = yhDocId === YH_DOC_A ? 'A' : 'B';

  const cont = document.getElementById('yahtzee-joc-cont');
  if (!cont) return;

  // Si la partida ha acabat
  if (yhPartida.acabada) {
    yhRenderFinalPartida();
    return;
  }

  // Si no és el meu torn, mostro pantalla d'espera
  if (!esMeuTorn) {
    cont.innerHTML = `
      <div class="yh-wrap">
        <div class="yh-topbar">
          <button class="mapa-back-btn" onclick="yhSortir()">← Sortir</button>
          <div class="yh-topbar-title">Partida ${lletra} · Ronda ${yhPartida.ronda}/13</div>
          <button class="yh-btn-info" onclick="yhMostrarRegles()">📖</button>
        </div>
        <div class="yh-espera">
          <div class="yh-espera-icon">⏳</div>
          <div class="yh-espera-text">Torn de <strong>${tornNom}</strong></div>
          <div class="yh-espera-sub">Espera el teu torn per jugar</div>
          <div class="yh-espera-marcador">
            ${yhRenderMarcadorMini(jugData, jugadorActiu)}
          </div>
        </div>
        ${yhRenderRankingLateral()}
      </div>`;
    return;
  }

  // És el meu torn
  cont.innerHTML = `
    <div class="yh-wrap">
      <div class="yh-topbar">
        <button class="mapa-back-btn" onclick="yhSortir()">← Sortir</button>
        <div class="yh-topbar-title">Partida ${lletra} · Ronda ${yhPartida.ronda}/13</div>
        <button class="yh-btn-info" onclick="yhMostrarRegles()">📖</button>
      </div>

      <div class="yh-torn-wrap">
        <!-- Zona daus -->
        <div class="yh-daus-zona">
          <div class="yh-torn-cap">
            <div class="yh-torn-jugador">
              <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="yh-avatar">
              <span>${jugadorActiu} · Torn teu!</span>
            </div>
            <div class="yh-llançaments-badge">
              ${yhLlançaments === 0
                ? '🎲 Llança els daus'
                : yhLlançaments >= 3
                  ? '🚫 Últim llançament fet'
                  : `🎲 Llançament ${yhLlançaments}/3`}
            </div>
          </div>

          <div class="yh-daus-grid" id="yh-daus-grid">
            ${yhRenderDaus()}
          </div>

          <div class="yh-daus-accions">
            ${yhLlançaments < 3
              ? `<button class="yh-btn-llancar ${yhLlançaments > 0 ? 'secundari' : ''}" onclick="yhLlancar()">
                   ${yhLlançaments === 0 ? '🎲 Llança!' : '🎲 Torna a llançar'}
                   ${yhLlançaments > 0 ? '<span class="yh-resta-llanc">(' + (3-yhLlançaments) + ' restants)</span>' : ''}
                 </button>`
              : ''}
            ${yhLlançaments > 0
              ? `<button class="yh-btn-desblocar" onclick="yhDesblocarTots()">🔓 Desbloca tots</button>`
              : ''}
          </div>
        </div>

        <!-- Marcador / selecció categoria -->
        <div class="yh-marcador-zona">
          <div class="yh-marcador-titol">Selecciona on anotar:</div>
          ${yhRenderMarcadorSeleccio(jugData)}
        </div>
      </div>

      ${yhRenderRankingLateral()}
    </div>`;
}

function yhRenderDaus() {
  // Disseny de punts per a cada valor del dau (files x columnes 3x3)
  const puntsDau = {
    0: [],
    1: [[1,1]],
    2: [[0,0],[2,2]],
    3: [[0,0],[1,1],[2,2]],
    4: [[0,0],[0,2],[2,0],[2,2]],
    5: [[0,0],[0,2],[1,1],[2,0],[2,2]],
    6: [[0,0],[0,2],[1,0],[1,2],[2,0],[2,2]],
  };

  return yhDaus.map((val, i) => {
    const punts = val > 0 ? puntsDau[val] : [];
    const grid = Array(9).fill(false);
    punts.forEach(([r, c]) => { grid[r * 3 + c] = true; });

    const gridHTML = val > 0
      ? grid.map(actiu => `<div class="yh-dau-punt ${actiu ? 'actiu' : ''}"></div>`).join('')
      : '<div class="yh-dau-buit">🎲</div>';

    return `
      <div class="yh-dau ${yhBlocat[i] ? 'yh-dau-blocat' : ''} ${yhLlançaments === 0 ? 'yh-dau-inactiu' : ''}"
           onclick="${yhLlançaments > 0 && yhLlançaments < 3 ? 'yhToggleDau(' + i + ')' : ''}">
        <div class="yh-dau-grid">${gridHTML}</div>
        ${yhBlocat[i] ? '<span class="yh-dau-pin">📌</span>' : ''}
      </div>`;
  }).join('');
}

function yhRenderMarcadorSeleccio(jugData) {
  if (!jugData) return '';
  if (yhLlançaments === 0) {
    return '<div class="yh-marc-hint">Primer has de llançar els daus</div>';
  }

  const marc = jugData.marcador || yhMarcadorBuit();
  const sumaSup = YH_CATS_SUP.reduce((s, c) => s + (marc[c.id] || 0), 0);
  const bonusSup = sumaSup >= 63 ? YH_BONUS_SUP : 0;
  const faltaBonusSup = Math.max(0, 63 - sumaSup);

  return `
    <div class="yh-marcador">
      <div class="yh-marc-seccio-titol">
        Secció superior
        <span class="yh-marc-suma">${sumaSup}/63
          ${bonusSup > 0
            ? '<span class="yh-bonus-assolit">+35 bonus ✓</span>'
            : faltaBonusSup > 0
              ? `<span class="yh-bonus-falta">falten ${faltaBonusSup} pel bonus</span>`
              : ''}
        </span>
      </div>
      ${YH_CATS_SUP.map(c => yhRenderFilaMarcador(c, marc, jugData)).join('')}

      <div class="yh-marc-seccio-titol" style="margin-top:.5rem">Secció inferior</div>
      ${YH_CATS_INF.map(c => yhRenderFilaMarcador(c, marc, jugData)).join('')}

      ${marc.yahtzeeExtra > 0
        ? `<div class="yh-marc-extra">🎯 Yahtzee extra ×${marc.yahtzeeExtra} = +${marc.yahtzeeExtra * YH_BONUS_YAHTZEE_EXTRA} pts</div>`
        : ''}

      <div class="yh-marc-total">
        Total: <strong>${yhTotalMarcador(jugData)} pts</strong>
      </div>

      ${yhSelCateg !== null
        ? `<button class="yh-btn-confirmar" onclick="yhConfirmarCategoria()">
             ✅ Confirma: ${[...YH_CATS_SUP,...YH_CATS_INF].find(c=>c.id===yhSelCateg)?.label}
             (${yhCalcularPunts(yhSelCateg, yhDaus)} pts)
           </button>`
        : '<div class="yh-marc-hint">Toca una categoria per anotar-hi</div>'}
    </div>`;
}

function yhRenderFilaMarcador(cat, marc, jugData) {
  const ocupat = marc[cat.id] !== null && marc[cat.id] !== undefined;
  const puntsPrevistos = !ocupat && yhLlançaments > 0 ? yhCalcularPunts(cat.id, yhDaus) : null;
  const selec = yhSelCateg === cat.id;

  return `
    <div class="yh-marc-fila ${ocupat ? 'yh-marc-ocupat' : 'yh-marc-lliure'} ${selec ? 'yh-marc-selec' : ''}"
         onclick="${!ocupat && yhLlançaments > 0 ? 'yhSeleccionarCategoria(\'' + cat.id + '\')' : ''}">
      <span class="yh-marc-emoji">${cat.emoji}</span>
      <span class="yh-marc-label">${cat.label}</span>
      <span class="yh-marc-pts">
        ${ocupat
          ? `<strong>${marc[cat.id]}</strong>`
          : puntsPrevistos !== null
            ? `<span class="yh-marc-previs ${puntsPrevistos > 0 ? 'positiu' : 'zero'}">${puntsPrevistos > 0 ? '+'+puntsPrevistos : '0'}</span>`
            : '—'}
      </span>
    </div>`;
}

function yhRenderMarcadorMini(jugData, nom) {
  if (!jugData) return '';
  const total = yhTotalMarcador(jugData);
  const completades = Object.values(jugData.marcador || {}).filter(v => v !== null && v !== undefined && typeof v === 'number').length;
  return `
    <div class="yh-marcador-mini">
      <div class="yh-mm-nom">${nom}</div>
      <div class="yh-mm-pts">${total} pts</div>
      <div class="yh-mm-prog">${completades - 1}/13 categories</div>
    </div>`;
}

function yhRenderRankingLateral() {
  if (!yhPartida) return '';
  const sorted = [...(yhPartida.jugadors || [])].sort((a, b) => yhTotalMarcador(b) - yhTotalMarcador(a));
  const posEmoji = ['🥇','🥈','🥉'];
  return `
    <div class="yh-ranking-lateral">
      <div class="yh-rl-titol">Marcador</div>
      ${sorted.map((j, i) => `
        <div class="yh-rl-fila ${j.nom === jugadorActiu ? 'actiu' : ''}">
          <span class="yh-rl-pos">${i < 3 ? posEmoji[i] : i+1}</span>
          <img class="yh-rl-avatar" src="${IMGS[j.nom] || ''}" alt="${j.nom}">
          <span class="yh-rl-nom">${j.nom}</span>
          <span class="yh-rl-pts">${yhTotalMarcador(j)}</span>
        </div>`).join('')}
    </div>`;
}

// ── ACCIONS DEL JOC ───────────────────────────────────────────
function yhLlancar() {
  if (yhLlançaments >= 3) return;
  // Primer llançament: llança tots; posteriors: només els no blocats
  for (let i = 0; i < 5; i++) {
    if (yhLlançaments === 0 || !yhBlocat[i]) {
      yhDaus[i] = Math.floor(Math.random() * 6) + 1;
    }
  }
  yhLlançaments++;
  yhSelCateg = null;
  yhRenderJoc();
}

function yhToggleDau(i) {
  if (yhLlançaments === 0 || yhLlançaments >= 3) return;
  yhBlocat[i] = !yhBlocat[i];
  const daus = document.querySelectorAll('.yh-dau');
  if (daus[i]) {
    daus[i].classList.toggle('yh-dau-blocat', yhBlocat[i]);
    const pin = daus[i].querySelector('.yh-dau-pin');
    if (pin) pin.style.display = yhBlocat[i] ? '' : 'none';
  }
}

function yhDesblocarTots() {
  yhBlocat = [false,false,false,false,false];
  yhRenderJoc();
}

function yhSeleccionarCategoria(catId) {
  if (yhLlançaments === 0) return;
  yhSelCateg = (yhSelCateg === catId) ? null : catId;
  yhRenderJoc();
}

async function yhConfirmarCategoria() {
  if (!yhSelCateg || yhLlançaments === 0 || !yhPartida) return;

  const tornNom = yhGetTornActualNom(yhPartida);
  if (tornNom !== jugadorActiu) return;

  const punts = yhCalcularPunts(yhSelCateg, yhDaus);
  const jugadors = yhPartida.jugadors.map(j => {
    if (j.nom !== jugadorActiu) return j;
    const marc = { ...(j.marcador || yhMarcadorBuit()) };
    marc[yhSelCateg] = punts;

    // Yahtzee extra
    if (yhSelCateg !== 'yahtzee' && yhEsYahtzee(yhDaus) && marc['yahtzee'] !== null) {
      marc.yahtzeeExtra = (marc.yahtzeeExtra || 0) + 1;
    }
    return { ...j, marcador: marc };
  });

  // Avançar torn
  const nouTornIdx = (yhPartida.tornIdx + 1) % yhPartida.ordre.length;
  const novaRonda = nouTornIdx === 0 ? yhPartida.ronda + 1 : yhPartida.ronda;

  // Comprovar si la partida ha acabat (ronda 14 = totes les categories plenes)
  const jugadorActualitzat = jugadors.find(j => j.nom === jugadorActiu);
  const totesPlenes = jugadors.every(j =>
    [...YH_CATS_SUP, ...YH_CATS_INF].every(c => j.marcador[c.id] !== null && j.marcador[c.id] !== undefined)
  );

  const acabada = totesPlenes;

  try {
    await yhGetDb().collection(YH_COL).doc(yhDocId).update({
      jugadors,
      tornIdx: acabada ? yhPartida.tornIdx : nouTornIdx,
      ronda: acabada ? yhPartida.ronda : novaRonda,
      acabada,
    });

    if (acabada) {
      yhGuardarPuntsLocals(jugadors);
    }

    yhResetTorn();
    // Si acabada, mostrar final; si no, tornar a l'inici
    if (acabada) {
      yhPartida = { ...yhPartida, jugadors, acabada: true };
      yhRenderFinalPartida();
    } else {
      yhSortir();
    }
  } catch(e) {
    console.error('Error confirmant categoria:', e);
    alert('Error de connexió.');
  }
}

// ── FINAL DE PARTIDA ──────────────────────────────────────────
function yhRenderFinalPartida() {
  const cont = document.getElementById('yahtzee-joc-cont');
  if (!cont || !yhPartida) return;

  const sorted = [...yhPartida.jugadors].sort((a, b) => yhTotalMarcador(b) - yhTotalMarcador(a));
  const guanyador = sorted[0];
  const posEmoji = ['🥇','🥈','🥉'];

  cont.innerHTML = `
    <div class="yh-wrap">
      <div class="yh-final">
        <div class="yh-final-icon">🎲</div>
        <div class="yh-final-titol">Partida acabada!</div>
        <div class="yh-final-guanyador">
          🏆 ${guanyador.nom} guanya amb ${yhTotalMarcador(guanyador)} pts!
        </div>
        <div class="yh-final-ranking">
          ${sorted.map((j, i) => `
            <div class="yh-final-fila ${j.nom === jugadorActiu ? 'actiu' : ''}">
              <span>${i < 3 ? posEmoji[i] : i+1}</span>
              <img src="${IMGS[j.nom]||''}" alt="${j.nom}" class="yh-rl-avatar">
              <span style="flex:1">${j.nom}</span>
              <span style="font-weight:700">${yhTotalMarcador(j)} pts</span>
            </div>`).join('')}
        </div>
        <div class="pm-modal-btns" style="margin-top:1rem">
          <button class="snake-btn-start" onclick="yhAdminPartida('${yhDocId}')">Nova partida</button>
          <button class="pm-btn-sortir" onclick="yhSortir()">← Tornar</button>
        </div>
      </div>
    </div>`;
}

// ── PANTALLA VEURE ────────────────────────────────────────────
function yhRenderVeure() {
  const cont = document.getElementById('yahtzee-veure-cont');
  if (!cont || !yhPartida) return;
  const tornNom = yhGetTornActualNom(yhPartida);
  const lletra = yhDocId === YH_DOC_A ? 'A' : 'B';

  cont.innerHTML = `
    <div style="padding:1rem">
      <div style="font-size:.85rem;color:var(--text2);margin-bottom:.75rem">
        Partida ${lletra} · Ronda ${yhPartida.ronda}/13 · Torn de <strong>${tornNom}</strong>
      </div>
      <div style="display:flex;flex-direction:column;gap:.5rem">
        ${[...yhPartida.jugadors].sort((a,b)=>yhTotalMarcador(b)-yhTotalMarcador(a)).map((j,i) => `
          <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:.6rem .8rem;display:flex;align-items:center;gap:.6rem">
            <img src="${IMGS[j.nom]||''}" style="width:32px;height:32px;border-radius:50%;object-fit:cover">
            <span style="flex:1;font-weight:600">${j.nom}</span>
            <span style="color:var(--verd2);font-weight:700">${yhTotalMarcador(j)} pts</span>
          </div>`).join('')}
      </div>
    </div>`;
}

// ── ADMIN ─────────────────────────────────────────────────────
async function yhAdminPartida(docId) {
  const pin = prompt("PIN d'administrador:");
  if (pin !== '2468') { if (pin !== null) alert('PIN incorrecte.'); return; }
  if (!confirm('Vols iniciar una nova partida? (esborra l\'actual)')) return;
  yhDocId = docId;
  yhJugadorsSeleccionats = new Set(YH_ORDRE);
  mostraScreen('yahtzee-config');
  yhRenderConfig();
}

// ── CÀLCUL DE PUNTS ───────────────────────────────────────────
function yhCalcularPunts(catId, daus) {
  const freq = [0,0,0,0,0,0,0]; // freq[1..6]
  daus.forEach(d => { if (d > 0) freq[d]++; });
  const suma = daus.reduce((s, d) => s + d, 0);

  switch(catId) {
    case 'uns':     return freq[1] * 1;
    case 'dos':     return freq[2] * 2;
    case 'tres':    return freq[3] * 3;
    case 'quatres': return freq[4] * 4;
    case 'cincs':   return freq[5] * 5;
    case 'sises':   return freq[6] * 6;
    case 'trio':    return freq.some(f => f >= 3) ? suma : 0;
    case 'poker':   return freq.some(f => f >= 4) ? suma : 0;
    case 'full': {
      const tresIg = freq.some(f => f === 3);
      const dosIg  = freq.some(f => f === 2);
      return (tresIg && dosIg) ? 25 : 0;
    }
    case 'escala4': {
      const unics = [...new Set(daus)].sort((a,b)=>a-b);
      for (let i = 0; i <= unics.length - 4; i++) {
        if (unics[i+3] - unics[i] === 3 &&
            unics[i+1] - unics[i] === 1 &&
            unics[i+2] - unics[i+1] === 1 &&
            unics[i+3] - unics[i+2] === 1) return 30;
      }
      return 0;
    }
    case 'escala5': {
      const unics = [...new Set(daus)].sort((a,b)=>a-b);
      if (unics.length === 5 && unics[4] - unics[0] === 4) return 40;
      return 0;
    }
    case 'yahtzee': return yhEsYahtzee(daus) ? 50 : 0;
    case 'atzar':   return suma;
    default:        return 0;
  }
}

function yhEsYahtzee(daus) {
  return daus[0] > 0 && daus.every(d => d === daus[0]);
}

// ── TOTAL MARCADOR ────────────────────────────────────────────
function yhTotalMarcador(jugData) {
  if (!jugData || !jugData.marcador) return 0;
  const marc = jugData.marcador;

  // Suma superior
  const sumaSup = YH_CATS_SUP.reduce((s, c) => s + (marc[c.id] || 0), 0);
  const bonusSup = sumaSup >= 63 ? YH_BONUS_SUP : 0;

  // Suma inferior
  const sumaInf = YH_CATS_INF.reduce((s, c) => s + (marc[c.id] || 0), 0);

  // Yahtzee extra
  const yahtzeeExtra = (marc.yahtzeeExtra || 0) * YH_BONUS_YAHTZEE_EXTRA;

  return sumaSup + bonusSup + sumaInf + yahtzeeExtra;
}

// ── UTILITATS ─────────────────────────────────────────────────
function yhGetTornActualNom(p) {
  if (!p || !p.ordre) return '';
  return p.ordre[p.tornIdx % p.ordre.length];
}

function yhGetJugadorData(p, nom) {
  if (!p || !p.jugadors) return null;
  return p.jugadors.find(j => j.nom === nom) || null;
}

// ── NAVEGACIÓ ─────────────────────────────────────────────────
function yhSortir() {
  if (yhUnsubscribe) { yhUnsubscribe(); yhUnsubscribe = null; }
  yhResetTorn();
  mostraScreen('yahtzee-inici');
  yhCarregarInici();
}

function yhTornarInici() {
  mostraScreen('yahtzee-inici');
  yhCarregarInici();
}

// ── REGLES ────────────────────────────────────────────────────
function yhMostrarRegles() {
  const overlay = document.createElement('div');
  overlay.className = 'yh-regles-overlay';
  overlay.innerHTML = `
    <div class="yh-regles-modal">
      <div class="yh-regles-cap">
        <div class="yh-regles-titol">📖 Regles del Yahtzee</div>
        <button class="yh-regles-tancar" onclick="this.closest('.yh-regles-overlay').remove()">✕</button>
      </div>
      <div class="yh-regles-cos">
        <div class="yh-regles-seccio">
          <div class="yh-regles-sub">🎲 Funcionament bàsic</div>
          <p>Cada torn tens fins a <strong>3 llançaments</strong> de 5 daus. Després de cada llançament pots <strong>fixar</strong> els daus que vulguis conservar (toca'ls). Al final, has d'anotar la tirada en una de les 13 categories del marcador.</p>
          <p>Cada categoria es pot usar <strong>una sola vegada</strong>. Si la tirada no serveix per cap categoria, n'has de tachar una (0 punts). La partida acaba quan tots els jugadors han omplert les 13 categories.</p>
        </div>

        <div class="yh-regles-seccio">
          <div class="yh-regles-sub">🔼 Secció superior (1-6)</div>
          <table class="yh-regles-taula">
            <tr><th>Categoria</th><th>Com puntua</th><th>Màxim</th></tr>
            <tr><td>1️⃣ Uns</td><td>Suma de tots els 1</td><td>5</td></tr>
            <tr><td>2️⃣ Dosos</td><td>Suma de tots els 2</td><td>10</td></tr>
            <tr><td>3️⃣ Tresos</td><td>Suma de tots els 3</td><td>15</td></tr>
            <tr><td>4️⃣ Quatres</td><td>Suma de tots els 4</td><td>20</td></tr>
            <tr><td>5️⃣ Cincs</td><td>Suma de tots els 5</td><td>25</td></tr>
            <tr><td>6️⃣ Sisos</td><td>Suma de tots els 6</td><td>30</td></tr>
            <tr class="yh-regles-bonus"><td colspan="2">🎁 <strong>Bonus</strong> si suma ≥ 63</td><td><strong>+35</strong></td></tr>
          </table>
          <p style="font-size:.78rem;color:var(--text2)">Per obtenir el bonus cal fer de mitjana 3 daus per categoria (3+6+9+12+15+18 = 63).</p>
        </div>

        <div class="yh-regles-seccio">
          <div class="yh-regles-sub">🔽 Secció inferior</div>
          <table class="yh-regles-taula">
            <tr><th>Categoria</th><th>Condició</th><th>Punts</th></tr>
            <tr><td>🎲 Trio</td><td>3 daus iguals</td><td>Suma tots</td></tr>
            <tr><td>🎰 Pòquer</td><td>4 daus iguals</td><td>Suma tots</td></tr>
            <tr><td>🏠 Full</td><td>3 iguals + 2 iguals</td><td>25</td></tr>
            <tr><td>📈 Escala petita</td><td>4 consecutius (ex: 1-2-3-4)</td><td>30</td></tr>
            <tr><td>📊 Escala gran</td><td>5 consecutius (ex: 2-3-4-5-6)</td><td>40</td></tr>
            <tr><td>🎯 Yahtzee!</td><td>5 daus iguals</td><td>50</td></tr>
            <tr><td>🌀 Atzar</td><td>Qualsevol tirada</td><td>Suma tots</td></tr>
          </table>
        </div>

        <div class="yh-regles-seccio">
          <div class="yh-regles-sub">🎯 Yahtzee extra</div>
          <p>Si ja has anotat 50 pts al Yahtzee i tornes a fer 5 daus iguals, guanyes <strong>+100 pts de bonus</strong> per cada Yahtzee addicional. Has d'anotar la tirada en una altra categoria (si pots).</p>
        </div>

        <div class="yh-regles-seccio">
          <div class="yh-regles-sub">🏆 Puntuació màxima teòrica</div>
          <p>Secció superior màx: 105 pts + bonus 35 = <strong>140 pts</strong><br>
          Secció inferior màx: 25+30+40+50+suma màx trio+pòquer+atzar ≈ <strong>375 pts</strong><br>
          Puntuació perfecta: <strong>~575 pts</strong> (molt difícil d'assolir)</p>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

// ── PERSISTÈNCIA LOCAL (per rànquing global) ──────────────────
function yhGuardarPuntsLocals(jugadors) {
  jugadors.forEach(j => {
    try {
      const raw = localStorage.getItem(YH_LS_KEY + j.nom);
      const estat = raw ? JSON.parse(raw) : { partides: 0, puntsTotals: 0 };
      estat.partides++;
      estat.puntsTotals += yhTotalMarcador(j);
      localStorage.setItem(YH_LS_KEY + j.nom, JSON.stringify(estat));
    } catch(e) {}
  });
}

function yhGetPuntsGlobals() {
  const pts = {};
  YH_ORDRE.forEach(nom => {
    try {
      const raw = localStorage.getItem(YH_LS_KEY + nom);
      if (!raw) { pts[nom] = 0; return; }
      const estat = JSON.parse(raw);
      pts[nom] = estat.partides > 0 ? Math.round(estat.puntsTotals / estat.partides) : 0;
    } catch(e) { pts[nom] = 0; }
  });
  return pts;
}
