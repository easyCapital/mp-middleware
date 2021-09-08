import { Product } from '../../../../Models/Product';
import { Exception, NotFoundException } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getProduct(this: BackendApi, id: number | string): Promise<Product> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/products',
      filters: { id },
      pagination: { page: 1, perPage: 1 },
    });

    const data = await response.json();

    if (data.length > 0) {
      const product = new Product(data[0]);

      return product;
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
