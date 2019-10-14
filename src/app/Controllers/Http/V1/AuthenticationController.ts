import * as SymfonyApi from '../../../Api/Symfony';
import { Context } from '../../../../types';

const Config = use('Adonis/Src/Config');

class AuthenticationController {
  public async login({ request, response }: Context) {
    const { email, password }: any = request.post();

    const sessionCookie = await SymfonyApi.login(email, password);

    const sessionKey = Config.get('clients.symfony.sessionKey');

    response.cookie(sessionKey, sessionCookie, {
      httpOnly: true,
      path: '/',
    });

    response.status(200).send();
  }

  public async forgotPassword({ request, response, backendApi }: Context) {
    const { email }: any = request.post();

    await backendApi.forgotPassword(email);

    response.status(200).send();
  }
}

export = AuthenticationController;
