import { Filters } from '@robinfinance/js-api';

import { Product } from '../../../../Models/Product';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getProducts(this: BackendApi, filters?: Filters): Promise<Product> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/products',
      filters,
    });

    const data = await response.json();

    const products = data.map((item) => new Product(item));

    return products;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
