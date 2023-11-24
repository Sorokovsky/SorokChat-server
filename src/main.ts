import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  dotenv.config();
  const port: number = +process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('SorokChat')
  .setDescription('The Better messanger')
  .setVersion('1.0')
  .build();
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(port, () => Logger.log("Server started on port " + port));
}
bootstrap();