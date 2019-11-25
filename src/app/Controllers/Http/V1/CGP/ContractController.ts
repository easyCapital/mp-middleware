import { Filters, Pagination } from '@robinfinance/js-api';
import { Contract } from '../../../../Models/Contract';
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
      filters = { users: customer, ...filters };
    }
    let contracts: any = await backendApi.findCGPContracts(pagination, filters);

    contracts = await Promise.all(
      contracts.results.map(async (item: Contract) => {
        const tasks = await backendApi.findCGPContractTasks({ page: 1, perPage: 100 }, { contract: item.getId() });
        return { ...item, tasks: tasks.results };
      }),
    );

    response.status(200).send(contracts);
  }
}

export = CGPContractController;
