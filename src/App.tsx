import { type ReactNode, useEffect, useRef, useState } from 'react'
import { DICTS, LANGS, TELEGRAM_URL, type Dict, type Lang, type LightId, ayah, useLang } from './i18n'
import { LEGAL, type LegalId } from './legal'
import { AppShot, Device, LOCK_AYAHS, LockScreen, RecitationDemo, WALLS, type Wall, hhmm, lockDate, useClock, useReading } from './Phone'
import { AskBox, LiveChat, useAsk } from './Ask'
import { ArrowDown, ArrowLeft, IconMic, IconRefresh, IconSparkles, IconWallpaper, Star, TelegramIcon } from './icons'

const LEGAL_IDS: LegalId[] = ['privacy', 'terms', 'delete-account']

function route(): LegalId | null {
  const p = location.pathname.replace(/\/+$/, '').slice(1)
  return (LEGAL_IDS as string[]).includes(p) ? (p as LegalId) : null
}

export default function App() {
  const [lang, setLang] = useLang()
  const dict = DICTS[lang]
  const page = route()

  useEffect(() => {
    document.title = page ? `${LEGAL[lang][page].title} — Noorain` : dict.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', dict.meta.description)
  }, [lang, page, dict])

  return (
    <>
      <a className="skip" href="#main">
        {dict.skip}
      </a>
      {page ? (
        <LegalPage id={page} lang={lang} setLang={setLang} dict={dict} />
      ) : (
        <Landing lang={lang} setLang={setLang} dict={dict} />
      )}
    </>
  )
}

/* ---------------- Navigation: a floating glass pill ---------------- */

function Brand({ href = '/', light }: { href?: string; light?: boolean }) {
  return (
    <a className="brand" href={href} aria-label="Noorain">
      <img src={light ? '/brand/mark-light.svg' : '/brand/mark-dark.svg'} alt="" width={30} height={30} />
      <span>Noorain</span>
    </a>
  )
}

function LangSwitch({ lang, setLang, label }: { lang: Lang; setLang: (l: Lang) => void; label: string }) {
  return (
    <div className="langs" role="group" aria-label={label}>
      {LANGS.map((l) => (
        <button key={l.id} type="button" lang={l.html} aria-pressed={l.id === lang} title={l.name} onClick={() => setLang(l.id)}>
          {l.short}
        </button>
      ))}
    </div>
  )
}

const lightOf = (dict: Dict, id: LightId) => dict.lights.find((l) => l.id === id)!

function Header({ lang, setLang, dict, links }: { lang: Lang; setLang: (l: Lang) => void; dict: Dict; links?: boolean }) {
  return (
    <header className="nav">
      <div className="nav-pill">
        <Brand />
        {links && (
          <nav className="nav-links" aria-label={dict.nav.sections}>
            <a href="#yordamchi">{lightOf(dict, 'ai').tab}</a>
            <a href="#oyat">{lightOf(dict, 'lock').tab}</a>
            <a href="#tilovat">{lightOf(dict, 'recite').tab}</a>
            <a href="#imkoniyatlar">{dict.nav.features}</a>
            <a href="#savollar">{dict.nav.faq}</a>
          </nav>
        )}
        <div className="nav-right">
          <LangSwitch lang={lang} setLang={setLang} label={dict.nav.language} />
          <a className="nav-tg" href={TELEGRAM_URL} target="_blank" rel="noopener" aria-label={dict.cta}>
            <TelegramIcon className="ic" />
            <span>{dict.nav.telegram}</span>
          </a>
        </div>
      </div>
    </header>
  )
}

function TelegramButton({ label, big }: { label: string; big?: boolean }) {
  return (
    <a className={big ? 'btn btn-big' : 'btn'} href={TELEGRAM_URL} target="_blank" rel="noopener">
      <TelegramIcon className="ic" />
      <span>{label}</span>
    </a>
  )
}

