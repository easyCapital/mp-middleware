import { Answer } from 'mieuxplacer-js-api';

import { AnswerException } from '../Exceptions';
import { formatAnswerBody } from '../Helpers';
import BackendApi from '..';

export default async function prevalidateAnswers(this: BackendApi, answers: Answer) {
  const formattedAnswers = formatAnswerBody(answers);

  const response = await this.backendClient.post({ url: 'answer/prevalidate' }, formattedAnswers);

  if (!response.ok) {
    const data = await response.json();

    throw new AnswerException(formattedAnswers, data);
  }
}
