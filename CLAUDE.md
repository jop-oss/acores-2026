# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Açores 2026** is a static PWA (Progressive Web App) for a group trip to the Azores. It's written in vanilla HTML/CSS/JavaScript with no build tools or package managers.

## Running Locally

No build step required. Serve the root directory over HTTP:

```bash
python -m http.server 8080
# or
npx serve .
```

Then open `http://localhost:8080` in a browser. Opening `index.html` directly as a `file://` URL also works for most features, but the service worker and some fetch-based features require HTTP.

## Architecture

Six independent HTML pages, each with a paired CSS and JS file:

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` + `js/app.js` | Landing page with character cards and flip animations |
| Restaurants | `restaurants.html` + `js/restaurants.js` | Map + filter UI using Leaflet.js; data in `js/restaurants-data.js` (600KB+) |
| Weather | `temps.html` + `js/temps.js` | Island weather using WMO codes; sun/tide animations |
| Webcams | `webcams.html` + `js/webcams.js` | Live SpotAzores feeds, grouped by island, auto-refreshed every 30s |
| Quiz | `jocs.html` | Multi-player quiz with avatar selection and scoring |
| Wheel | `ruleta.html` + `js/ruleta.js` | Canvas-based decision spinner with history and winner video playback |

**Shared**: `css/style.css` defines CSS variables for the dark/light theme (toggled via localStorage).

## Key Details

- **Language**: UI text is in Catalan.
- **Participants**: The six trip members (Anna, Jordi, Mons, Xu, Laia, Joa) appear across pages as selectable players, avatars, and wheel segments.
- **Restaurant data**: `js/restaurants-data.js` is the sole data source for the restaurant page — editing the list of restaurants means editing this file.
- **Ruleta**: `js/ruleta.js` drives all spinner logic (Canvas animation, question customization, winner video in `img/personatges/`). It's the most recently active area of the codebase.
- **PWA**: `manifest.json` is configured; `service-worker.js` is currently an empty placeholder.
- **No external state**: All persistence is via `localStorage`.
