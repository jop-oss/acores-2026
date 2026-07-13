/* ============================================================
   LOGISTICA.JS  ·  Açores 2026
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────
   DADES
   ────────────────────────────────────────────────────────── */

const VOLS = [
  { dia: '2026-07-22', sortida: '10:35', arribada: '11:35', durada: '2h 00m', origen: 'BCN', desti: 'OPO', origenNom: 'Barcelona', destiNom: 'Porto', companyia: 'Ryanair', vol: 'FR4585', reserva: 'J78B7U', escala: null },
  { dia: '2026-07-22', sortida: '15:40', arribada: '17:20', durada: '2h 40m', origen: 'OPO', desti: 'TER', origenNom: 'Porto', destiNom: 'Terceira', companyia: 'SATA', vol: 'S4183', reserva: 'XV5ZHM', escala: '4h 05m a Porto' },
  { dia: '2026-07-22', sortida: '19:40', arribada: '20:25', durada: '0h 45m', origen: 'TER', desti: 'PDL', origenNom: 'Terceira', destiNom: 'Ponta Delgada', companyia: 'SATA', vol: 'SP491', reserva: 'XV5ZHM', escala: '2h 20m a Terceira' },
  { dia: '2026-07-28', sortida: '07:35', arribada: '08:30', durada: '0h 55m', origen: 'PDL', desti: 'SJZ', origenNom: 'Ponta Delgada', destiNom: 'São Jorge', companyia: 'SATA', vol: 'SP420', reserva: 'XV5ZHM', escala: null },
  { dia: '2026-08-02', sortida: '11:35', arribada: '15:05', durada: '2h 30m', origen: 'HOR', desti: 'LIS', origenNom: 'Horta (Faial)', destiNom: 'Lisboa', companyia: 'SATA', vol: 'S41156', reserva: 'XV5ZHM', escala: null },
  { dia: '2026-08-02', sortida: '18:55', arribada: '21:50', durada: '1h 55m', origen: 'LIS', desti: 'BCN', origenNom: 'Lisboa', destiNom: 'Barcelona', companyia: 'TAP', vol: 'TP1038', reserva: 'YHNBOA', escala: '3h 50m a Lisboa' },
];

const FERRIS = [
  { dia: '2026-07-28', sortida: '20:15', arribada: '21:15', durada: '1h 00m', origen: 'Velas', desti: 'Porto do Cais', origenNom: 'Velas (São Jorge)', destiNom: 'Porto do Cais (Pico)', vaixell: 'Cruzeiro do Canal', companyia: 'Atlanticoline', reserva: '96609' },
  { dia: '2026-07-31', sortida: '15:15', arribada: '15:45', durada: '0h 30m', origen: 'Madalena', desti: 'Horta', origenNom: 'Madalena (Pico)', destiNom: 'Horta (Faial)', vaixell: 'Gilberto Mariano', companyia: 'Atlanticoline', reserva: '112980' },
];

const COTXE_IMATGES = {
  'Hyundai Kauai':  { src: 'img/cotxes/hyundai-kauai.jpg', pos: 'center 70%' },
  'Peugeot 308':    { src: 'img/cotxes/peugeot-308.jpg',   pos: 'center center' },
  'Opel Corsa':     { src: 'img/cotxes/opel-corsa.jpg',    pos: 'center center' },
  'Toyota Yaris':   { src: 'img/cotxes/toyota-yaris.jpg',  pos: 'center 70%' },
};

