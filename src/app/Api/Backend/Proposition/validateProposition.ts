import { Exception } from '../../../Exceptions';
import BackendApi from '..';

export default async function validateProposition(this: BackendApi, propositionId: string) {
  try {
    const response = await this.backendClient.post(
      { url: 'contract/customer/create_from_proposition' },
      { proposition: propositionId },
    );

    const data = await response.json();

    return data;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }
}
