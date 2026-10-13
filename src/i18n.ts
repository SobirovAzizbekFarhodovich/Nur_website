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

export type Scene = { title: string; body: string; caption: string }
export type Faq = { q: string; a: string }

export type Dict = {
  meta: { title: string; description: string }
  skip: string
  nav: { telegram: string; language: string; home: string }
  cta: string
  how: string
  note: string
  railLabel: string
  scenes: Scene[]
  closeCta: string
  faqTitle: string
  faq: Faq[]
  footer: { privacy: string; terms: string; del: string; tagline: string }
  phone: {
    date: string
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
  nav: { telegram: 'Telegram', language: 'Til', home: 'Bosh sahifa' },
  cta: "Telegram kanalga qo'shilish",
  how: 'Qanday ishlaydi',
  note: 'Android uchun. Yuklab olish havolasi kanalda.',
  railLabel: 'Kun vaqtlari',
  scenes: [
    {
      title: 'Oyat har soatda qulf ekraningizda',
      body: "Telefonni har gal qo'lingizga olganingizda — yangi oyat, o'z tilingizdagi tarjimasi bilan.",
      caption: "Qulf ekrani ko'rinishi · namuna",
    },
    {
      title: "Kun bo'yi Qur'on yoningizda",
      body: "Ilovani ochish shart emas: oyat har soatda o'zi almashadi — arabcha matni va Shayx Muhammad Sodiq Muhammad Yusuf tarjimasi. Fon rasmi va yozuv shriftini o'zingiz tanlaysiz — faqat qulf ekraniga yoki bosh ekranga ham.",
      caption: "Qulf ekrani ko'rinishi · namuna",
    },
    {
      title: 'Savolingizga manbali javob',
      body: "Islomiy AI yordamchi Qur'on, hadis va duo manbalariga tayanib javob beradi va qaysi oyat yoki hadisdan olinganini ko'rsatadi. U fatvo bermaydi: fiqhiy masalada ishonchli olimga murojaat qiling.",
      caption: 'Ilovadan haqiqiy ekran',
    },
    {
      title: "O'qing — Noorain kuzatib boradi",
      body: "Istalgan joydan tilovatni boshlang: ilova qaysi sura va oyat ekanini ovozingizdan topadi, so'zma-so'z ergashadi va tushib qolgan, noto'g'ri o'qilgan so'zlarni hamda harakat xatolarini belgilaydi. Yodlash rejimida oyat yopiq turadi.",
      caption: 'Tilovat tekshiruvi · namuna',
    },
    {
      title: 'Kechqurun — tafakkur uchun',
      body: "Qur'oni Karim o'zbekcha tarjimasi (lotin va kirill) va tarjimon izohlari bilan ilovaning ichida, internetsiz. Oyatlarni saqlang, kunlik maqsad qo'ying, yodlaganlaringizni o'z vaqtida takrorlang.",
      caption: 'Ilovadan haqiqiy ekran',
    },
    {
      title: "Noorain chiqqanda birinchilardan bo'ling",
      body: "Ilova hozircha Google Play'da yo'q. Yuklab olish havolasi va yangiliklar Telegram kanalimizda e'lon qilinadi.",
      caption: "Qulf ekrani ko'rinishi · namuna",
    },
  ],
  closeCta: "@noorain_uz kanaliga qo'shilish",
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
    date: 'Seshanba, 13-oktabr',
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
  nav: { telegram: 'Telegram', language: 'Язык', home: 'Главная' },
  cta: 'Подписаться на Telegram-канал',
  how: 'Как это работает',
  note: 'Для Android. Ссылка на скачивание — в канале.',
  railLabel: 'Время дня',
  scenes: [
    {
      title: 'Аят каждый час на экране блокировки',
      body: 'Каждый раз, когда вы берёте телефон, — новый аят с переводом на вашем языке.',
      caption: 'Экран блокировки · пример',
    },
    {
      title: 'Коран рядом весь день',
      body: 'Открывать приложение не нужно: аят сам меняется каждый час — арабский текст и перевод. Фон и шрифт выбираете вы — только для экрана блокировки или и для главного экрана.',
      caption: 'Экран блокировки · пример',
    },
    {
      title: 'Ответ с источниками',
      body: 'Исламский ИИ-помощник отвечает на основе Корана, хадисов и сборников дуа и показывает, из какого аята или хадиса взят ответ. Он не выносит фетв: по вопросам фикха обращайтесь к знающему учёному.',
      caption: 'Настоящий экран приложения',
    },
    {
      title: 'Читайте — Noorain следит',
      body: 'Начните чтение с любого места: приложение по голосу узнаёт суру и аят, следует слово за словом и отмечает пропущенные и неверно прочитанные слова, а также ошибки в огласовках. В режиме заучивания аят скрыт.',
      caption: 'Проверка чтения · пример',
    },
    {
      title: 'Вечер — для размышления',
      body: 'Коран с переводом — прямо в приложении и без интернета; узбекский перевод идёт с комментариями переводчика. Сохраняйте аяты, ставьте дневную цель и вовремя повторяйте выученное.',
      caption: 'Настоящий экран приложения',
    },
    {
      title: 'Будьте среди первых, когда выйдет Noorain',
      body: 'Приложения пока нет в Google Play. Ссылку на скачивание и новости мы публикуем в Telegram-канале.',
      caption: 'Экран блокировки · пример',
    },
  ],
  closeCta: 'Подписаться на @noorain_uz',
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
    date: 'Вторник, 13 октября',
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
  nav: { telegram: 'Telegram', language: 'Language', home: 'Home' },
  cta: 'Join the Telegram channel',
  how: 'How it works',
  note: 'For Android. The download link is in the channel.',
  railLabel: 'Times of day',
  scenes: [
    {
      title: 'An ayah on your lock screen, every hour',
      body: 'Every time you pick up your phone: a new ayah, translated into your language.',
      caption: 'Lock screen · sample',
    },
    {
      title: 'The Quran beside you all day',
      body: 'No need to open the app: the ayah changes on its own every hour — the Arabic text and its translation. You choose the background and the typeface — lock screen only, or the home screen too.',
      caption: 'Lock screen · sample',
    },
    {
      title: 'Answers that show their sources',
      body: 'The Islamic AI assistant answers from Quran, hadith and dua sources and shows which ayah or hadith it relied on. It does not issue fatwas: for questions of fiqh, ask a trusted scholar.',
      caption: 'Real screen from the app',
    },
    {
      title: 'Recite — Noorain follows along',
      body: 'Start anywhere: the app recognises the surah and ayah from your voice, follows you word by word, and marks skipped words, wrong words and harakat slips. In memorisation mode the ayah stays hidden.',
      caption: 'Recitation check · sample',
    },
    {
      title: 'Evenings are for reflection',
      body: "The Quran with translation inside the app, offline; the Uzbek translation comes with the translator's notes. Save ayahs, set a daily goal and review what you memorised on time.",
      caption: 'Real screen from the app',
    },
    {
      title: 'Be among the first when Noorain launches',
      body: 'The app is not on Google Play yet. We post the download link and news on our Telegram channel.',
      caption: 'Lock screen · sample',
    },
  ],
  closeCta: 'Join @noorain_uz',
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
    date: 'Tuesday, October 13',
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
    for (const [k, v] of Object.entries(value)) o[k] = deepMap(v, fn)
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
