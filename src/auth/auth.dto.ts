import {ApiProperty} from '@nestjs/swagger'

export class User {
  @ApiProperty()
  name: string | undefined;
  @ApiProperty()
  email: string | undefined;
  @ApiProperty()
  password: string | undefined;
}