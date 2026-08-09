import { motion } from 'framer-motion'

const nodes = [
  { id: 'quran', label: "Qur'an", x: 50, y: 20, color: '#c4a97d', size: 18, desc: '6,236 verses' },
  { id: 'hadith', label: 'Sahih Hadith', x: 85, y: 45, color: '#a0845c', size: 14, desc: 'Bukhari • Muslim' },
  { id: 'duas', label: 'Duas', x: 75, y: 80, color: '#7a6240', size: 13, desc: '5,000+ verified' },
  { id: 'knowledge', label: 'Islamic Knowledge', x: 20, y: 75, color: '#a0845c', size: 13, desc: 'Fiqh • Seerah' },
  { id: 'center', label: 'ISLAMIC AI', x: 50, y: 52, color: '#10b981', size: 22, desc: 'Your Companion' },
  { id: 'tafsir', label: 'Tafsir', x: 15, y: 40, color: '#7a6240', size: 11, desc: 'Ibn Kathir & more' },
]

const connections = [
  ['quran', 'center'],
  ['hadith', 'center'],
  ['duas', 'center'],
  ['knowledge', 'center'],
  ['tafsir', 'center'],
  ['quran', 'tafsir'],
  ['quran', 'hadith'],
]

export default function SacredKnowledge() {
  const getNode = (id: string) => nodes.find((n) => n.id === id)!

  return (
    <section
      id="knowledge"
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
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,78,59,0.1) 0%, transparent 70%)',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
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
            Sacred Sources
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
              fontWeight: 500,
              color: '#f5f0e8',
              lineHeight: 1.15,
              marginBottom: '0.5rem',
            }}
          >
            Built on knowledge.
          </h2>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#a0845c',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
            }}
          >
            Designed with responsibility.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 300,
              color: '#b8b4ac',
              lineHeight: 1.7,
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            Every response is grounded in authentic Islamic sources —
            traced, verified, and handled with reverence.
          </p>
        </motion.div>

        {/* Knowledge graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: 'relative',
            height: '500px',
            background: 'rgba(10,10,10,0.5)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {/* bg glow */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '52%',
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6,78,59,0.25) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            <defs>
              <marker id="arrow" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="4" markerHeight="4" orient="auto">
                <circle cx="3" cy="3" r="1.5" fill="rgba(6,78,59,0.5)" />
              </marker>
            </defs>

            {/* Connection lines */}
            {connections.map(([fromId, toId], i) => {
              const from = getNode(fromId)
              const to = getNode(toId)
              return (
                <motion.line
                  key={`${fromId}-${toId}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(6,78,59,0.35)"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.15 }}
                  strokeDasharray="0.8 1.2"
                />
              )
            })}

            {/* Nodes */}
            {nodes.map((node, i) => (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.12, type: 'spring', stiffness: 200 }}
              >
                {/* Outer glow ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size / 2 + 2}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="0.3"
                  opacity="0.3"
                />
                {/* Main node */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size / 2}
                  fill={node.id === 'center' ? 'rgba(6,78,59,0.3)' : 'rgba(10,10,10,0.8)'}
                  stroke={node.color}
                  strokeWidth="0.5"
                />
                {/* Label */}
                <text
                  x={node.x}
                  y={node.y + node.size / 2 + 3.5}
                  textAnchor="middle"
                  fill={node.color}
                  fontSize="2.8"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="0.05"
                >
                  {node.label}
                </text>
                {/* Center icon */}
                {node.id === 'center' && (
                  <text
                    x={node.x}
                    y={node.y + 1.2}
                    textAnchor="middle"
                    fill="#10b981"
                    fontSize="5"
                    fontFamily="sans-serif"
                    dominantBaseline="middle"
                  >
                    ☪
                  </text>
                )}
              </motion.g>
            ))}
          </svg>
        </motion.div>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            marginTop: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {nodes.filter((n) => n.id !== 'center').map((node) => (
            <div key={node.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: node.color,
                }}
              />
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.72rem',
                    color: '#b8b4ac',
                    fontWeight: 500,
                  }}
                >
                  {node.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.6rem',
                    color: '#7a6240',
                  }}
                >
                  {node.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
