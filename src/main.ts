import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

import * as Sentry from '@sentry/node';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  Sentry.init({ dsn: process.env.SENTRY_DSN });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(
    process.env.PORT ? Number(process.env.PORT) : 3000,
    process.env.HOST || '127.0.0.1',
  );
}
bootstrap();
