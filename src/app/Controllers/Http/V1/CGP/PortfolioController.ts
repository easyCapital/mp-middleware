import { Filters, Pagination, OrderBy, PortfolioDTO } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import { InvalidArgumentException } from '../../../../Exceptions';

class CGPPortfolioController {
  public async index({ request, response, backendApi }: Context): Promise<void> {
    const filters = request.input('filters') as Filters;
    const pagination = request.input('pagination') as Pagination;
    const orderBy = request.input('orderBy') as OrderBy;

    const portfolios = await backendApi.searchCGPPortfolios(pagination, filters, orderBy);

    response.status(200).send(portfolios);
  }

  public async create({ request, response, backendApi, universe }: Context): Promise<void> {
    const data = request.post() as PortfolioDTO;

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    const portfolio = await backendApi.createCGPPortfolio(universe, data);

    response.status(200).send(portfolio);
  }

  public async prevalidate({ request, response, backendApi, universe }: Context): Promise<void> {
    const portfolio = request.post() as PortfolioDTO;

    if (!universe) {
      throw new InvalidArgumentException("Aucun univers n'a été fourni.");
    }

    await backendApi.prevalidateCGPPortfolios(universe, [portfolio]);

    response.status(204);
  }

  public async recommendation({ params, response, backendApi }: Context): Promise<void> {
    const { customerId, studyId, productIdentifier } = params;

    const portfolio = await backendApi.getCGPRecommendedPortfolio(customerId, studyId, productIdentifier);

    response.status(200).send(portfolio);
  }
}

export = CGPPortfolioController;
