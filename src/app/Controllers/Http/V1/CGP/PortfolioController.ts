import { Filters, Pagination } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPPortfolioController {
  public async index({ request, response, backendApi }: Context) {
    const filters = request.input('filters') as Filters;
    const pagination = request.input('pagination') as Pagination;

    const portfolios = await backendApi.searchCGPPortfolios(pagination, filters);

    response.status(200).send(portfolios);
  }

  public async prevalidate({ request, response, backendApi }: Context) {
    const portfolio = request.post() as any;

    await backendApi.prevalidateCGPPortfolio(portfolio);

    response.status(204);
  }
}

export = CGPPortfolioController;
