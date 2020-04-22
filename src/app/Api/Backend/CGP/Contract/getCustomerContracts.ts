import { Filters } from '@robinfinance/js-api';

import { Contract } from '../../../../Models/Contract';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCustomerContracts(
  this: BackendApi,
  customerId: string,
  filters?: Filters,
): Promise<Contract[]> {
  try {
    const response = await this.backendClient.get({
      url: 'contract/cgp/search',
      filters: filters ? { ...filters, users: customerId } : { users: customerId },
      orderBy: { key: 'date_created', type: 'desc' },
    });
    const data = await response.json();

    const contracts = data.map((item) => new Contract(item));

    return contracts;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
