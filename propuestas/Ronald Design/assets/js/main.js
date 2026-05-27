/* ============ Ronald Design — Main JS ============ */

// Header scroll effect
const header = document.getElementById('header');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));
}

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('section > div > div, article, .reveal').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Form de contacto (demo: simula envío)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('formMsg');
    msg.classList.remove('hidden');
    contactForm.reset();
    setTimeout(() => msg.classList.add('hidden'), 5000);
  });
}

// Carrito (demo: localStorage)
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('rd_cart') || '[]');
  } catch { return []; }
}
function setCart(items) {
  localStorage.setItem('rd_cart', JSON.stringify(items));
  updateCartBadge();
}
function updateCartBadge() {
  const badge = document.getElementById('cartCount');
  if (!badge) return;
  const count = getCart().reduce((s, it) => s + (it.qty || 1), 0);
  badge.textContent = count;
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 400);
}
updateCartBadge();

// Toast helper
window.showToast = function(text) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
};

// Expose cart utilities
window.RDCart = { get: getCart, set: setCart, update: updateCartBadge };
