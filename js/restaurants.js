// ── CONSTANTS ──────────────────────────────────────────────────────────
const GOOGLE_KEY = "AIzaSyDnvUnUEUUUrBiyaArGEHSQln_6A2Q_A84";

const CAPITALS = {
  faial: { lat: 38.5311, lon: -28.6267, nom: "Horta" },
  pico: { lat: 38.532, lon: -28.5271, nom: "Madalena" },
  "sao-jorge": { lat: 38.6784, lon: -28.2012, nom: "Velas" },
  "sao-miguel": { lat: 37.7412, lon: -25.6756, nom: "Ponta Delgada" },
};

const ILLA_NOMS = {
  "sao-miguel": "São Miguel",
  "sao-jorge": "São Jorge",
  pico: "Pico",
  faial: "Faial",
};

const PREU_ORDER = { "€": 1, "€€": 2, "€€€": 3, "€€€€": 4 };
const DIST_CACHE_KEY = "rest_dist_capitals_v1";

// ── ESTAT ──────────────────────────────────────────────────────────────
let state = {
  illa: "totes",
  cuines: [],
  preu: "",
  distMax: 0,
  sortBy: "puntuacio",
  userLat: null,
  userLon: null,
  userLabel: null,
  usingCap: true,
  distances: {},
};

let map = null;
let markers = {};
let filteredIds = [];

// ── INIT ───────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  populateCuinesSelect();
  renderAll();
  bindEvents();
  initDefaultDistances();
});

// ── DISTÀNCIES A CAPITALS (càlcul únic, guardat a localStorage) ────────
async function initDefaultDistances() {
  const cached = localStorage.getItem(DIST_CACHE_KEY);
  if (cached) {
    try {
      state.distances = JSON.parse(cached);
      state.usingCap = true;
      renderAll();
      return;
    } catch (e) {
      localStorage.removeItem(DIST_CACHE_KEY);
    }
  }

  const illes = ["faial", "pico", "sao-jorge", "sao-miguel"];
  const allDist = {};

  for (const illa of illes) {
    const cap = CAPITALS[illa];
    const rests = RESTAURANTS.filter((r) => r.illa === illa && r.lat && r.lon);
    if (!rests.length) continue;
    const chunks = [];
    for (let i = 0; i < rests.length; i += 25)
      chunks.push(rests.slice(i, i + 25));

    for (const chunk of chunks) {
      const origin = `${cap.lat},${cap.lon}`;
      const dests = chunk.map((r) => `${r.lat},${r.lon}`).join("|");
      try {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${encodeURIComponent(dests)}&mode=driving&language=ca&key=${GOOGLE_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.rows && data.rows[0]) {
          data.rows[0].elements.forEach((el, i) => {
            if (el.status === "OK") {
              allDist[chunk[i].id] = {
                dist: el.distance.text,
                temps: el.duration.text,
                distKm: el.distance.value / 1000,
                cap: cap.nom,
              };
            }
          });
        }
      } catch (e) {
        chunk.forEach((r) => {
          const km = haversine(cap.lat, cap.lon, r.lat, r.lon);
          allDist[r.id] = {
            dist: `~${km.toFixed(1)} km`,
            temps: `~${Math.round((km / 40) * 60)} min`,
            distKm: km,
            cap: cap.nom,
          };
        });
      }
    }
  }

  localStorage.setItem(DIST_CACHE_KEY, JSON.stringify(allDist));
  state.distances = allDist;
  state.usingCap = true;
  renderAll();
}

function resetToCapitalDist() {
  const cached = localStorage.getItem(DIST_CACHE_KEY);
  if (cached) {
    try {
      state.distances = JSON.parse(cached);
    } catch (e) {
      state.distances = {};
    }
  } else {
    state.distances = {};
    initDefaultDistances();
    return;
  }
  state.userLat = null;
  state.userLon = null;
  state.userLabel = null;
  state.usingCap = true;
  document.getElementById("pos-status").textContent = "";
  document.getElementById("pos-text").value = "";
  document.getElementById("btn-gps").classList.remove("active");
  renderAll();
}

