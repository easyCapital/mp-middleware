import { Exception } from '../../../../Exceptions';
import { PortfolioException, BackendException } from '../../Exceptions';
import { PortfolioDTO } from '../../DTO';
import BackendApi from '../..';

export default async function prevalidatePortfolio(this: BackendApi, portfolioDTO: PortfolioDTO): Promise<void> {
  try {
    const product = await this.getProduct({ identifier: portfolioDTO.product });

    const formattedFunds = portfolioDTO.funds.map(fund => ({
      line: fund.id,
      amount: fund.weight * portfolioDTO.amount,
    }));

    await this.backendClient.post(
      {
        url: 'contract/prevalidate',
      },
      {
        products: [
          {
            product: product.getId(),
            initial_deposit: portfolioDTO.amount,
            lines: formattedFunds,
          },
        ],
      },
    );
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      if (error.products && error.products.length > 0) {
        throw new PortfolioException(error.products[0]);
      }

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
