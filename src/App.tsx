import { useState } from 'react'
import Particles from './components/Particles.tsx'
import CinematicIntro from './components/CinematicIntro.tsx'
import CursorGlow from './components/CursorGlow.tsx'
import Navbar from './components/Navbar.tsx'
import Hero from './components/Hero.tsx'
import ScreenCanSpeak from './components/ScreenCanSpeak.tsx'
import AICompanion from './components/AICompanion.tsx'
import MoodSelector from './components/Moodselector.tsx'
import RecitationSection from './components/RecitationSection'
import SacredKnowledge from './components/SacredKnowledge.tsx'
import KnowledgeExplorer from './components/KnowledgeExplorer.tsx'
import ResponsibleAI from './components/ResponsibleAi.tsx'
import FinalScene from './components/FinalScene.tsx'
import Footer from './components/Footer.tsx'

function HairlineDivider() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2.5rem' }}>
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(6,78,59,0.2) 30%, rgba(255,255,255,0.05) 50%, rgba(6,78,59,0.2) 70%, transparent 100%)',
      }} />
    </div>
  )
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#f5f0e8', position: 'relative', overflowX: 'hidden' }}>
      {/* Grain */}
      <div className="grain" />

      {/* Cursor glow — desktop only */}
      <div className="cursor-container">
        <CursorGlow />
      </div>

      {/* Particles */}
      <Particles count={60} />

      {/* Intro */}
      <CinematicIntro onComplete={() => setIntroComplete(true)} />

      {/* Main experience */}
      <div style={{ opacity: introComplete ? 1 : 0, transition: 'opacity 1s ease' }}>
        <Navbar />

        {/* Fixed global ambient glow */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 140% 80% at 50% -5%, rgba(6,78,59,0.07) 0%, transparent 55%)',
        }} />

        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <HairlineDivider />
          <ScreenCanSpeak />
          <HairlineDivider />
          <AICompanion />
          <HairlineDivider />
          <MoodSelector />
          <HairlineDivider />
          <RecitationSection />
          <HairlineDivider />
          <SacredKnowledge />
          <HairlineDivider />
          <KnowledgeExplorer />
          <HairlineDivider />
          <ResponsibleAI />
          <FinalScene />
        </main>

        <Footer />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .cursor-container { display: none; }
        }
      `}</style>
    </div>
  )
}
