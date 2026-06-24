# Contexto del Proyecto: Sistema de Gestión y Asignación de Aulas

## Objetivo
Plataforma web para gestionar, asignar y consultar aulas, optimizando la organización académica mediante roles (Administrador, Docente, Estudiante) y un módulo de notificaciones.

## Tech Stack
- **Frontend:** Next.js, React.
- **Backend:** Nest.js, Node.js.
- **Database:** PostgreSQL.
- **Comunicación:** API REST (JSON).

## Reglas de Funcionamiento
1. **Calidad:** Mantén la esencia del diseño y la arquitectura original. No generes métodos ni código "boilerplate" (código repetitivo) que no sea estrictamente necesario para la funcionalidad solicitada.
2. **Arquitectura:** Respeta la separación de responsabilidades entre el Frontend y el Backend. Cualquier cambio en la API debe reflejarse en los tipos correspondientes.
3. **Optimización:** Antes de proponer cambios, analiza solo los archivos relevantes. No analices todo el proyecto si la tarea es puntual.
4. **Git:** Para verificar cambios de otros compañeros, utiliza `git diff` sobre la rama actual.
5. **Autocrítica:** Si detectas un posible conflicto de lógica en la asignación de aulas o horarios, avísame antes de implementar.

## Exclusiones (No analizar)
- node_modules, .git, .next, dist, build, .env, *.log, .vscode/extensions.json

---

## Protocolo de Sincronización

Cuando el usuario notifique que trajo cambios de `master` a su rama de trabajo, ejecutar el siguiente protocolo en orden:

1. **Detección de Cambios:** Ejecutar `git diff master --name-status` para listar archivos modificados, creados o eliminados.
2. **Actualización de Contexto:** Analizar los cambios y actualizar el `## Mapa Estructural del Proyecto` en este archivo si la arquitectura cambió.
3. **Análisis de Impacto:** Dar un resumen breve de cómo los cambios afectan la capa (Back o Front) en la que se está trabajando actualmente.

**Regla de foco:** Antes de cualquier edición, confirmar: capa priorizada + archivos a analizar. No tocar la otra capa salvo corrección de contrato de API estrictamente necesaria y autorizada por el usuario.

---

## Mapa Estructural del Proyecto
> Última actualización: 2026-06-23 v2 | Rama: franco (sincronizada con master)