// ── MAPA ───────────────────────────────────────────────────────────────
const MAP_TILES = {
  Voyager:
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  Clar: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  Topo: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  "Satèl·lit":
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  OSM: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

let currentTileLayer = null;

function initMap() {
  map = L.map("rest-map", { center: [38.5, -27.8], zoom: 8 });
  currentTileLayer = L.tileLayer(MAP_TILES["Voyager"], {
    attribution: "© OpenStreetMap © CARTO",
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);
  setTimeout(() => map.invalidateSize(), 100);
}

function setMapStyle(style) {
  if (currentTileLayer) map.removeLayer(currentTileLayer);
  currentTileLayer = L.tileLayer(MAP_TILES[style], {
    attribution: "© OpenStreetMap © CARTO",
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);
  document
    .querySelectorAll(".map-style-btn")
    .forEach((b) => b.classList.toggle("active", b.dataset.style === style));
}

function pinColor(r) {
  if (r.top10) return "#f0b429";
  if (r.editor === 1) return "#FFD700";
  if (r.editor === 2) return "#C0C0C0";
  if (r.editor === 3) return "#CD7F32";
  return "#6aab7a";
}

function pinIcon(r) {
  const color = pinColor(r);
  const star = r.top10
    ? "⭐"
    : r.editor
      ? ["🥇", "🥈", "🥉"][r.editor - 1]
      : "";
  return L.divIcon({
    html: `<div style="background:${color};border:2px solid #fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:10px;box-shadow:0 1px 4px rgba(0,0,0,0.4);">${star || "🍽️"}</div>`,
    className: "",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -14],
  });
}

function renderMarkers() {
  Object.values(markers).forEach((m) => map.removeLayer(m));
  markers = {};
  const visible = RESTAURANTS.filter((r) => filteredIds.includes(r.id));
  visible.forEach((r) => {
    if (!r.lat || !r.lon) return;
    const marker = L.marker([r.lat, r.lon], { icon: pinIcon(r) }).addTo(map);
    const dist = state.distances[r.id];
    const distText = dist
      ? `<div style="font-size:0.75rem;color:#6aab7a;">🚗 ${dist.temps} · ${dist.dist}</div>`
      : "";
    marker.bindPopup(`
      <div style="min-width:180px;">
        <strong style="font-size:0.9rem;color:#1a3a2a;">${r.nom}</strong>
        <div style="font-size:0.78rem;color:#555;margin:2px 0;">${r.localitat} · ${r.preu_google || ""}</div>
        ${distText}
        <div style="margin-top:6px;font-size:0.78rem;">
          ⭐ ${r.punt_ponderada || "—"}
          ${r.top10 ? '<span style="color:#f0b429;margin-left:6px;">🏆 Top10</span>' : ""}
        </div>
      </div>
    `);
    marker.on("mouseover", () => {
      marker.openPopup();
      const card = document.querySelector(`.rest-card[data-id="${r.id}"]`);
      if (card) card.classList.add("highlighted");
    });
    marker.on("mouseout", () => {
      document
        .querySelectorAll(".rest-card")
        .forEach((c) => c.classList.remove("highlighted"));
    });
    marker.on("click", () => {
      const card = document.querySelector(`.rest-card[data-id="${r.id}"]`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        openDetail(r.id);
      }
    });
    markers[r.id] = marker;
  });
  if (visible.length > 0) {
    const bounds = visible
      .filter((r) => r.lat && r.lon)
      .map((r) => [r.lat, r.lon]);
    if (bounds.length)
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 13 });
  }
}

