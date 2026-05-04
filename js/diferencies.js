// ══════════════════════════════════════════════════════════════
//  BUSCA LES DIFERÈNCIES — Motor del joc
// ══════════════════════════════════════════════════════════════

const DIFER_PUNTS_DIF   = { fàcil: 50, mitjà: 80, difícil: 120 };
const DIFER_PUNTS_RAPID = 20;   // bonus per completar en < 60s
const DIFER_RADI_CLIC   = 38;   // px: radi d'acceptació del clic
const DIFER_MAX_ERRORS  = 3;    // errors màxims per escena
const DIFER_STORAGE     = 'difer_estat_';

let _diferEscena      = null;   // escena actual
let _diferTrobades    = [];     // índexs de diferències trobades
let _diferErrors      = 0;
let _diferInici       = 0;      // timestamp inici
let _diferMarcadors   = [];     // {el, timeout} — cercles animats al SVG
let _diferSVGWidth    = 310;    // amplada real del SVG renderat
let _diferSVGHeight   = 250;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarDiferencies() {
  mostraScreen('difer-inici');
  diferRenderInici();
}

// ── PANTALLA INICI ────────────────────────────────────────────
function diferRenderInici() {
  const cont = document.getElementById('difer-inici-cont');
  if (!cont) return;

  const estat = diferCarregarEstat();

  const cards = DIFER_ESCENES.map((esc, i) => {
    const completada = estat.completades?.includes(esc.id);
    const punts = estat.punts?.[esc.id] || 0;
    const difColor = { fàcil: 'var(--verd2)', mitjà: 'var(--gold)', difícil: '#ff8a8a' }[esc.dificultat];
    return `
      <div class="difer-card ${completada ? 'completada' : ''}" onclick="diferIniciarEscena(${i})">
        <div class="difer-card-emoji">${esc.emoji}</div>
        <div class="difer-card-titol">${esc.titol}</div>
        <div class="difer-card-dif" style="color:${difColor}">${esc.dificultat}</div>
        ${completada
          ? `<div class="difer-card-punts">✓ ${punts} pts</div>`
          : `<div class="difer-card-sub">5 diferències</div>`}
      </div>`;
  }).join('');

  const total = estat.totalPunts || 0;

  cont.innerHTML = `
    <div class="difer-inici-wrap">
      <div class="difer-inici-header">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">🔍</span>
          <span class="joc-titol-text">Busca les Diferències</span>
        </div>
        <div class="difer-punts-total">
          <img src="${IMGS[jugadorActiu] || ''}" class="difer-avatar">
          <span>${jugadorActiu}</span>
          <span class="difer-total-badge">${total} pts</span>
        </div>
      </div>
      <div class="difer-grid">${cards}</div>
    </div>`;
}

// ── INICIAR ESCENA ─────────────────────────────────────────────
function diferIniciarEscena(idx) {
  _diferEscena   = DIFER_ESCENES[idx];
  _diferTrobades = [];
  _diferErrors   = 0;
  _diferInici    = Date.now();
  _diferMarcadors = [];
  mostraScreen('difer-joc');
  diferRenderJoc();
}

function diferRenderJoc() {
  const cont = document.getElementById('difer-joc-cont');
  if (!cont || !_diferEscena) return;

  cont.innerHTML = `
    <div class="difer-joc-wrap">
      <div class="difer-joc-header">
        <button class="mapa-back-btn" onclick="mostraScreen('difer-inici');diferRenderInici()">← Tornar</button>
        <div class="difer-joc-titol">${_diferEscena.emoji} ${_diferEscena.titol}</div>
        <div class="difer-joc-info">
          <span id="difer-trobades">0/5</span>
          <span id="difer-errors" class="difer-errors-badge">❌ ${_diferErrors}/${DIFER_MAX_ERRORS}</span>
        </div>
      </div>

      <div class="difer-instruccio">Toca les diferències a la imatge de la <strong>dreta</strong></div>

      <div class="difer-imatges-wrap">
        <div class="difer-img-col">
          <div class="difer-img-label">Original</div>
          <div class="difer-svg-wrap" id="difer-svg-esq">
            <svg viewBox="0 0 310 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
              ${_diferEscena.svgOriginal}
            </svg>
          </div>
        </div>
        <div class="difer-img-col">
          <div class="difer-img-label">Troba les diferències</div>
          <div class="difer-svg-wrap" id="difer-svg-dre" onclick="diferHandleClic(event)">
            <svg id="difer-svg-dreta" viewBox="0 0 310 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;cursor:crosshair">
              ${_diferEscena.svgModificat}
              <g id="difer-marcadors"></g>
            </svg>
          </div>
        </div>
      </div>

      <div class="difer-progres">
        ${_diferEscena.diferencies.map((_, i) => `
          <div class="difer-punt ${_diferTrobades.includes(i) ? 'trobat' : ''}" id="difer-p-${i}">●</div>
        `).join('')}
      </div>
    </div>`;
}

