import { FileType } from '@robinfinance/js-api';

import { File } from '../../../../Models/File';
import { Exception, FileTooBigException } from '../../../../Exceptions';
import { FileException } from '../../Exceptions';
import BackendApi from '../..';

export default async function mergeCustomerFile(
  this: BackendApi,
  customerId: string,
  studyId: string,
  type: FileType,
  id: number,
  files: number[],
): Promise<File> {
  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customerId}/study/${studyId}/file/merge`,
      },
      { type, file_id: id, files },
    );

    const data = await response.json();

    const createdFile = new File(data);

    return createdFile;
  } catch (exception) {
    if (exception.status === 413) {
      throw new FileTooBigException();
    }

    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new FileException(error);
    }

    throw new Exception(exception);
  }
}
