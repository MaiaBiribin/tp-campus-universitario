import { Test, TestingModule } from '@nestjs/testing';
import { NotificacionesController } from './notificaciones.controller';
import { NotificacionesService } from './notificaciones.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('NotificacionesController', () => {
  let controller: NotificacionesController;

  const mockNotificacionesService = {
    getMisNotificaciones: jest.fn(),
    marcarLeida: jest.fn(),
    marcarTodasLeidas: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificacionesController],
      providers: [
        { provide: NotificacionesService, useValue: mockNotificacionesService },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    })
      .overrideGuard(AuthGuard).useValue({ canActivate: () => true })
      .compile();

    controller = module.get<NotificacionesController>(NotificacionesController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getMisNotificaciones extrae el id del usuario del request y delega al servicio', async () => {
    const req = { user: { sub: 7 } };
    mockNotificacionesService.getMisNotificaciones.mockResolvedValue([]);
    await controller.getMisNotificaciones(req);
    expect(mockNotificacionesService.getMisNotificaciones).toHaveBeenCalledWith(7);
  });

  it('marcarLeida delega al servicio con el id de la notificación', async () => {
    mockNotificacionesService.marcarLeida.mockResolvedValue({ id_notificacion: 1, leida: true });
    const result = await controller.marcarLeida(1);
    expect(mockNotificacionesService.marcarLeida).toHaveBeenCalledWith(1);
    expect(result).toMatchObject({ leida: true });
  });

  it('marcarTodasLeidas extrae el id del usuario del request y delega al servicio', async () => {
    const req = { user: { sub: 7 } };
    mockNotificacionesService.marcarTodasLeidas.mockResolvedValue(undefined);
    await controller.marcarTodasLeidas(req);
    expect(mockNotificacionesService.marcarTodasLeidas).toHaveBeenCalledWith(7);
  });
});
