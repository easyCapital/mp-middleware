import { Filters, Pagination, Meta } from '@robinfinance/js-api';

import { Customer } from '../../../../Models/Customer';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import { formatMeta } from '../../Helpers';
import BackendApi from '../..';
import { Task } from '../../../../Models/Task';

export default async function searchCustomers(
  this: BackendApi,
  pagination: Pagination = { page: 1, perPage: 100 },
  filters?: Filters,
): Promise<{ results: Customer[]; meta: Meta }> {
  try {
    const response = await this.backendClient.get({
      url: 'customer/cgp/search',
      filters,
      pagination,
      orderBy: { key: 'date_joined', type: 'desc' },
    });

    const data = await response.json();
    const meta = formatMeta(response.headers, pagination);

    const customers: Map<string, Customer> = new Map();
    const customerIds: number[] = [];

    data.forEach((item) => {
      const customer = new Customer(item);

      customers.set(customer.getId().toString(), customer);
      customerIds.push(customer.getId());
    });

    if (customerIds.length > 0) {
      const tasks = await this.getLatestCustomerTask(customerIds);

      // SET CUSTOMER TASKS
      Object.keys(tasks).forEach((customerId) => {
        const customer = customers.get(customerId);
        const customerTask = tasks[customerId] as Task<any>;

        if (customer && customerTask) {
          customer.setActiveTask(customerTask.getLabel());
        }
      });
    }

    return { results: Array.from(customers.values()), meta };
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
