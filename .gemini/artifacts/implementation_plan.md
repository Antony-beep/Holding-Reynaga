# Optimización SEO, WPO y Estructura Semántica para Torres Titanium

Este plan aborda las optimizaciones requeridas para lograr el dominio en SEO local y visibilidad en LLMs (ChatGPT/Claude), siguiendo estrictamente las directrices indicadas para el proyecto Torres Titanium de Holding Reynaga.

## Open Questions

> [!WARNING]  
> **Sección de Preguntas Frecuentes (FAQ):** He notado que actualmente no existe un componente visual de FAQ en la web. Para inyectar el Schema de `FAQPage`, es altamente recomendable (y exigido por las políticas de Google) que las preguntas y respuestas también sean visibles para el usuario. ¿Deseas que agregue una nueva sección visual de FAQ cerca del final de la página, o simplemente inyectamos el JSON-LD de forma invisible (con el riesgo de que Google lo ignore por no ser contenido visible)?

> [!NOTE]  
> **Estructura de URLs Anti-Canibalización:** Actualmente la web parece funcionar como una Single Page Application (SPA) donde todo el contenido está en `page.tsx` usando anclas (ej. `#departamentos`). ¿Deseas migrar el catálogo a páginas individuales (ej. `/departamentos-en-venta/tipo-c-huancayo`) o mantenemos el formato SPA asegurando que no haya páginas fantasma (que es la mejor forma de evitar canibalización en un sitio de una sola página)?

## Proposed Changes

---

### 1. Nomenclatura Multimedia y Alt Text (SEO On-Page)
Revisaremos todos los componentes que contengan imágenes (`<Image />` de Next.js y `<img />`) para asegurar la inclusión de atributos `alt` descriptivos y geolocalizados.

#### [MODIFY] [Hero.tsx](file:///d:/Claude%20Projects/Holding%20Claude/src/components/home/Hero.tsx)
- Actualizar `alt` del logo si aplica.
- Inserción de precios y condiciones "Above the Fold" de forma semántica en HTML.

#### [MODIFY] [VirtualTour.tsx](file:///d:/Claude%20Projects/Holding%20Claude/src/components/home/VirtualTour.tsx) / [ProjectOverview.tsx](file:///d:/Claude%20Projects/Holding%20Claude/src/components/home/ProjectOverview.tsx) / [Catalog.tsx](file:///d:/Claude%20Projects/Holding%20Claude/src/components/home/Catalog.tsx)
- Inserción de textos descriptivos en la propiedad `alt` (ej. `"Departamento 3 dormitorios preventa San Carlos Huancayo"`).

---

### 2. Ganchos Transaccionales "Above the Fold" (Hero Section)

#### [MODIFY] [Hero.tsx](file:///d:/Claude%20Projects/Holding%20Claude/src/components/home/Hero.tsx)
- Agregaremos texto HTML indexable y semántico con la frase: "Reserva con S/ 1,000".
- Integraremos los precios explícitos: S/ 348,004.00 y S/ 268,509.00 de una forma elegante (o semánticamente oculta si el diseño se ve comprometido, usando clases `sr-only` que los bots sí leen).

---

### 3. Inyección de JSON-LD y Datos Estructurados

#### [NEW] [StructuredData.tsx](file:///d:/Claude%20Projects/Holding%20Claude/src/components/global/StructuredData.tsx)
Creación de un componente que inyecte de forma nativa los `<script type="application/ld+json">` en el `<head>` de la aplicación.
- Schema: `LocalBusiness` / `RealEstateAgent`.
- Schema: `FAQPage` (con preguntas predefinidas sobre ubicación, precios y reserva).

#### [MODIFY] [layout.tsx](file:///d:/Claude%20Projects/Holding%20Claude/src/app/layout.tsx)
- Importación y montaje del componente `<StructuredData />`.
- Ajustes de metaetiquetas globales (Title y Description mejoradas con "San Carlos, Huancayo").

---

### 4. Optimización de Leaflet Maps (SEO Local)

#### [MODIFY] [Location.tsx](file:///d:/Claude%20Projects/Holding%20Claude/src/components/home/Location.tsx)
- Adición de un bloque de texto HTML (posiblemente con la clase `sr-only` para legibilidad exclusiva de motores de búsqueda y LLMs) que contenga la relación de distancias explícitas (ej. "A 1 min de U. Continental", "A 8 min de Mallplaza").
- Verificación del lazy loading dinámico (ya implementado vía `next/dynamic` con `ssr: false`).

---

### 5. Rendimiento Extremo (WPO)

#### [MODIFY] [next.config.ts](file:///d:/Claude%20Projects/Holding%20Claude/next.config.ts) (o equivalente)
- Configuración de cabeceras de Caché agresivas para assets estáticos si es requerido en el servidor Node/Vercel.
- *Nota:* La minificación y compresión ya están automatizadas por Next.js en el paso `build`. La caché de LiteSpeed debe configurarse a nivel de servidor (cPanel/WHM o .htaccess si fuera Apache), pero dejaré la estructura lista en el framework.

## Verification Plan
### Automated & Manual Verification
1. Ejecutar el proyecto en modo de desarrollo y verificar el código fuente (`Ctrl+U`) para validar que el JSON-LD está inyectado correctamente en el `<head>`.
2. Validar con la herramienta [Rich Results Test](https://search.google.com/test/rich-results) de Google (o inspeccionar el DOM) para asegurar que el `RealEstateAgent` y el `FAQPage` carecen de errores de sintaxis.
3. Inspeccionar el código HTML del Hero section confirmando la existencia semántica de los precios.
4. Validar el Lighthouse Score (Performance y SEO) de forma local.
