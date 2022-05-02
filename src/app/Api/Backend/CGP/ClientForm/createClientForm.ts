import { ClientForm } from '../../../../Models/ClientForm';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createClientForm(this: BackendApi, household: number): Promise<ClientForm> {
  try {
    const response = await this.backendClient.post({
      url: `cgp/household/${household}/clientform/create`,
    });

    const data = await response.json();

    const clientForm = new ClientForm(data);

    return clientForm;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
