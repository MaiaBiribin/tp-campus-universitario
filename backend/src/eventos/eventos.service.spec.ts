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
  const mockAulaRepo = {findOne: jest.fn(),};
  const mockEventoRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    manager: {
      getRepository: jest.fn(() => mockAulaRepo),
    },
  };
  const mockInscripcionRepo = {find: jest.fn(),};
  const mockNotificacionesService = {crearNotificaciones: jest.fn(),};
  const mockAvisoRepo = {find: jest.fn(),};
  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
      providers: [
        EventosService,
        {
          provide: getRepositoryToken(Evento),
          useValue: mockEventoRepo
        },
        {
          provide: getRepositoryToken(Inscripcion),
          useValue: mockInscripcionRepo
        },
        {
          provide: getRepositoryToken(Aviso),
          useValue: mockAvisoRepo
        },
        {
          provide: NotificacionesService,
          useValue: mockNotificacionesService
        },
      ],
    }).compile();
    service =module.get<EventosService>(EventosService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {expect(service).toBeDefined();});

  describe('findAll', () => {
    it('devuelve todos los eventos', async () => {
      const eventos = [
        { id_evento:1 },
        { id_evento:2 }
      ];
      mockEventoRepo.find.mockResolvedValue(eventos);
      const result =await service.findAll();
      expect(result).toEqual(eventos);

    });
  });

  describe('findOne', () => {
    it('devuelve el evento por su ID', async () => {
      const evento =
      {
        id_evento:1,
        titulo:'Clase de Redes'
      };
      mockEventoRepo.findOneBy.mockResolvedValue(evento);

      const result =await service.findOne(1);
      expect(mockEventoRepo.findOneBy).toHaveBeenCalledWith({id_evento:1});
      expect(result).toEqual(evento);
    });

    it('devuelve null si no existe', async()=>{
      mockEventoRepo.findOneBy.mockResolvedValue(null);
      const result =await service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('create',()=>{
    const dto:any = {titulo:'Clase de Redes',fecha:'2026-07-01',horaInicio:'08:00',horaFin:'10:00',
      aula:{id_aula:1},tipoEvento:{id_tipo_evento:1},materia:{id_materia:2}
    };

    beforeEach(()=>{
      mockAulaRepo.findOne.mockResolvedValue({
        id_aula:1,
        nombre:'A101',
        capacidad:50
      });
    });

    it('crea el evento y notifica', async()=>{
      mockEventoRepo.find.mockResolvedValue([]);
      mockInscripcionRepo.find.mockResolvedValue([
        {
          usuario:{
            id_usuario:10
          }
        }
      ]);
      const eventoGuardado ={id_evento:1,
        ...dto};
      mockEventoRepo.create.mockReturnValue(eventoGuardado);
      mockEventoRepo.save
      .mockResolvedValue(eventoGuardado);
      await service.create(dto);
      expect(mockNotificacionesService.crearNotificaciones).toHaveBeenCalled();
    });
    it('no notifica si no hay inscriptos', async()=>{
      mockEventoRepo.find
      .mockResolvedValue([]);
      mockInscripcionRepo.find
      .mockResolvedValue([]);
      mockEventoRepo.create.mockReturnValue(dto);
      mockEventoRepo.save.mockResolvedValue(dto);
      await service.create(dto);
      expect(mockNotificacionesService.crearNotificaciones).not.toHaveBeenCalled();
    });

    it('lanza error si horaInicio >= horaFin', async()=>{
      const invalido =
      {
        ...dto,
        horaInicio:'10:00',
        horaFin:'08:00'
      };
      await expect(service.create(invalido)).rejects.toThrow(BadRequestException);
    });

    it('lanza error si aula ocupada', async()=>{
      mockEventoRepo.find.mockResolvedValue([
        {
          horaInicio:'08:00',
          horaFin:'10:00',
          aula:{
            nombre:'A101'
          }
        }
      ]);
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove',()=>{
    it('elimina evento pasado', async()=>{
      mockEventoRepo.findOne.mockResolvedValue({
        id_evento:1,
        fecha:'2020-01-01',
        horaInicio:'08:00'
      });
    mockAvisoRepo.find.mockResolvedValue([]);
      mockEventoRepo.delete.mockResolvedValue({});
      const result = await service.remove(1);
      expect(result).toEqual({message:'Evento eliminado correctamente'});
    });

    it('lanza error si no existe', async()=>{
      mockEventoRepo.findOne.mockResolvedValue(null);

      await expect(service.remove(999))
      .rejects.toThrow(BadRequestException);
    });
  });

  describe('eventosUsuario',()=>{
    it('devuelve eventos futuros', async()=>{
      const hoy =new Date().toLocaleDateString('sv-SE');
      mockEventoRepo.find.mockResolvedValue([
        {
          id_evento:1,
          fecha:hoy,
          horaInicio:'08:00',
          horaFin:'23:59'
        },
        {
          id_evento:2,
          fecha:'2020-01-01',
          horaInicio:'08:00',
          horaFin:'09:00'
        },
        {
          id_evento:3,
          fecha:'2099-12-31',
          horaInicio:'10:00',
          horaFin:'11:00'
        }
      ]);
      const result =await service.eventosUsuario(5);
      const ids =result.map(e=>e.id_evento);
      expect(ids).toContain(1);
      expect(ids).toContain(3);
      expect(ids).not.toContain(2);
    });

    it('devuelve vacío si no hay eventos', async()=>{
      mockEventoRepo.find.mockResolvedValue([]);
      const result =await service.eventosUsuario(5);
      expect(result).toEqual([]);});
  });
});