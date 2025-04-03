import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors()
  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API FastSites')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .addBearerAuth() // Adiciona suporte para autenticação JWT (se necessário)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 8081);
}
bootstrap();
