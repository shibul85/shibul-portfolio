import { motion } from 'motion/react';
import { Globe, Brain, Rocket, Hand, Circle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ModelSwitcherProps {
  currentModel: 'globe' | 'brain' | 'rocket' | 'glove' | 'sphere';
  onModelChange: (model: 'globe' | 'brain' | 'rocket' | 'glove' | 'sphere') => void;
}

export default function ModelSwitcher({ currentModel, onModelChange }: ModelSwitcherProps) {
  const models = [
    { id: 'globe', icon: Globe, label: 'Globe' },
    { id: 'brain', icon: Brain, label: 'Brain' },
    { id: 'rocket', icon: Rocket, label: 'Rocket' },
    { id: 'glove', icon: Hand, label: 'Glove' },
    { id: 'sphere', icon: Circle, label: 'Sphere' },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 4, duration: 1 }}
      className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3"
    >
      <div className="glass p-2 rounded-2xl border border-white/20 flex flex-col gap-2 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => {
              console.log('ModelSwitcher: Requesting switch to', model.id);
              // alert('Switching to ' + model.id); // Temporary alert for debugging
              onModelChange(model.id);
            }}
            className={cn(
              "p-4 rounded-xl transition-all duration-500 group relative flex items-center justify-center",
              currentModel === model.id 
                ? "bg-primary text-white shadow-[0_0_20px_rgba(127,90,240,0.5)] scale-110" 
                : "text-white/30 hover:text-white hover:bg-white/5"
            )}
          >
            <model.icon size={22} className={cn(currentModel === model.id ? "animate-pulse" : "")} />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 px-4 py-2 glass rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.4em] text-primary shadow-2xl">
              {model.label}
            </div>
          </button>
        ))}
      </div>
      
      <div className="text-center">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">
          Perspective
        </span>
      </div>
    </motion.div>
  );
}
