import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import { ChangePasswordValidator, ChangeSignatureValidator } from 'App/Validators/CGP/User';

export default class UserController {
  public async getDetails({ backendService }: HttpContextContract) {
    const cgp = await backendService.getCGPDetails();

    return cgp;
  }

  public async changePassword({ request, backendService }: HttpContextContract) {
    const { oldPassword, newPassword } = await request.validate(ChangePasswordValidator);

    await backendService.changeCGPPassword(oldPassword, newPassword);
  }

  public async changeSignature({ request, backendService }: HttpContextContract) {
    const { signature } = await request.validate(ChangeSignatureValidator);

    const cgp = await backendService.changeCGPSignature(signature);

    return cgp;
  }
}
