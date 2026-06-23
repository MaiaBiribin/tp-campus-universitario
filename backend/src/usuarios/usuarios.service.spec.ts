import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario, EstadoUsuario } from './usuario.entity';
import { Rol } from '../roles/rol.entity';

describe('UsuariosService', () => {
  let service: UsuariosService;

  const mockUsuariosRepo = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  const mockRolesRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        { provide: getRepositoryToken(Usuario), useValue: mockUsuariosRepo },
        { provide: getRepositoryToken(Rol), useValue: mockRolesRepo },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByMail', () => {
    it('devuelve el usuario si existe', async () => {
      const usuario = { id_usuario: 1, mail: 'a@b.com' };
      mockUsuariosRepo.findOne.mockResolvedValue(usuario);
      const result = await service.findByMail('a@b.com');
      expect(result).toEqual(usuario);
    });

    it('devuelve null si el usuario no existe', async () => {
      mockUsuariosRepo.findOne.mockResolvedValue(null);
      const result = await service.findByMail('noexiste@b.com');
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('crea el usuario con el rol Estudiante buscado por nombre en la DB', async () => {
      const rolEstudiante = { id_rol: 3, nombre: 'Estudiante' };
      mockRolesRepo.findOne.mockResolvedValue(rolEstudiante);
      const usuarioCreado = { id_usuario: 1, nombre: 'Juan' };
      mockUsuariosRepo.create.mockReturnValue(usuarioCreado);
      mockUsuariosRepo.save.mockResolvedValue(usuarioCreado);

      const result = await service.create('Juan', 'P', 'a@b.com', '12345678', 'pass');
      expect(mockRolesRepo.findOne).toHaveBeenCalledWith({ where: { nombre: 'Estudiante' } });
      expect(mockUsuariosRepo.save).toHaveBeenCalled();
      expect(result).toEqual(usuarioCreado);
    });

    it('lanza Error si el rol Estudiante no existe en la DB', async () => {
      mockRolesRepo.findOne.mockResolvedValue(null);
      await expect(service.create('Juan', 'P', 'a@b.com', '12345678', 'pass')).rejects.toThrow('No existe el rol Estudiante');
    });
  });

  describe('findPendientes', () => {
    it('devuelve lista de usuarios con estado PENDIENTE', async () => {
      const pendientes = [{ id_usuario: 1, nombre: 'Juan', mail: 'a@b.com' }];
      mockUsuariosRepo.find.mockResolvedValue(pendientes);
      const result = await service.findPendientes();
      expect(mockUsuariosRepo.find).toHaveBeenCalledWith(expect.objectContaining({
        where: { estado: EstadoUsuario.PENDIENTE },
      }));
      expect(result).toEqual(pendientes);
    });
  });

  describe('findHabilitados', () => {
    it('devuelve lista de usuarios con estado HABILITADO con su rol', async () => {
      const habilitados = [{ id_usuario: 2, nombre: 'Ana', rol: { nombre: 'Admin' } }];
      mockUsuariosRepo.find.mockResolvedValue(habilitados);
      const result = await service.findHabilitados();
      expect(mockUsuariosRepo.find).toHaveBeenCalledWith(expect.objectContaining({
        where: { estado: EstadoUsuario.HABILITADO },
      }));
      expect(result).toEqual(habilitados);
    });
  });

  describe('habilitarUsuario', () => {
    it('actualiza estado a HABILITADO y devuelve mensaje de confirmación', async () => {
      mockUsuariosRepo.update.mockResolvedValue({ affected: 1 });
      const result = await service.habilitarUsuario(1);
      expect(mockUsuariosRepo.update).toHaveBeenCalledWith(1, { estado: EstadoUsuario.HABILITADO });
      expect(result.mensaje).toBe('Usuario habilitado correctamente');
    });
  });

  describe('rechazarUsuario', () => {
    it('actualiza estado a RECHAZADO y devuelve mensaje de confirmación', async () => {
      mockUsuariosRepo.update.mockResolvedValue({ affected: 1 });
      const result = await service.rechazarUsuario(1);
      expect(mockUsuariosRepo.update).toHaveBeenCalledWith(1, { estado: EstadoUsuario.RECHAZADO });
      expect(result.mensaje).toBe('Usuario rechazado correctamente');
    });
  });
});
