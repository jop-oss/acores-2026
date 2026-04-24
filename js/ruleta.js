/* =============================================
   RULETA DE DECISIONS · Açores 2026
   ============================================= */

const JUGADORS = [
  { nom: 'Jordi', color: '#4a9eff', emoji: '🧔' },
  { nom: 'Anna',  color: '#ff6b9d', emoji: '👩' },
  { nom: 'Laia',  color: '#ffd166', emoji: '👧' },
  { nom: 'Mons',  color: '#a8d8b0', emoji: '👴' },
  { nom: 'Xu',    color: '#ff9f43', emoji: '👵' },
  { nom: 'Joa',   color: '#c678dd', emoji: '🧓' },
];

const HISTORIAL_KEY = 'ruleta_historial_v1';
const MAX_HISTORIAL = 20;

let actius = [true, true, true, true, true, true];
let girant = false;
let anglActual = 0;

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderParticipants();
  dibuixaRuleta();
  renderHistorial();
  syncPregunta();

  document.getElementById('pregunta-select').addEventListener('change', e => {
    if (e.target.value) {
      document.getElementById('pregunta-custom').value = '';
    }
    syncPregunta();
  });

  document.getElementById('pregunta-custom').addEventListener('input', e => {
    if (e.target.value) {
      document.getElementById('pregunta-select').value = '';
    }
    syncPregunta();
  });
});

function syncPregunta() {
  const sel = document.getElementById('pregunta-select').value;
  const custom = document.getElementById('pregunta-custom').value.trim();
  const display = document.getElementById('pregunta-display');
  display.textContent = custom || sel || 'Qui ho fa?';
}

function getPregunta() {
  const sel = document.getElementById('pregunta-select').value;
  const custom = document.getElementById('pregunta-custom').value.trim();
  return custom || sel || 'Qui ho fa?';
}

// ── Participants ──────────────────────────────
function renderParticipants() {
  const grid = document.getElementById('participants-grid');
  grid.innerHTML = '';
  JUGADORS.forEach((j, i) => {
    const chip = document.createElement('div');
    chip.className = 'participant-chip' + (actius[i] ? ' actiu' : '');
    chip.innerHTML = `
      <div class="chip-color" style="background:${j.color}"></div>
      <span class="chip-nom">${j.nom}</span>
    `;
    chip.addEventListener('click', () => toggleParticipant(i));
    grid.appendChild(chip);
  });
}

function toggleParticipant(i) {
  const actius_count = actius.filter(Boolean).length;
  if (actius[i] && actius_count <= 2) return; // mínim 2
  actius[i] = !actius[i];
  renderParticipants();
  dibuixaRuleta();
  document.getElementById('resultat-bloc').style.display = 'none';
}

function getActius() {
  return JUGADORS.filter((_, i) => actius[i]);
}

// ── Canvas ────────────────────────────────────
// Paleta de colors més vius i contrastats
const COLORS_RULETA = [
  { base: '#e05555', clar: '#ff8a8a' }, // vermell
  { base: '#e09020', clar: '#ffc55a' }, // taronja
  { base: '#d4b800', clar: '#ffe55a' }, // groc
  { base: '#3aaa5c', clar: '#6adb8a' }, // verd
  { base: '#2288cc', clar: '#55bbff' }, // blau
  { base: '#9944cc', clar: '#cc77ff' }, // violeta
];

