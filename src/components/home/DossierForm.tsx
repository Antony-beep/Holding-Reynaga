"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Phone, Mail, ShieldCheck, Clock, Lock, 
  User, CreditCard, Building2, MessageSquare, 
  Headphones, Calendar, MessageCircle, ArrowRight
} from "lucide-react";

export default function DossierForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    document: "",
    phone: "",
    email: "",
    interest: "",
    message: "",
    privacy: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simular evento
    setTimeout(() => {
      setSubmitted(false);
      alert(
        "Solicitud enviada exitosamente. Un asesor se comunicará con usted en breve.",
      );
    }, 1500);
  };

  return (
    <section
      id="reserva"
      className="py-16 md:py-24 bg-surface relative z-10 px-4 md:px-6"
    >
      <div className="container mx-auto max-w-[1100px]">
        {/* Main Card */}
        <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-architectural border border-surface-container-highest overflow-hidden">
          
          {/* Left Side - Deep Navy */}
          <div className="lg:w-5/12 bg-deep-navy p-10 md:p-14 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-4 bg-[#D4AF37] rounded-sm"></div>
                <span className="font-display font-bold text-[#D4AF37] tracking-[0.15em] text-[10px] md:text-xs uppercase">
                  Contáctanos
                </span>
              </div>
              <h2 className="text-display font-black text-4xl lg:text-5xl text-white mb-6 leading-[1.1] tracking-tighter">
                Inicia tu proceso de <span className="text-[#D4AF37]">cotización</span> hoy mismo.
              </h2>
              <p className="font-body text-white/80 text-sm md:text-base leading-relaxed font-light">
                Nuestro equipo de asesores especializados se contactará contigo
                para brindarte toda la información que necesitas.
              </p>
            </div>

            <div className="flex flex-col gap-8 relative z-10 mt-auto">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-white/5 shrink-0">
                  <ShieldCheck className="text-[#D4AF37] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Asesoría especializada</h4>
                  <p className="text-white/60 text-xs leading-relaxed">Atención personalizada en cada etapa de tu proyecto.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-white/5 shrink-0">
                  <Clock className="text-[#D4AF37] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Respuesta rápida</h4>
                  <p className="text-white/60 text-xs leading-relaxed">Nos comprometemos a responder tu solicitud en menos de 24 horas.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-white/5 shrink-0">
                  <Lock className="text-[#D4AF37] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Información segura</h4>
                  <p className="text-white/60 text-xs leading-relaxed">Tus datos están protegidos bajo nuestra política de privacidad.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-7/12 p-8 md:p-12 lg:p-14 bg-white flex flex-col justify-center">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              
              {/* Nombre Completo */}
              <div>
                <label htmlFor="name" className="font-display font-bold text-deep-navy/80 tracking-widest text-[10px] uppercase block mb-2">
                  Nombre Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-[18px] w-[18px] text-deep-navy/40" />
                  </div>
                  <input
                    type="text" id="name" name="name" placeholder="Ej. Juan Pérez" required
                    value={formData.name}
                    onChange={handleChange}
                    minLength={3}
                    maxLength={80}
                    pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
                    title="El nombre solo debe contener letras y espacios"
                    className="w-full bg-surface-container-lowest border border-surface-container-highest text-deep-navy font-body font-medium rounded-xl pl-11 pr-5 py-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-deep-navy/30 shadow-sm text-sm"
                  />
                </div>
              </div>

              {/* DNI & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="document" className="font-display font-bold text-deep-navy/80 tracking-widest text-[10px] uppercase block mb-2">
                    Documento (DNI/CE)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <CreditCard className="h-[18px] w-[18px] text-deep-navy/40" />
                    </div>
                    <input
                      type="text" id="document" name="document" placeholder="00000000" required
                      value={formData.document}
                      onChange={handleChange}
                      minLength={8}
                      maxLength={8}
                      pattern="^[0-9]+$"
                      title="El DNI debe contener exactamente 8 números"
                      className="w-full bg-surface-container-lowest border border-surface-container-highest text-deep-navy font-body font-medium rounded-xl pl-11 pr-5 py-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-deep-navy/30 shadow-sm text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="font-display font-bold text-deep-navy/80 tracking-widest text-[10px] uppercase block mb-2">
                    Teléfono
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-[18px] w-[18px] text-deep-navy/40" />
                    </div>
                    <input
                      type="tel" id="phone" name="phone" placeholder="+51 999 999 999" required
                      value={formData.phone}
                      onChange={handleChange}
                      minLength={9}
                      maxLength={15}
                      pattern="^\+?[0-9\s\-]{9,}$"
                      title="Ingresa un número de teléfono válido (mínimo 9 dígitos)"
                      className="w-full bg-surface-container-lowest border border-surface-container-highest text-deep-navy font-body font-medium rounded-xl pl-11 pr-5 py-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-deep-navy/30 shadow-sm text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="font-display font-bold text-deep-navy/80 tracking-widest text-[10px] uppercase block mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-[18px] w-[18px] text-deep-navy/40" />
                  </div>
                  <input
                    type="email" id="email" name="email" placeholder="juan@ejemplo.com" required
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={100}
                    className="w-full bg-surface-container-lowest border border-surface-container-highest text-deep-navy font-body font-medium rounded-xl pl-11 pr-5 py-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-deep-navy/30 shadow-sm text-sm"
                  />
                </div>
              </div>

              {/* Tipo de Interés */}
              <div>
                <label htmlFor="interest" className="font-display font-bold text-deep-navy/80 tracking-widest text-[10px] uppercase block mb-2">
                  Tipo de Interés
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Building2 className="h-[18px] w-[18px] text-deep-navy/40" />
                  </div>
                  <select
                    id="interest" name="interest" required
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-surface-container-lowest border border-surface-container-highest text-deep-navy font-body font-medium rounded-xl pl-11 pr-5 py-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none shadow-sm text-sm"
                  >
                    <option value="" disabled className="text-deep-navy/40">Selecciona una opción</option>
                    <option value="1">1 Dormitorio</option>
                    <option value="2">2 Dormitorios</option>
                    <option value="3">3 Dormitorios</option>
                    <option value="inv">Inversión</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-deep-navy/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="message" className="font-display font-bold text-deep-navy/80 tracking-widest text-[10px] uppercase block mb-2">
                  Mensaje (Opcional)
                </label>
                <div className="relative">
                  <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                    <MessageSquare className="h-[18px] w-[18px] text-deep-navy/40" />
                  </div>
                  <textarea
                    id="message" name="message" placeholder="Cuéntanos más sobre tu proyecto..."
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={300}
                    className="w-full bg-surface-container-lowest border border-surface-container-highest text-deep-navy font-body font-medium rounded-xl pl-11 pr-5 py-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-deep-navy/30 shadow-sm min-h-[90px] resize-none text-sm"
                  ></textarea>
                  <div className="absolute bottom-3 right-4">
                    <span className="text-[10px] text-deep-navy/30">{formData.message.length}/300</span>
                  </div>
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-3 mt-1">
                <input 
                  type="checkbox" id="privacy" name="privacy" required 
                  checked={formData.privacy}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded border-surface-container-highest text-[#B8860B] focus:ring-[#B8860B]/20" 
                />
                <label htmlFor="privacy" className="text-xs text-deep-navy/60 leading-relaxed font-medium">
                  Acepto los <Link href="/terminos-y-condiciones" className="text-[#B8860B] hover:underline font-bold">Términos y Condiciones</Link> y la <Link href="/terminos-y-condiciones#privacidad" className="text-[#B8860B] hover:underline font-bold">Política de Privacidad</Link>.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-[#B8860B] hover:bg-[#996515] text-white font-display font-bold tracking-widest text-xs uppercase px-6 py-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-3 mt-1 disabled:opacity-70"
              >
                {submitted ? "Enviando..." : "Enviar Solicitud"}
                {!submitted && <ArrowRight className="w-[18px] h-[18px]" />}
              </button>

              <div className="flex items-center justify-center gap-2 mt-1">
                <Lock className="w-3 h-3 text-deep-navy/40" />
                <p className="text-[10px] text-deep-navy/50 font-medium">
                  Tus datos están protegidos bajo nuestra <span className="text-[#B8860B] font-bold">política de privacidad</span>.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar Container */}
        <div className="mt-8 bg-[#fdfdfd] border border-surface-container-highest rounded-2xl flex flex-col md:flex-row items-center justify-between divide-y md:divide-y-0 md:divide-x divide-surface-container-highest shadow-sm">
          
          <a href="tel:+51981407634" className="flex-1 flex items-center justify-center gap-4 p-6 w-full hover:bg-black/5 transition-colors rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none group">
            <Headphones className="text-[#D4AF37] w-7 h-7 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-deep-navy font-bold text-sm">¿Prefieres hablar?</p>
              <p className="text-deep-navy/60 text-sm">+51 981 407 634</p>
            </div>
          </a>

          <a href="#contacto" className="flex-1 flex items-center justify-center gap-4 p-6 w-full hover:bg-black/5 transition-colors group">
            <Calendar className="text-[#D4AF37] w-7 h-7 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-deep-navy font-bold text-sm">Agenda una reunión</p>
              <p className="text-deep-navy/60 text-sm">Coordinemos una cita</p>
            </div>
          </a>

          <a href="https://wa.me/51981407634" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-4 p-6 w-full hover:bg-black/5 transition-colors rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none group">
            <MessageCircle className="text-[#D4AF37] w-7 h-7 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-deep-navy font-bold text-sm">Escríbenos por WhatsApp</p>
              <p className="text-deep-navy/60 text-sm">Respuesta inmediata</p>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}
