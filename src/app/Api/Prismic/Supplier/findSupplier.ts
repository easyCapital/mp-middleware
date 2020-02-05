import { ContentTypes } from '@robinfinance/js-api';

import { Supplier } from '../../../Models/Prismic';
import { findOne } from '..';

export default async function findSupplier(filters?: { [filter: string]: string | string[] }): Promise<Supplier> {
  const response = await findOne(ContentTypes.SUPPLIER, filters);

  const supplier = new Supplier(response);

  return supplier;
}
