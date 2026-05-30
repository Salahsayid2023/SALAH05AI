"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layout, Smartphone, Gamepad2, Zap, Wrench, Network, LucideIcon } from 'lucide-react';
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

export default function CapabilityCard({ capability, index }: { capability: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative p-8 rounded-3xl border border-white/10 bg-surface/50 backdrop-blur-xl overflow-hidden transition-all duration-300",
        "hover:border-accent/50 hover:bg-surface/80",
        capability.size === 'large' ? 'md:col-span-2 md:row-span-1' : 'col-span-1'
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300",
          "bg-white/5 border border-white/10",
          capability.color
        )}>
          {React.createElement(IconMap[capability.icon], { className: "w-6 h-6" })}
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent opacity-70">
            {capability.category}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-accent transition-colors duration-300">
          {capability.title}
        </h3>
        <p className="text-muted leading-relaxed group-hover:text-white transition-colors duration-300">
          {capability.description}
        </p>
      </div>
    </motion.div>
  );
}
