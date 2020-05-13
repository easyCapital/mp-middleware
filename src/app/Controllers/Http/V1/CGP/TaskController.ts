import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPTaskController {
  public async search({ params, request, response, backendApi }: Context) {
    const { contract } = params;
    const filters = request.input('filters') as Filters;

    const contracts = await backendApi.getGCPContractTasks(contract, filters);

    response.status(200).send(contracts);
  }
}

export = CGPTaskController;
