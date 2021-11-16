import { Tag } from '@robinfinance/js-api';

import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function deleteTags(this: BackendApi, householdId: number, tags: Tag[]): Promise<void> {
  try {
    await this.backendClient.delete({ url: `cgp/household/${householdId}/tags/delete` }, { tags });
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
