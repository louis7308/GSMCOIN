import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { allCoinData } from 'src/coin/coin.service';
import { IssueEntity } from 'src/entities/issue.entity';
import {Repository} from "typeorm";


@Injectable()
export class IssueService {

  constructor(
    @InjectRepository(IssueEntity) private readonly IssueRepository: Repository<IssueEntity>
  ) {}

  async write(title: string, description: string, tag: string) {
    let date = (new Date());
    console.log(date);
    console.log(title, description, tag);
    this.IssueRepository.save({
      title: title,
      description: description,
      tag: tag,
      create_at: date
    })
  }

  async getAllIssue() {
    let getIssueData : any = await this.IssueRepository.find();
   
    console.log('hi', getIssueData);
    let result = await getIssueData.filter(x => {
      return x.status == 1 || x.status == 2;
    })
    return result
  }

  async getTryIssue() {
    let getIssueData : any = await this.IssueRepository.find();
    console.log('hi', getIssueData);
    let result = await getIssueData.filter(x => {
      return x.status == 0;
    })
    return result
  }

  async issueStateChange(id: number, status: number) {
    let getIssueData : any = await this.IssueRepository.findOne(id);
    console.log('getIss', getIssueData.id)
    let tag = getIssueData.tag;
    let random = (Math.random() * 30) + 1;
    console.log(random);
    let psent = random / 100;
    let psent2 = psent.toFixed(2);
    console.log('sibal',psent.toFixed(2));
    let price = 0;
    let IssueData = await this.IssueRepository
    .createQueryBuilder()
    .update(IssueEntity)
    .set({ status: 1 })
    .where('id = :id', { id: 1 })
    .execute();

    const result = allCoinData.filter(allCoin => {
      if(allCoin.name === tag) {
        console.log('tag', tag);
        console.log('allcoin', allCoin.name)
        if(status === 1) { // 떡상
          console.log('성은쌤', getIssueData)
          // console.log('민재',allCoinData)
          price = Math.ceil(allCoin.price * psent)
          allCoin.price = allCoin.price + price
            if(getIssueData.id === id) {
              console.log('hi')
              let IssueData = this.IssueRepository
              .createQueryBuilder()
              .update(IssueEntity)
              .set({ status: 1 })
              .where('id = :id', { id: id })
              .execute();
            }
            
          console.log('get이슈', getIssueData)
          console.log('22',price);
        }
        else if(status === 2) { // 떡락
          // console.log('민재',allCoin         price = Math.ceil(allCoin.price * psent)
          console.log('성은쌤', getIssueData)
          // console.log('민재',allCoinData)
          price = Math.ceil(allCoin.price * psent)
          allCoin.price = allCoin.price - price
            if(getIssueData.id === id) {
              console.log('hi')
              let IssueData = this.IssueRepository
              .createQueryBuilder()
              .update(IssueEntity)
              .set({ status: 1 })
              .where('id = :id', { id: id })
              .execute();
            }
        }
        return true;
      }});
      console.log('hi2222',result);
      // console.log('안녕나는 승민이야',allCoinData[i])
    //   if(allCoinData[i].name === tag) {
    //     console.log('hi');
    //     if(status === 1) { // 떡상
    //       // console.log('민재',allCoinData)
    //       price = Math.ceil(allCoinData[i].price * psent)
    //       allCoinData[i].price = allCoinData[i].price + price
    //         if(getIssueData.id === id) {
    //           console.log('hi')
    //           let IssueData = await this.IssueRepository
    //           .createQueryBuilder()
    //           .update(IssueEntity)
    //           .set({ status: 1 })
    //           .where('id = :id', { id: id })
    //           .execute();
    //         }
            
    //       console.log('get이슈', getIssueData)
    //       console.log('22',price);
    //     }
    //     else if(status === 2) { // 떡락
    //       // console.log('민재',allCoinData)
    //       price = Math.ceil(allCoinData[i].price * psent)
    //       allCoinData[i].price = allCoinData[i].price - price
    //       getIssueData.status = 1;
    //       this.IssueRepository.save(getIssueData)
    //       console.log('22',price);
    //     }
    //   }
    // console.log(random);
    // console.log(tag);

    // console.log(getIssueData)
    
  }

}
