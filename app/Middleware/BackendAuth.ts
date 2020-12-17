import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import { User } from 'App/Models';
import ForbiddenException from 'App/Exceptions/ForbiddenException';

export default class BackendAuth {
  public async handle(context: HttpContextContract, next: () => Promise<void>) {
    const user = context.session.get('user', undefined) as User | undefined;

    if (!user || !user.token) {
      throw new ForbiddenException();
    }

    context.backendService.setToken(user.token);
    context.auth = user;

    await next();
  }
}
