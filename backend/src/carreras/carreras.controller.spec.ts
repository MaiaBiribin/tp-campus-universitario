import { Test, TestingModule } from '@nestjs/testing';
import { CarrerasController } from './carreras.controller';
import { CarrerasService } from './carreras.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';

describe('CarrerasController', () => {
  let controller: CarrerasController;

  const mockCarrerasService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrerasController],
      providers: [
        { provide: CarrerasService, useValue: mockCarrerasService },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    })
      .overrideGuard(AuthGuard).useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard).useValue({ canActivate: () => true })
      .compile();

    controller = module.get<CarrerasController>(CarrerasController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getCarreras devuelve todas las carreras', async () => {
    const carreras = [{ id_carrera: 1, nombre: 'Sistemas' }];
    mockCarrerasService.findAll.mockResolvedValue(carreras);
    const result = await controller.getCarreras();
    expect(mockCarrerasService.findAll).toHaveBeenCalled();
    expect(result).toEqual(carreras);
  });

  it('createCarrera delega al servicio con el nombre del DTO', async () => {
    const dto = { nombre: 'Sistemas' } as any;
    mockCarrerasService.create.mockResolvedValue({ id_carrera: 1, nombre: 'Sistemas' });
    await controller.createCarrera(dto);
    expect(mockCarrerasService.create).toHaveBeenCalledWith('Sistemas');
  });
});
