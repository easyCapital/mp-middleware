import { ContentTypes } from '@robinfinance/js-api';

import { Supplier } from '../../../Models/Prismic';
import { find } from '..';

export default async function findSuppliers(
  filters?: { [filter: string]: string | string[] },
  linked?: { [key: string]: string | string[] },
  fields?: string | string[],
  orderBy?: string,
): Promise<Supplier[]> {
  const response = await find(ContentTypes.SUPPLIER, filters, linked, fields, orderBy);
  const suppliers: Supplier[] = [];

  response.forEach((item) => {
    const supplier = new Supplier(item);

    suppliers.push(supplier);
  });

  return suppliers;
}
