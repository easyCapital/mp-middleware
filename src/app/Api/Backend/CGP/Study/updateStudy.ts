import { Study } from '../../../../Models/Study';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function updateStudy(this: BackendApi, studyId: string): Promise<Study> {
  try {
    const response = await this.backendClient.post({
      url: `cgp/study/${studyId}/refresh_tasks`,
    });

    const data = await response.json();
    const study = new Study(data);

    return study;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}
