import { Answer } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function deactivateCGPAnswers(this: BackendApi, answers: Answer[]): Promise<void> {
  try {
    await this.backendClient.patch({ url: 'cgp/answer/deactivate' }, answers);
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
