/**
 * TAURA Security Shield
 * 10 camadas de proteção contra inspeção
 */

const BLOCKED_MESSAGE = '\u26a0 ACESSO RESTRITO \u2014 Este ambiente \u00e9 monitorado.';

// ─── 1. Anti-DevTools Keyboard ─────────────────────
function blockDevToolsKeys() {
  document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+S (Save)
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+P (Print)
    if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
      e.preventDefault();
      return false;
    }
  }, true);
}

// ─── 2. Anti-Right-Click ───────────────────────────
function blockRightClick() {
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  }, true);
}

// ─── 3. Anti-Select/Copy/Cut/Paste ─────────────────
function blockCopySelect() {
  const events = ['copy', 'cut', 'paste', 'selectstart'];
  events.forEach(evt => {
    document.addEventListener(evt, function(e) {
      e.preventDefault();
      return false;
    }, true);
  });

  // CSS injection
  const style = document.createElement('style');
  style.textContent = `
    * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }
  `;
  document.head.appendChild(style);
}

// ─── 4. DevTools Detector (Dimension Check) ────────
function detectDevToolsDimension() {
  let isOpen = false;
  const overlay = createBlockOverlay();

  function check() {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;

    if (widthThreshold || heightThreshold) {
      if (!isOpen) {
        isOpen = true;
        overlay.style.display = 'flex';
      }
    } else {
      if (isOpen) {
        isOpen = false;
        overlay.style.display = 'none';
      }
    }
  }

  setInterval(check, 500);
  window.addEventListener('resize', check);
}

// ─── 5. Console Poison ─────────────────────────────
function poisonConsole() {
  const noop = function() {};
  try {
    const methods = ['log', 'warn', 'error', 'info', 'debug', 'table', 'trace', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'assert', 'profile'];
    methods.forEach(method => {
      try { console[method] = noop; } catch(e) {}
    });
    // Override console.clear to do nothing useful
    try { console.clear = noop; } catch(e) {}
  } catch(e) {}
}

// ─── 6. Debugger Trap ──────────────────────────────
function debuggerTrap() {
  setInterval(function() {
    (function() { return false; })
      ['constructor']('debugger')
      ['call']();
  }, 50);
}

// ─── 7. Anti-Iframe ────────────────────────────────
function preventIframe() {
  if (window.self !== window.top) {
    window.top.location = window.self.location;
  }
}

// ─── 8. DOM Mutation Guard ─────────────────────────
function guardDOM() {
  const root = document.getElementById('root');
  if (!root) return;

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) {
          // Detect injected script tags
          if (node.tagName === 'SCRIPT' && !node.hasAttribute('data-taura')) {
            node.remove();
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// ─── 9. DevTools Detector (Timing Attack) ──────────
function detectDevToolsTiming() {
  const overlay = document.getElementById('taura-block-overlay');

  setInterval(function() {
    const start = performance.now();
    (function() { return false; })['constructor']('debugger')['call']();
    const end = performance.now();

    if (end - start > 100 && overlay) {
      overlay.style.display = 'flex';
    }
  }, 1000);
}

// ─── 10. Anti-Drag ─────────────────────────────────
function blockDrag() {
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
  }, true);
}

// ─── Block Overlay ─────────────────────────────────
function createBlockOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'taura-block-overlay';
  overlay.style.cssText = `
    display: none;
    position: fixed;
    inset: 0;
    z-index: 999999;
    background: #0A0A0A;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    font-family: 'JetBrains Mono', monospace;
  `;

  const icon = document.createElement('div');
  icon.style.cssText = 'font-size: 48px;';
  icon.textContent = '\u26a0\ufe0f';

  const msg = document.createElement('div');
  msg.style.cssText = `
    color: #6B0F1A;
    font-size: 12px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    text-align: center;
    max-width: 400px;
    line-height: 2;
  `;
  msg.textContent = BLOCKED_MESSAGE;

  const sub = document.createElement('div');
  sub.style.cssText = `
    color: #333;
    font-size: 9px;
    letter-spacing: 0.15em;
  `;
  sub.textContent = 'Feche as ferramentas de desenvolvedor para continuar.';

  overlay.appendChild(icon);
  overlay.appendChild(msg);
  overlay.appendChild(sub);
  document.body.appendChild(overlay);

  return overlay;
}

// ─── INIT ──────────────────────────────────────────
export function initSecurityShield() {
  const isDev = process.env.NODE_ENV === 'development';

  // Sempre ativo: bloqueio de teclas, clique direito, cópia, drag
  blockDevToolsKeys();
  blockRightClick();
  blockCopySelect();
  blockDrag();
  preventIframe();

  if (!isDev) {
    // Apenas em produção: poison console, debugger trap, timing (causa piscar em dev)
    poisonConsole();

    if (document.readyState === 'complete') {
      detectDevToolsDimension();
      guardDOM();
      debuggerTrap();
      detectDevToolsTiming();
    } else {
      window.addEventListener('load', function() {
        detectDevToolsDimension();
        guardDOM();
        debuggerTrap();
        detectDevToolsTiming();
      });
    }
  } else {
    // Em dev: apenas guarda DOM (sem debugger/timing que causa piscar)
    if (document.readyState === 'complete') {
      detectDevToolsDimension();
      guardDOM();
    } else {
      window.addEventListener('load', function() {
        detectDevToolsDimension();
        guardDOM();
      });
    }
  }
}

export default initSecurityShield;
