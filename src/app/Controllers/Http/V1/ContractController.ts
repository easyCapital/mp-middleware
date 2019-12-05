import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../types';

class ContractController {
  public async index({ request, response, backendApi }: Context) {
    const filters = request.input('filters') as Filters;

    const contracts = await backendApi.getContracts(filters);

    response.status(200).send(contracts);
  }

  public async get({ params, response, backendApi }: Context) {
    const { contract: id } = params;

    const contract = await backendApi.getContract(id);

    response.status(200).send(contract);
  }
}

export = ContractController;
