import { Question } from '../../../Models/Onboarding';
import { Exception } from '../../../Exceptions';
import BackendApi from '..';
import { Filters } from '@robinfinance/js-api';
import { formatMeta } from '../Helpers';

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

    const response = await this.backendClient.get({
      url: 'question/search',
      filters,
      pagination: { page: 1, perPage: 100 },
    });

    let data = await response.json();
    const meta = formatMeta(response.headers, { page: 1, perPage: 100 });
    let nextPage = meta.nextPage;

    while (nextPage) {
      const nextResponse = await this.backendClient.get({
        url: 'question/search',
        filters,
        pagination: { page: nextPage, perPage: 100 },
      });

      const nextMeta = formatMeta(nextResponse.headers, { page: nextPage, perPage: 100 });

      nextPage = nextMeta.nextPage;
      data = data.concat(await nextResponse.json());
    }

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
