import { useEffect, useRef, useState } from 'react'
import { DICTS, LANGS, TELEGRAM_URL, type Dict, type Lang, useLang } from './i18n'
import { LEGAL, type LegalId } from './legal'
import { Phone, SCENES, StaticPhone } from './Phone'
import { ArrowDown, ArrowLeft, Star, TelegramIcon } from './icons'

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

  // The midday sky is pale: the story's text switches to ink while it is on.
  useEffect(() => {
    document.documentElement.classList.toggle('day', SCENES[active].sky === 'noon')
    return () => document.documentElement.classList.remove('day')
  }, [active])

  const goTo = (i: number) => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    refs.current[i]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
  }

  const last = SCENES.length - 1

  return (
    <>
      <div className="sky" aria-hidden="true">
        {SCENES.map((s, i) => (
          <div key={i} className={`sky-layer sky-${s.sky}${i === active ? ' on' : ''}`} />
        ))}
      </div>
      <Header lang={lang} setLang={setLang} dict={dict} />
      <nav className="hours" aria-label={dict.railLabel}>
        <div className="hours-inner" style={{ ['--hour' as string]: active }}>
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
              <Phone active={active} lang={lang} dict={dict} />
              <figcaption key={`${lang}-${active}`}>{dict.scenes[active].caption}</figcaption>
            </figure>
            <ol className="rail" aria-label={dict.railLabel}>
              <span className="rail-line" />
              <span className="rail-star" style={{ transform: `translateY(calc(${active} * var(--rail-step)))` }}>
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
