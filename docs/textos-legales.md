# Textos legales — borrador e integración

- Versión de referencia: **2026-10-02.1** (`PRIVACY_POLICY_VERSION`).
- Fecha de publicación del borrador: **2026-10-02** (`PRIVACY_POLICY_DATE`).
- Versión de preferencias de cookies: `COOKIE_CONSENT_VERSION`, vinculada a la versión de privacidad en `src/lib/privacy.ts`.
- Estado: **borrador con pendientes visibles**, no dictamen jurídico ni certificación de cumplimiento.
- Marcador de revisión: **[[REVISAR CON ABOGADO]]** (`LEGAL_REVIEW_MARKER`).
- Fuente de los textos de formulario y de la cláusula comercial: `src/lib/privacy.ts`, creado por el padre y no modificado en este paquete.

El usuario confirmó la razón social, el RUC, el anuncio de separación con S/ 1,000 y la **opción B del dossier: conservar el PDF público y corregir el copy**. Esa confirmación no acredita domicilio, inscripción del banco, contratos con proveedores, países, garantías de transferencia, plazos ni régimen jurídico de reservas o descuentos.

## 1. Inventario y estado de la Política de Privacidad

Ruta: `/politica-de-privacidad`. El contenido se entrega desde una página de servidor, con metadatos y canonical propios. Las marcas pendientes se muestran en el documento público; no se ocultan en comentarios.

| Apartado / ancla | Estado y alcance | Pendientes |
| --- | --- | --- |
| 1. Titular / `#titular` | Razón social **HOLDING INVERSIONES REYNAGA S.A.C.** y **RUC 20614870959**, confirmados por el usuario. Correo y teléfono identificados como canales publicados, no acreditados como canales formales. | Acreditar **[[DOMICILIO LEGAL COMPLETO]]** y designar formalmente correo/teléfono para derechos y revocación. [[REVISAR CON ABOGADO]] |
| 2. Banco / `#banco-de-datos` | Se describen registros comerciales y de reclamos observados en el código; no se afirma inscripción. | Completar **[[NOMBRE DEL BANCO DE DATOS]]**, **[[NÚMERO RNPDP]]**, denominación, alcance e inscripción/actualización de los bancos aplicables. [[REVISAR CON ABOGADO]] |
| 3. Datos / `#datos` | Campos de identidad/contacto, reclamo, representante, evidencia de decisiones, IP/navegador y datos de integraciones descritos a partir del código. Dossier sin formulario. | Revisar necesidad de documento y de cada campo, representación, menores y minimización de registros técnicos. [[REVISAR CON ABOGADO]] |
| 4. Finalidades / `#finalidades` | Se separan contacto solicitado, cotización, solicitud de reserva y reclamos de promociones y cookies opcionales. Operación, prevención de abuso y evidencia se explican aparte. | Definir base jurídica de cada finalidad, campos necesarios y alcance de campañas. [[REVISAR CON ABOGADO]] |
| 5. Destinatarios / `#destinatarios` | Integraciones observadas: Google Analytics y Sheets, Meta Pixel, WhatsApp iniciado por el usuario, Resend, Cloudflare Turnstile y teselas OpenStreetMap. Se contempla personal autorizado y requerimientos de autoridades. | Completar alojamiento/nube **[[PROVEEDORES]]**; comprobar entidades, roles, contratos, permisos internos y de hojas compartidas, inventario y uso efectivo. No se afirman contratos firmados ni certificaciones. [[REVISAR CON ABOGADO]] |
| 6. Transferencias / `#transferencias` | Se advierte la posibilidad de tratamiento fuera del Perú, sin inventar destinos. | Completar **[[DESTINATARIOS Y PAÍSES]]**, **[[GARANTÍAS DE TRANSFERENCIA]]**, base jurídica e información al titular por integración. [[REVISAR CON ABOGADO]] |
| 7. Conservación / `#conservacion` | Cada finalidad tiene su propio campo **[[PLAZO]]**, sin atribuir una duración no verificada. | Definir duración, inicio del cómputo, eliminación/bloqueo, respaldos y obligaciones de conservación para cada fila. [[REVISAR CON ABOGADO]] |
| 8. Seguridad / `#seguridad` | El código contempla validación de campos, límites de tamaño y frecuencia, controles antiautomatización y evidencia de declaraciones. Turnstile depende de configuración. | Comprobar despliegue, accesos, medidas organizativas, respaldos y configuración. No se afirman cifrado de bases de datos, acceso exclusivo, certificaciones ni ausencia de incidentes. [[REVISAR CON ABOGADO]] |
| 9. Derechos / `#derechos` | ARCO; portabilidad cuando corresponda; revocación separada de marketing de contacto y cookies; derecho de reclamar ante la ANPD. | Confirmar responsable, canales, requisitos mínimos de identidad/representación, **[[PLAZOS DE RESPUESTA]]** para cada derecho y procedimiento aplicable. [[REVISAR CON ABOGADO]] |
| 10. Cookies / `#cookies` | Necesarias, analíticas (GA) y marketing (Meta) diferenciadas. Preferencia local con fecha/versión, bloqueo previo, personalización y retirada como contrato de integración del padre. No se promete anonimato total de GA. | Completar **[[INVENTARIO Y DURACIÓN DE COOKIES]]**, clasificación y plazos. Verificar en navegador el bloqueo, cambio de versión y retirada; implementación de cookies a cargo del padre. [[REVISAR CON ABOGADO]] |
| 11. Versión / `#version` | Borrador publicado el 2026-10-02, versión 2026-10-02.1. Leer una actualización no equivale a consentirla. | Aprobar procedimiento de cambios, conservación de revisiones y supuestos de nueva autorización. [[REVISAR CON ABOGADO]] |
| 12. Normativa / `#normativa` | Referencias a Ley N° 29733 y D.S. N° 016-2024-JUS, con enlace oficial ANPD; enlaces a términos y al Libro de Reclamaciones. | Revisar aplicación concreta de bases jurídicas, obligaciones y plazos; no se citan artículos no contrastados ni se certifica cumplimiento. [[REVISAR CON ABOGADO]] |

