import { ContentTypes } from '@robinfinance/js-api';

import { Supplier } from '../../../Models/Prismic';
import { getAll } from '..';

export default async function getSuppliers(
  filters?: { [filter: string]: string | string[] },
  orderBy?: string,
): Promise<Supplier[]> {
  const response = await getAll(ContentTypes.SUPPLIER, filters, orderBy);
  const suppliers: Supplier[] = [];

  response.forEach(item => {
    const supplier = new Supplier(item);

    suppliers.push(supplier);
  });

  return suppliers;
}
