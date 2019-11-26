import { Answer, Customer } from '@robinfinance/js-api';

import { Exception, NotFoundException } from '../../../../Exceptions';
import { AnswerException, BackendException } from '../../Exceptions';
import { formatAnswerBody } from '../../Helpers';
import BackendApi from '../..';

export default async function createCustomerAnswers(
  this: BackendApi,
  customer: Customer,
  answers: Answer,
): Promise<void> {
  const formattedAnswers = formatAnswerBody(answers);

  try {
    await this.backendClient.post({ url: `answer/customer/${customer}/cgp/create` }, formattedAnswers);
  } catch (exception) {
    if (exception.status === 404) {
      throw new NotFoundException();
    }

    if (typeof exception.json === 'function') {
      const error = await exception.json();

      if (exception.status === 400) {
        throw new AnswerException(formattedAnswers, error);
      }

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
