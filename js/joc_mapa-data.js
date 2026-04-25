// ── DADES JOC MAPA ────────────────────────────────────────────
// Puntuació: < 5km = 10pts | 5-20km = 5pts | 20-50km = 2pts | > 50km = 0pts
// Categoria: 'ciutat' | 'paisatge' | 'platja' | 'volca'
// trampa: true = lloc d'una altra illa (no de les 4 visitades)

const LLOCS_MAPA = [

  // ── SÃO MIGUEL (25) ──────────────────────────────────────────
  { id:  1, nom: 'Ponta Delgada',              illa: 'São Miguel', categoria: 'ciutat',   lat: 37.7412, lon: -25.6756, trampa: false, foto: 'img/joc_mapa/01_ponta_delgada.jpg',                       desc: 'Capital de les Açores i principal port de São Miguel.' },
  { id:  2, nom: 'Lagoa das Sete Cidades',     illa: 'São Miguel', categoria: 'paisatge', lat: 37.8378, lon: -25.7844, trampa: false, foto: 'img/joc_mapa/02_sete_cidades.webp',                        desc: 'Llac volcànic amb dos colors d\'aigua, verd i blau.' },
  { id:  3, nom: 'Furnas',                     illa: 'São Miguel', categoria: 'paisatge', lat: 37.7728, lon: -25.3194, trampa: false, foto: 'img/joc_mapa/03_furnas.jpg',                               desc: 'Vall geotèrmica famosa pels seus geisers i fumaroles.' },
  { id:  4, nom: 'Lagoa do Fogo',              illa: 'São Miguel', categoria: 'paisatge', lat: 37.7639, lon: -25.4694, trampa: false, foto: 'img/joc_mapa/04_lagoa_do_fogo.jpg',                        desc: 'El Llac del Foc, al cràter d\'un volcà al centre de l\'illa.' },
  { id:  5, nom: 'Ribeira Grande',             illa: 'São Miguel', categoria: 'ciutat',   lat: 37.8327, lon: -25.5169, trampa: false, foto: 'img/joc_mapa/05_ribeira_grande.jpg',                       desc: 'Segona ciutat de São Miguel, a la costa nord.' },
  { id:  6, nom: 'Vila Franca do Campo',       illa: 'São Miguel', categoria: 'ciutat',   lat: 37.7151, lon: -25.4318, trampa: false, foto: 'img/joc_mapa/06_vila_franca_do_campo.jpg',                 desc: 'Antiga capital amb un illot volcànic davant.' },
  { id:  7, nom: 'Nordeste',                   illa: 'São Miguel', categoria: 'ciutat',   lat: 37.8344, lon: -25.1756, trampa: false, foto: 'img/joc_mapa/07_nordeste.jpg',                             desc: 'Poble a l\'extrem nord-est, envoltat de verd intens.' },
  { id:  8, nom: 'Povoação',                   illa: 'São Miguel', categoria: 'ciutat',   lat: 37.7508, lon: -25.2394, trampa: false, foto: 'img/joc_mapa/08_povoacao.jpg',                             desc: 'Un dels primers assentaments portuguesos a les Açores.' },
  { id:  9, nom: 'Praia dos Mosteiros',        illa: 'São Miguel', categoria: 'platja',   lat: 37.8897, lon: -25.8244, trampa: false, foto: 'img/joc_mapa/09_praia_dos_mosteiros.png',                  desc: 'Platja de sorra negra volcànica a l\'extrem oest.' },
  { id: 10, nom: 'Caldeira Velha',             illa: 'São Miguel', categoria: 'paisatge', lat: 37.7978, lon: -25.4806, trampa: false, foto: 'img/joc_mapa/10_caldeira_velha.jpg',                       desc: 'Cascada termal amb aigües de color verd esmeralda.' },
  { id: 11, nom: 'Miradouro da Boca do Inferno', illa: 'São Miguel', categoria: 'paisatge', lat: 37.8611, lon: -25.5083, trampa: false, foto: 'img/joc_mapa/11_miradouro_da_boca_do_inferno.webp',     desc: 'Mirador espectacular sobre els penya-segats de la costa nord.' },
  { id: 12, nom: 'Lagoa das Furnas',           illa: 'São Miguel', categoria: 'paisatge', lat: 37.7556, lon: -25.2983, trampa: false, foto: 'img/joc_mapa/12_lagoa_das_furnas.webp',                    desc: 'Llac volcànic on es couen les "cozidas" sota terra.' },
  { id: 13, nom: 'Ponta da Ferraria',          illa: 'São Miguel', categoria: 'paisatge', lat: 37.8736, lon: -25.8469, trampa: false, foto: 'img/joc_mapa/13_ponta_da_ferraria.webp',                   desc: 'Piscines naturals on l\'aigua termal es barreja amb l\'oceà.' },
  { id: 14, nom: 'Praia de Santa Bárbara',     illa: 'São Miguel', categoria: 'platja',   lat: 37.8419, lon: -25.5197, trampa: false, foto: 'img/joc_mapa/14_praia_de_santa_barbara.webp',              desc: 'Platja de sorra negra popular entre els surfistes.' },
  { id: 15, nom: 'Miradouro do Pico do Ferro', illa: 'São Miguel', categoria: 'paisatge', lat: 37.7831, lon: -25.3033, trampa: false, foto: 'img/joc_mapa/15_miradouro_do_pico_do_ferro.jpg',           desc: 'Vista panoràmica sobre la Lagoa das Furnas.' },
  { id: 16, nom: 'Sete Cidades (poble)',       illa: 'São Miguel', categoria: 'ciutat',   lat: 37.8572, lon: -25.7917, trampa: false, foto: 'img/joc_mapa/16_setess_cidades_poble.jpg',                 desc: 'Petit poble dins la caldera del volcà de les Sete Cidades.' },
  { id: 17, nom: 'Praia do Pópulo',            illa: 'São Miguel', categoria: 'platja',   lat: 37.7311, lon: -25.6394, trampa: false, foto: 'img/joc_mapa/17_praia_do_populo.jpg',                      desc: 'Platja urbana de Ponta Delgada.' },
  { id: 18, nom: 'Lagoa do Congro',            illa: 'São Miguel', categoria: 'paisatge', lat: 37.7283, lon: -25.3944, trampa: false, foto: 'img/joc_mapa/18_lagoa_do_congro.webp',                     desc: 'Llac volcànic ocult enmig d\'una densa vegetació.' },
  { id: 19, nom: 'Miradouro da Grota do Inferno', illa: 'São Miguel', categoria: 'paisatge', lat: 37.8608, lon: -25.6447, trampa: false, foto: 'img/joc_mapa/19_miradouro_da_grota_do_inferno.webp',   desc: 'Mirador sobre valls verdes i la costa nord de São Miguel.' },
  { id: 20, nom: 'Faial da Terra',             illa: 'São Miguel', categoria: 'ciutat',   lat: 37.7369, lon: -25.2069, trampa: false, foto: 'img/joc_mapa/20_faial_da_terra.webp',                      desc: 'Poble aïllat al sud-est accessible per una llarga caminada.' },
  { id: 21, nom: 'Praia da Viola',             illa: 'São Miguel', categoria: 'platja',   lat: 37.8756, lon: -25.7361, trampa: false, foto: 'img/joc_mapa/21_praia_da_viola.jpg',                       desc: 'Platja tranquil·la a la costa nord-oest.' },
  { id: 22, nom: 'Lagoa do Canário',           illa: 'São Miguel', categoria: 'paisatge', lat: 37.7856, lon: -25.5000, trampa: false, foto: 'img/joc_mapa/22_lagoa_do_canario.webp',                    desc: 'Petit llac volcànic envoltat de bosc laurissilva al centre de São Miguel.' },
  { id: 23, nom: 'Pico da Vara',               illa: 'São Miguel', categoria: 'volca',    lat: 37.8136, lon: -25.1828, trampa: false, foto: 'img/joc_mapa/23_pico_da_vara.jpg',                         desc: 'El punt més alt de São Miguel amb 1.103 metres.' },
  { id: 24, nom: 'Lagoa Verde i Lagoa Azul',   illa: 'São Miguel', categoria: 'paisatge', lat: 37.8422, lon: -25.7911, trampa: false, foto: 'img/joc_mapa/24_lagoa_verde_i_lagoa_azul.webp',            desc: 'Les dues llacunes de colors del volcà de Sete Cidades.' },
  { id: 25, nom: 'Praia de Água d\'Alto',      illa: 'São Miguel', categoria: 'platja',   lat: 37.7094, lon: -25.4072, trampa: false, foto: 'img/joc_mapa/25_praia_de_agua_d_alto.webp',               desc: 'Platja popular al sud de l\'illa, prop de Vila Franca.' },

  // ── PICO (10) ────────────────────────────────────────────────
  { id: 26, nom: 'Madalena',          illa: 'Pico', categoria: 'ciutat',   lat: 38.5317, lon: -28.5319, trampa: false, foto: 'img/joc_mapa/26_madalena.jpg',              desc: 'Principal port de Pico, amb vistes a Faial.' },
  { id: 27, nom: 'Montanha do Pico',  illa: 'Pico', categoria: 'volca',    lat: 38.4692, lon: -28.4006, trampa: false, foto: 'img/joc_mapa/27_montanha_do_pico.jpg',      desc: 'El volcà més alt de Portugal amb 2.351 metres.' },
  { id: 28, nom: 'Lajes do Pico',     illa: 'Pico', categoria: 'ciutat',   lat: 38.3942, lon: -28.2528, trampa: false, foto: 'img/joc_mapa/28_lajes_do_pico.jpg',         desc: 'Antic port balener, avui museu de la caça de balenes.' },
  { id: 29, nom: 'São Roque do Pico', illa: 'Pico', categoria: 'ciutat',   lat: 38.5181, lon: -28.3147, trampa: false, foto: 'img/joc_mapa/29_sao_roque_do_pico.webp',    desc: 'Municipi al centre nord de l\'illa de Pico.' },
  { id: 30, nom: 'Lagoa do Capitão',  illa: 'Pico', categoria: 'paisatge', lat: 38.4781, lon: -28.4194, trampa: false, foto: 'img/joc_mapa/30_lagoa_do_capitao.webp',     desc: 'Llac d\'altura als peus del Pico, envoltat de paisatge lunar.' },
  { id: 31, nom: 'Prainha do Norte',  illa: 'Pico', categoria: 'platja',   lat: 38.5542, lon: -28.3992, trampa: false, foto: 'img/joc_mapa/31_prainha_do_norte.jpg',      desc: 'Platja de sorra negra al nord de Pico.' },
  { id: 32, nom: 'Arcos de São Jorge', illa: 'Pico', categoria: 'paisatge', lat: 38.5536, lon: -28.2253, trampa: false, foto: 'img/joc_mapa/32_arcos_de_aao_jorge.jpg',  desc: 'Costa nord de Pico amb formacions de lava i arcs naturals.' },
  { id: 33, nom: 'Santa Luzia',       illa: 'Pico', categoria: 'ciutat',   lat: 38.3869, lon: -28.1747, trampa: false, foto: 'img/joc_mapa/33_santa_luzia.webp',          desc: 'Poble pesquer a l\'extrem est de l\'illa.' },
  { id: 34, nom: 'Gruta das Torres',  illa: 'Pico', categoria: 'paisatge', lat: 38.5444, lon: -28.4483, trampa: false, foto: 'img/joc_mapa/34_gruta_das_torres.jpg',      desc: 'Cova de lava de quasi 5 km, la més llarga de les Açores.' },
  { id: 35, nom: 'Vinyes UNESCO',     illa: 'Pico', categoria: 'paisatge', lat: 38.5139, lon: -28.4808, trampa: false, foto: 'img/joc_mapa/35_pico_vinyes_unesco.jpg',    desc: 'Paisatge vitivinícola patrimoni UNESCO, amb murs de pedra volcànica.' },

  // ── FAIAL (5) ────────────────────────────────────────────────
  { id: 36, nom: 'Horta',                illa: 'Faial', categoria: 'ciutat',   lat: 38.5333, lon: -28.6333, trampa: false, foto: 'img/joc_mapa/36_horta.webp',                  desc: 'Capital de Faial, famosa pel port esportiu i la marina.' },
  { id: 37, nom: 'Caldeira do Faial',    illa: 'Faial', categoria: 'volca',    lat: 38.5928, lon: -28.7108, trampa: false, foto: 'img/joc_mapa/37_caldeira_do_faial.jpg',        desc: 'Caldera volcànica de 400 metres de profunditat al centre de l\'illa.' },
  { id: 38, nom: 'Capelinhos',           illa: 'Faial', categoria: 'volca',    lat: 38.5972, lon: -28.8328, trampa: false, foto: 'img/joc_mapa/38_capelinhos.jpg',              desc: 'Volcà que va erupcionar el 1957-58, ampliant l\'illa cap al mar.' },
  { id: 39, nom: 'Praia do Almoxarife', illa: 'Faial', categoria: 'platja',   lat: 38.5608, lon: -28.5967, trampa: false, foto: 'img/joc_mapa/39_praia_do_almoxarife.jpg',      desc: 'La platja principal de Faial, amb sorra fosca i vistes al Pico.' },
  { id: 40, nom: 'Porto Pim',            illa: 'Faial', categoria: 'platja',   lat: 38.5256, lon: -28.6275, trampa: false, foto: 'img/joc_mapa/40_porto_pim.jpg',               desc: 'Platja en badia protegida, la més popular d\'Horta.' },

  // ── SÃO JORGE (5) ────────────────────────────────────────────
  { id: 41, nom: 'Velas',                    illa: 'São Jorge', categoria: 'ciutat',   lat: 38.6783, lon: -28.2028, trampa: false, foto: 'img/joc_mapa/41_velas.jpg',                        desc: 'Capital de São Jorge, a la costa sud-oest.' },
  { id: 42, nom: 'Fajã dos Cubres',          illa: 'São Jorge', categoria: 'paisatge', lat: 38.7078, lon: -27.9883, trampa: false, foto: 'img/joc_mapa/42_faja_dos_cubres.jpg',              desc: 'Fajã al nord amb una laguna protegida i ambient únic.' },
  { id: 43, nom: 'Fajã da Caldeira de Santo Cristo', illa: 'São Jorge', categoria: 'paisatge', lat: 38.7131, lon: -27.9706, trampa: false, foto: 'img/joc_mapa/43_faja_da_caldeira_de_santo_cristo.jpg', desc: 'Famosa per les seves amèijoas i accessible per senderisme.' },
  { id: 44, nom: 'Calheta',                  illa: 'São Jorge', categoria: 'ciutat',   lat: 38.5983, lon: -28.0156, trampa: false, foto: 'img/joc_mapa/44_calheta.webp',                     desc: 'Poble al sud de São Jorge amb port i platges rocoses.' },
  { id: 45, nom: 'Pico da Esperança',        illa: 'São Jorge', categoria: 'volca',    lat: 38.6667, lon: -28.0833, trampa: false, foto: 'img/joc_mapa/45_pico_da_esperanca.jpg',            desc: 'El punt més alt de São Jorge amb 1.053 metres.' },

  // ── TRAMPA: altres illes (5) ─────────────────────────────────
  { id: 46, nom: 'Angra do Heroísmo',    illa: 'Terceira',    categoria: 'ciutat', lat: 38.6553, lon: -27.2194, trampa: true, foto: 'img/joc_mapa/46_angra_do_heroismo.webp',      desc: 'Capital de Terceira i patrimoni UNESCO. No la visitareu!' },
  { id: 47, nom: 'Caldeira da Graciosa', illa: 'Graciosa',    categoria: 'volca',  lat: 39.0542, lon: -27.9728, trampa: true, foto: 'img/joc_mapa/47_caldeira_da_graciosa.webp',   desc: 'La caldera més famosa de Graciosa. Una altra illa!' },
  { id: 48, nom: 'Vila do Porto',        illa: 'Santa Maria', categoria: 'ciutat', lat: 36.9442, lon: -25.1539, trampa: true, foto: 'img/joc_mapa/48_vila_do_porto.jpg',            desc: 'Capital de Santa Maria, la illa més al sud. Sorpresa!' },
  { id: 49, nom: 'Lajes das Flores',     illa: 'Flores',      categoria: 'ciutat', lat: 39.3783, lon: -31.1733, trampa: true, foto: 'img/joc_mapa/49_lajes_das_flores.webp',       desc: 'Capital de Flores, la illa més a l\'oest de les Açores!' },
  { id: 50, nom: 'Corvo (poble)',        illa: 'Corvo',       categoria: 'ciutat', lat: 39.6978, lon: -31.1097, trampa: true, foto: 'img/joc_mapa/50_corvo.jpg',                   desc: 'L\'únic poble de Corvo, la illa més petita de les Açores!' },
];

// Puntuació per distància
function puntsPerDistancia(km) {
  if (km < 5)  return 10;
  if (km < 20) return 5;
  if (km < 50) return 2;
  return 0;
}

// Càlcul distància Haversine (en km)
function distanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

const CAT_EMOJI = { ciutat: '🏘️', paisatge: '🌄', platja: '🏖️', volca: '🌋' };
const CAT_LABEL = { ciutat: 'Ciutat / Poble', paisatge: 'Paisatge', platja: 'Platja', volca: 'Volcà' };
