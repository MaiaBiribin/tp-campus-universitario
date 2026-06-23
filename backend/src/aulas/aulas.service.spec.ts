import { Test, TestingModule } from '@nestjs/testing';
import { AulasService } from './aulas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Aula } from './aula.entity';
import { NotFoundException } from '@nestjs/common';

// Mock del repositorio - simula TypeORM sin DB real
const mockAulasRepository = {
  find: jest.fn(), 
  findOneBy: jest.fn(), 
  create: jest.fn(),
  save: jest.fn(),
  merge: jest.fn(),
  remove: jest.fn(),
};

describe('AulasService', () => {
  let service: AulasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AulasService,
        {
          provide: getRepositoryToken(Aula),
          useValue: mockAulasRepository,
        },
      ],
    }).compile();

    service = module.get<AulasService>(AulasService);
    jest.clearAllMocks(); // limpia los mocks entre tests
  });

  // TEST 1 - findAll
  describe('findAll', () => {
    it('debe retornar un array de aulas', async () => {
      const aulasEsperadas = [
        { id_aula: 1, nombre: 'Aula 1', capacidad: 30, piso: 1, ubicacion: 'Planta Baja' },
        { id_aula: 2, nombre: 'Aula 2', capacidad: 40, piso: 2, ubicacion: 'Primer Piso' },
      ];
      mockAulasRepository.find.mockResolvedValue(aulasEsperadas);

      const resultado = await service.findAll();

      expect(resultado).toEqual(aulasEsperadas);
      expect(mockAulasRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  // TEST 2 - findOne
  describe('findOne', () => {
    it('debe retornar un aula si existe', async () => {
      const aulaEsperada = { id_aula: 1, nombre: 'Aula 1', capacidad: 30, piso: 1, ubicacion: 'Planta Baja' };
      mockAulasRepository.findOneBy.mockResolvedValue(aulaEsperada);

      const resultado = await service.findOne(1);

      expect(resultado).toEqual(aulaEsperada);
    });

    it('debe lanzar NotFoundException si el aula no existe', async () => {
      mockAulasRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  // TEST 3 - delete
  describe('delete', () => {
    it('debe eliminar un aula existente', async () => {
      const aulaExistente = { id_aula: 1, nombre: 'Aula 1', capacidad: 30, piso: 1, ubicacion: 'Planta Baja' };

      mockAulasRepository.findOneBy.mockResolvedValue(aulaExistente);
      mockAulasRepository.remove.mockResolvedValue(undefined);

      await expect(service.delete(1)).resolves.not.toThrow();
      expect(mockAulasRepository.remove).toHaveBeenCalledWith(aulaExistente);
    });

    it('debe lanzar NotFoundException si el aula no existe', async () => {
      mockAulasRepository.findOneBy.mockResolvedValue(null);

      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
    });
  });
});