import { PortfolioDTO } from '@robinfinance/js-api';

import { Portfolio } from '../../../../Models/Proposition';
import { Exception } from '../../../../Exceptions';
import { PortfolioException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createPortfolio(
  this: BackendApi,
  universe: string,
  portfolio: PortfolioDTO,
): Promise<Portfolio> {
  try {
    const response = await this.backendClient.post(
      {
        url: 'portfolio/cgp/create',
      },
      {
        universe,
        product: portfolio.product,
        lines: portfolio.funds.map(fund => ({ line: fund.id, weight: fund.weight })),
      },
    );

    const data = await response.json();
    const createdPortfolio = new Portfolio(data);

    if (portfolio.amount) {
      createdPortfolio.setAmount(portfolio.amount);
    }

    return createdPortfolio;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new PortfolioException([error]);
    }

    throw new Exception(exception);
  }
}
