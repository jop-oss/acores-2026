// ══════════════════════════════════════════════════════════════
//  BUSCA LES DIFERÈNCIES — Motor del joc (imatges JPG)
// ══════════════════════════════════════════════════════════════

const DIFER_PUNTS_ESCENA  = 100;
const DIFER_BONUS_RAPID   = 30;
const DIFER_MAX_ERRORS    = 5;
const DIFER_STORAGE       = 'difer_estat_';
const DIFER_IMG_W         = 960;
const DIFER_IMG_H         = 751;

let _diferEscena    = null;
let _diferTrobades  = [];
let _diferErrors    = 0;
let _diferInici     = 0;
let _diferTimerInterval = null;

// ── PUNT D'ENTRADA ────────────────────────────────────────────
function iniciarDiferencies() {
  mostraScreen('difer-inici');
  diferRenderInici();
}

// ── PANTALLA INICI ─────────────────────────────────────────────
function diferRenderInici() {
  const cont = document.getElementById('difer-inici-cont');
  if (!cont) return;
  const estat = diferCarregarEstat();
  const cards = DIFER_ESCENES.map((esc, i) => {
    const completada = (estat.completades || []).includes(esc.id);
    const punts = estat.punts && estat.punts[esc.id] ? estat.punts[esc.id] : 0;
    return `
      <div class="difer-card ${completada ? 'completada' : ''}" onclick="diferIniciarEscena(${i})">
        <div class="difer-card-num">${esc.id}</div>
        <div class="difer-card-titol">${esc.titol}</div>
        <div class="difer-card-sub">${esc.diferencies.length} diferències</div>
        ${completada ? '<div class="difer-card-punts">&#10003; ' + punts + ' pts</div>' : ''}
      </div>`;
  }).join('');
  const total = estat.totalPunts || 0;
  const completades = (estat.completades || []).length;
  cont.innerHTML = `
    <div class="difer-inici-wrap">
      <div class="difer-inici-header">
        <div class="joc-titol-fila">
          <span class="joc-titol-emoji">&#128269;</span>
          <span class="joc-titol-text">Busca les Diferències</span>
        </div>
        <div class="difer-punts-total">
          <img src="${IMGS[jugadorActiu] || ''}" class="difer-avatar" alt="${jugadorActiu}">
          <span>${jugadorActiu}</span>
          <span class="difer-total-badge">${total} pts</span>
          <span class="difer-prog-badge">${completades}/${DIFER_ESCENES.length}</span>
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
  clearInterval(_diferTimerInterval);
  mostraScreen('difer-joc');
  diferRenderJoc();
}

function diferRenderJoc() {
  const cont = document.getElementById('difer-joc-cont');
  if (!cont || !_diferEscena) return;
  const base = 'img/diferencies/' + _diferEscena.prefix;
  const ndif = _diferEscena.diferencies.length;
  cont.innerHTML = `
    <div class="difer-joc-wrap">
      <div class="difer-joc-header">
        <button class="mapa-back-btn" onclick="clearInterval(_diferTimerInterval);mostraScreen('difer-inici');diferRenderInici()">← Tornar</button>
        <div class="difer-joc-titol">${_diferEscena.titol}</div>
        <div class="difer-joc-info">
          <span id="difer-trobades">0/${ndif}</span>
          <span id="difer-errors" class="difer-errors-badge">&#10060; 0/${DIFER_MAX_ERRORS}</span>
          <span id="difer-timer" class="difer-timer">0s</span>
        </div>
      </div>
      <div class="difer-instruccio">Clica a la imatge de la <strong>dreta</strong> on vegis una diferència</div>
      <div class="difer-imatges-wrap">
        <div class="difer-img-col">
          <div class="difer-img-label">Original</div>
          <div class="difer-img-box" id="difer-box-esq">
            <img src="${base}-original.jpg" alt="original" style="width:100%;height:auto;display:block">
            <svg id="difer-overlay-esq" viewBox="0 0 960 751" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none"></svg>
          </div>
        </div>
        <div class="difer-img-col">
          <div class="difer-img-label">Troba les diferències</div>
          <div class="difer-img-box difer-img-activa" id="difer-box-dre" onclick="diferHandleClic(event)" style="cursor:crosshair">
            <img src="${base}-differences.jpg" alt="diferencies" style="width:100%;height:auto;display:block;pointer-events:none">
            <svg id="difer-overlay-dre" viewBox="0 0 960 751" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none"></svg>
          </div>
        </div>
      </div>
      <div class="difer-progres">
        ${_diferEscena.diferencies.map(function(_, i) { return '<div class="difer-punt" id="difer-p-' + i + '">&#9679;</div>'; }).join('')}
      </div>
    </div>`;
  _diferTimerInterval = setInterval(function() {
    const el = document.getElementById('difer-timer');
    if (!el) { clearInterval(_diferTimerInterval); return; }
    el.textContent = Math.floor((Date.now() - _diferInici) / 1000) + 's';
  }, 1000);
}

// ── GESTIÓ DE CLICS ────────────────────────────────────────────
function diferHandleClic(e) {
  if (!_diferEscena) return;
  const box = document.getElementById('difer-box-dre');
  const img = box ? box.querySelector('img') : null;
  if (!img) return;
  const rect = img.getBoundingClientRect();
  const cx = (e.clientX - rect.left) * (DIFER_IMG_W / rect.width);
  const cy = (e.clientY - rect.top)  * (DIFER_IMG_H / rect.height);
  let encert = -1;
  for (let i = 0; i < _diferEscena.diferencies.length; i++) {
    if (_diferTrobades.includes(i)) continue;
    const d = _diferEscena.diferencies[i];
    const dx = cx - d.x, dy = cy - d.y;
    if (Math.sqrt(dx*dx + dy*dy) <= (d.r || 45)) { encert = i; break; }
  }
  if (encert >= 0) diferMarcarEncert(encert);
  else             diferMarcarError(cx, cy);
}

function diferMarcarEncert(idx) {
  _diferTrobades.push(idx);
  const d = _diferEscena.diferencies[idx];
  const r = d.r || 45;
  diferAfegirCercle('difer-overlay-dre', d.x, d.y, r, '#6aab7a', 'rgba(106,171,122,0.18)');
  diferAfegirCercle('difer-overlay-esq', d.x, d.y, r, '#f0b429', 'rgba(240,180,41,0.15)');
  const punt = document.getElementById('difer-p-' + idx);
  if (punt) punt.classList.add('trobat');
  const trobEl = document.getElementById('difer-trobades');
  if (trobEl) trobEl.textContent = _diferTrobades.length + '/' + _diferEscena.diferencies.length;
  if (_diferTrobades.length === _diferEscena.diferencies.length) {
    clearInterval(_diferTimerInterval);
    setTimeout(diferCompletada, 700);
  }
}

function diferMarcarError(cx, cy) {
  _diferErrors++;
  const svg = document.getElementById('difer-overlay-dre');
  if (svg) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const r = 16;
    const attrs = [['stroke','#e05555'],['stroke-width','3.5'],['stroke-linecap','round']];
    const l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    [[l1,[cx-r,cy-r,cx+r,cy+r]],[l2,[cx+r,cy-r,cx-r,cy+r]]].forEach(function(item) {
      attrs.forEach(function(a) { item[0].setAttribute(a[0],a[1]); });
      item[0].setAttribute('x1',item[1][0]); item[0].setAttribute('y1',item[1][1]);
      item[0].setAttribute('x2',item[1][2]); item[0].setAttribute('y2',item[1][3]);
      g.appendChild(item[0]);
    });
    svg.appendChild(g);
    setTimeout(function() { g.remove(); }, 900);
  }
  const errEl = document.getElementById('difer-errors');
  if (errEl) errEl.textContent = '\u274C ' + _diferErrors + '/' + DIFER_MAX_ERRORS;
  if (_diferErrors >= DIFER_MAX_ERRORS) {
    clearInterval(_diferTimerInterval);
    setTimeout(diferGameOver, 500);
  }
}

function diferAfegirCercle(svgId, cx, cy, r, stroke, fill) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', r);
  c.setAttribute('fill', fill); c.setAttribute('stroke', stroke);
  c.setAttribute('stroke-width', '3.5');
  svg.appendChild(c);
}

// ── FI D'ESCENA ────────────────────────────────────────────────
function diferCompletada() {
  const temps = Math.round((Date.now() - _diferInici) / 1000);
  const bonus = temps < 90 ? DIFER_BONUS_RAPID : 0;
  const total = DIFER_PUNTS_ESCENA + bonus;
  const estat = diferCarregarEstat();
  if (!estat.completades) estat.completades = [];
  if (!estat.completades.includes(_diferEscena.id)) estat.completades.push(_diferEscena.id);
  if (!estat.punts) estat.punts = {};
  if (!estat.punts[_diferEscena.id] || total > estat.punts[_diferEscena.id]) estat.punts[_diferEscena.id] = total;
  estat.totalPunts = Object.values(estat.punts).reduce(function(s,v){return s+v;}, 0);
  diferGuardarEstat(estat);
  diferRenderResultat(true, temps, bonus, total);
}

function diferGameOver() {
  _diferEscena.diferencies.forEach(function(d, i) {
    if (_diferTrobades.includes(i)) return;
    diferAfegirCercle('difer-overlay-dre', d.x, d.y, d.r || 45, '#e05555', 'rgba(224,85,85,0.18)');
  });
  setTimeout(function() { diferRenderResultat(false, 0, 0, 0); }, 1200);
}

function diferRenderResultat(ok, temps, bonus, total) {
  const cont = document.getElementById('difer-joc-cont');
  if (!cont) return;
  const escIdx = DIFER_ESCENES.indexOf(_diferEscena);
  cont.innerHTML = `
    <div class="difer-resultat-wrap">
      <div class="difer-resultat-icon">${ok ? '&#127881;' : '&#128517;'}</div>
      <div class="difer-resultat-titol">${ok ? 'Completat!' : 'Joc acabat'}</div>
      <div class="difer-resultat-sub">${_diferEscena.titol}</div>
      <div class="difer-resultat-punts">
        <div class="difer-rp-row"><span>Diferències trobades</span><span>${_diferTrobades.length}/${_diferEscena.diferencies.length}</span></div>
        ${ok ? '<div class="difer-rp-row"><span>Punts base</span><span>' + DIFER_PUNTS_ESCENA + '</span></div>' : ''}
        ${ok && bonus ? '<div class="difer-rp-row bonus"><span>&#9889; Bonus rapid (&lt;90s)</span><span>+' + bonus + '</span></div>' : ''}
        ${ok ? '<div class="difer-rp-row total"><span>Total</span><span>' + total + ' pts</span></div>' : ''}
        ${ok ? '<div class="difer-rp-temps">&#9201; ' + temps + 's</div>' : ''}
      </div>
      <div class="difer-resultat-btns">
        <button class="btn-start-joc" onclick="diferIniciarEscena(${escIdx})">Tornar a intentar</button>
        <button class="mapa-back-btn" onclick="mostraScreen('difer-inici');diferRenderInici()">&#8592; Totes les escenes</button>
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
  try { localStorage.setItem(DIFER_STORAGE + jugadorActiu, JSON.stringify(estat)); } catch(e) {}
}

function diferGetPuntsGlobals() {
  const pts = {};
  (typeof JUGADORS_VALIDS !== 'undefined' ? JUGADORS_VALIDS : []).forEach(function(nom) {
    try {
      const raw = localStorage.getItem(DIFER_STORAGE + nom);
      const d = raw ? JSON.parse(raw) : {};
      pts[nom] = d.totalPunts || 0;
    } catch(e) { pts[nom] = 0; }
  });
  return pts;
}
