import { Body, Controller, Get, Logger, Post, Req, Res } from '@nestjs/common';
import {
  Create_New_User_In,
  Create_New_User_Out,
  Login_In,
  Login_Out,
} from '@node-k8s/db-actions-sdk';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
@Controller()
export class AppController {
  private db: PrismaClient;
  constructor(private readonly appService: AppService) {
    this.db = appService.db();
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
  @Get('/users')
  public async getAllUsers(@Req() request: Request) {
    Logger.debug('request body => ', request.body);
    Logger.log('Request headers => ', request.headers);
  }

  @Post('/new-user')
  public async createNewUser(
    @Body() body: Create_New_User_In,
    @Res() res: Response
  ): Promise<Create_New_User_Out | Response> {
    try {
      const { username, password } = body;
      const already_user = await this.db.users.findUnique({
        where: { username: username },
      });

      if (already_user)
        throw new Error('A_USER_WITH_THIS_USERNAME_ALREADY_EXISTS');

      const new_user = await this.db.users.create({
        data: {
          username: username,
          password: password,
        },
      });

      await this.db.carts.create({
        data: {
          user_id: new_user.id,
        },
      });

      const auth_token = this.appService.createAuthToken(
        {
          id: new_user.id,
          username: new_user.username,
          role: 'user',
          'https://hasura.io/jwt/claims': {
            'x-hasura-user-id': new_user.id,
            'x-hasura-default-role': 'user',
            'x-hasura-role': 'user',
          },
        },
        process.env.JWT_TOKEN
      );

      return res.json({ accessToken: auth_token });
    } catch (err) {
      const error = err as Error;
      res.statusCode = 400;
      return res.json({
        message: error.message,
        extensions: { path: 'users', code: 400 },
      });
    }
  }

  @Post('/login')
  public async login(
    @Body() body: Login_In,
    @Res() res: Response
  ): Promise<Login_Out | Response> {
    try {
      const { username, password } = body;
      const already_user = await this.db.users.findUnique({
        where: { username: username, password: password },
      });

      if (!already_user)
        throw new Error('NO_USER_EXISTS_WITH_THIS_USERNAME_AND_PASSWORD');

      const auth_token = this.appService.createAuthToken(
        {
          id: already_user.id,
          username: already_user.username,
          role: 'user',
          'https://hasura.io/jwt/claims': {
            'x-hasura-user-id': already_user.id,
            'x-hasura-default-role': 'user',
            'x-hasura-role': 'user',
          },
        },
        process.env.JWT_TOKEN
      );

      return res.json({ accessToken: auth_token });
    } catch (err) {
      const error = err as Error;
      res.statusCode = 400;
      return res.json({
        message: error.message,
        extensions: { path: 'users', code: 400 },
      });
    }
  }
}