// ── FILTRE I ORDENACIÓ ─────────────────────────────────────────────────
function filtered() {
  let list = [...RESTAURANTS];
  if (state.illa !== "totes") list = list.filter((r) => r.illa === state.illa);
  if (state.cuines.length > 0) {
    list = list.filter((r) =>
      state.cuines.some((c) =>
        r.cuines.map((x) => x.toLowerCase()).includes(c.toLowerCase()),
      ),
    );
  }
  if (state.preu) {
    list = list.filter(
      (r) =>
        (r.preu_google || "").includes(state.preu) ||
        (r.preu_ta || "").includes(state.preu),
    );
  }
  if (state.distMax > 0 && Object.keys(state.distances).length > 0) {
    list = list.filter((r) => {
      const d = state.distances[r.id];
      return !d || d.distKm <= state.distMax;
    });
  }
  list.sort((a, b) => {
    switch (state.sortBy) {
      case "puntuacio":
        return (b.punt_ponderada || 0) - (a.punt_ponderada || 0);
      case "preu-asc":
        return (
          (PREU_ORDER[preusimple(a)] || 0) - (PREU_ORDER[preusimple(b)] || 0)
        );
      case "preu-desc":
        return (
          (PREU_ORDER[preusimple(b)] || 0) - (PREU_ORDER[preusimple(a)] || 0)
        );
      case "distancia":
        return (
          (state.distances[a.id]?.distKm ?? 9999) -
          (state.distances[b.id]?.distKm ?? 9999)
        );
      case "nom":
        return a.nom.localeCompare(b.nom);
      default:
        return 0;
    }
  });
  return list;
}

function preusimple(r) {
  const m = (r.preu_google || r.preu_ta || "").match(/€+/);
  return m ? m[0] : "€";
}

// ── RENDER ─────────────────────────────────────────────────────────────
function renderAll() {
  const list = filtered();
  filteredIds = list.map((r) => r.id);
  const illaText = state.illa !== "totes" ? ` a ${ILLA_NOMS[state.illa]}` : "";
  document.querySelector(".rest-subtitle").innerHTML =
    `Selecció de restaurants a les Açores · <span id="rest-count">${list.length}</span> recomanats${illaText}`;
  renderList(list);
  renderMarkers();
  renderCuinesActives();
}

function renderList(list) {
  const container = document.getElementById("rest-list");
  if (list.length === 0) {
    container.innerHTML =
      '<div class="rest-empty">Cap restaurant coincideix amb els filtres actuals.</div>';
    return;
  }
  container.innerHTML = list.map((r) => cardHtml(r)).join("");
  container.querySelectorAll(".rest-card").forEach((card) => {
    const id = parseInt(card.dataset.id);
    initCarrusel(card);
    card.addEventListener("mouseenter", () => {
      const m = markers[id];
      if (m) m.openPopup();
    });
    card.addEventListener("mouseleave", () => {
      Object.values(markers).forEach((m) => m.closePopup());
    });
    card
      .querySelector(".rest-card-top")
      .addEventListener("click", () => toggleDetail(id));
    card.querySelectorAll(".cuina-tag").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        e.stopPropagation();
        addCuina(tag.dataset.cuina);
      });
    });
  });
}

