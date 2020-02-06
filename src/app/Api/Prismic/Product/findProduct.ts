import { ContentTypes } from '@robinfinance/js-api';

import { Product } from '../../../Models/Prismic';
import { findOne } from '..';
import { getType } from '../Type';
import { getSupplier } from '../Supplier';

export default async function findProduct(
  filters?: { [filter: string]: string | string[] },
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
): Promise<Product> {
  const response = await findOne(ContentTypes.PRODUCT, filters, linked, fields);
  const product = new Product(response);

  const [type, supplier] = await Promise.all([getType(response.data.type.id), getSupplier(response.data.supplier.id)]);

  product.setType(type).setSupplier(supplier);

  return product;
}
