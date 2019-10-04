import * as BackendApi from '../../../Api/Backend';

class AuthenticationController {
  public async forgotPassword({ request, response }) {
    const { email } = request.post();

    await BackendApi.forgotPassword(email);

    response.status(200).send();
  }
}

export = AuthenticationController;
