import { Customer } from '../../../../Models/Customer';
import { Exception } from '../../../../Exceptions';
import { CustomerCreationException } from '../../Exceptions';
import BackendApi from '../..';

export default async function changeCustomerEmail(
  this: BackendApi,
  id: string | number,
  email: string,
): Promise<Customer> {
  try {
    const response = await this.backendClient.post({ url: `cgp/customer/${id}/email/change` }, { email });

    const data = await response.json();

    const customer = new Customer(data);

    return customer;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new CustomerCreationException(error);
    }

    throw new Exception(exception);
  }
}
