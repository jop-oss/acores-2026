// ══════════════════════════════════════════════════════════════
//  GIN RUMMY — Açores 2026
//  Baralla espanyola 48 cartes (1-12 × 4 pals) + 2 comodins
//  1 jugador vs IA · 3 dificultats (×1/×1.5/×2)
//  Rànquing: partides + punts totals + mitjana
//  localStorage: ginrummy_estat_Nom
// ══════════════════════════════════════════════════════════════

// ── CONSTANTS ─────────────────────────────────────────────────

const GR_PALS = ['oros', 'copes', 'espases', 'bastos'];
const GR_PAL_SIMBOL = { oros: '🟡', copes: '🔴', espases: '🔵', bastos: '🟢' };
const GR_PAL_NOM    = { oros: 'Oros', copes: 'Copes', espases: 'Espases', bastos: 'Bastos' };

const GR_CONFIG = {
  facil:   { label: 'Fàcil',   emoji: '😊', multiplicador: 1.0,
             desc: 'La IA juga quasi aleatòriament', iaNivell: 'facil' },
  mitja:   { label: 'Mitjà',   emoji: '🧠', multiplicador: 1.5,
             desc: 'La IA forma melds però no bloqueja', iaNivell: 'mitja' },
  dificil: { label: 'Difícil', emoji: '🔥', multiplicador: 2.0,
             desc: "La IA vigila les teves descartades", iaNivell: 'dificil' },
};

// ── ESTAT ─────────────────────────────────────────────────────
let grDificultat  = 'facil';
let grBaralla     = [];
let grMaJugador   = [];
let grMaIa        = [];
let grPilaMunt    = [];
let grPilaDesc    = [];
let grTorn        = 'jugador';
let grFase        = 'agafar';
let grActiu       = false;
let grCartaSelec  = null;
let grIaDesc      = [];

// ── VALOR / NOM ───────────────────────────────────────────────
function grValorCarta(carta) {
  if (carta.esComodi) return 0;
  if (carta.num >= 10) return 10;
  return carta.num;
}

function grNomNumero(n) {
  if (n === 1) return 'A';
  return String(n);
}

function grRenderCartaContingut(carta) {
  if (carta.esComodi) {
    return '<span class="gr-carta-sym">🃏</span>';
  }
  const s = GR_PAL_SIMBOL[carta.pal];
  return `<span class="gr-carta-top-sym">${s}</span><span class="gr-carta-num">${grNomNumero(carta.num)}</span><span class="gr-carta-bot-sym">${s}</span>`;
}

function grNomCarta(carta) {
  if (carta.esComodi) return 'Comodi 🃏';
  return `${grNomNumero(carta.num)} de ${GR_PAL_NOM[carta.pal]}`;
}

function grRenderCartaMini(carta) {
  if (carta.esComodi) return '🃏';
  return `${GR_PAL_SIMBOL[carta.pal]}${grNomNumero(carta.num)}`;
}

// ── PUNT D'ENTRADA ────────────────────────────────────────────
async function iniciarGinRummy() {
  mostraScreen('ginrummy-inici');
  document.getElementById('ginrummy-inici-cont').innerHTML = '<div class="joc-carregant">Carregant…</div>';
  await jocFsCarregarTots(GR_COL, JUGADORS_VALIDS);
  grRenderInici();
}

