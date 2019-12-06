import { Exception, NotFoundException } from '../../../Exceptions';
import { BackendException } from '../Exceptions';
import BackendApi from '..';

export default async function getSignatureUrl(this: BackendApi, contractId: string): Promise<{ url: string }> {
  try {
    const response = await this.backendClient.get({
      url: `contract/${contractId}/customer/sign`,
    });
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
