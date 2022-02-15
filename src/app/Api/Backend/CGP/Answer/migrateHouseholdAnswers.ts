import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function migrateHouseholdAnswers(
  this: BackendApi,
  householdId: number | string,
  questions: string[],
): Promise<void> {
  try {
    await this.backendClient.patch({ url: `cgp/household/${householdId}/answer/migrate` }, { questions });
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
