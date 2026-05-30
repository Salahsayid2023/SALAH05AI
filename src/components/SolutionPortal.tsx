"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Send, Zap, Layout, Gamepad2, Cpu, User, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const SERVICE_TYPES = [
  { id: 'ai', title: 'AI Systems', icon: Cpu, description: 'Custom AI Agents & LLM Integration' },
  { id: 'web', title: 'SaaS & Web', icon: Layout, description: 'Scalable Platforms & Web Apps' },
  { id: 'game', title: 'Game Dev', icon: Gamepad2, description: 'Interactive Experiences & Logic' },
  { id: 'auto', title: 'Automation', icon: Zap, description: 'Bots & Workflow Engineering' },
];

const QUICK_VISIONS = [
  "Build a scalable SaaS platform",
  "Create an intelligent AI Agent",
  "Develop a high-end mobile app",
  "Automate my business workflows",
  "Launch a unique web-based game",
  "Optimize existing codebase"
];

export default function SolutionPortal() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    vision: '',
    name: '',
    phone: '',
    email: '',
  });

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const addVisionTag = (tag: string) => {
    setFormData(prev => ({ ...prev, vision: prev.vision ? `${prev.vision}, ${tag}` : tag }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 🚀 Direct to WhatsApp Integration
    const whatsappNumber = "201229102164"; // Salah's Number
    const serviceName = SERVICE_TYPES.find(s => s.id === formData.service)?.title || "General Inquiry";
    
    const message = `🚀 *New Project Request from Salah05ai Portal*%0A%0A` +
                    `👤 *Client:* ${formData.name}%0A` +
                    `🎯 *Service:* ${serviceName}%0A` +
                    `💡 *Vision:* ${formData.vision}%0A` +
                    `📧 *Email:* ${formData.email}%0A` +
                    `📱 *Phone:* ${formData.phone}%0A%0A` +
                    `_Looking forward to architecting this empire!_`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    setStep(5); // Transition to success state
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">The <span className="text-accent">Solution Portal</span></h2>
        <p className="text-muted max-w-2xl mx-auto mb-4">
          Ready to turn your idea into a digital empire? <br />
          Just a few details, and I'll architect the perfect solution for you.
        </p>
        <div className="h-1 w-12 bg-accent rounded-full" />
      </div>

      <div className="relative min-h-[550px] w-full bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-8 md:p-12">
        {/* Progress Bar */}
        {step < 5 && (
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              className="h-full bg-accent transition-all duration-500"
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center gap-8"
            >
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-3xl md:text-4xl font-bold">What's the goal?</h3>
                <p className="text-muted">Select the core of your project</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                {SERVICE_TYPES.map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => { setFormData({...formData, service: service.id}); handleNext(); }}
                    className={cn(
                      "p-6 rounded-2xl border cursor-pointer transition-all duration-300 group",
                      formData.service === service.id ? "border-accent bg-accent/10" : "border-white/10 bg-white/5 hover:border-accent/50"
                    )}
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="p-3 rounded-xl bg-white/5 group-hover:bg-accent group-hover:text-black transition-colors">
                        {React.createElement(service.icon, { className: "w-6 h-6" })}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-white">{service.title}</p>
                        <p className="text-muted text-xs">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-8"
            >
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-2">Describe your vision</h3>
                <p className="text-muted">Just a simple explanation of what you want to achieve.</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {QUICK_VISIONS.map((tag) => (
                    <button 
                      key={tag}
                      onClick={() => addVisionTag(tag)}
                      className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] text-muted hover:text-white hover:border-accent transition-all"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
                <textarea 
                  className="w-full h-48 p-6 rounded-3xl bg-white/5 border border-white/10 focus:border-accent outline-none transition-all text-white placeholder:text-muted"
                  placeholder="I want to build..."
                  value={formData.vision}
                  onChange={(e) => setFormData({...formData, vision: e.target.value})}
                />
              </div>

              <div className="flex justify-between gap-4">
                <button onClick={handlePrev} className="px-6 py-3 rounded-full border border-white/10 text-muted hover:text-white transition-colors">Back</button>
                <button 
                  disabled={!formData.vision}
                  onClick={handleNext} 
                  className="px-8 py-3 rounded-full bg-white text-black font-bold hover:shadow-[0_0_20px_rgba(58,134,255,0.4)] transition-all disabled:opacity-50"
                >
                  Continue <ArrowRight className="inline ml-2 w-4 h-4" />
                </button>
 la la laL
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-10"
            >
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-2">Your Contact Details</h3>
                <p className="text-muted">So I can reach out to you with the perfect proposal.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 max-w-xl mx-auto w-full">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-muted ml-2 flex items-center gap-2">
                    <User className="w-3 h-3" /> Full Name
                  </label>
                  <input 
                    type="text" 
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent outline-none text-white placeholder:text-muted transition-all"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-muted ml-2 flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Phone Number (WhatsApp)
                  </label>
                  <input 
                    type="tel" 
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent outline-none text-white placeholder:text-muted transition-all"
                    placeholder="+20 123 456 789"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-muted ml-2 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <input 
                    type="email" 
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent outline-none text-white placeholder:text-muted transition-all"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <button onClick={handlePrev} className="px-6 py-3 rounded-full border border-white/10 text-muted hover:text-white transition-colors">Back</button>
                <button 
                  disabled={!formData.name || !formData.phone || !formData.email}
                  onClick={handleNext} 
                  className="px-8 py-3 rounded-full bg-white text-black font-bold hover:shadow-[0_0_20px_rgba(58,134,255,0.4)] transition-all disabled:opacity-50"
                >
                  Almost There <ArrowRight className="inline ml-2 w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center gap-8"
            >
              <div className="flex flex-col items-center gap-2">
                <CheckCircle className="w-12 h-12 text-accent mb-2 animate-pulse" />
                <h3 className="text-3xl md:text-4 la- l l la l laL l la de l la de l la la l laL 4 font-bold">Ready to Launch?</h3>
                <p className="text-muted">Everything looks good. Just one last click to send your vision.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl max-w-md w-full text-left space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span className="text-muted">Service:</span> <span className="text-white font-bold">{SERVICE_TYPES.find(s => s.id === formData.service)?.title}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted">Name:</span> <span className="text-white font-bold">{formData.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted">Contact:</span> <span className="text-white font-bold">{formData.phone}</span></div>
              </div>

              <button 
                onClick={handleSubmit}
                className="px-12 py-6 rounded-full bg-accent text-white font-bold text-2xl hover:shadow-[0_0_40px_rgba(58,134,255,0.6)] transition-all flex items-center justify-center gap-3"
              >
                Launch Project <Send className="w-6 h-6" />
              </button>
              <button onClick={handlePrev} className="text-muted text-xs hover:text-white transition-colors">Wait, I want to change something</button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center gap-6 py-12"
            >
              <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-4 relative">
                <CheckCircle className="w-12 h-12 text-accent animate-bounce" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full bg-accent blur-xl"
                />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold">Request Transmitted!</h3>
              <p className="text-muted max-w-md mx-auto text-lg leading-relaxed">
                Your vision has been received. I'll analyze the requirements and reach out via WhatsApp/Email with a strategic proposal shortly.
              </p>
              <button 
                onClick={() => setStep(1)}
                className="mt-8 px-8 py-3 rounded-full border border-white/10 text-sm hover:bg-white/5 transition-colors"
              >
                Start Another Project
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