const COTXES = [
  {
    illa: 'São Miguel', illaSlug: 'smiguel',
    inici: '2026-07-22', fi: '2026-07-28', dies: 6,
    horaRecollida: '21:00', horaDevolucio: '06:00',
    llocRecollida: 'Aeroport PDL', llocDevolucio: 'Aeroport PDL',
    companyia: 'Ilha Verde', url: 'https://www.booking.com/cars/index.ca.html',
    unitats: [
      { num: '#1', model: 'Hyundai Kauai', conductor: 'Mons', reserva: '617341895', pagat: 300.81, pendent: 0, diposit: 2100 },
      { num: '#2', model: 'Hyundai Kauai', conductor: 'Joa',  reserva: '690580949', pagat: 313.37, pendent: 0, diposit: 2100 },
    ]
  },
  {
    illa: 'São Jorge', illaSlug: 'sjorge',
    inici: '2026-07-28', fi: '2026-07-28', dies: 1,
    horaRecollida: '09:00', horaDevolucio: '19:00',
    llocRecollida: 'Aeroport SJZ', llocDevolucio: 'Port de Velas',
    companyia: 'Azores Moto Rent', url: 'https://azoresmotorent.pt',
    unitats: [
      { num: '#1', model: 'Peugeot 308', conductor: 'Jordi', reserva: 'VNFN-270426', pagat: 13.35, pendent: 75.65, diposit: 750 },
      { num: '#2', model: 'Peugeot 308', conductor: 'Joa',   reserva: 'VNFN-270426', pagat: 13.35, pendent: 75.65, diposit: 750 },
    ]
  },
  {
    illa: 'Pico', illaSlug: 'pico',
    inici: '2026-07-28', fi: '2026-07-31', dies: 3,
    horaRecollida: '21:30', horaDevolucio: '12:30',
    llocRecollida: 'Port de São Roque do Pico', llocDevolucio: 'Port de Madalena',
    companyia: 'Oàsis Car Rental', url: 'https://www.rentacaroasis.com',
    unitats: [
      { num: '#1', model: 'Opel Corsa', conductor: 'Joa',   reserva: '#00567', pagat: 0, pendent: 239, diposit: 1100 },
      { num: '#2', model: 'Opel Corsa', conductor: 'Jordi', reserva: '#00568', pagat: 0, pendent: 239, diposit: 1100 },
    ]
  },
  {
    illa: 'Faial', illaSlug: 'faial',
    inici: '2026-07-31', fi: '2026-08-02', dies: 2,
    horaRecollida: '16:00', horaDevolucio: '09:00',
    llocRecollida: "Port d'Horta", llocDevolucio: 'Aeroport HOR',
    companyia: 'Autatlantis', url: 'https://www.discovercars.com',
    unitats: [
      { num: '#1', model: 'Toyota Yaris', conductor: 'Jordi', reserva: 'D013788295', pagat: 156.05, pendent: 0, diposit: 700 },
      { num: '#2', model: 'Toyota Yaris', conductor: 'Mons',  reserva: 'D013788434', pagat: 156.05, pendent: 0, diposit: 700 },
    ]
  },
];

/* ──────────────────────────────────────────────────────────
   HELPERS
   ────────────────────────────────────────────────────────── */
const DIES_CA = ['Diumenge','Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte'];
const MESOS_CA = ['gen','feb','mar','abr','mai','jun','jul','ago','set','oct','nov','des'];

function formatDia(str) {
  const d = new Date(str + 'T12:00:00');
  return `${DIES_CA[d.getDay()]} ${d.getDate()} ${MESOS_CA[d.getMonth()]}`;
}

function formatDiaCurt(str) {
  const d = new Date(str + 'T12:00:00');
  return `${d.getDate()} ${MESOS_CA[d.getMonth()].toUpperCase()}`;
}

const CAT_FLAG_SVG = '<svg class="iata-flag-svg" viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Catalunya"><rect width="3" height="2" fill="#FCDD09"/><rect y="0.2222" width="3" height="0.2222" fill="#DA121A"/><rect y="0.6667" width="3" height="0.2222" fill="#DA121A"/><rect y="1.1111" width="3" height="0.2222" fill="#DA121A"/><rect y="1.5556" width="3" height="0.2222" fill="#DA121A"/></svg>';
const PT_FLAG_SVG = '<svg class="iata-flag-svg" viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Portugal"><rect width="3" height="2" fill="#FF0000"/><rect width="1.2" height="2" fill="#046A38"/></svg>';

function iataFlag(code) {
  if (code === 'BCN') return `${CAT_FLAG_SVG}<span class="iata-flag-lbl">CAT</span>`;
  const pt = new Set(['OPO', 'TER', 'PDL', 'SJZ', 'HOR', 'LIS']);
  if (pt.has(code)) return `${PT_FLAG_SVG}<span class="iata-flag-lbl">PT</span>`;
  return '🏝';
}

