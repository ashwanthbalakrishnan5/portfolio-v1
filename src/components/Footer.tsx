import { motion } from 'framer-motion'
import { name } from '../data'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative">
      {/* Gradient line separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent" />

      <div className="py-12 pb-24 px-6">
        <div className="container-custom flex flex-col items-center gap-4 text-center">
          {/* Animated logo text */}
          <motion.p
            className="font-heading text-lg font-semibold gradient-text"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {name}
          </motion.p>

          <p className="text-fg-dim text-sm">
            &copy; {currentYear}. Crafted with precision & passion.
          </p>

          <div className="flex items-center gap-2 text-fg-dim/40 text-xs font-mono">
            <span className="w-1 h-1 rounded-full bg-violet/30" />
            <span>React</span>
            <span className="w-1 h-1 rounded-full bg-cyan/30" />
            <span>TypeScript</span>
            <span className="w-1 h-1 rounded-full bg-violet/30" />
            <span>Tailwind CSS</span>
            <span className="w-1 h-1 rounded-full bg-cyan/30" />
            <span>Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
