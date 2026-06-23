# 📋 Requerimientos de AulaSync

# Índice

1. [Requerimientos Funcionales](#requerimientos-funcionales)
2. [Requerimientos No Funcionales](#requerimientos-no-funcionales)
3. [Matriz de Trazabilidad](#matriz-de-trazabilidad)

---

# Requerimientos Funcionales

---

## RF-001 — Registro de usuarios

| Campo | Detalle |
|------------------|---------|
| **ID** | RF-001 |
| **Nombre** | Registro de usuarios |
| **Tipo** | Funcional |
| **Prioridad** | Alta |
| **Estado** | Completado |

### Descripción

El sistema debe permitir registrar usuarios mediante el ingreso de nombre, apellido, mail, DNI y contraseña.

### Criterios de Aceptación

- [x] El usuario puede completar sus datos personales.
- [x] El sistema valida los datos ingresados.
- [x] El sistema crea una solicitud de registro en estado pendiente.

### Supuestos

- **SA-001:** El usuario proporciona datos válidos.
- **SA-002:** El sistema tiene conexión con la base de datos.

### Dependencias

| ID Dependencia | Tipo | Descripción |
|----------------|----------------|--------------------------------------|
| RNF-001 | Requerimiento | Requiere arquitectura cliente-servidor |
| — | Infraestructura | Base de datos PostgreSQL disponible |

### Relaciones con Otros Requerimientos

| ID Relacionado | Tipo de Relación | Descripción |
|----------------|----------------------|----------------------------------------------|
| RF-002 | Incluye | El usuario registrado debe esperar aprobación para acceder |

---

## RF-002 — Aprobación de usuarios

| Campo | Detalle |
|------------------|---------|
| **ID** | RF-002 |
| **Nombre** | Gestión de solicitudes de usuarios |
| **Tipo** | Funcional |
| **Prioridad** | Alta |
| **Estado** | Completado |

### Descripción

El sistema debe generar una solicitud pendiente y permitir al administrador aprobar o rechazar registros.

### Criterios de Aceptación

- [x] Los usuarios nuevos quedan en estado pendiente.
- [x] El administrador puede visualizar solicitudes pendientes.
- [x] El administrador puede aprobar o rechazar usuarios.
- [x] Un usuario no aprobado no puede iniciar sesión.

### Supuestos

- **SA-001:** Existe un usuario administrador habilitado.

### Dependencias

| ID Dependencia | Tipo | Descripción |
|----------------|----------------|--------------------------------------|
| RF-001 | Requerimiento | Necesita usuarios registrados |

### Relaciones

| ID Relacionado | Tipo | Descripción |
|----------------|----------------------|--------------------------------|
| RF-003 | Incluye | Permite el acceso al inicio de sesión |

---

## RF-003 — Inicio y cierre de sesión

| Campo | Detalle |
|------------------|---------|
| **ID** | RF-003 |
| **Nombre** | Autenticación de usuarios |
| **Tipo** | Funcional |
| **Prioridad** | Alta |
| **Estado** | Completado |

### Descripción

El sistema debe permitir iniciar y cerrar sesión validando las credenciales del usuario.

### Criterios de Aceptación

- [x] El usuario puede autenticarse.
- [x] El sistema valida credenciales.
- [x] El usuario puede cerrar sesión.

### Supuestos

- **SA-001:** El usuario está habilitado.

### Dependencias

| ID Dependencia | Tipo | Descripción |
|----------------|----------------|--------------------------------|
| RF-002 | Requerimiento | Usuario aprobado previamente |

---

# 🏫 Gestión de aulas

---

## RF-004 — Visualización de aulas

| Campo | Detalle |
|------------------|---------|
| **ID** | RF-004 |
| **Nombre** | Consulta de ubicación de aulas |
| **Tipo** | Funcional |
| **Prioridad** | Media |
| **Estado** | Completado |

### Descripción

El sistema debe permitir visualizar la ubicación de las aulas mediante mapas.

### Criterios de Aceptación

- [x] El usuario puede visualizar mapas.
- [x] El sistema muestra la ubicación del aula.

### Supuestos

- **SA-001:** Las aulas tienen ubicación registrada.

### Dependencias

| ID Dependencia | Tipo | Descripción |
|----------------|----------------|--------------------------------|
| RF-006 | Requerimiento | Los eventos pueden tener aulas asignadas |

---

# 📚 Gestión de eventos académicos

---

## RF-005 — Creación de eventos académicos

| Campo | Detalle |
|------------------|---------|
| **ID** | RF-005 |
| **Nombre** | Gestión de eventos |
| **Tipo** | Funcional |
| **Prioridad** | Alta |
| **Estado** | Completado |

### Descripción

El sistema debe permitir crear eventos académicos con fecha, horario, materia, tipo de evento y aula.

### Criterios de Aceptación

- [x] Permite crear eventos.
- [x] Permite seleccionar tipo de evento.
- [x] Permite asignar materia.
- [x] Permite asignar aula.

### Supuestos

- **SA-001:** Existe información académica cargada.

### Dependencias

| ID Dependencia | Tipo | Descripción |
|----------------|----------------|--------------------------------|
| RF-004 | Requerimiento | Utiliza información de aulas |

---

## RF-006 — Validación de disponibilidad de aulas

| Campo | Detalle |
|------------------|---------|
| **ID** | RF-006 |
| **Nombre** | Validación de disponibilidad |
| **Tipo** | Funcional |
| **Prioridad** | Alta |
| **Estado** | Completado |

### Descripción

El sistema debe validar que un aula no tenga eventos superpuestos.

### Criterios de Aceptación

- [x] El sistema verifica fecha y horario.
- [x] Evita asignaciones de aulas ocupadas.

### Dependencias

| ID Dependencia | Tipo | Descripción |
|----------------|----------------|--------------------------------|
| RF-005 | Requerimiento | Se aplica al crear eventos |

---

## RF-007 — Consulta de eventos

| Campo | Detalle |
|------------------|---------|
| **ID** | RF-007 |
| **Nombre** | Consulta de eventos académicos |
| **Tipo** | Funcional |
| **Prioridad** | Alta |
| **Estado** | Completado |

### Descripción

El sistema debe permitir consultar horarios, fechas, aulas y datos relacionados con eventos.

### Criterios de Aceptación

- [x] Permite consultar eventos.
- [x] Muestra fecha y horario.
- [x] Muestra aula asignada.

---

# 🎓 Funcionalidades para estudiantes

---

## RF-008 — Consulta académica del estudiante

| Campo | Detalle |
|------------------|---------|
| **ID** | RF-008 |
| **Nombre** | Información académica estudiante |
| **Tipo** | Funcional |
| **Prioridad** | Alta |
| **Estado** | Completado |

### Descripción

El estudiante debe poder visualizar eventos, aulas, mapas, horarios y avisos relacionados.

### Criterios de Aceptación

- [x] Visualiza eventos del día.
- [x] Consulta materia, tipo de evento, horario y aula.
- [x] Puede acceder al mapa del aula.

---

# 👨‍🏫 Funcionalidades para docentes

---

## RF-009 — Gestión de avisos docentes

| Campo | Detalle |
|------------------|---------|
| **ID** | RF-009 |
| **Nombre** | Comunicación mediante avisos |
| **Tipo** | Funcional |
| **Prioridad** | Alta |
| **Estado** | En desarrollo |

### Descripción

El docente debe poder crear, editar y eliminar avisos relacionados con eventos académicos.

### Criterios de Aceptación

- [x] Permite crear avisos.
- [x] Permite eliminar avisos.
- [x] Los avisos generan notificaciones.

### Dependencias

| ID Dependencia | Tipo | Descripción |
|----------------|----------------|--------------------------------|
| RF-010 | Requerimiento | Generación de notificaciones |

---

# 🛠️ Funcionalidades administrativas

---

## RF-010 — Administración del sistema

| Campo | Detalle |
|------------------|---------|
| **ID** | RF-010 |
| **Nombre** | Gestión administrativa |
| **Tipo** | Funcional |
| **Prioridad** | Alta |
| **Estado** | Completado |

### Descripción

El administrador debe gestionar usuarios, aulas y eventos.

### Criterios de Aceptación

- [x] Administra usuarios.
- [x] Administra aulas.
- [x] Administra eventos.

---

# 🔔 Notificaciones

---

## RF-011 — Generación de notificaciones

| Campo | Detalle |
|------------------|---------|
| **ID** | RF-011 |
| **Nombre** | Sistema de notificaciones |
| **Tipo** | Funcional |
| **Prioridad** | Alta |
| **Estado** | Completado |

### Descripción

El sistema debe generar notificaciones ante cambios o avisos importantes.

### Criterios de Aceptación

- [x] Se generan notificaciones.
- [x] Se actualiza información relacionada.
- [x] El usuario puede consultar notificaciones.

---

# Requerimientos No Funcionales

---

## RNF-001 — Arquitectura tecnológica

| Campo | Detalle |
|------------------|---------|
| **ID** | RNF-001 |
| **Nombre** | Arquitectura del sistema |
| **Tipo** | No Funcional |
| **Categoría** | Arquitectura |
| **Prioridad** | Alta |
| **Estado** | Completado |

### Descripción

El sistema debe utilizar una arquitectura cliente-servidor separando frontend y backend.

### Criterios de Aceptación

- [x] Frontend desarrollado con NextJS, React y TypeScript.
- [x] Backend desarrollado con NestJS y Node.js.
- [x] Persistencia mediante PostgreSQL.

---

## RNF-002 — Seguridad y control de acceso

| Campo | Detalle |
|------------------|---------|
| **ID** | RNF-002 |
| **Nombre** | Seguridad |
| **Tipo** | No Funcional |
| **Categoría** | Seguridad |
| **Prioridad** | Alta |
| **Estado** | Completado |

### Descripción

El sistema debe manejar diferentes niveles de acceso según el rol del usuario.

### Criterios de Aceptación

- [x] Existen roles de usuario.
- [x] Se restringen accesos según permisos.
- [x] Se validan usuarios autenticados.

---

## RNF-003 — Validaciones y errores

| Campo | Detalle |
|------------------|---------|
| **ID** | RNF-003 |
| **Nombre** | Manejo de errores |
| **Tipo** | No Funcional |
| **Categoría** | Mantenibilidad |
| **Prioridad** | Media |
| **Estado** | Completado |

### Descripción

El sistema debe validar datos y manejar errores correctamente.

### Criterios de Aceptación

- [x] Frontend valida información ingresada.
- [x] Backend valida solicitudes.
- [x] Se informan errores al usuario.

---

## RNF-004 — Interfaz adaptable

| Campo | Detalle |
|------------------|---------|
| **ID** | RNF-004 |
| **Nombre** | Diseño responsive |
| **Tipo** | No Funcional |
| **Categoría** | Usabilidad |
| **Prioridad** | Media |
| **Estado** | En desarrollo |

### Descripción

La aplicación debe adaptarse a distintos dispositivos.

### Criterios de Aceptación

- [ ] La interfaz se adapta a distintos tamaños de pantalla.
- [ ] Los componentes mantienen funcionalidad en dispositivos móviles.

---

# Matriz de Trazabilidad

| ID | Nombre | Tipo | Depende de | Relacionado con | Prioridad | Estado |
|----------------|-------------------------|---------------|----------------|------------------|-----------|---------------|
| RF-001 | Registro usuarios | Funcional | — | RF-002 | Alta | Completado |
| RF-002 | Aprobación usuarios | Funcional | RF-001 | RF-003 | Alta | Completado |
| RF-003 | Login/logout | Funcional | RF-002 | RNF-002 | Alta | Completado |
| RF-004 | Visualización aulas | Funcional | — | RF-005 | Media | Completado |
| RF-005 | Eventos académicos | Funcional | RF-004 | RF-006 | Alta | Completado |
| RF-006 | Disponibilidad aulas | Funcional | RF-005 | — | Alta | Completado |
| RF-008 | Estudiantes | Funcional | RF-007 | RF-011 | Alta | Completado |
| RF-009 | Avisos docentes | Funcional | RF-005 | RF-011 | Alta | En desarrollo |
| RF-011 | Notificaciones | Funcional | RF-009 | — | Alta | Completado |
| RNF-001 | Arquitectura | No funcional | — | Todos | Alta | Completado |
| RNF-002 | Seguridad | No funcional | RF-003 | Todos | Alta | Completado |
| RNF-004 | Responsive | No funcional | — | Interfaz | Media | Completado |