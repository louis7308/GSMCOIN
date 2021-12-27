import { Module } from '@nestjs/common';
import { UserEntity } from "../entities/user.entity"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class UserModule {}
