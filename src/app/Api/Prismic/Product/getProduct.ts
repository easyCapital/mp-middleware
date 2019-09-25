import { Product as JsonProductInterface, ContentTypes } from 'mieuxplacer-js-api';

import { Product } from '../../../Models/Prismic';
import { getOne } from '..';

export default async function getProduct(slug: string): Promise<JsonProductInterface> {
  const response = await getOne(ContentTypes.PRODUCT, slug);
  const product = new Product(response);

  return product.toJson();
}
