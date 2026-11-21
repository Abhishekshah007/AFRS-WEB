'use client'

import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 1800
const STEP_MS = 16

/**
 * Animates from the current value to `end` once the number scrolls into view. If `end`
 * changes later (e.g. the live visitor total arrives after the first animation), it
 * animates on to the new value instead of staying on the old one.
 */
export function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useRef(false)
  const countRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const animateTo = (target: number) => {
      if (timerRef.current) clearInterval(timerRef.current)
      const from = countRef.current
      if (from === target) return
      const totalSteps = DURATION_MS / STEP_MS
      const increment = (target - from) / totalSteps
      let current = from

      timerRef.current = setInterval(() => {
        current += increment
        const done = increment >= 0 ? current >= target : current <= target
        const next = done ? target : Math.floor(current)
        countRef.current = next
        setCount(next)
        if (done && timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
      }, STEP_MS)
    }

    // Already on screen: move straight to the new value.
    if (visible.current) {
      animateTo(end)
      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible.current) {
          visible.current = true
          animateTo(end)
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [end])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}
