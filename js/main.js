// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // ---- Drawer ----
  const menuBtn  = document.getElementById('menuBtn');
  const drawer   = document.getElementById('drawer');
  const overlay  = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeBtn');

  function openDrawer() { drawer?.classList.remove('hidden'); }
  function closeDrawer() { drawer?.classList.add('hidden'); }

  menuBtn?.addEventListener('click', openDrawer);
  overlay?.addEventListener('click', closeDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  document.querySelectorAll('#drawer a').forEach(a => a.addEventListener('click', closeDrawer));

  // ---- Tabs ----
  const buttons = Array.from(document.querySelectorAll('.tabbtn'));
  if (buttons.length) {
    // Collect panels from aria-controls
    const panels = buttons.reduce((acc, btn) => {
      const id = btn.getAttribute('aria-controls');
      const el = id ? document.getElementById(id) : null;
      if (id && el) acc[id] = el;
      return acc;
    }, {});

    const activeClasses = ['bg-neutral-800','ring-1','ring-yellow-400/40','border-yellow-400','text-white'];
    const idleClasses   = ['bg-neutral-900','border-neutral-700'];

    function setButtonState(btn, isActive) {
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      activeClasses.forEach(c => btn.classList.toggle(c, isActive));
      idleClasses.forEach(c => btn.classList.toggle(c, !isActive));
    }

    function showPanel(panelId) {
      Object.entries(panels).forEach(([id, el]) => {
        el.classList.toggle('hidden', id !== panelId);
      });
    }

    function activateByButton(btn) {
      const panelId = btn.getAttribute('aria-controls');
      if (!panelId) return;
      buttons.forEach(b => setButtonState(b, b === btn));
      showPanel(panelId);
    }

    // Click + keyboard support
    buttons.forEach(btn => {
      btn.addEventListener('click', () => activateByButton(btn));
      btn.addEventListener('keydown', (e) => {
        // Left/Right arrows to navigate tabs
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const i = buttons.indexOf(btn);
          const next = e.key === 'ArrowRight'
            ? buttons[(i + 1) % buttons.length]
            : buttons[(i - 1 + buttons.length) % buttons.length];
          next.focus();
          activateByButton(next);
        }
      });
    });

    // Initial state: respect the one with aria-selected="true", else first
    const preset = buttons.find(b => b.getAttribute('aria-selected') === 'true') || buttons[0];
    activateByButton(preset);
  }

  // ---- Footer year ----
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});