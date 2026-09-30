import {
  ValidationPipe,
} from '@nestjs/common';

import {
  NestFactory,
} from '@nestjs/core';

import {
  ConfigService,
} from '@nestjs/config';

import {
  AppModule,
} from './app.module';

async function bootstrap() {
  // Cria a aplicação.
  const app =
    await NestFactory.create(AppModule);

  // Permite executar lifecycle hooks.
  app.enableShutdownHooks();

  // Validação global dos DTOs.
  app.useGlobalPipes(
    new ValidationPipe({
      // Remove propriedades não declaradas no DTO.
      whitelist: true,

      // Rejeita propriedades extras.
      forbidNonWhitelisted: true,

      // Permite transformações de tipos.
      transform: true,
    }),
  );

  const configService =
    app.get(ConfigService);

  const port =
    configService.get<number>(
      'PORT',
      3000,
    );

  await app.listen(port);
}

bootstrap();