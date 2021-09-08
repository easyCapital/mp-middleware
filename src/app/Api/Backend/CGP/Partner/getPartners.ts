import { Filters, OrderBy, Pagination } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { Partner } from '../../../../Models/Partner';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getPartners(
  this: BackendApi,
  pagination: Pagination = { page: 1, perPage: 100 },
  filters?: Filters,
  orderBy?: OrderBy,
): Promise<Partner[]> {
  try {
    const response = await this.backendClient.get({
      url: `cgp/partner/search`,
      pagination,
      filters,
      orderBy,
    });

    const data = await response.json();

    const partners = data.map((item) => new Partner(item));

    return partners;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