/* ──────────────────────────────────────────────────────────
   CONSTRUCCIÓ TIMELINE
   ────────────────────────────────────────────────────────── */

// Agrupa tots els events per dia
function agrupaPer() {
  const mapa = {};

  VOLS.forEach(v => {
    if (!mapa[v.dia]) mapa[v.dia] = [];
    mapa[v.dia].push({ tipus: 'vol', hora: v.sortida, data: v });
  });

  FERRIS.forEach(f => {
    if (!mapa[f.dia]) mapa[f.dia] = [];
    mapa[f.dia].push({ tipus: 'ferri', hora: f.sortida, data: f });
  });

  // Els cotxes s'afegeixen al dia d'inici
  COTXES.forEach(c => {
    if (!mapa[c.inici]) mapa[c.inici] = [];
    mapa[c.inici].push({ tipus: 'cotxe', hora: c.horaRecollida, data: c });
  });

  // Ordena per hora dins cada dia
  Object.keys(mapa).forEach(dia => {
    mapa[dia].sort((a, b) => a.hora.localeCompare(b.hora));
  });

  return mapa;
}

function buildVolCard(v) {
  const escalaHtml = v.escala
    ? `<span class="log-escala-badge">⏳ Escala: ${v.escala}</span>`
    : '';
  return `
    <div class="log-card vol">
      <div class="log-card-header">
        <span class="log-card-tipo">✈️ Vol</span>
        <span class="log-card-ruta">${iataFlag(v.origen)} ${v.origen} → ${iataFlag(v.desti)} ${v.desti}</span>
        <span class="log-card-companyia">${v.companyia}</span>
      </div>
      <div class="log-horaris">
        <div class="log-hora-bloc">
          <div class="log-hora">${v.sortida}</div>
          <div class="log-hora-lloc">${v.origenNom}</div>
        </div>
        <div class="log-hora-arrow">
          <div class="log-hora-durada">${v.durada}</div>
          <div class="log-hora-line"><canvas class="log-hora-canvas" data-plane="true"></canvas></div>
        </div>
        <div class="log-hora-bloc">
          <div class="log-hora">${v.arribada}</div>
          <div class="log-hora-lloc">${v.destiNom}</div>
        </div>
      </div>
      <div class="log-info-row">
        <span class="log-info-chip">🎫 Vol <strong>${v.vol}</strong></span>
        <span class="log-info-chip">🔖 Reserva <strong>${v.reserva}</strong></span>
        ${escalaHtml}
      </div>
    </div>`;
}

function buildFerriCard(f) {
  return `
    <div class="log-card ferri">
      <div class="log-card-header">
        <span class="log-card-tipo">⛴️ Ferri</span>
        <span class="log-card-ruta">🏝 ${f.origenNom} → 🏝 ${f.destiNom}</span>
        <span class="log-card-companyia">${f.companyia}</span>
      </div>
      <div class="log-horaris">
        <div class="log-hora-bloc">
          <div class="log-hora">${f.sortida}</div>
          <div class="log-hora-lloc">${f.origen}</div>
        </div>
        <div class="log-hora-arrow">
          <div class="log-hora-durada">${f.durada}</div>
          <div class="log-hora-line"><canvas class="log-hora-canvas-ferri" data-wave="true"></canvas></div>
        </div>
        <div class="log-hora-bloc">
          <div class="log-hora">${f.arribada}</div>
          <div class="log-hora-lloc">${f.desti}</div>
        </div>
      </div>
      <div class="log-info-row">
        <span class="log-info-chip">🚢 <strong>${f.vaixell}</strong></span>
        <span class="log-info-chip">🔖 Reserva <strong>${f.reserva}</strong></span>
        <a href="https://www.atlanticoline.pt/" target="_blank" class="log-info-chip" style="color:var(--log-ferri);text-decoration:none">🔗 Atlanticoline</a>
      </div>
    </div>`;
}

