// ═══════════════════════════════════════════════════════════
//  SERVICE WORKER · Açores 2026
// ═══════════════════════════════════════════════════════════
//  Estratègia:
//   - App shell (html/css/js/imatges pròpies): "stale-while-
//     revalidate" — es serveix a l'instant des de la caché si
//     ja hi és, i s'actualitza en segon pla per la propera vegada.
//   - Tot el que és extern (Firestore, Google Maps/Photos,
//     webcams, meteorologia...): sempre xarxa, mai es cacheja.
//
//  Si mai cal forçar que tothom rebi la versió nova de cop
//  (en lloc d'esperar 1-2 visites), puja aquest número.
// ═══════════════════════════════════════════════════════════
const CACHE_VERSION = 'acores-2026-v1';

// Fitxers essencials que es guarden en caché de seguida en instal·lar-se.
// La resta de pàgines/fitxers es van afegint sols la primera vegada que es visiten.
const APP_SHELL = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './img/favicon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Només GET del mateix origen (la pròpia web). Tot el que és
  // extern (Firestore, Google Maps, webcams, meteo, etc.) es
  // deixa passar sense tocar-ho: sempre xarxa, mai caché.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);

      // Si ja el tenim en caché, es serveix a l'instant i s'actualitza
      // en segon pla. Si no, s'espera la xarxa (i es guarda per la
      // propera vegada).
      return cached || network;
    })
  );
});
