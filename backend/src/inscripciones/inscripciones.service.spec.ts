import { Test, TestingModule } from '@nestjs/testing';
import { InscripcionesService } from './inscripciones.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Inscripcion } from './inscripcion.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Materia } from '../materias/materia.entity';
import { NotFoundException } from '@nestjs/common';

describe('InscripcionesService', () => {
  let service: InscripcionesService;

  const mockInscripcionesRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  const mockUsuariosRepo = { findOne: jest.fn() };
  const mockMateriasRepo = { findOne: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InscripcionesService,
        { provide: getRepositoryToken(Inscripcion), useValue: mockInscripcionesRepo },
        { provide: getRepositoryToken(Usuario), useValue: mockUsuariosRepo },
        { provide: getRepositoryToken(Materia), useValue: mockMateriasRepo },
      ],
    }).compile();

    service = module.get<InscripcionesService>(InscripcionesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crear', () => {
    const dto = { id_materia: 1, usuarios: [10, 11] };
    const materia = { id_materia: 1, nombre: 'Redes' };

    it('crea inscripciones para cada usuario encontrado', async () => {
      mockMateriasRepo.findOne.mockResolvedValue(materia);
      mockUsuariosRepo.findOne
        .mockResolvedValueOnce({ id_usuario: 10 })
        .mockResolvedValueOnce({ id_usuario: 11 });
      mockInscripcionesRepo.create.mockImplementation((data) => data);
      mockInscripcionesRepo.save.mockImplementation((data) => Promise.resolve({ id_inscripcion: 1, ...data }));

      const result = await service.crear(dto);
      expect(result).toHaveLength(2);
      expect(mockInscripcionesRepo.save).toHaveBeenCalledTimes(2);
    });

    it('omite usuarios que no existen en la DB', async () => {
      mockMateriasRepo.findOne.mockResolvedValue(materia);
      mockUsuariosRepo.findOne
        .mockResolvedValueOnce({ id_usuario: 10 })
        .mockResolvedValueOnce(null);
      mockInscripcionesRepo.create.mockImplementation((data) => data);
      mockInscripcionesRepo.save.mockResolvedValue({ id_inscripcion: 1 });

      const result = await service.crear(dto);
      expect(result).toHaveLength(1);
    });

    it('lanza NotFoundException si la materia no existe', async () => {
      mockMateriasRepo.findOne.mockResolvedValue(null);
      await expect(service.crear(dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('obtenerPorMateria', () => {
    it('devuelve inscripciones con relaciones de usuario y materia', async () => {
      const inscripciones = [{ id_inscripcion: 1, usuario: { id_usuario: 10 }, materia: { id_materia: 1 } }];
      mockInscripcionesRepo.find.mockResolvedValue(inscripciones);

      const result = await service.obtenerPorMateria(1);
      expect(mockInscripcionesRepo.find).toHaveBeenCalledWith(expect.objectContaining({
        where: { materia: { id_materia: 1 } },
        relations: { usuario: true, materia: true },
      }));
      expect(result).toEqual(inscripciones);
    });
  });

  describe('listar', () => {
    it('devuelve todas las inscripciones', async () => {
      const inscripciones = [{ id_inscripcion: 1 }, { id_inscripcion: 2 }];
      mockInscripcionesRepo.find.mockResolvedValue(inscripciones);
      const result = await service.listar();
      expect(result).toEqual(inscripciones);
    });
  });
});
