import { Filters, Pagination, OrderBy, PortfolioDTO } from '@robinfinance/js-api';

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

  public async create({ request, response, backendApi, universe }: Context) {
    const data = request.post() as PortfolioDTO;

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const portfolio = await backendApi.createCGPPortfolio(universe, data);

    response.status(200).send(portfolio);
  }

  public async prevalidate({ request, response, backendApi, universe }: Context) {
    const portfolio = request.post() as PortfolioDTO;

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    await backendApi.prevalidateCGPPortfolios(universe, [portfolio]);

    response.status(204);
  }
}

export = CGPPortfolioController;
