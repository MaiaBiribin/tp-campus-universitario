import { Controller, Get, Patch, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { NotificacionesService } from './notificaciones.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { NotificacionResponseDto } from './dto/notificacion-response.dto';

@ApiTags('notificaciones')
@ApiBearerAuth()
@Controller('notificaciones')
export class NotificacionesController {

  constructor(private readonly notificacionesService: NotificacionesService) {}

  @UseGuards(AuthGuard)
  @Get('mis-notificaciones')
  @ApiOperation({
    summary: 'Obtener mis notificaciones',
    description: 'Devuelve todas las notificaciones del usuario actualmente autenticado, ordenadas por fecha de creación.',
  })
  @ApiResponse({ status: 200, description: 'Notificaciones del usuario obtenidas exitosamente', type: [NotificacionResponseDto] })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  getMisNotificaciones(@Request() req) {
    const idUsuario = req.user.sub;
    return this.notificacionesService.getMisNotificaciones(idUsuario);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/leida')
  @ApiOperation({
    summary: 'Marcar notificación como leída',
    description: 'Marca una notificación específica como leída mediante su ID.',
  })
  @ApiParam({ name: 'id', description: 'ID numérico de la notificación a marcar como leída', example: 1 })
  @ApiResponse({ status: 200, description: 'Notificación marcada como leída', type: NotificacionResponseDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
  marcarLeida(@Param('id', ParseIntPipe) id: number) {
    return this.notificacionesService.marcarLeida(id);
  }

  @UseGuards(AuthGuard)
  @Patch('marcar-todas-leidas')
  @ApiOperation({
    summary: 'Marcar todas las notificaciones como leídas',
    description: 'Marca como leídas todas las notificaciones pendientes del usuario actualmente autenticado.',
  })
  @ApiResponse({ status: 200, description: 'Todas las notificaciones marcadas como leídas' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  marcarTodasLeidas(@Request() req) {
    const idUsuario = req.user.sub;
    return this.notificacionesService.marcarTodasLeidas(idUsuario);
  }
}
