import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function deactivateCustomer(this: BackendApi, customerId: string | number): Promise<void> {
  try {
    await this.backendClient.patch({ url: `cgp/customer/${customerId}/deactivate` });
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
