import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Lock } from "lucide-react";
import {
  PRIVACY_POLICY_DATE,
  PRIVACY_POLICY_VERSION,
} from "@/lib/privacy";

const description =
  "Política de privacidad de Holding Inversiones Reynaga S.A.C.: bases jurídicas, transferencias internacionales, plazos de conservación, derechos ARCO y cookies, conforme a la Ley N° 29733 y el D.S. N° 016-2024-JUS.";

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

/** Plazos de conservación por finalidad (dictamen legal, 17/10/2026). */
const retentionTerms: Array<{ purpose: string; term: string }> = [
  {
    purpose: "Contacto solicitado",
    term: "Dos (2) años contados desde el último contacto con el interesado, o hasta culminar la venta total del proyecto Torres Titanium, lo que ocurra primero.",
  },
  {
    purpose: "Cotización y seguimiento solicitado",
    term: "Dos (2) años contados desde el último contacto con el interesado, o hasta culminar la venta total del proyecto Torres Titanium, lo que ocurra primero.",
  },
  {
    purpose: "Solicitud de reserva",
    term: "Un (1) año si la separación no llega a formalizarse presencialmente. Formalizada la separación o la compraventa del inmueble, diez (10) años (prescripción contractual del Art. 2001 del Código Civil y normas tributarias aplicables).",
  },
  {
    purpose: "Atención y conservación de reclamos o quejas",
    term: "Cuatro (4) años desde la fecha de interposición del reclamo o queja.",
  },
  {
    purpose: "Promociones opcionales por WhatsApp, correo o llamadas",
    term: "Hasta que el titular revoque su consentimiento o por un plazo máximo de tres (3) años desde su última interacción con nuestras comunicaciones comerciales.",
  },
  {
    purpose: "Analítica opcional con Google Analytics",
    term: "Catorce (14) meses en los servidores de Google Analytics para datos a nivel de usuario o evento, o hasta que el usuario revoque su permiso de cookies.",
  },
  {
    purpose: "Publicidad opcional con Meta Pixel",
    term: "Noventa (90) días en la cookie del navegador (_fbp) y hasta ciento ochenta (180) días en la plataforma publicitaria de Meta, o hasta que el usuario revoque su permiso.",
  },
  {
    purpose: "Preferencias de cookies en este navegador",
    term: "Doce (12) meses desde la decisión; transcurrido ese plazo se solicita nuevamente la preferencia.",
  },
  {
    purpose: "Evidencia de consentimiento y de su revocación",
    term: "Cuatro (4) años posteriores a la finalización del tratamiento o a la revocación, con la única finalidad de acreditar el cumplimiento legal ante eventuales fiscalizaciones de la ANPDP o INDECOPI.",
  },
  {
    purpose: "Registros técnicos y prevención de abuso",
    term: "Seis (6) meses desde el evento técnico.",
  },
  {
    purpose: "Registros de auditoría del panel de administración",
    term: "Dos (2) años desde cada evento registrado, conforme a las exigencias de trazabilidad del Reglamento de la Ley N° 29733.",
  },
  {
    purpose: "Sesiones del panel de administración",
    term: "Ocho (8) horas.",
  },
];

