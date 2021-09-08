import { Tag as TagDTO } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPTagController {
  public async create({ request, response, params, backendApi }: Context): Promise<void> {
    const { customer } = params;
    const tags = request.post() as TagDTO[];

    const data = await backendApi.createCGPCustomerTags(customer, tags);

    response.status(200).send(data);
  }

  public async delete({ request, response, params, backendApi }: Context): Promise<void> {
    const { customer } = params;
    const tags = request.post() as TagDTO[];

    await backendApi.deleteCGPCustomerTags(customer, tags);

    response.status(200).send();
  }
}

export = CGPTagController;
