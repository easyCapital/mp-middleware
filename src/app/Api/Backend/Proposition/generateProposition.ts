import { Exception } from '../../../Exceptions';
import { Proposition } from '../../../Models/Proposition';
import BackendApi from '..';
import getPropositionDetails from '../Helpers/getPropositionDetails';

export default async function generateProposition(
  this: BackendApi,
  universe: string | undefined,
): Promise<Proposition> {
  try {
    const response = await this.backendClient.post(
      { url: 'recommendation/customer/generate_proposition' },
      { universe },
    );

    const data = await response.json();

    return getPropositionDetails(this, data);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const data = await exception.json();

      throw new Exception(JSON.stringify(data));
    }

    throw new Exception(exception);
  }
}
