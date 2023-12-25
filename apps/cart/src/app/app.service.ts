import {
  Injectable,
  NestMiddleware,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { get } from 'lodash';
import { UUID } from 'crypto';

@Injectable()
export class AppService {
  public prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
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

export const SessonVariables = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Session_Varaibles => {
    const request = ctx.switchToHttp().getRequest();
    const sessionVariables = get(
      request.headers,
      'sessionVars'
    ) as Session_Varaibles;
    return sessionVariables;
  }
);
