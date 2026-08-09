import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const BAR_COUNT = 72

function useWaveformHeights(active: boolean) {
  const heights = useRef<number[]>(
    Array.from({ length: BAR_COUNT }, (_, i) => {
      const seed = Math.sin(i * 0.55 + 1.2) * 0.4 + Math.sin(i * 0.18) * 0.3 + 0.3
      return Math.max(4, seed * 68)
    })
  )
  const animatedHeights = useRef<number[]>([...heights.current])
  const rafRef = useRef<number>(0)
  const [, forceRender] = useState(0)

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(rafRef.current)
      return
    }
    let frame = 0
    const animate = () => {
      frame++
      animatedHeights.current = heights.current.map((base, i) => {
        const wave = Math.sin(frame * 0.08 + i * 0.35) * 22
        const wave2 = Math.cos(frame * 0.05 + i * 0.22) * 14
        return Math.max(3, Math.min(72, base + wave + wave2))
      })
      forceRender((n) => n + 1)
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(rafRef.current)
  }, [active])

  return active ? animatedHeights.current : heights.current.map((h) => Math.max(3, h * 0.12))
}

const METRICS = [
  { label: 'Accuracy', value: '92%', color: '#10b981', sub: 'Excellent' },
  { label: 'Pronunciation', value: 'A+', color: '#c4a97d', sub: 'Very Good' },
  { label: 'Tajweed', value: 'Good', color: '#a0845c', sub: 'Improving' },
  { label: 'Confidence', value: '87%', color: '#10b981', sub: 'Strong' },
]

export default function RecitationSection() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const heights = useWaveformHeights(playing)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const toggle = useCallback(() => {
    setPlaying((p) => {
      if (!p) setProgress(0)
      return !p
    })
  }, [])

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { setPlaying(false); return 0 }
          return p + 0.5
        })
      }, 80)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing])

  return (
    <section
      id="recitation"
      style={{ padding: '10rem 2.5rem', position: 'relative', zIndex: 1 }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 55% at 50% 50%, rgba(6,78,59,0.08) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.68rem',
            letterSpacing: '0.4em', color: '#064e3b', textTransform: 'uppercase',
            marginBottom: '1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
          }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#064e3b' }} />
            Qur'ān Recitation
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#064e3b' }} />
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
            fontWeight: 400, color: '#f5f0e8',
            lineHeight: 1.12, marginBottom: '1rem', letterSpacing: '-0.02em',
          }}>
            Listen. Recite.{' '}
            <em style={{ fontStyle: 'italic', color: '#a0845c' }}>Improve.</em>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.92rem',
            fontWeight: 300, color: '#8a8680', lineHeight: 1.7,
          }}>
            Practice your Qur'ān recitation with intelligent feedback.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2 }}
        >
          {/* Main player */}
          <div style={{
            background: 'rgba(8,8,8,0.85)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px', overflow: 'hidden', marginBottom: '1.25rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}>
            {/* Verse */}
            <div style={{
              padding: '2.2rem 2rem',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              textAlign: 'center',
              background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(6,78,59,0.07) 0%, transparent 70%)',
            }}>
              <p style={{
                fontFamily: "'Noto Naskh Arabic', serif",
                fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
                color: '#c4a97d', direction: 'rtl',
                lineHeight: 2, marginBottom: '0.9rem',
                letterSpacing: '0.02em',
              }}>
                بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
              </p>
              <p style={{
                fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
                fontSize: '0.82rem', color: '#5a4a30',
              }}>
                In the name of Allah, the Entirely Merciful, the Especially Merciful
              </p>
            </div>

            {/* Waveform */}
            <div style={{ padding: '2rem 1.5rem 1rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '2.5px', height: '88px',
              }}>
                {heights.map((h, i) => {
                  const isPrimary = i > 16 && i < 55
                  const isAccent = i >= 55 && i < 65
                  return (
                    <div
                      key={i}
                      style={{
                        flex: '0 0 auto', width: '2.5px',
                        height: `${playing ? h : Math.max(3, h * 0.15)}px`,
                        borderRadius: '2px',
                        background: isPrimary
                          ? `rgba(16, 185, 129, ${0.5 + (h / 72) * 0.5})`
                          : isAccent
                          ? `rgba(160, 132, 92, ${0.4 + (h / 72) * 0.4})`
                          : 'rgba(255,255,255,0.08)',
                        transition: playing ? 'none' : 'height 0.8s ease',
                        boxShadow: isPrimary && playing ? '0 0 6px rgba(16,185,129,0.3)' : 'none',
                      }}
                    />
                  )
                })}
              </div>

              {/* Progress */}
              <div style={{
                marginTop: '1.2rem', height: '2px',
                background: 'rgba(255,255,255,0.05)', borderRadius: '1px',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0,
                  height: '100%', width: `${progress}%`,
                  background: 'linear-gradient(90deg, #064e3b, #10b981)',
                  borderRadius: '1px',
                  transition: playing ? 'none' : 'width 0.2s',
                  boxShadow: '0 0 8px rgba(16,185,129,0.4)',
                }} />
              </div>
            </div>

            {/* Controls */}
            <div style={{
              padding: '1rem 1.75rem 1.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={toggle}
                  style={{
                    width: '46px', height: '46px', borderRadius: '50%',
                    background: playing ? '#064e3b' : '#a0845c',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', color: '#f5f0e8',
                    transition: 'background 0.25s, transform 0.2s',
                    boxShadow: playing ? '0 0 20px rgba(6,78,59,0.5)' : '0 0 16px rgba(160,132,92,0.3)',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  {playing ? '⏸' : '▶'}
                </button>
                <div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '0.82rem',
                    fontWeight: 500, color: '#f5f0e8', marginBottom: '0.1rem',
                  }}>
                    Surah Al-Fātiḥah
                  </p>
                  <p style={{
                    fontFamily: "'Noto Naskh Arabic', serif", fontSize: '0.7rem',
                    color: '#5a4a30', direction: 'rtl',
                  }}>
                    سُورَةُ الْفَاتِحَة
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                fontFamily: "'Inter', sans-serif", fontSize: '0.58rem',
                letterSpacing: '0.15em',
                color: playing ? '#10b981' : '#5a4a30',
                textTransform: 'uppercase', transition: 'color 0.3s',
              }}>
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: playing ? '#10b981' : '#5a4a30',
                  animation: playing ? 'pulse-glow 1s infinite' : 'none',
                  transition: 'background 0.3s',
                }} />
                {playing ? 'Analysing…' : 'Ready to Record'}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div style={{
            background: 'rgba(8,8,8,0.7)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '12px', padding: '1.75rem 2rem',
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '0.58rem',
              letterSpacing: '0.28em', color: '#064e3b',
              textTransform: 'uppercase', marginBottom: '1.5rem',
            }}>
              Recitation Analysis
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="metrics-grid">
              {METRICS.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                >
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '0.58rem',
                    letterSpacing: '0.18em', color: '#5a4a30',
                    textTransform: 'uppercase', marginBottom: '0.5rem',
                  }}>
                    {m.label}
                  </p>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.7rem', fontWeight: 400,
                    color: m.color, lineHeight: 1,
                    marginBottom: '0.25rem',
                  }}>
                    {m.value}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '0.6rem',
                    color: '#5a4a30',
                  }}>
                    {m.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
