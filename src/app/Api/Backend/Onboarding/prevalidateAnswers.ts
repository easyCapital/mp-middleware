import { Answer } from 'mieuxplacer-js-api';

import { AnswerException } from '../Exceptions';
import { formatAnswerBody } from '../Helpers';

const BackendClient = use('BackendClient');

export default async function prevalidateAnswers(answers: Answer) {
  const formattedAnswers = formatAnswerBody(answers);

  const response = await BackendClient.post({ url: 'answer/prevalidate' }, formattedAnswers);

  if (!response.ok) {
    const data = await response.json();

    throw new AnswerException(formattedAnswers, data);
  }
}
