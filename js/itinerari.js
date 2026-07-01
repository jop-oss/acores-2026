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
let mapsInitDia = { 1: false, 2: false, 3: false, 4: false };

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
  if (n === 1 && !mapsInitDia[1]) {
    mapsInitDia[1] = true;
    setTimeout(() => { initMapCotxes(); initMapAllotjament1(); }, 100);
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
