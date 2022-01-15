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