import { Tag as JsonTagInterface } from '@robinfinance/js-api';

import { Tag } from '../../../../Models/Customer';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function createCustomerTags(
  this: BackendApi,
  customerId: number,
  tags: JsonTagInterface[],
): Promise<Tag[]> {
  try {
    const response = await this.backendClient.post({ url: `cgp/customer/${customerId}/tags/create` }, { tags });

    const data = await response.json();

    const createdTags = data.map((tag) => new Tag(tag));

    return createdTags;
  } catch (exception) {
    throw new Exception(exception);
  }
}
