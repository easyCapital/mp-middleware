import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import { PropositionV2 } from '../../../../Models/PropositionV2';
import BackendApi from '../..';

export default async function getStudyPropositions(
  this: BackendApi,
  customer: string,
  study: string,
): Promise<PropositionV2[]> {
  try {
    const response = await this.backendClient.get({
      url: `cgp/customer/${customer}/study/${study}/proposition_v2/search`,
    });
    const data = await response.json();

    const propositions = data.map((item) => new PropositionV2(item));

    return propositions;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
