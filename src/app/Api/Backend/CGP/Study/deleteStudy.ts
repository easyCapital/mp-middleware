import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function deleteStudy(this: BackendApi, studyId: string | number): Promise<void> {
  try {
    await this.backendClient.delete({
      url: `cgp/study/${studyId}/delete`,
    });
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}
