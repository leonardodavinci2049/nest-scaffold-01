import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerUI } from './swagger-ui.class';
import { _SWAGGER_TAGS } from './swagger-tags/swagger-tags.constants';

export class SwaggerDocumentBuilder {
  constructor(private readonly app: INestApplication<any>) {}

  private buildConfig() {
    const docBuilder = new DocumentBuilder()
      .setTitle('WebService ComSuporte')
      .setDescription('WebService para Suporte ao Sistema WinERP')
      .setVersion('1.0.0')
      .addBasicAuth()
      .addBearerAuth(
        {
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        'JWTAuthorization',
      );

    _SWAGGER_TAGS.forEach((tag) => {
      docBuilder.addTag(tag.name, tag.description);
    });

    return docBuilder.build();
  }

  private createDocument() {
    const config = this.buildConfig();
    return SwaggerModule.createDocument(this.app, config);
  }

  public setupSwagger() {
    const document = this.createDocument();

    const swaggerUI = new SwaggerUI(process.env.APP_API_URL);
    SwaggerModule.setup(
      process.env.APP_SWAGGER_URL,
      this.app,
      document,
      swaggerUI.customOptions,
    );
  }
}
