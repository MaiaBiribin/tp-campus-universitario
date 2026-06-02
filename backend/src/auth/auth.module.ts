import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    UsuariosModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
