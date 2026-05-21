/* ============================================================
   PORTUGUES.JS  ·  Açores 2026
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────
   DADES — FRASES I EXPRESSIONS
   ────────────────────────────────────────────────────────── */
const SECCIONS = [
  {
    id: 'salutacions',
    emoji: '🗣️',
    titol: 'Salutacions i cortesia',
    frases: [
      { ca: 'Hola!',                          pt: 'Olá!',                           f: 'o-LÀ' },
      { ca: 'Bon dia',                         pt: 'Bom dia',                        f: 'bom DÍ-a' },
      { ca: 'Bona tarda',                      pt: 'Boa tarde',                      f: 'boa TAR-de' },
      { ca: 'Bona nit',                        pt: 'Boa noite',                      f: 'boa NOI-te' },
      { ca: 'Gràcies',                         pt: 'Obrigado / Obrigada',            f: 'o-bri-GÀ-du / o-bri-GÀ-da' },
      { ca: 'De res',                          pt: 'De nada',                        f: 'de NÀ-da' },
      { ca: 'Si us plau',                      pt: 'Por favor',                      f: 'pur fa-VOR' },
      { ca: 'Perdona / Disculpa',              pt: 'Com licença / Desculpe',         f: 'con li-SEN-sa / des-KUL-pe' },
      { ca: 'No entenc',                       pt: 'Não entendo',                    f: 'nãu en-TEN-du' },
      { ca: 'Parles anglès?',                  pt: 'Fala inglês?',                   f: 'FÀ-la in-GLÈSH?' },
      { ca: 'Fins aviat!',                     pt: 'Até logo!',                      f: 'a-TÈ LO-gu!' },
      { ca: 'Adéu',                           pt: 'Adeus',                          f: 'a-DÉUSH' },
      { ca: 'Fins ara!',                       pt: 'Até já!',                        f: 'a-TÈ JÀ!' },
      { ca: 'Encantat/da de conèixer-te',      pt: 'Prazer em conhecê-lo/la',        f: 'pra-ZER em ku-ñe-SÈ-lu/la' },
      { ca: 'Em dic...',                       pt: 'Chamo-me...',                    f: 'XÀ-mu-me...' },
      { ca: 'Com et dius?',                    pt: 'Como se chama?',                 f: 'KO-mu se XÀ-ma?' },
      { ca: 'Com estàs?',                      pt: 'Como está?',                     f: 'KO-mu es-TÀ?' },
      { ca: 'Tot bé',                          pt: 'Tudo bem',                       f: 'TU-du bèm' },
      { ca: 'Moltes gràcies',                  pt: 'Muito obrigado/a',               f: 'MUI-tu o-bri-GÀ-du/da' },
      { ca: 'Ho sento',                        pt: 'Desculpe / Lamento',             f: 'des-KUL-pe / la-MEN-tu' },
      { ca: 'Ok, d\u0027acord',                  pt: 'Ok, tudo bem',                   f: 'ok, TU-du bèm' },
      { ca: 'Parles espanyol?',                pt: 'Fala espanhol?',                 f: 'FÀ-la es-pa-ÑOLL?' },
      { ca: 'Quina hora és?',                  pt: 'Que horas são?',                 f: 'ke Ó-ras sãu?' },
      { ca: 'On és el bany/lavabo?',           pt: 'Onde é a casa de banho?',        f: 'ON-de è a KÀ-za de BÀ-ñu?' },
      { ca: 'Ens pots tirar una foto?',        pt: 'Pode tirar-nos uma foto?',       f: 'PO-de ti-RAR-nus ú-ma FO-tu?' },
      { ca: 'Què és això?',                    pt: 'O que é isso?',                  f: 'u ke è Í-su?' },
    ]
  },
  {
    id: 'restaurants',
    emoji: '🍽️',
    titol: 'Restaurants i menjar',
    frases: [
      { ca: 'Una taula per a sis persones',    pt: 'Uma mesa para seis pessoas',     f: 'ú-ma MÈ-za pa-ra SÈISH pe-SO-as' },
      { ca: 'La carta, si us plau',            pt: 'O menu, por favor',              f: 'u me-NU, pur fa-VOR' },
      { ca: 'Què ens recomana?',               pt: 'O que nos recomenda?',           f: 'u ke nus re-ku-MEN-da?' },
      { ca: 'Sóc al·lèrgic a...',             pt: 'Sou alérgico a...',              f: 'so a-LÈR-ji-ku a...' },
      { ca: 'Sense gluten',                    pt: 'Sem glúten',                     f: 'sèm GLHU-ten' },
      { ca: 'El compte, si us plau',           pt: 'A conta, por favor',             f: 'a KON-ta, pur fa-VOR' },
      { ca: 'Està molt bo!',                   pt: 'Está muito bom!',                f: 'es-TÀ MUI-tu bom!' },
      { ca: 'Aigua amb/sense gas',             pt: 'Água com/sem gás',               f: 'À-gua com/sèm GÀSH' },
      { ca: 'Un got de vi negre/blanc',        pt: 'Um copo de vinho tinto/branco',  f: 'um KO-pu de VI-ñu TIN-tu/BRAN-ku' },
      { ca: 'Per emportar',                    pt: 'Para levar',                     f: 'PA-ra le-VAR' },
      { ca: 'Que aprofiti!',                   pt: 'Bom proveito!',                  f: 'bom pro-VEI-tu!' },
    ]
  },
  {
    id: 'transport',
    emoji: '🚗',
    titol: 'Transport i orientació',
    frases: [
      { ca: 'On és...?',                       pt: 'Onde fica...?',                  f: 'ON-de FÍ-ka...?' },
      { ca: 'Com arribo a...?',                pt: 'Como chego a...?',               f: 'KO-mu XÈ-gu a...?' },
      { ca: 'Quant de temps triga?',           pt: 'Quanto tempo demora?',           f: 'KUAN-tu TEM-pu de-MO-ra?' },
      { ca: 'A quina distància és?',           pt: 'A que distância fica?',          f: 'a ke dis-TAN-sia FÍ-ka?' },
      { ca: 'La carretera és bona?',           pt: 'A estrada está boa?',            f: 'a es-TRÀ-da es-TÀ BO-a?' },
      { ca: 'Puc aparcar aquí?',               pt: 'Posso estacionar aqui?',         f: 'PO-su es-ta-sio-NAR a-KI?' },
      { ca: 'Necessito gasolina',              pt: 'Preciso de gasolina',            f: 'pre-SÍ-zu de ga-zu-LÍ-na' },
      { ca: 'El GPS no funciona',              pt: 'O GPS não funciona',             f: 'u jè-pè-ÈS nãu fun-SIO-na' },
      { ca: 'Hem perdut el camí',              pt: 'Perdemos o caminho',             f: 'per-DÈ-mus u ka-MÍ-ñu' },
      { ca: 'A on podem agafar un taxi?',      pt: 'Onde podemos apanhar um táxi?',  f: 'ON-de pu-DÈ-mus a-pa-ÑÀAR um TÀK-si?' },
      { ca: 'Esquerra / Dreta',                pt: 'Esquerda / Direita',             f: 'es-KÈR-da / di-REI-ta' },
      { ca: 'Perdoni, com puc arribar al carrer...?', pt: 'Com licença, como posso chegar à rua...?', f: 'com li-SEN-sa, KO-mu PO-su xe-GAR à RÚ-a...?' },
    ]
  },
  {
    id: 'allotjament',
    emoji: '🏠',
    titol: 'Allotjament',
    frases: [
      { ca: 'Tinc una reserva',                pt: 'Tenho uma reserva',              f: 'TÈ-ñu ú-ma re-ZÈR-va' },
      { ca: 'A quina hora és el check-in?',    pt: 'A que horas é o check-in?',      f: 'a ke Ó-ras è u TXEK-in?' },
      { ca: 'A quina hora s\'ha de deixar?',   pt: 'A que horas é o check-out?',     f: 'a ke Ó-ras è u TXEK-aut?' },
      { ca: 'On és la clau?',                  pt: 'Onde está a chave?',             f: 'ON-de es-TÀ a XÀ-ve?' },
      { ca: 'No funciona el wifi',             pt: 'O wifi não funciona',            f: 'u UAI-fai nãu fun-SIO-na' },
      { ca: 'No hi ha aigua calenta',          pt: 'Não há água quente',             f: 'nãu à À-gua KEN-te' },
      { ca: 'Necessitem més tovalloles',       pt: 'Precisamos de mais toalhas',     f: 'pre-si-ZÀ-mus de MÀISH tua-LAS' },
      { ca: 'L\'aire condicionat no va',       pt: 'O ar condicionado não funciona', f: 'u ar con-di-sio-NÀ-du nãu fun-SIO-na' },
    ]
  },
  {
    id: 'compres',
    emoji: '🛒',
    titol: 'Compres',
    frases: [
      { ca: 'Quant costa?',                    pt: 'Quanto custa?',                  f: 'KUAN-tu KUS-ta?' },
      { ca: 'És molt car',                     pt: 'É muito caro',                   f: 'è MUI-tu KÀ-ru' },
      { ca: 'Té alguna cosa més barata?',      pt: 'Tem algo mais barato?',          f: 'tèm AL-gu màish ba-RÀ-tu?' },
      { ca: 'Em poso aquest?',                 pt: 'Posso experimentar este?',       f: 'PO-su es-pe-ri-men-TAR ÈS-te?' },
      { ca: 'On és la caixa?',                 pt: 'Onde é a caixa?',                f: 'ON-de è a KAI-xa?' },
      { ca: 'Pago amb targeta',                pt: 'Pago com cartão',                f: 'PÀ-gu com kar-TÃU' },
      { ca: 'Té bossa?',                       pt: 'Tem saco?',                      f: 'tèm SÀ-ku?' },
      { ca: 'Em pot fer un tiquet?',           pt: 'Pode me dar um recibo?',         f: 'PO-de me dar um re-SÍ-bu?' },
    ]
  },
  {
    id: 'emergencies',
    emoji: '🆘',
    titol: 'Emergències',
    frases: [
      { ca: 'Necessito ajuda!',                pt: 'Preciso de ajuda!',              f: 'pre-SÍ-zu de a-JU-da!' },
      { ca: 'Truqueu al 112!',                 pt: 'Ligue para o 112!',              f: 'LÍ-gue PA-ra u cent dotze!' },
      { ca: 'Necessito un metge',              pt: 'Preciso de um médico',           f: 'pre-SÍ-zu de um MÈ-di-ku' },
      { ca: 'He tingut un accident',           pt: 'Tive um acidente',               f: 'TÍ-ve um a-si-DEN-te' },
      { ca: 'M\'han robat',                    pt: 'Fui roubado/a',                  f: 'fui ro-BÀ-du/da' },
      { ca: 'On és l\'hospital?',              pt: 'Onde fica o hospital?',          f: 'ON-de FÍ-ka u osh-pi-TAL?' },
      { ca: 'Em trobo malament',               pt: 'Não me sinto bem',               f: 'nãu me SIN-tu bèm' },
      { ca: 'Al·lèrgia greu',                  pt: 'Alergia grave',                  f: 'a-ler-JÍ-a GRÀ-ve' },
      { ca: 'Sóc diabètic/a',                  pt: 'Sou diabético/a',                f: 'so di-a-BÈ-ti-ku/ka' },
    ]
  },
  {
    id: 'acores',
    emoji: '🌋',
    titol: 'Expressions açorianes',
    frases: [
      { ca: 'Les Açores',                      pt: 'Os Açores',                      f: 'uz a-SO-res' },
      { ca: 'Illa',                            pt: 'Ilha',                           f: 'Í-lia' },
      { ca: 'Volcà / Caldeira',               pt: 'Vulcão / Caldeira',              f: 'vul-KÃU / kal-DEI-ra' },
      { ca: 'Llacuna',                         pt: 'Lagoa',                          f: 'la-GO-a' },
      { ca: 'Penya-segat',                     pt: 'Falésia',                        f: 'fa-LÈ-zia' },
      { ca: 'Fonts termals',                   pt: 'Termas / Caldeiras',             f: 'TÈR-mas / kal-DEI-ras' },
      { ca: 'Avistament de balenes',           pt: 'Observação de baleias',          f: 'ob-ser-va-SÃU de ba-LEI-as' },
      { ca: 'Bon vent i bona mar!',            pt: 'Bons ventos e boa viagem!',      f: 'bons VEN-tus e BO-a vi-À-jem!' },
    ]
  },
  {
    id: 'aliments',
    emoji: '🥗',
    titol: 'Aliments',
    frases: [
      { ca: 'Pa',                              pt: 'Pão',                            f: 'pãu' },
      { ca: 'Llet',                            pt: 'Leite',                          f: 'LEI-te' },
      { ca: 'Cafè',                            pt: 'Café',                           f: 'ka-FÈ' },
      { ca: 'Carn',                            pt: 'Carne',                          f: 'KAR-ne' },
      { ca: 'Pollastre',                       pt: 'Frango',                         f: 'FRAN-gu' },
      { ca: 'Vedella',                         pt: 'Vaca / Vitela',                  f: 'VÀ-ka / vi-TÈ-la' },
      { ca: 'Carn de porc',                    pt: 'Porco',                          f: 'POR-ku' },
      { ca: 'Peix',                            pt: 'Peixe',                          f: 'PEI-xe' },
      { ca: 'Pasta',                           pt: 'Massa',                          f: 'MÀ-sa' },
      { ca: 'Amanida',                         pt: 'Salada',                         f: 'sa-LÀ-da' },
      { ca: 'Ous',                             pt: 'Ovos',                           f: 'Ó-vus' },
      { ca: 'Postres',                         pt: 'Sobremesa',                      f: 'so-bre-MÈ-za' },
      { ca: 'Patates fregides',                pt: 'Batatas fritas',                 f: 'ba-TÀ-tas FRÍ-tas' },
      { ca: 'Oli',                             pt: 'Azeite',                         f: 'a-ZEI-te' },
      { ca: 'Vinagre',                         pt: 'Vinagre',                        f: 'vi-NÀ-gre' },
      { ca: 'Vull un suc de pinya/taronja/préssec', pt: 'Quero um sumo de ananás/laranja/pêssego', f: 'KÈ-ru um SU-mu de a-na-NÀS/la-RAN-xa/PÈ-se-gu' },
    ]
  },
  {
    id: 'numeros',
    emoji: '🔢',
    titol: 'Números, dies i pronoms',
    frases: [
      { ca: 'U, dos, tres, quatre, cinc',      pt: 'Um, dois, três, quatro, cinco',  f: 'um, doish, trèsh, KUÀT-ru, SIN-ku' },
      { ca: 'Sis, set, vuit, nou, deu',        pt: 'Seis, sete, oito, nove, dez',   f: 'seish, SÈ-te, OI-tu, NÓ-ve, dèsh' },
      { ca: 'Ahir / Avui / Demà',              pt: 'Ontem / Hoje / Amanhã',          f: 'ON-tem / O-xe / a-ma-ÑÀ' },
      { ca: 'Demà passat',                     pt: 'Depois de amanhã',               f: 'de-POISH de a-ma-ÑÀ' },
      { ca: 'Dilluns, dimarts, dimecres',      pt: 'Segunda, terça, quarta',         f: 'se-GUN-da, TÈR-sa, KUÀR-ta' },
      { ca: 'Dijous, divendres',               pt: 'Quinta, sexta',                  f: 'KIN-ta, SÈSH-ta' },
      { ca: 'Dissabte, diumenge',              pt: 'Sábado, domingo',                f: 'SÀ-ba-du, du-MIN-gu' },
      { ca: 'Jo, tu, ell/ella',                pt: 'Eu, tu, ele/ela',                f: 'eu, tu, È-le/È-la' },
      { ca: 'Nosaltres, vosaltres, ells/elles', pt: 'Nós, vós, eles/elas',           f: 'nosh, vosh, È-les/È-las' },
    ]
  },
];

