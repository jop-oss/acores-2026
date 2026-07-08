// Selector d'illes
document.querySelectorAll(".island-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".island-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    // Oculta TOTS els grids i el mapa
    document
      .querySelectorAll(".webcams-grid")
      .forEach((g) => g.classList.add("hidden"));
    document.getElementById("grid-mapa").classList.add("hidden");
    // Mostra el correcte
    const id =
      btn.dataset.island === "mapa"
        ? "grid-mapa"
        : "grid-" + btn.dataset.island;
    document.getElementById(id).classList.remove("hidden");
  });
});

// Refresc automàtic cada 3 minuts (30s era excessiu i sobrecarregava el servidor de SpotAzores)
function refreshCams() {
  document.querySelectorAll(".webcam-img").forEach((img) => {
    const card = img.closest(".webcam-card");
    card.classList.add("refreshing");
    const newImg = new Image();
    newImg.referrerPolicy = "no-referrer";
    const base = img.src.split("?")[0];
    newImg.onload = () => {
      img.src = newImg.src;
      card.classList.remove("refreshing");
    };
    newImg.onerror = () => card.classList.remove("refreshing");
    newImg.src = base + "?t=" + Date.now();
  });
}

setInterval(refreshCams, 180000);

// Clic a la card obre SpotAzores en una nova pestanya
document.querySelectorAll(".webcam-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.closest(".webcam-fullscreen")) return;
    const link = card.querySelector(".webcam-fullscreen");
    if (link) window.open(link.href, "_blank");
  });
});

// Mapa de webcams via Windy API
const WINDY_KEY = "RFX87wOopVv0oQ8HlifoUNlSYukIAkhy";
let webcamMapLoaded = false;

async function loadWebcamMap() {
  if (webcamMapLoaded) return;
  webcamMapLoaded = true;

  // Obtenim webcams de les Açores via API
  const url = `https://api.windy.com/webcams/api/v3/webcams?lang=en&limit=50&offset=0&bbox=36.5,-31.5,40.5,-24.5&include=location,player,images&apiKey=${WINDY_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const cams = data.webcams || [];

    const container = document.getElementById("webcam-map-container");
    document.getElementById("webcam-map-loading").remove();

    // Creem el mapa amb Leaflet
    container.innerHTML =
      '<div id="leaflet-map" style="width:100%;height:100%;"></div>';

    // Carreguem Leaflet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    document.head.appendChild(script);

    script.onload = () => {
      const map = L.map("leaflet-map", {
        center: [38.5, -27.8],
        zoom: 8,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      // Icona càmera
      const camIcon = L.divIcon({
        html: `<div style="background:#2d5a3d;border:2px solid #a8d8b0;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer;">📷</div>`,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16],
      });

      cams.forEach((cam) => {
        if (!cam.location) return;
        const { latitude, longitude } = cam.location;
        const marker = L.marker([latitude, longitude], { icon: camIcon }).addTo(
          map,
        );

        // Popup amb imatge en hover/clic
        const imgUrl = cam.images?.current?.preview || "";
        const playerUrl = cam.player?.day?.url || cam.player?.month?.url || "";
        const title = cam.title || "Webcam";

        marker.bindPopup(`
          <div style="min-width:200px;text-align:center;">
            <strong style="display:block;margin-bottom:6px;font-size:0.85rem;">${title}</strong>
            ${imgUrl ? `<img src="${imgUrl}" referrerpolicy="no-referrer" style="width:100%;border-radius:6px;margin-bottom:8px;">` : ""}
            ${
              playerUrl
                ? `<a href="${playerUrl}" target="_blank"
              style="display:inline-block;padding:4px 12px;background:#2d5a3d;color:#a8d8b0;border-radius:10px;text-decoration:none;font-size:0.75rem;">
              ▶ Veure darreres 24h
            </a>`
                : ""
            }
          </div>
        `);

        marker.on("mouseover", () => marker.openPopup());
      });
    };
  } catch (e) {
    const container = document.getElementById("webcam-map-container");
    container.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;padding:20px;">
        <div style="font-size:3rem;">🗺️</div>
        <p style="color:#a8d8b0;font-size:1.1rem;font-weight:600;text-align:center;">Mapa interactiu de webcams</p>
        <p style="color:#6aab7a;font-size:0.85rem;text-align:center;max-width:360px;">
          Passa el ratolí per una càmera per veure la imatge · Clic per veure les darreres 24h
        </p>
        <a href="https://www.windy.com/ca/-Mapa-exterior-topoMap?38.5,-27.8,8,p:cams" target="_blank"
           style="padding:12px 28px;background:#2d5a3d;color:#a8d8b0;border-radius:20px;text-decoration:none;font-size:1rem;">
          Obrir mapa a Windy ↗
        </a>
      </div>
    `;
  }
}

