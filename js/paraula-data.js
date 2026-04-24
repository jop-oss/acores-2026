// ── LA PARAULA AMAGADA · Dades ────────────────────────────────
// Nivells: 'facil' = 4-5 lletres | 'mitja' = 6-7 lletres | 'expert' = 8+ lletres
// Les paraules s'emmagatzemen sense accents ni caràcters especials

const PARAULES_AMAGADA = [
  // ── FÀCIL: 4 lletres (15) ─────────────────────────────────
  { paraula: 'PICO',  nivell: 'facil', desc: 'Illa amb el volcà més alt de Portugal' },
  { paraula: 'LLAC',  nivell: 'facil', desc: 'Massa d\'aigua dolça d\'origen volcànic' },
  { paraula: 'LAVA',  nivell: 'facil', desc: 'Roca fosa que surt dels volcans' },
  { paraula: 'ILLA',  nivell: 'facil', desc: 'Extensió de terra envoltada d\'oceà' },
  { paraula: 'PORT',  nivell: 'facil', desc: 'Lloc on atraquen els vaixells' },
  { paraula: 'ONES',  nivell: 'facil', desc: 'Moviment de l\'oceà Atlàntic' },
  { paraula: 'PEIX',  nivell: 'facil', desc: 'Animal marí molt present a la dieta açoriana' },
  { paraula: 'COVA',  nivell: 'facil', desc: 'Forat natural a la roca, sovint volcànic' },
  { paraula: 'CARN',  nivell: 'facil', desc: 'L\'alcatra és el plat de carn típic de Terceira' },
  { paraula: 'VELA',  nivell: 'facil', desc: 'Tela que impulsa un vaixell amb el vent' },
  { paraula: 'TUFO',  nivell: 'facil', desc: 'Roca volcànica porosa típica de les Açores' },
  { paraula: 'MAPA',  nivell: 'facil', desc: 'Representació gràfica del territori' },
  { paraula: 'ROCA',  nivell: 'facil', desc: 'Formació pètria volcànica de les illes' },
  { paraula: 'VENT',  nivell: 'facil', desc: 'Element meteorològic molt present a les illes' },
  { paraula: 'BOIA',  nivell: 'facil', desc: 'Objecte flotant per senyalitzar al mar' },

  // ── FÀCIL: 5 lletres (20) ─────────────────────────────────
  { paraula: 'VOLCA', nivell: 'facil', desc: 'Estructura geològica que emet lava i gas' },
  { paraula: 'BALEA', nivell: 'facil', desc: 'Gran mamífer marí que es caçava a les Açores' },
  { paraula: 'HORTA', nivell: 'facil', desc: 'Capital de l\'illa de Faial' },
  { paraula: 'VELAS', nivell: 'facil', desc: 'Capital de l\'illa de São Jorge' },
  { paraula: 'NEGRA', nivell: 'facil', desc: 'Color de la sorra volcànica de les platges' },
  { paraula: 'FURNA', nivell: 'facil', desc: 'Cova natural d\'origen volcànic a les Açores' },
  { paraula: 'SISMO', nivell: 'facil', desc: 'Terratrèmol, fenomen freqüent a les Açores' },
  { paraula: 'CANOA', nivell: 'facil', desc: 'Embarcació tradicional usada per caçar balenes' },
  { paraula: 'PRAIA', nivell: 'facil', desc: 'Paraula portuguesa per dir platja' },
  { paraula: 'FAROL', nivell: 'facil', desc: 'Torre de llum que guia els mariners a la costa' },
  { paraula: 'CALDO', nivell: 'facil', desc: 'Brou típic de la cuina açoriana' },
  { paraula: 'MAREE', nivell: 'facil', desc: 'Pujada i baixada periòdica del nivell del mar' },
  { paraula: 'GRUTA', nivell: 'facil', desc: 'Galeria subterrània de lava solidificada' },
  { paraula: 'PEDRA', nivell: 'facil', desc: 'Material volcànic que forma el sòl de les illes' },
  { paraula: 'VAPOR', nivell: 'facil', desc: 'Gas que surt de les fumaroles de Furnas' },
  { paraula: 'OCEAN', nivell: 'facil', desc: 'Gran massa d\'aigua que envolta les Açores' },
  { paraula: 'FESTA', nivell: 'facil', desc: 'Celebració popular molt arrelada a les Açores' },
  { paraula: 'FAJAA', nivell: 'facil', desc: 'Plana costanera formada per esllavissades' },
  { paraula: 'PONTA', nivell: 'facil', desc: 'Cap o extrem de terra que penetra al mar' },
  { paraula: 'BRUMA', nivell: 'facil', desc: 'Boira lleugera típica dels matins açorians' },

  // ── MITJÀ: 6 lletres (20) ─────────────────────────────────
  { paraula: 'FURNAS', nivell: 'mitja', desc: 'Vall geotèrmica de São Miguel famosa pels geisers' },
  { paraula: 'BALEIA', nivell: 'mitja', desc: 'Gran cetaci que es caçava des de les Açores' },
  { paraula: 'MARINA', nivell: 'mitja', desc: 'Port esportiu, especialment famós a Horta' },
  { paraula: 'VULCAO', nivell: 'mitja', desc: 'Paraula portuguesa per volcà' },
  { paraula: 'LAGUNA', nivell: 'mitja', desc: 'Llac costaner separat del mar per una barrera' },
  { paraula: 'NACOES', nivell: 'mitja', desc: 'Les Açores acullen vaixells de moltes d\'elles' },
  { paraula: 'VIAGEM', nivell: 'mitja', desc: 'Paraula portuguesa per viatge' },
  { paraula: 'QUEIJO', nivell: 'mitja', desc: 'Formatge, producte estrella de São Jorge' },
  { paraula: 'MANADA', nivell: 'mitja', desc: 'Grup de balenes que neden juntes' },
  { paraula: 'PEDRAS', nivell: 'mitja', desc: 'Plural de pedra, present a tot el paisatge volcànic' },
  { paraula: 'FLORES', nivell: 'mitja', desc: 'Illa de les Açores coneguda per les cascades' },
  { paraula: 'TERMAS', nivell: 'mitja', desc: 'Aigues termals de Furnas, bones per banyar-se' },
  { paraula: 'ATLANT', nivell: 'mitja', desc: 'Relatiu a l\'oceà que envolta les Açores' },
  { paraula: 'MIRALL', nivell: 'mitja', desc: 'Els llacs volcànics semblen un gran mirall' },
  { paraula: 'OLIVAR', nivell: 'mitja', desc: 'Camp d\'oliveres, present a algunes illes' },
  { paraula: 'COLHER', nivell: 'mitja', desc: 'Cullera, utensili per prendre la cozida' },
  { paraula: 'TOUROS', nivell: 'mitja', desc: 'Toros de carrer, tradició festiva de Terceira' },
  { paraula: 'MUSEUS', nivell: 'mitja', desc: 'Plural de museu, molts dedicats a la caça de balenes' },
  { paraula: 'RAPIDO', nivell: 'mitja', desc: 'Corrent marí ràpid entre les illes' },
  { paraula: 'MORCAO', nivell: 'mitja', desc: 'Embotit típic açorià fet amb sang de porc' },

  // ── MITJÀ: 7 lletres (20) ─────────────────────────────────
  { paraula: 'CAPELEO', nivell: 'mitja', desc: 'Zona del volcà de Faial que va erupcionar el 1957' },
  { paraula: 'CALDEIA', nivell: 'mitja', desc: 'Depressió volcànica, com la del Faial' },
  { paraula: 'ATLANTS', nivell: 'mitja', desc: 'Habitants mítics de l\'Atlàntida, llegenda oceànica' },
  { paraula: 'THERMAL', nivell: 'mitja', desc: 'Relatiu a les aigues calentes de Furnas' },
  { paraula: 'LAGARTO', nivell: 'mitja', desc: 'Llangardaix, rèptil present a les Açores' },
  { paraula: 'COZINHA', nivell: 'mitja', desc: 'Paraula portuguesa per cuina' },
  { paraula: 'OCEANIC', nivell: 'mitja', desc: 'Relatiu a l\'oceà, clima de les Açores' },
  { paraula: 'TURISMA', nivell: 'mitja', desc: 'Activitat principal de l\'economia açoriana' },
  { paraula: 'MIRADOR', nivell: 'mitja', desc: 'Punt elevat per contemplar el paisatge' },
  { paraula: 'SEREIAS', nivell: 'mitja', desc: 'Sirenes de la mitologia marinera açoriana' },
  { paraula: 'PASTEIS', nivell: 'mitja', desc: 'Pastes dolces típiques de la pastisseria açoriana' },
  { paraula: 'PELAGIC', nivell: 'mitja', desc: 'Relatiu a la zona oberta de l\'oceà' },
  { paraula: 'PESCADA', nivell: 'mitja', desc: 'Lluç, peix molt consumit a les Açores' },
  { paraula: 'AZULEJO', nivell: 'mitja', desc: 'Rajola decorativa típica de l\'arquitectura portuguesa' },
  { paraula: 'VERDEAL', nivell: 'mitja', desc: 'Varietat de raïm blanc cultivada a l\'illa de Pico' },
  { paraula: 'LEVADAS', nivell: 'mitja', desc: 'Canals d\'irrigació típics de les illes atlàntiques' },
  { paraula: 'BALEIAS', nivell: 'mitja', desc: 'Plural de baleia, les balenes que visiten les Açores' },
  { paraula: 'GOLFING', nivell: 'mitja', desc: 'Esport popular a les Açores pels seus camps verds' },
  { paraula: 'CALDERO', nivell: 'mitja', desc: 'Olla gran, també depressió volcànica' },
  { paraula: 'GAROUPA', nivell: 'mitja', desc: 'Mero, peix de roca molt apreciat a les Açores' },

  // ── EXPERT: 8 lletres (15) ────────────────────────────────
  { paraula: 'CAPELINH', nivell: 'expert', desc: 'Volcà de Faial que va erupcionar el 1957-58' },
  { paraula: 'CALDEIRA', nivell: 'expert', desc: 'Gran depressió volcànica al cim d\'un volcà' },
  { paraula: 'ATLANTID', nivell: 'expert', desc: 'Continent llegendari que se suposa estava a l\'Atlàntic' },
  { paraula: 'SETESTAD', nivell: 'expert', desc: 'Les Sete Cidades, volcà emblemàtic de São Miguel' },
  { paraula: 'TERCEIR',  nivell: 'expert', desc: 'Illa de les Açores on es troba Angra do Heroísmo' },
  { paraula: 'VULCANIS', nivell: 'expert', desc: 'Relatiu als processos volcànics de les illes' },
  { paraula: 'MARITIME', nivell: 'expert', desc: 'Relatiu al mar, la cultura de les Açores ho és' },
  { paraula: 'HORTENSI', nivell: 'expert', desc: 'Flor blava o rosa que omple els camins de les illes' },
  { paraula: 'GEISERMS', nivell: 'expert', desc: 'Surgències d\'aigua calenta a pressió a Furnas' },
  { paraula: 'SUBTROP',  nivell: 'expert', desc: 'Clima de les Açores, entre tropical i temperat' },
  { paraula: 'TECTONIC', nivell: 'expert', desc: 'Relatiu al moviment de les plaques terrestres' },
  { paraula: 'BIOSFERA', nivell: 'expert', desc: 'Reserva de la biosfera, distinció de les Açores' },
  { paraula: 'FUMAROLA', nivell: 'expert', desc: 'Emissió de gas volcànic calent per la terra' },
  { paraula: 'MAGMATIC', nivell: 'expert', desc: 'Relatiu al magma, origen de les roques volcàniques' },
  { paraula: 'PANORAMA', nivell: 'expert', desc: 'Vista espectacular des dels miradors açorians' },

  // ── EXPERT: 9+ lletres (10) ───────────────────────────────
  { paraula: 'CAPELINHOS', nivell: 'expert', desc: 'Volcà de Faial que va sorgir del mar el 1957' },
  { paraula: 'SETECIDAD', nivell: 'expert', desc: 'Laguna volcànica de colors de São Miguel' },
  { paraula: 'TERCEIRAN', nivell: 'expert', desc: 'Relatiu a l\'illa de Terceira' },
  { paraula: 'GEOTHERMA', nivell: 'expert', desc: 'Energia provinent de la calor interior de la Terra' },
  { paraula: 'HORTENSIS', nivell: 'expert', desc: 'Família de la flor que decora els camins de Faial' },
  { paraula: 'SUBTROPICA', nivell: 'expert', desc: 'Tipus de clima de les illes açorianes' },
  { paraula: 'VOLCANISME', nivell: 'expert', desc: 'Conjunt de fenòmens relacionats amb els volcans' },
  { paraula: 'MIGRATORI',  nivell: 'expert', desc: 'Tipus d\'ocell que fa escala a les Açores' },
  { paraula: 'PATRIMONIO', nivell: 'expert', desc: 'Angra do Heroísmo és Patrimoni de la Humanitat' },
  { paraula: 'BIODIVERS',  nivell: 'expert', desc: 'Riquesa d\'espècies animals i vegetals de les illes' },
];

