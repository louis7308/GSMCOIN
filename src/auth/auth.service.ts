import { ConsoleLogger, Injectable } from '@nestjs/common';
import { User } from './auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(clientData: User) {
    console.log('ts', clientData.email);
    const dbClient: User = await this.userRepository.findOne({
      email: clientData.email,
    });
    console.log('db', dbClient);
    if (dbClient === undefined) {
      this.userRepository.save(clientData);
      return true;
    } else {
      return false;
    }
  }

  async findsOne(email: string, password: string) {
    //const dbClient = await this.userRepository.query(`SELECT * FROM user_entity WHERE email=${email}`)
    try {
      const firstUser = await this.userRepository
        .createQueryBuilder('UserEntity')
        .where('email = :email', { email: email })
        .getOne();
      if(firstUser.password == password) {
        const userData = {
          name: firstUser.name,
          email: firstUser.email,
          playerMoney: firstUser.playerMoney,
          clickMoney: firstUser.clickMoney,
          automatcIncome: firstUser.automatcIncome,
          typingSpeed: firstUser.typingSpeed,
          itemDict: {
            frog: firstUser.frog,
            monsta: firstUser.monsta,
            doge: firstUser.doge,
            keyboard: firstUser.keyboard,
            statik: firstUser.statik,
            speaker: firstUser.speaker,
            gay: firstUser.gay,
            ekko: firstUser.ekko,
            gram: firstUser.gram,
          },
          coinDict: {
            kimdongdongcoin: firstUser.kimdongdongcoin,
            whattodocoin: firstUser.whattodocoin,
            gsmcoin: firstUser.gsmcoin,
            choigangmincoin: firstUser.choigangmincoin,
            gemgaejiyecoin: firstUser.gemgaejiyecoin,
            hyeonttungcoin: firstUser.hyeonttungcoin,
            ijuncoin: firstUser.ijuncoin,
            eunseongcoin: firstUser.eunseongcoin,
            jjunjjunacoin: firstUser.jjunjjunacoin,
            sihuncoin: firstUser.sihuncoin,
            haembeogseungmincoin: firstUser.haembeogseungmincoin,
            yusiopeucoin: firstUser.yusiopeucoin,
            geonucoin: firstUser.geonucoin,
            manghaessseonghuncoin: firstUser.manghaessseonghuncoin,
            chanwoocoin: firstUser.chanwoocoin,
            studentcouncilcoin: firstUser.studentcouncilcoin
          },
        };
        console.log('1', userData);

        return userData;
      }
    } catch {
      return false;
    }
  }

  async buyCoin(buyCoin: any) {
    console.log('b', buyCoin);
    let email = buyCoin.email;
    let coinCount = buyCoin.buyCoin;
    let checkCoin = buyCoin.whoiscoin;
    let dbUserData = await this.userRepository.findOne(email);
    console.log('dbuser', dbUserData);
    console.log(email);
    console.log(coinCount);
    console.log(checkCoin);
    switch (checkCoin) {
      case 'kimdongdongcoin':
        let dbGetCoinCount = dbUserData.kimdongdongcoin;
        let allCount = coinCount + dbGetCoinCount;
        let coindata = await this.userRepository
          .createQueryBuilder()
          .update(UserEntity)
          .set({ kimdongdongcoin: allCount })
          .where('email = :email', { email: email })
          .execute();
        console.log(coindata);
        return {
          isBuySucc: true,
        };
      case 'whattodocoin':
        let dbGetCoinCount2 = dbUserData.whattodocoin;
        let allCount2 = coinCount + dbGetCoinCount2;
        let coindata2 = await this.userRepository
          .createQueryBuilder()
          .update(UserEntity)
          .set({ whattodocoin: allCount2 })
          .where('email = :email', { email: email })
          .execute();
        console.log(coindata2);
        return {
          isBuySucc: true,
        };
      default:
        return {
          isCoinSucc: false,
        };
    }
  }

  async usersave(userData: any) {
    console.log('audwlrsibal',userData);
    console.log('audwlrsibal2', userData[0])
    console.log('audwlrslbal3', userData[0].userdata)
    let UserStringData = userData[0].userdata;
    let UserJsonData = JSON.parse(UserStringData)
    console.log(UserJsonData.name);
    let coindata2 = await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        name: UserJsonData.name,
        playerMoney: UserJsonData.playerMoney,
        clickMoney: UserJsonData.clickMoney,
        automatcIncome: UserJsonData.automatcIncome,
        typingSpeed: UserJsonData.typingSpeed,
        frog: UserJsonData.itemDict.frog,
        monsta: UserJsonData.itemDict.monsta,
        doge: UserJsonData.itemDict.doge,
        keyboard: UserJsonData.itemDict.keyboard,
        statik: UserJsonData.itemDict.statik,
        speaker: UserJsonData.itemDict.speaker,
        gay: UserJsonData.itemDict.gay,
        ekko: UserJsonData.itemDict.ekko,
        gram: UserJsonData.itemDict.gram,
        kimdongdongcoin: UserJsonData.coinDict.kimdongdongcoin,
        whattodocoin: UserJsonData.coinDict.whattodocoin,
        gsmcoin: UserJsonData.coinDict.gsmcoin,
        choigangmincoin: UserJsonData.coinDict.choigangmincoin,
        gemgaejiyecoin: UserJsonData.coinDict.gemgaejiyecoin,
        hyeonttungcoin: UserJsonData.coinDict.hyeonttungcoin,
        ijuncoin: UserJsonData.coinDict.ijuncoin,
        eunseongcoin: UserJsonData.coinDict.eunseongcoin,
        jjunjjunacoin: UserJsonData.coinDict.jjunjjunacoin,
        sihuncoin: UserJsonData.coinDict.sihuncoin,
        haembeogseungmincoin: UserJsonData.coinDict.haembeogseungmincoin,
        yusiopeucoin: UserJsonData.coinDict.yusiopeucoin,
        geonucoin: UserJsonData.coinDict.geonucoin,
        manghaessseonghuncoin: UserJsonData.coinDict.manghaessseonghuncoin,
        chanwoocoin: UserJsonData.coinDict.chanwoocoin,
        studentcouncilcoin: UserJsonData.coinDict.studentcouncilcoin
      })
      .where('email = :email', { email: UserJsonData.email })
      .execute();

      return true;
  }

  async soldCoin(soldCoin: any) {
    console.log('soldCoin function', soldCoin);
    let email = soldCoin.email;
    let coinCount = soldCoin.soldCoin;
    let checkCoin = soldCoin.whoiscoin;
    let dbUserData = await this.userRepository.findOne(email);
    console.log('dbuser', dbUserData);
    console.log('email', email);
    console.log('코인갯수', coinCount);
    console.log('코인제목', checkCoin);
    switch (checkCoin) {
      case 'kimdongdongcoin':
        let dbGetCoinCount = dbUserData.kimdongdongcoin;
        let allCount = dbGetCoinCount - coinCount;
        let coindata = await this.userRepository
          .createQueryBuilder()
          .update(UserEntity)
          .set({ kimdongdongcoin: allCount })
          .where('email = :email', { email: email })
          .execute();
        console.log(coindata);
        return {
          isSoldSucc: true,
        };
      case 'whattodocoin':
        let dbGetCoinCount2 = dbUserData.whattodocoin;
        let allCount2 = dbGetCoinCount2 - coinCount;
        let coindata2 = await this.userRepository
          .createQueryBuilder()
          .update(UserEntity)
          .set({ whattodocoin: allCount2 })
          .where('email = :email', { email: email })
          .execute();
        console.log(coindata2);
        return {
          isSoldSucc: true,
        };
      default:
        return {
          isCoinSucc: false,
        };
    }
  }
}