/** True once the element has come into view; used to start a demo only when it can be seen. */
function useSeen<T extends Element>(threshold = 0.35) {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen] as const
}

/* ---------------- Landing ---------------- */

function Landing({ lang, setLang, dict }: { lang: Lang; setLang: (l: Lang) => void; dict: Dict }) {
  const now = useClock()
  const time = hhmm(now)
  const date = lockDate(lang, now)
  const { state: chat, ask } = useAsk(lang)

  return (
    <div className="landing">
      <Header lang={lang} setLang={setLang} dict={dict} links />
      <main id="main">
        <Hero dict={dict} lang={lang} time={time} date={date} />
        <Manifest dict={dict} lang={lang} />
        <AiTile dict={dict} time={time} chat={chat} ask={ask} />
        <LockTile dict={dict} lang={lang} time={time} date={date} />
        <ReciteTile dict={dict} time={time} />
        <Highlights dict={dict} lang={lang} time={time} date={date} />
        <Trust dict={dict} />
        <section className="faq" id="savollar" aria-labelledby="faq-h">
          <h2 id="faq-h" className="section-title">
            {dict.faqTitle}
          </h2>
          <div className="faq-list">
            {dict.faq.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <span className="plus" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="close" aria-labelledby="close-h">
          <div className="close-inner">
            <img src="/brand/mark-dark.svg" alt="" width={72} height={72} className="close-mark" />
            <h2 id="close-h">{dict.close.title}</h2>
            <p className="lede">{dict.close.body}</p>
            <TelegramButton label={dict.cta} big />
            <p className="note">{dict.note}</p>
          </div>
        </section>
      </main>
      <Footer dict={dict} />
    </div>
  )
}

/* ---------------- Hero: three phones under one promise ---------------- */

function Hero({ dict, lang, time, date }: { dict: Dict; lang: Lang; time: string; date: string }) {
  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="hero-copy">
        <h1 id="hero-h">{dict.hero.title}</h1>
        <p className="hero-lede">{dict.hero.lede}</p>
        <div className="hero-actions">
          <TelegramButton label={dict.cta} />
          <a className="link-arrow" href="#yordamchi">
            {dict.hero.features}
            <ArrowDown className="ic" />
          </a>
        </div>
        <p className="hero-note">{dict.note}</p>
        {/* Phones show one device; the three features are one tap away instead. */}
        <nav className="hero-pills" aria-label={dict.hero.lightsLabel}>
          <a href="#yordamchi">
            <IconSparkles className="ic" />
            {lightOf(dict, 'ai').tab}
          </a>
          <a href="#oyat">
            <IconWallpaper className="ic" />
            {lightOf(dict, 'lock').tab}
          </a>
          <a href="#tilovat">
            <IconMic className="ic" />
            {lightOf(dict, 'recite').tab}
          </a>
        </nav>
      </div>
      <div className="fan">
        <figure className="fan-phone fan-l">
          <Device>
            <AppShot src="/img/app-ai-answer.webp" time={time} alt={lightOf(dict, 'ai').title} />
          </Device>
        </figure>
        <figure className="fan-phone fan-r">
          <Device>
            <RecitationDemo read={11} dict={dict} time={time} />
          </Device>
        </figure>
        <figure className="fan-phone fan-c">
          <Device>
            <LockScreen lang={lang} wall="dawn" ayahKey="94:5" date={date} time={time} eager />
          </Device>
        </figure>
      </div>
    </section>
  )
}

/* ---------------- Manifest: the ayah, large, then what Noorain gives ---------------- */

