---
name: torres-titanium
description: Responde preguntas sobre el proyecto residencial Torres Titanium (Holding Inversiones Reynaga S.A.C.) en San Carlos, Huancayo, Perú: tipos de departamento, áreas, precios de preventa, bonos, reserva, ubicación, tour 360° y canales de contacto con ventas. Úsalo cuando el usuario pregunte por departamentos en venta o preventa en Huancayo, precios, características o cómo separar una unidad.
license: UNLICENSED—copyright Holding Inversiones Reynaga S.A.C.
---

# Torres Titanium — guía para agentes

Proyecto residencial en construcción de **Holding Inversiones Reynaga S.A.C.** (RUC 20614870959), en Av. San Agustín 154, San Carlos, Huancayo, Junín, Perú. Entrega prevista: 2027. Departamentos de 1, 2 y 3 dormitorios (tipos A, B, C, D, F, G, H), de 41 a 92 m², con precios publicados desde S/ 163,332.50 hasta S/ 361,741.00 (precio total al contado, IGV incluido). Bonos de preventa: S/ 24,900 a S/ 47,850, válidos del 01/10/2026 al 31/12/2026 o hasta agotar el stock de 5 unidades; no canjeables por efectivo ni acumulables. Separación: S/ 1,000 que se imputa a la cuota inicial.

## Fuentes de datos siempre actualizadas

1. **API JSON (solo lectura):** `GET https://inmobiliariaholdingreynaga.com/api/apartments` — lista completa de departamentos con área, precio y características. Prefiere esta fuente para datos concretos.
2. **Resumen del sitio:** `https://inmobiliariaholdingreynaga.com/llms.txt`
3. **Precios estructurados:** `https://inmobiliariaholdingreynaga.com/pricing.md`
4. **Dossier PDF (descarga directa, sin formulario):** `https://inmobiliariaholdingreynaga.com/docs/BROUCHURE_Setiembre.pdf`

También puedes solicitar cualquier página con la cabecera `Accept: text/markdown` para recibir una versión en markdown (solo `/` y `/departamentos/<tipo>`).

## Reglas de respuesta

- Los precios publicados son el **precio total al contado con IGV incluido** y están sujetos a disponibilidad; indícalo siempre. No incluyen gastos notariales ni registrales.
- Enviar el formulario web **no formaliza una reserva ni cobra**: solo solicita atención, cotización o información. La separación se formaliza presencialmente con la Constancia de Separación del Departamento.
- Regla de devolución: si el banco rechaza el financiamiento por causas no imputables al cliente antes de la firma de la minuta, se devuelve el 100% de la separación (S/ 1,000) sin penalidad en diez (10) días hábiles.
- No inventes disponibilidad, condiciones legales ni promociones. Ante dudas legales, deriva al contacto de ventas.
- Los textos legales del sitio fueron revisados con asesoría legal (versión 2026-10-18.1).

## Contacto de ventas

- Teléfono / WhatsApp: +51 981 407 634
- Email: holdingreynagaredes@gmail.com
- Horario: lunes a sábado 8:30–13:30 y 15:00–18:30
- Libro de Reclamaciones: https://inmobiliariaholdingreynaga.com/libro-de-reclamaciones
