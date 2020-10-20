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
  let formattedFilters: Filters = {};

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
    const [customerResponse, coSubscriberResponse] = await Promise.all([
      this.backendClient.get({
        url: 'cgp/study/search',
        filters: { ...formattedFilters, customer: customerId },
        orderBy: { key: 'created', type: 'asc' },
      }),
      this.backendClient.get({
        url: 'cgp/study/search',
        filters: { ...formattedFilters, co_subscriber: customerId },
        orderBy: { key: 'created', type: 'asc' },
      }),
    ]);

    const customerStudies = await customerResponse.json();
    const coSubscriberStudies = await coSubscriberResponse.json();

    const studies: Study[] = [];

    customerStudies.forEach((item) => studies.push(new Study(item)));
    coSubscriberStudies.forEach((item) => studies.push(new Study(item)));

    return studies;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