/** Words of the statement turn from grey to ink as it scrolls through the screen. */
function Manifest({ dict, lang }: { dict: Dict; lang: Lang }) {
  const a = ayah(lang, '13:28')
  const text = useRef<HTMLParagraphElement | null>(null)
  useEffect(() => {
    const el = text.current
    if (!el) return
    const words = [...el.querySelectorAll<HTMLElement>('.w-say')]
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      words.forEach((w) => w.classList.add('lit'))
      return
    }
    let lit = -1
    let frame = 0
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const H = innerHeight
      // Lighting starts as the text enters the lower part of the screen and ends above the middle.
      const p = Math.min(1, Math.max(0, (H * 0.9 - r.top) / (r.height + H * 0.35)))
      const n = Math.round(p * words.length)
      if (n === lit) return
      lit = n
      words.forEach((w, i) => w.classList.toggle('lit', i < n))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [lang])
  return (
    <section className="manifest" aria-label={a.ref}>
      <figure className="ayah-moment">
        <p className="ayah-ar" lang="ar" dir="rtl">
          {a.ar}
        </p>
        <div className="ayah-rule" aria-hidden="true">
          <span />
          <Star />
          <span />
        </div>
        <figcaption>
          <p className="ayah-tr">{a.tr}</p>
          <p className="ayah-ref">{a.ref}</p>
        </figcaption>
      </figure>
      <p className="say" ref={text}>
        {dict.manifest.lines.map((line, li) => (
          <span key={li} className="say-line">
            {line.split(' ').map((w, wi) => (
              <span key={wi} className="w-say">
                {w}{' '}
              </span>
            ))}
          </span>
        ))}
      </p>
    </section>
  )
}

/* ---------------- Highlights: everything the app does, card by card ---------------- */

type Card = { key: string; title: string; line: string; tone: string; screen: ReactNode }

function Highlights({ dict, lang, time, date }: { dict: Dict; lang: Lang; time: string; date: string }) {
  const track = useRef<HTMLUListElement | null>(null)
  const [edge, setEdge] = useState<'start' | 'mid' | 'end'>('start')
  const m = dict.more.items
  // The three main features have their own sections; the cards hold everything else.
  const cards: Card[] = [
    { key: 'offline', title: m[0].title, line: m[0].body, tone: 'mist', screen: <AppShot src="/img/app-surahs.webp" time={time} alt="" /> },
    { key: 'notes', title: m[1].title, line: m[1].body, tone: 'paper', screen: <AppShot src="/img/app-reader-note.webp" time={time} alt="" /> },
    { key: 'listen', title: m[2].title, line: m[2].body, tone: 'teal', screen: <AppShot src="/img/app-ayah-menu.webp" time={time} alt="" /> },
    {
      key: 'remind',
      title: m[3].title,
      line: m[3].body,
      tone: 'night',
      screen: (
        // The app's real notification over its lock screen.
        <div className="notif-screen">
          <LockScreen lang={lang} wall="night" ayahKey="2:153" date={date} time={time} />
          <img className="notif" src="/img/app-reminder.webp" alt="" loading="lazy" decoding="async" width={720} height={193} />
        </div>
      ),
    },
  ]

  const onScroll = () => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdge(el.scrollLeft < 8 ? 'start' : el.scrollLeft > max - 8 ? 'end' : 'mid')
  }
  const page = (d: number) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.hl-card')
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: d * step, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section id="imkoniyatlar" className="hl" aria-labelledby="hl-h">
      <h2 id="hl-h" className="section-title">
        {dict.highlights.title}
      </h2>
      <ul className="hl-track" ref={track} onScroll={onScroll}>
        {cards.map((c) => (
          <li key={c.key} className={`hl-card hl-${c.tone}`}>
            <div className="hl-text">
              <h3>{c.title}</h3>
              <p>{c.line}</p>
            </div>
            <div className="hl-media" aria-hidden="true">
              <Device>{c.screen}</Device>
            </div>
          </li>
        ))}
      </ul>
      <div className="hl-nav">
        <button type="button" className="round" aria-label={dict.highlights.prev} disabled={edge === 'start'} onClick={() => page(-1)}>
          <ArrowLeft className="ic" />
        </button>
        <button type="button" className="round" aria-label={dict.highlights.next} disabled={edge === 'end'} onClick={() => page(1)}>
          <ArrowLeft className="ic flip" />
        </button>
      </div>
    </section>
  )
}

