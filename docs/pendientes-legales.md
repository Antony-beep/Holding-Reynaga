# Pendientes legales — Ley 29733 / Ley 29571

Checklist de brechas detectadas en la auditoría del sistema. Actualizado: 2026-10-03.

## En trámite / pendientes (acciones externas)

| # | Tema | Estado | Responsable | Siguiente paso |
|---|---|---|---|---|
| 1 | **Plazos de retención** — 10 finalidades con `[[PLAZO]]` sin definir | 🟡 Pendiente | Abogado → agente | El abogado define cada plazo → insertarlos en `/politica-de-privacidad#conservacion` |
| 2 | **Plazos de respuesta ARCO** — acceso, rectificación, cancelación, oposición | 🟡 Pendiente | Abogado → agente | Definir → reemplazar `[[PLAZOS DE RESPUESTA]]` en `#derechos` |
| 3 | **Transferencias internacionales** — Google, Meta, Resend, Cloudflare | 🟡 Pendiente | Abogado | Documentar `[[DESTINATARIOS Y PAÍSES]]` y `[[GARANTÍAS DE TRANSFERENCIA]]` en `#transferencias`. **Nota**: la inscripción RNPDP declara "NO" a transferencias internacionales mientras el sistema usa proveedores en el extranjero — el abogado debe reconciliar la declaración inscrita con los proveedores reales |
| 4 | **Contratos con proveedores** — cláusulas de encargo de tratamiento | 🟡 Pendiente | Abogado | Verificar contratos/ToS de Resend, Google Workspace/Sheets, Meta, Cloudflare |
| 5 | **Libro de Reclamaciones en el RNPDP** — la inscripción cubre el banco PROSPECTO DE CLIENTES; evaluar si el registro de reclamos requiere inscripción adicional | 🟡 Pendiente | Abogado | Determinar si se inscribe un banco separado para el Libro |

## Resueltos

| # | Tema | Estado |
|---|---|---|
| 6 | **Registro RNPDP** — banco **PROSPECTO DE CLIENTES** inscrito con el código **INS-2026-6247** (titular PJ-2026-5515) el 16/10/2026 | ✅ Constancia archivada en `docs/constanciaInscripSIPDPHolding.pdf`; número insertado en `/politica-de-privacidad#banco-de-datos`; versión de política bump a 2026-10-16.1. La finalidad inscrita (consultas, cotizaciones, promociones, citas y seguimiento por llamadas, correo y WhatsApp) valida el diseño de la casilla de promos |
| 7 | **Domicilio legal completo** — Jr. Lino Nro. 132, Huancayo Cercado (Oficina 401, a una cuadra del Parque Grau), Huancayo, Junín | ✅ Confirmado contra el RUC 20614870959 e insertado en política, términos, Libro de Reclamaciones, footer, agent-content, PDF Anexo I, schema, FAQ, /nosotros y /contacto. Coincide con el domicilio del representante en la constancia RNPDP |
| 8 | Aviso del libro físico en el domicilio | ✅ Confirmado por el usuario |
| 9 | Feriados 2027 precargados (Semana Santa: 25-26 marzo) + aviso en el panel explicando por qué cargarlos cada año | ✅ Implementado |
| 10 | Derecho de cancelación vs Google Sheets — herramienta de búsqueda y borrado de filas (buscar → confirmar → borrar, con re-verificación) en el panel admin | ✅ Implementado |
| 11 | Consentimiento de promociones coherente: casilla opcional, columna Promos en panel, revocación con `marketing_revoked_at` como evidencia, línea en email de notificación | ✅ Implementado |
| 12 | Libro de Reclamaciones: 15 días hábiles improrrogables con feriados peruanos, PDF Anexo I, envío de respuesta con `messageId` de Resend | ✅ Implementado |

## Mantenimiento recurrente

- **Enero de cada año**: verificar el calendario oficial de feriados en El Peruano y precargar el año siguiente en `HOLIDAY_SEEDS` (db.ts) o desde el panel (Reclamos → Feriados). La Semana Santa cambia cada año.
- **Revisión anual** de la política de privacidad con el abogado (`PRIVACY_POLICY_VERSION` en `src/lib/privacy.ts`).

## Nota

Los textos legales del sitio muestran los pendientes visiblemente con el marcador `[[REVISAR CON ABOGADO]]` — es intencional. No ocultarlos hasta que el abogado los apruebe.
