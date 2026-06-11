import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  UseGuards,
  Param
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';

//Guards para proteger roles
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('usuarios')
export class UsuariosController {

  constructor(private readonly usuariosService: UsuariosService) {}

  //USUARIOS

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Get()
  getUsuarios() {
    return { mensaje: 'Lista de usuarios - solo Admin puede ver esto' };
  }

  @ApiTags('Usuarios')
  @Post('/usuarios')
  @ApiOperation({ summary: 'Crea un nuevo usuario' })
  postEventos() {
    return '';
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
  @ApiOperation({
  summary: 'Devuelve todos los usuarios habilitados',
})
getUsuariosHabilitados() {
  return this.usuariosService.findHabilitados();}


  //HABILITAR USUARIO
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Patch(':id/habilitar') //Patch es un decorador de NestJS que extrae un valor de la URL.
  @ApiOperation({ summary: 'Habilita un usuario pendiente' })
  habilitarUsuario(@Param('id') id: string) {
  return this.usuariosService.habilitarUsuario(+id);
  }

  //RECHAZAR USUARIO ejemplo de Endpoint 
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

  //AULAS 

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin', 'Profesor'])
  @Get('aulas')
  getAulas() {
    return { mensaje: 'Admin y Profesor pueden ver esto' };

  }





}
