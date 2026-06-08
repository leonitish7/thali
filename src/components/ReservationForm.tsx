import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarDays, Users, Phone, User, Clock, Check } from 'lucide-react';

const timeSlots = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

const floorPlanTables = [
  { id: 'T1', type: 'window', capacity: 2, label: 'Window 1' },
  { id: 'T2', type: 'window', capacity: 2, label: 'Window 2' },
  { id: 'T3', type: 'window', capacity: 4, label: 'Window 3' },
  { id: 'T4', type: 'standard', capacity: 4, label: 'Table 4' },
  { id: 'T5', type: 'standard', capacity: 6, label: 'Table 5 (Large)' },
  { id: 'T6', type: 'booth', capacity: 4, label: 'Booth A' },
  { id: 'T7', type: 'booth', capacity: 4, label: 'Booth B' },
  { id: 'T8', type: 'patio', capacity: 2, label: 'Patio 1' },
  { id: 'T9', type: 'patio', capacity: 4, label: 'Patio 2' },
];

export default function ReservationForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [step, setStep] = useState<1 | 2>(1);
  
  // Form State
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('2');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && contact && date && time && partySize) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1200);
  };

  const getAvailableTables = () => {
    const size = parseInt(partySize.split('-')[0]) || 2;
    return floorPlanTables.filter(t => t.capacity >= size);
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-stone-800/50 rounded-3xl border border-stone-700 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl flex-shrink-0 pointer-events-none" />
        <h4 className="text-2xl font-serif font-bold text-white mb-2 relative z-10">Reservation Confirmed</h4>
        <p className="text-stone-400 font-light max-w-sm mx-auto relative z-10">
          We've reserved {selectedTable ? floorPlanTables.find(t => t.id === selectedTable)?.label : 'a table'} for {name} on {date} at {time}. We look forward to hosting you!
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setStep(1);
            setSelectedTable(null);
          }}
          className="mt-6 px-6 py-2 border border-stone-600 rounded-full text-stone-300 hover:text-white hover:border-accent hover:bg-accent/10 transition-colors relative z-10"
        >
          Make another reservation
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-stone-800 p-6 sm:p-8 rounded-3xl border border-stone-700 shadow-2xl relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xl font-serif font-bold text-white">Book a Table</h4>
        <div className="flex space-x-2 text-xs font-semibold tracking-wider text-stone-500 uppercase">
          <span className={step === 1 ? "text-accent" : "text-stone-400"}>1. Details</span>
          <span>&#8594;</span>
          <span className={step === 2 ? "text-accent" : "text-stone-600"}>2. Table</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleNextStep} 
            className="space-y-6 relative z-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-stone-500" />
                </div>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="w-full pl-11 pr-4 py-3.5 bg-stone-900 border border-stone-700 rounded-2xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-stone-500" />
                </div>
                <input required type="text" value={contact} onChange={e => setContact(e.target.value)} placeholder="Phone or Email" className="w-full pl-11 pr-4 py-3.5 bg-stone-900 border border-stone-700 rounded-2xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CalendarDays className="h-5 w-5 text-stone-500" />
                </div>
                <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-stone-900 border border-stone-700 rounded-2xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all appearance-none" style={{ colorScheme: 'dark' }} />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-stone-500" />
                </div>
                <select required value={partySize} onChange={e => setPartySize(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-stone-900 border border-stone-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all appearance-none">
                  <option value="" disabled className="text-stone-500">Party Size</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3-4">3-4 People</option>
                  <option value="5-6">5-6 People</option>
                  <option value="7+">7+ People</option>
                </select>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide text-stone-400 mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" /> Select Time
              </p>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map(t => (
                  <button 
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                      time === t 
                        ? 'bg-accent/20 border-accent text-accent' 
                        : 'bg-stone-900 border-stone-700 text-stone-400 hover:border-stone-500'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!time}
              className="w-full py-4 mt-4 bg-white text-stone-900 rounded-2xl font-semibold hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Find Available Tables
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 relative z-10"
          >
            <div className="bg-stone-900 p-4 rounded-xl border border-stone-700 text-sm text-stone-400">
              <span className="font-medium text-white">{date} at {time}</span> for <span className="font-medium text-white">{partySize} people</span>
              <button onClick={() => setStep(1)} className="ml-4 text-accent hover:underline uppercase text-xs tracking-wider">Edit</button>
            </div>

            <div>
               <p className="text-sm font-semibold tracking-wide text-white mb-4">Select Your Preference</p>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                 {getAvailableTables().map(table => (
                   <button
                     key={table.id}
                     onClick={() => setSelectedTable(table.id)}
                     className={`p-3 rounded-2xl text-left border flex flex-col items-start transition-all ${
                       selectedTable === table.id
                         ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(196,91,56,0.2)]'
                         : 'border-stone-700 bg-stone-900 hover:border-stone-500'
                     }`}
                   >
                     <div className="flex justify-between w-full mb-2">
                       <span className="text-xs uppercase tracking-widest text-stone-500">{table.type}</span>
                       {selectedTable === table.id && <Check size={14} className="text-accent" />}
                     </div>
                     <span className="text-sm font-bold text-white mb-1 leading-tight">{table.label}</span>
                     <span className="text-xs text-stone-500 mt-auto">Up to {table.capacity} guests</span>
                   </button>
                 ))}
               </div>
               {getAvailableTables().length === 0 && (
                 <p className="text-sm text-red-400 mt-2">No tables large enough for this party size. Please call us.</p>
               )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!selectedTable || status === 'submitting'}
              className="w-full py-4 bg-accent text-white rounded-2xl font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-accent/20"
            >
              <span>{status === 'submitting' ? 'Confirming...' : 'Confirm Reservation'}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
