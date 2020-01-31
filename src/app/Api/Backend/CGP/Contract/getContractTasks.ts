import { Filters } from '@robinfinance/js-api';

import { Task } from '../../../../Models/Task';
import { TaskTypeMapper, TaskStatusMapper } from '../../../../Mappers/Contract';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getContractTasks(
  this: BackendApi,
  contractId: string,
  filters?: Filters,
): Promise<Task<any>[]> {
  const formattedFilters: Filters = filters ? { ...filters, contract: contractId } : { contract: contractId };

  if ('type' in formattedFilters) {
    if (Array.isArray(formattedFilters.type)) {
      formattedFilters.type__in = formattedFilters.type.map(type => TaskTypeMapper.reverseTransform(type));

      delete formattedFilters.type;
    } else {
      formattedFilters.type = TaskTypeMapper.reverseTransform(formattedFilters.type);
    }
  }

  if ('status' in formattedFilters) {
    if (Array.isArray(formattedFilters.status)) {
      formattedFilters.status__in = formattedFilters.status.map(status => TaskStatusMapper.reverseTransform(status));

      delete formattedFilters.status;
    } else {
      formattedFilters.status = TaskStatusMapper.reverseTransform(formattedFilters.status);
    }
  }

  try {
    const response = await this.backendClient.get({
      url: 'contract_task/cgp/search',
      filters: formattedFilters,
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
