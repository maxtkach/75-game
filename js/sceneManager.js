/* ═══════════════════════════════════════════════════════
   SCENE MANAGER — Loads and transitions between scenes
   ═══════════════════════════════════════════════════════ */

const SceneManager = (() => {
  let scenes = {};       // keyed by scene.id
  let currentScene = null;
  let dialogueQueue = [];
  let dialoguePos = 0;
  let chapterLabelEl = null;

  // ─── Init ──────────────────────────────────────────────
  function init(sceneArray) {
    sceneArray.forEach(s => { scenes[s.id] = s; });
    chapterLabelEl = document.getElementById('chapter-label');
  }

  // ─── Load a scene by id ────────────────────────────────
  async function loadScene(id, skipFade = false) {
    const scene = scenes[id];
    if (!scene) {
      console.error(`[SceneManager] Scene not found: ${id}`);
      return;
    }

    // Fade out
    if (!skipFade) await AnimationSystem.fadeToBlack(500);

    currentScene = scene;

    // Update engine state
    Engine.state.sceneId = id;
    Engine.state.dialogueIndex = 0;
    SaveSystem.save(Engine.state);

    // Apply background
    AnimationSystem.setBackground(scene.background || 'bg-prologue', scene.bgImage || null);

    // CG image
    if (scene.cg) {
      AnimationSystem.showCG(`assets/images/${scene.cg}`);
    } else {
      AnimationSystem.hideCG();
    }

    // Chapter label
    if (scene.chapter) {
      chapterLabelEl.textContent = scene.chapter;
    }

    // Fade in
    if (!skipFade) await AnimationSystem.fadeFromBlack(500);

    // Show chapter title card if configured
    if (scene.showChapterCard) {
      await AnimationSystem.showChapterTitle(scene.chapterNum, scene.chapterName);
    }

    // Decide entry type
    if (scene.type === 'prologue') {
      runPrologue(scene);
    } else if (scene.type === 'ending') {
      runEnding(scene);
    } else {
      runDialogueScene(scene);
    }
  }

  // ─── Standard dialogue scene ───────────────────────────
  function runDialogueScene(scene) {
    dialogueQueue = scene.dialogues || [];
    dialoguePos = Engine.state.dialogueIndex || 0;

    // Restore dialogue index from save
    if (dialoguePos >= dialogueQueue.length) {
      dialoguePos = 0;
    }

    DialogueSystem.showPanel();
    advanceDialogue(scene);
  }

  function advanceDialogue(scene) {
    if (dialoguePos < dialogueQueue.length) {
      const entry = dialogueQueue[dialoguePos];
      dialoguePos++;
      Engine.state.dialogueIndex = dialoguePos;
      SaveSystem.save(Engine.state);

      const text    = typeof entry === 'string' ? entry : entry.text;
      const speaker = typeof entry === 'object' ? entry.speaker : null;
      const narrate = typeof entry === 'object' ? entry.narration : false;

      DialogueSystem.show(text, speaker, narrate, () => advanceDialogue(scene));
    } else {
      // All dialogue consumed — show choices or move to next scene
      if (scene.choices && scene.choices.length) {
        DialogueSystem.hidePanel();
        ChoiceSystem.show(scene.choices, (choice) => {
          // Track final-branch choices for achievements
          if (choice.itemKey && ['stay_movie', 'stay_games', 'leave'].includes(choice.itemKey)) {
            Engine.state.endingChoice = choice.itemKey;
            SaveSystem.save(Engine.state);
          }
          const next = choice.next || scene.next;
          if (next) {
            loadScene(next);
          }
        });
      } else if (scene.next) {
        loadScene(scene.next);
      }
    }
  }

  // ─── Prologue scene ────────────────────────────────────
  function runPrologue(scene) {
    DialogueSystem.hidePanel();
    ChoiceSystem.hide();

    const layer = document.createElement('div');
    layer.className = 'prologue-text-layer';
    layer.id = 'prologue-layer';

    const lines = scene.prologueLines || [];
    lines.forEach((line, i) => {
      const p = document.createElement('p');
      p.className = `prologue-line${line.accent ? ' accent' : ''}`;
      p.textContent = line.text;
      layer.appendChild(p);
    });

    if (scene.showStartBtn) {
      const btn = document.createElement('button');
      btn.className = 'prologue-btn';
      btn.textContent = 'Начать историю';
      btn.onclick = () => {
        layer.remove();
        loadScene(scene.next);
      };
      layer.appendChild(btn);
    }

    document.getElementById('game-screen').appendChild(layer);

    // Animate lines in sequence
    let delay = 800;
    layer.querySelectorAll('.prologue-line').forEach(el => {
      setTimeout(() => el.classList.add('visible'), delay);
      delay += 900;
    });
  }

  // ─── Ending scene ─────────────────────────────────────
  function runEnding(scene) {
    DialogueSystem.hidePanel();
    ChoiceSystem.hide();
    // Delegate to Engine to compute ending
    Engine.computeEnding();
  }

  // ─── Getters ───────────────────────────────────────────
  function getCurrentScene() { return currentScene; }
  function getScene(id) { return scenes[id]; }

  return { init, loadScene, getCurrentScene, getScene };
})();
