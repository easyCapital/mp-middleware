import * as BackendApi from '../../../Api/Backend';
import * as SymfonyApi from '../../../Api/Symfony';

const Config = use('Adonis/Src/Config');

class AuthenticationController {
  public async login({ request, response }) {
    const { email, password } = request.post();

    const sessionCookie = await SymfonyApi.login(email, password);

    const sessionKey = Config.get('clients.symfony.sessionKey');

    response.cookie(sessionKey, sessionCookie, {
      httpOnly: true,
      path: '/',
    });

    response.status(200).send();
  }

  public async forgotPassword({ request, response }) {
    const { email } = request.post();

    await BackendApi.forgotPassword(email);

    response.status(200).send();
  }
}

export = AuthenticationController;
