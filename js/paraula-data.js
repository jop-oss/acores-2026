// ── LA PARAULA AMAGADA · Dades ────────────────────────────────
// Nivells: 'facil' = 4-5 lletres | 'mitja' = 6-7 lletres | 'expert' = 8+ lletres
// Les paraules s'emmagatzemen sense accents ni caràcters especials

const PARAULES_AMAGADA = [

  // ── FACIL: 4 lletres ──────────────────────────────────────
  { paraula: 'ALGA', nivell: 'facil', desc: 'Planta aquàtica present a les costes açorianes' },
  { paraula: 'BOIA', nivell: 'facil', desc: 'Objecte flotant per senyalitzar al mar' },
  { paraula: 'BOSC', nivell: 'facil', desc: 'Extensió de terreny poblada d\'arbres' },
  { paraula: 'CARN', nivell: 'facil', desc: 'L\'alcatra és el plat de carn típic de Terceira' },
  { paraula: 'COVA', nivell: 'facil', desc: 'Forat natural a la roca, sovint volcànic' },
  { paraula: 'DUNA', nivell: 'facil', desc: 'Acumulació de sorra formada pel vent' },
  { paraula: 'FAJA', nivell: 'facil', desc: 'Plana costanera formada per esllavissades (en portuguès)' },
  { paraula: 'FARO', nivell: 'facil', desc: 'Capital de la regió de l\'Algarve, també nom de far en portuguès' },
  { paraula: 'GALL', nivell: 'facil', desc: 'Au domèstica molt present als pobles açorians' },
  { paraula: 'GOLF', nivell: 'facil', desc: 'Esport popular a les Açores pels seus camps verds' },
  { paraula: 'GOTA', nivell: 'facil', desc: 'Petit volum de líquid, present a la pluja i les fonts termals' },
  { paraula: 'ILLA', nivell: 'facil', desc: 'Extensió de terra envoltada d\'oceà' },
  { paraula: 'LAVA', nivell: 'facil', desc: 'Roca fosa que surt dels volcans' },
  { paraula: 'LLAC', nivell: 'facil', desc: 'Massa d\'aigua dolça d\'origen volcànic' },
  { paraula: 'MAPA', nivell: 'facil', desc: 'Representació gràfica del territori' },
  { paraula: 'OCEA', nivell: 'facil', desc: 'Gran massa d\'aigua que envolta les Açores' },
  { paraula: 'ONES', nivell: 'facil', desc: 'Moviment de l\'oceà Atlàntic' },
  { paraula: 'ONZA', nivell: 'facil', desc: 'Unitat de pes usada en la pesca tradicional' },
  { paraula: 'ORCA', nivell: 'facil', desc: 'Gran cetaci depredador que visita l\'Atlàntic nord' },
  { paraula: 'PEIX', nivell: 'facil', desc: 'Animal marí molt present a la dieta açoriana' },
  { paraula: 'PICO', nivell: 'facil', desc: 'Illa amb el volcà més alt de Portugal' },
  { paraula: 'PORT', nivell: 'facil', desc: 'Lloc on atraquen els vaixells' },
  { paraula: 'ROCA', nivell: 'facil', desc: 'Formació pètria volcànica de les illes' },
  { paraula: 'TOBA', nivell: 'facil', desc: 'Roca volcànica porosa típica de les Açores' },
  { paraula: 'VELA', nivell: 'facil', desc: 'Tela que impulsa un vaixell amb el vent' },
  { paraula: 'VENT', nivell: 'facil', desc: 'Element meteorològic molt present a les illes' },
  { paraula: 'BAIXA', nivell: 'facil', desc: 'Zona poc profunda del mar, típica de les costes' },
  { paraula: 'BARCA', nivell: 'facil', desc: 'Embarcació petita de pesca tradicional' },
  { paraula: 'BRUMA', nivell: 'facil', desc: 'Boira lleugera típica dels matins açorians' },
  { paraula: 'BUFAR', nivell: 'facil', desc: 'Acció del vent atlàntic sobre les illes' },
  { paraula: 'CALDO', nivell: 'facil', desc: 'Brou típic de la cuina açoriana' },
  { paraula: 'CANOA', nivell: 'facil', desc: 'Embarcació tradicional usada per caçar balenes' },
  { paraula: 'FAROL', nivell: 'facil', desc: 'Torre de llum que guia els mariners a la costa' },
  { paraula: 'FESTA', nivell: 'facil', desc: 'Celebració popular molt arrelada a les Açores' },
  { paraula: 'FORAT', nivell: 'facil', desc: 'Obertura a la roca, com les coves volcàniques' },
  { paraula: 'FURNA', nivell: 'facil', desc: 'Cova natural d\'origen volcànic a les Açores' },
  { paraula: 'GRUTA', nivell: 'facil', desc: 'Galeria subterrània de lava solidificada' },
  { paraula: 'HORTA', nivell: 'facil', desc: 'Capital de l\'illa de Faial' },
  { paraula: 'LLUNA', nivell: 'facil', desc: 'Satèl·lit que governa les marees de l\'oceà' },
  { paraula: 'MAGMA', nivell: 'facil', desc: 'Roca fosa a l\'interior de la terra' },
  { paraula: 'MAREA', nivell: 'facil', desc: 'Pujada i baixada del nivell de la mar' },
  { paraula: 'NEGRA', nivell: 'facil', desc: 'Color de la sorra volcànica de les platges' },
  { paraula: 'PEDRA', nivell: 'facil', desc: 'Material volcànic que forma el sòl de les illes' },
  { paraula: 'PONTA', nivell: 'facil', desc: 'Cap o extrem de terra que penetra al mar' },
  { paraula: 'PRAIA', nivell: 'facil', desc: 'Paraula portuguesa per dir platja' },
  { paraula: 'RAPID', nivell: 'facil', desc: 'Corrent marí ràpid entre les illes' },
  { paraula: 'ROCHA', nivell: 'facil', desc: 'Paraula portuguesa per roca o penya-segat' },
  { paraula: 'SISME', nivell: 'facil', desc: 'Terratrèmol, fenomen freqüent a les Açores' },
  { paraula: 'VAPOR', nivell: 'facil', desc: 'Gas que surt de les fumaroles de Furnas' },
  { paraula: 'VELAS', nivell: 'facil', desc: 'Capital de l\'illa de São Jorge' },
  { paraula: 'VOLCA', nivell: 'facil', desc: 'Estructura geològica que emet lava i gas' },

  // ── MITJA: 6 lletres ──────────────────────────────────────
  { paraula: 'BALEIA', nivell: 'mitja', desc: 'Gran cetaci que es caçava des de les Açores' },
  { paraula: 'BALENA', nivell: 'mitja', desc: 'Gran mamífer marí que es caçava a les Açores' },
  { paraula: 'BASALT', nivell: 'mitja', desc: 'Roca volcànica negra que forma les illes açorianes' },
  { paraula: 'COLHER', nivell: 'mitja', desc: 'Cullera, utensili per prendre la cozida (en portuguès)' },
  { paraula: 'CORALL', nivell: 'mitja', desc: 'Organisme marí que forma esculls a l\'Atlàntic' },
  { paraula: 'DOFINS', nivell: 'mitja', desc: 'Cetacis intel·ligents que poblen l\'Atlàntic' },
  { paraula: 'FALCAO', nivell: 'mitja', desc: 'Paraula portuguesa per falcó, au rapinyaire' },
  { paraula: 'FLORES', nivell: 'mitja', desc: 'Illa de les Açores coneguda per les cascades' },
  { paraula: 'FURNAS', nivell: 'mitja', desc: 'Vall geotèrmica de São Miguel famosa pels geisers' },
  { paraula: 'LAGUNA', nivell: 'mitja', desc: 'Llac costaner separat del mar per una barrera (en portuguès)' },
  { paraula: 'LLOSES', nivell: 'mitja', desc: 'Pedres planes de basalt usades en construcció' },
  { paraula: 'MARINA', nivell: 'mitja', desc: 'Port esportiu, especialment famós a Horta' },
  { paraula: 'MIRALL', nivell: 'mitja', desc: 'Els llacs volcànics semblen un gran mirall' },
  { paraula: 'MORCAO', nivell: 'mitja', desc: 'Embotit típic açorià fet amb sang de porc (en portuguès)' },
  { paraula: 'MUSEUS', nivell: 'mitja', desc: 'Plural de museu, molts dedicats a la caça de balenes' },
  { paraula: 'NUVOLS', nivell: 'mitja', desc: 'Masses de vapor d\'aigua que cobreixen les illes' },
  { paraula: 'OLIVAR', nivell: 'mitja', desc: 'Camp d\'oliveres, present a algunes illes' },
  { paraula: 'PEDRES', nivell: 'mitja', desc: 'Plural de pedra, present a tot el paisatge volcànic' },
  { paraula: 'QUEIJO', nivell: 'mitja', desc: 'Formatge, producte estrella de São Jorge' },
  { paraula: 'RAJOLA', nivell: 'mitja', desc: 'Rajola decorativa típica de l\'arquitectura portuguesa' },
  { paraula: 'TERMAL', nivell: 'mitja', desc: 'Relatiu a les aigues calentes de Furnas' },
  { paraula: 'TERMES', nivell: 'mitja', desc: 'Aigues termals de Furnas, bones per banyar-se' },
  { paraula: 'TOUROS', nivell: 'mitja', desc: 'Toros de carrer, tradició festiva de Terceira' },
  { paraula: 'VIAGEM', nivell: 'mitja', desc: 'Paraula portuguesa per viatge' },
  { paraula: 'VULCAO', nivell: 'mitja', desc: 'Paraula portuguesa per volcà' },
  { paraula: 'BALEIAS', nivell: 'mitja', desc: 'Plural de baleia, les balenes que visiten les Açores (en portuguès)' },
  { paraula: 'CALDEIA', nivell: 'mitja', desc: 'Depressió volcànica, com la del Faial (en portugués)' },
  { paraula: 'CALDERA', nivell: 'mitja', desc: 'Depressió circular formada per un volcà' },
  { paraula: 'CALDERO', nivell: 'mitja', desc: 'Olla gran, també depressió volcànica' },
  { paraula: 'CAPELEO', nivell: 'mitja', desc: 'Zona del volcà de Faial que va erupcionar el 1957' },
  { paraula: 'CORRENT', nivell: 'mitja', desc: 'Flux d\'aigua marina que modela el clima de les illes' },
  { paraula: 'COZINHA', nivell: 'mitja', desc: 'Paraula portuguesa per cuina' },
  { paraula: 'CRUSCAT', nivell: 'mitja', desc: 'Volcà de la Garrotxa, exemple de vulcanisme com el açorià' },
  { paraula: 'ERUPCIO', nivell: 'mitja', desc: 'Sortida violenta de lava i gasos per un volcà' },
  { paraula: 'GAROUPA', nivell: 'mitja', desc: 'Mero, peix de roca molt apreciat a les Açores (en portuguès)' },
  { paraula: 'GEISERS', nivell: 'mitja', desc: 'Surgències d\'aigua calenta a pressió a Furnas' },
  { paraula: 'HORITZÓ', nivell: 'mitja', desc: 'Línia imaginària on sembla que el cel i el mar s\'ajunten' },
  { paraula: 'LAGARTO', nivell: 'mitja', desc: 'Llangardaix, rèptil present a les Açores (en portuguès)' },
  { paraula: 'LEVADAS', nivell: 'mitja', desc: 'Canals d\'irrigació típics de les illes atlàntiques (en portuguès)' },
  { paraula: 'LOURENC', nivell: 'mitja', desc: 'Sant patró de molts pobles de les Açores' },
  { paraula: 'MARITIM', nivell: 'mitja', desc: 'Relatiu al mar, la cultura de les Açores ho és' },
  { paraula: 'MIRADOR', nivell: 'mitja', desc: 'Punt elevat per contemplar el paisatge' },
  { paraula: 'NACIONS', nivell: 'mitja', desc: 'Les Açores acullen vaixells de moltes d\'elles' },
  { paraula: 'OCEANIC', nivell: 'mitja', desc: 'Relatiu a l\'oceà, clima de les Açores' },
  { paraula: 'PASTEIS', nivell: 'mitja', desc: 'Pastes dolces típiques de la pastisseria açoriana (en portuguès)' },
  { paraula: 'PELAGIC', nivell: 'mitja', desc: 'Relatiu a la zona oberta de l\'oceà' },
  { paraula: 'PESCADA', nivell: 'mitja', desc: 'Lluç, peix molt consumit a les Açores (en portuguès)' },
  { paraula: 'PESCADO', nivell: 'mitja', desc: 'Peix en portuguès, base de la cuina açoriana' },
  { paraula: 'SEREIAS', nivell: 'mitja', desc: 'Sirenes de la mitologia marinera açoriana (en portuguès)' },
  { paraula: 'TURISME', nivell: 'mitja', desc: 'Activitat principal de l\'economia açoriana' },
  { paraula: 'VERDEAL', nivell: 'mitja', desc: 'Varietat de raïm blanc cultivada a l\'illa de Pico' },
  { paraula: 'VOLCANS', nivell: 'mitja', desc: 'Plural de volcà, les Açores en té molts d\'actius' },

  // ── EXPERT: 8 lletres ──────────────────────────────────────
  { paraula: 'ATLANTIC', nivell: 'expert', desc: 'Oceà que envolta les Açores' },
  { paraula: 'ATLANTIS', nivell: 'expert', desc: 'Continent llegendari suposadament submergit a l\'Atlàntic' },
  { paraula: 'BALCONIE', nivell: 'expert', desc: 'Zona costanera rocosa batuda per les onades' },
  { paraula: 'BALEEIRA', nivell: 'expert', desc: 'Embarcació tradicional per a la caça de balenes' },
  { paraula: 'BIOSFERA', nivell: 'expert', desc: 'Reserva de la biosfera, distinció de les Açores' },
  { paraula: 'CALDEIRA', nivell: 'expert', desc: 'Gran depressió volcànica al cim d\'un estratovolcà' },
  { paraula: 'CATXALOT', nivell: 'expert', desc: 'El gegant del mar de les Açores' },
  { paraula: 'FORMATGE', nivell: 'expert', desc: 'Molt famós el de l\'illa de São Jorge' },
  { paraula: 'FUMAROLA', nivell: 'expert', desc: 'Emissió de gasos volcànics per escletxes del sòl' },
  { paraula: 'GORREANA', nivell: 'expert', desc: 'La famosa plantació de te de São Miguel' },
  { paraula: 'GRACIOSA', nivell: 'expert', desc: 'Una de les illes del grup central' },
  { paraula: 'MAGMATIC', nivell: 'expert', desc: 'Relatiu al magma, origen de les roques volcàniques' },
  { paraula: 'PANORAMA', nivell: 'expert', desc: 'Vista espectacular des dels miradors açorians' },
  { paraula: 'SOLFATAR', nivell: 'expert', desc: 'Emissió de sofre volcànic, present a Furnas' },
  { paraula: 'TECTONIC', nivell: 'expert', desc: 'Relatiu al moviment de les plaques terrestres' },
  { paraula: 'TERCEIRA', nivell: 'expert', desc: 'Illa de les Açores on es troba Angra do Heroísmo' },
  { paraula: 'ANTICICLO', nivell: 'expert', desc: 'El famós centre de pressions atmosfèriques' },
  { paraula: 'ARXIPELAG', nivell: 'expert', desc: 'Conjunt d\'illes, les Açores en són un exemple' },
  { paraula: 'ATLANTIDA', nivell: 'expert', desc: 'Continent llegendari que se suposa estava a l\'Atlàntic' },
  { paraula: 'CARAVELLA', nivell: 'expert', desc: 'Antic vaixell de vela, lleuger i ràpid, usat en les grans exploracions' },
  { paraula: 'FUMAROLES', nivell: 'expert', desc: 'Plural de fumarola, presents a Furnas i altres llocs' },
  { paraula: 'GEOTERMAL', nivell: 'expert', desc: 'Energia provinent de la calor interior de la Terra' },
  { paraula: 'HORTENSIA', nivell: 'expert', desc: 'Flor blava o rosa que omple els camins de les illes' },
  { paraula: 'HORTENSIS', nivell: 'expert', desc: 'Família de la flor que decora els camins de Faial' },
  { paraula: 'MIGRATORI', nivell: 'expert', desc: 'Tipus d\'ocell que fa escala a les Açores' },
  { paraula: 'PATRIMONI', nivell: 'expert', desc: 'Angra do Heroísmo és Patrimoni de la Humanitat' },
  { paraula: 'TERCEIRAN', nivell: 'expert', desc: 'Relatiu a l\'illa de Terceira' },
  { paraula: 'ALBIRAMENT', nivell: 'expert', desc: 'L\'acció de veure balenes i dofins' },
  { paraula: 'BALEIEIROS', nivell: 'expert', desc: 'Caçadors de balenes tradicionals de les Açores' },
  { paraula: 'CAPELINHOS', nivell: 'expert', desc: 'Volcà de Faial que va erupcionar el 1957-58' },
  { paraula: 'EMBARCACIO', nivell: 'expert', desc: 'Vehicle dissenyat per a navegar per l\'aigua' },
  { paraula: 'HIVERNACLE', nivell: 'expert', desc: 'On es cultiven els ananassos' },
  { paraula: 'LAURISILVA', nivell: 'expert', desc: 'Bosc relicte de l\'era terciària present a les Açores' },
  { paraula: 'PENYASEGAT', nivell: 'expert', desc: 'Costes escarpades que cauen al mar' },
  { paraula: 'SISMICITAT', nivell: 'expert', desc: 'Freqüència de terratrèmols, molt alta a les Açores' },
  { paraula: 'SUBTROPICA', nivell: 'expert', desc: 'Tipus de clima de les illes açorianes' },
  { paraula: 'TERMALISME', nivell: 'expert', desc: 'Teràpia basada en aigües termals, popular a Furnas' },
  { paraula: 'VOLCANISME', nivell: 'expert', desc: 'Conjunt de fenòmens relacionats amb els volcans' },
  { paraula: 'VULCANISME', nivell: 'expert', desc: 'Relatiu als processos volcànics de les illes' },
  { paraula: 'MACARONESIA', nivell: 'expert', desc: 'Regió biogeogràfica que inclou les Açores i Canàries' },
  { paraula: 'PEIXEESPADA', nivell: 'expert', desc: 'Peix espasa, molt consumit a les Açores' },
  { paraula: 'SETECIDADES', nivell: 'expert', desc: 'Llac volcànic de dos colors de São Miguel' },
  { paraula: 'SUBTROPICAL', nivell: 'expert', desc: 'Clima de les Açores, entre tropical i temperat' },
  { paraula: 'BIOGEOGRAFIA', nivell: 'expert', desc: 'Ciència que estudia la distribució dels éssers vius' },
  { paraula: 'ESTRATOVOLCA', nivell: 'expert', desc: 'Tipus de volcà alt i cònic, com el Pico' },
  { paraula: 'GEOTERMIQUES', nivell: 'expert', desc: 'Aigües calentes d\'origen volcànic, com les de Furnas' },
  { paraula: 'HIDROTERMALS', nivell: 'expert', desc: 'Fonts d\'aigua calenta d\'origen volcànic' },
  { paraula: 'OCEANOGRAFIA', nivell: 'expert', desc: 'Ciència que estudia els oceans' },
  { paraula: 'SUBMARINISME', nivell: 'expert', desc: 'Esport molt popular a les aigües cristal·lines de les Açores' },
  { paraula: 'VULCANOLOGIA', nivell: 'expert', desc: 'Ciència que estudia els volcans' },
  { paraula: 'BIODIVERSITAT', nivell: 'expert', desc: 'Riquesa d\'espècies animals i vegetals de les illes' },
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
const PA_MAX_PARTIDES = 10;
const PA_PARAULES_PARTIDA = 5;