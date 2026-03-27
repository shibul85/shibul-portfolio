import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 border-t border-white/5 bg-background/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-2xl font-bold tracking-tighter">
            Shibul <span className="text-primary">Kumar</span>
          </h3>
          <p className="text-white/40 text-sm max-w-xs">
            Designing and developing high-end digital experiences with a focus on creativity and performance.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/shibul85" target="_blank" className="p-3 glass rounded-full hover:text-primary transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/shibul-kuamar-padhan-116857274" target="_blank" className="p-3 glass rounded-full hover:text-primary transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="mailto:shibulkumarpadhan85@gmail.com" className="p-3 glass rounded-full hover:text-primary transition-colors">
            <Mail size={20} />
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="p-4 glass rounded-full hover:bg-primary/10 transition-all border border-white/10 group"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-white/20 text-xs tracking-widest uppercase">
        © 2026 Shibul Kumar Padhan • All Rights Reserved
      </div>
    </footer>
  );
}
