import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -200, y: -200 })
  const dot = useRef({ x: -200, y: -200 })
  const animId = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      dot.current.x += (pos.current.x - dot.current.x) * 0.12
      dot.current.y += (pos.current.y - dot.current.y) * 0.12

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${dot.current.x - 200}px, ${dot.current.y - 200}px)`
      }
      animId.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId.current)
    }
  }, [])

  return (
    <>
      {/* Precise dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#a0845c',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Glow aura */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,78,59,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
          willChange: 'transform',
        }}
      />
    </>
  )
}
