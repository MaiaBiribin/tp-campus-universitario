import { Controller, Get, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { AuthGuard} from '../auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth()
@Controller('notificaciones')
export class NotificacionesController {

  constructor(private readonly notificacionesService: NotificacionesService) {}

  // Trae las notificaciones del usuario logueado

  @UseGuards(AuthGuard)
  @Get('mis-notificaciones')
  getMisNotificaciones(@Request() req) {
    const idUsuario = req.user.sub;
    return this.notificacionesService.getMisNotificaciones(idUsuario);
  }

  // Marca una notificación como leída
  @UseGuards(AuthGuard)
  @Patch(':id/leida')
  marcarLeida(@Param('id') id: number) {
    return this.notificacionesService.marcarLeida(id);
  }
}