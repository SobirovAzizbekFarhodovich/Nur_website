import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', height: '22px' }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: '5px', height: '5px', borderRadius: '50%', background: '#a0845c',
            animation: `waveform 0.9s ${i * 0.15}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}

function ChatBubble({ role, children, delay = 0 }: { role: 'user' | 'ai'; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        justifyContent: role === 'user' ? 'flex-end' : 'flex-start',
        marginBottom: '0.75rem',
      }}
    >
      {role === 'ai' && (
        <div style={{
          width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #022c22, #064e3b)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.65rem', color: '#a0845c', marginRight: '0.6rem', marginTop: '2px',
        }}>
          ☪
        </div>
      )}
      <div style={{
        maxWidth: '82%',
        background: role === 'user'
          ? 'rgba(6,78,59,0.18)'
          : 'rgba(20,20,20,0.8)',
        border: role === 'user'
          ? '1px solid rgba(6,78,59,0.28)'
          : '1px solid rgba(255,255,255,0.06)',
        borderRadius: role === 'user' ? '14px 14px 2px 14px' : '2px 14px 14px 14px',
        padding: '0.75rem 1rem',
      }}>
        {children}
      </div>
    </motion.div>
  )
}

export default function AICompanion() {
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (step > 0) { setStep(0); return }
    setTyping(true)
    setTimeout(() => { setTyping(false); setStep(1) }, 2000)
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [step, typing])

  return (
    <section
      id="ai-companion"
      style={{ padding: '10rem 2.5rem', position: 'relative', zIndex: 1 }}
    >
      {/* bg atmosphere */}
      <div style={{
        position: 'absolute', left: '5%', top: '50%', transform: 'translateY(-50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,78,59,0.09) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '7rem', alignItems: 'center',
        }} className="ai-grid">

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '0.68rem',
              letterSpacing: '0.4em', color: '#064e3b', textTransform: 'uppercase',
              marginBottom: '1.8rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#064e3b' }} />
              AI Companion
            </p>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.4rem, 4.2vw, 4.2rem)',
              fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}>
              Not just AI.
              <br />
              <em style={{ fontStyle: 'italic', color: '#a0845c', fontWeight: 400 }}>
                A companion for
                <br />
                your journey.
              </em>
            </h2>

            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '0.95rem',
              fontWeight: 300, color: '#8a8680', lineHeight: 1.8,
              maxWidth: '360px', marginBottom: '2.5rem',
            }}>
              Rooted in authentic Islamic knowledge. Calm, respectful, and
              compassionate — your guide through every moment.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {["Qur'ān-grounded", 'Hadith-aware', 'Compassionate'].map((tag) => (
                <span key={tag} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.65rem', letterSpacing: '0.1em',
                  color: '#7a6240',
                  border: '1px solid rgba(122,98,64,0.28)',
                  borderRadius: '2px', padding: '0.35rem 0.9rem',
                  textTransform: 'uppercase',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Chat UI */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              background: 'rgba(8,8,8,0.85)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '18px', overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
            }}>
              {/* Header */}
              <div style={{
                padding: '1.2rem 1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #022c22, #064e3b)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.9rem', color: '#a0845c',
                  boxShadow: '0 0 20px rgba(6,78,59,0.4)',
                }}>
                  ☪
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '0.84rem',
                    fontWeight: 500, color: '#f5f0e8',
                  }}>
                    Islamic AI
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '0.58rem',
                    color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem',
                  }}>
                    <span style={{
                      display: 'inline-block', width: '5px', height: '5px',
                      borderRadius: '50%', background: '#10b981',
                    }} />
                    Online
                  </p>
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: '0.6rem',
                  letterSpacing: '0.1em', color: '#5a4a30', textTransform: 'uppercase',
                }}>
                  AI Companion
                </p>
              </div>

              {/* Messages */}
              <div
                ref={chatRef}
                style={{
                  padding: '1.5rem', minHeight: '360px', maxHeight: '460px',
                  overflowY: 'auto', scrollBehavior: 'smooth',
                }}
              >
                {/* User */}
                <ChatBubble role="user" delay={0}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '0.84rem',
                    color: '#f5f0e8', lineHeight: 1.5,
                  }}>
                    I feel exhausted today.
                  </p>
                </ChatBubble>

                {/* Typing */}
                <AnimatePresence>
                  {typing && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.6rem',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <div style={{
                        width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, #022c22, #064e3b)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.65rem', color: '#a0845c',
                      }}>☪</div>
                      <div style={{
                        background: 'rgba(20,20,20,0.8)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '2px 14px 14px 14px', padding: '0.75rem 1rem',
                      }}>
                        <TypingDots />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* AI response */}
                <AnimatePresence>
                  {step >= 1 && !typing && (
                    <>
                      <ChatBubble role="ai" delay={0}>
                        <p style={{
                          fontFamily: "'Inter', sans-serif", fontSize: '0.84rem',
                          color: '#f5f0e8', lineHeight: 1.6, marginBottom: '1rem',
                        }}>
                          Sometimes the heart needs rest too.
                        </p>

                        {/* Verse card */}
                        <div style={{
                          background: 'rgba(6,78,59,0.1)',
                          border: '1px solid rgba(6,78,59,0.22)',
                          borderRadius: '10px', padding: '1rem',
                        }}>
                          <p style={{
                            fontFamily: "'Noto Naskh Arabic', serif",
                            fontSize: '1.05rem', color: '#c4a97d',
                            direction: 'rtl', lineHeight: 1.9, marginBottom: '0.5rem',
                          }}>
                            أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ
                          </p>
                          <p style={{
                            fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
                            fontSize: '0.72rem', color: '#8a8680', lineHeight: 1.5,
                            marginBottom: '0.3rem',
                          }}>
                            "Verily, in the remembrance of Allah do hearts find rest."
                          </p>
                          <p style={{
                            fontFamily: "'Inter', sans-serif", fontSize: '0.55rem',
                            letterSpacing: '0.14em', color: '#5a4a30', textTransform: 'uppercase',
                          }}>
                            Qur'ān 13:28
                          </p>
                        </div>
                      </ChatBubble>

                      {/* Dua suggestion */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        style={{ paddingLeft: '2.3rem' }}
                      >
                        <div style={{
                          background: 'rgba(160,132,92,0.06)',
                          border: '1px solid rgba(160,132,92,0.16)',
                          borderRadius: '10px', padding: '1rem',
                          marginBottom: '0.75rem',
                        }}>
                          <p style={{
                            fontFamily: "'Inter', sans-serif", fontSize: '0.58rem',
                            letterSpacing: '0.18em', color: '#a0845c',
                            textTransform: 'uppercase', marginBottom: '0.6rem',
                          }}>
                            Suggested Dua
                          </p>
                          <p style={{
                            fontFamily: "'Noto Naskh Arabic', serif",
                            fontSize: '0.9rem', color: '#c4a97d',
                            direction: 'rtl', lineHeight: 1.9, marginBottom: '0.4rem',
                          }}>
                            اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ
                          </p>
                          <p style={{
                            fontFamily: "'Inter', sans-serif", fontSize: '0.65rem',
                            color: '#5a4a30', lineHeight: 1.5,
                          }}>
                            O Allah, I seek refuge in You from worry and grief.
                          </p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Input */}
              <div style={{
                padding: '1rem 1.4rem',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                display: 'flex', gap: '0.7rem', alignItems: 'center',
              }}>
                <div style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px', padding: '0.65rem 1rem',
                  fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#5a4a30',
                }}>
                  Ask Islamic AI…
                </div>
                <button
                  onClick={handleSend}
                  style={{
                    background: step >= 1 ? 'rgba(255,255,255,0.04)' : '#064e3b',
                    border: step >= 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    borderRadius: '10px', padding: '0.65rem 1rem',
                    color: step >= 1 ? '#5a4a30' : '#a0845c',
                    cursor: 'pointer', fontSize: '0.78rem',
                    fontFamily: "'Inter', sans-serif",
                    transition: 'all 0.25s',
                    minWidth: '80px',
                  }}
                  onMouseEnter={(e) => {
                    if (step < 1) (e.currentTarget as HTMLElement).style.background = '#0d5c3a'
                  }}
                  onMouseLeave={(e) => {
                    if (step < 1) (e.currentTarget as HTMLElement).style.background = '#064e3b'
                  }}
                >
                  {step >= 1 ? 'Reset' : 'See reply →'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ai-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
