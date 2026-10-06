export type GuideSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type Guide = {
  slug: string;
  h1: string;
  metaTitle: string;
  description: string;
  intro: string;
  datePublished: string;
  dateModified: string;
  sections: GuideSection[];
  related: { label: string; href: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "cuanto-cuesta-un-departamento-en-huancayo",
    h1: "¿Cuánto cuesta un departamento en Huancayo?",
    metaTitle: "¿Cuánto cuesta un departamento en Huancayo? Precios reales 2026",
    description:
      "Precios reales de departamentos en Huancayo: qué cuesta cada tipología en Torres Titanium (San Carlos), el precio por m², los bonos de preventa y los pasos para pagar.",
    intro:
      "La respuesta corta, con datos del proyecto Torres Titanium en San Carlos: los precios publicados van desde S/ 163,332.50 por un departamento de 1 dormitorio hasta S/ 361,741.00 por uno de 3 dormitorios de 91.58 m². En esta guía desglosamos cada opción, el precio por metro cuadrado y los factores que explican las diferencias.",
    datePublished: "2026-10-03",
    dateModified: "2026-10-03",
    sections: [
      {
        heading: "Precios de departamentos en Torres Titanium (San Carlos, Huancayo)",
        paragraphs: [
          "Estos son los precios de preventa publicados del proyecto, con las superficies y distribución de cada tipología:",
        ],
        list: [
          "Tipo G — 1 dormitorio, 1 baño, 41.35 m²: S/ 163,332.50",
          "Tipo D — 2 dormitorios, 2 baños, 65.26 m²: S/ 257,777.00",
          "Tipo C — 3 dormitorios, 1 baño, 72.57 m²: S/ 286,651.50",
          "Tipo B — 2 dormitorios, 2 baños, 77.77 m²: S/ 307,191.50",
          "Tipo A — 3 dormitorios, 2 baños, 91.58 m²: S/ 361,741.00",
        ],
      },
      {
        heading: "Precio por metro cuadrado en Huancayo",
        paragraphs: [
          "Con los precios publicados de Torres Titanium, el precio por m² ronda S/ 3,950 en todas las tipologías. Es decir, la diferencia de precio entre modelos corresponde casi por completo a la superficie y a la distribución, no a calidades distintas: todos comparten acabados de primera e iluminación natural.",
          "Al comparar con otros proyectos de Huancayo, conviene fijarse en ese indicador (precio total ÷ m²) y en qué incluye: estacionamiento, baños completos, lavandería propia o balcón. Dos departamentos del mismo precio pueden tener valores muy distintos según lo que incluyen.",
        ],
      },
      {
        heading: "Qué factores cambian el precio de un departamento",
        paragraphs: [
          "Más allá del proyecto específico, cuatro factores concentran casi toda la variación de precios en Huancayo:",
        ],
        list: [
          "La zona: San Carlos es residencial y bien conectada con universidades y el centro; el Cercado concentra comercio.",
          "La superficie y el número de dormitorios y baños: cada m² adicional suma, y un segundo baño completo marca diferencia en la vida diaria.",
          "Si el edificio es nuevo o usado: los proyectos en preventa como Torres Titanium parten de precio publicado y congelan ese precio al separar.",
          "Las amenidades incluidas: estacionamientos en sótanos, ascensores, rooftop o área de parrillas suman valor de uso real.",
        ],
      },
      {
        heading: "Bonos de preventa y forma de pago",
        paragraphs: [
          "Durante la preventa, Torres Titanium publica bonos de S/ 24,900 a S/ 47,850. Su vigencia, requisitos y aplicación sobre el precio se confirman con el equipo de ventas, porque cambian con el avance de las ventas.",
          "El acceso al proyecto es concreto: la separación se realiza con S/ 1,000 para todos los tipos de departamento, congela el precio vigente y se complementa con un cronograma de pago del 10% del valor, acorde a los ingresos mensuales del cliente. El resto se coordina en la etapa notarial y con las opciones de financiamiento disponibles.",
        ],
      },
      {
        heading: "Gastos adicionales al precio del departamento",
        paragraphs: [
          "Además del precio de venta, al comprar un departamento en Perú se presentan gastos notariales, de registro y, según el caso, comisiones o seguros vinculados al financiamiento. Cada caso es distinto, así que la recomendación es pedir al equipo de ventas el detalle completo de costos antes de separar, y revisar con el notario qué documentos y gastos aplican a tu operación.",
        ],
      },
    ],
    related: [
      { label: "Departamentos en San Carlos, Huancayo", href: "/departamentos-en-san-carlos-huancayo" },
      { label: "Departamentos de 3 dormitorios en Huancayo", href: "/departamentos-3-dormitorios-huancayo" },
      { label: "Cómo funciona la separación de un departamento", href: "/guias/como-funciona-la-separacion-de-un-departamento" },
    ],
  },
  {
    slug: "conviene-comprar-un-departamento-en-preventa-en-huancayo",
    h1: "¿Conviene comprar un departamento en preventa en Huancayo?",
    metaTitle: "¿Conviene comprar en preventa en Huancayo? Análisis honesto",
    description:
      "Ventajas y riesgos de comprar un departamento en preventa en Huancayo: precios congelados, bonos, plazos de entrega y qué revisar antes de separar con S/ 1,000.",
    intro:
      "Comprar en preventa significa adquirir tu departamento mientras el edificio aún se construye. En Huancayo esta modalidad creció con proyectos como Torres Titanium (San Carlos), donde la separación se realiza con S/ 1,000. ¿Conviene? Depende de qué tan bien evalúes tres cosas: precio, plazo y desarrollador. Esta guía resume ambas caras sin adornos.",
    datePublished: "2026-10-03",
    dateModified: "2026-10-03",
    sections: [
      {
        heading: "Qué ganas comprando en preventa",
        paragraphs: [
          "Las ventajas de la preventa son reales y mensurables cuando el proyecto las documenta por escrito:",
        ],
        list: [
          "Precio congelado: al separar, el precio vigente queda fijo aunque las ventas posteriores se hagan a un precio mayor.",
          "Bonos de preventa: en Torres Titanium van de S/ 24,900 a S/ 47,850 según la tipología y la campaña vigente.",
          "Mejor elección de unidad: con el edificio en construcción puedes elegir piso, orientación y tipología con la disponibilidad completa.",
          "Departamento nuevo: acabados de primera, instalaciones nuevas y la posibilidad de personalizar detalles según la etapa.",
        ],
      },
      {
        heading: "Qué debes revisar antes de separar",
        paragraphs: [
          "La preventa también implica esperar y confiar en el desarrollador. Antes de separar tu departamento conviene verificar:",
        ],
        list: [
          "La fecha de entrega y qué pasa si se retrasa: pídela por escrito y pregunta cómo se documenta.",
          "Quién respalda el proyecto: razón social, RUC y dónde atiende la empresa. Torres Titanium es desarrollado por Holding Inversiones Reynaga S.A.C. (RUC 20614870959), con punto de atención en Av. San Agustín 154, San Carlos.",
          "Los términos de la separación: monto, si congelan el precio, cómo se arma el cronograma de pago y en qué casos se pierde el congelamiento.",
          "Los planos y especificaciones: revisa superficies, distribución y acabados prometidos antes de decidir.",
          "El camino al contrato notarial: qué documento firmas al separar y cuál será el contrato definitivo.",
        ],
      },
      {
        heading: "Cómo funciona en Torres Titanium",
        paragraphs: [
          "El proceso del proyecto es transparente: la separación cuesta S/ 1,000 para todos los tipos de departamento; al separar, el precio se congela y la unidad se retira de la oferta a otros clientes. Se firma una Constancia de Separación que indica el precio de venta, el monto de separación, el número de departamento, el área y la fecha.",
          "Después se elabora un cronograma de pago del 10% del valor del departamento, acorde a los ingresos mensuales del cliente. El congelamiento del precio culmina si el cliente incumple reiteradamente el cronograma o desiste voluntariamente, y la devolución del monto de separación se rige por las cláusulas del contrato notarial.",
        ],
      },
      {
        heading: "Conclusión: ¿sí o no?",
        paragraphs: [
          "La preventa conviene si tu prioridad es precio y elección de unidad, y si el proyecto documenta por escrito sus reglas: precio congelado, bonos, cronograma y fecha de entrega. No conviene si necesitas mudarte de inmediato o si el desarrollador no responde con claridad las preguntas de esta guía.",
          "Si decides avanzar, el primer paso es simple y de bajo riesgo: separar con S/ 1,000 y firmar la Constancia de Separación con las condiciones congeladas.",
        ],
      },
    ],
    related: [
      { label: "Cómo funciona la separación de un departamento", href: "/guias/como-funciona-la-separacion-de-un-departamento" },
      { label: "Departamentos en Huancayo", href: "/departamentos-en-huancayo" },
      { label: "Conoce a Holding Reynaga", href: "/nosotros" },
    ],
  },
  {
    slug: "como-funciona-la-separacion-de-un-departamento",
    h1: "Cómo funciona la separación de un departamento",
    metaTitle: "Cómo funciona la separación de un departamento con S/ 1,000",
    description:
      "Guía paso a paso de la separación de un departamento en Torres Titanium, Huancayo: S/ 1,000, precio congelado, Constancia de Separación, cronograma del 10% y etapa notarial.",
    intro:
      "Separar un departamento es el primer paso formal para comprarlo: reservas la unidad en tu nombre mientras defines el financiamiento. En Torres Titanium (San Carlos, Huancayo) la separación cuesta S/ 1,000 para todos los tipos de departamento. Aquí explicamos el proceso completo, qué documentos recibes y qué compromisos asumes.",
    datePublished: "2026-10-03",
    dateModified: "2026-10-03",
    sections: [
      {
        heading: "Qué significa separar un departamento",
        paragraphs: [
          "Al separar, la unidad elegida se retira de la oferta a otros clientes y el precio vigente queda congelado para ti. Es un compromiso comercial documentado — no un cobro del departamento — y en el caso de Torres Titanium aplica a todos los tipos por igual: S/ 1,000.",
          "Importante: enviar el formulario de cotización en la web solo solicita atención del equipo de ventas. No formaliza una reserva ni realiza cobros; la separación solo existe cuando se paga el monto y se firma la Constancia.",
        ],
      },
      {
        heading: "Los documentos que recibes al separar",
        paragraphs: [
          "El documento central es la Constancia de Separación del Departamento. En ella se indica por escrito:",
        ],
        list: [
          "El precio de venta congelado de tu unidad",
          "El monto de separación pagado (S/ 1,000)",
          "El número de departamento separado",
          "El área de la unidad",
          "La fecha de separación",
        ],
      },
      {
        heading: "El cronograma de pago del 10%",
        paragraphs: [
          "Después de separar, se elabora un cronograma de pago del 10% del valor del departamento, acorde a tus ingresos mensuales. Este cronograma es personal: se negocia con ventas para que las cuotas sean sostenibles con tu flujo real.",
          "Ten presente las reglas del congelamiento: inicia con la separación y culmina si el cliente incumple reiteradamente el cronograma de pago o desiste voluntariamente de la compra. La devolución del monto de separación, si corresponde, se rige por las cláusulas del contrato notarial.",
        ],
      },
      {
        heading: "Qué viene después de la separación",
        paragraphs: [
          "Con la unidad separada y el cronograma en marcha, el proceso continúa hacia el contrato de compraventa ante notario, donde se formalizan las condiciones definitivas de la compra, el financiamiento (banco, caja o efectivo) y los plazos de entrega. El equipo de ventas acompaña cada etapa e indica los documentos necesarios.",
        ],
      },
      {
        heading: "Preguntas clave antes de separar",
        paragraphs: [
          "Antes de pagar los S/ 1,000, verifica con el asesor:",
        ],
        list: [
          "La disponibilidad real de la tipología y piso que te interesan",
          "El precio publicado vigente y el bono de preventa aplicable",
          "Tu cronograma estimado del 10% según tus ingresos",
          "La fecha de entrega prevista del proyecto (Torres Titanium: 2027)",
          "Qué dice la Constancia de Separación que vas a firmar",
        ],
      },
    ],
    related: [
      { label: "Departamentos en San Carlos, Huancayo", href: "/departamentos-en-san-carlos-huancayo" },
      { label: "¿Conviene comprar en preventa en Huancayo?", href: "/guias/conviene-comprar-un-departamento-en-preventa-en-huancayo" },
      { label: "Contacto y visitas", href: "/contacto" },
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}
