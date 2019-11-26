import { Filters } from '@robinfinance/js-api';

import { Answer } from '../../../../Models/Answer';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCustomerAnswers(
  this: BackendApi,
  customerId: string,
  filters?: Filters,
): Promise<Answer[]> {
  try {
    const response = await this.backendClient.get({
      url: 'answer/cgp/search',
      filters: filters ? { ...filters, user: customerId } : { user: customerId },
    });
    const data = await response.json();

    const answers = data.map(item => new Answer(item));

    return answers;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
