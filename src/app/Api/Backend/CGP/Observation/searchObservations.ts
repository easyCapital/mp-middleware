import { Filters } from '@robinfinance/js-api';

import { Observation } from '../../../../Models/Observation';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function searchObservations(
  this: BackendApi,
  customerId: string,
  studyId: string,
  filters?: Filters,
): Promise<Observation[]> {
  try {
    const response = await this.backendClient.get({
      url: `cgp/customer/${customerId}/study/${studyId}/observation/search`,
      filters,
    });
    const data = await response.json();

    const observations = data.map((item) => new Observation(item));

    return observations;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
