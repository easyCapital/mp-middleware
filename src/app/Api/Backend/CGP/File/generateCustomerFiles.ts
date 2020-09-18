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
  const formattedFiles = files.map((file) => ({ file_type: file.type, contract_id: file.contractId }));

  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customerId}/study/${studyId}/file/generate`,
      },
      formattedFiles,
    );

    const data = await response.json();

    const createdFiles = data.map((item) => new File(item));

    return createdFiles;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new FileException(errors[0]);
    }

    throw new Exception(exception);
  }
}
