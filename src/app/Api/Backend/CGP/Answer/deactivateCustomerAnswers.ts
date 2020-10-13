import { Answer } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function deactivateCustomerAnswers(
  this: BackendApi,
  customerId: string | number,
  answers: Answer[],
  studyId?: string,
  contractId?: string,
): Promise<void> {
  let url: string = `cgp/customer/${customerId}/answer/deactivate`;

  try {
    if (studyId) {
      url = contractId
        ? `cgp/customer/${customerId}/study/${studyId}/contract/${contractId}/answer/deactivate`
        : `cgp/customer/${customerId}/study/${studyId}/answer/deactivate`;
    }

    await this.backendClient.patch({ url }, answers);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
