# Requerimientos Funcionales

## 👤 Gestión de usuarios
- El sistema debe permitir el registro de usuarios.
- El sistema debe permitir el inicio de sesión.
- El sistema debe permitir el cierre de sesión.
- El sistema debe permitir la gestión de perfiles de usuario.

---

## 🏫 Gestión de aulas
- El sistema debe permitir crear aulas.
- El sistema debe permitir editar aulas.
- El sistema debe permitir eliminar aulas.
- El sistema debe permitir visualizar la ubicación de las aulas.

---

## 📚 Gestión de eventos académicos
- El sistema debe permitir crear eventos académicos.
- El sistema debe permitir asignar aulas a eventos académicos.
- El sistema debe validar la disponibilidad de aulas.
- El sistema debe evitar conflictos de horarios.
- El sistema debe permitir consultar horarios y fechas de eventos.

---

## 🎓 Funcionalidades para estudiantes
- El estudiante debe poder visualizar las aulas asignadas a sus clases o exámenes.
- El estudiante debe poder consultar horarios y fechas.
- El estudiante debe recibir notificaciones ante cambios o avisos importantes.

---

## 👨‍🏫 Funcionalidades para docentes
- El docente debe poder visualizar sus eventos académicos asignados.
- El docente debe poder cargar avisos relacionados con eventos académicos.

### Ejemplos:
- retrasos
- ausencias
- cancelaciones

---

## 🛠️ Funcionalidades para administradores
- El administrador debe contar con un panel exclusivo de administración.
- El administrador debe gestionar aulas.
- El administrador debe asignar aulas a eventos.
- El administrador debe administrar la información general del sistema.

---

## 🔔 Notificaciones
- El sistema debe generar notificaciones.
- El sistema debe enviar notificaciones ante cambios importantes.
- El sistema debe actualizar información relacionada con eventos, aulas y avisos de manera inmediata.

---

# ⚙️ Requerimientos No Funcionales

## 🧩 Arquitectura y tecnologías
- La aplicación debe utilizar una arquitectura cliente-servidor.
- El frontend debe desarrollarse utilizando:
  - NextJS
  - React
  - TypeScript
- El backend debe desarrollarse utilizando:
  - NestJS
  - Node.js
  - TypeScript
- La persistencia de datos debe implementarse mediante PostgreSQL.

---

## ✅ Validaciones y manejo de errores
- El sistema debe validar datos en frontend y backend.
- La aplicación debe contar con manejo de errores.

---

## 🔐 Seguridad y acceso
- El sistema debe permitir múltiples usuarios simultáneos.
- El sistema debe manejar distintos niveles de acceso según el rol del usuario.

---

## 📱 Interfaz y experiencia de usuario
- La interfaz debe ser responsive.
- La aplicación debe adaptarse a distintos dispositivos.