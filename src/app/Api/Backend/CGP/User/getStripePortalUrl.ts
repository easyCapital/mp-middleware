import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getStripePortalUrl(this: BackendApi): Promise<string> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/stripe-portal',
    });

    const data = await response.json();

    return data.url;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
