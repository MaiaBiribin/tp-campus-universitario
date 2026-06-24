import { Test, TestingModule } from '@nestjs/testing';
import { EventosService } from './eventos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Evento } from './evento.entity';
import { Inscripcion } from '../inscripciones/inscripcion.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { BadRequestException } from '@nestjs/common';

describe('EventosService', () => {
  let service: EventosService;

  const mockEventoRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockInscripcionRepo = { find: jest.fn() };
  const mockNotificacionesService = { crearNotificaciones: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventosService,
        { provide: getRepositoryToken(Evento), useValue: mockEventoRepo },
        { provide: getRepositoryToken(Inscripcion), useValue: mockInscripcionRepo },
        { provide: NotificacionesService, useValue: mockNotificacionesService },
      ],
    }).compile();

    service = module.get<EventosService>(EventosService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('devuelve todos los eventos', async () => {
      const eventos = [{ id_evento: 1 }, { id_evento: 2 }];
      mockEventoRepo.find.mockResolvedValue(eventos);
      const result = await service.findAll();
      expect(result).toEqual(eventos);
    });
  });

  describe('findOne', () => {
    it('devuelve el evento por su ID', async () => {
      const evento = { id_evento: 1, titulo: 'Clase de Redes' };
      mockEventoRepo.findOneBy.mockResolvedValue(evento);
      const result = await service.findOne(1);
      expect(mockEventoRepo.findOneBy).toHaveBeenCalledWith({ id_evento: 1 });
      expect(result).toEqual(evento);
    });

    it('devuelve null si el evento no existe', async () => {
      mockEventoRepo.findOneBy.mockResolvedValue(null);
      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    const dto = {
      titulo: 'Clase de Redes',
      fecha: '2026-07-01',
      horaInicio: '08:00',
      horaFin: '10:00',
      aula: { id_aula: 1 },
      tipoEvento: { id_tipo_evento: 1 },
      materia: { id_materia: 2 },
    } as any;

    it('crea el evento y notifica a los inscriptos de la materia', async () => {
      mockEventoRepo.find.mockResolvedValue([]);
      const eventoGuardado = { id_evento: 1, ...dto };
      mockEventoRepo.create.mockReturnValue(eventoGuardado);
      mockEventoRepo.save.mockResolvedValue(eventoGuardado);
      mockInscripcionRepo.find.mockResolvedValue([{ usuario: { id_usuario: 10 } }]);
      mockNotificacionesService.crearNotificaciones.mockResolvedValue(undefined);

      const result = await service.create(dto);
      expect(result).toEqual(eventoGuardado);
      expect(mockNotificacionesService.crearNotificaciones).toHaveBeenCalled();
    });

    it('no notifica si no hay inscriptos en la materia', async () => {
      mockEventoRepo.find.mockResolvedValue([]);
      const eventoGuardado = { id_evento: 1 };
      mockEventoRepo.create.mockReturnValue(eventoGuardado);
      mockEventoRepo.save.mockResolvedValue(eventoGuardado);
      mockInscripcionRepo.find.mockResolvedValue([]);

      await service.create(dto);
      expect(mockNotificacionesService.crearNotificaciones).not.toHaveBeenCalled();
    });

    it('lanza BadRequestException si horaInicio >= horaFin', async () => {
      const dtoInvalido = { ...dto, horaInicio: '10:00', horaFin: '08:00' };
      await expect(service.create(dtoInvalido)).rejects.toThrow(BadRequestException);
    });

    it('lanza BadRequestException si el aula ya está ocupada en ese horario', async () => {
      const eventoExistente = {
        horaInicio: '08:00',
        horaFin: '10:00',
        aula: { nombre: 'A101' },
      };
      mockEventoRepo.find.mockResolvedValue([eventoExistente]);
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('updatePartial', () => {
    it('actualiza los campos y devuelve el evento actualizado', async () => {
      const eventoActualizado = { id_evento: 1, titulo: 'Nuevo título' };
      mockEventoRepo.update.mockResolvedValue({ affected: 1 });
      mockEventoRepo.findOneBy.mockResolvedValue(eventoActualizado);

      const result = await service.updatePartial(1, { titulo: 'Nuevo título' } as any);
      expect(mockEventoRepo.update).toHaveBeenCalledWith(1, expect.anything());
      expect(result).toEqual(eventoActualizado);
    });
  });

  describe('remove', () => {
    it('elimina el evento por ID', async () => {
      mockEventoRepo.delete.mockResolvedValue({ affected: 1 });
      await service.remove(1);
      expect(mockEventoRepo.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('replace', () => {
    it('guarda el evento con el id y los datos proporcionados', async () => {
      const eventoReemplazado = { id_evento: 1, titulo: 'Reemplazado' };
      mockEventoRepo.save.mockResolvedValue(eventoReemplazado);
      const result = await service.replace(1, { titulo: 'Reemplazado' } as any);
      expect(mockEventoRepo.save).toHaveBeenCalledWith(expect.objectContaining({ id_evento: 1 }));
      expect(result).toEqual(eventoReemplazado);
    });
  });

  describe('eventosUsuario', () => {
    it('devuelve solo eventos futuros y de hoy no pasados', async () => {
      const horaFutura = '23:59';
      const hoy = new Date().toLocaleDateString('sv-SE');
      const manana = new Date(Date.now() + 86400000).toLocaleDateString('sv-SE');
      const ayer = new Date(Date.now() - 86400000).toLocaleDateString('sv-SE');

      mockEventoRepo.find.mockResolvedValue([
        { id_evento: 1, fecha: manana, horaInicio: '08:00', materia: {} },
        { id_evento: 2, fecha: ayer,   horaInicio: '08:00', materia: {} },
        { id_evento: 3, fecha: hoy,    horaInicio: horaFutura, materia: {} },
      ]);

      const result = await service.eventosUsuario(5);
      const ids = result.map(e => e.id_evento);
      expect(ids).toContain(1);
      expect(ids).toContain(3);
      expect(ids).not.toContain(2);
    });

    it('devuelve array vacío si no hay eventos', async () => {
      mockEventoRepo.find.mockResolvedValue([]);
      const result = await service.eventosUsuario(5);
      expect(result).toEqual([]);
    });
  });
});
