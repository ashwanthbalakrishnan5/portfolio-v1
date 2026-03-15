import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Instagram, Mail, ChevronDown, ExternalLink } from 'lucide-react'
import { name, summary, socialMedia } from '../data'

// ---------------------------------------------------------------------------
// Role titles that cycle with AnimatePresence
// ---------------------------------------------------------------------------
const ROLE_TITLES = [
  'Software Developer',
  'Cloud Architect',
  'Full Stack Engineer',
  'Open Source Contributor',
]

const CYCLE_INTERVAL = 3000

// ---------------------------------------------------------------------------
// Icon resolver
// ---------------------------------------------------------------------------
const ICON_MAP: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  email: Mail,
}

// ---------------------------------------------------------------------------
// Aurora blob definitions
// ---------------------------------------------------------------------------
const AURORA_BLOBS = [
  {
    className: 'w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-violet/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%]',
    animate: {
      x: [0, 120, -80, 60, 0],
      y: [0, -100, 60, -40, 0],
      scale: [1, 1.15, 0.95, 1.1, 1],
      rotate: [0, 45, -20, 30, 0],
    },
    duration: 20,
    style: { top: '10%', left: '15%', filter: 'blur(40px)', willChange: 'transform' } as React.CSSProperties,
  },
  {
    className: 'w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-cyan/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%]',
    animate: {
      x: [0, -100, 80, -60, 0],
      y: [0, 80, -60, 100, 0],
      scale: [1.1, 0.9, 1.2, 1, 1.1],
      rotate: [0, -30, 60, -45, 0],
    },
    duration: 24,
    style: { bottom: '10%', right: '10%', filter: 'blur(45px)', willChange: 'transform' } as React.CSSProperties,
  },
  {
    className: 'w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-indigo-600/15 rounded-[50%_50%_40%_60%/40%_60%_50%_50%]',
    animate: {
      x: [0, 60, -120, 40, 0],
      y: [0, -80, 40, -100, 0],
      scale: [1, 1.2, 0.85, 1.15, 1],
      rotate: [0, 60, -40, 20, 0],
    },
    duration: 18,
    style: { top: '40%', left: '50%', filter: 'blur(35px)', willChange: 'transform' } as React.CSSProperties,
  },
]

// ---------------------------------------------------------------------------
// Floating code snippets for side decoration
// ---------------------------------------------------------------------------
const FLOATING_SNIPPETS = [
  { text: 'const deploy = () =>', x: '8%', y: '25%', delay: 0.8 },
  { text: '<Component />', x: '85%', y: '30%', delay: 1.2 },
  { text: '// TODO: ship it', x: '5%', y: '65%', delay: 1.6 },
  { text: 'git push origin main', x: '82%', y: '70%', delay: 2.0 },
  { text: 'npm run build', x: '12%', y: '45%', delay: 1.0 },
  { text: 'docker compose up', x: '88%', y: '50%', delay: 1.4 },
]

