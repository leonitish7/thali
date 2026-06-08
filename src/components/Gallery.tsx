import React from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import SocialMediaFeed from './SocialMediaFeed';

const images = [

  { id: '1', url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=2699&auto=format&fit=crop', alt: 'Plated food 1', colSpan: 'col-span-2' },
  { id: '2', url: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=2574&auto=format&fit=crop', alt: 'Drinks', colSpan: 'col-span-1' },
  { id: '3', url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2670&auto=format&fit=crop', alt: 'Pasta dish', colSpan: 'col-span-1' },
  { id: '4', url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=2000', alt: 'Tandoori Herb-Crusted Rack of Lamb', colSpan: 'col-span-2' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4">Gallery</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
            A Feast for the Eyes
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative h-64 md:h-80 rounded-2xl overflow-hidden group ${img.colSpan}`}
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <div className="mt-32 pt-16 border-t border-stone-200">
          <div className="flex flex-col items-center justify-center mb-8">
            <Instagram className="text-accent mb-4" size={32} />
            <h3 className="text-3xl font-serif font-bold text-stone-900">Follow Our Journey</h3>
            <p className="text-stone-500 mt-2 font-light">@thalirestaurant</p>
          </div>
          <SocialMediaFeed />
        </div>
      </div>
    </section>
  );
}
