import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import LoggerModification from "@mmh/gateway/modifications/Logger.modification";
import {NestExpressApplication} from "@nestjs/platform-express";
const {GATEWAY_PORT, GATEWAY_PREFIX} = process.env;

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      logger: new LoggerModification()
    }
  );

  const globalPrefix = 'api';

  app.setGlobalPrefix(GATEWAY_PREFIX || 'api');

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  })

  const port = parseInt(GATEWAY_PORT) || 3333;
  await app.listen(3890);

  console.log(`GATEWAY Started`)
}

bootstrap();
