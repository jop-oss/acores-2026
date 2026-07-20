// ══════════════════════════════════════════════════════════════
//  SINCRONITZACIÓ DE PUNTS DELS MINI-JOCS AMB FIRESTORE
// ══════════════════════════════════════════════════════════════
//  Abans, cada joc guardava els punts amb localStorage — és a dir,
//  només al mòbil concret on es jugava. Aquest fitxer dona a tots
//  els jocs un mateix patró senzill per guardar-ho a Firestore
//  (compartit de veritat entre tots els dispositius):
//
//   - jocFsCarregarTots(col, noms)  → carrega TOTS els jugadors
//     d'un cop i omple la caché en memòria (fer-ho un sol cop en
//     entrar al joc, amb await)
//   - jocFsCacheGet(col, nom)       → llegeix de la caché (síncron,
//     fer-lo servir dins dels renders com abans amb localStorage)
//   - jocFsDesar(col, nom, dades)   → actualitza la caché a l'instant
//     i ho puja a Firestore en segon pla (no cal esperar-lo)
//
//  Cada joc té la seva pròpia col·lecció (p.ex. 'snake_punts'),
//  amb un document per jugador (id = nom).
// ══════════════════════════════════════════════════════════════

function jocFsDb() {
  if (!firebase.apps.length) firebase.initializeApp(CONFIG.FIREBASE);
  return firebase.firestore();
}

// Caché en memòria: { [collectionName]: { [nom]: dades } }
const _jocFsCache = {};

async function jocFsCarregar(collectionName, nom) {
  try {
    const snap = await jocFsDb().collection(collectionName).doc(nom).get();
    const dades = snap.exists ? snap.data() : null;
    _jocFsCache[collectionName] = _jocFsCache[collectionName] || {};
    _jocFsCache[collectionName][nom] = dades;
    return dades;
  } catch (e) {
    console.error(`Error llegint ${collectionName}/${nom}:`, e);
    return null;
  }
}

async function jocFsCarregarTots(collectionName, noms) {
  const resultats = await Promise.all(noms.map((nom) => jocFsCarregar(collectionName, nom)));
  const out = {};
  noms.forEach((nom, i) => { out[nom] = resultats[i]; });
  return out;
}

function jocFsCacheGet(collectionName, nom) {
  return (_jocFsCache[collectionName] && _jocFsCache[collectionName][nom]) || null;
}

async function jocFsDesar(collectionName, nom, dades) {
  _jocFsCache[collectionName] = _jocFsCache[collectionName] || {};
  _jocFsCache[collectionName][nom] = dades; // actualitza la caché a l'instant
  try {
    await jocFsDb().collection(collectionName).doc(nom).set(dades);
  } catch (e) {
    console.error(`Error desant ${collectionName}/${nom}:`, e);
  }
}
