# Маршрут 75 — Visual Novel Game

Интерактивная визуальная новелла, вдохновлённая атмосферой «Клуба Романтики».

## Структура файлов

```
├── index.html              # Точка входа
├── css/
│   ├── main.css            # Дизайн-система, переменные
│   ├── animations.css      # Все анимации и keyframes
│   ├── game.css            # Игровой экран, фоны, CG
│   ├── dialogue.css        # Панель диалога
│   ├── choices.css         # Кнопки выбора, тосты
│   └── ui.css              # Меню, настройки, достижения
├── js/
│   ├── saveSystem.js       # localStorage сохранения
│   ├── animationSystem.js  # Параллакс, переходы, звёзды
│   ├── dialogueSystem.js   # Посимвольный вывод текста
│   ├── choiceSystem.js     # Логика выборов, очки, тосты
│   ├── sceneManager.js     # Управление сценами
│   ├── ui.js               # UI контроллер
│   ├── scenes.js           # 📝 ВСЕ ДАННЫЕ СЦЕН (редактируй здесь)
│   └── engine.js           # Главный контроллер
└── assets/
    ├── images/
    │   ├── cg1.png … cg9.png   # ← Добавь свои изображения сюда
    └── audio/
        └── bg.mp3               # ← Добавь фоновую музыку сюда
```

## Как добавить изображения

Положи файлы `cg1.png` … `cg9.png` в папку `assets/images/`.  
Игра автоматически подхватит их. До этого показываются красивые цветные заглушки.

## Как добавить музыку

1. Положи файл `bg.mp3` (или `.ogg`, `.wav`) в `assets/audio/`
2. В `engine.js` найди функцию `boot()` и добавь:
```js
const audio = document.getElementById('audio-bg');
audio.src = 'assets/audio/bg.mp3';
audio.play().catch(() => {});
```

## Как добавить новые сцены

Открой `js/scenes.js` и добавь объект в массив `SCENES`:

```js
{
  id: 'my_new_scene',
  type: 'scene',
  background: 'bg-apartment',   // CSS класс фона
  cg: 'cg1.png',                // null если нет CG
  chapter: 'Глава VII',
  dialogues: [
    { text: 'Нарративный текст.', narration: true },
    { speaker: 'Имя', text: 'Диалог персонажа.' },
  ],
  choices: [
    {
      text: '❤️ Вариант 1',
      effects: { lovePoints: 1 },
      next: 'next_scene_id',
    },
  ],
}
```

## Как изменить ссылку награды (Telegram)

В `js/engine.js` найди:
```js
const REWARD_URL = 'https://t.me/';
```
Замени на свою ссылку.

## Система очков

| Очко         | Как набрать                                    |
|--------------|------------------------------------------------|
| ❤️ Тепло    | Выборы, связанные с близостью и эмоциями       |
| ✨ Судьба   | Наблюдательность и доверие к знакам            |

**Secret Ending**: Тепло ≥ 5 + Судьба ≥ 3 → 🏆 «Лучший понедельник»

---

*Сделано с ❤️ как личный подарок*
