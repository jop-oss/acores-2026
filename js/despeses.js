/* ============================================================
   DESPESES.JS  ·  Açores 2026
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────
   CONSTANTS
   ────────────────────────────────────────────────────────── */
const GRUP_PAGADOR = ['Jordi', 'Joa', 'Mons', 'Xu']; // Divideixen despeses
const TOTS         = ['Jordi', 'Joa', 'Mons', 'Xu', 'Anna', 'Laia'];

const COLORS = {
  Jordi: '#e74c3c', Joa: '#f1c40f',
  Mons:  '#8e44ad', Xu:  '#2980b9',
  Anna:  '#e84393', Laia:'#27ae60',
};

const CAT_EMOJI = {
  transport:   '✈️',
  allotjament: '🏠',
  menjar:      '🍽️',
  activitat:   '🎒',
  altres:      '📦',
};

const CAT_LABELS = {
  transport:   'Transport',
  allotjament: 'Allotjament',
  menjar:      'Menjar',
  activitat:   'Activitats',
  altres:      'Altres',
};

/* ──────────────────────────────────────────────────────────
   DESPESES PRE-CARREGADES
   ────────────────────────────────────────────────────────── */
const DESPESES_INICIALS = [
  // VOLS
  { id: 'pre_v1', desc: 'Vols SATA (OPO–TER–PDL · PDL–SJZ · HOR–LIS)', import: 1574.64, pagador: 'Jordi', cat: 'transport', data: '2026-01-15', illa: '', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_v2', desc: 'Vols Ryanair (BCN–OPO)', import: 557.46, pagador: 'Jordi', cat: 'transport', data: '2026-01-15', illa: '', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_v3', desc: 'Vol TAP (LIS–BCN)', import: 342.76, pagador: 'Jordi', cat: 'transport', data: '2026-01-15', illa: '', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  // FERRIS
  { id: 'pre_f1', desc: 'Ferri Velas → Pico (Atlanticoline)', import: 98.60, pagador: 'Jordi', cat: 'transport', data: '2026-07-28', illa: 'São Jorge', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_f2', desc: 'Ferri Madalena → Horta (Atlanticoline)', import: 46.75, pagador: 'Jordi', cat: 'transport', data: '2026-07-31', illa: 'Pico', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  // ALLOTJAMENTS
  { id: 'pre_a1', desc: 'Allotjament Santo Cristo House (São Miguel)', import: 374.00, pagador: 'Jordi', cat: 'allotjament', data: '2026-04-22', illa: 'São Miguel', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_a2', desc: 'Allotjament Casa Cherimoya (São Miguel)', import: 916.80, pagador: 'Jordi', cat: 'allotjament', data: '2026-06-22', illa: 'São Miguel', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_a3', desc: 'Allotjament Prainha Apartments (Pico)', import: 852.00, pagador: 'Jordi', cat: 'allotjament', data: '2026-06-26', illa: 'Pico', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_a4', desc: 'Allotjament Refúgio (Faial)', import: 470.00, pagador: 'Jordi', cat: 'allotjament', data: '2026-04-22', illa: 'Faial', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  // COTXES
  { id: 'pre_c1', desc: 'Cotxes São Miguel #1+#2 (Ilha Verde)', import: 614.18, pagador: 'Jordi', cat: 'transport', data: '2026-07-22', illa: 'São Miguel', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_c2', desc: 'Cotxes São Jorge #1+#2 (Azores Moto Rent) - 151€ es paguen a la recollida', import: 27.00, pagador: 'Jordi', cat: 'transport', data: '2026-07-28', illa: 'São Jorge', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_c3', desc: 'Cotxes Pico #1+#2 (Oásis Car Rental) - 478€ es paguen a la recollida', import: 0.00, pagador: 'Jordi', cat: 'transport', data: '2026-07-28', illa: 'Pico', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_c4', desc: 'Cotxes Faial #1+#2 (Autatlantis)', import: 312.10, pagador: 'Jordi', cat: 'transport', data: '2026-07-31', illa: 'Faial', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  // ACTIVITATS
  { id: 'pre_act1', desc: 'Excursió amb llanxa ràpida des de Rabo de Peixe', import: 419.40, pagador: 'Jordi', cat: 'activitat', data: '2026-07-24', illa: 'São Miguel', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_act2', desc: 'Visita a Gruta do Carvão', import: 63.50, pagador: 'Jordi', cat: 'activitat', data: '2026-07-24', illa: 'São Miguel', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_act3', desc: 'Visita a Caldeira Velha', import: 61.00, pagador: 'Jordi', cat: 'activitat', data: '2026-07-25', illa: 'São Miguel', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_act4', desc: 'Visita al Parc Terra Nostra', import: 99.50, pagador: 'Jordi', cat: 'activitat', data: '2026-07-27', illa: 'São Miguel', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_act5', desc: 'Excursió d\'avistament de balenes i dofins', import: 390.00, pagador: 'Jordi', cat: 'activitat', data: '2026-07-30', illa: 'Pico', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
];

/* ──────────────────────────────────────────────────────────
   PAGAMENTS ENTRE MEMBRES (liquidacions ja fetes)
   ────────────────────────────────────────────────────────── */
const PAGAMENTS_INICIALS = [
  { id: 'pre_p1', de: 'Mons', a: 'Jordi', import: 805.00, data: '2026-04-15', pre: true },
  { id: 'pre_p2', de: 'Mons', a: 'Jordi', import: 805.00, data: '2026-05-15', pre: true },
  { id: 'pre_p3', de: 'Mons', a: 'Jordi', import: 805.00, data: '2026-06-15', pre: true },
  { id: 'pre_p4', de: 'Mons', a: 'Jordi', import: 805.00, data: '2026-07-15', pre: true },
];

function toggleCollapse(id) {
  document.getElementById(id).classList.toggle('obert');
}


let db;
let despesesDinamiques = []; // Les de Firebase
let pagamentsDinamiques = []; // Liquidacions de Firebase
let filtreActiu = 'totes';
let editantId    = null;
let editantPagId = null;

function initFirebase() {
  try {
    db = firebase.firestore();
    db.collection('despeses').orderBy('ts', 'asc').onSnapshot(snap => {
      despesesDinamiques = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      render();
    });
    db.collection('pagaments').orderBy('ts', 'asc').onSnapshot(snap => {
      pagamentsDinamiques = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      render();
    });
  } catch (e) {
    console.warn('Firebase no disponible, mode local');
    render();
  }
}

/* ──────────────────────────────────────────────────────────
   CÀLCULS
   ────────────────────────────────────────────────────────── */
function totesDespeses() {
  return [...DESPESES_INICIALS, ...despesesDinamiques];
}

function totsPagaments() {
  return [...PAGAMENTS_INICIALS, ...pagamentsDinamiques];
}

// Pagat efectiu per persona: el que ha posat de la seva butxaca per a
// despeses del viatge, ajustat pels traspassos/liquidacions ja fets
// entre membres (secció "Pagaments"). La suma total sempre coincideix
// amb el total de despeses, ja que els traspassos només el redistribueixen.
function calcPagatEfectiu() {
  const pagat = {};
  TOTS.forEach(p => { pagat[p] = 0; });

  totesDespeses().forEach(d => {
    pagat[d.pagador] = (pagat[d.pagador] || 0) + d.import;
  });

  totsPagaments().forEach(pg => {
    pagat[pg.de] = (pagat[pg.de] || 0) + pg.import;
    pagat[pg.a]  = (pagat[pg.a]  || 0) - pg.import;
  });

  TOTS.forEach(p => { pagat[p] = +pagat[p].toFixed(2); });
  return pagat;
}

// Totals per categoria (per a la card "Total")
function calcCatTotals() {
  const totals = {};
  Object.keys(CAT_EMOJI).forEach(c => { totals[c] = 0; });
  let granTotal = 0;

  totesDespeses().forEach(d => {
    totals[d.cat] = (totals[d.cat] || 0) + d.import;
    granTotal += d.import;
  });

  Object.keys(totals).forEach(c => { totals[c] = +totals[c].toFixed(2); });
  return { totals, granTotal: +granTotal.toFixed(2) };
}

/* ──────────────────────────────────────────────────────────
   RENDER SALDOS
   ────────────────────────────────────────────────────────── */
function renderSaldos() {
  const pagat = calcPagatEfectiu();
  const { totals: catTotals, granTotal } = calcCatTotals();
  const wrap = document.getElementById('despSaldos');
  wrap.innerHTML = '';

  const grid = document.createElement('div');
  grid.className = 'desp-saldos-grid';
  grid.id = 'despSaldosGrid';

  TOTS.forEach(p => {
    const import_ = pagat[p] || 0;
    const pct = granTotal > 0.01 ? (import_ / granTotal) * 100 : 0;
    const esGrup = GRUP_PAGADOR.includes(p);
    const card = document.createElement('div');
    card.className = `desp-saldo-card border-${p} top-${p}${esGrup ? '' : ' no-grup'}`;

    card.innerHTML = `
      <div class="desp-saldo-nom">
        <span class="desp-saldo-avatar color-${p}">${p[0]}</span>
        ${p}
      </div>
      <div class="desp-saldo-resultat">${fmt(import_)} € <span class="desp-saldo-pct">(${fmt(pct)}%)</span></div>
    `;
    grid.appendChild(card);
  });

  wrap.appendChild(grid);

  // Card "Total" (blanca), amb el desglossament per categoria
  const catRows = Object.entries(CAT_EMOJI).map(([cat, emoji]) => {
    const import_ = catTotals[cat] || 0;
    const pct = granTotal > 0.01 ? (import_ / granTotal) * 100 : 0;
    const lbl = CAT_LABELS[cat] || cat;
    return `
      <div class="desp-saldo-total-cat">
        <span class="desp-saldo-total-cat-lbl">${emoji} ${lbl}</span>
        <span class="desp-saldo-total-cat-import">${fmt(import_)} € <span class="desp-saldo-total-cat-pct">(${fmt(pct)}%)</span></span>
      </div>`;
  }).join('');

  const totalCard = document.createElement('div');
  totalCard.className = 'desp-saldo-total-card';
  totalCard.innerHTML = `
    <div class="desp-saldo-total-titol">Total</div>
    <div class="desp-saldo-total-cats">${catRows}</div>
    <div class="desp-saldo-total-grand">
      <span>Total general</span>
      <strong>${fmt(granTotal)} €</strong>
    </div>
  `;
  wrap.appendChild(totalCard);
}

/* ──────────────────────────────────────────────────────────
   RENDER PAGAMENTS (traspassos entre membres)
   ────────────────────────────────────────────────────────── */
function renderPagaments() {
  const wrap = document.getElementById('despPagaments');
  wrap.innerHTML = '';

  const pagaments = [...totsPagaments()].sort((a, b) => (a.data || '').localeCompare(b.data || ''));

  if (pagaments.length === 0) {
    wrap.innerHTML = '<div class="desp-liquidacio-ok">Encara no s\'ha registrat cap pagament.</div>';
    return;
  }

  pagaments.forEach(pg => {
    const dataFmt = pg.data ? new Date(pg.data + 'T12:00:00').toLocaleDateString('ca-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
    const el = document.createElement('div');
    el.className = 'desp-liquidacio-item';
    el.innerHTML = `
      <span class="desp-liq-data">${dataFmt}</span>
      <span class="desp-saldo-avatar color-${pg.de}" style="width:24px;height:24px;font-size:0.65rem">${pg.de[0]}</span>
      <span class="desp-liq-de">${pg.de}</span>
      <span class="desp-liq-arrow">→</span>
      <span class="desp-saldo-avatar color-${pg.a}" style="width:24px;height:24px;font-size:0.65rem">${pg.a[0]}</span>
      <span class="desp-liq-a">${pg.a}</span>
      <span class="desp-liq-import">${fmt(pg.import)} €</span>
      <span class="desp-liq-accions">
        <button class="desp-item-btn" onclick="editaPagament('${pg.id}')">✏️</button>
        <button class="desp-item-btn del" onclick="eliminaPagament('${pg.id}')">🗑</button>
      </span>
    `;
    wrap.appendChild(el);
  });
}

/* ──────────────────────────────────────────────────────────
   RENDER LLISTA
   ────────────────────────────────────────────────────────── */
function renderLlista() {
  const wrap = document.getElementById('despLlista');
  wrap.innerHTML = '';

  const totes = totesDespeses();
  const filtrades = filtreActiu === 'totes' ? totes : totes.filter(d => d.cat === filtreActiu);

  if (filtrades.length === 0) {
    wrap.innerHTML = '<div style="text-align:center;color:var(--d-muted);padding:24px;font-family:Inter,sans-serif;font-size:0.85rem">Cap despesa en aquesta categoria</div>';
    return;
  }

  filtrades.forEach((d, idx) => {
    const parts = d.participants || GRUP_PAGADOR;
    const quota = d.import / parts.length;
    const item  = document.createElement('div');
    item.className = 'desp-item';
    item.style.animationDelay = `${idx * 0.03}s`;

    const dataFmt = d.data ? new Date(d.data + 'T12:00:00').toLocaleDateString('ca-ES', { day:'numeric', month:'short' }) : '';
    const partsFmt = parts.length === 4 && parts.every(p => GRUP_PAGADOR.includes(p))
      ? 'Grup (4)' : parts.join(', ');

    item.innerHTML = `
      <div class="desp-item-cat">${CAT_EMOJI[d.cat] || '📦'}</div>
      <div class="desp-item-info">
        <div class="desp-item-desc">${d.desc}</div>
        <div class="desp-item-meta">
          <span class="desp-item-pagador">
            <span class="desp-item-dot" style="background:${COLORS[d.pagador]}"></span>
            ${d.pagador}
          </span>
          ${dataFmt ? `<span>${dataFmt}</span>` : ''}
          ${d.illa ? `<span>🏝 ${d.illa}</span>` : ''}
          <span>${partsFmt}</span>
        </div>
      </div>
      <div>
        <div class="desp-item-import">${fmt(d.import)} €</div>
        <div class="desp-item-import-per">${fmt(quota)} € / pers.</div>
      </div>
      <div class="desp-item-accions">
        <button class="desp-item-btn" onclick="editaDespesa('${d.id}')">✏️</button>
        <button class="desp-item-btn del" onclick="eliminaDespesa('${d.id}')">🗑</button>
      </div>
    `;
    wrap.appendChild(item);
  });

  // Total
  const total = filtrades.reduce((s, d) => s + d.import, 0);
  const totalEl = document.createElement('div');
  totalEl.className = 'desp-total-row';
  totalEl.innerHTML = `${filtrades.length} despeses · Total: <strong>${fmt(total)} €</strong>`;
  wrap.appendChild(totalEl);
}

function render() {
  renderSaldos();
  renderPagaments();
  renderLlista();
}

/* ──────────────────────────────────────────────────────────
   MODAL
   ────────────────────────────────────────────────────────── */
function obreModal(dades) {
  editantId = dades?.id || null;
  document.getElementById('despModalTitol').textContent = editantId ? 'Editar despesa' : 'Nova despesa';
  document.getElementById('fId').value      = editantId || '';
  document.getElementById('fDesc').value    = dades?.desc || '';
  document.getElementById('fImport').value  = dades?.import || '';
  document.getElementById('fData').value    = dades?.data || new Date().toISOString().split('T')[0];
  document.getElementById('fIlla').value    = dades?.illa || '';

  const pagador = dades?.pagador || 'Jordi';
  document.getElementById('fPagador').value = pagador;

  const cat = dades?.cat || 'transport';
  document.getElementById('fCat').value = cat;
  document.querySelectorAll('.desp-cat-btn').forEach(b => b.classList.toggle('actiu', b.dataset.cat === cat));

  const parts = dades?.participants || [...GRUP_PAGADOR];
  document.querySelectorAll('.desp-part-btn').forEach(b => {
    b.classList.toggle('actiu', parts.includes(b.dataset.nom));
  });

  document.getElementById('despModal').classList.add('open');
  document.getElementById('despModalOverlay').classList.add('open');
  document.getElementById('fDesc').focus();
}

function tancaModal() {
  document.getElementById('despModal').classList.remove('open');
  document.getElementById('despModalOverlay').classList.remove('open');
  editantId = null;
}

function guardaDespesa() {
  const desc   = document.getElementById('fDesc').value.trim();
  const import_ = parseFloat(document.getElementById('fImport').value);
  const pagador = document.getElementById('fPagador').value;
  const cat    = document.getElementById('fCat').value;
  const data   = document.getElementById('fData').value;
  const illa   = document.getElementById('fIlla').value;
  const parts  = [...document.querySelectorAll('.desp-part-btn.actiu')].map(b => b.dataset.nom);

  if (!desc || isNaN(import_) || import_ <= 0 || parts.length === 0) {
    alert('Omple tots els camps obligatoris i selecciona almenys un participant.');
    return;
  }

  const dades = { desc, import: import_, pagador, cat, data, illa, participants: parts, ts: Date.now() };
  const esPre = DESPESES_INICIALS.some(d => d.id === editantId);

  if (db) {
    if (editantId && !esPre) {
      db.collection('despeses').doc(editantId).update(dades);
    } else if (editantId && esPre) {
      // Pre-carregada editada: la guardem a Firebase amb un id que sobreescriu la pre
      db.collection('despeses').doc(editantId).set(dades);
    } else {
      db.collection('despeses').add(dades);
    }
  } else {
    if (editantId) {
      const idx = despesesDinamiques.findIndex(d => d.id === editantId);
      if (idx >= 0) {
        despesesDinamiques[idx] = { id: editantId, ...dades };
      } else {
        // Era pre-carregada, ara la guardem com a dinàmica
        despesesDinamiques.push({ id: editantId, ...dades });
      }
    } else {
      despesesDinamiques.push({ id: 'local_' + Date.now(), ...dades });
    }
    render();
  }
  tancaModal();
}

function editaDespesa(id) {
  const d = despesesDinamiques.find(x => x.id === id) || DESPESES_INICIALS.find(x => x.id === id);
  if (d) obreModal(d);
}

function eliminaDespesa(id) {
  if (!confirm('Segur que vols eliminar aquesta despesa?')) return;
  if (db) {
    db.collection('despeses').doc(id).delete();
  } else {
    despesesDinamiques = despesesDinamiques.filter(d => d.id !== id);
    render();
  }
}

/* ──────────────────────────────────────────────────────────
   MODAL PAGAMENTS
   ────────────────────────────────────────────────────────── */
function obreModalPagament(dades) {
  editantPagId = dades?.id || null;
  document.getElementById('pagModalTitol').textContent = editantPagId ? 'Editar pagament' : 'Nou pagament';
  document.getElementById('pgId').value   = editantPagId || '';
  document.getElementById('pgDe').value   = dades?.de || 'Mons';
  document.getElementById('pgA').value    = dades?.a || 'Jordi';
  document.getElementById('pgImport').value = dades?.import || '';
  document.getElementById('pgData').value = dades?.data || new Date().toISOString().split('T')[0];

  document.getElementById('pagModal').classList.add('open');
  document.getElementById('pagModalOverlay').classList.add('open');
  document.getElementById('pgImport').focus();
}

function tancaModalPagament() {
  document.getElementById('pagModal').classList.remove('open');
  document.getElementById('pagModalOverlay').classList.remove('open');
  editantPagId = null;
}

function guardaPagament() {
  const de     = document.getElementById('pgDe').value;
  const a      = document.getElementById('pgA').value;
  const import_ = parseFloat(document.getElementById('pgImport').value);
  const data   = document.getElementById('pgData').value;

  if (de === a || isNaN(import_) || import_ <= 0 || !data) {
    alert('Omple tots els camps: qui paga i qui rep han de ser diferents, i l\'import ha de ser positiu.');
    return;
  }

  const dades = { de, a, import: import_, data, ts: Date.now() };
  const esPre = PAGAMENTS_INICIALS.some(p => p.id === editantPagId);

  if (db) {
    if (editantPagId && !esPre) {
      db.collection('pagaments').doc(editantPagId).update(dades);
    } else if (editantPagId && esPre) {
      db.collection('pagaments').doc(editantPagId).set(dades);
    } else {
      db.collection('pagaments').add(dades);
    }
  } else {
    if (editantPagId) {
      const idx = pagamentsDinamiques.findIndex(p => p.id === editantPagId);
      if (idx >= 0) {
        pagamentsDinamiques[idx] = { id: editantPagId, ...dades };
      } else {
        pagamentsDinamiques.push({ id: editantPagId, ...dades });
      }
    } else {
      pagamentsDinamiques.push({ id: 'localpag_' + Date.now(), ...dades });
    }
    render();
  }
  tancaModalPagament();
}

function editaPagament(id) {
  const p = pagamentsDinamiques.find(x => x.id === id) || PAGAMENTS_INICIALS.find(x => x.id === id);
  if (p) obreModalPagament(p);
}

function eliminaPagament(id) {
  if (!confirm('Segur que vols eliminar aquest pagament?')) return;
  if (db) {
    db.collection('pagaments').doc(id).delete();
  } else {
    pagamentsDinamiques = pagamentsDinamiques.filter(p => p.id !== id);
    render();
  }
}

/* ──────────────────────────────────────────────────────────
   HELPERS
   ────────────────────────────────────────────────────────── */
function fmt(n) {
  return Number(n).toLocaleString('ca-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ──────────────────────────────────────────────────────────
   EVENTS
   ────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // Botó afegir
  document.getElementById('btnAfegir').addEventListener('click', () => obreModal());

  // Tancar modal
  document.getElementById('despModalClose').addEventListener('click', tancaModal);
  document.getElementById('despBtnCancel').addEventListener('click', tancaModal);
  document.getElementById('despModalOverlay').addEventListener('click', tancaModal);

  // Guardar
  document.getElementById('despBtnSave').addEventListener('click', guardaDespesa);

  // Botó afegir pagament
  document.getElementById('btnAfegirPagament').addEventListener('click', () => obreModalPagament());

  // Tancar modal pagament
  document.getElementById('pagModalClose').addEventListener('click', tancaModalPagament);
  document.getElementById('pagBtnCancel').addEventListener('click', tancaModalPagament);
  document.getElementById('pagModalOverlay').addEventListener('click', tancaModalPagament);

  // Guardar pagament
  document.getElementById('pagBtnSave').addEventListener('click', guardaPagament);

  // Filtres
  document.getElementById('despFiltres').addEventListener('click', e => {
    const btn = e.target.closest('.desp-filtre');
    if (!btn) return;
    document.querySelectorAll('.desp-filtre').forEach(b => b.classList.remove('actiu'));
    btn.classList.add('actiu');
    filtreActiu = btn.dataset.cat;
    renderLlista();
  });

  // Botons categoria al modal
  document.getElementById('fCatBtns').addEventListener('click', e => {
    const btn = e.target.closest('.desp-cat-btn');
    if (!btn) return;
    document.querySelectorAll('.desp-cat-btn').forEach(b => b.classList.remove('actiu'));
    btn.classList.add('actiu');
    document.getElementById('fCat').value = btn.dataset.cat;
  });

  // Botons participants al modal
  document.getElementById('fPartBtns').addEventListener('click', e => {
    const btn = e.target.closest('.desp-part-btn');
    if (!btn) return;
    btn.classList.toggle('actiu');
  });

  // Escape tanca modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { tancaModal(); tancaModalPagament(); }
  });

  // Inicia Firebase
  initFirebase();
});
