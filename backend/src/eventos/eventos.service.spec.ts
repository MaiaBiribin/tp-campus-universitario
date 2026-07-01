import { Test, TestingModule } from '@nestjs/testing';
import { EventosService } from './eventos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Evento } from './evento.entity';
import { Inscripcion } from '../inscripciones/inscripcion.entity';
import { Aviso } from '../avisos/aviso.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { BadRequestException } from '@nestjs/common';

describe('EventosService', () => {
  let service: EventosService;

  const mockEventoRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockInscripcionRepo = { find: jest.fn() };
  const mockNotificacionesService = { crearNotificaciones: jest.fn() };
  // ✅ Mock agregado para AvisoRepository
  const mockAvisoRepo = { find: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventosService,
        { provide: getRepositoryToken(Evento),      useValue: mockEventoRepo },
        { provide: getRepositoryToken(Inscripcion), useValue: mockInscripcionRepo },
        { provide: getRepositoryToken(Aviso),       useValue: mockAvisoRepo },  // ✅ agregado
        { provide: NotificacionesService,           useValue: mockNotificacionesService },
      ],
    }).compile();

    service = module.get<EventosService>(EventosService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ─── findAll ────────────────────────────────────────────────────────────────

  describe('findAll', () => {
    it('devuelve todos los eventos', async () => {
      const eventos = [{ id_evento: 1 }, { id_evento: 2 }];
      mockEventoRepo.find.mockResolvedValue(eventos);
      const result = await service.findAll();
      expect(result).toEqual(eventos);
    });
  });

  // ─── findOne ────────────────────────────────────────────────────────────────

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

  // ─── create ─────────────────────────────────────────────────────────────────

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

  // ─── remove ─────────────────────────────────────────────────────────────────

  describe('remove', () => {
    it('elimina un evento pasado sin avisos', async () => {
      const fechaPasada = '2020-01-01';
      const evento = { id_evento: 1, fecha: fechaPasada, horaInicio: '08:00' };
      mockEventoRepo.findOne.mockResolvedValue(evento);
      mockAvisoRepo.find.mockResolvedValue([]);
      mockEventoRepo.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);
      expect(mockEventoRepo.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: 'Evento eliminado correctamente' });
    });

    it('elimina un evento futuro sin avisos', async () => {
      const fechaFutura = '2099-12-31';
      const evento = { id_evento: 2, fecha: fechaFutura, horaInicio: '10:00' };
      mockEventoRepo.findOne.mockResolvedValue(evento);
      mockAvisoRepo.find.mockResolvedValue([]);
      mockEventoRepo.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(2);
      expect(mockEventoRepo.delete).toHaveBeenCalledWith(2);
      expect(result).toEqual({ message: 'Evento eliminado correctamente' });
    });

    it('lanza BadRequestException si el evento no existe', async () => {
      mockEventoRepo.findOne.mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(BadRequestException);
    });

    it('lanza BadRequestException si el evento es futuro y tiene avisos', async () => {
      const fechaFutura = '2099-12-31';
      const evento = { id_evento: 3, fecha: fechaFutura, horaInicio: '10:00' };
      mockEventoRepo.findOne.mockResolvedValue(evento);
      mockAvisoRepo.find.mockResolvedValue([{ id_aviso: 1 }]);

      await expect(service.remove(3)).rejects.toThrow(BadRequestException);
      expect(mockEventoRepo.delete).not.toHaveBeenCalled();
    });
  });


  // ─── eventosUsuario ─────────────────────────────────────────────────────────

  describe('eventosUsuario', () => {
    it('devuelve solo eventos futuros y eventos en curso', async () => {
      const ahora = new Date();
      const hoy = ahora.toLocaleDateString('sv-SE');
      mockEventoRepo.find.mockResolvedValue([
      {
        id_evento: 1,
        fecha: hoy,
        horaInicio: "08:00",
        horaFin: "23:59",
        materia: {
          inscripciones: [
            {
              usuario: {
                id_usuario: 5
              }
            }
          ]
        }
      },

      {
        id_evento: 2,
        fecha: "2020-01-01",
        horaInicio: "08:00",
        horaFin: "09:00",
        materia: {
          inscripciones: [
            {
              usuario: {
                id_usuario: 5
              }
            }
          ]
        }
      },

      {
        id_evento: 3,
        fecha: "2099-12-31",
        horaInicio: "10:00",
        horaFin: "11:00",
        materia: {
          inscripciones: [
            {
              usuario: {
                id_usuario: 5
              }
            }
          ]
        }
      }
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