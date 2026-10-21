# Pendientes legales — Ley 29733 / Ley 29571

Checklist de brechas detectadas en la auditoría del sistema. Actualizado: 2026-10-18 (post-dictamen + respuestas del área de ventas).

## Estado general

- **Dictamen del abogado (17/10/2026): implementado** — política v2026-10-18.1, bases jurídicas, plazos de conservación, garantías de transferencia, ARCO + portabilidad, inventario de cookies, menores.
- **Respuestas del área de ventas (18/10/2026): aplicadas** — entrega octubre–diciembre 2027, estacionamiento aparte al contado, libro físico confirmado, Contrato de Arras como instrumento con el 10%.
- **Marcadores `[[REVISAR CON ABOGADO]]: eliminados de todo el sitio público.** La revisión legal ahora se hace por los documentos internos (dossier + este checklist), no por la web.
- **Regla de devolución bancaria del 100% (texto A del dictamen): RETIRADA** — la encargada de ventas confirmó que no existe en la operación y que no trabajan con bancos directamente. La web remite a las condiciones expresamente previstas en la Constancia de Separación (que sí las contiene).

## 🔴 PREGUNTAS PRIORITARIAS al área de ventas / gerencia

> Nota (18/10/2026, tarde): siguiendo el patrón de mercado (Ancosur), la web YA NO publica
> fechas ni stock de bonos — cada campaña se rige por sus propios términos. Las preguntas
> 2–5 son necesarias para la **Constancia física y el Contrato de Arras** (documentos de
> papel que revisa el abogado), NO para la web. La web está terminada sin ellas.

| # | Pregunta | Impacto |
|---|---|---|
| 1 | **Bonos (interna)**: definir por escrito los términos de cada campaña (programa Techo Propio / MiVivienda, vigencia, stock, montos por tipología) antes de anunciarla. La web ya remite a la cotización escrita. | Campaña/comercial; sin impacto web |
| 2 | **Congelamiento en días**: ¿cuántos días tiene el cliente desde que paga S/ 1,000? | Constancia física |
| 3 | **Desistimiento exacto**: "se da 500 soles" — ¿se devuelve el 50% del monto pagado? ¿En cuántos días? | Constancia física |
| 4 | **Incumplimiento reiterado**: ¿cuántas cuotas vencidas terminan el congelamiento? | Constancia física |
| 5 | **Cronograma del 10%**: ¿el 10% completo en 1 mes o cuotas mensuales desde el mes siguiente? | Constancia física |

## 🟡 Pendientes de datos del proyecto (Art. 77 y contratos)

| # | Tema | Responsable |
|---|---|---|
| 6 | Partida Electrónica SUNARP del terreno matriz | Gerencia / obras |
| 7 | N° de expediente/resolución de la licencia municipal de edificación | Gerencia / obras |
| 8 | Partida registral de la empresa en SUNARP Huancayo | Gerencia |
| 9 | Plantilla física de la Constancia de Separación (existe) — pedir copia para el abogado y actualizarla con imputación + reglas de devolución | Ventas → abogado |
| 10 | Plantilla del Contrato de Arras (ventas: "ahora es contrato arras con el 10%") — pedir copia para el abogado; confirma el nombre exacto del instrumento | Ventas → abogado |
| 11 | Precio de la plaza de estacionamiento y cuántas hay (se venden aparte, al contado) | Ventas |
| 12 | ¿Quién paga gastos notariales/registrales? ¿Monto estimado? | Gerencia |
| 13 | ¿Cotizan en dólares alguna vez? (si no, retirar la línea del tipo de cambio S/ 3.80) | Ventas |
| 14 | ¿El precio incluye acabados o hay upgrades con costo? | Ventas |
| 15 | Periodos de gracia contractuales por clima (¿cuántos días?) | Gerencia / abogado |

## 🟢 En trámite

| # | Tema | Estado |
|---|---|---|
| 16 | RNPDP: inscribir banco QUEJAS Y RECLAMOS (Google LLC + Resend, EE.UU.) | Titular, portal SIPDP → insertar código al llegar |
| 17 | Donweb: ubicación física del datacenter + contrato VPS en docs/dpa/ | Titular → Donweb |
| 18 | GA4: retención de datos → 14 meses (admin de la propiedad) | Titular |
| 19 | Segunda ronda del abogado: confirmar los textos finales sin marcadores (renders, propiedad intelectual, jurisdicción, arras, bonos) + Constancia y Contrato de Arras | Abogado (vía dossier v2 + este checklist) |

## Resuelto hoy (18/10/2026, tarde — patrón Ancosur)

- **Bonos: la web ya no publica fechas ni stock** (eliminados 01/10/2026, 31/12/2026 y "stock 5 unidades" de términos, FAQ, pricing.md, llms.txt y SKILL.md). Cada campaña se rige por sus propios términos, que indican vigencia y stock mínimo, conforme al Código de Protección y Defensa del Consumidor. Se elimina también la tarea de mantenimiento del 31/12/2026.

## Resuelto hoy (18/10/2026, respuestas de ventas aplicadas)

- Entrega: **entre octubre y diciembre de 2027** (FAQ, llms.txt, pricing.md, SKILL.md, JsonLd, layout, API, WebMCP)
- Estacionamiento: **se vende aparte y al contado** (términos, FAQ, agent-content)
- Libro físico de respaldo + aviso Anexo II: **confirmados en el punto de atención** (afirmativo en Términos §5)
- Contrato de Arras como instrumento al pagar el 10% (términos, FAQ, guías, pricing.md, agent-content, SKILL.md)
- Devolución bancaria 100% retirada; remisión a la Constancia en todos los textos
- Horario y dossier físico: confirmados sin cambios

## Resueltos con anterioridad (referencia)

- Dictamen completo del 17/10/2026: bases jurídicas, plazos ARCO 8/20/10, conservación (12 filas), garantías de transferencia (4 declarados + Donweb + WhatsApp/Meta + OSM), inventario de cookies, menores, DPA archivados en docs/dpa/, expiración de cookies 12 meses.
- RNPDP: banco PROSPECTO DE CLIENTES - TORRES TITANIUM (INS-2026-6247, MOD-2026-2174). Constancias en docs/.
- IGV incluido en precios (confirmado por el titular). Domicilios validados. Libro de Reclamaciones virtual con 15 días hábiles, PDF Anexo I, messageId.

## Mantenimiento recurrente

- **Enero de cada año**: verificar feriados oficiales en El Peruano y precargar el año siguiente (HOLIDAY_SEEDS o panel).
- **Revisión anual** de la política de privacidad con el abogado (`PRIVACY_POLICY_VERSION` en `src/lib/privacy.ts`).
- **Antes de cada campaña de bonos**: definir sus términos por escrito (vigencia, stock, montos) — la web remite a ellos.
