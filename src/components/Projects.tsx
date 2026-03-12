import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star, Github } from 'lucide-react'
import { projects } from '../data'

interface Project {
  title: string
  description: string
  highlights: string[]
  technologies: string[]
  link: string
  stars?: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [tiltX, setTiltX] = useState(0)
  const [tiltY, setTiltY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -6
      const rotateY = ((x - centerX) / centerX) * 6
      setTiltX(rotateY)
      setTiltY(rotateX)
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    setTiltX(0)
    setTiltY(0)
    setIsHovered(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          transform: `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.5s ease' : 'transform 0.4s ease-out, box-shadow 0.5s ease',
          boxShadow: isHovered
            ? '0 0 40px rgba(124, 58, 237, 0.08), 0 0 80px rgba(6, 182, 212, 0.04)'
            : 'none',
        }}
        className="relative group h-full"
      >
        {/* Animated gradient border - only shows as a thin border via mask */}
        <div
          className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(90deg, #7C3AED, #06B6D4, #7C3AED)',
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 8s ease-in-out infinite',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px',
            borderRadius: '1rem',
          }}
        />

        {/* Static subtle border visible by default */}
        <div
          className={`absolute -inset-[1px] rounded-2xl border border-white/[0.06] transition-opacity duration-500 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Card content */}
        <div className="relative rounded-2xl overflow-hidden h-full bg-[#0a0a1a]/95 backdrop-blur-xl border-0">
          {/* Top gradient overlay */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-violet/[0.06] to-transparent pointer-events-none" />

          <div className="relative p-6 flex flex-col h-full">
            {/* Header row */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-violet/10 text-violet-light">
                  <Github className="w-5 h-5" />
                </div>
                {project.stars && (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass text-xs font-mono border-0 bg-white/[0.04]">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-fg-muted">{project.stars}</span>
                  </span>
                )}
              </div>

              {/* Link arrow */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-2 rounded-lg text-fg-dim hover:text-fg transition-colors duration-300"
                aria-label={`View ${project.title} on GitHub`}
              >
                <motion.div
                  initial={false}
                  animate={{
                    x: isHovered ? 0 : -4,
                    y: isHovered ? 0 : 4,
                    opacity: isHovered ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <ExternalLink className="w-4.5 h-4.5" />
                </motion.div>
              </a>
            </div>

            {/* Title */}
            <h3
              className="font-heading font-bold text-xl text-fg mb-2 group-hover:text-violet-light transition-colors duration-300"
            >
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-fg-muted text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <ul className="space-y-2 mb-5">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-fg-muted">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet shrink-0" />
                    <span className="line-clamp-2">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Spacer to push tech tags to bottom */}
            <div className="flex-1" />

            {/* Technology tags */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-mono rounded-full glass border-0 bg-white/[0.04] text-fg-muted hover:text-cyan-light hover:bg-cyan/10 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Projects() {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-cyan/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-violet" />
            <span className="font-mono text-xs uppercase tracking-widest text-violet">
              Projects
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold gradient-text">
            Featured Work
          </h2>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
