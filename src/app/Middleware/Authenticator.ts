import { Context } from '../../types';
import BackendApi from '../Api/Backend';
import SymfonyApi from '../Api/Symfony';
import { BackendToken } from '../Clients/Backend/BackendClient';

class Authenticator {
  protected async handle(ctx: Context, next) {
    ctx.updateToken = updateToken;
    ctx.updateToken({ [`${ctx.app.userType}Token`]: ctx.request.header('Authorization') });

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
