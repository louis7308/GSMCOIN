import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class CoinEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  baseprice: number;

  @Column({ nullable: true})
  lastday: Date;

  @Column({ nullable: true})
  lastprice: number;
}


//		{
//   "id": 1,
//   "name": "어쩔코인",
//   "price": 101,
//   "baseprice": 100,
//   "lastday": 50,
//   "lastprice": 50,
// /  "chartdata": [50, 55, 65, 78, 98, 104, 101]. 
// //},