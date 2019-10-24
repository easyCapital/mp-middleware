import { Answer } from 'mieuxplacer-js-api';

import { Exception } from '../../../Exceptions';
import { AnswerException } from '../Exceptions';
import { formatAnswerBody } from '../Helpers';
import BackendApi from '..';

export default async function prevalidateAnswers(this: BackendApi, answers: Answer): Promise<void> {
  const formattedAnswers = formatAnswerBody(answers);

  try {
    await this.backendClient.post({ url: 'answer/prevalidate' }, formattedAnswers);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new AnswerException(formattedAnswers, error);
    }

    throw new Exception(exception);
  }
}