// ── PANTALLA D'INICI ──────────────────────────────────────────
function grRenderInici() {
  const estat = grGetEstat(jugadorActiu);
  document.getElementById('ginrummy-inici-cont').innerHTML = `
    <div class="snake-inici-wrap">
      <div class="snake-inici-main">
        <div class="joc-header-fila">
          <button class="mapa-back-btn" onclick="mostraScreen('joc-selector')">← Tornar</button>
        </div>
        <div class="joc-titol-fila" style="align-items:center;width:100%;text-align:center;">
          <span class="joc-titol-emoji">🃏</span>
          <span class="joc-titol-text">Gin Rummy</span>
        </div>
        <div class="snake-jugador-info">
          <img src="${IMGS[jugadorActiu]}" alt="${jugadorActiu}" class="snake-avatar">
          <div>
            <div class="snake-jugador-nom">${jugadorActiu}</div>
            <div class="snake-jugador-sub">
              ${estat.partides > 0
                ? `${estat.partides} partides · mitjana ${grMitjana(estat)} pts`
                : 'Cap partida jugada encara'}
            </div>
          </div>
        </div>
        <div class="pm-dif-selector">
          ${Object.entries(GR_CONFIG).map(([key, cfg]) => `
            <button class="pm-dif-btn ${grDificultat === key ? 'actiu' : ''}"
                    onclick="grTriarDificultat('${key}', this)">
              <span class="pm-dif-emoji">${cfg.emoji}</span>
              <span class="pm-dif-label">${cfg.label}
                <span style="opacity:.6;font-size:.75rem;margin-left:.3rem">x${cfg.multiplicador}</span>
              </span>
              <span class="pm-dif-info">${cfg.desc}</span>
              <span class="pm-dif-millor">
                ${estat.difs[key]
                  ? `${estat.difs[key].partides} partides · millor ${estat.difs[key].millor} pts`
                  : '—'}
              </span>
            </button>`).join('')}
        </div>
        <div class="snake-instruccions">
          <p>Forma <strong>melds</strong> amb les 10 cartes per minimitzar el <em>deadwood</em>.</p>
          <ul class="snake-controls-llista">
            <li>📐 <strong>Escala</strong>: 3+ cartes del mateix pal en sequencia</li>
            <li>🔢 <strong>Grup</strong>: 3-4 cartes del mateix numero</li>
            <li>🃏 <strong>Comodi</strong>: substitueix qualsevol carta (0 pts deadwood)</li>
            <li>🥃 <strong>Gin</strong>: tanca amb 0 deadwood → +25 pts bonus</li>
            <li>✊ <strong>Knock</strong>: tanca quan tens 10 pts o menys de deadwood</li>
          </ul>
        </div>
        <button class="snake-btn-start" onclick="grComençar()">Comença 🃏</button>
      </div>
      <div class="ranking-wrap">
        <div class="ranking-title">🏅 Ranquing Gin Rummy</div>
        <div class="ranking-list-home" id="gr-ranking-list">${grRenderRankingHTML()}</div>
      </div>
    </div>`;
}

function grTriarDificultat(key, btn) {
  grDificultat = key;
  document.querySelectorAll('.pm-dif-btn').forEach(b => b.classList.remove('actiu'));
  btn.classList.add('actiu');
}

// ── BARALLA ───────────────────────────────────────────────────
function grCrearBaralla() {
  const b = [];
  for (const pal of GR_PALS) {
    for (let n = 1; n <= 12; n++) {
      b.push({ pal, num: n, esComodi: false, id: pal + '_' + n });
    }
  }
  b.push({ pal: 'comodi', num: 0, esComodi: true, id: 'comodi_1' });
  b.push({ pal: 'comodi', num: 0, esComodi: true, id: 'comodi_2' });
  return grBarrejar(b);
}

function grBarrejar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── ORDENACIÓ AUTOMÀTICA DE LA MÀ ────────────────────────────
// Ordena per pal (oros, copes, espases, bastos, comodí) i dins del pal per número
const GR_ORDRE_PALS = { oros: 0, copes: 1, espases: 2, bastos: 3, comodi: 4 };

