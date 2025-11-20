import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as fs from 'fs';
import * as path from 'path';

async function generateOpenApiSpec() {
  const app = await NestFactory.create(AppModule, {
    logger: false, // Disable logging during spec generation
  });

  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('The Todo API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Define output path
  const outputPath = path.resolve(process.cwd(), 'apps/api/openapi.json');
  
  // Write the OpenAPI spec to a file
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
  
  console.log(`✅ OpenAPI spec generated successfully at: ${outputPath}`);
  
  // Also generate a YAML version if needed
  const yamlPath = path.resolve(process.cwd(), 'apps/api/openapi.yaml');
  try {
    const yaml = await import('js-yaml');
    fs.writeFileSync(yamlPath, yaml.dump(document));
    console.log(`✅ OpenAPI YAML spec generated successfully at: ${yamlPath}`);
  } catch (e) {
    console.log('ℹ️  To generate YAML format, install js-yaml: npm install --save-dev js-yaml');
  }

  await app.close();
  process.exit(0);
}

generateOpenApiSpec().catch((error) => {
  console.error('Failed to generate OpenAPI spec:', error);
  process.exit(1);
});