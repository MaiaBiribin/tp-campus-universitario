# Requerimientos Funcionales

## 👤 Gestión de usuarios
- El sistema debe permitir el registro de usuarios.
- El estudiante debe registrarse ingresando nombre, apellido, mail, DNI y contraseña.
- El sistema debe generar una solicitud de registro en estado pendiente.
- El sistema no debe permitir el inicio de sesión hasta que el administrador apruebe el registro.
- El sistema debe permitir el inicio de sesión.
- El sistema debe permitir el cierre de sesión.

---

## 🏫 Gestión de aulas
- El sistema debe permitir editar, crear y eliminar aulas.
- El sistema debe permitir visualizar la ubicación de las aulas.

---

## 📚 Gestión de eventos académicos
- El sistema debe permitir crear eventos académicos.
- El sistema debe permitir asignar aulas a eventos académicos.
- El sistema debe validar la disponibilidad de aulas.
- El sistema debe permitir consultar horarios y fechas de eventos.
- Tipos de evento:
  - Clase
  - Parcial
  - Final

---

## 🎓 Funcionalidades para estudiantes
**Objetivo:** consultar rápidamente dónde tiene que estar, cuándo y recibir cambios.
- El estudiante debe poder visualizar las aulas asignadas a sus clases o exámenes.
- El estudiante debe poder consultar horarios y fechas.
- El estudiante debe poder visualizar el mapa de aulas.
- El estudiante debe recibir notificaciones ante cambios o avisos importantes.
El estudiante debe visualizar:
  - eventos del día actual destacados
  - información resumida del evento: materia, tipo de evento (Clase / Parcial / Final), horario, aula
- El estudiante debe poder consultar:
  - nombre del evento
  - materia
  - aula asignada
  - mapa del aula
  - fecha y horario
  - docente responsable
  - avisos relacionados

---

## 👨‍🏫 Funcionalidades para docentes
**Objetivo:** consultar agenda académica y comunicar cambios.
- El docente debe poder visualizar sus eventos académicos asignados.
- El docente debe poder visualizar asignaciones de aulas para sus clases o exámenes.
- El docente debe poder visualizar el mapa de aulas.
- El docente debe poder cargar, editar y eliminar avisos relacionados con eventos académicos:
  - retrasos
  - ausencias
  - cancelaciones
- Al crear un aviso, el sistema debe generar notificaciones para estudiantes afectados.

---

## 🛠️ Funcionalidades para administradores
- El administrador debe gestionar y habilitar usuarios.
- El administrador debe gestionar y poder crear aulas.
- El administrador debe asignar aulas a eventos.
- El administrador debe crear eventos académicos.
- El administrador debe administrar la información general del sistema.
- El administrador debe visualizar accesos a:
  - solicitudes de registro
  - gestión de eventos, aulas y usuarios
  - notificaciones del sistema
- El administrador debe poder:
  - visualizar solicitudes pendientes
  - rechazar y aprobar registros

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