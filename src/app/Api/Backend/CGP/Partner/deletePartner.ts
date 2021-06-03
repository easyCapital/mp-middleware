import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';
import { BackendException } from '../../Exceptions';

export default async function deletePartner(this: BackendApi, partner: number): Promise<void> {
  try {
    await this.backendClient.delete({
      url: `cgp/partner/${partner}/delete`,
    });
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
