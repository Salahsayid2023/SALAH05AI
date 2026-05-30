"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EntryGate({ onEnter }: { onEnter: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0B0B] text-white overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2">
            SALAH<span className="text-accent">05</span>AI
          </h1>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full animate-grow" />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-muted text-lg md:text-xl max-w-md mb-12 font-light tracking-wide"
        >
          Where human vision meets <span className="text-white font-medium">AI execution.</span>
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className={cn(
            "group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all",
            "hover:shadow-[0_0_30px_rgba(58,134,255,0.5)]"
          )}
        >
          <span className="relative z-10 flex items-center gap-2 text-lg">
            Enter the Empire <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity" />
        </motion.button>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 text-[10px] text-muted font-mono tracking-widest uppercase hidden md:block">
        System: Online <br /> Status: Ready <br /> Version: 2.0.0
      </div>
      <div className="absolute bottom-8 right-8 text-[10px] text-muted font-mono tracking-widest uppercase hidden md:block">
        Coords: 30.0444° N, 31.2357° E <br /> Domain: Salah05ai.Empire
      </div>
    </motion.div>
  );
}
