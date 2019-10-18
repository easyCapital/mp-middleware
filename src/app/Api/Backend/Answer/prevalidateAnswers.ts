import { Answer } from 'mieuxplacer-js-api';

import { AnswerException } from '../Exceptions';
import { formatAnswerBody } from '../Helpers';
import BackendApi from '..';

export default async function prevalidateAnswers(this: BackendApi, answers: Answer): Promise<void> {
  const formattedAnswers = formatAnswerBody(answers);

  try {
    await this.backendClient.post({ url: 'answer/prevalidate' }, formattedAnswers);
  } catch (exception) {
    const data = await exception.json();

    throw new AnswerException(formattedAnswers, data);
  }
}
