import { useState, useEffect } from 'react';
import { motion, Variants } from 'motion/react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const titleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.5,
    },
  },
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as any },
  },
};

export default function Hero() {
  const name = "Shibul Kumar Padhan";
  const subtitle = "Creative Developer & Visionary";
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only run on non-touch devices or check for hover capability
      if (window.matchMedia('(hover: hover)').matches) {
        setMousePos({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden">
      <motion.div 
        style={{ 
          x: mousePos.x, 
          y: mousePos.y,
        }}
        className="max-w-7xl mx-auto w-full text-center space-y-8 md:space-y-12 z-10"
      >
        <div className="space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 md:px-6 py-2 glass rounded-full border border-primary/20 text-primary text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-[0_0_20px_rgba(127,90,240,0.2)]"
          >
            <Sparkles size={12} className="animate-pulse" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {subtitle}
            </motion.span>
          </motion.div>

          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] font-bold tracking-tighter leading-[0.9] select-none"
          >
            {name.split(" ").map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap mr-4 last:mr-0">
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={charVariants}
                    className={cn(
                      "inline-block hover:text-primary transition-colors duration-300",
                      word === "Padhan" 
                        ? "text-gradient drop-shadow-[0_0_30px_rgba(127,90,240,0.5)]" 
                        : "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    )}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-lg md:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed tracking-widest"
          >
            Crafting high-end digital experiences where <span className="text-white/80 font-medium">innovation</span> meets <span className="text-white/80 font-medium">luxury</span>.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-wrap justify-center gap-6 items-center"
        >
          <a
            href="#projects"
            className="group relative px-12 py-5 bg-primary text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(127,90,240,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-sm">
              Explore Works <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a
            href="#contact"
            className="px-12 py-5 glass text-white rounded-full font-bold border border-white/10 hover:bg-white/5 transition-all uppercase tracking-widest text-sm hover:scale-105 active:scale-95"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={32} className="text-white/20 hover:text-primary transition-colors" />
      </motion.div>
    </section>
  );
}
