import { Exception } from '../../../Exceptions';
import { ProspectException } from '../Exceptions';
import BackendApi from '..';

export default async function createProspect(this: BackendApi, prospectData: any): Promise<any> {
  try {
    const response = await this.backendClient.post({ url: 'prospect/create' }, { ...prospectData });

    const data = await response.json();

    return data;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new ProspectException(error);
    }

    throw new Exception(exception);
  }
}
