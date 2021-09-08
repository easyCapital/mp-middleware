import { Answer } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';
import { Proposition } from '../../../Models/Proposition';
import { getPropositionDetails } from '../Helpers';
import BackendApi from '..';

export default async function generateProspectProposition(
  this: BackendApi,
  universe: string | undefined,
  prospectId: string,
  answers: Answer[],
): Promise<Proposition> {
  try {
    const response = await this.backendClient.post(
      { url: 'recommendation/customer/generate_prospect_proposition' },
      { universe, prospect: prospectId, answers },
    );

    const data = await response.json();

    return getPropositionDetails(this, data);
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }
}
