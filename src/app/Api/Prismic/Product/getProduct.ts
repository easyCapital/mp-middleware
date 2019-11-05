import { ContentTypes } from '@robinfinance/js-api';

import { Product } from '../../../Models/Prismic';
import { getOne } from '..';
import { getType } from '../Type';
import { getSupplier } from '../Supplier';

export default async function getProduct(slug: string): Promise<Product> {
  const response = await getOne(ContentTypes.PRODUCT, slug);
  const product = new Product(response);

  const [type, supplier] = await Promise.all([
    getType(response.data.type.uid),
    getSupplier(response.data.supplier.uid),
  ]);

  product.setType(type).setSupplier(supplier);

  return product;
}
