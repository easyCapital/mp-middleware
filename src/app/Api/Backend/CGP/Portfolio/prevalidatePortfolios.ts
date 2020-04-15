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
    const errors: (string[] | undefined)[] = [];

    const formattedPortfolios = portfolios.map((portfolio, index) => {
      errors[index] = undefined;

      if (!portfolio.amount) {
        errors[index] = ["Le montant de placement initial n'est pas renseigné sur ce contrat."];
      }

      return {
        product: portfolio.product,
        initial_deposit: portfolio.amount,
        lines: portfolio.funds.map(fund => ({
          line: fund.id,
          amount: fund.weight * (portfolio.amount || 0),
        })),
      };
    });

    if (errors.filter(error => error !== undefined).length > 0) {
      // @ts-ignore
      throw new InvalidArgumentException(errors);
    }

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