/** Inventario de cookies y almacenamiento (cotejado con la implementación). */
const cookieInventory: Array<{ name: string; provider: string; category: string; duration: string; purpose: string }> = [
  {
    name: "cookie-consent (localStorage)",
    provider: "Holding Reynaga (propia)",
    category: "Necesaria",
    duration: "12 meses",
    purpose: "Guarda la elección del usuario sobre las categorías de cookies aceptadas o rechazadas, junto con la fecha y la versión de la política.",
  },
  {
    name: "Token de Cloudflare Turnstile",
    provider: "Cloudflare, Inc.",
    category: "Necesaria (seguridad)",
    duration: "Efímero, durante el envío del formulario",
    purpose: "Verifica que el visitante que completa el formulario es una persona y protege el sitio contra bots; no se almacena de forma persistente.",
  },
  {
    name: "_ga",
    provider: "Google LLC (GA4)",
    category: "Analítica (opcional)",
    duration: "2 años",
    purpose: "Distingue a los usuarios únicos mediante un identificador generado aleatoriamente para elaborar estadísticas de uso del sitio.",
  },
  {
    name: "_ga_<ID de propiedad>",
    provider: "Google LLC (GA4)",
    category: "Analítica (opcional)",
    duration: "2 años",
    purpose: "Mantiene y conserva el estado de la sesión estadística en Google Analytics 4.",
  },
  {
    name: "_fbp",
    provider: "Meta Platforms, Inc.",
    category: "Marketing (opcional)",
    duration: "90 días",
    purpose: "Almacena y realiza seguimiento de las visitas para mostrar publicidad relevante en Facebook e Instagram.",
  },
  {
    name: "_fbc",
    provider: "Meta Platforms, Inc.",
    category: "Marketing (opcional)",
    duration: "90 días",
    purpose: "Registra si el visitante llegó al sitio a través de un clic en un anuncio de Meta.",
  },
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
            Última actualización: <time dateTime={PRIVACY_POLICY_DATE}>{PRIVACY_POLICY_DATE}</time>
          </p>
          <p className="mt-2 text-white/60 font-body text-sm">Versión {PRIVACY_POLICY_VERSION} · Revisada con asesoría legal</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl py-16 md:py-24">
        <div className="bg-white rounded-3xl shadow-architectural border border-black/5 p-8 md:p-12 lg:p-16">
          <div className="flex items-start gap-4 rounded-2xl border border-primary/25 bg-primary/5 p-5 mb-8">
            <Shield className="w-6 h-6 text-primary shrink-0 mt-1" aria-hidden="true" />
            <div className="font-body text-sm leading-relaxed text-deep-navy/80">
              <p className="font-bold text-deep-navy mb-2">Texto revisado con asesoría legal (octubre de 2026)</p>
              <p>
                Esta versión incorpora el dictamen de la asesoría legal: bases jurídicas conforme al
                D.S. N° 016-2024-JUS, plazos de conservación definidos, garantías de transferencia
                internacional y procedimiento de derechos ARCO. La inscripción del Libro de
                Reclamaciones como banco de datos separado se encuentra en trámite ante el RNPDP.
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
                Domicilio legal: <strong>Jr. Lino Nro. 132, Huancayo Cercado (Oficina 401, a una cuadra del Parque Grau), Huancayo, Junín, Perú</strong> — domicilio fiscal confirmado en la consulta pública del RUC N° 20614870959.
                Las direcciones comerciales publicadas en el sitio no acreditan por sí solas el domicilio legal.
              </p>
              <p className="mt-4">
                Canales formales para el ejercicio de derechos y revocación: <a href="mailto:holdingreynagaredes@gmail.com" className="text-primary font-bold hover:underline break-all">holdingreynagaredes@gmail.com</a>
                {" "}y <a href="tel:+51981407634" className="text-primary font-bold hover:underline">981407634</a>.
              </p>
            </section>

            <section id="banco-de-datos" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">2. Banco de datos personales</h2>
              <p>
                La denominación del banco de datos inscrita es <strong>PROSPECTO DE CLIENTES - TORRES TITANIUM</strong>,
                {" "}con el código de inscripción <strong>INS-2026-6247</strong> en el Registro Nacional
                de Protección de Datos Personales (16/10/2026), modificado mediante <strong>MOD-2026-2174</strong>
                (17/10/2026). La finalidad inscrita comprende la atención de consultas comerciales,
                cotizaciones, promociones, programación de citas y el seguimiento de ventas del proyecto
                inmobiliario Torres Titanium, mediante llamadas telefónicas, correo electrónico y WhatsApp.
                La modificación declara la transferencia internacional de datos hacia Estados Unidos
                (Google LLC, Meta Platforms Inc., Resend Inc. y Cloudflare Inc.).
              </p>
              <p className="mt-4">
                El registro del Libro de Reclamaciones y su sincronización con Google Sheets constituyen
                un banco de datos personales <strong>separado</strong>, en trámite de inscripción ante el
                RNPDP bajo la denominación <strong>QUEJAS Y RECLAMOS</strong>, con flujo transfronterizo
                declarado hacia Google LLC y Resend Inc. (Estados Unidos), conforme al dictamen legal.
                Su finalidad es exclusivamente el cumplimiento de la obligación legal del Libro de
                Reclamaciones (Ley N° 29571).
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
              <h3 className="font-display text-xl font-bold text-deep-navy mt-8 mb-4">Datos personales de menores de edad</h3>
              <p>
                Los servicios, proyectos inmobiliarios y formularios de este sitio web están dirigidos
                exclusivamente a personas mayores de dieciocho (18) años con plena capacidad legal para
                contratar. HOLDING INVERSIONES REYNAGA S.A.C. no recopila intencionalmente datos
                personales de menores de edad. En caso de que detectemos o un padre, madre o tutor legal
                nos informe que un menor de edad ha ingresado sus datos personales en nuestros
                formularios sin el consentimiento de quienes ejercen su patria potestad o tutela,
                procederemos a la eliminación inmediata e irreversible de dichos registros de nuestras
                bases de datos.
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
                consultar el sitio o descargar el dossier.
              </p>
              <h3 className="font-display text-xl font-bold text-deep-navy mt-8 mb-4">Bases jurídicas del tratamiento</h3>
              <p className="mb-4">
                Conforme al dictamen legal, cada finalidad se ampara en las siguientes bases de la
                Ley N° 29733, su Reglamento (D.S. N° 016-2024-JUS) y la Ley N° 29571:
              </p>
              <div className="overflow-x-auto rounded-xl border border-black/10">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Bases jurídicas por finalidad</caption>
                  <thead className="bg-deep-navy text-white">
                    <tr>
                      <th scope="col" className="p-4 font-display">Finalidad</th>
                      <th scope="col" className="p-4 font-display">Base jurídica</th>
                      <th scope="col" className="p-4 font-display">Consentimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-black/5">
                      <th scope="row" className="p-4 font-medium text-deep-navy">Atender consulta, cotización o solicitud de reserva</th>
                      <td className="p-4">Consentimiento expreso del titular (Art. 13.5 de la Ley N° 29733) y ejecución de medidas precontractuales a solicitud del titular (Art. 14, inc. 5).</td>
                      <td className="p-4">Casilla obligatoria del formulario sin premarcar, registrada con evidencia.</td>
                    </tr>
                    <tr className="border-t border-black/5">
                      <th scope="row" className="p-4 font-medium text-deep-navy">Promociones por WhatsApp, llamada o correo</th>
                      <td className="p-4">Consentimiento libre, previo, expreso, informado e inequívoco (Art. 13.5 de la Ley N° 29733 y Art. 58.1.e de la Ley N° 29571).</td>
                      <td className="p-4">Casilla opcional (opt-in) sin premarcar; revocable en cualquier momento.</td>
                    </tr>
                    <tr className="border-t border-black/5">
                      <th scope="row" className="p-4 font-medium text-deep-navy">Atención del Libro de Reclamaciones virtual</th>
                      <td className="p-4">Cumplimiento de mandato legal (Art. 14, inc. 13 de la Ley N° 29733, en concordancia con el Art. 150 de la Ley N° 29571 y el D.S. N° 011-2011-PCM).</td>
                      <td className="p-4">No requiere consentimiento (excepción legal); no condiciona la atención.</td>
                    </tr>
                    <tr className="border-t border-black/5">
                      <th scope="row" className="p-4 font-medium text-deep-navy">Analítica del sitio (Google Analytics 4)</th>
                      <td className="p-4">Consentimiento expreso por categoría de cookies (Art. 13.5 de la Ley N° 29733).</td>
                      <td className="p-4">Bloqueado por defecto hasta aceptar la categoría analítica.</td>
                    </tr>
                    <tr className="border-t border-black/5">
                      <th scope="row" className="p-4 font-medium text-deep-navy">Publicidad digital (Meta Pixel)</th>
                      <td className="p-4">Consentimiento expreso por categoría de cookies (Art. 13.5 de la Ley N° 29733).</td>
                      <td className="p-4">Bloqueado por defecto hasta aceptar la categoría marketing.</td>
                    </tr>
                    <tr className="border-t border-black/5">
                      <th scope="row" className="p-4 font-medium text-deep-navy">Prevención de abuso, seguridad y auditoría</th>
                      <td className="p-4">Obligación legal de implementar medidas de seguridad (Art. 16 de la Ley N° 29733 y D.S. N° 016-2024-JUS) y preparación/ejecución segura de la relación precontractual (Art. 14, inc. 5).</td>
                      <td className="p-4">Aplicado técnicamente (Captcha, honeypot, límites de tasa por IP e identidad).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3 className="font-display text-xl font-bold text-deep-navy mt-8 mb-4">Finalidades opcionales e independientes</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Promociones por WhatsApp, correo o llamadas:</strong> requieren una autorización opcional específica del formulario. Puede rechazarse o revocarse sin perder la atención de la solicitud o del reclamo.</li>
                <li><strong>Analítica con Google Analytics:</strong> requiere aceptar la categoría analítica en las preferencias de cookies.</li>
                <li><strong>Publicidad con Meta Pixel:</strong> requiere aceptar la categoría de marketing en las preferencias de cookies.</li>
              </ul>
              <p className="mt-4">
                Autorizar promociones de contacto no activa cookies de marketing, y aceptar cookies de
                marketing no autoriza promociones por WhatsApp, correo o llamadas.
              </p>
            </section>

            <section id="destinatarios" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">5. Destinatarios y servicios de terceros</h2>
              <p className="mb-4">
                La atención corresponde al personal autorizado del titular. El sitio utiliza las siguientes
                integraciones, cada una con el papel indicado (encargado del tratamiento o destinatario):
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Google Analytics:</strong> analítica de navegación, identificadores y datos técnicos, solo con autorización analítica.</li>
                <li><strong>Google Sheets:</strong> sincronización y gestión de los registros de solicitudes y reclamos, incluidos sus datos y evidencia de consentimiento.</li>
                <li><strong>Meta Pixel:</strong> eventos de navegación o conversión y publicidad, solo con autorización de cookies de marketing.</li>
                <li><strong>WhatsApp:</strong> enlace externo que abre el usuario por iniciativa propia. Si envía un mensaje, WhatsApp trata los datos de contacto, el contenido y los datos técnicos de esa comunicación conforme a sus propias condiciones. Abrir el enlace no autoriza futuras promociones.</li>
                <li><strong>Alojamiento y nube:</strong> operación del sitio y almacenamiento de registros por <strong>Donweb (Dattatec.com SRL)</strong>, proveedor del servidor virtual privado (VPS) donde residen el sitio web y su base de datos principal.</li>
                <li><strong>Resend:</strong> envío de correos y copias de reclamaciones; puede recibir dirección del destinatario, contenido y adjuntos necesarios para el envío.</li>
                <li><strong>Cloudflare Turnstile:</strong> comprobación antiautomatización cuando está configurada, con token, IP y datos técnicos necesarios para la verificación.</li>
                <li><strong>OpenStreetMap:</strong> solicitud de teselas para mostrar el mapa; su servidor puede recibir la IP y datos técnicos de la petición. No es una autorización para marketing de contacto.</li>
                <li><strong>Autoridades competentes:</strong> documentación cuando exista un requerimiento u obligación aplicable, incluidos los relacionados con el Libro de Reclamaciones.</li>
              </ul>
            </section>

            <section id="transferencias" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">6. Transferencias internacionales y garantías</h2>
              <p className="mb-4">
                Informamos que, para la operación tecnológica del sitio web y la atención de solicitudes,
                realizamos flujo transfronterizo (transferencia internacional) de datos personales hacia
                servidores ubicados en los <strong>Estados Unidos de América</strong>, conforme a lo
                declarado e inscrito ante el Registro Nacional de Protección de Datos Personales
                (código de modificación <strong>MOD-2026-2174</strong>), a favor de los siguientes
                destinatarios y encargados del tratamiento:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Google LLC (Estados Unidos):</strong> para el respaldo documental en la nube (Google Sheets / Google Cloud) y, previo consentimiento, analítica web (Google Analytics 4).</li>
                <li><strong>Meta Platforms, Inc. / WhatsApp LLC (Estados Unidos):</strong> para la atención de comunicaciones iniciadas vía WhatsApp y, previo consentimiento, herramientas publicitarias (Meta Pixel).</li>
                <li><strong>Resend Inc. (Estados Unidos):</strong> para el despacho transaccional de correos electrónicos de confirmación y envío de constancias del Libro de Reclamaciones en PDF.</li>
                <li><strong>Cloudflare, Inc. (Estados Unidos):</strong> para la seguridad perimetral y prevención de envíos automatizados (Cloudflare Turnstile).</li>
                <li><strong>Donweb (Dattatec.com SRL):</strong> proveedor de infraestructura de servidor virtual privado (VPS) donde se aloja el sitio web y su base de datos principal.</li>
              </ul>
              <p className="mt-4">
                <strong className="text-deep-navy">Garantías aplicables:</strong> dichas transferencias se
                realizan al amparo del artículo 15 de la Ley N° 29733 y su Reglamento (D.S. N° 016-2024-JUS),
                habiéndose suscrito con cada proveedor los respectivos Acuerdos de Encargo de Tratamiento
                de Datos (Data Processing Addendum - DPA) y Cláusulas Contractuales Tipo, exigiendo
                estándares internacionales de seguridad de la información (certificaciones ISO/IEC 27001
                y SOC 2 Tipo II) que garantizan un nivel adecuado de protección equivalente al exigido
                por la legislación peruana.
              </p>
              <p className="mt-4">
                Adicionalmente, el mapa interactivo del sitio carga teselas gráficas desde los servidores
                de OpenStreetMap Foundation (Reino Unido/UE), los cuales reciben únicamente la dirección
                IP técnica necesaria para mostrar el mapa en su navegador; no se les transfiere la base
                de datos de prospectos.
              </p>
            </section>

            <section id="conservacion" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">7. Plazos de conservación por finalidad</h2>
              <p className="mb-4">
                Los datos personales no se conservan de forma indefinida una vez cumplida la finalidad
                del tratamiento. Los plazos aplicables, definidos conforme al dictamen legal, son los
                siguientes:
              </p>
              <div className="overflow-x-auto rounded-xl border border-black/10">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Plazos de conservación por finalidad</caption>
                  <thead className="bg-deep-navy text-white">
                    <tr>
                      <th scope="col" className="p-4 font-display">Finalidad</th>
                      <th scope="col" className="p-4 font-display">Plazo de conservación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retentionTerms.map(({ purpose, term }) => (
                      <tr key={purpose} className="border-t border-black/5">
                        <th scope="row" className="p-4 font-medium text-deep-navy align-top">{purpose}</th>
                        <td className="p-4 align-top">{term}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Revocar promociones o cookies detiene el tratamiento opcional correspondiente hacia el futuro;
                no implica borrar automáticamente registros sujetos a obligaciones de conservación ni los
                datos que terceros ya hayan recibido.
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
                las autorizaciones de acceso, las copias de respaldo y las medidas organizativas se verifican
                periódicamente. Los registros de auditoría del panel de administración se conservan dos (2) años
                y las sesiones expiran a las ocho (8) horas.
              </p>
            </section>

            <section id="derechos" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">9. Ejercicio de derechos ARCO y Portabilidad</h2>
              <p>
                El titular de los datos personales puede ejercer gratuitamente sus derechos de Información,
                Acceso, Rectificación, Cancelación, Oposición, Revocación del consentimiento y Portabilidad
                enviando una solicitud al correo electrónico
                {" "}<a href="mailto:holdingreynagaredes@gmail.com" className="text-primary font-bold hover:underline break-all">holdingreynagaredes@gmail.com</a>
                {" "}o presentándola físicamente en nuestro domicilio fiscal ubicado en Jr. Lino Nro. 132,
                Oficina 401, Huancayo Cercado, o en nuestra oficina de ventas en Av. San Agustín 154,
                San Carlos, Huancayo.
              </p>
              <p className="mt-4">
                <strong className="text-deep-navy">Responsable Interno de Atención:</strong> Gerencia General
                de HOLDING INVERSIONES REYNAGA S.A.C. (Sr. Jhon Arquimides Reynaga Soto).
              </p>
              <h3 className="font-display text-xl font-bold text-deep-navy mt-8 mb-4">Requisitos de verificación de identidad</h3>
              <p>
                Para proteger su privacidad y evitar accesos no autorizados por terceros, toda solicitud
                deberá contener: (i) nombres y apellidos completos del titular; (ii) número y copia simple o
                imagen legible de su DNI o Carné de Extranjería (y, de actuar mediante representante,
                vigencia de poder o carta poder con firma legalizada); (iii) descripción clara y precisa de
                los datos respecto de los cuales busca ejercer el derecho; y (iv) correo electrónico o
                dirección para recibir la respuesta. La revocación del consentimiento para fines publicitarios
                podrá realizarse de manera inmediata y sin requisitos adicionales mediante respuesta directa
                o enlace de baja.
              </p>
              <h3 className="font-display text-xl font-bold text-deep-navy mt-8 mb-4">Plazos máximos legales de atención</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Derecho de Información:</strong> máximo ocho (8) días hábiles contados desde el día siguiente de la presentación de la solicitud.</li>
                <li><strong>Derecho de Acceso y Portabilidad:</strong> máximo veinte (20) días hábiles contados desde el día siguiente de la presentación de la solicitud. La portabilidad se entrega en formato CSV.</li>
                <li><strong>Derechos de Rectificación, Cancelación, Oposición y Revocación:</strong> máximo diez (10) días hábiles contados desde el día siguiente de la presentación de la solicitud.</li>
              </ul>
              <p className="mt-4">
                Estos plazos son independientes de los quince (15) días hábiles del Libro de Reclamaciones.
                De considerar que no ha sido atendido en el ejercicio de sus derechos, puede presentar una
                reclamación ante la
                {" "}<a href="https://www.gob.pe/anpd" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">Autoridad Nacional de Protección de Datos Personales (ANPDP)</a>
                {" "}del Ministerio de Justicia y Derechos Humanos.
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
                <li><strong>Necesarias:</strong> recursos estrictamente necesarios para el funcionamiento, la seguridad y el recuerdo de la elección de privacidad. No se destinan a publicidad.</li>
                <li><strong>Analíticas, opcionales:</strong> Google Analytics mide visitas y eventos y puede tratar identificadores y datos técnicos. No se garantiza anonimato total. Solo se carga con consentimiento de la categoría analítica.</li>
                <li><strong>Marketing, opcionales:</strong> Meta Pixel mide eventos o conversiones y permite publicidad o audiencias. Solo se carga con consentimiento de la categoría de marketing.</li>
              </ul>
              <h3 className="font-display text-xl font-bold text-deep-navy mt-8 mb-4">Inventario de cookies y almacenamiento local</h3>
              <div className="overflow-x-auto rounded-xl border border-black/10">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Inventario de cookies y almacenamiento local</caption>
                  <thead className="bg-deep-navy text-white">
                    <tr>
                      <th scope="col" className="p-4 font-display">Nombre</th>
                      <th scope="col" className="p-4 font-display">Proveedor</th>
                      <th scope="col" className="p-4 font-display">Categoría</th>
                      <th scope="col" className="p-4 font-display">Duración</th>
                      <th scope="col" className="p-4 font-display">Propósito</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieInventory.map((c) => (
                      <tr key={c.name} className="border-t border-black/5">
                        <th scope="row" className="p-4 font-medium text-deep-navy align-top">{c.name}</th>
                        <td className="p-4 align-top">{c.provider}</td>
                        <td className="p-4 align-top">{c.category}</td>
                        <td className="p-4 align-top">{c.duration}</td>
                        <td className="p-4 align-top">{c.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Google Analytics y Meta Pixel no se cargan sin consentimiento de su categoría correspondiente.
                Puede aceptar todas las categorías, elegir solo las necesarias o personalizar analítica y
                marketing por separado. Rechazar las categorías opcionales no impide leer las páginas legales,
                consultar el proyecto o descargar el dossier público.
              </p>
              <p className="mt-4">
                La preferencia de este navegador se guarda en <code className="text-deep-navy">localStorage</code>,
                junto con la fecha de la decisión y la versión de la política ({PRIVACY_POLICY_VERSION}), con
                una vigencia de doce (12) meses; transcurrido ese plazo se solicita nuevamente la preferencia.
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
            </section>

            <section id="version" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">11. Publicación y cambios de versión</h2>
              <p>
                Versión: <strong>{PRIVACY_POLICY_VERSION}</strong>. Fecha de publicación:
                {" "}<time dateTime={PRIVACY_POLICY_DATE}>{PRIVACY_POLICY_DATE}</time>. Cada consentimiento
                registrado por los formularios queda asociado a la versión vigente en el momento del envío,
                junto con el texto mostrado y la fecha de recepción. La lectura de una nueva versión no
                constituye consentimiento. Los cambios de finalidades opcionales se comunican y, cuando
                corresponda, requieren una nueva autorización específica; el consentimiento de cookies se
                solicita nuevamente al publicar una nueva versión de las categorías o al cumplir su
                vigencia de doce (12) meses.
              </p>
            </section>

            <section id="normativa" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-black text-deep-navy tracking-tight mb-6">12. Normativa y documentos relacionados</h2>
              <p>
                El marco de referencia es la <strong>Ley N° 29733, Ley de Protección de Datos Personales</strong>,
                y su Reglamento, aprobado por el
                {" "}<a href="https://www.gob.pe/institucion/anpd/normas-legales/6554453-n-016-2024-jus" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">D.S. N° 016-2024-JUS (fuente oficial ANPD)</a>.
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
