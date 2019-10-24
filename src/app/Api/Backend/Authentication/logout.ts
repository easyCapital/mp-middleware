import { AuthenticationException } from '../Exceptions';
import BackendApi from '..';

export default async function logout(this: BackendApi): Promise<void> {
  try {
    await this.backendClient.get({ url: 'customer/logout' });
  } catch (exception) {
    const error = await exception.json();

    throw new AuthenticationException(error);
  }
}
