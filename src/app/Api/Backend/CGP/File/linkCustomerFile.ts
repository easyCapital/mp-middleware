import { Exception } from '../../../../Exceptions';
import { FileException } from '../../Exceptions';
import BackendApi from '../..';

export default async function linkCustomerFile(this: BackendApi, studyId: string, fileId: number): Promise<void> {
  try {
    await this.backendClient.post({
      url: `cgp/study/${studyId}/file/${fileId}/link`,
    });
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new FileException(error);
    }

    throw new Exception(exception);
  }
}
