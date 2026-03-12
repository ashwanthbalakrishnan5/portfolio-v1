import { motion } from 'framer-motion'

const ROW_1 = [
  'React', 'TypeScript', 'Python', 'Django', 'AWS', 'Docker',
  'Kubernetes', 'Node.js', 'PostgreSQL', 'Redis', 'GraphQL',
  'FastAPI', 'Jenkins', 'Terraform', 'GitHub Actions', 'Go',
]

const ROW_2 = [
  'React Native', 'Microservices', 'CI/CD', 'Linux', 'Jest',
  'REST APIs', 'S3', 'EC2', 'ECS', 'EKS', 'Agile',
  'Git', 'Docker Compose', 'Pytest', 'MySQL', 'Kotlin',
]

function MarqueeRow({ items, reverse = false, speed = 30 }: { items: string[]; reverse?: boolean; speed?: number }) {
  const doubled = [...items, ...items]

  return (
    <motion.div
      className="flex gap-4 whitespace-nowrap"
      animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
      transition={{
        x: {
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        },
      }}
    >
      {doubled.map((tech, i) => (
        <span
          key={`${tech}-${i}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/[0.04] text-sm font-mono text-fg-dim shrink-0 hover:text-fg-muted hover:border-violet/20 transition-all duration-300"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${reverse ? 'bg-cyan/40' : 'bg-violet/40'}`} />
          {tech}
        </span>
      ))}
    </motion.div>
  )
}

function TechMarquee() {
  return (
    <div className="relative py-10 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-r from-deep to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-l from-deep to-transparent pointer-events-none" />

      <div className="space-y-4">
        <MarqueeRow items={ROW_1} speed={35} />
        <MarqueeRow items={ROW_2} reverse speed={40} />
      </div>
    </div>
  )
}

export default TechMarquee
