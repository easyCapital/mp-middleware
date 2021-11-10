import { Filters, Pagination, Meta, OrderBy } from '@robinfinance/js-api';

import { Household } from '../../../../Models/Household';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import { formatMeta } from '../../Helpers';
import BackendApi from '../..';

export default async function searchHouseholds(
  this: BackendApi,
  pagination: Pagination = { page: 1, perPage: 100 },
  filters?: Filters,
  orderBy?: OrderBy,
): Promise<{ results: Household[]; meta: Meta }> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/household/search',
      filters,
      pagination,
      orderBy,
    });

    const data = await response.json();

    const meta = formatMeta(response.headers, pagination);
    const households = data.map((item) => new Household(item));

    return { results: households, meta };
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
