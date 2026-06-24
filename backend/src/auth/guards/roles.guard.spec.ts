import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ForbiddenException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

const buildContext = (userRol: string | undefined, handler = {}, cls = {}): ExecutionContext =>
  ({
    getHandler: () => handler,
    getClass: () => cls,
    switchToHttp: () => ({
      getRequest: () => ({ user: userRol ? { rol: userRol } : undefined }),
    }),
  }) as unknown as ExecutionContext;

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: jest.Mocked<Reflector>;

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn() } as unknown as jest.Mocked<Reflector>;
    guard = new RolesGuard(reflector);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('permite el acceso si el endpoint no requiere ningún rol', () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    const context = buildContext('Estudiante');
    expect(guard.canActivate(context)).toBe(true);
  });

  it('permite el acceso si el usuario tiene el rol requerido', () => {
    reflector.getAllAndOverride.mockReturnValue(['Admin']);
    const context = buildContext('Admin');
    expect(guard.canActivate(context)).toBe(true);
  });

  it('permite el acceso si el usuario tiene uno de varios roles requeridos', () => {
    reflector.getAllAndOverride.mockReturnValue(['Admin', 'Docente']);
    const context = buildContext('Docente');
    expect(guard.canActivate(context)).toBe(true);
  });

  it('lanza ForbiddenException si el usuario no tiene el rol requerido', () => {
    reflector.getAllAndOverride.mockReturnValue(['Admin']);
    const context = buildContext('Estudiante');
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('lanza ForbiddenException si el usuario no tiene ningún rol', () => {
    reflector.getAllAndOverride.mockReturnValue(['Admin']);
    const context = buildContext(undefined);
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
