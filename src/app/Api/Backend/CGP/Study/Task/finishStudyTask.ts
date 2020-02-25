import { Exception } from '../../../../../Exceptions';
import { BackendException } from '../../../Exceptions';
import BackendApi from '../../..';

export default async function createStudy(
  this: BackendApi,
  customerId: string,
  studyId: string,
  taskId: string,
): Promise<void> {
  try {
    await this.backendClient.patch({
      url: `cgp/customer/${customerId}/study/${studyId}/task/${taskId}/finish`,
    });
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
