import { Exception, FileTooBigException } from '../../../../Exceptions';
import { CGP } from '../../../../Models/Customer';
import { FileException } from '../../Exceptions';
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
  } catch (exception: any) {
    if (exception.status === 413) {
      throw new FileTooBigException();
    }

    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new FileException(error, 'JPG, JPEG et PNG');
    }

    throw new Exception(exception);
  }
}
