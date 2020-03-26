import { PortfolioDTO } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { PortfolioException, BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function prevalidatePortfolios(
  this: BackendApi,
  universe: string,
  portfolios: PortfolioDTO[],
): Promise<void> {
  try {
    const formattedPortfolios = portfolios.map(portfolio => ({
      product: portfolio.product,
      initial_deposit: portfolio.amount,
      lines: portfolio.funds.map(fund => ({
        line: fund.id,
        amount: fund.weight * portfolio.amount,
      })),
    }));

    await this.backendClient.post(
      {
        url: 'contract/prevalidate',
      },
      {
        universe,
        products: formattedPortfolios,
      },
    );
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      if (error.products && error.products.length > 0) {
        throw new PortfolioException(error.products);
      }

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
