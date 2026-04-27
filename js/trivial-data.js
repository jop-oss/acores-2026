// ── TRIVIAL · Banc de preguntes ──────────────────────────────
// 1037 preguntes

const TRIVIAL_PREGUNTES = [
  {
    id: 1,
    cat: "esports",
    dif: "mitjana",
    p: "Quina selecció va guanyar l'Eurocopa 2020 (disputada el 2021)?",
    o: [
    "França",
    "Itàlia",
    "Anglaterra",
    "Espanya"
    ],
    c: 1,
  },
  {
    id: 2,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar l'Open d'Austràlia de tennis el 2023?",
    o: [
    "Novak Djokovic",
    "Jannik Sinner",
    "Carlos Alcaraz",
    "Rafael Nadal"
    ],
    c: 0,
  },
  {
    id: 3,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Lliga de Campions 2022-23?",
    o: [
    "Manchester City",
    "Real Madrid",
    "Bayern Munic",
    "PSG"
    ],
    c: 0,
  },
  {
    id: 4,
    cat: "esports",
    dif: "mitjana",
    p: "Quin pilot va guanyar el campionat mundial de F1 el 2022?",
    o: [
    "Lewis Hamilton",
    "Charles Leclerc",
    "Sergio Pérez",
    "Max Verstappen"
    ],
    c: 3,
  },
  {
    id: 5,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar la Volta a Espanya 2023?",
    o: [
    "Enric Mas",
    "Sepp Kuss",
    "Juan Ayuso",
    "Jonas Vingegaard"
    ],
    c: 1,
  },
  {
    id: 6,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador va guanyar el Ballon d'Or 2023?",
    o: [
    "Erling Haaland",
    "Lionel Messi",
    "Vinicius Júnior",
    "Kylian Mbappé"
    ],
    c: 2,
  },
  {
    id: 7,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la NBA el 2023?",
    o: [
    "Denver Nuggets",
    "Miami Heat",
    "Boston Celtics",
    "Lakers"
    ],
    c: 0,
  },
  {
    id: 8,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar l'Wimbledon femenino el 2023?",
    o: [
    "Ons Jabeur",
    "Marketa Vondrousova",
    "Elena Rybakina",
    "Aryna Sabalenka"
    ],
    c: 1,
  },
  {
    id: 9,
    cat: "esports",
    dif: "mitjana",
    p: "Quina selecció va guanyar el Campionat del Món de futbol 2022?",
    o: [
    "França",
    "Argentina",
    "Brasil",
    "Alemanya"
    ],
    c: 1,
  },
  {
    id: 10,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar la Volta a França 2024?",
    o: [
    "Remco Evenepoel",
    "Jonas Vingegaard",
    "Tadej Pogačar",
    "Juan Ayuso"
    ],
    c: 2,
  },
  {
    id: 11,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Supercopa d'Espanya 2023-24?",
    o: [
    "Barcelona",
    "Real Madrid",
    "Atlètic Madrid",
    "Real Sociedad"
    ],
    c: 1,
  },
  {
    id: 12,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar l'Open de França de tennis el 2024?",
    o: [
    "Carlos Alcaraz",
    "Jannik Sinner",
    "Novak Djokovic",
    "Rafael Nadal"
    ],
    c: 0,
  },
  {
    id: 13,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Copa del Rei 2023-24?",
    o: [
    "Real Madrid",
    "Barcelona",
    "Atlètic Madrid",
    "Athletic Bilbao"
    ],
    c: 0,
  },
  {
    id: 14,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar la medalla d'or en 100 metres dones als JJOO 2020 (2021)?",
    o: [
    "Elaine Thompson-Herah",
    "Shelly-Ann Fraser-Pryce",
    "Marie-Josée Ta Lou",
    "Sha'Carri Richardson"
    ],
    c: 0,
  },
  {
    id: 15,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador va ser traspassat al Manchester City per 100 milions el 2021?",
    o: [
    "Jack Grealish",
    "Erling Haaland",
    "Kalvin Phillips",
    "Julian Alvarez"
    ],
    c: 0,
  },
  {
    id: 16,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar l'US Open de tennis el 2023?",
    o: [
    "Novak Djokovic",
    "Carlos Alcaraz",
    "Daniil Medvedev",
    "Jannik Sinner"
    ],
    c: 1,
  },
  {
    id: 17,
    cat: "esports",
    dif: "mitjana",
    p: "Quin ciclista va guanyar el Giro d'Itàlia 2024?",
    o: [
    "Juan Ayuso",
    "Jai Hindley",
    "Egan Bernal",
    "Tadej Pogacar"
    ],
    c: 3,
  },
  {
    id: 18,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar la medalla d'or en 200 metres homes als JJOO 2020 (2021)?",
    o: [
    "Andre De Grasse",
    "Usain Bolt",
    "Lamont Marcell Jacobs",
    "Noah Lyles"
    ],
    c: 0,
  },
  {
    id: 19,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Lliga Europa 2023-24?",
    o: [
    "Atalanta",
    "Sevilla",
    "Villarreal",
    "AS Roma"
    ],
    c: 0,
  },
  {
    id: 20,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar el Premi Laureus al Millor Esportista del 2023?",
    o: [
    "Lionel Messi",
    "Serena Williams",
    "Novak Djokovic",
    "Max Verstappen"
    ],
    c: 3,
  },
  {
    id: 21,
    cat: "esports",
    dif: "mitjana",
    p: "Quina selecció va guanyar la Copa Amèrica 2024?",
    o: [
    "Brasil",
    "Argentina",
    "Uruguay",
    "Colòmbia"
    ],
    c: 1,
  },
  {
    id: 22,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar l'Australian Open el 2024 (dones)?",
    o: [
    "Aryna Sabalenka",
    "Elena Rybakina",
    "Ons Jabeur",
    "Marketa Vondrousova"
    ],
    c: 0,
  },
  {
    id: 23,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador de futbol va fitxar pel Real Madrid el 2024 procedent del PSG?",
    o: [
    "Neymar",
    "Erling Haaland",
    "Kylian Mbappé",
    "Vinicius Júnior"
    ],
    c: 2,
  },
  {
    id: 24,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar la Premier League anglesa 2022-23?",
    o: [
    "Manchester City",
    "Manchester United",
    "Arsenal",
    "Liverpool"
    ],
    c: 0,
  },
  {
    id: 25,
    cat: "esports",
    dif: "mitjana",
    p: "Quin país va allotjar els Jocs Olímpics 2024?",
    o: [
    "Tòquio",
    "París",
    "Los Angeles",
    "Londres"
    ],
    c: 1,
  },
  {
    id: 26,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador va guanyar el Ballon d'Or l'any 2021?",
    o: [
    "Cristiano Ronaldo",
    "Lionel Messi",
    "Robert Lewandowski",
    "Neymar"
    ],
    c: 1,
  },
  {
    id: 27,
    cat: "esports",
    dif: "mitjana",
    p: "Quin país va guanyar la Eurocopa 2020 (disputada el 2021)?",
    o: [
    "Itàlia",
    "Anglaterra",
    "Espanya",
    "França"
    ],
    c: 0,
  },
  {
    id: 28,
    cat: "esports",
    dif: "mitjana",
    p: "Quants Grand Slams individuals ha guanyat Novak Djokovic al llarg de la seva carrera (fins al 2024)?",
    o: [
    "20",
    "22",
    "24",
    "26"
    ],
    c: 2,
  },
  {
    id: 29,
    cat: "esports",
    dif: "mitjana",
    p: "Quina competició va guanyar Lewis Hamilton l'any 2020 malgrat la controvèrsia al final?",
    o: [
    "Campionat Mundial de F1",
    "Gran Premi de Mònaco",
    "Cursa de Le Mans",
    "Dakar Rally"
    ],
    c: 0,
  },
  {
    id: 30,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip de futbol va guanyar la Lliga de Campions 2021-2022?",
    o: [
    "Paris Saint-Germain",
    "Manchester City",
    "Real Madrid",
    "Liverpool"
    ],
    c: 2,
  },
  {
    id: 31,
    cat: "esports",
    dif: "mitjana",
    p: "A quin país es van disputar els Jocs Olímpics d'estiu de 2020 (celebrats el 2021)?",
    o: [
    "Tòquio",
    "Rio de Janeiro",
    "Pequín",
    "París"
    ],
    c: 0,
  },
  {
    id: 32,
    cat: "esports",
    dif: "mitjana",
    p: "Quin esportista va guanyar la medalla de tennis individual femení en els Jocs Olímpics de Tòquio 2021?",
    o: [
    "Serena Williams",
    "Naomi Osaka",
    "Ashleigh Barty",
    "Iga Świątek"
    ],
    c: 1,
  },
  {
    id: 33,
    cat: "esports",
    dif: "mitjana",
    p: "Quins va ser els primers Jocs Olímpics d'hivern disputats a la República Popular de la Xina?",
    o: [
    "2018",
    "2020",
    "2022",
    "2024"
    ],
    c: 2,
  },
  {
    id: 34,
    cat: "esports",
    dif: "mitjana",
    p: "Quina selecció va guanyar la Copa del Món de futbol 2022?",
    o: [
    "Argentina",
    "França",
    "Brasil",
    "Alemanya"
    ],
    c: 0,
  },
  {
    id: 35,
    cat: "esports",
    dif: "mitjana",
    p: "Quin tenista espanyol va guanyar Roland Garros 2022?",
    o: [
    "Rafael Nadal",
    "Carlos Alcaraz",
    "Pablo Carreño",
    "Alejandro Davidovich"
    ],
    c: 0,
  },
  {
    id: 36,
    cat: "esports",
    dif: "mitjana",
    p: "En quin país es va disputar el Mundial de Ciclisme 2023?",
    o: [
    "Escòcia",
    "Bèlgica",
    "Suïssa",
    "Holanda"
    ],
    c: 0,
  },
  {
    id: 37,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador de basquetbol va guanyar l'MVP de l'NBA 2023-2024?",
    o: [
    "Stephen Curry",
    "Nikola Jokic",
    "Luka Dončić",
    "Jayson Tatum"
    ],
    c: 1,
  },
  {
    id: 38,
    cat: "esports",
    dif: "mitjana",
    p: "Quantes medalles d'or va guanyar Katie Ledecky en natació als Jocs Olímpics de Tòquio 2021?",
    o: [
    "1",
    "2",
    "3",
    "4"
    ],
    c: 1,
  },
  {
    id: 39,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Champions League 2022-2023?",
    o: [
    "Real Madrid",
    "Manchester City",
    "Bayern de Munic",
    "Inter de Milà"
    ],
    c: 1,
  },
  {
    id: 40,
    cat: "esports",
    dif: "mitjana",
    p: "Quin circuit va ser afegit al calendari de F1 per primera vegada el 2023?",
    o: [
    "Miami",
    "Las Vegas",
    "Singapur",
    "Bakú"
    ],
    c: 1,
  },
  {
    id: 41,
    cat: "esports",
    dif: "mitjana",
    p: "Quina selecció va guanyar la Copa Amèrica 2021?",
    o: [
    "Brasil",
    "Argentina",
    "Colòmbia",
    "Uruguay"
    ],
    c: 1,
  },
  {
    id: 42,
    cat: "esports",
    dif: "mitjana",
    p: "Quants Ballon d'Or va tenir Messi durant la seva carrera fins al 2023?",
    o: [
    "6",
    "7",
    "8",
    "9"
    ],
    c: 2,
  },
  {
    id: 43,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador va ser el millor golejador de la Copa del Món 2022?",
    o: [
    "Kylian Mbappé",
    "Gerd Müller",
    "Lionel Messi",
    "Cristiano Ronaldo"
    ],
    c: 0,
  },
  {
    id: 44,
    cat: "esports",
    dif: "mitjana",
    p: "En quin any es va disputar la final de la Lliga de Campions 2023-2024?",
    o: [
    "2023",
    "2024",
    "2025",
    "2022"
    ],
    c: 1,
  },
  {
    id: 45,
    cat: "esports",
    dif: "mitjana",
    p: "Quins dos jugadors van compartir el títol de màxim golejador de la Premier League 2021-22?",
    o: [
    "Kane i Salah",
    "Salah i Son",
    "Haaland i Kane",
    "Salah i Firmino"
    ],
    c: 1,
  },
  {
    id: 46,
    cat: "esports",
    dif: "mitjana",
    p: "Quina dona va guanyar el Roland Garros 2023?",
    o: [
    "Iga Świątek",
    "Marketa Vondrousova",
    "Caroline Wozniacki",
    "Ashleigh Barty"
    ],
    c: 0,
  },
  {
    id: 47,
    cat: "esports",
    dif: "mitjana",
    p: "Quin coredor va guanyar el Tour de França 2023?",
    o: [
    "Jonas Vingegaard",
    "Remco Evenepoel",
    "Egan Bernal",
    "Tadej Pogačar"
    ],
    c: 0,
  },
  {
    id: 48,
    cat: "esports",
    dif: "mitjana",
    p: "A quina ciutat es va disputar la final de la Champions League 2023-2024?",
    o: [
    "Berlín",
    "Londres (Wembley)",
    "París",
    "Milà"
    ],
    c: 1,
  },
  {
    id: 49,
    cat: "esports",
    dif: "mitjana",
    p: "Quina selecció va guanyar la Lliga de Nacions de la UEFA 2020-2021?",
    o: [
    "França",
    "Itàlia",
    "Espanya",
    "Holanda"
    ],
    c: 0,
  },
  {
    id: 50,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la SuperCopa d'Espanya 2023-2024?",
    o: [
    "FC Barcelona",
    "Real Madrid",
    "Atlètic de Madrid",
    "Athletic Club"
    ],
    c: 1,
  },
  {
    id: 51,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Lliga de Campions el 2020?",
    o: [
    "Paris Saint-Germain",
    "Bayern de Munic",
    "Manchester City",
    "Liverpool"
    ],
    c: 1,
  },
  {
    id: 52,
    cat: "esports",
    dif: "mitjana",
    p: "Quin tenista va guanyar l'Australian Open el 2021?",
    o: [
    "Rafael Nadal",
    "Novak Djokovic",
    "Dominic Thiem",
    "Daniil Medvedev"
    ],
    c: 1,
  },
  {
    id: 53,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Super Bowl LV el febrer de 2021?",
    o: [
    "Tampa Bay Buccaneers",
    "Kansas City Chiefs",
    "Green Bay Packers",
    "New England Patriots"
    ],
    c: 0,
  },
  {
    id: 54,
    cat: "esports",
    dif: "mitjana",
    p: "En quina ciutat es van celebrar els Jocs Olímpics de 2021?",
    o: [
    "Rio de Janeiro",
    "Tòquio",
    "París",
    "Los Angeles"
    ],
    c: 1,
  },
  {
    id: 55,
    cat: "esports",
    dif: "mitjana",
    p: "Quin ciclista va guanyar el Tour de França el 2021?",
    o: [
    "Egan Bernal",
    "Tadej Pogacar",
    "Jonas Vingegaard",
    "Geraint Thomas"
    ],
    c: 1,
  },
  {
    id: 56,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip de bàsquet va guanyar la NBA el 2022?",
    o: [
    "Boston Celtics",
    "Golden State Warriors",
    "Los Angeles Lakers",
    "Miami Heat"
    ],
    c: 1,
  },
  {
    id: 57,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador va guanyar el Balón d'Or el 2021?",
    o: [
    "Robert Lewandowski",
    "Lionel Messi",
    "Cristiano Ronaldo",
    "Karim Benzema"
    ],
    c: 1,
  },
  {
    id: 58,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Eurocopa de futbol el 2020?",
    o: [
    "Anglaterra",
    "Itàlia",
    "Espanya",
    "França"
    ],
    c: 1,
  },
  {
    id: 59,
    cat: "esports",
    dif: "mitjana",
    p: "Quin tenista va guanyar Roland Garros el 2022?",
    o: [
    "Novak Djokovic",
    "Rafael Nadal",
    "Carlos Alcaraz",
    "Dominic Thiem"
    ],
    c: 1,
  },
  {
    id: 60,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Lliga de Campions el 2023?",
    o: [
    "Real Madrid",
    "Manchester City",
    "Bayern de Munic",
    "Paris Saint-Germain"
    ],
    c: 1,
  },
  {
    id: 61,
    cat: "esports",
    dif: "mitjana",
    p: "Quin ciclista va guanyar el Tour de França el 2023?",
    o: [
    "Tadej Pogacar",
    "Jonas Vingegaard",
    "Remco Evenepoel",
    "Tom Pidcock"
    ],
    c: 1,
  },
  {
    id: 62,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador de futbol va guanyar el Balón d'Or el 2023?",
    o: [
    "Erling Haaland",
    "Lionel Messi",
    "Cristiano Ronaldo",
    "Kylian Mbappé"
    ],
    c: 1,
  },
  {
    id: 63,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip de bàsquet va guanyar la NBA el 2023?",
    o: [
    "Denver Nuggets",
    "Boston Celtics",
    "Los Angeles Lakers",
    "Golden State Warriors"
    ],
    c: 0,
  },
  {
    id: 64,
    cat: "esports",
    dif: "mitjana",
    p: "Quin pilot va guanyar el campionat mundial de F1 el 2021?",
    o: [
    "Lewis Hamilton",
    "Max Verstappen",
    "Valtteri Bottas",
    "Sergio Pérez"
    ],
    c: 1,
  },
  {
    id: 65,
    cat: "esports",
    dif: "mitjana",
    p: "Quin tenista va guanyar Wimbledon el 2023?",
    o: [
    "Novak Djokovic",
    "Carlos Alcaraz",
    "Roger Federer",
    "Andy Murray"
    ],
    c: 1,
  },
  {
    id: 66,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Copa del Món de futbol el 2022?",
    o: [
    "França",
    "Argentina",
    "Brasil",
    "Alemanya"
    ],
    c: 1,
  },
  {
    id: 67,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador va guanyar el Balón d'Or el 2022?",
    o: [
    "Erling Haaland",
    "Robert Lewandowski",
    "Karim Benzema",
    "Luka Modrić"
    ],
    c: 2,
  },
  {
    id: 68,
    cat: "esports",
    dif: "mitjana",
    p: "Quin pilot va guanyar el campionat mundial de F1 el 2023?",
    o: [
    "Max Verstappen",
    "Lewis Hamilton",
    "Charles Leclerc",
    "Sergio Pérez"
    ],
    c: 0,
  },
  {
    id: 69,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Super Bowl LVII el febrer de 2023?",
    o: [
    "Kansas City Chiefs",
    "Philadelphia Eagles",
    "San Francisco 49ers",
    "Cincinnati Bengals"
    ],
    c: 0,
  },
  {
    id: 70,
    cat: "esports",
    dif: "mitjana",
    p: "Quin ciclista va guanyar el Giro d'Itàlia el 2024?",
    o: [
    "Jonas Vingegaard",
    "Juan Ayuso",
    "Jai Hindley",
    "Tadej Pogacar"
    ],
    c: 3,
  },
  {
    id: 71,
    cat: "esports",
    dif: "mitjana",
    p: "Quin tenista va guanyar l'US Open el 2023?",
    o: [
    "Jannik Sinner",
    "Novak Djokovic",
    "Carlos Alcaraz",
    "Taylor Fritz"
    ],
    c: 2,
  },
  {
    id: 72,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Lliga de Campions el 2024?",
    o: [
    "Real Madrid",
    "Bayern de Munic",
    "Manchester City",
    "Borussia Dortmund"
    ],
    c: 0,
  },
  {
    id: 73,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador va guanyar el Balón d'Or el 2024?",
    o: [
    "Jude Bellingham",
    "Rodri Hernández",
    "Erling Haaland",
    "Kylian Mbappé"
    ],
    c: 1,
  },
  {
    id: 74,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Copa del Rei de futbol el 2024?",
    o: [
    "Real Madrid",
    "Barcelona",
    "Atlético de Madrid",
    "Athletic Bilbao"
    ],
    c: 1,
  },
  {
    id: 75,
    cat: "esports",
    dif: "mitjana",
    p: "Quin tenista va guanyar l'Australian Open el 2024?",
    o: [
    "Jannik Sinner",
    "Novak Djokovic",
    "Carlos Alcaraz",
    "Daniil Medvedev"
    ],
    c: 0,
  },
  {
    id: 76,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Lliga de Campions de la UEFA el 2023?",
    o: [
    "Manchester City",
    "Real Madrid",
    "Bayern de Munic",
    "PSG"
    ],
    c: 0,
  },
  {
    id: 77,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar l'Open d'Austràlia de tennis el 2024 en la categoria masculina?",
    o: [
    "Novak Djokovic",
    "Jannik Sinner",
    "Carlos Alcaraz",
    "Daniil Medvedev"
    ],
    c: 1,
  },
  {
    id: 78,
    cat: "esports",
    dif: "mitjana",
    p: "Quin ciclista va guanyar el Tour de França el 2024?",
    o: [
    "Jonas Vingegaard",
    "Tadej Pogacar",
    "Jai Hindley",
    "Juan Ayuso"
    ],
    c: 1,
  },
  {
    id: 79,
    cat: "esports",
    dif: "mitjana",
    p: "En quina edició del Mundial de futbol es va celebrar el 2022?",
    o: [
    "Qatar 2022",
    "Rússia 2022",
    "EUA 2022",
    "Canadà 2022"
    ],
    c: 0,
  },
  {
    id: 80,
    cat: "esports",
    dif: "mitjana",
    p: "Quin país va guanyar la Copa del Món femenina de futbol el 2023?",
    o: [
    "Espanya",
    "Alemanya",
    "Noruega",
    "Suècia"
    ],
    c: 0,
  },
  {
    id: 81,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va ser el campió del món de Fórmula 1 el 2023?",
    o: [
    "Max Verstappen",
    "Lewis Hamilton",
    "Charles Leclerc",
    "Sergio Pérez"
    ],
    c: 0,
  },
  {
    id: 82,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar l'NBA el 2023?",
    o: [
    "Denver Nuggets",
    "Boston Celtics",
    "Golden State Warriors",
    "Los Angeles Lakers"
    ],
    c: 0,
  },
  {
    id: 83,
    cat: "esports",
    dif: "mitjana",
    p: "Quina tennista va guanyar Roland Garros el 2023?",
    o: [
    "Marketa Vondrousova",
    "Iga Świątek",
    "Aryna Sabalenka",
    "Elena Rybakina"
    ],
    c: 1,
  },
  {
    id: 84,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar la medalla d'or en els 100 metres plana masculins dels Jocs Olímpics de París 2024?",
    o: [
    "Noah Lyles",
    "Marcell Jacobs",
    "Fred Kerley",
    "Kishane Thompson"
    ],
    c: 0,
  },
  {
    id: 85,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Supercopa d'Espanya el 2023?",
    o: [
    "Real Madrid",
    "Barcelona",
    "Atlètic Madrid",
    "Sevilla"
    ],
    c: 0,
  },
  {
    id: 86,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va ser la primera dona a completar la Vuelta a Espanya el 2024?",
    o: [
    "Jai Hindley",
    "Annemiek Van Vleuten",
    "Katarzyna Niewiadoma",
    "Cecilia Ludwig"
    ],
    c: 2,
  },
  {
    id: 87,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la Lliga dels Campions de bàsquet el 2023?",
    o: [
    "FC Barcelona",
    "AS Mònaco",
    "Olympiacos",
    "Real Madrid"
    ],
    c: 0,
  },
  {
    id: 88,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar l'Australian Open masculí de tennis el 2023?",
    o: [
    "Novak Djokovic",
    "Stefanos Tsitsipas",
    "Jannik Sinner",
    "Daniil Medvedev"
    ],
    c: 0,
  },
  {
    id: 89,
    cat: "esports",
    dif: "mitjana",
    p: "Quin corredor va guanyar el maraó de Tòquio el 2023?",
    o: [
    "Eliud Kipchoge",
    "Abdi Nageeye",
    "Kelvin Kiptum",
    "Daniel Wanjiru"
    ],
    c: 2,
  },
  {
    id: 90,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador va guanyar el Baló d'Or el 2023?",
    o: [
    "Cristiano Ronaldo",
    "Lionel Messi",
    "Kylian Mbappé",
    "Rodri Hernández"
    ],
    c: 1,
  },
  {
    id: 91,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va ser la campiona de l'Wimbledon femení el 2023?",
    o: [
    "Aryna Sabalenka",
    "Elena Rybakina",
    "Ons Jabeur",
    "Marketa Vondrousova"
    ],
    c: 3,
  },
  {
    id: 92,
    cat: "esports",
    dif: "mitjana",
    p: "Quin país va guanyar la Copa d'Europa de voleibol femení el 2023?",
    o: [
    "Itàlia",
    "Turquia",
    "Sèrbia",
    "Polònia"
    ],
    c: 1,
  },
  {
    id: 93,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va ser el campió del món d'atletisme el 2023 en 800 metres plana masculí?",
    o: [
    "Emmanuel Korir",
    "David Rudisha",
    "Djamel Sedjati",
    "Wycliffe Kipchoge"
    ],
    c: 2,
  },
  {
    id: 94,
    cat: "esports",
    dif: "mitjana",
    p: "Quin equip va guanyar la FA Cup anglesa el 2023?",
    o: [
    "Chelsea",
    "Manchester United",
    "Brighton",
    "Manchester City"
    ],
    c: 3,
  },
  {
    id: 95,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va ser el millor jugador de la Copa del Món 2022?",
    o: [
    "Kylian Mbappé",
    "Lionel Messi",
    "Ángel Di María",
    "Gonzalo Montiel"
    ],
    c: 1,
  },
  {
    id: 96,
    cat: "esports",
    dif: "mitjana",
    p: "En quina ciutat es van celebrar els Jocs Olímpics d'estiu del 2024?",
    o: [
    "París",
    "Los Ángeles",
    "Tòquio",
    "Madrid"
    ],
    c: 0,
  },
  {
    id: 97,
    cat: "esports",
    dif: "mitjana",
    p: "Qui va guanyar l'US Open de tennis el 2024 en categoria masculina?",
    o: [
    "Jannik Sinner",
    "Taylor Fritz",
    "Novak Djokovic",
    "Carlos Alcaraz"
    ],
    c: 0,
  },
  {
    id: 99,
    cat: "esports",
    dif: "mitjana",
    p: "Quin nedador va guanyar l'or en 100m papallona als Mundials de natació de Fukuoka 2023?",
    o: [
    "Caeleb Dressel",
    "Kyle Chalmers",
    "Kristóf Milák",
    "Adam Peaty"
    ],
    c: 2,
  },
  {
    id: 100,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador va guanyar el Baló d'Or el 2024?",
    o: [
    "Rodri Hernández",
    "Erling Haaland",
    "Jude Bellingham",
    "Kylian Mbappé"
    ],
    c: 0,
  },
  {
    id: 101,
    cat: "esports",
    dif: "alta",
    p: "Quin tenista va guanyar l'Open d'Austràlia 2023?",
    o: [
    "Novak Djokovic",
    "Jannik Sinner",
    "Carlos Alcaraz",
    "Stefanos Tsitsipas"
    ],
    c: 0,
  },
  {
    id: 102,
    cat: "esports",
    dif: "alta",
    p: "En quina posició va acabar Lewis Hamilton al campionat mundial de F1 2024?",
    o: [
    "Segon",
    "Quart",
    "Tercer",
    "Sisè"
    ],
    c: 2,
  },
  {
    id: 103,
    cat: "esports",
    dif: "alta",
    p: "Quin equip va guanyar la Lliga de Campions 2023-24?",
    o: [
    "Manchester City",
    "Real Madrid",
    "Bayern de Múnic",
    "Inter de Milà"
    ],
    c: 1,
  },
  {
    id: 104,
    cat: "esports",
    dif: "alta",
    p: "Quants Ors olímpics va guanyar Simone Biles als Jocs de París 2024?",
    o: [
    "2",
    "3",
    "4",
    "5"
    ],
    c: 2,
  },
  {
    id: 105,
    cat: "esports",
    dif: "alta",
    p: "Quin ciclista va guanyar el Tour de França 2024?",
    o: [
    "Remco Evenepoel",
    "Jonas Vingegaard",
    "Tadej Pogacar",
    "Juan Ayuso"
    ],
    c: 2,
  },
  {
    id: 106,
    cat: "esports",
    dif: "alta",
    p: "En quina temporada va debutar Max Verstappen a la F1?",
    o: [
    "2014",
    "2015",
    "2016",
    "2017"
    ],
    c: 1,
  },
  {
    id: 107,
    cat: "esports",
    dif: "alta",
    p: "Quin equip va guanyar l'Eurolliga de bàsquet 2023-24?",
    o: [
    "Real Madrid",
    "CSKA Moscou",
    "Panathinaikos",
    "Olympiacos"
    ],
    c: 0,
  },
  {
    id: 108,
    cat: "esports",
    dif: "alta",
    p: "Quants Grand Slams va guanyar Novak Djokovic el 2021?",
    o: [
    "1",
    "2",
    "3",
    "4"
    ],
    c: 3,
  },
  {
    id: 109,
    cat: "esports",
    dif: "alta",
    p: "En quin país es va celebrar la Eurocopa de futbol 2024?",
    o: [
    "Espanya",
    "Alemanya",
    "França",
    "Itàlia"
    ],
    c: 1,
  },
  {
    id: 110,
    cat: "esports",
    dif: "alta",
    p: "Quin atleta va guanyar la marató dels Jocs Olímpics de Tòquio 2021 en categoria masculina?",
    o: [
    "Eliud Kipchoge",
    "Abdi Nageeye",
    "Lawrence Cherono",
    "Galen Rupp"
    ],
    c: 0,
  },
  {
    id: 111,
    cat: "esports",
    dif: "alta",
    p: "Quin equip va guanyar la Copa del Rei de futbol 2023-24?",
    o: [
    "FC Barcelona",
    "Real Madrid",
    "Atlètic de Madrid",
    "Real Sociedad"
    ],
    c: 1,
  },
  {
    id: 112,
    cat: "esports",
    dif: "alta",
    p: "Quin jugador va guanyar el Baló d'Or 2023?",
    o: [
    "Erling Haaland",
    "Lionel Messi",
    "Rodri",
    "Kylian Mbappé"
    ],
    c: 1,
  },
  {
    id: 113,
    cat: "esports",
    dif: "alta",
    p: "Quantes medalles va guanyar Caeleb Dressel a la natació dels Jocs de Tòquio 2021?",
    o: [
    "2",
    "3",
    "5",
    "7"
    ],
    c: 2,
  },
  {
    id: 114,
    cat: "esports",
    dif: "alta",
    p: "Quin jugador va guanyar el Baló d'Or 2024?",
    o: [
    "Vinicius Jr",
    "Rodri",
    "Kyliam Mbappé",
    "Jude Bellingham"
    ],
    c: 1,
  },
  {
    id: 115,
    cat: "esports",
    dif: "alta",
    p: "Quin equip va guanyar la Champions League de bàsquet 2021-22?",
    o: [
    "Real Madrid",
    "Barcelona",
    "Anadolu Efes",
    "CSKA Moscou"
    ],
    c: 1,
  },
  {
    id: 116,
    cat: "esports",
    dif: "alta",
    p: "Quants títols de Grand Slam va guanyar Iga Swiatek entre 2020 i 2024?",
    o: [
    "1",
    "2",
    "3",
    "5"
    ],
    c: 3,
  },
  {
    id: 117,
    cat: "esports",
    dif: "alta",
    p: "Quin ciclista va guanyar la Volta a Espanya 2023?",
    o: [
    "Jai Hindley",
    "Enric Mas",
    "Remco Evenepoel",
    "Egan Bernal"
    ],
    c: 2,
  },
  {
    id: 118,
    cat: "esports",
    dif: "alta",
    p: "En quina temporada va guanyar el primer títol de F1 Max Verstappen?",
    o: [
    "2020",
    "2021",
    "2022",
    "2023"
    ],
    c: 1,
  },
  {
    id: 119,
    cat: "esports",
    dif: "alta",
    p: "Quin jugador de futbol va guanyar el Trofeu The Best FIFA 2023?",
    o: [
    "Kylian Mbappé",
    "Erling Haaland",
    "Lionel Messi",
    "Rodri"
    ],
    c: 1,
  },
  {
    id: 120,
    cat: "esports",
    dif: "alta",
    p: "Quin equip va guanyar la Supercopa d'Espanya de futbol 2024?",
    o: [
    "FC Barcelona",
    "Real Madrid",
    "Atlètic de Madrid",
    "Sevilla"
    ],
    c: 1,
  },
  {
    id: 121,
    cat: "esports",
    dif: "alta",
    p: "Quants ors olímpics va aconseguir Sun Yang a Tòquio 2021?",
    o: [
    "0",
    "1",
    "2",
    "3"
    ],
    c: 0,
  },
  {
    id: 122,
    cat: "esports",
    dif: "alta",
    p: "Quin tennista va guanyar l'US Open 2024?",
    o: [
    "Jannik Sinner",
    "Novak Djokovic",
    "Carlos Alcaraz",
    "Taylor Fritz"
    ],
    c: 0,
  },
  {
    id: 123,
    cat: "esports",
    dif: "alta",
    p: "Quin jugador va guanyar el Trofeu Zamora de La Liga 2023-24 (menys gols encaixats)?",
    o: [
    "Andriy Lunin",
    "David Raya",
    "Unai Simón",
    "Kepa Arrizabalaga"
    ],
    c: 0,
  },
  {
    id: 124,
    cat: "esports",
    dif: "alta",
    p: "Quants títols de Wimbledon va guanyar Novak Djokovic entre 2020 i 2024?",
    o: [
    "1",
    "2",
    "3",
    "4"
    ],
    c: 1,
  },
  {
    id: 125,
    cat: "esports",
    dif: "alta",
    p: "Quin equip va guanyar la Lliga de Campions de futbol 2024-25?",
    o: [
    "Real Madrid",
    "Manchester City",
    "Arsenal",
    "Paris Saint-Germain"
    ],
    c: 3,
  },
  {
    id: 126,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Kazakhstan?",
    o: [
    "Almati",
    "Bishkek",
    "Astana",
    "Karaganda"
    ],
    c: 2,
  },
  {
    id: 127,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin riu és el més llarg d'Àfrica?",
    o: [
    "Nil",
    "Congo",
    "Zambezi",
    "Níger"
    ],
    c: 0,
  },
  {
    id: 128,
    cat: "geografia",
    dif: "mitjana",
    p: "A quin país pertany la muntanya més alta del món?",
    o: [
    "Tibet",
    "Nepal",
    "Pakistan",
    "Índia"
    ],
    c: 1,
  },
  {
    id: 129,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Botswana?",
    o: [
    "Harare",
    "Gaborone",
    "Lusaka",
    "Windhoek"
    ],
    c: 1,
  },
  {
    id: 130,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin continent té el clima més sec?",
    o: [
    "Àfrica",
    "Antàrtida",
    "Oceania",
    "Amèrica del Sud"
    ],
    c: 1,
  },
  {
    id: 131,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin país limita amb més altres països del món?",
    o: [
    "Rússia",
    "França",
    "Alemanya",
    "China"
    ],
    c: 0,
  },
  {
    id: 132,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Lesotho?",
    o: [
    "Maseru",
    "Mbabane",
    "Gaborone",
    "Bloemfontein"
    ],
    c: 0,
  },
  {
    id: 133,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la principal muntanya de Grècia?",
    o: [
    "Parnàs",
    "Olimp",
    "Pindos",
    "Taigeto"
    ],
    c: 1,
  },
  {
    id: 134,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin riu travessa Egipte i és vital per al país?",
    o: [
    "Nil",
    "Suez",
    "Eufrates",
    "Jordà"
    ],
    c: 0,
  },
  {
    id: 135,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin país té més de 17.000 illes?",
    o: [
    "Filipines",
    "Indonèsia",
    "Noruega",
    "Suècia"
    ],
    c: 1,
  },
  {
    id: 136,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Namibia?",
    o: [
    "Windhoek",
    "Lüderitz",
    "Swakopmund",
    "Okahandja"
    ],
    c: 0,
  },
  {
    id: 137,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina cadena muntanyosa forma la frontera entre la Índia i el Nepal?",
    o: [
    "Andes",
    "Himàlaia",
    "Tian Shan",
    "Hindu Kush"
    ],
    c: 1,
  },
  {
    id: 138,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin país és el més gran de l'Amèrica del Sud per superfície?",
    o: [
    "Perú",
    "Brasil",
    "Argentina",
    "Colombia"
    ],
    c: 1,
  },
  {
    id: 139,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin riu és el més gran en cabal d'aigua del món?",
    o: [
    "Nil",
    "Amazones",
    "Iang-Tse",
    "Mississipí"
    ],
    c: 1,
  },
  {
    id: 140,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Mauritius?",
    o: [
    "Port Louis",
    "Curepipe",
    "Quatre Bornes",
    "Vacoas"
    ],
    c: 0,
  },
  {
    id: 141,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin país europeu no pertany a la Unió Europea ni a l'EEE?",
    o: [
    "Noruega",
    "Suïssa",
    "Islàndia",
    "Liechtenstein"
    ],
    c: 1,
  },
  {
    id: 142,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina es la capital de Djibouti?",
    o: [
    "Djibouti",
    "Tadjourah",
    "Obock",
    "Ali Sabieh"
    ],
    c: 0,
  },
  {
    id: 143,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina muntanya és el pic més alt d'Europa occidental?",
    o: [
    "Monblanc",
    "Gran Paradís",
    "Mont Rose",
    "Breithorn"
    ],
    c: 0,
  },
  {
    id: 144,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin país té la capital més alta del món sobre el nivell del mar?",
    o: [
    "Bolívia",
    "Perú",
    "Equador",
    "Colòmbia"
    ],
    c: 0,
  },
  {
    id: 145,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin riu separa els EUA de Mèxic?",
    o: [
    "Colorado",
    "Bravo",
    "Pecos",
    "Nueces"
    ],
    c: 1,
  },
  {
    id: 146,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Serra Leona?",
    o: [
    "Bo",
    "Freetown",
    "Kenema",
    "Makeni"
    ],
    c: 1,
  },
  {
    id: 147,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin país és conegut com el país dels mil llacs pel seu enorme nombre de llacs?",
    o: [
    "Suècia",
    "Finlàndia",
    "Canadà",
    "Noruega"
    ],
    c: 1,
  },
  {
    id: 148,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina cadena muntanyosa separa Espanya de França?",
    o: [
    "Pirineus",
    "Carpats",
    "Alps",
    "Mals d'Aran"
    ],
    c: 0,
  },
  {
    id: 149,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin país africà no va ser colonitzat per cap potència europea?",
    o: [
    "Libèria",
    "Etiòpia",
    "Guinea Equatorial",
    "Lesotho"
    ],
    c: 1,
  },
  {
    id: 150,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Comores?",
    o: [
    "Mitsamiouli",
    "Moroni",
    "Fomboni",
    "Domoni"
    ],
    c: 1,
  },
  {
    id: 151,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Mongòlia?",
    o: [
    "Ulan Bator",
    "Darkhan",
    "Erdenet",
    "Choibalsan"
    ],
    c: 0,
  },
  {
    id: 153,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina muntanya és la més alta del continent americà?",
    o: [
    "Mont McKinley",
    "Aconcagua",
    "Chimborazo",
    "Illimani"
    ],
    c: 1,
  },
  {
    id: 154,
    cat: "geografia",
    dif: "mitjana",
    p: "Quants continents hi ha a la Terra?",
    o: [
    "5",
    "6",
    "7",
    "8"
    ],
    c: 2,
  },
  {
    id: 156,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la muntanya més alta d'Europa?",
    o: [
    "Mont Blanc",
    "Elbrus",
    "Gran Paradís",
    "Mont Rosa"
    ],
    c: 1,
  },
  {
    id: 157,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina ciutat és la capital de Botswana?",
    o: [
    "Francistown",
    "Gaborone",
    "Maun",
    "Selebi-Phikwe"
    ],
    c: 1,
  },
  {
    id: 158,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin riu travessa París?",
    o: [
    "Riu Loire",
    "Riu Sena",
    "Riu Garona",
    "Riu Mosa"
    ],
    c: 1,
  },
  {
    id: 159,
    cat: "geografia",
    dif: "mitjana",
    p: "Quants países componen l'ASEAN?",
    o: [
    "8",
    "9",
    "10",
    "11"
    ],
    c: 2,
  },
  {
    id: 161,
    cat: "geografia",
    dif: "mitjana",
    p: "Quins dos mers connecta el Canal de Suez?",
    o: [
    "Mediterrània i Negra",
    "Mediterrània i Roja",
    "Roja i Aràbia",
    "Mediterrània i Còspia"
    ],
    c: 1,
  },
  {
    id: 163,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina frontera natural separa França de Suïssa?",
    o: [
    "Alps",
    "Pirineus",
    "Jura",
    "Vosgos"
    ],
    c: 2,
  },
  {
    id: 164,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la ciutat més gran de Tailàndia?",
    o: [
    "Chiang Mai",
    "Bangkok",
    "Pattaya",
    "Khon Kaen"
    ],
    c: 1,
  },
  {
    id: 166,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin riu és el més llarg d'Àsia?",
    o: [
    "Riu Iang-tsé",
    "Riu Ganges",
    "Riu Mekong",
    "Riu Bramaputra"
    ],
    c: 0,
  },
  {
    id: 167,
    cat: "geografia",
    dif: "mitjana",
    p: "En quin continent es troba el desert més gran del món?",
    o: [
    "Àfrica",
    "Àsia",
    "Antàrtida",
    "Amèrica del Nord"
    ],
    c: 2,
  },
  {
    id: 168,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Vanuatu?",
    o: [
    "Luganville",
    "Port Vila",
    "Isangel",
    "Sola"
    ],
    c: 1,
  },
  {
    id: 169,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina cordillera és frontera entre Xile i Argentina?",
    o: [
    "Sierra Madre",
    "Andes",
    "Serras do Mar",
    "Cordillera Central"
    ],
    c: 1,
  },
  {
    id: 170,
    cat: "geografia",
    dif: "mitjana",
    p: "Quants oceans hi ha al planeta?",
    o: [
    "3",
    "4",
    "5",
    "6"
    ],
    c: 2,
  },
  {
    id: 171,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Surínam?",
    o: [
    "Nieuw Nickerie",
    "Paramaribo",
    "Lelydorp",
    "Albina"
    ],
    c: 1,
  },
  {
    id: 172,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina ciutat és la capital de Namíbia?",
    o: [
    "Windhoek",
    "Walvis Bay",
    "Swakopmund",
    "Keetmanshoop"
    ],
    c: 0,
  },
  {
    id: 173,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin riu separa els Estats Units del Mèxic?",
    o: [
    "Riu Colorado",
    "Riu Bravo",
    "Riu Arkansas",
    "Riu Missouri"
    ],
    c: 1,
  },
  {
    id: 174,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Seychelles?",
    o: [
    "Anse aux Pins",
    "Victoria",
    "Beau Vallon",
    "Grand Anse"
    ],
    c: 1,
  },
  {
    id: 175,
    cat: "geografia",
    dif: "mitjana",
    p: "En quina serralada es troba el Mont Everest?",
    o: [
    "Karakòrum",
    "Himàlaia",
    "Hindu Kush",
    "Tian Shan"
    ],
    c: 1,
  },
  {
    id: 176,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Bielorússia?",
    o: [
    "Grodno",
    "Minsk",
    "Brest",
    "Vitebsk"
    ],
    c: 1,
  },
  {
    id: 177,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin és el riu més llarg d'Àfrica?",
    o: [
    "Zàmbia",
    "Nil",
    "Congo",
    "Limpopo"
    ],
    c: 1,
  },
  {
    id: 178,
    cat: "geografia",
    dif: "mitjana",
    p: "En quin continent es troba la muntanya més alta del món?",
    o: [
    "Sud-amèrica",
    "Àfrica",
    "Àsia",
    "Antàrtida"
    ],
    c: 2,
  },
  {
    id: 181,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la frontera més llarga del món entre dos països?",
    o: [
    "Estats Units-Canadà",
    "Rússia-Kazajstán",
    "Rússia-Ucraïna",
    "França-Espanya"
    ],
    c: 0,
  },
  {
    id: 182,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin desert és el més gran del món?",
    o: [
    "Sàhara",
    "Gobi",
    "Atacama",
    "Antàrtida"
    ],
    c: 3,
  },
  {
    id: 183,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Madagascar?",
    o: [
    "Antsirabe",
    "Antananarivo",
    "Toliara",
    "Fianarantsoa"
    ],
    c: 1,
  },
  {
    id: 184,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin és el país més poblat de la Unió Europea?",
    o: [
    "Alemanya",
    "Rússia",
    "Itàlia",
    "Espanya"
    ],
    c: 0,
  },
  {
    id: 186,
    cat: "geografia",
    dif: "mitjana",
    p: "En quin continent es troba el desert de Kalahari?",
    o: [
    "Àsia",
    "Àmerica del Sud",
    "Àfrica",
    "Oceania"
    ],
    c: 2,
  },
  {
    id: 187,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Líban?",
    o: [
    "Trípoli",
    "Beirut",
    "Sidó",
    "Tir"
    ],
    c: 1,
  },
  {
    id: 188,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin país és més gran en superfície: Mongolia o Perú?",
    o: [
    "Mongolia",
    "Perú",
    "Són iguals",
    "La diferència és menys de 1.000 km²"
    ],
    c: 0,
  },
  {
    id: 189,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Brunei?",
    o: [
    "Bandar Seri Begawan",
    "Kota Kinabalu",
    "Kuching",
    "Miri"
    ],
    c: 0,
  },
  {
    id: 190,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin riu travessa Egipte?",
    o: [
    "Tigris",
    "Nil",
    "Eufrates",
    "Jordà"
    ],
    c: 1,
  },
  {
    id: 191,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin és el país més alt del món en altitud mitjana?",
    o: [
    "Nepal",
    "Bhutan",
    "Lesotho",
    "Tibet"
    ],
    c: 2,
  },
  {
    id: 192,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Kirguizistan?",
    o: [
    "Osh",
    "Bishkek",
    "Jalal-Abad",
    "Talas"
    ],
    c: 1,
  },
  {
    id: 193,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin clima caracteritza la regió del Sàhel?",
    o: [
    "Tropical",
    "Subtropical",
    "Semiàrid",
    "Temperat"
    ],
    c: 2,
  },
  {
    id: 195,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin país és el que té el territori més gran del món?",
    o: [
    "Canadà",
    "EUA",
    "Xina",
    "Rússia"
    ],
    c: 3,
  },
  {
    id: 196,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la muntanya més alta d'Oceania?",
    o: [
    "Mont Cook",
    "Puncak Jaya",
    "Mont Kosciuszko",
    "Mauna Kea"
    ],
    c: 1,
  },
  {
    id: 197,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin és el país més petit del món per superfície?",
    o: [
    "Mònaco",
    "Liechtenstein",
    "Vaticà",
    "San Marino"
    ],
    c: 2,
  },
  {
    id: 198,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Timor Oriental?",
    o: [
    "Dili",
    "Baucau",
    "Maliana",
    "Lospalos"
    ],
    c: 0,
  },
  {
    id: 199,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la frontera natural principal entre França i Espanya?",
    o: [
    "El riu Sena",
    "El riu Ebre",
    "El riu Rin",
    "Els Pirineus"
    ],
    c: 3,
  },
  {
    id: 200,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin país ocupava l'antiga Mesoamèrica?",
    o: [
    "Guatemala",
    "Mèxic",
    "Belize",
    "Totes les anteriors"
    ],
    c: 3,
  },
  {
    id: 203,
    cat: "geografia",
    dif: "mitjana",
    p: "A quin continent pertany Madagascar?",
    o: [
    "Àfrica",
    "Àsia",
    "Oceania",
    "Antàrtida"
    ],
    c: 0,
  },
  {
    id: 204,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la muntanya més alta del Nepal?",
    o: [
    "Kangchenjunga",
    "Makalu",
    "Everest",
    "Lhotse"
    ],
    c: 2,
  },
  {
    id: 205,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina ciutat és la capital de Nova Zelanda?",
    o: [
    "Auckland",
    "Wellington",
    "Christchurch",
    "Dunedin"
    ],
    c: 1,
  },
  {
    id: 206,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin país té la major part del seu territori al desert del Sàhara?",
    o: [
    "Mali",
    "Líbia",
    "Algèria",
    "Mauritània"
    ],
    c: 2,
  },
  {
    id: 207,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin riu forma part de la frontera entre Espanya i Portugal al sud?",
    o: [
    "Duero",
    "Minho",
    "Tajo",
    "Guadalquivir"
    ],
    c: 2,
  },
  {
    id: 208,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Bòtsuana?",
    o: [
    "Francistown",
    "Gaborone",
    "Serowe",
    "Maun"
    ],
    c: 1,
  },
  {
    id: 209,
    cat: "geografia",
    dif: "mitjana",
    p: "A quina zona climàtica pertany la major part de l'Antàrtida?",
    o: [
    "Tropical",
    "Desèrtica polar",
    "Temperada",
    "Subtropical"
    ],
    c: 1,
  },
  {
    id: 210,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin país sud-americà limita amb 10 dels 12 països del continent?",
    o: [
    "Argentina",
    "Perú",
    "Brasil",
    "Colòmbia"
    ],
    c: 2,
  },
  {
    id: 213,
    cat: "geografia",
    dif: "mitjana",
    p: "A quin país pertany la muntanya del Kilimanjaro?",
    o: [
    "Kenya",
    "Uganda",
    "Tanzània",
    "Etiòpia"
    ],
    c: 2,
  },
  {
    id: 214,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Paraguai?",
    o: [
    "Ciudad del Este",
    "Asunción",
    "Encarnación",
    "Villarrica"
    ],
    c: 1,
  },
  {
    id: 215,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin continent és el més sec (a excepció de l'Antàrtida)?",
    o: [
    "Àsia",
    "Àfrica",
    "Austràlia",
    "Amèrica del Sud"
    ],
    c: 2,
  },
  {
    id: 216,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin és el riu més llarg d'Amèrica del Sud?",
    o: [
    "Amazonas",
    "Paraná",
    "Orinoco",
    "Magdalena"
    ],
    c: 0,
  },
  {
    id: 217,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Moçambic?",
    o: [
    "Maputo",
    "Beira",
    "Nampula",
    "Inhambane"
    ],
    c: 0,
  },
  {
    id: 218,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina serralada separaFrança d'Itàlia?",
    o: [
    "Alps",
    "Apenins",
    "Pirineus",
    "Carpats"
    ],
    c: 0,
  },
  {
    id: 219,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin país europeu té el climat més mediterrani?",
    o: [
    "Grècia",
    "Itàlia",
    "Espanya",
    "Croàcia"
    ],
    c: 0,
  },
  {
    id: 221,
    cat: "geografia",
    dif: "mitjana",
    p: "A quin país pertany el Mont Blanc?",
    o: [
    "França i Itàlia",
    "França i Suïssa",
    "Itàlia i Suïssa",
    "Només França"
    ],
    c: 0,
  },
  {
    id: 222,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin és el segon riu més llarg d'Europa?",
    o: [
    "Danubi",
    "Volga",
    "Rin",
    "Dnieper"
    ],
    c: 0,
  },
  {
    id: 223,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina ciutat és la capital de Georgia?",
    o: [
    "Batumi",
    "Kutaisi",
    "Tbilissi",
    "Gori"
    ],
    c: 2,
  },
  {
    id: 224,
    cat: "geografia",
    dif: "mitjana",
    p: "A quin país pertany la Patagònia?",
    o: [
    "Chile",
    "Argentina",
    "Ambdós",
    "Uruguai"
    ],
    c: 2,
  },
  {
    id: 225,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin és el desert més gran del món?",
    o: [
    "Sàhara",
    "Antàrtida",
    "Àrabia",
    "Gobi"
    ],
    c: 1,
  },
  {
    id: 226,
    cat: "geografia",
    dif: "alta",
    p: "Quina és la capital de Burkina Faso?",
    o: [
    "Bamako",
    "Ouagadougou",
    "Niamey",
    "Accra"
    ],
    c: 1,
  },
  {
    id: 227,
    cat: "geografia",
    dif: "alta",
    p: "Quins són els dos rius més llargs d'Europa?",
    o: [
    "Rin i Sena",
    "Volga i Danubi",
    "Danubi i Rin",
    "Volga i Sena"
    ],
    c: 1,
  },
  {
    id: 228,
    cat: "geografia",
    dif: "alta",
    p: "Quina muntanya és la més alta d'Àfrica?",
    o: [
    "Mont Kenya",
    "Kilimanjaro",
    "Pic de l'Elbrus",
    "Puncak Jaya"
    ],
    c: 1,
  },
  {
    id: 229,
    cat: "geografia",
    dif: "alta",
    p: "Quin canal artificial connecta el Mar Mediterrani amb el Mar Roig?",
    o: [
    "Canal de Panamà",
    "Canal de Suez",
    "Estret de Gibraltar",
    "Canal de la Mànega"
    ],
    c: 1,
  },
  {
    id: 230,
    cat: "geografia",
    dif: "alta",
    p: "Quina és la capital de Mauritània?",
    o: [
    "Dakar",
    "Nouakchott",
    "Tifariti",
    "Laâyoune"
    ],
    c: 1,
  },
  {
    id: 231,
    cat: "geografia",
    dif: "alta",
    p: "Quants països travessa el riu Danubi?",
    o: [
    "6",
    "8",
    "10",
    "12"
    ],
    c: 2,
  },
  {
    id: 232,
    cat: "geografia",
    dif: "alta",
    p: "Quina és la capital més alta del món en altitud?",
    o: [
    "Cusco",
    "La Paz",
    "Quito",
    "Potosí"
    ],
    c: 1,
  },
  {
    id: 233,
    cat: "geografia",
    dif: "alta",
    p: "Quin país té més límits fronterers amb altres nacions?",
    o: [
    "Rússia",
    "França",
    "Alemanya",
    "Xina"
    ],
    c: 0,
  },
  {
    id: 234,
    cat: "geografia",
    dif: "alta",
    p: "Quina és la serra més llarga de Sud-amèrica?",
    o: [
    "Serranía del Divisor",
    "Andes",
    "Serra da Mantiqueira",
    "Serra Geral"
    ],
    c: 1,
  },
  {
    id: 236,
    cat: "geografia",
    dif: "alta",
    p: "Quin país té territori tant a Europa com a Àsia i és el més gran del món?",
    o: [
    "Turquia",
    "Kazakhstan",
    "Rússia",
    "Azerbaidjan"
    ],
    c: 2,
  },
  {
    id: 237,
    cat: "geografia",
    dif: "alta",
    p: "Quina muntanya és la més alta d'Amèrica del Nord?",
    o: [
    "Mont Rainier",
    "Mont Denali",
    "Mont Whitney",
    "Gran Teton"
    ],
    c: 1,
  },
  {
    id: 239,
    cat: "geografia",
    dif: "alta",
    p: "Quants estats té frontera amb el Brasil?",
    o: [
    "8",
    "9",
    "10",
    "11"
    ],
    c: 1,
  },
  {
    id: 240,
    cat: "geografia",
    dif: "alta",
    p: "Quin és el riu més cabalós del món per volum d'aigua?",
    o: [
    "Nil",
    "Amazones",
    "Yangtze",
    "Mississipí"
    ],
    c: 1,
  },
  {
    id: 242,
    cat: "geografia",
    dif: "alta",
    p: "Quina muntanya és la més alta del continent asiàtic?",
    o: [
    "K2",
    "Kangchenjunga",
    "Everest",
    "Lhotse"
    ],
    c: 2,
  },
  {
    id: 243,
    cat: "geografia",
    dif: "alta",
    p: "Quina és la capital de Nauru?",
    o: [
    "Tarawa",
    "Yaren",
    "Aiwo",
    "Buota"
    ],
    c: 1,
  },
  {
    id: 244,
    cat: "geografia",
    dif: "alta",
    p: "Quin país té la frontera més llarga amb els Estats Units?",
    o: [
    "Mèxic",
    "Canadà",
    "Tots dos iguals",
    "Cap"
    ],
    c: 1,
  },
  {
    id: 245,
    cat: "geografia",
    dif: "alta",
    p: "Quin és el deserto més gran del món?",
    o: [
    "Sàhara",
    "Àrab",
    "Antàrtida",
    "Gobi"
    ],
    c: 2,
  },
  {
    id: 247,
    cat: "geografia",
    dif: "alta",
    p: "Quants estats sobirans hi ha al continent europeu?",
    o: [
    "45",
    "47",
    "50",
    "52"
    ],
    c: 1,
  },
  {
    id: 248,
    cat: "geografia",
    dif: "alta",
    p: "Quin riu és l'afluent més cabdalós de l'Amazones?",
    o: [
    "Japurá",
    "Negro",
    "Tapajos",
    "Xingú"
    ],
    c: 1,
  },
  {
    id: 249,
    cat: "geografia",
    dif: "alta",
    p: "Quina és la capital de Samoa Occidental?",
    o: [
    "Apia",
    "Pago Pago",
    "Fagali'i",
    "Upolu"
    ],
    c: 0,
  },
  {
    id: 250,
    cat: "geografia",
    dif: "alta",
    p: "Quants quilòmetres quadrats mesura aproximadament el continent de l'Antàrtida?",
    o: [
    "10 milions",
    "14 milions",
    "18 milions",
    "22 milions"
    ],
    c: 1,
  },
  {
    id: 251,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants cromosomes té una cèl·lula humana normal?",
    o: [
    "23",
    "46",
    "52",
    "38"
    ],
    c: 1,
  },
  {
    id: 252,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és l'element químic més abundant a la crosta terrestre?",
    o: [
    "Ferro",
    "Oxigen",
    "Silici",
    "Alumini"
    ],
    c: 1,
  },
  {
    id: 253,
    cat: "ciencies",
    dif: "mitjana",
    p: "A quina temperatura es fusiona el gel de manera normal?",
    o: [
    "0 °C",
    "-5 °C",
    "10 °C",
    "-10 °C"
    ],
    c: 0,
  },
  {
    id: 254,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina planta és carnívora i es troba a les zones pantanoses?",
    o: [
    "Orquídia",
    "Drosera",
    "Gira-sol",
    "Flor de lis"
    ],
    c: 1,
  },
  {
    id: 255,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin planeta del sistema solar és el més gran?",
    o: [
    "Saturn",
    "Júpiter",
    "Neptú",
    "Urà"
    ],
    c: 1,
  },
  {
    id: 256,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants ossos té aproximadament un esquelet humà adult?",
    o: [
    "176",
    "206",
    "256",
    "186"
    ],
    c: 1,
  },
  {
    id: 258,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la velocitat de la llum en el buit?",
    o: [
    "200.000 km/s",
    "300.000 km/s",
    "400.000 km/s",
    "250.000 km/s"
    ],
    c: 1,
  },
  {
    id: 259,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants sentits bàsics té normalment un humà?",
    o: [
    "4",
    "5",
    "6",
    "3"
    ],
    c: 1,
  },
  {
    id: 260,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin animal mamífer és el més ràpid del planeta?",
    o: [
    "Lleó",
    "Guepard",
    "Cavall",
    "Antílop"
    ],
    c: 1,
  },
  {
    id: 261,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el procés pel qual les plantes sintetitzen la matèria orgànica?",
    o: [
    "Respiració",
    "Transpiració",
    "Fotosíntesi",
    "Fermentació"
    ],
    c: 2,
  },
  {
    id: 262,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants valors de pH té aproximadament una solució neutra?",
    o: [
    "5",
    "7",
    "9",
    "3"
    ],
    c: 1,
  },
  {
    id: 263,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és l'animal vertebrat més petit del món?",
    o: [
    "Rana Paedophryne",
    "Camaleó nan",
    "Peix pallasso",
    "Musaranya"
    ],
    c: 0,
  },
  {
    id: 264,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quantes capes principals té l'atmosfera terrestre?",
    o: [
    "3",
    "4",
    "5",
    "6"
    ],
    c: 2,
  },
  {
    id: 266,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quant de temps tarda la Lluna en orbitar al voltant de la Terra?",
    o: [
    "27 dies",
    "30 dies",
    "15 dies",
    "45 dies"
    ],
    c: 0,
  },
  {
    id: 267,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és l'òrgan humà que filtra la sang i produeix orina?",
    o: [
    "Hígat",
    "Ronyó",
    "Pàncrees",
    "Bufeta"
    ],
    c: 1,
  },
  {
    id: 268,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina planta és la més alta del món?",
    o: [
    "Eucaliptus",
    "Sequoia",
    "Pi Ponderosa",
    "Cedre"
    ],
    c: 1,
  },
  {
    id: 269,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el procés de transformació de roca en sòl?",
    o: [
    "Meteorització",
    "Sedimentació",
    "Diagènesi",
    "Lixiviació"
    ],
    c: 0,
  },
  {
    id: 270,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quant de temps tarda la Terra en fer una volta completa al Sol?",
    o: [
    "364 dies",
    "365 dies",
    "366 dies",
    "363 dies"
    ],
    c: 1,
  },
  {
    id: 271,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és l'element químic amb el símbol 'Fe'?",
    o: [
    "Flúor",
    "Ferro",
    "Fòsfor",
    "Fluori"
    ],
    c: 1,
  },
  {
    id: 272,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants músculs té aproximadament el cos humà?",
    o: [
    "206",
    "400",
    "640",
    "800"
    ],
    c: 2,
  },
  {
    id: 273,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin animal és el mamífer més pesat del planeta?",
    o: [
    "Elefant africà",
    "Balena blava",
    "Hipopòtam",
    "Rinoceront"
    ],
    c: 1,
  },
  {
    id: 274,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el procés per al qual les bacteris es reprodueixen sense sexe?",
    o: [
    "Reproducció sexual",
    "Fissió binària",
    "Esporulació",
    "Conjugació"
    ],
    c: 1,
  },
  {
    id: 275,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la densitat de l'aigua en el seu estat més densa?",
    o: [
    "0 °C",
    "4 °C",
    "10 °C",
    "20 °C"
    ],
    c: 1,
  },
  {
    id: 276,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quins són els tres elements més abundants en l'univers?",
    o: [
    "Oxigen, Carboni i Nitrogen",
    "Hidrogen, Heli i Liti",
    "Ferro, Níquel i Cobalt",
    "Silici, Magnes i Oxigen"
    ],
    c: 1,
  },
  {
    id: 279,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és l'element químic amb símbol Au?",
    o: [
    "Plata",
    "Alumini",
    "Or",
    "Argent"
    ],
    c: 2,
  },
  {
    id: 280,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la part del cervell responsable de l'equilibri?",
    o: [
    "Còrtex cerebral",
    "Cerebel·le",
    "Tàlem",
    "Hipotàlem"
    ],
    c: 1,
  },
  {
    id: 282,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quins són els cinc grups de vertebrats?",
    o: [
    "Peixos, Amfibis, Rèptils, Ocells i Mamífers",
    "Peixos, Rèptils, Ocells, Mamífers i Insectes",
    "Amfibis, Ocells, Mamífers, Rèptils i Artròpodes",
    "Peixos, Amfibis, Ocells, Mamífers i Artròpodes"
    ],
    c: 0,
  },
  {
    id: 283,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el gas més abundant en l'atmosfera terrestre?",
    o: [
    "Oxigen",
    "Nitrogen",
    "Diòxid de carboni",
    "Argó"
    ],
    c: 1,
  },
  {
    id: 284,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la temperatura normal del cos humà en graus Celsius?",
    o: [
    "36.5°C",
    "37.5°C",
    "38°C",
    "35.5°C"
    ],
    c: 0,
  },
  {
    id: 285,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina planta és la més gran del món?",
    o: [
    "Seca del Tule",
    "Sequoia gegant",
    "Eucaliptus",
    "Pi de Matusalem"
    ],
    c: 1,
  },
  {
    id: 286,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la unitat estructural i funcional bàsica dels éssers vius?",
    o: [
    "L'àtom",
    "La molècula",
    "La cèl·lula",
    "El nucli"
    ],
    c: 2,
  },
  {
    id: 287,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants watts consumeix una bombeta LED estàndard?",
    o: [
    "10-15 watts",
    "5-10 watts",
    "20-25 watts",
    "30-40 watts"
    ],
    c: 1,
  },
  {
    id: 288,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el planeta més allunyat del Sol?",
    o: [
    "Urà",
    "Neptú",
    "Plutó",
    "Saturn"
    ],
    c: 1,
  },
  {
    id: 289,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quins són els quatre tipus de sang principals?",
    o: [
    "O, A, B, AB",
    "A, B, C, D",
    "O, A, B, C",
    "I, II, III, IV"
    ],
    c: 0,
  },
  {
    id: 290,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la unitat de mesura de la força en el sistema SI?",
    o: [
    "Dina",
    "Newton",
    "Joule",
    "Pascal"
    ],
    c: 1,
  },
  {
    id: 291,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quantes potes té una aranya?",
    o: [
    "6",
    "8",
    "10",
    "12"
    ],
    c: 1,
  },
  {
    id: 292,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el mineral més dur del món?",
    o: [
    "Sàfir",
    "Diamant",
    "Topazi",
    "Corindon"
    ],
    c: 1,
  },
  {
    id: 293,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la freqüència de vibració del so que percep l'oïda humana?",
    o: [
    "20 Hz a 20.000 Hz",
    "100 Hz a 10.000 Hz",
    "1 Hz a 1.000 Hz",
    "50 Hz a 50.000 Hz"
    ],
    c: 0,
  },
  {
    id: 294,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la principal funció del pàncrees?",
    o: [
    "Digerir les grasses",
    "Produir insulina i digerir aliments",
    "Filtrar la sang",
    "Produir suc gàstric"
    ],
    c: 1,
  },
  {
    id: 296,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la velocitat del so en l'aire a 20°C?",
    o: [
    "300 m/s",
    "340 m/s",
    "400 m/s",
    "250 m/s"
    ],
    c: 1,
  },
  {
    id: 297,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin animal és l'única mamífera que posa ous?",
    o: [
    "Equidna",
    "Ornitorinc",
    "Equidna i Ornitorinc",
    "Cap de les anteriors"
    ],
    c: 2,
  },
  {
    id: 298,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la vida mitjana del carboni-14 en anys?",
    o: [
    "5.730 anys",
    "3.730 anys",
    "7.730 anys",
    "1.730 anys"
    ],
    c: 0,
  },
  {
    id: 299,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la unitat de mesura de la potència?",
    o: [
    "Volt",
    "Amper",
    "Watt",
    "Ohm"
    ],
    c: 2,
  },
  {
    id: 300,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el dipòsit de nutrients més important de la llavor?",
    o: [
    "Embrió",
    "Cotilèdon",
    "Testa",
    "Radi"
    ],
    c: 1,
  },
  {
    id: 301,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la proteïna més abundant en el cos humà?",
    o: [
    "Hemoglobina",
    "Col·làgen",
    "Queratina",
    "Albumina"
    ],
    c: 1,
  },
  {
    id: 306,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la unitat de mesura de la pressió atmosfèrica?",
    o: [
    "Newton",
    "Pascal",
    "Joule",
    "Watt"
    ],
    c: 1,
  },
  {
    id: 310,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és l'òrgan que bombeja la sang en els mamífers?",
    o: [
    "Pulmó",
    "Cor",
    "Fetge",
    "Ronyó"
    ],
    c: 1,
  },
  {
    id: 311,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la unitat bàsica de la vida?",
    o: [
    "L'àtom",
    "La molècula",
    "La cèl·lula",
    "El nucli"
    ],
    c: 2,
  },
  {
    id: 312,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el gas que respiren les plantes durant la nit?",
    o: [
    "Oxigen",
    "Nitrogen",
    "Diòxid de carboni",
    "Heli"
    ],
    c: 2,
  },
  {
    id: 315,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la velocitat d'escapament de la gravitat terrestre?",
    o: [
    "11.2 km/s",
    "5.6 km/s",
    "22.4 km/s",
    "7.8 km/s"
    ],
    c: 0,
  },
  {
    id: 316,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la partícula subatòmica amb càrrega positiva?",
    o: [
    "Electró",
    "Neutró",
    "Protó",
    "Fotó"
    ],
    c: 2,
  },
  {
    id: 317,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el planeta més proper al Sol?",
    o: [
    "Venus",
    "Mercuri",
    "Terra",
    "Mart"
    ],
    c: 1,
  },
  {
    id: 318,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants parells d'ales té un insecte típic?",
    o: [
    "1",
    "2",
    "3",
    "4"
    ],
    c: 1,
  },
  {
    id: 320,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la funció principal de la mielina en el sistema nerviós?",
    o: [
    "Produir neurotransmissors",
    "Aïllar els axons",
    "Sintetitzar energia",
    "Filtra la sang"
    ],
    c: 1,
  },
  {
    id: 322,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el tipus de sàvia que transporta els nutrients en les plantes?",
    o: [
    "Sàvia bruta",
    "Sàvia elaborada",
    "Sàvia radicular",
    "Sàvia foliar"
    ],
    c: 1,
  },
  {
    id: 323,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la fórmula química de l'aigua?",
    o: [
    "H₂O₂",
    "H₂O",
    "H₃O",
    "HO₂"
    ],
    c: 1,
  },
  {
    id: 324,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el gas noble més abundant a l'atmosfera?",
    o: [
    "Neó",
    "Argó",
    "Heli",
    "Xenó"
    ],
    c: 1,
  },
  {
    id: 325,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la malaltia provocada per la manca de vitamina C?",
    o: [
    "Beriberi",
    "Escorbut",
    "Raquitisme",
    "Pelagra"
    ],
    c: 1,
  },
  {
    id: 327,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és l'element químic més abundant a l'univers?",
    o: [
    "Oxigen",
    "Heli",
    "Hidrogen",
    "Carboni"
    ],
    c: 2,
  },
  {
    id: 328,
    cat: "ciencies",
    dif: "mitjana",
    p: "En quin organela es produeix la fotosíntesi a les plantes?",
    o: [
    "Mitocòndria",
    "Cloroplast",
    "Nucli",
    "Ribosoma"
    ],
    c: 1,
  },
  {
    id: 330,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quantes parells de costelles té l'ésser humà?",
    o: [
    "10",
    "11",
    "12",
    "13"
    ],
    c: 2,
  },
  {
    id: 332,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina proteïna és responsable de transportar l'oxigen a la sang?",
    o: [
    "Mioglobina",
    "Hemoglobina",
    "Insulina",
    "Albumina"
    ],
    c: 1,
  },
  {
    id: 333,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quantes divisions cel·lulars ocorren en la meiosi?",
    o: [
    "Una",
    "Dues",
    "Tres",
    "Quatre"
    ],
    c: 1,
  },
  {
    id: 334,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és l'únic mamífer que vola?",
    o: [
    "Ardilla voladora",
    "Granota voladora",
    "Ratpenó",
    "Lemur volador"
    ],
    c: 2,
  },
  {
    id: 335,
    cat: "ciencies",
    dif: "mitjana",
    p: "En quin any va descobrir Fleming la penicil·lina?",
    o: [
    "1920",
    "1928",
    "1935",
    "1945"
    ],
    c: 1,
  },
  {
    id: 337,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quins són els gasos més abundants a l'atmosfera terrestre?",
    o: [
    "Nitrogen i oxigen",
    "Oxigen i dioxid de carboni",
    "Hidrogen i heli",
    "Argó i nitrogen"
    ],
    c: 0,
  },
  {
    id: 338,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el component més petit de la matèria que conserva les propietats químiques d'una substància?",
    o: [
    "Quark",
    "Electró",
    "Àtom",
    "Molècula"
    ],
    c: 3,
  },
  {
    id: 339,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants òrgans principals té el sistema digestiu humà?",
    o: [
    "4",
    "5",
    "6",
    "7"
    ],
    c: 2,
  },
  {
    id: 340,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el gas que produeixen les plantes durant la fotosíntesi?",
    o: [
    "Dioxid de carboni",
    "Nitrogen",
    "Oxigen",
    "Ozó"
    ],
    c: 2,
  },
  {
    id: 341,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la temperatura a la qual l'aigua bull al nivell del mar?",
    o: [
    "90°C",
    "100°C",
    "110°C",
    "120°C"
    ],
    c: 1,
  },
  {
    id: 342,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quins animals són els únics mamífers que ponen ous?",
    o: [
    "Ornitorrinc i equidna",
    "Delfí i balena",
    "Cangur i coala",
    "Mus i rata"
    ],
    c: 0,
  },
  {
    id: 343,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la part de la cèl·lula que controla les seves funcions?",
    o: [
    "Citoplasma",
    "Nucli",
    "Membrana",
    "Mitocòndria"
    ],
    c: 1,
  },
  {
    id: 344,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quantes lunes té el planeta Mart?",
    o: [
    "0",
    "1",
    "2",
    "3"
    ],
    c: 2,
  },
  {
    id: 346,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quantes cambres té el cor humà?",
    o: [
    "2",
    "3",
    "4",
    "5"
    ],
    c: 2,
  },
  {
    id: 347,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el gas nòbil més pesat?",
    o: [
    "Ró",
    "Xenó",
    "Radó",
    "Argó"
    ],
    c: 2,
  },
  {
    id: 348,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la vida mitjana del glòbul roig humà?",
    o: [
    "30 dies",
    "60 dies",
    "120 dies",
    "180 dies"
    ],
    c: 2,
  },
  {
    id: 349,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quins animals són els depredadors més ràpids a la natura?",
    o: [
    "Gos de caça",
    "Gos africà salvatge",
    "Guepard",
    "Lleó"
    ],
    c: 2,
  },
  {
    id: 350,
    cat: "ciencies",
    dif: "alta",
    p: "Quin és el nom de la proteïna responsable del transport de l'oxigen en els glòbuls vermells?",
    o: [
    "Mioglobina",
    "Hemoglobina",
    "Citocroms",
    "Transferrina"
    ],
    c: 1,
  },
  {
    id: 351,
    cat: "ciencies",
    dif: "alta",
    p: "En química, quina és la configuració electrònica de l'atom de ferro (Fe) en l'estat fonamental?",
    o: [
    "[Ar] 3d⁶ 4s²",
    "[Ar] 3d⁷ 4s¹",
    "[Ar] 3d⁵ 4s²",
    "[Ar] 3d⁸"
    ],
    c: 0,
  },
  {
    id: 352,
    cat: "ciencies",
    dif: "alta",
    p: "Quin és el nom de la superfície imaginària d'un forat negre a partir de la qual res pot escapar?",
    o: [
    "Singularitat",
    "Horitzó de successos",
    "Corona",
    "Ergosfera"
    ],
    c: 1,
  },
  {
    id: 353,
    cat: "ciencies",
    dif: "alta",
    p: "Quina és la funció principal del retícula endoplasmàtica rugosa en la cèl·lula?",
    o: [
    "Síntesi de lípids",
    "Síntesi de proteïnes per a exportació",
    "Producció d'energia",
    "Degradació de proteïnes"
    ],
    c: 1,
  },
  {
    id: 354,
    cat: "ciencies",
    dif: "alta",
    p: "Quin element químic és l'ànod en una bateria de zinc-carbó?",
    o: [
    "Zinc",
    "Carbó",
    "Mercuri",
    "Manganès"
    ],
    c: 0,
  },
  {
    id: 355,
    cat: "ciencies",
    dif: "alta",
    p: "Quina és la distància aproximada en parsecs d'una unitat astronòmica (UA)?",
    o: [
    "0,00004 pc",
    "0,000004 pc",
    "0,0004 pc",
    "0,04 pc"
    ],
    c: 1,
  },
  {
    id: 356,
    cat: "ciencies",
    dif: "alta",
    p: "En biologia molecular, quin és el codi de parada (stop codon) més comú en la traducció proteica?",
    o: [
    "UAA",
    "UAG",
    "UGA",
    "AUG"
    ],
    c: 0,
  },
  {
    id: 357,
    cat: "ciencies",
    dif: "alta",
    p: "Quin és el pH aproximat del suc gàstric humà?",
    o: [
    "2 a 3",
    "5 a 6",
    "7 a 8",
    "9 a 10"
    ],
    c: 0,
  },
  {
    id: 358,
    cat: "ciencies",
    dif: "alta",
    p: "Quina és la característica distintiva dels animals amb sangre freda (ectotèrmics)?",
    o: [
    "Mantenen temperatura corporal constant",
    "La seva temperatura corporal depèn de l'ambient",
    "Sempre viuen en àrees tropicals",
    "Nunca transpiren"
    ],
    c: 1,
  },
  {
    id: 359,
    cat: "ciencies",
    dif: "alta",
    p: "Quin és el nom del procés pel qual les plantes sintetitzen matèria orgànica a partir de dióxid de carboni i llum solar?",
    o: [
    "Respiració celular",
    "Fotosíntesi",
    "Fermentació",
    "Quimiosíntesi"
    ],
    c: 1,
  },
  {
    id: 360,
    cat: "ciencies",
    dif: "alta",
    p: "Quina és la llei que relaciona la pressió i el volum d'un gas a temperatura constant?",
    o: [
    "Llei de Charles",
    "Llei de Boyle",
    "Llei de Gay-Lussac",
    "Llei dels gasos ideals"
    ],
    c: 1,
  },
  {
    id: 361,
    cat: "ciencies",
    dif: "alta",
    p: "Quin és el nombre de vèrtebres cervicals en la columna vertebral humana?",
    o: [
    "5",
    "7",
    "8",
    "10"
    ],
    c: 1,
  },
  {
    id: 362,
    cat: "ciencies",
    dif: "alta",
    p: "En tecnologia, quin és el nombre de bits en un byte?",
    o: [
    "4",
    "8",
    "16",
    "32"
    ],
    c: 1,
  },
  {
    id: 363,
    cat: "ciencies",
    dif: "alta",
    p: "Quin és l'enzim responsable de la replicació del DNA?",
    o: [
    "ARN polimerasa",
    "ADN polimerasa",
    "Helicasa",
    "Ligasa"
    ],
    c: 1,
  },
  {
    id: 364,
    cat: "ciencies",
    dif: "alta",
    p: "Quina és la constant de Planck aproximada en joules per segon?",
    o: [
    "6,626 × 10⁻³⁴",
    "3,14 × 10⁻²⁴",
    "9,81 × 10⁻¹⁶",
    "1,602 × 10⁻¹⁹"
    ],
    c: 0,
  },
  {
    id: 365,
    cat: "ciencies",
    dif: "alta",
    p: "Quin és el nombre de cromosomes en una cèl·lula humana diploide?",
    o: [
    "23",
    "46",
    "48",
    "92"
    ],
    c: 1,
  },
  {
    id: 366,
    cat: "ciencies",
    dif: "alta",
    p: "En astronomia, quin és el tipus de estrella més abundant a l'univers?",
    o: [
    "Gegants vermells",
    "Nanes blanques",
    "Nanes vermelles",
    "Supergegants blaus"
    ],
    c: 2,
  },
  {
    id: 367,
    cat: "ciencies",
    dif: "alta",
    p: "Quina és la unitat de resistència elèctrica en el sistema internacional?",
    o: [
    "Amperio",
    "Voltio",
    "Ohmio",
    "Faradio"
    ],
    c: 2,
  },
  {
    id: 368,
    cat: "ciencies",
    dif: "alta",
    p: "Quin és el principal pigment fotosintètic en les plantes terrestres?",
    o: [
    "Carotenoides",
    "Clorofil·la a",
    "Ficobilina",
    "Antocianina"
    ],
    c: 1,
  },
  {
    id: 370,
    cat: "ciencies",
    dif: "alta",
    p: "Quin és el nombre aproximat de neurones en el cervell humà?",
    o: [
    "1 bilió",
    "86 mil milions",
    "1 milió",
    "500 milions"
    ],
    c: 1,
  },
  {
    id: 371,
    cat: "ciencies",
    dif: "alta",
    p: "En química orgànica, quin és el grau de saturació en un alquè amb un doble enllaç?",
    o: [
    "1",
    "2",
    "3",
    "4"
    ],
    c: 0,
  },
  {
    id: 372,
    cat: "ciencies",
    dif: "alta",
    p: "Quina és la velocitat de la llum en el buit aproximada?",
    o: [
    "3 × 10⁸ m/s",
    "3 × 10⁹ m/s",
    "3 × 10⁷ m/s",
    "3 × 10¹⁰ m/s"
    ],
    c: 0,
  },
  {
    id: 374,
    cat: "ciencies",
    dif: "alta",
    p: "En biologia marina, quin és el percentatge aproximat de sal dissolta en l'aigua de mar?",
    o: [
    "1,5%",
    "3,5%",
    "5,5%",
    "7,5%"
    ],
    c: 1,
  },
  {
    id: 375,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va caure el Mur de Berlín?",
    o: [
    "1987",
    "1989",
    "1991",
    "1985"
    ],
    c: 1,
  },
  {
    id: 376,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser el primer President dels Estats Units?",
    o: [
    "Thomas Jefferson",
    "George Washington",
    "John Adams",
    "Benjamin Franklin"
    ],
    c: 1,
  },
  {
    id: 377,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va arribar Cristòfol Colom a Amèrica?",
    o: [
    "1490",
    "1492",
    "1495",
    "1500"
    ],
    c: 1,
  },
  {
    id: 378,
    cat: "historia",
    dif: "mitjana",
    p: "Quin emperador romà va construir el Colosseu?",
    o: [
    "Nerò",
    "Vespasià",
    "Trajà",
    "Adrià"
    ],
    c: 1,
  },
  {
    id: 379,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va començar la Segona Guerra Mundial?",
    o: [
    "1937",
    "1939",
    "1941",
    "1938"
    ],
    c: 1,
  },
  {
    id: 380,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va escriure la Declaració d'Independència dels EUA?",
    o: [
    "George Washington",
    "Benjamin Franklin",
    "Thomas Jefferson",
    "John Hancock"
    ],
    c: 2,
  },
  {
    id: 381,
    cat: "historia",
    dif: "mitjana",
    p: "Quin es el monument més antiga de les set meravelles del món?",
    o: [
    "El Colosseu",
    "La Gran Piràmide de Giza",
    "El Faro d'Alexandria",
    "El Mausoleu d'Halicarnàs"
    ],
    c: 1,
  },
  {
    id: 382,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va morir Napoleó Bonaparte?",
    o: [
    "1815",
    "1821",
    "1825",
    "1830"
    ],
    c: 1,
  },
  {
    id: 383,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser el primer home a trepitjar la Lluna?",
    o: [
    "Buzz Aldrin",
    "Neil Armstrong",
    "Yuri Gagarin",
    "Alan Bean"
    ],
    c: 1,
  },
  {
    id: 384,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va esclatar la Revolució Francesa?",
    o: [
    "1785",
    "1789",
    "1793",
    "1799"
    ],
    c: 1,
  },
  {
    id: 385,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va descobrir l'Amèrica del Sud en nom de Portugal?",
    o: [
    "Vasco da Gama",
    "Pedro Álvares Cabral",
    "Bartolomeu Dias",
    "Ferdinand Magalhães"
    ],
    c: 1,
  },
  {
    id: 386,
    cat: "historia",
    dif: "mitjana",
    p: "Quin era el nom real de Genguis Khan?",
    o: [
    "Temüjin",
    "Ögedei",
    "Möngke",
    "Kublai"
    ],
    c: 0,
  },
  {
    id: 387,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any es va firmar la Magna Carta a Anglaterra?",
    o: [
    "1199",
    "1215",
    "1265",
    "1297"
    ],
    c: 1,
  },
  {
    id: 388,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser la reina més llarga del Regne Unit?",
    o: [
    "Victòria",
    "Elisabet II",
    "Elisabet I",
    "Anna"
    ],
    c: 1,
  },
  {
    id: 390,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser el fundador de l'Imperi Otomà?",
    o: [
    "Selim el Conquistador",
    "Osman I",
    "Mehmed II",
    "Suleimà el Magnífic"
    ],
    c: 1,
  },
  {
    id: 391,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va firmar-se el Tractat de Versalles?",
    o: [
    "1918",
    "1919",
    "1920",
    "1921"
    ],
    c: 1,
  },
  {
    id: 392,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser el primer emperador de Xina?",
    o: [
    "Kangxi",
    "Qin Shi Huang",
    "Yongzheng",
    "Hongwu"
    ],
    c: 1,
  },
  {
    id: 393,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va assassinar-se l'arxiduc Francesc Ferran d'Àustria?",
    o: [
    "1912",
    "1914",
    "1916",
    "1918"
    ],
    c: 1,
  },
  {
    id: 394,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser el líder de la Independència de l'Índia?",
    o: [
    "Jawaharlal Nehru",
    "Mahatma Gandhi",
    "Vallabhbhai Patel",
    "Subhas Chandra Bose"
    ],
    c: 1,
  },
  {
    id: 395,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any es va fer la Revolució Russa?",
    o: [
    "1905",
    "1917",
    "1922",
    "1925"
    ],
    c: 1,
  },
  {
    id: 396,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser el faraó d'Egipte que construí la Gran Piràmide?",
    o: [
    "Tutankamon",
    "Kheops",
    "Menkaure",
    "Khafre"
    ],
    c: 1,
  },
  {
    id: 397,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any es va firmar la Declaració Universal dels Drets Humans?",
    o: [
    "1945",
    "1948",
    "1950",
    "1952"
    ],
    c: 1,
  },
  {
    id: 398,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser el primer Secretari General de les Nacions Unides?",
    o: [
    "Dag Hammarskjöld",
    "Trygve Lie",
    "U Thant",
    "Kurt Waldheim"
    ],
    c: 1,
  },
  {
    id: 399,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va esclatar la Crisi dels Míssils de Cuba?",
    o: [
    "1960",
    "1962",
    "1964",
    "1966"
    ],
    c: 1,
  },
  {
    id: 401,
    cat: "historia",
    dif: "mitjana",
    p: "Quin emperador romà va dividir l'Imperi Romà en dos parts?",
    o: [
    "Constantí",
    "Dioclecià",
    "Trajà",
    "August"
    ],
    c: 1,
  },
  {
    id: 402,
    cat: "historia",
    dif: "mitjana",
    p: "En quin país va néixer Mahatma Gandhi?",
    o: [
    "Pakistan",
    "Índia",
    "Sri Lanka",
    "Bangladesh"
    ],
    c: 1,
  },
  {
    id: 407,
    cat: "historia",
    dif: "mitjana",
    p: "Quin científic va desenvolupar la teoria de la relativitat?",
    o: [
    "Isaac Newton",
    "Albert Einstein",
    "Niels Bohr",
    "Max Planck"
    ],
    c: 1,
  },
  {
    id: 410,
    cat: "historia",
    dif: "mitjana",
    p: "En quin país va néixer Leonardo da Vinci?",
    o: [
    "Alemanya",
    "Itàlia",
    "França",
    "Espanya"
    ],
    c: 1,
  },
  {
    id: 412,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va finalitzar la Guerra Civil Espanyola?",
    o: [
    "1937",
    "1939",
    "1941",
    "1943"
    ],
    c: 1,
  },
  {
    id: 413,
    cat: "historia",
    dif: "mitjana",
    p: "Quin filòsof grec va morir bevent cicuta?",
    o: [
    "Plató",
    "Sòcrates",
    "Aristòtil",
    "Epicur"
    ],
    c: 1,
  },
  {
    id: 414,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va caure l'Imperi Romà d'Occident?",
    o: [
    "410",
    "476",
    "500",
    "550"
    ],
    c: 1,
  },
  {
    id: 416,
    cat: "historia",
    dif: "mitjana",
    p: "En quin país va néixer Joan d'Arc?",
    o: [
    "Anglaterra",
    "França",
    "Bòrgonya",
    "Flandes"
    ],
    c: 1,
  },
  {
    id: 417,
    cat: "historia",
    dif: "mitjana",
    p: "Quin descobridor va arribar primer a Amèrica segons la història tradicional?",
    o: [
    "Leif Erikson",
    "Cristòfol Colom",
    "Vasco da Gama",
    "Bartolomeu Dias"
    ],
    c: 1,
  },
  {
    id: 418,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va acabar la Primera Guerra Mundial?",
    o: [
    "1916",
    "1918",
    "1920",
    "1922"
    ],
    c: 1,
  },
  {
    id: 419,
    cat: "historia",
    dif: "mitjana",
    p: "Quin va ser el primer Papa de la història?",
    o: [
    "Gregori I",
    "Pere",
    "Pau I",
    "Climent"
    ],
    c: 1,
  },
  {
    id: 421,
    cat: "historia",
    dif: "mitjana",
    p: "Quin monarca britànic va abdicar per amor?",
    o: [
    "George V",
    "Eduard VIII",
    "George VI",
    "Jaume II"
    ],
    c: 1,
  },
  {
    id: 422,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va néixer la Unió Europea (com a CECA)?",
    o: [
    "1948",
    "1951",
    "1957",
    "1967"
    ],
    c: 1,
  },
  {
    id: 423,
    cat: "historia",
    dif: "mitjana",
    p: "Quin va ser el fundador de la Dinastia Ming?",
    o: [
    "Kangxi",
    "Yongzheng",
    "Zhu Yuanzhang",
    "Jiajing"
    ],
    c: 2,
  },
  {
    id: 424,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va morir la Reina Victòria?",
    o: [
    "1897",
    "1901",
    "1905",
    "1910"
    ],
    c: 1,
  },
  {
    id: 425,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va acabar la Segona Guerra Mundial a Europa?",
    o: [
    "1944",
    "1945",
    "1946",
    "1943"
    ],
    c: 1,
  },
  {
    id: 427,
    cat: "historia",
    dif: "mitjana",
    p: "En quin segle va viure Cristòfol Colom?",
    o: [
    "Segle XIV",
    "Segle XV",
    "Segle XVI",
    "Segle XVII"
    ],
    c: 1,
  },
  {
    id: 430,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser Napoleó Bonaparte?",
    o: [
    "Un general alemany",
    "Un emperador francès",
    "Un rei italià",
    "Un general espanyol"
    ],
    c: 1,
  },
  {
    id: 431,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va néixer Martin Luther King?",
    o: [
    "1925",
    "1929",
    "1932",
    "1935"
    ],
    c: 1,
  },
  {
    id: 432,
    cat: "historia",
    dif: "mitjana",
    p: "Quina va ser la causa principal de la Revolució Francesa?",
    o: [
    "Una invasió estrangera",
    "La crisi econòmica i social",
    "Una guerra civil interna",
    "Una plaga"
    ],
    c: 1,
  },
  {
    id: 433,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va descobrir la penicil·lina?",
    o: [
    "Louis Pasteur",
    "Alexander Fleming",
    "Marie Curie",
    "Joseph Lister"
    ],
    c: 1,
  },
  {
    id: 434,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va morir Cleopatra VII?",
    o: [
    "50 a.C.",
    "30 a.C.",
    "10 a.C.",
    "20 d.C."
    ],
    c: 1,
  },
  {
    id: 435,
    cat: "historia",
    dif: "mitjana",
    p: "Quin event marca l'inici de la Primera Guerra Mundial?",
    o: [
    "La invasió de Bèlgica",
    "L'assassinat de l'arxiduc Ferran",
    "La batalla de Verdun",
    "El Tractat de Versalles"
    ],
    c: 1,
  },
  {
    id: 436,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser Juana de Arco?",
    o: [
    "Una reina francesa medieval",
    "Una santa militar francesa",
    "Una poeta castellana",
    "Una princesa anglesa"
    ],
    c: 1,
  },
  {
    id: 437,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va morir Atahualpa, l'últim emperador inca?",
    o: [
    "1530",
    "1533",
    "1536",
    "1540"
    ],
    c: 1,
  },
  {
    id: 438,
    cat: "historia",
    dif: "mitjana",
    p: "Quina va ser la capital de l'Imperi Romà després de Roma?",
    o: [
    "Milà",
    "Constantinoble",
    "Ravenna",
    "Treveri"
    ],
    c: 1,
  },
  {
    id: 440,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va morir el Che Guevara?",
    o: [
    "1965",
    "1966",
    "1967",
    "1968"
    ],
    c: 2,
  },
  {
    id: 441,
    cat: "historia",
    dif: "mitjana",
    p: "Quina va ser la durada aproximada de l'Edat Mitjana a Europa?",
    o: [
    "5 segles",
    "8 segles",
    "10 segles",
    "12 segles"
    ],
    c: 2,
  },
  {
    id: 444,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser Simó Bolívar?",
    o: [
    "Un president argentí",
    "Un libertador sudamericà",
    "Un general mexicà",
    "Un revolucionari cubà"
    ],
    c: 1,
  },
  {
    id: 445,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va morir el Rei Felip II d'Espanya?",
    o: [
    "1595",
    "1598",
    "1600",
    "1603"
    ],
    c: 1,
  },
  {
    id: 446,
    cat: "historia",
    dif: "mitjana",
    p: "Quina va ser la principal causa del col·lapse de l'Imperi Romà d'Occident?",
    o: [
    "Una epidèmia",
    "La combinació de crisis internes i invasions externes",
    "Una sola batalla perduda",
    "Una rebel·lió religiosa"
    ],
    c: 1,
  },
  {
    id: 447,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser la Reina Elisabet I d'Anglaterra?",
    o: [
    "Una reina francesa",
    "Una monarca anglesa del Renaixement",
    "Una emperatriu austríaca",
    "Una princesa portuguesa"
    ],
    c: 1,
  },
  {
    id: 448,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va arribar la Primera Flota britànica a Austràlia?",
    o: [
    "1786",
    "1788",
    "1790",
    "1792"
    ],
    c: 1,
  },
  {
    id: 449,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va escriure 'El Príncep', obra clàssica sobre política?",
    o: [
    "Nicolau Maquiavel",
    "Tomàs d'Aquino",
    "Jean-Jacques Rousseau",
    "Montesquieu"
    ],
    c: 0,
  },
  {
    id: 454,
    cat: "historia",
    dif: "mitjana",
    p: "En quin país va ocórrer la Guerra Civil més recent del segle XX, que va durar fins a 2005?",
    o: [
    "Somàlia",
    "Sudan",
    "Ruanda",
    "Uganda"
    ],
    c: 1,
  },
  {
    id: 455,
    cat: "historia",
    dif: "mitjana",
    p: "Quin any va explotar la bomba atòmica sobre Hiroshima?",
    o: [
    "1943",
    "1944",
    "1945",
    "1946"
    ],
    c: 2,
  },
  {
    id: 456,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va descobrir Amèrica per als europeus el 1492?",
    o: [
    "Vasco da Gama",
    "Cristòfor Colom",
    "Ferdinand Magellà",
    "Bartolomeu Díaz"
    ],
    c: 1,
  },
  {
    id: 458,
    cat: "historia",
    dif: "mitjana",
    p: "Quin líder polític va pronunciar el discurs 'Jo tinc un somni'?",
    o: [
    "Malcolm X",
    "Martin Luther King Jr.",
    "Rosa Parks",
    "Jesse Jackson"
    ],
    c: 1,
  },
  {
    id: 462,
    cat: "historia",
    dif: "mitjana",
    p: "Quin emperador napoleònic va ser derrotat a Waterloo?",
    o: [
    "Lluís XVI",
    "Napoleó Bonaparte",
    "Napoleó III",
    "Lluís XVIII"
    ],
    c: 1,
  },
  {
    id: 464,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser la reina egípcia que va governar al costat de Juli Cèsar i Marc Antoni?",
    o: [
    "Nefertiti",
    "Cleopatra",
    "Hatxepsut",
    "Nefertari"
    ],
    c: 1,
  },
  {
    id: 465,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va tenir lloc l'atac a Pearl Harbor?",
    o: [
    "1940",
    "1941",
    "1942",
    "1943"
    ],
    c: 1,
  },
  {
    id: 466,
    cat: "historia",
    dif: "mitjana",
    p: "Quin filòsof gràcia antic va ser mestre d'Aristòtil?",
    o: [
    "Sòcrates",
    "Plató",
    "Tales",
    "Heràclit"
    ],
    c: 1,
  },
  {
    id: 467,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va caure la ciutat de Constantinoble davant dels otomans?",
    o: [
    "1422",
    "1453",
    "1480",
    "1492"
    ],
    c: 1,
  },
  {
    id: 469,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va explotar la bomba atòmica sobre Nagasaki?",
    o: [
    "6 d'agost de 1945",
    "9 d'agost de 1945",
    "15 d'agost de 1945",
    "2 de setembre de 1945"
    ],
    c: 1,
  },
  {
    id: 470,
    cat: "historia",
    dif: "mitjana",
    p: "Quin polític africà va ser la figura més important de la lluita contra l'apartheid a Sud-àfrica?",
    o: [
    "Desmond Tutu",
    "Nelson Mandela",
    "Oliver Tambo",
    "Walter Sisulu"
    ],
    c: 1,
  },
  {
    id: 471,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any es va proclamar la Declaració d'Independència dels Estats Units?",
    o: [
    "1774",
    "1776",
    "1778",
    "1783"
    ],
    c: 1,
  },
  {
    id: 472,
    cat: "historia",
    dif: "mitjana",
    p: "Quin navegant va iniciar la primera expedició que va donar la volta al món, tot i que no la va completar?",
    o: [
    "Cristòfor Colom",
    "Vasco da Gama",
    "Ferdinand Magellà",
    "Bartolomeu Díaz"
    ],
    c: 2,
  },
  {
    id: 473,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va morir Tutankamó, el faraó egípcia?",
    o: [
    "1325 a.C.",
    "1340 a.C.",
    "1360 a.C.",
    "1380 a.C."
    ],
    c: 0,
  },
  {
    id: 475,
    cat: "historia",
    dif: "alta",
    p: "En quin any es va signar el Tractat de Westfàlia que va marcar la fi de la Guerra dels Trenta Anys?",
    o: [
    "1643",
    "1648",
    "1652",
    "1640"
    ],
    c: 1,
  },
  {
    id: 476,
    cat: "historia",
    dif: "alta",
    p: "Quin emperador romà va decidir traslladar la capital de l'Imperi a Constantinoble?",
    o: [
    "Dioclecià",
    "Constantí I",
    "Teodosi",
    "Julià"
    ],
    c: 1,
  },
  {
    id: 478,
    cat: "historia",
    dif: "alta",
    p: "Quin va ser el primer emperador del Primer Imperi Francès?",
    o: [
    "Lluís XIV",
    "Carlemany",
    "Napoleó Bonaparte",
    "Francesc I"
    ],
    c: 2,
  },
  {
    id: 480,
    cat: "historia",
    dif: "alta",
    p: "Quin president dels EUA va ordenar el llançament de les bombes atòmiques sobre Hiroshima i Nagasaki?",
    o: [
    "Franklin D. Roosevelt",
    "Harry Truman",
    "Dwight Eisenhower",
    "John F. Kennedy"
    ],
    c: 1,
  },
  {
    id: 481,
    cat: "historia",
    dif: "alta",
    p: "En quin any va morir Jesús de Natzaret segons la tradició cristiana?",
    o: [
    "29 d.C.",
    "30 d.C.",
    "33 d.C.",
    "35 d.C."
    ],
    c: 2,
  },
  {
    id: 482,
    cat: "historia",
    dif: "alta",
    p: "Quin filòsof grec va fundar l'Acadèmia d'Atenes?",
    o: [
    "Sòcrates",
    "Aristòtil",
    "Plató",
    "Heràclit"
    ],
    c: 2,
  },
  {
    id: 484,
    cat: "historia",
    dif: "alta",
    p: "Quin líder nazi es va convertir en Führer d'Alemanya el 1934?",
    o: [
    "Hermann Göring",
    "Adolf Hitler",
    "Joseph Goebbels",
    "Reinhard Heydrich"
    ],
    c: 1,
  },
  {
    id: 486,
    cat: "historia",
    dif: "alta",
    p: "Quin imperador inca va ser capturat pels espanyols durant la conquesta?",
    o: [
    "Huayna Capac",
    "Atahualpa",
    "Manco Inca",
    "Túpac Yupanqui"
    ],
    c: 1,
  },
  {
    id: 488,
    cat: "historia",
    dif: "alta",
    p: "Quin emperador bizantí va reconquerir grans territori de l'Imperi Romà d'Occident?",
    o: [
    "Justinià I",
    "Teodosi",
    "Arcadi",
    "Anastasi I"
    ],
    c: 0,
  },
  {
    id: 490,
    cat: "historia",
    dif: "alta",
    p: "Quin rei anglès es va casar amb Caterina d'Aragó com primera esposa?",
    o: [
    "Enric VII",
    "Enric VIII",
    "Enric II",
    "Enric III"
    ],
    c: 1,
  },
  {
    id: 492,
    cat: "historia",
    dif: "alta",
    p: "Quin filòsof il·lustrat va escriure 'El Contrato Social'?",
    o: [
    "Voltaire",
    "Jean-Jacques Rousseau",
    "Montesquieu",
    "Denis Diderot"
    ],
    c: 1,
  },
  {
    id: 493,
    cat: "historia",
    dif: "alta",
    p: "En quin any va culminar la Guerra de Successió Espanyola?",
    o: [
    "1710",
    "1711",
    "1713",
    "1715"
    ],
    c: 2,
  },
  {
    id: 494,
    cat: "historia",
    dif: "alta",
    p: "Quin matemàtic i físic va desenvolupar les lleis del moviment i la gravitació universal?",
    o: [
    "Galileo Galilei",
    "Isaac Newton",
    "Johannes Kepler",
    "René Descartes"
    ],
    c: 1,
  },
  {
    id: 495,
    cat: "historia",
    dif: "alta",
    p: "En quin any va ocórrer la Crisi dels Míssils de Cuba?",
    o: [
    "1960",
    "1961",
    "1962",
    "1963"
    ],
    c: 2,
  },
  {
    id: 496,
    cat: "historia",
    dif: "alta",
    p: "Quin navegant va ser el primer europeu a arribar a l'Índia per via marítima rodejant l'Àfrica?",
    o: [
    "Cristòfor Colom",
    "Bartolomeu Días",
    "Vasco da Gama",
    "Ferdinand Magalhães"
    ],
    c: 2,
  },
  {
    id: 497,
    cat: "historia",
    dif: "alta",
    p: "Quin any va ser declarada incapaç la Reina Maria I de Portugal per malaltia mental?",
    o: [
    "1792",
    "1799",
    "1807",
    "1816"
    ],
    c: 1,
  },
  {
    id: 498,
    cat: "historia",
    dif: "alta",
    p: "Quin general francès va conquerir Egipte el 1798?",
    o: [
    "Jean-Baptiste Kléber",
    "Napoleó Bonaparte",
    "Joachim Murat",
    "Claude Victor"
    ],
    c: 1,
  },
  {
    id: 499,
    cat: "historia",
    dif: "alta",
    p: "En quin any es va signar la Declaració Universal dels Drets Humans?",
    o: [
    "1945",
    "1946",
    "1948",
    "1950"
    ],
    c: 2,
  },
  {
    id: 500,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin director va realitzar la pel·lícula 'Inception' (2010)?",
    o: [
    "Steven Spielberg",
    "Christopher Nolan",
    "Denis Villeneuve",
    "James Cameron"
    ],
    c: 1,
  },
  {
    id: 501,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és el nom real de l'artista musical 'The Weeknd'?",
    o: [
    "Abel Tesfaye",
    "Ahmed Fahad",
    "Adrian Martin",
    "Angelo Ferraro"
    ],
    c: 0,
  },
  {
    id: 503,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin país es troba el Museu del Prado?",
    o: [
    "Portugal",
    "França",
    "Espanya",
    "Itàlia"
    ],
    c: 2,
  },
  {
    id: 504,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin plat italià tradicional és conegut per estar fet amb brou, arròs i formatge?",
    o: [
    "Risotto",
    "Polenta",
    "Lasanya",
    "Carbonara"
    ],
    c: 0,
  },
  {
    id: 505,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin videojoc popular de puzles el jugador pot modificar les regles del joc com si fossin blocs?",
    o: [
    "Portal 2",
    "The Witness",
    "Baba Is You",
    "The Talos Principle"
    ],
    c: 2,
  },
  {
    id: 506,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin navegador web va ser desenvolupat per Mozilla?",
    o: [
    "Chrome",
    "Firefox",
    "Safari",
    "Edge"
    ],
    c: 1,
  },
  {
    id: 507,
    cat: "cultura",
    dif: "mitjana",
    p: "Qui va pintar 'Les nenes d'Avinyó'?",
    o: [
    "Salvador Dalí",
    "Pablo Picasso",
    "Joan Miró",
    "Marc Chagall"
    ],
    c: 1,
  },
  {
    id: 508,
    cat: "cultura",
    dif: "mitjana",
    p: "En quina dècada va originar-se el gènere musical reggae a Jamaica?",
    o: [
    "anys 50",
    "anys 60",
    "anys 70",
    "anys 80"
    ],
    c: 1,
  },
  {
    id: 509,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin escriptor irlandès va escriure 'Ulisses'?",
    o: [
    "Samuel Beckett",
    "William Butler Yeats",
    "James Joyce",
    "Seamus Heaney"
    ],
    c: 2,
  },
  {
    id: 510,
    cat: "cultura",
    dif: "mitjana",
    p: "Quants jugadors componen un equip de bàsquet a la pista?",
    o: [
    "4",
    "5",
    "6",
    "7"
    ],
    c: 1,
  },
  {
    id: 511,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin sistema operatiu va desenvolupar Microsoft?",
    o: [
    "macOS",
    "Linux",
    "Windows",
    "Android"
    ],
    c: 2,
  },
  {
    id: 512,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin artista impressionista era famós pels seus quadres de nenúfars?",
    o: [
    "Paul Cézanne",
    "Claude Monet",
    "Pierre-Auguste Renoir",
    "Edgar Degas"
    ],
    c: 1,
  },
  {
    id: 513,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin film del 2019 va guanyar l'Oscar a millor pel·lícula?",
    o: [
    "1917",
    "Parasite",
    "Joker",
    "Once Upon a Time in Hollywood"
    ],
    c: 1,
  },
  {
    id: 514,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la cuina regional conhecuda pel pa amb tomàquet i jamó?",
    o: [
    "Basca",
    "Galega",
    "Catalana",
    "Andalusa"
    ],
    c: 2,
  },
  {
    id: 515,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin joc de taula es basa en col·locar peces en un tauler de 8x8?",
    o: [
    "Dames",
    "Escacs",
    "Parchís",
    "Mahjong"
    ],
    c: 1,
  },
  {
    id: 516,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és el format de vídeo més popular a la plataforma TikTok?",
    o: [
    "4:3",
    "16:9",
    "9:16",
    "1:1"
    ],
    c: 2,
  },
  {
    id: 518,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin país va néixer l'autor Gabriel García Márquez?",
    o: [
    "Mèxic",
    "Colòmbia",
    "Perú",
    "Veneçuela"
    ],
    c: 1,
  },
  {
    id: 520,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin any es va llançar la primera versió d'iPhone?",
    o: [
    "2005",
    "2006",
    "2007",
    "2008"
    ],
    c: 2,
  },
  {
    id: 521,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin escultor va crear la famosa obra 'El Pensador'?",
    o: [
    "Auguste Rodin",
    "Michelangelo",
    "Gian Lorenzo Bernini",
    "Henry Moore"
    ],
    c: 0,
  },
  {
    id: 524,
    cat: "cultura",
    dif: "mitjana",
    p: "Quantes cordes té una guitarra clàssica?",
    o: [
    "5",
    "6",
    "7",
    "8"
    ],
    c: 1,
  },
  {
    id: 525,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin director va realitzar la pel·lícula 'Interestelar'?",
    o: [
    "Steven Spielberg",
    "Christopher Nolan",
    "Denis Villeneuve",
    "James Cameron"
    ],
    c: 1,
  },
  {
    id: 526,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la novel·la més venuda de tots els temps?",
    o: [
    "Don Quixot",
    "La Bíblia",
    "Orgull i prejudici",
    "Crepuscle"
    ],
    c: 0,
  },
  {
    id: 527,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin any es va estrenar 'Bohemian Rhapsody' de Queen?",
    o: [
    "1973",
    "1975",
    "1977",
    "1979"
    ],
    c: 1,
  },
  {
    id: 528,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina pintura de Pablo Picasso és més famosa pel seu estil cubista?",
    o: [
    "Las Meninas",
    "Guernica",
    "La nit estrellada",
    "El grit"
    ],
    c: 1,
  },
  {
    id: 529,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és el plat nacional d'Itàlia?",
    o: [
    "Paella",
    "Pasta",
    "Pizza",
    "Risotto"
    ],
    c: 1,
  },
  {
    id: 530,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin joc de taula es mouen peces amb forma de cavall?",
    o: [
    "Escacs",
    "Dames",
    "Monopoli",
    "Joc de l'oca"
    ],
    c: 0,
  },
  {
    id: 531,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina empresa va crear la consola PlayStation original?",
    o: [
    "Nintendo",
    "Sega",
    "Sony",
    "Atari"
    ],
    c: 2,
  },
  {
    id: 532,
    cat: "cultura",
    dif: "mitjana",
    p: "Qui va escriure 'Cent anys de solitud'?",
    o: [
    "Jorge Luis Borges",
    "Gabriel García Márquez",
    "Pablo Neruda",
    "Julio Cortázar"
    ],
    c: 1,
  },
  {
    id: 534,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin país es va originar la música flamenco?",
    o: [
    "Portugal",
    "Itàlia",
    "Espanya",
    "Grècia"
    ],
    c: 2,
  },
  {
    id: 535,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la capital gastronòmica mundial més reconeguda?",
    o: [
    "Tòquio",
    "París",
    "Barcelona",
    "Nova York"
    ],
    c: 1,
  },
  {
    id: 536,
    cat: "cultura",
    dif: "mitjana",
    p: "Quants jugadors té un equip de futbol en el camp?",
    o: [
    "9",
    "10",
    "11",
    "12"
    ],
    c: 2,
  },
  {
    id: 537,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin va ser el primer navegador web popularitzat?",
    o: [
    "Google Chrome",
    "Internet Explorer",
    "Netscape Navigator",
    "Firefox"
    ],
    c: 2,
  },
  {
    id: 538,
    cat: "cultura",
    dif: "mitjana",
    p: "Qui va dirigir la pel·lícula 'Pulp Fiction'?",
    o: [
    "Martin Scorsese",
    "Quentin Tarantino",
    "David Fincher",
    "Paul Thomas Anderson"
    ],
    c: 1,
  },
  {
    id: 539,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és el plat més popular del Japó?",
    o: [
    "Dim sum",
    "Sushi",
    "Pad Thai",
    "Curry"
    ],
    c: 1,
  },
  {
    id: 540,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin any es va publicar 'Harry Potter i la pedra filosofal'?",
    o: [
    "1995",
    "1997",
    "1999",
    "2001"
    ],
    c: 1,
  },
  {
    id: 541,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la resina utilitzada en la pintura tradicional acrílica?",
    o: [
    "Poliestirè",
    "Poliuretà",
    "Acrilat",
    "Cel·lulosa"
    ],
    c: 2,
  },
  {
    id: 542,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin cantant és conegut com el 'Rei del Pop'?",
    o: [
    "Elvis Presley",
    "Michael Jackson",
    "David Bowie",
    "Prince"
    ],
    c: 1,
  },
  {
    id: 543,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la ingredient principal del guacamole?",
    o: [
    "Tomàquet",
    "Cigró",
    "Mango",
    "Alvocat"
    ],
    c: 3,
  },
  {
    id: 544,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin joc virtual es construeix amb blocs?",
    o: [
    "Fortnite",
    "Minecraft",
    "Roblox",
    "The Sims"
    ],
    c: 1,
  },
  {
    id: 545,
    cat: "cultura",
    dif: "mitjana",
    p: "Qui va escriure 'Crim i càstig'?",
    o: [
    "Lev Tolstoi",
    "Fiódor Dostoievski",
    "Aleksandr Poxkin",
    "Antòn Txékhov"
    ],
    c: 1,
  },
  {
    id: 546,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin artista va pintar 'La persistència de la memòria'?",
    o: [
    "Joan Miró",
    "Salvador Dalí",
    "Pablo Picasso",
    "Marc Chagall"
    ],
    c: 1,
  },
  {
    id: 547,
    cat: "cultura",
    dif: "mitjana",
    p: "Quant temps dura una partida típica d'escacs professional?",
    o: [
    "30 minuts",
    "1-2 hores",
    "3-5 hores",
    "8-10 hores"
    ],
    c: 2,
  },
  {
    id: 548,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és el sistema operatiu més utilitzat en ordinadors personals?",
    o: [
    "macOS",
    "Windows",
    "Linux",
    "ChromeOS"
    ],
    c: 1,
  },
  {
    id: 549,
    cat: "cultura",
    dif: "mitjana",
    p: "Qui va compondre la simfonia 'Novena'?",
    o: [
    "Wolfgang Amadeus Mozart",
    "Ludwig van Beethoven",
    "Johann Sebastian Bach",
    "Antonio Vivaldi"
    ],
    c: 1,
  },
  {
    id: 550,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin director va realitzar la pel·lícula 'Ciudadano Kane'?",
    o: [
    "Alfred Hitchcock",
    "Orson Welles",
    "John Ford",
    "Billy Wilder"
    ],
    c: 1,
  },
  {
    id: 552,
    cat: "cultura",
    dif: "mitjana",
    p: "Qui va guanyar el Premi Cervantes de literatura l'any 2022?",
    o: [
    "Juan Marsé",
    "Rafael Cadenas",
    "Antonio Muñoz Molina",
    "Carmen Laforet"
    ],
    c: 1,
  },
  {
    id: 553,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin artista va pintar 'La nit estrellada'?",
    o: [
    "Pablo Picasso",
    "Vincent van Gogh",
    "Claude Monet",
    "Salvador Dalí"
    ],
    c: 1,
  },
  {
    id: 554,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin país es va inventar el videojoc 'Tetris'?",
    o: [
    "Japó",
    "Unió Soviètica",
    "Estats Units",
    "Corea del Sud"
    ],
    c: 1,
  },
  {
    id: 555,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la capital culinària del xampany a França?",
    o: [
    "París",
    "Reims",
    "Marsella",
    "Lió"
    ],
    c: 1,
  },
  {
    id: 556,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin grup britànic va llançar la cançó 'Don't Look Back in Anger' el 1996?",
    o: [
    "Blur",
    "Oasis",
    "Radiohead",
    "Pulp"
    ],
    c: 1,
  },
  {
    id: 557,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin any es va llançar el primer iPhone?",
    o: [
    "2005",
    "2007",
    "2008",
    "2006"
    ],
    c: 1,
  },
  {
    id: 558,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina banda va gravar l'àlbum 'Dark Side of the Moon'?",
    o: [
    "The Beatles",
    "Pink Floyd",
    "Led Zeppelin",
    "Queen"
    ],
    c: 1,
  },
  {
    id: 559,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin escriptor va guanyar el Premi Nobel de Literatura l'any 2021?",
    o: [
    "Kazuo Ishiguro",
    "Abdulrazak Gurnah",
    "Jon Fosse",
    "Peter Handke"
    ],
    c: 1,
  },
  {
    id: 560,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és el joc de taula més venut al món?",
    o: [
    "Échecs",
    "Monopoly",
    "Scrabble",
    "Risk"
    ],
    c: 1,
  },
  {
    id: 561,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina plataforma de streaming va crear 'Stranger Things'?",
    o: [
    "Amazon Prime Video",
    "Netflix",
    "Disney+",
    "HBO Max"
    ],
    c: 1,
  },
  {
    id: 562,
    cat: "cultura",
    dif: "mitjana",
    p: "Qui va pintar 'Les demoiselles d'Avignon'?",
    o: [
    "Henri Matisse",
    "Pablo Picasso",
    "Georges Braque",
    "Juan Gris"
    ],
    c: 1,
  },
  {
    id: 563,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin idioma es va escriure originalment 'Crimen y castigo'?",
    o: [
    "Alemany",
    "Rus",
    "Polonès",
    "Txec"
    ],
    c: 1,
  },
  {
    id: 564,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin actor va interpretar a Batman en la trilogia dirigida per Christopher Nolan?",
    o: [
    "Val Kilmer",
    "Christian Bale",
    "George Clooney",
    "Michael Keaton"
    ],
    c: 1,
  },
  {
    id: 565,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la principal ciutat del flamenco a Espanya?",
    o: [
    "Madrid",
    "Sevilla",
    "Còrdova",
    "Màlaga"
    ],
    c: 1,
  },
  {
    id: 567,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin any va llançar Microsoft el sistema operatiu Windows 95?",
    o: [
    "1993",
    "1994",
    "1995",
    "1996"
    ],
    c: 2,
  },
  {
    id: 568,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la cuina més antiga documentada del món?",
    o: [
    "Cuina grega",
    "Cuina egípcia",
    "Cuina xinesa",
    "Cuina romana"
    ],
    c: 1,
  },
  {
    id: 569,
    cat: "cultura",
    dif: "mitjana",
    p: "Qui va escriure la novel·la 'Orgullo y prejuicio'?",
    o: [
    "Charlotte Brontë",
    "Jane Austen",
    "George Eliot",
    "Emily Dickinson"
    ],
    c: 1,
  },
  {
    id: 570,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin joc de cartes col·leccionables es va crear l'any 1996?",
    o: [
    "Yu-Gi-Oh!",
    "Magic: The Gathering",
    "Pokémon",
    "Hearthstone"
    ],
    c: 2,
  },
  {
    id: 571,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin model d'intel·ligència artificial conversacional va llançar OpenAI el novembre de 2022?",
    o: [
    "GPT-3",
    "DALL-E",
    "ChatGPT",
    "Midjourney"
    ],
    c: 2,
  },
  {
    id: 572,
    cat: "cultura",
    dif: "mitjana",
    p: "Qui va dirigir 'Forrest Gump'?",
    o: [
    "Steven Spielberg",
    "Robert Zemeckis",
    "Francis Ford Coppola",
    "Barry Levinson"
    ],
    c: 1,
  },
  {
    id: 573,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin país es produeix el vi de Rioja?",
    o: [
    "Catalunya",
    "La Rioja",
    "Galícia",
    "País Basc"
    ],
    c: 1,
  },
  {
    id: 574,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina banda va ser fundada per Bono i The Edge?",
    o: [
    "Radiohead",
    "U2",
    "Coldplay",
    "The Smiths"
    ],
    c: 1,
  },
  {
    id: 575,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin director va realitzar la pel·lícula 'Parasite' que va guanyar la Palma d'Or el 2019?",
    o: [
    "Park Chan-wook",
    "Bong Joon-ho",
    "Lee Chang-dong",
    "Kim Ki-duk"
    ],
    c: 1,
  },
  {
    id: 576,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin any es va publicar la novel·la 'Cent anys de solitud' de Gabriel García Márquez?",
    o: [
    "1965",
    "1967",
    "1970",
    "1972"
    ],
    c: 1,
  },
  {
    id: 578,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és el plat més emblemàtic de la cuina japonesa tradicional?",
    o: [
    "Ramen",
    "Sushi",
    "Tempura",
    "Tonkatsu"
    ],
    c: 1,
  },
  {
    id: 580,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin any es va llançar el videojoc 'The Legend of Zelda: Ocarina of Time'?",
    o: [
    "1996",
    "1998",
    "2000",
    "2002"
    ],
    c: 1,
  },
  {
    id: 581,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin escriptor va escriure 'Don Quixot de la Manxa'?",
    o: [
    "Lope de Vega",
    "Miguel de Cervantes",
    "Federico García Lorca",
    "Luis de Góngora"
    ],
    c: 1,
  },
  {
    id: 582,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la paraula italiana que significa 'al dente' referent a la pasta?",
    o: [
    "Molla",
    "Tendra",
    "Ferma al mossec",
    "Cuita"
    ],
    c: 2,
  },
  {
    id: 583,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin metall preciós té el símbol químic Au i número atòmic 79?",
    o: [
    "Plata",
    "Or",
    "Coure",
    "Platí"
    ],
    c: 1,
  },
  {
    id: 584,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin país es va inventar el joc del escacs tal com el coneixem avui?",
    o: [
    "Persia",
    "Índia",
    "Xina",
    "Aràbia"
    ],
    c: 1,
  },
  {
    id: 585,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin cantant és conegut per la cançó 'Bohemian Rhapsody'?",
    o: [
    "David Bowie",
    "Freddie Mercury",
    "Elton John",
    "Mick Jagger"
    ],
    c: 1,
  },
  {
    id: 586,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina novel·la de Jane Austen comença amb la frase 'It is a truth universally acknowledged'?",
    o: [
    "Emma",
    "Orgull i prejudici",
    "Sentit i sensibilitat",
    "Mansfield Park"
    ],
    c: 1,
  },
  {
    id: 587,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin pintor impressionista és famós per les seves sèries de nenúfars?",
    o: [
    "Pierre-Auguste Renoir",
    "Claude Monet",
    "Alfred Sisley",
    "Camille Pissarro"
    ],
    c: 1,
  },
  {
    id: 588,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin any es va estrenar la sèrie de televisió 'Breaking Bad'?",
    o: [
    "2006",
    "2008",
    "2010",
    "2012"
    ],
    c: 1,
  },
  {
    id: 589,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és l'ingredient principal de l'hummus?",
    o: [
    "Llenties",
    "Cigrons",
    "Faves",
    "Mongetes"
    ],
    c: 1,
  },
  {
    id: 590,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin compositor va escriure 'El Messies'?",
    o: [
    "Antonio Vivaldi",
    "Georg Friedrich Händel",
    "Johann Sebastian Bach",
    "George Frideric Gould"
    ],
    c: 1,
  },
  {
    id: 592,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin país es va inventar el ballet modern?",
    o: [
    "Itàlia",
    "França",
    "Rússia",
    "Anglaterra"
    ],
    c: 1,
  },
  {
    id: 593,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin famós novel·lista gòtic va escriure 'Frankenstein'?",
    o: [
    "Bram Stoker",
    "Mary Shelley",
    "Edgar Allan Poe",
    "H.P. Lovecraft"
    ],
    c: 1,
  },
  {
    id: 594,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la resolució estàndard de televisió de definició estàndard (SD)?",
    o: [
    "720p",
    "1080p",
    "480p",
    "2160p"
    ],
    c: 2,
  },
  {
    id: 595,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin tipus de vi es fa amb raïms Tempranillo?",
    o: [
    "Vi blanc",
    "Vi negre",
    "Vi rosat",
    "Vi espumant"
    ],
    c: 1,
  },
  {
    id: 597,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és el museu d'art més visitat del món?",
    o: [
    "Museu Britànic",
    "Museu del Prado",
    "Museu del Louvre",
    "Museu Metropolità"
    ],
    c: 2,
  },
  {
    id: 598,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la cançó més famosa d'The Beatles?",
    o: [
    "Hey Jude",
    "Let It Be",
    "Something",
    "Yesterday"
    ],
    c: 0,
  },
  {
    id: 599,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és el sushi que es fa sense arròs?",
    o: [
    "Nigiri",
    "Maki",
    "Sashimi",
    "Temaki"
    ],
    c: 2,
  },
  {
    id: 600,
    cat: "cultura",
    dif: "alta",
    p: "Quin compositor va escriure la simfonia 'Das Lied von der Erde'?",
    o: [
    "Richard Strauss",
    "Gustav Mahler",
    "Arnold Schoenberg",
    "Alban Berg"
    ],
    c: 1,
  },
  {
    id: 602,
    cat: "cultura",
    dif: "alta",
    p: "Quin director va realitzar la pel·lícula 'Stalker' l'any 1979?",
    o: [
    "Sergei Eisenstein",
    "Andrei Tarkovsky",
    "Mikhail Kalatozov",
    "Vladimir Petrov"
    ],
    c: 1,
  },
  {
    id: 603,
    cat: "cultura",
    dif: "alta",
    p: "Quin artista va pintar 'La persistència de la memòria' amb els rellotges mous?",
    o: [
    "Joan Miró",
    "Pablo Picasso",
    "Salvador Dalí",
    "Max Ernst"
    ],
    c: 2,
  },
  {
    id: 604,
    cat: "cultura",
    dif: "alta",
    p: "En quin país es va originar el moviment artístic del Dadaisme?",
    o: [
    "França",
    "Suïssa",
    "Alemanya",
    "Itàlia"
    ],
    c: 1,
  },
  {
    id: 605,
    cat: "cultura",
    dif: "alta",
    p: "Quin és el plat tradicional peruà que combina peix cru amb limona?",
    o: [
    "Causa",
    "Ceviche",
    "Ají de gallina",
    "Anticuchos"
    ],
    c: 1,
  },
  {
    id: 606,
    cat: "cultura",
    dif: "alta",
    p: "Quin músic va compondre la 'Marxa de Zacatecas'?",
    o: [
    "Manuel M. Ponce",
    "Genaro Codina",
    "Juventino Rosas",
    "Ignacio Fernández Esperón"
    ],
    c: 1,
  },
  {
    id: 607,
    cat: "cultura",
    dif: "alta",
    p: "En quin any es va estrenar la pel·lícula 'Singin' in the Rain'?",
    o: [
    "1950",
    "1952",
    "1954",
    "1948"
    ],
    c: 1,
  },
  {
    id: 608,
    cat: "cultura",
    dif: "alta",
    p: "Quin autor va escriure 'Ulisses', considerada una de les novel·les més importants del segle XX?",
    o: [
    "Virginia Woolf",
    "James Joyce",
    "F. Scott Fitzgerald",
    "Ernest Hemingway"
    ],
    c: 1,
  },
  {
    id: 609,
    cat: "cultura",
    dif: "alta",
    p: "Quin joc de taula es basa en la construcció d'estructures amb peces de fusta?",
    o: [
    "Jenga",
    "Tetris",
    "Blokus",
    "Carcassonne"
    ],
    c: 0,
  },
  {
    id: 610,
    cat: "cultura",
    dif: "alta",
    p: "Quin pintor impressionista va tallar-se una part de l'orella?",
    o: [
    "Claude Monet",
    "Pierre-Auguste Renoir",
    "Vincent van Gogh",
    "Edgar Degas"
    ],
    c: 2,
  },
  {
    id: 611,
    cat: "cultura",
    dif: "alta",
    p: "En quin any es va llançar la primera versió del sistema operatiu Windows?",
    o: [
    "1985",
    "1987",
    "1990",
    "1983"
    ],
    c: 0,
  },
  {
    id: 612,
    cat: "cultura",
    dif: "alta",
    p: "Quin és el principal ingredient del shabu-shabu, plat tradicional japonès?",
    o: [
    "Calamar",
    "Carn o peix bullits en brou",
    "Fideus de soja",
    "Arròs fregit"
    ],
    c: 1,
  },
  {
    id: 613,
    cat: "cultura",
    dif: "alta",
    p: "Quin músic va crear l'àlbum 'Thriller' que es va convertir en el més venut de la història?",
    o: [
    "Prince",
    "Michael Jackson",
    "David Bowie",
    "Lionel Richie"
    ],
    c: 1,
  },
  {
    id: 614,
    cat: "cultura",
    dif: "alta",
    p: "Quin director va realitzar la trilogia de 'El Senyor dels Anells'?",
    o: [
    "James Cameron",
    "Steven Spielberg",
    "Peter Jackson",
    "Christopher Nolan"
    ],
    c: 2,
  },
  {
    id: 615,
    cat: "cultura",
    dif: "alta",
    p: "Quin és el moviment artístic característic del Renaixement italià?",
    o: [
    "Neoclassicisme",
    "Humanisme",
    "Realisme",
    "Romantisme"
    ],
    c: 1,
  },
  {
    id: 616,
    cat: "cultura",
    dif: "alta",
    p: "Quin videojoc es considera el primer 'survival horror'?",
    o: [
    "Doom",
    "Resident Evil",
    "Silent Hill",
    "Alone in the Dark"
    ],
    c: 3,
  },
  {
    id: 617,
    cat: "cultura",
    dif: "alta",
    p: "Quin és el plat més popular de la gastronomia tailandesa, amb base de tamarinde?",
    o: [
    "Tom yum",
    "Pad Thai",
    "Panang curry",
    "Som tam"
    ],
    c: 1,
  },
  {
    id: 619,
    cat: "cultura",
    dif: "alta",
    p: "En quin any es va estrenar 'Blade Runner', la pel·lícula de Ridley Scott?",
    o: [
    "1980",
    "1982",
    "1984",
    "1986"
    ],
    c: 1,
  },
  {
    id: 620,
    cat: "cultura",
    dif: "alta",
    p: "Qui va inventar la World Wide Web (WWW) el 1989?",
    o: [
    "Bill Gates",
    "Steve Jobs",
    "Tim Berners-Lee",
    "Vint Cerf"
    ],
    c: 2,
  },
  {
    id: 621,
    cat: "cultura",
    dif: "alta",
    p: "Quin surrealista va pintar 'La metamorfosi de Narcís'?",
    o: [
    "Paul Delvaux",
    "Max Ernst",
    "Salvador Dalí",
    "André Masson"
    ],
    c: 2,
  },
  {
    id: 622,
    cat: "cultura",
    dif: "alta",
    p: "Quin és el joc de cartes tradicional japonès que utilitza cartes amb poesia clàssica?",
    o: [
    "Go-Fish",
    "Hanafuda",
    "Karuta",
    "Shogi"
    ],
    c: 2,
  },
  {
    id: 623,
    cat: "cultura",
    dif: "alta",
    p: "Quin músic britànic va componer la banda sonora de 'The Lion King'?",
    o: [
    "Andrew Lloyd Webber",
    "Elton John",
    "Hans Zimmer",
    "John Williams"
    ],
    c: 1,
  },
  {
    id: 624,
    cat: "cultura",
    dif: "alta",
    p: "Quin és l'ingredient principal de la gastronomia vasca que ha esdevingut símbol culinari?",
    o: [
    "Txuleta de xai",
    "Bacallà a la vizcaïna",
    "Calamar a la romana",
    "Perretxicos"
    ],
    c: 1,
  },
  {
    id: 625,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és l'any més acceptat com a primera visita portuguesa documentada a les Açores?",
    o: [
    "1415",
    "1427",
    "1450",
    "1492"
    ],
    c: 1,
  },
  {
    id: 626,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la capital de les Açores?",
    o: [
    "Angra do Heroísmo",
    "Ponta Delgada",
    "Horta",
    "São Jorge"
    ],
    c: 1,
  },
  {
    id: 627,
    cat: "acores",
    dif: "mitjana",
    p: "A quin país pertanyen les Açores?",
    o: [
    "Espanya",
    "Portugal",
    "Brasil",
    "França"
    ],
    c: 1,
  },
  {
    id: 628,
    cat: "acores",
    dif: "mitjana",
    p: "Quants grups d'illes formen l'arxipèlag de les Açores?",
    o: [
    "2",
    "3",
    "4",
    "5"
    ],
    c: 1,
  },
  {
    id: 629,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és l'illa més gran de les Açores?",
    o: [
    "Terceira",
    "São Miguel",
    "Pico",
    "Faial"
    ],
    c: 1,
  },
  {
    id: 630,
    cat: "acores",
    dif: "mitjana",
    p: "Quin tipus de plat típic açorià es fa amb maïs i carn?",
    o: [
    "Caldo verde",
    "Bolo do caco",
    "Milho à açoriana",
    "Pastéis de nata"
    ],
    c: 2,
  },
  {
    id: 631,
    cat: "acores",
    dif: "mitjana",
    p: "En quin océà estan situades les Açores?",
    o: [
    "Atlàntic nord",
    "Atlàntic sud",
    "Pacífic",
    "Índic"
    ],
    c: 0,
  },
  {
    id: 633,
    cat: "acores",
    dif: "mitjana",
    p: "Quina llengua es parla principalment a les Açores?",
    o: [
    "Gallec",
    "Portuguès",
    "Castellà",
    "Català"
    ],
    c: 1,
  },
  {
    id: 634,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és un dels símptomes més característics del viatge a les Açores?",
    o: [
    "El desert",
    "L'observació de balenes",
    "Els cactus",
    "Les ruïnes romanes"
    ],
    c: 1,
  },
  {
    id: 635,
    cat: "acores",
    dif: "mitjana",
    p: "Quin tipus de xai es cria tradicionalment a les Açores?",
    o: [
    "Xai merino",
    "Xai açorià",
    "Xai islandès",
    "Xai australià"
    ],
    c: 1,
  },
  {
    id: 636,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la moneda oficial de les Açores?",
    o: [
    "Escudo portuguès",
    "Euro",
    "Dòlar americà",
    "Lliura esterlina"
    ],
    c: 1,
  },
  {
    id: 637,
    cat: "acores",
    dif: "mitjana",
    p: "En quin segle es va establir una colònia permanent a les Açores?",
    o: [
    "Segle XIII",
    "Segle XIV",
    "Segle XV",
    "Segle XVI"
    ],
    c: 2,
  },
  {
    id: 638,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la principal activitat econòmica tradicional de les Açores?",
    o: [
    "L'agricultura de bananes",
    "La pesca i la ramaderia",
    "La mineria de diamants",
    "L'extracció de petroli"
    ],
    c: 1,
  },
  {
    id: 639,
    cat: "acores",
    dif: "mitjana",
    p: "Quina flor és el símbol de les Açores i tenyeix els camins rurals de color blau i rosa?",
    o: [
    "La mimosa",
    "La ginesta",
    "L'hortènsia",
    "La dàlia"
    ],
    c: 2,
  },
  {
    id: 640,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el climate de les Açores?",
    o: [
    "Tropical",
    "Subtropical atlàntic",
    "Mediterrani",
    "Desèrtic"
    ],
    c: 1,
  },
  {
    id: 641,
    cat: "acores",
    dif: "mitjana",
    p: "Quina illa de les Açores és famosa per la seva producció de vi?",
    o: [
    "São Miguel",
    "Pico",
    "Faial",
    "Terceira"
    ],
    c: 1,
  },
  {
    id: 642,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el plat més famós de la gastronomia açoriana?",
    o: [
    "Francesinha",
    "Caldo de peixe",
    "Arroz de marisco",
    "Sardines assades"
    ],
    c: 1,
  },
  {
    id: 643,
    cat: "acores",
    dif: "mitjana",
    p: "Quin navegant portuguès va arribar a les Açores el 1427?",
    o: [
    "Bartolomeu Dias",
    "Diogo de Silves",
    "Vasco da Gama",
    "Pedro Álvares Cabral"
    ],
    c: 1,
  },
  {
    id: 644,
    cat: "acores",
    dif: "mitjana",
    p: "Quant temps ha que les Açores són una regió autònoma de Portugal?",
    o: [
    "Des de 1976",
    "Des de 1822",
    "Des de 1960",
    "Des de 1950"
    ],
    c: 0,
  },
  {
    id: 645,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el color predominant dels volcans de les Açores?",
    o: [
    "Gris",
    "Negre",
    "Vermell",
    "Blanc"
    ],
    c: 1,
  },
  {
    id: 646,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la festa tradicional més important de les Açores?",
    o: [
    "Festa de Sant Joan",
    "Festa do Espírito Santo",
    "Festa de Sant Antoni",
    "Festa de Corpus Christi"
    ],
    c: 1,
  },
  {
    id: 647,
    cat: "acores",
    dif: "mitjana",
    p: "Quants habitants aproximadament té l'arxipèlag de les Açores?",
    o: [
    "100.000",
    "250.000",
    "500.000",
    "800.000"
    ],
    c: 1,
  },
  {
    id: 648,
    cat: "acores",
    dif: "mitjana",
    p: "Quina illa és la més oriental de les Açores?",
    o: [
    "São Miguel",
    "Santa Maria",
    "Graciosa",
    "Flores"
    ],
    c: 1,
  },
  {
    id: 649,
    cat: "acores",
    dif: "mitjana",
    p: "Quin tipus de formatge típic es fa a les Açores?",
    o: [
    "Queijo da Serra",
    "Queijo de São Jorge",
    "Queijo de Évora",
    "Queijo de Castelo Branco"
    ],
    c: 1,
  },
  {
    id: 650,
    cat: "acores",
    dif: "mitjana",
    p: "Quantes illes principais formen l'arxipèlag de les Açores?",
    o: [
    "7 illes",
    "9 illes",
    "11 illes",
    "13 illes"
    ],
    c: 1,
  },
  {
    id: 655,
    cat: "acores",
    dif: "mitjana",
    p: "Quin producte agrícola és especialment famós de les Açores?",
    o: [
    "La canya de sucre",
    "El te",
    "La pinya",
    "L'arròs"
    ],
    c: 1,
  },
  {
    id: 656,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa es troba el volcà Capelinhos, que va erupcionar el 1957-1958?",
    o: [
    "São Miguel",
    "Terceira",
    "Pico",
    "Faial"
    ],
    c: 3,
  },
  {
    id: 657,
    cat: "acores",
    dif: "mitjana",
    p: "Com s'anomena el plat açorià tradicional fet amb pa de blat, all, oli d'oliva i ous?",
    o: [
    "Cachupa",
    "Caldeirada",
    "Açorda",
    "Cataplana"
    ],
    c: 2,
  },
  {
    id: 658,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa pertany la ciutat de Angra do Heroísmo?",
    o: [
    "São Miguel",
    "Terceira",
    "Pico",
    "Faial"
    ],
    c: 1,
  },
  {
    id: 659,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la distància aproximada de les Açores al continent europeu?",
    o: [
    "500 km",
    "900 km",
    "1.500 km",
    "2.000 km"
    ],
    c: 2,
  },
  {
    id: 661,
    cat: "acores",
    dif: "mitjana",
    p: "Quin licor tradicional es produeix a les Açores a partir de begudes destil·lades?",
    o: [
    "El rom de canya",
    "L'aguardent de mel",
    "L'anis",
    "El vino de fortuna"
    ],
    c: 1,
  },
  {
    id: 662,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa se situa la ciutat de Horta, famosa pel seu port natural?",
    o: [
    "Faial",
    "São Jorge",
    "Pico",
    "Graciosa"
    ],
    c: 0,
  },
  {
    id: 663,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el gos originari de les Açores, utilitzat per a la guarda?",
    o: [
    "Cao de Agua Português",
    "Cao da Serra de Aires",
    "Cao Fila de São Miguel",
    "Cao de Gado Transmontano"
    ],
    c: 2,
  },
  {
    id: 664,
    cat: "acores",
    dif: "mitjana",
    p: "En quin segle van sofrir les Açores més atacs de pirates i corsaris?",
    o: [
    "Segle XIV",
    "Segle XVI",
    "Segle XVII",
    "Segle XVIII"
    ],
    c: 1,
  },
  {
    id: 665,
    cat: "acores",
    dif: "mitjana",
    p: "Quin plat típic açorià es prepara amb peix fresc, marisc i brases?",
    o: [
    "Espetada",
    "Cataplana de marisco",
    "Grelhada mista",
    "Bouillabaisse"
    ],
    c: 1,
  },
  {
    id: 666,
    cat: "acores",
    dif: "mitjana",
    p: "Quina espècie de balena és més comuna en les aigües de les Açores?",
    o: [
    "Balena blava",
    "Balena de Groenlàndia",
    "Balena esperma",
    "Balena gris"
    ],
    c: 2,
  },
  {
    id: 668,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa es troben les famoses fumaroles de Furnas, amb activitat geotèrmica?",
    o: [
    "Pico",
    "São Miguel",
    "Terceira",
    "Faial"
    ],
    c: 1,
  },
  {
    id: 669,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el principal port comercial de les Açores?",
    o: [
    "Porto de Horta",
    "Porto de Ponta Delgada",
    "Porto de Angra do Heroísmo",
    "Porto de Praia"
    ],
    c: 1,
  },
  {
    id: 670,
    cat: "acores",
    dif: "mitjana",
    p: "Quin cefalòpode és molt present a la gastronomia açoriana i es serveix sovint en adobo?",
    o: [
    "Calamar",
    "Sèpia",
    "Polp",
    "Gamba"
    ],
    c: 2,
  },
  {
    id: 671,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és l'illa més septentrional de l'arxipèlag de les Açores?",
    o: [
    "Graciosa",
    "Corvo",
    "Flores",
    "São Jorge"
    ],
    c: 2,
  },
  {
    id: 674,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la 2a illa més gran de les Açores per superfície?",
    o: [
    "São Miguel",
    "Terceira",
    "Pico",
    "Faial"
    ],
    c: 2,
  },
  {
    id: 677,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la capital administrativa de les Açores?",
    o: [
    "Terceira",
    "Ponta Delgada",
    "Horta",
    "Santa Cruz das Flores"
    ],
    c: 1,
  },
  {
    id: 679,
    cat: "acores",
    dif: "mitjana",
    p: "Quin vulcà és el més alt de les Açores?",
    o: [
    "Vulcà das Furnas",
    "Pico da Baía",
    "Pico do Fogo",
    "Pico da Cruz"
    ],
    c: 2,
  },
  {
    id: 680,
    cat: "acores",
    dif: "mitjana",
    p: "A quina distància aproximada de Portugal continental es troben les Açores?",
    o: [
    "800 km",
    "1.500 km",
    "2.100 km",
    "3.000 km"
    ],
    c: 1,
  },
  {
    id: 681,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el plat més típic de la cuina açoriana?",
    o: [
    "Francesinha",
    "Caldeirada",
    "Pastéis de nata",
    "Arroz de marisco"
    ],
    c: 1,
  },
  {
    id: 683,
    cat: "acores",
    dif: "mitjana",
    p: "En quin segle es van descobrir les Açores segons els registres oficials?",
    o: [
    "Segle XII",
    "Segle XV",
    "Segle XVI",
    "Segle XVIII"
    ],
    c: 1,
  },
  {
    id: 684,
    cat: "acores",
    dif: "mitjana",
    p: "Quin animal marí és símbolo de les Açores i és objecte d'avistament turístic?",
    o: [
    "Peixos espasa",
    "Balenes i dofins",
    "Tiburons blancs",
    "Peixos sargantana"
    ],
    c: 1,
  },
  {
    id: 686,
    cat: "acores",
    dif: "mitjana",
    p: "A quin grup de les Açores pertany la illa de São Jorge?",
    o: [
    "Grup Oriental",
    "Grup Central",
    "Grup Occidental",
    "Grup Septentrional"
    ],
    c: 1,
  },
  {
    id: 688,
    cat: "acores",
    dif: "mitjana",
    p: "Quina illa de les Açores va patir un devastador terratrèmol el juliol de 1998?",
    o: [
    "São Miguel",
    "Terceira",
    "Faial",
    "Pico"
    ],
    c: 2,
  },
  {
    id: 689,
    cat: "acores",
    dif: "mitjana",
    p: "Quantes freguesias (parròquies) aproximadament té l'illa de São Miguel?",
    o: [
    "8 freguesias",
    "12 freguesias",
    "18 freguesias",
    "25 Freguesias"
    ],
    c: 2,
  },
  {
    id: 690,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el volcà més actiu de les Açores?",
    o: [
    "Vulcà de Pico",
    "Vulcà de Fogo a São Miguel",
    "Vulcà de Santa Maria",
    "Vulcà de Flores"
    ],
    c: 1,
  },
  {
    id: 692,
    cat: "acores",
    dif: "mitjana",
    p: "Quina illa de les Açores és coneguda pels seus camps de lava i paisatge volcànic?",
    o: [
    "Graciosa",
    "Pico",
    "Faial",
    "Santa Maria"
    ],
    c: 1,
  },
  {
    id: 694,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el producte artesanal típic de les Açores molt popular com a souvenir?",
    o: [
    "Ceràmica",
    "Brodats",
    "Cistells de vimen",
    "Teles de seda"
    ],
    c: 1,
  },
  {
    id: 695,
    cat: "acores",
    dif: "mitjana",
    p: "Quin museu és dedicat a la història natural i vulcanisme a Ponta Delgada?",
    o: [
    "Museu do Volcão",
    "Museu Etnográfico",
    "Museu Carlos Machado",
    "Museu da Guerra"
    ],
    c: 2,
  },
  {
    id: 697,
    cat: "acores",
    dif: "mitjana",
    p: "Quin port és el més important per al comerç exterior de les Açores?",
    o: [
    "Port de Horta",
    "Port de Ponta Delgada",
    "Port de Praia da Vitória",
    "Port de Santa Cruz das Flores"
    ],
    c: 1,
  },
  {
    id: 698,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la llegenda més famous de les Açores relacionada amb la navegació?",
    o: [
    "Atlàntida",
    "L'illa de San Borondó",
    "La ciutat perduda de Lemúria",
    "L'illa de l'Aur"
    ],
    c: 1,
  },
  {
    id: 702,
    cat: "acores",
    dif: "mitjana",
    p: "En quin any es va produir l'erupció del volcà Capelinhos a la Faial?",
    o: [
    "1947",
    "1957",
    "1967",
    "1977"
    ],
    c: 1,
  },
  {
    id: 706,
    cat: "acores",
    dif: "mitjana",
    p: "Quin gas volcanic és característic de les solfataras de Furnas a São Miguel?",
    o: [
    "Nitrogen",
    "Diòxid de carboni",
    "Metà",
    "Oxigen"
    ],
    c: 1,
  },
  {
    id: 707,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la planta endèmica més característica de les Açores?",
    o: [
    "Orquídia azorenca",
    "Louro-do-Açor",
    "Cravo-de-Açores",
    "Rosa-de-Açores"
    ],
    c: 1,
  },
  {
    id: 709,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el plat típic més famós de la gastronomia azorica?",
    o: [
    "Sardina à Braz",
    "Caldo de Milho",
    "Alheira",
    "Bacalhau à Brás"
    ],
    c: 1,
  },
  {
    id: 713,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el producte agrícola tradicional més important de les Açores?",
    o: [
    "Plàtan",
    "Tè",
    "Pinya",
    "Café"
    ],
    c: 1,
  },
  {
    id: 714,
    cat: "acores",
    dif: "mitjana",
    p: "En quin segle es va produir el major terratrèmol que va destruir Angra do Heroísmo?",
    o: [
    "XV",
    "XVI",
    "XVII",
    "XVIII"
    ],
    c: 3,
  },
  {
    id: 715,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el gos autòcton de les Açores més famós?",
    o: [
    "Cao da Serra da Estrela",
    "Cao Fila de Sao Miguel",
    "Cao de Castro Laboreiro",
    "Cao de Água Português"
    ],
    c: 1,
  },
  {
    id: 716,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la festa més popular i tradicional de les Açores?",
    o: [
    "Festa de São João",
    "Festa do Espírito Santo",
    "Festa de Todos os Santos",
    "Festa de Corpus Christi"
    ],
    c: 1,
  },
  {
    id: 717,
    cat: "acores",
    dif: "mitjana",
    p: "Quins esports i activitats marines estan entre els més populars a les Açores avui dia?",
    o: [
    "Esquí aquàtic i vela",
    "Avistament de balenes i busseig",
    "Surf d'alta competició",
    "Pesca esportiva de tonyina"
    ],
    c: 1,
  },
  {
    id: 718,
    cat: "acores",
    dif: "mitjana",
    p: "Com s'anomenen les fonts d'aigüa termal natural que es troben a la Lagoa das Furnas a São Miguel?",
    o: [
    "Fumaroles",
    "Caldeiras",
    "Solfataras",
    "Geisers"
    ],
    c: 1,
  },
  {
    id: 719,
    cat: "acores",
    dif: "mitjana",
    p: "En quin continent es troben les Açores geogràficament?",
    o: [
    "Europa",
    "Amèrica del Nord",
    "Àfrica",
    "Amèrica del Sud"
    ],
    c: 0,
  },
  {
    id: 720,
    cat: "acores",
    dif: "mitjana",
    p: "Quina espècie de balena és especialment famosa per fer acrobàcies i és molt vista a les Açores?",
    o: [
    "Balena blava",
    "Balena gibosa (jorobada)",
    "Balena esperma",
    "Balena minke"
    ],
    c: 1,
  },
  {
    id: 721,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el producte artesanal més característic de les Açores?",
    o: [
    "Ceràmica de Vilar do Conde",
    "Tecelatge",
    "Vidre soufflé",
    "Talla de marfil"
    ],
    c: 1,
  },
  {
    id: 722,
    cat: "acores",
    dif: "mitjana",
    p: "Quin color dominant caracteritza el paisatge de les illes de les Açores gràcies a la seva vegetació exuberant?",
    o: [
    "Groc i marró",
    "Verd intens",
    "Gris volcànic",
    "Blau cel·est"
    ],
    c: 1,
  },
  {
    id: 723,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el tipus de construcció tradicional més característica de les cases azoricàs?",
    o: [
    "Pedra granítica amb finestres grans",
    "Adobe amb sostre de palla",
    "Basalt negre amb teules ceràmica",
    "Fusta tropical amb balcons"
    ],
    c: 2,
  },
  {
    id: 726,
    cat: "acores",
    dif: "alta",
    p: "En quin any es va produir l'erupció submarina de Capelinhos a Faial?",
    o: [
    "1957",
    "1963",
    "1951",
    "1966"
    ],
    c: 0,
  },
  {
    id: 728,
    cat: "acores",
    dif: "alta",
    p: "Qual és la muntanya més alta de les Açores?",
    o: [
    "Caldeira de Faial",
    "Pico da Cruz",
    "Ponta do Pico",
    "Caldeira das Sete Cidades"
    ],
    c: 2,
  },
  {
    id: 729,
    cat: "acores",
    dif: "alta",
    p: "A quina altura sobre el nivell del mar es troba el Ponta do Pico?",
    o: [
    "2.351 metres",
    "2.447 metres",
    "2.528 metres",
    "2.634 metres"
    ],
    c: 1,
  },
  {
    id: 730,
    cat: "acores",
    dif: "alta",
    p: "Quina illa de les Açores té la població més gran?",
    o: [
    "Faial",
    "São Miguel",
    "Terceira",
    "Pico"
    ],
    c: 1,
  },
  {
    id: 731,
    cat: "acores",
    dif: "alta",
    p: "En quin any les Açores van ser descobertes pels portuguesos?",
    o: [
    "1422",
    "1432",
    "1444",
    "1456"
    ],
    c: 1,
  },
  {
    id: 733,
    cat: "acores",
    dif: "alta",
    p: "En quin any Angra do Heroísmo va ser declarada Patrimoni de la Humanitat per la UNESCO?",
    o: [
    "1980",
    "1983",
    "1987",
    "1995"
    ],
    c: 1,
  },
  {
    id: 734,
    cat: "acores",
    dif: "alta",
    p: "Qual és el plat típic dels Açores basat en carn de bou cuita lentament?",
    o: [
    "Alheira",
    "Carne Guisada",
    "Arroz Doce",
    "Pão de Queijo"
    ],
    c: 1,
  },
  {
    id: 735,
    cat: "acores",
    dif: "alta",
    p: "Quina és la species endemic de ballena més comuna a les Açores?",
    o: [
    "Balena blanca",
    "Balena blava",
    "Balena de Bryde",
    "Catxalot (Balena esperma)"
    ],
    c: 3,
  },
  {
    id: 736,
    cat: "acores",
    dif: "alta",
    p: "Quin és el petit gos originari de les Açores?",
    o: [
    "Cao da Serra da Estrela",
    "Cao de Agua Portugues",
    "Cao de Fila de Sao Miguel",
    "Cao de Castro Laboreiro"
    ],
    c: 2,
  },
  {
    id: 738,
    cat: "acores",
    dif: "alta",
    p: "Quin navegant famós va fer escala a les Açores en tornar del seu viatge circumnaval el 1522?",
    o: [
    "Vasco da Gama",
    "Cristòfor Colom",
    "Bartolomeu Días",
    "Juan Sebastián Elcano"
    ],
    c: 3,
  },
  {
    id: 739,
    cat: "acores",
    dif: "alta",
    p: "Sobre quina gran estructura geològica oceànica se situen les Açores, explicant la seva activitat volcànica?",
    o: [
    "Fossa de Puerto Rico",
    "Dorsal Mesoatlàntica",
    "Plataforma continental ibèrica",
    "Elevació de les Canàries"
    ],
    c: 1,
  },
  {
    id: 740,
    cat: "acores",
    dif: "alta",
    p: "Quin és el producte de luxe tradicional de les Açores que es comercialitza internacionalment?",
    o: [
    "Seda",
    "Te",
    "Pinya",
    "Vaixells"
    ],
    c: 1,
  },
  {
    id: 741,
    cat: "acores",
    dif: "alta",
    p: "En quin segle la ciutat d'Angra do Heroísmo va ser reconstruïda completament pels terratrèmols?",
    o: [
    "XVI",
    "XVII",
    "XVIII",
    "XIX"
    ],
    c: 2,
  },
  {
    id: 742,
    cat: "acores",
    dif: "alta",
    p: "Quin és el volcan submarí més profund de les Açores?",
    o: [
    "Emilio",
    "João de Castro",
    "Serreta",
    "Hirondelle"
    ],
    c: 3,
  },
  {
    id: 743,
    cat: "acores",
    dif: "alta",
    p: "Quina és l'illa de les Açores amb més clima subtropical amb cultiu de bananes?",
    o: [
    "Terceira",
    "Graciosa",
    "São Jorge",
    "Santa Maria"
    ],
    c: 3,
  },
  {
    id: 744,
    cat: "acores",
    dif: "alta",
    p: "Quin és el festival de música més important celebrat a les Açores cada estiu?",
    o: [
    "Festival de Ponta Delgada",
    "Festival Atlântida",
    "Sumol Fest",
    "NOS Primavera Sound"
    ],
    c: 1,
  },
  {
    id: 745,
    cat: "acores",
    dif: "alta",
    p: "Quina és l'illa volcànica més jove de les Açores en formació geològica?",
    o: [
    "Pico",
    "Faial",
    "Terceira",
    "São Jorge"
    ],
    c: 0,
  },
  {
    id: 746,
    cat: "acores",
    dif: "alta",
    p: "En quin any va ocórrer el gran terratrèmol que va destruir Angra do Heroísmo parcialment?",
    o: [
    "1522",
    "1541",
    "1571",
    "1609"
    ],
    c: 0,
  },
  {
    id: 747,
    cat: "acores",
    dif: "alta",
    p: "Quin poeta portuguès va escriure sobre el seu exili a les Açores durant la Inquisició?",
    o: [
    "Camões",
    "Fernando Pessoa",
    "Eça de Queirós",
    "Antero de Quental"
    ],
    c: 3,
  },
  {
    id: 748,
    cat: "acores",
    dif: "alta",
    p: "Quina és la fondària mitjana de la Fossa de les Açores?",
    o: [
    "2000 metres",
    "4000 metres",
    "6000 metres",
    "8000 metres"
    ],
    c: 2,
  },
  {
    id: 749,
    cat: "acores",
    dif: "alta",
    p: "Quin és l'únic mamífer terrestre nativo no introduït de les Açores?",
    o: [
    "Gat salvatge",
    "Ratpenat",
    "Ratolí",
    "Sargantana"
    ],
    c: 1,
  },
  {
    id: 750,
    cat: "esports",
    dif: "mitjana",
    p: "En quina temporada el FC Barcelona va guanyar la seva primera Lliga de Campions?",
    o: [
    "1991-92",
    "1988-89",
    "1992-93",
    "1989-90"
    ],
    c: 0,
  },
  {
    id: 751,
    cat: "esports",
    dif: "mitjana",
    p: "Quin entrenador va dirigir el Barcelona durant la majoria dels títols de la dècada de 2000?",
    o: [
    "Frank Rijkaard",
    "Tito Vilanova",
    "Pep Guardiola",
    "Tata Martino"
    ],
    c: 2,
  },
  {
    id: 752,
    cat: "esports",
    dif: "mitjana",
    p: "En quin estadi juga actualment el FC Barcelona de futbol?",
    o: [
    "Camp Nou",
    "Estadi de l'Espanyol",
    "Montjuïc",
    "Les Corts"
    ],
    c: 0,
  },
  {
    id: 753,
    cat: "esports",
    dif: "mitjana",
    p: "Quants Balons d'Or va guanyar Lionel Messi mentre jugava al Barcelona?",
    o: [
    "5",
    "6",
    "7",
    "8"
    ],
    c: 2,
  },
  {
    id: 754,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador és considerat la gran promesa del Barcelona a principis del segle XXI juntament amb Xavi i Iniesta?",
    o: [
    "Ronaldinho",
    "Deco",
    "Andriy Shevchenko",
    "Samuel Eto'o"
    ],
    c: 0,
  },
  {
    id: 755,
    cat: "esports",
    dif: "mitjana",
    p: "En quina competició el Barcelona va guanyar el seu primer títol europeu l'any 1979?",
    o: [
    "Lliga de Campions",
    "Copa d'Europa de Bàsquet",
    "Recopa d'Europa",
    "Supercopa Europea"
    ],
    c: 2,
  },
  {
    id: 756,
    cat: "esports",
    dif: "mitjana",
    p: "Quina gimnasta rítmica espanyola ha representat el Barcelona en competicions internacionals?",
    o: [
    "Almudena Cid",
    "Carolina Rodríguez",
    "Patrícia Mamula",
    "Nikoleta Kyriakopoulou"
    ],
    c: 0,
  },
  {
    id: 757,
    cat: "esports",
    dif: "mitjana",
    p: "Quants títols de Lliga ha guanyat el FC Barcelona de futbol fins al 2023?",
    o: [
    "26",
    "28",
    "30",
    "32"
    ],
    c: 1,
  },
  {
    id: 758,
    cat: "esports",
    dif: "mitjana",
    p: "Quin ha estat el principal rival del Barcelona en bàsquet durant les últimes dècades?",
    o: [
    "Real Madrid",
    "Valencia Basket",
    "Joventut Badalona",
    "CSKA Moscou"
    ],
    c: 0,
  },
  {
    id: 759,
    cat: "esports",
    dif: "mitjana",
    p: "Quin entrenador va aconseguir el triplet (Lliga, Copa i Lliga de Campions) amb el Barcelona el 2015?",
    o: [
    "Frank Rijkaard",
    "Pep Guardiola",
    "Luis Enrique",
    "Tito Vilanova"
    ],
    c: 2,
  },
  {
    id: 760,
    cat: "esports",
    dif: "mitjana",
    p: "En quina temporada el Barcelona de handbol va guanyar la seva primera Lliga de Campions?",
    o: [
    "2009-10",
    "2010-11",
    "2011-12",
    "2014-15"
    ],
    c: 1,
  },
  {
    id: 761,
    cat: "esports",
    dif: "mitjana",
    p: "Quin és el nom del poliesportiu on entrena la secció de gimnàstica artística del Barcelona?",
    o: [
    "Centre de Tecnificació de Barcelona",
    "Institut Nacional d'Educació Física",
    "Palau Sant Jordi",
    "Club de Gimnàstica Barcelona"
    ],
    c: 3,
  },
  {
    id: 762,
    cat: "esports",
    dif: "mitjana",
    p: "Quant de temps va jugar Ronaldinho al FC Barcelona?",
    o: [
    "2003-2008",
    "2004-2008",
    "2003-2007",
    "2005-2008"
    ],
    c: 0,
  },
  {
    id: 763,
    cat: "esports",
    dif: "mitjana",
    p: "Quin és el jugador de futbol que ha marcat més gols en la història del FC Barcelona?",
    o: [
    "César Luis Menotti",
    "Lionel Messi",
    "Diego Maradona",
    "Josep Samitier"
    ],
    c: 1,
  },
  {
    id: 764,
    cat: "esports",
    dif: "mitjana",
    p: "En quina posició jugava tradicionalment Xavi Hernández al Barcelona?",
    o: [
    "Defensa central",
    "Centrecampista",
    "Extrem dret",
    "Portero"
    ],
    c: 1,
  },
  {
    id: 765,
    cat: "esports",
    dif: "mitjana",
    p: "Quin entrenador va portar el Barcelona de bàsquet a ser campió d'Europa múltiples vegades?",
    o: [
    "Teo Teruelo",
    "Aíto García Reneses",
    "Duško Ivanović",
    "Svetislav Pešić"
    ],
    c: 3,
  },
  {
    id: 766,
    cat: "esports",
    dif: "mitjana",
    p: "Quina gimnasta rítmica catalana ha guanyat medalles en campionats mundials?",
    o: [
    "Alexandra Agiurgiuculese",
    "Claudia Joly",
    "María Marín",
    "Reva Finkelman"
    ],
    c: 0,
  },
  {
    id: 767,
    cat: "esports",
    dif: "mitjana",
    p: "En quina temporada el Barcelona va aconseguir el sextete (sis títols en una temporada)?",
    o: [
    "2008-09",
    "2009-10",
    "2010-11",
    "2011-12"
    ],
    c: 0,
  },
  {
    id: 768,
    cat: "esports",
    dif: "mitjana",
    p: "Quin jugador és el màxim goleador de la història del Barcelona en competicions europees?",
    o: [
    "Ronaldinho",
    "Lionel Messi",
    "Diego Maradona",
    "Gerd Müller"
    ],
    c: 1,
  },
  {
    id: 769,
    cat: "esports",
    dif: "mitjana",
    p: "Quina ha estat la temporada amb més títols consecutius pel Barcelona de futbol en la Lliga?",
    o: [
    "4 títols consecutius",
    "5 títols consecutius",
    "6 títols consecutius",
    "7 títols consecutius"
    ],
    c: 2,
  },
  {
    id: 770,
    cat: "esports",
    dif: "mitjana",
    p: "Quin entrenador de futbol va guanyar més Lligues de Campions amb el Barcelona?",
    o: [
    "Frank Rijkaard",
    "Pep Guardiola",
    "Luis Enrique",
    "Tito Vilanova"
    ],
    c: 1,
  },
  {
    id: 771,
    cat: "esports",
    dif: "mitjana",
    p: "En quina ciutat es va disputar la Lliga de Campions que va guanyar el Barcelona el 1992?",
    o: [
    "París",
    "Berlín",
    "Lisboa",
    "Estocolm"
    ],
    c: 1,
  },
  {
    id: 772,
    cat: "esports",
    dif: "mitjana",
    p: "Quin nombre de Copes del Rei ha guanyat el FC Barcelona de futbol fins al 2023?",
    o: [
    "28",
    "30",
    "32",
    "35"
    ],
    c: 2,
  },
  {
    id: 773,
    cat: "esports",
    dif: "mitjana",
    p: "Quina és la gimnasta acrobàtica més destacada que ha representat el Barcelona en els últims anys?",
    o: [
    "Marina Rodríguez i Anna Kiefer",
    "Sandra Izquierdo i Lena Rimarenko",
    "Marta Llopis i Miriam Naz",
    "Silvia González i Elena Pérez"
    ],
    c: 1,
  },
  {
    id: 774,
    cat: "esports",
    dif: "mitjana",
    p: "En quina temporada va arribar Andrés Iniesta al Barcelona procedent de La Masia?",
    o: [
    "2000-01",
    "2001-02",
    "2002-03",
    "2004-05"
    ],
    c: 1,
  },
  {
    id: 775,
    cat: "geografia",
    dif: "mitjana",
    p: "En quin continent es troba la Patagònia?",
    o: [
    "Àfrica",
    "Àsia",
    "Amèrica del Sud",
    "Oceania"
    ],
    c: 2,
  },
  {
    id: 776,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Maurici?",
    o: [
    "Port-Louis",
    "Saint-Denis",
    "Victoria",
    "Moroni"
    ],
    c: 0,
  },
  {
    id: 777,
    cat: "geografia",
    dif: "mitjana",
    p: "Quants estats componen la Federació Russa?",
    o: [
    "78",
    "83",
    "85",
    "91"
    ],
    c: 2,
  },
  {
    id: 778,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin és el pic més alt de l'Àfrica?",
    o: [
    "Mont Kenya",
    "Kilimanjaro",
    "Mont Stanley",
    "Ras Dashen"
    ],
    c: 1,
  },
  {
    id: 779,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin océà separa Àfrica d'Àsia a l'est?",
    o: [
    "Índic",
    "Atlàntic",
    "Pacífic",
    "Àrtic"
    ],
    c: 0,
  },
  {
    id: 780,
    cat: "geografia",
    dif: "mitjana",
    p: "En quin país es troben els Andes?",
    o: [
    "Brasil",
    "Colòmbia i Perú",
    "Uruguai",
    "Veneçuela"
    ],
    c: 1,
  },
  {
    id: 781,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Djibouti?",
    o: [
    "Asmara",
    "Hargeisa",
    "Djibouti",
    "Addis Abeba"
    ],
    c: 2,
  },
  {
    id: 782,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin riu travessa Budapest?",
    o: [
    "Tissa",
    "Danubi",
    "Sava",
    "Drava"
    ],
    c: 1,
  },
  {
    id: 783,
    cat: "geografia",
    dif: "mitjana",
    p: "En quin continent es troba Groenlàndia?",
    o: [
    "Amèrica del Nord",
    "Europa",
    "Àsia",
    "Oceania"
    ],
    c: 0,
  },
  {
    id: 784,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin és el riu més profund del món?",
    o: [
    "Amazonas",
    "Congo",
    "Iang-tsé",
    "Mississipí"
    ],
    c: 1,
  },
  {
    id: 785,
    cat: "geografia",
    dif: "mitjana",
    p: "Quanta és la superfície aproximada de Mongòlia?",
    o: [
    "800.000 km²",
    "1.200.000 km²",
    "1.600.000 km²",
    "2.000.000 km²"
    ],
    c: 2,
  },
  {
    id: 786,
    cat: "geografia",
    dif: "mitjana",
    p: "En quin país neix el Danubi?",
    o: [
    "Àustria",
    "Alemanya",
    "Hungria",
    "Sèrbia"
    ],
    c: 1,
  },
  {
    id: 787,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Samoa?",
    o: [
    "Suva",
    "Apia",
    "Port Moresby",
    "Honolulu"
    ],
    c: 1,
  },
  {
    id: 788,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin és el desert més gran de l'Àsia?",
    o: [
    "Kalahari",
    "Gobi",
    "Taklamakan",
    "Negev"
    ],
    c: 2,
  },
  {
    id: 789,
    cat: "geografia",
    dif: "mitjana",
    p: "Quants países componen la Unió Africana?",
    o: [
    "48",
    "52",
    "54",
    "58"
    ],
    c: 2,
  },
  {
    id: 790,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin corrent marítim fred banya la costa oest de Sud-amèrica?",
    o: [
    "Corrent del Golf",
    "Corrent de Humboldt",
    "Corrent de Kuroshio",
    "Corrent de Benguela"
    ],
    c: 1,
  },
  {
    id: 791,
    cat: "geografia",
    dif: "mitjana",
    p: "En quin país es troba el Kilimanjaro?",
    o: [
    "Kènia",
    "Tanzània",
    "Uganda",
    "Etiòpia"
    ],
    c: 1,
  },
  {
    id: 792,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de Palau?",
    o: [
    "Majuro",
    "Koror",
    "Ngerulmud",
    "Tarawa"
    ],
    c: 2,
  },
  {
    id: 793,
    cat: "geografia",
    dif: "mitjana",
    p: "Quins dos continents estan separats pel Canal de Suez?",
    o: [
    "Àfrica i Àsia",
    "Europa i Àfrica",
    "Àsia i Europa",
    "Àfrica i Amèrica"
    ],
    c: 0,
  },
  {
    id: 794,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de la comarca del Berguedà?",
    o: [
    "Manresa",
    "Berga",
    "Cardona",
    "Puigcerdà"
    ],
    c: 1,
  },
  {
    id: 795,
    cat: "geografia",
    dif: "mitjana",
    p: "Quins són els dos rius més importants que discorren per Catalunya?",
    o: [
    "El Ter i el Llobregat",
    "L'Ebre i el Ter",
    "L'Ebre i el Llobregat",
    "El Segre i el Ter"
    ],
    c: 2,
  },
  {
    id: 796,
    cat: "geografia",
    dif: "mitjana",
    p: "A quina comarca pertany la vila de Montserrat?",
    o: [
    "Bages",
    "Osona",
    "Anoia",
    "Vallès Oriental"
    ],
    c: 0,
  },
  {
    id: 797,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de la comarca de la Garrotxa?",
    o: [
    "Olot",
    "Besalú",
    "Santa Pau",
    "Castellfollit de la Roca"
    ],
    c: 0,
  },
  {
    id: 798,
    cat: "geografia",
    dif: "mitjana",
    p: "Amb quina comunitat autònoma limita Catalunya per l'oest?",
    o: [
    "Castella i Lleó",
    "Aragó",
    "La Rioja",
    "Navarra"
    ],
    c: 1,
  },
  {
    id: 799,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin és el pic més alt dels Pirineus Catalans?",
    o: [
    "Puigmal",
    "Carroi",
    "Pica d'Estats",
    "Coma Pedrosa"
    ],
    c: 2,
  },
  {
    id: 800,
    cat: "geografia",
    dif: "mitjana",
    p: "A quin lloc de Catalunya es troba el Parc Natural del Montseny?",
    o: [
    "Entre el Vallès Oriental i el Maresme",
    "Entre el Maresme i la Selva",
    "Entre la Selva i el Ripollès",
    "Entre el Bages i Osona"
    ],
    c: 0,
  },
  {
    id: 801,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de la comarca de la Cerdanya?",
    o: [
    "Ribes de Freser",
    "Puigcerdà",
    "Alp",
    "La Seu d'Urgell"
    ],
    c: 1,
  },
  {
    id: 802,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina comarca es troba a la regió del Penedès?",
    o: [
    "Alt Penedès",
    "Baix Penedès",
    "Tarragonès",
    "Baix Camp"
    ],
    c: 0,
  },
  {
    id: 803,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin és el nom del parc natural ubicat a la comarca de Osona?",
    o: [
    "Parc Natural de Montserrat",
    "Parc Natural del Montseny",
    "Parc Natural de Collserola",
    "Parc Natural de la serra de l'Obac"
    ],
    c: 1,
  },
  {
    id: 804,
    cat: "geografia",
    dif: "mitjana",
    p: "A quin país pertanya la Vall d'Aran?",
    o: [
    "França",
    "Andorra",
    "Catalunya",
    "Aragó"
    ],
    c: 2,
  },
  {
    id: 805,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la comarca més gran de Catalunya per superfície?",
    o: [
    "Alta Ribagorça",
    "Pallars Jussà",
    "Solsonès",
    "Garrotxa"
    ],
    c: 0,
  },
  {
    id: 806,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin mar banya la costa de Catalunya?",
    o: [
    "Mar Mediterrani",
    "Mar de les Balears",
    "Mar Cantàbric",
    "Mar del Nord"
    ],
    c: 0,
  },
  {
    id: 807,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de la comarca del Maresme?",
    o: [
    "Mataró",
    "Arenys de Mar",
    "Calella",
    "Vilassar de Mar"
    ],
    c: 0,
  },
  {
    id: 808,
    cat: "geografia",
    dif: "mitjana",
    p: "A quina comarca pertany la ciutat de Manresa?",
    o: [
    "Anoia",
    "Bages",
    "Osona",
    "Vallès Oriental"
    ],
    c: 1,
  },
  {
    id: 809,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina muntanya és la més alta del Montseny?",
    o: [
    "Turó de l'Home",
    "Matagalls",
    "Les Agudes",
    "Pic de la Serreta"
    ],
    c: 0,
  },
  {
    id: 810,
    cat: "geografia",
    dif: "mitjana",
    p: "Amb quin país limita Catalunya pel nord?",
    o: [
    "Itàlia",
    "França",
    "Andorra",
    "Suïssa"
    ],
    c: 1,
  },
  {
    id: 811,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de la comarca del Ripollès?",
    o: [
    "Castellfollit de la Roca",
    "Ripoll",
    "Campdevànol",
    "Sant Joan de les Abadesses"
    ],
    c: 1,
  },
  {
    id: 812,
    cat: "geografia",
    dif: "mitjana",
    p: "En quina comarca es troba la ciutat de Girona?",
    o: [
    "Selva",
    "Gironès",
    "Alt Empordà",
    "Pla de l'Estany"
    ],
    c: 1,
  },
  {
    id: 813,
    cat: "geografia",
    dif: "mitjana",
    p: "Quins són els Pirineus orientals que limiten Catalunya?",
    o: [
    "Serra del Cadi-Moixeró",
    "Serres de Besora",
    "Cadí i Moixeró",
    "Montes de Ronda"
    ],
    c: 2,
  },
  {
    id: 814,
    cat: "geografia",
    dif: "mitjana",
    p: "A quin lloc de Catalunya es troba el Parc Natural dels Aiguamolls de l'Empordà?",
    o: [
    "Baix Empordà",
    "Alt Empordà",
    "Selva",
    "Gironès"
    ],
    c: 1,
  },
  {
    id: 815,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina és la capital de la comarca del Tarragonès?",
    o: [
    "Tarragona",
    "Reus",
    "Altafulla",
    "Torredembarra"
    ],
    c: 0,
  },
  {
    id: 816,
    cat: "geografia",
    dif: "mitjana",
    p: "Quina comarca es troba entre l'Ebre i el Segre al sud-oest?",
    o: [
    "Ribera d'Ebre",
    "Baix Ebre",
    "Terra Alta",
    "Montsià"
    ],
    c: 2,
  },
  {
    id: 817,
    cat: "geografia",
    dif: "mitjana",
    p: "Quin lloc de Catalunya és la porta d'entrada als Pirineus més important?",
    o: [
    "Puigcerdà",
    "La Seu d'Urgell",
    "Andorra",
    "Salardú"
    ],
    c: 0,
  },
  {
    id: 818,
    cat: "geografia",
    dif: "mitjana",
    p: "A quina comarca pertany la vila de Solsona?",
    o: [
    "Bages",
    "Solsonès",
    "Moianès",
    "Osona"
    ],
    c: 1,
  },
  {
    id: 819,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin director va realitzar la pel·lícula «Amélie» (2001)?",
    o: [
    "Michel Gondry",
    "Jean-Pierre Jeunet",
    "Luc Besson",
    "Claude Chabrol"
    ],
    c: 1,
  },
  {
    id: 820,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin músic compon la banda sonora de la saga de películes de «Star Wars»?",
    o: [
    "Danny Elfman",
    "Hans Zimmer",
    "John Williams",
    "Ennio Morricone"
    ],
    c: 2,
  },
  {
    id: 821,
    cat: "cultura",
    dif: "mitjana",
    p: "En quina ciutat neix el moviment literari del surrealisme a principis del segle XX?",
    o: [
    "Berlín",
    "París",
    "Viena",
    "Amsterdam"
    ],
    c: 1,
  },
  {
    id: 822,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin artista va pintar la sèrie «Les Sèries Negres»?",
    o: [
    "Joan Miró",
    "Anselm Kiefer",
    "Mark Rothko",
    "Barnett Newman"
    ],
    c: 2,
  },
  {
    id: 823,
    cat: "cultura",
    dif: "mitjana",
    p: "En la gastronomia japonesa, quina tècnica culinària es caracteritza per coure aliments a temperatura molt elevada durant poc temps?",
    o: [
    "Teppanyaki",
    "Yakimono",
    "Agemono",
    "Nimono"
    ],
    c: 0,
  },
  {
    id: 824,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin joc de taula va inventar el matemàtic John von Neumann?",
    o: [
    "Estratego",
    "Escacs",
    "Teoria de jocs (no és un joc de taula real)",
    "Risk"
    ],
    c: 2,
  },
  {
    id: 825,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina sèrie de televisió americana va tenir el final més polèmic de la història segons els crítics?",
    o: [
    "The Sopranos",
    "Game of Thrones",
    "Breaking Bad",
    "The Wire"
    ],
    c: 1,
  },
  {
    id: 826,
    cat: "cultura",
    dif: "mitjana",
    p: "En quina plataforma de videojocs es va llançar originalment «The Legend of Zelda»?",
    o: [
    "Atari 2600",
    "Nintendo Entertainment System (NES)",
    "Commodore 64",
    "Sega Genesis"
    ],
    c: 1,
  },
  {
    id: 827,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin escriptor va escriure la novel·la «Cent anys de solitud»?",
    o: [
    "Jorge Luis Borges",
    "Gabriel García Márquez",
    "Mario Vargas Llosa",
    "Carlos Fuentes"
    ],
    c: 1,
  },
  {
    id: 828,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin país va nàixer el gènere musical del reggae?",
    o: [
    "Trinitat i Tobago",
    "Jamaica",
    "Barbados",
    "Granada"
    ],
    c: 1,
  },
  {
    id: 829,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina pel·lícula de ciència ficció dirigida per Denis Villeneuve es basa en l'obra de Frank Herbert?",
    o: [
    "Blade Runner 2049",
    "Arrival",
    "Dune",
    "Sicario"
    ],
    c: 2,
  },
  {
    id: 830,
    cat: "cultura",
    dif: "mitjana",
    p: "En la mitologia grega, quin és el déu del foc i la forja?",
    o: [
    "Ares",
    "Hefest",
    "Posidó",
    "Zeus"
    ],
    c: 1,
  },
  {
    id: 831,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin tipus de cuina es caracteritza per l'ús intensiu de les espècies i el cocos?",
    o: [
    "Gastronomia tailandesa",
    "Cuina tailandesa",
    "Cuina vietnamita",
    "Cuina camboixana"
    ],
    c: 0,
  },
  {
    id: 832,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin joc de cartes col·leccionables va crear Richard Garfield?",
    o: [
    "Yu-Gi-Oh!",
    "Magic: The Gathering",
    "Pokémon Trading Card Game",
    "Hearthstone"
    ],
    c: 1,
  },
  {
    id: 833,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin navegador web va ser el primer que va dominar massivament internet als anys 90?",
    o: [
    "Mozilla Firefox",
    "Internet Explorer",
    "Netscape Navigator",
    "Opera"
    ],
    c: 2,
  },
  {
    id: 834,
    cat: "cultura",
    dif: "mitjana",
    p: "En quina sèrie de Netflix apareix el personatge d'Eleven?",
    o: [
    "The Crown",
    "Stranger Things",
    "Ozark",
    "The Witcher"
    ],
    c: 1,
  },
  {
    id: 835,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin videojoc podeu construir estructures amb blocs cúbics?",
    o: [
    "Roblox",
    "Minecraft",
    "Fortnite",
    "Sims 4"
    ],
    c: 1,
  },
  {
    id: 836,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin poeta català del segle XX va escriure «Solitud»?",
    o: [
    "Josep Carner",
    "Joan Salvat-Papasseit",
    "Marià Manent",
    "Pere Quart"
    ],
    c: 3,
  },
  {
    id: 837,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin gènere musical va originar-se a Memphis, Tennessee, fusionant country i blues?",
    o: [
    "Gospel",
    "Rock and roll",
    "Soul",
    "Bluegrass"
    ],
    c: 1,
  },
  {
    id: 838,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és el museu més visitat del món segons les estadístiques recents?",
    o: [
    "Museu Britànic",
    "Museu del Louvre",
    "Museu Nacional de Xina",
    "Museu Metropolità de Nova York"
    ],
    c: 2,
  },
  {
    id: 839,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin videojoc de plataformes controles un erizo blau super ràpid?",
    o: [
    "Sonic the Hedgehog",
    "Super Mario Bros",
    "Crash Bandicoot",
    "Rayman"
    ],
    c: 0,
  },
  {
    id: 840,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin arquitecte català va dissenyar la Sagrada Família a partir de 1883?",
    o: [
    "Puig i Cadafalch",
    "Antoni Gaudí",
    "Domènech i Montaner",
    "Josep Vilaseca"
    ],
    c: 1,
  },
  {
    id: 841,
    cat: "cultura",
    dif: "mitjana",
    p: "En quina ciutat es presenta anualment el festival de cinema més prestigiós d'Europa?",
    o: [
    "Rotterdam",
    "Berlín",
    "Canes",
    "Venècia"
    ],
    c: 2,
  },
  {
    id: 842,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és el plat més famós de la cuina tailandesa que combine dolç, salat, picant i acit?",
    o: [
    "Pad See Ew",
    "Tom Yum",
    "Pad Thai",
    "Green Curry"
    ],
    c: 2,
  },
  {
    id: 843,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina obra mestra de Mercè Rodoreda va ser publicada l'any 1962?",
    o: [
    "La plaça del Diamant",
    "Mirall trencat",
    "Dins el dia",
    "El carrer de les Camèlies"
    ],
    c: 0,
  },
  {
    id: 844,
    cat: "cultura",
    dif: "mitjana",
    p: "J.V. Foix va ser reconegut especialment per quin moviment literari?",
    o: [
    "Realisme social",
    "Surrealisme",
    "Romantisme",
    "Naturalisme"
    ],
    c: 1,
  },
  {
    id: 845,
    cat: "cultura",
    dif: "mitjana",
    p: "Salvador Espriu va compondre 'La pell de brau' com a resposta a quin conflicte?",
    o: [
    "La Guerra Civil Espanyola",
    "La Guerra dels Segadors",
    "La Independència dels EUA",
    "La Revolució Francesa"
    ],
    c: 0,
  },
  {
    id: 846,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin compositor és considerat el pare de la Rumba Catalana?",
    o: [
    "Pep Ventura",
    "Enrique Granados",
    "Isaac Albéniz",
    "Joan Lamote de Grignon"
    ],
    c: 0,
  },
  {
    id: 847,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin any va néixer el moviment de la Nova Cançó a Catalunya?",
    o: [
    "1950",
    "1960",
    "1970",
    "1955"
    ],
    c: 1,
  },
  {
    id: 848,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és el títol original de la cançó que popularment coneixem com 'Els Segadors'?",
    o: [
    "Els Segadors de Catalunya",
    "La Reaper's Song",
    "Els Segadors de la Tardor",
    "Cançó dels Treballadors"
    ],
    c: 2,
  },
  {
    id: 849,
    cat: "cultura",
    dif: "mitjana",
    p: "Les Havaneres són una tradició musical llegada de quina regió americana?",
    o: [
    "Mèxic",
    "Cuba",
    "Puerto Rico",
    "República Dominicana"
    ],
    c: 1,
  },
  {
    id: 850,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin director de cinema català va dirigir 'Perfum de violeta'?",
    o: [
    "Bigas Luna",
    "Ventura Pons",
    "Agustí Villaronga",
    "Francesc Betriu"
    ],
    c: 2,
  },
  {
    id: 851,
    cat: "cultura",
    dif: "mitjana",
    p: "Com es prepara tradicional el pa amb tomàquet a Catalunya?",
    o: [
    "Tallar el tomàquet per la meitat i fer-lo xop dins el plat",
    "Ratllar el tomàquet i barrejar-lo amb oli",
    "Tallar el tomàquet a rodanxes i posar-les damunt el pa",
    "Bullir el tomàquet amb especias"
    ],
    c: 0,
  },
  {
    id: 852,
    cat: "cultura",
    dif: "mitjana",
    p: "Quins són els ingredients principals de la Crema Catalana?",
    o: [
    "Llet, ous, sucre i canella",
    "Nata, xocolata i mascarpone",
    "Crema pastelera, cacao i canyella",
    "Llet condensada, galetes i cacao"
    ],
    c: 0,
  },
  {
    id: 853,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin plat tradicional català és un breix de verdures i carn?",
    o: [
    "Escudella i carn d'olla",
    "Mongetes amb botifarra",
    "Conill amb xocolata",
    "Calsots a la brasa"
    ],
    c: 0,
  },
  {
    id: 854,
    cat: "cultura",
    dif: "mitjana",
    p: "Els cargols a l'aller són una especialitat de quina comarca catalana?",
    o: [
    "Alt Empordà",
    "Baix Ebre",
    "Urgell",
    "Conca de Barberà"
    ],
    c: 0,
  },
  {
    id: 855,
    cat: "cultura",
    dif: "mitjana",
    p: "En quin dia de l'any es commemora la Diada Nacional de Catalunya?",
    o: [
    "17 de gener",
    "23 d'abril",
    "11 de setembre",
    "15 d'agost"
    ],
    c: 2,
  },
  {
    id: 856,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la tradició dels Castellers?",
    o: [
    "Construir torres humanes",
    "Dansar en cercle",
    "Crear escultures de sorra",
    "Saltar cordes col·lectivament"
    ],
    c: 0,
  },
  {
    id: 857,
    cat: "cultura",
    dif: "mitjana",
    p: "Sant Jordi és celebrat a Catalunya pel símbol de quin obsequi tradicional?",
    o: [
    "Flors i llaços",
    "Roses i llibres",
    "Taronges i amants",
    "Flors i pans"
    ],
    c: 1,
  },
  {
    id: 858,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin és el carnaval més famós de Catalunya pel seu caràcter internacional?",
    o: [
    "Carnaval de Barcelona",
    "Carnaval de Sitges",
    "Carnaval de Tarragona",
    "Carnaval de Manresa"
    ],
    c: 1,
  },
  {
    id: 859,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la dansa nacional de Catalunya?",
    o: [
    "La Jota",
    "La Sardana",
    "El Ball de Bastons",
    "La Dansa del Foc"
    ],
    c: 1,
  },
  {
    id: 860,
    cat: "cultura",
    dif: "mitjana",
    p: "Antoni Gaudí va diseñar la Sagrada Familia per a quin arquitecte inicial?",
    o: [
    "Josep Vilaseca",
    "Domènech i Modernell",
    "Francesc de Paula del Villar",
    "Joan Martorell"
    ],
    c: 2,
  },
  {
    id: 861,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin arquitecte català va dissenyar el Palau de la Música Catalana?",
    o: [
    "Lluís Domènech i Montaner",
    "Josep Lluís Sert",
    "Puig i Cadafalch",
    "Joan Martorell"
    ],
    c: 0,
  },
  {
    id: 862,
    cat: "cultura",
    dif: "mitjana",
    p: "A quin moviment artístic català pertany l'obra de Miró?",
    o: [
    "Expressionisme",
    "Cubisme",
    "Surrealisme",
    "Fauvisme"
    ],
    c: 2,
  },
  {
    id: 863,
    cat: "cultura",
    dif: "mitjana",
    p: "Qui va pintar 'La rendició de Breda' i tenia connexions amb Catalunya?",
    o: [
    "Salvador Dalí",
    "Pablo Picasso",
    "Diego Velázquez",
    "Joan Miró"
    ],
    c: 2,
  },
  {
    id: 864,
    cat: "cultura",
    dif: "mitjana",
    p: "Quina és la tradicional beguda d'estiu que es prepara amb canyella i agua?",
    o: [
    "Horchata",
    "Llimonada",
    "Orxata de sóc",
    "Agua de canyella"
    ],
    c: 2,
  },
  {
    id: 865,
    cat: "cultura",
    dif: "mitjana",
    p: "Salvador Dalí va néixer a quin poble de Catalunya?",
    o: [
    "Cadaqués",
    "Figueres",
    "Portlligat",
    "Púbol"
    ],
    c: 1,
  },
  {
    id: 866,
    cat: "cultura",
    dif: "mitjana",
    p: "Quin llibre de Montserrat Roig va guanyar el Premi d'Honor de les Lletres Catalanes?",
    o: [
    "La veu melodiosa",
    "L'hora violeta",
    "Ramona adéu",
    "Els homenots"
    ],
    c: 3,
  },
  {
    id: 867,
    cat: "cultura",
    dif: "mitjana",
    p: "Quins són els colors de la Senyera, la bandera de Catalunya?",
    o: [
    "Groc i vermell amb una estrella",
    "Quatre barres vermelles i groc",
    "Blau i groc amb una creu",
    "Vermell i blanc amb una estrella"
    ],
    c: 1,
  },
  {
    id: 868,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants satèl·lits naturals té Mart?",
    o: [
    "1",
    "2",
    "3",
    "4"
    ],
    c: 1,
  },
  {
    id: 869,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la constel·lació més gran visible des de l'hemisferi nord?",
    o: [
    "Orió",
    "Ursa Major",
    "Hèrcules",
    "Pegàs"
    ],
    c: 2,
  },
  {
    id: 870,
    cat: "ciencies",
    dif: "mitjana",
    p: "En quin any es va realitzar el primer alunatge tripulat?",
    o: [
    "1967",
    "1969",
    "1971",
    "1965"
    ],
    c: 1,
  },
  {
    id: 871,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la temperatura aproximada de la superfície del Sol?",
    o: [
    "3.000 K",
    "5.500 K",
    "8.000 K",
    "10.000 K"
    ],
    c: 1,
  },
  {
    id: 872,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin telescopi espacial va revolucionar l'astronomia moderna el 1990?",
    o: [
    "James Webb",
    "Kepler",
    "Hubble",
    "TESS"
    ],
    c: 2,
  },
  {
    id: 873,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants dies aproximadament tarda la Lluna a orbitar la Terra?",
    o: [
    "21 dies",
    "27 dies",
    "35 dies",
    "42 dies"
    ],
    c: 1,
  },
  {
    id: 874,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la constel·lació que representa el lleó a la mitologia grega?",
    o: [
    "Lió",
    "Lleó",
    "Panthera",
    "Felis"
    ],
    c: 1,
  },
  {
    id: 875,
    cat: "ciencies",
    dif: "mitjana",
    p: "En quin planeta del Sistema Solar es troben els anells més visibles?",
    o: [
    "Júpiter",
    "Neptú",
    "Saturn",
    "Urà"
    ],
    c: 2,
  },
  {
    id: 876,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina agència espacial va ser la primera a arribar a la Lluna?",
    o: [
    "ESA",
    "NASA",
    "ROSCOSMOS",
    "CNSA"
    ],
    c: 1,
  },
  {
    id: 877,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants minuts tarda la llum del Sol a arribar a la Terra?",
    o: [
    "5 minuts",
    "8 minuts",
    "12 minuts",
    "15 minuts"
    ],
    c: 1,
  },
  {
    id: 878,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el satèl·lit més gran de Júpiter?",
    o: [
    "Europa",
    "Ganymed",
    "Ió",
    "Calisto"
    ],
    c: 1,
  },
  {
    id: 879,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la diferència principal entre un solstici i un equinocci?",
    o: [
    "La durada dels dies és igual en l'equinocci",
    "La temperatura és més alta en el solstici",
    "Els dies i les nits són iguals en l'equinocci",
    "Els solsticis ocorren dues vegades l'any"
    ],
    c: 2,
  },
  {
    id: 880,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quant de temps aproximadament tarda Plutó a orbitar el Sol?",
    o: [
    "165 anys",
    "248 anys",
    "312 anys",
    "400 anys"
    ],
    c: 1,
  },
  {
    id: 881,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina constel·lació conté l'Estrella Polar?",
    o: [
    "Cassiopeia",
    "Ursa Minor",
    "Draco",
    "Cefeu"
    ],
    c: 1,
  },
  {
    id: 882,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quins són els quatre satèl·lits galileans de Júpiter?",
    o: [
    "Titant, Encel·lad, Tèti, Japet",
    "Ganymed, Ió, Europa, Calisto",
    "Miranda, Ariel, Umbriel, Titania",
    "Fobos, Deimos, Ganimedes, Ío"
    ],
    c: 1,
  },
  {
    id: 883,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la distància mitjana entre la Terra i el Sol?",
    o: [
    "50 milions de km",
    "100 milions de km",
    "150 milions de km",
    "200 milions de km"
    ],
    c: 2,
  },
  {
    id: 884,
    cat: "ciencies",
    dif: "mitjana",
    p: "En quin any va ser descobert el planeta Neptú?",
    o: [
    "1781",
    "1846",
    "1930",
    "1950"
    ],
    c: 1,
  },
  {
    id: 885,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la galàxia més propera a la Via Làctia?",
    o: [
    "Galàxia del Triàngul",
    "Andròmeda",
    "Sombrero",
    "Remolí"
    ],
    c: 1,
  },
  {
    id: 886,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants graus d'inclinació té l'eix de rotació de la Terra?",
    o: [
    "13,5 graus",
    "23,5 graus",
    "33,5 graus",
    "43,5 graus"
    ],
    c: 1,
  },
  {
    id: 887,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina estrella és la més brillant visible des de la Terra?",
    o: [
    "Sírius",
    "Alfa Centauri",
    "Betelgeuse",
    "Rigel"
    ],
    c: 0,
  },
  {
    id: 888,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants dies dura aproximadament una rotació de Venus?",
    o: [
    "80 dies",
    "120 dies",
    "243 dies",
    "365 dies"
    ],
    c: 2,
  },
  {
    id: 889,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el satèl·lit més gran del Sistema Solar?",
    o: [
    "Titant",
    "Europa",
    "Ganymed",
    "Encel·lad"
    ],
    c: 2,
  },
  {
    id: 890,
    cat: "ciencies",
    dif: "mitjana",
    p: "En quin any es va llançar el satèl·lit artificial Sputnik 1?",
    o: [
    "1955",
    "1957",
    "1959",
    "1961"
    ],
    c: 1,
  },
  {
    id: 891,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina característica principal defineix un forat negre?",
    o: [
    "Té una temperatura molt baixa",
    "La seva gravetat és tan forta que ni la llum pot escapar",
    "Emet radiació de microones",
    "Està format per matèria fosca"
    ],
    c: 1,
  },
  {
    id: 892,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants planetes del Sistema Solar són rochosos o terrestres?",
    o: [
    "3",
    "4",
    "5",
    "6"
    ],
    c: 1,
  },
  {
    id: 893,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la temperatura aproximada del nucli del Sol?",
    o: [
    "15 milions de graus Celsius",
    "1,5 milions de graus Celsius",
    "150 milions de graus Celsius",
    "1.500 graus Celsius"
    ],
    c: 0,
  },
  {
    id: 894,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el nom del primer rover que va arribar a Mart?",
    o: [
    "Curiosity",
    "Opportunity",
    "Sojourner",
    "Perseverance"
    ],
    c: 2,
  },
  {
    id: 895,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina distància aproximada hi ha entre la Terra i el Sol, mesurada en unitats astronòmiques?",
    o: [
    "0,5 UA",
    "1 UA",
    "1,5 UA",
    "2 UA"
    ],
    c: 1,
  },
  {
    id: 896,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin tipus de radiació és la que més emet una nana blanca?",
    o: [
    "Radiació infrarroja",
    "Radiació ultraviolada",
    "Radiació gamma",
    "Ones de ràdio"
    ],
    c: 1,
  },
  {
    id: 897,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants anys llum aproximats té de diàmetre la Via Làctia?",
    o: [
    "10.000",
    "50.000",
    "100.000",
    "1.000.000"
    ],
    c: 2,
  },
  {
    id: 898,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el nom de la teoria que explica l'origen de l'Univers a partir d'una explosió inicial?",
    o: [
    "Big Crunch",
    "Big Bang",
    "Big Bounce",
    "Big Freeze"
    ],
    c: 1,
  },
  {
    id: 899,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la característica principal d'un púlsar?",
    o: [
    "Emetrà llum visible contínuament",
    "Emetrà impulsos de radiació electromagnètica de forma periòdica",
    "Absorbirà tota la llum que rep",
    "Canviarà de color constantment"
    ],
    c: 1,
  },
  {
    id: 900,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin planeta del sistema solar té els anells més visibles i espectaculars?",
    o: [
    "Júpiter",
    "Urà",
    "Neptú",
    "Saturn"
    ],
    c: 3,
  },
  {
    id: 901,
    cat: "ciencies",
    dif: "mitjana",
    p: "Què és la matèria fosca segons la cosmologia actual?",
    o: [
    "Una forma de matèria que no emet ni reflecteix llum però té gravetat",
    "Una teoria descartada completament pels astrònom",
    "El carbó que es forma a l'interior de les estrelles",
    "Un mite sense base científica"
    ],
    c: 0,
  },
  {
    id: 902,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és l'estrella més propera al Sol?",
    o: [
    "Sírius",
    "Próxima Centauri",
    "Alfa Centauri A",
    "Betelgeuse"
    ],
    c: 1,
  },
  {
    id: 903,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants exoplanetes aproximadament s'han descobert fins a 2024?",
    o: [
    "Menys de 1.000",
    "Entre 1.000 i 3.000",
    "Entre 5.000 i 6.000",
    "Més de 10.000"
    ],
    c: 2,
  },
  {
    id: 904,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin científic va predir les ones gravitacionals?",
    o: [
    "Isaac Newton",
    "Albert Einstein",
    "Stephen Hawking",
    "Edwin Hubble"
    ],
    c: 1,
  },
  {
    id: 905,
    cat: "ciencies",
    dif: "mitjana",
    p: "A quina velocitat es propaga la llum en el buit?",
    o: [
    "300.000 km/s",
    "30.000 km/s",
    "3.000.000 km/s",
    "150.000 km/s"
    ],
    c: 0,
  },
  {
    id: 906,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la massa més gran que pot tenir una nana blanca segons el límit de Chandrasekhar?",
    o: [
    "0,5 masses solars",
    "1,4 masses solars",
    "3 masses solars",
    "10 masses solars"
    ],
    c: 1,
  },
  {
    id: 907,
    cat: "ciencies",
    dif: "mitjana",
    p: "En quina constel·lació es troba la Nebulosa d'Orió?",
    o: [
    "Lira",
    "Orió",
    "Centaure",
    "Cisne"
    ],
    c: 1,
  },
  {
    id: 908,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants planetes hi ha en el sistema solar actual?",
    o: [
    "7",
    "8",
    "9",
    "10"
    ],
    c: 1,
  },
  {
    id: 909,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el planeta més dens del sistema solar?",
    o: [
    "Mercuri",
    "Venus",
    "Terra",
    "Mart"
    ],
    c: 2,
  },
  {
    id: 910,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina missió de la NASA va ser la primera a arribar a la Lluna amb humans?",
    o: [
    "Apollo 10",
    "Apollo 11",
    "Skylab",
    "Gemini 12"
    ],
    c: 1,
  },
  {
    id: 911,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quantes hores tarda la llum del Sol a arribar a la Terra?",
    o: [
    "1 hora",
    "8 minuts",
    "1 dia",
    "30 minuts"
    ],
    c: 1,
  },
  {
    id: 912,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin tipus de nebulosa és la Nebulosa del Cranc?",
    o: [
    "Nebulosa de reflexió",
    "Nebulosa d'emissió",
    "Nebulosa de pols",
    "Supernova remnant"
    ],
    c: 3,
  },
  {
    id: 913,
    cat: "ciencies",
    dif: "mitjana",
    p: "A quants milions de quilòmetres està Venus del Sol?",
    o: [
    "58",
    "108",
    "150",
    "228"
    ],
    c: 1,
  },
  {
    id: 914,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la teoria que explica la formació de l'Univers a partir de la inflació còsmica?",
    o: [
    "Teoria de la Inflació Còsmica d'Alan Guth",
    "Teoria de les Cordes",
    "Teoria del Univers Estacionari",
    "Teoria Geocèntrica"
    ],
    c: 0,
  },
  {
    id: 915,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin gas forma principalment l'atmosfera de Júpiter?",
    o: [
    "Oxigen",
    "Nitrogen",
    "Hidrogen",
    "Diòxid de carboni"
    ],
    c: 2,
  },
  {
    id: 916,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el diàmetre aproximat del Sol comparant-lo amb la Terra?",
    o: [
    "10 vegades més gran",
    "100 vegades més gran",
    "1.000 vegades més gran",
    "50 vegades més gran"
    ],
    c: 0,
  },
  {
    id: 917,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el principal component de la membrana cel·lular?",
    o: [
    "Proteïnes pures",
    "Bicarpa lipídica amb proteïnes",
    "Colesterol exclusivament",
    "Polisacàrids"
    ],
    c: 1,
  },
  {
    id: 918,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants cromosomes té una cèl·lula humana somàtica normal?",
    o: [
    "23",
    "46",
    "92",
    "48"
    ],
    c: 1,
  },
  {
    id: 919,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin científic va proposar la teoria de l'evolució per selecció natural?",
    o: [
    "Jean-Baptiste Lamarck",
    "Charles Darwin",
    "Gregor Mendel",
    "Alfred Wallace"
    ],
    c: 1,
  },
  {
    id: 920,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el gas que respiren la majoria d'organismes per obtenir energia?",
    o: [
    "Nitrogen",
    "Oxigen",
    "Diòxid de carboni",
    "Argó"
    ],
    c: 1,
  },
  {
    id: 921,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quines són les unitats bàsiques de la vida?",
    o: [
    "Els teixits",
    "Les molècules",
    "Les cèl·lules",
    "Els àtoms"
    ],
    c: 2,
  },
  {
    id: 922,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin element químic és essencial per a la formació de proteïnes?",
    o: [
    "Hidrogen",
    "Nitrogen",
    "Carboni",
    "Sofre"
    ],
    c: 1,
  },
  {
    id: 923,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la unitat de mesura de la força en el Sistema Internacional?",
    o: [
    "Pascal",
    "Newton",
    "Joule",
    "Watt"
    ],
    c: 1,
  },
  {
    id: 924,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin procés biològic converteix la llum en energia química?",
    o: [
    "Respiració cel·lular",
    "Fermentació",
    "Fotosíntesi",
    "Glucòlisi"
    ],
    c: 2,
  },
  {
    id: 925,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el principal òrgan responsable de filtrar la sang i produir orina?",
    o: [
    "Estómac",
    "Fetge",
    "Ronyó",
    "Páncrees"
    ],
    c: 2,
  },
  {
    id: 926,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la velocitat aproximada de la llum en el buit?",
    o: [
    "300.000 km/h",
    "300.000 m/s",
    "3.000.000 m/s",
    "30.000 km/s"
    ],
    c: 1,
  },
  {
    id: 927,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin tipus de radiació és la més penetrant: alfa, beta o gamma?",
    o: [
    "Radiació alfa",
    "Radiació beta",
    "Radiació gamma",
    "Totes són igual de penetrants"
    ],
    c: 2,
  },
  {
    id: 928,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quant vale el número d'Avogadro aproximadament?",
    o: [
    "6,022 × 10²³",
    "6,022 × 10¹⁵",
    "6,022 × 10¹⁰",
    "6,022 × 10³⁰"
    ],
    c: 0,
  },
  {
    id: 929,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin procés es produeix quan un sòlid passa directament a gas sense passar per estat líquid?",
    o: [
    "Sublimació",
    "Evaporació",
    "Condensació",
    "Fusió"
    ],
    c: 0,
  },
  {
    id: 930,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el nucli de l'economia energètica dels ecosistemes?",
    o: [
    "Els descomposedors",
    "Els productors (plantes)",
    "Els consumidors carnívors",
    "Els consumidors omnívors"
    ],
    c: 1,
  },
  {
    id: 931,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quins són els productes principals de la fotosíntesi?",
    o: [
    "Glucosa i nitrogen",
    "Glucosa i oxigen",
    "Dòxid de carboni i aigua",
    "Amoníac i llum"
    ],
    c: 1,
  },
  {
    id: 932,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin tipus de mutació és més probable que tingui efectes significatius?",
    o: [
    "Una mutació silenciosa",
    "Una mutació que canvia un codó",
    "Una deleció de mil nuclis",
    "Una mutació en una seqüència no codificant"
    ],
    c: 2,
  },
  {
    id: 933,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és l'òrgan responsable de regular la temperatura corporal entre altres funcions?",
    o: [
    "El fetge",
    "La pell",
    "L'hipòtàlem",
    "El timъ"
    ],
    c: 2,
  },
  {
    id: 934,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina llei de la termodinàmica afirma que l'entropia de l'univers sempre augmenta?",
    o: [
    "Primera llei",
    "Segona llei",
    "Tercera llei",
    "Llei zero"
    ],
    c: 1,
  },
  {
    id: 935,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el període de semidesintegració aproximat del Carboni-14?",
    o: [
    "570 anys",
    "5.700 anys",
    "57.000 anys",
    "570.000 anys"
    ],
    c: 1,
  },
  {
    id: 936,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina estructura cel·lular és responsable de la producció d'energia en forma d'ATP?",
    o: [
    "El ribosoma",
    "La mitocondria",
    "El reticle endoplasmàtic",
    "L'aparell de Golgi"
    ],
    c: 1,
  },
  {
    id: 937,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el base nitrogenat que només es troba en l'ARN i no en l'ADN?",
    o: [
    "Adenina",
    "Timina",
    "Uracil",
    "Citosina"
    ],
    c: 2,
  },
  {
    id: 938,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quines són les dues cadenes de l'ADN en relació a la seva direcció?",
    o: [
    "Paral·leles",
    "Antiparal·leles",
    "Perpendiculars",
    "Concèntriques"
    ],
    c: 1,
  },
  {
    id: 939,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin tipus d'ona té la longitud d'ona més curta?",
    o: [
    "Ones de ràdio",
    "Llum visible",
    "Raigs X",
    "Microones"
    ],
    c: 2,
  },
  {
    id: 940,
    cat: "ciencies",
    dif: "mitjana",
    p: "En quin orgànul cel·lular es sintetitzen les proteïnes?",
    o: [
    "Nucli",
    "Ribosoma",
    "Centríol",
    "Vesícula"
    ],
    c: 1,
  },
  {
    id: 941,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la principal funció del sistem limfàtic?",
    o: [
    "Bombejar sang al cos",
    "Digerir els aliments",
    "Drenar el líquid intersticial i defensar-se contra infeccions",
    "Absorbir nutrients"
    ],
    c: 2,
  },
  {
    id: 942,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el protocol de comunicació que utilitza Internet per a la transmissió de dades?",
    o: [
    "TCP/IP",
    "USB 3.0",
    "Bluetooth",
    "HDMI"
    ],
    c: 0,
  },
  {
    id: 943,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina malaltia es caracteritza per una inflamació dels bronquis que causa tos persistent?",
    o: [
    "Pneumònia",
    "Bronquitis",
    "Asma",
    "Tuberculosi"
    ],
    c: 1,
  },
  {
    id: 944,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin sistema operatiu va desenvolupar Linus Torvalds?",
    o: [
    "Windows",
    "macOS",
    "Linux",
    "iOS"
    ],
    c: 2,
  },
  {
    id: 945,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quins són els organismes més abundants del nostre planeta?",
    o: [
    "Insectes",
    "Bacteris",
    "Peixos",
    "Aus"
    ],
    c: 1,
  },
  {
    id: 946,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la velocitat màxima teòrica d'Internet per mitjà de fibra òptica?",
    o: [
    "100 Mbps",
    "1 Gbps",
    "10 Gbps o més",
    "50 Mbps"
    ],
    c: 2,
  },
  {
    id: 947,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina planta és coneguda pel seu poder antiinflamatori i s'utilitza sovint en infusions?",
    o: [
    "Menta",
    "Camamilla",
    "Ortiga",
    "Salsa"
    ],
    c: 1,
  },
  {
    id: 948,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants cromosomes té un ésser humà?",
    o: [
    "23",
    "46",
    "48",
    "50"
    ],
    c: 1,
  },
  {
    id: 949,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin gas és responsable principalment de l'efecte hivernacle?",
    o: [
    "Oxigen",
    "Diòxid de carboni",
    "Nitrogen",
    "Heli"
    ],
    c: 1,
  },
  {
    id: 950,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin animal és conegut per ser el més ràpid en terra ferma?",
    o: [
    "Lleó",
    "Guepard",
    "Antílop",
    "Cavall"
    ],
    c: 1,
  },
  {
    id: 951,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el tipus de memòria de l'ordinador que és més ràpida?",
    o: [
    "RAM",
    "Disc dur",
    "SSD",
    "Memòria cache"
    ],
    c: 3,
  },
  {
    id: 952,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina malaltia causa una deficiència en la producció de melanina a la pell?",
    o: [
    "Vitíligo",
    "Psoriasi",
    "Dermatitis",
    "Eczema"
    ],
    c: 0,
  },
  {
    id: 953,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants ossos té aproximadament un adult humà?",
    o: [
    "186",
    "206",
    "226",
    "246"
    ],
    c: 1,
  },
  {
    id: 954,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el sòl més fèrtil per a l'agricultura?",
    o: [
    "Sòl arenós",
    "Sòl arcillòs",
    "Sòl loamós",
    "Sòl calcari"
    ],
    c: 2,
  },
  {
    id: 955,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la capa de l'atmosfera més propera a la Terra?",
    o: [
    "Estratosfera",
    "Troposfera",
    "Mesosfera",
    "Termosfera"
    ],
    c: 1,
  },
  {
    id: 956,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és l'antivirus més conocut a nivell mundial?",
    o: [
    "Norton",
    "McAfee",
    "Kaspersky",
    "Avast"
    ],
    c: 3,
  },
  {
    id: 957,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina planta carnívora és més comuna a l'Europa mediterrània?",
    o: [
    "Venus atrapamosques",
    "Drosera",
    "Sarracènia",
    "Nepenths"
    ],
    c: 1,
  },
  {
    id: 958,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la principal causa del canvi climàtic segons la comunitat científica?",
    o: [
    "Activitat solar",
    "Emissions de gasos d'efecte hivernacle",
    "Activitat volcànica",
    "Cicles naturals"
    ],
    c: 1,
  },
  {
    id: 959,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quants bits té un byte?",
    o: [
    "4 bits",
    "8 bits",
    "16 bits",
    "32 bits"
    ],
    c: 1,
  },
  {
    id: 960,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina malaltia causa la mancança de factor de coagulació al sang?",
    o: [
    "Diabetis",
    "Hemofília",
    "Anèmia",
    "Leucèmia"
    ],
    c: 1,
  },
  {
    id: 961,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin animal és el més intelligent del reino animal después dels primates?",
    o: [
    "Dofí",
    "Elefant",
    "Corb",
    "Gat"
    ],
    c: 1,
  },
  {
    id: 962,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la temperatura de fusió del gel?",
    o: [
    "0 K",
    "0 °C",
    "-40 °C",
    "100 °C"
    ],
    c: 1,
  },
  {
    id: 963,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quina és la principal funció dels cloroplasts a les cèl·lules vegetals?",
    o: [
    "Fotosíntesi",
    "Respiració",
    "Reproducció",
    "Emmagatzemament"
    ],
    c: 0,
  },
  {
    id: 964,
    cat: "ciencies",
    dif: "mitjana",
    p: "Quin és el format de compressió d'imatges més comú a Internet?",
    o: [
    "TIFF",
    "BMP",
    "JPEG",
    "GIF"
    ],
    c: 2,
  },
  {
    id: 965,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any es va produir la Batalla de l'Ebro, esdeveniment crucial de la Guerra Civil a Catalunya?",
    o: [
    "1936",
    "1937",
    "1938",
    "1939"
    ],
    c: 2,
  },
  {
    id: 966,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el primer Comtat de Barcelona independent i fundador de la dinastia comtal?",
    o: [
    "Guifré el Pelós",
    "Borrell II",
    "Ramon Berenguer I",
    "Wifred II"
    ],
    c: 0,
  },
  {
    id: 967,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any es va proclamar la República Catalana i qui en fou el president?",
    o: [
    "1931 amb Francesc Macià",
    "1932 amb Lluís Companys",
    "1930 amb Josep Tarradellas",
    "1933 amb Niceto Alcalá-Zamora"
    ],
    c: 0,
  },
  {
    id: 968,
    cat: "historia",
    dif: "mitjana",
    p: "Quin monarca de la Corona d'Aragó va expandir més el territori mediterrani amb la conquesta de Sicília?",
    o: [
    "Pere III el Cerimoniós",
    "Pere II el Gran",
    "Jaume II el Just",
    "Ramon Berenguer IV"
    ],
    c: 1,
  },
  {
    id: 969,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el tractadista i almirall que va defensar els interessos de la Corona d'Aragó en les guerres medievals?",
    o: [
    "Roger de Llúria",
    "Jaume Vicens Vives",
    "Francesc de Paula Eiximenis",
    "Bernat de Cabrera"
    ],
    c: 0,
  },
  {
    id: 970,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any es va signar la Pau de París que va posar fi a la Guerra de Successió?",
    o: [
    "1711",
    "1713",
    "1714",
    "1715"
    ],
    c: 1,
  },
  {
    id: 971,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou l'últim dia de la resistència de Barcelona durant la Guerra de Successió, recordat com a diada nacional?",
    o: [
    "10 de setembre de 1713",
    "11 de setembre de 1714",
    "12 de setembre de 1714",
    "15 de setembre de 1713"
    ],
    c: 1,
  },
  {
    id: 972,
    cat: "historia",
    dif: "mitjana",
    p: "Qui fou el president de la Generalitat que va decidir no acceptar les condicions de rendició el 1714?",
    o: [
    "Pau Claris",
    "Antoni de Viladomat",
    "Rafael Casanova",
    "Josep de Moixó"
    ],
    c: 2,
  },
  {
    id: 973,
    cat: "historia",
    dif: "mitjana",
    p: "Quin moviment cultural del segle XIX buscava la recuperació de la identitat i llengua catalanes?",
    o: [
    "Modernisme",
    "Renaixença",
    "Noucentisme",
    "Generació de l'98"
    ],
    c: 1,
  },
  {
    id: 974,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el principale poeta de la Renaixença catalana que va escriure 'La Pàtria'?",
    o: [
    "Jacint Verdaguer",
    "Bonaventura Carles Aribau",
    "Àngel Guimerà",
    "Salvador Espriu"
    ],
    c: 1,
  },
  {
    id: 975,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any es va crear la Mancomunitat de Catalunya com a primera administració autonòmica?",
    o: [
    "1906",
    "1914",
    "1920",
    "1932"
    ],
    c: 1,
  },
  {
    id: 976,
    cat: "historia",
    dif: "mitjana",
    p: "Qui fou el primer president de la Mancomunitat de Catalunya?",
    o: [
    "Francesc Cambó",
    "Enric Prat de la Riba",
    "Salvador Allendesalazar",
    "Josep Puig i Cadafalch"
    ],
    c: 1,
  },
  {
    id: 977,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou l'any de la primera proclamació de la República Catalana per Macià?",
    o: [
    "1931",
    "1930",
    "1932",
    "1933"
    ],
    c: 0,
  },
  {
    id: 978,
    cat: "historia",
    dif: "mitjana",
    p: "Qui va ser el darrer president de la Generalitat en el període republicà, executat pel franquisme?",
    o: [
    "Lluís Companys",
    "Francesc Macià",
    "Josep Tarradellas",
    "Carme Fiol"
    ],
    c: 0,
  },
  {
    id: 979,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any es va promulgar l'Estatut de Nüremberg que limitava els drets dels jueus? (Fora de context català, pregunta de control)",
    o: [
    "1935",
    "1936",
    "1937",
    "1938"
    ],
    c: 0,
  },
  {
    id: 980,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou l'Estatut d'Autonomia aprovat el 1979 a Catalunya després de la Transició?",
    o: [
    "Estatut de 1932",
    "Estatut de 1979",
    "Estatut de 2006",
    "Estatut de 2017"
    ],
    c: 1,
  },
  {
    id: 981,
    cat: "historia",
    dif: "mitjana",
    p: "Qui fou el mítico politicien franquista que va prohibir la llengua i cultura catalanes més durament?",
    o: [
    "Luis Carrero Blanco",
    "Francisco Franco",
    "Salvador Dalí",
    "Juan Carlos I"
    ],
    c: 1,
  },
  {
    id: 982,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el protagonista de la Transició democràtica que va restaurar la Generalitat el 1977?",
    o: [
    "Josep Tarradellas",
    "Jordi Pujol",
    "Pasqual Maragall",
    "Artur Mas"
    ],
    c: 0,
  },
  {
    id: 983,
    cat: "historia",
    dif: "mitjana",
    p: "Quin era el líder de la Generalitat que va pronunciar la famosa frase 'Ja soc aquí' en retornar de l'exili?",
    o: [
    "Josep Tarradellas",
    "Lluís Companys",
    "Francesc Macià",
    "Carles Pujol"
    ],
    c: 0,
  },
  {
    id: 984,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va morir Lluís Companys, executat al Castell de Montjuïc?",
    o: [
    "1939",
    "1940",
    "1941",
    "1942"
    ],
    c: 2,
  },
  {
    id: 985,
    cat: "historia",
    dif: "mitjana",
    p: "Quin monarca medieval de la Corona d'Aragó és conegut com a 'El Conquistador' per la seva expansió?",
    o: [
    "Jaume II el Just",
    "Jaume I el Conquistador",
    "Pere III el Cerimoniós",
    "Alfons el Magnànim"
    ],
    c: 1,
  },
  {
    id: 986,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou l'any de l'aprovació del primer Estatut d'Autonomia de Catalunya?",
    o: [
    "1932",
    "1979",
    "2006",
    "1978"
    ],
    c: 0,
  },
  {
    id: 987,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el personatge que va liderar la insurrecció de 1640 contra Felip IV, iniciada per Pau Claris?",
    o: [
    "Pau Claris",
    "Josep de Moixó",
    "Ramon Rull",
    "Joan Josep Prim"
    ],
    c: 0,
  },
  {
    id: 988,
    cat: "historia",
    dif: "mitjana",
    p: "Quants anys va durar aproximadament la repressió més dura durant el franquisme a Catalunya (1939-1950)?",
    o: [
    "5 anys",
    "10 anys",
    "15 anys",
    "20 anys"
    ],
    c: 1,
  },
  {
    id: 989,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el polític català que va presidir la Generalitat durant la major part dels anys 80 i 90?",
    o: [
    "Jordi Pujol",
    "Pasqual Maragall",
    "Artur Mas",
    "Josep Antoni Duran i Lleida"
    ],
    c: 0,
  },
  {
    id: 990,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el jaciment arqueològic més important de la Costa Brava en el període grec arcaic?",
    o: [
    "Empúries",
    "Ullastret",
    "Roses",
    "Cadaqués"
    ],
    c: 1,
  },
  {
    id: 991,
    cat: "historia",
    dif: "mitjana",
    p: "En quin segle es va establir la colònia grega d'Empúries?",
    o: [
    "Segle VIII aC",
    "Segle VI aC",
    "Segle IV aC",
    "Segle II aC"
    ],
    c: 1,
  },
  {
    id: 992,
    cat: "historia",
    dif: "mitjana",
    p: "Qui fou el fundador legendari de la Generalitat de Catalunya?",
    o: [
    "Pere el Gran",
    "Jaume I",
    "Pere III",
    "Ferran I"
    ],
    c: 2,
  },
  {
    id: 993,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any es van celebrar les primeres Corts Catalanes?",
    o: [
    "1162",
    "1218",
    "1284",
    "1359"
    ],
    c: 1,
  },
  {
    id: 994,
    cat: "historia",
    dif: "mitjana",
    p: "Quin era el principal òrgan de govern de la ciutat de Barcelona durant la Baixa Edat Mitjana?",
    o: [
    "Consell de Cent",
    "Paeria",
    "Veguer",
    "Batle"
    ],
    c: 0,
  },
  {
    id: 995,
    cat: "historia",
    dif: "mitjana",
    p: "Ramon Llull és especialment conegut per haver escrit en quin llenguatge, innovador per a l'època?",
    o: [
    "Llatí escolàstic",
    "Català vulgar",
    "Occità provençal",
    "Francés antic"
    ],
    c: 1,
  },
  {
    id: 996,
    cat: "historia",
    dif: "mitjana",
    p: "En quina obra Ramon Llull va desenvolupar el seu famós sistema filosòfic?",
    o: [
    "Blanquerna",
    "Art Magna",
    "Libre de Contemplació",
    "Disputació de l'Ase"
    ],
    c: 1,
  },
  {
    id: 997,
    cat: "historia",
    dif: "mitjana",
    p: "Qui fou l'autor de 'Tirant lo Blanc'?",
    o: [
    "Joanot Martorell",
    "Ausiàs March",
    "Pere Torroella",
    "Joan Roig de Corella"
    ],
    c: 0,
  },
  {
    id: 998,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any es va publicar 'Tirant lo Blanc'?",
    o: [
    "1460",
    "1490",
    "1510",
    "1540"
    ],
    c: 1,
  },
  {
    id: 999,
    cat: "historia",
    dif: "mitjana",
    p: "Ausiàs March va ser un dels primers poetes en qual gènere poètic català?",
    o: [
    "Decasílabs narratius",
    "Vers de 8 síl·labes",
    "Vers de 12 síl·labes i metro italià",
    "Octaves reials"
    ],
    c: 2,
  },
  {
    id: 1000,
    cat: "historia",
    dif: "mitjana",
    p: "Quina fou la principal característica econòmica de Catalunya durant els segles XV-XVI?",
    o: [
    "Decadència comercial i industrial",
    "Desenvolupament de la manufactura tèxtil",
    "Creixement agrícola sense transformació urbana",
    "Apogeu del comerç amb Llevant"
    ],
    c: 1,
  },
  {
    id: 1001,
    cat: "historia",
    dif: "mitjana",
    p: "En quin segle es va iniciar la industrialització catalana amb força?",
    o: [
    "Segle XVI",
    "Segle XVII",
    "Segle XVIII",
    "Segle XIX"
    ],
    c: 3,
  },
  {
    id: 1002,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el principal motor industrial de Catalunya al segle XIX?",
    o: [
    "La indústria siderúrgica",
    "La indústria tèxtil",
    "La indústria de la ceràmica",
    "La indústria de la tinta"
    ],
    c: 1,
  },
  {
    id: 1003,
    cat: "historia",
    dif: "mitjana",
    p: "Barcelona va ser declarada capital amb privilegi comercial exclusiu per quin monarca?",
    o: [
    "Jaume I",
    "Pere el Gran",
    "Ferran el Catòlic",
    "Carles III"
    ],
    c: 0,
  },
  {
    id: 1004,
    cat: "historia",
    dif: "mitjana",
    p: "A quin arqueòleg es deu l'excavació més sistemàtica d'Ullastret?",
    o: [
    "Marcelino Sanz de Sautuola",
    "Josep de C. Serra Ràfols",
    "Pere Bosch Gimpera",
    "Miquel Tarradell"
    ],
    c: 2,
  },
  {
    id: 1005,
    cat: "historia",
    dif: "mitjana",
    p: "Quina era la principal funció econòmica de les ciutats ibèriques com Ullastret?",
    o: [
    "Centre militar defensiu",
    "Port de comerç i distribució de productes",
    "Manufactura de ceràmica només",
    "Capital religiosa ibèrica"
    ],
    c: 1,
  },
  {
    id: 1006,
    cat: "historia",
    dif: "mitjana",
    p: "Quins grecs van fundar la colònia d'Empúries?",
    o: [
    "Corintis",
    "Foceus de la Jònia",
    "Atenencs",
    "Siracusans"
    ],
    c: 1,
  },
  {
    id: 1007,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el rol principal del Consell de Cent a Barcelona?",
    o: [
    "Judici penal final",
    "Govern municipal i administració local",
    "Recaptació exclusiva d'impostos reials",
    "Comandament militar únic"
    ],
    c: 1,
  },
  {
    id: 1008,
    cat: "historia",
    dif: "mitjana",
    p: "En quin monument arquitectònic es reunien les Corts Catalanes durant l'Edat Mitjana?",
    o: [
    "Catedral de Barcelona",
    "Saló del Tinell",
    "Monestir de Montserrat",
    "Castell de Montjuïc"
    ],
    c: 1,
  },
  {
    id: 1009,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el tema principal de la novel·la 'Blanquerna' de Ramon Llull?",
    o: [
    "La vida contemplativa i la recerca espiritual",
    "Les aventures de cavalleria",
    "El viatge pels quatre continents",
    "La disputa teològica entre savis"
    ],
    c: 0,
  },
  {
    id: 1010,
    cat: "historia",
    dif: "mitjana",
    p: "Quina fou la principal característica del moviment modernista arquitectònic a Catalunya?",
    o: [
    "Imitació de l'estil neogòtic medieval",
    "Integració de l'art, la natura i les noves tècniques industrials",
    "Severitat de línies rígides i clàssiques",
    "Recerca de la simplicitat funcional"
    ],
    c: 1,
  },
  {
    id: 1011,
    cat: "historia",
    dif: "mitjana",
    p: "Quin arquitecte modernista fou responsable de la Casa Batlló?",
    o: [
    "Josep Puig i Cadafalch",
    "Domènech i Montaner",
    "Antoni Gaudí",
    "Josep Maria Jujol"
    ],
    c: 2,
  },
  {
    id: 1012,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any es va proclamar l'estatut d'autonomia de Catalunya més antic?",
    o: [
    "1932",
    "1979",
    "1877",
    "1919"
    ],
    c: 0,
  },
  {
    id: 1013,
    cat: "historia",
    dif: "mitjana",
    p: "Quins gremis eren especialment influents al Consell de Cent de Barcelona?",
    o: [
    "Només els comerciants de llet",
    "Els corsaris i navegants exclusivament",
    "Els oficis artesanals i les corporacions mercantils",
    "Només els fabricants de vi"
    ],
    c: 2,
  },
  {
    id: 1014,
    cat: "historia",
    dif: "mitjana",
    p: "Quin faraó egipci va ordenar la construcció de la Gran Piràmide de Giza?",
    o: [
    "Menkaure",
    "Kheops",
    "Khafre",
    "Pepi II"
    ],
    c: 1,
  },
  {
    id: 1015,
    cat: "historia",
    dif: "mitjana",
    p: "Quina era la principal ciutat-estat rival d'Atenes durant la Grècia clàssica?",
    o: [
    "Tebas",
    "Corint",
    "Esparta",
    "Rodes"
    ],
    c: 2,
  },
  {
    id: 1016,
    cat: "historia",
    dif: "mitjana",
    p: "Quin emperador romà va dividir l'Imperi en dos parts (Orient i Occident)?",
    o: [
    "Diocletià",
    "Constantí",
    "Teodosi",
    "Marc Aureli"
    ],
    c: 0,
  },
  {
    id: 1017,
    cat: "historia",
    dif: "mitjana",
    p: "A quin riu es trobava la civilització de Mesopotàmia?",
    o: [
    "Nil",
    "Tigris i Èufrates",
    "Indus",
    "Hoang Ho"
    ],
    c: 1,
  },
  {
    id: 1018,
    cat: "historia",
    dif: "mitjana",
    p: "Quants anys va durar aproximadament l'Edat Mitjana europea?",
    o: [
    "Uns 500 anys",
    "Uns 1000 anys",
    "Uns 300 anys",
    "Uns 1500 anys"
    ],
    c: 1,
  },
  {
    id: 1019,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el primer emperador romà?",
    o: [
    "Juli Cèsar",
    "Octavi August",
    "Pompeu",
    "Marc Antoni"
    ],
    c: 1,
  },
  {
    id: 1020,
    cat: "historia",
    dif: "mitjana",
    p: "En quina batalla va derrotar Alejandre Magne al rei persa Darió III?",
    o: [
    "Maratró",
    "Gaugamela",
    "Issos",
    "Platea"
    ],
    c: 1,
  },
  {
    id: 1021,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el fundador de l'Islam?",
    o: [
    "Ali ibn Abi Talib",
    "Muhàmmad",
    "Abu Bakr",
    "Fàtima"
    ],
    c: 1,
  },
  {
    id: 1022,
    cat: "historia",
    dif: "mitjana",
    p: "A quina dinastia pertanyia Carlemany?",
    o: [
    "Visigoda",
    "Merovíngia",
    "Carolíngia",
    "Otònida"
    ],
    c: 2,
  },
  {
    id: 1023,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el primer califa de l'Islam?",
    o: [
    "Muhàmmad",
    "Abu Bakr",
    "Úmar ibn al-Khattab",
    "Utmà ibn Affan"
    ],
    c: 1,
  },
  {
    id: 1024,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va caure Constantinoble davant dels otomans?",
    o: [
    "1453",
    "1389",
    "1526",
    "1480"
    ],
    c: 0,
  },
  {
    id: 1025,
    cat: "historia",
    dif: "mitjana",
    p: "Quin imperador romà va adoptar el cristianisme?",
    o: [
    "Dioclecià",
    "Constantí I",
    "Julià l'Apòstata",
    "Valentinià"
    ],
    c: 1,
  },
  {
    id: 1026,
    cat: "historia",
    dif: "mitjana",
    p: "A quin país es trobava l'Imperi Inca?",
    o: [
    "Mèxic",
    "Perú",
    "Guatemala",
    "Colòmbia"
    ],
    c: 1,
  },
  {
    id: 1027,
    cat: "historia",
    dif: "mitjana",
    p: "Quants escaus tenia el Senat romà en la seva majoria?",
    o: [
    "200",
    "300",
    "500",
    "600"
    ],
    c: 2,
  },
  {
    id: 1028,
    cat: "historia",
    dif: "mitjana",
    p: "Quina fou la causa principal de la Primera Croada?",
    o: [
    "La caiguda de Bagdad",
    "L'appel del Papa Urban II per recuperar Terra Santa",
    "La invasió de Síria per Saladí",
    "La batalla de Manzikerta"
    ],
    c: 1,
  },
  {
    id: 1029,
    cat: "historia",
    dif: "mitjana",
    p: "Quin filòsof grec va ser mestre d'Alejandre Magne?",
    o: [
    "Plató",
    "Aristòtil",
    "Sòcrates",
    "Epicur"
    ],
    c: 1,
  },
  {
    id: 1030,
    cat: "historia",
    dif: "mitjana",
    p: "A quin signe zodiacal pertanyia l'emperador August?",
    o: [
    "Balança",
    "Llibra",
    "Virgo",
    "Gèminis"
    ],
    c: 2,
  },
  {
    id: 1031,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el Codi de lleis més famós de Babilònia?",
    o: [
    "Codi d'Hammurabi",
    "Codi de Justinià",
    "Lleis de Droncó",
    "Edicte de Milà"
    ],
    c: 0,
  },
  {
    id: 1032,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va ser coronat Carlemany com a emperador?",
    o: [
    "800",
    "768",
    "814",
    "843"
    ],
    c: 0,
  },
  {
    id: 1033,
    cat: "historia",
    dif: "mitjana",
    p: "Quin imperador romà va construir el Panteó que es conserva avui?",
    o: [
    "Neró",
    "Trajà",
    "Adrià",
    "Domicià"
    ],
    c: 2,
  },
  {
    id: 1034,
    cat: "historia",
    dif: "mitjana",
    p: "A quin sistema polític pertanyia Esparta a la Grècia clàssica?",
    o: [
    "Democràcia",
    "Diarquia",
    "Monarquia absoluta",
    "República"
    ],
    c: 1,
  },
  {
    id: 1035,
    cat: "historia",
    dif: "mitjana",
    p: "Quin imperador dinàstic de la Xina va construir gran part de la Muralla Gran?",
    o: [
    "dinastia Han",
    "dinastia Ming",
    "dinastia Qin",
    "dinastia Tang"
    ],
    c: 2,
  },
  {
    id: 1036,
    cat: "historia",
    dif: "mitjana",
    p: "Quina fou la primera capital de l'Imperi Islàmic després de Medina?",
    o: [
    "Bagdad",
    "Damasc",
    "El Caire",
    "Còrdova"
    ],
    c: 1,
  },
  {
    id: 1037,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va arribar el primer contingent de les Croades a Palestina?",
    o: [
    "1095",
    "1099",
    "1147",
    "1189"
    ],
    c: 1,
  },
  {
    id: 1038,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el principal mecenes del Renaixement italià a Florència durant el segle XV?",
    o: [
    "La família Visconti",
    "La família Medici",
    "La família Sforza",
    "La família Este"
    ],
    c: 1,
  },
  {
    id: 1039,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any Martí Luter va penjar les seves 95 tesis a la porta de la catedral de Wittenberg?",
    o: [
    "1505",
    "1517",
    "1525",
    "1534"
    ],
    c: 1,
  },
  {
    id: 1040,
    cat: "historia",
    dif: "mitjana",
    p: "Quin explorador portuguès va ser el primer a arribar a l'Índia per via marítima contornant l'Àfrica?",
    o: [
    "Bartolomeu Dias",
    "Vasco da Gama",
    "Pedro Álvares Cabral",
    "Fernão de Magalhães"
    ],
    c: 1,
  },
  {
    id: 1041,
    cat: "historia",
    dif: "mitjana",
    p: "A quin inventor britànic se li atribueix la creació de la màquina de vapor moderna que va impulsar la Revolució Industrial?",
    o: [
    "Richard Arkwright",
    "James Watt",
    "Edmund Cartwright",
    "George Stephenson"
    ],
    c: 1,
  },
  {
    id: 1042,
    cat: "historia",
    dif: "mitjana",
    p: "Quin estat europeu va ser el primer a abolir totalment la monarquia durant les revolucions liberals del segle XIX?",
    o: [
    "França",
    "Itàlia",
    "Bèlgica",
    "Suïssa"
    ],
    c: 0,
  },
  {
    id: 1043,
    cat: "historia",
    dif: "mitjana",
    p: "En quin continent es va desenvolupar principalment l'imperialisme europeu durant la segona meitat del segle XIX?",
    o: [
    "Amèrica del Sud",
    "Àsia Oriental",
    "Àfrica",
    "Oceania"
    ],
    c: 2,
  },
  {
    id: 1044,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el detonant immediat de la Primera Guerra Mundial?",
    o: [
    "L'afundament del Lusitania",
    "L'assassinat de l'arxiduc Francesc Ferran",
    "L'invasió alemanya de Bèlgica",
    "L'ocupació francesa d'Alsàcia"
    ],
    c: 1,
  },
  {
    id: 1045,
    cat: "historia",
    dif: "mitjana",
    p: "A quina ciutat es va signar el tractat que va acabar formalment la Segona Guerra Mundial a Europa?",
    o: [
    "Berlin",
    "Versalles",
    "Reims",
    "Potsdam"
    ],
    c: 2,
  },
  {
    id: 1046,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fu el primer país en utilitzar armes nuclears en un conflicte armat?",
    o: [
    "La Unió Soviètica",
    "Els Estats Units",
    "Gran Bretanya",
    "França"
    ],
    c: 1,
  },
  {
    id: 1047,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any va caure el mur de Berlín, marcant el començament de la fi de la Guerra Freda?",
    o: [
    "1987",
    "1989",
    "1991",
    "1993"
    ],
    c: 1,
  },
  {
    id: 1048,
    cat: "historia",
    dif: "mitjana",
    p: "Quin país asiàtic fou el primer a aconseguir la independència d'una potència colonial europea després de la Segona Guerra Mundial?",
    o: [
    "Indonèsia",
    "Índia",
    "Vietnam",
    "Birmània"
    ],
    c: 1,
  },
  {
    id: 1049,
    cat: "historia",
    dif: "mitjana",
    p: "Qui fou el principal teòric del humanisme renaixentista que va escriure sobre el potencial del home?",
    o: [
    "Tomàs d'Aquino",
    "Petrarca",
    "Giovanni Boccaccio",
    "Dante Alighieri"
    ],
    c: 1,
  },
  {
    id: 1050,
    cat: "historia",
    dif: "mitjana",
    p: "Quin reformador protestants va fundar la branca luterana de la Reforma?",
    o: [
    "Ulric Zwinglio",
    "Martí Luter",
    "Joan Calvín",
    "Thomas MUnzer"
    ],
    c: 1,
  },
  {
    id: 1051,
    cat: "historia",
    dif: "mitjana",
    p: "En quin anys es va produir la Revolució Francesa?",
    o: [
    "1776-1783",
    "1789-1799",
    "1815-1825",
    "1848-1851"
    ],
    c: 1,
  },
  {
    id: 1052,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el primer ferrocarril públic del món, establert entre dues ciutats?",
    o: [
    "Londres-Manchester",
    "París-Lió",
    "Berlín-Postdam",
    "Milà-Venècia"
    ],
    c: 0,
  },
  {
    id: 1053,
    cat: "historia",
    dif: "mitjana",
    p: "A quin tractat va posar fi a la Guerra dels Set Anys entre Gran Bretanya i França?",
    o: [
    "Tractat de Westfàlia",
    "Tractat de Pàu de París",
    "Tractat de Utrecht",
    "Tractat de Versalles"
    ],
    c: 1,
  },
  {
    id: 1054,
    cat: "historia",
    dif: "mitjana",
    p: "Quin europeu va ser el primer en establir una ruta comercial estable per al comerç de les espècies amb Àsia?",
    o: [
    "Els portuguesos",
    "Els holandesos",
    "Els anglesos",
    "Els francesos"
    ],
    c: 0,
  },
  {
    id: 1055,
    cat: "historia",
    dif: "mitjana",
    p: "En quin país va tenir lloc la Revolució Russa de 1917?",
    o: [
    "Bielorússia",
    "Rússia (Imperi Rus)",
    "Ucraïna",
    "Polònia"
    ],
    c: 1,
  },
  {
    id: 1056,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el moviment artístic que va sorgir a principis del segle XX com a reacció al Renaixement i l'Acadèmia?",
    o: [
    "Barroc",
    "Modernisme",
    "Cubisme",
    "Romantisme"
    ],
    c: 2,
  },
  {
    id: 1057,
    cat: "historia",
    dif: "mitjana",
    p: "A quin conflicte se li atribueix el començament de la Guerra Freda entre els EUA i l'URSS?",
    o: [
    "Bloqueig de Berlín",
    "Guerra de Corea",
    "Segona Guerra Mundial",
    "Crisi de Suez"
    ],
    c: 0,
  },
  {
    id: 1058,
    cat: "historia",
    dif: "mitjana",
    p: "Quin império colonial europeu va ser el més vast durant l'apogeu de l'imperialisme al segle XIX?",
    o: [
    "França",
    "Alemanya",
    "Gran Bretanya",
    "Holanda"
    ],
    c: 2,
  },
  {
    id: 1059,
    cat: "historia",
    dif: "mitjana",
    p: "A quin moviment polític se li deu la independència de les colònies d'Amèrica Llatina a principis del segle XIX?",
    o: [
    "Conservadorisme",
    "Lliberal-nacionalisme",
    "Socialisme utòpic",
    "Comunisme"
    ],
    c: 1,
  },
  {
    id: 1060,
    cat: "historia",
    dif: "mitjana",
    p: "Quin foi el principal teòric de la Reforma religiosa dins del catolicisme (Contrareforma)?",
    o: [
    "Ignasi de Loiola",
    "Carles V",
    "Papa Pau III",
    "Tomàs Moro"
    ],
    c: 0,
  },
  {
    id: 1061,
    cat: "historia",
    dif: "mitjana",
    p: "En quin any es va produir la Revolució Xinesa que va establir la República Popular Xinesa?",
    o: [
    "1921",
    "1935",
    "1949",
    "1966"
    ],
    c: 2,
  },
  {
    id: 1062,
    cat: "historia",
    dif: "mitjana",
    p: "Quin fou el descobridor europeu que va realizar la primera volta al món, completada pels seus homes?",
    o: [
    "Cristòfol Colom",
    "Fernão de Magalhães",
    "Vasco da Gama",
    "Bartolomeu Dias"
    ],
    c: 1,
  },
  {
    id: 1063,
    cat: "acores",
    dif: "mitjana",
    p: "Què significa la paraula portuguesa 'caldeira'?",
    o: [
    "Cuina moderna",
    "Caldera volcànica",
    "Dipòsit d'aigua",
    "Cadira de fusta"
    ],
    c: 1,
  },
  {
    id: 1064,
    cat: "acores",
    dif: "mitjana",
    p: "Com s'anomena en portuguès la sensació de nostàlgia i anhel profund que caractitza la cultura portuguesa?",
    o: [
    "Alegria",
    "Saudade",
    "Tristura",
    "Melanconia"
    ],
    c: 1,
  },
  {
    id: 1065,
    cat: "acores",
    dif: "mitjana",
    p: "Què és un 'miradouro' en portuguès?",
    o: [
    "Un museu de miralls",
    "Un lloc d'observació amb vistes",
    "Una finestra gran",
    "Un edifici de defensa"
    ],
    c: 1,
  },
  {
    id: 1066,
    cat: "acores",
    dif: "mitjana",
    p: "Què significa 'levada' en el context de les illes portugueses?",
    o: [
    "Una llevantada de vent",
    "Una construcció elevada",
    "Un canal de regatge",
    "Una escala de pedra"
    ],
    c: 2,
  },
  {
    id: 1067,
    cat: "acores",
    dif: "mitjana",
    p: "Com s'anomena en portuguès l'establiment on es venen productes d'alimentació?",
    o: [
    "Mercearia",
    "Botica",
    "Taberna",
    "Posada"
    ],
    c: 0,
  },
  {
    id: 1068,
    cat: "acores",
    dif: "mitjana",
    p: "Què és una 'adega' portuguesa?",
    o: [
    "Una sala de música",
    "Un sótano de bodega de vi",
    "Una cuina antiga",
    "Un dormitori"
    ],
    c: 1,
  },
  {
    id: 1069,
    cat: "acores",
    dif: "mitjana",
    p: "Què representa 'ribeira' en portuguès?",
    o: [
    "Una muntanya alta",
    "Un riu o corrent d'aigua",
    "Una costa marina",
    "Un vessant de terra"
    ],
    c: 1,
  },
  {
    id: 1070,
    cat: "acores",
    dif: "mitjana",
    p: "Com es diu en portuguès la torre amb llum que guia els vaixells?",
    o: [
    "Torre",
    "Farol",
    "Torrassa",
    "Campanar"
    ],
    c: 1,
  },
  {
    id: 1071,
    cat: "acores",
    dif: "mitjana",
    p: "Què significa 'quinta' en portuguès?",
    o: [
    "Una moneda antiga",
    "Una casa de camp amb terres",
    "Una plaça pública",
    "Un tipus de formatge"
    ],
    c: 1,
  },
  {
    id: 1072,
    cat: "acores",
    dif: "mitjana",
    p: "Com s'anomena en portuguès el dolç típic fet amb amàndola i ou?",
    o: [
    "Pastéis de nata",
    "Pastéis de amendoa",
    "Bolinhos de mel",
    "Biscoitinhos de canela"
    ],
    c: 1,
  },
  {
    id: 1073,
    cat: "acores",
    dif: "mitjana",
    p: "Què és 'matilha' en portuguès?",
    o: [
    "Un tipus de teixit",
    "Una manada o grup de gossos",
    "Un utensili de cuina",
    "Un joc infantil"
    ],
    c: 1,
  },
  {
    id: 1074,
    cat: "acores",
    dif: "mitjana",
    p: "Com s'anomena en portuguès la festa de carnaval?",
    o: [
    "Romaria",
    "Quermesse",
    "Carnaval",
    "Arraiada"
    ],
    c: 2,
  },
  {
    id: 1075,
    cat: "acores",
    dif: "mitjana",
    p: "Què significa 'arraiada' en portuguès?",
    o: [
    "Una tempesta marina",
    "Una festa popular amb dansa",
    "Una pesca col·lectiva",
    "Un tipus de planta"
    ],
    c: 1,
  },
  {
    id: 1076,
    cat: "acores",
    dif: "mitjana",
    p: "Com es diu en portuguès el senyalador d'una ciutat dins d'una illa?",
    o: [
    "Povoação",
    "Vila",
    "Aldeia",
    "Freguesia"
    ],
    c: 2,
  },
  {
    id: 1077,
    cat: "acores",
    dif: "mitjana",
    p: "Què és un 'fumarola' en el context geogràfic açoriano?",
    o: [
    "Una xemeneia de casa",
    "Una abertura volcànica amb vapor",
    "Un tipus de nuvola",
    "Un escull submarí"
    ],
    c: 1,
  },
  {
    id: 1078,
    cat: "acores",
    dif: "mitjana",
    p: "Com s'anomena en portuguès la cambra on es guarden les collites i productes agrícoles?",
    o: [
    "Cozinha",
    "Adega",
    "Tulha",
    "Despensa"
    ],
    c: 2,
  },
  {
    id: 1079,
    cat: "acores",
    dif: "mitjana",
    p: "Què significa 'botica' en portuguès?",
    o: [
    "Una botiga de roba",
    "Una farmàcia o lloc on es venen medicaments",
    "Una cuina",
    "Una bodega"
    ],
    c: 1,
  },
  {
    id: 1080,
    cat: "acores",
    dif: "mitjana",
    p: "Com es diu en portuguès el camí estret que separa dues propietats?",
    o: [
    "Calçada",
    "Viela",
    "Trilho",
    "Sendeiro"
    ],
    c: 1,
  },
  {
    id: 1081,
    cat: "acores",
    dif: "mitjana",
    p: "Què és 'romaria' en la cultura portuguesa?",
    o: [
    "Un tipus de dansa",
    "Una peregrinació a un santuari",
    "Una festa de mesos",
    "Una processó urbana"
    ],
    c: 1,
  },
  {
    id: 1082,
    cat: "acores",
    dif: "mitjana",
    p: "Com s'anomena en portuguès el senyalador de pedra antiga que indica direcció o distància?",
    o: [
    "Mouro",
    "Pedra",
    "Marcos",
    "Jaspe"
    ],
    c: 0,
  },
  {
    id: 1083,
    cat: "acores",
    dif: "mitjana",
    p: "Què significa 'ponta' en portuguès en el context geogràfic?",
    o: [
    "Una muntanya",
    "Un cap o promontori",
    "Una illa petita",
    "Un fons marí"
    ],
    c: 1,
  },
  {
    id: 1084,
    cat: "acores",
    dif: "mitjana",
    p: "Com es diu en portuguès la cuina tradicional portuguesa?",
    o: [
    "Cuina clàssica",
    "Cuina portuguesa",
    "Cuina caseira",
    "Gastronomia lusa"
    ],
    c: 2,
  },
  {
    id: 1085,
    cat: "acores",
    dif: "mitjana",
    p: "Què és un 'trilho' en portuguès?",
    o: [
    "Un riu subterrani",
    "Un camí estret a través de la natura",
    "Una corda de pesca",
    "Un tipus de planta"
    ],
    c: 1,
  },
  {
    id: 1086,
    cat: "acores",
    dif: "mitjana",
    p: "Com s'anomena en portuguès la festa amb berenars i dansa popular a l'aire lliure?",
    o: [
    "Festa de Pentecoste",
    "Piquenique",
    "Pousada",
    "Confraría"
    ],
    c: 0,
  },
  {
    id: 1087,
    cat: "acores",
    dif: "mitjana",
    p: "Què significa 'Igreja' en portuguès?",
    o: [
    "Una casa de camp",
    "Una construcció religiosa o temple",
    "Una casa de pobles",
    "Una fortalesa"
    ],
    c: 1,
  },
  {
    id: 1088,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la traducció al català de 'garoupa', un peix típic dels senyals de les Açores?",
    o: [
    "Sardina",
    "Mero",
    "Lluç",
    "Bacallà"
    ],
    c: 1,
  },
  {
    id: 1089,
    cat: "acores",
    dif: "mitjana",
    p: "Les 'lapas' són un aliment marí típic de les Açores. A quin tipus d'animal pertanyen?",
    o: [
    "Peix",
    "Cefalòpode",
    "Gasteròpode",
    "Crustaci"
    ],
    c: 2,
  },
  {
    id: 1090,
    cat: "acores",
    dif: "mitjana",
    p: "Què és una 'fajã' en la geografia de les Açores?",
    o: [
    "Una platja de sorra fina",
    "Una formació geològica de terra entre muntanyes",
    "Un tipus d'alga marina",
    "Un cràter volànic"
    ],
    c: 1,
  },
  {
    id: 1091,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la principal característica del 'chouriço' portuguès que el diferencia del salsitxó?",
    o: [
    "Que és més gros",
    "Que conté pimentó i és fuma",
    "Que es fa amb carn de xai",
    "Que és menys sàl·lat"
    ],
    c: 1,
  },
  {
    id: 1092,
    cat: "acores",
    dif: "mitjana",
    p: "Les 'caldas' a les Açores són conegudes per ser zones de...",
    o: [
    "Pesca intensiva",
    "Agricultura extensiva",
    "Fonts termoreactors",
    "Activitat volcànica i fonts d'aigua calenta"
    ],
    c: 3,
  },
  {
    id: 1093,
    cat: "acores",
    dif: "mitjana",
    p: "Què és una 'queijada', especialitat culinària portuguesa?",
    o: [
    "Un prat de formatge gratinàt",
    "Un pastís dolç fet amb formatge fresc",
    "Un estofat de carn",
    "Una sopa tradicional"
    ],
    c: 1,
  },
  {
    id: 1094,
    cat: "acores",
    dif: "mitjana",
    p: "La 'chamarrita' és una forma d'expressió cultural de les Açores. De què es tracta?",
    o: [
    "Una recepta culinària",
    "Una dansa tradicional",
    "Un tipus de roca volcànica",
    "Una tècnica de pesca"
    ],
    c: 1,
  },
  {
    id: 1095,
    cat: "acores",
    dif: "mitjana",
    p: "Què és un 'fumeiro' en la cuina portuguesa tradicional?",
    o: [
    "Un tipus de forn",
    "Un plat de marisc fum",
    "Un amagatall per guardar aliments fumats",
    "Una xemeneia de cuina"
    ],
    c: 2,
  },
  {
    id: 1096,
    cat: "acores",
    dif: "mitjana",
    p: "Una 'nascente' en la terminologia geogràfica portuguesa és...",
    o: [
    "Una muntanya jove",
    "Una font d'aigua",
    "Un tipus de vegetació",
    "Un afluent de riu"
    ],
    c: 1,
  },
  {
    id: 1097,
    cat: "acores",
    dif: "mitjana",
    p: "Quins animals són especialment abundants en les aigües que envolten les Açores?",
    o: [
    "Foca i morsa",
    "Balena i delfí",
    "Tauró blau i peix espasa",
    "Ballena blanca i narval"
    ],
    c: 1,
  },
  {
    id: 1098,
    cat: "acores",
    dif: "mitjana",
    p: "La cuina açoriana utilitza freqüentment quin producte del mar per fer sopes?",
    o: [
    "La gamba",
    "El pulp",
    "La lapa",
    "L'ostra"
    ],
    c: 2,
  },
  {
    id: 1099,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la característica principal de la vegetació de les Açores en comparació amb altres regions atlàntiques?",
    o: [
    "Més árida",
    "Més subtropical i frondosa",
    "Més boscana de coníferes",
    "Més herbàcia i rasa"
    ],
    c: 1,
  },
  {
    id: 1100,
    cat: "acores",
    dif: "mitjana",
    p: "El 'sweet potato' portuguès, cuinat a les Açores, s'anomena...",
    o: [
    "Batata",
    "Nava",
    "Pastanaga",
    "Rave"
    ],
    c: 0,
  },
  {
    id: 1101,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la importància del 'maïs' en la gastronomia tradicional açoriana?",
    o: [
    "Base de postres",
    "Ingredient principal de pans i pastissos",
    "Només per a pastura",
    "Cultiu no desenvolupat"
    ],
    c: 1,
  },
  {
    id: 1102,
    cat: "acores",
    dif: "mitjana",
    p: "Els 'espetaos' (peixos petits) de les Açores es cuinen principalment de quina manera?",
    o: [
    "Bullits",
    "A la sal i a l'espineta",
    "Enlatats",
    "En conserva d'oli"
    ],
    c: 1,
  },
  {
    id: 1103,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la principal característica del clima de les Açores que afecta la seva cuina?",
    o: [
    "Clima desert",
    "Clima tropical sec",
    "Clima temperat oceànic humid",
    "Clima continental sec"
    ],
    c: 2,
  },
  {
    id: 1104,
    cat: "acores",
    dif: "mitjana",
    p: "El 'vinho da terra' de les Açores es caracteritza per...",
    o: [
    "Ser dolç intensament",
    "Ser sec i mineral",
    "Tenir major graduació alcohòlica que altres",
    "Ser begut jove i fresc"
    ],
    c: 3,
  },
  {
    id: 1105,
    cat: "acores",
    dif: "mitjana",
    p: "Quins tipus de fruites tropicals es cultiven a les Açores gràcies al seu clima?",
    o: [
    "Banana i coco",
    "Pinya i mango",
    "Papaia i aguacate",
    "Plàtan i maracujà"
    ],
    c: 3,
  },
  {
    id: 1106,
    cat: "acores",
    dif: "mitjana",
    p: "Com s'anomena el producte resultant de la transformació de la llet en les Açores?",
    o: [
    "Queijo",
    "Manteiga",
    "Iogurt",
    "Leche"
    ],
    c: 0,
  },
  {
    id: 1107,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la festa més important de les Açores relacionada amb la gastronomia?",
    o: [
    "La Festa de la Vendimia",
    "As Festas do Espírito Santo",
    "A Festa da Batata",
    "La Festa del Peix"
    ],
    c: 1,
  },
  {
    id: 1108,
    cat: "acores",
    dif: "mitjana",
    p: "El 'taro' és un tubercle cultivat a les Açores. De quin país comença a ser típic?",
    o: [
    "Japó",
    "Tailàndia",
    "Àfrica tropical",
    "Brasil"
    ],
    c: 2,
  },
  {
    id: 1109,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la principal riquesa pesquera que fa famoses les Açores internacionalment?",
    o: [
    "La sardina",
    "El bacallà",
    "El tonyina",
    "La sípia"
    ],
    c: 2,
  },
  {
    id: 1110,
    cat: "acores",
    dif: "mitjana",
    p: "Els 'relvados' a les Açores són principalment utilitzats per...",
    o: [
    "Cultiu de verdures",
    "Pastura de bestiar",
    "Forestació",
    "Construcció urbana"
    ],
    c: 1,
  },
  {
    id: 1111,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la planta endèmica més simbòlica de la flora de les Açores?",
    o: [
    "La orquídia açoriana",
    "La flor de la passió",
    "La camèlia japonica",
    "La hortènsia"
    ],
    c: 1,
  },
  {
    id: 1112,
    cat: "acores",
    dif: "mitjana",
    p: "Com es conserva tradicionalment el 'chouriço' português per a una conservació llarga?",
    o: [
    "En refrigerant",
    "En bossa de plàstic",
    "Fum i sal",
    "En vidres esterilitzats"
    ],
    c: 2,
  },
  {
    id: 1113,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la principal característica geològica de les Açores?",
    o: [
    "Són illes formades per deposició sedimentària marina",
    "Són illes d'origen volcànic actiu",
    "Són illes calcàries procedents de coral",
    "Són illes de granit erosionat"
    ],
    c: 1,
  },
  {
    id: 1114,
    cat: "acores",
    dif: "mitjana",
    p: "Quina espècie de cetaci és endèmica de les aigües de les Açores?",
    o: [
    "La balena blanca",
    "El dofí de Risso",
    "La balena gris",
    "L'orca atlàntica"
    ],
    c: 1,
  },
  {
    id: 1115,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el plat tradicional açorià basat en pollastre cuit a foc lent amb brou?",
    o: [
    "Caldo verde",
    "Cachupa",
    "Frango à Açoriana",
    "Caldeirada de peixe"
    ],
    c: 2,
  },
  {
    id: 1116,
    cat: "acores",
    dif: "mitjana",
    p: "La Fossa Açoriana és una característica geològica submarina. A quina profunditat es troba aproximadament?",
    o: [
    "Entre 1.000 i 2.000 metres",
    "Entre 3.000 i 4.000 metres",
    "Entre 5.000 i 6.000 metres",
    "Entre 7.000 i 8.000 metres"
    ],
    c: 2,
  },
  {
    id: 1117,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el nom de la flor endèmica de les Açores que apareix en la bandera de São Miguel?",
    o: [
    "Hortènsia",
    "Flor de la passió",
    "Jasmim de São Miguel",
    "Rosa das Sete Cidades"
    ],
    c: 0,
  },
  {
    id: 1118,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa de les Açores es troben els Poços da Caldeira, una zona de géisers naturals?",
    o: [
    "Faial",
    "Terceira",
    "São Jorge",
    "Graciosa"
    ],
    c: 3,
  },
  {
    id: 1119,
    cat: "acores",
    dif: "mitjana",
    p: "Quin tipus d'artesania és tradicional a les Açores, caracteritzada per motius geomètrics?",
    o: [
    "La tecel·loria",
    "La ceràmica pintada",
    "La talalla de marfil",
    "La filigrana en fusta"
    ],
    c: 1,
  },
  {
    id: 1120,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el festival més important de la festa del Diví Espírito Sant que es celebra a les Açores?",
    o: [
    "Festa de Nossa Senhora",
    "Festa do Espírito Santo",
    "Festa de São João",
    "Festa da Colheita"
    ],
    c: 1,
  },
  {
    id: 1121,
    cat: "acores",
    dif: "mitjana",
    p: "Quin arbre endèmic de les Açores és conegut per la seva fusta aromàtica i dura?",
    o: [
    "Cedre açorià",
    "Til açorià",
    "Ebano atlàntic",
    "Pau d'arco açorià"
    ],
    c: 1,
  },
  {
    id: 1122,
    cat: "acores",
    dif: "mitjana",
    p: "A quin tipus de pesca es dedicaven tradicionalment els habitants de les Açores?",
    o: [
    "Pesca de salmó en rius",
    "Pesca de rorqual i cachalot",
    "Pesca de coral",
    "Pesca d'esturió"
    ],
    c: 1,
  },
  {
    id: 1123,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la ruta de senderisme més famosa de Pico, que ascendeix al seu cim?",
    o: [
    "Trilho da Cimeira",
    "Caminho do Pico",
    "Sendeiro da Montaña",
    "Via da Ascensão"
    ],
    c: 0,
  },
  {
    id: 1124,
    cat: "acores",
    dif: "mitjana",
    p: "Quin plat tradicional açorià és una sopa d'hortalisses amb blat de moro?",
    o: [
    "Açorda",
    "Canja",
    "Migas",
    "Gaspacho açorià"
    ],
    c: 0,
  },
  {
    id: 1125,
    cat: "acores",
    dif: "mitjana",
    p: "Quina espècie de petrell es considera endèmica de les Açores i està en perill d'extinció?",
    o: [
    "Petrell gris",
    "Petrell negre das Açores",
    "Petrell de tempesta",
    "Petrell blanc atlàntic"
    ],
    c: 1,
  },
  {
    id: 1126,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa es troba la Caldeira das Sete Cidades, amb els seus lagos de colors diferents?",
    o: [
    "São Miguel",
    "Terceira",
    "Faial",
    "São Jorge"
    ],
    c: 0,
  },
  {
    id: 1127,
    cat: "acores",
    dif: "mitjana",
    p: "Quin tipus de formatge tradicional es produeix a les Açores?",
    o: [
    "Queijo da Serra",
    "Queijo das Açores",
    "Queijo do Pico",
    "Queijo de São Jorge"
    ],
    c: 3,
  },
  {
    id: 1128,
    cat: "acores",
    dif: "mitjana",
    p: "Quina planta endèmica de les Açores és usada tradicionalment per fer tisana?",
    o: [
    "Camomila açoriana",
    "Chá da serra",
    "Passiflora açoriana",
    "Genciana de montanya"
    ],
    c: 1,
  },
  {
    id: 1129,
    cat: "acores",
    dif: "mitjana",
    p: "A quin fenomen natural es deu el color negre de les platges de les Açores?",
    o: [
    "Acumulació de còdols fòssils",
    "Sorra volcànica negra",
    "Algues fossilitzades",
    "Dipòsit mineral de ferro"
    ],
    c: 1,
  },
  {
    id: 1130,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la festa més antiga documentada de les Açores, celebrada amb processos religiosos?",
    o: [
    "Festa de São Pedro",
    "Festa de Nossa Senhora da Assunção",
    "Festa da Ascensão",
    "Festa de Corpus Christi"
    ],
    c: 3,
  },
  {
    id: 1131,
    cat: "acores",
    dif: "mitjana",
    p: "Quin tipus de ceràmica tradicional de les Açores és famous pel seu vidrat esmalt?",
    o: [
    "Ceràmica pintada de Vieira",
    "Louça de Terceira",
    "Faïença de Faial",
    "Pisa de São Miguel"
    ],
    c: 1,
  },
  {
    id: 1132,
    cat: "acores",
    dif: "mitjana",
    p: "Quina espècie de líquen és endèmica de les Açores i es fa servir per a tints naturals?",
    o: [
    "Líquen gris açorià",
    "Orcella",
    "Líquen vermell de Terceira",
    "Musgo tintoreria"
    ],
    c: 1,
  },
  {
    id: 1133,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el plat de festa açorià base de carn de porc guisada amb vi?",
    o: [
    "Chanfana",
    "Rojões",
    "Carne à Açoriana",
    "Mofongo"
    ],
    c: 1,
  },
  {
    id: 1134,
    cat: "acores",
    dif: "mitjana",
    p: "A quin tipus d'arquitectura tradicional responen les cases de les Açores amb porxos profunds?",
    o: [
    "Estil colonial portuguès",
    "Arquitectura vernacla açoriana",
    "Barroc atlàntic",
    "Neoclassicisme madeireny"
    ],
    c: 1,
  },
  {
    id: 1135,
    cat: "acores",
    dif: "mitjana",
    p: "Quina ruta de senderisme de São Jorge ofereix vistes espectaculars de falgueres verticals?",
    o: [
    "Trilho do Pico da Esperança",
    "Caminho da Costa",
    "Trilho das Escarpas",
    "Via das Caldeiras"
    ],
    c: 2,
  },
  {
    id: 1136,
    cat: "acores",
    dif: "mitjana",
    p: "Quina espècie de faia endèmica de les Açores és un arbre relicte del Terciari?",
    o: [
    "Faia das Açores",
    "Til",
    "Cedre atlàntic",
    "Loureiro açorià"
    ],
    c: 1,
  },
  {
    id: 1137,
    cat: "acores",
    dif: "mitjana",
    p: "Quin és el tradicional teixidor que ancora les veles dels barcos de pesca de les Açores?",
    o: [
    "Lino",
    "Jute",
    "Fibra de palma",
    "Cànem"
    ],
    c: 0,
  },
  {
    id: 1138,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la capital de l'arxipèlag de les Açores?",
    o: [
    "Ponta Delgada",
    "Angra do Heroísmo",
    "Horta",
    "Santa Cruz"
    ],
    c: 0,
  },
  {
    id: 1139,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa es troba el Crater de Sete Cidades amb els seus dos llacs de colors diferents?",
    o: [
    "Terceira",
    "São Miguel",
    "Pico",
    "Faial"
    ],
    c: 1,
  },
  {
    id: 1140,
    cat: "acores",
    dif: "mitjana",
    p: "Quins són els dos llacs que componen Sete Cidades a São Miguel?",
    o: [
    "Llac Blau i Llac Verd",
    "Llac Negre i Llac Blanc",
    "Llac Gris i Llac Turquesa",
    "Llac Roig i Llac Groc"
    ],
    c: 0,
  },
  {
    id: 1141,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa es troben les Furnas, famoses per les seves fonts termàl·s?",
    o: [
    "São Jorge",
    "Graciosa",
    "São Miguel",
    "Santa Maria"
    ],
    c: 2,
  },
  {
    id: 1142,
    cat: "acores",
    dif: "mitjana",
    p: "Quina muntanya és la més alta de Portugal i es troba a l'illa de Pico?",
    o: [
    "Punta do Pico",
    "Mont Pico",
    "Pico Alto",
    "Serra do Pico"
    ],
    c: 0,
  },
  {
    id: 1143,
    cat: "acores",
    dif: "mitjana",
    p: "Quantes metres aproximadament té l'alçada de la muntanya de Pico?",
    o: [
    "1.500 metres",
    "2.351 metres",
    "3.000 metres",
    "1.800 metres"
    ],
    c: 1,
  },
  {
    id: 1144,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa es localitza la ciutat de Angra do Heroísmo, patrimoni de la UNESCO?",
    o: [
    "São Jorge",
    "Terceira",
    "Faial",
    "Flores"
    ],
    c: 1,
  },
  {
    id: 1145,
    cat: "acores",
    dif: "mitjana",
    p: "Quina característica especial té la Lagoa do Fogo a São Miguel?",
    o: [
    "És d'aigua salada",
    "És la més gran de l'arxipèlag",
    "Té aigua calenta per origen volcànic",
    "Conté peixos únics de les Açores"
    ],
    c: 2,
  },
  {
    id: 1146,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa es troben les vinyes inscrites com a Patrimoni de la Humanitat per la UNESCO?",
    o: [
    "Pico",
    "Terceira",
    "Faial",
    "São Jorge"
    ],
    c: 0,
  },
  {
    id: 1147,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és la principal activitat econòmica històrica de les vinyes de Pico?",
    o: [
    "Turisme",
    "Producció de vi",
    "Cultiu de blat",
    "Ramaderia"
    ],
    c: 1,
  },
  {
    id: 1148,
    cat: "acores",
    dif: "mitjana",
    p: "On es troba la Marina da Horta, un dels ports naturals més importants de l'Atlàntic?",
    o: [
    "A Pico",
    "A Faial",
    "A São Miguel",
    "A Terceira"
    ],
    c: 1,
  },
  {
    id: 1149,
    cat: "acores",
    dif: "mitjana",
    p: "Quina illa és famosa pels seus fajãs, formacions terrestres entre muntanya i mar?",
    o: [
    "Santa Maria",
    "São Jorge",
    "Flores",
    "Corvo"
    ],
    c: 1,
  },
  {
    id: 1150,
    cat: "acores",
    dif: "mitjana",
    p: "Quants fajãs aproximadament té l'illa de São Jorge?",
    o: [
    "5 fajãs",
    "10 fajãs",
    "20 fajãs",
    "30 fajãs"
    ],
    c: 2,
  },
  {
    id: 1151,
    cat: "acores",
    dif: "mitjana",
    p: "Per què és especialment famós el formatge de São Jorge?",
    o: [
    "Per ser el més barat de Portugal",
    "Per la seva textura única i sabor distintiu",
    "Per ser vegan",
    "Per ser el més nou del mercat"
    ],
    c: 1,
  },
  {
    id: 1152,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa es troba la Cova de Algar do Carvão?",
    o: [
    "Graciosa",
    "Terceira",
    "Corvo",
    "Santa Maria"
    ],
    c: 1,
  },
  {
    id: 1153,
    cat: "acores",
    dif: "mitjana",
    p: "Quina és l'illa més petita de les Açores?",
    o: [
    "Santa Maria",
    "Graciosa",
    "Corvo",
    "Flores"
    ],
    c: 2,
  },
  {
    id: 1154,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa es pot trobar el Poço da Salina, una làguna salada volcànica?",
    o: [
    "A São Miguel",
    "A Graciosa",
    "A Santa Maria",
    "A Flores"
    ],
    c: 1,
  },
  {
    id: 1155,
    cat: "acores",
    dif: "mitjana",
    p: "Quina illa és la més antiga geològicament de l'arxipèlag?",
    o: [
    "São Miguel",
    "Santa Maria",
    "Pico",
    "Corvo"
    ],
    c: 1,
  },
  {
    id: 1156,
    cat: "acores",
    dif: "mitjana",
    p: "Quina illa es caracteritza per tenir una població gairebé inexistent fins fa poc?",
    o: [
    "Graciosa",
    "Corvo",
    "Flores",
    "Santa Maria"
    ],
    c: 1,
  },
  {
    id: 1157,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa es localitza la Caldeira, un dels volcans més impressionants de les Açores?",
    o: [
    "Pico",
    "Faial",
    "Terceira",
    "São Jorge"
    ],
    c: 1,
  },
  {
    id: 1158,
    cat: "acores",
    dif: "mitjana",
    p: "Quina característica és particular de la fauna marina de Flores?",
    o: [
    "Té els millors peixos",
    "És una zona important per a l'avistament de balenes",
    "Té més coralls",
    "Manca de vida marina"
    ],
    c: 1,
  },
  {
    id: 1159,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa es troben els Poços da Fundura, pous d'aigua donya profunds?",
    o: [
    "A Corvo",
    "A Santa Maria",
    "A Graciosa",
    "A Flores"
    ],
    c: 0,
  },
  {
    id: 1160,
    cat: "acores",
    dif: "mitjana",
    p: "Quina illa està més allunyada de la capital de les Açores?",
    o: [
    "Corvo",
    "Flores",
    "Santa Maria",
    "Graciosa"
    ],
    c: 1,
  },
  {
    id: 1161,
    cat: "acores",
    dif: "mitjana",
    p: "A quina illa s'hi produeix especialment el Vinho da Terra, un vi típic local?",
    o: [
    "A Terceira",
    "A Pico",
    "A Faial",
    "A São Jorge"
    ],
    c: 0,
  },
  {
    id: 1162,
    cat: "acores",
    dif: "mitjana",
    p: "Quina illa és coneguda pels seus miradors spectaculars sobre l'oceà?",
    o: [
    "Graciosa",
    "Corvo",
    "Flores",
    "Santa Maria"
    ],
    c: 2,
  }
];


const TRIVIAL_CATEGORIES = {
  esports: {
    label: "Esports",
    emoji: "⚽",
    color: "#FF8C00",
    colorDark: "#cc7000",
  },
  geografia: {
    label: "Geografia",
    emoji: "🌍",
    color: "#4169E1",
    colorDark: "#3050b0",
  },
  ciencies: {
    label: "Ciències i Naturalesa",
    emoji: "🔬",
    color: "#228B22",
    colorDark: "#186018",
  },
  historia: {
    label: "Història",
    emoji: "📜",
    color: "#DAA520",
    colorDark: "#b08010",
  },
  cultura: {
    label: "Cultura General",
    emoji: "🎭",
    color: "#FF69B4",
    colorDark: "#cc4490",
  },
  acores: {
    label: "Açores",
    emoji: "🌋",
    color: "#9370DB",
    colorDark: "#7050b0",
  },
};

// ── UTILITATS ────────────────────────────────────────────────
function trivialGetPreguntes(categoria, dificultat, excloses = [], n = 1) {
  const pool = TRIVIAL_PREGUNTES.filter(
    (q) =>
      q.cat === categoria && q.dif === dificultat && !excloses.includes(q.id),
  ).sort(() => Math.random() - 0.5);
  return pool.slice(0, n);
}

function trivialGetPreguntaFinal(excloses = []) {
  // Retorna 8 mitjanes + 5 altes aleatòries de categories diverses
  const cats = Object.keys(TRIVIAL_CATEGORIES);
  const mitjanes = [];
  const altes = [];
  cats.forEach((cat) => {
    const m = trivialGetPreguntes(cat, "mitjana", excloses, 2);
    const a = trivialGetPreguntes(cat, "alta", excloses, 1);
    mitjanes.push(...m);
    altes.push(...a);
  });
  // Barreja i agafa 8 mitjanes i 5 altes (màxim disponible)
  const selMitj = mitjanes.sort(() => Math.random() - 0.5).slice(0, 7);
  const selAlta = altes.sort(() => Math.random() - 0.5).slice(0, 5);
  return [...selMitj, ...selAlta].sort(() => Math.random() - 0.5);
}