function grOrdenarMa(ma) {
  return [...ma].sort((a, b) => {
    const pa = GR_ORDRE_PALS[a.pal] ?? 4;
    const pb = GR_ORDRE_PALS[b.pal] ?? 4;
    if (pa !== pb) return pa - pb;
    return a.num - b.num;
  });
}
function grComençar() {
  mostraScreen('ginrummy-joc');
  grBaralla    = grCrearBaralla();
  grMaJugador  = [];
  grMaIa       = [];
  grPilaDesc   = [];
  grIaDesc     = [];
  grCartaSelec = null;
  grTorn       = 'jugador';
  grFase       = 'agafar';
  grActiu      = true;

  for (let i = 0; i < 10; i++) {
    grMaJugador.push(grBaralla.pop());
    grMaIa.push(grBaralla.pop());
  }
  grPilaDesc.push(grBaralla.pop());
  grPilaMunt = grBaralla;
  grMaJugador = grOrdenarMa(grMaJugador);

  grRenderJoc();
}

// ── RENDER PRINCIPAL ──────────────────────────────────────────
function grRenderJoc() {
  const dw      = grCalcularDeadwood(grMaJugador);
  const enMeld  = new Set(dw.meldsIdx.flat());
  const descTop = grPilaDesc.length > 0 ? grPilaDesc[grPilaDesc.length - 1] : null;

  // GIN/KNOCK es calcula sobre les 10 cartes que quedaran després de descartar la seleccionada
  let potGin = false, potKnock = false;
  if (grFase === 'descartar' && grTorn === 'jugador' && grCartaSelec !== null) {
    const maPostDesc = grMaJugador.filter((_, i) => i !== grCartaSelec);
    const dwPost = grCalcularDeadwood(maPostDesc);
    potGin   = dwPost.total === 0;
    potKnock = dwPost.total > 0 && dwPost.total <= 10;
  }

  document.getElementById('ginrummy-joc-cont').innerHTML = `
    <div class="gr-wrap">
      <div class="gr-topbar">
        <button class="snake-btn-back" onclick="grSortir()">← Tornar</button>
        <div class="gr-torn-badge" id="gr-torn-badge">
          ${grTorn === 'ia'
            ? '🤖 Torn de la IA...'
            : grFase === 'agafar' ? '🃏 Agafa una carta' : '🗑️ Descarta una carta'}
        </div>
        <div class="gr-munt-badge">🂠 ${grPilaMunt.length}</div>
      </div>

      <div class="gr-seccio gr-seccio-ia">
        <div class="gr-seccio-cap">
          <span>🤖 IA</span>
          <span class="gr-num-cartes">${grMaIa.length} cartes</span>
        </div>
        <div class="gr-ma gr-ma-ia">
          ${grMaIa.map(() => '<div class="gr-carta gr-dorso">🂠</div>').join('')}
        </div>
      </div>

      <div class="gr-central">
        <div class="gr-pila-bloc">
          <div class="gr-pila-etiq">Munt</div>
          <div class="gr-carta gr-dorso${grFase === 'agafar' && grTorn === 'jugador' && grPilaMunt.length > 0 ? ' gr-clicable' : ''}"
               onclick="${grFase === 'agafar' && grTorn === 'jugador' ? 'grAgafarMunt()' : ''}">
            🂠
          </div>
          <div class="gr-pila-count">${grPilaMunt.length}</div>
        </div>
        <div class="gr-pila-bloc">
          <div class="gr-pila-etiq">Descart</div>
          ${descTop
            ? `<div class="gr-carta gr-carta-${descTop.pal}${grFase === 'agafar' && grTorn === 'jugador' ? ' gr-clicable' : ''}"
                    onclick="${grFase === 'agafar' && grTorn === 'jugador' ? 'grAgafarDesc()' : ''}">
                 ${grRenderCartaContingut(descTop)}
               </div>`
            : '<div class="gr-carta gr-carta-buida">—</div>'}
          <div class="gr-pila-count">${grPilaDesc.length}</div>
        </div>
      </div>

      <div class="gr-seccio gr-seccio-jugador">
        <div class="gr-seccio-cap">
          <span>👤 ${jugadorActiu}</span>
          <span class="gr-dw-badge">Deadwood: <strong>${dw.total}</strong> pts</span>
        </div>
        <div class="gr-ma gr-ma-jugador" id="gr-ma-jugador">
          ${grMaJugador.map((carta, i) => `
            <div class="gr-carta gr-carta-${carta.pal}${enMeld.has(i) ? ' gr-en-meld' : ''}${grCartaSelec === i ? ' gr-seleccionada' : ''}${grFase === 'descartar' && grTorn === 'jugador' ? ' gr-clicable' : ''}"
                 onclick="${grFase === 'descartar' && grTorn === 'jugador' ? 'grSeleccionarCarta(' + i + ')' : ''}">
              ${grRenderCartaContingut(carta)}
            </div>`).join('')}
        </div>
      </div>

      <div class="gr-accions" id="gr-accions">
        ${grTorn === 'jugador' && grFase === 'descartar' ? `
          <div class="gr-btns-fila">
            ${grCartaSelec !== null
              ? `<button class="gr-btn gr-btn-desc" onclick="grDescartar()">
                   🗑️ Descarta: ${grNomCarta(grMaJugador[grCartaSelec])}
                 </button>`
              : '<div class="gr-hint">Toca una carta per seleccionar-la i descartar-la</div>'}
            ${potGin
              ? '<button class="gr-btn gr-btn-gin" onclick="grTancarGin()">🥃 GIN! (0 deadwood)</button>'
              : potKnock
                ? `<button class="gr-btn gr-btn-knock" onclick="grTancarKnock()">✊ KNOCK (${dw.total} pts)</button>`
                : ''}
          </div>
        ` : grTorn === 'jugador' && grFase === 'agafar' ? `
          <div class="gr-hint">Toca el <strong>munt</strong> 🂠 o el <strong>descart</strong> per agafar una carta</div>
        ` : ''}
      </div>
    </div>`;
}

