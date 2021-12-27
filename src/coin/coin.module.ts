import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { CoinController } from './coin.controller';
import { CoinService } from './coin.service';

@Module({
  imports: [],
  controllers: [CoinController],
  providers: [CoinService, ChatGateway],
})
export class CoinModule {}
