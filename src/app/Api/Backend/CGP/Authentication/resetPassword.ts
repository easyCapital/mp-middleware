import { Exception } from '../../../../Exceptions';
import { AuthenticationException } from '../../Exceptions';
import BackendApi from '../..';

export default async function resetPassword(this: BackendApi, email: string): Promise<void> {
  try {
    await this.backendClient.post({ url: `cgp/password/reset` }, { email });
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new AuthenticationException(error);
    }

    throw new Exception(exception);
  }
}
