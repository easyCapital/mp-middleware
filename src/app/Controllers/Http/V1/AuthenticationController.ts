import { Context } from '../../../../types';
import { EmailNotVerifiedException, UserIsInactiveException } from '../../../Exceptions';

class AuthenticationController {
  public async login({ request, session, response, backendApi }: Context) {
    const { email, password }: any = request.post();

    const { data, customer } = await backendApi.login(email, password);

    if (!customer.isActive()) {
      throw new UserIsInactiveException();
    }

    if (!customer.isEmailValidated()) {
      throw new EmailNotVerifiedException();
    }

    session.clear();

    response.status(200).send(data);
  }

  public async logout({ response, backendApi }: Context) {
    await backendApi.logout();

    response.status(200).send();
  }

  public async forgotPassword({ request, response, backendApi }: Context) {
    const { email }: any = request.post();

    await backendApi.forgotPassword(email);

    response.status(200).send();
  }

  public async sendValidationEmail({ request, response, backendApi }: Context) {
    const { email }: any = request.post();

    await backendApi.sendValidationEmail(email);

    response.status(200).send();
  }
}

export = AuthenticationController;
