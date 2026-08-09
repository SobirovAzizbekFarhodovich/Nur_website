import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // If intro already played this session, skip animation and notify parent immediately
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('cinematicIntroPlayed')) {
        setVisible(false)
        onComplete()
        return
      }
    } catch (e) {
      // ignore sessionStorage errors
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.4,
            ease: 'power2.inOut',
            onComplete: () => setVisible(false),
          })
          // mark as played for this session so it won't repeat
          try { sessionStorage.setItem('cinematicIntroPlayed', '1') } catch (e) {}
          setTimeout(onComplete, 1300)
        },
      })

      // "FROM SCREEN" — word by word stagger
      tl.fromTo(
        '.intro-word-from',
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', stagger: 0.15 },
        0.8
      )

      // pause
      tl.to({}, { duration: 0.5 })

      // "TO SOUL" — word by word stagger
      tl.fromTo(
        '.intro-word-to',
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', stagger: 0.15 },
        '+=0'
      )

      // pause
      tl.to({}, { duration: 0.5 })

      // Divider line grows
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.inOut' }
      )

      // Brand
      tl.fromTo(
        brandRef.current,
        { opacity: 0, y: 15, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
        '-=0.3'
      )

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )

      // Hold
      tl.to({}, { duration: 1.6 })
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: '#020202',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      }}
    >
      {/* Atmospheric glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 45% at 50% 52%, rgba(6,78,59,0.2) 0%, transparent 70%)',
      }} />

      {/* Subtle scan line */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.005) 2px, rgba(255,255,255,0.005) 4px)',
      }} />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, userSelect: 'none' }}>
        {/* FROM SCREEN */}
        <div ref={line1Ref} style={{ marginBottom: '0.2rem', lineHeight: 1 }}>
          {['From', 'Screen'].map((word, i) => (
            <span
              key={word}
              className={`intro-word-from`}
              style={{
                display: 'inline-block',
                opacity: 0,
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
                fontWeight: i === 1 ? 600 : 300,
                letterSpacing: '0.3em',
                color: i === 1 ? '#f5f0e8' : '#8a8680',
                textTransform: 'uppercase',
                marginRight: i === 0 ? '0.3em' : 0,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* TO SOUL */}
        <div ref={line2Ref} style={{ marginBottom: '3.5rem', lineHeight: 1 }}>
          {['To', 'Soul'].map((word, i) => (
            <span
              key={word}
              className={`intro-word-to`}
              style={{
                display: 'inline-block',
                opacity: 0,
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
                fontWeight: i === 1 ? 700 : 300,
                fontStyle: i === 1 ? 'italic' : 'normal',
                letterSpacing: '0.3em',
                color: i === 1 ? '#a0845c' : '#8a8680',
                textTransform: 'uppercase',
                marginRight: i === 0 ? '0.3em' : 0,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          style={{
            width: '60px', height: '1px',
            background: 'linear-gradient(90deg, transparent, #a0845c, transparent)',
            margin: '0 auto 2rem',
            opacity: 0, transformOrigin: 'center',
          }}
        />

        {/* Brand */}
        <div ref={brandRef} style={{ opacity: 0, marginBottom: '0.9rem' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
            fontWeight: 400,
            letterSpacing: '0.55em',
            color: '#064e3b',
            textTransform: 'uppercase',
          }}>
            ☪ &nbsp; Islamic AI
          </p>
        </div>

        {/* Tagline */}
        <div ref={taglineRef} style={{ opacity: 0 }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.62rem, 1.2vw, 0.78rem)',
            fontWeight: 300,
            letterSpacing: '0.35em',
            color: '#5a4a30',
            textTransform: 'uppercase',
          }}>
            Qur'an &nbsp;·&nbsp; Knowledge &nbsp;·&nbsp; Reflection
          </p>
        </div>
      </div>
    </div>
  )
}
