/* ── Categories de llocs (nova arquitectura POI) ── */
const ME_CATS = [
  { id: "Tots",       emoji: "🗺️", label: "Tots",          llocCat: null,           hasSubs: false },
  { id: "Miradors",   emoji: "🔭", label: "Miradors",       llocCat: "Miradors",     hasSubs: false },
  { id: "Bany",       emoji: "🏊", label: "Zones de bany",  llocCat: "Zona de bany", hasSubs: true  },
  { id: "Naturalesa", emoji: "🌿", label: "Naturalesa",      llocCat: "Naturalesa",   hasSubs: true  },
  { id: "Pobles",     emoji: "\U0001f3d8\ufe0f", label: "Pobles",    llocCat: "Poble/Ciutat", hasSubs: false },
  { id: "Varis",      emoji: "📍", label: "Varis",           llocCat: "Varis",        hasSubs: true  },
];
const ME_SUBCATS = {
  Bany: [
    { id: "Tots",                label: "Totes" },
    { id: "Piscines Naturals",   label: "Piscines" },
    { id: "Platges",             label: "Platges" },
    { id: "Aig\u00fces termals", label: "Aigues Termals" },
  ],
  Naturalesa: [
    { id: "Tots",                         label: "Totes" },
    { id: "Paisatge",                     label: "Paisatge" },
    { id: "Llacs",                        label: "Llacs" },
    { id: "Geologia",                     label: "Geologia" },
    { id: "Salts d\u2019aigua",           label: "Salts d\u2019aigua" },
    { id: "Coves",                        label: "Coves" },
    { id: "Jard\u00ed bot\u00e0nic",      label: "Jardins" },
  ],
  Varis: [
    { id: "Tots",        label: "Tots" },
    { id: "Fars",        label: "Fars" },
    { id: "Plantacions", label: "Plantacions" },
    { id: "Curiositats", label: "Curiositats" },
    { id: "Molins",      label: "Molins" },
    { id: "Altres",      label: "Altres" },
  ],
};
const ME_ILLES = [
  { id: "Totes",      emoji: "🏝️", label: "Totes" },
  { id: "Sao Miguel", emoji: "🌋", label: "S\u00e3o Miguel" },
  { id: "Pico",       emoji: "⛰️", label: "Pico" },
  { id: "Sao Jorge",  emoji: "🐉", label: "S\u00e3o Jorge" },
  { id: "Faial",      emoji: "💙", label: "Faial" },
];
const ME_ILLA_LABEL = {
  "Sao Miguel": "S\u00e3o Miguel", Pico: "Pico",
  "Sao Jorge":  "S\u00e3o Jorge",  Faial: "Faial",
};

function meCatLabel(cat, sub) {
  if (cat === "Miradors")     return "Mirador";
  if (cat === "Zona de bany") {
    if (sub === "Piscines Naturals") return "Piscina natural";
    if (sub === "Platges")           return "Platja";
    return "Aigues Termals";
  }
  if (cat === "Naturalesa")    return (sub && sub !== "Tots") ? sub : "Naturalesa";
  if (cat === "Poble/Ciutat")  return "Poble/Ciutat";
  if (cat === "Varis")         return (sub && sub !== "Tots") ? sub : "Varis";
  return cat;
}
function meCatPlaceholder(cat, sub) {
  if (cat === "Miradors")     return "🔭";
  if (cat === "Zona de bany") {
    if (sub === "Platges")              return "🏖️";
    if (sub === "Aig\u00fces termals")  return "♨️";
    return "🏊";
  }
  if (cat === "Naturalesa") {
    const m = { Llacs:"🏞️", Geologia:"🌋", Coves:"🕳️" };
    if (sub && m[sub]) return m[sub];
    if (sub === "Salts d\u2019aigua")        return "💦";
    if (sub === "Jard\u00ed bot\u00e0nic")   return "🌺";
    return "🌿";
  }
  if (cat === "Poble/Ciutat") return "\U0001f3d8\ufe0f";
  if (cat === "Varis") {
    const m = { Fars:"🔦", Plantacions:"🌳", Curiositats:"🤔", Molins:"⚙️" };
    return m[sub] || "📍";
  }
  return "📍";
}