/* ──────────────────────────────────────────────────────────
   TEXT-TO-SPEECH
   ────────────────────────────────────────────────────────── */
let utterActiva = null;

function parla(text, btn) {
  if (!('speechSynthesis' in window)) {
    alert('El teu navegador no suporta la síntesi de veu.');
    return;
  }
  // Si ja parlava, para
  window.speechSynthesis.cancel();
  if (btn?.classList.contains('parlant')) {
    btn.classList.remove('parlant');
    utterActiva = null;
    return;
  }

  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'pt-PT';
  utt.rate = 1.0;
  utt.pitch = 1;

  // Intenta usar veu portuguesa si existeix
  const veus = window.speechSynthesis.getVoices();
  const veuPT = veus.find(v => v.lang.startsWith('pt'));
  if (veuPT) utt.voice = veuPT;

  if (btn) {
    btn.classList.add('parlant');
    utt.onend = () => btn.classList.remove('parlant');
    utt.onerror = () => btn.classList.remove('parlant');
  }
  utterActiva = utt;
  window.speechSynthesis.speak(utt);
}

/* ──────────────────────────────────────────────────────────
   TRADUCTOR (MyMemory API — gratuïta, bidireccional)
   ────────────────────────────────────────────────────────── */
let dirTrad = 'ca|pt'; // direcció actual

