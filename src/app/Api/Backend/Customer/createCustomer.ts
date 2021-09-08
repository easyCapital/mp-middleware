import { Exception } from '../../../Exceptions';
import { CustomerCreationException } from '../Exceptions';
import BackendApi from '..';

export default async function createCustomer(
  this: BackendApi,
  customerData: any,
): Promise<{ id: string; token: string }> {
  try {
    const response = await this.backendClient.post({ url: 'customer/create' }, { ...customerData });

    return await response.json();
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new CustomerCreationException(error);
    }

    throw new Exception(exception);
  }
}