let _llocsArr = null;
function getLlocsArr() {
  if (!_llocsArr)
    _llocsArr = Object.entries(LLOCS || {}).map(([key, l]) => ({ ...l, id: key, key }));
  return _llocsArr;
}
function buildActivitats() {
  const cats = (typeof POI_CATEGORIES !== "undefined" && POI_CATEGORIES.aventura && POI_CATEGORIES.aventura.subs) || {};
  const byTypus = {};
  Object.values(AVENTURA || {}).forEach((a) => {
    if (!byTypus[a.sub]) byTypus[a.sub] = [];
    byTypus[a.sub].push({ illa: a.illa, lloc: a.lloc });
  });
  return Object.entries(cats).map(([subKey, subCfg]) => {
    const typusName = subCfg.label.includes("/") ? subCfg.label.split("/")[1] : subCfg.label;
    return { tipus: typusName, emoji: subCfg.emoji, img: subKey, llocs: byTypus[typusName] || [] };
  }).filter((a) => a.llocs.length > 0);
}
let _sendList = null;
function getSendList() {
  if (!_sendList) {
    const poiMap = {};
    (typeof POI_DATA !== "undefined" ? POI_DATA : []).forEach((p) => { poiMap[p.id] = p; });
    _sendList = Object.entries(SENDERISME || {}).map(([key, r]) => {
      const poi = poiMap[key];
      return { ...r, id: key, key,
        coords_inici: poi ? [poi.lat, poi.lng] : null,
        start:        poi ? [poi.lat, poi.lng] : null,
        temps: r.temps_cam, temps_total: r.temps_tot };
    });
  }
  return _sendList;
}
const _gpxCache = {};
let _gpxData = null;
function parseGPXData(xmlText) {
  try {
    const doc = new DOMParser().parseFromString(xmlText, "application/xml");
    const pts = [...doc.querySelectorAll("trkpt")];
    const track = [], elevs = [];
    pts.forEach((p) => {
      const lat = parseFloat(p.getAttribute("lat")), lon = parseFloat(p.getAttribute("lon"));
      const eleEl = p.querySelector("ele");
      const ele = parseFloat(eleEl ? eleEl.textContent : "0");
      if (!isNaN(lat) && !isNaN(lon)) { track.push([lat, lon]); elevs.push(isNaN(ele) ? 0 : ele); }
    });
    if (!track.length) return null;
    const R = 6371, rad = (d) => (d * Math.PI) / 180;
    const cumDist = [0];
    for (let i = 1; i < track.length; i++) {
      const [la1, lo1] = track[i-1], [la2, lo2] = track[i];
      const dlat = rad(la2-la1), dlng = rad(lo2-lo1);
      const a = Math.sin(dlat/2)**2 + Math.cos(rad(la1))*Math.cos(rad(la2))*Math.sin(dlng/2)**2;
      cumDist.push(cumDist[cumDist.length-1] + R*2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
    }
    const profile = track.map((_, i) => [+(cumDist[i].toFixed(3)), Math.round(elevs[i])]);
    return { track, profile, start: track[0], cumDist };
  } catch (e) { return null; }
}

/* ── Estat ── */
const ME = {
  illa: "Totes",
  cat: "Tots",
  subcat: "Tots",
  destacat: false,
  zona: "",
};
let _linksTabIlla = "General";
let _linksTabCat = null;

/* ── Inici ── */

/* ══════════════════════════════════════════════
   NAVEGACIÓ DE SECCIONS
   ══════════════════════════════════════════════ */
let _seccioActiva = "llocs";

function meSetSeccio(id) {
  _seccioActiva = id;
  // Amaga totes les seccions
  document
    .querySelectorAll(".me-seccio")
    .forEach((s) => s.classList.add("hidden"));
  document
    .querySelectorAll(".me-sec-btn")
    .forEach((b) => b.classList.remove("actiu"));
  // Mostra la seleccionada
  const sec = document.getElementById("sec-" + id);
  if (sec) sec.classList.remove("hidden");
  // Marca el botó
  const btn = [...document.querySelectorAll(".me-sec-btn")].find((b) =>
    b.getAttribute("onclick")?.includes("'" + id + "'"),
  );
  if (btn) btn.classList.add("actiu");
  // Scroll al top del contingut
  document
    .querySelector(".me-sec-nav-wrap")
    ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  // Init aventura si cal
  if (id === "aventura" && !_avInit) initAventura();
  if (id === "senderisme" && !_sendInit) initSenderisme();
  if (id === "excursions" && !_excInit) initExcursions();
  if (id === "gastronomia" && !_gastInit) initGastronomia();
  if (id === "maleta" && !_maletaInit) initMaleta();
  if (id === "info" && !_infoInit) initInfo();
  if (id === "itineraris" && !_itinInit) initItineraris();
}

/* ══════════════════════════════════════════════
   SECCIÓ: AVENTURA
   ══════════════════════════════════════════════ */
let _avInit = false;
let _avTipus = null;
let _avIlla = null;

const AV_ILLA_EMOJI = {
  "Sao Miguel": "🌋",
  Pico: "⛰️",
  "Sao Jorge": "🐉",
  Faial: "💙",
};
const AV_ILLA_LBL = {
  "Sao Miguel": "São Miguel",
  Pico: "Pico",
  "Sao Jorge": "São Jorge",
  Faial: "Faial",
};

function initAventura() {
  _avInit = true;
  renderAvCards();
  renderAvLinks();
}

/* ── Cards d'activitat ── */
function renderAvCards() {
  const grid = document.getElementById("avGrid");
  if (!grid) return;
  grid.innerHTML = buildActivitats().map((act, i) => renderAvCard(act, i)).join("");
}

function renderAvCard(act, i) {
  const imgSrc = `img/material-extra/fons-${act.img}.webp`;
  const delay = i * 50;

  // Agrupar llocs per illa
  const perIlla = {};
  act.llocs.forEach((l) => {
    if (!perIlla[l.illa]) perIlla[l.illa] = [];
    perIlla[l.illa].push(l.lloc);
  });

  const total = act.llocs.length;
  const illes = Object.keys(perIlla);

  const llocsHtml = illes
    .map((ill) => {
      const emoji = AV_ILLA_EMOJI[ill] || "🏝️";
      const lbl = AV_ILLA_LBL[ill] || ill;
      const llocs = perIlla[ill];
      return `<div class="av-card-illa-grup">
      <span class="av-card-illa-lbl">${emoji} ${lbl}</span>
      <div class="av-card-llocs">
        ${llocs.map((l) => `<span class="av-card-lloc">📍 ${escHtml(l)}</span>`).join("")}
      </div>
    </div>`;
    })
    .join("");

  return `
  <article class="av-card" style="animation-delay:${delay}ms"
    onclick="avCardClick(this, '${escHtml(act.tipus)}')">
    <div class="av-card-foto" style="background-image:url('${imgSrc}')">
      <div class="av-card-overlay"></div>
      <div class="av-card-header">
        <span class="av-card-emoji">${act.emoji}</span>
        <h3 class="av-card-nom">${escHtml(act.tipus)}</h3>
        <span class="av-card-count">${total} lloc${total !== 1 ? "s" : ""}</span>
      </div>
    </div>
    <div class="av-card-cos">${llocsHtml}</div>
  </article>`;
}

function avCardClick(el, tipus) {
  // Expandeix/col·lapsa la card
  el.classList.toggle("expandida");
}

/* ── Links aventura ── */
function renderAvLinks() {
  const wrap = document.getElementById("avLinksWrap");
  if (!wrap) return;
  wrap.style.display = "block";

  const tipus_list = [
    "Barranquisme",
    "Snorkel",
    "Bici",
    "Kayak o Paddle Surf",
    "Busseig",
    "Coasteering",
    "Nedar amb dofins",
    "Escalada",
    "Surf",
    "Moto aquàtica",
  ];
  const illa_list = ["Totes", "Sao Miguel", "Pico", "Faial"];

  // Posts (sempre visibles)
  const postsHtml = ME_AVENT_POSTS.map(
    (p) =>
      `<a class="me-link-item" href="${escHtml(p)}" target="_blank" rel="noopener">
      <span class="me-link-url">${escHtml(p)}</span>
    </a>`,
  ).join("");

  // Empreses filtrades i desduplicades
  function getEmpreses() {
    let emp = ME_AVENT_EMPRESES.filter(
      (e) =>
        (_avTipus === null || e.tipus === _avTipus) &&
        (_avIlla === null ||
          _avIlla === "Totes" ||
          e.illa === _avIlla.toLowerCase() ||
          e.illa === _avIlla ||
          normalIlla(e.illa) === _avIlla),
    );
    // Deduplicar per URL quan no hi ha filtre de tipus
    if (_avTipus === null) {
      const seen = new Set();
      emp = emp.filter((e) => {
        if (seen.has(e.url)) return false;
        seen.add(e.url);
        return true;
      });
    }
    return emp;
  }

  function cntTipus(t) {
    let emp = ME_AVENT_EMPRESES.filter(
      (e) =>
        (t === null || e.tipus === t) &&
        (_avIlla === null ||
          _avIlla === "Totes" ||
          normalIlla(e.illa) === _avIlla),
    );
    if (t === null) {
      const s = new Set();
      emp = emp.filter((e) => {
        if (s.has(e.url)) return false;
        s.add(e.url);
        return true;
      });
    }
    return emp.length;
  }
  function cntIlla(ill) {
    let emp = ME_AVENT_EMPRESES.filter(
      (e) =>
        (_avTipus === null || e.tipus === _avTipus) &&
        (ill === "Totes" || normalIlla(e.illa) === ill),
    );
    if (_avTipus === null) {
      const s = new Set();
      emp = emp.filter((e) => {
        if (s.has(e.url)) return false;
        s.add(e.url);
        return true;
      });
    }
    return emp.length;
  }

  const empreses = getEmpreses();

  // Tabs tipus
  const tipusTabs = [["Tots", null], ...tipus_list.map((t) => [t, t])]
    .map(([lbl, val]) => {
      const cnt = cntTipus(val);
      if (cnt === 0 && val !== null) return "";
      const actiu = _avTipus === val;
      const vlbl = val === null ? "Tots" : lbl;
      const vesc = val ? escHtml(val) : "null";
      return `<button class="me-links-tab${actiu ? " actiu" : ""}"
      onclick="avSetTipus(${val ? `'${vesc}'` : "null"})">${vlbl} <span class="me-filtre-num">${cnt}</span></button>`;
    })
    .join("");

  // Tabs illa
  const illaTabs = illa_list
    .map((ill) => {
      const cnt = cntIlla(ill);
      if (cnt === 0) return "";
      const actiu = _avIlla === ill || (_avIlla === null && ill === "Totes");
      const emoji = ill === "Totes" ? "🏝️" : AV_ILLA_EMOJI[ill] || "";
      const lbl = ill === "Totes" ? "Totes" : AV_ILLA_LBL[ill] || ill;
      return `<button class="me-links-tab${actiu ? " actiu" : ""}"
      onclick="avSetIlla('${ill}')">${emoji} ${lbl} <span class="me-filtre-num">${cnt}</span></button>`;
    })
    .join("");

  const empresesHtml = empreses.length
    ? empreses
        .map(
          (
            e,
          ) => `<a class="me-link-item" href="${escHtml(e.url)}" target="_blank" rel="noopener">
        <span class="me-link-url">${escHtml(e.url)}</span>
      </a>`,
        )
        .join("")
    : `<p class="me-links-buit">Cap empresa per a aquesta combinació</p>`;

  const totalEmp = ME_AVENT_EMPRESES.filter(
    (e, i, a) => a.findIndex((x) => x.url === e.url) === i,
  ).length;

  wrap.innerHTML = `
  <div class="me-links-header" onclick="avToggleLinks()">
    <h3 class="me-links-titol">🔗 Posts i empreses d'aventura</h3>
    <span class="me-links-count">${totalEmp} empreses · ${ME_AVENT_POSTS.length} posts</span>
    <span class="me-links-toggle${_avLinksOpen ? " obert" : ""}" id="avLinksIco">▼</span>
  </div>
  <div class="me-links-cos${_avLinksOpen ? " obert" : ""}" id="avLinksCos">

    <div class="av-links-posts-bloc">
      <div class="me-links-bloc-titol">📰 Posts recomanats</div>
      <div class="me-links-grid">${postsHtml}</div>
    </div>

    <div class="av-links-emp-bloc">
      <div class="me-links-bloc-titol" style="margin-top:20px">🏢 Empreses</div>
      <div class="me-links-filtres-wrap" style="margin-bottom:12px">
        <div class="me-links-fila">
          <span class="me-links-filtre-lbl">Activitat</span>
          <div class="me-links-tabs">${tipusTabs}</div>
        </div>
        <div class="me-links-fila">
          <span class="me-links-filtre-lbl">Illa</span>
          <div class="me-links-tabs">${illaTabs}</div>
        </div>
        <div class="me-links-fila me-links-fila-extra">
          <span class="me-comptador"><span>${empreses.length}</span> empreses</span>
        </div>
      </div>
      <div class="me-links-grid">${empresesHtml}</div>
    </div>

  </div>`;
}

let _avLinksOpen = false;
function avToggleLinks() {
  _avLinksOpen = !_avLinksOpen;
  document
    .getElementById("avLinksCos")
    ?.classList.toggle("obert", _avLinksOpen);
  document
    .getElementById("avLinksIco")
    ?.classList.toggle("obert", _avLinksOpen);
}
function avSetTipus(t) {
  _avTipus = t === "null" ? null : t;
  renderAvLinks();
  if (_avLinksOpen)
    document.getElementById("avLinksCos")?.classList.add("obert");
}
function avSetIlla(ill) {
  _avIlla = ill === "Totes" ? null : ill;
  renderAvLinks();
  if (_avLinksOpen)
    document.getElementById("avLinksCos")?.classList.add("obert");
}
function normalIlla(s) {
  if (!s) return "";
  const m = {
    "sao miguel": "Sao Miguel",
    pico: "Pico",
    faial: "Faial",
    "sao jorge": "Sao Jorge",
  };
  return m[s.toLowerCase()] || s;
}

document.addEventListener("DOMContentLoaded", () => {
  renderIlles();
  renderCats();
  renderSubcats();
  renderExtres();
  render();
  // Deep link a reserves
  if (location.hash.startsWith("#reserva-")) initReservaHash();
});

/* ── Filtres ── */
function renderIlles() {
  document.getElementById("meIlles").innerHTML = ME_ILLES.map(
    (ill) =>
      `<button class="me-filtre-illa${ME.illa === ill.id ? " actiu" : ""}" onclick="meSetIlla('${ill.id}')">
      ${ill.emoji} ${ill.label}
    </button>`,
  ).join("");
}

function renderCats() {
  const llocs = getLlocsArr();
  document.getElementById("meCats").innerHTML = ME_CATS.map((c) => {
    const count = llocs.filter((l) =>
      (ME.illa === "Totes" || l.illa === ME.illa) &&
      (c.id === "Tots" || l.cat === c.llocCat)
    ).length;
    if (count === 0 && c.id !== "Tots") return "";
    return `<button class="me-filtre-cat${ME.cat === c.id ? " actiu" : ""}" onclick="meSetCat('${c.id}')">
      ${c.emoji} ${c.label} <span class="me-filtre-num">${count}</span>
    </button>`;
  }).join("");
}

function renderSubcats() {
  const wrap = document.getElementById("meSubcats");
  const fila = document.getElementById("meSubcatsFila");
  const catCfg = ME_CATS.find((c) => c.id === ME.cat);
  const show = catCfg && catCfg.hasSubs;
  wrap.classList.toggle("hidden", !show);
  if (fila) fila.classList.toggle("visible", show);
  if (!show) return;
  const llocs = getLlocsArr();
  const subcatList = (ME_SUBCATS[ME.cat] || []);
  wrap.innerHTML = subcatList.map((s) => {
    const count = llocs.filter((l) =>
      (ME.illa === "Totes" || l.illa === ME.illa) &&
      l.cat === catCfg.llocCat &&
      (s.id === "Tots" || l.sub === s.id)
    ).length;
    return `<button class="me-filtre-subcat${ME.subcat === s.id ? " actiu" : ""}" onclick="meSetSubcat('${s.id}')">
      ${s.label} <span class="me-filtre-num">${count}</span>
    </button>`;
  }).join("");
}

function renderExtres() {
  document
    .getElementById("meToggleDestacat")
    .classList.toggle("actiu", ME.destacat);
  const sel = document.getElementById("meZonaSelect");
  sel.disabled = ME.illa === "Totes";
  const zones =
    ME.illa === "Totes"
      ? []
      : [...new Set(getLlocsArr().filter((l) => l.illa === ME.illa && l.zona).map((l) => l.zona))].sort();
  sel.innerHTML =
    `<option value="">Totes les zones</option>` +
    zones
      .map(
        (z) =>
          `<option value="${z}"${ME.zona === z ? " selected" : ""}>${z}</option>`,
      )
      .join("");
}

/* ── Accions ── */
function meSetIlla(illa) {
  ME.illa = illa;
  ME.zona = "";
  _linksTabIlla = illa === "Totes" ? "General" : ME_ILLA_LABEL[illa] || illa;
  renderIlles();
  renderCats();
  renderSubcats();
  renderExtres();
  render();
}
function meSetCat(cat) {
  ME.cat = cat;
  ME.subcat = "Tots";
  renderCats();
  renderSubcats();
  render();
}
function meSetSubcat(sub) {
  ME.subcat = sub;
  renderSubcats();
  render();
}
function meToggleDestacat() {
  ME.destacat = !ME.destacat;
  renderExtres();
  render();
}
function meSetZona() {
  ME.zona = document.getElementById("meZonaSelect").value;
  render();
}

/* ── Filtratge ── */
function filtrarLlocs() {
  const catCfg = ME_CATS.find((c) => c.id === ME.cat);
  return getLlocsArr().filter((l) => {
    if (ME.illa !== "Totes" && l.illa !== ME.illa) return false;
    if (ME.cat !== "Tots") {
      if (!catCfg || l.cat !== catCfg.llocCat) return false;
      if (catCfg.hasSubs && ME.subcat !== "Tots" && l.sub !== ME.subcat) return false;
    }
    if (ME.destacat && !l.destacat) return false;
    if (ME.zona && l.zona !== ME.zona) return false;
    return true;
  });
}

/* ── Render principal ── */
function render() {
  const llocs = filtrarLlocs();
  const grid = document.getElementById("meGrid");
  const buit = document.getElementById("meBuit");
  const comp = document.getElementById("meComptador");

  comp.innerHTML = `<span>${llocs.length}</span> lloc${llocs.length !== 1 ? "s" : ""}`;

  if (llocs.length === 0) {
    grid.innerHTML = "";
    buit.classList.add("visible");
    renderLinks();
    return;
  }
  buit.classList.remove("visible");
  grid.innerHTML = llocs.map((l, i) => renderCard(l, i)).join("");
  renderLinks();
}

function renderCard(l, i) {
  const fotoSrc = l.foto ? `img/material-extra/${l.foto}.webp` : null;
  const ill_lbl = ME_ILLA_LABEL[l.illa] || l.illa;
  const cat_lbl = meCatLabel(l.cat, l.sub);
  const ph = meCatPlaceholder(l.cat, l.sub);
  const delay = Math.min(i * 25, 300);
  const eid = l.key || l.id || i;

  const fotoHtml = fotoSrc
    ? `<img class="me-card-foto" src="${fotoSrc}" alt="${escHtml(l.nom)}" loading="lazy"
         onerror="this.parentNode.innerHTML='<div class=\\'me-card-foto-placeholder\\'>${ph}</div>'">`
    : `<div class="me-card-foto-placeholder">${ph}</div>`;

  const linksHtml =
    l.links && l.links.length
      ? `<div class="me-card-footer">${l.links
          .slice(0, 3)
          .map(
            (lk, li) =>
              `<a class="me-card-link" href="${escHtml(lk)}" target="_blank" rel="noopener">Més info${l.links.length > 1 ? " " + (li + 1) : ""}</a>`,
          )
          .join("")}</div>`
      : "";

  const desc = l.desc || "";
  const descLng = desc.length > 160;

  return `
  <article class="me-card${l.destacat ? " destacada" : ""}" style="animation-delay:${delay}ms">
    <div class="me-card-foto-wrap">
      ${fotoHtml}
      ${l.destacat ? `<span class="me-badge-destacat">⭐ Destacat</span>` : ""}
      <span class="me-badge-illa">${ill_lbl}</span>
    </div>
    <div class="me-card-cos">
      <div class="me-card-meta">
        <span class="me-card-cat-badge">${ph} ${cat_lbl}</span>
        ${l.zona ? `<span class="me-card-zona">${escHtml(l.zona)}</span>` : ""}
      </div>
      <h3 class="me-card-nom">${escHtml(l.nom)}</h3>
      ${
        desc
          ? `<div class="me-card-desc">
        <div class="me-card-desc-text" id="desc-${eid}">${escHtml(desc)}</div>
        ${descLng ? `<button class="me-card-llegir-mes" onclick="meExpandDesc('${eid}',this)">Llegir més ▾</button>` : ""}
      </div>`
          : ""
      }
    </div>
    ${linksHtml}
  </article>`;
}

function meExpandDesc(id, btn) {
  const el = document.getElementById(`desc-${id}`);
  const ex = el.classList.toggle("expandit");
  btn.textContent = ex ? "Llegir menys ▴" : "Llegir més ▾";
}

/* ══════════════════════════════════════════════
   SECCIÓ DE LINKS — filtres per categoria, illa i favorits
   ══════════════════════════════════════════════ */

const ME_LINK_CATS = ["General", "Miradors", "Platges", "Piscines"];
const ME_LINK_ILLES = ["Totes", "Sao Miguel", "Pico", "Sao Jorge", "Faial"];
const ME_LINK_CAT_EMOJI = {
  General: "🌐",
  Miradors: "🏔️",
  Platges: "🏖️",
  Piscines: "🏊",
};
const ME_LINK_ILLA_EMOJI = {
  Totes: "🏝️",
  "Sao Miguel": "🌋",
  Pico: "⛰️",
  "Sao Jorge": "🐉",
  Faial: "💙",
};
const ME_LINK_ILLA_LBL = {
  Totes: "Totes",
  "Sao Miguel": "São Miguel",
  Pico: "Pico",
  "Sao Jorge": "São Jorge",
  Faial: "Faial",
};

// Estat inicial: cap filtre seleccionat, favorits activats
let _lnkCat = null;
let _lnkIlla = null;
let _lnkFavorit = true; // per defecte mostra favorits
let _linksOpen = false;

function _filtrarLinks() {
  return ME_LINKS.filter(
    (l) =>
      (_lnkCat === null || l.cat === _lnkCat) &&
      (_lnkIlla === null ||
        _lnkIlla === "Totes" ||
        l.illa === _lnkIlla ||
        l.illa === "Totes") &&
      (!_lnkFavorit || l.favorit),
  );
}

function renderLinks() {
  const wrap = document.getElementById("meLinksWrap");
  wrap.style.display = "block";

  // Comptadors
  function cntCat(c) {
    return ME_LINKS.filter(
      (l) =>
        (c === null || l.cat === c) &&
        (_lnkIlla === null ||
          _lnkIlla === "Totes" ||
          l.illa === _lnkIlla ||
          l.illa === "Totes") &&
        (!_lnkFavorit || l.favorit),
    ).length;
  }
  function cntIlla(ill) {
    return ME_LINKS.filter(
      (l) =>
        (_lnkCat === null || l.cat === _lnkCat) &&
        (ill === null ||
          ill === "Totes" ||
          l.illa === ill ||
          l.illa === "Totes") &&
        (!_lnkFavorit || l.favorit),
    ).length;
  }

  const llocs = _filtrarLinks();
  const total = ME_LINKS.length;
  const favCnt = ME_LINKS.filter((l) => l.favorit).length;

  // Pestanyes categoria
  const catTabs = ME_LINK_CATS.map((c) => {
    const cnt = cntCat(c);
    if (cnt === 0) return "";
    return `<button class="me-links-tab${_lnkCat === c ? " actiu" : ""}" onclick="meLnkSetCat('${c}')">
      ${ME_LINK_CAT_EMOJI[c]} ${c} <span class="me-filtre-num">${cnt}</span>
    </button>`;
  }).join("");

  // Pestanyes illa
  const illaTabs = ME_LINK_ILLES.map((ill) => {
    const cnt = cntIlla(ill);
    if (cnt === 0) return "";
    return `<button class="me-links-tab${_lnkIlla === ill ? " actiu" : ""}" onclick="meLnkSetIlla('${ill}')">
      ${ME_LINK_ILLA_EMOJI[ill]} ${ME_LINK_ILLA_LBL[ill]} <span class="me-filtre-num">${cnt}</span>
    </button>`;
  }).join("");

  // Grid de links
  const gridHtml = llocs.length
    ? llocs
        .map(
          (l) => `
      <a class="me-link-item${l.favorit ? " favorit" : ""}" href="${escHtml(l.url)}" target="_blank" rel="noopener">
        ${l.favorit ? '<span class="me-link-star">⭐</span>' : ""}
        <span class="me-link-url">${escHtml(l.url)}</span>
      </a>`,
        )
        .join("")
    : `<p class="me-links-buit">Cap recurs per a aquesta combinació</p>`;

  wrap.innerHTML = `
  <div class="me-links-header" onclick="meToggleLinks()">
    <h3 class="me-links-titol">🔗 Recursos i enllaços</h3>
    <span class="me-links-count">${total} recursos</span>
    <span class="me-links-toggle${_linksOpen ? " obert" : ""}" id="meLinksIco">▼</span>
  </div>
  <div class="me-links-cos${_linksOpen ? " obert" : ""}" id="meLinksCos">

    <div class="me-links-filtres-wrap">

      <div class="me-links-fila">
        <span class="me-links-filtre-lbl">Categoria</span>
        <div class="me-links-tabs">${catTabs || '<span class="me-links-buit-tabs">Cap opció disponible</span>'}</div>
      </div>

      <div class="me-links-fila">
        <span class="me-links-filtre-lbl">Illa</span>
        <div class="me-links-tabs">${illaTabs}</div>
      </div>

      <div class="me-links-fila me-links-fila-extra">
        <button class="me-toggle-destacat${_lnkFavorit ? " actiu" : ""}" onclick="meLnkToggleFavorit()">
          <span class="me-toggle-ico">⭐</span>
          <span>Favorits <span class="me-filtre-num">${favCnt}</span></span>
        </button>
        ${
          _lnkCat || _lnkIlla || _lnkFavorit
            ? `<button class="me-links-reset" onclick="meLnkReset()">✕ Netejar filtres</button>`
            : ""
        }
        <span class="me-comptador" style="margin-left:auto">
          <span>${llocs.length}</span> de ${total}
        </span>
      </div>

    </div>

    <div class="me-links-grid">${gridHtml}</div>

  </div>`;
}

let _linksOpen_flag = false;

function meToggleLinks() {
  _linksOpen = !_linksOpen;
  document.getElementById("meLinksCos")?.classList.toggle("obert", _linksOpen);
  document.getElementById("meLinksIco")?.classList.toggle("obert", _linksOpen);
}

function meLnkSetCat(c) {
  _lnkCat = _lnkCat === c ? null : c;
  renderLinks();
  if (_linksOpen) document.getElementById("meLinksCos")?.classList.add("obert");
}
function meLnkSetIlla(ill) {
  _lnkIlla = _lnkIlla === ill ? null : ill;
  renderLinks();
  if (_linksOpen) document.getElementById("meLinksCos")?.classList.add("obert");
}
function meLnkToggleFavorit() {
  _lnkFavorit = !_lnkFavorit;
  renderLinks();
  if (_linksOpen) document.getElementById("meLinksCos")?.classList.add("obert");
}
function meLnkReset() {
  _lnkCat = null;
  _lnkIlla = null;
  _lnkFavorit = false;
  renderLinks();
  if (_linksOpen) document.getElementById("meLinksCos")?.classList.add("obert");
}

/* ── Utils ── */
function escHtml(s) {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function linkHostname(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

/* ══════════════════════════════════════════════
   SECCIÓ: EXCURSIONS
   ══════════════════════════════════════════════ */
let _excTab = "cetacis";
let _excInit = false;

const EXC_TABS = [
  { id: "cetacis", emoji: "🐋", label: "Avistament de Cetacis" },
  { id: "barco", emoji: "⛵", label: "Passeig amb Barco" },
  { id: "estrelles", emoji: "🔭", label: "Observació d'Estrelles" },
];
const EXC_ILLA_EMOJI = {
  "Sao Miguel": "🌋",
  Pico: "⛰️",
  Faial: "💙",
  "Sao Jorge": "🐉",
};
const EXC_ILLA_LBL = {
  "Sao Miguel": "São Miguel",
  Pico: "Pico",
  Faial: "Faial",
  "Sao Jorge": "São Jorge",
};

function initExcursions() {
  _excInit = true;
  renderExcNav();
  renderExcContingut();
}

function renderExcNav() {
  const nav = document.getElementById("excNav");
  if (!nav) return;
  nav.innerHTML = EXC_TABS.map(
    (t) =>
      `<button class="exc-tab${_excTab === t.id ? " actiu" : ""}" onclick="excSetTab('${t.id}')">
      ${t.emoji} ${t.label}
    </button>`,
  ).join("");
}

function excSetTab(id) {
  _excTab = id;
  renderExcNav();
  renderExcContingut();
}

function renderExcContingut() {
  const wrap = document.getElementById("excContingut");
  if (!wrap) return;
  if (_excTab === "cetacis") wrap.innerHTML = renderCetacis();
  if (_excTab === "barco") wrap.innerHTML = renderBarco();
  if (_excTab === "estrelles") wrap.innerHTML = renderEstrelles();
}

/* ── CETACIS ── */
/* Espècies de cetacis observables */
const EXC_CETACIS_ESPECIES = [
  { nom: "Rorqual comú",     detall: "El segon cetaci més gran del món. Freqüent a les Açores." },
  { nom: "Balena blava",     detall: "El major animal que ha existit. Ocasional a l'hivern." },
  { nom: "Cachalot",         detall: "Resident permanent, especialment a Pico. Busseig profund." },
  { nom: "Dofí mular",       detall: "El més comú i sociable. Present tot l'any." },
  { nom: "Dofí comú",        detall: "S'observa en grups de centenars d'individus." },
  { nom: "Dofí estenella",   detall: "Presenta una banda lateral daurada molt característica." },
  { nom: "Orca",             detall: "Ocasional. Transita en ruta migratòria." },
];

function renderCetacis() {
  const cetExcs = Object.entries(EXCURSIONS || {}).filter(([, e]) => e.sub === "cetacis");
  const byIlla = {};
  cetExcs.forEach(([key, e]) => {
    if (!byIlla[e.illa]) byIlla[e.illa] = {};
    if (!byIlla[e.illa][e.zona]) byIlla[e.illa][e.zona] = [];
    byIlla[e.illa][e.zona].push(e);
  });

  const especiesHtml = EXC_CETACIS_ESPECIES.map((e) =>
    `<div class="exc-especie">
      <span class="exc-especie-nom">${escHtml(e.nom)}</span>
      <span class="exc-especie-det">${escHtml(e.detall)}</span>
    </div>`).join("");

  const llocsHtml = Object.entries(byIlla).map(([illa, zones]) => `
    <div class="exc-illa-bloc">
      <h3 class="exc-illa-titol">${EXC_ILLA_EMOJI[illa] || "🏝️"} ${EXC_ILLA_LBL[illa] || illa}</h3>
      <div class="exc-llocs-grid">
        ${Object.entries(zones).map(([zona, excs]) => `
          <div class="exc-lloc-card">
            <div class="exc-lloc-nom">📍 ${escHtml(zona)}</div>
            <div class="exc-lloc-links">
              ${excs.filter((e) => e.empresa).slice(0, 4).map((e) => {
                const preuStr = e.preu && e.preu !== "n/d" ? ` · ${e.preu}€` : "";
                const durStr = e.durada ? ` · ${e.durada}` : "";
                const infoStr = e.info ? `<span class="exc-lloc-badge">${escHtml(e.info)}</span>` : "";
                return `<a class="exc-lloc-link" href="${escHtml(e.empresa)}" target="_blank" rel="noopener">
                  ${infoStr} ${escHtml(e.sortides || "")}${durStr}${preuStr}
                </a>`;
              }).join("")}
            </div>
          </div>`).join("")}
      </div>
    </div>`).join("");

  return `
    <div class="exc-seccio">
      <div class="exc-intro">
        <p>Les Açores s'han convertit en un dels millors destins del món per a l'avistament de cetacis. La seva posició estratègica a l'Atlàntic, la profunditat dels seus fons i les seves aigues riques en nutrients atreuen una gran varietat d'espècies.</p>
        <div class="exc-especies-grid">${especiesHtml}</div>
      </div>
      ${llocsHtml}
    </div>`;
}

/* ── BARCO ── */
function renderBarco() {
  const barcoExcs = Object.entries(EXCURSIONS || {}).filter(([, e]) => e.sub === "barco");
  const byZona = {};
  barcoExcs.forEach(([, e]) => {
    if (!byZona[e.zona]) byZona[e.zona] = [];
    byZona[e.zona].push(e);
  });

  const zonesHtml = Object.entries(byZona).map(([zona, excs]) => `
    <div class="exc-barco-zona">
      <h3 class="exc-barco-titol">📍 ${escHtml(zona)}</h3>
      <div class="exc-barco-grid">
        ${excs.map((e) => {
          const preuStr = e.preu && e.preu !== "n/d" ? `${e.preu}€` : "";
          return `<div class="exc-barco-card${e.destacat ? " exc-barco-destacat" : ""}">
            <div class="exc-barco-nom">${escHtml(e.nom)}</div>
            ${e.info ? `<span class="exc-barco-tipus">${escHtml(e.info)}</span>` : ""}
            ${e.durada ? `<span class="exc-barco-dur">⏱️ ${escHtml(e.durada)}</span>` : ""}
            ${e.sortides ? `<div class="exc-barco-sort">🕐 ${escHtml(e.sortides)}</div>` : ""}
            ${preuStr ? `<div class="exc-barco-preu">💶 ${preuStr}</div>` : ""}
            ${e.empresa ? `<a class="exc-barco-link" href="${escHtml(e.empresa)}" target="_blank" rel="noopener">Reservar</a>` : ""}
          </div>`;
        }).join("")}
      </div>
    </div>`).join("");

  return `
    <div class="exc-seccio">
      <p class="exc-intro-text">Els passejos amb barco permeten descobrir la costa des del mar, explorar coves marines inaccessibles per terra i gaudir de postes de sol atlàntiques. La majoria de sortides es fan en zodiac.</p>
      ${zonesHtml}
    </div>`;
}

/* ── ESTRELLES ── */
function renderEstrelles() {
  const estExcs = Object.entries(EXCURSIONS || {}).filter(([, e]) => e.sub === "estrelles");
  const byIlla = {};
  estExcs.forEach(([, e]) => {
    if (!byIlla[e.illa]) byIlla[e.illa] = [];
    byIlla[e.illa].push(e);
  });

  const llocsHtml = Object.entries(byIlla).map(([illa, excs]) => `
    <div class="exc-est-illa">
      <h3 class="exc-est-illa-titol">${EXC_ILLA_EMOJI[illa] || "🏝️"} ${EXC_ILLA_LBL[illa] || illa}</h3>
      <div class="exc-est-grid">
        ${excs.map((e) => `
          <div class="exc-est-card${e.destacat ? " exc-est-destacat" : ""}">
            <div class="exc-est-nom">✨ ${escHtml(e.nom)}</div>
            ${e.zona && e.zona !== e.nom ? `<div class="exc-est-zona">📍 ${escHtml(e.zona)}</div>` : ""}
            ${e.info ? `<p class="exc-est-info">${escHtml(e.info)}</p>` : ""}
          </div>`).join("")}
      </div>
    </div>`).join("");

  return `
    <div class="exc-seccio">
      <p class="exc-intro-text">Les Açores gaudeixen d'una de les cels nocturns més netes d'Europa. Allunyades de la contaminació lluminosa continental, les illes ofereixen condicions excepcionals per a l'observació astronòmica. Les zones d'alta muntanya, per sobre de la capa de boira baixa, permeten veure la Via Làctia a simple vista. Consell: comproveu primer la previsió de boira per a l'altitud!</p>
      ${llocsHtml}
    </div>`;
}

/* ══════════════════════════════════════════════
   SECCIÓ: GASTRONOMIA
   ══════════════════════════════════════════════ */
let _gastInit = false;

function initGastronomia() {
  _gastInit = true;
  renderGastronomia();
}

function gFoto(fitxer, peu) {
  return `<figure class="gast-fig">
    <img class="gast-fig-img" src="img/material-extra/${fitxer}.webp" alt="${escHtml(peu)}" loading="lazy">
    <figcaption class="gast-fig-peu">${escHtml(peu)}</figcaption>
  </figure>`;
}

function gTitol(emoji, text, id) {
  return `<h3 class="gast-seccio-titol" id="gast-${id}">${emoji} ${text}</h3>`;
}

function renderGastronomia() {
  const wrap = document.getElementById("gastContingut");
  if (!wrap) return;

  /* ── Àncores ── */
  const SECCIONS = [
    { id: "entrants", emoji: "🥗", label: "Entrants" },
    { id: "sopes", emoji: "🍲", label: "Sopes" },
    { id: "peix", emoji: "🐟", label: "Peix i Marisc" },
    { id: "carns", emoji: "🥩", label: "Carns" },
    { id: "postres", emoji: "🍮", label: "Postres" },
    { id: "formatges", emoji: "🧀", label: "Formatges" },
    { id: "embotits", emoji: "🌭", label: "Embotits" },
    { id: "begudes", emoji: "🍷", label: "Begudes" },
    { id: "altres", emoji: "🌿", label: "Altres productes" },
    { id: "plats", emoji: "🍽️", label: "Plats típics" },
  ];
  const ancores = `<div class="gast-filtres-wrap"><div class="gast-filtres">
    ${SECCIONS.map((s) => `<a class="gast-filtre-btn" href="#gast-${s.id}" onclick="gastScrollTo('${s.id}',event)">${s.emoji} ${s.label}</a>`).join("")}
  </div></div>`;

  /* ── Plats típics (cards) ── */
  const PLATS = [
    {
      n: 1,
      nom: "Morcela com Ananás",
      foto: "morcela_com_ananas",
      desc: "Rodanxes de morcilla negra amb pinya brasejada. Sorprenent barreja present a gairebé totes les cartes dels restaurants açorians.",
    },
    {
      n: 2,
      nom: "Lapas Grelhadas",
      foto: "lapas-grelhadas",
      desc: "Pegellides (una espècie de petxines) a la planxa adobades i cuinades en la seva pròpia closca. Perfectes com aperitiu.",
    },
    {
      n: 3,
      nom: "Polvo Guisat",
      foto: "polvo-guisado",
      desc: "Pop condimentat amb vi aromàtic, pebre i xile, acompanyat de patates o arròs. L'estil varia d'una illa a una altra.",
    },
    {
      n: 4,
      nom: "Bolos Lêvedos",
      foto: "bolos-levedos",
      desc: "Panet lleugerament dolç tradicional de la Vall de Furnas, fet amb ous, farina, sucre, mantega i llevat. Des de 1935 a l'Hotel Terra Nostra.",
    },
    {
      n: 5,
      nom: "Alcatra",
      foto: "alcatra",
      desc: "El plat estrella de Terceira: guisat de vedella molt tenda cuit a foc lent en olla de fang amb vi negre, cansalada, all i espècies.",
    },
    {
      n: 6,
      nom: "Bife à Regional",
      foto: "bife-a-regional",
      desc: "Bistec de vedella sucosa amb salsa de mantega, all i pebrots, o servit amb el formatge de São Jorge.",
    },
    {
      n: 7,
      nom: "Cozido das Furnas",
      foto: "cozido-as-furnas",
      desc: "Cuit 7 hores enterrat a les calderes volcàniques de Furnas. Carns, xoriço, morcilla, col, pastanaga i patates. No es serveix amb caldo.",
    },
    {
      n: 8,
      nom: "Cracas",
      foto: "cracas",
      desc: "Un percebe únic de les Açores, adherit a roques volcàniques. Intens sabor marí, salat i salvatge. Com beure un xarrup del mateix oceà.",
    },
    {
      n: 9,
      nom: "Bacallà",
      foto: "bacalhau-a-margarida-da-praca",
      desc: "365 maneres de cuinar-lo: à Brás, à Margarida da Praça, à Transmontana, à Boca Gil Eanes... Un per a cada dia de l'any.",
    },
    {
      n: 10,
      nom: "Chicharros Fritos com Molho de Vilão",
      foto: "chicharros-fritos",
      desc: "Sorell fregit cruixent amb salsa de pebrots, all i oli. Senzill però deliciós, especialment a São Miguel.",
    },
    {
      n: 11,
      nom: "Pinya i fruites tropicals",
      foto: "ananas",
      desc: "Plantacions sota hivernacles de vidre encalat a São Miguel, úniques al món. També maracujà i guaiaba peruana.",
    },
    {
      n: 12,
      nom: "Queijadas da Vila",
      foto: "queijadas-da-vila",
      desc: "Petits pastissos de formatge icònics de São Miguel. Suaus, lleugerament dolços i cruixents. Ideals amb cafè o te.",
    },
    {
      n: 13,
      nom: "Fofas da Povoação",
      foto: "fofas-da-povoacao",
      desc: "Éclair farcit de mantega, vainilla o llimona i recobert de xocolata. Originari de Povoação, São Miguel.",
    },
    {
      n: 14,
      nom: "Queijo Branco com Pimenta da Terra",
      foto: "queijo-branco-com-pimenta-da-terra",
      desc: "Formatge fresc suau amb bitxo local mòlt. L'aperitiu imprescindible de São Miguel. Servit amb pa, és perfecte.",
    },
    {
      n: 15,
      nom: "Boca Negra Grelhada",
      foto: "boca-nega-grelhada",
      desc: "Gallineta a la brasa. Carn blanca, humida i saborosa. El peix estrella de São Miguel, sempre fresc.",
    },
    {
      n: 16,
      nom: "Amêijoas de São Jorge",
      foto: "ameijoas-sao-jorge",
      desc: "Cloïsses úniques al món de la Fajã da Caldeira do Santo Cristo. Extremadament rares, només es cullen durant un curt període a l'any.",
    },
  ];

  const platsHtml = PLATS.map((p, i) => {
    const imgHtml = p.foto
      ? `<div class="gast-plat-img-wrap"><img class="gast-plat-img" src="img/material-extra/${p.foto}.webp" alt="${escHtml(p.nom)}" loading="lazy" onerror="this.closest('.gast-plat-img-wrap').style.display='none'"></div>`
      : `<div class="gast-plat-ico">🍽️</div>`;
    return `<article class="gast-plat-card" style="animation-delay:${i * 30}ms">
      ${imgHtml}
      <div class="gast-plat-cos">
        <span class="gast-plat-num">${p.n}</span>
        <h4 class="gast-plat-nom">${escHtml(p.nom)}</h4>
        <p class="gast-plat-desc">${escHtml(p.desc)}</p>
      </div>
    </article>`;
  }).join("");

  /* ── HTML complet ── */
  wrap.innerHTML =
    ancores +
    `<div class="gast-article">

  <p class="gast-intro-text">La gastronomia de les Açores està estretament lligada a la seva naturalesa volcànica i a la seva tradició pesquera. Els ingredients frescos, com el peix i el marisc, juntament amb una excel·lent carn local i les tècniques de cuinat tradicionals, ofereixen uns plats que han anat de generació en generació. Tot això acompanyat per tota classe de fruites i verdures de primera qualitat cultivades als sòls volcànics especialment fèrtils, i sense oblidar la gran varietat de formatges i vins locals.</p>

  ${gTitol("🥗", "Entrants", "entrants")}
  <p>Hi ha una gran varietat que sovint inclou la <em>Salada de Polvo</em> (amanida de pop), els <em>Pasteis de Bacalhau</em> (crestes de bacallà), les <em>Lapas</em> (crues o a la planxa amb all i llimona), les <em>Cracas</em> (una espècie de percebes) i el <em>Presunto</em> (pernil salat).</p>

  ${gTitol("🍲", "Sopes", "sopes")}
  <p>L'arxipèlag de les Açores —com la resta de Portugal— és conegut per les seves delicioses sopes que sovint tenen una consistència d'estofat i poden omplir molt. Les que podem trobar a la majoria de menús són el <em>Caldo Verde</em> (una sopa de col amb patates i salsitxa fumada), la <em>Sopa de Legumes</em> (sopa de llegums), la <em>Sopa Hortalicias</em> (sopa de verdures), la <em>Sopa de Peixe</em> (caldo de peix), la <em>Sopa de Mariscos</em>, el <em>Caldo Azedo</em> (caldo agra) o el <em>Caldo de Nabos</em> (sopa de naps).</p>
  <p>Més contundents són els diversos guisats que es solen oferir com a primer plat. Les <em>Caldeiradas</em>, que contenen carn de vedella, peix o pollastre.</p>
  ${gFoto("caldo-verde", "Caldo Verde")}

  ${gTitol("🐟", "Peix i Marisc", "peix")}
  <p>Lògicament, el peix forma part de la dieta habitual dels illencs. La majoria de plats de peix estan preparats a la brasa (<em>na brasa</em>) o fregits. Els peixos que podem trobar més habitualment en els menús són: <em>Atum</em> (tonyina), <em>Espadarte</em> (peix espasa), <em>Espada Preto</em> (peix sable negre), <em>Cherne</em> (mero de fons), <em>Chicharro</em> (un sorell de més qualitat), <em>Pescada</em> (llucet), <em>Pargo</em> (pagre), <em>Cavala</em> (cavalla), <em>Congro</em> (congre), <em>Garoupa</em> (mero), <em>Lulas</em> (calamars), <em>Polvo</em> (pop) i, per descomptat, les <em>Sardinhas</em> (sardines) i el <em>Bacalhau</em> (bacallà), importat i preparat de varies maneres diferents.</p>
  <p>Respecte al marisc, destaquen les <em>Lapas</em> (pegellides), molt típiques de la regió. També trobarem <em>camarao</em> (gambes), <em>lagosta</em> (llagosta), <em>lagostinho</em> (llagostins), <em>cavaco</em> (semblant a una llagosta petita) i <em>santola</em> ("centollo"). Una especialitat especial és l'arròs de marisc, una colorida barreja de diferents mariscs cuinats amb arròs.</p>
  ${gFoto("cavaco", "Cavaco — semblant a una llagosta petita, especialitat local")}

  ${gTitol("🥩", "Carns", "carns")}
  <p>No és una sorpresa la gran varietat de plats de carn que trobem a l'arxipèlag, especialment de carn de vedella. Per començar tenim els <em>Bifes</em> (bistecs de tot tipus), el <em>Bitoque</em> (bistecs petits amb un ou ferrat a sobre), l'<em>Entrecosto</em> (entrecot), les <em>costilles</em> (costelles), la <em>Caçoila</em> (estofat de porc), la <em>Carne do porco</em> (carn de porc), la <em>Carne de Molha</em> (plat de carn amb una deliciosa salsa típica de Faial), el <em>Coelho</em> (conill), el <em>Frango</em> (pollastre)… i moltes altres!</p>

  ${gTitol("🍮", "Postres", "postres")}
  <p>Els postres són molt bons, però també molt dolços. Sempre hi ha disponibles <em>bolos</em> (pastissos), puddings i pinya fresca. La <em>Massa Sovada</em> i l'<em>arroz doce</em> (un dolç arròs amb llet i canela) són alguns dels postres típics.</p>
  ${gFoto("massa-sovada", "Massa Sovada — pa dolç i esponjós tradicional")}

  ${gTitol("🧀", "Formatges", "formatges")}
  <p>A les Açores, on s'elabora aproximadament la meitat dels formatges que es consumeixen a Portugal, el mite de les quatre estacions en un mateix dia és una realitat. Pluges generoses que amb el mateix ímpetu donen pas a un sol radiant i que afavoreixen una vegetació que frega el concepte de verger. Un paradís perfecte per al bestiar, que retoza feliç entre la frescor. Entre les 9 illes hi ha una infinitat de formatges artesanals, que en alguns casos mantenen els mètodes d'elaboració dels primers colons.</p>
  <p>El més famós de tots és el <em>Queijo de São Jorge</em>, un formatge picant i semidur, elaborat des del segle XV amb llet crua de vaca, reconegut amb DOP. Ha aconseguit que São Jorge sigui coneguda com l'Illa del Formatge. Es pot visitar la fàbrica <a class="gast-link" href="https://www.uniqueijo.pt/" target="_blank" rel="noopener">Uniqueijo</a> en aquesta illa.</p>
  ${gFoto("queijo-sao-jorge", "Queijo de São Jorge — DOP, elaborat des del segle XV")}
  <p>El <em>Queijo Vaquinha</em>, cremós i suau com la mantega, és un dels emblemes de l'illa Terceira. A São Miguel n'hi ha varis, com el <em>Queijo do Vale</em>, que procedeix de la Vall de la Lagoa Seca. A l'illa de Pico destaca el <em>Queijo do Pico</em> (o queijo de São João), amb DOP Europea des del 1998. També a Pico podem trobar el formatge <em>Ilha dos Mistérios</em>, on els camps de lava basàltica són claus per a la seva elaboració. Un formatge diferent que es destaca pel color blanc, la cremositat i el sabor únic.</p>
  ${gFoto("queijo-ilha-dos-misterios", "Queijo Ilha dos Mistérios — elaborat als prats volcànics de Pico")}

  ${gTitol("🌭", "Embotits", "embotits")}
  <p>Els embotits de les illes Açores es caracteritzen pel seu sabor rústic, intens i fumat. Destaquen la <em>morcela</em>, la <em>linguiça</em> i el tradicional <em>chouriço</em>. Aquests productes combinen a la perfecció amb els famosos formatges de la regió.</p>
  <p>La <em>morcela</em> és una botifarra negra dolça que conté espècies i un toc de sucre, i se serveix tradicionalment cuita o fregida acompanyada de rodanxes de pinya fresca de l'illa. La <em>linguiça</em> i el <em>chouriço</em> són embotits de porc adobats amb molt d'all, pebrot vermell dolç i vi local. Es diferencien dels continentals per un curat més llarg i un perfil més fumat. Són un ingredient estrella de l'emblemàtic <em>Cozido das Furnas</em>.</p>
  <p>També destaquen els <em>torresmos</em> (torreznos), típics a tota la regió. Se serveixen fregits i cruixents, sovint acompanyats amb inhame (un tubercle local).</p>
  ${gFoto("linguica", "Linguiça — embotit de porc fumat, ingredient del Cozido das Furnas")}
  ${gFoto("torresmos", "Torresmos — fregits i cruixents, acompanyats d'inhame")}

  ${gTitol("🍷", "Begudes", "begudes")}
  <p>Una de les begudes més populars de les illes és la cervesa. Hi ha una marca local: <em>Especial</em>. És bona i bastant barata. El cafè també és imprescindible. Durant el dia, la gent prefereix el <em>Galão</em>, que es serveix en un vas amb abundant llet. Per la nit se sol prendre un cafè, comparable al expresso.</p>
  <p>Per descomptat, també elaboren vi d'excel·lent qualitat. Entre les marques més conegudes destaquen <em>Terras de Lava</em> (blanc) i <em>Basalto</em> (negre) de Pico, i <em>Terra do Conde</em> (blanc i negre) de Graciosa. El <em>Verdelho</em> (de Pico i la Graciosa) és el vi de postres més famós de les Açores.</p>
  <p>El <em>Chá dos Açores</em> és un dels productes més exclusius de la regió. Les Açores són una de les poques zones d'Europa on es cultiva te, i São Miguel és la illa principal productora. Té un sabor suau i característic degut a les condicions climàtiques i volcàniques de l'arxipèlag.</p>
  <p>El refresc escumós estrella de les Açores, <em>Kima</em>, està aromatitzat amb la deliciosa maracujà o fruita de la passió de l'illa. Se serveix normalment amb gel a l'estiu. Hi ha una mica de polpa, ja que s'utilitza fruita real, i tot i que té menys sucre que altres refrescos, Kima encara és força dolça amb un gust àcid.</p>
  ${gFoto("kima", "Kima — el refresc estrella de les Açores, amb maracujà real")}

  ${gTitol("🌿", "Altres productes típics", "altres")}
  <p><strong>Inhame dos Açores</strong> — Els 'inhames' (nyams) són tubercles amb mides que oscil·len entre els 5 i els 10 cm de diàmetre. Té un sabor i textura similar al moniato. A les Açores és molt habitualment usat com a guarnició, en substitució de les patates.</p>
  ${gFoto("Inhame", "Inhame dos Açores — tubercle local, substitut habitual de les patates")}
  <p><strong>Pimenta da terra</strong> — Pebrot vermell picant de São Miguel utilitzat en pràcticament tot. Normalment es conserva en sal i de vegades en vinagre. Sovint es mol fins a formar una pasta. Gairebé tots els plats utilitzen <em>pimenta da terra</em> d'alguna manera. És un dels ingredients més específics i populars de São Miguel.</p>

  ${gTitol("🍽️", "Plats típics", "plats")}
  <p class="gast-plats-intro">Una selecció dels plats que no us podeu perdre a les Açores:</p>
  <div class="gast-plats-grid">${platsHtml}</div>

  </div>`;
}

function gastScrollTo(id, ev) {
  if (ev) ev.preventDefault();
  const el = document.getElementById("gast-" + id);
  if (!el) return;
  const offset = 52 + 49 + 46;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ══════════════════════════════════════════════
   SECCIÓ: LA MALETA
   ══════════════════════════════════════════════ */
let _maletaInit = false;

function initMaleta() {
  _maletaInit = true;
  const wrap = document.getElementById("maletaContingut");
  if (!wrap) return;

  wrap.innerHTML = `<div class="mal-article">

  <p class="mal-intro">Per viatjar a les Açores, fes les maletes pensant que <em>"viuràs les quatre estacions en un sol dia"</em>. És possible despertar amb molta boira —que en realitat amaga el sol i el cel blau— i acabar el dia amb molta pluja i vent. La temperatura a l'agost va dels 19 als 25 graus. En ser un lloc amb humitat constant i molt de vent, podries sentir més fred o calor del que indica el termòmetre.</p>

  <section class="mal-seccio">
    <h3 class="mal-titol">👟 Roba i calçat tècnic</h3>
    <p>Opta per roba pràctica i fresca. La <strong>roba esportiva</strong> és molt recomanada tant pel seu confort com pel fet que s'asseca ràpidament en cas de pluja. Porta <strong>pantalons còmodes</strong> per caminar.</p>
    <p>Independentment de l'estació, una <strong>jaqueta paravents impermeable i amb caputxa</strong> és altament recomanada — potser sigui la peça més important de la maleta. No només et protegirà de les pluges que poden arribar en qualsevol moment, sinó també del vent fred molt comú a la regió.</p>
    <p>Porta <strong>calçat impermeable</strong>, ja siguin botes o bambes de trekking. Hi ha molts senders i camins que hauràs de recórrer per veure certs paisatges, i molts passen per llocs amb fang i relliscosos. El calçat còmode i antilliscant és ideal per a aquest viatge.</p>
  </section>

  <section class="mal-seccio">
    <h3 class="mal-titol">🩱 Roba i calçat de bany</h3>
    <p>Les famoses aigües termals ferruginoses (com les de Furnas) <strong>taquen la roba de bany clara de color taronja</strong>. Porta un <strong>banyador fosc o vell</strong> per a les termals, a més d'un altre per als banys a platges i piscines naturals.</p>
    <p>Porta <strong>escarpins o sandàlies d'aigua</strong> — a les Açores hi ha molts tolls i gorgs naturals de pedra volcànica i platges de pedres. Una <strong>tovallola de microfibra</strong> d'assecat ràpid també serà necessària per visitar les platges i piscines naturals.</p>
  </section>

  <section class="mal-seccio">
    <h3 class="mal-titol">🎒 Accessoris</h3>
    <ul class="mal-llista">
      <li><strong>Motxilla impermeable</strong> per portar aigua, l'impermeable, roba de recanvi i menjar per les excursions. Una ampolla reutilitzable o cantimplora és la millor opció per portar aigua.</li>
      <li><strong>Gorra o barret, protector solar i ulleres de sol</strong> — l'índex UV pot ser alt fins i tot en dies ennuvolats.</li>
      <li><strong>Prismàtics</strong> — un o dos per grup, de gran ajuda per les excursions d'avistament de cetacis.</li>
      <li>Fundes de plàstic hermètiques per protegir el mòbil els dies de pluja.</li>
      <li><strong>Kit de snorkel</strong> (màscara i tub) i càmera aquàtica — imprescindible si vols contemplar el fons marí.</li>
      <li><strong>Bateria portàtil</strong> si el teu mòbil es descarrega ràpid. Mínim 10.000 mAh, recomanable 20.000 mAh.</li>
    </ul>
  </section>

  <section class="mal-seccio">
    <h3 class="mal-titol">💊 Mini farmaciola bàsica</h3>
    <ul class="mal-llista">
      <li>Tirites i apòsits per a butllofes (<strong>Compeed</strong>)</li>
      <li>Analgèsics: <strong>paracetamol</strong> i <strong>ibuprofè</strong></li>
      <li>Crema per a cops (<strong>Thrombocid</strong>)</li>
      <li><strong>Pastilles per al mareig</strong> (<em>Biodramina</em> o similar) — imprescindible. Les carreteres de les illes fan moltes corbes i els trajectes amb barco poden ser molt moguts.</li>
      <li>Bon <strong>repel·lent de mosquits</strong></li>
      <li><strong>Esparadrap</strong> — imprescindible per la tranquil·litat de tot el grup…, eh Mons?</li>
    </ul>
  </section>

  </div>`;
}

/* ══════════════════════════════════════════════
   SECCIÓ: ALTRES (Informació general + Consells)
   ══════════════════════════════════════════════ */
let _infoInit = false;
let _infoTab = "general";

const INFO_TABS = [
  { id: "general", emoji: "🌍", label: "Informació general" },
  { id: "consells", emoji: "💡", label: "Consells pràctics" },
  { id: "reserves", emoji: "📋", label: "Reserves i restriccions" },
];

const INFO_ILLES_VISITA = new Set(["Faial", "Pico", "São Jorge", "São Miguel"]);

const ILLES_DATA = [
  { illa: "Corvo", area: "17,1", pop: "437", dens: "25,6" },
  { illa: "Faial", area: "173,0", pop: "14.466", dens: "83,6" },
  { illa: "Flores", area: "141,0", pop: "3.570", dens: "25,3" },
  { illa: "Graciosa", area: "60,7", pop: "4.070", dens: "67,1" },
  { illa: "Pico", area: "444,8", pop: "14.418", dens: "32,4" },
  { illa: "Santa Maria", area: "96,9", pop: "5.504", dens: "56,8" },
  { illa: "São Jorge", area: "243,7", pop: "8.435", dens: "34,6" },
  { illa: "São Miguel", area: "744,5", pop: "137.255", dens: "184,4" },
  { illa: "Terceira", area: "400,3", pop: "53.563", dens: "133,8" },
];

const MUNS_DATA = [
  {
    mun: "Angra do Heroísmo",
    zip: "9701",
    illa: "Terceira",
    area: "239,0",
    pop: "33.701",
    dens: "141,0",
  },
  {
    mun: "Calheta",
    zip: "9850",
    illa: "São Jorge",
    area: "126,3",
    pop: "3.486",
    dens: "27,6",
  },
  {
    mun: "Horta",
    zip: "9900",
    illa: "Faial",
    area: "173,0",
    pop: "14.466",
    dens: "83,6",
  },
  {
    mun: "Lagoa",
    zip: "9560",
    illa: "São Miguel",
    area: "45,6",
    pop: "15.130",
    dens: "331,8",
  },
  {
    mun: "Lajes das Flores",
    zip: "9960",
    illa: "Flores",
    area: "70,0",
    pop: "1.456",
    dens: "20,8",
  },
  {
    mun: "Lajes do Pico",
    zip: "9930",
    illa: "Pico",
    area: "155,3",
    pop: "4.398",
    dens: "28,3",
  },
  {
    mun: "Madalena",
    zip: "9950",
    illa: "Pico",
    area: "147,1",
    pop: "6.559",
    dens: "44,6",
  },
  {
    mun: "Nordeste",
    zip: "9630",
    illa: "São Miguel",
    area: "101,5",
    pop: "4.439",
    dens: "43,7",
  },
  {
    mun: "Ponta Delgada",
    zip: "9500",
    illa: "São Miguel",
    area: "233,0",
    pop: "69.038",
    dens: "296,3",
  },
  {
    mun: "Povoação",
    zip: "9650",
    illa: "São Miguel",
    area: "106,4",
    pop: "5.883",
    dens: "55,3",
  },
  {
    mun: "Praia da Vitória",
    zip: "9760",
    illa: "Terceira",
    area: "161,3",
    pop: "19.862",
    dens: "123,1",
  },
  {
    mun: "Ribeira Grande",
    zip: "9600",
    illa: "São Miguel",
    area: "180,1",
    pop: "32.397",
    dens: "179,9",
  },
  {
    mun: "Santa Cruz da Graciosa",
    zip: "9880",
    illa: "Graciosa",
    area: "60,7",
    pop: "4.070",
    dens: "67,1",
  },
  {
    mun: "Santa Cruz das Flores",
    zip: "9970",
    illa: "Flores",
    area: "70,9",
    pop: "2.114",
    dens: "29,8",
  },
  {
    mun: "São Roque do Pico",
    zip: "9940",
    illa: "Pico",
    area: "142,4",
    pop: "3.461",
    dens: "24,3",
  },
  {
    mun: "Velas",
    zip: "9800",
    illa: "São Jorge",
    area: "117,4",
    pop: "4.949",
    dens: "42,2",
  },
  {
    mun: "Vila do Corvo",
    zip: "9908",
    illa: "Corvo",
    area: "17,1",
    pop: "437",
    dens: "25,6",
  },
  {
    mun: "Vila do Porto",
    zip: "9580",
    illa: "Santa Maria",
    area: "96,9",
    pop: "5.504",
    dens: "56,8",
  },
  {
    mun: "Vila Franca do Campo",
    zip: "9680",
    illa: "São Miguel",
    area: "78,0",
    pop: "10.368",
    dens: "132,9",
  },
];

function initInfo() {
  _infoInit = true;
  renderInfoNav();
  renderInfoContingut();
}

function renderInfoNav() {
  const nav = document.getElementById("infoNav");
  if (!nav) return;
  nav.innerHTML = INFO_TABS.map(
    (t) =>
      `<button class="exc-tab${_infoTab === t.id ? " actiu" : ""}" onclick="infoSetTab('${t.id}')">${t.emoji} ${t.label}</button>`,
  ).join("");
}

function infoSetTab(id) {
  _infoTab = id;
  renderInfoNav();
  renderInfoContingut();
}

function renderInfoContingut() {
  const wrap = document.getElementById("infoContingut");
  if (!wrap) return;
  wrap.innerHTML =
    _infoTab === "general"
      ? renderInfoGeneral()
      : _infoTab === "consells"
        ? renderInfoConsells()
        : renderInfoReserves();
}

/* ── INFORMACIÓ GENERAL ── */
function renderInfoGeneral() {
  const illesRows = ILLES_DATA.map((r) => {
    const vis = INFO_ILLES_VISITA.has(r.illa);
    const cls =
      "info-tr-" +
      r.illa
        .replace(/\s/g, "-")
        .replace(/ã/g, "a")
        .replace(/é/g, "e")
        .toLowerCase();
    return `<tr class="${cls}${vis ? " info-taula-visita" : ""}">
      <td class="info-taula-illa">${vis ? '<span class="info-visita-dot">★</span>' : ""} ${escHtml(r.illa)}</td>
      <td>${r.area}</td><td>${r.pop}</td><td>${r.dens}</td>
    </tr>`;
  }).join("");

  const munsRows = MUNS_DATA.map((r) => {
    const vis = INFO_ILLES_VISITA.has(r.illa);
    const trCls =
      "info-tr-" +
      r.illa
        .replace(/\s/g, "-")
        .replace(/ã/g, "a")
        .replace(/é/g, "e")
        .toLowerCase();
    const tagCls =
      "info-illa-tag-" +
      r.illa
        .replace(/\s/g, "-")
        .replace(/ã/g, "a")
        .replace(/é/g, "e")
        .toLowerCase();
    return `<tr class="${trCls}${vis ? " info-taula-visita" : ""}">
      <td class="info-taula-mun">${escHtml(r.mun)}</td>
      <td class="info-taula-zip">${r.zip}</td>
      <td><span class="info-illa-tag ${tagCls}">${escHtml(r.illa)}</span></td>
      <td>${r.area}</td><td>${r.pop}</td><td>${r.dens}</td>
    </tr>`;
  }).join("");

  return `<div class="info-article">

  <p class="info-font-ref">Font: <a class="gast-link" href="https://en.wikipedia.org/wiki/Azores" target="_blank" rel="noopener">Wikipedia — Azores</a></p>

  <p>Les Açores, oficialment la Regió Autònoma de les Açores, són un arxipèlag de Portugal, a l'oceà Atlàntic, a uns 1.400 km (870 milles) a l'oest de Portugal. Políticament i administrativament, juntament amb Madeira, és una de les dues regions autònomes de Portugal i un territori especial de la Unió Europea. És el punt i la regió més occidental de Portugal i de la Unió Europea.</p>

  <p>Les Açores són un arxipèlag compost per nou illes volcàniques a la regió de la Macaronèsia de l'oceà Atlàntic Nord. Hi ha nou illes açorianes principals i un grup d'illots, distribuïdes en tres grups principals. Aquests són Flores i Corvo a l'oest; Graciosa, Terceira, São Jorge, Pico i Faial al centre; i São Miguel, Santa Maria i els illots Formigas a l'est. S'estenen per més de 600 km i es troben en direcció nord-oest-sud-est.</p>

  <p>Totes les illes tenen orígens volcànics, tot i que algunes, com Santa Maria, no han tingut activitat registrada des que les illes van ser poblades fa diversos segles. El mont Pico, a l'illa de Pico, és el punt més alt de Portugal, amb 2.351 m (7.713 peus). Si es mesura des de la seva base al fons de l'oceà fins als seus cims, les Açores es troben entre les muntanyes més altes del planeta. Les Açores es troben al límit de la placa de triple conjunció de les Açores, sísmicament activa, on es troben la placa nord-americana, la placa euroasiàtica i la placa africana.</p>

  <p>El clima és suau, influenciat per la seva distància dels continents i pel pas del corrent del Golf. A causa de la influència marina, les temperatures es mantenen suaus durant tot l'any. Les temperatures diürnes normalment oscil·len entre els 16 i els 25 °C segons l'estació. Es desconeixen temperatures superiors a 30 °C o inferiors a 3 °C als principals centres de població. També generalment és humit i ennuvolat.</p>

  <p>Les seves principals indústries són l'agricultura, la ramaderia lletera, la ramaderia, la pesca i el turisme, que s'ha convertit en una activitat de serveis important a la regió. Al segle XX i, en certa mesura, al segle XXI, les Açores han servit com a punt de pas per al proveïment de combustible dels avions que volen entre Europa i Amèrica del Nord. El govern de les Açores dóna feina a un gran percentatge de la població directament o indirectament en els sectors serveis i terciari. La ciutat més gran és Ponta Delgada. La cultura, el dialecte, la gastronomia i les tradicions de les illes varien considerablement, ja que aquestes illes remotes van ser poblades esporàdicament durant un període de dos segles.</p>

  <div class="info-sub"><span class="info-sub-emoji">🌋</span><h3 class="info-sub-titol">Geografia</h3></div>
  <p>Cadascuna de les illes té les seves pròpies característiques geomorfològiques que les fan úniques:</p>
  <ul class="info-llista">
    <li><strong>Corvo</strong> — és un cràter d'una important erupció pliniana</li>
    <li><strong>Flores</strong> (el seu veí de la placa nord-americana) — és una illa accidentada esculpida per moltes valls i escarpes</li>
    <li><strong>Faial</strong> — es caracteritza pel seu volcà en escut i la caldera (volcà Caldeira)</li>
    <li><strong>Pico</strong> — té el punt més alt, a 2.351 m (7.713 peus), a les Açores i Portugal</li>
    <li><strong>Graciosa</strong> — és coneguda pels seus Furnas do Enxofre actius i la barreja de cons volcànics i planes</li>
    <li><strong>São Jorge</strong> — és una illa llarga i esvelta, formada a partir d'erupcions fissurals durant milers d'anys</li>
    <li><strong>Terceira</strong> — gairebé circular, conté un dels cràters més grans de la regió</li>
    <li><strong>São Miguel</strong> — està plena de molts cràters grans i camps de cons per tot arreu</li>
    <li><strong>Santa Maria</strong> — l'illa més antiga, està molt erosionada, sent un dels pocs llocs on trobar platges de sorra marró a l'arxipèlag</li>
  </ul>

  <div class="info-sub"><span class="info-sub-emoji">🌊</span><h3 class="info-sub-titol">Erupcions volcàniques i terratrèmols</h3></div>
  <p>Des del començament de l'assentament de les illes al voltant del segle XV, hi ha hagut 28 erupcions volcàniques registrades (15 terrestres i 13 submarines). L'última erupció volcànica significativa, el volcà Capelinhos (Vulcão dos Capelinhos), va tenir lloc davant la costa de Faial el 1957; l'activitat volcànica més recent es va produir a les muntanyes submarines i als volcans submarins davant la costa de Serreta i al canal Pico-São Jorge.</p>
  <p>A causa del seu entorn geodinàmic, la regió ha estat un centre d'intensa activitat sísmica, particularment al llarg dels seus límits tectònics a la dorsal mesoatlàntica i el rift de Terceira. Els esdeveniments sísmics, tot i que freqüents, solen ser de naturalesa tectònica o vulcotectònica, però en general són d'intensitats baixes o mitjanes, ocasionalment interromputs per esdeveniments de magnitud 5 o superior. El terratrèmol més sever es va registrar el 1757, prop de Calheta, que va superar la magnitud 7.</p>

  <div class="info-sub"><span class="info-sub-emoji">🌦️</span><h3 class="info-sub-titol">Clima</h3></div>
  <p>L'arxipèlag de les Açores es troba en una zona de transició i confrontació entre masses d'aire d'origen tropical i masses d'aire més fred d'origen polar. El clima està determinat en gran mesura per les variacions del camp de pressió atmosfèrica sobre l'Atlàntic Nord. Aquestes variacions, condicionades per la massa del continent americà i la massa d'aigua atlàntica, se superposen per un anticicló atlàntic subtropical semipermanent, conegut comunament com l'anticicló de les Açores.</p>
  <p>Les temperatures màximes diàries a baixa altitud solen oscil·lar entre els 16 i els 25 °C. La precipitació mitjana anual generalment augmenta d'est a oest, oscil·lant entre els 700 mm a Santa Maria i els 1.600 mm a Flores, i arribant a valors superiors als 5.000 mm a les terres altes de Pico.</p>
  <p>La humitat relativa mitjana pot variar des del 80% a la costa fins a més del 90% per sobre dels 400 m (1.300 peus). Tanmateix, les elevacions més altes per sobre de la capa límit planetària poden experimentar valors extremadament baixos, propers al 10%. Els estius són especialment humits a l'agost i poden augmentar la temperatura percebuda en uns quants graus.</p>
  <p>Malgrat la posició septentrional que ocupa l'arxipèlag, les Açores poden veure's afectades pel pas de ciclons tropicals o de tempestes tropicals derivades d'ells. Alguns poden ser el resultat d'anomalies de sistemes de baixa latitud, mentre que d'altres són el resultat del retorn a l'Atlàntic després d'una ruta propera o fins i tot sobre el continent americà. Tot i que sovint són petits i en procés de dissipació, aquests ciclons provoquen moltes de les pitjors tempestes a què està subjecte l'arxipèlag.</p>

  <div class="info-sub"><span class="info-sub-emoji">👥</span><h3 class="info-sub-titol">Demografia</h3></div>
  <p>Les Açores estan dividides en 19 municipis (concelhos); cada municipi es divideix al seu torn en freguesies (parròquies administratives civils), de les quals n'hi ha un total de 156 a totes les Açores.</p>
  <p>Hi ha 6 ciutats: Ponta Delgada, Lagoa i Ribeira Grande a São Miguel; Angra do Heroísmo i Praia da Vitória a Terceira; i Horta sobre Faial. Tres d'aquestes, Ponta Delgada, Angra i Horta, es consideren capitals/ciutats administratives per al govern regional: són la seu del president (Ponta Delgada), el poder judicial (Angra) i l'Assemblea Regional (Horta). Angra també serveix com a centre eclesiàstic de la diòcesi catòlica romana d'Angra, la seu episcopal de les Açores.</p>
  <p><span class="info-llegenda-visita">★ Illes que visitem</span></p>

  <div class="info-taula-wrap">
    <div class="info-taula-titol">Superfície, població i densitat per illa</div>
    <div class="info-taula-scroll">
      <table class="info-taula">
        <thead><tr><th>Illa</th><th>Àrea (km²)</th><th>Població</th><th>Densitat (hab./km²)</th></tr></thead>
        <tbody>${illesRows}</tbody>
        <tfoot><tr class="info-taula-total"><td>Total</td><td>2.322,0</td><td>241.718</td><td>104,1</td></tr></tfoot>
      </table>
    </div>
    <p class="info-taula-font">Font: estimació de població el 2025 a partir de les dades del cens de 2021 · <a class="gast-link" href="https://www.geo-ref.net/sp/xaz.htm" target="_blank" rel="noopener">geo-ref.net</a></p>
  </div>

  <div class="info-taula-wrap">
    <div class="info-taula-titol">Superfície, població i densitat per municipi</div>
    <div class="info-taula-scroll">
      <table class="info-taula">
        <thead><tr><th>Municipi</th><th>ZIP</th><th>Illa</th><th>Àrea (km²)</th><th>Població</th><th>Densitat (hab./km²)</th></tr></thead>
        <tbody>${munsRows}</tbody>
        <tfoot><tr class="info-taula-total"><td colspan="3">Total</td><td>2.322,0</td><td>241.718</td><td>104,1</td></tr></tfoot>
      </table>
    </div>
    <p class="info-taula-font">Font: estimació de població el 2025 a partir de les dades del cens de 2021 · <a class="gast-link" href="https://www.geo-ref.net/sp/xaz.htm" target="_blank" rel="noopener">geo-ref.net</a></p>
  </div>

  </div>`;
}

/* ── CONSELLS ── */
function renderInfoConsells() {
  return `<div class="info-article">

  <div class="info-sub"><span class="info-sub-emoji">📱</span><h3 class="info-sub-titol">App del temps</h3></div>
  <p>El clima a les Açores és molt canviant, fins i tot dins d'un mateix dia. Per això és molt recomanable consultar el temps abans de cada visita. La web de <a class="gast-link" href="https://spotazores.com/" target="_blank" rel="noopener">Spot Azores</a> permet veure el temps real a través de diverses càmeres que hi ha a diferents punts de cada illa. Hi ha disponible una versió de la app per <a class="gast-link" href="https://play.google.com/store/apps/details?id=spotazores.app.azx&hl=ca" target="_blank" rel="noopener">Android</a> i <a class="gast-link" href="https://apps.apple.com/es/app/spotazores-new/id6755051347" target="_blank" rel="noopener">iOS</a>.</p>

  <div class="info-sub"><span class="info-sub-emoji">🪼</span><h3 class="info-sub-titol">Atenció amb les caravelles portugueses</h3></div>
  <p>Les caravelles portugueses o medusa caravella són un sinofor, és a dir, té aparença de medusa, però en realitat és l'agrupació o colònia d'un grup dels anomenats hidroides que són organismes aquàtics que col·laboren entre ells i semblen un sol organisme.</p>
  <p>Són un perill real, encara que les vegis a la platja flotant i no t'hi acostis, ja que els seus tentacles poden mesurar fins a 10 metres i els símptomes de la picada són gairebé 10 vegades més fortes que les meduses comuns, doncs el seu verí és extremadament dolorós i potencialment greu. Els símptomes que provoca la seva picada són: dolor intens a la zona de la picada, dolor abdominal, febre, vòmits, mal de cap, dolors musculars, problemes respiratoris i fins i tot pot arribar a produir en alguns casos arrítmies cardíaques.</p>
  <div class="info-alerta">
    <div class="info-alerta-titol">⚠️ En cas de picada</div>
    <p class="info-alerta-text">En cas de picada, es recomana netejar la zona amb <strong>aigua de mar (mai amb aigua dolça!)</strong> sense fregar la pell, retirar les restes amb molta cura utilitzant unes pinces o similar <strong>(mai directament amb les mans!)</strong>, i aplicar-hi fred amb una bossa de gel durant 20 minuts per reduir la inflamació i alleujar el dolor. Si l'estat de la persona no millora, anar immediatament a un centre mèdic.</p>
  </div>

  <div class="info-sub"><span class="info-sub-emoji">💧</span><h3 class="info-sub-titol">Qualitat de l'aigua</h3></div>
  <p>La qualitat de l'aigua potable a les Açores és excel·lent i comparable a la dels manantials de muntanya de màxima qualitat. L'arxipèlag s'abasteix d'aigües subterrànies d'aqüífers volcànics que compleixen els estàndards estrictes de la UE i de l'Autoritat Reguladora Portuguesa (ERSAR). Per tot això, l'aigua de l'aixeta és totalment apta per al consum humà.</p>
  <p>Respecte a l'aigua de fonts i manantials de muntanya, només s'ha de beure si l'aigua és de la xarxa pública o de fonts clarament marcades com a aigua potable. Si l'aigua surt directament de la terra en zona de pastura, encara que sembli transparent pot estar contaminada i cal tractar-la sempre amb filtres o pastilles purificadores.</p>
  <p>A més a més, a l'interior i prop de zones geotèrmiques (com a Furnas), l'aigua pot tenir un alt contingut de minerals i una lleugera olor de sofre.</p>

  <div class="info-sub"><span class="info-sub-emoji">💶</span><h3 class="info-sub-titol">Diners en metàl·lic</h3></div>
  <p>A les Açores, i especialment a l'illa de São Miguel, podrem pagar gairebé tot amb targeta (Visa i Mastercard són àmpliament acceptades), però és totalment necessari portar una mica de diners en metàl·lic per a situacions específiques durant la nostra ruta:</p>
  <ul class="info-llista">
    <li><strong>Petits quioscos i foodtrucks:</strong> sovint no tenen datàfon o demanen un consum mínim alt.</li>
    <li><strong>Aparcaments i parquímetres:</strong> alguns parkings petits o zones blaves en pobles com Furnas o Ribeira Grande requereixen monedes.</li>
    <li><strong>Petits comerços tradicionals:</strong> botigues d'artesania locals o petits bars de poble de vegades només accepten efectiu per a imports inferiors a 5 € o 10 €.</li>
    <li><strong>Entrades a llocs secundaris:</strong> l'accés a algunes rutes privades, banys termals petits o donacions per a mapes requereixen efectiu.</li>
  </ul>

  <div class="info-sub"><span class="info-sub-emoji">🗺️</span><h3 class="info-sub-titol">Descarregar mapes per poder-los consultar off-line</h3></div>
  <p>Tot i que les illes tenen una bona infraestructura, la seva orografia volcànica, els cràters i les valls tancades fan que la cobertura mòbil s'anul·li o sigui molt inestable en molts dels punts naturals.</p>
  <p>Per aquest motiu és recomanable descarregar al mòbil els mapes de <strong>Google Maps</strong> o <strong>Mappy</strong> i de <strong>Wikiloc</strong> de les illes que visitarem i així poder-los consultar quan no tinguem cobertura.</p>

  </div>`;
}

/* ══════════════════════════════════════════════
   SECCIÓ: ITINERARIS ALTERNATIUS
   ══════════════════════════════════════════════ */
let _itinInit = false;
let _itinIlla = "Sao Miguel";
let _itinZona = "Tots";
const _itinMaps = {}; // mapId → L.map instance

const ITIN_ILLES = [
  { id: "Sao Miguel", emoji: "🌋", label: "São Miguel", color: "#6abf70" },
  { id: "Pico", emoji: "⛰️", label: "Pico", color: "#a8a8a8" },
  { id: "Sao Jorge", emoji: "🐉", label: "São Jorge", color: "#c4895a" },
  { id: "Faial", emoji: "💙", label: "Faial", color: "#5fa8e8" },
];

function initItineraris() {
  _itinInit = true;
  renderItinFiltres();
  renderItinContingut();
}

/* ── Filtres ── */
function renderItinFiltres() {
  const wrap = document.getElementById("itinFiltresWrap");
  if (!wrap) return;

  const illes = ITIN_ILLES.map((ill) => {
    const cnt = (ME_ITINERARIS[ill.id] || []).length;
    const actiu = _itinIlla === ill.id;
    return `<button class="itin-pill itin-pill-illa${actiu ? " actiu" : ""}"
      style="${actiu ? `--pill-color:${ill.color}` : "--pill-color:rgba(106,171,122,0.4)"}"
      onclick="itinSetIlla('${ill.id}')">
      ${ill.emoji} ${ill.label} <span class="me-filtre-num">${cnt}</span>
    </button>`;
  }).join("");

  const itins = ME_ITINERARIS[_itinIlla] || [];
  const zones = itins.map((it) => it.nom);
  const zonesHtml = [
    `<button class="itin-pill itin-pill-zona${"Tots" === _itinZona ? " actiu" : ""}" onclick="itinSetZona('Tots')">
    🗺️ Tots <span class="me-filtre-num">${itins.length}</span></button>`,
    ...zones.map(
      (
        z,
      ) => `<button class="itin-pill itin-pill-zona${"${z}" === _itinZona ? " actiu" : ""}"
      onclick="itinSetZona(\`${z.replace(/`/g, "'")}\`)">${z}</button>`,
    ),
  ].join("");

  const illaColor =
    ITIN_ILLES.find((i) => i.id === _itinIlla)?.color || "#6aab7a";

  wrap.innerHTML = `
    <div class="itin-fila-illes">${illes}</div>
    <div class="itin-fila-zones" style="--zona-color:${illaColor}">${zonesHtml}</div>`;
}

function itinSetIlla(illa) {
  _itinIlla = illa;
  _itinZona = "Tots";
  // Destruir maps existents
  Object.values(_itinMaps).forEach((m) => {
    if (m && m.map) m.map.remove();
    else if (m && m.remove) m.remove();
  });
  Object.keys(_itinMaps).forEach((k) => delete _itinMaps[k]);
  renderItinFiltres();
  renderItinContingut();
}

function itinSetZona(zona) {
  _itinZona = zona;
  // Destruir maps
  Object.values(_itinMaps).forEach((m) => {
    if (m && m.map) m.map.remove();
    else if (m && m.remove) m.remove();
  });
  Object.keys(_itinMaps).forEach((k) => delete _itinMaps[k]);
  renderItinFiltres();
  renderItinContingut();
}

/* ── Contingut ── */
function renderItinContingut() {
  const wrap = document.getElementById("itinContingut");
  if (!wrap) return;

  const itins = (ME_ITINERARIS[_itinIlla] || []).filter(
    (it) => _itinZona === "Tots" || it.nom === _itinZona,
  );

  if (!itins.length) {
    wrap.innerHTML =
      '<div class="me-buit visible"><div class="me-buit-ico">🗺️</div><p>Cap itinerari trobat</p></div>';
    return;
  }

  const illaColor =
    ITIN_ILLES.find((i) => i.id === _itinIlla)?.color || "#6aab7a";
  const esMirlor = (nom) => nom.toLowerCase().includes("millor");

  wrap.innerHTML = itins
    .map((it, idx) => {
      const mapId = `itin-map-${_itinIlla}-${idx}`.replace(/\s/g, "_");
      const llocsList = it.llocs
        .map((l, i) => {
          const mapId = `itin-map-${_itinIlla}-${idx}`.replace(/\s/g, "_");
          return `<li class="itin-lloc-item" onclick="itinFocusMarker('${mapId}',${i})">
        <span class="itin-lloc-num" style="background:${illaColor}22;color:${illaColor};border-color:${illaColor}44">${i + 1}</span>
        <span class="itin-lloc-nom">${escHtml(l.nom)}</span>
      </li>`;
        })
        .join("");
      const fontHtml = it.font
        ? `<a class="itin-font-link" href="${escHtml(it.font)}" target="_blank" rel="noopener">🔗 Font</a>`
        : "";
      const millorClass = esMirlor(it.nom) ? " itin-card-millor" : "";

      return `<div class="itin-card${millorClass}" style="--itin-color:${illaColor}">
      <div class="itin-card-header">
        ${esMirlor(it.nom) ? '<span class="itin-badge-millor">⭐ El millor</span>' : ""}
        <h3 class="itin-card-titol">${escHtml(it.nom)}</h3>
        ${fontHtml}
      </div>
      <div class="itin-card-cos">
        <ol class="itin-llocs-list">${llocsList}</ol>
        <div class="itin-map-wrap">
          <div class="itin-map" id="${mapId}" data-llocs='${JSON.stringify(it.llocs)}'></div>
        </div>
      </div>
    </div>`;
    })
    .join("");

  // Inicialitzar maps lazy
  itins.forEach((it, idx) => {
    const mapId = `itin-map-${_itinIlla}-${idx}`.replace(/\s/g, "_");
    initItinMapLazy(mapId, it.llocs, illaColor);
  });
}

function initItinMapLazy(mapId, llocs, color) {
  const el = document.getElementById(mapId);
  if (!el) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        initItinMap(mapId, llocs, color);
      }
    },
    { threshold: 0.1 },
  );
  observer.observe(el);
}

