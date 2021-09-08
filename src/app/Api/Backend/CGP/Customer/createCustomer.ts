import { Exception } from '../../../../Exceptions';
import { CustomerCreationException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createCustomer(
  this: BackendApi,
  email: string,
  universe: string,
): Promise<{ id: number }> {
  try {
    const response = await this.backendClient.post({ url: 'customer/cgp/create' }, { email, universe });

    const data = await response.json();

    return data;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new CustomerCreationException(error);
    }

    throw new Exception(exception);
  }
}
