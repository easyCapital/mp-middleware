import { Observation } from '../../../../Models/Observation';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function reorderObservations(
  this: BackendApi,
  customer: string | number,
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
        url: `cgp/customer/${customer}/study/${study}/observation/modify`,
      },
      formattedObservations,
    );

    const data = await response.json();
    const updatedObservations = data.map((item) => new Observation(item));

    return updatedObservations;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}