### Conservación: campos independientes que faltan

Cada finalidad conserva el marcador **[[PLAZO]]** en la página. No reutilizar el plazo de respuesta de un reclamo como duración de almacenamiento ni como plazo ARCO.

1. Contacto solicitado: [[PLAZO]]. [[REVISAR CON ABOGADO]]
2. Cotización y seguimiento solicitado: [[PLAZO]]. [[REVISAR CON ABOGADO]]
3. Solicitud de reserva y documentación que pudiera formalizarse: [[PLAZO]]. [[REVISAR CON ABOGADO]]
4. Atención y conservación de reclamos o quejas: [[PLAZO]]. [[REVISAR CON ABOGADO]]
5. Promociones opcionales por WhatsApp, correo o llamadas: [[PLAZO]]. [[REVISAR CON ABOGADO]]
6. Analítica opcional con Google Analytics: [[PLAZO]]. [[REVISAR CON ABOGADO]]
7. Publicidad opcional con Meta Pixel: [[PLAZO]]. [[REVISAR CON ABOGADO]]
8. Preferencias de cookies en este navegador: [[PLAZO]]. [[REVISAR CON ABOGADO]]
9. Evidencia de consentimiento y de su revocación: [[PLAZO]]. [[REVISAR CON ABOGADO]]
10. Registros técnicos y prevención de abuso: [[PLAZO]]. [[REVISAR CON ABOGADO]]

## 2. Textos canónicos de casillas y versión

Estos textos corresponden a las constantes compartidas. La integración de formularios y backend pertenece al padre/otro agente: este paquete no edita campos, validadores, API, base de datos ni envío de correos.

### Solicitud de información, cotización o reserva

Constante: `LEAD_REQUIRED_CONSENT_TEXT`. Declaración obligatoria del formulario según el alcance confirmado:

> Acepto los Términos y la Política de Privacidad para que atiendan mi solicitud.

Aceptar esta declaración sirve para la atención de la solicitud; no formaliza una reserva ni una compraventa, no autoriza un cobro y no habilita promociones o cookies opcionales. La base jurídica y el alcance de la declaración deben revisarse. [[REVISAR CON ABOGADO]]

Enlaces documentales: `/terminos-y-condiciones` y `/politica-de-privacidad`.

### Libro de Reclamaciones: veracidad y lectura de política

Constante: `RECLAMO_REQUIRED_CONSENT_TEXT`. Declaración obligatoria del reclamante:

> Declaro que la información proporcionada es verdadera y he leído la Política de Privacidad para la atención de mi reclamo o queja.

No sustituir por una aceptación de términos comerciales, de una reserva, de compraventa o de promociones. La atención del reclamo/queja no se condiciona a una autorización publicitaria. Revisar el alcance de la declaración y el tratamiento legalmente necesario. [[REVISAR CON ABOGADO]]

Enlace documental: `/politica-de-privacidad`.

