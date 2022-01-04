import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoinEntity } from 'src/entities/coin.entity';
import { UserEntity } from 'src/entities/user.entity';
import {Repository} from "typeorm";



let coin = 0;




// let manycoin = {
// 	"coin": [
// 		{
// 			"id": 1,
// 			"name": "어쩔코인",
// 			"price": 101,
//       "baseprice": 100,
// 			"lastday": 50,
// 			"lastprice": 50,
// 			"chartdata": [50, 55, 65, 78, 98, 104, 101]
// 		},
// 		{
// 			"id": 2,
// 			"name": "어쩔코인V2",
// 			"price": 1005,
//       "baseprice": 1000,
// 			"lastday": 50,
// 			"lastprice": 500,
// 			"chartdata": [500, 550, 650, 780, 980, 1040, 1005]
// 		},
// 				{
// 			"id": 3,
// 			"name": "어쩔코인V3",
// 			"price": 10010,
//       "baseprice": 10000,
// 			"lastday": 50,
// 			"lastprice": 5000,
// 			"chartdata": [5000, 5500, 6500, 7800, 9800, 10400, 10019]
// 		}
// 	]
// }

export let allCoinData: any = [];




///h222222 [
  // CoinEntity {
  //   id: 1,
  //   name: '김동동코인',
  //   price: 1100,
  //   baseprice: 1000,
  //   lastday: null,
  //   lastprice: null
  // },
  // CoinEntity {
  //   id: 2,
  //   name: '어쩔코인',
  //   price: 12500,
  //   baseprice: 10000,
  //   lastday: null,
  //   lastprice: null
  // }
//]

@Injectable()
export class CoinService {

  constructor(
    @InjectRepository(CoinEntity) private readonly coinRepository: Repository<CoinEntity>
  ) {}


// 소켓 통신 전체 메세지 뿌려주기
  async broadcastData() {
    coin++
    if(coin == 1) {
      console.log('hi22',this.db())
      
    } else {
      let data = this.coin();
      return {
        data
      }
    }

  }
// 보유 코인
  holdCoin(email: string) {
    
  }



  // 코인 시장가 변동
  coin() {

    for(let i = 0; i < allCoinData.length; i++) {
      
      
      console.log('h222222', allCoinData[i].name)
      console.log('h222222', allCoinData[i].id)
    
    const normalprice = allCoinData[i].price
    let baseprice: any = normalprice >= 100 && normalprice < 1000 ? 10
    :(normalprice >= 1000 && normalprice < 10000 ? 50
    :(normalprice >= 10000 && normalprice < 100000 ? 100
    :(normalprice >= 100000 && normalprice < 1000000 ? 1000 
    :(normalprice >= 1000000 && normalprice < 10000000 ? 10000 
    :(normalprice >= 10000000 && normalprice < 100000000 ? 100000 
    : (normalprice >= 100000000 && normalprice < 1000000000 ? 1000000 : "false"))))))
    const random = (Math.random() * 100)
    if(baseprice == false) return {message:"정상범위 가격이 아닙니다."}
    if(random <= 49) {
      allCoinData[i].price = allCoinData[i].price - baseprice
      console.log('allCoinData[i].price minus',allCoinData[i].price);
      allCoinData[i].chartdata.push(allCoinData[i].price)
    } else {
      allCoinData[i].price = allCoinData[i].price + baseprice
      console.log('allCoinData[i].price plus',allCoinData[i].price);
      
      allCoinData[i].chartdata.push(allCoinData[i].price)
    }
    console.log(allCoinData[i])
    console.log('baseprice', baseprice)
    console.log('hi', random);
  }
    return allCoinData
  }


  async db() {
    allCoinData = await this.coinRepository.find();
    for(let i = 0; i < allCoinData.length; i++) {
      allCoinData[i].chartdata = new Array()
    }
    console.log('hi', allCoinData)
  }
}
