import { Controller, Get } from '@nestjs/common';
import { RankService } from './rank.service';

@Controller('rank')
export class RankController {
  
  constructor(private readonly Rankservice: RankService) {}

  @Get()
  async showRank() {
    return await this.Rankservice.showRank();
  }

}
