/* ============================================================
   BLOG.JS  ·  Açores 2026
   Diari del viatge en temps real (Firebase Firestore)
   Col·lecció Firebase: blog / (docs)
   Cada document: { autor, text, fotoB64, ts, tsMs }
   Fotos guardades com a base64 directament a Firestore (< 1 MB recomanat)
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────
   CONSTANTS
   ────────────────────────────────────────────────────────── */
const BLOG_COLORS = {
  Jordi: '#e74c3c',
  Joa:   '#f1c40f',
  Mons:  '#8e44ad',
  Xu:    '#2980b9',
  Anna:  '#e84393',
  Laia:  '#27ae60',
};

const BLOG_PIN_ADMIN = '2468';
const BLOG_PIN_SALT  = 'blog_salt_acores_';

/* ──────────────────────────────────────────────────────────
   ESTAT
   ────────────────────────────────────────────────────────── */
let blogDb          = null;
let blogEntrades    = [];          // array ordenat (newest first)
let blogFiltreAutor = null;        // null = tots
let blogFiltreDia   = null;        // null = tots els dies (clau 'dd/mm/yyyy')
let blogEditantId   = null;        // id doc en edició
let blogFotoBase64  = null;        // foto seleccionada (base64 per preview)
let blogFotoFile    = null;        // File object per pujar
let blogUnsubscribe  = null;
let blogPinCallback  = null;        // funció a cridar un cop PIN correcte
let blogPinHashCache = null;        // hash calculat del PIN d'admin
let blogEsAdmin      = false;       // true un cop PIN correcte introduït

/* ──────────────────────────────────────────────────────────
   FIREBASE — inicialització robusta
   Igual que despeses.js: usa firebase.firestore() directament.
   config.js (que carrega abans) ja ha cridat firebase.initializeApp().
   ────────────────────────────────────────────────────────── */
function blogGetDb() {
  if (blogDb) return blogDb;
  try {
    // Intenta obtenir l'app existent (inicialitzada per config.js)
    if (typeof firebase !== 'undefined') {
      if (!firebase.apps.length && typeof CONFIG !== 'undefined' && CONFIG.FIREBASE) {
        firebase.initializeApp(CONFIG.FIREBASE);
      }
      if (firebase.apps.length) {
        blogDb = firebase.firestore();
      }
    }
  } catch(e) { console.warn('Blog: Firebase no disponible', e); }
  return blogDb;
}

/* ──────────────────────────────────────────────────────────
   HASH PIN (idèntic al patró de frase-esbojarrada)
   ────────────────────────────────────────────────────────── */
async function blogHashPin(pin) {
  const enc = new TextEncoder().encode(BLOG_PIN_SALT + pin);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
}

async function blogPinEsCorrecte(pin) {
  if (!blogPinHashCache) {
    blogPinHashCache = await blogHashPin(BLOG_PIN_ADMIN);
  }
  const hash = await blogHashPin(pin);
  return hash === blogPinHashCache;
}

/* ──────────────────────────────────────────────────────────
   JUGADOR ACTIU
   ────────────────────────────────────────────────────────── */
function blogJugadorActiu() {
  return localStorage.getItem('app_jugador') || null;
}

/* ──────────────────────────────────────────────────────────
   INICIALITZACIÓ
   ────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  blogInicialitzar();

  // Escolta canvis d'identificació
  document.addEventListener('app:jugador-canviat', () => {
    blogActualitzarBotoAdd();
  });
});

function blogInicialitzar() {
  blogActualitzarBotoAdd();
  blogRenderFiltres();
  blogRenderFiltreDia();
  blogRenderBotoAdmin();
  blogEscoltarEntrades();
}

function blogActualitzarBotoAdd() {
  const jugador = blogJugadorActiu();
  const btnAdd  = document.getElementById('blogBtnAdd');
  const avisId  = document.getElementById('blogAvisId');
  if (!btnAdd || !avisId) return;

  if (jugador) {
    btnAdd.style.display  = 'inline-flex';
    avisId.style.display  = 'none';
  } else {
    btnAdd.style.display  = 'none';
    avisId.style.display  = 'block';
  }

  // Re-render llista per actualitzar botons d'editar/eliminar
  blogRenderLlista();
  blogRenderBotoAdmin();
}

function blogRenderBotoAdmin() {
  const wrap = document.getElementById('blogAdminWrap');
  if (!wrap) return;
  if (blogEsAdmin) {
    wrap.innerHTML = `
      <button class="blog-btn-admin actiu" onclick="blogDesactivaAdmin()" title="Desactivar mode admin">
        🔓 Admin actiu
      </button>`;
  } else {
    wrap.innerHTML = `
      <button class="blog-btn-admin" onclick="blogActivaAdmin()" title="Mode administrador">
        🔐 Admin
      </button>`;
  }
}

function blogActivaAdmin() {
  blogPinCallback = () => {
    blogEsAdmin = true;
    blogRenderBotoAdmin();
    blogRenderLlista();
  };
  blogObrePin();
}

function blogDesactivaAdmin() {
  blogEsAdmin = false;
  blogRenderBotoAdmin();
  blogRenderLlista();
}

/* ──────────────────────────────────────────────────────────
   FILTRES PER AUTOR
   ────────────────────────────────────────────────────────── */
