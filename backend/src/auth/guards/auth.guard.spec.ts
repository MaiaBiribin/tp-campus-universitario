import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

const mockJwtService = { verifyAsync: jest.fn() };

const buildContext = (authorizationHeader?: string): ExecutionContext => ({
  switchToHttp: () => ({
    getRequest: () => ({
      headers: { authorization: authorizationHeader },
    }),
  }),
}) as unknown as ExecutionContext;

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    guard = new AuthGuard(mockJwtService as unknown as JwtService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('permite el acceso y asigna el payload al request cuando el token es válido', async () => {
    const payload = { sub: 1, mail: 'a@b.com', rol: 'Admin' };
    mockJwtService.verifyAsync.mockResolvedValue(payload);

    const request: any = { headers: { authorization: 'Bearer valid_token' } };
    const context = {
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
    expect(request['user']).toEqual(payload);
    expect(mockJwtService.verifyAsync).toHaveBeenCalledWith('valid_token', expect.anything());
  });

  it('lanza UnauthorizedException si no hay header Authorization', async () => {
    const context = buildContext(undefined);
    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });

  it('lanza UnauthorizedException si el header no es de tipo Bearer', async () => {
    const context = buildContext('Basic sometoken');
    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });

  it('lanza UnauthorizedException si el JWT no es válido', async () => {
    mockJwtService.verifyAsync.mockRejectedValue(new Error('invalid token'));
    const context = buildContext('Bearer bad_token');
    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });
});
