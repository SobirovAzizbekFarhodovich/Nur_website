import { type Lang, toCyrillic } from './i18n'

export type LegalSection = { h: string; p?: string[]; list?: string[]; ordered?: boolean }
export type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] }
export type LegalId = 'privacy' | 'terms' | 'delete-account'

type Docs = Record<LegalId, LegalDoc>

const uz: Docs = {
  privacy: {
    title: 'Maxfiylik siyosati',
    updated: 'Oxirgi yangilanish: 2026-yil 14-oktabr',
    intro:
      "Bu siyosat Noorain Android ilovasi va noorain.uz sayti qaysi ma'lumotlardan foydalanishini, nima uchun va qanday saqlashini tushuntiradi. Biz faqat ilova ishlashi uchun kerak bo'lgan ma'lumotni olamiz.",
    sections: [
      {
        h: "Qaysi ma'lumotlarni olamiz",
        list: [
          "Hisob: ismingiz, email manzilingiz va tanlagan tilingiz. Hisobingizga kirish va sozlamalarni saqlash uchun.",
          "Profil (ixtiyoriy): rasmingiz, tug'ilgan yilingiz, jinsingiz, Qur'on o'qish darajangiz va maqsadingiz. Profil sahifasida ko'rsatish uchun; rasm faqat sizga ko'rinadi va yuklanganda undagi joylashuv kabi metama'lumotlar o'chiriladi.",
          "AI yordamchiga yozgan savollaringiz. Javob tayyorlash uchun serverimizga yuboriladi.",
          "Tilovat ovozi. Tekshirish paytida serverimizga real vaqtda uzatiladi va saqlanmaydi.",
          "Tilovat natijalari: har bir oyat bo'yicha so'zlar soni, to'g'ri, xato va tushib qolgan so'zlar soni hamda sana. Telefonni almashtirsangiz tiklanishi uchun hisobingizga zaxiralanadi.",
          "«Natija noto'g'ri» xabari. Uni o'zingiz yuborsangiz va rozilik bersangizgina, o'sha tilovat yozuvi va natijasi tekshiruvni yaxshilash uchun saqlanadi.",
        ],
      },
      {
        h: "Telefoningizda qoladigan ma'lumotlar",
        p: [
          "Qulf ekrani foni telefoningizning o'zida tayyorlanadi. Saqlangan oyatlar, eslatmalar va ilova sozlamalari telefonda saqlanadi va serverga yuborilmaydi.",
        ],
      },
      {
        h: 'Uchinchi tomon xizmatlari',
        p: [
          "AI javobini tayyorlash uchun savolingiz, suhbatdagi oldingi xabarlar, ismingiz va jinsingiz (sizga to'g'ri murojaat qilish uchun) hamda mos manba parchalari Google kompaniyasining Gemini sun'iy intellekt xizmatiga yuboriladi. Email manzilingiz, rasmingiz va yoshingiz yuborilmaydi.",
          "Ilovada reklama va reklama kuzatuvchilari yo'q. Ma'lumotlaringizni sotmaymiz va reklama uchun ishlatmaymiz.",
        ],
      },
      {
        h: 'Saqlash va himoya',
        p: [
          "Serverlarimiz Amazon Web Services'ning Germaniyadagi (Frankfurt) ma'lumotlar markazida joylashgan. Ilova server bilan shifrlangan HTTPS aloqa orqali ishlaydi.",
          "Ma'lumotlar hisobingiz mavjud ekan saqlanadi. Hisobni o'chirsangiz, unga bog'liq barcha ma'lumotlar serverdan o'chiriladi.",
        ],
      },
      {
        h: 'Huquqlaringiz',
        p: [
          "Ma'lumotlaringiz nusxasini so'rashingiz, ularni tuzatishni yoki hisobingizni butunlay o'chirishni talab qilishingiz mumkin. Qanday qilish «Hisobni o'chirish» sahifasida yozilgan.",
        ],
      },
      { h: "Bog'lanish", p: ['Savol va so\'rovlar uchun Telegram: @noorain_uz.'] },
      { h: "O'zgarishlar", p: ["Siyosat o'zgarsa, shu sahifada yangilanish sanasi bilan e'lon qilamiz."] },
    ],
  },
  terms: {
    title: 'Foydalanish shartlari',
    updated: 'Oxirgi yangilanish: 2026-yil 14-oktabr',
    intro: "Noorain ilovasi va noorain.uz saytidan foydalanib, siz quyidagi shartlarga rozilik bildirasiz.",
    sections: [
      {
        h: 'Xizmat',
        p: [
          "Noorain — Qur'on o'qish, qulf ekranida oyat ko'rsatish, AI yordamchi va tilovat tekshiruvi imkoniyatlariga ega ilova. Xizmat «boricha» taqdim etiladi va vaqti-vaqti bilan o'zgarishi mumkin.",
        ],
      },
      {
        h: 'AI javoblari',
        p: [
          "AI yordamchi javoblari manbalarga tayanadi, lekin xato bo'lishi mumkin. Ular fatvo emas va olim maslahatining o'rnini bosmaydi. Diniy hukm talab qiladigan masalada ishonchli olimga murojaat qiling.",
        ],
      },
      {
        h: 'Tilovat tekshiruvi',
        p: [
          "Tekshiruv nutqni avtomatik tanib olishga asoslangan va xato qilishi mumkin. Uni ustoz bilan o'qishning o'rniga emas, mashq uchun yordamchi sifatida ishlating.",
        ],
      },
      {
        h: "Qur'on matni va tarjimalar",
        p: [
          "Arabcha matn va tarjimalar ishonchli ochiq manbalardan, jumladan QuranEnc'dan olingan va o'zgartirilmagan. Tarjima — Qur'on ma'nolarining tarjimasi, Qur'onning o'zi emas.",
        ],
      },
      {
        h: 'Hisobingiz',
        p: [
          "Hisob ma'lumotlaringiz to'g'ri bo'lishi va kirish ma'lumotlaringizni boshqalarga bermasligingiz kerak. Xizmatdan noqonuniy yoki boshqalarga zarar yetkazadigan maqsadda foydalanish taqiqlanadi; bunday holda hisob to'xtatilishi mumkin.",
        ],
      },
      {
        h: 'Javobgarlik',
        p: ["Qonun ruxsat bergan darajada, xizmatdan foydalanish natijasida yuzaga kelgan bilvosita zarar uchun javobgar emasmiz."],
      },
      {
        h: "O'zgarishlar va bog'lanish",
        p: ["Shartlar o'zgarsa, shu sahifada e'lon qilamiz. Savollar uchun Telegram: @noorain_uz."],
      },
    ],
  },
  'delete-account': {
    title: "Hisobni o'chirish",
    updated: 'Oxirgi yangilanish: 2026-yil 14-oktabr',
    intro: "Noorain hisobingizni va unga bog'liq barcha ma'lumotlarni o'chirishni so'rashingiz mumkin.",
    sections: [
      {
        h: "Qanday so'rash mumkin",
        ordered: true,
        list: [
          "Telegram'da @noorain_uz ga yozing.",
          "Xabarda ilovaga kirgan email manzilingizni ko'rsating va hisobni o'chirishni so'rang.",
          "Hisob sizniki ekanini tasdiqlash uchun o'sha email manzilga xat yuborishimiz mumkin.",
        ],
        p: ["So'rov 30 kun ichida bajariladi va natijasini sizga xabar qilamiz."],
      },
      {
        h: "Nima o'chiriladi",
        list: [
          'Hisobingiz: ism, email va til sozlamasi.',
          "Profilingiz: rasm, tug'ilgan yil, jins, Qur'on o'qish darajasi va maqsad.",
          'Serverdagi tilovat natijalari.',
          "Siz yuborgan «natija noto'g'ri» xabarlari va ularning ovoz yozuvlari.",
        ],
        p: ["O'chirilgan ma'lumotlarni qayta tiklab bo'lmaydi."],
      },
      {
        h: "Telefondagi ma'lumotlar",
        p: [
          "Ilovani telefoningizdan o'chirsangiz, telefonda saqlangan ma'lumotlar (saqlangan oyatlar, sozlamalar, yuklab olingan tarjimalar) ham o'chadi. Hisobdan chiqish uchun: ilovada Sozlama → Chiqish.",
        ],
      },
    ],
  },
}

