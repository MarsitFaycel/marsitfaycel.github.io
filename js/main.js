import { roles, stats, skills, experiences, achievements, sideProjects, contact, sceneSettings } from "./data.js";

const GH = "https://github.com/MarsitFaycel/";
const $ = id => document.getElementById(id);
const chips = tags => `<div class="chips">${tags.map(t => `<span class="chip mono">${t}</span>`).join("")}</div>`;

/* ---------- Rendu du contenu ---------- */
$("stats").innerHTML = stats.map(s => `
  <div class="stat"><b>${s.value}</b><span>${s.label}</span></div>`).join("");

$("skills-list").innerHTML = skills.map(g => `
  <div class="glass skill-group reveal">
    <h3 class="mono">${g.title}</h3>
    ${chips(g.items)}
  </div>`).join("");

$("xp-list").innerHTML = experiences.map((x, i) => `
  <article class="step reveal">
    <div class="glass xp ${i === 0 ? "open" : ""}">
      <button class="xp-head" aria-expanded="${i === 0}">
        <div>
          <span class="year mono">${x.dates}</span>
          <h3>${x.role}</h3>
          <p class="company">${x.company} <span>· ${x.place}</span></p>
        </div>
        <span class="toggle mono" aria-hidden="true">+</span>
      </button>
      <div class="xp-body"><div class="xp-inner">
        <p class="context">${x.context}</p>
        <ul>${x.points.map(p => `<li>${p}</li>`).join("")}</ul>
        ${chips(x.tags)}
      </div></div>
    </div>
  </article>`).join("");

$("project-list").innerHTML = achievements.map(a => `
  <div class="glass card reveal ${a.featured ? "featured" : ""}">
    <div class="meta mono"><span>${a.featured ? "★ " : ""}${a.company}</span></div>
    <h3>${a.title}</h3>
    <p>${a.desc}</p>
    <span class="highlight mono">${a.highlight}</span>
    ${chips(a.tags)}
  </div>`).join("");

$("side-list").innerHTML = sideProjects.map(p => `
  <a class="side mono" href="${GH + p.name}" target="_blank" rel="noopener">${p.name} <span>${p.tag}</span></a>`).join("");

if (contact.showEmail && contact.user && contact.domain) {
  $("mail").href = `mailto:${contact.user}@${contact.domain}`;
} else {
  const next = $("mail").nextElementSibling;   // LinkedIn devient le bouton principal
  $("mail").remove();
  next?.classList.add("primary");
}
$("year").textContent = new Date().getFullYear();

/* ---------- Accordéon des expériences ---------- */
document.querySelectorAll(".xp-head").forEach(btn => btn.addEventListener("click", () => {
  const open = btn.parentElement.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
}));

/* ---------- Typewriter ---------- */
const typed = $("typed");
let ri = 0, ci = 0, del = false;
(function type() {
  const w = roles[ri];
  typed.textContent = w.slice(0, ci);
  if (!del && ci++ === w.length) { del = true; return setTimeout(type, 1400); }
  if (del && ci-- === 0) { del = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, del ? 50 : 110);
})();

/* ---------- Reveal + tilt ---------- */
// Chaque élément n'est observé que jusqu'à son apparition, puis libéré.
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("visible");
  io.unobserve(e.target);
}), { threshold: .1 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});

/* ---------- Scène 3D ----------
   Chargée à part (Three.js est dans js/vendor) : si WebGL n'est pas disponible,
   le contenu reste affiché. */
import("./scene.js")
  .then(({ initScene }) => initScene($("scene"), sceneSettings))
  .catch(err => console.warn("Scène 3D non chargée :", err));
