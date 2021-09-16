import { FileSignType } from '@robinfinance/js-api';

import { Signature } from '../../../../Models/File';
import { FileSignTypeMapper } from '../../../../Mappers/File';
import { Exception } from '../../../../Exceptions';
import { SignatureException } from '../../Exceptions';
import BackendApi from '../..';

export default async function signCustomerFiles(
  this: BackendApi,
  customerId: string,
  fileIds: number[] | string[],
  callbackUrl?: string,
  type?: FileSignType,
): Promise<Signature | undefined> {
  const body: { files: string[] | number[]; callback_url?: string; type?: string } = {
    files: fileIds,
  };

  if (callbackUrl) {
    body.callback_url = callbackUrl;
  }

  if (type) {
    body.type = FileSignTypeMapper.reverseTransform(type);
  }

  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customerId}/file/sign`,
      },
      body,
    );

    const data = await response.json();

    const signature = new Signature(data);

    return signature;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new SignatureException(error);
    }

    throw new Exception(exception);
  }
}
