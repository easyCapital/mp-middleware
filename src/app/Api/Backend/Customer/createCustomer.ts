import { Exception } from '../../../Exceptions';
import { CustomerCreationException } from '../Exceptions';
import BackendApi from '..';

export default async function createCustomer(
  this: BackendApi,
  email: string,
  password: string,
  universe: string,
): Promise<{ id: string; token: string }> {
  try {
    const response = await this.backendClient.post({ url: 'customer/create' }, { email, password, universe });
    return await response.json();
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new CustomerCreationException(error);
    }

    throw new Exception(exception);
  }
}
