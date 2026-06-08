# Instrucciones del Proyecto — Propuesta Policonsultorio (Chatbot WhatsApp)
*Creado: 2026-06-07*

## Objetivo del proyecto
Generar una propuesta comercial HTML para un policonsultorio médico que necesita
automatizar la gestión de turnos por WhatsApp. La propuesta debe estructurarse
en **3 niveles escalables** para que el cliente pueda elegir el alcance según
presupuesto y madurez digital:

1. **Nivel 1 — Chatbot Recepcionista (sin IA)**
   Flujos predefinidos en WhatsApp + conexión a sistema de agenda estándar
   del mercado (Google Calendar / Calendly / Doctoralia).

2. **Nivel 2 — Asistente Conversacional con IA**
   Mismo agendamiento + capa de IA que resuelve consultas frecuentes
   (horarios, obras sociales, especialidades, precios).

3. **Nivel 3 — Sistema Integral IA**
   Asistente completo con base de datos propia, agenda propia, confirmaciones
   y recordatorios automáticos, seguimiento post-turno, estadísticas y
   reactivación de pacientes inactivos.

## Audiencia objetivo
- **Decisor:** director médico, gerente administrativo o dueño del policonsultorio
- **Contexto:** consultorio multi-especialidad con recepción colapsada por
  llamadas, ausentismo alto en turnos, y pérdida de pacientes por no responder
  a tiempo en WhatsApp
- **Conocimiento técnico:** bajo a medio — la propuesta debe explicar el
  diferencial de cada nivel sin tecnicismos

## Tono y voz
- Voseo rioplatense, directo, sin pose de gurú
- Lenguaje de negocio antes que técnico
- Foco en costo de no resolver (llamadas perdidas, turnos vacíos) más que
  en features técnicas

## Canales
- HTML autocontenido (single file) listo para exportar a PDF
- Imprimible en A4 (incluir `@media print`)
- Responsive básico para mobile

## Skills activas para este proyecto
- copywriting — redacción de la sección Problema / Solución / Inversión
- copy-editing — sweeps de claridad, prueba (so what), especificidad
- page-cro — jerarquía visual, CTA claro, manejo de objeciones (precio)
- Lineamientos_agencia/Agencia_elbufalo_bases.md — identidad de marca, precios
  base (USD 900+) y modelo de negocio
- plantilla_propuesta.html — sistema visual canónico

## Estructura de la propuesta (HTML)
1. Portada — título + cliente + fecha
2. La solución en 3 niveles — intro + grid comparativa (Nivel 1 destacado)
3. Detalle Nivel 1, 2 y 3 — stack-list por nivel
4. **Extra opcional — Landing con widget de chat (add-on)**
5. Cómo funciona el flujo del Nivel 3 — funnel de 5 etapas
6. Fases del proyecto y tiempos
7. Inversión — tabla fee Elbufalo + tabla servicios externos del cliente
8. Condiciones y próximos pasos
9. Footer institucional Elbufalo IA

## Stack tecnológico clave
- **Nivel 1:** Chatwoot + WhatsApp Business API + Google Calendar / Calendly / Doctoralia
- **Niveles 2 y 3:** Chatwoot + n8n self-hosted + Claude API + PostgreSQL (solo Nivel 3) + WhatsApp Business API

## Precios de referencia — fee Elbufalo (USD)

| Nivel | Desarrollo (único) | Soporte mensual Elbufalo | Tiempo |
|---|---|---|---|
| 1 — Chatbot Recepcionista (DESTACADO) | USD 950 | USD 50 | 2–3 semanas |
| 2 — Asistente Básico IA | USD 1.500 | USD 100 | 4–5 semanas |
| 3 — Sistema Integral IA | USD 3.500 | USD 200 | 8–10 semanas |
| Extra — Landing + widget chat | USD 400 | — | 1–2 semanas |

## Servicios externos asumidos por el cliente (referencia)
- Nivel 1: Chatwoot Cloud Starter USD 19/mes · WhatsApp Business API (variable) · agenda (Calendar gratis / Calendly USD 12/mes / Doctoralia USD 60-90 por profesional)
- Niveles 2 y 3: VPS USD 12-28/mes · Claude API USD 30-80/mes · dominio USD 12/año · backup opcional USD 5-10/mes

Nota: el diagnóstico inicial (USD 300) se descuenta del total si se contrata
dentro de los 30 días siguientes.

## Historial de tareas
| Fecha | Tarea | Entregable |
|-------|-------|------------|
| 2026-06-07 | Creación del proyecto + propuesta base 3 niveles | propuesta_policonsultorio_chatbot.html |
| 2026-06-07 | Ajustes v2: quitar diagnóstico · Nivel 1 destacado · Chatwoot · servicios externos separados · landing + widget extra | propuesta_policonsultorio_chatbot.html |
| 2026-06-07 | Ajuste de precios v3: Nivel 2 a USD 1.500 / USD 100 mes · Nivel 3 a USD 3.500 / USD 200 mes | propuesta_policonsultorio_chatbot.html |
| 2026-06-08 | v4: layout Nivel 1 full-width (más destacado), Niveles 2 y 3 en 2 columnas; imágenes chatbot1/chatbot2/crm/confirma/landing1 integradas; landing a USD 400; muestras del Nivel 1 y 2 antes del funnel; menciones de agenda incluyen "o el sistema de reserva actual" | propuesta_policonsultorio_chatbot.html |
