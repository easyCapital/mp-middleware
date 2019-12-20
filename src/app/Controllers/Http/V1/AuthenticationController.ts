import { Context } from '../../../../types';
import { EmailNotVerifiedException, UserIsInactiveException } from '../../../Exceptions';

class AuthenticationController {
  public async login(ctx: Context) {
    const { email, password }: any = ctx.request.post();
    const userType = ctx.app.userType;

    const data = await ctx.backendApi.login(email, password, userType);

    ctx.updateToken({ [`${userType}Token`]: data.token });
    ctx.session.clear();

    if (userType === 'customer') {
      const customer = await ctx.backendApi.getCustomerDetails();

      if (!customer.isActive()) {
        throw new UserIsInactiveException();
      }

      if (!customer.isEmailValidated()) {
        throw new EmailNotVerifiedException();
      }
    }

    ctx.response.status(200).send(data);
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
