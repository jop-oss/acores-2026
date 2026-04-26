// ── DADES ─────────────────────────────────────────────────────────────
const PREGUNTES = [
  {
    id: 1,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "Quantes illes formen l'arxipèlag de les Açores?",
    opcions: ["7", "9", "11", "13"],
    correcta: 1,
    explicacio:
      "Les Açores estan formades per 9 illes dividides en tres grups: oriental, central i occidental.",
  },
  {
    id: 2,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "A quin oceà es troben les Açores?",
    opcions: ["Oceà Pacífic", "Oceà Índic", "Oceà Atlàntic", "Mar Mediterrani"],
    correcta: 2,
    explicacio:
      "Les Açores es troben a l'Oceà Atlàntic Nord, a uns 1.500 km de Lisboa.",
  },
  {
    id: 3,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "De quin país formen part les Açores?",
    opcions: ["Espanya", "Brasil", "França", "Portugal"],
    correcta: 3,
    explicacio: "Les Açores són una regió autònoma de Portugal des de 1976.",
  },
  {
    id: 4,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "Quina és la illa més gran de les Açores?",
    opcions: ["Terceira", "Faial", "São Miguel", "Pico"],
    correcta: 2,
    explicacio:
      "São Miguel, coneguda com la 'Illa Verda', és la més gran amb 744 km².",
  },
  {
    id: 5,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "Quina és la capital de les Açores?",
    opcions: ["Horta", "Angra do Heroísmo", "Ponta Delgada", "Velas"],
    correcta: 2,
    explicacio:
      "Ponta Delgada, a São Miguel, és la capital i la ciutat més gran de les Açores.",
  },
  {
    id: 6,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "Quina illa de les Açores té la muntanya més alta de Portugal?",
    opcions: ["São Miguel", "Terceira", "Faial", "Pico"],
    correcta: 3,
    explicacio:
      "El Pico, a l'illa de Pico, és el punt més alt de Portugal amb 2.351 metres.",
  },
  {
    id: 7,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta:
      "Com es diu el grup d'illes al qual pertanyen Faial, Pico i São Jorge?",
    opcions: [
      "Grup Oriental",
      "Grup Central",
      "Grup Occidental",
      "Grup del Nord",
    ],
    correcta: 1,
    explicacio:
      "Faial, Pico, São Jorge, Graciosa i Terceira formen el Grup Central de les Açores.",
  },
  {
    id: 8,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta:
      "Quina illa de les Açores és coneguda com 'l'Illa Azul' pel color de les seves hortènsies?",
    opcions: ["São Miguel", "São Jorge", "Terceira", "Faial"],
    correcta: 3,
    explicacio:
      "Faial és coneguda com 'l'Illa Azul' per les abundants hortènsies blaves que decoren els seus camins.",
  },
  {
    id: 9,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "Quina és la illa més occidental de les Açores?",
    opcions: ["Flores", "Corvo", "Faial", "São Miguel"],
    correcta: 1,
    explicacio:
      "Corvo és la illa més occidental i també la més petita de les Açores.",
  },
  {
    id: 10,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "On es troba la famosa Lagoa das Sete Cidades?",
    opcions: ["Terceira", "Pico", "Faial", "São Miguel"],
    correcta: 3,
    explicacio:
      "La Lagoa das Sete Cidades es troba a São Miguel i és una de les atraccions més famoses de les Açores.",
  },
  {
    id: 11,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "Quina és la distància aproximada entre les Açores i Lisboa?",
    opcions: ["500 km", "1.000 km", "1.500 km", "2.000 km"],
    correcta: 2,
    explicacio:
      "Les Açores es troben a aproximadament 1.500 km de Lisboa, la capital de Portugal.",
  },
  {
    id: 12,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "Quin grup d'illes inclou São Miguel i Santa Maria?",
    opcions: [
      "Grup Occidental",
      "Grup Central",
      "Grup Oriental",
      "Grup del Sud",
    ],
    correcta: 2,
    explicacio:
      "São Miguel i Santa Maria formen el Grup Oriental, el més proper al continent europeu.",
  },
  {
    id: 13,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "Com es diu el canal que separa les illes de Faial i Pico?",
    opcions: [
      "Canal de São Jorge",
      "Canal do Faial",
      "Canal do Pico",
      "Canal das Açores",
    ],
    correcta: 1,
    explicacio:
      "El Canal do Faial separa Faial de Pico, amb una amplada d'uns 8 km. El Canal de São Jorge separa São Jorge de Faial i Pico.",
  },
  {
    id: 14,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "Quina és la superfície total aproximada de les Açores?",
    opcions: ["1.500 km²", "2.333 km²", "3.100 km²", "4.200 km²"],
    correcta: 1,
    explicacio:
      "La superfície total de les Açores és de 2.333 km², distribuïda entre les 9 illes.",
  },
  {
    id: 15,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "A quina latitud aproximada es troben les Açores?",
    opcions: ["25°N - 30°N", "30°N - 35°N", "37°N - 40°N", "43°N - 47°N"],
    correcta: 2,
    explicacio:
      "Les Açores es troben entre els 37° i 40° de latitud nord, similar a Lisboa i Sevilla.",
  },
  {
    id: 16,
    categoria: "Geografia",
    dificultat: "facil",
    pregunta: "Quina illa de les Açores és la més petita?",
    opcions: ["Flores", "Graciosa", "Corvo", "Santa Maria"],
    correcta: 2,
    explicacio:
      "Corvo és la illa més petita amb només 17 km² i menys de 500 habitants.",
  },
  {
    id: 17,
    categoria: "Geografia",
    dificultat: "mitja",
    pregunta: "Com es diu la caldera volcànica de Faial?",
    opcions: [
      "Caldeira do Faial",
      "Caldeira Guilherme Moniz",
      "Caldeira de Alferes",
      "Caldeira Grande",
    ],
    correcta: 0,
    explicacio:
      "La Caldeira do Faial té 2 km de diàmetre i 400 metres de profunditat, coberta de vegetació.",
  },
  {
    id: 18,
    categoria: "Geografia",
    dificultat: "mitja",
    pregunta: "Quina illa de les Açores té el renom de 'Ilha Roxa'?",
    opcions: ["Graciosa", "Santa Maria", "São Jorge", "Flores"],
    correcta: 3,
    explicacio:
      "Flores és coneguda com la 'Ilha Roxa' o 'Ilha das Flores' per la seva abundant vegetació i flors.",
  },
  {
    id: 19,
    categoria: "Geografia",
    dificultat: "mitja",
    pregunta: "Quin és el punt més proper a les Açores del continent americà?",
    opcions: ["Nova York", "Boston", "Saint John's (Terranova)", "Halifax"],
    correcta: 2,
    explicacio:
      "Saint John's, a Terranova (Canadà), és el punt continental més proper a les Açores, a uns 3.300 km.",
  },
  {
    id: 20,
    categoria: "Geografia",
    dificultat: "mitja",
    pregunta: "Quantes illes habitades hi ha a les Açores?",
    opcions: ["7", "8", "9", "6"],
    correcta: 2,
    explicacio:
      "Totes les 9 illes de les Açores estan habitades, tot i que Corvo té menys de 500 habitants.",
  },
  {
    id: 21,
    categoria: "Geografia",
    dificultat: "dificil",
    pregunta:
      "On es troba la Fossa Hirondelle, el punt més profund dels voltants de les Açores?",
    opcions: [
      "Al nord de Flores",
      "Entre Faial i Pico",
      "Al sud de São Miguel",
      "A l'est de Santa Maria",
    ],
    correcta: 0,
    explicacio:
      "La Fossa Hirondelle, al nord de Flores, arriba als 3.200 metres de profunditat.",
  },
  {
    id: 22,
    categoria: "Geografia",
    dificultat: "dificil",
    pregunta:
      "Per quantes plaques tectòniques es troba l'arxipèlag de les Açores?",
    opcions: ["2", "3", "4", "5"],
    correcta: 1,
    explicacio:
      "Les Açores es troben a la confluència de 3 plaques tectòniques: l'Euroasiàtica, l'Americana i l'Africana.",
  },
  {
    id: 23,
    categoria: "Geografia",
    dificultat: "dificil",
    pregunta: "Com es diu la dorsal oceànica que passa per les Açores?",
    opcions: [
      "Dorsal del Pacífic",
      "Dorsal Atlàntica Central",
      "Dorsal de Reykjanes",
      "Dorsal de l'Índic",
    ],
    correcta: 1,
    explicacio:
      "La Dorsal Atlàntica Central (Mid-Atlantic Ridge) passa per les Açores, creant gran activitat volcànica.",
  },
  {
    id: 24,
    categoria: "Natura i fauna",
    dificultat: "facil",
    pregunta: "Quina espècie de cetaci és especialment famosa a les Açores?",
    opcions: [
      "Dofí comú",
      "Orca",
      "Catxalot (Physeter macrocephalus)",
      "Balena blava",
    ],
    correcta: 2,
    explicacio:
      "El catxalot (Physeter macrocephalus) és el cetaci més emblemàtic de les Açores i hi és present tot l'any.",
  },
  {
    id: 25,
    categoria: "Natura i fauna",
    dificultat: "facil",
    pregunta:
      "Com es diuen les típiques flors blaves que decoren els camins de les Açores?",
    opcions: ["Azàlees", "Hortènsies", "Begònies", "Glicines"],
    correcta: 1,
    explicacio:
      "Les hortènsies (Hydrangea macrophylla) s'utilitzen com a tanques als camps i són un símbol de les Açores.",
  },
  {
    id: 26,
    categoria: "Natura i fauna",
    dificultat: "facil",
    pregunta: "Les Açores són conegudes per l'observació de...",
    opcions: ["Pingüins", "Balenes i dofins", "Koalas", "Flamencs"],
    correcta: 1,
    explicacio:
      "L'observació de balenes i dofins (whale watching) és una activitat turística clau de les Açores.",
  },
  {
    id: 27,
    categoria: "Natura i fauna",
    dificultat: "facil",
    pregunta: "Quin tipus de vegetació domina el paisatge de les Açores?",
    opcions: ["Desert", "Bosc tropical", "Vegetació laurisilva", "Estepa"],
    correcta: 2,
    explicacio:
      "La laurisilva, un bosc relicte de l'era Terciària, és la vegetació natural dominant a les Açores.",
  },
  {
    id: 28,
    categoria: "Natura i fauna",
    dificultat: "facil",
    pregunta: "Quin ocell és el símbol oficial de les Açores?",
    opcions: [
      "Àguila",
      "Milhafre (gavià de les Açores)",
      "Pardal",
      "Corb marí",
    ],
    correcta: 1,
    explicacio:
      "El Milhafre-das-Açores (Buteo buteo rothschildi) és el símbol oficial de la Região Autónoma dos Açores.",
  },
  {
    id: 29,
    categoria: "Natura i fauna",
    dificultat: "facil",
    pregunta: "Les aigües de les Açores estan protegides per...",
    opcions: [
      "Un parc nacional",
      "Una reserva marina",
      "Una zona de pesca exclusiva",
      "Un parc natural submarí",
    ],
    correcta: 1,
    explicacio:
      "Les Açores tenen una extensa xarxa de reserves marines que protegeixen la seva rica biodiversitat marina.",
  },
  {
    id: 30,
    categoria: "Natura i fauna",
    dificultat: "facil",
    pregunta:
      "Quin fenomen geotèrmic es pot observar a les Furnas, a São Miguel?",
    opcions: [
      "Glaceres",
      "Guèisers i fumaroles",
      "Pluja àcida",
      "Aurores boreals",
    ],
    correcta: 1,
    explicacio:
      "Les Furnas és una zona geotèrmica activa amb guèisers, fumaroles i termes naturals d'aigues calentes.",
  },
  {
    id: 31,
    categoria: "Natura i fauna",
    dificultat: "mitja",
    pregunta:
      "Quantes espècies de cetacis es poden observar regularment a les Açores?",
    opcions: ["5", "10", "20", "28"],
    correcta: 3,
    explicacio:
      "S'han registrat més de 28 espècies de cetacis a les aigües de les Açores, convertint-les en un dels millors llocs del món per al whale watching.",
  },
  {
    id: 32,
    categoria: "Natura i fauna",
    dificultat: "mitja",
    pregunta:
      "Com es diu l'arbre endèmic de les Açores que pot créixer fins a 8 metres d'altura?",
    opcions: [
      "Hortènsia de les Açores",
      "Til·ler de les Açores",
      "Urze (Erica azorica)",
      "Faia-das-ilhas",
    ],
    correcta: 2,
    explicacio:
      "La Urze (Erica azorica) és una espècie endèmica de les Açores, un arbust/arbre que pot créixer fins a 8 metres i forma boscos densos a les zones altes.",
  },
  {
    id: 33,
    categoria: "Natura i fauna",
    dificultat: "mitja",
    pregunta:
      "Quin percentatge de la superfície de les Açores està protegit legalment com a espai natural?",
    opcions: [
      "Menys del 5%",
      "Entre el 10% i el 20%",
      "Més del 40%",
      "El 100%",
    ],
    correcta: 2,
    explicacio:
      "Més del 40% de la superfície terrestre de les Açores té algun tipus de protecció ambiental.",
  },
  {
    id: 34,
    categoria: "Natura i fauna",
    dificultat: "mitja",
    pregunta: "Com es diu l'endèmic llangardaix de les Açores?",
    opcions: [
      "Lagarto-dos-Açores",
      "Lagartixa-dos-Açores",
      "Gecko-das-ilhas",
      "Sardaneta atlàntica",
    ],
    correcta: 1,
    explicacio:
      "La Lagartixa-dos-Açores (Podarcis lilfordi) és un rèptil endèmic present a diverses illes.",
  },
  {
    id: 35,
    categoria: "Natura i fauna",
    dificultat: "mitja",
    pregunta: "Quina espècie de tortuga marina visita regularment les Açores?",
    opcions: [
      "Tortuga llaüt",
      "Tortuga careta (Caretta caretta)",
      "Tortuga verda",
      "Tortuga de Kemp",
    ],
    correcta: 1,
    explicacio:
      "La tortuga careta (Caretta caretta) visita les Açores regularment per alimentar-se i descansar.",
  },
  {
    id: 36,
    categoria: "Natura i fauna",
    dificultat: "dificil",
    pregunta: "Com es diu l'únic mamífer terrestre nadiu de les Açores?",
    opcions: [
      "Rata d'Açores",
      "Morcego-dos-Açores (Nyctalus azoreum)",
      "Conill endèmic",
      "No n'hi ha cap mamifer terrestre nadiu",
    ],
    correcta: 1,
    explicacio:
      "El Morcego-dos-Açores (Nyctalus azoreum) és l'únic mamífer terrestre nadiu de les Açores, una espècie de rat penat endèmica.",
  },
  {
    id: 37,
    categoria: "Natura i fauna",
    dificultat: "dificil",
    pregunta:
      "Quina espècie de corall profund és especialment abundant a les Açores?",
    opcions: [
      "Corall cervell",
      "Lophelia pertusa",
      "Coral·lium rubrum",
      "Dendrophyllia ramea",
    ],
    correcta: 1,
    explicacio:
      "Lophelia pertusa és el corall d'aigues profundes més abundant a les Açores, formant ecosistemes únics.",
  },
  {
    id: 38,
    categoria: "Gastronomia",
    dificultat: "facil",
    pregunta:
      "Quin és el plat tradicional de les Furnas, cuit sota terra amb calor geotèrmica?",
    opcions: [
      "Bacallà a bras",
      "Cozido das Furnas",
      "Caldeirada de peixe",
      "Alcatra",
    ],
    correcta: 1,
    explicacio:
      "El Cozido das Furnas és un guisat de carn i verdures que es cou lentament durant hores aprofitant el calor volcànic del subsòl.",
  },
  {
    id: 39,
    categoria: "Gastronomia",
    dificultat: "facil",
    pregunta: "Quin formatge és típic de l'illa de São Jorge?",
    opcions: [
      "Queijo da Serra",
      "Queijo São Jorge",
      "Queijo Rabacal",
      "Queijo Fresco",
    ],
    correcta: 1,
    explicacio:
      "El Queijo São Jorge és un formatge curat DOP amb denominació d'origen, de sabor intens i molt apreciat.",
  },
  {
    id: 40,
    categoria: "Gastronomia",
    dificultat: "facil",
    pregunta: "Quin licor típic s'elabora a les Açores amb maracujà?",
    opcions: ["Ginjinha", "Licor de maracujà", "Licor Beirão", "Medronho"],
    correcta: 1,
    explicacio:
      "El licor de maracujà (fruit de la passió) és una de les begudes típiques de les Açores, especialment a São Miguel.",
  },
  {
    id: 41,
    categoria: "Gastronomia",
    dificultat: "facil",
    pregunta:
      "Quin és l'ingredient principal de la 'alcatra', plat típic de Terceira?",
    opcions: ["Peix", "Porc", "Carn de vedella", "Pollastre"],
    correcta: 2,
    explicacio:
      "L'alcatra és un estofat de carn de vedella cuit en terrissa amb vi, ceba i espècies, plat emblema de Terceira.",
  },
  {
    id: 42,
    categoria: "Gastronomia",
    dificultat: "facil",
    pregunta:
      "Quin peix és especialment popular a la cuina tradicional de les Açores?",
    opcions: ["Salmó", "Atum (tonyina)", "Lluç", "Trota"],
    correcta: 1,
    explicacio:
      "L'atum (tonyina) és el peix més important per a la cuina i l'economia de les Açores.",
  },
  {
    id: 43,
    categoria: "Gastronomia",
    dificultat: "facil",
    pregunta:
      "Quin tipus de te s'ha produït tradicionalment a les Açores, únic a Europa?",
    opcions: [
      "Te verd japonès",
      "Te vermell xinès",
      "Te das Açores (Gorreana)",
      "Te de menta marroquí",
    ],
    correcta: 2,
    explicacio:
      "A São Miguel es troba la única plantació de te d'Europa, la Gorreana, amb més de 150 anys d'historia.",
  },
  {
    id: 44,
    categoria: "Gastronomia",
    dificultat: "mitja",
    pregunta: "Com es diu el pastís típic de les Açores fet amb batata doce?",
    opcions: [
      "Bolo lêvedo",
      "Dona Amélia",
      "Bolo de mel",
      "Bolo de batata doce",
    ],
    correcta: 2,
    explicacio:
      "El Bolo de mel és un pastís tradicional fet amb mel de cana, batata doce i espècies, típic de les festes.",
  },
  {
    id: 45,
    categoria: "Gastronomia",
    dificultat: "mitja",
    pregunta: "Quina illa és famosa per la producció d'ananàs de hivernacle?",
    opcions: ["Terceira", "Pico", "Faial", "São Miguel"],
    correcta: 3,
    explicacio:
      "São Miguel és famosa pels seus ananassos cultivats en hivernacles de pedra volcànica, una tradició de més de 150 anys.",
  },
  {
    id: 46,
    categoria: "Gastronomia",
    dificultat: "mitja",
    pregunta:
      "Com es diu el pa típic de les Açores amb una textura molt esponjosa?",
    opcions: ["Bolo lêvedo", "Pão sovado", "Bolo do caco", "Broa"],
    correcta: 1,
    explicacio:
      "El Pão sovado és un pa tradicional molt esponjós i lleugerament dolç, típic de moltes illes açorianes.",
  },
  {
    id: 47,
    categoria: "Gastronomia",
    dificultat: "mitja",
    pregunta:
      "Quin vi DOP es produeix a les Açores, especialment a l'illa de Pico?",
    opcions: [
      "Vinho Verde",
      "Vinho do Pico",
      "Vinho da Madeira",
      "Vinho de Setúbal",
    ],
    correcta: 1,
    explicacio:
      "El Vinho do Pico té DOP i es produeix en 'currais', petits recintes de pedra volcànica negra per protegir les vinyes del vent.",
  },
  {
    id: 48,
    categoria: "Gastronomia",
    dificultat: "mitja",
    pregunta:
      "Quina espècie de lapa (mol·lusc) és típica de la cuina de les Açores?",
    opcions: [
      "Patella aspera",
      "Patella ulyssiponensis",
      "Patella vulgata",
      "Patella candei",
    ],
    correcta: 1,
    explicacio:
      "Les lapas (Patella ulyssiponensis) es preparen a la planxa amb mantequilla, all i llimona i son un aperitiu imprescindible.",
  },
  {
    id: 49,
    categoria: "Gastronomia",
    dificultat: "dificil",
    pregunta:
      "Quin és el nom del pastís típic d'Angra do Heroísmo, a Terceira?",
    opcions: [
      "Bolo de mel",
      "Dona Amélia",
      "Bolo lêvedo",
      "Suspiro de Terceira",
    ],
    correcta: 1,
    explicacio:
      "La Dona Amélia és un pastís típic d'Angra do Heroísmo creat al segle XIX, fet amb mel, nous i canella.",
  },
  {
    id: 50,
    categoria: "Gastronomia",
    dificultat: "dificil",
    pregunta: "Les vinyes de l'illa de Pico estan inscrites a la llista del...",
    opcions: [
      "Patrimoni Natural de la UNESCO",
      "Patrimoni Cultural Immaterial de la UNESCO",
      "Patrimoni de la Humanitat de la UNESCO (paisatge cultural)",
      "Registre Europeu de Paisatges",
    ],
    correcta: 2,
    explicacio:
      "El paisatge vitivinícola de l'illa de Pico va ser inscrit com a Patrimoni de la Humanitat per la UNESCO el 2004.",
  },
  {
    id: 51,
    categoria: "Gastronomia",
    dificultat: "dificil",
    pregunta:
      "Com es diu la sopa tradicional de les Açores feta amb col, mongetes i carn de porc?",
    opcions: [
      "Caldo verde",
      "Sopa do Espírito Santo",
      "Cozido à portuguesa",
      "Açorda",
    ],
    correcta: 1,
    explicacio:
      "La Sopa do Espírito Santo és una sopa ritual associada a les festes de l'Esperit Sant, distribuïda gratuïtament als assistents.",
  },
  {
    id: 52,
    categoria: "Història i cultura",
    dificultat: "facil",
    pregunta: "Quan van ser descobertes les Açores pels portuguesos?",
    opcions: ["Al segle XIII", "Al segle XIV", "Al segle XV", "Al segle XVI"],
    correcta: 2,
    explicacio:
      "Les Açores van ser descobertes als voltants de 1427-1432 per navegants portuguesos, possiblement per Diogo de Silves.",
  },
  {
    id: 53,
    categoria: "Història i cultura",
    dificultat: "facil",
    pregunta: "Quin és el nom oficial de la comunitat autònoma de les Açores?",
    opcions: [
      "Illes Açores",
      "Regió Autònoma de les Açores",
      "Comunitat de les Açores",
      "Arxipèlag de les Açores",
    ],
    correcta: 1,
    explicacio:
      "El nom oficial és Região Autónoma dos Açores, establert amb l'estatut d'autonomia de 1976.",
  },
  {
    id: 54,
    categoria: "Història i cultura",
    dificultat: "facil",
    pregunta: "Quin any va obtenir les Açores l'estatut d'autonomia?",
    opcions: ["1945", "1961", "1976", "1986"],
    correcta: 2,
    explicacio:
      "Les Açores van obtenir l'autonomia el 1976, poc després de la Revolució dels Clavells de 1974.",
  },
  {
    id: 55,
    categoria: "Història i cultura",
    dificultat: "facil",
    pregunta: "Quina és la festivity religiosa més important de les Açores?",
    opcions: [
      "Nadal",
      "Festa de l'Esperit Sant (Festa do Divino Espírito Santo)",
      "Setmana Santa",
      "Festa de São João",
    ],
    correcta: 1,
    explicacio:
      "Les Festas do Divino Espírito Santo són les celebracions més arrelades a les Açores, amb processons, imperiis i distribució de sopa.",
  },
  {
    id: 56,
    categoria: "Història i cultura",
    dificultat: "facil",
    pregunta:
      "Quin animal és símbol heràldic de les Açores i apareix a la seva bandera?",
    opcions: ["Àguila", "Balena", "Açor (falcó)", "Corb marí"],
    correcta: 2,
    explicacio:
      "L'Açor (Accipiter gentilis), un falcó, va donar nom a les illes i apareix a la bandera de la Regió Autònoma.",
  },
  {
    id: 57,
    categoria: "Història i cultura",
    dificultat: "facil",
    pregunta:
      "Angra do Heroísmo, a Terceira, és Patrimoni de la Humanitat de la UNESCO des de...",
    opcions: ["1975", "1983", "1995", "2001"],
    correcta: 1,
    explicacio:
      "El centre històric d'Angra do Heroísmo va ser inscrit com a Patrimoni de la Humanitat per la UNESCO el 1983.",
  },
  {
    id: 58,
    categoria: "Història i cultura",
    dificultat: "mitja",
    pregunta:
      "Per quin motiu el nom de l'illa Terceira ('Tercera') és historic?",
    opcions: [
      "Va ser la tercera illa en ser descoberta",
      "Estava al tercer grup d'illes",
      "Fou poblada en tercer lloc",
      "El seu primer governador es deia Terceiro",
    ],
    correcta: 0,
    explicacio:
      "Terceira va rebre el seu nom perquè va ser la tercera illa de les Açores en ser descoberta i explorada pels portuguesos.",
  },
  {
    id: 59,
    categoria: "Història i cultura",
    dificultat: "mitja",
    pregunta:
      "Quin esdeveniment del segle XX va crear el nou vulcà Capelinhos a Faial?",
    opcions: [
      "Un terratrèmol de gran magnitud",
      "Una erupció volcànica submarina el 1957-58",
      "Una esllavissada submarina",
      "Un impacte de meteorit",
    ],
    correcta: 1,
    explicacio:
      "Entre 1957 i 1958, una erupció volcànica submarina va crear el volcà Capelinhos, afegint 2,4 km² a l'illa de Faial.",
  },
  {
    id: 60,
    categoria: "Història i cultura",
    dificultat: "mitja",
    pregunta:
      "Les Açores van tenir un paper important durant la Segona Guerra Mundial com a...",
    opcions: [
      "Base de submarins alemanys",
      "Base aèria i naval dels Aliats",
      "Camp de presoners",
      "Centre de producció d'armes",
    ],
    correcta: 1,
    explicacio:
      "Portugal va cedir bases a les Açores als Aliats el 1943 (Terceira i Faial), cosa que va ser clau per al control de l'Atlàntic.",
  },
  {
    id: 61,
    categoria: "Història i cultura",
    dificultat: "mitja",
    pregunta:
      "Com es diu la primera persona a volar sense escales sobre l'Atlàntic que va aterrar a les Açores?",
    opcions: [
      "Charles Lindbergh",
      "Amelia Earhart",
      "Gago Coutinho i Sacadura Cabral",
      "Alcock i Brown",
    ],
    correcta: 2,
    explicacio:
      "Gago Coutinho i Sacadura Cabral van realitzar el primer vol transatlàntic del sud (Lisboa-Rio de Janeiro) el 1922 amb escala a les Açores.",
  },
  {
    id: 62,
    categoria: "Història i cultura",
    dificultat: "mitja",
    pregunta:
      "Quin any es va produir el fort terratrèmol que va devastar l'illa de Terceira i va afectar greument Angra do Heroísmo?",
    opcions: ["1522", "1755", "1837", "1980"],
    correcta: 3,
    explicacio:
      "El terratrèmol de 1980 (magnitud 7,2) va devastar Terceira causant 61 morts i greus danys a Angra do Heroísmo, que llavors ja era candidata a Patrimoni UNESCO (ho va ser el 1983).",
  },
  {
    id: 63,
    categoria: "Història i cultura",
    dificultat: "mitja",
    pregunta: "Com es diu la dança tradicional típica de les Açores?",
    opcions: ["Fado", "Chamarrita", "Corridinho", "Vira"],
    correcta: 1,
    explicacio:
      "La Chamarrita és el ball tradicional de les Açores, amb ritme viu i similar a la contradansa europea.",
  },
  {
    id: 64,
    categoria: "Història i cultura",
    dificultat: "dificil",
    pregunta: "Quin rei portugués va néixer a l'illa Terceira de les Açores?",
    opcions: [
      "Dom Manuel I",
      "Dom João III",
      "Dom Sebastião I",
      "Dom Afonso VI",
    ],
    correcta: 3,
    explicacio:
      "Dom Afonso VI va néixer a Angra do Heroísmo el 1643 mentre la família reial estava exiliada durant la Restauració portuguesa.",
  },
  {
    id: 65,
    categoria: "Història i cultura",
    dificultat: "dificil",
    pregunta:
      "Quin científic i explorador va realitzar importants expedicions oceanogràfiques a les Açores a finals del segle XIX?",
    opcions: [
      "Jacques Cousteau",
      "Albert I de Mònaco",
      "Charles Darwin",
      "Alexander von Humboldt",
    ],
    correcta: 1,
    explicacio:
      "Albert I de Mònaco va realitzar diverses campanyes científiques a les Açores entre 1885 i 1915, descobrint espècies marines noves.",
  },
  {
    id: 66,
    categoria: "Història i cultura",
    dificultat: "dificil",
    pregunta:
      "Quin any es va inaugurar el primer cable telegràfic transatlàntic que passava per les Açores?",
    opcions: ["1858", "1866", "1874", "1901"],
    correcta: 2,
    explicacio:
      "El 1874 es va inaugurar un cable telegràfic transatlàntic amb estació a Faial, convertint Horta en un node de comunicació mundial.",
  },
  {
    id: 67,
    categoria: "Curiositats volcàniques",
    dificultat: "facil",
    pregunta:
      "Com es diuen les erupcions de lava que formen noves illes o extensions de terra al mar?",
    opcions: [
      "Erupcions explosives",
      "Erupcions efusives submarines (vulcanisme hawaià)",
      "Erupcions plinines",
      "Erupcions freatomagmàtiques",
    ],
    correcta: 1,
    explicacio:
      "Les erupcions efusives submarines, de tipus hawaià, van ser les responsables de crear les illes de les Açores milions d'anys enrere.",
  },
  {
    id: 68,
    categoria: "Curiositats volcàniques",
    dificultat: "facil",
    pregunta:
      "Quin color té la sorra de moltes platges de les Açores degut a l'origen volcànic?",
    opcions: ["Blanc", "Groc", "Negra", "Vermell"],
    correcta: 2,
    explicacio:
      "La sorra negra de les platges açorianes prové de la desintegració de la roca basàltica volcànica.",
  },
  {
    id: 69,
    categoria: "Curiositats volcàniques",
    dificultat: "facil",
    pregunta:
      "Com es diuen les emanacions de gas i vapor calent que surten del terra a les zones volcàniques?",
    opcions: ["Guèisers", "Fumaroles", "Bufadors", "Termes"],
    correcta: 1,
    explicacio:
      "Les fumaroles són fissures per on surten gasos volcànics calents, molt visibles a les Furnas de São Miguel.",
  },
  {
    id: 70,
    categoria: "Curiositats volcàniques",
    dificultat: "facil",
    pregunta:
      "Quina és la darrera erupció volcànica important que es recorda a les Açores?",
    opcions: [
      "Capelinhos (Faial) 1957-58",
      "Fogo (São Miguel) 2000",
      "Pico 1995",
      "Terceira 1990",
    ],
    correcta: 0,
    explicacio:
      "L'erupció del Capelinhos a Faial (1957-1958) és la darrera gran erupció de les Açores, que va obligar a evacuar milers de persones.",
  },
  {
    id: 71,
    categoria: "Curiositats volcàniques",
    dificultat: "facil",
    pregunta: "Quin tipus de roca és predominant a les Açores?",
    opcions: ["Granit", "Calcària", "Basalt", "Pissarra"],
    correcta: 2,
    explicacio:
      "El basalt, una roca volcànica de color negre, és el material dominant a les Açores i s'usa fins i tot en la construcció.",
  },
  {
    id: 72,
    categoria: "Curiositats volcàniques",
    dificultat: "facil",
    pregunta: "Per qué les aigues del llac Fogo a São Miguel canvien de color?",
    opcions: [
      "Per alagues de colors",
      "Per la reflexió del cel",
      "Per l'activitat geotèrmica i els minerals",
      "Per contaminació",
    ],
    correcta: 2,
    explicacio:
      "L'activitat geotèrmica i els minerals volcànics dissolts fan que les aigues del llac Fogo canviïn de color entre el verd i el blau.",
  },
  {
    id: 73,
    categoria: "Curiositats volcàniques",
    dificultat: "mitja",
    pregunta:
      "Quantes calderes volcàniques actives hi ha aproximadament a les Açores?",
    opcions: ["3", "5", "7", "10"],
    correcta: 2,
    explicacio:
      "Les Açores tenen al voltant de 7 calderes volcàniques actives distribuïdes per diverses illes.",
  },
  {
    id: 74,
    categoria: "Curiositats volcàniques",
    dificultat: "mitja",
    pregunta:
      "Com es diu el fenomen que es pot veure a les Açores on l'aigua del mar entra per coves i surt en forma de guèiser?",
    opcions: ["Marejol", "Bufadors (algar)", "Resaca", "Sifó marí"],
    correcta: 1,
    explicacio:
      "Els bufadors o algars são forats al llarg de la costa per on l'onatge fa sortir l'aigua i l'aire a pressió, creant espectaculars brolladors.",
  },
  {
    id: 75,
    categoria: "Curiositats volcàniques",
    dificultat: "mitja",
    pregunta:
      "Quin és el principal gas que s'emet per les fumaroles de les Açores?",
    opcions: [
      "Oxigen",
      "Diòxid de carboni i diòxid de sofre",
      "Metà",
      "Nitrogen",
    ],
    correcta: 1,
    explicacio:
      "Les fumaroles de les Açores emeten principalment vapor d'agua, CO2 i SO2, que és el responsable de l'olor característic a sofre.",
  },
  {
    id: 76,
    categoria: "Curiositats volcàniques",
    dificultat: "mitja",
    pregunta:
      "El volcà Sete Cidades a São Miguel, quins tipus de llacs té a la seva caldera?",
    opcions: [
      "Un llac verd",
      "Un llac blau",
      "Un llac verd i un llac blau",
      "Tres llacs de colors diferents",
    ],
    correcta: 2,
    explicacio:
      "La caldera del Sete Cidades conté dos llacs: la Lagoa Verde (verda) i la Lagoa Azul (blava), separades per un pont estret.",
  },
  {
    id: 77,
    categoria: "Curiositats volcàniques",
    dificultat: "dificil",
    pregunta: "Quin és l'origen geològic de les Açores?",
    opcions: [
      "Erosió d'un continent submergit",
      "Punt calent (hot spot) i dorsal atlàntica",
      "Xoc de plaques continental",
      "Acumulació de sediments marins",
    ],
    correcta: 1,
    explicacio:
      "Les Açores van ser formades per la combinació d'un punt calent mantèlic i l'activitat de la Dorsal Atlàntica Central.",
  },
  {
    id: 78,
    categoria: "Curiositats volcàniques",
    dificultat: "dificil",
    pregunta:
      "Quina és l'edat geològica aproximada de les illes més antigues de les Açores?",
    opcions: [
      "100.000 anys",
      "500.000 anys",
      "8 milions d'anys",
      "50 milions d'anys",
    ],
    correcta: 2,
    explicacio:
      "Santa Maria és la illa més antiga, amb uns 8 milions d'anys, mentre les més joves (Pico, Flores) tenen menys d'un milió d'anys.",
  },
  {
    id: 79,
    categoria: "Curiositats volcàniques",
    dificultat: "dificil",
    pregunta:
      "Com es diu el sistema de monitoratge sísmico-volcànic de les Açores?",
    opcions: ["SISMO-AZ", "CIVISA", "VIGI-AZ", "MONITORA"],
    correcta: 1,
    explicacio:
      "El CIVISA (Centro de Informação e Vigilância Sismovulcânica dos Açores) monitora contínuament l'activitat sísmica i volcànica de les illes.",
  },
  {
    id: 80,
    categoria: "Activitats i turisme",
    dificultat: "facil",
    pregunta:
      "Quina activitat aquàtica és molt popular a les Açores per les seves aigues clares?",
    opcions: [
      "Surf",
      "Busseig i snorkel",
      "Kayak de ràpids",
      "Pesca de fonera",
    ],
    correcta: 1,
    explicacio:
      "El busseig i el snorkel són activitats molt populars a les Açores gràcies a les aigues transparents i la rica vida marina.",
  },
  {
    id: 81,
    categoria: "Activitats i turisme",
    dificultat: "facil",
    pregunta: "Quin tipus de senderisme és especialment famós a São Miguel?",
    opcions: [
      "Senderisme per glaceres",
      "Senderisme per calderes volcàniques i llacs",
      "Senderisme per dunes",
      "Senderisme per coves subterrànies",
    ],
    correcta: 1,
    explicacio:
      "Els senders de les calderes volcàniques i els llacs de São Miguel, com Sete Cidades i Furnas, són dels més visitats.",
  },
  {
    id: 82,
    categoria: "Activitats i turisme",
    dificultat: "facil",
    pregunta:
      "Quin port és famós a les Açores per ser un punt de reunió de vaixells de tot el món?",
    opcions: [
      "Port de Ponta Delgada",
      "Port d'Horta (Faial)",
      "Port d'Angra do Heroísmo",
      "Port de Velas",
    ],
    correcta: 1,
    explicacio:
      "El port d'Horta, a Faial, és un dels principals punts de parada transatlàntica per vaixellers de tot el món.",
  },
  {
    id: 83,
    categoria: "Activitats i turisme",
    dificultat: "facil",
    pregunta:
      "Quina atracció és famosa als voltants de les Furnas, a São Miguel?",
    opcions: [
      "Un parc d'atraccions",
      "El jardí Terra Nostra",
      "Un museu de volcans",
      "Una platja de sorra blanca",
    ],
    correcta: 1,
    explicacio:
      "El Parque Terra Nostra a les Furnas és un famós jardí botànic amb una piscina termal de color ocre causada pels minerals.",
  },
  {
    id: 84,
    categoria: "Activitats i turisme",
    dificultat: "facil",
    pregunta: "Per a quin esport és especalment bona l'illa de Santa Maria?",
    opcions: ["Esqui", "Ciclisme de muntanya", "Surf", "Escalada"],
    correcta: 2,
    explicacio:
      "Santa Maria, amb les seves platges de sorra blanca i ones constants, és una destinació ideal per al surf.",
  },
  {
    id: 85,
    categoria: "Activitats i turisme",
    dificultat: "mitja",
    pregunta: "Quin és el nom de la piscina natural més famosa de São Miguel?",
    opcions: [
      "Piscinas de Mosteiros",
      "Poças da Dona Beija",
      "Lagoa das Furnas",
      "Piscinas do Sete Cidades",
    ],
    correcta: 0,
    explicacio:
      "Les Piscinas de Mosteiros, a la costa nord-oest de São Miguel, són piscines naturals formades per roca volcànica negra.",
  },
  {
    id: 86,
    categoria: "Activitats i turisme",
    dificultat: "mitja",
    pregunta: "Quina és la particularitat del famós mural del port d'Horta?",
    opcions: [
      "Está pintat per Picasso",
      "Els navegants que passen per Horta hi pinten el nom del seu vaixell",
      "Representa la historia de les Açores",
      "Canvia de colors amb la temperatura",
    ],
    correcta: 1,
    explicacio:
      "El mural del port d'Horta és una tradició on tots els navegants que fan escala hi pinten el nom i emblema del seu vaixell per assegurar bona sort.",
  },
  {
    id: 87,
    categoria: "Activitats i turisme",
    dificultat: "mitja",
    pregunta: "Quin museu commemoratiu de l'erupció volcànica hi ha a Faial?",
    opcions: [
      "Museu do Vulcão",
      "Museu Capelinhos",
      "Centro de Interpretação do Vulcão dos Capelinhos",
      "Museu Geológic do Faial",
    ],
    correcta: 2,
    explicacio:
      "El Centro de Interpretação do Vulcão dos Capelinhos, inaugurat el 2008, és parcialment soterrat i explica l'erupció de 1957-58.",
  },
  {
    id: 88,
    categoria: "Activitats i turisme",
    dificultat: "mitja",
    pregunta:
      "Quin és el nom de la ruta de senderisme que travessa tota l'illa de São Jorge?",
    opcions: [
      "Caminho da Costa",
      "Fajã Trail",
      "Topo a Calheta Trail",
      "Caminho do Cume",
    ],
    correcta: 3,
    explicacio:
      "El Caminho do Cume travessa São Jorge d'est a oest per la cresta central, oferint vistes impressionants de les fajãs i de Pico.",
  },
  {
    id: 89,
    categoria: "Activitats i turisme",
    dificultat: "dificil",
    pregunta:
      "Com es diuen les plataformes litorals d'origen volcànic (colades de lava) de São Jorge on s'han format comunitats?",
    opcions: ["Terços", "Fajãs", "Furnas", "Caldeirões"],
    correcta: 1,
    explicacio:
      "Les fajãs son plataformes costaneres creades per antigues colades de lava o esllavissades, molt característiques de São Jorge, on s'hi han establert petits nuclis de població.",
  },
  {
    id: 90,
    categoria: "Activitats i turisme",
    dificultat: "dificil",
    pregunta:
      "Quina ruta de ciclisme de llarga distància connecta diverses illes de les Açores?",
    opcions: [
      "EuroVelo Açores",
      "Açores Ultra Trail",
      "TransAçores",
      "Volta às Açores",
    ],
    correcta: 2,
    explicacio:
      "La TransAçores és una de les curses de muntanya més dures d'Europa, que creua diverses illes de les Açores.",
  },
  {
    id: 91,
    categoria: "Clima i meteorologia",
    dificultat: "facil",
    pregunta: "Com es descriu habitualment el clima de les Açores?",
    opcions: [
      "Desèrtic i sec",
      "Temperat i humit, amb molts canvis",
      "Tropical calorós",
      "Polar fred",
    ],
    correcta: 1,
    explicacio:
      "El clima de les Açores és temperat oceànic, amb temperatures suaus, humitat elevada i canvis meteorologics frequents.",
  },
  {
    id: 92,
    categoria: "Clima i meteorologia",
    dificultat: "facil",
    pregunta: "Quina és la temperatura mitjana a les Açores al mes de juliol?",
    opcions: ["15-17°C", "20-24°C", "28-32°C", "35-38°C"],
    correcta: 1,
    explicacio:
      "Al juliol, la temperatura a les Açores sol estar entre els 20 i els 24°C, amb aigues marines d'uns 22-23°C.",
  },
  {
    id: 93,
    categoria: "Clima i meteorologia",
    dificultat: "facil",
    pregunta:
      "Quin fenomen meteorologic és habitual a les Açores per la seva posició atlàntica?",
    opcions: [
      "Tornados",
      "Boira i nuvols baixos freqüents",
      "Sequeres llargues",
      "Tempestes de sorra",
    ],
    correcta: 1,
    explicacio:
      "La boira i els nuvols baixos son freqüents a les Açores, especialment als cims, a causa de la humitat de l'oceà.",
  },
  {
    id: 94,
    categoria: "Clima i meteorologia",
    dificultat: "facil",
    pregunta:
      "Quin sistema meteorologic passa frequentment prop de les Açores i afecta el clima europeu?",
    opcions: [
      "El Niño",
      "Alta dels Açores (Anticicló dels Açores)",
      "El Monsó",
      "El Corrent del Golf",
    ],
    correcta: 1,
    explicacio:
      "L'Anticicló dels Açores és un sistema de altes pressions semi-permanent que influeix enormement en el clima de tota Europa occidental.",
  },
  {
    id: 95,
    categoria: "Clima i meteorologia",
    dificultat: "mitja",
    pregunta:
      "En quins mesos hi ha més probabilitat de veure balenes a les Açores?",
    opcions: [
      "Gener i Febrer",
      "Juny i Juliol",
      "Abril i Juny",
      "Octubre i Novembre",
    ],
    correcta: 2,
    explicacio:
      "Abril i Juny són els mesos on la diversitat és màxima: balenes pigmeues i catxalots hi son presents durant la seva migració.",
  },
  {
    id: 96,
    categoria: "Clima i meteorologia",
    dificultat: "mitja",
    pregunta: "Quin és el mes més plujós a les Açores de mitjana?",
    opcions: ["Novembre", "Gener", "Març", "Juny"],
    correcta: 1,
    explicacio:
      "Gener és generalment el mes més plujós a les Açores, amb les pertorbacions atlantiques en el seu punt màxim.",
  },
  {
    id: 97,
    categoria: "Clima i meteorologia",
    dificultat: "dificil",
    pregunta:
      "Gràcies al Corrent del Golf, les aigues de les Açores mai no baixen de...",
    opcions: ["0°C", "5°C", "15°C", "20°C"],
    correcta: 2,
    explicacio:
      "El Corrent del Golf manté les aigues de les Açores per sobre dels 15-16°C tot l'any, fins i tot a l'hivern.",
  },
  {
    id: 98,
    categoria: "Clima i meteorologia",
    dificultat: "dificil",
    pregunta:
      "Quin index s'utilitza per mesurar la profunditat màxima fins on arriba la llum solar a les aigues de les Açores?",
    opcions: [
      "Index de Secchi",
      "Index de transparència de Forel",
      "Index Winkler",
      "Index de turbiditat UV",
    ],
    correcta: 0,
    explicacio:
      "El disc de Secchi és un instrument oceanogràfic que mesura la transparència de l'aigüa; a les Açores pot arribar als 50 metres.",
  },
  {
    id: 99,
    categoria: "Clima i meteorologia",
    dificultat: "dificil",
    pregunta:
      "Com es diu el vent fred i sec que de vegades afecta les Açores provinent del nord-est?",
    opcions: ["Tramuntana", "Levant", "Nortada", "Harmatà"],
    correcta: 2,
    explicacio:
      "La Nortada és un vent del nord-est fred que pot afectar les Açores, especialment a les illes més septentrionals.",
  },
  {
    id: 100,
    categoria: "Clima i meteorologia",
    dificultat: "dificil",
    pregunta: "Quin és el record de precipitació en 24 hores a les Açores?",
    opcions: ["150 mm", "280 mm", "420 mm", "600 mm"],
    correcta: 2,
    explicacio:
      "Les Açores han registrat precipitacions excepcionals superiors als 400 mm en 24 hores durant episodis de depressió profunda.",
  },
];

const PUNTS = { facil: 6, mitja: 10, dificil: 20 };
const DIF_LABEL = { facil: "Fàcil", mitja: "Mitjà", dificil: "Difícil" };
const JUGADORS_VALIDS = ["Anna", "Jordi", "Mons", "Xu", "Laia", "Joa"];
// TEMP: Jordi no té penalització mentre fa proves
const SENSE_PENALITZACIO = ["Jordi"];

const IMGS = {
  Anna: "img/avatars/Anna.jpeg",
  Jordi: "img/avatars/Jordi.jpeg",
  Laia: "img/avatars/Laia.jpeg",
  Mons: "img/avatars/Mons.jpeg",
  Xu: "img/avatars/Xu.jpeg",
  Joa: "img/avatars/Joa.jpeg",
};

// Reaccions positives i negatives per CSS