// ── ACCIONS DEL JUGADOR ───────────────────────────────────────
function grAgafarMunt() {
  if (grFase !== 'agafar' || grTorn !== 'jugador' || !grActiu) return;
  if (grPilaMunt.length === 0) {
    grRepartirDescAMunt();
    if (grPilaMunt.length === 0) return;
  }
  grMaJugador.push(grPilaMunt.pop());
  grMaJugador = grOrdenarMa(grMaJugador);
  grFase = 'descartar';
  grCartaSelec = null;
  grRenderJoc();
}

function grAgafarDesc() {
  if (grFase !== 'agafar' || grTorn !== 'jugador' || !grActiu) return;
  if (grPilaDesc.length === 0) return;
  grMaJugador.push(grPilaDesc.pop());
  grMaJugador = grOrdenarMa(grMaJugador);
  grFase = 'descartar';
  grCartaSelec = null;
  grRenderJoc();
}

function grSeleccionarCarta(idx) {
  if (grFase !== 'descartar' || grTorn !== 'jugador' || !grActiu) return;
  grCartaSelec = (grCartaSelec === idx) ? null : idx;

  document.querySelectorAll('.gr-ma-jugador .gr-carta').forEach((el, i) => {
    el.classList.toggle('gr-seleccionada', i === grCartaSelec);
  });

  // Calcula deadwood sobre les 10 cartes que quedaran després de descartar la seleccionada
  let potGin = false, potKnock = false, dwPostTotal = 0;
  if (grCartaSelec !== null) {
    const maPostDesc = grMaJugador.filter((_, i) => i !== grCartaSelec);
    const dwPost = grCalcularDeadwood(maPostDesc);
    dwPostTotal = dwPost.total;
    potGin   = dwPost.total === 0;
    potKnock = dwPost.total > 0 && dwPost.total <= 10;
  }

  const accions = document.getElementById('gr-accions');
  if (!accions) return;

  accions.innerHTML = `
    <div class="gr-btns-fila">
      ${grCartaSelec !== null
        ? `<button class="gr-btn gr-btn-desc" onclick="grDescartar()">
             🗑️ Descarta: ${grNomCarta(grMaJugador[grCartaSelec])}
           </button>`
        : '<div class="gr-hint">Toca una carta per seleccionar-la i descartar-la</div>'}
      ${potGin
        ? '<button class="gr-btn gr-btn-gin" onclick="grTancarGin()">🥃 GIN! (0 deadwood)</button>'
        : potKnock
          ? `<button class="gr-btn gr-btn-knock" onclick="grTancarKnock()">✊ KNOCK (${dwPostTotal} pts)</button>`
          : ''}
    </div>`;
}

