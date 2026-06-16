# 🏫 Sistema de gestión y asignación de aulas

El objetivo es desarrollar una plataforma web que permita gestionar, asignar y consultar aulas, optimizando la organización académica y evitando conflictos o errores en la comunicación.

---

## ⚙️ Funcionamiento

El sistema se organiza mediante distintos roles de usuario, donde cada uno posee funcionalidades y permisos específicos dentro de la plataforma.

El **administrador** es responsable de administrar el funcionamiento académico del sistema. Puede gestionar usuarios (aprobar o rechazar solicitudes de registro), crear eventos académicos, asignar aulas disponibles, evitar conflictos de horarios y administrar la información general del sistema (como la creación, edición o eliminación de aulas).

El **docente** interactúa únicamente con los eventos académicos que le fueron asignados. Puede visualizar su agenda académica, consultar el detalle de cada evento y crear avisos informativos ante situaciones como retrasos, ausencias o cancelaciones.

El **estudiante** utiliza la plataforma para consultar rápidamente dónde debe asistir y cuándo. Puede visualizar sus próximos eventos, consultar horarios, aulas asignadas, detalles del evento, ubicación de aulas y recibir notificaciones ante cambios o avisos importantes.

Además, el sistema cuenta con un módulo de **avisos y notificaciones** que mantiene informados a los usuarios ante cambios relevantes como modificaciones de aula, cancelaciones, retrasos o nuevos avisos asociados a eventos académicos.

---

## 🧩 Arquitectura

La aplicación utiliza una arquitectura cliente-servidor separada en frontend y backend. El sistema permite gestionar aulas y eventos académicos, brindando funcionalidades específicas según el rol del usuario.

La arquitectura se compone de:

- Frontend desarrollado con NextJS y React.
- Backend desarrollado con NestJS y Node.js.
- Base de datos PostgreSQL.
- Comunicación mediante API REST utilizando HTTP y formato JSON.

```text
Usuario
   ↓
Frontend
   ↓ HTTP/API REST
Backend
   ↓
PostgreSQL
```

---

