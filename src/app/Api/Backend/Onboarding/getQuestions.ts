import { Question } from '../../../Models/Onboarding';
import { Exception } from '../../../Exceptions';
import BackendApi from '..';
import { Filters } from '@robinfinance/js-api';

export default async function getQuestions(
  this: BackendApi,
  configKey: string | undefined,
  ids?: string[],
): Promise<{ [key: string]: Question }> {
  const questions: { [key: string]: Question } = {};

  try {
    const filters: Filters = { key__in: ids };

    if (configKey) {
      filters.config_key = configKey;
    }

    const stepResponse = await this.backendClient.get({
      url: 'question/search',
      filters,
    });

    const data = await stepResponse.json();

    data.forEach((item) => {
      const question = new Question(item);

      if (ids !== undefined && ids.length > 0) {
        if (ids.includes(question.getId())) {
          questions[question.getId()] = question;
        }
      } else {
        questions[question.getId()] = question;
      }
    });
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }

  return questions;
}
