import { Filters } from '@robinfinance/js-api';

import { Contract } from '../../../Models/Contract';
import { Exception } from '../../../Exceptions';
import { BackendException } from '../Exceptions';
import { formatContractTasks } from '../Helpers';
import BackendApi from '..';

export default async function getContracts(this: BackendApi, filters?: Filters): Promise<Contract[]> {
  try {
    const response = await this.backendClient.get({
      url: 'contract/customer/search',
      filters,
      orderBy: { key: 'date_created', type: 'desc' },
    });
    const data = await response.json();

    const contracts = data.map(item => new Contract(item));

    await Promise.all(
      contracts.map(async (item: Contract) => {
        const tasks = await this.getContractTasks({
          contract: item.getId().toString(),
        });

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
