import { CustomerDTO } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { CustomerPrevalidationException } from '../../Exceptions';
import BackendApi from '../..';

export default async function prevalidateCustomers(this: BackendApi, customers: CustomerDTO[]): Promise<void> {
  try {
    await this.backendClient.post({ url: 'cgp/customer/prevalidate' }, customers);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new CustomerPrevalidationException(errors, customers);
    }

    throw new Exception(exception);
  }
}
