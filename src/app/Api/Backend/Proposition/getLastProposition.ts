import { Proposition } from '../../../Models/Proposition';
import BackendApi from '..';
import { Exception } from '../../../Exceptions';
import getPropositionDetails from '../Helpers/getPropositionDetails';

export default async function getLastProposition(this: BackendApi): Promise<Proposition> {
  try {
    const response = await this.backendClient.get({ url: 'proposition/customer/search' });
    const data = await response.json();

    const lastProposition = data[data.length - 1];

    return getPropositionDetails(this, lastProposition);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(error);
    }

    throw new Exception(exception);
  }
}