function blogRenderFiltres() {
  const wrap = document.getElementById('blogFiltreAutor');
  if (!wrap) return;

  const jugadors = ['Jordi', 'Joa', 'Mons', 'Xu', 'Anna', 'Laia'];
  wrap.innerHTML = `
    <button class="blog-filtre-btn ${blogFiltreAutor === null ? 'actiu' : ''}"
            onclick="blogSetFiltre(null)">
      Tots
    </button>
    ${jugadors.map(nom => `
      <button class="blog-filtre-btn ${blogFiltreAutor === nom ? 'actiu' : ''}"
              onclick="blogSetFiltre('${nom}')">
        <span class="blog-filtre-dot" style="background:${BLOG_COLORS[nom]}"></span>
        ${nom}
      </button>
    `).join('')}
  `;
}

function blogSetFiltre(autor) {
  blogFiltreAutor = autor;
  blogRenderFiltres();
  blogRenderLlista();
}

/* ──────────────────────────────────────────────────────────
   FILTRE PER DIA
   ────────────────────────────────────────────────────────── */
function blogRenderFiltreDia() {
  const wrap = document.getElementById('blogFiltreDia');
  if (!wrap) return;

  // Recull els dies únics de totes les entrades (no filtrades per autor)
  const dies = [...new Set(
    blogEntrades.map(e => blogFormatDiaExport(e.tsMs)).filter(Boolean)
  )].sort((a, b) => {
    // Ordena dd/mm/yyyy cronològicament
    const parse = s => { const [d,m,y] = s.split('/'); return new Date(y,m-1,d); };
    return parse(a) - parse(b);
  });

  if (dies.length === 0) { wrap.innerHTML = ''; return; }

  wrap.innerHTML = `
    <button class="blog-filtre-btn blog-filtre-dia-btn ${blogFiltreDia === null ? 'actiu' : ''}"
            onclick="blogSetFiltreDia(null)">
      📅 Tots els dies
    </button>
    ${dies.map(dia => `
      <button class="blog-filtre-btn blog-filtre-dia-btn ${blogFiltreDia === dia ? 'actiu' : ''}"
              onclick="blogSetFiltreDia('${dia}')">
        ${blogDiaEtiquet(dia)}
      </button>
    `).join('')}
  `;
}

function blogSetFiltreDia(dia) {
  blogFiltreDia = dia;
  blogRenderFiltreDia();
  blogRenderLlista();
}

// Converteix dd/mm/yyyy a etiqueta llegible: "Dj 24 jul"
function blogDiaEtiquet(ddmmyyyy) {
  const [d, m, y] = ddmmyyyy.split('/');
  const data = new Date(+y, +m - 1, +d);
  return data.toLocaleDateString('ca-ES', { weekday: 'short', day: 'numeric', month: 'short' });
}

/* ──────────────────────────────────────────────────────────
   FIREBASE: ESCOLTAR ENTRADES (temps real)
   ────────────────────────────────────────────────────────── */
function blogEscoltarEntrades() {
  const db = blogGetDb();
  if (!db) {
    document.getElementById('blogLlista').innerHTML =
      '<div class="blog-loading">⚠️ No s\'ha pogut connectar a Firebase.</div>';
    return;
  }

  // Desconnecta listener anterior si n'hi havia
  if (blogUnsubscribe) blogUnsubscribe();

  blogUnsubscribe = db.collection('blog')
    .orderBy('tsMs', 'desc')
    .onSnapshot(snap => {
      blogEntrades = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      blogRenderFiltreDia();
      blogRenderLlista();
    }, err => {
      console.error('Blog listener error:', err);
      document.getElementById('blogLlista').innerHTML =
        '<div class="blog-loading">⚠️ Error en carregar les entrades.</div>';
    });
}

