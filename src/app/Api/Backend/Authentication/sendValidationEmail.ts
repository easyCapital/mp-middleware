import { Exception } from '../../../Exceptions';
import BackendApi from '..';

export default async function sendValidationEmail(this: BackendApi, email: string): Promise<void> {
  try {
    await this.backendClient.post({ url: 'email_validation/revalid' }, { email });
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }
}
