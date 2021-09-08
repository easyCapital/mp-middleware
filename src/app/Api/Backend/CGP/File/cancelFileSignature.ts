import { File } from '../../../../Models/File';
import { Exception } from '../../../../Exceptions';
import { FileException } from '../../Exceptions';
import BackendApi from '../..';

export default async function cancelFileSignature(this: BackendApi, fileId: string): Promise<File> {
  try {
    const response = await this.backendClient.patch({ url: `cgp/file/${fileId}/signature/cancel` });
    const data = await response.json();

    const file = new File(data);

    return file;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new FileException(error);
    }

    throw new Exception(exception);
  }
}
