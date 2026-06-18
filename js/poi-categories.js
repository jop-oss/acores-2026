// Generat automàticament | Data: 2026-06-18

const POI_CATEGORIES = {
  "allotjaments": {
    "emoji": "🏠",
    "label": "Allotjaments",
    "color": "#8B5CF6",
    "desc": "Allotjaments del grup",
    "apareix_a": [
      "Mapes",
      "Itinerari",
      "Allotjament"
    ],
    "font": "allotjaments-data.js",
    "subs": {}
  },
  "aventura": {
    "emoji": "🏄‍♀️",
    "label": "Aventura",
    "color": "#FF5050",
    "desc": "Punts per fer barranquisme",
    "apareix_a": [
      "Mapes",
      "Itinerari",
      "Material Extra"
    ],
    "font": "aventura-data.js",
    "subs": {
      "barranquisme": {
        "emoji": "🦘",
        "label": "Aventura/Barranquisme"
      },
      "snorkel": {
        "emoji": "🤿",
        "label": "Aventura/Snorkel"
      },
      "bici": {
        "emoji": "🚴‍♀️",
        "label": "Aventura/Bici"
      },
      "kayak": {
        "emoji": "🚣‍♀️",
        "label": "Aventura/Kayak o Paddle Surf"
      },
      "busseig": {
        "emoji": "🥽",
        "label": "Aventura/Busseig"
      },
      "coasteering": {
        "emoji": "🪨",
        "label": "Aventura/Coasteering"
      },
      "dofins": {
        "emoji": "🐬",
        "label": "Aventura/Nedar amb dofins"
      },
      "escalada": {
        "emoji": "🧗‍♀️",
        "label": "Aventura/Escalada"
      },
      "surf": {
        "emoji": "🏄‍♀️",
        "label": "Aventura/Surf"
      },
      "moto": {
        "emoji": "🚤",
        "label": "Aventura/Moto aquàtica"
      }
    }
  },
  "excursions": {
    "emoji": "⛵",
    "label": "Excursions",
    "color": "#33CCCC",
    "desc": "Punts d'observacio astronomica",
    "apareix_a": [
      "Mapes",
      "Itinerari",
      "Material Extra"
    ],
    "font": "excursions-data.js",
    "subs": {
      "vaixell": {
        "emoji": "⛵",
        "label": "Excursions/Passeig amb vaixell"
      },
      "cetacis": {
        "emoji": "🐋",
        "label": "Excursions/Avistament de cetacis"
      },
      "estrelles": {
        "emoji": "✨",
        "label": "Excursions/Observació d'estrelles"
      }
    }
  },
  "imprescindibles": {
    "emoji": "⭐",
    "label": "Imprescindibles",
    "color": "#FBBF24",
    "desc": "Llocs iconics de les illes Acores",
    "apareix_a": [
      "Mapes",
      "Itinerari",
      "Imprescindibles"
    ],
    "font": "imprescindibles-data.js",
    "subs": {}
  },
  "senderisme": {
    "emoji": "🥾",
    "label": "Senderisme",
    "color": "#996633",
    "desc": "Inicis de rutes de senderisme",
    "apareix_a": [
      "Mapes",
      "Itinerari",
      "Material Extra"
    ],
    "font": "senderisme-data.js",
    "subs": {}
  },
  "miradors": {
    "emoji": "🔭",
    "label": "Miradors",
    "color": "#0070C0",
    "desc": "Punts de vista panoramics",
    "apareix_a": [
      "Mapes",
      "Itinerari",
      "Material Extra"
    ],
    "font": "llocs-data.js",
    "subs": {}
  },
  "naturalesa": {
    "emoji": "🌿",
    "label": "Naturalesa",
    "color": "#33CC33",
    "desc": "Paisatges naturals",
    "apareix_a": [
      "Mapes",
      "Itinerari",
      "Material Extra"
    ],
    "font": "llocs-data.js",
    "subs": {
      "paisatges": {
        "emoji": "⛰️",
        "label": "Naturalesa/Paisatge"
      },
      "geologia": {
        "emoji": "🌋",
        "label": "Naturalesa/Geologia"
      },
      "salts": {
        "emoji": "💦",
        "label": "Naturalesa/Salts d'aigua"
      },
      "coves": {
        "emoji": "🕳️",
        "label": "Naturalesa/Coves"
      },
      "jardins": {
        "emoji": "🌺",
        "label": "Naturalesa/Jardins Botànics"
      },
      "llacs": {
        "emoji": "🏞️",
        "label": "Naturalesa/Llacs"
      }
    }
  },
  "pobles": {
    "emoji": "🏘️",
    "label": "Pobles i ciutats",
    "color": "#DD75BA",
    "desc": "Nuclis urbans i viles",
    "apareix_a": [
      "Mapes",
      "Itinerari",
      "Material Extra"
    ],
    "font": "llocs-data.js",
    "subs": {}
  },
  "bany": {
    "emoji": "🏊",
    "label": "Zones de bany",
    "color": "#38BDF8",
    "desc": "Piscines de roca",
    "apareix_a": [
      "Mapes",
      "Itinerari",
      "Material Extra"
    ],
    "font": "llocs-data.js",
    "subs": {
      "piscines": {
        "emoji": "🏊",
        "label": "Zones de bany/Piscines naturals"
      },
      "platges": {
        "emoji": "🏖️",
        "label": "Zones de bany/Platges"
      },
      "termals": {
        "emoji": "♨️",
        "label": "Zones de bany/Aigües Termals"
      }
    }
  },
  "varis": {
    "emoji": "📍",
    "label": "Varis",
    "color": "#94A3B8",
    "desc": "Coses curioses",
    "apareix_a": [
      "Mapes",
      "Itinerari",
      "Material Extra"
    ],
    "font": "llocs-data.js",
    "subs": {
      "curiositats": {
        "emoji": "🤔",
        "label": "Varis/Curiositats"
      },
      "plantacions": {
        "emoji": "🌳",
        "label": "Varis/Plantacions"
      },
      "fars": {
        "emoji": "🔦",
        "label": "Varis/Fars"
      },
      "molins": {
        "emoji": "𖣘",
        "label": "Varis/Molins"
      },
      "altres": {
        "emoji": "🌀",
        "label": "Varis/Altres llocs"
      }
    }
  },
  "restaurants": {
    "emoji": "🍽️",
    "label": "Restaurants",
    "color": "#FF6600",
    "desc": "Establiments de restauració",
    "apareix_a": [
      "Mapes",
      "Itinerari",
      "Restaurants"
    ],
    "font": "restaurants-data.js",
    "subs": {}
  }
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function poiCategoria(cat) { return POI_CATEGORIES[cat] || null; }

function poiEmoji(cat, sub) {
  const c = POI_CATEGORIES[cat];
  if (!c) return '📍';
  if (sub && sub !== '-' && c.subs && c.subs[sub]) return c.subs[sub].emoji;
  return c.emoji;
}

function poiColor(cat) {
  const c = POI_CATEGORIES[cat];
  return c ? c.color : '#888888';
}

function poiLabel(cat, sub) {
  const c = POI_CATEGORIES[cat];
  if (!c) return cat;
  if (sub && sub !== '-' && c.subs && c.subs[sub]) return c.subs[sub].label;
  return c.label;
}