function initItinMap(mapId, llocs, color) {
  if (_itinMaps[mapId]) return;
  const el = document.getElementById(mapId);
  if (!el) return;

  const validLlocs = llocs.filter((l) => l.coords);
  if (!validLlocs.length) {
    el.innerHTML =
      '<div class="itin-map-buit">📍 Coordenades no disponibles</div>';
    return;
  }

  const map = L.map(mapId, { zoomControl: true, scrollWheelZoom: false });
  _itinMaps[mapId] = map;

  // Mapa clar (Voyager)
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    {
      attribution: "© CartoDB",
      maxZoom: 18,
    },
  ).addTo(map);

  const markers = [];
  const bounds = [];

  validLlocs.forEach((l, i) => {
    const [lat, lng] = l.coords;
    bounds.push([lat, lng]);

    const svgNormal = (
      sz,
      fs,
    ) => `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${Math.round(sz * 1.29)}" viewBox="0 0 28 36">
      <path d="M14 0C6.27 0 0 6.27 0 14c0 9.33 14 22 14 22s14-12.67 14-22C28 6.27 21.73 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="14" r="9" fill="rgba(0,0,0,0.3)"/>
      <text x="14" y="19" text-anchor="middle" font-family="sans-serif" font-size="${fs}" font-weight="700" fill="white">${i + 1}</text>
    </svg>`;

    const makeIcon = (sz) =>
      L.divIcon({
        html: svgNormal(sz, sz < 30 ? 11 : 14),
        className: "",
        iconSize: [sz, Math.round(sz * 1.29)],
        iconAnchor: [sz / 2, Math.round(sz * 1.29)],
        popupAnchor: [0, -Math.round(sz * 1.29)],
      });

    const marker = L.marker([lat, lng], { icon: makeIcon(28) })
      .addTo(map)
      .bindTooltip(`<strong>${i + 1}.</strong> ${l.nom}`, {
        permanent: false,
        direction: "top",
        className: "itin-tooltip",
      });

    markers.push({ marker, lat, lng, makeIcon });
  });

  _itinMaps[mapId] = { map, markers };
  map.fitBounds(bounds, { padding: [20, 20], maxZoom: 14 });
}

