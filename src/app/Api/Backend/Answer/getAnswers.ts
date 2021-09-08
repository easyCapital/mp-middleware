import { Exception } from '../../../Exceptions';
import { Answer } from '../../../Models/Answer';
import { BackendException } from '../Exceptions';
import BackendApi from '..';

export default async function getAnswers(
  this: BackendApi,
  filters?: { [filter: string]: string | string[] },
): Promise<Answer[]> {
  try {
    const response = await this.backendClient.get({
      url: 'answer/customer/search',
      filters: {
        question__is_active: 'True',
        ...filters,
      },
    });

    const data = await response.json();

    const answers = data.map((item) => new Answer(item));

    return answers;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
