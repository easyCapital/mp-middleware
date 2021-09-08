import { Exception } from '../../../Exceptions';
import { AuthenticationException } from '../Exceptions';
import BackendApi from '..';

export default async function logout(this: BackendApi): Promise<void> {
  try {
    await this.backendClient.get({ url: 'customer/logout' });
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new AuthenticationException(error);
    }

    throw new Exception(exception);
  }
}
