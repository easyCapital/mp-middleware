import { Context } from '../../types';
import BackendApi from '../Api/Backend';
import SymfonyApi from '../Api/Symfony';

class Authenticator {
  protected async handle(ctx: Context, next) {
    ctx.updateCustomerToken = updateCustomerToken;
    ctx.updateCustomerToken(ctx.request.header('Authorization'));
    await next();
  }
}

/**
 * Method added to Adonis Context to centralized customer token updates
 */
function updateCustomerToken(this: Context, customerToken?: string) {
  this.authenticated = Boolean(customerToken);
  this.backendApi = new BackendApi(this.backendApiKey, customerToken);
  this.symfonyApi = new SymfonyApi(customerToken);
}

export = Authenticator;
