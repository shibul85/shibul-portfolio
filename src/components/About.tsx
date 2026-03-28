import { motion } from 'motion/react';
import { GraduationCap, MapPin, Building2, User, Linkedin, Github } from 'lucide-react';

export default function About() {
  const details = [
    { icon: GraduationCap, label: 'Education', value: 'B.Tech Final Year (CSE)' },
    { icon: Building2, label: 'College', value: 'Vikash Institute of Technology' },
    { icon: MapPin, label: 'Location', value: 'Sonpur, Odisha' },
    { icon: User, label: 'Role', value: 'Creative Developer' },
  ];

  return (
    <section id="about" className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">
              About <span className="text-primary">Me</span>
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full" />
          </div>
          <p className="text-lg text-white/70 leading-relaxed">
            I'm a passionate Computer Science student with a deep interest in building modern, 
            interactive, and user-centric web applications. My journey in tech is driven by 
            curiosity and a desire to solve real-world problems through innovative solutions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {details.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 glass rounded-2xl border border-white/5"
              >
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
          <div className="relative glass rounded-3xl p-6 md:p-8 border border-white/10 flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[400px]">
            <div className="text-center space-y-4 md:space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tighter">Shibul Kumar Padhan</h3>
                <p className="text-primary font-mono text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em]">Creative Developer</p>
              </div>
              
              <p className="text-white/50 max-w-sm mx-auto leading-relaxed text-sm md:text-base">
                Dedicated to building high-performance digital solutions with a focus on clean code and exceptional user experiences.
              </p>

              <div className="flex justify-center gap-4 pt-2 md:pt-4">
                <a href="https://www.linkedin.com/in/shibul-kuamar-padhan-116857274" target="_blank" className="p-4 glass rounded-full hover:text-primary transition-all hover:scale-110">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/shibul85" target="_blank" className="p-4 glass rounded-full hover:text-primary transition-all hover:scale-110">
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
