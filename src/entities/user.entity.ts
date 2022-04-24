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
  onegradecoin: number;

  @Column({default: 0})
  twograde: number;

  @Column({default: 0})
  threegrade: number;
  
  @Column({default: 0})
  gameclubcoin: number;
  
  @Column({default: 0})
  cloudclubcoin: number;

  @Column({default: 0})
  securityclubcoin: number;

  @Column({default: 0})
  roboticsclubcoin: number;

  @Column({default: 0})
  networkclubcoin: number;

  @Column({default: 0})
  healthcoin: number;

  @Column({default: 0})
  gsmcoin: number;
}