import { Tag as TagDTO } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function deleteCustomerTags(this: BackendApi, customerId: number, tags: TagDTO[]): Promise<void> {
  try {
    await this.backendClient.delete({ url: `cgp/customer/${customerId}/tags/delete` }, { tags });
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
