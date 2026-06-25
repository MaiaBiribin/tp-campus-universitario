import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario, EstadoUsuario } from './usuario.entity';
import { Rol } from '../roles/rol.entity';
import { Evento } from '../eventos/evento.entity';
import { NotFoundException } from '@nestjs/common';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn().mockResolvedValue('hashedPass'),
}));

describe('UsuariosService', () => {
  let service: UsuariosService;

  const mockUsuariosRepo = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockRolesRepo = { findOne: jest.fn() };
  const mockEventosRepo = { find: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        { provide: getRepositoryToken(Usuario), useValue: mockUsuariosRepo },
        { provide: getRepositoryToken(Rol), useValue: mockRolesRepo },
        { provide: getRepositoryToken(Evento), useValue: mockEventosRepo },
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
      expect(await service.findByMail('a@b.com')).toEqual(usuario);
    });

    it('devuelve null si no existe', async () => {
      mockUsuariosRepo.findOne.mockResolvedValue(null);
      expect(await service.findByMail('x@b.com')).toBeNull();
    });
  });

  describe('findAll', () => {
    it('devuelve todos los usuarios con su rol', async () => {
      const usuarios = [{ id_usuario: 1, rol: { nombre: 'Admin' } }];
      mockUsuariosRepo.find.mockResolvedValue(usuarios);
      expect(await service.findAll()).toEqual(usuarios);
      expect(mockUsuariosRepo.find).toHaveBeenCalledWith({ relations: { rol: true } });
    });
  });

  describe('findById', () => {
    it('devuelve el usuario si existe', async () => {
      const usuario = { id_usuario: 1, nombre: 'Juan' };
      mockUsuariosRepo.findOne.mockResolvedValue(usuario);
      expect(await service.findById(1)).toEqual(usuario);
    });

    it('lanza NotFoundException si no existe', async () => {
      mockUsuariosRepo.findOne.mockResolvedValue(null);
      await expect(service.findById(999)).rejects.toThrow(NotFoundException);
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
      expect(result).toEqual(usuarioCreado);
    });

    it('lanza Error si el rol Estudiante no existe', async () => {
      mockRolesRepo.findOne.mockResolvedValue(null);
      await expect(service.create('Juan', 'P', 'a@b.com', '12345678', 'pass')).rejects.toThrow('No existe el rol Estudiante');
    });
  });

  describe('update', () => {
    it('actualiza los campos y devuelve el usuario actualizado', async () => {
      const usuario = { id_usuario: 1, nombre: 'Juan' };
      const actualizado = { id_usuario: 1, nombre: 'Pedro' };
      mockUsuariosRepo.findOne.mockResolvedValueOnce(usuario).mockResolvedValueOnce(actualizado);
      mockUsuariosRepo.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(1, { nombre: 'Pedro' });
      expect(mockUsuariosRepo.update).toHaveBeenCalledWith(1, { nombre: 'Pedro' });
      expect(result).toEqual(actualizado);
    });

    it('lanza NotFoundException si el usuario no existe', async () => {
      mockUsuariosRepo.findOne.mockResolvedValue(null);
      await expect(service.update(999, { nombre: 'X' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('elimina el usuario si existe', async () => {
      const usuario = { id_usuario: 1 };
      mockUsuariosRepo.findOne.mockResolvedValue(usuario);
      mockUsuariosRepo.remove.mockResolvedValue(undefined);

      await service.remove(1);
      expect(mockUsuariosRepo.remove).toHaveBeenCalledWith(usuario);
    });

    it('lanza NotFoundException si el usuario no existe', async () => {
      mockUsuariosRepo.findOne.mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findPendientes', () => {
    it('devuelve usuarios con estado PENDIENTE', async () => {
      const pendientes = [{ id_usuario: 1, mail: 'a@b.com' }];
      mockUsuariosRepo.find.mockResolvedValue(pendientes);
      const result = await service.findPendientes();
      expect(mockUsuariosRepo.find).toHaveBeenCalledWith(expect.objectContaining({
        where: { estado: EstadoUsuario.PENDIENTE },
      }));
      expect(result).toEqual(pendientes);
    });
  });

  describe('findHabilitados', () => {
    it('devuelve usuarios con estado HABILITADO y su rol', async () => {
      const habilitados = [{ id_usuario: 2, rol: { nombre: 'Admin' } }];
      mockUsuariosRepo.find.mockResolvedValue(habilitados);
      expect(await service.findHabilitados()).toEqual(habilitados);
    });
  });

  describe('habilitarUsuario', () => {
    it('actualiza estado a HABILITADO y devuelve mensaje', async () => {
      mockUsuariosRepo.update.mockResolvedValue({ affected: 1 });
      const result = await service.habilitarUsuario(1);
      expect(mockUsuariosRepo.update).toHaveBeenCalledWith(1, { estado: EstadoUsuario.HABILITADO });
      expect(result.mensaje).toBe('Usuario habilitado correctamente');
    });
  });

  describe('rechazarUsuario', () => {
    it('actualiza estado a RECHAZADO y devuelve mensaje', async () => {
      mockUsuariosRepo.update.mockResolvedValue({ affected: 1 });
      const result = await service.rechazarUsuario(1);
      expect(mockUsuariosRepo.update).toHaveBeenCalledWith(1, { estado: EstadoUsuario.RECHAZADO });
      expect(result.mensaje).toBe('Usuario rechazado correctamente');
    });
  });

  describe('misEventos', () => {
    it('devuelve solo eventos futuros del usuario', async () => {
      const eventosDB = [
        { id_evento: 1, fecha: '2099-12-31', horaInicio: '08:00', materia: {} },
        { id_evento: 2, fecha: '2000-01-01', horaInicio: '08:00', materia: {} },
      ];
      mockEventosRepo.find.mockResolvedValue(eventosDB);

      const result = await service.misEventos(5);
      expect(result).toHaveLength(1);
      expect(result[0].id_evento).toBe(1);
    });
  });
});
