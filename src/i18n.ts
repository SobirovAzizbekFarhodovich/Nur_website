import { useEffect, useState } from 'react'

export type Lang = 'uz' | 'uzc' | 'ru' | 'en'
export const LANGS: { id: Lang; short: string; name: string; html: string }[] = [
  { id: 'uz', short: 'UZ', name: "O'zbekcha", html: 'uz-Latn' },
  { id: 'uzc', short: 'ЎЗ', name: 'Ўзбекча', html: 'uz-Cyrl' },
  { id: 'ru', short: 'RU', name: 'Русский', html: 'ru' },
  { id: 'en', short: 'EN', name: 'English', html: 'en' },
]

export const TELEGRAM_CHANNEL = 'noorain_uz'
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_CHANNEL}`

export type Faq = { q: string; a: string }
export type LightId = 'lock' | 'ai' | 'recite'
export type Light = { id: LightId; tab: string; title: string; line: string; caption: string }
export type Feature = { title: string; lede: string; points: string[]; note?: string; captions: string[] }
export type Extra = { title: string; body: string; caption: string }

export type Dict = {
  meta: { title: string; description: string }
  skip: string
  nav: { telegram: string; language: string; home: string; sections: string; more: string; faq: string; features: string }
  cta: string
  note: string
  hero: { title: string; lede: string; lightsLabel: string; features: string }
  highlights: { title: string; prev: string; next: string }
  manifest: { lines: string[] }
  trust: { title: string; items: { title: string; body: string }[] }
  lights: Light[]
  lock: Feature & { another: string; wallLabel: string; walls: string[] }
  ai: Feature & { tryTitle: string }
  recite: Feature
  more: { title: string; lede: string; items: Extra[] }
  close: { title: string; body: string }
  faqTitle: string
  faq: Faq[]
  footer: { privacy: string; terms: string; del: string; tagline: string }
  phone: {
    reciteTitle: string
    reciteSub: string
    sample: string
    listening: string
    correct: string
    harakat: string
    pending: string
  }
  backHome: string
  ask: {
    chips: string[]
    placeholder: string
    send: string
    note: string
    liveCaption: string
    screenTitle: string
    screenSub: string
    thinking: string
    sources: string
    notFatwa: string
    remaining: string
    errors: { daily_limit: string; too_fast: string; unavailable: string; question_length: string }
  }
}

const uz: Dict = {
  meta: {
    title: 'Noorain — oyat har soatda qulf ekraningizda',
    description:
      "Noorain — Qur'on hamrohi: har soatda yangi oyat qulf ekraningizda, manbali AI yordamchi, tilovat tekshiruvi va internetsiz Qur'on. Yangiliklar Telegram kanalimizda.",
  },
  skip: "Asosiy qismga o'tish",
  nav: { telegram: 'Telegram', language: 'Til', home: 'Bosh sahifa', sections: "Bo'limlar", more: 'Yana', faq: 'Savollar', features: 'Imkoniyatlar' },
  cta: "Telegram kanalga qo'shilish",
  note: 'Android uchun. Yuklab olish havolasi kanalda.',
  hero: {
    title: "Qur'on har kuni yoningizda.",
    lede: "Qulf ekraningizda oyat, manbali javoblar va tilovat tekshiruvi — bitta ilovada.",
    lightsLabel: 'Asosiy imkoniyatlar',
    features: "Imkoniyatlarni ko'rish",
  },
  highlights: { title: 'Yana nimalar bor.', prev: 'Oldingi', next: 'Keyingi' },
  manifest: {
    lines: ['Telefonni olasiz — oyat sizni kutib turibdi.', 'Savol berasiz — javob manbasi bilan keladi.', "O'qiysiz — har bir so'zingiz eshitiladi."],
  },
  trust: {
    title: 'Ishonch — eng muhimi.',
    items: [
      { title: "Manba doim ko'rsatiladi", body: "AI har javobda oyat yoki hadis manbasini ko'rsatadi va fatvo bermaydi." },
      { title: 'Ovozingiz saqlanmaydi', body: 'Tilovat faqat tekshirish uchun uzatiladi va serverda qolmaydi.' },
      { title: 'Internetsiz ishlaydi', body: "Qur'on, qidiruv, qulf ekrani va eslatmalar internet bo'lmasa ham ishlaydi." },
    ],
  },
  lights: [
    { id: 'ai', tab: 'Yordamchi', title: 'Manbali javob', line: "Savolingizga Qur'on, hadis va duo manbalaridan javob.", caption: 'Ilovadan haqiqiy ekran' },
    { id: 'lock', tab: 'Oyat', title: "Oyat o'zi keladi", line: 'Har soatda qulf ekraningizda yangi oyat va tarjimasi.', caption: "Qulf ekrani · namuna" },
    { id: 'recite', tab: 'Tilovat', title: 'Tilovat tekshiruvi', line: "O'qiysiz — ilova so'zma-so'z tinglab, xatoni ko'rsatadi.", caption: 'Tilovat tekshiruvi · namuna' },
  ],
  lock: {
    title: "Oyat sizni o'zi topadi",
    lede: "Ilovani ochish shart emas. Telefonni qo'lga olganingizda qulf ekranida oyat turadi — arabcha matni va o'zbekcha tarjimasi bilan, har soatda yangisi.",
    points: [
      'Har soatda yangi oyat, internetsiz ham',
      "Arabcha matn, tarjima va manba — bir qarashda",
      "Fon rasmi va yozuv shriftini o'zingiz tanlaysiz",
      'Xohlasangiz, bosh ekranga ham',
    ],
    captions: ["Qulf ekrani · namuna, fon va oyatni almashtirib ko'ring"],
    another: 'Boshqa oyat',
    wallLabel: 'Fon',
    walls: ['Tong', "Tog'", 'Tun'],
  },
  ai: {
    title: 'Savolingizga manbali javob',
    lede: "Islomiy AI yordamchi Qur'on, hadis va duo manbalariga tayanib javob beradi va har javobda qaysi oyat yoki hadisdan olinganini ko'rsatadi.",
    points: [
      'Har javob ostida manba: sura, oyat va tarjimon',
      "O'zbek (lotin va kirill), rus va ingliz tilida",
      "Istalgan oyat haqida bir bosishda so'rash mumkin",
    ],
    note: "U fatvo bermaydi: fiqhiy masalada ishonchli olimga murojaat qiling.",
    captions: ['Ilovadan haqiqiy ekran · javob manbalari'],
    tryTitle: "Hoziroq sinab ko'ring",
  },
  recite: {
    title: "O'qing — Noorain tinglaydi",
    lede: "Istalgan joydan tilovatni boshlang: ilova qaysi sura va oyat ekanini ovozingizdan topadi va so'zma-so'z ergashadi.",
    points: [
      "Tushib qolgan va noto'g'ri o'qilgan so'zlarni belgilaydi",
      "Harakat xatolarini alohida ko'rsatadi",
      "Yodlash rejimi: oyat yopiq turadi, to'g'ri o'qigan so'zlaringiz ochilib boradi",
      "Kunlik maqsad, ketma-ket kunlar va yodlaganlarni o'z vaqtida takrorlash",
    ],
    note: 'Ovozingiz faqat tekshirish uchun uzatiladi va saqlanmaydi.',
    captions: ['Ilovadan haqiqiy ekran', 'Tilovat tarixi · haqiqiy ekran'],
  },
  more: {
    title: 'Va yana',
    lede: "Qur'on bilan har kungi hayot uchun kerakli narsalar — ilovaning ichida.",
    items: [
      {
        title: "Internetsiz Qur'on",
        body: "114 sura tarjimasi bilan: o'zbekchasi ilovaning ichida, ruscha va inglizchasi bir marta yuklab olinadi. Sura nomi, raqami yoki 2:255 kabi qidiring.",
        caption: 'Suralar ro‘yxati',
      },
      {
        title: 'Tarjimon izohlari',
        body: 'Shayx Muhammad Sodiq Muhammad Yusuf tarjimasi va izohlari — har oyat ostida, bir bosishda.',
        caption: 'Fotiha, 1-oyat izohi',
      },
      {
        title: 'Tinglang va takrorlang',
        body: "Qori o'qiydi, oyatlar ekranda yonib boradi. Yodlash uchun oyatni qayta-qayta tinglang, ekran foniga qo'ying yoki AI'dan ma'nosini so'rang.",
        caption: 'Oyat menyusi',
      },
      {
        title: 'Eslatmalar',
        body: "Tilovat vaqtini belgilang — ilova o'sha paytda oyat bilan eslatadi.",
        caption: 'Haqiqiy bildirishnoma',
      },
    ],
  },
  close: {
    title: "Noorain chiqqanda birinchilardan bo'ling",
    body: "Ilova hozircha Google Play'da yo'q. Yuklab olish havolasi va yangiliklar Telegram kanalimizda e'lon qilinadi.",
  },
  faqTitle: 'Ochiq gap',
  faq: [
    { q: 'Qaysi telefonlarda ishlaydi?', a: "Android telefonlarda. iPhone uchun versiya hozircha yo'q." },
    {
      q: 'Internet kerakmi?',
      a: "Birinchi kirishda kerak. Keyin Qur'on o'qish, qidiruv, saqlangan oyatlar, qulf ekrani va eslatmalar internetsiz ishlaydi. AI yordamchi va tilovat tekshiruvi uchun internet kerak.",
    },
    {
      q: 'AI fatvo beradimi?',
      a: "Yo'q. U manbalarga tayanib tushuntiradi va manbani ko'rsatadi. Fiqhiy masalada ishonchli olimga murojaat qiling.",
    },
    {
      q: 'Ovozim saqlanadimi?',
      a: "Yo'q. Tilovat tekshirish uchun serverga uzatiladi va saqlanmaydi. Faqat siz «natija noto'g'ri» deb xabar yuborsangiz, roziligingiz bilan o'sha yozuv xatoni tuzatish uchun saqlanadi.",
    },
    {
      q: 'Qaysi tillarda?',
      a: "O'zbekcha (lotin va kirill), ruscha va inglizcha. Qur'on tarjimasi ham tanlangan tilda.",
    },
  ],
  footer: {
    privacy: 'Maxfiylik siyosati',
    terms: 'Foydalanish shartlari',
    del: "Hisobni o'chirish",
    tagline: "Noorain (نورين) — «ikki nur»: Qur'on va Sunnat.",
  },
  phone: {
    reciteTitle: 'Tilovat tekshiruvi',
    reciteSub: 'Noorain AI · tajvid yordamchisi',
    sample: 'Namuna',
    listening: 'Tinglanmoqda',
    correct: "To'g'ri",
    harakat: 'Harakat',
    pending: "O'qilmagan",
  },
  backHome: 'Bosh sahifaga',
  ask: {
    chips: ["Sabr haqida Qur'onda nima deyilgan?", 'Qalbim tinchlanishi uchun qaysi duoni o‘qiy?', 'Ota-onaga yaxshilik haqida hadis bormi?'],
    placeholder: 'Savolingizni yozing…',
    send: 'Yuborish',
    note: 'Sinab ko‘ring: kuniga 3 ta savol. Javob telefonda chiqadi.',
    liveCaption: 'Jonli javob · Noorain serveridan',
    screenTitle: 'Islomiy AI yordamchi',
    screenSub: "Javoblar Qur'on, hadis va duo manbalaridan",
    thinking: 'Manbalardan javob tayyorlanmoqda',
    sources: 'Manbalar',
    notFatwa: 'AI fatvo bermaydi',
    remaining: 'bugun yana {n} ta savol',
    errors: {
      daily_limit: "Bugungi 3 ta savolingiz tugadi. Ilova chiqqanda cheklovsiz so'rashingiz mumkin bo'ladi — yangiliklar kanalimizda.",
      too_fast: 'Biroz kuting: keyingi savolni {n} soniyadan keyin yuborish mumkin.',
      unavailable: 'Hozir javob bera olmadim. Birozdan keyin qayta urinib ko‘ring.',
      question_length: 'Savol 300 belgidan oshmasin.',
    },
  },
}

const ru: Dict = {
  meta: {
    title: 'Noorain — аят каждый час на экране блокировки',
    description:
      'Noorain — спутник Корана: каждый час новый аят на экране блокировки, ИИ-помощник с источниками, проверка чтения и Коран без интернета. Новости — в нашем Telegram-канале.',
  },
  skip: 'Перейти к содержанию',
  nav: { telegram: 'Telegram', language: 'Язык', home: 'Главная', sections: 'Разделы', more: 'Ещё', faq: 'Вопросы', features: 'Возможности' },
  cta: 'Подписаться в Telegram',
  note: 'Для Android. Ссылка на скачивание — в канале.',
  hero: {
    title: 'Коран рядом каждый день.',
    lede: 'Аят на экране блокировки, ответы с источниками и проверка чтения.',
    lightsLabel: 'Главные возможности',
    features: 'Посмотреть возможности',
  },
  highlights: { title: 'И это ещё не всё.', prev: 'Назад', next: 'Вперёд' },
  manifest: {
    lines: ['Берёте телефон — вас уже ждёт аят.', 'Задаёте вопрос — ответ приходит с источником.', 'Читаете — каждое ваше слово услышано.'],
  },
  trust: {
    title: 'Главное — доверие.',
    items: [
      { title: 'Источник всегда указан', body: 'В каждом ответе ИИ показывает аят или хадис и не выносит фетв.' },
      { title: 'Голос не сохраняется', body: 'Чтение передаётся только для проверки и не остаётся на сервере.' },
      { title: 'Работает без интернета', body: 'Коран, поиск, экран блокировки и напоминания работают и офлайн.' },
    ],
  },
  lights: [
    { id: 'ai', tab: 'Помощник', title: 'Ответ с источниками', line: 'Ответы на основе Корана, хадисов и дуа.', caption: 'Настоящий экран приложения' },
    { id: 'lock', tab: 'Аят', title: 'Аят приходит сам', line: 'Каждый час новый аят с переводом на экране блокировки.', caption: 'Экран блокировки · пример' },
    { id: 'recite', tab: 'Чтение', title: 'Проверка чтения', line: 'Вы читаете — приложение слушает и показывает ошибки.', caption: 'Проверка чтения · пример' },
  ],
  lock: {
    title: 'Аят находит вас сам',
    lede: 'Открывать приложение не нужно: когда вы берёте телефон, на экране блокировки уже аят — арабский текст и перевод, каждый час новый.',
    points: [
      'Новый аят каждый час, даже без интернета',
      'Арабский текст, перевод и ссылка — с одного взгляда',
      'Фон и шрифт выбираете вы',
      'При желании — и на главном экране',
    ],
    captions: ['Экран блокировки · пример, смените фон и аят'],
    another: 'Другой аят',
    wallLabel: 'Фон',
    walls: ['Рассвет', 'Горы', 'Ночь'],
  },
  ai: {
    title: 'Ответ с источниками',
    lede: 'Исламский ИИ-помощник отвечает на основе Корана, хадисов и сборников дуа и в каждом ответе показывает, из какого аята или хадиса он взят.',
    points: [
      'Под каждым ответом — источник: сура, аят и переводчик',
      'На узбекском (латиница и кириллица), русском и английском',
      'О любом аяте можно спросить в одно касание',
    ],
    note: 'Он не выносит фетв: по вопросам фикха обращайтесь к знающему учёному.',
    captions: ['Настоящий экран приложения · источники ответа'],
    tryTitle: 'Спросите прямо сейчас',
  },
  recite: {
    title: 'Читайте — Noorain слушает',
    lede: 'Начните чтение с любого места: приложение по голосу узнаёт суру и аят и следует за вами слово за словом.',
    points: [
      'Отмечает пропущенные и неверно прочитанные слова',
      'Отдельно показывает ошибки в огласовках',
      'Режим заучивания: аят скрыт, верно прочитанные слова открываются',
      'Дневная цель, серия дней и повторение выученного вовремя',
    ],
    note: 'Голос передаётся только для проверки и не сохраняется.',
    captions: ['Настоящий экран приложения', 'История чтения · настоящий экран'],
  },
  more: {
    title: 'И ещё',
    lede: 'Всё, что нужно, чтобы жить с Кораном каждый день, — внутри приложения.',
    items: [
      {
        title: 'Коран без интернета',
        body: '114 сур с переводом: узбекский встроен, русский и английский скачиваются один раз. Поиск по названию, номеру или ссылке вроде 2:255.',
        caption: 'Список сур',
      },
      {
        title: 'Комментарии переводчика',
        body: 'Узбекский перевод шейха Мухаммада Содика Мухаммада Юсуфа с его комментариями — под каждым аятом, в одно касание.',
        caption: 'Комментарий к аяту 1:1',
      },
      {
        title: 'Слушайте и повторяйте',
        body: 'Чтец читает, аяты подсвечиваются на экране. Для заучивания повторяйте аят по кругу, ставьте его на обои или спросите ИИ о смысле.',
        caption: 'Меню аята',
      },
      {
        title: 'Напоминания',
        body: 'Задайте время чтения — приложение напомнит аятом.',
        caption: 'Настоящее уведомление',
      },
    ],
  },
  close: {
    title: 'Будьте среди первых, когда выйдет Noorain',
    body: 'Приложения пока нет в Google Play. Ссылку на скачивание и новости мы публикуем в Telegram-канале.',
  },
  faqTitle: 'Честно о главном',
  faq: [
    { q: 'На каких телефонах работает?', a: 'На Android. Версии для iPhone пока нет.' },
    {
      q: 'Нужен ли интернет?',
      a: 'При первом входе — да. Затем чтение Корана, поиск, сохранённые аяты, экран блокировки и напоминания работают без интернета. Для ИИ-помощника и проверки чтения интернет нужен.',
    },
    {
      q: 'Даёт ли ИИ фетвы?',
      a: 'Нет. Он объясняет, опираясь на источники, и показывает их. По вопросам фикха обращайтесь к знающему учёному.',
    },
    {
      q: 'Сохраняется ли мой голос?',
      a: 'Нет. Чтение передаётся на сервер для проверки и не сохраняется. Только если вы сами отправите отчёт «результат неверный», запись с вашего согласия сохраняется, чтобы исправить ошибку.',
    },
    {
      q: 'На каких языках?',
      a: 'Узбекский (латиница и кириллица), русский и английский. Перевод Корана — на выбранном языке.',
    },
  ],
  footer: {
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования',
    del: 'Удаление аккаунта',
    tagline: 'Noorain (نورين) — «два света»: Коран и Сунна.',
  },
  phone: {
    reciteTitle: 'Проверка чтения',
    reciteSub: 'Noorain AI · помощник по таджвиду',
    sample: 'Пример',
    listening: 'Слушаю',
    correct: 'Верно',
    harakat: 'Огласовка',
    pending: 'Не прочитано',
  },
  backHome: 'На главную',
  ask: {
    chips: ['Что говорит Коран о терпении?', 'Какое дуа читать, чтобы успокоить сердце?', 'Есть ли хадис о доброте к родителям?'],
    placeholder: 'Напишите свой вопрос…',
    send: 'Отправить',
    note: 'Попробуйте: 3 вопроса в день. Ответ появится на телефоне.',
    liveCaption: 'Живой ответ · с сервера Noorain',
    screenTitle: 'Исламский ИИ-помощник',
    screenSub: 'Ответы из Корана, хадисов и дуа',
    thinking: 'Готовлю ответ по источникам',
    sources: 'Источники',
    notFatwa: 'ИИ не выносит фетв',
    remaining: 'сегодня ещё {n}',
    errors: {
      daily_limit: 'Ваши 3 вопроса на сегодня закончились. В приложении ограничений не будет — следите за новостями в нашем канале.',
      too_fast: 'Подождите немного: следующий вопрос можно отправить через {n} с.',
      unavailable: 'Сейчас не получилось ответить. Попробуйте чуть позже.',
      question_length: 'Вопрос должен быть не длиннее 300 символов.',
    },
  },
}

const en: Dict = {
  meta: {
    title: 'Noorain — an ayah on your lock screen every hour',
    description:
      'Noorain is a Quran companion: a new ayah on your lock screen every hour, an AI assistant that cites its sources, recitation checking and the Quran offline. News on our Telegram channel.',
  },
  skip: 'Skip to content',
  nav: { telegram: 'Telegram', language: 'Language', home: 'Home', sections: 'Sections', more: 'More', faq: 'Questions', features: 'Features' },
  cta: 'Join the Telegram channel',
  note: 'For Android. The download link is in the channel.',
  hero: {
    title: 'The Quran beside you, every day.',
    lede: 'Ayahs on your lock screen, answers with sources and a recitation check.',
    lightsLabel: 'Main features',
    features: 'See what it does',
  },
  highlights: { title: 'And there’s more.', prev: 'Previous', next: 'Next' },
  manifest: {
    lines: ['Pick up your phone — an ayah is waiting.', 'Ask a question — the answer comes with its source.', 'Recite — every word is heard.'],
  },
  trust: {
    title: 'Built to be trusted.',
    items: [
      { title: 'Sources, always', body: 'Every AI answer shows the ayah or hadith it rests on, and it never issues fatwas.' },
      { title: 'Your voice isn’t kept', body: 'Your recitation is sent only to be checked and does not stay on the server.' },
      { title: 'Works offline', body: 'The Quran, search, the lock screen and reminders all work without internet.' },
    ],
  },
  lights: [
    { id: 'ai', tab: 'Assistant', title: 'Answers with sources', line: 'Answers drawn from the Quran, hadith and duas.', caption: 'Real screen from the app' },
    { id: 'lock', tab: 'Ayah', title: 'The ayah comes to you', line: 'A new ayah with its translation on your lock screen every hour.', caption: 'Lock screen · sample' },
    { id: 'recite', tab: 'Recite', title: 'Recitation check', line: 'You recite; the app listens and shows your mistakes.', caption: 'Recitation check · sample' },
  ],
  lock: {
    title: 'The ayah finds you',
    lede: 'No need to open the app: when you pick up your phone, an ayah is already on the lock screen, in Arabic with its translation, and a new one every hour.',
    points: [
      'A new ayah every hour, even offline',
      'Arabic, translation and reference at a glance',
      'You choose the wallpaper and the font',
      'On the home screen too, if you like',
    ],
    captions: ['Lock screen · sample, try another wallpaper or ayah'],
    another: 'Another ayah',
    wallLabel: 'Wallpaper',
    walls: ['Dawn', 'Mountains', 'Night'],
  },
  ai: {
    title: 'Answers that show their sources',
    lede: 'The Islamic AI assistant answers from the Quran, hadith and dua collections, and every answer shows which ayah or hadith it comes from.',
    points: [
      'Every answer cites its source: surah, ayah and translator',
      'In Uzbek (Latin and Cyrillic), Russian and English',
      'Ask about any ayah with one tap',
    ],
    note: 'It does not issue fatwas: for questions of fiqh, ask a trusted scholar.',
    captions: ['Real screen from the app · the answer’s sources'],
    tryTitle: 'Ask it now',
  },
  recite: {
    title: 'Recite — Noorain listens',
    lede: 'Start anywhere: the app recognises the surah and ayah from your voice and follows you word by word.',
    points: [
      'Marks skipped and misread words',
      'Shows harakat (vowel) mistakes separately',
      'Memorise mode: the ayah stays hidden and opens as you recite it right',
      'A daily goal, a streak, and reviews when they are due',
    ],
    note: 'Your voice is sent only to be checked and is not stored.',
    captions: ['Real screen from the app', 'Recitation history · real screen'],
  },
  more: {
    title: 'And also',
    lede: 'Everything for a daily life with the Quran, inside the app.',
    items: [
      {
        title: 'The Quran, offline',
        body: 'All 114 surahs with translation: Uzbek is built in, Russian and English download once. Search by name, number or a reference like 2:255.',
        caption: 'Surah list',
      },
      {
        title: 'The translator’s notes',
        body: 'Shaykh Muhammad Sodiq Muhammad Yusuf’s Uzbek translation with his notes, under every ayah, one tap away.',
        caption: 'Note on ayah 1:1',
      },
      {
        title: 'Listen and repeat',
        body: 'A reciter reads while the ayahs light up. Loop an ayah to memorise it, set it as your wallpaper, or ask the AI what it means.',
        caption: 'Ayah menu',
      },
      {
        title: 'Reminders',
        body: 'Set a time to recite, and the app reminds you with an ayah.',
        caption: 'A real notification',
      },
    ],
  },
  close: {
    title: 'Be among the first when Noorain launches',
    body: 'The app is not on Google Play yet. We post the download link and news on our Telegram channel.',
  },
  faqTitle: 'Straight answers',
  faq: [
    { q: 'Which phones does it run on?', a: 'Android phones. There is no iPhone version yet.' },
    {
      q: 'Do I need internet?',
      a: 'For the first sign-in, yes. After that, reading, search, saved ayahs, the lock screen and reminders work offline. The AI assistant and recitation checking need internet.',
    },
    {
      q: 'Does the AI give fatwas?',
      a: 'No. It explains from the sources and shows them. For questions of fiqh, ask a trusted scholar.',
    },
    {
      q: 'Is my voice stored?',
      a: 'No. Your recitation is streamed to the server for checking and is not stored. Only if you send a “wrong result” report, and with your consent, is that recording kept to fix the mistake.',
    },
    {
      q: 'Which languages?',
      a: 'Uzbek (Latin and Cyrillic), Russian and English. The Quran translation follows the language you choose.',
    },
  ],
  footer: {
    privacy: 'Privacy policy',
    terms: 'Terms of use',
    del: 'Delete account',
    tagline: 'Noorain (نورين) — “two lights”: the Quran and the Sunnah.',
  },
  phone: {
    reciteTitle: 'Recitation check',
    reciteSub: 'Noorain AI · tajweed helper',
    sample: 'Sample',
    listening: 'Listening',
    correct: 'Correct',
    harakat: 'Harakat',
    pending: 'Not read yet',
  },
  backHome: 'Back to home',
  ask: {
    chips: ['What does the Quran say about patience?', 'Which dua can I read to calm my heart?', 'Is there a hadith about kindness to parents?'],
    placeholder: 'Type your question…',
    send: 'Send',
    note: 'Try it: 3 questions a day. The answer appears on the phone.',
    liveCaption: 'Live answer · from the Noorain server',
    screenTitle: 'Islamic AI assistant',
    screenSub: 'Answers from Quran, hadith and dua sources',
    thinking: 'Preparing an answer from the sources',
    sources: 'Sources',
    notFatwa: 'The AI does not give fatwas',
    remaining: '{n} more today',
    errors: {
      daily_limit: "You've used today's 3 questions. The app will have no such limit — follow our channel for news.",
      too_fast: 'Please wait a moment: you can send the next question in {n} s.',
      unavailable: "I couldn't answer just now. Please try again in a little while.",
      question_length: 'Please keep the question under 300 characters.',
    },
  },
}

/* ---------- Uzbek Latin → Cyrillic ---------- */

// Names and handles that stay as written in Cyrillic text.
const KEEP = ['Noorain', 'Telegram', 'Google Play', 'Google', 'Gemini', 'Amazon Web Services', 'Android', 'iPhone', 'QuranEnc', 'HTTPS', 'AI', 'noorain.uz', '@noorain_uz', 'email']

const SINGLE: Record<string, string> = {
  a: 'а', b: 'б', d: 'д', e: 'е', f: 'ф', g: 'г', h: 'ҳ', i: 'и', j: 'ж', k: 'к', l: 'л', m: 'м',
  n: 'н', o: 'о', p: 'п', q: 'қ', r: 'р', s: 'с', t: 'т', u: 'у', v: 'в', x: 'х', y: 'й', z: 'з', c: 'с', w: 'в',
}
const VOWELS = 'aeiouAEIOU'
const APOS = /['ʻʼ‘’`]/

