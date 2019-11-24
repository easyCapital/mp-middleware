import { Portfolio } from '../../../../Models/Proposition';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export interface PortfolioDTO {
  product: string;
  amount: number;
  funds: {
    id: number;
    weight: number;
  }[];
}

export default async function createPortfolio(
  this: BackendApi,
  universe: string,
  portfolioDTO: PortfolioDTO,
): Promise<Portfolio> {
  try {
    const product = await this.getProduct({ identifier: portfolioDTO.product });

    const formattedFunds = portfolioDTO.funds.map(fund => ({ line: fund.id, weight: fund.weight }));

    const response = await this.backendClient.post(
      {
        url: 'portfolio/cgp/create',
      },
      {
        universe,
        product: product.getId(),
        lines: formattedFunds,
      },
    );

    const data = await response.json();
    const portfolio = new Portfolio(data);

    portfolio.setAmount(portfolioDTO.amount);

    return portfolio;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
