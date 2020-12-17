import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import { User } from 'App/Models';
import {
  LoginValidator,
  ForgotPasswordValidator,
  ResetPasswordValidator,
} from 'App/Validators/CGP/Authentication';

export default class AuthenticationController {
  public async login({ request, session, backendService }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator);

    const token = await backendService.loginCGP(email, password);

    backendService.setToken(token);

    const cgp = await backendService.getCGPDetails();

    const user = new User(cgp.id, cgp.email, token, cgp.firstName, cgp.lastName);

    session.put('user', user);

    return cgp;
  }

  public async forgotPassword({ request, backendService }: HttpContextContract) {
    const { email } = await request.validate(ForgotPasswordValidator);

    await backendService.resetCGPPassword(email);
  }

  public async resetPassword({ request, backendService }: HttpContextContract) {
    const { uid, token, password } = await request.validate(ResetPasswordValidator);

    await backendService.resetCGPPasswordConfirm(uid, token, password);
  }
}
