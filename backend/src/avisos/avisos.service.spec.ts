import { Test, TestingModule } from '@nestjs/testing';
import { AvisosService } from './avisos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Aviso } from './aviso.entity';
import { Inscripcion } from '../inscripciones/inscripcion.entity';
import { Evento } from '../eventos/evento.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { BadRequestException } from '@nestjs/common';

describe('AvisosService', () => {
  let service: AvisosService;

  const mockAvisosRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockInscripcionRepo = { find: jest.fn() };
  const mockEventoRepo = { findOne: jest.fn() };
  const mockNotificacionesService = { crearNotificaciones: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvisosService,
        { provide: getRepositoryToken(Aviso), useValue: mockAvisosRepo },
        { provide: getRepositoryToken(Inscripcion), useValue: mockInscripcionRepo },
        { provide: getRepositoryToken(Evento), useValue: mockEventoRepo },
        { provide: NotificacionesService, useValue: mockNotificacionesService },
      ],
    }).compile();

    service = module.get<AvisosService>(AvisosService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const avisoGuardado = { id_aviso: 1, mensaje: 'Cancelada la clase' };
    const evento = { id_evento: 1, materia: { id_materia: 2 } };

    it('crea el aviso y notifica a los inscriptos de la materia', async () => {
      mockAvisosRepo.create.mockReturnValue(avisoGuardado);
      mockAvisosRepo.save.mockResolvedValue(avisoGuardado);
      mockEventoRepo.findOne.mockResolvedValue(evento);
      mockInscripcionRepo.find.mockResolvedValue([{ usuario: { id_usuario: 10 } }, { usuario: { id_usuario: 11 } }]);
      mockNotificacionesService.crearNotificaciones.mockResolvedValue(undefined);

      const result = await service.create('Cancelada la clase', 5, 1);
      expect(result).toEqual(avisoGuardado);
      expect(mockNotificacionesService.crearNotificaciones).toHaveBeenCalledWith(
        1,
        'Nuevo aviso: Cancelada la clase',
        [{ id_usuario: 10 }, { id_usuario: 11 }],
      );
    });

    it('lanza BadRequestException si el evento no existe', async () => {
      mockAvisosRepo.create.mockReturnValue({});
      mockAvisosRepo.save.mockResolvedValue({});
      mockEventoRepo.findOne.mockResolvedValue(null);

      await expect(service.create('test', 5, 999)).rejects.toThrow(BadRequestException);
    });

    it('no llama a crearNotificaciones si no hay inscriptos en la materia', async () => {
      mockAvisosRepo.create.mockReturnValue(avisoGuardado);
      mockAvisosRepo.save.mockResolvedValue(avisoGuardado);
      mockEventoRepo.findOne.mockResolvedValue(evento);
      mockInscripcionRepo.find.mockResolvedValue([]);

      await service.create('test', 5, 1);
      expect(mockNotificacionesService.crearNotificaciones).not.toHaveBeenCalled();
    });
  });

  describe('findByEvento', () => {
    it('devuelve los avisos de un evento ordenados por fecha', async () => {
      const avisos = [{ id_aviso: 2 }, { id_aviso: 1 }];
      mockAvisosRepo.find.mockResolvedValue(avisos);
      const result = await service.findByEvento(1);
      expect(mockAvisosRepo.find).toHaveBeenCalledWith(expect.objectContaining({
        where: { evento: { id_evento: 1 } },
      }));
      expect(result).toEqual(avisos);
    });
  });

  describe('findAll', () => {
    it('devuelve todos los avisos con sus relaciones', async () => {
      const avisos = [{ id_aviso: 1, evento: {}, usuarioCreador: {} }];
      mockAvisosRepo.find.mockResolvedValue(avisos);
      const result = await service.findAll();
      expect(result).toEqual(avisos);
    });
  });

  describe('remove', () => {
    it('elimina el aviso si el usuario es el creador', async () => {
      const aviso = { id_aviso: 1, usuarioCreador: { id_usuario: 5 } };
      mockAvisosRepo.findOne.mockResolvedValue(aviso);
      mockAvisosRepo.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1, 5);
      expect(mockAvisosRepo.delete).toHaveBeenCalledWith(1);
      expect(result.message).toBe('Aviso eliminado correctamente');
    });

    it('lanza BadRequestException si el aviso no existe', async () => {
      mockAvisosRepo.findOne.mockResolvedValue(null);
      await expect(service.remove(999, 5)).rejects.toThrow(BadRequestException);
    });

    it('lanza BadRequestException si el usuario no es el creador del aviso', async () => {
      const aviso = { id_aviso: 1, usuarioCreador: { id_usuario: 5 } };
      mockAvisosRepo.findOne.mockResolvedValue(aviso);
      await expect(service.remove(1, 99)).rejects.toThrow(BadRequestException);
    });
  });


  describe('update', () => {
  const aviso = {
    id_aviso: 1,
    mensaje: 'Mensaje original',
    usuarioCreador: { id_usuario: 5 },
    evento: {
      id_evento: 1,
      materia: { id_materia: 2 },
    },
  };

  it('lanza BadRequestException si el aviso no existe', async () => {
    mockAvisosRepo.findOne.mockResolvedValue(null);

    await expect(service.update(999, 5, { mensaje: 'Nuevo' })).rejects.toThrow(BadRequestException);
    expect(mockAvisosRepo.save).not.toHaveBeenCalled();
  });

  it('lanza BadRequestException si el usuario no es el creador', async () => {
    mockAvisosRepo.findOne.mockResolvedValue(aviso);

    await expect(service.update(1, 99, { mensaje: 'Nuevo' })).rejects.toThrow(BadRequestException);
    expect(mockAvisosRepo.save).not.toHaveBeenCalled();
    expect(mockNotificacionesService.crearNotificaciones).not.toHaveBeenCalled();
  });

  it('actualiza el mensaje y retorna el aviso guardado', async () => {
    const avisoActualizado = { ...aviso, mensaje: 'Nuevo mensaje' };
    mockAvisosRepo.findOne.mockResolvedValue({ ...aviso });
    mockAvisosRepo.save.mockResolvedValue(avisoActualizado);
    mockInscripcionRepo.find.mockResolvedValue([]);

    const result = await service.update(1, 5, { mensaje: 'Nuevo mensaje' });

    expect(mockAvisosRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({ mensaje: 'Nuevo mensaje' }),
    );
    expect(result).toEqual(avisoActualizado);
  });

  it('notifica a los inscriptos de la materia si los hay', async () => {
    mockAvisosRepo.findOne.mockResolvedValue({ ...aviso });
    mockAvisosRepo.save.mockResolvedValue(aviso);
    mockInscripcionRepo.find.mockResolvedValue([
      { usuario: { id_usuario: 10 } },
      { usuario: { id_usuario: 11 } },
    ]);

    await service.update(1, 5, { mensaje: 'Clase suspendida' });

    expect(mockNotificacionesService.crearNotificaciones).toHaveBeenCalledWith(
      1,
      'Aviso Editado: Clase suspendida',
      [{ id_usuario: 10 }, { id_usuario: 11 }],
    );
  });

  it('no llama a crearNotificaciones si no hay inscriptos', async () => {
    mockAvisosRepo.findOne.mockResolvedValue({ ...aviso });
    mockAvisosRepo.save.mockResolvedValue(aviso);
    mockInscripcionRepo.find.mockResolvedValue([]);

    await service.update(1, 5, { mensaje: 'Nuevo mensaje' });

    expect(mockNotificacionesService.crearNotificaciones).not.toHaveBeenCalled();
  });

  it('busca inscriptos por la materia del evento del aviso', async () => {
    mockAvisosRepo.findOne.mockResolvedValue({ ...aviso });
    mockAvisosRepo.save.mockResolvedValue(aviso);
    mockInscripcionRepo.find.mockResolvedValue([]);

    await service.update(1, 5, { mensaje: 'Nuevo mensaje' });

    expect(mockInscripcionRepo.find).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { materia: { id_materia: 2 } },
      }),
    );
  });
});




});
