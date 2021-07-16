import { FileSignType } from '@robinfinance/js-api';

import { FileSignTypeMapper } from '../../../../Mappers/File';
import { Exception, NotFoundException } from '../../../../Exceptions';
import { SignatureException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getSignatureUrl(
  this: BackendApi,
  customerId: string,
  fileIds: number[] | string[],
  callbackUrl?: string,
  type?: FileSignType,
): Promise<{ url: string }> {
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

    if (data.signature_url) {
      return { url: data.signature_url };
    }
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new SignatureException(error);
    }

    throw new Exception(exception);
  }

  throw new NotFoundException();
}
