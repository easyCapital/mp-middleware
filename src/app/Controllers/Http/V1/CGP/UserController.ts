import { Context } from '../../../../../types';

class CGPUserController {
  public async get({ response, backendApi }: Context) {
    const customer = await backendApi.getCGPDetails();

    response.status(200).send(customer);
  }

  public async getStatistics({ response, backendApi }: Context) {
    const statistics = await backendApi.getCGPStatistics();

    response.status(200).send(statistics);
  }

  public async setHasSeenHelp({ response, backendApi }: Context) {
    const customer = await backendApi.setCGHasSeenHelp();

    response.status(200).send(customer);
  }

  public async changePassword({ request, response, backendApi }: Context) {
    const { oldPassword, newPassword }: any = request.post();

    await backendApi.modifyCGPPassword(oldPassword, newPassword);

    response.status(200).send();
  }

  public async changeSignature({ request, response, backendApi }: Context) {
    const { signature }: any = request.post();

    const user = await backendApi.modifyCGPSignature(signature);

    response.status(200).send(user);
  }
}

export = CGPUserController;
