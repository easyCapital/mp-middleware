import { Answer } from '@robinfinance/js-api';

import { Exception, NotFoundException } from '../../../../Exceptions';
import { AnswerException, BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createHouseholdAnswers(
  this: BackendApi,
  householdId: string | number,
  answers: Answer[],
  studyId?: string,
  contractId?: string,
): Promise<void> {
  let url = `cgp/household/${householdId}/answer/create`;

  try {
    if (studyId) {
      url = contractId
        ? `cgp/household/${householdId}/study/${studyId}/contract/${contractId}/answer/create`
        : `cgp/household/${householdId}/study/${studyId}/answer/create`;
    }

    await this.backendClient.post({ url }, answers);
  } catch (exception: any) {
    if (exception.status === 404) {
      throw new NotFoundException();
    }

    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      if (exception.status === 400) {
        throw new AnswerException(answers, error);
      }

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
