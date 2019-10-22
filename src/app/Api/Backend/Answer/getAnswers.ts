import { Exception } from '../../../Exceptions';
import { Answer } from '../../../Models/Answer';
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

    const answers: { [key: string]: Answer } = {};

    data.forEach(item => {
      const answer = new Answer(item);

      if (answers[answer.getKey()]) {
        answers[answer.getKey()].addValue(answer.getValue());
      } else {
        answers[answer.getKey()] = answer;
      }
    });

    return Object.values(answers);
  } catch (exception) {
    const error = await exception.json();

    throw new Exception(JSON.stringify(error));
  }
}
