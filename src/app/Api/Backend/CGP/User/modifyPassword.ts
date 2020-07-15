import { Exception } from '../../../../Exceptions';
import { ChangePasswordException } from '../../Exceptions';
import BackendApi from '../..';

export default async function modifyPassword(
  this: BackendApi,
  oldPassword: string,
  newPassword: string,
): Promise<void> {
  try {
    await this.backendClient.post(
      {
        url: 'cgp/change_password',
      },
      {
        old_password: oldPassword,
        new_password: newPassword,
      },
    );
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new ChangePasswordException(error);
    }

    throw new Exception(exception);
  }
}
