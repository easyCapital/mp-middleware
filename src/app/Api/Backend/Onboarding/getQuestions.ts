import { Exception } from '../../../Exceptions';

import { Question } from '../../../Models/Onboarding';
import BackendApi from '..';

export default async function getQuestions(this: BackendApi, ids: string[] = []): Promise<{ [key: string]: Question }> {
  const questions: { [key: string]: Question } = {};

  try {
    const stepResponse = await this.backendClient.get({
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
