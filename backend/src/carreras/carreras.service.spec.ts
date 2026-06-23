import { Test, TestingModule } from '@nestjs/testing';
import { CarrerasService } from './carreras.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Carrera } from './carrera.entity';

describe('CarrerasService', () => {
  let service: CarrerasService;

  const mockCarrerasRepo = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarrerasService,
        { provide: getRepositoryToken(Carrera), useValue: mockCarrerasRepo },
      ],
    }).compile();

    service = module.get<CarrerasService>(CarrerasService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('devuelve todas las carreras', async () => {
      const carreras = [{ id_carrera: 1, nombre: 'Sistemas' }, { id_carrera: 2, nombre: 'Electrónica' }];
      mockCarrerasRepo.find.mockResolvedValue(carreras);
      const result = await service.findAll();
      expect(result).toEqual(carreras);
    });
  });

  describe('create', () => {
    it('crea y guarda una nueva carrera', async () => {
      const carrera = { id_carrera: 1, nombre: 'Sistemas' };
      mockCarrerasRepo.create.mockReturnValue(carrera);
      mockCarrerasRepo.save.mockResolvedValue(carrera);

      const result = await service.create('Sistemas');
      expect(mockCarrerasRepo.create).toHaveBeenCalledWith({ nombre: 'Sistemas' });
      expect(mockCarrerasRepo.save).toHaveBeenCalledWith(carrera);
      expect(result).toEqual(carrera);
    });
  });
});