function itinFocusMarker(mapId, idx) {
  const entry = _itinMaps[mapId];
  if (!entry || !entry.markers) return;
  const { map, markers } = entry;
  const m = markers[idx];
  if (!m) return;

  // Pan al marcador
  map.setView([m.lat, m.lng], Math.max(map.getZoom(), 13), { animate: true });

  // Animació: fer gran → tornar normal
  const bigIcon = m.makeIcon(42);
  const normIcon = m.makeIcon(28);
  m.marker.setIcon(bigIcon);
  m.marker.openTooltip();
  setTimeout(() => {
    m.marker.setIcon(normIcon);
  }, 800);

  // Destacar l'ítem de la llista
  const list = document
    .querySelector(`#${mapId}`)
    .closest(".itin-card")
    .querySelectorAll(".itin-lloc-item");
  list.forEach((li, i) => li.classList.toggle("itin-lloc-actiu", i === idx));
}

/* ── RESERVES I RESTRICCIONS ── */
function renderInfoReserves() {
  const ILLA_COLOR = {
    "Sao Miguel": "#6abf70",
    Pico: "#888888",
    "Sao Jorge": "#c4895a",
    Faial: "#5fa8e8",
  };
  const ILLA_EMOJI = {
    "Sao Miguel": "🌋",
    Pico: "⛰️",
    "Sao Jorge": "🐉",
    Faial: "💙",
  };
  const ILLA_LBL = {
    "Sao Miguel": "São Miguel",
    Pico: "Pico",
    "Sao Jorge": "São Jorge",
    Faial: "Faial",
  };

  const cards = ME_RESERVES.map((r) => {
    const color = ILLA_COLOR[r.illa] || "#6aab7a";
    const emoji = ILLA_EMOJI[r.illa] || "🏝️";
    const lbl = ILLA_LBL[r.illa] || r.illa;
    const links = r.links
      .map(
        (lk, i) =>
          `<a class="exc-link-btn" href="${escHtml(lk)}" target="_blank" rel="noopener">
        ${i === r.links.length - 1 ? "📅 Reservar" : "🔗 Més info"}
      </a>`,
      )
      .join("");

    const mapBtn = r.mapImg
      ? `<button class="exc-link-btn res-map-btn" onclick="resShowImg('${escHtml(r.mapImg)}','${escHtml(r.nom)}')">🗺️ Veure mapa autobús</button>`
      : "";

    let desc = escHtml(r.desc).replace(
      /Actualment tancada[^.]+\.[^<]*/g,
      (m) => `<span class="res-tancada">⚠️ ${m}</span>`,
    );

    let extraHtml = "";
    if (r.descExtra === "guies") {
      extraHtml = `<p class="res-card-desc">Si es vol pujar amb guia consultar empreses especialitzades (com
        <a class="res-inline-link" href="https://atipicoazores.com/es#atipico" target="_blank" rel="noopener">atipico</a> o
        <a class="res-inline-link" href="https://tripixazores.com/book/mount-pico-day-climb/" target="_blank" rel="noopener">tripixazores</a>)
        o la <button class="res-guies-btn" onclick="resShowGuies()">llista oficial de guies de muntanya autoritzats</button>.</p>`;
    }

    return `<div class="res-card" id="${escHtml(r.anchor)}" style="--res-color:${color}">
      <div class="res-card-header">
        <span class="res-illa-badge" style="background:${color}22;color:${color};border-color:${color}55">${emoji} ${lbl}</span>
        <h4 class="res-card-nom">${escHtml(r.nom)}</h4>
      </div>
      <p class="res-card-desc">${desc}</p>
      ${extraHtml}
      <div class="res-card-links">${links}${mapBtn}</div>
    </div>`;
  }).join("");

  const guiesRows = (typeof ME_GUIES_PICO !== "undefined" ? ME_GUIES_PICO : [])
    .map(
      (g) =>
        `<tr>
      <td class="res-guia-nom">${escHtml(g.nom)}</td>
      <td>${g.email ? `<a class="res-inline-link" href="mailto:${escHtml(g.email)}">${escHtml(g.email)}</a>` : "—"}</td>
      <td class="res-guia-tel">${escHtml(g.tel) || "—"}</td>
    </tr>`,
    )
    .join("");

  return `<div class="info-article">
    <p class="info-intro">Llocs on cal reservar amb antelació o que tenen restriccions d'accés.</p>
    <div class="res-grid">${cards}</div>
  </div>
  <div class="res-modal-bg" id="resGuiesModal" onclick="resHideGuies(event)">
    <div class="res-modal">
      <div class="res-modal-header">
        <h3>⛰️ Guies oficials de la Montanha do Pico</h3>
        <button class="res-modal-close" onclick="resHideGuies()">✕</button>
      </div>
      <div class="res-modal-body">
        <table class="res-guies-taula">
          <thead><tr><th>Nom</th><th>Email</th><th>Telèfon</th></tr></thead>
          <tbody>${guiesRows}</tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="res-modal-bg" id="resImgModal" onclick="resHideImg(event)">
    <div class="res-img-modal">
      <div class="res-modal-header">
        <h3 id="resImgTitol"></h3>
        <button class="res-modal-close" onclick="resHideImg()">✕</button>
      </div>
      <div class="res-img-modal-body">
        <img id="resImgEl" src="" alt="" class="res-img-modal-img">
      </div>
    </div>
  </div>`;
}

