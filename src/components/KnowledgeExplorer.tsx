import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const example = {
  question: 'What should I do when I am worried?',
  quran: {
    ar: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ',
    en: '"And whoever relies upon Allah — then He is sufficient for him. Indeed, Allah will accomplish His purpose."',
    ref: "Qur'an 65:3",
  },
  hadith: {
    text: 'The Prophet ﷺ said: "If the whole world were to gather to benefit you, they could bring you nothing except what Allah has decreed for you. And if the whole world were to gather to harm you, they could harm you in nothing except what Allah has decreed for you."',
    source: 'Tirmidhi — Sahih',
  },
  dua: {
    ar: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
    en: 'O Allah, there is no ease except what You make easy, and You make the difficult easy when You will.',
    source: 'Ibn Hibban',
  },
}

export default function KnowledgeExplorer() {
  const [revealed, setRevealed] = useState(false)

  return (
    <section
      style={{
        padding: '8rem 2.5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.35em',
              color: '#064e3b',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            Knowledge Explorer
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
              fontWeight: 500,
              color: '#f5f0e8',
              lineHeight: 1.15,
            }}
          >
            Knowledge without noise.
          </h2>
        </motion.div>

        {/* Question */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            background: 'rgba(6,78,59,0.06)',
            border: '1px solid rgba(6,78,59,0.15)',
            borderRadius: '12px',
            padding: '1.5rem 2rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              color: '#b8b4ac',
            }}
          >
            ?
          </div>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#f5f0e8',
            }}
          >
            {example.question}
          </p>
        </motion.div>

        {/* Reveal button */}
        {!revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '1.5rem' }}
          >
            <button
              onClick={() => setRevealed(true)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.78rem',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a0845c',
                background: 'transparent',
                border: '1px solid rgba(160,132,92,0.25)',
                borderRadius: '2px',
                padding: '0.75rem 2rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.target as HTMLElement
                el.style.borderColor = 'rgba(160,132,92,0.6)'
                el.style.color = '#c4a97d'
              }}
              onMouseLeave={(e) => {
                const el = e.target as HTMLElement
                el.style.borderColor = 'rgba(160,132,92,0.25)'
                el.style.color = '#a0845c'
              }}
            >
              Show Islamic Guidance →
            </button>
          </motion.div>
        )}

        {/* Guidance layers */}
        <AnimatePresence>
          {revealed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Quran */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0 }}
                style={{
                  background: 'rgba(10,10,10,0.7)',
                  border: '1px solid rgba(196,169,125,0.15)',
                  borderLeft: '3px solid #c4a97d',
                  borderRadius: '0 8px 8px 0',
                  padding: '1.5rem 1.75rem',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: '#c4a97d',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  Qur'an
                </p>
                <p
                  style={{
                    fontFamily: "'Noto Naskh Arabic', serif",
                    fontSize: '1.2rem',
                    color: '#c4a97d',
                    direction: 'rtl',
                    lineHeight: 1.9,
                    marginBottom: '0.75rem',
                  }}
                >
                  {example.quran.ar}
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontSize: '0.85rem',
                    color: '#b8b4ac',
                    lineHeight: 1.6,
                    marginBottom: '0.4rem',
                  }}
                >
                  {example.quran.en}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    color: '#7a6240',
                    textTransform: 'uppercase',
                  }}
                >
                  {example.quran.ref}
                </p>
              </motion.div>

              {/* Hadith */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  background: 'rgba(10,10,10,0.7)',
                  border: '1px solid rgba(160,132,92,0.15)',
                  borderLeft: '3px solid #a0845c',
                  borderRadius: '0 8px 8px 0',
                  padding: '1.5rem 1.75rem',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: '#a0845c',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  Hadith
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontSize: '0.85rem',
                    color: '#b8b4ac',
                    lineHeight: 1.7,
                    marginBottom: '0.5rem',
                  }}
                >
                  {example.hadith.text}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    color: '#7a6240',
                    textTransform: 'uppercase',
                  }}
                >
                  {example.hadith.source}
                </p>
              </motion.div>

              {/* Dua */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  background: 'rgba(10,10,10,0.7)',
                  border: '1px solid rgba(122,98,64,0.2)',
                  borderLeft: '3px solid #7a6240',
                  borderRadius: '0 8px 8px 0',
                  padding: '1.5rem 1.75rem',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: '#7a6240',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  Dua
                </p>
                <p
                  style={{
                    fontFamily: "'Noto Naskh Arabic', serif",
                    fontSize: '1.1rem',
                    color: '#c4a97d',
                    direction: 'rtl',
                    lineHeight: 1.9,
                    marginBottom: '0.5rem',
                  }}
                >
                  {example.dua.ar}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.78rem',
                    color: '#b8b4ac',
                    lineHeight: 1.6,
                    marginBottom: '0.4rem',
                  }}
                >
                  {example.dua.en}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    color: '#7a6240',
                    textTransform: 'uppercase',
                  }}
                >
                  {example.dua.source}
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
