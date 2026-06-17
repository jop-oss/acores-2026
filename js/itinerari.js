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
    coords: [37.8426, -25.7614],
    desc: 'Llac d\'aigües blaves intenses envoltat d\'hortènsies i bosc. Punt de partida de la caminada cap a Boca do Inferno.',
    maps: 'https://maps.google.com/?q=37.8426,-25.7614',
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
  // No a la BD — hardcodejats sense foto
  {
    nom: 'O Nuno - O Rei das Bifanas', preu: '€', punt: null,
    lat: 37.8619, lon: -25.7952,
    ta: null,
    gm: 'https://maps.google.com/?q=O+Nuno+Sete+Cidades',
    foto: null,
  },
  {
    nom: 'Green Love Restaurant', preu: '€€', punt: null,
    lat: 37.8607, lon: -25.7935,
    ta: null,
    gm: 'https://maps.google.com/?q=Green+Love+Restaurant+Sete+Cidades',
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
    nom: 'Azores Forever Diner', preu: '€', punt: 4.7, top10: false, rec: false,
    lat: 37.7398522, lon: -25.6688895,
    ta: 'https://www.tripadvisor.es/Restaurant_Review-g189135-d13487528-Reviews-Azores_Forever_Snack_Bar_and_takeaway-Ponta_Delgada_Sao_Miguel_Azores.html?m=66827',
    gm: 'https://www.google.com/maps/place/?q=place_id:ChIJX65JCLYqQwsRKDqCbYA2b6A',
    foto: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AU_ZVEF9etfPVExEgllVV0xTiouStq7CWr2FPwDLbpbEzNQnZgUuh6cuxZES3tQ3-hisqPuF9whfueVXkKFiPm_e1sLr9N33K_yy8l8pQZpnjExJBz4bXcm7DMqWKudOn25ArXL1NiO8B3XWKBsoCPTBdE-WN8KW29pjD-wyxNjpMQzUj_MnalhQN8MlJFv2QZLlj2jzdZ_xHAB0V6x9tMsxDuATc1MXa3YCMLtFlNaQQYxwUz2hlDPMm6vEEq3J_FCPcR-tiUY3d4FK2SDoke6c4438bKSozMmljUcLH7LOVruQX4y6FVwCh1nHTbIcXqDeCGZqopuOTbHOTMOxPpVXtLatva_5_bqdRkwT4dtPwF58by6Wr2Q64W3fy9gKNWvOxarFEtcxVRSc_68Xumua7WUSwuGYqHVFlE3tSixCLeb8fuPA&key=AIzaSyDnvUnUEUUUrBiyaArGEHSQln_6A2Q_A84',
  },
];

const PDL_COORDS = [37.74239, -25.67375];

/* ── ROUTE WAYPOINTS DIA 2 ───────────────────────────────── */
const DIA2_WAYPOINTS = [
  { nom: 'Mirador Pico do Carvão', coords: [37.81916, -25.75109], icon: '🔭' },
  { nom: 'Aqueduto + Empadadas', coords: [37.82438, -25.74698], icon: '🌿', offroad: true },
  { nom: 'Boca do Inferno', coords: [37.84285, -25.76362], icon: '🔭' },
  { nom: 'Vista do Rei', coords: [37.83929, -25.79493], icon: '🔭' },
  { nom: 'Sete Cidades', coords: [37.85574, -25.78630], icon: '🏘️' },
  { nom: 'Mosteiros', coords: [37.88846, -25.82408], icon: '🏖️' },
  { nom: 'Ponta do Escalvado', coords: [37.87122, -25.84133], icon: '🔭' },
  { nom: 'Ponta da Ferraria', coords: [37.85859, -25.85236], icon: '🌋' },
];

// ORS routing: start + only road-accessible waypoints + end
const DIA2_ORS_COORDS = [
  PDL_COORDS,
  ...DIA2_WAYPOINTS.filter(w => !w.offroad).map(w => w.coords),
  PDL_COORDS,
];

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

// Map for the Dia 2 route (ORS)
// Map for the Dia 2 route — markers only, no route line
function initMapRuta() {
  const el = document.getElementById('map-ruta-d2');
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
  DIA2_WAYPOINTS.forEach((wp, i) => {
    L.marker(wp.coords, { icon: numberIcon(i + 1, COL_SM), zIndexOffset: 100 })
      .addTo(map).bindPopup(`<b>${i + 1}. ${wp.nom}</b>`);
  });

  const allCoords = [PDL_COORDS, ...DIA2_WAYPOINTS.map(w => w.coords)];
  map.fitBounds(L.latLngBounds(allCoords), { padding: [30, 30] });
}

