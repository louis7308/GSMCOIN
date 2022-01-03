import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoinService } from './coin.service';

@Controller('coin')
export class CoinController {
  constructor(
    private readonly coinservice: CoinService,
  ) {}

  @Get()
  db() {
    return this.coinservice.db()
  }

  @Post('/hold')
  holdCoin(@Body() email: string) {
    return this.coinservice.holdCoin(email)
  }

  @Get('/test')
  testCoin() {
    return this.coinservice.coin();
  }

}
