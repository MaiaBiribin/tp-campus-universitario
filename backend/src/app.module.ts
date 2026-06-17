import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Le permite a NestJS leer el .env
import { TypeOrmModule } from '@nestjs/typeorm'; // Conectar NestJS con la base de datos

import { AuthModule } from './auth/auth.module';
import { AulasModule } from './aulas/aulas.module';
import { EventosModule } from './eventos/eventos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { CarrerasModule } from './carreras/carreras.module';
import { MateriasModule } from './materias/materias.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { AvisosModule } from './avisos/avisos.module';


@Module({
  imports: [
    // 1. Carga el .env y lo hace disponible en todo el proyecto
    ConfigModule.forRoot({
      isGlobal: true, // no hace falta importarlo en cada módulo
    }),

    // 2. Conecta a Postgres leyendo las variables del .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // ⚠️ solo en desarrollo
        ssl: {
          rejectUnauthorized: false, // necesario para conectarse a Neon
        },
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    AulasModule,
    EventosModule,
    UsuariosModule,
    RolesModule,
    CarrerasModule,
    MateriasModule,
    InscripcionesModule,
    NotificacionesModule,
    AvisosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
