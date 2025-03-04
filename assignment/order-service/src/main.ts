import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: 'http://localhost:3003',
      methods: 'GET,POST,PATCH,PUT,DELETE',
      
    }
    );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