function translitWord(w: string): string {
  let out = ''
  for (let i = 0; i < w.length; i++) {
    const c = w[i]
    const lower = c.toLowerCase()
    const next = (w[i + 1] || '').toLowerCase()
    const upper = c !== lower
    const cap = (s: string) => (upper ? s[0].toUpperCase() + s.slice(1) : s)
    if ((lower === 'o' || lower === 'g') && APOS.test(w[i + 1] || '')) {
      out += cap(lower === 'o' ? 'ў' : 'ғ')
      i++
      continue
    }
    if (lower === 's' && next === 'h') { out += cap('ш'); i++; continue }
    if (lower === 'c' && next === 'h') { out += cap('ч'); i++; continue }
    if (lower === 'y' && (next === 'o' || next === 'u' || next === 'a' || next === 'e') && !APOS.test(w[i + 2] || '')) {
      out += cap({ o: 'ё', u: 'ю', a: 'я', e: 'е' }[next]!)
      i++
      continue
    }
    if (lower === 'e') {
      const prev = w[i - 1]
      out += cap(!prev || !/[a-zA-Z]/.test(prev) || VOWELS.includes(prev) ? 'э' : 'е')
      continue
    }
    if (APOS.test(c)) {
      const prev = w[i - 1]
      out += prev && /[a-zA-Z]/.test(prev) ? 'ъ' : c
      continue
    }
    const m = SINGLE[lower]
    out += m ? cap(m) : c
  }
  return out
}

