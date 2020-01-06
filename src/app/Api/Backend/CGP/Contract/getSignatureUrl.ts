import { Exception, NotFoundException } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getSignatureUrl(
  this: BackendApi,
  contractId: string,
  callbackUrl,
): Promise<{ url: string }> {
  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/contract/${contractId}/sign`,
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

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }

  throw new NotFoundException();
}
