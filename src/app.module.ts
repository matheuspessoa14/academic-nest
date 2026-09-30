import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AlunosModule } from './alunos/alunos.module';
import { DisciplinasModule } from './disciplinas/disciplinas.module';

@Module({
  imports: [
    // Variáveis do .env disponíveis globalmente.
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AlunosModule,
    DisciplinasModule,
  ],
})
export class AppModule {}