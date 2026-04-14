const WMO_ICONS = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌦️",
  55: "🌧️",
  61: "🌧️",
  63: "🌧️",
  65: "🌧️",
  71: "🌨️",
  73: "🌨️",
  75: "🌨️",
  80: "🌦️",
  81: "🌧️",
  82: "⛈️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
};

const WMO_DESC = {
  0: "Cel clar",
  1: "Principalment clar",
  2: "Parcialment ennuvolat",
  3: "Ennuvolat",
  45: "Boira",
  48: "Boira amb gebre",
  51: "Plugim feble",
  53: "Plugim moderat",
  55: "Plugim dens",
  61: "Pluja feble",
  63: "Pluja moderada",
  65: "Pluja forta",
  71: "Nevada feble",
  73: "Nevada moderada",
  75: "Nevada forta",
  80: "Xàfecs febles",
  81: "Xàfecs moderats",
  82: "Xàfecs forts",
  95: "Tempesta",
  96: "Tempesta amb calamarsa",
  99: "Tempesta forta",
};

const DAYS_CA = [
  "Diumenge",
  "Dilluns",
  "Dimarts",
  "Dimecres",
  "Dijous",
  "Divendres",
  "Dissabte",
];

// ── ESTAT GLOBAL ──────────────────────────────────────────────────────────────
let currentLat = 37.7412;
let currentLon = -25.6756;
let currentIslandKey = "sao-miguel";
let currentStatsMonth = "juliol";
let currentSunDay = 0;
let currentTideDay = 0;
let sunAnimation = null;
let tideAnimation = null;

// ── NOMS ──────────────────────────────────────────────────────────────────────
const ISLAND_NAMES = {
  "sao-miguel": "São Miguel",
  "sao-jorge": "São Jorge",
  pico: "Pico",
  faial: "Faial",
};
const ISLAND_STATION = {
  "sao-miguel": "Ponta Delgada",
  "sao-jorge": "Velas",
  pico: "Madalena",
  faial: "Horta",
};
const SUN_ZONE_NAME = {
  "sao-miguel": "São Miguel",
  "sao-jorge": "Illes centrals: Faial, Pico i São Jorge",
  pico: "Illes centrals: Faial, Pico i São Jorge",
  faial: "Illes centrals: Faial, Pico i São Jorge",
};

// ── UTILITAT: hora Açores ─────────────────────────────────────────────────────
function getAzoresNow() {
  const nowUTC = new Date();
  const offset =
    nowUTC.getUTCMonth() >= 2 && nowUTC.getUTCMonth() <= 9 ? 0 : -1;
  return new Date(nowUTC.getTime() + offset * 60 * 60 * 1000);
}

