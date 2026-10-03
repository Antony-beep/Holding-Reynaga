"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const componentId = useId();

  return (
    <section id="faq" className="py-20 md:py-32 bg-surface relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary"></div>
            <span className="font-display font-bold text-primary tracking-[0.2em] text-sm uppercase">
              Consultas
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          <h2 className="text-display font-black text-4xl md:text-5xl text-deep-navy tracking-tight mb-6">
            Preguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#B38728]">Frecuentes</span>
          </h2>
          <p className="font-body text-deep-navy/70 text-lg max-w-2xl mx-auto">
            Resolvemos tus dudas para que tomes la mejor decisión de inversión en San Carlos, Huancayo.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const questionId = `${componentId}-faq-question-${index}`;
            const answerId = `${componentId}-faq-answer-${index}`;

            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <h3 className="m-0">
                  <button
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="font-display font-bold text-deep-navy text-lg md:text-xl pr-8">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-primary text-white' : 'bg-surface-container-low text-primary'}`}
                    >
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                </h3>

                <motion.div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-6 pt-2 border-t border-black/5">
                    <p className="font-body text-deep-navy/70 leading-relaxed text-base md:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}