function actualitzaDir() {
  const label = document.getElementById('tradDirLabel');
  const input = document.getElementById('tradInput');
  if (dirTrad === 'ca|pt') {
    label.textContent = 'CA → PT';
    input.placeholder = 'Escriu en català...';
  } else {
    label.textContent = 'PT → CA';
    input.placeholder = 'Escreve em português...';
  }
  // Neteja resultat anterior
  document.getElementById('tradResultWrap').classList.remove('visible');
}
async function tradueix() {
  const text = document.getElementById('tradInput').value.trim();
  if (!text) return;

  const btn = document.getElementById('tradBtn');
  btn.classList.add('carregant');
  btn.querySelector('.pt-trad-btn-text').textContent = 'Traduint...';

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${dirTrad}&de=acores2026@viatge.cat`;
    const resp = await fetch(url);
    const data = await resp.json();
    const traduccio = data.responseData?.translatedText || 'Error en la traducció';

    const wrap = document.getElementById('tradResultWrap');
    document.getElementById('tradResult').textContent = traduccio;
    wrap.classList.add('visible');
    wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch {
    document.getElementById('tradResult').textContent = 'Error de connexió. Prova-ho de nou.';
    document.getElementById('tradResultWrap').classList.add('visible');
  } finally {
    btn.classList.remove('carregant');
    btn.querySelector('.pt-trad-btn-text').textContent = 'Tradueix';
  }
}

/* ──────────────────────────────────────────────────────────
   TRADUCTOR DE FOTO (Claude Vision)
   ────────────────────────────────────────────────────────── */
let fotoTradBase64 = null;
let fotoTradMime   = null;

document.addEventListener('DOMContentLoaded', () => {
  const inputFoto = document.getElementById('fotoTradInput');
  if (!inputFoto) return;

  inputFoto.addEventListener('change', () => {
    const file = inputFoto.files[0];
    if (!file) return;

    // Comprova mida màxima (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La foto és massa gran. El màxim és 5 MB.');
      inputFoto.value = '';
      return;
    }

    fotoTradMime = file.type || 'image/jpeg';
    const reader = new FileReader();
    reader.onload = e => {
      fotoTradBase64 = e.target.result.split(',')[1]; // només el base64
      // Mostra preview
      const zona = document.getElementById('ptFotoZonaInner');
      zona.innerHTML = `
        <img src="${e.target.result}" alt="Preview"
             style="max-width:100%;max-height:200px;border-radius:8px;object-fit:contain;">
        <span style="font-size:0.75rem;color:var(--pt-muted);margin-top:6px">
          Toca per canviar la foto
        </span>`;
      document.getElementById('fotoTradBtn').style.display = 'flex';
      document.getElementById('fotoTradResultWrap').classList.remove('visible');
    };
    reader.readAsDataURL(file);
  });

  // Copiar resultat foto
  document.getElementById('fotoTradCopy')?.addEventListener('click', () => {
    const text = document.getElementById('fotoTradResult').textContent;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('fotoTradCopy');
      btn.textContent = '✅ Copiat!';
      setTimeout(() => { btn.textContent = '📋 Copiar'; }, 1500);
    });
  });
});

async function tradueixFoto() {
  if (!fotoTradBase64) return;

  const btn = document.getElementById('fotoTradBtn');
  btn.classList.add('carregant');
  btn.querySelector('.pt-trad-btn-text').textContent = 'Analitzant...';

  try {
    const apiKey = typeof CONFIG !== 'undefined' ? CONFIG.ANTHROPIC_API_KEY : null;
    if (!apiKey) throw new Error('Clau API no disponible');

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: fotoTradMime,
                data: fotoTradBase64,
              }
            },
            {
              type: 'text',
              text: 'Aquesta imatge conté text. Si us plau:\n1. Extreu tot el text que hi veus (en l\'idioma original)\n2. Tradueix-lo al català\n\nRespon en aquest format exacte:\nORIGINAL:\n[el text en l\'idioma original]\n\nTRADUCCIÓ:\n[la traducció al català]\n\nSi la imatge no conté text llegible, indica-ho breument.'
            }
          ]
        }]
      })
    });

    const data = await resp.json();
    const resposta = data.content?.[0]?.text || 'No s\'ha pogut processar la imatge.';

    // Separa original i traducció
    const partOriginal  = resposta.match(/ORIGINAL:\s*([\s\S]*?)(?=TRADUCCIÓ:|$)/i)?.[1]?.trim() || '';
    const partTraduccio = resposta.match(/TRADUCCIÓ:\s*([\s\S]*?)$/i)?.[1]?.trim() || resposta;

    const wrap = document.getElementById('fotoTradResultWrap');
    document.getElementById('fotoTradOriginal').textContent = partOriginal;
    document.getElementById('fotoTradResult').textContent   = partTraduccio;
    wrap.classList.add('visible');
    wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  } catch(err) {
    console.error('Error traductor foto:', err);
    document.getElementById('fotoTradResult').textContent = 'Error en processar la imatge. Torna-ho a intentar.';
    document.getElementById('fotoTradOriginal').textContent = '';
    document.getElementById('fotoTradResultWrap').classList.add('visible');
  } finally {
    btn.classList.remove('carregant');
    btn.querySelector('.pt-trad-btn-text').textContent = 'Tradueix la foto';
  }
}


function renderFiltres() {
  const wrap = document.getElementById('ptFiltres');

  const tots = document.createElement('button');
  tots.className = 'pt-filtre actiu';
  tots.dataset.id = 'totes';
  tots.textContent = '✨ Totes';
  tots.addEventListener('click', () => filtra('totes'));
  wrap.appendChild(tots);

  SECCIONS.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'pt-filtre';
    btn.dataset.id = s.id;
    btn.textContent = `${s.emoji} ${s.titol}`;
    btn.addEventListener('click', () => filtra(s.id));
    wrap.appendChild(btn);
  });
}

function filtra(id) {
  document.querySelectorAll('.pt-filtre').forEach(b => b.classList.toggle('actiu', b.dataset.id === id));
  document.querySelectorAll('.pt-seccio').forEach(s => {
    s.style.display = (id === 'totes' || s.dataset.id === id) ? '' : 'none';
  });
  if (id !== 'totes') {
    document.querySelector(`.pt-seccio[data-id="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ──────────────────────────────────────────────────────────
   RENDER FRASES
   ────────────────────────────────────────────────────────── */
function renderSeccions() {
  const wrap = document.getElementById('ptSeccions');

  SECCIONS.forEach((s, si) => {
    const seccio = document.createElement('section');
    seccio.className = 'pt-seccio';
    seccio.dataset.id = s.id;
    seccio.style.animationDelay = `${si * 0.06}s`;

    seccio.innerHTML = `
      <div class="pt-seccio-header">
        <span class="pt-seccio-emoji">${s.emoji}</span>
        <h2 class="pt-seccio-titol">${s.titol}</h2>
        <span class="pt-seccio-count">${s.frases.length} frases</span>
      </div>
      <div class="pt-grid" id="grid-${s.id}"></div>
    `;
    wrap.appendChild(seccio);

    const grid = seccio.querySelector(`#grid-${s.id}`);
    s.frases.forEach((f, fi) => {
      const row = document.createElement('div');
      row.className = 'pt-frase';
      row.style.animationDelay = `${si * 0.06 + fi * 0.03}s`;
      row.innerHTML = `
        <div class="pt-frase-ca">${f.ca}</div>
        <div class="pt-frase-pt-wrap">
          <div class="pt-frase-pt">${f.pt}</div>
          <div class="pt-frase-fonetic">[${f.f}]</div>
        </div>
        <div class="pt-frase-accions">
          <button class="pt-frase-btn" title="Escoltar pronunciació" data-text="${f.pt.replace(/"/g, '&quot;')}">🔊</button>
          <button class="pt-frase-btn" title="Copiar" data-copy="${f.pt.replace(/"/g, '&quot;')}">📋</button>
        </div>
      `;
      grid.appendChild(row);
    });
  });

  // Events delegats
  document.getElementById('ptSeccions').addEventListener('click', e => {
    const btnSpeak = e.target.closest('.pt-frase-btn[data-text]');
    const btnCopy  = e.target.closest('.pt-frase-btn[data-copy]');

    if (btnSpeak) {
      parla(btnSpeak.dataset.text, btnSpeak);
    }
    if (btnCopy) {
      navigator.clipboard.writeText(btnCopy.dataset.copy).then(() => {
        const orig = btnCopy.textContent;
        btnCopy.textContent = '✅';
        setTimeout(() => { btnCopy.textContent = orig; }, 1200);
      });
    }
  });
}

/* ──────────────────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderFiltres();
  renderSeccions();

  // Comptador textarea
  const input = document.getElementById('tradInput');
  input.addEventListener('input', () => {
    document.getElementById('tradCounter').textContent = `${input.value.length} / 500`;
  });

  // Botó canviar direcció
  document.getElementById('tradDirBtn').addEventListener('click', () => {
    dirTrad = dirTrad === 'ca|pt' ? 'pt|ca' : 'ca|pt';
    actualitzaDir();
    input.value = '';
    document.getElementById('tradCounter').textContent = '0 / 500';
    input.focus();
  });

  // Botó traduir
  document.getElementById('tradBtn').addEventListener('click', tradueix);

  // Enter al textarea (Ctrl+Enter)
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) tradueix();
  });

  // Esborrar
  document.getElementById('tradClear').addEventListener('click', () => {
    input.value = '';
    document.getElementById('tradCounter').textContent = '0 / 500';
    document.getElementById('tradResultWrap').classList.remove('visible');
    input.focus();
  });

  // Copiar resultat
  document.getElementById('tradCopy').addEventListener('click', () => {
    const text = document.getElementById('tradResult').textContent;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('tradCopy');
      btn.textContent = '✅ Copiat!';
      setTimeout(() => { btn.textContent = '📋 Copiar'; }, 1500);
    });
  });

  // Escoltar resultat — llengua destí segons direcció
  document.getElementById('tradSpeak').addEventListener('click', () => {
    const text = document.getElementById('tradResult').textContent;
    const btn  = document.getElementById('tradSpeak');
    const lang = dirTrad === 'ca|pt' ? 'pt-PT' : 'ca-ES';
    const utt  = new SpeechSynthesisUtterance(text);
    utt.lang = lang; utt.rate = 1.0;
    const veus = window.speechSynthesis.getVoices();
    const veu  = veus.find(v => v.lang.startsWith(lang.split('-')[0]));
    if (veu) utt.voice = veu;
    btn.classList.add('parlant');
    utt.onend = () => btn.classList.remove('parlant');
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utt);
  });

  // Precarrega veus (alguns navegadors les carreguen asíncronament)
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
});
