import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getSerenalisProfileScoring(
  this: BackendApi,
  customerId: string | number,
  studyId: string | number,
  universe: string,
): Promise<{ score: number }> {
  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customerId}/study/${studyId}/get_serenalis_profile_scoring`,
      },
      {
        universe,
      },
    );

    const data = await response.json();

    return { score: data.profile_scoring };
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
