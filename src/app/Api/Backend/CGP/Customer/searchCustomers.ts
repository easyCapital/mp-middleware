import { Filters, Pagination } from '../../../../../types';
import { Customer } from '../../../../Models/Customer';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function searchCGPCustomers(
  this: BackendApi,
  filters?: Filters,
  pagination?: Pagination,
): Promise<Customer[]> {
  try {
    const response = await this.backendClient.get({ url: 'customer/cgp/search', filters, pagination });
    const data = await response.json();

    const customers = data.map(item => new Customer(item));

    return customers;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }
}
