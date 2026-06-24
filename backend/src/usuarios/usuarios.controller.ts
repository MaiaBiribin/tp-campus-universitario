import { Controller, Get, Post, Patch, Put, Delete, UseGuards, Param, Body, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { AulasService } from '../aulas/aulas.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/constants';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioResponseDto } from './dto/usuario-response.dto';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly aulasService: AulasService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar un nuevo usuario',
    description: 'Crea una cuenta nueva con rol Estudiante y estado PENDIENTE. La contraseña se hashea automáticamente.',
  })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente', type: UsuarioResponseDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos o faltantes' })
  async registrarNuevoUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    const { nombre, apellido, mail, dni, contrasena } = createUsuarioDto;
    return await this.usuariosService.create(nombre, apellido, mail, dni, contrasena);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Get()
  @ApiOperation({
    summary: 'Listar todos los usuarios',
    description: 'Devuelve todos los usuarios del sistema con su rol. Solo accesible para Admin.',
  })
  @ApiResponse({ status: 200, description: 'Listado de usuarios', type: [UsuarioResponseDto] })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Admin)' })
  getUsuarios() {
    return this.usuariosService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Get('pendientes')
  @ApiOperation({
    summary: 'Listar usuarios pendientes',
    description: 'Devuelve todos los usuarios con estado PENDIENTE que aguardan habilitación.',
  })
  @ApiResponse({ status: 200, description: 'Listado de usuarios pendientes', type: [UsuarioResponseDto] })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Admin)' })
  getUsuariosPendientes() {
    return this.usuariosService.findPendientes();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Get('habilitados')
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
  @Roles(ROLES.DOCENTE)
  @Get('mis-eventos')
  @ApiOperation({
    summary: 'Obtener mis eventos',
    description: 'Devuelve los próximos eventos de las materias en las que está inscripto el docente autenticado.',
  })
  @ApiResponse({ status: 200, description: 'Eventos del docente autenticado' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Docente)' })
  getMisEventos(@Request() req) {
    return this.usuariosService.misEventos(req.user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN, ROLES.DOCENTE)
  @Get('aulas')
  @ApiOperation({
    summary: 'Obtener aulas disponibles',
    description: 'Devuelve el listado completo de aulas. Accesible para Admin y Docente.',
  })
  @ApiResponse({ status: 200, description: 'Listado de aulas' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Admin o Docente)' })
  getAulas() {
    return this.aulasService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un usuario por ID',
    description: 'Devuelve los datos completos de un usuario específico identificado por su ID.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario', example: 1 })
  @ApiResponse({ status: 200, description: 'Datos del usuario', type: UsuarioResponseDto })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  getUsuarioById(@Param('id') id: string) {
    return this.usuariosService.findById(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar parcialmente un usuario',
    description: 'Modifica únicamente los campos enviados para un usuario específico.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario a modificar', example: 1 })
  @ApiBody({ type: UpdateUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente', type: UsuarioResponseDto })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  patchUsuario(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Put(':id')
  @ApiOperation({
    summary: 'Reemplazar completamente un usuario',
    description: 'Sobrescribe los datos de un usuario existente con los campos enviados.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario a reemplazar', example: 1 })
  @ApiBody({ type: UpdateUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario reemplazado exitosamente', type: UsuarioResponseDto })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  putUsuario(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description: 'Borra físicamente el registro de un usuario de la base de datos.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario a eliminar', example: 1 })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  deleteUsuario(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Patch(':id/habilitar')
  @ApiOperation({
    summary: 'Habilitar un usuario',
    description: 'Cambia el estado de un usuario PENDIENTE a HABILITADO.',
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
  @Roles(ROLES.ADMIN)
  @Patch(':id/rechazar')
  @ApiOperation({
    summary: 'Rechazar un usuario',
    description: 'Cambia el estado de un usuario PENDIENTE a RECHAZADO.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico del usuario a rechazar', example: 1 })
  @ApiResponse({ status: 200, description: 'Usuario rechazado exitosamente', type: UsuarioResponseDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos (se requiere rol Admin)' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  rechazarUsuario(@Param('id') id: string) {
    return this.usuariosService.rechazarUsuario(+id);
  }
}
