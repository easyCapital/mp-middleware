import { ContentTypes } from '@robinfinance/js-api';

import { Product } from '../../../Models/Prismic';
import { getAll } from '..';

export default async function getProducts(): Promise<Product[]> {
  const response = await getAll(ContentTypes.PRODUCT);
  const products: Product[] = [];

  response.forEach(item => {
    const product = new Product(item);

    products.push(product);
  });

  return products;
}
