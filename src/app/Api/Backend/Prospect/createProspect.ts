import { ProspectException } from '../Exceptions';
import BackendApi from '..';

export default async function createProspect(this: BackendApi, email: string) {
  try {
    const response = await this.backendClient.post({ url: 'prospect/create' }, { email });

    const data = await response.json();

    return data;
  } catch (exception) {
    const data = await exception.json();

    throw new ProspectException(data);
  }
}
