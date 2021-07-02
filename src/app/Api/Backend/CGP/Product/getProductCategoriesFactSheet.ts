import { Filters } from '@robinfinance/js-api';

import { ProductCategoryFactSheet } from '../../../../Models/Product';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';

import BackendApi from '../..';

export default async function getProductCategoriesFactSheet(
  this: BackendApi,
  filters?: Filters,
): Promise<ProductCategoryFactSheet[]> {
  try {
    const response = await this.backendClient.get({
      url: `cgp/product_categories_fact_sheets`,
      filters,
    });

    const data = await response.json();

    const categoriesFactSheet = data.map((item) => new ProductCategoryFactSheet(item));

    return categoriesFactSheet;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
