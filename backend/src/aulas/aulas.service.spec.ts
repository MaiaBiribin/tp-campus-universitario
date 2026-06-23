import { Test, TestingModule } from '@nestjs/testing';
import { AulasService } from './aulas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Aula } from './aula.entity';
import { NotFoundException } from '@nestjs/common';

describe('AulasService', () => {
  let service: AulasService;

  const mockAulasRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AulasService,
        { provide: getRepositoryToken(Aula), useValue: mockAulasRepo },
      ],
    }).compile();

    service = module.get<AulasService>(AulasService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('devuelve todas las aulas', async () => {
      const aulas = [{ id_aula: 1, nombre: 'A101' }, { id_aula: 2, nombre: 'B202' }];
      mockAulasRepo.find.mockResolvedValue(aulas);
      const result = await service.findAll();
      expect(result).toEqual(aulas);
    });
  });

  describe('findOne', () => {
    it('devuelve el aula por ID', async () => {
      const aula = { id_aula: 1, nombre: 'A101' };
      mockAulasRepo.findOneBy.mockResolvedValue(aula);
      const result = await service.findOne(1);
      expect(mockAulasRepo.findOneBy).toHaveBeenCalledWith({ id_aula: 1 });
      expect(result).toEqual(aula);
    });

    it('lanza NotFoundException si el aula no existe', async () => {
      mockAulasRepo.findOneBy.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('crea y guarda una nueva aula', async () => {
      const dto = { nombre: 'A101', capacidad: 30, piso: 1, ubicacion: 'Edificio A' };
      const aulaCreada = { id_aula: 1, ...dto };
      mockAulasRepo.create.mockReturnValue(aulaCreada);
      mockAulasRepo.save.mockResolvedValue(aulaCreada);

      const result = await service.create(dto);
      expect(mockAulasRepo.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(aulaCreada);
    });
  });

  describe('update', () => {
    it('actualiza parcialmente el aula y la devuelve', async () => {
      const aulaExistente = { id_aula: 1, nombre: 'A101', capacidad: 30 };
      const actualizada = { ...aulaExistente, nombre: 'A102' };
      mockAulasRepo.findOneBy.mockResolvedValue(aulaExistente);
      mockAulasRepo.save.mockResolvedValue(actualizada);

      const result = await service.update(1, { nombre: 'A102' });
      expect(mockAulasRepo.save).toHaveBeenCalled();
      expect(result).toEqual(actualizada);
    });
  });

  describe('delete', () => {
    it('elimina el aula si existe', async () => {
      const aula = { id_aula: 1, nombre: 'A101' };
      mockAulasRepo.findOneBy.mockResolvedValue(aula);
      mockAulasRepo.remove.mockResolvedValue(undefined);

      await service.delete(1);
      expect(mockAulasRepo.remove).toHaveBeenCalledWith(aula);
    });

    it('lanza NotFoundException si el aula no existe', async () => {
      mockAulasRepo.findOneBy.mockResolvedValue(null);
      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
    });
  });
});
