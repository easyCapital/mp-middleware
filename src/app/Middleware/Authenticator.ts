import { Context } from '../../types';

class Authenticator {
  protected async handle(ctx: Context, next) {
    const authorization = ctx.request.header('Authorization');

    ctx.backendApi.setCustomerToken(authorization);

    await next();
  }
}

export = Authenticator;
