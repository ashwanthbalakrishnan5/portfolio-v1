import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Server, Code2, Cloud, GitBranch } from 'lucide-react'
import { summary } from '../data'

// ── Animated counter hook ──────────────────────────────────────────
function useAnimatedCounter(
  target: number,
  duration: number = 2000,
  isInView: boolean,
) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, target, duration])

  return count
}

// ── Stats data ─────────────────────────────────────────────────────
const stats = [
  { value: 10, suffix: 'K+', label: 'Active Users' },
  { value: 1, suffix: 'M+', label: 'Records Handled' },
  { value: 500, prefix: '<', suffix: 'ms', label: 'Response Time' },
  { value: 65, suffix: '+', label: 'GitHub Stars' },
]

// ── Capability cards ───────────────────────────────────────────────
const capabilities = [
  {
    icon: Server,
    title: 'Backend Engineering',
    description:
      'Designing scalable APIs and microservices with Django, FastAPI, and Node.js backed by robust databases.',
  },
  {
    icon: Code2,
    title: 'Frontend Development',
    description:
      'Crafting responsive, high-performance interfaces with React, TypeScript, and modern design systems.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    description:
      'Architecting fault-tolerant deployments on AWS with Docker, Kubernetes, and infrastructure-as-code.',
  },
  {
    icon: GitBranch,
    title: 'DevOps & Automation',
    description:
      'Building CI/CD pipelines with GitHub Actions, Jenkins, and Terraform for reliable delivery workflows.',
  },
]

// ── Framer variants ────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

// ── Stat card ──────────────────────────────────────────────────────
function StatCard({
  value,
  suffix,
  prefix,
  label,
  index,
}: {
  value: number
  suffix: string
  prefix?: string
  label: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const animatedValue = useAnimatedCounter(value, 2000, isInView)

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="glass rounded-2xl p-6 text-center group hover:border-violet/20 animate-border-glow cursor-default"
      style={{ animationDelay: `${index * 400}ms` }}
    >
      <p className="text-3xl md:text-4xl font-heading font-bold gradient-text tracking-tight">
        {prefix}
        {animatedValue}
        {suffix}
      </p>
      <p className="text-sm text-fg-muted mt-2 font-mono uppercase tracking-wider">{label}</p>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background visual depth */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-violet/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-cyan/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* ── Section label ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-violet" />
          <span className="font-mono text-xs uppercase tracking-widest text-violet">
            About Me
          </span>
        </motion.div>

        {/* ── Heading ───────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold mb-6"
        >
          <span className="gradient-text">
            Building the future,
            <br />
            one line at a time.
          </span>
        </motion.h2>

        {/* ── Summary ───────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-fg-muted max-w-3xl leading-relaxed mb-16"
        >
          {summary}
        </motion.p>

        {/* ── Stats grid ────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-14 sm:mb-20"
        >
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
              index={i}
            />
          ))}
        </motion.div>

        {/* ── What I Do ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-10">
            What I <span className="gradient-text">Do</span>
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {capabilities.map((cap) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 group hover:border-violet/20 transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-violet/10 flex items-center justify-center mb-4 group-hover:bg-violet/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-violet-light" />
                </div>
                <h4 className="font-heading font-semibold text-fg mb-2">
                  {cap.title}
                </h4>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
