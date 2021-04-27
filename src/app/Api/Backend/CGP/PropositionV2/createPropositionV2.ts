import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';
import { PropositionV2 } from '../../../../Models/PropositionV2';

export default async function createPropositionV2(
  this: BackendApi,
  customerId: string,
  study: string,
  universe: string,
  contents: { amount: number; product: number }[],
): Promise<PropositionV2> {
  try {
    const response = await this.backendClient.post(
      {
        url: 'proposition_v2/cgp/create',
      },
      {
        customer: customerId,
        study,
        universe,
        contents,
      },
    );

    const data = await response.json();

    return data;
  } catch (exception) {
    throw new Exception(exception);
  }
}
