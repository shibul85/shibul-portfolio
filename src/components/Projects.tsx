import { motion } from 'motion/react';
import { ExternalLink, Github, HeartPulse, Code, Rocket, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Projects() {
  const projects = [
    {
      title: 'MyMedikare',
      description: 'A comprehensive medicine availability platform designed to help users find essential healthcare supplies in real-time.',
      icon: HeartPulse,
      tags: ['React', 'Tailwind', 'Node.js'],
      color: 'from-emerald-500/20 to-emerald-500/5',
      accent: 'text-emerald-400',
      highlight: true
    },
    {
      title: 'Where is my train',
      description: 'A real-time train tracking application providing live status, schedules, and platform information for commuters.',
      icon: Rocket,
      tags: ['React Native', 'Firebase', 'API Integration'],
      color: 'from-blue-500/20 to-blue-500/5',
      accent: 'text-blue-400'
    },
    {
      title: 'Portfolio 3.0',
      description: 'A futuristic 3D portfolio website built with Three.js and Framer Motion for an immersive user experience.',
      icon: Code,
      tags: ['Three.js', 'React', 'Framer Motion'],
      color: 'from-primary/20 to-primary/5',
      accent: 'text-primary'
    }
  ];

  return (
    <section id="projects" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Sparkles size={12} />
            My Creations
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-none">
            Selected <span className="text-gradient">Works</span>
          </h2>
          <p className="text-white/40 max-w-xl text-lg">
            A curated collection of projects where I push the boundaries of digital craftsmanship.
          </p>
        </div>
        <a href="#" className="group text-primary hover:text-accent transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
          View All Projects <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ y: -10 }}
            className={cn(
              "group relative p-6 md:p-8 glass rounded-[2rem] border border-white/5 overflow-hidden flex flex-col h-full",
              project.highlight ? "lg:col-span-2" : ""
            )}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            
            <div className="relative z-10 flex flex-col h-full gap-8">
              <div className="flex items-start justify-between">
                <div className={`p-5 bg-white/5 rounded-2xl ${project.accent} group-hover:scale-110 transition-transform duration-500`}>
                  <project.icon size={32} />
                </div>
                <div className="flex gap-3">
                  <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5">
                    <Github size={18} />
                  </a>
                  <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <h3 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/5 text-white/40">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
