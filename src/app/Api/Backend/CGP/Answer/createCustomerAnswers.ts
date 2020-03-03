import { QuestionAnswer } from '@robinfinance/js-api';

import { Exception, NotFoundException } from '../../../../Exceptions';
import { AnswerException, BackendException } from '../../Exceptions';
import { formatAnswerBody } from '../../Helpers';
import BackendApi from '../..';

export default async function createCustomerAnswers(
  this: BackendApi,
  customerId: string | number,
  answers: QuestionAnswer,
  studyId?: string,
): Promise<void> {
  const formattedAnswers = formatAnswerBody(answers);

  try {
    if (studyId) {
      await this.backendClient.post(
        { url: `cgp/customer/${customerId}/study/${studyId}/answer/create` },
        formattedAnswers,
      );
    } else {
      await this.backendClient.post({ url: `cgp/customer/${customerId}/answer/create` }, formattedAnswers);
    }
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
