import { Exception } from '../../../../Exceptions';
import { ResetPasswordException } from '../../Exceptions';
import BackendApi from '../..';

export default async function resetPasswordConfirm(
  this: BackendApi,
  uid: string,
  token: string,
  password: string,
): Promise<void> {
  try {
    await this.backendClient.post({ url: `cgp/password/reset/confirm` }, { uid, token, new_password: password });
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new ResetPasswordException(error);
    }

    throw new Exception(exception);
  }
}
