import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function AdvancedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    interface Particle {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      opacity: number
    }

    // Create particles
    const particles: Particle[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: Math.random() * 2,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    }))

    interface Shape {
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      type: number
      opacity: number
    }

    // Create geometric shapes
    const shapes: Shape[] = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 60 + 30,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      type: Math.floor(Math.random() * 3),
      opacity: Math.random() * 0.15 + 0.05
    }))

    let animationFrameId: number
    let time = 0

    const animate = () => {
      time++
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)'
      ctx.fillRect(0, 0, width, height)

      // Draw animated grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)'
      ctx.lineWidth = 1
      const gridSize = 50
      const offset = (time * 0.02) % gridSize

      for (let i = 0; i < width; i += gridSize) {
        ctx.beginPath()
        ctx.moveTo(i + offset, 0)
        ctx.lineTo(i + offset + width * 0.1, height)
        ctx.stroke()
      }

      for (let i = 0; i < height; i += gridSize) {
        ctx.beginPath()
        const perspective = i / height
        ctx.moveTo(0, i + offset)
        ctx.lineTo(width, i + offset - perspective * 20)
        ctx.stroke()
      }

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.z += p.vz

        if (p.z > 1000) {
          p.z = 0
          p.x = Math.random() * width
          p.y = Math.random() * height
        }

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        const scale = 1000 / (1000 + p.z)
        const x = p.x * scale + width / 2 * (1 - scale)
        const y = p.y * scale + height / 2 * (1 - scale)
        const size = p.size * scale

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity * scale})`
        ctx.fill()

        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      // Update and draw shapes
      shapes.forEach(s => {
        s.rotation += s.rotationSpeed
        s.y += 0.3
        if (s.y > height + 100) {
          s.y = -100
          s.x = Math.random() * width
        }

        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate(s.rotation)
        ctx.strokeStyle = `rgba(56, 189, 248, ${s.opacity})`
        ctx.lineWidth = 2

        if (s.type === 0) {
          // Cube
          const sz = s.size
          ctx.strokeRect(-sz/2, -sz/2, sz, sz)
          ctx.strokeRect(-sz/2 + 10, -sz/2 + 10, sz, sz)
          ctx.beginPath()
          ctx.moveTo(-sz/2, -sz/2)
          ctx.lineTo(-sz/2 + 10, -sz/2 + 10)
          ctx.moveTo(sz/2, -sz/2)
          ctx.lineTo(sz/2 + 10, -sz/2 + 10)
          ctx.moveTo(-sz/2, sz/2)
          ctx.lineTo(-sz/2 + 10, sz/2 + 10)
          ctx.moveTo(sz/2, sz/2)
          ctx.lineTo(sz/2 + 10, sz/2 + 10)
          ctx.stroke()
        } else if (s.type === 1) {
          // Triangle
          ctx.beginPath()
          ctx.moveTo(0, -s.size / 2)
          ctx.lineTo(-s.size / 2, s.size / 2)
          ctx.lineTo(s.size / 2, s.size / 2)
          ctx.closePath()
          ctx.stroke()
        } else {
          // Hexagon
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i
            const x = Math.cos(angle) * s.size / 2
            const y = Math.sin(angle) * s.size / 2
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.stroke()
        }

        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900/90 via-dark-800/80 to-dark-900/90 z-0"></div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 bg-radial-gradient opacity-40 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 70%)'
        }}
      />
    </>
  )
}

export default AdvancedBackground
