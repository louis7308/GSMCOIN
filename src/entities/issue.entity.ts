import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class IssueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  tag: string;

  @Column()
  create_at: Date;

  @Column({default: 0})
  status: number;
}