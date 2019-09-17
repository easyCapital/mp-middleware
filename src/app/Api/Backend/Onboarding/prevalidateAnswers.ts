import { AnswerException } from './Exceptions';
import { formatAnswerBody } from './Helpers';

const BackendClient = use('BackendClient');

export default async function prevalidateAnswers(answers: { [key: string]: string | string[] }) {
  const formattedAnswers = formatAnswerBody(answers);

  const response = await BackendClient.post({ url: 'answer/prevalidate' }, formattedAnswers);

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  throw new AnswerException(formattedAnswers, data);
}
