/* ============================================================
   POI-CATEGORIES.JS  ·  Açores 2026
   Configuració centralitzada de categories de POIs.
   Carregat per: mapes.html · itinerari.html
   Font de veritat: poi-acores-2026.xlsx (full "Categories")
   ============================================================ */

const POI_CATEGORIES = {
  imprescindibles: { emoji: '⭐', color: '#fbbf24', label: 'Imprescindibles' },
  restaurants:     { emoji: '🍽️', color: '#f97316', label: 'Restaurants' },
  allotjaments:    { emoji: '🏠', color: '#8b5cf6', label: 'Allotjaments' },
  miradors:        { emoji: '🔭', color: '#a78bfa', label: 'Miradors' },
  piscines:        { emoji: '🏊', color: '#38bdf8', label: 'Piscines naturals' },
  platges:         { emoji: '🏖️', color: '#fbbf24', label: 'Platges' },
  naturalesa:      { emoji: '🌿', color: '#34d399', label: 'Naturalesa' },
  termals:         { emoji: '♨️', color: '#f87171', label: 'Aigues Termals' },
  coves:           { emoji: '🕳️', color: '#92400e', label: 'Coves' },
  fars:            { emoji: '🔦', color: '#94a3b8', label: 'Fars' },
  jardins:         { emoji: '🌺', color: '#ec4899', label: 'Jardins Botànics' },
  pobles:          { emoji: '🏘️', color: '#6abf70', label: 'Pobles' },
  altres:          { emoji: '📌', color: '#94a3b8', label: 'Altres llocs' },
  senderisme:      { emoji: '🥾', color: '#d97706', label: 'Senderisme' },
};

/* Mapeig de noms de categoria de ME_LLOCS → clau interna */
const ME_CAT_MAP = {
  'Miradors':       'miradors',
  'Piscines':       'piscines',
  'Platges':        'platges',
  'Naturalesa':     'naturalesa',
  'Aigues Termals': 'termals',
  'Coves':          'coves',
  'Fars':           'fars',
  'Jardi Botanic':  'jardins',
  'Jardins Botànics': 'jardins',
  'Pobles':         'pobles',
  'Altres':         'altres',
};

/* Helpers */
function poiCategoria(meCategoriaNom) {
  return ME_CAT_MAP[meCategoriaNom] || 'altres';
}
function poiEmoji(catId) {
  return (POI_CATEGORIES[catId] || POI_CATEGORIES.altres).emoji;
}
function poiColor(catId) {
  return (POI_CATEGORIES[catId] || POI_CATEGORIES.altres).color;
}
function poiLabel(catId) {
  return (POI_CATEGORIES[catId] || POI_CATEGORIES.altres).label;
}
