import { Test, TestingModule } from '@nestjs/testing';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionesService } from './inscripciones.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';

describe('InscripcionesController', () => {
  let controller: InscripcionesController;

  const mockInscripcionesService = {
    crear: jest.fn(),
    listar: jest.fn(),
    obtenerPorMateria: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InscripcionesController],
      providers: [
        { provide: InscripcionesService, useValue: mockInscripcionesService },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    })
      .overrideGuard(AuthGuard).useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard).useValue({ canActivate: () => true })
      .compile();

    controller = module.get<InscripcionesController>(InscripcionesController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('crear delega el DTO al servicio', async () => {
    const dto = { id_materia: 1, usuarios: [10, 11] } as any;
    mockInscripcionesService.crear.mockResolvedValue([{ id_inscripcion: 1 }, { id_inscripcion: 2 }]);
    const result = await controller.crear(dto);
    expect(mockInscripcionesService.crear).toHaveBeenCalledWith(dto);
    expect(result).toHaveLength(2);
  });

  it('listar devuelve todas las inscripciones', async () => {
    mockInscripcionesService.listar.mockResolvedValue([]);
    await controller.listar();
    expect(mockInscripcionesService.listar).toHaveBeenCalled();
  });

  it('obtenerPorMateria convierte el id a número y delega al servicio', async () => {
    mockInscripcionesService.obtenerPorMateria.mockResolvedValue([]);
    await controller.obtenerPorMateria('3');
    expect(mockInscripcionesService.obtenerPorMateria).toHaveBeenCalledWith(3);
  });
});
