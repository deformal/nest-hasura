import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  AddProductToCartIn,
  AddProductToCartOut,
} from '@node-k8s/db-actions-sdk';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { AppService, SessionVariables, Session_Varaibles } from './app.service';
@Controller()
export class AppController {
  private db: PrismaClient;
  constructor(private readonly appService: AppService) {
    this.db = appService.db();
  }

  @Post('/cartproduct')
  public async insertProductInCart(
    @SessionVariables() sessionVars: Session_Varaibles,
    @Body() body: AddProductToCartIn,
    @Res() res: Response
  ): Promise<AddProductToCartOut | Response> {
    try {
      const { id: productId, quantity } = body;
      const userId = sessionVars['x-hasura-user-id'];
      const cart = await this.db.carts.findFirstOrThrow({
        where: {
          user_id: { equals: userId },
        },
      });

      const alreadyExists = await this.db.carts_products.findFirst({
        where: {
          product_id: { equals: productId },
          cart_id: { equals: cart.id },
        },
      });

      if (quantity <= 0 && alreadyExists) {
        await this.db.carts_products.delete({
          where: {
            product_id: productId,
          },
        });
      } else if (quantity > 0) {
        await this.db.carts_products.upsert({
          where: {
            cart_id: cart.id,
            product_id: productId,
          },
          create: {
            cart_id: cart.id,
            product_id: productId,
            quantity: quantity,
          },
          update: {
            cart_id: cart.id,
            product_id: productId,
            quantity,
          },
        });
      }
      return res.json({
        ok: true,
      });
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
