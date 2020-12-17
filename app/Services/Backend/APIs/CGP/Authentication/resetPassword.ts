import { Exception } from 'App/Exceptions';
import { BackendService } from 'App/Services';

import { AuthenticationException } from '../../../Exceptions';

export default async function resetPassword(this: BackendService, email: string): Promise<void> {
  try {
    await this.client.post({ url: 'cgp/password/reset' }, { email });
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new AuthenticationException(error);
    }

    throw new Exception(exception);
  }
}
