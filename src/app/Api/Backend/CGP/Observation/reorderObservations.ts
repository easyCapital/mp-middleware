import { Observation } from '../../../../Models/Observation';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function reorderObservations(
  this: BackendApi,
  study: string | number,
  observations: number[],
): Promise<Observation[]> {
  const formattedObservations: { id: number; display_order: number }[] = observations.map((item, index) => ({
    id: item,
    display_order: index + 1,
  }));

  try {
    const response = await this.backendClient.patch(
      {
        url: `cgp/study/${study}/observation/modify`,
      },
      formattedObservations,
    );

    const data = await response.json();
    const updatedObservations = data.map((item) => new Observation(item));

    return updatedObservations;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}
