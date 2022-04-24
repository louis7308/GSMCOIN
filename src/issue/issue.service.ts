import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { allCoinData } from 'src/coin/coin.service';
import { IssueEntity } from 'src/entities/issue.entity';
import {Repository} from "typeorm";
import { coinTemplate } from "src/util/template"


@Injectable()
export class IssueService {

  constructor(
    @InjectRepository(IssueEntity) private readonly IssueRepository: Repository<IssueEntity>
  ) {}

  async write() {
    let date = (new Date());
    let i = coinTemplate.length;
    let random = Math.floor(Math.random() * i)
    console.log(random);
    console.log(coinTemplate.length)
    console.log(coinTemplate[random])
    // console.log(titleJson.title.title)
    try {
      this.IssueRepository.save({
        title: coinTemplate[random].title,
        description: coinTemplate[random].content,
        tag: coinTemplate[random].tag,
        create_at: date
      })  
      return true;
    } catch(e) {
      return false
    }
    
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
    
  }

}
