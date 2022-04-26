import { Customer } from '../../../../Models/Customer';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function changeCustomerStatus(
  this: BackendApi,
  id: string | number,
  customer_status: number | null,
): Promise<Customer> {
  try {
    const response = await this.backendClient.patch({ url: `cgp/customer/${id}/status/change` }, { customer_status });

    const data = await response.json();

    const customer = new Customer(data);

    return customer;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      await exception.json();
    }

    throw new Exception(exception);
  }
}
