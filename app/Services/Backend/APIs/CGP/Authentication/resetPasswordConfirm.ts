import { Exception } from 'App/Exceptions';
import { BackendService } from 'App/Services';

import { ResetPasswordException } from '../../../Exceptions';

export default async function resetPasswordConfirm(
  this: BackendService,
  uid: string,
  token: string,
  password: string,
): Promise<void> {
  try {
    await this.client.post(
      { url: 'cgp/password/reset/confirm' },
      { uid, token, new_password: password },
    );
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new ResetPasswordException(error);
    }

    throw new Exception(exception);
  }
}
