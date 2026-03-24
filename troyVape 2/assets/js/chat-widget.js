// Troy AI Chat Widget — auto-inicializa ao importar
const CHAT_API = '/api/chat';

function getSessionId() {
  let id = sessionStorage.getItem('troy_chat_session');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('troy_chat_session', id);
  }
  return id;
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'text') node.textContent = v;
    else if (k === 'className') node.className = v;
    else node.setAttribute(k, v);
  }
  for (const child of children) {
    if (typeof child === 'string') node.appendChild(document.createTextNode(child));
    else node.appendChild(child);
  }
  return node;
}

function svgIcon(pathD, size = 24) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  const p = document.createElementNS(ns, 'path');
  p.setAttribute('d', pathD);
  svg.appendChild(p);
  return svg;
}

function sendIcon() {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', '18');
  svg.setAttribute('height', '18');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  const p = document.createElementNS(ns, 'path');
  p.setAttribute('d', 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z');
  svg.appendChild(p);
  return svg;
}

function createWidget() {
  const container = el('div', { id: 'troy-chat' });

  // Floating button
  const btn = el('button', { id: 'troy-chat-btn', 'aria-label': 'Abrir chat' }, [
    svgIcon('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z')
  ]);

  // Panel
  const panel = el('div', { id: 'troy-chat-panel', className: 'troy-chat-hidden' });

  // Header
  const dot = el('span', { className: 'troy-chat-dot' });
  const title = el('div', { id: 'troy-chat-title' }, [dot, ' Cloud Lab AI']);
  const closeBtn = el('button', { id: 'troy-chat-close', 'aria-label': 'Fechar chat', text: '\u00D7' });
  const header = el('div', { id: 'troy-chat-header' }, [title, closeBtn]);

  // Messages area
  const messages = el('div', { id: 'troy-chat-messages' });

  // Form
  const input = el('input', {
    id: 'troy-chat-input',
    type: 'text',
    placeholder: 'Pergunte sobre nossos produtos...',
    maxlength: '2000',
    autocomplete: 'off'
  });
  const sendBtn = el('button', { type: 'submit', id: 'troy-chat-send', 'aria-label': 'Enviar' }, [sendIcon()]);
  const form = el('form', { id: 'troy-chat-form' }, [input, sendBtn]);

  panel.append(header, messages, form);
  container.append(btn, panel);
  document.body.appendChild(container);
  return container;
}

function addMessage(container, role, text) {
  const msg = el('div', { className: `troy-msg troy-msg-${role}`, text });
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
  return msg;
}

async function sendMessage(text, messagesEl) {
  addMessage(messagesEl, 'user', text);
  const botMsg = addMessage(messagesEl, 'bot', '\u25CF\u25CF\u25CF');

  try {
    const res = await fetch(CHAT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, sessionId: getSessionId() })
    });

    if (!res.ok) {
      botMsg.textContent = 'Desculpe, estou offline no momento. Fale conosco pelo WhatsApp!';
      return;
    }

    botMsg.textContent = '';
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6);
        if (data === '[DONE]') break;
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            botMsg.textContent += content;
            messagesEl.scrollTop = messagesEl.scrollHeight;
          }
        } catch { /* skip malformed SSE chunks */ }
      }
    }

    if (!botMsg.textContent) {
      botMsg.textContent = 'Hmm, n\u00E3o consegui responder. Tente novamente!';
    }
  } catch {
    botMsg.textContent = 'Erro de conex\u00E3o. Tente novamente mais tarde.';
  }
}

function init() {
  const widget = createWidget();
  const btn = widget.querySelector('#troy-chat-btn');
  const panel = widget.querySelector('#troy-chat-panel');
  const closeBtn = widget.querySelector('#troy-chat-close');
  const form = widget.querySelector('#troy-chat-form');
  const input = widget.querySelector('#troy-chat-input');
  const messages = widget.querySelector('#troy-chat-messages');
  let opened = false;

  btn.addEventListener('click', () => {
    panel.classList.toggle('troy-chat-hidden');
    btn.classList.toggle('troy-chat-btn-active');
    if (!opened) {
      addMessage(messages, 'bot', 'Oi! Sou o Cloud Lab AI. Posso te ajudar a escolher o pod perfeito! Qual sabor voc\u00EA curte?');
      opened = true;
    }
    input.focus();
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.add('troy-chat-hidden');
    btn.classList.remove('troy-chat-btn-active');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    sendMessage(text, messages);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
