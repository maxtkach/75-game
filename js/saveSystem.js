/* ═══════════════════════════════════════════════════════
   SAVE SYSTEM — localStorage persistence
   ═══════════════════════════════════════════════════════ */

const SaveSystem = (() => {
  const SAVE_KEY = 'route75_save';
  const SETTINGS_KEY = 'route75_settings';

  const defaultState = () => ({
    sceneId: null,
    dialogueIndex: 0,
    lovePoints: 0,
    fatePoints: 0,
    choices: {},        // { sceneId: choiceIndex }
    chosenItem: null,   // item chosen in chapter 2
    achievements: [],
    timestamp: null,
  });

  const defaultSettings = () => ({
    musicVolume: 70,
    sfxVolume: 80,
    textSpeed: 3,       // 1=slow … 5=fast
  });

  // ─── Save ─────────────────────────────────────────────
  function save(state) {
    try {
      state.timestamp = Date.now();
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('[SaveSystem] Could not save:', e);
    }
  }

  // ─── Load ─────────────────────────────────────────────
  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      // Merge with defaults to handle new fields added after first save
      return Object.assign(defaultState(), data);
    } catch (e) {
      console.warn('[SaveSystem] Could not load save:', e);
      return null;
    }
  }

  // ─── Clear ────────────────────────────────────────────
  function clear() {
    localStorage.removeItem(SAVE_KEY);
  }

  // ─── Settings ─────────────────────────────────────────
  function saveSettings(settings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {}
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return defaultSettings();
      return Object.assign(defaultSettings(), JSON.parse(raw));
    } catch (e) {
      return defaultSettings();
    }
  }

  function hasSave() {
    const s = load();
    return s !== null && s.sceneId !== null;
  }

  return { save, load, clear, saveSettings, loadSettings, hasSave, defaultState };
})();
