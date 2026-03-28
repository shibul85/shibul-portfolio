import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Instagram, Facebook, Twitter, User, Code2, Rocket, MessageSquare, Atom, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About me', icon: User, href: '#about' },
    { name: 'Skills', icon: Code2, href: '#skills' },
    { name: 'Projects', icon: Rocket, href: '#projects' },
    { name: 'Contact', icon: MessageSquare, href: '#contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/i.shibulkumarpadhan?igsh=MW5zYzk3bjgwNjJ5Nw==' },
    { icon: Facebook, href: 'https://facebook.com' },
    { icon: Twitter, href: 'https://twitter.com' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300",
          scrolled ? "bg-background/80 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg text-primary animate-pulse">
            <Atom size={24} />
          </div>
          <span className="text-lg font-bold tracking-tighter hidden sm:block">
            Shibul Kumar <span className="text-primary">Padhan</span>
          </span>
        </div>

        {/* Desktop Nav */}
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

        {/* Desktop Socials */}
        <div className="hidden md:flex items-center gap-4">
          {socialLinks.map((link, i) => (
            <a key={i} href={link.href} target="_blank" className="text-white/50 hover:text-white transition-colors">
              <link.icon size={18} />
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 glass rounded-lg text-white/70 hover:text-white transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[45] bg-background/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center p-8"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-xs">
              {navItems.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 text-2xl font-bold tracking-tighter hover:text-primary transition-colors w-full p-4 glass rounded-2xl border border-white/5"
                >
                  <item.icon size={28} className="text-primary" />
                  {item.name}
                </motion.a>
              ))}
              
              <div className="flex gap-6 mt-8">
                {socialLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    key={i}
                    href={link.href}
                    target="_blank"
                    className="p-4 glass rounded-full text-white/50 hover:text-primary transition-all"
                  >
                    <link.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
