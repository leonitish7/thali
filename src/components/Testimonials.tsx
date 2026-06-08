import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    text: "The best dining experience I've had in years. Every dish was a masterpiece of flavor and presentation. The attention to detail is truly unmatched.",
    author: "Sarah Jenkins",
    role: "Local Food Critic"
  },
  {
    id: '2',
    text: "A hidden gem in the heart of the city. The truffle arancini are simply out of this world, and the atmosphere is wonderfully intimate.",
    author: "Michael Chen",
    role: "Regular Guest"
  },
  {
    id: '3',
    text: "Impeccable service paired with an extraordinary tasting menu. Thali has redefined modern dining for me. Cannot recommend it highly enough.",
    author: "Elena Rodriguez",
    role: "Event Planner"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  return (
    <section className="py-24 bg-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
            Guest Experiences
          </h3>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Quote Icon Background */}
          <div className="absolute top-0 left-8 md:-left-8 text-stone-200/50 pointer-events-none -z-10">
            <Quote size={120} className="transform -rotate-6" />
          </div>

          <div className="min-h-[250px] relative flex flex-col justify-center">
             <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-center px-4 md:px-16"
              >
                <p className="text-2xl md:text-3xl font-serif text-stone-800 leading-relaxed italic mb-10">
                  "{testimonials[currentIndex].text}"
                </p>
                <div>
                  <h4 className="font-bold text-stone-900 tracking-wide uppercase text-sm">
                    {testimonials[currentIndex].author}
                  </h4>
                  <span className="text-stone-500 font-light text-sm mt-1 inline-block">
                    {testimonials[currentIndex].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-6 mt-12">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentIndex === index ? 'bg-accent w-8' : 'bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