function grDescartar() {
  if (grCartaSelec === null || !grActiu) return;
  const carta = grMaJugador.splice(grCartaSelec, 1)[0];
  grPilaDesc.push(carta);
  grIaDesc.push(carta);
  grCartaSelec = null;
  grFase = 'agafar';
  grTorn = 'ia';
  grRenderJoc();
  window._grIaTimeout = setTimeout(() => grTornIa(), 1400);
}

function grTancarGin() {
  if (!grActiu || grCartaSelec === null) return;
  const maPostDesc = grMaJugador.filter((_, i) => i !== grCartaSelec);
  if (grCalcularDeadwood(maPostDesc).total !== 0) return;
  // Descarta la carta seleccionada i tanca
  const carta = grMaJugador.splice(grCartaSelec, 1)[0];
  grPilaDesc.push(carta);
  grCartaSelec = null;
  grActiu = false;
  grResoldre('gin');
}

function grTancarKnock() {
  if (!grActiu || grCartaSelec === null) return;
  const maPostDesc = grMaJugador.filter((_, i) => i !== grCartaSelec);
  if (grCalcularDeadwood(maPostDesc).total > 10) return;
  // Descarta la carta seleccionada i tanca
  const carta = grMaJugador.splice(grCartaSelec, 1)[0];
  grPilaDesc.push(carta);
  grCartaSelec = null;
  grActiu = false;
  grResoldre('knock');
}

// ── TORN DE LA IA ─────────────────────────────────────────────
function grTornIa() {
  if (!grActiu) return;
  const nivell = GR_CONFIG[grDificultat].iaNivell;

  // AGAFAR
  let agafarDesc = false;
  if (grPilaDesc.length > 0) {
    const ultima = grPilaDesc[grPilaDesc.length - 1];
    if (nivell === 'facil') {
      agafarDesc = Math.random() < 0.25;
    } else {
      agafarDesc = grIaMilloraAgafant(ultima, grMaIa);
    }
  }

  if (agafarDesc) {
    grMaIa.push(grPilaDesc.pop());
  } else {
    if (grPilaMunt.length === 0) grRepartirDescAMunt();
    if (grPilaMunt.length > 0) grMaIa.push(grPilaMunt.pop());
  }

  // DESCARTAR
  const idxDesc = grIaTriarDescart(grMaIa, nivell);
  grPilaDesc.push(grMaIa.splice(idxDesc, 1)[0]);

  // COMPROVAR TANCAMENT
  const dw = grCalcularDeadwood(grMaIa);
  if (dw.total === 0) {
    grActiu = false;
    grRenderJoc();
    setTimeout(() => grResoldre('ia-gin'), 400);
    return;
  }
  const haDeTancar = (nivell === 'facil'   && dw.total <= 8 && Math.random() < 0.4)
                  || (nivell === 'mitja'   && dw.total <= 6)
                  || (nivell === 'dificil' && dw.total <= 4);
  if (haDeTancar) {
    grActiu = false;
    grRenderJoc();
    setTimeout(() => grResoldre('ia-knock'), 400);
    return;
  }

  grTorn = 'jugador';
  grFase = 'agafar';
  grRenderJoc();
}

function grIaMilloraAgafant(carta, ma) {
  const dwActual = grCalcularDeadwood(ma).total;
  const maTest   = [...ma, carta];
  const idxPitjor = grIaTriarDescart(maTest, 'mitja');
  const maTestDesc = maTest.filter((_, i) => i !== idxPitjor);
  return grCalcularDeadwood(maTestDesc).total < dwActual;
}

