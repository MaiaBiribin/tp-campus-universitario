import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';

describe('UsuariosController', () => {
  let controller: UsuariosController;

  const mockUsuariosService = {
    create: jest.fn(),
    findPendientes: jest.fn(),
    findHabilitados: jest.fn(),
    habilitarUsuario: jest.fn(),
    rechazarUsuario: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        { provide: UsuariosService, useValue: mockUsuariosService },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    })
      .overrideGuard(AuthGuard).useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard).useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsuariosController>(UsuariosController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('registrarNuevoUsuario delega al servicio con los campos del DTO', async () => {
    mockUsuariosService.create.mockResolvedValue({ id_usuario: 1 });
    const dto = { nombre: 'Juan', apellido: 'P', mail: 'a@b.com', dni: '12345678', contrasena: 'pw' } as any;
    await controller.registrarNuevoUsuario(dto);
    expect(mockUsuariosService.create).toHaveBeenCalledWith('Juan', 'P', 'a@b.com', '12345678', 'pw');
  });

  it('getUsuariosPendientes delega al servicio', async () => {
    mockUsuariosService.findPendientes.mockResolvedValue([]);
    const result = await controller.getUsuariosPendientes();
    expect(mockUsuariosService.findPendientes).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('getUsuariosHabilitados delega al servicio', async () => {
    mockUsuariosService.findHabilitados.mockResolvedValue([]);
    await controller.getUsuariosHabilitados();
    expect(mockUsuariosService.findHabilitados).toHaveBeenCalled();
  });

  it('habilitarUsuario convierte el id a número y delega al servicio', async () => {
    mockUsuariosService.habilitarUsuario.mockResolvedValue({ mensaje: 'ok' });
    await controller.habilitarUsuario('5');
    expect(mockUsuariosService.habilitarUsuario).toHaveBeenCalledWith(5);
  });

  it('rechazarUsuario convierte el id a número y delega al servicio', async () => {
    mockUsuariosService.rechazarUsuario.mockResolvedValue({ mensaje: 'ok' });
    await controller.rechazarUsuario('3');
    expect(mockUsuariosService.rechazarUsuario).toHaveBeenCalledWith(3);
  });
});
