import { Exception } from '../../../../../Exceptions';
import { BackendException } from '../../../Exceptions';
import BackendApi from '../../..';
import { Task } from '../../../../../Models/Task';

export default async function getLatestCustomerTask(
  this: BackendApi,
  customerIds: string[],
): Promise<{ [customerId: string]: Task<any> }> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/study_task/search_latest_step',
      filters: { customer_in: customerIds },
    });

    const data = await response.json();

    const tasks: { [customerId: string]: Task<any> } = {};

    data.forEach((item: any, index: number) => {
      if (item && Object.keys(item).length > 0) {
        tasks[customerIds[index]] = new Task(item);
      }
    });

    return tasks;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
