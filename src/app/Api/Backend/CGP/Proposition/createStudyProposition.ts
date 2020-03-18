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
  portfolios: { id: number; amount: number }[],
): Promise<Proposition> {
  try {
    const response = await this.backendClient.post(
      {
        url: 'proposition/cgp/create',
      },
      {
        user: customerId,
        study,
        universe,
        contents: portfolios.map(item => ({ portfolio: item.id, amount: item.amount })),
      },
    );

    const data = await response.json();

    return getPropositionDetails(this, data);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      if (error.contents && error.contents.length > 0) {
        throw new PortfolioException(error.contents[0]);
      }

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
