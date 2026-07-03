/* ═══════════════════════════════════════════════════════
   ENGINE.JS — Main game controller, bootstrap, ending
   ═══════════════════════════════════════════════════════ */

const Engine = (() => {
  // ─── Game state — single persistent object reference ─
  // NEVER reassign this object — always mutate its fields.
  // This ensures all modules (ChoiceSystem, SceneManager etc.)
  // always hold the same live reference via window.Engine.state
  const state = {
    sceneId: null,
    dialogueIndex: 0,
    lovePoints: 0,
    fatePoints: 0,
    choices: {},
    chosenItem: null,
    endingChoice: null,
    achievements: [],
    timestamp: null,
  };

  // Telegram / reward URL — replace with real link later
  const REWARD_URL = 'https://t.me/';

  // ─── Reset state in-place (no reassignment!) ──────────
  function resetState() {
    state.sceneId       = null;
    state.dialogueIndex = 0;
    state.lovePoints    = 0;
    state.fatePoints    = 0;
    state.choices       = {};
    state.chosenItem    = null;
    state.endingChoice  = null;
    state.achievements  = [];
    state.timestamp     = null;
  }

  function loadStateFrom(saved) {
    state.sceneId       = saved.sceneId       ?? null;
    state.dialogueIndex = saved.dialogueIndex ?? 0;
    state.lovePoints    = saved.lovePoints    ?? 0;
    state.fatePoints    = saved.fatePoints    ?? 0;
    state.choices       = saved.choices       ?? {};
    state.chosenItem    = saved.chosenItem    ?? null;
    state.endingChoice  = saved.endingChoice  ?? null;
    state.achievements  = saved.achievements  ?? [];
    state.timestamp     = saved.timestamp     ?? null;
  }

  // ─── Bootstrap ────────────────────────────────────────
  function boot() {
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.random() * 18 + 5;
      if (pct >= 100) { pct = 100; clearInterval(interval); }
      UI.updateLoadingBar(Math.min(pct, 100));
    }, 120);

    AnimationSystem.init();
    DialogueSystem.init();
    ChoiceSystem.init();
    SceneManager.init(SCENES);

    const savedSettings = SaveSystem.loadSettings();
    UI.init(savedSettings);

    setTimeout(() => {
      clearInterval(interval);
      UI.updateLoadingBar(100);
      setTimeout(() => {
        UI.hideLoadingScreen();
        UI.showMainMenu();
      }, 500);
    }, 1800);
  }

  // ─── New game ─────────────────────────────────────────
  function newGame() {
    SaveSystem.clear();
    resetState();

    UI.showGameScreen();

    const old = document.getElementById('prologue-layer');
    if (old) old.remove();
    document.getElementById('ending-screen').classList.add('hidden');
    document.getElementById('achievement-overlay').classList.add('hidden');

    SceneManager.loadScene('prologue');
  }

  // ─── Continue ─────────────────────────────────────────
  function continueGame() {
    const saved = SaveSystem.load();
    if (!saved || !saved.sceneId) { newGame(); return; }
    loadStateFrom(saved);

    UI.showGameScreen();
    const old = document.getElementById('prologue-layer');
    if (old) old.remove();
    document.getElementById('ending-screen').classList.add('hidden');

    SceneManager.loadScene(state.sceneId, true);
  }

  // ─── Go to main menu ──────────────────────────────────
  function goToMainMenu() {
    SaveSystem.save(state);
    UI.showMainMenu();
  }

  // ─── Compute & show ending ────────────────────────────
  function computeEnding() {
    const love = state.lovePoints;
    const fate = state.fatePoints;
    // Secret ending: много тепла (love≥6) или тепло+судьба (love≥5, fate≥2)
    const isSecret = love >= 6 || (love >= 5 && fate >= 2);

    AnimationSystem.setBackground('bg-ending-secret');
    AnimationSystem.hideCG();

    const achievements = [];

    if (isSecret) {
      if (!state.achievements.includes('best_monday')) {
        state.achievements.push('best_monday');
      }
      achievements.push({
        icon: '🏆',
        name: 'Лучший понедельник',
        desc: 'Маршрут 75 вёл не просто в Одессу — он вёл именно сюда.',
      });
    }

    // Медведь из маршрутки. Всегда.
    if (!state.achievements.includes('lost_bear')) {
      state.achievements.push('lost_bear');
    }
    achievements.push({
      icon: '🐻',
      name: 'Найден потерянный медведь',
      desc: 'Появился. Исчез. Значок остался.',
    });

    // Гена. Всегда.
    if (!state.achievements.includes('gena_right')) {
      state.achievements.push('gena_right');
    }
    achievements.push({
      icon: '🧔',
      name: 'Гена был прав',
      desc: 'Будет хорошая поездка. Гена чувствует. Гена всегда чувствует.',
    });

    // Подарок из Теплодара
    if (state.chosenItem) {
      achievements.push({
        icon: '🎁',
        name: getItemAchievementName(state.chosenItem.key),
        desc: getItemAchievementDesc(state.chosenItem.key),
      });
    }

    // Итоговый выбор
    if (state.endingChoice) {
      achievements.push({
        icon: getEndingChoiceIcon(state.endingChoice),
        name: getEndingChoiceName(state.endingChoice),
        desc: getEndingChoiceDesc(state.endingChoice),
      });
    }

    SaveSystem.save(state);

    UI.showAchievements(achievements, () => {
      const quote = isSecret
        ? 'Маршрут 75, Гена, сырный Бульдак и персиковый сок.\nИногда именно так выглядит хороший понедельник.'
        : 'Некоторые понедельники оказываются\nлучше, чем планировалось.';

      UI.showEndingScreen(
        quote,
        { love, fate },
        achievements,
        isSecret
      );
    });
  }

  function getItemAchievementName(key) {
    const map = {
      magnet:      'Из Теплодара с любовью',
      peach:       'Персиковое лето',
      stone:       'Тёплый камушек',
      branch:      'Кусочек сада',
      photo:       'Момент оттуда',
      stay_movie:  'Хороший вечер',
      stay_games:  'Непризнанное поражение',
      leave:       'Правильное решение',
    };
    return map[key] || 'Особый момент';
  }

  function getItemAchievementDesc(key) {
    const map = {
      magnet:      'Маленький магнитик путешествует дальше маршрутки 75.',
      peach:       'Персик из теплодарского сада — лучший сувенир лета.',
      stone:       'Ничего особенного. Просто камушек. Просто из дома.',
      branch:      'Запах маминого сада можно увезти с собой.',
      photo:       'Фотография — это кусочек места, которое любишь.',
      stay_movie:  'Остаться на фильм — иногда лучшее решение понедельника.',
      stay_games:  'Он поддавался. Она знала. Это был лучший исход.',
      leave:       'Знать когда уйти — тоже особый навык.',
    };
    return map[key] || '';
  }

  function getEndingChoiceIcon(key) {
    return { stay_movie: '🎬', stay_games: '🎮', leave: '🌙' }[key] || '✨';
  }

  function getEndingChoiceName(key) {
    return {
      stay_movie:  'Хороший вечер',
      stay_games:  'Непризнанное поражение',
      leave:       'Правильное решение',
    }[key] || 'Финал';
  }

  function getEndingChoiceDesc(key) {
    return {
      stay_movie:  'Остаться на фильм — иногда лучший выбор понедельника.',
      stay_games:  'Он поддавался. Она знала. Это был лучший исход.',
      leave:       'Знать когда уйти — тоже особый навык.',
    }[key] || '';
  }

  // ─── Claim reward ──────────────────────────────────────
  function claimReward() {
    alert('напиши Максу "гони мишку"');
  }

  // state is exposed as a direct reference — all mutations via field access
  return {
    state,   // ← direct object reference, not a getter
    boot,
    newGame,
    continueGame,
    goToMainMenu,
    computeEnding,
    claimReward,
  };
})();

// ─── Start everything when DOM is ready ───────────────
document.addEventListener('DOMContentLoaded', () => {
  Engine.boot();
});
