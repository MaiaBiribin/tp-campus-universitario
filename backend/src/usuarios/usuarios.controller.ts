import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  UseGuards,
  Param,
  Body 
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'; 
import { UsuariosService } from './usuarios.service';

// Guards para proteger roles
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('usuarios')
export class UsuariosController {

  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiTags('Usuarios')
  @Post() 
  @ApiOperation({ 
    summary: 'Registrar un nuevo usuario',
    description: 'Crea una cuenta nueva en la plataforma. Por defecto se guardará con Rol de Alumno y estado PENDIENTE. La contraseña se hashea automáticamente.' 
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['nombre', 'apellido', 'mail', 'dni', 'contrasena'],
      properties: {
        nombre: { type: 'string', example: 'Juan' },
        apellido: { type: 'string', example: 'Pérez' },
        mail: { type: 'string', example: 'juan.perez@miuniversidad.edu.ar' },
        dni: { type: 'string', example: '45987654' },
        contrasena: { type: 'string', example: 'claveSegura123' },
      },
    },
  })
  async registrarNuevoUsuario(@Body() body: any) {
    console.log("Datos de registro recibidos:", body);

    if (!body || Object.keys(body).length === 0) {
      throw new Error("El cuerpo de la petición (Body) está vacío.");
    }

    const { nombre, apellido, mail, dni, contrasena } = body;

    if (!nombre || !apellido || !mail || !dni || !contrasena) {
      throw new Error("Faltan campos obligatorios en el JSON.");
    }

    // 4. Invocamos al servicio pasándole los parámetros ordenados
    return await this.usuariosService.create(
      nombre,
      apellido,
      mail,
      dni,
      contrasena
    );
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Get()
  getUsuarios() {
    return { mensaje: 'Lista de usuarios - solo Admin puede ver esto' };
  }

  @ApiBearerAuth()
  @ApiTags('usuarios')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Get('/pendientes')
  @ApiOperation({ summary: 'Devuelve usuarios con estado pendiente' })
  getUsuariosPendientes() {
    return this.usuariosService.findPendientes();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Get('/habilitados')
  @ApiOperation({ summary: 'Devuelve todos los usuarios habilitados' })
  getUsuariosHabilitados() {
    return this.usuariosService.findHabilitados();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Patch(':id/habilitar')
  @ApiOperation({ summary: 'Habilita un usuario pendiente' })
  habilitarUsuario(@Param('id') id: string) {
    return this.usuariosService.habilitarUsuario(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Patch(':id/rechazar')
  @ApiOperation({ summary: 'Rechaza un usuario pendiente' })
  rechazarUsuario(@Param('id') id: string) {
    return this.usuariosService.rechazarUsuario(+id);
  }

  @ApiTags('Usuarios')
  @Get('/usuarios/:id')
  @ApiOperation({ summary: 'Devuelve los datos de un usuario' })
  getEventos() {
    return '';
  }
  
  @ApiTags('Usuarios')
  @Patch('/usuarios/:id')
  @ApiOperation({ summary: 'Modifica parcialmente un usuario' })
  patchUsuarios() {
    return '';
  }

  @ApiTags('Usuarios')
  @Put('/usuarios/:id')
  @ApiOperation({ summary: 'Reemplaza completamente un usuario' })
  putUsuarios() {
    return '';
  }

  @ApiTags('Usuarios')
  @Delete('/usuarios/:id')
  @ApiOperation({ summary: 'Elimina un usuario' })
  deleteUsuarios() {
    return '';
  }

  // EVENTOS
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Profesor'])
  @Get('mis-eventos')
  getMisEventos() {
    return { mensaje: 'Solo Profesor puede ver esto' };
  }

  // AULAS 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin', 'Profesor'])
  @Get('aulas')
  getAulas() {
    return { mensaje: 'Admin y Profesor pueden ver esto' };
  }
}