// ── UTILITATS ──────────────────────────────────────────────────
function normalitzar(str) {
  return str.toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/Ç/g, 'C')
    .replace(/Ñ/g, 'N')
    .replace(/·/g, 'L');
}

function paraulesPerNivell(nivell) {
  return PARAULES_AMAGADA.filter(p => p.nivell === nivell);
}

function triarParaules(nivell, n = 5) {
  const pool = paraulesPerNivell(nivell);
  const barrejat = [...pool].sort(() => Math.random() - 0.5);
  return barrejat.slice(0, Math.min(n, barrejat.length));
}

function numIntents(paraula) {
  return paraula.length + 1;
}

// Puntuació per dificultat i intent
// intent = 1-based (1 = primer intent, n = últim intent on n = numIntents)
function calcularPunts(nivell, intentActual, totalIntents, pistesUsades) {
  const pts = {
    facil:  { primer: 8,  altres: 5,  penultim: 2,  ultim: 1 },
    mitja:  { primer: 10, altres: 8,  penultim: 5,  ultim: 3 },
    expert: { primer: 20, altres: 12, penultim: 8,  ultim: 5 },
  };
  const t = pts[nivell];
  let base = 0;
  if (intentActual === 1) base = t.primer;
  else if (intentActual === totalIntents) base = t.ultim;
  else if (intentActual >= totalIntents - 2) base = t.penultim;
  else base = t.altres;
  return Math.max(0, base - pistesUsades);
}

const PA_NIVELL_LABEL = { facil: 'Fàcil', mitja: 'Mitjà', expert: 'Expert' };
const PA_NIVELL_DESC  = { facil: 'Paraules de 4-5 lletres', mitja: 'Paraules de 6-7 lletres', expert: 'Paraules de 8+ lletres' };
const PA_STORAGE_KEY  = 'joc_paraula_estat_';
const PA_MAX_PARTIDES = 10; // per nivell
const PA_PARAULES_PARTIDA = 5;
