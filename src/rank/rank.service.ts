import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RankService {

  constructor(
    @InjectRepository(UserEntity) private readonly RankRepository: Repository<UserEntity>
  ) {}

  async showRank() {
    const getAllUserMoney: any = await this.RankRepository.find({select: ["name", "playerMoney"]})
    const userDataFilter = await getAllUserMoney.filter(x => {
      return x.playerMoney > 0
    })
    const userDataSort = await userDataFilter.sort((a, b) => {
      console.log(a, b);
      return b.playerMoney - a.playerMoney
    });
    console.log('sort', userDataSort);
    return userDataSort;
    // console.log(userDataFilter)
    // console.log(getAllUserMoney[0].playerMoney);
  }
}
