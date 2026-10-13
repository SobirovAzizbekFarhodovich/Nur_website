import { useEffect, useRef, useState } from 'react'
import { DICTS, LANGS, TELEGRAM_URL, type Dict, type Lang, useLang } from './i18n'
import { LEGAL, type LegalId } from './legal'
import { Phone, SCENES, StaticPhone } from './Phone'
import { ArrowDown, ArrowLeft, Star, TelegramIcon } from './icons'
import { Sky, luminance, skyAt } from './sky'

const clamp = (v: number) => Math.min(1, Math.max(0, v))
// Minutes past midnight of each hour in the story.
const MINUTES = SCENES.map((s) => {
  const [h, m] = s.time.split(':').map(Number)
  return h * 60 + m
})
function minuteAt(p: number) {
  const i = Math.min(Math.floor(p), MINUTES.length - 2)
  const t = Math.min(1, Math.max(0, p - i))
  // p only moves between scenes (it holds on whole numbers while a scene is read).
  return Math.round(MINUTES[i] + (MINUTES[i + 1] - MINUTES[i]) * t)
}
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const formatMinute = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

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

/* ---------------- Header ---------------- */

function Brand({ href = '/' }: { href?: string }) {
  return (
    <a className="brand" href={href} aria-label="Noorain">
      <img src="/brand/mark-dark.svg" alt="" width={36} height={36} />
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

function Header({ lang, setLang, dict, solid }: { lang: Lang; setLang: (l: Lang) => void; dict: Dict; solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={solid || scrolled ? 'top solid' : 'top'}>
      <Brand />
      <div className="top-right">
        <LangSwitch lang={lang} setLang={setLang} label={dict.nav.language} />
        <a className="top-tg" href={TELEGRAM_URL} target="_blank" rel="noopener">
          <TelegramIcon className="ic" />
          <span>{dict.nav.telegram}</span>
        </a>
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

/* ---------------- Landing: one day ---------------- */

function Landing({ lang, setLang, dict }: { lang: Lang; setLang: (l: Lang) => void; dict: Dict }) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
        }
      },
      { rootMargin: '-48% 0px -48% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  // The scroll position as a continuous hour, p: 0 at the first scene's centre … 5 at the last.
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const screens = useRef<(HTMLDivElement | null)[]>([])
  const [minute, setMinute] = useState(MINUTES[0])

  useEffect(() => {
    const root = document.documentElement
    const sky = canvas.current ? new Sky(canvas.current) : null
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    // For each scene, the scroll range (as the viewport's centre line) in which its text is
    // fully on screen. The story holds on that hour there and moves only between them.
    let holds: [number, number][] = []
    let p = 0
    let lastMinute = -1
    let day = false
    let frame = 0
    let twinkle = 0
    let storyVisible = true

    const measure = () => {
      const H = innerHeight
      const top = document.querySelector('.top')?.getBoundingClientRect().bottom ?? 0
      const strip = document.querySelector('.hours')?.getBoundingClientRect().bottom ?? 0
      const head = Math.max(top, strip)
      holds = refs.current.map((el) => {
        const text = el?.querySelector('.scene-text')
        if (!text) return [0, 0]
        const r = text.getBoundingClientRect()
        const a = r.top + scrollY
        const b = r.bottom + scrollY
        // Text is fully visible while centre ∈ [b - H/2, a - head + H/2].
        const start = b - H / 2
        const end = a - head + H / 2
        return start <= end ? [start, end] : [(start + end) / 2, (start + end) / 2]
      })
      // Neighbouring holds must leave room for the crossover.
      for (let i = 0; i < holds.length - 1; i++) {
        const gap = holds[i + 1][0] - holds[i][1]
        if (gap < 120) {
          const mid = (holds[i][1] + holds[i + 1][0]) / 2
          holds[i][1] = mid - 60
          holds[i + 1][0] = mid + 60
        }
      }
      // Open sky between the copy and the sticky phone (wide layouts only).
      const phone = document.querySelector('.device .phone')?.getBoundingClientRect()
      // The hero's copy is wider, but the sun is still below the ridge while it is on screen.
      const textRight = Math.max(...[...document.querySelectorAll('.scene:not(.scene-0) .scene-text')].map((t) => t.getBoundingClientRect().right))
      // The sun's disc must fit in that gap with a margin; otherwise phones' faint mode.
      const R = Math.min(innerWidth, innerHeight) * 0.034
      let gapX: number | null = null
      if (phone && phone.width > 0) {
        const lo = textRight + R + 16
        const hi = phone.left - R - 16
        if (lo <= hi) gapX = Math.min(hi, Math.max(lo, (textRight + phone.left) / 2))
      }
      sky?.setLayout({ gapX })
      sky?.resize()
    }
    const progress = () => {
      const v = scrollY + innerHeight / 2
      for (let i = 0; i < holds.length - 1; i++) {
        if (v <= holds[i][1]) return i
        if (v < holds[i + 1][0]) return i + (v - holds[i][1]) / (holds[i + 1][0] - holds[i][1])
      }
      return holds.length - 1
    }
    const render = (t: number) => {
      frame = 0
      p = progress()
      // The canvas is covered once the story has scrolled away (FAQ, footer).
      if (storyVisible) sky?.draw(p, t, still)
      root.style.setProperty('--p', p.toFixed(4))
      // Screens cross over between hours, as if pulled by the finger.
      screens.current.forEach((el, i) => {
        if (!el) return
        const d = p - i
        // In the middle of the gap the incoming screen (later in the stack, so on top) is pulled
        // up from the bottom edge over the outgoing one, like a finger dragging it in. Each
        // pixel shows one screen; only a thin feathered seam blends the two.
        const incoming = d < 0
        let shown = incoming ? smooth(0.3, 0.7, 1 + d) : d < 0.7 ? 1 : 0
        if (still) shown = Math.round(shown)
        const wiping = incoming && shown > 0.001 && shown < 0.999
        el.style.opacity = shown > 0.001 ? '1' : '0'
        el.style.visibility = shown > 0.001 ? 'visible' : 'hidden'
        // The seam rises from the bottom: below it the incoming screen, above it the old one.
        const edge = (1 - shown) * 106 - 6
        const mask = wiping ? `linear-gradient(to bottom, transparent ${edge.toFixed(2)}%, #000 ${(edge + 6).toFixed(2)}%)` : 'none'
        el.style.maskImage = mask
        el.style.setProperty('-webkit-mask-image', mask)
      })
      const m = still ? MINUTES[Math.round(p)] : minuteAt(p)
      if (m !== lastMinute) {
        lastMinute = m
        setMinute(m)
      }
      // Text switches to ink when the sky behind it turns pale (WCAG crossover ≈ 0.19).
      const k = skyAt(p)
      // The phone's rim and shadow catch the light of the hour.
      root.style.setProperty('--sky-glow', `rgb(${k.glow.map((c) => c | 0).join(',')})`)
      root.style.setProperty('--sky-glow-a', (0.25 + k.glowA * 0.45).toFixed(3))
      const isDay = luminance(k.mid) > 0.19
      if (isDay !== day) {
        day = isDay
        root.classList.toggle('day', day)
      }
      wake()
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }
    // Stars twinkle at night. The loop runs only while stars are on screen, on wide screens,
    // with the tab visible and the story in view; otherwise nothing is drawn between scrolls.
    let lastTwinkle = 0
    const wanted = () => !still && innerWidth >= 900 && storyVisible && !document.hidden && (p > 3.3 || p < 0.9)
    const tick = (t: number) => {
      if (!wanted()) {
        twinkle = 0
        return
      }
      twinkle = requestAnimationFrame(tick)
      if (t - lastTwinkle > 60) {
        lastTwinkle = t
        request()
      }
    }
    function wake() {
      if (!twinkle && wanted()) twinkle = requestAnimationFrame(tick)
    }
    const story = document.querySelector('.story')
    const seen = new IntersectionObserver(([e]) => {
      storyVisible = e.isIntersecting
      request()
    })
    if (story) seen.observe(story)
    const onVisibility = () => wake()
    document.addEventListener('visibilitychange', onVisibility)
    measure()
    render(performance.now())
    addEventListener('scroll', request, { passive: true })
    const onResize = () => {
      measure()
      request()
    }
    addEventListener('resize', onResize)
    const ro = new ResizeObserver(onResize)
    ro.observe(document.body)
    return () => {
      seen.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      removeEventListener('scroll', request)
      removeEventListener('resize', onResize)
      ro.disconnect()
      cancelAnimationFrame(frame)
      cancelAnimationFrame(twinkle)
      twinkle = -1
      root.classList.remove('day')
    }
  }, [])

  const goTo = (i: number) => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    refs.current[i]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
  }

  const last = SCENES.length - 1

  return (
    <>
      <div className="sky" aria-hidden="true">
        <canvas ref={canvas} />
      </div>
      <Header lang={lang} setLang={setLang} dict={dict} />
      <nav className="hours" aria-label={dict.railLabel}>
        <div className="hours-inner">
          {SCENES.map((s, i) => (
            <button key={i} type="button" className={i === active ? 'on' : ''} aria-current={i === active ? 'step' : undefined} onClick={() => goTo(i)}>
              {s.time}
            </button>
          ))}
          <span className="hours-star" aria-hidden="true">
            <Star />
          </span>
        </div>
      </nav>

      <main id="main" className="story">
        <div className="scenes">
          {dict.scenes.map((sc, i) => (
            <section
              key={i}
              ref={(el) => {
                refs.current[i] = el
              }}
              data-i={i}
              className={`scene scene-${i}${i === active ? ' is-on' : ''}`}
              aria-labelledby={`sc-${i}`}
            >
              <div className="scene-text">
                {i === 0 ? (
                  <h1 id="sc-0">{sc.title}</h1>
                ) : (
                  <h2 id={`sc-${i}`}>{sc.title}</h2>
                )}
                <p className="lede">{sc.body}</p>
                {i === 0 && (
                  <>
                    <div className="actions">
                      <TelegramButton label={dict.cta} />
                      <button type="button" className="textlink" onClick={() => goTo(1)}>
                        {dict.how}
                        <ArrowDown className="ic" />
                      </button>
                    </div>
                    <p className="note">{dict.note}</p>
                  </>
                )}
                {i === last && (
                  <div className="actions">
                    <TelegramButton label={dict.closeCta} big />
                  </div>
                )}
              </div>
              <figure className="scene-phone">
                <StaticPhone index={i} lang={lang} dict={dict} active={i === active} />
                <figcaption>{sc.caption}</figcaption>
                {i === 0 && <p className="note note-m">{dict.note}</p>}
              </figure>
            </section>
          ))}
        </div>

        <div className="device" aria-hidden="true">
          <div className="device-inner">
            <figure className="device-fig">
              <Phone
                active={active}
                lang={lang}
                dict={dict}
                time={formatMinute(minute)}
                screenRef={(i, el) => {
                  screens.current[i] = el
                }}
              />
              <figcaption key={`${lang}-${active}`}>{dict.scenes[active].caption}</figcaption>
            </figure>
            <ol className="rail" aria-label={dict.railLabel}>
              <span className="rail-line" />
              <span className="rail-star">
                <Star />
              </span>
              {SCENES.map((s, i) => (
                <li key={i}>
                  <button type="button" tabIndex={-1} className={i === active ? 'on' : ''} onClick={() => goTo(i)}>
                    {s.time}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>

      <section className="faq" aria-labelledby="faq-h">
        <div className="faq-inner">
          <h2 id="faq-h">{dict.faqTitle}</h2>
          <dl>
            {dict.faq.map((f, i) => (
              <div key={i} className="faq-row">
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <Footer dict={dict} />
    </>
  )
}

/* ---------------- Footer ---------------- */

function Footer({ dict }: { dict: Dict }) {
  return (
    <footer className="foot">
      <div className="foot-inner">
        <div className="foot-brand">
          <Brand />
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
      <Header lang={lang} setLang={setLang} dict={dict} solid />
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
