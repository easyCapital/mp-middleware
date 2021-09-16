import { File } from '../../../../Models/File';
import { Exception } from '../../../../Exceptions';
import { FileException } from '../../Exceptions';
import BackendApi from '../..';

export default async function setFilesAsArchived(
  this: BackendApi,
  customerId: number | string,
  fileIds: number[],
): Promise<File[]> {
  try {
    const response = await this.backendClient.post({ url: `cgp/customer/${customerId}/file/archived` }, fileIds);
    const data = await response.json();

    const files = data.map((item) => new File(item));

    return files;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new FileException(error);
    }

    throw new Exception(exception);
  }
}