### Marketing de contacto: opcional e independiente

Constante: `MARKETING_CONSENT_TEXT`. Texto opcional para solicitudes y reclamaciones:

> Acepto recibir promociones y avances por WhatsApp, llamada o correo. Esta autorización es opcional y puedo revocarla.

No debe ser una condición para enviar una solicitud o un reclamo ni estar premarcada. Rechazarla no bloquea la atención. No activa GA/Meta ni se deduce del clic en un enlace a WhatsApp, de una descarga o de navegar. Validar campañas, consentimiento y mecanismo de revocación. [[REVISAR CON ABOGADO]]

### Evidencia y coherencia de revisión

- Formularios: remitir la versión **2026-10-02.1** y decisiones obligatoria/opcional por separado; el backend compartido contempla el texto canónico y fecha de recepción.
- No tomar una casilla opcional, un silencio o una lectura como autorización de otra finalidad.
- Verificar almacenamiento, recuperación y transmisión de la evidencia en las integraciones del padre/otro agente; este paquete no prueba persistencia ni entrega. [[REVISAR CON ABOGADO]]
- Revisar conservación de versiones/evidencia y su plazo propio **[[PLAZO]]**. [[REVISAR CON ABOGADO]]

## 3. Cookies: contenido y contrato de integración

Ruta canónica: `/politica-de-privacidad#cookies`.

| Categoría | Texto/alcance documentado | Estado |
| --- | --- | --- |
| Necesarias | Funcionamiento, seguridad y recuerdo de la elección; no publicidad. No exigir aceptar analítica o marketing para consultar el sitio. | Inventario, clasificación y duración pendientes. [[REVISAR CON ABOGADO]] |
| Analíticas | Google Analytics, opcional; visitas, eventos, identificadores y datos técnicos. **No afirmar anonimato total**. | Activación solo con consentimiento de esta categoría; verificación funcional por el padre. [[REVISAR CON ABOGADO]] |
| Marketing | Meta Pixel, opcional; eventos/conversiones y publicidad o audiencias. | Activación solo con consentimiento de esta categoría; verificación funcional por el padre. [[REVISAR CON ABOGADO]] |

Acciones explicadas: aceptar todo, solo necesarias, personalizar/guardar y reabrir **Preferencias de Cookies** desde el pie del sitio. La retirada debe permitir desactivar categorías o elegir solo necesarias sin impedir la lectura de páginas legales.

La preferencia debe guardarse en `localStorage` de este navegador con **fecha y versión**. No es por sí sola una cookie enviada al servidor ni la evidencia de marketing de contacto del formulario. Si no hay autorización válida, GA y Meta no deben cargarse. Desactivar una categoría debe impedir nuevos envíos de esa categoría; no se promete borrar retroactivamente datos ya recibidos por terceros.

`CookieSettingsLink`, `CookieConsent`, `src/lib/consent.ts`, GA, Meta, root layout y Preloader quedan fuera de este write-set. La integración y las pruebas de bloqueo/retirada, almacenamiento no disponible y cambios de versión corresponden al padre. [[REVISAR CON ABOGADO]]

Revisar **[[INVENTARIO Y DURACIÓN DE COOKIES]]** y **[[PLAZO]]** por finalidad. [[REVISAR CON ABOGADO]]

## 4. Cláusula comercial de precios y reservas

Estado: borrador solicitado y confirmado por el usuario para revisión; **no documento de reserva ni régimen jurídico acreditado**. [[REVISAR CON ABOGADO]]

Condiciones compartidas: `RESERVATION_CONDITIONS` = **[[CONDICIONES DE RESERVA: monto, plazo, documento]]**.

Texto exacto de `RESERVATION_PRICE_CLAUSE`:

> Para quienes no han formalizado una reserva, los precios publicados son referenciales y están sujetos a disponibilidad de la unidad y a las condiciones comerciales informadas antes de contratar. Quien complete la reserva según [[CONDICIONES DE RESERVA: monto, plazo, documento]] mantiene el precio indicado en su documento de reserva, durante la vigencia y bajo las condiciones expresamente acordadas en ese documento. No se modificarán unilateralmente las condiciones de una reserva ya formalizada. [[REVISAR CON ABOGADO]]

La página de términos, el texto de la FAQ de precios y la promesa del JSON-LD importan la constante. `public/llms.txt` y `public/pricing.md` reproducen el mismo texto porque son archivos estáticos; sincronizarlos cuando cambie la constante.

Reglas del copy:

