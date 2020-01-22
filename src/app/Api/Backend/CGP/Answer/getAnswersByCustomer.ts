import { Filters, Pagination, Meta } from '@robinfinance/js-api';

import { Answer } from '../../../../Models/Answer';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';
import { formatMeta } from '../../Helpers';

export default async function getAnswersByCustomer(
  this: BackendApi,
  filters?: Filters,
  pagination: Pagination = { page: 1, perPage: 100 },
): Promise<{ results: { [userId: string]: { [key: string]: string } }; meta: Meta }> {
  try {
    const response = await this.backendClient.get({
      url: 'answer/cgp/search',
      filters,
      pagination,
      latestBy: 'user_id, question_id',
    });
    const data = await response.json();

    const answers: { [userId: string]: { [key: string]: string } } = {};

    data.forEach(item => {
      const answer = new Answer(item);

      if (answers[item.user]) {
        answers[item.user][answer.getKey()] = answer.getValue() as string;
      } else {
        answers[item.user] = { [answer.getKey()]: answer.getValue() as string };
      }
    });

    const meta = formatMeta(response.headers, pagination);

    return { results: answers, meta };
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
