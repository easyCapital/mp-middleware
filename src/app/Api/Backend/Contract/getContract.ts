import { Contract } from '../../../Models/Contract';
import { Exception, NotFoundException } from '../../../Exceptions';
import { BackendException } from '../Exceptions';
import { formatContractTasks } from '../Helpers';
import BackendApi from '..';

export default async function getContract(this: BackendApi, id: string): Promise<Contract> {
  try {
    const response = await this.backendClient.get({
      url: 'contract/customer/search',
      filters: { id },
    });
    const data = await response.json();

    if (data.length > 0) {
      const contract = new Contract(data[0]);
      const tasks = await this.getContractTasks({
        contract: contract.getId().toString(),
      });

      contract.setTasks(formatContractTasks(tasks));

      return contract;
    }
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }

  throw new NotFoundException();
}
