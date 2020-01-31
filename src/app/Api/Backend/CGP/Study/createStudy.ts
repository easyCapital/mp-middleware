import { Study } from '../../../../Models/Study';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createStudy(this: BackendApi, customerId: string, title: string): Promise<Study> {
  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customerId}/study/create`,
      },
      {
        title,
      },
    );

    const data = await response.json();
    const study = new Study(data);

    return study;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
