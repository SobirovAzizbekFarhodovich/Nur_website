import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const moods = [
  { label: 'Sad', emoji: '🌧', color: '#1a2d4a' },
  { label: 'Anxious', emoji: '🌊', color: '#1a2d3a' },
  { label: 'Tired', emoji: '🌙', color: '#1a1a2d' },
  { label: 'Grateful', emoji: '☀️', color: '#2d1a0a' },
  { label: 'Angry', emoji: '🔥', color: '#2d1010' },
  { label: 'Hopeful', emoji: '🌿', color: '#0a2d1a' },
]

const moodResponses: Record<string, {
  verse_ar: string
  verse_en: string
  ref: string
  hadith: string
  dua_ar: string
  dua_en: string
}> = {
  Sad: {
    verse_ar: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    verse_en: '"Indeed, with hardship comes ease."',
    ref: 'Qur\'an 94:6',
    hadith: 'The Prophet ﷺ said: "No fatigue, illness, anxiety, sorrow... befalls a Muslim, even the prick of a thorn, but Allah expiates his sins thereby." (Bukhari)',
    dua_ar: 'اللَّهُمَّ إِنِّي عَبْدُكَ وَابْنُ عَبْدِكَ',
    dua_en: 'O Allah, I am Your servant, son of Your servant...',
  },
  Anxious: {
    verse_ar: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
    verse_en: '"And whoever relies upon Allah — then He is sufficient for him."',
    ref: 'Qur\'an 65:3',
    hadith: '"Amazing is the affair of the believer... If good comes to him, he is thankful... if harm comes to him, he is patient." (Muslim)',
    dua_ar: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    dua_en: 'Allah is sufficient for us, and He is the best Guardian.',
  },
  Tired: {
    verse_ar: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ',
    verse_en: '"And your Lord is going to give you, and you will be satisfied."',
    ref: 'Qur\'an 93:5',
    hadith: '"When Allah loves a servant, He tests him." So seek reward in your tiredness. (Tirmidhi)',
    dua_ar: 'رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا',
    dua_en: 'Our Lord, do not impose blame upon us if we forget or make an error.',
  },
  Grateful: {
    verse_ar: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    verse_en: '"If you are grateful, I will surely increase you [in favor]."',
    ref: 'Qur\'an 14:7',
    hadith: '"He who does not thank people does not thank Allah." (Abu Dawud)',
    dua_ar: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    dua_en: 'All praise is due to Allah, Lord of all the worlds.',
  },
  Angry: {
    verse_ar: 'وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ',
    verse_en: '"...who restrain anger and pardon people — Allah loves the doers of good."',
    ref: 'Qur\'an 3:134',
    hadith: '"The strong person is not one who can wrestle, but the one who controls himself when angry." (Bukhari)',
    dua_ar: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    dua_en: 'I seek refuge in Allah from Shaytan, the accursed.',
  },
  Hopeful: {
    verse_ar: 'إِنَّ اللَّهَ لَا يُخْلِفُ الْمِيعَادَ',
    verse_en: '"Indeed, Allah does not fail in His promise."',
    ref: 'Qur\'an 3:9',
    hadith: '"Allah says: I am as My servant thinks of Me..." — always expect the best from Allah. (Bukhari)',
    dua_ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً',
    dua_en: 'Our Lord, give us good in this world and good in the Hereafter.',
  },
}

export default function MoodSelector() {
  const [selected, setSelected] = useState<string | null>(null)
  const response = selected ? moodResponses[selected] : null

  return (
    <section
      id="features"
      style={{
        padding: '10rem 2.5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(6,78,59,0.06) 0%, transparent 70%)',
        }}
      />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
              fontSize: '0.68rem',
              letterSpacing: '0.4em',
              color: '#064e3b',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#064e3b' }} />
            Mood-Based Guidance
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#064e3b' }} />
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
              fontWeight: 400,
              color: '#f5f0e8',
              lineHeight: 1.12,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Tell us how you feel.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 300,
              color: '#b8b4ac',
              lineHeight: 1.7,
            }}
          >
            Let Islamic AI find the right words, reminders and duas for the moment.
          </p>
        </motion.div>

        {/* Mood grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '3rem',
          }}
          className="mood-grid"
        >
          {moods.map((mood, i) => (
            <motion.button
              key={mood.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onClick={() => setSelected(selected === mood.label ? null : mood.label)}
              style={{
                background:
                  selected === mood.label
                    ? `rgba(6,78,59,0.15)`
                    : 'rgba(255,255,255,0.02)',
                border:
                  selected === mood.label
                    ? '1px solid rgba(6,78,59,0.4)'
                    : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
                padding: '1.5rem 1rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.25s ease',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span style={{ fontSize: '1.5rem' }}>{mood.emoji}</span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  color: selected === mood.label ? '#f5f0e8' : '#b8b4ac',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
              >
                {mood.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Response */}
        <AnimatePresence mode="wait">
          {selected && response && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                background: 'rgba(10,10,10,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '1.2rem 1.8rem',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{moods.find((m) => m.label === selected)?.emoji}</span>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.72rem',
                    letterSpacing: '0.2em',
                    color: '#a0845c',
                    textTransform: 'uppercase',
                  }}
                >
                  Guidance for {selected}
                </p>
              </div>

              <div style={{ padding: '2rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Verse */}
                <div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      color: '#064e3b',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Qur'an
                  </p>
                  <p
                    style={{
                      fontFamily: "'Noto Naskh Arabic', serif",
                      fontSize: '1.3rem',
                      color: '#c4a97d',
                      direction: 'rtl',
                      lineHeight: 1.8,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {response.verse_ar}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      fontSize: '0.85rem',
                      color: '#b8b4ac',
                      lineHeight: 1.6,
                      marginBottom: '0.3rem',
                    }}
                  >
                    {response.verse_en}
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
                    {response.ref}
                  </p>
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)' }} />

                {/* Hadith */}
                <div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      color: '#7a4f00',
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
                    }}
                  >
                    {response.hadith}
                  </p>
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)' }} />

                {/* Dua */}
                <div>
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
                    Dua
                  </p>
                  <p
                    style={{
                      fontFamily: "'Noto Naskh Arabic', serif",
                      fontSize: '1.1rem',
                      color: '#c4a97d',
                      direction: 'rtl',
                      lineHeight: 1.8,
                      marginBottom: '0.4rem',
                    }}
                  >
                    {response.dua_ar}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.78rem',
                      color: '#7a6240',
                      lineHeight: 1.5,
                    }}
                  >
                    {response.dua_en}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .mood-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
