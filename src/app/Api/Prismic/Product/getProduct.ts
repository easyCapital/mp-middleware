import { Product } from '../../../Models/Prismic';
import { getOne } from '..';

export default async function getProduct(id: string): Promise<Product> {
  const response = await getOne(id);

  const product = new Product(response);

  return product;
}
