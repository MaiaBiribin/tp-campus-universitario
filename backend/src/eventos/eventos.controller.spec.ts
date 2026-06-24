import { Test, TestingModule } from '@nestjs/testing';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';

describe('EventosController', () => {
  let controller: EventosController;

  const mockEventosService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    eventosUsuario: jest.fn(),
    create: jest.fn(),
    updatePartial: jest.fn(),
    replace: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventosController],
      providers: [
        { provide: EventosService, useValue: mockEventosService },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    })
      .overrideGuard(AuthGuard).useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard).useValue({ canActivate: () => true })
      .compile();

    controller = module.get<EventosController>(EventosController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAllEventos devuelve todos los eventos', async () => {
    mockEventosService.findAll.mockResolvedValue([]);
    await controller.getAllEventos();
    expect(mockEventosService.findAll).toHaveBeenCalled();
  });

  it('getEventoById delega al servicio con el id', async () => {
    const evento = { id_evento: 1 };
    mockEventosService.findOne.mockResolvedValue(evento);
    const result = await controller.getEventoById(1);
    expect(mockEventosService.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(evento);
  });

  it('getEventosUsuario convierte el id string a número', async () => {
    mockEventosService.eventosUsuario.mockResolvedValue([]);
    await controller.getEventosUsuario('5');
    expect(mockEventosService.eventosUsuario).toHaveBeenCalledWith(5);
  });

  it('createEvento delega el DTO completo al servicio', async () => {
    const dto = { titulo: 'Clase', fecha: '2026-07-01', horaInicio: '08:00', horaFin: '10:00' } as any;
    mockEventosService.create.mockResolvedValue({ id_evento: 1 });
    await controller.createEvento(dto);
    expect(mockEventosService.create).toHaveBeenCalledWith(dto);
  });

  it('patchEvento delega el id y el DTO al servicio', async () => {
    const dto = { titulo: 'Modificado' } as any;
    mockEventosService.updatePartial.mockResolvedValue({ id_evento: 1 });
    await controller.patchEvento(1, dto);
    expect(mockEventosService.updatePartial).toHaveBeenCalledWith(1, dto);
  });

  it('putEvento delega el id y el DTO al servicio', async () => {
    const dto = { titulo: 'Completo' } as any;
    mockEventosService.replace.mockResolvedValue({ id_evento: 1 });
    await controller.putEvento(1, dto);
    expect(mockEventosService.replace).toHaveBeenCalledWith(1, dto);
  });

  it('deleteEvento delega el id al servicio', async () => {
    mockEventosService.remove.mockResolvedValue({ affected: 1 });
    await controller.deleteEvento(1);
    expect(mockEventosService.remove).toHaveBeenCalledWith(1);
  });
});
