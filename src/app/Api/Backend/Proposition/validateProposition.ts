import { Exception } from '../../../Exceptions';
import BackendApi from '..';

export default async function validateProposition(this: BackendApi, propositionId: string, userId: string) {
  try {
    const response = await this.backendClient.post(
      { url: 'contract/create_from_proposition' },
      { proposition: propositionId, user: userId },
    );

    const data = await response.json();

    return data;
  } catch (exception) {
    if (exception.json) {
      const data = await exception.json();

      throw new Exception(JSON.stringify(data));
    } else if (exception.message) {
      throw new Exception(exception.message);
    }

    throw new Exception(exception);
  }
}