/* ---------------- The three main features, each something to try ---------------- */

function Points({ items }: { items: string[] }) {
  return (
    <ul className="points">
      {items.map((p) => (
        <li key={p}>
          <Star className="pt-star" />
          {p}
        </li>
      ))}
    </ul>
  )
}

function DeepHead({ id, title, lede }: { id: string; title: string; lede: string }) {
  return (
    <div className="deep-head">
      <h2 id={id}>{title}</h2>
      <p className="lede">{lede}</p>
    </div>
  )
}

function AiTile({ dict, time, chat, ask }: { dict: Dict; time: string; chat: ReturnType<typeof useAsk>['state']; ask: (q: string) => void }) {
  return (
    <section id="yordamchi" className="deep" aria-labelledby="yordamchi-h">
      <DeepHead id="yordamchi-h" title={dict.ai.title} lede={dict.ai.lede} />
      <div className="tile tile-split">
        <div className="tile-text">
          <Points items={dict.ai.points} />
          <p className="honest">{dict.ai.note}</p>
          <div className="try">
            <h3>{dict.ai.tryTitle}</h3>
            <AskBox dict={dict} state={chat} ask={ask} />
          </div>
        </div>
        <figure className="tile-media">
          <Device>{chat.status === 'idle' ? <AppShot src="/img/app-ai-sources.webp" time={time} alt={dict.ai.title} /> : <LiveChat dict={dict} state={chat} time={time} />}</Device>
          <figcaption aria-live="polite">{chat.status === 'idle' ? dict.ai.captions[0] : dict.ask.liveCaption}</figcaption>
        </figure>
      </div>
    </section>
  )
}

