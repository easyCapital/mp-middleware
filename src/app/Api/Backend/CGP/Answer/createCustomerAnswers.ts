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
  contractId?: string,
): Promise<void> {
  const formattedAnswers = formatAnswerBody(answers);

  let url: string = `cgp/customer/${customerId}/answer/create`;

  try {
    if (studyId) {
      url = contractId
        ? `cgp/customer/${customerId}/study/${studyId}/contract/${contractId}/answer/create`
        : `cgp/customer/${customerId}/study/${studyId}/answer/create`;
    }

    await this.backendClient.post({ url }, formattedAnswers);
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
