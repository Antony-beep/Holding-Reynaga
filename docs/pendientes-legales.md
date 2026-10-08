# Pendientes legales — Ley 29733 / Ley 29571

Checklist de brechas detectadas en la auditoría del sistema. Actualizado: 2026-10-03.

## En trámite / pendientes (acciones externas)

| # | Tema | Estado | Responsable | Siguiente paso |
|---|---|---|---|---|
| 1 | **Registro RNPDP** — inscribir el banco de datos en el Registro Nacional de Protección de Datos Personales (ANPD) | 🟡 En trámite | Usuario | Trámite ante ANPD. Al obtener el número, reemplazar `[[NÚMERO RNPDP]]` en `/politica-de-privacidad#banco-de-datos` |
| 2 | **Plazos de retención** — 10 finalidades con `[[PLAZO]]` sin definir | 🟡 Pendiente | Abogado → agente | El abogado define cada plazo → insertarlos en `/politica-de-privacidad#conservacion` |
| 3 | **Plazos de respuesta ARCO** — acceso, rectificación, cancelación, oposición | 🟡 Pendiente | Abogado → agente | Definir → reemplazar `[[PLAZOS DE RESPUESTA]]` en `#derechos` |
| 4 | **Transferencias internacionales** — Google, Meta, Resend, Cloudflare | 🟡 Pendiente | Abogado | Documentar `[[DESTINATARIOS Y PAÍSES]]` y `[[GARANTÍAS DE TRANSFERENCIA]]` en `#transferencias` |
| 5 | **Contratos con proveedores** — cláusulas de encargo de tratamiento | 🟡 Pendiente | Abogado | Verificar contratos/ToS de Resend, Google Workspace/Sheets, Meta, Cloudflare |

## Resueltos

| # | Tema | Estado |
|---|---|---|
| 6 | **Domicilio legal completo** — Jr. Lino Nro. 132, Huancayo Cercado (Oficina 401, a una cuadra del Parque Grau), Huancayo, Junín | ✅ Confirmado contra el RUC 20614870959 e insertado en política, términos, Libro de Reclamaciones, footer, agent-content, PDF Anexo I, schema, FAQ, /nosotros y /contacto. Versión de política bump a 2026-10-03.1 |
| 7 | Aviso del libro físico en el domicilio | ✅ Confirmado por el usuario |
| 8 | Feriados 2027 precargados (Semana Santa: 25-26 marzo) + aviso en el panel explicando por qué cargarlos cada año | ✅ Implementado |
| 9 | Derecho de cancelación vs Google Sheets — herramienta de búsqueda y borrado de filas (buscar → confirmar → borrar, con re-verificación) en el panel admin | ✅ Implementado |
| 10 | Consentimiento de promociones coherente: casilla opcional, columna Promos en panel, revocación con `marketing_revoked_at` como evidencia, línea en email de notificación | ✅ Implementado |
| 11 | Libro de Reclamaciones: 15 días hábiles improrrogables con feriados peruanos, PDF Anexo I, envío de respuesta con `messageId` de Resend | ✅ Implementado |

## Mantenimiento recurrente

- **Enero de cada año**: verificar el calendario oficial de feriados en El Peruano y precargar el año siguiente en `HOLIDAY_SEEDS` (db.ts) o desde el panel (Reclamos → Feriados). La Semana Santa cambia cada año.
- **Revisión anual** de la política de privacidad con el abogado (`PRIVACY_POLICY_VERSION` en `src/lib/privacy.ts`).

## Nota

Los textos legales del sitio muestran los pendientes visiblemente con el marcador `[[REVISAR CON ABOGADO]]` — es intencional. No ocultarlos hasta que el abogado los apruebe.
