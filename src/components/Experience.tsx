import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experience } from '../data'

// ── Framer variants ────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

// ── Timeline dot ───────────────────────────────────────────────────
function TimelineDot({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        delay: index * 0.15 + 0.2,
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className="absolute left-0 md:left-0 -translate-x-1/2 top-8 z-10"
    >
      {/* outer glow ring */}
      <span className="absolute inset-0 w-4 h-4 rounded-full bg-violet/30 animate-glow-pulse" />
      {/* inner dot */}
      <span className="relative block w-4 h-4 rounded-full bg-violet ring-4 ring-deep" />
    </motion.div>
  )
}

// ── Experience card ────────────────────────────────────────────────
function ExperienceCard({
  job,
  index,
}: {
  job: (typeof experience)[number]
  index: number
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="glass rounded-2xl p-6 md:p-8 hover:border-violet/20 hover:shadow-[0_0_30px_rgba(124,58,237,0.06)] transition-all duration-300 group"
    >
      <h3 className="font-heading font-semibold text-xl text-fg">
        {job.title}
      </h3>

      <p className="text-violet-light mt-1">{job.company}</p>

      <p className="font-mono text-sm text-fg-dim mt-1">
        {job.duration} &middot; {job.location}
      </p>

      <ul className="mt-5 space-y-3">
        {job.responsibilities.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-fg-muted">
            <span className="mt-[6px] block w-1.5 h-1.5 rounded-full bg-violet/60 shrink-0" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────
export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.5'],
  })

  // Map scroll progress to scaleY (0 → 1) for the glowing fill
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-violet/[0.03] rounded-full blur-[100px] pointer-events-none" />

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
            Experience
          </span>
        </motion.div>

        {/* ── Heading ───────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold mb-10 sm:mb-16"
        >
          <span className="gradient-text">Where I've Worked</span>
        </motion.h2>

        {/* ── Timeline ──────────────────────────────────────────── */}
        <div ref={timelineRef} className="relative pl-8 md:pl-12">
          {/* background track */}
          <div
            className="absolute left-0 top-0 h-full w-[2px]"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(124,58,237,0.25) 10%, rgba(124,58,237,0.25) 90%, transparent)',
            }}
          />

          {/* scroll-linked glowing fill */}
          <motion.div
            className="absolute left-0 top-0 w-[2px] origin-top"
            style={{
              scaleY,
              height: '100%',
              background:
                'linear-gradient(to bottom, #7C3AED, #06B6D4)',
              boxShadow:
                '0 0 8px rgba(124,58,237,0.5), 0 0 24px rgba(6,182,212,0.25)',
            }}
          />

          {/* entries */}
          <div className="space-y-12">
            {experience.map((job, index) => (
              <div key={index} className="relative">
                <TimelineDot index={index} />
                <ExperienceCard job={job} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
