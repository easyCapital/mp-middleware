import { Filters, Pagination } from '@robinfinance/js-api';
import { Context } from '../../../../../types';

class CGPContractTaskController {
  public async search({ params, request, response, backendApi }: Context) {
    const { contract } = params;
    const pagination = request.input('pagination') as Pagination;
    let filters = request.input('filters') as Filters;
    if ((filters && !('contract' in filters)) || !filters) {
      filters = { contract };
    }
    const contracts = await backendApi.findCGPContractTasks(pagination, filters);

    response.status(200).send(contracts);
  }
}

export = CGPContractTaskController;