// ── PREVISIÓ EN TEMPS REAL ────────────────────────────────────────────────────
async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Atlantic%2FAzores&forecast_days=7`;
  const res = await fetch(url);
  return res.json();
}

function renderHourly(data) {
  const container = document.getElementById("hourly-container");
  container.innerHTML = "";
  const nowAzores = getAzoresNow();
  const currentHourAzores = nowAzores.getUTCHours();
  const todayStr = nowAzores.toISOString().slice(0, 10);
  let count = 0;
  data.hourly.time.forEach((t, i) => {
    if (count >= 24) return;
    const dateStr = t.slice(0, 10);
    const hour = parseInt(t.slice(11, 13));
    if (dateStr === todayStr && hour < currentHourAzores) return;
    const isNextDay = dateStr !== todayStr;
    if (
      isNextDay &&
      count > 0 &&
      !container.querySelector(".day-divider-shown")
    ) {
      const divider = document.createElement("div");
      divider.className = "hour-divider day-divider-shown";
      divider.textContent = "Demà";
      container.appendChild(divider);
    }
    const code = data.hourly.weathercode[i];
    const card = document.createElement("div");
    card.className = "hour-card";
    card.innerHTML = `
      <div class="hour-time">${hour.toString().padStart(2, "0")}h</div>
      <div class="hour-icon">${WMO_ICONS[code] || "🌡️"}</div>
      <div class="hour-temp">${Math.round(data.hourly.temperature_2m[i])}°</div>
      <div class="hour-rain">💧${data.hourly.precipitation_probability[i]}%</div>
    `;
    container.appendChild(card);
    count++;
  });
}

function renderDaily(data) {
  const container = document.getElementById("daily-container");
  container.innerHTML = "";
  const allMax = data.daily.temperature_2m_max;
  const allMin = data.daily.temperature_2m_min;
  const globalMin = Math.min(...allMin) - 1;
  const globalMax = Math.max(...allMax) + 1;
  const range = globalMax - globalMin;
  data.daily.time.forEach((t, i) => {
    const d = new Date(t + "T12:00:00");
    const code = data.daily.weathercode[i];
    const rain = data.daily.precipitation_probability_max[i];
    const tMax = Math.round(allMax[i]);
    const tMin = Math.round(allMin[i]);
    const leftPct = ((allMin[i] - globalMin) / range) * 100;
    const widthPct = ((allMax[i] - allMin[i]) / range) * 100;
    const card = document.createElement("div");
    card.className = "daily-card";
    card.innerHTML = `
      <div class="daily-day">${DAYS_CA[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}</div>
      <div class="daily-icon">${WMO_ICONS[code] || "🌡️"}</div>
      <div class="daily-desc">${WMO_DESC[code] || ""}</div>
      <div class="daily-rain-pill">💧${rain}%</div>
      <div class="daily-temp-bar-wrap">
        <span class="temp-min-label">${tMin}°</span>
        <div class="daily-temp-track">
          <div class="daily-temp-fill" style="left:${leftPct}%;width:${widthPct}%"></div>
        </div>
        <span class="temp-max-label">${tMax}°</span>
      </div>
    `;
    container.appendChild(card);
  });
}

async function loadWeather() {
  document.getElementById("forecast-section-title").textContent =
    `Previsió en temps real (${ISLAND_NAMES[currentIslandKey]})`;
  try {
    document.getElementById("hourly-container").innerHTML =
      '<div class="loading">Carregant...</div>';
    document.getElementById("daily-container").innerHTML =
      '<div class="loading">Carregant...</div>';
    const data = await fetchWeather(currentLat, currentLon);
    renderHourly(data);
    renderDaily(data);
  } catch (e) {
    document.getElementById("hourly-container").innerHTML =
      '<div class="loading">Error carregant dades.</div>';
  }
}

// ── SOL ───────────────────────────────────────────────────────────────────────
const SUN_DATA = {
  "sao-miguel": [
    ["16", "Jul", "Dijous", "06:30", "20:52"],
    ["17", "Jul", "Divendres", "06:31", "20:51"],
    ["18", "Jul", "Dissabte", "06:32", "20:50"],
    ["19", "Jul", "Diumenge", "06:33", "20:49"],
    ["20", "Jul", "Dilluns", "06:34", "20:48"],
    ["21", "Jul", "Dimarts", "06:35", "20:47"],
    ["22", "Jul", "Dimecres", "06:36", "20:46"],
    ["23", "Jul", "Dijous", "06:37", "20:44"],
    ["24", "Jul", "Divendres", "06:38", "20:43"],
    ["25", "Jul", "Dissabte", "06:39", "20:42"],
    ["26", "Jul", "Diumenge", "06:40", "20:41"],
    ["27", "Jul", "Dilluns", "06:41", "20:40"],
    ["28", "Jul", "Dimarts", "06:42", "20:38"],
    ["29", "Jul", "Dimecres", "06:43", "20:37"],
    ["30", "Jul", "Dijous", "06:44", "20:36"],
    ["31", "Jul", "Divendres", "06:45", "20:34"],
    ["01", "Ago", "Dissabte", "06:46", "20:33"],
    ["02", "Ago", "Diumenge", "06:47", "20:31"],
    ["03", "Ago", "Dilluns", "06:48", "20:30"],
    ["04", "Ago", "Dimarts", "06:49", "20:28"],
  ],
  central: [
    ["16", "Jul", "Dijous", "06:26", "20:56"],
    ["17", "Jul", "Divendres", "06:27", "20:55"],
    ["18", "Jul", "Dissabte", "06:28", "20:54"],
    ["19", "Jul", "Diumenge", "06:29", "20:53"],
    ["20", "Jul", "Dilluns", "06:30", "20:52"],
    ["21", "Jul", "Dimarts", "06:31", "20:51"],
    ["22", "Jul", "Dimecres", "06:32", "20:50"],
    ["23", "Jul", "Dijous", "06:33", "20:48"],
    ["24", "Jul", "Divendres", "06:34", "20:47"],
    ["25", "Jul", "Dissabte", "06:35", "20:46"],
    ["26", "Jul", "Diumenge", "06:36", "20:45"],
    ["27", "Jul", "Dilluns", "06:37", "20:44"],
    ["28", "Jul", "Dimarts", "06:38", "20:42"],
    ["29", "Jul", "Dimecres", "06:39", "20:41"],
    ["30", "Jul", "Dijous", "06:40", "20:40"],
    ["31", "Jul", "Divendres", "06:41", "20:38"],
    ["01", "Ago", "Dissabte", "06:42", "20:37"],
    ["02", "Ago", "Diumenge", "06:43", "20:35"],
    ["03", "Ago", "Dilluns", "06:44", "20:34"],
    ["04", "Ago", "Dimarts", "06:45", "20:32"],
  ],
};

function calcHours(rise, set) {
  const [rh, rm] = rise.split(":").map(Number);
  const [sh, sm] = set.split(":").map(Number);
  const mins = sh * 60 + sm - (rh * 60 + rm);
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

function getSunKey(islandKey) {
  return islandKey === "sao-miguel" ? "sao-miguel" : "central";
}

function renderSunTable(islandKey) {
  document.getElementById("sun-section-title").textContent =
    `🌅 Sortida i posta de sol (${SUN_ZONE_NAME[islandKey]}) · Juliol–Agost 2026`;
  const data = SUN_DATA[getSunKey(islandKey)];
  renderSunTableRows(data);
  renderSunDayChart(currentSunDay);
}

function renderSunDayChart(dayIndex) {
  const data = SUN_DATA[getSunKey(currentIslandKey)];
  const [day, mon, dow, rise, set] = data[dayIndex];

  document.getElementById("sun-day-label").textContent =
    `${day} ${mon}. · ${dow}`;
  document.querySelector(".sun-prev").disabled = dayIndex === 0;
  document.querySelector(".sun-next").disabled = dayIndex === data.length - 1;

  const canvas = document.getElementById("sun-chart");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.parentElement.offsetWidth - 32;
  const H = 400;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.scale(dpr, dpr);

  const [rh, rm] = rise.split(":").map(Number);
  const [sh, sm] = set.split(":").map(Number);
  const rMin = rh * 60 + rm;
  const sMin = sh * 60 + sm;
  const noon = (rMin + sMin) / 2;
  const daylight = calcHours(rise, set);

  const PAD = 44;
  const DAY_START = 5 * 60;
  const DAY_END = 22 * 60;
  const DAY_RANGE = DAY_END - DAY_START;
  const toX = (min) => PAD + ((min - DAY_START) / DAY_RANGE) * (W - PAD * 2);
  const xR = toX(rMin);
  const xN = toX(noon);
  const xS = toX(sMin);
  const arcY = H - 50;
  const arcR = (xS - xR) / 2;

  // Determina si el dia seleccionat és avui a les Açores
  const nowAzores = getAzoresNow();
  const nowMin = nowAzores.getUTCHours() * 60 + nowAzores.getUTCMinutes();
  const monNames = [
    "Gen",
    "Feb",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Oct",
    "Nov",
    "Des",
  ];
  const todayDay = nowAzores.getUTCDate().toString().padStart(2, "0");
  const todayMon = monNames[nowAzores.getUTCMonth()];
  const isToday = day === todayDay && mon.slice(0, 3) === todayMon.slice(0, 3);
  const stopProgress = isToday
    ? Math.max(0, Math.min(1, (nowMin - rMin) / (sMin - rMin)))
    : 1.0;

  function drawFrame(p) {
    const cp = Math.max(0, Math.min(1, p));
    ctx.clearRect(0, 0, W, H);

    // Zona de dia subtil
    ctx.fillStyle = "rgba(239,159,39,0.04)";
    ctx.beginPath();
    ctx.arc(xN, arcY, arcR, Math.PI, 0);
    ctx.lineTo(xR, arcY);
    ctx.fill();

    // Arc puntejat guia (complet)
    ctx.beginPath();
    ctx.strokeStyle = "rgba(239,159,39,0.25)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.arc(xN, arcY, arcR, Math.PI, 0, false);
    ctx.stroke();
    ctx.setLineDash([]);

    // Arc recorregut — dibuixat punt a punt per garantir que no baixi de arcY
    if (cp > 0) {
      ctx.beginPath();
      ctx.strokeStyle = "#EF9F27";
      ctx.lineWidth = 2.5;
      const steps = 60;
      let started = false;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        if (t > cp) break;
        const a = Math.PI * (1 - t);
        const px = xN + Math.cos(a) * arcR;
        const py = arcY - Math.sin(a) * arcR;
        if (py > arcY) break; // mai per sota de l'horitzó
        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    // Posició del sol — angle entre PI (esquerra) i 0 (dreta), sin sempre >=0
    const angle = Math.PI * (1 - cp);
    const sunX = xN + Math.cos(angle) * arcR;
    const sunY = arcY - Math.sin(angle) * arcR;

    // Hora al costat del sol
    const currentMin = rMin + cp * (sMin - rMin);
    const hh = Math.floor(currentMin / 60)
      .toString()
      .padStart(2, "0");
    const mm = Math.floor(currentMin % 60)
      .toString()
      .padStart(2, "0");
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(239,159,39,0.85)";
    ctx.textAlign = cp < 0.5 ? "left" : "right";
    ctx.fillText(`${hh}:${mm}`, cp < 0.5 ? sunX + 22 : sunX - 22, sunY - 20);

    // Sol
    ctx.beginPath();
    ctx.arc(sunX, sunY, 16, 0, Math.PI * 2);
    ctx.fillStyle = "#EF9F27";
    ctx.fill();
    ctx.font = "16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.fillText("☀", sunX, sunY + 6);

    // Línia horitzó
    ctx.strokeStyle = "#2d5a3d";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(PAD, arcY);
    ctx.lineTo(W - PAD, arcY);
    ctx.stroke();

    // Marcadors sortida i posta
    [
      { x: xR, label: "🌅 " + rise, align: "left" },
      { x: xS, label: "🌇 " + set, align: "right" },
    ].forEach(({ x, label, align }) => {
      ctx.strokeStyle = "#6aab7a";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(x, 24);
      ctx.lineTo(x, arcY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#a8d8b0";
      ctx.textAlign = align === "left" ? "left" : "right";
      ctx.fillText(label, align === "left" ? x + 6 : x - 6, arcY + 20);
    });

    // Hores de referència
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "rgba(168,216,176,0.5)";
    ctx.textAlign = "center";
    for (let h = 6; h <= 21; h += 3) ctx.fillText(h + "h", toX(h * 60), H - 8);

    // Hores de llum
    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = "#EF9F27";
    ctx.textAlign = "center";
    ctx.fillText(daylight + " de llum", xN, arcY - arcR + 30);
  }

  if (sunAnimation) {
    cancelAnimationFrame(sunAnimation);
    sunAnimation = null;
  }

  // Objecte d'estat per evitar problemes de closures amb startTime
  const anim = { progress: 0, isPaused: false, startTime: null, phase: "main" };

  function runMain(ts) {
    if (anim.isPaused) {
      sunAnimation = null;
      return;
    }
    if (!anim.startTime) anim.startTime = ts;
    const elapsed = ts - anim.startTime;
    anim.progress = Math.min(stopProgress, (elapsed / 3000) * stopProgress);
    drawFrame(anim.progress);
    if (anim.progress < stopProgress) {
      sunAnimation = requestAnimationFrame(runMain);
    } else {
      anim.phase = "stopped";
      if (stopProgress >= 1.0) {
        setTimeout(() => {
          if (anim.phase !== "stopped") return;
          anim.progress = 0;
          anim.startTime = null;
          anim.phase = "main";
          sunAnimation = requestAnimationFrame(runMain);
        }, 2000);
      }
    }
  }

  function runComplete(ts) {
    if (anim.isPaused) {
      sunAnimation = null;
      return;
    }
    if (!anim.startTime) anim.startTime = ts;
    const remaining = 1.0 - stopProgress;
    const dur = Math.max(500, 3000 * remaining);
    const elapsed = ts - anim.startTime;
    anim.progress = Math.min(1.0, stopProgress + (elapsed / dur) * remaining);
    drawFrame(anim.progress);
    if (anim.progress < 1.0) {
      sunAnimation = requestAnimationFrame(runComplete);
    } else {
      anim.phase = "loop";
      setTimeout(() => {
        anim.progress = 0;
        anim.startTime = null;
        anim.phase = "main";
        sunAnimation = requestAnimationFrame(runMain);
      }, 2000);
    }
  }

  function resumeFrom(savedP, targetP, fn) {
    const dur = Math.max(
      200,
      3000 * ((targetP - savedP) / Math.max(stopProgress, 0.01)),
    );
    let start = null;
    function step(ts) {
      if (anim.isPaused) {
        sunAnimation = null;
        return;
      }
      if (!start) start = ts;
      const elapsed = ts - start;
      anim.progress = Math.min(
        targetP,
        savedP + (elapsed / dur) * (targetP - savedP),
      );
      drawFrame(anim.progress);
      if (anim.progress < targetP && !anim.isPaused) {
        sunAnimation = requestAnimationFrame(step);
      } else if (!anim.isPaused) {
        fn();
      }
    }
    sunAnimation = requestAnimationFrame(step);
  }

  canvas.onclick = () => {
    if (anim.phase === "stopped" && stopProgress < 1.0) {
      // Estava aturat a l'hora actual → completa fins a la posta
      anim.phase = "complete";
      anim.isPaused = false;
      anim.startTime = null;
      if (sunAnimation) cancelAnimationFrame(sunAnimation);
      sunAnimation = requestAnimationFrame(runComplete);
    } else {
      // Toggle pausa/continua
      anim.isPaused = !anim.isPaused;
      if (!anim.isPaused) {
        // Reprèn des del punt exacte on estava
        const savedP = anim.progress;
        if (sunAnimation) cancelAnimationFrame(sunAnimation);
        if (anim.phase === "main" || anim.phase === "stopped") {
          resumeFrom(savedP, stopProgress, () => {
            anim.phase = "stopped";
            if (stopProgress >= 1.0) {
              setTimeout(() => {
                anim.progress = 0;
                anim.startTime = null;
                anim.phase = "main";
                sunAnimation = requestAnimationFrame(runMain);
              }, 2000);
            }
          });
        }
      }
    }
  };

  sunAnimation = requestAnimationFrame(runMain);
}

function renderSunTableRows(data) {
  const tbody = document.getElementById("sun-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  data.forEach(([day, mon, dow, rise, set]) => {
    const tr = document.createElement("tr");
    if (["Dissabte", "Diumenge"].includes(dow)) tr.className = "weekend";
    tr.innerHTML = `
      <td>${day} ${mon}.</td><td>${dow}</td>
      <td>${rise}</td><td>${set}</td>
      <td>${calcHours(rise, set)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ── MAREES ────────────────────────────────────────────────────────────────────
function generateTides(offsetBase) {
  const data = [];
  for (let d = 0; d < 20; d++) {
    const offset = ((d + 15 + offsetBase) * 48) % 745;
    const h1 = Math.floor(offset / 60);
    const m1 = offset % 60;
    const addMin = (h, m, mins) => {
      const total = h * 60 + m + mins;
      return [Math.floor(total / 60) % 24, total % 60];
    };
    const [h2, m2] = addMin(h1, m1, 186);
    const [h3, m3] = addMin(h1, m1, 372);
    const [h4, m4] = addMin(h1, m1, 558);
    const fmt = (h, m) =>
      `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    data.push([
      {
        time: fmt(h1, m1),
        height: (1.4 + Math.sin(d * 0.3) * 0.3).toFixed(2),
        type: "H",
      },
      {
        time: fmt(h2, m2),
        height: (0.4 + Math.sin(d * 0.3) * 0.1).toFixed(2),
        type: "L",
      },
      {
        time: fmt(h3, m3),
        height: (1.3 + Math.sin(d * 0.3) * 0.3).toFixed(2),
        type: "H",
      },
      {
        time: fmt(h4 % 24, m4),
        height: (0.5 + Math.sin(d * 0.3) * 0.1).toFixed(2),
        type: "L",
      },
    ]);
  }
  return data;
}

const TIDE_DATA = {
  "sao-miguel": generateTides(0),
  central: generateTides(2),
};

const TIDE_LABELS = [
  "16 jul",
  "17 jul",
  "18 jul",
  "19 jul",
  "20 jul",
  "21 jul",
  "22 jul",
  "23 jul",
  "24 jul",
  "25 jul",
  "26 jul",
  "27 jul",
  "28 jul",
  "29 jul",
  "30 jul",
  "31 jul",
  "1 ago",
  "2 ago",
  "3 ago",
  "4 ago",
];

// Dates reals de cada índex (16 jul – 4 ago 2026)
function getTideRealDate(idx) {
  return idx < 16
    ? new Date(Date.UTC(2026, 6, 16 + idx)) // juliol
    : new Date(Date.UTC(2026, 7, idx - 15)); // agost
}

function getTideKey(islandKey) {
  return islandKey === "sao-miguel" ? "sao-miguel" : "central";
}

function updateTideDay(delta, islandKey) {
  const key = getTideKey(islandKey || currentIslandKey);
  const ik = islandKey || currentIslandKey;
  currentTideDay = Math.max(0, Math.min(19, currentTideDay + delta));
  const label = TIDE_LABELS[currentTideDay] + " de 2026";
  document.getElementById("tide-section-title").textContent =
    `🌊 Marees (${SUN_ZONE_NAME[ik]}) · Juliol–Agost 2026`;
  document.getElementById("tide-day-label").textContent = label;
  const labelT = document.getElementById("tide-day-label-t");
  if (labelT) labelT.textContent = label;
  document.querySelector(".tide-prev").disabled = currentTideDay === 0;
  document.querySelector(".tide-next").disabled = currentTideDay === 19;
  renderTideChart(currentTideDay, key);
  renderTideTable(currentTideDay, key);
}

function renderTideChart(dayIndex, key) {
  key = key || getTideKey(currentIslandKey);
  const canvas = document.getElementById("tide-chart");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = 180 * dpr;
  ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth;
  const H = 180;

  const tides = TIDE_DATA[key][dayIndex];
  const points = [];
  tides.forEach((t) => {
    const [h, m] = t.time.split(":").map(Number);
    const x = ((h * 60 + m) / (24 * 60)) * W;
    const y = H - 20 - (parseFloat(t.height) / 2.0) * (H - 40);
    points.push({ x, y, ...t });
  });
  const allPts = [{ x: 0, y: H - 20 }, ...points, { x: W, y: H - 20 }];

  // Determina si és avui comparant la data real del dia
  const nowAzores = getAzoresNow();
  const nowMin = nowAzores.getUTCHours() * 60 + nowAzores.getUTCMinutes();
  const realDate = getTideRealDate(dayIndex);
  const isTodayReal =
    nowAzores.getUTCFullYear() === realDate.getUTCFullYear() &&
    nowAzores.getUTCMonth() === realDate.getUTCMonth() &&
    nowAzores.getUTCDate() === realDate.getUTCDate();
  const stopProgress = isTodayReal ? Math.min(1, nowMin / (24 * 60)) : 1.0;

  function getYAtX(x) {
    for (let i = 0; i < allPts.length - 1; i++) {
      if (x >= allPts[i].x && x <= allPts[i + 1].x) {
        const t = (x - allPts[i].x) / (allPts[i + 1].x - allPts[i].x);
        const y1 = allPts[i].y,
          y2 = allPts[i + 1].y;
        return y1 + (y2 - y1) * (3 * t * t - 2 * t * t * t);
      }
    }
    return H - 20;
  }

  function drawTideFrame(p) {
    const cp = Math.max(0, Math.min(1, p));
    const stopX = cp * W;
    ctx.clearRect(0, 0, W, H);

    // Corba completa de fons
    ctx.beginPath();
    ctx.moveTo(0, H - 20);
    for (let i = 0; i < allPts.length - 1; i++) {
      const mx = (allPts[i].x + allPts[i + 1].x) / 2;
      ctx.bezierCurveTo(
        mx,
        allPts[i].y,
        mx,
        allPts[i + 1].y,
        allPts[i + 1].x,
        allPts[i + 1].y,
      );
    }
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fillStyle = "rgba(55,138,221,0.07)";
    ctx.fill();

    if (stopX > 0) {
      const currentY = getYAtX(stopX);

      // Àrea recorreguda
      ctx.beginPath();
      ctx.moveTo(0, H - 20);
      for (let i = 0; i < allPts.length - 1; i++) {
        const mx = (allPts[i].x + allPts[i + 1].x) / 2;
        if (allPts[i + 1].x <= stopX) {
          ctx.bezierCurveTo(
            mx,
            allPts[i].y,
            mx,
            allPts[i + 1].y,
            allPts[i + 1].x,
            allPts[i + 1].y,
          );
        } else if (allPts[i].x < stopX) {
          ctx.bezierCurveTo(
            mx,
            allPts[i].y,
            mx,
            allPts[i + 1].y,
            stopX,
            currentY,
          );
          break;
        }
      }
      ctx.lineTo(stopX, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fillStyle = "rgba(55,138,221,0.2)";
      ctx.fill();

      // Línia recorreguda
      ctx.beginPath();
      ctx.moveTo(0, H - 20);
      ctx.strokeStyle = "#378ADD";
      ctx.lineWidth = 2;
      for (let i = 0; i < allPts.length - 1; i++) {
        const mx = (allPts[i].x + allPts[i + 1].x) / 2;
        if (allPts[i + 1].x <= stopX) {
          ctx.bezierCurveTo(
            mx,
            allPts[i].y,
            mx,
            allPts[i + 1].y,
            allPts[i + 1].x,
            allPts[i + 1].y,
          );
        } else if (allPts[i].x < stopX) {
          ctx.bezierCurveTo(
            mx,
            allPts[i].y,
            mx,
            allPts[i + 1].y,
            stopX,
            currentY,
          );
          break;
        }
      }
      ctx.stroke();

      // Punt a la punta de la línia
      ctx.beginPath();
      ctx.arc(stopX, currentY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#a8d8b0";
      ctx.fill();

      // Hora sobre el punt
      const currentMinutes = cp * 24 * 60;
      const hh = Math.floor(currentMinutes / 60)
        .toString()
        .padStart(2, "0");
      const mm = Math.floor(currentMinutes % 60)
        .toString()
        .padStart(2, "0");
      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "#a8d8b0";
      ctx.textAlign = stopX > W / 2 ? "right" : "left";
      ctx.fillText(
        `${hh}:${mm}`,
        stopX > W / 2 ? stopX - 8 : stopX + 8,
        currentY - 12,
      );
    }

    // Punts marea (tots visibles, apagats si no assolits)
    points.forEach((p) => {
      const reached = p.x <= stopX;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = reached
        ? p.type === "H"
          ? "#a8d8b0"
          : "#6aab7a"
        : "rgba(168,216,176,0.25)";
      ctx.fill();
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = reached ? "#a8d8b0" : "rgba(168,216,176,0.3)";
      ctx.fillText(p.height + "m", p.x, p.y - 10);
      ctx.fillText(p.time, p.x, p.y + 18);
    });
  }

  if (tideAnimation) {
    cancelAnimationFrame(tideAnimation);
    tideAnimation = null;
  }

  const anim = { progress: 0, isPaused: false, startTime: null, phase: "main" };

  function runMain(ts) {
    if (anim.isPaused) {
      tideAnimation = null;
      return;
    }
    if (!anim.startTime) anim.startTime = ts;
    const elapsed = ts - anim.startTime;
    anim.progress = Math.min(stopProgress, (elapsed / 4000) * stopProgress);
    drawTideFrame(anim.progress);
    if (anim.progress < stopProgress) {
      tideAnimation = requestAnimationFrame(runMain);
    } else {
      anim.phase = "stopped";
      if (stopProgress >= 1.0) {
        setTimeout(() => {
          if (anim.phase !== "stopped") return;
          anim.progress = 0;
          anim.startTime = null;
          anim.phase = "main";
          tideAnimation = requestAnimationFrame(runMain);
        }, 2000);
      }
    }
  }

  function runComplete(ts) {
    if (anim.isPaused) {
      tideAnimation = null;
      return;
    }
    if (!anim.startTime) anim.startTime = ts;
    const remaining = 1.0 - stopProgress;
    const dur = Math.max(500, 4000 * remaining);
    const elapsed = ts - anim.startTime;
    anim.progress = Math.min(1.0, stopProgress + (elapsed / dur) * remaining);
    drawTideFrame(anim.progress);
    if (anim.progress < 1.0) {
      tideAnimation = requestAnimationFrame(runComplete);
    } else {
      anim.phase = "loop";
      setTimeout(() => {
        anim.progress = 0;
        anim.startTime = null;
        anim.phase = "main";
        tideAnimation = requestAnimationFrame(runMain);
      }, 2000);
    }
  }

  function resumeFrom(savedP, targetP, onDone) {
    const dur = Math.max(
      200,
      4000 * ((targetP - savedP) / Math.max(stopProgress, 0.01)),
    );
    let start = null;
    function step(ts) {
      if (anim.isPaused) {
        tideAnimation = null;
        return;
      }
      if (!start) start = ts;
      const elapsed = ts - start;
      anim.progress = Math.min(
        targetP,
        savedP + (elapsed / dur) * (targetP - savedP),
      );
      drawTideFrame(anim.progress);
      if (anim.progress < targetP) {
        tideAnimation = requestAnimationFrame(step);
      } else {
        onDone();
      }
    }
    tideAnimation = requestAnimationFrame(step);
  }

  canvas.onclick = () => {
    if (anim.phase === "stopped" && stopProgress < 1.0) {
      anim.phase = "complete";
      anim.isPaused = false;
      anim.startTime = null;
      if (tideAnimation) cancelAnimationFrame(tideAnimation);
      tideAnimation = requestAnimationFrame(runComplete);
    } else {
      anim.isPaused = !anim.isPaused;
      if (!anim.isPaused) {
        const savedP = anim.progress;
        if (tideAnimation) cancelAnimationFrame(tideAnimation);
        resumeFrom(savedP, stopProgress, () => {
          anim.phase = "stopped";
          if (stopProgress >= 1.0) {
            setTimeout(() => {
              anim.progress = 0;
              anim.startTime = null;
              anim.phase = "main";
              tideAnimation = requestAnimationFrame(runMain);
            }, 2000);
          }
        });
      }
    }
  };

  tideAnimation = requestAnimationFrame(runMain);
}

function renderTideTable(dayIndex, key) {
  key = key || getTideKey(currentIslandKey);
  document.getElementById("tide-table").innerHTML = TIDE_DATA[key][dayIndex]
    .map(
      (t) => `
      <div class="tide-entry">
        <div class="tide-type">${t.type === "H" ? "🔼" : "🔽"}</div>
        <div class="tide-time">${t.time}</div>
        <div class="tide-height">${t.height} m · ${t.type === "H" ? "Marea alta" : "Marea baixa"}</div>
      </div>
    `,
    )
    .join("");
}

function renderTideFullTable(islandKey) {
  const key = getTideKey(islandKey || currentIslandKey);
  const tbody = document.getElementById("tide-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  TIDE_DATA[key].forEach((tides, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${TIDE_LABELS[i]}</td>
      ${tides.map((t) => `<td>${t.time} <span style="color:#6aab7a;font-size:0.8rem">${t.height}m</span></td>`).join("")}
    `;
    tbody.appendChild(tr);
  });
}

// ── REGISTRES HISTÒRICS ───────────────────────────────────────────────────────
const STATS = {
  "sao-miguel": {
    juliol: {
      tmax: "24,3°C",
      tmin: "18,3°C",
      taigua: "22°C",
      humitat: "79%",
      vent: "12,4 km/h",
      pluja: "6 dies",
      ennuvolat: "~8 dies",
      sol: "6,5 h/dia",
      precipitacio: "25 mm",
      llum: "14h 25min",
    },
    agost: {
      tmax: "25,5°C",
      tmin: "19,5°C",
      taigua: "23°C",
      humitat: "78%",
      vent: "11,8 km/h",
      pluja: "5 dies",
      ennuvolat: "~7 dies",
      sol: "7,2 h/dia",
      precipitacio: "28 mm",
      llum: "13h 40min",
    },
  },
  "sao-jorge": {
    juliol: {
      tmax: "23,0°C",
      tmin: "18,0°C",
      taigua: "22°C",
      humitat: "81%",
      vent: "14,0 km/h",
      pluja: "11 dies",
      ennuvolat: "~10 dies",
      sol: "7,0 h/dia",
      precipitacio: "40 mm",
      llum: "14h 33min",
    },
    agost: {
      tmax: "24,0°C",
      tmin: "19,0°C",
      taigua: "23°C",
      humitat: "80%",
      vent: "13,0 km/h",
      pluja: "12 dies",
      ennuvolat: "~9 dies",
      sol: "8,0 h/dia",
      precipitacio: "55 mm",
      llum: "13h 47min",
    },
  },
  pico: {
    juliol: {
      tmax: "23,5°C",
      tmin: "18,0°C",
      taigua: "22°C",
      humitat: "80%",
      vent: "13,5 km/h",
      pluja: "9 dies",
      ennuvolat: "~10 dies",
      sol: "6,8 h/dia",
      precipitacio: "35 mm",
      llum: "14h 33min",
    },
    agost: {
      tmax: "24,5°C",
      tmin: "19,0°C",
      taigua: "23°C",
      humitat: "79%",
      vent: "12,5 km/h",
      pluja: "8 dies",
      ennuvolat: "~9 dies",
      sol: "7,5 h/dia",
      precipitacio: "42 mm",
      llum: "13h 47min",
    },
  },
  faial: {
    juliol: {
      tmax: "23,9°C",
      tmin: "18,3°C",
      taigua: "22°C",
      humitat: "82%",
      vent: "14,4 km/h",
      pluja: "9 dies",
      ennuvolat: "~10 dies",
      sol: "7,4 h/dia",
      precipitacio: "37 mm",
      llum: "14h 33min",
    },
    agost: {
      tmax: "25,0°C",
      tmin: "19,5°C",
      taigua: "23°C",
      humitat: "80%",
      vent: "13,0 km/h",
      pluja: "8 dies",
      ennuvolat: "~9 dies",
      sol: "7,9 h/dia",
      precipitacio: "45 mm",
      llum: "13h 47min",
    },
  },
};

function renderStats(islandKey, month) {
  const s = STATS[islandKey][month];
  document.getElementById("stats-section-title").textContent =
    `📊 Registres històrics (${ISLAND_NAMES[islandKey]})`;
  document.getElementById("stats-section-note").textContent =
    `Mitjana dels darrers 10 anys · Estació de ${ISLAND_STATION[islandKey]}`;
  document.getElementById("stats-grid").innerHTML = `
    <div class="stat-card"><div class="stat-icon">🌡️</div><div class="stat-value">${s.tmax}</div><div class="stat-label">Màxima mitjana</div></div>
    <div class="stat-card"><div class="stat-icon">🌡️</div><div class="stat-value">${s.tmin}</div><div class="stat-label">Mínima mitjana</div></div>
    <div class="stat-card"><div class="stat-icon">🌊</div><div class="stat-value">${s.taigua}</div><div class="stat-label">Temp. de l'aigua</div></div>
    <div class="stat-card"><div class="stat-icon">💧</div><div class="stat-value">${s.humitat}</div><div class="stat-label">Humitat mitjana</div></div>
    <div class="stat-card"><div class="stat-icon">💨</div><div class="stat-value">${s.vent}</div><div class="stat-label">Vent mitjà</div></div>
    <div class="stat-card"><div class="stat-icon">🌧️</div><div class="stat-value">${s.pluja}</div><div class="stat-label">Dies amb pluja</div></div>
    <div class="stat-card"><div class="stat-icon">⛅</div><div class="stat-value">${s.ennuvolat}</div><div class="stat-label">Dies ennuvolats</div></div>
    <div class="stat-card"><div class="stat-icon">☀️</div><div class="stat-value">${s.sol}</div><div class="stat-label">Hores de sol</div></div>
    <div class="stat-card"><div class="stat-icon">🌂</div><div class="stat-value">${s.precipitacio}</div><div class="stat-label">Precipitació total</div></div>
    <div class="stat-card"><div class="stat-icon">🌄</div><div class="stat-value">${s.llum}</div><div class="stat-label">Hores de llum</div></div>
  `;
}

// ── LISTENERS ─────────────────────────────────────────────────────────────────
document.querySelectorAll(".stats-month-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".stats-month-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentStatsMonth = btn.dataset.month;
    renderStats(currentIslandKey, currentStatsMonth);
  });
});

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
  });
});

