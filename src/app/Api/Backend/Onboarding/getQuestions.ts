import { Exception } from '../../../Exceptions';

import { Question } from '../../../Models/Onboarding';

const BackendClient = use('BackendClient');

export default async function getQuestions(ids: string[] = []): Promise<{ [key: string]: Question }> {
  const questions: { [key: string]: Question } = {};

  try {
    const stepResponse = await BackendClient.get({
      url: 'question/search',
      filters: { key__in: ids },
    });
    const data = await stepResponse.json();

    data.forEach(item => {
      const question = new Question(item);

      if (ids.includes(question.getId())) {
        questions[question.getId()] = question;
      }
    });
  } catch (error) {
    throw new Exception(error);
  }

  return questions;
}
