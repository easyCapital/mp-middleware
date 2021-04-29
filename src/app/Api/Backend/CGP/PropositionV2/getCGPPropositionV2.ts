import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import { PropositionV2 } from '../../../../Models/PropositionV2';
import BackendApi from '../..';
import getPropositionV2Details from '../../Helpers/getPropositionV2Details';

export default async function getStudyPropositions(
  this: BackendApi,
  customer: string,
  study: string,
): Promise<PropositionV2[]> {
  try {
    const response = await this.backendClient.get({
      url: 'proposition_v2/cgp/search',
      filters: { customer, study },
    });
    const data = await response.json();

    const propositions: PropositionV2[] = data;

    const formattedPropositions: PropositionV2[] = [];

    for (const proposition of propositions) {
      formattedPropositions.push(await getPropositionV2Details(this, proposition));
    }

    return formattedPropositions;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
