import { Filters, Pagination } from '@robinfinance/js-api';

import { Context } from '../../../../types';

class FundController {
  public async search({ request, response, backendApi }: Context): Promise<void> {
    const filters = request.input('filters') as Filters;
    const pagination = request.input('pagination') as Pagination;

    const funds = await backendApi.findFunds(pagination, filters);

    response.status(200).send(funds);
  }
}

export = FundController;
