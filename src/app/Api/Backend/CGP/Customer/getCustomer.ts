import { Customer } from '../../../../Models/Customer';
import { Exception, NotFoundException } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
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
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }

  throw new NotFoundException();
}
