import { ObservationDTO } from '@robinfinance/js-api';

import { Observation } from '../../../../Models/Observation';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createObservation(
  this: BackendApi,
  customer: string | number,
  study: string | number,
  observation: ObservationDTO,
): Promise<Observation> {
  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customer}/study/${study}/observation/create`,
      },
      observation,
    );

    const data = await response.json();
    const createdObservation = new Observation(data);

    return createdObservation;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}
