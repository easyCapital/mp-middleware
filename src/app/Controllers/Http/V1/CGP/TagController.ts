import { Tag as TagDTO } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPTagController {
  public async create({ request, response, params, backendApi }: Context): Promise<void> {
    const { household } = params;
    const tags = request.post() as TagDTO[];

    const data = await backendApi.createTags(household, tags);

    response.status(200).send(data);
  }

  public async delete({ request, response, params, backendApi }: Context): Promise<void> {
    const { household } = params;
    const tags = request.post() as TagDTO[];

    await backendApi.deleteTags(household, tags);

    response.status(200).send();
  }
}

export = CGPTagController;
