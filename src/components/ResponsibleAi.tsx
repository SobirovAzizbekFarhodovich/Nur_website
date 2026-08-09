import { motion } from 'framer-motion'

const principles = [
  {
    title: 'Source Transparency',
    desc: 'Every response cites its Qur\'anic or hadith source, so you always know where the guidance comes from.',
  },
  {
    title: 'Scholar-Guided',
    desc: 'Our knowledge base is reviewed against established Islamic scholarship to maintain integrity and authenticity.',
  },
  {
    title: 'No Fatwa Generation',
    desc: 'Islamic AI provides knowledge and remembrance. It does not issue religious verdicts or replace qualified scholars.',
  },
]

export default function ResponsibleAI() {
  return (
    <section
      style={{
        padding: '8rem 2.5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: '4rem' }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.68rem',
              letterSpacing: '0.4em',
              color: '#064e3b',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}
          >
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#064e3b' }} />
            Responsible AI
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
              fontWeight: 400,
              color: '#f5f0e8',
              lineHeight: 1.15,
              maxWidth: '560px',
              letterSpacing: '-0.02em',
            }}
          >
            Technology should{' '}
            <em style={{ fontStyle: 'italic', color: '#a0845c', fontWeight: 400 }}>serve knowledge.</em>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
          className="principles-grid"
        >
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{
                padding: '1.75rem',
                border: '1px solid rgba(255,255,255,0.05)',
                borderTop: '2px solid rgba(6,78,59,0.4)',
                background: 'rgba(10,10,10,0.5)',
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#f5f0e8',
                  marginBottom: '0.75rem',
                }}
              >
                {p.title}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: 300,
                  color: '#b8b4ac',
                  lineHeight: 1.65,
                }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.78rem',
            fontWeight: 300,
            color: '#7a6240',
            lineHeight: 1.7,
            maxWidth: '560px',
            borderLeft: '2px solid rgba(122,98,64,0.3)',
            paddingLeft: '1.2rem',
          }}
        >
          Islamic AI is designed to assist users in exploring Islamic knowledge. It is not a
          substitute for qualified scholars or personal religious authority. Always consult a
          qualified Islamic scholar for important religious matters.
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .principles-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
