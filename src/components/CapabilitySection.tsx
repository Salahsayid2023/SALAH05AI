"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Layout, Smartphone, Gamepad2, Zap, Wrench, Network, X, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CAPABILITIES } from '@/data/capabilities';

const IconMap: Record<string, LucideIcon> = {
  Cpu: Cpu,
  Layout: Layout,
  Smartphone: Smartphone,
  Gamepad2: Gamepad2,
  Zap: Zap,
  Wrench: Wrench,
  Network: Network,
};

export default function CapabilitySection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCap = CAPABILITIES.find(c => c.id === selectedId);

  return (
    <section id="capabilities" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">The <span className="text-accent">Capabilities</span></h2>
        <div className="h-1 w-12 bg-accent rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CAPABILITIES.map((cap, index) => (
          <motion.div
            key={cap.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedId(cap.id)}
            className={cn(
              "group relative p-8 rounded-3xl border border-white/10 bg-surface/50 backdrop-blur-xl overflow-hidden cursor-pointer transition-all duration-300",
              "hover:border-accent/50 hover:bg-surface/80",
              cap.size === 'large' ? 'md:col-span-2 md:row-span-1' : 'col-span-1'
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300",
                "bg-white/5 border border-white/10",
                cap.color
              )}>
                {React.createElement(IconMap[cap.icon], { className: "w-6 h-6" })}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent opacity-70">
                  {cap.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-accent transition-colors duration-300">
                {cap.title}
              </h3>
              <p className="text-muted leading-relaxed group-hover:text-white transition-colors duration-300">
                {cap.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedCap && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-3xl bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10", selectedCap.color)}>
                    {React.createElement(IconMap[selectedCap.icon], { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedCap.title}</h3>
                    <p className="text-accent text-xs font-bold uppercase tracking-widest">{selectedCap.category}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedId(null)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                <div className="prose prose-invert max-w-none">
                  {selectedCap.fullDescription.split('\n').map((line, i) => (
                    <p key={i} className={cn(
                      "mb-4 leading-relaxed",
                      line.startsWith('**') ? "text-white font-bold text-lg" : "text-muted"
                    )}>
                      {line.replace(/\*\*/g, '')}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
