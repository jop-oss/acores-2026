// ── BINGO · Dades ─────────────────────────────────────────────
const BINGO_SITUACIONS = [
  { id:  1, text: 'Veure una balena' },
  { id:  2, text: 'Menjar cozida das Furnas' },
  { id:  3, text: 'Foto amb una vaca' },
  { id:  4, text: 'Pluja inesperada' },
  { id:  5, text: 'Nedar en aigües termals' },
  { id:  6, text: 'Veure un pop o estrella de mar a l\'aigua' },
  { id:  7, text: 'Perdre\'s per un camí' },
  { id:  8, text: 'Menjar percebes frescos' },
  { id:  9, text: 'Foto a la cima d\'un volcà' },
  { id: 10, text: 'Veure dofins des del vaixell' },
  { id: 11, text: 'Conduir per una carretera de penya-segat' },
  { id: 12, text: 'Tast de vi del Pico' },
  { id: 13, text: 'Arc de Sant Martí sobre el mar' },
  { id: 14, text: 'Trobar una platja deserta' },
  { id: 15, text: 'Boira espessa inesperada' },
  { id: 16, text: 'Foto amb hortènsies blaves' },
  { id: 17, text: 'Menjar pasteis de nata' },
  { id: 18, text: 'Veure una erupció de fumerola' },
  { id: 19, text: 'Travessia en ferri entre illes' },
  { id: 20, text: 'Foto amb el volcà del Pico de fons' },
  { id: 21, text: 'Menjar tonyina fresca' },
  { id: 22, text: 'Caminar per camps de lava' },
  { id: 23, text: 'Sentir el rots de la Mons en un trajecte amb cotxe' },
  { id: 24, text: 'Foto al port d\'Horta' },
  { id: 25, text: 'Descobrir un mirador secret' },
  { id: 26, text: 'Menjar formatge de São Jorge' },
  { id: 27, text: 'Banyar-se a una piscina natural de roca' },
  { id: 28, text: 'Veure les estrelles sense contaminació lluminosa' },
  { id: 29, text: 'Sopar en un restaurant amb vistes al mar' },
  { id: 30, text: 'Foto amb un burro o cavall' },
  { id: 31, text: 'Trobar un geiser o font termal' },
  { id: 32, text: 'Visitar una cova volcànica' },
  { id: 33, text: 'Menjar gelat local' },
  { id: 34, text: 'Foto amb totes les 6 persones del grup' },
  { id: 35, text: 'El Xu anant a la seva' },
  { id: 36, text: 'Veure la posta de sol des d\'un mirador' },
  { id: 37, text: 'Trobar un producte artesanal únic' },
  { id: 38, text: 'Fer senderisme més de 2 hores' },
  { id: 39, text: 'Veure una manta raia o tortuga marina' },
  { id: 40, text: 'Foto a la Lagoa das Sete Cidades' },
  { id: 41, text: 'Menjar carne de vinha d\'alhos' },
  { id: 42, text: 'Parlar amb un habitant local' },
  { id: 43, text: 'Llogar una bici' },
  { id: 44, text: 'Foto en una fajã' },
  { id: 45, text: 'Trobar un lloc sense cobertura mòbil' },
  { id: 46, text: 'Veure un arc de Sant Martí complet' },
  { id: 47, text: 'Menjar queijadas' },
  { id: 48, text: 'Foto amb el grup al ferri' },
  { id: 49, text: 'Nedar a l\'oceà Atlàntic' },
  { id: 50, text: 'Veure el Pico des de Faial' },
  { id: 51, text: 'Sentir el Jordi dient "Mons si us plau..."' },
  { id: 52, text: 'Veure l\'Anna fent poses per una foto' },
  { id: 53, text: 'La Laia volen enfilar-se a un lloc perillós' },
  { id: 54, text: 'Sentir la Mons renyant a la Laia' },
  { id: 55, text: 'Parlar amb la iaia' },
  { id: 56, text: 'Sentir la Mons histèrica en una carretera estreta' },
  { id: 57, text: 'El Xu anant a missa en portuguès' },
  { id: 58, text: 'Fer enfadar el Jordi fins que digui "Em teniu ben fregit"' },
  { id: 59, text: 'Fer un trajecte en cotxe amb la Laia conduint' },
  { id: 60, text: 'Veure el Joa demanant calamars fregits' },
];

// Cartró: 3 files × 5 columnes = 15 caselles
// Cada fila té 1 estrella (posició aleatòria) → 12 caselles per marcar
const BINGO_FILES = 3;
const BINGO_COLS  = 5;
const BINGO_TOTAL = BINGO_FILES * BINGO_COLS; // 15

// Genera un cartró aleatori per a un jugador
// Retorna array de 15 { id, text, estrella }
function bingoCreaCartro(llavor) {
  // Barreja les situacions amb la llavor del jugador
  const pool = [...BINGO_SITUACIONS].sort(() => Math.random() - 0.5);
  const seleccionades = pool.slice(0, 12); // 12 situacions (les 3 estrelles no conten)

  // Construeix les 3 files, cadascuna amb 1 estrella en posició aleatòria
  const caselles = [];
  let sitIdx = 0;
  for (let f = 0; f < BINGO_FILES; f++) {
    const posEstrella = Math.floor(Math.random() * BINGO_COLS);
    for (let c = 0; c < BINGO_COLS; c++) {
      if (c === posEstrella) {
        caselles.push({ id: `estrella_${f}`, text: '⭐', estrella: true, marcada: false });
      } else {
        const sit = seleccionades[sitIdx++];
        caselles.push({ id: sit.id, text: sit.text, estrella: false, marcada: false });
      }
    }
  }
  return caselles;
}

// Comprova si hi ha alguna línia horitzontal completa (totes marcades o estrelles)
function bingoTeLiniaHoritzontal(caselles) {
  for (let f = 0; f < BINGO_FILES; f++) {
    const fila = caselles.slice(f * BINGO_COLS, (f + 1) * BINGO_COLS);
    if (fila.every(c => c.marcada || c.estrella)) return f;
  }
  return -1;
}

// Comprova si el cartró és complet (bingo!)
function bingoEsComplet(caselles) {
  return caselles.every(c => c.marcada || c.estrella);
}

const BINGO_STORAGE_KEY = 'bingo_estat_';
const BINGO_PUNTS_LINIA = 50;
const BINGO_PUNTS_BINGO = 200;
