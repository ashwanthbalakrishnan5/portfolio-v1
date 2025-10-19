import { motion } from 'framer-motion'
import { summary } from '../data'

function About() {
  return (
    <section id="about" className="section-padding bg-dark-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary-500 mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {summary}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="glass-effect p-4 rounded-lg cursor-default"
                >
                  <p className="text-3xl font-bold gradient-text">1500+</p>
                  <p className="text-gray-400">Active Users</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="glass-effect p-4 rounded-lg cursor-default"
                >
                  <p className="text-3xl font-bold gradient-text">1M+</p>
                  <p className="text-gray-400">Records Handled</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="glass-effect p-4 rounded-lg cursor-default"
                >
                  <p className="text-3xl font-bold gradient-text">&lt;500ms</p>
                  <p className="text-gray-400">Performance</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="glass-effect p-4 rounded-lg cursor-default"
                >
                  <p className="text-3xl font-bold gradient-text">65+</p>
                  <p className="text-gray-400">GitHub Stars</p>
                </motion.div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 gradient-text">What I Do</h3>
                <ul className="space-y-4">
                  {[
                    'Full-stack web & mobile application development',
                    'Cloud infrastructure design & deployment (AWS)',
                    'DevOps automation & CI/CD pipeline setup',
                    'Microservices architecture & API development',
                    'Database optimization & system performance tuning',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start group"
                    >
                      <motion.svg
                        className="w-6 h-6 text-primary-400 mr-3 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </motion.svg>
                      <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