```
tp-campus-universitario/
├── backend/
│   └── src/
│       ├── app.module.ts               # Módulo raíz — registra todos los módulos (sin duplicados)
│       ├── main.ts                     # Bootstrap NestJS, puerto 4000, Swagger en /api
│       ├── auth/
│       │   ├── auth.controller.ts      # POST /auth/login, /auth/register | GET /auth/perfil
│       │   ├── auth.service.ts         # Lógica JWT + bcrypt
│       │   ├── auth.module.ts
│       │   ├── constants.ts            # JWT_SECRET + ROLES = { ADMIN, ESTUDIANTE, DOCENTE }
│       │   ├── dto/
│       │   │   ├── login.dto.ts
│       │   │   ├── register.dto.ts
│       │   │   ├── auth-response.dto.ts
│       │   │   ├── register-response.dto.ts
│       │   │   └── perfil-response.dto.ts
│       │   ├── decorators/
│       │   │   └── roles.decorator.ts  # @Roles(...roles) via SetMetadata(ROLES_KEY)
│       │   └── guards/
│       │       ├── auth.guard.ts       # Guard JWT
│       │       └── roles.guard.ts      # Guard por rol — usa getAllAndOverride(ROLES_KEY)
│       ├── aulas/
│       │   ├── aula.entity.ts
│       │   ├── aulas.controller.ts     # GET /aulas | PUT /aulas/:id | DELETE /aulas/:id (sin guards, sin POST/PATCH)
│       │   ├── aulas.service.ts        # findAll, findOne, replace, delete (create/update eliminados)
│       │   ├── aulas.module.ts
│       │   └── dto/
│       │       ├── create-aula.dto.ts
│       │       ├── update-aula.dto.ts
│       │       └── aula-response.dto.ts
│       ├── avisos/
│       │   ├── aviso.entity.ts
│       │   ├── avisos.controller.ts    # GET/POST /avisos
│       │   ├── avisos.service.ts       # Crea aviso + notificaciones automáticas a inscriptos
│       │   ├── avisos.module.ts
│       │   └── dto/
│       │       ├── create-aviso.dto.ts
│       │       └── aviso-response.dto.ts
│       ├── carreras/
│       │   ├── carrera.entity.ts
│       │   ├── carreras.controller.ts  # GET/POST /carreras
│       │   ├── carreras.service.ts
│       │   ├── carreras.module.ts
│       │   └── dto/
│       │       ├── create-carrera.dto.ts
│       │       └── carrera-response.dto.ts
│       ├── eventos/
│       │   ├── evento.entity.ts
│       │   ├── tipo-evento.entity.ts
│       │   ├── eventos.controller.ts   # GET/POST/PATCH/PUT/DELETE /eventos
│       │   ├── eventos.service.ts      # Valida conflicto de horarios + notifica inscriptos
│       │   ├── eventos.module.ts
│       │   └── dto/
│       │       ├── create-evento.dto.ts
│       │       ├── update-evento.dto.ts
│       │       └── evento-response.dto.ts
│       ├── inscripciones/
│       │   ├── inscripcion.entity.ts
│       │   ├── crear-inscripcion.dto.ts  # DTO legacy en raíz (con @ApiProperty)
│       │   ├── inscripciones.controller.ts
│       │   ├── inscripciones.service.ts
│       │   ├── inscripciones.module.ts
│       │   └── dto/
│       │       └── inscripcion-response.dto.ts
│       ├── materias/
│       │   ├── materia.entity.ts
│       │   ├── materias.controller.ts  # GET/POST /materias
│       │   ├── materias.service.ts
│       │   ├── materias.module.ts
│       │   └── dto/
│       │       ├── create-materia.dto.ts
│       │       └── materia-response.dto.ts
│       ├── notificaciones/
│       │   ├── notificacion.entity.ts
│       │   ├── notificaciones.controller.ts  # GET mis notificaciones | PATCH marcar leída/todas
│       │   ├── notificaciones.service.ts
│       │   ├── notificaciones.module.ts
│       │   └── dto/
│       │       └── notificacion-response.dto.ts
│       ├── roles/
│       │   ├── rol.entity.ts
│       │   ├── roles.controller.ts     # Sin endpoints activos
│       │   ├── roles.service.ts
│       │   └── roles.module.ts
│       └── usuarios/
│           ├── usuario.entity.ts
│           ├── usuarios.controller.ts  # GET pendientes/habilitados | PATCH habilitar/rechazar
│           ├── usuarios.service.ts     # Rol Estudiante buscado por nombre en DB (sin magic number)
│           ├── usuarios.module.ts      # Inyecta Repository<Rol>
│           └── dto/
│               ├── create-usuario.dto.ts
│               └── usuario-response.dto.ts
│
└── frontend/
    └── app/
        ├── api.ts                      # fetch wrapper con baseURL del backend
        ├── layout.tsx                  # Layout raíz Next.js
        ├── page.tsx                    # Página de entrada (redirige a /login)
        ├── lib/
        │   ├── auth.ts                 # Helpers de autenticación (token, decode)
        │   └── roles.ts                # Constantes de roles
        ├── types/
        │   └── entidades.ts            # Tipos TypeScript globales (Aula, Evento, Usuario…)
        ├── hooks/                      # Custom hooks de lógica de negocio
        │   ├── useAsignacionAcademica.ts  # Estado para gestión de carreras/materias/inscripciones
        │   └── useCrearEvento.ts          # Estado y submit del formulario de nuevo evento
        ├── services/                   # Capa de acceso a la API REST
        │   ├── auth.ts
        │   ├── aulas.ts
        │   ├── avisos.ts               # + getAvisosPorEvento()
        │   ├── carreras.ts
        │   ├── eventos.ts
        │   ├── inscripciones.ts        # + obtenerIdsUsuariosInscriptos()
        │   ├── materias.ts
        │   ├── notificaciones.ts
        │   └── usuarios.ts             # + obtenerUsuariosDisponibles()
        ├── components/
        │   ├── avisosRecientes.tsx     # Lista avisos recientes de un evento (nuevo)
        │   ├── crearAviso.tsx
        │   ├── eventoDetalle.tsx
        │   ├── eventoSemanaView.tsx
        │   ├── infoAula.tsx
        │   ├── proximoEvento.tsx
        │   ├── renderizarEventosSemana.tsx
        │   ├── renderizarMaps.tsx
        │   ├── renderizarNotificaciones.tsx
        │   └── ui/
        │       ├── button.tsx
        │       ├── card.tsx
        │       ├── form.tsx
        │       ├── navLinks.tsx
        │       └── sideBar.tsx
        ├── styles/
        │   ├── globals.css
        │   ├── buttons.module.css
        │   ├── cards.module.css
        │   ├── dashboard.module.css
        │   ├── forms.module.css
        │   ├── layout.module.css
        │   └── table.module.css
        ├── login/page.tsx
        ├── registro/page.tsx
        └── dashboard/
            ├── layout.tsx              # Layout del dashboard (incluye SideBar)
            ├── eventos/
            │   ├── page.tsx            # Lista de eventos (todos los roles)
            │   └── [id]/page.tsx       # Detalle de evento
            ├── mapa/page.tsx           # Vista del mapa del campus
            ├── admin/
            │   ├── page.tsx            # Dashboard Admin
            │   ├── academico/page.tsx  # Gestión académica — carreras/materias/inscripciones (refactorizado)
            │   ├── eventos/
            │   │   ├── page.tsx        # Gestión de eventos (admin)
            │   │   └── nuevo/page.tsx  # Crear nuevo evento
            │   ├── solicitudes/page.tsx
            │   └── usuarios/page.tsx
            ├── docente/
            │   ├── page.tsx            # Dashboard Docente
            │   └── avisos/
            │       ├── page.tsx        # Listar avisos del docente
            │       └── nuevo/page.tsx  # Crear nuevo aviso (nuevo)
            └── estudiante/
                ├── page.tsx            # Dashboard Estudiante
                └── notificaciones/page.tsx
```

