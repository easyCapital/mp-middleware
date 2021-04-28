import { Contract } from '../../../../Models/Contract';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createContractsFromPropositionV2(
  this: BackendApi,
  customerId: string,
  propositionId: string,
): Promise<Contract[]> {
  try {
    const response = await this.backendClient.post(
      {
        url: 'contract/cgp/create_from_proposition',
      },
      {
        user: Number(customerId),
        proposition_v2: Number(propositionId),
      },
    );

    const data = await response.json();

    return data.map((contract) => new Contract(contract));
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
