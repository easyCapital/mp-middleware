import { FileType } from '@robinfinance/js-api';

import { File } from '../../../../Models/File';
import { Exception, FileTooBigException } from '../../../../Exceptions';
import { FileException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createCustomerFile(
  this: BackendApi,
  customerId: string,
  studyId: string | undefined,
  type: FileType,
  file: string,
  id?: number,
  signatureDate?: string,
  contractId?: number,
  name?: string,
  order?: number,
): Promise<File> {
  let url = `cgp/customer/${customerId}/file/create`;

  if (studyId) {
    url = `cgp/customer/${customerId}/study/${studyId}/file/create`;
  }

  const body: any = { file_type: type, file };

  if (id) {
    body.file_id = id;
  }

  if (signatureDate) {
    body.sign_date = signatureDate;
  }

  if (contractId) {
    body.contract_id = contractId;
  }

  if (name) {
    body.file_name = name;
  }

  if (order) {
    body.order = order;
  }

  try {
    const response = await this.backendClient.post(
      {
        url,
      },
      body,
    );

    const data = await response.json();

    const createdFile = new File(data);

    return createdFile;
  } catch (exception: any) {
    if (exception.status === 413) {
      throw new FileTooBigException();
    }

    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new FileException(error);
    }

    throw new Exception();
  }
}
