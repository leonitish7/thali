import React from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-stone-900/60 gradient-mask"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white mt-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="block text-sm md:text-base font-semibold tracking-widest uppercase mb-6 text-primary-200"
        >
          A Modern Culinary Experience
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-8"
        >
          Taste the <br/><span className="text-accent italic font-light">Extraordinary</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto mb-10 font-light"
        >
          Vibrant, modern, and captivating. We bring diverse culinary styles together for an unforgettable dining experience.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <a href="#menu" className="px-8 py-4 bg-accent text-white rounded-full font-semibold hover:bg-accent/90 transition-colors w-full sm:w-auto">
            View Our Menu
          </a>
          <a href="#contact" className="px-8 py-4 bg-transparent border border-white text-white rounded-full font-semibold hover:bg-white hover:text-stone-900 transition-colors w-full sm:w-auto">
            Find Us
          </a>
        </motion.div>
      </div>

      <style>{`
        .gradient-mask {
          background: linear-gradient(to bottom, rgba(28, 25, 23, 0.4), rgba(28, 25, 23, 0.8));
        }
      `}</style>
    </section>
  );
}
