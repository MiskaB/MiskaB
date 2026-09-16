/* ============================================================
   shared.js — runs on every page
   Handles: nav injection, footer year, mousemove, SW, scroll-to-top
   ============================================================ */

(function () {
  // --- Nav injection ---
  const NAV_LINKS = [
    { href: 'home.html',     label: 'Home' },
    { href: 'freetime.html', label: 'Freetime' },
    { href: 'blogs.html',    label: 'Blogs' },
    { href: 'cv.html',       label: 'Career' },
    { href: 'contact.html',  label: 'Contact' },
    { href: 'games.html',    label: 'Games' },
  ];

  function buildNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    const currentFile = nav.dataset.current || window.location.pathname.split('/').pop() || 'index.html';
    const ul = document.createElement('ul');
    NAV_LINKS.forEach(({ href, label }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      if (href === currentFile) a.className = 'current-page';
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);
  }

  // --- Dynamic copyright year ---
  function updateCopyrightYear() {
    document.querySelectorAll('.copyright-year').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  }

  // --- RAF-throttled mouse tracking ---
  function initMouseTracking() {
    let scheduled = false;
    let lastX = 0, lastY = 0;
    document.addEventListener('mousemove', (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        document.body.style.setProperty('--mouse-x', (lastX / window.innerWidth) * 100 + '%');
        document.body.style.setProperty('--mouse-y', (lastY / window.innerHeight) * 100 + '%');
        scheduled = false;
      });
    });
  }

  // --- Scroll-to-top button ---
  function initScrollToTop() {
    if (!document.querySelector('.scroll-to-top')) {
      const btn = document.createElement('button');
      btn.className = 'scroll-to-top';
      btn.setAttribute('aria-label', 'Scroll to top');
      btn.textContent = '↑';
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      document.body.appendChild(btn);
    }
    window.addEventListener('scroll', () => {
      const btn = document.querySelector('.scroll-to-top');
      if (btn) btn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
  }

  // --- Service worker registration ---
  function registerSW() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
      });
    }
  }

  // --- Init ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    buildNav();
    updateCopyrightYear();
    initMouseTracking();
    initScrollToTop();
    registerSW();
  }
})();
