import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4">Location</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
            Find Us
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Details */}
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="space-y-10"
          >
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <MapPin className="text-accent" />
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold text-stone-900 mb-2">Address</h4>
                <p className="text-stone-600 leading-relaxed font-light">
                  K-43, 1st floor, Block K,<br/>
                  Connaught Place, New Delhi, Delhi 110001
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Clock className="text-accent" />
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold text-stone-900 mb-2">Opening Hours</h4>
                <div className="space-y-1 text-stone-600 font-light">
                  <p><span className="font-medium">Mon - Thu:</span> 11:00 AM - 10:00 PM</p>
                  <p><span className="font-medium">Fri - Sat:</span> 11:00 AM - 11:00 PM</p>
                  <p><span className="font-medium">Sunday:</span> 10:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Phone className="text-accent" />
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold text-stone-900 mb-2">Contact</h4>
                <div className="space-y-1 text-stone-600 font-light">
                  <p>+91 77770 32666</p>
                  <p>reservations@thali.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map/Image Placeholder */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="h-[400px] bg-stone-200 rounded-3xl overflow-hidden shadow-lg relative"
          >
             <iframe 
                src="https://maps.google.com/maps?q=K-43,%201st%20floor,%20Block%20K,%20Connaught%20Place,%20New%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
             ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
