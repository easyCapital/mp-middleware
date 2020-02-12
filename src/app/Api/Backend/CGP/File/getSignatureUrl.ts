import { FileType } from '@robinfinance/js-api';

import { Exception, NotFoundException } from '../../../../Exceptions';
import { SignatureException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getSignatureUrl(
  this: BackendApi,
  customerId: string,
  type: FileType,
  callbackUrl: string,
): Promise<{ url: string }> {
  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customerId}/file/${type}/sign`,
      },
      { callback_url: callbackUrl },
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
