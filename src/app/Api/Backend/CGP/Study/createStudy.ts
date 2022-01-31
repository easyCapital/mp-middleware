import { Study } from '../../../../Models/Study';
import { Exception } from '../../../../Exceptions';
import { StudyException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createStudy(
  this: BackendApi,
  customerId: string,
  title: string,
  coSubscriber?: number,
): Promise<Study> {
  const body: { title: string; co_subscriber?: number } = { title };

  if (coSubscriber) {
    body.co_subscriber = coSubscriber;
  }

  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customerId}/study/create`,
      },
      body,
    );

    const data = await response.json();
    const study = new Study(data);

    return study;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new StudyException(error);
    }

    throw new Exception(exception);
  }
}
