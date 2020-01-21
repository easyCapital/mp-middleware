import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function validateContractSignature(this: BackendApi, contractId: string): Promise<void> {
  try {
    await this.backendClient.get({
      url: `cgp/contract/${contractId}/signed`,
    });
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
