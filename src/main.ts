import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
//import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.main/app.module';
import { envs } from './core/config';
import { LogInterceptor } from 'src/core/interceptors/log.interceptor';
import { SwaggerDocumentBuilder } from './core/swagger/swagger-document-builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('WEBSERVICE');
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties that do not have decorators
      transform: true, // transform payload to DTO instances
      forbidNonWhitelisted: true, // throw error if payload has properties that do not have decorators
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // medida de seguraça para só disponibilizar os metodos listados
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  const swaggerDocumentBuilder = new SwaggerDocumentBuilder(app);
  swaggerDocumentBuilder.setupSwagger();

  /*   const config = new DocumentBuilder()
    .setTitle('WebService ComSuporte')
    .setDescription('WebService para Suporte ao Sistema WinERP')
    .setVersion('1.0')
    .addTag('WINERP')
    .addServer('https://srv03.winerp.com.br/')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth()in your controller!
    )
    .build(); */
  //https://stackoverflow.com/questions/38713764/how-to-replace-swagger-ui-header-logo-in-swashbuckle

  //const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup(envs.APP_SWAGGER_URL, app, document);

  //disponibiliza log de forma global para se chamdo posterior
  await app.useGlobalInterceptors(new LogInterceptor());
  await app.listen(envs.APP_PORT);

  logger.log(`Application is running on port: ${envs.APP_PORT}`);
}
bootstrap();