// Activa la càrrega quan es selecciona "Mapa"
document.querySelectorAll(".island-btn").forEach((btn) => {
  if (btn.dataset.island === "mapa") {
    btn.addEventListener("click", loadWebcamMap);
  }
});

// Mini mapes estàtics
const pinPositions = {
  SMGSCD01: { x: 12.8, y: 31.1 },
  SMGSCD02: { x: 12.7, y: 16.2 },
  SMGBAR01: { x: 53.1, y: 60.5 },
  SMGMOS01: { x: 7.4, y: 5.1 },
  SMGPDL01: { x: 27.5, y: 81.7 },
  SMGRBG01: { x: 44.2, y: 36.3 },
  SMGCAL01: { x: 48.3, y: 93.4 },
  SMGPPL01: { x: 31.8, y: 77.2 },
  SMGCAP01: { x: 27.5, y: 33.3 },
  SMGNOR01: { x: 97.1, y: 32.2 },
  SMGRBQ01: { x: 77.1, y: 84.2 },
  SMGPOV01: { x: 84.4, y: 79.5 },
  SMGFAY01: { x: 91.0, y: 78.3 },
  SMGPFR01: { x: 58.8, y: 38.2 },
  SMGVFC01: { x: 59.8, y: 94.0 },
  SJZVEL01: { x: 19.0, y: 38.5 },
  SJZFOV01: { x: 37.3, y: 41.8 },
  SJZCAL01: { x: 64.3, y: 64.3 },
  PIXSRQ02: { x: 29.4, y: 46.0 },
  PIXMAD01: { x: 5.6, y: 21.6 },
  PIXLAJ01: { x: 56.8, y: 88.9 },
  PIXSRQ01: { x: 46.9, y: 23.9 },
  FAYHOR01: { x: 80.0, y: 83.0 },
  FAYCBG01: { x: 47.9, y: 49.3 },
};

function addMinimaps() {
  const sizes = {
    "São Miguel": { w: 130, h: 57 },
    "São Jorge": { w: 140, h: 53 },
    Pico: { w: 130, h: 57 },
    Faial: { w: 110, h: 75 },
  };

  document.querySelectorAll(".webcam-card").forEach((card) => {
    const cam = card.dataset.cam;
    const island = card.querySelector(".webcam-island").textContent.trim();
    const { w, h } = sizes[island] || sizes["São Miguel"];
    const wrap = card.querySelector(".webcam-img-wrap");
    const pin = pinPositions[cam];

    const minimap = document.createElement("div");
    minimap.className = "webcam-minimap";
    minimap.style.width = w + "px";
    minimap.style.height = h + "px";
    minimap.style.position = "absolute";

    let pinHtml = "";
    if (pin) {
      pinHtml = `<div class="minimap-pin" style="left:${pin.x}%;top:${pin.y}%;"></div>`;
    }

    minimap.innerHTML = `
      <img src="img/minimaps/${cam}.png" alt="Ubicació" loading="lazy">
      ${pinHtml}
    `;
    wrap.appendChild(minimap);
  });
}

addMinimaps();

document.querySelectorAll(".mapa-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".mapa-tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".mapa-content")
      .forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("mapa-" + tab.dataset.mapa).classList.add("active");
    if (tab.dataset.mapa === "windy") loadWebcamMap();
    if (tab.dataset.mapa === "spotazores")
      setTimeout(initLeafletWebcamMap, 100);
  });
});

