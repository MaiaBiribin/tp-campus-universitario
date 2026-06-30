import { Test, TestingModule } from '@nestjs/testing';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLES } from '../auth/constants';
describe('EventosController', () => {
  let controller: EventosController;
  let service: any;

  const mockEventosService = {
    findAll: jest.fn(),
    eventosUsuario: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    eventoUsuario: jest.fn()
  };
  const mockAuthGuard = {canActivate: jest.fn(() => true),};
  const mockRolesGuard = {canActivate: jest.fn(() => true),};

  beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [EventosController],
    providers: [
      {
        provide: EventosService,
        useValue: {
          findAll: jest.fn(),
          findOne: jest.fn(),
          create: jest.fn(),
          eventosUsuario: jest.fn(),
          remove: jest.fn(),
        },
      },
    ],
  })
    .overrideGuard(AuthGuard)
    .useValue(mockAuthGuard)
    .overrideGuard(RolesGuard)
    .useValue(mockRolesGuard)
    .compile();

  controller = module.get<EventosController>(EventosController);
  service = module.get<EventosService>(EventosService);});

  describe('getAllEventos', () => {
    it('debe devolver todos los eventos cuando el usuario es Admin', async () => {
      const mockData = [{ id_evento: 1 }];
      service.findAll.mockResolvedValue(mockData as any);
      const req = { user: { sub: 1, rol: ROLES.ADMIN } };

      const result = await controller.getAllEventos(req);

      expect(result).toEqual(mockData);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('debe devolver los eventos del usuario cuando no es Admin', async () => {
      const mockData = [{ id_evento: 2 }];
      service.eventosUsuario.mockResolvedValue(mockData as any);
      const req = { user: { sub: 5, rol: 'Docente' } };

      const result = await controller.getAllEventos(req);

      expect(result).toEqual(mockData);
      expect(service.eventosUsuario).toHaveBeenCalledWith(5);
    });
  });

  describe('getEventosUsuario', () => {
    it('debe devolver eventos de un usuario', async () => {
      const mockData = [{ id_evento: 1 }];
      service.eventosUsuario.mockResolvedValue(mockData as any);

      const result = await controller.getEventosUsuario('1');

      expect(result).toEqual(mockData);
      expect(service.eventosUsuario).toHaveBeenCalledWith(1);
    });
  });

  describe('getEventoById', () => {
    it('debe devolver un evento por id cuando el usuario es Admin', async () => {
      const mockData = { id_evento: 1 };
      service.findOne.mockResolvedValue(mockData as any);
      const req = { user: { sub: 1, rol: ROLES.ADMIN } };

      const result = await controller.getEventoById(1, req);

      expect(result).toEqual(mockData);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('debe devolver el evento del usuario cuando no es Admin', async () => {
      const mockData = { id_evento: 1 };
      service.eventoUsuario = jest.fn().mockResolvedValue(mockData as any);
      const req = { user: { sub: 5, rol: 'Docente' } };

      const result = await controller.getEventoById(1, req);

      expect(result).toEqual(mockData);
      expect(service.eventoUsuario).toHaveBeenCalledWith(1, 5);
    });
  });

  describe('createEvento', () => {
    it('debe crear un evento', async () => {
      const dto = {
        titulo: 'Evento test',
        fecha: '2026-06-25',
        horaInicio: '10:00',
        horaFin: '11:00',
        aula: { id_aula: 1 },
        tipoEvento: { id_tipo_evento: 1 },
        materia: { id_materia: 1 },
      };

      const mockResult = { id_evento: 1, ...dto };

      service.create.mockResolvedValue(mockResult as any);

      const result = await controller.createEvento(dto as any);

      expect(result).toEqual(mockResult);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('deleteEvento', () => {
    it('debe eliminar un evento por id', async () => {
      const mockResponse = { message: 'Evento eliminado correctamente' };

      service.remove.mockResolvedValue(mockResponse as any);

      const result = await controller.deleteEvento(1);

      expect(result).toEqual(mockResponse);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});