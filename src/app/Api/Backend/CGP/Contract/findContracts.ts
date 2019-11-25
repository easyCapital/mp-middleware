import { Filters, Pagination, Meta } from '@robinfinance/js-api';

import { Contract } from '../../../../Models/Contract';
import { Exception } from '../../../../Exceptions';
import { formatMeta } from '../../Helpers';
import BackendApi from '../..';

export default async function findContracts(
  this: BackendApi,
  pagination: Pagination = { page: 1, perPage: 10 },
  filters?: Filters,
): Promise<{ results: Contract[]; meta: Meta }> {
  try {
    const response = await this.backendClient.get({
      url: 'contract/cgp/search',
      filters,
    });
    const data = await response.json();

    const contracts = data.map(item => new Contract(item));

    const meta = formatMeta(response.headers, pagination);

    return { results: contracts, meta };
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const data = await exception.json();

      throw new Exception(JSON.stringify(data));
    }

    throw new Exception(exception);
  }
}
