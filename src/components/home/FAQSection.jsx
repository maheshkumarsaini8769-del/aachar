import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { faqs } from '../../data/faqs';

export const FAQSection = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-14 bg-transparent border-b border-brand-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10">
          <span className="text-xs sm:text-sm font-black text-amber-800 uppercase tracking-widest block mb-2 bg-amber-100 border border-amber-300 w-fit mx-auto px-3.5 py-1 rounded-full shadow-xs">
            Questions & Answers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-brown">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-brand-brownMuted mt-2 font-medium">
            Everything you need to know about our sun-cooked pickles, natural preservation, and shipping.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-brand-border overflow-hidden transition-all duration-200 shadow-xs"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-4.5 sm:p-5 flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-brand-brown hover:text-brand-green transition-colors"
              >
                <span>{faq.question}</span>
                <div className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center shrink-0">
                  {openIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-brand-brown" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-brand-brown" />
                  )}
                </div>
              </button>

              {openIndex === idx && (
                <div className="px-5 sm:px-6 pb-5 pt-2 text-sm sm:text-base text-brand-brownMuted leading-relaxed border-t border-brand-border/40 font-normal">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('faq')}
            className="text-xs sm:text-sm font-bold text-brand-green hover:underline inline-flex items-center gap-1"
          >
            <span>Have more questions? Visit our complete FAQ Center →</span>
          </button>
        </div>

      </div>
    </section>
  );
};
