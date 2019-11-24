import { Proposition } from '../../../Models/Proposition';
import { Exception } from '../../../Exceptions';
import { PropositionException } from '../Exceptions';
import { getPropositionDetails } from '../Helpers';
import BackendApi from '..';

export default async function getPropositionByToken(this: BackendApi, token: string): Promise<Proposition> {
  try {
    const response = await this.backendClient.get({ url: `proposition/get/token/${token}` });
    const proposition = await response.json();

    return getPropositionDetails(this, proposition);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new PropositionException(error);
    }

    throw new Exception(exception);
  }
}