function resShowGuies() {
  const modal = document.getElementById("resGuiesModal");
  if (modal) {
    modal.classList.add("visible");
    document.body.style.overflow = "hidden";
  }
}
function resHideGuies(e) {
  if (e && e.target !== document.getElementById("resGuiesModal")) return;
  const modal = document.getElementById("resGuiesModal");
  if (modal) {
    modal.classList.remove("visible");
    document.body.style.overflow = "";
  }
}

function resShowImg(src, titol) {
  const modal = document.getElementById("resImgModal");
  if (!modal) return;
  document.getElementById("resImgEl").src = src;
  document.getElementById("resImgTitol").textContent = "🗺️ " + titol;
  modal.classList.add("visible");
  document.body.style.overflow = "hidden";
}
function resHideImg(e) {
  if (e && e.target !== document.getElementById("resImgModal")) return;
  const modal = document.getElementById("resImgModal");
  if (modal) {
    modal.classList.remove("visible");
    document.body.style.overflow = "";
  }
}

/* ── Deep link via hash ── */
function initReservaHash() {
  const hash = location.hash.replace("#", "");
  if (!hash.startsWith("reserva-")) return;
  // Navegar a la secció 'info' i al tab 'reserves'
  meSetSeccio("info");
  _infoTab = "reserves";
  renderInfoNav();
  renderInfoContingut();
  // Scroll fins a la card
  setTimeout(() => {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("res-card-highlight");
      setTimeout(() => el.classList.remove("res-card-highlight"), 2000);
    }
  }, 300);
}

