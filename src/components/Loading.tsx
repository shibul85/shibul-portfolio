import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6"
    >
      <div className="relative w-full max-w-md space-y-12">
        <div className="space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">
              Initializing Experience
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-glow">
              SHIBUL <span className="text-primary">KUMAR</span>
            </h1>
          </motion.div>
        </div>

        <div className="space-y-4">
          <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>
          <div className="flex justify-between items-center font-mono text-[10px] text-white/20 tracking-widest">
            <span>LOADING ASSETS</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-12 text-white/10 font-mono text-[8px] uppercase tracking-[0.8em]"
      >
        Luxury UI Framework v4.0.1
      </motion.div>
    </motion.div>
  );
}
