import { ContentTypes } from '@robinfinance/js-api';

import { Supplier } from '../../../Models/Prismic';
import { findOne } from '..';

export default async function findSupplier(
  filters?: { [filter: string]: string | string[] },
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
): Promise<Supplier> {
  const response = await findOne(ContentTypes.SUPPLIER, filters, linked, fields);

  const supplier = new Supplier(response);

  return supplier;
}
