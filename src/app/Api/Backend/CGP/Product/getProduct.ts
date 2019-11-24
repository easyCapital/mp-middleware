import { Filters } from '@robinfinance/js-api';

import { Product } from '../../../../Models/Product';
import { Exception, NotFoundException } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function getProduct(this: BackendApi, filters?: Filters): Promise<Product> {
  try {
    const response = await this.backendClient.get({
      url: 'product/search',
      filters,
      pagination: { page: 1, perPage: 1 },
    });

    const data = await response.json();

    if (data.length > 0) {
      const product = new Product(data[0]);

      return product;
    }
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }

  throw new NotFoundException();
}