// ── GESTIÓ DE CLICS ────────────────────────────────────────────
function diferHandleClic(e) {
  if (!_diferEscena) return;

  const wrap = document.getElementById('difer-svg-dre');
  const svg  = document.getElementById('difer-svg-dreta');
  if (!wrap || !svg) return;

  const rect   = svg.getBoundingClientRect();
  const scaleX = 310 / rect.width;
  const scaleY = 250 / rect.height;

  const cxSVG = (e.clientX - rect.left)  * scaleX;
  const cySVG = (e.clientY - rect.top)   * scaleY;

  // Comprova si el clic encerta alguna diferència no trobada
  let encert = -1;
  for (let i = 0; i < _diferEscena.diferencies.length; i++) {
    if (_diferTrobades.includes(i)) continue;
    const d  = _diferEscena.diferencies[i];
    const dx = cxSVG - d.x;
    const dy = cySVG - d.y;
    if (Math.sqrt(dx * dx + dy * dy) <= DIFER_RADI_CLIC) {
      encert = i;
      break;
    }
  }

  if (encert >= 0) {
    diferMarcarEncert(encert, cxSVG, cySVG);
  } else {
    diferMarcarError(cxSVG, cySVG);
  }
}

function diferMarcarEncert(idx, cx, cy) {
  _diferTrobades.push(idx);

  const d   = _diferEscena.diferencies[idx];
  const mg  = document.getElementById('difer-marcadors');
  if (mg) {
    const cercle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    cercle.setAttribute('cx', d.x);
    cercle.setAttribute('cy', d.y);
    cercle.setAttribute('r',  d.r || 28);
    cercle.setAttribute('fill', 'none');
    cercle.setAttribute('stroke', '#6aab7a');
    cercle.setAttribute('stroke-width', '3');
    cercle.setAttribute('opacity', '0.9');
    cercle.style.animation = 'diferPop .35s ease';
    mg.appendChild(cercle);

    // També marca la mateixa diferència a l'esquerra amb un cercle groc
    const svgEsq = document.querySelector('#difer-svg-esq svg');
    if (svgEsq) {
      const esqG = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      esqG.setAttribute('cx', d.x);
      esqG.setAttribute('cy', d.y);
      esqG.setAttribute('r',  d.r || 28);
      esqG.setAttribute('fill', 'none');
      esqG.setAttribute('stroke', '#f0b429');
      esqG.setAttribute('stroke-width', '3');
      esqG.setAttribute('opacity', '0.7');
      svgEsq.appendChild(esqG);
    }
  }

  // Actualitza punts visuals
  const punt = document.getElementById(`difer-p-${idx}`);
  if (punt) punt.classList.add('trobat');
  const trobEl = document.getElementById('difer-trobades');
  if (trobEl) trobEl.textContent = `${_diferTrobades.length}/5`;

  // Comprova fi
  if (_diferTrobades.length === _diferEscena.diferencies.length) {
    setTimeout(diferCompletada, 600);
  }
}

function diferMarcarError(cx, cy) {
  _diferErrors++;

  const mg = document.getElementById('difer-marcadors');
  if (mg) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const r = 12;
    const l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l1.setAttribute('x1', cx - r); l1.setAttribute('y1', cy - r);
    l1.setAttribute('x2', cx + r); l1.setAttribute('y2', cy + r);
    l1.setAttribute('stroke', '#e05555'); l1.setAttribute('stroke-width', '3');
    l1.setAttribute('stroke-linecap', 'round');
    const l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l2.setAttribute('x1', cx + r); l2.setAttribute('y1', cy - r);
    l2.setAttribute('x2', cx - r); l2.setAttribute('y2', cy + r);
    l2.setAttribute('stroke', '#e05555'); l2.setAttribute('stroke-width', '3');
    l2.setAttribute('stroke-linecap', 'round');
    g.appendChild(l1); g.appendChild(l2);
    mg.appendChild(g);
    setTimeout(() => g.remove(), 900);
  }

  const errEl = document.getElementById('difer-errors');
  if (errEl) errEl.textContent = `❌ ${_diferErrors}/${DIFER_MAX_ERRORS}`;

  if (_diferErrors >= DIFER_MAX_ERRORS) {
    setTimeout(diferGameOver, 600);
  }
}

