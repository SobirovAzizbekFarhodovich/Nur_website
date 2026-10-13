/**
 * The living sky behind the one-day story, drawn on a canvas and driven by the scroll
 * position p (0 = 05:12 dawn … 5 = 22:30 night). The sun climbs an arc and sets, the moon
 * rises after dusk, stars come out and the eight-point star lattice glows faintly at night.
 */

type RGB = [number, number, number]
type Key = { top: RGB; mid: RGB; low: RGB; glow: RGB; glowA: number }

const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]

// One key per hour of the story, in scene order.
const KEYS: Key[] = [
  { top: hex('#0a1524'), mid: hex('#1f2646'), low: hex('#57333f'), glow: hex('#d88a4a'), glowA: 0.75 }, // 05:12 dawn
  { top: hex('#163e45'), mid: hex('#2c5752'), low: hex('#3f6656'), glow: hex('#f0dca0'), glowA: 0.35 }, // 09:00 morning
  { top: hex('#d6e4e2'), mid: hex('#e6ede7'), low: hex('#cbd9cf'), glow: hex('#fffdf3'), glowA: 0.8 }, // 13:00 midday mist
  { top: hex('#2a1d16'), mid: hex('#4d3018'), low: hex('#7a4424'), glow: hex('#e2913f'), glowA: 0.75 }, // 18:40 gold dusk
  { top: hex('#030f0b'), mid: hex('#062318'), low: hex('#0a3023'), glow: hex('#c9a646'), glowA: 0.08 }, // 21:30 night
  { top: hex('#020c09'), mid: hex('#051d15'), low: hex('#0a2c20'), glow: hex('#c9a646'), glowA: 0.22 }, // 22:30 late
]

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const mix = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
const css = (c: RGB, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`

/** Relative luminance (WCAG). */
export function luminance(c: RGB): number {
  const f = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2])
}

export function skyAt(p: number): Key {
  const i = clamp(Math.floor(p), 0, KEYS.length - 1)
  const j = Math.min(i + 1, KEYS.length - 1)
  // Ease within each hour so the colour settles while a scene is being read.
  const t = smooth(0.15, 0.85, p - i)
  const a = KEYS[i]
  const b = KEYS[j]
  return { top: mix(a.top, b.top, t), mid: mix(a.mid, b.mid, t), low: mix(a.low, b.low, t), glow: mix(a.glow, b.glow, t), glowA: lerp(a.glowA, b.glowA, t) }
}

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

function starPath(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  const inner = (r * Math.cos(Math.PI / 4)) / Math.cos(Math.PI / 8)
  ctx.moveTo(x, y - r)
  for (let k = 1; k < 16; k++) {
    const a = -Math.PI / 2 + (k * Math.PI) / 8
    const rad = k % 2 ? inner : r
    ctx.lineTo(x + rad * Math.cos(a), y + rad * Math.sin(a))
  }
  ctx.closePath()
}

/** Where the page's own objects sit, so the sun and moon travel through open sky. */
export type SkyLayout = { gapX: number | null }

type Pt = { p: number; x: number; y: number }
function along(path: Pt[], p: number) {
  if (p <= path[0].p) return path[0]
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i]
    const b = path[i + 1]
    if (p <= b.p) {
      const t = smooth(a.p, b.p, p)
      return { p, x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) }
    }
  }
  return path[path.length - 1]
}

export class Sky {
  private layout: SkyLayout = { gapX: null }
  private moonSprite: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D
  private w = 0
  private h = 0
  private dpr = 1
  private stars: { x: number; y: number; r: number; a: number; tw: number }[] = []
  private lattice: HTMLCanvasElement | null = null
  private ridgeFar: Path2D | null = null
  private ridgeNear: Path2D | null = null

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d', { alpha: false })!
    const r = rng(7)
    for (let i = 0; i < 220; i++) {
      this.stars.push({ x: r(), y: Math.pow(r(), 1.6) * 0.8, r: r() < 0.08 ? 1.5 : 0.6 + r() * 0.7, a: 0.35 + r() * 0.65, tw: r() * Math.PI * 2 })
    }
  }

  setLayout(layout: SkyLayout) {
    this.layout = layout
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    this.w = window.innerWidth
    this.h = window.innerHeight
    this.canvas.width = Math.round(this.w * this.dpr)
    this.canvas.height = Math.round(this.h * this.dpr)
    this.buildLattice()
    this.buildRidges()
  }

  private buildLattice() {
    const cell = 132
    const c = document.createElement('canvas')
    c.width = cell * this.dpr
    c.height = cell * this.dpr
    const g = c.getContext('2d')!
    g.scale(this.dpr, this.dpr)
    g.strokeStyle = 'rgb(230,204,126)'
    g.lineWidth = 0.8
    g.beginPath()
    starPath(g, cell / 2, cell / 2, cell * 0.3)
    g.stroke()
    // Quarter stars at the corners make the lattice continuous.
    for (const [x, y] of [[0, 0], [cell, 0], [0, cell], [cell, cell]]) {
      g.beginPath()
      starPath(g, x, y, cell * 0.12)
      g.stroke()
    }
    this.lattice = c
  }

  private buildRidges() {
    const { w, h } = this
    const ridge = (seed: number, base: number, amp: number) => {
      const r = rng(seed)
      const pts: number[] = []
      const n = 9
      for (let i = 0; i <= n; i++) pts.push(base - r() * amp)
      const path = new Path2D()
      path.moveTo(0, h)
      path.lineTo(0, pts[0])
      for (let i = 0; i < n; i++) {
        const x0 = (i / n) * w
        const x1 = ((i + 1) / n) * w
        const xm = (x0 + x1) / 2
        path.quadraticCurveTo(x0 + (x1 - x0) * 0.25, pts[i], xm, (pts[i] + pts[i + 1]) / 2)
        path.quadraticCurveTo(x1 - (x1 - x0) * 0.25, pts[i + 1], x1, pts[i + 1])
      }
      path.lineTo(w, h)
      path.closePath()
      return path
    }
    this.ridgeFar = ridge(11, h * 0.93, h * 0.07)
    this.ridgeNear = ridge(23, h * 0.985, h * 0.05)
  }

  /** Draws the sky for scroll position p; t is time in ms for the stars' twinkle. */
  draw(p: number, t: number, still: boolean) {
    const { ctx, w, h } = this
    if (!w) return
    const k = skyAt(p)
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)

    // Ground gradient
    const g = ctx.createLinearGradient(0, 0, 0, h)
    g.addColorStop(0, css(k.top))
    g.addColorStop(0.55, css(k.mid))
    g.addColorStop(1, css(k.low))
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)

    const night = Math.max(smooth(3.35, 4.1, p), 1 - smooth(0.05, 0.9, p)) // stars at dawn fade, return after dusk
    const deepNight = smooth(3.4, 4.2, p)

    // Lattice: the app's eight-point star watermark, only at night
    if (this.lattice && deepNight > 0) {
      ctx.save()
      ctx.globalAlpha = 0.05 * deepNight
      const pat = ctx.createPattern(this.lattice, 'repeat')!
      pat.setTransform(new DOMMatrix().scale(1 / this.dpr))
      ctx.fillStyle = pat
      ctx.fillRect(0, 0, w, h * 0.75)
      ctx.restore()
    }

    // Stars
    if (night > 0.01) {
      for (const s of this.stars) {
        const tw = still ? 1 : 0.75 + 0.25 * Math.sin(t / 900 + s.tw * 3)
        ctx.fillStyle = `rgba(243,238,223,${(s.a * night * tw).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // The sun and moon keep to open sky: on wide screens the gap between the copy and the
    // phone; on phones the text spans the width, so they are drawn faint.
    const horizon = h * 0.9
    const R = Math.min(w, h) * 0.034
    const narrow = this.layout.gapX == null
    const gx = this.layout.gapX ?? w * 0.84
    const bodyA = narrow ? 0.35 : 1
    const sunPath: Pt[] = narrow
      ? [
          { p: 0, x: w * 0.2, y: horizon + R * 3 },
          { p: 0.55, x: w * 0.14, y: horizon - h * 0.02 },
          { p: 1, x: w * 0.3, y: h * 0.24 },
          { p: 2, x: w * 0.62, y: h * 0.18 },
          { p: 3, x: gx, y: horizon - R * 0.6 },
          { p: 3.4, x: gx, y: horizon + R * 4 },
        ]
      : [
          { p: 0, x: gx, y: horizon + R * 3 },
          { p: 0.55, x: gx - w * 0.02, y: horizon - h * 0.04 },
          { p: 1, x: w * 0.3, y: h * 0.22 },
          { p: 2, x: gx, y: h * 0.17 },
          { p: 3, x: gx, y: horizon - R * 0.6 },
          { p: 3.4, x: gx, y: horizon + R * 4 },
        ]
    const sun = along(sunPath, p)
    const high = clamp((horizon - sun.y) / (horizon - h * 0.17))
    // Warm through the morning (so it never reads as the moon), white at noon, warm again at dusk.
    const sunCol =
      p < 1.5
        ? mix(hex('#ff9a4d'), hex('#ffd27a'), smooth(0.3, 1, p))
        : p < 2.3
          ? mix(hex('#ffd27a'), hex('#fff7e6'), smooth(1.5, 2, p))
          : mix(hex('#fff7e6'), hex('#ff9a4d'), smooth(2.3, 3, p))
    // While it crosses the band where the morning copy scrolls out, the disc dims.
    const crossing = narrow ? 1 : 1 - 0.65 * (smooth(1.1, 1.35, p) - smooth(1.65, 1.9, p))
    const sunUp = 1 - smooth(horizon - R, horizon + R * 3, sun.y)
    const M = Math.min(w, h)
    // Halo (visible a little before sunrise and after sunset)
    const haloA = k.glowA * (1 - smooth(3.3, 3.75, p))
    if (haloA > 0.01) {
      const halo = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, M * 0.62)
      halo.addColorStop(0, css(k.glow, 0.55 * haloA))
      halo.addColorStop(0.35, css(k.glow, 0.18 * haloA))
      halo.addColorStop(1, css(k.glow, 0))
      ctx.fillStyle = halo
      ctx.fillRect(0, 0, w, h)
    }
    if (sunUp > 0.01) {
      const disc = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, R)
      disc.addColorStop(0, css(mix(sunCol, [255, 255, 250], 0.55), sunUp * bodyA * crossing))
      disc.addColorStop(0.62, css(sunCol, 0.95 * sunUp * bodyA * crossing))
      disc.addColorStop(1, css(sunCol, 0))
      ctx.fillStyle = disc
      ctx.beginPath()
      ctx.arc(sun.x, sun.y, R, 0, Math.PI * 2)
      ctx.fill()
    }

    // Horizon glow (dawn, dusk, and the closing hour's gold)
    const hg = ctx.createRadialGradient(w * 0.5, h * 1.05, 0, w * 0.5, h * 1.05, Math.max(w, h) * 0.7)
    hg.addColorStop(0, css(k.glow, 0.32 * k.glowA))
    hg.addColorStop(1, css(k.glow, 0))
    ctx.fillStyle = hg
    ctx.fillRect(0, 0, w, h)

    // Moon: a crescent rising in the same open sky after dusk
    const mt = smooth(3.55, 4.6, p)
    if (mt > 0) {
      const mR = M * 0.03
      const mx = gx
      const my = lerp(horizon + mR * 3, h * 0.18, mt)
      const glow = ctx.createRadialGradient(mx, my, 0, mx, my, mR * 7)
      glow.addColorStop(0, `rgba(243,230,191,${0.16 * mt})`)
      glow.addColorStop(1, 'rgba(243,230,191,0)')
      ctx.fillStyle = glow
      ctx.fillRect(mx - mR * 7, my - mR * 7, mR * 14, mR * 14)
      const sprite = this.moon(mR)
      ctx.globalAlpha = 0.95 * mt * bodyA
      ctx.drawImage(sprite, mx - mR * 1.1, my - mR * 1.1, mR * 2.2, mR * 2.2)
      ctx.globalAlpha = 1
    }

    // Distant ridges ground sunrise and sunset; at midday they melt into the mist.
    if (this.ridgeFar && this.ridgeNear) {
      const pale = luminance(k.low)
      const mist = 1 - smooth(0.25, 0.6, pale) * 0.75
      ctx.fillStyle = css(mix(k.low, [4, 14, 10], 0.38 - pale * 0.25), 0.85 * mist)
      ctx.fill(this.ridgeFar)
      // The sun lights the far ridge's rim as it touches it.
      const rim = sunUp * (1 - high) * (narrow ? 0.5 : 1)
      if (rim > 0.02) {
        const rg = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, w * 0.22)
        rg.addColorStop(0, css(hex('#ffc27a'), 0.9 * rim))
        rg.addColorStop(1, css(hex('#ffc27a'), 0))
        ctx.strokeStyle = rg
        ctx.lineWidth = 1.6
        ctx.stroke(this.ridgeFar)
      }
      ctx.fillStyle = css(mix(k.low, [3, 10, 8], 0.62 - pale * 0.35), mist)
      ctx.fill(this.ridgeNear)
    }
  }

  /** A crescent cut with destination-out, so the bite shows the sky behind it. */
  private moon(r: number) {
    const size = Math.ceil(r * 2.2 * this.dpr)
    if (this.moonSprite && this.moonSprite.width === size) return this.moonSprite
    const c = document.createElement('canvas')
    c.width = c.height = size
    const g = c.getContext('2d')!
    const s = size / 2.2
    g.fillStyle = 'rgb(243,230,191)'
    g.beginPath()
    g.arc(size / 2, size / 2, s, 0, Math.PI * 2)
    g.fill()
    g.globalCompositeOperation = 'destination-out'
    g.beginPath()
    g.arc(size / 2 + s * 0.42, size / 2 - s * 0.22, s * 0.92, 0, Math.PI * 2)
    g.fill()
    this.moonSprite = c
    return c
  }
}
