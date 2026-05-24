const cards = [...document.querySelectorAll(".service-card")];
const dotsWrap = document.getElementById("serviceDots");
let active = 0;

cards.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Servicio ${index + 1}`);
  dot.addEventListener("click", () => setActive(index));
  dotsWrap.appendChild(dot);
});

const dots = [...dotsWrap.children];

function setActive(index) {
  active = (index + cards.length) % cards.length;
  renderOrbit();
}

function renderOrbit() {
  const mobile = window.matchMedia("(max-width: 560px)").matches;
  const spread = mobile ? 158 : 295;
  cards.forEach((card, index) => {
    let offset = index - active;
    if (offset > cards.length / 2) offset -= cards.length;
    if (offset < -cards.length / 2) offset += cards.length;

    const abs = Math.abs(offset);
    const x = Math.sin(offset * Math.PI / 3) * spread;
    const y = abs * (mobile ? 18 : 15);
    const z = -abs * (mobile ? 78 : 72);
    const scale = abs === 0 ? 1.05 : abs === 1 ? .73 : abs === 2 ? .68 : .62;
    const opacity = abs > 2 ? 0 : 1;
    const blur = abs === 0 ? 0 : abs * 1.8;
    const cardOpacity = mobile && abs > 0 ? 0 : opacity;

    card.classList.toggle("active", index === active);
    card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
    card.style.opacity = cardOpacity;
    card.style.filter = `blur(${blur}px)`;
    card.style.zIndex = String(20 - abs);
    card.style.pointerEvents = abs === 0 ? "auto" : "none";
  });

  dots.forEach((dot, index) => dot.classList.toggle("active", index === active));
}

document.getElementById("prevService").addEventListener("click", () => setActive(active - 1));
document.getElementById("nextService").addEventListener("click", () => setActive(active + 1));
window.addEventListener("resize", renderOrbit);

let timer = window.setInterval(() => setActive(active + 1), 4200);
document.querySelector(".orbit").addEventListener("pointerenter", () => window.clearInterval(timer));
document.querySelector(".orbit").addEventListener("pointerleave", () => {
  timer = window.setInterval(() => setActive(active + 1), 4200);
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});

renderOrbit();
