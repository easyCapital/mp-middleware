import { Pagination, Meta } from '@robinfinance/js-api';

import { formatMeta } from '../../Helpers';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function exportCustomers(
  this: BackendApi,
  pagination?: Pagination,
): Promise<{ results: { [key: string]: string }[]; meta: Meta }> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/customer/export',
      pagination,
    });

    const data = await response.json();

    const meta = formatMeta(response.headers, pagination);

    return { results: data, meta };
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