const ru: Docs = {
  privacy: {
    title: 'Политика конфиденциальности',
    updated: 'Последнее обновление: 14 октября 2026 г.',
    intro:
      'Эта политика объясняет, какие данные использует Android-приложение Noorain и сайт noorain.uz, зачем и как они хранятся. Мы берём только то, что нужно для работы приложения.',
    sections: [
      {
        h: 'Какие данные мы получаем',
        list: [
          'Аккаунт: имя, адрес электронной почты и выбранный язык — для входа и сохранения настроек.',
          'Профиль (по желанию): фото, год рождения, пол, уровень чтения Корана и цель. Для страницы профиля; фото видно только вам, при загрузке из него удаляются метаданные, например местоположение.',
          'Вопросы ИИ-помощнику — отправляются на наш сервер, чтобы подготовить ответ.',
          'Голос при чтении — во время проверки передаётся на наш сервер в реальном времени и не сохраняется.',
          'Результаты чтения: по каждому аяту число слов, верных, ошибочных и пропущенных слов и дата. Сохраняются в аккаунте, чтобы восстановиться на новом телефоне.',
          'Отчёт «результат неверный». Только если вы сами его отправите и дадите согласие, запись этого чтения и результат сохраняются, чтобы улучшить проверку.',
        ],
      },
      {
        h: 'Что остаётся на телефоне',
        p: [
          'Фон экрана блокировки создаётся на самом телефоне. Сохранённые аяты, напоминания и настройки приложения хранятся на телефоне и на сервер не отправляются.',
        ],
      },
      {
        h: 'Сторонние сервисы',
        p: [
          'Чтобы подготовить ответ ИИ, ваш вопрос, предыдущие сообщения беседы, ваше имя и пол (чтобы правильно обращаться к вам) и подходящие фрагменты источников отправляются в сервис искусственного интеллекта Gemini компании Google. Адрес электронной почты, фото и возраст не отправляются.',
          'В приложении нет рекламы и рекламных трекеров. Мы не продаём ваши данные и не используем их для рекламы.',
        ],
      },
      {
        h: 'Хранение и защита',
        p: [
          'Наши серверы находятся в дата-центре Amazon Web Services в Германии (Франкфурт). Приложение связывается с сервером по зашифрованному соединению HTTPS.',
          'Данные хранятся, пока существует ваш аккаунт. При удалении аккаунта все связанные с ним данные удаляются с сервера.',
        ],
      },
      {
        h: 'Ваши права',
        p: [
          'Вы можете запросить копию своих данных, их исправление или полное удаление аккаунта. Как это сделать — на странице «Удаление аккаунта».',
        ],
      },
      { h: 'Связь', p: ['По вопросам и запросам — Telegram: @noorain_uz.'] },
      { h: 'Изменения', p: ['Если политика изменится, мы опубликуем её на этой странице с датой обновления.'] },
    ],
  },
  terms: {
    title: 'Условия использования',
    updated: 'Последнее обновление: 14 октября 2026 г.',
    intro: 'Пользуясь приложением Noorain и сайтом noorain.uz, вы соглашаетесь со следующими условиями.',
    sections: [
      {
        h: 'Сервис',
        p: [
          'Noorain — приложение для чтения Корана, показа аятов на экране блокировки, с ИИ-помощником и проверкой чтения. Сервис предоставляется «как есть» и может время от времени меняться.',
        ],
      },
      {
        h: 'Ответы ИИ',
        p: [
          'Ответы ИИ-помощника опираются на источники, но могут содержать ошибки. Это не фетвы, и они не заменяют совета учёного. В вопросах, требующих религиозного решения, обращайтесь к знающему учёному.',
        ],
      },
      {
        h: 'Проверка чтения',
        p: [
          'Проверка основана на автоматическом распознавании речи и может ошибаться. Используйте её как помощника для практики, а не вместо чтения с устазом.',
        ],
      },
      {
        h: 'Текст Корана и переводы',
        p: [
          'Арабский текст и переводы взяты из надёжных открытых источников, в том числе QuranEnc, и не изменялись. Перевод — это перевод смыслов Корана, а не сам Коран.',
        ],
      },
      {
        h: 'Ваш аккаунт',
        p: [
          'Данные аккаунта должны быть верными, а данные для входа нельзя передавать другим. Запрещено использовать сервис в незаконных целях или во вред другим; в таком случае аккаунт может быть заблокирован.',
        ],
      },
      {
        h: 'Ответственность',
        p: ['В пределах, допустимых законом, мы не отвечаем за косвенный ущерб, возникший при использовании сервиса.'],
      },
      {
        h: 'Изменения и связь',
        p: ['Об изменении условий мы сообщим на этой странице. По вопросам — Telegram: @noorain_uz.'],
      },
    ],
  },
  'delete-account': {
    title: 'Удаление аккаунта',
    updated: 'Последнее обновление: 14 октября 2026 г.',
    intro: 'Вы можете запросить удаление аккаунта Noorain и всех связанных с ним данных.',
    sections: [
      {
        h: 'Как отправить запрос',
        ordered: true,
        list: [
          'Напишите в Telegram: @noorain_uz.',
          'Укажите адрес электронной почты, с которым входите в приложение, и попросите удалить аккаунт.',
          'Чтобы убедиться, что аккаунт ваш, мы можем отправить письмо на этот адрес.',
        ],
        p: ['Запрос выполняется в течение 30 дней, о результате мы вам сообщим.'],
      },
      {
        h: 'Что удаляется',
        list: [
          'Аккаунт: имя, электронная почта и настройка языка.',
          'Профиль: фото, год рождения, пол, уровень чтения Корана и цель.',
          'Результаты чтения на сервере.',
          'Отправленные вами отчёты «результат неверный» и их аудиозаписи.',
        ],
        p: ['Удалённые данные восстановить нельзя.'],
      },
      {
        h: 'Данные на телефоне',
        p: [
          'Если удалить приложение с телефона, данные на телефоне (сохранённые аяты, настройки, загруженные переводы) тоже удаляются. Чтобы выйти из аккаунта: в приложении «Настройки» → «Выйти».',
        ],
      },
    ],
  },
}

