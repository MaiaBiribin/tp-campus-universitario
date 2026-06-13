import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';

import { NotificacionesService } from './notificaciones.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('notificaciones')
export class NotificacionesController {

  constructor(
    private readonly notificacionesService: NotificacionesService,
  ) {}

  // notificaciones del usuario logueado
  @UseGuards(AuthGuard)
  @Get('mis-notificaciones')
  getMisNotificaciones(@Request() req) {
    const idUsuario = req.user.sub;
    return this.notificacionesService.getMisNotificaciones(idUsuario);
  }

  //marcar como leída
  @UseGuards(AuthGuard)
  @Patch(':id/leida')
  marcarLeida(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.notificacionesService.marcarLeida(id);
  }

  //marcar todas como leídas
  @UseGuards(AuthGuard)
  @Patch('marcar-todas-leidas')
  marcarTodasLeidas(@Request() req) {
    const idUsuario = req.user.sub;
    return this.notificacionesService.marcarTodasLeidas(idUsuario);
  }
}