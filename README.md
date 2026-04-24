# acores-2026

■ PWA Viatge Açores 2026
Document de context per a nous xats · Abril 2026 · Versió 4

1. Objectiu del projecte
   PWA d'ús intern familiar per al viatge a les Açores (juliol 2026). Grup de 6: Jordi, Anna (19), Laia (21), Mons (~60), Xu (70) i Joa
   (~60). Illes: São Miguel, São Jorge, Pico i Faial. Nota: Abril 2026: vol BCN-PDL pujat de 177€ a 288€/persona. Projecte actiu.
2. Context tècnic
   Clau Valor
   Desenvolupador Jordi · Windows, VS Code, nocions bàsiques
   Repositori jop-oss/acores-2026
   URL pública https://jop-oss.github.io/acores-2026/
   Desplegament GitHub Desktop → GitHub Pages automàtic
   Tema visual Volcànic: fons #0a1628, verds #2d5a3d / #6aab7a / #a8d8b0
   Google Maps API AIzaSyDnvUnUEUUUrBiyaArGEHSQln_6A2Q_A84 (restringida a jop-oss.github.io i localhost)
   Windy API RFX87wOopVv0oQ8HlifoUNlSYukIAkhy (domini: jop-oss.github.io)
   OpenRouteService Routing pendent · 2000 req/dia gratuïtes
   Mapes Leaflet + CartoDB (Voyager/Clar/Topo/Satèl·lit/OSM)
   Webcams SpotAzores · spotazores.com/camaras/CODI/VGAcurrent.jpg
   Meteorologia Open-Meteo (gratuït) + RainViewer (radar) + Windy (overlay)
3. Estructura de fitxers
   acores-2026/
   index.html, restaurants.html, temps.html, webcams.html, jocs.html, ruleta.html
   css/ style.css, temps.css, webcams.css, restaurants.css, ruleta.css, jocs.css (pendent paraula-amagada)
   js/ app.js, temps.js, webcams.js, restaurants.js, restaurants-data.js, ruleta.js, jocs.js
   img/minimaps/ (24 PNG webcams) · img/personatges/ (12 MP4 quiz + 6 MP4 ruleta)
   img/avatars/ Jordi/Anna/Laia/Mons/Xu/Joa.jpeg + Jordi/Anna/Laia/Mons/Xu/Joa_cara.png
   img/restaurants/fotos/ (pendent) · manifest.json, service-worker.js
4. Seccions completades
   Landing page
   Cartell grup com a hero, popups personatges amb GIF animat, galeria flip-card, 12+ cards de seccions (inclou Ruleta), nav fixa
   amb mode fosc/clar.
   Temps (temps.html)
   Previsió Open-Meteo per hores/dies, radar pluja RainViewer, overlay Windy. Arc solar animat (s'atura a l'hora actual Açores via
   getAzoresNow: UTC+0 mar-oct / UTC-1 nov-feb). Marees: línia blava animada, punt verd + hora. Registres històrics per
   illa/mes.
   Bugs resolts: arc no dibuixa sota l'horitzó (if py > arcY: break); pausa guarda anim.progress exacte via resumeFrom().
   Webcams (webcams.html)
   24 càmeres SpotAzores. Refresc 30s via new Image(). Mini mapa estàtic per illa amb pin CSS animat (pixel-precise %). Mides:
   SM 130×57px, SJ 140×53px, Pico 130×57px, Faial 110×75px. 24 pinPositions. Mapa Leaflet amb 24 marcadors, popup imatge,
   refresc 5min. Pestanya Windy: botó fallback windy.com (CORS pendent fins a publicació).
   Restaurants (restaurants.html)
   113 restaurants (Faial:17, Pico:29, São Jorge:13, São Miguel:54). Filtres: illa, cuina, preu, distància màx. Ordenació: puntuació,
   preu, distància, nom. Distàncies a capitals precalculades (Google Distance Matrix) → localStorage (rest_dist_capitals_v1).
   Geocoder: Nominatim. Mapa Leaflet sticky dreta, 5 estils. Cards: carrusel fotos (TA primer, Google segon), badges
   Top10/Or/Plata/Bronze. Detall expandible.
   Bugs resolts: botons mapa amb onclick HTML; CartoDB sense {r}; fotos Google 403 → TA primer.
   Jocs - Quiz Açores (jocs.html)

- 100 preguntes en ordre aleatori (50 fàcil / 30 mitja / 20 difícil). 7 categories. Puntuació: 6/10/20 pts. Màxim 1000 pts.
- Selecció jugador: grid 6 fotos. Persistència per jugador a localStorage (quiz_estat_NOM).
- Ranking sempre visible amb fotos, barres de progrés i puntuació.
- Reinici amb penalització 100 pts (modal). SENSE_PENALITZACIO = ['Jordi'] — RECORDAR ELIMINAR.
- Animació: vídeo MP4 circular 200×200, border verd/vermell, auto-tanca, clic per saltar.
- Confetti si puntuació ≥ 700. Nav completa. Botó X (guarda progrés). Botó Tornar.
- Pendent (punt 7): recordar jugador automàticament al dispositiu (localStorage nom).
  Ruleta de decisions (ruleta.html)
- 6 participants activables/desactivables (mínim 2). Chips amb color identificador.
- Canvas amb gradient radial per sector. Avatars circulars al canvas des de JPEG (img/avatars/Nom.jpeg, crop 70%
  superior).
