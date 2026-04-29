// ── EL PENJAT · Dades ────────────────────────────────────────
// 90 paraules/frases · 8 categories · 15 per jugador

const PENJAT_PARAULES = [
  {
    "paraula": "ARGENÇOLA",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "CABRA DEL CAMP",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "CAPOLAT",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "RIELLS I VIABREA",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "CASTELLFOLLIT DE RIUBREGÓS",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "HORTA DE SANT JOAN",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "MAÇANET DE CABRENYS",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "PALAFOLLS",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "QUERALBS",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "SANT FELIU DE BUIXALLEU",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "SANT QUIRZE SAFAJA",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "SANTA MARIA DE MARTORELLES",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "TAVERTET",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "VALLFOGONA DE RIUCORB",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "VILANOVA DE L'AGUDA",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "L'ESPLUGA CALBA",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "LA NOU DE GAIÀ",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "LA POBLA DE MASSALUCA",
    "categoria": "Poble de Catalunya"
  },
  {
    "paraula": "PONTA DELGADA",
    "categoria": "Poble de les Açores"
  },
  {
    "paraula": "VILA FRANCA DO CAMPO",
    "categoria": "Poble de les Açores"
  },
  {
    "paraula": "RIBEIRA GRANDE",
    "categoria": "Poble de les Açores"
  },
  {
    "paraula": "SAO ROQUE DO PICO",
    "categoria": "Poble de les Açores"
  },
  {
    "paraula": "CACHORRO",
    "categoria": "Poble de les Açores"
  },
  {
    "paraula": "MOSTEIROS",
    "categoria": "Poble de les Açores"
  },
  {
    "paraula": "ANAR A PASTA FANG",
    "categoria": "Frase feta"
  },
  {
    "paraula": "AMAGAR EL CAP SOTA L'ALA",
    "categoria": "Frase feta"
  },
  {
    "paraula": "AFEGIR LLENYA AL FOC",
    "categoria": "Frase feta"
  },
  {
    "paraula": "BUFAR I FER AMPOLLES",
    "categoria": "Frase feta"
  },
  {
    "paraula": "DONAR PEIXET",
    "categoria": "Frase feta"
  },
  {
    "paraula": "ESTAR COM UN LLUM",
    "categoria": "Frase feta"
  },
  {
    "paraula": "FER ELS ULLS GROSSOS",
    "categoria": "Frase feta"
  },
  {
    "paraula": "FER MÉS POR QUE UNA PEDREGADA",
    "categoria": "Frase feta"
  },
  {
    "paraula": "TREURE FOC PELS QUEIXALS",
    "categoria": "Frase feta"
  },
  {
    "paraula": "DONAR GAT PER LLEBRE",
    "categoria": "Frase feta"
  },
  {
    "paraula": "NO ESTAR PER ORGUES",
    "categoria": "Frase feta"
  },
  {
    "paraula": "NO TENIR NI SOLTA NI VOLTA",
    "categoria": "Frase feta"
  },
  {
    "paraula": "PASSAR BOU PER BÈSTIA GROSSA",
    "categoria": "Frase feta"
  },
  {
    "paraula": "PLOURE SOBRE MULLAT",
    "categoria": "Frase feta"
  },
  {
    "paraula": "ESTAR A LA LLUNYA DE VALÈNCIA",
    "categoria": "Frase feta"
  },
  {
    "paraula": "TENIR EL CUL PELAT",
    "categoria": "Frase feta"
  },
  {
    "paraula": "TOCAR EL DOS",
    "categoria": "Frase feta"
  },
  {
    "paraula": "VENDRE DUROS A QUATRE PESSETES",
    "categoria": "Frase feta"
  },
  {
    "paraula": "MOOOOONS SI US PLAU",
    "categoria": "Expressió familiar mítica"
  },
  {
    "paraula": "EM TENIU BEN FREGIT",
    "categoria": "Expressió familiar mítica"
  },
  {
    "paraula": "MARE MEVA AQUEST XU COM VIATJA",
    "categoria": "Expressió familiar mítica"
  },
  {
    "paraula": "AI AQUEST XU QUE SE'NS MOR",
    "categoria": "Expressió familiar mítica"
  },
  {
    "paraula": "ESTIC MOLT CANSAT, PREPAREU-ME UN GOT D'AIGUA AMB SUCRE",
    "categoria": "Expressió familiar mítica"
  },
  {
    "paraula": "AI AQUESTA MONS, SEMPRE ANAR BURXANT",
    "categoria": "Expressió familiar mítica"
  },
  {
    "paraula": "A PROP DELS DÉUS",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "AMICS, TIETS I CONEGUTS",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "CITANT MERCÈ RODOREDA",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "DE TOT EL MÓN",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "EL MATRIMONI ARNOLFINI",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "EL TREN DEL TEMPS",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "ES MEU MILLOR ERROR",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "HEM VUNGUT A JUGAR",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "JO MAI MAI",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "LA PORTA DEL CEL",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "LES TEVES PIGUES",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "NO VULL BAIXAR",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "QUE TOT ET VAGI BÉ",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "SOLUCIONS I NO PROBLEMES",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "T'HAS COLAT A UNA FESTA",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "TODAY IS THE DAY",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "LES COSES SENZILLES",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "CLAR QUE T'HE TROBAT A FALTAR",
    "categoria": "Títol de cançó catalana"
  },
  {
    "paraula": "PICA D'ESTATS",
    "categoria": "Muntanya del Pirineu"
  },
  {
    "paraula": "PIC D'ANETO",
    "categoria": "Muntanya del Pirineu"
  },
  {
    "paraula": "PIC DE VINYAMALA",
    "categoria": "Muntanya del Pirineu"
  },
  {
    "paraula": "PIC DE COMAPEDROSA",
    "categoria": "Muntanya del Pirineu"
  },
  {
    "paraula": "PIC DE LA MALADETA",
    "categoria": "Muntanya del Pirineu"
  },
  {
    "paraula": "PIC DE COMALOFORNO",
    "categoria": "Muntanya del Pirineu"
  },
  {
    "paraula": "CILINDRE DE MARBORE",
    "categoria": "Muntanya del Pirineu"
  },
  {
    "paraula": "MONT PERDUT",
    "categoria": "Muntanya del Pirineu"
  },
  {
    "paraula": "TUC DE MOLIÈRES",
    "categoria": "Muntanya del Pirineu"
  },
  {
    "paraula": "PIC DE SOTLLO",
    "categoria": "Muntanya del Pirineu"
  },
  {
    "paraula": "PIC DE COSTA CABIROLERA",
    "categoria": "Muntanya del Pirineu"
  },
  {
    "paraula": "PUIGPEDRÓS",
    "categoria": "Muntanya del Pirineu"
  },
  {
    "paraula": "LONDON EYE",
    "categoria": "Atracció turística visitada"
  },
  {
    "paraula": "PARC NACIONAL DEL TEIDE",
    "categoria": "Atracció turística visitada"
  },
  {
    "paraula": "LLAC DE BRAIES",
    "categoria": "Atracció turística visitada"
  },
  {
    "paraula": "LLACS DE COVADONGA",
    "categoria": "Atracció turística visitada"
  },
  {
    "paraula": "COVA DE GEL EISRIESENWELT",
    "categoria": "Atracció turística visitada"
  },
  {
    "paraula": "BOSC DE SEQUOIES GEGANTS",
    "categoria": "Atracció turística visitada"
  },
  {
    "paraula": "FORAT NEGRE",
    "categoria": "Astronomia"
  },
  {
    "paraula": "ESTRELLA DE NEUTRONS",
    "categoria": "Astronomia"
  },
  {
    "paraula": "ANDRÒMEDA",
    "categoria": "Astronomia"
  },
  {
    "paraula": "CONTAMINACIÓ LUMÍNICA",
    "categoria": "Astronomia"
  },
  {
    "paraula": "NEBULOSA PLANETÀRIA",
    "categoria": "Astronomia"
  },
  {
    "paraula": "CINTURÓ DE KUIPER",
    "categoria": "Astronomia"
  }
];

// Quantes paraules per jugador de cada categoria
const PENJAT_DIST = {
  "Astronomia": 1,
  "Atracció turística visitada": 1,
  "Expressió familiar mítica": 1,
  "Frase feta": 3,
  "Muntanya del Pirineu": 2,
  "Poble de Catalunya": 3,
  "Poble de les Açores": 1,
  "Títol de cançó catalana": 3
};