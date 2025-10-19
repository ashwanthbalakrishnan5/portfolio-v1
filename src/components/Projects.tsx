import { motion } from 'framer-motion'
import { projects } from '../data'

function Projects() {
  const getTechColor = (tech: string) => {
    const techColors: Record<string, string> = {
      // Languages
      'Python': 'bg-blue-500/10 text-blue-400',
      'JavaScript': 'bg-yellow-500/10 text-yellow-400',
      'TypeScript': 'bg-blue-600/10 text-blue-400',
      'Java': 'bg-orange-500/10 text-orange-400',
      'Kotlin': 'bg-purple-500/10 text-purple-400',
      'Go': 'bg-cyan-500/10 text-cyan-400',
      // Frontend
      'React': 'bg-cyan-500/10 text-cyan-400',
      'React.js': 'bg-cyan-500/10 text-cyan-400',
      'React Native': 'bg-cyan-600/10 text-cyan-400',
      // Backend
      'Django': 'bg-green-600/10 text-green-400',
      'FastAPI': 'bg-teal-500/10 text-teal-400',
      'Node.js': 'bg-green-500/10 text-green-400',
      // Cloud & Infrastructure
      'AWS': 'bg-orange-400/10 text-orange-400',
      'Docker': 'bg-blue-400/10 text-blue-400',
      'Kubernetes': 'bg-blue-600/10 text-blue-400',
      'Redis': 'bg-red-500/10 text-red-400',
      // DevOps
      'CI/CD': 'bg-indigo-500/10 text-indigo-400',
      'GitHub Actions': 'bg-gray-500/10 text-gray-400',
      'Jenkins': 'bg-red-600/10 text-red-400',
      'Terraform': 'bg-purple-600/10 text-purple-400',
      // Categories
      'AI': 'bg-pink-500/10 text-pink-400',
      'Blockchain': 'bg-yellow-600/10 text-yellow-400',
      'Microservices': 'bg-purple-500/10 text-purple-400',
      'Mobile': 'bg-green-500/10 text-green-400',
      'PostgreSQL': 'bg-blue-700/10 text-blue-400',
    }
    return techColors[tech] || 'bg-primary-500/10 text-primary-400'
  }
  return (
    <section id="projects" className="section-padding bg-dark-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary-500 mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-effect rounded-lg overflow-hidden group hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary-500/10 rounded-lg">
                      <svg
                        className="w-8 h-8 text-primary-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex gap-2">
                      {project.stars && (
                        <span className="flex items-center text-sm text-gray-400 group/star">
                          <motion.svg
                            className="w-4 h-4 text-yellow-400 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            whileHover={{ scale: 1.2, rotate: 72 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                          <span className="group-hover/star:text-yellow-400 transition-colors">{project.stars}</span>
                        </span>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-400 transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && (
                    <ul className="space-y-2 mb-4">
                      {project.highlights.slice(0, 2).map((highlight, idx) => (
                        <li key={idx} className="text-sm text-gray-400 flex items-start">
                          <span className="text-primary-400 mr-2">•</span>
                          <span className="line-clamp-2">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${getTechColor(tech)}`}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 text-xs bg-gray-500/10 text-gray-400 rounded-full">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
