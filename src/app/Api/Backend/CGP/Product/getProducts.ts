import { Filters } from '@robinfinance/js-api';

import { Product } from '../../../../Models/Product';
import { Exception, NotFoundException } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getProducts(this: BackendApi, filters?: Filters): Promise<Product> {
  try {
    const response = await this.backendClient.get({
      url: 'product/search',
      filters,
    });

    const data = await response.json();

    if (data.length > 0) {
      const products = data.map(item => new Product(item));

      return products;
    }
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }

  throw new NotFoundException();
}
