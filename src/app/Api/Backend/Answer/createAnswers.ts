import { Answer } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';
import { AnswerException } from '../Exceptions';
import BackendApi from '..';

export default async function createAnswers(this: BackendApi, answers: Answer[]): Promise<void> {
  try {
    await this.backendClient.post({ url: 'answer/customer/create' }, answers);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new AnswerException(answers, error);
    }

    throw new Exception(exception);
  }
}