function buildCotxeCard(c) {
  const unitatsHtml = c.unitats.map(u => {
    const img = COTXE_IMATGES[u.model] || null;
    const bgStyle = img
      ? `style="background-image:url('${img.src}');background-size:cover;background-position:${img.pos};"`
      : '';
    return `
    <div class="log-cotxe-unitat" ${bgStyle}>
      <div class="log-cotxe-unitat-overlay">
        <div class="log-cotxe-num">Cotxe ${u.num}</div>
        <div class="log-cotxe-model">${u.model}</div>
        <div class="log-cotxe-detalls">
          Conductor: <strong style="color:#fff">${u.conductor}</strong><br>
          Reserva: ${u.reserva}
        </div>
      </div>
    </div>`;
  }).join('');

  return `
    <div class="log-card cotxe">
      <div class="log-card-header">
        <span class="log-card-tipo">🚗 Lloguer</span>
        <span class="log-card-ruta">🏝 ${c.illa}</span>
        <span class="log-card-companyia">${c.companyia}</span>
      </div>
      <div class="log-cotxe-periode">
        <span class="log-cotxe-periode-inici">${formatDiaCurt(c.inici)} ${c.horaRecollida}</span>
        <div class="log-cotxe-periode-barra"><div class="log-cotxe-periode-fill"></div></div>
        <span class="log-cotxe-periode-fi">${formatDiaCurt(c.fi)} ${c.horaDevolucio}</span>
        <span class="log-cotxe-dies-badge">${c.dies} ${c.dies > 1 ? 'dies' : 'dia'}</span>
      </div>
      <div class="log-cotxes-parella">${unitatsHtml}</div>
      <div class="log-info-row">
        <span class="log-info-chip">📍 Recollida: <strong>${c.llocRecollida}</strong></span>
        <span class="log-info-chip">📍 Devolució: <strong>${c.llocDevolucio}</strong></span>
        <a href="${c.url}" target="_blank" class="log-info-chip" style="color:var(--log-green);text-decoration:none">🔗 Reserva</a>
      </div>
    </div>`;
}

function renderTimeline() {
  const wrap = document.getElementById('logTimeline');
  const grups = agrupaPer();
  const dies = Object.keys(grups).sort();

  let delay = 0;
  dies.forEach((dia, di) => {
    // Separador de dia
    const diaEl = document.createElement('div');
    diaEl.className = 'log-dia';
    diaEl.innerHTML = `
      <div class="log-dia-badge">${new Date(dia + 'T12:00:00').getDate()}</div>
      <div class="log-dia-label">${formatDia(dia)}</div>
    `;
    wrap.appendChild(diaEl);

    // Events del dia
    grups[dia].forEach((ev, ei) => {
      const node = document.createElement('div');
      node.className = 'log-node';
      node.style.animationDelay = `${delay * 0.08}s`;
      delay++;

      let dotEmoji = '✈️';
      let dotClass = ev.tipus;
      if (ev.tipus === 'ferri') dotEmoji = '⛴️';
      if (ev.tipus === 'cotxe') dotEmoji = '🚗';

      let cardHtml = '';
      if (ev.tipus === 'vol')   cardHtml = buildVolCard(ev.data);
      if (ev.tipus === 'ferri') cardHtml = buildFerriCard(ev.data);
      if (ev.tipus === 'cotxe') cardHtml = buildCotxeCard(ev.data);

      node.innerHTML = `
        <div class="log-node-dot ${dotClass}" title="${ev.tipus}">${dotEmoji}</div>
        ${cardHtml}
      `;
      wrap.appendChild(node);
    });
  });
}

/* ──────────────────────────────────────────────────────────
   RESUM ECONÒMIC
   ────────────────────────────────────────────────────────── */
