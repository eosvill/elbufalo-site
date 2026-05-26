(function () {
  'use strict';

  // ---------- Año footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll(
    '.section-title, .section-lead, .eyebrow, .metodo, .doc, .vehiculo, .testimonio, .form, .contacto__list, .faq__list, .cta-band__inner, .founder__media, .founder__lead, .founder__quote, .founder__commits, .inicial__card'
  );
  revealEls.forEach(function (el) { el.setAttribute('data-reveal', ''); });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---------- Form ----------
  const form = document.getElementById('leadForm');
  const successBox = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = {
        nombre: form.nombre.value.trim(),
        telefono: form.telefono.value.trim(),
        tipo: form.tipo.value,
        mensaje: form.mensaje.value.trim()
      };

      if (!data.nombre || !data.telefono || !data.tipo) {
        if (!data.nombre) form.nombre.focus();
        else if (!data.telefono) form.telefono.focus();
        else form.tipo.focus();
        return;
      }

      // Construir mensaje de WhatsApp para handoff inmediato
      const msg = [
        'Hola Alex Auto Mall,',
        'Soy ' + data.nombre + '.',
        'Busco: ' + data.tipo,
        data.mensaje ? 'Detalles: ' + data.mensaje : null,
        'Mi teléfono: ' + data.telefono
      ].filter(Boolean).join('\n');

      const waNumber = '15555555555'; // reemplazar con número real
      const waUrl = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(msg);

      // GA4 event
      if (typeof gtag === 'function') {
        gtag('event', 'lead_submit', {
          event_category: 'engagement',
          event_label: data.tipo
        });
      }

      // Mostrar éxito
      if (successBox) successBox.hidden = false;
      form.querySelector('button[type="submit"]').disabled = true;

      // Redirigir a WhatsApp con el mensaje pre-llenado
      setTimeout(function () {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }, 400);
    });
  }

  // ---------- Smooth scroll para anchors internos ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
