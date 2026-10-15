import { type ReactNode, useEffect, useRef, useState } from 'react'
import { type Dict, type Lang, ayah, toCyrillic } from './i18n'
import { Star } from './icons'

/* ---------------- Time: the visitor's own clock and date ---------------- */

const pad = (n: number) => String(n).padStart(2, '0')

/** The current local time as HH:MM, ticking over on the minute. */
export function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    let t = 0
    const tick = () => {
      setNow(new Date())
      t = window.setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50)
    }
    t = window.setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50)
    return () => clearTimeout(t)
  }, [])
  return now
}

export const hhmm = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`

const UZ_DAYS = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']
const UZ_MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']

/** The lock screen's date line, as the app writes it ("Payshanba, 15 oktabr"). */
export function lockDate(lang: Lang, d: Date) {
  if (lang === 'uz' || lang === 'uzc') {
    const s = `${UZ_DAYS[d.getDay()]}, ${d.getDate()} ${UZ_MONTHS[d.getMonth()]}`
    return lang === 'uzc' ? toCyrillic(s) : s
  }
  const s = new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(d)
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/* ---------------- The device ---------------- */

/** A near-black phone around one or more screens; its width comes from --pw. */
export function Device({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className ? `phone ${className}` : 'phone'}>
      <div className="phone-screen">{children}</div>
    </div>
  )
}

/* ---------------- Screens ---------------- */

export type Wall = 'dawn' | 'morning' | 'night'
export const WALLS: Wall[] = ['dawn', 'morning', 'night']
export const LOCK_AYAHS = ['94:5', '2:152', '13:28', '2:153']

/** The app's lock-screen renderer: wallpaper, shade, date, clock, Arabic, gold rule, translation, reference. */
export function LockScreen({ lang, wall, ayahKey, date, time, eager }: { lang: Lang; wall: Wall; ayahKey: string; date: string; time: string; eager?: boolean }) {
  const a = ayah(lang, ayahKey)
  // A new wallpaper fades in over the one it replaces.
  const shown = useRef(wall)
  const [under, setUnder] = useState<Wall | null>(null)
  useEffect(() => {
    if (shown.current !== wall) {
      setUnder(shown.current)
      shown.current = wall
    }
  }, [wall])
  return (
    <div className="lock">
      {under && <img className="lock-wall" src={`/img/wall-${under}.webp`} alt="" decoding="async" />}
      <img key={wall} className={under ? 'lock-wall lock-wall-in' : 'lock-wall'} src={`/img/wall-${wall}.webp`} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" />
      <div className="lock-shade" />
      <div className="lock-date">{date}</div>
      <div className="clock">{time}</div>
      <div className="lock-verse" key={ayahKey}>
        <p className="lock-ar" lang="ar" dir="rtl">
          {a.ar}
        </p>
        <div className="lock-rule" aria-hidden="true">
          <span />
          <Star className="lock-star" />
          <span />
        </div>
        <p className="lock-tr">{a.tr}</p>
        <p className="lock-ref">{a.ref}</p>
      </div>
    </div>
  )
}

export function StatusBar({ time, tone = 'green' }: { time: string; tone?: 'green' | 'night' }) {
  return (
    <div className={`statusbar statusbar-${tone}`}>
      <span>{time}</span>
      <svg viewBox="0 0 46 12" aria-hidden="true">
        <path d="M1.2 4.6a9.6 9.6 0 0 1 12.6 0M3.6 7.2a6 6 0 0 1 7.8 0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="7.5" cy="9.9" r="1.3" fill="currentColor" />
        <rect x="17" y="7" width="2" height="4" rx=".5" fill="currentColor" />
        <rect x="20.5" y="5" width="2" height="6" rx=".5" fill="currentColor" />
        <rect x="24" y="3" width="2" height="8" rx=".5" fill="currentColor" />
        <rect x="31" y="2" width="12" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <rect x="32.6" y="3.6" width="8.8" height="4.8" rx="1" fill="currentColor" />
        <rect x="43.6" y="4.5" width="1.4" height="3" rx=".6" fill="currentColor" />
      </svg>
    </div>
  )
}

/** A real app screenshot (status bar cropped off) under a drawn status bar showing the live time. */
export function AppShot({ src, time, alt, tone = 'night' }: { src: string; time: string; alt: string; tone?: 'green' | 'night' }) {
  return (
    <div className={`appshot appshot-${tone}`}>
      <StatusBar time={time} tone={tone} />
      <img src={src} alt={alt} loading="lazy" decoding="async" width={640} height={1364} />
    </div>
  )
}

/* Al-Fatiha 1:2–1:5, word by word. */
const FATIHA: { w: string; end?: string }[] = [
  { w: 'ٱلْحَمْدُ' }, { w: 'لِلَّهِ' }, { w: 'رَبِّ' }, { w: 'ٱلْعَٰلَمِينَ', end: '٢' },
  { w: 'ٱلرَّحْمَٰنِ' }, { w: 'ٱلرَّحِيمِ', end: '٣' },
  { w: 'مَٰلِكِ' }, { w: 'يَوْمِ' }, { w: 'ٱلدِّينِ', end: '٤' },
  { w: 'إِيَّاكَ' }, { w: 'نَعْبُدُ' }, { w: 'وَإِيَّاكَ' }, { w: 'نَسْتَعِينُ', end: '٥' },
]
const SLIP = 10 // «نَعْبُدُ» is the sample harakat slip

export const FATIHA_WORDS = FATIHA.length

/** The recitation check, drawn in the app's own components: n words have been "recited" so far. */
export function RecitationDemo({ read, dict, time }: { read: number; dict: Dict; time: string }) {
  const n = Math.max(0, Math.min(FATIHA.length, read))
  const done = n >= FATIHA.length
  const correct = Math.max(0, n - (n > SLIP ? 1 : 0))
  return (
    <div className="recite">
      <StatusBar time={time} />
      <div className="recite-band">
        <p className="recite-title">{dict.phone.reciteTitle}</p>
        <p className="recite-sub">{dict.phone.reciteSub}</p>
      </div>
      <div className="recite-body">
        <div className="recite-card">
          <div className="recite-card-top">
            <span className="recite-ref">1:2–5</span>
            <span className="recite-sample">{dict.phone.sample}</span>
          </div>
          <p className="recite-ar" lang="ar" dir="rtl">
            {FATIHA.map((x, i) => {
              const state = i < n ? (i === SLIP ? 'harakat' : 'ok') : i === n ? 'now' : 'wait'
              return (
                <span key={i}>
                  <span className={`w w-${state}`}>{x.w}</span>
                  {x.end && (
                    <span className="ayah-end" aria-hidden="true">
                      {'۝' + x.end}
                    </span>
                  )}{' '}
                </span>
              )
            })}
          </p>
        </div>
        <div className="recite-legend">
          <span>
            <i className="dot dot-ok" />
            {dict.phone.correct} <b>{correct}</b>
          </span>
          <span>
            <i className="dot dot-harakat" />
            {dict.phone.harakat} <b>{n > SLIP ? 1 : 0}</b>
          </span>
        </div>
        <div className="recite-spacer" />
        <div className={done ? 'mic' : 'mic live'}>
          <Star className="mic-frame" />
          <span className="mic-core">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z" fill="currentColor" />
            </svg>
          </span>
        </div>
        <p className="mic-label">{done ? ' ' : `${dict.phone.listening}…`}</p>
      </div>
    </div>
  )
}

/** Plays the recitation sample through once while `playing`, a word every 420 ms. */
export function useReading(playing: boolean) {
  const still = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const [n, setN] = useState(still ? FATIHA_WORDS : 0)
  useEffect(() => {
    if (still) return
    if (!playing) return
    setN(0)
    let i = 0
    const t = window.setInterval(() => {
      i += 1
      setN(i)
      if (i >= FATIHA_WORDS) clearInterval(t)
    }, 420)
    return () => clearInterval(t)
  }, [playing, still])
  return n
}
