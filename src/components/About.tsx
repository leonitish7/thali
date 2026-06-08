import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] bg-stone-200 rounded-3xl overflow-hidden shadow-2xl relative">
            <img 
              src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2670&auto=format&fit=crop" 
              alt="Restaurant Interior"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary-100 rounded-full flex items-center justify-center p-6 shadow-xl hidden sm:flex">
             <p className="text-center font-serif text-primary-800 text-lg leading-tight italic">
               "A true culinary masterpiece."
             </p>
          </div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4">Our Story</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6 leading-tight">
            Minimalist Design, <br/>Maximalist Flavor.
          </h3>
          <p className="text-stone-600 mb-6 leading-relaxed text-lg font-light">
            Thali offers a vibrant and modern platform, perfect for showcasing diverse menus and culinary styles. With a minimalist yet engaging design, it captures the essence of your restaurant, ensuring an appealing and intuitive user experience.
          </p>
          <p className="text-stone-600 mb-10 leading-relaxed text-lg font-light">
            Whether you're looking for an intimate dinner, a venue for a private event, or robust catering services, our team is dedicated to providing excellence in every bite.
          </p>
          
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg" alt="Chef Signature" className="h-12 opacity-60 mix-blend-multiply" />
        </motion.div>
      </div>
    </section>
  );
}
