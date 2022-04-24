import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from "./util/swagger"
import * as cookieParser from "cookie-parser";
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() { // NestExpressApplication
  const app = await NestFactory.create(AppModule);
  const hostname = '222.238.250.160'
  app.use(cookieParser()); 
  app.enableCors();
  
  //파이프 ( 유해한 코드 를 걸러주는곳)     "class-transformer": "^0.5.1",
  //                                        "class-validator": "^0.13.2",
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true, // 내가 DTO 작성한것과 다르면 결과값에 출력해주지 않음
  //   forbidNonWhitelisted: true, // 내가 원하는 요청이  오지 않았을때 에러 메세지
  //   transform: true // 내가 DTO에 설정한 타입으로 형변환 해서 값이 들어옴
  // }))
  setupSwagger(app)
  await app.listen(3001, hostname);
}
bootstrap();