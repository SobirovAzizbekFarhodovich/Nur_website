import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VERSE_AR = 'أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ'
const VERSE_EN = 'Indeed, in the remembrance of Allah do hearts find rest.'
const VERSE_REF = "Qur'ān 13:28"

function IslamicGeometry({ size = 180, opacity = 0.07 }: { size?: number; opacity?: number }) {
  const s = size / 2
  const r = s * 0.85
  const inner = s * 0.55
  const innermost = s * 0.3
  const pts6 = (radius: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const angle = (i * 60 - 90) * (Math.PI / 180)
      return `${s + radius * Math.cos(angle)},${s + radius * Math.sin(angle)}`
    }).join(' ')

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ opacity, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
    >
      <polygon points={pts6(r)} fill="none" stroke="#a0845c" strokeWidth="0.5" />
      <polygon points={pts6(inner)} fill="none" stroke="#a0845c" strokeWidth="0.4" />
      <polygon points={pts6(innermost)} fill="none" stroke="#a0845c" strokeWidth="0.3" />
      <circle cx={s} cy={s} r={innermost * 0.6} fill="none" stroke="#a0845c" strokeWidth="0.3" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * 60 - 90) * (Math.PI / 180)
        return (
          <line
            key={i}
            x1={s} y1={s}
            x2={s + r * Math.cos(a)} y2={s + r * Math.sin(a)}
            stroke="#a0845c" strokeWidth="0.2"
          />
        )
      })}
    </svg>
  )
}

function PhoneLockScreen() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(175deg, #01110a 0%, #020e07 40%, #010a05 100%)',
      borderRadius: 'inherit',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'space-between',
      padding: '2.8rem 1.6rem 2rem',
      overflow: 'hidden', position: 'relative',
    }}>
      {/* Atmospheric layers */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 25%, rgba(6,78,59,0.22) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(160,132,92,0.06) 0%, transparent 60%)',
      }} />

      {/* Geometric pattern */}
      <IslamicGeometry size={200} opacity={0.08} />

      {/* Notch */}
      <div style={{
        position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
        width: '72px', height: '20px', background: '#020202', borderRadius: '10px', zIndex: 10,
      }} />

      {/* Time */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '0.52rem',
          letterSpacing: '0.22em', color: '#7a6240', textTransform: 'uppercase', marginBottom: '0.3rem',
        }}>
          Saturday · 15 Muharram · 1447
        </p>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontSize: '3.2rem',
          fontWeight: 200, color: '#f5f0e8', lineHeight: 1, letterSpacing: '-0.02em',
        }}>
          5:42
        </p>
        <div style={{
          width: '1px', height: '24px', background: 'rgba(160,132,92,0.3)',
          margin: '0.5rem auto',
        }} />
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '0.5rem',
          letterSpacing: '0.18em', color: '#5a4a30',
        }}>
          Fajr begins in 18 minutes
        </p>
      </div>

      {/* Verse */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{
          padding: '1rem 0.8rem',
          border: '1px solid rgba(160,132,92,0.12)',
          borderRadius: '6px',
          background: 'rgba(6,78,59,0.08)',
        }}>
          <p style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: '0.98rem', lineHeight: 2, color: '#c4a97d',
            direction: 'rtl', marginBottom: '0.7rem',
          }}>
            {VERSE_AR}
          </p>
          <div style={{ width: '20px', height: '1px', background: 'rgba(160,132,92,0.3)', margin: '0 auto 0.6rem' }} />
          <p style={{
            fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
            fontSize: '0.55rem', color: '#b8b4ac', lineHeight: 1.7,
          }}>
            {VERSE_EN}
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.45rem',
            letterSpacing: '0.16em', color: '#5a4a30', marginTop: '0.35rem',
          }}>
            {VERSE_REF}
          </p>
        </div>
      </div>

      {/* Bottom icons */}
      <div style={{ display: 'flex', gap: '1.2rem', position: 'relative', zIndex: 2 }}>
        {[
          <svg key="moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a6240" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
          <svg key="star" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a6240" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
          <svg key="book" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a6240" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
        ].map((icon, i) => (
          <div key={i} style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {icon}
          </div>
        ))}
      </div>

      {/* Screen glare */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit',
        background: 'linear-gradient(130deg, rgba(255,255,255,0.04) 0%, transparent 35%)',
      }} />
    </div>
  )
}

