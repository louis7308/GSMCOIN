"use strict";

import { Body, Controller, Post, Get, BadRequestException, UnauthorizedException, Res, Req } from '@nestjs/common';
import { JwtService,  } from "@nestjs/jwt"
import { bcrypt } from 'bcrypt';
import { User } from './auth.dto';
import { AuthService } from './auth.service';
import {Response, Request} from 'express';  
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger"

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('signup')
  @ApiOperation({ summary: "전체 영화 데이터 API", description: "GET 요청시 영화 전체 데이터 긁어옴"})
  @ApiCreatedResponse({ description: "GET 요청시 영화 전체 데이터 긁어옴", type: User})
  @ApiOkResponse({status: 201})
  async signup(@Body() clientData: User) {
    console.log(clientData);

    // const hashedPassword = await bcrypt.hashedPassword(password, 12)
    
    const user = await this.authService.create({...clientData})

    // delete user.password;
    return user;
  }

  @Post('login')
  async login(
      @Body('email') email: string,
      @Body('password') password: string,
      @Res({passthrough: true}) response: Response
  ) {
      const user = await this.authService.findsOne(email);

      if (!user) {
          throw new BadRequestException('invalid credentials');
      }

      // if (!await bcrypt.compare(password, user.password)) {
      //     throw new BadRequestException('invalid credentials');
      // }

      const jwt = await this.jwtService.signAsync({email: user.email}, {secret: "hawddwadawdaw"});

      response.cookie('jwt', jwt, {httpOnly: true});

      return {
          islogin: true
      };
  }

  @Get('user')
  @ApiOperation({ summary: "전체 영화 데이터 API", description: "GET 요청시 영화 전체 데이터 긁어옴"})
  @ApiCreatedResponse({ description: "GET 요청시 영화 전체 데이터 긁어옴", type: User})
  async user(@Req() request: Request) {
      try {
          const cookie = request.cookies['jwt'];
          console.log('cookie', cookie);

          const data = await this.jwtService.verifyAsync(cookie, {secret: "hawddwadawdaw"});
          console.log(data);

          if (!data) {
              throw new UnauthorizedException();
          }

          // const user = await this.authService.findOne({id: data['id']});

          // const {password, ...result} = user;

          return {
            isToken: true
          };
      } catch (e) {
          throw new UnauthorizedException();
      }
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response) {
      response.clearCookie('jwt');

      return {
          isLogout: true
      }
  }
}