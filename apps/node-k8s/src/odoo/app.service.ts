import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import * as jwt from 'jsonwebtoken';
export type HasuraCustomClaims = {
  id: string;
  username?: string | null;
  role: string;
  'https://hasura.io/jwt/claims': {
    'x-hasura-user-id': string;
    'x-hasura-default-role': string;
    'x-hasura-role': string;
    'x-hasura-allowed-roles'?: ['user'];
  };
};
@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
  db(): PrismaClient {
    const db = new PrismaClient();
    return db;
  }
  createAuthToken(data: HasuraCustomClaims, token: string) {
    try {
      const payload: HasuraCustomClaims = {
        id: data.id,
        username: data.username,
        role: data.role as string,
        'https://hasura.io/jwt/claims': {
          'x-hasura-user-id': data.id,
          'x-hasura-default-role': data.role as string,
          'x-hasura-role': data.role as string,
          'x-hasura-allowed-roles': ['user'],
        },
      };
      const authToken = jwt.sign(payload, token, {
        expiresIn: '1d',
      });

      return authToken;
    } catch (e) {
      console.log('error', e);
      return (e as Error).message;
    }
  }
}

@Injectable()
export class BodyLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.body = get(req.body, 'input.input');
    next();
  }
}
