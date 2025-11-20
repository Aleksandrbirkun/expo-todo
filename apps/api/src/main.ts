/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Enable CORS for frontend applications
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:3004',
      'http://localhost:4200',
      'http://localhost:8081', // Expo
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Configure Swagger only in development mode
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Todo API')
      .setDescription('The Todo API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    Logger.log(`📚 Swagger documentation is available at: http://localhost:${process.env.PORT || 3001}/api/docs`);

    // Optionally generate OpenAPI spec file if environment variable is set
    if (process.env.GENERATE_OPENAPI_SPEC === 'true') {
      const outputPath = path.resolve(process.cwd(), 'apps/api/openapi.json');
      fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
      Logger.log(`📄 OpenAPI spec saved to: ${outputPath}`);
    }
  }

  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
