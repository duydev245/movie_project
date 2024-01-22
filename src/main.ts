import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Movie API V1').addBearerAuth().build();
  const document =SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);
  await app.listen(8081);
}
bootstrap();