/* ══════════════════════════════════════════════════════════════
   SECCIÓ: SENDERISME
   ══════════════════════════════════════════════════════════════ */

let _sendInit = false;
let _sendTab = "rutes";
let _sendIlla = "Totes";
let _sendDif = "Totes";
let _sendOrdre = "prioritat";
let _sendMap = null; // Leaflet map instance al modal

const SEND_ILLES = [
  { id: "Totes", emoji: "🏝️", label: "Totes", color: "#6aab7a" },
  { id: "Sao Miguel", emoji: "🌋", label: "São Miguel", color: "#6abf70" },
  { id: "Pico", emoji: "⛰️", label: "Pico", color: "#a8a8a8" },
  { id: "Sao Jorge", emoji: "🐉", label: "São Jorge", color: "#c4895a" },
  { id: "Faial", emoji: "💙", label: "Faial", color: "#5fa8e8" },
];
const SEND_DIFS = [
  { id: "Totes", label: "Totes", color: "#6aab7a" },
  { id: "Fàcil", label: "Fàcil", color: "#4caf50" },
  { id: "Moderada", label: "Moderada", color: "#ff9800" },
  { id: "Difícil", label: "Difícil", color: "#f44336" },
];
const SEND_DIF_COLOR = {
  Fàcil: "#4caf50",
  Moderada: "#ff9800",
  Difícil: "#f44336",
};
const SEND_ILLA_COLOR = {
  "Sao Miguel": "#6abf70",
  Pico: "#a8a8a8",
  "Sao Jorge": "#c4895a",
  Faial: "#5fa8e8",
};
const SEND_ILLA_LABEL = {
  "Sao Miguel": "São Miguel",
  Pico: "Pico",
  "Sao Jorge": "São Jorge",
  Faial: "Faial",
};
const SEND_ILLA_EMOJI = {
  "Sao Miguel": "🌋",
  Pico: "⛰️",
  "Sao Jorge": "🐉",
  Faial: "💙",
};
const SEND_TIPUS_ICON = {
  Circular: "🔄",
  "Només anada": "➡️",
  "Anada i tornada": "↔️",
};
const SEND_ORDRES = [
  { id: "prioritat", label: "Per prioritat" },
  { id: "km", label: "Per distància" },
  { id: "dp", label: "Per D+" },
  { id: "nom", label: "Alfabètic" },
];

/* ── Init ── */
function initSenderisme() {
  _sendInit = true;
  const sec = document.getElementById("sec-senderisme");
  sec.innerHTML = `
    <div class="send-subnav-wrap">
      <div class="send-subnav" id="sendSubnav">
        <button class="send-subnav-btn actiu" onclick="sendSetTab('rutes')">🥾 Rutes</button>
        <button class="send-subnav-btn" onclick="sendSetTab('consells')">💡 Consells generals</button>
        <button class="send-subnav-btn" onclick="sendSetTab('links')">🔗 Més informació</button>
      </div>
    </div>
    <div id="sendContingut" class="me-contingut"></div>
    <div class="send-modal-overlay" id="sendModalOverlay" onclick="sendCloseModal(event)">
      <div class="send-modal" id="sendModal">
        <button class="send-modal-close" onclick="sendHideModal()">✕</button>
        <div id="sendModalContingut"></div>
      </div>
    </div>`;
  sendRenderTab();
}

function sendSetTab(tab) {
  _sendTab = tab;
  document.querySelectorAll("#sendSubnav .send-subnav-btn").forEach((b, i) => {
    b.classList.toggle("actiu", ["rutes", "consells", "links"][i] === tab);
  });
  sendRenderTab();
}

function sendRenderTab() {
  const wrap = document.getElementById("sendContingut");
  if (!wrap) return;
  if (_sendTab === "rutes") renderSendRutes(wrap);
  else if (_sendTab === "consells") renderSendConsells(wrap);
  else renderSendLinks(wrap);
}

/* ══════════════════════════
   TAB: RUTES
   ══════════════════════════ */
function renderSendRutes(wrap) {
  const list = getSendList();
  const illes = SEND_ILLES.map((ill) => {
    const cnt = ill.id === "Totes" ? list.length : list.filter((r) => r.illa === ill.id).length;
    const actiu = _sendIlla === ill.id;
    return `<button class="send-pill send-pill-illa${actiu ? " actiu" : ""}"
      style="${actiu ? `--pill-c:${ill.color}` : ""}"
      onclick="sendSetIlla('${ill.id}')">
      ${ill.emoji} ${ill.label} <span class="send-pill-cnt">${cnt}</span>
    </button>`;
  }).join("");

  const difs = SEND_DIFS.map((d) => {
    const actiu = _sendDif === d.id;
    return `<button class="send-pill send-pill-dif${actiu ? " actiu" : ""}"
      style="${actiu ? `--pill-c:${d.color}` : ""}"
      onclick="sendSetDif('${d.id}')">
      ${d.label}
    </button>`;
  }).join("");

  const ordreOpts = SEND_ORDRES.map(
    (o) => `<option value="${o.id}"${_sendOrdre === o.id ? " selected" : ""}>${o.label}</option>`,
  ).join("");

  const rutes = sendFiltrarRutes();
  const comptador = `<span class="send-comptador">${rutes.length !== 1 ? rutes.length + " rutes" : "1 ruta"}</span>`;

  const cardsHtml = rutes.length
    ? rutes.map((r) => renderSendCard(r)).join("")
    : `<div class="me-buit visible"><div class="me-buit-ico">🥾</div><p>Cap ruta amb els filtres seleccionats.</p></div>`;

  wrap.innerHTML = `
    <div class="send-filtres-wrap">
      <div class="send-filtres-inner">
        <div class="send-filtres-illes">${illes}</div>
        <div class="send-filtres-fila2">
          <div class="send-filtres-difs">${difs}</div>
          <div class="send-filtres-extra">
            <select class="send-ordre-sel" onchange="sendSetOrdre(this.value)">${ordreOpts}</select>
            ${comptador}
          </div>
        </div>
      </div>
    </div>
    <div class="send-grid">${cardsHtml}</div>`;
}

function sendFiltrarRutes() {
  let rutes = getSendList().filter((r) => {
    if (_sendIlla !== "Totes" && r.illa !== _sendIlla) return false;
    if (_sendDif !== "Totes" && r.dificultat !== _sendDif) return false;
    return true;
  });
  if (_sendOrdre === "prioritat")
    rutes.sort((a, b) => (a.prioritat || 99) - (b.prioritat || 99) || a.km - b.km);
  else if (_sendOrdre === "km") rutes.sort((a, b) => a.km - b.km);
  else if (_sendOrdre === "dp") rutes.sort((a, b) => (b.dp || 0) - (a.dp || 0));
  else rutes.sort((a, b) => a.nom.localeCompare(b.nom));
  return rutes;
}

