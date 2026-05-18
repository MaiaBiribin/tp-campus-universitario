import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AulasModule } from './aulas/aulas.module';
import { EventosModule } from './eventos/eventos.module';
import { UsuariosModule } from './usuarios/usuarios.module';


@Module({
  imports: [AuthModule, AulasModule, EventosModule, UsuariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
