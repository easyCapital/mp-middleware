import { Exception } from 'App/Exceptions';
import { BackendService } from 'App/Services';

import { ChangePasswordException } from '../../../Exceptions';

export default async function changePassword(
  this: BackendService,
  oldPassword: string,
  newPassword: string,
): Promise<void> {
  try {
    await this.client.post(
      { url: 'cgp/change_password' },
      { old_password: oldPassword, new_password: newPassword },
    );
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new ChangePasswordException(error);
    }

    throw new Exception(exception);
  }
}
