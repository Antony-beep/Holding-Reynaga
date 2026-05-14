"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "¿Dónde está ubicado el proyecto Torres Titanium?",
    answer: "Torres Titanium está estratégicamente ubicado en la Av. San Agustín 154, San Carlos, Huancayo, Junín. Una zona de alta plusvalía que brinda una conexión inigualable a las instituciones de mayor prestigio como la Universidad Continental y UPLA.",
  },
  {
    question: "¿Cuáles son los precios de preventa y cómo puedo separar mi departamento?",
    answer: "Actualmente contamos con precios exclusivos de preventa desde S/ 268,509.00 hasta S/ 348,004.00, dependiendo del tipo y tamaño del departamento. Puedes asegurar el tuyo y congelar el precio separándolo con solo S/ 1,000.",
  },
  {
    question: "¿Qué tipos de departamentos ofrecen y de cuántos dormitorios?",
    answer: "Ofrecemos departamentos flat y dúplex diseñados para brindar la máxima comodidad y elegancia. Contamos con distribuciones optimizadas que incluyen opciones de 1, 2 y 3 dormitorios, ideales tanto para familias como para inversión.",
  },
  {
    question: "¿Cuándo es la fecha de entrega del proyecto?",
    answer: "La entrega de los departamentos de Torres Titanium está programada para el año 2027. Actualmente nos encontramos en fase de preventa, lo que representa la mejor oportunidad de inversión por la alta plusvalía asegurada.",
  },
  {
    question: "¿Cómo puedo contactarme para recibir más información o agendar una cita?",
    answer: "Puedes comunicarte directamente con nosotros llamando o escribiendo al WhatsApp al 981407634. Nuestro equipo de asesores de Holding Reynaga estará encantado de brindarte toda la información detallada y acompañarte en el proceso.",
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-display font-bold text-deep-navy text-lg md:text-xl pr-8">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${openIndex === index ? 'bg-primary text-white' : 'bg-surface-container-low text-primary'}`}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-6 pt-2 border-t border-black/5">
                      <p className="font-body text-deep-navy/70 leading-relaxed text-base md:text-lg">
                        {faq.answer}
                      </p>
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
