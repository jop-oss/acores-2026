/* ============================================================
   CURIOSITATS.JS  ·  Açores 2026
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────
   DADES
   ────────────────────────────────────────────────────────── */
const SECCIONS = [
  {
    id: 'sabies',
    titol: '🤔 Sabies que...?',
    emoji: '🤔',
    nom: 'Sabies que...?',
    cards: [
      {
        emoji: '🌍',
        titol: 'Les Açores estan sobre la unió de tres plaques tectòniques',
        tag: 'Geologia',
        illa: null,
        revers: 'Les Açores se situen exactament a la Junció Triple de l\'Atlàntic Nord, on les plaques Nord-americana, Euroasiàtica i Africana es troben. És l\'únic arxipèlag del món en aquesta posició tan especial, cosa que explica el seu vulcanisme actiu, les terratrèmols freqüents i les fonts termals.'
      },
      {
        emoji: '🏔️',
        titol: 'La Montanya do Pico és el punt més alt de Portugal',
        tag: 'Pico',
        illa: 'Pico',
        revers: 'Amb 2.351 metres sobre el nivell del mar, el volcà do Pico és la muntanya més alta de Portugal —superant fins i tot qualsevol cim continental. És un estratovolcà adormit. Si el mesuréssim des de la base submarina, tindria uns 8.000 metres, cosa que el convertiria en un dels volcans més grans del món.'
      },
      {
        emoji: '🌊',
        titol: 'Les illes Flores i Corvo estan sobre la placa americana',
        tag: 'Geologia',
        illa: null,
        revers: 'Totes les illes Açores estan sobre la placa Euroasiàtica, excepte Flores i Corvo, que tècnicament estan sobre la placa Nord-americana. Açores és l\'únic lloc d\'Europa situat físicament sobre dues plaques tectòniques diferents. Flores queda a tan sols 1.930 km de Terranova, al Canadà.'
      },
      {
        emoji: '🐳',
        titol: 'Un terç de totes les espècies de cetacis del planeta passen per aquí',
        tag: 'Natura',
        illa: null,
        revers: 'De les 81 espècies de cetacis conegudes al món, 28 han estat identificades en aigües açorianes. Les profunditats oceàniques al voltant de les illes superen els 3.000 metres prop de la costa, cosa que atreu tant espècies costaneres com oceàniques. El cachalot és el símbol turístic de les illes.'
      },
      {
        emoji: '🍳',
        titol: 'Hi ha un plat que es cou sota terra amb calor volcànica',
        tag: 'Gastronomia',
        illa: 'São Miguel',
        revers: 'El Cozido das Furnas és un guisat tradicional on les cassoles amb carn, verdures i embotits s\'entren a la terra vora les calderes geotèrmiques de Furnas, a São Miguel. Cuinen durant 6-7 hores només amb la calor del subsòl volcànic, a uns 100°C. El resultat és un sabor mineral únic impossible de replicar en cap cuina convencional.'
      },
      {
        emoji: '🌺',
        titol: 'Les hortènsies blaves que voregen les carreteres marquen les finques',
        tag: 'Cultura',
        illa: null,
        revers: 'Les omnipresents hortènsies blaves de les Açores no són simplement decoratives: les planten als laterals de les carreteres i camins rurals per delimitar propietats i finques, com si fossin tanques vegetals. El color blau intens és degut als sòls volcànics àcids rics en alumini, que alteren el pigment natural de la flor.'
      },
      {
        emoji: '🍷',
        titol: 'El vi del Pico va arribar a la taula dels tsars russos',
        tag: 'Pico',
        illa: 'Pico',
        revers: 'El Verdelho do Pico, produït en els peculiars "currals" de pedra negra volcànica que protegeixen les vinyes del vent atlàntic, va ser el vi preferit de la cort imperial russa al segle XIX. Les vinyes del Pico i el seu paisatge de "currals" estan reconeguts com a Patrimoni de la Humanitat per la UNESCO des del 2004.'
      },
      {
        emoji: '🌋',
        titol: 'A les Açores hi ha 18 sistemes volcànics actius terrestres',
        tag: 'Geologia',
        illa: null,
        revers: 'Dels 27 sistemes volcànics de tot l\'arxipèlag, 18 estan considerats actius, és a dir, que han tingut activitat durant l\'Holocè (últims 10.000 anys). L\'última erupció important va ser la del volcà Capelinhos al Faial el 1957-58, que va emergir del mar i va ampliar l\'illa uns 2,4 km². Avui és un dels volcans submarins emergents més ben preservats del món.'
      },
    ]
  },
  {
    id: 'geologia',
    titol: '🌋 Geologia i vulcanisme',
    emoji: '🌋',
    nom: 'Geologia',
    cards: [
      {
        emoji: '💥',
        titol: 'El volcà Capelinhos va néixer del mar davant dels ulls dels habitants',
        tag: 'Faial',
        illa: 'Faial',
        revers: 'El 27 de setembre de 1957, una erupció submarina va emergir a 800 metres de la costa del Faial. Durant 13 mesos, el volcà Capelinhos va anar creixent fins a ampliar l\'illa uns 2,4 km². L\'erupció va destruir centenars de cases i va obligar a evacuar milers de persones. Avui el Museu Capelinhos, parcialment soterrat en cendres, explica aquella catàstrofe que va canviar l\'illa per sempre.'
      },
      {
        emoji: '🏞️',
        titol: 'La Caldeira do Faial és un dels crateres millor conservats del planeta',
        tag: 'Faial',
        illa: 'Faial',
        revers: 'La caldeira central del Faial mesura 2 km de diàmetre i 400 metres de profunditat. El perímetre és d\'uns 8 km i es pot recórrer completament a peu amb vistes als dos costats. La vegetació interior és exuberant i molt diferent a l\'exterior de l\'illa, creant un microclima propi. L\'última erupció al sistema central del Faial data del segle XVIII.'
      },
      {
        emoji: '🌊',
        titol: 'Les fajãs de São Jorge, terres nascudes de la lava al peu dels penya-segats',
        tag: 'São Jorge',
        illa: 'São Jorge',
        revers: 'São Jorge és una illa allargada de 54 km amb penya-segats de fins a 700 metres. A la seva base s\'hi han format les "fajãs": extensions de terra plana creades per colades de lava o esllavissades antigues. Algunes tenen els seus propis microclimes i comunitats aïllades. La Fajã de Santo Cristo alberga les úniques ameijoes de riu de tot l\'arxipèlag.'
      },
      {
        emoji: '🕳️',
        titol: 'La Gruta das Torres és el major tub de lava d\'Europa',
        tag: 'Pico',
        illa: 'Pico',
        revers: 'La Gruta das Torres, al Pico, és un tub de lava de més de 5 km de longitud —el més llarg d\'Europa i un dels més grans del món. Es va formar fa milers d\'anys quan la capa exterior d\'una colada de lava es va solidificar mentre l\'interior continuava fluint, deixant un túnel buit. L\'interior conserva estalactites de lava, formacions úniques al món.'
      },
      {
        emoji: '♨️',
        titol: 'Les calderes de Furnas bullen a 100°C a pocs centímetres sota els peus',
        tag: 'São Miguel',
        illa: 'São Miguel',
        revers: 'A la Lagoa das Furnas, a São Miguel, el sòl és tan calent que s\'hi cuinen els menjars tradicionals enterrats. Les fumaroles emeten gasos de diòxid de carboni i sulfur d\'hidrogen. La temperatura de l\'aigua en alguns punts supera els 100°C. El parc geotèrmic és accessible al públic i permet veure bullir el subsòl literalment als peus del visitant.'
      },
      {
        emoji: '🔵',
        titol: 'Sete Cidades té dues llacunes de colors diferents dins el mateix cràter',
        tag: 'São Miguel',
        illa: 'São Miguel',
        revers: 'La Lagoa das Sete Cidades és un cràter de 12 km de perímetre on hi ha dues llacunes separades per un pont: la Lagoa Verde (verda) i la Lagoa Azul (blava). El color diferent no és un mite —la composició química lleugerament distinta i l\'angle d\'incidència de la llum solar expliquen el fenomen. Hi ha una llegenda d\'amor entre un príncep i una pastora que explica les dues aigües.'
      },
      {
        emoji: '🔥',
        titol: 'La Lagoa do Fogo és un llac dins d\'un cràter al cim de São Miguel',
        tag: 'São Miguel',
        illa: 'São Miguel',
        revers: 'La Lagoa do Fogo (Llac del Foc) és una reserva natural als 590 metres d\'altitud, al cràter del complex volcànic d\'Água de Pau, al centre de São Miguel. L\'aigua és d\'un verd-blavós intens i la zona al voltant és un dels ecosistemes més ben preservats de l\'arxipèlag. Sovint cobert de boira, té un aspecte misteriós i primigeni.'
      },
    ]
  },
  {
    id: 'fauna',
    titol: '🐋 Fauna i natura',
    emoji: '🐋',
    nom: 'Fauna',
    cards: [
      {
        emoji: '🔭',
        titol: 'Els antics vigies de balenes avui localitzen cetacis per als turistes',
        tag: 'Història',
        illa: null,
        revers: 'Durant segles, els vigies eren homes que des de postes situats als punts més alts de les illes localitzaven les balenes per als caçadors. Quan la caça va acabar als anys 80, els mateixos vigies van reconvertir la seva feina: ara comuniquen per ràdio amb les embarcacions d\'avistament. El coneixement generacional s\'ha preservat, canviant la mort per la contemplació.'
      },
      {
        emoji: '🐋',
        titol: 'El cachalot és resident permanent, no migratori',
        tag: 'Pico · Faial',
        illa: null,
        revers: 'A diferència d\'altres espècies de balenes que passen pels Açores en migració, el cachalot (Physeter macrocephalus) és resident tot l\'any. Les aigües profundes prop de la costa —que superen els 1.000 metres a pocs quilòmetres de terra— li proporcionen el calamar gegant que constitueix la seva dieta. Açores és un dels millors llocs del món per observar cachalots a l\'estiu.'
      },
      {
        emoji: '🐬',
        titol: 'El golfí roàs viu i es reprodueix tot l\'any a les Açores',
        tag: 'Natura',
        illa: null,
        revers: 'El roàs (Tursiops truncatus) o dofí mular és una de les espècies residents de les Açores, present tot l\'any. Les grups locals arriben a les 50-80 individus i han creat territoris estables. Als Açores és legal nadar amb dofins salvatges en condicions controlades, amb un màxim de 2 persones alhora i períodes de 15 minuts. Una experiència única regulada per llei.'
      },
      {
        emoji: '🐦',
        titol: 'El cagarro fa el seu niu als turons i emigra a l\'Atlàntic Sud',
        tag: 'Natura',
        illa: null,
        revers: 'El cagarro (Calonectris borealis) és una au marina endèmica de la Macaronèsia que cria en grans colònies als penya-segats açorians. A les nits d\'estiu, els seus crits estriduls omplen l\'aire. Cada any, en acabar la temporada de cria, emprèn una migració transoceànica fins a les costes de Brasil i Argentina, recorrent fins a 15.000 km en ambdós sentits.'
      },
      {
        emoji: '🌿',
        titol: 'L\'arxipèlag pertany a la Macaronèsia, una de les zones de biodiversitat més riques d\'Europa',
        tag: 'Natura',
        illa: null,
        revers: 'Les Açores formen part de la regió biogeogràfica de la Macaronèsia, juntament amb Madeira, les Canàries i Cap Verd. L\'aïllament de les illes durant milions d\'anys ha donat lloc a nombroses espècies endèmiques: plantes, insectes, aus i mol·luscs que no existeixen en cap altre lloc del planeta. Molts boscos açorians de llorer (laurisilva) han sobreviscut des de l\'era Terciària.'
      },
      {
        emoji: '🌸',
        titol: 'Les hortènsies, símbols de les Açores, van arribar de l\'Àsia al segle XVIII',
        tag: 'Flora',
        illa: null,
        revers: 'Les hortènsies (Hydrangea macrophylla) van ser introduïdes a les Açores al voltant del 1800, originàries de l\'Àsia Oriental. En el sòl volcànic àcid açorià, les flors absorbeixen alumini i es tornen d\'un blau intens inigualable. La planta s\'ha naturalitzat tan completament que avui és quasi invasora. Floreixen de juny a octubre, just quan visitareu les illes.'
      },
      {
        emoji: '🐢',
        titol: 'Les tortugues marines utilitzen les Açores com a punt de descans migratori',
        tag: 'Natura',
        illa: null,
        revers: 'La tortuga babaua (Caretta caretta) utilitza les aigües açorianes com a zona d\'alimentació i descans durant les seves llargues migracions atlàntiques. L\'arxipèlag, situat al mig de l\'Atlàntic, actua com a punt estratègic en la ruta entre les costes americanes i les platges de desova mediterrànies. Avistaments des de barca durant l\'estiu són relativament habituals.'
      },
    ]
  },
  {
    id: 'gastronomia',
    titol: '🍽️ Gastronomia',
    emoji: '🍽️',
    nom: 'Gastronomia',
    cards: [
      {
        emoji: '🧀',
        titol: 'El Queijo de São Jorge: picant, curat i únic al món',
        tag: 'São Jorge',
        illa: 'São Jorge',
        revers: 'El Queijo de São Jorge DOP és un formatge semidur de llet crua de vaca, amb un mínim de 3 mesos de maduració (tot i que els millors arriben a 7 mesos). El seu sabor va de mantegós a picant persistent, influenciat per les pastures variades de l\'illa, plenes d\'herbes aromàtiques. La tècnica va ser introduïda per colonitzadors flamencs al segle XV i avui té denominació d\'origen protegida.'
      },
      {
        emoji: '🍷',
        titol: 'El vinho do Pico creix en "currals" de pedra negra volcànica',
        tag: 'Pico',
        illa: 'Pico',
        revers: 'Les vinyes del Pico creixen en un paisatge únic de "currals": murs baixos de pedra basàltica negra que divideixen el terreny en petites parcel·les per protegir les ceps del vent i la salinitat atlàntica. El Verdelho és la varietat principal, produint vins blancs secs amb notes minerals i una salinitat característica. Tot aquest paisatge vinícola és Patrimoni de la Humanitat UNESCO des del 2004.'
      },
      {
        emoji: '🦪',
        titol: 'Les ameijoes de la Fajã de Santo Cristo: les úniques de les Açores',
        tag: 'São Jorge',
        illa: 'São Jorge',
        revers: 'A la Fajã da Caldeira de Santo Cristo, a São Jorge, hi ha una llacuna de baixa profunditat on creixen les úniques ameijoes salvatges de tot l\'arxipèlag. La seva mida, textura carnosa i sabor han fet d\'aquest mol·lusc una autèntica joia gastronòmica, quasi impossible de trobar fora de São Jorge. La receita jorgense és senzilla: ceba, all, vinho blanc i pimenta da terra.'
      },
      {
        emoji: '🍍',
        titol: 'Les Açores produeixen els únics ananassos d\'Europa',
        tag: 'São Miguel',
        illa: 'São Miguel',
        revers: 'São Miguel és l\'únic lloc d\'Europa on es conreen ananassos, en grans hivernacles de vidre que simulen el clima tropical. El procés dura fins a 18 mesos i s\'induseix la floració amb fum de llenya. El resultat és un fruit més petit que el tropical, amb una dolçor intensa i molta menys acidesa. Es venen directament a les plantacions i en alguns mercats locals.'
      },
      {
        emoji: '🐟',
        titol: 'Les lapas i cracas: el sabor pur de l\'oceà Atlàntic',
        tag: 'Gastronomia',
        illa: null,
        revers: 'Les lapas (Patella aspera) es cuinen a la graella amb mantega, all i llimona —un plat omnipresent a tots els restaurants. Les cracas, en canvi, semblen fragments de roca volcànica i es mengen crues o lleugerament bullides amb la pròpia aigua del mar. El seu sabor és una concentració absoluta d\'oceà. Molt poques cuines del món les serveixen; a les Açores és imprescindible.'
      },
      {
        emoji: '☕',
        titol: 'L\'única plantació de te d\'Europa sobreviu a São Miguel des del 1873',
        tag: 'São Miguel',
        illa: 'São Miguel',
        revers: 'La Fàbrica de Chá Gorreana, a São Miguel, és la plantació de te activa més antiga d\'Europa i l\'única que queda. Fundada el 1883, produeix te negre i te verd en un paisatge de terrasses verdes espectaculars. La visita és gratuïta i es pot veure tot el procés de producció, des de la collita fins al paquet final. El te és ecològic i es ven exclusivament a la fàbrica.'
      },
      {
        emoji: '🥩',
        titol: 'El cozido das Furnas: sis hores de cocció geotèrmica',
        tag: 'São Miguel',
        illa: 'São Miguel',
        revers: 'El cozido das Furnas és el plat més emblemàtic de les Açores. Carn de porc, vedella, pollastre, chouriço, morcela, patates, col, pastanaga i inhame es posen en una cassola de fang i s\'enterra a les vores de les calderes geotèrmiques de Furnas. Sis o set hores de cocció lenta a 100°C donen un sabor mineral i fumat inimitable. Es prepara des de primera hora del matí per servir al migdia.'
      },
    ]
  },
  {
    id: 'historia',
    titol: '🏛️ Història i cultura',
    emoji: '🏛️',
    nom: 'Història',
    cards: [
      {
        emoji: '⚓',
        titol: 'Les Açores van ser descobertes i poblades pels portuguesos al segle XV',
        tag: 'Història',
        illa: null,
        revers: 'Les illes estaven desertes quan els portuguesos les van descobrir entre 1427 i 1452. El poblament va ser gradual i divers: gent del Minho, Alentejo i Algarve, però també flamencs (especialment al grup central), castellans i genovesos. La influència flamenca va ser tan profunda que el Faial durant segles va ser conegut com "l\'illa dels Flamencs". Avui els cognoms Bruges, Silveira o Lacerda recorden aquell origen.'
      },
      {
        emoji: '🐋',
        titol: 'La caça de balenes als Açores va durar fins al 1987',
        tag: 'Història',
        illa: null,
        revers: 'La indústria balaenera va ser introduïda als Açores pels americans al segle XVIII. En el punt màxim, desenes de vaixells baleners passaven per les illes per abastir-se i reclutar homes. L\'última cacera als Açores va ser el 1987. El Museu da Indústria Baleeira de São Roque do Pico (a poca distància del Prainha Apartments!) documenta aquesta història amb els bots originals i els utensilis de caça.'
      },
      {
        emoji: '✏️',
        titol: 'La marina de Horta és famosa pels murals que deixen els navegants del món',
        tag: 'Faial',
        illa: 'Faial',
        revers: 'La marina de Horta, al Faial, és una escala obligatòria per als navegants que travessen l\'Atlàntic. Des de fa dècades, és tradició que cada tripulació pinti el seu logotip, el nom del vaixell i la data en qualsevol espai disponible del port. Avui hi ha milers de murals que cobreixen tots els murs i paviments. La llegenda diu que qui no pinta porta mala sort en la travessia.'
      },
      {
        emoji: '🍺',
        titol: 'El Peter Café Sport és el bar més famós de l\'Atlàntic Nord',
        tag: 'Faial',
        illa: 'Faial',
        revers: 'El Peter Café Sport de Horta, fundat el 1918, és el punt de trobada de tots els navegants transatlàntics des de fa més d\'un segle. El seu propietari, l\'excèntric "Peter" José Azevedo, va crear també un museu de Scrimshaw —gravats sobre dents de cachalot que feien els mariners balaeners per passar el temps. Es considera que el Peter Café és el segon bar amb més visitants de nacions diverses del món.'
      },
      {
        emoji: '🌺',
        titol: 'La Festa do Espírito Santo: la tradició religiosa més arrelada de les illes',
        tag: 'Cultura',
        illa: null,
        revers: 'La Festa do Espírito Santo és la manifestació cultural i religiosa més important de les Açores, celebrada cada any entre Pasqua i Pentecosta. Cada barri té la seva pròpia "Império" (capella), i cada setmana es fa una festa diferent amb processons, músiques i el repartiment gratuït de menjar —les Sopas do Espírito Santo— entre tots els presents. La tradició data del segle XIV i va viatjar amb els emigrants açorians fins als EUA i el Brasil.'
      },
      {
        emoji: '📡',
        titol: 'Les Açores van ser punt estratègic en ambdues guerres mundials',
        tag: 'Història',
        illa: null,
        revers: 'La posició geogràfica al centre de l\'Atlàntic va convertir les Açores en punt clau en els dos conflictes mundials. A la Primera Guerra Mundial, les Açores van patir atacs de submarins alemanys. A la Segona, les illes van allotjar bases militars aliades —especialment al Faial i Terceira— per protegir les rutes atlàntiques. La base dels Lajes (Terceira) continua sent una instal·lació militar de l\'OTAN avui dia.'
      },
      {
        emoji: '🎭',
        titol: 'La música tradicional açoriana té el "chicharito" com a instrument propi',
        tag: 'Cultura',
        illa: null,
        revers: 'La música tradicional de les Açores barreja influències portugueses, flamences i africanes. El "baile do carnaval" i les marchas são característiques de cada illa. El "chicharito" és una mena de guatlla de fusta que produeix sons percussius únics. Cada illa té les seves pròpies tonades i balls, conservats en festes populars i concursos. La música en viu als festivals de l\'estiu és una experiència genuïna.'
      },
    ]
  }
];