/* ──────────────────────────────────────────────────────────
   RENDER LLISTA
   ────────────────────────────────────────────────────────── */
function blogRenderLlista() {
  const wrap = document.getElementById('blogLlista');
  if (!wrap) return;

  const filtrades = blogEntrades
    .filter(e => !blogFiltreAutor || e.autor === blogFiltreAutor)
    .filter(e => !blogFiltreDia   || blogFormatDiaExport(e.tsMs) === blogFiltreDia);

  if (filtrades.length === 0) {
    wrap.innerHTML = `
      <div class="blog-buit">
        <div class="blog-buit-emoji">🌋</div>
        <div>${blogFiltreAutor
          ? `En ${blogFiltreAutor} encara no ha escrit res.`
          : 'Encara no hi ha entrades al diari.<br>Sigues el primer a escriure!'
        }</div>
      </div>`;
    return;
  }

  const jugador  = blogJugadorActiu();
  let html       = '';
  let darreraDia = null;

  filtrades.forEach((entrada, idx) => {
    // Separador de data
    const dia = blogFormatDia(entrada.tsMs);
    if (dia !== darreraDia) {
      html += `
        <div class="blog-data-sep" style="animation-delay:${idx * 0.03}s">
          <div class="blog-data-sep-linia"></div>
          <div class="blog-data-sep-text">${dia}</div>
          <div class="blog-data-sep-linia"></div>
        </div>`;
      darreraDia = dia;
    }

    const color   = BLOG_COLORS[entrada.autor] || '#6aab7a';
    const inicial = (entrada.autor || '?')[0].toUpperCase();
    const hora    = blogFormatHora(entrada.tsMs);
    const esAutor = jugador && jugador === entrada.autor;

    // Botons d'acció: l'autor veu els seus; l'admin veu tots
    let accions = '';
    if (esAutor || blogEsAdmin) {
      accions = `
        <button class="blog-accio-btn" title="Editar" onclick="blogEdita('${entrada.id}')">✏️</button>
        <button class="blog-accio-btn del" title="Eliminar" onclick="blogElimina('${entrada.id}')">🗑</button>
      `;
    }

    html += `
      <div class="blog-entrada" id="entrada-${entrada.id}" style="animation-delay:${idx * 0.04}s">
        <div class="blog-entrada-header">
          <div class="blog-autor-cercle" style="background:${color}">${inicial}</div>
          <div class="blog-autor-info">
            <div class="blog-autor-nom">${entrada.autor || 'Desconegut'}</div>
            <div class="blog-entrada-meta">
              <span>🕐 ${hora}</span>
            </div>
          </div>
          <div class="blog-entrada-accions">${accions}</div>
        </div>
        ${entrada.text ? `<div class="blog-entrada-cos">${blogEscapeHtml(entrada.text)}</div>` : ''}
        ${entrada.fotoB64 ? `
          <img class="blog-entrada-foto" src="${entrada.fotoB64}" alt="Foto de ${entrada.autor}"
               loading="lazy" onclick="blogVeureFoto('${entrada.fotoB64}')">
        ` : ''}
      </div>`;
  });

  wrap.innerHTML = html;
}

/* ──────────────────────────────────────────────────────────
   MODAL NOVA / EDITAR ENTRADA
   ────────────────────────────────────────────────────────── */
function blogObreModal(dades) {
  const jugador = blogJugadorActiu();
  if (!jugador) {
    alert("Identifica't primer per poder escriure al blog.");
    return;
  }

  blogEditantId  = dades?.id || null;
  blogFotoBase64 = null;
  blogFotoFile   = null;

  // Títol
  document.getElementById('blogModalTitol').textContent =
    blogEditantId ? 'Editar entrada' : 'Nova entrada';

  // Camps
  document.getElementById('bId').value    = blogEditantId || '';
  document.getElementById('bAutor').value = jugador;
  document.getElementById('bText').value  = dades?.text || '';
  document.getElementById('bCharCount').textContent = (dades?.text || '').length;

  // Preview foto
  const preview = document.getElementById('blogFotoPreview');
  if (dades?.fotoB64) {
    preview.innerHTML = `
      <img src="${dades.fotoB64}" class="blog-foto-preview-img" alt="Foto actual">
      <button class="blog-foto-remove" onclick="blogEliminaFotoPreview()" title="Eliminar foto">✕</button>`;
  } else {
    preview.innerHTML = `
      <span class="blog-foto-icon">📷</span>
      <span>Toca per afegir foto</span>`;
    preview.onclick = () => document.getElementById('bFoto').click();
  }

  // Obre
  document.getElementById('blogModal').classList.add('open');
  document.getElementById('blogModalOverlay').classList.add('open');
  setTimeout(() => document.getElementById('bText').focus(), 50);
}

