import { FileType } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getFileQuestions(
  this: BackendApi,
  customerId: string | number,
  fileType: FileType,
): Promise<string[]> {
  try {
    const response = await this.backendClient.get({
      url: `cgp/customer/${customerId}/file/${fileType}/questions`,
    });

    const data = await response.json();

    return data;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
