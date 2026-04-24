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
function dibuixaRuleta(angleOffset = 0) {
  const canvas = document.getElementById('ruleta-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2;
  const r = W / 2 - 4;

  ctx.clearRect(0, 0, W, H);

  const participants = getActius();
  const n = participants.length;
  const arc = (2 * Math.PI) / n;

  participants.forEach((j, i) => {
    const startAngle = angleOffset + i * arc - Math.PI / 2;
    const endAngle = startAngle + arc;

    // Sector
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = j.color + 'cc';
    ctx.fill();
    ctx.strokeStyle = '#0a1628';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text
    const midAngle = startAngle + arc / 2;
    const textR = r * 0.62;
    const tx = cx + textR * Math.cos(midAngle);
    const ty = cy + textR * Math.sin(midAngle);

    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(midAngle + Math.PI / 2);
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${n <= 4 ? 16 : 13}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 4;
    ctx.fillText(j.nom, 0, 0);
    ctx.restore();
  });

  // Cercle central
  ctx.beginPath();
  ctx.arc(cx, cy, 36, 0, 2 * Math.PI);
  ctx.fillStyle = '#0a1628';
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
  // El pin apunta cap a dalt (angle = -π/2 en coordenades canvas)
  // L'angle actual desplaça el sector 0 a -π/2 + angle
  // Calculem quin sector queda apuntant al pin
  const pinAngle = -Math.PI / 2; // pin a dalt
  // Angle relatiu: on apunta el pin dins la ruleta
  let relatiu = ((pinAngle - angle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
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
