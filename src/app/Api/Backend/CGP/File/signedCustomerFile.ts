import { File } from '../../../../Models/File';
import { Exception } from '../../../../Exceptions';
import { FileException } from '../../Exceptions';
import BackendApi from '../..';

export default async function signedCustomerFile(this: BackendApi, fileId: string): Promise<any> {
  try {
    const response = await this.backendClient.get({ url: `cgp/file/${fileId}/signed` });
    const data = await response.json();

    const file = new File(data);

    return file;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new FileException(error);
    }

    throw new Exception(exception);
  }
}
