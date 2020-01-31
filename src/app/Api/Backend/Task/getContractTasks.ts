import { Filters } from '@robinfinance/js-api';

import { Task } from '../../../Models/Task';
import { TaskTypeMapper, TaskStatusMapper } from '../../../Mappers/Contract';
import { Exception } from '../../../Exceptions';
import { BackendException } from '../Exceptions';
import BackendApi from '..';

export default async function getContractTasks(this: BackendApi, filters?: Filters): Promise<Task<any>[]> {
  if (filters) {
    if ('type' in filters) {
      if (Array.isArray(filters.type)) {
        filters.type__in = filters.type.map(type => TaskTypeMapper.reverseTransform(type));

        delete filters.type;
      } else {
        filters.type = TaskTypeMapper.reverseTransform(filters.type);
      }
    }

    if ('status' in filters) {
      if (Array.isArray(filters.status)) {
        filters.status__in = filters.status.map(status => TaskStatusMapper.reverseTransform(status));

        delete filters.status;
      } else {
        filters.status = TaskStatusMapper.reverseTransform(filters.status);
      }
    }
  }

  try {
    const response = await this.backendClient.get({
      url: 'contract_task/customer/search',
      filters,
    });
    const data = await response.json();

    const tasks = data.map(item => new Task<any>(item));

    return tasks;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
