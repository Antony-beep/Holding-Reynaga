# Pendientes legales — Ley 29733 / Ley 29571

Checklist de brechas detectadas en la auditoría del sistema. Actualizado: 2026-10-18 (tras el dictamen del abogado).

## Estado del dictamen legal (17/10/2026)

El abogado emitió dictamen sobre los 12 puntos del dossier. Implementado en el sitio el 18/10/2026:
política de privacidad **versión 2026-10-18.1** (bases jurídicas, plazos de conservación, garantías de
transferencia, ARCO + portabilidad, inventario de cookies, menores), términos con IGV + devolución
bancaria + condiciones de bonos, y limpieza de los marcadores resueltos.

## En trámite / pendientes

| # | Tema | Estado | Responsable | Siguiente paso |
|---|---|---|---|---|
| 1 | **RNPDP: banco QUEJAS Y RECLAMOS** — el dictamen exige inscribir el Libro de Reclamaciones como banco separado (declarando Google LLC + Resend Inc., EE.UU.) | 🟡 En trámite | Titular (portal SIPDP) | Inscribir el banco → al llegar la constancia, insertar el código en `/politica-de-privacidad#banco-de-datos` y bump de versión |
| 2 | **Donweb: ubicación del datacenter** — si el centro de datos está en EE.UU., evaluar nueva modificación registral declarando a Dattatec.com SRL | 🟡 Pendiente | Titular → Donweb | Consultar al proveedor → decidir con el abogado |
| 3 | **Contrato VPS de Donweb** — archivar copia en `docs/dpa/` como evidencia del encargo de alojamiento | 🟡 Pendiente | Titular | Guardar el contrato/orden de servicio en `docs/dpa/` |
| 4 | **GA4: retención 14 meses** — el plazo publicado en la política debe configurarse en la propiedad de GA4 (Admin → Data retention → 14 meses) | 🟡 Pendiente | Titular (admin GA4) | Configurar y verificar |
| 5 | **Art. 77 Ley 29571** — bloque de identificación del proyecto (Partida SUNARP, licencia municipal, fecha de entrega) OMITIDO por decisión del titular hasta tener los datos | 🟡 Pendiente datos | Titular → agente | Con los datos en mano, agregar el bloque a `/terminos-y-condiciones` |
| 6 | **Constancia de Separación física** — la plantilla impresa debe incluir las condiciones de resolución/devolución del dictamen (imputación a cuota inicial, devolución bancaria 100%/10 días hábiles) | 🟡 Pendiente | Titular / ventas | Actualizar la plantilla impresa con el texto A del dictamen |
| 7 | **Libro físico de respaldo** — confirmar disponibilidad del libro físico y del aviso Anexo II impresos en la sala de ventas | 🟡 Pendiente confirmación | Titular | Confirmar (el marcador en /terminos-y-condiciones §5 se retira al confirmar) |
| 8 | **Marcadores restantes** — renders/ambientación, acabados, propiedad intelectual y jurisdicción conservan `[[REVISAR CON ABOGADO]]` porque el dictamen no los abordó | 🟡 Segunda revisión | Abogado | Resolver en la siguiente ronda de revisión |
| 9 | **Operación de las promos 2027** — los bonos publicados vencen el 31/12/2026; decidir si se renuevan, cambian o retiran | 🟡 Pendiente | Titular / ventas | Decidir antes del 31/12/2026 |

## Resueltos por el dictamen (17/10/2026) e implementados (18/10/2026)

| # | Tema | Resolución |
|---|---|---|
| 10 | **Plazos de retención** — 10 finalidades | Tabla completa insertada en `/politica-de-privacidad#conservacion`: 2 años consultas, 1/10 años reservas, 3 años promos, 4 años evidencias y reclamos, 14 meses GA4, 90/180 días Meta, 6 meses técnicos, 2 años auditoría, 8 horas sesiones, 12 meses cookies |
| 11 | **Plazos ARCO + responsable interno** | Información 8 días, Acceso/Portabilidad 20, Rectificación/Cancelación/Oposición/Revocación 10. Responsable: Gerencia General (Sr. Jhon Arquimides Reynaga Soto). Requisitos de verificación publicados. Reclamo ante ANPDP |
| 12 | **Portabilidad** | Declarada OPERATIVA: exportación CSV del panel atiende el derecho (D.S. N° 016-2024-JUS) |
| 13 | **Bases jurídicas** | Tabla corregida insertada (Art. 13.5; Art. 14 inc. 5 y 13; Art. 16; Art. 58.1.e Ley 29571) — eliminado "interés legítimo" europeo |
| 14 | **Garantías de transferencia** | Texto completo en `#transferencias`: 4 declarados + Donweb (Dattatec.com SRL) + OSM (recurso técnico, sin trámite) + WhatsApp (cubierto por Meta/MOD-2026-2174) + DPA/ISO 27001/SOC 2. Evidencia en `docs/dpa/` |
| 15 | **Inventario de cookies** | Tabla en `#cookies`: cookie-consent 12 meses (localStorage), token Turnstile efímero, _ga/_ga_* 2 años, _fbp/_fbc 90 días. Implementada expiración real de 12 meses en `consent.ts` |
| 16 | **Menores de edad** | Cláusula del dictamen insertada en `/politica-de-privacidad#datos` |
| 17 | **IGV en precios** | Confirmado por el titular: precios totales al contado con IGV incluido; texto B insertado en términos, pricing.md, FAQ, API, WebMCP y agent-content |
| 18 | **Devolución de la separación** | Regla nueva aceptada por el negocio: banco rechaza financiamiento (no imputable) → 100% en 10 días hábiles; imputación a cuota inicial; desistimiento según Constancia. Insertado en términos, FAQ, guías, pricing.md, agent-content, SKILL.md |
| 19 | **Bonos de preventa** | Condiciones publicadas: S/ 24,900–47,850, válidos 01/10/2026–31/12/2026, stock mínimo 5 unidades, no canjeables ni acumulables (ejemplo del dictamen confirmado por el titular) |
| 20 | **Domicilios validados** (punto E del dictamen) | Marcadores de domicilio retirados del footer y de todas las páginas legales; canales formalmente designados |

## Resueltos con anterioridad (referencia)

- Registro RNPDP: banco **PROSPECTO DE CLIENTES - TORRES TITANIUM**, **INS-2026-6247** (16/10/2026), **MOD-2026-2174** (17/10/2026) con transferencias declaradas. Constancias en `docs/`.
- Domicilio legal completo confirmado contra el RUC; aviso Anexo II impreso; feriados 2026-2027 precargados; cancelación vs Google Sheets con re-verificación; consentimiento de promos coherente con evidencia; Libro de Reclamaciones con 15 días hábiles, PDF Anexo I y messageId de Resend.

## Mantenimiento recurrente

- **Enero de cada año**: verificar el calendario oficial de feriados en El Peruano y precargar el año siguiente en `HOLIDAY_SEEDS` (db.ts) o desde el panel (Reclamos → Feriados). La Semana Santa cambia cada año.
- **Revisión anual** de la política de privacidad con el abogado (`PRIVACY_POLICY_VERSION` en `src/lib/privacy.ts`).
- **31/12/2026**: cierre o renovación de la promoción de bonos (vencimiento publicado).

## Nota

Quedan 4 marcadores `[[REVISAR CON ABOGADO]]` en `/terminos-y-condiciones` (renders/ambientación,
acabados, propiedad intelectual, jurisdicción) y 1 en §5 del mismo archivo (libro físico) — temas no
abordados por el dictamen. Se retiran cuando el abogado los resuelva o el titular los confirme.
