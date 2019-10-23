import { Context } from '../../types';
import { UnauthorizedException } from '../Exceptions';

class Auth {
  protected async handle(context: Context, next) {
    if (!context.authenticated) {
      throw new UnauthorizedException();
    }

    await next();
  }
}

export = Auth;
