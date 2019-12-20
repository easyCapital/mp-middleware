import { Context } from '../../../../../types';

class CGPUserController {
  public async get({ response, backendApi }: Context) {
    const customer = await backendApi.getCGPDetails();

    response.status(200).send(customer);
  }
}

export = CGPUserController;
