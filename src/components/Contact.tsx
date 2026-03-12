import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react'
import { email, socialMedia } from '../data'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  email: Mail,
}

function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none">
        <div className="absolute inset-0 bg-violet/[0.07] rounded-full blur-[150px]" />
        <div className="absolute inset-20 bg-cyan/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center">
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
              Contact
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold gradient-text mb-6 leading-tight"
          >
            Let's Build Something
            <br />
            Amazing Together
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-fg-muted text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            I'm currently seeking Summer 2026 internship opportunities. Whether you have an
            exciting project, a question, or just want to connect -- I'd love to hear from you.
          </motion.p>

          {/* Email CTA button */}
          <motion.a
            href={`mailto:${email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-violet to-cyan rounded-full px-8 py-4 font-semibold text-white text-lg shadow-lg shadow-violet/20 hover:shadow-violet/40 transition-shadow duration-300 mb-12"
          >
            {/* Glow effect on hover */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet to-cyan opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
            <Mail className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Get In Touch</span>
            <ArrowUpRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>

          {/* Social links row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4"
          >
            {socialMedia.map((social, index) => {
              const IconComponent = iconMap[social.iconName] || Mail
              return (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target={social.iconName === 'email' ? undefined : '_blank'}
                  rel={social.iconName === 'email' ? undefined : 'noopener noreferrer'}
                  aria-label={social.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-12 h-12 glass rounded-full flex items-center justify-center hover:border-white/[0.12] transition-all duration-300"
                >
                  {/* Glow behind icon on hover */}
                  <span className="absolute inset-0 rounded-full bg-violet/0 group-hover:bg-violet/10 transition-colors duration-300" />
                  <IconComponent className="w-5 h-5 text-fg-muted group-hover:text-fg relative z-10 transition-colors duration-300" />
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