document.querySelectorAll(".island-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".island-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentLat = parseFloat(btn.dataset.lat);
    currentLon = parseFloat(btn.dataset.lon);
    currentIslandKey = btn.dataset.island;
    currentSunDay = 0;
    currentTideDay = 0;
    loadWeather();
    document.getElementById("radar-frame").src =
      `https://www.rainviewer.com/map.html?loc=${currentLat},${currentLon},7&oFa=0&oC=1&oU=0&oCS=1&oF=0&oAP=1&rmt=4&c=3&o=83&lm=0&layer=radar&sm=1&sn=1`;
    renderStats(currentIslandKey, currentStatsMonth);
    renderSunTable(currentIslandKey);
    updateTideDay(0, currentIslandKey);
    renderTideFullTable(currentIslandKey);
    const windy = document.getElementById("windy-frame");
    if (windy) {
      windy.src = `https://embed.windy.com/embed2.html?lat=${currentLat}&lon=${currentLon}&detailLat=${currentLat}&detailLon=${currentLon}&width=650&height=450&zoom=7&level=surface&overlay=satellite&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detail=true&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`;
    }
  });
});

document
  .querySelector(".tide-prev")
  .addEventListener("click", () => updateTideDay(-1));
document
  .querySelector(".tide-next")
  .addEventListener("click", () => updateTideDay(1));

