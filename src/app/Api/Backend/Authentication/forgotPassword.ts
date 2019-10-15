import { AuthenticationException } from '../Exceptions';
import BackendApi from '..';
import { Exception } from '../../../Exceptions';

export default async function forgotPassword(this: BackendApi, email: string) {
  try {
    await this.backendClient.post({ url: 'customer/password/reset' }, { email });
  } catch (exception) {
    if (exception.json) {
      const data = await exception.json();

      throw new AuthenticationException(data);
    }

    throw new Exception(exception);
  }
}
