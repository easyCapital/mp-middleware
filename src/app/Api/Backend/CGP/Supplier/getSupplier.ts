import { Supplier } from '../../../../Models/Product';
import { Exception, NotFoundException } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getSupplier(this: BackendApi, id: number | string): Promise<Supplier> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/suppliers',
      filters: { id },
      pagination: { page: 1, perPage: 1 },
    });

    const data = await response.json();

    if (data.length > 0) {
      const supplier = new Supplier(data[0]);

      return supplier;
    }
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }

  throw new NotFoundException();
}
