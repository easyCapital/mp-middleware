import { Filters, Pagination, Meta } from '@robinfinance/js-api';

import { Fund } from '../../../Models/Proposition';
import { FundTypeMapper } from '../../../Mappers/Proposition';
import { Exception } from '../../../Exceptions';
import { formatMeta } from '../Helpers';
import BackendApi from '..';

export default async function findFunds(
  this: BackendApi,
  pagination: Pagination = { page: 1, perPage: 100 },
  filters?: Filters,
): Promise<{ results: Fund[]; meta: Meta }> {
  const formattedFilters: Filters = filters ? { ...filters } : {};

  if ('type' in formattedFilters) {
    if (Array.isArray(formattedFilters.type)) {
      formattedFilters.line_type__in = formattedFilters.type.map((type) => FundTypeMapper.reverseTransform(type));
    } else {
      formattedFilters.line_type = FundTypeMapper.reverseTransform(formattedFilters.type);
    }

    delete formattedFilters.type;
  }

  try {
    const response = await this.backendClient.get({
      url: 'line/search',
      filters: formattedFilters,
      pagination,
    });
    const data = await response.json();

    const funds = data.map((item) => new Fund(item));

    const meta = formatMeta(response.headers, pagination);

    return { results: funds, meta };
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const data = await exception.json();

      throw new Exception(JSON.stringify(data));
    }

    throw new Exception(exception);
  }
}