function renderSendCard(r) {
  const illaColor = SEND_ILLA_COLOR[r.illa] || "#6aab7a";
  const difColor  = SEND_DIF_COLOR[r.dificultat] || "#6aab7a";
  const illaEmoji = SEND_ILLA_EMOJI[r.illa] || "";
  const illaLbl   = SEND_ILLA_LABEL[r.illa] || r.illa;
  const tipusIco  = SEND_TIPUS_ICON[r.tipus] || "";
  const isPri1    = r.prioritat === 1;

  const linkBtns = [
    r.wikiloc && `<a class="send-card-link" href="${escHtml(r.wikiloc)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">📍 Wikiloc</a>`,
    r.fullet  && `<a class="send-card-link" href="${escHtml(r.fullet)}"  target="_blank" rel="noopener" onclick="event.stopPropagation()">📄 PDF</a>`,
    r.trails  && `<a class="send-card-link" href="${escHtml(r.trails)}"  target="_blank" rel="noopener" onclick="event.stopPropagation()">🏃 AllTrails</a>`,
  ].filter(Boolean).join("");

  const descTrunc = r.desc && r.desc.length > 130 ? r.desc.slice(0, 130) + "…" : r.desc || "";

  return `<div class="send-card${isPri1 ? " send-card-pri" : ""}" style="--send-color:${illaColor}"
    onclick="sendOpenModal('${escHtml(r.id)}')" tabindex="0" role="button">
    <div class="send-card-header">
      ${isPri1 ? '<span class="send-badge-pri">⭐ Prioritari</span>' : ""}
      <span class="send-badge-codi">${escHtml(r.codi)}</span>
      <span class="send-badge-dif" style="background:${difColor}22;color:${difColor};border-color:${difColor}44">${escHtml(r.dificultat)}</span>
    </div>
    <h3 class="send-card-nom">${escHtml(r.nom)}</h3>
    <div class="send-card-meta">
      <span class="send-card-illa" style="color:${illaColor}">${illaEmoji} ${escHtml(illaLbl)}</span>
      <span class="send-card-tipus">${tipusIco} ${escHtml(r.tipus)}</span>
    </div>
    <div class="send-card-stats">
      <span title="Distància">📏 <strong>${r.km} km</strong></span>
      <span title="Desnivell positiu">↑ <strong>${r.dp || 0} m</strong></span>
      <span title="Temps aproximat">⏱️ <strong>${sendFmtTemps(r.temps)}</strong></span>
    </div>
    <p class="send-card-desc">${escHtml(descTrunc)}</p>
    <div class="send-card-links">${linkBtns}</div>
  </div>`;
}


function sendSetIlla(illa) {
  _sendIlla = illa;
  sendRenderTab();
}
function sendSetDif(dif) {
  _sendDif = dif;
  sendRenderTab();
}
function sendSetOrdre(o) {
  _sendOrdre = o;
  sendRenderTab();
}

function sendFmtTemps(t) {
  if (!t) return "—";
  const p = t.split(":");
  const h = parseInt(p[0] || 0),
    m = parseInt(p[1] || 0);
  if (h > 0) return m > 0 ? `${h}h ${m}min` : `${h}h`;
  return `${m}min`;
}

/* ══════════════════════════
   MODAL DE RUTA
   ══════════════════════════ */
async function sendOpenModal(routeId) {
  const r = getSendList().find((x) => x.id === routeId);
  if (!r) return;
  _sendElevRoute = r;
  _gpxData = null;
  _sendCumDist = null;

  const overlay = document.getElementById("sendModalOverlay");
  const content = document.getElementById("sendModalContingut");
  if (!overlay || !content) return;

  const illaColor = SEND_ILLA_COLOR[r.illa] || "#6aab7a";
  content.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:200px;color:${illaColor};font-size:1.1rem;">Carregant ruta...</div>`;
  overlay.classList.add("visible");
  document.body.classList.add("send-modal-open");

  /* Carregar GPX (amb cache) */
  if (r.gpx) {
    if (_gpxCache[r.id]) {
      _gpxData = _gpxCache[r.id];
    } else {
      try {
        const resp = await fetch("gpx/" + r.gpx + ".gpx");
        if (resp.ok) {
          _gpxData = parseGPXData(await resp.text());
          if (_gpxData) _gpxCache[r.id] = _gpxData;
        }
      } catch (e) {}
    }
  }

  /* Copiar dades GPX a _sendElevRoute per compatibilitat amb sendElevHover */
  if (_gpxData) {
    _sendElevRoute = Object.assign({}, r, {
      track: _gpxData.track,
      profile: _gpxData.profile,
      start: _gpxData.start,
    });
    _sendCumDist = _gpxData.cumDist;
  }

  const difColor  = SEND_DIF_COLOR[r.dificultat] || "#6aab7a";
  const illaEmoji = SEND_ILLA_EMOJI[r.illa] || "";
  const illaLbl   = SEND_ILLA_LABEL[r.illa] || r.illa;
  const tipusIco  = SEND_TIPUS_ICON[r.tipus] || "";
  const hasTrack  = _gpxData && _gpxData.track && _gpxData.track.length > 1;

  const consellsHtml = r.consells && r.consells.length
    ? `<div class="send-modal-consells">
        <h4 class="send-modal-sub">💡 Consells específics</h4>
        <ul class="send-modal-tips">${r.consells.map((c) => `<li>${escHtml(c)}</li>`).join("")}</ul>
      </div>` : "";

  const linksHtml = [
    r.gpx     && `<button class="send-modal-link send-modal-gpx" onclick="sendDownloadGPX()">⬇️ GPX</button>`,
    r.wikiloc && `<a class="send-modal-link" href="${escHtml(r.wikiloc)}" target="_blank" rel="noopener">📍 Wikiloc</a>`,
    r.fullet  && `<a class="send-modal-link" href="${escHtml(r.fullet)}"  target="_blank" rel="noopener">📄 Full informatiu PDF</a>`,
    r.trails  && `<a class="send-modal-link" href="${escHtml(r.trails)}"  target="_blank" rel="noopener">🏃 AllTrails</a>`,
  ].filter(Boolean).join("");

  content.innerHTML = `
    <div class="send-modal-header">
      <div class="send-modal-header-top">
        <span class="send-modal-codi">${escHtml(r.codi)}</span>
        <span class="send-badge-dif" style="background:${difColor}22;color:${difColor};border-color:${difColor}44">${escHtml(r.dificultat)}</span>
        <span class="send-modal-tipus">${tipusIco} ${escHtml(r.tipus)}</span>
      </div>
      <h2 class="send-modal-nom" style="color:${illaColor}">${escHtml(r.nom)}</h2>
      <div class="send-modal-illa" style="color:${illaColor}">${illaEmoji} ${escHtml(illaLbl)}</div>
    </div>
    <div class="send-modal-body">
      <div class="send-modal-vis">
        <div class="send-modal-map" id="sendModalMap"></div>
        <div class="send-modal-elev-wrap">
          ${hasTrack ? buildElevSvg(_gpxData.profile, illaColor) : '<div class="send-elev-na">Perfil no disponible</div>'}
        </div>
      </div>
      <div class="send-modal-info">
        <div class="send-modal-stats-grid">
          <div class="send-modal-stat"><span class="send-stat-ico">📏</span><span class="send-stat-val">${r.km} km</span><span class="send-stat-lbl">Distància</span></div>
          <div class="send-modal-stat"><span class="send-stat-ico">↑</span><span class="send-stat-val">${r.dp || 0} m</span><span class="send-stat-lbl">Desnivell +</span></div>
          <div class="send-modal-stat"><span class="send-stat-ico">↓</span><span class="send-stat-val">${r.dn || 0} m</span><span class="send-stat-lbl">Desnivell −</span></div>
          <div class="send-modal-stat"><span class="send-stat-ico">⏱️</span><span class="send-stat-val">${sendFmtTemps(r.temps)}</span><span class="send-stat-lbl">Temps net</span></div>
          <div class="send-modal-stat"><span class="send-stat-ico">⏳</span><span class="send-stat-val">${sendFmtTemps(r.temps_total)}</span><span class="send-stat-lbl">Temps total</span></div>
          <div class="send-modal-stat"><span class="send-stat-ico">${tipusIco}</span><span class="send-stat-val">${escHtml(r.tipus)}</span><span class="send-stat-lbl">Tipus</span></div>
        </div>
        ${r.inici ? `<div class="send-modal-inici">📍 <strong>Punt d'inici:</strong> ${escHtml(r.inici)}</div>` : ""}
        ${r.desc ? `<p class="send-modal-desc">${escHtml(r.desc)}</p>` : ""}
        ${consellsHtml}
        ${linksHtml ? `<div class="send-modal-links-row">${linksHtml}</div>` : ""}
      </div>
    </div>`;

  overlay.classList.add("visible");
  document.body.classList.add("send-modal-open");

  requestAnimationFrame(() => {
    const modal = document.getElementById("sendModal");
    const header = modal && modal.querySelector(".send-modal-header");
    const info   = modal && modal.querySelector(".send-modal-info");
    if (modal && header && info) {
      const h = modal.clientHeight - header.offsetHeight;
      info.style.height = h + "px";
      info.style.maxHeight = h + "px";
      info.style.overflowY = "auto";
    }
  });

  setTimeout(() => initSendModalMap(_sendElevRoute), 140);
}


function sendHideModal() {
  _sendElevMarker = null;
  _sendElevRoute = null;
  _sendCumDist = null;
  if (_sendMap) {
    try {
      _sendMap.off();
      _sendMap.remove();
    } catch (e) {}
    _sendMap = null;
  }
  const overlay = document.getElementById("sendModalOverlay");
  if (overlay) overlay.classList.remove("visible");
  document.body.classList.remove("send-modal-open");
}

function sendCloseModal(e) {
  if (e.target === document.getElementById("sendModalOverlay")) sendHideModal();
}

/* ── Mapa Leaflet al modal ── */
function initSendModalMap(r) {
  if (_sendMap) {
    try {
      _sendMap.off();
      _sendMap.remove();
    } catch (e) {}
    _sendMap = null;
  }
  const el = document.getElementById("sendModalMap");
  if (!el) return;
  // Clear any stale Leaflet state on the DOM node
  delete el._leaflet_id;

  const illaColor = SEND_ILLA_COLOR[r.illa] || "#6aab7a";

  const map = L.map("sendModalMap", {
    zoomControl: true,
    scrollWheelZoom: false,
  });
  _sendMap = map;

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
    {
      attribution: "© CartoDB",
      maxZoom: 18,
    },
  ).addTo(map);

  // Track polyline
  if (r.track && r.track.length > 1) {
    const poly = L.polyline(r.track, {
      color: illaColor,
      weight: 3.5,
      opacity: 0.9,
      smoothFactor: 1.5,
    }).addTo(map);

    // Marcador d'inici
    const startPt = r.start || r.track[0];
    if (startPt) {
      const startIcon = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
          <path d="M14 0C6.27 0 0 6.27 0 14c0 9.33 14 22 14 22s14-12.67 14-22C28 6.27 21.73 0 14 0z" fill="${illaColor}"/>
          <circle cx="14" cy="14" r="6" fill="rgba(0,0,0,0.4)"/>
          <text x="14" y="18.5" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="700" fill="white">S</text>
        </svg>`,
        className: "",
        iconSize: [28, 36],
        iconAnchor: [14, 36],
        popupAnchor: [0, -36],
      });
      L.marker(startPt, { icon: startIcon })
        .addTo(map)
        .bindTooltip("Punt d'inici", {
          direction: "top",
          className: "itin-tooltip",
        });
    }

    map.fitBounds(poly.getBounds(), { padding: [22, 22], maxZoom: 15 });
  } else if (r.coords_inici) {
    map.setView(r.coords_inici, 13);
  }

  // Leaflet needs a size recalc after display.
  // Capture the instance so we don't crash if modal was closed in the meantime.
  // Marcador interactiu per al perfil d'elevació (inicialment invisible)
  _sendElevMarker = L.circleMarker(
    r.start || (r.track && r.track[0]) || [0, 0],
    {
      radius: 8,
      color: "#ffffff",
      weight: 2,
      fillColor: illaColor,
      fillOpacity: 0,
      opacity: 0,
      interactive: false,
    },
  ).addTo(map);

  const mapInst = map;
  setTimeout(() => {
    if (_sendMap === mapInst) {
      try {
        mapInst.invalidateSize();
      } catch (e) {}
    }
  }, 60);
}

/* ── SVG perfil d'elevació ── */
function buildElevSvg(profile, color) {
  if (!profile || profile.length < 2)
    return '<div class="send-elev-na">Perfil no disponible</div>';

  // Downsample a màx 150 punts
  let pts = profile;
  if (pts.length > 150) {
    const step = Math.ceil(pts.length / 150);
    pts = pts.filter((_, i) => i % step === 0);
    const last = profile[profile.length - 1];
    if (pts[pts.length - 1] !== last) pts = [...pts, last];
  }

  const W = 600,
    H = 110;
  const PL = 44,
    PR = 10,
    PT = 10,
    PB = 26;
  const cW = W - PL - PR,
    cH = H - PT - PB;

  const maxKm = pts[pts.length - 1][0] || 1;
  const elevs = pts.map((p) => p[1]);
  const minEl = Math.min(...elevs);
  const maxEl = Math.max(...elevs);
  const rngEl = maxEl - minEl || 10;

  const sx = (km) => PL + (km / maxKm) * cW;
  const sy = (el) => PT + cH - ((el - minEl) / rngEl) * cH;

  const pStr = pts
    .map((p) => `${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`)
    .join(" ");
  const fStr = `${PL},${PT + cH} ${pStr} ${sx(maxKm).toFixed(1)},${PT + cH}`;

  // Eixos km (4 ticks)
  const xTicks = [0, 1, 2, 3]
    .map((i) => {
      const km = (maxKm * i) / 3;
      return `<text x="${sx(km).toFixed(1)}" y="${H - 4}" text-anchor="middle"
      font-family="sans-serif" font-size="9" fill="rgba(168,216,176,0.55)">${km.toFixed(1)} km</text>`;
    })
    .join("");

  // Eixos elevació (min, max)
  const yTicks = [
    `<text x="${PL - 4}" y="${(sy(minEl) + 4).toFixed(1)}" text-anchor="end"
      font-family="sans-serif" font-size="9" fill="rgba(168,216,176,0.55)">${Math.round(minEl)} m</text>`,
    `<text x="${PL - 4}" y="${(sy(maxEl) + 4).toFixed(1)}" text-anchor="end"
      font-family="sans-serif" font-size="9" fill="rgba(168,216,176,0.55)">${Math.round(maxEl)} m</text>`,
  ].join("");

  // Línies de grid horitzontals (2)
  const mid1 = minEl + rngEl / 3,
    mid2 = minEl + (2 * rngEl) / 3;
  const gridLines = [mid1, mid2]
    .map(
      (v) =>
        `<line x1="${PL}" y1="${sy(v).toFixed(1)}" x2="${W - PR}" y2="${sy(v).toFixed(1)}"
      stroke="rgba(106,171,122,0.1)" stroke-width="1" stroke-dasharray="3,4"/>`,
    )
    .join("");

  const gradId = `eg${Math.random().toString(36).slice(2, 6)}`;
  const cursorColor = color;

  return `<svg id="sendElevSvg" class="send-elev-svg" viewBox="0 0 ${W} ${H}"
    xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0.03"/>
      </linearGradient>
    </defs>
    ${gridLines}
    <line x1="${PL}" y1="${PT}" x2="${PL}" y2="${PT + cH}" stroke="rgba(106,171,122,0.2)" stroke-width="1"/>
    <line x1="${PL}" y1="${PT + cH}" x2="${W - PR}" y2="${PT + cH}" stroke="rgba(106,171,122,0.2)" stroke-width="1"/>
    <polygon points="${fStr}" fill="url(#${gradId})"/>
    <polyline points="${pStr}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round"/>
    ${yTicks}${xTicks}
    <g id="sendElevCursor" style="display:none" pointer-events="none">
      <line id="sendElevCursorLine" x1="0" y1="${PT}" x2="0" y2="${PT + cH}"
        stroke="rgba(255,255,255,0.5)" stroke-width="1" stroke-dasharray="3,2"/>
      <circle id="sendElevCursorDot" cx="0" cy="0" r="4"
        fill="${color}" stroke="white" stroke-width="1.5"/>
      <rect id="sendElevCursorBg" x="0" y="0" width="72" height="13" rx="3"
        fill="rgba(10,22,40,0.82)"/>
      <text id="sendElevCursorLbl" x="0" y="0"
        font-family="sans-serif" font-size="9" fill="rgba(200,230,205,0.95)"></text>
    </g>
    <rect x="${PL}" y="${PT}" width="${cW}" height="${cH}"
      fill="transparent" style="cursor:crosshair"
      onmousemove="sendElevHover(event)" onmouseleave="sendElevLeave()"/>
  </svg>`;
}

/* ══════════════════════════
   TAB: CONSELLS GENERALS
   ══════════════════════════ */
