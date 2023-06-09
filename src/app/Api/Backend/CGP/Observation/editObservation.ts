import { ObservationDTO } from '@robinfinance/js-api';

import { Observation } from '../../../../Models/Observation';
import { ObservationCategoryMapper } from '../../../../Mappers/Observation';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function editObservation(
  this: BackendApi,
  study: string | number,
  observation: string | number,
  observationData: ObservationDTO,
): Promise<Observation> {
  const formattedObservation: { id: number; text?: string; display_order?: number; category?: string | null } = {
    id: Number(observation),
  };

  if (observationData.text !== undefined) {
    formattedObservation.text = observationData.text;
  }

  if (observationData.order !== undefined) {
    formattedObservation.display_order = observationData.order;
  }

  if (observationData.category !== undefined) {
    formattedObservation.category = observationData.category
      ? ObservationCategoryMapper.reverseTransform(observationData.category)
      : null;
  }

  try {
    const response = await this.backendClient.patch(
      {
        url: `cgp/study/${study}/observation/modify`,
      },
      [formattedObservation],
    );

    const data = await response.json();
    const updatedObservation = new Observation(data[0]);

    return updatedObservation;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}
