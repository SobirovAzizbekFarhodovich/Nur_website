export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        padding: '4rem 2.5rem 3rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem',
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.95rem',
              letterSpacing: '0.25em',
              color: '#f5f0e8',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            ☪ Islamic AI
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 300,
              color: '#7a6240',
              lineHeight: 1.7,
              maxWidth: '220px',
            }}
          >
            Bringing faith, knowledge and technology closer together.
          </p>
        </div>

        {/* Links */}
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: '#064e3b',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}
          >
            Navigate
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {['About', 'Features', 'Privacy', 'Terms', 'Contact'].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  color: '#7a6240',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#b8b4ac')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#7a6240')}
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Download */}
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: '#064e3b',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}
          >
            Download
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'App Store', icon: '' },
              { label: 'Google Play', icon: '' },
            ].map((app) => (
              <button
                key={app.label}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  color: '#b8b4ac',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '4px',
                  padding: '0.6rem 1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.2s',
                  width: '100%',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(160,132,92,0.3)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)')}
              >
                {app.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.68rem',
            color: '#4a4a4a',
            letterSpacing: '0.05em',
          }}
        >
          © {year} Islamic AI. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: '0.72rem',
            color: '#4a4a4a',
            letterSpacing: '0.05em',
          }}
        >
          From Screen to Soul
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
