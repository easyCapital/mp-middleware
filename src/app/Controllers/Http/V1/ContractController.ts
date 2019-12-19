import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../types';

class ContractController {
  public async index({ request, response, backendApi }: Context) {
    const filters = request.input('filters', {}) as Filters;

    // this would be more explicit with:
    // filters.roles__user__proposition__risk_advice__isnull = false
    // but it doesn't work (see https://robinfinance.atlassian.net/browse/RDB-3488)
    filters._roles__user__proposition__risk_advice__isnull = 1;

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
