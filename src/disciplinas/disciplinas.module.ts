import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { DisciplinasController } from './disciplinas.controller';
import { DisciplinasRepository } from './disciplinas.repository';
import { DisciplinasService } from './disciplinas.service';

@Module({
  imports: [
    // Dá acesso ao DatabaseService.
    DatabaseModule,
  ],

  controllers: [
    DisciplinasController,
  ],

  providers: [
    DisciplinasService,
    DisciplinasRepository,
  ],
})
export class DisciplinasModule {}