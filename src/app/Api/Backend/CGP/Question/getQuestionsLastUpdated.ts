import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getQuestionsLastUpdated(this: BackendApi): Promise<{ updated: string }> {
  try {
    const response = await this.backendClient.get({
      url: 'question/updated',
    });

    const data = await response.json();

    return { updated: `${data.questions_updated}` };
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
