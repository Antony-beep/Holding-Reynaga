"use client";

import { useState } from "react";
import { Phone, Mail } from "lucide-react";

export default function DossierForm() {
  const [submitted, setSubmitted] = useState(false);

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
      className="py-24 bg-surface-container-highest relative z-10 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row bg-white rounded-md shadow-2xl overflow-hidden">
          {/* Left Side - Deep Navy */}
          <div className="lg:w-5/12 bg-deep-navy p-10 md:p-14 lg:p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-display font-black text-4xl lg:text-5xl text-primary mb-6 leading-[1.1] tracking-tighter">
                Inicia tu proceso de cotización hoy mismo.
              </h2>
              <p className="font-body text-white/90 text-lg leading-relaxed font-light">
                Nuestro equipo de asesores especializados se contactará contigo
                para brindarte toda la información que necesitas.
              </p>
            </div>

            <div className="mt-16 flex flex-col gap-6 font-body">
              <div className="flex items-center gap-4">
                <Phone className="text-primary w-5 h-5" />
                <a href="tel:+51981407634">
                  <span className="font-bold text-white text-lg tracking-wide">
                    +51 981 407 634
                  </span>
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-primary w-5 h-5" />
                <span className="font-bold text-white text-lg tracking-wide">
                  ventas@holdingreynaga.com
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-7/12 p-10 md:p-14 lg:p-16 bg-white">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="font-display font-bold text-deep-navy tracking-widest text-xs uppercase block mb-3"
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  placeholder="Juan Pérez"
                  className="w-full bg-surface-alt text-deep-navy font-body font-medium rounded-sm px-5 py-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-deep-navy/30"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="document"
                    className="font-display font-bold text-deep-navy tracking-widest text-xs uppercase block mb-3"
                  >
                    Documento (DNI/CE)
                  </label>
                  <input
                    type="text"
                    id="document"
                    name="document"
                    autoComplete="off"
                    maxLength={8}
                    pattern="[A-Za-z0-9]+"
                    title="Ingrese un número de documento válido (letras y números sin espacios)"
                    placeholder="00000000"
                    className="w-full bg-surface-alt text-deep-navy font-body font-medium rounded-sm px-5 py-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-deep-navy/30"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="font-display font-bold text-deep-navy tracking-widest text-xs uppercase block mb-3"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    maxLength={20}
                    pattern="[\d\s+\-]+"
                    title="Ingrese un número de teléfono válido"
                    placeholder="+51 999 999 999"
                    className="w-full bg-surface-alt text-deep-navy font-body font-medium rounded-sm px-5 py-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-deep-navy/30"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-display font-bold text-deep-navy tracking-widest text-xs uppercase block mb-3"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  maxLength={100}
                  placeholder="juan@ejemplo.com"
                  className="w-full bg-surface-alt text-deep-navy font-body font-medium rounded-sm px-5 py-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-deep-navy/30"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-primary text-white font-display font-bold tracking-widest text-sm uppercase px-8 py-5 rounded-sm mt-4 hover:bg-primary-container transition-colors shadow-lg disabled:opacity-70"
              >
                {submitted ? "Enviando..." : "Enviar Solicitud"}
              </button>

              <p className="text-center font-body text-[10px] text-deep-navy/50 uppercase tracking-widest mt-4">
                Tus datos están protegidos bajo nuestra política de privacidad.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
