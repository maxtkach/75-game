/* ═══════════════════════════════════════════════════════
   CHOICE SYSTEM — Choice rendering, points, toasts
   ═══════════════════════════════════════════════════════ */

const ChoiceSystem = (() => {
  let panelEl = null;
  let innerEl = null;
  let toastContainer = null;
  let toastQueue = [];
  let toastBusy = false;

  // ─── Init ──────────────────────────────────────────────
  function init() {
    panelEl        = document.getElementById('choices-panel');
    innerEl        = document.getElementById('choices-inner');
    toastContainer = document.getElementById('toast-container');
  }

  // ─── Show choices ──────────────────────────────────────
  function show(choices, onSelect) {
    if (!choices || !choices.length) return;

    innerEl.innerHTML = '';
    panelEl.classList.remove('hidden');

    const label = document.createElement('p');
    label.className = 'choices-label';
    label.textContent = 'Сделай выбор';
    innerEl.appendChild(label);

    choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.id = `choice-${idx}`;

      // Extract leading emoji
      const emojiMatch = choice.text.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|[\u2600-\u27FF])\s*/u);
      if (emojiMatch) {
        const emoji = document.createElement('span');
        emoji.className = 'choice-btn-emoji';
        emoji.textContent = emojiMatch[0].trim();
        btn.appendChild(emoji);
        const textSpan = document.createElement('span');
        textSpan.textContent = choice.text.slice(emojiMatch[0].length);
        btn.appendChild(textSpan);
      } else {
        btn.textContent = choice.text;
      }

      btn.addEventListener('click', () => handleChoice(choice, idx, onSelect));
      innerEl.appendChild(btn);
    });
  }

  // ─── Handle a choice click ─────────────────────────────
  function handleChoice(choice, idx, onSelect) {
    // Visually mark selection
    const btns = innerEl.querySelectorAll('.choice-btn');
    btns.forEach((b, i) => {
      if (i === idx) b.classList.add('selected');
      else { b.style.opacity = '0.4'; b.style.pointerEvents = 'none'; }
    });

    const effects = choice.effects || {};

    // ─── FIX: Engine is a global const — use it directly.
    // window.Engine does NOT work because `const` is not on window.
    // Engine is always in scope at call-time (scripts are sequential).
    const gs = Engine.state;

    // Love points
    if (effects.lovePoints) {
      gs.lovePoints += effects.lovePoints;
      const icon = effects.lovePoints >= 2 ? '❤️❤️' : '❤️';
      queueToast(icon, `Тепло +${effects.lovePoints}`, 'toast-love');
      AnimationSystem.burstParticles(window.innerWidth / 2, window.innerHeight * 0.72, '#ff8aac');
    }

    // Fate points
    if (effects.fatePoints) {
      gs.fatePoints += effects.fatePoints;
      queueToast('✨', `Судьба +${effects.fatePoints}`, 'toast-fate');
      AnimationSystem.burstParticles(window.innerWidth / 2, window.innerHeight * 0.72, '#b0a0ff');
    }

    // Remember chosen item key
    if (choice.itemKey) {
      gs.chosenItem = { key: choice.itemKey, label: choice.text };
    }

    // Persist
    SaveSystem.save(gs);

    setTimeout(() => {
      hide();
      if (onSelect) onSelect(choice, idx);
    }, 420);
  }

  // ─── Hide choices ──────────────────────────────────────
  function hide() {
    panelEl.classList.add('hidden');
    innerEl.innerHTML = '';
  }

  // ─── Toast queue ───────────────────────────────────────
  function queueToast(icon, label, type) {
    toastQueue.push({ icon, label, type });
    if (!toastBusy) drainToastQueue();
  }

  function drainToastQueue() {
    if (!toastQueue.length) { toastBusy = false; return; }
    toastBusy = true;
    const { icon, label, type } = toastQueue.shift();
    showToast(icon, label, type, () => setTimeout(drainToastQueue, 120));
  }

  function showToast(icon, label, type, onDone) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${label}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => { toast.remove(); if (onDone) onDone(); }, 400);
    }, 1700);
  }

  return { init, show, hide, queueToast };
})();