function cardHtml(r) {
  // Primer TA (URLs estables), després Google
  const fotosTA = (r.fotos_ta || []).map((f) => ({
    url: f,
    font: "TripAdvisor",
  }));
  const fotosG = (r.fotos_google || []).map((f) => ({
    url: f,
    font: "Google",
  }));
  const fotos = [...fotosTA, ...fotosG];

  const fotosHtml = fotos.length
    ? fotos
        .slice(0, 8)
        .map(
          (f, i) => `
        <div class="rest-foto-wrap${i === 0 ? " active" : ""}">
          <img class="rest-foto" src="${f.url}" loading="lazy" alt=""
               onerror="this.closest('.rest-foto-wrap').style.display='none'">
          <span class="foto-font">${f.font}</span>
        </div>`,
        )
        .join("") +
      (fotos.length > 1
        ? `<div class="foto-nav">${fotos
            .slice(0, 8)
            .map(
              (_, i) =>
                `<div class="foto-dot${i === 0 ? " active" : ""}" data-idx="${i}"></div>`,
            )
            .join("")}</div>`
        : "")
    : '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#2d5a3d;font-size:2rem;">🍽️</div>';

  const editorBadge = r.editor
    ? `<span class="badge-editor ${["gold", "silver", "bronze"][r.editor - 1]}">${["🥇", "🥈", "🥉"][r.editor - 1]}</span>`
    : "";
  const top10Badge = r.top10 ? `<span class="badge-top10">🏆 Top10</span>` : "";
  const puntGoogle = r.punt_google
    ? `<span class="punt-item"><span class="punt-logo google">G</span><span class="punt-valor">${r.punt_google.toFixed(1)}</span><span style="font-size:0.7rem;color:#888">(${(r.res_google || 0).toLocaleString("ca")})</span></span>`
    : "";
  const puntTA = r.punt_ta
    ? `<span class="punt-item"><span class="punt-logo ta">T</span><span class="punt-valor">${r.punt_ta.toFixed(1)}</span><span style="font-size:0.7rem;color:#888">(${(r.res_ta || 0).toLocaleString("ca")})</span></span>`
    : "";
  const puntPond = r.punt_ponderada
    ? `<span class="punt-ponderada">${r.punt_ponderada.toFixed(1)}</span>`
    : "";
  const preuHtml = [
    r.preu_google
      ? `<span class="preu-item"><span class="punt-logo google">G</span>${r.preu_google}</span>`
      : "",
    r.preu_ta
      ? `<span class="preu-item"><span class="punt-logo ta">T</span>${r.preu_ta}</span>`
      : "",
  ]
    .filter(Boolean)
    .join("");
  const cuinesHtml = r.cuines
    .map((c) => `<span class="cuina-tag" data-cuina="${c}">${c}</span>`)
    .join("");

  const dist = state.distances[r.id];
  const distHtml = dist
    ? `<div class="rest-dist">🚗 <strong>${dist.temps}</strong>&nbsp;(${dist.dist}) des de ${dist.cap || state.userLabel || ""}</div>`
    : "";

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const telBtn =
    r.telefon && isMobile
      ? `<a href="tel:${r.telefon}" class="action-btn" onclick="event.stopPropagation()">📞 Trucar</a>`
      : "";
  const waBtn =
    r.google_maps && isMobile
      ? `<a href="https://wa.me/?text=${encodeURIComponent(r.nom + " " + r.google_maps)}" class="action-btn" onclick="event.stopPropagation()">💬 Compartir</a>`
      : "";
  const mapsBtn = r.google_maps
    ? `<a href="${r.google_maps}" target="_blank" class="action-btn primary" onclick="event.stopPropagation()">🗺️ Maps</a>`
    : "";
  const taBtn = r.tripadvisor
    ? `<a href="${r.tripadvisor}" target="_blank" class="action-btn" onclick="event.stopPropagation()">🦉 TripAdvisor</a>`
    : "";

  return `
  <div class="rest-card" data-id="${r.id}">
    <div class="rest-card-top">
      <div class="rest-fotos">${fotosHtml}</div>
      <div class="rest-card-info">
        <div class="rest-card-header">
          <div class="rest-nom-wrap">${top10Badge}${editorBadge}<span class="rest-nom">${r.nom}</span></div>
          <span style="color:#6aab7a;font-size:0.8rem;">${r.localitat}</span>
        </div>
        <div class="rest-punts">${puntGoogle}${puntTA}${puntPond ? '<span style="color:#6aab7a;font-size:0.8rem;">·</span>' + puntPond : ""}</div>
        <div class="rest-preus">${preuHtml}</div>
        <div class="rest-cuines">${cuinesHtml}</div>
        ${distHtml}
        <div class="rest-actions">${mapsBtn}${taBtn}${telBtn}${waBtn}</div>
      </div>
    </div>
    <div class="rest-card-detail" id="detail-${r.id}"></div>
  </div>`;
}

// ── DETALL ─────────────────────────────────────────────────────────────
function toggleDetail(id) {
  const detail = document.getElementById(`detail-${id}`);
  if (!detail) return;
  if (detail.classList.contains("open")) {
    detail.classList.remove("open");
    detail.innerHTML = "";
  } else openDetail(id);
}

