import { useEffect, useRef, useCallback } from 'react'

const SPOTLIGHT_RADIUS = 250
const SPOTLIGHT_COLOR = { r: 124, g: 58, b: 237 } // violet
const SPOTLIGHT_OPACITY = 0.1
const LERP_FACTOR = 0.08

function SpotlightCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const currentRef = useRef({ x: -1000, y: -1000 })
  const visibleRef = useRef(0) // 0 = hidden, 1 = fully visible
  const animationRef = useRef<number>(0)
  const prefersReducedMotion = useRef(false)

  const lerp = useCallback((a: number, b: number, t: number) => a + (b - a) * t, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mq.matches

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches
    }
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      visibleRef.current = 1
    }

    const handleMouseLeave = () => {
      visibleRef.current = 0
    }

    const handleMouseEnter = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      visibleRef.current = 1
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      if (prefersReducedMotion.current) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }

      const lerpSpeed = LERP_FACTOR
      currentRef.current.x = lerp(currentRef.current.x, mouseRef.current.x, lerpSpeed)
      currentRef.current.y = lerp(currentRef.current.y, mouseRef.current.y, lerpSpeed)

      // Fade opacity based on visibility
      const targetOpacity = visibleRef.current === 1 ? SPOTLIGHT_OPACITY : 0
      const currentOpacity = parseFloat(canvas.dataset.opacity || '0')
      const nextOpacity = lerp(currentOpacity, targetOpacity, 0.05)
      canvas.dataset.opacity = String(nextOpacity)

      if (nextOpacity > 0.001) {
        const { r, g, b } = SPOTLIGHT_COLOR
        const gradient = ctx.createRadialGradient(
          currentRef.current.x,
          currentRef.current.y,
          0,
          currentRef.current.x,
          currentRef.current.y,
          SPOTLIGHT_RADIUS
        )
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${nextOpacity})`)
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${nextOpacity * 0.6})`)
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${nextOpacity * 0.2})`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      setCanvasSize()
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('resize', handleResize)

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [lerp])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default SpotlightCursor
