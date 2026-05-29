'use client'

import React, { useEffect, useMemo, useRef } from 'react'

type IconFn = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  a: number,
  stroke: string,
  fill: string,
) => void

export type ForensicBackgroundProps = {
  className?: string

  /** Visual theme: pick one or use "custom" */
  theme?: 'dark' | 'light' | 'custom'
  /** Only used when theme="custom" */
  customTheme?: {
    stroke?: string
    fill?: string
    particleAlpha?: number
    alphaPulse?: number
    // trail fade: 0 disables trails (crisp), bigger leaves longer streaks
    trail?: number
    backgroundFade?: number // how much the canvas fades each frame (0..1)
  }

  /** Particle count (if not set, auto-scales with area) */
  particleCount?: number

  /** Motion controls */
  speed?: number
  roamingStrength?: number // how “free” it roams
  attractionStrength?: number // mouse attraction to particles
  interactionRadius?: number // mouse radius

  /** Click interaction */
  enableClick?: boolean
  clickRadius?: number
  clickStrength?: number
  clickBoostAlpha?: number
  clickCooldownMs?: number

  /** Performance / UX */
  pauseWhenOffscreen?: boolean
  enableTouch?: boolean

  /** Enable trails (0 = clear each frame) */
  trail?: number
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  angle: number
  va: number
  scale: number
  iconIdx: number
  pulse: number
  pulseSpeed: number

  // Click burst contribution
  burst: number
}

const ICONS: IconFn[] = [
  // DNA helix
  (ctx, x, y, s, a, stroke) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(a)
    ctx.scale(s, s)
    ctx.strokeStyle = stroke
    ctx.lineWidth = 1.5
    ctx.lineCap = 'round'

    ctx.beginPath()
    for (let i = -20; i <= 20; i++) ctx.lineTo(i, Math.sin(i * 0.22) * 8)
    ctx.stroke()

    ctx.beginPath()
    for (let i = -20; i <= 20; i++) ctx.lineTo(i, -Math.sin(i * 0.22) * 8)
    ctx.stroke()

    ctx.lineWidth = 0.8
    for (let i = -18; i <= 18; i += 7) {
      ctx.beginPath()
      ctx.moveTo(i, Math.sin(i * 0.22) * 8)
      ctx.lineTo(i, -Math.sin(i * 0.22) * 8)
      ctx.stroke()
    }
    ctx.restore()
  },

  // Fingerprint
  (ctx, x, y, s, a, stroke) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(a)
    ctx.scale(s, s)
    ctx.strokeStyle = stroke
    ctx.lineWidth = 1.2

    for (let r = 4; r <= 22; r += 4) {
      ctx.beginPath()
      ctx.arc(0, 0, r, Math.PI * 0.15, Math.PI * 0.85)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(0, -2, r - 1, Math.PI * 1.15, Math.PI * 1.85)
      ctx.stroke()
    }
    ctx.restore()
  },

  // Molecule
  (ctx, x, y, s, a, stroke) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(a)
    ctx.scale(s, s)
    ctx.strokeStyle = stroke
    ctx.lineWidth = 1.3

    const pts = Array.from({ length: 6 }, (_, i) => [
      14 * Math.cos((i * Math.PI) / 3 - Math.PI / 6),
      14 * Math.sin((i * Math.PI) / 3 - Math.PI / 6),
    ]) as Array<[number, number]>

    ctx.beginPath()
    pts.forEach(([px, py], i) => (i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)))
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(0, 0, 7, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  },

  // Magnifying glass
  (ctx, x, y, s, a, stroke) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(a)
    ctx.scale(s, s)
    ctx.strokeStyle = stroke
    ctx.lineWidth = 1.5
    ctx.lineCap = 'round'

    ctx.beginPath()
    ctx.arc(-4, -4, 12, 0, Math.PI * 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(5, 5)
    ctx.lineTo(18, 18)
    ctx.stroke()
    ctx.restore()
  },

  // Atom
  (ctx, x, y, s, a, stroke, fill) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(a)
    ctx.scale(s, s)
    ctx.strokeStyle = stroke
    ctx.lineWidth = 1.1

    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.ellipse(0, 0, 18, 8, (i * Math.PI) / 3, 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.beginPath()
    ctx.arc(0, 0, 3, 0, Math.PI * 2)
    ctx.fillStyle = fill
    ctx.fill()
    ctx.restore()
  },
]

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
}

