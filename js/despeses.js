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
  Jordi: '#e74c3c', Joa: '#f39c12',
  Mons:  '#8e44ad', Xu:  '#2980b9',
  Anna:  '#e67e22', Laia:'#27ae60',
};

const CAT_EMOJI = {
  transport:   '✈️',
  allotjament: '🏠',
  menjar:      '🍽️',
  activitat:   '🎒',
  altres:      '📦',
};

/* ──────────────────────────────────────────────────────────
   DESPESES PRE-CARREGADES
   ────────────────────────────────────────────────────────── */
const DESPESES_INICIALS = [
  // VOLS
  { id: 'pre_v1', desc: 'Vols Ryanair (BCN–OPO) + SATA part', import: 1600.00, pagador: 'Mons', cat: 'transport', data: '2026-01-15', illa: '', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_v2', desc: 'Vols Ryanair (resta) + TAP (LIS–BCN)', import: 874.86, pagador: 'Jordi', cat: 'transport', data: '2026-01-15', illa: '', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
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
  { id: 'pre_c2', desc: 'Cotxes São Jorge #1+#2 (Azores Moto Rent)', import: 178.00, pagador: 'Jordi', cat: 'transport', data: '2026-07-28', illa: 'São Jorge', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_c3', desc: 'Cotxes Pico #1+#2 (Oàsis Car Rental)', import: 478.00, pagador: 'Jordi', cat: 'transport', data: '2026-07-28', illa: 'Pico', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
  { id: 'pre_c4', desc: 'Cotxes Faial #1+#2 (Autatlantis)', import: 312.10, pagador: 'Jordi', cat: 'transport', data: '2026-07-31', illa: 'Faial', participants: ['Jordi','Joa','Mons','Xu'], pre: true },
];

/* ──────────────────────────────────────────────────────────
   FIREBASE
   ────────────────────────────────────────────────────────── */
let db;
let despesesDinamiques = []; // Les de Firebase
let filtreActiu = 'totes';
let editantId    = null;

function initFirebase() {
  try {
    db = firebase.firestore();
    db.collection('despeses').orderBy('ts', 'asc').onSnapshot(snap => {
      despesesDinamiques = snap.docs.map(d => ({ id: d.id, ...d.data() }));
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

function calcSaldos() {
  // pagat[persona] = total que ha pagat
  // deu[persona]   = total que deu (suma de import/nParticipants per cada despesa on participa)
  const pagat = {}, deu = {};
  TOTS.forEach(p => { pagat[p] = 0; deu[p] = 0; });

  totesDespeses().forEach(d => {
    const parts = d.participants || GRUP_PAGADOR;
    const quota = d.import / parts.length;
    pagat[d.pagador] = (pagat[d.pagador] || 0) + d.import;
    parts.forEach(p => { deu[p] = (deu[p] || 0) + quota; });
  });

  // saldo = pagat - deu  (positiu → li deuen diners; negatiu → deu diners)
  const saldos = {};
  TOTS.forEach(p => { saldos[p] = +(( pagat[p] || 0) - (deu[p] || 0)).toFixed(2); });
  return { saldos, pagat, deu };
}

// Algorisme de liquidació: minimitza el nombre de transferències
function calcLiquidacio(saldos) {
  // Separa creditors (se'ls deu) i deutors (deuen)
  const cred = [], deut = [];
  Object.entries(saldos).forEach(([p, s]) => {
    if (s > 0.01) cred.push({ nom: p, val: s });
    if (s < -0.01) deut.push({ nom: p, val: -s });
  });

  // Ordena de major a menor
  cred.sort((a, b) => b.val - a.val);
  deut.sort((a, b) => b.val - a.val);

  const transf = [];
  let i = 0, j = 0;
  while (i < deut.length && j < cred.length) {
    const paga  = deut[i];
    const cobra = cred[j];
    const import_ = Math.min(paga.val, cobra.val);
    transf.push({ de: paga.nom, a: cobra.nom, import: +import_.toFixed(2) });
    paga.val  -= import_;
    cobra.val -= import_;
    if (paga.val  < 0.01) i++;
    if (cobra.val < 0.01) j++;
  }
  return transf;
}

/* ──────────────────────────────────────────────────────────
   RENDER SALDOS
   ────────────────────────────────────────────────────────── */
function renderSaldos() {
  const { saldos, pagat, deu } = calcSaldos();
  const wrap = document.getElementById('despSaldos');
  wrap.innerHTML = '';

  TOTS.forEach(p => {
    const s = saldos[p];
    const esGrup = GRUP_PAGADOR.includes(p);
    const card = document.createElement('div');
    card.className = `desp-saldo-card border-${p} top-${p}${esGrup ? '' : ' no-grup'}`;

    const signe = s > 0.01 ? '+' : '';
    const cls   = s > 0.01 ? 'positiu' : s < -0.01 ? 'negatiu' : 'zero';
    const sublbl = s > 0.01 ? 'li han de tornar' : s < -0.01 ? 'ha de pagar' : 'compensat';

    card.innerHTML = `
      <div class="desp-saldo-nom">
        <span class="desp-saldo-avatar color-${p}">${p[0]}</span>
        ${p}
      </div>
      <div class="desp-saldo-pagat">Pagat: <strong>${fmt(pagat[p] || 0)} €</strong></div>
      <div class="desp-saldo-resultat ${cls}">${signe}${fmt(Math.abs(s))} €</div>
      <div class="desp-saldo-sublbl">${sublbl}</div>
    `;
    wrap.appendChild(card);
  });
}

/* ──────────────────────────────────────────────────────────
   RENDER LIQUIDACIÓ
   ────────────────────────────────────────────────────────── */
function renderLiquidacio() {
  const { saldos } = calcSaldos();
  const transf = calcLiquidacio(saldos);
  const wrap = document.getElementById('despLiquidacio');
  wrap.innerHTML = '';

  if (transf.length === 0) {
    wrap.innerHTML = '<div class="desp-liquidacio-ok">✅ Tots els saldos estan compensats!</div>';
    return;
  }

  transf.forEach(t => {
    const el = document.createElement('div');
    el.className = 'desp-liquidacio-item';
    el.innerHTML = `
      <span class="desp-saldo-avatar color-${t.de}" style="width:24px;height:24px;font-size:0.65rem">${t.de[0]}</span>
      <span class="desp-liq-de">${t.de}</span>
      <span class="desp-liq-arrow">→</span>
      <span class="desp-saldo-avatar color-${t.a}" style="width:24px;height:24px;font-size:0.65rem">${t.a[0]}</span>
      <span class="desp-liq-a">${t.a}</span>
      <span class="desp-liq-import">${fmt(t.import)} €</span>
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
        ${!d.pre ? `<button class="desp-item-btn" onclick="editaDespesa('${d.id}')">✏️</button>
        <button class="desp-item-btn del" onclick="eliminaDespesa('${d.id}')">🗑</button>` : '<span style="font-size:0.65rem;color:var(--d-muted);padding:0 4px">pre</span>'}
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
  renderLiquidacio();
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

  if (db) {
    if (editantId) {
      db.collection('despeses').doc(editantId).update(dades);
    } else {
      db.collection('despeses').add(dades);
    }
  } else {
    // Mode local (sense Firebase)
    if (editantId) {
      const idx = despesesDinamiques.findIndex(d => d.id === editantId);
      if (idx >= 0) despesesDinamiques[idx] = { id: editantId, ...dades };
    } else {
      despesesDinamiques.push({ id: 'local_' + Date.now(), ...dades });
    }
    render();
  }
  tancaModal();
}

function editaDespesa(id) {
  const d = despesesDinamiques.find(x => x.id === id);
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
    if (e.key === 'Escape') tancaModal();
  });

  // Inicia Firebase
  initFirebase();
});
