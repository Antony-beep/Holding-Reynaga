import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, FileText, Scale, Eye, Phone } from "lucide-react";
import LegacyPrivacyRedirect from "@/components/global/LegacyPrivacyRedirect";
import {
  LEGAL_REVIEW_MARKER,
  PRIVACY_POLICY_DATE,
  PRIVACY_POLICY_VERSION,
  RESERVATION_PRICE_CLAUSE,
} from "@/lib/privacy";

const description = "Borrador de términos del sitio de Holding Inversiones Reynaga S.A.C.: información comercial, solicitudes de reserva y derechos del consumidor.";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description,
  alternates: { canonical: "/terminos-y-condiciones" },
  openGraph: {
    title: "Términos y Condiciones | Holding Reynaga",
    description,
    url: "/terminos-y-condiciones",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Términos y Condiciones | Holding Reynaga",
    description,
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-surface">
      <LegacyPrivacyRedirect />
      {/* Header Space */}
      <div className="bg-deep-navy pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-primary transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Link>
          <h1 className="text-display font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter leading-[1.1]">
            Términos y <span className="text-primary">Condiciones</span>
          </h1>
          <p className="mt-6 text-white/50 font-medium text-sm tracking-widest uppercase">
            Publicación del borrador: <time dateTime={PRIVACY_POLICY_DATE}>{PRIVACY_POLICY_DATE}</time> · Versión {PRIVACY_POLICY_VERSION}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 max-w-4xl py-16 md:py-24">
        <div className="bg-white rounded-3xl shadow-architectural border border-black/5 p-8 md:p-12 lg:p-16">
          <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-deep-navy prose-p:font-body prose-p:text-deep-navy/70 prose-strong:text-deep-navy">
            
            <p className="text-lg leading-relaxed mb-6">
              Este documento describe los términos del sitio informativo de <strong>Torres Titanium</strong>. Navegar no equivale a formalizar una reserva o compraventa ni a consentir promociones o cookies opcionales. Puede consultar el sitio y descargar el dossier público sin aceptar esas finalidades opcionales. El tratamiento de datos se explica por separado en la <Link href="/politica-de-privacidad" className="text-primary font-bold hover:underline">Política de Privacidad</Link>.
            </p>
            <p className="rounded-2xl border border-primary/25 bg-primary/5 p-5 text-sm leading-relaxed mb-12">
              <strong>Borrador de textos legales.</strong> Los campos entre dobles corchetes y las condiciones pendientes no están acreditados ni aprobados. {LEGAL_REVIEW_MARKER}.
            </p>

            <div className="space-y-16">
              {/* Section 1 */}
              <section id="informacion-general" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">1. INFORMACIÓN GENERAL DE LA EMPRESA</h2>
                </div>
                <p>
                  El titular de este sitio es <strong>HOLDING INVERSIONES REYNAGA S.A.C.</strong>, identificado con <strong>RUC N° 20614870959</strong>, datos confirmados por el titular del proyecto. Domicilio legal: <strong>[[DOMICILIO LEGAL COMPLETO]]</strong>. Su acreditación está pendiente; las direcciones comerciales publicadas no sustituyen esa verificación. {LEGAL_REVIEW_MARKER}.
                </p>
                <p>
                  El propósito de este sitio es brindar información comercial sobre la venta y preventa de los departamentos del proyecto ubicado en la <strong>Av. San Agustín 154, San Carlos, Huancayo</strong>.
                </p>
              </section>

              {/* Section 2 */}
              <section id="naturaleza-informacion" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">2. NATURALEZA DE LA INFORMACIÓN INMOBILIARIA (IMÁGENES REFERENCIALES)</h2>
                </div>
                <p>
                  Las imágenes, renders, videos y recorridos 360° ilustran el proyecto. Los planos, áreas, acabados y descripciones deben contrastarse con la información y documentación entregadas antes de contratar. El carácter ilustrativo de una imagen no elimina los derechos del consumidor ni permite desconocer información comercial vinculante. {LEGAL_REVIEW_MARKER}.
                </p>
                <p>
                  Las imágenes pueden mostrar mobiliario o equipamiento de ambientación. Su inclusión y cualquier diferencia respecto de la entrega deben informarse antes de contratar y quedar reflejadas en la documentación aplicable. El alcance de esta precisión requiere revisión legal. {LEGAL_REVIEW_MARKER}.
                </p>
              <h3 id="condiciones-de-reserva" className="text-xl font-bold mt-8 mb-4 scroll-mt-32">Precios, bonos y solicitudes de reserva</h3>
              <p>{RESERVATION_PRICE_CLAUSE}</p>
              <p className="mt-4">
                <strong>La separación funciona así:</strong> el cliente paga S/ 1,000 y se firma una
                <em> Constancia de Separación del Departamento</em> que indica el precio de venta, el monto
                de separación, el número de departamento, el área y la fecha. A partir de ese momento:
                el precio queda congelado, la unidad se retira de la oferta a otros clientes, y se elabora
                un cronograma de pago del 10% del valor del departamento, acorde a los ingresos mensuales
                del cliente. Sin cargos adicionales. La devolución del monto de separación se rige por las
                cláusulas del contrato notarial.
              </p>
              <p className="mt-4">
                <strong>Enviar el formulario de este sitio web únicamente solicita atención, una cotización o información para una reserva.</strong>{" "}
                No formaliza la separación, no cobra S/ 1,000, no firma la Constancia de Separación y no
                confirma automáticamente la disponibilidad de una unidad. La separación se formaliza
                presencialmente con el equipo de ventas.
              </p>
              <p className="mt-4">
                Los bonos publicados de preventa deben confirmarse para la unidad y la vigencia aplicables, incluida su forma de aplicación al precio. El régimen del descuento y sus condiciones no se declaran acreditados por este borrador. {LEGAL_REVIEW_MARKER}.
              </p>
              <p className="mt-4">
                Las características y los acabados de la unidad deben detallarse en la documentación comercial y contractual, sin limitar los derechos reconocidos al consumidor. {LEGAL_REVIEW_MARKER}.
              </p>
              </section>

              {/* Section 3 */}
              <section id="privacidad" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">3. AVISO: LA POLÍTICA DE PRIVACIDAD TIENE SU PROPIA PÁGINA</h2>
                </div>
                <p>
                  La información sobre datos personales se ha trasladado a la <Link href="/politica-de-privacidad" className="text-primary font-bold hover:underline">Política de Privacidad</Link>. Este enlace está disponible también sin JavaScript. La antigua ancla se conserva para que los enlaces existentes sigan ofreciendo acceso al documento correcto.
                </p>
              </section>

              {/* Section 4 */}
              <section id="cookies" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">4. AVISO: LA POLÍTICA DE COOKIES SE HA TRASLADADO</h2>
                </div>
                <p>
                  Consulte la <Link href="/politica-de-privacidad#cookies" className="text-primary font-bold hover:underline">Política de Cookies</Link> dentro de la nueva página de privacidad. Este enlace funciona sin JavaScript; la gestión interactiva de preferencias se ofrece por separado en el pie del sitio.
                </p>
              </section>

              {/* Section 5 */}
              <section id="libro-reclamaciones" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">5. LIBRO DE RECLAMACIONES VIRTUAL</h2>
                </div>
                <p>
                  El <Link href="/libro-de-reclamaciones" className="text-primary font-bold hover:underline">Libro de Reclamaciones Virtual</Link> permite registrar reclamos y quejas. Su marco de referencia es la <strong>Ley N° 29571</strong> y el <strong>D.S. N° 011-2011-PCM</strong>, modificado por el <a href="https://busquedas.elperuano.pe/dispositivo/NL/2095978-1" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">D.S. N° 101-2022-PCM (fuente oficial)</a>. Esta referencia no constituye una certificación de cumplimiento del sistema.
                </p>
                <ul className="list-disc pl-6 space-y-3 mb-6">
                  <li><strong>Reclamo:</strong> disconformidad relacionada al producto o servicio (p. ej., el departamento adquirido, la reserva, la información entregada).</li>
                  <li><strong>Queja:</strong> disconformidad no relacionada al producto o servicio, sino a la atención al público.</li>
                  <li>Tras registrar la hoja, puede descargar una <strong>copia en PDF con un código correlativo</strong>. El sistema contempla también su envío al correo indicado; si no la recibe, puede consultar por los canales publicados.</li>
                  <li>La obligación legal es responder reclamos y quejas por escrito en un plazo no mayor de <strong>quince (15) días hábiles, improrrogables</strong>, conforme a la normativa citada. La modalidad de comunicación y el procedimiento operativo deben revisarse. {LEGAL_REVIEW_MARKER}.</li>
                  <li>El registro de su hoja no impide ni sustituye su derecho de acudir a <strong>INDECOPI</strong> o a las autoridades competentes.</li>
                  <li>La declaración del reclamante versa sobre la veracidad de la información y la lectura de la política para atender su hoja, no sobre aceptar términos comerciales. Las promociones son opcionales y no condicionan el reclamo o la queja.</li>
                  <li>La disponibilidad del libro físico de respaldo y del aviso en el punto de atención debe confirmarse. {LEGAL_REVIEW_MARKER}.</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section id="propiedad-intelectual" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">6. PROPIEDAD INTELECTUAL</h2>
                </div>
                <p>
                  Los contenidos del sitio pueden estar sujetos a derechos del titular o de terceros. Su reproducción debe respetar las autorizaciones, licencias y usos permitidos por la normativa aplicable. La titularidad y las licencias de textos, logotipos, renders, videos y código deben verificarse; no se declara propiedad exclusiva sobre recursos de terceros. {LEGAL_REVIEW_MARKER}.
                </p>
              </section>

              {/* Section 7 */}
              <section id="jurisdiccion" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">7. JURISDICCIÓN</h2>
                </div>
                <p>
                  Se toma como marco la legislación peruana. Estos términos no excluyen el acceso a INDECOPI, a la ANPD ni a los órganos judiciales competentes, ni limitan los derechos irrenunciables del consumidor. La competencia y las condiciones aplicables a una contratación deben precisarse en los documentos correspondientes. {LEGAL_REVIEW_MARKER}.
                </p>
              </section>

              {/* Section 8 */}
              <section id="contacto" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">8. CANALES DE CONTACTO PUBLICADOS</h2>
                </div>
                <ul className="list-none p-0 space-y-4">
                  <li><strong>Teléfono de Ventas:</strong> <a href="tel:+51981407634" className="text-primary font-bold hover:underline">981407634</a>. Los enlaces a WhatsApp se abren por iniciativa del usuario.</li>
                  <li><strong>Correo Electrónico:</strong> <a href="mailto:holdingreynagaredes@gmail.com" className="text-primary font-bold hover:underline break-all">holdingreynagaredes@gmail.com</a>.</li>
                  <li><strong>Punto de atención / Proyecto publicado:</strong> Av. San Agustín 154, San Carlos, Huancayo.</li>
                  <li><strong>Domicilio legal:</strong> [[DOMICILIO LEGAL COMPLETO]]. {LEGAL_REVIEW_MARKER}.</li>
                  <li>La designación formal de estos canales para derechos de datos personales se detalla como pendiente en la <Link href="/politica-de-privacidad#derechos" className="text-primary font-bold hover:underline">Política de Privacidad</Link>. {LEGAL_REVIEW_MARKER}.</li>
                </ul>
              </section>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