// ---------------------------------------------------------------------------
// Orbital ring component
// ---------------------------------------------------------------------------
function OrbitalRing({ size, duration, delay, opacity }: { size: number, duration: number, delay: number, opacity: number }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 rounded-full border border-white/[0.04] pointer-events-none"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={{ opacity, scale: 1, rotate: 360 }}
      transition={{
        opacity: { delay, duration: 1.5 },
        scale: { delay, duration: 1.5, ease: 'easeOut' },
        rotate: { duration, repeat: Infinity, ease: 'linear' },
      }}
    >
      {/* Glowing dot on the ring */}
      <motion.div
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-violet"
        style={{ boxShadow: '0 0 8px rgba(124, 58, 237, 0.6)' }}
      />
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Framer Motion variants
// ---------------------------------------------------------------------------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const letterVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)', scale: 1.1 },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

// ---------------------------------------------------------------------------
// Hero component
// ---------------------------------------------------------------------------
function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  // Cycle role titles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLE_TITLES.length)
    }, CYCLE_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  // Split name into words for responsive rendering
  const nameWords = useMemo(() => name.split(' '), [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep"
    >
      {/* ---- Grid pattern overlay ---- */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ---- Aurora blobs ---- */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {AURORA_BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            className={`absolute ${blob.className}`}
            style={blob.style}
            animate={blob.animate}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ---- Radial vignette ---- */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #030014 100%)',
        }}
      />

      {/* ---- Floating code snippets (side decorations) ---- */}
      <div className="absolute inset-0 z-[4] pointer-events-none hidden lg:block">
        {FLOATING_SNIPPETS.map((snippet, i) => (
          <motion.span
            key={i}
            className="absolute font-mono text-[11px] text-white/[0.07] select-none"
            style={{ left: snippet.x, top: snippet.y }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: snippet.delay, duration: 1, ease: 'easeOut' }}
          >
            <motion.span
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              {snippet.text}
            </motion.span>
          </motion.span>
        ))}
      </div>

      {/* ---- Orbital rings ---- */}
      <div className="absolute inset-0 z-[4] pointer-events-none hidden md:block">
        <OrbitalRing size={500} duration={60} delay={1} opacity={0.3} />
        <OrbitalRing size={700} duration={90} delay={1.5} opacity={0.2} />
        <OrbitalRing size={900} duration={120} delay={2} opacity={0.1} />
      </div>

      {/* ---- Main content ---- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-32 text-center flex flex-col items-center"
      >
        {/* Greeting tag */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-1.5 text-sm font-mono text-violet-light glass rounded-full tracking-wide">
            Hello, I&apos;m
          </span>
        </motion.div>

        {/* ---- Cinematic name reveal (word-by-word with letter animation) ---- */}
        <motion.h1
          className="font-heading font-bold mb-4 select-none"
          style={{ fontSize: 'clamp(1.8rem, 6vw, 6rem)' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
          initial="hidden"
          animate="visible"
          aria-label={name}
        >
          {nameWords.map((word, wi) => (
            <span key={wi} className="inline-block">
              {wi > 0 && <span className="inline-block">&nbsp;</span>}
              {word.split('').map((letter, li) => (
                <motion.span
                  key={`${wi}-${li}`}
                  variants={letterVariants}
                  className="inline-block gradient-text"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* ---- Role cycling ---- */}
        <motion.div variants={itemVariants} className="h-10 md:h-12 mb-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={roleIndex}
              className="text-xl md:text-2xl lg:text-3xl font-heading font-medium text-fg-muted"
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {ROLE_TITLES[roleIndex]}
            </motion.h2>
          </AnimatePresence>
        </motion.div>

        {/* ---- Summary ---- */}
        <motion.p
          variants={itemVariants}
          className="text-fg-muted text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed text-balance"
        >
          {summary}
        </motion.p>

        {/* ---- Social links ---- */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          {socialMedia.map((social, index) => {
            const Icon = ICON_MAP[social.iconName] ?? ExternalLink
            return (
              <motion.a
                key={social.name}
                href={social.link}
                target={social.iconName === 'email' ? undefined : '_blank'}
                rel={social.iconName === 'email' ? undefined : 'noopener noreferrer'}
                aria-label={social.name}
                className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 glass rounded-full
                           text-fg-muted hover:text-fg transition-colors duration-300"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.08, duration: 0.5 }}
              >
                {/* Hover glow ring */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow-violet" />
                <Icon className="w-5 h-5 relative z-10" />
                {/* Tooltip */}
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-mono
                                 bg-elevated text-fg rounded opacity-0 group-hover:opacity-100
                                 transition-opacity duration-200 whitespace-nowrap pointer-events-none
                                 border border-white/[0.06]">
                  {social.name}
                </span>
              </motion.a>
            )
          })}
        </motion.div>

        {/* ---- CTA Buttons ---- */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto mb-4">
          <motion.a
            href="#projects"
            className="group relative w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-white text-sm text-center
                       bg-gradient-to-r from-violet to-cyan overflow-hidden
                       shadow-lg shadow-violet/20 hover:shadow-violet/40
                       transition-shadow duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Shimmer overlay */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                         bg-gradient-to-r from-transparent via-white/20 to-transparent
                         animate-shimmer bg-[length:200%_100%]"
            />
            <span className="relative z-10">View My Work</span>
          </motion.a>

          <motion.a
            href="#contact"
            className="group w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-fg text-sm text-center glass
                       hover:bg-white/[0.06] transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ---- Scroll indicator ---- */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs font-mono text-fg-dim tracking-widest uppercase">Scroll</span>
        <motion.a
          href="#about"
          aria-label="Scroll to next section"
          className="text-fg-muted hover:text-violet-light transition-colors duration-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Hero
