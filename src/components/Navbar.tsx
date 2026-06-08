import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useBooking } from '../context/BookingContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { setIsBookingOpen } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-2xl font-serif font-bold tracking-tight ${scrolled ? 'text-stone-900' : 'text-white'}`}>
          Thali<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  scrolled ? 'text-stone-600 hover:text-accent' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-full transition-colors ${
                scrolled ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1/4 -translate-y-1/4">
                  {itemCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              scrolled 
                ? 'bg-accent text-white hover:bg-accent/90' 
                : 'bg-white text-stone-900 hover:bg-white/90'
            }`}>
              Book a Table
            </button>
          </div>
        </div>

        {/* Mobile Menu Button & Cart */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className={`relative p-2 rounded-full transition-colors ${
              scrolled ? 'text-stone-600 hover:text-stone-900' : 'text-white/80 hover:text-white'
            }`}
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1/4 -translate-y-1/4">
                {itemCount}
              </span>
            )}
          </button>
          <button
            className={scrolled ? 'text-stone-900' : 'text-white'}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-stone-100 py-4 px-6 md:hidden flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-stone-600 font-medium hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-stone-100">
              <button 
                onClick={() => { setIsBookingOpen(true); setIsOpen(false); }}
                className="w-full bg-accent text-white px-6 py-3 rounded-md font-semibold hover:bg-accent/90 transition-colors">
                Book a Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
