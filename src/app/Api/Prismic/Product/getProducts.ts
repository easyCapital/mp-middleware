import { ContentTypes } from '@robinfinance/js-api';

import { Product } from '../../../Models/Prismic';
import { getAll } from '..';

export default async function getProducts(
  filters?: { [filter: string]: string | string[] },
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
  orderBy?: string,
): Promise<Product[]> {
  const response = await getAll(ContentTypes.PRODUCT, filters, linked, fields, orderBy);
  const products: Product[] = [];

  response.forEach((item) => {
    const product = new Product(item);

    products.push(product);
  });

  return products;
}
