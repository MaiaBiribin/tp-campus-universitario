import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { AulasService } from '../aulas/aulas.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';

describe('UsuariosController', () => {
  let controller: UsuariosController;

  const mockUsuariosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findPendientes: jest.fn(),
    findHabilitados: jest.fn(),
    habilitarUsuario: jest.fn(),
    rechazarUsuario: jest.fn(),
    misEventos: jest.fn(),
  };

  const mockAulasService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        { provide: UsuariosService, useValue: mockUsuariosService },
        { provide: AulasService, useValue: mockAulasService },
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

  it('getUsuarios devuelve todos los usuarios', async () => {
    mockUsuariosService.findAll.mockResolvedValue([]);
    await controller.getUsuarios();
    expect(mockUsuariosService.findAll).toHaveBeenCalled();
  });

  it('getUsuariosPendientes delega al servicio', async () => {
    mockUsuariosService.findPendientes.mockResolvedValue([]);
    expect(await controller.getUsuariosPendientes()).toEqual([]);
  });

  it('getUsuariosHabilitados delega al servicio', async () => {
    mockUsuariosService.findHabilitados.mockResolvedValue([]);
    await controller.getUsuariosHabilitados();
    expect(mockUsuariosService.findHabilitados).toHaveBeenCalled();
  });

  it('getUsuarioById parsea el id y lo busca en el servicio', async () => {
    mockUsuariosService.findById.mockResolvedValue({ id_usuario: 5 });
    await controller.getUsuarioById('5');
    expect(mockUsuariosService.findById).toHaveBeenCalledWith(5);
  });

  it('patchUsuario parsea el id y delega la actualización al servicio', async () => {
    mockUsuariosService.update.mockResolvedValue({ id_usuario: 1 });
    await controller.patchUsuario('1', { nombre: 'Nuevo' } as any);
    expect(mockUsuariosService.update).toHaveBeenCalledWith(1, { nombre: 'Nuevo' });
  });

  it('putUsuario parsea el id y delega la actualización al servicio', async () => {
    mockUsuariosService.update.mockResolvedValue({ id_usuario: 1 });
    await controller.putUsuario('1', { nombre: 'Reemplazado' } as any);
    expect(mockUsuariosService.update).toHaveBeenCalledWith(1, { nombre: 'Reemplazado' });
  });

  it('deleteUsuario parsea el id y elimina en el servicio', async () => {
    mockUsuariosService.remove.mockResolvedValue(undefined);
    await controller.deleteUsuario('2');
    expect(mockUsuariosService.remove).toHaveBeenCalledWith(2);
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

  it('getMisEventos extrae el id del token y devuelve los eventos del usuario', async () => {
    const req = { user: { sub: 7 } };
    mockUsuariosService.misEventos.mockResolvedValue([]);
    await controller.getMisEventos(req);
    expect(mockUsuariosService.misEventos).toHaveBeenCalledWith(7);
  });

  it('getAulas delega al AulasService', async () => {
    mockAulasService.findAll.mockResolvedValue([{ id_aula: 1 }]);
    const result = await controller.getAulas();
    expect(mockAulasService.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });
});