/* ── ROUTE MAP FLIP ──────────────────────────────────────── */
function flipMapRoute() {
  const wrap = document.getElementById('map-ruta-flip');
  const btn  = document.getElementById('map-flip-btn');
  if (!wrap) return;
  const isFlipped = wrap.classList.toggle('flipped');
  if (btn) btn.textContent = isFlipped ? '🗺 Torna al mapa' : '📍 Veure ruta Google Maps';
}

function fallbackPolyline(map, coords) {
  L.polyline(coords, { color: COL_SM, weight: 3, opacity: 0.6, dashArray: '8, 8' }).addTo(map);
}

/* ── GPS TRACKS (de ME_RUTES_SENDERISME) ─────────────────── */
const TRACK_PRC05_SMI = [[37.82611,-25.74162],[37.82671,-25.74273],[37.8265,-25.7432],[37.82634,-25.74347],[37.8259,-25.7441],[37.82541,-25.74549],[37.82504,-25.747],[37.82514,-25.74782],[37.82509,-25.74853],[37.82625,-25.7495],[37.82671,-25.75025],[37.82625,-25.75034],[37.82631,-25.75056],[37.82711,-25.75097],[37.82839,-25.75181],[37.82917,-25.75258],[37.8302,-25.75398],[37.83098,-25.75496],[37.83137,-25.75563],[37.83164,-25.75601],[37.83253,-25.75634],[37.83241,-25.75652],[37.83188,-25.75652],[37.83195,-25.75723],[37.83198,-25.75746],[37.832,-25.75789],[37.83253,-25.75835],[37.83315,-25.75865],[37.83336,-25.75882],[37.83368,-25.75886],[37.83439,-25.75846],[37.83499,-25.75907],[37.83481,-25.76084],[37.83484,-25.76142],[37.83533,-25.76182],[37.83587,-25.76247],[37.83631,-25.7627],[37.83737,-25.76302],[37.83797,-25.76285],[37.83872,-25.76288],[37.83903,-25.76326],[37.83966,-25.7626],[37.84042,-25.76259],[37.84109,-25.76277],[37.84195,-25.76265],[37.84246,-25.76275],[37.84262,-25.76324],[37.84254,-25.76139],[37.84236,-25.76072],[37.84024,-25.76034],[37.8389,-25.75953],[37.8378,-25.75862],[37.83704,-25.75819],[37.83677,-25.75867],[37.8365,-25.7591],[37.83554,-25.75832],[37.83477,-25.75853],[37.83397,-25.75852],[37.83366,-25.75887],[37.83312,-25.75864],[37.8323,-25.75829],[37.83197,-25.75779],[37.83199,-25.75744],[37.83188,-25.75652],[37.83175,-25.75605],[37.83106,-25.75508],[37.83086,-25.7553],[37.83011,-25.75506],[37.82975,-25.75492],[37.82929,-25.75568],[37.82856,-25.75572],[37.82727,-25.75473],[37.82704,-25.7545],[37.82654,-25.75428],[37.82631,-25.75395],[37.82643,-25.75496],[37.82618,-25.75499],[37.8259,-25.75496],[37.82482,-25.75503],[37.8244,-25.75399],[37.82345,-25.75231],[37.82181,-25.75083],[37.82076,-25.75012],[37.81962,-25.74825],[37.81921,-25.7455],[37.81871,-25.74512],[37.81885,-25.74404],[37.81962,-25.74354],[37.82068,-25.74299],[37.82157,-25.74271],[37.822,-25.74192],[37.82281,-25.74158],[37.82381,-25.74126],[37.82502,-25.74136],[37.82605,-25.74159]];
const TRACK_PR04_SMI = [[37.83175,-25.75298],[37.83198,-25.75267],[37.83182,-25.75231],[37.83201,-25.75201],[37.8325,-25.75193],[37.83341,-25.75186],[37.83387,-25.75195],[37.83426,-25.75216],[37.83522,-25.75266],[37.83665,-25.75355],[37.83773,-25.75456],[37.83937,-25.75578],[37.84085,-25.75608],[37.84153,-25.75651],[37.84187,-25.75664],[37.84297,-25.75711],[37.84517,-25.75801],[37.84579,-25.75827],[37.84653,-25.758],[37.84773,-25.75789],[37.84837,-25.75813],[37.84864,-25.76005],[37.84912,-25.75981],[37.85046,-25.76025],[37.85205,-25.76],[37.85344,-25.75983],[37.8538,-25.75962],[37.85513,-25.75965],[37.85689,-25.75958],[37.85741,-25.75982],[37.85849,-25.76045],[37.86082,-25.76168],[37.86295,-25.76176],[37.86421,-25.76186],[37.8653,-25.76231],[37.8667,-25.76257],[37.86823,-25.76252],[37.86996,-25.76287],[37.87104,-25.76325],[37.87244,-25.76355],[37.87409,-25.76461],[37.87563,-25.76704],[37.87634,-25.7689],[37.8768,-25.76985],[37.87767,-25.77063],[37.87841,-25.77206],[37.87948,-25.77413],[37.88013,-25.77655],[37.88044,-25.77789],[37.88117,-25.77829],[37.88164,-25.77905],[37.88108,-25.78064],[37.88022,-25.78654],[37.8794,-25.78769],[37.8791,-25.78973],[37.87953,-25.79152],[37.87861,-25.79229],[37.87944,-25.79464],[37.8791,-25.79563],[37.87779,-25.79681],[37.87699,-25.79874],[37.87629,-25.80105],[37.87442,-25.80244],[37.87297,-25.80135],[37.87185,-25.8008],[37.87073,-25.79985],[37.87041,-25.79923],[37.86985,-25.79834],[37.86914,-25.79739],[37.86847,-25.79653],[37.86722,-25.79556],[37.86609,-25.79412],[37.86368,-25.79277],[37.86133,-25.79296],[37.86311,-25.79611],[37.86304,-25.79689]];
const TRACK_PR03_SMI = [[37.83942,-25.79516],[37.8395,-25.7953],[37.83976,-25.79603],[37.84045,-25.7974],[37.84092,-25.79838],[37.84128,-25.79924],[37.84203,-25.80063],[37.84269,-25.8022],[37.84387,-25.80435],[37.84477,-25.80565],[37.84581,-25.80765],[37.84647,-25.80826],[37.84694,-25.80917],[37.84762,-25.81026],[37.84823,-25.81118],[37.84929,-25.8121],[37.85035,-25.81218],[37.85143,-25.81291],[37.85222,-25.8133],[37.85313,-25.81357],[37.85468,-25.81411],[37.85627,-25.81435],[37.85765,-25.81446],[37.85882,-25.81433],[37.85965,-25.8152],[37.86078,-25.81626],[37.86171,-25.81641],[37.86273,-25.816],[37.86406,-25.81606],[37.8651,-25.81593],[37.86683,-25.81571],[37.86817,-25.81558],[37.86914,-25.81433],[37.86972,-25.81454],[37.87072,-25.81371],[37.87183,-25.81234],[37.8723,-25.81165],[37.87292,-25.8108],[37.87335,-25.80922],[37.87322,-25.80563],[37.8731,-25.80543],[37.87339,-25.80382],[37.87429,-25.80259],[37.87309,-25.80145],[37.87215,-25.80099],[37.87051,-25.79938],[37.8695,-25.798],[37.86877,-25.79659],[37.86757,-25.79598],[37.8666,-25.79507],[37.86569,-25.79373],[37.86451,-25.79285],[37.8637,-25.79278],[37.86245,-25.79475],[37.86304,-25.79689]];

