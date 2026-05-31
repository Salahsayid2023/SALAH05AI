"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EntryGate from '@/components/EntryGate';
import AboutSection from '@/components/AboutSection';
import CapabilitySection from '@/components/CapabilitySection';
import ProjectCard from '@/components/ProjectCard';
import DigitalStore from '@/components/DigitalStore';
import SolutionPortal from '@/components/SolutionPortal';
import { PROJECTS } from '@/data/projects';
import { ArrowRight, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { db } from '@/lib/db';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [lang, setLang] = useState('en');
  const [projects, setProjects] = useState(PROJECTS);

  useEffect(() => {
    setProjects(PROJECTS);
  }, []);

  const content = {
    en: {
      navAbout: 'About',
      navCap: 'Capabilities',
      navArsenal: 'Arsenal',
      navStore: 'Store',
      navContact: 'Start a Project',
      heroTitle: 'Turning Bold Visions into Digital Empires.',
      heroSub: 'I specialize in bridging the gap between ambitious ideas and scalable reality. From custom AI systems to high-performance software, I architect tools that define the future.',
      heroBtnExplore: 'Browse My Works',
      heroBtnContact: 'Build Your Project',
    },
    ar: {
      navAbout: 'عني',
      navCap: 'القدرات',
      navArsenal: 'الترسانة',
      navStore: 'المتجر',
      navContact: 'ابدأ مشروعك',
      heroTitle: 'تحويل الرؤى الجريئة إلى إمبراطوريات رقمية.',
      heroSub: 'أقوم بسد الفجوة بين الأفكار الطموحة والواقع القابل للتوسع. من أنظمة الذكاء الاصطناعي المخصصة إلى البرمجيات فائقة الأداء، أنا أصمم الأدوات التي تشكل المستقبل.',
      heroBtnExplore: 'استكشف أعمالي',
      heroBtnContact: 'ابدأ مشروعك الآن',
    }
  };

  const t = (content as any)[lang];

  return (
    <main className={cn("relative min-h-screen w-full overflow-x-hidden bg-[#0B0B0B] text-white transition-all duration-500", lang === 'ar' ? "font-cairo" : "font-sans")} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <AnimatePresence>
        {!hasEntered && (
          <EntryGate onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      {hasEntered && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full"
        >
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-[#0B0B0B]/50 border-b border-white/5">
            <div className="text-xl font-bold tracking-tighter">
              SALAH<span className="text-accent">05</span>AI
            </div>
            <div className="flex gap-6 items-center">
              <button 
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="flex items-center gap-2 text-xs font-medium text-muted hover:text-white transition-colors px-3 py-1 rounded-full border border-white/10 bg-white/5"
              >
                <Globe className="w-3 h-3" /> {lang === 'en' ? 'العربية' : 'English'}
              </button>
              <a href="#about" className="text-sm text-muted hover:text-white transition-colors hidden md:block">{t.navAbout}</a>
              <a href="#capabilities" className="text-sm text-muted hover:text-white transition-colors hidden md:block">{t.navCap}</a>
              <a href="#projects" className="text-sm text-muted hover:text-white transition-colors hidden md:block">{t.navArsenal}</a>
              <a href="#store" className="text-sm text-muted hover:text-white transition-colors hidden md:block">{t.navStore}</a>
              <a href="#contact" className="text-sm bg-white text-black px-4 py-2 rounded-full font-bold hover:shadow-[0_0_20px_rgba(58,134,255,0.4)] transition-all">
                {t.navContact}
              </a>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center min-h-screen justify-center">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 max-w-4xl"
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-[1.1]">
                {t.heroTitle}
              </h1>
              <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                {t.heroSub}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#projects" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(58,134,255,0.5)] transition-all flex items-center gap-2 group">
                  {t.heroBtnExplore} <ArrowRight className={cn("w-5 h-5 transition-transform group-hover:translate-x-1", lang === 'ar' ? "-scale-x-100" : "")} />
                </a>
                <a href="#contact" className="px-8 py-4 border border-white/10 rounded-full font-bold hover:bg-white/5 transition-all">
                  {t.heroBtnContact}
                </a>
              </div>
            </motion.div>
          </section>

          {/* About Section */}
          <AboutSection />

          {/* Capabilities Section */}
          <CapabilitySection />

          {/* Arsenal Section (Projects Gallery) */}
          <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{lang === 'en' ? 'The Arsenal' : 'الترسانة الرقمية'}</h2>
              <p className="text-muted max-w-2xl mx-auto mb-4">
                {lang === 'en' ? 'A showcase of precision, innovation, and commercial success.' : 'معرض للدقة، الابتكار، والنجاح التجاري.'}
              </p>
              <div className="h-1 w-12 bg-accent rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </section>

          {/* Digital Store Section */}
          <DigitalStore />

          {/* Solution Portal Section */}
          <SolutionPortal />

          {/* Footer */}
          <footer className="py-12 px-6 border-t border-white/5 flex flex-col items-center justify-between gap-8 bg-surface/30">
            <div className="text-center">
              <div className="text-2xl font-bold tracking-tighter mb-4">
                SALAH<span className="text-accent">05</span>AI
              </div>
              <p className="text-muted text-sm">© 2026 All rights reserved. Built for the future.</p>
            </div>
            <div className="flex gap-4">
              <a href="https://github.com/Salahsayid2023" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:text-accent hover:border-accent transition-all duration-300 group bg-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M15 22v-4a4.8 4.8 0 0 0-.8-1.76z"/><path d="M6.4 17a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h12C18.1 4 18 5.1 18 6v7.5a2 2 0 0 1-2 2"/></svg>
              </a>
              <a href="https://www.facebook.com/SALAH05AI?locale=ar_AR" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:text-accent hover:border-accent transition-all duration-300 group bg-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3v-4h-3V7a5 5 0 0 1 5-5z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/salah-sayid-2692283a0/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:text-accent hover:border-accent transition-all duration-300 group bg-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M16 8a6 6 0 0 1 6 6v2h-4v-4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v4"/><rect width="4" height="12" x="2" y="9" rx="2"/><circle cx="7.5" cy="6.5" r="4.5"/></svg>
              </a>
              <a href="https://wa.me/201229102164" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:text-accent hover:border-accent transition-all duration-300 group bg-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
              </a>
            </div>
          </footer>
        </motion.div>
      )}
    </main>
  );
}
