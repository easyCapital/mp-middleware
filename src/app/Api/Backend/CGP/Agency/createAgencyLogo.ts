import { Exception, FileTooBigException } from '../../../../Exceptions';
import { FileException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createAgencyLogo(this: BackendApi, file: string): Promise<{ file: string }> {
  try {
    const response = await this.backendClient.patch(
      {
        url: 'cgp/agency/logo/change',
      },
      { file },
    );

    const data = await response.json();

    return data;
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
