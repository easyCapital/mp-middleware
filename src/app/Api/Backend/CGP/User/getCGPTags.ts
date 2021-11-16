import { Filters, Meta, OrderBy, Pagination } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { Tag } from '../../../../Models/Tag';
import { formatMeta } from '../../Helpers';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCGPTags(
  this: BackendApi,
  pagination: Pagination,
  filters?: Filters,
  orderBy?: OrderBy,
): Promise<{ results: Tag[]; meta: Meta }> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/tags/search',
      pagination,
      filters,
      orderBy,
    });

    const data = await response.json();

    const meta = formatMeta(response.headers, pagination);
    const tags = data.map((item) => new Tag(item));

    return { results: tags, meta };
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
