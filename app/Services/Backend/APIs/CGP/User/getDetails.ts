import { Exception } from 'App/Exceptions';
import { BackendService } from 'App/Services';

import { BackendException } from '../../../Exceptions';
import { CGP } from '../../../Models';

export default async function getDetails(this: BackendService): Promise<CGP> {
  try {
    const response = await this.client.get({ url: 'cgp/detail' });

    const data = await response.json();

    const cgp = new CGP(data);

    return cgp;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