- Se conserva el **anuncio de S/ 1,000**; no se inventa un importe distinto ni se elimina la llamada a solicitar una reserva.
- El formulario **solo solicita atención/cotización/información para reserva**: no formaliza, no cobra, no firma ni confirma automáticamente una unidad.
- Mantener el precio requiere **reserva documentada**, con vigencia y condiciones expresamente acordadas; no basta enviar un formulario.
- No publicar una facultad de modificar unilateralmente una reserva formalizada ni precios reservados “sin previo aviso”.
- Los precios y bonos publicados mantienen sus importes. No se acredita el régimen del descuento ni se inventan vigencia, requisitos, acumulación, reembolso o aplicación sobre el precio. [[REVISAR CON ABOGADO]]

### Pendientes comerciales para aprobación

1. Completar **[[CONDICIONES DE RESERVA: monto, plazo, documento]]**, identificando unidad, documento, formalización y vigencia de precio. [[REVISAR CON ABOGADO]]
2. Definir naturaleza jurídica del pago, imputación al precio, cancelación y devolución sin inventar un régimen. [[REVISAR CON ABOGADO]]
3. Confirmar vigencia, disponibilidad, requisitos y aplicación de bonos/descuentos, incluido si el precio publicado ya los incorpora. [[REVISAR CON ABOGADO]]
4. Revisar información comercial vinculante, renders, acabados y documentación contractual sin limitar derechos del consumidor. [[REVISAR CON ABOGADO]]
5. Revisar competencia/jurisdicción y titularidad/licencias de contenidos; no afirmar propiedad exclusiva sobre recursos de terceros. [[REVISAR CON ABOGADO]]

## 5. Dossier: opción B, sin captación obligatoria

- Se conserva `/docs/BROUCHURE_Setiembre.pdf` como archivo público y su enlace directo existente.
- Copy de `ProjectOverview`: **PDF público de descarga directa, sin completar formulario**.
- Se elimina la promesa de obtenerlo “al registrar tus datos” y la leyenda de “datos protegidos” asociada al botón de descarga.
- Descargar no autoriza promociones ni cookies opcionales. El alojamiento puede registrar una petición técnica del archivo; no se afirma ausencia total de tratamiento técnico.
- No se edita `DossierForm` ni se añade protección, autenticación, captcha o validación a la descarga.
- Cualquier revisión del propio PDF, su contenido comercial o los registros del alojamiento requiere trabajo adicional autorizado; el archivo no fue modificado. [[REVISAR CON ABOGADO]]

## 6. Libro de Reclamaciones y fuentes oficiales

Marco citado: **Ley N° 29571**, **D.S. N° 011-2011-PCM**, modificado por **D.S. N° 101-2022-PCM**.

Fuente oficial consultada para el reglamento y su modificación:

- https://busquedas.elperuano.pe/dispositivo/NL/2095978-1

La fuente describe la respuesta escrita de reclamos y quejas en un plazo no mayor de **15 días hábiles**, improrrogables, por carta y/o correo según lo solicitado. Ese plazo legal no se presenta como plazo ARCO, tiempo de conservación ni evidencia de cumplimiento operativo. No se añaden artículos, cómputos o condiciones no contrastados.

El enlace que antes enviaba a términos bajo el rótulo del Código de Protección y Defensa del Consumidor se sustituye por la fuente oficial del D.S. N° 101-2022-PCM. Se añade el enlace real a privacidad y se explica que la declaración versa sobre veracidad/lectura, no términos comerciales; marketing no condiciona el reclamo.

Pendientes:

- Acreditar domicilio del proveedor: **[[DOMICILIO LEGAL COMPLETO]]**. [[REVISAR CON ABOGADO]]
- Confirmar procedimiento de recepción, respuesta, modalidad solicitada, cómputo y gestión del plazo conforme al régimen aplicable. [[REVISAR CON ABOGADO]]
- Verificar generación/descarga de copia y entrega por correo. Se explica que el envío puede no recibirse; no se garantiza entrega inmediata del servicio de correo. [[REVISAR CON ABOGADO]]
- Confirmar libro físico de respaldo, aviso y procedimiento operativo; no se certifica su existencia. [[REVISAR CON ABOGADO]]
- La reclamación no sustituye ni limita el derecho a acudir a INDECOPI. Revisar procedimiento concreto sin restringirlo mediante términos comerciales. [[REVISAR CON ABOGADO]]

Fuente oficial de privacidad:

- https://www.gob.pe/institucion/anpd/normas-legales/6554453-n-016-2024-jus
- La ficha identifica el Reglamento de la Ley N° 29733 aprobado por el D.S. N° 016-2024-JUS. No se inventan números de artículos, plazos de derechos, inscripción o garantías.
- Canal institucional ANPD enlazado: https://www.gob.pe/anpd

## 7. Navegación, compatibilidad y SEO

- `/terminos-y-condiciones` sigue siendo la ruta de términos, no una redirección completa a privacidad.
- Se conservan sus anclas `informacion-general`, `naturaleza-informacion`, `privacidad`, `cookies`, `libro-reclamaciones`, `propiedad-intelectual`, `jurisdiccion` y `contacto`.
- `#privacidad` y `#cookies` muestran avisos con enlaces reales al documento nuevo, disponibles sin JavaScript. Todas las anclas legales tienen margen de scroll para el encabezado.
- `LegacyPrivacyRedirect` comprueba solo esos dos fragmentos al montar y en `hashchange`, usa `location.replace`, conserva la query y no altera otras anclas. El fragmento no se intenta leer en el servidor.
- Nueva ancla de condiciones comerciales: `/terminos-y-condiciones#condiciones-de-reserva`.
- El footer enlaza `/politica-de-privacidad` y su CTA usa **`/#reserva`**, también desde páginas interiores; se rotula como solicitud de reserva.
- Sitemap incorpora privacidad y fecha legal fija **2026-10-02** para los documentos modificados; no cambia las fechas de catálogo ajenas a este trabajo.
- `llms.txt` enlaza privacidad/cookies y dossier directo. Los metadatos legales describen el borrador, sin prometer certificación ni aceptación por navegación.
- Se preservan estilos, colores, tipografías y estructura del sitio; `ProjectOverview` cambia solo textos del dossier y `JsonLd` solo la promesa de precio/reserva y su importación de constante.

### Coordinación pendiente fuera del write-set

- El padre corrige el fallback sin JavaScript del Preloader y la gestión de cookies. La existencia de enlaces HTML y contenido de servidor no certifica por sí sola la accesibilidad de todo el sitio sin JavaScript; verificar tras integrar su trabajo. [[REVISAR CON ABOGADO]]
- El backend y los formularios deben usar los textos/versiones compartidos y preservar evidencia; no se valida producción, base de datos ni entrega de correo en este paquete. [[REVISAR CON ABOGADO]]
- `OrganizationJsonLd` en `src/components/seo/JsonLd.tsx` y la FAQ sobre domicilio en `src/data/faqs.ts` todavía contienen el domicilio previo de Jr. Lino. No se modifican porque el alcance autorizado en esos archivos es exclusivamente la promesa de conservación de precio. El dato no se recertifica aquí; coordinar su comprobación/corrección con el padre. [[REVISAR CON ABOGADO]]

## 8. Archivos de este paquete y límites de validación

1. `src/app/(main)/terminos-y-condiciones/page.tsx`
2. `src/app/(main)/politica-de-privacidad/page.tsx` (nuevo)
3. `src/components/global/LegacyPrivacyRedirect.tsx` (nuevo)
4. `src/components/global/Footer.tsx`
5. `src/app/sitemap.ts`
6. `public/llms.txt`
7. `public/pricing.md`
8. `src/components/home/ProjectOverview.tsx` (solo copy dossier)
9. `src/components/seo/JsonLd.tsx` (solo promesa de precio/reserva)
10. `src/data/faqs.ts` (solo FAQ de precios/reserva)
11. `src/app/(main)/libro-de-reclamaciones/page.tsx` (solo copy/enlaces legales)
12. `docs/textos-legales.md` (nuevo)

La documentación instalada de Next.js 16.2.3 sobre servidor/cliente, metadatos, sitemap y enlaces con anclas se leyó por terminal antes de escribir código. Se respetan React 19.2.4 y las dependencias existentes.

Validación del paquete: ESLint focalizado, comprobaciones aisladas de navegación/copy y revisión de diff/whitespace. La ejecución de referencia anterior a estos cambios detectó en `ProjectOverview.tsx` un error preexistente `react-hooks/set-state-in-effect` por `setMounted(true)` en el efecto y una advertencia por `isPending` sin uso. No se cambia esa lógica ni se silencian sus reglas para maquillar el resultado.

No se ejecutan builds, comandos sobre entorno/secretos, base de datos, instalación de dependencias ni commits. La revisión profesional y las comprobaciones funcionales de cookies, entrega y persistencia permanecen pendientes en los términos indicados. [[REVISAR CON ABOGADO]]