- Pop-up guanyador i bloc resultat: vídeo MP4 animat (img/personatges/nom_ruleta.mp4).
- Historial: img/avatars/Nom_cara.png (PNG de cara retallat, object-fit:cover).
- 12 preguntes predefinides + camp de text lliure. Display gran de la pregunta activa.
- Spin amb easing suau (6-10 voltes). Overlay zoom 2s + confetti en color del jugador.
- Historial últims 20 resultats a localStorage (ruleta_historial_v1). PIN esborrar: 2468.
- MP4 ruleta comprimits (ffmpeg crf=28, escala 400×400): total ~1MB per 6 fitxers.
  Joc "La Paraula Amagada" (integrat a jocs.html) — EN DESENVOLUPAMENT
  Joc d'endevinar paraula per torns (Sí/No/Ni sí ni no). Un jugador veu la paraula secreta i els altres pregunten. Fins a 3 pistes
  creatives per IA (excepte Familiars i amics, sense pistes). Pista extra genèrica si s'esgoten les 3
  Categories: Familiars i amics (llista tancada), Persones famoses (IA), Geografia (IA), Cançons (IA), Animals (IA), Menjar i
  begudes (IA), Objectes (IA).
  Llista Familiars i amics: Iaia, Avi, Tieta Mercè, Tiet Miquel, Míriam (neboda), Marta (neboda), Iris (amiga Laia), Rubèn (amic
  Laia), Sea (nòvio Iris), Joel (amic Anna), Aina (amiga Anna), Martina Alinque (amiga Anna), Marta Ortega (amiga Anna), Mònica
  Casajuana (amiga Anna), Tieta Bernardina, Tieta Ino, Tieta Pili, Tieta Antònia, Tieta Isabel, Xu, Joa, Jordi, Mons, Laia, Anna.
  Flux: Instruccions breus → Selecció jugador principal (grid 6 avatars) → Selecció categoria → Paraula secreta (generada per IA
  o de llista) + botó Descartar → Pantalla joc (paraula gran, instrucció breu, botó Pista, botó Nova partida). Jugador principal
  llegeix pista en veu alta sense mostrar el mòbil. No hi ha puntuació. Integrat a jocs.html (no pàgina nova).
  Pendent: implementar els fitxers jocs.html / jocs.css / jocs.js (necessito que Jordi els passi per integrar correctament).

5. Seccions pendents
   Secció Estat Notes
   La Paraula Amagada En curs Integrar a jocs.html/css/js — pendent rebre fitxers
   Jocs - Qui soc? Pendent Mecànica sí/no, categories, sense puntuació
   Jocs - Reptes Pendent Llista de reptes a completar durant el viatge
   Jocs - Bingo Pendent Cartró 5×5 amb situacions típiques del viatge
   Jocs - Veritat/Repte Pendent Versió familiar adaptada al grup
   Jocs - On és això? Pendent Endevinar llocs de les Açores
   Quiz - punt 7 Pendent Recordar jugador automàticament (localStorage nom)
   Itinerari Sense contingut Esperant decisió final del viatge
   Mapes Sense contingut Routing OpenRouteService + fallback Google Maps
   Logística Sense contingut Ferries, lloguers cotxe, etc.
   Allotjament Sense contingut Dades per illa
   Curiositats Pendent Contingut cultural i geogràfic
   Playlist Pendent Integració Spotify o llista
   Blog Pendent Diari del viatge en temps real
   Fotos restaurants Pendent Regenerar URLs Google o descarregar a img/restaurants/fotos/
   Marees reals IPMA Pendent Disponibles a partir
   Marees reals IPMA Pendent Disponibles a partir de maig-juny 2026
   Windy webcams Pendent CORS OK un cop publicat a GitHub Pages
   Adaptació mòbil Pendent Revisió general de responsivitat
6. Decisions tècniques importants

- Clau Google Maps restringida a https://jop-oss.github.io/_ i http://localhost:_
- Nominatim per geocoding (sense CORS, gratuït) en lloc de Google Geocoding API.
- Distàncies a capitals: càlcul únic guardat a localStorage per evitar crides a Google Distance Matrix.
- Botons estil mapa amb onclick HTML (no addEventListener): querySelector no troba els botons quan s'executa bindEvents.
- Fotos TA primer (URLs estables), Google al final (caduquen en dies).
- CartoDB sense {r} a la URL: causa mapa en blanc en alguns navegadors.
- Vídeos personatges: MP4 comprimit (no GIF). Format 1:1 per que el personatge sencer càpiga al cercle.
- Vídeos verticals (9:16): convertir a 1:1 amb VideoCandy + "Barras borrosas" abans de pujar.
- Animació personatge quiz: div 200×200 amb overflow:hidden + border-radius:50% (no aplicar border-radius al video).
- Persistència Quiz: localStorage clau quiz_estat_NOM per cada jugador.
- SENSE_PENALITZACIO = ['Jordi'] — RECORDAR ELIMINAR quan l'app estigui llesta.
- Ruleta canvas: avatars des de JPEG (img/avatars/Nom.jpeg), crop primer 70% alçada centrat horitzontalment.
- Ruleta pop-up/resultat: vídeo MP4 animat (nom_ruleta.mp4).
- Ruleta historial: img/avatars/Nom_cara.png (PNG cara retallat, 36×36 object-fit:cover).
- Service Worker registrat per PWA però funcionalitat offline no implementada.
- La Paraula Amagada: usa API Anthropic per generar paraules i pistes. Familiars i amics: llista tancada sense pistes.
  Document generat per Claude (Anthropic) · Projecte PWA Açores 2026 · Abril 2026 · v
