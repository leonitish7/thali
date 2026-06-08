import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Do you offer vegetarian and vegan options?",
    answer: "Absolutely. We believe exceptional dining should be accessible to everyone. Our menu features a dedicated section for plant-based dishes, and many of our standard mains can be adapted upon request."
  },
  {
    question: "Is there a specific dress code?",
    answer: "Our dress code is smart casual. We want you to feel comfortable but ask that guests avoid athletic wear, excessively distressed clothing, and flip-flops."
  },
  {
    question: "Can you accommodate serious food allergies?",
    answer: "Yes, we take food allergies incredibly seriously. Please inform us of any severe allergies when making your reservation so our kitchen can prepare accordingly to ensure your safety and enjoyment."
  },
  {
    question: "Do you have parking facilities?",
    answer: "We offer complimentary valet parking for all dinner guests starting at 5:00 PM. Additionally, there is a public parking garage located just one block east of the restaurant."
  },
  {
    question: "How far in advance should I book a table?",
    answer: "For weekend dining, we recommend booking at least two weeks in advance. For larger parties or private events, please reach out directly via our contact form."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4">FAQ</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl transition-all duration-300 ${
                openIndex === index ? 'border-stone-300 bg-stone-50 shadow-sm' : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
              >
                <span className="text-lg font-serif font-bold text-stone-900 pr-8">{faq.question}</span>
                <div className={`flex-shrink-0 transition-transform duration-300 text-stone-400 ${openIndex === index ? 'rotate-180 text-accent' : ''}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-stone-600 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
