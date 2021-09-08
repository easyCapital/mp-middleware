import { Tag } from '../../../../Models/Customer';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../../';

export default async function getCustomerTags(this: BackendApi, customerId: number | string): Promise<Tag[]> {
  try {
    const response = await this.backendClient.get({
      url: `cgp/customer/${customerId}/tags`,
    });

    const data = await response.json();

    const tags = data.map((tag) => new Tag(tag));

    return tags;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
