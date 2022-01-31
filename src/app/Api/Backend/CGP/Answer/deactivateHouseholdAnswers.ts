import { Answer } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function deactivateHouseholdAnswers(
  this: BackendApi,
  householdId: string | number,
  answers: Answer[],
  studyId?: string,
  contractId?: string,
): Promise<void> {
  let url = `cgp/household/${householdId}/answer/deactivate`;

  try {
    if (studyId) {
      url = contractId
        ? `cgp/household/${householdId}/study/${studyId}/contract/${contractId}/answer/deactivate`
        : `cgp/household/${householdId}/study/${studyId}/answer/deactivate`;
    }

    await this.backendClient.patch({ url }, answers);
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
