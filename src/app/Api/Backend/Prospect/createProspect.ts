import { ProspectException } from '../Exceptions';
import BackendApi from '..';

export default async function createProspect(this: BackendApi, email: string) {
  const response = await this.backendClient.post({ url: 'prospect/create' }, { email });

  const data = await response.json();

  if (!response.ok) {
    throw new ProspectException(data);
  }

  return data;
}
