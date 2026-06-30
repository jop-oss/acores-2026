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
