import { Filters, OrderBy } from '@robinfinance/js-api';

import { Analysis } from '../../../../Models/Analysis';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function searchAnalyses(
  this: BackendApi,
  filters?: Filters,
  orderBy?: OrderBy,
): Promise<Analysis[]> {
  try {
    const response = await this.backendClient.get({
      url: `cgp/asset_freezing_blacklist_searches`,
      filters,
      orderBy,
    });

    const data = await response.json();

    const analyses = data.map((analysis) => new Analysis(analysis));

    return analyses;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
