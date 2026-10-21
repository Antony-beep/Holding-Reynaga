import type { Apartment } from "@/data/apartments";
import { buildApartmentSlug } from "@/data/apartments";
import { SITE_URL } from "@/lib/site";

/**
 * Contenido servido a agentes de IA.
 * Fuente única para /llms.txt y para la negociación Accept: text/markdown.
 */
export const LLMS_MARKDOWN = `# Torres Titanium — Holding Inversiones Reynaga S.A.C.

> Proyecto residencial en construcción en San Carlos, Huancayo, Junín, Perú.
> Departamentos de 1, 2 y 3 dormitorios con entrega prevista entre octubre y diciembre de 2027.
> Bonos de preventa: descuentos de S/ 24,900 a S/ 47,850, válidos del 01/10/2026 al 31/12/2026 o hasta agotar el stock promocional de 5 unidades; no canjeables por efectivo ni acumulables. Separación con S/ 1,000 que se imputa a la cuota inicial.
> Textos legales revisados con asesoría legal, versión 2026-10-18.1.

## Quiénes somos

Holding Inversiones Reynaga S.A.C. (RUC 20614870959) es una inmobiliaria y constructora peruana con sede en Huancayo, Junín. Desarrollamos el proyecto Torres Titanium, ubicado en Av. San Agustín 154, San Carlos, Huancayo — a una cuadra de la Universidad Continental y del Colegio Zárate.

## Qué ofrecemos

- Departamentos en construcción de 1, 2 y 3 dormitorios
- 7 tipos de departamento (A, B, C, D, F, G, H) con áreas de 41 a 92 m²
- Precios desde S/ 163,332.50 hasta S/ 361,741.00 (precio total al contado, IGV incluido; no incluyen gastos notariales ni registrales)
- Bonos de descuento de preventa: S/ 24,900 a S/ 47,850; válidos del 01/10/2026 al 31/12/2026 o hasta agotar el stock promocional de cinco (5) unidades; no canjeables por efectivo ni acumulables con otras promociones

- 2 sótanos de estacionamiento, 2 ascensores modernos
- Rooftop con parrillas, área de fogata, mirador, juegos para niños
- Recorridos virtuales 360° de los departamentos

## Datos para agentes (machine-readable)

- Catálogo JSON de departamentos (solo lectura): ${SITE_URL}/api/apartments
- Este mismo contenido: ${SITE_URL}/llms.txt (Content-Type: text/markdown)
- Cualquier página de departamento admite Accept: text/markdown

## Precios (actualizado setiembre 2026)

Ver /pricing.md para precios publicados estructurados y condiciones de reserva.

## Reservas y conservación del precio

Se anuncia una separación con S/ 1,000 para todos los tipos de departamento; el abono se imputa íntegramente a la cuota inicial (10% del valor del departamento) al suscribir el Contrato de Arras. La separación presencial congela el precio de lista vigente y retira la unidad del mercado por el plazo indicado en la Constancia de Separación. La devolución del monto de separación se rige por las condiciones expresamente previstas en la Constancia de Separación que se entrega al cliente antes de su pago. Enviar el formulario únicamente solicita atención, una cotización o información para una reserva: no formaliza una reserva, no firma un contrato ni realiza un cobro.

Para quienes no han formalizado una reserva, los precios publicados están sujetos a disponibilidad de la unidad. Quien complete la separación presencial mantiene el precio indicado en su Constancia de Separación, durante la vigencia y bajo las condiciones expresamente acordadas en ese documento. No se modificarán unilateralmente las condiciones de una reserva ya formalizada.

## Dossier público

El dossier PDF se descarga directamente, sin completar un formulario. La descarga no autoriza promociones de contacto ni cookies opcionales.

## Ubicación

- Dirección del proyecto: Av. San Agustín 154, San Carlos, Huancayo, Perú
- Domicilio legal: Jr. Lino Nro. 132, Huancayo Cercado (Oficina 401, a una cuadra del Parque Grau), Huancayo, Junín, Perú — domicilio fiscal confirmado en el RUC 20614870959. Las direcciones comerciales publicadas no acreditan el domicilio legal.
- Coordenadas: -12.047615, -75.200334

## Contacto

- Teléfono / WhatsApp: +51 981 407 634
- Horario de atención: lunes a sábado, 8:30 a. m.–1:30 p. m. y 3:00–6:30 p. m.
- Email: holdingreynagaredes@gmail.com
- Libro de Reclamaciones: https://inmobiliariaholdingreynaga.com/libro-de-reclamaciones

## Enlaces clave

- [Página principal](https://inmobiliariaholdingreynaga.com/)
- [Catálogo de departamentos](https://inmobiliariaholdingreynaga.com/#departamentos)
- [Tour virtual 360°](https://inmobiliariaholdingreynaga.com/#recorrido)
- [Ubicación y mapa](https://inmobiliariaholdingreynaga.com/#ubicacion)
- [Dossier PDF público — descarga directa, sin formulario](https://inmobiliariaholdingreynaga.com/docs/BROUCHURE_Setiembre.pdf)
- [Términos y Condiciones](https://inmobiliariaholdingreynaga.com/terminos-y-condiciones)
- [Política de Privacidad — versión 2026-10-18.1](https://inmobiliariaholdingreynaga.com/politica-de-privacidad)
- [Política de Cookies](https://inmobiliariaholdingreynaga.com/politica-de-privacidad#cookies)
- [Libro de Reclamaciones](https://inmobiliariaholdingreynaga.com/libro-de-reclamaciones)
- [Precios estructurados](https://inmobiliariaholdingreynaga.com/pricing.md)

## Redes sociales

- Instagram: https://www.instagram.com/holdingreynaga/
- Facebook: https://www.facebook.com/profile.php?id=61588196065630
- TikTok: https://www.tiktok.com/@inmobiliariaholding

## FAQ rápido

- **¿Cuándo se entrega?** Entre octubre y diciembre de 2027
- **¿Cómo funciona la separación?** S/ 1,000 para todos los tipos; congela el precio y retira la unidad del mercado. Se firma una Constancia de Separación con precio, monto, número, área y fecha; el abono se imputa al Contrato de Arras. La devolución se rige por la Constancia entregada antes del pago. Enviar el formulario web no reserva ni cobra.
- **¿Los precios incluyen IGV?** Sí: los precios publicados son el precio total al contado con IGV incluido; no incluyen gastos notariales ni registrales. El estacionamiento se vende aparte, al contado.
- **¿Dónde está ubicado?** Av. San Agustín 154, San Carlos, Huancayo
- **¿Cuántos dormitorios tienen?** 1, 2 o 3 dormitorios según el tipo
- **¿Tienen estacionamiento?** Sí, 2 sótanos de estacionamiento
`;

export function apartmentMarkdown(apartment: Apartment): string {
  const slug = buildApartmentSlug(apartment);
  const tourId = apartment.type.replace("Tipo ", "").toLowerCase();
  const features = apartment.features.length
    ? `\n${apartment.features.map((f) => `- ${f}`).join("\n")}`
    : "";

  return `# ${apartment.type} — Torres Titanium

- **Dormitorios:** ${apartment.bedrooms}
- **Baños:** ${apartment.baths}
- **Área:** ${apartment.sqm} m²
- **Precio publicado:** ${apartment.price}
- **Estilo:** ${apartment.area}
${features ? `\n## Características\n${features}\n` : ""}
## Enlaces

- Página del departamento: ${SITE_URL}/departamentos/${slug}
- Tour virtual 360°: ${SITE_URL}/vision360/${tourId}

> Precio total al contado publicado con IGV incluido, sujeto a disponibilidad de la unidad. Enviar el
> formulario web no formaliza una reserva ni realiza un cobro: solo solicita
> atención, cotización o información. Contacto: +51 981 407 634.
`;
}
