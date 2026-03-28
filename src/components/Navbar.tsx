import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Facebook, Twitter, User, Code2, Rocket, MessageSquare, Atom } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const navItems = [
    { name: 'About me', icon: User, href: '#about' },
    { name: 'Skills', icon: Code2, href: '#skills' },
    { name: 'Projects', icon: Rocket, href: '#projects' },
    { name: 'Contact', icon: MessageSquare, href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between bg-background/50 backdrop-blur-md border-b border-white/5"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg text-primary animate-pulse">
          <Atom size={24} />
        </div>
        <span className="text-lg font-bold tracking-tighter hidden sm:block">
          Shibul Kumar <span className="text-primary">Padhan</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-1 p-1 glass rounded-full border border-white/10">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-all"
          >
            {item.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a href="https://www.instagram.com/i.shibulkumarpadhan?igsh=MW5zYzk3bjgwNjJ5Nw==" target="_blank" className="text-white/50 hover:text-white transition-colors">
          <Instagram size={18} />
        </a>
        <a href="https://facebook.com" target="_blank" className="text-white/50 hover:text-white transition-colors">
          <Facebook size={18} />
        </a>
        <a href="https://twitter.com" target="_blank" className="text-white/50 hover:text-white transition-colors">
          <Twitter size={18} />
        </a>
      </div>
    </motion.nav>
  );
}
