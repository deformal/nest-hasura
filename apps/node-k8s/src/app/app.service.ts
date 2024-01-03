import {
  ExecutionContext,
  Injectable,
  NestMiddleware,
  createParamDecorator,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { get } from 'lodash';
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
    req.headers['sessionVars'] = get(req.body, 'session_variables');
    req.body = get(req.body, 'input.input');
    next();
  }
}

export interface Session_Varaibles {
  'x-hasura-role': string;
  'x-hasura-user-id': UUID;
}

export const SessionVariables = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Session_Varaibles => {
    const request = ctx.switchToHttp().getRequest();
    const sessionVariables = get(
      request.headers,
      'sessionVars'
    ) as Session_Varaibles;
    return sessionVariables;
  }
);
