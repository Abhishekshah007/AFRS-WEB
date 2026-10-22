import type Lenis from 'lenis'

let current: Lenis | null = null

export function registerLenis(instance: Lenis | null) {
  current = instance
}

export function setLenisStopped(stopped: boolean) {
  if (!current) return
  if (stopped) current.stop()
  else current.start()
}
