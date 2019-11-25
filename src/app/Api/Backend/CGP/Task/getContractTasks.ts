import { Filters } from '@robinfinance/js-api';

import { Task } from '../../../../Models/Contract';
import { TaskTypeMapper, TaskStatusMapper } from '../../../../Mappers/Contract';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function getContractTasks(
  this: BackendApi,
  contractId: string,
  filters?: Filters,
): Promise<Task[]> {
  const formattedFilters: Filters = filters ? { ...filters, contract: contractId } : { contract: contractId };

  if ('type' in formattedFilters) {
    formattedFilters.type = TaskTypeMapper.reverseTransform(formattedFilters.type);
  }

  if ('status' in formattedFilters) {
    formattedFilters.status = TaskStatusMapper.reverseTransform(formattedFilters.status);
  }

  try {
    const response = await this.backendClient.get({
      url: 'contract_task/cgp/search',
      filters: formattedFilters,
    });
    const data = await response.json();

    const tasks = data.map(item => new Task(item));

    return tasks;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const data = await exception.json();

      throw new Exception(JSON.stringify(data));
    }

    throw new Exception(exception);
  }
}
