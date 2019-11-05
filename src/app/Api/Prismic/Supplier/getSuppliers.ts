import { ContentTypes } from '@robinfinance/js-api';

import { Supplier } from '../../../Models/Prismic';
import { getAll } from '..';

export default async function getSuppliers(): Promise<Supplier[]> {
  const response = await getAll(ContentTypes.SUPPLIER);
  const suppliers: Supplier[] = [];

  response.forEach(item => {
    const supplier = new Supplier(item);

    suppliers.push(supplier);
  });

  return suppliers;
}
