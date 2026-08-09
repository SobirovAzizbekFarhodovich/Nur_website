import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function MosqueSkyline() {
  return (
    <svg
      viewBox="0 0 1000 260"
      preserveAspectRatio="xMidYMax meet"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a0845c" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#a0845c" stopOpacity="0.06" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Stars */}
      {[80,160,240,600,680,760,840,920,50,980,300,420,550].map((x, i) => (
        <circle key={i} cx={x} cy={10 + (i % 5) * 16} r={i % 3 === 0 ? 1.2 : 0.7}
          fill="#c4a97d" opacity={0.25 + (i % 4) * 0.1}
        />
      ))}

      {/* Distant skyline — low buildings */}
      <rect x="0" y="210" width="150" height="50" fill="url(#skyGrad)" />
      <rect x="140" y="195" width="80" height="65" fill="url(#skyGrad)" />
      <rect x="800" y="200" width="100" height="60" fill="url(#skyGrad)" />
      <rect x="880" y="215" width="120" height="45" fill="url(#skyGrad)" />

      {/* Far left minaret */}
      <rect x="175" y="150" width="12" height="110" fill="url(#skyGrad)" />
      <path d="M175,150 Q181,135 187,150" fill="url(#skyGrad)" />
      {/* Far right minaret */}
      <rect x="813" y="145" width="12" height="115" fill="url(#skyGrad)" />
      <path d="M813,145 Q819,130 825,145" fill="url(#skyGrad)" />

      {/* Left wing structure */}
      <rect x="280" y="190" width="120" height="70" fill="url(#skyGrad)" />
      <path d="M280,190 Q340,175 400,190" fill="url(#skyGrad)" />

      {/* Left minaret */}
      <rect x="345" y="110" width="18" height="150" fill="url(#skyGrad)" />
      <path d="M345,110 Q354,92 363,110" fill="url(#skyGrad)" />
      <circle cx="354" cy="90" r="5" fill="url(#skyGrad)" />

      {/* Right wing */}
      <rect x="600" y="190" width="120" height="70" fill="url(#skyGrad)" />
      <path d="M600,190 Q660,175 720,190" fill="url(#skyGrad)" />

      {/* Right minaret */}
      <rect x="637" y="110" width="18" height="150" fill="url(#skyGrad)" />
      <path d="M637,110 Q646,92 655,110" fill="url(#skyGrad)" />
      <circle cx="646" cy="90" r="5" fill="url(#skyGrad)" />

      {/* Central dome base */}
      <rect x="400" y="195" width="200" height="65" fill="url(#skyGrad)" />

      {/* Central minaret left */}
      <rect x="408" y="75" width="22" height="185" fill="url(#skyGrad)" />
      <path d="M408,75 Q419,55 430,75" fill="url(#skyGrad)" />
      <circle cx="419" cy="53" r="7" fill="url(#skyGrad)" filter="url(#glow)" />

      {/* Central minaret right */}
      <rect x="570" y="75" width="22" height="185" fill="url(#skyGrad)" />
      <path d="M570,75 Q581,55 592,75" fill="url(#skyGrad)" />
      <circle cx="581" cy="53" r="7" fill="url(#skyGrad)" filter="url(#glow)" />

      {/* Main dome */}
      <ellipse cx="500" cy="155" rx="80" ry="58" fill="url(#skyGrad)" />
      {/* Dome highlight */}
      <ellipse cx="500" cy="140" rx="55" ry="35" fill="url(#skyGrad)" />

      {/* Crescent atop main dome */}
      <text x="500" y="108" textAnchor="middle" fontSize="20"
        fill="#a0845c" opacity="0.5" fontFamily="sans-serif"
        filter="url(#glow)">
        ☪
      </text>

      {/* Ground line */}
      <rect x="0" y="258" width="1000" height="2" fill="url(#skyGrad)" />
    </svg>
  )
}

const PHRASES = [
  { text: 'Your phone is more than a screen.', delay: 0, italic: false, color: '#f5f0e8' },
  { text: 'Make it a reminder.', delay: 1.4, italic: true, color: '#a0845c' },
]

export default function FinalScene() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lineRef.current) return
    gsap.fromTo(lineRef.current, { scaleX: 0 }, {
      scaleX: 1, duration: 1.2, ease: 'power2.inOut',
      scrollTrigger: { trigger: lineRef.current, start: 'top 85%' },
    })
  }, [])

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', zIndex: 1, padding: '10rem 2.5rem',
      textAlign: 'center', overflow: 'hidden',
    }}>
      {/* Deep radial atmosphere */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 120% 70% at 50% 15%, rgba(6,78,59,0.1) 0%, transparent 60%)',
      }} />

      {/* Mosque silhouette pinned to bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          pointerEvents: 'none',
        }}
      >
        <MosqueSkyline />
      </motion.div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Phrase lines */}
        {PHRASES.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 25, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.4, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
              fontWeight: p.italic ? 400 : 300,
              fontStyle: p.italic ? 'italic' : 'normal',
              color: p.color,
              marginBottom: '0.4rem', lineHeight: 1.18,
              letterSpacing: '-0.01em',
            }}
          >
            {p.text}
          </motion.p>
        ))}

        {/* Divider */}
        <div
          ref={lineRef}
          style={{
            width: '50px', height: '1px',
            background: 'linear-gradient(90deg, transparent, #a0845c, transparent)',
            margin: '3rem auto',
            transformOrigin: 'center',
          }}
        />

        {/* Brand reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '1rem' }}
        >
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            fontWeight: 400, color: '#f5f0e8',
            letterSpacing: '0.04em', marginBottom: '0.6rem', lineHeight: 1,
          }}>
            ☪ Islamic AI
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.72rem',
            letterSpacing: '0.4em', color: '#5a4a30', textTransform: 'uppercase',
          }}>
            Qur'ān &nbsp;·&nbsp; AI &nbsp;·&nbsp; Reflection
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            marginTop: '3rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem',
          }}
        >
          <button
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.05rem', fontStyle: 'italic', fontWeight: 400,
              color: '#050505', background: '#a0845c',
              border: 'none', borderRadius: '2px',
              padding: '1.1rem 3.5rem', cursor: 'pointer',
              transition: 'background 0.25s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = '#c4a97d'
              el.style.transform = 'translateY(-3px) scale(1.02)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = '#a0845c'
              el.style.transform = 'translateY(0) scale(1)'
            }}
          >
            Start Your Journey →
          </button>

          <button
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem', fontWeight: 400,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#5a4a30', background: 'transparent', border: 'none',
              cursor: 'pointer', padding: '0.5rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#b8b4ac')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#5a4a30')}
          >
            Explore the App ↗
          </button>
        </motion.div>
      </div>
    </section>
  )
}
