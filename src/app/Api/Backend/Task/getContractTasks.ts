import { Filters } from '@robinfinance/js-api';

import { Task } from '../../../Models/Contract';
import { TaskTypeMapper, TaskStatusMapper } from '../../../Mappers/Contract';
import { Exception } from '../../../Exceptions';
import { BackendException } from '../Exceptions';
import BackendApi from '..';

export default async function getContractTasks(this: BackendApi, filters?: Filters): Promise<Task[]> {
  if (filters) {
    if ('type' in filters) {
      filters.type = TaskTypeMapper.reverseTransform(filters.type);
    }

    if ('status' in filters) {
      filters.status = TaskStatusMapper.reverseTransform(filters.status);
    }
  }

  try {
    const response = await this.backendClient.get({
      url: 'contract_task/customer/search',
      filters,
    });
    const data = await response.json();

    const tasks = data.map(item => new Task(item));

    return tasks;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
