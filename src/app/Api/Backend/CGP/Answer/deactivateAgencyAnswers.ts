import { Answer } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function deactivateAgencyAnswers(this: BackendApi, answers: Answer[]): Promise<void> {
  try {
    await this.backendClient.patch({ url: 'cgp/agency_answer/deactivate' }, answers);
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
