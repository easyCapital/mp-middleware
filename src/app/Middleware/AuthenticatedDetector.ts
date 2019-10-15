import { Context } from '../../types';

class AuthenticatedDetector {
  protected async handle(ctx: Context, next) {
    const authenticated = ctx.request.header('Authenticated');

    ctx.authenticated = authenticated === 'true';

    await next();
  }
}

export = AuthenticatedDetector;
