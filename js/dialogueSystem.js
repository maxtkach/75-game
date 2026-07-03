/* ═══════════════════════════════════════════════════════
   DIALOGUE SYSTEM — Typewriter effect, text queue
   ═══════════════════════════════════════════════════════ */

const DialogueSystem = (() => {
  // DOM refs
  let textEl = null;
  let hintEl = null;
  let panelEl = null;
  let charNameEl = null;
  let charNameWrap = null;

  // State
  let currentText = '';
  let charIndex = 0;
  let isTyping = false;
  let typingTimer = null;
  let onFinishCallback = null;
  let skipRequested = false;
  let currentSpeaker = '';
  let isNarration = false;

  // Speed map (ms per char)
  const speedMap = {
    1: 80,   // very slow
    2: 55,
    3: 35,   // default
    4: 18,
    5: 6,    // fast
  };

  let textSpeed = 35;

  // ─── Init ──────────────────────────────────────────────
  function init() {
    textEl      = document.getElementById('dialogue-text');
    hintEl      = document.getElementById('dialogue-next-hint');
    panelEl     = document.getElementById('dialogue-panel');
    charNameEl  = document.getElementById('character-name');
    charNameWrap = document.getElementById('character-name-wrap');

    panelEl.addEventListener('click', onPanelClick);
  }

  // ─── Set text speed ────────────────────────────────────
  function setSpeed(level) {
    textSpeed = speedMap[level] || speedMap[3];
  }

  // ─── Show dialogue line ────────────────────────────────
  function show(text, speaker, narration, callback) {
    stopTyping();

    currentText = text;
    currentSpeaker = speaker || '';
    isNarration = !!narration;
    onFinishCallback = callback || null;
    charIndex = 0;
    skipRequested = false;

    // Panel visibility
    showPanel();

    // Character name
    if (currentSpeaker) {
      charNameEl.textContent = currentSpeaker;
      charNameEl.classList.add('visible');
      charNameWrap.classList.remove('hidden');
    } else {
      charNameEl.classList.remove('visible');
    }

    // Narration style
    if (isNarration) {
      textEl.classList.add('narration');
    } else {
      textEl.classList.remove('narration');
    }

    // Clear previous text
    textEl.textContent = '';
    hintEl.classList.remove('visible');

    // Start typing
    isTyping = true;
    typeNext();
  }

  // ─── Typewriter core ───────────────────────────────────
  function typeNext() {
    if (!isTyping) return;

    if (charIndex >= currentText.length) {
      finishTyping();
      return;
    }

    // Write next char
    textEl.textContent = currentText.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex < currentText.length) {
      typingTimer = setTimeout(typeNext, textSpeed);
    } else {
      finishTyping();
    }
  }

  // ─── Complete instantly ────────────────────────────────
  function completeInstantly() {
    if (!isTyping) return;
    stopTyping();
    textEl.textContent = currentText;
    isTyping = false;
    finishTyping();
  }

  // ─── Finish typing ─────────────────────────────────────
  function finishTyping() {
    isTyping = false;
    clearTimeout(typingTimer);
    hintEl.classList.add('visible');
  }

  // ─── Stop mid-type ─────────────────────────────────────
  function stopTyping() {
    isTyping = false;
    clearTimeout(typingTimer);
    hintEl.classList.remove('visible');
  }

  // ─── Panel click handler ───────────────────────────────
  function onPanelClick() {
    if (isTyping) {
      completeInstantly();
    } else if (onFinishCallback) {
      const cb = onFinishCallback;
      onFinishCallback = null;
      hintEl.classList.remove('visible');
      cb();
    }
  }

  // ─── Show / hide panel ─────────────────────────────────
  function showPanel() {
    panelEl.classList.remove('panel-hidden');
  }

  function hidePanel() {
    panelEl.classList.add('panel-hidden');
    charNameEl.classList.remove('visible');
    stopTyping();
  }

  // ─── Query state ──────────────────────────────────────
  function getIsTyping() { return isTyping; }

  return {
    init,
    show,
    hidePanel,
    showPanel,
    setSpeed,
    completeInstantly,
    stopTyping,
    getIsTyping,
    onPanelClick,
  };
})();
