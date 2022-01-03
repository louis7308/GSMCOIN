import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinEntity } from 'src/entities/coin.entity';
import { ChatGateway } from './chat.gateway';
import { CoinController } from './coin.controller';
import { CoinService } from './coin.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoinEntity])],
  controllers: [CoinController],
  providers: [CoinService, ChatGateway],
})
export class CoinModule {}
