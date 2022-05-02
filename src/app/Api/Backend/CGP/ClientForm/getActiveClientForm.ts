import { ClientForm } from '../../../../Models/ClientForm';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getActiveClientForm(this: BackendApi, household: number): Promise<ClientForm> {
  try {
    const response = await this.backendClient.get({
      url: `cgp/household/${household}/clientform/lastactive`,
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
