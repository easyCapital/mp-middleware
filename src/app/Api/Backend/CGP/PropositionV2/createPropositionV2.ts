import { PortfolioDTO } from '@robinfinance/js-api';

import { Proposition } from '../../../../Models/Proposition';
import { Exception } from '../../../../Exceptions';
import { BackendException, PortfolioException } from '../../Exceptions';
import { getPropositionDetails } from '../../Helpers';
import BackendApi from '../..';

export default async function createPropositionV2(
  this: BackendApi,
  customerId: string,
  study: string,
  universe: string,
  content: { amount: number; product_id: number },
): Promise<Proposition> {
  try {
    const response = await this.backendClient.post(
      {
        url: 'proposition_v2/cgp/create',
      },
      {
        user: customerId,
        study,
        universe,
        content,
      },
    );

    const data = await response.json();

    return getPropositionDetails(this, data);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      if (error.contents && error.contents.length > 0) {
        throw new PortfolioException(error.contents);
      }

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
