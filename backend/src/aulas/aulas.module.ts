import { Module } from '@nestjs/common';
import { AulasController } from './aulas.controller';

@Module({
  controllers: [AulasController],
})
export class AulasModule {}