function blogTancaModal() {
  document.getElementById('blogModal').classList.remove('open');
  document.getElementById('blogModalOverlay').classList.remove('open');
  blogEditantId  = null;
  blogFotoBase64 = null;
  blogFotoFile   = null;
  document.getElementById('bFoto').value = '';
}

/* Preview foto seleccionada */
function blogPreviewFoto(input) {
  const file = input.files[0];
  if (!file) return;

  // Comprova mida màxima (5 MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('La foto és massa gran. El màxim és 5 MB.');
    input.value = '';
    return;
  }

  blogFotoFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    blogFotoBase64 = e.target.result;
    const preview = document.getElementById('blogFotoPreview');
    preview.innerHTML = `
      <img src="${blogFotoBase64}" class="blog-foto-preview-img" alt="Preview">
      <button class="blog-foto-remove" onclick="blogEliminaFotoPreview()" title="Eliminar foto">✕</button>`;
    preview.onclick = null;
  };
  reader.readAsDataURL(file);
}

function blogEliminaFotoPreview() {
  blogFotoBase64 = null;
  blogFotoFile   = null;
  document.getElementById('bFoto').value = '';
  const preview = document.getElementById('blogFotoPreview');
  preview.innerHTML = `
    <span class="blog-foto-icon">📷</span>
    <span>Toca per afegir foto</span>`;
  preview.onclick = () => document.getElementById('bFoto').click();
}

/* Comptador caràcters */
document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('bText');
  if (textarea) {
    textarea.addEventListener('input', () => {
      document.getElementById('bCharCount').textContent = textarea.value.length;
    });
  }
});

/* ──────────────────────────────────────────────────────────
   GUARDAR ENTRADA
   ────────────────────────────────────────────────────────── */
async function blogGuarda() {
  const text   = (document.getElementById('bText').value || '').trim();
  const autor  = document.getElementById('bAutor').value;

  if (!text && !blogFotoBase64 && !blogEditantId) {
    alert('Escriu alguna cosa o afegeix una foto.');
    return;
  }
  if (!autor) {
    alert("Identifica't primer.");
    return;
  }

  const btnSave = document.getElementById('blogBtnSave');
  btnSave.disabled = true;
  btnSave.textContent = 'Publicant…';

  try {
    const db = blogGetDb();
    if (!db) throw new Error('Firebase no disponible');

    // Determina la foto a guardar
    let fotoB64 = null;
    if (blogFotoBase64) {
      // Nova foto seleccionada — comprimim si cal
      fotoB64 = await blogComprimeixFoto(blogFotoBase64);
    } else if (blogEditantId) {
      // Edició: manté foto existent tret que s'hagi eliminat el preview
      const entradaActual = blogEntrades.find(e => e.id === blogEditantId);
      const preview = document.getElementById('blogFotoPreview');
      const teFotoPreview = preview && preview.querySelector('img');
      fotoB64 = teFotoPreview ? (entradaActual?.fotoB64 || null) : null;
    }

    const dades = {
      autor,
      text,
      fotoB64,
      tsMs: Date.now(),
      ts:   firebase.firestore.FieldValue.serverTimestamp(),
    };

    if (blogEditantId) {
      await db.collection('blog').doc(blogEditantId).update(dades);
    } else {
      await db.collection('blog').add(dades);
    }

    blogTancaModal();
  } catch(err) {
    console.error('Error guardant entrada blog:', err);
    alert('Error en guardar. Torna-ho a intentar.');
  } finally {
    btnSave.disabled = false;
    btnSave.textContent = 'Publicar';
  }
}

/* Comprimeix la foto base64 a màx ~800px i qualitat 0.75 */
function blogComprimeixFoto(base64) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const MAX = 800;
      let { width: w, height: h } = img;
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
        else        { w = Math.round(w * MAX / h); h = MAX; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', 0.75));
    };
    img.onerror = () => resolve(base64); // si falla, usa l'original
    img.src = base64;
  });
}

/* ──────────────────────────────────────────────────────────
   EDITAR ENTRADA
   ────────────────────────────────────────────────────────── */
