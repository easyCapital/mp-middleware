import { PropositionContentDTO } from '@robinfinance/js-api';

import BackendApi from '../..';
import { Exception } from '../../../../Exceptions';
import { PropositionV2 } from '../../../../Models/PropositionV2';

export default async function createPropositionV2(
  this: BackendApi,
  customerId: string,
  study: string,
  universe: string,
  contents: PropositionContentDTO[],
): Promise<PropositionV2> {
  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customerId}/study/${study}/proposition_v2/create`,
      },
      {
        universe,
        contents,
      },
    );

    const data = await response.json();

    const proposition = new PropositionV2(data);

    return proposition;
  } catch (exception) {
    throw new Exception(exception);
  }
}