export default function Hero() {
  const phoneWrapRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!phoneWrapRef.current || !textRef.current) return

    // Phone parallax on scroll
    gsap.to(phoneWrapRef.current, {
      rotateY: -22,
      rotateX: 8,
      y: -50,
      scale: 0.92,
      ease: 'none',
      scrollTrigger: {
        trigger: pinRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.8,
      },
    })

    // Keep hero text visible: removed scroll fade so headings/paragraphs persist

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <section
      id="experience"
      ref={pinRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '9rem 2.5rem 5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 90% 70% at 65% 50%, rgba(6,78,59,0.14) 0%, transparent 70%)',
      }} />

      <div style={{
        maxWidth: '1300px', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        alignItems: 'center', gap: '5rem',
      }} className="hero-grid">

        {/* — Text — */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: '0.68rem',
              fontWeight: 400, letterSpacing: '0.4em', color: '#064e3b',
              textTransform: 'uppercase', marginBottom: '2.2rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}
          >
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#064e3b' }} />
            Islamic AI · Qur'an Lock Screen
          </motion.p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 4.2vw, 4.4rem)',
            fontWeight: 400, lineHeight: 1.12, color: '#f5f0e8',
            marginBottom: '2.2rem', letterSpacing: '-0.02em',
          }}>
            {['Every time', 'you wake your phone,'].map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.6 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'block' }}
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.96, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'block', fontStyle: 'italic', color: '#a0845c', fontWeight: 400 }}
            >
              remember Allah.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: '0.98rem',
              fontWeight: 300, color: '#8a8680', lineHeight: 1.8,
              maxWidth: '400px', marginBottom: '3rem',
            }}
          >
            Islamic AI brings Qur'an, remembrance, Islamic knowledge and
            intelligent guidance into your everyday digital life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}
          >
            <MagneticButton primary>Start Your Journey →</MagneticButton>
            <MagneticButton>Explore Features</MagneticButton>
          </motion.div>
        </motion.div>

        {/* — Phone — */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', perspective: '1400px' }}
        >
          <div style={{ position: 'relative' }}>
            {/* Soft ground glow */}
            <div style={{
              position: 'absolute', bottom: '-80px', left: '50%',
              transform: 'translateX(-50%)',
              width: '260px', height: '80px',
              background: 'radial-gradient(ellipse, rgba(6,78,59,0.3) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }} />
            {/* Distant halo */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '340px', height: '340px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6,78,59,0.18) 0%, transparent 65%)',
              filter: 'blur(50px)',
              animation: 'pulse-glow 5s ease-in-out infinite',
            }} />

            {/* Phone wrapper (GSAP target) */}
            <div
              ref={phoneWrapRef}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateY(-10deg) rotateX(4deg)',
                animation: 'float 8s ease-in-out infinite',
                willChange: 'transform',
              }}
            >
              {/* Frame */}
              <div style={{
                width: '248px', height: '508px', borderRadius: '40px',
                background: 'linear-gradient(160deg, #2a2a2a 0%, #111 30%, #0d0d0d 70%, #1a1a1a 100%)',
                padding: '3.5px',
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.09),
                  0 40px 100px rgba(0,0,0,0.85),
                  0 15px 40px rgba(0,0,0,0.55),
                  inset 0 1px 0 rgba(255,255,255,0.12),
                  -24px 0 60px rgba(6,78,59,0.18),
                  24px 0 50px rgba(0,0,0,0.5),
                  0 0 120px rgba(6,78,59,0.08)
                `,
              }}>
                {/* Metallic edge highlight */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: '40px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, rgba(255,255,255,0.02) 100%)',
                  pointerEvents: 'none', zIndex: 5,
                }} />
                {/* Screen */}
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: '36px', overflow: 'hidden',
                }}>
                  <PhoneLockScreen />
                </div>
              </div>

              {/* Phone side reflection */}
              <div style={{
                position: 'absolute', top: '10%', right: '-8px',
                width: '4px', height: '80%',
                background: 'linear-gradient(to bottom, transparent, rgba(6,78,59,0.3), transparent)',
                borderRadius: '2px',
              }} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        }}
      >
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '0.55rem',
          letterSpacing: '0.3em', color: '#4a4a4a', textTransform: 'uppercase',
        }}>
          Scroll
        </p>
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(to bottom, rgba(160,132,92,0.5), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center;
          }
          .hero-grid > div:first-child {
            order: 2;
          }
          .hero-grid > div:last-child {
            order: 1;
          }
        }
      `}</style>
    </section>
  )
}

function MagneticButton({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`
  }
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.8rem', fontWeight: primary ? 500 : 400,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: primary ? '#050505' : '#8a8680',
        background: primary ? '#a0845c' : 'transparent',
        border: primary ? 'none' : '1px solid rgba(184,180,172,0.18)',
        borderRadius: '2px',
        padding: primary ? '0.95rem 2.4rem' : '0.95rem 2rem',
        cursor: 'pointer',
        transition: 'background 0.25s, color 0.25s, border-color 0.25s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        if (primary) {
          el.style.background = '#c4a97d'
        } else {
          el.style.borderColor = 'rgba(184,180,172,0.45)'
          el.style.color = '#f5f0e8'
        }
      }}
    >
      {children}
    </button>
  )
}
