import { Filters, Meta, OrderBy, Pagination } from '@robinfinance/js-api';

import BackendApi from '../..';
import { FileSign } from '../../../../Models/File';
import { FileSignStatusMapper } from '../../../../Mappers/File';
import { BackendException } from '../../Exceptions';
import { Exception } from '../../../../Exceptions';
import { formatMeta } from '../../Helpers';

export default async function getSignatureDetails(
  this: BackendApi,
  pagination: Pagination = { page: 1, perPage: 100 },
  filters?: Filters,
  orderBy?: OrderBy,
): Promise<{ results: File[]; meta: Meta }> {
  let formattedFilters: Filters = {};

  if (filters) {
    if ('status' in filters) {
      if (Array.isArray(filters.status)) {
        formattedFilters.status__in = filters.status.map((status) => FileSignStatusMapper.reverseTransform(status));
      } else {
        formattedFilters.status = FileSignStatusMapper.reverseTransform(filters.status);
      }

      delete filters.status;
    }

    formattedFilters = { ...formattedFilters, ...filters };
  }

  try {
    const response = await this.backendClient.get({
      url: 'cgp/signature/search',
      pagination,
      filters: formattedFilters,
      orderBy,
    });

    const data = await response.json();

    const meta = formatMeta(response.headers, pagination);

    const files = data.map((item) => new FileSign(item));

    return { results: files, meta };
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