// Mapa Leaflet amb webcams en directe
function initLeafletWebcamMap() {
  if (document.getElementById("leaflet-css")) {
    buildLeafletMap();
    return;
  }
  const link = document.createElement("link");
  link.id = "leaflet-css";
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
  document.head.appendChild(script);
  script.onload = buildLeafletMap;
}

function buildLeafletMap() {
  const mapDiv = document.getElementById("leaflet-webcam-map");
  if (!mapDiv || mapDiv._leaflet_id) return;

  const map = L.map("leaflet-webcam-map", { center: [38.5, -27.8], zoom: 8 });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  const cams = [
    {
      cam: "SMGSCD01",
      name: "Sete Cidades – Cumeeiras",
      lat: 37.787,
      lon: -25.786,
      url: "https://spotazores.com/en/webcam/sao-miguel/sete-cidades-cumeeiras/",
    },
    {
      cam: "SMGSCD02",
      name: "Sete Cidades – Lagoa",
      lat: 37.789,
      lon: -25.788,
      url: "https://spotazores.com/en/webcam/sao-miguel/sete-cidades-lagoa/",
    },
    {
      cam: "SMGBAR01",
      name: "Ribeira Grande – Lagoa do Fogo",
      lat: 37.756,
      lon: -25.468,
      url: "https://spotazores.com/en/webcam/sao-miguel/lagoa-do-fogo/",
    },
    {
      cam: "SMGMOS01",
      name: "Mosteiros – Praia",
      lat: 37.765,
      lon: -25.824,
      url: "https://spotazores.com/en/webcam/sao-miguel/mosteiros-praia/",
    },
    {
      cam: "SMGPDL01",
      name: "Ponta Delgada – Marina",
      lat: 37.737,
      lon: -25.666,
      url: "https://spotazores.com/en/webcam/sao-miguel/ponta-delgada-marina/",
    },
    {
      cam: "SMGRBG01",
      name: "Ribeira Grande – Sta. Bárbara",
      lat: 37.83,
      lon: -25.514,
      url: "https://spotazores.com/en/webcam/sao-miguel/praia-de-santa-barbara/",
    },
    {
      cam: "SMGCAL01",
      name: "Caloura – Lagoa",
      lat: 37.696,
      lon: -25.522,
      url: "https://spotazores.com/en/webcam/sao-miguel/caloura/",
    },
    {
      cam: "SMGPPL01",
      name: "Ponta Delgada – Milícias",
      lat: 37.744,
      lon: -25.637,
      url: "https://spotazores.com/en/webcam/sao-miguel/praia-das-milicias/",
    },
    {
      cam: "SMGCAP01",
      name: "Ponta Delgada – Capelas",
      lat: 37.768,
      lon: -25.732,
      url: "https://spotazores.com/en/webcam/sao-miguel/pocos-de-capelas-e-sao-vicente/",
    },
    {
      cam: "SMGNOR01",
      name: "Nordeste",
      lat: 37.789,
      lon: -25.157,
      url: "https://spotazores.com/en/webcam/sao-miguel/nordeste/nordeste/",
    },
    {
      cam: "SMGRBQ01",
      name: "Povoação – Ribeira Quente",
      lat: 37.69,
      lon: -25.3,
      url: "https://spotazores.com/en/webcam/sao-miguel/praia-da-ribeira-quente/",
    },
    {
      cam: "SMGPOV01",
      name: "Povoação",
      lat: 37.756,
      lon: -25.237,
      url: "https://spotazores.com/en/webcam/sao-miguel/povoacao/povoacao/",
    },
    {
      cam: "SMGFAY01",
      name: "Povoação – Faial da Terra",
      lat: 37.72,
      lon: -25.225,
      url: "https://spotazores.com/en/webcam/sao-miguel/faial-da-terra/",
    },
    {
      cam: "SMGPFR01",
      name: "Ribeira Grande – Moinhos",
      lat: 37.826,
      lon: -25.537,
      url: "https://spotazores.com/en/webcam/sao-miguel/praia-dos-moinhos/",
    },
    {
      cam: "SMGVFC01",
      name: "Vila Franca – Vinha d'Areia",
      lat: 37.716,
      lon: -25.434,
      url: "https://spotazores.com/en/webcam/sao-miguel/praia-vinha-dareia/",
    },
    {
      cam: "SJZVEL01",
      name: "Velas – Port",
      lat: 38.68,
      lon: -28.201,
      url: "https://spotazores.com/en/webcam/sao-jorge/velas/velas/",
    },
    {
      cam: "SJZFJC01",
      name: "Fajã do Ouvidor",
      lat: 38.652,
      lon: -28.094,
      url: "https://spotazores.com/en/webcam/sao-jorge/velas/faja-do-ouvidor/",
    },
    {
      cam: "SJZCAL01",
      name: "Calheta",
      lat: 38.588,
      lon: -28.016,
      url: "https://spotazores.com/en/webcam/sao-jorge/calheta/calheta/",
    },
    {
      cam: "PIXSRQ02",
      name: "Montanha do Pico",
      lat: 38.471,
      lon: -28.4,
      url: "https://spotazores.com/en/webcam/pico/sao-roque-do-pico/montanha/",
    },
    {
      cam: "PIXMAD01",
      name: "Porto da Madalena",
      lat: 38.532,
      lon: -28.527,
      url: "https://spotazores.com/en/webcam/pico/madalena/porto-da-madalena/",
    },
    {
      cam: "PIXLAJ01",
      name: "Lajes do Pico",
      lat: 38.397,
      lon: -28.251,
      url: "https://spotazores.com/en/webcam/pico/lajes-do-pico/lajes/",
    },
    {
      cam: "PIXSRQ01",
      name: "São Roque do Pico",
      lat: 38.517,
      lon: -28.319,
      url: "https://spotazores.com/en/webcam/pico/sao-roque-do-pico/porto-de-sao-roque/",
    },
    {
      cam: "FAYHOR01",
      name: "Horta – Port i Marina",
      lat: 38.532,
      lon: -28.633,
      url: "https://spotazores.com/en/webcam/faial/horta/horta/",
    },
    {
      cam: "FAYCBG01",
      name: "Cabeço Gordo – Caldeira",
      lat: 38.578,
      lon: -28.7,
      url: "https://spotazores.com/en/webcam/faial/horta/cabeco-gordo/",
    },
  ];

  const camIcon = L.divIcon({
    html: `<div style="background:#2d5a3d;border:2px solid #a8d8b0;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:13px;">📷</div>`,
    className: "",
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -16],
  });

  cams.forEach((c) => {
    const imgUrl = () =>
      `https://www.spotazores.com/camaras/${c.cam}/VGAcurrent.jpg?t=${Date.now()}`;
    const marker = L.marker([c.lat, c.lon], { icon: camIcon }).addTo(map);

    marker.on("click", () => {
      const popup = L.popup({ maxWidth: 260 })
        .setLatLng([c.lat, c.lon])
        .setContent(
          `
          <div style="text-align:center;min-width:220px;">
            <strong style="display:block;margin-bottom:8px;font-size:0.9rem;">${c.name}</strong>
            <img id="popup-img-${c.cam}" src="${imgUrl()}" referrerpolicy="no-referrer"
                 style="width:100%;border-radius:6px;margin-bottom:8px;">
            <div style="font-size:0.75rem;color:#888;margin-bottom:6px;">S'actualitza cada 5 min</div>
            <a href="${c.url}" target="_blank"
                style="display:inline-block;padding:4px 12px;background:#2d5a3d;color:#a8d8b0;border-radius:10px;text-decoration:none;font-size:0.8rem;">
                Veure a SpotAzores ↗
            </a>
          </div>
        `,
        )
        .openOn(map);

      const interval = setInterval(
        () => {
          const img = document.getElementById(`popup-img-${c.cam}`);
          if (img) img.src = imgUrl();
          else clearInterval(interval);
        },
        5 * 60 * 1000,
      );

      map.on("popupclose", () => clearInterval(interval));
    });
  });
}

// Inicialitza el mapa quan es clica la pestanya SpotAzores
document.querySelectorAll(".mapa-tab").forEach((tab) => {
  if (tab.dataset.mapa === "spotazores") {
    tab.addEventListener("click", () => setTimeout(initLeafletWebcamMap, 100));
  }
});
