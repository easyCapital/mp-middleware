import { Answer } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';
import { AnswerException, BackendException } from '../Exceptions';
import BackendApi from '..';

export default async function prevalidateAnswers(this: BackendApi, answers: Answer[]): Promise<void> {
  try {
    await this.backendClient.post({ url: 'answer/prevalidate' }, answers);
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      if (Array.isArray(error)) {
        throw new AnswerException(answers, error);
      }

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
