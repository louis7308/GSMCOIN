import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Generated } from "typeorm"

@Entity()
export class UserEntity {

  @PrimaryColumn()
  @Generated('uuid')
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({type: 'bigint', default: 0})
  playerMoney: number;

  @Column({default: 20})
  clickMoney: number;

  @Column({default: 0})
  automatcIncome: number;

  @Column({default: 1})
  typingSpeed: number;

  @Column({default: false})
  frog: boolean;
  @Column({default: false})
  monsta: boolean;
  @Column({default: false})
  doge: boolean;
  @Column({default: false})
  keyboard: boolean;
  @Column({default: false})
  statik: boolean;
  @Column({default: false})
  speaker: boolean;
  @Column({default: false})
  gay: boolean;
  @Column({default: false})
  ekko: boolean;
  @Column({default: false})
  gram: boolean;
  

  @Column({default: 0})
  kimdongdongcoin: number;

  @Column({default: 0})
  whattodocoin: number;

  @Column({default: 0})
  gsmcoin: number;
  
  @Column({default: 0})
  choigangmincoin: number;
  
  @Column({default: 0})
  gemgaejiyecoin: number;

  @Column({default: 0})
  hyeonttungcoin: number;

  @Column({default: 0})
  ijuncoin: number;

  @Column({default: 0})
  eunseongcoin: number;

  @Column({default: 0})
  jjunjjunacoin: number;

  @Column({default: 0})
  sihuncoin: number;

  @Column({default: 0})
  haembeogseungmincoin: number;

  @Column({default: 0})
  yusiopeucoin: number;

  @Column({default: 0})
  geonucoin: number;

  @Column({default: 0})
  manghaessseonghuncoin: number;

  @Column({default: 0})
  chanwoocoin: number;

  @Column({default: 0})
  studentcouncilcoin: number;

  @Column({default: 0})
  eunyoungcoin: number
}