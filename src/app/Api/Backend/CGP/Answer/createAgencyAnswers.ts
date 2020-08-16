import { Answer } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { AnswerException, BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createAgencyAnswers(this: BackendApi, answers: Answer[]): Promise<void> {
  try {
    await this.backendClient.post({ url: 'cgp/agency_answer/create' }, answers);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      if (exception.status === 400) {
        throw new AnswerException(answers, error);
      }

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