/* ──────────────────────────────────────────────────────────
   RENDER
   ────────────────────────────────────────────────────────── */
function renderFiltres() {
  const wrap = document.getElementById('curFiltres');
  const tots = document.createElement('button');
  tots.className = 'cur-filtre-btn actiu';
  tots.dataset.seccio = 'totes';
  tots.innerHTML = '<span class="cur-filtre-emoji">✨</span> Totes';
  tots.addEventListener('click', () => filtra('totes'));
  wrap.appendChild(tots);

  SECCIONS.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'cur-filtre-btn';
    btn.dataset.seccio = s.id;
    btn.innerHTML = `<span class="cur-filtre-emoji">${s.emoji}</span> ${s.nom}`;
    btn.addEventListener('click', () => filtra(s.id));
    wrap.appendChild(btn);
  });
}

function filtra(id) {
  document.querySelectorAll('.cur-filtre-btn').forEach(b => b.classList.toggle('actiu', b.dataset.seccio === id));
  document.querySelectorAll('.cur-seccio').forEach(s => {
    if (id === 'totes') {
      s.style.display = '';
    } else {
      s.style.display = s.dataset.id === id ? '' : 'none';
    }
  });
  if (id !== 'totes') {
    const el = document.querySelector(`.cur-seccio[data-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderSeccions() {
  const wrap = document.getElementById('curSeccions');
  SECCIONS.forEach((s, si) => {
    const seccio = document.createElement('section');
    seccio.className = 'cur-seccio';
    seccio.dataset.id = s.id;
    seccio.style.animationDelay = `${si * 0.07}s`;

    seccio.innerHTML = `
      <div class="cur-seccio-header">
        <span class="cur-seccio-emoji">${s.emoji}</span>
        <h2 class="cur-seccio-titol">${s.nom === 'Sabies que...?' ? 'Sabies que...?' : s.nom}</h2>
        <span class="cur-seccio-count">${s.cards.length} curiositats</span>
      </div>
      <div class="cur-grid" id="grid-${s.id}"></div>
    `;
    wrap.appendChild(seccio);

    const grid = seccio.querySelector(`#grid-${s.id}`);
    s.cards.forEach((c, ci) => {
      const wrap2 = document.createElement('div');
      wrap2.className = 'cur-card-wrap' + (s.id === 'sabies' ? ' sabies' : '');
      wrap2.style.animationDelay = `${si * 0.07 + ci * 0.04}s`;
      wrap2.innerHTML = `
        <div class="cur-card-inner">
          <div class="cur-card-front">
            <div>
              <span class="cur-card-tag">${c.illa ? '🏝 ' + c.illa : c.tag}</span>
              <div class="cur-card-emoji-gran">${c.emoji}</div>
              <div class="cur-card-titol">${c.titol}</div>
            </div>
            <div class="cur-card-hint">Toca per saber-ne més</div>
          </div>
          <div class="cur-card-back">
            <div>
              <div class="cur-card-back-titol">${c.titol}</div>
              <div class="cur-card-back-text">${c.revers}</div>
            </div>
            <div class="cur-card-back-tag">${c.illa ? '🏝 ' + c.illa : '🌋 ' + c.tag}</div>
          </div>
        </div>
      `;
      wrap2.addEventListener('click', () => wrap2.classList.toggle('girada'));
      grid.appendChild(wrap2);
    });
  });
}

/* ──────────────────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderFiltres();
  renderSeccions();
});
