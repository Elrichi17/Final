import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);  
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  
  const port = process.env.PORT || 3000;
await app.listen(port);
console.log(`Application is running on: http://localhost:${port}`);

}
dotenv.config();
bootstrap();
