import { Body, Controller, Get, Post } from '@nestjs/common';
import { IssueService } from './issue.service';

@Controller('issue')
export class IssueController {
  constructor(
    private readonly issueservice: IssueService
  ) {}

  @Post('/write')
  async postIssue(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('tag') tag:string
    ) {
    return this.issueservice.write(title, description, tag);
  }
  
  // 채택된 데이터 전부다
  @Get('/getAll')
  async getAllIssue() {
    return this.issueservice.getAllIssue();
  }
  // 채택안된 데이터
  @Get('/getTry')
  async getTryIssue() {
    return this.issueservice.getTryIssue();
  }

  @Post('/statusChange')
  async issueStateChange(
    @Body('id') id: number,
    @Body('status') status: number) {
    return this.issueservice.issueStateChange(id, status);
  }
}
