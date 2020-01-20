import { QuestionAnswer } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';
import { AnswerException } from '../Exceptions';
import { formatAnswerBody } from '../Helpers';
import BackendApi from '..';

export default async function createAnswers(this: BackendApi, answers: QuestionAnswer): Promise<void> {
  const formattedAnswers = formatAnswerBody(answers);

  try {
    await this.backendClient.post({ url: 'answer/customer/create' }, formattedAnswers);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new AnswerException(formattedAnswers, error);
    }

    throw new Exception(exception);
  }
}
