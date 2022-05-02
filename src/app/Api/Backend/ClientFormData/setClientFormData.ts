import { Answer } from '@robinfinance/js-api';

import { ClientForm } from '../../../Models/ClientForm';
import { Exception } from '../../../Exceptions';
import { BackendException } from '../Exceptions';
import BackendApi from '..';

export default async function setClientFormData(
  this: BackendApi,
  uuid: string,
  answers: Answer[],
): Promise<ClientForm> {
  const formattedData = answers;

  try {
    const response = await this.backendClient.post({ url: `public/clientform/${uuid}/submit` }, formattedData);

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
