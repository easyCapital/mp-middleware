import { AuthenticationException } from '../Exceptions';
import BackendApi from '..';

export default async function forgotPassword(this: BackendApi, email: string): Promise<void> {
  try {
    await this.backendClient.post({ url: 'customer/password/reset' }, { email });
  } catch (exception) {
    const data = await exception.json();

    throw new AuthenticationException(data);
  }
}
