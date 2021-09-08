import { Filters } from '@robinfinance/js-api';

import { Proposition } from '../../../../Models/Proposition';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCustomerPropositions(
  this: BackendApi,
  customerId: string,
  filters?: Filters,
): Promise<Proposition[]> {
  try {
    const response = await this.backendClient.get({
      url: 'proposition/cgp/search',
      filters: filters ? { ...filters, user_id: customerId } : { user_id: customerId },
      orderBy: { key: 'created', type: 'desc' },
    });
    const data = await response.json();

    const propositions = data.map((item) => new Proposition(item));

    return propositions;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
