// Popup personatges — clic sobre el nom o la zona
document.querySelectorAll(".person").forEach((person) => {
  person.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = person.classList.contains("active");
    // Tanca tots
    document
      .querySelectorAll(".person")
      .forEach((p) => p.classList.remove("active"));
    // Obre aquest si no estava obert
    if (!isActive) person.classList.add("active");
  });
});

// Tanca en clicar fora
document.addEventListener("click", () => {
  document
    .querySelectorAll(".person")
    .forEach((p) => p.classList.remove("active"));
});

// Flip cards — tap en mòbil
document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// Mode clar/fosc
const toggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("tema");
if (savedTheme === "light") {
  document.body.classList.add("light");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light");
  toggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("tema", isLight ? "light" : "dark");
});
