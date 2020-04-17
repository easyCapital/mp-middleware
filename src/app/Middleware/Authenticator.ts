import { Context } from '../../types';
import BackendApi from '../Api/Backend';
import SymfonyApi from '../Api/Symfony';
import { BackendToken } from '../Clients/Backend/BackendClient';
import { ForbiddenException } from '../Exceptions';

const Logger = use('Logger');

class Authenticator {
  protected async handle(ctx: Context, next) {
    if (ctx.app) {
      ctx.updateToken = updateToken;

      let authorizationToken: string | undefined;

      if (ctx.request.header('Authorization')) {
        authorizationToken = ctx.request.header('Authorization');
      } else if ('authorization' in ctx.request.get()) {
        const { authorization } = ctx.request.get() as any;

        authorizationToken = authorization;
      }

      ctx.updateToken({ [`${ctx.app.userType}Token`]: authorizationToken });
    } else {
      Logger.warning('No app was configured to authenticate the user');

      throw new ForbiddenException();
    }

    await next();
  }
}

/**
 * Method added to Adonis Context to centralized tokens updates
 */
function updateToken(this: Context, token: BackendToken) {
  if (token) {
    this.backendApi = new BackendApi(this.backendApiKey, token);
    this.symfonyApi = new SymfonyApi(token.customerToken);
  }

  this.authenticated = Boolean(token.cgpToken) || Boolean(token.customerToken);
}

export = Authenticator;
