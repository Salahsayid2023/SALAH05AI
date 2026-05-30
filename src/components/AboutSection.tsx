"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-surface group">
            <img 
              src="/salah-portrait.jpg.jpeg" 
              alt="Salah Sayed Salah"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-surface border border-white/10 backdrop-blur-xl shadow-2xl max-w-[200px]">
            <p className="text-accent font-bold text-xl">19 Years</p>
            <p className="text-muted text-xs uppercase tracking-widest">Of Pure Ambition</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            The <span className="text-accent">Visionary</span> Behind the Code.
          </h2>
          
          <div className="space-y-4 text-muted text-lg font-light leading-relaxed">
            <p>
              أنا <span className="text-white font-medium">صلاح سيد صلاح</span>. رحلتي مابدأتش من الكتب، بدأت بفضول حقيقي تجاه كل حاجة بتشتغل حواليا. من تفكيك الإلكترونيات واستكشاف الميكانيكا وأنا عندي 14 سنة، لحد ما وصلت لإتقان هندسة البرمجيات والذكاء الاصطناعي.
            </p>
            <p>
              أنا مش مجرد مبرمج بيكتب كود؛ أنا بصمم حلول. طريقتي هي مزيج بين الدقة التقنية الصارمة والشغف الإبداعي اللي ملوش حدود. سواء كنت ببني منصات SaaS معقدة، أو بهندس عملاء ذكاء اصطناعي، أو بصمم ألعاب تفاعلية، هدفي دايماً حاجة واحدة: <span className="text-white font-medium">تقديم قيمة حقيقية وملموسة.</span>
            </p>
            <p>
              حالياً بوازن بين دراستي للتاريخ والحضارة وبين بناء المستقبل. مؤمن إن فهمنا للي فات هو المفتاح الوحيد عشان نصمم المستقبل اللي جاي صح.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-white font-bold">Self-Taught</p>
              <p className="text-muted text-xs">شغف بالتعلم المستمر وتطوير الذات.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-white font-bold">Polymath</p>
              <p className="text-muted text-xs">من دريفت الـ BMW لحد الشبكات العصبية.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
