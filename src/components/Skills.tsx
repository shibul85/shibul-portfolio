import { motion } from 'motion/react';
import { Code2, Globe, Layout, Palette, Terminal, Zap, Database, Rocket, Cpu } from 'lucide-react';
import { cn } from '../lib/utils';
import SkillOrbit from './SkillOrbit';

export default function Skills() {
  const categories = [
    {
      title: 'Frontend',
      icon: Layout,
      skills: ['React', 'Next.js', 'Tailwind', 'Three.js'],
      color: 'text-primary'
    },
    {
      title: 'Backend',
      icon: Database,
      skills: ['Node.js', 'Firebase', 'PostgreSQL', 'MongoDB'],
      color: 'text-accent'
    },
    {
      title: 'Tools',
      icon: Cpu,
      skills: ['Git', 'Docker', 'AWS', 'Figma'],
      color: 'text-secondary'
    }
  ];

  return (
    <section id="skills" className="py-24 px-4 bg-white/[0.01] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(127,90,240,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg">
            Harnessing the power of modern technologies to build scalable and immersive digital solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 glass rounded-3xl border border-white/5 space-y-6 group hover:border-primary/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 bg-white/5 rounded-xl", cat.color)}>
                    <cat.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map(skill => (
                    <span key={skill} className="px-4 py-2 bg-white/5 rounded-xl text-sm font-medium border border-white/5 group-hover:border-primary/10 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="order-1 lg:order-2">
            <SkillOrbit />
          </div>
        </div>
      </div>
    </section>
  );
}
