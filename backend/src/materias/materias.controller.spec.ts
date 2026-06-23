import { Test, TestingModule } from '@nestjs/testing';
import { MateriasController } from './materias.controller';
import { MateriasService } from './materias.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';

describe('MateriasController', () => {
  let controller: MateriasController;

  const mockMateriasService = {
    findAll: jest.fn(),
    findByCarrera: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriasController],
      providers: [
        { provide: MateriasService, useValue: mockMateriasService },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    })
      .overrideGuard(AuthGuard).useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard).useValue({ canActivate: () => true })
      .compile();

    controller = module.get<MateriasController>(MateriasController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getMaterias delega al servicio y devuelve todas las materias', async () => {
    mockMateriasService.findAll.mockResolvedValue([{ id_materia: 1 }]);
    const result = await controller.getMaterias();
    expect(mockMateriasService.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it('getMateriasByCarrera delega al servicio con el id de la carrera', async () => {
    mockMateriasService.findByCarrera.mockResolvedValue([]);
    await controller.getMateriasByCarrera(2);
    expect(mockMateriasService.findByCarrera).toHaveBeenCalledWith(2);
  });

  it('createMateria delega al servicio con nombre e id_carrera del DTO', async () => {
    const dto = { nombre: 'Redes', id_carrera: 2 } as any;
    mockMateriasService.create.mockResolvedValue({ id_materia: 1 });
    await controller.createMateria(dto);
    expect(mockMateriasService.create).toHaveBeenCalledWith('Redes', 2);
  });
});
