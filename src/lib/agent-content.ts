import type { Apartment } from "@/data/apartments";
import { buildApartmentSlug } from "@/data/apartments";
import { SITE_URL } from "@/lib/site";

/**
 * Contenido servido a agentes de IA.
 * Fuente única para /llms.txt y para la negociación Accept: text/markdown.
 */
export const LLMS_MARKDOWN = `# Torres Titanium — Holding Inversiones Reynaga S.A.C.

> Proyecto residencial en preventa en San Carlos, Huancayo, Junín, Perú.
> Departamentos de 1, 2 y 3 dormitorios con entrega prevista para 2027.
> Bonos de preventa anunciados desde S/ 24,900 hasta S/ 47,850. Separación anunciada con S/ 1,000; consulta disponibilidad, vigencia y condiciones documentadas con ventas.
> Borrador de textos legales publicado el 2026-10-02, versión 2026-10-02.1, con pendientes [[REVISAR CON ABOGADO]].

## Quiénes somos

Holding Inversiones Reynaga S.A.C. (RUC 20614870959) es una inmobiliaria y constructora peruana con sede en Huancayo, Junín. Desarrollamos el proyecto Torres Titanium, ubicado en Av. San Agustín 154, San Carlos, Huancayo — a una cuadra de la Universidad Continental y del Colegio Zárate.

## Qué ofrecemos

- Departamentos en preventa de 1, 2 y 3 dormitorios
- 7 tipos de departamento (A, B, C, D, F, G, H) con áreas de 41 a 92 m²
- Precios desde S/ 163,332.50 hasta S/ 361,741.00
- Bonos de descuento de preventa anunciados: S/ 24,900 a S/ 47,850; régimen y condiciones de aplicación pendientes [[REVISAR CON ABOGADO]]

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

Se anuncia una separación con S/ 1,000. Enviar el formulario únicamente solicita atención, una cotización o información para una reserva: no formaliza una reserva, no firma un contrato ni realiza un cobro.

Para quienes no han formalizado una reserva, los precios publicados son referenciales y están sujetos a disponibilidad de la unidad y a las condiciones comerciales informadas antes de contratar. Quien complete la reserva según [[CONDICIONES DE RESERVA: monto, plazo, documento]] mantiene el precio indicado en su documento de reserva, durante la vigencia y bajo las condiciones expresamente acordadas en ese documento. No se modificarán unilateralmente las condiciones de una reserva ya formalizada. [[REVISAR CON ABOGADO]]

## Dossier público

El dossier PDF se descarga directamente, sin completar un formulario. La descarga no autoriza promociones de contacto ni cookies opcionales.

## Ubicación

- Dirección del proyecto: Av. San Agustín 154, San Carlos, Huancayo, Perú
- Domicilio legal: [[DOMICILIO LEGAL COMPLETO]] [[REVISAR CON ABOGADO]]. Las direcciones comerciales publicadas no acreditan el domicilio legal.
- Coordenadas: -12.047615, -75.200334

## Contacto

- Teléfono / WhatsApp: +51 981 407 634
- Horario de atención: lunes a viernes, 8:30 a. m.–6:00 p. m.; sábados, 9:00 a. m.–2:00 p. m.
- Email: holdingreynagaredes@gmail.com
- Libro de Reclamaciones: https://inmobiliariaholdingreynaga.com/libro-de-reclamaciones

## Enlaces clave

- [Página principal](https://inmobiliariaholdingreynaga.com/)
- [Catálogo de departamentos](https://inmobiliariaholdingreynaga.com/#departamentos)
- [Tour virtual 360°](https://inmobiliariaholdingreynaga.com/#recorrido)
- [Ubicación y mapa](https://inmobiliariaholdingreynaga.com/#ubicacion)
- [Dossier PDF público — descarga directa, sin formulario](https://inmobiliariaholdingreynaga.com/docs/BROUCHURE_Setiembre.pdf)
- [Términos y Condiciones — borrador](https://inmobiliariaholdingreynaga.com/terminos-y-condiciones)
- [Política de Privacidad — borrador 2026-10-02.1](https://inmobiliariaholdingreynaga.com/politica-de-privacidad)
- [Política de Cookies](https://inmobiliariaholdingreynaga.com/politica-de-privacidad#cookies)
- [Libro de Reclamaciones](https://inmobiliariaholdingreynaga.com/libro-de-reclamaciones)
- [Precios estructurados](https://inmobiliariaholdingreynaga.com/pricing.md)

## Redes sociales

- Instagram: https://www.instagram.com/holdingreynaga/
- Facebook: https://www.facebook.com/profile.php?id=61588196065630
- TikTok: https://www.tiktok.com/@inmobiliariaholding

## FAQ rápido

- **¿Cuándo se entrega?** Año 2027
- **¿Cómo consultar las condiciones de separación?** Contactar a ventas. Monto anunciado: S/ 1,000. La conservación del precio exige una reserva documentada, con vigencia y condiciones expresamente acordadas; enviar el formulario no reserva ni cobra. [[REVISAR CON ABOGADO]]
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
- **Precio de preventa:** ${apartment.price}
- **Estilo:** ${apartment.area}
${features ? `\n## Características\n${features}\n` : ""}
## Enlaces

- Página del departamento: ${SITE_URL}/departamentos/${slug}
- Tour virtual 360°: ${SITE_URL}/vision360/${tourId}

> Precio referencial de preventa, sujeto a disponibilidad de la unidad. Enviar el
> formulario web no formaliza una reserva ni realiza un cobro: solo solicita
> atención, cotización o información. Contacto: +51 981 407 634.
`;
}