export function toCyrillic(text: string): string {
  // Protect names, then convert word by word.
  const parts: string[] = []
  let rest = text
  const re = new RegExp(KEEP.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g')
  let last = 0
  for (const m of rest.matchAll(re)) {
    parts.push(rest.slice(last, m.index).replace(/[A-Za-z][A-Za-z'ʻʼ‘’`]*/g, translitWord))
    parts.push(m[0])
    last = m.index! + m[0].length
  }
  parts.push(rest.slice(last).replace(/[A-Za-z][A-Za-z'ʻʼ‘’`]*/g, translitWord))
  rest = parts.join('')
  return rest
}

function deepMap<T>(value: T, fn: (s: string) => string): T {
  if (typeof value === 'string') return fn(value) as T
  if (Array.isArray(value)) return value.map((v) => deepMap(v, fn)) as T
  if (value && typeof value === 'object') {
    const o: Record<string, unknown> = {}
    // Ids are code, not copy: they stay as written.
    for (const [k, v] of Object.entries(value)) o[k] = k === 'id' ? v : deepMap(v, fn)
    return o as T
  }
  return value
}

const uzc: Dict = deepMap(uz, toCyrillic)

export const DICTS: Record<Lang, Dict> = { uz, uzc, ru, en }

/* ---------- Ayahs shown on the lock screens (Arabic + the app's own translations) ---------- */

export type Ayah = { ar: string; tr: string; ref: string }

const AR: Record<string, string> = {
  '94:5': 'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',
  '2:152': 'فَٱذْكُرُونِىٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ',
  '2:153': 'يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ',
  '13:28': 'ٱلَّذِينَ ءَامَنُوا۟ وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ ٱللَّهِ ۗ أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ',
}

const TR: Record<Lang, Record<string, [string, string]>> = {
  uz: {
    '94:5': ['Bas, albatta, qiyinchilik bilan osonchilik bordir.', 'SHARH'],
    '2:152': ['Bas, Meni eslangiz, sizni eslarman. Va Menga shukr qilingiz, kufr qilmangiz.', 'BAQARA'],
    '2:153': ['Ey, iymon keltirganlar! Sabr va namoz ila madad soʻranglar. Albatta, Alloh sabrlilar bilandir.', 'BAQARA'],
    '13:28': ['Iymon keltirganlar va Allohning zikri ila qalblari orom topganlar. Ayo, Allohning zikri ila qalblar orom topmasmi?', 'RAʼD'],
  },
  uzc: {
    '94:5': ['Бас, албатта, қийинчилик билан осончилик бордир.', 'ШАРҲ'],
    '2:152': ['Бас, Мени эслангиз, сизни эсларман. Ва Менга шукр қилингиз, куфр қилмангиз.', 'БАҚАРА'],
    '2:153': ['Эй, иймон келтирганлар! Сабр ва намоз ила мадад сўранглар. Албатта, Аллоҳ сабрлилар биландир.', 'БАҚАРА'],
    '13:28': ['Иймон келтирганлар ва Аллоҳнинг зикри ила қалблари ором топганлар. Аё, Аллоҳнинг зикри ила қалблар ором топмасми?', 'РАЪД'],
  },
  ru: {
    '94:5': ['Воистину, за каждой тягостью наступает облегчение.', 'РАСКРЫТИЕ'],
    '2:152': ['Поминайте Меня, и Я буду помнить о вас. Благодарите Меня и не будьте неблагодарны Мне.', 'КОРОВА'],
    '2:153': ['О те, которые уверовали! Обратитесь за помощью к терпению и намазу. Воистину, Аллах — с терпеливыми.', 'КОРОВА'],
    '13:28': ['Они уверовали, и их сердца утешаются поминанием Аллаха. Разве не поминанием Аллаха утешаются сердца?', 'ГРОМ'],
  },
  en: {
    '94:5': ['For indeed, with hardship [will be] ease.', 'ASH-SHARH'],
    '2:152': ['So remember Me; I will remember you. And be grateful to Me and do not deny Me.', 'AL-BAQARAH'],
    '2:153': ['O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.', 'AL-BAQARAH'],
    '13:28': ['Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.', "AR-RA'D"],
  },
}

export function ayah(lang: Lang, key: string): Ayah {
  const [tr, name] = TR[lang][key]
  return { ar: AR[key], tr, ref: `${name} · ${key}` }
}

/* ---------- Current language ---------- */

const STORE_KEY = 'noorain.lang'

function initialLang(): Lang {
  try {
    const q = new URLSearchParams(location.search).get('lang') as Lang | null
    if (q && q in DICTS) return q
    const saved = localStorage.getItem(STORE_KEY) as Lang | null
    if (saved && saved in DICTS) return saved
  } catch {
    /* storage unavailable */
  }
  const nav = (navigator.language || '').toLowerCase()
  if (nav.startsWith('ru')) return 'ru'
  if (nav.includes('cyrl')) return 'uzc'
  return 'uz'
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>(initialLang)
  useEffect(() => {
    document.documentElement.lang = LANGS.find((l) => l.id === lang)!.html
    try {
      localStorage.setItem(STORE_KEY, lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])
  return [lang, setLang]
}
