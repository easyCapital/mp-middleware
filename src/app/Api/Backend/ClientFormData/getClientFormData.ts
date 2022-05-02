import { ClientFormData as IClientFormData } from '@robinfinance/js-api';
import { Exception } from '../../../Exceptions';
import { BackendException } from '../Exceptions';

import BackendApi from '..';

import { ClientFormData } from '../../../Models/ClientForm';

export default async function getClientFormData(this: BackendApi, uuid: string): Promise<IClientFormData> {
  try {
    const response = await this.backendClient.get({
      url: `public/clientform/${uuid}/info`,
    });

    const data = await response.json();

    const clientForm = new ClientFormData(data);

    return clientForm;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
