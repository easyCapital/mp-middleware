import { FileType } from '@robinfinance/js-api';

import { File } from '../../../../Models/File';
import { Exception } from '../../../../Exceptions';
import { FileException } from '../../Exceptions';
import BackendApi from '../..';

export default async function generateCustomerFiles(
  this: BackendApi,
  customerId: string,
  studyId: string,
  files: { type: FileType; contractId?: number }[],
): Promise<File[]> {
  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customerId}/study/${studyId}/file/generate`,
      },
      files.map((file) => ({ file_type: file.type, contract_id: file.contractId })),
    );

    const data = await response.json();

    const createdFiles = data.map((item) => new File(item));

    return createdFiles;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new FileException(error);
    }

    throw new Exception(exception);
  }
}
