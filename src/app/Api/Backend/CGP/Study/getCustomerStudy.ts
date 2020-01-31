import { Filters } from '@robinfinance/js-api';

import { Study } from '../../../../Models/Study';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCustomerStudy(
  this: BackendApi,
  customerId: string,
  filters?: Filters,
): Promise<Study[]> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/study/search',
      filters: filters ? { ...filters, customer: customerId } : { customer: customerId },
      orderBy: { key: 'created', type: 'asc' },
    });
    const data = await response.json();

    const studies = data.map(item => new Study(item));

    return studies;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
