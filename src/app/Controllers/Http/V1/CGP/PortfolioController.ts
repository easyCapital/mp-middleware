import { Filters, Pagination, OrderBy } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import { InvalidArgumentException } from '../../../../Exceptions';

class CGPPortfolioController {
  public async index({ request, response, backendApi }: Context) {
    const filters = request.input('filters') as Filters;
    const pagination = request.input('pagination') as Pagination;
    const orderBy = request.input('orderBy') as OrderBy;

    const portfolios = await backendApi.searchCGPPortfolios(pagination, filters, orderBy);

    response.status(200).send(portfolios);
  }

  public async prevalidate({ request, response, backendApi, universe }: Context) {
    const portfolio = request.post() as any;

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    await backendApi.prevalidateCGPPortfolios(universe, [portfolio]);

    response.status(204);
  }
}

export = CGPPortfolioController;
