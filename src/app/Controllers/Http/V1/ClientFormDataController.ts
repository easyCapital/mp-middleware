import { Answer } from '@robinfinance/js-api';

import { Context } from '../../../../types';

class ClientFormDataController {
  public async getClientFormData({ params, response, backendApi }: Context): Promise<void> {
    const { uuid } = params;

    const data = await backendApi.getClientFormData(uuid);

    response.status(200).send(data);
  }

  public async setClientFormData({ params, request, response, backendApi }: Context): Promise<void> {
    const { uuid } = params;

    const answers = request.post() as Answer[];

    const data = await backendApi.setClientFormData(uuid, answers);

    response.status(200).send(data);
  }
}

export = ClientFormDataController;
