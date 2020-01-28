import { ContentTypes } from '@robinfinance/js-api';

import { Product } from '../../../Models/Prismic';
import { findOne } from '..';
import { getType } from '../Type';
import { getSupplier } from '../Supplier';

export default async function findProduct(filters: { [filter: string]: string | string[] }): Promise<Product> {
  const response = await findOne(ContentTypes.PRODUCT, filters);
  const product = new Product(response);

  const [type, supplier] = await Promise.all([getType(response.data.type.id), getSupplier(response.data.supplier.id)]);

  product.setType(type).setSupplier(supplier);

  return product;
}
