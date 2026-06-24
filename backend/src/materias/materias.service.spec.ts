import { Test, TestingModule } from '@nestjs/testing';
import { MateriasService } from './materias.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Materia } from './materia.entity';

describe('MateriasService', () => {
  let service: MateriasService;

  const mockMateriasRepo = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MateriasService,
        { provide: getRepositoryToken(Materia), useValue: mockMateriasRepo },
      ],
    }).compile();

    service = module.get<MateriasService>(MateriasService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('devuelve todas las materias', async () => {
      const materias = [{ id_materia: 1, nombre: 'Matemática' }, { id_materia: 2, nombre: 'Física' }];
      mockMateriasRepo.find.mockResolvedValue(materias);
      const result = await service.findAll();
      expect(result).toEqual(materias);
    });
  });

  describe('findByCarrera', () => {
    it('filtra materias por id de carrera', async () => {
      const materias = [{ id_materia: 2, nombre: 'Física' }];
      mockMateriasRepo.find.mockResolvedValue(materias);
      const result = await service.findByCarrera(1);
      expect(mockMateriasRepo.find).toHaveBeenCalledWith({ where: { carrera: { id_carrera: 1 } } });
      expect(result).toEqual(materias);
    });
  });

  describe('create', () => {
    it('crea y guarda la nueva materia asociada a la carrera', async () => {
      const materia = { id_materia: 3, nombre: 'Química', carrera: { id_carrera: 2 } };
      mockMateriasRepo.create.mockReturnValue(materia);
      mockMateriasRepo.save.mockResolvedValue(materia);

      const result = await service.create('Química', 2);
      expect(mockMateriasRepo.create).toHaveBeenCalledWith({ nombre: 'Química', carrera: { id_carrera: 2 } });
      expect(mockMateriasRepo.save).toHaveBeenCalledWith(materia);
      expect(result).toEqual(materia);
    });
  });
});
