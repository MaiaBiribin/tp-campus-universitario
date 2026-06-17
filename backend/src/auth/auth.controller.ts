import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { PerfilResponseDto } from './dto/perfil-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Valida las credenciales del usuario y devuelve un token JWT para autenticación',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Credenciales necesarias para el inicio de sesión: correo electrónico y contraseña',
  })
  @ApiResponse({ status: 200, description: 'Login exitoso', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas o usuario no habilitado' })
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.mail, loginDto.contrasena);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Registrar nuevo usuario',
    description: 'Crea una nueva cuenta de usuario en el sistema con estado pendiente de habilitación por el administrador',
  })
  @ApiBody({
    type: RegisterDto,
    description: 'Datos personales y credenciales del nuevo usuario a registrar',
  })
  @ApiResponse({ status: 201, description: 'Solicitud enviada, pendiente de habilitación', type: RegisterResponseDto })
  @ApiResponse({ status: 400, description: 'El mail ya está registrado' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.nombre,
      registerDto.apellido,
      registerDto.mail,
      registerDto.dni,
      registerDto.contrasena,
    );
  }

  @UseGuards(AuthGuard)
  @Get('perfil')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener perfil del usuario',
    description: 'Requiere un token JWT válido. Devuelve los datos del usuario actualmente autenticado extraídos del payload del token',
  })
  @ApiResponse({ status: 200, description: 'Datos del usuario autenticado', type: PerfilResponseDto })
  @ApiResponse({ status: 401, description: 'Token inválido o ausente' })
  getPerfil(@Request() req) {
    return req.user;
  }
}
