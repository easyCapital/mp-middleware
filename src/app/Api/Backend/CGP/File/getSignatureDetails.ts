import { Filters, Meta, OrderBy, Pagination } from '@robinfinance/js-api';

import BackendApi from '../..';
import { FileSign } from '../../../../Models/File';
import { BackendException } from '../../Exceptions';
import { Exception } from '../../../../Exceptions';
import { formatMeta } from '../../Helpers';

export default async function getSignatureDetails(
  this: BackendApi,
  pagination: Pagination = { page: 1, perPage: 100 },
  filters?: Filters,
  orderBy?: OrderBy,
): Promise<{ results: File[]; meta: Meta }> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/signature/search',
      pagination,
      filters,
      orderBy,
    });

    const data = await response.json();

    const meta = formatMeta(response.headers, pagination);

    const files = data.map((item) => new FileSign(item));

    return { results: files, meta };
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
