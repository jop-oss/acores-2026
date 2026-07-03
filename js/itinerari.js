/* ============================================================
   ITINERARI.JS  ·  Açores 2026
   ============================================================ */

/* ── ORS KEY (definir a js/config.js com a CONFIG.ORS_API_KEY) ── */
const ORS_KEY = (typeof CONFIG !== 'undefined' && CONFIG.ORS_API_KEY)
  ? CONFIG.ORS_API_KEY : '';

/* ── CONSTANTS ───────────────────────────────────────────── */
const COL_SM = '#6abf70';
const CARTO_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';
const CARTO_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

/* ── POI DATA ────────────────────────────────────────────── */
const POI = {
  'pico-do-carvao': {
    nom: 'Mirador de Pico do Carvão', emoji: '🔭', cat: 'miradors',
    coords: [37.81916, -25.75109],
    desc: 'Un dels miradors més amplis de la zona oest, a 624m d\'altitud. Vistes longitudinals de tota la part central de l\'illa.',
    maps: 'https://maps.google.com/?q=37.81916,-25.75109',
  },
  'aqueduto': {
    nom: 'Aqueduto do Carvão', emoji: '🏛️', cat: 'altres',
    coords: [37.8208, -25.7469],
    desc: 'Antic aqüeducte volcànic de pedra considerat patrimoni històric de São Miguel, amagat en plena Serra Devassa.',
    maps: 'https://maps.google.com/?q=37.8208,-25.7469',
  },
  'empadadas': {
    nom: 'Lagoa das Empadadas', emoji: '💧', cat: 'naturalesa',
    coords: [37.82438, -25.74698],
    desc: 'Llac tranquil envoltat de bosc dens amb aigües de color blau verdós. Lloc preferit d\'excursionistes.',
    maps: 'https://maps.google.com/?q=37.82438,-25.74698',
  },
  'pico-do-paul': {
    nom: 'Mirador Pico do Paúl', emoji: '🔭', cat: 'miradors',
    coords: [37.8257, -25.7485],
    desc: 'Mirador adjacent a la Lagoa das Empadadas, a pocs metres de l\'Aqueduto do Carvão.',
    maps: 'https://maps.google.com/?q=37.8257,-25.7485',
  },
  'lagoa-canario': {
    nom: 'Lagoa do Canário', emoji: '💧', cat: 'naturalesa',
    coords: [37.83598, -25.75969],
    desc: 'Llac d\'aigües blaves intenses envoltat d\'hortènsies i bosc. Punt de partida de la caminada cap a Boca do Inferno.',
    maps: 'https://maps.google.com/?q=37.83598,-25.75969',
  },
  'mata-canario': {
    nom: 'Pàrquing Mata do Canário', emoji: '🌲', cat: 'altres',
    coords: [37.83178, -25.75272],
    desc: 'Pàrquing al bosc on comencen diverses rutes de senderisme i el camí cap al Muro das Nove Janelas.',
    maps: 'https://maps.google.com/?q=37.83178,-25.75272',
  },
  'muro-9-janelas': {
    nom: 'Muro das Nove Janelas', emoji: '🧱', cat: 'altres',
    coords: [37.83389, -25.75191],
    desc: 'Curiosa construcció de pedra amb nou finestres arquejades, vora el pàrquing de Mata do Canário.',
    maps: 'https://maps.google.com/?q=37.83389,-25.75191',
  },
  'boca-do-inferno': {
    nom: 'Mirador Boca do Inferno', emoji: '🔭', cat: 'miradors',
    coords: [37.84285, -25.76362],
    desc: 'El mirador més espectacular de les Açores, a 730m. Vista icònica de diverses llacunes alhora dins un cràter volcànic gegant.',
    maps: 'https://maps.google.com/?q=37.84285,-25.76362',
  },
  'vista-do-rei': {
    nom: 'Mirador Vista do Rei', emoji: '🔭', cat: 'miradors',
    coords: [37.83929, -25.79493],
    desc: 'La postal més famosa de les Açores: panoràmica oberta de la caldera volcànica amb el poble i els dos llacs de colors.',
    maps: 'https://maps.google.com/?q=37.83929,-25.79493',
  },
  'cerrado-freiras': {
    nom: 'Mirador Cerrado das Freiras', emoji: '🔭', cat: 'miradors',
    coords: [37.85395, -25.77582],
    desc: 'Vista molt propera i lateral de les dues llacunes, apreciant el contrast entre la Lagoa Azul i la Lagoa Verde.',
    maps: 'https://maps.google.com/?q=37.85395,-25.77582',
  },
  'lagoa-santiago': {
    nom: 'Mirador Lagoa de Santiago', emoji: '🔭', cat: 'miradors',
    coords: [37.8495, -25.7870],
    desc: 'Perspectiva vertical d\'una llacuna encaixada en un cràter secundari, les parets de la qual estan plenes d\'una vegetació que tenyeix l\'aigua de verd esmeralda.',
    maps: 'https://maps.google.com/?q=37.8495,-25.787',
  },
  'sete-cidades': {
    nom: 'Sete Cidades', emoji: '🏘️', cat: 'pobles',
    coords: [37.85574, -25.78630],
    desc: 'El símbol de São Miguel: dos llacs volcànics de colors verd i blau units per un pont, al fons d\'un cràter gegant.',
    maps: 'https://maps.google.com/?q=37.85574,-25.78630',
  },
  'mosteiros': {
    nom: 'Mosteiros', emoji: '🏘️', cat: 'pobles',
    coords: [37.888, -25.824],
    desc: 'Poble pesquer amb platja de sorra negra, piscina natural Caneiros i característics illots volcànics emergint de l\'oceà.',
    maps: 'https://maps.google.com/?q=37.888,-25.824',
  },
  'piscina-caneiros': {
    nom: 'Piscina Natural Caneiros', emoji: '🏊', cat: 'piscines',
    coords: [37.8894, -25.8228],
    desc: 'Piscina natural de roques volcàniques a Mosteiros, una de les més espectaculars de São Miguel.',
    maps: 'https://maps.google.com/?q=37.8894,-25.8228',
  },
  'ponta-do-castelo': {
    nom: 'Mirador Ponta do Castelo', emoji: '🔭', cat: 'miradors',
    coords: [37.89085, -25.82520],
    desc: 'Mirador tranquil amb vistes als illots volcànics i penya-segats de basalt negre de Mosteiros.',
    maps: 'https://maps.google.com/?q=37.89085,-25.82520',
  },
  'ponta-do-escalvado': {
    nom: 'Mirador Ponta do Escalvado', emoji: '🔭', cat: 'miradors',
    coords: [37.87122, -25.84133],
    desc: 'Un dels millors llocs de São Miguel per la posta de sol, penjat sobre un penya-segat a 150m d\'altura sobre l\'oceà.',
    maps: 'https://maps.google.com/?q=37.87122,-25.84133',
  },
  'ihla-sabrina': {
    nom: 'Mirador Ihla Sabrina', emoji: '🔭', cat: 'miradors',
    coords: [37.85801, -25.85066],
    desc: 'Mirador panoràmic sobre Ponta da Ferraria. Des d\'aquí s\'accedeix opcionalment al Pico das Camarinhas (1,3 km).',
    maps: 'https://maps.google.com/?q=37.85801,-25.85066',
  },
  'porta-do-diabo': {
    nom: 'Porta do Diabo', emoji: '🌊', cat: 'naturalesa',
    coords: [37.85993, -25.85377],
    desc: 'Arc natural de roca de lava espectacular a la costa de Ponta da Ferraria.',
    maps: 'https://maps.google.com/?q=37.85993,-25.85377',
  },
  'ferraria': {
    nom: 'Ponta da Ferraria', emoji: '♨️', cat: 'termals',
    coords: [37.85859, -25.85236],
    desc: 'On l\'oceà es barreja amb aigües termals volcàniques. La temperatura canvia amb la marea: a marea baixa és on més s\'aprecia l\'escalfor.',
    maps: 'https://maps.google.com/?q=37.85859,-25.85236',
  },
  'pedras-negras': {
    nom: 'Mirador das Pedras Negras', emoji: '🔭', cat: 'miradors',
    coords: [37.83552, -25.67246],
    desc: 'Mirador al poble de Capelas, al final del tram de costa nord, amb vistes sobre roques negres de lava i l\'oceà.',
    maps: 'https://maps.google.com/?q=37.83552,-25.67246',
  },

  /* ── POIS NOUS (dies 3 i 4) ─────────────────────────────── */
  'pob-smi-11': {
    nom: 'Rabo de Peixe', emoji: '🏘️', cat: 'pobles',
    coords: [37.81198, -25.58552],
    desc: 'Poble pesquer famós internacionalment. Port de sortida de l\'excursió amb llanxa per la costa nord.',
    maps: 'https://maps.google.com/?q=37.81198,-25.58552',
  },
  'nat-pai-smi-01': {
    nom: 'Buraco de São Pedro', emoji: '🔭', cat: 'naturalesa',
    coords: [37.83213, -25.62890],
    desc: 'Espectacular formació rocosa i mirador amb penya-segats verticals i cavernes sobre el mar.',
    maps: 'https://maps.google.com/?q=37.83213,-25.62890',
  },
  'nat-pai-smi-07': {
    nom: 'Pinhal da Paz', emoji: '🌲', cat: 'naturalesa',
    coords: [37.78695, -25.63950],
    desc: 'Reserva Florestal de Recreio. Bosc de bambú, zona de pícnic i recorreguts de senderisme suaus.',
    maps: 'https://maps.google.com/?q=37.78695,-25.63950',
  },
  'imp-smi-10': {
    nom: 'Gruta do Carvão', emoji: '🕳️', cat: 'imprescindibles',
    coords: [37.74862, -25.68707],
    desc: 'Túnel de lava volcànica sota Ponta Delgada. Un dels sistemes de tubulació volcànica més llargs del món.',
    maps: 'https://maps.google.com/?q=37.74862,-25.68707',
  },
  'var-alt-smi-03': {
    nom: 'Aqueduto do Carvão (PRC37)', emoji: '🏛️', cat: 'varis',
    coords: [37.74627, -25.53731],
    desc: 'Punt d\'inici del PRC37 SMI – Janela do Inferno. Aqüeductes de pedra i túnels de bosc tropical.',
    maps: 'https://maps.google.com/?q=37.74627,-25.53731',
  },
  'mir-smi-37': {
    nom: 'Miradouro Nossa Senhora da Paz', emoji: '⛪', cat: 'miradors',
    coords: [37.72795, -25.43148],
    desc: 'Capella amb singular escalinata en espiral. Vistes extraordinàries de l\'Illot de Vila Franca do Campo.',
    maps: 'https://maps.google.com/?q=37.72795,-25.43148',
  },
  'imp-smi-03': {
    nom: 'Lagoa do Fogo', emoji: '🏔️', cat: 'imprescindibles',
    coords: [37.76255, -25.47430],
    desc: 'El segon llac més gran de São Miguel, dins d\'un cràter. Miradors espectaculars a Bela Vista, Lagoa do Fogo i Pico da Barrosa.',
    maps: 'https://maps.google.com/?q=37.76255,-25.47430',
  },
  'mir-smi-38': {
    nom: 'Miradouro de Bela Vista (Lagoa do Fogo)', emoji: '🔭', cat: 'miradors',
    coords: [37.75419, -25.46100],
    desc: 'Primer mirador sobre la Lagoa do Fogo venint del sud. Vistes frontals sobre la llacuna.',
    maps: 'https://maps.google.com/?q=37.75419,-25.46100',
  },
  'mir-smi-39': {
    nom: 'Miradouro Pico da Barrosa', emoji: '🔭', cat: 'miradors',
    coords: [37.75943, -25.46877],
    desc: 'Mirador elevat sobre la Lagoa do Fogo. A 800m d\'altitud, ideal per veure estrelles (per sobre de la boira baixa).',
    maps: 'https://maps.google.com/?q=37.75943,-25.46877',
  },
  'imp-smi-06': {
    nom: 'Caldeira Velha', emoji: '♨️', cat: 'imprescindibles',
    coords: [37.78452, -25.50104],
    desc: 'Monument Natural. Cascades d\'aigües termals sobre roques cobertes de molsa verda. Accés restringit; cal reserva.',
    maps: 'https://maps.google.com/?q=37.78452,-25.50104',
  },
  'mir-smi-42': {
    nom: 'Miradouro Ponta do Cintrão', emoji: '🔭', cat: 'miradors',
    coords: [37.84321, -25.48971],
    desc: 'Mirador sobre la imponent Ponta do Cintrão i el seu far. Vistes sobre la costa nord i el mar obert.',
    maps: 'https://maps.google.com/?q=37.84321,-25.48971',
  },
  'var-far-smi-02': {
    nom: 'Farol da Ponta do Cintrão', emoji: '🔦', cat: 'varis',
    coords: [37.84278, -25.48857],
    desc: 'Far construït el 1862, ubicat a la punta del Cintrão. Accessible a peu des del mirador.',
    maps: 'https://maps.google.com/?q=37.84278,-25.48857',
  },
  'mir-smi-51': {
    nom: 'Mirador de Santa Iria', emoji: '🔭', cat: 'miradors',
    coords: [37.84064, -25.56565],
    desc: 'Mirador sobre la costa nord amb vistes sobre el mar i els penya-segats volcànics.',
    maps: 'https://maps.google.com/?q=37.84064,-25.56565',
  },
  'mir-smi-53': {
    nom: 'Mirador do Porto – Porto Formoso', emoji: '🔭', cat: 'miradors',
    coords: [37.82175, -25.48070],
    desc: 'Mirador sobre la pintoresca església de Porto Formoso i la costa. Vista postal de la zona nord-est.',
    maps: 'https://maps.google.com/?q=37.82175,-25.48070',
  },
  'mir-smi-56': {
    nom: 'Mirador do Frade – Maia', emoji: '🔭', cat: 'miradors',
    coords: [37.83181, -25.45249],
    desc: 'Mirador a la localitat de Maia amb vistes privilegiades sobre la costa nord i el mar.',
    maps: 'https://maps.google.com/?q=37.83181,-25.45249',
  },
  'ban-pla-smi-01': {
    nom: 'Praia dos Moinhos', emoji: '🏖️', cat: 'bany',
    coords: [37.87082, -25.67137],
    desc: 'Platja de sorra negra a la costa nord. Al costat hi ha la Cascata do Limbo, una bonica cascada que cau directament al mar.',
    maps: 'https://maps.google.com/?q=37.87082,-25.67137',
  },
  'ban-pla-smi-15': {
    nom: 'Praia do Areal de Santa Bárbara', emoji: '🏖️', cat: 'bany',
    coords: [37.81593, -25.54735],
    desc: 'Gran platja de sorra negra volcànica, una de les més populars per fer surf. Bars i restaurants a tocar.',
    maps: 'https://maps.google.com/?q=37.81593,-25.54735',
  },
  'nat-sal-smi-02': {
    nom: 'Cascata das Lombadas', emoji: '💦', cat: 'naturalesa',
    coords: [37.77607, -25.45985],
    desc: 'Cascata amagada i difícil d\'accés (Trilho Difícil e Perigoso). Aigües calentes i fredes. Imprescindible per als agosarats.',
    maps: 'https://maps.google.com/?q=37.77607,-25.45985',
  },
  'nat-sal-smi-03': {
    nom: 'Salto do Cabrito', emoji: '💦', cat: 'naturalesa',
    coords: [37.77016, -25.50804],
    desc: 'Bella cascada de 20m accessible a peu des del pàrquing superior. Molt fresqueta.',
    maps: 'https://maps.google.com/?q=37.77016,-25.50804',
  },
  'nat-sal-smi-04': {
    nom: 'Cascata do Limbo', emoji: '💦', cat: 'naturalesa',
    coords: [37.86956, -25.67419],
    desc: 'Cascada que cau sobre roques negres de lava fins al mar, prop de la Praia dos Moinhos.',
    maps: 'https://maps.google.com/?q=37.86956,-25.67419',
  },
  'mir-lagoa-fogo': {
    nom: 'Miradouro da Lagoa do Fogo', emoji: '🔭', cat: 'miradors',
    coords: [37.76060, -25.47150],
    desc: 'Mirador principal sobre la Lagoa do Fogo, accessible des del nord via Pico da Barrosa. Vista frontal sobre el llac volcànic.',
    maps: 'https://maps.google.com/?q=37.76060,-25.47150',
  },
  'snd-smi-16': {
    nom: 'PRC28 SMI – Chá Gorreana', emoji: '🥾', cat: 'senderisme',
    coords: [37.81779, -25.40246],
    desc: 'Ruta fàcil de 3,3 km per les úniques plantacions de te d\'Europa. Circuit entre camps de te amb vistes al mar.',
    maps: 'https://maps.google.com/?q=37.81779,-25.40246',
  },

  /* ── POIS DIA 5 ─────────────────────────────────────────── */
  'mir-smi-04': {
    nom: 'Miradouro da Boca da Ribeira', emoji: '🔭', cat: 'miradors',
    coords: [37.84163, -25.14903],
    desc: 'Mirador sobre la Boca da Ribeira a Nordeste. Impressionants vistes de la costa (no baixar a la piscina en cotxe).',
    maps: 'https://maps.google.com/?q=37.84163,-25.14903',
  },

  /* ── POIS DIA 6 ─────────────────────────────────────────── */
  'nat-lac-smi-02': {
    nom: 'Lagoa das Furnas', emoji: '🏞️', cat: 'naturalesa',
    coords: [37.75720, -25.33300],
    desc: 'Gran llac volcànic a la caldera de Furnas. Rodejat de vegetació subtropical i calderes geotèrmiques al marge.',
    maps: 'https://maps.google.com/?q=37.75720,-25.33300',
  },
  'nat-jar-smi-06': {
    nom: 'Mata Jardim José do Canto', emoji: '🌺', cat: 'naturalesa',
    coords: [37.75032, -25.33220],
    desc: 'Propietat privada d\'un valor botànic excepcional. Punt de partida del TM16 SMI – Salto do Rosal.',
    maps: 'https://maps.google.com/?q=37.75032,-25.33220',
  },
  'imp-smi-05': {
    nom: 'Terra Nostra Garden', emoji: '🌿', cat: 'imprescindibles',
    coords: [37.77260, -25.31560],
    desc: 'Jardí botànic històric monumental. Gran piscina termal a 38°C de color ferrós. Porta banyador vell!',
    maps: 'https://maps.google.com/?q=37.77260,-25.31560',
  },
  'imp-smi-02': {
    nom: 'Caldeira das Furnas', emoji: '🌋', cat: 'imprescindibles',
    coords: [37.77290, -25.30390],
    desc: 'Fumaroles i calderes de fang bullint al centre del poble. La terra literalment bull. S\'hi enterren les olles del Cozido.',
    maps: 'https://maps.google.com/?q=37.77290,-25.30390',
  },
  'ban-ter-smi-02': {
    nom: 'Parque Terra Nostra (piscina termal)', emoji: '♨️', cat: 'bany',
    coords: [37.77250, -25.31560],
    desc: 'Piscina termal natural a 38°C constant dins el Parc Terra Nostra. Aigües de color marró/ferrós.',
    maps: 'https://maps.google.com/?q=37.77250,-25.31560',
  },
  'ban-ter-smi-03': {
    nom: 'Poça da Dona Beija', emoji: '♨️', cat: 'bany',
    coords: [37.76940, -25.31940],
    desc: 'Alternativa al Terra Nostra. Piscines termals naturals de gestió municipal, menys massificades.',
    maps: 'https://maps.google.com/?q=37.76940,-25.31940',
  },
  'mir-smi-34': {
    nom: 'Miradouro do Salto do Cavalo', emoji: '🔭', cat: 'miradors',
    coords: [37.78740, -25.28370],
    desc: 'Mirador elevat sobre el nord de la caldera de Furnas. Vistes panoràmiques sobre la Lagoa das Furnas i les muntanyes.',
    maps: 'https://maps.google.com/?q=37.78740,-25.28370',
  },
  'mir-smi-27': {
    nom: 'Miradouro do Pico do Ferro', emoji: '🔭', cat: 'miradors',
    coords: [37.77200, -25.33410],
    desc: 'Mirador des de l\'alt de la caldera de Furnas. Vista aèria sobre tot el llac i la vall volcànica.',
    maps: 'https://maps.google.com/?q=37.77200,-25.33410',
  },
  'snd-prc06': {
    nom: 'PRC06 SMI – Lagoa das Furnas', emoji: '🥾', cat: 'senderisme',
    coords: [37.77341, -25.31597],
    desc: 'Sender de 9,5 km que dóna tota la volta al llac de Furnas. Visita la capella gòtica i la zona de calderes.',
    maps: 'https://maps.google.com/?q=37.77341,-25.31597',
  },
  'snd-tm16': {
    nom: 'TM16 SMI – Salto do Rosal', emoji: '🥾', cat: 'senderisme',
    coords: [37.75032, -25.33220],
    desc: 'Ruta curta de 3,6 km per l\'interior del Mata Jardim José do Canto fins al Salto do Rosal.',
    maps: 'https://maps.google.com/?q=37.75032,-25.33220',
  },
  'nat-sal-smi-01': {
    nom: 'Cascata do Moinho do Félix (TM06)', emoji: '💦', cat: 'naturalesa',
    coords: [37.85200, -25.31617],
    desc: 'Espectacular ruta de cascades al nord-est de l\'illa. Diverses cascades i piscines naturals entre bosc tropical.',
    maps: 'https://maps.google.com/?q=37.85200,-25.31617',
  },
  'imp-smi-11': {
    nom: 'Poço Azul', emoji: '💧', cat: 'imprescindibles',
    coords: [37.85880, -25.29047],
    desc: 'Cova volcànica inundada d\'aigües de color blau intens. Cal reserva; amb llum natural és absolutament màgic.',
    maps: 'https://maps.google.com/?q=37.85880,-25.29047',
  },
  'imp-smi-08': {
    nom: 'Parque Natural da Ribeira dos Caldeirões', emoji: '🌿', cat: 'imprescindibles',
    coords: [37.84282, -25.26759],
    desc: 'Parc natural amb salts d\'aigua, molins de pedra i vegetació subtropical. Un dels racons més bonics de São Miguel.',
    maps: 'https://maps.google.com/?q=37.84282,-25.26759',
  },
  'pob-smi-12': {
    nom: 'Nordeste', emoji: '🏘️', cat: 'pobles',
    coords: [37.83333, -25.17130],
    desc: 'El poble més a l\'est de São Miguel. Destacada pel seu jardí municipal i per ser el punt de partida de la ruta panoràmica de la costa est.',
    maps: 'https://maps.google.com/?q=37.83333,-25.17130',
  },
  'imp-smi-04': {
    nom: 'Ponta da Madrugada', emoji: '🔭', cat: 'imprescindibles',
    coords: [37.78960, -25.14542],
    desc: 'Un dels miradors més esplèndids de São Miguel. Vistes de 180° sobre la costa est i la línia de l\'horitzó.',
    maps: 'https://maps.google.com/?q=37.78960,-25.14542',
  },
  'mir-smi-14': {
    nom: 'Miradouro da Ponta do Sossego', emoji: '🔭', cat: 'miradors',
    coords: [37.79925, -25.14588],
    desc: 'Mirador espectacular sobre la costa est. Vistes sobre els penya-segats i l\'oceà Atlàntic.',
    maps: 'https://maps.google.com/?q=37.79925,-25.14588',
  },
  'mir-smi-17': {
    nom: 'Miradouro da Vista dos Barcos', emoji: '🔭', cat: 'miradors',
    coords: [37.81954, -25.13917],
    desc: 'Mirador on s\'hi veuen els barcos entrant i sortint de la costa. Vistes úniques sobre el mar a sota.',
    maps: 'https://maps.google.com/?q=37.81954,-25.13917',
  },
  'mir-smi-30b': {
    nom: 'Miradouro da Ponta do Arnel', emoji: '🔭', cat: 'miradors',
    coords: [37.82448, -25.13962],
    desc: 'Mirador sobre el far de Ponta do Arnel. Atenció: no baixar amb cotxe al far, la carretera és extremadament empinada.',
    maps: 'https://maps.google.com/?q=37.82448,-25.13962',
  },
  'snd-smi-17': {
    nom: 'PRC09 SMI – Salto do Prego', emoji: '🥾', cat: 'senderisme',
    coords: [37.74716, -25.20146],
    desc: 'Ruta de 4,5 km fins al bellíssim Salto do Prego, una cascada de 40m que cau en un estret canó de roca volcànica.',
    maps: 'https://maps.google.com/?q=37.74716,-25.20146',
  },
  'pob-smi-13': {
    nom: 'Faial da Terra', emoji: '🏘️', cat: 'pobles',
    coords: [37.74716, -25.20146],
    desc: 'Petit i pintoresc poble d\'on parteix el PRC09 (Salto do Prego). Connectat amb Ribeira Quente per un camí de muntanya.',
    maps: 'https://maps.google.com/?q=37.74716,-25.20146',
  },
  'pob-smi-14': {
    nom: 'Povoação', emoji: '🏘️', cat: 'pobles',
    coords: [37.74790, -25.24530],
    desc: 'El primer assentament dels colonitzadors portuguesos a São Miguel (s. XV). Restaurants de bona relació qualitat-preu.',
    maps: 'https://maps.google.com/?q=37.74790,-25.24530',
  },

  /* ── DIA 7 · SÃO JORGE ──────────────────────────────────── */
  'imp-sjo-01': {
    nom: 'Fajã da Caldeira de Santo Cristo', emoji: '⭐', cat: 'imprescindibles',
    coords: [38.6251287, -27.9287591],
    desc: 'La fajã més famosa i salvatge de São Jorge. Només accessible a peu (2h) o amb quad; l\'única llacuna dels Açores on es cultiven cloïsses.',
    maps: 'https://maps.google.com/?q=38.6251287,-27.9287591',
  },
  'imp-sjo-02': {
    nom: 'Fajã do Ouvidor i Poça do Simão Dias', emoji: '⭐', cat: 'imprescindibles',
    coords: [38.6786507, -28.0500872],
    desc: 'Piscina natural encaixonada entre columnes de basalt negre, considerada una de les més espectaculars dels Açores.',
    maps: 'https://maps.google.com/?q=38.6786507,-28.0500872',
  },
  'imp-sjo-03': {
    nom: 'Parque Florestal Sete Fontes', emoji: '⭐', cat: 'imprescindibles',
    coords: [38.7384423, -28.2621519],
    desc: 'Boscos frondosos amb basses, falgueres gegants, canaris salvatges i cérvols. Passeig tranquil a la fresca de la tarda.',
    maps: 'https://maps.google.com/?q=38.7384423,-28.2621519',
  },
  'mir-sjo-01': {
    nom: 'Miradouro Entre Morros', emoji: '🔭', cat: 'miradors',
    coords: [38.6876737, -28.219042],
    desc: 'Mirador a l\'entrada de Velas amb vistes sobre la capital de l\'illa i el Pico al fons.',
    maps: 'https://maps.google.com/?q=38.6876737,-28.219042',
  },
  'mir-sjo-03': {
    nom: 'Miradouro da Fajã dos Cubres', emoji: '🔭', cat: 'miradors',
    coords: [38.6477209, -27.9883935],
    desc: 'Des d\'aquí es contemplen alhora la Fajã dos Cubres i, al fons, la famosa Fajã do Santo Cristo.',
    maps: 'https://maps.google.com/?q=38.6477209,-27.9883935',
  },
  'mir-sjo-08': {
    nom: 'Miradouro do Canavial', emoji: '🔭', cat: 'miradors',
    coords: [38.6888991, -28.2137742],
    desc: 'Mirador proper a Velas amb bones vistes de la costa sud de l\'illa.',
    maps: 'https://maps.google.com/?q=38.6888991,-28.2137742',
  },
  'mir-sjo-14': {
    nom: 'Miradouro do Topo', emoji: '🔭', cat: 'miradors',
    coords: [38.5462151, -27.7721096],
    desc: 'Mirador sobre l\'extrem oriental de l\'illa, el port històric de Topo i el seu illot.',
    maps: 'https://maps.google.com/?q=38.5462151,-27.7721096',
  },
  'mir-sjo-16': {
    nom: 'Miradouro Ferrã Afonso', emoji: '🔭', cat: 'miradors',
    coords: [38.741033, -28.2637165],
    desc: 'Si el dia està clar, es pot observar el seguit de turons de la part alta de l\'illa que recorden la silueta d\'un drac.',
    maps: 'https://maps.google.com/?q=38.741033,-28.2637165',
  },
  'mir-sjo-17': {
    nom: 'Miradouro Serra do Topo', emoji: '🔭', cat: 'miradors',
    coords: [38.59735, -27.9266931],
    desc: 'Un dels miradors del retorn des de Topo, a uns 20 km de l\'extrem est de l\'illa.',
    maps: 'https://maps.google.com/?q=38.59735,-27.9266931',
  },
  'mir-sjo-18': {
    nom: 'Vigia da Baleia', emoji: '🔭', cat: 'miradors',
    coords: [38.7523542, -28.3088036],
    desc: 'Penya-segats verticals de 200m tallats a ganivet sobre l\'Atlàntic, amb Faial i Pico a l\'horitzó. Accés final només a peu.',
    maps: 'https://maps.google.com/?q=38.7523542,-28.3088036',
  },
  'nat-geo-sjo-02': {
    nom: 'Arco Natural de Velas', emoji: '🌋', cat: 'naturalesa',
    coords: [38.6794811, -28.2108337],
    desc: 'Curiós arc de roca volcànica a tocar del centre de Velas.',
    maps: 'https://maps.google.com/?q=38.6794811,-28.2108337',
  },
  'nat-pai-sjo-01': {
    nom: 'Fajã da Caldeira de Santo Cristo', emoji: '🌿', cat: 'naturalesa',
    coords: [38.6255581, -27.9279106],
    desc: 'Vista des del mirador de la Fajã dos Cubres; només s\'hi arriba caminant o amb quad.',
    maps: 'https://maps.google.com/?q=38.6255581,-27.9279106',
  },
  'nat-pai-sjo-05': {
    nom: 'Fajã do Ouvidor', emoji: '🌿', cat: 'naturalesa',
    coords: [38.6775835, -28.0517791],
    desc: 'Petit nucli costaner d\'on surt el camí cap a la Poça do Simão Dias.',
    maps: 'https://maps.google.com/?q=38.6775835,-28.0517791',
  },
  'nat-pai-sjo-07': {
    nom: 'Fajã dos Cubres', emoji: '🌿', cat: 'naturalesa',
    coords: [38.6423232, -27.9658869],
    desc: 'Plataforma de lava arran de mar amb llacuna costanera, poble minúscul i vistes cap a Santo Cristo.',
    maps: 'https://maps.google.com/?q=38.6423232,-27.9658869',
  },
  'nat-pai-sjo-09': {
    nom: 'Farol do Topo', emoji: '🔦', cat: 'naturalesa',
    coords: [38.5491377, -27.7547801],
    desc: 'Far a l\'extrem més oriental de São Jorge, vora l\'illot amb vaques pasturant a 100m de la costa.',
    maps: 'https://maps.google.com/?q=38.5491377,-27.7547801',
  },
  'nat-pai-sjo-10': {
    nom: 'Farol dos Rosais', emoji: '🔦', cat: 'naturalesa',
    coords: [38.753523, -28.3114368],
    desc: 'Far abandonat a la Ponta dos Rosais. Accés amb cotxe normal desaconsellat i zona amb esllavissades constants.',
    maps: 'https://maps.google.com/?q=38.753523,-28.3114368',
  },
  'nat-pai-sjo-11': {
    nom: 'Ilhéu do Topo', emoji: '🐄', cat: 'naturalesa',
    coords: [38.5504922, -27.746525],
    desc: 'Illot a només 100m de la costa de Topo, curiosament amb vaques que hi pasturen.',
    maps: 'https://maps.google.com/?q=38.5504922,-27.746525',
  },
  'nat-pai-sjo-12': {
    nom: 'Morro das Velas', emoji: '🔭', cat: 'naturalesa',
    coords: [38.6824949, -28.2178312],
    desc: 'Punt elevat sobre la capital, un dels miradors finals abans de tornar els cotxes.',
    maps: 'https://maps.google.com/?q=38.6824949,-28.2178312',
  },
  'nat-pai-sjo-13': {
    nom: 'Parque Florestal das Sete Fontes', emoji: '🌲', cat: 'naturalesa',
    coords: [38.7355285, -28.2623583],
    desc: 'Parc de bosc frondós amb basses, falgueres gegants, canaris salvatges i cérvols.',
    maps: 'https://maps.google.com/?q=38.7355285,-28.2623583',
  },
  'nat-pai-sjo-15': {
    nom: 'Ponta dos Rosais', emoji: '🌋', cat: 'naturalesa',
    coords: [38.7554597, -28.3167432],
    desc: 'Extrem nord-oest de l\'illa. Penya-segats espectaculars i pista de terra fins al far abandonat.',
    maps: 'https://maps.google.com/?q=38.7554597,-28.3167432',
  },
  'ban-pis-sjo-05': {
    nom: 'Poça do Simão Dias', emoji: '🏊', cat: 'bany',
    coords: [38.6794637, -28.0533887],
    desc: 'La piscina natural més espectacular de les Açores, encaixonada entre columnes de basalt negre. Cal escarpins.',
    maps: 'https://maps.google.com/?q=38.6794637,-28.0533887',
  },
};

/* ── RESTAURANTS DATA ────────────────────────────────────── */
const RESTS_SETE_CIDADES = [
  {
    nom: 'Lagoa Azul Restaurant', preu: '€€', punt: 4.2,
    lat: 37.8610238, lon: -25.7941848,
    ta: 'https://www.tripadvisor.es/Restaurant_Review-g189134-d3612830-Reviews-Restaurante_Lagoa_Azul-Sao_Miguel_Azores.html?m=66827',
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJYWvC7s8xQwsR6pD_dboKGsA',
    foto: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AU_ZVEEOaFl8fTb7B0vnE_TLCvePJEAP9ASLFxOswWSBQKHrmLwnKhHF77kVH_TVnVuo8XDcl_7bJcDsq7iIWan_R-BjCTOelDpYitK-fvEdHC3pS4mCo1Yu_isTdMbsiSBjpwS9cLzMdkpycnsilLIHEXRFveYPthsiBt-Kaq6oHjQAADkbRO_ZPrWO0S4gdNfG_BECCRRJZsJl2gpfn8xhUHpG1503j4ZoCTK7uMwdyxzJa4nQtMYOdmUkPuYFfQPehwdR22LK9oxSIAJqQFpCqa86pSI9AgfgAzwNxpOOb3x8ScYoPwGv71s2s7AC_ma_lB-0nrSq-OxSFFE2h8MzPk1jdRc04vLscixyX4F88wdBiJRp0ZhFSiR-Z7SqXpqFH2SvZzZy8Evyix0aNa7x6T96CaxWsv3OEVZ-FF6fXxjP2aHQ&key=AIzaSyDnvUnUEUUUrBiyaArGEHSQln_6A2Q_A84',
  },
  {
    nom: 'São Nicolau', preu: '€', punt: 3.8,
    lat: 37.86317, lon: -25.7966228,
    ta: 'https://www.tripadvisor.com.br/Restaurant_Review-g11816388-d26366222-Reviews-Sao_Nicolau-Sete_Cidades_Sao_Miguel_Azores.html?m=66827',
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJLa8f5s4xQwsRjvuSZy2tla0',
    foto: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AU_ZVEGKFangLIKyGIjYYfahPZooDYEQM7DM1mSLjvBfspyJJwY2uUT9DaERQz7oHJIuf2dHiXrTSfV_t1DpL1m-XzFczWc-bSb6k1r6AYzHXZwosid-g9IvfwdMdgDzA6ypJy2V9nbK_AhLVYykTd8E-d1Qd3bsUNtybfGrMrW-UReiC-YRO9cp_1s9Hw5aUl_dg0EK6RTgtpeqzGyJf-vXIhFjYBirZo81svqPxcCs9hoq95AtNQ1N976V4c8ugtfuJfa7a6NijCAWQxai2kExotQySzN3hsC3i_yc_l3AL_o_8Q&key=AIzaSyDnvUnUEUUUrBiyaArGEHSQln_6A2Q_A84',
  },
  {
    nom: 'Casa de Chá "O Poejo"', preu: '€€', punt: 4.2,
    lat: 37.8576596, lon: -25.7914674,
    ta: 'https://www.tripadvisor.es/Restaurant_Review-g11816388-d15231646-Reviews-Casa_de_Cha_O_Poejo-Sete_Cidades_Sao_Miguel_Azores.html?m=66827',
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJYTrqQtoxQwsRSy-7WqTgzBw',
    foto: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AU_ZVEGKWOqjmurhxaqA51Au-R8heZEitV5TOTPwzzHgcnmWcuSHvQHJm-YVpOjLYGbkKaBnfc84t3UbGzXrT9EMIvVp95QN4TGcudhNrt_WZaWX7lsL3Cp8lo4xO9TuL7vUQwJ7Y2S5QzTj-DLSzN0VBLOGz_mQ5H5exNlV9fCrl--mlplfeFflFrHAIL_gpkWuwNCuqSgcZeMn3l0dkWaNW5SekKL7Qvgd6BSptf1AYbthODYk2MK_gVvIT-DBQmgXVP2g7sDO-S9D44i0K7poeajHRnwnx1ZinK5uEo5gZWiQMA&key=AIzaSyDnvUnUEUUUrBiyaArGEHSQln_6A2Q_A84',
  },
  {
    nom: 'O Nuno - O Rei das Bifanas', preu: '€', punt: 4.9, rec: true,
    lat: 37.859883, lon: -25.7924586,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJObNaquoxQwsRpmeajVuRgs8',
    foto: null,
  },
  {
    nom: 'Green Love Restaurant', preu: '€€', punt: 2.8, avoid: true,
    lat: 37.8634764, lon: -25.7925725,
    ta: 'https://www.tripadvisor.es/Restaurant_Review-g11816388-d7392484-Reviews-Green_Love-Sete_Cidades_Sao_Miguel_Azores.html',
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJoTp8gsUxQwsRetE2xImrLHM',
    foto: null,
  },
];

const RESTS_PONTA_DELGADA = [
  {
    nom: 'A Tasca', preu: '€€', punt: 4.3, top10: true, rec: true,
    lat: 37.7409517, lon: -25.667432,
    ta: 'https://www.tripadvisor.es/Restaurant_Review-g189135-d6696858-Reviews-A_Tasca-Ponta_Delgada_Sao_Miguel_Azores.html?m=66827',
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJgXv_CsoqQwsRxyxX6XfRAD4',
    foto: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AU_ZVEEMus-uC9RGbTxULtswxpedESfbCapjVD_wAzwMtBxfYYjTrrAuU1cpMC0-2GZxP3tBK4t6v7b2jP_v2VcPxWetF17HQW7BUl1nsveaHptzOh0S2qZfXef4RVUhVkcIEsZ9Uz35Q2_SC5uhj0p_L6ilWD5caUV9Z4DkbWH7cwqXMZ0LSzIGUhMRDijPfiIJZMIUKYPyiFYYkdMsZLy4JQ1WNhpLVk61fr9ZJOv9290QKkiyQDEN8XEPiLmavz58dLOJRW8jOkXiV2TrYu2_L85cD-GqLXcIyoJpxxh081i883Kunt7SSC8eWkm7dijScIKU3MQFZxA3FybRt3HuzTIAFuSDJlRYhKUxIiiB2vohO27nNe5GOzwdk3Fj3A1rDwnWTwud5SHk1XhEJwRLLLbp9_13jSD_qJDCbsFjxhq3uPkIo0_1xnKHTdgRo3we&key=AIzaSyDnvUnUEUUUrBiyaArGEHSQln_6A2Q_A84',
  },
  {
    nom: 'Taberna Açor', preu: '€€', punt: 4.4, top10: true, rec: true,
    lat: 37.7402531, lon: -25.6669838,
    ta: 'https://www.tripadvisor.es/Restaurant_Review-g189135-d7259560-Reviews-Taberna_Acor-Ponta_Delgada_Sao_Miguel_Azores.html?m=66827',
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJndVrkbUqQwsRJVAwCDqhFLQ',
    foto: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AU_ZVEEsKDmKG88zoMDmr0Zmu230Hdciq6JjikpSmM7FiYeY0Y1cr8i0RMxBEZv74oBnhENlsiaFXIa3c4V0YYNevVOiceLjgtaiFwR1n6abYFKWszv5qnxMy_rkbKwsJavzeSMwrRCp313Xh1cbOQN1tRuqJGYlG91puKdIAmNqJ_gE0YuoovFAnWcP5oBuL1JURJyBD85UhCTpuQ1gXGb9FYuPjQr8ZHwoewolMMGhYwOeAdo_Gbutdp0pIvNeBcLE3iEtAqtewV8j6H48bKxGbM2RzKSY46UWbyuFjRMlHlFZDlwYa7Kd_2XiASwO0zR2QVWIviIY8KCBd4v2nLcRioQQK-cTZX5Xi5za7EujC3xEJKhHoVj8IUCRwn6XH3hqCjkO3zHzKCfEvme3QJhmEpL972bMlSLDQJgf1nGnmPZHFJvTFtfTPqB984jlnEeD&key=AIzaSyDnvUnUEUUUrBiyaArGEHSQln_6A2Q_A84',
  },
  {
    nom: 'Supléxio', preu: '€€', punt: 4.7, top10: false, rec: true,
    lat: 37.7426096, lon: -25.669157,
    ta: 'https://www.tripadvisor.es/Restaurant_Review-g189135-d12128271-Reviews-Suplexio_Handmade_Burger-Ponta_Delgada_Sao_Miguel_Azores.html?m=66827',
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJeQFp9skqQwsRHfReRwR8lcA',
    foto: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AU_ZVEFqF8bpBjuTefo4Ptgr1bP4bL2-qSLR3R2yU5sq_whNyyvJeqHTBucf0CWEhn64Az0eLz2IDmEm7PcZF29UoBMeTZ72cnRBmTzEF2N5uo2IJR1IyyrkMfMBnlEfBDzGYZfPsehqPybo5vulFZlEqyXMc84jDHzq0q9DJOOjetBi5xDkj-0xezN3Sak0-CtAn2x1u8eeK7oAqFRxmq5mv2vbcxoZdi4jkTbVSA-Pr8xtxbMjCWvhwi76bQtqzhIL_LH5Tcrm0_s0YJLyZJ8bh3qppE9fF2hxBLdl7EAoQUqzfNx6Bn4K4Vxapqt-fPo9pN2aAVHUA2J-GAKVCu0C9nKU_rgRz1eq-43oz3ge8iM1qrczCIKpJYzr-wJtZMWhIj1cxuSjJXmcAxsP6yPnp1B4FXzV0fc3CgkmahDKYIgSHA&key=AIzaSyDnvUnUEUUUrBiyaArGEHSQln_6A2Q_A84',
  },
  {
    nom: 'Restaurante Alcides', preu: '€€', punt: 4.1, top10: true, rec: true,
    lat: 37.7410082, lon: -25.6687222,
    ta: 'https://www.tripadvisor.com.br/Restaurant_Review-g189134-d2254911-Reviews-Alcides-Sao_Miguel_Azores.html?m=66827',
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJ5x3WA8oqQwsRkuE4uMxhWgw',
    foto: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AU_ZVEEaZSnsteEES34R2ci5Oa6MxyKy4UIAva9J_FruAp4_Zl99Yxt6ddgnaNDNoleiazZbliqQ0z7tlrNJV5PAdowh02_SxgXFOcPIqC4e_AxsDUZ0pmwChSbiUdisSZfaX64xG2JGIo5EiD50S0WEuzOLiMPrDurzcmZMGZ1RERD74QOeB62zBIZRZOQL5KjHFGzv7nVr7qaO2NhYYhrOfnWUFu5BmPm6_UZlN1r-HzseU7_N-1C9fC3lQZkZuypt1ywKW23cKgyenan-czqGPu1wNkXUD7oqTIqVNMW0RhssH5eMk6RaLNyDos8EnKJValrKMWKbnaA70hcUvVSzv8RjgiOLO4phhLNPoZilW-Ys_w8kKVDKPh3tIzeEZyNdGuFoDu0QfB0kZgJ3yRE2Pj55pP3Z80-_9GEShzRYgqFPsN7f&key=AIzaSyDnvUnUEUUUrBiyaArGEHSQln_6A2Q_A84',
  },
  {
    nom: 'Adega do Mestre André', preu: '€€', punt: 4.4, top10: false, rec: false,
    lat: 37.7403398, lon: -25.66950,
    ta: 'https://www.tripadvisor.com.br/Restaurant_Review-g189135-d17474048-Reviews-Adega_do_Mestre_Andre-Ponta_Delgada_Sao_Miguel_Azores.html?m=66827',
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJNzsW6oQrQwsRFroDt7E1nEA',
    foto: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AU_ZVEEVjlDAO5AAV0Px0znQMQ3obY8B5OVbqCXDrqqVokPZB1q4ru3svfhdh2ujA2SE4OlmEOmSjPOxTE32atfkwFal3Rp1ukWa4KAOrJXQ64frKb9ar6sPJ87v-FbzvaR1W15l0M5Opl4qd74DAyOr7RNwDWEQ1nNAkGeiBUwUxHu5b9IMRhqW8nxJdY3riPhgbEzLII5tC0XqO9yqKzGJFzmV2nHIVf0En97pi1sgVY2gp5LK7NwpABPteQBhyXINwuHhNnAhzWEesbhuHwh0zv3tdasyVaNWGtZP2tv4PGSIgQ&key=AIzaSyDnvUnUEUUUrBiyaArGEHSQln_6A2Q_A84',
  },
  {
    nom: 'Azores Forever Diner', preu: '€', punt: 4.7, top10: false, rec: false,
    lat: 37.7398522, lon: -25.6688895,
    ta: 'https://www.tripadvisor.es/Restaurant_Review-g189135-d13487528-Reviews-Azores_Forever_Snack_Bar_and_takeaway-Ponta_Delgada_Sao_Miguel_Azores.html?m=66827',
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJX65JCLYqQwsRKDqCbYA2b6A',
    foto: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AU_ZVEF9etfPVExEgllVV0xTiouStq7CWr2FPwDLbpbEzNQnZgUuh6cuxZES3tQ3-hisqPuF9whfueVXkKFiPm_e1sLr9N33K_yy8l8pQZpnjExJBz4bXcm7DMqWKudOn25ArXL1NiO8B3XWKBsoCPTBdE-WN8KW29pjD-wyxNjpMQzUj_MnalhQN8MlJFv2QZLlj2jzdZ_xHAB0V6x9tMsxDuATc1MXa3YCMLtFlNaQQYxwUz2hlDPMm6vEEq3J_FCPcR-tiUY3d4FK2SDoke6c4438bKSozMmljUcLH7LOVruQX4y6FVwCh1nHTbIcXqDeCGZqopuOTbHOTMOxPpVXtLatva_5_bqdRkwT4dtPwF58by6Wr2Q64W3fy9gKNWvOxarFEtcxVRSc_68Xumua7WUSwuGYqHVFlE3tSixCLeb8fuPA&key=AIzaSyDnvUnUEUUUrBiyaArGEHSQln_6A2Q_A84',
  },
];

const RESTS_VILA_FRANCA = [
  {
    nom: 'Black Whale Restaurant', preu: '€€', punt: 4.7, rec: true,
    lat: 37.716265, lon: -25.432972,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJeUeFKHInXQsRPajg7EoHy74',
    foto: null,
  },
  {
    nom: 'Atlântico Azorean Restaurant', preu: '€€', punt: 4.5, rec: true,
    lat: 37.714328, lon: -25.431989,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJceGXNGcmXQsRKRvuaoaSl7k',
    foto: null,
  },
  {
    nom: 'Sabores da Vizinha', preu: '€€', punt: 4.2, rec: false,
    lat: 37.714608, lon: -25.434241,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJ_RCI-A0nXQsRmXKkRolGxDo',
    foto: null,
  },
  {
    nom: 'Pizzaria Lua do Sul', preu: '€', punt: 4.5, rec: false,
    lat: 37.71616, lon: -25.443493,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJc_pq10MmXQsRbZKWFrDtSj8',
    foto: null,
  },
  {
    nom: "Bar Vinha d'Areia", preu: '€', punt: 4.1, rec: false,
    lat: 37.717153, lon: -25.427139,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJG9z-dQsnXQsRnRcMhG4UlXg',
    foto: null,
  },
];

const RESTS_RIBEIRA_PLATJA = [
  {
    nom: "TukáTulá Beach Bar", preu: '€€', punt: 4.4, rec: true,
    lat: 37.8186886, lon: -25.5419763,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJtWj8xsfWXAsR55jQRgjhYpk',
    foto: null,
  },
  {
    nom: 'Santa Bárbara Beach Club', preu: '€€', punt: 4.4, rec: false,
    lat: 37.8154935, lon: -25.5508568,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJrYfP8NjXXAsRiYe-Q8Rz3GA',
    foto: null,
  },
];

const RESTS_RIBEIRA_CENTRE = [
  {
    nom: 'Restaurante O Silva', preu: '€€', punt: 4.5, rec: false,
    lat: 37.8130502, lon: -25.534111,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJuaqqqibXXAsRWm_1sMIEVf4',
    foto: null,
  },
  {
    nom: 'Tio Lanches', preu: '€', punt: 4.5, rec: false,
    lat: 37.8186719, lon: -25.5309512,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJlz-k-9bXXAsRl3-NjOTEkzs',
    foto: null,
  },
  {
    nom: 'Restaurante Monte Verde', preu: '€€', punt: 4.3, rec: false,
    lat: 37.8221673, lon: -25.526724,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJq_nFH9rWXAsR6KDBE5n-d48',
    foto: null,
  },
];

const RESTS_CALOURA = [
  {
    nom: 'Bar Caloura', preu: '€', punt: 4.6, rec: true,
    lat: 37.7137819, lon: -25.4960382,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJPSm-2IwoXQsR2WkLkzMBz-w',
    foto: null,
  },
  {
    nom: 'Adega Caloura Restaurant', preu: '€€', punt: 4.6, rec: true,
    lat: 37.7123612, lon: -25.4972903,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJOTWIf2spXQsRdCsxiWfxEKY',
    foto: null,
  },
  {
    nom: 'Casa do Abel', preu: '€€', punt: 4.6, rec: true,
    lat: 37.7205972, lon: -25.5110928,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJMdh3D1coXQsR7-dEOz_7O2Y',
    foto: null,
  },
  {
    nom: 'Restaurante Dragoeiro', preu: '€€', punt: 4.1, rec: false,
    lat: 37.7138196, lon: -25.5125868,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJ9XpuWu4pXQsRJWjGYo_gkaw',
    foto: null,
  },
  {
    nom: "Restaurante Paraíso do Milénio", preu: '€', punt: 4.1, rec: false,
    lat: 37.7217275, lon: -25.5086525,
    ta: null,
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJH2xCYFcoXQsRg_S3FJPWy5Q',
    foto: null,
  },
];

/* Restaurants ràpids a Velas (dia 7) — no tenen fitxa a restaurants-data.js,
   es mostren només amb la puntuació de Google i una descripció curta, sense enllaços */
const RESTS_VELAS_RAPID = [
  {
    nom: 'Cachorrinhos do Beto', punt: 4.8, rec: true,
    desc: 'Foodtruck de kebabs, hot dogs i frankfurts, a tocar de l\'Arco Natural de Velas.',
  },
  {
    nom: 'EsKema', punt: 4.8, rec: true,
    desc: 'Molt a prop del centre i del port, obert tot el dia. Ambient modern i informal: hamburgueses de vedella local, pregos, entrepans i tapes ràpides.',
  },
  {
    nom: 'Snack Bar O 30', punt: 4.4, rec: false,
    desc: 'Obert de forma ininterrompuda. Típic snack-bar local per a una parada exprés: truites, hamburgueses, biquinis o racions ràpides a la planxa.',
  },
  {
    nom: 'Café Mesquita', punt: 4.6, rec: false,
    desc: 'Cafè clàssic molt proper al centre. Sandvitxos calents, entrepans clàssics i cafès a qualsevol hora.',
  },
];

/* ── RENDER LLISTA DE RESTAURANTS SIMPLE (sense enllaços, per punts sense fitxa) ── */
function renderRestListSimple(containerSelector, data) {
  const el = document.querySelector(containerSelector);
  if (!el) return;
  el.innerHTML = data.map(r => {
    const star = r.rec ? ' ⭐' : '';
    return `<div class="rest-list-item">
      <span class="rest-list-nom">${r.nom}${star}</span>
      <span class="rest-list-rating">${starsTextAmber(r.punt)}</span>
      <div class="rest-list-desc-simple">${r.desc}</div>
    </div>`;
  }).join('');
}

const PDL_COORDS = [37.74239, -25.67375];

/* ── ROUTE WAYPOINTS DIA 2 — ITINERARI PRINCIPAL (sentit horari) ── */
const DIA2_WAYPOINTS = [
  { nom: 'Mirador Pico do Carvão', coords: [37.81916, -25.75109], icon: '🔭' },
  { nom: 'Muro das Nove Janelas', coords: [37.83389, -25.75191], icon: '🧱' },
  { nom: 'Boca do Inferno (caminada)', coords: [37.84285, -25.76362], icon: '🔭', offroad: true },
  { nom: 'Vista do Rei', coords: [37.83929, -25.79493], icon: '🔭' },
  { nom: 'Sete Cidades', coords: [37.85574, -25.78630], icon: '🏘️' },
  { nom: 'Ponta da Ferraria', coords: [37.85859, -25.85236], icon: '♨️' },
  { nom: 'Ponta do Escalvado', coords: [37.87123, -25.84134], icon: '🔭' },
  { nom: 'Mosteiros', coords: [37.88846, -25.82408], icon: '🏖️' },
  { nom: 'Pedras Negras (Capelas)', coords: [37.83552, -25.67246], icon: '🔭' },
];

// ORS routing: start + only road-accessible waypoints + end
const DIA2_ORS_COORDS = [
  PDL_COORDS,
  ...DIA2_WAYPOINTS.filter(w => !w.offroad).map(w => w.coords),
  PDL_COORDS,
];

const DIA2_MAPS_LINK = 'https://maps.app.goo.gl/CN2sMsKLS2Fp76vN7';

/* ── ROUTE WAYPOINTS DIA 2 — ITINERARI ALTERNATIU (sentit antihorari) ── */
/* Per fer-lo si Sete Cidades surt clar de bon matí: comencem per la costa nord */
const DIA2_ALT_WAYPOINTS = [
  { nom: 'Pedras Negras (Capelas)', coords: [37.83552, -25.67246], icon: '🔭' },
  { nom: 'Mosteiros', coords: [37.88846, -25.82408], icon: '🏖️' },
  { nom: 'Ponta do Escalvado', coords: [37.87123, -25.84134], icon: '🔭' },
  { nom: 'Ponta da Ferraria', coords: [37.85859, -25.85236], icon: '♨️' },
  { nom: 'Sete Cidades', coords: [37.85574, -25.78630], icon: '🏘️' },
  { nom: 'Vista do Rei', coords: [37.83929, -25.79493], icon: '🔭' },
  { nom: 'Boca do Inferno (caminada)', coords: [37.84285, -25.76362], icon: '🔭', offroad: true },
  { nom: 'Muro das Nove Janelas', coords: [37.83389, -25.75191], icon: '🧱' },
  { nom: 'Mirador Pico do Carvão', coords: [37.81916, -25.75109], icon: '🔭' },
];

const DIA2_ALT_ORS_COORDS = [
  PDL_COORDS,
  ...DIA2_ALT_WAYPOINTS.filter(w => !w.offroad).map(w => w.coords),
  PDL_COORDS,
];

const DIA2_ALT_MAPS_LINK = 'https://maps.app.goo.gl/Ran44LemT4fkECwm6';

/* ── SENDERISME ROUTE APPROXIMATIONS ─────────────────────── */
const SEND_ROUTES = {
  prc05: {
    label: 'PRC05 SMI · Serra Devassa', color: '#dc2626',
    coords: [
      [37.8208, -25.7469], [37.8260, -25.7500], [37.8310, -25.7540],
      [37.8370, -25.7568], [37.8410, -25.7594], [37.8426, -25.7614],
      [37.8428, -25.7636],
      [37.8426, -25.7614], [37.8370, -25.7568], [37.8310, -25.7540],
      [37.8260, -25.7500], [37.8208, -25.7469],
    ]
  },
  pr04: {
    label: 'PR04 SMI · Mata do Canário – Sete Cidades', color: '#2563eb',
    coords: [
      [37.8315, -25.7558], [37.8360, -25.7605], [37.8408, -25.7654],
      [37.8460, -25.7712], [37.8498, -25.7762], [37.8530, -25.7810],
      [37.8557, -25.7863],
    ]
  },
  pr03: {
    label: 'PR03 SMI · Vista do Rei – Sete Cidades', color: '#16a34a',
    coords: [
      [37.8393, -25.7949], [37.8425, -25.7920], [37.8460, -25.7895],
      [37.8492, -25.7873], [37.8520, -25.7858], [37.8540, -25.7846],
      [37.8557, -25.7863],
    ]
  }
};

/* ── HELPERS ─────────────────────────────────────────────── */
function starsHtml(punt) {
  if (!punt) return '<span class="itin-rest-stars" style="color:#6aab7a;font-size:0.8rem">Sense puntuació</span>';
  const full = Math.floor(punt);
  const half = punt - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return `<span class="itin-rest-stars">${'★'.repeat(full)}${'½'.repeat(half)}${'☆'.repeat(empty)}</span>
          <span class="itin-rest-punt">${punt.toFixed(1)}</span>`;
}

function starsTextAmber(punt) {
  if (!punt) return '<span style="color:#b45309;font-size:0.8rem">—</span>';
  const rounded = Math.round(punt);
  return `<span class="rest-list-stars">${'★'.repeat(rounded)}${'☆'.repeat(5 - rounded)}</span><span class="rest-list-num">${punt.toFixed(1)}</span>`;
}

function slugify(nom) {
  return nom.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/["'«»()]/g, '').replace(/[^a-z0-9\s-]/g, ' ')
    .trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

function startIcon() {
  return L.divIcon({
    html: `<span style="font-size:1.6rem;line-height:1;display:block;filter:drop-shadow(0 1px 4px rgba(0,0,0,0.7))">▶️</span>`,
    iconSize: [28, 28], iconAnchor: [14, 14], className: ''
  });
}
function finishIcon() {
  return L.divIcon({
    html: `<span style="font-size:1.6rem;line-height:1;display:block;filter:drop-shadow(0 1px 4px rgba(0,0,0,0.7))">🏁</span>`,
    iconSize: [28, 28], iconAnchor: [14, 14], className: ''
  });
}

function poiLink(key, text) {
  const p = POI[key];
  if (!p) return `<strong>${text}</strong>`;
  return `<span class="poi-link" data-poi="${key}">${text}</span>`;
}

function numberIcon(n, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="14" fill="${color}" stroke="#0a1628" stroke-width="2"/>
    <text x="16" y="21" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0a1628">${n}</text>
  </svg>`;
  return L.divIcon({
    html: svg,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    className: '',
  });
}

function simplePin(color) {
  return L.divIcon({
    html: `<div style="width:14px;height:14px;background:${color};border:2px solid #0a1628;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    className: '',
  });
}

function leafletTiles(map) {
  L.tileLayer(CARTO_URL, { attribution: CARTO_ATTR, maxZoom: 18 }).addTo(map);
}

/* ── MAPS INITIALISATION ─────────────────────────────────── */

// Map for Cotxes (Aeroport / Ilha Verde)
function initMapCotxes() {
  const el = document.getElementById('map-cotxes');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: true, scrollWheelZoom: false });
  leafletTiles(map);
  const lat = 37.74958, lng = -25.71000;
  map.setView([lat, lng], 15);
  L.marker([lat, lng], {
    icon: L.divIcon({
      html: `<div style="background:#2980b9;border:2px solid #fff;border-radius:50%;width:16px;height:16px;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>`,
      iconSize: [16, 16], iconAnchor: [8, 8], className: ''
    })
  }).addTo(map).bindPopup('<b>Ilha Verde</b><br>Aeroporto João Paulo II').openPopup();
}

// Map for Allotjament (Santo Cristo House)
function initMapAllotjament1() {
  const el = document.getElementById('map-allotjament1');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: true, scrollWheelZoom: false });
  leafletTiles(map);
  const lat = 37.74239, lng = -25.67375;
  map.setView([lat, lng], 16);
  L.marker([lat, lng], {
    icon: L.divIcon({
      html: `<div style="background:#e74c3c;border:2px solid #fff;border-radius:50%;width:16px;height:16px;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>`,
      iconSize: [16, 16], iconAnchor: [8, 8], className: ''
    })
  }).addTo(map).bindPopup('<b>Santo Cristo House</b><br>Rua São Francisco Xavier nº 8').openPopup();
}

// Map for a Dia 2 route — markers only, no route line (used for both itinerary variants)
function initMapRuta(elId, waypoints) {
  const el = document.getElementById(elId);
  if (!el || el._leaflet_id) return;

  const map = L.map(el, { zoomControl: false, scrollWheelZoom: false });
  L.control.zoom({ position: 'topright' }).addTo(map);
  leafletTiles(map);

  // START at PDL (slightly north) / FINISH (slightly south)
  L.marker([PDL_COORDS[0] + 0.002, PDL_COORDS[1]], { icon: startIcon(), zIndexOffset: 200 })
    .addTo(map).bindPopup('<b>▶️ Inici</b><br>Ponta Delgada');
  L.marker([PDL_COORDS[0] - 0.002, PDL_COORDS[1]], { icon: finishIcon(), zIndexOffset: 200 })
    .addTo(map).bindPopup('<b>🏁 Final</b><br>Ponta Delgada');

  // Numbered waypoints
  waypoints.forEach((wp, i) => {
    L.marker(wp.coords, { icon: numberIcon(i + 1, COL_SM), zIndexOffset: 100 })
      .addTo(map).bindPopup(`<b>${i + 1}. ${wp.nom}</b>`);
  });

  const allCoords = [PDL_COORDS, ...waypoints.map(w => w.coords)];
  map.fitBounds(L.latLngBounds(allCoords), { padding: [30, 30] });
}

/* ── ROUTE MAP FLIP ──────────────────────────────────────── */
function flipMapRoute(wrapId, btnId) {
  const wrap = document.getElementById(wrapId || 'map-ruta-flip');
  const btn  = document.getElementById(btnId || 'map-flip-btn');
  if (!wrap) return;
  const isFlipped = wrap.classList.toggle('flipped');
  if (btn) btn.textContent = isFlipped ? '🗺 Torna al mapa' : '📍 Veure ruta Google Maps';
}

/* ── RUTA TABS (itinerari principal / alternatiu) ────────── */
let rutaTabsInit = { principal: false, alt: false };
function showRutaTab(tab) {
  document.querySelectorAll('.itin-route-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.itin-route-panel').forEach(p => p.classList.remove('active'));
  const btn = document.querySelector(`.itin-route-tab[data-tab="${tab}"]`);
  const panel = document.getElementById(`ruta-panel-${tab}`);
  if (btn) btn.classList.add('active');
  if (panel) panel.classList.add('active');

  if (tab === 'principal' && !rutaTabsInit.principal) {
    rutaTabsInit.principal = true;
    setTimeout(() => initMapRuta('map-ruta-d2', DIA2_WAYPOINTS), 80);
  }
  if (tab === 'alt' && !rutaTabsInit.alt) {
    rutaTabsInit.alt = true;
    setTimeout(() => initMapRuta('map-ruta-d2-alt', DIA2_ALT_WAYPOINTS), 80);
  }
}

function fallbackPolyline(map, coords) {
  L.polyline(coords, { color: COL_SM, weight: 3, opacity: 0.6, dashArray: '8, 8' }).addTo(map);
}

/* ── GPS TRACKS (de ME_RUTES_SENDERISME) ─────────────────── */
const TRACK_PR04_SMI = [[37.83175,-25.75298],[37.83198,-25.75267],[37.83182,-25.75231],[37.83201,-25.75201],[37.8325,-25.75193],[37.83341,-25.75186],[37.83387,-25.75195],[37.83426,-25.75216],[37.83522,-25.75266],[37.83665,-25.75355],[37.83773,-25.75456],[37.83937,-25.75578],[37.84085,-25.75608],[37.84153,-25.75651],[37.84187,-25.75664],[37.84297,-25.75711],[37.84517,-25.75801],[37.84579,-25.75827],[37.84653,-25.758],[37.84773,-25.75789],[37.84837,-25.75813],[37.84864,-25.76005],[37.84912,-25.75981],[37.85046,-25.76025],[37.85205,-25.76],[37.85344,-25.75983],[37.8538,-25.75962],[37.85513,-25.75965],[37.85689,-25.75958],[37.85741,-25.75982],[37.85849,-25.76045],[37.86082,-25.76168],[37.86295,-25.76176],[37.86421,-25.76186],[37.8653,-25.76231],[37.8667,-25.76257],[37.86823,-25.76252],[37.86996,-25.76287],[37.87104,-25.76325],[37.87244,-25.76355],[37.87409,-25.76461],[37.87563,-25.76704],[37.87634,-25.7689],[37.8768,-25.76985],[37.87767,-25.77063],[37.87841,-25.77206],[37.87948,-25.77413],[37.88013,-25.77655],[37.88044,-25.77789],[37.88117,-25.77829],[37.88164,-25.77905],[37.88108,-25.78064],[37.88022,-25.78654],[37.8794,-25.78769],[37.8791,-25.78973],[37.87953,-25.79152],[37.87861,-25.79229],[37.87944,-25.79464],[37.8791,-25.79563],[37.87779,-25.79681],[37.87699,-25.79874],[37.87629,-25.80105],[37.87442,-25.80244],[37.87297,-25.80135],[37.87185,-25.8008],[37.87073,-25.79985],[37.87041,-25.79923],[37.86985,-25.79834],[37.86914,-25.79739],[37.86847,-25.79653],[37.86722,-25.79556],[37.86609,-25.79412],[37.86368,-25.79277],[37.86133,-25.79296],[37.86311,-25.79611],[37.86304,-25.79689]];
const TRACK_PR03_SMI = [[37.83942,-25.79516],[37.8395,-25.7953],[37.83976,-25.79603],[37.84045,-25.7974],[37.84092,-25.79838],[37.84128,-25.79924],[37.84203,-25.80063],[37.84269,-25.8022],[37.84387,-25.80435],[37.84477,-25.80565],[37.84581,-25.80765],[37.84647,-25.80826],[37.84694,-25.80917],[37.84762,-25.81026],[37.84823,-25.81118],[37.84929,-25.8121],[37.85035,-25.81218],[37.85143,-25.81291],[37.85222,-25.8133],[37.85313,-25.81357],[37.85468,-25.81411],[37.85627,-25.81435],[37.85765,-25.81446],[37.85882,-25.81433],[37.85965,-25.8152],[37.86078,-25.81626],[37.86171,-25.81641],[37.86273,-25.816],[37.86406,-25.81606],[37.8651,-25.81593],[37.86683,-25.81571],[37.86817,-25.81558],[37.86914,-25.81433],[37.86972,-25.81454],[37.87072,-25.81371],[37.87183,-25.81234],[37.8723,-25.81165],[37.87292,-25.8108],[37.87335,-25.80922],[37.87322,-25.80563],[37.8731,-25.80543],[37.87339,-25.80382],[37.87429,-25.80259],[37.87309,-25.80145],[37.87215,-25.80099],[37.87051,-25.79938],[37.8695,-25.798],[37.86877,-25.79659],[37.86757,-25.79598],[37.8666,-25.79507],[37.86569,-25.79373],[37.86451,-25.79285],[37.8637,-25.79278],[37.86245,-25.79475],[37.86304,-25.79689]];

/* ── TRACKS REALS (GPX importats) ────────────────────────── */
const TRACK_PRC37_SMI=[[37.74627,-25.53731],[37.74653,-25.53725],[37.74670,-25.53724],[37.74680,-25.53729],[37.74706,-25.53755],[37.74743,-25.53789],[37.74766,-25.53808],[37.74767,-25.53809],[37.74801,-25.53830],[37.74814,-25.53834],[37.74836,-25.53829],[37.74860,-25.53825],[37.74866,-25.53823],[37.74872,-25.53829],[37.74873,-25.53829],[37.74878,-25.53846],[37.74881,-25.53856],[37.74883,-25.53865],[37.74886,-25.53872],[37.74892,-25.53874],[37.74898,-25.53874],[37.74898,-25.53869],[37.74898,-25.53863],[37.74901,-25.53857],[37.74904,-25.53847],[37.74901,-25.53833],[37.74896,-25.53817],[37.74892,-25.53801],[37.74894,-25.53790],[37.74897,-25.53774],[37.74899,-25.53760],[37.74901,-25.53746],[37.74904,-25.53724],[37.74909,-25.53705],[37.74913,-25.53684],[37.74913,-25.53683],[37.74914,-25.53662],[37.74917,-25.53652],[37.74919,-25.53638],[37.74918,-25.53623],[37.74916,-25.53607],[37.74915,-25.53594],[37.74914,-25.53581],[37.74914,-25.53564],[37.74912,-25.53545],[37.74912,-25.53544],[37.74909,-25.53520],[37.74904,-25.53501],[37.74900,-25.53485],[37.74895,-25.53474],[37.74890,-25.53463],[37.74886,-25.53452],[37.74882,-25.53446],[37.74878,-25.53440],[37.74877,-25.53436],[37.74879,-25.53430],[37.74884,-25.53418],[37.74888,-25.53407],[37.74888,-25.53406],[37.74896,-25.53394],[37.74899,-25.53386],[37.74903,-25.53378],[37.74910,-25.53361],[37.74911,-25.53346],[37.74911,-25.53333],[37.74913,-25.53317],[37.74915,-25.53307],[37.74918,-25.53301],[37.74927,-25.53287],[37.74936,-25.53275],[37.74945,-25.53259],[37.74948,-25.53241],[37.74946,-25.53227],[37.74941,-25.53212],[37.74938,-25.53203],[37.74929,-25.53177],[37.74923,-25.53159],[37.74920,-25.53132],[37.74918,-25.53106],[37.74916,-25.53090],[37.74912,-25.53063],[37.74911,-25.53033],[37.74912,-25.52988],[37.74917,-25.52958],[37.74916,-25.52950],[37.74916,-25.52946],[37.74917,-25.52942],[37.74918,-25.52933],[37.74920,-25.52923],[37.74920,-25.52918],[37.74924,-25.52909],[37.74925,-25.52904],[37.74926,-25.52900],[37.74927,-25.52896],[37.74930,-25.52893],[37.74931,-25.52885],[37.74931,-25.52882],[37.74933,-25.52875],[37.74935,-25.52868],[37.74938,-25.52855],[37.74940,-25.52842],[37.74943,-25.52817],[37.74944,-25.52800],[37.74945,-25.52798],[37.74945,-25.52795],[37.74949,-25.52777],[37.74952,-25.52758],[37.74953,-25.52755],[37.74954,-25.52744],[37.74956,-25.52734],[37.74957,-25.52728],[37.74955,-25.52712],[37.74954,-25.52704],[37.74953,-25.52695],[37.74948,-25.52675],[37.74946,-25.52658],[37.74946,-25.52658],[37.74946,-25.52658],[37.74942,-25.52630],[37.74942,-25.52613],[37.74943,-25.52604],[37.74943,-25.52591],[37.74944,-25.52589],[37.74943,-25.52578],[37.74945,-25.52556],[37.74945,-25.52555],[37.74952,-25.52538],[37.74959,-25.52521],[37.74963,-25.52513],[37.74966,-25.52505],[37.74968,-25.52498],[37.74970,-25.52493],[37.74972,-25.52485],[37.74975,-25.52475],[37.74976,-25.52473],[37.74976,-25.52460],[37.74975,-25.52453],[37.74973,-25.52447],[37.74969,-25.52442],[37.74962,-25.52422],[37.74959,-25.52408],[37.74957,-25.52399],[37.74958,-25.52379],[37.74958,-25.52355],[37.74959,-25.52351],[37.74959,-25.52348],[37.74960,-25.52345],[37.74960,-25.52343],[37.74960,-25.52320],[37.74962,-25.52311],[37.74962,-25.52301],[37.74961,-25.52279],[37.74960,-25.52274],[37.74960,-25.52273],[37.74960,-25.52272],[37.74960,-25.52270],[37.74960,-25.52269],[37.74960,-25.52264],[37.74959,-25.52250],[37.74957,-25.52240],[37.74951,-25.52216],[37.74950,-25.52213],[37.74950,-25.52213],[37.74950,-25.52212],[37.74949,-25.52210],[37.74949,-25.52210],[37.74949,-25.52209],[37.74948,-25.52206],[37.74948,-25.52203],[37.74946,-25.52198],[37.74946,-25.52195],[37.74934,-25.52171],[37.74928,-25.52165],[37.74926,-25.52161],[37.74917,-25.52145],[37.74917,-25.52145],[37.74917,-25.52145],[37.74917,-25.52145],[37.74916,-25.52144],[37.74916,-25.52143],[37.74915,-25.52142],[37.74913,-25.52138],[37.74907,-25.52127],[37.74899,-25.52102],[37.74897,-25.52094],[37.74892,-25.52075],[37.74888,-25.52066],[37.74878,-25.52053],[37.74873,-25.52045],[37.74869,-25.52035],[37.74866,-25.52023],[37.74863,-25.52014],[37.74862,-25.52004],[37.74859,-25.51988],[37.74857,-25.51968],[37.74852,-25.51965],[37.74843,-25.51963],[37.74822,-25.51954],[37.74810,-25.51947],[37.74802,-25.51943],[37.74796,-25.51939],[37.74783,-25.51931],[37.74771,-25.51923],[37.74764,-25.51916],[37.74758,-25.51913],[37.74754,-25.51911],[37.74744,-25.51901],[37.74738,-25.51894],[37.74733,-25.51888],[37.74715,-25.51864],[37.74705,-25.51848],[37.74701,-25.51840],[37.74691,-25.51825],[37.74687,-25.51825],[37.74687,-25.51826],[37.74686,-25.51826],[37.74686,-25.51826],[37.74661,-25.51831],[37.74647,-25.51833],[37.74637,-25.51835],[37.74594,-25.51844],[37.74593,-25.51844],[37.74585,-25.51845],[37.74582,-25.51846],[37.74581,-25.51846],[37.74579,-25.51847],[37.74571,-25.51848],[37.74503,-25.51863],[37.74503,-25.51863],[37.74491,-25.51865],[37.74478,-25.51868],[37.74470,-25.51869],[37.74459,-25.51833],[37.74449,-25.51804],[37.74447,-25.51799],[37.74444,-25.51794],[37.74441,-25.51790],[37.74436,-25.51785],[37.74435,-25.51777],[37.74435,-25.51769],[37.74435,-25.51762],[37.74435,-25.51755],[37.74435,-25.51747],[37.74428,-25.51741],[37.74421,-25.51738],[37.74416,-25.51733],[37.74410,-25.51730],[37.74401,-25.51722],[37.74392,-25.51717],[37.74388,-25.51713],[37.74389,-25.51702],[37.74389,-25.51689],[37.74388,-25.51676],[37.74386,-25.51657],[37.74385,-25.51653],[37.74386,-25.51649],[37.74386,-25.51649],[37.74386,-25.51642],[37.74391,-25.51642],[37.74396,-25.51641],[37.74400,-25.51636],[37.74400,-25.51636],[37.74400,-25.51636],[37.74416,-25.51617],[37.74417,-25.51617],[37.74418,-25.51615],[37.74418,-25.51615],[37.74421,-25.51613],[37.74421,-25.51612],[37.74428,-25.51597],[37.74435,-25.51588],[37.74438,-25.51584],[37.74442,-25.51579],[37.74447,-25.51574],[37.74451,-25.51568],[37.74457,-25.51563],[37.74462,-25.51558],[37.74474,-25.51552],[37.74485,-25.51545],[37.74490,-25.51541],[37.74494,-25.51536],[37.74499,-25.51533],[37.74503,-25.51528],[37.74508,-25.51525],[37.74513,-25.51520],[37.74521,-25.51514],[37.74530,-25.51508],[37.74537,-25.51501],[37.74543,-25.51497],[37.74550,-25.51490],[37.74558,-25.51482],[37.74559,-25.51464],[37.74558,-25.51449],[37.74562,-25.51437],[37.74563,-25.51434],[37.74563,-25.51434],[37.74562,-25.51429],[37.74563,-25.51419],[37.74567,-25.51404],[37.74565,-25.51376],[37.74569,-25.51367],[37.74574,-25.51358],[37.74584,-25.51356],[37.74592,-25.51353],[37.74602,-25.51348],[37.74607,-25.51348],[37.74614,-25.51347],[37.74620,-25.51346],[37.74627,-25.51342],[37.74633,-25.51339],[37.74638,-25.51335],[37.74643,-25.51327],[37.74651,-25.51328],[37.74659,-25.51329],[37.74668,-25.51328],[37.74672,-25.51329],[37.74678,-25.51324],[37.74685,-25.51318],[37.74693,-25.51312],[37.74702,-25.51312],[37.74710,-25.51303],[37.74723,-25.51294],[37.74729,-25.51290],[37.74734,-25.51284],[37.74748,-25.51270],[37.74748,-25.51269],[37.74749,-25.51269],[37.74757,-25.51263],[37.74764,-25.51258],[37.74767,-25.51256],[37.74769,-25.51254],[37.74770,-25.51253],[37.74771,-25.51252],[37.74773,-25.51251],[37.74783,-25.51244],[37.74791,-25.51246],[37.74797,-25.51244],[37.74804,-25.51242],[37.74804,-25.51229],[37.74802,-25.51224],[37.74803,-25.51221],[37.74814,-25.51218],[37.74817,-25.51212],[37.74818,-25.51208],[37.74826,-25.51209],[37.74832,-25.51201],[37.74839,-25.51195],[37.74845,-25.51189],[37.74853,-25.51182],[37.74856,-25.51176],[37.74859,-25.51172],[37.74868,-25.51165],[37.74872,-25.51158],[37.74878,-25.51150],[37.74885,-25.51147],[37.74891,-25.51137],[37.74889,-25.51134],[37.74888,-25.51137],[37.74888,-25.51139],[37.74887,-25.51146],[37.74885,-25.51147],[37.74883,-25.51148],[37.74881,-25.51149],[37.74878,-25.51150],[37.74875,-25.51156],[37.74867,-25.51165],[37.74859,-25.51171],[37.74857,-25.51176],[37.74852,-25.51182],[37.74845,-25.51190],[37.74839,-25.51196],[37.74832,-25.51201],[37.74826,-25.51210],[37.74823,-25.51214],[37.74817,-25.51220],[37.74807,-25.51227],[37.74798,-25.51231],[37.74785,-25.51227],[37.74788,-25.51227],[37.74776,-25.51220],[37.74768,-25.51217],[37.74756,-25.51219],[37.74755,-25.51220],[37.74753,-25.51222],[37.74752,-25.51223],[37.74751,-25.51224],[37.74748,-25.51227],[37.74743,-25.51231],[37.74743,-25.51231],[37.74741,-25.51232],[37.74738,-25.51235],[37.74738,-25.51235],[37.74733,-25.51239],[37.74728,-25.51244],[37.74726,-25.51246],[37.74714,-25.51256],[37.74714,-25.51257],[37.74713,-25.51257],[37.74699,-25.51269],[37.74696,-25.51272],[37.74691,-25.51276],[37.74686,-25.51281],[37.74673,-25.51292],[37.74673,-25.51292],[37.74661,-25.51299],[37.74653,-25.51303],[37.74644,-25.51308],[37.74642,-25.51309],[37.74641,-25.51310],[37.74632,-25.51315],[37.74632,-25.51315],[37.74630,-25.51316],[37.74629,-25.51317],[37.74617,-25.51324],[37.74610,-25.51327],[37.74592,-25.51338],[37.74589,-25.51340],[37.74585,-25.51342],[37.74584,-25.51343],[37.74576,-25.51366],[37.74569,-25.51383],[37.74566,-25.51390],[37.74566,-25.51391],[37.74565,-25.51394],[37.74562,-25.51401],[37.74560,-25.51405],[37.74556,-25.51417],[37.74553,-25.51424],[37.74552,-25.51431],[37.74547,-25.51441],[37.74539,-25.51446],[37.74535,-25.51451],[37.74530,-25.51458],[37.74519,-25.51467],[37.74514,-25.51478],[37.74510,-25.51487],[37.74504,-25.51497],[37.74498,-25.51501],[37.74491,-25.51510],[37.74481,-25.51522],[37.74475,-25.51527],[37.74470,-25.51534],[37.74463,-25.51541],[37.74460,-25.51546],[37.74456,-25.51553],[37.74447,-25.51558],[37.74439,-25.51563],[37.74436,-25.51564],[37.74433,-25.51566],[37.74427,-25.51574],[37.74424,-25.51582],[37.74422,-25.51589],[37.74421,-25.51590],[37.74415,-25.51599],[37.74408,-25.51607],[37.74400,-25.51612],[37.74390,-25.51616],[37.74381,-25.51622],[37.74378,-25.51628],[37.74376,-25.51630],[37.74374,-25.51632],[37.74371,-25.51637],[37.74365,-25.51644],[37.74358,-25.51647],[37.74348,-25.51649],[37.74339,-25.51656],[37.74331,-25.51658],[37.74321,-25.51665],[37.74317,-25.51667],[37.74313,-25.51669],[37.74313,-25.51669],[37.74307,-25.51674],[37.74293,-25.51681],[37.74300,-25.51677],[37.74296,-25.51679],[37.74288,-25.51694],[37.74289,-25.51696],[37.74289,-25.51697],[37.74291,-25.51721],[37.74291,-25.51725],[37.74292,-25.51733],[37.74295,-25.51769],[37.74295,-25.51776],[37.74295,-25.51780],[37.74296,-25.51781],[37.74296,-25.51782],[37.74296,-25.51783],[37.74296,-25.51788],[37.74296,-25.51792],[37.74297,-25.51793],[37.74296,-25.51794],[37.74296,-25.51800],[37.74295,-25.51801],[37.74294,-25.51809],[37.74293,-25.51820],[37.74294,-25.51825],[37.74294,-25.51830],[37.74294,-25.51835],[37.74294,-25.51842],[37.74297,-25.51846],[37.74299,-25.51851],[37.74303,-25.51859],[37.74304,-25.51866],[37.74304,-25.51873],[37.74306,-25.51881],[37.74297,-25.51890],[37.74292,-25.51895],[37.74284,-25.51902],[37.74282,-25.51909],[37.74280,-25.51915],[37.74277,-25.51924],[37.74278,-25.51926],[37.74288,-25.51939],[37.74306,-25.51963],[37.74315,-25.51971],[37.74320,-25.51978],[37.74324,-25.51983],[37.74320,-25.51986],[37.74315,-25.51993],[37.74310,-25.51998],[37.74307,-25.52007],[37.74306,-25.52015],[37.74303,-25.52026],[37.74302,-25.52035],[37.74301,-25.52044],[37.74293,-25.52052],[37.74295,-25.52055],[37.74298,-25.52061],[37.74298,-25.52066],[37.74297,-25.52073],[37.74296,-25.52081],[37.74303,-25.52100],[37.74311,-25.52117],[37.74317,-25.52132],[37.74317,-25.52140],[37.74317,-25.52151],[37.74317,-25.52157],[37.74315,-25.52167],[37.74313,-25.52174],[37.74309,-25.52183],[37.74306,-25.52190],[37.74307,-25.52196],[37.74307,-25.52199],[37.74308,-25.52203],[37.74305,-25.52205],[37.74298,-25.52211],[37.74291,-25.52218],[37.74286,-25.52224],[37.74282,-25.52236],[37.74280,-25.52241],[37.74278,-25.52244],[37.74277,-25.52249],[37.74275,-25.52253],[37.74274,-25.52258],[37.74272,-25.52266],[37.74269,-25.52277],[37.74266,-25.52294],[37.74266,-25.52310],[37.74266,-25.52324],[37.74266,-25.52324],[37.74267,-25.52340],[37.74266,-25.52343],[37.74265,-25.52353],[37.74264,-25.52359],[37.74264,-25.52363],[37.74263,-25.52366],[37.74255,-25.52399],[37.74254,-25.52406],[37.74249,-25.52428],[37.74247,-25.52437],[37.74242,-25.52459],[37.74238,-25.52474],[37.74236,-25.52483],[37.74236,-25.52483],[37.74236,-25.52483],[37.74235,-25.52492],[37.74234,-25.52495],[37.74234,-25.52496],[37.74230,-25.52523],[37.74228,-25.52536],[37.74226,-25.52549],[37.74220,-25.52571],[37.74213,-25.52602],[37.74209,-25.52620],[37.74204,-25.52638],[37.74201,-25.52640],[37.74196,-25.52642],[37.74177,-25.52651],[37.74174,-25.52653],[37.74164,-25.52658],[37.74160,-25.52660],[37.74157,-25.52662],[37.74136,-25.52676],[37.74134,-25.52678],[37.74130,-25.52681],[37.74119,-25.52688],[37.74114,-25.52692],[37.74110,-25.52694],[37.74104,-25.52705],[37.74101,-25.52710],[37.74098,-25.52715],[37.74092,-25.52726],[37.74089,-25.52735],[37.74080,-25.52751],[37.74074,-25.52762],[37.74066,-25.52779],[37.74058,-25.52794],[37.74055,-25.52799],[37.74053,-25.52804],[37.74050,-25.52810],[37.74045,-25.52819],[37.74039,-25.52832],[37.74037,-25.52836],[37.74034,-25.52842],[37.74028,-25.52858],[37.74025,-25.52862],[37.74019,-25.52870],[37.74003,-25.52894],[37.74002,-25.52896],[37.74000,-25.52898],[37.73996,-25.52904],[37.73983,-25.52923],[37.73977,-25.52933],[37.73976,-25.52935],[37.73974,-25.52938],[37.73969,-25.52947],[37.73968,-25.52948],[37.73949,-25.52981],[37.73947,-25.52983],[37.73942,-25.52992],[37.73939,-25.52996],[37.73936,-25.53002],[37.73929,-25.53009],[37.73906,-25.53037],[37.73903,-25.53040],[37.73903,-25.53040],[37.73903,-25.53041],[37.73898,-25.53052],[37.73892,-25.53102],[37.73892,-25.53112],[37.73891,-25.53118],[37.73891,-25.53126],[37.73889,-25.53148],[37.73882,-25.53221],[37.73879,-25.53230],[37.73867,-25.53247],[37.73865,-25.53249],[37.73837,-25.53286],[37.73821,-25.53308],[37.73815,-25.53316],[37.73809,-25.53323],[37.73804,-25.53330],[37.73796,-25.53340],[37.73794,-25.53342],[37.73791,-25.53346],[37.73790,-25.53347],[37.73785,-25.53353],[37.73782,-25.53358],[37.73780,-25.53360],[37.73778,-25.53362],[37.73777,-25.53364],[37.73776,-25.53365],[37.73766,-25.53377],[37.73765,-25.53379],[37.73765,-25.53379],[37.73752,-25.53395],[37.73748,-25.53400],[37.73746,-25.53404],[37.73736,-25.53423],[37.73732,-25.53428],[37.73729,-25.53435],[37.73725,-25.53442],[37.73723,-25.53445],[37.73708,-25.53473],[37.73733,-25.53473],[37.73738,-25.53473],[37.73752,-25.53471],[37.73759,-25.53470],[37.73770,-25.53468],[37.73780,-25.53467],[37.73795,-25.53466],[37.73806,-25.53469],[37.73823,-25.53467],[37.73824,-25.53467],[37.73825,-25.53467],[37.73827,-25.53467],[37.73830,-25.53467],[37.73846,-25.53466],[37.73858,-25.53468],[37.73863,-25.53469],[37.73868,-25.53469],[37.73881,-25.53470],[37.73888,-25.53471],[37.73894,-25.53471],[37.73903,-25.53470],[37.73913,-25.53469],[37.73928,-25.53467],[37.73939,-25.53466],[37.73948,-25.53465],[37.73952,-25.53464],[37.73958,-25.53463],[37.73963,-25.53462],[37.73969,-25.53461],[37.73980,-25.53459],[37.73984,-25.53459],[37.73985,-25.53459],[37.73992,-25.53459],[37.74008,-25.53458],[37.74011,-25.53458],[37.74026,-25.53458],[37.74044,-25.53458],[37.74044,-25.53458],[37.74053,-25.53460],[37.74070,-25.53462],[37.74083,-25.53463],[37.74090,-25.53462],[37.74090,-25.53462],[37.74096,-25.53460],[37.74096,-25.53460],[37.74099,-25.53460],[37.74102,-25.53460],[37.74108,-25.53461],[37.74122,-25.53455],[37.74124,-25.53454],[37.74128,-25.53453],[37.74146,-25.53447],[37.74160,-25.53442],[37.74174,-25.53438],[37.74179,-25.53437],[37.74184,-25.53436],[37.74190,-25.53436],[37.74199,-25.53436],[37.74211,-25.53440],[37.74227,-25.53443],[37.74232,-25.53444],[37.74247,-25.53446],[37.74261,-25.53447],[37.74264,-25.53448],[37.74267,-25.53448],[37.74268,-25.53448],[37.74270,-25.53449],[37.74274,-25.53450],[37.74280,-25.53452],[37.74281,-25.53452],[37.74294,-25.53452],[37.74297,-25.53453],[37.74305,-25.53455],[37.74313,-25.53458],[37.74319,-25.53459],[37.74327,-25.53461],[37.74360,-25.53474],[37.74361,-25.53475],[37.74364,-25.53478],[37.74364,-25.53478],[37.74368,-25.53482],[37.74371,-25.53486],[37.74374,-25.53490],[37.74377,-25.53493],[37.74379,-25.53497],[37.74384,-25.53502],[37.74386,-25.53505],[37.74386,-25.53505],[37.74389,-25.53509],[37.74392,-25.53512],[37.74394,-25.53515],[37.74397,-25.53518],[37.74400,-25.53521],[37.74405,-25.53525],[37.74407,-25.53526],[37.74409,-25.53528],[37.74413,-25.53531],[37.74413,-25.53531],[37.74413,-25.53531],[37.74417,-25.53534],[37.74420,-25.53535],[37.74424,-25.53538],[37.74428,-25.53540],[37.74434,-25.53544],[37.74438,-25.53547],[37.74446,-25.53552],[37.74456,-25.53559],[37.74461,-25.53563],[37.74474,-25.53572],[37.74493,-25.53585],[37.74501,-25.53591],[37.74514,-25.53601],[37.74520,-25.53606],[37.74529,-25.53613],[37.74533,-25.53617],[37.74542,-25.53625],[37.74544,-25.53630],[37.74549,-25.53634],[37.74549,-25.53639],[37.74554,-25.53641],[37.74557,-25.53648],[37.74561,-25.53657],[37.74564,-25.53670],[37.74569,-25.53690],[37.74572,-25.53700],[37.74574,-25.53710],[37.74590,-25.53725],[37.74593,-25.53728],[37.74609,-25.53736],[37.74624,-25.53731],[37.74629,-25.53728],[37.74629,-25.53728]];
const PROFILE_PRC37_SMI=[[0.000,246],[0.029,249],[0.048,251],[0.060,251],[0.097,249],[0.147,245],[0.178,242],[0.180,242],[0.222,236],[0.237,234],[0.261,233],[0.288,234],[0.295,234],[0.303,233],[0.304,233],[0.320,230],[0.330,228],[0.337,227],[0.345,226],[0.352,225],[0.358,225],[0.363,226],[0.368,227],[0.374,228],[0.383,230],[0.396,232],[0.411,234],[0.426,237],[0.436,239],[0.450,241],[0.463,244],[0.476,246],[0.495,249],[0.513,252],[0.532,256],[0.532,256],[0.551,259],[0.561,261],[0.573,264],[0.586,267],[0.600,270],[0.611,272],[0.623,275],[0.638,278],[0.655,281],[0.656,281],[0.677,285],[0.695,288],[0.710,290],[0.721,291],[0.732,292],[0.742,293],[0.750,294],[0.756,294],[0.761,295],[0.766,296],[0.778,298],[0.789,300],[0.790,300],[0.803,302],[0.811,304],[0.819,305],[0.836,309],[0.849,312],[0.860,314],[0.875,315],[0.884,316],[0.890,317],[0.906,318],[0.921,319],[0.938,320],[0.954,322],[0.967,324],[0.981,325],[0.989,326],[1.014,328],[1.032,329],[1.055,330],[1.079,332],[1.093,332],[1.117,332],[1.143,332],[1.183,332],[1.210,333],[1.217,333],[1.220,333],[1.224,333],[1.232,334],[1.241,334],[1.245,334],[1.255,335],[1.259,335],[1.263,336],[1.267,336],[1.271,336],[1.278,337],[1.280,337],[1.287,338],[1.294,338],[1.305,339],[1.317,340],[1.340,342],[1.354,343],[1.356,343],[1.358,344],[1.375,345],[1.392,346],[1.394,346],[1.404,347],[1.414,347],[1.419,347],[1.434,348],[1.440,348],[1.449,348],[1.467,349],[1.482,349],[1.482,349],[1.482,349],[1.507,350],[1.522,350],[1.530,350],[1.541,351],[1.543,351],[1.553,351],[1.572,352],[1.573,352],[1.591,354],[1.607,355],[1.615,356],[1.623,356],[1.629,357],[1.635,357],[1.642,358],[1.651,359],[1.653,359],[1.665,360],[1.671,360],[1.677,360],[1.683,361],[1.702,362],[1.714,364],[1.723,366],[1.740,370],[1.762,374],[1.765,375],[1.768,375],[1.770,376],[1.772,376],[1.792,380],[1.800,381],[1.809,382],[1.829,385],[1.833,386],[1.834,386],[1.835,386],[1.837,387],[1.838,387],[1.842,387],[1.854,389],[1.863,391],[1.886,393],[1.888,393],[1.889,393],[1.889,393],[1.891,393],[1.892,393],[1.892,394],[1.895,394],[1.898,394],[1.903,395],[1.905,395],[1.930,397],[1.938,397],[1.942,397],[1.959,398],[1.960,398],[1.960,398],[1.960,398],[1.961,398],[1.962,398],[1.963,398],[1.967,398],[1.979,399],[2.003,399],[2.010,399],[2.027,398],[2.036,398],[2.052,398],[2.062,398],[2.072,398],[2.083,397],[2.092,397],[2.100,396],[2.114,397],[2.133,399],[2.139,399],[2.148,399],[2.173,399],[2.188,400],[2.197,400],[2.204,400],[2.221,400],[2.236,400],[2.246,399],[2.254,400],[2.258,400],[2.272,401],[2.281,401],[2.289,401],[2.318,401],[2.336,401],[2.344,401],[2.361,399],[2.366,398],[2.367,398],[2.367,398],[2.367,398],[2.396,393],[2.411,391],[2.423,390],[2.471,385],[2.472,384],[2.481,383],[2.485,383],[2.486,383],[2.488,383],[2.497,382],[2.574,374],[2.574,374],[2.587,373],[2.602,372],[2.610,372],[2.645,373],[2.672,372],[2.678,371],[2.683,371],[2.688,371],[2.695,370],[2.702,370],[2.709,370],[2.715,370],[2.721,369],[2.728,369],[2.738,369],[2.746,368],[2.753,368],[2.760,367],[2.772,367],[2.784,367],[2.789,366],[2.799,366],[2.810,366],[2.821,366],[2.838,366],[2.842,366],[2.846,366],[2.846,366],[2.852,366],[2.857,366],[2.862,366],[2.868,367],[2.868,367],[2.868,367],[2.893,367],[2.894,367],[2.896,368],[2.896,368],[2.899,368],[2.900,368],[2.915,369],[2.926,371],[2.932,370],[2.938,371],[2.945,372],[2.952,373],[2.960,373],[2.967,374],[2.981,374],[2.995,375],[3.002,375],[3.007,374],[3.014,374],[3.021,374],[3.026,375],[3.033,375],[3.043,375],[3.056,376],[3.065,376],[3.073,377],[3.083,378],[3.094,379],[3.110,379],[3.123,378],[3.135,377],[3.137,377],[3.138,377],[3.142,377],[3.151,376],[3.165,375],[3.190,373],[3.199,373],[3.209,372],[3.221,371],[3.229,372],[3.241,374],[3.247,375],[3.254,376],[3.261,377],[3.269,378],[3.277,379],[3.284,380],[3.293,381],[3.302,382],[3.312,383],[3.321,385],[3.326,385],[3.333,386],[3.343,387],[3.354,388],[3.363,389],[3.376,390],[3.392,391],[3.399,391],[3.407,391],[3.427,392],[3.427,392],[3.428,392],[3.439,392],[3.448,392],[3.451,392],[3.454,392],[3.456,392],[3.457,392],[3.459,392],[3.472,394],[3.481,394],[3.488,395],[3.496,396],[3.508,398],[3.513,399],[3.515,399],[3.527,400],[3.533,401],[3.537,402],[3.545,403],[3.555,404],[3.565,406],[3.573,407],[3.584,409],[3.590,411],[3.595,411],[3.607,413],[3.615,415],[3.624,417],[3.633,419],[3.643,421],[3.647,422],[3.650,421],[3.651,421],[3.657,419],[3.659,419],[3.662,418],[3.664,418],[3.667,417],[3.674,416],[3.685,413],[3.696,411],[3.701,411],[3.708,409],[3.719,407],[3.727,406],[3.736,404],[3.747,402],[3.752,402],[3.760,400],[3.772,399],[3.783,397],[3.798,397],[3.801,397],[3.815,398],[3.824,398],[3.837,397],[3.839,397],[3.842,396],[3.844,396],[3.845,396],[3.849,395],[3.855,394],[3.856,394],[3.858,394],[3.862,393],[3.863,393],[3.869,392],[3.875,391],[3.878,390],[3.895,389],[3.895,389],[3.896,389],[3.915,388],[3.919,388],[3.925,388],[3.932,387],[3.949,386],[3.950,386],[3.965,385],[3.974,383],[3.985,382],[3.987,382],[3.989,381],[4.000,380],[4.000,380],[4.002,379],[4.004,379],[4.018,377],[4.026,375],[4.048,371],[4.053,371],[4.057,370],[4.059,370],[4.081,372],[4.098,373],[4.105,374],[4.106,374],[4.109,375],[4.116,375],[4.119,375],[4.131,377],[4.138,377],[4.144,377],[4.154,377],[4.164,377],[4.171,377],[4.179,377],[4.193,375],[4.205,374],[4.213,373],[4.225,371],[4.232,370],[4.244,371],[4.258,372],[4.266,373],[4.274,373],[4.284,373],[4.290,373],[4.297,373],[4.308,372],[4.318,371],[4.322,370],[4.326,370],[4.335,369],[4.342,368],[4.349,368],[4.350,367],[4.361,367],[4.372,367],[4.381,366],[4.394,365],[4.405,365],[4.411,365],[4.414,365],[4.417,365],[4.422,364],[4.431,364],[4.439,364],[4.450,363],[4.462,362],[4.472,361],[4.484,361],[4.489,361],[4.494,361],[4.494,361],[4.502,361],[4.518,360],[4.527,360],[4.533,360],[4.547,361],[4.549,361],[4.550,361],[4.572,362],[4.575,362],[4.582,363],[4.614,364],[4.620,364],[4.624,364],[4.625,364],[4.625,364],[4.626,364],[4.631,364],[4.635,364],[4.635,364],[4.636,364],[4.641,364],[4.643,364],[4.650,364],[4.659,364],[4.664,363],[4.669,363],[4.673,363],[4.679,363],[4.684,363],[4.690,363],[4.697,362],[4.704,362],[4.710,362],[4.718,362],[4.731,361],[4.737,361],[4.748,360],[4.755,360],[4.760,359],[4.769,358],[4.772,358],[4.788,358],[4.816,357],[4.828,357],[4.838,356],[4.843,356],[4.849,355],[4.856,355],[4.864,354],[4.872,354],[4.879,354],[4.889,354],[4.897,353],[4.905,353],[4.916,353],[4.920,353],[4.925,353],[4.930,353],[4.936,352],[4.944,352],[4.962,352],[4.979,352],[4.994,352],[5.002,352],[5.011,352],[5.017,352],[5.025,352],[5.032,351],[5.041,351],[5.048,351],[5.053,351],[5.056,351],[5.060,351],[5.064,351],[5.073,350],[5.083,349],[5.090,348],[5.102,347],[5.107,346],[5.111,346],[5.115,345],[5.119,344],[5.124,344],[5.131,343],[5.141,341],[5.156,340],[5.171,338],[5.183,337],[5.183,337],[5.197,336],[5.200,336],[5.209,334],[5.214,334],[5.217,333],[5.220,333],[5.251,329],[5.257,328],[5.278,325],[5.286,323],[5.306,319],[5.320,317],[5.327,316],[5.328,316],[5.328,316],[5.335,315],[5.338,314],[5.339,314],[5.363,311],[5.375,310],[5.387,309],[5.408,307],[5.435,304],[5.452,303],[5.469,301],[5.473,301],[5.479,301],[5.500,300],[5.504,300],[5.517,299],[5.522,299],[5.525,299],[5.551,297],[5.554,297],[5.559,296],[5.574,295],[5.580,295],[5.584,295],[5.597,293],[5.602,293],[5.607,292],[5.619,291],[5.627,290],[5.644,289],[5.656,287],[5.673,286],[5.689,285],[5.695,284],[5.700,284],[5.706,283],[5.716,282],[5.729,281],[5.734,281],[5.740,280],[5.756,279],[5.760,279],[5.769,278],[5.797,276],[5.799,276],[5.801,276],[5.809,275],[5.831,272],[5.842,271],[5.844,271],[5.848,270],[5.858,269],[5.858,269],[5.894,267],[5.898,265],[5.906,265],[5.912,265],[5.918,264],[5.927,263],[5.963,260],[5.967,260],[5.968,260],[5.968,260],[5.980,259],[6.024,254],[6.033,253],[6.038,252],[6.045,252],[6.064,250],[6.129,244],[6.138,244],[6.158,243],[6.161,243],[6.206,239],[6.232,237],[6.242,236],[6.251,236],[6.258,235],[6.272,235],[6.274,234],[6.279,234],[6.280,234],[6.288,234],[6.294,233],[6.296,233],[6.299,233],[6.302,233],[6.302,233],[6.318,232],[6.320,232],[6.321,232],[6.340,231],[6.346,230],[6.351,230],[6.371,227],[6.377,227],[6.384,226],[6.391,225],[6.395,224],[6.425,221],[6.453,221],[6.459,222],[6.475,222],[6.482,222],[6.495,222],[6.506,222],[6.523,222],[6.535,221],[6.554,221],[6.555,221],[6.557,221],[6.559,221],[6.562,221],[6.579,222],[6.593,222],[6.598,222],[6.604,222],[6.619,223],[6.627,223],[6.634,223],[6.644,223],[6.655,224],[6.672,225],[6.684,225],[6.694,225],[6.699,226],[6.705,226],[6.710,226],[6.717,226],[6.730,227],[6.734,227],[6.735,227],[6.743,227],[6.761,228],[6.764,228],[6.781,228],[6.801,228],[6.801,228],[6.811,228],[6.830,228],[6.844,228],[6.852,229],[6.852,229],[6.859,229],[6.859,229],[6.862,229],[6.866,229],[6.872,229],[6.889,230],[6.891,230],[6.896,230],[6.916,231],[6.933,232],[6.949,232],[6.954,232],[6.959,232],[6.967,232],[6.976,232],[6.991,232],[7.009,231],[7.014,231],[7.030,231],[7.046,231],[7.049,232],[7.053,232],[7.054,232],[7.057,232],[7.061,232],[7.068,232],[7.068,232],[7.083,233],[7.087,234],[7.096,234],[7.105,234],[7.112,235],[7.121,235],[7.160,236],[7.160,236],[7.165,236],[7.165,236],[7.170,236],[7.176,235],[7.181,235],[7.185,235],[7.189,235],[7.196,235],[7.199,235],[7.199,235],[7.204,235],[7.208,235],[7.212,235],[7.216,235],[7.220,235],[7.227,235],[7.229,235],[7.232,235],[7.238,235],[7.238,235],[7.238,235],[7.243,235],[7.246,235],[7.251,235],[7.255,236],[7.263,236],[7.268,236],[7.278,237],[7.291,237],[7.297,237],[7.314,238],[7.337,238],[7.348,238],[7.366,238],[7.373,238],[7.385,238],[7.391,238],[7.403,239],[7.408,239],[7.414,239],[7.418,238],[7.424,239],[7.431,239],[7.440,239],[7.452,239],[7.470,239],[7.479,239],[7.489,239],[7.511,242],[7.515,242],[7.534,244],[7.551,246],[7.558,246],[7.558,246]];

const TRACK_PRC05_MOD = [[37.83173,-25.75291],[37.83183,-25.75275],[37.83192,-25.75274],[37.83196,-25.75267],[37.83197,-25.75265],[37.83198,-25.75260],[37.83197,-25.75256],[37.83174,-25.75224],[37.83187,-25.75213],[37.83202,-25.75204],[37.83213,-25.75201],[37.83230,-25.75198],[37.83256,-25.75196],[37.83362,-25.75190],[37.83377,-25.75192],[37.83384,-25.75196],[37.83393,-25.75205],[37.83403,-25.75213],[37.83413,-25.75219],[37.83419,-25.75219],[37.83449,-25.75234],[37.83477,-25.75248],[37.83504,-25.75262],[37.83537,-25.75283],[37.83599,-25.75333],[37.83622,-25.75342],[37.83669,-25.75354],[37.83700,-25.75385],[37.83700,-25.75385],[37.83700,-25.75385],[37.83702,-25.75401],[37.83712,-25.75425],[37.83718,-25.75464],[37.83731,-25.75483],[37.83742,-25.75501],[37.83751,-25.75514],[37.83762,-25.75524],[37.83769,-25.75541],[37.83784,-25.75564],[37.83816,-25.75582],[37.83819,-25.75600],[37.83830,-25.75611],[37.83830,-25.75612],[37.83830,-25.75611],[37.83833,-25.75614],[37.83836,-25.75603],[37.83849,-25.75609],[37.83846,-25.75620],[37.83870,-25.75638],[37.83874,-25.75623],[37.83885,-25.75651],[37.83909,-25.75647],[37.83919,-25.75651],[37.83923,-25.75666],[37.83920,-25.75700],[37.83929,-25.75717],[37.83950,-25.75729],[37.83964,-25.75726],[37.83988,-25.75722],[37.84008,-25.75730],[37.84038,-25.75752],[37.84023,-25.75768],[37.84031,-25.75773],[37.84046,-25.75802],[37.84067,-25.75797],[37.84094,-25.75816],[37.84120,-25.75835],[37.84143,-25.75850],[37.84149,-25.75865],[37.84159,-25.75879],[37.84164,-25.75892],[37.84185,-25.75921],[37.84191,-25.75926],[37.84195,-25.75931],[37.84202,-25.75934],[37.84204,-25.75932],[37.84202,-25.75934],[37.84207,-25.75943],[37.84226,-25.75969],[37.84251,-25.76018],[37.84252,-25.76041],[37.84250,-25.76049],[37.84246,-25.76055],[37.84237,-25.76062],[37.84246,-25.76063],[37.84262,-25.76064],[37.84265,-25.76090],[37.84267,-25.76114],[37.84265,-25.76130],[37.84258,-25.76162],[37.84257,-25.76202],[37.84255,-25.76218],[37.84248,-25.76235],[37.84247,-25.76262],[37.84254,-25.76281],[37.84256,-25.76300],[37.84272,-25.76327],[37.84284,-25.76350],[37.84293,-25.76361],[37.84284,-25.76350],[37.84272,-25.76327],[37.84256,-25.76300],[37.84254,-25.76281],[37.84247,-25.76262],[37.84248,-25.76235],[37.84255,-25.76218],[37.84257,-25.76202],[37.84258,-25.76162],[37.84265,-25.76130],[37.84267,-25.76114],[37.84265,-25.76090],[37.84260,-25.76085],[37.84251,-25.76076],[37.84244,-25.76072],[37.84225,-25.76066],[37.84220,-25.76062],[37.84222,-25.76062],[37.84155,-25.76058],[37.84061,-25.76039],[37.84004,-25.76018],[37.83984,-25.76014],[37.83985,-25.76012],[37.83984,-25.76014],[37.83959,-25.76003],[37.83911,-25.75967],[37.83888,-25.75949],[37.83866,-25.75931],[37.83840,-25.75908],[37.83819,-25.75893],[37.83797,-25.75879],[37.83739,-25.75831],[37.83723,-25.75821],[37.83707,-25.75820],[37.83688,-25.75829],[37.83671,-25.75838],[37.83669,-25.75839],[37.83665,-25.75843],[37.83658,-25.75850],[37.83650,-25.75851],[37.83649,-25.75859],[37.83660,-25.75870],[37.83661,-25.75874],[37.83662,-25.75878],[37.83661,-25.75885],[37.83643,-25.75915],[37.83661,-25.75885],[37.83662,-25.75878],[37.83629,-25.75863],[37.83589,-25.75856],[37.83584,-25.75855],[37.83575,-25.75848],[37.83562,-25.75840],[37.83554,-25.75831],[37.83552,-25.75832],[37.83530,-25.75844],[37.83503,-25.75860],[37.83496,-25.75864],[37.83497,-25.75871],[37.83487,-25.75872],[37.83482,-25.75869],[37.83477,-25.75866],[37.83465,-25.75852],[37.83460,-25.75851],[37.83450,-25.75848],[37.83429,-25.75848],[37.83407,-25.75848],[37.83397,-25.75852],[37.83378,-25.75878],[37.83368,-25.75887],[37.83348,-25.75887],[37.83344,-25.75886],[37.83336,-25.75882],[37.83329,-25.75875],[37.83283,-25.75840],[37.83232,-25.75829],[37.83203,-25.75795],[37.83197,-25.75774],[37.83197,-25.75773],[37.83197,-25.75755],[37.83202,-25.75739],[37.83202,-25.75730],[37.83179,-25.75705],[37.83161,-25.75678],[37.83150,-25.75647],[37.83142,-25.75620],[37.83146,-25.75603],[37.83158,-25.75601],[37.83167,-25.75601],[37.83160,-25.75597],[37.83156,-25.75594],[37.83139,-25.75565],[37.83136,-25.75560],[37.83120,-25.75532],[37.83113,-25.75515],[37.83109,-25.75509],[37.83107,-25.75506],[37.83104,-25.75521],[37.83102,-25.75524],[37.83100,-25.75527],[37.83096,-25.75528],[37.83092,-25.75527],[37.83082,-25.75538],[37.83076,-25.75542],[37.83064,-25.75543],[37.83030,-25.75526],[37.83023,-25.75521],[37.83013,-25.75510],[37.83004,-25.75503],[37.82982,-25.75491],[37.82979,-25.75491],[37.82974,-25.75493],[37.82973,-25.75496],[37.82968,-25.75519],[37.82964,-25.75531],[37.82961,-25.75535],[37.82954,-25.75544],[37.82941,-25.75563],[37.82939,-25.75565],[37.82936,-25.75567],[37.82882,-25.75573],[37.82848,-25.75570],[37.82846,-25.75569],[37.82789,-25.75525],[37.82768,-25.75510],[37.82740,-25.75489],[37.82725,-25.75474],[37.82718,-25.75460],[37.82715,-25.75455],[37.82713,-25.75454],[37.82700,-25.75452],[37.82688,-25.75451],[37.82683,-25.75450],[37.82677,-25.75447],[37.82665,-25.75440],[37.82644,-25.75415],[37.82640,-25.75402],[37.82636,-25.75394],[37.82632,-25.75388],[37.82621,-25.75377],[37.82632,-25.75388],[37.82636,-25.75394],[37.82640,-25.75402],[37.82644,-25.75415],[37.82648,-25.75467],[37.82649,-25.75483],[37.82648,-25.75489],[37.82644,-25.75496],[37.82636,-25.75501],[37.82629,-25.75504],[37.82623,-25.75505],[37.82576,-25.75492],[37.82573,-25.75493],[37.82570,-25.75499],[37.82541,-25.75531],[37.82536,-25.75536],[37.82506,-25.75521],[37.82479,-25.75503],[37.82454,-25.75468],[37.82442,-25.75423],[37.82441,-25.75405],[37.82437,-25.75383],[37.82406,-25.75331],[37.82404,-25.75328],[37.82402,-25.75314],[37.82399,-25.75306],[37.82373,-25.75265],[37.82335,-25.75220],[37.82326,-25.75209],[37.82307,-25.75175],[37.82308,-25.75173],[37.82342,-25.75121],[37.82352,-25.75116],[37.82391,-25.75115],[37.82404,-25.75112],[37.82423,-25.75094],[37.82449,-25.75053],[37.82469,-25.75005],[37.82474,-25.74998],[37.82489,-25.74984],[37.82496,-25.74981],[37.82531,-25.74972],[37.82567,-25.74977],[37.82589,-25.74997],[37.82612,-25.75017],[37.82619,-25.75027],[37.82623,-25.75032],[37.82635,-25.75035],[37.82649,-25.75033],[37.82660,-25.75028],[37.82667,-25.75021],[37.82672,-25.75013],[37.82669,-25.75009],[37.82672,-25.75013],[37.82702,-25.75010],[37.82731,-25.75005],[37.82752,-25.74999],[37.82769,-25.74988],[37.82782,-25.74973],[37.82798,-25.74948],[37.82823,-25.74894],[37.82827,-25.74873],[37.82831,-25.74846],[37.82829,-25.74827],[37.82820,-25.74795],[37.82809,-25.74763],[37.82797,-25.74735],[37.82783,-25.74714],[37.82769,-25.74701],[37.82756,-25.74691],[37.82732,-25.74682],[37.82709,-25.74675],[37.82685,-25.74668],[37.82660,-25.74655],[37.82659,-25.74655],[37.82659,-25.74655],[37.82685,-25.74668],[37.82709,-25.74675],[37.82732,-25.74682],[37.82756,-25.74691],[37.82769,-25.74701],[37.82783,-25.74714],[37.82797,-25.74735],[37.82809,-25.74763],[37.82820,-25.74795],[37.82829,-25.74827],[37.82831,-25.74846],[37.82827,-25.74873],[37.82823,-25.74894],[37.82798,-25.74948],[37.82782,-25.74973],[37.82769,-25.74988],[37.82752,-25.74999],[37.82731,-25.75005],[37.82702,-25.75010],[37.82672,-25.75013],[37.82667,-25.75021],[37.82660,-25.75028],[37.82649,-25.75033],[37.82635,-25.75035],[37.82623,-25.75032],[37.82627,-25.75050],[37.82643,-25.75059],[37.82654,-25.75070],[37.82664,-25.75072],[37.82682,-25.75081],[37.82689,-25.75083],[37.82728,-25.75106],[37.82780,-25.75138],[37.82805,-25.75155],[37.82854,-25.75189],[37.82879,-25.75205],[37.82912,-25.75246],[37.82923,-25.75271],[37.82974,-25.75342],[37.82999,-25.75371],[37.83022,-25.75403],[37.83046,-25.75432],[37.83075,-25.75452],[37.83085,-25.75470],[37.83095,-25.75485],[37.83107,-25.75506],[37.83113,-25.75515],[37.83120,-25.75532],[37.83136,-25.75560],[37.83139,-25.75565],[37.83148,-25.75547],[37.83151,-25.75533],[37.83155,-25.75511],[37.83167,-25.75485],[37.83176,-25.75474],[37.83179,-25.75458],[37.83194,-25.75442],[37.83204,-25.75425],[37.83217,-25.75396],[37.83206,-25.75380],[37.83207,-25.75374],[37.83214,-25.75368],[37.83214,-25.75368],[37.83205,-25.75358],[37.83188,-25.75329],[37.83179,-25.75314],[37.83168,-25.75300],[37.83173,-25.75291]];
const PROFILE_PRC05_MOD = [[0.000,739],[0.018,734],[0.028,733],[0.036,731],[0.039,731],[0.042,731],[0.046,731],[0.084,728],[0.101,725],[0.119,721],[0.132,720],[0.151,718],[0.180,717],[0.298,720],[0.315,719],[0.324,718],[0.336,719],[0.349,720],[0.361,722],[0.369,725],[0.404,735],[0.437,740],[0.470,741],[0.511,742],[0.592,746],[0.620,748],[0.673,754],[0.717,755],[0.717,755],[0.718,755],[0.732,752],[0.756,751],[0.791,747],[0.813,748],[0.833,750],[0.848,751],[0.863,753],[0.880,753],[0.906,754],[0.945,759],[0.961,759],[0.977,759],[0.977,759],[0.978,759],[0.982,758],[0.992,758],[1.007,757],[1.018,758],[1.049,759],[1.063,756],[1.091,759],[1.117,755],[1.129,755],[1.143,757],[1.173,760],[1.191,762],[1.217,764],[1.233,763],[1.259,761],[1.283,760],[1.322,761],[1.343,763],[1.353,763],[1.383,765],[1.407,765],[1.441,767],[1.475,768],[1.503,766],[1.517,767],[1.534,767],[1.547,767],[1.581,767],[1.589,767],[1.596,767],[1.604,766],[1.607,765],[1.611,766],[1.620,767],[1.651,768],[1.702,770],[1.722,773],[1.730,775],[1.737,776],[1.749,779],[1.759,776],[1.777,772],[1.800,775],[1.821,775],[1.835,777],[1.865,785],[1.900,788],[1.915,790],[1.931,795],[1.955,795],[1.973,790],[1.990,788],[2.019,784],[2.044,781],[2.058,775],[2.072,781],[2.096,784],[2.125,788],[2.142,790],[2.160,795],[2.184,795],[2.201,790],[2.216,788],[2.250,785],[2.280,777],[2.294,775],[2.316,775],[2.323,777],[2.335,779],[2.344,780],[2.365,780],[2.372,778],[2.374,779],[2.450,778],[2.555,776],[2.622,773],[2.643,776],[2.645,776],[2.647,776],[2.677,778],[2.739,771],[2.770,771],[2.798,773],[2.833,769],[2.860,765],[2.887,765],[2.965,762],[2.984,763],[3.002,764],[3.025,764],[3.045,762],[3.048,762],[3.054,761],[3.064,758],[3.072,757],[3.080,755],[3.095,754],[3.098,754],[3.102,753],[3.108,751],[3.141,746],[3.174,751],[3.180,753],[3.219,752],[3.264,754],[3.270,755],[3.281,758],[3.297,762],[3.309,762],[3.312,762],[3.338,766],[3.372,765],[3.381,765],[3.387,765],[3.399,764],[3.405,763],[3.411,763],[3.429,763],[3.435,763],[3.446,764],[3.470,764],[3.494,767],[3.506,769],[3.537,772],[3.551,773],[3.572,775],[3.577,776],[3.586,776],[3.597,777],[3.656,781],[3.714,784],[3.757,788],[3.777,789],[3.778,789],[3.794,790],[3.809,792],[3.817,792],[3.851,792],[3.882,792],[3.912,794],[3.937,797],[3.952,799],[3.966,799],[3.976,799],[3.985,799],[3.990,800],[4.021,804],[4.028,806],[4.058,815],[4.075,819],[4.082,821],[4.085,822],[4.098,823],[4.101,824],[4.104,824],[4.109,825],[4.114,827],[4.128,828],[4.136,829],[4.149,830],[4.190,840],[4.199,843],[4.214,848],[4.225,851],[4.253,857],[4.255,858],[4.261,858],[4.264,857],[4.285,853],[4.296,851],[4.300,851],[4.312,849],[4.334,846],[4.337,845],[4.341,845],[4.401,836],[4.439,835],[4.441,834],[4.516,841],[4.543,843],[4.579,849],[4.600,855],[4.615,859],[4.620,860],[4.623,861],[4.637,860],[4.650,858],[4.656,858],[4.664,857],[4.678,854],[4.710,851],[4.722,850],[4.730,848],[4.737,847],[4.754,845],[4.770,847],[4.777,848],[4.785,850],[4.798,851],[4.844,846],[4.858,842],[4.863,841],[4.870,838],[4.880,835],[4.888,833],[4.894,831],[4.948,821],[4.952,820],[4.958,818],[5.000,806],[5.008,804],[5.044,801],[5.078,797],[5.119,790],[5.161,788],[5.177,788],[5.197,787],[5.254,786],[5.257,785],[5.270,785],[5.278,784],[5.324,779],[5.382,773],[5.396,773],[5.432,774],[5.435,774],[5.494,776],[5.506,775],[5.549,772],[5.564,772],[5.591,773],[5.637,779],[5.685,785],[5.693,785],[5.714,786],[5.722,786],[5.762,785],[5.802,784],[5.833,779],[5.863,777],[5.876,777],[5.881,777],[5.895,777],[5.910,776],[5.924,776],[5.933,775],[5.942,775],[5.946,775],[5.951,775],[5.984,772],[6.018,772],[6.041,772],[6.062,773],[6.082,775],[6.110,779],[6.165,784],[6.184,786],[6.208,790],[6.225,793],[6.255,798],[6.285,803],[6.313,805],[6.337,808],[6.357,809],[6.374,810],[6.402,814],[6.428,816],[6.455,816],[6.486,813],[6.487,813],[6.487,813],[6.519,816],[6.545,816],[6.572,814],[6.600,810],[6.617,809],[6.636,808],[6.660,805],[6.689,803],[6.718,798],[6.749,793],[6.765,790],[6.790,786],[6.809,784],[6.863,779],[6.892,775],[6.911,773],[6.933,772],[6.956,772],[6.989,772],[7.023,775],[7.032,775],[7.041,776],[7.055,776],[7.070,777],[7.084,777],[7.101,775],[7.120,775],[7.135,776],[7.147,777],[7.168,779],[7.177,779],[7.225,785],[7.288,792],[7.320,791],[7.382,795],[7.413,805],[7.465,811],[7.490,815],[7.574,819],[7.612,820],[7.650,824],[7.686,828],[7.723,827],[7.743,826],[7.760,825],[7.783,822],[7.793,819],[7.810,815],[7.840,806],[7.846,804],[7.866,803],[7.878,802],[7.898,800],[7.925,793],[7.938,788],[7.952,783],[7.974,773],[7.992,766],[8.021,753],[8.040,750],[8.045,748],[8.055,744],[8.055,744],[8.068,744],[8.100,742],[8.116,741],[8.134,741],[8.143,739]];
const TRACK_GROTA_INFERNO = [[37.83495,-25.75928],[37.83498,-25.75892],[37.83497,-25.75871],[37.83496,-25.75864],[37.83498,-25.75863],[37.83530,-25.75844],[37.83554,-25.75831],[37.83562,-25.75840],[37.83575,-25.75848],[37.83582,-25.75854],[37.83588,-25.75856],[37.83629,-25.75863],[37.83660,-25.75877],[37.83662,-25.75878],[37.83661,-25.75874],[37.83660,-25.75870],[37.83649,-25.75859],[37.83650,-25.75851],[37.83658,-25.75850],[37.83665,-25.75843],[37.83669,-25.75839],[37.83688,-25.75829],[37.83707,-25.75820],[37.83723,-25.75821],[37.83733,-25.75827],[37.83739,-25.75831],[37.83797,-25.75879],[37.83819,-25.75893],[37.83840,-25.75908],[37.83866,-25.75931],[37.83888,-25.75949],[37.83911,-25.75967],[37.83959,-25.76003],[37.83984,-25.76014],[37.84004,-25.76018],[37.84061,-25.76039],[37.84155,-25.76058],[37.84220,-25.76062],[37.84225,-25.76066],[37.84227,-25.76067],[37.84244,-25.76072],[37.84251,-25.76076],[37.84260,-25.76085],[37.84265,-25.76090],[37.84267,-25.76114],[37.84265,-25.76130],[37.84258,-25.76162],[37.84257,-25.76202],[37.84255,-25.76218],[37.84248,-25.76235],[37.84247,-25.76262],[37.84254,-25.76281],[37.84256,-25.76300],[37.84272,-25.76327],[37.84284,-25.76350],[37.84291,-25.76360],[37.84284,-25.76350],[37.84272,-25.76327],[37.84256,-25.76300],[37.84254,-25.76281],[37.84247,-25.76262],[37.84248,-25.76235],[37.84255,-25.76218],[37.84257,-25.76202],[37.84258,-25.76162],[37.84265,-25.76130],[37.84267,-25.76114],[37.84265,-25.76090],[37.84261,-25.76064],[37.84237,-25.76062],[37.84230,-25.76063],[37.84220,-25.76062],[37.84155,-25.76058],[37.84061,-25.76039],[37.84004,-25.76018],[37.83984,-25.76014],[37.83959,-25.76003],[37.83911,-25.75967],[37.83888,-25.75949],[37.83866,-25.75931],[37.83840,-25.75908],[37.83843,-25.75861],[37.83841,-25.75848],[37.83837,-25.75839],[37.83832,-25.75832],[37.83817,-25.75826],[37.83795,-25.75816],[37.83790,-25.75811],[37.83786,-25.75803],[37.83776,-25.75769],[37.83772,-25.75749],[37.83767,-25.75736],[37.83762,-25.75732],[37.83753,-25.75731],[37.83722,-25.75740],[37.83677,-25.75765],[37.83627,-25.75792],[37.83579,-25.75818],[37.83554,-25.75831],[37.83530,-25.75844],[37.83496,-25.75864],[37.83497,-25.75871],[37.83498,-25.75892],[37.83495,-25.75928]];
const PROFILE_GROTA_INFERNO = [[0.000,766],[0.032,767],[0.050,765],[0.057,765],[0.060,765],[0.099,766],[0.128,762],[0.141,762],[0.157,758],[0.166,755],[0.173,754],[0.218,752],[0.255,753],[0.258,753],[0.262,754],[0.265,754],[0.280,755],[0.288,757],[0.296,758],[0.306,761],[0.312,762],[0.335,764],[0.357,764],[0.376,763],[0.387,763],[0.395,762],[0.473,765],[0.500,765],[0.527,769],[0.562,773],[0.590,771],[0.621,771],[0.682,778],[0.713,776],[0.734,773],[0.801,776],[0.906,778],[0.979,778],[0.986,780],[0.988,780],[1.008,780],[1.016,779],[1.029,777],[1.036,775],[1.057,775],[1.071,777],[1.101,785],[1.136,788],[1.150,790],[1.167,795],[1.191,795],[1.209,790],[1.226,788],[1.255,784],[1.280,781],[1.292,776],[1.303,781],[1.328,784],[1.357,788],[1.374,790],[1.392,795],[1.416,795],[1.433,790],[1.448,788],[1.482,785],[1.512,777],[1.526,775],[1.547,775],[1.570,772],[1.598,779],[1.606,779],[1.616,778],[1.689,778],[1.795,776],[1.861,773],[1.883,776],[1.913,778],[1.975,771],[2.005,771],[2.034,773],[2.069,769],[2.110,765],[2.122,765],[2.131,765],[2.140,765],[2.157,764],[2.183,764],[2.190,764],[2.198,763],[2.230,763],[2.248,762],[2.261,761],[2.268,762],[2.277,762],[2.313,764],[2.368,765],[2.428,763],[2.486,760],[2.516,762],[2.545,766],[2.587,765],[2.594,765],[2.612,767],[2.644,766]];

/* ── TRACKS DIA 5 ────────────────────────────────────────── */
const TRACK_D5_TM06 = [[37.85800,-25.30962],[37.85795,-25.30945],[37.85792,-25.30939],[37.85789,-25.30936],[37.85775,-25.30934],[37.85764,-25.30933],[37.85751,-25.30926],[37.85747,-25.30924],[37.85730,-25.30924],[37.85715,-25.30921],[37.85707,-25.30920],[37.85684,-25.30919],[37.85656,-25.30919],[37.85638,-25.30917],[37.85624,-25.30911],[37.85619,-25.30908],[37.85617,-25.30900],[37.85617,-25.30892],[37.85621,-25.30884],[37.85632,-25.30871],[37.85644,-25.30862],[37.85658,-25.30843],[37.85677,-25.30834],[37.85675,-25.30826],[37.85668,-25.30814],[37.85663,-25.30804],[37.85657,-25.30780],[37.85658,-25.30770],[37.85664,-25.30770],[37.85672,-25.30779],[37.85664,-25.30770],[37.85658,-25.30770],[37.85657,-25.30780],[37.85663,-25.30804],[37.85668,-25.30814],[37.85675,-25.30826],[37.85677,-25.30834],[37.85658,-25.30843],[37.85644,-25.30862],[37.85636,-25.30868],[37.85638,-25.30853],[37.85633,-25.30849],[37.85626,-25.30850],[37.85621,-25.30848],[37.85617,-25.30849],[37.85597,-25.30861],[37.85587,-25.30868],[37.85581,-25.30880],[37.85577,-25.30885],[37.85570,-25.30886],[37.85566,-25.30892],[37.85565,-25.30900],[37.85554,-25.30916],[37.85538,-25.30931],[37.85536,-25.30931],[37.85523,-25.30947],[37.85518,-25.30950],[37.85514,-25.30947],[37.85495,-25.30958],[37.85475,-25.30961],[37.85458,-25.30969],[37.85454,-25.30974],[37.85441,-25.30980],[37.85433,-25.30981],[37.85414,-25.30973],[37.85399,-25.30969],[37.85387,-25.30969],[37.85377,-25.30961],[37.85338,-25.30942],[37.85327,-25.30921],[37.85317,-25.30913],[37.85301,-25.30897],[37.85259,-25.30884],[37.85250,-25.30870],[37.85245,-25.30868],[37.85243,-25.30857],[37.85245,-25.30848],[37.85244,-25.30842],[37.85207,-25.30815],[37.85185,-25.30786],[37.85156,-25.30778],[37.85147,-25.30768],[37.85144,-25.30754],[37.85140,-25.30751],[37.85133,-25.30731],[37.85111,-25.30722],[37.85109,-25.30721],[37.85110,-25.30715],[37.85126,-25.30718],[37.85132,-25.30718],[37.85144,-25.30719],[37.85155,-25.30724],[37.85169,-25.30727],[37.85175,-25.30727],[37.85175,-25.30725],[37.85174,-25.30722],[37.85160,-25.30713],[37.85142,-25.30702],[37.85133,-25.30695],[37.85130,-25.30691],[37.85126,-25.30683],[37.85127,-25.30679],[37.85128,-25.30678],[37.85131,-25.30679],[37.85149,-25.30691],[37.85160,-25.30697],[37.85167,-25.30698],[37.85170,-25.30696],[37.85169,-25.30694],[37.85164,-25.30693],[37.85158,-25.30689],[37.85146,-25.30674],[37.85140,-25.30664],[37.85137,-25.30650],[37.85135,-25.30635],[37.85136,-25.30633],[37.85151,-25.30639],[37.85153,-25.30636],[37.85152,-25.30633],[37.85146,-25.30620],[37.85147,-25.30619],[37.85148,-25.30619],[37.85166,-25.30625],[37.85167,-25.30623],[37.85166,-25.30617],[37.85158,-25.30606],[37.85166,-25.30617],[37.85167,-25.30623],[37.85166,-25.30625],[37.85148,-25.30619],[37.85147,-25.30619],[37.85146,-25.30620],[37.85145,-25.30627],[37.85142,-25.30628],[37.85136,-25.30620],[37.85132,-25.30617],[37.85126,-25.30615],[37.85111,-25.30626],[37.85106,-25.30629],[37.85085,-25.30627],[37.85074,-25.30631],[37.85062,-25.30630],[37.85055,-25.30628],[37.85049,-25.30624],[37.85036,-25.30598],[37.85030,-25.30589],[37.85014,-25.30574],[37.84997,-25.30551],[37.84977,-25.30529],[37.84976,-25.30503],[37.84969,-25.30487],[37.84963,-25.30478],[37.84963,-25.30468],[37.84964,-25.30465],[37.84967,-25.30466],[37.84964,-25.30465],[37.84963,-25.30468],[37.84963,-25.30478],[37.84969,-25.30487],[37.84976,-25.30503],[37.84977,-25.30529],[37.84961,-25.30515],[37.84940,-25.30503],[37.84935,-25.30500],[37.84931,-25.30499],[37.84929,-25.30500],[37.84902,-25.30491],[37.84892,-25.30491],[37.84888,-25.30490],[37.84884,-25.30488],[37.84884,-25.30485],[37.84884,-25.30483],[37.84887,-25.30481],[37.84899,-25.30480],[37.84887,-25.30481],[37.84884,-25.30483],[37.84884,-25.30485],[37.84884,-25.30488],[37.84888,-25.30490],[37.84892,-25.30491],[37.84902,-25.30491],[37.84929,-25.30500],[37.84929,-25.30502],[37.84934,-25.30507],[37.84944,-25.30531],[37.84952,-25.30544],[37.84953,-25.30553],[37.84950,-25.30559],[37.84946,-25.30556],[37.84943,-25.30549],[37.84941,-25.30549],[37.84939,-25.30550],[37.84938,-25.30553],[37.84945,-25.30587],[37.84961,-25.30608],[37.84977,-25.30629],[37.84992,-25.30650],[37.85003,-25.30674],[37.84986,-25.30674],[37.85000,-25.30693],[37.84989,-25.30694],[37.85001,-25.30712],[37.84993,-25.30712],[37.84983,-25.30712],[37.84983,-25.30717],[37.85014,-25.30737],[37.85013,-25.30743],[37.85045,-25.30765],[37.85049,-25.30770],[37.85052,-25.30776],[37.85054,-25.30789],[37.85053,-25.30796],[37.85050,-25.30803],[37.85042,-25.30814],[37.85038,-25.30821],[37.85050,-25.30847],[37.85063,-25.30884],[37.85071,-25.30911],[37.85076,-25.30937],[37.85080,-25.30946],[37.85085,-25.30952],[37.85092,-25.30955],[37.85130,-25.30956],[37.85144,-25.30962],[37.85155,-25.30970],[37.85203,-25.31041],[37.85220,-25.31067],[37.85243,-25.31104],[37.85247,-25.31116],[37.85246,-25.31135],[37.85245,-25.31138],[37.85277,-25.31169],[37.85293,-25.31184],[37.85309,-25.31188],[37.85329,-25.31190],[37.85352,-25.31187],[37.85377,-25.31179],[37.85409,-25.31165],[37.85432,-25.31156],[37.85454,-25.31151],[37.85494,-25.31147],[37.85549,-25.31151],[37.85582,-25.31159],[37.85599,-25.31165],[37.85703,-25.31174],[37.85708,-25.31178],[37.85720,-25.31212],[37.85727,-25.31220],[37.85737,-25.31221],[37.85755,-25.31216],[37.85799,-25.31195],[37.85851,-25.31153],[37.85856,-25.31151],[37.85853,-25.31137],[37.85831,-25.31100],[37.85822,-25.31085],[37.85811,-25.31070],[37.85806,-25.31062],[37.85803,-25.31051],[37.85803,-25.31040],[37.85803,-25.31028],[37.85803,-25.31011],[37.85802,-25.30986],[37.85800,-25.30962]];
const PROFILE_D5_TM06 = [[0.000,77],[0.016,73],[0.022,73],[0.027,73],[0.042,80],[0.054,82],[0.070,78],[0.075,73],[0.093,70],[0.111,64],[0.119,62],[0.145,56],[0.176,51],[0.196,52],[0.213,55],[0.219,56],[0.226,56],[0.233,55],[0.241,53],[0.257,46],[0.273,39],[0.297,29],[0.318,19],[0.325,18],[0.339,20],[0.349,20],[0.371,22],[0.380,23],[0.386,21],[0.398,18],[0.411,21],[0.416,23],[0.425,22],[0.447,20],[0.458,20],[0.471,18],[0.478,19],[0.500,29],[0.523,39],[0.534,44],[0.547,40],[0.553,41],[0.561,43],[0.567,44],[0.572,45],[0.596,51],[0.610,54],[0.622,59],[0.628,61],[0.636,62],[0.643,64],[0.650,67],[0.669,73],[0.691,80],[0.692,80],[0.713,89],[0.719,91],[0.724,91],[0.747,99],[0.769,103],[0.790,108],[0.796,110],[0.812,113],[0.820,114],[0.843,116],[0.859,118],[0.872,120],[0.886,122],[0.932,128],[0.954,129],[0.967,129],[0.990,129],[1.038,137],[1.054,137],[1.059,138],[1.070,137],[1.077,136],[1.083,135],[1.130,142],[1.165,144],[1.198,148],[1.212,148],[1.225,146],[1.229,147],[1.249,141],[1.274,140],[1.277,139],[1.282,136],[1.301,136],[1.308,135],[1.321,132],[1.334,131],[1.349,127],[1.356,124],[1.358,123],[1.361,122],[1.379,123],[1.400,123],[1.413,121],[1.418,119],[1.426,114],[1.430,112],[1.432,110],[1.436,110],[1.457,113],[1.471,114],[1.479,112],[1.482,110],[1.484,109],[1.490,110],[1.498,109],[1.516,103],[1.528,98],[1.540,92],[1.554,86],[1.556,85],[1.573,83],[1.577,82],[1.580,81],[1.594,80],[1.595,80],[1.597,79],[1.617,77],[1.620,77],[1.625,76],[1.639,78],[1.652,76],[1.658,77],[1.660,77],[1.680,79],[1.682,80],[1.684,80],[1.690,81],[1.693,82],[1.703,82],[1.708,81],[1.716,81],[1.734,87],[1.741,88],[1.764,91],[1.776,96],[1.790,101],[1.798,104],[1.806,105],[1.832,107],[1.843,109],[1.865,111],[1.892,108],[1.922,104],[1.945,103],[1.960,105],[1.971,107],[1.979,110],[1.983,112],[1.986,111],[1.990,112],[1.993,110],[2.001,107],[2.012,105],[2.028,103],[2.050,104],[2.071,105],[2.098,107],[2.104,108],[2.108,109],[2.111,109],[2.141,114],[2.153,116],[2.157,117],[2.162,118],[2.164,118],[2.166,118],[2.170,117],[2.183,115],[2.196,117],[2.199,118],[2.202,118],[2.204,118],[2.209,117],[2.213,116],[2.224,114],[2.255,109],[2.256,109],[2.264,109],[2.288,112],[2.303,114],[2.311,117],[2.317,120],[2.323,120],[2.329,119],[2.332,119],[2.334,120],[2.337,122],[2.368,133],[2.393,137],[2.419,139],[2.444,138],[2.468,141],[2.487,149],[2.509,150],[2.521,155],[2.543,155],[2.551,158],[2.562,161],[2.567,162],[2.605,157],[2.611,159],[2.651,159],[2.658,160],[2.664,160],[2.676,161],[2.682,161],[2.689,161],[2.701,161],[2.709,161],[2.736,159],[2.772,155],[2.797,151],[2.821,149],[2.830,150],[2.837,149],[2.845,148],[2.888,143],[2.904,142],[2.918,141],[3.001,141],[3.030,140],[3.071,143],[3.083,144],[3.100,146],[3.102,146],[3.147,144],[3.169,145],[3.187,144],[3.210,145],[3.235,145],[3.264,147],[3.302,147],[3.328,145],[3.353,143],[3.398,138],[3.459,128],[3.497,124],[3.516,122],[3.632,113],[3.638,113],[3.671,114],[3.682,114],[3.693,114],[3.713,112],[3.765,107],[3.834,94],[3.840,93],[3.853,91],[3.892,90],[3.909,90],[3.927,91],[3.936,92],[3.946,93],[3.956,94],[3.967,94],[3.982,93],[4.003,86],[4.024,77]];

const TRACK_D5_POCO_AZUL = [[37.84990,-25.28631],[37.85010,-25.28655],[37.85003,-25.28670],[37.84999,-25.28676],[37.84995,-25.28681],[37.84991,-25.28684],[37.84982,-25.28687],[37.84975,-25.28692],[37.84972,-25.28696],[37.84967,-25.28710],[37.84967,-25.28712],[37.84963,-25.28727],[37.84951,-25.28753],[37.84950,-25.28757],[37.84950,-25.28781],[37.84947,-25.28791],[37.84943,-25.28797],[37.84930,-25.28813],[37.84928,-25.28817],[37.84928,-25.28821],[37.84930,-25.28826],[37.84933,-25.28830],[37.84940,-25.28841],[37.84943,-25.28847],[37.84948,-25.28876],[37.84951,-25.28885],[37.84952,-25.28890],[37.84951,-25.28898],[37.84947,-25.28908],[37.84947,-25.28908],[37.84952,-25.28921],[37.84966,-25.28921],[37.84971,-25.28941],[37.84978,-25.28951],[37.84984,-25.28951],[37.84990,-25.28948],[37.84997,-25.28945],[37.85001,-25.28949],[37.85000,-25.28950],[37.84998,-25.28956],[37.84986,-25.28973],[37.84987,-25.28980],[37.84994,-25.28993],[37.84994,-25.28996],[37.85003,-25.28997],[37.85012,-25.29003],[37.85016,-25.29012],[37.85018,-25.29030],[37.85030,-25.29047],[37.85012,-25.29044],[37.84980,-25.29046],[37.84959,-25.29074],[37.84939,-25.29103],[37.84921,-25.29115],[37.84912,-25.29129],[37.84903,-25.29135],[37.84879,-25.29152],[37.84862,-25.29155],[37.84853,-25.29153],[37.84853,-25.29150],[37.84854,-25.29148],[37.84875,-25.29127],[37.84882,-25.29112],[37.84897,-25.29092],[37.84892,-25.29078],[37.84891,-25.29045],[37.84886,-25.29032],[37.84891,-25.29015],[37.84907,-25.28997],[37.84917,-25.28973],[37.84918,-25.28954],[37.84934,-25.28935],[37.84943,-25.28916],[37.84947,-25.28908],[37.84951,-25.28898],[37.84952,-25.28890],[37.84951,-25.28885],[37.84948,-25.28876],[37.84943,-25.28847],[37.84940,-25.28841],[37.84933,-25.28830],[37.84930,-25.28826],[37.84928,-25.28821],[37.84928,-25.28817],[37.84930,-25.28813],[37.84943,-25.28797],[37.84947,-25.28791],[37.84950,-25.28781],[37.84950,-25.28757],[37.84951,-25.28753],[37.84963,-25.28727],[37.84967,-25.28710],[37.84972,-25.28696],[37.84975,-25.28692],[37.84982,-25.28687],[37.84991,-25.28684],[37.84995,-25.28681],[37.84999,-25.28676],[37.85003,-25.28670],[37.85010,-25.28655],[37.84990,-25.28631]];
const PROFILE_D5_POCO_AZUL = [[0.000,170],[0.031,168],[0.046,167],[0.054,167],[0.060,167],[0.065,167],[0.075,167],[0.085,167],[0.089,167],[0.102,165],[0.104,165],[0.118,164],[0.145,162],[0.149,162],[0.169,162],[0.179,163],[0.186,164],[0.206,166],[0.210,166],[0.214,166],[0.218,166],[0.223,166],[0.235,166],[0.242,166],[0.268,169],[0.277,169],[0.281,170],[0.288,171],[0.298,172],[0.298,172],[0.311,171],[0.326,165],[0.344,163],[0.356,158],[0.363,156],[0.370,154],[0.379,152],[0.383,150],[0.384,150],[0.390,150],[0.410,150],[0.417,149],[0.431,145],[0.433,144],[0.443,142],[0.454,142],[0.464,144],[0.479,150],[0.500,158],[0.520,158],[0.556,158],[0.590,164],[0.624,165],[0.646,163],[0.662,165],[0.673,167],[0.704,172],[0.723,175],[0.733,176],[0.736,176],[0.738,176],[0.767,170],[0.783,167],[0.807,163],[0.821,167],[0.850,172],[0.862,175],[0.878,175],[0.901,174],[0.925,177],[0.942,178],[0.967,176],[0.986,174],[0.995,172],[1.004,171],[1.011,170],[1.016,169],[1.025,169],[1.051,166],[1.057,166],[1.070,166],[1.074,166],[1.079,166],[1.082,166],[1.087,166],[1.107,164],[1.114,163],[1.123,162],[1.144,162],[1.148,162],[1.174,164],[1.190,165],[1.204,167],[1.207,167],[1.217,167],[1.227,167],[1.232,167],[1.239,167],[1.246,167],[1.262,168],[1.292,170]];

const TRACK_D5_PRC09 = [[37.74716,-25.20146],[37.74723,-25.20153],[37.74723,-25.20153],[37.74729,-25.20159],[37.74738,-25.20168],[37.74745,-25.20168],[37.74755,-25.20169],[37.74763,-25.20171],[37.74772,-25.20172],[37.74782,-25.20172],[37.74791,-25.20171],[37.74801,-25.20170],[37.74811,-25.20170],[37.74820,-25.20171],[37.74829,-25.20173],[37.74838,-25.20175],[37.74846,-25.20176],[37.74854,-25.20180],[37.74862,-25.20182],[37.74870,-25.20184],[37.74877,-25.20186],[37.74882,-25.20190],[37.74889,-25.20196],[37.74897,-25.20199],[37.74905,-25.20203],[37.74911,-25.20209],[37.74919,-25.20213],[37.74927,-25.20217],[37.74934,-25.20220],[37.74941,-25.20223],[37.74948,-25.20227],[37.74955,-25.20231],[37.74962,-25.20234],[37.74968,-25.20237],[37.74974,-25.20238],[37.74981,-25.20241],[37.74986,-25.20240],[37.74988,-25.20240],[37.74996,-25.20238],[37.74997,-25.20237],[37.75005,-25.20235],[37.75006,-25.20235],[37.75013,-25.20231],[37.75015,-25.20230],[37.75023,-25.20226],[37.75024,-25.20226],[37.75033,-25.20228],[37.75034,-25.20228],[37.75042,-25.20226],[37.75043,-25.20227],[37.75051,-25.20227],[37.75053,-25.20226],[37.75061,-25.20224],[37.75062,-25.20223],[37.75070,-25.20221],[37.75072,-25.20221],[37.75080,-25.20224],[37.75082,-25.20225],[37.75091,-25.20227],[37.75094,-25.20227],[37.75100,-25.20230],[37.75102,-25.20231],[37.75110,-25.20234],[37.75111,-25.20234],[37.75119,-25.20236],[37.75121,-25.20236],[37.75127,-25.20240],[37.75129,-25.20242],[37.75137,-25.20247],[37.75138,-25.20247],[37.75146,-25.20247],[37.75147,-25.20247],[37.75156,-25.20246],[37.75158,-25.20245],[37.75167,-25.20247],[37.75168,-25.20248],[37.75177,-25.20251],[37.75178,-25.20252],[37.75184,-25.20258],[37.75185,-25.20260],[37.75192,-25.20262],[37.75193,-25.20260],[37.75199,-25.20253],[37.75200,-25.20253],[37.75208,-25.20255],[37.75209,-25.20256],[37.75217,-25.20259],[37.75220,-25.20259],[37.75225,-25.20266],[37.75226,-25.20267],[37.75235,-25.20267],[37.75235,-25.20267],[37.75244,-25.20268],[37.75244,-25.20266],[37.75252,-25.20262],[37.75253,-25.20261],[37.75261,-25.20258],[37.75263,-25.20259],[37.75270,-25.20263],[37.75272,-25.20263],[37.75278,-25.20256],[37.75280,-25.20254],[37.75288,-25.20249],[37.75289,-25.20247],[37.75294,-25.20240],[37.75296,-25.20238],[37.75302,-25.20232],[37.75304,-25.20231],[37.75310,-25.20223],[37.75311,-25.20221],[37.75318,-25.20216],[37.75319,-25.20216],[37.75327,-25.20212],[37.75329,-25.20211],[37.75336,-25.20208],[37.75337,-25.20209],[37.75345,-25.20204],[37.75346,-25.20204],[37.75352,-25.20195],[37.75353,-25.20193],[37.75360,-25.20188],[37.75362,-25.20189],[37.75369,-25.20192],[37.75370,-25.20191],[37.75377,-25.20185],[37.75379,-25.20185],[37.75386,-25.20179],[37.75387,-25.20178],[37.75394,-25.20175],[37.75396,-25.20173],[37.75400,-25.20164],[37.75401,-25.20162],[37.75407,-25.20155],[37.75410,-25.20152],[37.75416,-25.20145],[37.75419,-25.20143],[37.75428,-25.20141],[37.75430,-25.20139],[37.75437,-25.20132],[37.75439,-25.20129],[37.75442,-25.20122],[37.75444,-25.20118],[37.75448,-25.20113],[37.75448,-25.20113],[37.75456,-25.20106],[37.75456,-25.20105],[37.75460,-25.20096],[37.75463,-25.20093],[37.75469,-25.20086],[37.75471,-25.20083],[37.75478,-25.20078],[37.75480,-25.20077],[37.75488,-25.20078],[37.75491,-25.20079],[37.75496,-25.20084],[37.75498,-25.20087],[37.75506,-25.20090],[37.75507,-25.20090],[37.75515,-25.20090],[37.75516,-25.20090],[37.75524,-25.20094],[37.75526,-25.20094],[37.75534,-25.20090],[37.75535,-25.20089],[37.75543,-25.20084],[37.75545,-25.20083],[37.75554,-25.20081],[37.75555,-25.20081],[37.75564,-25.20083],[37.75566,-25.20083],[37.75574,-25.20084],[37.75574,-25.20084],[37.75583,-25.20088],[37.75583,-25.20088],[37.75592,-25.20088],[37.75593,-25.20088],[37.75599,-25.20097],[37.75600,-25.20098],[37.75608,-25.20100],[37.75609,-25.20100],[37.75617,-25.20095],[37.75618,-25.20096],[37.75626,-25.20096],[37.75626,-25.20094],[37.75633,-25.20086],[37.75634,-25.20085],[37.75640,-25.20079],[37.75642,-25.20079],[37.75650,-25.20078],[37.75652,-25.20078],[37.75661,-25.20079],[37.75662,-25.20079],[37.75671,-25.20079],[37.75673,-25.20080],[37.75676,-25.20086],[37.75677,-25.20088],[37.75678,-25.20098],[37.75677,-25.20100],[37.75682,-25.20108],[37.75682,-25.20110],[37.75686,-25.20119],[37.75686,-25.20120],[37.75695,-25.20123],[37.75697,-25.20124],[37.75702,-25.20131],[37.75702,-25.20134],[37.75703,-25.20143],[37.75705,-25.20142],[37.75712,-25.20140],[37.75713,-25.20141],[37.75717,-25.20151],[37.75717,-25.20153],[37.75719,-25.20162],[37.75719,-25.20165],[37.75723,-25.20175],[37.75723,-25.20174],[37.75722,-25.20163],[37.75722,-25.20162],[37.75721,-25.20151],[37.75722,-25.20149],[37.75725,-25.20140],[37.75726,-25.20138],[37.75728,-25.20128],[37.75726,-25.20127],[37.75726,-25.20116],[37.75726,-25.20114],[37.75734,-25.20108],[37.75735,-25.20108],[37.75743,-25.20104],[37.75744,-25.20104],[37.75753,-25.20102],[37.75753,-25.20103],[37.75756,-25.20114],[37.75756,-25.20115],[37.75757,-25.20121],[37.75757,-25.20126],[37.75758,-25.20125],[37.75765,-25.20120],[37.75766,-25.20120],[37.75773,-25.20115],[37.75775,-25.20115],[37.75783,-25.20115],[37.75786,-25.20115],[37.75792,-25.20109],[37.75793,-25.20107],[37.75800,-25.20101],[37.75801,-25.20099],[37.75806,-25.20092],[37.75807,-25.20091],[37.75812,-25.20081],[37.75813,-25.20079],[37.75819,-25.20073],[37.75821,-25.20071],[37.75827,-25.20063],[37.75828,-25.20062],[37.75835,-25.20058],[37.75837,-25.20057],[37.75845,-25.20051],[37.75847,-25.20050],[37.75853,-25.20045],[37.75854,-25.20044],[37.75863,-25.20042],[37.75863,-25.20042],[37.75865,-25.20031],[37.75865,-25.20029],[37.75865,-25.20019],[37.75865,-25.20018],[37.75861,-25.20009],[37.75860,-25.20007],[37.75862,-25.19996],[37.75864,-25.19992],[37.75868,-25.19984],[37.75870,-25.19982],[37.75876,-25.19975],[37.75876,-25.19973],[37.75882,-25.19964],[37.75883,-25.19963],[37.75890,-25.19958],[37.75892,-25.19957],[37.75896,-25.19949],[37.75896,-25.19947],[37.75899,-25.19938],[37.75900,-25.19937],[37.75906,-25.19930],[37.75908,-25.19928],[37.75915,-25.19924],[37.75916,-25.19924],[37.75924,-25.19919],[37.75925,-25.19919],[37.75934,-25.19918],[37.75936,-25.19918],[37.75945,-25.19918],[37.75946,-25.19918],[37.75954,-25.19916],[37.75955,-25.19916],[37.75964,-25.19911],[37.75964,-25.19909],[37.75970,-25.19903],[37.75970,-25.19897],[37.75970,-25.19895],[37.75972,-25.19886],[37.75972,-25.19885],[37.75975,-25.19875],[37.75976,-25.19874],[37.75983,-25.19868],[37.75983,-25.19867],[37.75984,-25.19856],[37.75985,-25.19855],[37.75991,-25.19849],[37.75992,-25.19847],[37.75999,-25.19841],[37.75999,-25.19840],[37.76007,-25.19834],[37.76008,-25.19834],[37.76015,-25.19829],[37.76016,-25.19828],[37.76024,-25.19824],[37.76025,-25.19824],[37.76032,-25.19817],[37.76032,-25.19817],[37.76041,-25.19819],[37.76040,-25.19818],[37.76039,-25.19807],[37.76040,-25.19806],[37.76040,-25.19796],[37.76040,-25.19795],[37.76035,-25.19787],[37.76034,-25.19785],[37.76042,-25.19777],[37.76042,-25.19776],[37.76046,-25.19767],[37.76046,-25.19766],[37.76048,-25.19755],[37.76045,-25.19753],[37.76040,-25.19746],[37.76037,-25.19744],[37.76040,-25.19740],[37.76040,-25.19740],[37.76040,-25.19740],[37.76051,-25.19729],[37.76050,-25.19728],[37.76049,-25.19721],[37.76050,-25.19716],[37.76052,-25.19712],[37.76056,-25.19706],[37.76056,-25.19704],[37.76057,-25.19699],[37.76057,-25.19694],[37.76056,-25.19700],[37.76056,-25.19706],[37.76052,-25.19712],[37.76050,-25.19715],[37.76049,-25.19721],[37.76050,-25.19727],[37.76052,-25.19729],[37.76061,-25.19727],[37.76062,-25.19723],[37.76069,-25.19713],[37.76071,-25.19706],[37.76073,-25.19701],[37.76070,-25.19691],[37.76070,-25.19683],[37.76069,-25.19678],[37.76063,-25.19671],[37.76062,-25.19669],[37.76063,-25.19659],[37.76064,-25.19660],[37.76062,-25.19671],[37.76063,-25.19671],[37.76069,-25.19678],[37.76070,-25.19680],[37.76070,-25.19691],[37.76071,-25.19695],[37.76073,-25.19701],[37.76073,-25.19703],[37.76068,-25.19713],[37.76067,-25.19716],[37.76062,-25.19724],[37.76060,-25.19727],[37.76053,-25.19728],[37.76052,-25.19729],[37.76045,-25.19736],[37.76043,-25.19737],[37.76038,-25.19743],[37.76038,-25.19745],[37.76045,-25.19752],[37.76048,-25.19755],[37.76046,-25.19766],[37.76046,-25.19768],[37.76041,-25.19777],[37.76041,-25.19778],[37.76036,-25.19784],[37.76035,-25.19786],[37.76040,-25.19796],[37.76040,-25.19805],[37.76039,-25.19808],[37.76040,-25.19813],[37.76041,-25.19818],[37.76039,-25.19818],[37.76032,-25.19817],[37.76028,-25.19820],[37.76027,-25.19822],[37.76025,-25.19823],[37.76017,-25.19827],[37.76015,-25.19828],[37.76008,-25.19833],[37.76006,-25.19834],[37.76000,-25.19839],[37.75998,-25.19841],[37.75992,-25.19847],[37.75991,-25.19849],[37.75987,-25.19852],[37.75984,-25.19855],[37.75983,-25.19857],[37.75982,-25.19868],[37.75976,-25.19874],[37.75974,-25.19875],[37.75972,-25.19884],[37.75972,-25.19885],[37.75971,-25.19896],[37.75970,-25.19898],[37.75973,-25.19905],[37.75970,-25.19903],[37.75964,-25.19909],[37.75964,-25.19911],[37.75955,-25.19916],[37.75954,-25.19916],[37.75946,-25.19918],[37.75945,-25.19918],[37.75936,-25.19918],[37.75934,-25.19918],[37.75925,-25.19919],[37.75924,-25.19919],[37.75916,-25.19924],[37.75915,-25.19924],[37.75908,-25.19928],[37.75906,-25.19930],[37.75900,-25.19937],[37.75899,-25.19938],[37.75896,-25.19947],[37.75896,-25.19949],[37.75892,-25.19957],[37.75890,-25.19958],[37.75883,-25.19963],[37.75882,-25.19964],[37.75876,-25.19973],[37.75876,-25.19975],[37.75870,-25.19982],[37.75868,-25.19984],[37.75864,-25.19992],[37.75862,-25.19996],[37.75860,-25.20007],[37.75861,-25.20009],[37.75865,-25.20018],[37.75865,-25.20019],[37.75865,-25.20029],[37.75865,-25.20031],[37.75863,-25.20042],[37.75863,-25.20042],[37.75854,-25.20044],[37.75853,-25.20045],[37.75847,-25.20050],[37.75845,-25.20051],[37.75837,-25.20057],[37.75835,-25.20058],[37.75828,-25.20062],[37.75827,-25.20063],[37.75821,-25.20071],[37.75819,-25.20073],[37.75813,-25.20079],[37.75812,-25.20081],[37.75807,-25.20091],[37.75806,-25.20092],[37.75801,-25.20099],[37.75800,-25.20101],[37.75793,-25.20107],[37.75792,-25.20109],[37.75786,-25.20115],[37.75783,-25.20115],[37.75775,-25.20115],[37.75773,-25.20115],[37.75766,-25.20120],[37.75765,-25.20120],[37.75758,-25.20125],[37.75757,-25.20127],[37.75758,-25.20132],[37.75758,-25.20133],[37.75758,-25.20137],[37.75760,-25.20146],[37.75760,-25.20149],[37.75758,-25.20160],[37.75757,-25.20162],[37.75753,-25.20172],[37.75753,-25.20174],[37.75758,-25.20182],[37.75759,-25.20183],[37.75762,-25.20193],[37.75762,-25.20194],[37.75763,-25.20204],[37.75764,-25.20205],[37.75771,-25.20211],[37.75772,-25.20212],[37.75777,-25.20221],[37.75777,-25.20222],[37.75779,-25.20233],[37.75779,-25.20235],[37.75787,-25.20236],[37.75789,-25.20235],[37.75787,-25.20246],[37.75787,-25.20247],[37.75780,-25.20253],[37.75779,-25.20254],[37.75775,-25.20264],[37.75775,-25.20266],[37.75767,-25.20272],[37.75766,-25.20273],[37.75759,-25.20276],[37.75758,-25.20276],[37.75749,-25.20276],[37.75748,-25.20275],[37.75741,-25.20275],[37.75739,-25.20275],[37.75731,-25.20278],[37.75729,-25.20278],[37.75725,-25.20269],[37.75725,-25.20267],[37.75722,-25.20258],[37.75720,-25.20257],[37.75713,-25.20252],[37.75712,-25.20251],[37.75706,-25.20243],[37.75706,-25.20241],[37.75704,-25.20231],[37.75703,-25.20229],[37.75695,-25.20225],[37.75693,-25.20224],[37.75691,-25.20214],[37.75691,-25.20212],[37.75688,-25.20202],[37.75687,-25.20201],[37.75678,-25.20199],[37.75677,-25.20199],[37.75669,-25.20194],[37.75668,-25.20193],[37.75660,-25.20189],[37.75659,-25.20189],[37.75652,-25.20183],[37.75651,-25.20183],[37.75643,-25.20185],[37.75642,-25.20186],[37.75634,-25.20189],[37.75632,-25.20188],[37.75625,-25.20187],[37.75623,-25.20187],[37.75616,-25.20193],[37.75615,-25.20193],[37.75606,-25.20193],[37.75605,-25.20194],[37.75597,-25.20198],[37.75596,-25.20197],[37.75589,-25.20191],[37.75588,-25.20190],[37.75580,-25.20189],[37.75579,-25.20189],[37.75572,-25.20196],[37.75572,-25.20197],[37.75567,-25.20205],[37.75566,-25.20206],[37.75557,-25.20208],[37.75557,-25.20208],[37.75549,-25.20209],[37.75547,-25.20209],[37.75538,-25.20212],[37.75537,-25.20213],[37.75531,-25.20219],[37.75530,-25.20220],[37.75524,-25.20228],[37.75523,-25.20229],[37.75518,-25.20238],[37.75517,-25.20238],[37.75509,-25.20242],[37.75508,-25.20243],[37.75501,-25.20249],[37.75500,-25.20250],[37.75492,-25.20251],[37.75491,-25.20251],[37.75485,-25.20260],[37.75484,-25.20261],[37.75482,-25.20272],[37.75481,-25.20274],[37.75481,-25.20285],[37.75480,-25.20286],[37.75478,-25.20297],[37.75477,-25.20298],[37.75470,-25.20292],[37.75469,-25.20291],[37.75463,-25.20285],[37.75462,-25.20285],[37.75454,-25.20289],[37.75453,-25.20290],[37.75449,-25.20299],[37.75449,-25.20301],[37.75443,-25.20307],[37.75442,-25.20309],[37.75435,-25.20314],[37.75434,-25.20316],[37.75429,-25.20325],[37.75428,-25.20327],[37.75425,-25.20337],[37.75424,-25.20338],[37.75420,-25.20348],[37.75420,-25.20349],[37.75412,-25.20355],[37.75411,-25.20354],[37.75404,-25.20348],[37.75402,-25.20348],[37.75394,-25.20349],[37.75393,-25.20350],[37.75387,-25.20357],[37.75386,-25.20359],[37.75379,-25.20365],[37.75377,-25.20366],[37.75369,-25.20364],[37.75368,-25.20364],[37.75360,-25.20361],[37.75358,-25.20360],[37.75351,-25.20357],[37.75349,-25.20356],[37.75341,-25.20355],[37.75340,-25.20355],[37.75332,-25.20355],[37.75331,-25.20355],[37.75324,-25.20359],[37.75322,-25.20360],[37.75315,-25.20366],[37.75314,-25.20366],[37.75306,-25.20371],[37.75305,-25.20371],[37.75297,-25.20376],[37.75296,-25.20376],[37.75288,-25.20372],[37.75288,-25.20372],[37.75281,-25.20366],[37.75280,-25.20365],[37.75272,-25.20360],[37.75271,-25.20359],[37.75264,-25.20355],[37.75263,-25.20355],[37.75254,-25.20354],[37.75252,-25.20354],[37.75244,-25.20359],[37.75243,-25.20360],[37.75235,-25.20363],[37.75233,-25.20362],[37.75225,-25.20357],[37.75224,-25.20357],[37.75216,-25.20353],[37.75214,-25.20353],[37.75207,-25.20350],[37.75205,-25.20350],[37.75197,-25.20348],[37.75195,-25.20347],[37.75188,-25.20347],[37.75186,-25.20347],[37.75178,-25.20348],[37.75177,-25.20349],[37.75169,-25.20349],[37.75167,-25.20349],[37.75160,-25.20346],[37.75158,-25.20345],[37.75151,-25.20343],[37.75150,-25.20343],[37.75141,-25.20345],[37.75141,-25.20346],[37.75132,-25.20344],[37.75132,-25.20344],[37.75123,-25.20344],[37.75122,-25.20344],[37.75115,-25.20339],[37.75114,-25.20339],[37.75106,-25.20335],[37.75105,-25.20335],[37.75112,-25.20329],[37.75112,-25.20327],[37.75103,-25.20324],[37.75103,-25.20324],[37.75109,-25.20318],[37.75111,-25.20318],[37.75104,-25.20311],[37.75103,-25.20311],[37.75109,-25.20303],[37.75110,-25.20303],[37.75104,-25.20295],[37.75103,-25.20295],[37.75094,-25.20295],[37.75093,-25.20295],[37.75085,-25.20299],[37.75084,-25.20300],[37.75078,-25.20293],[37.75078,-25.20291],[37.75084,-25.20283],[37.75085,-25.20283],[37.75079,-25.20274],[37.75079,-25.20274],[37.75070,-25.20276],[37.75069,-25.20276],[37.75066,-25.20285],[37.75066,-25.20287],[37.75062,-25.20296],[37.75062,-25.20297],[37.75059,-25.20308],[37.75059,-25.20309],[37.75054,-25.20318],[37.75053,-25.20319],[37.75046,-25.20324],[37.75044,-25.20323],[37.75036,-25.20323],[37.75035,-25.20324],[37.75026,-25.20322],[37.75025,-25.20321],[37.75017,-25.20321],[37.75015,-25.20321],[37.75007,-25.20323],[37.75006,-25.20323],[37.74997,-25.20322],[37.74996,-25.20322],[37.74988,-25.20318],[37.74986,-25.20318],[37.74989,-25.20307],[37.74989,-25.20306],[37.74993,-25.20297],[37.74994,-25.20296],[37.74999,-25.20287],[37.75000,-25.20286],[37.75002,-25.20275],[37.75002,-25.20274],[37.74999,-25.20264],[37.74998,-25.20263],[37.74993,-25.20254],[37.74992,-25.20253],[37.74997,-25.20244],[37.74998,-25.20244],[37.74990,-25.20242],[37.74986,-25.20241],[37.74981,-25.20241],[37.74974,-25.20238],[37.74968,-25.20237],[37.74962,-25.20234],[37.74955,-25.20231],[37.74948,-25.20227],[37.74941,-25.20223],[37.74934,-25.20220],[37.74927,-25.20217],[37.74919,-25.20213],[37.74911,-25.20209],[37.74905,-25.20203],[37.74897,-25.20199],[37.74889,-25.20196],[37.74882,-25.20190],[37.74877,-25.20186],[37.74870,-25.20184],[37.74862,-25.20182],[37.74854,-25.20180],[37.74846,-25.20176],[37.74838,-25.20175],[37.74829,-25.20173],[37.74820,-25.20171],[37.74811,-25.20170],[37.74801,-25.20170],[37.74791,-25.20171],[37.74782,-25.20172],[37.74772,-25.20172],[37.74763,-25.20171],[37.74755,-25.20169],[37.74745,-25.20168],[37.74738,-25.20168],[37.74729,-25.20159],[37.74723,-25.20153],[37.74723,-25.20153],[37.74716,-25.20146]];
const PROFILE_D5_PRC09 = [[0.000,38],[0.010,39],[0.010,39],[0.019,39],[0.032,39],[0.039,40],[0.051,40],[0.060,41],[0.070,41],[0.080,41],[0.091,41],[0.102,41],[0.113,41],[0.123,41],[0.133,41],[0.143,42],[0.152,44],[0.161,46],[0.170,48],[0.179,49],[0.188,51],[0.195,51],[0.204,52],[0.213,53],[0.222,54],[0.231,53],[0.241,54],[0.249,54],[0.258,54],[0.266,55],[0.275,55],[0.283,56],[0.291,56],[0.299,57],[0.306,57],[0.313,58],[0.319,59],[0.321,59],[0.330,61],[0.332,61],[0.341,63],[0.342,63],[0.351,65],[0.353,65],[0.362,67],[0.364,67],[0.374,68],[0.375,68],[0.384,70],[0.385,70],[0.395,71],[0.396,71],[0.405,73],[0.407,73],[0.417,74],[0.419,74],[0.428,76],[0.430,76],[0.440,77],[0.443,77],[0.451,77],[0.453,78],[0.462,78],[0.464,78],[0.473,79],[0.475,79],[0.483,79],[0.485,79],[0.494,79],[0.496,79],[0.505,79],[0.507,79],[0.516,80],[0.518,80],[0.528,80],[0.530,80],[0.540,83],[0.542,84],[0.550,91],[0.552,92],[0.561,95],[0.562,94],[0.571,88],[0.572,89],[0.581,92],[0.583,93],[0.593,97],[0.595,97],[0.604,104],[0.605,104],[0.615,106],[0.616,106],[0.626,108],[0.627,107],[0.637,105],[0.638,105],[0.647,106],[0.649,108],[0.658,113],[0.660,113],[0.670,111],[0.672,111],[0.682,112],[0.684,112],[0.693,112],[0.696,112],[0.703,112],[0.706,112],[0.716,111],[0.718,111],[0.727,110],[0.728,111],[0.737,110],[0.739,110],[0.748,110],[0.749,111],[0.758,111],[0.760,111],[0.770,108],[0.772,107],[0.781,106],[0.783,107],[0.792,111],[0.793,111],[0.802,109],[0.804,109],[0.813,107],[0.815,107],[0.824,106],[0.826,105],[0.835,101],[0.838,102],[0.847,102],[0.851,103],[0.860,103],[0.864,104],[0.874,107],[0.877,108],[0.886,109],[0.890,109],[0.897,109],[0.900,108],[0.907,108],[0.908,108],[0.918,108],[0.919,108],[0.928,106],[0.932,105],[0.941,103],[0.944,102],[0.953,104],[0.956,105],[0.965,105],[0.969,105],[0.976,105],[0.979,106],[0.988,110],[0.990,109],[0.998,111],[1.000,111],[1.009,115],[1.011,115],[1.021,113],[1.023,113],[1.032,110],[1.034,110],[1.044,112],[1.046,112],[1.056,113],[1.058,113],[1.067,115],[1.068,115],[1.078,119],[1.079,119],[1.088,122],[1.089,122],[1.099,129],[1.101,130],[1.110,133],[1.111,133],[1.121,132],[1.123,132],[1.131,134],[1.133,133],[1.143,130],[1.144,130],[1.153,131],[1.155,131],[1.164,133],[1.166,134],[1.176,136],[1.178,136],[1.188,139],[1.190,139],[1.196,142],[1.199,143],[1.207,147],[1.209,147],[1.218,152],[1.219,153],[1.228,157],[1.229,157],[1.239,160],[1.241,161],[1.250,165],[1.252,166],[1.260,169],[1.262,169],[1.270,169],[1.271,170],[1.281,173],[1.283,174],[1.291,177],[1.294,178],[1.303,181],[1.304,181],[1.313,178],[1.315,177],[1.324,174],[1.326,174],[1.334,172],[1.337,172],[1.346,169],[1.348,169],[1.357,166],[1.359,165],[1.369,165],[1.371,166],[1.380,167],[1.381,167],[1.391,170],[1.393,170],[1.402,174],[1.404,174],[1.408,176],[1.413,177],[1.414,177],[1.424,179],[1.424,179],[1.434,181],[1.435,182],[1.445,186],[1.448,187],[1.456,188],[1.459,189],[1.468,191],[1.470,191],[1.478,193],[1.480,193],[1.490,194],[1.492,194],[1.501,195],[1.504,195],[1.513,196],[1.514,196],[1.523,199],[1.526,199],[1.536,200],[1.538,200],[1.547,201],[1.548,201],[1.558,203],[1.558,203],[1.568,201],[1.570,201],[1.578,199],[1.580,199],[1.589,196],[1.591,195],[1.600,194],[1.604,194],[1.613,194],[1.616,194],[1.625,195],[1.626,195],[1.636,196],[1.638,196],[1.647,198],[1.649,199],[1.657,200],[1.659,200],[1.668,200],[1.669,200],[1.679,202],[1.680,203],[1.690,207],[1.691,207],[1.700,209],[1.702,210],[1.712,213],[1.714,213],[1.723,216],[1.725,217],[1.734,219],[1.736,220],[1.745,222],[1.747,222],[1.755,223],[1.761,222],[1.762,222],[1.771,221],[1.772,221],[1.781,220],[1.782,220],[1.791,222],[1.792,221],[1.802,220],[1.803,220],[1.812,221],[1.814,221],[1.823,222],[1.824,222],[1.834,225],[1.835,226],[1.845,228],[1.846,228],[1.856,231],[1.856,231],[1.866,232],[1.866,233],[1.876,238],[1.877,237],[1.886,233],[1.888,232],[1.897,229],[1.897,228],[1.906,223],[1.908,222],[1.919,223],[1.920,222],[1.929,221],[1.930,220],[1.940,217],[1.944,215],[1.952,212],[1.956,212],[1.960,213],[1.960,213],[1.960,213],[1.976,218],[1.978,217],[1.984,218],[1.988,218],[1.992,218],[1.999,219],[2.001,219],[2.005,219],[2.010,219],[2.015,219],[2.021,219],[2.028,218],[2.032,218],[2.036,217],[2.042,217],[2.045,218],[2.054,220],[2.058,220],[2.069,221],[2.076,221],[2.081,220],[2.090,219],[2.097,219],[2.101,218],[2.111,218],[2.113,219],[2.122,222],[2.123,222],[2.132,218],[2.133,218],[2.143,218],[2.144,218],[2.154,219],[2.158,220],[2.164,220],[2.166,221],[2.175,221],[2.178,221],[2.188,220],[2.191,220],[2.199,218],[2.201,218],[2.210,215],[2.212,215],[2.221,212],[2.222,212],[2.233,215],[2.237,217],[2.246,220],[2.248,221],[2.257,222],[2.259,222],[2.266,222],[2.268,222],[2.279,229],[2.287,232],[2.290,233],[2.294,235],[2.299,237],[2.302,236],[2.310,232],[2.314,232],[2.317,232],[2.319,231],[2.328,229],[2.331,228],[2.339,226],[2.341,225],[2.350,223],[2.352,222],[2.361,221],[2.363,221],[2.368,220],[2.372,220],[2.374,220],[2.384,221],[2.392,220],[2.395,220],[2.403,221],[2.404,221],[2.413,222],[2.415,222],[2.423,224],[2.427,223],[2.435,222],[2.437,222],[2.447,220],[2.448,219],[2.457,217],[2.459,216],[2.469,213],[2.470,213],[2.481,210],[2.482,209],[2.491,207],[2.493,207],[2.502,203],[2.504,202],[2.513,200],[2.515,200],[2.523,200],[2.525,200],[2.533,199],[2.535,198],[2.545,196],[2.546,196],[2.556,195],[2.558,195],[2.567,194],[2.570,194],[2.578,194],[2.582,194],[2.591,195],[2.593,196],[2.602,199],[2.604,199],[2.612,201],[2.614,201],[2.624,203],[2.625,203],[2.634,201],[2.636,201],[2.644,200],[2.647,200],[2.657,199],[2.659,199],[2.668,196],[2.670,196],[2.679,195],[2.681,195],[2.691,194],[2.692,194],[2.702,193],[2.704,193],[2.713,191],[2.714,191],[2.724,189],[2.726,188],[2.735,187],[2.738,186],[2.747,182],[2.749,181],[2.758,179],[2.759,179],[2.769,177],[2.770,177],[2.775,178],[2.776,178],[2.780,179],[2.787,182],[2.790,182],[2.800,184],[2.802,184],[2.812,184],[2.813,185],[2.822,188],[2.824,188],[2.834,191],[2.834,191],[2.844,193],[2.845,193],[2.854,196],[2.856,196],[2.865,198],[2.866,199],[2.876,200],[2.877,201],[2.887,202],[2.888,202],[2.898,203],[2.899,203],[2.908,204],[2.910,204],[2.919,208],[2.922,209],[2.932,211],[2.933,211],[2.942,212],[2.943,212],[2.952,211],[2.954,211],[2.962,212],[2.964,213],[2.973,215],[2.975,215],[2.985,212],[2.986,211],[2.995,208],[2.997,207],[3.006,206],[3.008,206],[3.017,204],[3.019,204],[3.028,200],[3.030,200],[3.040,199],[3.041,199],[3.051,195],[3.053,194],[3.062,189],[3.064,189],[3.074,188],[3.075,188],[3.085,186],[3.086,185],[3.096,184],[3.098,184],[3.107,182],[3.108,182],[3.117,184],[3.118,184],[3.127,186],[3.129,186],[3.138,186],[3.139,187],[3.149,191],[3.150,190],[3.160,192],[3.162,192],[3.171,195],[3.173,195],[3.182,192],[3.183,192],[3.193,191],[3.194,190],[3.203,192],[3.205,193],[3.214,196],[3.215,196],[3.224,195],[3.225,195],[3.233,193],[3.236,192],[3.246,191],[3.247,191],[3.256,193],[3.258,194],[3.267,196],[3.268,197],[3.278,201],[3.279,201],[3.289,201],[3.290,200],[3.300,202],[3.301,202],[3.310,200],[3.311,199],[3.321,198],[3.323,198],[3.333,200],[3.334,200],[3.344,202],[3.345,202],[3.355,203],[3.356,203],[3.366,199],[3.367,199],[3.376,195],[3.377,194],[3.386,193],[3.388,192],[3.397,193],[3.398,193],[3.407,192],[3.408,192],[3.418,191],[3.420,191],[3.430,191],[3.432,191],[3.441,193],[3.442,194],[3.451,197],[3.453,197],[3.463,197],[3.464,196],[3.474,192],[3.475,192],[3.485,190],[3.487,190],[3.496,191],[3.497,192],[3.507,192],[3.509,192],[3.518,189],[3.519,189],[3.529,185],[3.530,185],[3.540,181],[3.541,181],[3.550,178],[3.551,178],[3.561,176],[3.562,176],[3.570,176],[3.572,176],[3.582,178],[3.583,178],[3.593,179],[3.594,179],[3.603,181],[3.604,181],[3.614,179],[3.614,179],[3.624,175],[3.625,175],[3.635,172],[3.636,171],[3.645,168],[3.646,168],[3.656,166],[3.658,166],[3.668,169],[3.670,170],[3.679,172],[3.681,172],[3.690,169],[3.692,169],[3.701,167],[3.703,167],[3.712,166],[3.714,166],[3.723,165],[3.725,164],[3.734,165],[3.735,165],[3.745,166],[3.745,166],[3.755,167],[3.756,167],[3.765,163],[3.767,162],[3.775,158],[3.777,158],[3.787,157],[3.787,157],[3.797,153],[3.798,153],[3.808,151],[3.808,150],[3.818,144],[3.819,144],[3.828,139],[3.829,139],[3.838,136],[3.840,135],[3.850,131],[3.851,130],[3.860,128],[3.861,128],[3.871,121],[3.872,121],[3.881,117],[3.883,117],[3.892,110],[3.893,110],[3.903,108],[3.904,108],[3.914,109],[3.915,110],[3.924,103],[3.926,102],[3.935,99],[3.937,99],[3.947,92],[3.948,91],[3.957,90],[3.958,90],[3.967,94],[3.968,95],[3.978,99],[3.979,100],[3.988,105],[3.989,105],[3.999,108],[4.000,108],[4.010,107],[4.011,106],[4.021,102],[4.022,102],[4.031,97],[4.033,97],[4.042,92],[4.044,92],[4.054,89],[4.055,88],[4.064,85],[4.065,85],[4.075,81],[4.077,81],[4.086,78],[4.087,78],[4.096,75],[4.098,75],[4.107,73],[4.109,73],[4.119,69],[4.120,69],[4.130,64],[4.131,64],[4.140,60],[4.142,59],[4.151,60],[4.153,60],[4.162,59],[4.167,59],[4.172,58],[4.180,57],[4.187,57],[4.194,56],[4.202,56],[4.211,55],[4.220,55],[4.228,54],[4.236,54],[4.245,54],[4.255,53],[4.264,54],[4.273,53],[4.282,52],[4.291,51],[4.298,51],[4.307,49],[4.315,48],[4.324,46],[4.333,44],[4.343,42],[4.352,41],[4.363,41],[4.373,41],[4.384,41],[4.395,41],[4.406,41],[4.416,41],[4.426,41],[4.435,40],[4.447,40],[4.454,39],[4.467,39],[4.476,39],[4.476,39],[4.486,38]];

const TRACK_D5_CAGARRAO = [[37.75005,-25.20239],[37.75010,-25.20239],[37.75014,-25.20236],[37.75019,-25.20236],[37.75024,-25.20234],[37.75028,-25.20233],[37.75033,-25.20234],[37.75037,-25.20232],[37.75042,-25.20231],[37.75046,-25.20232],[37.75051,-25.20233],[37.75056,-25.20234],[37.75061,-25.20232],[37.75065,-25.20228],[37.75070,-25.20227],[37.75075,-25.20226],[37.75079,-25.20226],[37.75085,-25.20226],[37.75090,-25.20226],[37.75096,-25.20225],[37.75100,-25.20227],[37.75105,-25.20229],[37.75109,-25.20230],[37.75113,-25.20235],[37.75117,-25.20238],[37.75122,-25.20241],[37.75127,-25.20241],[37.75131,-25.20238],[37.75135,-25.20238],[37.75140,-25.20240],[37.75145,-25.20242],[37.75151,-25.20243],[37.75156,-25.20243],[37.75161,-25.20241],[37.75165,-25.20241],[37.75169,-25.20238],[37.75174,-25.20238],[37.75177,-25.20241],[37.75182,-25.20243],[37.75186,-25.20246],[37.75188,-25.20251],[37.75192,-25.20253],[37.75197,-25.20254],[37.75202,-25.20254],[37.75206,-25.20251],[37.75212,-25.20251],[37.75216,-25.20254],[37.75221,-25.20254],[37.75226,-25.20254],[37.75230,-25.20256],[37.75234,-25.20259],[37.75239,-25.20260],[37.75241,-25.20265],[37.75244,-25.20271],[37.75248,-25.20274],[37.75252,-25.20276],[37.75254,-25.20271],[37.75250,-25.20267],[37.75253,-25.20260],[37.75258,-25.20260],[37.75262,-25.20258],[37.75267,-25.20257],[37.75272,-25.20255],[37.75276,-25.20254],[37.75281,-25.20253],[37.75286,-25.20256],[37.75290,-25.20254],[37.75293,-25.20249],[37.75297,-25.20246],[37.75301,-25.20245],[37.75305,-25.20241],[37.75309,-25.20236],[37.75312,-25.20232],[37.75316,-25.20227],[37.75321,-25.20222],[37.75323,-25.20217],[37.75327,-25.20212],[37.75332,-25.20209],[37.75336,-25.20208],[37.75341,-25.20207],[37.75346,-25.20205],[37.75350,-25.20204],[37.75354,-25.20201],[37.75358,-25.20196],[37.75363,-25.20193],[37.75368,-25.20190],[37.75372,-25.20187],[37.75375,-25.20184],[37.75380,-25.20179],[37.75384,-25.20176],[37.75388,-25.20172],[37.75392,-25.20169],[37.75396,-25.20165],[37.75400,-25.20162],[37.75404,-25.20159],[37.75407,-25.20155],[37.75411,-25.20152],[37.75417,-25.20150],[37.75423,-25.20149],[37.75427,-25.20146],[37.75432,-25.20143],[37.75436,-25.20141],[37.75440,-25.20137],[37.75444,-25.20134],[37.75447,-25.20130],[37.75742,-25.20102],[37.75745,-25.20098],[37.75743,-25.20093],[37.75748,-25.20092],[37.75751,-25.20087],[37.75755,-25.20090],[37.75760,-25.20089],[37.75765,-25.20089],[37.75769,-25.20090],[37.75767,-25.20095],[37.75767,-25.20101],[37.75771,-25.20103],[37.75768,-25.20107],[37.75767,-25.20113],[37.75765,-25.20118],[37.75761,-25.20121],[37.75759,-25.20127],[37.75760,-25.20133],[37.75763,-25.20129],[37.75767,-25.20126],[37.75772,-25.20125],[37.75776,-25.20123],[37.75779,-25.20119],[37.75784,-25.20117],[37.75789,-25.20114],[37.75793,-25.20110],[37.75798,-25.20108],[37.75802,-25.20106],[37.75806,-25.20102],[37.75808,-25.20096],[37.75809,-25.20090],[37.75811,-25.20084],[37.75812,-25.20078],[37.75815,-25.20073],[37.75818,-25.20068],[37.75821,-25.20064],[37.75826,-25.20062],[37.75831,-25.20060],[37.75834,-25.20056],[37.75837,-25.20051],[37.75839,-25.20045],[37.75842,-25.20041],[37.75846,-25.20037],[37.75851,-25.20037],[37.75855,-25.20039],[37.75860,-25.20041],[37.75864,-25.20037],[37.75864,-25.20031],[37.75865,-25.20025],[37.75864,-25.20019],[37.75865,-25.20013],[37.75864,-25.20006],[37.75863,-25.20000],[37.75864,-25.19994],[37.75867,-25.19989],[37.75871,-25.19985],[37.75875,-25.19984],[37.75880,-25.19983],[37.75884,-25.19979],[37.75886,-25.19974],[37.75887,-25.19968],[37.75889,-25.19963],[37.75893,-25.19959],[37.75895,-25.19954],[37.75897,-25.19949],[37.75898,-25.19943],[37.75900,-25.19938],[37.75903,-25.19933],[37.75907,-25.19930],[37.75912,-25.19930],[37.75915,-25.19925],[37.75918,-25.19921],[37.75923,-25.19920],[37.75928,-25.19919],[37.75933,-25.19917],[37.75937,-25.19915],[37.75942,-25.19913],[37.75947,-25.19912],[37.75952,-25.19910],[37.75956,-25.19910],[37.75961,-25.19907],[37.75963,-25.19901],[37.75966,-25.19895],[37.75966,-25.19889],[37.75964,-25.19884],[37.75966,-25.19879],[37.75971,-25.19877],[37.75975,-25.19873],[37.75979,-25.19870],[37.75980,-25.19864],[37.75983,-25.19857],[37.75980,-25.19852],[37.75977,-25.19847],[37.75976,-25.19841],[37.75980,-25.19837],[37.75985,-25.19836],[37.75990,-25.19836],[37.75996,-25.19837],[37.76000,-25.19836],[37.76005,-25.19836],[37.76008,-25.19831],[37.76013,-25.19827],[37.76015,-25.19822],[37.76020,-25.19820],[37.76024,-25.19819],[37.76030,-25.19821],[37.76034,-25.19824],[37.76038,-25.19827],[37.76043,-25.19828],[37.76048,-25.19826],[37.76053,-25.19825],[37.76053,-25.19819],[37.76051,-25.19814],[37.76047,-25.19810],[37.76043,-25.19809],[37.76040,-25.19804],[37.76040,-25.19798],[37.76040,-25.19793],[37.76042,-25.19787],[37.76038,-25.19787],[37.76033,-25.19789],[37.76032,-25.19783],[37.76037,-25.19780],[37.76042,-25.19778],[37.76046,-25.19781],[37.76049,-25.19776],[37.76049,-25.19770],[37.76049,-25.19777],[37.76047,-25.19782],[37.76046,-25.19776],[37.76046,-25.19770],[37.76048,-25.19762],[37.76052,-25.19757],[37.76053,-25.19751],[37.76054,-25.19744],[37.76056,-25.19739],[37.76059,-25.19734],[37.76062,-25.19729],[37.76062,-25.19723],[37.76066,-25.19719],[37.76070,-25.19714],[37.76072,-25.19708],[37.76071,-25.19702],[37.76070,-25.19696],[37.76069,-25.19690],[37.76069,-25.19684],[37.76072,-25.19680],[37.76076,-25.19679],[37.76071,-25.19680],[37.76071,-25.19674],[37.76076,-25.19673],[37.76080,-25.19674],[37.76084,-25.19671],[37.76085,-25.19666],[37.76081,-25.19665],[37.76078,-25.19661],[37.76076,-25.19666],[37.76080,-25.19666],[37.76082,-25.19672],[37.76079,-25.19675],[37.76078,-25.19682],[37.76077,-25.19688],[37.76077,-25.19694],[37.76078,-25.19701],[37.76078,-25.19707],[37.76078,-25.19713],[37.76075,-25.19716],[37.76071,-25.19719],[37.76066,-25.19715],[37.76062,-25.19712],[37.76060,-25.19706],[37.76057,-25.19701],[37.76053,-25.19702],[37.76048,-25.19701],[37.76045,-25.19707],[37.76043,-25.19713],[37.76041,-25.19719],[37.76039,-25.19725],[37.76036,-25.19720],[37.76037,-25.19714],[37.76039,-25.19708],[37.76042,-25.19703],[37.76038,-25.19708],[37.76036,-25.19713],[37.76035,-25.19719],[37.76038,-25.19713],[37.76039,-25.19707],[37.76043,-25.19704],[37.76048,-25.19701],[37.76049,-25.19695],[37.76054,-25.19693],[37.76051,-25.19698],[37.76051,-25.19703],[37.76055,-25.19702],[37.76059,-25.19698],[37.76059,-25.19692],[37.76055,-25.19690],[37.76050,-25.19691],[37.76045,-25.19692],[37.76043,-25.19699],[37.76041,-25.19705],[37.76040,-25.19711],[37.76039,-25.19717],[37.76038,-25.19723],[37.76042,-25.19727],[37.76044,-25.19732],[37.76047,-25.19726],[37.76049,-25.19719],[37.76053,-25.19724],[37.76054,-25.19730],[37.76054,-25.19736],[37.76053,-25.19741],[37.76051,-25.19747],[37.76049,-25.19752],[37.76044,-25.19756],[37.76043,-25.19761],[37.76043,-25.19767],[37.76043,-25.19773],[37.76046,-25.19778],[37.76046,-25.19784],[37.76045,-25.19790],[37.76042,-25.19795],[37.76037,-25.19794],[37.76033,-25.19791],[37.76028,-25.19791],[37.76032,-25.19796],[37.76036,-25.19795],[37.76039,-25.19800],[37.76038,-25.19805],[37.76041,-25.19809],[37.76044,-25.19814],[37.76047,-25.19817],[37.76051,-25.19822],[37.76050,-25.19828],[37.76047,-25.19833],[37.76044,-25.19837],[37.76039,-25.19835],[37.76035,-25.19834],[37.76032,-25.19829],[37.76030,-25.19824],[37.76025,-25.19823],[37.76020,-25.19824],[37.76015,-25.19826],[37.76011,-25.19830],[37.76007,-25.19834],[37.76003,-25.19837],[37.76000,-25.19841],[37.75999,-25.19847],[37.75995,-25.19851],[37.75991,-25.19854],[37.75987,-25.19858],[37.75982,-25.19859],[37.75978,-25.19863],[37.75979,-25.19869],[37.75979,-25.19875],[37.75978,-25.19881],[37.75974,-25.19883],[37.75969,-25.19884],[37.75970,-25.19890],[37.75971,-25.19896],[37.75972,-25.19902],[37.75973,-25.19908],[37.75976,-25.19913],[37.75980,-25.19917],[37.75982,-25.19922],[37.75984,-25.19927],[37.75986,-25.19933],[37.75989,-25.19937],[37.75994,-25.19937],[37.75999,-25.19938],[37.76004,-25.19937],[37.76004,-25.19931],[37.76003,-25.19925],[37.76002,-25.19918],[37.76002,-25.19912],[37.76006,-25.19908],[37.76009,-25.19905],[37.76012,-25.19909],[37.76014,-25.19915],[37.76017,-25.19919],[37.76020,-25.19924],[37.76024,-25.19928],[37.76026,-25.19934],[37.76028,-25.19939],[37.76032,-25.19936],[37.76033,-25.19930],[37.76033,-25.19924],[37.76031,-25.19918],[37.76029,-25.19913],[37.76027,-25.19907],[37.76031,-25.19903],[37.76035,-25.19901],[37.76040,-25.19901],[37.76045,-25.19902],[37.76049,-25.19905],[37.76053,-25.19908],[37.76058,-25.19907],[37.76063,-25.19904],[37.76067,-25.19900],[37.76071,-25.19897],[37.76076,-25.19898],[37.76078,-25.19903],[37.76082,-25.19904],[37.76088,-25.19902],[37.76091,-25.19898],[37.76096,-25.19895],[37.76100,-25.19893],[37.76103,-25.19888],[37.76103,-25.19882],[37.76107,-25.19880],[37.76111,-25.19884],[37.76115,-25.19888],[37.76114,-25.19881],[37.76113,-25.19875],[37.76112,-25.19868],[37.76110,-25.19862],[37.76111,-25.19856],[37.76113,-25.19851],[37.76116,-25.19847],[37.76118,-25.19841],[37.76121,-25.19837],[37.76126,-25.19838],[37.76128,-25.19833],[37.76127,-25.19826],[37.76128,-25.19820],[37.76132,-25.19817],[37.76137,-25.19815],[37.76141,-25.19811],[37.76143,-25.19805],[37.76146,-25.19800],[37.76150,-25.19800],[37.76154,-25.19803],[37.76159,-25.19802],[37.76163,-25.19798],[37.76167,-25.19795],[37.76171,-25.19793],[37.76176,-25.19789],[37.76178,-25.19784],[37.76180,-25.19778],[37.76183,-25.19775],[37.76188,-25.19774],[37.76192,-25.19771],[37.76195,-25.19767],[37.76199,-25.19762],[37.76203,-25.19759],[37.76206,-25.19756],[37.76211,-25.19754],[37.76216,-25.19753],[37.76221,-25.19750],[37.76226,-25.19749],[37.76230,-25.19752],[37.76234,-25.19750],[37.76236,-25.19744],[37.76240,-25.19740],[37.76242,-25.19735],[37.76239,-25.19730],[37.76241,-25.19724],[37.76240,-25.19718],[37.76240,-25.19712],[37.76243,-25.19707],[37.76246,-25.19702],[37.76246,-25.19695],[37.76245,-25.19690],[37.76246,-25.19684],[37.76247,-25.19678],[37.76248,-25.19672],[37.76246,-25.19667],[37.76246,-25.19661],[37.76249,-25.19657],[37.76251,-25.19650],[37.76253,-25.19645],[37.76258,-25.19642],[37.76262,-25.19641],[37.76266,-25.19637],[37.76267,-25.19630],[37.76267,-25.19624],[37.76266,-25.19618],[37.76270,-25.19613],[37.76273,-25.19609],[37.76277,-25.19604],[37.76282,-25.19602],[37.76286,-25.19601],[37.76291,-25.19599],[37.76296,-25.19601],[37.76301,-25.19604],[37.76304,-25.19600],[37.76308,-25.19598],[37.76313,-25.19599],[37.76318,-25.19597],[37.76322,-25.19596],[37.76327,-25.19593],[37.76332,-25.19591],[37.76337,-25.19589],[37.76341,-25.19587],[37.76340,-25.19581],[37.76338,-25.19576],[37.76335,-25.19570],[37.76334,-25.19565],[37.76337,-25.19558],[37.76340,-25.19553],[37.76345,-25.19552],[37.76350,-25.19551],[37.76355,-25.19552],[37.76359,-25.19555],[37.76363,-25.19559],[37.76368,-25.19558],[37.76372,-25.19558],[37.76376,-25.19553],[37.76379,-25.19549],[37.76384,-25.19547],[37.76385,-25.19542],[37.76385,-25.19536],[37.76387,-25.19531],[37.76389,-25.19525],[37.76390,-25.19520],[37.76395,-25.19518],[37.76400,-25.19515],[37.76405,-25.19515],[37.76409,-25.19517],[37.76413,-25.19519],[37.76418,-25.19520],[37.76419,-25.19526],[37.76423,-25.19530],[37.76426,-25.19534],[37.76429,-25.19539],[37.76434,-25.19542],[37.76439,-25.19544],[37.76443,-25.19542],[37.76445,-25.19548],[37.76449,-25.19550],[37.76455,-25.19551],[37.76460,-25.19554],[37.76465,-25.19558],[37.76470,-25.19560],[37.76474,-25.19563],[37.76478,-25.19566],[37.76482,-25.19564],[37.76486,-25.19560],[37.76488,-25.19554],[37.76488,-25.19547],[37.76485,-25.19542],[37.76486,-25.19536],[37.76490,-25.19533],[37.76494,-25.19530],[37.76497,-25.19525],[37.76501,-25.19521],[37.76505,-25.19519],[37.76510,-25.19522],[37.76514,-25.19519],[37.76516,-25.19513],[37.76518,-25.19507],[37.76521,-25.19503],[37.76524,-25.19499],[37.76529,-25.19497],[37.76534,-25.19497],[37.76539,-25.19497],[37.76539,-25.19490],[37.76542,-25.19484],[37.76546,-25.19480],[37.76550,-25.19477],[37.76554,-25.19474],[37.76557,-25.19469],[37.76559,-25.19465],[37.76564,-25.19461],[37.76568,-25.19459],[37.76573,-25.19461],[37.76577,-25.19464],[37.76580,-25.19468],[37.76583,-25.19472],[37.76588,-25.19474],[37.76592,-25.19474],[37.76597,-25.19478],[37.76601,-25.19479],[37.76604,-25.19484],[37.76605,-25.19490],[37.76606,-25.19497],[37.76607,-25.19502],[37.76610,-25.19507],[37.76615,-25.19508],[37.76620,-25.19505],[37.76624,-25.19504],[37.76621,-25.19510],[37.76626,-25.19509],[37.76631,-25.19511],[37.76636,-25.19514],[37.76641,-25.19515],[37.76645,-25.19516],[37.76647,-25.19521],[37.76651,-25.19517],[37.76655,-25.19515],[37.76660,-25.19514],[37.76664,-25.19511],[37.76668,-25.19507],[37.76672,-25.19506],[37.76671,-25.19511],[37.76672,-25.19505],[37.76669,-25.19500],[37.76665,-25.19503],[37.76668,-25.19508],[37.76667,-25.19502],[37.76663,-25.19500],[37.76660,-25.19496],[37.76658,-25.19490],[37.76653,-25.19487],[37.76651,-25.19482],[37.76650,-25.19476],[37.76647,-25.19469],[37.76646,-25.19464],[37.76644,-25.19458],[37.76642,-25.19453],[37.76640,-25.19447],[37.76639,-25.19442],[37.76637,-25.19436],[37.76637,-25.19430],[37.76636,-25.19424],[37.76634,-25.19418],[37.76630,-25.19413],[37.76626,-25.19410],[37.76624,-25.19404],[37.76623,-25.19398],[37.76627,-25.19399],[37.76627,-25.19393],[37.76628,-25.19387],[37.76631,-25.19382],[37.76634,-25.19377],[37.76637,-25.19372],[37.76638,-25.19366],[37.76638,-25.19360],[37.76638,-25.19354],[37.76634,-25.19350],[37.76636,-25.19344],[37.76638,-25.19339],[37.76640,-25.19332],[37.76644,-25.19327],[37.76647,-25.19322],[37.76651,-25.19319],[37.76655,-25.19315],[37.76657,-25.19309],[37.76660,-25.19304],[37.76662,-25.19298],[37.76665,-25.19292],[37.76667,-25.19286],[37.76671,-25.19283],[37.76676,-25.19283],[37.76681,-25.19282],[37.76686,-25.19283],[37.76690,-25.19285],[37.76695,-25.19288],[37.76699,-25.19289],[37.76704,-25.19291],[37.76709,-25.19290],[37.76714,-25.19292],[37.76719,-25.19294],[37.76723,-25.19295],[37.76719,-25.19296],[37.76718,-25.19290],[37.76717,-25.19284],[37.76714,-25.19280],[37.76710,-25.19276],[37.76708,-25.19271],[37.76706,-25.19265],[37.76710,-25.19261],[37.76714,-25.19258],[37.76717,-25.19253],[37.76714,-25.19248],[37.76709,-25.19245],[37.76706,-25.19239],[37.76704,-25.19234],[37.76700,-25.19231],[37.76695,-25.19232],[37.76691,-25.19230],[37.76687,-25.19225],[37.76682,-25.19224],[37.76677,-25.19225],[37.76672,-25.19223],[37.76668,-25.19220],[37.76664,-25.19216],[37.76662,-25.19211],[37.76657,-25.19208],[37.76653,-25.19206],[37.76648,-25.19209],[37.76650,-25.19215],[37.76654,-25.19218],[37.76650,-25.19222],[37.76644,-25.19221],[37.76639,-25.19220],[37.76636,-25.19216],[37.76632,-25.19211],[37.76633,-25.19204],[37.76634,-25.19198],[37.76635,-25.19192],[37.76632,-25.19187],[37.76629,-25.19183],[37.76628,-25.19177],[37.76630,-25.19171],[37.76627,-25.19166],[37.76624,-25.19162],[37.76621,-25.19157],[37.76618,-25.19152],[37.76616,-25.19146],[37.76613,-25.19142],[37.76608,-25.19139],[37.76608,-25.19133],[37.76609,-25.19127],[37.76611,-25.19121],[37.76612,-25.19115],[37.76613,-25.19109],[37.76611,-25.19105],[37.76610,-25.19099],[37.76611,-25.19093],[37.76609,-25.19087],[37.76606,-25.19083],[37.76605,-25.19077],[37.76606,-25.19071],[37.76608,-25.19065],[37.76613,-25.19063],[37.76617,-25.19060],[37.76622,-25.19060],[37.76625,-25.19055],[37.76629,-25.19052],[37.76632,-25.19048],[37.76637,-25.19046],[37.76640,-25.19049],[37.76639,-25.19044],[37.76634,-25.19040],[37.76629,-25.19040],[37.76624,-25.19039],[37.76620,-25.19036],[37.76617,-25.19029],[37.76613,-25.19033],[37.76613,-25.19027],[37.76609,-25.19025],[37.76604,-25.19026],[37.76600,-25.19023],[37.76596,-25.19019],[37.76593,-25.19014],[37.76590,-25.19009],[37.76587,-25.19014],[37.76583,-25.19019],[37.76578,-25.19019],[37.76575,-25.19014],[37.76571,-25.19012],[37.76566,-25.19011],[37.76561,-25.19009],[37.76556,-25.19010],[37.76552,-25.19009],[37.76547,-25.19009],[37.76543,-25.19006],[37.76538,-25.19006],[37.76534,-25.19003],[37.76531,-25.18998],[37.76526,-25.18997],[37.76521,-25.18998],[37.76516,-25.18999],[37.76511,-25.19002],[37.76506,-25.19005],[37.76504,-25.19010],[37.76501,-25.19006],[37.76497,-25.19003],[37.76494,-25.18998],[37.76490,-25.18995],[37.76487,-25.18990],[37.76487,-25.18984],[37.76494,-25.18984],[37.76498,-25.18986],[37.76500,-25.18991],[37.76506,-25.18991],[37.76511,-25.18989],[37.76515,-25.18987],[37.76517,-25.18981],[37.76515,-25.18976],[37.76511,-25.18972],[37.76508,-25.18965],[37.76504,-25.18959],[37.76500,-25.18956],[37.76494,-25.18951],[37.76492,-25.18945],[37.76492,-25.18938],[37.76493,-25.18932],[37.76493,-25.18926],[37.76493,-25.18919],[37.76492,-25.18913],[37.76490,-25.18907],[37.76487,-25.18903],[37.76482,-25.18903],[37.76485,-25.18908],[37.76489,-25.18910],[37.76494,-25.18911],[37.76498,-25.18914],[37.76502,-25.18917],[37.76506,-25.18920],[37.76510,-25.18924],[37.76506,-25.18928],[37.76501,-25.18929],[37.76500,-25.18924],[37.76506,-25.18926],[37.76508,-25.18931],[37.76506,-25.18926],[37.76508,-25.18932],[37.76503,-25.18933],[37.76508,-25.18934],[37.76514,-25.18933],[37.76519,-25.18931],[37.76514,-25.18932],[37.76511,-25.18939],[37.76513,-25.18931],[37.76511,-25.18925],[37.76507,-25.18922],[37.76509,-25.18928],[37.76504,-25.18929],[37.76499,-25.18929],[37.76503,-25.18933],[37.76498,-25.18932],[37.76492,-25.18934],[37.76491,-25.18941],[37.76487,-25.18944],[37.76481,-25.18944],[37.76475,-25.18942],[37.76479,-25.18940],[37.76475,-25.18941],[37.76480,-25.18940],[37.76484,-25.18941],[37.76488,-25.18945],[37.76493,-25.18950],[37.76494,-25.18956],[37.76497,-25.18961],[37.76500,-25.18956],[37.76496,-25.18959],[37.76497,-25.18965],[37.76501,-25.18968],[37.76498,-25.18973],[37.76493,-25.18973],[37.76493,-25.18979],[37.76496,-25.18984],[37.76498,-25.18989],[37.76501,-25.18994],[37.76503,-25.19000],[37.76508,-25.19001],[37.76513,-25.19000],[37.76516,-25.18996],[37.76521,-25.18995],[37.76526,-25.18995],[37.76530,-25.18997],[37.76534,-25.18999],[37.76539,-25.18996],[37.76544,-25.18995],[37.76545,-25.19000],[37.76541,-25.19004],[37.76546,-25.19006],[37.76550,-25.19008],[37.76556,-25.19011],[37.76561,-25.19012],[37.76566,-25.19011],[37.76572,-25.19013],[37.76576,-25.19016],[37.76580,-25.19020],[37.76585,-25.19021],[37.76590,-25.19019],[37.76593,-25.19015],[37.76593,-25.19008],[37.76597,-25.19004],[37.76602,-25.19003],[37.76605,-25.19007],[37.76608,-25.19012],[37.76611,-25.19016],[37.76615,-25.19019],[37.76620,-25.19021],[37.76624,-25.19025],[37.76625,-25.19031],[37.76625,-25.19038],[37.76626,-25.19044],[37.76629,-25.19048],[37.76631,-25.19053],[37.76633,-25.19059],[37.76630,-25.19064],[37.76628,-25.19070],[37.76629,-25.19064],[37.76629,-25.19058],[37.76625,-25.19055],[37.76620,-25.19057],[37.76618,-25.19062],[37.76614,-25.19066],[37.76610,-25.19070],[37.76607,-25.19074],[37.76607,-25.19080],[37.76607,-25.19086],[37.76609,-25.19092],[37.76611,-25.19098],[37.76611,-25.19104],[37.76609,-25.19110],[37.76607,-25.19116],[37.76606,-25.19122],[37.76608,-25.19128],[37.76611,-25.19133],[37.76613,-25.19138],[37.76616,-25.19143],[37.76621,-25.19146],[37.76624,-25.19151],[37.76626,-25.19157],[37.76628,-25.19162],[37.76632,-25.19167],[37.76636,-25.19169],[37.76636,-25.19175],[37.76634,-25.19181],[37.76635,-25.19187],[37.76636,-25.19193],[37.76638,-25.19199],[37.76641,-25.19205],[37.76644,-25.19209],[37.76647,-25.19213],[37.76651,-25.19217],[37.76656,-25.19217],[37.76660,-25.19219],[37.76661,-25.19213],[37.76656,-25.19209],[37.76655,-25.19204],[37.76659,-25.19202],[37.76662,-25.19206],[37.76666,-25.19211],[37.76671,-25.19214],[37.76675,-25.19218],[37.76678,-25.19223],[37.76682,-25.19225],[37.76687,-25.19228],[37.76693,-25.19229],[37.76697,-25.19228],[37.76702,-25.19230],[37.76698,-25.19235],[37.76703,-25.19234],[37.76708,-25.19233],[37.76713,-25.19238],[37.76716,-25.19243],[37.76719,-25.19248],[37.76723,-25.19253],[37.76724,-25.19259],[37.76721,-25.19263],[37.76715,-25.19263],[37.76711,-25.19260],[37.76706,-25.19259],[37.76703,-25.19263],[37.76703,-25.19270],[37.76706,-25.19274],[37.76710,-25.19279],[37.76715,-25.19282],[37.76719,-25.19285],[37.76723,-25.19290],[37.76723,-25.19296],[37.76720,-25.19300],[37.76715,-25.19297],[37.76711,-25.19293],[37.76707,-25.19290],[37.76703,-25.19290],[37.76698,-25.19291],[37.76694,-25.19292],[37.76689,-25.19290],[37.76687,-25.19285],[37.76682,-25.19284],[37.76678,-25.19287],[37.76673,-25.19288],[37.76669,-25.19292],[37.76665,-25.19296],[37.76661,-25.19299],[37.76657,-25.19303],[37.76653,-25.19306],[37.76650,-25.19311],[37.76647,-25.19316],[37.76643,-25.19320],[37.76639,-25.19323],[37.76637,-25.19328],[37.76634,-25.19334],[37.76632,-25.19339],[37.76631,-25.19345],[37.76632,-25.19351],[37.76631,-25.19357],[37.76633,-25.19362],[37.76633,-25.19368],[37.76633,-25.19374],[37.76631,-25.19380],[37.76628,-25.19386],[37.76626,-25.19392],[37.76624,-25.19398],[37.76622,-25.19403],[37.76623,-25.19410],[37.76626,-25.19416],[37.76630,-25.19420],[37.76633,-25.19425],[37.76635,-25.19430],[37.76637,-25.19435],[37.76638,-25.19442],[37.76641,-25.19446],[37.76643,-25.19453],[37.76644,-25.19459],[37.76647,-25.19464],[37.76650,-25.19468],[37.76654,-25.19472],[37.76659,-25.19475],[37.76664,-25.19476],[37.76667,-25.19480],[37.76667,-25.19488],[37.76666,-25.19494],[37.76666,-25.19500],[37.76669,-25.19504],[37.76668,-25.19510],[37.76664,-25.19513],[37.76658,-25.19512],[37.76654,-25.19513],[37.76650,-25.19516],[37.76644,-25.19518],[37.76640,-25.19520],[37.76642,-25.19514],[37.76639,-25.19509],[37.76634,-25.19507],[37.76630,-25.19505],[37.76626,-25.19502],[37.76622,-25.19497],[37.76617,-25.19494],[37.76615,-25.19500],[37.76620,-25.19498],[37.76625,-25.19497],[37.76621,-25.19493],[37.76616,-25.19493],[37.76611,-25.19493],[37.76608,-25.19488],[37.76606,-25.19482],[37.76603,-25.19477],[37.76598,-25.19472],[37.76596,-25.19467],[37.76591,-25.19464],[37.76586,-25.19463],[37.76584,-25.19457],[37.76579,-25.19459],[37.76574,-25.19462],[37.76570,-25.19465],[37.76566,-25.19469],[37.76562,-25.19473],[37.76558,-25.19474],[37.76554,-25.19470],[37.76549,-25.19471],[37.76545,-25.19470],[37.76539,-25.19471],[37.76535,-25.19474],[37.76532,-25.19479],[37.76530,-25.19484],[37.76530,-25.19490],[37.76529,-25.19497],[37.76524,-25.19499],[37.76520,-25.19503],[37.76517,-25.19507],[37.76512,-25.19510],[37.76511,-25.19515],[37.76506,-25.19519],[37.76502,-25.19521],[37.76497,-25.19523],[37.76492,-25.19526],[37.76490,-25.19531],[37.76489,-25.19538],[37.76489,-25.19544],[37.76491,-25.19549],[37.76493,-25.19555],[37.76490,-25.19560],[37.76486,-25.19564],[37.76481,-25.19565],[37.76476,-25.19565],[37.76472,-25.19563],[37.76468,-25.19560],[37.76465,-25.19556],[37.76463,-25.19551],[37.76460,-25.19546],[37.76455,-25.19545],[37.76450,-25.19544],[37.76446,-25.19542],[37.76443,-25.19537],[37.76439,-25.19533],[37.76435,-25.19529],[37.76430,-25.19529],[37.76425,-25.19527],[37.76421,-25.19524],[37.76417,-25.19521],[37.76414,-25.19517],[37.76411,-25.19512],[37.76407,-25.19510],[37.76402,-25.19512],[37.76399,-25.19516],[37.76397,-25.19523],[37.76392,-25.19525],[37.76388,-25.19528],[37.76384,-25.19532],[37.76379,-25.19535],[37.76375,-25.19538],[37.76371,-25.19540],[37.76367,-25.19545],[37.76364,-25.19549],[37.76361,-25.19553],[37.76358,-25.19558],[37.76361,-25.19563],[37.76357,-25.19567],[37.76352,-25.19566],[37.76347,-25.19564],[37.76343,-25.19561],[37.76338,-25.19561],[37.76335,-25.19565],[37.76334,-25.19572],[37.76335,-25.19579],[37.76335,-25.19585],[37.76337,-25.19591],[37.76334,-25.19597],[37.76330,-25.19599],[37.76325,-25.19597],[37.76320,-25.19598],[37.76316,-25.19600],[37.76311,-25.19602],[37.76307,-25.19598],[37.76303,-25.19598],[37.76297,-25.19598],[37.76293,-25.19597],[37.76288,-25.19594],[37.76284,-25.19598],[37.76280,-25.19602],[37.76276,-25.19606],[37.76270,-25.19607],[37.76266,-25.19611],[37.76264,-25.19617],[37.76263,-25.19623],[37.76264,-25.19630],[37.76263,-25.19636],[37.76260,-25.19641],[37.76256,-25.19645],[37.76252,-25.19649],[37.76248,-25.19653],[37.76246,-25.19658],[37.76242,-25.19663],[37.76238,-25.19666],[37.76235,-25.19670],[37.76234,-25.19677],[37.76234,-25.19683],[37.76235,-25.19689],[37.76237,-25.19694],[37.76240,-25.19698],[37.76239,-25.19705],[37.76235,-25.19710],[37.76232,-25.19714],[37.76233,-25.19720],[37.76231,-25.19726],[37.76229,-25.19732],[37.76228,-25.19738],[37.76229,-25.19743],[37.76228,-25.19750],[37.76226,-25.19756],[37.76228,-25.19761],[37.76228,-25.19767],[37.76226,-25.19772],[37.76222,-25.19775],[37.76217,-25.19771],[37.76212,-25.19769],[37.76207,-25.19767],[37.76202,-25.19765],[37.76198,-25.19760],[37.76194,-25.19761],[37.76189,-25.19764],[37.76185,-25.19767],[37.76181,-25.19770],[37.76177,-25.19773],[37.76174,-25.19778],[37.76171,-25.19783],[37.76167,-25.19785],[37.76163,-25.19788],[37.76158,-25.19791],[37.76154,-25.19795],[37.76149,-25.19797],[37.76145,-25.19793],[37.76141,-25.19790],[37.76136,-25.19789],[37.76132,-25.19794],[37.76131,-25.19800],[37.76130,-25.19806],[37.76129,-25.19812],[37.76129,-25.19818],[37.76129,-25.19824],[37.76130,-25.19830],[37.76128,-25.19835],[37.76123,-25.19837],[37.76119,-25.19835],[37.76114,-25.19836],[37.76109,-25.19839],[37.76108,-25.19845],[37.76109,-25.19851],[37.76109,-25.19857],[37.76107,-25.19863],[37.76104,-25.19869],[37.76102,-25.19874],[37.76100,-25.19880],[37.76096,-25.19882],[37.76091,-25.19880],[37.76087,-25.19883],[37.76086,-25.19889],[37.76086,-25.19895],[37.76085,-25.19902],[37.76080,-25.19901],[37.76075,-25.19901],[37.76071,-25.19900],[37.76067,-25.19901],[37.76061,-25.19901],[37.76058,-25.19898],[37.76053,-25.19895],[37.76049,-25.19893],[37.76045,-25.19894],[37.76041,-25.19898],[37.76037,-25.19900],[37.76032,-25.19902],[37.76027,-25.19903],[37.76023,-25.19906],[37.76020,-25.19911],[37.76017,-25.19914],[37.76013,-25.19919],[37.76012,-25.19925],[37.76009,-25.19921],[37.76005,-25.19918],[37.76005,-25.19912],[37.76001,-25.19913],[37.75997,-25.19909],[37.75992,-25.19909],[37.75990,-25.19903],[37.75991,-25.19898],[37.75993,-25.19903],[37.75995,-25.19909],[37.75997,-25.19915],[37.75995,-25.19921],[37.75993,-25.19927],[37.75989,-25.19922],[37.75986,-25.19918],[37.75981,-25.19917],[37.75976,-25.19917],[37.75972,-25.19914],[37.75969,-25.19908],[37.75970,-25.19903],[37.75967,-25.19898],[37.75964,-25.19892],[37.75960,-25.19889],[37.75955,-25.19887],[37.75952,-25.19883],[37.75950,-25.19878],[37.75954,-25.19880],[37.75959,-25.19881],[37.75963,-25.19882],[37.75959,-25.19886],[37.75961,-25.19892],[37.75963,-25.19899],[37.75963,-25.19906],[37.75961,-25.19911],[37.75958,-25.19916],[37.75953,-25.19918],[37.75948,-25.19918],[37.75943,-25.19918],[37.75939,-25.19917],[37.75934,-25.19919],[37.75929,-25.19922],[37.75925,-25.19920],[37.75921,-25.19919],[37.75915,-25.19919],[37.75913,-25.19924],[37.75910,-25.19929],[37.75906,-25.19931],[37.75901,-25.19929],[37.75897,-25.19934],[37.75895,-25.19939],[37.75892,-25.19944],[37.75890,-25.19950],[37.75888,-25.19955],[37.75885,-25.19959],[37.75881,-25.19962],[37.75877,-25.19966],[37.75875,-25.19972],[37.75871,-25.19975],[37.75867,-25.19980],[37.75863,-25.19983],[37.75859,-25.19984],[37.75854,-25.19986],[37.75851,-25.19991],[37.75851,-25.19998],[37.75851,-25.20004],[37.75852,-25.20010],[37.75855,-25.20015],[37.75860,-25.20018],[37.75863,-25.20022],[37.75863,-25.20028],[37.75862,-25.20034],[37.75860,-25.20040],[37.75858,-25.20046],[37.75856,-25.20050],[37.75851,-25.20050],[37.75848,-25.20045],[37.75846,-25.20040],[37.75841,-25.20037],[37.75837,-25.20035],[37.75832,-25.20035],[37.75827,-25.20036],[37.75823,-25.20040],[37.75821,-25.20046],[37.75820,-25.20051],[37.75816,-25.20057],[37.75813,-25.20061],[37.75809,-25.20065],[37.75805,-25.20068],[37.75801,-25.20072],[37.75798,-25.20077],[37.75796,-25.20082],[37.75796,-25.20089],[37.75794,-25.20094],[37.75791,-25.20099],[37.75786,-25.20102],[37.75783,-25.20106],[37.75779,-25.20110],[37.75775,-25.20114],[37.75771,-25.20118],[37.75769,-25.20123],[37.75764,-25.20121],[37.75760,-25.20118],[37.75756,-25.20122],[37.75754,-25.20127],[37.75750,-25.20131],[37.75753,-25.20136],[37.75754,-25.20143],[37.75755,-25.20149],[37.75757,-25.20155],[37.75757,-25.20161],[37.75754,-25.20166],[37.75753,-25.20172],[37.75756,-25.20176],[37.75761,-25.20176],[37.75757,-25.20181],[37.75757,-25.20188],[37.75759,-25.20193],[37.75761,-25.20199],[37.75762,-25.20204],[37.75764,-25.20211],[37.75764,-25.20218],[37.75764,-25.20224],[37.75765,-25.20230],[37.75768,-25.20236],[37.75771,-25.20240],[37.75773,-25.20246],[37.75771,-25.20251],[37.75767,-25.20257],[37.75762,-25.20260],[37.75759,-25.20264],[37.75757,-25.20271],[37.75755,-25.20277],[37.75754,-25.20283],[37.75755,-25.20289],[37.75755,-25.20295],[37.75758,-25.20301],[37.75753,-25.20295],[37.75750,-25.20290],[37.75748,-25.20284],[37.75747,-25.20278],[37.75744,-25.20273],[37.75742,-25.20267],[37.75742,-25.20273],[37.75744,-25.20278],[37.75747,-25.20283],[37.75744,-25.20277],[37.75744,-25.20271],[37.75742,-25.20265],[37.75740,-25.20260],[37.75736,-25.20256],[37.75731,-25.20255],[37.75726,-25.20256],[37.75723,-25.20252],[37.75727,-25.20256],[37.75722,-25.20255],[37.75717,-25.20255],[37.75712,-25.20253],[37.75708,-25.20249],[37.75704,-25.20244],[37.75702,-25.20239],[37.75706,-25.20236],[37.75703,-25.20230],[37.75699,-25.20227],[37.75697,-25.20221],[37.75694,-25.20217],[37.75690,-25.20212],[37.75688,-25.20207],[37.75685,-25.20201],[37.75680,-25.20199],[37.75676,-25.20198],[37.75671,-25.20198],[37.75668,-25.20194],[37.75664,-25.20191],[37.75660,-25.20188],[37.75657,-25.20183],[37.75654,-25.20178],[37.75650,-25.20177],[37.75646,-25.20182],[37.75642,-25.20186],[37.75638,-25.20187],[37.75634,-25.20190],[37.75629,-25.20188],[37.75626,-25.20184],[37.75620,-25.20183],[37.75615,-25.20183],[37.75611,-25.20182],[37.75606,-25.20184],[37.75601,-25.20186],[37.75596,-25.20185],[37.75591,-25.20184],[37.75586,-25.20184],[37.75581,-25.20184],[37.75576,-25.20185],[37.75571,-25.20187],[37.75567,-25.20191],[37.75565,-25.20197],[37.75562,-25.20202],[37.75557,-25.20201],[37.75552,-25.20199],[37.75547,-25.20197],[37.75542,-25.20197],[37.75538,-25.20201],[37.75535,-25.20206],[37.75532,-25.20211],[37.75533,-25.20217],[37.75533,-25.20223],[37.75531,-25.20228],[37.75528,-25.20234],[37.75525,-25.20238],[37.75521,-25.20241],[37.75515,-25.20241],[37.75509,-25.20242],[37.75505,-25.20245],[37.75510,-25.20247],[37.75508,-25.20253],[37.75504,-25.20256],[37.75507,-25.20252],[37.75510,-25.20247],[37.75508,-25.20241],[37.75503,-25.20240],[37.75500,-25.20245],[37.75496,-25.20249],[37.75493,-25.20254],[37.75489,-25.20253],[37.75484,-25.20257],[37.75483,-25.20262],[37.75482,-25.20268],[37.75482,-25.20275],[37.75481,-25.20281],[37.75478,-25.20285],[37.75476,-25.20290],[37.75473,-25.20296],[37.75469,-25.20293],[37.75468,-25.20287],[37.75465,-25.20282],[37.75461,-25.20279],[37.75457,-25.20281],[37.75452,-25.20283],[37.75447,-25.20285],[37.75447,-25.20291],[37.75446,-25.20297],[37.75445,-25.20304],[37.75442,-25.20309],[37.75438,-25.20313],[37.75434,-25.20315],[37.75431,-25.20319],[37.75429,-25.20325],[37.75428,-25.20331],[37.75425,-25.20336],[37.75422,-25.20341],[37.75421,-25.20346],[37.75419,-25.20352],[37.75418,-25.20358],[37.75413,-25.20360],[37.75409,-25.20358],[37.75405,-25.20354],[37.75401,-25.20351],[37.75399,-25.20346],[37.75395,-25.20349],[37.75390,-25.20353],[37.75385,-25.20357],[37.75382,-25.20361],[37.75378,-25.20366],[37.75373,-25.20368],[37.75368,-25.20367],[37.75366,-25.20362],[37.75361,-25.20361],[37.75356,-25.20359],[37.75352,-25.20360],[37.75347,-25.20357],[37.75343,-25.20356],[37.75338,-25.20353],[37.75334,-25.20354],[37.75330,-25.20359],[37.75335,-25.20361],[37.75331,-25.20356],[37.75327,-25.20352],[37.75327,-25.20358],[37.75322,-25.20360],[37.75317,-25.20363],[37.75313,-25.20366],[37.75309,-25.20369],[37.75304,-25.20371],[37.75299,-25.20372],[37.75294,-25.20374],[37.75289,-25.20371],[37.75284,-25.20371],[37.75281,-25.20366],[37.75277,-25.20363],[37.75273,-25.20359],[37.75269,-25.20354],[37.75265,-25.20351],[37.75261,-25.20349],[37.75259,-25.20344],[37.75254,-25.20342],[37.75249,-25.20343],[37.75244,-25.20346],[37.75240,-25.20349],[37.75235,-25.20351],[37.75230,-25.20350],[37.75225,-25.20349],[37.75220,-25.20347],[37.75215,-25.20346],[37.75210,-25.20347],[37.75206,-25.20346],[37.75201,-25.20344],[37.75197,-25.20341],[37.75192,-25.20342],[37.75186,-25.20344],[37.75181,-25.20345],[37.75176,-25.20346],[37.75171,-25.20345],[37.75167,-25.20344],[37.75162,-25.20342],[37.75157,-25.20342],[37.75152,-25.20341],[37.75150,-25.20336],[37.75145,-25.20335],[37.75141,-25.20339],[37.75137,-25.20341],[37.75133,-25.20337],[37.75130,-25.20333],[37.75126,-25.20328],[37.75122,-25.20326],[37.75117,-25.20324],[37.75113,-25.20322],[37.75109,-25.20319],[37.75106,-25.20324],[37.75101,-25.20326],[37.75104,-25.20322],[37.75109,-25.20323],[37.75112,-25.20319],[37.75109,-25.20314],[37.75104,-25.20314],[37.75099,-25.20315],[37.75101,-25.20310],[37.75106,-25.20310],[37.75111,-25.20312],[37.75115,-25.20313],[37.75112,-25.20306],[37.75107,-25.20304],[37.75103,-25.20300],[37.75098,-25.20302],[37.75094,-25.20305],[37.75096,-25.20299],[37.75100,-25.20298],[37.75106,-25.20298],[37.75110,-25.20297],[37.75110,-25.20292],[37.75106,-25.20290],[37.75101,-25.20290],[37.75097,-25.20292],[37.75091,-25.20292],[37.75087,-25.20291],[37.75082,-25.20293],[37.75081,-25.20299],[37.75079,-25.20293],[37.75079,-25.20286],[37.75080,-25.20281],[37.75085,-25.20279],[37.75090,-25.20283],[37.75094,-25.20279],[37.75091,-25.20274],[37.75086,-25.20273],[37.75081,-25.20272],[37.75076,-25.20270],[37.75072,-25.20270],[37.75068,-25.20274],[37.75066,-25.20279],[37.75064,-25.20284],[37.75063,-25.20291],[37.75062,-25.20297],[37.75061,-25.20303],[37.75061,-25.20309],[37.75057,-25.20313],[37.75053,-25.20315],[37.75049,-25.20319],[37.75047,-25.20325],[37.75045,-25.20331],[37.75041,-25.20328],[37.75037,-25.20324],[37.75032,-25.20322],[37.75027,-25.20320],[37.75023,-25.20318],[37.75018,-25.20317],[37.75013,-25.20314],[37.75009,-25.20314],[37.75004,-25.20313],[37.74999,-25.20310],[37.74994,-25.20309],[37.74989,-25.20308],[37.74984,-25.20309],[37.74985,-25.20302],[37.74989,-25.20298],[37.74993,-25.20295],[37.74997,-25.20290],[37.75000,-25.20285],[37.75002,-25.20279],[37.75003,-25.20274],[37.75004,-25.20267],[37.75002,-25.20262],[37.74999,-25.20257],[37.74994,-25.20256],[37.74991,-25.20251],[37.74991,-25.20245],[37.74992,-25.20237],[37.74997,-25.20234],[37.75001,-25.20235],[37.75006,-25.20235]];
const PROFILE_D5_CAGARRAO = [[0.000,61],[0.005,61],[0.011,61],[0.016,61],[0.022,61],[0.027,61],[0.032,61],[0.037,61],[0.042,61],[0.047,61],[0.053,61],[0.058,61],[0.064,61],[0.069,61],[0.075,61],[0.080,61],[0.085,61],[0.091,61],[0.097,61],[0.104,61],[0.109,61],[0.115,61],[0.120,61],[0.126,61],[0.131,65],[0.138,69],[0.143,73],[0.148,75],[0.153,75],[0.159,76],[0.165,78],[0.171,78],[0.176,77],[0.182,77],[0.187,78],[0.192,81],[0.197,81],[0.202,79],[0.207,79],[0.212,79],[0.217,78],[0.222,77],[0.228,76],[0.233,77],[0.239,77],[0.245,77],[0.251,77],[0.256,78],[0.261,79],[0.266,81],[0.271,83],[0.277,84],[0.282,85],[0.288,85],[0.293,86],[0.298,88],[0.304,88],[0.309,90],[0.316,92],[0.321,93],[0.327,95],[0.332,96],[0.337,96],[0.343,96],[0.348,96],[0.354,96],[0.360,95],[0.365,94],[0.370,93],[0.375,92],[0.380,92],[0.386,92],[0.392,92],[0.397,91],[0.404,92],[0.410,92],[0.416,93],[0.421,93],[0.427,93],[0.432,93],[0.437,93],[0.443,94],[0.448,94],[0.454,94],[0.460,93],[0.466,93],[0.471,93],[0.476,93],[0.482,93],[0.488,93],[0.493,93],[0.499,93],[0.504,93],[0.509,93],[0.514,93],[0.520,93],[0.525,93],[0.531,93],[0.538,93],[0.543,93],[0.549,93],[0.554,93],[0.560,93],[0.565,93],[0.570,93],[0.899,97],[0.904,101],[0.909,105],[0.915,109],[0.920,113],[0.925,117],[0.931,121],[0.936,125],[0.941,129],[0.946,133],[0.951,137],[0.956,141],[0.961,145],[0.967,149],[0.972,153],[0.977,157],[0.982,161],[0.988,165],[0.993,169],[0.998,173],[1.004,177],[1.009,181],[1.014,185],[1.019,187],[1.025,188],[1.032,188],[1.037,189],[1.042,189],[1.047,189],[1.053,190],[1.059,192],[1.064,194],[1.070,195],[1.075,196],[1.081,196],[1.086,197],[1.091,198],[1.097,197],[1.102,197],[1.107,198],[1.113,199],[1.118,200],[1.124,201],[1.129,201],[1.135,203],[1.140,203],[1.146,205],[1.151,207],[1.156,209],[1.161,208],[1.167,208],[1.172,209],[1.178,210],[1.183,209],[1.189,209],[1.194,209],[1.200,209],[1.205,209],[1.211,210],[1.216,209],[1.221,210],[1.226,211],[1.232,213],[1.237,216],[1.242,217],[1.247,218],[1.252,219],[1.258,221],[1.263,223],[1.268,225],[1.273,227],[1.278,229],[1.284,230],[1.290,231],[1.295,231],[1.300,231],[1.306,232],[1.311,233],[1.317,233],[1.322,232],[1.328,232],[1.334,232],[1.339,233],[1.345,233],[1.350,232],[1.355,232],[1.361,232],[1.366,231],[1.371,231],[1.377,232],[1.384,233],[1.389,234],[1.395,234],[1.400,233],[1.406,232],[1.411,231],[1.417,228],[1.423,226],[1.429,226],[1.434,226],[1.439,223],[1.445,222],[1.451,221],[1.456,220],[1.462,219],[1.468,217],[1.474,216],[1.479,215],[1.484,214],[1.490,212],[1.495,210],[1.500,209],[1.505,208],[1.511,208],[1.516,208],[1.521,210],[1.526,213],[1.531,213],[1.536,214],[1.542,213],[1.547,212],[1.553,210],[1.559,210],[1.564,209],[1.569,209],[1.575,208],[1.580,208],[1.585,207],[1.590,205],[1.596,203],[1.601,201],[1.608,198],[1.614,195],[1.620,192],[1.626,191],[1.631,190],[1.636,189],[1.642,190],[1.647,190],[1.652,191],[1.658,191],[1.664,192],[1.669,191],[1.675,192],[1.680,192],[1.685,193],[1.691,195],[1.696,197],[1.702,201],[1.707,203],[1.712,205],[1.717,208],[1.722,210],[1.727,211],[1.732,215],[1.738,219],[1.743,222],[1.748,224],[1.753,228],[1.758,231],[1.764,227],[1.769,225],[1.775,222],[1.781,220],[1.786,217],[1.791,216],[1.796,216],[1.801,216],[1.807,216],[1.813,216],[1.818,212],[1.824,211],[1.829,210],[1.834,209],[1.840,210],[1.846,210],[1.851,209],[1.858,207],[1.863,203],[1.868,202],[1.874,202],[1.880,201],[1.885,200],[1.890,201],[1.896,201],[1.901,203],[1.907,204],[1.913,206],[1.919,208],[1.924,209],[1.929,212],[1.934,215],[1.939,218],[1.945,221],[1.950,222],[1.956,224],[1.961,225],[1.966,225],[1.972,229],[1.978,230],[1.984,231],[1.990,230],[1.995,228],[2.000,225],[2.006,223],[2.011,219],[2.017,215],[2.023,213],[2.029,209],[2.034,206],[2.039,204],[2.045,201],[2.050,199],[2.055,199],[2.061,198],[2.066,197],[2.071,198],[2.076,199],[2.082,199],[2.087,199],[2.093,198],[2.098,199],[2.104,199],[2.110,198],[2.115,197],[2.120,198],[2.125,199],[2.131,201],[2.136,203],[2.141,206],[2.146,208],[2.151,211],[2.157,212],[2.162,213],[2.168,214],[2.173,215],[2.178,217],[2.183,219],[2.188,221],[2.194,222],[2.199,221],[2.205,219],[2.210,217],[2.216,216],[2.222,214],[2.227,214],[2.232,213],[2.238,212],[2.243,213],[2.248,215],[2.254,216],[2.260,216],[2.265,217],[2.271,218],[2.277,220],[2.282,223],[2.287,224],[2.292,224],[2.298,222],[2.303,221],[2.309,222],[2.314,223],[2.320,224],[2.325,224],[2.331,225],[2.336,225],[2.341,226],[2.346,226],[2.352,227],[2.357,228],[2.362,227],[2.367,227],[2.373,227],[2.378,227],[2.384,227],[2.389,228],[2.394,231],[2.399,232],[2.404,233],[2.410,233],[2.415,233],[2.421,234],[2.427,236],[2.432,239],[2.437,243],[2.442,247],[2.448,249],[2.453,253],[2.458,257],[2.464,260],[2.469,262],[2.474,264],[2.479,266],[2.485,269],[2.491,270],[2.496,272],[2.501,274],[2.507,278],[2.513,281],[2.518,283],[2.524,284],[2.529,285],[2.534,285],[2.540,286],[2.545,286],[2.551,287],[2.557,288],[2.562,288],[2.567,288],[2.572,288],[2.578,288],[2.583,288],[2.589,289],[2.594,289],[2.601,291],[2.606,291],[2.612,291],[2.617,291],[2.622,291],[2.627,291],[2.633,289],[2.638,288],[2.643,286],[2.649,285],[2.655,285],[2.660,284],[2.666,283],[2.671,283],[2.677,284],[2.683,285],[2.688,284],[2.693,284],[2.698,286],[2.703,288],[2.709,289],[2.714,291],[2.719,292],[2.725,293],[2.730,295],[2.735,294],[2.741,295],[2.746,296],[2.751,297],[2.757,299],[2.762,302],[2.767,305],[2.772,306],[2.778,306],[2.784,307],[2.790,308],[2.795,306],[2.800,304],[2.805,303],[2.811,302],[2.816,302],[2.822,302],[2.827,303],[2.832,305],[2.837,305],[2.843,306],[2.848,306],[2.854,307],[2.859,307],[2.865,305],[2.870,303],[2.876,302],[2.881,302],[2.886,303],[2.891,302],[2.897,303],[2.902,304],[2.908,303],[2.913,304],[2.919,302],[2.924,302],[2.930,302],[2.935,303],[2.941,305],[2.946,305],[2.952,305],[2.957,305],[2.963,305],[2.968,305],[2.974,305],[2.980,305],[2.985,306],[2.990,307],[2.995,307],[3.000,305],[3.006,306],[3.012,306],[3.017,306],[3.023,306],[3.028,305],[3.033,305],[3.039,305],[3.045,304],[3.050,305],[3.056,304],[3.062,304],[3.068,304],[3.074,305],[3.079,304],[3.085,302],[3.090,301],[3.095,300],[3.100,298],[3.106,297],[3.111,296],[3.117,296],[3.122,298],[3.127,299],[3.132,300],[3.137,302],[3.142,304],[3.148,305],[3.154,307],[3.159,307],[3.164,309],[3.169,311],[3.174,311],[3.180,313],[3.185,313],[3.190,313],[3.196,315],[3.202,316],[3.207,319],[3.212,320],[3.217,322],[3.223,324],[3.229,325],[3.235,323],[3.242,324],[3.247,324],[3.252,326],[3.258,326],[3.263,327],[3.268,327],[3.274,328],[3.280,330],[3.285,332],[3.291,333],[3.296,334],[3.301,335],[3.306,336],[3.311,336],[3.317,336],[3.322,335],[3.328,332],[3.333,332],[3.339,332],[3.344,333],[3.349,333],[3.355,333],[3.360,333],[3.366,332],[3.372,335],[3.377,337],[3.383,338],[3.388,339],[3.394,340],[3.399,340],[3.404,340],[3.410,340],[3.415,342],[3.420,344],[3.425,345],[3.431,346],[3.436,347],[3.441,348],[3.446,350],[3.452,351],[3.457,353],[3.462,355],[3.468,358],[3.473,359],[3.478,360],[3.484,361],[3.490,363],[3.496,364],[3.501,365],[3.508,366],[3.513,368],[3.519,369],[3.525,369],[3.530,370],[3.536,369],[3.541,370],[3.546,371],[3.551,371],[3.556,370],[3.562,370],[3.567,372],[3.572,373],[3.577,375],[3.583,375],[3.589,375],[3.594,376],[3.599,377],[3.604,378],[3.610,379],[3.615,380],[3.621,379],[3.626,379],[3.631,380],[3.637,382],[3.643,382],[3.648,382],[3.654,383],[3.659,384],[3.664,384],[3.669,383],[3.675,383],[3.680,384],[3.685,384],[3.691,384],[3.697,385],[3.702,385],[3.708,385],[3.713,385],[3.718,385],[3.724,383],[3.729,382],[3.735,381],[3.740,380],[3.745,379],[3.751,380],[3.756,380],[3.762,380],[3.767,378],[3.773,378],[3.778,378],[3.784,380],[3.790,381],[3.796,381],[3.801,381],[3.806,381],[3.812,379],[3.817,379],[3.823,379],[3.829,379],[3.836,377],[3.841,376],[3.846,375],[3.852,374],[3.857,373],[3.862,373],[3.868,373],[3.873,374],[3.879,374],[3.885,374],[3.890,375],[3.895,376],[3.901,376],[3.906,376],[3.911,376],[3.916,376],[3.921,375],[3.927,375],[3.932,376],[3.937,376],[3.944,375],[3.949,374],[3.954,373],[3.960,371],[3.965,370],[3.971,370],[3.976,369],[3.981,369],[3.987,370],[3.992,370],[3.997,371],[4.003,373],[4.008,373],[4.014,374],[4.019,374],[4.025,374],[4.030,373],[4.036,372],[4.041,370],[4.047,368],[4.052,365],[4.058,364],[4.064,361],[4.070,360],[4.076,359],[4.081,359],[4.087,358],[4.093,355],[4.098,354],[4.103,352],[4.109,351],[4.114,351],[4.119,352],[4.125,352],[4.130,351],[4.136,351],[4.141,349],[4.146,348],[4.152,347],[4.157,348],[4.163,347],[4.168,345],[4.173,344],[4.179,343],[4.184,342],[4.189,341],[4.194,340],[4.199,339],[4.205,339],[4.210,339],[4.216,339],[4.221,338],[4.226,337],[4.232,335],[4.237,333],[4.243,332],[4.248,331],[4.253,331],[4.258,333],[4.263,331],[4.269,331],[4.274,329],[4.279,327],[4.285,327],[4.290,326],[4.295,328],[4.301,330],[4.308,331],[4.313,331],[4.318,331],[4.323,330],[4.329,329],[4.335,326],[4.340,324],[4.345,324],[4.351,322],[4.356,323],[4.362,322],[4.367,320],[4.373,318],[4.378,316],[4.384,314],[4.390,313],[4.395,311],[4.400,310],[4.405,308],[4.410,307],[4.416,305],[4.422,304],[4.427,303],[4.432,301],[4.438,299],[4.444,298],[4.450,297],[4.456,297],[4.461,299],[4.466,300],[4.471,301],[4.477,297],[4.482,293],[4.487,289],[4.492,288],[4.500,288],[4.505,286],[4.510,286],[4.516,286],[4.522,286],[4.527,286],[4.533,287],[4.538,289],[4.544,292],[4.550,294],[4.557,294],[4.562,295],[4.570,297],[4.576,297],[4.582,298],[4.587,298],[4.593,299],[4.599,300],[4.605,299],[4.610,298],[4.616,297],[4.621,296],[4.626,295],[4.632,294],[4.637,292],[4.643,291],[4.648,288],[4.653,287],[4.658,287],[4.664,287],[4.669,287],[4.674,287],[4.682,287],[4.687,285],[4.692,282],[4.697,281],[4.703,283],[4.708,284],[4.715,285],[4.720,287],[4.726,287],[4.733,288],[4.739,286],[4.745,286],[4.751,286],[4.757,289],[4.762,289],[4.767,289],[4.772,289],[4.778,292],[4.784,294],[4.790,295],[4.796,295],[4.802,293],[4.808,293],[4.813,292],[4.819,291],[4.824,288],[4.829,285],[4.834,284],[4.841,281],[4.847,280],[4.852,280],[4.857,280],[4.863,280],[4.868,280],[4.873,280],[4.878,280],[4.883,280],[4.888,280],[4.894,282],[4.899,284],[4.905,285],[4.910,287],[4.916,288],[4.921,289],[4.926,290],[4.931,291],[4.937,292],[4.942,292],[4.947,293],[4.953,295],[4.958,294],[4.963,294],[4.968,294],[4.974,295],[4.979,295],[4.986,295],[4.992,297],[4.998,298],[5.003,299],[5.009,300],[5.014,301],[5.020,301],[5.026,303],[5.032,304],[5.037,304],[5.043,305],[5.048,303],[5.054,304],[5.059,304],[5.064,305],[5.069,305],[5.075,305],[5.080,306],[5.086,310],[5.091,314],[5.097,317],[5.102,320],[5.107,323],[5.112,325],[5.118,326],[5.124,328],[5.129,330],[5.134,332],[5.140,333],[5.145,334],[5.150,333],[5.156,334],[5.161,335],[5.166,336],[5.171,338],[5.177,336],[5.182,336],[5.188,337],[5.193,340],[5.198,342],[5.204,344],[5.209,346],[5.215,349],[5.221,351],[5.226,353],[5.231,354],[5.237,354],[5.242,352],[5.248,352],[5.253,351],[5.259,349],[5.265,349],[5.270,351],[5.275,352],[5.280,354],[5.286,354],[5.292,354],[5.297,353],[5.303,353],[5.308,354],[5.313,356],[5.318,358],[5.323,359],[5.329,360],[5.334,362],[5.340,365],[5.345,366],[5.350,366],[5.356,367],[5.362,368],[5.367,367],[5.373,367],[5.378,366],[5.384,366],[5.390,366],[5.395,367],[5.400,368],[5.406,369],[5.411,371],[5.417,373],[5.423,374],[5.429,376],[5.434,375],[5.440,376],[5.445,375],[5.450,375],[5.457,374],[5.462,374],[5.468,373],[5.473,373],[5.479,374],[5.484,374],[5.490,375],[5.496,375],[5.502,376],[5.507,376],[5.512,376],[5.518,375],[5.524,374],[5.530,374],[5.535,374],[5.540,374],[5.545,374],[5.550,374],[5.555,374],[5.560,374],[5.565,376],[5.571,377],[5.577,378],[5.582,380],[5.588,381],[5.593,383],[5.598,383],[5.604,384],[5.609,385],[5.615,386],[5.620,386],[5.626,386],[5.631,387],[5.636,387],[5.641,387],[5.647,387],[5.652,387],[5.657,387],[5.663,388],[5.668,389],[5.673,390],[5.679,389],[5.685,391],[5.691,393],[5.697,396],[5.702,398],[5.708,397],[5.714,396],[5.719,396],[5.725,396],[5.730,396],[5.735,395],[5.741,394],[5.746,394],[5.752,394],[5.758,393],[5.764,393],[5.769,392],[5.775,390],[5.780,389],[5.785,387],[5.791,387],[5.797,386],[5.803,386],[5.809,386],[5.814,386],[5.819,387],[5.824,388],[5.830,389],[5.836,389],[5.841,389],[5.847,391],[5.852,392],[5.858,391],[5.863,390],[5.869,389],[5.874,389],[5.879,388],[5.886,388],[5.891,386],[5.897,385],[5.902,384],[5.908,383],[5.914,381],[5.919,379],[5.925,379],[5.930,380],[5.936,381],[5.942,381],[5.948,382],[5.954,381],[5.959,382],[5.965,380],[5.971,378],[5.977,376],[5.982,374],[5.988,372],[5.993,370],[5.999,368],[6.004,366],[6.010,364],[6.015,365],[6.020,366],[6.026,366],[6.031,366],[6.037,365],[6.042,363],[6.048,361],[6.054,360],[6.059,357],[6.065,355],[6.070,351],[6.076,350],[6.081,348],[6.087,347],[6.092,347],[6.098,346],[6.103,345],[6.109,343],[6.115,342],[6.120,340],[6.125,339],[6.131,339],[6.136,341],[6.142,342],[6.148,344],[6.153,344],[6.158,346],[6.163,347],[6.168,346],[6.173,345],[6.179,343],[6.184,342],[6.189,341],[6.194,342],[6.200,341],[6.205,340],[6.211,340],[6.217,341],[6.222,340],[6.227,340],[6.233,340],[6.238,338],[6.243,337],[6.249,333],[6.254,329],[6.259,326],[6.265,323],[6.271,322],[6.276,322],[6.282,323],[6.287,324],[6.293,325],[6.298,325],[6.304,325],[6.309,324],[6.314,324],[6.320,324],[6.325,324],[6.330,324],[6.336,324],[6.341,324],[6.347,322],[6.352,320],[6.357,318],[6.363,317],[6.369,317],[6.375,316],[6.381,315],[6.386,316],[6.391,317],[6.397,318],[6.402,318],[6.408,318],[6.413,319],[6.419,320],[6.424,321],[6.430,321],[6.435,322],[6.441,322],[6.446,321],[6.451,321],[6.457,322],[6.463,321],[6.469,319],[6.475,318],[6.481,317],[6.486,317],[6.492,317],[6.497,316],[6.503,315],[6.509,315],[6.515,316],[6.520,317],[6.525,317],[6.531,318],[6.536,318],[6.542,317],[6.547,316],[6.553,317],[6.558,317],[6.563,318],[6.568,318],[6.574,319],[6.579,320],[6.585,322],[6.590,324],[6.596,323],[6.601,323],[6.606,322],[6.612,320],[6.617,318],[6.622,316],[6.628,316],[6.633,317],[6.638,319],[6.644,319],[6.650,318],[6.656,318],[6.662,318],[6.667,317],[6.673,318],[6.678,317],[6.683,316],[6.688,316],[6.694,315],[6.700,315],[6.705,314],[6.710,313],[6.715,313],[6.721,314],[6.727,315],[6.732,314],[6.739,312],[6.744,311],[6.749,310],[6.755,308],[6.760,308],[6.766,306],[6.771,305],[6.776,304],[6.782,304],[6.787,306],[6.792,307],[6.797,310],[6.803,312],[6.808,313],[6.814,314],[6.820,314],[6.825,314],[6.831,313],[6.837,312],[6.843,312],[6.848,311],[6.853,311],[6.859,310],[6.864,310],[6.869,310],[6.875,310],[6.880,310],[6.886,310],[6.891,309],[6.897,309],[6.902,310],[6.907,309],[6.913,307],[6.918,304],[6.923,302],[6.928,300],[6.933,299],[6.939,298],[6.944,298],[6.950,297],[6.956,298],[6.961,296],[6.966,296],[6.971,296],[6.977,297],[6.982,298],[6.987,298],[6.993,294],[6.998,292],[7.003,291],[7.008,291],[7.014,288],[7.019,285],[7.024,282],[7.030,280],[7.035,277],[7.041,275],[7.046,273],[7.052,272],[7.058,270],[7.063,270],[7.068,270],[7.074,271],[7.080,271],[7.085,271],[7.090,272],[7.095,274],[7.101,275],[7.107,273],[7.112,269],[7.117,266],[7.122,262],[7.128,258],[7.133,254],[7.138,250],[7.143,246],[7.149,243],[7.156,240],[7.162,240],[7.167,239],[7.173,238],[7.178,238],[7.184,236],[7.189,235],[7.194,233],[7.200,232],[7.206,231],[7.211,230],[7.216,230],[7.222,232],[7.227,233],[7.232,234],[7.237,235],[7.243,235],[7.248,237],[7.254,238],[7.259,238],[7.264,237],[7.270,236],[7.275,236],[7.280,234],[7.285,235],[7.291,237],[7.296,239],[7.302,240],[7.307,241],[7.312,242],[7.318,243],[7.323,242],[7.329,240],[7.334,239],[7.340,238],[7.345,236],[7.352,233],[7.357,233],[7.362,231],[7.368,230],[7.373,229],[7.379,229],[7.384,229],[7.389,230],[7.394,228],[7.400,228],[7.405,227],[7.410,226],[7.416,226],[7.421,225],[7.427,225],[7.432,225],[7.437,225],[7.443,225],[7.449,225],[7.454,225],[7.460,225],[7.465,227],[7.470,228],[7.476,229],[7.481,229],[7.487,229],[7.492,229],[7.498,228],[7.503,228],[7.508,227],[7.514,227],[7.520,227],[7.525,225],[7.530,222],[7.536,218],[7.541,216],[7.546,212],[7.551,211],[7.557,212],[7.563,214],[7.569,214],[7.574,214],[7.580,215],[7.585,214],[7.591,214],[7.596,214],[7.602,213],[7.608,214],[7.614,215],[7.619,217],[7.625,217],[7.630,216],[7.636,214],[7.642,213],[7.647,210],[7.653,210],[7.658,209],[7.664,208],[7.669,207],[7.674,206],[7.681,205],[7.687,204],[7.692,204],[7.698,205],[7.704,206],[7.710,208],[7.715,209],[7.721,210],[7.727,211],[7.734,212],[7.740,216],[7.745,220],[7.751,223],[7.756,227],[7.762,230],[7.767,229],[7.773,226],[7.778,224],[7.784,223],[7.790,219],[7.795,215],[7.801,212],[7.806,208],[7.812,206],[7.817,205],[7.822,205],[7.828,203],[7.834,203],[7.839,202],[7.844,202],[7.850,203],[7.856,203],[7.862,204],[7.867,204],[7.873,204],[7.878,204],[7.884,203],[7.889,202],[7.895,202],[7.900,202],[7.906,202],[7.911,201],[7.917,200],[7.922,200],[7.927,199],[7.932,198],[7.938,199],[7.943,199],[7.948,199],[7.954,196],[7.959,195],[7.965,197],[7.970,198],[7.975,199],[7.980,202],[7.985,203],[7.991,205],[7.997,208],[8.002,210],[8.007,210],[8.014,211],[8.019,211],[8.024,211],[8.030,212],[8.036,212],[8.042,212],[8.047,211],[8.053,209],[8.058,208],[8.064,208],[8.069,209],[8.075,210],[8.081,212],[8.087,212],[8.092,212],[8.098,212],[8.103,213],[8.108,213],[8.114,214],[8.119,215],[8.124,214],[8.130,214],[8.135,214],[8.141,215],[8.147,215],[8.153,216],[8.158,218],[8.164,220],[8.170,222],[8.175,223],[8.181,224],[8.186,224],[8.192,224],[8.198,224],[8.203,224],[8.208,224],[8.213,224],[8.219,224],[8.224,224],[8.229,222],[8.236,220],[8.241,220],[8.246,220],[8.251,220],[8.257,220],[8.262,220],[8.268,220],[8.273,220],[8.278,220],[8.283,220],[8.288,220],[8.294,220],[8.299,220],[8.305,220],[8.311,220],[8.316,220],[8.322,220],[8.327,220],[8.332,220],[8.338,220],[8.343,220],[8.348,220],[8.353,220],[8.359,220],[8.364,220],[8.369,220],[8.375,220],[8.380,220],[8.386,220],[8.391,220],[8.396,220],[8.401,220],[8.407,220],[8.414,220],[8.419,220],[8.425,220],[8.430,220],[8.436,220],[8.441,220],[8.447,220],[8.452,220],[8.457,220],[8.463,220],[8.468,220],[8.474,220],[8.479,220],[8.484,220],[8.490,220],[8.496,220],[8.501,220],[8.507,220],[8.512,220],[8.519,220],[8.524,220],[8.529,220],[8.534,220],[8.540,220],[8.546,220],[8.552,220],[8.557,220],[8.563,220],[8.568,220],[8.574,220],[8.579,220],[8.585,220],[8.590,220],[8.595,220],[8.601,220],[8.607,220],[8.612,220],[8.618,220],[8.623,220],[8.629,220],[8.635,220],[8.640,220],[8.645,216],[8.651,212],[8.656,208],[8.661,204],[8.667,200],[8.673,196],[8.679,192],[8.685,188],[8.691,185],[8.696,183],[8.701,182],[8.707,181],[8.712,182],[8.718,183],[8.723,185],[8.728,185],[8.734,184],[8.739,183],[8.745,183],[8.750,184],[8.756,186],[8.761,188],[8.767,189],[8.772,191],[8.777,191],[8.782,190],[8.788,188],[8.794,187],[8.800,186],[8.805,186],[8.810,185],[8.816,185],[8.822,185],[8.827,185],[8.832,185],[8.838,185],[8.843,185],[8.850,185],[8.856,185],[8.862,185],[8.867,185],[8.873,185],[8.879,185],[8.885,185],[8.890,185],[8.895,185],[8.900,181],[8.906,177],[8.911,173],[8.916,169],[8.922,165],[8.927,161],[8.933,157],[8.938,153],[8.943,149],[8.949,145],[8.954,143],[8.959,141],[8.966,141],[8.972,140],[8.977,140],[8.982,140],[8.989,139],[8.994,139],[8.999,139],[9.004,139],[9.009,139],[9.014,139],[9.020,139],[9.026,139],[9.031,139],[9.036,139],[9.042,139],[9.047,139],[9.052,139],[9.058,139],[9.063,139],[9.069,139],[9.074,139],[9.079,140],[9.085,140],[9.091,140],[9.096,140],[9.102,140],[9.107,140],[9.112,140],[9.118,140],[9.124,140],[9.129,140],[9.135,140],[9.140,140],[9.146,140],[9.151,140],[9.157,140],[9.164,140],[9.169,140],[9.174,139],[9.180,139],[9.185,139],[9.190,139],[9.196,139],[9.201,139],[9.207,139],[9.213,139],[9.219,139],[9.224,139],[9.229,139]];

const TRACK_D5_RUTA_EST = [[37.83493,-25.14598],[37.83497,-25.14612],[37.83507,-25.14631],[37.83487,-25.14616],[37.83490,-25.14585],[37.83489,-25.14563],[37.83486,-25.14543],[37.83482,-25.14530],[37.83476,-25.14518],[37.83467,-25.14509],[37.83456,-25.14503],[37.83406,-25.14490],[37.83346,-25.14474],[37.83320,-25.14466],[37.83242,-25.14444],[37.83164,-25.14421],[37.83027,-25.14381],[37.82972,-25.14365],[37.82861,-25.14330],[37.82845,-25.14327],[37.82836,-25.14328],[37.82826,-25.14332],[37.82819,-25.14336],[37.82812,-25.14344],[37.82781,-25.14383],[37.82784,-25.14386],[37.82785,-25.14387],[37.82786,-25.14393],[37.82783,-25.14399],[37.82779,-25.14402],[37.82776,-25.14402],[37.82774,-25.14401],[37.82772,-25.14399],[37.82770,-25.14395],[37.82770,-25.14392],[37.82770,-25.14389],[37.82752,-25.14376],[37.82709,-25.14356],[37.82693,-25.14347],[37.82678,-25.14333],[37.82673,-25.14326],[37.82660,-25.14317],[37.82615,-25.14317],[37.82563,-25.14309],[37.82554,-25.14303],[37.82548,-25.14293],[37.82534,-25.14226],[37.82518,-25.14179],[37.82514,-25.14161],[37.82487,-25.14110],[37.82476,-25.14083],[37.82465,-25.14057],[37.82453,-25.14020],[37.82442,-25.13984],[37.82438,-25.13976],[37.82435,-25.13972],[37.82431,-25.13968],[37.82415,-25.13963],[37.82370,-25.13953],[37.82359,-25.13951],[37.82352,-25.13953],[37.82346,-25.13960],[37.82316,-25.14008],[37.82282,-25.14053],[37.82259,-25.14071],[37.82234,-25.14086],[37.82158,-25.14133],[37.82107,-25.14164],[37.82075,-25.14193],[37.82062,-25.14206],[37.82052,-25.14223],[37.82042,-25.14243],[37.82022,-25.14294],[37.82002,-25.14315],[37.81989,-25.14325],[37.81979,-25.14332],[37.81968,-25.14335],[37.81958,-25.14337],[37.81945,-25.14336],[37.81932,-25.14333],[37.81900,-25.14323],[37.81891,-25.14317],[37.81887,-25.14308],[37.81886,-25.14296],[37.81888,-25.14283],[37.81899,-25.14259],[37.81927,-25.14202],[37.81936,-25.14180],[37.81943,-25.14147],[37.81946,-25.14128],[37.81947,-25.14108],[37.81946,-25.14090],[37.81941,-25.14072],[37.81936,-25.14058],[37.81926,-25.14044],[37.81913,-25.14033],[37.81899,-25.14028],[37.81805,-25.14012],[37.81764,-25.14005],[37.81747,-25.14000],[37.81680,-25.13970],[37.81661,-25.13963],[37.81635,-25.13957],[37.81566,-25.13948],[37.81505,-25.13943],[37.81479,-25.13944],[37.81449,-25.13950],[37.81312,-25.13986],[37.81299,-25.13992],[37.81285,-25.14001],[37.81275,-25.14012],[37.81267,-25.14024],[37.81259,-25.14036],[37.81227,-25.14096],[37.81193,-25.14157],[37.81156,-25.14226],[37.81126,-25.14282],[37.81111,-25.14310],[37.81081,-25.14366],[37.81063,-25.14394],[37.81055,-25.14399],[37.81045,-25.14401],[37.81037,-25.14401],[37.81025,-25.14399],[37.80977,-25.14376],[37.80966,-25.14374],[37.80956,-25.14375],[37.80945,-25.14379],[37.80932,-25.14386],[37.80883,-25.14416],[37.80884,-25.14417],[37.80883,-25.14416],[37.80800,-25.14462],[37.80751,-25.14492],[37.80735,-25.14504],[37.80723,-25.14518],[37.80710,-25.14536],[37.80680,-25.14584],[37.80672,-25.14601],[37.80665,-25.14633],[37.80638,-25.14746],[37.80633,-25.14758],[37.80627,-25.14767],[37.80620,-25.14774],[37.80612,-25.14778],[37.80598,-25.14779],[37.80589,-25.14777],[37.80581,-25.14774],[37.80573,-25.14767],[37.80568,-25.14757],[37.80565,-25.14744],[37.80564,-25.14727],[37.80565,-25.14685],[37.80560,-25.14658],[37.80553,-25.14633],[37.80544,-25.14611],[37.80529,-25.14596],[37.80514,-25.14585],[37.80481,-25.14568],[37.80456,-25.14563],[37.80430,-25.14560],[37.80413,-25.14560],[37.80400,-25.14565],[37.80391,-25.14574],[37.80383,-25.14582],[37.80381,-25.14584],[37.80375,-25.14599],[37.80372,-25.14618],[37.80373,-25.14637],[37.80376,-25.14667],[37.80380,-25.14697],[37.80380,-25.14710],[37.80376,-25.14722],[37.80337,-25.14790],[37.80330,-25.14798],[37.80320,-25.14802],[37.80310,-25.14800],[37.80267,-25.14777],[37.80251,-25.14772],[37.80234,-25.14772],[37.80218,-25.14776],[37.80206,-25.14784],[37.80193,-25.14798],[37.80182,-25.14817],[37.80154,-25.14871],[37.80148,-25.14880],[37.80141,-25.14885],[37.80133,-25.14886],[37.80133,-25.14887],[37.80133,-25.14886],[37.80125,-25.14885],[37.80116,-25.14882],[37.80109,-25.14875],[37.80103,-25.14864],[37.80100,-25.14847],[37.80095,-25.14815],[37.80089,-25.14782],[37.80084,-25.14757],[37.80079,-25.14732],[37.80068,-25.14697],[37.80061,-25.14682],[37.80050,-25.14672],[37.80037,-25.14670],[37.80021,-25.14671],[37.79938,-25.14691],[37.79930,-25.14691],[37.79916,-25.14688],[37.79904,-25.14683],[37.79887,-25.14675],[37.79856,-25.14658],[37.79821,-25.14637],[37.79811,-25.14633],[37.79801,-25.14631],[37.79790,-25.14630],[37.79777,-25.14632],[37.79752,-25.14642],[37.79741,-25.14654],[37.79711,-25.14695],[37.79701,-25.14706],[37.79682,-25.14720],[37.79648,-25.14735],[37.79637,-25.14738],[37.79625,-25.14738],[37.79610,-25.14736],[37.79593,-25.14729],[37.79565,-25.14715],[37.79554,-25.14713],[37.79544,-25.14714],[37.79539,-25.14718],[37.79536,-25.14720],[37.79529,-25.14731],[37.79522,-25.14756],[37.79518,-25.14775],[37.79517,-25.14788],[37.79517,-25.14801],[37.79521,-25.14850],[37.79522,-25.14862],[37.79520,-25.14873],[37.79517,-25.14881],[37.79510,-25.14895],[37.79505,-25.14909],[37.79505,-25.14924],[37.79507,-25.14938],[37.79519,-25.14971],[37.79521,-25.14982],[37.79521,-25.14993],[37.79518,-25.15002],[37.79513,-25.15008],[37.79477,-25.15034],[37.79471,-25.15043],[37.79467,-25.15054],[37.79467,-25.15067],[37.79469,-25.15078],[37.79476,-25.15097],[37.79480,-25.15110],[37.79481,-25.15125],[37.79478,-25.15139],[37.79473,-25.15151],[37.79468,-25.15160],[37.79459,-25.15168],[37.79448,-25.15172],[37.79430,-25.15172],[37.79421,-25.15174],[37.79413,-25.15182],[37.79407,-25.15195],[37.79404,-25.15209],[37.79404,-25.15222],[37.79416,-25.15271],[37.79419,-25.15287],[37.79418,-25.15302],[37.79414,-25.15313],[37.79408,-25.15321],[37.79401,-25.15326],[37.79393,-25.15328],[37.79394,-25.15326],[37.79393,-25.15328],[37.79374,-25.15328],[37.79360,-25.15329],[37.79351,-25.15332],[37.79342,-25.15340],[37.79320,-25.15375],[37.79315,-25.15385],[37.79314,-25.15393],[37.79314,-25.15403],[37.79320,-25.15431],[37.79321,-25.15442],[37.79321,-25.15452],[37.79318,-25.15462],[37.79311,-25.15471],[37.79304,-25.15476],[37.79298,-25.15477],[37.79288,-25.15475],[37.79264,-25.15465],[37.79256,-25.15464],[37.79245,-25.15466],[37.79235,-25.15470],[37.79210,-25.15482],[37.79184,-25.15496],[37.79174,-25.15504],[37.79167,-25.15512],[37.79160,-25.15525],[37.79142,-25.15552],[37.79135,-25.15559],[37.79113,-25.15573],[37.79106,-25.15578],[37.79103,-25.15582],[37.79099,-25.15590],[37.79091,-25.15624],[37.79088,-25.15636],[37.79082,-25.15647],[37.79075,-25.15657],[37.79042,-25.15692],[37.79035,-25.15696],[37.79027,-25.15700],[37.79020,-25.15700],[37.79012,-25.15699],[37.79003,-25.15694],[37.78997,-25.15686],[37.78995,-25.15676],[37.78995,-25.15661],[37.78998,-25.15633],[37.79016,-25.15564],[37.79035,-25.15499],[37.79056,-25.15429],[37.79060,-25.15412],[37.79062,-25.15393],[37.79063,-25.15347],[37.79066,-25.15336],[37.79072,-25.15329],[37.79102,-25.15311],[37.79109,-25.15306],[37.79115,-25.15294],[37.79118,-25.15280],[37.79124,-25.15208],[37.79125,-25.15182],[37.79124,-25.15152],[37.79121,-25.15114],[37.79119,-25.15080],[37.79120,-25.15063],[37.79122,-25.15048],[37.79133,-25.15021],[37.79134,-25.15012],[37.79133,-25.15003],[37.79129,-25.14996],[37.79125,-25.14992],[37.79118,-25.14986],[37.79066,-25.14960],[37.79057,-25.14951],[37.79051,-25.14941],[37.79049,-25.14930],[37.79049,-25.14919],[37.79054,-25.14905],[37.79086,-25.14851],[37.79089,-25.14841],[37.79090,-25.14829],[37.79088,-25.14818],[37.79083,-25.14807],[37.79074,-25.14799],[37.79064,-25.14796],[37.79055,-25.14797],[37.79046,-25.14801],[37.79037,-25.14806],[37.79026,-25.14815],[37.78996,-25.14845],[37.78988,-25.14849],[37.78981,-25.14850],[37.78972,-25.14849],[37.78957,-25.14842],[37.78949,-25.14835],[37.78943,-25.14830],[37.78941,-25.14823],[37.78939,-25.14815],[37.78935,-25.14770],[37.78930,-25.14715],[37.78928,-25.14698],[37.78925,-25.14688],[37.78921,-25.14679],[37.78913,-25.14668],[37.78907,-25.14663],[37.78897,-25.14661],[37.78885,-25.14660],[37.78873,-25.14662],[37.78847,-25.14670],[37.78827,-25.14677],[37.78818,-25.14682],[37.78810,-25.14691],[37.78805,-25.14702],[37.78800,-25.14715],[37.78798,-25.14727],[37.78787,-25.14784],[37.78780,-25.14807],[37.78776,-25.14816],[37.78756,-25.14843],[37.78747,-25.14852],[37.78738,-25.14856],[37.78712,-25.14865],[37.78703,-25.14869],[37.78697,-25.14875],[37.78692,-25.14881],[37.78689,-25.14890],[37.78688,-25.14899],[37.78687,-25.14911],[37.78690,-25.14942],[37.78693,-25.14973],[37.78694,-25.15004],[37.78692,-25.15017],[37.78688,-25.15028],[37.78683,-25.15038],[37.78674,-25.15044],[37.78665,-25.15048],[37.78658,-25.15048],[37.78650,-25.15045],[37.78643,-25.15040],[37.78636,-25.15031],[37.78632,-25.15021],[37.78625,-25.14999],[37.78621,-25.14985],[37.78615,-25.14972],[37.78607,-25.14962],[37.78599,-25.14956],[37.78592,-25.14953],[37.78585,-25.14954],[37.78579,-25.14956],[37.78572,-25.14961],[37.78553,-25.14980],[37.78519,-25.15028],[37.78494,-25.15063],[37.78483,-25.15074],[37.78477,-25.15078],[37.78470,-25.15080],[37.78462,-25.15081],[37.78454,-25.15081],[37.78447,-25.15078],[37.78441,-25.15071],[37.78427,-25.15054],[37.78421,-25.15048],[37.78413,-25.15044],[37.78404,-25.15041],[37.78369,-25.15035],[37.78342,-25.15033],[37.78329,-25.15035],[37.78317,-25.15039],[37.78307,-25.15045],[37.78298,-25.15055],[37.78280,-25.15081],[37.78257,-25.15121],[37.78249,-25.15134],[37.78236,-25.15146],[37.78211,-25.15166],[37.78204,-25.15176],[37.78188,-25.15212],[37.78182,-25.15226],[37.78176,-25.15253],[37.78170,-25.15285],[37.78167,-25.15298],[37.78162,-25.15308],[37.78155,-25.15318],[37.78129,-25.15354],[37.78124,-25.15364],[37.78119,-25.15378],[37.78115,-25.15395],[37.78114,-25.15411],[37.78115,-25.15423],[37.78133,-25.15509],[37.78132,-25.15539],[37.78129,-25.15553],[37.78126,-25.15561],[37.78121,-25.15568],[37.78112,-25.15575],[37.78107,-25.15577],[37.78099,-25.15578],[37.78097,-25.15577],[37.78088,-25.15570],[37.78080,-25.15559],[37.78078,-25.15551],[37.78076,-25.15541],[37.78072,-25.15520],[37.78071,-25.15513],[37.78067,-25.15507],[37.78057,-25.15497],[37.78024,-25.15477],[37.78010,-25.15466],[37.78001,-25.15458],[37.77995,-25.15449],[37.77991,-25.15438],[37.77991,-25.15423],[37.77995,-25.15396],[37.77996,-25.15386],[37.77994,-25.15377],[37.77990,-25.15369],[37.77984,-25.15361],[37.77968,-25.15349],[37.77956,-25.15341],[37.77948,-25.15333],[37.77945,-25.15325],[37.77944,-25.15314],[37.77944,-25.15303],[37.77948,-25.15293],[37.77954,-25.15284],[37.77963,-25.15275],[37.77986,-25.15257],[37.77992,-25.15251],[37.77996,-25.15246],[37.77998,-25.15239],[37.77998,-25.15232],[37.77997,-25.15223],[37.77994,-25.15215],[37.77990,-25.15208],[37.77984,-25.15201],[37.77977,-25.15194],[37.77949,-25.15169],[37.77941,-25.15156],[37.77940,-25.15151],[37.77940,-25.15135],[37.77948,-25.15116],[37.77960,-25.15097],[37.77965,-25.15082],[37.77964,-25.15064],[37.77959,-25.15049],[37.77953,-25.15033],[37.77952,-25.15015],[37.77958,-25.15003],[37.77974,-25.14985],[37.77980,-25.14973],[37.77982,-25.14962],[37.77981,-25.14950],[37.77979,-25.14942],[37.77970,-25.14925],[37.77964,-25.14907],[37.77963,-25.14885],[37.77965,-25.14867],[37.77971,-25.14855],[37.78001,-25.14815],[37.78006,-25.14801],[37.78006,-25.14784],[37.77993,-25.14746],[37.77993,-25.14730],[37.77995,-25.14721],[37.78000,-25.14710],[37.78013,-25.14697],[37.78036,-25.14677],[37.78059,-25.14660],[37.78068,-25.14652],[37.78071,-25.14648],[37.78073,-25.14642],[37.78075,-25.14637],[37.78075,-25.14626],[37.78074,-25.14616],[37.78064,-25.14576],[37.78055,-25.14533],[37.78052,-25.14524],[37.78048,-25.14515],[37.78042,-25.14508],[37.78035,-25.14502],[37.78027,-25.14498],[37.78006,-25.14491],[37.77949,-25.14474],[37.77911,-25.14464],[37.77904,-25.14463],[37.77896,-25.14463],[37.77888,-25.14465],[37.77879,-25.14470],[37.77872,-25.14476],[37.77840,-25.14507],[37.77829,-25.14519],[37.77819,-25.14534],[37.77791,-25.14576],[37.77789,-25.14580],[37.77772,-25.14616],[37.77768,-25.14623],[37.77763,-25.14628],[37.77757,-25.14632],[37.77752,-25.14635],[37.77746,-25.14637],[37.77739,-25.14637],[37.77732,-25.14635],[37.77709,-25.14626],[37.77686,-25.14617],[37.77630,-25.14592],[37.77606,-25.14582],[37.77582,-25.14572],[37.77568,-25.14568],[37.77561,-25.14568],[37.77555,-25.14570],[37.77550,-25.14573],[37.77545,-25.14578],[37.77540,-25.14586],[37.77536,-25.14598],[37.77532,-25.14611],[37.77529,-25.14625],[37.77528,-25.14642],[37.77526,-25.14696],[37.77524,-25.14709],[37.77521,-25.14718],[37.77516,-25.14726],[37.77508,-25.14732],[37.77501,-25.14735],[37.77492,-25.14735],[37.77439,-25.14730],[37.77398,-25.14728],[37.77385,-25.14729],[37.77371,-25.14732],[37.77348,-25.14740],[37.77333,-25.14743],[37.77322,-25.14744],[37.77310,-25.14743],[37.77265,-25.14737],[37.77257,-25.14737],[37.77253,-25.14738],[37.77243,-25.14743],[37.77237,-25.14749],[37.77231,-25.14757],[37.77226,-25.14769],[37.77218,-25.14800],[37.77217,-25.14808],[37.77217,-25.14817],[37.77218,-25.14824],[37.77221,-25.14832],[37.77233,-25.14857],[37.77237,-25.14867],[37.77238,-25.14877],[37.77238,-25.14910],[37.77238,-25.14940],[37.77238,-25.14969],[37.77239,-25.14983],[37.77241,-25.14993],[37.77245,-25.15000],[37.77255,-25.15009],[37.77260,-25.15015],[37.77262,-25.15022],[37.77264,-25.15041],[37.77267,-25.15089],[37.77267,-25.15100],[37.77266,-25.15108],[37.77264,-25.15119],[37.77259,-25.15132],[37.77243,-25.15174],[37.77242,-25.15180],[37.77241,-25.15192],[37.77245,-25.15204],[37.77250,-25.15215],[37.77252,-25.15224],[37.77252,-25.15233],[37.77251,-25.15241],[37.77247,-25.15254],[37.77232,-25.15299],[37.77229,-25.15311],[37.77228,-25.15321],[37.77228,-25.15330],[37.77230,-25.15337],[37.77238,-25.15352],[37.77240,-25.15358],[37.77242,-25.15365],[37.77242,-25.15374],[37.77239,-25.15386],[37.77227,-25.15417],[37.77225,-25.15427],[37.77224,-25.15437],[37.77225,-25.15446],[37.77228,-25.15459],[37.77240,-25.15486],[37.77242,-25.15493],[37.77242,-25.15500],[37.77241,-25.15508],[37.77239,-25.15514],[37.77233,-25.15523],[37.77217,-25.15536],[37.77208,-25.15546],[37.77205,-25.15552],[37.77202,-25.15560],[37.77201,-25.15569],[37.77199,-25.15621],[37.77197,-25.15663],[37.77195,-25.15672],[37.77192,-25.15679],[37.77188,-25.15685],[37.77183,-25.15691],[37.77176,-25.15695],[37.77169,-25.15695],[37.77161,-25.15695],[37.77154,-25.15693],[37.77147,-25.15688],[37.77138,-25.15679],[37.77126,-25.15661],[37.77113,-25.15638],[37.77086,-25.15593],[37.77067,-25.15566],[37.77061,-25.15556],[37.77054,-25.15542],[37.77024,-25.15477],[37.77018,-25.15467],[37.77013,-25.15459],[37.77004,-25.15449],[37.76986,-25.15434],[37.76976,-25.15427],[37.76968,-25.15423],[37.76959,-25.15421],[37.76949,-25.15422],[37.76939,-25.15424],[37.76928,-25.15431],[37.76922,-25.15438],[37.76916,-25.15446],[37.76912,-25.15457],[37.76909,-25.15466],[37.76908,-25.15479],[37.76909,-25.15495],[37.76917,-25.15591],[37.76917,-25.15613],[37.76917,-25.15626],[37.76915,-25.15637],[37.76911,-25.15649],[37.76906,-25.15658],[37.76899,-25.15664],[37.76891,-25.15668],[37.76879,-25.15671],[37.76867,-25.15671],[37.76859,-25.15670],[37.76852,-25.15667],[37.76824,-25.15651],[37.76768,-25.15613],[37.76757,-25.15608],[37.76725,-25.15600],[37.76671,-25.15589],[37.76639,-25.15583],[37.76618,-25.15583],[37.76561,-25.15592],[37.76538,-25.15599],[37.76527,-25.15605],[37.76519,-25.15613],[37.76513,-25.15622],[37.76508,-25.15635],[37.76505,-25.15648],[37.76505,-25.15661],[37.76509,-25.15729],[37.76513,-25.15776],[37.76518,-25.15817],[37.76524,-25.15845],[37.76529,-25.15860],[37.76539,-25.15883],[37.76551,-25.15907],[37.76581,-25.15952],[37.76615,-25.16005],[37.76626,-25.16022],[37.76634,-25.16040],[37.76641,-25.16057],[37.76646,-25.16073],[37.76663,-25.16128],[37.76676,-25.16161],[37.76682,-25.16174],[37.76692,-25.16191],[37.76711,-25.16217],[37.76749,-25.16267],[37.76762,-25.16285],[37.76769,-25.16299],[37.76774,-25.16313],[37.76777,-25.16323],[37.76777,-25.16332],[37.76777,-25.16343],[37.76774,-25.16366],[37.76766,-25.16404],[37.76758,-25.16442],[37.76756,-25.16465],[37.76756,-25.16480],[37.76758,-25.16492],[37.76763,-25.16504],[37.76772,-25.16519],[37.76780,-25.16526],[37.76791,-25.16534],[37.76840,-25.16563],[37.76852,-25.16571],[37.76861,-25.16581],[37.76867,-25.16591],[37.76874,-25.16604],[37.76879,-25.16616],[37.76896,-25.16665],[37.76916,-25.16723],[37.76943,-25.16798],[37.76947,-25.16816],[37.76948,-25.16835],[37.76945,-25.16853],[37.76939,-25.16872],[37.76929,-25.16886],[37.76916,-25.16897],[37.76890,-25.16912],[37.76796,-25.16942],[37.76779,-25.16950],[37.76765,-25.16962],[37.76753,-25.16975],[37.76743,-25.16993],[37.76732,-25.17017],[37.76685,-25.17124],[37.76642,-25.17220],[37.76638,-25.17235],[37.76636,-25.17248],[37.76637,-25.17261],[37.76642,-25.17275],[37.76649,-25.17289],[37.76660,-25.17300],[37.76676,-25.17310],[37.76692,-25.17315],[37.76711,-25.17320],[37.76692,-25.17315],[37.76692,-25.17322],[37.76690,-25.17328],[37.76685,-25.17334],[37.76648,-25.17339],[37.76634,-25.17343],[37.76624,-25.17351],[37.76617,-25.17362],[37.76613,-25.17371],[37.76613,-25.17384],[37.76614,-25.17395],[37.76625,-25.17438],[37.76629,-25.17464],[37.76628,-25.17475],[37.76625,-25.17482],[37.76620,-25.17489],[37.76615,-25.17494],[37.76591,-25.17504],[37.76574,-25.17510],[37.76565,-25.17510],[37.76552,-25.17510],[37.76521,-25.17504],[37.76503,-25.17498],[37.76494,-25.17497],[37.76482,-25.17498],[37.76471,-25.17502],[37.76439,-25.17519],[37.76422,-25.17524],[37.76402,-25.17527],[37.76396,-25.17531],[37.76393,-25.17538],[37.76386,-25.17555],[37.76376,-25.17586],[37.76368,-25.17604],[37.76357,-25.17619],[37.76331,-25.17650],[37.76290,-25.17681],[37.76239,-25.17717],[37.76230,-25.17722],[37.76219,-25.17723],[37.76191,-25.17719],[37.76135,-25.17710],[37.76125,-25.17710],[37.76116,-25.17715],[37.76112,-25.17725],[37.76109,-25.17741],[37.76098,-25.17870],[37.76089,-25.17967],[37.76091,-25.17983],[37.76094,-25.17998],[37.76113,-25.18062],[37.76124,-25.18083],[37.76136,-25.18098],[37.76171,-25.18133],[37.76181,-25.18145],[37.76190,-25.18158],[37.76202,-25.18182],[37.76214,-25.18207],[37.76225,-25.18227],[37.76264,-25.18277],[37.76279,-25.18296],[37.76287,-25.18314],[37.76294,-25.18337],[37.76297,-25.18353],[37.76294,-25.18369],[37.76287,-25.18381],[37.76265,-25.18401],[37.76253,-25.18415],[37.76247,-25.18424],[37.76245,-25.18435],[37.76246,-25.18453],[37.76260,-25.18548],[37.76265,-25.18580],[37.76279,-25.18674],[37.76284,-25.18706],[37.76285,-25.18726],[37.76283,-25.18745],[37.76279,-25.18762],[37.76270,-25.18778],[37.76260,-25.18791],[37.76246,-25.18801],[37.76219,-25.18810],[37.76206,-25.18816],[37.76195,-25.18827],[37.76122,-25.18912],[37.76085,-25.18954],[37.76075,-25.18962],[37.76062,-25.18964],[37.76036,-25.18963],[37.76024,-25.18964],[37.76011,-25.18969],[37.76000,-25.18978],[37.75875,-25.19106],[37.75834,-25.19149],[37.75806,-25.19167],[37.75784,-25.19164],[37.75734,-25.19141],[37.75709,-25.19129],[37.75659,-25.19105],[37.75611,-25.19087],[37.75587,-25.19078],[37.75539,-25.19088],[37.75491,-25.19097],[37.75463,-25.19105],[37.75460,-25.19107],[37.75455,-25.19112],[37.75451,-25.19122],[37.75445,-25.19147],[37.75440,-25.19162],[37.75433,-25.19174],[37.75369,-25.19250],[37.75362,-25.19265],[37.75338,-25.19323],[37.75330,-25.19339],[37.75321,-25.19348],[37.75311,-25.19352],[37.75272,-25.19359],[37.75261,-25.19367],[37.75250,-25.19383],[37.75189,-25.19503],[37.75181,-25.19514],[37.75133,-25.19569],[37.75124,-25.19575],[37.75118,-25.19577],[37.75111,-25.19574],[37.75104,-25.19567],[37.75101,-25.19556],[37.75103,-25.19544],[37.75108,-25.19531],[37.75116,-25.19518],[37.75124,-25.19508],[37.75138,-25.19498],[37.75153,-25.19482],[37.75165,-25.19465],[37.75175,-25.19448],[37.75183,-25.19414],[37.75185,-25.19385],[37.75187,-25.19346],[37.75182,-25.19311],[37.75176,-25.19278],[37.75177,-25.19264],[37.75182,-25.19249],[37.75202,-25.19207],[37.75207,-25.19194],[37.75208,-25.19180],[37.75204,-25.19165],[37.75197,-25.19151],[37.75189,-25.19141],[37.75181,-25.19136],[37.75172,-25.19134],[37.75135,-25.19132],[37.75125,-25.19130],[37.75117,-25.19127],[37.75081,-25.19105],[37.75057,-25.19094],[37.75047,-25.19087],[37.75038,-25.19077],[37.75028,-25.19062],[37.75021,-25.19056],[37.75014,-25.19055],[37.75007,-25.19058],[37.75005,-25.19061],[37.75002,-25.19064],[37.75000,-25.19074],[37.75000,-25.19085],[37.75003,-25.19092],[37.75009,-25.19099],[37.75019,-25.19105],[37.75046,-25.19117],[37.75054,-25.19123],[37.75062,-25.19134],[37.75067,-25.19145],[37.75072,-25.19161],[37.75077,-25.19172],[37.75086,-25.19181],[37.75093,-25.19190],[37.75096,-25.19199],[37.75097,-25.19210],[37.75097,-25.19219],[37.75095,-25.19230],[37.75089,-25.19248],[37.75087,-25.19263],[37.75088,-25.19279],[37.75091,-25.19317],[37.75094,-25.19354],[37.75092,-25.19369],[37.75088,-25.19379],[37.75084,-25.19385],[37.75076,-25.19391],[37.75055,-25.19396],[37.75030,-25.19401],[37.75004,-25.19402],[37.74995,-25.19401],[37.74983,-25.19403],[37.74975,-25.19408],[37.74968,-25.19414],[37.74946,-25.19442],[37.74924,-25.19469],[37.74920,-25.19476],[37.74917,-25.19484],[37.74917,-25.19494],[37.74919,-25.19509],[37.74927,-25.19548],[37.74935,-25.19588],[37.74937,-25.19601],[37.74936,-25.19613],[37.74935,-25.19627],[37.74920,-25.19728],[37.74919,-25.19746],[37.74922,-25.19815],[37.74920,-25.19826],[37.74917,-25.19834],[37.74912,-25.19840],[37.74907,-25.19843],[37.74901,-25.19844],[37.74895,-25.19843],[37.74889,-25.19841],[37.74881,-25.19834],[37.74877,-25.19826],[37.74868,-25.19798],[37.74846,-25.19689],[37.74830,-25.19616],[37.74827,-25.19608],[37.74823,-25.19602],[37.74818,-25.19600],[37.74816,-25.19600],[37.74812,-25.19600],[37.74806,-25.19602],[37.74801,-25.19607],[37.74797,-25.19616],[37.74795,-25.19629],[37.74793,-25.19660],[37.74784,-25.19754],[37.74785,-25.19784],[37.74783,-25.19798],[37.74780,-25.19810],[37.74776,-25.19816],[37.74770,-25.19818],[37.74764,-25.19818],[37.74759,-25.19812],[37.74755,-25.19804],[37.74754,-25.19794],[37.74756,-25.19760],[37.74754,-25.19748],[37.74751,-25.19738],[37.74746,-25.19728],[37.74704,-25.19664],[37.74692,-25.19649],[37.74681,-25.19638],[37.74634,-25.19601],[37.74632,-25.19597],[37.74632,-25.19596],[37.74632,-25.19587],[37.74635,-25.19579],[37.74648,-25.19552],[37.74657,-25.19521],[37.74667,-25.19492],[37.74669,-25.19480],[37.74670,-25.19451],[37.74675,-25.19429],[37.74678,-25.19418],[37.74691,-25.19398],[37.74696,-25.19387],[37.74708,-25.19351],[37.74710,-25.19335],[37.74709,-25.19323],[37.74705,-25.19311],[37.74699,-25.19304],[37.74689,-25.19296],[37.74673,-25.19295],[37.74660,-25.19297],[37.74645,-25.19304],[37.74628,-25.19318],[37.74610,-25.19334],[37.74597,-25.19349],[37.74584,-25.19368],[37.74569,-25.19400],[37.74559,-25.19412],[37.74547,-25.19421],[37.74507,-25.19440],[37.74461,-25.19462],[37.74451,-25.19470],[37.74444,-25.19481],[37.74441,-25.19494],[37.74440,-25.19511],[37.74441,-25.19541],[37.74442,-25.19572],[37.74430,-25.19598],[37.74425,-25.19593]];
const PROFILE_D5_RUTA_EST = [[0.000,138],[0.013,139],[0.033,140],[0.059,139],[0.085,137],[0.105,135],[0.122,134],[0.135,133],[0.148,132],[0.161,131],[0.173,130],[0.231,121],[0.299,119],[0.328,121],[0.417,122],[0.506,126],[0.663,135],[0.725,136],[0.853,143],[0.871,144],[0.881,145],[0.893,145],[0.901,146],[0.912,147],[0.960,152],[0.964,152],[0.966,153],[0.971,153],[0.977,154],[0.982,154],[0.985,154],[0.988,155],[0.991,155],[0.994,155],[0.997,154],[1.000,154],[1.023,153],[1.074,150],[1.094,151],[1.115,152],[1.123,151],[1.140,151],[1.190,153],[1.248,151],[1.259,151],[1.271,151],[1.332,151],[1.377,154],[1.393,155],[1.447,158],[1.473,157],[1.499,160],[1.534,161],[1.568,161],[1.577,161],[1.581,161],[1.587,161],[1.605,162],[1.656,164],[1.668,164],[1.677,164],[1.686,164],[1.740,167],[1.794,168],[1.824,169],[1.855,171],[1.949,170],[2.012,175],[2.056,178],[2.074,181],[2.093,184],[2.113,187],[2.163,188],[2.192,188],[2.209,190],[2.222,192],[2.234,193],[2.246,194],[2.260,195],[2.275,195],[2.311,195],[2.322,195],[2.331,195],[2.342,195],[2.354,196],[2.378,196],[2.437,195],[2.459,195],[2.489,196],[2.506,197],[2.524,197],[2.539,198],[2.556,198],[2.569,199],[2.586,200],[2.603,201],[2.620,203],[2.726,206],[2.772,209],[2.790,210],[2.870,214],[2.892,215],[2.921,217],[2.999,219],[3.066,223],[3.095,225],[3.129,226],[3.285,231],[3.300,231],[3.318,232],[3.332,232],[3.346,231],[3.360,231],[3.423,229],[3.489,230],[3.562,235],[3.621,243],[3.651,244],[3.710,237],[3.742,236],[3.752,236],[3.764,236],[3.773,237],[3.786,239],[3.843,238],[3.855,239],[3.867,240],[3.880,241],[3.895,242],[3.956,239],[3.957,240],[3.958,239],[4.059,241],[4.119,244],[4.140,245],[4.158,246],[4.180,247],[4.233,251],[4.251,250],[4.280,251],[4.384,266],[4.396,268],[4.406,268],[4.415,267],[4.425,264],[4.441,260],[4.451,258],[4.461,258],[4.471,259],[4.482,260],[4.494,260],[4.508,260],[4.545,259],[4.570,258],[4.593,258],[4.615,259],[4.636,262],[4.656,265],[4.695,266],[4.724,267],[4.753,267],[4.771,267],[4.786,268],[4.799,268],[4.811,268],[4.813,268],[4.828,268],[4.844,268],[4.862,271],[4.888,273],[4.915,278],[4.926,280],[4.938,281],[5.012,283],[5.022,283],[5.034,284],[5.045,284],[5.098,287],[5.116,287],[5.134,290],[5.153,292],[5.168,292],[5.187,294],[5.208,297],[5.265,303],[5.275,302],[5.284,300],[5.293,297],[5.293,297],[5.293,297],[5.303,296],[5.312,295],[5.323,294],[5.334,293],[5.349,291],[5.378,290],[5.408,293],[5.430,296],[5.453,295],[5.486,295],[5.502,296],[5.516,298],[5.531,299],[5.549,301],[5.642,297],[5.651,298],[5.667,299],[5.681,300],[5.702,300],[5.739,295],[5.782,291],[5.794,292],[5.805,292],[5.817,291],[5.832,291],[5.861,291],[5.877,292],[5.926,295],[5.941,296],[5.966,296],[6.006,297],[6.018,297],[6.032,294],[6.048,291],[6.068,287],[6.101,280],[6.114,277],[6.125,276],[6.132,275],[6.135,275],[6.148,276],[6.171,278],[6.188,277],[6.200,275],[6.212,275],[6.255,278],[6.266,280],[6.275,280],[6.283,279],[6.297,274],[6.311,271],[6.324,270],[6.337,270],[6.368,277],[6.378,280],[6.388,281],[6.397,282],[6.405,280],[6.451,262],[6.461,260],[6.471,260],[6.483,262],[6.493,265],[6.511,271],[6.523,276],[6.537,279],[6.549,281],[6.561,280],[6.571,279],[6.583,274],[6.596,265],[6.616,254],[6.626,249],[6.638,246],[6.650,245],[6.663,245],[6.675,247],[6.720,262],[6.734,265],[6.748,267],[6.758,268],[6.767,267],[6.777,265],[6.786,262],[6.788,261],[6.790,262],[6.811,252],[6.826,247],[6.837,243],[6.849,242],[6.889,239],[6.899,240],[6.906,242],[6.915,247],[6.940,261],[6.950,265],[6.960,267],[6.969,267],[6.980,264],[6.988,262],[6.996,259],[7.006,253],[7.035,236],[7.044,233],[7.056,230],[7.067,228],[7.097,226],[7.129,223],[7.142,222],[7.152,223],[7.167,224],[7.197,222],[7.207,220],[7.235,217],[7.243,216],[7.248,216],[7.256,216],[7.288,217],[7.299,217],[7.310,217],[7.323,217],[7.370,213],[7.379,212],[7.389,210],[7.396,210],[7.405,210],[7.416,211],[7.425,211],[7.435,211],[7.448,214],[7.473,219],[7.537,228],[7.598,229],[7.663,234],[7.679,236],[7.696,238],[7.737,244],[7.746,243],[7.755,240],[7.792,222],[7.801,218],[7.813,217],[7.826,218],[7.890,229],[7.913,233],[7.939,235],[7.972,241],[8.003,244],[8.017,245],[8.031,244],[8.057,239],[8.065,239],[8.074,239],[8.081,241],[8.086,243],[8.096,245],[8.158,259],[8.171,260],[8.182,259],[8.192,258],[8.202,258],[8.215,255],[8.274,251],[8.284,252],[8.294,255],[8.304,257],[8.315,260],[8.327,261],[8.339,261],[8.349,262],[8.359,263],[8.371,264],[8.385,266],[8.428,273],[8.437,273],[8.445,273],[8.455,271],[8.473,270],[8.484,272],[8.491,273],[8.498,273],[8.506,272],[8.546,271],[8.594,272],[8.609,274],[8.618,275],[8.627,277],[8.641,279],[8.648,281],[8.660,283],[8.674,284],[8.687,286],[8.717,287],[8.740,291],[8.750,293],[8.762,295],[8.774,290],[8.786,293],[8.797,295],[8.848,302],[8.870,305],[8.879,305],[8.912,306],[8.924,306],[8.935,305],[8.965,303],[8.975,303],[8.984,303],[8.992,303],[9.000,304],[9.008,304],[9.019,305],[9.046,305],[9.073,309],[9.101,313],[9.112,315],[9.123,315],[9.134,315],[9.145,314],[9.155,315],[9.163,316],[9.172,317],[9.182,319],[9.192,320],[9.202,322],[9.223,323],[9.236,322],[9.249,321],[9.262,321],[9.273,321],[9.281,322],[9.288,322],[9.295,324],[9.304,326],[9.331,330],[9.388,340],[9.429,354],[9.445,358],[9.453,360],[9.460,360],[9.470,361],[9.479,361],[9.486,361],[9.495,359],[9.517,354],[9.526,352],[9.535,352],[9.545,351],[9.585,351],[9.615,351],[9.630,350],[9.643,349],[9.656,348],[9.669,348],[9.699,349],[9.743,355],[9.757,357],[9.775,358],[9.809,356],[9.819,357],[9.856,361],[9.870,362],[9.894,366],[9.923,371],[9.935,372],[9.946,372],[9.958,370],[10.000,367],[10.011,367],[10.025,368],[10.041,369],[10.055,372],[10.065,375],[10.143,402],[10.170,406],[10.182,407],[10.190,408],[10.198,408],[10.210,408],[10.216,408],[10.225,410],[10.228,411],[10.239,414],[10.252,418],[10.260,419],[10.268,418],[10.288,411],[10.294,409],[10.301,407],[10.315,405],[10.355,402],[10.374,405],[10.386,407],[10.396,408],[10.407,410],[10.420,410],[10.444,408],[10.453,408],[10.461,408],[10.470,411],[10.479,413],[10.500,421],[10.514,426],[10.526,428],[10.534,427],[10.543,428],[10.553,428],[10.563,429],[10.573,428],[10.586,426],[10.616,419],[10.624,417],[10.630,416],[10.637,416],[10.643,417],[10.651,418],[10.659,419],[10.667,419],[10.675,420],[10.686,422],[10.724,434],[10.738,439],[10.743,440],[10.757,440],[10.775,437],[10.797,433],[10.812,432],[10.827,434],[10.841,436],[10.857,437],[10.872,435],[10.885,433],[10.909,428],[10.921,428],[10.931,429],[10.941,430],[10.949,432],[10.967,435],[10.984,437],[11.004,437],[11.019,436],[11.032,435],[11.080,433],[11.095,434],[11.109,436],[11.146,443],[11.160,443],[11.168,443],[11.179,443],[11.198,440],[11.229,440],[11.259,439],[11.270,440],[11.276,440],[11.282,441],[11.286,441],[11.295,443],[11.304,445],[11.342,451],[11.380,452],[11.389,452],[11.398,453],[11.407,453],[11.416,454],[11.426,455],[11.450,456],[11.516,457],[11.559,455],[11.566,454],[11.575,453],[11.584,453],[11.595,453],[11.604,453],[11.649,454],[11.665,456],[11.683,455],[11.731,453],[11.735,452],[11.772,452],[11.779,452],[11.786,452],[11.794,452],[11.800,453],[11.807,453],[11.814,454],[11.822,454],[11.850,455],[11.877,452],[11.942,447],[11.970,447],[11.998,445],[12.015,443],[12.022,442],[12.029,441],[12.035,440],[12.042,439],[12.051,438],[12.062,438],[12.074,437],[12.088,437],[12.102,437],[12.150,437],[12.161,437],[12.170,437],[12.179,436],[12.188,436],[12.197,436],[12.208,435],[12.266,433],[12.312,430],[12.327,428],[12.342,427],[12.369,427],[12.385,427],[12.398,426],[12.411,425],[12.462,422],[12.470,422],[12.475,422],[12.487,421],[12.496,420],[12.505,419],[12.518,418],[12.545,416],[12.553,416],[12.561,415],[12.567,414],[12.575,414],[12.600,416],[12.611,416],[12.619,416],[12.648,413],[12.674,412],[12.700,414],[12.713,415],[12.721,415],[12.728,417],[12.743,420],[12.750,421],[12.757,422],[12.774,421],[12.816,419],[12.825,418],[12.832,418],[12.842,416],[12.855,414],[12.896,404],[12.901,403],[12.912,401],[12.923,403],[12.934,407],[12.943,408],[12.950,408],[12.958,407],[12.970,405],[13.013,400],[13.024,400],[13.033,400],[13.041,400],[13.048,402],[13.063,407],[13.069,409],[13.076,411],[13.083,411],[13.095,408],[13.125,397],[13.134,394],[13.143,392],[13.151,390],[13.163,390],[13.190,392],[13.196,392],[13.203,393],[13.210,393],[13.216,394],[13.226,393],[13.247,389],[13.260,386],[13.267,385],[13.275,384],[13.282,383],[13.328,380],[13.365,385],[13.373,385],[13.380,385],[13.387,385],[13.395,386],[13.403,386],[13.411,387],[13.420,389],[13.428,392],[13.436,393],[13.450,395],[13.470,393],[13.495,391],[13.545,388],[13.576,386],[13.588,386],[13.603,386],[13.668,391],[13.679,391],[13.689,392],[13.702,393],[13.725,392],[13.738,390],[13.748,390],[13.757,390],[13.769,390],[13.780,390],[13.794,390],[13.804,389],[13.813,388],[13.823,387],[13.832,386],[13.843,385],[13.858,384],[13.942,378],[13.962,378],[13.973,377],[13.983,377],[13.994,376],[14.004,375],[14.014,374],[14.023,374],[14.036,374],[14.050,374],[14.059,374],[14.067,374],[14.102,372],[14.172,365],[14.185,364],[14.222,361],[14.282,357],[14.318,356],[14.342,354],[14.405,349],[14.432,348],[14.444,346],[14.456,346],[14.467,345],[14.480,344],[14.492,344],[14.503,344],[14.563,346],[14.604,344],[14.641,343],[14.666,344],[14.681,345],[14.703,346],[14.728,347],[14.780,348],[14.841,355],[14.859,357],[14.877,359],[14.894,359],[14.910,360],[14.961,362],[14.994,365],[15.008,366],[15.025,368],[15.057,371],[15.118,381],[15.139,383],[15.154,384],[15.168,384],[15.177,385],[15.184,385],[15.194,386],[15.215,387],[15.250,391],[15.284,392],[15.304,391],[15.317,391],[15.328,391],[15.340,392],[15.357,392],[15.367,393],[15.381,394],[15.442,400],[15.456,402],[15.469,403],[15.481,404],[15.495,405],[15.507,405],[15.553,409],[15.609,419],[15.681,421],[15.698,422],[15.715,425],[15.731,427],[15.749,428],[15.766,429],[15.783,430],[15.815,432],[15.922,434],[15.943,435],[15.961,435],[15.979,436],[15.999,437],[16.023,437],[16.131,443],[16.227,443],[16.241,444],[16.253,444],[16.264,444],[16.277,445],[16.292,445],[16.308,444],[16.328,443],[16.345,442],[16.368,440],[16.390,442],[16.396,440],[16.402,438],[16.409,437],[16.451,440],[16.467,442],[16.480,444],[16.492,446],[16.502,447],[16.513,447],[16.523,445],[16.563,440],[16.585,437],[16.595,436],[16.603,435],[16.611,435],[16.618,435],[16.646,433],[16.665,432],[16.676,432],[16.690,431],[16.725,430],[16.745,430],[16.756,430],[16.769,430],[16.781,430],[16.821,427],[16.840,427],[16.863,429],[16.870,429],[16.877,429],[16.893,427],[16.923,424],[16.941,423],[16.959,423],[16.999,423],[17.052,422],[17.117,415],[17.128,414],[17.140,413],[17.172,412],[17.234,414],[17.245,415],[17.256,416],[17.266,416],[17.280,416],[17.395,412],[17.480,413],[17.494,413],[17.508,413],[17.568,410],[17.590,408],[17.609,407],[17.658,406],[17.674,407],[17.690,408],[17.715,409],[17.740,407],[17.761,405],[17.824,396],[17.847,393],[17.865,392],[17.886,393],[17.901,393],[17.915,393],[17.928,393],[17.958,394],[17.977,396],[17.987,398],[17.997,399],[18.013,402],[18.098,413],[18.126,413],[18.210,404],[18.239,404],[18.256,404],[18.274,403],[18.290,402],[18.306,402],[18.322,401],[18.340,401],[18.371,400],[18.387,399],[18.402,399],[18.513,399],[18.568,396],[18.581,395],[18.595,394],[18.625,392],[18.638,391],[18.653,389],[18.668,388],[18.846,378],[18.906,378],[18.941,379],[18.965,378],[19.025,376],[19.054,372],[19.114,368],[19.169,365],[19.197,365],[19.251,365],[19.305,360],[19.337,358],[19.341,358],[19.348,358],[19.358,359],[19.381,358],[19.396,358],[19.408,358],[19.506,349],[19.521,348],[19.578,342],[19.595,340],[19.608,339],[19.621,337],[19.664,335],[19.678,333],[19.697,331],[19.822,322],[19.835,321],[19.907,317],[19.918,317],[19.926,316],[19.934,316],[19.943,314],[19.954,313],[19.964,313],[19.978,314],[19.991,315],[20.004,316],[20.022,316],[20.044,317],[20.064,316],[20.083,315],[20.113,313],[20.139,310],[20.174,310],[20.205,309],[20.235,301],[20.247,298],[20.261,295],[20.305,289],[20.317,289],[20.330,289],[20.343,289],[20.358,288],[20.370,287],[20.380,287],[20.390,285],[20.431,279],[20.443,277],[20.452,276],[20.497,273],[20.524,269],[20.537,268],[20.551,267],[20.568,268],[20.577,267],[20.586,264],[20.594,260],[20.597,259],[20.602,257],[20.610,254],[20.620,251],[20.627,250],[20.636,249],[20.648,250],[20.680,255],[20.691,255],[20.704,254],[20.715,252],[20.730,248],[20.741,247],[20.754,248],[20.765,248],[20.774,248],[20.783,247],[20.791,247],[20.801,246],[20.818,244],[20.832,243],[20.846,244],[20.879,246],[20.912,254],[20.925,257],[20.935,258],[20.943,258],[20.953,256],[20.976,249],[21.004,241],[21.033,234],[21.043,231],[21.057,228],[21.067,226],[21.076,226],[21.110,223],[21.145,213],[21.152,210],[21.160,208],[21.169,206],[21.182,205],[21.218,202],[21.254,205],[21.265,206],[21.276,205],[21.289,203],[21.379,183],[21.395,181],[21.456,177],[21.465,175],[21.473,173],[21.481,171],[21.487,169],[21.493,167],[21.501,165],[21.508,163],[21.518,162],[21.527,161],[21.553,160],[21.652,152],[21.719,151],[21.726,150],[21.733,149],[21.739,147],[21.742,147],[21.746,146],[21.753,145],[21.759,144],[21.768,143],[21.780,142],[21.808,138],[21.890,133],[21.917,131],[21.930,130],[21.940,128],[21.947,125],[21.954,123],[21.961,120],[21.968,119],[21.977,118],[21.985,119],[22.016,122],[22.027,122],[22.036,120],[22.046,118],[22.119,108],[22.138,104],[22.154,100],[22.215,84],[22.219,83],[22.221,83],[22.228,84],[22.236,85],[22.264,90],[22.293,90],[22.321,90],[22.331,89],[22.356,82],[22.377,76],[22.387,75],[22.409,75],[22.421,76],[22.456,72],[22.470,71],[22.481,69],[22.491,67],[22.502,65],[22.515,63],[22.532,64],[22.547,64],[22.564,64],[22.587,63],[22.612,61],[22.631,58],[22.653,53],[22.686,43],[22.701,40],[22.716,38],[22.764,38],[22.818,35],[22.832,33],[22.844,28],[22.856,23],[22.871,17],[22.898,8],[22.925,6],[22.951,6],[22.957,6]];

const TRACK_D5_PR21 = [[37.85407,-25.29627],[37.85403,-25.29624],[37.85401,-25.29624],[37.85399,-25.29624],[37.85396,-25.29624],[37.85392,-25.29625],[37.85389,-25.29625],[37.85385,-25.29625],[37.85383,-25.29626],[37.85381,-25.29626],[37.85376,-25.29626],[37.85372,-25.29626],[37.85372,-25.29626],[37.85369,-25.29625],[37.85367,-25.29625],[37.85367,-25.29620],[37.85367,-25.29618],[37.85366,-25.29617],[37.85364,-25.29616],[37.85360,-25.29614],[37.85359,-25.29613],[37.85359,-25.29613],[37.85358,-25.29612],[37.85356,-25.29611],[37.85355,-25.29611],[37.85354,-25.29614],[37.85352,-25.29611],[37.85349,-25.29607],[37.85344,-25.29606],[37.85336,-25.29605],[37.85335,-25.29602],[37.85337,-25.29597],[37.85338,-25.29594],[37.85338,-25.29593],[37.85336,-25.29591],[37.85334,-25.29591],[37.85334,-25.29591],[37.85333,-25.29590],[37.85334,-25.29589],[37.85336,-25.29588],[37.85339,-25.29584],[37.85342,-25.29577],[37.85342,-25.29575],[37.85343,-25.29570],[37.85343,-25.29568],[37.85343,-25.29568],[37.85343,-25.29566],[37.85343,-25.29566],[37.85342,-25.29564],[37.85342,-25.29564],[37.85340,-25.29561],[37.85340,-25.29560],[37.85339,-25.29558],[37.85336,-25.29553],[37.85339,-25.29551],[37.85338,-25.29545],[37.85336,-25.29544],[37.85332,-25.29541],[37.85328,-25.29538],[37.85319,-25.29532],[37.85317,-25.29533],[37.85315,-25.29532],[37.85307,-25.29530],[37.85306,-25.29529],[37.85306,-25.29529],[37.85302,-25.29526],[37.85300,-25.29525],[37.85296,-25.29518],[37.85295,-25.29517],[37.85289,-25.29509],[37.85288,-25.29508],[37.85286,-25.29507],[37.85281,-25.29505],[37.85279,-25.29504],[37.85277,-25.29504],[37.85277,-25.29504],[37.85274,-25.29504],[37.85271,-25.29504],[37.85265,-25.29504],[37.85265,-25.29504],[37.85263,-25.29503],[37.85263,-25.29502],[37.85260,-25.29500],[37.85257,-25.29498],[37.85255,-25.29496],[37.85248,-25.29492],[37.85247,-25.29491],[37.85242,-25.29487],[37.85239,-25.29484],[37.85234,-25.29480],[37.85232,-25.29479],[37.85227,-25.29474],[37.85224,-25.29471],[37.85220,-25.29468],[37.85218,-25.29466],[37.85212,-25.29462],[37.85208,-25.29461],[37.85206,-25.29461],[37.85202,-25.29460],[37.85199,-25.29459],[37.85196,-25.29458],[37.85194,-25.29457],[37.85194,-25.29457],[37.85192,-25.29456],[37.85192,-25.29456],[37.85190,-25.29454],[37.85189,-25.29452],[37.85186,-25.29448],[37.85186,-25.29448],[37.85183,-25.29445],[37.85182,-25.29442],[37.85181,-25.29440],[37.85179,-25.29437],[37.85179,-25.29437],[37.85179,-25.29437],[37.85181,-25.29440],[37.85182,-25.29442],[37.85183,-25.29445],[37.85186,-25.29448],[37.85186,-25.29448],[37.85189,-25.29452],[37.85190,-25.29454],[37.85192,-25.29456],[37.85192,-25.29456],[37.85194,-25.29457],[37.85194,-25.29457],[37.85196,-25.29458],[37.85199,-25.29459],[37.85202,-25.29460],[37.85206,-25.29461],[37.85208,-25.29461],[37.85212,-25.29462],[37.85218,-25.29466],[37.85220,-25.29468],[37.85224,-25.29471],[37.85227,-25.29474],[37.85232,-25.29479],[37.85234,-25.29480],[37.85239,-25.29484],[37.85242,-25.29487],[37.85247,-25.29491],[37.85248,-25.29492],[37.85255,-25.29496],[37.85257,-25.29498],[37.85260,-25.29500],[37.85263,-25.29502],[37.85263,-25.29503],[37.85265,-25.29504],[37.85265,-25.29504],[37.85271,-25.29504],[37.85274,-25.29504],[37.85277,-25.29504],[37.85277,-25.29504],[37.85279,-25.29504],[37.85281,-25.29505],[37.85286,-25.29507],[37.85288,-25.29508],[37.85289,-25.29509],[37.85295,-25.29517],[37.85296,-25.29518],[37.85300,-25.29525],[37.85302,-25.29526],[37.85306,-25.29529],[37.85306,-25.29529],[37.85307,-25.29530],[37.85315,-25.29532],[37.85317,-25.29533],[37.85319,-25.29532],[37.85328,-25.29538],[37.85332,-25.29541],[37.85336,-25.29544],[37.85338,-25.29545],[37.85341,-25.29536],[37.85341,-25.29532],[37.85341,-25.29529],[37.85338,-25.29523],[37.85333,-25.29519],[37.85332,-25.29518],[37.85331,-25.29518],[37.85327,-25.29514],[37.85325,-25.29510],[37.85323,-25.29508],[37.85327,-25.29508],[37.85332,-25.29509],[37.85333,-25.29509],[37.85338,-25.29508],[37.85340,-25.29507],[37.85339,-25.29505],[37.85334,-25.29504],[37.85333,-25.29504],[37.85332,-25.29501],[37.85331,-25.29500],[37.85328,-25.29494],[37.85326,-25.29485],[37.85326,-25.29485],[37.85325,-25.29483],[37.85322,-25.29479],[37.85319,-25.29477],[37.85317,-25.29474],[37.85315,-25.29474],[37.85308,-25.29477],[37.85306,-25.29475],[37.85306,-25.29475],[37.85305,-25.29474],[37.85301,-25.29471],[37.85293,-25.29465],[37.85290,-25.29463],[37.85287,-25.29462],[37.85283,-25.29461],[37.85279,-25.29459],[37.85279,-25.29459],[37.85279,-25.29459],[37.85279,-25.29459],[37.85275,-25.29460],[37.85272,-25.29461],[37.85269,-25.29461],[37.85263,-25.29459],[37.85262,-25.29458],[37.85257,-25.29453],[37.85254,-25.29449],[37.85253,-25.29449],[37.85251,-25.29448],[37.85250,-25.29449],[37.85246,-25.29450],[37.85244,-25.29448],[37.85243,-25.29448],[37.85243,-25.29444],[37.85243,-25.29442],[37.85242,-25.29440],[37.85235,-25.29434],[37.85234,-25.29434],[37.85232,-25.29432],[37.85227,-25.29427],[37.85226,-25.29426],[37.85226,-25.29426],[37.85220,-25.29418],[37.85219,-25.29417],[37.85218,-25.29415],[37.85218,-25.29415],[37.85214,-25.29414],[37.85210,-25.29413],[37.85209,-25.29413],[37.85207,-25.29413],[37.85205,-25.29413],[37.85202,-25.29412],[37.85200,-25.29412],[37.85198,-25.29412],[37.85196,-25.29412],[37.85193,-25.29412],[37.85192,-25.29412],[37.85183,-25.29413],[37.85183,-25.29413],[37.85180,-25.29411],[37.85178,-25.29410],[37.85177,-25.29410],[37.85174,-25.29408],[37.85173,-25.29408],[37.85172,-25.29407],[37.85168,-25.29405],[37.85164,-25.29406],[37.85164,-25.29406],[37.85162,-25.29408],[37.85160,-25.29409],[37.85158,-25.29413],[37.85156,-25.29413],[37.85155,-25.29413],[37.85152,-25.29414],[37.85152,-25.29414],[37.85148,-25.29412],[37.85145,-25.29410],[37.85139,-25.29413],[37.85138,-25.29413],[37.85135,-25.29414],[37.85134,-25.29415],[37.85132,-25.29414],[37.85128,-25.29412],[37.85127,-25.29412],[37.85125,-25.29411],[37.85119,-25.29408],[37.85119,-25.29408],[37.85112,-25.29410],[37.85106,-25.29412],[37.85102,-25.29413],[37.85101,-25.29413],[37.85101,-25.29413],[37.85099,-25.29413],[37.85098,-25.29414],[37.85098,-25.29414],[37.85097,-25.29414],[37.85092,-25.29414],[37.85091,-25.29413],[37.85090,-25.29412],[37.85087,-25.29408],[37.85085,-25.29405],[37.85087,-25.29403],[37.85088,-25.29403],[37.85091,-25.29403],[37.85094,-25.29401],[37.85094,-25.29401],[37.85094,-25.29398],[37.85090,-25.29396],[37.85086,-25.29397],[37.85084,-25.29397],[37.85083,-25.29397],[37.85079,-25.29399],[37.85075,-25.29400],[37.85073,-25.29401],[37.85072,-25.29401],[37.85064,-25.29403],[37.85064,-25.29403],[37.85063,-25.29403],[37.85061,-25.29403],[37.85060,-25.29403],[37.85057,-25.29403],[37.85054,-25.29403],[37.85052,-25.29403],[37.85051,-25.29403],[37.85051,-25.29403],[37.85049,-25.29403],[37.85047,-25.29403],[37.85042,-25.29403],[37.85039,-25.29403],[37.85039,-25.29403],[37.85039,-25.29403],[37.85035,-25.29404],[37.85033,-25.29404],[37.85033,-25.29404],[37.85031,-25.29404],[37.85030,-25.29404],[37.85028,-25.29403],[37.85027,-25.29403],[37.85024,-25.29404],[37.85021,-25.29407],[37.85020,-25.29407],[37.85019,-25.29408],[37.85017,-25.29410],[37.85016,-25.29410],[37.85016,-25.29410],[37.85016,-25.29411],[37.85014,-25.29412],[37.85012,-25.29414],[37.85011,-25.29415],[37.85009,-25.29418],[37.85007,-25.29420],[37.85005,-25.29422],[37.85004,-25.29422],[37.85003,-25.29424],[37.85002,-25.29426],[37.85001,-25.29426],[37.85001,-25.29426],[37.85000,-25.29428],[37.84998,-25.29433],[37.84998,-25.29435],[37.84998,-25.29436],[37.84998,-25.29436],[37.84997,-25.29438],[37.84998,-25.29440],[37.84998,-25.29444],[37.84998,-25.29444],[37.84999,-25.29447],[37.84999,-25.29449],[37.84999,-25.29450],[37.85000,-25.29454],[37.85001,-25.29458],[37.85003,-25.29461],[37.85003,-25.29461],[37.85003,-25.29465],[37.85003,-25.29466],[37.85003,-25.29468],[37.85002,-25.29469],[37.85002,-25.29469],[37.85001,-25.29470],[37.85001,-25.29472],[37.85000,-25.29473],[37.85000,-25.29473],[37.84999,-25.29475],[37.84999,-25.29475],[37.84999,-25.29475],[37.84998,-25.29476],[37.84998,-25.29476],[37.84994,-25.29477],[37.84989,-25.29481],[37.84985,-25.29483],[37.84983,-25.29484],[37.84981,-25.29484],[37.84979,-25.29484],[37.84979,-25.29484],[37.84976,-25.29485],[37.84976,-25.29486],[37.84975,-25.29486],[37.84974,-25.29486],[37.84971,-25.29486],[37.84971,-25.29486],[37.84967,-25.29483],[37.84968,-25.29480],[37.84970,-25.29478],[37.84971,-25.29477],[37.84972,-25.29476],[37.84972,-25.29475],[37.84974,-25.29474],[37.84974,-25.29473],[37.84975,-25.29473],[37.84975,-25.29472],[37.84976,-25.29470],[37.84977,-25.29470],[37.84977,-25.29469],[37.84978,-25.29467],[37.84976,-25.29464],[37.84975,-25.29464],[37.84974,-25.29463],[37.84971,-25.29462],[37.84970,-25.29461],[37.84969,-25.29461],[37.84966,-25.29460],[37.84962,-25.29458],[37.84962,-25.29458],[37.84962,-25.29458],[37.84961,-25.29457],[37.84961,-25.29457],[37.84959,-25.29455],[37.84956,-25.29453],[37.84956,-25.29451],[37.84957,-25.29449],[37.84961,-25.29446],[37.84961,-25.29446],[37.84964,-25.29443],[37.84967,-25.29441],[37.84968,-25.29441],[37.84971,-25.29437],[37.84972,-25.29435],[37.84972,-25.29433],[37.84974,-25.29428],[37.84975,-25.29427],[37.84975,-25.29425],[37.84976,-25.29421],[37.84976,-25.29419],[37.84976,-25.29416],[37.84977,-25.29414],[37.84977,-25.29414],[37.84978,-25.29411],[37.84979,-25.29410],[37.84981,-25.29406],[37.84982,-25.29405],[37.84983,-25.29403],[37.84983,-25.29403],[37.84986,-25.29398],[37.84989,-25.29390],[37.84990,-25.29384],[37.84991,-25.29383],[37.84991,-25.29382],[37.84989,-25.29377],[37.84989,-25.29376],[37.84989,-25.29372],[37.84991,-25.29363],[37.84991,-25.29363],[37.84991,-25.29357],[37.84991,-25.29356],[37.84990,-25.29353],[37.84990,-25.29351],[37.84990,-25.29344],[37.84989,-25.29334],[37.84987,-25.29328],[37.84984,-25.29318],[37.84981,-25.29309],[37.84978,-25.29298],[37.84976,-25.29291],[37.84976,-25.29284],[37.84974,-25.29276],[37.84973,-25.29271],[37.84972,-25.29266],[37.84970,-25.29262],[37.84965,-25.29258],[37.84962,-25.29254],[37.84958,-25.29252],[37.84952,-25.29245],[37.84948,-25.29237],[37.84896,-25.29219],[37.84865,-25.29209],[37.84865,-25.29208],[37.84866,-25.29207],[37.84878,-25.29198],[37.84878,-25.29198],[37.84880,-25.29197],[37.84881,-25.29197],[37.84881,-25.29196],[37.84887,-25.29194],[37.84890,-25.29192],[37.84893,-25.29191],[37.84895,-25.29190],[37.84897,-25.29189],[37.84902,-25.29187],[37.84909,-25.29178],[37.84915,-25.29174],[37.84919,-25.29171],[37.84919,-25.29170],[37.84920,-25.29170],[37.84922,-25.29168],[37.84922,-25.29168],[37.84924,-25.29166],[37.84924,-25.29165],[37.84939,-25.29152],[37.84941,-25.29150],[37.84946,-25.29146],[37.84948,-25.29144],[37.84949,-25.29143],[37.84954,-25.29137],[37.84956,-25.29135],[37.84957,-25.29134],[37.84959,-25.29132],[37.84960,-25.29131],[37.84960,-25.29131],[37.84961,-25.29129],[37.84963,-25.29126],[37.84964,-25.29124],[37.84965,-25.29123],[37.84966,-25.29121],[37.84967,-25.29120],[37.84968,-25.29119],[37.84968,-25.29118],[37.84979,-25.29106],[37.84979,-25.29105],[37.84983,-25.29100],[37.84984,-25.29099],[37.84986,-25.29098],[37.84987,-25.29097],[37.84988,-25.29095],[37.84990,-25.29093],[37.84990,-25.29093],[37.84992,-25.29090],[37.84993,-25.29089],[37.84994,-25.29088],[37.84997,-25.29084],[37.84999,-25.29081],[37.84999,-25.29080],[37.84999,-25.29079],[37.85001,-25.29077],[37.85005,-25.29068],[37.85009,-25.29066],[37.85009,-25.29066],[37.85011,-25.29065],[37.85016,-25.29064],[37.85018,-25.29063],[37.85018,-25.29063],[37.85018,-25.29063],[37.85019,-25.29063],[37.85023,-25.29060],[37.85025,-25.29060],[37.85029,-25.29058],[37.85031,-25.29057],[37.85033,-25.29056],[37.85034,-25.29055],[37.85036,-25.29054],[37.85038,-25.29053],[37.85039,-25.29053],[37.85042,-25.29052],[37.85043,-25.29052],[37.85044,-25.29052],[37.85046,-25.29050],[37.85047,-25.29049],[37.85047,-25.29049],[37.85048,-25.29045],[37.85053,-25.29045],[37.85067,-25.29046],[37.85080,-25.29051],[37.85093,-25.29050],[37.85100,-25.29046],[37.85113,-25.29042],[37.85117,-25.29040],[37.85131,-25.29039],[37.85152,-25.29039],[37.85152,-25.29035],[37.85153,-25.29033],[37.85151,-25.29030],[37.85151,-25.29030],[37.85150,-25.29029],[37.85149,-25.29026],[37.85152,-25.29023],[37.85148,-25.29022],[37.85145,-25.29021],[37.85141,-25.29019],[37.85137,-25.29018],[37.85133,-25.29017],[37.85130,-25.29015],[37.85127,-25.29011],[37.85125,-25.29010],[37.85121,-25.29008],[37.85114,-25.29008],[37.85111,-25.29006],[37.85106,-25.29006],[37.85101,-25.29004],[37.85099,-25.29004],[37.85093,-25.29006],[37.85089,-25.29007],[37.85085,-25.29007],[37.85086,-25.29005],[37.85086,-25.29002],[37.85084,-25.29003],[37.85085,-25.29001],[37.85087,-25.29000],[37.85088,-25.28998],[37.85088,-25.28997],[37.85087,-25.28996],[37.85085,-25.28995],[37.85084,-25.28995],[37.85081,-25.28996],[37.85075,-25.28995],[37.85073,-25.28996],[37.85073,-25.28995],[37.85070,-25.28994],[37.85068,-25.28993],[37.85065,-25.28991],[37.85064,-25.28991],[37.85062,-25.28988],[37.85060,-25.28987],[37.85057,-25.28984],[37.85056,-25.28980],[37.85055,-25.28978],[37.85054,-25.28977],[37.85053,-25.28975],[37.85052,-25.28975],[37.85051,-25.28976],[37.85049,-25.28975],[37.85048,-25.28974],[37.85045,-25.28973],[37.85045,-25.28974],[37.85044,-25.28974],[37.85043,-25.28976],[37.85042,-25.28977],[37.85041,-25.28978],[37.85040,-25.28979],[37.85040,-25.28979],[37.85038,-25.28980],[37.85035,-25.28981],[37.85034,-25.28981],[37.85033,-25.28981],[37.85031,-25.28982],[37.85030,-25.28982],[37.85026,-25.28982],[37.85026,-25.28982],[37.85026,-25.28982],[37.85026,-25.28982],[37.85026,-25.28982],[37.85023,-25.28979],[37.85019,-25.28981],[37.85016,-25.28983],[37.85019,-25.28981],[37.85023,-25.28979],[37.85026,-25.28982],[37.85026,-25.28982],[37.85026,-25.28982],[37.85026,-25.28982],[37.85026,-25.28982],[37.85030,-25.28982],[37.85031,-25.28982],[37.85033,-25.28981],[37.85034,-25.28981],[37.85035,-25.28981],[37.85038,-25.28980],[37.85040,-25.28979],[37.85040,-25.28979],[37.85041,-25.28978],[37.85042,-25.28977],[37.85043,-25.28976],[37.85044,-25.28974],[37.85045,-25.28974],[37.85045,-25.28973],[37.85048,-25.28974],[37.85049,-25.28975],[37.85051,-25.28976],[37.85052,-25.28975],[37.85053,-25.28975],[37.85054,-25.28977],[37.85055,-25.28978],[37.85056,-25.28980],[37.85057,-25.28984],[37.85060,-25.28987],[37.85062,-25.28988],[37.85064,-25.28991],[37.85065,-25.28991],[37.85068,-25.28993],[37.85070,-25.28994],[37.85073,-25.28995],[37.85073,-25.28996],[37.85075,-25.28995],[37.85081,-25.28996],[37.85084,-25.28995],[37.85085,-25.28995],[37.85087,-25.28996],[37.85088,-25.28997],[37.85088,-25.28998],[37.85087,-25.29000],[37.85085,-25.29001],[37.85084,-25.29003],[37.85086,-25.29002],[37.85086,-25.29005],[37.85085,-25.29007],[37.85089,-25.29007],[37.85093,-25.29006],[37.85099,-25.29004],[37.85101,-25.29004],[37.85106,-25.29006],[37.85111,-25.29006],[37.85114,-25.29008],[37.85121,-25.29008],[37.85125,-25.29010],[37.85127,-25.29011],[37.85130,-25.29015],[37.85133,-25.29017],[37.85137,-25.29018],[37.85141,-25.29019],[37.85145,-25.29021],[37.85148,-25.29022],[37.85152,-25.29023],[37.85149,-25.29026],[37.85150,-25.29029],[37.85151,-25.29030],[37.85151,-25.29030],[37.85153,-25.29033],[37.85152,-25.29035],[37.85152,-25.29039],[37.85155,-25.29038],[37.85166,-25.29041],[37.85183,-25.29042],[37.85189,-25.29042],[37.85212,-25.29043],[37.85216,-25.29046],[37.85223,-25.29050],[37.85233,-25.29047],[37.85239,-25.29049],[37.85247,-25.29049],[37.85247,-25.29046],[37.85247,-25.29046],[37.85247,-25.29045],[37.85248,-25.29044],[37.85248,-25.29043],[37.85248,-25.29042],[37.85247,-25.29038],[37.85245,-25.29035],[37.85244,-25.29035],[37.85244,-25.29034],[37.85243,-25.29033],[37.85243,-25.29032],[37.85244,-25.29032],[37.85244,-25.29032],[37.85245,-25.29031],[37.85245,-25.29031],[37.85247,-25.29030],[37.85248,-25.29029],[37.85249,-25.29027],[37.85251,-25.29022],[37.85253,-25.29019],[37.85255,-25.29019],[37.85262,-25.29018],[37.85267,-25.29017],[37.85272,-25.29016],[37.85275,-25.29016],[37.85277,-25.29016],[37.85278,-25.29015],[37.85285,-25.29014],[37.85296,-25.29012],[37.85299,-25.29012],[37.85311,-25.29010],[37.85318,-25.29009],[37.85322,-25.29007],[37.85322,-25.29004],[37.85322,-25.29003],[37.85322,-25.29002],[37.85317,-25.29000],[37.85317,-25.28999],[37.85317,-25.28998],[37.85316,-25.28997],[37.85315,-25.28997],[37.85309,-25.28996],[37.85309,-25.28995],[37.85304,-25.28994],[37.85303,-25.28994],[37.85300,-25.28992],[37.85290,-25.28988],[37.85287,-25.28986],[37.85283,-25.28983],[37.85281,-25.28982],[37.85281,-25.28981],[37.85280,-25.28980],[37.85275,-25.28976],[37.85273,-25.28974],[37.85272,-25.28973],[37.85267,-25.28971],[37.85265,-25.28966],[37.85264,-25.28964],[37.85263,-25.28953],[37.85266,-25.28949],[37.85272,-25.28945],[37.85273,-25.28944],[37.85279,-25.28938],[37.85283,-25.28934],[37.85284,-25.28933],[37.85287,-25.28932],[37.85290,-25.28932],[37.85292,-25.28931],[37.85294,-25.28930],[37.85298,-25.28930],[37.85300,-25.28930],[37.85304,-25.28930],[37.85308,-25.28929],[37.85310,-25.28928],[37.85312,-25.28926],[37.85305,-25.28917],[37.85303,-25.28914],[37.85299,-25.28913],[37.85289,-25.28911],[37.85286,-25.28910],[37.85285,-25.28910],[37.85284,-25.28909],[37.85282,-25.28908],[37.85281,-25.28907],[37.85281,-25.28907],[37.85279,-25.28906],[37.85278,-25.28906],[37.85276,-25.28907],[37.85274,-25.28907],[37.85274,-25.28907],[37.85274,-25.28907],[37.85271,-25.28908],[37.85268,-25.28909],[37.85268,-25.28909],[37.85267,-25.28910],[37.85267,-25.28910],[37.85263,-25.28915],[37.85263,-25.28915],[37.85259,-25.28916],[37.85259,-25.28916],[37.85258,-25.28915],[37.85256,-25.28914],[37.85255,-25.28914],[37.85254,-25.28914],[37.85255,-25.28914],[37.85256,-25.28914],[37.85258,-25.28915],[37.85259,-25.28916],[37.85259,-25.28916],[37.85263,-25.28915],[37.85263,-25.28915],[37.85267,-25.28910],[37.85267,-25.28910],[37.85268,-25.28909],[37.85268,-25.28909],[37.85271,-25.28908],[37.85274,-25.28907],[37.85274,-25.28907],[37.85274,-25.28907],[37.85276,-25.28907],[37.85278,-25.28906],[37.85279,-25.28906],[37.85281,-25.28907],[37.85281,-25.28907],[37.85282,-25.28908],[37.85284,-25.28909],[37.85285,-25.28910],[37.85286,-25.28910],[37.85289,-25.28911],[37.85299,-25.28913],[37.85303,-25.28914],[37.85309,-25.28912],[37.85310,-25.28912],[37.85311,-25.28912],[37.85311,-25.28912],[37.85311,-25.28912],[37.85315,-25.28912],[37.85318,-25.28912],[37.85318,-25.28912],[37.85320,-25.28913],[37.85322,-25.28914],[37.85322,-25.28915],[37.85328,-25.28916],[37.85331,-25.28916],[37.85331,-25.28916],[37.85332,-25.28916],[37.85332,-25.28916],[37.85335,-25.28916],[37.85336,-25.28916],[37.85339,-25.28919],[37.85340,-25.28921],[37.85341,-25.28921],[37.85346,-25.28921],[37.85347,-25.28921],[37.85348,-25.28921],[37.85349,-25.28921],[37.85353,-25.28920],[37.85354,-25.28920],[37.85357,-25.28920],[37.85358,-25.28918],[37.85358,-25.28916],[37.85359,-25.28913],[37.85359,-25.28913],[37.85359,-25.28911],[37.85359,-25.28909],[37.85359,-25.28908],[37.85359,-25.28907],[37.85356,-25.28903],[37.85354,-25.28901],[37.85351,-25.28898],[37.85351,-25.28898],[37.85350,-25.28897],[37.85349,-25.28896],[37.85344,-25.28889],[37.85343,-25.28888],[37.85342,-25.28887],[37.85342,-25.28887],[37.85341,-25.28886],[37.85339,-25.28884],[37.85335,-25.28881],[37.85335,-25.28881],[37.85335,-25.28881],[37.85335,-25.28881],[37.85335,-25.28881],[37.85339,-25.28884],[37.85341,-25.28886],[37.85342,-25.28887],[37.85342,-25.28887],[37.85343,-25.28888],[37.85344,-25.28889],[37.85349,-25.28896],[37.85350,-25.28897],[37.85351,-25.28898],[37.85351,-25.28898],[37.85354,-25.28901],[37.85356,-25.28903],[37.85359,-25.28907],[37.85359,-25.28908],[37.85359,-25.28909],[37.85359,-25.28911],[37.85359,-25.28913],[37.85359,-25.28913],[37.85358,-25.28916],[37.85358,-25.28918],[37.85357,-25.28920],[37.85354,-25.28920],[37.85353,-25.28920],[37.85349,-25.28921],[37.85348,-25.28921],[37.85347,-25.28921],[37.85346,-25.28921],[37.85341,-25.28921],[37.85340,-25.28921],[37.85339,-25.28919],[37.85336,-25.28916],[37.85335,-25.28916],[37.85332,-25.28916],[37.85332,-25.28916],[37.85331,-25.28916],[37.85331,-25.28916],[37.85328,-25.28916],[37.85322,-25.28915],[37.85322,-25.28914],[37.85320,-25.28913],[37.85318,-25.28912],[37.85318,-25.28912],[37.85315,-25.28912],[37.85311,-25.28912],[37.85311,-25.28912],[37.85311,-25.28912],[37.85310,-25.28912],[37.85309,-25.28912],[37.85303,-25.28914],[37.85302,-25.28913],[37.85302,-25.28913],[37.85301,-25.28911],[37.85299,-25.28909],[37.85298,-25.28909],[37.85294,-25.28906],[37.85294,-25.28906],[37.85293,-25.28905],[37.85292,-25.28904],[37.85291,-25.28902],[37.85290,-25.28902],[37.85293,-25.28898],[37.85295,-25.28897],[37.85297,-25.28894],[37.85298,-25.28893],[37.85299,-25.28893],[37.85300,-25.28890],[37.85301,-25.28889],[37.85301,-25.28888],[37.85304,-25.28888],[37.85305,-25.28888],[37.85308,-25.28888],[37.85312,-25.28887],[37.85312,-25.28887],[37.85314,-25.28886],[37.85316,-25.28885],[37.85317,-25.28884],[37.85318,-25.28884],[37.85318,-25.28884],[37.85320,-25.28881],[37.85321,-25.28880],[37.85322,-25.28879],[37.85322,-25.28879],[37.85325,-25.28876],[37.85328,-25.28873],[37.85328,-25.28873],[37.85328,-25.28873],[37.85328,-25.28872],[37.85331,-25.28871],[37.85332,-25.28870],[37.85333,-25.28870],[37.85334,-25.28869],[37.85334,-25.28869],[37.85336,-25.28868],[37.85336,-25.28868],[37.85337,-25.28866],[37.85338,-25.28865],[37.85339,-25.28863],[37.85340,-25.28863],[37.85340,-25.28862],[37.85341,-25.28861],[37.85342,-25.28859],[37.85342,-25.28859],[37.85342,-25.28859],[37.85343,-25.28858],[37.85345,-25.28855],[37.85346,-25.28854],[37.85348,-25.28851],[37.85350,-25.28850],[37.85350,-25.28850],[37.85352,-25.28848],[37.85353,-25.28848],[37.85355,-25.28846],[37.85356,-25.28846],[37.85358,-25.28845],[37.85358,-25.28845],[37.85359,-25.28844],[37.85359,-25.28844],[37.85362,-25.28844],[37.85363,-25.28844],[37.85364,-25.28844],[37.85366,-25.28846],[37.85366,-25.28846],[37.85367,-25.28846],[37.85370,-25.28848],[37.85370,-25.28848],[37.85371,-25.28849],[37.85371,-25.28851],[37.85372,-25.28852],[37.85372,-25.28854],[37.85373,-25.28856],[37.85373,-25.28856],[37.85376,-25.28858],[37.85377,-25.28859],[37.85378,-25.28860],[37.85380,-25.28863],[37.85381,-25.28866],[37.85381,-25.28867],[37.85382,-25.28868],[37.85382,-25.28868],[37.85382,-25.28869],[37.85383,-25.28870],[37.85385,-25.28870],[37.85385,-25.28870],[37.85387,-25.28870],[37.85387,-25.28870],[37.85390,-25.28870],[37.85390,-25.28870],[37.85393,-25.28870],[37.85395,-25.28870],[37.85397,-25.28871],[37.85399,-25.28871],[37.85400,-25.28871],[37.85402,-25.28871],[37.85403,-25.28872],[37.85406,-25.28872],[37.85407,-25.28872],[37.85408,-25.28872],[37.85412,-25.28873],[37.85412,-25.28873],[37.85413,-25.28874],[37.85415,-25.28875],[37.85416,-25.28875],[37.85420,-25.28875],[37.85420,-25.28869],[37.85420,-25.28867],[37.85423,-25.28862],[37.85440,-25.28842],[37.85458,-25.28819],[37.85464,-25.28812],[37.85468,-25.28808],[37.85470,-25.28808],[37.85474,-25.28807],[37.85493,-25.28804],[37.85507,-25.28801],[37.85517,-25.28797],[37.85518,-25.28796],[37.85524,-25.28794],[37.85527,-25.28791],[37.85527,-25.28790],[37.85526,-25.28786],[37.85523,-25.28785],[37.85517,-25.28786],[37.85507,-25.28788],[37.85506,-25.28789],[37.85505,-25.28789],[37.85500,-25.28788],[37.85482,-25.28781],[37.85464,-25.28774],[37.85462,-25.28773],[37.85459,-25.28771],[37.85457,-25.28769],[37.85457,-25.28768],[37.85457,-25.28768],[37.85456,-25.28768],[37.85456,-25.28767],[37.85456,-25.28767],[37.85456,-25.28766],[37.85456,-25.28766],[37.85456,-25.28765],[37.85456,-25.28765],[37.85456,-25.28765],[37.85456,-25.28764],[37.85456,-25.28761],[37.85460,-25.28761],[37.85474,-25.28765],[37.85490,-25.28768],[37.85495,-25.28768],[37.85498,-25.28768],[37.85500,-25.28765],[37.85495,-25.28760],[37.85487,-25.28754],[37.85475,-25.28743],[37.85470,-25.28737],[37.85469,-25.28735],[37.85468,-25.28733],[37.85465,-25.28726],[37.85460,-25.28715],[37.85456,-25.28703],[37.85456,-25.28703],[37.85454,-25.28698],[37.85455,-25.28687],[37.85467,-25.28630],[37.85472,-25.28602],[37.85472,-25.28595],[37.85472,-25.28592],[37.85472,-25.28591],[37.85470,-25.28586],[37.85465,-25.28580],[37.85464,-25.28579],[37.85439,-25.28560],[37.85436,-25.28557],[37.85434,-25.28556],[37.85406,-25.28534],[37.85394,-25.28527],[37.85374,-25.28522],[37.85357,-25.28518],[37.85353,-25.28517],[37.85332,-25.28512],[37.85301,-25.28505],[37.85282,-25.28500],[37.85276,-25.28498],[37.85273,-25.28496],[37.85270,-25.28495],[37.85265,-25.28491],[37.85259,-25.28486],[37.85255,-25.28487],[37.85254,-25.28488],[37.85252,-25.28488],[37.85246,-25.28491],[37.85241,-25.28493],[37.85239,-25.28494],[37.85212,-25.28510],[37.85205,-25.28514],[37.85202,-25.28516],[37.85152,-25.28545],[37.85115,-25.28569],[37.85098,-25.28581],[37.85069,-25.28598],[37.85068,-25.28599],[37.85057,-25.28605],[37.85045,-25.28614],[37.85033,-25.28626],[37.85013,-25.28651],[37.85008,-25.28654]];
const PROFILE_D5_PR21 = [[0.000,44],[0.004,45],[0.008,46],[0.010,46],[0.013,47],[0.017,49],[0.021,50],[0.025,51],[0.027,51],[0.029,52],[0.036,54],[0.040,55],[0.040,55],[0.043,56],[0.045,56],[0.050,54],[0.051,54],[0.053,54],[0.055,54],[0.060,55],[0.061,55],[0.061,55],[0.062,55],[0.064,55],[0.066,55],[0.069,56],[0.073,56],[0.077,55],[0.083,56],[0.091,57],[0.094,57],[0.099,54],[0.101,53],[0.103,52],[0.105,52],[0.107,52],[0.107,52],[0.109,52],[0.111,52],[0.112,51],[0.118,49],[0.125,50],[0.127,51],[0.132,53],[0.133,53],[0.133,53],[0.135,54],[0.135,54],[0.137,55],[0.137,55],[0.140,56],[0.141,56],[0.143,57],[0.148,59],[0.152,60],[0.157,62],[0.160,62],[0.165,63],[0.170,64],[0.181,66],[0.184,66],[0.186,66],[0.195,66],[0.197,66],[0.197,66],[0.202,67],[0.204,67],[0.211,68],[0.213,68],[0.222,68],[0.225,68],[0.227,68],[0.233,68],[0.235,68],[0.237,67],[0.237,67],[0.240,67],[0.244,67],[0.250,66],[0.250,66],[0.253,66],[0.253,66],[0.257,65],[0.260,66],[0.263,67],[0.272,70],[0.273,70],[0.280,75],[0.284,77],[0.291,81],[0.293,82],[0.300,87],[0.305,89],[0.310,92],[0.312,93],[0.320,97],[0.324,98],[0.327,98],[0.331,100],[0.335,100],[0.338,101],[0.340,102],[0.340,102],[0.343,103],[0.343,103],[0.346,104],[0.348,105],[0.352,107],[0.353,107],[0.357,108],[0.360,109],[0.362,110],[0.365,111],[0.366,111],[0.366,111],[0.370,110],[0.372,109],[0.375,108],[0.378,107],[0.379,107],[0.384,105],[0.386,104],[0.388,103],[0.388,103],[0.391,102],[0.391,102],[0.393,101],[0.397,100],[0.400,100],[0.404,98],[0.407,98],[0.411,97],[0.419,93],[0.421,92],[0.427,89],[0.431,87],[0.438,82],[0.440,81],[0.447,77],[0.451,75],[0.458,70],[0.459,70],[0.468,67],[0.471,66],[0.475,65],[0.478,66],[0.479,66],[0.481,66],[0.481,66],[0.487,67],[0.491,67],[0.494,67],[0.494,67],[0.496,68],[0.498,68],[0.504,68],[0.507,68],[0.509,68],[0.518,68],[0.520,68],[0.527,67],[0.529,67],[0.534,66],[0.535,66],[0.536,66],[0.545,66],[0.547,66],[0.550,66],[0.561,64],[0.567,63],[0.571,62],[0.574,62],[0.583,65],[0.586,66],[0.589,67],[0.595,69],[0.602,70],[0.603,70],[0.604,71],[0.609,71],[0.614,72],[0.616,73],[0.620,73],[0.626,73],[0.627,74],[0.633,74],[0.635,75],[0.638,76],[0.644,75],[0.645,75],[0.648,76],[0.649,76],[0.655,79],[0.663,85],[0.664,85],[0.666,86],[0.670,88],[0.674,89],[0.678,90],[0.679,90],[0.688,87],[0.690,88],[0.690,88],[0.692,88],[0.697,90],[0.707,92],[0.711,93],[0.715,93],[0.719,94],[0.723,94],[0.724,94],[0.724,94],[0.725,94],[0.729,93],[0.732,92],[0.736,91],[0.743,91],[0.744,92],[0.751,94],[0.757,97],[0.758,97],[0.760,97],[0.761,96],[0.765,96],[0.769,97],[0.769,98],[0.773,100],[0.774,101],[0.777,103],[0.786,107],[0.787,107],[0.790,108],[0.797,111],[0.799,112],[0.799,112],[0.809,116],[0.809,117],[0.812,118],[0.812,118],[0.816,118],[0.820,119],[0.822,119],[0.824,119],[0.826,119],[0.829,119],[0.831,119],[0.834,120],[0.836,120],[0.839,120],[0.841,120],[0.851,119],[0.851,120],[0.854,120],[0.857,121],[0.858,121],[0.861,122],[0.862,122],[0.864,123],[0.869,124],[0.873,124],[0.873,124],[0.876,123],[0.879,123],[0.883,121],[0.886,122],[0.886,122],[0.890,122],[0.890,122],[0.895,124],[0.898,126],[0.905,126],[0.906,126],[0.909,126],[0.911,126],[0.913,127],[0.918,128],[0.919,129],[0.921,130],[0.928,132],[0.929,132],[0.937,133],[0.944,133],[0.949,134],[0.949,134],[0.949,134],[0.951,134],[0.952,134],[0.953,135],[0.953,135],[0.959,135],[0.961,136],[0.962,137],[0.967,139],[0.971,141],[0.974,141],[0.974,141],[0.977,140],[0.981,140],[0.982,141],[0.984,142],[0.988,143],[0.993,143],[0.995,144],[0.996,144],[1.001,144],[1.006,144],[1.008,144],[1.009,144],[1.018,145],[1.019,146],[1.019,146],[1.022,146],[1.022,146],[1.026,147],[1.030,147],[1.031,148],[1.033,148],[1.033,148],[1.035,148],[1.037,149],[1.042,150],[1.046,150],[1.046,150],[1.047,150],[1.051,151],[1.053,151],[1.053,151],[1.055,151],[1.056,152],[1.059,152],[1.060,153],[1.063,153],[1.067,153],[1.068,153],[1.070,153],[1.073,153],[1.073,153],[1.073,153],[1.074,153],[1.077,153],[1.079,153],[1.080,153],[1.084,153],[1.087,153],[1.090,154],[1.091,154],[1.093,155],[1.095,155],[1.095,155],[1.095,155],[1.098,156],[1.103,156],[1.104,157],[1.105,157],[1.105,157],[1.107,157],[1.108,157],[1.112,158],[1.112,158],[1.115,158],[1.117,158],[1.117,158],[1.121,158],[1.125,158],[1.128,158],[1.129,158],[1.132,159],[1.132,159],[1.134,159],[1.135,159],[1.135,159],[1.136,159],[1.138,160],[1.139,160],[1.140,160],[1.141,160],[1.142,160],[1.142,160],[1.143,160],[1.144,160],[1.147,161],[1.154,162],[1.159,162],[1.161,163],[1.163,163],[1.165,163],[1.166,163],[1.169,163],[1.169,164],[1.171,164],[1.172,164],[1.175,164],[1.175,164],[1.180,164],[1.182,164],[1.186,164],[1.187,163],[1.188,163],[1.189,163],[1.191,163],[1.192,163],[1.193,163],[1.193,163],[1.195,162],[1.196,162],[1.196,162],[1.199,162],[1.202,162],[1.203,162],[1.204,162],[1.208,162],[1.209,163],[1.211,163],[1.214,163],[1.218,163],[1.218,163],[1.219,163],[1.220,163],[1.220,163],[1.222,164],[1.226,164],[1.227,164],[1.230,164],[1.235,163],[1.236,163],[1.240,162],[1.243,162],[1.244,161],[1.249,161],[1.250,161],[1.252,160],[1.257,160],[1.258,160],[1.261,159],[1.264,159],[1.266,159],[1.268,159],[1.270,159],[1.271,159],[1.273,159],[1.275,160],[1.279,160],[1.280,160],[1.282,161],[1.282,161],[1.287,161],[1.295,163],[1.300,164],[1.302,164],[1.303,164],[1.307,166],[1.308,166],[1.312,167],[1.320,169],[1.320,169],[1.325,170],[1.326,170],[1.329,171],[1.331,172],[1.337,174],[1.345,176],[1.351,177],[1.361,178],[1.369,179],[1.380,181],[1.386,182],[1.392,182],[1.399,183],[1.404,184],[1.409,184],[1.412,185],[1.418,185],[1.423,186],[1.428,186],[1.437,187],[1.446,186],[1.506,189],[1.542,190],[1.543,190],[1.545,190],[1.559,188],[1.560,188],[1.562,188],[1.563,188],[1.564,187],[1.570,187],[1.575,186],[1.577,186],[1.580,186],[1.583,186],[1.588,185],[1.599,184],[1.607,183],[1.613,183],[1.613,183],[1.613,183],[1.616,182],[1.617,182],[1.619,182],[1.620,182],[1.640,180],[1.643,179],[1.649,179],[1.652,178],[1.653,178],[1.661,177],[1.664,177],[1.666,177],[1.669,177],[1.670,176],[1.670,176],[1.672,176],[1.676,176],[1.678,176],[1.679,175],[1.681,175],[1.683,175],[1.684,175],[1.684,175],[1.700,174],[1.701,173],[1.707,173],[1.708,173],[1.711,173],[1.712,173],[1.715,172],[1.717,172],[1.717,172],[1.721,172],[1.722,172],[1.723,172],[1.728,172],[1.732,171],[1.732,171],[1.733,171],[1.736,170],[1.745,168],[1.749,167],[1.749,167],[1.752,166],[1.758,165],[1.759,165],[1.759,165],[1.760,165],[1.760,165],[1.766,164],[1.767,163],[1.772,162],[1.775,162],[1.777,162],[1.779,161],[1.781,161],[1.783,160],[1.785,160],[1.788,160],[1.789,160],[1.790,159],[1.793,159],[1.794,158],[1.794,158],[1.798,157],[1.804,157],[1.819,155],[1.835,155],[1.849,153],[1.858,151],[1.873,147],[1.877,146],[1.893,144],[1.917,140],[1.920,139],[1.921,138],[1.925,137],[1.925,137],[1.927,137],[1.929,136],[1.933,135],[1.937,135],[1.941,135],[1.945,136],[1.951,136],[1.954,136],[1.959,136],[1.963,136],[1.966,136],[1.970,136],[1.978,137],[1.982,137],[1.988,138],[1.994,139],[1.996,139],[2.002,140],[2.007,141],[2.011,142],[2.013,141],[2.015,141],[2.018,141],[2.020,140],[2.022,140],[2.025,140],[2.026,140],[2.027,140],[2.030,140],[2.032,140],[2.035,141],[2.041,142],[2.043,142],[2.044,142],[2.047,142],[2.049,143],[2.053,143],[2.054,143],[2.058,144],[2.060,144],[2.065,145],[2.068,145],[2.071,145],[2.072,145],[2.073,145],[2.075,146],[2.076,146],[2.078,146],[2.080,146],[2.083,147],[2.084,147],[2.084,147],[2.086,147],[2.088,147],[2.089,147],[2.090,147],[2.090,147],[2.093,148],[2.096,148],[2.098,148],[2.099,148],[2.101,149],[2.102,149],[2.106,149],[2.107,150],[2.107,150],[2.107,150],[2.107,150],[2.111,150],[2.116,151],[2.120,151],[2.123,151],[2.128,150],[2.132,150],[2.132,150],[2.132,150],[2.132,150],[2.133,149],[2.137,149],[2.138,149],[2.141,148],[2.141,148],[2.143,148],[2.147,148],[2.149,147],[2.149,147],[2.150,147],[2.151,147],[2.153,147],[2.155,147],[2.155,147],[2.156,147],[2.160,146],[2.161,146],[2.163,146],[2.165,146],[2.166,145],[2.168,145],[2.169,145],[2.171,145],[2.174,145],[2.179,144],[2.182,144],[2.185,143],[2.186,143],[2.190,143],[2.193,142],[2.195,142],[2.196,142],[2.198,142],[2.205,141],[2.208,140],[2.209,140],[2.212,140],[2.213,140],[2.214,140],[2.217,140],[2.219,140],[2.221,141],[2.224,141],[2.226,141],[2.228,142],[2.233,141],[2.237,140],[2.243,139],[2.246,139],[2.252,138],[2.257,137],[2.261,137],[2.269,136],[2.274,136],[2.276,136],[2.281,136],[2.285,136],[2.289,136],[2.294,136],[2.298,135],[2.302,135],[2.306,135],[2.310,136],[2.312,137],[2.314,137],[2.314,137],[2.318,138],[2.320,139],[2.323,140],[2.325,139],[2.338,139],[2.357,137],[2.363,137],[2.389,136],[2.395,137],[2.403,138],[2.414,136],[2.421,137],[2.430,136],[2.432,135],[2.433,135],[2.434,134],[2.435,134],[2.436,133],[2.437,133],[2.440,131],[2.444,130],[2.445,130],[2.445,130],[2.447,129],[2.448,129],[2.449,129],[2.450,128],[2.450,128],[2.451,128],[2.453,127],[2.454,127],[2.456,126],[2.461,124],[2.465,122],[2.466,121],[2.474,119],[2.480,118],[2.486,117],[2.489,116],[2.491,116],[2.493,115],[2.500,114],[2.513,111],[2.516,110],[2.529,107],[2.537,106],[2.542,104],[2.545,103],[2.547,102],[2.547,102],[2.553,102],[2.554,101],[2.555,101],[2.556,101],[2.556,101],[2.563,101],[2.564,101],[2.570,102],[2.571,102],[2.574,102],[2.586,102],[2.589,102],[2.595,102],[2.597,102],[2.597,102],[2.599,102],[2.606,101],[2.609,101],[2.610,101],[2.616,101],[2.620,100],[2.622,100],[2.632,97],[2.637,95],[2.645,92],[2.646,91],[2.654,88],[2.660,86],[2.662,85],[2.665,84],[2.668,84],[2.671,83],[2.673,82],[2.677,81],[2.680,81],[2.684,80],[2.688,78],[2.691,77],[2.694,76],[2.706,75],[2.709,76],[2.714,78],[2.724,81],[2.728,82],[2.729,82],[2.731,83],[2.733,84],[2.734,84],[2.734,84],[2.737,85],[2.737,85],[2.740,85],[2.742,86],[2.742,86],[2.743,86],[2.745,86],[2.749,87],[2.749,87],[2.750,87],[2.750,87],[2.757,86],[2.757,86],[2.761,86],[2.762,87],[2.763,87],[2.765,88],[2.765,88],[2.767,88],[2.768,88],[2.768,88],[2.770,87],[2.771,87],[2.772,86],[2.776,86],[2.776,86],[2.783,87],[2.783,87],[2.784,87],[2.784,87],[2.788,86],[2.790,86],[2.791,86],[2.791,86],[2.793,85],[2.796,85],[2.796,85],[2.799,84],[2.799,84],[2.800,84],[2.802,83],[2.804,82],[2.805,82],[2.809,81],[2.819,78],[2.824,76],[2.832,75],[2.833,75],[2.833,75],[2.833,75],[2.833,75],[2.838,74],[2.841,73],[2.841,73],[2.844,72],[2.846,71],[2.847,71],[2.853,69],[2.856,69],[2.857,69],[2.857,68],[2.857,68],[2.861,67],[2.861,67],[2.865,67],[2.868,67],[2.869,67],[2.875,66],[2.876,66],[2.876,66],[2.877,65],[2.882,64],[2.884,63],[2.887,63],[2.888,62],[2.890,61],[2.893,63],[2.893,63],[2.895,63],[2.896,64],[2.897,64],[2.898,65],[2.903,67],[2.906,69],[2.910,70],[2.911,71],[2.912,71],[2.914,72],[2.921,76],[2.923,76],[2.924,77],[2.924,77],[2.926,78],[2.929,79],[2.934,81],[2.934,81],[2.934,81],[2.934,81],[2.934,81],[2.939,79],[2.942,78],[2.943,77],[2.944,77],[2.945,76],[2.947,76],[2.954,72],[2.956,71],[2.957,71],[2.958,70],[2.962,69],[2.965,67],[2.970,65],[2.971,64],[2.972,64],[2.973,63],[2.975,63],[2.975,63],[2.978,61],[2.980,62],[2.981,63],[2.984,63],[2.986,64],[2.991,65],[2.992,66],[2.992,66],[2.993,66],[2.999,67],[3.000,67],[3.002,67],[3.006,67],[3.007,67],[3.011,68],[3.011,68],[3.011,69],[3.012,69],[3.015,69],[3.021,71],[3.022,71],[3.024,72],[3.027,73],[3.027,73],[3.030,74],[3.034,75],[3.035,75],[3.035,75],[3.035,75],[3.036,75],[3.044,76],[3.045,77],[3.045,77],[3.047,78],[3.050,79],[3.051,79],[3.056,81],[3.056,81],[3.057,82],[3.059,83],[3.061,83],[3.062,84],[3.066,84],[3.068,84],[3.072,85],[3.073,85],[3.074,85],[3.077,85],[3.079,86],[3.079,86],[3.082,85],[3.083,85],[3.087,85],[3.091,84],[3.091,84],[3.094,84],[3.096,84],[3.097,84],[3.098,84],[3.099,84],[3.102,84],[3.103,85],[3.104,85],[3.105,85],[3.108,85],[3.113,86],[3.113,86],[3.113,86],[3.114,86],[3.117,86],[3.118,86],[3.119,86],[3.121,86],[3.121,86],[3.123,86],[3.123,86],[3.126,86],[3.127,86],[3.128,87],[3.129,87],[3.131,87],[3.131,87],[3.134,88],[3.134,88],[3.134,88],[3.135,88],[3.139,89],[3.140,89],[3.143,89],[3.145,90],[3.145,90],[3.148,90],[3.149,90],[3.152,90],[3.153,90],[3.155,90],[3.155,90],[3.156,90],[3.157,90],[3.160,89],[3.161,89],[3.162,89],[3.164,88],[3.165,88],[3.166,87],[3.169,86],[3.170,86],[3.171,85],[3.172,85],[3.173,84],[3.175,83],[3.177,82],[3.178,82],[3.181,81],[3.182,80],[3.184,80],[3.188,78],[3.191,76],[3.191,76],[3.193,75],[3.193,75],[3.194,75],[3.195,74],[3.197,74],[3.197,74],[3.199,74],[3.200,74],[3.203,73],[3.203,73],[3.205,72],[3.208,71],[3.211,71],[3.213,70],[3.214,70],[3.216,69],[3.217,69],[3.220,68],[3.221,68],[3.223,68],[3.227,67],[3.227,67],[3.229,66],[3.231,65],[3.232,65],[3.238,63],[3.243,66],[3.245,67],[3.250,68],[3.276,72],[3.305,79],[3.314,82],[3.320,83],[3.321,83],[3.326,83],[3.347,80],[3.363,78],[3.374,77],[3.376,77],[3.383,77],[3.387,78],[3.388,78],[3.391,82],[3.395,83],[3.402,84],[3.412,86],[3.414,87],[3.415,87],[3.421,89],[3.441,96],[3.462,104],[3.465,105],[3.468,106],[3.471,108],[3.472,108],[3.472,108],[3.472,109],[3.473,109],[3.473,109],[3.474,109],[3.474,110],[3.475,110],[3.475,110],[3.475,110],[3.476,111],[3.478,112],[3.483,112],[3.498,107],[3.516,103],[3.523,102],[3.526,102],[3.529,103],[3.536,107],[3.546,112],[3.563,117],[3.570,119],[3.573,120],[3.574,121],[3.582,122],[3.592,125],[3.604,128],[3.604,128],[3.609,129],[3.618,131],[3.671,138],[3.696,140],[3.702,141],[3.704,141],[3.705,141],[3.710,141],[3.718,142],[3.719,142],[3.752,143],[3.756,143],[3.758,143],[3.795,146],[3.810,147],[3.832,148],[3.851,150],[3.856,150],[3.880,152],[3.914,154],[3.936,156],[3.943,157],[3.946,157],[3.950,158],[3.957,158],[3.965,159],[3.969,159],[3.971,159],[3.973,159],[3.980,160],[3.986,160],[3.988,160],[4.021,161],[4.030,162],[4.034,162],[4.095,165],[4.141,167],[4.163,168],[4.198,169],[4.199,169],[4.213,169],[4.228,169],[4.245,170],[4.277,170],[4.282,170]];

const TRACK_D5_PRC07 = [[37.83427,-25.21739],[37.83427,-25.21727],[37.83420,-25.21722],[37.83390,-25.21725],[37.83390,-25.21724],[37.83375,-25.21724],[37.83355,-25.21717],[37.83327,-25.21700],[37.83311,-25.21692],[37.83301,-25.21690],[37.83288,-25.21681],[37.83277,-25.21679],[37.83265,-25.21682],[37.83251,-25.21685],[37.83252,-25.21697],[37.83259,-25.21728],[37.83259,-25.21728],[37.83264,-25.21756],[37.83271,-25.21792],[37.83275,-25.21816],[37.83274,-25.21832],[37.83264,-25.21855],[37.83260,-25.21862],[37.83242,-25.21864],[37.83226,-25.21864],[37.83212,-25.21861],[37.83178,-25.21870],[37.83161,-25.21869],[37.83161,-25.21869],[37.83151,-25.21863],[37.83135,-25.21859],[37.83107,-25.21850],[37.83062,-25.21837],[37.83043,-25.21833],[37.83008,-25.21823],[37.83000,-25.21824],[37.82988,-25.21832],[37.82971,-25.21841],[37.82963,-25.21842],[37.82953,-25.21840],[37.82931,-25.21832],[37.82900,-25.21829],[37.82872,-25.21827],[37.82854,-25.21825],[37.82820,-25.21824],[37.82799,-25.21819],[37.82798,-25.21819],[37.82779,-25.21816],[37.82756,-25.21810],[37.82737,-25.21804],[37.82724,-25.21806],[37.82710,-25.21812],[37.82696,-25.21820],[37.82671,-25.21819],[37.82670,-25.21818],[37.82634,-25.21810],[37.82616,-25.21809],[37.82599,-25.21805],[37.82586,-25.21803],[37.82559,-25.21792],[37.82535,-25.21791],[37.82526,-25.21780],[37.82508,-25.21750],[37.82505,-25.21753],[37.82507,-25.21759],[37.82514,-25.21775],[37.82512,-25.21796],[37.82500,-25.21791],[37.82487,-25.21784],[37.82456,-25.21768],[37.82431,-25.21751],[37.82417,-25.21744],[37.82402,-25.21731],[37.82376,-25.21718],[37.82364,-25.21699],[37.82342,-25.21687],[37.82326,-25.21682],[37.82311,-25.21670],[37.82286,-25.21644],[37.82266,-25.21621],[37.82240,-25.21599],[37.82222,-25.21591],[37.82212,-25.21582],[37.82207,-25.21571],[37.82201,-25.21556],[37.82189,-25.21540],[37.82179,-25.21531],[37.82179,-25.21522],[37.82176,-25.21513],[37.82178,-25.21502],[37.82175,-25.21491],[37.82175,-25.21487],[37.82181,-25.21481],[37.82186,-25.21467],[37.82193,-25.21455],[37.82199,-25.21434],[37.82210,-25.21423],[37.82224,-25.21415],[37.82228,-25.21408],[37.82239,-25.21399],[37.82247,-25.21391],[37.82244,-25.21382],[37.82237,-25.21378],[37.82227,-25.21373],[37.82212,-25.21369],[37.82211,-25.21370],[37.82195,-25.21369],[37.82167,-25.21375],[37.82152,-25.21385],[37.82133,-25.21401],[37.82124,-25.21406],[37.82121,-25.21399],[37.82122,-25.21398],[37.82120,-25.21389],[37.82117,-25.21387],[37.82108,-25.21391],[37.82095,-25.21401],[37.82082,-25.21413],[37.82082,-25.21413],[37.82050,-25.21430],[37.82039,-25.21429],[37.82037,-25.21415],[37.82033,-25.21408],[37.82025,-25.21413],[37.82025,-25.21427],[37.82012,-25.21431],[37.81996,-25.21417],[37.81981,-25.21402],[37.81946,-25.21389],[37.81914,-25.21377],[37.81895,-25.21363],[37.81838,-25.21327],[37.81789,-25.21303],[37.81779,-25.21302],[37.81768,-25.21299],[37.81756,-25.21296],[37.81736,-25.21291],[37.81711,-25.21280],[37.81651,-25.21274],[37.81625,-25.21246],[37.81621,-25.21223],[37.81582,-25.21188],[37.81551,-25.21142],[37.81494,-25.21087],[37.81435,-25.21069],[37.81394,-25.21015],[37.81322,-25.21003],[37.81282,-25.21016],[37.81224,-25.21024],[37.81190,-25.21038],[37.81154,-25.21068],[37.81122,-25.21062],[37.81113,-25.21045],[37.81089,-25.21063],[37.81043,-25.21086],[37.81047,-25.21063],[37.81043,-25.21052],[37.80987,-25.21078],[37.80953,-25.21121],[37.80972,-25.21104],[37.80999,-25.21077],[37.81027,-25.21062],[37.81036,-25.21080],[37.81069,-25.21070],[37.81100,-25.21054],[37.81120,-25.21047],[37.81130,-25.21070],[37.81162,-25.21059],[37.81206,-25.21032],[37.81259,-25.21021],[37.81340,-25.21009],[37.81370,-25.21012],[37.81410,-25.21042],[37.81454,-25.21075],[37.81511,-25.21104],[37.81560,-25.21164],[37.81594,-25.21208],[37.81620,-25.21238],[37.81623,-25.21270],[37.81678,-25.21274],[37.81804,-25.21313],[37.81854,-25.21339],[37.81932,-25.21381],[37.81967,-25.21395],[37.82004,-25.21421],[37.82016,-25.21429],[37.82019,-25.21421],[37.82022,-25.21404],[37.82033,-25.21411],[37.82037,-25.21431],[37.82055,-25.21424],[37.82082,-25.21410],[37.82110,-25.21387],[37.82128,-25.21408],[37.82161,-25.21379],[37.82184,-25.21370],[37.82219,-25.21368],[37.82241,-25.21377],[37.82247,-25.21385],[37.82232,-25.21402],[37.82225,-25.21411],[37.82221,-25.21418],[37.82204,-25.21426],[37.82193,-25.21447],[37.82182,-25.21473],[37.82176,-25.21484],[37.82175,-25.21496],[37.82178,-25.21506],[37.82177,-25.21517],[37.82178,-25.21527],[37.82185,-25.21536],[37.82195,-25.21547],[37.82211,-25.21576],[37.82219,-25.21587],[37.82246,-25.21602],[37.82277,-25.21628],[37.82302,-25.21653],[37.82322,-25.21674],[37.82338,-25.21681],[37.82357,-25.21692],[37.82375,-25.21706],[37.82392,-25.21725],[37.82413,-25.21736],[37.82448,-25.21761],[37.82493,-25.21785],[37.82509,-25.21795],[37.82513,-25.21789],[37.82511,-25.21769],[37.82505,-25.21756],[37.82510,-25.21754],[37.82531,-25.21784],[37.82545,-25.21792],[37.82573,-25.21795],[37.82624,-25.21810],[37.82681,-25.21822],[37.82702,-25.21817],[37.82729,-25.21804],[37.82765,-25.21813],[37.82804,-25.21819],[37.82856,-25.21824],[37.82916,-25.21833],[37.82973,-25.21844],[37.83013,-25.21823],[37.83074,-25.21842],[37.83164,-25.21870],[37.83200,-25.21865],[37.83220,-25.21862],[37.83251,-25.21863],[37.83270,-25.21843],[37.83277,-25.21805],[37.83268,-25.21766],[37.83257,-25.21712],[37.83249,-25.21685],[37.83295,-25.21681],[37.83335,-25.21708],[37.83403,-25.21724],[37.83428,-25.21748]];
const PROFILE_D5_PRC07 = [[0.000,466],[0.010,466],[0.020,466],[0.053,468],[0.054,468],[0.070,470],[0.093,473],[0.128,477],[0.147,478],[0.159,480],[0.175,482],[0.187,483],[0.201,484],[0.216,486],[0.228,489],[0.255,494],[0.256,494],[0.281,498],[0.313,503],[0.335,506],[0.349,508],[0.372,513],[0.380,514],[0.400,519],[0.417,523],[0.433,526],[0.472,534],[0.491,538],[0.491,538],[0.504,541],[0.521,544],[0.553,550],[0.605,555],[0.626,557],[0.666,561],[0.675,563],[0.690,568],[0.710,575],[0.720,574],[0.731,572],[0.756,572],[0.791,580],[0.822,586],[0.842,587],[0.880,591],[0.904,593],[0.905,593],[0.926,598],[0.953,600],[0.974,605],[0.989,610],[1.005,616],[1.021,623],[1.049,627],[1.051,627],[1.091,632],[1.112,634],[1.131,637],[1.146,639],[1.177,636],[1.203,638],[1.218,640],[1.251,641],[1.255,642],[1.261,643],[1.277,643],[1.295,642],[1.309,646],[1.325,653],[1.361,669],[1.393,681],[1.410,683],[1.431,685],[1.462,691],[1.483,687],[1.510,691],[1.527,697],[1.548,698],[1.584,709],[1.613,711],[1.648,722],[1.669,731],[1.683,736],[1.695,739],[1.710,742],[1.728,748],[1.743,750],[1.751,750],[1.759,751],[1.769,751],[1.780,757],[1.784,759],[1.792,762],[1.805,767],[1.818,771],[1.838,778],[1.854,781],[1.870,781],[1.878,783],[1.893,784],[1.904,785],[1.912,785],[1.921,786],[1.933,787],[1.950,791],[1.950,791],[1.968,797],[1.999,803],[2.018,808],[2.044,810],[2.054,809],[2.062,813],[2.063,813],[2.071,818],[2.074,819],[2.085,821],[2.102,822],[2.120,824],[2.120,824],[2.159,841],[2.171,849],[2.183,853],[2.191,856],[2.200,859],[2.213,858],[2.227,863],[2.249,873],[2.271,873],[2.311,884],[2.348,888],[2.373,889],[2.443,887],[2.502,905],[2.513,909],[2.525,911],[2.539,913],[2.562,917],[2.592,923],[2.658,933],[2.697,936],[2.717,942],[2.770,952],[2.823,960],[2.902,980],[2.971,996],[3.036,1014],[3.117,1012],[3.162,1016],[3.228,1025],[3.268,1032],[3.315,1036],[3.352,1048],[3.370,1055],[3.401,1056],[3.456,1064],[3.476,1069],[3.488,1074],[3.554,1083],[3.607,1088],[3.633,1088],[3.671,1081],[3.705,1078],[3.724,1069],[3.762,1058],[3.799,1057],[3.823,1052],[3.846,1042],[3.882,1037],[3.937,1030],[3.997,1017],[4.088,1012],[4.121,1014],[4.172,1006],[4.229,995],[4.298,969],[4.373,959],[4.427,946],[4.466,938],[4.495,927],[4.556,930],[4.701,900],[4.760,887],[4.855,886],[4.896,875],[4.942,869],[4.958,862],[4.966,862],[4.981,861],[4.994,856],[5.012,850],[5.034,840],[5.065,825],[5.103,822],[5.129,807],[5.175,805],[5.201,799],[5.240,789],[5.266,785],[5.276,785],[5.298,784],[5.309,783],[5.317,781],[5.337,780],[5.358,774],[5.385,765],[5.396,761],[5.406,754],[5.416,751],[5.426,751],[5.434,750],[5.445,749],[5.461,746],[5.491,737],[5.505,733],[5.537,720],[5.578,709],[5.614,697],[5.643,695],[5.662,691],[5.685,687],[5.708,686],[5.734,687],[5.759,682],[5.804,675],[5.858,651],[5.877,643],[5.884,643],[5.902,643],[5.915,643],[5.921,641],[5.956,638],[5.973,637],[6.004,637],[6.062,633],[6.126,626],[6.150,620],[6.182,607],[6.223,599],[6.267,592],[6.325,587],[6.392,576],[6.456,575],[6.504,560],[6.575,555],[6.678,537],[6.718,528],[6.740,524],[6.775,516],[6.802,510],[6.837,504],[6.872,499],[6.921,491],[6.947,486],[6.999,481],[7.049,476],[7.125,467],[7.160,467]];

const TRACK_D5_PRC13 = [[37.76052,-25.16296],[37.76042,-25.16385],[37.75985,-25.16446],[37.75960,-25.16539],[37.75916,-25.16555],[37.75884,-25.16587],[37.75872,-25.16666],[37.75840,-25.16715],[37.75808,-25.16684],[37.75808,-25.16668],[37.75795,-25.16673],[37.75794,-25.16654],[37.75723,-25.16651],[37.75640,-25.16671],[37.75619,-25.16480],[37.75591,-25.16390],[37.75625,-25.16246],[37.75595,-25.16206],[37.75520,-25.15940],[37.75542,-25.15913],[37.75500,-25.15810],[37.75523,-25.15777],[37.75538,-25.15534],[37.75492,-25.15590],[37.75466,-25.15599],[37.75450,-25.15573],[37.75479,-25.15534],[37.75489,-25.15468],[37.75540,-25.15431],[37.75567,-25.15440],[37.75582,-25.15418],[37.75656,-25.15402],[37.75731,-25.15363],[37.75789,-25.15366],[37.75870,-25.15551],[37.75962,-25.15427],[37.75986,-25.15523],[37.76124,-25.15787],[37.76215,-25.15718],[37.76251,-25.15649],[37.76196,-25.15612],[37.76251,-25.15650],[37.76221,-25.15710],[37.76276,-25.15824],[37.76258,-25.15851],[37.76177,-25.15905],[37.76252,-25.16053],[37.76365,-25.16224],[37.76364,-25.16258],[37.76325,-25.16301],[37.76351,-25.16372],[37.76338,-25.16376],[37.76282,-25.16331],[37.76185,-25.16315],[37.76141,-25.16280],[37.76063,-25.16273],[37.76051,-25.16298]];
const PROFILE_D5_PRC13 = [[0.000,280],[0.079,290],[0.162,280],[0.248,294],[0.299,292],[0.345,286],[0.415,290],[0.471,289],[0.516,273],[0.530,270],[0.545,270],[0.562,266],[0.641,265],[0.735,290],[0.904,257],[0.989,237],[1.122,216],[1.170,210],[1.418,174],[1.452,170],[1.554,164],[1.593,158],[1.807,114],[1.878,108],[1.908,93],[1.937,62],[1.984,61],[2.043,29],[2.109,45],[2.140,83],[2.165,82],[2.249,125],[2.339,158],[2.404,179],[2.589,221],[2.739,244],[2.827,261],[3.106,285],[3.224,289],[3.296,286],[3.366,284],[3.435,286],[3.498,289],[3.615,296],[3.646,295],[3.748,294],[3.902,284],[4.098,279],[4.128,279],[4.186,274],[4.255,279],[4.269,282],[4.343,275],[4.452,282],[4.510,282],[4.597,277],[4.622,280]];

const TRACK_D5_PR12 = [[37.74691,-25.24853],[37.74696,-25.24882],[37.74699,-25.24891],[37.74700,-25.24901],[37.74700,-25.24904],[37.74701,-25.24912],[37.74704,-25.24922],[37.74702,-25.24942],[37.74709,-25.24964],[37.74711,-25.24971],[37.74713,-25.24980],[37.74713,-25.24986],[37.74719,-25.25010],[37.74719,-25.25015],[37.74720,-25.25019],[37.74721,-25.25026],[37.74723,-25.25035],[37.74726,-25.25054],[37.74727,-25.25060],[37.74730,-25.25068],[37.74737,-25.25081],[37.74738,-25.25054],[37.74753,-25.25069],[37.74757,-25.25064],[37.74759,-25.25064],[37.74761,-25.25065],[37.74762,-25.25065],[37.74762,-25.25065],[37.74773,-25.25070],[37.74774,-25.25072],[37.74774,-25.25075],[37.74775,-25.25079],[37.74775,-25.25080],[37.74776,-25.25080],[37.74776,-25.25081],[37.74776,-25.25081],[37.74780,-25.25087],[37.74785,-25.25090],[37.74785,-25.25090],[37.74786,-25.25091],[37.74796,-25.25098],[37.74797,-25.25099],[37.74800,-25.25101],[37.74808,-25.25107],[37.74817,-25.25113],[37.74819,-25.25114],[37.74819,-25.25114],[37.74827,-25.25119],[37.74829,-25.25120],[37.74830,-25.25121],[37.74832,-25.25122],[37.74834,-25.25123],[37.74836,-25.25124],[37.74847,-25.25129],[37.74849,-25.25130],[37.74853,-25.25131],[37.74854,-25.25131],[37.74856,-25.25131],[37.74857,-25.25132],[37.74866,-25.25134],[37.74868,-25.25134],[37.74872,-25.25135],[37.74879,-25.25137],[37.74881,-25.25137],[37.74887,-25.25139],[37.74895,-25.25140],[37.74899,-25.25140],[37.74902,-25.25141],[37.74904,-25.25142],[37.74905,-25.25142],[37.74907,-25.25142],[37.74910,-25.25143],[37.74910,-25.25143],[37.74912,-25.25144],[37.74913,-25.25144],[37.74919,-25.25146],[37.74920,-25.25147],[37.74922,-25.25148],[37.74929,-25.25151],[37.74930,-25.25152],[37.74933,-25.25154],[37.74934,-25.25156],[37.74935,-25.25158],[37.74938,-25.25161],[37.74939,-25.25162],[37.74942,-25.25169],[37.74942,-25.25169],[37.74945,-25.25180],[37.74945,-25.25181],[37.74945,-25.25188],[37.74945,-25.25192],[37.74942,-25.25204],[37.74942,-25.25206],[37.74941,-25.25210],[37.74939,-25.25214],[37.74938,-25.25217],[37.74937,-25.25219],[37.74937,-25.25220],[37.74936,-25.25222],[37.74936,-25.25222],[37.74926,-25.25239],[37.74921,-25.25249],[37.74920,-25.25250],[37.74917,-25.25256],[37.74914,-25.25261],[37.74912,-25.25264],[37.74911,-25.25266],[37.74909,-25.25270],[37.74902,-25.25284],[37.74901,-25.25287],[37.74900,-25.25295],[37.74899,-25.25299],[37.74898,-25.25306],[37.74898,-25.25313],[37.74898,-25.25313],[37.74899,-25.25315],[37.74899,-25.25317],[37.74899,-25.25320],[37.74899,-25.25322],[37.74900,-25.25323],[37.74902,-25.25327],[37.74904,-25.25329],[37.74905,-25.25331],[37.74906,-25.25334],[37.74909,-25.25335],[37.74912,-25.25337],[37.74914,-25.25338],[37.74915,-25.25339],[37.74915,-25.25339],[37.74916,-25.25339],[37.74917,-25.25339],[37.74924,-25.25340],[37.74926,-25.25339],[37.74927,-25.25339],[37.74932,-25.25338],[37.74933,-25.25337],[37.74933,-25.25337],[37.74933,-25.25337],[37.74934,-25.25337],[37.74935,-25.25336],[37.74936,-25.25336],[37.74939,-25.25333],[37.74942,-25.25331],[37.74947,-25.25323],[37.74953,-25.25315],[37.74955,-25.25311],[37.74961,-25.25304],[37.74968,-25.25293],[37.74972,-25.25291],[37.74973,-25.25290],[37.74975,-25.25289],[37.74977,-25.25288],[37.74977,-25.25288],[37.74981,-25.25287],[37.74984,-25.25287],[37.74985,-25.25286],[37.74986,-25.25287],[37.74987,-25.25287],[37.74989,-25.25288],[37.74995,-25.25289],[37.74995,-25.25289],[37.75001,-25.25295],[37.75003,-25.25296],[37.75006,-25.25298],[37.75011,-25.25320],[37.75009,-25.25328],[37.75008,-25.25332],[37.75007,-25.25333],[37.75007,-25.25335],[37.75004,-25.25350],[37.75004,-25.25351],[37.75004,-25.25354],[37.75005,-25.25356],[37.75005,-25.25360],[37.75005,-25.25363],[37.75009,-25.25371],[37.75011,-25.25377],[37.75012,-25.25379],[37.75013,-25.25381],[37.75015,-25.25385],[37.75018,-25.25393],[37.75025,-25.25410],[37.75025,-25.25411],[37.75026,-25.25411],[37.75027,-25.25416],[37.75028,-25.25416],[37.75031,-25.25423],[37.75040,-25.25444],[37.75040,-25.25444],[37.75040,-25.25444],[37.75041,-25.25445],[37.75041,-25.25447],[37.75048,-25.25461],[37.75053,-25.25474],[37.75056,-25.25483],[37.75058,-25.25489],[37.75063,-25.25504],[37.75065,-25.25510],[37.75066,-25.25518],[37.75069,-25.25529],[37.75069,-25.25533],[37.75069,-25.25546],[37.75069,-25.25565],[37.75069,-25.25578],[37.75069,-25.25590],[37.75069,-25.25602],[37.75069,-25.25602],[37.75069,-25.25605],[37.75069,-25.25606],[37.75069,-25.25607],[37.75070,-25.25614],[37.75071,-25.25618],[37.75071,-25.25622],[37.75070,-25.25632],[37.75069,-25.25633],[37.75068,-25.25639],[37.75068,-25.25640],[37.75063,-25.25663],[37.75064,-25.25666],[37.75065,-25.25671],[37.75065,-25.25673],[37.75066,-25.25674],[37.75070,-25.25692],[37.75071,-25.25696],[37.75072,-25.25699],[37.75074,-25.25707],[37.75074,-25.25708],[37.75076,-25.25724],[37.75077,-25.25729],[37.75077,-25.25731],[37.75077,-25.25731],[37.75078,-25.25738],[37.75079,-25.25745],[37.75078,-25.25765],[37.75077,-25.25782],[37.75077,-25.25793],[37.75077,-25.25793],[37.75076,-25.25816],[37.75076,-25.25821],[37.75071,-25.25861],[37.75068,-25.25870],[37.75067,-25.25872],[37.75067,-25.25872],[37.75067,-25.25872],[37.75067,-25.25874],[37.75053,-25.25868],[37.75044,-25.25865],[37.75042,-25.25864],[37.75041,-25.25864],[37.75037,-25.25862],[37.75030,-25.25861],[37.75030,-25.25861],[37.75029,-25.25861],[37.75027,-25.25861],[37.75025,-25.25860],[37.75024,-25.25860],[37.75020,-25.25860],[37.75019,-25.25860],[37.75015,-25.25859],[37.75014,-25.25859],[37.75009,-25.25858],[37.74995,-25.25857],[37.74994,-25.25857],[37.74988,-25.25856],[37.74985,-25.25856],[37.74971,-25.25853],[37.74971,-25.25853],[37.74971,-25.25853],[37.74969,-25.25853],[37.74968,-25.25852],[37.74968,-25.25852],[37.74966,-25.25851],[37.74966,-25.25851],[37.74966,-25.25850],[37.74964,-25.25849],[37.74959,-25.25846],[37.74958,-25.25845],[37.74957,-25.25844],[37.74954,-25.25840],[37.74948,-25.25831],[37.74948,-25.25830],[37.74946,-25.25828],[37.74945,-25.25826],[37.74943,-25.25823],[37.74931,-25.25800],[37.74928,-25.25795],[37.74926,-25.25792],[37.74923,-25.25787],[37.74920,-25.25784],[37.74918,-25.25781],[37.74918,-25.25780],[37.74913,-25.25773],[37.74911,-25.25771],[37.74911,-25.25770],[37.74910,-25.25769],[37.74910,-25.25769],[37.74900,-25.25759],[37.74895,-25.25755],[37.74894,-25.25755],[37.74894,-25.25755],[37.74893,-25.25754],[37.74893,-25.25754],[37.74884,-25.25751],[37.74880,-25.25750],[37.74880,-25.25750],[37.74879,-25.25750],[37.74878,-25.25750],[37.74878,-25.25750],[37.74868,-25.25749],[37.74866,-25.25750],[37.74860,-25.25751],[37.74859,-25.25751],[37.74847,-25.25759],[37.74845,-25.25759],[37.74840,-25.25762],[37.74826,-25.25773],[37.74822,-25.25776],[37.74822,-25.25776],[37.74820,-25.25778],[37.74812,-25.25786],[37.74811,-25.25787],[37.74811,-25.25788],[37.74808,-25.25792],[37.74807,-25.25793],[37.74803,-25.25802],[37.74803,-25.25805],[37.74802,-25.25821],[37.74808,-25.25874],[37.74808,-25.25875],[37.74809,-25.25881],[37.74809,-25.25883],[37.74812,-25.25900],[37.74812,-25.25901],[37.74812,-25.25903],[37.74813,-25.25906],[37.74813,-25.25908],[37.74813,-25.25910],[37.74814,-25.25913],[37.74814,-25.25915],[37.74809,-25.25921],[37.74804,-25.25923],[37.74802,-25.25924],[37.74801,-25.25925],[37.74801,-25.25929],[37.74801,-25.25943],[37.74801,-25.25944],[37.74800,-25.25947],[37.74800,-25.25950],[37.74799,-25.25952],[37.74799,-25.25955],[37.74797,-25.25967],[37.74796,-25.25971],[37.74795,-25.25984],[37.74795,-25.25984],[37.74795,-25.25984],[37.74795,-25.25985],[37.74795,-25.25989],[37.74794,-25.25992],[37.74794,-25.25992],[37.74794,-25.25995],[37.74794,-25.25998],[37.74794,-25.26000],[37.74793,-25.26002],[37.74793,-25.26006],[37.74793,-25.26008],[37.74791,-25.26043],[37.74791,-25.26044],[37.74791,-25.26045],[37.74791,-25.26046],[37.74791,-25.26047],[37.74791,-25.26047],[37.74791,-25.26047],[37.74791,-25.26048],[37.74792,-25.26060],[37.74792,-25.26063],[37.74789,-25.26076],[37.74786,-25.26085],[37.74780,-25.26111],[37.74778,-25.26115],[37.74776,-25.26129],[37.74773,-25.26139],[37.74770,-25.26153],[37.74768,-25.26168],[37.74767,-25.26175],[37.74769,-25.26182],[37.74770,-25.26192],[37.74770,-25.26200],[37.74771,-25.26211],[37.74772,-25.26219],[37.74775,-25.26228],[37.74777,-25.26237],[37.74781,-25.26245],[37.74784,-25.26252],[37.74785,-25.26260],[37.74785,-25.26268],[37.74785,-25.26270],[37.74785,-25.26272],[37.74785,-25.26275],[37.74784,-25.26283],[37.74784,-25.26284],[37.74784,-25.26285],[37.74785,-25.26287],[37.74785,-25.26300],[37.74785,-25.26305],[37.74786,-25.26309],[37.74786,-25.26320],[37.74786,-25.26324],[37.74786,-25.26326],[37.74786,-25.26326],[37.74786,-25.26327],[37.74786,-25.26327],[37.74787,-25.26329],[37.74787,-25.26330],[37.74788,-25.26331],[37.74788,-25.26332],[37.74788,-25.26333],[37.74789,-25.26334],[37.74790,-25.26337],[37.74791,-25.26339],[37.74791,-25.26340],[37.74792,-25.26341],[37.74799,-25.26357],[37.74804,-25.26368],[37.74805,-25.26371],[37.74806,-25.26374],[37.74807,-25.26376],[37.74813,-25.26389],[37.74816,-25.26396],[37.74819,-25.26405],[37.74824,-25.26418],[37.74827,-25.26425],[37.74829,-25.26430],[37.74833,-25.26442],[37.74837,-25.26455],[37.74839,-25.26460],[37.74841,-25.26466],[37.74845,-25.26475],[37.74847,-25.26481],[37.74847,-25.26490],[37.74848,-25.26500],[37.74848,-25.26502],[37.74850,-25.26517],[37.74848,-25.26527],[37.74848,-25.26531],[37.74845,-25.26552],[37.74844,-25.26556],[37.74844,-25.26560],[37.74843,-25.26564],[37.74843,-25.26565],[37.74843,-25.26567],[37.74843,-25.26568],[37.74842,-25.26571],[37.74841,-25.26582],[37.74841,-25.26586],[37.74840,-25.26594],[37.74839,-25.26596],[37.74839,-25.26598],[37.74839,-25.26600],[37.74837,-25.26615],[37.74837,-25.26623],[37.74836,-25.26631],[37.74836,-25.26634],[37.74837,-25.26644],[37.74837,-25.26647],[37.74837,-25.26657],[37.74837,-25.26657],[37.74840,-25.26665],[37.74844,-25.26678],[37.74847,-25.26684],[37.74850,-25.26690],[37.74857,-25.26701],[37.74864,-25.26709],[37.74866,-25.26712],[37.74867,-25.26713],[37.74873,-25.26717],[37.74873,-25.26718],[37.74876,-25.26720],[37.74891,-25.26733],[37.74894,-25.26735],[37.74898,-25.26738],[37.74913,-25.26748],[37.74918,-25.26752],[37.74918,-25.26752],[37.74935,-25.26765],[37.74939,-25.26768],[37.74939,-25.26769],[37.74957,-25.26783],[37.74960,-25.26785],[37.74969,-25.26792],[37.74972,-25.26795],[37.74973,-25.26797],[37.74975,-25.26803],[37.74975,-25.26803],[37.74976,-25.26814],[37.74975,-25.26824],[37.74975,-25.26826],[37.74975,-25.26826],[37.74974,-25.26828],[37.74969,-25.26841],[37.74964,-25.26846],[37.74958,-25.26853],[37.74952,-25.26859],[37.74951,-25.26860],[37.74949,-25.26862],[37.74947,-25.26864],[37.74947,-25.26864],[37.74938,-25.26872],[37.74937,-25.26873],[37.74936,-25.26875],[37.74929,-25.26886],[37.74929,-25.26886],[37.74929,-25.26886],[37.74929,-25.26888],[37.74928,-25.26893],[37.74926,-25.26898],[37.74926,-25.26911],[37.74926,-25.26913],[37.74927,-25.26920],[37.74927,-25.26922],[37.74927,-25.26923],[37.74927,-25.26926],[37.74928,-25.26933],[37.74928,-25.26939],[37.74928,-25.26942],[37.74928,-25.26946],[37.74928,-25.26951],[37.74928,-25.26955],[37.74928,-25.26960],[37.74928,-25.26962],[37.74928,-25.26964],[37.74928,-25.26966],[37.74928,-25.26969],[37.74930,-25.26976],[37.74933,-25.26981],[37.74933,-25.26981],[37.74933,-25.26982],[37.74934,-25.26983],[37.74943,-25.27000],[37.74946,-25.27005],[37.74947,-25.27008],[37.74956,-25.27021],[37.74960,-25.27028],[37.74962,-25.27030],[37.74968,-25.27040],[37.74970,-25.27047],[37.74971,-25.27050],[37.74971,-25.27052],[37.74972,-25.27058],[37.74972,-25.27069],[37.74971,-25.27076],[37.74970,-25.27081],[37.74968,-25.27084],[37.74966,-25.27087],[37.74963,-25.27091],[37.74962,-25.27093],[37.74956,-25.27096],[37.74955,-25.27096],[37.74950,-25.27098],[37.74943,-25.27101],[37.74938,-25.27106],[37.74936,-25.27107],[37.74935,-25.27109],[37.74932,-25.27111],[37.74929,-25.27114],[37.74926,-25.27117],[37.74925,-25.27118],[37.74923,-25.27119],[37.74914,-25.27127],[37.74903,-25.27138],[37.74896,-25.27144],[37.74894,-25.27145],[37.74887,-25.27147],[37.74887,-25.27146],[37.74883,-25.27144],[37.74882,-25.27144],[37.74881,-25.27143],[37.74877,-25.27141],[37.74875,-25.27139],[37.74864,-25.27133],[37.74863,-25.27132],[37.74844,-25.27121],[37.74842,-25.27120],[37.74842,-25.27119],[37.74839,-25.27118],[37.74838,-25.27117],[37.74837,-25.27117],[37.74834,-25.27116],[37.74831,-25.27116],[37.74828,-25.27118],[37.74826,-25.27119],[37.74818,-25.27126],[37.74812,-25.27131],[37.74808,-25.27134],[37.74804,-25.27134],[37.74802,-25.27135],[37.74796,-25.27136],[37.74795,-25.27136],[37.74795,-25.27136],[37.74793,-25.27136],[37.74788,-25.27137],[37.74784,-25.27138],[37.74783,-25.27139],[37.74777,-25.27140],[37.74771,-25.27143],[37.74770,-25.27143],[37.74769,-25.27144],[37.74766,-25.27145],[37.74757,-25.27153],[37.74755,-25.27163],[37.74753,-25.27172],[37.74753,-25.27173],[37.74752,-25.27183],[37.74749,-25.27198],[37.74748,-25.27207],[37.74748,-25.27220],[37.74748,-25.27222],[37.74748,-25.27223],[37.74748,-25.27223],[37.74748,-25.27224],[37.74748,-25.27224],[37.74751,-25.27238],[37.74751,-25.27243],[37.74750,-25.27246],[37.74749,-25.27250],[37.74748,-25.27252],[37.74746,-25.27258],[37.74744,-25.27258],[37.74738,-25.27257],[37.74736,-25.27257],[37.74735,-25.27257],[37.74731,-25.27257],[37.74723,-25.27257],[37.74721,-25.27257],[37.74718,-25.27257],[37.74718,-25.27257],[37.74717,-25.27257],[37.74710,-25.27256],[37.74708,-25.27255],[37.74707,-25.27255],[37.74706,-25.27255],[37.74705,-25.27255],[37.74704,-25.27254],[37.74702,-25.27254],[37.74701,-25.27254],[37.74699,-25.27252],[37.74693,-25.27248],[37.74691,-25.27246],[37.74686,-25.27242],[37.74686,-25.27242],[37.74685,-25.27241],[37.74680,-25.27237],[37.74679,-25.27237],[37.74679,-25.27237],[37.74673,-25.27240],[37.74673,-25.27240],[37.74672,-25.27241],[37.74670,-25.27242],[37.74668,-25.27243],[37.74666,-25.27245],[37.74660,-25.27248],[37.74656,-25.27251],[37.74658,-25.27258],[37.74658,-25.27262],[37.74659,-25.27266],[37.74660,-25.27268],[37.74662,-25.27279],[37.74662,-25.27281],[37.74661,-25.27294],[37.74661,-25.27296],[37.74661,-25.27297],[37.74661,-25.27299],[37.74661,-25.27302],[37.74661,-25.27303],[37.74661,-25.27305],[37.74661,-25.27307],[37.74661,-25.27308],[37.74660,-25.27325],[37.74660,-25.27326],[37.74660,-25.27331],[37.74660,-25.27331],[37.74660,-25.27331],[37.74660,-25.27346],[37.74659,-25.27348],[37.74666,-25.27358],[37.74675,-25.27375],[37.74676,-25.27376],[37.74677,-25.27378],[37.74690,-25.27400],[37.74700,-25.27418],[37.74702,-25.27420],[37.74705,-25.27422],[37.74707,-25.27423],[37.74721,-25.27430],[37.74724,-25.27431],[37.74724,-25.27431],[37.74724,-25.27431],[37.74725,-25.27432],[37.74728,-25.27434],[37.74729,-25.27434],[37.74735,-25.27452],[37.74736,-25.27454],[37.74732,-25.27463],[37.74731,-25.27467],[37.74728,-25.27467],[37.74726,-25.27467],[37.74725,-25.27467],[37.74720,-25.27467],[37.74720,-25.27467],[37.74719,-25.27466],[37.74716,-25.27464],[37.74711,-25.27460],[37.74705,-25.27455],[37.74696,-25.27448],[37.74695,-25.27450],[37.74689,-25.27458],[37.74690,-25.27460],[37.74692,-25.27466],[37.74694,-25.27470],[37.74700,-25.27487],[37.74701,-25.27489],[37.74691,-25.27500],[37.74689,-25.27500],[37.74677,-25.27504],[37.74677,-25.27504],[37.74677,-25.27504],[37.74673,-25.27505],[37.74669,-25.27506],[37.74664,-25.27508],[37.74663,-25.27508],[37.74657,-25.27509],[37.74651,-25.27509],[37.74649,-25.27509],[37.74647,-25.27510],[37.74645,-25.27510],[37.74643,-25.27510],[37.74641,-25.27510],[37.74636,-25.27511],[37.74634,-25.27511],[37.74629,-25.27511],[37.74627,-25.27511],[37.74620,-25.27513],[37.74610,-25.27522],[37.74608,-25.27524],[37.74592,-25.27539],[37.74591,-25.27540],[37.74586,-25.27545],[37.74575,-25.27556],[37.74570,-25.27560],[37.74568,-25.27562],[37.74568,-25.27562],[37.74567,-25.27563],[37.74564,-25.27573],[37.74557,-25.27588],[37.74557,-25.27591],[37.74553,-25.27599],[37.74555,-25.27609],[37.74555,-25.27613],[37.74556,-25.27616],[37.74556,-25.27619],[37.74556,-25.27620],[37.74558,-25.27632],[37.74559,-25.27637],[37.74559,-25.27639],[37.74559,-25.27642],[37.74563,-25.27646],[37.74564,-25.27647],[37.74568,-25.27651],[37.74582,-25.27666],[37.74585,-25.27669],[37.74585,-25.27669],[37.74586,-25.27669],[37.74586,-25.27670],[37.74606,-25.27683],[37.74610,-25.27686],[37.74619,-25.27692],[37.74625,-25.27696],[37.74634,-25.27701],[37.74642,-25.27707],[37.74644,-25.27710],[37.74646,-25.27715],[37.74646,-25.27718],[37.74645,-25.27725],[37.74645,-25.27726],[37.74644,-25.27727],[37.74644,-25.27727],[37.74644,-25.27727],[37.74644,-25.27727],[37.74635,-25.27734],[37.74634,-25.27734],[37.74634,-25.27734],[37.74633,-25.27736],[37.74622,-25.27749],[37.74618,-25.27754],[37.74616,-25.27756],[37.74616,-25.27757],[37.74616,-25.27757],[37.74615,-25.27771],[37.74612,-25.27780],[37.74612,-25.27781],[37.74611,-25.27781],[37.74607,-25.27785],[37.74606,-25.27785],[37.74596,-25.27787],[37.74595,-25.27787],[37.74587,-25.27788],[37.74576,-25.27790],[37.74575,-25.27790],[37.74572,-25.27792],[37.74571,-25.27793],[37.74570,-25.27794],[37.74568,-25.27795],[37.74559,-25.27801],[37.74559,-25.27801],[37.74548,-25.27812],[37.74546,-25.27813],[37.74539,-25.27814],[37.74526,-25.27815],[37.74518,-25.27816],[37.74518,-25.27820],[37.74519,-25.27824],[37.74521,-25.27835],[37.74523,-25.27846],[37.74525,-25.27852],[37.74525,-25.27854],[37.74525,-25.27866],[37.74525,-25.27875],[37.74526,-25.27882],[37.74525,-25.27885],[37.74524,-25.27899],[37.74523,-25.27908],[37.74522,-25.27912],[37.74521,-25.27921],[37.74520,-25.27933],[37.74520,-25.27935],[37.74520,-25.27940],[37.74520,-25.27942],[37.74520,-25.27944],[37.74520,-25.27945],[37.74520,-25.27945],[37.74520,-25.27946],[37.74520,-25.27947],[37.74520,-25.27958],[37.74526,-25.27965],[37.74531,-25.27972],[37.74534,-25.27975],[37.74542,-25.27985],[37.74551,-25.27996],[37.74554,-25.28000],[37.74554,-25.28000],[37.74555,-25.28002],[37.74560,-25.28006],[37.74564,-25.28010],[37.74563,-25.28018],[37.74556,-25.28019],[37.74554,-25.28020],[37.74546,-25.28021],[37.74537,-25.28019],[37.74529,-25.28016],[37.74531,-25.28020],[37.74535,-25.28026],[37.74535,-25.28026],[37.74536,-25.28027],[37.74541,-25.28032],[37.74543,-25.28033],[37.74554,-25.28041],[37.74565,-25.28044],[37.74566,-25.28044],[37.74570,-25.28053],[37.74570,-25.28057],[37.74570,-25.28058],[37.74570,-25.28059],[37.74574,-25.28064],[37.74575,-25.28066],[37.74576,-25.28066],[37.74579,-25.28070],[37.74589,-25.28080],[37.74590,-25.28082],[37.74592,-25.28084],[37.74597,-25.28090],[37.74599,-25.28093],[37.74598,-25.28089],[37.74596,-25.28082],[37.74594,-25.28077],[37.74594,-25.28075],[37.74596,-25.28076],[37.74603,-25.28080],[37.74604,-25.28081],[37.74612,-25.28085],[37.74615,-25.28087],[37.74624,-25.28092],[37.74628,-25.28095],[37.74641,-25.28102],[37.74642,-25.28102],[37.74642,-25.28102],[37.74644,-25.28104],[37.74654,-25.28109],[37.74659,-25.28109],[37.74664,-25.28109],[37.74666,-25.28109],[37.74678,-25.28108],[37.74680,-25.28108],[37.74684,-25.28108],[37.74685,-25.28108],[37.74690,-25.28107],[37.74690,-25.28106],[37.74688,-25.28096],[37.74704,-25.28107],[37.74702,-25.28108],[37.74691,-25.28117],[37.74684,-25.28122],[37.74683,-25.28122],[37.74684,-25.28122],[37.74695,-25.28124],[37.74702,-25.28125],[37.74721,-25.28128],[37.74723,-25.28128],[37.74725,-25.28128],[37.74726,-25.28129],[37.74726,-25.28129],[37.74731,-25.28129],[37.74733,-25.28130],[37.74747,-25.28132],[37.74757,-25.28133],[37.74742,-25.28146],[37.74740,-25.28148],[37.74739,-25.28149],[37.74732,-25.28156],[37.74728,-25.28158],[37.74727,-25.28159],[37.74718,-25.28168],[37.74716,-25.28169],[37.74711,-25.28174],[37.74708,-25.28176],[37.74708,-25.28176],[37.74708,-25.28176],[37.74708,-25.28176],[37.74696,-25.28180],[37.74690,-25.28182],[37.74686,-25.28184],[37.74682,-25.28185],[37.74668,-25.28190],[37.74668,-25.28190],[37.74668,-25.28190],[37.74668,-25.28190],[37.74667,-25.28190],[37.74661,-25.28192],[37.74656,-25.28194],[37.74652,-25.28195],[37.74649,-25.28196],[37.74644,-25.28198],[37.74643,-25.28198],[37.74642,-25.28200],[37.74641,-25.28201],[37.74629,-25.28211],[37.74628,-25.28212],[37.74623,-25.28217],[37.74621,-25.28219],[37.74617,-25.28224],[37.74609,-25.28230],[37.74608,-25.28231],[37.74607,-25.28232],[37.74605,-25.28235],[37.74603,-25.28237],[37.74596,-25.28243],[37.74594,-25.28245],[37.74593,-25.28246],[37.74587,-25.28252],[37.74584,-25.28255],[37.74582,-25.28256],[37.74581,-25.28258],[37.74579,-25.28258],[37.74571,-25.28258],[37.74567,-25.28259],[37.74566,-25.28259],[37.74566,-25.28259],[37.74563,-25.28259],[37.74560,-25.28259],[37.74548,-25.28261],[37.74548,-25.28261],[37.74548,-25.28261],[37.74543,-25.28261],[37.74542,-25.28261],[37.74541,-25.28261],[37.74539,-25.28261],[37.74538,-25.28261],[37.74534,-25.28262],[37.74531,-25.28262],[37.74528,-25.28262],[37.74527,-25.28263],[37.74526,-25.28263],[37.74518,-25.28263],[37.74516,-25.28263],[37.74513,-25.28264],[37.74511,-25.28264],[37.74510,-25.28264],[37.74507,-25.28264],[37.74506,-25.28264],[37.74505,-25.28265],[37.74499,-25.28265],[37.74494,-25.28269],[37.74488,-25.28274],[37.74486,-25.28276],[37.74480,-25.28281],[37.74480,-25.28282],[37.74480,-25.28282],[37.74475,-25.28286],[37.74470,-25.28290],[37.74470,-25.28290],[37.74466,-25.28294],[37.74465,-25.28296],[37.74459,-25.28302],[37.74458,-25.28303],[37.74458,-25.28303],[37.74455,-25.28306],[37.74447,-25.28314],[37.74448,-25.28315],[37.74448,-25.28318],[37.74449,-25.28322],[37.74452,-25.28331],[37.74452,-25.28333],[37.74454,-25.28339],[37.74454,-25.28340],[37.74454,-25.28340],[37.74454,-25.28340],[37.74454,-25.28340],[37.74456,-25.28349],[37.74453,-25.28364],[37.74453,-25.28368],[37.74452,-25.28370],[37.74448,-25.28397],[37.74447,-25.28399],[37.74445,-25.28412],[37.74445,-25.28414],[37.74444,-25.28419],[37.74444,-25.28420],[37.74443,-25.28421],[37.74443,-25.28426],[37.74442,-25.28427],[37.74442,-25.28432],[37.74441,-25.28432],[37.74441,-25.28437],[37.74440,-25.28439],[37.74440,-25.28443],[37.74439,-25.28446],[37.74439,-25.28446],[37.74438,-25.28449],[37.74437,-25.28455],[37.74437,-25.28458],[37.74436,-25.28458],[37.74434,-25.28456],[37.74430,-25.28454],[37.74429,-25.28453],[37.74424,-25.28450],[37.74415,-25.28444],[37.74414,-25.28443],[37.74411,-25.28441],[37.74409,-25.28440],[37.74405,-25.28437],[37.74404,-25.28437],[37.74401,-25.28435],[37.74399,-25.28433],[37.74386,-25.28424],[37.74384,-25.28423],[37.74384,-25.28423],[37.74382,-25.28426],[37.74381,-25.28427],[37.74380,-25.28428],[37.74379,-25.28429],[37.74376,-25.28432],[37.74375,-25.28434],[37.74373,-25.28436],[37.74371,-25.28438],[37.74369,-25.28440],[37.74361,-25.28449],[37.74360,-25.28450],[37.74354,-25.28457],[37.74353,-25.28458],[37.74350,-25.28461],[37.74349,-25.28463],[37.74342,-25.28471],[37.74341,-25.28471],[37.74338,-25.28471],[37.74332,-25.28471],[37.74332,-25.28471],[37.74331,-25.28471],[37.74316,-25.28472],[37.74313,-25.28472],[37.74312,-25.28472],[37.74311,-25.28473],[37.74293,-25.28474],[37.74290,-25.28474],[37.74282,-25.28474],[37.74280,-25.28474],[37.74279,-25.28474],[37.74267,-25.28475],[37.74267,-25.28475],[37.74265,-25.28475],[37.74264,-25.28475],[37.74260,-25.28475],[37.74259,-25.28476],[37.74257,-25.28476],[37.74252,-25.28476],[37.74242,-25.28476],[37.74239,-25.28478],[37.74238,-25.28479],[37.74236,-25.28480],[37.74235,-25.28480],[37.74234,-25.28481],[37.74229,-25.28485],[37.74227,-25.28485],[37.74222,-25.28489],[37.74218,-25.28492],[37.74216,-25.28493],[37.74212,-25.28495],[37.74207,-25.28498],[37.74206,-25.28499],[37.74202,-25.28501],[37.74190,-25.28509],[37.74186,-25.28512],[37.74185,-25.28512],[37.74184,-25.28514],[37.74182,-25.28517],[37.74171,-25.28536],[37.74168,-25.28540],[37.74166,-25.28544],[37.74155,-25.28562],[37.74154,-25.28564],[37.74150,-25.28570],[37.74146,-25.28576],[37.74146,-25.28576],[37.74146,-25.28577],[37.74144,-25.28579],[37.74143,-25.28581],[37.74141,-25.28584],[37.74141,-25.28579],[37.74141,-25.28576],[37.74141,-25.28575],[37.74141,-25.28570],[37.74138,-25.28571],[37.74136,-25.28571],[37.74135,-25.28572],[37.74128,-25.28575],[37.74122,-25.28577],[37.74121,-25.28577],[37.74121,-25.28577],[37.74118,-25.28578],[37.74109,-25.28581],[37.74106,-25.28583],[37.74105,-25.28583],[37.74103,-25.28584],[37.74102,-25.28584],[37.74100,-25.28585],[37.74098,-25.28586],[37.74095,-25.28587],[37.74096,-25.28592],[37.74096,-25.28593],[37.74096,-25.28595],[37.74096,-25.28597],[37.74096,-25.28598],[37.74097,-25.28603],[37.74097,-25.28606],[37.74098,-25.28611],[37.74091,-25.28615],[37.74082,-25.28620],[37.74075,-25.28623],[37.74076,-25.28634],[37.74076,-25.28640],[37.74076,-25.28641],[37.74077,-25.28659],[37.74078,-25.28674],[37.74074,-25.28677],[37.74071,-25.28680],[37.74063,-25.28688],[37.74052,-25.28698],[37.74048,-25.28701],[37.74046,-25.28703],[37.74032,-25.28715],[37.74029,-25.28718],[37.74018,-25.28728],[37.74015,-25.28731],[37.74010,-25.28735],[37.74009,-25.28741],[37.74007,-25.28749],[37.74007,-25.28750],[37.74007,-25.28750],[37.74006,-25.28752],[37.74006,-25.28753],[37.74006,-25.28756],[37.74005,-25.28760],[37.74005,-25.28761],[37.74003,-25.28768],[37.74003,-25.28771],[37.74002,-25.28775],[37.74001,-25.28776],[37.74001,-25.28778],[37.74001,-25.28779],[37.74000,-25.28784],[37.73996,-25.28800],[37.73995,-25.28804],[37.73995,-25.28807],[37.74002,-25.28812],[37.74008,-25.28818],[37.74011,-25.28820],[37.74012,-25.28821],[37.74012,-25.28821],[37.74015,-25.28823],[37.74015,-25.28824],[37.74025,-25.28832],[37.74028,-25.28840],[37.74030,-25.28846],[37.74030,-25.28847],[37.74030,-25.28848],[37.74030,-25.28848],[37.74031,-25.28850],[37.74031,-25.28851],[37.74032,-25.28853],[37.74034,-25.28860],[37.74034,-25.28860],[37.74032,-25.28861],[37.74031,-25.28861],[37.74015,-25.28863],[37.74012,-25.28863],[37.74012,-25.28863],[37.74006,-25.28864],[37.73999,-25.28865],[37.73997,-25.28865],[37.73997,-25.28865],[37.73996,-25.28865],[37.73995,-25.28865],[37.73993,-25.28865],[37.73993,-25.28865],[37.73992,-25.28865],[37.73985,-25.28866],[37.73983,-25.28867],[37.73982,-25.28867],[37.73978,-25.28867],[37.73975,-25.28867],[37.73975,-25.28867],[37.73973,-25.28868],[37.73973,-25.28868],[37.73971,-25.28868],[37.73966,-25.28869],[37.73965,-25.28869],[37.73960,-25.28869],[37.73958,-25.28870],[37.73955,-25.28870],[37.73953,-25.28870],[37.73953,-25.28871],[37.73952,-25.28875],[37.73952,-25.28875],[37.73952,-25.28875],[37.73952,-25.28876],[37.73948,-25.28894],[37.73947,-25.28895],[37.73947,-25.28898],[37.73947,-25.28899],[37.73945,-25.28903],[37.73945,-25.28904],[37.73945,-25.28905],[37.73944,-25.28910],[37.73942,-25.28919],[37.73940,-25.28921],[37.73937,-25.28922],[37.73936,-25.28923],[37.73936,-25.28924],[37.73934,-25.28925],[37.73934,-25.28925],[37.73926,-25.28930],[37.73926,-25.28930],[37.73926,-25.28931],[37.73924,-25.28932],[37.73918,-25.28936],[37.73917,-25.28937],[37.73916,-25.28938],[37.73916,-25.28938],[37.73916,-25.28938],[37.73915,-25.28938],[37.73914,-25.28938],[37.73912,-25.28937],[37.73911,-25.28937],[37.73909,-25.28937],[37.73908,-25.28937],[37.73906,-25.28936],[37.73903,-25.28936],[37.73901,-25.28936],[37.73898,-25.28935],[37.73897,-25.28935],[37.73887,-25.28934],[37.73885,-25.28933],[37.73885,-25.28933],[37.73879,-25.28932],[37.73877,-25.28932],[37.73873,-25.28932],[37.73872,-25.28931],[37.73871,-25.28932],[37.73868,-25.28934],[37.73865,-25.28936],[37.73863,-25.28938],[37.73857,-25.28942],[37.73856,-25.28943],[37.73855,-25.28943],[37.73854,-25.28944],[37.73849,-25.28948],[37.73836,-25.28956],[37.73834,-25.28958],[37.73831,-25.28959],[37.73827,-25.28960],[37.73818,-25.28962],[37.73817,-25.28962],[37.73814,-25.28962],[37.73812,-25.28962],[37.73809,-25.28962],[37.73802,-25.28962],[37.73802,-25.28962],[37.73799,-25.28963],[37.73796,-25.28963],[37.73790,-25.28965],[37.73787,-25.28965],[37.73785,-25.28966],[37.73782,-25.28966],[37.73778,-25.28968],[37.73771,-25.28971],[37.73769,-25.28972],[37.73768,-25.28972],[37.73764,-25.28974],[37.73763,-25.28974],[37.73757,-25.28986],[37.73753,-25.28993],[37.73753,-25.28994],[37.73751,-25.28997],[37.73751,-25.28997],[37.73751,-25.28998],[37.73750,-25.28997],[37.73750,-25.28997],[37.73748,-25.28995],[37.73743,-25.28991],[37.73740,-25.28990],[37.73740,-25.28989],[37.73733,-25.28984],[37.73733,-25.28984],[37.73731,-25.28983],[37.73730,-25.28982],[37.73726,-25.28980],[37.73726,-25.28980],[37.73725,-25.28980],[37.73723,-25.28979],[37.73721,-25.28980],[37.73721,-25.28980],[37.73720,-25.28980],[37.73717,-25.28981],[37.73716,-25.28981],[37.73714,-25.28982],[37.73706,-25.28985],[37.73704,-25.28986],[37.73700,-25.28985],[37.73694,-25.28985],[37.73686,-25.28985],[37.73685,-25.28985],[37.73685,-25.28985],[37.73677,-25.28990],[37.73673,-25.28993],[37.73672,-25.28994],[37.73669,-25.28996],[37.73668,-25.28997],[37.73660,-25.29002],[37.73660,-25.29002],[37.73656,-25.29004],[37.73655,-25.29005],[37.73654,-25.29006],[37.73649,-25.29008],[37.73646,-25.29010],[37.73644,-25.29012],[37.73643,-25.29012],[37.73643,-25.29017],[37.73643,-25.29018],[37.73644,-25.29022],[37.73646,-25.29033],[37.73646,-25.29038],[37.73647,-25.29040],[37.73649,-25.29046],[37.73650,-25.29048],[37.73650,-25.29048],[37.73655,-25.29055],[37.73655,-25.29056],[37.73660,-25.29064],[37.73662,-25.29067],[37.73663,-25.29068],[37.73664,-25.29071],[37.73667,-25.29078],[37.73675,-25.29096],[37.73675,-25.29096],[37.73675,-25.29097],[37.73675,-25.29097],[37.73682,-25.29114],[37.73682,-25.29114],[37.73678,-25.29122],[37.73678,-25.29122],[37.73678,-25.29122],[37.73674,-25.29129],[37.73674,-25.29129],[37.73671,-25.29134],[37.73671,-25.29134],[37.73671,-25.29134],[37.73671,-25.29134],[37.73671,-25.29135],[37.73670,-25.29140],[37.73670,-25.29143],[37.73669,-25.29145],[37.73669,-25.29147],[37.73669,-25.29149],[37.73668,-25.29150],[37.73668,-25.29150],[37.73668,-25.29154],[37.73668,-25.29154],[37.73667,-25.29158],[37.73665,-25.29165],[37.73664,-25.29168],[37.73664,-25.29168],[37.73664,-25.29169],[37.73662,-25.29173],[37.73662,-25.29173],[37.73662,-25.29173],[37.73660,-25.29177],[37.73660,-25.29178],[37.73659,-25.29178],[37.73658,-25.29181],[37.73657,-25.29182],[37.73657,-25.29183],[37.73655,-25.29186],[37.73653,-25.29188],[37.73646,-25.29198],[37.73645,-25.29200],[37.73645,-25.29200],[37.73643,-25.29203],[37.73642,-25.29205],[37.73639,-25.29208],[37.73637,-25.29212],[37.73635,-25.29214],[37.73632,-25.29219],[37.73630,-25.29221],[37.73630,-25.29222],[37.73624,-25.29230],[37.73622,-25.29233],[37.73621,-25.29234],[37.73620,-25.29236],[37.73619,-25.29238],[37.73616,-25.29242],[37.73615,-25.29243],[37.73615,-25.29246],[37.73614,-25.29249],[37.73614,-25.29250],[37.73613,-25.29253],[37.73612,-25.29257],[37.73612,-25.29258],[37.73612,-25.29265],[37.73611,-25.29269],[37.73610,-25.29277],[37.73610,-25.29278],[37.73607,-25.29284],[37.73604,-25.29291],[37.73601,-25.29298],[37.73600,-25.29299],[37.73598,-25.29304],[37.73598,-25.29305],[37.73597,-25.29306],[37.73596,-25.29306],[37.73593,-25.29308],[37.73593,-25.29308],[37.73592,-25.29309],[37.73590,-25.29310],[37.73589,-25.29311],[37.73589,-25.29311],[37.73587,-25.29312],[37.73586,-25.29312],[37.73584,-25.29313],[37.73583,-25.29313],[37.73578,-25.29315],[37.73570,-25.29318],[37.73569,-25.29318],[37.73568,-25.29318],[37.73567,-25.29319],[37.73567,-25.29319],[37.73558,-25.29322],[37.73556,-25.29322],[37.73554,-25.29323],[37.73554,-25.29323],[37.73553,-25.29323],[37.73552,-25.29324],[37.73551,-25.29325],[37.73550,-25.29326],[37.73549,-25.29327],[37.73548,-25.29328],[37.73541,-25.29334],[37.73539,-25.29338],[37.73538,-25.29339],[37.73536,-25.29342],[37.73536,-25.29343],[37.73535,-25.29345],[37.73531,-25.29350],[37.73524,-25.29356],[37.73522,-25.29358],[37.73521,-25.29359],[37.73517,-25.29362],[37.73517,-25.29362],[37.73512,-25.29365],[37.73511,-25.29366],[37.73509,-25.29368],[37.73508,-25.29369],[37.73506,-25.29370],[37.73504,-25.29371],[37.73504,-25.29371],[37.73503,-25.29371],[37.73500,-25.29372],[37.73499,-25.29372],[37.73497,-25.29372],[37.73493,-25.29373],[37.73493,-25.29373],[37.73493,-25.29373],[37.73493,-25.29373],[37.73491,-25.29373],[37.73486,-25.29376],[37.73485,-25.29377],[37.73485,-25.29377],[37.73485,-25.29378],[37.73483,-25.29380],[37.73482,-25.29382],[37.73480,-25.29384],[37.73479,-25.29385],[37.73479,-25.29386],[37.73478,-25.29389],[37.73476,-25.29393],[37.73472,-25.29395],[37.73470,-25.29397],[37.73469,-25.29398],[37.73469,-25.29398],[37.73468,-25.29400],[37.73467,-25.29401],[37.73465,-25.29410],[37.73460,-25.29424],[37.73460,-25.29424],[37.73461,-25.29426],[37.73461,-25.29428],[37.73461,-25.29431],[37.73461,-25.29433],[37.73462,-25.29434],[37.73462,-25.29436],[37.73462,-25.29442],[37.73463,-25.29450],[37.73463,-25.29450],[37.73463,-25.29453],[37.73463,-25.29460],[37.73463,-25.29469],[37.73463,-25.29470],[37.73465,-25.29476],[37.73465,-25.29476],[37.73469,-25.29482],[37.73471,-25.29484],[37.73473,-25.29486],[37.73479,-25.29491],[37.73480,-25.29492],[37.73482,-25.29495],[37.73485,-25.29499],[37.73486,-25.29501],[37.73486,-25.29502],[37.73487,-25.29509],[37.73487,-25.29514],[37.73487,-25.29519],[37.73487,-25.29520],[37.73487,-25.29524],[37.73487,-25.29527],[37.73489,-25.29531],[37.73496,-25.29544],[37.73497,-25.29545],[37.73499,-25.29549],[37.73502,-25.29554],[37.73504,-25.29558],[37.73505,-25.29560],[37.73506,-25.29560],[37.73507,-25.29562],[37.73508,-25.29565],[37.73510,-25.29567],[37.73510,-25.29568],[37.73512,-25.29571],[37.73512,-25.29572],[37.73512,-25.29572],[37.73515,-25.29576],[37.73516,-25.29578],[37.73528,-25.29600],[37.73529,-25.29602],[37.73531,-25.29605],[37.73535,-25.29614],[37.73536,-25.29623],[37.73536,-25.29625],[37.73536,-25.29626],[37.73537,-25.29633],[37.73538,-25.29644],[37.73539,-25.29654],[37.73539,-25.29659],[37.73539,-25.29659],[37.73536,-25.29681],[37.73536,-25.29682],[37.73535,-25.29686],[37.73535,-25.29688],[37.73535,-25.29690],[37.73535,-25.29690],[37.73534,-25.29693],[37.73532,-25.29702],[37.73532,-25.29703],[37.73532,-25.29704],[37.73531,-25.29708],[37.73531,-25.29710],[37.73531,-25.29710],[37.73530,-25.29711],[37.73530,-25.29714],[37.73530,-25.29716],[37.73530,-25.29717],[37.73531,-25.29729],[37.73531,-25.29730],[37.73533,-25.29732],[37.73533,-25.29732],[37.73534,-25.29733],[37.73535,-25.29735],[37.73536,-25.29737],[37.73538,-25.29739],[37.73538,-25.29740],[37.73545,-25.29749],[37.73546,-25.29751],[37.73547,-25.29753],[37.73549,-25.29755],[37.73551,-25.29756],[37.73553,-25.29757],[37.73554,-25.29758],[37.73556,-25.29760],[37.73558,-25.29761],[37.73560,-25.29762],[37.73561,-25.29763],[37.73561,-25.29763],[37.73563,-25.29764],[37.73564,-25.29764],[37.73571,-25.29767],[37.73574,-25.29769],[37.73575,-25.29776],[37.73575,-25.29777],[37.73576,-25.29782],[37.73571,-25.29793],[37.73557,-25.29812],[37.73552,-25.29819],[37.73549,-25.29825],[37.73545,-25.29830],[37.73538,-25.29841]];
const PROFILE_D5_PR12 = [[0.000,18],[0.026,18],[0.035,19],[0.043,19],[0.046,19],[0.053,19],[0.062,19],[0.080,18],[0.100,20],[0.107,20],[0.115,20],[0.120,20],[0.143,22],[0.147,22],[0.151,22],[0.157,22],[0.165,23],[0.182,24],[0.188,24],[0.195,25],[0.209,28],[0.232,29],[0.253,33],[0.260,34],[0.262,35],[0.264,35],[0.265,35],[0.265,35],[0.279,37],[0.280,37],[0.283,37],[0.287,37],[0.288,37],[0.288,37],[0.288,37],[0.288,37],[0.296,38],[0.301,40],[0.302,40],[0.304,40],[0.316,44],[0.317,44],[0.321,45],[0.332,48],[0.343,52],[0.344,53],[0.345,53],[0.355,57],[0.357,57],[0.359,58],[0.361,59],[0.363,59],[0.365,60],[0.379,61],[0.381,62],[0.386,62],[0.387,62],[0.389,62],[0.391,62],[0.400,63],[0.403,63],[0.407,63],[0.415,64],[0.418,64],[0.424,64],[0.433,65],[0.437,65],[0.441,65],[0.444,65],[0.445,65],[0.446,65],[0.450,65],[0.450,65],[0.452,65],[0.453,65],[0.460,66],[0.462,66],[0.464,66],[0.473,66],[0.474,66],[0.478,66],[0.480,66],[0.482,66],[0.486,67],[0.487,67],[0.494,67],[0.495,67],[0.505,67],[0.505,67],[0.511,68],[0.515,68],[0.526,69],[0.527,70],[0.531,70],[0.535,70],[0.538,71],[0.540,71],[0.541,71],[0.543,71],[0.543,71],[0.562,73],[0.572,73],[0.574,73],[0.580,74],[0.585,75],[0.589,76],[0.591,77],[0.595,77],[0.609,80],[0.613,81],[0.620,82],[0.623,83],[0.629,83],[0.635,84],[0.636,84],[0.638,84],[0.639,85],[0.642,85],[0.644,85],[0.644,85],[0.649,85],[0.651,85],[0.654,85],[0.657,85],[0.660,85],[0.664,84],[0.666,84],[0.667,84],[0.667,84],[0.668,84],[0.669,84],[0.677,84],[0.680,84],[0.680,84],[0.686,84],[0.687,84],[0.687,84],[0.688,84],[0.688,84],[0.690,85],[0.691,85],[0.695,85],[0.699,84],[0.708,83],[0.717,82],[0.722,82],[0.731,81],[0.743,79],[0.747,79],[0.749,79],[0.752,78],[0.754,78],[0.754,78],[0.758,78],[0.762,78],[0.763,78],[0.764,78],[0.765,78],[0.767,78],[0.774,79],[0.774,79],[0.783,80],[0.785,80],[0.789,80],[0.808,84],[0.816,86],[0.820,87],[0.821,87],[0.822,87],[0.836,88],[0.837,88],[0.840,88],[0.841,89],[0.845,89],[0.847,89],[0.856,89],[0.862,90],[0.863,90],[0.865,90],[0.869,90],[0.878,91],[0.894,92],[0.895,93],[0.896,93],[0.900,93],[0.900,93],[0.907,94],[0.928,94],[0.929,94],[0.929,94],[0.929,94],[0.931,95],[0.945,95],[0.958,96],[0.967,96],[0.973,96],[0.987,97],[0.993,98],[1.000,99],[1.010,101],[1.013,101],[1.025,103],[1.041,106],[1.053,108],[1.063,109],[1.074,109],[1.074,110],[1.077,110],[1.078,110],[1.079,110],[1.085,111],[1.088,111],[1.092,111],[1.100,112],[1.102,112],[1.107,112],[1.108,112],[1.129,113],[1.132,113],[1.137,114],[1.138,114],[1.139,114],[1.155,116],[1.159,117],[1.162,117],[1.169,118],[1.170,118],[1.185,120],[1.190,120],[1.191,120],[1.191,120],[1.197,121],[1.203,122],[1.221,124],[1.236,126],[1.246,127],[1.246,128],[1.266,130],[1.270,131],[1.306,136],[1.315,137],[1.316,138],[1.317,138],[1.317,138],[1.318,138],[1.334,138],[1.344,138],[1.347,138],[1.348,139],[1.353,139],[1.360,139],[1.361,139],[1.361,139],[1.364,139],[1.366,139],[1.367,139],[1.372,139],[1.372,139],[1.377,139],[1.378,139],[1.384,140],[1.399,140],[1.401,140],[1.408,141],[1.411,141],[1.426,142],[1.427,142],[1.427,142],[1.428,142],[1.430,142],[1.430,142],[1.432,142],[1.433,142],[1.433,142],[1.435,142],[1.441,142],[1.442,142],[1.444,142],[1.449,142],[1.459,141],[1.460,141],[1.463,141],[1.465,141],[1.468,140],[1.493,139],[1.498,138],[1.501,138],[1.507,138],[1.511,138],[1.515,138],[1.515,138],[1.524,138],[1.526,138],[1.527,138],[1.528,138],[1.528,138],[1.543,139],[1.549,139],[1.550,139],[1.551,139],[1.552,140],[1.552,140],[1.562,141],[1.566,142],[1.567,142],[1.568,142],[1.568,143],[1.569,142],[1.580,144],[1.582,144],[1.589,146],[1.590,146],[1.605,149],[1.607,149],[1.613,150],[1.632,152],[1.636,153],[1.636,153],[1.639,153],[1.651,154],[1.652,154],[1.653,154],[1.657,154],[1.659,154],[1.668,155],[1.670,155],[1.685,156],[1.732,158],[1.733,158],[1.738,158],[1.740,158],[1.755,158],[1.756,158],[1.758,158],[1.760,158],[1.762,158],[1.764,158],[1.767,158],[1.769,158],[1.777,159],[1.782,160],[1.785,160],[1.787,160],[1.790,161],[1.803,162],[1.803,162],[1.806,163],[1.809,163],[1.811,164],[1.813,164],[1.824,165],[1.828,166],[1.839,168],[1.839,168],[1.840,168],[1.840,168],[1.844,168],[1.846,169],[1.846,169],[1.849,169],[1.851,170],[1.853,170],[1.855,170],[1.859,171],[1.860,171],[1.891,176],[1.893,176],[1.893,176],[1.894,176],[1.895,177],[1.895,177],[1.895,177],[1.896,177],[1.906,178],[1.909,179],[1.921,180],[1.929,181],[1.953,187],[1.958,188],[1.971,191],[1.980,193],[1.993,196],[2.006,199],[2.012,199],[2.018,200],[2.028,201],[2.034,201],[2.044,202],[2.052,203],[2.060,204],[2.068,205],[2.076,206],[2.083,206],[2.090,207],[2.097,208],[2.099,208],[2.101,208],[2.104,208],[2.111,209],[2.111,209],[2.112,209],[2.114,209],[2.125,210],[2.130,211],[2.134,211],[2.143,212],[2.147,212],[2.148,212],[2.148,212],[2.149,212],[2.149,212],[2.151,213],[2.152,213],[2.153,213],[2.154,213],[2.155,213],[2.156,213],[2.159,214],[2.161,214],[2.162,214],[2.163,214],[2.180,217],[2.190,219],[2.193,220],[2.196,220],[2.198,221],[2.211,224],[2.219,225],[2.227,227],[2.240,230],[2.247,231],[2.252,231],[2.263,232],[2.275,232],[2.280,233],[2.286,233],[2.295,233],[2.300,233],[2.308,234],[2.317,234],[2.319,234],[2.333,236],[2.341,236],[2.345,236],[2.364,237],[2.367,238],[2.371,238],[2.374,238],[2.375,238],[2.377,238],[2.378,238],[2.381,239],[2.390,239],[2.394,239],[2.401,239],[2.403,239],[2.405,239],[2.406,239],[2.420,239],[2.427,239],[2.434,239],[2.437,239],[2.446,240],[2.448,240],[2.456,240],[2.457,240],[2.464,240],[2.477,240],[2.483,240],[2.489,240],[2.502,240],[2.512,241],[2.516,241],[2.517,242],[2.524,242],[2.525,242],[2.529,243],[2.549,245],[2.553,246],[2.558,247],[2.576,250],[2.583,251],[2.584,251],[2.605,252],[2.610,252],[2.611,252],[2.635,254],[2.639,254],[2.651,255],[2.655,255],[2.656,255],[2.662,255],[2.662,255],[2.672,254],[2.681,253],[2.682,253],[2.682,253],[2.685,253],[2.697,252],[2.705,252],[2.714,251],[2.722,250],[2.724,250],[2.726,250],[2.729,250],[2.729,250],[2.741,248],[2.743,248],[2.745,248],[2.757,247],[2.757,247],[2.758,247],[2.759,247],[2.763,248],[2.768,248],[2.780,248],[2.782,248],[2.788,249],[2.789,249],[2.791,248],[2.793,248],[2.799,248],[2.805,248],[2.807,247],[2.811,247],[2.815,247],[2.818,246],[2.823,246],[2.824,246],[2.826,246],[2.828,246],[2.831,245],[2.838,245],[2.842,246],[2.843,246],[2.843,246],[2.845,246],[2.863,247],[2.868,247],[2.871,248],[2.886,250],[2.894,251],[2.896,251],[2.908,252],[2.914,253],[2.917,253],[2.919,253],[2.924,253],[2.934,253],[2.941,253],[2.945,253],[2.949,253],[2.952,253],[2.957,253],[2.959,254],[2.965,253],[2.967,253],[2.973,252],[2.981,252],[2.988,252],[2.990,252],[2.992,252],[2.996,252],[3.001,252],[3.005,251],[3.006,251],[3.008,251],[3.020,251],[3.036,251],[3.045,250],[3.047,250],[3.056,249],[3.056,249],[3.061,248],[3.062,248],[3.064,248],[3.068,247],[3.071,246],[3.084,243],[3.086,243],[3.109,238],[3.111,238],[3.111,238],[3.115,237],[3.116,237],[3.118,236],[3.120,236],[3.124,236],[3.128,236],[3.130,236],[3.141,236],[3.150,236],[3.154,236],[3.158,235],[3.161,235],[3.168,235],[3.169,234],[3.169,234],[3.171,234],[3.176,234],[3.181,234],[3.183,234],[3.190,233],[3.197,233],[3.198,233],[3.199,233],[3.202,233],[3.214,233],[3.224,234],[3.232,234],[3.232,234],[3.241,234],[3.255,233],[3.263,233],[3.274,233],[3.276,233],[3.277,233],[3.277,233],[3.278,233],[3.278,233],[3.290,234],[3.296,234],[3.298,234],[3.302,233],[3.304,233],[3.309,232],[3.311,232],[3.317,230],[3.320,230],[3.321,230],[3.325,229],[3.334,227],[3.337,226],[3.340,226],[3.340,225],[3.341,225],[3.349,224],[3.352,223],[3.352,223],[3.353,223],[3.355,222],[3.356,222],[3.358,222],[3.360,221],[3.362,221],[3.369,220],[3.373,219],[3.379,218],[3.379,218],[3.380,218],[3.387,216],[3.388,216],[3.388,216],[3.395,215],[3.395,215],[3.396,215],[3.399,214],[3.401,214],[3.404,213],[3.412,209],[3.416,206],[3.423,207],[3.426,207],[3.430,207],[3.432,207],[3.442,208],[3.443,208],[3.455,206],[3.457,206],[3.458,206],[3.459,206],[3.461,205],[3.463,205],[3.464,205],[3.466,205],[3.467,205],[3.483,203],[3.483,203],[3.487,202],[3.487,202],[3.488,202],[3.501,198],[3.502,198],[3.514,198],[3.532,196],[3.533,195],[3.535,195],[3.559,192],[3.579,189],[3.581,189],[3.585,190],[3.587,191],[3.605,195],[3.608,195],[3.608,195],[3.608,195],[3.609,196],[3.613,197],[3.614,197],[3.631,198],[3.633,198],[3.642,196],[3.645,196],[3.649,195],[3.651,194],[3.652,194],[3.657,193],[3.657,193],[3.659,193],[3.663,192],[3.669,191],[3.678,189],[3.689,187],[3.690,187],[3.700,185],[3.702,185],[3.708,185],[3.711,186],[3.729,187],[3.731,187],[3.745,184],[3.747,183],[3.761,181],[3.761,181],[3.761,181],[3.766,180],[3.770,180],[3.776,179],[3.777,179],[3.784,177],[3.791,175],[3.793,175],[3.795,174],[3.797,174],[3.799,173],[3.801,173],[3.808,171],[3.809,171],[3.815,169],[3.818,169],[3.825,167],[3.839,166],[3.842,166],[3.864,164],[3.865,164],[3.873,163],[3.888,158],[3.895,155],[3.897,154],[3.898,154],[3.899,154],[3.908,153],[3.923,150],[3.926,149],[3.934,146],[3.943,146],[3.946,146],[3.949,146],[3.952,146],[3.952,146],[3.963,145],[3.968,145],[3.970,145],[3.972,145],[3.978,146],[3.979,146],[3.985,147],[4.005,150],[4.009,151],[4.010,151],[4.011,151],[4.011,151],[4.035,156],[4.041,157],[4.053,159],[4.060,160],[4.071,162],[4.081,164],[4.084,164],[4.089,164],[4.092,164],[4.098,163],[4.099,163],[4.101,163],[4.101,163],[4.101,163],[4.101,163],[4.112,160],[4.113,160],[4.113,160],[4.116,160],[4.132,157],[4.138,156],[4.141,156],[4.142,156],[4.142,156],[4.154,156],[4.163,156],[4.163,155],[4.164,155],[4.170,154],[4.171,154],[4.182,152],[4.183,152],[4.192,150],[4.205,147],[4.206,147],[4.210,146],[4.211,146],[4.212,146],[4.214,146],[4.226,144],[4.227,144],[4.241,141],[4.244,141],[4.252,139],[4.266,137],[4.276,135],[4.279,135],[4.283,135],[4.293,135],[4.303,133],[4.308,132],[4.310,132],[4.321,130],[4.329,128],[4.334,127],[4.337,126],[4.350,123],[4.357,121],[4.361,120],[4.369,118],[4.379,115],[4.382,115],[4.386,114],[4.388,113],[4.390,113],[4.390,113],[4.391,113],[4.392,112],[4.393,112],[4.402,110],[4.411,110],[4.419,110],[4.423,111],[4.436,111],[4.450,111],[4.454,111],[4.454,111],[4.457,111],[4.463,110],[4.469,109],[4.477,104],[4.484,102],[4.486,101],[4.495,98],[4.506,97],[4.515,96],[4.519,95],[4.526,93],[4.526,93],[4.528,92],[4.535,91],[4.537,91],[4.551,90],[4.563,91],[4.565,91],[4.574,87],[4.577,85],[4.578,84],[4.579,83],[4.586,81],[4.588,81],[4.588,80],[4.593,79],[4.607,74],[4.609,73],[4.612,72],[4.620,73],[4.623,74],[4.627,73],[4.633,74],[4.638,76],[4.640,78],[4.643,77],[4.651,76],[4.654,75],[4.663,75],[4.667,75],[4.677,77],[4.683,78],[4.699,80],[4.699,80],[4.700,80],[4.702,81],[4.715,83],[4.719,84],[4.725,84],[4.727,85],[4.741,88],[4.743,88],[4.747,89],[4.749,90],[4.755,91],[4.756,91],[4.765,89],[4.785,95],[4.787,94],[4.802,92],[4.810,91],[4.811,91],[4.812,91],[4.824,94],[4.831,96],[4.853,100],[4.855,100],[4.858,101],[4.858,101],[4.859,101],[4.865,102],[4.867,103],[4.882,106],[4.894,108],[4.914,105],[4.917,104],[4.919,104],[4.929,103],[4.933,102],[4.934,102],[4.948,102],[4.950,102],[4.957,104],[4.961,105],[4.961,105],[4.961,105],[4.961,105],[4.975,105],[4.982,106],[4.986,106],[4.991,106],[5.007,106],[5.007,106],[5.007,106],[5.007,106],[5.007,106],[5.015,106],[5.021,106],[5.025,106],[5.028,106],[5.035,106],[5.035,106],[5.037,107],[5.039,107],[5.055,112],[5.056,112],[5.063,114],[5.066,115],[5.072,117],[5.083,121],[5.084,121],[5.085,122],[5.089,123],[5.092,124],[5.100,128],[5.104,129],[5.105,129],[5.114,132],[5.118,133],[5.120,133],[5.122,134],[5.124,133],[5.133,133],[5.137,132],[5.138,132],[5.139,132],[5.143,132],[5.145,131],[5.159,130],[5.159,130],[5.159,130],[5.164,130],[5.166,130],[5.166,130],[5.169,129],[5.170,129],[5.174,129],[5.178,129],[5.181,128],[5.182,128],[5.184,128],[5.192,127],[5.194,127],[5.198,127],[5.200,126],[5.202,126],[5.204,126],[5.205,126],[5.207,126],[5.213,125],[5.220,126],[5.228,127],[5.231,127],[5.239,128],[5.239,128],[5.239,128],[5.246,129],[5.252,130],[5.252,130],[5.258,131],[5.260,131],[5.268,132],[5.270,132],[5.270,132],[5.274,133],[5.285,135],[5.286,135],[5.289,136],[5.292,137],[5.301,140],[5.303,140],[5.308,142],[5.309,142],[5.309,142],[5.309,142],[5.309,142],[5.317,145],[5.331,149],[5.335,150],[5.337,151],[5.361,158],[5.362,159],[5.374,162],[5.376,162],[5.380,164],[5.381,164],[5.382,165],[5.386,166],[5.387,167],[5.392,168],[5.392,169],[5.396,170],[5.398,171],[5.402,172],[5.405,173],[5.405,174],[5.408,175],[5.413,177],[5.416,178],[5.417,178],[5.420,177],[5.424,176],[5.425,175],[5.432,174],[5.443,171],[5.444,171],[5.448,170],[5.451,170],[5.456,170],[5.457,169],[5.460,169],[5.464,169],[5.480,167],[5.482,167],[5.482,167],[5.485,168],[5.487,169],[5.488,169],[5.489,169],[5.494,171],[5.496,172],[5.499,173],[5.502,174],[5.505,175],[5.517,179],[5.518,179],[5.527,182],[5.529,182],[5.533,184],[5.534,184],[5.545,188],[5.546,188],[5.550,188],[5.556,189],[5.556,189],[5.557,189],[5.574,191],[5.577,191],[5.578,192],[5.580,192],[5.599,194],[5.603,195],[5.611,196],[5.614,196],[5.615,196],[5.628,198],[5.628,198],[5.630,198],[5.632,198],[5.636,199],[5.638,199],[5.640,199],[5.644,200],[5.657,199],[5.660,199],[5.661,199],[5.663,199],[5.664,199],[5.666,199],[5.673,199],[5.674,199],[5.681,200],[5.686,200],[5.688,200],[5.693,201],[5.699,201],[5.701,201],[5.706,201],[5.720,202],[5.726,202],[5.726,202],[5.729,202],[5.732,203],[5.753,206],[5.758,206],[5.762,207],[5.782,208],[5.784,208],[5.790,209],[5.798,210],[5.798,210],[5.798,210],[5.801,210],[5.803,210],[5.807,210],[5.812,209],[5.814,208],[5.815,208],[5.820,206],[5.824,205],[5.826,205],[5.827,205],[5.835,204],[5.842,203],[5.843,203],[5.843,203],[5.847,202],[5.856,201],[5.861,200],[5.862,200],[5.863,200],[5.865,200],[5.868,199],[5.870,198],[5.873,197],[5.878,196],[5.879,196],[5.880,196],[5.882,195],[5.883,195],[5.888,194],[5.890,194],[5.895,193],[5.903,190],[5.914,187],[5.922,184],[5.931,182],[5.936,181],[5.937,181],[5.953,177],[5.967,174],[5.971,172],[5.975,171],[5.987,166],[6.002,160],[6.007,158],[6.010,157],[6.029,149],[6.033,147],[6.048,140],[6.052,138],[6.059,135],[6.064,133],[6.072,130],[6.072,129],[6.073,129],[6.075,129],[6.075,129],[6.078,129],[6.082,128],[6.083,128],[6.089,128],[6.092,127],[6.095,127],[6.096,127],[6.098,127],[6.099,127],[6.104,126],[6.118,124],[6.122,124],[6.124,123],[6.133,127],[6.142,129],[6.146,129],[6.147,130],[6.147,130],[6.151,130],[6.151,130],[6.164,133],[6.172,134],[6.178,135],[6.179,135],[6.179,135],[6.180,136],[6.181,136],[6.182,136],[6.184,137],[6.191,138],[6.192,138],[6.194,138],[6.195,137],[6.213,133],[6.216,133],[6.217,133],[6.223,131],[6.231,129],[6.233,128],[6.234,128],[6.234,128],[6.236,127],[6.238,126],[6.238,126],[6.239,126],[6.247,123],[6.249,122],[6.250,121],[6.254,120],[6.257,118],[6.258,118],[6.260,117],[6.260,117],[6.263,116],[6.268,114],[6.269,114],[6.274,112],[6.277,111],[6.280,109],[6.282,109],[6.283,109],[6.286,110],[6.286,110],[6.286,110],[6.287,110],[6.304,115],[6.305,115],[6.307,115],[6.308,116],[6.312,117],[6.313,117],[6.314,117],[6.318,119],[6.327,121],[6.329,121],[6.332,121],[6.334,121],[6.335,121],[6.337,121],[6.337,121],[6.347,120],[6.347,120],[6.347,120],[6.350,120],[6.357,120],[6.359,120],[6.359,120],[6.360,120],[6.360,120],[6.361,120],[6.362,119],[6.364,119],[6.366,118],[6.367,118],[6.368,117],[6.371,116],[6.374,115],[6.376,115],[6.380,113],[6.381,113],[6.392,109],[6.394,108],[6.394,108],[6.401,105],[6.404,105],[6.408,103],[6.409,102],[6.410,102],[6.414,102],[6.418,102],[6.420,102],[6.428,104],[6.430,103],[6.430,103],[6.431,103],[6.439,103],[6.454,105],[6.457,105],[6.460,104],[6.465,102],[6.476,99],[6.476,98],[6.480,97],[6.482,95],[6.485,94],[6.493,90],[6.494,90],[6.496,89],[6.500,87],[6.507,85],[6.510,84],[6.513,83],[6.516,82],[6.521,81],[6.529,79],[6.531,79],[6.532,79],[6.537,78],[6.538,77],[6.551,84],[6.558,88],[6.559,89],[6.562,91],[6.563,91],[6.563,91],[6.564,91],[6.564,90],[6.567,87],[6.574,80],[6.577,77],[6.577,77],[6.587,67],[6.587,67],[6.589,65],[6.591,64],[6.595,60],[6.595,60],[6.596,60],[6.598,58],[6.601,57],[6.601,57],[6.602,56],[6.605,55],[6.606,55],[6.608,54],[6.618,50],[6.621,48],[6.625,46],[6.631,42],[6.640,36],[6.642,35],[6.642,35],[6.652,32],[6.657,30],[6.658,29],[6.662,28],[6.664,27],[6.673,26],[6.673,26],[6.677,26],[6.679,26],[6.681,25],[6.686,25],[6.690,24],[6.693,24],[6.694,24],[6.698,26],[6.700,26],[6.703,28],[6.713,32],[6.717,34],[6.720,35],[6.725,38],[6.727,39],[6.728,39],[6.735,44],[6.736,44],[6.745,50],[6.748,52],[6.750,52],[6.753,54],[6.760,59],[6.778,66],[6.778,66],[6.778,66],[6.778,66],[6.795,71],[6.796,71],[6.804,67],[6.804,67],[6.804,67],[6.811,63],[6.812,63],[6.817,61],[6.817,61],[6.817,60],[6.817,60],[6.817,60],[6.822,59],[6.825,58],[6.826,58],[6.829,57],[6.830,57],[6.831,57],[6.831,57],[6.835,56],[6.835,56],[6.839,54],[6.844,53],[6.848,53],[6.848,53],[6.849,53],[6.853,53],[6.853,53],[6.853,53],[6.857,54],[6.858,54],[6.858,54],[6.861,54],[6.862,54],[6.863,54],[6.867,54],[6.869,54],[6.881,53],[6.883,53],[6.883,53],[6.887,53],[6.889,52],[6.892,52],[6.897,52],[6.900,51],[6.905,51],[6.908,50],[6.909,50],[6.919,48],[6.922,48],[6.923,48],[6.925,47],[6.928,47],[6.933,46],[6.934,45],[6.936,46],[6.939,46],[6.940,46],[6.943,47],[6.946,48],[6.947,48],[6.953,51],[6.957,53],[6.964,56],[6.965,56],[6.971,57],[6.978,58],[6.985,58],[6.987,58],[6.991,59],[6.993,59],[6.993,59],[6.995,58],[6.998,57],[6.998,57],[6.999,56],[7.002,55],[7.003,55],[7.003,55],[7.006,53],[7.007,53],[7.009,52],[7.010,51],[7.016,49],[7.025,46],[7.027,46],[7.027,45],[7.028,45],[7.029,45],[7.039,41],[7.041,40],[7.044,39],[7.044,39],[7.045,38],[7.046,38],[7.047,38],[7.049,37],[7.050,37],[7.052,37],[7.060,34],[7.065,34],[7.066,34],[7.070,34],[7.071,34],[7.073,34],[7.079,33],[7.089,30],[7.091,29],[7.093,28],[7.097,27],[7.098,26],[7.104,24],[7.106,23],[7.108,22],[7.110,21],[7.112,20],[7.114,19],[7.115,18],[7.116,17],[7.119,16],[7.120,15],[7.122,15],[7.126,15],[7.126,14],[7.127,14],[7.127,14],[7.129,14],[7.135,14],[7.136,14],[7.136,14],[7.137,14],[7.140,14],[7.142,14],[7.145,13],[7.146,13],[7.146,13],[7.150,13],[7.154,13],[7.158,13],[7.161,13],[7.162,13],[7.163,12],[7.165,12],[7.166,12],[7.174,13],[7.187,14],[7.188,14],[7.190,15],[7.192,15],[7.193,16],[7.196,17],[7.197,17],[7.199,18],[7.204,19],[7.211,21],[7.211,21],[7.213,22],[7.219,24],[7.227,26],[7.228,26],[7.234,28],[7.234,28],[7.241,31],[7.243,32],[7.246,33],[7.254,37],[7.256,37],[7.259,39],[7.264,40],[7.266,41],[7.267,41],[7.273,40],[7.278,39],[7.282,37],[7.283,37],[7.287,36],[7.289,36],[7.293,36],[7.307,35],[7.308,35],[7.313,34],[7.318,34],[7.322,35],[7.324,35],[7.325,35],[7.327,35],[7.330,36],[7.333,36],[7.334,36],[7.337,36],[7.337,36],[7.338,36],[7.342,37],[7.344,37],[7.368,40],[7.370,40],[7.373,41],[7.383,41],[7.390,40],[7.392,39],[7.393,39],[7.399,38],[7.409,36],[7.418,35],[7.423,34],[7.423,34],[7.442,28],[7.443,28],[7.447,27],[7.448,26],[7.450,26],[7.450,26],[7.453,25],[7.461,23],[7.462,23],[7.463,22],[7.466,22],[7.468,21],[7.469,21],[7.469,21],[7.471,20],[7.473,20],[7.475,20],[7.485,18],[7.485,18],[7.488,18],[7.489,18],[7.490,18],[7.492,18],[7.494,18],[7.496,18],[7.498,18],[7.508,18],[7.510,18],[7.512,18],[7.516,18],[7.517,18],[7.520,19],[7.521,19],[7.524,19],[7.527,19],[7.529,19],[7.530,19],[7.531,19],[7.533,20],[7.534,20],[7.543,21],[7.546,21],[7.553,20],[7.553,19],[7.558,19],[7.569,16],[7.592,11],[7.600,10],[7.606,9],[7.613,8],[7.625,8]];

/* Revolts marcats a la ruta est (calculats des del GPX) */
const RUTA_EST_BENDS = [[37.819316,-25.143329],[37.790267,-25.156999],[37.771611,-25.156949],[37.761165,-25.17715],[37.751107,-25.195743]];


/* ── TRACKS DIA 6 ────────────────────────────────────────── */
const TRACK_D6_PRC06 = [[37.77341,-25.31597],[37.77337,-25.31592],[37.77326,-25.31602],[37.77318,-25.31605],[37.77282,-25.31618],[37.77268,-25.31624],[37.77247,-25.31640],[37.77219,-25.31661],[37.77163,-25.31700],[37.77072,-25.31762],[37.77026,-25.31777],[37.77007,-25.31799],[37.76987,-25.31834],[37.76901,-25.31873],[37.76814,-25.31875],[37.76773,-25.31869],[37.76728,-25.31874],[37.76696,-25.31861],[37.76687,-25.31858],[37.76676,-25.31857],[37.76636,-25.31884],[37.76620,-25.31906],[37.76616,-25.31926],[37.76612,-25.31935],[37.76615,-25.31994],[37.76639,-25.32101],[37.76638,-25.32124],[37.76620,-25.32178],[37.76606,-25.32194],[37.76596,-25.32209],[37.76583,-25.32226],[37.76566,-25.32253],[37.76566,-25.32258],[37.76555,-25.32289],[37.76550,-25.32329],[37.76549,-25.32350],[37.76554,-25.32411],[37.76546,-25.32446],[37.76546,-25.32485],[37.76551,-25.32495],[37.76542,-25.32553],[37.76510,-25.32624],[37.76495,-25.32648],[37.76452,-25.32709],[37.76441,-25.32720],[37.76447,-25.32729],[37.76467,-25.32741],[37.76520,-25.32743],[37.76582,-25.32758],[37.76637,-25.32761],[37.76685,-25.32756],[37.76741,-25.32751],[37.76763,-25.32779],[37.76780,-25.32784],[37.76814,-25.32776],[37.76881,-25.32826],[37.76884,-25.32829],[37.76910,-25.32906],[37.76921,-25.32944],[37.76921,-25.32958],[37.76918,-25.32984],[37.76903,-25.33011],[37.76902,-25.33015],[37.76896,-25.33034],[37.76867,-25.33073],[37.76866,-25.33079],[37.76874,-25.33096],[37.76874,-25.33099],[37.76871,-25.33099],[37.76868,-25.33101],[37.76866,-25.33107],[37.76853,-25.33117],[37.76844,-25.33129],[37.76825,-25.33143],[37.76817,-25.33153],[37.76798,-25.33170],[37.76796,-25.33172],[37.76792,-25.33173],[37.76779,-25.33187],[37.76764,-25.33212],[37.76756,-25.33223],[37.76735,-25.33231],[37.76722,-25.33246],[37.76702,-25.33284],[37.76689,-25.33296],[37.76680,-25.33304],[37.76666,-25.33315],[37.76654,-25.33328],[37.76651,-25.33335],[37.76647,-25.33340],[37.76641,-25.33343],[37.76623,-25.33348],[37.76614,-25.33343],[37.76605,-25.33337],[37.76586,-25.33327],[37.76568,-25.33328],[37.76554,-25.33321],[37.76539,-25.33323],[37.76531,-25.33333],[37.76488,-25.33349],[37.76456,-25.33342],[37.76430,-25.33344],[37.76404,-25.33352],[37.76395,-25.33383],[37.76400,-25.33433],[37.76404,-25.33459],[37.76438,-25.33530],[37.76437,-25.33599],[37.76418,-25.33577],[37.76400,-25.33637],[37.76375,-25.33668],[37.76368,-25.33716],[37.76349,-25.33764],[37.76342,-25.33788],[37.76334,-25.33810],[37.76326,-25.33826],[37.76326,-25.33827],[37.76298,-25.33865],[37.76271,-25.33915],[37.76232,-25.33940],[37.76220,-25.33970],[37.76220,-25.33971],[37.76197,-25.33993],[37.76187,-25.34017],[37.76166,-25.34043],[37.76139,-25.34073],[37.76121,-25.34093],[37.76092,-25.34130],[37.76081,-25.34142],[37.76059,-25.34172],[37.76037,-25.34184],[37.75978,-25.34198],[37.75926,-25.34185],[37.75906,-25.34169],[37.75836,-25.34155],[37.75782,-25.34133],[37.75703,-25.34080],[37.75681,-25.34077],[37.75657,-25.34086],[37.75608,-25.34072],[37.75580,-25.34064],[37.75553,-25.34073],[37.75508,-25.34107],[37.75487,-25.34109],[37.75428,-25.34103],[37.75378,-25.34065],[37.75348,-25.34040],[37.75344,-25.34036],[37.75280,-25.33945],[37.75215,-25.33881],[37.75162,-25.33846],[37.75085,-25.33757],[37.75067,-25.33724],[37.75066,-25.33708],[37.75081,-25.33590],[37.75082,-25.33580],[37.75082,-25.33569],[37.75080,-25.33535],[37.75076,-25.33507],[37.75075,-25.33500],[37.75073,-25.33470],[37.75058,-25.33389],[37.75056,-25.33378],[37.75047,-25.33327],[37.75043,-25.33290],[37.75028,-25.33195],[37.75025,-25.33152],[37.75026,-25.33152],[37.75033,-25.33104],[37.75038,-25.33068],[37.75023,-25.33044],[37.75000,-25.33018],[37.74983,-25.32982],[37.74976,-25.32958],[37.74972,-25.32937],[37.74969,-25.32906],[37.74958,-25.32831],[37.74958,-25.32833],[37.74950,-25.32780],[37.74938,-25.32673],[37.74934,-25.32660],[37.74955,-25.32653],[37.75014,-25.32624],[37.75134,-25.32575],[37.75305,-25.32566],[37.75456,-25.32524],[37.75642,-25.32484],[37.75668,-25.32479],[37.75783,-25.32484],[37.75807,-25.32478],[37.75832,-25.32479],[37.75850,-25.32478],[37.75860,-25.32462],[37.75851,-25.32446],[37.75836,-25.32427],[37.75833,-25.32401],[37.75841,-25.32377],[37.75886,-25.32329],[37.75956,-25.32263],[37.75994,-25.32228],[37.76039,-25.32185],[37.76179,-25.32216],[37.76211,-25.32216],[37.76281,-25.32172],[37.76282,-25.32170],[37.76305,-25.32149],[37.76338,-25.32124],[37.76354,-25.32098],[37.76375,-25.32035],[37.76386,-25.31998],[37.76397,-25.31994],[37.76412,-25.31992],[37.76438,-25.31990],[37.76479,-25.32016],[37.76501,-25.32019],[37.76509,-25.32000],[37.76513,-25.31994],[37.76515,-25.31913],[37.76533,-25.31900],[37.76540,-25.31884],[37.76537,-25.31877],[37.76535,-25.31850],[37.76553,-25.31839],[37.76556,-25.31841],[37.76564,-25.31846],[37.76573,-25.31852],[37.76598,-25.31873],[37.76607,-25.31874],[37.76631,-25.31858],[37.76659,-25.31849],[37.76689,-25.31839],[37.76712,-25.31835],[37.76724,-25.31831],[37.76726,-25.31845],[37.76726,-25.31864],[37.76728,-25.31874],[37.76772,-25.31869],[37.76821,-25.31876],[37.76900,-25.31873],[37.76987,-25.31833],[37.77007,-25.31801],[37.77026,-25.31776],[37.77072,-25.31761],[37.77164,-25.31699],[37.77220,-25.31662],[37.77241,-25.31645],[37.77267,-25.31624],[37.77282,-25.31618],[37.77287,-25.31616],[37.77326,-25.31602],[37.77332,-25.31597],[37.77337,-25.31592],[37.77339,-25.31594],[37.77341,-25.31597]];
const PROFILE_D6_PRC06 = [[0.000,206],[0.006,206],[0.021,206],[0.030,207],[0.072,208],[0.088,208],[0.116,209],[0.152,209],[0.223,208],[0.338,208],[0.390,209],[0.419,209],[0.457,210],[0.558,214],[0.655,217],[0.701,219],[0.751,223],[0.789,225],[0.799,226],[0.811,227],[0.862,237],[0.888,243],[0.906,246],[0.914,249],[0.967,258],[1.065,255],[1.085,254],[1.136,254],[1.158,256],[1.175,258],[1.196,260],[1.226,266],[1.230,266],[1.260,268],[1.295,269],[1.314,270],[1.368,274],[1.400,276],[1.434,278],[1.445,279],[1.497,284],[1.569,286],[1.596,286],[1.668,289],[1.684,290],[1.694,290],[1.719,290],[1.777,293],[1.847,302],[1.909,306],[1.962,309],[2.025,308],[2.059,299],[2.079,299],[2.118,303],[2.203,308],[2.208,308],[2.281,301],[2.317,299],[2.329,299],[2.352,296],[2.382,292],[2.385,292],[2.403,291],[2.450,289],[2.456,289],[2.472,289],[2.475,289],[2.479,289],[2.482,289],[2.488,289],[2.506,288],[2.520,287],[2.545,286],[2.557,285],[2.582,284],[2.585,284],[2.590,284],[2.608,284],[2.636,287],[2.650,288],[2.674,288],[2.694,289],[2.734,291],[2.752,291],[2.764,292],[2.783,292],[2.800,296],[2.808,298],[2.813,300],[2.821,302],[2.841,306],[2.852,306],[2.863,305],[2.886,306],[2.906,305],[2.922,303],[2.939,303],[2.952,306],[3.001,307],[3.038,301],[3.066,297],[3.096,294],[3.125,296],[3.169,300],[3.192,299],[3.265,303],[3.326,301],[3.354,294],[3.409,297],[3.449,296],[3.492,305],[3.539,309],[3.562,311],[3.583,311],[3.599,310],[3.601,310],[3.647,309],[3.699,310],[3.748,306],[3.777,313],[3.778,314],[3.810,314],[3.834,321],[3.867,324],[3.907,327],[3.934,329],[3.979,326],[3.995,322],[4.032,321],[4.058,317],[4.125,303],[4.183,290],[4.210,285],[4.289,287],[4.352,287],[4.452,287],[4.476,289],[4.504,291],[4.560,289],[4.592,289],[4.624,289],[4.681,293],[4.705,293],[4.771,288],[4.836,286],[4.876,286],[4.882,286],[4.989,291],[5.080,292],[5.147,292],[5.263,292],[5.298,293],[5.312,293],[5.417,289],[5.426,289],[5.436,288],[5.466,288],[5.491,289],[5.497,289],[5.524,290],[5.597,293],[5.606,292],[5.653,290],[5.685,291],[5.771,294],[5.809,295],[5.810,294],[5.853,292],[5.885,290],[5.912,291],[5.946,293],[5.983,294],[6.005,294],[6.024,293],[6.052,291],[6.119,291],[6.120,291],[6.167,290],[6.262,290],[6.275,290],[6.299,289],[6.370,290],[6.511,301],[6.701,298],[6.873,297],[7.083,300],[7.111,301],[7.239,298],[7.267,298],[7.295,297],[7.315,298],[7.333,299],[7.351,300],[7.375,301],[7.397,300],[7.420,296],[7.486,289],[7.583,288],[7.635,288],[7.698,288],[7.855,299],[7.891,303],[7.978,306],[7.980,306],[8.012,308],[8.054,312],[8.083,312],[8.143,317],[8.178,321],[8.190,323],[8.208,326],[8.236,321],[8.287,311],[8.311,305],[8.330,303],[8.337,300],[8.408,289],[8.431,279],[8.447,274],[8.454,275],[8.478,273],[8.500,264],[8.503,263],[8.513,259],[8.524,256],[8.558,248],[8.568,246],[8.599,238],[8.631,230],[8.664,226],[8.691,224],[8.705,223],[8.717,223],[8.734,223],[8.743,223],[8.793,219],[8.847,216],[8.935,214],[9.038,210],[9.074,209],[9.105,209],[9.157,208],[9.274,208],[9.343,209],[9.371,209],[9.405,208],[9.422,208],[9.428,207],[9.473,206],[9.482,206],[9.489,206],[9.491,206],[9.495,206]];


const TRACK_D6_TM16 = [[37.75032,-25.33220],[37.75034,-25.33222],[37.75030,-25.33219],[37.75022,-25.33206],[37.75016,-25.33188],[37.75016,-25.33167],[37.75016,-25.33147],[37.75020,-25.33126],[37.75021,-25.33120],[37.75021,-25.33120],[37.75023,-25.33103],[37.75024,-25.33101],[37.75028,-25.33084],[37.75029,-25.33080],[37.75032,-25.33076],[37.75034,-25.33072],[37.75033,-25.33069],[37.75032,-25.33069],[37.75032,-25.33069],[37.75028,-25.33067],[37.75023,-25.33065],[37.75018,-25.33063],[37.75018,-25.33061],[37.75014,-25.33055],[37.75007,-25.33042],[37.75003,-25.33038],[37.75000,-25.33035],[37.74999,-25.33034],[37.74998,-25.33034],[37.74994,-25.33032],[37.74990,-25.33030],[37.74985,-25.33027],[37.74981,-25.33024],[37.74970,-25.33017],[37.74964,-25.33013],[37.74956,-25.33008],[37.74951,-25.33004],[37.74946,-25.32999],[37.74941,-25.32992],[37.74936,-25.32981],[37.74933,-25.32977],[37.74931,-25.32973],[37.74929,-25.32969],[37.74929,-25.32969],[37.74929,-25.32968],[37.74927,-25.32965],[37.74924,-25.32959],[37.74921,-25.32952],[37.74914,-25.32943],[37.74912,-25.32939],[37.74908,-25.32936],[37.74902,-25.32929],[37.74893,-25.32920],[37.74885,-25.32917],[37.74876,-25.32916],[37.74869,-25.32914],[37.74865,-25.32914],[37.74860,-25.32913],[37.74855,-25.32913],[37.74851,-25.32912],[37.74846,-25.32912],[37.74840,-25.32910],[37.74838,-25.32910],[37.74835,-25.32908],[37.74830,-25.32908],[37.74820,-25.32902],[37.74809,-25.32893],[37.74795,-25.32877],[37.74785,-25.32866],[37.74774,-25.32857],[37.74766,-25.32853],[37.74756,-25.32848],[37.74743,-25.32844],[37.74733,-25.32843],[37.74724,-25.32846],[37.74717,-25.32847],[37.74705,-25.32844],[37.74699,-25.32842],[37.74695,-25.32840],[37.74691,-25.32838],[37.74684,-25.32835],[37.74674,-25.32831],[37.74663,-25.32823],[37.74656,-25.32819],[37.74651,-25.32817],[37.74647,-25.32816],[37.74644,-25.32816],[37.74633,-25.32817],[37.74630,-25.32816],[37.74626,-25.32817],[37.74619,-25.32821],[37.74612,-25.32824],[37.74606,-25.32828],[37.74601,-25.32832],[37.74595,-25.32836],[37.74591,-25.32840],[37.74586,-25.32846],[37.74584,-25.32850],[37.74579,-25.32863],[37.74578,-25.32871],[37.74577,-25.32875],[37.74575,-25.32877],[37.74570,-25.32880],[37.74563,-25.32890],[37.74556,-25.32900],[37.74547,-25.32910],[37.74542,-25.32911],[37.74537,-25.32912],[37.74531,-25.32913],[37.74524,-25.32913],[37.74516,-25.32915],[37.74512,-25.32915],[37.74506,-25.32916],[37.74496,-25.32919],[37.74487,-25.32920],[37.74475,-25.32923],[37.74468,-25.32924],[37.74462,-25.32925],[37.74457,-25.32926],[37.74451,-25.32928],[37.74444,-25.32930],[37.74439,-25.32934],[37.74437,-25.32937],[37.74435,-25.32941],[37.74426,-25.32957],[37.74424,-25.32962],[37.74414,-25.32980],[37.74410,-25.32992],[37.74407,-25.33001],[37.74405,-25.33006],[37.74405,-25.33009],[37.74404,-25.33014],[37.74401,-25.33028],[37.74401,-25.33034],[37.74401,-25.33047],[37.74402,-25.33055],[37.74402,-25.33059],[37.74402,-25.33062],[37.74403,-25.33064],[37.74403,-25.33068],[37.74402,-25.33073],[37.74401,-25.33076],[37.74397,-25.33081],[37.74394,-25.33082],[37.74378,-25.33089],[37.74373,-25.33091],[37.74370,-25.33093],[37.74366,-25.33095],[37.74361,-25.33099],[37.74354,-25.33103],[37.74345,-25.33112],[37.74337,-25.33120],[37.74319,-25.33135],[37.74314,-25.33141],[37.74305,-25.33154],[37.74303,-25.33157],[37.74302,-25.33160],[37.74301,-25.33162],[37.74301,-25.33164],[37.74300,-25.33166],[37.74299,-25.33171],[37.74296,-25.33182],[37.74293,-25.33193],[37.74292,-25.33202],[37.74292,-25.33206],[37.74294,-25.33211],[37.74294,-25.33215],[37.74298,-25.33225],[37.74298,-25.33232],[37.74297,-25.33243],[37.74293,-25.33260],[37.74293,-25.33267],[37.74293,-25.33271],[37.74293,-25.33275],[37.74290,-25.33282],[37.74286,-25.33293],[37.74283,-25.33305],[37.74280,-25.33311],[37.74279,-25.33316],[37.74276,-25.33330],[37.74276,-25.33334],[37.74275,-25.33337],[37.74275,-25.33340],[37.74274,-25.33346],[37.74274,-25.33349],[37.74272,-25.33357],[37.74272,-25.33362],[37.74271,-25.33370],[37.74270,-25.33372],[37.74269,-25.33374],[37.74268,-25.33377],[37.74266,-25.33380],[37.74264,-25.33385],[37.74262,-25.33390],[37.74257,-25.33397],[37.74255,-25.33402],[37.74254,-25.33406],[37.74249,-25.33417],[37.74249,-25.33419],[37.74250,-25.33423],[37.74248,-25.33430],[37.74249,-25.33434],[37.74248,-25.33438],[37.74248,-25.33440],[37.74247,-25.33447],[37.74247,-25.33451],[37.74247,-25.33454],[37.74243,-25.33469],[37.74242,-25.33476],[37.74241,-25.33482],[37.74240,-25.33489],[37.74238,-25.33498],[37.74236,-25.33507],[37.74232,-25.33514],[37.74230,-25.33519],[37.74229,-25.33523],[37.74227,-25.33526],[37.74227,-25.33528],[37.74226,-25.33531],[37.74226,-25.33535],[37.74225,-25.33538],[37.74223,-25.33545],[37.74223,-25.33549],[37.74222,-25.33551],[37.74222,-25.33560],[37.74220,-25.33574],[37.74219,-25.33584],[37.74219,-25.33591],[37.74219,-25.33593],[37.74219,-25.33595],[37.74219,-25.33598],[37.74219,-25.33601],[37.74219,-25.33605],[37.74219,-25.33609],[37.74219,-25.33614],[37.74219,-25.33620],[37.74219,-25.33626],[37.74220,-25.33632],[37.74221,-25.33638],[37.74222,-25.33645],[37.74222,-25.33647],[37.74223,-25.33656],[37.74224,-25.33662],[37.74225,-25.33668],[37.74226,-25.33674],[37.74229,-25.33678],[37.74232,-25.33683],[37.74235,-25.33687],[37.74238,-25.33691],[37.74241,-25.33696],[37.74241,-25.33697],[37.74242,-25.33698],[37.74244,-25.33702],[37.74244,-25.33703],[37.74246,-25.33707],[37.74248,-25.33712],[37.74249,-25.33718],[37.74250,-25.33724],[37.74251,-25.33730],[37.74253,-25.33735],[37.74256,-25.33741],[37.74259,-25.33746],[37.74262,-25.33750],[37.74265,-25.33755],[37.74269,-25.33759],[37.74272,-25.33764],[37.74276,-25.33768],[37.74280,-25.33772],[37.74284,-25.33776],[37.74287,-25.33781],[37.74290,-25.33785],[37.74293,-25.33790],[37.74296,-25.33794],[37.74296,-25.33795],[37.74296,-25.33794],[37.74293,-25.33790],[37.74290,-25.33785],[37.74287,-25.33781],[37.74284,-25.33776],[37.74280,-25.33772],[37.74276,-25.33768],[37.74272,-25.33764],[37.74269,-25.33759],[37.74265,-25.33755],[37.74262,-25.33750],[37.74259,-25.33746],[37.74256,-25.33741],[37.74253,-25.33735],[37.74251,-25.33730],[37.74250,-25.33724],[37.74249,-25.33718],[37.74248,-25.33712],[37.74246,-25.33707],[37.74244,-25.33703],[37.74244,-25.33702],[37.74242,-25.33698],[37.74241,-25.33697],[37.74241,-25.33696],[37.74238,-25.33691],[37.74235,-25.33687],[37.74232,-25.33683],[37.74229,-25.33678],[37.74226,-25.33674],[37.74225,-25.33668],[37.74224,-25.33662],[37.74223,-25.33656],[37.74222,-25.33647],[37.74222,-25.33645],[37.74221,-25.33638],[37.74220,-25.33632],[37.74219,-25.33626],[37.74219,-25.33620],[37.74219,-25.33614],[37.74219,-25.33609],[37.74219,-25.33605],[37.74219,-25.33601],[37.74219,-25.33598],[37.74219,-25.33595],[37.74219,-25.33593],[37.74219,-25.33591],[37.74219,-25.33584],[37.74220,-25.33574],[37.74222,-25.33560],[37.74222,-25.33551],[37.74223,-25.33549],[37.74223,-25.33545],[37.74225,-25.33538],[37.74226,-25.33535],[37.74226,-25.33531],[37.74227,-25.33528],[37.74227,-25.33526],[37.74229,-25.33523],[37.74230,-25.33519],[37.74232,-25.33514],[37.74236,-25.33507],[37.74238,-25.33498],[37.74240,-25.33489],[37.74241,-25.33482],[37.74242,-25.33476],[37.74243,-25.33469],[37.74247,-25.33454],[37.74247,-25.33451],[37.74247,-25.33447],[37.74248,-25.33440],[37.74248,-25.33438],[37.74249,-25.33434],[37.74248,-25.33430],[37.74250,-25.33423],[37.74249,-25.33419],[37.74249,-25.33417],[37.74254,-25.33406],[37.74255,-25.33402],[37.74257,-25.33397],[37.74262,-25.33390],[37.74264,-25.33385],[37.74266,-25.33380],[37.74268,-25.33377],[37.74269,-25.33374],[37.74270,-25.33372],[37.74271,-25.33370],[37.74272,-25.33362],[37.74272,-25.33357],[37.74274,-25.33349],[37.74274,-25.33346],[37.74275,-25.33340],[37.74275,-25.33337],[37.74276,-25.33334],[37.74276,-25.33330],[37.74279,-25.33316],[37.74280,-25.33311],[37.74283,-25.33305],[37.74286,-25.33293],[37.74290,-25.33282],[37.74293,-25.33275],[37.74293,-25.33271],[37.74293,-25.33267],[37.74293,-25.33260],[37.74297,-25.33243],[37.74298,-25.33232],[37.74298,-25.33225],[37.74294,-25.33215],[37.74294,-25.33211],[37.74292,-25.33206],[37.74292,-25.33202],[37.74293,-25.33193],[37.74296,-25.33182],[37.74299,-25.33171],[37.74300,-25.33166],[37.74301,-25.33164],[37.74301,-25.33162],[37.74302,-25.33160],[37.74303,-25.33157],[37.74305,-25.33154],[37.74314,-25.33141],[37.74319,-25.33135],[37.74337,-25.33120],[37.74345,-25.33112],[37.74354,-25.33103],[37.74361,-25.33099],[37.74366,-25.33095],[37.74370,-25.33093],[37.74373,-25.33091],[37.74378,-25.33089],[37.74394,-25.33082],[37.74397,-25.33081],[37.74401,-25.33076],[37.74402,-25.33073],[37.74403,-25.33068],[37.74403,-25.33064],[37.74402,-25.33062],[37.74402,-25.33059],[37.74402,-25.33055],[37.74401,-25.33047],[37.74401,-25.33034],[37.74401,-25.33028],[37.74404,-25.33014],[37.74405,-25.33009],[37.74405,-25.33006],[37.74407,-25.33001],[37.74410,-25.32992],[37.74414,-25.32980],[37.74424,-25.32962],[37.74426,-25.32957],[37.74435,-25.32941],[37.74437,-25.32937],[37.74439,-25.32934],[37.74444,-25.32930],[37.74451,-25.32928],[37.74457,-25.32926],[37.74462,-25.32925],[37.74468,-25.32924],[37.74475,-25.32923],[37.74487,-25.32920],[37.74496,-25.32919],[37.74506,-25.32916],[37.74512,-25.32915],[37.74516,-25.32915],[37.74524,-25.32913],[37.74531,-25.32913],[37.74537,-25.32912],[37.74542,-25.32911],[37.74547,-25.32910],[37.74556,-25.32900],[37.74563,-25.32890],[37.74570,-25.32880],[37.74575,-25.32877],[37.74577,-25.32875],[37.74578,-25.32871],[37.74579,-25.32863],[37.74584,-25.32850],[37.74586,-25.32846],[37.74591,-25.32840],[37.74595,-25.32836],[37.74601,-25.32832],[37.74606,-25.32828],[37.74612,-25.32824],[37.74619,-25.32821],[37.74626,-25.32817],[37.74630,-25.32816],[37.74633,-25.32817],[37.74644,-25.32816],[37.74647,-25.32816],[37.74651,-25.32817],[37.74656,-25.32819],[37.74663,-25.32823],[37.74674,-25.32831],[37.74684,-25.32835],[37.74691,-25.32838],[37.74695,-25.32840],[37.74699,-25.32842],[37.74705,-25.32844],[37.74717,-25.32847],[37.74724,-25.32846],[37.74733,-25.32843],[37.74743,-25.32844],[37.74756,-25.32848],[37.74766,-25.32853],[37.74774,-25.32857],[37.74785,-25.32866],[37.74795,-25.32877],[37.74809,-25.32893],[37.74820,-25.32902],[37.74830,-25.32908],[37.74835,-25.32908],[37.74838,-25.32910],[37.74840,-25.32910],[37.74846,-25.32912],[37.74851,-25.32912],[37.74855,-25.32913],[37.74860,-25.32913],[37.74865,-25.32914],[37.74869,-25.32914],[37.74876,-25.32916],[37.74885,-25.32917],[37.74893,-25.32920],[37.74902,-25.32929],[37.74908,-25.32936],[37.74912,-25.32939],[37.74914,-25.32943],[37.74921,-25.32952],[37.74924,-25.32959],[37.74927,-25.32965],[37.74929,-25.32968],[37.74929,-25.32969],[37.74929,-25.32969],[37.74931,-25.32973],[37.74933,-25.32977],[37.74936,-25.32981],[37.74941,-25.32992],[37.74946,-25.32999],[37.74951,-25.33004],[37.74956,-25.33008],[37.74964,-25.33013],[37.74970,-25.33017],[37.74981,-25.33024],[37.74985,-25.33027],[37.74990,-25.33030],[37.74994,-25.33032],[37.74998,-25.33034],[37.74999,-25.33034],[37.75000,-25.33035],[37.75003,-25.33038],[37.75007,-25.33042],[37.75014,-25.33055],[37.75018,-25.33061],[37.75018,-25.33063],[37.75023,-25.33065],[37.75028,-25.33067],[37.75032,-25.33069],[37.75032,-25.33069],[37.75033,-25.33069],[37.75034,-25.33072],[37.75032,-25.33076],[37.75029,-25.33080],[37.75028,-25.33084],[37.75024,-25.33101],[37.75023,-25.33103],[37.75021,-25.33120],[37.75021,-25.33120],[37.75020,-25.33126],[37.75016,-25.33147],[37.75016,-25.33167],[37.75016,-25.33188],[37.75022,-25.33206],[37.75030,-25.33219],[37.75034,-25.33222],[37.75032,-25.33220]];
const PROFILE_D6_TM16 = [[0.000,305],[0.003,304],[0.008,306],[0.022,306],[0.040,306],[0.058,303],[0.076,299],[0.095,295],[0.100,295],[0.100,295],[0.115,293],[0.117,293],[0.133,290],[0.137,290],[0.141,289],[0.146,288],[0.148,288],[0.150,289],[0.150,289],[0.154,290],[0.160,293],[0.166,296],[0.168,296],[0.175,298],[0.188,302],[0.194,304],[0.198,306],[0.200,306],[0.201,307],[0.206,308],[0.211,310],[0.217,312],[0.222,313],[0.236,315],[0.243,315],[0.253,316],[0.260,316],[0.267,315],[0.275,315],[0.286,313],[0.291,313],[0.295,313],[0.299,312],[0.299,312],[0.300,312],[0.304,312],[0.310,311],[0.317,310],[0.328,311],[0.332,311],[0.337,311],[0.346,312],[0.359,311],[0.368,312],[0.378,315],[0.386,316],[0.391,318],[0.396,319],[0.402,320],[0.407,321],[0.412,322],[0.419,323],[0.421,323],[0.425,323],[0.431,324],[0.443,322],[0.457,320],[0.478,318],[0.493,316],[0.508,316],[0.517,315],[0.529,313],[0.544,312],[0.555,312],[0.566,312],[0.573,311],[0.587,310],[0.594,310],[0.599,311],[0.604,311],[0.612,311],[0.623,311],[0.638,310],[0.646,309],[0.652,307],[0.656,306],[0.660,305],[0.672,302],[0.676,301],[0.680,300],[0.689,298],[0.697,296],[0.704,296],[0.711,295],[0.718,293],[0.724,292],[0.732,290],[0.736,289],[0.749,288],[0.756,288],[0.759,288],[0.762,288],[0.768,288],[0.780,288],[0.792,287],[0.805,287],[0.811,287],[0.817,288],[0.823,288],[0.831,289],[0.840,290],[0.845,290],[0.851,291],[0.863,292],[0.873,294],[0.886,296],[0.894,297],[0.901,296],[0.907,296],[0.913,295],[0.921,295],[0.928,295],[0.931,294],[0.936,294],[0.953,294],[0.958,294],[0.977,294],[0.989,293],[0.997,292],[1.002,291],[1.005,291],[1.009,291],[1.022,289],[1.027,289],[1.039,290],[1.046,290],[1.049,291],[1.052,291],[1.054,292],[1.058,292],[1.062,293],[1.065,294],[1.071,296],[1.075,296],[1.094,298],[1.099,299],[1.103,299],[1.108,299],[1.115,300],[1.123,300],[1.136,300],[1.147,299],[1.171,296],[1.179,296],[1.194,296],[1.197,296],[1.200,297],[1.202,297],[1.204,297],[1.206,297],[1.211,297],[1.221,298],[1.231,299],[1.239,299],[1.243,299],[1.248,299],[1.251,299],[1.261,300],[1.267,301],[1.277,302],[1.293,301],[1.299,301],[1.302,301],[1.306,301],[1.313,301],[1.323,300],[1.334,300],[1.341,299],[1.345,299],[1.358,298],[1.361,298],[1.364,299],[1.367,299],[1.372,300],[1.375,300],[1.382,301],[1.387,302],[1.394,304],[1.396,305],[1.398,305],[1.401,306],[1.404,306],[1.409,306],[1.414,307],[1.423,308],[1.427,309],[1.431,310],[1.442,311],[1.444,312],[1.448,315],[1.454,319],[1.458,322],[1.462,325],[1.463,326],[1.470,329],[1.473,330],[1.476,331],[1.490,335],[1.496,338],[1.501,340],[1.508,343],[1.516,346],[1.524,348],[1.532,350],[1.537,351],[1.540,351],[1.544,352],[1.546,353],[1.548,353],[1.552,354],[1.555,354],[1.561,355],[1.565,356],[1.567,356],[1.575,357],[1.587,356],[1.596,356],[1.602,358],[1.604,359],[1.606,359],[1.608,360],[1.611,361],[1.615,362],[1.618,363],[1.623,363],[1.628,362],[1.633,361],[1.638,360],[1.644,359],[1.650,359],[1.652,359],[1.660,360],[1.665,361],[1.671,361],[1.676,361],[1.681,361],[1.686,361],[1.691,361],[1.696,362],[1.702,363],[1.703,363],[1.704,363],[1.708,364],[1.709,364],[1.713,364],[1.718,363],[1.723,363],[1.729,362],[1.734,364],[1.739,365],[1.745,366],[1.751,367],[1.756,368],[1.761,369],[1.767,370],[1.772,370],[1.778,370],[1.784,370],[1.790,371],[1.795,372],[1.800,372],[1.805,373],[1.810,373],[1.811,373],[1.812,373],[1.817,373],[1.822,372],[1.827,372],[1.833,371],[1.838,370],[1.844,370],[1.850,370],[1.855,370],[1.861,369],[1.866,368],[1.871,367],[1.877,366],[1.883,365],[1.888,364],[1.893,362],[1.899,363],[1.904,363],[1.909,364],[1.913,364],[1.914,364],[1.918,363],[1.920,363],[1.921,363],[1.926,362],[1.931,361],[1.936,361],[1.941,361],[1.946,361],[1.952,361],[1.957,361],[1.962,360],[1.970,359],[1.972,359],[1.978,359],[1.984,360],[1.989,361],[1.994,362],[2.000,363],[2.004,363],[2.008,362],[2.011,361],[2.014,360],[2.016,359],[2.018,359],[2.020,358],[2.026,356],[2.035,356],[2.047,357],[2.055,356],[2.057,356],[2.061,355],[2.067,354],[2.070,354],[2.074,353],[2.077,353],[2.078,352],[2.082,351],[2.086,351],[2.091,350],[2.098,348],[2.106,346],[2.115,343],[2.121,340],[2.126,338],[2.132,335],[2.146,331],[2.149,330],[2.153,329],[2.159,326],[2.161,325],[2.164,322],[2.168,319],[2.174,315],[2.178,312],[2.180,311],[2.191,310],[2.195,309],[2.200,308],[2.208,307],[2.213,306],[2.218,306],[2.221,306],[2.224,305],[2.226,305],[2.228,304],[2.235,302],[2.240,301],[2.247,300],[2.250,300],[2.255,299],[2.258,299],[2.261,298],[2.264,298],[2.277,299],[2.282,299],[2.288,300],[2.299,300],[2.310,301],[2.317,301],[2.320,301],[2.324,301],[2.330,301],[2.345,302],[2.355,301],[2.361,300],[2.371,299],[2.375,299],[2.379,299],[2.383,299],[2.391,299],[2.401,298],[2.411,297],[2.416,297],[2.418,297],[2.420,297],[2.422,297],[2.425,296],[2.428,296],[2.443,296],[2.451,296],[2.475,299],[2.486,300],[2.499,300],[2.508,300],[2.514,299],[2.519,299],[2.523,299],[2.529,298],[2.547,296],[2.551,296],[2.557,294],[2.560,293],[2.565,292],[2.568,292],[2.570,291],[2.573,291],[2.576,290],[2.583,290],[2.595,289],[2.600,289],[2.613,291],[2.617,291],[2.620,291],[2.625,292],[2.634,293],[2.645,294],[2.664,294],[2.669,294],[2.687,294],[2.691,294],[2.694,295],[2.701,295],[2.709,295],[2.716,296],[2.721,296],[2.728,297],[2.736,296],[2.749,294],[2.760,292],[2.771,291],[2.778,290],[2.782,290],[2.791,289],[2.799,288],[2.806,288],[2.811,287],[2.817,287],[2.830,287],[2.842,288],[2.854,288],[2.860,288],[2.863,288],[2.866,288],[2.874,288],[2.886,289],[2.890,290],[2.898,292],[2.904,293],[2.911,295],[2.918,296],[2.925,296],[2.934,298],[2.942,300],[2.947,301],[2.950,302],[2.962,305],[2.966,306],[2.970,307],[2.976,309],[2.985,310],[2.999,311],[3.010,311],[3.019,311],[3.023,311],[3.028,310],[3.035,310],[3.049,311],[3.057,312],[3.067,312],[3.078,312],[3.093,313],[3.105,315],[3.114,316],[3.129,316],[3.144,318],[3.165,320],[3.179,322],[3.192,324],[3.197,323],[3.201,323],[3.203,323],[3.210,322],[3.216,321],[3.220,320],[3.226,319],[3.231,318],[3.236,316],[3.244,315],[3.254,312],[3.263,311],[3.276,312],[3.285,311],[3.290,311],[3.294,311],[3.305,310],[3.312,311],[3.319,312],[3.322,312],[3.323,312],[3.323,312],[3.327,313],[3.331,313],[3.336,313],[3.347,315],[3.356,315],[3.363,316],[3.369,316],[3.379,315],[3.387,315],[3.400,313],[3.406,312],[3.412,310],[3.417,308],[3.421,307],[3.422,306],[3.424,306],[3.428,304],[3.434,302],[3.448,298],[3.454,296],[3.456,296],[3.462,293],[3.468,290],[3.473,289],[3.473,289],[3.474,288],[3.477,288],[3.481,289],[3.486,290],[3.489,290],[3.505,293],[3.507,293],[3.522,295],[3.522,295],[3.528,295],[3.547,299],[3.564,303],[3.583,306],[3.600,306],[3.614,306],[3.619,304],[3.622,305]];

/* SEND_TRACKS_OFICIAL: les 4 rutes oficials, colors del sistema de senders (vermell/blau/verd/lila).
   El traçat de la PRC05 oficial coincideix en gran part amb la versió modificada (GPX real). */
const TRACK_PRC43_SMI_REAL = [[37.85776,-25.85031],[37.85783,-25.85028],[37.85782,-25.85021],[37.85781,-25.85015],[37.85781,-25.85008],[37.85782,-25.85001],[37.85783,-25.84995],[37.85784,-25.84988],[37.85796,-25.84941],[37.85800,-25.84927],[37.85803,-25.84913],[37.85806,-25.84897],[37.85809,-25.84881],[37.85812,-25.84865],[37.85814,-25.84849],[37.85815,-25.84840],[37.85817,-25.84837],[37.85823,-25.84837],[37.85825,-25.84839],[37.85829,-25.84842],[37.85833,-25.84846],[37.85833,-25.84846],[37.85834,-25.84847],[37.85837,-25.84849],[37.85840,-25.84854],[37.85842,-25.84860],[37.85843,-25.84866],[37.85845,-25.84871],[37.85847,-25.84877],[37.85848,-25.84883],[37.85852,-25.84887],[37.85856,-25.84890],[37.85859,-25.84895],[37.85862,-25.84899],[37.85865,-25.84904],[37.85868,-25.84909],[37.85870,-25.84911],[37.85873,-25.84915],[37.85875,-25.84919],[37.85880,-25.84923],[37.85883,-25.84928],[37.85886,-25.84932],[37.85889,-25.84937],[37.85893,-25.84941],[37.85896,-25.84944],[37.85900,-25.84948],[37.85903,-25.84952],[37.85907,-25.84957],[37.85911,-25.84957],[37.85912,-25.84951],[37.85912,-25.84945],[37.85912,-25.84944],[37.85911,-25.84940],[37.85911,-25.84939],[37.85908,-25.84933],[37.85911,-25.84929],[37.85914,-25.84924],[37.85915,-25.84924],[37.85915,-25.84918],[37.85915,-25.84912],[37.85916,-25.84906],[37.85916,-25.84900],[37.85918,-25.84894],[37.85919,-25.84888],[37.85920,-25.84883],[37.85922,-25.84880],[37.85921,-25.84877],[37.85926,-25.84866],[37.85927,-25.84865],[37.85930,-25.84862],[37.85929,-25.84837],[37.85930,-25.84831],[37.85933,-25.84821],[37.85932,-25.84818],[37.85931,-25.84807],[37.85936,-25.84798],[37.85939,-25.84793],[37.85941,-25.84789],[37.85949,-25.84771],[37.85954,-25.84769],[37.85989,-25.84770],[37.86002,-25.84771],[37.86006,-25.84768],[37.86010,-25.84764],[37.86011,-25.84763],[37.86014,-25.84760],[37.86018,-25.84757],[37.86018,-25.84755],[37.86019,-25.84752],[37.86019,-25.84748],[37.86021,-25.84741],[37.86022,-25.84735],[37.86021,-25.84734],[37.86021,-25.84733],[37.86021,-25.84727],[37.86020,-25.84721],[37.86020,-25.84721],[37.86021,-25.84715],[37.86021,-25.84714],[37.86021,-25.84712],[37.86022,-25.84708],[37.86022,-25.84706],[37.86025,-25.84702],[37.86026,-25.84700],[37.86027,-25.84699],[37.86031,-25.84695],[37.86035,-25.84694],[37.86040,-25.84694],[37.86044,-25.84689],[37.86046,-25.84684],[37.86045,-25.84678],[37.86042,-25.84673],[37.86040,-25.84668],[37.86042,-25.84662],[37.86044,-25.84657],[37.86049,-25.84656],[37.86051,-25.84653],[37.86042,-25.84649],[37.86038,-25.84646],[37.86033,-25.84642],[37.86029,-25.84639],[37.86022,-25.84633],[37.86015,-25.84628],[37.86009,-25.84625],[37.86003,-25.84622],[37.85997,-25.84620],[37.85978,-25.84614],[37.85974,-25.84612],[37.85970,-25.84610],[37.85963,-25.84606],[37.85957,-25.84601],[37.85952,-25.84599],[37.85947,-25.84598],[37.85942,-25.84598],[37.85930,-25.84600],[37.85914,-25.84603],[37.85882,-25.84608],[37.85875,-25.84609],[37.85868,-25.84611],[37.85864,-25.84613],[37.85861,-25.84616],[37.85857,-25.84619],[37.85855,-25.84623],[37.85853,-25.84632],[37.85850,-25.84641],[37.85846,-25.84649],[37.85844,-25.84654],[37.85841,-25.84659],[37.85837,-25.84663],[37.85833,-25.84668],[37.85828,-25.84673],[37.85830,-25.84676],[37.85832,-25.84679],[37.85834,-25.84682],[37.85835,-25.84686],[37.85836,-25.84691],[37.85837,-25.84697],[37.85837,-25.84703],[37.85837,-25.84708],[37.85835,-25.84716],[37.85833,-25.84724],[37.85826,-25.84753],[37.85825,-25.84759],[37.85823,-25.84767],[37.85818,-25.84788],[37.85817,-25.84801],[37.85816,-25.84815],[37.85815,-25.84832],[37.85815,-25.84840],[37.85814,-25.84849],[37.85812,-25.84865],[37.85809,-25.84881],[37.85806,-25.84897],[37.85803,-25.84913],[37.85800,-25.84927],[37.85796,-25.84941],[37.85784,-25.84988],[37.85783,-25.84995],[37.85782,-25.85001],[37.85781,-25.85008],[37.85781,-25.85015],[37.85782,-25.85021],[37.85783,-25.85028],[37.85785,-25.85034],[37.85788,-25.85040],[37.85790,-25.85045],[37.85793,-25.85049],[37.85797,-25.85053],[37.85800,-25.85057],[37.85805,-25.85060],[37.85809,-25.85062],[37.85809,-25.85062],[37.85814,-25.85063],[37.85824,-25.85064],[37.85837,-25.85066],[37.85842,-25.85067],[37.85880,-25.85073],[37.85900,-25.85075],[37.85906,-25.85076],[37.85920,-25.85077],[37.85931,-25.85077],[37.85941,-25.85076],[37.85951,-25.85074],[37.85956,-25.85073],[37.85960,-25.85072],[37.85961,-25.85071],[37.85966,-25.85070],[37.85973,-25.85069],[37.85974,-25.85069],[37.85975,-25.85069],[37.85976,-25.85069],[37.85977,-25.85070],[37.85978,-25.85070],[37.85978,-25.85071],[37.85979,-25.85072],[37.85980,-25.85073],[37.85980,-25.85074],[37.85980,-25.85075],[37.85980,-25.85076],[37.85980,-25.85077],[37.85980,-25.85078],[37.85980,-25.85079],[37.85979,-25.85080],[37.85979,-25.85081],[37.85978,-25.85081],[37.85977,-25.85083],[37.85974,-25.85086],[37.85965,-25.85092],[37.85958,-25.85096],[37.85953,-25.85101],[37.85942,-25.85108],[37.85942,-25.85108],[37.85941,-25.85109],[37.85941,-25.85110],[37.85941,-25.85111],[37.85941,-25.85112],[37.85941,-25.85113],[37.85941,-25.85114],[37.85941,-25.85115],[37.85941,-25.85116],[37.85942,-25.85117],[37.85942,-25.85118],[37.85943,-25.85118],[37.85944,-25.85119],[37.85945,-25.85119],[37.85956,-25.85118],[37.85968,-25.85116],[37.85984,-25.85112],[37.86001,-25.85107],[37.86019,-25.85098],[37.86036,-25.85089],[37.86041,-25.85086],[37.86047,-25.85083],[37.86048,-25.85083],[37.86049,-25.85083],[37.86050,-25.85083],[37.86050,-25.85083],[37.86051,-25.85084],[37.86052,-25.85084],[37.86053,-25.85085],[37.86053,-25.85086],[37.86054,-25.85087],[37.86054,-25.85089],[37.86054,-25.85090],[37.86054,-25.85091],[37.86054,-25.85095],[37.86053,-25.85098],[37.86052,-25.85101],[37.86050,-25.85104],[37.86041,-25.85116],[37.86032,-25.85127],[37.86028,-25.85132],[37.86023,-25.85137],[37.86019,-25.85141],[37.86016,-25.85144],[37.86015,-25.85145],[37.86014,-25.85146],[37.86013,-25.85147],[37.86013,-25.85148],[37.86013,-25.85149],[37.86013,-25.85151],[37.86012,-25.85152],[37.86013,-25.85153],[37.86013,-25.85154],[37.86013,-25.85155],[37.86014,-25.85156],[37.86014,-25.85157],[37.86015,-25.85158],[37.86016,-25.85159],[37.86017,-25.85159],[37.86019,-25.85159],[37.86023,-25.85158],[37.86032,-25.85154],[37.86037,-25.85151],[37.86040,-25.85149],[37.86056,-25.85142],[37.86072,-25.85134],[37.86084,-25.85129],[37.86086,-25.85129],[37.86088,-25.85129],[37.86090,-25.85129],[37.86092,-25.85130],[37.86094,-25.85131],[37.86096,-25.85132],[37.86098,-25.85134],[37.86100,-25.85135],[37.86103,-25.85139],[37.86103,-25.85139],[37.86104,-25.85139],[37.86104,-25.85138],[37.86109,-25.85142],[37.86113,-25.85145],[37.86117,-25.85147],[37.86122,-25.85146],[37.86123,-25.85146],[37.86128,-25.85146],[37.86133,-25.85144],[37.86137,-25.85140],[37.86141,-25.85136],[37.86146,-25.85133],[37.86146,-25.85133],[37.86151,-25.85130],[37.86155,-25.85127],[37.86158,-25.85122],[37.86161,-25.85115],[37.86164,-25.85111],[37.86166,-25.85116],[37.86168,-25.85123],[37.86168,-25.85130],[37.86169,-25.85136],[37.86169,-25.85142],[37.86171,-25.85147],[37.86173,-25.85152],[37.86174,-25.85159],[37.86176,-25.85164],[37.86178,-25.85170],[37.86178,-25.85176],[37.86176,-25.85182],[37.86174,-25.85186],[37.86173,-25.85192],[37.86171,-25.85198],[37.86170,-25.85204],[37.86168,-25.85210],[37.86166,-25.85215],[37.86165,-25.85222],[37.86163,-25.85228],[37.86160,-25.85232],[37.86155,-25.85234],[37.86150,-25.85235],[37.86147,-25.85235],[37.86145,-25.85235],[37.86140,-25.85236],[37.86135,-25.85237],[37.86131,-25.85240],[37.86129,-25.85246],[37.86129,-25.85252],[37.86128,-25.85259],[37.86128,-25.85265],[37.86129,-25.85272],[37.86127,-25.85278],[37.86124,-25.85282],[37.86121,-25.85287],[37.86117,-25.85292],[37.86114,-25.85298],[37.86111,-25.85300],[37.86109,-25.85301],[37.86105,-25.85304],[37.86103,-25.85307],[37.86102,-25.85308],[37.86098,-25.85314],[37.86096,-25.85319],[37.86093,-25.85325],[37.86093,-25.85332],[37.86091,-25.85337],[37.86088,-25.85343],[37.86084,-25.85346],[37.86080,-25.85348],[37.86074,-25.85348],[37.86069,-25.85346],[37.86064,-25.85344],[37.86059,-25.85344],[37.86055,-25.85341],[37.86049,-25.85341],[37.86044,-25.85341],[37.86039,-25.85340],[37.86034,-25.85340],[37.86029,-25.85340],[37.86024,-25.85339],[37.86020,-25.85339],[37.86015,-25.85339],[37.86012,-25.85343],[37.86009,-25.85349],[37.86006,-25.85354],[37.86002,-25.85356],[37.85997,-25.85358],[37.85995,-25.85363],[37.85995,-25.85364],[37.85995,-25.85363],[37.85997,-25.85358],[37.86002,-25.85356],[37.86006,-25.85354],[37.86009,-25.85349],[37.86012,-25.85343],[37.86015,-25.85339],[37.86009,-25.85338],[37.86003,-25.85338],[37.85998,-25.85337],[37.85993,-25.85335],[37.85988,-25.85332],[37.85983,-25.85328],[37.85979,-25.85324],[37.85975,-25.85319],[37.85972,-25.85316],[37.85968,-25.85313],[37.85963,-25.85310],[37.85958,-25.85308],[37.85954,-25.85305],[37.85950,-25.85302],[37.85946,-25.85299],[37.85942,-25.85296],[37.85938,-25.85292],[37.85934,-25.85288],[37.85929,-25.85285],[37.85925,-25.85283],[37.85920,-25.85281],[37.85916,-25.85278],[37.85912,-25.85274],[37.85909,-25.85272],[37.85907,-25.85270],[37.85903,-25.85266],[37.85900,-25.85262],[37.85897,-25.85256],[37.85893,-25.85252],[37.85895,-25.85243],[37.85891,-25.85241],[37.85891,-25.85241],[37.85886,-25.85239],[37.85882,-25.85237],[37.85879,-25.85237],[37.85877,-25.85238],[37.85873,-25.85236],[37.85870,-25.85230],[37.85866,-25.85227],[37.85866,-25.85226],[37.85866,-25.85227],[37.85870,-25.85230],[37.85873,-25.85236],[37.85877,-25.85238],[37.85879,-25.85237],[37.85882,-25.85237],[37.85886,-25.85239],[37.85891,-25.85241],[37.85891,-25.85241],[37.85895,-25.85243],[37.85900,-25.85246],[37.85911,-25.85249],[37.85931,-25.85249],[37.85946,-25.85250],[37.85964,-25.85252],[37.85982,-25.85254],[37.86003,-25.85254],[37.86010,-25.85254],[37.86021,-25.85252],[37.86026,-25.85253],[37.86038,-25.85253],[37.86051,-25.85254],[37.86053,-25.85253],[37.86056,-25.85253],[37.86059,-25.85253],[37.86065,-25.85252],[37.86070,-25.85249],[37.86072,-25.85244],[37.86070,-25.85237],[37.86068,-25.85232],[37.86066,-25.85226],[37.86059,-25.85223],[37.86059,-25.85218],[37.86060,-25.85216],[37.86061,-25.85213],[37.86064,-25.85210],[37.86073,-25.85198],[37.86075,-25.85195],[37.86080,-25.85188],[37.86084,-25.85183],[37.86089,-25.85176],[37.86096,-25.85167],[37.86101,-25.85159],[37.86102,-25.85157],[37.86103,-25.85157],[37.86103,-25.85156],[37.86104,-25.85155],[37.86104,-25.85155],[37.86104,-25.85154],[37.86105,-25.85152],[37.86105,-25.85151],[37.86105,-25.85150],[37.86105,-25.85148],[37.86104,-25.85145],[37.86104,-25.85142],[37.86103,-25.85142],[37.86103,-25.85141],[37.86103,-25.85139],[37.86103,-25.85139],[37.86100,-25.85135],[37.86098,-25.85134],[37.86096,-25.85132],[37.86094,-25.85131],[37.86092,-25.85130],[37.86090,-25.85129],[37.86088,-25.85129],[37.86086,-25.85129],[37.86084,-25.85129],[37.86072,-25.85134],[37.86056,-25.85142],[37.86040,-25.85149],[37.86037,-25.85151],[37.86032,-25.85154],[37.86023,-25.85158],[37.86019,-25.85159],[37.86017,-25.85159],[37.86016,-25.85159],[37.86015,-25.85158],[37.86014,-25.85157],[37.86014,-25.85156],[37.86013,-25.85155],[37.86013,-25.85154],[37.86013,-25.85153],[37.86012,-25.85152],[37.86013,-25.85151],[37.86013,-25.85149],[37.86013,-25.85148],[37.86013,-25.85147],[37.86014,-25.85146],[37.86015,-25.85145],[37.86016,-25.85144],[37.86019,-25.85141],[37.86023,-25.85137],[37.86028,-25.85132],[37.86032,-25.85127],[37.86041,-25.85116],[37.86050,-25.85104],[37.86052,-25.85101],[37.86053,-25.85098],[37.86054,-25.85095],[37.86054,-25.85091],[37.86054,-25.85090],[37.86054,-25.85089],[37.86054,-25.85087],[37.86053,-25.85086],[37.86053,-25.85085],[37.86052,-25.85084],[37.86051,-25.85084],[37.86050,-25.85083],[37.86050,-25.85083],[37.86049,-25.85083],[37.86048,-25.85083],[37.86047,-25.85083],[37.86041,-25.85086],[37.86036,-25.85089],[37.86019,-25.85098],[37.86001,-25.85107],[37.85984,-25.85112],[37.85968,-25.85116],[37.85956,-25.85118],[37.85945,-25.85119],[37.85944,-25.85119],[37.85943,-25.85118],[37.85942,-25.85118],[37.85942,-25.85117],[37.85941,-25.85116],[37.85941,-25.85115],[37.85941,-25.85114],[37.85941,-25.85113],[37.85941,-25.85112],[37.85941,-25.85111],[37.85941,-25.85110],[37.85941,-25.85109],[37.85942,-25.85108],[37.85942,-25.85108],[37.85953,-25.85101],[37.85958,-25.85096],[37.85965,-25.85092],[37.85974,-25.85086],[37.85977,-25.85083],[37.85978,-25.85081],[37.85979,-25.85081],[37.85979,-25.85080],[37.85980,-25.85079],[37.85980,-25.85078],[37.85980,-25.85077],[37.85980,-25.85076],[37.85980,-25.85075],[37.85980,-25.85074],[37.85980,-25.85073],[37.85979,-25.85072],[37.85978,-25.85071],[37.85978,-25.85070],[37.85977,-25.85070],[37.85976,-25.85069],[37.85975,-25.85069],[37.85974,-25.85069],[37.85973,-25.85069],[37.85966,-25.85070],[37.85961,-25.85071],[37.85956,-25.85073],[37.85951,-25.85074],[37.85941,-25.85076],[37.85931,-25.85077],[37.85920,-25.85077],[37.85906,-25.85076],[37.85900,-25.85075],[37.85880,-25.85073],[37.85842,-25.85067],[37.85837,-25.85066],[37.85824,-25.85064],[37.85814,-25.85063],[37.85809,-25.85062],[37.85809,-25.85062],[37.85805,-25.85060],[37.85800,-25.85057],[37.85797,-25.85053],[37.85793,-25.85049],[37.85790,-25.85045],[37.85788,-25.85040],[37.85785,-25.85034],[37.85783,-25.85028],[37.85779,-25.85030],[37.85776,-25.85031]];
const PROFILE_PRC43_SMI = [[0.000,117],[0.009,119],[0.015,120],[0.020,122],[0.026,123],[0.032,125],[0.038,126],[0.044,127],[0.088,137],[0.100,140],[0.113,143],[0.128,146],[0.142,148],[0.156,150],[0.171,152],[0.179,153],[0.183,153],[0.189,155],[0.192,155],[0.197,156],[0.203,157],[0.203,157],[0.205,157],[0.208,158],[0.213,159],[0.219,159],[0.224,159],[0.229,160],[0.235,160],[0.240,160],[0.245,161],[0.251,162],[0.256,163],[0.261,163],[0.266,164],[0.272,165],[0.275,165],[0.280,166],[0.285,165],[0.290,166],[0.296,165],[0.301,165],[0.306,164],[0.311,164],[0.316,163],[0.322,163],[0.327,162],[0.333,161],[0.338,162],[0.344,165],[0.349,167],[0.350,168],[0.353,169],[0.354,169],[0.360,171],[0.365,173],[0.370,176],[0.371,176],[0.375,178],[0.381,180],[0.386,181],[0.392,182],[0.397,184],[0.402,185],[0.408,185],[0.411,186],[0.413,186],[0.425,188],[0.426,188],[0.431,189],[0.453,193],[0.458,194],[0.468,193],[0.471,193],[0.480,193],[0.489,193],[0.495,193],[0.499,193],[0.517,193],[0.523,193],[0.562,194],[0.576,194],[0.582,193],[0.587,192],[0.588,192],[0.594,191],[0.598,191],[0.599,191],[0.603,191],[0.606,190],[0.612,189],[0.618,188],[0.618,188],[0.620,188],[0.625,187],[0.630,186],[0.630,186],[0.636,185],[0.637,185],[0.638,185],[0.642,184],[0.644,184],[0.649,182],[0.650,182],[0.652,181],[0.658,180],[0.663,179],[0.669,178],[0.674,177],[0.680,176],[0.685,176],[0.690,176],[0.696,175],[0.701,174],[0.706,173],[0.711,173],[0.714,172],[0.725,173],[0.730,173],[0.736,173],[0.741,173],[0.751,172],[0.760,172],[0.767,172],[0.774,172],[0.781,171],[0.803,169],[0.808,168],[0.813,167],[0.821,166],[0.829,165],[0.835,164],[0.841,164],[0.846,164],[0.859,163],[0.877,163],[0.913,157],[0.921,155],[0.930,154],[0.934,154],[0.939,153],[0.943,153],[0.948,152],[0.956,152],[0.964,152],[0.972,151],[0.977,150],[0.983,150],[0.988,149],[0.995,148],[1.002,147],[1.006,148],[1.009,149],[1.013,149],[1.016,150],[1.021,151],[1.026,152],[1.031,152],[1.036,153],[1.044,153],[1.051,153],[1.077,154],[1.083,154],[1.091,154],[1.109,153],[1.121,153],[1.133,153],[1.148,153],[1.155,153],[1.163,152],[1.178,150],[1.192,148],[1.206,146],[1.221,143],[1.234,140],[1.246,137],[1.290,127],[1.296,126],[1.302,125],[1.308,123],[1.314,122],[1.319,120],[1.325,119],[1.331,118],[1.337,117],[1.342,116],[1.347,115],[1.353,115],[1.358,114],[1.363,114],[1.368,114],[1.369,114],[1.374,115],[1.385,116],[1.399,116],[1.405,115],[1.448,109],[1.470,105],[1.477,104],[1.493,101],[1.504,99],[1.516,98],[1.527,97],[1.532,96],[1.537,96],[1.538,96],[1.544,96],[1.552,96],[1.553,96],[1.554,95],[1.555,95],[1.556,94],[1.558,94],[1.559,93],[1.560,93],[1.561,92],[1.561,91],[1.562,90],[1.563,90],[1.564,89],[1.565,88],[1.566,88],[1.567,87],[1.568,87],[1.569,87],[1.570,86],[1.575,85],[1.587,84],[1.595,83],[1.602,82],[1.615,80],[1.616,80],[1.617,80],[1.618,79],[1.619,79],[1.620,79],[1.621,78],[1.622,77],[1.623,77],[1.623,76],[1.624,76],[1.625,75],[1.626,75],[1.627,75],[1.628,74],[1.641,73],[1.654,71],[1.673,70],[1.692,69],[1.713,71],[1.734,74],[1.740,75],[1.747,76],[1.748,76],[1.749,76],[1.750,76],[1.751,76],[1.752,75],[1.753,75],[1.754,74],[1.755,74],[1.756,73],[1.757,72],[1.758,72],[1.760,71],[1.763,69],[1.766,67],[1.769,66],[1.772,65],[1.786,60],[1.801,55],[1.807,53],[1.814,51],[1.819,50],[1.824,49],[1.825,48],[1.826,48],[1.828,48],[1.829,47],[1.830,47],[1.831,46],[1.832,45],[1.833,45],[1.834,44],[1.835,44],[1.836,43],[1.837,42],[1.838,42],[1.840,41],[1.841,41],[1.842,41],[1.848,41],[1.858,41],[1.865,42],[1.868,42],[1.887,43],[1.906,45],[1.920,46],[1.922,46],[1.925,45],[1.927,44],[1.929,43],[1.932,42],[1.934,41],[1.936,40],[1.939,39],[1.943,37],[1.943,36],[1.945,37],[1.946,37],[1.952,34],[1.957,32],[1.961,31],[1.968,30],[1.969,30],[1.974,29],[1.980,29],[1.985,30],[1.992,30],[1.997,30],[1.998,30],[2.004,30],[2.009,30],[2.015,31],[2.021,32],[2.026,32],[2.032,30],[2.038,28],[2.044,26],[2.049,24],[2.055,23],[2.060,21],[2.065,20],[2.070,18],[2.075,17],[2.081,16],[2.086,15],[2.092,15],[2.096,15],[2.102,15],[2.107,15],[2.113,14],[2.119,14],[2.124,14],[2.129,14],[2.135,13],[2.140,13],[2.146,13],[2.152,14],[2.156,14],[2.158,14],[2.164,14],[2.169,14],[2.174,14],[2.179,14],[2.185,13],[2.191,13],[2.197,13],[2.203,12],[2.208,12],[2.213,12],[2.219,12],[2.225,12],[2.231,12],[2.236,12],[2.238,12],[2.243,13],[2.246,13],[2.248,13],[2.254,13],[2.259,13],[2.265,13],[2.271,13],[2.277,13],[2.282,13],[2.287,13],[2.293,13],[2.299,12],[2.305,12],[2.311,12],[2.316,12],[2.321,12],[2.328,12],[2.333,12],[2.339,12],[2.345,12],[2.350,12],[2.355,12],[2.360,12],[2.365,12],[2.371,11],[2.377,11],[2.382,10],[2.387,10],[2.393,10],[2.398,9],[2.398,9],[2.399,9],[2.404,10],[2.409,10],[2.414,10],[2.419,11],[2.426,11],[2.431,12],[2.438,11],[2.445,11],[2.451,11],[2.456,11],[2.462,11],[2.468,11],[2.474,11],[2.480,11],[2.485,11],[2.491,10],[2.496,10],[2.502,10],[2.507,10],[2.513,10],[2.518,10],[2.523,10],[2.529,10],[2.535,10],[2.540,10],[2.546,10],[2.551,10],[2.556,10],[2.562,10],[2.565,10],[2.569,9],[2.574,9],[2.579,9],[2.585,9],[2.591,9],[2.598,13],[2.603,13],[2.604,13],[2.609,13],[2.614,14],[2.617,13],[2.619,12],[2.624,13],[2.630,14],[2.635,15],[2.636,15],[2.637,15],[2.642,14],[2.648,13],[2.653,12],[2.656,13],[2.658,14],[2.664,13],[2.669,13],[2.670,13],[2.674,13],[2.680,12],[2.692,12],[2.715,14],[2.732,14],[2.751,15],[2.772,16],[2.795,17],[2.802,17],[2.815,17],[2.821,17],[2.835,16],[2.848,16],[2.851,16],[2.854,16],[2.858,16],[2.864,16],[2.871,16],[2.876,17],[2.882,18],[2.887,18],[2.892,19],[2.901,20],[2.906,21],[2.908,21],[2.911,22],[2.915,22],[2.929,23],[2.933,23],[2.941,23],[2.948,23],[2.956,23],[2.967,23],[2.976,27],[2.978,28],[2.979,28],[2.979,28],[2.980,28],[2.981,29],[2.981,29],[2.983,30],[2.984,31],[2.985,31],[2.987,32],[2.990,34],[2.992,35],[2.992,35],[2.993,36],[2.995,36],[2.995,37],[2.999,39],[3.002,40],[3.004,41],[3.007,42],[3.009,43],[3.011,44],[3.014,45],[3.016,46],[3.018,46],[3.032,45],[3.051,43],[3.070,42],[3.073,42],[3.080,41],[3.090,41],[3.096,41],[3.097,41],[3.099,41],[3.100,42],[3.101,42],[3.102,43],[3.103,44],[3.104,44],[3.105,45],[3.106,45],[3.107,46],[3.108,47],[3.109,47],[3.111,48],[3.112,48],[3.113,48],[3.114,49],[3.119,50],[3.124,51],[3.131,53],[3.138,55],[3.152,60],[3.166,65],[3.169,66],[3.172,67],[3.175,69],[3.179,71],[3.180,72],[3.181,72],[3.182,73],[3.183,74],[3.184,74],[3.185,75],[3.186,75],[3.187,76],[3.188,76],[3.189,76],[3.190,76],[3.192,76],[3.198,75],[3.204,74],[3.225,71],[3.246,69],[3.265,70],[3.284,71],[3.297,73],[3.310,74],[3.311,75],[3.312,75],[3.313,75],[3.314,76],[3.315,76],[3.316,77],[3.317,77],[3.317,78],[3.318,79],[3.319,79],[3.320,79],[3.321,80],[3.322,80],[3.323,80],[3.336,82],[3.343,83],[3.351,84],[3.363,85],[3.368,86],[3.369,87],[3.370,87],[3.371,87],[3.372,88],[3.373,88],[3.374,89],[3.375,90],[3.376,90],[3.377,91],[3.378,92],[3.379,93],[3.380,93],[3.381,94],[3.382,94],[3.383,95],[3.384,95],[3.385,96],[3.386,96],[3.394,96],[3.400,96],[3.406,96],[3.411,97],[3.422,98],[3.434,99],[3.446,101],[3.461,104],[3.468,105],[3.490,109],[3.533,115],[3.539,116],[3.553,116],[3.564,115],[3.570,114],[3.570,114],[3.575,114],[3.580,114],[3.586,115],[3.591,115],[3.596,116],[3.601,117],[3.607,118],[3.613,119],[3.618,118],[3.622,117]];

/* SEND_TRACKS_OFICIAL: les 4 rutes oficials, colors del sistema de senders (vermell/blau/verd/lila).
   El traçat de la PRC05 oficial coincideix en gran part amb la versió modificada (GPX real).
   PRC43 amb GPX real. */
/* ── TRACKS DIA 4 ────────────────────────────────────────── */
const TRACK_D4_ACCES = [[37.74704,-25.53709],[37.74761,-25.53690],[37.74781,-25.53681],[37.74798,-25.53673],[37.74850,-25.53643],[37.74882,-25.53622],[37.74890,-25.53615],[37.74895,-25.53607],[37.74899,-25.53598],[37.74900,-25.53591],[37.74901,-25.53581],[37.74899,-25.53572],[37.74895,-25.53564],[37.74879,-25.53545],[37.74853,-25.53522],[37.74844,-25.53512],[37.74837,-25.53503],[37.74832,-25.53491],[37.74830,-25.53475],[37.74819,-25.53313],[37.74815,-25.53242],[37.74814,-25.53217],[37.74815,-25.53189],[37.74821,-25.53148],[37.74836,-25.53066],[37.74842,-25.53041],[37.74849,-25.53025],[37.74862,-25.53007],[37.74876,-25.52993],[37.75015,-25.52881],[37.75107,-25.52804],[37.75130,-25.52780],[37.75142,-25.52762],[37.75152,-25.52743],[37.75160,-25.52721],[37.75165,-25.52697],[37.75168,-25.52673],[37.75167,-25.52643],[37.75163,-25.52573],[37.75156,-25.52467],[37.75153,-25.52418],[37.75154,-25.52407],[37.75156,-25.52398],[37.75160,-25.52391],[37.75165,-25.52385],[37.75171,-25.52380],[37.75177,-25.52378],[37.75184,-25.52378],[37.75190,-25.52380],[37.75198,-25.52385],[37.75207,-25.52394],[37.75257,-25.52452],[37.75273,-25.52464],[37.75280,-25.52467],[37.75288,-25.52470],[37.75311,-25.52469],[37.75345,-25.52466],[37.75362,-25.52465],[37.75370,-25.52466],[37.75377,-25.52468],[37.75384,-25.52471],[37.75408,-25.52490],[37.75449,-25.52528],[37.75489,-25.52566],[37.75502,-25.52577],[37.75514,-25.52584],[37.75526,-25.52589],[37.75537,-25.52591],[37.75548,-25.52589],[37.75560,-25.52585],[37.75574,-25.52575],[37.75659,-25.52498],[37.75872,-25.52303],[37.75957,-25.52225],[37.75969,-25.52211],[37.75979,-25.52194],[37.75985,-25.52177],[37.75990,-25.52157],[37.75992,-25.52136],[37.75992,-25.52099],[37.75985,-25.51957],[37.75986,-25.51938],[37.75988,-25.51925],[37.75993,-25.51913],[37.76009,-25.51888],[37.76040,-25.51844],[37.76046,-25.51832],[37.76052,-25.51817],[37.76065,-25.51778],[37.76078,-25.51731],[37.76085,-25.51714],[37.76096,-25.51697],[37.76115,-25.51669],[37.76135,-25.51642],[37.76171,-25.51590],[37.76226,-25.51511],[37.76299,-25.51410],[37.76331,-25.51377],[37.76374,-25.51346],[37.76420,-25.51314],[37.76425,-25.51307],[37.76427,-25.51299],[37.76425,-25.51290],[37.76419,-25.51284],[37.76412,-25.51283],[37.76401,-25.51285],[37.76352,-25.51304],[37.76343,-25.51306],[37.76336,-25.51305],[37.76329,-25.51302],[37.76326,-25.51297],[37.76324,-25.51289],[37.76323,-25.51278],[37.76327,-25.51263],[37.76338,-25.51232],[37.76371,-25.51138],[37.76413,-25.51010],[37.76419,-25.50998],[37.76427,-25.50987],[37.76434,-25.50980],[37.76441,-25.50976],[37.76452,-25.50973],[37.76467,-25.50970],[37.76540,-25.50966],[37.76560,-25.50964],[37.76570,-25.50962],[37.76578,-25.50959],[37.76587,-25.50954],[37.76594,-25.50948],[37.76600,-25.50940],[37.76606,-25.50931],[37.76613,-25.50912],[37.76618,-25.50880],[37.76624,-25.50838],[37.76625,-25.50821],[37.76624,-25.50806],[37.76623,-25.50791],[37.76619,-25.50778],[37.76612,-25.50764],[37.76600,-25.50747],[37.76567,-25.50707],[37.76470,-25.50591],[37.76465,-25.50583],[37.76461,-25.50575],[37.76459,-25.50567],[37.76459,-25.50560],[37.76462,-25.50555],[37.76466,-25.50551],[37.76470,-25.50550],[37.76477,-25.50552],[37.76483,-25.50555],[37.76527,-25.50591],[37.76536,-25.50597],[37.76545,-25.50602],[37.76554,-25.50604],[37.76566,-25.50601],[37.76581,-25.50595],[37.76588,-25.50591],[37.76592,-25.50585],[37.76594,-25.50577],[37.76595,-25.50570],[37.76593,-25.50562],[37.76587,-25.50557],[37.76580,-25.50555],[37.76555,-25.50558],[37.76546,-25.50557],[37.76539,-25.50555],[37.76532,-25.50549],[37.76515,-25.50530],[37.76510,-25.50523],[37.76507,-25.50514],[37.76507,-25.50508],[37.76507,-25.50502],[37.76511,-25.50496],[37.76517,-25.50495],[37.76523,-25.50496],[37.76529,-25.50501],[37.76542,-25.50511],[37.76551,-25.50517],[37.76558,-25.50518],[37.76565,-25.50517],[37.76570,-25.50516],[37.76577,-25.50510],[37.76582,-25.50503],[37.76586,-25.50494],[37.76590,-25.50479],[37.76598,-25.50443],[37.76606,-25.50401],[37.76609,-25.50390],[37.76615,-25.50379],[37.76622,-25.50372],[37.76633,-25.50363],[37.76674,-25.50338],[37.76688,-25.50327],[37.76696,-25.50317],[37.76713,-25.50293],[37.76728,-25.50271],[37.76744,-25.50251],[37.76756,-25.50237],[37.76762,-25.50228],[37.76766,-25.50218],[37.76770,-25.50206],[37.76772,-25.50189],[37.76771,-25.50174],[37.76769,-25.50163],[37.76765,-25.50156],[37.76759,-25.50151],[37.76754,-25.50150],[37.76748,-25.50150],[37.76743,-25.50153],[37.76740,-25.50158],[37.76736,-25.50168],[37.76732,-25.50189],[37.76729,-25.50199],[37.76726,-25.50206],[37.76720,-25.50214],[37.76705,-25.50229],[37.76684,-25.50244],[37.76668,-25.50254],[37.76656,-25.50261],[37.76637,-25.50269],[37.76611,-25.50277],[37.76585,-25.50281],[37.76577,-25.50280],[37.76569,-25.50277],[37.76563,-25.50273],[37.76556,-25.50266],[37.76549,-25.50258],[37.76544,-25.50248],[37.76539,-25.50233],[37.76526,-25.50175],[37.76519,-25.50159],[37.76511,-25.50146],[37.76501,-25.50136],[37.76434,-25.50103],[37.76379,-25.50075],[37.76370,-25.50069],[37.76364,-25.50063],[37.76359,-25.50057],[37.76355,-25.50047],[37.76353,-25.50035],[37.76351,-25.50019],[37.76347,-25.49921],[37.76346,-25.49889],[37.76347,-25.49873],[37.76350,-25.49860],[37.76384,-25.49743],[37.76390,-25.49730],[37.76398,-25.49719],[37.76408,-25.49708],[37.76418,-25.49697],[37.76469,-25.49661],[37.76495,-25.49642],[37.76504,-25.49633],[37.76510,-25.49625],[37.76513,-25.49616],[37.76514,-25.49606],[37.76513,-25.49598],[37.76510,-25.49590],[37.76505,-25.49581],[37.76500,-25.49576],[37.76454,-25.49551],[37.76423,-25.49535],[37.76393,-25.49517],[37.76383,-25.49508],[37.76375,-25.49498],[37.76369,-25.49489],[37.76364,-25.49480],[37.76360,-25.49466],[37.76356,-25.49447],[37.76351,-25.49404],[37.76346,-25.49384],[37.76338,-25.49362],[37.76312,-25.49298],[37.76304,-25.49281],[37.76300,-25.49273],[37.76279,-25.49248],[37.76259,-25.49227],[37.76257,-25.49220],[37.76256,-25.49213],[37.76257,-25.49208],[37.76260,-25.49202],[37.76263,-25.49200],[37.76267,-25.49199],[37.76271,-25.49200],[37.76275,-25.49203],[37.76303,-25.49243],[37.76323,-25.49268],[37.76347,-25.49292],[37.76390,-25.49344],[37.76420,-25.49383],[37.76439,-25.49409],[37.76453,-25.49424],[37.76466,-25.49436],[37.76476,-25.49444],[37.76488,-25.49451],[37.76550,-25.49482],[37.76568,-25.49493],[37.76601,-25.49516],[37.76629,-25.49536],[37.76703,-25.49589],[37.76720,-25.49599],[37.76732,-25.49602],[37.76750,-25.49601],[37.76780,-25.49594],[37.76813,-25.49588],[37.76831,-25.49587],[37.76870,-25.49584],[37.76890,-25.49581],[37.76900,-25.49578],[37.76937,-25.49559],[37.76955,-25.49550],[37.76970,-25.49543],[37.76976,-25.49538],[37.76984,-25.49527],[37.76987,-25.49520],[37.76988,-25.49513],[37.76988,-25.49503],[37.76986,-25.49481],[37.76978,-25.49451],[37.76970,-25.49411],[37.76969,-25.49402],[37.76969,-25.49394],[37.76970,-25.49380],[37.76974,-25.49360],[37.76991,-25.49307],[37.76994,-25.49293],[37.76995,-25.49281],[37.76994,-25.49271],[37.76991,-25.49257],[37.76984,-25.49243],[37.76961,-25.49206],[37.76951,-25.49187],[37.76946,-25.49173],[37.76942,-25.49160],[37.76939,-25.49144],[37.76929,-25.49074],[37.76910,-25.48949],[37.76910,-25.48937],[37.76911,-25.48926],[37.76917,-25.48902],[37.76922,-25.48888],[37.76931,-25.48866],[37.76939,-25.48849],[37.76953,-25.48823],[37.76967,-25.48798],[37.76973,-25.48792],[37.76982,-25.48790],[37.76986,-25.48791],[37.76990,-25.48794],[37.76993,-25.48797],[37.76996,-25.48804],[37.76996,-25.48811],[37.76995,-25.48817],[37.76992,-25.48824],[37.76988,-25.48831],[37.76979,-25.48845],[37.76973,-25.48855],[37.76969,-25.48865],[37.76967,-25.48875],[37.76966,-25.48886],[37.76966,-25.48897],[37.76970,-25.48921],[37.76974,-25.48938],[37.76979,-25.48956],[37.76987,-25.48976],[37.76995,-25.48995],[37.77010,-25.49023],[37.77018,-25.49034],[37.77028,-25.49046],[37.77055,-25.49072],[37.77079,-25.49096],[37.77090,-25.49109],[37.77103,-25.49127],[37.77112,-25.49143],[37.77120,-25.49160],[37.77127,-25.49178],[37.77134,-25.49199],[37.77146,-25.49244],[37.77148,-25.49256],[37.77148,-25.49268],[37.77147,-25.49277],[37.77144,-25.49287],[37.77134,-25.49309],[37.77130,-25.49319],[37.77129,-25.49329],[37.77129,-25.49339],[37.77132,-25.49347],[37.77136,-25.49353],[37.77142,-25.49356],[37.77150,-25.49357],[37.77159,-25.49356],[37.77189,-25.49349],[37.77199,-25.49349],[37.77207,-25.49351],[37.77216,-25.49354],[37.77224,-25.49360],[37.77241,-25.49374],[37.77290,-25.49420],[37.77300,-25.49427],[37.77309,-25.49433],[37.77317,-25.49437],[37.77327,-25.49440],[37.77340,-25.49443],[37.77370,-25.49447],[37.77381,-25.49450],[37.77395,-25.49456],[37.77401,-25.49460],[37.77406,-25.49468],[37.77419,-25.49496],[37.77426,-25.49506],[37.77434,-25.49515],[37.77454,-25.49529],[37.77513,-25.49568],[37.77557,-25.49593],[37.77578,-25.49607],[37.77593,-25.49616],[37.77601,-25.49623],[37.77608,-25.49631],[37.77614,-25.49641],[37.77620,-25.49658],[37.77625,-25.49673],[37.77627,-25.49682],[37.77627,-25.49692],[37.77625,-25.49700],[37.77622,-25.49709],[37.77617,-25.49716],[37.77609,-25.49723],[37.77598,-25.49732],[37.77588,-25.49738],[37.77578,-25.49742],[37.77567,-25.49744],[37.77557,-25.49745],[37.77547,-25.49745],[37.77523,-25.49742],[37.77516,-25.49744],[37.77513,-25.49749],[37.77511,-25.49754],[37.77511,-25.49761],[37.77513,-25.49767],[37.77517,-25.49770],[37.77530,-25.49771],[37.77543,-25.49770],[37.77631,-25.49759],[37.77667,-25.49753],[37.77675,-25.49750],[37.77681,-25.49747],[37.77686,-25.49742],[37.77691,-25.49734],[37.77694,-25.49726],[37.77700,-25.49694],[37.77703,-25.49679],[37.77708,-25.49667],[37.77715,-25.49655],[37.77743,-25.49625],[37.77787,-25.49582],[37.77798,-25.49568],[37.77806,-25.49556],[37.77813,-25.49542],[37.77816,-25.49533],[37.77817,-25.49522],[37.77816,-25.49512],[37.77814,-25.49504],[37.77810,-25.49496],[37.77804,-25.49491],[37.77797,-25.49487],[37.77789,-25.49486],[37.77780,-25.49487],[37.77749,-25.49498],[37.77739,-25.49500],[37.77730,-25.49501],[37.77720,-25.49500],[37.77710,-25.49497],[37.77695,-25.49489],[37.77681,-25.49481],[37.77658,-25.49467],[37.77640,-25.49456],[37.77629,-25.49451],[37.77614,-25.49447],[37.77585,-25.49441],[37.77581,-25.49437],[37.77579,-25.49434],[37.77578,-25.49428],[37.77578,-25.49422],[37.77580,-25.49418],[37.77585,-25.49414],[37.77590,-25.49414],[37.77596,-25.49416],[37.77607,-25.49422],[37.77634,-25.49433],[37.77645,-25.49435],[37.77660,-25.49436],[37.77675,-25.49433],[37.77692,-25.49428],[37.77700,-25.49423],[37.77707,-25.49417],[37.77731,-25.49390],[37.77740,-25.49383],[37.77748,-25.49379],[37.77760,-25.49376],[37.77784,-25.49372],[37.77817,-25.49369],[37.77840,-25.49368],[37.77853,-25.49370],[37.77869,-25.49374],[37.77883,-25.49379],[37.77901,-25.49388],[37.77934,-25.49406],[37.77947,-25.49411],[37.77963,-25.49417],[37.77981,-25.49422],[37.78059,-25.49442],[37.78077,-25.49445],[37.78135,-25.49451],[37.78188,-25.49457],[37.78195,-25.49459],[37.78203,-25.49463],[37.78209,-25.49470],[37.78213,-25.49479],[37.78215,-25.49487],[37.78214,-25.49496],[37.78213,-25.49504],[37.78208,-25.49512],[37.78200,-25.49520],[37.78193,-25.49523],[37.78184,-25.49524],[37.78143,-25.49517],[37.78119,-25.49512],[37.78111,-25.49512],[37.78105,-25.49512],[37.78098,-25.49514],[37.78093,-25.49519],[37.78090,-25.49526],[37.78090,-25.49534],[37.78092,-25.49542],[37.78096,-25.49550],[37.78119,-25.49577],[37.78141,-25.49599],[37.78166,-25.49619],[37.78199,-25.49639],[37.78206,-25.49645],[37.78208,-25.49651],[37.78209,-25.49659],[37.78207,-25.49666],[37.78203,-25.49672],[37.78196,-25.49680],[37.78163,-25.49710],[37.78142,-25.49731],[37.78131,-25.49747],[37.78128,-25.49755],[37.78127,-25.49764],[37.78128,-25.49773],[37.78133,-25.49781],[37.78141,-25.49787],[37.78178,-25.49797],[37.78200,-25.49804],[37.78222,-25.49810],[37.78254,-25.49821],[37.78280,-25.49832],[37.78300,-25.49843],[37.78324,-25.49858],[37.78356,-25.49879],[37.78370,-25.49890],[37.78379,-25.49899],[37.78384,-25.49909],[37.78386,-25.49921],[37.78386,-25.49936],[37.78382,-25.49951],[37.78375,-25.49960],[37.78367,-25.49966],[37.78357,-25.49968],[37.78347,-25.49967],[37.78336,-25.49960],[37.78327,-25.49951],[37.78319,-25.49941],[37.78294,-25.49897],[37.78289,-25.49894],[37.78284,-25.49893],[37.78279,-25.49895],[37.78276,-25.49901],[37.78275,-25.49907],[37.78276,-25.49914],[37.78280,-25.49921],[37.78286,-25.49931],[37.78309,-25.49958],[37.78336,-25.49993],[37.78346,-25.50004],[37.78355,-25.50010],[37.78366,-25.50012],[37.78377,-25.50012],[37.78410,-25.50002],[37.78418,-25.50001],[37.78437,-25.50004],[37.78451,-25.50007],[37.78466,-25.50008],[37.78479,-25.50006],[37.78488,-25.50000],[37.78521,-25.49968],[37.78542,-25.49946],[37.78564,-25.49925],[37.78574,-25.49918],[37.78583,-25.49914],[37.78592,-25.49915],[37.78599,-25.49921],[37.78603,-25.49931],[37.78603,-25.49941],[37.78599,-25.49950],[37.78593,-25.49958],[37.78578,-25.49975],[37.78556,-25.50000],[37.78535,-25.50025],[37.78513,-25.50050],[37.78505,-25.50056],[37.78494,-25.50061],[37.78480,-25.50065],[37.78449,-25.50071],[37.78444,-25.50074],[37.78440,-25.50077],[37.78437,-25.50082],[37.78436,-25.50087],[37.78435,-25.50093],[37.78436,-25.50097],[37.78438,-25.50100],[37.78442,-25.50105],[37.78449,-25.50106],[37.78460,-25.50103]];
const PROFILE_D4_ACCES = [[0.000,250],[0.066,255],[0.089,258],[0.109,260],[0.173,264],[0.213,268],[0.224,268],[0.233,269],[0.242,271],[0.248,272],[0.257,273],[0.265,275],[0.273,277],[0.298,280],[0.333,282],[0.347,283],[0.357,283],[0.369,284],[0.384,286],[0.527,299],[0.589,306],[0.612,308],[0.636,309],[0.673,311],[0.747,320],[0.769,323],[0.786,325],[0.808,327],[0.827,329],[1.011,344],[1.133,355],[1.166,359],[1.187,362],[1.207,364],[1.228,367],[1.250,369],[1.272,372],[1.298,374],[1.360,376],[1.453,385],[1.496,388],[1.506,389],[1.514,390],[1.521,391],[1.530,392],[1.537,393],[1.544,394],[1.551,394],[1.559,394],[1.569,395],[1.582,396],[1.657,404],[1.678,405],[1.686,406],[1.695,407],[1.721,410],[1.759,415],[1.778,417],[1.786,418],[1.794,419],[1.803,421],[1.834,423],[1.890,426],[1.946,432],[1.964,434],[1.978,434],[1.992,435],[2.004,436],[2.016,437],[2.030,438],[2.048,440],[2.165,453],[2.457,469],[2.574,478],[2.592,480],[2.611,483],[2.627,484],[2.645,487],[2.664,489],[2.696,493],[2.822,502],[2.839,503],[2.850,504],[2.862,506],[2.890,509],[2.942,515],[2.955,516],[2.970,518],[3.007,524],[3.050,529],[3.067,530],[3.086,534],[3.119,538],[3.151,540],[3.212,540],[3.305,546],[3.425,558],[3.470,564],[3.526,569],[3.585,572],[3.592,573],[3.600,575],[3.608,578],[3.616,580],[3.624,582],[3.636,582],[3.694,583],[3.703,583],[3.711,584],[3.719,585],[3.725,586],[3.733,588],[3.743,590],[3.757,592],[3.787,597],[3.877,603],[3.999,614],[4.011,615],[4.024,617],[4.034,618],[4.043,619],[4.055,621],[4.073,623],[4.154,631],[4.176,633],[4.187,634],[4.197,634],[4.207,634],[4.217,633],[4.226,633],[4.237,632],[4.255,630],[4.284,631],[4.321,634],[4.336,635],[4.349,637],[4.363,639],[4.375,642],[4.389,645],[4.410,648],[4.460,655],[4.609,667],[4.618,668],[4.626,669],[4.633,670],[4.639,671],[4.645,673],[4.651,675],[4.656,677],[4.663,679],[4.670,680],[4.729,680],[4.740,680],[4.750,681],[4.761,682],[4.774,685],[4.792,685],[4.800,685],[4.807,686],[4.814,687],[4.821,688],[4.828,691],[4.835,693],[4.843,696],[4.871,696],[4.882,695],[4.889,695],[4.899,695],[4.924,697],[4.932,699],[4.940,701],[4.946,703],[4.951,705],[4.958,708],[4.964,710],[4.971,711],[4.979,711],[4.996,709],[5.007,709],[5.015,709],[5.022,710],[5.028,710],[5.037,711],[5.046,713],[5.055,716],[5.069,720],[5.102,726],[5.140,735],[5.150,736],[5.161,737],[5.172,737],[5.186,737],[5.237,743],[5.256,745],[5.268,746],[5.296,747],[5.322,750],[5.347,752],[5.365,753],[5.375,754],[5.385,755],[5.396,756],[5.411,758],[5.425,759],[5.434,760],[5.442,762],[5.450,763],[5.456,764],[5.462,765],[5.468,767],[5.474,767],[5.484,768],[5.503,770],[5.511,770],[5.519,771],[5.529,771],[5.550,773],[5.577,776],[5.596,779],[5.611,781],[5.634,784],[5.664,786],[5.692,790],[5.701,792],[5.710,793],[5.718,794],[5.728,795],[5.739,796],[5.749,798],[5.763,800],[5.816,807],[5.833,808],[5.847,809],[5.861,810],[5.940,818],[6.007,822],[6.019,822],[6.027,823],[6.035,824],[6.044,826],[6.055,828],[6.070,829],[6.155,833],[6.184,836],[6.198,838],[6.210,840],[6.320,856],[6.333,858],[6.346,859],[6.360,861],[6.375,863],[6.440,871],[6.473,872],[6.486,873],[6.496,874],[6.505,875],[6.514,877],[6.521,879],[6.529,881],[6.538,883],[6.545,884],[6.601,892],[6.639,893],[6.675,892],[6.688,892],[6.702,892],[6.712,892],[6.721,893],[6.735,894],[6.752,894],[6.790,893],[6.808,891],[6.829,890],[6.893,884],[6.910,882],[6.918,881],[6.950,881],[6.979,883],[6.986,882],[6.992,881],[6.997,879],[7.002,876],[7.006,875],[7.011,873],[7.015,872],[7.021,871],[7.068,871],[7.099,870],[7.133,867],[7.199,862],[7.247,856],[7.278,854],[7.298,852],[7.316,850],[7.330,849],[7.344,848],[7.418,839],[7.441,837],[7.483,832],[7.518,829],[7.612,815],[7.634,811],[7.648,808],[7.668,803],[7.701,797],[7.739,791],[7.758,789],[7.802,788],[7.824,785],[7.836,784],[7.881,782],[7.902,779],[7.919,776],[7.927,776],[7.941,776],[7.947,776],[7.954,777],[7.962,776],[7.982,774],[8.010,770],[8.046,761],[8.054,759],[8.061,758],[8.074,756],[8.092,755],[8.142,750],[8.155,749],[8.166,749],[8.175,749],[8.187,749],[8.202,747],[8.242,738],[8.262,733],[8.276,730],[8.288,728],[8.303,726],[8.366,722],[8.477,713],[8.488,713],[8.498,712],[8.519,710],[8.533,707],[8.555,702],[8.572,700],[8.600,698],[8.627,700],[8.636,701],[8.646,702],[8.650,702],[8.655,702],[8.660,702],[8.667,700],[8.673,699],[8.678,698],[8.684,697],[8.692,694],[8.708,694],[8.720,694],[8.729,695],[8.738,695],[8.748,695],[8.758,694],[8.779,694],[8.795,694],[8.812,694],[8.831,693],[8.850,691],[8.880,690],[8.893,689],[8.908,686],[8.946,685],[8.980,683],[8.996,682],[9.018,679],[9.035,678],[9.053,676],[9.071,674],[9.091,671],[9.132,667],[9.143,667],[9.154,666],[9.162,665],[9.171,666],[9.193,669],[9.204,669],[9.212,669],[9.222,670],[9.229,670],[9.235,671],[9.243,671],[9.251,671],[9.261,670],[9.296,664],[9.306,664],[9.316,664],[9.326,663],[9.337,664],[9.359,665],[9.427,665],[9.440,664],[9.450,663],[9.461,662],[9.472,660],[9.486,658],[9.520,654],[9.533,654],[9.549,654],[9.557,653],[9.565,654],[9.594,655],[9.606,654],[9.617,652],[9.643,648],[9.717,638],[9.771,633],[9.797,633],[9.816,631],[9.827,629],[9.837,627],[9.848,625],[9.865,622],[9.879,620],[9.887,618],[9.895,617],[9.903,615],[9.911,613],[9.920,612],[9.931,610],[9.945,608],[9.957,607],[9.969,607],[9.981,606],[9.993,607],[10.004,608],[10.030,612],[10.038,613],[10.044,613],[10.049,612],[10.055,610],[10.061,608],[10.066,606],[10.080,602],[10.094,600],[10.193,592],[10.233,589],[10.243,589],[10.251,589],[10.257,589],[10.265,589],[10.274,589],[10.303,587],[10.316,587],[10.328,586],[10.341,585],[10.382,578],[10.444,571],[10.461,570],[10.475,569],[10.489,568],[10.498,567],[10.508,567],[10.517,567],[10.524,567],[10.533,566],[10.541,566],[10.550,566],[10.558,567],[10.568,568],[10.604,574],[10.615,574],[10.625,574],[10.637,573],[10.648,572],[10.666,571],[10.683,570],[10.711,569],[10.734,568],[10.747,568],[10.764,569],[10.796,573],[10.802,573],[10.806,573],[10.811,572],[10.816,571],[10.820,570],[10.826,567],[10.832,565],[10.839,563],[10.852,561],[10.883,559],[10.896,558],[10.913,556],[10.930,553],[10.949,549],[10.959,547],[10.968,544],[11.004,537],[11.016,537],[11.026,537],[11.039,537],[11.065,534],[11.103,532],[11.128,530],[11.143,531],[11.162,531],[11.177,531],[11.199,530],[11.238,525],[11.254,522],[11.272,519],[11.292,516],[11.381,504],[11.401,501],[11.467,495],[11.525,490],[11.534,490],[11.543,489],[11.552,488],[11.561,489],[11.568,489],[11.576,490],[11.583,490],[11.593,491],[11.603,490],[11.612,489],[11.622,488],[11.668,488],[11.694,485],[11.704,485],[11.711,485],[11.718,485],[11.725,485],[11.732,486],[11.739,487],[11.747,487],[11.755,487],[11.790,483],[11.821,483],[11.854,482],[11.895,474],[11.903,472],[11.910,471],[11.917,469],[11.924,468],[11.931,468],[11.941,467],[11.986,465],[12.016,461],[12.035,458],[12.043,457],[12.051,455],[12.059,452],[12.068,451],[12.078,449],[12.121,443],[12.146,437],[12.171,434],[12.207,435],[12.238,433],[12.262,429],[12.292,427],[12.332,426],[12.350,423],[12.362,422],[12.373,421],[12.384,420],[12.397,417],[12.410,412],[12.422,408],[12.433,406],[12.443,404],[12.455,402],[12.468,402],[12.481,403],[12.494,404],[12.541,413],[12.547,414],[12.553,413],[12.559,411],[12.565,408],[12.571,405],[12.577,403],[12.584,400],[12.595,398],[12.630,394],[12.674,392],[12.688,391],[12.699,391],[12.712,391],[12.724,392],[12.762,394],[12.771,394],[12.792,391],[12.808,388],[12.824,384],[12.838,383],[12.850,384],[12.896,386],[12.927,383],[12.957,378],[12.970,374],[12.981,371],[12.990,368],[13.000,366],[13.010,365],[13.019,365],[13.027,365],[13.037,366],[13.059,369],[13.092,367],[13.124,363],[13.157,354],[13.167,351],[13.180,349],[13.196,348],[13.231,349],[13.237,349],[13.242,349],[13.248,348],[13.252,346],[13.257,344],[13.261,343],[13.265,341],[13.271,339],[13.278,338],[13.291,337]];

const TRACK_D4_PRC28 = [[37.81779,-25.40246],[37.81765,-25.40246],[37.81749,-25.40250],[37.81735,-25.40254],[37.81714,-25.40259],[37.81708,-25.40260],[37.81703,-25.40260],[37.81697,-25.40262],[37.81693,-25.40262],[37.81690,-25.40258],[37.81689,-25.40252],[37.81687,-25.40249],[37.81685,-25.40246],[37.81682,-25.40241],[37.81679,-25.40234],[37.81676,-25.40230],[37.81673,-25.40223],[37.81670,-25.40219],[37.81667,-25.40213],[37.81662,-25.40205],[37.81661,-25.40201],[37.81657,-25.40195],[37.81652,-25.40187],[37.81648,-25.40180],[37.81645,-25.40176],[37.81642,-25.40171],[37.81640,-25.40167],[37.81634,-25.40163],[37.81630,-25.40159],[37.81622,-25.40153],[37.81618,-25.40149],[37.81614,-25.40146],[37.81605,-25.40142],[37.81599,-25.40138],[37.81594,-25.40136],[37.81587,-25.40134],[37.81585,-25.40133],[37.81580,-25.40132],[37.81577,-25.40132],[37.81576,-25.40134],[37.81575,-25.40137],[37.81574,-25.40139],[37.81572,-25.40144],[37.81570,-25.40150],[37.81568,-25.40155],[37.81565,-25.40157],[37.81560,-25.40159],[37.81552,-25.40163],[37.81549,-25.40164],[37.81543,-25.40165],[37.81534,-25.40165],[37.81528,-25.40165],[37.81521,-25.40162],[37.81517,-25.40161],[37.81512,-25.40159],[37.81501,-25.40155],[37.81495,-25.40154],[37.81490,-25.40153],[37.81484,-25.40152],[37.81479,-25.40152],[37.81478,-25.40155],[37.81475,-25.40157],[37.81472,-25.40170],[37.81473,-25.40181],[37.81477,-25.40199],[37.81480,-25.40210],[37.81482,-25.40220],[37.81485,-25.40226],[37.81488,-25.40238],[37.81492,-25.40252],[37.81495,-25.40261],[37.81493,-25.40272],[37.81491,-25.40279],[37.81486,-25.40280],[37.81478,-25.40281],[37.81470,-25.40279],[37.81464,-25.40275],[37.81457,-25.40273],[37.81442,-25.40273],[37.81429,-25.40277],[37.81417,-25.40280],[37.81407,-25.40283],[37.81391,-25.40288],[37.81379,-25.40291],[37.81371,-25.40293],[37.81363,-25.40295],[37.81358,-25.40294],[37.81355,-25.40293],[37.81349,-25.40288],[37.81337,-25.40277],[37.81322,-25.40264],[37.81313,-25.40255],[37.81306,-25.40246],[37.81297,-25.40237],[37.81289,-25.40231],[37.81286,-25.40228],[37.81283,-25.40223],[37.81282,-25.40215],[37.81285,-25.40207],[37.81288,-25.40199],[37.81297,-25.40194],[37.81304,-25.40190],[37.81314,-25.40193],[37.81326,-25.40197],[37.81326,-25.40197],[37.81334,-25.40197],[37.81338,-25.40194],[37.81341,-25.40185],[37.81346,-25.40170],[37.81348,-25.40164],[37.81345,-25.40151],[37.81341,-25.40145],[37.81338,-25.40140],[37.81335,-25.40133],[37.81333,-25.40125],[37.81331,-25.40118],[37.81330,-25.40108],[37.81332,-25.40098],[37.81334,-25.40086],[37.81335,-25.40078],[37.81341,-25.40064],[37.81344,-25.40058],[37.81343,-25.40054],[37.81341,-25.40052],[37.81337,-25.40050],[37.81333,-25.40051],[37.81328,-25.40054],[37.81324,-25.40058],[37.81315,-25.40063],[37.81311,-25.40066],[37.81304,-25.40069],[37.81297,-25.40072],[37.81289,-25.40073],[37.81283,-25.40074],[37.81280,-25.40073],[37.81277,-25.40072],[37.81274,-25.40069],[37.81271,-25.40065],[37.81269,-25.40063],[37.81261,-25.40058],[37.81254,-25.40054],[37.81251,-25.40051],[37.81244,-25.40046],[37.81240,-25.40040],[37.81232,-25.40036],[37.81229,-25.40034],[37.81225,-25.40034],[37.81217,-25.40033],[37.81209,-25.40032],[37.81203,-25.40032],[37.81201,-25.40032],[37.81198,-25.40030],[37.81196,-25.40029],[37.81194,-25.40027],[37.81188,-25.40020],[37.81176,-25.40004],[37.81166,-25.39991],[37.81161,-25.39984],[37.81149,-25.39971],[37.81138,-25.39956],[37.81131,-25.39954],[37.81124,-25.39950],[37.81117,-25.39947],[37.81110,-25.39943],[37.81108,-25.39942],[37.81101,-25.39943],[37.81092,-25.39946],[37.81086,-25.39946],[37.81079,-25.39946],[37.81076,-25.39944],[37.81074,-25.39942],[37.81073,-25.39940],[37.81073,-25.39937],[37.81074,-25.39936],[37.81076,-25.39933],[37.81079,-25.39930],[37.81082,-25.39927],[37.81084,-25.39923],[37.81085,-25.39920],[37.81085,-25.39910],[37.81078,-25.39900],[37.81074,-25.39892],[37.81068,-25.39883],[37.81060,-25.39873],[37.81051,-25.39858],[37.81044,-25.39848],[37.81039,-25.39840],[37.81035,-25.39837],[37.81033,-25.39836],[37.81030,-25.39837],[37.81028,-25.39839],[37.81027,-25.39841],[37.81026,-25.39843],[37.81027,-25.39847],[37.81030,-25.39857],[37.81036,-25.39870],[37.81043,-25.39888],[37.81045,-25.39901],[37.81037,-25.39910],[37.81029,-25.39913],[37.81020,-25.39914],[37.80996,-25.39917],[37.80982,-25.39918],[37.80973,-25.39916],[37.80967,-25.39914],[37.80957,-25.39912],[37.80947,-25.39909],[37.80940,-25.39910],[37.80931,-25.39913],[37.80925,-25.39917],[37.80916,-25.39926],[37.80905,-25.39935],[37.80893,-25.39943],[37.80888,-25.39950],[37.80883,-25.39956],[37.80882,-25.39962],[37.80882,-25.39966],[37.80884,-25.39969],[37.80884,-25.39969],[37.80888,-25.39972],[37.80894,-25.39974],[37.80899,-25.39977],[37.80906,-25.39984],[37.80909,-25.39989],[37.80911,-25.39992],[37.80915,-25.40000],[37.80918,-25.40012],[37.80920,-25.40024],[37.80921,-25.40034],[37.80917,-25.40048],[37.80912,-25.40056],[37.80910,-25.40059],[37.80907,-25.40069],[37.80907,-25.40084],[37.80906,-25.40098],[37.80904,-25.40110],[37.80903,-25.40117],[37.80898,-25.40129],[37.80893,-25.40134],[37.80883,-25.40135],[37.80871,-25.40135],[37.80866,-25.40134],[37.80859,-25.40135],[37.80856,-25.40136],[37.80853,-25.40137],[37.80849,-25.40139],[37.80845,-25.40146],[37.80844,-25.40151],[37.80845,-25.40157],[37.80847,-25.40163],[37.80849,-25.40169],[37.80857,-25.40180],[37.80867,-25.40195],[37.80870,-25.40201],[37.80871,-25.40213],[37.80871,-25.40223],[37.80873,-25.40224],[37.80876,-25.40224],[37.80881,-25.40228],[37.80886,-25.40232],[37.80887,-25.40232],[37.80892,-25.40240],[37.80896,-25.40248],[37.80896,-25.40248],[37.80900,-25.40253],[37.80902,-25.40254],[37.80912,-25.40261],[37.80922,-25.40267],[37.80936,-25.40270],[37.80949,-25.40269],[37.80956,-25.40270],[37.80962,-25.40272],[37.80974,-25.40280],[37.80986,-25.40293],[37.80991,-25.40298],[37.80999,-25.40304],[37.81011,-25.40310],[37.81024,-25.40317],[37.81024,-25.40317],[37.81040,-25.40322],[37.81051,-25.40329],[37.81051,-25.40336],[37.81052,-25.40344],[37.81050,-25.40351],[37.81046,-25.40357],[37.81043,-25.40365],[37.81042,-25.40371],[37.81041,-25.40376],[37.81043,-25.40381],[37.81046,-25.40383],[37.81049,-25.40385],[37.81059,-25.40390],[37.81064,-25.40393],[37.81077,-25.40401],[37.81090,-25.40405],[37.81092,-25.40407],[37.81099,-25.40420],[37.81106,-25.40422],[37.81128,-25.40421],[37.81147,-25.40420],[37.81168,-25.40419],[37.81187,-25.40419],[37.81188,-25.40421],[37.81191,-25.40426],[37.81192,-25.40432],[37.81193,-25.40439],[37.81194,-25.40443],[37.81196,-25.40447],[37.81209,-25.40447],[37.81232,-25.40446],[37.81249,-25.40444],[37.81272,-25.40443],[37.81286,-25.40440],[37.81294,-25.40436],[37.81302,-25.40430],[37.81309,-25.40431],[37.81324,-25.40434],[37.81339,-25.40437],[37.81355,-25.40440],[37.81366,-25.40443],[37.81378,-25.40445],[37.81383,-25.40449],[37.81388,-25.40454],[37.81389,-25.40460],[37.81392,-25.40462],[37.81400,-25.40459],[37.81408,-25.40457],[37.81421,-25.40448],[37.81434,-25.40442],[37.81439,-25.40434],[37.81438,-25.40424],[37.81438,-25.40408],[37.81435,-25.40397],[37.81433,-25.40374],[37.81428,-25.40354],[37.81426,-25.40336],[37.81436,-25.40335],[37.81447,-25.40332],[37.81468,-25.40330],[37.81489,-25.40326],[37.81508,-25.40323],[37.81520,-25.40322],[37.81530,-25.40318],[37.81532,-25.40313],[37.81534,-25.40308],[37.81535,-25.40305],[37.81557,-25.40301],[37.81589,-25.40292],[37.81619,-25.40285],[37.81629,-25.40283],[37.81644,-25.40278],[37.81659,-25.40272],[37.81675,-25.40267],[37.81690,-25.40265],[37.81698,-25.40262],[37.81718,-25.40258],[37.81745,-25.40252],[37.81767,-25.40246],[37.81779,-25.40246]];
const PROFILE_D4_PRC28 = [[0.000,210],[0.016,211],[0.034,211],[0.050,211],[0.074,210],[0.080,210],[0.087,209],[0.093,209],[0.097,209],[0.102,209],[0.108,209],[0.111,209],[0.114,209],[0.120,209],[0.127,210],[0.132,210],[0.138,210],[0.143,211],[0.150,211],[0.158,212],[0.162,213],[0.169,214],[0.178,214],[0.186,214],[0.190,215],[0.196,215],[0.200,215],[0.207,215],[0.214,216],[0.224,216],[0.230,217],[0.234,217],[0.245,217],[0.252,217],[0.258,218],[0.266,218],[0.269,218],[0.274,218],[0.278,219],[0.280,218],[0.282,218],[0.284,218],[0.289,218],[0.295,218],[0.300,218],[0.304,218],[0.310,218],[0.319,218],[0.323,219],[0.330,219],[0.340,220],[0.347,220],[0.354,221],[0.359,221],[0.365,221],[0.377,222],[0.385,222],[0.390,222],[0.396,223],[0.402,223],[0.405,223],[0.408,223],[0.420,223],[0.430,222],[0.446,222],[0.457,222],[0.465,222],[0.471,222],[0.482,223],[0.495,224],[0.504,225],[0.514,226],[0.520,227],[0.526,228],[0.534,229],[0.544,230],[0.551,231],[0.559,232],[0.576,234],[0.591,236],[0.605,237],[0.616,237],[0.634,238],[0.648,239],[0.657,240],[0.665,241],[0.671,242],[0.675,242],[0.683,243],[0.699,245],[0.720,247],[0.733,249],[0.743,250],[0.756,252],[0.766,253],[0.771,254],[0.776,254],[0.783,257],[0.791,259],[0.799,261],[0.810,262],[0.819,262],[0.830,260],[0.844,259],[0.844,259],[0.852,258],[0.858,258],[0.866,260],[0.881,262],[0.886,262],[0.898,262],[0.905,263],[0.910,264],[0.917,266],[0.925,267],[0.931,268],[0.940,269],[0.950,269],[0.960,270],[0.967,270],[0.981,268],[0.987,267],[0.991,267],[0.994,266],[0.999,267],[1.004,269],[1.010,271],[1.015,273],[1.026,275],[1.031,276],[1.039,277],[1.048,278],[1.057,280],[1.064,281],[1.067,281],[1.071,281],[1.074,282],[1.079,282],[1.082,283],[1.092,284],[1.100,285],[1.105,285],[1.114,285],[1.120,285],[1.130,287],[1.134,288],[1.139,289],[1.147,291],[1.157,292],[1.163,293],[1.165,294],[1.168,294],[1.171,294],[1.174,294],[1.183,294],[1.202,293],[1.218,293],[1.227,295],[1.244,297],[1.262,299],[1.270,301],[1.279,302],[1.287,304],[1.296,306],[1.298,306],[1.306,307],[1.316,309],[1.323,310],[1.330,312],[1.334,313],[1.337,314],[1.340,314],[1.342,314],[1.343,314],[1.347,313],[1.351,312],[1.355,312],[1.359,311],[1.363,311],[1.371,311],[1.382,313],[1.391,315],[1.402,316],[1.414,318],[1.430,320],[1.442,321],[1.451,322],[1.456,323],[1.459,323],[1.462,324],[1.465,325],[1.467,326],[1.469,327],[1.473,327],[1.482,328],[1.495,328],[1.513,326],[1.525,325],[1.537,329],[1.546,332],[1.556,336],[1.582,342],[1.599,344],[1.609,345],[1.616,346],[1.627,348],[1.638,349],[1.646,350],[1.657,350],[1.664,351],[1.677,352],[1.691,354],[1.706,355],[1.715,356],[1.722,357],[1.727,357],[1.731,357],[1.734,357],[1.735,357],[1.739,355],[1.746,355],[1.752,355],[1.763,355],[1.768,354],[1.771,354],[1.780,354],[1.791,355],[1.801,355],[1.810,355],[1.823,355],[1.832,357],[1.836,358],[1.845,360],[1.858,361],[1.871,361],[1.882,362],[1.888,362],[1.900,363],[1.907,364],[1.919,366],[1.931,368],[1.938,369],[1.945,370],[1.949,372],[1.952,373],[1.957,375],[1.964,378],[1.969,379],[1.974,380],[1.980,380],[1.985,381],[1.999,379],[2.015,379],[2.022,378],[2.032,379],[2.041,380],[2.043,380],[2.047,379],[2.053,378],[2.060,377],[2.061,377],[2.070,376],[2.079,376],[2.079,376],[2.085,375],[2.087,375],[2.100,373],[2.112,370],[2.128,365],[2.143,360],[2.151,358],[2.157,356],[2.172,352],[2.190,347],[2.196,346],[2.207,343],[2.221,337],[2.237,330],[2.237,330],[2.256,326],[2.269,324],[2.275,323],[2.282,320],[2.288,319],[2.295,318],[2.303,318],[2.308,317],[2.313,317],[2.317,316],[2.321,315],[2.325,314],[2.336,311],[2.344,310],[2.359,308],[2.374,305],[2.377,305],[2.391,305],[2.398,304],[2.422,300],[2.443,297],[2.467,293],[2.488,290],[2.490,290],[2.495,289],[2.501,288],[2.508,287],[2.511,286],[2.516,286],[2.530,282],[2.555,278],[2.574,276],[2.600,273],[2.615,270],[2.625,269],[2.636,266],[2.644,265],[2.661,264],[2.678,262],[2.695,261],[2.708,260],[2.721,259],[2.728,259],[2.735,259],[2.740,260],[2.744,260],[2.753,258],[2.762,257],[2.779,255],[2.794,253],[2.803,251],[2.812,250],[2.826,248],[2.835,248],[2.856,246],[2.875,243],[2.890,241],[2.901,240],[2.914,239],[2.937,236],[2.961,233],[2.983,231],[2.996,231],[3.007,230],[3.012,230],[3.017,230],[3.020,229],[3.044,228],[3.081,223],[3.114,217],[3.126,215],[3.143,212],[3.161,208],[3.179,207],[3.196,208],[3.205,209],[3.227,210],[3.257,211],[3.283,211],[3.297,210]];

const TRACK_D4_PR02 = [[37.72779,-25.47151],[37.72797,-25.47169],[37.72850,-25.47203],[37.72883,-25.47219],[37.72900,-25.47244],[37.72903,-25.47254],[37.72906,-25.47265],[37.72909,-25.47295],[37.72903,-25.47341],[37.72904,-25.47373],[37.72904,-25.47392],[37.72902,-25.47452],[37.72899,-25.47489],[37.72897,-25.47507],[37.72905,-25.47543],[37.72921,-25.47545],[37.72943,-25.47547],[37.72957,-25.47552],[37.72974,-25.47565],[37.73039,-25.47606],[37.73078,-25.47631],[37.73120,-25.47644],[37.73132,-25.47643],[37.73166,-25.47635],[37.73205,-25.47648],[37.73231,-25.47646],[37.73244,-25.47642],[37.73281,-25.47641],[37.73329,-25.47666],[37.73365,-25.47672],[37.73389,-25.47671],[37.73418,-25.47671],[37.73446,-25.47669],[37.73467,-25.47658],[37.73478,-25.47626],[37.73487,-25.47593],[37.73497,-25.47577],[37.73513,-25.47559],[37.73521,-25.47545],[37.73534,-25.47532],[37.73550,-25.47509],[37.73563,-25.47462],[37.73566,-25.47426],[37.73582,-25.47404],[37.73618,-25.47404],[37.73637,-25.47413],[37.73649,-25.47437],[37.73660,-25.47453],[37.73668,-25.47451],[37.73687,-25.47441],[37.73709,-25.47436],[37.73719,-25.47439],[37.73748,-25.47444],[37.73775,-25.47452],[37.73803,-25.47462],[37.73826,-25.47486],[37.73832,-25.47506],[37.73848,-25.47546],[37.73862,-25.47577],[37.73886,-25.47598],[37.73911,-25.47619],[37.73931,-25.47633],[37.73957,-25.47677],[37.73973,-25.47718],[37.73987,-25.47766],[37.74013,-25.47806],[37.74024,-25.47812],[37.74047,-25.47848],[37.74063,-25.47850],[37.74067,-25.47842],[37.74064,-25.47795],[37.74048,-25.47760],[37.74037,-25.47719],[37.74031,-25.47700],[37.74029,-25.47634],[37.74029,-25.47613],[37.74028,-25.47573],[37.74030,-25.47556],[37.74042,-25.47527],[37.74063,-25.47502],[37.74087,-25.47491],[37.74092,-25.47478],[37.74083,-25.47414],[37.74084,-25.47411],[37.74087,-25.47402],[37.74099,-25.47391],[37.74109,-25.47391],[37.74137,-25.47387],[37.74151,-25.47393],[37.74167,-25.47399],[37.74184,-25.47413],[37.74200,-25.47416],[37.74207,-25.47421],[37.74227,-25.47418],[37.74236,-25.47424],[37.74248,-25.47426],[37.74256,-25.47430],[37.74264,-25.47431],[37.74277,-25.47435],[37.74290,-25.47448],[37.74300,-25.47449],[37.74309,-25.47455],[37.74321,-25.47468],[37.74337,-25.47478],[37.74355,-25.47487],[37.74368,-25.47493],[37.74375,-25.47502],[37.74383,-25.47513],[37.74393,-25.47525],[37.74404,-25.47530],[37.74412,-25.47535],[37.74428,-25.47545],[37.74437,-25.47546],[37.74451,-25.47554],[37.74475,-25.47567],[37.74492,-25.47580],[37.74504,-25.47594],[37.74515,-25.47606],[37.74539,-25.47613],[37.74547,-25.47612],[37.74549,-25.47596],[37.74556,-25.47588],[37.74573,-25.47583],[37.74589,-25.47582],[37.74597,-25.47582],[37.74607,-25.47580],[37.74619,-25.47579],[37.74636,-25.47572],[37.74649,-25.47568],[37.74662,-25.47564],[37.74669,-25.47562],[37.74681,-25.47558],[37.74691,-25.47561],[37.74712,-25.47548],[37.74727,-25.47551],[37.74739,-25.47563],[37.74753,-25.47577],[37.74783,-25.47581],[37.74792,-25.47557],[37.74797,-25.47555],[37.74798,-25.47545],[37.74797,-25.47528],[37.74807,-25.47528],[37.74818,-25.47532],[37.74841,-25.47535],[37.74853,-25.47529],[37.74852,-25.47505],[37.74848,-25.47487],[37.74854,-25.47475],[37.74856,-25.47466],[37.74857,-25.47450],[37.74858,-25.47442],[37.74866,-25.47430],[37.74868,-25.47419],[37.74877,-25.47398],[37.74894,-25.47396],[37.74905,-25.47391],[37.74909,-25.47389],[37.74920,-25.47399],[37.74936,-25.47422],[37.74949,-25.47430],[37.74959,-25.47435],[37.74969,-25.47436],[37.74988,-25.47439],[37.74996,-25.47439],[37.74994,-25.47422],[37.74980,-25.47400],[37.74974,-25.47385],[37.74969,-25.47373],[37.74962,-25.47361],[37.74955,-25.47350],[37.74947,-25.47341],[37.74944,-25.47332],[37.74948,-25.47322],[37.74959,-25.47314],[37.74978,-25.47300],[37.74996,-25.47304],[37.75003,-25.47302],[37.75011,-25.47298],[37.75028,-25.47296],[37.75041,-25.47296],[37.75053,-25.47300],[37.75073,-25.47305],[37.75092,-25.47312],[37.75101,-25.47310],[37.75110,-25.47307],[37.75128,-25.47306],[37.75136,-25.47317],[37.75146,-25.47331],[37.75154,-25.47345],[37.75164,-25.47355],[37.75171,-25.47363],[37.75180,-25.47369],[37.75190,-25.47380],[37.75200,-25.47389],[37.75223,-25.47406],[37.75238,-25.47407],[37.75257,-25.47403],[37.75267,-25.47397],[37.75277,-25.47383],[37.75287,-25.47377],[37.75299,-25.47373],[37.75313,-25.47383],[37.75334,-25.47390],[37.75353,-25.47390],[37.75371,-25.47387],[37.75390,-25.47404],[37.75401,-25.47417],[37.75407,-25.47425],[37.75423,-25.47450],[37.75425,-25.47459],[37.75425,-25.47477],[37.75436,-25.47493],[37.75449,-25.47503],[37.75457,-25.47508],[37.75467,-25.47523],[37.75476,-25.47544],[37.75481,-25.47560],[37.75489,-25.47570],[37.75501,-25.47581],[37.75515,-25.47596],[37.75520,-25.47608],[37.75533,-25.47627],[37.75541,-25.47660],[37.75561,-25.47675],[37.75568,-25.47689],[37.75576,-25.47706],[37.75580,-25.47719],[37.75587,-25.47743],[37.75588,-25.47757],[37.75592,-25.47768],[37.75600,-25.47778],[37.75612,-25.47798],[37.75622,-25.47812],[37.75636,-25.47824],[37.75648,-25.47832],[37.75665,-25.47840],[37.75680,-25.47848],[37.75698,-25.47855],[37.75708,-25.47865],[37.75718,-25.47879],[37.75727,-25.47888],[37.75736,-25.47895],[37.75744,-25.47899],[37.75759,-25.47906],[37.75778,-25.47921],[37.75795,-25.47935],[37.75815,-25.47945],[37.75825,-25.47950],[37.75835,-25.47954],[37.75845,-25.47958],[37.75860,-25.47962],[37.75876,-25.47969],[37.75888,-25.47976],[37.75900,-25.47981],[37.75912,-25.47988],[37.75921,-25.47996],[37.75933,-25.48006],[37.75945,-25.48009],[37.75953,-25.48011],[37.75961,-25.48017],[37.75970,-25.48028],[37.75978,-25.48039],[37.75986,-25.48048],[37.75996,-25.48054],[37.76008,-25.48056],[37.76024,-25.48053],[37.76031,-25.48051],[37.76044,-25.48052],[37.76041,-25.48052],[37.76032,-25.48052],[37.76013,-25.48056],[37.75997,-25.48054],[37.75986,-25.48048],[37.75973,-25.48032],[37.75962,-25.48017],[37.75954,-25.48011],[37.75945,-25.48009],[37.75933,-25.48006],[37.75922,-25.47997],[37.75913,-25.47988],[37.75896,-25.47979],[37.75877,-25.47970],[37.75862,-25.47963],[37.75843,-25.47956],[37.75822,-25.47948],[37.75806,-25.47941],[37.75794,-25.47933],[37.75771,-25.47916],[37.75754,-25.47902],[37.75736,-25.47895],[37.75719,-25.47882],[37.75709,-25.47865],[37.75698,-25.47855],[37.75671,-25.47843],[37.75659,-25.47836],[37.75646,-25.47831],[37.75635,-25.47823],[37.75622,-25.47812],[37.75612,-25.47797],[37.75596,-25.47773],[37.75588,-25.47757],[37.75581,-25.47720],[37.75576,-25.47706],[37.75568,-25.47689],[37.75560,-25.47674],[37.75541,-25.47660],[37.75537,-25.47643],[37.75533,-25.47626],[37.75528,-25.47619],[37.75519,-25.47607],[37.75515,-25.47596],[37.75500,-25.47581],[37.75488,-25.47569],[37.75481,-25.47561],[37.75476,-25.47543],[37.75466,-25.47521],[37.75457,-25.47509],[37.75439,-25.47496],[37.75432,-25.47488],[37.75425,-25.47476],[37.75424,-25.47451],[37.75413,-25.47435],[37.75393,-25.47405],[37.75377,-25.47390],[37.75371,-25.47386],[37.75353,-25.47390],[37.75332,-25.47389],[37.75312,-25.47383],[37.75306,-25.47378],[37.75299,-25.47372],[37.75286,-25.47377],[37.75276,-25.47384],[37.75266,-25.47398],[37.75255,-25.47405],[37.75239,-25.47408],[37.75230,-25.47407],[37.75222,-25.47406],[37.75202,-25.47391],[37.75190,-25.47379],[37.75179,-25.47369],[37.75169,-25.47362],[37.75154,-25.47344],[37.75143,-25.47326],[37.75136,-25.47317],[37.75132,-25.47309],[37.75118,-25.47307],[37.75107,-25.47308],[37.75100,-25.47311],[37.75092,-25.47312],[37.75072,-25.47304],[37.75051,-25.47300],[37.75040,-25.47296],[37.75030,-25.47298],[37.75010,-25.47298],[37.75003,-25.47302],[37.74995,-25.47303],[37.74978,-25.47301],[37.74965,-25.47309],[37.74958,-25.47315],[37.74948,-25.47322],[37.74944,-25.47333],[37.74948,-25.47342],[37.74955,-25.47351],[37.74962,-25.47359],[37.74970,-25.47375],[37.74974,-25.47383],[37.74980,-25.47400],[37.74994,-25.47422],[37.74996,-25.47439],[37.74986,-25.47440],[37.74958,-25.47434],[37.74937,-25.47423],[37.74923,-25.47404],[37.74910,-25.47390],[37.74893,-25.47396],[37.74877,-25.47398],[37.74868,-25.47419],[37.74866,-25.47430],[37.74858,-25.47444],[37.74857,-25.47462],[37.74854,-25.47474],[37.74849,-25.47486],[37.74852,-25.47511],[37.74853,-25.47530],[37.74840,-25.47536],[37.74832,-25.47534],[37.74818,-25.47533],[37.74808,-25.47529],[37.74797,-25.47528],[37.74797,-25.47546],[37.74797,-25.47556],[37.74791,-25.47557],[37.74782,-25.47582],[37.74765,-25.47578],[37.74754,-25.47577],[37.74740,-25.47563],[37.74729,-25.47552],[37.74712,-25.47548],[37.74699,-25.47556],[37.74685,-25.47560],[37.74675,-25.47560],[37.74664,-25.47565],[37.74643,-25.47570],[37.74630,-25.47574],[37.74617,-25.47579],[37.74606,-25.47580],[37.74596,-25.47582],[37.74570,-25.47585],[37.74555,-25.47589],[37.74549,-25.47596],[37.74547,-25.47613],[37.74538,-25.47613],[37.74521,-25.47608],[37.74515,-25.47606],[37.74504,-25.47594],[37.74493,-25.47580],[37.74482,-25.47572],[37.74472,-25.47564],[37.74447,-25.47552],[37.74437,-25.47546],[37.74428,-25.47545],[37.74418,-25.47538],[37.74404,-25.47531],[37.74394,-25.47525],[37.74385,-25.47516],[37.74378,-25.47506],[37.74369,-25.47494],[37.74347,-25.47483],[37.74330,-25.47473],[37.74321,-25.47468],[37.74309,-25.47454],[37.74299,-25.47448],[37.74289,-25.47447],[37.74277,-25.47436],[37.74264,-25.47431],[37.74256,-25.47429],[37.74248,-25.47427],[37.74236,-25.47424],[37.74228,-25.47418],[37.74207,-25.47422],[37.74199,-25.47417],[37.74183,-25.47413],[37.74170,-25.47404],[37.74153,-25.47393],[37.74142,-25.47390],[37.74137,-25.47386],[37.74110,-25.47391],[37.74099,-25.47392],[37.74089,-25.47400],[37.74084,-25.47407],[37.74083,-25.47416],[37.74086,-25.47439],[37.74088,-25.47448],[37.74088,-25.47459],[37.74093,-25.47478],[37.74086,-25.47495],[37.74065,-25.47501],[37.74055,-25.47510],[37.74043,-25.47525],[37.74030,-25.47549],[37.74030,-25.47586],[37.74026,-25.47629],[37.74030,-25.47675],[37.74038,-25.47720],[37.74050,-25.47763],[37.74066,-25.47799],[37.74067,-25.47845],[37.74046,-25.47848],[37.74030,-25.47824],[37.74011,-25.47804],[37.73997,-25.47783],[37.73985,-25.47762],[37.73972,-25.47723],[37.73960,-25.47679],[37.73945,-25.47658],[37.73922,-25.47626],[37.73885,-25.47599],[37.73865,-25.47586],[37.73847,-25.47548],[37.73834,-25.47507],[37.73822,-25.47484],[37.73796,-25.47462],[37.73768,-25.47448],[37.73749,-25.47441],[37.73725,-25.47437],[37.73694,-25.47436],[37.73669,-25.47449],[37.73661,-25.47454],[37.73636,-25.47417],[37.73620,-25.47407],[37.73583,-25.47406],[37.73569,-25.47419],[37.73564,-25.47460],[37.73555,-25.47504],[37.73540,-25.47528],[37.73526,-25.47542],[37.73517,-25.47551],[37.73488,-25.47590],[37.73484,-25.47619],[37.73473,-25.47645],[37.73455,-25.47667],[37.73428,-25.47675],[37.73392,-25.47674],[37.73356,-25.47674],[37.73329,-25.47668],[37.73306,-25.47658],[37.73283,-25.47642],[37.73251,-25.47642],[37.73224,-25.47647],[37.73191,-25.47646],[37.73162,-25.47635],[37.73118,-25.47644],[37.73079,-25.47631],[37.73066,-25.47620],[37.73032,-25.47602],[37.73006,-25.47582],[37.72990,-25.47573],[37.72962,-25.47551],[37.72923,-25.47543],[37.72902,-25.47541],[37.72897,-25.47507],[37.72901,-25.47462],[37.72902,-25.47436],[37.72905,-25.47396],[37.72900,-25.47356],[37.72902,-25.47331],[37.72908,-25.47269],[37.72900,-25.47244],[37.72874,-25.47216],[37.72830,-25.47187],[37.72803,-25.47171],[37.72785,-25.47161],[37.72778,-25.47151]];
const PROFILE_D4_PR02 = [[0.000,203],[0.026,204],[0.092,210],[0.131,212],[0.160,214],[0.170,214],[0.180,215],[0.206,218],[0.247,222],[0.275,224],[0.292,224],[0.345,224],[0.378,226],[0.393,227],[0.426,229],[0.445,233],[0.469,241],[0.485,243],[0.507,246],[0.587,246],[0.637,249],[0.685,256],[0.697,259],[0.736,264],[0.781,266],[0.810,272],[0.825,277],[0.865,283],[0.923,286],[0.964,290],[0.991,293],[1.023,300],[1.054,304],[1.080,308],[1.110,315],[1.140,322],[1.159,324],[1.183,327],[1.198,328],[1.216,329],[1.244,330],[1.287,332],[1.319,334],[1.345,336],[1.385,344],[1.407,347],[1.432,350],[1.451,353],[1.460,356],[1.482,362],[1.507,370],[1.518,373],[1.551,379],[1.582,385],[1.614,393],[1.647,402],[1.666,405],[1.705,413],[1.737,416],[1.769,421],[1.803,428],[1.828,431],[1.876,439],[1.917,444],[1.961,449],[2.008,453],[2.021,457],[2.061,463],[2.079,470],[2.088,472],[2.129,476],[2.165,475],[2.203,477],[2.221,476],[2.279,483],[2.298,483],[2.333,480],[2.347,480],[2.377,488],[2.408,494],[2.437,501],[2.449,501],[2.507,495],[2.509,495],[2.518,495],[2.534,495],[2.546,496],[2.577,497],[2.594,499],[2.612,501],[2.634,506],[2.652,505],[2.662,506],[2.684,500],[2.695,501],[2.709,498],[2.718,498],[2.727,497],[2.742,497],[2.760,501],[2.771,498],[2.782,498],[2.800,501],[2.821,502],[2.842,502],[2.857,500],[2.868,502],[2.881,502],[2.897,503],[2.910,503],[2.919,502],[2.939,503],[2.949,500],[2.967,500],[2.996,498],[3.018,495],[3.035,498],[3.052,503],[3.079,505],[3.089,505],[3.103,497],[3.113,494],[3.132,497],[3.150,500],[3.159,500],[3.171,500],[3.183,501],[3.204,501],[3.218,500],[3.233,499],[3.241,498],[3.254,497],[3.266,499],[3.292,490],[3.309,490],[3.326,496],[3.346,502],[3.379,504],[3.402,495],[3.408,496],[3.418,493],[3.432,488],[3.444,494],[3.456,497],[3.481,505],[3.496,506],[3.517,500],[3.534,493],[3.546,492],[3.554,491],[3.568,489],[3.575,488],[3.588,490],[3.599,490],[3.620,490],[3.638,494],[3.652,491],[3.657,491],[3.672,494],[3.699,500],[3.714,503],[3.726,504],[3.738,504],[3.758,507],[3.767,508],[3.782,506],[3.807,502],[3.822,500],[3.834,499],[3.847,497],[3.859,496],[3.871,496],[3.879,496],[3.890,494],[3.903,495],[3.927,496],[3.947,499],[3.956,499],[3.964,497],[3.984,496],[3.998,496],[4.012,497],[4.034,498],[4.057,500],[4.067,500],[4.077,498],[4.098,496],[4.111,496],[4.126,497],[4.142,499],[4.156,499],[4.167,499],[4.178,500],[4.193,500],[4.206,501],[4.236,502],[4.252,503],[4.274,505],[4.286,505],[4.303,505],[4.315,506],[4.329,506],[4.346,509],[4.372,508],[4.392,509],[4.413,509],[4.439,511],[4.455,512],[4.465,513],[4.493,513],[4.502,514],[4.517,515],[4.536,515],[4.553,514],[4.562,514],[4.579,514],[4.600,516],[4.616,517],[4.628,517],[4.645,518],[4.665,521],[4.677,521],[4.699,526],[4.730,526],[4.755,528],[4.770,526],[4.787,526],[4.799,526],[4.822,526],[4.834,525],[4.845,525],[4.858,526],[4.879,526],[4.896,527],[4.914,528],[4.930,529],[4.950,531],[4.968,533],[4.989,535],[5.004,535],[5.020,536],[5.033,537],[5.044,537],[5.055,538],[5.072,539],[5.096,540],[5.120,542],[5.143,545],[5.155,547],[5.167,549],[5.178,549],[5.196,551],[5.214,552],[5.229,553],[5.243,555],[5.258,557],[5.270,558],[5.286,561],[5.300,563],[5.309,565],[5.318,566],[5.333,568],[5.346,569],[5.358,571],[5.370,573],[5.384,576],[5.401,578],[5.410,579],[5.424,579],[5.427,579],[5.438,579],[5.459,576],[5.477,573],[5.491,571],[5.511,568],[5.529,566],[5.539,565],[5.549,563],[5.562,561],[5.577,558],[5.590,557],[5.610,554],[5.633,552],[5.650,551],[5.673,549],[5.697,547],[5.716,544],[5.730,542],[5.760,539],[5.783,539],[5.804,537],[5.826,536],[5.845,535],[5.860,535],[5.892,532],[5.906,531],[5.922,529],[5.936,528],[5.953,527],[5.970,526],[5.998,526],[6.015,525],[6.049,526],[6.062,526],[6.079,526],[6.095,528],[6.119,526],[6.135,527],[6.151,526],[6.159,523],[6.174,521],[6.184,521],[6.205,518],[6.222,517],[6.233,517],[6.249,516],[6.271,514],[6.286,514],[6.309,514],[6.320,515],[6.333,515],[6.355,513],[6.374,513],[6.408,511],[6.430,509],[6.438,510],[6.458,509],[6.481,508],[6.504,509],[6.513,508],[6.521,506],[6.536,506],[6.549,505],[6.565,505],[6.579,504],[6.597,503],[6.608,503],[6.616,503],[6.642,501],[6.659,500],[6.674,500],[6.686,499],[6.710,499],[6.730,497],[6.741,496],[6.750,496],[6.766,497],[6.777,499],[6.786,500],[6.794,500],[6.818,498],[6.841,497],[6.854,496],[6.866,497],[6.887,498],[6.896,499],[6.905,499],[6.924,496],[6.940,495],[6.949,495],[6.962,494],[6.973,496],[6.981,496],[6.992,496],[7.003,497],[7.019,499],[7.028,500],[7.045,502],[7.069,506],[7.084,508],[7.095,507],[7.127,504],[7.152,500],[7.174,495],[7.194,491],[7.213,494],[7.231,490],[7.252,490],[7.263,490],[7.277,488],[7.294,491],[7.305,492],[7.316,493],[7.339,502],[7.356,506],[7.371,505],[7.380,502],[7.395,497],[7.407,494],[7.419,488],[7.435,493],[7.443,496],[7.450,495],[7.474,505],[7.494,502],[7.506,502],[7.526,496],[7.542,490],[7.561,490],[7.577,496],[7.593,498],[7.604,498],[7.617,500],[7.641,500],[7.656,501],[7.671,501],[7.683,500],[7.695,500],[7.724,497],[7.740,495],[7.750,497],[7.764,506],[7.774,506],[7.794,503],[7.801,502],[7.817,498],[7.834,495],[7.849,497],[7.862,499],[7.891,500],[7.904,501],[7.914,503],[7.927,502],[7.943,503],[7.956,503],[7.968,502],[7.980,502],[7.995,500],[8.020,502],[8.042,501],[8.052,501],[8.071,498],[8.082,498],[8.094,500],[8.111,498],[8.126,497],[8.134,498],[8.143,498],[8.157,501],[8.168,500],[8.191,506],[8.202,505],[8.219,506],[8.236,503],[8.257,499],[8.269,499],[8.275,497],[8.306,496],[8.319,495],[8.332,495],[8.340,495],[8.348,495],[8.368,497],[8.377,498],[8.387,499],[8.404,501],[8.421,501],[8.445,495],[8.459,492],[8.477,488],[8.503,481],[8.535,481],[8.573,481],[8.614,478],[8.655,477],[8.694,475],[8.731,476],[8.772,472],[8.795,463],[8.822,456],[8.850,453],[8.874,450],[8.897,448],[8.934,444],[8.975,439],[9.000,434],[9.038,430],[9.085,421],[9.111,416],[9.150,412],[9.188,406],[9.212,400],[9.247,391],[9.281,383],[9.302,379],[9.329,375],[9.364,365],[9.394,356],[9.404,354],[9.447,347],[9.467,344],[9.508,336],[9.527,334],[9.563,332],[9.604,331],[9.631,329],[9.650,328],[9.663,328],[9.710,322],[9.736,316],[9.762,311],[9.790,305],[9.821,300],[9.861,293],[9.901,288],[9.931,285],[9.959,286],[9.987,284],[10.023,279],[10.053,269],[10.090,264],[10.124,264],[10.174,256],[10.218,249],[10.235,247],[10.277,247],[10.310,250],[10.331,249],[10.367,244],[10.411,234],[10.434,228],[10.464,227],[10.504,224],[10.527,224],[10.562,224],[10.598,223],[10.620,221],[10.674,216],[10.698,214],[10.737,211],[10.792,207],[10.825,205],[10.847,203],[10.859,203]];

const TRACK_D4_PR39 = [[37.73244,-25.46980],[37.73239,-25.46979],[37.73234,-25.46978],[37.73226,-25.46976],[37.73221,-25.46975],[37.73221,-25.46976],[37.73220,-25.46976],[37.73218,-25.46978],[37.73213,-25.46981],[37.73213,-25.46981],[37.73211,-25.46983],[37.73209,-25.46983],[37.73208,-25.46983],[37.73206,-25.46982],[37.73204,-25.46981],[37.73203,-25.46981],[37.73202,-25.46981],[37.73200,-25.46977],[37.73200,-25.46976],[37.73199,-25.46975],[37.73199,-25.46974],[37.73199,-25.46974],[37.73199,-25.46973],[37.73199,-25.46973],[37.73197,-25.46970],[37.73197,-25.46970],[37.73197,-25.46970],[37.73196,-25.46967],[37.73195,-25.46966],[37.73195,-25.46966],[37.73195,-25.46965],[37.73195,-25.46965],[37.73193,-25.46963],[37.73190,-25.46958],[37.73188,-25.46956],[37.73184,-25.46954],[37.73183,-25.46948],[37.73182,-25.46946],[37.73182,-25.46945],[37.73182,-25.46945],[37.73181,-25.46944],[37.73177,-25.46938],[37.73174,-25.46936],[37.73174,-25.46936],[37.73174,-25.46936],[37.73173,-25.46936],[37.73168,-25.46936],[37.73167,-25.46935],[37.73155,-25.46930],[37.73154,-25.46929],[37.73153,-25.46928],[37.73150,-25.46925],[37.73149,-25.46923],[37.73148,-25.46922],[37.73147,-25.46921],[37.73145,-25.46921],[37.73142,-25.46918],[37.73141,-25.46917],[37.73137,-25.46914],[37.73136,-25.46913],[37.73135,-25.46913],[37.73134,-25.46911],[37.73134,-25.46909],[37.73129,-25.46902],[37.73129,-25.46902],[37.73128,-25.46900],[37.73126,-25.46898],[37.73126,-25.46897],[37.73125,-25.46897],[37.73125,-25.46897],[37.73124,-25.46896],[37.73122,-25.46894],[37.73121,-25.46890],[37.73118,-25.46888],[37.73118,-25.46886],[37.73118,-25.46884],[37.73116,-25.46884],[37.73114,-25.46884],[37.73112,-25.46884],[37.73110,-25.46884],[37.73110,-25.46884],[37.73104,-25.46882],[37.73099,-25.46880],[37.73092,-25.46879],[37.73088,-25.46880],[37.73086,-25.46879],[37.73083,-25.46878],[37.73082,-25.46878],[37.73076,-25.46877],[37.73070,-25.46877],[37.73060,-25.46873],[37.73059,-25.46873],[37.73059,-25.46873],[37.73058,-25.46873],[37.73053,-25.46872],[37.73054,-25.46871],[37.73056,-25.46868],[37.73057,-25.46867],[37.73057,-25.46866],[37.73064,-25.46860],[37.73065,-25.46859],[37.73070,-25.46857],[37.73071,-25.46856],[37.73072,-25.46854],[37.73074,-25.46852],[37.73078,-25.46846],[37.73079,-25.46844],[37.73078,-25.46842],[37.73078,-25.46841],[37.73074,-25.46838],[37.73073,-25.46837],[37.73070,-25.46835],[37.73065,-25.46832],[37.73064,-25.46832],[37.73063,-25.46831],[37.73057,-25.46829],[37.73056,-25.46828],[37.73054,-25.46827],[37.73053,-25.46827],[37.73053,-25.46826],[37.73051,-25.46826],[37.73049,-25.46826],[37.73047,-25.46827],[37.73046,-25.46827],[37.73042,-25.46824],[37.73038,-25.46821],[37.73036,-25.46819],[37.73030,-25.46818],[37.73030,-25.46818],[37.73027,-25.46818],[37.73025,-25.46818],[37.73023,-25.46817],[37.73023,-25.46817],[37.73022,-25.46815],[37.73021,-25.46814],[37.73019,-25.46811],[37.73019,-25.46810],[37.73017,-25.46811],[37.73017,-25.46811],[37.73013,-25.46811],[37.73007,-25.46805],[37.73001,-25.46801],[37.73001,-25.46801],[37.72999,-25.46800],[37.72995,-25.46801],[37.72994,-25.46802],[37.72992,-25.46802],[37.72990,-25.46803],[37.72989,-25.46803],[37.72987,-25.46799],[37.72987,-25.46799],[37.72986,-25.46799],[37.72986,-25.46799],[37.72986,-25.46799],[37.72982,-25.46800],[37.72982,-25.46800],[37.72979,-25.46800],[37.72978,-25.46800],[37.72978,-25.46800],[37.72973,-25.46800],[37.72973,-25.46800],[37.72970,-25.46800],[37.72968,-25.46800],[37.72966,-25.46800],[37.72965,-25.46800],[37.72964,-25.46800],[37.72964,-25.46800],[37.72959,-25.46797],[37.72958,-25.46796],[37.72956,-25.46795],[37.72955,-25.46794],[37.72954,-25.46794],[37.72954,-25.46793],[37.72953,-25.46791],[37.72953,-25.46791],[37.72951,-25.46790],[37.72950,-25.46790],[37.72948,-25.46788],[37.72948,-25.46788],[37.72946,-25.46787],[37.72944,-25.46786],[37.72943,-25.46785],[37.72942,-25.46785],[37.72942,-25.46785],[37.72942,-25.46785],[37.72940,-25.46784],[37.72939,-25.46784],[37.72937,-25.46784],[37.72935,-25.46784],[37.72934,-25.46784],[37.72933,-25.46784],[37.72932,-25.46784],[37.72930,-25.46784],[37.72928,-25.46783],[37.72927,-25.46783],[37.72925,-25.46783],[37.72924,-25.46783],[37.72922,-25.46783],[37.72922,-25.46783],[37.72921,-25.46782],[37.72919,-25.46782],[37.72918,-25.46782],[37.72917,-25.46781],[37.72916,-25.46781],[37.72915,-25.46781],[37.72914,-25.46781],[37.72913,-25.46781],[37.72911,-25.46781],[37.72908,-25.46782],[37.72906,-25.46782],[37.72902,-25.46782],[37.72901,-25.46783],[37.72900,-25.46783],[37.72900,-25.46784],[37.72898,-25.46786],[37.72898,-25.46788],[37.72898,-25.46789],[37.72898,-25.46790],[37.72896,-25.46791],[37.72894,-25.46793],[37.72894,-25.46793],[37.72894,-25.46793],[37.72893,-25.46793],[37.72891,-25.46793],[37.72886,-25.46793],[37.72882,-25.46795],[37.72880,-25.46797],[37.72880,-25.46797],[37.72878,-25.46798],[37.72872,-25.46802],[37.72868,-25.46801],[37.72868,-25.46801],[37.72868,-25.46801],[37.72863,-25.46801],[37.72859,-25.46800],[37.72853,-25.46805],[37.72853,-25.46805],[37.72852,-25.46805],[37.72850,-25.46803],[37.72848,-25.46798],[37.72848,-25.46798],[37.72847,-25.46797],[37.72846,-25.46796],[37.72846,-25.46796],[37.72843,-25.46794],[37.72842,-25.46794],[37.72839,-25.46793],[37.72838,-25.46795],[37.72837,-25.46797],[37.72837,-25.46800],[37.72835,-25.46804],[37.72835,-25.46805],[37.72836,-25.46805],[37.72836,-25.46807],[37.72836,-25.46808],[37.72835,-25.46810],[37.72833,-25.46813],[37.72833,-25.46814],[37.72833,-25.46814],[37.72833,-25.46814],[37.72835,-25.46817],[37.72836,-25.46818],[37.72836,-25.46821],[37.72836,-25.46822],[37.72835,-25.46827],[37.72834,-25.46829],[37.72835,-25.46831],[37.72835,-25.46832],[37.72835,-25.46835],[37.72835,-25.46836],[37.72835,-25.46836],[37.72834,-25.46837],[37.72833,-25.46838],[37.72832,-25.46838],[37.72831,-25.46839],[37.72824,-25.46843],[37.72822,-25.46844],[37.72821,-25.46846],[37.72821,-25.46847],[37.72820,-25.46848],[37.72821,-25.46850],[37.72823,-25.46852],[37.72824,-25.46852],[37.72824,-25.46853],[37.72825,-25.46854],[37.72827,-25.46854],[37.72828,-25.46855],[37.72830,-25.46856],[37.72826,-25.46858],[37.72825,-25.46858],[37.72824,-25.46858],[37.72822,-25.46859],[37.72820,-25.46859],[37.72819,-25.46860],[37.72817,-25.46860],[37.72815,-25.46861],[37.72812,-25.46861],[37.72809,-25.46861],[37.72808,-25.46861],[37.72808,-25.46861],[37.72808,-25.46861],[37.72805,-25.46862],[37.72804,-25.46861],[37.72803,-25.46860],[37.72802,-25.46859],[37.72801,-25.46861],[37.72800,-25.46861],[37.72797,-25.46863],[37.72793,-25.46859],[37.72792,-25.46857],[37.72790,-25.46852],[37.72790,-25.46852],[37.72785,-25.46846],[37.72784,-25.46844],[37.72783,-25.46842],[37.72781,-25.46840],[37.72780,-25.46838],[37.72777,-25.46840],[37.72775,-25.46842],[37.72769,-25.46841],[37.72769,-25.46841],[37.72767,-25.46841],[37.72767,-25.46841],[37.72766,-25.46837],[37.72765,-25.46835],[37.72765,-25.46835],[37.72764,-25.46835],[37.72763,-25.46835],[37.72763,-25.46835],[37.72762,-25.46837],[37.72761,-25.46838],[37.72760,-25.46838],[37.72758,-25.46837],[37.72754,-25.46839],[37.72753,-25.46839],[37.72750,-25.46840],[37.72748,-25.46841],[37.72743,-25.46840],[37.72743,-25.46840],[37.72740,-25.46841],[37.72736,-25.46842],[37.72732,-25.46844],[37.72722,-25.46845],[37.72720,-25.46845],[37.72716,-25.46844],[37.72714,-25.46844],[37.72713,-25.46844],[37.72711,-25.46844],[37.72706,-25.46846],[37.72690,-25.46840],[37.72689,-25.46840],[37.72686,-25.46840],[37.72680,-25.46840],[37.72679,-25.46841],[37.72673,-25.46843],[37.72672,-25.46844],[37.72672,-25.46844],[37.72672,-25.46844],[37.72672,-25.46844],[37.72669,-25.46847],[37.72668,-25.46848],[37.72666,-25.46850],[37.72665,-25.46851],[37.72665,-25.46851],[37.72657,-25.46854],[37.72647,-25.46855],[37.72646,-25.46856],[37.72646,-25.46856],[37.72645,-25.46856],[37.72639,-25.46857],[37.72636,-25.46858],[37.72633,-25.46858],[37.72621,-25.46854],[37.72620,-25.46855],[37.72619,-25.46855],[37.72618,-25.46855],[37.72606,-25.46857],[37.72604,-25.46855],[37.72604,-25.46855],[37.72603,-25.46855],[37.72603,-25.46854],[37.72602,-25.46854],[37.72597,-25.46851],[37.72591,-25.46845],[37.72590,-25.46844],[37.72584,-25.46840],[37.72584,-25.46840],[37.72581,-25.46839],[37.72579,-25.46838],[37.72579,-25.46836],[37.72577,-25.46836],[37.72576,-25.46836],[37.72575,-25.46835],[37.72567,-25.46833],[37.72557,-25.46830],[37.72556,-25.46829],[37.72554,-25.46828],[37.72549,-25.46828],[37.72532,-25.46826],[37.72532,-25.46826],[37.72531,-25.46826],[37.72530,-25.46825],[37.72528,-25.46824],[37.72528,-25.46822],[37.72523,-25.46819],[37.72522,-25.46819],[37.72516,-25.46818],[37.72512,-25.46817],[37.72508,-25.46815],[37.72506,-25.46814],[37.72503,-25.46813],[37.72501,-25.46812],[37.72494,-25.46807],[37.72493,-25.46807],[37.72486,-25.46804],[37.72483,-25.46804],[37.72482,-25.46804],[37.72482,-25.46804],[37.72479,-25.46804],[37.72476,-25.46804],[37.72471,-25.46797],[37.72469,-25.46795],[37.72469,-25.46794],[37.72463,-25.46786],[37.72462,-25.46785],[37.72462,-25.46784],[37.72453,-25.46773],[37.72450,-25.46768],[37.72450,-25.46768],[37.72449,-25.46767],[37.72448,-25.46766],[37.72447,-25.46765],[37.72443,-25.46763],[37.72441,-25.46763],[37.72434,-25.46765],[37.72428,-25.46758],[37.72426,-25.46757],[37.72425,-25.46756],[37.72424,-25.46756],[37.72417,-25.46750],[37.72416,-25.46749],[37.72414,-25.46748],[37.72414,-25.46748],[37.72414,-25.46748],[37.72407,-25.46742],[37.72404,-25.46741],[37.72402,-25.46739],[37.72400,-25.46738],[37.72393,-25.46734],[37.72392,-25.46733],[37.72386,-25.46730],[37.72382,-25.46727],[37.72382,-25.46727],[37.72382,-25.46727],[37.72371,-25.46720],[37.72370,-25.46720],[37.72366,-25.46718],[37.72360,-25.46716],[37.72358,-25.46715],[37.72358,-25.46715],[37.72357,-25.46715],[37.72355,-25.46714],[37.72354,-25.46714],[37.72352,-25.46713],[37.72335,-25.46709],[37.72334,-25.46708],[37.72333,-25.46707],[37.72333,-25.46707],[37.72332,-25.46707],[37.72332,-25.46707],[37.72322,-25.46705],[37.72321,-25.46704],[37.72321,-25.46704],[37.72310,-25.46702],[37.72310,-25.46702],[37.72302,-25.46701],[37.72302,-25.46700],[37.72300,-25.46700],[37.72291,-25.46698],[37.72291,-25.46698],[37.72291,-25.46698],[37.72291,-25.46698],[37.72285,-25.46693],[37.72274,-25.46682],[37.72271,-25.46680],[37.72268,-25.46678],[37.72267,-25.46676],[37.72265,-25.46675],[37.72265,-25.46674],[37.72264,-25.46674],[37.72262,-25.46674],[37.72261,-25.46673],[37.72259,-25.46673],[37.72259,-25.46673],[37.72258,-25.46674],[37.72255,-25.46674],[37.72253,-25.46675],[37.72251,-25.46675],[37.72248,-25.46676],[37.72247,-25.46676],[37.72246,-25.46676],[37.72245,-25.46675],[37.72242,-25.46674],[37.72242,-25.46674],[37.72240,-25.46673],[37.72238,-25.46672],[37.72236,-25.46672],[37.72234,-25.46671],[37.72233,-25.46671],[37.72232,-25.46669],[37.72230,-25.46668],[37.72230,-25.46668],[37.72228,-25.46666],[37.72226,-25.46665],[37.72225,-25.46665],[37.72223,-25.46664],[37.72223,-25.46664],[37.72222,-25.46663],[37.72221,-25.46662],[37.72219,-25.46660],[37.72219,-25.46660],[37.72219,-25.46659],[37.72218,-25.46658],[37.72217,-25.46657],[37.72216,-25.46655],[37.72214,-25.46653],[37.72212,-25.46652],[37.72210,-25.46651],[37.72210,-25.46651],[37.72210,-25.46650],[37.72208,-25.46649],[37.72206,-25.46649],[37.72206,-25.46649],[37.72204,-25.46648],[37.72204,-25.46648],[37.72203,-25.46647],[37.72202,-25.46645],[37.72201,-25.46644],[37.72200,-25.46644],[37.72200,-25.46642],[37.72199,-25.46640],[37.72197,-25.46637],[37.72197,-25.46636],[37.72196,-25.46635],[37.72195,-25.46632],[37.72195,-25.46632],[37.72194,-25.46632],[37.72194,-25.46632],[37.72194,-25.46632],[37.72194,-25.46632],[37.72194,-25.46632],[37.72189,-25.46632],[37.72182,-25.46633],[37.72181,-25.46634],[37.72179,-25.46633],[37.72176,-25.46633],[37.72173,-25.46634],[37.72172,-25.46634],[37.72168,-25.46635],[37.72167,-25.46635],[37.72165,-25.46635],[37.72164,-25.46635],[37.72162,-25.46636],[37.72159,-25.46636],[37.72157,-25.46636],[37.72154,-25.46637],[37.72153,-25.46639],[37.72152,-25.46641],[37.72151,-25.46643],[37.72149,-25.46646],[37.72148,-25.46648],[37.72146,-25.46650],[37.72146,-25.46650],[37.72145,-25.46652],[37.72144,-25.46653],[37.72144,-25.46653],[37.72143,-25.46654],[37.72142,-25.46655],[37.72142,-25.46656],[37.72141,-25.46657],[37.72140,-25.46658],[37.72139,-25.46659],[37.72139,-25.46659],[37.72138,-25.46660],[37.72136,-25.46660],[37.72135,-25.46661],[37.72134,-25.46661],[37.72133,-25.46662],[37.72132,-25.46662],[37.72127,-25.46664],[37.72124,-25.46658],[37.72123,-25.46654],[37.72123,-25.46652],[37.72122,-25.46649],[37.72119,-25.46643],[37.72118,-25.46641],[37.72118,-25.46640],[37.72116,-25.46638],[37.72115,-25.46638],[37.72113,-25.46639],[37.72111,-25.46640],[37.72105,-25.46642],[37.72104,-25.46642],[37.72103,-25.46641],[37.72100,-25.46642],[37.72098,-25.46642],[37.72095,-25.46642],[37.72095,-25.46642],[37.72094,-25.46639],[37.72094,-25.46639],[37.72093,-25.46638],[37.72093,-25.46638],[37.72093,-25.46637],[37.72094,-25.46637],[37.72095,-25.46636],[37.72096,-25.46636],[37.72098,-25.46636],[37.72097,-25.46635],[37.72097,-25.46635],[37.72098,-25.46636],[37.72101,-25.46636],[37.72101,-25.46632],[37.72104,-25.46634],[37.72104,-25.46634],[37.72107,-25.46635],[37.72108,-25.46634],[37.72111,-25.46634],[37.72111,-25.46634],[37.72114,-25.46633],[37.72116,-25.46632],[37.72119,-25.46631],[37.72122,-25.46630],[37.72125,-25.46629],[37.72127,-25.46628],[37.72128,-25.46628],[37.72129,-25.46628],[37.72131,-25.46627],[37.72132,-25.46627],[37.72134,-25.46626],[37.72135,-25.46626],[37.72136,-25.46626],[37.72137,-25.46626],[37.72137,-25.46626],[37.72138,-25.46625],[37.72140,-25.46622],[37.72140,-25.46622],[37.72140,-25.46622],[37.72141,-25.46621],[37.72142,-25.46621],[37.72144,-25.46620],[37.72145,-25.46620],[37.72147,-25.46619],[37.72148,-25.46619],[37.72150,-25.46618],[37.72151,-25.46618],[37.72152,-25.46618],[37.72154,-25.46617],[37.72155,-25.46617],[37.72157,-25.46616],[37.72155,-25.46617],[37.72154,-25.46617],[37.72152,-25.46618],[37.72152,-25.46618],[37.72151,-25.46619],[37.72150,-25.46619],[37.72148,-25.46620],[37.72147,-25.46620],[37.72145,-25.46621],[37.72145,-25.46621],[37.72144,-25.46621],[37.72142,-25.46622],[37.72141,-25.46622],[37.72140,-25.46622],[37.72139,-25.46622],[37.72139,-25.46622],[37.72137,-25.46625],[37.72136,-25.46626],[37.72136,-25.46626],[37.72136,-25.46626],[37.72135,-25.46627],[37.72134,-25.46627],[37.72132,-25.46628],[37.72131,-25.46628],[37.72129,-25.46629],[37.72128,-25.46629],[37.72127,-25.46629],[37.72125,-25.46630],[37.72124,-25.46630],[37.72122,-25.46631],[37.72119,-25.46632],[37.72119,-25.46632],[37.72116,-25.46633],[37.72114,-25.46634],[37.72111,-25.46635],[37.72108,-25.46635],[37.72106,-25.46635],[37.72104,-25.46635],[37.72102,-25.46634],[37.72101,-25.46634],[37.72100,-25.46633],[37.72100,-25.46633],[37.72098,-25.46632],[37.72096,-25.46631],[37.72096,-25.46630],[37.72096,-25.46631],[37.72095,-25.46631],[37.72092,-25.46631],[37.72086,-25.46630],[37.72080,-25.46628],[37.72075,-25.46628],[37.72068,-25.46627],[37.72063,-25.46629],[37.72061,-25.46630],[37.72057,-25.46631],[37.72053,-25.46632],[37.72049,-25.46635],[37.72038,-25.46641],[37.72029,-25.46645],[37.72021,-25.46650],[37.72016,-25.46652],[37.72013,-25.46652],[37.72008,-25.46653],[37.71994,-25.46651],[37.71983,-25.46650],[37.71965,-25.46647],[37.71955,-25.46647],[37.71948,-25.46647],[37.71946,-25.46647],[37.71932,-25.46646],[37.71927,-25.46646],[37.71923,-25.46648],[37.71919,-25.46650],[37.71914,-25.46652],[37.71909,-25.46652],[37.71901,-25.46652],[37.71893,-25.46651],[37.71889,-25.46653],[37.71889,-25.46655],[37.71892,-25.46662],[37.71897,-25.46669],[37.71897,-25.46673],[37.71889,-25.46679],[37.71890,-25.46678],[37.71893,-25.46675],[37.71897,-25.46673],[37.71896,-25.46668],[37.71893,-25.46664],[37.71888,-25.46654],[37.71882,-25.46650],[37.71875,-25.46645],[37.71870,-25.46646],[37.71867,-25.46650]];
const PROFILE_D4_PR39 = [[0.000,197],[0.005,196],[0.012,196],[0.021,195],[0.026,195],[0.026,194],[0.027,194],[0.030,193],[0.036,193],[0.037,193],[0.039,193],[0.041,193],[0.042,193],[0.045,193],[0.047,193],[0.049,193],[0.050,193],[0.054,193],[0.055,193],[0.055,193],[0.056,193],[0.056,193],[0.057,193],[0.057,193],[0.060,192],[0.060,192],[0.061,192],[0.064,192],[0.064,192],[0.065,192],[0.065,192],[0.066,192],[0.068,192],[0.074,192],[0.077,192],[0.081,192],[0.087,191],[0.089,191],[0.090,191],[0.090,191],[0.091,192],[0.098,192],[0.101,192],[0.102,192],[0.102,192],[0.103,192],[0.108,192],[0.109,192],[0.123,192],[0.125,193],[0.127,194],[0.131,195],[0.132,196],[0.134,196],[0.135,196],[0.138,196],[0.142,196],[0.144,196],[0.149,196],[0.150,196],[0.151,196],[0.153,196],[0.154,196],[0.163,196],[0.163,196],[0.165,196],[0.168,196],[0.168,196],[0.169,196],[0.170,195],[0.171,195],[0.174,195],[0.177,195],[0.181,194],[0.183,194],[0.184,194],[0.186,194],[0.189,194],[0.191,194],[0.193,194],[0.194,194],[0.200,194],[0.206,193],[0.213,192],[0.218,191],[0.221,190],[0.225,190],[0.225,190],[0.232,190],[0.239,190],[0.250,190],[0.251,190],[0.251,190],[0.253,190],[0.258,190],[0.260,190],[0.263,190],[0.264,190],[0.265,190],[0.274,190],[0.276,190],[0.282,189],[0.283,188],[0.285,186],[0.288,184],[0.295,182],[0.297,181],[0.299,180],[0.300,179],[0.305,175],[0.306,173],[0.310,171],[0.317,169],[0.317,168],[0.319,167],[0.325,166],[0.327,166],[0.329,165],[0.330,164],[0.331,164],[0.333,164],[0.335,163],[0.338,163],[0.339,163],[0.344,163],[0.349,162],[0.352,162],[0.358,161],[0.359,161],[0.362,159],[0.364,158],[0.366,157],[0.366,157],[0.368,157],[0.370,156],[0.373,156],[0.374,156],[0.376,155],[0.376,155],[0.380,154],[0.388,153],[0.396,150],[0.396,150],[0.399,150],[0.403,150],[0.405,150],[0.406,149],[0.408,147],[0.409,146],[0.414,144],[0.414,144],[0.414,144],[0.414,144],[0.414,144],[0.419,143],[0.419,143],[0.423,142],[0.424,140],[0.424,140],[0.429,140],[0.429,140],[0.432,140],[0.435,140],[0.436,140],[0.438,140],[0.439,140],[0.439,140],[0.445,141],[0.446,142],[0.448,142],[0.451,142],[0.451,142],[0.452,142],[0.454,142],[0.454,142],[0.456,142],[0.457,142],[0.459,142],[0.460,142],[0.462,141],[0.464,141],[0.466,140],[0.467,140],[0.467,140],[0.468,140],[0.469,140],[0.471,140],[0.473,140],[0.475,140],[0.476,140],[0.478,140],[0.479,140],[0.481,140],[0.483,140],[0.484,140],[0.486,140],[0.488,140],[0.489,140],[0.490,140],[0.491,140],[0.493,140],[0.494,140],[0.496,140],[0.496,140],[0.497,140],[0.499,140],[0.500,140],[0.502,140],[0.506,140],[0.507,140],[0.512,140],[0.513,140],[0.514,140],[0.515,140],[0.518,140],[0.519,140],[0.521,140],[0.521,140],[0.523,140],[0.526,140],[0.526,140],[0.526,140],[0.526,140],[0.529,140],[0.534,140],[0.539,140],[0.542,140],[0.543,140],[0.544,140],[0.551,140],[0.557,140],[0.557,140],[0.557,140],[0.562,140],[0.567,140],[0.575,140],[0.575,139],[0.576,139],[0.579,139],[0.584,139],[0.584,138],[0.585,138],[0.586,138],[0.586,137],[0.590,132],[0.592,130],[0.595,130],[0.597,130],[0.599,130],[0.601,130],[0.605,130],[0.606,130],[0.607,130],[0.608,130],[0.609,130],[0.611,130],[0.614,130],[0.615,130],[0.615,130],[0.615,130],[0.619,131],[0.621,133],[0.623,134],[0.624,135],[0.628,140],[0.630,141],[0.632,141],[0.633,141],[0.636,143],[0.637,148],[0.637,149],[0.639,150],[0.640,150],[0.640,150],[0.642,150],[0.650,150],[0.653,151],[0.655,151],[0.656,150],[0.657,150],[0.659,149],[0.662,149],[0.662,146],[0.663,144],[0.665,143],[0.667,142],[0.668,142],[0.670,142],[0.675,141],[0.676,141],[0.677,141],[0.679,141],[0.682,141],[0.683,141],[0.685,141],[0.688,141],[0.690,139],[0.694,137],[0.695,135],[0.695,134],[0.696,133],[0.699,130],[0.700,128],[0.701,126],[0.702,124],[0.704,122],[0.706,120],[0.709,120],[0.715,120],[0.717,120],[0.721,120],[0.722,120],[0.729,120],[0.731,120],[0.733,120],[0.736,120],[0.738,118],[0.742,116],[0.744,115],[0.751,114],[0.751,114],[0.752,113],[0.753,113],[0.757,112],[0.758,112],[0.759,111],[0.760,110],[0.760,110],[0.761,110],[0.763,110],[0.764,110],[0.765,110],[0.767,110],[0.773,110],[0.774,110],[0.777,110],[0.779,110],[0.785,110],[0.785,110],[0.788,110],[0.793,110],[0.798,110],[0.809,110],[0.811,110],[0.816,110],[0.818,110],[0.819,110],[0.821,110],[0.827,110],[0.846,110],[0.847,110],[0.851,110],[0.857,109],[0.859,107],[0.866,105],[0.866,103],[0.866,103],[0.867,103],[0.867,101],[0.871,100],[0.873,100],[0.875,100],[0.877,100],[0.877,100],[0.886,100],[0.897,100],[0.898,100],[0.899,100],[0.899,100],[0.906,100],[0.910,100],[0.912,100],[0.926,100],[0.928,100],[0.929,100],[0.930,100],[0.944,100],[0.946,100],[0.946,100],[0.947,100],[0.947,100],[0.949,100],[0.955,100],[0.963,100],[0.965,100],[0.971,100],[0.972,100],[0.975,100],[0.978,100],[0.979,100],[0.981,100],[0.982,99],[0.983,98],[0.993,98],[1.003,98],[1.005,98],[1.008,97],[1.013,97],[1.032,97],[1.032,97],[1.033,97],[1.035,97],[1.037,97],[1.038,97],[1.044,97],[1.045,97],[1.052,97],[1.056,97],[1.061,97],[1.063,97],[1.067,97],[1.070,97],[1.079,97],[1.080,97],[1.087,98],[1.091,98],[1.092,98],[1.092,98],[1.095,99],[1.099,100],[1.107,100],[1.110,100],[1.111,100],[1.120,100],[1.122,100],[1.122,99],[1.136,96],[1.141,96],[1.142,94],[1.144,92],[1.144,91],[1.146,90],[1.151,90],[1.153,90],[1.161,90],[1.170,90],[1.172,90],[1.173,90],[1.174,91],[1.184,91],[1.186,91],[1.187,91],[1.188,91],[1.188,91],[1.197,90],[1.200,90],[1.203,90],[1.205,90],[1.214,89],[1.215,89],[1.223,89],[1.228,89],[1.228,89],[1.228,89],[1.242,90],[1.243,90],[1.248,90],[1.254,90],[1.257,90],[1.257,90],[1.258,91],[1.261,92],[1.261,92],[1.264,92],[1.282,92],[1.285,92],[1.285,92],[1.286,92],[1.287,92],[1.287,91],[1.298,89],[1.299,90],[1.300,90],[1.312,90],[1.312,90],[1.321,90],[1.321,90],[1.324,90],[1.333,90],[1.333,90],[1.334,90],[1.334,90],[1.342,89],[1.357,89],[1.361,89],[1.364,80],[1.367,80],[1.369,80],[1.370,80],[1.370,80],[1.372,80],[1.374,80],[1.375,80],[1.375,80],[1.377,80],[1.380,80],[1.382,80],[1.385,80],[1.388,80],[1.390,80],[1.391,80],[1.392,80],[1.395,80],[1.395,80],[1.398,80],[1.400,80],[1.402,80],[1.405,80],[1.406,80],[1.408,80],[1.409,80],[1.410,80],[1.413,80],[1.415,80],[1.416,80],[1.418,80],[1.419,80],[1.420,80],[1.421,80],[1.424,80],[1.424,80],[1.425,80],[1.427,80],[1.427,80],[1.430,80],[1.432,80],[1.435,80],[1.437,80],[1.437,80],[1.438,80],[1.440,80],[1.442,80],[1.442,80],[1.444,80],[1.444,80],[1.445,80],[1.447,78],[1.449,77],[1.450,77],[1.451,77],[1.453,77],[1.457,77],[1.458,77],[1.459,77],[1.462,77],[1.462,77],[1.462,77],[1.462,76],[1.462,76],[1.463,76],[1.463,76],[1.468,73],[1.476,70],[1.477,70],[1.480,70],[1.482,70],[1.486,70],[1.487,70],[1.492,70],[1.493,70],[1.495,69],[1.496,68],[1.498,67],[1.501,67],[1.504,66],[1.507,66],[1.509,66],[1.511,65],[1.513,64],[1.516,63],[1.519,63],[1.521,63],[1.522,63],[1.524,63],[1.525,63],[1.525,63],[1.526,63],[1.528,63],[1.529,63],[1.530,63],[1.532,63],[1.533,63],[1.533,64],[1.535,64],[1.536,64],[1.537,64],[1.538,64],[1.540,64],[1.541,64],[1.546,64],[1.552,64],[1.556,64],[1.558,64],[1.561,64],[1.567,62],[1.569,60],[1.571,60],[1.573,60],[1.574,60],[1.576,60],[1.578,60],[1.586,60],[1.586,60],[1.588,60],[1.592,60],[1.594,60],[1.597,60],[1.597,60],[1.600,59],[1.600,59],[1.600,58],[1.601,56],[1.602,55],[1.604,54],[1.605,54],[1.606,53],[1.608,53],[1.609,54],[1.609,54],[1.610,54],[1.613,54],[1.617,54],[1.619,54],[1.620,54],[1.623,54],[1.624,54],[1.628,54],[1.628,54],[1.631,56],[1.634,59],[1.637,60],[1.641,60],[1.644,60],[1.646,60],[1.647,60],[1.648,60],[1.651,60],[1.652,60],[1.655,60],[1.656,60],[1.657,60],[1.657,60],[1.658,60],[1.659,60],[1.662,60],[1.662,60],[1.663,60],[1.663,60],[1.664,60],[1.667,60],[1.668,60],[1.671,60],[1.672,60],[1.675,60],[1.675,60],[1.676,60],[1.679,60],[1.679,60],[1.682,60],[1.684,60],[1.685,60],[1.687,60],[1.687,60],[1.688,60],[1.689,60],[1.691,60],[1.692,60],[1.695,60],[1.695,60],[1.696,60],[1.699,60],[1.700,60],[1.701,60],[1.702,60],[1.702,60],[1.705,60],[1.706,60],[1.707,60],[1.707,60],[1.708,60],[1.709,60],[1.712,60],[1.713,60],[1.716,60],[1.716,60],[1.717,60],[1.719,60],[1.720,60],[1.723,60],[1.727,60],[1.727,60],[1.730,60],[1.733,60],[1.736,60],[1.739,60],[1.741,60],[1.744,60],[1.746,60],[1.747,60],[1.748,60],[1.749,60],[1.751,60],[1.753,60],[1.753,60],[1.753,60],[1.754,59],[1.758,59],[1.764,59],[1.771,59],[1.777,58],[1.785,56],[1.791,54],[1.793,53],[1.798,52],[1.802,52],[1.807,51],[1.820,50],[1.831,50],[1.841,50],[1.847,50],[1.850,50],[1.856,51],[1.871,51],[1.884,50],[1.904,47],[1.915,47],[1.922,47],[1.926,47],[1.941,46],[1.946,45],[1.951,45],[1.956,44],[1.962,43],[1.968,43],[1.976,43],[1.986,42],[1.990,38],[1.992,38],[1.999,37],[2.007,37],[2.010,36],[2.020,31],[2.022,31],[2.026,31],[2.031,31],[2.035,31],[2.040,33],[2.050,33],[2.058,35],[2.067,37],[2.073,37],[2.078,37]];

const TRACK_D4_PRC29 = [[37.79787,-25.48710],[37.79784,-25.48737],[37.79801,-25.48759],[37.79807,-25.48767],[37.79811,-25.48774],[37.79817,-25.48781],[37.79821,-25.48789],[37.79822,-25.48800],[37.79820,-25.48811],[37.79818,-25.48823],[37.79813,-25.48829],[37.79810,-25.48833],[37.79805,-25.48836],[37.79797,-25.48843],[37.79793,-25.48851],[37.79789,-25.48882],[37.79789,-25.48905],[37.79792,-25.48923],[37.79801,-25.48944],[37.79816,-25.48973],[37.79825,-25.48992],[37.79835,-25.49016],[37.79836,-25.49019],[37.79836,-25.49026],[37.79834,-25.49032],[37.79830,-25.49039],[37.79823,-25.49043],[37.79817,-25.49043],[37.79812,-25.49040],[37.79806,-25.49036],[37.79793,-25.49023],[37.79785,-25.49016],[37.79764,-25.48995],[37.79747,-25.48977],[37.79736,-25.48967],[37.79720,-25.48952],[37.79707,-25.48938],[37.79688,-25.48920],[37.79673,-25.48905],[37.79655,-25.48888],[37.79642,-25.48875],[37.79627,-25.48860],[37.79604,-25.48838],[37.79574,-25.48808],[37.79554,-25.48788],[37.79539,-25.48773],[37.79515,-25.48750],[37.79498,-25.48733],[37.79480,-25.48716],[37.79459,-25.48695],[37.79442,-25.48678],[37.79429,-25.48664],[37.79413,-25.48646],[37.79402,-25.48634],[37.79398,-25.48631],[37.79398,-25.48631],[37.79396,-25.48625],[37.79395,-25.48623],[37.79393,-25.48607],[37.79390,-25.48585],[37.79388,-25.48577],[37.79383,-25.48555],[37.79381,-25.48540],[37.79377,-25.48522],[37.79367,-25.48515],[37.79360,-25.48508],[37.79356,-25.48504],[37.79341,-25.48497],[37.79324,-25.48492],[37.79301,-25.48492],[37.79272,-25.48492],[37.79264,-25.48490],[37.79252,-25.48474],[37.79211,-25.48417],[37.79202,-25.48405],[37.79198,-25.48402],[37.79180,-25.48388],[37.79162,-25.48373],[37.79149,-25.48363],[37.79125,-25.48345],[37.79116,-25.48330],[37.79109,-25.48318],[37.79106,-25.48312],[37.79086,-25.48294],[37.79070,-25.48279],[37.79056,-25.48266],[37.79039,-25.48251],[37.79033,-25.48250],[37.79003,-25.48245],[37.78987,-25.48235],[37.78974,-25.48223],[37.78972,-25.48206],[37.78972,-25.48188],[37.78970,-25.48170],[37.78965,-25.48148],[37.78961,-25.48135],[37.78960,-25.48130],[37.78955,-25.48126],[37.78951,-25.48118],[37.78943,-25.48101],[37.78943,-25.48101],[37.78951,-25.48118],[37.78955,-25.48126],[37.78960,-25.48130],[37.78961,-25.48135],[37.78965,-25.48148],[37.78970,-25.48170],[37.78972,-25.48188],[37.78972,-25.48206],[37.78974,-25.48223],[37.78987,-25.48235],[37.79003,-25.48245],[37.79033,-25.48250],[37.79039,-25.48251],[37.79056,-25.48266],[37.79070,-25.48279],[37.79086,-25.48294],[37.79106,-25.48312],[37.79109,-25.48318],[37.79116,-25.48330],[37.79125,-25.48345],[37.79149,-25.48363],[37.79162,-25.48373],[37.79180,-25.48388],[37.79198,-25.48402],[37.79202,-25.48405],[37.79211,-25.48417],[37.79252,-25.48474],[37.79264,-25.48490],[37.79272,-25.48492],[37.79301,-25.48492],[37.79324,-25.48492],[37.79341,-25.48497],[37.79356,-25.48504],[37.79360,-25.48508],[37.79367,-25.48515],[37.79377,-25.48522],[37.79381,-25.48540],[37.79383,-25.48555],[37.79388,-25.48577],[37.79390,-25.48585],[37.79393,-25.48607],[37.79395,-25.48623],[37.79396,-25.48625],[37.79398,-25.48631],[37.79398,-25.48631],[37.79390,-25.48635],[37.79389,-25.48646],[37.79390,-25.48662],[37.79395,-25.48683],[37.79399,-25.48695],[37.79408,-25.48717],[37.79424,-25.48747],[37.79435,-25.48766],[37.79442,-25.48780],[37.79464,-25.48832],[37.79477,-25.48856],[37.79485,-25.48871],[37.79492,-25.48887],[37.79500,-25.48901],[37.79508,-25.48924],[37.79516,-25.48946],[37.79527,-25.48965],[37.79533,-25.48976],[37.79542,-25.48989],[37.79552,-25.49000],[37.79561,-25.49011],[37.79571,-25.49024],[37.79582,-25.49036],[37.79596,-25.49053],[37.79614,-25.49075],[37.79623,-25.49084],[37.79633,-25.49097],[37.79642,-25.49111],[37.79642,-25.49123],[37.79642,-25.49133],[37.79640,-25.49139],[37.79634,-25.49151],[37.79631,-25.49156],[37.79622,-25.49159],[37.79616,-25.49160],[37.79610,-25.49152],[37.79605,-25.49143],[37.79600,-25.49135],[37.79593,-25.49123],[37.79586,-25.49115],[37.79579,-25.49106],[37.79570,-25.49097],[37.79558,-25.49093],[37.79548,-25.49094],[37.79536,-25.49094],[37.79525,-25.49094],[37.79518,-25.49095],[37.79515,-25.49099],[37.79513,-25.49108],[37.79526,-25.49115],[37.79532,-25.49123],[37.79546,-25.49129],[37.79559,-25.49140],[37.79567,-25.49148],[37.79577,-25.49165],[37.79584,-25.49173],[37.79585,-25.49180],[37.79584,-25.49187],[37.79581,-25.49196],[37.79575,-25.49193],[37.79570,-25.49188],[37.79561,-25.49177],[37.79551,-25.49173],[37.79539,-25.49168],[37.79526,-25.49163],[37.79519,-25.49165],[37.79513,-25.49171],[37.79506,-25.49178],[37.79506,-25.49201],[37.79507,-25.49210],[37.79522,-25.49210],[37.79528,-25.49221],[37.79545,-25.49224],[37.79555,-25.49230],[37.79568,-25.49244],[37.79576,-25.49258],[37.79575,-25.49276],[37.79579,-25.49276],[37.79580,-25.49272],[37.79583,-25.49276],[37.79583,-25.49281],[37.79579,-25.49294],[37.79578,-25.49305],[37.79586,-25.49327],[37.79600,-25.49347],[37.79593,-25.49355],[37.79591,-25.49376],[37.79592,-25.49391],[37.79599,-25.49402],[37.79605,-25.49415],[37.79613,-25.49435],[37.79618,-25.49460],[37.79623,-25.49471],[37.79617,-25.49482],[37.79605,-25.49506],[37.79597,-25.49523],[37.79589,-25.49531],[37.79581,-25.49531],[37.79565,-25.49532],[37.79558,-25.49536],[37.79557,-25.49550],[37.79554,-25.49574],[37.79553,-25.49591],[37.79575,-25.49620],[37.79585,-25.49631],[37.79604,-25.49669],[37.79618,-25.49699],[37.79631,-25.49711],[37.79642,-25.49724],[37.79648,-25.49731],[37.79649,-25.49739],[37.79640,-25.49746],[37.79577,-25.49736],[37.79561,-25.49729],[37.79558,-25.49740],[37.79576,-25.49769],[37.79584,-25.49780],[37.79594,-25.49792],[37.79603,-25.49803],[37.79607,-25.49813],[37.79615,-25.49828],[37.79622,-25.49847],[37.79625,-25.49857],[37.79629,-25.49876],[37.79632,-25.49900],[37.79636,-25.49909],[37.79639,-25.49916],[37.79649,-25.49935],[37.79661,-25.49954],[37.79669,-25.49969],[37.79677,-25.49987],[37.79684,-25.50002],[37.79695,-25.50009],[37.79704,-25.50018],[37.79719,-25.50032],[37.79726,-25.50040],[37.79734,-25.50056],[37.79734,-25.50076],[37.79736,-25.50095],[37.79739,-25.50107],[37.79745,-25.50121],[37.79749,-25.50131],[37.79754,-25.50138],[37.79767,-25.50144],[37.79772,-25.50143],[37.79779,-25.50139],[37.79786,-25.50133],[37.79798,-25.50125],[37.79808,-25.50119],[37.79824,-25.50114],[37.79843,-25.50111],[37.79856,-25.50106],[37.79868,-25.50103],[37.79881,-25.50104],[37.79892,-25.50111],[37.79900,-25.50120],[37.79907,-25.50135],[37.79913,-25.50150],[37.79940,-25.50182],[37.79975,-25.50218],[37.80028,-25.50260],[37.80063,-25.50282],[37.80110,-25.50314],[37.80139,-25.50335],[37.80153,-25.50351],[37.80166,-25.50375],[37.80172,-25.50392],[37.80185,-25.50413],[37.80201,-25.50434],[37.80219,-25.50440],[37.80248,-25.50449],[37.80277,-25.50446],[37.80293,-25.50445],[37.80314,-25.50449],[37.80341,-25.50457],[37.80355,-25.50465],[37.80361,-25.50461],[37.80368,-25.50448],[37.80385,-25.50410],[37.80388,-25.50404],[37.80400,-25.50392],[37.80421,-25.50379],[37.80426,-25.50374],[37.80428,-25.50363],[37.80427,-25.50350],[37.80426,-25.50338],[37.80427,-25.50320],[37.80428,-25.50307],[37.80426,-25.50297],[37.80407,-25.50267],[37.80391,-25.50223],[37.80391,-25.50214],[37.80393,-25.50209],[37.80403,-25.50195],[37.80438,-25.50152],[37.80456,-25.50133],[37.80467,-25.50126],[37.80474,-25.50125],[37.80485,-25.50129],[37.80488,-25.50131],[37.80495,-25.50142],[37.80512,-25.50178],[37.80518,-25.50183],[37.80531,-25.50191],[37.80568,-25.50207],[37.80592,-25.50215],[37.80604,-25.50215],[37.80635,-25.50213],[37.80650,-25.50207],[37.80661,-25.50200],[37.80666,-25.50201],[37.80675,-25.50201],[37.80684,-25.50197],[37.80691,-25.50190],[37.80679,-25.50175],[37.80652,-25.50143],[37.80635,-25.50125],[37.80621,-25.50117],[37.80609,-25.50111],[37.80605,-25.50105],[37.80612,-25.50089],[37.80624,-25.50059],[37.80640,-25.49994],[37.80643,-25.49950],[37.80645,-25.49912],[37.80649,-25.49880],[37.80664,-25.49834],[37.80664,-25.49829],[37.80662,-25.49823],[37.80658,-25.49809],[37.80658,-25.49801],[37.80664,-25.49781],[37.80667,-25.49769],[37.80669,-25.49751],[37.80670,-25.49709],[37.80674,-25.49679],[37.80676,-25.49633],[37.80679,-25.49607],[37.80681,-25.49592],[37.80702,-25.49516],[37.80723,-25.49481],[37.80725,-25.49475],[37.80733,-25.49438],[37.80736,-25.49431],[37.80741,-25.49419],[37.80743,-25.49413],[37.80743,-25.49399],[37.80743,-25.49393],[37.80733,-25.49386],[37.80689,-25.49364],[37.80627,-25.49333],[37.80581,-25.49310],[37.80564,-25.49299],[37.80557,-25.49289],[37.80545,-25.49265],[37.80508,-25.49197],[37.80505,-25.49192],[37.80492,-25.49178],[37.80471,-25.49158],[37.80456,-25.49145],[37.80444,-25.49137],[37.80422,-25.49120],[37.80393,-25.49099],[37.80368,-25.49080],[37.80329,-25.49051],[37.80293,-25.49026],[37.80279,-25.49016],[37.80256,-25.49010],[37.80235,-25.49005],[37.80184,-25.49008],[37.80126,-25.49009],[37.80064,-25.49006],[37.80001,-25.49000],[37.79992,-25.48999],[37.79969,-25.48995],[37.79930,-25.48986],[37.79903,-25.48975],[37.79875,-25.48952],[37.79860,-25.48935],[37.79845,-25.48907],[37.79837,-25.48875],[37.79835,-25.48861],[37.79837,-25.48845],[37.79836,-25.48832],[37.79831,-25.48813],[37.79824,-25.48795],[37.79821,-25.48789]];
const PROFILE_D4_PRC29 = [[0.000,247],[0.024,246],[0.051,246],[0.060,246],[0.068,246],[0.077,247],[0.085,247],[0.095,245],[0.105,245],[0.116,244],[0.124,244],[0.128,244],[0.135,245],[0.145,247],[0.153,247],[0.180,247],[0.201,248],[0.217,249],[0.238,252],[0.268,254],[0.288,254],[0.312,255],[0.314,255],[0.320,256],[0.326,256],[0.334,257],[0.342,257],[0.348,257],[0.355,257],[0.362,257],[0.381,259],[0.392,259],[0.421,262],[0.446,264],[0.461,265],[0.483,266],[0.502,268],[0.529,270],[0.550,271],[0.575,274],[0.593,275],[0.615,277],[0.647,278],[0.689,280],[0.718,282],[0.739,283],[0.772,286],[0.797,289],[0.821,290],[0.851,291],[0.875,295],[0.894,297],[0.918,299],[0.934,300],[0.939,301],[0.939,301],[0.945,301],[0.947,301],[0.961,301],[0.981,301],[0.988,301],[1.008,302],[1.022,304],[1.038,307],[1.051,309],[1.061,310],[1.067,311],[1.085,311],[1.104,312],[1.130,313],[1.162,313],[1.171,314],[1.190,322],[1.258,318],[1.273,317],[1.278,316],[1.301,314],[1.325,315],[1.342,315],[1.373,313],[1.390,310],[1.403,313],[1.409,316],[1.436,309],[1.459,308],[1.478,310],[1.501,314],[1.507,314],[1.541,309],[1.561,309],[1.579,306],[1.595,306],[1.610,308],[1.626,310],[1.646,314],[1.658,316],[1.663,318],[1.669,318],[1.677,319],[1.695,321],[1.695,321],[1.712,319],[1.720,318],[1.726,318],[1.731,316],[1.743,314],[1.763,310],[1.779,308],[1.795,306],[1.810,306],[1.828,309],[1.848,309],[1.882,314],[1.888,314],[1.911,310],[1.930,308],[1.953,309],[1.980,316],[1.986,313],[1.999,310],[2.016,313],[2.047,315],[2.064,315],[2.088,314],[2.111,316],[2.116,317],[2.131,318],[2.199,322],[2.219,314],[2.227,313],[2.259,313],[2.285,312],[2.304,311],[2.322,311],[2.328,310],[2.338,309],[2.351,307],[2.367,304],[2.381,302],[2.401,301],[2.408,301],[2.428,301],[2.442,301],[2.444,301],[2.450,301],[2.450,301],[2.460,302],[2.469,301],[2.483,300],[2.502,300],[2.514,301],[2.536,300],[2.567,298],[2.588,295],[2.602,295],[2.655,293],[2.680,290],[2.696,286],[2.712,282],[2.727,281],[2.749,277],[2.771,275],[2.791,277],[2.803,276],[2.818,274],[2.833,272],[2.846,271],[2.863,270],[2.878,270],[2.900,269],[2.928,267],[2.941,266],[2.957,266],[2.972,267],[2.983,266],[2.992,265],[2.998,265],[3.010,265],[3.016,264],[3.026,263],[3.034,262],[3.043,262],[3.053,261],[3.061,261],[3.075,262],[3.085,262],[3.096,261],[3.109,259],[3.123,255],[3.133,254],[3.147,253],[3.159,253],[3.168,253],[3.172,253],[3.180,251],[3.196,250],[3.205,249],[3.222,250],[3.239,251],[3.250,251],[3.270,248],[3.280,249],[3.286,248],[3.292,247],[3.301,242],[3.308,239],[3.315,237],[3.330,237],[3.341,234],[3.355,233],[3.370,232],[3.378,231],[3.387,227],[3.397,224],[3.417,214],[3.425,211],[3.442,210],[3.453,206],[3.472,209],[3.485,211],[3.504,212],[3.519,209],[3.534,207],[3.539,207],[3.542,207],[3.546,206],[3.551,206],[3.563,204],[3.573,203],[3.594,203],[3.617,209],[3.628,208],[3.646,211],[3.660,213],[3.672,210],[3.685,206],[3.705,191],[3.728,176],[3.739,172],[3.751,169],[3.776,169],[3.793,170],[3.805,170],[3.814,172],[3.832,178],[3.839,179],[3.851,173],[3.873,169],[3.888,168],[3.923,168],[3.938,167],[3.978,169],[4.009,173],[4.026,177],[4.043,181],[4.052,183],[4.059,185],[4.071,190],[4.141,208],[4.161,210],[4.171,217],[4.204,224],[4.217,225],[4.232,226],[4.246,228],[4.256,228],[4.272,224],[4.290,222],[4.300,221],[4.317,222],[4.339,222],[4.348,222],[4.355,222],[4.374,222],[4.396,221],[4.412,219],[4.430,217],[4.445,214],[4.459,212],[4.472,209],[4.492,200],[4.503,200],[4.519,199],[4.536,196],[4.553,191],[4.564,188],[4.578,186],[4.589,184],[4.597,183],[4.612,186],[4.617,185],[4.626,183],[4.636,186],[4.651,186],[4.663,185],[4.682,184],[4.702,184],[4.718,186],[4.731,185],[4.746,185],[4.759,185],[4.772,185],[4.786,185],[4.801,185],[4.843,183],[4.893,181],[4.962,175],[5.005,171],[5.065,166],[5.102,163],[5.123,162],[5.148,160],[5.165,157],[5.188,155],[5.214,154],[5.235,152],[5.268,149],[5.301,146],[5.318,145],[5.342,146],[5.372,147],[5.390,147],[5.397,148],[5.411,150],[5.449,154],[5.455,154],[5.473,155],[5.498,153],[5.505,152],[5.515,150],[5.527,149],[5.538,149],[5.554,147],[5.565,147],[5.574,145],[5.608,144],[5.650,136],[5.658,134],[5.663,133],[5.679,129],[5.733,121],[5.760,121],[5.774,123],[5.782,123],[5.794,124],[5.798,124],[5.810,123],[5.847,126],[5.856,126],[5.871,128],[5.915,134],[5.942,135],[5.956,137],[5.991,139],[6.008,142],[6.021,144],[6.027,144],[6.038,142],[6.048,141],[6.057,140],[6.076,143],[6.117,149],[6.141,152],[6.159,152],[6.173,152],[6.180,153],[6.195,154],[6.226,154],[6.285,152],[6.324,153],[6.358,153],[6.386,153],[6.429,153],[6.434,153],[6.440,154],[6.453,155],[6.460,156],[6.478,156],[6.489,156],[6.506,157],[6.542,158],[6.569,159],[6.610,159],[6.632,158],[6.647,156],[6.717,158],[6.755,160],[6.761,161],[6.795,166],[6.802,167],[6.814,167],[6.820,168],[6.832,169],[6.837,170],[6.850,173],[6.903,174],[6.977,177],[7.032,177],[7.053,176],[7.065,174],[7.089,174],[7.162,182],[7.167,182],[7.187,185],[7.215,190],[7.236,189],[7.251,189],[7.280,191],[7.317,195],[7.349,192],[7.400,194],[7.445,198],[7.463,201],[7.489,203],[7.513,204],[7.569,211],[7.634,217],[7.703,210],[7.774,216],[7.784,218],[7.809,222],[7.853,225],[7.885,224],[7.922,230],[7.944,233],[7.975,239],[8.003,241],[8.016,241],[8.031,242],[8.042,242],[8.059,243],[8.077,246],[8.084,247]];

const TRACK_D4_LOMBADAS = [[37.77607,-25.45985],[37.77613,-25.45961],[37.77620,-25.45950],[37.77625,-25.45945],[37.77631,-25.45943],[37.77637,-25.45944],[37.77652,-25.45953],[37.77665,-25.45962],[37.77699,-25.45983],[37.77717,-25.45988],[37.77728,-25.45994],[37.77738,-25.46004],[37.77746,-25.46017],[37.77756,-25.46029],[37.77776,-25.46048],[37.77784,-25.46061],[37.77788,-25.46076],[37.77790,-25.46090],[37.77793,-25.46098],[37.77796,-25.46106],[37.77802,-25.46110],[37.77823,-25.46119],[37.77844,-25.46128],[37.77866,-25.46141],[37.77870,-25.46141],[37.77871,-25.46142],[37.77872,-25.46154],[37.77877,-25.46158],[37.77891,-25.46136],[37.77926,-25.46092],[37.77919,-25.46075],[37.77930,-25.46065],[37.77939,-25.46077],[37.77956,-25.46071],[37.77982,-25.46048],[37.78000,-25.46038],[37.78010,-25.46048],[37.78024,-25.46066],[37.78024,-25.46101],[37.78010,-25.46128],[37.78002,-25.46156],[37.77995,-25.46184],[37.77993,-25.46231],[37.77989,-25.46234],[37.77979,-25.46244],[37.77971,-25.46248],[37.77964,-25.46244],[37.77959,-25.46237],[37.77954,-25.46235],[37.77950,-25.46235],[37.77944,-25.46233],[37.77940,-25.46234],[37.77936,-25.46228],[37.77930,-25.46225],[37.77926,-25.46215],[37.77930,-25.46225],[37.77936,-25.46228],[37.77940,-25.46234],[37.77944,-25.46233],[37.77950,-25.46235],[37.77954,-25.46235],[37.77959,-25.46237],[37.77964,-25.46244],[37.77971,-25.46248],[37.77979,-25.46244],[37.77988,-25.46235],[37.77993,-25.46231],[37.77995,-25.46184],[37.78002,-25.46156],[37.78010,-25.46128],[37.78024,-25.46101],[37.78024,-25.46066],[37.78010,-25.46048],[37.78000,-25.46038],[37.77982,-25.46048],[37.77956,-25.46071],[37.77939,-25.46077],[37.77930,-25.46065],[37.77919,-25.46075],[37.77926,-25.46092],[37.77891,-25.46136],[37.77877,-25.46158],[37.77872,-25.46154],[37.77871,-25.46142],[37.77866,-25.46141],[37.77844,-25.46128],[37.77823,-25.46119],[37.77802,-25.46110],[37.77796,-25.46106],[37.77793,-25.46098],[37.77790,-25.46090],[37.77788,-25.46076],[37.77784,-25.46061],[37.77776,-25.46048],[37.77756,-25.46029],[37.77746,-25.46017],[37.77738,-25.46004],[37.77728,-25.45994],[37.77717,-25.45988],[37.77699,-25.45983],[37.77665,-25.45962],[37.77652,-25.45953],[37.77637,-25.45944],[37.77631,-25.45943],[37.77625,-25.45945],[37.77620,-25.45950],[37.77613,-25.45961],[37.77607,-25.45985]];
const PROFILE_D4_LOMBADAS = [[0.000,565],[0.022,567],[0.034,568],[0.041,569],[0.048,568],[0.055,568],[0.073,565],[0.090,566],[0.132,571],[0.153,579],[0.166,585],[0.180,588],[0.194,588],[0.210,589],[0.238,596],[0.252,595],[0.266,591],[0.278,585],[0.286,582],[0.294,581],[0.302,582],[0.326,589],[0.351,592],[0.378,592],[0.382,592],[0.384,592],[0.395,588],[0.401,586],[0.426,588],[0.481,583],[0.497,595],[0.512,593],[0.527,581],[0.547,573],[0.582,568],[0.604,562],[0.618,555],[0.640,554],[0.671,546],[0.699,530],[0.725,514],[0.751,505],[0.792,501],[0.798,504],[0.812,510],[0.822,516],[0.830,521],[0.838,525],[0.844,529],[0.849,533],[0.856,538],[0.860,541],[0.867,544],[0.873,548],[0.883,552],[0.893,548],[0.900,544],[0.907,541],[0.911,538],[0.918,533],[0.923,529],[0.929,525],[0.937,521],[0.945,516],[0.955,510],[0.967,504],[0.975,501],[1.016,505],[1.042,514],[1.068,530],[1.096,546],[1.127,554],[1.148,555],[1.163,562],[1.185,568],[1.220,573],[1.240,581],[1.255,593],[1.269,595],[1.286,583],[1.341,588],[1.366,586],[1.372,588],[1.383,592],[1.389,592],[1.416,592],[1.441,589],[1.465,582],[1.473,581],[1.481,582],[1.489,585],[1.501,591],[1.515,595],[1.529,596],[1.557,589],[1.573,588],[1.586,588],[1.601,585],[1.614,579],[1.635,571],[1.677,566],[1.693,565],[1.711,568],[1.719,568],[1.726,569],[1.733,568],[1.745,567],[1.767,565]];


const SEND_TRACKS_OFICIAL = [
  { track: TRACK_PRC05_MOD, color: '#dc2626', label: 'PRC05 SMI · Serra Devassa' },
  { track: TRACK_PR04_SMI,  color: '#2563eb', label: 'PR04 SMI · Mata do Canário' },
  { track: TRACK_PR03_SMI,  color: '#16a34a', label: 'PR03 SMI · Vista do Rei' },
  { track: TRACK_PRC43_SMI_REAL, color: '#9333ea', label: 'PRC43 SMI · Picos das Camarinhas' },
];

/* SEND_TRACKS_REAL: el que realment farem, colors que destaquen (no verds, per diferenciar-los del mapa) */
const SEND_TRACKS_REAL_PRC05 = [
  { track: TRACK_PRC05_MOD, color: '#f59e0b', label: 'PRC05 modificat (8,1 km)' },
];
const SEND_TRACKS_REAL_GROTA = [
  { track: TRACK_GROTA_INFERNO, color: '#22d3ee', label: 'Opció curta a Boca do Inferno (2,6 km)' },
];

/* ── SENDERISME MAP (amb tracks reals) ───────────────────── */
/* ── ELEVATION PROFILE (SVG estàtic, sense hover) ────────── */
function buildElevSvgStatic(profile, color) {
  if (!profile || profile.length < 2) return '<div class="send-elev-na">Perfil no disponible</div>';

  let pts = profile;
  if (pts.length > 150) {
    const step = Math.ceil(pts.length / 150);
    pts = pts.filter((_, i) => i % step === 0);
    const last = profile[profile.length - 1];
    if (pts[pts.length - 1] !== last) pts = [...pts, last];
  }

  const W = 600, H = 100;
  const PL = 40, PR = 10, PT = 10, PB = 22;
  const cW = W - PL - PR, cH = H - PT - PB;

  const maxKm = pts[pts.length - 1][0] || 1;
  const elevs = pts.map(p => p[1]);
  const minEl = Math.min(...elevs);
  const maxEl = Math.max(...elevs);
  const rngEl = maxEl - minEl || 10;

  const sx = km => PL + (km / maxKm) * cW;
  const sy = el => PT + cH - ((el - minEl) / rngEl) * cH;

  const pStr = pts.map(p => `${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(' ');
  const fStr = `${PL},${PT + cH} ${pStr} ${sx(maxKm).toFixed(1)},${PT + cH}`;

  const xTicks = [0, 1, 2, 3].map(i => {
    const km = (maxKm * i) / 3;
    return `<text x="${sx(km).toFixed(1)}" y="${H - 4}" text-anchor="middle" font-family="sans-serif" font-size="9" fill="rgba(168,216,176,0.55)">${km.toFixed(1)} km</text>`;
  }).join('');

  const yTicks = [
    `<text x="${PL - 4}" y="${(sy(minEl) + 4).toFixed(1)}" text-anchor="end" font-family="sans-serif" font-size="9" fill="rgba(168,216,176,0.55)">${Math.round(minEl)} m</text>`,
    `<text x="${PL - 4}" y="${(sy(maxEl) + 4).toFixed(1)}" text-anchor="end" font-family="sans-serif" font-size="9" fill="rgba(168,216,176,0.55)">${Math.round(maxEl)} m</text>`,
  ].join('');

  const gradId = `eg${Math.random().toString(36).slice(2, 6)}`;

  return `<svg class="send-elev-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0.03"/>
      </linearGradient>
    </defs>
    <line x1="${PL}" y1="${PT}" x2="${PL}" y2="${PT + cH}" stroke="rgba(106,171,122,0.2)" stroke-width="1"/>
    <line x1="${PL}" y1="${PT + cH}" x2="${W - PR}" y2="${PT + cH}" stroke="rgba(106,171,122,0.2)" stroke-width="1"/>
    <polygon points="${fStr}" fill="url(#${gradId})"/>
    <polyline points="${pStr}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round"/>
    ${yTicks}${xTicks}
  </svg>`;
}

/* ── SENDERISME MAP (amb tracks reals) ───────────────────── */
function initMapSenderisme(elId, tracks) {
  const el = document.getElementById(elId);
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: false, scrollWheelZoom: false });
  L.control.zoom({ position: 'topright' }).addTo(map);
  leafletTiles(map);

  const allCoords = [];
  tracks.forEach(t => {
    L.polyline(t.track, {
      color: t.color, weight: 3.5, opacity: 0.9,
      dashArray: t.dashed ? '6,7' : null,
    }).addTo(map).bindTooltip(t.label, { sticky: true });
    // Marcador d'inici
    L.circleMarker(t.track[0], {
      radius: 6, color: '#0a1628', weight: 2,
      fillColor: t.color, fillOpacity: 1
    }).addTo(map).bindPopup(`<b style="color:${t.color}">${t.label}</b><br>Inici`);
    allCoords.push(...t.track);
  });

  // Llegenda
  const legend = L.control({ position: 'bottomleft' });
  legend.onAdd = () => {
    const div = L.DomUtil.create('div');
    div.style.cssText = 'background:rgba(10,22,40,0.9);border:1px solid #2d5a3d;border-radius:8px;padding:8px 12px;font-size:11px;color:#a8d8b0;line-height:1.9';
    div.innerHTML = tracks.map(t =>
      `<div><span style="color:${t.color};font-weight:700;font-size:14px">—</span> ${t.label}</div>`
    ).join('');
    return div;
  };
  legend.addTo(map);
  map.fitBounds(L.latLngBounds(allCoords), { padding: [20, 20] });
}

/* ── POI MAP — CATEGORIES (jerarquia: categoria principal → subcategoria) ── */
const POI_MAIN_DEFS = {
  imprescindibles: { emoji: '⭐', label: 'Imprescindibles', hasSubs: false },
  miradors:        { emoji: '🔭', label: 'Miradors', hasSubs: false },
  bany:            { emoji: '🏊', label: 'Zones de bany', hasSubs: true },
  naturalesa:      { emoji: '🌿', label: 'Naturalesa', hasSubs: true },
  pobles:          { emoji: '🏘️', label: 'Pobles i ciutats', hasSubs: false },
  varis:           { emoji: '📌', label: 'Varis', hasSubs: true },
  aventura:        { emoji: '🧗', label: 'Aventura', hasSubs: true },
};

// Cada subcategoria final (leaf): emoji, color, etiqueta i a quina categoria principal pertany
const POI_LEAF_DEFS = {
  imprescindibles: { emoji: '⭐', color: '#fbbf24', label: 'Imprescindibles', parent: 'imprescindibles' },
  miradors:        { emoji: '🔭', color: '#a78bfa', label: 'Miradors', parent: 'miradors' },

  'bany-piscines':  { emoji: '🏊', color: '#38bdf8', label: 'Piscines naturals', parent: 'bany' },
  'bany-platges':   { emoji: '🏖️', color: '#fcd34d', label: 'Platges', parent: 'bany' },
  'bany-termals':   { emoji: '♨️', color: '#f87171', label: 'Aigües termals', parent: 'bany' },

  'nat-paisatge':   { emoji: '🌄', color: '#34d399', label: 'Paisatge', parent: 'naturalesa' },
  'nat-llacs':      { emoji: '💧', color: '#22d3ee', label: 'Llacs', parent: 'naturalesa' },
  'nat-geologia':   { emoji: '🌋', color: '#fb923c', label: 'Geologia', parent: 'naturalesa' },
  'nat-salts':      { emoji: '💦', color: '#0ea5e9', label: "Salts d'aigua", parent: 'naturalesa' },
  'nat-coves':      { emoji: '🕳️', color: '#92400e', label: 'Coves', parent: 'naturalesa' },
  'nat-jardins':    { emoji: '🌺', color: '#ec4899', label: 'Jardí botànic', parent: 'naturalesa' },

  pobles:           { emoji: '🏘️', color: '#6abf70', label: 'Pobles i ciutats', parent: 'pobles' },

  'varis-fars':         { emoji: '🔦', color: '#e2e8f0', label: 'Fars', parent: 'varis' },
  'varis-curiositats':  { emoji: '❓', color: '#fcd34d', label: 'Curiositats', parent: 'varis' },
  'varis-molins':       { emoji: '⚙️', color: '#a8a29e', label: 'Molins', parent: 'varis' },
  'varis-plantacions':  { emoji: '🌱', color: '#84cc16', label: 'Plantacions', parent: 'varis' },
  'varis-altres':       { emoji: '📌', color: '#94a3b8', label: 'Altres', parent: 'varis' },

  'avt-barranquisme': { emoji: '🪢', color: '#f59e0b', label: 'Barranquisme', parent: 'aventura' },
  'avt-bici':         { emoji: '🚴', color: '#22c55e', label: 'Bici', parent: 'aventura' },
  'avt-busseig':      { emoji: '🤿', color: '#0ea5e9', label: 'Busseig', parent: 'aventura' },
  'avt-coasteering':  { emoji: '🧗‍♀️', color: '#14b8a6', label: 'Coasteering', parent: 'aventura' },
  'avt-dofins':       { emoji: '🐬', color: '#60a5fa', label: 'Dofins', parent: 'aventura' },
  'avt-escalada':     { emoji: '🧗', color: '#d97706', label: 'Escalada', parent: 'aventura' },
  'avt-kayak':        { emoji: '🛶', color: '#06b6d4', label: 'Kayak', parent: 'aventura' },
  'avt-moto':         { emoji: '🛥️', color: '#ef4444', label: 'Moto aquàtica', parent: 'aventura' },
  'avt-snorkel':      { emoji: '🤽', color: '#3b82f6', label: 'Snorkel', parent: 'aventura' },
  'avt-surf':         { emoji: '🏄', color: '#8b5cf6', label: 'Surf', parent: 'aventura' },
};

function meLeaf(cat, sub) {
  // Mapeja (cat, sub) de poi-data.js a l'id de subcategoria final del filtre del mapa.
  // Restaurants, allotjaments, senderisme i excursions queden EXCLOSOS d'aquest mapa (retorna null).
  if (cat === 'imprescindibles') return 'imprescindibles';
  if (cat === 'miradors') return 'miradors';
  if (cat === 'poble') return 'pobles';
  if (cat === 'bany') {
    if (sub === 'piscines') return 'bany-piscines';
    if (sub === 'platges') return 'bany-platges';
    if (sub === 'aigües termals') return 'bany-termals';
    return null;
  }
  if (cat === 'naturalesa') {
    if (sub === 'paisatge') return 'nat-paisatge';
    if (sub === 'llacs') return 'nat-llacs';
    if (sub === 'geologia') return 'nat-geologia';
    if (sub === "salts d'aigua") return 'nat-salts';
    if (sub === 'coves') return 'nat-coves';
    if (sub === 'jardí botànic') return 'nat-jardins';
    return null;
  }
  if (cat === 'varis') {
    if (sub === 'fars') return 'varis-fars';
    if (sub === 'curiositats') return 'varis-curiositats';
    if (sub === 'molins') return 'varis-molins';
    if (sub === 'plantacions') return 'varis-plantacions';
    return 'varis-altres';
  }
  if (cat === 'aventura') {
    const map = {
      barranquisme: 'avt-barranquisme', bici: 'avt-bici', busseig: 'avt-busseig',
      coasteering: 'avt-coasteering', dofins: 'avt-dofins', 'Nedar amb dofins': 'avt-dofins',
      escalada: 'avt-escalada', kayak: 'avt-kayak', moto: 'avt-moto',
      snorkel: 'avt-snorkel', surf: 'avt-surf',
    };
    return map[sub] || null;
  }
  return null; // restaurants, restauranys, allotjaments, senderisme, excursions
}

let _poiMap = null;
let _poiMarkerData = [];      // [{ marker, leaf, parent, fav }]
let _poiLeafCounts = {};      // leaf -> nombre de marcadors
let _poiActiveLeafs = new Set();
let _poiFavOnly = false;

function initMapPOID2() {
  const el = document.getElementById('map-poi-d2');
  if (!el || el._leaflet_id) return;

  if (typeof POI_DATA === 'undefined') {
    el.innerHTML = '<div style="padding:30px;text-align:center;color:#f87171">⚠️ Falta carregar poi-data.js a la pàgina.</div>';
    return;
  }

  _poiMap = L.map(el, { zoomControl: false, scrollWheelZoom: true });
  L.control.zoom({ position: 'topright' }).addTo(_poiMap);
  leafletTiles(_poiMap);
  _poiMarkerData = [];
  _poiLeafCounts = {};

  function isWestSM(lat, lng) {
    return lat > 37.70 && lat < 37.97 && lng < -25.58 && lng > -26.1;
  }
  function isSM(illa) {
    return illa === 'São Miguel' || illa === 'Sao Miguel' || illa === 'sm';
  }
  function mapsUrlFor(lat, lng) {
    return `https://maps.google.com/?q=${lat},${lng}`;
  }
  function addMarker(leaf, coords, nom, desc, mapsUrl, fav) {
    const def = POI_LEAF_DEFS[leaf];
    const col = def ? def.color : '#94a3b8';
    const emoji = def ? def.emoji : '📌';
    const popup = `<b style="color:${col}">${fav ? '⭐ ' : ''}${nom}</b>` +
      (desc ? `<br><small style="color:#6aab7a">${String(desc).slice(0, 90)}</small>` : '') +
      (mapsUrl ? `<br><a href="${mapsUrl}" target="_blank" style="color:#6abf70;font-size:0.75rem">📍 Maps</a>` : '');
    const m = L.marker(coords, {
      icon: L.divIcon({
        html: `<span style="font-size:1.1rem;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.6))">${emoji}</span>`,
        iconSize: [22, 22], iconAnchor: [11, 11], className: ''
      })
    }).bindPopup(popup);
    m.addTo(_poiMap);
    _poiMarkerData.push({ marker: m, leaf, parent: def ? def.parent : 'altres', fav: !!fav });
    _poiLeafCounts[leaf] = (_poiLeafCounts[leaf] || 0) + 1;
  }

  // POI_DATA és la font única de coordenades — la recorrem un sol cop i creuem amb
  // IMPRESCINDIBLES (objecte keyed) per obtenir la zona.
  const imprescindiblesObj = (typeof IMPRESCINDIBLES !== 'undefined') ? IMPRESCINDIBLES : {};

  POI_DATA.forEach(p => {
    if (!isSM(p.illa)) return;
    if (typeof p.lat !== 'number' || typeof p.lng !== 'number') return;
    if (!isWestSM(p.lat, p.lng)) return;

    const leaf = meLeaf(p.cat, p.sub);
    if (!leaf) return; // restaurants, allotjaments, senderisme, excursions: exclosos d'aquest mapa

    let desc = p.zona || '';
    if (leaf === 'imprescindibles') {
      const detall = imprescindiblesObj[p.id];
      if (detall) desc = detall.zona || desc;
    }

    addMarker(leaf, [p.lat, p.lng], p.nom, desc, mapsUrlFor(p.lat, p.lng), p.d === true);
  });

  // Per defecte, totes les subcategories amb marcadors estan actives
  _poiActiveLeafs = new Set(Object.keys(_poiLeafCounts));
  _poiFavOnly = false;

  // Fit bounds
  if (_poiMarkerData.length) {
    _poiMap.fitBounds(L.featureGroup(_poiMarkerData.map(d => d.marker)).getBounds(), { padding: [30, 30] });
  }

  _renderPOIBar();
  _applyPOIFilters();
}

function _renderPOIBar() {
  const bar = document.getElementById('poi-filter-bar');
  if (!bar) return;

  // Comptar marcadors per categoria principal
  const mainCounts = {};
  Object.entries(_poiLeafCounts).forEach(([leaf, n]) => {
    const parent = POI_LEAF_DEFS[leaf] ? POI_LEAF_DEFS[leaf].parent : null;
    if (parent) mainCounts[parent] = (mainCounts[parent] || 0) + n;
  });

  let html = '<div class="poi-filter-row poi-filter-row-main">';
  Object.entries(POI_MAIN_DEFS).forEach(([mainId, def]) => {
    const n = mainCounts[mainId] || 0;
    if (!n) return;
    html += `<button class="poi-filter-pill active" data-main="${mainId}" onclick="poiToggleMain('${mainId}')">${def.emoji} ${def.label} <span style="opacity:0.55;font-size:0.68em">(${n})</span></button>`;
  });
  html += '</div>';

  // Files de subcategories (només per a categories amb hasSubs i amb marcadors)
  Object.entries(POI_MAIN_DEFS).forEach(([mainId, def]) => {
    if (!def.hasSubs) return;
    const leafs = Object.entries(POI_LEAF_DEFS).filter(([leaf, ld]) => ld.parent === mainId && _poiLeafCounts[leaf]);
    if (!leafs.length) return;
    html += `<div class="poi-filter-row poi-filter-row-sub" data-parent="${mainId}">`;
    leafs.forEach(([leaf, ld]) => {
      html += `<button class="poi-filter-pill sub active" data-leaf="${leaf}" data-main="${mainId}" onclick="poiToggleLeaf('${leaf}')">${ld.emoji} ${ld.label} <span style="opacity:0.55;font-size:0.68em">(${_poiLeafCounts[leaf]})</span></button>`;
    });
    html += '</div>';
  });

  html += `<div class="poi-filter-row poi-filter-actions">
    <button class="poi-filter-pill poi-filter-all" onclick="poiShowAllFilters()">☑ Mostrar tot</button>
    <button class="poi-filter-pill poi-filter-clear" onclick="poiClearFilters()">✕ Netejar filtres</button>
    <button class="poi-filter-pill poi-filter-favs" id="poi-favs-btn" onclick="poiToggleFavs()">⭐ Només favorits</button>
  </div>`;

  bar.innerHTML = html;
}

function _updateMainPillState(mainId) {
  const leafs = Object.entries(POI_LEAF_DEFS).filter(([leaf, ld]) => ld.parent === mainId && _poiLeafCounts[leaf]).map(([leaf]) => leaf);
  if (!leafs.length) return;
  const activeCount = leafs.filter(l => _poiActiveLeafs.has(l)).length;
  const btn = document.querySelector(`.poi-filter-pill[data-main="${mainId}"]:not(.sub)`);
  if (!btn) return;
  btn.classList.remove('active', 'partial');
  if (activeCount === leafs.length) btn.classList.add('active');
  else if (activeCount > 0) btn.classList.add('partial');
}

function _applyPOIFilters() {
  _poiMarkerData.forEach(d => {
    const show = _poiActiveLeafs.has(d.leaf) && (!_poiFavOnly || d.fav);
    if (show) { if (!_poiMap.hasLayer(d.marker)) d.marker.addTo(_poiMap); }
    else { if (_poiMap.hasLayer(d.marker)) d.marker.remove(); }
  });
}

function poiToggleLeaf(leaf) {
  const btn = document.querySelector(`.poi-filter-pill.sub[data-leaf="${leaf}"]`);
  if (!btn) return;
  if (_poiActiveLeafs.has(leaf)) {
    _poiActiveLeafs.delete(leaf);
    btn.classList.remove('active');
  } else {
    _poiActiveLeafs.add(leaf);
    btn.classList.add('active');
  }
  const parent = POI_LEAF_DEFS[leaf] ? POI_LEAF_DEFS[leaf].parent : null;
  if (parent) _updateMainPillState(parent);
  _applyPOIFilters();
}

function poiToggleMain(mainId) {
  const leafs = Object.entries(POI_LEAF_DEFS).filter(([leaf, ld]) => ld.parent === mainId && _poiLeafCounts[leaf]).map(([leaf]) => leaf);
  if (!leafs.length) return;
  const activeCount = leafs.filter(l => _poiActiveLeafs.has(l)).length;
  const turnOn = activeCount < leafs.length; // si no estan totes actives, les activem totes; si ja ho estan, les desactivem totes
  leafs.forEach(leaf => {
    if (turnOn) _poiActiveLeafs.add(leaf); else _poiActiveLeafs.delete(leaf);
    const subBtn = document.querySelector(`.poi-filter-pill.sub[data-leaf="${leaf}"]`);
    if (subBtn) subBtn.classList.toggle('active', turnOn);
  });
  _updateMainPillState(mainId);
  _applyPOIFilters();
}

function poiShowAllFilters() {
  _poiActiveLeafs = new Set(Object.keys(_poiLeafCounts));
  document.querySelectorAll('#poi-filter-bar .poi-filter-pill[data-leaf], #poi-filter-bar .poi-filter-pill[data-main]').forEach(b => {
    b.classList.remove('partial');
    b.classList.add('active');
  });
  _applyPOIFilters();
}

function poiClearFilters() {
  _poiActiveLeafs = new Set();
  document.querySelectorAll('#poi-filter-bar .poi-filter-pill[data-leaf], #poi-filter-bar .poi-filter-pill[data-main]').forEach(b => {
    b.classList.remove('active', 'partial');
  });
  _applyPOIFilters();
}

function poiToggleFavs() {
  _poiFavOnly = !_poiFavOnly;
  const btn = document.getElementById('poi-favs-btn');
  if (btn) btn.classList.toggle('active', _poiFavOnly);
  _applyPOIFilters();
}


/* ── POI TOOLTIP ─────────────────────────────────────────── */
function setupTooltips() {
  const tip = document.createElement('div');
  tip.id = 'poi-tooltip';
  document.body.appendChild(tip);

  let active = false;

  document.addEventListener('mouseover', e => {
    const span = e.target.closest('.poi-link');
    if (!span) return;
    const key = span.dataset.poi;
    const p = POI[key];
    if (!p) return;
    const desc = p.desc.length > 100 ? p.desc.slice(0, 100) + '…' : p.desc;
    tip.innerHTML = `<div class="tt-nom">${p.emoji} ${p.nom}</div><div class="tt-desc">${desc}</div>`;
    tip.classList.add('visible');
    active = true;
  });

  document.addEventListener('mouseout', e => {
    const span = e.target.closest('.poi-link');
    if (!span) return;
    tip.classList.remove('visible');
    active = false;
  });

  document.addEventListener('mousemove', e => {
    if (!active) return;
    let x = e.clientX + 16;
    let y = e.clientY - 10;
    if (x + 280 > window.innerWidth) x = e.clientX - 280;
    if (y + 80 > window.innerHeight) y = e.clientY - 80;
    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
  });
}

/* ── ACCORDION ───────────────────────────────────────────── */
function setupAccordions() {
  document.querySelectorAll('.itin-acc-header').forEach(h => {
    h.addEventListener('click', () => {
      const item = h.closest('.itin-acc-item');
      item.classList.toggle('open');
    });
  });
}

/* ── DAY SWITCHING ───────────────────────────────────────── */
let mapsInitDia = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false };

function showDia(n) {
  document.querySelectorAll('.itin-dia').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.itin-day-pill').forEach(el => el.classList.remove('active'));
  const dia = document.getElementById(`dia-${n}`);
  const pill = document.querySelector(`.itin-day-pill[data-dia="${n}"]`);
  if (dia) dia.classList.add('active');
  if (pill) pill.classList.add('active');

  // Progress badge
  const badge = document.getElementById('progress-badge');
  if (badge) badge.textContent = `Dia ${n} de 12`;

  // Lazy map init
  if (n === 7 && !mapsInitDia[7]) {
    mapsInitDia[7] = true;
    setTimeout(() => {
      initMapRetornCotxesSMI();
      initMapLloguerCotxesSJO();
      initMapRetornCotxesSJO();
      initMapLloguerCotxesPIC();
      initMapAllotjament3();
      initMapRutaD7();
      initMapPOID7();
      renderRestListSimple('#rests-velas-rapid', RESTS_VELAS_RAPID);
    }, 100);
  }
  if (n === 1 && !mapsInitDia[1]) {
    mapsInitDia[1] = true;
    setTimeout(() => { initMapCotxes(); initMapAllotjament1(); }, 100);
  }
  if (n === 6 && !mapsInitDia[6]) {
    mapsInitDia[6] = true;
    setTimeout(() => {
      initMapD6Alternatives();
      initMapD6TM16();
      initMapRutaD6();
      initMapPOID6();
    }, 100);
  }
    if (n === 5 && !mapsInitDia[5]) {
    mapsInitDia[5] = true;
    setTimeout(() => {
      initMapD5RutaEst();
      initMapRutaD5();
      initMapSenderisme('map-tm06', SEND_TRACKS_D5_REAL_TM06);
      initMapSenderisme('map-poco-azul', SEND_TRACKS_D5_REAL_POCO_AZUL);
      initMapSenderisme('map-prc09', SEND_TRACKS_D5_REAL_PRC09);
      initMapSenderisme('map-cagarrao', SEND_TRACKS_D5_REAL_CAGARRAO);
      initMapSenderisme('map-d5-alternatives', SEND_TRACKS_D5_ALTERNATIVES);
      initMapPOID5();
    }, 100);
  }
    if (n === 4 && !mapsInitDia[4]) {
    mapsInitDia[4] = true;
    setTimeout(() => {
      initMapD4Restriccio();
      initMapD4Alternatives();
      initMapSenderisme('map-prc28', SEND_TRACKS_REAL_PRC28);
      initMapSenderisme('map-lombadas', SEND_TRACKS_D4_LOMBADAS);
      showRutaTabD4('principal');
      initMapPOID4();
    }, 100);
  }
    if (n === 3 && !mapsInitDia[3]) {
    mapsInitDia[3] = true;
    setTimeout(() => {
      initMapExcLlanxa();
      initMapExcCarvao();
      initMapAllotjament2();
      initMapSenderisme('map-prc37', SEND_TRACKS_REAL_PRC37);
      initMapRutaD3();
      initMapPOID3();
    }, 100);
  }
    if (n === 2 && !mapsInitDia[2]) {
    mapsInitDia[2] = true;
    setTimeout(() => {
      showRutaTab('principal');
      initMapSenderisme('map-senderisme', SEND_TRACKS_OFICIAL);
      initMapSenderisme('map-ruta-real-prc05', SEND_TRACKS_REAL_PRC05);
      initMapSenderisme('map-ruta-real-grota', SEND_TRACKS_REAL_GROTA);
      initMapPOID2();
    }, 100);
  }
}

/* ── RENDER RESTAURANT LIST (list/amber format) ──────────── */
function renderRestList(containerSelector, data) {
  const el = document.querySelector(containerSelector);
  if (!el) return;
  el.innerHTML = data.map(r => {
    const star = r.rec ? ' ⭐' : '';
    const avoid = r.avoid ? `<span class="rest-list-avoid"> millor evitar</span>` : '';
    const nobd = r.nobd
      ? `<span class="rest-list-nobd"> (sense fitxa)</span>` : '';
    const fitxa = `<a href="restaurants.html#rest-${slugify(r.nom)}" class="rest-list-link">Fitxa</a>`;
    const maps = r.gm
      ? `<a href="${r.gm}" target="_blank" class="rest-list-link">📍 Maps</a>` : '';
    return `<div class="rest-list-item${r.avoid ? ' rest-list-item-avoid' : ''}">
      <span class="rest-list-nom">${r.nom}${star}${avoid}${nobd}</span>
      <span class="rest-list-rating">${starsTextAmber(r.punt)}</span>
      <div class="rest-list-links">${fitxa}${maps}</div>
    </div>`;
  }).join('');
}

/* ── PHOTO FLIP ──────────────────────────────────────────── */
function flipFoto(el) {
  el.classList.toggle('flipped');
  if (!el.classList.contains('flipped')) return;
  const back = el.querySelector('.itin-foto-back');
  if (!back) return;
  const mapEl = back.querySelector('.itin-flip-map');
  if (!mapEl || mapEl._leaflet_id) return;
  const key = el.dataset.poiKey;
  const p = POI[key];
  if (!p) return;
  const emoji = el.dataset.flipEmoji || p.emoji; // permet sobreescriure l'emoji del POI
  setTimeout(() => {
    try {
      const m = L.map(mapEl, {
        zoomControl: false, scrollWheelZoom: false,
        attributionControl: false, dragging: false
      });
      L.tileLayer(CARTO_URL, { maxZoom: 17 }).addTo(m);
      m.setView(p.coords, 14);
      L.marker(p.coords, {
        icon: L.divIcon({
          html: `<div style="font-size:1.4rem;filter:drop-shadow(0 1px 3px rgba(0,0,0,.7))">${emoji}</div>`,
          iconSize: [24, 24], iconAnchor: [12, 12], className: ''
        })
      }).addTo(m);
    } catch(e) { console.warn('flip map error:', e); }
  }, 320);
}

/* ── RENDER RESTAURANTS ──────────────────────────────────── */
function renderRests(containerSelector, data) {
  const el = document.querySelector(containerSelector);
  if (!el) return;
  el.innerHTML = data.map(r => {
    const foto = r.foto
      ? `<img class="itin-rest-foto" src="${r.foto}" alt="${r.nom}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=itin-rest-foto-placeholder>🍽️</div>'">`
      : `<div class="itin-rest-foto-placeholder">🍽️</div>`;
    const top10 = r.top10 ? `<span class="itin-rest-top10" title="Top 10 SM">★</span>` : '';
    const rec   = r.rec   ? `<span class="itin-rest-rec"   title="Especialment recomanat">☑️</span>` : '';
    const nobd = (!r.ta && !r.foto) ? `<div class="itin-rest-nodatabase">Sense fitxa a la base de dades</div>` : '';
    const linksTa = r.ta ? `<a href="${r.ta}" target="_blank" class="itin-rest-link">TripAdvisor</a>` : '';
    const linksGm = r.gm ? `<a href="${r.gm}" target="_blank" class="itin-rest-link">📍 Maps</a>` : '';
    const preu = `<span class="itin-rest-preu">${r.preu}</span>`;
    return `<div class="itin-rest-card">
      ${foto}
      <div class="itin-rest-info">
        <div class="itin-rest-nom">${r.nom}${top10}${rec}</div>
        <div class="itin-rest-rating">${starsHtml(r.punt)} ${preu}</div>
        ${nobd}
        <div class="itin-rest-links">${linksTa}${linksGm}</div>
      </div>
    </div>`;
  }).join('');
}


/* ── PRC37 TRACK (per al mapa de senderisme del dia 3) ─── */
const SEND_TRACKS_REAL_PRC37 = [
  { track: TRACK_PRC37_SMI, color: '#6abf70', label: 'PRC37 · Janela do Inferno (7,6 km)' },
];

/* ── DIA 3 WAYPOINTS ─────────────────────────────────────── */
const DIA3_WAYPOINTS = [
  { nom: 'Rabo de Peixe — Excursió amb llanxa 🚀', coords: [37.81634, -25.58226], icon: '⛵' },
  { nom: 'Buraco de São Pedro', coords: [37.83213, -25.62890], icon: '🔭' },
  { nom: 'Pinhal da Paz', coords: [37.78695, -25.63950], icon: '🌲' },
  { nom: 'Gruta do Carvão', coords: [37.74820, -25.68707], icon: '🕳️' },
  { nom: 'PRC37 — Janela do Inferno', coords: [37.74627, -25.53731], icon: '🥾' },
  { nom: 'Capella Nossa Senhora da Paz', coords: [37.72795, -25.43148], icon: '⛪' },
  { nom: 'Casa Cherimoya (allotjament)', coords: [37.71835, -25.40934], icon: '🏠' },
];

/* ── DIA 3 MAP FUNCTIONS ─────────────────────────────────── */

/* Mapa petit de situació: port de Rabo de Peixe (excursió llanxa) */
function initMapExcLlanxa() {
  const el = document.getElementById('map-exc-llanxa');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: true, scrollWheelZoom: false });
  leafletTiles(map);
  const lat = 37.81634, lng = -25.58226;
  map.setView([lat, lng], 15);
  L.marker([lat, lng], {
    icon: L.divIcon({
      html: `<div style="background:#22d3ee;border:2px solid #fff;border-radius:50%;width:16px;height:16px;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>`,
      iconSize: [16, 16], iconAnchor: [8, 8], className: ''
    })
  }).addTo(map).bindPopup('<b>⛵ Punt de sortida</b><br>Port de Rabo de Peixe<br>R. do Porto 2').openPopup();
  setTimeout(() => map.invalidateSize(), 50);
}

/* Mapa petit de situació: Gruta do Carvão */
function initMapExcCarvao() {
  const el = document.getElementById('map-exc-carvao');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: true, scrollWheelZoom: false });
  leafletTiles(map);
  const lat = 37.74820, lng = -25.68707;
  map.setView([lat, lng], 15);
  L.marker([lat, lng], {
    icon: L.divIcon({
      html: `<div style="background:#9333ea;border:2px solid #fff;border-radius:50%;width:16px;height:16px;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>`,
      iconSize: [16, 16], iconAnchor: [8, 8], className: ''
    })
  }).addTo(map).bindPopup('<b>🕳️ Gruta do Carvão</b><br>R. do Paim, 9500-230 Ponta Delgada').openPopup();
  setTimeout(() => map.invalidateSize(), 50);
}

/* Mapa allotjament Casa Cherimoya */
function initMapAllotjament2() {
  const el = document.getElementById('map-allotjament2');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: true, scrollWheelZoom: false });
  leafletTiles(map);
  const lat = 37.71835, lng = -25.40934;
  map.setView([lat, lng], 15);
  L.marker([lat, lng], {
    icon: L.divIcon({
      html: `<div style="background:#e74c3c;border:2px solid #fff;border-radius:50%;width:16px;height:16px;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>`,
      iconSize: [16, 16], iconAnchor: [8, 8], className: ''
    })
  }).addTo(map).bindPopup('<b>🏠 Casa Cherimoya</b><br>Rua Outeiro dos Álamos Brancos 26').openPopup();
}

/* Mapa de la ruta del dia 3 (waypoints numerats) */
function initMapRutaD3() {
  const el = document.getElementById('map-ruta-d3');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: false, scrollWheelZoom: false });
  L.control.zoom({ position: 'topright' }).addTo(map);
  leafletTiles(map);

  L.marker([PDL_COORDS[0], PDL_COORDS[1]], { icon: startIcon(), zIndexOffset: 200 })
    .addTo(map).bindPopup('<b>▶️ Inici</b><br>Ponta Delgada');

  // Tots els waypoints menys l'últim com a numerats; l'últim (allotjament) com a bandera de final
  const stops = DIA3_WAYPOINTS.slice(0, -1);
  const finish = DIA3_WAYPOINTS[DIA3_WAYPOINTS.length - 1];

  stops.forEach((wp, i) => {
    L.marker(wp.coords, { icon: numberIcon(i + 1, COL_SM), zIndexOffset: 100 })
      .addTo(map).bindPopup(`<b>${i + 1}. ${wp.nom}</b>`);
  });

  L.marker(finish.coords, { icon: finishIcon(), zIndexOffset: 200 })
    .addTo(map).bindPopup(`<b>🏁 ${finish.nom}</b>`);

  const allCoords = [PDL_COORDS, ...DIA3_WAYPOINTS.map(w => w.coords)];
  map.fitBounds(L.latLngBounds(allCoords), { padding: [30, 30] });
}

/* Mapa de situació de tots els llocs d'interès del dia 3
   Cobreix el centre-est de São Miguel (sense la zona de Sete Cidades) */
let _poiMap3 = null, _poiMarkerData3 = [], _poiLeafCounts3 = {};
let _poiActiveLeafs3 = new Set(), _poiFavOnly3 = false;

function initMapPOID3() {
  const el = document.getElementById('map-poi-d3');
  if (!el || el._leaflet_id) return;
  if (typeof POI_DATA === 'undefined') {
    el.innerHTML = '<div style="padding:30px;text-align:center;color:#f87171">⚠️ Falta carregar poi-data.js a la pàgina.</div>';
    return;
  }

  _poiMap3 = L.map(el, { zoomControl: false, scrollWheelZoom: true });
  L.control.zoom({ position: 'topright' }).addTo(_poiMap3);
  leafletTiles(_poiMap3);
  _poiMarkerData3 = [];
  _poiLeafCounts3 = {};

  function isSM(illa) { return illa === 'São Miguel' || illa === 'Sao Miguel' || illa === 'sm'; }
  // Dos rectangles exactes: zona central (Capelas/Rabo de Peixe ↔ Lagoa/Ponta Delgada) + zona VFC
  function isD3Zone(lat, lng) {
    // Rect 1: centre-nord (Rabo de Peixe, Ponta Delgada, Lagoa... exclou Sete Cidades/Ferraria ja al dia 2)
    const rect1 = lat > 37.70 && lat < 37.87 && lng > -25.76 && lng < -25.53;
    // Rect 2: zona est (Água de Pau / Vila Franca do Campo / Casa Cherimoya)
    const rect2 = lat > 37.70 && lat < 37.76 && lng > -25.47 && lng < -25.37;
    return rect1 || rect2;
  }
  function mapsUrlFor(lat, lng) { return `https://maps.google.com/?q=${lat},${lng}`; }

  function addMarker3(leaf, coords, nom, desc, mapsUrl, fav) {
    const def = POI_LEAF_DEFS[leaf];
    const col = def ? def.color : '#94a3b8';
    const emoji = def ? def.emoji : '📌';
    const popup = `<b style="color:${col}">${fav ? '⭐ ' : ''}${nom}</b>` +
      (desc ? `<br><small style="color:#6aab7a">${String(desc).slice(0, 90)}</small>` : '') +
      (mapsUrl ? `<br><a href="${mapsUrl}" target="_blank" style="color:#6abf70;font-size:0.75rem">📍 Maps</a>` : '');
    const m = L.marker(coords, {
      icon: L.divIcon({
        html: `<span style="font-size:1.1rem;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.6))">${emoji}</span>`,
        iconSize: [22, 22], iconAnchor: [11, 11], className: ''
      })
    }).bindPopup(popup);
    m.addTo(_poiMap3);
    _poiMarkerData3.push({ marker: m, leaf, parent: def ? def.parent : 'altres', fav: !!fav });
    _poiLeafCounts3[leaf] = (_poiLeafCounts3[leaf] || 0) + 1;
  }

  const imprescindiblesObj = (typeof IMPRESCINDIBLES !== 'undefined') ? IMPRESCINDIBLES : {};

  POI_DATA.forEach(p => {
    if (!isSM(p.illa)) return;
    if (typeof p.lat !== 'number' || typeof p.lng !== 'number') return;
    if (!isD3Zone(p.lat, p.lng)) return;

    const leaf = meLeaf(p.cat, p.sub);
    if (!leaf) return;

    let desc = p.zona || '';
    if (leaf === 'imprescindibles') {
      const detall = imprescindiblesObj[p.id];
      if (detall) desc = detall.zona || desc;
    }
    addMarker3(leaf, [p.lat, p.lng], p.nom, desc, mapsUrlFor(p.lat, p.lng), p.d === true);
  });

  _poiActiveLeafs3 = new Set(Object.keys(_poiLeafCounts3));
  _poiFavOnly3 = false;

  if (_poiMarkerData3.length) {
    _poiMap3.fitBounds(L.featureGroup(_poiMarkerData3.map(d => d.marker)).getBounds(), { padding: [30, 30] });
  }
  _renderPOIBar3();
  _applyPOIFilters3();
}

function _renderPOIBar3() {
  const bar = document.getElementById('poi-filter-bar-d3');
  if (!bar) return;
  const mainCounts = {};
  Object.entries(_poiLeafCounts3).forEach(([leaf, n]) => {
    const parent = POI_LEAF_DEFS[leaf] ? POI_LEAF_DEFS[leaf].parent : null;
    if (parent) mainCounts[parent] = (mainCounts[parent] || 0) + n;
  });
  let html = '<div class="poi-filter-row poi-filter-row-main">';
  Object.entries(POI_MAIN_DEFS).forEach(([mainId, def]) => {
    const n = mainCounts[mainId] || 0;
    if (!n) return;
    html += `<button class="poi-filter-pill active" data-main-d3="${mainId}" onclick="poiToggleMainD3('${mainId}')">${def.emoji} ${def.label} <span style="opacity:0.55;font-size:0.68em">(${n})</span></button>`;
  });
  html += '</div>';
  Object.entries(POI_MAIN_DEFS).forEach(([mainId, def]) => {
    if (!def.hasSubs) return;
    const leafs = Object.entries(POI_LEAF_DEFS).filter(([leaf, ld]) => ld.parent === mainId && _poiLeafCounts3[leaf]);
    if (!leafs.length) return;
    html += `<div class="poi-filter-row poi-filter-row-sub" data-parent-d3="${mainId}">`;
    leafs.forEach(([leaf, ld]) => {
      html += `<button class="poi-filter-pill sub active" data-leaf-d3="${leaf}" data-main-d3="${mainId}" onclick="poiToggleLeafD3('${leaf}')">${ld.emoji} ${ld.label} <span style="opacity:0.55;font-size:0.68em">(${_poiLeafCounts3[leaf]})</span></button>`;
    });
    html += '</div>';
  });
  html += `<div class="poi-filter-row poi-filter-actions">
    <button class="poi-filter-pill poi-filter-all" onclick="poiShowAllD3()">☑ Mostrar tot</button>
    <button class="poi-filter-pill poi-filter-clear" onclick="poiClearD3()">✕ Netejar filtres</button>
    <button class="poi-filter-pill poi-filter-favs" id="poi-favs-btn-d3" onclick="poiToggleFavsD3()">⭐ Només favorits</button>
  </div>`;
  bar.innerHTML = html;
}

function _updateMainPillStateD3(mainId) {
  const leafs = Object.entries(POI_LEAF_DEFS).filter(([leaf, ld]) => ld.parent === mainId && _poiLeafCounts3[leaf]).map(([leaf]) => leaf);
  if (!leafs.length) return;
  const activeCount = leafs.filter(l => _poiActiveLeafs3.has(l)).length;
  const btn = document.querySelector(`.poi-filter-pill[data-main-d3="${mainId}"]:not(.sub)`);
  if (!btn) return;
  btn.classList.remove('active', 'partial');
  if (activeCount === leafs.length) btn.classList.add('active');
  else if (activeCount > 0) btn.classList.add('partial');
}

function _applyPOIFilters3() {
  _poiMarkerData3.forEach(d => {
    const show = _poiActiveLeafs3.has(d.leaf) && (!_poiFavOnly3 || d.fav);
    if (show) { if (!_poiMap3.hasLayer(d.marker)) d.marker.addTo(_poiMap3); }
    else { if (_poiMap3.hasLayer(d.marker)) d.marker.remove(); }
  });
}

function poiToggleLeafD3(leaf) {
  const btn = document.querySelector(`.poi-filter-pill.sub[data-leaf-d3="${leaf}"]`);
  if (!btn) return;
  if (_poiActiveLeafs3.has(leaf)) { _poiActiveLeafs3.delete(leaf); btn.classList.remove('active'); }
  else { _poiActiveLeafs3.add(leaf); btn.classList.add('active'); }
  const parent = POI_LEAF_DEFS[leaf] ? POI_LEAF_DEFS[leaf].parent : null;
  if (parent) _updateMainPillStateD3(parent);
  _applyPOIFilters3();
}

function poiToggleMainD3(mainId) {
  const leafs = Object.entries(POI_LEAF_DEFS).filter(([leaf, ld]) => ld.parent === mainId && _poiLeafCounts3[leaf]).map(([leaf]) => leaf);
  if (!leafs.length) return;
  const activeCount = leafs.filter(l => _poiActiveLeafs3.has(l)).length;
  const turnOn = activeCount < leafs.length;
  leafs.forEach(leaf => {
    if (turnOn) _poiActiveLeafs3.add(leaf); else _poiActiveLeafs3.delete(leaf);
    const subBtn = document.querySelector(`.poi-filter-pill.sub[data-leaf-d3="${leaf}"]`);
    if (subBtn) subBtn.classList.toggle('active', turnOn);
  });
  _updateMainPillStateD3(mainId);
  _applyPOIFilters3();
}

function poiShowAllD3() {
  _poiActiveLeafs3 = new Set(Object.keys(_poiLeafCounts3));
  document.querySelectorAll('#poi-filter-bar-d3 .poi-filter-pill[data-leaf-d3], #poi-filter-bar-d3 .poi-filter-pill[data-main-d3]').forEach(b => {
    b.classList.remove('partial'); b.classList.add('active');
  });
  _applyPOIFilters3();
}

function poiClearD3() {
  _poiActiveLeafs3 = new Set();
  document.querySelectorAll('#poi-filter-bar-d3 .poi-filter-pill[data-leaf-d3], #poi-filter-bar-d3 .poi-filter-pill[data-main-d3]').forEach(b => {
    b.classList.remove('active', 'partial');
  });
  _applyPOIFilters3();
}

function poiToggleFavsD3() {
  _poiFavOnly3 = !_poiFavOnly3;
  const btn = document.getElementById('poi-favs-btn-d3');
  if (btn) btn.classList.toggle('active', _poiFavOnly3);
  _applyPOIFilters3();
}

/* ═══════════════════════════════════════════════════════════
   DIA 4 — DISSABTE 25 DE JULIOL · LAGOA DO FOGO I NORD
   ═══════════════════════════════════════════════════════════ */

/* Track sets */
const RESTS_POVOACIO = [
  {
    nom: 'Snack Bar O Garoto', preu: '€', punt: 4.6, rec: true,
    lat: 37.7480581, lon: -25.2455991,
    ta: null, gm: 'https://www.google.com/maps/place/?q=place_id:ChIJA0pbkAMfXQsRmakuRQ2dh0E', foto: null,
  },
  {
    nom: 'Sabores da terra', preu: '€€', punt: 4.5, rec: true,
    lat: 37.7479095, lon: -25.2452990,
    ta: null, gm: 'https://www.google.com/maps/place/?q=place_id:ChIJS2u_UlYfXQsRRCWz44GZzT8', foto: null,
  },
  {
    nom: 'Restaurante O Riquim', preu: '€€', punt: 4.4, rec: false,
    lat: 37.7482954, lon: -25.2445394,
    ta: null, gm: 'https://www.google.com/maps/place/?q=place_id:ChIJXXBnQdEfXQsROlIuJBp5i_Q', foto: null,
  },
  {
    nom: 'Pic nic', preu: '€', punt: 4.3, rec: false,
    lat: 37.7480192, lon: -25.2446010,
    ta: null, gm: 'https://www.google.com/maps/place/?q=place_id:ChIJJ61ZWwAfXQsROBbGlFW5XC0', foto: null,
  },
  {
    nom: 'Jardim', preu: '€', punt: 3.9, rec: false,
    lat: 37.7475698, lon: -25.2450106,
    ta: null, gm: 'https://www.google.com/maps/place/?q=place_id:ChIJtTrY7iUfXQsR9MjUjYuBLjY', foto: null,
  },
];

const SEND_TRACKS_D5_REAL_TM06 = [
  { track: TRACK_D5_TM06, color: '#6abf70', label: 'TM06 – Moinho do Félix (~4 km)' },
];
const SEND_TRACKS_D5_REAL_POCO_AZUL = [
  { track: TRACK_D5_POCO_AZUL, color: '#22d3ee', label: 'Caminada al Poço Azul (1,3 km)' },
];
const SEND_TRACKS_D5_REAL_PRC09 = [
  { track: TRACK_D5_PRC09, color: '#6abf70', label: 'PRC09 – Salto do Prego (4,5 km)' },
];
const SEND_TRACKS_D5_REAL_CAGARRAO = [
  { track: TRACK_D5_CAGARRAO, color: '#f59e0b', label: 'Extensió Cagarrão (9,2 km)' },
];
const SEND_TRACKS_D5_ALTERNATIVES = [
  { track: TRACK_D5_PR21,  color: '#dc2626', label: 'PR21 – Salto da Farinha (4,3 km)' },
  { track: TRACK_D5_PRC07, color: '#2563eb', label: 'PRC07 – Pico da Vara (7,2 km)' },
  { track: TRACK_D5_PRC13, color: '#9333ea', label: 'PRC13 – Água Retorta (4,6 km)' },
  { track: TRACK_D5_PR12,  color: '#16a34a', label: 'PR12 – Ribeira Quente (7,6 km)' },
];

const RESTS_FURNAS_RAPID = [
  {
    nom: 'Queijaria Furnense', preu: '€', punt: 4.6, rec: true,
    lat: 37.77034, lon: -25.31570,
    ta: null, gm: 'https://www.google.com/maps/place/?q=place_id:ChIJh8yJ1IooXQsRTN3C0sRbBxA', foto: null,
  },
  {
    nom: 'A Quinta', preu: '€€', punt: 4.2, rec: true,
    lat: 37.77206, lon: -25.31110,
    ta: null, gm: 'https://www.google.com/maps/place/?q=place_id:ChIJa4e88b8oXQsRaQ1nSwqQWlI', foto: null,
  },
  {
    nom: 'Summer Breeze', preu: '€', punt: 4.4, rec: false,
    lat: 37.77311, lon: -25.30760,
    ta: null, gm: 'https://www.google.com/maps/place/?q=place_id:ChIJnwqKHZ0oXQsRkFCBvvfJaO4', foto: null,
  },
];

const RESTS_FURNAS = [
  {
    nom: 'Restaurante Banhos Ferreos', preu: '€€', punt: 4.1, rec: true,
    lat: 37.77283, lon: -25.31200,
    ta: null, gm: 'https://www.google.com/maps/place/?q=place_id:ChIJLZYGo7YoXQsRm_3j3RG_5Ks', foto: null,
  },
  {
    nom: "Restaurante Tony\'s", preu: '€€', punt: 4.2, rec: false,
    lat: 37.77357, lon: -25.31140,
    ta: null, gm: 'https://www.google.com/maps/place/?q=place_id:ChIJq6qqq7goXQsR7Wg_3KMo7gs', foto: null,
  },
];

const SEND_TRACKS_REAL_PRC28 = [
  { track: TRACK_D4_PRC28, color: '#6abf70', label: 'PRC28 SMI · Chá Gorreana (3,3 km)' },
];
const SEND_TRACKS_D4_ALTERNATIVES = [
  { track: TRACK_D4_PR02,   color: '#16a34a', label: 'PR02 SMI · Lagoa do Fogo (10,9 km)' },
  { track: TRACK_D4_PRC29,  color: '#2563eb', label: 'PRC29 SMI · Salto do Cabrito (8,1 km)' },
  { track: TRACK_D4_PR39,   color: '#dc2626', label: 'PR39 SMI · Quatro Fábricas (2,1 km)' },
];
const SEND_TRACKS_D4_LOMBADAS = [
  { track: TRACK_D4_LOMBADAS, color: '#f59e0b', label: 'Cascata das Lombadas (~1 km)' },
];

/* Waypoints per als dos itineraris del dia 4 */
const DIA4_WAYPOINTS_PRINCIPAL = [
  { nom: 'PRC28 SMI – Chá Gorreana', coords: [37.81779, -25.40246], icon: '🥾' },
  { nom: 'Mirador do Frade', coords: [37.83181, -25.45249], icon: '🔭' },
  { nom: 'Porto Formoso – Mirador do Porto', coords: [37.82175, -25.48070], icon: '🔭' },
  { nom: 'Praia dos Moinhos i Cascata do Limbo', coords: [37.87082, -25.67137], icon: '🏖️' },
  { nom: 'Mirador de Santa Iria', coords: [37.84064, -25.56565], icon: '🔭' },
  { nom: 'Farol do Cintrão', coords: [37.84278, -25.48857], icon: '🔦' },
  { nom: 'Praia do Areal de Santa Bárbara', coords: [37.81593, -25.54735], icon: '🏖️' },
  { nom: 'Ribeira Grande / Cascata das Lombadas', coords: [37.82295, -25.51960], icon: '💧' },
  { nom: 'Caldeira Velha', coords: [37.78485, -25.50135], icon: '♨️', reserva: true },
  { nom: 'Salto do Cabrito', coords: [37.77016, -25.50804], icon: '💦' },
  { nom: 'Lagoa do Fogo (miradors)', coords: [37.75418, -25.46100], icon: '🏔️' },
];
const DIA4_WAYPOINTS_ALTHERNATIU = [
  { nom: 'Lagoa do Fogo (Miradouro de Bela Vista, Lagoa do Fogo, Pico da Barrosa)', coords: [37.75418, -25.46100], icon: '🏔️' },
  { nom: 'PRC28 SMI – Chá Gorreana', coords: [37.81779, -25.40246], icon: '🥾' },
  { nom: 'Mirador do Frade', coords: [37.83181, -25.45249], icon: '🔭' },
  { nom: 'Porto Formoso – Mirador do Porto', coords: [37.82175, -25.48070], icon: '🔭' },
  { nom: 'Praia dos Moinhos i Cascata do Limbo', coords: [37.87082, -25.67137], icon: '🏖️' },
  { nom: 'Praia del Areal de Santa Bárbara', coords: [37.81593, -25.54735], icon: '🏖️' },
  { nom: 'Ribeira Grande / Salto do Cabrito', coords: [37.82295, -25.51960], icon: '💦' },
  { nom: 'Caldeira Velha', coords: [37.78485, -25.50135], icon: '♨️', reserva: true },
  { nom: 'Mirador de Santa Iria', coords: [37.84064, -25.56565], icon: '🔭' },
  { nom: 'Farol do Cintrão', coords: [37.84278, -25.48857], icon: '🔦' },
];
const CHERIMOYA_COORDS = [37.71835, -25.40934];


/* ── GRUP DIVIDIT — TABS ─────────────────────────────────── */
let splitGroupBraveInit = false;
function showSplitGroupTab(tab) {
  document.querySelectorAll('.split-group-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.split-group-panel').forEach(p => p.classList.toggle('active', p.id === 'split-panel-' + tab));
}
/* Mapa restriccions d'accés a la Lagoa do Fogo */
function initMapD4Restriccio() {
  const el = document.getElementById('map-d4-restriccio');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: false, scrollWheelZoom: false });
  L.control.zoom({ position: 'topright' }).addTo(map);
  // Voyager - clar per veure carretera
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
    { attribution: '© OSM © CARTO', maxZoom: 18 }).addTo(map);

  // Carretera restringida en vermell
  L.polyline(TRACK_D4_ACCES, { color: '#ef4444', weight: 5, opacity: 0.9 })
    .addTo(map).bindTooltip('Zona d\'accés restringit 9h–19h', { sticky: true });

  // Punt d'entrada nord (entrada habitual venint del nord)
  L.marker([37.78485, -25.50135], {
    icon: L.divIcon({
      html: '<div style="background:#22c55e;border:2px solid #fff;border-radius:50%;width:14px;height:14px;box-shadow:0 1px 6px rgba(0,0,0,0.5)"></div>',
      iconSize: [14,14], iconAnchor: [7,7], className: ''
    })
  }).addTo(map).bindPopup('<b style="color:#22c55e">🟢 Entrada nord</b><br>Pàrquing Caldeira Velha<br>Accessible sense restriccions >19h');

  // Punt d'entrada sud (Remédios)
  L.marker([37.74699, -25.53700], {
    icon: L.divIcon({
      html: '<div style="background:#f59e0b;border:2px solid #fff;border-radius:50%;width:14px;height:14px;box-shadow:0 1px 6px rgba(0,0,0,0.5)"></div>',
      iconSize: [14,14], iconAnchor: [7,7], className: ''
    })
  }).addTo(map).bindPopup('<b style="color:#f59e0b">🟡 Entrada sud (Remédios)</b><br>Casa da Água<br>Cal entrar <b>abans de les 9h</b> per evitar restriccions');

  // Allotjament
  L.marker(CHERIMOYA_COORDS, {
    icon: L.divIcon({
      html: '<span style="font-size:1rem">🏠</span>',
      iconSize: [20,20], iconAnchor: [10,10], className: ''
    })
  }).addTo(map).bindPopup('<b>🏠 Casa Cherimoya</b><br>El nostre allotjament');

  const all = [...TRACK_D4_ACCES, CHERIMOYA_COORDS, [37.78485, -25.50135], [37.74699, -25.53700]];
  map.fitBounds(L.latLngBounds(all), { padding: [30, 30] });
  setTimeout(() => map.invalidateSize(), 50);
}

/* Mapa de les 3 rutes alternatives */
function initMapD4Alternatives() {
  initMapSenderisme('map-d4-alternatives', SEND_TRACKS_D4_ALTERNATIVES);
}

/* Tabs ruta dia 4 (principal / alternatiu) */
let rutaTabsD4Init = { principal: false, alt: false };
function showRutaTabD4(tab) {
  document.querySelectorAll('.d4-route-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.d4-route-panel').forEach(p => p.classList.remove('active'));
  const btn = document.querySelector(`.d4-route-tab[data-tab="${tab}"]`);
  const panel = document.getElementById(`d4-ruta-panel-${tab}`);
  if (btn) btn.classList.add('active');
  if (panel) panel.classList.add('active');
  if (tab === 'principal' && !rutaTabsD4Init.principal) {
    rutaTabsD4Init.principal = true;
    setTimeout(() => initMapRutaD4('map-ruta-d4', DIA4_WAYPOINTS_PRINCIPAL, 'https://maps.app.goo.gl/tpSFbowhfJXhEKkY7'), 80);
  }
  if (tab === 'alt' && !rutaTabsD4Init.alt) {
    rutaTabsD4Init.alt = true;
    setTimeout(() => initMapRutaD4('map-ruta-d4-alt', DIA4_WAYPOINTS_ALTHERNATIU, 'https://maps.app.goo.gl/C44TXhmDDFQgs8hn7'), 80);
  }
}

function initMapRutaD4(elId, waypoints, _mapsLink) {
  const el = document.getElementById(elId);
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: false, scrollWheelZoom: false });
  L.control.zoom({ position: 'topright' }).addTo(map);
  leafletTiles(map);

  L.marker(CHERIMOYA_COORDS, { icon: startIcon(), zIndexOffset: 200 })
    .addTo(map).bindPopup('<b>▶️ Inici</b><br>Casa Cherimoya – Ribeira das Tainhas');

  const stops = waypoints.slice(0, -1);
  const finish = waypoints[waypoints.length - 1];
  stops.forEach((wp, i) => {
    L.marker(wp.coords, { icon: numberIcon(i + 1, COL_SM), zIndexOffset: 100 })
      .addTo(map).bindPopup(`<b>${i + 1}. ${wp.nom}</b>`);
  });
  L.marker(finish.coords, { icon: numberIcon(stops.length + 1, COL_SM), zIndexOffset: 100 })
    .addTo(map).bindPopup(`<b>${stops.length + 1}. ${finish.nom}</b>`);

  // Final (Caloura)
  L.marker([37.71382, -25.49659], { icon: finishIcon(), zIndexOffset: 200 })
    .addTo(map).bindPopup('<b>🏁 Caloura</b><br>Sopar i tornada');

  const allCoords = [CHERIMOYA_COORDS, ...waypoints.map(w => w.coords), [37.71382, -25.49659]];
  map.fitBounds(L.latLngBounds(allCoords), { padding: [30, 30] });
}

/* Mapa POI dia 4 */
let _poiMap4 = null, _poiMarkerData4 = [], _poiLeafCounts4 = {};
let _poiActiveLeafs4 = new Set(), _poiFavOnly4 = false;

function initMapPOID4() {
  const el = document.getElementById('map-poi-d4');
  if (!el || el._leaflet_id) return;
  if (typeof POI_DATA === 'undefined') { el.innerHTML='<div style="padding:30px;text-align:center;color:#f87171">⚠️ Falta carregar poi-data.js</div>'; return; }

  _poiMap4 = L.map(el, { zoomControl: false, scrollWheelZoom: true });
  L.control.zoom({ position: 'topright' }).addTo(_poiMap4);
  leafletTiles(_poiMap4);
  _poiMarkerData4 = []; _poiLeafCounts4 = {};

  function isSM(i) { return i==='São Miguel'||i==='Sao Miguel'||i==='sm'; }
  // Zona dia 4: el rectangle marcat (Ribeira Grande fins Lagoa do Fogo / Água de Pau / Cherimoya)
  function isD4Zone(lat, lng) {
    return lat > 37.69 && lat < 37.85 && lng > -25.56 && lng < -25.37;
  }
  function mapsUrl(lat, lng) { return `https://maps.google.com/?q=${lat},${lng}`; }

  function addMarker4(leaf, coords, nom, desc, url, fav) {
    const def = POI_LEAF_DEFS[leaf];
    const col = def ? def.color : '#94a3b8';
    const emoji = def ? def.emoji : '📌';
    const popup = `<b style="color:${col}">${fav?'⭐ ':''}${nom}</b>`+
      (desc?`<br><small style="color:#6aab7a">${String(desc).slice(0,90)}</small>`:'')+
      (url?`<br><a href="${url}" target="_blank" style="color:#6abf70;font-size:0.75rem">📍 Maps</a>`:'');
    const m = L.marker(coords, { icon: L.divIcon({
      html: `<span style="font-size:1.1rem;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.6))">${emoji}</span>`,
      iconSize:[22,22], iconAnchor:[11,11], className:''
    })}).bindPopup(popup);
    m.addTo(_poiMap4);
    _poiMarkerData4.push({marker:m, leaf, parent: def?def.parent:'altres', fav:!!fav});
    _poiLeafCounts4[leaf] = (_poiLeafCounts4[leaf]||0)+1;
  }

  const impObj = (typeof IMPRESCINDIBLES!=='undefined')?IMPRESCINDIBLES:{};
  POI_DATA.forEach(p => {
    if (!isSM(p.illa)) return;
    if (typeof p.lat!=='number'||typeof p.lng!=='number') return;
    if (!isD4Zone(p.lat, p.lng)) return;
    const leaf = meLeaf(p.cat, p.sub);
    if (!leaf) return;
    let desc = p.zona||'';
    if (leaf==='imprescindibles'){ const d=impObj[p.id]; if(d) desc=d.zona||desc; }
    addMarker4(leaf, [p.lat,p.lng], p.nom, desc, mapsUrl(p.lat,p.lng), p.d===true);
  });

  _poiActiveLeafs4 = new Set(Object.keys(_poiLeafCounts4));
  if (_poiMarkerData4.length) _poiMap4.fitBounds(L.featureGroup(_poiMarkerData4.map(d=>d.marker)).getBounds(), {padding:[30,30]});
  _renderPOIBar4();
  _applyPOIFilters4();
}

function _renderPOIBar4() {
  const bar = document.getElementById('poi-filter-bar-d4');
  if (!bar) return;
  const mainCounts = {};
  Object.entries(_poiLeafCounts4).forEach(([leaf,n]) => {
    const parent = POI_LEAF_DEFS[leaf]?POI_LEAF_DEFS[leaf].parent:null;
    if (parent) mainCounts[parent]=(mainCounts[parent]||0)+n;
  });
  let html='<div class="poi-filter-row poi-filter-row-main">';
  Object.entries(POI_MAIN_DEFS).forEach(([mainId,def])=>{
    const n=mainCounts[mainId]||0;
    if(!n) return;
    html+=`<button class="poi-filter-pill active" data-main-d4="${mainId}" onclick="poiToggleMainD4('${mainId}')">${def.emoji} ${def.label} <span style="opacity:0.55;font-size:0.68em">(${n})</span></button>`;
  });
  html+='</div>';
  Object.entries(POI_MAIN_DEFS).forEach(([mainId,def])=>{
    if(!def.hasSubs) return;
    const leafs=Object.entries(POI_LEAF_DEFS).filter(([leaf,ld])=>ld.parent===mainId&&_poiLeafCounts4[leaf]);
    if(!leafs.length) return;
    html+=`<div class="poi-filter-row poi-filter-row-sub" data-parent-d4="${mainId}">`;
    leafs.forEach(([leaf,ld])=>{ html+=`<button class="poi-filter-pill sub active" data-leaf-d4="${leaf}" data-main-d4="${mainId}" onclick="poiToggleLeafD4('${leaf}')">${ld.emoji} ${ld.label} <span style="opacity:0.55;font-size:0.68em">(${_poiLeafCounts4[leaf]})</span></button>`; });
    html+='</div>';
  });
  html+=`<div class="poi-filter-row poi-filter-actions">
    <button class="poi-filter-pill poi-filter-all" onclick="poiShowAllD4()">☑ Mostrar tot</button>
    <button class="poi-filter-pill poi-filter-clear" onclick="poiClearD4()">✕ Netejar filtres</button>
    <button class="poi-filter-pill poi-filter-favs" id="poi-favs-btn-d4" onclick="poiToggleFavsD4()">⭐ Només favorits</button>
  </div>`;
  bar.innerHTML=html;
}
function _updateMainPillStateD4(mainId) {
  const leafs=Object.entries(POI_LEAF_DEFS).filter(([leaf,ld])=>ld.parent===mainId&&_poiLeafCounts4[leaf]).map(([l])=>l);
  if(!leafs.length) return;
  const ac=leafs.filter(l=>_poiActiveLeafs4.has(l)).length;
  const btn=document.querySelector(`.poi-filter-pill[data-main-d4="${mainId}"]:not(.sub)`);
  if(!btn) return;
  btn.classList.remove('active','partial');
  if(ac===leafs.length) btn.classList.add('active');
  else if(ac>0) btn.classList.add('partial');
}
function _applyPOIFilters4() {
  _poiMarkerData4.forEach(d=>{
    const show=_poiActiveLeafs4.has(d.leaf)&&(!_poiFavOnly4||d.fav);
    if(show){if(!_poiMap4.hasLayer(d.marker))d.marker.addTo(_poiMap4);}
    else{if(_poiMap4.hasLayer(d.marker))d.marker.remove();}
  });
}
function poiToggleLeafD4(leaf) {
  const btn=document.querySelector(`.poi-filter-pill.sub[data-leaf-d4="${leaf}"]`);
  if(!btn) return;
  if(_poiActiveLeafs4.has(leaf)){_poiActiveLeafs4.delete(leaf);btn.classList.remove('active');}
  else{_poiActiveLeafs4.add(leaf);btn.classList.add('active');}
  const parent=POI_LEAF_DEFS[leaf]?POI_LEAF_DEFS[leaf].parent:null;
  if(parent)_updateMainPillStateD4(parent);
  _applyPOIFilters4();
}
function poiToggleMainD4(mainId) {
  const leafs=Object.entries(POI_LEAF_DEFS).filter(([leaf,ld])=>ld.parent===mainId&&_poiLeafCounts4[leaf]).map(([l])=>l);
  if(!leafs.length) return;
  const turnOn=leafs.filter(l=>_poiActiveLeafs4.has(l)).length<leafs.length;
  leafs.forEach(leaf=>{
    if(turnOn)_poiActiveLeafs4.add(leaf);else _poiActiveLeafs4.delete(leaf);
    const sb=document.querySelector(`.poi-filter-pill.sub[data-leaf-d4="${leaf}"]`);
    if(sb)sb.classList.toggle('active',turnOn);
  });
  _updateMainPillStateD4(mainId);
  _applyPOIFilters4();
}
function poiShowAllD4(){_poiActiveLeafs4=new Set(Object.keys(_poiLeafCounts4));document.querySelectorAll('#poi-filter-bar-d4 .poi-filter-pill[data-leaf-d4],#poi-filter-bar-d4 .poi-filter-pill[data-main-d4]').forEach(b=>{b.classList.remove('partial');b.classList.add('active');});_applyPOIFilters4();}
function poiClearD4(){_poiActiveLeafs4=new Set();document.querySelectorAll('#poi-filter-bar-d4 .poi-filter-pill[data-leaf-d4],#poi-filter-bar-d4 .poi-filter-pill[data-main-d4]').forEach(b=>b.classList.remove('active','partial'));_applyPOIFilters4();}
function poiToggleFavsD4(){_poiFavOnly4=!_poiFavOnly4;const btn=document.getElementById('poi-favs-btn-d4');if(btn)btn.classList.toggle('active',_poiFavOnly4);_applyPOIFilters4();}




/* ═══════════════════════════════════════════════════════════
   DIA 5 — DIUMENGE 26 DE JULIOL · CASCADES I MIRADORS DE L'EST
   ═══════════════════════════════════════════════════════════ */

/* Tabs PRC09 / Extensió Cagarrão */
let prc09TabInit = { prc09: false, cagarrao: false };
function showPRC09Tab(tab) {
  document.querySelectorAll('.prc09-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.prc09-panel').forEach(p => p.classList.toggle('active', p.id === 'prc09-panel-' + tab));
}

/* ── MAPA ESPECIAL: RUTA EST + MIRADORS + BENDS ─────────── */
function initMapD5RutaEst() {
  const el = document.getElementById('map-d5-ruta-est');
  if (!el || el._leaflet_id) return;

  const map = L.map(el, { zoomControl: false, scrollWheelZoom: false });
  L.control.zoom({ position: 'topright' }).addTo(map);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
    { attribution: '© OSM © CARTO', maxZoom: 18 }).addTo(map);

  /* Línia de la ruta en ambre */
  L.polyline(TRACK_D5_RUTA_EST, { color: '#f59e0b', weight: 5, opacity: 0.85 })
    .addTo(map).bindTooltip('Ruta panoràmica costa est – 23 km', { sticky: true });

  /* 11 miradors al llarg de la ruta */
  const MIRADORS_EST = [
    { id: 'mir-smi-04', nom: 'Boca da Ribeira',      coords: [37.84163, -25.14903], star: false },
    { id: 'mir-smi-30', nom: 'Ponta do Arnel ⭐',    coords: [37.82448, -25.13962], star: true  },
    { id: 'mir-smi-17', nom: 'Vista dos Barcos ⭐',   coords: [37.81954, -25.13917], star: true  },
    { id: 'mir-smi-14', nom: 'Ponta do Sossego ⭐',  coords: [37.79925, -25.14588], star: true  },
    { id: 'mir-smi-13', nom: 'Ponta da Madrugada ⭐',coords: [37.78960, -25.14542], star: true  },
    { id: 'mir-smi-06', nom: 'Tronqueira',            coords: [37.79645, -25.18484], star: false },
    { id: 'mir-smi-26', nom: 'Pico Bartolomeu',       coords: [37.77813, -25.16884], star: false },
    { id: 'mir-smi-20', nom: 'Água Retorta',          coords: [37.76516, -25.15844], star: false },
    { id: 'mir-smi-29', nom: 'Pico Longo',            coords: [37.76460, -25.21163], star: false },
    { id: 'mir-smi-33', nom: 'Pôr-do-Sol',            coords: [37.75312, -25.21883], star: false },
    { id: 'mir-smi-28', nom: 'Pico dos Bodes',        coords: [37.74700, -25.21907], star: false },
  ];

  MIRADORS_EST.forEach(m => {
    const size = m.star ? 28 : 20;
    const bg   = m.star ? '#a78bfa' : '#94a3b8';
    const icon = L.divIcon({
      html: `<div style="background:${bg};border:2px solid #fff;border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-size:${m.star?'0.9rem':'0.7rem'};box-shadow:0 2px 8px rgba(0,0,0,0.5)">🔭</div>`,
      iconSize: [size, size], iconAnchor: [size/2, size/2], className: ''
    });
    L.marker(m.coords, { icon }).addTo(map)
      .bindPopup(`<b style="color:${m.star?'#a78bfa':'#94a3b8'}">${m.nom}</b><br><a href="https://maps.google.com/?q=${m.coords[0]},${m.coords[1]}" target="_blank" style="color:#6abf70;font-size:0.75rem">📍 Maps</a>`);
  });

  /* Marcadors de revolts pronunciats (nàusea) */
  const nauseaQuips = [
    'Revolt #1 de 47… anirem bé!',
    'Queda poc… mentida.',
    'Consell: no miris el telèfon.',
    'La Mons ha demanat parar el cotxe.',
    'Tècnicament encara és recta.',
    'El GPS ha dimitit.',
    'Final del revolt… ara ve el següent!',
  ];
  RUTA_EST_BENDS.forEach((coords, i) => {
    const icon = L.divIcon({
      html: `<div class="nausea-mkr" style="font-size:1.5rem;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.7));animation:nauseaSway ${0.4+i*0.1}s ease-in-out infinite alternate">😵‍💫</div>`,
      iconSize: [28, 28], iconAnchor: [14, 14], className: ''
    });
    L.marker(coords, { icon, zIndexOffset: 50 }).addTo(map)
      .bindPopup(`<b>😵‍💫 Revolt perillós!</b><br><small style="color:#fbbf24">${nauseaQuips[i]}</small>`);
  });

  /* Llegenda */
  const legend = L.control({ position: 'bottomleft' });
  legend.onAdd = () => {
    const div = L.DomUtil.create('div');
    div.style.cssText = 'background:rgba(10,22,40,0.9);border:1px solid rgba(106,171,122,0.3);border-radius:8px;padding:8px 12px;font-size:10px;color:#a8d8b0;line-height:1.9';
    div.innerHTML = `<div><span style="color:#f59e0b;font-weight:700">━━</span> Ruta panoràmica est (23 km)</div>
<div>🔭 <span style="color:#a78bfa">⬤</span> Miradors destacats &nbsp; 🔭 <span style="color:#94a3b8">⬤</span> Altres miradors</div>`;
    return div;
  };
  legend.addTo(map);

  map.fitBounds(L.latLngBounds(TRACK_D5_RUTA_EST), { padding: [30, 30] });
  setTimeout(() => map.invalidateSize(), 50);

  /* Activa la pluja d'emojis */
  _startNauseaRain(el);
}

/* Pluja subtil d'emojis de mareig */
function _startNauseaRain(mapEl) {
  const container = mapEl.parentElement;
  if (!container || container.querySelector('.nausea-rain-layer')) return;

  const layer = document.createElement('div');
  layer.className = 'nausea-rain-layer';
  layer.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:450';
  container.style.position = 'relative';
  container.appendChild(layer);

  const emojis = ['🥴','😵‍💫','🌀','🌀','🥴'];
  const N = 12;
  for (let i = 0; i < N; i++) {
    const span = document.createElement('span');
    const left = 5 + Math.random() * 90;
    const delay = Math.random() * 6;
    const dur   = 5 + Math.random() * 5;
    const size  = 0.8 + Math.random() * 0.7;
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    span.textContent = emoji;
    span.style.cssText = `
      position:absolute; left:${left}%; top:-10%;
      font-size:${size}rem; opacity:0.18;
      animation: nauseaFall ${dur}s ${delay}s linear infinite;
      pointer-events:none;
    `;
    layer.appendChild(span);
  }
}

/* POI mapa dia 5 */
let _poiMap5=null, _poiMarkerData5=[], _poiLeafCounts5={};
let _poiActiveLeafs5=new Set(), _poiFavOnly5=false;

function initMapPOID5() {
  const el = document.getElementById('map-poi-d5');
  if (!el || el._leaflet_id) return;
  if (typeof POI_DATA === 'undefined') { el.innerHTML='<div style="padding:30px;text-align:center;color:#f87171">⚠️ Falta poi-data.js</div>'; return; }

  _poiMap5 = L.map(el, { zoomControl: false, scrollWheelZoom: true });
  L.control.zoom({ position: 'topright' }).addTo(_poiMap5);
  leafletTiles(_poiMap5);
  _poiMarkerData5=[]; _poiLeafCounts5={};

  function isSM(i){return i==='São Miguel'||i==='Sao Miguel'||i==='sm';}
  // Dos rectangles de la zona dia 5 (Nordeste/TM06 i Faial da Terra/Povoacào)
  function isD5Zone(lat, lng){
    const rect1 = lat > 37.79 && lat < 37.87 && lng > -25.37 && lng < -25.12;
    const rect2 = lat > 37.70 && lat < 37.79 && lng > -25.30 && lng < -25.12;
    return rect1 || rect2;
  }
  function mapsUrl(lat,lng){return `https://maps.google.com/?q=${lat},${lng}`;}

  function addMarker5(leaf,coords,nom,desc,url,fav){
    const def=POI_LEAF_DEFS[leaf];
    const col=def?def.color:'#94a3b8', emoji=def?def.emoji:'📌';
    const popup=`<b style="color:${col}">${fav?'⭐ ':''}${nom}</b>`+(desc?`<br><small style="color:#6aab7a">${String(desc).slice(0,90)}</small>`:'')+( url?`<br><a href="${url}" target="_blank" style="color:#6abf70;font-size:0.75rem">📍 Maps</a>`:'');
    const m=L.marker(coords,{icon:L.divIcon({html:`<span style="font-size:1.1rem;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.6))">${emoji}</span>`,iconSize:[22,22],iconAnchor:[11,11],className:''})}).bindPopup(popup);
    m.addTo(_poiMap5);
    _poiMarkerData5.push({marker:m,leaf,parent:def?def.parent:'altres',fav:!!fav});
    _poiLeafCounts5[leaf]=(_poiLeafCounts5[leaf]||0)+1;
  }

  const impObj=(typeof IMPRESCINDIBLES!=='undefined')?IMPRESCINDIBLES:{};
  POI_DATA.forEach(p=>{
    if(!isSM(p.illa)) return;
    if(typeof p.lat!=='number'||typeof p.lng!=='number') return;
    if(!isD5Zone(p.lat,p.lng)) return;
    const leaf=meLeaf(p.cat,p.sub);
    if(!leaf) return;
    let desc=p.zona||'';
    if(leaf==='imprescindibles'){const d=impObj[p.id];if(d)desc=d.zona||desc;}
    addMarker5(leaf,[p.lat,p.lng],p.nom,desc,mapsUrl(p.lat,p.lng),p.d===true);
  });

  _poiActiveLeafs5=new Set(Object.keys(_poiLeafCounts5));
  if(_poiMarkerData5.length) _poiMap5.fitBounds(L.featureGroup(_poiMarkerData5.map(d=>d.marker)).getBounds(),{padding:[30,30]});
  _renderPOIBar5(); _applyPOIFilters5();
}

function _renderPOIBar5(){
  const bar=document.getElementById('poi-filter-bar-d5');
  if(!bar) return;
  const mc={};
  Object.entries(_poiLeafCounts5).forEach(([leaf,n])=>{const p=POI_LEAF_DEFS[leaf]?.parent;if(p)mc[p]=(mc[p]||0)+n;});
  let html='<div class="poi-filter-row poi-filter-row-main">';
  Object.entries(POI_MAIN_DEFS).forEach(([mainId,def])=>{const n=mc[mainId]||0;if(!n)return;html+=`<button class="poi-filter-pill active" data-main-d5="${mainId}" onclick="poiToggleMainD5('${mainId}')">${def.emoji} ${def.label} <span style="opacity:0.55;font-size:0.68em">(${n})</span></button>`;});
  html+='</div>';
  Object.entries(POI_MAIN_DEFS).forEach(([mainId,def])=>{
    if(!def.hasSubs)return;
    const leafs=Object.entries(POI_LEAF_DEFS).filter(([leaf,ld])=>ld.parent===mainId&&_poiLeafCounts5[leaf]);
    if(!leafs.length)return;
    html+=`<div class="poi-filter-row poi-filter-row-sub" data-parent-d5="${mainId}">`;
    leafs.forEach(([leaf,ld])=>{html+=`<button class="poi-filter-pill sub active" data-leaf-d5="${leaf}" data-main-d5="${mainId}" onclick="poiToggleLeafD5('${leaf}')">${ld.emoji} ${ld.label} <span style="opacity:0.55;font-size:0.68em">(${_poiLeafCounts5[leaf]})</span></button>`;});
    html+='</div>';
  });
  html+=`<div class="poi-filter-row poi-filter-actions"><button class="poi-filter-pill poi-filter-all" onclick="poiShowAllD5()">☑ Mostrar tot</button><button class="poi-filter-pill poi-filter-clear" onclick="poiClearD5()">✕ Netejar filtres</button><button class="poi-filter-pill poi-filter-favs" id="poi-favs-btn-d5" onclick="poiToggleFavsD5()">⭐ Només favorits</button></div>`;
  bar.innerHTML=html;
}

function _updMainD5(mainId){const leafs=Object.entries(POI_LEAF_DEFS).filter(([l,ld])=>ld.parent===mainId&&_poiLeafCounts5[l]).map(([l])=>l);if(!leafs.length)return;const ac=leafs.filter(l=>_poiActiveLeafs5.has(l)).length;const btn=document.querySelector(`.poi-filter-pill[data-main-d5="${mainId}"]:not(.sub)`);if(!btn)return;btn.classList.remove('active','partial');if(ac===leafs.length)btn.classList.add('active');else if(ac>0)btn.classList.add('partial');}
function _applyPOIFilters5(){_poiMarkerData5.forEach(d=>{const show=_poiActiveLeafs5.has(d.leaf)&&(!_poiFavOnly5||d.fav);if(show){if(!_poiMap5.hasLayer(d.marker))d.marker.addTo(_poiMap5);}else{if(_poiMap5.hasLayer(d.marker))d.marker.remove();}});}
function poiToggleLeafD5(leaf){const btn=document.querySelector(`.poi-filter-pill.sub[data-leaf-d5="${leaf}"]`);if(!btn)return;if(_poiActiveLeafs5.has(leaf)){_poiActiveLeafs5.delete(leaf);btn.classList.remove('active');}else{_poiActiveLeafs5.add(leaf);btn.classList.add('active');}const parent=POI_LEAF_DEFS[leaf]?.parent;if(parent)_updMainD5(parent);_applyPOIFilters5();}
function poiToggleMainD5(mainId){const leafs=Object.entries(POI_LEAF_DEFS).filter(([l,ld])=>ld.parent===mainId&&_poiLeafCounts5[l]).map(([l])=>l);if(!leafs.length)return;const turnOn=leafs.filter(l=>_poiActiveLeafs5.has(l)).length<leafs.length;leafs.forEach(leaf=>{if(turnOn)_poiActiveLeafs5.add(leaf);else _poiActiveLeafs5.delete(leaf);const sb=document.querySelector(`.poi-filter-pill.sub[data-leaf-d5="${leaf}"]`);if(sb)sb.classList.toggle('active',turnOn);});_updMainD5(mainId);_applyPOIFilters5();}
function poiShowAllD5(){_poiActiveLeafs5=new Set(Object.keys(_poiLeafCounts5));document.querySelectorAll('#poi-filter-bar-d5 .poi-filter-pill[data-leaf-d5],#poi-filter-bar-d5 .poi-filter-pill[data-main-d5]').forEach(b=>{b.classList.remove('partial');b.classList.add('active');});_applyPOIFilters5();}
function poiClearD5(){_poiActiveLeafs5=new Set();document.querySelectorAll('#poi-filter-bar-d5 .poi-filter-pill[data-leaf-d5],#poi-filter-bar-d5 .poi-filter-pill[data-main-d5]').forEach(b=>b.classList.remove('active','partial'));_applyPOIFilters5();}
function poiToggleFavsD5(){_poiFavOnly5=!_poiFavOnly5;const btn=document.getElementById('poi-favs-btn-d5');if(btn)btn.classList.toggle('active',_poiFavOnly5);_applyPOIFilters5();}




const DIA5_WAYPOINTS = [
  { nom: 'TM06 – Moinho do Félix',            coords: [37.85200, -25.31617], icon: '💦' },
  { nom: 'Poço Azul',                          coords: [37.85880, -25.29047], icon: '💧' },
  { nom: 'Parque Ribeira dos Caldeirões',      coords: [37.84282, -25.26759], icon: '🌿' },
  { nom: 'Ruta panoràmica costa est (Nordeste)',coords: [37.83333, -25.17130], icon: '🌊' },
  { nom: 'PRC09 – Salto do Prego (Faial da Terra)', coords: [37.74716, -25.20146], icon: '🥾' },
];
const CHERIMOYA_D5_START = [37.71835, -25.40934];
const POVOACIO_D5_END    = [37.74790, -25.24530];

function initMapRutaD5() {
  const el = document.getElementById('map-ruta-d5');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: false, scrollWheelZoom: false });
  L.control.zoom({ position: 'topright' }).addTo(map);
  leafletTiles(map);

  L.marker(CHERIMOYA_D5_START, { icon: startIcon(), zIndexOffset: 200 })
    .addTo(map).bindPopup('<b>▶️ Inici i final</b><br>Casa Cherimoya – Ribeira das Tainhas');

  DIA5_WAYPOINTS.forEach((wp, i) => {
    L.marker(wp.coords, { icon: numberIcon(i + 1, COL_SM), zIndexOffset: 100 })
      .addTo(map).bindPopup(`<b>${i + 1}. ${wp.nom}</b>`);
  });

  // Sopar a Povoació com a parada numerada
  L.marker(POVOACIO_D5_END, { icon: numberIcon(DIA5_WAYPOINTS.length + 1, COL_SM), zIndexOffset: 100 })
    .addTo(map).bindPopup(`<b>${DIA5_WAYPOINTS.length + 1}. Sopar a Povoació</b>`);

  // Finish a Cherimoya (zIndexOffset < start per no solapar el popup de start)
  L.marker(CHERIMOYA_D5_START, { icon: finishIcon(), zIndexOffset: 190 })
    .addTo(map).bindPopup('<b>🏁 Tornada a Casa Cherimoya</b>');

  const all = [CHERIMOYA_D5_START, ...DIA5_WAYPOINTS.map(w => w.coords), POVOACIO_D5_END];
  map.fitBounds(L.latLngBounds(all), { padding: [30, 30] });
}


/* ═══════════════════════════════════════════════════════════
   DIA 6 — DILLUNS 27 DE JULIOL · VILA FRANCA I FURNAS
   ═══════════════════════════════════════════════════════════ */

const SEND_TRACKS_D6_ALTERNATIVES = [
  { track: TRACK_D6_PRC06, color: '#16a34a', label: 'PRC06 SMI · Lagoa das Furnas (9,5 km)' },
];
const SEND_TRACKS_D6_TM16 = [
  { track: TRACK_D6_TM16, color: '#6abf70', label: 'TM16 SMI · Salto do Rosal (3,6 km)' },
];

const DIA6_WAYPOINTS = [
  { nom: 'Illot de Vila Franca do Campo', coords: [37.71460, -25.41720] },
  { nom: 'Lagoa das Furnas',              coords: [37.75720, -25.32490] },
  { nom: 'Mata Jardim José do Canto + TM16', coords: [37.75032, -25.33220] },
  { nom: 'Furnas – Dinar',                coords: [37.77780, -25.31930] },
  { nom: 'Parc Terra Nostra',             coords: [37.77260, -25.31560] },
  { nom: 'Caldeiras de Furnas',           coords: [37.77290, -25.30390] },
  { nom: 'Mirador Salto do Cavalo',       coords: [37.78740, -25.28370] },
  { nom: 'Mirador Pico do Ferro',         coords: [37.77200, -25.33410] },
];

function initMapD6Alternatives() {
  initMapSenderisme('map-d6-alternatives', SEND_TRACKS_D6_ALTERNATIVES);
}

function initMapD6TM16() {
  initMapSenderisme('map-d6-tm16', SEND_TRACKS_D6_TM16);
}

function initMapRutaD6() {
  const el = document.getElementById('map-ruta-d6');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: false, scrollWheelZoom: false });
  L.control.zoom({ position: 'topright' }).addTo(map);
  leafletTiles(map);

  const start = CHERIMOYA_COORDS;
  L.marker(start, { icon: startIcon(), zIndexOffset: 200 })
    .addTo(map).bindPopup('<b>▶️ Inici i final</b><br>Casa Cherimoya');

  DIA6_WAYPOINTS.forEach((wp, i) => {
    L.marker(wp.coords, { icon: numberIcon(i + 1, COL_SM), zIndexOffset: 100 })
      .addTo(map).bindPopup(`<b>${i + 1}. ${wp.nom}</b>`);
  });

  L.marker(start, { icon: finishIcon(), zIndexOffset: 190 })
    .addTo(map).bindPopup('<b>🏁 Tornada a Casa Cherimoya</b>');

  const all = [start, ...DIA6_WAYPOINTS.map(w => w.coords)];
  map.fitBounds(L.latLngBounds(all), { padding: [30, 30] });
}

/* POI mapa dia 6 — Vila Franca + Furnas */
let _poiMap6=null, _poiMarkerData6=[], _poiLeafCounts6={};
let _poiActiveLeafs6=new Set(), _poiFavOnly6=false;

function initMapPOID6() {
  const el = document.getElementById('map-poi-d6');
  if (!el || el._leaflet_id) return;
  if (typeof POI_DATA === 'undefined') { el.innerHTML='<div style="padding:30px;text-align:center;color:#f87171">⚠️ Falta poi-data.js</div>'; return; }
  _poiMap6 = L.map(el, { zoomControl: false, scrollWheelZoom: true });
  L.control.zoom({ position: 'topright' }).addTo(_poiMap6);
  leafletTiles(_poiMap6);
  _poiMarkerData6=[]; _poiLeafCounts6={};

  function isSM(i){return i==='São Miguel'||i==='Sao Miguel'||i==='sm';}
  function isD6Zone(lat, lng){
    // Zona VFC (illot i voltants)
    const vfc = lat > 37.69 && lat < 37.73 && lng > -25.46 && lng < -25.38;
    // Zona Furnas (lagoa, parc, miradors)
    const fur = lat > 37.73 && lat < 37.82 && lng > -25.41 && lng < -25.26;
    return vfc || fur;
  }
  function mapsUrl(lat,lng){return `https://maps.google.com/?q=${lat},${lng}`;}

  function addM6(leaf,coords,nom,desc,url,fav){
    const def=POI_LEAF_DEFS[leaf];
    const col=def?def.color:'#94a3b8', emoji=def?def.emoji:'📌';
    const popup=`<b style="color:${col}">${fav?'⭐ ':''}${nom}</b>`+(desc?`<br><small style="color:#6aab7a">${String(desc).slice(0,90)}</small>`:'')+( url?`<br><a href="${url}" target="_blank" style="color:#6abf70;font-size:0.75rem">📍 Maps</a>`:'');
    const m=L.marker(coords,{icon:L.divIcon({html:`<span style="font-size:1.1rem;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.6))">${emoji}</span>`,iconSize:[22,22],iconAnchor:[11,11],className:''})}).bindPopup(popup);
    m.addTo(_poiMap6);
    _poiMarkerData6.push({marker:m,leaf,parent:def?def.parent:'altres',fav:!!fav});
    _poiLeafCounts6[leaf]=(_poiLeafCounts6[leaf]||0)+1;
  }

  const impObj=(typeof IMPRESCINDIBLES!=='undefined')?IMPRESCINDIBLES:{};
  POI_DATA.forEach(p=>{
    if(!isSM(p.illa)) return;
    if(typeof p.lat!=='number'||typeof p.lng!=='number') return;
    if(!isD6Zone(p.lat,p.lng)) return;
    const leaf=meLeaf(p.cat,p.sub);
    if(!leaf) return;
    let desc=p.zona||'';
    if(leaf==='imprescindibles'){const d=impObj[p.id];if(d)desc=d.zona||desc;}
    addM6(leaf,[p.lat,p.lng],p.nom,desc,mapsUrl(p.lat,p.lng),p.d===true);
  });

  _poiActiveLeafs6=new Set(Object.keys(_poiLeafCounts6));
  if(_poiMarkerData6.length)_poiMap6.fitBounds(L.featureGroup(_poiMarkerData6.map(d=>d.marker)).getBounds(),{padding:[30,30]});
  _renderPOIBar6(); _applyPOIFilters6();
}

function _renderPOIBar6(){
  const bar=document.getElementById('poi-filter-bar-d6');
  if(!bar)return;
  const mc={};
  Object.entries(_poiLeafCounts6).forEach(([leaf,n])=>{const p=POI_LEAF_DEFS[leaf]?.parent;if(p)mc[p]=(mc[p]||0)+n;});
  let html='<div class="poi-filter-row poi-filter-row-main">';
  Object.entries(POI_MAIN_DEFS).forEach(([mainId,def])=>{const n=mc[mainId]||0;if(!n)return;html+=`<button class="poi-filter-pill active" data-main-d6="${mainId}" onclick="poiToggleMainD6('${mainId}')">${def.emoji} ${def.label} <span style="opacity:0.55;font-size:0.68em">(${n})</span></button>`;});
  html+='</div>';
  Object.entries(POI_MAIN_DEFS).forEach(([mainId,def])=>{
    if(!def.hasSubs)return;
    const leafs=Object.entries(POI_LEAF_DEFS).filter(([leaf,ld])=>ld.parent===mainId&&_poiLeafCounts6[leaf]);
    if(!leafs.length)return;
    html+=`<div class="poi-filter-row poi-filter-row-sub" data-parent-d6="${mainId}">`;
    leafs.forEach(([leaf,ld])=>{html+=`<button class="poi-filter-pill sub active" data-leaf-d6="${leaf}" data-main-d6="${mainId}" onclick="poiToggleLeafD6('${leaf}')">${ld.emoji} ${ld.label} <span style="opacity:0.55;font-size:0.68em">(${_poiLeafCounts6[leaf]})</span></button>`;});
    html+='</div>';
  });
  html+=`<div class="poi-filter-row poi-filter-actions"><button class="poi-filter-pill poi-filter-all" onclick="poiShowAllD6()">☑ Mostrar tot</button><button class="poi-filter-pill poi-filter-clear" onclick="poiClearD6()">✕ Netejar filtres</button><button class="poi-filter-pill poi-filter-favs" id="poi-favs-btn-d6" onclick="poiToggleFavsD6()">⭐ Només favorits</button></div>`;
  bar.innerHTML=html;
}
function _updMainD6(mainId){const leafs=Object.entries(POI_LEAF_DEFS).filter(([l,ld])=>ld.parent===mainId&&_poiLeafCounts6[l]).map(([l])=>l);if(!leafs.length)return;const ac=leafs.filter(l=>_poiActiveLeafs6.has(l)).length;const btn=document.querySelector(`.poi-filter-pill[data-main-d6="${mainId}"]:not(.sub)`);if(!btn)return;btn.classList.remove('active','partial');if(ac===leafs.length)btn.classList.add('active');else if(ac>0)btn.classList.add('partial');}
function _applyPOIFilters6(){_poiMarkerData6.forEach(d=>{const show=_poiActiveLeafs6.has(d.leaf)&&(!_poiFavOnly6||d.fav);if(show){if(!_poiMap6.hasLayer(d.marker))d.marker.addTo(_poiMap6);}else{if(_poiMap6.hasLayer(d.marker))d.marker.remove();}});}
function poiToggleLeafD6(leaf){const btn=document.querySelector(`.poi-filter-pill.sub[data-leaf-d6="${leaf}"]`);if(!btn)return;if(_poiActiveLeafs6.has(leaf)){_poiActiveLeafs6.delete(leaf);btn.classList.remove('active');}else{_poiActiveLeafs6.add(leaf);btn.classList.add('active');}const parent=POI_LEAF_DEFS[leaf]?.parent;if(parent)_updMainD6(parent);_applyPOIFilters6();}
function poiToggleMainD6(mainId){const leafs=Object.entries(POI_LEAF_DEFS).filter(([l,ld])=>ld.parent===mainId&&_poiLeafCounts6[l]).map(([l])=>l);if(!leafs.length)return;const turnOn=leafs.filter(l=>_poiActiveLeafs6.has(l)).length<leafs.length;leafs.forEach(leaf=>{if(turnOn)_poiActiveLeafs6.add(leaf);else _poiActiveLeafs6.delete(leaf);const sb=document.querySelector(`.poi-filter-pill.sub[data-leaf-d6="${leaf}"]`);if(sb)sb.classList.toggle('active',turnOn);});_updMainD6(mainId);_applyPOIFilters6();}
function poiShowAllD6(){_poiActiveLeafs6=new Set(Object.keys(_poiLeafCounts6));document.querySelectorAll('#poi-filter-bar-d6 .poi-filter-pill[data-leaf-d6],#poi-filter-bar-d6 .poi-filter-pill[data-main-d6]').forEach(b=>{b.classList.remove('partial');b.classList.add('active');});_applyPOIFilters6();}
function poiClearD6(){_poiActiveLeafs6=new Set();document.querySelectorAll('#poi-filter-bar-d6 .poi-filter-pill[data-leaf-d6],#poi-filter-bar-d6 .poi-filter-pill[data-main-d6]').forEach(b=>b.classList.remove('active','partial'));_applyPOIFilters6();}
function poiToggleFavsD6(){_poiFavOnly6=!_poiFavOnly6;const btn=document.getElementById('poi-favs-btn-d6');if(btn)btn.classList.toggle('active',_poiFavOnly6);_applyPOIFilters6();}


/* ══════════════════════════════════════════════════════════
   DIA 7 · SÃO JORGE → PICO
   ══════════════════════════════════════════════════════════ */

/* Coordenades punts logístics */
const D7_RETORN_COTXES_SMI = [37.749585685919435, -25.71000906540439]; // Ilha Verde, aeroport PDL (mateix punt que dia 1)
const D7_LLOGUER_COTXES_SJO = [38.66449504208563, -28.168458630228876]; // Azores Motor Rent, aeroport SJZ
const D7_RETORN_COTXES_SJO = [38.67971865147596, -28.204869775698672]; // Port de Velas
const D7_LLOGUER_COTXES_PIC = [38.5269265, -28.3189243]; // Cais do Pico / São Roque do Pico (aprox.)
const D7_ALLOTJAMENT_PIC = [38.4607967, -28.1920405]; // Prainha Apartments
const D7_TABERNA_PACO = [38.6423232, -27.9658869]; // aprox. Fajã dos Cubres

function initMapRetornCotxesSMI() {
  const el = document.getElementById('map-retorn-cotxes-smi');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: true, scrollWheelZoom: false });
  leafletTiles(map);
  map.setView(D7_RETORN_COTXES_SMI, 15);
  L.marker(D7_RETORN_COTXES_SMI, {
    icon: L.divIcon({ html: `<div style="background:#2980b9;border:2px solid #fff;border-radius:50%;width:16px;height:16px;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>`, iconSize: [16, 16], iconAnchor: [8, 8], className: '' })
  }).addTo(map).bindPopup('<b>Ilha Verde</b><br>Aeroporto João Paulo II').openPopup();
}

function initMapLloguerCotxesSJO() {
  const el = document.getElementById('map-lloguer-cotxes-sjo');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: true, scrollWheelZoom: false });
  leafletTiles(map);
  map.setView(D7_LLOGUER_COTXES_SJO, 15);
  L.marker(D7_LLOGUER_COTXES_SJO, {
    icon: L.divIcon({ html: `<div style="background:#e74c3c;border:2px solid #fff;border-radius:50%;width:16px;height:16px;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>`, iconSize: [16, 16], iconAnchor: [8, 8], className: '' })
  }).addTo(map).bindPopup('<b>Azores Motor Rent</b><br>Aeroporto da Ilha de São Jorge').openPopup();
}

function initMapRetornCotxesSJO() {
  const el = document.getElementById('map-retorn-cotxes-sjo');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: true, scrollWheelZoom: false });
  leafletTiles(map);
  map.setView(D7_RETORN_COTXES_SJO, 15);
  L.marker(D7_RETORN_COTXES_SJO, {
    icon: L.divIcon({ html: `<div style="background:#e74c3c;border:2px solid #fff;border-radius:50%;width:16px;height:16px;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>`, iconSize: [16, 16], iconAnchor: [8, 8], className: '' })
  }).addTo(map).bindPopup('<b>Azores Motor Rent</b><br>Port de Velas').openPopup();
}

function initMapLloguerCotxesPIC() {
  const el = document.getElementById('map-lloguer-cotxes-pic');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: true, scrollWheelZoom: false });
  leafletTiles(map);
  map.setView(D7_LLOGUER_COTXES_PIC, 14);
  L.marker(D7_LLOGUER_COTXES_PIC, {
    icon: L.divIcon({ html: `<div style="background:#8e44ad;border:2px solid #fff;border-radius:50%;width:16px;height:16px;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>`, iconSize: [16, 16], iconAnchor: [8, 8], className: '' })
  }).addTo(map).bindPopup('<b>Oasis Rent a Car</b><br>Port de São Roque do Pico').openPopup();
}

function initMapAllotjament3() {
  const el = document.getElementById('map-allotjament3');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: true, scrollWheelZoom: false });
  leafletTiles(map);
  map.setView(D7_ALLOTJAMENT_PIC, 15);
  L.marker(D7_ALLOTJAMENT_PIC, {
    icon: L.divIcon({ html: `<div style="background:#e74c3c;border:2px solid #fff;border-radius:50%;width:16px;height:16px;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>`, iconSize: [16, 16], iconAnchor: [8, 8], className: '' })
  }).addTo(map).bindPopup('<b>Prainha Apartments</b><br>Canto da Areia').openPopup();
}

/* Waypoints de l'itinerari de São Jorge (ordre real de la ruta) */
const DIA7_WAYPOINTS = [
  { nom: 'Topo — port, far i illot', coords: [38.5462151, -27.7721096], icon: '🔭' },
  { nom: 'Miradors de la ER-2 (Serra do Topo)', coords: [38.59735, -27.9266931], icon: '🔭' },
  { nom: 'Mirador i Fajã dos Cubres — dinar', coords: [38.6477209, -27.9883935], icon: '🍽️' },
  { nom: 'Fajã do Ouvidor + Poça do Simão Dias', coords: [38.6786507, -28.0500872], icon: '🏊' },
  { nom: 'Sete Fontes + Miradors + Ponta dos Rosais', coords: [38.7523542, -28.3088036], icon: '🌲' },
  { nom: 'Miradors de Velas', coords: [38.6876737, -28.219042], icon: '🔭' },
  { nom: 'Velas + Arco Natural + sopar ràpid', coords: [38.6794811, -28.2108337], icon: '🍽️' },
];

function initMapRutaD7() {
  const el = document.getElementById('map-ruta-d7');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: false, scrollWheelZoom: false });
  L.control.zoom({ position: 'topright' }).addTo(map);
  leafletTiles(map);

  const start = D7_LLOGUER_COTXES_SJO;
  L.marker(start, { icon: startIcon(), zIndexOffset: 200 })
    .addTo(map).bindPopup('<b>▶️ Inici</b><br>Aeroport de São Jorge');

  DIA7_WAYPOINTS.forEach((wp, i) => {
    L.marker(wp.coords, { icon: numberIcon(i + 1, '#996633') , zIndexOffset: 100 })
      .addTo(map).bindPopup(`<b>${i + 1}. ${wp.nom}</b>`);
  });

  L.marker(D7_RETORN_COTXES_SJO, { icon: finishIcon(), zIndexOffset: 190 })
    .addTo(map).bindPopup('<b>🏁 Retorn cotxes</b><br>Port de Velas');

  const all = [start, ...DIA7_WAYPOINTS.map(w => w.coords), D7_RETORN_COTXES_SJO];
  map.fitBounds(L.latLngBounds(all), { padding: [30, 30] });
}

/* POI mapa dia 7 — tota l'illa de São Jorge (inclosos o no a l'itinerari) */
let _poiMap7=null, _poiMarkerData7=[], _poiLeafCounts7={};
let _poiActiveLeafs7=new Set(), _poiFavOnly7=false;

function initMapPOID7() {
  const el = document.getElementById('map-poi-d7');
  if (!el || el._leaflet_id) return;
  if (typeof POI_DATA === 'undefined') { el.innerHTML='<div style="padding:30px;text-align:center;color:#f87171">⚠️ Falta poi-data.js</div>'; return; }
  _poiMap7 = L.map(el, { zoomControl: false, scrollWheelZoom: true });
  L.control.zoom({ position: 'topright' }).addTo(_poiMap7);
  leafletTiles(_poiMap7);
  _poiMarkerData7=[]; _poiLeafCounts7={};

  function isSJ(i){return i==='São Jorge'||i==='Sao Jorge'||i==='sjo';}
  function mapsUrl(lat,lng){return `https://maps.google.com/?q=${lat},${lng}`;}

  function addM7(leaf,coords,nom,desc,url,fav){
    const def=POI_LEAF_DEFS[leaf];
    const col=def?def.color:'#94a3b8', emoji=def?def.emoji:'📌';
    const popup=`<b style="color:${col}">${fav?'⭐ ':''}${nom}</b>`+(desc?`<br><small style="color:#6aab7a">${String(desc).slice(0,90)}</small>`:'')+( url?`<br><a href="${url}" target="_blank" style="color:#6abf70;font-size:0.75rem">📍 Maps</a>`:'');
    const m=L.marker(coords,{icon:L.divIcon({html:`<span style="font-size:1.1rem;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.6))">${emoji}</span>`,iconSize:[22,22],iconAnchor:[11,11],className:''})}).bindPopup(popup);
    m.addTo(_poiMap7);
    _poiMarkerData7.push({marker:m,leaf,parent:def?def.parent:'altres',fav:!!fav});
    _poiLeafCounts7[leaf]=(_poiLeafCounts7[leaf]||0)+1;
  }

  const impObj=(typeof IMPRESCINDIBLES!=='undefined')?IMPRESCINDIBLES:{};
  POI_DATA.forEach(p=>{
    if(!isSJ(p.illa)) return;
    if(typeof p.lat!=='number'||typeof p.lng!=='number') return;
    const leaf=meLeaf(p.cat,p.sub);
    if(!leaf) return;
    let desc=p.zona||'';
    if(leaf==='imprescindibles'){const d=impObj[p.id];if(d)desc=d.zona||desc;}
    addM7(leaf,[p.lat,p.lng],p.nom,desc,mapsUrl(p.lat,p.lng),p.d===true);
  });

  _poiActiveLeafs7=new Set(Object.keys(_poiLeafCounts7));
  if(_poiMarkerData7.length)_poiMap7.fitBounds(L.featureGroup(_poiMarkerData7.map(d=>d.marker)).getBounds(),{padding:[30,30]});
  _renderPOIBar7(); _applyPOIFilters7();
}

function _renderPOIBar7(){
  const bar=document.getElementById('poi-filter-bar-d7');
  if(!bar)return;
  const mc={};
  Object.entries(_poiLeafCounts7).forEach(([leaf,n])=>{const p=POI_LEAF_DEFS[leaf]?.parent;if(p)mc[p]=(mc[p]||0)+n;});
  let html='<div class="poi-filter-row poi-filter-row-main">';
  Object.entries(POI_MAIN_DEFS).forEach(([mainId,def])=>{const n=mc[mainId]||0;if(!n)return;html+=`<button class="poi-filter-pill active" data-main-d7="${mainId}" onclick="poiToggleMainD7('${mainId}')">${def.emoji} ${def.label} <span style="opacity:0.55;font-size:0.68em">(${n})</span></button>`;});
  html+='</div>';
  Object.entries(POI_MAIN_DEFS).forEach(([mainId,def])=>{
    if(!def.hasSubs)return;
    const leafs=Object.entries(POI_LEAF_DEFS).filter(([leaf,ld])=>ld.parent===mainId&&_poiLeafCounts7[leaf]);
    if(!leafs.length)return;
    html+=`<div class="poi-filter-row poi-filter-row-sub" data-parent-d7="${mainId}">`;
    leafs.forEach(([leaf,ld])=>{html+=`<button class="poi-filter-pill sub active" data-leaf-d7="${leaf}" data-main-d7="${mainId}" onclick="poiToggleLeafD7('${leaf}')">${ld.emoji} ${ld.label} <span style="opacity:0.55;font-size:0.68em">(${_poiLeafCounts7[leaf]})</span></button>`;});
    html+='</div>';
  });
  html+=`<div class="poi-filter-row poi-filter-actions"><button class="poi-filter-pill poi-filter-all" onclick="poiShowAllD7()">☑ Mostrar tot</button><button class="poi-filter-pill poi-filter-clear" onclick="poiClearD7()">✕ Netejar filtres</button><button class="poi-filter-pill poi-filter-favs" id="poi-favs-btn-d7" onclick="poiToggleFavsD7()">⭐ Només favorits</button></div>`;
  bar.innerHTML=html;
}
function _updMainD7(mainId){const leafs=Object.entries(POI_LEAF_DEFS).filter(([l,ld])=>ld.parent===mainId&&_poiLeafCounts7[l]).map(([l])=>l);if(!leafs.length)return;const ac=leafs.filter(l=>_poiActiveLeafs7.has(l)).length;const btn=document.querySelector(`.poi-filter-pill[data-main-d7="${mainId}"]:not(.sub)`);if(!btn)return;btn.classList.remove('active','partial');if(ac===leafs.length)btn.classList.add('active');else if(ac>0)btn.classList.add('partial');}
function _applyPOIFilters7(){_poiMarkerData7.forEach(d=>{const show=_poiActiveLeafs7.has(d.leaf)&&(!_poiFavOnly7||d.fav);if(show){if(!_poiMap7.hasLayer(d.marker))d.marker.addTo(_poiMap7);}else{if(_poiMap7.hasLayer(d.marker))d.marker.remove();}});}
function poiToggleLeafD7(leaf){const btn=document.querySelector(`.poi-filter-pill.sub[data-leaf-d7="${leaf}"]`);if(!btn)return;if(_poiActiveLeafs7.has(leaf)){_poiActiveLeafs7.delete(leaf);btn.classList.remove('active');}else{_poiActiveLeafs7.add(leaf);btn.classList.add('active');}const parent=POI_LEAF_DEFS[leaf]?.parent;if(parent)_updMainD7(parent);_applyPOIFilters7();}
function poiToggleMainD7(mainId){const leafs=Object.entries(POI_LEAF_DEFS).filter(([l,ld])=>ld.parent===mainId&&_poiLeafCounts7[l]).map(([l])=>l);if(!leafs.length)return;const turnOn=leafs.filter(l=>_poiActiveLeafs7.has(l)).length<leafs.length;leafs.forEach(leaf=>{if(turnOn)_poiActiveLeafs7.add(leaf);else _poiActiveLeafs7.delete(leaf);const sb=document.querySelector(`.poi-filter-pill.sub[data-leaf-d7="${leaf}"]`);if(sb)sb.classList.toggle('active',turnOn);});_updMainD7(mainId);_applyPOIFilters7();}
function poiShowAllD7(){_poiActiveLeafs7=new Set(Object.keys(_poiLeafCounts7));document.querySelectorAll('#poi-filter-bar-d7 .poi-filter-pill[data-leaf-d7],#poi-filter-bar-d7 .poi-filter-pill[data-main-d7]').forEach(b=>{b.classList.remove('partial');b.classList.add('active');});_applyPOIFilters7();}
function poiClearD7(){_poiActiveLeafs7=new Set();document.querySelectorAll('#poi-filter-bar-d7 .poi-filter-pill[data-leaf-d7],#poi-filter-bar-d7 .poi-filter-pill[data-main-d7]').forEach(b=>b.classList.remove('active','partial'));_applyPOIFilters7();}
function poiToggleFavsD7(){_poiFavOnly7=!_poiFavOnly7;const btn=document.getElementById('poi-favs-btn-d7');if(btn)btn.classList.toggle('active',_poiFavOnly7);_applyPOIFilters7();}


/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Day pills
  document.querySelectorAll('.itin-day-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const n = parseInt(btn.dataset.dia);
      if (!isNaN(n)) showDia(n);
    });
  });

  // Tooltips
  setupTooltips();

  // Accordions
  setupAccordions();

  // Render restaurants (list format for dia 2)
  renderRestList('#rests-sete-cidades', RESTS_SETE_CIDADES);
  renderRestList('#rests-ponta-delgada', RESTS_PONTA_DELGADA);

  // Perfils d'elevació (GPX reals) — colors que destaquen, no verds
  const elevPrc05 = document.getElementById('elev-prc05');
  if (elevPrc05) elevPrc05.innerHTML = buildElevSvgStatic(PROFILE_PRC05_MOD, '#f59e0b');
  const elevGrota = document.getElementById('elev-grota');
  if (elevGrota) elevGrota.innerHTML = buildElevSvgStatic(PROFILE_GROTA_INFERNO, '#22d3ee');

  // Dia 6 restaurants + elevació
  renderRestList('#rests-furnas-rapid', RESTS_FURNAS_RAPID);
  renderRestList('#rests-furnas', RESTS_FURNAS);
  const e6prc06 = document.getElementById('elev-prc06');
  if (e6prc06) e6prc06.innerHTML = buildElevSvgStatic(PROFILE_D6_PRC06, '#2563eb');
  const e6tm16 = document.getElementById('elev-tm16');
  if (e6tm16) e6tm16.innerHTML = buildElevSvgStatic(PROFILE_D6_TM16, '#6abf70');

  // Dia 5 restaurants + elevació
  renderRestList('#rests-povoacio', RESTS_POVOACIO);
  const ep = {'elev-tm06': [PROFILE_D5_TM06,'#6abf70'], 'elev-poco-azul': [PROFILE_D5_POCO_AZUL,'#22d3ee'], 'elev-prc09': [PROFILE_D5_PRC09,'#6abf70'], 'elev-cagarrao': [PROFILE_D5_CAGARRAO,'#f59e0b']};
  Object.entries(ep).forEach(([id,[prof,col]])=>{const el=document.getElementById(id);if(el)el.innerHTML=buildElevSvgStatic(prof,col);});

  // Render restaurants (list format for dia 4)
  renderRestList('#rests-ribera-platja', RESTS_RIBEIRA_PLATJA);
  renderRestList('#rests-ribera-centre', RESTS_RIBEIRA_CENTRE);
  renderRestList('#rests-caloura', RESTS_CALOURA);

  // Perfils d'elevació dia 4 (colors que destaquen)
  const elevPrc28 = document.getElementById('elev-prc28');
  if (elevPrc28) elevPrc28.innerHTML = buildElevSvgStatic(PROFILE_D4_PRC28, '#6abf70');
  const elevLombadas = document.getElementById('elev-lombadas');
  if (elevLombadas) elevLombadas.innerHTML = buildElevSvgStatic(PROFILE_D4_LOMBADAS, '#f59e0b');

  // Render restaurants (list format for dia 3)
  renderRestList('#rests-vfc', RESTS_VILA_FRANCA);

  // Perfil d'elevació PRC37 (verd oficial)
  const elevPrc37 = document.getElementById('elev-prc37');
  if (elevPrc37) elevPrc37.innerHTML = buildElevSvgStatic(PROFILE_PRC37_SMI, '#6abf70');

  // Show dia 1 by default and init its maps
  showDia(1);
});

/* ── DESCARREGAR GPX ─────────────────────────────────────── */
function downloadGpx(filename) {
  const a = document.createElement('a');
  a.href = 'gpx/' + filename;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