function grIaTriarDescart(ma, nivell) {
  const dw    = grCalcularDeadwood(ma);
  const enMeld = new Set(dw.meldsIdx.flat());
  const fora  = ma.map((c, i) => ({ i, v: grValorCarta(c) })).filter(x => !enMeld.has(x.i));

  if (fora.length === 0) {
    return ma.reduce((mi, c, i) => grValorCarta(c) < grValorCarta(ma[mi]) ? i : mi, 0);
  }
  if (nivell === 'facil') {
    return fora[Math.floor(Math.random() * fora.length)].i;
  }
  return fora.reduce((mx, x) => x.v > mx.v ? x : mx, fora[0]).i;
}

// ── CÀLCUL MELDS I DEADWOOD ───────────────────────────────────
function grCalcularDeadwood(ma) {
  const comodins  = ma.map((c, i) => c.esComodi ? i : -1).filter(i => i >= 0);
  const noComodi  = ma.map((c, i) => c.esComodi ? null : { c, i }).filter(Boolean);

  const melds = [];

  // Grups (3-4 del mateix número)
  const perNum = {};
  noComodi.forEach(({ c, i }) => {
    if (!perNum[c.num]) perNum[c.num] = [];
    perNum[c.num].push(i);
  });
  Object.values(perNum).forEach(idxs => {
    for (let mida = 3; mida <= idxs.length; mida++) {
      grCombinacions(idxs, mida).forEach(c => melds.push(c));
    }
    if (idxs.length >= 2 && comodins.length > 0) {
      grCombinacions(idxs, 2).forEach(combo => {
        comodins.forEach(ci => melds.push([...combo, ci]));
      });
    }
  });

  // Escales (3+ consecutives del mateix pal)
  const perPal = {};
  noComodi.forEach(({ c, i }) => {
    if (!perPal[c.pal]) perPal[c.pal] = [];
    perPal[c.pal].push({ num: c.num, i });
  });
  Object.values(perPal).forEach(cartes => {
    cartes.sort((a, b) => a.num - b.num);
    const unics = cartes.filter((x, j) => j === 0 || x.num !== cartes[j-1].num);
    for (let ini = 0; ini < unics.length; ini++) {
      const seq = [unics[ini].i];
      for (let j = ini + 1; j < unics.length; j++) {
        if (unics[j].num === unics[j-1].num + 1) {
          seq.push(unics[j].i);
          if (seq.length >= 3) melds.push([...seq]);
        } else break;
      }
    }
    // Escala de 2 + comodí
    if (comodins.length > 0) {
      for (let j = 0; j < unics.length - 1; j++) {
        const diff = unics[j+1].num - unics[j].num;
        if (diff === 1 || diff === 2) {
          comodins.forEach(ci => melds.push([unics[j].i, unics[j+1].i, ci]));
        }
      }
    }
  });

  // Millor combinació sense superposició
  let millorDW = ma.reduce((s, c) => s + grValorCarta(c), 0);
  let millorsIdx = [];

  function cerca(meldIdx, usades) {
    const enMeld = new Set(usades.flat());
    let dw = 0;
    ma.forEach((c, i) => { if (!enMeld.has(i)) dw += grValorCarta(c); });
    if (dw < millorDW) {
      millorDW = dw;
      millorsIdx = usades.map(m => [...m]);
    }
    for (let i = meldIdx; i < melds.length; i++) {
      if (melds[i].some(idx => enMeld.has(idx))) continue;
      cerca(i + 1, [...usades, melds[i]]);
    }
  }
  cerca(0, []);

  return { total: millorDW, meldsIdx: millorsIdx };
}

function grCombinacions(arr, k) {
  if (k > arr.length) return [];
  if (k === arr.length) return [arr.slice()];
  if (k === 1) return arr.map(x => [x]);
  const res = [];
  for (let i = 0; i <= arr.length - k; i++) {
    grCombinacions(arr.slice(i + 1), k - 1).forEach(c => res.push([arr[i], ...c]));
  }
  return res;
}

