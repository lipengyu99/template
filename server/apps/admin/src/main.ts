import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors()

  // app.useStaticAssets('upload', {
  //   prefix: '/imgupload'
  // })
  const options = new DocumentBuilder()
    .setTitle('后台模版')
    .setDescription('The  API 描述')
    .setVersion('1.0')

    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(5000);
  console.log('http://127.0.0.1:5000/api-docs')
}
bootstrap();
