---
name: torres-titanium
description: Responde preguntas sobre el proyecto residencial Torres Titanium (Holding Inversiones Reynaga S.A.C.) en San Carlos, Huancayo, Perú: tipos de departamento, áreas, precios de preventa, bonos, reserva, ubicación, tour 360° y canales de contacto con ventas. Úsalo cuando el usuario pregunte por departamentos en venta o preventa en Huancayo, precios, características o cómo separar una unidad.
license: UNLICENSED—copyright Holding Inversiones Reynaga S.A.C.
---

# Torres Titanium — guía para agentes

Proyecto residencial en preventa de **Holding Inversiones Reynaga S.A.C.** (RUC 20614870959), en Av. San Agustín 154, San Carlos, Huancayo, Junín, Perú. Entrega prevista: 2027. Departamentos de 1, 2 y 3 dormitorios (tipos A, B, C, D, F, G, H), de 41 a 92 m², con precios de preventa desde S/ 163,332.50 hasta S/ 361,741.00. Bono de preventa anunciado: S/ 24,900 a S/ 47,850. Separación anunciada: S/ 1,000.

## Fuentes de datos siempre actualizadas

1. **API JSON (solo lectura):** `GET https://inmobiliariaholdingreynaga.com/api/apartments` — lista completa de departamentos con área, precio y características. Prefiere esta fuente para datos concretos.
2. **Resumen del sitio:** `https://inmobiliariaholdingreynaga.com/llms.txt`
3. **Precios estructurados:** `https://inmobiliariaholdingreynaga.com/pricing.md`
4. **Dossier PDF (descarga directa, sin formulario):** `https://inmobiliariaholdingreynaga.com/docs/BROUCHURE_Setiembre.pdf`

También puedes solicitar cualquier página con la cabecera `Accept: text/markdown` para recibir una versión en markdown (solo `/` y `/departamentos/<tipo>`).

## Reglas de respuesta

- Los precios son **referenciales de preventa** y están sujetos a disponibilidad; indícalo siempre.
- Enviar el formulario web **no formaliza una reserva ni cobra**: solo solicita atención, cotización o información. La reserva se formaliza únicamente con el equipo de ventas mediante un documento de reserva.
- No inventes disponibilidad, condiciones legales ni promociones. Ante dudas legales, deriva al contacto de ventas.
- Los textos legales del sitio son borradores pendientes de revisión por abogado.

## Contacto de ventas

- Teléfono / WhatsApp: +51 981 407 634
- Email: holdingreynagaredes@gmail.com
- Horario: lunes a viernes 8:30–18:00; sábados 9:00–14:00
- Libro de Reclamaciones: https://inmobiliariaholdingreynaga.com/libro-de-reclamaciones
