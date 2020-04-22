import { Filters } from '@robinfinance/js-api';

import { Answer } from '../../../../Models/Answer';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCustomerAnswers(
  this: BackendApi,
  customerId: string,
  filters?: Filters,
  latestBy?: string,
): Promise<Answer[]> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/answer/search',
      filters: filters ? { ...filters, user: customerId } : { user: customerId },
      latestBy,
    });
    const data = await response.json();

    const answers: { [key: string]: Answer } = {};

    data.forEach((answer) => {
      if (answers[answer.question]) {
        answers[answer.question].addValue(answer.value);
      } else {
        answers[answer.question] = new Answer(answer);
      }
    });

    return Object.values(answers);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
