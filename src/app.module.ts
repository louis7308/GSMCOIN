import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from "@nestjs/jwt";
import { UserEntity } from './entities/user.entity';
import { CoinController } from './coin/coin.controller';
import { CoinService } from './coin/coin.service';
import { CoinModule } from './coin/coin.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env']
  }),
    TypeOrmModule.forRoot({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: false
  }),
  TypeOrmModule.forFeature([UserEntity]),
  JwtModule.register({
    secret: 'secret',
    signOptions: {expiresIn: '1d'}
  }),
  MoviesModule,
  UserModule,
  AuthModule,
  CoinModule],
  controllers: [AuthController, CoinController],
  providers: [AuthService, CoinService],
})
export class AppModule {}
