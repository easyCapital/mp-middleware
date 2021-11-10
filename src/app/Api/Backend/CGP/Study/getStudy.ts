import { Study } from '../../../../Models/Study';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getStudy(this: BackendApi, studyId: number | string): Promise<Study> {
  try {
    const response = await this.backendClient.get({
      url: `cgp/study/${studyId}`,
    });

    const study = await response.json();

    return new Study(study);
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
