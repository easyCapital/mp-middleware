import { CustomerDTO } from '@robinfinance/js-api';

import { Customer } from '../../../../Models/Customer';
import { Exception } from '../../../../Exceptions';
import { CustomerPrevalidationException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createCustomers(this: BackendApi, customers: CustomerDTO[]): Promise<Customer[]> {
  try {
    const response = await this.backendClient.post({ url: 'cgp/customer/create' }, customers);

    const data = await response.json();

    return data.map((customer) => new Customer(customer));
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new CustomerPrevalidationException(errors, customers);
    }

    throw new Exception(exception);
  }
}
