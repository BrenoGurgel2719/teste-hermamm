/**
 * script.js — FTZA Landing Page
 *
 * Módulos:
 *  1. Reveal ao scroll  — anima elementos com .reveal-up/left/right,
 *                         .result-item, .para-quem-item, .faq-item,
 *                         .cta-col, .garantia-inner e .faq-cta
 *  2. FAQ accordion     — abre/fecha perguntas com animação max-height
 */

document.addEventListener('DOMContentLoaded', function () {


  /* ================================================================
     1. REVEAL AO SCROLL
     Usa IntersectionObserver para adicionar .show aos elementos
     quando entram no viewport. Stagger de 120ms por grupo de 4.
  ================================================================ */

  const REVEAL_SELECTORS = [
    '.reveal-up',
    '.reveal-left',
    '.reveal-right',
    '.result-item',
    '.para-quem-item',
    '.faq-item',
    '.cta-col',
    '.garantia-inner',
    '.faq-cta',
  ].join(', ');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, index) {
        if (!entry.isIntersecting) return;

        /* Stagger: cada elemento no grupo entra 120ms depois do anterior */
        var delay = (index % 4) * 120;
        setTimeout(function () {
          entry.target.classList.add('show');
        }, delay);

        /* Para de observar após animar — evita re-trigger */
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll(REVEAL_SELECTORS).forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ================================================================
     2. FAQ ACCORDION
     Abre/fecha com animação de max-height.
     Comportamento: apenas um item aberto por vez.
  ================================================================ */

  document.querySelectorAll('.faq-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var item   = this.closest('.faq-item');
      var body   = item.querySelector('.faq-body');
      var isOpen = item.classList.contains('open');

      /* Fecha todos os outros itens abertos */
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem === item) return;
        openItem.classList.remove('open');
        openItem.querySelector('.faq-body').classList.remove('open');
        openItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      /* Alterna o item clicado */
      if (isOpen) {
        item.classList.remove('open');
        body.classList.remove('open');
        this.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        body.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });


}); /* fim DOMContentLoaded */