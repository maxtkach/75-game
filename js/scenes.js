/* ═══════════════════════════════════════════════════════
   SCENES.JS  —  Маршрут 75
   Одесса — Теплодар — Одесса
   ═══════════════════════════════════════════════════════ */

const SCENES = [

  /* ═══════════════════════════════════════
     ПРОЛОГ
     ═══════════════════════════════════════ */
  {
    id: 'prologue',
    type: 'prologue',
    background: 'bg-prologue',
    cg: null,
    chapter: '',
    prologueLines: [
      { text: 'Одесса. Пятница.' },
      { text: 'Завтра маршрутка домой, в Теплодар.' },
      { text: 'А в понедельник обратно. И кое-что интересное.', accent: false },
      { text: '- Маршрут 75 -', accent: true },
    ],
    showStartBtn: true,
    next: 'ch1_friday',
  },

  /* ═══════════════════════════════════════
     ГЛАВА 1. Пятница. Одесса. Дом.
     ═══════════════════════════════════════ */
  {
    id: 'ch1_friday',
    type: 'scene',
    background: 'bg-home-evening',
    cg: 'cg1.png',
    chapter: 'Пятница · Одесса',
    showChapterCard: true,
    chapterNum: 'I',
    chapterName: 'Пятница вечером',
    dialogues: [
      { text: 'Пятница. Одесса. Дома тепло и знакомо.', narration: true },
      { text: 'Из папиной комнаты доносится Майкл Джексон. Это значит папа в хорошем настроении.', narration: true },
      { text: 'Бабуля гремит чем-то на кухне. Классика.', narration: true },
      { text: 'Лерка лежит на диване и смотрит в потолок.', narration: true },
      { text: 'Завтра маршрутка. Теплодар. Родительский дом, тишина, мамина еда.', narration: true },
      { text: 'Телефон вибрирует.', narration: true },
      { speaker: 'Максон', text: 'Слушай, ты в понедельник когда приедешь? Заходи, хочу Бульдак попробовать.' },
      { text: 'Бульдак. Это была её идея, кстати. Неделю назад предложила.', narration: true },
      { text: 'Максон не забыл. Это в его стиле.', narration: true },
      { text: 'И вообще-то она ни разу у него не была. Интересно как там.', narration: true },
    ],
    choices: [
      {
        text: '"ГАЗ!"',
        effects: { lovePoints: 1 },
        next: 'ch1_reply_yes',
      },
      {
        text: '"Ты реально купил Бульдак?"',
        effects: { fatePoints: 1 },
        next: 'ch1_reply_funny',
      },
      {
        text: '"Нет."',
        effects: {},
        next: 'ch1_reply_no',
      },
    ],
  },

  {
    id: 'ch1_reply_no',
    type: 'scene',
    background: 'bg-home-evening',
    cg: 'cg1.png',
    chapter: 'Пятница · Одесса',
    dialogues: [
      { text: 'Три секунды тишины.', narration: true },
      { speaker: 'Максон', text: 'Хорошо.' },
      { text: 'Ещё три секунды.', narration: true },
      { speaker: 'Максон', text: 'Я всё равно куплю Бульдак.' },
      { speaker: 'Лерка', text: 'Хорошо.' },
      { speaker: 'Максон', text: 'Ты придёшь.' },
      { text: 'Это не вопрос.', narration: true },
      { text: 'Лерка смотрит в потолок. Из папиной комнаты Smooth Criminal.', narration: true },
      { speaker: 'Лерка', text: 'Ладно.' },
    ],
    next: 'ch1_pack',
  },

  {
    id: 'ch1_reply_yes',
    type: 'scene',
    background: 'bg-home-evening',
    cg: 'cg1.png',
    chapter: 'Пятница · Одесса',
    dialogues: [
      { speaker: 'Максон', text: 'Отлично. Жду.' },
      { text: 'Лерка смотрит в потолок. Из папиной комнаты Smooth Criminal.', narration: true },
      { text: 'Она встаёт и начинает собирать сумку в Теплодар.', narration: true },
    ],
    next: 'ch1_pack',
  },

  {
    id: 'ch1_reply_funny',
    type: 'scene',
    background: 'bg-home-evening',
    cg: 'cg1.png',
    chapter: 'Пятница · Одесса',
    dialogues: [
      { speaker: 'Максон', text: 'Ещё нет. Но куплю. Это же твоя идея была.' },
      { speaker: 'Лерка', text: 'Логично.' },
      { speaker: 'Максон', text: 'Ты придёшь или нет?' },
      { text: 'Из папиной комнаты слышно Beat It. Значит, танцует.', narration: true },
      { speaker: 'Лерка', text: 'Приду.' },
    ],
    next: 'ch1_pack',
  },

  {
    id: 'ch1_pack',
    type: 'scene',
    background: 'bg-home-evening',
    cg: 'cg1.png',
    chapter: 'Пятница · Одесса',
    dialogues: [
      { text: 'Сумка собрана. Завтра рано вставать.', narration: true },
      { text: 'Бабуля заглядывает в дверь.', narration: true },
      { speaker: 'Бабуля', text: 'Поела?' },
      { speaker: 'Лерка', text: 'Поела, ба.' },
      { speaker: 'Бабуля', text: 'Там ещё есть. Возьми с собой.' },
      { text: 'Она уже уходит, не слушая ответа. Риторический вопрос.', narration: true },
      { text: 'Лерка смотрит в окно. Одесса шумит внизу. Далеко, на другом конце города, кто-то, видимо, уже купил Бульдак.', narration: true },
      { text: 'Завтра Теплодар. Послезавтра воскресенье. А потом понедельник.', narration: true },
    ],
    next: 'ch2_saturday_morning',
  },

  /* ═══════════════════════════════════════
     ГЛАВА 2. Суббота. Маршрут 75. Гена.
     ═══════════════════════════════════════ */
  {
    id: 'ch2_saturday_morning',
    type: 'scene',
    background: 'bg-bus-stop',
    cg: 'cg2.png',
    chapter: 'Суббота · Маршрут 75',
    showChapterCard: true,
    chapterNum: 'II',
    chapterName: 'Суббота, 8:31',
    dialogues: [
      { text: 'Суббота. 8:31. Опоздала на минуту. Личный рекорд.', narration: true },
      { text: 'Остановка. Солнце уже жарит. Кофе в руке ещё горячий. Несправедливо.', narration: true },
      { text: 'Маршрутка с цифрой "75" тормозит у бордюра. Двери скрипят.', narration: true },
      { speaker: 'Водитель', text: 'В Теплодар? Заходим, не ждём.' },
    ],
    choices: [
      {
        text: '🪟 Сесть у окна',
        effects: { fatePoints: 1 },
        next: 'ch2_gena',
      },
      {
        text: '🪑 В середину',
        effects: { lovePoints: 1 },
        next: 'ch2_gena',
      },
      {
        text: '🚪 Ближе к выходу',
        effects: {},
        next: 'ch2_gena',
      },
    ],
  },

  {
    id: 'ch2_gena',
    type: 'scene',
    background: 'bg-route-inside',
    cg: 'cg3.png',
    chapter: 'Суббота · Маршрут 75',
    dialogues: [
      { text: 'Маршрутка трогается. За окном пригород, поля, пыльная зелень.', narration: true },
      { text: 'У дальнего окна сидит мужчина. Лет пятидесяти с чем-то.', narration: true },
      { text: 'Пальто несмотря на июль. Пакет семечек. Взгляд человека, который всё понял.', narration: true },
      { text: 'Лерка не знала как его зовут. Но выглядел он как Гена. Очень.', narration: true },
      { speaker: 'Гена', text: 'В Теплодар едешь?' },
    ],
    choices: [
      {
        text: '"Да, домой"',
        effects: { lovePoints: 1 },
        next: 'ch2_gena_yes',
      },
      {
        text: '"меня прикалывает кататься и нюхать потных бомжей"',
        effects: { lovePoints: 1 },
        next: 'ch2_gena_joke',
      },
      {
        text: '"Нет."',
        effects: { fatePoints: 1 },
        next: 'ch2_gena_no',
      },
    ],
  },

  {
    id: 'ch2_gena_no',
    type: 'scene',
    background: 'bg-route-inside',
    cg: 'cg3.png',
    chapter: 'Суббота · Маршрут 75',
    dialogues: [
      { text: 'Гена смотрит на неё.', narration: true },
      { text: 'Потом смотрит на табличку над лобовым стеклом. "Теплодар".', narration: true },
      { text: 'Потом снова на неё.', narration: true },
      { text: 'Кивает.', narration: true },
      { speaker: 'Гена', text: 'Понятно.' },
      { text: 'Хруст семечек. Больше вопросов не задаёт.', narration: true },
      { text: 'Уважает выбор человека.', narration: true },
    ],
    next: 'ch2_gena_end',
  },

  {
    id: 'ch2_gena_yes',
    type: 'scene',
    background: 'bg-route-inside',
    cg: 'cg3.png',
    chapter: 'Суббота · Маршрут 75',
    dialogues: [
      { speaker: 'Гена', text: 'Хорошее дело. Домой надо ездить.' },
      { text: 'Он кивает так, будто записал это в важный реестр.', narration: true },
      { speaker: 'Гена', text: 'У меня тут брат. Говорит спокойнее. Я не верю. Но проверяю.' },
      { text: 'Хруст семечек. Пауза.', narration: true },
      { speaker: 'Гена', text: 'Тебя там ждут?' },
      { speaker: 'Лерка', text: 'Родители.' },
      { speaker: 'Гена', text: 'Это хорошо. Значит точно приедешь.' },
      { text: 'Он протягивает стакан с семечками. Лерка вежливо отказывается. Он понимает. Это нормально.', narration: true },
    ],
    next: 'ch2_gena_end',
  },

  {
    id: 'ch2_gena_joke',
    type: 'scene',
    background: 'bg-route-inside',
    cg: 'cg3.png',
    chapter: 'Суббота · Маршрут 75',
    dialogues: [
      { text: 'Гена смотрит на неё. Потом начинает смеяться. Громко и совершенно искренне.', narration: true },
      { speaker: 'Гена', text: 'Хааа! Хорошая! С юмором!' },
      { text: 'Он хлопает ладонью по колену с видом человека, которого давно так не радовали.', narration: true },
      { speaker: 'Гена', text: 'Я сам такой. Куда ни сяду, всегда оказывается куда надо.' },
      { text: 'Хруст семечек. Пауза.', narration: true },
      { speaker: 'Гена', text: 'Как тебя зовут-то?' },
      { speaker: 'Лерка', text: 'Лена.' },
      { speaker: 'Гена', text: 'Лера. Хорошее имя. Будет хорошая поездка, Лена. Гена чувствует.' },
      { text: 'Лерка почему-то верит Гене.', narration: true },
    ],
    next: 'ch2_gena_end',
  },

  {
    id: 'ch2_gena_end',
    type: 'scene',
    background: 'bg-route-inside',
    cg: 'cg3.png',
    chapter: 'Суббота · Маршрут 75',
    dialogues: [
      { text: 'Маршрутка едет. За окном ничего особенного, поля и пыльные деревья.', narration: true },
      { text: 'Лерка смотрит в окно. Потом вниз.', narration: true },
      { text: 'На сиденье рядом с ней лежит маленький плюшевый медведь.', narration: true },
      { text: 'Потрёпанный. Одно ухо чуть больше другого. На шее значок с цифрой "75".', narration: true },
      { text: 'Откуда он здесь?', narration: true },
    ],
    choices: [
      {
        text: '🧸 Взять. Тёплый(хорошо хоть не холодный как 2 часа), как будто его только держали.',
        effects: { lovePoints: 1 },
        next: 'ch2_bear_take',
      },
      {
        text: '🔍 Осмотреть. Может, есть записка?',
        effects: { fatePoints: 1 },
        next: 'ch2_bear_look',
      },
      {
        text: '"Нет." и отвернуться к окну.',
        effects: {},
        next: 'ch2_bear_no',
      },
    ],
  },

  {
    id: 'ch2_bear_take',
    type: 'scene',
    background: 'bg-route-inside',
    cg: 'cg3.png',
    chapter: 'Суббота · Маршрут 75',
    dialogues: [
      { text: 'Лерка берёт медведя. Тёплый. Действительно тёплый.', narration: true },
      { text: 'Гена смотрит на неё, потом на медведя.', narration: true },
      { speaker: 'Гена', text: 'Хорошая примета. Найти мишку в дороге.' },
      { text: 'Маршрутка тормозит. Теплодар. Конечная.', narration: true },
      { text: 'Лерка встаёт, оглядывается попрощаться с Геной.', narration: true },
      { text: 'Его место пусто.', narration: true },
      { text: 'Медведя в руках тоже нет. Только тепло осталось.', narration: true },
      { text: 'Водитель открывает двери. Никакого комментария.', narration: true },
    ],
    next: 'ch3_teplodar',
  },

  {
    id: 'ch2_bear_look',
    type: 'scene',
    background: 'bg-route-inside',
    cg: 'cg3.png',
    chapter: 'Суббота · Маршрут 75',
    dialogues: [
      { text: 'Лерка поднимает медведя и осматривает. На значке "75" и что-то мелкое.', narration: true },
      { text: 'Она щурится. Написано: "Иногда правильный маршрут не тот, что ближе."', narration: true },
      { speaker: 'Гена', text: 'Что там?' },
      { speaker: 'Лерка', text: 'Философия на медведе.' },
      { speaker: 'Гена', text: 'Хм. У меня на пальто написано "Магнит". Тоже философия.' },
      { text: 'Маршрутка тормозит. Теплодар. Лерка моргает.', narration: true },
      { text: 'Медведь исчез. Значок остался у неё в ладони.', narration: true },
      { text: 'Место Гены пусто.', narration: true },
    ],
    next: 'ch3_teplodar',
  },

  {
    id: 'ch2_bear_no',
    type: 'scene',
    background: 'bg-route-inside',
    cg: 'cg3.png',
    chapter: 'Суббота · Маршрут 75',
    dialogues: [
      { text: 'Лерка смотрит в окно. Медведь пусть сам разбирается.', narration: true },
      { speaker: 'Гена', text: 'Зря. Хороший мишка.' },
      { text: 'Маршрутка тормозит. Теплодар.', narration: true },
      { text: 'Лерка встаёт. Оглядывается. Сиденье рядом пустое. Медведя нет.', narration: true },
      { text: 'Место Гены тоже пустое.', narration: true },
      { text: 'Водитель делает вид, что ничего не было.', narration: true },
    ],
    next: 'ch3_teplodar',
  },

  /* ═══════════════════════════════════════
     ГЛАВА 3. Теплодар. Дом. Выходные.
     ═══════════════════════════════════════ */
  {
    id: 'ch3_teplodar',
    type: 'scene',
    background: 'bg-home-evening',
    cg: 'cg4.png',
    chapter: 'Суббота-Воскресенье · Теплодар',
    showChapterCard: true,
    chapterNum: 'III',
    chapterName: 'Теплодар. Дома.',
    dialogues: [
      { text: 'Родительский дом. Запах маминой кухни ещё с калитки.', narration: true },
      { text: 'Собака бежит навстречу. Папа машет с крыльца.', narration: true },
      { text: 'Мама уже кричит что-то про обед.', narration: true },
      { text: 'Всё как всегда. Хорошее "как всегда".', narration: true },
      { text: 'Суббота уходит на разговоры и огород. Воскресенье медленнее.', narration: true },
      { text: 'Вечером Лерка бродит по двору и думает: надо привезти Максу что-нибудь отсюда.', narration: true },
      { text: 'Что-то маленькое. Своё. Оттуда. Раз уже едешь в такую даль.', narration: true },
    ],
    choices: [
      {
        text: 'Штучка которая напоминает о Теплике',
        effects: { lovePoints: 1 },
        itemKey: 'magnet',
        next: 'ch3_item_chosen',
      },
      {
        text: 'Сделать фото которое потом распечатаешь и подаришь Максу',
        effects: { lovePoints: 1 },
        itemKey: 'peach',
        next: 'ch3_item_chosen',
      },
      {
        text: 'Камушек из двора',
        effects: { fatePoints: 1 },
        itemKey: 'stone',
        next: 'ch3_item_chosen',
      },
      {
        text: 'Веточку из маминого сада',
        effects: { fatePoints: 1 },
        itemKey: 'branch',
        next: 'ch3_item_chosen',
      },
      {
        text: '"Нет." Ничего не везти.',
        effects: {},
        itemKey: 'nothing',
        next: 'ch3_item_nothing',
      },
    ],
  },

  {
    id: 'ch3_item_nothing',
    type: 'scene',
    background: 'bg-home-evening',
    cg: 'cg4.png',
    chapter: 'Суббота-Воскресенье · Теплодар',
    dialogues: [
      { text: 'Нет. Зачем везти что-то. Это просто поездка.', narration: true },
      { text: 'Лерка идёт домой. Укладывается спать.', narration: true },
      { text: 'В 2 ночи встаёт. Идёт во двор. Кладёт в карман маленький камушек.', narration: true },
      { text: 'Возвращается. Ложится.', narration: true },
      { text: 'Ничего не произошло.', narration: true },
    ],
    next: 'ch3_sunday_msg',
  },

  {
    id: 'ch3_item_chosen',
    type: 'scene',
    background: 'bg-home-evening',
    cg: 'cg4.png',
    chapter: 'Суббота-Воскресенье · Теплодар',
    dialogues: [
      { text: 'Лерка кладёт выбранное в боковой карман сумки. Аккуратно.', narration: true },
      { text: 'Маленький жест. Такие почему-то запоминаются лучше больших.', narration: true },
    ],
    next: 'ch3_sunday_msg',
  },

  {
    id: 'ch3_sunday_msg',
    type: 'scene',
    background: 'bg-home-evening',
    cg: 'cg4.png',
    chapter: 'Суббота-Воскресенье · Теплодар',
    dialogues: [
      { text: 'Воскресный вечер. Мама даёт контейнер с едой. "Немного, просто так."', narration: true },
      { text: 'Контейнер весит полкило. Мамино "немного".', narration: true },
      { text: 'Приходит сообщение.', narration: true },
      { speaker: 'Максон', text: 'Завтра точно? Я купил Бульдак. Сырный.' },
      { text: 'Сырный. Лерка любит сыр.', narration: true },
    ],
    choices: [
      {
        text: '"Точно. Буду."',
        effects: { lovePoints: 1 },
        next: 'ch3_sunday_end',
      },
      {
        text: '"Сырный?? Внатуре?"',
        effects: { fatePoints: 1 },
        next: 'ch3_sunday_cheese',
      },
      {
        text: '"Нет."',
        effects: {},
        next: 'ch3_sunday_no',
      },
    ],
  },

  {
    id: 'ch3_sunday_no',
    type: 'scene',
    background: 'bg-home-evening',
    cg: 'cg4.png',
    chapter: 'Суббота-Воскресенье · Теплодар',
    dialogues: [
      { text: 'Долгая пауза.', narration: true },
      { speaker: 'Максон', text: 'Окей.' },
      { text: 'Ещё одна пауза.', narration: true },
      { speaker: 'Максон', text: 'Я на всякий случай персиковый сок тоже купил.' },
      { text: 'Лерка смотрит в теплодарское небо.', narration: true },
      { speaker: 'Лерка', text: 'Буду в 12.' },
      { speaker: 'Максон', text: 'Хорошо.' },
    ],
    next: 'ch3_sunday_end',
  },

  {
    id: 'ch3_sunday_cheese',
    type: 'scene',
    background: 'bg-home-evening',
    cg: 'cg4.png',
    chapter: 'Суббота-Воскресенье · Теплодар',
    dialogues: [
      { speaker: 'Максон', text: 'Ты сказала "что-нибудь интересное". Сырный интересное.' },
      { speaker: 'Лерка', text: 'еще и любимое!' },
      { speaker: 'Максон', text: 'Еще и возможно вкусное. Узнаем.' },
      { text: 'Лерка вспоминает что собиралась сказать "нет". Поздно.', narration: true },
      { speaker: 'Максон', text: 'Персиковый сок тоже купил. Для баланса.' },
      { text: 'Это он молодец.', narration: true },
    ],
    next: 'ch3_sunday_end',
  },

  {
    id: 'ch3_sunday_end',
    type: 'scene',
    background: 'bg-home-evening',
    cg: 'cg4.png',
    chapter: 'Суббота-Воскресенье · Теплодар',
    dialogues: [
      { text: 'Теплодарский вечер стрекочет цикадами. Собака дремлет рядом.', narration: true },
      { text: 'Завтра маршрутка обратно. Одесса. Папа. Бабуля.', narration: true },
      { text: 'И Макс с его сырным Бульдаком. И персиковый сок. Это он предусмотрел.', narration: true },
      { text: 'Через весь город пилить, конечно.', narration: true },
      { text: 'Но Бульдак была её идея. Значит, надо.', narration: true },
    ],
    next: 'ch4_monday',
  },

  /* ═══════════════════════════════════════
     ГЛАВА 4. Понедельник. Обратно.
     ═══════════════════════════════════════ */
  {
    id: 'ch4_monday',
    type: 'scene',
    background: 'bg-bus-stop',
    cg: 'cg5.png',
    chapter: 'Понедельник · Обратно',
    showChapterCard: true,
    chapterNum: 'IV',
    chapterName: 'Понедельник, 9:05',
    dialogues: [
      { text: 'Понедельник. Теплодар провожает жарой.', narration: true },
      { text: 'Мама вышла проводить. Смотрит как Лерка садится в маршрутку.', narration: true },
      { text: 'Контейнер с едой в рюкзаке. В боковом кармане кое-что из Теплодара.', narration: true },
      { text: 'Маршрутка 75. Одесса. Поехали.', narration: true },
      { text: 'Лерка смотрит в окно. Теплодар уплывает назад.', narration: true },
      { text: 'Гены сегодня нет. Место у дальнего окна занято кем-то с наушниками. Обычный человек. Без семечек.', narration: true },
      { text: 'Пусто как-то без него.', narration: true },
    ],
    next: 'ch4_odessa_home',
  },

  {
    id: 'ch4_odessa_home',
    type: 'scene',
    background: 'bg-apartment',
    cg: null,
    chapter: 'Понедельник · Одесса',
    dialogues: [
      { text: 'Одесса. Их дом. Знакомая калитка.', narration: true },
      { text: 'Из папиной комнаты Thriller. Значит дома и в хорошем настроении.', narration: true },
      { speaker: 'Папа', text: 'О, Лерка! Как там мама? Дала поесть?' },
      { speaker: 'Лерка', text: 'Контейнер.' },
      { speaker: 'Папа', text: 'Значит, любит. Чай будешь?' },
      { text: 'Бабуля уже несёт чай, не дожидаясь ответа.', narration: true },
      { text: 'Они сидят на кухне. Чай, разговоры, бабулины истории про соседей.', narration: true },
      { text: 'Хорошо. Потом телефон.', narration: true },
      { speaker: 'Максон', text: 'Ну что, сегодня?' },
    ],
    choices: [
      {
        text: '"ГАЗГАЗГАЗ!"',
        effects: { lovePoints: 1 },
        next: 'ch4_going_choice',
      },
      {
        text: '"Иду. Только в Макдокнак заскочу"',
        effects: { lovePoints: 1 },
        next: 'ch4_mcdonald',
      },
      {
        text: '"Нет."',
        effects: { fatePoints: 1 },
        next: 'ch4_reply_no',
      },
    ],
  },

  {
    id: 'ch4_reply_no',
    type: 'scene',
    background: 'bg-apartment',
    cg: null,
    chapter: 'Понедельник · Одесса',
    dialogues: [
      { text: 'Пауза.', narration: true },
      { speaker: 'Максон', text: 'Ладно.' },
      { text: 'Ещё пауза.', narration: true },
      { speaker: 'Максон', text: 'Бульдак уже на плите.' },
      { text: 'Лерка смотрит на бабулю. Бабуля подливает ей чай.', narration: true },
      { speaker: 'Лерка', text: 'Буду через час. Это было "нет" плите, не тебе.' },
      { speaker: 'Максон', text: 'Принято.' },
    ],
    next: 'ch4_going_choice',
  },

  {
    id: 'ch4_mcdonald',
    type: 'scene',
    background: 'bg-morning',
    cg: null,
    chapter: 'Понедельник · По дороге',
    dialogues: [
      { text: 'Макдак по пути. Запах картошки. Лерка сразу слабее.', narration: true },
      { speaker: 'Кассир', text: 'Добрый день, что будете?' },
      { speaker: 'Лерка', text: 'Чикенврот, пожалуйста.' },
      { text: 'Кассир моргает.', narration: true },
      { speaker: 'Кассир', text: '...Чикен-ролл?' },
      { speaker: 'Лерка', text: 'Да. Его.' },
      { text: 'Кассир всё понял. Это происходит не первый раз. У людей с чикенвротом особый взгляд.', narration: true },
      { text: 'Чикенврот куплен. Идём.', narration: true },
    ],
    next: 'ch4_going_choice',
  },

  {
    id: 'ch4_going_choice',
    type: 'scene',
    background: 'bg-morning',
    cg: null,
    chapter: 'Понедельник · По дороге',
    dialogues: [
      { text: 'Маршрутка до его района. Потом пешком.', narration: true },
      { text: 'Далеко, конечно. Через весь город почти.', narration: true },
      { text: 'Лерка едет и думает: Бульдак была её идея. Значит, если будет очень остро, это технически её вина.', narration: true },
      { text: 'Она думает об этом спокойно.', narration: true },
      { text: 'Нужный дом. Пять этажей.', narration: true },
      { text: 'Лифт, кажется, работает.', narration: true },
    ],
    choices: [
      {
        text: 'Пешком. Пять этажей это нормально.',
        effects: { lovePoints: 1 },
        next: 'ch5_door',
      },
      {
        text: 'Пошутил, лифта нет',
        effects: {},
        next: 'ch5_door',
      },
    ],
  },

  /* ═══════════════════════════════════════
     ГЛАВА 5. Пятый этаж. Первый раз.
     ═══════════════════════════════════════ */
  {
    id: 'ch5_door',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg6.png',
    chapter: 'Понедельник · Первый раз здесь',
    showChapterCard: true,
    chapterNum: 'V',
    chapterName: 'Пятый этаж',
    dialogues: [
      { text: 'Пятый этаж. Коридор.', narration: true },
      { text: 'Лерка останавливается перед дверью.', narration: true },
      { text: 'Она вообще-то ни разу тут не была. Интересно как там.', narration: true },
      { text: 'За дверью что-то пахнет. Хорошо пахнет. Или это с соседней квартиры.', narration: true },
      { text: 'Достаёт из бокового кармана сумки сувенир из Теплодара.', narration: true },
      { text: 'Смотрит на него секунду. Убирает обратно. Отдаст внутри.', narration: true },
      { text: 'Звонит.', narration: true },
      { text: 'Шаги. Дверь открывается.', narration: true },
      { speaker: 'Макс', text: 'О, привет. Заходи.' },
      { text: 'Просто. Без лишних слов.', narration: true },
    ],
    next: 'ch5_inside',
  },

  {
    id: 'ch5_inside',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg6.png',
    chapter: 'Понедельник · Первый раз здесь',
    dialogues: [
      { text: 'Внутри. Первый взгляд.', narration: true },
      { text: 'Книги. Ноутбук открытый. Кружка. Провода куда-то.', narration: true },
      { text: 'Всё примерно то, что она себе и представляла, только чуть другое.', narration: true },
      { text: 'На кухонном столе она сразу видит.', narration: true },
      { text: 'Бульдак. Сырный. Красная упаковка с жёлтым.', narration: true },
      { text: 'Рядом большая коробка персикового сока. Холодная, запотевшая.', narration: true },
      { text: 'Лерка смотрит на стол. Потом на Макса.', narration: true },
    ],
    choices: [
      {
        text: '"Ты купил персиковый сок."',
        effects: { lovePoints: 1 },
        next: 'ch5_react_juice',
      },
      {
        text: '"Сырный Бульдак. ГАЗ!"',
        effects: { fatePoints: 1 },
        next: 'ch5_react_cheese',
      },
      {
        text: 'Молча улыбнуться. Всё правильно.',
        effects: { lovePoints: 1 },
        next: 'ch5_react_smile',
      },
    ],
  },

  {
    id: 'ch5_react_juice',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg6.png',
    chapter: 'Понедельник · Первый раз здесь',
    dialogues: [
      { speaker: 'Макс', text: 'Ты любишь персиковый.' },
      { text: 'Без объяснений. Он помнит.', narration: true },
      { text: 'Лерка смотрит на коробку. Потом снова на него.', narration: true },
      { speaker: 'Лерка', text: 'Да. Люблю.' },
      { text: 'ура', narration: true },
      { speaker: 'Макс', text: 'Ну что, готовим?' },
    ],
    next: 'ch5_gift',
  },

  {
    id: 'ch5_react_cheese',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg6.png',
    chapter: 'Понедельник · Первый раз здесь',
    dialogues: [
      { speaker: 'Макс', text: 'Ты сказала "что-нибудь интересное". Сырный интересное.' },
      { speaker: 'Лерка', text: 'Угадал' },
      { speaker: 'Макс', text: 'Это предположительно вкусное. Там сыр.' },
      { text: 'Лерка смотрит на коробку персикового сока.', narration: true },
      { speaker: 'Лерка', text: 'Хорошо что сок есть.' },
      { speaker: 'Макс', text: 'Я знаю что делаю.' },
    ],
    next: 'ch5_gift',
  },

  {
    id: 'ch5_react_smile',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg6.png',
    chapter: 'Понедельник · Первый раз здесь',
    dialogues: [
      { text: 'Лерка просто улыбается. Молча.', narration: true },
      { text: 'Макс смотрит на неё. Тоже молча.', narration: true },
      { text: 'Иногда не надо ничего говорить.', narration: true },
      { speaker: 'Макс', text: 'Ну что, готовим?' },
    ],
    next: 'ch5_gift',
  },

  {
    id: 'ch5_gift',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg6.png',
    chapter: 'Понедельник · Первый раз здесь',
    dialogues: [
      { text: 'Лерка вспоминает. Достаёт из кармана сумки то, что привезла из Теплодара.', narration: true },
      { text: 'Маленькое. Своё. Оттуда.', narration: true },
      { speaker: 'Лерка', text: 'Держи. Из Теплодара привезла.' },
      { text: 'Макс смотрит. Берёт. Молчит секунду.', narration: true },
    ],
    choices: [
      {
        text: '👀 Следить за реакцией',
        effects: { lovePoints: 1 },
        next: 'ch5_gift_reaction',
      },
      {
        text: '"Ну это немного странно, но я реально везла"',
        effects: { lovePoints: 1 },
        next: 'ch5_gift_funny',
      },
    ],
  },

  {
    id: 'ch5_gift_reaction',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg6.png',
    chapter: 'Понедельник · Первый раз здесь',
    dialogues: [
      { speaker: 'Макс', text: 'Ты привезла мне что-то из Теплодара.' },
      { speaker: 'Лерка', text: 'Привезла.' },
      { speaker: 'Макс', text: 'Специально.' },
      { speaker: 'Лерка', text: 'Специально.' },
      { text: 'Он смотрит на это маленькое "оттуда". Убирает к себе.', narration: true },
      { speaker: 'Макс', text: 'Спасибо, Лер.' },
      { text: 'Просто. Достаточно.', narration: true },
    ],
    next: 'ch6_buldak',
  },

  {
    id: 'ch5_gift_funny',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg6.png',
    chapter: 'Понедельник · Первый раз здесь',
    dialogues: [
      { speaker: 'Макс', text: 'Ты реально везла это через весь город.' },
      { speaker: 'Лерка', text: 'Реально.' },
      { speaker: 'Макс', text: 'Ты немного странная.' },
      { speaker: 'Лерка', text: 'Да.' },
      { text: 'Он смеётся тихо но по-настоящему. Убирает подарок к себе.', narration: true },
      { speaker: 'Макс', text: 'Ну что, ХАВАТЬ!!' },
    ],
    next: 'ch6_buldak',
  },

  /* ═══════════════════════════════════════
     ГЛАВА 6. Бульдак. Её идея. Последствия.
     ═══════════════════════════════════════ */
  {
    id: 'ch6_buldak',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg7.png',
    chapter: 'Понедельник · Бульдак',
    showChapterCard: true,
    chapterNum: 'VI',
    chapterName: 'Её идея',
    dialogues: [
      { text: 'Лерка смотрит на пачку Бульдака. Сырный. Красная с жёлтым.', narration: true },
      { speaker: 'Лерка', text: 'Значит это моя идея была.' },
      { speaker: 'Макс', text: 'Твоя. Неделю назад. "Надо попробовать Бульдак, интересно же."' },
      { speaker: 'Лерка', text: 'Я тогда не видела упаковку.' },
      { speaker: 'Макс', text: 'На упаковке написано "огненный". И нарисована курица в огне.' },
      { speaker: 'Лерка', text: 'Достаточно...' },
      { speaker: 'Макс', text: 'Предупредительно.' },
      { text: 'Пауза.', narration: true },
      { speaker: 'Лерка', text: 'Готовим.' },
    ],
    next: 'ch6_cooking',
  },

  {
    id: 'ch6_cooking',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg7.png',
    chapter: 'Понедельник · Бульдак',
    dialogues: [
      { text: 'Кухня. Вода кипит. Пакетик соуса ждёт.', narration: true },
      { speaker: 'Макс', text: 'Тут написано добавить весь соус.' },
      { speaker: 'Лерка', text: 'Добавляй половину.' },
      { speaker: 'Макс', text: 'Трусость.' },
      { speaker: 'Лерка', text: 'Мудрость.' },
      { text: 'Он добавляет весь соус. Лерка наблюдает молча.', narration: true },
      { text: 'Это его выбор. Она предупреждала.', narration: true },
    ],
    next: 'ch6_eating',
  },

  {
    id: 'ch6_eating',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg7.png',
    chapter: 'Понедельник · Бульдак',
    dialogues: [
      { text: 'Первая вилка.', narration: true },
      { text: 'Пауза.', narration: true },
      { text: 'Огонь.', narration: true },
      { speaker: 'Лерка', text: '...О.' },
      { speaker: 'Макс', text: 'Да.' },
      { text: 'Оба молча смотрят в тарелки.', narration: true },
      { speaker: 'Макс', text: 'Это была твоя идея.' },
      { speaker: 'Лерка', text: 'Я помню.' },
      { speaker: 'Макс', text: 'Просто фиксирую.' },
      { text: 'Лерка тянется за персиковым соком. Холодный. Спасительный.', narration: true },
      { text: 'Они едят. Медленно. С достоинством. Персиковый сок убывает быстро.', narration: true },
      { speaker: 'Лерка', text: 'Хорошо что ты купил большую коробку.' },
      { speaker: 'Макс', text: 'Я знал что делаю.' },
    ],
    next: 'ch7_after',
  },

  /* ═══════════════════════════════════════
     ГЛАВА 7. После. Финальный выбор.
     ═══════════════════════════════════════ */
  {
    id: 'ch7_after',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg8.png',
    chapter: 'Понедельник · После',
    showChapterCard: true,
    chapterNum: 'VII',
    chapterName: 'После Бульдака',
    dialogues: [
      { text: 'После Бульдака диван. Единственно правильное решение.', narration: true },
      { text: 'Персиковый сок допит почти. Выжили.', narration: true },
      { speaker: 'Макс', text: 'Ну что. Нормально посидели.' },
      { speaker: 'Лерка', text: 'Нормально.' },
      { text: 'За окном одесский вечер. Тёплый. Немного солёный.', narration: true },
      { text: 'Где-то в Теплодаре мама убирает на кухне. Где-то в маршрутке призрак Гены едет куда надо.', narration: true },
      { text: 'А Лерка здесь. Первый раз здесь. И это нормально.', narration: true },
      { speaker: 'Макс', text: 'Можешь остаться если хочешь. Фильм поставим или поиграем во что.' },
      { text: 'Просто предложение. Без давления.', narration: true },
    ],
    choices: [
      {
        text: 'Остаться. Фильм хорошая идея.',
        effects: { lovePoints: 2 },
        itemKey: 'stay_movie',
        next: 'ch7_stay_movie',
      },
      {
        text: '"Давай лучше сыграем."',
        effects: { lovePoints: 1 },
        itemKey: 'stay_games',
        next: 'ch7_stay_games',
      },
      {
        text: '"Нет." Домой.',
        effects: { fatePoints: 1 },
        itemKey: 'leave',
        next: 'ch7_leave',
      },
    ],
  },

  {
    id: 'ch7_stay_movie',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg9.png',
    chapter: 'Финал',
    dialogues: [
      { text: 'Лерка остаётся. Фильм выбирают долго. Это тоже часть.', narration: true },
      { text: 'В итоге что-то, что ни один из них не смотрел. Честно.', narration: true },
      { text: 'Одесса шумит за окном. Тихо, по-вечернему.', narration: true },
      { text: 'Один понедельник из многих. Но этот хорош.', narration: true },
    ],
    next: 'ending',
  },

  {
    id: 'ch7_stay_games',
    type: 'scene',
    background: 'bg-apartment',
    cg: 'cg9.png',
    chapter: 'Финал',
    dialogues: [
      { text: 'Макс тянется за геймпадами. Два. Будто заранее знал.', narration: true },
      { speaker: 'Макс', text: 'Предупреждаю: не поддаюсь.' },
      { speaker: 'Лерка', text: 'Ты всегда поддаёшься и делаешь вид что нет.' },
      { text: 'Пауза.', narration: true },
      { speaker: 'Макс', text: 'Это неправда.' },
      { text: 'Это правда. Игра начинается. Вечер уходит в счёт и смех.', narration: true },
      { text: 'Понедельник оправдал себя полностью.', narration: true },
    ],
    next: 'ending',
  },

  {
    id: 'ch7_leave',
    type: 'scene',
    background: 'bg-apartment',
    cg: null,
    chapter: 'Финал',
    dialogues: [
      { speaker: 'Макс', text: 'Дойдёшь нормально?' },
      { speaker: 'Лерка', text: 'Нет.' },
      { text: 'Пауза.', narration: true },
      { speaker: 'Лерка', text: 'Шучу. Дойду.' },
      { text: 'Она берёт сумку. Оглядывается на стол. Пустая упаковка Бульдака, почти пустой сок.', narration: true },
      { speaker: 'Макс', text: 'Было нормально.' },
      { speaker: 'Лерка', text: 'Было нормально.' },
      { text: 'Пять этажей вниз. Одесса. Тёплая улица, запах моря.', narration: true },
      { text: 'Хороший понедельник. Бывает иногда.', narration: true },
    ],
    next: 'ending',
  },

  /* ═══════════════════════════════════════
     ENDING
     ═══════════════════════════════════════ */
  {
    id: 'ending',
    type: 'ending',
    background: 'bg-ending-secret',
    cg: null,
    chapter: 'Финал',
  },
];
