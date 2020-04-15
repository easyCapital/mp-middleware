import { FileType } from '@robinfinance/js-api';

import { File } from '../../../../Models/File';
import { Exception } from '../../../../Exceptions';
import { FileException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createCustomerFile(
  this: BackendApi,
  customerId: string,
  studyId: string,
  type: FileType,
  file: string,
  signatureDate?: string,
): Promise<File> {
  const body: any = { customer_id: customerId, file_type: type, file };

  if (signatureDate) {
    body.sign_date = signatureDate;
  }

  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/study/${studyId}/file/create`,
      },
      body,
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
