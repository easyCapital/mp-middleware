import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function deleteObservation(
  this: BackendApi,
  customer: string | number,
  study: string | number,
  observation: string | number,
): Promise<void> {
  try {
    await this.backendClient.delete({
      url: `cgp/customer/${customer}/study/${study}/observation/${observation}/delete`,
    });
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}