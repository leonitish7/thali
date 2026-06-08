import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Tag, ChevronDown, ChevronUp, Plus, Minus, Utensils, Wind, Car, Wifi, Music, CalendarDays, Clock, Phone, Mail, User } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { menuData } from '../data/menu';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import AuthModal from './AuthModal';

type Package = {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  min?: number;
  badges: string[];
  description: string;
  type: 'veg' | 'non-veg' | 'any';
};

const packages: Package[] = [
  {
    id: 'family',
    title: 'Family Special(4@2999)',
    price: 750,
    originalPrice: 799,
    min: 4,
    badges: ['Limited time deal', 'Deal Icon'],
    type: 'any',
    description: 'Group offer for 4 or more • ₹750 per person • Includes veg & non-veg buffet',
  },
  {
    id: 'sizzling',
    title: 'Sizzling 7 @777',
    price: 777,
    originalPrice: 799,
    min: 7,
    badges: [],
    type: 'any',
    description: 'Exclusive group offer for 7 or more. Gather your friends and indulge in an unlimited buffet experience with all stations included.',
  },
  {
    id: 'veg',
    title: 'VEG',
    price: 749,
    badges: [],
    type: 'veg',
    description: 'Enjoy a wholesome vegetarian buffet experience featuring unlimited grilled starters served on the table, along with a grand spread of main-course dishes, comfort classics, live counters (where available) and a signature dessert section with a variety of sweets and ice creams. A perfect celebration for pure veg lovers who enjoy variety and unlimited refills.',
  },
  {
    id: 'non-veg',
    title: 'NON-VEG',
    price: 799,
    badges: [],
    type: 'non-veg',
    description: 'The Non-Veg Buffet includes the complete Veg Buffet, along with additional non-vegetarian starters and main-course preparations. Expect unlimited grills, rich flavours and a premium spread across starters, mains and desserts — crafted for guests who enjoy both veg and non-veg options in one celebration.',
  },
  {
    id: 'student',
    title: 'Student (10-21 yrs)',
    price: 749,
    originalPrice: 799,
    badges: ['Student Special', 'Deal Icon'],
    type: 'any',
    description: 'Students (10–21 years) Student discount available only on showing a valid student ID card.. Applicable for veg / non-veg. Cannot be clubbed with any other offer.',
  },
  {
    id: 'kid',
    title: 'Kid (6-9 years)',
    price: 449,
    badges: [],
    type: 'any',
    description: 'The Kids Buffet includes both Veg and Non-Veg items at the same price, curated specially for children with lighter flavours and kid-friendly dishes. With unlimited starters, mains and desserts, it allows young guests to enjoy the same festive BBQ experience as adults — just in the perfect portion and taste balance for kids.',
  }
];

const amenities = [
  { icon: Wind, label: 'Air Conditioned' },
  { icon: Car, label: 'Valet Parking' },
  { icon: Utensils, label: 'Live Counters' },
  { icon: Wifi, label: 'Free Wi-Fi' },
  { icon: Music, label: 'Live Music' },
];

