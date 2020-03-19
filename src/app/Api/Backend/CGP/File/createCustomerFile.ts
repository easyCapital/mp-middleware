import { FileType } from '@robinfinance/js-api';

import { File } from '../../../../Models/File';
import { Exception } from '../../../../Exceptions';
import { FileException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createCustomerFile(
  this: BackendApi,
  customerId: string,
  type: FileType,
  file: string,
  studyId?: string,
): Promise<File> {
  try {
    let url: string = 'file/cgp/create';

    if (studyId) {
      url = `cgp/study/${studyId}/file/create`;
    }

    const response = await this.backendClient.post(
      {
        url,
      },
      { customer_id: customerId, file_type: type, file },
    );

    const data = await response.json();

    const createdFile = new File(data);

    return createdFile;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new FileException(error);
    }

    throw new Exception(exception);
  }
}
