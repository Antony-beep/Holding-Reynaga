import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SHEET = 'https://docs.google.com/spreadsheets/d/1Zj5zmNQlGuD6tOkwADf6yeFVt21R8GOEVt5mZDnILjo/'
GERENTE = 'REYNAGA SOTO, JHON ARQUIMIDES'


def p(text): return {'type': 'p', 'text': text}
def h(text): return {'type': 'h2', 'text': text}
def note(text): return {'type': 'note', 'text': text}
def bullets(*items): return {'type': 'bullets', 'items': items}
def steps(*items): return {'type': 'steps', 'items': items}
def table(rows, widths=(0.25, 0.75)): return {'type': 'table', 'widths': widths, 'rows': rows}
def pic(file, caption, width=1, source='manual'):
    return {'type': 'image', 'source': source, 'file': file, 'width': width, 'caption': caption}
def page(kicker, title, subtitle, *blocks):
    return {'kicker': kicker, 'title': title, 'subtitle': subtitle, 'blocks': blocks}


pages = [
    page('ENTREGA · 01', 'Torres Titanium', 'Aplicación web · Holding Inversiones Reynaga S.A.C.',
         p('Sitio inmobiliario y panel privado para presentar departamentos, captar prospectos, organizar el seguimiento comercial y atender reclamos.'),
         table([
             ['Entrega', 'Referencia'],
             ['Gerente receptor', GERENTE],
             ['Documento', '12 de noviembre de 2026 · Versión 1.1 · Uso interno'],
             ['Sitio web', 'https://inmobiliariaholdingreynaga.com'],
             ['Panel privado', 'https://inmobiliariaholdingreynaga.com/admin'],
             ['Atención comercial', '+51 981 407 634 · holdingreynagaventas@gmail.com'],
         ]),
         h('Alcance entregado'),
         bullets('Catálogo, galería, videos, recorridos 360°, contacto y descarga de información del proyecto.',
                 'Panel de Leads, Redes Sociales, Reclamos y Usuarios, con permisos por rol y auditoría.',
                 'Integración con Google Sheets y Resend; captcha Turnstile, límites de solicitudes, SEO y recursos para agentes de IA.'),
         pic('p05-img01.jpg', 'Figura 1. Acceso con usuario y contraseña. Captura extraída del manual aportado, página 5.', 0.70),
         note('El responsable del proyecto confirma el funcionamiento de la aplicación y de la sincronización. La presente actualización se basa en esa confirmación, el manual adjunto y el código local; no constituye una nueva prueba en producción.')),

    page('PANEL COMERCIAL · 02', 'Leads, usuarios y permisos', 'Operación de gerencia y ventas',
         table([
             ['Rol', 'Permisos'],
             ['Admin', 'Operación completa, borrado de leads, gestión de filas en Sheets, usuarios, configuración del Libro y feriados.'],
             ['Operador', 'Estados, notas, registro o revocación de consentimiento comercial, exportación CSV, respuestas a reclamos y publicaciones sociales.'],
             ['Lectura', 'Consulta de leads, reclamos y redes; sin edición ni exportación.'],
         ]),
         pic('p16-img02.jpg', 'Figura 2. Métricas, búsqueda y exportación CSV. Manual aportado, página 16.', 0.77),
         steps('Buscar el lead por nombre, correo o teléfono; abrir su detalle para leer el mensaje y registrar notas.',
               'Actualizar avance: Nuevo → Contactado → Calificado → Visita agendada → Reservado; usar Descartado cuando corresponda.',
               'Confirmar la separación fuera del sistema antes de marcar Reservado. El formulario no cobra ni formaliza la reserva.'),
         pic('p32-img01.jpg', 'Figura 3. Usuarios individuales, roles y estado de acceso. Manual aportado, página 32.', 0.85),
         note('Cada persona utiliza su cuenta. La sesión dura 8 horas; desactivar una cuenta o restablecer su contraseña revoca sus sesiones. Las acciones sensibles quedan en auditoría.')),

    page('ATENCIÓN AL CONSUMIDOR · 03', 'Libro de Reclamaciones', 'Registro, respuesta y seguimiento desde el panel',
         p('El formulario público registra el caso, asigna un código y genera una hoja PDF. El panel conserva datos, borrador, respuesta y estado; calcula el vencimiento con el calendario configurado.'),
         pic('p24-img01.jpg', 'Figura 4. Detalle de un caso, borrador y botones de envío. Manual aportado, página 24.', 0.69),
         steps('Abrir Reclamos y priorizar los casos según el semáforo de vencimiento.',
               'Redactar la respuesta e identificar al responsable. Guardar borrador conserva el texto sin enviarlo.',
               'Pulsar Enviar respuesta por email y confirmar. Resend envía la respuesta con la hoja PDF y registra fecha e identificador.',
               'Revisar el envío y marcar ATENDIDO al cerrar el caso. Si falla, volver a enviar la respuesta desde el panel y comprobar el resultado en Resend; Reenviar copia envía la hoja, no sustituye la respuesta.'),
         bullets('Los reclamos se conservan: no se eliminan; pueden anularse con motivo y reabrirse.',
                 'Guía de Reclamos ofrece ayuda dentro del panel. Admin mantiene feriados, destinatario de avisos y correo de prueba.'),
         note('El identificador de Resend acredita aceptación por el proveedor, no lectura ni recepción final. El estado del panel no sustituye el seguimiento del equipo responsable.')),

    page('INTEGRACIONES · 04', 'Resend y Google Sheets', 'Correos transaccionales y copia operativa',
         table([
             ['Servicio', 'Uso en la aplicación'],
             ['Resend', 'Aviso al equipo por lead o reclamo; copia de la hoja al consumidor; respuesta formal con PDF adjunto; correo de prueba.'],
             ['Configuración de correo', 'Clave API privada, remitente del dominio y destinatario de avisos. Las respuestas a los correos de reclamos se dirigen al correo configurado del equipo.'],
         ]),
         pic('p36-img01.jpg', 'Figura 5. Aviso de un caso recibido por correo. Manual aportado, página 36.', 0.78),
         h('Hoja operativa de la empresa'),
         {'type': 'link', 'text': 'Abrir Google Sheets de Holding Reynaga', 'url': SHEET},
         p('Leads y reclamos se registran primero en SQLite y después se replican a Google Sheets. La hoja conserva la copia inicial: los cambios de estados, notas y respuestas se consultan en el panel. Soporte revisa los reintentos si hay pendientes.'),
         pic('p37-img01.jpg', 'Figura 6. Registros sincronizados en Sheets. Manual aportado, página 37.', 0.90),
         note('Eliminar un lead local no borra su fila en Sheets. La hoja es una copia operativa, no una restauración completa del sistema. Mantener sus permisos restringidos al equipo autorizado.')),

    page('VISIBILIDAD Y MEDICIÓN · 05', 'Optimizaciones SEO', 'Descubrimiento del proyecto y medición de contactos',
         table([
             ['Optimización', 'Aplicación'],
             ['SEO local y contenido', 'Páginas para Huancayo, San Carlos y tipologías; fichas de departamentos y guías con ubicación real del proyecto.'],
             ['Metadatos y enlaces', 'Títulos y descripciones por página, URL canónica, Open Graph y tarjetas para compartir.'],
             ['Rastreo', 'Sitemap y robots.txt; el panel privado no se indexa. Los recorridos 360° llevan noindex por decisión del proyecto.'],
             ['Datos estructurados', 'JSON-LD de empresa, proyecto, apartamentos/ofertas, preguntas frecuentes y navegación.'],
         ]),
         h('Google Analytics 4 y Meta Pixel'),
         p('GA4 mide navegación y el evento generate_lead; Meta Pixel registra Lead tras un envío exitoso. Cada servicio se carga según el consentimiento de su categoría: análisis o marketing.'),
         pic('image9.png', 'Figura 7. Actividad registrada en GA4. Captura del documento Holding.docx.', 0.93, 'original'),
         note('Search Console permite seguir indexación y errores. Estas optimizaciones facilitan descubrimiento y medición; no garantizan posiciones en Google. Los recorridos 360° se usan para explorar el inmueble, sin exigir su presencia en los resultados de búsqueda.')),

    page('SEGURIDAD Y AGENTES · 06', 'Protección y acceso para IA', 'Controles implementados y consulta de información pública',
         h('Cloudflare Turnstile y rate limit'),
         p('Cloudflare se utiliza exclusivamente para Turnstile. El servidor verifica su token en los formularios públicos antes de admitir el registro.'),
         table([
             ['Control', 'Límite configurado en el código'],
             ['Leads por IP', '3 intentos cada 5 minutos.'],
             ['Reclamos por IP', '5 solicitudes por hora.'],
             ['Documento + correo', '3 envíos cada 10 minutos por combinación, en el control compartido de formularios.'],
             ['Acceso al panel', 'Bloqueo tras 5 fallos en una ventana de 15 minutos, por IP y por usuario.'],
             ['Recepción de redes', '10 solicitudes por hora e IP; envío autenticado con secreto.'],
         ]),
         p('Se añaden validación de campos, detección de envíos automatizados, comprobación del tamaño declarado y cabeceras de seguridad. Nota técnica: los límites usan memoria del proceso; se reinician con él y no se comparten entre instancias.'),
         h('Optimización para agentes de IA'),
         table([
             ['Recurso', 'Finalidad'],
             ['/llms.txt y /pricing.md', 'Resumen del proyecto y precios en texto estructurado, fácil de consultar.'],
             ['/api/apartments', 'Consulta pública de solo lectura: tipologías, área, precios y enlaces.'],
             ['Catálogos de capacidades', '/.well-known/ai-catalog.json y /.well-known/api-catalog anuncian recursos de contenido y API.'],
             ['Markdown por petición', 'Inicio y fichas de departamentos responden en Markdown cuando el agente solicita Accept: text/markdown.'],
             ['WebMCP', 'Herramientas para listar departamentos, consultar una tipología y obtener contacto de ventas, en navegadores compatibles.'],
         ]),
         note('Los agentes consultan información pública: no acceden al panel ni a datos de clientes mediante estas herramientas. JSON-LD, enlaces de descubrimiento y contenido textual ayudan a interpretar el proyecto; no garantizan menciones en asistentes de IA.')),

    page('REDES SOCIALES · 07', 'Actualización con Decodo', 'Publicaciones automáticas y respaldo manual',
         p('El proceso de redes consulta publicaciones públicas de TikTok, Instagram y Facebook. Cuando existe clave configurada, intenta primero Decodo Web Data API para obtener HTML renderizado; si falla, utiliza el navegador local de respaldo.'),
         pic('p19-img01.jpg', 'Figura 8. Administración de publicaciones automáticas y manuales. Manual aportado, página 19.', 0.60),
         bullets('Programación documentada: diaria a las 19:00, tarea TorresTitanium-ScrapSocial en Windows. La PC envía publicaciones, miniaturas y estado de conectores al VPS por HTTPS con autenticación.',
                 'El panel permite revisar la salud de cada red, agregar una publicación manual y eliminarla cuando corresponda.',
                 'Decodo es una dependencia de obtención de contenido, no de envío de correos ni de almacenamiento de leads.'),
         pic('p21-img02.jpg', 'Figura 9. Indicadores de salud por conector. Manual aportado, página 21.', 0.90),
         note('La continuidad depende de la PC, la tarea programada, la clave y disponibilidad de Decodo, y los cambios de las redes de origen. Ante un fallo, revisar conectores y logs; usar la publicación manual como respaldo.')),

    page('CONTINUIDAD Y RECEPCIÓN · 08', 'Operación y transferencia', 'Responsabilidades posteriores a la entrega',
         pic('image7.png', 'Figura 10. Dominio en Donweb: vencimiento 10/05/2027 según la captura aportada en Holding.docx.', 0.78, 'original'),
         table([
             ['Componente', 'Operación'],
             ['Aplicación', 'Next.js 16.2.3, React 19 y TypeScript; alojamiento en VPS según la guía del proyecto.'],
             ['Datos', 'SQLite en data/leads.db por defecto; ubicación ajustable con HOLDING_DATA_DIR. Incluir archivos persistentes y configuración en el plan de respaldo.'],
             ['Servicios externos', 'Conservar acceso empresarial a Donweb/VPS, Google, Resend, Turnstile, Decodo y Meta. Las claves se transfieren por canal seguro.'],
         ]),
         h('Mantenimiento esencial'),
         bullets('Diario: atender leads y reclamos. Semanal: revisar pendientes a Sheets y conectores de redes.',
                 'Personal: asignar cuentas individuales y desactivar accesos al salir del equipo. Renovaciones: controlar dominio, VPS y servicios.',
                 'Soporte: realizar respaldos consistentes fuera del VPS y probar restauración. Antes de actualizar, revisar tipos, lint, build y flujos principales.',
                 'Gerencia: mantener datos comerciales, permisos de la hoja y calendario de feriados. Confirmar soporte y revisión de la documentación cuando cambien funciones.'),
         h('Recepción documental'),
         p(f'Gerente receptor: {GERENTE}'),
         p('Cargo: Gerente responsable · Holding Inversiones Reynaga S.A.C.'),
         p('Soporte técnico / contacto: __________________________________'),
         p('Responsable de respaldos, renovaciones y PC de redes: ______________'),
         p('Fecha de recepción: __________________   Firma: __________________'),
         note('La firma registra recepción; no se da por suscrita en este documento. Soporte y alcance de mantenimiento se acuerdan con el responsable técnico. Sustituir claves y contraseñas que hayan circulado en documentos previos.'),
         {'type': 'small', 'text': 'Fuentes: Holding.docx; Manual-Panel-Admin-Torres-Titanium-compressed.pdf; confirmaciones del responsable; código local de SEO, formularios, autenticación, correo, sincronización, redes y recursos de IA. Las capturas se extraen de los documentos aportados.'}),
]

data = {'title': 'Torres Titanium | Documento de entrega', 'date': '12 de noviembre de 2026',
        'version': '1.1', 'pages': pages}
(ROOT / 'contenido.json').write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
print('Contenido actualizado:', len(pages), 'páginas')
