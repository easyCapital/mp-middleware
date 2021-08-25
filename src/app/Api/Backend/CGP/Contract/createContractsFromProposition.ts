import { PortfolioFeeDTO } from '@robinfinance/js-api';

import { Contract } from '../../../../Models/Contract';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createContractsFromProposition(
  this: BackendApi,
  customerId: string,
  propositionId: string,
  fees: PortfolioFeeDTO[],
): Promise<Contract[]> {
  try {
    const response = await this.backendClient.post(
      {
        url: 'contract/cgp/create_from_proposition',
      },
      {
        user: Number(customerId),
        proposition: Number(propositionId),
        fees: fees.map((fee) => ({
          portfolio_id: fee.portfolioId,
          values: {
            management_fee_rate: fee.managementFeeRate !== undefined ? fee.managementFeeRate : null,
            subscription_fee_rate: fee.subscriptionFeeRate !== undefined ? fee.subscriptionFeeRate : null,
          },
        })),
      },
    );

    const data = await response.json();

    const contracts = data.map((contract) => new Contract(contract));

    return contracts;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
