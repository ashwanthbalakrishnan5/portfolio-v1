import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

// Spatial grid cell size — matches connection distance for efficient lookups
const CELL_SIZE = 120
const CONNECTION_DIST = 120
const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST
const MOUSE_DIST = 200
const MOUSE_DIST_SQ = MOUSE_DIST * MOUSE_DIST
const MAX_PARTICLES = 40

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const reducedMotion = useRef(false)

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 25000), MAX_PARTICLES)
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }))
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = mq.matches
    if (mq.matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Cap DPR at 2 to avoid rendering 4x pixels on retina displays
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles(window.innerWidth, window.innerHeight)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const animate = () => {
      // Skip when tab is hidden
      if (document.hidden) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Build spatial grid
      const cols = Math.ceil(w / CELL_SIZE) + 1
      const rows = Math.ceil(h / CELL_SIZE) + 1
      const grid: number[][] = new Array(cols * rows)

      // Update positions and assign to grid
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const col = Math.floor(p.x / CELL_SIZE)
        const row = Math.floor(p.y / CELL_SIZE)
        const cellIdx = row * cols + col
        if (!grid[cellIdx]) grid[cellIdx] = []
        grid[cellIdx].push(i)
      }

      // Batch all particle dots into one path
      ctx.fillStyle = 'rgba(124, 58, 237, 0.3)'
      ctx.beginPath()
      for (const p of particles) {
        ctx.moveTo(p.x + p.radius, p.y)
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      }
      ctx.fill()

      // Draw connections using spatial grid — only check neighboring cells
      ctx.lineWidth = 0.5
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cellIdx = row * cols + col
          const cell = grid[cellIdx]
          if (!cell) continue

          // Check this cell + 4 neighbors (right, below, below-right, below-left)
          const neighbors = [
            cellIdx,
            col + 1 < cols ? cellIdx + 1 : -1,
            row + 1 < rows ? cellIdx + cols : -1,
            col + 1 < cols && row + 1 < rows ? cellIdx + cols + 1 : -1,
            col - 1 >= 0 && row + 1 < rows ? cellIdx + cols - 1 : -1,
          ]

          for (const ni of neighbors) {
            if (ni < 0) continue
            const neighborCell = grid[ni]
            if (!neighborCell) continue

            const isSameCell = ni === cellIdx
            for (let a = 0; a < cell.length; a++) {
              const startJ = isSameCell ? a + 1 : 0
              for (let b = startJ; b < neighborCell.length; b++) {
                const pi = particles[cell[a]]
                const pj = particles[neighborCell[b]]
                const dx = pi.x - pj.x
                const dy = pi.y - pj.y
                const distSq = dx * dx + dy * dy

                if (distSq < CONNECTION_DIST_SQ) {
                  const dist = Math.sqrt(distSq)
                  const alpha = (1 - dist / CONNECTION_DIST) * 0.08
                  ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`
                  ctx.beginPath()
                  ctx.moveTo(pi.x, pi.y)
                  ctx.lineTo(pj.x, pj.y)
                  ctx.stroke()
                }
              }
            }
          }
        }
      }

      // Mouse connections — only check particles near mouse
      const mCol = Math.floor(mouse.x / CELL_SIZE)
      const mRow = Math.floor(mouse.y / CELL_SIZE)
      const searchRadius = Math.ceil(MOUSE_DIST / CELL_SIZE)

      for (let dr = -searchRadius; dr <= searchRadius; dr++) {
        for (let dc = -searchRadius; dc <= searchRadius; dc++) {
          const r = mRow + dr
          const c = mCol + dc
          if (r < 0 || r >= rows || c < 0 || c >= cols) continue
          const cell = grid[r * cols + c]
          if (!cell) continue

          for (const idx of cell) {
            const p = particles[idx]
            const mdx = p.x - mouse.x
            const mdy = p.y - mouse.y
            const mDistSq = mdx * mdx + mdy * mdy

            if (mDistSq < MOUSE_DIST_SQ) {
              const mDist = Math.sqrt(mDistSq)
              const alpha = (1 - mDist / MOUSE_DIST) * 0.15
              ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(mouse.x, mouse.y)
              ctx.stroke()
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [initParticles])

  if (reducedMotion.current) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  )
}

export default ParticleField
