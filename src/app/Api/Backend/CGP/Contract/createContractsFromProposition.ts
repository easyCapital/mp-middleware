import { Contract } from '../../../../Models/Contract';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import { formatContractTasks } from '../../Helpers';
import BackendApi from '../..';

export default async function createContractsFromProposition(
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
        proposition: Number(propositionId),
      },
    );

    const data = await response.json();

    const contracts = data.map(contract => new Contract(contract));

    await Promise.all(
      contracts.map(async (item: Contract) => {
        const tasks = await this.getGCPContractTasks(item.getId().toString());

        item.setTasks(formatContractTasks(tasks));

        return item;
      }),
    );

    return contracts;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
