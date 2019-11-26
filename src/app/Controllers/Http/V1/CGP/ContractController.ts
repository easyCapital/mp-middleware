import { Filters, TaskTypes } from '@robinfinance/js-api';
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
    const filters = request.input('filters') as Filters;

    let contracts: Contract[] = await backendApi.getCGPCustomerContracts(customer, filters);

    contracts = await Promise.all(
      contracts.map(async (item: Contract) => {
        const tasks = await backendApi.getGCPContractTasks(item.getId().toString(), {
          type: TaskTypes.CONTAINER,
        });

        item.setTasks(tasks);

        return item;
      }),
    );

    response.status(200).send(contracts);
  }
}

export = CGPContractController;