function openDetail(id) {
  const r = RESTAURANTS.find((x) => x.id === id);
  if (!r) return;
  const detail = document.getElementById(`detail-${id}`);
  if (!detail) return;
  const resHtml = (r.ressenyes || [])
    .map((res) => {
      const stars = "⭐".repeat(Math.round(res.puntuacio || 0));
      const isTA = res.data && res.data.toLowerCase().includes("tripadvisor");
      return `<div class="ressenya-item">
      <div class="ressenya-header">
        <span class="punt-logo ${isTA ? "ta" : "google"}">${isTA ? "T" : "G"}</span>
        <span class="ressenya-autor">Ressenya</span>
        <span class="stars">${stars}</span>
        <span class="ressenya-data">${res.data || ""}</span>
      </div>
      <div class="ressenya-text">${res.text || ""}</div>
    </div>`;
    })
    .join("");
  detail.innerHTML = `
    <div class="detail-section">
      <h4>ℹ️ Informació</h4>
      ${r.adreca ? `<div class="detail-info-item">📍 ${r.adreca}</div>` : ""}
      ${r.plus_code ? `<div class="detail-info-item">🔲 ${r.plus_code}</div>` : ""}
      ${r.horari ? `<div class="detail-info-item">🕐 ${r.horari}</div>` : ""}
      ${r.telefon ? `<div class="detail-info-item">📞 <a href="tel:${r.telefon}">${r.telefon}</a></div>` : ""}
      ${r.web ? `<div class="detail-info-item">🌐 <a href="${r.web}" target="_blank">${r.web.replace(/^https?:\/\//, "")}</a></div>` : ""}
    </div>
    <div class="detail-section">
      <h4>💬 Últimes ressenyes</h4>
      ${resHtml || '<p style="color:#6aab7a;font-size:0.8rem;">No hi ha ressenyes disponibles.</p>'}
    </div>`;
  detail.classList.add("open");
}

// ── CARRUSEL ───────────────────────────────────────────────────────────
function initCarrusel(card) {
  const fotos = card.querySelectorAll(".rest-foto-wrap");
  const dots = card.querySelectorAll(".foto-dot");
  if (fotos.length <= 1) return;
  let current = 0;
  setInterval(() => {
    fotos[current].classList.remove("active");
    dots[current]?.classList.remove("active");
    current = (current + 1) % fotos.length;
    fotos[current].classList.add("active");
    dots[current]?.classList.add("active");
  }, 3000);
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      fotos[current].classList.remove("active");
      dots[current]?.classList.remove("active");
      current = parseInt(dot.dataset.idx);
      fotos[current].classList.add("active");
      dots[current]?.classList.add("active");
    });
  });
}

// ── DISTÀNCIES MANUALS ─────────────────────────────────────────────────
async function calcDistances(ids) {
  if (!state.userLat || !state.userLon || !ids.length) return;
  const origin = `${state.userLat},${state.userLon}`;
  const chunks = [];
  for (let i = 0; i < ids.length; i += 25) chunks.push(ids.slice(i, i + 25));
  for (const chunk of chunks) {
    const rests = chunk
      .map((id) => RESTAURANTS.find((r) => r.id === id))
      .filter(Boolean);
    const dests = rests.map((r) => `${r.lat},${r.lon}`).join("|");
    try {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${encodeURIComponent(dests)}&mode=driving&language=ca&key=${GOOGLE_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.rows && data.rows[0]) {
        data.rows[0].elements.forEach((el, i) => {
          if (el.status === "OK") {
            state.distances[rests[i].id] = {
              dist: el.distance.text,
              temps: el.duration.text,
              distKm: el.distance.value / 1000,
            };
          }
        });
      }
    } catch (e) {
      rests.forEach((r) => {
        if (r.lat && r.lon) {
          const km = haversine(state.userLat, state.userLon, r.lat, r.lon);
          state.distances[r.id] = {
            dist: `~${km.toFixed(1)} km`,
            temps: `~${Math.round((km / 40) * 60)} min`,
            distKm: km,
          };
        }
      });
    }
  }
  renderAll();
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371,
    dLat = ((lat2 - lat1) * Math.PI) / 180,
    dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function geocodeText(text) {
  const queries = [`${text}, Açores, Portugal`, `${text}, Azores`, text];
  for (const q of queries) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`;
      const res = await fetch(url, {
        headers: { "Accept-Language": "ca,pt,en" },
      });
      const data = await res.json();
      if (data && data[0]) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
          label: data[0].display_name,
        };
      }
    } catch (e) {
      console.warn("Geocode error:", e);
    }
  }
  return null;
}

