import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signIn: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    })
      .overrideGuard(AuthGuard).useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signIn delega al servicio las credenciales del DTO', async () => {
    mockAuthService.signIn.mockResolvedValue({ access_token: 'token' });
    const result = await controller.signIn({ mail: 'a@b.com', contrasena: '123' } as any);
    expect(mockAuthService.signIn).toHaveBeenCalledWith('a@b.com', '123');
    expect(result).toEqual({ access_token: 'token' });
  });

  it('register delega al servicio los datos del DTO', async () => {
    const msg = { mensaje: 'Solicitud enviada. Aguardá la habilitación del administrador.' };
    mockAuthService.register.mockResolvedValue(msg);
    const dto = { nombre: 'Juan', apellido: 'P', mail: 'a@b.com', dni: '12345678', contrasena: 'pw' } as any;
    const result = await controller.register(dto);
    expect(mockAuthService.register).toHaveBeenCalledWith('Juan', 'P', 'a@b.com', '12345678', 'pw');
    expect(result).toEqual(msg);
  });
});
