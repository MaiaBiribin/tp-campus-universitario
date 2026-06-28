import { Test, TestingModule } from '@nestjs/testing';
import { AulasController } from './aulas.controller';
import { AulasService } from './aulas.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';

describe('AulasController', () => {
  let controller: AulasController;

  const mockAulasService = {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    replace: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AulasController],
      providers: [
        { provide: AulasService, useValue: mockAulasService },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    })
      .overrideGuard(AuthGuard).useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard).useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AulasController>(AulasController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('obtenerTodasLasAulas delega al servicio', async () => {
    mockAulasService.findAll.mockResolvedValue([]);
    await controller.obtenerTodasLasAulas();
    expect(mockAulasService.findAll).toHaveBeenCalled();
  });


});
