import Link from "next/link";
import { ArrowLeft, Shield, Lock, FileText, Scale, Eye, Phone } from "lucide-react";

export const metadata = {
  title: "Términos y Condiciones | Torres Titanium Huancayo",
  description: "Términos, condiciones y políticas de privacidad de Torres Titanium y Holding Inversiones Reynaga S.A.C.",
};

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface">
      {/* Header Space */}
      <div className="bg-deep-navy pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-primary transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Link>
          <h1 className="text-display font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter leading-[1.1]">
            Términos, Condiciones y <span className="text-primary">Privacidad</span>
          </h1>
          <p className="mt-6 text-white/50 font-medium text-sm tracking-widest uppercase">
            Última actualización: {currentDate}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 max-w-4xl py-16 md:py-24">
        <div className="bg-white rounded-3xl shadow-architectural border border-black/5 p-8 md:p-12 lg:p-16">
          <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-deep-navy prose-p:font-body prose-p:text-deep-navy/70 prose-strong:text-deep-navy">
            
            <p className="text-lg leading-relaxed mb-12">
              Bienvenido al sitio web del proyecto inmobiliario <strong>Torres Titanium</strong>. Al acceder y navegar en este sitio web, usted acepta cumplir con los siguientes Términos y Condiciones y nuestra Política de Privacidad. Si no está de acuerdo con alguna parte de estos términos, le rogamos que no utilice nuestro sitio web.
            </p>

            <div className="space-y-16">
              {/* Section 1 */}
              <section id="informacion-general">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">1. INFORMACIÓN GENERAL DE LA EMPRESA</h2>
                </div>
                <p>
                  Este sitio web y el proyecto "Torres Titanium" son desarrollados y administrados por <strong>HOLDING INVERSIONES REYNAGA S.A.C.</strong>, empresa debidamente constituida bajo las leyes de la República del Perú, identificada con <strong>RUC N° 20614870959</strong>, con domicilio legal en Jr. Lino Nro. 132, Oficina 401 (a 1 Cdra del Parque Grau), Huancayo Cercado, provincia de Huancayo, departamento de Junín.
                </p>
                <p>
                  El propósito de este sitio es brindar información comercial sobre la venta y preventa de los departamentos del proyecto ubicado en la <strong>Av. San Agustín 154, San Carlos, Huancayo</strong>.
                </p>
              </section>

              {/* Section 2 */}
              <section id="naturaleza-informacion">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">2. NATURALEZA DE LA INFORMACIÓN INMOBILIARIA (IMÁGENES REFERENCIALES)</h2>
                </div>
                <p>
                  Toda la información visual y textual contenida en este sitio web, incluyendo de manera enunciativa pero no limitativa: imágenes, renders, fotografías, videos, recorridos 360°, planos, diseño de interiores, metrajes y descripciones de áreas comunes, son estrictamente de carácter referencial y constituyen una representación artística e ilustrativa del proyecto.
                </p>
                <p>
                  Las imágenes pueden mostrar mobiliario, equipamiento o acabados que no están incluidos en la entrega final del inmueble o que podrían sufrir modificaciones por razones técnicas o arquitectónicas durante la obra.
                </p>
                <p>
                  Los precios anunciados (ej. precios de preventa) y las condiciones de reserva (ej. separación con S/ 1,000) están sujetos a disponibilidad, variaciones del mercado y pueden ser modificados por la empresa sin previo aviso.
                </p>
                <p>
                  Las características definitivas, exactas y vinculantes del inmueble (así como los acabados finales) serán única y exclusivamente las que se estipulen de manera expresa en el contrato de compraventa y en las especificaciones técnicas suscritas entre las partes.
                </p>
              </section>

              {/* Section 3 */}
              <section id="privacidad">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">3. POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS PERSONALES</h2>
                </div>
                <p>
                  En cumplimiento estricto de la <strong>Ley N° 29733</strong>, Ley de Protección de Datos Personales del Perú, y su Reglamento, informamos cómo recopilamos y procesamos su información:
                </p>
                
                <h3 className="text-xl font-bold mt-8 mb-4">3.1. Recopilación y Almacenamiento:</h3>
                <p>
                  Los datos personales proporcionados voluntariamente a través de nuestro formulario de "Contáctanos" y del <strong>Libro de Reclamaciones Virtual</strong> serán almacenados en el banco de datos de clientes de HOLDING INVERSIONES REYNAGA S.A.C.. Para fines de gestión comercial, esta información será sincronizada en una base de datos segura y un archivo Excel compartido en la nube, con acceso restringido exclusivamente a nuestro equipo de ventas y marketing. Las hojas de reclamación constituyen, además, registros legales sujetos al Código de Protección y Defensa del Consumidor que pueden ser requeridos por INDECOPI.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">3.2. Finalidad del Tratamiento:</h3>
                <p>Sus datos se utilizarán para:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Contactarlo vía WhatsApp, llamada o correo para brindarle información del proyecto Torres Titanium.</li>
                  <li>Enviar cotizaciones, promociones, condiciones de financiamiento y avances de obra.</li>
                  <li>Fines analíticos y estadísticos internos.</li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4">3.3. Derechos ARCO:</h3>
                <p>
                  Usted puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición sobre sus datos personales comunicándose al número oficial <strong>981407634</strong>, enviando un correo a <strong>holdingreynagaredes@gmail.com</strong> o enviando una solicitud a nuestro domicilio legal en Jr. Lino Nro. 132, Oficina 401, Huancayo.
                </p>
              </section>

              {/* Section 4 */}
              <section id="cookies">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">4. POLÍTICA DE COOKIES Y HERRAMIENTAS DE TERCEROS</h2>
                </div>
                <p>Para optimizar nuestro contenido y ofrecer publicidad relevante, este sitio web utiliza las siguientes categorías de cookies:</p>
                <ul className="list-disc pl-6 space-y-4 mb-6">
                  <li><strong>4.1. Cookies necesarias:</strong> Imprescindibles para el funcionamiento básico del sitio (navegación, formularios, seguridad). No requieren su consentimiento y no pueden desactivarse.</li>
                  <li><strong>4.2. Análisis y estadísticas (Google Analytics):</strong> Recopila información estadística anónima sobre el comportamiento de los usuarios (páginas visitadas, tiempo, dispositivo) para mejorar el rendimiento de nuestra web.</li>
                  <li><strong>4.3. Marketing y publicidad (Píxel de Facebook/Meta):</strong> Utiliza cookies para rastrear conversiones desde anuncios en redes sociales y construir audiencias de remarketing. Esto nos permite mostrarle publicidad de Torres Titanium basada en su interés previo.</li>
                  <li><strong>4.4. Gestión de su consentimiento:</strong> Al visitar el sitio por primera vez, puede elegir qué categorías aceptar ("Aceptar todo", "Solo necesarias" o "Personalizar preferencias"). Puede modificar su elección en cualquier momento desde el enlace <strong>"Preferencias de Cookies"</strong> al pie de esta página. Si lo prefiere, también puede configurar su navegador para bloquear estas cookies, aunque esto podría afectar el funcionamiento de elementos interactivos (como mapas o renders 360°).</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="libro-reclamaciones">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">5. LIBRO DE RECLAMACIONES VIRTUAL</h2>
                </div>
                <p>
                  En cumplimiento del <strong>Código de Protección y Defensa del Consumidor (Ley N° 29571)</strong> y su Reglamento (<strong>D.S. N° 011-2011-PCM</strong>), ponemos a su disposición nuestro <strong>Libro de Reclamaciones Virtual</strong>, accesible en <Link href="/libro-de-reclamaciones" className="text-primary font-bold hover:underline">este enlace</Link> y desde el pie de página de este sitio.
                </p>
                <ul className="list-disc pl-6 space-y-3 mb-6">
                  <li><strong>Reclamo:</strong> disconformidad relacionada al producto o servicio (p. ej., el departamento adquirido, la reserva, la información entregada).</li>
                  <li><strong>Queja:</strong> disconformidad no relacionada al producto o servicio, sino a la atención al público.</li>
                  <li>Al registrar su hoja, recibirá de forma inmediata una <strong>copia en PDF con un código correlativo único</strong>, descargable y remitida a su correo electrónico.</li>
                  <li>Nuestro equipo atenderá su hoja en un plazo máximo de <strong>quince (15) días hábiles, improrrogables</strong>, mediante respuesta escrita al correo electrónico declarado.</li>
                  <li>El registro de su hoja no impide ni sustituye su derecho de acudir a <strong>INDECOPI</strong> o a la Sala de Defensa del Consumidor competente en cualquier momento.</li>
                  <li>Nuestra sala de ventas (Av. San Agustín 154, San Carlos, Huancayo) cuenta adicionalmente con un <strong>Libro de Reclamaciones físico</strong> de respaldo y el aviso oficial correspondiente.</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section id="propiedad-intelectual">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">6. PROPIEDAD INTELECTUAL</h2>
                </div>
                <p>
                  Todos los contenidos de esta página web (textos, logotipos, renders, videos y código) son propiedad exclusiva de <strong>HOLDING INVERSIONES REYNAGA S.A.C.</strong> y están protegidos por las leyes de propiedad intelectual en Perú. Queda prohibida su reproducción sin autorización expresa.
                </p>
              </section>

              {/* Section 7 */}
              <section id="jurisdiccion">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">7. JURISDICCIÓN</h2>
                </div>
                <p>
                  Cualquier controversia que surja del uso de este sitio web será sometida a la jurisdicción de los jueces y tribunales de la ciudad de <strong>Huancayo, Junín, Perú</strong>.
                </p>
              </section>

              {/* Section 8 */}
              <section id="contacto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight">8. CONTACTO OFICIAL</h2>
                </div>
                <ul className="list-none p-0 space-y-4">
                  <li><strong>Teléfono / WhatsApp de Ventas:</strong> 981407634</li>
                  <li><strong>Correo Electrónico:</strong> holdingreynagaredes@gmail.com</li>
                  <li><strong>Sala de Ventas / Proyecto:</strong> Av. San Agustín 154, San Carlos, Huancayo.</li>
                  <li><strong>Oficina Administrativa:</strong> Jr. Lino Nro. 132, Oficina 401, Huancayo Cercado.</li>
                </ul>
              </section>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
