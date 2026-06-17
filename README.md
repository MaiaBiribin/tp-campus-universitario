# 🏫 Sistema de gestión y asignación de aulas

Plataforma web para gestionar eventos académicos, aulas y comunicación entre administradores, docentes y estudiantes.

El sistema permite organizar clases, parciales y finales, asignar aulas, consultar ubicaciones y enviar avisos importantes asociados a eventos.

---

# 🎯 Objetivo

El objetivo del sistema es mejorar la organización académica evitando conflictos de horarios, problemas de asignación de aulas y falta de comunicación.

---

# Arquitectura

Aplicación cliente-servidor separada en frontend y backend.

```text
Usuario
   |
   ↓
Frontend 
   |
   ↓ HTTP / REST API
Backend 
   |
   ↓
PostgreSQL