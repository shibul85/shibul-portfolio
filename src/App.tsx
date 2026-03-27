import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Scene from './components/Scene';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loading from './components/Loading';
import ModelSwitcher from './components/ModelSwitcher';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [modelType, setModelType] = useState<'globe' | 'brain' | 'rocket' | 'glove' | 'sphere'>('globe');
  const [isManualOverride, setIsManualOverride] = useState(false);

  useEffect(() => {
    if (isManualOverride) {
      const timer = setTimeout(() => setIsManualOverride(false), 2000);
      return () => clearTimeout(timer);
    }

    const handleScroll = () => {
      const sections = [
        { id: 'hero', type: 'globe' },
        { id: 'about', type: 'brain' },
        { id: 'skills', type: 'rocket' },
        { id: 'projects', type: 'glove' },
        { id: 'contact', type: 'sphere' },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (modelType !== section.type) {
              setModelType(section.type as any);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [modelType, isManualOverride]);

  const handleModelChange = (type: 'globe' | 'brain' | 'rocket' | 'glove' | 'sphere') => {
    setModelType(type);
    setIsManualOverride(true);
  };

  useEffect(() => {
    console.log('App: modelType changed to', modelType);
    // Update theme colors based on model
    const root = document.documentElement;
    if (modelType === 'globe') {
      root.style.setProperty('--color-primary', '#7F5AF0');
      root.style.setProperty('--color-accent', '#00E5FF');
    } else if (modelType === 'brain') {
      root.style.setProperty('--color-primary', '#00E5FF');
      root.style.setProperty('--color-accent', '#7F5AF0');
    } else if (modelType === 'rocket') {
      root.style.setProperty('--color-primary', '#2CB67D');
      root.style.setProperty('--color-accent', '#00E5FF');
    } else if (modelType === 'glove') {
      root.style.setProperty('--color-primary', '#FF8906');
      root.style.setProperty('--color-accent', '#F25F4C');
    } else if (modelType === 'sphere') {
      root.style.setProperty('--color-primary', '#7F5AF0');
      root.style.setProperty('--color-accent', '#F25F4C');
    }
  }, [modelType]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen">
      <AnimatePresence>
        {isLoading && <Loading key="loading" />}
      </AnimatePresence>
      
      <CustomCursor />
      <Scene modelType={modelType} />
      <Navbar />
      
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>

      {!isLoading && (
        <ModelSwitcher 
          currentModel={modelType} 
          onModelChange={handleModelChange} 
        />
      )}
    </main>
  );
}