function blogEdita(id) {
  const entrada = blogEntrades.find(e => e.id === id);
  if (!entrada) return;

  const jugador = blogJugadorActiu();
  const potEditar = blogEsAdmin || (jugador && jugador === entrada.autor);
  if (!potEditar) return;

  blogObreModal(entrada);
}

/* ──────────────────────────────────────────────────────────
   ELIMINAR ENTRADA
   ────────────────────────────────────────────────────────── */
function blogElimina(id) {
  const entrada = blogEntrades.find(e => e.id === id);
  if (!entrada) return;

  const jugador = blogJugadorActiu();
  const potEliminar = blogEsAdmin || (jugador && jugador === entrada.autor);
  if (!potEliminar) return;

  if (!confirm('Segur que vols eliminar aquesta entrada?')) return;
  blogEliminaConfirmat(id);
}

async function blogEliminaConfirmat(id) {
  try {
    const db = blogGetDb();
    if (!db) throw new Error('Firebase no disponible');
    await db.collection('blog').doc(id).delete();
  } catch(err) {
    console.error('Error eliminant entrada blog:', err);
    alert('Error en eliminar. Torna-ho a intentar.');
  }
}

/* ──────────────────────────────────────────────────────────
   MODAL PIN ADMIN
   ────────────────────────────────────────────────────────── */
function blogObrePin() {
  document.getElementById('blogPinInput').value = '';
  document.getElementById('blogPinErr').style.display = 'none';
  document.getElementById('blogPinModal').classList.add('open');
  document.getElementById('blogPinOverlay').classList.add('open');
  setTimeout(() => document.getElementById('blogPinInput').focus(), 50);
}

function blogTancaPin() {
  document.getElementById('blogPinModal').classList.remove('open');
  document.getElementById('blogPinOverlay').classList.remove('open');
  blogPinCallback = null;
}

async function blogConfirmaPin() {
  const pin = document.getElementById('blogPinInput').value.trim();
  const ok  = await blogPinEsCorrecte(pin);

  if (!ok) {
    const errDiv = document.getElementById('blogPinErr');
    errDiv.style.display = 'block';
    errDiv.style.animation = 'none';
    void errDiv.offsetWidth;
    errDiv.style.animation = '';
    document.getElementById('blogPinInput').value = '';
    document.getElementById('blogPinInput').focus();
    return;
  }

  const cb = blogPinCallback;  // guardem abans de tancar
  blogTancaPin();               // tanca (posa blogPinCallback = null)
  if (typeof cb === 'function') cb();
}

/* ──────────────────────────────────────────────────────────
   VISOR FOTO
   ────────────────────────────────────────────────────────── */
function blogVeureFoto(url) {
  const overlay = document.getElementById('blogFotoOverlay');
  document.getElementById('blogFotoFull').src = url;
  overlay.classList.add('open');
  overlay.style.display = 'flex';
}

// Tanca visor amb Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    blogTancaModal();
    blogTancaPin();
    const overlay = document.getElementById('blogFotoOverlay');
    if (overlay) { overlay.classList.remove('open'); overlay.style.display = 'none'; }
  }
});

/* ──────────────────────────────────────────────────────────
   EXPORTAR A XLSX
   ────────────────────────────────────────────────────────── */
function blogExportaXlsx() {
  if (!blogEntrades.length) {
    alert('No hi ha entrades per exportar.');
    return;
  }

  // Prepara les files (ordre cronològic, les més antigues primer)
  const files = [...blogEntrades]
    .sort((a, b) => a.tsMs - b.tsMs)
    .map(e => ({
      'Dia':   blogFormatDiaExport(e.tsMs),
      'Hora':  blogFormatHora(e.tsMs),
      'Autor': e.autor || '',
      'Text':  e.text  || '',
    }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(files);

  // Amplades de columna
  ws['!cols'] = [
    { wch: 22 }, // Dia
    { wch: 8  }, // Hora
    { wch: 12 }, // Autor
    { wch: 80 }, // Text
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Diari del viatge');

  const nom = `blog_acores_2026_${new Date().toISOString().slice(0,10)}.xlsx`;
  XLSX.writeFile(wb, nom);
}

function blogFormatDiaExport(tsMs) {
  if (!tsMs) return '';
  return new Date(tsMs).toLocaleDateString('ca-ES', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
}


function blogFormatDia(tsMs) {
  if (!tsMs) return '—';
  const d = new Date(tsMs);
  return d.toLocaleDateString('ca-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
}

function blogFormatHora(tsMs) {
  if (!tsMs) return '—';
  const d = new Date(tsMs);
  return d.toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' });
}

function blogEscapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}