// ── CUINES ─────────────────────────────────────────────────────────────
function populateCuinesSelect() {
  const cuines = new Set();
  RESTAURANTS.forEach((r) => r.cuines.forEach((c) => cuines.add(c.trim())));
  const sel = document.getElementById("filter-cuina");
  [...cuines].sort().forEach((c) => {
    const o = document.createElement("option");
    o.value = c;
    o.textContent = c;
    sel.appendChild(o);
  });
}

function addCuina(cuina) {
  if (!state.cuines.includes(cuina)) {
    state.cuines.push(cuina);
    renderAll();
  }
}

function removeCuina(cuina) {
  state.cuines = state.cuines.filter((c) => c !== cuina);
  renderAll();
}

function renderCuinesActives() {
  const wrap = document.getElementById("cuines-actives");
  if (!state.cuines.length) {
    wrap.classList.add("hidden");
    return;
  }
  wrap.classList.remove("hidden");
  wrap.innerHTML =
    '<span style="font-size:0.8rem;color:#6aab7a;">Cuina:</span> ' +
    state.cuines
      .map(
        (c) => `<span class="cuina-tag-active" data-cuina="${c}">${c} ✕</span>`,
      )
      .join("");
  wrap.querySelectorAll(".cuina-tag-active").forEach((tag) => {
    tag.addEventListener("click", () => removeCuina(tag.dataset.cuina));
  });
}

// ── EVENTS ─────────────────────────────────────────────────────────────
function bindEvents() {
  document.querySelectorAll(".island-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".island-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.illa = btn.dataset.island;
      renderAll();
    });
  });

  document.getElementById("filter-cuina").addEventListener("change", (e) => {
    if (e.target.value) {
      addCuina(e.target.value);
      e.target.value = "";
    }
  });

  document.getElementById("clear-cuina").addEventListener("click", () => {
    state.cuines = [];
    renderAll();
  });

  document.querySelectorAll(".preu-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".preu-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.preu = btn.dataset.preu;
      renderAll();
    });
  });

  document.getElementById("filter-dist").addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    state.distMax = val;
    document.getElementById("dist-label").textContent =
      val === 0 ? "— km" : `${val} km`;
    document.getElementById("clear-dist").classList.toggle("hidden", val === 0);
    renderAll();
  });

  document.getElementById("clear-dist").addEventListener("click", () => {
    state.distMax = 0;
    document.getElementById("filter-dist").value = 0;
    document.getElementById("dist-label").textContent = "— km";
    document.getElementById("clear-dist").classList.add("hidden");
    renderAll();
  });

  document.getElementById("btn-gps").addEventListener("click", () => {
    const status = document.getElementById("pos-status");
    if (!navigator.geolocation) {
      status.textContent = "⚠️ GPS no disponible";
      return;
    }
    status.textContent = "🔄 Obtenint posició...";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        state.userLat = pos.coords.latitude;
        state.userLon = pos.coords.longitude;
        state.userLabel = "posició actual";
        state.usingCap = false;
        status.textContent = "✅ Posició actual";
        document.getElementById("btn-gps").classList.add("active");
        state.distances = {};
        calcDistances(filtered().map((r) => r.id));
      },
      () => {
        status.textContent = "⚠️ No s'ha pogut obtenir la posició";
      },
    );
  });

  document.getElementById("btn-pos-text").addEventListener("click", searchPos);
  document.getElementById("pos-text").addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchPos();
  });

  async function searchPos() {
    const text = document.getElementById("pos-text").value.trim();
    if (!text) return;
    const status = document.getElementById("pos-status");
    status.textContent = "🔄 Cercant...";
    const result = await geocodeText(text);
    if (result) {
      state.userLat = result.lat;
      state.userLon = result.lon;
      state.userLabel = text;
      state.usingCap = false;
      status.textContent = `📍 ${result.label}`;
      document.getElementById("btn-gps").classList.remove("active");
      state.distances = {};
      calcDistances(filtered().map((r) => r.id));
    } else {
      status.textContent = "⚠️ No s'ha trobat la ubicació";
    }
  }

  document
    .getElementById("btn-reset-pos")
    .addEventListener("click", resetToCapitalDist);

  document.getElementById("sort-by").addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderAll();
  });

  document.querySelectorAll(".map-style-btn").forEach((btn) => {
    btn.addEventListener("click", () => setMapStyle(btn.dataset.style));
  });
}
