import { Contract } from '../../../../Models/Contract';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function createContractsFromProposition(
  this: BackendApi,
  customerId: string,
  propositionId: string,
): Promise<Contract[]> {
  console.log(customerId, propositionId);
  try {
    const response = await this.backendClient.post(
      {
        url: 'contract/cgp/create_from_proposition',
      },
      {
        user: Number(customerId),
        proposition: Number(propositionId),
      },
    );

    const data = await response.json();

    const contracts = data.map(contract => new Contract(contract));

    return contracts;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }
}
