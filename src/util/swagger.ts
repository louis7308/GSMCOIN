import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle("NestJS 어쩔코인 API Docs")
    .setDescription("NestJS로 GSM 페스티벌 어쩔 코인 서버 API 문서이다.")
    .setVersion('1.0.0')
    .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document)
}
