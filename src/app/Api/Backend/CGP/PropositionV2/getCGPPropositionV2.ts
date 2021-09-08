import { Filters } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import { PropositionV2 } from '../../../../Models/PropositionV2';
import BackendApi from '../..';

export default async function getStudyPropositions(
  this: BackendApi,
  customer: string,
  study: string,
  filters?: Filters,
): Promise<PropositionV2[]> {
  try {
    const response = await this.backendClient.get({
      url: `cgp/customer/${customer}/study/${study}/proposition_v2/search`,
      filters,
    });
    const data = await response.json();

    const propositions = data.map((item) => new PropositionV2(item));

    return propositions;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