// ── RESOLUCIÓ FINAL ───────────────────────────────────────────
function grResoldre(tipus) {
  const dwJ = grCalcularDeadwood(grMaJugador);
  const dwI = grCalcularDeadwood(grMaIa);
  let puntsBase = 0, titol = '', icona = '', desc = '', guanyat = false;

  if (tipus === 'gin') {
    puntsBase = 25 + dwI.total;
    titol = '🥃 GIN!';
    icona = '🏆';
    desc = 'Bonus Gin: 25 pts + Deadwood IA: ' + dwI.total + ' pts';
    guanyat = true;
  } else if (tipus === 'knock') {
    if (dwJ.total < dwI.total) {
      puntsBase = dwI.total - dwJ.total;
      titol = '✊ Knock — Has guanyat!';
      icona = '🎉';
      desc = 'Deadwood teu: ' + dwJ.total + ' · IA: ' + dwI.total + ' → +' + puntsBase + ' pts';
      guanyat = true;
    } else {
      titol = '✊ Undercut!';
      icona = '😅';
      desc = 'La IA tenia igual o menys deadwood (IA: ' + dwI.total + ' · teu: ' + dwJ.total + ')';
      guanyat = false;
    }
  } else if (tipus === 'ia-gin') {
    titol = '🤖 La IA fa Gin!';
    icona = '💀';
    desc = 'La IA tanca amb 0 deadwood. El teu: ' + dwJ.total + ' pts';
    guanyat = false;
  } else if (tipus === 'ia-knock') {
    titol = '🤖 La IA fa Knock!';
    icona = '😢';
    desc = 'IA tanca amb ' + dwI.total + ' deadwood. El teu: ' + dwJ.total + ' pts';
    guanyat = false;
  }

  const mult   = GR_CONFIG[grDificultat].multiplicador;
  const puntsF = Math.round(puntsBase * mult);

  grGuardarPartida(jugadorActiu, grDificultat, puntsF, guanyat);
  grMostrarModalFinal(titol, icona, desc, puntsBase, mult, puntsF, dwJ, dwI);
}

function grMostrarModalFinal(titol, icona, desc, puntsBase, mult, puntsF, dwJ, dwI) {
  const meldJIdx = new Set(dwJ.meldsIdx.flat());
  const meldIIdx = new Set(dwI.meldsIdx.flat());
  const cont = document.getElementById('ginrummy-joc-cont');
  const overlay = document.createElement('div');
  overlay.className = 'pm-overlay-final';
  overlay.innerHTML = `
    <div class="pm-modal gr-modal-final">
      <div class="pm-modal-icon">${icona}</div>
      <div class="pm-modal-titol">${titol}</div>
      <div class="pm-modal-info">${desc}</div>
      ${puntsBase > 0 ? `
        <div class="gr-punts-resum">
          <span class="gr-punts-base">${puntsBase} pts base</span>
          ${mult > 1 ? '<span class="gr-mult">x ' + mult + '</span>' : ''}
          <span class="gr-punts-total">${puntsF} pts</span>
        </div>` : ''}
      <div class="gr-mans-final">
        <div class="gr-ma-final-bloc">
          <div class="gr-ma-final-titol">👤 ${jugadorActiu} · ${dwJ.total} dw</div>
          <div class="gr-cartes-mini">
            ${grMaJugador.map((c, i) =>
              '<span class="gr-cm gr-cm-' + c.pal + ' ' + (meldJIdx.has(i) ? 'gr-cm-meld' : 'gr-cm-dw') + '">' + grRenderCartaMini(c) + '</span>'
            ).join('')}
          </div>
        </div>
        <div class="gr-ma-final-bloc">
          <div class="gr-ma-final-titol">🤖 IA · ${dwI.total} dw</div>
          <div class="gr-cartes-mini">
            ${grMaIa.map((c, i) =>
              '<span class="gr-cm gr-cm-' + c.pal + ' ' + (meldIIdx.has(i) ? 'gr-cm-meld' : 'gr-cm-dw') + '">' + grRenderCartaMini(c) + '</span>'
            ).join('')}
          </div>
        </div>
      </div>
      <div class="pm-modal-btns">
        <button class="snake-btn-start" onclick="grRepetir()">Torna a jugar 🔄</button>
        <button class="pm-btn-sortir" onclick="grSortir()">← Tornar</button>
      </div>
    </div>`;
  cont.appendChild(overlay);
}

