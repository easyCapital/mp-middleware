import { ObservationDTO } from '@robinfinance/js-api';

import { Observation } from '../../../../Models/Observation';
import { ObservationCategoryMapper } from '../../../../Mappers/Observation';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createObservation(
  this: BackendApi,
  customer: string | number,
  study: string | number,
  observation: ObservationDTO,
): Promise<Observation> {
  const formattedObservation: { text: string; display_order?: number; category?: string | null } = {
    text: observation.text || '',
  };

  if (observation.order !== undefined) {
    formattedObservation.display_order = observation.order;
  }

  if (observation.category !== undefined) {
    formattedObservation.category = observation.category
      ? ObservationCategoryMapper.reverseTransform(observation.category)
      : null;
  }

  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customer}/study/${study}/observation/create`,
      },
      formattedObservation,
    );

    const data = await response.json();
    const createdObservation = new Observation(data);

    return createdObservation;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}
