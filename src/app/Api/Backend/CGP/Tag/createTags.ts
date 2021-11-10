import { Tag as TagDTO } from '@robinfinance/js-api';

import { Tag } from '../../../../Models/Tag';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function createTags(this: BackendApi, householdId: number, tags: TagDTO[]): Promise<Tag[]> {
  try {
    const response = await this.backendClient.post({ url: `cgp/household/${householdId}/tags/create` }, { tags });

    const data = await response.json();

    const createdTags = data.map((tag) => new Tag(tag));

    return createdTags;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