export default function BookingModal() {
  const { isBookingOpen, setIsBookingOpen } = useBooking();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState<string>('');
  const [session, setSession] = useState<'Lunch' | 'Dinner'>('Dinner');
  const [time, setTime] = useState<string>('');
  
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [menuQuantities, setMenuQuantities] = useState<Record<string, number>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Form Details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  const [user, loading] = useAuthState(auth);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.displayName) setName(user.displayName);
      if (user.email) setEmail(user.email);
    }
  }, [user]);

  const lunchTimes = ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM'];
  const dinnerTimes = ['07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'];
  const timeSlots = session === 'Lunch' ? lunchTimes : dinnerTimes;

  const updateQuantity = (id: string, newQty: number) => {
    const pkg = packages.find(p => p.id === id);
    if (!pkg) return;
    
    let updatedQty = newQty;
    
    // Enforcing minimums
    if (pkg.min) {
      const currentQty = quantities[id] || 0;
      if (newQty > 0 && newQty < pkg.min && newQty > currentQty) {
        updatedQty = pkg.min;
      } else if (newQty > 0 && newQty < pkg.min && newQty < currentQty) {
        updatedQty = 0;
      }
    }
    
    if (updatedQty < 0) updatedQty = 0;
    
    setQuantities(prev => ({ ...prev, [id]: updatedQty }));
  };

  const updateMenuQuantity = (id: string, delta: number) => {
    setMenuQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const totalGuests: number = (Object.values(quantities) as number[]).reduce((a: number, b: number) => a + b, 0);
  const totalPackagesPrice = packages.reduce((sum, pkg) => sum + (pkg.price * (quantities[pkg.id] || 0)), 0);
  const totalMenuPrice = menuData.reduce((sum, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return sum + (numericPrice * (menuQuantities[item.id] || 0));
  }, 0);
  
  const totalPrice = totalPackagesPrice + totalMenuPrice;

  const canContinue = date && time && totalGuests > 0;

  const handleContinue = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setStep(2);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setStep(2);
  };

  const handleBooking = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        name,
        email,
        phone,
        date,
        time,
        session,
        guests: totalGuests,
        totalPrice,
        packages: quantities,
        menuItems: menuQuantities,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      });
      
      toast.success('Table booking confirmed!');
      setStep(3);
      setTimeout(() => {
        // Reset and close
        setStep(1);
        setQuantities({});
        setMenuQuantities({});
        setDate('');
        setTime('');
        setIsBookingOpen(false);
      }, 4000);
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error(err.message || 'Failed to book table');
      // In a real app we'd show an error message
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isBookingOpen) return null;

  return (
    <>
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
      <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
        {/* Backdrop */}
        <motion.div 

        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm"
        onClick={() => setIsBookingOpen(false)}
      />
      
      {/* Modal Container */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative bg-white w-full max-w-6xl h-full md:h-[90vh] md:rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]"
      >
        <button 
          onClick={() => setIsBookingOpen(false)} 
          className="absolute top-4 right-4 z-50 p-3 bg-white/50 backdrop-blur-md rounded-full text-stone-900 hover:bg-stone-200 transition-colors md:top-6 md:right-6"
        >
          <X size={24} />
        </button>

        {/* Left Side: Amenities & Marketing */}
        <div className="hidden md:flex flex-col w-5/12 bg-stone-900 text-white relative">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2670&auto=format&fit=crop" 
              alt="Buffet Spread" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/80 to-transparent" />
          </div>
          
          <div className="relative z-10 p-12 flex flex-col h-full">
            <h2 className="text-4xl font-serif font-bold text-white mb-2 leading-tight">
              The Grand <br /><span className="text-accent italic font-light">Thali Buffet</span>
            </h2>
            <p className="text-stone-300 font-light text-lg mb-10 leading-relaxed">
              Experience a feast of flavors. Over 100+ items carefully curated for the perfect celebration.
            </p>
            
            <div className="mt-auto">
              <h3 className="text-sm uppercase tracking-widest font-semibold text-stone-400 mb-6">World-Class Amenities</h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                {amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-stone-200">
                    <div className="bg-stone-800/80 p-2.5 rounded-full border border-stone-700">
                      <item.icon size={20} className="text-accent" />
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Booking Flow */}
        <div className="flex-1 flex flex-col bg-stone-50 overflow-y-auto relative h-full">
          {step === 1 && (
            <div className="p-6 md:p-10 pb-40">
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-8">Select Date & Time</h3>
              
              {/* Date & Session Box */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm mb-10">
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-stone-900 uppercase tracking-widest mb-3 flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2 text-stone-400"/> Date
                  </label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={e => setDate(e.target.value)} 
                    className="w-full md:w-1/2 p-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all outline-none"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-stone-900 uppercase tracking-widest mb-3">Session</label>
                  <div className="flex bg-stone-100 p-1.5 rounded-2xl w-full md:w-1/2">
                    <button 
                      onClick={() => {setSession('Lunch'); setTime('');}} 
                      className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${session === 'Lunch' ? 'bg-white text-stone-900 shadow-md' : 'text-stone-500 hover:text-stone-700'}`}
                    >
                      Lunch
                    </button>
                    <button 
                      onClick={() => {setSession('Dinner'); setTime('');}} 
                      className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${session === 'Dinner' ? 'bg-white text-stone-900 shadow-md' : 'text-stone-500 hover:text-stone-700'}`}
                    >
                      Dinner
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-900 uppercase tracking-widest mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-stone-400"/> Select Time
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map(t => (
                      <button 
                        key={t}
                        onClick={() => setTime(t)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                          time === t 
                            ? 'bg-accent border-accent text-white shadow-md' 
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Guests & Food Preference</h3>
              
              <div className="space-y-4">
                {packages.map(pkg => (
                  <div key={pkg.id} className="border border-stone-200 bg-white rounded-[1.5rem] p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {pkg.badges.map(badge => (
                            <span key={badge} className="inline-flex items-center space-x-1 px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                              <Tag size={12} /> <span>{badge}</span>
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <h4 className="font-serif font-bold text-stone-900 text-xl md:text-2xl">{pkg.title}</h4>
                        </div>
                        
                        {pkg.min && <p className="text-stone-500 text-sm mt-1 font-medium">(Min {pkg.min})</p>}
                        
                        <div className="flex items-end space-x-3 mt-3">
                          <span className="font-bold text-stone-900 text-lg md:text-xl">₹{pkg.price}/-</span>
                          {pkg.originalPrice && <span className="text-stone-400 line-through text-sm mb-1">₹{pkg.originalPrice}/-</span>}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-start md:justify-end mt-4 md:mt-0">
                        {(quantities[pkg.id] || 0) === 0 ? (
                          <button 
                            onClick={() => updateQuantity(pkg.id, pkg.min || 1)}
                            className="bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold px-8 py-3 rounded-xl transition-colors min-w-[120px]"
                          >
                            Add
                          </button>
                        ) : (
                          <div className="flex items-center space-x-4 bg-stone-100 rounded-xl p-1.5 border border-stone-200 shadow-inner">
                            <button
                              onClick={() => updateQuantity(pkg.id, (quantities[pkg.id] || 0) - 1)}
                              className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-sm transition-colors cursor-pointer"
                            >
                              <Minus size={18} />
                            </button>
                            <span className="text-lg font-bold w-6 text-center text-stone-900">
                              {quantities[pkg.id]}
                            </span>
                            <button
                              onClick={() => updateQuantity(pkg.id, (quantities[pkg.id] || 0) + 1)}
                              className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-sm transition-colors cursor-pointer"
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-stone-100">
                      <button 
                        onClick={() => setExpandedId(expandedId === pkg.id ? null : pkg.id)} 
                        className="flex items-center text-accent text-sm font-semibold uppercase tracking-wider hover:text-accent/80 transition-colors"
                      >
                        {expandedId === pkg.id ? 'Hide details' : 'View details'} 
                        {expandedId === pkg.id ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                      </button>
                      <AnimatePresence>
                        {expandedId === pkg.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-stone-600 font-light text-sm mt-4 leading-relaxed bg-stone-50 p-4 rounded-xl">
                              {pkg.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-12 mb-6">Pre-order Menu Elements (Optional)</h3>
              <div className="space-y-4">
                {menuData.map((item) => (
                  <div key={item.id} className="border border-stone-200 bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-serif font-bold text-stone-900 text-lg">{item.name}</h4>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex gap-1 hidden md:flex">
                            {item.tags.map(tag => (
                              <span key={tag} className="inline-block px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-stone-100 text-stone-500 rounded-md">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-stone-500 text-sm mt-1 line-clamp-1">{item.description}</p>
                      <div className="mt-2 font-bold text-stone-900 text-md">{item.price}</div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      {(menuQuantities[item.id] || 0) === 0 ? (
                        <button 
                          onClick={() => updateMenuQuantity(item.id, 1)}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold px-6 py-2 rounded-xl transition-colors text-sm"
                        >
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center space-x-3 bg-stone-100 rounded-xl p-1 border border-stone-200 shadow-inner">
                          <button
                            onClick={() => updateMenuQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-sm transition-colors cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center text-stone-900">
                            {menuQuantities[item.id]}
                          </span>
                          <button
                            onClick={() => updateMenuQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-sm transition-colors cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="p-6 md:p-10 flex-1 flex flex-col min-h-0 overflow-y-auto">
               <button onClick={() => setStep(1)} className="text-stone-500 hover:text-stone-900 text-sm font-medium mb-8 flex items-center">
                 &larr; Back to selections
               </button>
               
               <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Confirm Details</h3>
               
               <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm mb-8">
                 <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-stone-400" />
                      </div>
                      <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-stone-400" />
                      </div>
                      <input required type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Mobile Number" className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-stone-400" />
                      </div>
                      <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" />
                    </div>
                 </div>
               </div>

               <div className="bg-stone-900 rounded-3xl p-6 text-white">
                 <p className="text-stone-400 text-sm font-semibold uppercase tracking-widest mb-4">Summary</p>
                 <div className="flex justify-between items-center mb-2">
                   <span>{date} at {time}</span>
                   <span className="font-bold">{totalGuests} Guests</span>
                 </div>
                 <div className="flex justify-between items-center mb-4 text-stone-300">
                   <span className="text-sm">Total Buffet Packages Selection</span>
                 </div>
                 <div className="border-t border-stone-700 pt-4 flex justify-between items-end mt-4">
                   <span className="text-lg">Amount to pay</span>
                   <span className="text-3xl font-serif font-bold text-accent">₹{totalPrice}/-</span>
                 </div>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center h-full">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-4xl font-serif font-bold text-stone-900 mb-4">Table Confirmed!</h3>
              <p className="text-stone-500 text-lg max-w-md mx-auto leading-relaxed">
                Thank you, {name}. Your table for {totalGuests} guests on {date} at {time} is successfully booked. We've sent the confirmation details to your email.
              </p>
            </div>
          )}

          {/* Bottom Fixed Action Bar */}
          {step === 1 && (
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 md:p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-20">
               <div className="flex justify-between items-center max-w-2xl mx-auto">
                 <div>
                   <p className="text-stone-500 text-sm font-semibold uppercase tracking-widest mb-1">Grand Total</p>
                   <p className="text-2xl md:text-3xl font-serif font-bold text-stone-900">₹{totalPrice}/-</p>
                   {totalGuests > 0 && <p className="text-xs text-accent mt-0.5">{totalGuests} Guests Selected</p>}
                 </div>
                 <button 
                   onClick={handleContinue}
                   disabled={!canContinue}
                   className="bg-accent text-white px-8 md:px-12 py-4 rounded-2xl font-bold text-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
                 >
                   Continue
                 </button>
               </div>
            </div>
          )}

          {step === 2 && (
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 md:p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-20">
               <div className="flex justify-between items-center max-w-2xl mx-auto">
                 <div>
                   <p className="text-stone-500 text-sm font-semibold uppercase tracking-widest mb-1">To Pay</p>
                   <p className="text-2xl md:text-3xl font-serif font-bold text-stone-900">₹{totalPrice}/-</p>
                 </div>
                 <button 
                   onClick={handleBooking}
                   disabled={!name || !phone || !email || isSubmitting}
                   className="bg-green-600 text-white px-8 md:px-12 py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-600/20"
                 >
                   {isSubmitting ? 'Booking...' : 'Book Now'}
                 </button>
               </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
    </>
  );
}
