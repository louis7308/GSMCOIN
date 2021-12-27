import { Injectable } from '@nestjs/common';

let num = 0;

@Injectable()
export class CoinService {


  test() {
    num++;
    return {
      id: num,
      maxCoin: 120,
      isShopClose: false,
      name: "시발코인"
    }
  }
}
