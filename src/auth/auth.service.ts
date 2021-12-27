import { Injectable } from '@nestjs/common';
import { User } from './auth.dto';
import {Repository} from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';



@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(clientData:User) {
    console.log('ts', clientData.email)
    const dbClient: User = await this.userRepository.findOne({email: clientData.email});
    console.log('db', dbClient)
    if(dbClient === undefined) {
      this.userRepository.save(clientData);
      return {
        signupSucc: true
      }
    } else {
      return {
        signupSucc: false
      }
    }
  }

  async findsOne(client) {
    const dbClient: User = await this.userRepository.findOne(client.email);
    return dbClient;
  }
}