function LockTile({ dict, lang, time, date }: { dict: Dict; lang: Lang; time: string; date: string }) {
  const [wall, setWall] = useState<Wall>('dawn')
  const [k, setK] = useState(2)
  // While the tile is on screen the ayah turns over by itself, as it does every hour on the phone;
  // the first touch hands it to the visitor.
  const [auto, setAuto] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [ref, seen] = useSeen<HTMLDivElement>(0.45)
  useEffect(() => {
    if (!auto || !seen) return
    const t = window.setTimeout(() => setK((v) => (v + 1) % LOCK_AYAHS.length), 6000)
    return () => clearTimeout(t)
  }, [auto, seen, k])
  return (
    <section id="oyat" className="deep" aria-labelledby="oyat-h">
      <DeepHead id="oyat-h" title={dict.lock.title} lede={dict.lock.lede} />
      <div className="tile tile-dark" ref={ref}>
        <figure className="tile-media">
          <Device>
            <LockScreen lang={lang} wall={wall} ayahKey={LOCK_AYAHS[k]} date={date} time={time} />
          </Device>
          <div className="lock-tools">
            <div className="walls" role="radiogroup" aria-label={dict.lock.wallLabel}>
              {WALLS.map((w, i) => (
                <button
                  key={w}
                  type="button"
                  role="radio"
                  aria-checked={w === wall}
                  aria-label={dict.lock.walls[i]}
                  title={dict.lock.walls[i]}
                  className={`wall wall-${w}`}
                  onClick={() => {
                    setAuto(false)
                    setWall(w)
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              className="pill-glass"
              onClick={() => {
                setAuto(false)
                setK((k + 1) % LOCK_AYAHS.length)
              }}
            >
              <IconRefresh className="ic" />
              {dict.lock.another}
            </button>
          </div>
          <figcaption>{dict.lock.captions[0]}</figcaption>
        </figure>
        <ul className="lock-points">
          {dict.lock.points.map((p) => (
            <li key={p}>
              <Star className="pt-star" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ReciteTile({ dict, time }: { dict: Dict; time: string }) {
  const [ref, seen] = useSeen<HTMLDivElement>(0.4)
  const read = useReading(seen)
  return (
    <section id="tilovat" className="deep" aria-labelledby="tilovat-h">
      <DeepHead id="tilovat-h" title={dict.recite.title} lede={dict.recite.lede} />
      <div className="tile tile-split tile-recite">
        <div className="tile-text">
          <Points items={dict.recite.points} />
          <p className="honest">{dict.recite.note}</p>
        </div>
        <div className="tile-media pair" ref={ref}>
          <figure>
            <Device>
              <RecitationDemo read={read} dict={dict} time={time} />
            </Device>
            <figcaption>{lightOf(dict, 'recite').caption}</figcaption>
          </figure>
          <figure>
            <Device>
              <AppShot src="/img/app-recite-history.webp" time={time} alt={dict.recite.captions[1]} />
            </Device>
            <figcaption>{dict.recite.captions[1]}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

function Trust({ dict }: { dict: Dict }) {
  return (
    <section className="trust" aria-labelledby="trust-h">
      <h2 id="trust-h" className="section-title">
        {dict.trust.title}
      </h2>
      <ul className="trust-list">
        {dict.trust.items.map((t) => (
          <li key={t.title}>
            <h3>{t.title}</h3>
            <p>{t.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- Footer ---------------- */

function Footer({ dict }: { dict: Dict }) {
  return (
    <footer className="foot">
      <div className="foot-inner">
        <div className="foot-brand">
          <Brand light />
          <p>{dict.footer.tagline}</p>
        </div>
        <nav className="foot-links" aria-label="Noorain">
          <a href="/privacy">{dict.footer.privacy}</a>
          <a href="/terms">{dict.footer.terms}</a>
          <a href="/delete-account">{dict.footer.del}</a>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener">
            Telegram · @noorain_uz
          </a>
        </nav>
        <p className="foot-copy">© 2026 Noorain</p>
      </div>
    </footer>
  )
}

/* ---------------- Legal pages ---------------- */

function linkify(text: string) {
  const parts = text.split(/(@noorain_uz)/)
  return parts.map((p, i) =>
    p === '@noorain_uz' ? (
      <a key={i} href={TELEGRAM_URL} target="_blank" rel="noopener">
        @noorain_uz
      </a>
    ) : (
      p
    ),
  )
}

function LegalPage({ id, lang, setLang, dict }: { id: LegalId; lang: Lang; setLang: (l: Lang) => void; dict: Dict }) {
  const doc = LEGAL[lang][id]
  return (
    <div className="legal-page">
      <Header lang={lang} setLang={setLang} dict={dict} />
      <div className="legal-band">
        <div className="legal-band-inner">
          <a className="back" href="/">
            <ArrowLeft className="ic" />
            {dict.backHome}
          </a>
          <h1>{doc.title}</h1>
          <p className="updated">{doc.updated}</p>
        </div>
      </div>
      <main id="main" className="legal">
        <nav className="legal-tabs" aria-label="Noorain">
          {LEGAL_IDS.map((l) => (
            <a key={l} href={`/${l}`} aria-current={l === id ? 'page' : undefined}>
              {LEGAL[lang][l].title}
            </a>
          ))}
        </nav>
        <p className="legal-intro">{doc.intro}</p>
        {doc.sections.map((s, i) => (
          <section key={i}>
            <h2>{s.h}</h2>
            {s.list &&
              (s.ordered ? (
                <ol>
                  {s.list.map((li, j) => (
                    <li key={j}>{linkify(li)}</li>
                  ))}
                </ol>
              ) : (
                <ul>
                  {s.list.map((li, j) => (
                    <li key={j}>{linkify(li)}</li>
                  ))}
                </ul>
              ))}
            {s.p?.map((p, j) => <p key={j}>{linkify(p)}</p>)}
          </section>
        ))}
      </main>
      <Footer dict={dict} />
    </div>
  )
}
