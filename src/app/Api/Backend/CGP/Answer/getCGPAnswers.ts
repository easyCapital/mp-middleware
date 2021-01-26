import { Filters } from '@robinfinance/js-api';

import { Answer } from '../../../../Models/Answer';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import { formatMeta } from '../../Helpers';
import BackendApi from '../..';

export default async function getCGPAnswers(this: BackendApi, filters?: Filters, latestBy?: string): Promise<Answer[]> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/answer/search',
      filters,
      latestBy,
    });
    const data = await response.json();

    const answers = data.map((item) => new Answer(item));
    const meta = formatMeta(response.headers);

    if (meta.totalPages && meta.totalPages > 1) {
      const answerQueries: Promise<any>[] = [];

      for (let page = 2; page <= meta.totalPages; page += 1) {
        answerQueries.push(
          this.backendClient.get({
            url: 'cgp/answer/search',
            filters,
            latestBy,
            pagination: {
              page,
              perPage: 100,
            },
          }),
        );
      }

      const answerResponses = await Promise.all(answerQueries);

      for await (const answerResponse of answerResponses) {
        const answerData = await answerResponse.json();

        answerData.forEach((item) => answers.push(new Answer(item)));
      }
    }

    return answers;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
