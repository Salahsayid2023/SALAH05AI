"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative rounded-3xl overflow-hidden border border-white/10 bg-surface/50 backdrop-blur-sm transition-all duration-300 hover:border-accent/50"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-muted text-sm line-clamp-2 mb-4 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags?.map((tag: string) => (
            <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <a 
            href={project.link} 
            target="_blank" 
            className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold flex items-center gap-2 hover:bg-accent hover:text-white transition-all"
          >
            View <ExternalLink className="w-3 h-3" />
          </a>
          <div className="text-[10px] text-muted flex items-center gap-1">
            <Layers className="w-3 h-3" /> {project.impact}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
