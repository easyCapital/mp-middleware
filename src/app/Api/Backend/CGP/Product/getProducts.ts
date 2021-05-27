import { Filters } from '@robinfinance/js-api';

import { Product } from '../../../../Models/Product';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import { formatMeta } from '../../Helpers';
import BackendApi from '../..';

export default async function getProducts(this: BackendApi, filters?: Filters): Promise<Product[]> {
  try {
    const response = await this.backendClient.get({
      url: 'cgp/products',
      filters,
    });

    const data = await response.json();

    const products = data.map((item: any) => new Product(item));

    const meta = formatMeta(response.headers);

    if (meta.totalPages && meta.totalPages > 1) {
      const productQueries: Promise<any>[] = [];

      for (let page = 2; page <= meta.totalPages; page += 1) {
        productQueries.push(
          this.backendClient.get({
            url: 'cgp/products',
            filters,
            pagination: {
              page,
              perPage: 100,
            },
          }),
        );
      }

      const productResponses = await Promise.all(productQueries);

      for await (const productResponse of productResponses) {
        const productData = await productResponse.json();

        productData.forEach((item: any) => products.push(new Product(item)));
      }
    }

    return products;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
