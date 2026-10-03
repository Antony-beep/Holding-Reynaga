import { RESERVATION_PRICE_CLAUSE } from "@/lib/privacy";

export const FAQS = [
  {
    question: "¿Dónde está ubicado el proyecto Torres Titanium?",
    answer:
      "Torres Titanium está ubicado en Av. San Agustín 154, en San Carlos, Huancayo, Junín. Desde el proyecto hay conexiones a lugares como la Universidad Continental, UPLA, Parque Grau y centros comerciales de Huancayo.",
  },
  {
    question: "¿Cómo funciona la separación de S/ 1,000?",
    answer:
      `La separación aplica a todos los tipos de departamento. Al pagar S/ 1,000: el precio vigente queda congelado, la unidad se retira de la oferta a otros clientes, y se firma una Constancia de Separación del Departamento que indica el precio, el monto de separación, el número de departamento, el área y la fecha. Se elabora un cronograma de pago del 10% del valor, acorde a tus ingresos mensuales. El congelamiento termina si incumples reiteradamente el cronograma o desistes voluntariamente. La devolución del monto se rige por las cláusulas del contrato notarial. No hay cargos adicionales. ${RESERVATION_PRICE_CLAUSE}`,
  },
  {
    question: "¿Cuánto cuestan los departamentos y qué bonos de preventa hay?",
    answer:
      `Los precios publicados van desde S/ 163,332.50 hasta S/ 361,741.00, según la tipología y sus características. Los bonos de preventa publicados van de S/ 24,900 a S/ 47,850; consulta disponibilidad, vigencia y aplicación con ventas. Enviar el formulario solo solicita atención: no formaliza una reserva ni realiza cobros. ${RESERVATION_PRICE_CLAUSE}`,
  },
  {
    question: "¿Qué tipos de departamentos y cuántos dormitorios ofrecen?",
    answer:
      "Torres Titanium presenta siete tipologías: A, B, C, D, F, G y H. Los modelos publicados incluyen opciones de 1, 2 y 3 dormitorios. Algunas tipologías figuran como próximamente; consulta al equipo de ventas cuáles están disponibles.",
  },
  {
    question: "¿Cuándo está prevista la entrega de Torres Titanium?",
    answer:
      "La entrega del proyecto está prevista para 2027. La fecha y las condiciones aplicables a cada unidad deben confirmarse con el equipo de ventas.",
  },
  {
    question: "¿El edificio tiene cocheras para los residentes?",
    answer:
      "Sí. El edificio cuenta con estacionamientos en el mismo inmueble para residentes. Consulta con ventas la disponibilidad, asignación y condiciones de cada cochera.",
  },
  {
    question: "¿Hay opciones de financiamiento para comprar un departamento?",
    answer:
      "Sí, hay opciones de financiamiento. Un asesor de ventas puede informarte sobre las alternativas, requisitos y condiciones vigentes para cada departamento.",
  },
  {
    question: "¿Cómo puedo pedir información o agendar una visita?",
    answer:
      "Puedes llamar o escribir por WhatsApp al +51 981 407 634, o visitar el punto de atención en Av. San Agustín 154, San Carlos, Huancayo. El equipo de Holding Reynaga puede compartirte el dossier y coordinar una visita.",
  },
  {
    question: "¿Cuál es el horario de atención de Holding Reynaga?",
    answer:
      "Atendemos de lunes a viernes de 8:30 a. m. a 6:00 p. m. y los sábados de 9:00 a. m. a 2:00 p. m. Puedes visitarnos en Av. San Agustín 154, San Carlos, Huancayo, o llamar al +51 981 407 634.",
  },
  {
    question: "¿Cuál es la diferencia entre la dirección de atención y la dirección fiscal?",
    answer:
      "El punto de atención está en Av. San Agustín 154, San Carlos, Huancayo. El domicilio fiscal de HOLDING INVERSIONES REYNAGA S.A.C. (RUC 20614870959) está en Jr. Lino Nro. 132, Huancayo Cercado, oficina 401, a una cuadra del Parque Grau.",
  },
] as const;
