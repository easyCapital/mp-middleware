import { CGP } from '../../../../Models/Customer';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getCGPDetails(this: BackendApi): Promise<CGP> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/detail',
    });
    const data = await response.json();

    const user = new CGP(data);

    return user;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
