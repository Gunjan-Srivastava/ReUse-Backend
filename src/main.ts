import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Turns on DTO validation for the entire app — every request is
  // checked against its DTO's rules before reaching a Controller method.
  app.useGlobalPipes(new ValidationPipe());

  // Turns on @Exclude() enforcement for the entire app — e.g. this is
  // what actually hides User.password from every API response.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
