import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Award, ChevronRight } from 'lucide-react'
import { education, activities } from '../data'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

function Education() {
  return (
    <section id="education" className="section-padding relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-violet animate-pulse-subtle" />
          <span className="font-mono text-xs uppercase tracking-widest text-violet">
            Education
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold gradient-text mb-10 sm:mb-16"
        >
          Academic Background
        </motion.h2>

        {/* Education cards grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -2, borderColor: 'rgba(255, 255, 255, 0.1)' }}
              className="glass rounded-2xl p-6 group cursor-default"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="p-3 rounded-xl bg-violet/10 border border-violet/20">
                  <GraduationCap className="w-6 h-6 text-violet" />
                </div>
                {edu.current && (
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-1.5 bg-violet/20 text-violet text-xs font-medium rounded-full px-3 py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse-subtle" />
                    Current
                  </motion.span>
                )}
              </div>

              <h3 className="font-heading font-semibold text-lg text-fg mb-2 group-hover:text-fg transition-colors">
                {edu.degree}
              </h3>

              <p className="text-violet-light font-medium mb-4">
                {edu.institution}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-fg-dim">
                <span className="inline-flex items-center gap-1.5 font-mono text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {edu.location}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-sm">
                  <Calendar className="w-3.5 h-3.5" />
                  {edu.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activities subsection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse-subtle" />
          <span className="font-mono text-xs uppercase tracking-widest text-cyan">
            Involvement
          </span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-2xl font-semibold text-fg mb-8"
        >
          Leadership & Activities
        </motion.h3>

        <div className="space-y-6">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -2, borderColor: 'rgba(255, 255, 255, 0.1)' }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-cyan/10 border border-cyan/20 shrink-0">
                    <Award className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg text-fg mb-1">
                      {activity.role}
                    </h4>
                    <p className="text-violet-light font-medium text-sm">
                      {activity.organization}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-fg-dim shrink-0">
                  <span className="inline-flex items-center gap-1.5 font-mono text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    {activity.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    {activity.duration}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 ml-1">
                {activity.achievements.map((achievement, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <ChevronRight className="w-4 h-4 text-violet shrink-0 mt-0.5" />
                    <span className="text-fg-muted text-sm leading-relaxed">
                      {achievement}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
