import { Exception } from '../../../../Exceptions';
import { Signature } from '../../../../Models/File';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

async function getSignature(
  this: BackendApi,
  fileId: number | string,
  callbackUrl?: string,
): Promise<Signature | undefined> {
  const body: { callback_url?: string } = {};

  if (callbackUrl) {
    body.callback_url = callbackUrl;
  }

  try {
    const response = await this.backendClient.get({
      url: `cgp/file/${fileId}/signature`,
      filters: body,
    });

    if (response.status === 204) {
      return undefined;
    }

    const data = await response.json();

    const signature = new Signature(data);

    return signature;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}

export default getSignature;
