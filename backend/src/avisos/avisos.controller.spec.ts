import { Test, TestingModule } from '@nestjs/testing';
import { AvisosController } from './avisos.controller';
import { AvisosService } from './avisos.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';

describe('AvisosController', () => {
  let controller: AvisosController;

  const mockAvisosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByEvento: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvisosController],
      providers: [
        { provide: AvisosService, useValue: mockAvisosService },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    })
      .overrideGuard(AuthGuard).useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard).useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AvisosController>(AvisosController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create extrae el id del usuario del request y delega al servicio', async () => {
    const dto = { mensaje: 'Clase cancelada', id_evento: 1 } as any;
    const req = { user: { sub: 5 } };
    mockAvisosService.create.mockResolvedValue({ id_aviso: 1 });
    await controller.create(dto, req);
    expect(mockAvisosService.create).toHaveBeenCalledWith('Clase cancelada', 5, 1);
  });

  it('findAll delega al servicio', async () => {
    mockAvisosService.findAll.mockResolvedValue([]);
    await controller.findAll();
    expect(mockAvisosService.findAll).toHaveBeenCalled();
  });

  it('findByEvento delega al servicio con el id del evento', async () => {
    mockAvisosService.findByEvento.mockResolvedValue([]);
    await controller.findByEvento(1);
    expect(mockAvisosService.findByEvento).toHaveBeenCalledWith(1);
  });

  it('remove delega al servicio con el id del aviso y del usuario autenticado', async () => {
    const req = { user: { sub: 5 } };
    mockAvisosService.remove.mockResolvedValue({ message: 'Aviso eliminado correctamente' });
    await controller.remove(1, req);
    expect(mockAvisosService.remove).toHaveBeenCalledWith(1, 5);
  });

  it('update delega al servicio con el id del aviso, el usuario autenticado y el dto', async () => {
  const dto = { mensaje: 'Mensaje editado' } as any;
  const req = { user: { sub: 5 } };
  mockAvisosService.update.mockResolvedValue({ id_aviso: 1, mensaje: 'Mensaje editado' });

  await controller.update(1, dto, req);

  expect(mockAvisosService.update).toHaveBeenCalledWith(1, 5, dto);
  });

});
