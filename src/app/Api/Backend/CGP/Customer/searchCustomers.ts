import { Filters, Pagination, Meta } from '@robinfinance/js-api';

import { Customer } from '../../../../Models/Customer';
import { Exception } from '../../../../Exceptions';
import { formatMeta } from '../../Helpers';
import BackendApi from '../..';

export default async function searchCustomers(
  this: BackendApi,
  pagination: Pagination = { page: 1, perPage: 100 },
  filters?: Filters,
): Promise<{ results: Customer[]; meta: Meta }> {
  try {
    const response = await this.backendClient.get({ url: 'customer/cgp/search', filters, pagination });
    const data = await response.json();

    const customers = data.map(item => new Customer(item));

    const meta = formatMeta(response.headers, pagination);

    return { results: customers, meta };
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }
}
