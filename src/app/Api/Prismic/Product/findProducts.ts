import { Product as JsonProductInterface, ContentTypes } from 'mieuxplacer-js-api';

import { Product } from '../../../Models/Prismic';
import { find } from '..';

export default async function findProducts(filters: {
  [filter: string]: string | string[];
}): Promise<JsonProductInterface[]> {
  const response = await find(ContentTypes.PRODUCT, filters);
  const products: JsonProductInterface[] = [];

  response.forEach(item => {
    const product = new Product(item);

    products.push(product.toJson());
  });

  return products;
}
