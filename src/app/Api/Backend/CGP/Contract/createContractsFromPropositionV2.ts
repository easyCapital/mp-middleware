import { PropositionContentFeeDTO } from '@robinfinance/js-api';

import { Contract } from '../../../../Models/Contract';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createContractsFromPropositionV2(
  this: BackendApi,
  customerId: string,
  propositionId: string,
  fees: PropositionContentFeeDTO[],
): Promise<Contract[]> {
  try {
    const response = await this.backendClient.post(
      {
        url: 'contract/cgp/create_from_proposition',
      },
      {
        user: Number(customerId),
        proposition_v2: Number(propositionId),
        fees: fees.map((fee) => ({
          proposition_content_id: fee.propositionContentId,
          values: {
            management_fee_rate: fee.managementFeeRate !== undefined ? fee.managementFeeRate : null,
            subscription_fee_rate: fee.subscriptionFeeRate !== undefined ? fee.subscriptionFeeRate : null,
          },
        })),
      },
    );

    const data = await response.json();

    return data.map((contract) => new Contract(contract));
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