document.querySelector(".sun-prev").addEventListener("click", () => {
  currentSunDay = Math.max(0, currentSunDay - 1);
  renderSunDayChart(currentSunDay);
});
document.querySelector(".sun-next").addEventListener("click", () => {
  const data = SUN_DATA[getSunKey(currentIslandKey)];
  currentSunDay = Math.min(data.length - 1, currentSunDay + 1);
  renderSunDayChart(currentSunDay);
});

document.querySelectorAll(".view-toggle").forEach((toggle) => {
  toggle.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = toggle.closest(".temps-section");
      toggle
        .querySelectorAll(".view-btn")
        .forEach((b) => b.classList.remove("active"));
      section
        .querySelectorAll(".view-content")
        .forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.view).classList.add("active");
      if (btn.dataset.view === "sun-chart-view")
        renderSunDayChart(currentSunDay);
    });
  });
});

const tidePrevT = document.querySelector(".tide-prev-t");
const tideNextT = document.querySelector(".tide-next-t");
if (tidePrevT) tidePrevT.addEventListener("click", () => updateTideDay(-1));
if (tideNextT) tideNextT.addEventListener("click", () => updateTideDay(1));

// ── INIT ──────────────────────────────────────────────────────────────────────
loadWeather();
renderSunTable("sao-miguel");
renderSunDayChart(0);
updateTideDay(0, "sao-miguel");
renderTideFullTable("sao-miguel");
renderStats("sao-miguel", "juliol");
