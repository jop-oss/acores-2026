// ── REPTES · Dades inicials ───────────────────────────────────
// Aquests reptes es carreguen a Firebase la primera vegada.
// Els nous reptes afegits durant el viatge es guarden directament a Firebase.

const REPTES_INICIALS = [
  "Banya't a l'oceà Atlàntic de nit",
  "Menja alguna cosa que no sàpigues què és",
  "Parla en portuguès amb algú",
  "Fes un mortal",
  "Puja a dalt d'un volcà",
  "Fes una tombarella",
  "Aprèn a dir 5 paraules en portuguès",
  "Fes l'espagat, aguanta durant un minut i que el Xu el faci una foto",
  "Ves durant tots els trajectes d'un dia al mateix cotxe que la Mons",
  "Menja en un restaurant sense mirar la carta (que el cambrer decideixi)",
  "Fes un flic-flac",
  "Camina enrere durant 5 minuts seguits",
  "Banya't en una font termal",
  "Fes una foto al sortir el sol",
  "Camina descalç per la vora del mar",
  "Fes una tombarella a cada illa",
  "Fes una rondada davant de desconeguts",
  "Banya't en aigües a menys de 16 graus",
  "Troba un lloc des d'on es vegin dues illes alhora",
  "Fes senderisme fins a un mirador sense mapa",
  "Prova el vi negre del Pico",
  "Compra alguna cosa en un mercat local",
  "Fes una foto amb algú que no coneixes",
  "Banya't a 3 platges diferents en un sol dia",
  "Enfila't a un arbre",
  "Neda fins a un illot o roca al mar",
  "Corre fins a un mirador sense parar (mínim 1 km)",
  "Parla amb algú cantant durant 5 minuts",
  "No diguis ni \"sí\" ni \"no\" durant tota una excursió",
  "Fes escalada o via ferrata",
];

const REPTES_COL = 'reptes_partida';
const REPTES_DOC = 'activa';
const REPTES_PIN = '2468';
