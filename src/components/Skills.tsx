import { motion } from 'framer-motion'
import { Code2, BookOpen, Layers, Cloud, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { skills } from '../data'

const categoryIcons: Record<string, LucideIcon> = {
  'Programming Languages': Code2,
  'Core CS': BookOpen,
  'Frameworks & Libraries': Layers,
  'Cloud & Infrastructure': Cloud,
  'DevOps & Tools': Wrench,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const pillContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
}

const pillVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

function Skills() {
  const categories = Object.entries(skills)

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet/[0.04] blur-[120px] pointer-events-none" />

      <div className="container-custom relative">
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
              Skills
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold gradient-text">
            Tech Stack
          </h2>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-10"
        >
          {categories.map(([category, skillList], categoryIndex) => {
            const IconComponent = categoryIcons[category] || Code2

            return (
              <motion.div key={category} variants={categoryVariants}>
                {/* Category divider (skip first) */}
                {categoryIndex > 0 && (
                  <div className="mb-10 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                )}

                {/* Category heading */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-violet/10">
                    <IconComponent className="w-4 h-4 text-violet-light" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-fg">
                    {category}
                  </h3>
                </div>

                {/* Skill pills */}
                <motion.div
                  variants={pillContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="flex flex-wrap gap-3"
                >
                  {(skillList as string[]).map((skill) => (
                    <motion.span
                      key={skill}
                      variants={pillVariants}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      className="px-4 py-2 text-sm font-mono rounded-full glass border-white/[0.06] text-fg-muted cursor-default hover:border-violet/30 hover:text-fg hover:shadow-[0_0_20px_rgba(124,58,237,0.08)] transition-all duration-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
