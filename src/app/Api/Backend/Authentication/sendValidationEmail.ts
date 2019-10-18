import { Exception } from '../../../Exceptions';
import BackendApi from '..';

export default async function sendValidationEmail(this: BackendApi, email: string): Promise<void> {
  try {
    await this.backendClient.post({ url: 'email_validation/revalid' }, { email });
  } catch (exception) {
    const data = await exception.json();

    throw new Exception(JSON.stringify(data));
  }
}
