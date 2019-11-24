import { Customer } from '../../../../Models/Customer';
import { Exception, NotFoundException } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function getCustomer(this: BackendApi, id: string): Promise<Customer> {
  try {
    const response = await this.backendClient.get({
      url: 'customer/cgp/search',
      filters: { id },
      pagination: { page: 1, perPage: 1 },
    });
    const data = await response.json();

    if (data.length > 0) {
      const customer = new Customer(data[0]);

      return customer;
    }
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }

  throw new NotFoundException();
}