const en: Docs = {
  privacy: {
    title: 'Privacy policy',
    updated: 'Last updated: 14 October 2026',
    intro:
      'This policy explains which data the Noorain Android app and the noorain.uz website use, why, and how it is kept. We only take what the app needs to work.',
    sections: [
      {
        h: 'What we collect',
        list: [
          'Account: your name, email address and chosen language, to sign you in and keep your settings.',
          'Profile (optional): your photo, year of birth, gender, Quran reading level and goal, shown on your profile page. The photo is visible only to you, and metadata such as location is stripped when it is uploaded.',
          'Questions you ask the AI assistant, sent to our server to prepare the answer.',
          'Your voice while reciting, streamed to our server in real time for checking and not stored.',
          'Recitation results: for each ayah, the number of words, correct, wrong and skipped words, and the date. Backed up to your account so they come back on a new phone.',
          'A “wrong result” report. Only if you send one yourself and consent is that recitation recording and its result kept, to improve the checker.',
        ],
      },
      {
        h: 'What stays on your phone',
        p: [
          'The lock-screen wallpaper is made on your phone. Saved ayahs, reminders and app settings are kept on the phone and not sent to the server.',
        ],
      },
      {
        h: 'Third-party services',
        p: [
          "To prepare an AI answer, your question, the earlier messages of the conversation, your name and gender (so the answer addresses you correctly) and matching source passages are sent to Google's Gemini artificial-intelligence service. Your email address, photo and age are not sent.",
          'The app has no ads and no ad trackers. We do not sell your data or use it for advertising.',
        ],
      },
      {
        h: 'Storage and security',
        p: [
          'Our servers are in an Amazon Web Services data centre in Germany (Frankfurt). The app talks to the server over encrypted HTTPS.',
          'Data is kept while your account exists. When you delete your account, all data linked to it is removed from the server.',
        ],
      },
      {
        h: 'Your rights',
        p: [
          'You can ask for a copy of your data, ask us to correct it, or have your account deleted completely. The “Delete account” page explains how.',
        ],
      },
      { h: 'Contact', p: ['For questions and requests, Telegram: @noorain_uz.'] },
      { h: 'Changes', p: ['If this policy changes, we will publish it on this page with the date of the update.'] },
    ],
  },
  terms: {
    title: 'Terms of use',
    updated: 'Last updated: 14 October 2026',
    intro: 'By using the Noorain app and the noorain.uz website you agree to the following terms.',
    sections: [
      {
        h: 'The service',
        p: [
          'Noorain is an app for reading the Quran and showing ayahs on the lock screen, with an AI assistant and recitation checking. The service is provided “as is” and may change from time to time.',
        ],
      },
      {
        h: 'AI answers',
        p: [
          "The AI assistant's answers rely on sources but can contain mistakes. They are not fatwas and do not replace a scholar's advice. For anything that needs a religious ruling, ask a trusted scholar.",
        ],
      },
      {
        h: 'Recitation checking',
        p: [
          'Checking is based on automatic speech recognition and can be wrong. Use it as a practice aid, not as a replacement for reciting to a teacher.',
        ],
      },
      {
        h: 'Quran text and translations',
        p: [
          'The Arabic text and translations come from reliable open sources, including QuranEnc, and are not altered. A translation conveys the meanings of the Quran; it is not the Quran itself.',
        ],
      },
      {
        h: 'Your account',
        p: [
          'Keep your account details accurate and do not share your sign-in details. Using the service for unlawful purposes or to harm others is not allowed; in that case the account may be suspended.',
        ],
      },
      {
        h: 'Liability',
        p: ['To the extent the law allows, we are not liable for indirect damage arising from use of the service.'],
      },
      {
        h: 'Changes and contact',
        p: ['If these terms change, we will publish them on this page. For questions, Telegram: @noorain_uz.'],
      },
    ],
  },
  'delete-account': {
    title: 'Delete your account',
    updated: 'Last updated: 14 October 2026',
    intro: 'You can ask us to delete your Noorain account and all data linked to it.',
    sections: [
      {
        h: 'How to ask',
        ordered: true,
        list: [
          'Write to @noorain_uz on Telegram.',
          'Give the email address you sign in with and ask for the account to be deleted.',
          'To confirm the account is yours, we may send an email to that address.',
        ],
        p: ['We complete the request within 30 days and let you know when it is done.'],
      },
      {
        h: 'What is deleted',
        list: [
          'Your account: name, email and language setting.',
          'Your profile: photo, year of birth, gender, Quran reading level and goal.',
          'Recitation results stored on the server.',
          '“Wrong result” reports you sent, with their audio recordings.',
        ],
        p: ['Deleted data cannot be recovered.'],
      },
      {
        h: 'Data on your phone',
        p: [
          'Uninstalling the app removes the data kept on your phone (saved ayahs, settings, downloaded translations). To sign out: Settings → Sign out in the app.',
        ],
      },
    ],
  },
}

function cyr(d: Docs): Docs {
  const conv = (doc: LegalDoc): LegalDoc => ({
    title: toCyrillic(doc.title),
    updated: toCyrillic(doc.updated),
    intro: toCyrillic(doc.intro),
    sections: doc.sections.map((s) => ({
      ...s,
      h: toCyrillic(s.h),
      p: s.p?.map(toCyrillic),
      list: s.list?.map(toCyrillic),
    })),
  })
  return { privacy: conv(d.privacy), terms: conv(d.terms), 'delete-account': conv(d['delete-account']) }
}

export const LEGAL: Record<Lang, Docs> = { uz, uzc: cyr(uz), ru, en }
