(function () {
  'use strict';

  const WEBHOOK = 'https://ai-optimazer-n8n.ot80ss.easypanel.host/webhook/elbufalo-web-chat';

  // Genera o recupera el ID de sesión único por visitante
  function getSessionId() {
    let s = localStorage.getItem('_buffy_sid');
    if (!s) {
      s = 'sid_' + Math.random().toString(36).slice(2) + '_' + Date.now();
      localStorage.setItem('_buffy_sid', s);
    }
    return s;
  }

  // ─── ESTILOS ────────────────────────────────────────────────────────────────
  const CSS = `
    #buffy-fab {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9998;
      background: #D4A017;
      color: #111;
      border: none;
      border-radius: 50px;
      padding: 13px 22px;
      font-family: 'Inter', Arial, sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 18px rgba(0,0,0,0.35);
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform .15s, box-shadow .15s;
      letter-spacing: 0.01em;
    }
    #buffy-fab:hover {
      transform: translateY(-2px);
      box-shadow: 0 7px 24px rgba(0,0,0,0.4);
    }

    #buffy-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 9999;
      display: none;
      align-items: flex-end;
      justify-content: flex-end;
      padding: 0 28px 100px 0;
    }
    #buffy-overlay.open { display: flex; }

    #buffy-modal {
      width: 380px;
      background: #1c1c1c;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 16px 48px rgba(0,0,0,0.55);
      overflow: hidden;
      font-family: 'Inter', Arial, sans-serif;
      animation: buffy-slide-in .2s ease;
    }
    @keyframes buffy-slide-in {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    #buffy-header {
      background: #111;
      padding: 15px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #222;
    }
    #buffy-header-info { display: flex; align-items: center; gap: 12px; }
    #buffy-avatar {
      width: 38px;
      height: 38px;
      background: #D4A017;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      color: #111;
      font-weight: 800;
      flex-shrink: 0;
    }
    #buffy-header-text h3 {
      margin: 0;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
    }
    #buffy-header-text p {
      margin: 2px 0 0;
      color: #888;
      font-size: 12px;
    }
    #buffy-close {
      background: none;
      border: none;
      color: #666;
      font-size: 24px;
      cursor: pointer;
      line-height: 1;
      padding: 0 2px;
      transition: color .1s;
    }
    #buffy-close:hover { color: #fff; }

    #buffy-messages {
      flex: 1;
      overflow-y: auto;
      padding: 18px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 300px;
      max-height: 380px;
      scrollbar-width: thin;
      scrollbar-color: #333 transparent;
    }
    #buffy-messages::-webkit-scrollbar { width: 4px; }
    #buffy-messages::-webkit-scrollbar-track { background: transparent; }
    #buffy-messages::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }

    .buffy-msg {
      max-width: 82%;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.55;
      word-break: break-word;
    }
    .buffy-msg.bot {
      background: #2a2a2a;
      color: #e8e8e8;
      align-self: flex-start;
      border-bottom-left-radius: 3px;
    }
    .buffy-msg.user {
      background: #D4A017;
      color: #111;
      align-self: flex-end;
      border-bottom-right-radius: 3px;
      font-weight: 500;
    }
    .buffy-msg.typing {
      background: #222;
      color: #666;
      align-self: flex-start;
      font-style: italic;
      font-size: 13px;
    }

    #buffy-input-area {
      padding: 14px 16px;
      background: #111;
      display: flex;
      gap: 10px;
      align-items: flex-end;
      border-top: 1px solid #222;
    }
    #buffy-input {
      flex: 1;
      background: #262626;
      border: 1px solid #333;
      border-radius: 10px;
      padding: 10px 13px;
      color: #f0f0f0;
      font-size: 14px;
      resize: none;
      outline: none;
      font-family: 'Inter', Arial, sans-serif;
      max-height: 100px;
      line-height: 1.45;
      transition: border-color .15s;
    }
    #buffy-input::placeholder { color: #555; }
    #buffy-input:focus { border-color: #D4A017; }

    #buffy-send {
      background: #D4A017;
      border: none;
      border-radius: 10px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      color: #111;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background .15s;
    }
    #buffy-send:hover { background: #bf9010; }
    #buffy-send:disabled { background: #333; color: #555; cursor: not-allowed; }

    @media (max-width: 480px) {
      #buffy-overlay { padding: 0 12px 90px 12px; justify-content: center; }
      #buffy-modal { width: 100%; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  // ─── HTML ────────────────────────────────────────────────────────────────────
  document.body.insertAdjacentHTML('beforeend', `
    <button id="buffy-fab" aria-label="Hablar con un agente">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.51 3.58 1.39 5.06L2 22l5.06-1.38A9.944 9.944 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.66 0-3.22-.44-4.56-1.2l-.32-.19-3.32.91.92-3.24-.21-.34A7.944 7.944 0 014 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z"/>
      </svg>
      Hablar con un agente
    </button>

    <div id="buffy-overlay" role="dialog" aria-modal="true" aria-label="Chat con Buffy">
      <div id="buffy-modal">
        <div id="buffy-header">
          <div id="buffy-header-info">
            <div id="buffy-avatar">B</div>
            <div id="buffy-header-text">
              <h3>Buffy</h3>
              <p>Asistente de Elbufalo IA</p>
            </div>
          </div>
          <button id="buffy-close" aria-label="Cerrar chat">&times;</button>
        </div>
        <div id="buffy-messages"></div>
        <div id="buffy-input-area">
          <textarea id="buffy-input" placeholder="Escribí tu consulta..." rows="1"></textarea>
          <button id="buffy-send" aria-label="Enviar mensaje">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `);

  // ─── LÓGICA ──────────────────────────────────────────────────────────────────
  const fab      = document.getElementById('buffy-fab');
  const overlay  = document.getElementById('buffy-overlay');
  const closeBtn = document.getElementById('buffy-close');
  const messages = document.getElementById('buffy-messages');
  const input    = document.getElementById('buffy-input');
  const sendBtn  = document.getElementById('buffy-send');

  let opened  = false;
  let loading = false;
  const SID   = getSessionId();

  function addMsg(text, type) {
    const el = document.createElement('div');
    el.className = 'buffy-msg ' + type;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function openChat() {
    if (!opened) {
      opened = true;
      addMsg('Hola, soy Buffy, la asistente de Elbufalo IA. ¿En qué te puedo ayudar?', 'bot');
    }
    overlay.classList.add('open');
    fab.style.display = 'none';
    setTimeout(() => input.focus(), 50);
  }

  function closeChat() {
    overlay.classList.remove('open');
    fab.style.display = 'flex';
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text || loading) return;

    addMsg(text, 'user');
    input.value = '';
    input.style.height = 'auto';

    loading = true;
    sendBtn.disabled = true;
    const typing = addMsg('Escribiendo...', 'typing');

    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: SID, message: text })
      });
      const data = await res.json();
      typing.remove();
      addMsg(data.reply || 'No pude procesar tu mensaje. Intentá de nuevo.', 'bot');
    } catch {
      typing.remove();
      addMsg('No me pude conectar. Verificá tu conexión e intentá de nuevo.', 'bot');
    }

    loading = false;
    sendBtn.disabled = false;
    input.focus();
  }

  // Eventos
  fab.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeChat();
  });
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  input.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeChat();
  });

})();
