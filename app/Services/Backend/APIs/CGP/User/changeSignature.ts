import { Exception, FileTooBigException } from 'App/Exceptions';
import { BackendService } from 'App/Services';
import { CGP } from 'App/Services/Backend/Models';

import { FileException } from '../../../Exceptions';

export default async function changePassword(
  this: BackendService,
  signature: string,
): Promise<CGP> {
  try {
    const response = await this.client.patch({ url: 'cgp/signature/change' }, { signature });

    const data = await response.json();

    const cgp = new CGP(data);

    return cgp;
  } catch (exception) {
    if (exception.status === 413) {
      throw new FileTooBigException();
    }

    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new FileException(error);
    }

    throw new Exception(exception);
  }
}