### Dependencias clave entre capas
| Frontend (service) | Endpoint Backend | Módulo NestJS |
|--------------------|-----------------|---------------|
| `services/auth.ts` | `POST /auth/login` | `auth` |
| `services/aulas.ts` | `/aulas` | `aulas` |
| `services/eventos.ts` | `/eventos` | `eventos` |
| `services/avisos.ts` | `/avisos` | `avisos` |
| `services/notificaciones.ts` | `/notificaciones` | `notificaciones` |
| `services/usuarios.ts` | `/usuarios` | `usuarios` |
| `services/carreras.ts` | `/carreras` | `carreras` |
| `services/materias.ts` | `/materias` | `materias` |
| `services/inscripciones.ts` | `/inscripciones` | `inscripciones` |

### Estado del backend — Swagger y DTOs
Todos los módulos tienen cobertura completa: `@ApiTags`, `@ApiOperation` (summary + description), DTOs tipados con `@ApiProperty`, `@ApiResponse` en todos los endpoints. Documentación disponible en `http://localhost:4000/api`.

### Sistema de roles
Los nombres canónicos de roles están en `backend/src/auth/constants.ts` → `ROLES.ADMIN`, `ROLES.ESTUDIANTE`, `ROLES.DOCENTE`. Usar siempre estas constantes en los guards, no strings literales.

### Tests Backend
Suite Jest completa: 18/18 suites, 98+ tests. Todos los módulos cubiertos con mocks de repositorios TypeORM (`getRepositoryToken`), guards sobreescritos con `overrideGuard` en controllers, y `jest.mock('bcrypt')` para auth.

### Tests Frontend
Suite Jest completa en `frontend/__test__/` cubriendo: servicios, componentes y páginas. Configuración en `frontend/jest.config.ts` + `frontend/jest.setup.ts`.
