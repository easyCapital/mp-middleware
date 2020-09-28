import { Exception, FileTooBigException } from '../../../../Exceptions';
import { CGP } from '../../../../Models/Customer';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function modifySignature(this: BackendApi, signature: string): Promise<CGP> {
  try {
    const response = await this.backendClient.patch(
      {
        url: 'cgp/signature/change',
      },
      { signature },
    );

    const data = await response.json();

    const user = new CGP(data);

    return user;
  } catch (exception) {
    if (exception.status === 413) {
      throw new FileTooBigException();
    }

    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
