import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aula } from './aula.entity';
import { AulasService } from './aulas.service';
import { AulasController } from './aulas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Aula])],
  providers: [AulasService],
  controllers: [AulasController],
  exports: [AulasService],
})
export class AulasModule {}