const SEND_TRACKS = [
  { track: TRACK_PRC05_SMI, color: '#dc2626', label: 'PRC05 · Serra Devassa' },
  { track: TRACK_PR04_SMI,  color: '#2563eb', label: 'PR04 · Mata do Canário' },
  { track: TRACK_PR03_SMI,  color: '#16a34a', label: 'PR03 · Vista do Rei' },
];

/* ── SENDERISME MAP (amb tracks reals) ───────────────────── */
function initMapSenderisme() {
  const el = document.getElementById('map-senderisme');
  if (!el || el._leaflet_id) return;
  const map = L.map(el, { zoomControl: false, scrollWheelZoom: false });
  L.control.zoom({ position: 'topright' }).addTo(map);
  leafletTiles(map);

  const allCoords = [];
  SEND_TRACKS.forEach(t => {
    L.polyline(t.track, { color: t.color, weight: 3.5, opacity: 0.9 })
      .addTo(map).bindTooltip(t.label, { sticky: true });
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
    div.innerHTML = SEND_TRACKS.map(t =>
      `<div><span style="color:${t.color};font-weight:700;font-size:14px">—</span> ${t.label}</div>`
    ).join('');
    return div;
  };
  legend.addTo(map);
  map.fitBounds(L.latLngBounds(allCoords), { padding: [20, 20] });
}

/* ── POI MAP — CATEGORIES ────────────────────────────────── */
const POI_CATS = [
  { id: 'imprescindibles', label: '⭐ Imprescindibles' },
  { id: 'restaurants',     label: '🍽️ Restaurants' },
  { id: 'allotjaments',    label: '🏠 Allotjaments' },
  { id: 'miradors',        label: '🔭 Miradors' },
  { id: 'piscines',        label: '🏊 Piscines naturals' },
  { id: 'platges',         label: '🏖️ Platges' },
  { id: 'naturalesa',      label: '🌿 Naturalesa' },
  { id: 'termals',         label: '♨️ Aigues Termals' },
  { id: 'coves',           label: '🕳️ Coves' },
  { id: 'fars',            label: '🔦 Fars' },
  { id: 'jardins',         label: '🌺 Jardins Botànics' },
  { id: 'pobles',          label: '🏘️ Pobles' },
  { id: 'altres',          label: '📌 Altres' },
  { id: 'senderisme',      label: '🥾 Senderisme' },
];
const POI_CAT_COLORS = {
  imprescindibles: '#fbbf24', restaurants: '#f97316', allotjaments: '#8b5cf6',
  miradors: '#a78bfa', piscines: '#38bdf8', platges: '#fbbf24',
  naturalesa: '#34d399', termals: '#f87171', coves: '#92400e',
  fars: '#e2e8f0', jardins: '#ec4899', pobles: '#6abf70',
  altres: '#94a3b8', senderisme: '#d97706',
};
const POI_CAT_EMOJIS = {
  imprescindibles: '⭐', restaurants: '🍽️', allotjaments: '🏠',
  miradors: '🔭', piscines: '🏊', platges: '🏖️',
  naturalesa: '🌿', termals: '♨️', coves: '🕳️',
  fars: '🔦', jardins: '🌺', pobles: '🏘️',
  altres: '📌', senderisme: '🥾',
};

function meCategoria(cat) {
  const m = {
    'Miradors': 'miradors', 'Piscines': 'piscines', 'Platges': 'platges',
    'Naturalesa': 'naturalesa', 'Aigues Termals': 'termals', 'Coves': 'coves',
    'Fars': 'fars', 'Jardins Botànics': 'jardins', 'Pobles': 'pobles',
  };
  return m[cat] || 'altres';
}

let _poiMap = null, _poiMarkers = {};

function initMapPOID2() {
  const el = document.getElementById('map-poi-d2');
  if (!el || el._leaflet_id) return;

  _poiMap = L.map(el, { zoomControl: false, scrollWheelZoom: true });
  L.control.zoom({ position: 'topright' }).addTo(_poiMap);
  leafletTiles(_poiMap);
  _poiMarkers = {};

  // Helpers
  function parseCoords(s) {
    if (!s) return null;
    const p = String(s).split(',').map(x => parseFloat(x.trim()));
    return (p.length >= 2 && !isNaN(p[0]) && !isNaN(p[1])) ? [p[0], p[1]] : null;
  }
  function isWestSM(lat, lng) {
    return lat > 37.70 && lat < 37.97 && lng < -25.58 && lng > -26.1;
  }
  function isSM(illa) {
    return illa === 'São Miguel' || illa === 'Sao Miguel' || illa === 'sm';
  }
  function addMarker(cat, coords, nom, desc, mapsUrl) {
    const col = POI_CAT_COLORS[cat] || '#94a3b8';
    const emoji = POI_CAT_EMOJIS[cat] || '📌';
    const popup = `<b style="color:${col}">${nom}</b>` +
      (desc ? `<br><small style="color:#6aab7a">${String(desc).slice(0, 90)}…</small>` : '') +
      (mapsUrl ? `<br><a href="${mapsUrl}" target="_blank" style="color:#6abf70;font-size:0.75rem">📍 Maps</a>` : '');
    const m = L.marker(coords, {
      icon: L.divIcon({
        html: `<span style="font-size:1.1rem;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.6))">${emoji}</span>`,
        iconSize: [22, 22], iconAnchor: [11, 11], className: ''
      })
    }).bindPopup(popup);
    m.addTo(_poiMap);
    if (!_poiMarkers[cat]) _poiMarkers[cat] = [];
    _poiMarkers[cat].push(m);
  }

  // 1. ME_LLOCS (305 llocs)
  if (typeof ME_LLOCS !== 'undefined') {
    ME_LLOCS.forEach(l => {
      if (!isSM(l.illa)) return;
      const c = parseCoords(l.coords);
      if (!c || !isWestSM(c[0], c[1])) return;
      addMarker(meCategoria(l.categoria), c, l.nom, l.desc,
        `https://maps.google.com/?q=${c[0]},${c[1]}`);
    });
  }

  // 2. IMPRESCINDIBLES (24 llocs, 4 illes)
  if (typeof IMPRESCINDIBLES !== 'undefined') {
    IMPRESCINDIBLES.filter(l => isSM(l.illa)).forEach(l => {
      const c = l.coords || (l.lat ? [l.lat, l.lng || l.lon] : null);
      if (!c || !isWestSM(c[0], c[1])) return;
      addMarker('imprescindibles', c, l.nom, l.desc, l.maps || `https://maps.google.com/?q=${c[0]},${c[1]}`);
    });
  }

  // 3. RESTAURANTS (SM, zona oest)
  if (typeof RESTAURANTS !== 'undefined') {
    RESTAURANTS.filter(r => isSM(r.illa) && r.lat && r.lon && isWestSM(r.lat, r.lon)).forEach(r => {
      addMarker('restaurants', [r.lat, r.lon], r.nom,
        r.localitat, r.googlemaps || `https://maps.google.com/?q=${r.lat},${r.lon}`);
    });
  }

  // 4. Allotjament (dia 2)
  addMarker('allotjaments', [37.74239, -25.67375], 'Santo Cristo House',
    'Allotjament dies 1–3', 'https://maps.google.com/?q=37.74239,-25.67375');

  // 5. ME_RUTES_SENDERISME (inici de rutes, SM zona oest)
  if (typeof ME_RUTES_SENDERISME !== 'undefined') {
    ME_RUTES_SENDERISME.filter(r => isSM(r.illa)).forEach(r => {
      const c = r.coords_inici || r.start;
      if (!c || !isWestSM(c[0], c[1])) return;
      addMarker('senderisme', c, `${r.codi} · ${r.nom}`,
        `${r.km} km · ${r.dificultat}`, `https://maps.google.com/?q=${c[0]},${c[1]}`);
    });
  }

  // Fit bounds
  const allM = Object.values(_poiMarkers).flat();
  if (allM.length) {
    _poiMap.fitBounds(L.featureGroup(allM).getBounds(), { padding: [30, 30] });
  }

  // Render filter pills (only show categories that have markers)
  _renderPOIBar();
}

function _renderPOIBar() {
  const bar = document.getElementById('poi-filter-bar');
  if (!bar) return;
  const pills = POI_CATS
    .filter(c => (_poiMarkers[c.id] || []).length > 0)
    .map(c => {
      const n = (_poiMarkers[c.id] || []).length;
      return `<button class="poi-filter-pill active" data-cat="${c.id}" onclick="filterPOI('${c.id}',this)">${c.label} <span style="opacity:0.55;font-size:0.68em">(${n})</span></button>`;
    }).join('');
  bar.innerHTML = pills +
    `<button class="poi-filter-pill poi-filter-all" onclick="showAllPOIFilters()" style="margin-left:6px;border-color:rgba(106,171,122,0.5);color:#6aab7a">☑ Tot</button>` +
    `<button class="poi-filter-pill poi-filter-clear" onclick="clearPOIFilters()">✕ Netejar</button>`;
}

function filterPOI(cat, btn) {
  btn.classList.toggle('active');
  const show = btn.classList.contains('active');
  (_poiMarkers[cat] || []).forEach(m => show ? m.addTo(_poiMap) : m.remove());
}

function showAllPOIFilters() {
  document.querySelectorAll('#poi-filter-bar .poi-filter-pill[data-cat]').forEach(b => {
    if (!b.classList.contains('active')) {
      b.classList.add('active');
      (_poiMarkers[b.dataset.cat] || []).forEach(m => m.addTo(_poiMap));
    }
  });
}

function clearPOIFilters() {
  document.querySelectorAll('#poi-filter-bar .poi-filter-pill[data-cat]').forEach(b => {
    b.classList.remove('active');
  });
  Object.values(_poiMarkers).flat().forEach(m => m.remove());
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
let mapsInitDia = { 1: false, 2: false };

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
  if (n === 2 && !mapsInitDia[2]) {
    mapsInitDia[2] = true;
    setTimeout(() => {
      initMapRuta();
      initMapSenderisme();
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
    const nobd = (!r.ta && !r.foto)
      ? `<span class="rest-list-nobd"> (sense fitxa)</span>` : '';
    const fitxa = `<a href="restaurants.html#rest-${slugify(r.nom)}" class="rest-list-link">Fitxa</a>`;
    const maps = r.gm
      ? `<a href="${r.gm}" target="_blank" class="rest-list-link">📍 Maps</a>` : '';
    return `<div class="rest-list-item">
      <span class="rest-list-nom">${r.nom}${star}${nobd}</span>
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

  // Show dia 1 by default and init its maps
  showDia(1);
});
