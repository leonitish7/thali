import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Users } from 'lucide-react';
import ReservationForm from './ReservationForm';

const events = [
  { id: '1', title: 'Wine Tasting Evening', date: 'Oct 24, 2024', time: '19:00 - 22:00' },
  { id: '2', title: 'Live Jazz & Dinner', date: 'Nov 02, 2024', time: '20:00 - 23:00' },
];

export default function CateringEvents() {
  return (
    <section id="events" className="py-24 bg-stone-900 text-stone-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        
        {/* Catering Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <Users className="text-accent" />
            <h2 className="text-sm font-semibold tracking-widest uppercase text-accent">Catering & Booking</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            Elevate Your <br/>Next Gathering.
          </h3>
          <p className="text-stone-400 mb-8 font-light text-lg leading-relaxed max-w-md">
            From intimate private dinners to large corporate events, our culinary team delivers an exceptional experience tailored to your unique needs.
          </p>
          
          <div className="mt-8">
            <ReservationForm />
          </div>
        </motion.div>

        {/* Events Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="lg:pl-10 lg:border-l border-stone-800"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="text-accent" />
            <h2 className="text-sm font-semibold tracking-widest uppercase text-accent">Upcoming Events</h2>
          </div>
          <h3 className="text-4xl font-serif font-bold text-white mb-8">
            What's Happening
          </h3>
          
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="p-6 border border-stone-700 rounded-2xl hover:border-accent hover:bg-stone-800 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-serif font-bold text-white group-hover:text-accent transition-colors">
                    {event.title}
                  </h4>
                  <span className="text-accent font-mono text-sm">{event.date}</span>
                </div>
                <p className="text-stone-400 text-sm">{event.time}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
             <a href="#" className="text-accent hover:text-white font-medium inline-flex items-center transition-colors">
               View All Events &rarr;
             </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
