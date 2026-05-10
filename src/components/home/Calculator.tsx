"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Calculator() {
  const [price, setPrice] = useState(150000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(8.5);
  const [monthlyPayment, setMonthlyPayment] = useState(1182);

  // Derived values
  const downPayment = (price * downPaymentPercent) / 100;
  const loanAmount = price - downPayment;

  useEffect(() => {
    // Calculo de Cuota (Fórmula de amortización)
    // PMT = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const principal = loanAmount;
    const monthlyRate = rate / 100 / 12;
    const totalPayments = years * 12;

    if (principal > 0 && monthlyRate > 0 && totalPayments > 0) {
      const payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
      setMonthlyPayment(Math.round(payment));
    } else if (monthlyRate === 0 && totalPayments > 0) {
      setMonthlyPayment(Math.round(principal / totalPayments));
    } else {
      setMonthlyPayment(0);
    }
  }, [price, downPaymentPercent, years, rate, loanAmount]);

  return (
    <section className="py-24 bg-surface-alt relative z-10 flex justify-center px-4">
      <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Texts Left */}
        <div className="flex-1 w-full lg:max-w-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1.5 h-5 bg-primary"></div>
            <span className="font-display font-semibold text-primary tracking-[0.1em] text-sm uppercase">Planeación Inteligente</span>
          </div>
          
          <h2 className="text-display font-black text-5xl md:text-6xl text-deep-navy mb-8 leading-[1.05] tracking-tighter">
            Calculadora de <br />
            Financiamiento
          </h2>
          
          <p className="font-body text-deep-navy/70 text-xl md:text-2xl mb-10 leading-relaxed font-light">
            Visualiza tu inversión con claridad. Nuestra herramienta te permite estimar tus cuotas mensuales y planificar el futuro en tu nuevo hogar de manera precisa.
          </p>

          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
            <span className="font-display font-bold text-deep-navy">Tazas competitivas con bancos aliados</span>
          </div>
        </div>

        {/* Calculator Widget */}
        <div className="flex-1 w-full bg-white p-8 md:p-12 shadow-architectural rounded-2xl border border-surface-container-low max-w-xl mx-auto lg:mx-0">
          
          {/* Price Slider */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <label className="font-display font-bold text-deep-navy text-xs tracking-wider uppercase">Precio del Inmueble (USD)</label>
              <span className="font-display font-bold text-primary text-xl">${price.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="100000" max="400000" step="5000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-deep-navy"
            />
          </div>

          {/* Downpayment Slider */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <label className="font-display font-bold text-deep-navy text-xs tracking-wider uppercase">Cuota Inicial ({downPaymentPercent}%)</label>
              <span className="font-display font-bold text-primary text-xl">${downPayment.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="10" max="80" step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-deep-navy"
            />
          </div>

          {/* Setup Row */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div>
              <label className="font-display font-bold text-deep-navy text-xs tracking-wider uppercase block mb-3">Plazo (Años)</label>
              <div className="relative">
                <select 
                  value={years} 
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full bg-white border border-surface-container-highest text-deep-navy font-body font-medium rounded-md px-4 py-3 outline-none focus:border-primary appearance-none"
                >
                  <option value={10}>10 años</option>
                  <option value={15}>15 años</option>
                  <option value={20}>20 años</option>
                  <option value={25}>25 años</option>
                </select>
                {/* Custom chevron */}
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-deep-navy/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="font-display font-bold text-deep-navy text-xs tracking-wider uppercase block mb-3">Tasa (%)</label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full bg-white border border-surface-container-highest text-deep-navy font-body font-medium rounded-md px-4 py-3 outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <hr className="border-surface-container-low mb-8" />

          {/* Result */}
          <div className="text-center">
            <span className="font-display font-medium text-deep-navy/60 text-xs tracking-widest uppercase mb-2 block">Pago Mensual Estimado</span>
            <div className="font-display font-black text-deep-navy text-6xl md:text-7xl mb-2 tracking-tighter">
              ${monthlyPayment.toLocaleString()}
            </div>
            <span className="font-body text-xs text-deep-navy/50 italic">*Referencial sujeto a evaluación crediticia.</span>
          </div>

        </div>
      </div>
    </section>
  );
}
