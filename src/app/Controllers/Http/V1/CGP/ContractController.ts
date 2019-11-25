import { Filters, Pagination } from '@robinfinance/js-api';
import { Context } from '../../../../../types';

class CGPContractController {
  public async create({ params, response, backendApi }: Context) {
    const { customer, proposition } = params;

    const contracts = await backendApi.createCGPContractsFromProposition(customer, proposition);

    response.status(200).send(contracts);
  }

  public async search({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const pagination = request.input('pagination') as Pagination;
    let filters = request.input('filters') as Filters;
    if ((filters && !('users' in filters)) || !filters) {
      filters = { users: customer };
    }
    const contracts = await backendApi.findCGPContracts(pagination, filters);

    response.status(200).send(contracts);
  }
}

export = CGPContractController;
