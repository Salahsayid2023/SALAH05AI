"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Download, ExternalLink, X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { db } from '@/lib/db';

export default function DigitalStore() {
  const [products, setProducts] = useState<any[]>([]);

  React.useEffect(() => {
    setProducts(db.getProducts());
  }, []);

  return (
    <section id="store" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">The <span className="text-accent">Digital Store</span></h2>
        <p className="text-muted max-w-2xl mx-auto mb-4">
          Professional tools and ready-to-deploy systems. Download, install, and scale your business.
        </p>
        <div className="h-1 w-12 bg-accent rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product, index) => (
            <motion.div
              key={product.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative rounded-3xl border border-white/10 bg-surface/50 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-accent/50"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-widest">
                  {product.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{product.title}</h3>
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-md">{product.price}</span>
                </div>
                <p className="text-muted text-sm mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="space-y-2 mb-8">
                  {product.features?.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted">
                      <Star className="w-3 h-3 text-accent" /> {feature}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a 
                    href={product.downloadUrl} 
                    className="flex-1 py-3 rounded-xl bg-white text-black text-xs font-bold flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-all"
                  >
                    <Download className="w-3 h-3" /> Download
                  </a>
                  <a 
                    href={product.demoUrl} 
                    className="p-3 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:border-accent transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center p-20 border border-dashed border-white/10 rounded-3xl text-muted">
            No products available in the store yet.
          </div>
        )}
      </div>
    </section>
  );
}
