import { Filters } from '@robinfinance/js-api';

import { StudyStatusMapper } from '../../../../Mappers/Study';
import { Study } from '../../../../Models/Study';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCustomerStudies(
  this: BackendApi,
  customerId: string,
  filters?: Filters,
): Promise<Study[]> {
  let formattedFilters: Filters = { customer: customerId };

  if (filters) {
    if ('status' in filters) {
      if (Array.isArray(filters.status)) {
        formattedFilters.status__in = filters.status.map((status) => StudyStatusMapper.reverseTransform(status));
      } else {
        formattedFilters.status = StudyStatusMapper.reverseTransform(filters.status);
      }

      delete filters.status;
    }

    formattedFilters = { ...formattedFilters, ...filters };
  }

  try {
    const response = await this.backendClient.get({
      url: 'cgp/study/search',
      filters: formattedFilters,
      orderBy: { key: 'created', type: 'asc' },
    });
    const data = await response.json();

    const studies = data.map((item) => new Study(item));

    return studies;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
