import BackendException from '../Exceptions/BackendException';
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
    throw new BackendException(exception);
  }
}
