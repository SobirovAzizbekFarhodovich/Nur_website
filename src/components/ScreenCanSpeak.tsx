import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const screens = [
  {
    verse_ar: 'وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُ',
    verse_en: '"And whoever relies upon Allah — then He is sufficient for him."',
    ref: "Qur'ān 65:3",
    time: '7:15',
    prayer: 'Dhuhr in 4h 32m',
    rotateInit: -7,
    yOffset: 0,
    xOffset: -120,
    delay: 0,
  },
  {
    verse_ar: 'إِنَّ ٱللَّهَ مَعَ ٱلصَّابِرِينَ',
    verse_en: '"Indeed, Allah is with the patient."',
    ref: "Qur'ān 2:153",
    time: '2:33',
    prayer: 'Asr in 2h 10m',
    rotateInit: 0,
    yOffset: -40,
    xOffset: 0,
    delay: 0.12,
  },
  {
    verse_ar: 'رَبَّنَا ءَاتِنَا فِى ٱلدُّنْيَا حَسَنَةً',
    verse_en: '"Our Lord, give us good in this world and in the Hereafter."',
    ref: "Qur'ān 2:201",
    time: '9:50',
    prayer: 'Fajr in 8h',
    rotateInit: 7,
    yOffset: 0,
    xOffset: 120,
    delay: 0.22,
  },
]

function PhoneCard({ screen, index }: { screen: typeof screens[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: screen.rotateInit, scale: 0.9 }}
      whileInView={{ opacity: 1, y: screen.yOffset, rotate: screen.rotateInit * 0.6, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: screen.delay }}
      whileHover={{
        scale: 1.04,
        rotate: 0,
        y: screen.yOffset - 12,
        transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
      }}
      style={{
        width: '195px', height: '405px',
        borderRadius: '32px',
        background: 'linear-gradient(170deg, #040d07 0%, #020908 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '2rem 1.2rem',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden', cursor: 'default',
        boxShadow: [
          '0 40px 100px rgba(0,0,0,0.65)',
          '0 10px 30px rgba(0,0,0,0.4)',
          index === 1 ? '0 0 80px rgba(6,78,59,0.2)' : '0 0 40px rgba(6,78,59,0.08)',
        ].join(', '),
      }}
    >
      {/* Atmospheric glow */}
      <div style={{
        position: 'absolute', top: '25%', left: '50%', transform: 'translateX(-50%)',
        width: '100px', height: '100px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,78,59,0.25) 0%, transparent 70%)',
        filter: 'blur(25px)',
      }} />

      {/* Notch */}
      <div style={{
        position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
        width: '60px', height: '16px', background: '#020202', borderRadius: '8px',
      }} />

      {/* Time */}
      <div style={{ textAlign: 'center', paddingTop: '0.75rem', position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontSize: '2.4rem',
          fontWeight: 200, color: '#f5f0e8', lineHeight: 1, letterSpacing: '-0.02em',
        }}>
          {screen.time}
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '0.46rem',
          letterSpacing: '0.16em', color: '#5a4a30', marginTop: '0.3rem',
        }}>
          {screen.prayer}
        </p>
      </div>

      {/* Verse */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          padding: '0.85rem 0.7rem',
          border: '1px solid rgba(160,132,92,0.1)',
          borderRadius: '5px',
          background: 'rgba(6,78,59,0.07)',
        }}>
          <p style={{
            fontFamily: "'Noto Naskh Arabic', serif", fontSize: '0.88rem',
            lineHeight: 1.9, color: '#c4a97d', direction: 'rtl', marginBottom: '0.6rem',
          }}>
            {screen.verse_ar}
          </p>
          <div style={{ width: '16px', height: '1px', background: 'rgba(160,132,92,0.3)', margin: '0 auto 0.5rem' }} />
          <p style={{
            fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
            fontSize: '0.52rem', color: '#8a8680', lineHeight: 1.6,
          }}>
            {screen.verse_en}
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.42rem',
            letterSpacing: '0.14em', color: '#5a4a30', marginTop: '0.3rem',
          }}>
            {screen.ref}
          </p>
        </div>
      </div>

      {/* Bottom pagination */}
      <div style={{ display: 'flex', gap: '0.35rem', position: 'relative', zIndex: 1 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: i === index ? '18px' : '4px', height: '4px',
            borderRadius: '2px',
            background: i === index ? '#a0845c' : 'rgba(255,255,255,0.1)',
            transition: 'width 0.3s ease',
          }} />
        ))}
      </div>

      {/* Glare */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
        background: 'linear-gradient(130deg, rgba(255,255,255,0.04) 0%, transparent 38%)',
      }} />
    </motion.div>
  )
}

export default function ScreenCanSpeak() {
  return (
    <section
      id="features"
      style={{ padding: '10rem 2.5rem', position: 'relative', zIndex: 1, overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(6,78,59,0.07) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', marginBottom: '7rem' }} className="speak-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '0.68rem',
              letterSpacing: '0.4em', color: '#064e3b', textTransform: 'uppercase', marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#064e3b' }} />
              Lock Screen Experience
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.6rem, 5vw, 5rem)',
              fontWeight: 400, color: '#f5f0e8', lineHeight: 1.08, letterSpacing: '-0.02em',
            }}>
              Your screen
              <br />
              <em style={{ fontStyle: 'italic', color: '#a0845c', fontWeight: 400 }}>can speak.</em>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: '0.95rem',
              fontWeight: 300, color: '#8a8680', lineHeight: 1.8, maxWidth: '340px',
              alignSelf: 'center',
            }}
          >
            Turn every unlock into a moment of remembrance. Each time your screen wakes, a verse, a reminder, a connection.
          </motion.p>
        </div>

        {/* Phones */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: '2rem', flexWrap: 'wrap',
          perspective: '1200px',
        }}>
          {screens.map((s, i) => (
            <PhoneCard key={i} screen={s} index={i} />
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{
            marginTop: '7rem', paddingTop: '3rem',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem',
            textAlign: 'center',
          }}
          className="stats-row"
        >
          {[
            { num: '6,236', label: "Qur'ānic verses" },
            { num: '5,000+', label: 'Verified duas' },
            { num: 'Daily', label: 'Personalised reminders' },
          ].map((s) => (
            <div key={s.label}>
              <p style={{
                fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 400,
                color: '#a0845c', marginBottom: '0.3rem',
              }}>
                {s.num}
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: '0.68rem',
                letterSpacing: '0.2em', color: '#5a4a30', textTransform: 'uppercase',
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .speak-header { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .stats-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
