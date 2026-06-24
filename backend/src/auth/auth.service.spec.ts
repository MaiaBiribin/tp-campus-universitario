import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { EstadoUsuario } from '../usuarios/usuario.entity';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsuariosService = {
    findByMail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsuariosService, useValue: mockUsuariosService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    const usuarioHabilitado = {
      id_usuario: 1,
      mail: 'test@mail.com',
      contrasena: 'hashedPass',
      estado: EstadoUsuario.HABILITADO,
      rol: { nombre: 'Estudiante' },
      nombre: 'Juan',
      apellido: 'Pérez',
      dni: '12345678',
    };

    it('devuelve access_token cuando las credenciales son válidas', async () => {
      mockUsuariosService.findByMail.mockResolvedValue(usuarioHabilitado);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.signAsync.mockResolvedValue('jwt_token');

      const result = await service.signIn('test@mail.com', 'password');
      expect(result).toEqual({ access_token: 'jwt_token' });
    });

    it('lanza UnauthorizedException si el usuario no existe', async () => {
      mockUsuariosService.findByMail.mockResolvedValue(null);
      await expect(service.signIn('noexiste@mail.com', 'pass')).rejects.toThrow(UnauthorizedException);
    });

    it('lanza UnauthorizedException si la contraseña es incorrecta', async () => {
      mockUsuariosService.findByMail.mockResolvedValue(usuarioHabilitado);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      await expect(service.signIn('test@mail.com', 'wrongpass')).rejects.toThrow(UnauthorizedException);
    });

    it('lanza UnauthorizedException si el usuario está PENDIENTE', async () => {
      mockUsuariosService.findByMail.mockResolvedValue({ ...usuarioHabilitado, estado: EstadoUsuario.PENDIENTE });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      await expect(service.signIn('test@mail.com', 'password')).rejects.toThrow(UnauthorizedException);
    });

    it('lanza UnauthorizedException si el usuario está RECHAZADO', async () => {
      mockUsuariosService.findByMail.mockResolvedValue({ ...usuarioHabilitado, estado: EstadoUsuario.RECHAZADO });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      await expect(service.signIn('test@mail.com', 'password')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('crea el usuario y devuelve mensaje de confirmación', async () => {
      mockUsuariosService.findByMail.mockResolvedValue(null);
      mockUsuariosService.create.mockResolvedValue(undefined);

      const result = await service.register('Juan', 'Pérez', 'nuevo@mail.com', '12345678', 'pass');
      expect(result.mensaje).toBeDefined();
      expect(mockUsuariosService.create).toHaveBeenCalledWith('Juan', 'Pérez', 'nuevo@mail.com', '12345678', 'pass');
    });

    it('lanza BadRequestException si el mail ya está registrado', async () => {
      mockUsuariosService.findByMail.mockResolvedValue({ id_usuario: 1 });
      await expect(service.register('Juan', 'Pérez', 'existe@mail.com', '12345678', 'pass')).rejects.toThrow(BadRequestException);
      expect(mockUsuariosService.create).not.toHaveBeenCalled();
    });
  });
});
