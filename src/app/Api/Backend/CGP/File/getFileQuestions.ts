import { FileType } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getFileQuestions(
  this: BackendApi,
  customerId: string | number,
  fileType: FileType,
  studyId?: string | number,
  contractId?: string | number,
): Promise<{ household: string[]; subscriber: string[]; co_subscriber: string[] }> {
  let url = `cgp/customer/${customerId}/file/${fileType}/questions`;

  try {
    if (studyId) {
      url = `cgp/customer/${customerId}/study/${studyId}/file/${fileType}/questions`;

      if (contractId) {
        url = `cgp/customer/${customerId}/study/${studyId}/contract/${contractId}/file/${fileType}/questions`;
      }
    }

    const response = await this.backendClient.get({
      url,
    });

    const data = await response.json();

    return data;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