function dibuixaRuleta(angleOffset = 0) {
  const canvas = document.getElementById('ruleta-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2;
  const r = W / 2 - 6;

  ctx.clearRect(0, 0, W, H);

  const participants = getActius();
  const n = participants.length;
  const arc = (2 * Math.PI) / n;

  // Ombra exterior de la ruleta
  ctx.save();
  ctx.shadowColor = 'rgba(106,171,122,0.35)';
  ctx.shadowBlur = 24;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.fillStyle = '#0a1628';
  ctx.fill();
  ctx.restore();

  participants.forEach((j, i) => {
    const startAngle = angleOffset + i * arc - Math.PI / 2;
    const endAngle = startAngle + arc;
    const midAngle = startAngle + arc / 2;
    const col = COLORS_RULETA[i % COLORS_RULETA.length];

    // Sector amb gradient radial simulat (color clar al centre, fosc a fora)
    const grd = ctx.createRadialGradient(cx, cy, r * 0.15, cx, cy, r);
    grd.addColorStop(0, col.clar);
    grd.addColorStop(1, col.base);

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = grd;
    ctx.fill();

    // Separadors blancs fins
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Línia de divisió radial més marcada
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r * Math.cos(startAngle), cy + r * Math.sin(startAngle));
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Emoji del jugador (prop del centre)
    const emojiR = r * 0.38;
    const ex = cx + emojiR * Math.cos(midAngle);
    const ey = cy + emojiR * Math.sin(midAngle);
    ctx.save();
    ctx.font = `${n <= 4 ? 20 : 16}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(j.emoji, ex, ey);
    ctx.restore();

    // Nom del jugador (més enfora)
    const textR = r * 0.68;
    const tx = cx + textR * Math.cos(midAngle);
    const ty = cy + textR * Math.sin(midAngle);
    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(midAngle + Math.PI / 2);
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${n <= 4 ? 15 : 12}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 6;
    ctx.fillText(j.nom, 0, 0);
    ctx.restore();
  });

  // Anell exterior decoratiu
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.strokeStyle = '#6aab7a';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Cercle central
  const cgrad = ctx.createRadialGradient(cx - 8, cy - 8, 2, cx, cy, 38);
  cgrad.addColorStop(0, '#1a3a2a');
  cgrad.addColorStop(1, '#0a1628');
  ctx.beginPath();
  ctx.arc(cx, cy, 38, 0, 2 * Math.PI);
  ctx.fillStyle = cgrad;
  ctx.fill();
  ctx.strokeStyle = '#6aab7a';
  ctx.lineWidth = 3;
  ctx.stroke();
}

// ── Spin ──────────────────────────────────────
function spinRuleta() {
  if (girant) return;
  const participants = getActius();
  if (participants.length < 2) return;

  girant = true;
  document.getElementById('spin-btn').disabled = true;
  document.getElementById('resultat-bloc').style.display = 'none';

  const n = participants.length;
  const arc = (2 * Math.PI) / n;

  // Rotació total: entre 6 i 10 voltes + angle aleatori
  const extraVoltes = 6 + Math.random() * 4;
  const extraAngle = Math.random() * 2 * Math.PI;
  const totalAngle = extraVoltes * 2 * Math.PI + extraAngle;

  const durada = 3500 + Math.random() * 1000;
  const inici = performance.now();
  const angleInici = anglActual;

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animate(ts) {
    const elapsed = ts - inici;
    const progress = Math.min(elapsed / durada, 1);
    const angle = angleInici + totalAngle * easeOut(progress);
    anglActual = angle % (2 * Math.PI);

    dibuixaRuleta(anglActual);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      girant = false;
      document.getElementById('spin-btn').disabled = false;
      mostrarResultat(anglActual, participants, arc);
    }
  }

  requestAnimationFrame(animate);
}

function mostrarResultat(angle, participants, arc) {
  // El sector 0 comença a -π/2 + angleOffset (el pin apunta a dalt = -π/2)
  // Normalitzem l'angle de la ruleta per saber quin sector queda al pin
  let relatiu = ((2 * Math.PI) - (angle % (2 * Math.PI))) % (2 * Math.PI);
  const idx = Math.floor(relatiu / arc) % participants.length;
  const guanyador = participants[idx];

  const pregunta = getPregunta();

  // Mostra resultat
  document.getElementById('resultat-emoji').textContent = guanyador.emoji;
  document.getElementById('resultat-nom').textContent = guanyador.nom;
  document.getElementById('resultat-pregunta').textContent = pregunta;
  const bloc = document.getElementById('resultat-bloc');
  bloc.style.display = 'block';
  bloc.style.borderColor = guanyador.color;

  // Confetti
  llencaConfetti(guanyador.color);

  // Historial
  afegirHistorial(guanyador, pregunta);
}

// ── Historial ─────────────────────────────────
function afegirHistorial(jugador, pregunta) {
  const hist = getHistorial();
  const ara = new Date();
  const hora = ara.getHours().toString().padStart(2, '0') + ':' + ara.getMinutes().toString().padStart(2, '0');
  hist.unshift({ nom: jugador.nom, color: jugador.color, pregunta, hora });
  if (hist.length > MAX_HISTORIAL) hist.pop();
  localStorage.setItem(HISTORIAL_KEY, JSON.stringify(hist));
  renderHistorial();
}

function getHistorial() {
  try {
    return JSON.parse(localStorage.getItem(HISTORIAL_KEY)) || [];
  } catch { return []; }
}

function renderHistorial() {
  const hist = getHistorial();
  const list = document.getElementById('historial-list');
  if (hist.length === 0) {
    list.innerHTML = '<p class="historial-buit">Encara no hi ha resultats</p>';
    return;
  }
  list.innerHTML = hist.map(h => `
    <div class="historial-item">
      <div class="hist-dot" style="background:${h.color}"></div>
      <span class="hist-nom">${h.nom}</span>
      <span class="hist-preg">${h.pregunta}</span>
      <span class="hist-hora">${h.hora}</span>
    </div>
  `).join('');
}

function clearHistorial() {
  localStorage.removeItem(HISTORIAL_KEY);
  renderHistorial();
}

// ── Confetti ──────────────────────────────────
function llencaConfetti(colorBase) {
  const container = document.getElementById('confetti-container');
  const colors = [colorBase, '#a8d8b0', '#6aab7a', '#fff', '#ffd166'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.width = (6 + Math.random() * 6) + 'px';
    piece.style.height = piece.style.width;
    container.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}