export function ForensicBackground({
  className = '',
  theme = 'dark',
  customTheme,
  particleCount,
  speed = 1,
  roamingStrength = 0.85,
  attractionStrength = 0.4,
  interactionRadius = 90,

  enableClick = true,
  clickRadius = 110,
  clickStrength = 0.95,
  clickBoostAlpha = 0.35,
  clickCooldownMs = 220,

  pauseWhenOffscreen = true,
  enableTouch = true,

  trail = 0.02,
}: ForensicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const rafRef = useRef<number | null>(null)
  const runningRef = useRef(true)
  const dprRef = useRef(1)
  const sizeRef = useRef({ w: 0, h: 0 })

  const mouseRef = useRef({ x: -9999, y: -9999, active: false })

  // Click pulses
  const clickRef = useRef({
    x: -9999,
    y: -9999,
    activeUntil: 0,
    radius: clickRadius,
    strength: clickStrength,
    lastAt: 0,
  })

  const particlesRef = useRef<Particle[]>([])

  const canAnimate = useMemo(() => !prefersReducedMotion(), [])

  const themeResolved = useMemo(() => {
    const base =
      theme === 'light'
        ? {
            stroke: 'rgba(20, 30, 60, 0.55)',
            fill: 'rgba(20, 30, 60, 0.65)',
            particleAlpha: 0.26,
            alphaPulse: 0.22,
            backgroundFade: 0.0,
            trail,
          }
        : {
            // dark default
            stroke: 'rgba(255,255,255,0.55)',
            fill: 'rgba(255,255,255,0.65)',
            particleAlpha: 0.32,
            alphaPulse: 0.22,
            backgroundFade: 0.0,
            trail,
          }

    if (theme !== 'custom') return base
    return {
      ...base,
      ...(customTheme ?? {}),
      trail: customTheme?.trail ?? trail,
    }
  }, [theme, customTheme, trail])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const parent = canvas.parentElement
      const w = parent ? parent.clientWidth : canvas.clientWidth
      const h = parent ? parent.clientHeight : canvas.clientHeight

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      dprRef.current = dpr

      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      sizeRef.current = { w, h }

      const area = w * h
      const defaultCount = Math.round(Math.min(90, Math.max(22, area / 36000)))
      const count = particleCount ?? defaultCount

      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35 * speed * roamingStrength,
        vy: (Math.random() - 0.5) * 0.35 * speed * roamingStrength,
        angle: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.008,
        scale: 0.5 + Math.random() * 0.9,
        iconIdx: Math.floor(Math.random() * ICONS.length),
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: (0.012 + Math.random() * 0.012) * speed,
        burst: 0,
      }))
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const getLocal = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect()
      const x = ((clientX - r.left) / r.width) * sizeRef.current.w
      const y = ((clientY - r.top) / r.height) * sizeRef.current.h
      return { x, y }
    }

    const onMouseMove = (e: MouseEvent) => {
      const { x, y } = getLocal(e.clientX, e.clientY)
      mouseRef.current.x = x
      mouseRef.current.y = y
      mouseRef.current.active = true
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    let cleanupTouch: (() => void) | null = null
    if (enableTouch) {
      const onTouchMove = (e: TouchEvent) => {
        const t = e.touches?.[0]
        if (!t) return
        const { x, y } = getLocal(t.clientX, t.clientY)
        mouseRef.current.x = x
        mouseRef.current.y = y
        mouseRef.current.active = true
      }
      const onTouchEnd = () => {
        mouseRef.current.active = false
      }
      canvas.addEventListener('touchmove', onTouchMove, { passive: true })
      canvas.addEventListener('touchend', onTouchEnd)
      canvas.addEventListener('touchcancel', onTouchEnd)
      cleanupTouch = () => {
        canvas.removeEventListener('touchmove', onTouchMove)
        canvas.removeEventListener('touchend', onTouchEnd)
        canvas.removeEventListener('touchcancel', onTouchEnd)
      }
    }

    const onVisibilityChange = () => {
      runningRef.current = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    // Click burst
    const onClick = (e: MouseEvent) => {
      if (!enableClick) return
      const now = performance.now()
      if (now - clickRef.current.lastAt < clickCooldownMs) return

      const { x, y } = getLocal(e.clientX, e.clientY)
      clickRef.current.lastAt = now
      clickRef.current.x = x
      clickRef.current.y = y
      clickRef.current.activeUntil = now + 520
      clickRef.current.radius = clickRadius
      clickRef.current.strength = clickStrength
    }
    canvas.addEventListener('click', onClick)

    // Pause when offscreen
    let observer: IntersectionObserver | null = null
    if (pauseWhenOffscreen && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          runningRef.current =
            (entries[0]?.isIntersecting ?? true) && document.visibilityState === 'visible'
        },
        { threshold: 0.1 },
      )
      observer.observe(canvas)
    }

    const step = () => {
      rafRef.current = requestAnimationFrame(step)
      if (!canAnimate) return
      if (!runningRef.current) return

      const { w, h } = sizeRef.current
      const dpr = dprRef.current

      // Trail / fade
      if (trail > 0) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.fillStyle = `rgba(0,0,0,${Math.min(0.35, trail)})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      ctx.save()
      ctx.scale(dpr, dpr)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseActive = mouseRef.current.active

      const clickActive = performance.now() < clickRef.current.activeUntil
      const cx = clickRef.current.x
      const cy = clickRef.current.y

      for (const p of particlesRef.current) {
        // roaming
        p.x += p.vx
        p.y += p.vy
        p.angle += p.va
        p.pulse += p.pulseSpeed

        // subtle wander to avoid looking “grid-like”
        const wander = 0.0022 * speed * roamingStrength
        p.vx += (Math.random() - 0.5) * wander
        p.vy += (Math.random() - 0.5) * wander

        // wrap
        if (p.x < -40) p.x = w + 40
        if (p.x > w + 40) p.x = -40
        if (p.y < -40) p.y = h + 40
        if (p.y > h + 40) p.y = -40

        // mouse attraction
        if (mouseActive) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.hypot(dx, dy)
          if (dist < interactionRadius && dist > 0.0001) {
            const f = ((interactionRadius - dist) / interactionRadius) * attractionStrength
            p.vx += (dx / dist) * f
            p.vy += (dy / dist) * f
          }
        }

        // click burst force (short-lived)
        if (clickActive) {
          const dx = p.x - cx
          const dy = p.y - cy
          const dist = Math.hypot(dx, dy)
          if (dist < clickRef.current.radius && dist > 0.0001) {
            const t = 1 - dist / clickRef.current.radius
            const f = t * clickRef.current.strength
            p.vx += (dx / dist) * f
            p.vy += (dy / dist) * f
            p.burst = Math.min(1, p.burst + t * 0.9)
          }
        }

        // burst decay
        p.burst *= 0.94

        // damping for stability
        const spd = Math.hypot(p.vx, p.vy)
        if (spd > 1.0) {
          p.vx *= 0.985
          p.vy *= 0.985
        }

        const scaleNow = p.scale * (0.88 + 0.12 * Math.sin(p.pulse))
        const pulseAlpha = Math.max(
          0,
          Math.min(1, themeResolved.particleAlpha + themeResolved.alphaPulse * Math.sin(p.pulse)),
        )
        const clickAlpha = p.burst * clickBoostAlpha
        const alpha = Math.max(0, Math.min(1, pulseAlpha + clickAlpha))

        ctx.globalAlpha = alpha
        ICONS[p.iconIdx](
          ctx,
          p.x,
          p.y,
          scaleNow * (1 + p.burst * 0.12),
          p.angle,
          themeResolved.stroke ?? 'rgba(255,255,255,0.55)',
          themeResolved.fill ?? 'rgba(255,255,255,0.65)',
        )
      }

      ctx.restore()
      ctx.globalAlpha = 1
    }

    if (canAnimate) rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      canvas.removeEventListener('click', onClick)
      observer?.disconnect()
      cleanupTouch?.()
    }
  }, [
    canAnimate,
    particleCount,
    speed,
    roamingStrength,
    attractionStrength,
    interactionRadius,
    enableClick,
    clickRadius,
    clickStrength,
    clickBoostAlpha,
    clickCooldownMs,
    pauseWhenOffscreen,
    enableTouch,
    trail,
    themeResolved,
  ])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'auto' }} // allow clicks
    />
  )
}
