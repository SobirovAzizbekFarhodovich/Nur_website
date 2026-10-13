import { useEffect, useState } from 'react'
import { type Dict, type Lang, ayah } from './i18n'
import { Star } from './icons'

export type SceneSpec = {
  time: string
  sky: 'dawn' | 'morning' | 'noon' | 'dusk' | 'night' | 'late'
  screen: 'lock' | 'ai' | 'recite' | 'reader'
  wall?: 'dawn' | 'morning' | 'night'
  ayah?: string
}

export const SCENES: SceneSpec[] = [
  { time: '05:12', sky: 'dawn', screen: 'lock', wall: 'dawn', ayah: '94:5' },
  { time: '09:00', sky: 'morning', screen: 'lock', wall: 'morning', ayah: '2:152' },
  { time: '13:00', sky: 'noon', screen: 'ai' },
  { time: '18:40', sky: 'dusk', screen: 'recite' },
  { time: '21:30', sky: 'night', screen: 'reader' },
  { time: '22:30', sky: 'late', screen: 'lock', wall: 'night', ayah: '2:153' },
]

/** Digits that roll in from below when the hour changes. */
function Clock({ time, roll }: { time: string; roll: boolean }) {
  return (
    <span className="clock" aria-label={time}>
      {time.split('').map((ch, i) => (
        <span className="clock-cell" key={roll ? `${i}-${ch}` : i} aria-hidden="true">
          <span className={roll ? 'clock-digit roll' : 'clock-digit'}>{ch}</span>
        </span>
      ))}
    </span>
  )
}

function LockScreen({ spec, lang, dict, roll, time }: { spec: SceneSpec; lang: Lang; dict: Dict; roll: boolean; time: string }) {
  const a = ayah(lang, spec.ayah!)
  return (
    <div className="lock">
      <img className="lock-wall" src={`/img/wall-${spec.wall}.webp`} alt="" loading={spec.wall === 'dawn' ? 'eager' : 'lazy'} decoding="async" />
      <div className="lock-shade" />
      <div className="lock-date">{dict.phone.date}</div>
      <Clock time={time} roll={roll} />
      <div className="lock-verse">
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

function StatusBar({ time }: { time: string }) {
  return (
    <div className="statusbar">
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

function AppShot({ src, time, alt }: { src: string; time: string; alt: string }) {
  return (
    <div className="appshot">
      <StatusBar time={time} />
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

function RecitationDemo({ active, dict, time }: { active: boolean; dict: Dict; time: string }) {
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const [n, setN] = useState(reduce ? FATIHA.length : 0)
  useEffect(() => {
    if (!active || reduce) return
    setN(0)
    let i = 0
    const id = window.setInterval(() => {
      i++
      if (i > FATIHA.length + 6) i = 0
      setN(Math.min(i, FATIHA.length))
    }, 520)
    return () => window.clearInterval(id)
  }, [active, reduce])
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
                      {'\u06DD' + x.end}
                    </span>
                  )}{' '}
                </span>
              )
            })}
          </p>
        </div>
        <div className="recite-legend">
          <span><i className="dot dot-ok" />{dict.phone.correct} <b>{correct}</b></span>
          <span><i className="dot dot-harakat" />{dict.phone.harakat} <b>{n > SLIP ? 1 : 0}</b></span>
        </div>
        <div className="recite-spacer" />
        <div className={done ? 'mic' : 'mic live'}>
          <Star className="mic-frame" />
          <span className="mic-core">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z" fill="currentColor" /></svg>
          </span>
        </div>
        <p className="mic-label">{done ? ' ' : `${dict.phone.listening}…`}</p>
      </div>
    </div>
  )
}

export function ScreenFor({ spec, index, active, lang, dict, roll, time = spec.time }: { spec: SceneSpec; index: number; active: boolean; lang: Lang; dict: Dict; roll: boolean; time?: string }) {
  switch (spec.screen) {
    case 'lock':
      return <LockScreen spec={spec} lang={lang} dict={dict} roll={roll} time={time} />
    case 'ai':
      return <AppShot src="/img/screen-ai.webp" time={time} alt={dict.scenes[index].title} />
    case 'reader':
      return <AppShot src="/img/screen-reader.webp" time={time} alt={dict.scenes[index].title} />
    case 'recite':
      return <RecitationDemo active={active} dict={dict} time={time} />
  }
}

/** The sticky phone: every hour's screen stacked; the scroll loop sets each one's opacity. */
export function Phone({ active, lang, dict, time, screenRef }: { active: number; lang: Lang; dict: Dict; time: string; screenRef: (i: number, el: HTMLDivElement | null) => void }) {
  return (
    <div className="phone">
      <div className="phone-screen">
        {SCENES.map((s, i) => (
          <div key={i} ref={(el) => screenRef(i, el)} className={i === 0 ? 'screen live on' : 'screen live'} aria-hidden={i !== active}>
            <ScreenFor spec={s} index={i} active={i === active} lang={lang} dict={dict} roll={false} time={time} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function StaticPhone({ index, lang, dict, active }: { index: number; lang: Lang; dict: Dict; active: boolean }) {
  return (
    <div className="phone phone-inline">
      <div className="phone-screen">
        <div className="screen on">
          <ScreenFor spec={SCENES[index]} index={index} active={active} lang={lang} dict={dict} roll={false} />
        </div>
      </div>
    </div>
  )
}