function renderSendConsells(wrap) {
  wrap.innerHTML = `
  <div class="send-cons-wrap">
    <section class="send-cons-sec">
      <h2 class="send-cons-titol">🌤️ 1. El temps: el gran protagonista</h2>
      <ul class="send-cons-list">
        <li><strong>Les "quatre estacions" en un dia:</strong> El clima canvia molt ràpidament. Podeu sortir amb un sol radiant i trobar boira densa o pluja en qüestió de minuts.</li>
        <li><strong>Previsió i Webcams:</strong> No confieu només en l'aplicació del temps. Useu <em>SpotAzores</em> per veure en directe l'estat de les muntanyes i els llacs a través de les càmeres web.</li>
        <li><strong>La boira (<em>nevoeiro</em>):</strong> Les rutes de muntanya alta o carena de cràter (Caldeira, Serra Devassa, Pico da Esperança) canvien radicalment amb la boira. Si la visibilitat és nul·la, no comencis la ruta: és perillós i et perdràs les vistes.</li>
        <li><strong>Flexibilitat:</strong> Si el cim d'un volcà està cobert de núvols, canvieu els plans i feu una ruta costanera o de boscos baixos aquell mateix dia.</li>
      </ul>
    </section>
    <section class="send-cons-sec">
      <h2 class="send-cons-titol">🎒 2. Equipament indispensable</h2>
      <ul class="send-cons-list">
        <li><strong>Sistema de capes:</strong> Samarreta transpirable, capa d'abric (polar prim) i, sobretot, un bon impermeable. Porteu sempre aquestes peces a la motxilla, independentment del pronòstic.</li>
        <li><strong>Calçat de senderisme:</strong> Els camins s'enfanguen amb facilitat i les pedres humides rellisquen molt. Calçat amb bona adherència (sola Vibram) i impermeable (Gore-Tex) és obligatori.</li>
        <li><strong>Bastons de trekking:</strong> Molt recomanables per a zones de forta baixada i per mantenir l'equilibri en trams enfangats.</li>
        <li><strong>Protecció solar, gorra i ulleres:</strong> El sol atlàntic és intens fins i tot amb núvols prims.</li>
      </ul>
    </section>
    <section class="send-cons-sec">
      <h2 class="send-cons-titol">🧭 3. Logística i Seguretat</h2>
      <ul class="send-cons-list">
        <li><strong>La Guia Oficial:</strong> Consulteu sempre <a class="send-cons-link" href="https://trails.visitazores.com/es/senderos-de-las-azores" target="_blank">trails.visitazores.com</a> per a l'estat dels senders: dificultat, distància i temps. Seguiu sempre les marques oficials.</li>
        <li><strong>Orientació offline:</strong> En zones de vegetació densa, molt útil tenir el mapa descarregat a <a class="send-cons-link" href="https://ca.wikiloc.com/" target="_blank">Wikiloc</a> o <a class="send-cons-link" href="https://mapy.com/es/turisticka?x=-27.3587758&y=38.1903513&z=8" target="_blank">mapy.cz</a>.</li>
        <li><strong>Respecte a l'entorn:</strong> Les Açores són zones protegides. No deixeu cap residu i manteniu-vos sempre dins dels camins per evitar l'erosió i respectar la flora autòctona.</li>
        <li><strong>Respecta els tancaments de bestiar:</strong> Molts senders creuen pastures privades. Obre la tanca per passar i torna-la a tancar immediatament per evitar que les vaques s'escapin.</li>
        <li><strong>Rutes lineals:</strong> Molts dels senders més bonics de les Açores són lineals (PR). Planifica el transport de tornada abans de començar: anota telèfons de taxis locals o acorda el trajecte.</li>
        <li><strong>Aigua i provisions:</strong> Fora dels nuclis urbans no trobaràs botigues ni fonts als senders de muntanya. Carrega sempre un mínim d'1,5 L per persona.</li>
        <li><strong>Telèfon i bateria:</strong> Porta el telèfon carregat i una bateria externa. Per estalviar bateria usa'l en mode avió: el GPS funcionarà igualment per seguir la ruta.</li>
        <li><strong>No t'apartis dels senders senyalitzats:</strong> La vegetació densa pot desorientar ràpidament, sobretot amb boira.</li>
        <li><strong>Respecta la flora endèmica:</strong> No arrenques plantes ni molestis la fauna. Moltes espècies estan protegides per llei.</li>
      </ul>
    </section>

    <!-- Senyals dels senders -->
    <section class="send-cons-sec send-cons-senyals">
      <h2 class="send-cons-titol">🪧 Senyals dels senders</h2>
      <p class="send-cons-intro">Els senders de les Açores segueixen la senyalització estàndard portuguesa. Aprèn a reconèixer els signes per no perdre't mai el camí.</p>
      <div class="send-senyals-grid">
        <div class="send-senyals-grup">
          <div class="send-senyals-titol">
            ${sendFranjaSvg("#f7c01a", "#d42020")} Petites Rutes (PR / PRC) — groc i vermell
          </div>
          <div class="send-senyals-fila">
            ${buildSenyalSvg("pr", "correcte")}
            ${buildSenyalSvg("pr", "erroni")}
            ${buildSenyalSvg("pr", "dreta")}
            ${buildSenyalSvg("pr", "esquerra")}
          </div>
        </div>
        <div class="send-senyals-grup">
          <div class="send-senyals-titol">
            ${sendFranjaSvg("#f0f0f0", "#d42020")} Grans Rutes (GR) — blanc i vermell
          </div>
          <div class="send-senyals-fila">
            ${buildSenyalSvg("gr", "correcte")}
            ${buildSenyalSvg("gr", "erroni")}
            ${buildSenyalSvg("gr", "dreta")}
            ${buildSenyalSvg("gr", "esquerra")}
          </div>
        </div>
      </div>
    </section>
  </div>`;
}

function sendFranjaSvg(c1, c2) {
  return `<svg width="28" height="14" viewBox="0 0 28 14" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;border-radius:3px;flex-shrink:0">
    <rect width="28" height="7" fill="${c1}"/>
    <rect y="7" width="28" height="7" fill="${c2}"/>
  </svg>`;
}

function buildSenyalSvg(tipus, signe) {
  const c1 = tipus === "pr" ? "#f7c01a" : "#f0f0f0";
  const c2 = "#d42020";
  const nom =
    signe === "correcte"
      ? "Camí Correcte"
      : signe === "erroni"
        ? "Camí Erroni"
        : signe === "dreta"
          ? "Gira a la Dreta"
          : "Gira a l'Esquerra";

  // ViewBox 72×72. Yellow bar full-width at top (y=8–21).
  // Gap 4px. Red shape starts y=25.
  // Dreta:    foot LEFT  + arrowhead pointing RIGHT →
  // Esquerra: foot RIGHT + arrowhead pointing LEFT  ←
  let body = "";
  if (signe === "correcte") {
    body = `
      <rect x="8" y="21" width="56" height="13" rx="1" fill="${c1}"/>
      <rect x="8" y="38" width="56" height="13" rx="1" fill="${c2}"/>`;
  } else if (signe === "erroni") {
    body = `
      <line x1="11" y1="11" x2="61" y2="61"
        stroke="${c1}" stroke-width="14" stroke-linecap="round"/>
      <line x1="61" y1="11" x2="11" y2="61"
        stroke="${c2}" stroke-width="14" stroke-linecap="round"/>`;
  } else if (signe === "dreta") {
    // Foot on LEFT, triangle arrowhead pointing RIGHT at end of horizontal
    body = `
      <rect x="8" y="8" width="56" height="13" rx="1" fill="${c1}"/>
      <polygon points="8,25 62,25 68,32 62,39 22,39 22,63 8,63" fill="${c2}"/>`;
  } else {
    // Foot on RIGHT, triangle arrowhead pointing LEFT at start of horizontal
    body = `
      <rect x="8" y="8" width="56" height="13" rx="1" fill="${c1}"/>
      <polygon points="4,32 10,25 64,25 64,63 50,63 50,39 10,39" fill="${c2}"/>`;
  }

  return `<div class="send-senyal-item">
    <svg viewBox="0 0 72 72" class="send-senyal-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="72" height="72" rx="6" fill="rgba(200,189,212,0.18)"/>
      ${body}
    </svg>
    <span class="send-senyal-lbl">${nom}</span>
  </div>`;
}

/* ══════════════════════════
   TAB: MÉS INFORMACIÓ
   ══════════════════════════ */
function renderSendLinks(wrap) {
  const seccions = [
    {
      titol: "🌍 General",
      links: [
        {
          url: "https://trails.visitazores.com/es/senderos-de-las-azores",
          nom: "VisitAzores – Senders oficials",
          desc: "Totes les rutes homologades amb fitxes, mapes i fullets PDF.",
        },
        {
          url: "https://www.alltrails.com/es/portugal/azores",
          nom: "AllTrails – Açores",
          desc: "Mapes interactius, fotos i valoracions de la comunitat.",
        },
        {
          url: "https://ca.wikiloc.com/rutes/senderisme/portugal/azores",
          nom: "Wikiloc – Açores",
          desc: "Tracks GPS de totes les illes descarregables offline.",
        },
        {
          url: "https://byacores.com/es/rutas-senderismo/",
          nom: "ByAzores – Rutes de senderisme",
          desc: "Selecció comentada de rutes per illes.",
        },
        {
          url: "https://www.trilhosecaminhadas.pt/percursos/distrito/acores/",
          nom: "Trilhos e Caminhadas – Açores",
          desc: "Directori de percursos pedestres portuguesos.",
        },
        {
          url: "https://www.azoren-wanderfuehrer.de/es/rutas-de-senderismo-tur%C3%ADstico/",
          nom: "Azoren-Wanderführer",
          desc: "Guia de senderisme turístic de les Açores.",
        },
        {
          url: "https://travesiapirenaica.com/rutas-azores/",
          nom: "Travesía Pirenaica – Açores",
          desc: "Anàlisi detallada de les millors rutes.",
        },
        {
          url: "https://www.dareyouspot.com/Routes/ListSearch",
          nom: "DareYouSpot – Rutes",
          desc: "Recerca de rutes per zona i dificultat.",
        },
      ],
    },
    {
      titol: "🌋 São Miguel",
      links: [
        {
          url: "https://destinoymaleta.com/europa/portugal/senderismo-en-sao-miguel/",
          nom: "Destino y Maleta – Senderisme São Miguel",
          desc: "Guia completa de senderisme a l'illa gran.",
        },
        {
          url: "https://www.viajarnotieneedad.com/senderismo-sao-miguel-6-paseos-inolvidables/",
          nom: "Viajar no tiene edad – 6 passejos",
          desc: "Sis rutes memorables a São Miguel.",
        },
        {
          url: "https://www.codigotravel.com/portugal/azores/senderismo-sao-miguel/",
          nom: "Código Travel – São Miguel",
          desc: "Descripció detallada de les principals rutes.",
        },
        {
          url: "https://gataconbotas.com/rutas/portugal/azores/",
          nom: "Gata con Botas – Açores",
          desc: "Rutes des d'una perspectiva de senderisme actiu.",
        },
        {
          url: "https://www.saomiguelguide.com/post/rutas-faciles-sao-miguel-azores",
          nom: "São Miguel Guide – Rutes fàcils",
          desc: "Les millors rutes per a tots els nivells.",
        },
        {
          url: "https://www.saomiguelguide.com/post/rutas-senderismo-sao-miguel-azores",
          nom: "São Miguel Guide – Senderisme",
          desc: "Guia general de senderisme a São Miguel.",
        },
        {
          url: "https://www.azoreschoice.com/blog/azores-walking-guides-sao-miguel/",
          nom: "AzoresChoice – Walking Guide São Miguel",
          desc: "Guia de caminades amb informació pràctica.",
        },
        {
          url: "https://welikeazores.com/mejores-rutas-de-senderismo-en-sao-miguel/",
          nom: "WeLikeAzores – Les millors rutes SM",
          desc: "Selecció de les rutes més destacades.",
        },
        {
          url: "https://azoresgetaways.com/pt-pt/destination/azores/islands/sao-miguel/trilhos-percursos-pedestres-ilha-sao-miguel",
          nom: "Azores Getaways – Trilhos São Miguel",
          desc: "Percursos pedestres oficials de l'illa.",
        },
      ],
    },
    {
      titol: "⛰️🐉💙 Resta d'illes",
      links: [
        {
          url: "https://www.azoreschoice.com/blog/azores-walking-guides-sao-jorge/",
          nom: "AzoresChoice – Walking Guide São Jorge",
          desc: "Les rutes cap a les fajãs i les crestes.",
        },
        {
          url: "https://www.azoreschoice.com/blog/azores-walking-guides-faial/",
          nom: "AzoresChoice – Walking Guide Faial",
          desc: "Caldeira, Capelinhos i les rutes de levada.",
        },
        {
          url: "https://www.azoreschoice.com/blog/azores-walking-guides-pico/",
          nom: "AzoresChoice – Walking Guide Pico",
          desc: "Caminho das Lagoas i les rutes volcàniques.",
        },
        {
          url: "https://welikeazores.com/10-mejores-rutas-senderismo-faial/",
          nom: "WeLikeAzores – 10 millors rutes Faial",
          desc: "Les rutes més recomanades de Faial.",
        },
        {
          url: "https://welikeazores.com/rutas-senderismo-pico-azores/",
          nom: "WeLikeAzores – Senderisme Pico",
          desc: "Rutes de senderisme per l'illa del volcà.",
        },
      ],
    },
  ];
  const html = seccions
    .map(
      (s) => `
    <div class="send-links-sec">
      <h3 class="send-links-titol">${s.titol}</h3>
      <div class="send-links-grid">
        ${s.links
          .map(
            (l) => `
          <a class="send-links-card" href="${escHtml(l.url)}" target="_blank" rel="noopener">
            <span class="send-links-nom">${escHtml(l.nom)}</span>
            <span class="send-links-desc">${escHtml(l.desc)}</span>
            <span class="send-links-url">${escHtml(linkHostname(l.url))}</span>
          </a>`,
          )
          .join("")}
      </div>
    </div>`,
    )
    .join("");
  wrap.innerHTML = `<div class="send-links-wrap">${html}</div>`;
}

/* ══════════════════════════════════════════════════════════════
   SENDERISME — FUNCIONS INTERACTIVES (GPX + Perfil d'elevació)
   ══════════════════════════════════════════════════════════════ */

/* ── Descàrrega GPX ── */
function sendDownloadGPX() {
  const r = _sendElevRoute;
  if (!r || !r.gpx) return;
  const a = Object.assign(document.createElement("a"), {
    href: "gpx/" + r.gpx + ".gpx",
    download: r.gpx + ".gpx",
  });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* ── Distàncies acumulades del track (km) ── */
function sendCalcCumDist(track) {
  const R = 6371;
  const rad = (d) => (d * Math.PI) / 180;
  const cum = [0];
  for (let i = 1; i < track.length; i++) {
    const [la1, lo1] = track[i - 1],
      [la2, lo2] = track[i];
    const dlat = rad(la2 - la1),
      dlng = rad(lo2 - lo1);
    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(rad(la1)) * Math.cos(rad(la2)) * Math.sin(dlng / 2) ** 2;
    cum.push(
      cum[cum.length - 1] + R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
    );
  }
  return cum;
}

/* ── Interpolació d'elevació (profile[][km,elev], km en espai del perfil) ── */
function sendInterpElev(profile, km, maxKm) {
  if (!profile || !profile.length) return null;
  if (km <= 0) return profile[0][1];
  if (km >= maxKm) return profile[profile.length - 1][1];
  let lo = 0,
    hi = profile.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (profile[mid][0] <= km) lo = mid;
    else hi = mid;
  }
  const range = profile[hi][0] - profile[lo][0];
  if (range <= 0) return profile[lo][1];
  const t = (km - profile[lo][0]) / range;
  return profile[lo][1] + t * (profile[hi][1] - profile[lo][1]);
}

/* ── Punt del track a una distància acumulada donada ── */
function sendTrackPtAtKm(track, cumDist, km) {
  if (!track || !cumDist || km <= 0) return track[0];
  const total = cumDist[cumDist.length - 1];
  if (km >= total) return track[track.length - 1];
  let lo = 0,
    hi = cumDist.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (cumDist[mid] <= km) lo = mid;
    else hi = mid;
  }
  const t =
    cumDist[hi] - cumDist[lo] > 0
      ? (km - cumDist[lo]) / (cumDist[hi] - cumDist[lo])
      : 0;
  return [
    track[lo][0] + t * (track[hi][0] - track[lo][0]),
    track[lo][1] + t * (track[hi][1] - track[lo][1]),
  ];
}

/* ── Handler mousemove sobre el perfil d'elevació ── */
function sendElevHover(e) {
  const r = _sendElevRoute;
  if (!r || !r.profile) return;
  const svgEl = document.getElementById("sendElevSvg");
  if (!svgEl) return;

  const bbox = svgEl.getBoundingClientRect();
  const W = 600,
    H = 110,
    PL = 44,
    PR = 10,
    PT = 10,
    PB = 26;
  const cW = W - PL - PR,
    cH = H - PT - PB;

  // Mouse X en coordenades del viewBox (scale non-uniform amb preserveAspectRatio:none)
  const svgX = ((e.clientX - bbox.left) / bbox.width) * W;
  if (svgX < PL || svgX > W - PR) {
    sendElevLeave();
    return;
  }

  const maxKm = r.profile[r.profile.length - 1][0];
  const km = ((svgX - PL) / cW) * maxKm;
  const elev = sendInterpElev(r.profile, km, maxKm);

  // Y en coordenades viewBox
  const elevs = r.profile.map((p) => p[1]);
  const minEl = Math.min(...elevs),
    maxEl = Math.max(...elevs);
  const rngEl = maxEl - minEl || 10;
  const svgY = PT + cH - ((elev - minEl) / rngEl) * cH;

  // Actualitzar línia cursor
  const cursorG = document.getElementById("sendElevCursor");
  if (!cursorG) return;
  cursorG.style.display = "";
  document
    .getElementById("sendElevCursorLine")
    .setAttribute("x1", svgX.toFixed(1));
  document
    .getElementById("sendElevCursorLine")
    .setAttribute("x2", svgX.toFixed(1));

  // Dot
  const dot = document.getElementById("sendElevCursorDot");
  dot.setAttribute("cx", svgX.toFixed(1));
  dot.setAttribute("cy", svgY.toFixed(1));

  // Label (tooltip) — ajustar posició per no sortir del SVG
  const lbl = document.getElementById("sendElevCursorLbl");
  const bg = document.getElementById("sendElevCursorBg");
  const lblW = 72,
    lblH = 13;
  const lblX = svgX + 7 + lblW > W - PR ? svgX - lblW - 5 : svgX + 7;
  const lblY = Math.max(PT + lblH, svgY - 2);
  bg.setAttribute("x", lblX.toFixed(1));
  bg.setAttribute("y", (lblY - lblH + 2).toFixed(1));
  lbl.setAttribute("x", (lblX + 4).toFixed(1));
  lbl.setAttribute("y", (lblY - 3).toFixed(1));
  lbl.textContent = `${km.toFixed(1)} km  ·  ${Math.round(elev)} m`;

  // Moure marcador al mapa
  if (_sendMap && _sendCumDist && _sendElevMarker && r.track) {
    const trackTotal = _sendCumDist[_sendCumDist.length - 1];
    const trackKm = (km / maxKm) * trackTotal;
    const [lat, lng] = sendTrackPtAtKm(r.track, _sendCumDist, trackKm);
    try {
      _sendElevMarker.setLatLng([lat, lng]);
      _sendElevMarker.setStyle({ opacity: 1, fillOpacity: 0.85 });
    } catch (err) {}
  }
}

function sendElevLeave() {
  const cursorG = document.getElementById("sendElevCursor");
  if (cursorG) cursorG.style.display = "none";
  if (_sendElevMarker) {
    try {
      _sendElevMarker.setStyle({ opacity: 0, fillOpacity: 0 });
    } catch (e) {}
  }
}
