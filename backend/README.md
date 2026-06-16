# 🛠️ Backend — Sistema de gestión y asignación de aulas

Backend del sistema desarrollado con **NestJS**, **Node.js**, **TypeScript** y **PostgreSQL**.

Implementa la lógica de negocio y expone una API REST consumida por el frontend.

---

## ⚙️ Tecnologías utilizadas

- NestJS
- Node.js
- TypeScript
- TypeORM
- PostgreSQL
- JWT
- Swagger

---

## 🧩 Responsabilidades del Backend

El backend se encarga de:

- Implementar reglas de negocio.
- Gestionar autenticación.
- Gestionar autorización.
- Validar datos.
- Administrar usuarios.
- Administrar aulas.
- Administrar eventos.
- Administrar avisos.
- Generar notificaciones automáticas.
- Exponer API REST.

---

## 🗄️ Base de Datos

Motor utilizado:

```text
PostgreSQL
```

El proyecto utiliza relaciones con TypeORM.


---

## 🚀 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/MaiaBiribin/tp-campus-universitario.git
```

Entrar al backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

---

## ▶️ Ejecutar en desarrollo

```bash
npm run start:dev
```

Servidor disponible en:

```text
http://localhost:4000
```

---

## 📚 Documentación Swagger

Una vez levantado:

```text
http://localhost:4000/api
```

Permite:

- Consultar endpoints.
- Ejecutar pruebas.
- Validar requests.


---

## 👥 Roles soportados

### Administrador

- Gestiona sistema.

### Docente

- Gestiona avisos.

### Estudiante

- Consulta información.
