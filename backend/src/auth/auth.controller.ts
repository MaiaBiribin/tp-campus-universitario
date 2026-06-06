import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';


@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() body: { mail: string; contrasena: string }) {
    return this.authService.signIn(body.mail, body.contrasena);
    }

    @Post('register')
    register(@Body() body: { mail: string; dni: string; contrasena: string }) {
    return this.authService.register(body.mail, body.dni, body.contrasena);
    }

    // Ruta protegida de prueba
    @UseGuards(AuthGuard)
    @Get('perfil')
    getPerfil(@Request() req) {
    return req.user;
    }
}