function renderResum() {
  const wrap = document.getElementById('logResum');

  // Totals cotxes
  let totalPagat = 0, totalPendent = 0, totalDiposit = 0;
  COTXES.forEach(c => c.unitats.forEach(u => {
    totalPagat   += u.pagat;
    totalPendent += u.pendent;
    totalDiposit += u.diposit;
  }));
  const totalCotxes = totalPagat + totalPendent;

  const cotxesRows = COTXES.map(c => c.unitats.map(u => `
    <div class="log-cotxe-cost-row">
      <span class="log-cotxe-cost-nom">🚗 ${c.illa} ${u.num} · ${u.model} (${u.conductor})</span>
      <span class="log-cotxe-cost-pagat">${u.pagat > 0 ? u.pagat.toFixed(2) + ' €' : '—'}</span>
      <span class="log-cotxe-cost-pendent">${u.pendent > 0 ? u.pendent.toFixed(2) + ' €' : '—'}</span>
      <span class="log-cotxe-cost-diposit">${u.diposit.toLocaleString()} €</span>
    </div>`).join('')).join('');

  wrap.innerHTML = `
    <h2 class="log-resum-titol">💶 Resum econòmic</h2>
    <div class="log-resum-grid">
      <div class="log-resum-item">
        <div class="log-resum-item-lbl">✈️ Vols — reserva Ryanair</div>
        <div class="log-resum-item-val">J78B7U</div>
        <div class="log-resum-item-sub">BCN–OPO · Ryanair FR4585</div>
        <div class="log-resum-item-preu">557,46 €</div>
      </div>
      <div class="log-resum-item">
        <div class="log-resum-item-lbl">✈️ Vols — reserva SATA</div>
        <div class="log-resum-item-val">XV5ZHM</div>
        <div class="log-resum-item-sub">OPO–TER–PDL · PDL–SJZ · HOR–LIS</div>
        <div class="log-resum-item-preu">1.574,64 €</div>
      </div>
      <div class="log-resum-item">
        <div class="log-resum-item-lbl">✈️ Vols — reserva TAP</div>
        <div class="log-resum-item-val">YHNBOA</div>
        <div class="log-resum-item-sub">LIS–BCN · TAP TP1038</div>
        <div class="log-resum-item-preu">342,76 €</div>
      </div>
      <div class="log-resum-item">
        <div class="log-resum-item-lbl">⛴️ Ferri Velas → Pico</div>
        <div class="log-resum-item-val">96609</div>
        <div class="log-resum-item-sub">Atlanticoline · 28 jul 20:15h</div>
        <div class="log-resum-item-preu">98,60 €</div>
      </div>
      <div class="log-resum-item">
        <div class="log-resum-item-lbl">⛴️ Ferri Pico → Horta</div>
        <div class="log-resum-item-val">112980</div>
        <div class="log-resum-item-sub">Atlanticoline · 31 jul 15:15h</div>
        <div class="log-resum-item-preu">46,75 €</div>
      </div>
      <div class="log-resum-item">
        <div class="log-resum-item-lbl">🚗 Cotxes — total</div>
        <div class="log-resum-item-val total">${totalCotxes.toFixed(2)} €</div>
        <div class="log-resum-item-sub">Pagat: ${totalPagat.toFixed(2)} € · Pendent: ${totalPendent.toFixed(2)} €</div>
      </div>
      <div class="log-resum-item">
        <div class="log-resum-item-lbl">🛡️ Dipòsits cotxes</div>
        <div class="log-resum-item-val" style="color:#f87171">${totalDiposit.toLocaleString()} €</div>
        <div class="log-resum-item-sub">Es retorna en tornar els vehicles</div>
      </div>
    </div>
    <div class="log-cotxes-costos">
      <div class="log-cotxes-costos-titol">
        Detall de costos per cotxe &nbsp;·&nbsp;
        <span style="color:var(--log-green)">■</span> Pagat &nbsp;
        <span style="color:#f87171">■</span> Pendent &nbsp;
        <span style="color:var(--log-muted)">■</span> Dipòsit
      </div>
      <div class="log-cotxes-costos-grid">${cotxesRows}</div>
    </div>
  `;
}


/* ──────────────────────────────────────────────────────────
   ANIMACIÓ AVIÓ DE PAPER (Canvas)
   ────────────────────────────────────────────────────────── */
