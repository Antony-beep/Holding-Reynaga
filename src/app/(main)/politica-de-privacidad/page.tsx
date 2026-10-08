import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Lock } from "lucide-react";
import {
  LEGAL_REVIEW_MARKER,
  PRIVACY_POLICY_DATE,
  PRIVACY_POLICY_VERSION,
} from "@/lib/privacy";

const description =
  "Borrador de la política de privacidad de Holding Inversiones Reynaga S.A.C.: finalidades, proveedores, derechos y preferencias de cookies.";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description,
  alternates: { canonical: "/politica-de-privacidad" },
  openGraph: {
    title: "Política de Privacidad | Holding Reynaga",
    description,
    url: "/politica-de-privacidad",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Política de Privacidad | Holding Reynaga",
    description,
  },
};

const retentionPurposes = [
  "Contacto solicitado",
  "Cotización y seguimiento solicitado",
  "Solicitud de reserva y documentación que pudiera formalizarse",
  "Atención y conservación de reclamos o quejas",
  "Promociones opcionales por WhatsApp, correo o llamadas",
  "Analítica opcional con Google Analytics",
  "Publicidad opcional con Meta Pixel",
  "Preferencias de cookies en este navegador",
  "Evidencia de consentimiento y de su revocación",
  "Registros técnicos y prevención de abuso",
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-surface">
      <div className="bg-deep-navy pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-primary transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Volver al Inicio
          </Link>
          <h1 className="text-display font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter leading-[1.1]">
            Política de <span className="text-primary">Privacidad</span>
          </h1>
          <p className="mt-6 text-white/60 font-medium text-sm tracking-widest uppercase">
            Publicación del borrador: <time dateTime={PRIVACY_POLICY_DATE}>{PRIVACY_POLICY_DATE}</time>
          </p>
          <p className="mt-2 text-white/60 font-body text-sm">Versión {PRIVACY_POLICY_VERSION}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl py-16 md:py-24">
        <div className="bg-white rounded-3xl shadow-architectural border border-black/5 p-8 md:p-12 lg:p-16">
          <div className="flex items-start gap-4 rounded-2xl border border-primary/25 bg-primary/5 p-5 mb-8">
            <Shield className="w-6 h-6 text-primary shrink-0 mt-1" aria-hidden="true" />
            <div className="font-body text-sm leading-relaxed text-deep-navy/80">
              <p className="font-bold text-deep-navy mb-2">Borrador con información pendiente de revisión legal</p>
              <p>
                Los campos entre dobles corchetes no son datos acreditados ni condiciones aprobadas.
                Cada punto pendiente se identifica con {LEGAL_REVIEW_MARKER}. Este documento no certifica
                el cumplimiento legal ni la configuración de los servicios en producción.
              </p>
            </div>
          </div>

          <p className="font-body text-lg leading-relaxed text-deep-navy/75 mb-8">
            Esta política explica el tratamiento de datos relacionado con el sitio de Torres Titanium.
            Atender una solicitud o un reclamo es distinto de enviar promociones o activar herramientas
            opcionales de seguimiento. Navegar, descargar el dossier o leer esta política no autoriza
            esas finalidades opcionales.
          </p>

          <nav aria-label="Apartados de la política de privacidad" className="flex flex-wrap gap-x-5 gap-y-3 mb-12 text-sm font-body text-primary font-bold">
            <Link href="#titular" className="hover:underline">Titular</Link>
            <Link href="#finalidades" className="hover:underline">Finalidades</Link>
            <Link href="#destinatarios" className="hover:underline">Proveedores</Link>
            <Link href="#conservacion" className="hover:underline">Conservación</Link>
            <Link href="#derechos" className="hover:underline">Derechos</Link>
            <Link href="#cookies" className="hover:underline">Cookies</Link>
          </nav>

          <div className="space-y-12 font-body leading-relaxed text-deep-navy/75">
            <section id="titular" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">1. Titular y contacto</h2>
              <p>
                El titular del tratamiento es <strong className="text-deep-navy">HOLDING INVERSIONES REYNAGA S.A.C.</strong>,
                con <strong className="text-deep-navy">RUC 20614870959</strong>. Estos dos datos fueron confirmados por el titular del proyecto.
              </p>
              <p className="mt-4">
                Domicilio legal: <strong>Jr. Lino Nro. 132, Huancayo Cercado (Oficina 401, a una cuadra del Parque Grau), Huancayo, Junín, Perú</strong> — domicilio fiscal confirmado en la consulta pública del RUC N° 20614870959. {LEGAL_REVIEW_MARKER}.
                Las direcciones comerciales publicadas en el sitio no acreditan por sí solas el domicilio legal.
              </p>
              <p className="mt-4">
                Canales publicados: <a href="mailto:holdingreynagaredes@gmail.com" className="text-primary font-bold hover:underline break-all">holdingreynagaredes@gmail.com</a>
                {" "}y <a href="tel:+51981407634" className="text-primary font-bold hover:underline">981407634</a>.
                Su designación como canales formales para derechos y revocación está pendiente de confirmación legal. {LEGAL_REVIEW_MARKER}.
              </p>
            </section>

            <section id="banco-de-datos" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">2. Banco de datos personales</h2>
              <p>
                La denominación del banco o de los bancos aplicables es <strong>[[NOMBRE DEL BANCO DE DATOS]]</strong>
                {" "}y su número en el Registro Nacional de Protección de Datos Personales es <strong>[[NÚMERO RNPDP]]</strong>.
                Deben acreditarse la inscripción, la denominación y el alcance de cada banco; no se afirma que
                estén inscritos o actualizados. {LEGAL_REVIEW_MARKER}.
              </p>
              <p className="mt-4">
                El código contempla registros de solicitudes comerciales y de reclamos, así como su
                sincronización con Google Sheets. Esta descripción técnica no acredita el registro legal de los bancos.
              </p>
            </section>

            <section id="datos" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">3. Datos tratados y procedencia</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>En solicitudes de contacto, cotización o reserva: nombre, documento cuando lo solicite el formulario, teléfono, correo, interés y mensaje proporcionados por la persona.</li>
                <li>En reclamos o quejas: identidad, documento, domicilio, teléfono, correo, datos del representante cuando corresponda, bien o servicio, monto, detalle y pedido.</li>
                <li>Como evidencia de la declaración y las autorizaciones del formulario: texto mostrado, versión de la política, fecha de recepción y decisiones sobre atención y marketing.</li>
                <li>Para operación y prevención de abuso: dirección IP, información técnica del navegador, origen del formulario y datos de la comprobación de seguridad.</li>
                <li>Con autorización de la categoría correspondiente: eventos de navegación, identificadores y datos técnicos tratados por Google Analytics o Meta Pixel. No se describen como totalmente anónimos.</li>
              </ul>
              <p className="mt-4">
                Los datos del formulario proceden de la persona que los envía o de su representante.
                El dossier PDF es público y se descarga directamente, sin completar un formulario.
                La solicitud del archivo puede generar registros técnicos del alojamiento, pero no una autorización de promociones.
              </p>
              <p className="mt-4">
                La necesidad de cada campo, el tratamiento de datos de representantes o menores y la
                minimización de los registros técnicos deben revisarse. {LEGAL_REVIEW_MARKER}.
              </p>
            </section>

            <section id="finalidades" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">4. Finalidades necesarias y opcionales</h2>
              <h3 className="font-display text-xl font-bold text-deep-navy mb-4">Atención de la solicitud y obligaciones aplicables</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li>Responder al contacto solicitado y coordinar la información o visita que la persona pida.</li>
                <li>Preparar una cotización y realizar el seguimiento relacionado con esa solicitud.</li>
                <li>Gestionar una solicitud de reserva. Enviar el formulario no formaliza una reserva, no cobra S/ 1,000, no firma una Constancia de Separación ni realiza un cobro. La separación se formaliza presencialmente con el equipo de ventas.</li>
                <li>Registrar, tramitar y responder reclamos o quejas, entregar su copia y conservar la documentación que corresponda.</li>
                <li>Operar el sitio, prevenir envíos abusivos y mantener evidencia de las declaraciones y decisiones recibidas.</li>
              </ul>
              <p className="mt-4">
                Una respuesta al contacto pedido no es una autorización general para campañas promocionales.
                Sin los datos necesarios puede no ser posible atender la solicitud concreta; ello no impide
                consultar el sitio o descargar el dossier. La base jurídica de cada tratamiento y los campos
                realmente necesarios deben definirse con asesoría legal. {LEGAL_REVIEW_MARKER}.
              </p>
              <h3 className="font-display text-xl font-bold text-deep-navy mt-8 mb-4">Finalidades opcionales e independientes</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Promociones por WhatsApp, correo o llamadas:</strong> requieren una autorización opcional específica del formulario. Puede rechazarse o revocarse sin perder la atención de la solicitud o del reclamo.</li>
                <li><strong>Analítica con Google Analytics:</strong> requiere aceptar la categoría analítica en las preferencias de cookies.</li>
                <li><strong>Publicidad con Meta Pixel:</strong> requiere aceptar la categoría de marketing en las preferencias de cookies.</li>
              </ul>
              <p className="mt-4">
                Autorizar promociones de contacto no activa cookies de marketing, y aceptar cookies de
                marketing no autoriza promociones por WhatsApp, correo o llamadas. El alcance de las
                campañas y sus condiciones de autorización quedan pendientes de revisión. {LEGAL_REVIEW_MARKER}.
              </p>
            </section>

            <section id="destinatarios" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">5. Destinatarios y servicios de terceros</h2>
              <p className="mb-4">
                La atención corresponde al personal autorizado del titular. El código contempla las siguientes
                integraciones; su uso efectivo depende de la configuración del sitio. Deben confirmarse los
                accesos, la entidad que presta cada servicio, su papel como encargado o destinatario y los
                acuerdos aplicables. {LEGAL_REVIEW_MARKER}.
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Google Analytics:</strong> analítica de navegación, identificadores y datos técnicos, solo con autorización analítica.</li>
                <li><strong>Google Sheets:</strong> sincronización y gestión de los registros de solicitudes y reclamos, incluidos sus datos y evidencia de consentimiento.</li>
                <li><strong>Meta Pixel:</strong> eventos de navegación o conversión y publicidad, solo con autorización de cookies de marketing.</li>
                <li><strong>WhatsApp:</strong> enlace externo que abre el usuario por iniciativa propia. Si envía un mensaje, WhatsApp trata los datos de contacto, el contenido y los datos técnicos de esa comunicación conforme a sus propias condiciones. Abrir el enlace no autoriza futuras promociones.</li>
                <li><strong>Alojamiento y nube:</strong> operación del sitio y almacenamiento de registros por <strong>[[PROVEEDORES]]</strong>. {LEGAL_REVIEW_MARKER}.</li>
                <li><strong>Resend:</strong> envío de correos y copias de reclamaciones; puede recibir dirección del destinatario, contenido y adjuntos necesarios para el envío.</li>
                <li><strong>Cloudflare Turnstile:</strong> comprobación antiautomatización cuando está configurada, con token, IP y datos técnicos necesarios para la verificación.</li>
                <li><strong>OpenStreetMap:</strong> solicitud de teselas para mostrar el mapa; su servidor puede recibir la IP y datos técnicos de la petición. No es una autorización para marketing de contacto.</li>
                <li><strong>Autoridades competentes:</strong> documentación cuando exista un requerimiento u obligación aplicable, incluidos los relacionados con el Libro de Reclamaciones.</li>
              </ul>
              <p className="mt-4">
                El inventario de destinatarios, los permisos del personal y de las hojas compartidas, los
                contratos y las condiciones de cada integración deben verificarse. No se afirma que existan
                contratos firmados, certificaciones o garantías ya acreditadas. {LEGAL_REVIEW_MARKER}.
              </p>
            </section>

            <section id="transferencias" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">6. Posibles transferencias al extranjero</h2>
              <p>
                El uso de los servicios anteriores puede implicar tratamiento o almacenamiento fuera del Perú.
                Deben identificarse <strong>[[DESTINATARIOS Y PAÍSES]]</strong> y documentarse las
                {" "}<strong>[[GARANTÍAS DE TRANSFERENCIA]]</strong> exigibles para cada caso. {LEGAL_REVIEW_MARKER}.
              </p>
              <p className="mt-4">
                No se atribuye un país de destino, un contrato de transferencia o una certificación a un proveedor
                sin comprobarlos. La base jurídica, la información al titular y las salvaguardas de estas
                transferencias están pendientes de revisión. {LEGAL_REVIEW_MARKER}.
              </p>
            </section>

            <section id="conservacion" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">7. Plazos de conservación por finalidad</h2>
              <p className="mb-4">
                No se ha acreditado un plazo de conservación para las siguientes finalidades. Deben definirse
                la duración, el momento desde el que se cuenta y las reglas de eliminación o bloqueo de copias
                y respaldos, considerando las obligaciones aplicables. {LEGAL_REVIEW_MARKER}.
              </p>
              <div className="overflow-x-auto rounded-xl border border-black/10">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Plazos pendientes de conservación por finalidad</caption>
                  <thead className="bg-deep-navy text-white">
                    <tr>
                      <th scope="col" className="p-4 font-display">Finalidad</th>
                      <th scope="col" className="p-4 font-display">Plazo y estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retentionPurposes.map((purpose) => (
                      <tr key={purpose} className="border-t border-black/5">
                        <th scope="row" className="p-4 font-medium text-deep-navy">{purpose}</th>
                        <td className="p-4">[[PLAZO]] · {LEGAL_REVIEW_MARKER}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Revocar promociones o cookies detiene el tratamiento opcional correspondiente hacia el futuro;
                no implica borrar automáticamente registros sujetos a obligaciones de conservación ni los
                datos que terceros ya hayan recibido. Estas excepciones y sus plazos deben precisarse. {LEGAL_REVIEW_MARKER}.
              </p>
            </section>

            <section id="seguridad" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">8. Medidas de seguridad observadas en el código</h2>
              <p>
                El código contempla validación de campos en el servidor, límites de tamaño de solicitudes,
                controles de frecuencia de envío y comprobaciones antiautomatización, incluida Cloudflare
                Turnstile cuando está configurada. También contempla el registro de la versión, el texto y la
                fecha de recepción de las decisiones de los formularios.
              </p>
              <p className="mt-4">
                Esta observación no es una auditoría de producción. No se afirma cifrado de las bases de datos,
                acceso exclusivo a un equipo, certificaciones o ausencia de incidentes. La configuración efectiva,
                las autorizaciones de acceso, las copias de respaldo y las medidas organizativas deben verificarse.
                {" "}{LEGAL_REVIEW_MARKER}.
              </p>
            </section>

            <section id="derechos" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">9. Derechos, revocación y reclamación ante la ANPD</h2>
              <p>
                Puede solicitar el acceso, la rectificación, la cancelación y la oposición al tratamiento de sus
                datos (derechos ARCO), así como la portabilidad cuando resulte aplicable conforme a la normativa.
                Puede revocar la autorización de promociones sin condicionar la atención de una solicitud o reclamo.
              </p>
              <p className="mt-4">
                Para dirigir una solicitud se publican el correo
                {" "}<a href="mailto:holdingreynagaredes@gmail.com" className="text-primary font-bold hover:underline break-all">holdingreynagaredes@gmail.com</a>
                {" "}y el teléfono <a href="tel:+51981407634" className="text-primary font-bold hover:underline">981407634</a>.
                Su habilitación formal, la persona responsable y los requisitos mínimos de identificación o
                representación deben confirmarse. {LEGAL_REVIEW_MARKER}.
              </p>
              <p className="mt-4">
                Indique el derecho que desea ejercer y un medio para recibir la respuesta. Los requisitos de
                verificación y los <strong>[[PLAZOS DE RESPUESTA]]</strong> para cada derecho, incluida la
                portabilidad cuando corresponda y la revocación, están pendientes de revisión. {LEGAL_REVIEW_MARKER}.
                No se confunden estos plazos con los del Libro de Reclamaciones.
              </p>
              <p className="mt-4">
                Si considera vulnerados sus derechos, puede reclamar ante la
                {" "}<a href="https://www.gob.pe/anpd" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">Autoridad Nacional de Protección de Datos Personales (ANPD)</a>.
                La determinación del procedimiento aplicable a cada caso debe revisarse. {LEGAL_REVIEW_MARKER}.
              </p>
            </section>

            <section id="cookies" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Lock className="w-6 h-6" aria-hidden="true" />
                </div>
                <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight">10. Política de cookies y almacenamiento local</h2>
              </div>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>Necesarias:</strong> recursos estrictamente necesarios para el funcionamiento, la seguridad y el recuerdo de la elección de privacidad. No se destinan a publicidad. La clasificación y el inventario concretos deben validarse. {LEGAL_REVIEW_MARKER}.</li>
                <li><strong>Analíticas, opcionales:</strong> Google Analytics mide visitas y eventos y puede tratar identificadores y datos técnicos. No se garantiza anonimato total. Solo se carga con consentimiento de la categoría analítica.</li>
                <li><strong>Marketing, opcionales:</strong> Meta Pixel mide eventos o conversiones y permite publicidad o audiencias. Solo se carga con consentimiento de la categoría de marketing.</li>
              </ul>
              <p className="mt-4">
                Google Analytics y Meta Pixel no se cargan sin consentimiento de su categoría correspondiente.
                Puede aceptar todas las categorías, elegir solo las necesarias o personalizar analítica y
                marketing por separado. Rechazar las categorías opcionales no impide leer las páginas legales,
                consultar el proyecto o descargar el dossier público.
              </p>
              <p className="mt-4">
                La preferencia de este navegador se guarda en <code className="text-deep-navy">localStorage</code>,
                junto con la fecha de la decisión y la versión de la política ({PRIVACY_POLICY_VERSION}).
                Este almacenamiento local no es una cookie enviada por sí misma al servidor ni sustituye la
                evidencia de autorización de promociones recogida en un formulario. Si el navegador no permite
                conservar la elección, no debe activarse una categoría opcional por defecto.
              </p>
              <p className="mt-4">
                Puede reabrir <strong>Preferencias de Cookies</strong> desde el pie del sitio, personalizar
                las categorías o retirar su consentimiento eligiendo solo las necesarias. Desactivar una
                categoría debe impedir nuevos envíos de esa categoría; no borra retroactivamente datos que
                terceros hayan recibido. También puede gestionar el almacenamiento desde su navegador.
              </p>
              <p className="mt-4">
                Esta elección es independiente de recibir promociones por WhatsApp, correo o llamadas.
                Para revocar esas promociones, utilice los canales indicados en el apartado de
                {" "}<Link href="#derechos" className="text-primary font-bold hover:underline">derechos y revocación</Link>.
              </p>
              <p className="mt-4">
                Deben completarse <strong>[[INVENTARIO Y DURACIÓN DE COOKIES]]</strong> y los plazos por
                finalidad del apartado de conservación, y comprobarse en producción el bloqueo previo y
                la retirada. {LEGAL_REVIEW_MARKER}.
              </p>
            </section>

            <section id="version" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">11. Publicación y cambios de versión</h2>
              <p>
                Versión del borrador: <strong>{PRIVACY_POLICY_VERSION}</strong>. Fecha de publicación:
                {" "}<time dateTime={PRIVACY_POLICY_DATE}>{PRIVACY_POLICY_DATE}</time>. La lectura de una
                nueva versión no constituye consentimiento. Los cambios de finalidades opcionales deben
                comunicarse y, cuando corresponda, requerir una nueva autorización específica.
              </p>
              <p className="mt-4">
                El procedimiento de actualización, la conservación de versiones y las condiciones para
                solicitar nuevamente consentimiento deben aprobarse. {LEGAL_REVIEW_MARKER}.
              </p>
            </section>

            <section id="normativa" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">12. Normativa y documentos relacionados</h2>
              <p>
                El marco de referencia es la <strong>Ley N° 29733, Ley de Protección de Datos Personales</strong>,
                y su Reglamento, aprobado por el
                {" "}<a href="https://www.gob.pe/institucion/anpd/normas-legales/6554453-n-016-2024-jus" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">D.S. N° 016-2024-JUS (fuente oficial ANPD)</a>.
                La aplicación de bases jurídicas, plazos y obligaciones concretas a este proyecto requiere
                revisión profesional. {LEGAL_REVIEW_MARKER}.
              </p>
              <p className="mt-4">
                La información comercial y las solicitudes de reserva se explican en los
                {" "}<Link href="/terminos-y-condiciones" className="text-primary font-bold hover:underline">Términos y Condiciones</Link>.
                Para registrar un reclamo o una queja, acceda al
                {" "}<Link href="/libro-de-reclamaciones" className="text-primary font-bold hover:underline">Libro de Reclamaciones</Link>.
                Su uso no exige aceptar términos de compraventa ni promociones.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
