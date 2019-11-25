import { Filters, Pagination, Meta } from '@robinfinance/js-api';

import { ContractTask } from '../../../../Models/ContractTask';
import { Exception } from '../../../../Exceptions';
import { formatMeta } from '../../Helpers';
import BackendApi from '../..';

export default async function findContractTasks(
  this: BackendApi,
  pagination: Pagination = { page: 1, perPage: 100 },
  filters?: Filters,
): Promise<{ results: ContractTask[]; meta: Meta }> {
  try {
    const response = await this.backendClient.get({
      url: 'contract_task/cgp/search',
      filters,
      pagination,
    });
    const data = await response.json();

    const contractTasks = data.map(item => new ContractTask(item));

    const meta = formatMeta(response.headers, pagination);

    return { results: contractTasks, meta };
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const data = await exception.json();

      throw new Exception(JSON.stringify(data));
    }

    throw new Exception(exception);
  }
}
