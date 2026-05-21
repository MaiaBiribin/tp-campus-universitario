# 🏫 Sistema de gestión y asignación de aulas

El objetivo es desarrollar una plataforma web que permita gestionar, asignar y consultar aulas, optimizando la organización académica y evitando conflictos o errores en la comunicación.

---

## ⚙️ Funcionamiento

El sistema se organiza mediante distintos roles de usuario, donde cada uno posee funcionalidades y permisos específicos dentro de la plataforma.

El **administrador** es quien crea los eventos académicos, asigna aulas disponibles a cada evento y administra la información general del sistema (como la creación, edición o eliminación de aulas).

El **docente** solo interactúa con los eventos que le fueron asignados. Puede visualizar su agenda de clases y, en caso de inconvenientes (por ejemplo, retrasos o ausencias), puede cargar avisos informativos.

El **estudiante** únicamente consulta la información: puede ver en qué aula tiene clase, los horarios asignados y recibir notificaciones ante cambios o avisos realizados por el docente o el sistema.

Además, cuenta con un sistema de **avisos y notificaciones** que permite mantener informados a los usuarios ante cambios relevantes en eventos académicos o en la disponibilidad de aulas.

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
Frontend (NextJS)
   ↓ HTTP/API REST
Backend (NestJS)
   ↓
PostgreSQL
```

---

### 💻 Frontend

- NextJS
- React
- TypeScript

El frontend es responsable de:

- Mostrar la interfaz gráfica.
- Gestionar navegación y vistas.
- Realizar validaciones básicas de formularios.
- Consumir la API del backend.
- Manejar la sesión del usuario.
- Mostrar información de aulas, eventos, avisos y notificaciones.

---

### 🛠️ Backend

- NestJS
- Node.js
- TypeScript

El backend es responsable de:

- Implementar la lógica de negocio.
- Gestionar autenticación y autorización.
- Validar datos.
- Manejar roles de usuario.
- Gestionar aulas, eventos, avisos y notificaciones.
- Conectarse con la base de datos.
- Exponer endpoints REST.

---

### 🗄️ Base de Datos
- PostgreSQL

La base de datos es responsable de:

- Almacenar información persistente.
- Gestionar relaciones entre entidades.
- Mantener integridad de los datos.
- Permitir consultas de disponibilidad y horarios.