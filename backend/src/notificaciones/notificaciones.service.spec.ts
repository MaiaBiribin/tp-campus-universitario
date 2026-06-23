import { Test, TestingModule } from '@nestjs/testing';
import { NotificacionesService } from './notificaciones.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notificacion } from './notificacion.entity';
import { NotFoundException } from '@nestjs/common';

describe('NotificacionesService', () => {
  let service: NotificacionesService;

  const mockNotificacionesRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificacionesService,
        { provide: getRepositoryToken(Notificacion), useValue: mockNotificacionesRepo },
      ],
    }).compile();

    service = module.get<NotificacionesService>(NotificacionesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crearNotificaciones', () => {
    it('crea y guarda una notificación por cada inscripto', async () => {
      const inscriptos = [{ id_usuario: 1 }, { id_usuario: 2 }];
      mockNotificacionesRepo.create.mockImplementation((data) => data);
      mockNotificacionesRepo.save.mockResolvedValue(undefined);

      await service.crearNotificaciones(1, 'Nuevo evento', inscriptos);
      expect(mockNotificacionesRepo.create).toHaveBeenCalledTimes(2);
      expect(mockNotificacionesRepo.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMisNotificaciones', () => {
    it('devuelve las notificaciones del usuario ordenadas por fecha DESC', async () => {
      const notificaciones = [{ id_notificacion: 2 }, { id_notificacion: 1 }];
      mockNotificacionesRepo.find.mockResolvedValue(notificaciones);

      const result = await service.getMisNotificaciones(5);
      expect(mockNotificacionesRepo.find).toHaveBeenCalledWith(expect.objectContaining({
        where: { usuario: { id_usuario: 5 } },
        order: { fecha_creacion: 'DESC' },
      }));
      expect(result).toEqual(notificaciones);
    });
  });

  describe('marcarLeida', () => {
    it('marca la notificación como leída y la devuelve actualizada', async () => {
      const notificacion = { id_notificacion: 1, leida: false };
      mockNotificacionesRepo.findOneBy.mockResolvedValue(notificacion);
      mockNotificacionesRepo.save.mockResolvedValue({ ...notificacion, leida: true });

      const result = await service.marcarLeida(1);
      expect(mockNotificacionesRepo.findOneBy).toHaveBeenCalledWith({ id_notificacion: 1 });
      expect(result.leida).toBe(true);
    });

    it('lanza NotFoundException si la notificación no existe', async () => {
      mockNotificacionesRepo.findOneBy.mockResolvedValue(null);
      await expect(service.marcarLeida(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('marcarTodasLeidas', () => {
    it('actualiza todas las notificaciones no leídas del usuario', async () => {
      mockNotificacionesRepo.update.mockResolvedValue({ affected: 3 });
      await service.marcarTodasLeidas(5);
      expect(mockNotificacionesRepo.update).toHaveBeenCalledWith(
        { usuario: { id_usuario: 5 }, leida: false },
        { leida: true },
      );
    });
  });
});
