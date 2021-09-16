import { FileType } from '@robinfinance/js-api';

import { File } from '../../../../Models/File';
import { Exception } from '../../../../Exceptions';
import { FileException } from '../../Exceptions';
import BackendApi from '../..';

export default async function generateCustomerFiles(
  this: BackendApi,
  customerId: string,
  studyId: string | undefined,
  files: { type: FileType; contractId?: number }[],
): Promise<File[]> {
  let url = `cgp/customer/${customerId}/file/generate`;

  if (studyId) {
    url = `cgp/customer/${customerId}/study/${studyId}/file/generate`;
  }

  const formattedFiles = files.map((file) => ({ file_type: file.type, contract_id: file.contractId }));

  try {
    const response = await this.backendClient.post(
      {
        url,
      },
      formattedFiles,
    );

    const data = await response.json();

    const createdFiles = data.map((item) => new File(item));

    return createdFiles;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new FileException(errors[0]);
    }

    throw new Exception(exception);
  }
}
