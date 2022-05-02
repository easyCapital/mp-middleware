import { Filters } from '@robinfinance/js-api';

import { Question } from '../../../Models/Onboarding';
import { Exception } from '../../../Exceptions';
import { BackendException } from '../Exceptions';
import { formatMeta } from '../Helpers';
import BackendApi from '..';

export default async function getQuestions(this: BackendApi, filters?: Filters): Promise<{ [key: string]: Question }> {
  try {
    const response = await this.backendClient.get({
      url: 'question/search',
      filters,
    });

    const data = await response.json();

    const questions: Question[] = data.map((item: any) => new Question(item));

    const meta = formatMeta(response.headers);

    if (meta.totalPages && meta.totalPages > 1) {
      const questionQueries: Promise<any>[] = [];

      for (let page = 2; page <= meta.totalPages; page += 1) {
        questionQueries.push(
          this.backendClient.get({
            url: 'question/search',
            filters,
            pagination: {
              page,
              perPage: 100,
            },
          }),
        );
      }

      const questionResponses = await Promise.all(questionQueries);

      for await (const questionResponse of questionResponses) {
        const questionData = await questionResponse.json();

        questionData.forEach((item: any) => questions.push(new Question(item)));
      }
    }

    return questions.reduce((obj, item) => {
      return {
        ...obj,
        [item.getId()]: item,
      };
    }, {});
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
