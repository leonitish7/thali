import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function GiftCards() {
  const [amount, setAmount] = useState<number>(100);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const amounts = [50, 100, 150, 200, 500];

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail) return;
    setStatus('processing');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section className="py-24 bg-stone-50 border-t border-stone-200 border-dashed">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Information & Preview */}
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Gift className="text-accent" />
              <h2 className="text-sm font-semibold tracking-widest uppercase text-accent">Gift Cards</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Share the Gift <br/>of Extraordinary Flavor.
            </h3>
            <p className="text-stone-600 mb-10 leading-relaxed text-lg font-light max-w-md">
              Treat your friends, family, or colleagues to a memorable dining experience. Our digital gift cards are delivered instantly via email.
            </p>

            {/* Gift Card Preview */}
            <div className="relative w-full max-w-sm aspect-[1.586/1] bg-stone-900 rounded-3xl p-8 text-white shadow-2xl overflow-hidden flex flex-col justify-between">
              {/* Card Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-stone-700/30 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
              
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-xl font-serif font-bold tracking-tight">Thali<span className="text-accent">.</span></span>
                <span className="font-mono bg-white/20 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">Digital Card</span>
              </div>
              <div className="relative z-10 flex justify-between items-end">
                <div>
                  <span className="block text-xs uppercase tracking-widest text-stone-400 mb-1">Value</span>
                  <span className="text-4xl font-serif font-medium">${amount}</span>
                </div>
                <Gift className="text-accent/80 w-10 h-10" />
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-stone-100">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-3xl font-serif font-bold text-stone-900 mb-4">Card Sent!</h4>
                    <p className="text-stone-500 font-light max-w-sm mb-8">
                       The ${amount} digital gift card has been emailed to <span className="font-medium text-stone-900">{recipientEmail}</span>.
                    </p>
                    <button
                      onClick={() => {
                        setStatus('idle');
                        setRecipientEmail('');
                        setMessage('');
                      }}
                      className="text-accent font-medium hover:underline"
                    >
                      Send another gift card
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handlePurchase}
                    className="space-y-8"
                  >
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-stone-900 uppercase mb-4">
                        Select Amount
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {amounts.map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setAmount(amt)}
                            className={`px-6 py-3 rounded-2xl text-lg font-medium transition-all ${
                              amount === amt
                                ? 'bg-stone-900 text-white shadow-md'
                                : 'bg-stone-50 text-stone-600 border border-stone-200 hover:border-stone-400'
                            }`}
                          >
                            ${amt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-semibold tracking-wide text-stone-900 uppercase mb-2">
                        Recipient Details
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-stone-400" />
                        </div>
                        <input 
                          required 
                          type="email" 
                          placeholder="Recipient's Email Address"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                        />
                      </div>
                      <textarea 
                        rows={3} 
                        placeholder="Add a personalized message (optional)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none" 
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'processing'}
                      className="w-full py-4 bg-stone-900 text-white rounded-2xl font-semibold hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <span>{status === 'processing' ? 'Processing...' : `Purchase - $${amount}`}</span>
                      {status !== 'processing' && <ArrowRight size={18} />}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
