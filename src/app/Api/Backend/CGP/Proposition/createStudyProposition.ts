import { PortfolioDTO } from '@robinfinance/js-api';

import { Proposition } from '../../../../Models/Proposition';
import { Exception } from '../../../../Exceptions';
import { BackendException, PortfolioException } from '../../Exceptions';
import { getPropositionDetails } from '../../Helpers';
import BackendApi from '../..';

export default async function createStudyProposition(
  this: BackendApi,
  customerId: string,
  study: string,
  universe: string,
  portfolios: PortfolioDTO[],
): Promise<Proposition> {
  await this.prevalidateCGPPortfolios(universe, portfolios);

  try {
    const response = await this.backendClient.post(
      {
        url: 'proposition/cgp/create',
      },
      {
        user: customerId,
        study,
        universe,
        contents: portfolios.map((item) => ({ portfolio: item.portfolio, amount: item.amount })),
      },
    );

    const data = await response.json();

    return getPropositionDetails(this, data);
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      if (error.contents && error.contents.length > 0) {
        throw new PortfolioException(error.contents);
      }

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
