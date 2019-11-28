import { Exception } from '../../../../Exceptions';
import { Proposition } from '../../../../Models/Proposition';
import { getPropositionDetails } from '../../Helpers';
import BackendApi from '../..';

export default async function generateCustomerProposition(
  this: BackendApi,
  universe: string | undefined,
  customerId: string,
): Promise<Proposition> {
  try {
    const response = await this.backendClient.post(
      { url: 'proposition/cgp/generate' },
      { universe, customer: customerId },
    );

    const data = await response.json();

    return getPropositionDetails(this, data);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }
}
