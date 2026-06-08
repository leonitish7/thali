import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div className="col-span-1 md:col-span-2">
          <a href="#" className="inline-block text-2xl font-serif font-bold tracking-tight text-white mb-6">
            Thali<span className="text-accent">.</span>
          </a>
          <p className="max-w-sm font-light leading-relaxed mb-8 text-sm">
            A dynamic, modern template for restaurants. Experience a minimalist yet captivating style perfect for enhancing your online presence.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div>
           <h5 className="text-white font-semibold mb-6">Quick Links</h5>
           <ul className="space-y-4 text-sm font-light">
             <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
             <li><a href="#menu" className="hover:text-accent transition-colors">Our Menu</a></li>
             <li><a href="#events" className="hover:text-accent transition-colors">Events & Catering</a></li>
             <li><a href="#gallery" className="hover:text-accent transition-colors">Gallery</a></li>
             <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
           </ul>
        </div>

        <div>
           <h5 className="text-white font-semibold mb-6">Legal</h5>
           <ul className="space-y-4 text-sm font-light">
             <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
             <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
             <li><a href="#" className="hover:text-accent transition-colors">Cookie Policy</a></li>
           </ul>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-stone-800 text-sm text-stone-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Thali Template. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed with modern visual aesthetics.</p>
      </div>
    </footer>
  );
}
