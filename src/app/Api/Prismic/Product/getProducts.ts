import { Product as JsonProductInterface, ContentTypes } from 'mieuxplacer-js-api';

import { Product } from '../../../Models/Prismic';
import { getAll } from '..';

export default async function getProducts(): Promise<JsonProductInterface[]> {
  const response = await getAll(ContentTypes.PRODUCT);
  const products: JsonProductInterface[] = [];

  response.forEach(item => {
    const product = new Product(item);

    products.push(product.toJson());
  });

  return products;
}
