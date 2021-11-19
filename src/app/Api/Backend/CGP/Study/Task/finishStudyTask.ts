import { Exception } from '../../../../../Exceptions';
import { BackendException } from '../../../Exceptions';
import BackendApi from '../../..';

export default async function finishStudyTask(this: BackendApi, studyId: string, taskId: string): Promise<void> {
  try {
    await this.backendClient.patch({
      url: `cgp/study/${studyId}/task/${taskId}/finish`,
    });
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
