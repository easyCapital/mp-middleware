import { Answer } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { AnswerException, BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createCGPAnswers(this: BackendApi, answers: Answer[]): Promise<void> {
  try {
    await this.backendClient.post({ url: 'cgp/answer/create' }, answers);
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      if (exception.status === 400) {
        throw new AnswerException(answers, error);
      }

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
