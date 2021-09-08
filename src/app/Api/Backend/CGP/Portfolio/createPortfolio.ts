import { PortfolioDTO } from '@robinfinance/js-api';

import { Portfolio, Fund } from '../../../../Models/Proposition';
import { Exception } from '../../../../Exceptions';
import { ArrayToObject } from '../../../../Helpers';
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
        lines: portfolio.funds.map((fund) => ({ line: fund.id, weight: fund.weight })),
      },
    );

    const data = await response.json();
    const createdPortfolio = new Portfolio(data);

    if (portfolio.amount) {
      createdPortfolio.setAmount(portfolio.amount);
    }

    const fundIds = portfolio.funds.map((item) => item.id);

    const funds = await this.findFunds(undefined, { id__in: fundIds });
    const fundsById: { [id: string]: Fund } = ArrayToObject(funds.results);

    portfolio.funds.forEach((item) => {
      const fund = fundsById[item.id];

      if (fund) {
        fund.setWeight(item.weight);

        createdPortfolio.addFund(fund);
      }
    });

    return createdPortfolio;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new PortfolioException([error]);
    }

    throw new Exception(exception);
  }
}
