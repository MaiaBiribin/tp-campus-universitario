# 💻 Frontend — Sistema de gestión y asignación de aulas

Frontend del sistema desarrollado con **NextJS**, **React** y **TypeScript**.

Esta aplicación es responsable de mostrar la interfaz gráfica, permitir la interacción de los usuarios con el sistema y consumir la API del backend.

---

## 🧩 Responsabilidades del Frontend

La aplicación frontend se encarga de:

- Mostrar la interfaz gráfica.
- Gestionar navegación entre pantallas.
- Consumir la API REST del backend.
- Administrar sesión del usuario.
- Mostrar eventos académicos.
- Mostrar aulas y mapas interactivos.
- Mostrar avisos y notificaciones.
- Gestionar permisos según rol.

---

## 🚀 Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

---

## ▶️ Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación se ejecutará por defecto en:

```text
http://localhost:3000
```

---

## 🔗 Comunicación con Backend

El frontend consume una API REST.

Backend esperado:

```text
http://localhost:4000
```

Las llamadas se realizan desde:

```text
app/services/
```

---

## 👥 Roles soportados

### Administrador

- Gestionar usuarios.
- Crear eventos.
- Asignar aulas.
- Administrar información.

### Docente

- Consultar eventos.
- Ver ubicación de aulas.
- Crear avisos.
- Visualizar agenda.

### Estudiante

- Consultar próximos eventos.
- Ver ubicación de aulas.
- Recibir notificaciones.

---

## 🔔 Sistema de avisos y notificaciones

El frontend muestra notificaciones generadas automáticamente por el backend cuando:

- Se crea un evento.
- Un docente crea un aviso.

Las notificaciones pueden marcarse como leídas.
