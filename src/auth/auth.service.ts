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
      console.log(firstUser.playerMoney)
      // let bigMoney = BigInt(firstUser.playerMoney);
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
            onegradecoin: firstUser.onegradecoin,
            twograde: firstUser.twograde,
            threegrade: firstUser.threegrade,
            gameclubcoin: firstUser.gameclubcoin,
            cloudclubcoin: firstUser.cloudclubcoin,
            securityclubcoin: firstUser.securityclubcoin,
            roboticsclubcoin: firstUser.roboticsclubcoin,
            networkclubcoin: firstUser.networkclubcoin,
            healthcoin: firstUser.healthcoin,
            gsmcoin: firstUser.gsmcoin,
          },
        };
        console.log('1', userData);

        return userData;
      }
    } catch {
      return false;
    }
  }

  async usersave(userData: any) {
    console.log('audwlrsibal',userData);
    console.log('audwlrsibal2', userData[0])
    console.log('audwlrslbal3', userData[0].userdata)
    let UserStringData = userData[0].userdata;
    let UserJsonData = JSON.parse(UserStringData)
    console.log('userdata',UserJsonData.playerMoney)
    let bigMoney = BigInt(UserJsonData.playerMoney)
    console.log(UserJsonData.name);
    let coindata2 = await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        name: UserJsonData.name,
        playerMoney: bigMoney,
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
        onegradecoin: UserJsonData.coinDict.onegradecoin,
        twograde: UserJsonData.coinDict.twograde,
        threegrade: UserJsonData.coinDict.threegrade,
        gameclubcoin: UserJsonData.coinDict.gameclubcoin,
        cloudclubcoin: UserJsonData.coinDict.cloudclubcoin,
        securityclubcoin: UserJsonData.coinDict.securityclubcoin,
        roboticsclubcoin: UserJsonData.coinDict.roboticsclubcoin,
        networkclubcoin: UserJsonData.coinDict.networkclubcoin,
        healthcoin: UserJsonData.coinDict.healthcoin,
        gsmcoin: UserJsonData.coinDict.gsmcoin,
      })
      .where('email = :email', { email: UserJsonData.email })
      .execute();

      return true;
  }
}