function initPlanes() {
  setTimeout(() => {
    document.querySelectorAll('canvas[data-plane]').forEach(canvas => {
      const W = canvas.parentElement.offsetWidth;
      if (!W) return;
      const H = 40, CY = H / 2;
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d');
      const DURADA = 11000, AMP = 13, FREQ = 2.5, MIDA = 13;
      const estela = [];
      let t0 = null;

      function wavY(p) { return CY + Math.sin(p * Math.PI * 2 * FREQ) * AMP; }

      function drawPlane(x, y, angle) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(MIDA, 0);
        ctx.lineTo(-MIDA*0.6,  MIDA*0.5);
        ctx.lineTo(-MIDA*0.3,  0);
        ctx.lineTo(-MIDA*0.6, -MIDA*0.5);
        ctx.closePath();
        ctx.fillStyle = 'rgba(220,235,255,0.92)'; ctx.fill();
        ctx.beginPath(); ctx.moveTo(MIDA,0); ctx.lineTo(-MIDA*0.3,0);
        ctx.strokeStyle = 'rgba(147,197,253,0.6)'; ctx.lineWidth=0.8; ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(MIDA,0); ctx.lineTo(-MIDA*0.6,-MIDA*0.5); ctx.lineTo(-MIDA*0.3,0);
        ctx.closePath(); ctx.fillStyle='rgba(255,255,255,0.45)'; ctx.fill();
        ctx.restore();
      }

      function drawEstela() {
        for (let i = 1; i < estela.length; i++) {
          const r = i / estela.length;
          ctx.beginPath();
          ctx.moveTo(estela[i-1].x, estela[i-1].y);
          ctx.lineTo(estela[i].x, estela[i].y);
          ctx.strokeStyle = `rgba(147,197,253,${r*0.35})`;
          ctx.lineWidth = r * 1.8; ctx.lineCap = 'round'; ctx.stroke();
        }
      }

      function frame(ts) {
        if (!t0) t0 = ts;
        const p = ((ts - t0) % DURADA) / DURADA;
        const x = p * (W + MIDA*4) - MIDA*2;
        const y = wavY(p);
        const dp = 0.005;
        const angle = Math.atan2(wavY(Math.min(p+dp,1)) - y, (W+MIDA*4)*dp);
        estela.push({x, y});
        if (estela.length > 38) estela.shift();
        let op = 1;
        if (p < 0.06) op = p/0.06;
        if (p > 0.90) op = (1-p)/0.10;
        ctx.clearRect(0,0,W,H);
        ctx.globalAlpha = op;
        drawEstela(); drawPlane(x, y, angle);
        ctx.globalAlpha = 1;
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }, 250);
}

/* ──────────────────────────────────────────────────────────
   ANIMACIÓ ONES (Canvas) — Ferris
   ────────────────────────────────────────────────────────── */
function initWaves() {
  setTimeout(() => {
    document.querySelectorAll('canvas[data-wave]').forEach(canvas => {
      const W = canvas.parentElement.offsetWidth;
      if (!W) return;
      const H = 36, CY = H / 2;
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d');
      let t0 = null;

      function drawWave(t, amp, freq, spd, phase, stroke, fill, lw) {
        ctx.beginPath();
        for (let x = 0; x <= W; x++) {
          const y = CY + Math.sin(x * freq - t * spd + phase) * amp;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        if (fill) {
          ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
          ctx.fillStyle = fill; ctx.fill();
          // Redraw path for stroke
          ctx.beginPath();
          for (let x = 0; x <= W; x++) {
            const y = CY + Math.sin(x * freq - t * spd + phase) * amp;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = stroke; ctx.lineWidth = lw;
        ctx.lineJoin = 'round'; ctx.stroke();
      }

      function frame(ts) {
        if (!t0) t0 = ts;
        const t = (ts - t0) * 0.001;
        ctx.clearRect(0, 0, W, H);
        // Ona de fons — gran, lenta
        drawWave(t, 7, 0.014, 0.55, 0,   'rgba(6,182,212,0.28)',   'rgba(6,182,212,0.06)', 1.2);
        // Ona intermèdia
        drawWave(t, 5, 0.020, 0.90, 0.8, 'rgba(34,211,238,0.60)',  'rgba(6,182,212,0.08)', 1.7);
        // Ona superior — petita, brillant
        drawWave(t, 2.5, 0.032, 1.40, 2.2, 'rgba(186,230,253,0.45)', null, 0.9);
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }, 250);
}

document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  renderResum();
  initPlanes();
  initWaves();
});
