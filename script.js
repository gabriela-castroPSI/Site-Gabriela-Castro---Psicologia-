(function () {
  var toggle = document.querySelector('.nav-toggle');
  var list = document.getElementById('menu');
  var header = document.querySelector('.site-header');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Menu mobile ---- */
  if (toggle && list) {
    toggle.addEventListener('click', function () {
      var open = list.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---- Sombra do header ao rolar ---- */
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  function closeMenu() {
    if (list && list.classList.contains('is-open')) {
      list.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  }

  function scrollToSection(target, moveFocus) {
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    if (moveFocus) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  }

  function clearHash() {
    if (window.history && history.replaceState) {
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  /* ---- Clique em link de âncora da MESMA página: rola sem deixar #secao na URL ---- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="#"]');
    if (!link) return;

    var url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname) return;

    var id = url.hash.slice(1);
    if (!id) return;

    var target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    closeMenu();
    scrollToSection(target, true);
  });

  /* ---- Chegou de outra página com #secao (ex.: politica -> index.html#contato) ---- */
  if (location.hash.length > 1) {
    var initial = document.getElementById(location.hash.slice(1));
    if (initial) {
      window.requestAnimationFrame(function () {
        scrollToSection(initial, false);
        clearHash();
      });
    }
  }
})();
