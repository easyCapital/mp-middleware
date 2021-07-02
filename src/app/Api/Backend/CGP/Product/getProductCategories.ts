import { Filters } from '@robinfinance/js-api';

import { ProductCategory } from '../../../../Models/Product';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getProductCategories(this: BackendApi, filters?: Filters): Promise<ProductCategory[]> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/product_category',
      filters,
    });

    const data = await response.json();

    const categories = data.map((item: any) => new ProductCategory(item));

    return categories;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
