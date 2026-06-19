import { Controller, Get, Post, Patch, Put, Delete, UseGuards, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioResponseDto } from './dto/usuario-response.dto';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {

  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar un nuevo usuario',
    description: 'Crea una cuenta nueva en la plataforma. Por defecto se guarda con rol Estudiante y estado PENDIENTE. La contraseña se hashea automáticamente.',
  })
  @ApiBody({ type: CreateUsuarioDto, description: 'Datos personales y credenciales del nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente', type: UsuarioResponseDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos o faltantes' })
  async registrarNuevoUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    const { nombre, apellido, mail, dni, contrasena } = createUsuarioDto;
    return await this.usuariosService.create(nombre, apellido, mail, dni, contrasena);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Get()
  @ApiOperation({
    summary: 'Listar todos los usuarios',
    description: 'Devuelve el listado de todos los usuarios registrados. Solo accesible para usuarios con rol Admin.',
  })
  @ApiResponse({ status: 200, description: 'Listado de usuarios' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Admin)' })
  getUsuarios() {
    return { mensaje: 'Lista de usuarios - solo Admin puede ver esto' };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Get('/pendientes')
  @ApiOperation({
    summary: 'Listar usuarios pendientes',
    description: 'Devuelve todos los usuarios con estado PENDIENTE que aguardan habilitación por parte del administrador.',
  })
  @ApiResponse({ status: 200, description: 'Listado de usuarios pendientes', type: [UsuarioResponseDto] })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Admin)' })
  getUsuariosPendientes() {
    return this.usuariosService.findPendientes();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Get('/habilitados')
  @ApiOperation({
    summary: 'Listar usuarios habilitados',
    description: 'Devuelve todos los usuarios con estado HABILITADO que pueden acceder al sistema.',
  })
  @ApiResponse({ status: 200, description: 'Listado de usuarios habilitados', type: [UsuarioResponseDto] })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Admin)' })
  getUsuariosHabilitados() {
    return this.usuariosService.findHabilitados();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Patch(':id/habilitar')
  @ApiOperation({
    summary: 'Habilitar un usuario',
    description: 'Cambia el estado de un usuario PENDIENTE a HABILITADO, permitiéndole acceder al sistema.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario a habilitar', example: 1 })
  @ApiResponse({ status: 200, description: 'Usuario habilitado exitosamente', type: UsuarioResponseDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Admin)' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  habilitarUsuario(@Param('id') id: string) {
    return this.usuariosService.habilitarUsuario(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Patch(':id/rechazar')
  @ApiOperation({
    summary: 'Rechazar un usuario',
    description: 'Cambia el estado de un usuario PENDIENTE a RECHAZADO, impidiéndole el acceso al sistema.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario a rechazar', example: 1 })
  @ApiResponse({ status: 200, description: 'Usuario rechazado exitosamente', type: UsuarioResponseDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Admin)' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  rechazarUsuario(@Param('id') id: string) {
    return this.usuariosService.rechazarUsuario(+id);
  }

  @Get('/usuarios/:id')
  @ApiOperation({
    summary: 'Obtener datos de un usuario',
    description: 'Devuelve los datos de un usuario específico identificado por su ID.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario', example: 1 })
  @ApiResponse({ status: 200, description: 'Datos del usuario', type: UsuarioResponseDto })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  getEventos() {
    return '';
  }

  @Patch('/usuarios/:id')
  @ApiOperation({
    summary: 'Actualizar parcialmente un usuario',
    description: 'Modifica únicamente los campos enviados en el cuerpo de la petición para un usuario específico.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario a modificar', example: 1 })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente', type: UsuarioResponseDto })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  patchUsuarios() {
    return '';
  }

  @Put('/usuarios/:id')
  @ApiOperation({
    summary: 'Reemplazar completamente un usuario',
    description: 'Sobrescribe todos los datos de un usuario existente. Requiere enviar el objeto completo.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario a reemplazar', example: 1 })
  @ApiResponse({ status: 200, description: 'Usuario reemplazado exitosamente', type: UsuarioResponseDto })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  putUsuarios() {
    return '';
  }

  @Delete('/usuarios/:id')
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description: 'Borra físicamente el registro de un usuario de la base de datos de manera irreversible.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario a eliminar', example: 1 })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  deleteUsuarios() {
    return '';
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Docente'])
  @Get('mis-eventos')
  @ApiOperation({
    summary: 'Obtener mis eventos',
    description: 'Devuelve los eventos del usuario con rol Docente actualmente autenticado.',
  })
  @ApiResponse({ status: 200, description: 'Eventos del Docente' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Docente)' })
  getMisEventos() {
    return { mensaje: 'Solo Docente puede ver esto' };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin', 'Docente'])
  @Get('aulas')
  @ApiOperation({
    summary: 'Obtener aulas disponibles',
    description: 'Devuelve las aulas disponibles. Accesible para usuarios con rol Admin o Docente.',
  })
  @ApiResponse({ status: 200, description: 'Aulas disponibles' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Admin o Docente)' })
  getAulas() {
    return { mensaje: 'Admin y Docente pueden ver esto' };
  }
}
