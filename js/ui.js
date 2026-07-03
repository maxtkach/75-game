/* ═══════════════════════════════════════════════════════
   UI — In-game menu, settings, achievements, helpers
   ═══════════════════════════════════════════════════════ */

const UI = (() => {
  let settings = null;

  // ─── Init ──────────────────────────────────────────────
  function init(savedSettings) {
    settings = savedSettings;
    applySettings();
  }

  // ─── Apply loaded settings to UI controls ──────────────
  function applySettings() {
    const mv = document.getElementById('setting-music');
    const sv = document.getElementById('setting-sfx');
    const sp = document.getElementById('setting-speed');
    if (mv) mv.value = settings.musicVolume;
    if (sv) sv.value = settings.sfxVolume;
    if (sp) sp.value = settings.textSpeed;

    document.getElementById('music-val').textContent  = `${settings.musicVolume}%`;
    document.getElementById('sfx-val').textContent    = `${settings.sfxVolume}%`;
    document.getElementById('speed-val').textContent  = speedLabel(settings.textSpeed);

    DialogueSystem.setSpeed(settings.textSpeed);
    applyAudioSettings();
  }

  function speedLabel(v) {
    return ['', 'Медленно', 'Тихо', 'Норм', 'Быстро', 'Молния'][v] || 'Норм';
  }

  function applyAudioSettings() {
    const bgAudio = document.getElementById('audio-bg');
    if (bgAudio) bgAudio.volume = settings.musicVolume / 100;
  }

  // ─── Settings callbacks ────────────────────────────────
  function onMusicChange(val) {
    settings.musicVolume = Number(val);
    document.getElementById('music-val').textContent = `${val}%`;
    applyAudioSettings();
    SaveSystem.saveSettings(settings);
  }

  function onSfxChange(val) {
    settings.sfxVolume = Number(val);
    document.getElementById('sfx-val').textContent = `${val}%`;
    SaveSystem.saveSettings(settings);
  }

  function onSpeedChange(val) {
    settings.textSpeed = Number(val);
    document.getElementById('speed-val').textContent = speedLabel(Number(val));
    DialogueSystem.setSpeed(Number(val));
    SaveSystem.saveSettings(settings);
  }

  // ─── Game menu ─────────────────────────────────────────
  function toggleGameMenu() {
    const overlay = document.getElementById('game-menu-overlay');
    const isHidden = overlay.classList.contains('hidden');
    if (isHidden) openGameMenu();
    else closeGameMenu();
  }

  function openGameMenu() {
    document.getElementById('game-menu-overlay').classList.remove('hidden');
  }

  function closeGameMenu() {
    document.getElementById('game-menu-overlay').classList.add('hidden');
  }

  // ─── Settings panel ────────────────────────────────────
  function openSettings() {
    closeGameMenu();
    document.getElementById('settings-overlay').classList.remove('hidden');
  }

  function closeSettings() {
    document.getElementById('settings-overlay').classList.add('hidden');
  }

  // ─── Fullscreen ────────────────────────────────────────
  function toggleFullscreen() {
    const btn = document.getElementById('fullscreen-btn');
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        btn.textContent = 'Выключить';
      }).catch(console.warn);
    } else {
      document.exitFullscreen().then(() => {
        btn.textContent = 'Включить';
      });
    }
  }

  // ─── Show / hide screens ──────────────────────────────
  function showGameScreen() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
  }

  function showMainMenu() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
    closeGameMenu();

    // Show continue button if save exists
    if (SaveSystem.hasSave()) {
      document.getElementById('btn-continue').classList.remove('hidden');
    } else {
      document.getElementById('btn-continue').classList.add('hidden');
    }
  }

  // ─── Achievement popup ─────────────────────────────────
  function showAchievement(icon, name, desc, onDismiss) {
    const overlay = document.getElementById('achievement-overlay');
    document.getElementById('achievement-icon').textContent = icon;
    document.getElementById('achievement-name').textContent = name;
    document.getElementById('achievement-desc').textContent = desc || '';

    // Add tap hint
    let hint = overlay.querySelector('.achievement-tap-hint');
    if (!hint) {
      hint = document.createElement('p');
      hint.className = 'achievement-tap-hint';
      hint.textContent = 'Нажми, чтобы продолжить';
      overlay.appendChild(hint);
    }

    overlay.classList.remove('hidden');

    const dismiss = () => {
      overlay.classList.add('hidden');
      overlay.removeEventListener('click', dismiss);
      if (onDismiss) onDismiss();
    };

    setTimeout(() => {
      overlay.addEventListener('click', dismiss);
    }, 600);
  }

  // ─── Show multiple achievements sequentially ──────────
  function showAchievements(list, onAllDone) {
    if (!list || !list.length) { if (onAllDone) onAllDone(); return; }
    const [first, ...rest] = list;
    showAchievement(first.icon, first.name, first.desc, () => {
      setTimeout(() => showAchievements(rest, onAllDone), 300);
    });
  }

  // ─── Show ending screen ────────────────────────────────
  function showEndingScreen(quote, stats, achievements, showReward) {
    const el = document.getElementById('ending-screen');
    el.classList.remove('hidden');

    document.getElementById('ending-quote').textContent = quote;

    // Stats
    const statsEl = document.getElementById('ending-stats');
    statsEl.innerHTML = `
      <div class="ending-stat">
        <span class="ending-stat-icon">❤️</span>
        <span class="ending-stat-label">Тепло</span>
        <span class="ending-stat-value">${stats.love}</span>
      </div>
      <div class="ending-stat">
        <span class="ending-stat-icon">✨</span>
        <span class="ending-stat-label">Судьба</span>
        <span class="ending-stat-value">${stats.fate}</span>
      </div>
    `;

    // Achievements
    const achEl = document.getElementById('ending-achievements');
    achEl.innerHTML = achievements.map(a =>
      `<div class="ending-achievement-item">
        <span class="ending-achievement-icon">${a.icon}</span>
        <span class="ending-achievement-name">${a.name}</span>
      </div>`
    ).join('');

    // Reward button
    const rewardBtn = document.getElementById('ending-reward-btn');
    if (showReward) {
      rewardBtn.classList.remove('hidden');
    } else {
      rewardBtn.classList.add('hidden');
    }
  }

  // ─── Loading screen ────────────────────────────────────
  function hideLoadingScreen() {
    const ls = document.getElementById('loading-screen');
    ls.classList.add('fade-out');
    setTimeout(() => ls.classList.add('hidden'), 900);
  }

  function updateLoadingBar(pct) {
    const bar = document.getElementById('loading-bar');
    if (bar) bar.style.width = `${pct}%`;
  }

  return {
    init,
    onMusicChange,
    onSfxChange,
    onSpeedChange,
    toggleGameMenu,
    openGameMenu,
    closeGameMenu,
    openSettings,
    closeSettings,
    toggleFullscreen,
    showGameScreen,
    showMainMenu,
    showAchievement,
    showAchievements,
    showEndingScreen,
    hideLoadingScreen,
    updateLoadingBar,
  };
})();
