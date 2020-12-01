import { Question } from '../../../Models/Onboarding';
import { Exception } from '../../../Exceptions';
import BackendApi from '..';
import { Filters } from '@robinfinance/js-api';

export default async function getQuestions(
  this: BackendApi,
  configKey: string | undefined,
  ids: string[],
): Promise<{ [key: string]: Question }> {
  const questions: { [key: string]: Question } = {};

  try {
    const filters: Filters = {};

    const dupplicatedIds = [...ids];
    const splittedIds: string[][] = [];

    while (dupplicatedIds.length) {
      splittedIds.push(dupplicatedIds.splice(0, 100));
    }

    if (configKey) {
      filters.config_key = configKey;
    }

    let data: any = [];

    const responses = await Promise.all(
      splittedIds.map((array) =>
        this.backendClient.get({
          url: 'question/search',
          filters: { key__in: array, ...filters },
          pagination: { page: 1, perPage: 100 },
        }),
      ),
    );

    for await (const response of responses) {
      const responseData = await response.json();

      data = data.concat(responseData);
    }

    data.forEach((item) => {
      const question = new Question(item);

      if (ids.includes(question.getId())) {
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
