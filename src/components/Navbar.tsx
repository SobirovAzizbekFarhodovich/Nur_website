import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Experience', 'Features', 'AI Companion', 'Recitation', 'Knowledge']

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1.25rem 2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled ? 'rgba(5,5,5,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: '0.95rem',
          letterSpacing: '0.25em',
          color: '#f5f0e8',
          textDecoration: 'none',
          textTransform: 'uppercase',
          opacity: scrolled ? 1 : 0.7,
          transition: 'opacity 0.3s',
        }}
      >
        ☪ &nbsp;Islamic AI
      </a>

      {/* Desktop links */}
      <div
        style={{
          display: 'flex',
          gap: '2.5rem',
          listStyle: 'none',
        }}
        className="hidden-mobile"
      >
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase().replace(' ', '-')}`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 400,
              letterSpacing: '0.15em',
              color: '#b8b4ac',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
              opacity: scrolled ? 1 : 0,
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#f5f0e8')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#b8b4ac')}
          >
            {l}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.78rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#050505',
            background: '#a0845c',
            border: 'none',
            borderRadius: '2px',
            padding: '0.6rem 1.4rem',
            cursor: 'pointer',
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.3s, background 0.2s',
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.background = '#c4a97d')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.background = '#a0845c')}
        >
          Download App
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#f5f0e8',
            padding: '0.25rem',
            display: 'none',
          }}
          className="show-mobile"
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect y="4" width="22" height="1.5" fill="currentColor" />
            <rect y="10.25" width="16" height="1.5" fill="currentColor" />
            <rect y="16.5" width="22" height="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5,5,5,0.97)',
            backdropFilter: 'blur(20px)',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '2rem',
              background: 'none',
              border: 'none',
              color: '#b8b4ac',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(' ', '-')}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                fontWeight: 400,
                color: '#f5f0e8',
                textDecoration: 'none',
                letterSpacing: '0.05em',
              }}
            >
              {l}
            </a>
          ))}
          <button
            style={{
              marginTop: '1rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#050505',
              background: '#a0845c',
              border: 'none',
              borderRadius: '2px',
              padding: '0.75rem 2rem',
              cursor: 'pointer',
            }}
          >
            Download App
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
