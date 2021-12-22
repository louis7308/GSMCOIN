import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home() {
    return '승원 is foolish'
  }
}
