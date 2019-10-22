import { Context } from '../../types';

class Authenticator {
  protected async handle(ctx: Context, next) {
    const authorization = ctx.request.header('Authorization');

    if (authorization) {
      ctx.authenticated = true;
      ctx.backendApi.setCustomerToken(authorization);
    } else {
      ctx.authenticated = false;
    }

    await next();
  }
}

export = Authenticator;
