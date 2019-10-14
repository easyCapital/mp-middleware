import { AuthenticationException } from '../Exceptions';
import BackendApi from '..';

export default async function forgotPassword(this: BackendApi, email: string) {
  const response = await this.backendClient.post({ url: 'customer/password/reset' }, { email });

  if (!response.ok) {
    const data = await response.json();

    throw new AuthenticationException(data);
  }
}
