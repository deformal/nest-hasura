import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService, SessonVariables, Session_Varaibles } from './app.service';
import {
  AddProductToCartIn,
  AddProductToCartOut,
} from '@node-k8s/db-actions-sdk';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/cartproduct')
  public async insertProductInCart(
    @SessonVariables() sessionVars: Session_Varaibles,
    @Body() body: AddProductToCartIn,
    @Res() res: Response
  ): Promise<AddProductToCartOut | Response> {
    try {
      const products = body.products;
      const userId = sessionVars['x-hasura-user-id'];
      const cart = await this.appService.prisma.carts.findFirstOrThrow({
        where: {
          user_id: { equals: userId },
        },
      });
      const newCartProducts =
        await this.appService.prisma.carts_products.createMany({
          data: products.map(({ quantity, id }) => {
            return { product_id: id, quantity: quantity, cart_id: cart.id };
          }),
        });
      return res.json({
        ok: newCartProducts.count > 0,
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
