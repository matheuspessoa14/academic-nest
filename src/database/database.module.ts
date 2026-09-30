import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  // Registra o serviço de banco.
  providers: [DatabaseService],

  // Permite que outros módulos utilizem o serviço.
  exports: [DatabaseService],
})
export class DatabaseModule {}