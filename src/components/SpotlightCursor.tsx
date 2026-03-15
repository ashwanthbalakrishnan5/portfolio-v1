import { useEffect, useRef } from 'react'

const SPOTLIGHT_RADIUS = 250
const SPOTLIGHT_COLOR = { r: 124, g: 58, b: 237 } // violet
const SPOTLIGHT_OPACITY = 0.1
const LERP_FACTOR = 0.08
// Stop rendering when the cursor position converges within this threshold
const IDLE_THRESHOLD = 0.5

function SpotlightCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const currentRef = useRef({ x: -1000, y: -1000 })
  const visibleRef = useRef(0) // 0 = hidden, 1 = fully visible
  const animationRef = useRef<number>(0)
  const prefersReducedMotion = useRef(false)
  const currentOpacityRef = useRef(0)

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
      // Cap DPR at 2
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
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
      if (prefersReducedMotion.current || document.hidden) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }

      const cur = currentRef.current
      const mouse = mouseRef.current

      cur.x += (mouse.x - cur.x) * LERP_FACTOR
      cur.y += (mouse.y - cur.y) * LERP_FACTOR

      // Fade opacity
      const targetOpacity = visibleRef.current === 1 ? SPOTLIGHT_OPACITY : 0
      const nextOpacity = currentOpacityRef.current + (targetOpacity - currentOpacityRef.current) * 0.05
      currentOpacityRef.current = nextOpacity

      // Skip drawing if fully faded and converged (idle state)
      const dx = Math.abs(mouse.x - cur.x)
      const dy = Math.abs(mouse.y - cur.y)
      if (nextOpacity < 0.001 && dx < IDLE_THRESHOLD && dy < IDLE_THRESHOLD) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, width, height)

      if (nextOpacity > 0.001) {
        const { r, g, b } = SPOTLIGHT_COLOR
        const gradient = ctx.createRadialGradient(
          cur.x, cur.y, 0,
          cur.x, cur.y, SPOTLIGHT_RADIUS
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('resize', setCanvasSize)

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default SpotlightCursor
