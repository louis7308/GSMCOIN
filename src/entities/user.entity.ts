import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn("uuid")
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;
}