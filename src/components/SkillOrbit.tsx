import { motion } from 'motion/react';
import { Code2, Globe, Layout, Palette, Terminal, Zap, Database, Github, Rocket } from 'lucide-react';

export default function SkillOrbit() {
  const skills = [
    { icon: Code2, label: 'React' },
    { icon: Database, label: 'Firebase' },
    { icon: Terminal, label: 'TypeScript' },
    { icon: Github, label: 'GitHub' },
    { icon: Layout, label: 'Tailwind' },
    { icon: Zap, label: 'Next.js' },
    { icon: Rocket, label: 'Three.js' },
    { icon: Palette, label: 'Framer' },
  ];

  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Orbit Rings */}
      <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-white/5 rounded-full" />
      <div className="absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] border border-white/5 rounded-full" />
      
      {/* Skill Icons */}
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2;
        const radius = 150; // Base radius for mobile
        const mdRadius = 220; // Radius for desktop
        
        return (
          <motion.div
            key={skill.label}
            className="absolute p-3 md:p-4 glass rounded-xl border border-white/10 flex items-center justify-center group hover:border-primary/50 transition-colors"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: [
                Math.cos(angle) * radius,
                Math.cos(angle + Math.PI * 2) * radius
              ],
              y: [
                Math.sin(angle) * radius,
                Math.sin(angle + Math.PI * 2) * radius
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
            style={{
              // Use CSS variables for responsive radius if needed, or just handle via Framer
              left: '50%',
              top: '50%',
              marginLeft: '-24px',
              marginTop: '-24px',
            }}
          >
            <skill.icon size={24} className="text-white/70 group-hover:text-primary transition-colors" />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase tracking-widest text-primary font-bold whitespace-nowrap">
              {skill.label}
            </div>
          </motion.div>
        );
      })}
      
      {/* Center Glow */}
      <div className="w-24 h-24 bg-primary/20 rounded-full blur-3xl animate-pulse" />
    </div>
  );
}
