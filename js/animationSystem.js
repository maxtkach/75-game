/* ═══════════════════════════════════════════════════════
   ANIMATION SYSTEM — Parallax, CG zoom, scene fades
   ═══════════════════════════════════════════════════════ */

const AnimationSystem = (() => {
  let parallaxTarget = null;
  let cgEl = null;
  let mouseLerp = { x: 0, y: 0 };
  let targetMouse = { x: 0, y: 0 };
  let rafId = null;
  let parallaxEnabled = true;
  let starsCtx = null;
  let starsArray = [];

  // ─── Init ──────────────────────────────────────────────
  function init() {
    cgEl = document.getElementById('cg-image');
    parallaxTarget = document.getElementById('game-bg');
    document.addEventListener('mousemove', onMouseMove);
    startRaf();
    initStars();
  }

  // ─── Mouse tracking ────────────────────────────────────
  function onMouseMove(e) {
    if (!parallaxEnabled) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    targetMouse.x = (e.clientX - cx) / cx;  // -1 to 1
    targetMouse.y = (e.clientY - cy) / cy;
  }

  // ─── Smooth parallax RAF loop ──────────────────────────
  function startRaf() {
    if (rafId) cancelAnimationFrame(rafId);
    function tick() {
      // Lerp toward target
      mouseLerp.x += (targetMouse.x - mouseLerp.x) * 0.06;
      mouseLerp.y += (targetMouse.y - mouseLerp.y) * 0.06;

      // Apply to background (subtle)
      if (parallaxTarget) {
        const bx = mouseLerp.x * -8;
        const by = mouseLerp.y * -8;
        parallaxTarget.style.transform = `translate(${bx}px, ${by}px) scale(1.04)`;
      }

      // Apply to CG image (slightly stronger)
      if (cgEl && cgEl.classList.contains('cg-visible')) {
        const cx = mouseLerp.x * -14;
        const cy = mouseLerp.y * -14;
        cgEl.style.transform = `translate(${cx}px, ${cy}px) scale(1.04)`;
      }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
  }

  // ─── Scene fade transition ─────────────────────────────
  function fadeToBlack(duration = 600) {
    return new Promise(resolve => {
      let overlay = document.getElementById('fade-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'fade-overlay';
        overlay.className = 'scene-fade-overlay';
        document.body.appendChild(overlay);
      }
      overlay.style.transition = `opacity ${duration}ms cubic-bezier(0.65,0,0.35,1)`;
      overlay.style.opacity = '0';
      overlay.offsetHeight; // reflow
      overlay.style.opacity = '1';
      setTimeout(resolve, duration);
    });
  }

  function fadeFromBlack(duration = 600) {
    return new Promise(resolve => {
      const overlay = document.getElementById('fade-overlay');
      if (!overlay) { resolve(); return; }
      overlay.style.transition = `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1)`;
      overlay.style.opacity = '0';
      setTimeout(resolve, duration);
    });
  }

  // ─── CG show / hide ────────────────────────────────────
  function showCG(src) {
    if (!cgEl) return;
    if (!src) { hideCG(); return; }

    cgEl.classList.remove('cg-visible');
    cgEl.style.transform = '';

    const img = new Image();
    img.onload = () => {
      cgEl.src = src;
      // Allow browser to paint, then animate
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          cgEl.classList.add('cg-visible', 'cg-parallax');
        });
      });
    };
    img.onerror = () => {
      // If real image not found, use our canvas placeholder
      cgEl.src = generatePlaceholder(src);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          cgEl.classList.add('cg-visible', 'cg-parallax');
        });
      });
    };
    img.src = src;
  }

  function hideCG() {
    if (!cgEl) return;
    cgEl.classList.remove('cg-visible', 'cg-parallax');
    cgEl.style.transform = '';
    setTimeout(() => { if (!cgEl.classList.contains('cg-visible')) cgEl.src = ''; }, 1000);
  }

  // ─── Generate canvas placeholder when image missing ────
  function generatePlaceholder(src) {
    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 1280;
    const ctx = canvas.getContext('2d');

    // Map CG name to color palette + description
    const cgInfo = {
      'cg1': { colors: ['#1a0020', '#2d0840', '#e8a0bf', '#f5d0e8'], label: 'Остановка 75 · Теплодар' },
      'cg2': { colors: ['#0d0830', '#1a1050', '#b0a0ff', '#e8d8ff'], label: 'Внутри маршрутки · Гена' },
      'cg3': { colors: ['#1a1008', '#2d2010', '#f0c060', '#ffe8b0'], label: 'Одесса · Перед встречей' },
      'cg4': { colors: ['#040010', '#0d0825', '#8060c0', '#c0b0f0'], label: 'Сон · Ночной город' },
      'cg5': { colors: ['#0e0a05', '#1e1408', '#f0b060', '#ffd890'], label: 'Квартира · Открытая дверь' },
      'cg6': { colors: ['#100808', '#201010', '#ff9080', '#ffd0b0'], label: 'Стол · Бульдак и персик' },
      'cg7': { colors: ['#150308', '#280508', '#ff7060', '#ffb090'], label: 'Бульдак · Очень остро' },
      'cg8': { colors: ['#080612', '#10101c', '#9090d0', '#d0d0ff'], label: 'Диван · Вечер' },
      'cg9': { colors: ['#060a0f', '#0e1820', '#60c0d0', '#b0e8ff'], label: 'Вместе' },
    };

    // Determine which CG from src
    const match = src.match(/cg(\d)/);
    const key = match ? `cg${match[1]}` : 'cg1';
    const info = cgInfo[key] || cgInfo['cg1'];
    const colors = info.colors;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 1280);
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(1, colors[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 720, 1280);

    // Atmospheric glow
    const radGrad = ctx.createRadialGradient(360, 700, 40, 360, 640, 550);
    radGrad.addColorStop(0, colors[2] + '50');
    radGrad.addColorStop(0.6, colors[2] + '15');
    radGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, 720, 1280);

    // Second atmospheric glow top
    const radGrad2 = ctx.createRadialGradient(360, 200, 20, 360, 300, 300);
    radGrad2.addColorStop(0, colors[3] + '30');
    radGrad2.addColorStop(1, 'transparent');
    ctx.fillStyle = radGrad2;
    ctx.fillRect(0, 0, 720, 1280);

    // Stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 80; i++) {
      const sx = Math.random() * 720;
      const sy = Math.random() * 900;
      const sr = Math.random() * 1.8 + 0.3;
      ctx.globalAlpha = Math.random() * 0.7 + 0.15;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Silhouette figure (simple)
    const figX = 360, figY = 900;
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.ellipse(figX, figY - 120, 55, 140, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(figX, figY - 280, 42, 0, Math.PI * 2);
    ctx.fill();

    // Bottom gradient overlay
    const bottomGrad = ctx.createLinearGradient(0, 1000, 0, 1280);
    bottomGrad.addColorStop(0, 'transparent');
    bottomGrad.addColorStop(1, 'rgba(0,0,0,0.7)');
    ctx.fillStyle = bottomGrad;
    ctx.fillRect(0, 0, 720, 1280);

    // Decorative horizontal line
    ctx.strokeStyle = colors[2] + '40';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 1140);
    ctx.lineTo(660, 1140);
    ctx.stroke();

    // Label text
    ctx.fillStyle = colors[2] + 'cc';
    ctx.font = 'italic 300 20px serif';
    ctx.textAlign = 'center';
    ctx.fillText(info.label, 360, 1170);
    ctx.font = '300 13px sans-serif';
    ctx.fillStyle = '#ffffff40';
    ctx.fillText('Добавь изображение: assets/images/' + key + '.png', 360, 1210);

    return canvas.toDataURL('image/png');
  }

  // ─── Background setter ─────────────────────────────────
  function setBackground(className, imageSrc) {
    if (!parallaxTarget) return;
    // Remove all bg- classes
    [...parallaxTarget.classList].forEach(c => {
      if (c.startsWith('bg-')) parallaxTarget.classList.remove(c);
    });
    if (className) parallaxTarget.classList.add(className);
    if (imageSrc) {
      parallaxTarget.style.backgroundImage = `url(${imageSrc})`;
    } else {
      parallaxTarget.style.backgroundImage = '';
    }
  }

  // ─── Stars canvas background ───────────────────────────
  function initStars() {
    const canvas = document.createElement('canvas');
    canvas.id = 'stars-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.insertBefore(canvas, document.body.firstChild);
    starsCtx = canvas.getContext('2d');
    createStars();
    animateStars();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    });
  }

  function createStars() {
    starsArray = [];
    const count = Math.floor((window.innerWidth * window.innerHeight) / 8000);
    for (let i = 0; i < count; i++) {
      starsArray.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.7 + 0.1,
        speed: Math.random() * 0.3 + 0.05,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }

  function animateStars() {
    if (!starsCtx) return;
    const canvas = starsCtx.canvas;
    starsCtx.clearRect(0, 0, canvas.width, canvas.height);
    const t = performance.now() / 1000;

    starsArray.forEach(s => {
      const a = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed + s.pulse));
      starsCtx.globalAlpha = a;
      starsCtx.fillStyle = '#e8d0ff';
      starsCtx.beginPath();
      starsCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      starsCtx.fill();
    });
    starsCtx.globalAlpha = 1;
    requestAnimationFrame(animateStars);
  }

  // ─── Chapter title reveal ──────────────────────────────
  function showChapterTitle(num, name) {
    return new Promise(resolve => {
      const card = document.createElement('div');
      card.className = 'chapter-title-card';
      card.innerHTML = `
        <span class="chapter-num" style="opacity:0;transition:opacity 0.5s 0.2s">Глава ${num}</span>
        <span class="chapter-line" style="opacity:0;transition:opacity 0.5s 0.5s"></span>
        <span class="chapter-name" style="opacity:0;transition:opacity 0.8s 0.4s">${name}</span>
      `;
      document.getElementById('game-screen').appendChild(card);

      requestAnimationFrame(() => {
        card.querySelectorAll('span').forEach(el => el.style.opacity = '1');
      });

      setTimeout(() => {
        card.style.transition = 'opacity 0.6s';
        card.style.opacity = '0';
        setTimeout(() => { card.remove(); resolve(); }, 600);
      }, 2000);
    });
  }

  // ─── Particle burst (on choice select) ────────────────
  function burstParticles(x, y, color = '#e8a0bf') {
    const screen = document.getElementById('game-screen');
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${x}px; top: ${y}px;
        background: ${color};
        --dx: ${(Math.random() - 0.5) * 60}px;
        animation-delay: ${Math.random() * 0.2}s;
        animation-duration: ${0.8 + Math.random() * 0.6}s;
      `;
      screen.appendChild(p);
      setTimeout(() => p.remove(), 1500);
    }
  }

  return {
    init,
    fadeToBlack,
    fadeFromBlack,
    showCG,
    hideCG,
    setBackground,
    showChapterTitle,
    burstParticles,
    generatePlaceholder,
  };
})();
