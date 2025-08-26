// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  /* ---------------------------
   *  Scroll behavior (mobile)
   * --------------------------- */
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  // On first load (no hash), ensure we start at the top
  window.addEventListener('load', () => {
    if (!location.hash) window.scrollTo(0, 0);
  });

  /* -------------
   *  Drawer nav
   * ------------- */
  const menuBtn  = document.getElementById('menuBtn');
  const drawer   = document.getElementById('drawer');
  const overlay  = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeBtn');

  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('hidden');
    menuBtn?.setAttribute('aria-expanded', 'true');
  };
  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.add('hidden');
    menuBtn?.setAttribute('aria-expanded', 'false');
  };

  menuBtn?.addEventListener('click', openDrawer);
  overlay?.addEventListener('click', closeDrawer);
  closeBtn?.addEventListener('click', closeDrawer);

  // Close drawer when clicking any link inside it
  if (drawer) {
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  }

  // Close with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && !drawer.classList.contains('hidden')) closeDrawer();
  });

  /* -----------------
   *  Tabs (Projects)
   * ----------------- */
  const tabButtons = Array.from(document.querySelectorAll('.tabbtn'));
  if (tabButtons.length) {
    // Map aria-controls -> panel element
    const panels = tabButtons.reduce((acc, btn) => {
      const id = btn.getAttribute('aria-controls');
      const el = id ? document.getElementById(id) : null;
      if (id && el) acc[id] = el;
      return acc;
    }, /** @type {Record<string, HTMLElement>} */ ({}));

    const activeClasses = ['bg-neutral-800', 'ring-1', 'ring-yellow-400/40', 'border-yellow-400', 'text-white'];
    const idleClasses   = ['bg-neutral-900', 'border-neutral-700'];

    const setButtonState = (btn, isActive) => {
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      activeClasses.forEach(c => btn.classList.toggle(c, isActive));
      idleClasses.forEach(c => btn.classList.toggle(c, !isActive));
    };

    const showPanel = (panelId) => {
      Object.entries(panels).forEach(([id, el]) => {
        el.classList.toggle('hidden', id !== panelId);
      });
    };

    const activateByButton = (btn) => {
      const panelId = btn.getAttribute('aria-controls');
      if (!panelId) return;
      tabButtons.forEach(b => setButtonState(b, b === btn));
      showPanel(panelId);
    };

    // Click + keyboard (ArrowLeft/Right + Home/End)
    tabButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => activateByButton(btn));
      btn.addEventListener('keydown', (e) => {
        const last = tabButtons.length - 1;
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const next = tabButtons[(idx + 1) % tabButtons.length];
          next.focus(); activateByButton(next);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = tabButtons[(idx - 1 + tabButtons.length) % tabButtons.length];
          prev.focus(); activateByButton(prev);
        } else if (e.key === 'Home') {
          e.preventDefault();
          tabButtons[0].focus(); activateByButton(tabButtons[0]);
        } else if (e.key === 'End') {
          e.preventDefault();
          tabButtons[last].focus(); activateByButton(tabButtons[last]);
        }
      });
    });

    // Initial state: use the one marked aria-selected="true", otherwise the first
    const preset = tabButtons.find(b => b.getAttribute('aria-selected') === 'true') || tabButtons[0];
    if (preset) activateByButton(preset);
  }

  /* --------------
   *  Footer year
   * -------------- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});