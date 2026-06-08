import React from 'react';
import { motion } from 'motion/react';

export default function ChefSpotlight() {
  return (
    <section className="py-24 bg-stone-900 text-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4">Chef Spotlight</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            Meet the Visionary <br/><span className="italic font-light">Behind the Flavor</span>.
          </h3>
          <p className="text-stone-400 mb-6 leading-relaxed text-lg font-light">
            With over 15 years of experience in Michelin-starred kitchens across Europe and Asia, Executive Chef Marcus Rossi brings a unique blend of formal technique and unbridled creativity to Thali.
          </p>
          <p className="text-stone-400 mb-10 leading-relaxed text-lg font-light">
             "For me, cooking is an act of translation. I am translating local, seasonal ingredients into a language of memory, comfort, and unexpected joy."
          </p>
          
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <span className="font-serif text-xl text-white">Marcus Rossi</span>
              <span className="text-accent text-sm tracking-widest uppercase font-medium">Executive Chef</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative h-full min-h-[500px]"
        >
          <div className="absolute inset-0 bg-stone-800 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2568&auto=format&fit=crop" 
              alt="Executive Chef Marcus Rossi"
              className="object-cover w-full h-full grayscale-[50%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
          {/* Decorative element */}
           <div className="absolute top-8 -right-8 w-32 h-32 border-t-2 border-r-2 border-accent rounded-tr-3xl hidden md:block opacity-50" />
           <div className="absolute -bottom-8 -left-8 w-32 h-32 border-b-2 border-l-2 border-accent rounded-bl-3xl hidden md:block opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
