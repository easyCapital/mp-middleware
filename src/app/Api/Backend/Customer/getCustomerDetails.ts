import { Customer } from '../../../Models/Customer';
import { Exception } from '../../../Exceptions';
import BackendApi from '..';

export default async function getCustomerDetails(this: BackendApi): Promise<Customer> {
  try {
    const response = await this.backendClient.get({ url: 'customer/detail' });
    const data = await response.json();

    const customer = new Customer(data);

    return customer;
  } catch (exception) {
    const data = await exception.json();

    throw new Exception(JSON.stringify(data));
  }
}