// ── FI D'ESCENA ────────────────────────────────────────────────
function diferCompletada() {
  const temps  = Math.round((Date.now() - _diferInici) / 1000);
  const pBase  = DIFER_PUNTS_DIF[_diferEscena.dificultat] || 50;
  const bonus  = temps < 60 ? DIFER_PUNTS_RAPID : 0;
  const total  = pBase + bonus;

  // Guarda punts
  const estat = diferCarregarEstat();
  if (!estat.completades) estat.completades = [];
  if (!estat.completades.includes(_diferEscena.id)) estat.completades.push(_diferEscena.id);
  if (!estat.punts) estat.punts = {};
  // Guarda el millor resultat
  if (!estat.punts[_diferEscena.id] || total > estat.punts[_diferEscena.id]) {
    estat.punts[_diferEscena.id] = total;
  }
  estat.totalPunts = Object.values(estat.punts).reduce((s, v) => s + v, 0);
  diferGuardarEstat(estat);

  diferRenderResultat(true, temps, pBase, bonus, total);
}

function diferGameOver() {
  diferRevelarTotes();
  setTimeout(() => diferRenderResultat(false, 0, 0, 0, 0), 1200);
}

function diferRevelarTotes() {
  const mg = document.getElementById('difer-marcadors');
  if (!mg || !_diferEscena) return;
  _diferEscena.diferencies.forEach((d, i) => {
    if (_diferTrobades.includes(i)) return;
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', d.x); c.setAttribute('cy', d.y);
    c.setAttribute('r', d.r || 28);
    c.setAttribute('fill', 'rgba(224,85,85,0.2)');
    c.setAttribute('stroke', '#e05555');
    c.setAttribute('stroke-width', '2.5');
    mg.appendChild(c);
  });
}

function diferRenderResultat(ok, temps, pBase, bonus, total) {
  const cont = document.getElementById('difer-joc-cont');
  if (!cont) return;

  cont.innerHTML = `
    <div class="difer-resultat-wrap">
      <div class="difer-resultat-icon">${ok ? '🎉' : '😅'}</div>
      <div class="difer-resultat-titol">${ok ? '¡Completat!' : 'Joc acabat'}</div>
      <div class="difer-resultat-sub">${_diferEscena.titol}</div>
      ${ok ? `
        <div class="difer-resultat-punts">
          <div class="difer-rp-row"><span>Punts base (${_diferEscena.dificultat})</span><span>${pBase}</span></div>
          ${bonus ? `<div class="difer-rp-row bonus"><span>⚡ Bonus ràpid (&lt;60s)</span><span>+${bonus}</span></div>` : ''}
          <div class="difer-rp-row total"><span>Total</span><span>${total} pts</span></div>
          <div class="difer-rp-temps">⏱ ${temps}s</div>
        </div>` : `
        <div class="difer-resultat-punts">
          <div class="difer-rp-row"><span>Diferències trobades</span><span>${_diferTrobades.length}/5</span></div>
        </div>`}
      <div class="difer-resultat-btns">
        <button class="btn-start-joc" onclick="diferIniciarEscena(${DIFER_ESCENES.indexOf(_diferEscena)})">Tornar a intentar</button>
        <button class="mapa-back-btn" onclick="mostraScreen('difer-inici');diferRenderInici()">← Escenes</button>
      </div>
    </div>`;
}

// ── PERSISTÈNCIA ───────────────────────────────────────────────
function diferCarregarEstat() {
  if (!jugadorActiu) return {};
  try {
    const raw = localStorage.getItem(DIFER_STORAGE + jugadorActiu);
    return raw ? JSON.parse(raw) : {};
  } catch(e) { return {}; }
}

function diferGuardarEstat(estat) {
  if (!jugadorActiu) return;
  try {
    localStorage.setItem(DIFER_STORAGE + jugadorActiu, JSON.stringify(estat));
  } catch(e) {}
}

// Funció per al rànquing global (localStorage)
function diferGetPuntsGlobals() {
  const pts = {};
  (typeof JUGADORS_VALIDS !== 'undefined' ? JUGADORS_VALIDS : []).forEach(nom => {
    try {
      const raw = localStorage.getItem(DIFER_STORAGE + nom);
      const d   = raw ? JSON.parse(raw) : {};
      pts[nom]  = d.totalPunts || 0;
    } catch(e) { pts[nom] = 0; }
  });
  return pts;
}
