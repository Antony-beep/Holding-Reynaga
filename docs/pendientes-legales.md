# Pendientes legales — Ley 29733 / Ley 29571

Checklist de brechas detectadas en la auditoría del sistema. Actualizado: 2026-10-18 (post-dictamen + respuestas del área de ventas).

## Estado general

- **Dictamen del abogado (17/10/2026): implementado** — política v2026-10-18.1, bases jurídicas, plazos de conservación, garantías de transferencia, ARCO + portabilidad, inventario de cookies, menores.
- **Respuestas del área de ventas (18/10/2026): aplicadas** — entrega octubre–diciembre 2027, estacionamiento aparte al contado, libro físico confirmado, Contrato de Arras como instrumento con el 10%.
- **Marcadores `[[REVISAR CON ABOGADO]]: eliminados de todo el sitio público.** La revisión legal ahora se hace por los documentos internos (dossier + este checklist), no por la web.
- **Regla de devolución bancaria del 100% (texto A del dictamen): RETIRADA** — la encargada de ventas confirmó que no existe en la operación y que no trabajan con bancos directamente. La web remite a las condiciones expresamente previstas en la Constancia de Separación (que sí las contiene).

## 🔴 PREGUNTAS PRIORITARIAS al área de ventas / gerencia (bloquean textos finales)

| # | Pregunta | Impacto en la web |
|---|---|---|
| 1 | **BONOS (la más urgente)**: el sitio publica "válidos 01/10–31/12/2026, stock 5 unidades" (datos del ejemplo del abogado), pero ventas dice que son 25 deptos con bono Techo Propio + 25 con bono Mi Crédito MiVivienda y "no hay fecha exacta". ¿Son los programas estatales? ¿Montos por programa? ¿Stock real? ¿Se puede pagar directo al mismo precio? | Texto de bonos en Términos, pricing.md, llms.txt, SKILL.md, FAQ, JsonLd |
| 2 | **Congelamiento en días**: ¿cuántos días tiene el cliente desde que paga S/ 1,000? (ventas respondió sobre la carta por incumplimiento, no dio el plazo) | RESERVATION_CONDITIONS + Constancia física |
| 3 | **Desistimiento voluntario exacto**: la encargada dijo "se da 500 soles, y si se dio un monto mayor es proporcional la devolución" — ¿se devuelve el 50% del monto pagado? ¿En cuántos días? | RESERVATION_CONDITIONS + Constancia física |
| 4 | **Incumplimiento reiterado**: ¿cuántas cuotas vencidas terminan el congelamiento? (dijo "se va comunicando", sin número) | Constancia física |
| 5 | **Cronograma del 10%**: "se inicia el siguiente mes, tienen hasta 1 mes para pagar el 10%" — ¿el 10% completo en un mes o cuotas mensuales? (contradice "acorde a ingresos") | RESERVATION_CONDITIONS + FAQ |

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
- **31/12/2026**: decidir la campaña de bonos vigente (o su retiro) — ver pregunta prioritaria #1.