// ── UTILITATS ─────────────────────────────────────────────────
function grRepartirDescAMunt() {
  if (grPilaDesc.length <= 1) return;
  const ultima = grPilaDesc.pop();
  grPilaMunt   = grBarrejar(grPilaDesc);
  grPilaDesc   = [ultima];
}

// ── NAVEGACIÓ ─────────────────────────────────────────────────
function grRepetir() {
  clearTimeout(window._grIaTimeout);
  grComençar();
}

function grSortir() {
  clearTimeout(window._grIaTimeout);
  grActiu = false;
  mostraScreen('ginrummy-inici');
  grRenderInici();
}

// ── RANQUING ──────────────────────────────────────────────────
function grRenderRankingHTML() {
  const posEmoji = ['🥇', '🥈', '🥉'];
  const llista = JUGADORS_VALIDS.map(nom => {
    const e = grGetEstat(nom);
    return { nom, mitjana: grMitjana(e), partides: e.partides };
  }).sort((a, b) => b.mitjana - a.mitjana);
  const maxPts = llista[0] ? llista[0].mitjana : 1;

  return llista.map((r, i) => `
    <div class="ranking-item ${r.nom === jugadorActiu ? 'actiu' : ''}">
      <div class="ranking-pos ${i < 3 ? 'p' + (i+1) : 'other'}">${i < 3 ? posEmoji[i] : i+1}</div>
      <img class="rank-avatar" src="${IMGS[r.nom] || ''}" alt="${r.nom}">
      <div class="rank-info">
        <div class="rank-nom">${r.nom}</div>
        <div style="font-size:.7rem;color:var(--text2);margin-bottom:2px">${r.partides} partides</div>
        <div class="rank-barra-wrap">
          <div class="rank-barra" style="width:${Math.min(maxPts > 0 ? (r.mitjana / maxPts) * 100 : 0, 100)}%"></div>
        </div>
      </div>
      <div class="rank-punts" style="align-self:center;flex-shrink:0">${r.mitjana}</div>
    </div>`).join('');
}

function grMitjana(estat) {
  if (!estat || estat.partides === 0) return 0;
  return Math.round(estat.puntsTotals / estat.partides);
}

// ── PERSISTENCIA ─────────────────────────────────────────────
const GR_COL = 'ginrummy_punts';

function grGetEstat(nom) {
  const d = jocFsCacheGet(GR_COL, nom);
  return d || { partides: 0, puntsTotals: 0, difs: { facil: null, mitja: null, dificil: null } };
}

function grGuardarPartida(nom, dif, punts, guanyat) {
  const estat = grGetEstat(nom);
  estat.partides++;
  estat.puntsTotals += punts;
  if (!estat.difs[dif]) estat.difs[dif] = { partides: 0, puntsTotals: 0, millor: 0 };
  estat.difs[dif].partides++;
  estat.difs[dif].puntsTotals += punts;
  if (punts > estat.difs[dif].millor) estat.difs[dif].millor = punts;
  jocFsDesar(GR_COL, nom, estat);
}

// Funcio global per al ranquing de jocs.js (usa la mitjana)
async function ginRummyGetPuntsGlobals() {
  const dades = await jocFsCarregarTots(GR_COL, JUGADORS_VALIDS);
  const pts = {};
  JUGADORS_VALIDS.forEach(nom => { pts[nom] = grMitjana(dades[nom]); });
  return pts;
}
