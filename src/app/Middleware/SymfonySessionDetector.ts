import { Context } from '../../types';

const Config = use('Adonis/Src/Config');

class SymfonySessionDetector {
  protected async handle(ctx: Context, next) {
    const cookie = ctx.request.cookie(Config.get('clients.symfony.sessionKey'));
    if (cookie) {
      ctx.symfonySession = cookie;
    }
    await next();
  }
}

export = SymfonySessionDetector;
